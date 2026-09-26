/* Offline support: precache the card shell, serve pages network-first and
   everything else (CSS, JS, icons, Google Fonts) stale-while-revalidate. */
const CACHE = 'nzaoo-card-v1';

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
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(keys =>
        Promise.all(
          keys.filter(key => key !== CACHE).map(key => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

function isCacheable(url) {
  return (
    url.origin === self.location.origin ||
    url.hostname === 'fonts.googleapis.com' ||
    url.hostname === 'fonts.gstatic.com'
  );
}

async function networkFirst(request) {
  const cache = await caches.open(CACHE);

  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch {
    return (
      (await cache.match(request, { ignoreSearch: true })) ||
      (await cache.match('./'))
    );
  }
}

// Serve from cache instantly, refresh the copy in the background so a new
// deploy shows up on the next visit.
async function staleWhileRevalidate(event) {
  const { request } = event;
  const cache = await caches.open(CACHE);
  const cached = await cache.match(request, { ignoreSearch: true });

  const refresh = fetch(request).then(response => {
    if (response.ok || response.type === 'opaque') {
      cache.put(request, response.clone());
    }
    return response;
  });

  if (cached) {
    event.waitUntil(refresh.catch(() => {}));
    return cached;
  }

  return refresh;
}

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET' || !isCacheable(url)) {
    return;
  }

  event.respondWith(
    request.mode === 'navigate'
      ? networkFirst(request)
      : staleWhileRevalidate(event)
  );
});
