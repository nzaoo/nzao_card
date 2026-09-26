# 🌟 Nzaoo Card - Digital Business Card

![GitHub stars](https://img.shields.io/github/stars/nzaoo/nzao_card?style=social)
![GitHub forks](https://img.shields.io/github/forks/nzaoo/nzao_card?style=social)
![GitHub issues](https://img.shields.io/github/issues/nzaoo/nzao_card)
![GitHub license](https://img.shields.io/github/license/nzaoo/nzao_card)

**A modern, interactive digital business card with stunning animations and professional features**

[🌐 Live Demo](https://nzaoo.github.io/nzao_card/) • [📧 Contact](mailto:nzao1327@gmail.com)

---

## ✨ Features

- Starry night sky, glassmorphism, gradient & tilt effects
- Light/dark theme, sound toggle, song ngữ Tiếng Việt / English
- Save contact (vCard), Share (Web Share API), copy phone/email with toast
- QR code (QRious bundled locally), social links
- Installable PWA that works offline (service worker)
- Responsive design, cross-browser support

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/nzaoo/nzao_card.git
   cd nzao_card
   ```
2. **Run a local server** (service worker needs `http://`, not `file://`)
   ```bash
   npx serve -l 4173 .
   ```
   Then open http://localhost:4173

## 🧰 Development

```bash
npm install          # linters + qrious
npm run lint         # ESLint + Stylelint + HTMLHint
npm run format       # Prettier
npm run vendor       # re-copy qrious.min.js into js/vendor/
```

```
index.html          # markup + SEO / JSON-LD profile
css/main.css        # all styles (dark + light theme)
js/i18n.js          # VI/EN strings and language toggle
js/audio.js         # Web Audio click sounds
js/theme.js         # light/dark toggle
js/main.js          # greeting, QR, tilt, vCard, share, copy, SW register
js/vendor/          # third-party scripts served locally
sw.js               # offline cache (bump CACHE when adding files)
manifest.json       # PWA manifest
```

## 🌐 Deploy to GitHub Page

1. Push code lên nhánh `main` hoặc `gh-pages`.
2. Vào repo > Settings > Pages > Source: chọn branch chứa `index.html`.
3. Truy cập: `https://<username>.github.io/nzao_card/`

## 📱 Contact & Social

- **Email**: nzao1327@gmail.com
- **Phone**: 0359 511 473
- **GitHub**: [nzaoo](https://github.com/nzaoo)
- **Facebook**: [nzao13](https://facebook.com/nzao13)
- **Instagram**: [zn_zaoo](https://instagram.com/zn_zaoo)
- **TikTok**: [nzaoo103](https://tiktok.com/@nzaoo103)
- **Zalo**: [0359511473](https://zalo.me/0359511473)
- **Locket**: [zaoo zaoo](https://locket.camera/links/AWqbNEQhR9LnRvYd7)

## 🛠️ Technologies

- HTML5, CSS3, JavaScript (ES6+)
- Web Audio API, Web Share API, Service Worker, CSS Animation, Flexbox, Grid

## 🤝 Contributing

- Fork, tạo branch, commit, pull request
- Đóng góp ý tưởng, code, UI/UX, tài liệu

## 📄 License

MIT License

---

**Made with ❤️ by [nzaoo](https://github.com/nzaoo)**

## 📊 GitHub Analytics

![GitHub Stats](https://github-readme-stats.vercel.app/api?username=nzaoo&show_icons=true&theme=radical)
![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=nzaoo&layout=compact&theme=radical)
![GitHub Streak](https://streak-stats.demolab.com?user=nzaoo&theme=radical)
![Activity Graph](https://github-readme-activity-graph.vercel.app/graph?username=nzaoo&theme=react-dark)
