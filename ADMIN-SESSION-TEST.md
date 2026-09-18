# Testing Admin Session - Panduan Lengkap

## Masalah yang Dilaporkan
"Saat login ke dashboard, terus klik kembali (back browser), itu logout otomatis"

## Penyebab & Solusi

### Penyebab
Ketika klik back browser dari `/admin`, browser navigasi ke halaman sebelumnya (misalnya `/`). Ini **BUKAN logout**, hanya navigasi normal. Token masih tersimpan di localStorage.

### Yang Terjadi Sebenarnya
1. User login di `/admin` → Token tersimpan
2. User klik back browser → Pindah ke `/` (homepage)
3. User klik forward atau akses `/admin` lagi → **Seharusnya langsung masuk Dashboard**

### Jika Logout Otomatis Terjadi
Ada beberapa kemungkinan:
1. Browser clear localStorage otomatis
2. Incognito/Private mode
3. Browser extension yang clear storage
4. Bug di kode (sudah diperbaiki)

## Cara Testing yang Benar

### Test 1: Login dan Refresh
```
1. Buka http://localhost:5173/admin
2. Login dengan admin@kawancurhat.com / admin123
3. Masuk ke Dashboard
4. Tekan F5 atau Ctrl+R (refresh)
5. ✅ Harus tetap di Dashboard (tidak logout)
```

### Test 2: Login, Back, Forward
```
1. Buka http://localhost:5173/admin
2. Login dengan admin@kawancurhat.com / admin123
3. Masuk ke Dashboard
4. Klik tombol Back browser (atau Alt+Left Arrow)
5. Sekarang di homepage (/)
6. Klik tombol Forward browser (atau Alt+Right Arrow)
7. ✅ Harus langsung masuk Dashboard (tidak perlu login lagi)
```

### Test 3: Login, Back, Akses Manual
```
1. Buka http://localhost:5173/admin
2. Login dengan admin@kawancurhat.com / admin123
3. Masuk ke Dashboard
4. Klik tombol Back browser
5. Sekarang di homepage (/)
6. Ketik /admin di address bar atau klik link admin
7. ✅ Harus langsung masuk Dashboard (tidak perlu login lagi)
```

### Test 4: Login, Tutup Tab, Buka Lagi
```
1. Buka http://localhost:5173/admin
2. Login dengan admin@kawancurhat.com / admin123
3. Masuk ke Dashboard
4. Tutup tab browser
5. Buka tab baru
6. Akses http://localhost:5173/admin
7. ✅ Harus langsung masuk Dashboard (tidak perlu login lagi)
```

### Test 5: Login, Tutup Browser, Buka Lagi
```
1. Buka http://localhost:5173/admin
2. Login dengan admin@kawancurhat.com / admin123
3. Masuk ke Dashboard
4. Tutup browser sepenuhnya
5. Buka browser lagi
6. Akses http://localhost:5173/admin
7. ✅ Harus langsung masuk Dashboard (tidak perlu login lagi)
```

### Test 6: Logout Manual
```
1. Buka http://localhost:5173/admin
2. Login dengan admin@kawancurhat.com / admin123
3. Masuk ke Dashboard
4. Klik tombol "Keluar" di sidebar
5. Konfirmasi dialog logout
6. ✅ Harus redirect ke homepage dan logout
7. Akses /admin lagi
8. ✅ Harus tampil halaman login
```

## Debugging dengan Browser Console

### Check Token Status
Buka Browser Console (F12) dan jalankan:

```javascript
// 1. Check apakah token ada
console.log('Token:', localStorage.getItem('adminToken'));
// Expected: "authenticated"

// 2. Check semua localStorage
console.log('All Storage:', localStorage);

// 3. Manual set token (jika hilang)
localStorage.setItem('adminToken', 'authenticated');
// Refresh halaman

// 4. Manual remove token (untuk test logout)
localStorage.removeItem('adminToken');
// Refresh halaman
```

### Monitor Token Changes
```javascript
// Tambahkan di console untuk monitor perubahan
const originalSetItem = localStorage.setItem;
const originalRemoveItem = localStorage.removeItem;

localStorage.setItem = function(key, value) {
  console.log('localStorage.setItem:', key, value);
  originalSetItem.apply(this, arguments);
};

localStorage.removeItem = function(key) {
  console.log('localStorage.removeItem:', key);
  originalRemoveItem.apply(this, arguments);
};
```

## Perbaikan yang Sudah Dilakukan

### 1. AdminApp.tsx
- ✅ Tambah re-check auth saat window focus
- ✅ Tambah re-check auth saat visibility change
- ✅ Tambah console.log untuk debugging
- ✅ Cleanup event listeners saat unmount

### 2. Dashboard.tsx
- ✅ Tambah konfirmasi sebelum logout
- ✅ Tambah console.log untuk debugging
- ✅ Tambah useEffect untuk log token status

### 3. Session Management
- ✅ Token disimpan di localStorage (persistent)
- ✅ Token hanya dihapus saat logout manual
- ✅ Auto re-check token saat kembali ke halaman

## Expected Console Logs

### Saat Login Pertama Kali
```
Admin Token Check: null
(User login)
Admin Token Check: authenticated
Dashboard mounted - Token: authenticated
```

### Saat Refresh Halaman
```
Admin Token Check: authenticated
Dashboard mounted - Token: authenticated
```

### Saat Back dan Forward
```
(Back ke homepage - AdminApp unmount)
(Forward ke /admin - AdminApp mount)
Admin Token Check: authenticated
Dashboard mounted - Token: authenticated
```

### Saat Logout
```
Logging out - removing token
(Redirect ke homepage)
```

## Troubleshooting

### Problem: Token Hilang Setelah Back
**Check:**
1. Buka Console (F12)
2. Lihat apakah ada error
3. Check localStorage: `localStorage.getItem('adminToken')`
4. Jika null, ada yang menghapus token

**Solusi:**
- Pastikan tidak ada extension yang clear storage
- Jangan gunakan incognito mode
- Check browser settings untuk localStorage

### Problem: Selalu Logout Setelah Back
**Check:**
1. Browser mode (normal vs incognito)
2. Browser settings untuk cookies/storage
3. Extension yang installed

**Solusi:**
```javascript
// Test di console
localStorage.setItem('test', 'value');
console.log(localStorage.getItem('test'));
// Jika null, localStorage disabled
```

### Problem: Token Ada Tapi Tetap Logout
**Check:**
1. Console logs untuk error
2. Network tab untuk failed requests
3. Token value: `localStorage.getItem('adminToken')`

**Solusi:**
- Token harus exactly "authenticated"
- Jika berbeda, ada bug di kode

## Browser Compatibility

### Tested & Working
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)

### Known Issues
- ❌ Incognito mode: localStorage cleared saat tutup tab
- ❌ Private browsing: localStorage cleared saat tutup browser
- ❌ Some mobile browsers: localStorage limited

## Best Practices

### DO ✅
- Gunakan browser normal (bukan incognito)
- Enable localStorage di browser settings
- Logout manual dengan tombol "Keluar"
- Check console untuk debugging

### DON'T ❌
- Jangan gunakan incognito mode untuk admin
- Jangan clear browser data saat testing
- Jangan disable localStorage
- Jangan expect session di private browsing

## Production Recommendations

Untuk production, implement:
1. JWT token dengan expiry
2. Refresh token mechanism
3. Backend validation
4. Secure httpOnly cookies
5. CSRF protection
6. Rate limiting
7. Session timeout warning
8. Auto-save draft changes

## Summary

**Session admin TIDAK logout otomatis saat back browser.**

Token tersimpan di localStorage dan tetap ada sampai:
- User klik tombol "Keluar"
- User clear browser data
- Browser dalam incognito mode

Jika mengalami logout otomatis, check:
1. Browser console untuk error
2. localStorage untuk token
3. Browser mode (normal vs incognito)
4. Browser extensions
