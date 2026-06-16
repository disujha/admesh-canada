'use client';

import React from 'react';

const BrandMarquee = () => {
  const brands = [
    'LOBLAWS', 'SHOPPERS_DRUG_MART', 'SOBEYS', 'TIM_HORTONS', 'CIRCLE_K', 'METRO', 'PETRO_CANADA', 'CANADIAN_TIRE', 'REXALL', 'PIZZA_PIZZA'
  ];

  return (
    <div className="relative w-full overflow-hidden bg-[#F1EFE6] py-10 border-y border-[#11233B]/10">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#F1EFE6] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#F1EFE6] to-transparent z-10 pointer-events-none" />
      
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(3)].map((_, outerIndex) => (
          <div key={outerIndex} className="flex items-center gap-24 mx-12">
            {brands.map((brand) => (
              <span 
                key={brand} 
                className="font-mono text-[12px] text-[#11233B]/25 hover:text-[#FFB300] transition-colors tracking-[0.3em] uppercase font-bold cursor-default"
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
