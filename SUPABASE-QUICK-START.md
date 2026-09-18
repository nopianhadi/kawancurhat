# 🚀 Supabase Quick Start - Kawan Curhat

## 📁 Files Yang Sudah Dibuat

1. **`supabase-schema.sql`** - SQL untuk membuat tabel dan insert mock data
2. **`SUPABASE-SETUP-GUIDE.md`** - Panduan lengkap setup Supabase
3. **`supabase-integration-example.tsx`** - Contoh code integrasi di React

---

## ⚡ Quick Setup (5 Menit)

### Step 1: Buat Project Supabase
1. Buka https://supabase.com
2. Login/Sign up
3. Klik **"New Project"**
4. Isi:
   - Name: `kawancurhat`
   - Password: (simpan ini!)
   - Region: `Singapore`

### Step 2: Jalankan SQL
1. Di Supabase dashboard → **SQL Editor**
2. Copy paste isi file `supabase-schema.sql`
3. Klik **Run**
4. Tunggu sampai selesai ✅

### Step 3: Get API Keys
1. Dashboard → **Settings** (icon ⚙️) → **API**
2. Copy:
   - `Project URL`
   - `anon public key`

### Step 4: Setup di Project
```bash
# Install Supabase
npm install @supabase/supabase-js
```

Buat file `.env.local`:
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

Buat file `src/lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Step 5: Test
```typescript
import { supabase } from './lib/supabase';

// Test fetch data
const { data } = await supabase.from('services').select('*');
console.log(data);
```

---

## 📊 Database Structure

| Table | Records | Description |
|-------|---------|-------------|
| `blog_posts` | 3 | Artikel blog |
| `services` | 6 | Layanan yang ditawarkan |
| `testimonials` | 6 | Testimoni klien |
| `video_testimonials` | 3 | Video testimoni |
| `faqs` | 5 | FAQ |
| `clients` | 8 | Daftar klien |
| `gallery` | 14 | Galeri foto |
| `team_members` | 0 | Tim (kosong) |
| `contact_submissions` | 0 | Form submissions |
| `settings` | 4 | Pengaturan site |

---

## 💡 Usage Examples

### Fetch Data
```typescript
// Get all services
const { data: services } = await supabase
  .from('services')
  .select('*')
  .eq('is_active', true);

// Get blog posts
const { data: posts } = await supabase
  .from('blog_posts')
  .select('*')
  .eq('is_published', true)
  .order('published_date', { ascending: false });

// Get testimonials
const { data: testimonials } = await supabase
  .from('testimonials')
  .select('*')
  .order('display_order');
```

### Submit Contact Form
```typescript
const { error } = await supabase
  .from('contact_submissions')
  .insert({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '08123456789',
    message: 'Saya butuh konsultasi...'
  });

if (error) {
  console.error('Error:', error);
} else {
  alert('Pesan terkirim!');
}
```

### Use in React Component
```typescript
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      const { data } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true);
      
      setServices(data || []);
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

---

## 🔐 Security Notes

✅ **Row Level Security (RLS) sudah aktif**

- Public bisa **READ** data yang published
- Public bisa **INSERT** contact form
- Hanya admin yang bisa **UPDATE/DELETE**

---

## 📚 Next Steps

1. ✅ Setup Supabase (selesai!)
2. ⬜ Replace localStorage dengan Supabase di admin panel
3. ⬜ Update components untuk fetch dari Supabase
4. ⬜ Setup authentication untuk admin
5. ⬜ Upload images ke Supabase Storage (optional)

---

## 🆘 Help

Dokumentasi lengkap ada di:
- `SUPABASE-SETUP-GUIDE.md` - Setup lengkap
- `supabase-integration-example.tsx` - Contoh code

**Supabase Docs**: https://supabase.com/docs

---

**✨ Database siap digunakan!**
