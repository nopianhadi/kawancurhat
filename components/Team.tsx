import React, { useState, useEffect, useRef } from 'react';
import { LinkedInIcon, XIcon } from './Icons';

const teamMembers = [
  {
    id: 'andi-firmansyah',
    name: 'Aship Firmansyah, S.E., S.H.',
    role: 'Konsultan Hukum Bisnis dan Pengacara',
    imgSrc: '/aset/Gambar WhatsApp 2025-11-20 pukul 19.41.39_1671753d.jpg',
    photos: [
      '/aset/Gambar WhatsApp 2025-11-20 pukul 19.41.39_1671753d.jpg',
      '/aset/Gambar WhatsApp 2025-11-20 pukul 19.41.39_a67ea4d6.jpg',
      '/aset/Gambar WhatsApp 2025-11-20 pukul 19.41.39_dfe4335f.jpg'
    ],
    socials: { 
      linkedin: 'https://www.linkedin.com/in/andi-firmansyah', 
      x: 'https://twitter.com/kawancurhat',
      instagram: 'https://www.instagram.com/kawancurhat',
      whatsapp: 'https://wa.me/6285678862510',
      tiktok: 'https://www.tiktok.com/@kawancurhat'
    },
    bio: 'Konsultan hukum bisnis dengan pengalaman lebih dari 10 tahun dalam memberikan solusi hukum strategis untuk berbagai perusahaan.'
  }
];

const TeamMemberCard: React.FC<{ member: typeof teamMembers[0]; index: number }> = ({ member, index }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [currentPhoto, setCurrentPhoto] = useState(member.imgSrc);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });

        if (ref.current) observer.observe(ref.current);
        return () => {
            if(ref.current) observer.unobserve(ref.current);
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`group text-center transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${index * 150}ms` }}
        >
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg mb-2 sm:mb-3 md:mb-4 transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105" style={{ aspectRatio: '3/4' }}>
                <img src={currentPhoto} alt={member.name} className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-110" />
            </div>

            {/* Photo Gallery - Small thumbnails */}
            <div className="flex justify-center gap-2 sm:gap-3 mb-3 sm:mb-4 px-2">
                {member.photos.map((photo, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setCurrentPhoto(photo)}
                    className={`relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 ${
                      currentPhoto === photo ? 'ring-2 ring-brand-accent ring-offset-2' : ''
                    }`}
                  >
                    <img 
                      src={photo} 
                      alt={`${member.name} - Foto ${idx + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
            </div>

            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-brand-text mb-1">{member.name}</h3>
            <p className="text-brand-accent text-xs sm:text-sm md:text-base mb-3">{member.role}</p>
            
            {member.bio && (
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed px-2 mb-4">
                {member.bio}
              </p>
            )}

            {/* Certificates and Documents */}
            <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3 px-2">
              <h4 className="text-xs sm:text-sm font-semibold text-brand-text mb-2 sm:mb-3">Sertifikat & Dokumen</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <a 
                  href="/aset/Seritifikat PKPA.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-card border border-gray-200 rounded-lg hover:border-brand-accent hover:shadow-md transition-all duration-300 group"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-brand-accent group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-brand-accent">Sertifikat PKPA</span>
                </a>

                <a 
                  href="/aset/Sertifikat Ujian Advokat.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-card border border-gray-200 rounded-lg hover:border-brand-accent hover:shadow-md transition-all duration-300 group"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-brand-accent group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-brand-accent">Sertifikat Ujian Advokat</span>
                </a>

                <a 
                  href="/aset/Profil Advokat.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-card border border-gray-200 rounded-lg hover:border-brand-accent hover:shadow-md transition-all duration-300 group"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-brand-accent group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                  <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-brand-accent">Profil Advokat</span>
                </a>

                <a 
                  href="/aset/Gambar WhatsApp 2025-11-21 pukul 13.05.26_1c85e01b.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-card border border-gray-200 rounded-lg hover:border-brand-accent hover:shadow-md transition-all duration-300 group"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-brand-accent group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-brand-accent">Dokumen Lainnya</span>
                </a>
              </div>
            </div>
        </div>
    );
};

const Team: React.FC = () => {
  return (
    <section className="bg-white py-6 sm:py-12 md:py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-4 sm:mb-6 md:mb-10 lg:mb-12">
            <p className="text-brand-accent font-semibold mb-0.5 sm:mb-1 md:mb-2 text-[10px] sm:text-xs md:text-sm">Tim Kami</p>
            <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-brand-text">
                Temui Konsultan Ahli Kami
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 mt-1 sm:mt-2 md:mt-3 lg:mt-4 text-[10px] sm:text-xs md:text-sm lg:text-base px-2">
                Konsultan hukum bisnis berpengalaman siap memberikan solusi cerdas dan aman untuk setiap keputusan bisnis Anda.
            </p>
        </div>
        
        <div className="flex justify-center">
          <div className="max-w-2xl w-full">
            {teamMembers.map((member, index) => (
                <TeamMemberCard 
                    key={index} 
                    member={member} 
                    index={index}
                />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
