// ===== Lời chào theo giờ =====
const subtitle = document.querySelector('.subtitle');
const hour = new Date().getHours();
if (hour >= 5 && hour < 12) {
  subtitle.innerText = "Good morning ☀️";
} else if (hour >= 12 && hour < 18) {
  subtitle.innerText = "Good afternoon 🌤️";
} else {
  subtitle.innerText = "Good night 🌙";
}

// ===== Icon thời tiết theo giờ =====
const weatherIcon = document.getElementById("weather-icon");
if (weatherIcon) {
  if (hour >= 5 && hour < 12) {
    weatherIcon.innerText = "🌅";
  } else if (hour >= 12 && hour < 18) {
    weatherIcon.innerText = "🌞";
  } else {
    weatherIcon.innerText = "🌃";
  }
}

// ===== Copy phone (với toast) =====
const phoneRow = document.querySelector('.info-row .label + div');
if (phoneRow) {
  phoneRow.style.cursor = 'pointer';
  phoneRow.title = 'Click to copy';
  phoneRow.addEventListener('click', () => {
    navigator.clipboard.writeText(phoneRow.innerText);
    showToast('📞 Số điện thoại đã được sao chép!');
  });
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.innerText = msg;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #333;
    color: white;
    padding: 10px 18px;
    border-radius: 8px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1000;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.style.opacity = 1, 10);
  setTimeout(() => {
    toast.style.opacity = 0;
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ===== Parallax card movement =====
const card = document.querySelector('.card');
document.addEventListener('mousemove', (e) => {
  const { clientX, clientY } = e;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const deltaX = (clientX - centerX) / 30;
  const deltaY = (clientY - centerY) / 30;
  card.style.transform = `rotateY(${deltaX}deg) rotateX(${-deltaY}deg)`;
});

// ===== Bio typing effect (looping) =====
const bioText = document.getElementById("bio-text");
const bioString = "👋 Hey there, I’m Zaoo, a web developer in the learning phase, seeking knowledge and gaining experience to develop myself day by day.";
let index = 0;

function typeBioLoop() {
  if (index < bioString.length) {
    bioText.innerText += bioString[index];
    index++;
    setTimeout(typeBioLoop, 25);
  } else {
    setTimeout(() => {
      bioText.innerText = "";
      index = 0;
      typeBioLoop();
    }, 3000);
  }
}
typeBioLoop();

// ===== Hiệu ứng fade in từng dòng =====
window.addEventListener("DOMContentLoaded", () => {
  const fadeItems = document.querySelectorAll(".fade-item");
  fadeItems.forEach((item, idx) => {
    setTimeout(() => {
      item.classList.add("show");
    }, 300 + idx * 200);
  });
<<<<<<< HEAD
});
=======
});
>>>>>>> 264c67f (Cập nhật nội dung trang web)
