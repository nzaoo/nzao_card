// Main application entry point
import { initAudio, initSoundToggle } from './audio.js';
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
  window.alert(performanceMode ? 'Performance mode ON' : 'Performance mode OFF');
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
});
