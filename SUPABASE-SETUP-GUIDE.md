# 🚀 Panduan Setup Supabase untuk Kawan Curhat

## 📋 Daftar Isi
1. [Persiapan](#persiapan)
2. [Setup Database](#setup-database)
3. [Konfigurasi Storage](#konfigurasi-storage)
4. [Integrasi dengan Frontend](#integrasi-dengan-frontend)
5. [Testing](#testing)

---

## 1. Persiapan

### Buat Akun Supabase
1. Kunjungi [https://supabase.com](https://supabase.com)
2. Klik **"Start your project"**
3. Sign up dengan GitHub/Google/Email
4. Buat project baru:
   - **Project Name**: `kawancurhat`
   - **Database Password**: (simpan password ini!)
   - **Region**: Singapore (recommended untuk Indonesia)
   - Klik **"Create new project"**
5. Tunggu ~2 menit sampai database siap

---

## 2. Setup Database

### Langkah 1: Buka SQL Editor
1. Di dashboard Supabase, pilih project **kawancurhat**
2. Klik menu **"SQL Editor"** di sidebar kiri
3. Klik **"New query"**

### Langkah 2: Jalankan Schema SQL
1. Buka file `supabase-schema.sql` yang sudah dibuat
2. Copy semua isinya (Ctrl+A, Ctrl+C)
3. Paste ke SQL Editor di Supabase
4. Klik **"Run"** (atau tekan Ctrl+Enter)
5. Tunggu sampai selesai (akan muncul pesan sukses)

### Langkah 3: Verifikasi Database
1. Klik menu **"Table Editor"** di sidebar
2. Pastikan semua tabel sudah dibuat:
   - ✅ blog_posts
   - ✅ services
   - ✅ testimonials
   - ✅ video_testimonials
   - ✅ faqs
   - ✅ clients
   - ✅ gallery
   - ✅ team_members
   - ✅ contact_submissions
   - ✅ settings

3. Klik salah satu tabel untuk melihat data mock yang sudah diinsert

---

## 3. Konfigurasi Storage

### Setup Storage Bucket untuk Gambar

1. **Buat Bucket**:
   - Klik menu **"Storage"** di sidebar
   - Klik **"New bucket"**
   - Nama bucket: `aset`
   - Public bucket: **ON** (centang)
   - Klik **"Create bucket"**

2. **Upload Gambar** (Opsional):
   - Klik bucket `aset`
   - Upload folder `public/aset/` dari project Anda
   - Atau biarkan tetap menggunakan path lokal untuk development

3. **Konfigurasi Policy**:
   ```sql
   -- Run di SQL Editor
   CREATE POLICY "Public can view images"
   ON storage.objects FOR SELECT
   USING (bucket_id = 'aset');
   
   CREATE POLICY "Authenticated users can upload images"
   ON storage.objects FOR INSERT
   WITH CHECK (bucket_id = 'aset' AND auth.role() = 'authenticated');
   ```

---

## 4. Integrasi dengan Frontend

### Langkah 1: Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### Langkah 2: Dapatkan API Keys

1. Di dashboard Supabase, klik **"Settings"** (icon gear)
2. Klik **"API"**
3. Copy nilai berikut:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGc...`

### Langkah 3: Buat File Konfigurasi

Buat file `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://YOUR_PROJECT_URL.supabase.co';
const supabaseAnonKey = 'YOUR_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Langkah 4: Buat Environment Variables

Buat file `.env.local`:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_URL.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

Update `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Langkah 5: Update `.gitignore`

Pastikan `.env.local` sudah ada di `.gitignore`:

```
.env.local
.env
```

---

## 5. Testing

### Test Query Data

Buat file test `src/test-supabase.ts`:

```typescript
import { supabase } from './lib/supabase';

async function testSupabase() {
  console.log('🧪 Testing Supabase Connection...');
  
  // Test 1: Get Services
  const { data: services, error: servicesError } = await supabase
    .from('services')
    .select('*');
  
  console.log('✅ Services:', services?.length, 'items');
  if (servicesError) console.error('❌ Error:', servicesError);
  
  // Test 2: Get Blog Posts
  const { data: blogs, error: blogsError } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true);
  
  console.log('✅ Blog Posts:', blogs?.length, 'items');
  if (blogsError) console.error('❌ Error:', blogsError);
  
  // Test 3: Get Testimonials
  const { data: testimonials, error: testimonialsError } = await supabase
    .from('testimonials')
    .select('*')
    .order('display_order');
  
  console.log('✅ Testimonials:', testimonials?.length, 'items');
  if (testimonialsError) console.error('❌ Error:', testimonialsError);
  
  // Test 4: Submit Contact Form
  const { data: contact, error: contactError } = await supabase
    .from('contact_submissions')
    .insert({
      name: 'Test User',
      email: 'test@example.com',
      phone: '08123456789',
      message: 'Test message from frontend'
    });
  
  console.log('✅ Contact submission successful');
  if (contactError) console.error('❌ Error:', contactError);
  
  console.log('✅ All tests completed!');
}

testSupabase();
```

Jalankan test:
```bash
npm run dev
# Buka browser console untuk melihat hasil
```

---

## 📊 Struktur Database

### Tabel Utama

| Tabel | Deskripsi | Jumlah Mock Data |
|-------|-----------|------------------|
| `blog_posts` | Artikel blog | 3 posts |
| `services` | Layanan yang ditawarkan | 6 services |
| `testimonials` | Testimoni klien (text) | 6 testimonials |
| `video_testimonials` | Testimoni klien (video) | 3 videos |
| `faqs` | Frequently Asked Questions | 5 FAQs |
| `clients` | Daftar klien | 8 clients |
| `gallery` | Galeri foto | 14 images |
| `team_members` | Anggota tim | 0 (kosong) |
| `contact_submissions` | Form kontak masuk | 0 (kosong) |
| `settings` | Pengaturan website | 4 settings |

---

## 🔐 Security (Row Level Security)

Semua tabel sudah dikonfigurasi dengan RLS:

- ✅ **Public Read**: Semua orang bisa read data yang published
- ✅ **Public Insert**: Form kontak bisa disubmit tanpa login
- ❌ **Public Update/Delete**: Hanya admin yang bisa edit/hapus

### Setup Admin Authentication (Opsional)

Untuk admin panel, Anda perlu setup authentication:

```typescript
// Login admin
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'admin@kawancurhat.com',
  password: 'your-secure-password'
});

// Check if user is authenticated
const { data: { user } } = await supabase.auth.getUser();
```

Buat admin user di Supabase:
1. Dashboard → **Authentication** → **Users**
2. Klik **"Add user"**
3. Isi email & password
4. Klik **"Create user"**

---

## 🎨 Contoh Penggunaan di Component

### Get Services

```typescript
import { supabase } from '../lib/supabase';
import { useState, useEffect } from 'react';

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      
      if (error) {
        console.error('Error fetching services:', error);
      } else {
        setServices(data);
      }
      setLoading(false);
    }
    
    fetchServices();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {services.map(service => (
        <div key={service.id}>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### Submit Contact Form

```typescript
async function handleSubmit(formData) {
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      message: formData.message,
      subject: formData.subject || 'Konsultasi Umum'
    });

  if (error) {
    console.error('Error submitting form:', error);
    alert('Gagal mengirim pesan. Silakan coba lagi.');
  } else {
    alert('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.');
  }
}
```

---

## 🔄 Update Data Mock

Jika ingin menambah/update data:

### Via SQL Editor:

```sql
-- Tambah blog post baru
INSERT INTO blog_posts (id, title, category, image, excerpt)
VALUES (
  'blog-baru',
  'Judul Blog Baru',
  'Kategori',
  '/aset/image.jpg',
  'Excerpt singkat...'
);

-- Update service
UPDATE services
SET description = 'Deskripsi baru'
WHERE id = 'konsultasi-hukum-bisnis';

-- Hapus item
DELETE FROM gallery WHERE id = '1';
```

### Via Frontend (Admin Panel):

Setelah setup authentication, Anda bisa CRUD via JavaScript:

```typescript
// Create
await supabase.from('services').insert({ ... });

// Read
await supabase.from('services').select('*');

// Update
await supabase.from('services').update({ ... }).eq('id', '...');

// Delete
await supabase.from('services').delete().eq('id', '...');
```

---

## ⚡ Tips & Best Practices

1. **Gunakan TypeScript Types**:
   ```bash
   npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.types.ts
   ```

2. **Real-time Subscriptions** (opsional):
   ```typescript
   const channel = supabase
     .channel('contact-changes')
     .on('postgres_changes', {
       event: 'INSERT',
       schema: 'public',
       table: 'contact_submissions'
     }, payload => {
       console.log('New contact submission!', payload);
     })
     .subscribe();
   ```

3. **Caching dengan React Query**:
   ```typescript
   import { useQuery } from '@tanstack/react-query';
   
   const { data: services } = useQuery(['services'], async () => {
     const { data } = await supabase.from('services').select('*');
     return data;
   });
   ```

4. **Error Handling**:
   Selalu handle error dari Supabase:
   ```typescript
   const { data, error } = await supabase.from('table').select();
   if (error) {
     console.error('Supabase error:', error);
     // Handle error (show toast, fallback, etc.)
   }
   ```

---

## 🆘 Troubleshooting

### Error: "relation does not exist"
- Pastikan SQL schema sudah dijalankan dengan benar
- Check di Table Editor apakah tabel sudah dibuat

### Error: "JWT expired"
- Token expired, perlu login ulang
- Implementasi refresh token

### Error: "Row level security policy violation"
- Check RLS policies di tabel
- Pastikan user sudah authenticated jika perlu

### Data tidak muncul
1. Check di Table Editor apakah data ada
2. Check RLS policies
3. Check filter query (is_published, is_active, dll)
4. Lihat console browser untuk error

---

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Storage](https://supabase.com/docs/guides/storage)

---

## ✅ Checklist Setup

- [ ] Buat akun Supabase
- [ ] Buat project baru
- [ ] Jalankan `supabase-schema.sql`
- [ ] Verifikasi tabel & data di Table Editor
- [ ] Buat bucket `aset` di Storage (opsional)
- [ ] Install `@supabase/supabase-js`
- [ ] Copy API keys ke `.env.local`
- [ ] Buat `src/lib/supabase.ts`
- [ ] Test koneksi database
- [ ] Setup authentication untuk admin (opsional)
- [ ] Update components untuk fetch dari Supabase

---

**🎉 Selamat! Database Supabase Anda sudah siap digunakan!**

Untuk pertanyaan atau bantuan, silakan hubungi tim development.
