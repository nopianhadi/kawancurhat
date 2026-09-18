-- =====================================================
-- SUPABASE DATABASE SCHEMA FOR KAWAN CURHAT
-- =====================================================
-- Run this SQL in Supabase SQL Editor
-- This will create all tables and insert mock data

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. BLOG POSTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  content TEXT,
  excerpt TEXT,
  author TEXT DEFAULT 'Admin Kawan Curhat',
  published_date TIMESTAMP DEFAULT NOW(),
  views INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- 2. SERVICES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  image TEXT,
  price_range TEXT,
  features JSONB,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- 3. TESTIMONIALS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  quote TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  img_src TEXT,
  position TEXT,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- 4. VIDEO TESTIMONIALS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS video_testimonials (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  video_url TEXT NOT NULL,
  description TEXT,
  img_src TEXT,
  duration TEXT,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- 5. FAQ TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS faqs (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'Umum',
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- 6. CLIENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS clients (
  id SERIAL PRIMARY KEY,
  no INTEGER,
  perusahaan TEXT NOT NULL,
  alamat TEXT NOT NULL,
  bidang TEXT NOT NULL,
  logo TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- 7. GALLERY TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS gallery (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image TEXT NOT NULL,
  category TEXT DEFAULT 'Umum',
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- 8. TEAM MEMBERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  bio TEXT,
  image TEXT,
  email TEXT,
  phone TEXT,
  social_media JSONB,
  specialization TEXT[],
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- 9. CONTACT SUBMISSIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT NOT NULL,
  subject TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded', 'archived')),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- 10. SETTINGS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- INSERT MOCK DATA
-- =====================================================

-- Blog Posts Data
INSERT INTO blog_posts (id, title, category, image, content, excerpt) VALUES
('pentingnya-audit-kontrak', 'Pentingnya Audit Kontrak Bisnis untuk Melindungi Perusahaan Anda', 'Layanan Utama', '/aset/zi9l7tvMWofjPzhdHi0yrHjmkHQ.jpg', 
'Audit kontrak adalah proses penting untuk memastikan semua dokumen hukum bisnis Anda telah disusun dengan baik dan melindungi kepentingan perusahaan. Dalam artikel ini, kami akan membahas mengapa audit kontrak sangat penting dan bagaimana hal ini dapat melindungi bisnis Anda dari risiko hukum yang tidak perlu.', 
'Pelajari mengapa audit kontrak bisnis sangat penting untuk melindungi perusahaan Anda dari risiko hukum.'),

('mitigasi-risiko-hukum', '5 Strategi Mitigasi Risiko Hukum yang Wajib Diketahui Pengusaha', 'Layanan Utama', '/aset/zi9l7tvMWofjPzhdHi0yrHjmkHQ-1.jpg',
'Risiko hukum adalah tantangan yang dihadapi setiap pengusaha. Dengan strategi mitigasi yang tepat, Anda dapat mengurangi potensi masalah hukum dan fokus pada pertumbuhan bisnis. Berikut adalah 5 strategi penting yang perlu Anda ketahui.',
'Strategi penting untuk mengurangi risiko hukum dalam menjalankan bisnis Anda.'),

('tips-negosiasi-kontrak', 'Tips Negosiasi dalam Penyelesaian Kesepakatan Bisnis', 'Layanan Utama', '/aset/zi9l7tvMWofjPzhdHi0yrHjmkHQ-2.jpg',
'Negosiasi adalah seni dalam dunia bisnis. Dengan teknik yang tepat, Anda dapat mencapai kesepakatan yang menguntungkan semua pihak. Artikel ini memberikan tips praktis untuk negosiasi bisnis yang efektif.',
'Pelajari teknik negosiasi yang efektif untuk mencapai kesepakatan bisnis yang menguntungkan.');

-- Services Data
INSERT INTO services (id, title, description, display_order) VALUES
('konsultasi-hukum-bisnis', 'Konsultasi Hukum Bisnis', 'Konsultasi hukum bisnis yang komprehensif untuk membantu Anda mengambil keputusan bisnis yang tepat dan sesuai dengan regulasi yang berlaku.', 1),
('perlindungan-bisnis', 'Perlindungan Bisnis', 'Perlindungan bisnis dari risiko hukum dan potensi sengketa melalui strategi preventif yang terukur dan komprehensif.', 2),
('penyusunan-kontrak', 'Penyusunan dan Audit Kontrak', 'Penyusunan dan audit kontrak secara profesional untuk memastikan kepentingan bisnis Anda terlindungi dengan baik.', 3),
('mitigasi-risiko', 'Mitigasi Risiko', 'Mitigasi risiko hukum dan bisnis untuk menjaga kelangsungan dan pertumbuhan usaha Anda secara berkelanjutan.', 4),
('negosiasi', 'Negosiasi', 'Negosiasi dalam penyelesaian kesepakatan atau konflik untuk mencapai solusi yang menguntungkan semua pihak.', 5),
('pendampingan-hukum', 'Pendampingan Hukum', 'Pendampingan hukum untuk pelaku usaha dan profesional dalam setiap tahapan proses bisnis yang Anda jalani.', 6);

-- Testimonials Data
INSERT INTO testimonials (id, name, company, quote, rating, img_src, display_order) VALUES
('asg', 'ASG', 'Klien Kawan Curhat', 'Konsultasi yang sangat membantu! Kawan Curhat memberikan solusi praktis untuk masalah kontrak bisnis kami. Sangat profesional dan mudah dipahami.', 5, '/aset/Folder Baru/ASG.jpg', 1),
('kh-yusuf-mansur', 'KH Yusuf Mansur', 'Tokoh Nasional', 'Tim yang sangat responsif dan komunikatif. Mereka membantu kami dalam penyusunan kontrak kerjasama dengan sangat detail dan aman.', 5, '/aset/Folder Baru/KH Yusuf Mansur.jpg', 2),
('ahmad-wijaya', 'Ahmad Wijaya', 'UD Sejahtera Abadi', 'Pendampingan hukum bisnis yang luar biasa! Kawan Curhat membantu kami menghindari risiko hukum yang tidak kami sadari sebelumnya.', 5, '/aset/FQGwjWxFujEGoR5UIhNoCDGNls.png', 3),
('rina-kusuma', 'Rina Kusuma', 'PT Karya Mandiri', 'Layanan audit kontrak yang sangat teliti. Mereka menemukan celah-celah yang bisa merugikan bisnis kami. Terima kasih atas perlindungannya!', 5, '/aset/nYaGB97fhZHzf1oxKf5s0vj4.png', 4),
('dedi-prasetyo', 'Dedi Prasetyo', 'Toko Elektronik Jaya', 'Konsultan yang benar-benar memahami kebutuhan bisnis. Solusi yang diberikan praktis dan langsung bisa diterapkan. Highly recommended!', 5, '/aset/qejt4Jf3i6rJpIMKhN4RkQhG0.png', 5),
('linda-permata', 'Linda Permata', 'Startup Digital Indonesia', 'Pendekatan yang komunikatif dan solutif membuat kami merasa nyaman. Kawan Curhat benar-benar mitra bisnis yang terpercaya.', 5, '/aset/FQGwjWxFujEGoR5UIhNoCDGNls.png', 6);

-- Video Testimonials Data
INSERT INTO video_testimonials (id, name, company, video_url, description, img_src, duration, display_order) VALUES
('1', 'ASG', 'Klien Kawan Curhat', '/aset/Folder Baru/Video WhatsApp 2025-11-24 pukul 12.22.14_5784c61c.mp4', 'Testimoni Video - Pengalaman Konsultasi Hukum Bisnis', '/aset/Folder Baru/ASG.jpg', '1:30', 1),
('2', 'KH Yusuf Mansur', 'Tokoh Nasional', '/aset/Folder Baru/Video WhatsApp 2025-11-24 pukul 12.22.28_cbdf5059.mp4', 'Testimoni Video - Kepercayaan dan Profesionalisme', '/aset/Folder Baru/KH Yusuf Mansur.jpg', '1:45', 2),
('3', 'Ahmad Wijaya', 'UD Sejahtera Abadi', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'Pendampingan Hukum Bisnis', '/aset/FQGwjWxFujEGoR5UIhNoCDGNls.png', '2:30', 3);

-- FAQs Data
INSERT INTO faqs (id, question, answer, category, display_order) VALUES
('1', 'Apa saja layanan yang ditawarkan Kawan Curhat?', 'Kami menyediakan layanan konsultasi hukum bisnis, perlindungan bisnis dari risiko hukum, penyusunan dan audit kontrak, mitigasi risiko, negosiasi & mediasi, serta pendampingan hukum untuk pelaku usaha dan profesional.', 'Layanan', 1),
('2', 'Bagaimana cara memulai konsultasi dengan Kawan Curhat?', 'Anda dapat menghubungi kami melalui WhatsApp di 08567886251 atau mengisi formulir kontak di website. Kami akan menjadwalkan konsultasi awal untuk memahami kebutuhan bisnis Anda.', 'Konsultasi', 2),
('3', 'Apakah konsultasi pertama berbayar?', 'Kami menawarkan konsultasi awal gratis untuk memahami kebutuhan Anda. Setelah itu, kami akan memberikan proposal layanan dengan biaya yang transparan sesuai dengan kompleksitas kebutuhan bisnis Anda.', 'Harga', 3),
('4', 'Berapa lama proses penyusunan kontrak bisnis?', 'Waktu penyusunan kontrak bervariasi tergantung kompleksitas, biasanya 3-7 hari kerja. Kami memastikan setiap kontrak disusun dengan teliti untuk melindungi kepentingan bisnis Anda secara maksimal.', 'Layanan', 4),
('5', 'Apakah data dan informasi bisnis saya dijamin kerahasiaannya?', 'Tentu saja. Kerahasiaan adalah salah satu nilai utama kami. Semua data dan informasi klien dijamin keamanannya dengan standar kerahasiaan profesional tertinggi dan tidak akan dibagikan kepada pihak manapun.', 'Keamanan', 5);

-- Clients Data
INSERT INTO clients (no, perusahaan, alamat, bidang) VALUES
(1, 'PT. WIRA PAPER', 'Tangerang', 'PAPER MANUFACTURER'),
(2, 'PT. PERDANA KARYA AGUNG', 'Tangerang', 'OUTSOURCHING'),
(3, 'PT. GRIYA SAGUNA INDAH', 'Pandeglang', 'PROPERTY'),
(4, 'PT. INTI PERMATA RESTU', 'Jakarta Barat', 'INTERMEDIATE GOODS'),
(5, 'PT. NUANSA VANINDO', 'Jakarta Pusat', 'CONSTRUCTION'),
(6, 'PT. INEXT ARSINDO', 'Tangerang', 'DEVELOPER & PERHOTELAN'),
(7, 'PT. SHANFU METAL INDUSTRY', 'Tangerang', 'WIRE RODE'),
(8, 'Ibu Yati', 'Indonesia', 'JASA EKSPEDISI');

-- Gallery Data
INSERT INTO gallery (id, title, description, image, category, display_order) VALUES
('1', 'Konsultasi Klien', 'Sesi konsultasi hukum bisnis dengan klien', '/aset/Gambar WhatsApp 2025-11-20 pukul 19.41.39_1671753d.jpg', 'Konsultasi', 1),
('2', 'Pertemuan Bisnis', 'Diskusi strategi hukum bisnis', '/aset/Gambar WhatsApp 2025-11-20 pukul 19.41.39_dfe4335f.jpg', 'Meeting', 2),
('3', 'Seminar Hukum', 'Acara seminar hukum bisnis untuk pelaku usaha', '/aset/Gambar WhatsApp 2025-11-21 pukul 13.04.36_c2a78587.jpg', 'Event', 3),
('4', 'Workshop Kontrak', 'Workshop penyusunan kontrak bisnis', '/aset/Gambar WhatsApp 2025-11-21 pukul 13.04.53_9bb8993b.jpg', 'Workshop', 4),
('5', 'Networking Event', 'Acara networking dengan klien dan mitra', '/aset/0GfHSok4FpwF794IxxL1j5cJOc.jpg', 'Event', 5),
('6', 'Konsultasi Tim', 'Sesi konsultasi dengan tim klien', '/aset/Gambar WhatsApp 2025-11-21 pukul 13.05.26_06a370f4.jpg', 'Konsultasi', 6),
('7', 'Presentasi Hukum', 'Presentasi materi hukum bisnis', '/aset/Gambar WhatsApp 2025-11-21 pukul 13.05.26_06a370f4.jpg', 'Event', 7),
('8', 'Diskusi Kasus', 'Diskusi penanganan kasus hukum bisnis', '/aset/Gambar WhatsApp 2025-11-21 pukul 13.07.19_38d88533.jpg', 'Konsultasi', 8),
('9', 'Acara Kolaborasi', 'Kolaborasi dengan mitra bisnis', '/aset/0GfHSok4FpwF794IxxL1j5cJOc-1.jpg', 'Event', 9),
('10', 'Pelatihan Hukum', 'Pelatihan hukum untuk UMKM', '/aset/Gambar WhatsApp 2025-11-21 pukul 13.09.30_78b09449.jpg', 'Workshop', 10),
('11', 'Sesi Foto Tim', 'Dokumentasi tim konsultan', '/aset/Gambar WhatsApp 2025-11-21 pukul 13.09.30_b8e35de5.jpg', 'Tim', 11),
('12', 'Kunjungan Klien', 'Kunjungan dan konsultasi klien', '/aset/Gambar WhatsApp 2025-11-24 pukul 12.18.20_01e63665.jpg', 'Konsultasi', 12),
('13', 'Meeting Strategis', 'Pertemuan strategis dengan klien korporat', '/aset/Gambar WhatsApp 2025-11-24 pukul 12.22.04_acc3b090.jpg', 'Meeting', 13),
('14', 'Bersama KH Yusuf Mansur', 'Kolaborasi dengan tokoh nasional', '/aset/KH Yusuf Mansur.jpg', 'Event', 14);

-- Settings Data
INSERT INTO settings (key, value, description) VALUES
('site_info', '{
  "site_name": "Kawan Curhat",
  "tagline": "Konsultan Hukum Bisnis Terpercaya",
  "description": "Solusi hukum bisnis profesional untuk melindungi dan mengembangkan usaha Anda"
}'::jsonb, 'Informasi dasar website'),

('contact_info', '{
  "phone": "08567886251",
  "email": "info@kawancurhat.com",
  "address": "Jakarta, Indonesia",
  "whatsapp": "6285678862251"
}'::jsonb, 'Informasi kontak'),

('social_media', '{
  "instagram": "https://instagram.com/kawancurhat",
  "facebook": "https://facebook.com/kawancurhat",
  "linkedin": "https://linkedin.com/company/kawancurhat",
  "youtube": "https://youtube.com/@kawancurhat"
}'::jsonb, 'Link media sosial'),

('business_hours', '{
  "weekdays": "09:00 - 17:00 WIB",
  "saturday": "09:00 - 14:00 WIB",
  "sunday": "Tutup"
}'::jsonb, 'Jam operasional');

-- =====================================================
-- CREATE INDEXES FOR BETTER PERFORMANCE
-- =====================================================
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_published ON blog_posts(is_published);
CREATE INDEX idx_services_active ON services(is_active);
CREATE INDEX idx_testimonials_featured ON testimonials(is_featured);
CREATE INDEX idx_gallery_category ON gallery(category);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_contact_submissions_created ON contact_submissions(created_at DESC);

-- =====================================================
-- CREATE FUNCTIONS FOR AUTO-UPDATE TIMESTAMPS
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers to all tables
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_video_testimonials_updated_at BEFORE UPDATE ON video_testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_gallery_updated_at BEFORE UPDATE ON gallery FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_submissions_updated_at BEFORE UPDATE ON contact_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- =====================================================
-- Enable RLS on all tables
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (for frontend)
CREATE POLICY "Public can read published blog posts" ON blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read active services" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public can read video testimonials" ON video_testimonials FOR SELECT USING (true);
CREATE POLICY "Public can read published faqs" ON faqs FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read active clients" ON clients FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public can read active team members" ON team_members FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read settings" ON settings FOR SELECT USING (true);

-- Allow anyone to insert contact submissions
CREATE POLICY "Anyone can submit contact form" ON contact_submissions FOR INSERT WITH CHECK (true);

-- =====================================================
-- SUCCESS MESSAGE
-- =====================================================
DO $$
BEGIN
    RAISE NOTICE '========================================';
    RAISE NOTICE 'DATABASE SCHEMA CREATED SUCCESSFULLY!';
    RAISE NOTICE '========================================';
    RAISE NOTICE 'Tables created:';
    RAISE NOTICE '  - blog_posts';
    RAISE NOTICE '  - services';
    RAISE NOTICE '  - testimonials';
    RAISE NOTICE '  - video_testimonials';
    RAISE NOTICE '  - faqs';
    RAISE NOTICE '  - clients';
    RAISE NOTICE '  - gallery';
    RAISE NOTICE '  - team_members';
    RAISE NOTICE '  - contact_submissions';
    RAISE NOTICE '  - settings';
    RAISE NOTICE '';
    RAISE NOTICE 'Mock data inserted successfully!';
    RAISE NOTICE 'Row Level Security enabled on all tables.';
    RAISE NOTICE '';
    RAISE NOTICE 'Next steps:';
    RAISE NOTICE '1. Update your frontend to use Supabase client';
    RAISE NOTICE '2. Configure authentication if needed';
    RAISE NOTICE '3. Set up Storage buckets for images';
    RAISE NOTICE '========================================';
END $$;
