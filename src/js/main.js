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

// Download CV
const downloadCVBtn = document.getElementById('download-cv');
if (downloadCVBtn) {
  downloadCVBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Đường dẫn file CV, bạn có thể thay đổi nếu cần
    const cvUrl = 'assets/cv.pdf';
    // Tạo thẻ a ẩn để tải file
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'nzaoo-cv.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (typeof showNotification === 'function') {
      showNotification('📄 Đã bắt đầu tải CV!', 'success');
    }
  });
}

// Share Card
const shareCardBtn = document.getElementById('share-card');
if (shareCardBtn) {
  shareCardBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const shareData = {
      title: 'nzaoo Card',
      text: 'Xem card cá nhân của nzaoo!',
      url: window.location.href
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        if (typeof showNotification === 'function') {
          showNotification('📤 Đã chia sẻ thành công!', 'success');
        }
      } catch (err) {
        if (typeof showNotification === 'function') {
          showNotification('❌ Chia sẻ bị huỷ hoặc lỗi!', 'error');
        }
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        if (typeof showNotification === 'function') {
          showNotification('🔗 Đã copy link card vào clipboard!', 'success');
        }
      } catch (err) {
        if (typeof showNotification === 'function') {
          showNotification('❌ Không copy được link!', 'error');
        }
      }
    } else {
      alert('Trình duyệt của bạn không hỗ trợ chia sẻ hoặc copy link!');
    }
  });
}
