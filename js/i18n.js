/* global playSound */
/* exported t, initLanguageToggle */
const TRANSLATIONS = {
  en: {
    role: 'Automation Engineer / Developer',
    bio: 'Building clean automations and developer tools for smarter workflows.',
    contact: 'Contact',
    saveContact: 'Save contact',
    share: 'Share',
    connectHint: 'Scan or tap NFC to open this card.',
    greetingMorning: 'Good morning',
    greetingAfternoon: 'Good afternoon',
    greetingEvening: 'Good evening',
    greetingNight: 'Good night',
    copied: 'Copied',
    copyFailed: 'Could not copy',
    linkCopied: 'Link copied',
    shareTitle: 'nzaoo | Automation Engineer / Developer',
  },
  vi: {
    role: 'Kỹ sư tự động hoá / Lập trình viên',
    bio: 'Xây dựng tự động hoá gọn gàng và công cụ lập trình cho quy trình làm việc thông minh hơn.',
    contact: 'Liên hệ',
    saveContact: 'Lưu danh bạ',
    share: 'Chia sẻ',
    connectHint: 'Quét mã hoặc chạm NFC để mở thẻ này.',
    greetingMorning: 'Chào buổi sáng',
    greetingAfternoon: 'Chào buổi chiều',
    greetingEvening: 'Chào buổi tối',
    greetingNight: 'Chúc ngủ ngon',
    copied: 'Đã sao chép',
    copyFailed: 'Không sao chép được',
    linkCopied: 'Đã sao chép liên kết',
    shareTitle: 'nzaoo | Kỹ sư tự động hoá / Lập trình viên',
  },
};

function detectLanguage() {
  let saved = null;

  try {
    saved = localStorage.getItem('lang');
  } catch {
    // Storage blocked (private mode); fall back to the browser language.
  }

  if (saved && TRANSLATIONS[saved]) {
    return saved;
  }

  return (navigator.language || '').toLowerCase().startsWith('vi')
    ? 'vi'
    : 'en';
}

let currentLang = detectLanguage();

function t(key) {
  return TRANSLATIONS[currentLang][key] || TRANSLATIONS.en[key] || key;
}

function applyLanguage() {
  document.documentElement.lang = currentLang;
  document.querySelectorAll('[data-i18n]').forEach(element => {
    element.textContent = t(element.dataset.i18n);
  });
  document.dispatchEvent(new CustomEvent('languagechange'));
}

function initLanguageToggle() {
  const toggle = document.getElementById('lang-toggle');

  applyLanguage();

  if (!toggle) {
    return;
  }

  const icon = toggle.querySelector('.icon');
  // The button shows the language you would switch to.
  const renderIcon = () => {
    icon.textContent = currentLang === 'vi' ? 'EN' : 'VI';
  };

  renderIcon();

  toggle.addEventListener('click', () => {
    currentLang = currentLang === 'vi' ? 'en' : 'vi';

    try {
      localStorage.setItem('lang', currentLang);
    } catch {
      // Ignore: language still switches for this visit.
    }

    applyLanguage();
    renderIcon();
    playSound(587, 0.1);
  });
}
