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

document.addEventListener('DOMContentLoaded', () => {
  // Download CV
  const downloadCVBtn = document.getElementById('download-cv');
  if (downloadCVBtn) {
    downloadCVBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const cvUrl = 'assets/cv.pdf';
      fetch(cvUrl)
        .then(response => {
          if (!response.ok) throw new Error('File not found');
          return response.blob();
        })
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'nzaoo-cv.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          if (typeof showNotification === 'function') {
            showNotification('📄 CV download started!', 'success');
          }
        })
        .catch(() => {
          if (typeof showNotification === 'function') {
            showNotification('❌ CV file not found!', 'error');
          }
        });
    });
  }

  // Share Card
  const shareCardBtn = document.getElementById('share-card');
  if (shareCardBtn) {
    shareCardBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const shareData = {
        title: 'nzaoo Card',
        text: 'Check out nzaoo personal card!',
        url: window.location.href
      };
      if (navigator.share) {
        try {
          await navigator.share(shareData);
          if (typeof showNotification === 'function') {
            showNotification('📤 Card shared successfully!', 'success');
          }
        } catch (err) {
          if (typeof showNotification === 'function') {
            showNotification('❌ Share cancelled or failed!', 'error');
          }
        }
      } else {
        // Always fallback to copy link
        try {
          await navigator.clipboard.writeText(window.location.href);
          if (typeof showNotification === 'function') {
            showNotification('🔗 Card link copied to clipboard!', 'success');
          }
        } catch (err) {
          if (typeof showNotification === 'function') {
            showNotification('❌ Could not copy link!', 'error');
          }
        }
      }
    });
  }
});
