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
    greeting.textContent = 'Good morning';
    return;
  }

  if (hour >= 12 && hour < 18) {
    greeting.textContent = 'Good afternoon';
    return;
  }

  if (hour >= 18 && hour < 22) {
    greeting.textContent = 'Good evening';
    return;
  }

  greeting.textContent = 'Good night';
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
    level: 'H'
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
  const allowTilt = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

function initCard() {
  markReady();
  updateGreeting();
  generateQRCode();
  initTilt();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCard);
} else {
  initCard();
}
