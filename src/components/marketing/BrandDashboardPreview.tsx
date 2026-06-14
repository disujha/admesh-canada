'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Target, Eye, ShieldCheck, Layers, Cpu, Radio, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface FeatureHighlight {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const FEATURES: FeatureHighlight[] = [
  {
    id: 'geo',
    title: 'Surgical Geo-Targeting',
    description: 'Filter and target everyday networks block-by-block, selecting exactly which neighborhoods fit your customer profile.',
    icon: Compass
  },
  {
    id: 'radius',
    title: 'Interactive Radius Targeting',
    description: 'Set custom geographic buffers around hubs like colleges, corporate tech parks, or key transit points to capture active nearby shoppers.',
    icon: Target
  },
  {
    id: 'visibility',
    title: 'Visibility Analytics',
    description: 'Analyze real-world attention vectors, factoring street exposure, store angle, lighting, and pedestrian density to score every card.',
    icon: Eye
  },
  {
    id: 'verification',
    title: 'Verification Tracking',
    description: '100% auditable proof of deployment. Field agents upload geo-tagged, timestamped photos which are AI-validated instantly.',
    icon: ShieldCheck
  },
  {
    id: 'density',
    title: 'Retail Density Intelligence',
    description: 'Hyperlocal spatial maps showing neighborhood footfall capacity, customer concentration, and commerce volumes.',
    icon: Layers
  },
  {
    id: 'smart-realloc',
    title: 'Smart Campaign Recommendations',
    description: 'Our cognitive ML engine recommends shifting capital from low-yield stores to high-demand spaces automatically.',
    icon: Cpu
  },
  {
    id: 'monitoring',
    title: 'Real-Time Deployment Monitoring',
    description: 'Watch campaigns scale in real-time. Tracks logistics, printing, shipping, and active on-field nodes on your console.',
    icon: Radio
  }
];

const BrandDashboardPreview = () => {
  const [activeFeature, setActiveFeature] = useState('geo');

  return (
    <section id="dashboard-preview" className="relative py-32 bg-obsidian overflow-hidden border-t border-white/[0.05]">
      {/* Background glowing atmospheres */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-glowing-grid opacity-[0.02] pointer-events-none" />

      <div className="container-full relative z-10">
        
        {/* Section Title */}
        <div className="max-w-4xl pt-4 lg:pt-6 mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-amber/40" />
            <span className="mono text-amber text-[11px] tracking-[0.5em] uppercase" style={{ fontFamily: 'var(--font-departure)' }}>
              07 // SAAS PLATFORM CONSOLE
            </span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-bold text-dirty-white tracking-tighter leading-tight mb-8">
            Control Offline Advertising <br />
            <span className="italic font-serif text-amber text-glow">Like Digital Ads.</span>
          </h2>
          <p className="text-lg text-white/50 leading-relaxed font-light max-w-2xl">
            Meet the AdMesh terminal. Programmatic targeting, heatmaps, live logistics, and AI budget shiftsâ€”all in one visual pane.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT SIDE: Dashboard Frame + Inline HUD Cards */}
          <div className="lg:col-span-7 space-y-4">

            {/* Main Dashboard UI Mockup Frame */}
            <div className="relative rounded-[16px] overflow-hidden border border-white/10 bg-[#111114]/90 p-3 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl group transition-all duration-500 hover:border-amber/30">
              <div className="absolute inset-0 bg-glowing-grid opacity-[0.04] pointer-events-none" />

              {/* Header Bar */}
              <div className="flex justify-between items-center px-5 py-3 border-b border-white/5 text-[9px] mono text-white/30 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500/50" />
                  <div className="w-2 h-2 rounded-full bg-amber/50" />
                  <div className="w-2 h-2 rounded-full bg-signal-green/50" />
                  <span className="ml-2 font-bold text-white/50">GRID_CONSOLE_V2.0.exe</span>
                </div>
                <div className="flex items-center gap-1.5 text-signal-green">
                  <Zap size={9} className="animate-pulse" />
                  SYSTEM_ONLINE
                </div>
              </div>

              {/* Main Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#09090b] rounded-[12px] border border-white/5">
                <img
                  src="/images/hero-dashboard-mockup.png"
                  alt="AdMesh Programmatic Dashboard Console"
                  className="w-full h-full object-cover object-top grayscale-[15%] contrast-[1.08]"
                />
                <div className="absolute inset-0 scanlines opacity-[0.05] pointer-events-none" />
              </div>
            </div>

            {/* HUD Info Cards â€” inline grid, no absolute positioning */}
            <div className="grid grid-cols-2 gap-3">

              {/* Hyperlocal Map Card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="rounded-xl border border-white/10 bg-[#111114]/90 p-4 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between text-[9px] mono text-white/30 uppercase tracking-wider mb-3 px-0.5">
                  <span>HYPERLOCAL MAP</span>
                  <span className="text-amber">RADAR_SYNC</span>
                </div>
                <div className="relative h-24 overflow-hidden rounded-xl border border-white/5">
                  <img
                    src="/images/command-center-map.png"
                    alt="Hyperlocal live network tracking map"
                    className="w-full h-full object-cover grayscale-[30%] contrast-[1.15] brightness-[0.8]"
                  />
                  <div className="absolute top-1/2 left-1/3 w-2.5 h-2.5 bg-amber rounded-full animate-ping shadow-[0_0_8px_#C97320]" />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="flex justify-between items-center text-[10px] mono text-white/50 mt-3 pt-2.5 px-0.5 border-t border-white/10">
                  <span>BUFFER: 1.5KM</span>
                  <span className="text-amber font-bold">142 NODES</span>
                </div>
              </motion.div>

              {/* ROI Efficiency Card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="rounded-xl border border-amber/20 bg-amber/5 p-5 backdrop-blur-xl flex flex-col justify-between"
              >
                <div className="flex items-center gap-1.5 text-[9px] mono text-amber font-bold uppercase tracking-widest mb-3">
                  <Cpu size={10} /> Smart ROI Optimize
                </div>
                <div>
                  <div className="text-4xl font-black text-dirty-white tracking-tight mono">
                    +18.4%
                  </div>
                  <div className="text-[9px] text-white/40 leading-relaxed mt-2 uppercase">
                    Average net efficiency gain after dynamic budget reallocation.
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

          {/* RIGHT SIDE: Programmatic Feature Highlights */}
          <div className="lg:col-span-5 space-y-4">
            
            {FEATURES.map((feat) => {
              const Icon = feat.icon;
              const isActive = activeFeature === feat.id;

              return (
                <div
                  key={feat.id}
                  onMouseEnter={() => setActiveFeature(feat.id)}
                  className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-white/[0.03] border-amber/35 shadow-[0_0_20px_rgba(201,115,32,0.06)]'
                      : 'bg-transparent border-white/[0.04] hover:border-white/15'
                  }`}
                >
                  <div className="flex gap-4 items-start">
                    
                    {/* Glowing Icon Holder */}
                    <div className={`p-3 rounded-xl border transition-all duration-300 ${
                      isActive
                        ? 'bg-amber border-amber text-obsidian shadow-[0_0_12px_rgba(201,115,32,0.25)]'
                        : 'bg-white/5 border-white/10 text-white/40'
                    }`}>
                      <Icon size={18} />
                    </div>

                    {/* Description Text */}
                    <div className="space-y-1">
                      <h4 className={`text-lg font-bold tracking-tight uppercase transition-colors ${
                        isActive ? 'text-dirty-white' : 'text-white/60'
                      }`}>
                        {feat.title}
                      </h4>
                      <p className={`text-xs leading-relaxed font-light transition-colors ${
                        isActive ? 'text-white/60' : 'text-white/30'
                      }`}>
                        {feat.description}
                      </p>
                    </div>

                  </div>
                </div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
};

export default BrandDashboardPreview;
