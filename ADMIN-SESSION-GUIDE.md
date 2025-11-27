# Panduan Session Admin Panel

## Cara Kerja Session Login

Admin panel menggunakan localStorage untuk menyimpan session login. Session akan tetap aktif sampai user klik tombol "Keluar".

### Login
1. Buka `/admin`
2. Login dengan kredensial:
   - Email: `admin@kawancurhat.com`
   - Password: `admin123`
3. Token `authenticated` disimpan di localStorage dengan key `adminToken`

### Session Tetap Aktif
Session login akan tetap aktif dalam kondisi:
- ✅ Refresh halaman admin
- ✅ Tutup dan buka browser lagi
- ✅ Navigasi antar menu (Dashboard, Blog, Testimoni, dll)
- ✅ Klik tombol back browser
- ✅ Buka tab baru dan akses `/admin`

### Logout
Session hanya akan dihapus jika:
- ❌ User klik tombol "Keluar" di sidebar
- ❌ User konfirmasi dialog logout
- ❌ User manual clear localStorage browser

### Navigasi di Admin Panel

#### Dari Dashboard ke Menu Lain
- Klik menu di sidebar (Blog, Testimoni, FAQ, dll)
- Header akan menampilkan nama halaman aktif
- Tombol "Kembali ke Dashboard" muncul di header

#### Kembali ke Dashboard
Ada 3 cara:
1. Klik menu "Dashboard" di sidebar
2. Klik tombol "Kembali ke Dashboard" di header
3. Klik logo "Admin Panel" di sidebar (jika diimplementasikan)

#### Kembali ke Website
- Klik tombol back browser Chrome
- Atau ketik URL `/` di address bar
- Session admin tetap tersimpan

### Troubleshooting

#### Problem: Logout Otomatis
**Penyebab:**
- Browser clear cookies/localStorage otomatis
- Incognito/Private mode
- Browser extension yang clear storage

**Solusi:**
- Gunakan browser normal (bukan incognito)
- Disable extension yang clear storage
- Check browser settings untuk localStorage

#### Problem: Tidak Bisa Login
**Penyebab:**
- Kredensial salah
- localStorage disabled
- JavaScript error

**Solusi:**
- Pastikan kredensial benar
- Enable localStorage di browser
- Check console untuk error

#### Problem: Session Hilang Setelah Refresh
**Penyebab:**
- localStorage tidak tersimpan
- Browser settings

**Solusi:**
```javascript
// Check di browser console
localStorage.getItem('adminToken')
// Harus return: "authenticated"

// Jika null, set manual untuk testing:
localStorage.setItem('adminToken', 'authenticated')
// Refresh halaman
```

### Security Notes

⚠️ **Untuk Production:**

1. **Ganti dengan JWT Token**
   ```javascript
   // Simpan JWT token dari backend
   localStorage.setItem('adminToken', jwtToken);
   ```

2. **Tambahkan Token Expiry**
   ```javascript
   const tokenData = {
     token: jwtToken,
     expiry: Date.now() + (24 * 60 * 60 * 1000) // 24 jam
   };
   localStorage.setItem('adminToken', JSON.stringify(tokenData));
   ```

3. **Validasi Token di Backend**
   - Setiap request harus include token
   - Backend verify token validity
   - Auto logout jika token invalid

4. **Implementasi Refresh Token**
   - Token utama expire dalam 1 jam
   - Refresh token expire dalam 7 hari
   - Auto refresh sebelum expire

### Development vs Production

#### Development (Sekarang)
- Token: Simple string `"authenticated"`
- Storage: localStorage
- Validation: Client-side only
- Expiry: Never (sampai logout manual)

#### Production (Recommended)
- Token: JWT dari backend API
- Storage: localStorage + httpOnly cookie
- Validation: Backend verify setiap request
- Expiry: 1 jam (dengan refresh token)
- Security: HTTPS only, CSRF protection

### Testing Session

```javascript
// 1. Check token exists
console.log(localStorage.getItem('adminToken'));

// 2. Manual set token (untuk testing)
localStorage.setItem('adminToken', 'authenticated');

// 3. Manual remove token (untuk testing logout)
localStorage.removeItem('adminToken');

// 4. Check all admin data
console.log('Blog:', localStorage.getItem('admin_blog_data'));
console.log('Testimonials:', localStorage.getItem('admin_testimonials_data'));
console.log('FAQ:', localStorage.getItem('admin_faq_data'));
```

### Best Practices

1. **Jangan Logout Otomatis**
   - User harus explicit klik logout
   - Konfirmasi sebelum logout
   - Jangan clear token saat navigasi

2. **Preserve Session**
   - Simpan di localStorage (persistent)
   - Jangan gunakan sessionStorage (hilang saat tutup tab)
   - Jangan clear saat page reload

3. **User Experience**
   - Tampilkan loading saat check auth
   - Redirect ke login jika tidak authenticated
   - Tampilkan konfirmasi sebelum logout

4. **Security**
   - Untuk production, gunakan JWT
   - Implement token refresh
   - Validate di backend
   - Use HTTPS

### Fitur Session Management

✅ **Sudah Diimplementasikan:**
- Token disimpan di localStorage
- Auto check token saat load AdminApp
- Loading state saat check auth
- Logout dengan konfirmasi
- Session persistent across refresh

🔄 **Untuk Production:**
- JWT token dari backend
- Token expiry & refresh
- Backend validation
- Secure httpOnly cookies
- CSRF protection
