import { playSound } from './audio.js';

// Enhanced Wind Effect
function initWindEffect() {
  const windContainer = document.getElementById('wind-container');
  if (windContainer) {
    for (let i = 0; i < 60; i++) {
      const dot = document.createElement('div');
      dot.className = 'particle';
      dot.style.left = Math.random() * window.innerWidth + 'px';
      dot.style.top = Math.random() * window.innerHeight + 'px';
      dot.style.animationDuration = 5 + Math.random() * 15 + 's';
      dot.style.animationDelay = Math.random() * 5 + 's';
      windContainer.appendChild(dot);
    }
  }
}

// Bubble animations
const createBubble = () => {
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.style.left = Math.random() * window.innerWidth + 'px';
  bubble.style.animationDuration = 3 + Math.random() * 4 + 's';
  bubble.style.animationDelay = Math.random() * 2 + 's';
  document.body.appendChild(bubble);

  setTimeout(() => {
    bubble.remove();
  }, 7000);
};

function createBubbles() {
  setInterval(createBubble, 2000);
}

// Shooting stars
function createShootingStar() {
  const star = document.createElement('div');
  star.className = 'shooting-star';
  star.style.left = Math.random() * window.innerWidth + 'px';
  star.style.top = Math.random() * (window.innerHeight / 2) + 'px';
  star.style.animationDuration = 1 + Math.random() * 2 + 's';
  document.body.appendChild(star);

  setTimeout(() => {
    star.remove();
  }, 3000);
}

function scheduleShootingStar() {
  setInterval(createShootingStar, 5000 + Math.random() * 10000);
}

// Rainbow mode
let rainbowInterval;

function toggleRainbowMode() {
  const body = document.body;
  if (body.classList.contains('rainbow-mode')) {
    stopRainbowMode();
  } else {
    startRainbowMode();
  }
}

function startRainbowMode() {
  const body = document.body;
  body.classList.add('rainbow-mode');

  let hue = 0;
  rainbowInterval = setInterval(() => {
    hue = (hue + 1) % 360;
    body.style.setProperty('--rainbow-hue', hue);
  }, 50);

  playSound(440, 0.1);
}

function stopRainbowMode() {
  const body = document.body;
  body.classList.remove('rainbow-mode');
  clearInterval(rainbowInterval);
  body.style.removeProperty('--rainbow-hue');

  playSound(330, 0.1);
}

export {
  initWindEffect,
  createBubbles,
  scheduleShootingStar,
  toggleRainbowMode,
  startRainbowMode,
  stopRainbowMode,
};
