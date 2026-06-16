'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Layers, Upload, Printer, ShieldCheck, BarChart } from 'lucide-react';

interface JourneyStep {
  stepNum: string;
  title: string;
  icon: any;
  description: string;
  timing: string;
  illustration: React.ReactNode;
}

const STEPS: JourneyStep[] = [
  {
    stepNum: '01',
    title: 'Select Nodes',
    icon: MapPin,
    timing: 'Day 1 // Setup',
    description: 'Filter and select retail locations by postal code and footfall metrics.',
    illustration: (
      <div className="relative w-full h-24 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-glowing-grid opacity-[0.02] pointer-events-none" />
        <div className="w-12 h-12 rounded-full border border-blue-600/20 flex items-center justify-center relative">
          <motion.div
            animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full h-full rounded-full border border-blue-600/40 absolute"
          />
          <div className="w-4 h-4 rounded-full bg-blue-600 animate-ping absolute" />
          <div className="w-3.5 h-3.5 rounded-full bg-blue-600 flex items-center justify-center relative z-10">
            <div className="w-1 h-1 rounded-full bg-white" />
          </div>
        </div>
      </div>
    )
  },
  {
    stepNum: '02',
    title: 'Choose Formats',
    icon: Layers,
    timing: 'Day 1 // Layout',
    description: 'Configure print and digital formats matching your target storefront layouts.',
    illustration: (
      <div className="relative w-full h-24 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-glowing-grid opacity-[0.02] pointer-events-none" />
        <div className="relative w-14 h-10">
          <motion.div
            animate={{ y: [0, -4, 0], x: [0, -1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 bg-white border border-slate-200 rounded-lg shadow-sm"
          />
          <motion.div
            animate={{ y: [0, -6, 0], x: [0, 2, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute inset-0 bg-blue-50/60 border border-blue-200 rounded-lg transform translate-x-2 translate-y-2 shadow-sm"
          />
        </div>
      </div>
    )
  },
  {
    stepNum: '03',
    title: 'Upload Creative',
    icon: Upload,
    timing: 'Day 1 // Pre-flight',
    description: 'Upload brand design assets for instant pre-flight AI checks.',
    illustration: (
      <div className="relative w-full h-24 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-glowing-grid opacity-[0.02] pointer-events-none" />
        <div className="border border-dashed border-slate-300 rounded-xl p-3 flex items-center justify-center w-12 h-12 bg-white relative">
          <motion.div
            animate={{ y: [3, -3, 3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-blue-600"
          >
            <Upload size={18} strokeWidth={2} />
          </motion.div>
        </div>
      </div>
    )
  },
  {
    stepNum: '04',
    title: 'Local Production',
    icon: Printer,
    timing: 'Day 2 // Dispatch',
    description: 'Print campaigns at regional facilities and dispatch local installers.',
    illustration: (
      <div className="relative w-full h-24 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-glowing-grid opacity-[0.02] pointer-events-none" />
        <div className="flex flex-col items-center justify-center relative w-12 h-12 border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden p-1.5">
          <Printer size={16} className="text-slate-400 mb-0.5" />
          <motion.div
            animate={{ height: [0, 14, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-8 bg-blue-600/10 border-t border-blue-600 rounded-b"
          />
        </div>
      </div>
    )
  },
  {
    stepNum: '05',
    title: 'Physical Setup',
    icon: ShieldCheck,
    timing: 'Day 2 // Active',
    description: 'Installers deploy placements and log GPS-verified proofs.',
    illustration: (
      <div className="relative w-full h-24 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-glowing-grid opacity-[0.02] pointer-events-none" />
        <div className="relative w-12 h-12 border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden flex items-center justify-center">
          <ShieldCheck size={20} className="text-blue-600 relative z-10" />
          <motion.div
            animate={{ y: [-18, 18, -18] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-0 right-0 h-0.5 bg-blue-600 shadow-[0_0_8px_#2563eb]"
          />
        </div>
      </div>
    )
  },
  {
    stepNum: '06',
    title: 'Live Dashboard',
    icon: BarChart,
    timing: 'Day 3 // Monitor',
    description: 'View live performance metrics and active store photos in real time.',
    illustration: (
      <div className="relative w-full h-24 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-glowing-grid opacity-[0.02] pointer-events-none" />
        <div className="flex items-end gap-1.5 h-10 w-12 pt-2">
          <motion.div
            animate={{ height: [12, 28, 12] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.1, ease: 'easeInOut' }}
            className="w-2.5 bg-slate-200 rounded-t-sm"
          />
          <motion.div
            animate={{ height: [20, 36, 20] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3, ease: 'easeInOut' }}
            className="w-2.5 bg-blue-600/80 rounded-t-sm shadow-[0_0_8px_rgba(37,99,235,0.2)]"
          />
          <motion.div
            animate={{ height: [8, 20, 8] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5, ease: 'easeInOut' }}
            className="w-2.5 bg-slate-300 rounded-t-sm"
          />
        </div>
      </div>
    )
  }
];

export default function CampaignJourney() {
  return (
    <section id="journey" className="relative py-32 bg-white overflow-hidden border-t border-slate-200">
      {/* Background neon grids */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-glowing-grid opacity-[0.02] pointer-events-none" />

      <div className="container-full relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-blue-600/40" />
            <span className="mono text-blue-600 text-[11px] tracking-[0.5em] uppercase font-bold" style={{ fontFamily: 'var(--font-departure)' }}>
              09 // OPERATION PROTOCOL
            </span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-bold text-slate-900 tracking-tighter leading-tight uppercase mb-6">
            The Campaign <br />
            <span className="italic font-serif text-slate-900 text-glow">Deployment Journey.</span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed font-light max-w-xl">
            From digital strategy brief to audited storefront setups in under 48 hours. Here is our automated launch lifecycle.
          </p>
        </div>

        {/* 6-Step Horizontal Timeline Grid */}
        <div className="relative w-full">
          {/* Horizontal connecting line behind cards */}
          <div className="absolute top-[108px] left-[8%] right-[8%] h-[1px] bg-slate-200 z-0 pointer-events-none hidden lg:block" />

          {/* Timeline Wrapper - scrollable on mobile, grid on desktop */}
          <div className="flex flex-row overflow-x-auto gap-6 pb-6 snap-x snap-mandatory lg:grid lg:grid-cols-6 lg:gap-6 lg:overflow-x-visible lg:pb-0 scrollbar-none">
            {STEPS.map((step, i) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.stepNum}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="relative shrink-0 w-[80vw] sm:w-[280px] lg:w-auto snap-center group z-10 flex flex-col h-full"
                >
                  {/* Step Illustration */}
                  <div className="mb-6 relative z-10 shrink-0">
                    {step.illustration}
                    {/* Blinking pin on top of illustration box */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:border-blue-600 group-hover:bg-blue-50/10 transition-colors duration-300">
                      <Icon size={12} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </div>

                  {/* Step Card Body */}
                  <div className="bg-slate-50/60 border border-slate-200/60 rounded-[20px] p-6 flex flex-col justify-between flex-grow hover:border-blue-600/20 hover:bg-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.02)] transition-all duration-500">
                    <div>
                      {/* Step Timing & Info */}
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-bold text-blue-600/30 group-hover:text-blue-600 transition-colors duration-500 mono">
                          {step.stepNum}
                        </span>
                        <span className="text-[9px] mono text-slate-400 uppercase tracking-wider font-semibold">
                          {step.timing}
                        </span>
                      </div>

                      {/* Step Title */}
                      <h3 className="text-md font-bold text-slate-800 tracking-tight uppercase mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {step.title}
                      </h3>

                      {/* Step Description */}
                      <p className="text-xs text-slate-500 leading-relaxed font-light">
                        {step.description}
                      </p>
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
}
