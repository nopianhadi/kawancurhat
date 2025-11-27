import React, { useState, useEffect } from 'react';

interface BlogPost {
  id: string;
  category: string;
  title: string;
  imgSrc: string;
  author: string;
  date: string;
  readTime: string;
  content: string[];
  tags: string[];
}

const blogPostsData: BlogPost[] = [
  {
    id: '10-pertanyaan-kunci',
    category: 'Bisnis',
    title: '10 Pertanyaan Kunci Sebelum Menyewa Firma Hukum',
    imgSrc: '/aset/zi9l7tvMWofjPzhdHi0yrHjmkHQ.jpg',
    author: 'Jessica Miller',
    date: '15 November 2025',
    readTime: '8 menit',
    content: [
      'Memilih firma hukum yang tepat adalah keputusan penting yang dapat mempengaruhi hasil kasus Anda. Berikut adalah 10 pertanyaan kunci yang harus Anda tanyakan sebelum membuat keputusan.',
      '1. Apa spesialisasi firma hukum Anda? - Pastikan firma memiliki keahlian dalam bidang hukum yang relevan dengan kasus Anda.',
      '2. Berapa lama pengalaman Anda menangani kasus serupa? - Pengalaman adalah faktor penting dalam menentukan kemampuan firma.',
      '3. Siapa yang akan menangani kasus saya? - Ketahui apakah partner senior atau associate junior yang akan bertanggung jawab.',
      '4. Bagaimana struktur biaya Anda? - Pahami dengan jelas biaya per jam, biaya tetap, atau persentase kontingensi.',
      '5. Apa strategi Anda untuk kasus saya? - Firma yang baik harus dapat menjelaskan pendekatan mereka dengan jelas.',
      '6. Berapa lama estimasi waktu penyelesaian? - Dapatkan gambaran realistis tentang timeline kasus Anda.',
      '7. Bagaimana komunikasi akan dilakukan? - Pastikan ada jalur komunikasi yang jelas dan responsif.',
      '8. Apa track record Anda? - Tanyakan tentang tingkat keberhasilan dalam kasus serupa.',
      '9. Apakah ada konflik kepentingan? - Firma harus transparan tentang potensi konflik.',
      '10. Apa yang membedakan firma Anda dari kompetitor? - Pahami nilai unik yang ditawarkan firma tersebut.'
    ],
    tags: ['Firma Hukum', 'Konsultasi', 'Tips Hukum', 'Bisnis']
  },
  {
    id: 'melindungi-bisnis',
    category: 'Keuangan',
    title: 'Bagaimana Firma Hukum Dapat Membantu Melindungi Bisnis Anda',
    imgSrc: '/aset/zi9l7tvMWofjPzhdHi0yrHjmkHQ-1.jpg',
    author: 'David Rodriguez',
    date: '12 November 2025',
    readTime: '10 menit',
    content: [
      'Dalam dunia bisnis yang kompleks, perlindungan hukum adalah investasi penting. Firma hukum yang tepat dapat menjadi mitra strategis dalam melindungi aset dan kepentingan bisnis Anda.',
      'Perlindungan Kekayaan Intelektual - Firma hukum membantu mendaftarkan dan melindungi merek dagang, paten, dan hak cipta Anda.',
      'Penyusunan Kontrak - Kontrak yang solid adalah fondasi hubungan bisnis yang sehat. Pengacara memastikan kontrak Anda melindungi kepentingan Anda.',
      'Kepatuhan Regulasi - Navigasi peraturan yang kompleks memerlukan keahlian hukum untuk menghindari sanksi dan denda.',
      'Manajemen Risiko - Identifikasi dan mitigasi risiko hukum sebelum menjadi masalah besar.',
      'Penyelesaian Sengketa - Ketika konflik muncul, firma hukum dapat menyelesaikannya melalui negosiasi, mediasi, atau litigasi.',
      'Restrukturisasi Bisnis - Dukungan hukum dalam merger, akuisisi, atau perubahan struktur perusahaan.',
      'Perlindungan Data - Memastikan kepatuhan terhadap regulasi perlindungan data dan privasi.',
      'Kesimpulan - Investasi dalam layanan hukum preventif jauh lebih murah daripada menangani masalah hukum yang sudah terjadi.'
    ],
    tags: ['Bisnis', 'Perlindungan', 'Hukum Korporat', 'Manajemen Risiko']
  }
];

interface BlogDetailProps {
  postId?: string;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ postId = '10-pertanyaan-kunci' }) => {
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const foundPost = blogPostsData.find(p => p.id === postId);
    setPost(foundPost || blogPostsData[0]);
  }, [postId]);

  if (!post) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="relative h-40 sm:h-56 md:h-72 lg:h-80 xl:h-96 bg-gray-900 mt-16">
        <img
          src={post.imgSrc}
          alt={post.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 sm:px-6 lg:px-8 pb-2 sm:pb-3 md:pb-5 lg:pb-6 xl:pb-8">
          <span className="inline-block px-1.5 sm:px-2 md:px-3 py-0.5 bg-brand-accent text-white text-[9px] sm:text-[10px] md:text-xs font-semibold rounded-full mb-1 sm:mb-2">
            {post.category}
          </span>
          <h1 className="text-sm sm:text-base md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-1 sm:mb-2 md:mb-3 leading-tight">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 md:gap-3 text-white/90 text-[9px] sm:text-[10px] md:text-xs">
            <span className="flex items-center">
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 mr-0.5 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              {post.author}
            </span>
            <span className="flex items-center">
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 mr-0.5 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              {post.date}
            </span>
            <span className="flex items-center">
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 mr-0.5 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              {post.readTime} baca
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-10 lg:py-12 xl:py-16">
        <div className="grid lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12">
              <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                {post.content.map((paragraph, index) => (
                  <p key={index} className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4 md:mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-12 pt-4 sm:pt-6 md:pt-8 border-t border-gray-200">
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-brand-text mb-2 sm:mb-3">Tags</h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-100 text-gray-700 rounded-full text-[10px] sm:text-xs hover:bg-brand-accent hover:text-white transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="mt-4 sm:mt-6 md:mt-8 pt-4 sm:pt-6 md:pt-8 border-t border-gray-200">
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-brand-text mb-2 sm:mb-3">Bagikan Artikel</h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  <button className="px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-[10px] sm:text-xs">
                    Facebook
                  </button>
                  <button className="px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-[10px] sm:text-xs">
                    Twitter
                  </button>
                  <button className="px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors text-[10px] sm:text-xs">
                    LinkedIn
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            {/* Author Card */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 md:p-6">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-brand-text mb-2 sm:mb-3">Tentang Penulis</h3>
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-brand-accent rounded-full flex items-center justify-center text-white text-lg sm:text-xl md:text-2xl font-bold flex-shrink-0">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="text-xs sm:text-sm md:text-base font-bold text-brand-text">{post.author}</p>
                  <p className="text-[10px] sm:text-xs md:text-sm text-gray-500">Partner Senior</p>
                </div>
              </div>
              <p className="text-gray-600 text-[10px] sm:text-xs md:text-sm leading-relaxed">
                Ahli hukum dengan pengalaman lebih dari 10 tahun dalam memberikan solusi hukum terbaik.
              </p>
            </div>

            {/* Related Posts */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 md:p-6">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-brand-text mb-2 sm:mb-3">Artikel Terkait</h3>
              <div className="space-y-2 sm:space-y-3">
                {blogPostsData
                  .filter(p => p.id !== post.id)
                  .slice(0, 3)
                  .map((p) => (
                    <div key={p.id} className="cursor-pointer hover:bg-gray-50 p-1.5 sm:p-2 rounded-lg transition-colors">
                      <img src={p.imgSrc} alt={p.title} className="w-full h-20 sm:h-24 md:h-28 object-cover rounded-lg mb-1 sm:mb-1.5" />
                      <p className="text-[9px] sm:text-[10px] md:text-xs text-brand-accent font-semibold mb-0.5 sm:mb-1">{p.category}</p>
                      <p className="font-semibold text-brand-text text-[10px] sm:text-xs md:text-sm line-clamp-2 leading-tight">{p.title}</p>
                    </div>
                  ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-brand-accent text-white rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 md:p-6">
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1.5 sm:mb-2">Butuh Bantuan Hukum?</h3>
              <p className="text-white/90 mb-2 sm:mb-3 text-[10px] sm:text-xs md:text-sm">
                Konsultasikan masalah hukum Anda dengan tim ahli kami.
              </p>
              <a 
                href="mailto:info@kawancurhat.com"
                className="w-full bg-white text-brand-accent font-semibold py-2 sm:py-2.5 rounded-lg hover:bg-gray-100 transition-colors text-xs sm:text-sm md:text-base text-center block"
              >
                Hubungi Kami
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
