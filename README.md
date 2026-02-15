# Login Frontend - IF.co.id

Modern, responsive login frontend untuk IF.co.id dengan dukungan email/password authentication dan Google OAuth.

## 🚀 Features

- ✅ **Email/Password Login** - Form login tradisional dengan validasi real-time
- ✅ **Google OAuth** - Sign in dengan akun Google
- ✅ **Modern Design** - Glassmorphism, gradient animations, smooth transitions
- ✅ **Fully Responsive** - Mobile-first design (320px - 1920px+)
- ✅ **Vanilla JavaScript ES6+ Modules** - Terstruktur dan maintainable
- ✅ **Token Management** - PASETO token storage dengan localStorage
- ✅ **Form Validation** - Real-time validation dengan error messages
- ✅ **Accessibility** - WCAG AA compliant, keyboard navigation

## 📁 Project Structure

```
login/
├── index.html          # Main login page
├── css/
│   └── style.css      # Responsive styles with design system
├── js/
│   ├── config.js      # API & configuration
│   ├── auth.js        # Authentication logic
│   ├── ui.js          # UI interactions & validation
│   └── main.js        # Application entry point
└── README.md          # Documentation
```

## 🔧 Configuration

### 1. Backend API URL

Edit `js/config.js` dan update `baseURL`:

```javascript
export const API_CONFIG = {
  baseURL: 'https://your-backend-api.com', // Update this
  // ...
};
```

### 2. Google OAuth Client ID

Edit `js/config.js` dan update `clientId`:

```javascript
export const GOOGLE_CONFIG = {
  clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com'
};
```

### 3. Redirect URL

Edit `js/config.js` untuk mengatur redirect setelah login:

```javascript
export const REDIRECT_CONFIG = {
  afterLogin: '/dashboard', // Change to your dashboard URL
  afterLogout: '/login'
};
```

## 🎨 Design Features

### Visual Excellence
- **Animated Gradient Background** - Smooth color transitions
- **Glassmorphism Card** - Semi-transparent with backdrop blur
- **Micro-animations** - Hover effects, focus states, transitions
- **Custom SVG Icons** - Email, password, arrow icons
- **Professional Color Palette** - Blue gradient theme

### Responsive Breakpoints
- **Mobile Small**: 320px - 374px
- **Mobile**: 375px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1439px
- **Large Desktop**: 1440px+

## 🔐 Authentication Flow

### Email/Password Login

1. User mengisi email dan password
2. Frontend validasi input
3. POST request ke `/auth/login`
4. Backend return PASETO token
5. Token disimpan di localStorage
6. Redirect ke dashboard

### Google OAuth Login

1. User klik "Masuk dengan Google"
2. Redirect ke `/auth/google/login`
3. Backend redirect ke Google consent screen
4. User approve permissions
5. Google redirect ke `/auth/google/callback`
6. Backend return PASETO token
7. Token disimpan di localStorage
8. Redirect ke dashboard

## 📡 API Integration

### Login Endpoint

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "v2.local.xxx...",
    "user": {
      "id": "...",
      "name": "User Name",
      "email": "user@example.com"
    }
  }
}
```

### Google OAuth

```http
GET /auth/google/login
→ Redirects to Google consent screen

GET /auth/google/callback?code=xxx&state=xxx
→ Returns PASETO token or redirects with token
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Form validation (empty fields, invalid email, short password)
- [ ] Email/password login with valid credentials
- [ ] Email/password login with invalid credentials
- [ ] Google OAuth flow (complete flow)
- [ ] Token storage in localStorage
- [ ] Auto-redirect if already logged in
- [ ] Responsive design on mobile (375px, 414px)
- [ ] Responsive design on tablet (768px, 1024px)
- [ ] Responsive design on desktop (1440px, 1920px)
- [ ] Keyboard navigation (Tab, Enter)
- [ ] Error message display and auto-hide
- [ ] Loading states during API calls

### Browser Testing

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Local Development

1. Buka `index.html` di browser atau gunakan local server:

```bash
# Python
python -m http.server 8000

# Node.js (http-server)
npx http-server -p 8000

# PHP
php -S localhost:8000
```

2. Akses di browser: `http://localhost:8000`

### Production

1. Update `js/config.js` dengan production API URL
2. Update Google OAuth Client ID
3. Deploy ke hosting (Netlify, Vercel, GitHub Pages, dll)
4. Pastikan CORS dikonfigurasi di backend

## 🔒 Security Notes

- Token disimpan di `localStorage` (consider `httpOnly` cookies untuk production)
- CSRF protection via state token di Google OAuth
- Input validation di frontend dan backend
- HTTPS required untuk production
- Implement rate limiting di backend

## 📝 Customization

### Colors

Edit CSS custom properties di `css/style.css`:

```css
:root {
  --color-primary: #2563eb;
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* ... */
}
```

### Typography

Change font di `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Update CSS:

```css
:root {
  --font-family: 'YourFont', sans-serif;
}
```

## 🐛 Troubleshooting

### CORS Error
- Pastikan backend mengizinkan origin frontend
- Check `Access-Control-Allow-Origin` header

### Module Error
- Pastikan menggunakan local server (bukan `file://`)
- Browser modern required (ES6+ support)

### Token Not Saved
- Check browser console untuk errors
- Verify localStorage tidak disabled
- Check API response format

## 📄 License

© 2026 IF.co.id. All rights reserved.

## 👨‍💻 Developer Notes

Built with:
- Vanilla JavaScript ES6+ Modules
- CSS Custom Properties
- Semantic HTML5
- Mobile-first responsive design
- Accessibility best practices (WCAG AA)

No frameworks, no build tools, just modern web standards! 🎉