// Lời chào theo giờ
const subtitle = document.querySelector('.subtitle');
const hour = new Date().getHours();
if (hour >= 5 && hour < 12) {
  subtitle.innerText = "Good morning ☀️";
} else if (hour >= 12 && hour < 18) {
  subtitle.innerText = "Good afternoon 🌤️";
} else {
  subtitle.innerText = "Good night 🌙";
}

// Copy phone
const phoneRow = document.querySelector('.info-row .label + div');
if (phoneRow) {
  phoneRow.style.cursor = 'pointer';
  phoneRow.title = 'Click to copy';
  phoneRow.addEventListener('click', () => {
    navigator.clipboard.writeText(phoneRow.innerText);
    alert('📞 Số điện thoại đã được sao chép!');
  });
}

// Parallax effect
const card = document.querySelector('.card');
document.addEventListener('mousemove', (e) => {
  const { clientX, clientY } = e;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const deltaX = (clientX - centerX) / 30;
  const deltaY = (clientY - centerY) / 30;
  card.style.transform = `rotateY(${deltaX}deg) rotateX(${-deltaY}deg)`;
});

// Bio typing effect
const bioText = document.getElementById("bio-text");
const bioString = "👋 Hey there, I’m Zaoo, a web developer in the learning phase, seeking knowledge and gaining experience to develop myself day by day.";
let index = 0;
function typeBio() {
  if (index < bioString.length) {
    bioText.innerText += bioString[index];
    index++;
    setTimeout(typeBio, 25);
  }
}   
typeBio();

// Fade in từng dòng
window.addEventListener('DOMContentLoaded', () => {
  const fadeItems = document.querySelectorAll(".fade-item");
  fadeItems.forEach((item, idx) => {
    setTimeout(() => {
      item.classList.add("show");
    }, 300 + idx * 200);
  });
});
