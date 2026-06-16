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
    description: 'Filter and target retail networks block-by-block, selecting exactly which neighborhoods fit your customer profile.',
    icon: Compass
  },
  {
    id: 'radius',
    title: 'Interactive Radius Targeting',
    description: 'Set custom geographic buffers around high-intent locations like colleges, business districts, or key transit points to capture active nearby shoppers.',
    icon: Target
  },
  {
    id: 'visibility',
    title: 'Visibility Analytics',
    description: 'Analyze real-world attention vectors, factoring street exposure, store angle, lighting, and pedestrian density to score every placement.',
    icon: Eye
  },
  {
    id: 'verification',
    title: 'Verification Tracking',
    description: '100% auditable proof of deployment. Field partners upload geo-tagged, timestamped photos which are AI-validated instantly.',
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
    <section id="dashboard-preview" className="relative py-32 bg-white overflow-hidden border-t border-slate-200">
      {/* Background glowing atmospheres */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-glowing-grid opacity-[0.02] pointer-events-none" />

      <div className="container-full relative z-10">
        
        {/* Section Title */}
        <div className="max-w-4xl pt-4 lg:pt-6 mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-blue-600/40" />
            <span className="mono text-blue-600 text-[11px] tracking-[0.5em] uppercase font-bold" style={{ fontFamily: 'var(--font-departure)' }}>
              07 // SAAS PLATFORM CONSOLE
            </span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-bold text-slate-900 tracking-tighter leading-tight mb-8">
            Control Offline Advertising <br />
            <span className="italic font-serif text-slate-900 text-glow">Like Digital Ads.</span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed font-light max-w-2xl">
            Meet the AdMesh terminal. Programmatic targeting, heatmaps, live logistics, and AI budget shifts—all in one visual pane.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT SIDE: Dashboard Frame + Inline HUD Cards */}
          <div className="lg:col-span-7 space-y-4">

            {/* Main Dashboard UI Mockup Frame */}
            <div className="relative rounded-[16px] overflow-hidden border border-slate-200 bg-white p-3 shadow-md group transition-all duration-500 hover:border-blue-600/30">
              <div className="absolute inset-0 bg-glowing-grid opacity-[0.04] pointer-events-none" />

              {/* Header Bar */}
              <div className="flex justify-between items-center px-5 py-3 border-b border-slate-100 text-[9px] mono text-slate-400 uppercase tracking-widest font-bold">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-400/80" />
                  <div className="w-2 h-2 rounded-full bg-amber-400/80" />
                  <div className="w-2 h-2 rounded-full bg-blue-400/80" />
                  <span className="ml-2 font-bold text-slate-500">GRID_CONSOLE_V2.0.exe</span>
                </div>
                <div className="flex items-center gap-1.5 text-blue-600 font-bold">
                  <Zap size={9} className="animate-pulse" />
                  SYSTEM_ONLINE
                </div>
              </div>

              {/* Main Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-50 rounded-[12px] border border-slate-200">
                <img
                  src="/images/admesh-network.png"
                  alt="AdMesh Programmatic Dashboard Console"
                  className="w-full h-full object-cover object-top grayscale-[15%] contrast-[1.08]"
                />
                <div className="absolute inset-0 scanlines opacity-[0.02] pointer-events-none" />
              </div>
            </div>

            {/* HUD Info Cards ── inline grid, no absolute positioning */}
            <div className="grid grid-cols-2 gap-3">

              {/* Hyperlocal Map Card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between text-[9px] mono text-slate-400 uppercase tracking-wider mb-3 px-0.5 font-bold">
                  <span>HYPERLOCAL MAP</span>
                  <span className="text-blue-600">RADAR_SYNC</span>
                </div>
                <div className="relative h-24 overflow-hidden rounded-xl border border-slate-200">
                  <img
                    src="/images/tracker.png"
                    alt="Hyperlocal live network tracking map"
                    className="w-full h-full object-cover grayscale-[30%] contrast-[1.15] brightness-[1.02]"
                  />
                  <div className="absolute top-1/2 left-1/3 w-2.5 h-2.5 bg-blue-600 rounded-full animate-ping shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-200/50 to-transparent" />
                </div>
                <div className="flex justify-between items-center text-[10px] mono text-slate-500 mt-3 pt-2.5 px-0.5 border-t border-slate-100 font-bold">
                  <span>BUFFER: 1.5KM</span>
                  <span className="text-blue-600 font-bold font-serif italic">142 NODES</span>
                </div>
              </motion.div>

              {/* ROI Efficiency Card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="rounded-xl border border-blue-200 bg-blue-50/40 p-5 shadow-sm flex flex-col justify-between"
              >
                <div className="flex items-center gap-1.5 text-[9px] mono text-blue-600 font-bold uppercase tracking-widest mb-3">
                  <Cpu size={10} /> Smart ROI Optimize
                </div>
                <div>
                  <div className="text-4xl font-black text-slate-800 tracking-tight mono">
                    +18.4%
                  </div>
                  <div className="text-[9px] text-slate-500 font-bold leading-relaxed mt-2 uppercase">
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
                      ? 'bg-slate-50 border-slate-200/80 shadow-sm'
                      : 'bg-transparent border-transparent hover:border-slate-200'
                  }`}
                >
                  <div className="flex gap-4 items-start">
                    
                    {/* Icon Holder */}
                    <div className={`p-3 rounded-xl border transition-all duration-300 ${
                      isActive
                        ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 border-slate-200 text-slate-400'
                    }`}>
                      <Icon size={18} />
                    </div>

                    {/* Description Text */}
                    <div className="space-y-1">
                      <h4 className={`text-lg font-bold tracking-tight uppercase transition-colors ${
                        isActive ? 'text-slate-900' : 'text-slate-500'
                      }`}>
                        {feat.title}
                      </h4>
                      <p className={`text-xs leading-relaxed font-light transition-colors ${
                        isActive ? 'text-slate-600' : 'text-slate-400'
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
