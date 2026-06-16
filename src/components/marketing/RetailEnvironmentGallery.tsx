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
    id: 'convenience',
    name: 'Convenience Chains',
    gridClass: 'lg:col-span-2 lg:row-span-2 min-h-[480px]',
    behavior: 'Daily repeat household exposure',
    bestCampaigns: 'Best for CPG, beverages & fintech campaigns',
    repeatVisibility: 'Very High',
    peakTraffic: '4:00 PM - 8:00 PM',
    imageUrl: '/images/storefront.png'
  },
  {
    id: 'gas_station',
    name: 'Gas Stations',
    gridClass: 'lg:col-span-1 lg:row-span-1 min-h-[230px]',
    behavior: 'Frequent commuter impulse stops',
    bestCampaigns: 'Best for snacks, beverages & auto insurance',
    repeatVisibility: 'High',
    peakTraffic: '7:00 AM - 9:00 AM & 3:00 PM - 6:00 PM',
    imageUrl: '/images/instore.png'
  },
  {
    id: 'pharmacy',
    name: 'Pharmacies',
    gridClass: 'lg:col-span-1 lg:row-span-1 min-h-[230px]',
    behavior: 'High-trust health & hygiene decisions',
    bestCampaigns: 'Best for wellness, insurance & baby care',
    repeatVisibility: 'Medium-High',
    peakTraffic: '11:00 AM - 1:00 PM & 5:00 PM - 7:00 PM',
    imageUrl: '/images/medical.png'
  },
  {
    id: 'cafe',
    name: 'Cafes',
    gridClass: 'lg:col-span-3 lg:row-span-1 min-h-[320px]',
    behavior: 'Extended dwell time social interactions',
    bestCampaigns: 'Best for consumer services, lifestyle brands & SaaS',
    repeatVisibility: 'Medium',
    peakTraffic: '8:00 AM - 11:00 AM & 2:00 PM - 4:00 PM',
    imageUrl: '/images/cafe.png'
  }
];

const RetailEnvironmentGallery = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="environments" className="relative py-32 bg-white overflow-hidden border-t border-slate-200">
      {/* Background aesthetics */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-glowing-grid opacity-[0.02] pointer-events-none" />

      <div className="container-full relative z-10">
        
        {/* Section Header */}
        <div className="max-w-4xl pt-4 lg:pt-6 mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-blue-600/40" />
            <span className="mono text-blue-600 text-[11px] tracking-[0.5em] uppercase font-bold" style={{ fontFamily: 'var(--font-departure)' }}>
              02 // DEPLOYMENT ENVIRONMENT
            </span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-bold text-slate-900 tracking-tighter leading-tight mb-8">
            DEPLOY ACROSS CANADA’S MOST <br />
            <span className="italic font-serif text-blue-600 text-glow">ACTIVE RETAIL SPACES.</span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed font-light max-w-2xl">
            Surgical physical targeting. Reach your customer at the point of commerce in high-frequency everyday neighborhoods.
          </p>
        </div>

        {/* Masonry / Staggered Grid */}
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
                className={`relative group rounded-[16px] overflow-hidden bg-slate-50 border border-slate-200/80 p-9 lg:p-11 flex flex-col justify-between transition-all duration-500 cursor-pointer ${env.gridClass} hover:border-blue-600/30 hover:shadow-sm`}
              >
                
                {/* Visual Background Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <motion.img
                    src={env.imageUrl}
                    alt={env.name}
                    animate={{ scale: isHovered ? 1.05 : 1.0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="w-full h-full object-cover object-center opacity-70 group-hover:opacity-85 transition-opacity"
                  />
                  {/* Clean Gradient Overlay for text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent z-10" />
                </div>

                {/* Live Indicator */}
                <div className="relative z-20 flex justify-between items-center mb-6">
                  <span className="mono text-[9px] text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100 font-bold">
                    Category // {env.id.toUpperCase()}
                  </span>
                  
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-1.5 px-3 py-1 rounded bg-white border border-blue-200 text-[9px] mono text-blue-600 font-bold animate-pulse shadow-sm"
                    >
                      <ShieldCheck size={10} /> HASH_NODE_ACTIVE
                    </motion.div>
                  )}
                </div>

                {/* Overlays */}
                <div className="relative z-20 mt-auto space-y-4">
                  
                  {/* Category Name */}
                  <h3 className="text-3xl lg:text-4xl font-black text-slate-900 group-hover:text-blue-600 transition-colors duration-300 uppercase">
                    {env.name}
                  </h3>

                  {/* Customer behavior description */}
                  <p className="text-sm text-slate-600 font-light font-sans max-w-xl leading-relaxed">
                    {env.behavior}. {env.bestCampaigns}.
                  </p>

                  {/* Key Stats Panel */}
                  <div className="pt-5 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-6 text-[10px] mono text-slate-400 uppercase tracking-wider font-bold">
                    
                    <div>
                      <span className="text-[8px] text-slate-400 block mb-1">Repeat Rate</span>
                      <span className="text-slate-800 font-bold flex items-center gap-1">
                        <Eye size={12} className="text-blue-600" /> {env.repeatVisibility}
                      </span>
                    </div>

                    <div>
                      <span className="text-[8px] text-slate-400 block mb-1">Peak Hours</span>
                      <span className="text-slate-800 font-bold flex items-center gap-1">
                        <Clock size={12} className="text-blue-600" /> {env.peakTraffic.split(' & ')[0]}
                      </span>
                    </div>

                    <div className="hidden sm:block text-right">
                      <span className="text-[8px] text-slate-400 block mb-1">Access Protocol</span>
                      <span className="text-blue-600 font-bold">DIRECT_DEP</span>
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
