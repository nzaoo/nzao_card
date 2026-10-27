# 🚀 Hướng Dẫn Tạo Digital Business Card

## 📋 Bước 1: Chuẩn Bị

- Cài đặt **Git** và **Node.js** (Node 20 trở lên, để chạy lint và test)
- Có tài khoản **GitHub**
- Biết cơ bản HTML, CSS, JavaScript

## ⚙️ Bước 2: Tạo Dự Án

```bash
# Clone template này
git clone https://github.com/nzaoo/nzao_card.git
cd nzao_card

# Hoặc tạo mới
mkdir my-card
cd my-card
```

## 📁 Bước 3: Cấu Trúc File

```
nzao_card/
├── index.html        # Trang chính: nội dung, SEO, JSON-LD
├── css/main.css      # Toàn bộ style (dark + light theme)
├── js/               # i18n, audio, theme, main
├── assets/icon/      # Ảnh avatar, icon PWA, icon mạng xã hội
├── sw.js             # Service worker (chạy offline)
├── manifest.json     # Cấu hình PWA (Add to Home Screen)
└── tests/            # Smoke test Playwright
```

## ✏️ Bước 4: Tùy Chỉnh Nội Dung

### **Thay đổi thông tin cá nhân trong `index.html`:**

- Tên, chức danh, lời giới thiệu (bio)
- Email, số điện thoại, link mạng xã hội
- Ảnh đại diện trong `assets/icon/`
- Khối JSON-LD trong `<head>` cũng chứa tên, email, số điện thoại. Nút "Lưu danh bạ" đọc dữ liệu từ khối này, nên sửa ở đó để file `.vcf` đúng.

### **Thay đổi màu sắc trong `css/main.css`:**

```css
:root {
  --color-accent: #d8b45c; /* Màu nhấn */
  --color-bg: #030303; /* Nền */
  --color-text: #f7f3e8; /* Chữ */
}
```

Chế độ sáng có bộ biến riêng trong `body.light-theme`.

## ✨ Bước 5: Thêm Hiệu Ứng (Tùy chọn)

### **Có sẵn:**

- 🌟 Sao lấp lánh và sao băng (CSS)
- Nghiêng thẻ theo chuột, chỉ trên thiết bị có chuột và khi không bật "giảm chuyển động"
- Âm thanh click, bật/tắt bằng nút loa
- Chế độ sáng/tối, bật/tắt bằng nút mặt trăng/mặt trời
- Chuyển ngôn ngữ VI/EN bằng nút VI/EN

### **Thêm mới:**

- Copy code từ các hiệu ứng có sẵn
- Thay đổi màu sắc và thời gian
- Test trên browser

## 🚀 Bước 6: Deploy Lên Web

### **GitHub Pages (Miễn phí):**

```bash
git init
git add .
git commit -m "My digital card"
git branch -M main
git remote add origin https://github.com/username/repo.git
git push -u origin main
```

Sau đó vào Settings > Pages > Enable GitHub Pages

### **Netlify (Miễn phí):**

- Kéo thả folder vào netlify.com
- Hoặc connect GitHub repository

## 🎯 Tips Nhanh

### **Tối ưu hiệu suất:**

- Giảm số lớp sao trong `.starfield` (`css/main.css`) nếu máy yếu
- Bỏ lớp ánh sáng `body::after` (có `blur` lớn) nếu muốn nhẹ hơn
- Tối ưu ảnh (WebP format)

### **Responsive design:**

- Test trên mobile
- Điều chỉnh font size và spacing
- Kiểm tra touch interactions

### **SEO cơ bản:**

- Thêm meta description
- Tối ưu title
- Add social media tags

## 📚 Tài Nguyên Học Tập

- **MDN Web Docs** - Tài liệu HTML/CSS/JS
- **CSS-Tricks** - Tips CSS
- **GitHub Pages** - Deploy miễn phí
- **Unsplash** - Ảnh miễn phí

## 🆘 Troubleshooting

### **Lỗi thường gặp:**

1. **Audio không hoạt động** → Kiểm tra quyền âm thanh của trình duyệt và xem nút loa có đang tắt không
2. **Animations lag** → Giảm hiệu ứng nền trong `css/main.css`. Khi người dùng bật "giảm chuyển động" của hệ điều hành, hiệu ứng sẽ tự tắt
3. **Mobile không đẹp** → Kiểm tra viewport meta tag
4. **Git push lỗi** → Kiểm tra authentication
5. **Không hoạt động offline** → Service worker không chạy khi mở bằng `file://`. Dùng `npx serve -l 4173 .` rồi mở http://localhost:4173

### **Debug:**

- F12 → Console tab để xem lỗi
- F12 → Network tab để kiểm tra performance
- Chạy test: `npm install`, `npx playwright install chromium` (một lần), rồi `npm test`
- Test trên nhiều browser

## 🎉 Kết Quả

Sau khi hoàn thành, bạn sẽ có:

- ✅ Digital business card đẹp mắt
- ✅ Responsive trên mọi thiết bị
- ✅ Hiệu ứng động ấn tượng
- ✅ Deploy miễn phí trên web
- ✅ Dễ dàng chia sẻ và cập nhật

---

**💡 Lời khuyên:** Bắt đầu đơn giản, sau đó thêm dần các tính năng nâng cao. Practice makes perfect! 🚀
