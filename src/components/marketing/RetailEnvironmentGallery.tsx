'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Eye, Clock, Users, ArrowRight } from 'lucide-react';

interface EnvironmentItem {
  id: string;
  name: string;
  gridClass: string;
  behavior: string;
  bestCampaigns: string;
  repeatVisibility: 'Very High' | 'High' | 'Medium-High' | 'Medium';
  peakTraffic: string;
  imageUrl: string;
}

const ENVIRONMENTS: EnvironmentItem[] = [
  {
    id: 'kirana',
    name: 'Kirana Stores',
    gridClass: 'lg:col-span-2 lg:row-span-2 min-h-[480px]',
    behavior: 'Daily repeat household exposure',
    bestCampaigns: 'Best for FMCG & fintech campaigns',
    repeatVisibility: 'Very High',
    peakTraffic: '6:00 PM - 9:00 PM',
    imageUrl: '/images/admesh-kirana-store.png'
  },
  {
    id: 'paan',
    name: 'Paan Shops',
    gridClass: 'lg:col-span-1 lg:row-span-1 min-h-[230px]',
    behavior: 'Frequent quick impulse stops',
    bestCampaigns: 'Best for snacking, beverage & fintech',
    repeatVisibility: 'High',
    peakTraffic: '5:00 PM - 8:00 PM',
    imageUrl: '/images/admesh-paan-shop.png'
  },
  {
    id: 'pharmacy',
    name: 'Pharmacies',
    gridClass: 'lg:col-span-1 lg:row-span-1 min-h-[230px]',
    behavior: 'High-trust health & hygiene decisions',
    bestCampaigns: 'Best for wellness, insurance & baby care',
    repeatVisibility: 'Medium-High',
    peakTraffic: '11:00 AM - 1:00 PM & 6:00 PM - 8:00 PM',
    imageUrl: '/images/admesh-pharmacy.png'
  },
  {
    id: 'cafe',
    name: 'Cafes',
    gridClass: 'lg:col-span-3 lg:row-span-1 min-h-[320px]',
    behavior: 'Extended dwell time social interactions',
    bestCampaigns: 'Best for luxury consumer goods, tech & fintech',
    repeatVisibility: 'Medium',
    peakTraffic: '4:00 PM - 7:00 PM',
    imageUrl: '/images/admesh-cafe.png'
  }
];

const RetailEnvironmentGallery = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="environments" className="relative py-32 bg-obsidian overflow-hidden border-t border-white/[0.05]">
      {/* Background aesthetics */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-amber/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-glowing-grid opacity-[0.02] pointer-events-none" />

      <div className="container-full relative z-10">
        
        {/* Section Header */}
        <div className="max-w-4xl pt-4 lg:pt-6 mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-amber/40" />
            <span className="mono text-amber text-[11px] tracking-[0.5em] uppercase" style={{ fontFamily: 'var(--font-departure)' }}>
              02 // DEPLOYMENT ENVIRONMENT
            </span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-bold text-dirty-white tracking-tighter leading-tight mb-8">
            DEPLOY ACROSS INDIAâ€™S MOST <br />
            <span className="italic font-serif text-amber text-glow">ACTIVE RETAIL SPACES.</span>
          </h2>
          <p className="text-lg text-white/50 leading-relaxed font-light max-w-2xl">
            Surgical physical targeting. Reach your customer at point-of-sale in high-frequency everyday neighborhoods.
          </p>
        </div>

        {/* Masonry / Cinematic Staggered Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-fr">
          {ENVIRONMENTS.map((env, i) => {
            const isHovered = hoveredId === env.id;

            return (
              <motion.div
                key={env.id}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                onMouseEnter={() => setHoveredId(env.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative group rounded-[16px] overflow-hidden bg-[#111114]/80 border border-white/[0.08] p-9 lg:p-11 flex flex-col justify-between transition-all duration-500 cursor-pointer ${env.gridClass} hover:border-amber/40 hover:shadow-[0_0_30px_rgba(201,115,32,0.15)]`}
              >
                
                {/* Visual Background Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <motion.img
                    src={env.imageUrl}
                    alt={env.name}
                    animate={{ scale: isHovered ? 1.05 : 1.0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="w-full h-full object-cover object-center grayscale-[30%] contrast-[1.15] opacity-40 group-hover:opacity-55 transition-opacity"
                  />
                  {/* Soft amber radial glow on hover */}
                  <div className={`absolute inset-0 bg-radial-glow transition-opacity duration-700 pointer-events-none ${isHovered ? 'opacity-25' : 'opacity-0'}`} />
                  {/* Cinematic Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/45 to-transparent z-10" />
                </div>

                {/* Blinking Live Indicator */}
                <div className="relative z-20 flex justify-between items-center mb-6">
                  <span className="mono text-[9px] text-amber uppercase tracking-widest bg-amber/5 px-2.5 py-0.5 rounded border border-amber/20">
                    Category // {env.id.toUpperCase()}
                  </span>
                  
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-1.5 px-3 py-1 rounded bg-obsidian/85 border border-amber/30 text-[9px] mono text-amber animate-pulse"
                    >
                      <ShieldCheck size={10} /> HASH_NODE_ACTIVE
                    </motion.div>
                  )}
                </div>

                {/* Storytelling overlays */}
                <div className="relative z-20 mt-auto space-y-4">
                  
                  {/* Category Name */}
                  <h3 className="text-3xl lg:text-4xl font-black text-dirty-white group-hover:text-amber transition-colors duration-300 uppercase">
                    {env.name}
                  </h3>

                  {/* Customer behavior description */}
                  <p className="text-sm text-white/70 font-light font-sans max-w-xl leading-relaxed">
                    {env.behavior}. {env.bestCampaigns}.
                  </p>

                  {/* Key Stats Panel */}
                  <div className="pt-5 border-t border-white/5 grid grid-cols-2 sm:grid-cols-3 gap-6 text-[10px] mono text-white/45 uppercase tracking-wider">
                    
                    <div>
                      <span className="text-[8px] text-white/20 block mb-1">Repeat Rate</span>
                      <span className="text-dirty-white font-bold flex items-center gap-1">
                        <Eye size={12} className="text-amber" /> {env.repeatVisibility}
                      </span>
                    </div>

                    <div>
                      <span className="text-[8px] text-white/20 block mb-1">Peak Hours</span>
                      <span className="text-dirty-white font-bold flex items-center gap-1">
                        <Clock size={12} className="text-amber" /> {env.peakTraffic.split(' & ')[0]}
                      </span>
                    </div>

                    <div className="hidden sm:block text-right">
                      <span className="text-[8px] text-white/20 block mb-1">Access Protocol</span>
                      <span className="text-amber font-bold">UPI_RECON</span>
                    </div>

                  </div>

                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default RetailEnvironmentGallery;
