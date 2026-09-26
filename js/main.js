/* global initAudio, initThemeToggle, initSoundToggle, initLanguageToggle, playSound, t */
const CARD_URL = window.location.origin + window.location.pathname;

function markReady() {
  document.body.classList.add('is-ready');
}

function updateGreeting() {
  const greeting = document.getElementById('time-greeting');

  if (!greeting) {
    return;
  }

  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    greeting.textContent = t('greetingMorning');
    return;
  }

  if (hour >= 12 && hour < 18) {
    greeting.textContent = t('greetingAfternoon');
    return;
  }

  if (hour >= 18 && hour < 22) {
    greeting.textContent = t('greetingEvening');
    return;
  }

  greeting.textContent = t('greetingNight');
}

let toastTimer = 0;

function showToast(message) {
  const toast = document.getElementById('toast');

  if (!toast) {
    return;
  }

  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2200);
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  // Fallback for http:// and older browsers.
  const field = document.createElement('textarea');
  field.value = text;
  field.setAttribute('readonly', '');
  field.style.position = 'fixed';
  field.style.opacity = '0';
  document.body.appendChild(field);
  field.select();
  const ok = document.execCommand('copy');
  field.remove();

  if (!ok) {
    throw new Error('copy failed');
  }
}

function initCopyChips() {
  document.querySelectorAll('[data-copy]').forEach(chip => {
    chip.addEventListener('click', async () => {
      try {
        await copyText(chip.dataset.copy);
        showToast(`${t('copied')}: ${chip.dataset.copy}`);
        playSound(523, 0.12);
      } catch {
        showToast(t('copyFailed'));
      }
    });
  });
}

function initShare() {
  const button = document.getElementById('share-card');

  if (!button) {
    return;
  }

  button.addEventListener('click', async () => {
    const data = { title: t('shareTitle'), url: CARD_URL };

    if (navigator.share) {
      try {
        await navigator.share(data);
        playSound(784, 0.12);
      } catch {
        // User cancelled the share sheet.
      }
      return;
    }

    try {
      await copyText(CARD_URL);
      showToast(t('linkCopied'));
      playSound(784, 0.12);
    } catch {
      showToast(t('copyFailed'));
    }
  });
}

function registerServiceWorker() {
  if (!('serviceWorker' in navigator) || location.protocol === 'file:') {
    return;
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {
      // Offline support is optional; the card works without it.
    });
  });
}

function generateQRCode() {
  const container = document.getElementById('qr-container');

  if (!container || !window.QRious) {
    return;
  }

  const qr = new window.QRious({
    value: CARD_URL,
    size: 128,
    background: '#f7f4ea',
    foreground: '#090806',
    level: 'H',
  });

  const image = document.createElement('img');
  image.className = 'qr-image';
  image.src = qr.toDataURL();
  image.alt = 'QR code for nzaoo card';
  image.width = 64;
  image.height = 64;
  image.decoding = 'async';

  container.replaceChildren(image);
}

function initTilt() {
  const card = document.querySelector('.identity-card');
  const allowTilt = window.matchMedia(
    '(hover: hover) and (pointer: fine)'
  ).matches;
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (!card || !allowTilt || reduceMotion) {
    return;
  }

  let frameId = 0;

  function updateTilt(event) {
    if (frameId) {
      cancelAnimationFrame(frameId);
    }

    frameId = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      card.style.setProperty('--tilt-x', `${(-y * 3).toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${(x * 4).toFixed(2)}deg`);
      card.style.setProperty('--glare-x', `${((x + 0.5) * 100).toFixed(1)}%`);
      card.style.setProperty('--glare-y', `${((y + 0.5) * 100).toFixed(1)}%`);
    });
  }

  function resetTilt() {
    if (frameId) {
      cancelAnimationFrame(frameId);
      frameId = 0;
    }

    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
    card.style.setProperty('--glare-x', '50%');
    card.style.setProperty('--glare-y', '0%');
  }

  card.addEventListener('pointermove', updateTilt);
  card.addEventListener('pointerleave', resetTilt);
}

function buildVCard() {
  const jsonLd = document.querySelector('script[type="application/ld+json"]');
  const profile = jsonLd ? JSON.parse(jsonLd.textContent) : {};
  const name = profile.name || document.title;
  const email = (profile.email || '').replace('mailto:', '');
  const url = profile.url || CARD_URL;

  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${name}`,
    `N:;${name};;;`,
    profile.jobTitle && `TITLE:${profile.jobTitle}`,
    email && `EMAIL;TYPE=INTERNET:${email}`,
    profile.telephone && `TEL;TYPE=CELL:${profile.telephone}`,
    `URL:${url}`,
    'END:VCARD',
  ].filter(Boolean);

  return lines.join('\r\n');
}

function initSaveContact() {
  const button = document.getElementById('save-contact');

  if (!button) {
    return;
  }

  button.addEventListener('click', () => {
    const blob = new Blob([buildVCard()], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'nzaoo.vcf';
    link.click();
    URL.revokeObjectURL(url);
    playSound(660, 0.12);
  });
}

function initCard() {
  initAudio();
  initLanguageToggle();
  initThemeToggle();
  initSoundToggle();
  initSaveContact();
  initShare();
  initCopyChips();
  markReady();
  updateGreeting();
  document.addEventListener('languagechange', updateGreeting);
  generateQRCode();
  initTilt();
}

registerServiceWorker();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCard);
} else {
  initCard();
}
