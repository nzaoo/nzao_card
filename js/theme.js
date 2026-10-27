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
  let isLight = false;

  try {
    isLight = localStorage.getItem('theme') === 'light';
  } catch {
    // Storage blocked (private mode); start in the dark theme.
  }

  applyTheme(isLight);
  icon.textContent = isLight ? '☀️' : '🌙';

  themeToggle.addEventListener('click', () => {
    isLight = !isLight;
    applyTheme(isLight);
    icon.textContent = isLight ? '☀️' : '🌙';
    try {
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    } catch {
      // Ignore: the toggle still works for this visit.
    }
    playSound(523, 0.1);
  });
}
