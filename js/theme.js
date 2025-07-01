import { playSound } from './audio.js';

// Theme Toggle
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  if (themeToggle) {
    let isDark = localStorage.getItem('theme') !== 'light';

    // Initialize theme from localStorage
    if (!isDark) {
      body.classList.add('light-theme');
      themeToggle.querySelector('.icon').textContent = '☀️';
    } else {
      themeToggle.querySelector('.icon').textContent = '🌙';
    }

    themeToggle.addEventListener('click', () => {
      isDark = !isDark;
      if (isDark) {
        body.classList.remove('light-theme');
        themeToggle.querySelector('.icon').textContent = '🌙';
        localStorage.setItem('theme', 'dark');
      } else {
        body.classList.add('light-theme');
        themeToggle.querySelector('.icon').textContent = '☀️';
        localStorage.setItem('theme', 'light');
      }
      playSound(523, 0.1);
    });

    // Keyboard navigation
    themeToggle.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        themeToggle.click();
      }
    });
  }
}

// Loading Screen
function initLoadingScreen() {
  window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
          loadingScreen.style.display = 'none';
          // Hiển thị nội dung sau khi loading
          document.querySelectorAll('.fade-item').forEach(el => {
            el.classList.add('show');
          });
        }, 500);
      }, 2000);
    }
  });
}

// Greet by hour with enhanced animation
function initGreeting() {
  const subtitle = document.getElementById('subtitle');
  if (subtitle) {
    const hour = new Date().getHours();
    const greetings = {
      morning: 'Good morning ☀️',
      afternoon: 'Good afternoon 🌤️',
      evening: 'Good evening 🌅',
      night: 'Good night 🌙',
    };

    let greeting;
    if (hour >= 5 && hour < 12) greeting = greetings.morning;
    else if (hour < 18) greeting = greetings.afternoon;
    else if (hour < 22) greeting = greetings.evening;
    else greeting = greetings.night;

    subtitle.innerText = greeting;
  }
}

// Enhanced Bio typing effect
function initBioTyping() {
  const bio = document.getElementById('bio-text');
  if (bio) {
    const bioContent =
      "👋 Hey there, I'm Zaoo, a passionate web developer in the learning phase, seeking knowledge and gaining experience to develop myself day by day. Always excited to learn new technologies! 🚀";
    let i = 0;

    setTimeout(() => {
      function typeBio() {
        if (i < bioContent.length) {
          bio.textContent += bioContent.charAt(i);
          i++;
          setTimeout(typeBio, 30);
        }
      }
      typeBio();
    }, 1000);
  }
}

export { initThemeToggle, initLoadingScreen, initGreeting, initBioTyping };
