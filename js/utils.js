import { playSound } from './audio.js';

// Notification System
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: ${type === 'success' ? 'rgba(76, 175, 80, 0.9)' : 'rgba(33, 150, 243, 0.9)'};
    color: white;
    padding: 15px 25px;
    border-radius: 25px;
    z-index: 10000;
    backdrop-filter: blur(10px);
    animation: slideDown 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideUp 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// Add CSS for notifications
function addNotificationStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideDown {
      from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
      to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
    @keyframes slideUp {
      from { transform: translateX(-50%) translateY(0); opacity: 1; }
      to { transform: translateX(-50%) translateY(-100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

// Copy to clipboard functionality
function copyToClipboard() {
  const phoneNumber = document.getElementById('phone-number');
  if (phoneNumber) {
    phoneNumber.style.cursor = 'pointer';
    phoneNumber.title = 'Click to copy';

    phoneNumber.addEventListener('click', () => {
      navigator.clipboard.writeText(phoneNumber.innerText).then(() => {
        playSound(523, 0.2);
        showNotification('📞 Phone number copied!', 'success');
      });
    });
  }
}

// QR Code generation
function generateQRCode() {
  const qrContainer = document.getElementById('qr-container');
  if (qrContainer) {
    // Xóa placeholder hoặc QR code cũ nếu có
    qrContainer.innerHTML = '';
    const qrCode = document.createElement('div');
    qrCode.className = 'qr-code';
    qrCode.innerHTML = `
      <div class="qr-grid">
        ${Array.from(
          { length: 25 },
          () =>
            `<div class="qr-cell ${Math.random() > 0.5 ? 'filled' : ''}"></div>`
        ).join('')}
      </div>
    `;
    qrContainer.appendChild(qrCode);
  }
}

// Performance monitoring
let fpsCounter = 0;
let lastTime = performance.now();

function updateFPS() {
  fpsCounter++;
  const currentTime = performance.now();

  if (currentTime - lastTime >= 1000) {
    const fps = Math.round((fpsCounter * 1000) / (currentTime - lastTime));
    const fpsDisplay = document.getElementById('fps-display');
    if (fpsDisplay) {
      fpsDisplay.textContent = `FPS: ${fps}`;
    }
    fpsCounter = 0;
    lastTime = currentTime;
  }

  requestAnimationFrame(updateFPS);
}

// Event tracking
function trackEvent(eventName) {
  // Simple event tracking - can be extended with analytics
  // Event: ${eventName}

  // Store in localStorage for basic analytics
  const events = JSON.parse(localStorage.getItem('events') || '[]');
  events.push({
    name: eventName,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
  });
  localStorage.setItem('events', JSON.stringify(events.slice(-100))); // Keep last 100 events
}

export {
  showNotification,
  addNotificationStyles,
  copyToClipboard,
  generateQRCode,
  updateFPS,
  trackEvent,
};
