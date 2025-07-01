# 🚀 Hướng Dẫn Tạo Digital Business Card

## 📋 Bước 1: Chuẩn Bị

- Cài đặt **Git** và **Node.js**
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
my-card/
├── src/
│   ├── index.html    # Trang chính
├── styles.css    # CSS styles
├── script.js     # JavaScript
└── README.md     # Mô tả
```

## ✏️ Bước 4: Tùy Chỉnh Nội Dung

### **Thay đổi thông tin cá nhân trong `src/index.html`:**

- Tên của bạn
- Email, phone, social media
- Ảnh đại diện
- Skills & technologies

### **Thay đổi màu sắc trong `styles.css`:**

```css
:root {
  --primary-gold: #your-color; /* Màu chính */
  --secondary-orange: #your-color; /* Màu phụ */
  --accent-pink: #your-color; /* Màu nhấn */
}
```

## ✨ Bước 5: Thêm Hiệu Ứng (Tùy chọn)

### **Có sẵn:**

- 🌟 Shooting stars
- 🎨 Rainbow mode (Ctrl+R)
- ⚡ Performance mode (Ctrl+Shift+X)
- 🎵 Sound effects
- 🌙 Dark/Light theme (Ctrl+T)

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

- Giảm số lượng particles nếu lag
- Dùng Ctrl+Shift+X để bật performance mode
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

1. **Audio không hoạt động** → Kiểm tra browser permissions
2. **Animations lag** → Giảm effects, bật performance mode
3. **Mobile không đẹp** → Kiểm tra viewport meta tag
4. **Git push lỗi** → Kiểm tra authentication

### **Debug:**

- F12 → Console tab để xem lỗi
- F12 → Network tab để kiểm tra performance
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
