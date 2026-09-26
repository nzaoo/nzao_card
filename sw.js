/* Offline support: precache the card, serve our own files network-first and
   Google Fonts cache-first.

   Our files are always revalidated with the server (cache: 'no-cache') so the
   HTML, CSS and JS of one deploy arrive together. GitHub Pages sends
   max-age=600, and without this a fresh index.html could be paired with a
   stale main.css from the HTTP cache for up to 10 minutes. */
const CACHE = 'nzaoo-card-v2';

const PRECACHE = [
  './',
  'index.html',
  'css/main.css',
  'js/i18n.js',
  'js/audio.js',
  'js/theme.js',
  'js/main.js',
  'js/vendor/qrious.min.js',
  'manifest.json',
  'assets/icon/avata.jpg',
  'assets/icon/apple-touch-icon.png',
  'assets/icon/icon-192.png',
  'assets/icon/icon-512.png',
  'assets/icon/email.svg',
  'assets/icon/facebook.svg',
  'assets/icon/github.svg',
  'assets/icon/instagram.svg',
  'assets/icon/phone.svg',
  'assets/icon/tiktok.svg',
  'assets/icon/zalo.svg',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE)
      // cache: 'reload' skips the HTTP cache so we never precache stale files.
      .then(cache =>
        cache.addAll(PRECACHE.map(url => new Request(url, { cache: 'reload' })))
      )
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      const stale = (await caches.keys()).filter(key => key !== CACHE);

      await Promise.all(stale.map(key => caches.delete(key)));
      await self.clients.claim();

      // Pages opened under an older worker may be showing files from its
      // cache (e.g. a new index.html with an old main.css), and their scripts
      // may be old too, so reload them from here rather than from the page.
      if (stale.length) {
        const windows = await self.clients.matchAll({ type: 'window' });
        windows.forEach(client => client.navigate(client.url));
      }
    })()
  );
});

function isFont(url) {
  return (
    url.hostname === 'fonts.googleapis.com' ||
    url.hostname === 'fonts.gstatic.com'
  );
}

async function networkFirst(request) {
  const cache = await caches.open(CACHE);

  try {
    const response = await fetch(request.url, { cache: 'no-cache' });

    if (response.ok) {
      cache.put(request, response.clone());
    }

    return response;
  } catch {
    const cached =
      (await cache.match(request, { ignoreSearch: true })) ||
      (request.mode === 'navigate' && (await cache.match('./')));

    return cached || Response.error();
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(request);

  if (cached) {
    return cached;
  }

  const response = await fetch(request);

  if (response.ok || response.type === 'opaque') {
    cache.put(request, response.clone());
  }

  return response;
}

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') {
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith(networkFirst(request));
  } else if (isFont(url)) {
    event.respondWith(cacheFirst(request));
  }
});
