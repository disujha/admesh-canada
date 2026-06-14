'use client';

import React from 'react';

const BrandMarquee = () => {
  const brands = [
    'RELIANCE_RETAIL', 'NESTLE', 'HINDUSTAN_UNILEVER', 'PEPSICO', 'PARLE', 'AMUL', 'MARICO', 'BRITANNIA', 'DABUR', 'ITC'
  ];

  return (
    <div className="relative w-full overflow-hidden bg-obsidian py-12 border-y border-white-5">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-obsidian to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-obsidian to-transparent z-10" />
      
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(3)].map((_, outerIndex) => (
          <div key={outerIndex} className="flex items-center gap-24 mx-12">
            {brands.map((brand) => (
              <span 
                key={brand} 
                className="mono text-[14px] text-white-20 hover:text-amber transition-colors tracking-[0.4em] uppercase font-bold cursor-default"
              >
                {brand}
              </span>
            ))}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default BrandMarquee;
