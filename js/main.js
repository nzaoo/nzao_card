// Main application entry point
import { initAudio, initSoundToggle, playSound } from './audio.js';
import {
  initThemeToggle,
  initLoadingScreen,
  initGreeting,
  initBioTyping,
} from './theme.js';
import {
  initWindEffect,
  createBubbles,
  scheduleShootingStar,
  toggleRainbowMode,
} from './animations.js';
import {
  addNotificationStyles,
  copyToClipboard,
  generateQRCode,
  updateFPS,
  trackEvent,
} from './utils.js';

// Initialize all modules
function initApp() {
  // Initialize audio system
  initAudio();
  initSoundToggle();

  // Initialize theme and UI
  initThemeToggle();
  initLoadingScreen();
  initGreeting();
  initBioTyping();

  // Initialize animations
  initWindEffect();
  createBubbles();
  scheduleShootingStar();

  // Initialize utilities
  addNotificationStyles();
  copyToClipboard();
  generateQRCode();

  // Start performance monitoring
  updateFPS();

  // Track app initialization
  trackEvent('app_initialized');

  // Add rainbow mode toggle to window for global access
  window.toggleRainbowMode = toggleRainbowMode;

  // App initialized successfully
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Export for potential external use
export { initApp };

// --- Hotkey & Easter Egg Logic ---

// Admin mode toggle (Ctrl+Shift+Z)
let adminMode = false;
function toggleAdminMode() {
  adminMode = !adminMode;
  const indicator = document.getElementById('admin-mode-indicator');
  if (indicator) {
    indicator.style.display = adminMode ? 'block' : 'none';
  }
  if (adminMode) {
    window.alert('Admin mode activated!');
  } else {
    window.alert('Admin mode deactivated!');
  }
}

// Performance mode toggle (Ctrl+Shift+X)
let performanceMode = false;
function togglePerformanceMode() {
  performanceMode = !performanceMode;
  document.body.classList.toggle('performance-mode', performanceMode);
  window.alert(
    performanceMode ? 'Performance mode ON' : 'Performance mode OFF'
  );
}

// Easter egg: click name 5 lần để hiện secret
let nameClickCount = 0;
let nameClickTimeout;
function handleNameClick() {
  nameClickCount++;
  if (nameClickCount === 5) {
    window.alert('🎉 Secret unlocked!');
    nameClickCount = 0;
  }
  clearTimeout(nameClickTimeout);
  nameClickTimeout = setTimeout(() => {
    nameClickCount = 0;
  }, 2000);
}

document.addEventListener('DOMContentLoaded', () => {
  // Hotkeys
  document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.shiftKey && e.code === 'KeyZ') {
      e.preventDefault();
      toggleAdminMode();
    }
    if (e.ctrlKey && e.shiftKey && e.code === 'KeyX') {
      e.preventDefault();
      togglePerformanceMode();
    }
  });
  // Easter egg
  const nameEl = document.querySelector('.name');
  if (nameEl) {
    nameEl.addEventListener('click', handleNameClick);
  }

  // Phát âm thanh phím đàn khi hover/click các mục có data-sound
  // Các tần số nốt nhạc piano (C4, D4, E4, F4, G4, A4, B4, C5)
  const pianoNotes = [
    261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 493.88, 523.25,
  ];
  // Gán cho skill-item và info-row
  const hoverEls = Array.from(
    document.querySelectorAll('[data-sound="hover"]')
  );
  hoverEls.forEach((el, i) => {
    const freq = pianoNotes[i % pianoNotes.length];
    el.addEventListener('mouseenter', () => playSound(freq, 0.13));
  });
  // Click vẫn giữ nguyên
  document.querySelectorAll('[data-sound="click"]').forEach(el => {
    el.addEventListener('click', () => playSound(523, 0.12));
  });

  // --- Info-row double click to open link logic ---
  let pendingInfoRow = null;
  let pendingTimeout = null;

  // Double-tap/click to open info-row links
  document.querySelectorAll('a.info-row').forEach(row => {
    row.addEventListener('click', function (e) {
      if (pendingInfoRow === row) {
        // Lần nhấn thứ 2, mở link
        pendingInfoRow = null;
        clearTimeout(pendingTimeout);
        row.classList.remove('pending');
        // Mở link theo target
        if (row.target === '_blank') {
          window.open(row.href, '_blank');
        } else {
          window.location.href = row.href;
        }
      } else {
        // Lần nhấn đầu, chỉ hiệu ứng
        e.preventDefault();
        if (pendingInfoRow) {
          pendingInfoRow.classList.remove('pending');
        }
        pendingInfoRow = row;
        row.classList.add('pending');
        pendingTimeout = setTimeout(() => {
          if (pendingInfoRow) {
            pendingInfoRow.classList.remove('pending');
            pendingInfoRow = null;
          }
        }, 2000);
      }
    });
  });

  // Nếu nhấn ra ngoài, reset trạng thái
  document.addEventListener('click', e => {
    if (pendingInfoRow && !e.target.closest('a.info-row')) {
      pendingInfoRow.classList.remove('pending');
      pendingInfoRow = null;
      clearTimeout(pendingTimeout);
    }
  });
});
