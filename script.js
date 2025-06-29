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
  setTimeout(() => {
    document.getElementById('loading-screen').classList.add('hidden');
    setTimeout(() => {
      document.getElementById('loading-screen').style.display = 'none';
    }, 500);
  }, 2000);
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
let isDark = true;

themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  if (isDark) {
    body.classList.remove('light-theme');
    themeToggle.querySelector('.icon').textContent = '🌙';
  } else {
    body.classList.add('light-theme');
    themeToggle.querySelector('.icon').textContent = '☀️';
  }
  playSound(523, 0.1);
});

// Sound Toggle
const soundToggle = document.getElementById('sound-toggle');
soundToggle.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  soundToggle.querySelector('.icon').textContent = soundEnabled ? '🔊' : '🔇';
  playSound(659, 0.1);
});

// Enhanced Wind Effect
const windContainer = document.getElementById('wind-container');
for (let i = 0; i < 60; i++) {
  const dot = document.createElement('div');
  dot.className = 'particle';
  dot.style.left = Math.random() * window.innerWidth + 'px';
  dot.style.top = Math.random() * window.innerHeight + 'px';
  dot.style.animationDuration = 5 + Math.random() * 15 + 's';
  dot.style.animationDelay = Math.random() * 5 + 's';
  windContainer.appendChild(dot);
}

// Greet by hour with enhanced animation
const subtitle = document.getElementById('subtitle');
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

// Enhanced Bio typing effect
const bio = document.getElementById('bio-text');
const bioContent = '👋 Hey there, I\'m Zaoo, a passionate web developer in the learning phase, seeking knowledge and gaining experience to develop myself day by day. Always excited to learn new technologies! 🚀';
let i = 0;

function typeBio() {
  if (i < bioContent.length) {
    bio.textContent += bioContent.charAt(i);
    i++;
    setTimeout(typeBio, 30);
  }
}

setTimeout(typeBio, 1000);

// Enhanced Copy phone with notification
const phoneNumber = document.getElementById('phone-number');
phoneNumber.style.cursor = 'pointer';
phoneNumber.title = 'Click to copy';

phoneNumber.addEventListener('click', () => {
  navigator.clipboard.writeText(phoneNumber.innerText).then(() => {
    playSound(523, 0.2);
    showNotification('📞 Phone number copied!', 'success');
  });
});

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

// Enhanced Parallax card tilt
const card = document.querySelector('.card');
document.addEventListener('mousemove', (e) => {
  const x = e.clientX - window.innerWidth / 2;
  const y = e.clientY - window.innerHeight / 2;
  card.style.transform = `rotateY(${x / 30}deg) rotateX(${-y / 30}deg)`;
});

// Scroll Progress
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.offsetHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById('scroll-progress').style.width = scrollPercent + '%';
});

// Action Buttons
document.getElementById('download-cv').addEventListener('click', (e) => {
  e.preventDefault();
  playSound(523, 0.2);
  showNotification('📄 CV download feature coming soon!', 'info');
});

document.getElementById('portfolio').addEventListener('click', (e) => {
  e.preventDefault();
  playSound(659, 0.2);
  showNotification('🎨 Portfolio feature coming soon!', 'info');
});

// Skills hover effect
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach((skill, index) => {
  skill.addEventListener('mouseenter', () => {
    playSound(440 + index * 20, 0.1);
  });
});

// Stagger animation with enhanced timing
window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.profile-section').classList.add('show');
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
for (let i = 0; i < 100; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  star.style.left = Math.random() * window.innerWidth + 'px';
  star.style.top = Math.random() * window.innerHeight + 'px';
  star.style.animationDelay = Math.random() * 3 + 's';
  star.style.animationDuration = (2 + Math.random() * 2) + 's';
  starsContainer.appendChild(star);
}

// Interactive Background - Bubbles
const bubblesContainer = document.getElementById('bubbles-container');
function createBubble() {
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
}

// Create bubbles periodically
setInterval(createBubble, 2000);
createBubble(); // Create first bubble

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

function updateStatus() {
  const status = statuses[currentStatusIndex];
  statusDot.className = `status-dot ${status.class}`;
  statusText.textContent = status.text;
}

function toggleAdminMode() {
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
}

// Auto change status based on time (only when not in admin mode)
function autoUpdateStatus() {
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
}

updateStatus();
autoUpdateStatus();

// Update status every hour (only when not in admin mode)
setInterval(autoUpdateStatus, 3600000);

// Add some fun Easter eggs
let clickCount = 0;
document.querySelector('.name').addEventListener('click', () => {
  clickCount++;
  if (clickCount === 5) {
    showNotification('🎉 You found the secret! You\'re awesome!', 'success');
    playSound(523, 0.3);
    setTimeout(() => playSound(659, 0.3), 300);
    setTimeout(() => playSound(784, 0.3), 600);
    clickCount = 0;
  }
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey) {
    switch(e.key) {
    case 't':
      e.preventDefault();
      themeToggle.click();
      break;
    case 'm':
      e.preventDefault();
      soundToggle.click();
      break;
    }
  }
  
  // Admin mode toggle
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'z') {
    e.preventDefault();
    toggleAdminMode();
  }
}); 