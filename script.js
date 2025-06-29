// Audio Context for Sound Effects
let audioContext;
let soundEnabled = true;

function initAudio() {
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  } catch (e) {
    // Audio not supported
  }
}

function playSound(frequency = 440, duration = 0.1) {
  if (!soundEnabled || !audioContext) return;
  
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = frequency;
  oscillator.type = 'sine';
  
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
}

// Loading Screen
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    }, 2000);
  }
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const soundToggle = document.getElementById('sound-toggle');
const body = document.body;

if (themeToggle && soundToggle) {
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

  // Sound Toggle
  soundEnabled = localStorage.getItem('sound') !== 'disabled';
  soundToggle.querySelector('.icon').textContent = soundEnabled ? '🔊' : '🔇';

  soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundToggle.querySelector('.icon').textContent = soundEnabled ? '🔊' : '🔇';
    localStorage.setItem('sound', soundEnabled ? 'enabled' : 'disabled');
    playSound(659, 0.1);
  });

  // Keyboard navigation for toggles
  [themeToggle, soundToggle].forEach(toggle => {
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle.click();
      }
    });
  });
}

// Enhanced Wind Effect
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

// Greet by hour with enhanced animation
const subtitle = document.getElementById('subtitle');
if (subtitle) {
  const hour = new Date().getHours();
  const greetings = {
    morning: 'Good morning ☀️',
    afternoon: 'Good afternoon 🌤️',
    evening: 'Good evening 🌅',
    night: 'Good night 🌙'
  };

  let greeting;
  if (hour >= 5 && hour < 12) greeting = greetings.morning;
  else if (hour < 18) greeting = greetings.afternoon;
  else if (hour < 22) greeting = greetings.evening;
  else greeting = greetings.night;

  subtitle.innerText = greeting;
}

// Enhanced Bio typing effect
const bio = document.getElementById('bio-text');
if (bio) {
  const bioContent = '👋 Hey there, I\'m Zaoo, a passionate web developer in the learning phase, seeking knowledge and gaining experience to develop myself day by day. Always excited to learn new technologies! 🚀';
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

// Enhanced Copy phone with notification
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

// Enhanced Hover effects with sound
const rows = document.querySelectorAll('.info-row');
rows.forEach((row) => {
  row.addEventListener('mouseenter', () => {
    row.classList.add('active');
    if (row.dataset.sound === 'hover') {
      playSound(659, 0.05);
    }
  });
  row.addEventListener('mouseleave', () => row.classList.remove('active'));
  row.addEventListener('click', () => {
    if (row.dataset.sound === 'click') {
      playSound(523, 0.1);
    }
  });
});

// Enhanced Parallax card tilt with debouncing
const card = document.querySelector('.card');
if (card) {
  let tiltTimeout;

  document.addEventListener('mousemove', (e) => {
    clearTimeout(tiltTimeout);
    
    tiltTimeout = setTimeout(() => {
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      card.style.transform = `rotateY(${x / 30}deg) rotateX(${-y / 30}deg)`;
    }, 16); // ~60fps
  });

  // Reset card position when mouse leaves
  document.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateY(0deg) rotateX(0deg)';
  });
}

// Optimized scroll progress with throttling
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (!scrollTimeout) {
    scrollTimeout = setTimeout(() => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      const scrollProgress = document.getElementById('scroll-progress');
      if (scrollProgress) {
        scrollProgress.style.width = scrollPercent + '%';
      }
      scrollTimeout = null;
    }, 16);
  }
});

// Action Buttons
const downloadCvBtn = document.getElementById('download-cv');
if (downloadCvBtn) {
  downloadCvBtn.addEventListener('click', (e) => {
    e.preventDefault();
    playSound(523, 0.2);
    showNotification('📄 CV download feature coming soon!', 'info');
  });
}

const portfolioBtn = document.getElementById('portfolio');
if (portfolioBtn) {
  portfolioBtn.addEventListener('click', (e) => {
    e.preventDefault();
    playSound(659, 0.2);
    showNotification('🎨 Portfolio feature coming soon!', 'info');
  });
}

// Share Card functionality
const shareCardBtn = document.getElementById('share-card');
if (shareCardBtn) {
  shareCardBtn.addEventListener('click', (e) => {
    e.preventDefault();
    playSound(659, 0.2);
    
    if (navigator.share) {
      navigator.share({
        title: 'nzaoo - Web Developer',
        text: 'Check out my digital business card!',
        url: window.location.href
      }).then(() => {
        showNotification('📤 Card shared successfully!', 'success');
      }).catch(() => {
        copyToClipboard();
      });
    } else {
      copyToClipboard();
    }
  });
}

function copyToClipboard() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    showNotification('📋 Card link copied to clipboard!', 'success');
  }).catch(() => {
    showNotification('📤 Share feature not available', 'info');
  });
}

// Skills hover effect
const skillItems = document.querySelectorAll('.skill-item');
if (skillItems.length > 0) {
  skillItems.forEach((skill, index) => {
    skill.addEventListener('mouseenter', () => {
      playSound(440 + index * 20, 0.1);
    });
  });
}

// Stagger animation with enhanced timing
window.addEventListener('DOMContentLoaded', () => {
  const profileSection = document.querySelector('.profile-section');
  if (profileSection) {
    profileSection.classList.add('show');
  }
  const items = document.querySelectorAll('.fade-item');
  items.forEach((item, idx) => {
    setTimeout(() => item.classList.add('show'), 500 + idx * 200);
  });
});

// Initialize audio on first interaction
document.addEventListener('click', () => {
  if (!audioContext) {
    initAudio();
  }
}, { once: true });

// Interactive Background - Stars
const starsContainer = document.getElementById('stars-container');
if (starsContainer) {
  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * window.innerWidth + 'px';
    star.style.top = Math.random() * window.innerHeight + 'px';
    star.style.animationDelay = Math.random() * 3 + 's';
    star.style.animationDuration = (2 + Math.random() * 2) + 's';
    starsContainer.appendChild(star);
  }
}

// Interactive Background - Bubbles
const bubblesContainer = document.getElementById('bubbles-container');
if (bubblesContainer) {
  const createBubble = () => {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.style.left = Math.random() * window.innerWidth + 'px';
    bubble.style.width = (20 + Math.random() * 40) + 'px';
    bubble.style.height = bubble.style.width;
    bubble.style.animationDuration = (6 + Math.random() * 4) + 's';
    bubble.style.animationDelay = Math.random() * 2 + 's';
    bubblesContainer.appendChild(bubble);
    
    // Remove bubble after animation
    setTimeout(() => {
      if (bubble.parentNode) {
        bubble.parentNode.removeChild(bubble);
      }
    }, 10000);
  };

  // Create bubbles periodically
  setInterval(createBubble, 2000);
  createBubble(); // Create first bubble
}

// Generate QR Code
function generateQRCode() {
  const qrContainer = document.getElementById('qr-container');
  if (qrContainer) {
    const currentUrl = window.location.href;
    
    // Use a free QR code API
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(currentUrl)}`;
    
    const qrImage = document.createElement('img');
    qrImage.src = qrUrl;
    qrImage.alt = 'QR Code';
    qrImage.style.width = '100%';
    qrImage.style.height = '100%';
    qrImage.style.borderRadius = '8px';
    
    qrImage.onload = () => {
      qrContainer.innerHTML = '';
      qrContainer.appendChild(qrImage);
    };
    
    qrImage.onerror = () => {
      qrContainer.innerHTML = '<div class="qr-placeholder">QR Code unavailable</div>';
    };
  }
}

// Generate QR code after page loads
setTimeout(generateQRCode, 1000);

// Live Status Management
const statusDot = document.getElementById('status-dot');
const statusText = document.getElementById('status-text');
const statusIndicator = document.getElementById('status-indicator');
const adminModeIndicator = document.getElementById('admin-mode-indicator');

const statuses = [
  { class: 'available', text: 'Available for work', color: '#4CAF50' },
  { class: 'busy', text: 'Currently busy', color: '#FF9800' },
  { class: 'away', text: 'Away from keyboard', color: '#FFC107' }
];

let currentStatusIndex = 0;
let adminMode = false;

const updateStatus = () => {
  if (statusDot && statusText) {
    const status = statuses[currentStatusIndex];
    statusDot.className = `status-dot ${status.class}`;
    statusText.textContent = status.text;
  }
};

const toggleAdminMode = () => {
  if (!statusIndicator || !adminModeIndicator) return;
  
  adminMode = !adminMode;
  
  if (adminMode) {
    statusIndicator.classList.add('admin-mode');
    adminModeIndicator.classList.add('show');
    showNotification('🔧 Admin mode activated! You can now change status.', 'success');
    playSound(523, 0.2);
    
    // Add click to change status only in admin mode
    statusIndicator.onclick = () => {
      currentStatusIndex = (currentStatusIndex + 1) % statuses.length;
      updateStatus();
      playSound(523, 0.1);
      showNotification(`Status changed to: ${statuses[currentStatusIndex].text}`, 'info');
    };
  } else {
    statusIndicator.classList.remove('admin-mode');
    adminModeIndicator.classList.remove('show');
    showNotification('🔒 Admin mode deactivated.', 'info');
    playSound(659, 0.2);
    
    // Remove click functionality
    statusIndicator.onclick = null;
  }
};

// Auto change status based on time (only when not in admin mode)
const autoUpdateStatus = () => {
  if (!adminMode) {
    const hour = new Date().getHours();
    if (hour >= 9 && hour < 18) {
      currentStatusIndex = 0; // Available during work hours
    } else if (hour >= 18 && hour < 22) {
      currentStatusIndex = 2; // Away in evening
    } else {
      currentStatusIndex = 1; // Busy at night
    }
    updateStatus();
  }
};

if (statusDot && statusText && statusIndicator && adminModeIndicator) {
  updateStatus();
  autoUpdateStatus();

  // Update status every hour (only when not in admin mode)
  setInterval(autoUpdateStatus, 3600000);
}

// Add some fun Easter eggs
let clickCount = 0;
const nameElement = document.querySelector('.name');
if (nameElement) {
  nameElement.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 5) {
      showNotification('🎉 You found the secret! You\'re awesome!', 'success');
      playSound(523, 0.3);
      setTimeout(() => playSound(659, 0.3), 300);
      setTimeout(() => playSound(784, 0.3), 600);
      clickCount = 0;
    }
  });
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey) {
    switch(e.key) {
    case 't':
      e.preventDefault();
      if (themeToggle) themeToggle.click();
      break;
    case 'm':
      e.preventDefault();
      if (soundToggle) soundToggle.click();
      break;
    }
  }
  
  // Admin mode toggle
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'z') {
    e.preventDefault();
    toggleAdminMode();
  }
});

// Simple Analytics
function trackEvent(eventName, data = {}) {
  const analytics = JSON.parse(localStorage.getItem('cardAnalytics') || '{}');
  const today = new Date().toDateString();
  
  if (!analytics[today]) {
    analytics[today] = { visits: 0, interactions: {} };
  }
  
  if (eventName === 'visit') {
    analytics[today].visits++;
  } else {
    analytics[today].interactions[eventName] = (analytics[today].interactions[eventName] || 0) + 1;
  }
  
  localStorage.setItem('cardAnalytics', JSON.stringify(analytics));
}

// Track initial visit
trackEvent('visit');

// Track various interactions
const infoRows = document.querySelectorAll('.info-row');
if (infoRows.length > 0) {
  infoRows.forEach(row => {
    row.addEventListener('click', () => {
      const label = row.querySelector('.label');
      if (label) {
        trackEvent(`click_${label.textContent.toLowerCase()}`);
      }
    });
  });
}

const skillItemsForTracking = document.querySelectorAll('.skill-item');
if (skillItemsForTracking.length > 0) {
  skillItemsForTracking.forEach(skill => {
    skill.addEventListener('click', () => {
      trackEvent(`click_skill_${skill.textContent.toLowerCase()}`);
    });
  });
} 