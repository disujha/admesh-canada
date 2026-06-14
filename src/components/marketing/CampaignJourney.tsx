'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Layers, Upload, Printer, ShieldCheck, BarChart, Cpu, ChevronRight, ChevronLeft } from 'lucide-react';

interface JourneyStep {
  stepNum: string;
  title: string;
  icon: any;
  description: string;
  readoutCode: string;
  timing: string;
}

const STEPS: JourneyStep[] = [
  {
    stepNum: '01',
    title: 'Select Locations',
    icon: MapPin,
    description: 'Filter India\'s retail network by pin codes, metro clusters, or specific demographic densities.',
    readoutCode: 'GRID_LOC_SELECT // bandra_colaba',
    timing: 'Day 01 // 10:00 IST'
  },
  {
    stepNum: '02',
    title: 'Choose Ad Formats',
    icon: Layers,
    description: 'Combine countertop stickers, flex banners, shelf dividers, shutters, and digital screens.',
    readoutCode: 'MEDIA_SPEC_BUILD // flex_shutter_sticker',
    timing: 'Day 01 // 11:30 IST'
  },
  {
    stepNum: '03',
    title: 'Upload Creatives',
    icon: Upload,
    description: 'Drag and drop high-res creative assets. AI automatically pre-validates files for exact printable dimensions.',
    readoutCode: 'ASSET_UPLOAD // payload_hash_v1',
    timing: 'Day 01 // 12:45 IST'
  },
  {
    stepNum: '04',
    title: 'Printing & Deployment',
    icon: Printer,
    description: 'Assets are routed automatically to localized print hubs. Ground tasking agents deploy installations.',
    readoutCode: 'DEPLOY_LOGISTICS // print_dispatch_local',
    timing: 'Day 02 // 09:00 IST'
  },
  {
    stepNum: '05',
    title: 'Verification & Monitoring',
    icon: ShieldCheck,
    description: 'Agents capture geo-tagged verification photos instantly at installation, establishing tamper-evident proof.',
    readoutCode: 'AUDIT_VERIFY // geo_tag_validate',
    timing: 'Day 02 // 16:30 IST'
  },
  {
    stepNum: '06',
    title: 'Performance Reporting',
    icon: BarChart,
    description: 'Live performance indicators, demographic engagement metrics, and store-by-store audits sync to your console.',
    readoutCode: 'METRIC_SYNC // active_dashboard',
    timing: 'Day 03 // 08:00 IST'
  },
  {
    stepNum: '07',
    title: 'Optimization',
    icon: Cpu,
    description: 'Cognitive algorithms reallocate budget automatically, shifting resources to high-yield hotspots.',
    readoutCode: 'COGNITIVE_REALLOC // maximize_impact_roi',
    timing: 'Continuous // real_time_sync'
  }
];

const CampaignJourney = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section id="journey" className="relative py-32 bg-obsidian overflow-hidden border-t border-white/[0.05]">
      {/* Background neon grids */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-amber/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-glowing-grid opacity-[0.02] pointer-events-none" />

      <div className="container-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-amber/40" />
              <span className="mono text-amber text-[11px] tracking-[0.5em] uppercase" style={{ fontFamily: 'var(--font-departure)' }}>
                09 // OPERATION PROTOCOL
              </span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-bold text-dirty-white tracking-tighter leading-tight uppercase mb-6">
              The Campaign <br />
              <span className="italic font-serif text-amber text-glow">Deployment Journey.</span>
            </h2>
            <p className="text-lg text-white/50 leading-relaxed font-light max-w-xl">
              From digital strategy brief to audited storefront setups in under 48 hours. Here is our automated launch lifecycle.
            </p>
          </div>

          {/* Navigation Scroll Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollLeft}
              className="p-3.5 rounded-full border border-white/10 bg-white/5 text-white/60 hover:border-amber/40 hover:text-amber transition-all tactile-hover"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={scrollRight}
              className="p-3.5 rounded-full border border-white/10 bg-white/5 text-white/60 hover:border-amber/40 hover:text-amber transition-all tactile-hover"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Horizontal Timeline Track Container */}
        <div className="relative w-full">
          
          {/* Horizontal connecting neon line behind cards */}
          <div className="absolute top-[48px] left-8 right-8 h-[2px] bg-gradient-to-r from-amber/80 via-amber/30 to-white/5 z-0 pointer-events-none hidden lg:block" />

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="flex flex-row overflow-x-auto gap-8 items-start pb-8 scrollbar-none snap-x snap-mandatory lg:overflow-x-auto lg:pb-12"
          >
            {STEPS.map((step, i) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.stepNum}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="relative shrink-0 w-[80vw] sm:w-[360px] snap-center group z-10"
                >
                  
                  {/* Step Icon Container on the neon track */}
                  <div className="relative z-20 mb-8 flex justify-start pl-6 lg:pl-8">
                    <div className="w-12 h-12 rounded-xl bg-obsidian border-2 border-white/10 flex items-center justify-center group-hover:border-amber group-hover:bg-amber/5 group-hover:shadow-[0_0_15px_rgba(201,115,32,0.4)] transition-all duration-500">
                      <Icon size={18} className="text-white/40 group-hover:text-amber transition-colors" />
                    </div>
                    {/* Blinking track anchor */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-[50px] lg:left-[58px] w-1.5 h-1.5 rounded-full bg-amber animate-ping pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Step Card Body */}
                  <div className="relative rounded-[14px] bg-[#111114]/90 border border-white/[0.08] p-9 min-h-[300px] flex flex-col justify-between overflow-hidden backdrop-blur-xl group-hover:border-amber/30 transition-colors duration-500">
                    
                    {/* Orange backglow overlay on hover */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div>
                      
                      {/* Step Number & Timing */}
                      <div className="flex justify-between items-center mb-5">
                        <span className="text-2xl font-black text-amber/40 group-hover:text-amber transition-colors duration-500 mono" style={{ fontFamily: 'var(--font-departure)' }}>
                          {step.stepNum}
                        </span>
                        <span className="text-[9px] mono text-white/35 uppercase tracking-widest bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                          {step.timing.split(' // ')[0]}
                        </span>
                      </div>

                      {/* Step Title */}
                      <h3 className="text-xl font-bold text-dirty-white tracking-tight uppercase mb-3">
                        {step.title}
                      </h3>

                      {/* Step Description */}
                      <p className="text-xs text-white/50 leading-relaxed font-light font-sans">
                        {step.description}
                      </p>

                    </div>

                    {/* HUD console output footer */}
                    <div className="border-t border-white/5 pt-6 mt-6 flex justify-between items-center text-[8px] mono text-white/20 uppercase tracking-widest">
                      <span className="truncate max-w-[180px]">{step.readoutCode.split(' // ')[0]}</span>
                      <span className="text-signal-green">VERIFIED</span>
                    </div>

                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default CampaignJourney;
