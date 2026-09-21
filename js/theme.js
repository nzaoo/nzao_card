/* global playSound */
/* exported initThemeToggle */
function applyTheme(isLight) {
  document.body.classList.toggle('light-theme', isLight);
}

function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');

  if (!themeToggle) {
    return;
  }

  const icon = themeToggle.querySelector('.icon');
  let isLight = localStorage.getItem('theme') === 'light';

  applyTheme(isLight);
  icon.textContent = isLight ? '☀️' : '🌙';

  themeToggle.addEventListener('click', () => {
    isLight = !isLight;
    applyTheme(isLight);
    icon.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    playSound(523, 0.1);
  });
}
