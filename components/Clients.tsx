import React, { useState, useEffect, useRef } from 'react';

const clientsData = [
  { no: 1, perusahaan: 'PT. WIRA PAPER', alamat: 'Tangerang', bidang: 'PAPER MANUFACTURER' },
  { no: 2, perusahaan: 'PT. PERDANA KARYA AGUNG', alamat: 'Tangerang', bidang: 'OUTSOURCHING' },
  { no: 3, perusahaan: 'PT. GRIYA SAGUNA INDAH', alamat: 'Pandeglang', bidang: 'PROPERTY' },
  { no: 4, perusahaan: 'PT. INTI PERMATA RESTU', alamat: 'Jakarta Barat', bidang: 'INTERMEDIATE GOODS' },
  { no: 5, perusahaan: 'PT. NUANSA VANINDO', alamat: 'Jakarta Pusat', bidang: 'CONSTRUCTION' },
  { no: 6, perusahaan: 'PT. INEXT ARSINDO', alamat: 'Tangerang', bidang: 'DEVELOPER & PERHOTELAN' },
  { no: 7, perusahaan: 'PT. SHANFU METAL INDUSTRY', alamat: 'Tangerang', bidang: 'WIRE RODE' },
  { no: 8, perusahaan: 'Ibu Yati', alamat: 'Indonesia', bidang: 'JASA EKSPEDISI' }
];

const Clients: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <section className="bg-white py-10 sm:py-16 md:py-20 lg:py-28 xl:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-7xl">
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-24">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal text-[#202124] mb-3 sm:mb-4 md:mb-6 tracking-tight">
            Klien Kami
          </h2>
          <p className="max-w-3xl mx-auto text-[#5f6368] mt-2 sm:mt-3 md:mt-4 lg:mt-6 text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-relaxed px-4">
            Dipercaya oleh berbagai perusahaan terkemuka di Indonesia
          </p>
        </div>

        <div 
          ref={ref}
          className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {/* Desktop Table - Google AI Studio Style */}
          <div className="hidden md:block overflow-hidden rounded-3xl border border-[#e8eaed]" style={{ boxShadow: 'var(--shadow-sm)' }}>
            <table className="w-full bg-white">
              <thead className="bg-[#f8f9fa] border-b border-[#e8eaed]">
                <tr>
                  <th className="px-8 py-5 text-left text-sm font-medium text-[#5f6368] uppercase tracking-wide">No</th>
                  <th className="px-8 py-5 text-left text-sm font-medium text-[#5f6368] uppercase tracking-wide">Perusahaan</th>
                  <th className="px-8 py-5 text-left text-sm font-medium text-[#5f6368] uppercase tracking-wide">Alamat</th>
                  <th className="px-8 py-5 text-left text-sm font-medium text-[#5f6368] uppercase tracking-wide">Bidang</th>
                </tr>
              </thead>
              <tbody>
                {clientsData.map((client, index) => (
                  <tr 
                    key={client.no}
                    className="border-b border-[#e8eaed] hover:bg-[#f8f9fa] transition-colors duration-200"
                    style={{ 
                      transitionDelay: `${index * 50}ms`,
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(10px)'
                    }}
                  >
                    <td className="px-8 py-6 text-base text-[#5f6368] font-normal">{client.no}</td>
                    <td className="px-8 py-6 text-base text-[#202124] font-medium">{client.perusahaan}</td>
                    <td className="px-8 py-6 text-base text-[#5f6368] font-normal">{client.alamat}</td>
                    <td className="px-8 py-6 text-base">
                      <span className="inline-block px-4 py-2 bg-[#f5f0e8] text-[#C19D60] rounded-full text-sm font-medium">
                        {client.bidang}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-2 sm:space-y-3">
            {clientsData.map((client, index) => (
              <div 
                key={client.no}
                className="bg-white rounded-lg shadow-md p-3 sm:p-4 hover:shadow-lg transition-all duration-300"
                style={{ 
                  transitionDelay: `${index * 50}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                      <span className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-brand-accent text-white rounded-full text-[10px] sm:text-xs font-bold flex-shrink-0">
                        {client.no}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-brand-text leading-tight">{client.perusahaan}</h3>
                    </div>
                    <p className="text-[10px] sm:text-xs text-gray-600 ml-6 sm:ml-8">📍 {client.alamat}</p>
                  </div>
                </div>
                <div className="ml-6 sm:ml-8 mt-1.5 sm:mt-2">
                  <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-brand-accent/10 text-brand-accent rounded-full text-[10px] sm:text-xs font-medium">
                    {client.bidang}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
