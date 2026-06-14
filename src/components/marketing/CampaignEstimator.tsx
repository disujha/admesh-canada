'use client';

import React, { useState, useMemo } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Cpu, ShieldCheck, ArrowRight } from 'lucide-react';

// Reusable Animated Number Component
function AnimatedNumber({ value, isFloat = false, suffix = '', prefix = '' }: { value: number; isFloat?: boolean; suffix?: string; prefix?: string }) {
  const spring = useSpring(value, { mass: 0.5, stiffness: 100, damping: 18 });

  React.useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  const display = useTransform(spring, (current) => {
    if (isFloat) {
      return prefix + current.toFixed(1) + suffix;
    }
    return prefix + Math.round(current).toLocaleString() + suffix;
  });

  return <motion.span>{display}</motion.span>;
}

// Data Definitions
const FORMATS = [
  { id: 'counter-sticker', label: 'A4 Counter Sticker', scale: 1.0, repeat: 2.8, imageUrl: '/images/admesh-counter-sticker.png', visibility: '8.2/10' },
  { id: 'countertop-display', label: 'Countertop Display', scale: 1.4, repeat: 3.5, imageUrl: '/images/admesh-countertop-display.png', visibility: '8.6/10' },
  { id: 'dangler', label: 'Hanging Dangler', scale: 1.2, repeat: 4.1, imageUrl: '/images/admesh-dangler.png', visibility: '8.4/10' },
  { id: 'shelf-branding', label: 'Shelf Branding', scale: 1.8, repeat: 4.8, imageUrl: '/images/admesh-shelf-branding.png', visibility: '8.9/10' },
  { id: 'wall-poster', label: 'Wall Poster', scale: 1.6, repeat: 5.5, imageUrl: '/images/admesh-wall-poster.png', visibility: '8.7/10' },
  { id: 'flex-banner', label: 'Flex Banner', scale: 2.2, repeat: 3.2, imageUrl: '/images/admesh-flex-banner.png', visibility: '9.1/10' },
];

const RETAIL_TYPES = [
  { id: 'kirana', label: 'Kirana Store', weight: 1.0, peak: '8 AM - 12 PM & 6 PM - 9 PM' },
  { id: 'paan_shop', label: 'Paan Shop', weight: 0.9, peak: '12 PM - 3 PM & 7 PM - 10 PM' },
  { id: 'cafe', label: 'Cafe', weight: 1.5, peak: '4 PM - 9 PM' },
  { id: 'pharmacy', label: 'Pharmacy', weight: 1.2, peak: '10 AM - 1 PM & 5 PM - 8 PM' },
  { id: 'tea_stall', label: 'Tea Stall', weight: 0.85, peak: '8 AM - 11 AM & 4 PM - 7 PM' }
];

const CampaignEstimator = () => {
  // Teaser Preview States
  const [selectedFormat, setSelectedFormat] = useState(FORMATS[0]);
  const [selectedRetail, setSelectedRetail] = useState(RETAIL_TYPES[0]);
  const [footfallInput, setFootfallInput] = useState(250000); // 250k

  // Home Page quick stats calculation
  const calculatedTeaserStats = useMemo(() => {
    const reach = Math.round(footfallInput * 0.68);
    const storeCount = Math.max(5, Math.round(footfallInput / 22000));
    const frequency = Math.round(selectedFormat.repeat * selectedRetail.weight * 10) / 10;
    return { reach, storeCount, frequency };
  }, [selectedFormat, selectedRetail, footfallInput]);

  return (
    <section id="pricing" className="py-32 bg-obsidian overflow-hidden border-t border-white/[0.05] relative">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="container-full">
        {/* Section Header */}
        <div className="max-w-5xl pt-4 lg:pt-6 mb-24">
          <div className="mono text-amber text-[11px] mb-4 block tracking-[0.5em] uppercase" style={{ fontFamily: 'var(--font-departure)' }}>
            15 // STRATEGIC PLANNER
          </div>
          <h2 className="text-5xl lg:text-7xl font-bold text-dirty-white tracking-tighter uppercase leading-[1.05]">
            Plan Your <br />
            <span className="text-amber italic font-serif text-glow">Campaign Blueprint.</span>
          </h2>
          <p className="text-white/55 font-light text-xl leading-relaxed mt-6 max-w-3xl">
            Tease unique neighborhood reach projections. Unlock the immersive AI Planner to schedule a surgical corporate offline deployment.
          </p>
        </div>

        {/* Quick Preview Estimator Card */}
        <div className="relative w-full bg-white/[0.02] border border-white/10 rounded-[18px] overflow-hidden p-10 lg:p-12 shadow-2xl backdrop-blur-2xl">
          <div className="absolute inset-0 bg-glowing-grid opacity-[0.02] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
            {/* Controls Column */}
            <div className="lg:col-span-7 space-y-10 pr-0 lg:pr-8 border-r-0 lg:border-r border-white/5">
              
              {/* Format selection */}
              <div>
                <label className="text-[11px] mono text-white/45 uppercase tracking-[0.25em] mb-5 block">
                  Choose Advertising Medium
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {FORMATS.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFormat(f)}
                      className={`min-h-[68px] px-5 py-4 rounded-xl border text-sm font-bold uppercase tracking-[0.04em] text-left transition-all duration-300 ${
                        selectedFormat.id === f.id
                          ? 'bg-amber border-amber text-obsidian shadow-[0_0_15px_rgba(201,115,32,0.25)]'
                          : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Environment selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className="text-[11px] mono text-white/45 uppercase tracking-[0.2em] mb-3 block">
                    Target Retail Environment
                  </label>
                  <select
                    value={selectedRetail.id}
                    onChange={(e) => setSelectedRetail(RETAIL_TYPES.find((r) => r.id === e.target.value) || RETAIL_TYPES[0])}
                    className="w-full h-14 bg-[#111114] border border-white/10 rounded-xl px-5 text-sm text-white/85 focus:border-amber/50 outline-none transition-colors appearance-none cursor-pointer"
                  >
                    {RETAIL_TYPES.map((r) => (
                      <option key={r.id} value={r.id} className="bg-obsidian">{r.label}</option>
                    ))}
                  </select>
                </div>

                {/* Footfall volume input */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-[11px] mono text-white/45 uppercase tracking-[0.2em]">
                      Target Monthly Footfall
                    </label>
                    <span className="text-sm font-bold text-amber mono">
                      <AnimatedNumber value={footfallInput / 1000} suffix="K" /> views
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="1000000"
                    step="50000"
                    value={footfallInput}
                    onChange={(e) => setFootfallInput(Number(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber"
                  />
                  <div className="flex justify-between text-[10px] mono text-white/35 mt-3">
                    <span>100K MIN</span>
                    <span>500K MID</span>
                    <span>1.0M MAX</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Instant Telemetry projection */}
            <div className="lg:col-span-5 flex flex-col justify-between pl-0 lg:pl-7 space-y-9">
              <div>
                <span className="text-[10px] mono text-amber uppercase tracking-widest block mb-1">
                  METRIC_PREVIEW_SYS
                </span>
                <h3 className="text-2xl font-bold text-dirty-white uppercase tracking-tight">
                  Surgical Telemetry
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="bg-[#111114]/80 border border-white/5 p-6 rounded-xl">
                  <span className="text-[10px] mono text-white/35 uppercase block mb-2 tracking-[0.18em]">Unique Local Reach</span>
                  <div className="text-2xl font-bold text-dirty-white mono leading-none">
                    <AnimatedNumber value={calculatedTeaserStats.reach / 1000} suffix="K" />
                  </div>
                  <span className="text-[10px] text-white/35 mt-2 block leading-[1.35]">Hyperlocal unique eyes</span>
                </div>

                <div className="bg-[#111114]/80 border border-white/5 p-6 rounded-xl">
                  <span className="text-[10px] mono text-white/35 uppercase block mb-2 tracking-[0.18em]">Active Store Nodes</span>
                  <div className="text-2xl font-bold text-dirty-white mono leading-none">
                    <AnimatedNumber value={calculatedTeaserStats.storeCount} suffix=" stores" />
                  </div>
                  <span className="text-[10px] text-white/35 mt-2 block leading-[1.35]">Neighborhood networks</span>
                </div>

                <div className="bg-[#111114]/80 border border-white/5 p-6 rounded-xl">
                  <span className="text-[10px] mono text-white/35 uppercase block mb-2 tracking-[0.18em]">Avg Visibility Loops</span>
                  <div className="text-2xl font-bold text-dirty-white mono leading-none">
                    <AnimatedNumber value={calculatedTeaserStats.frequency} isFloat={true} suffix="x" />
                  </div>
                  <span className="text-[10px] text-white/35 mt-2 block leading-[1.35]">Exposure loops per month</span>
                </div>

                <div className="bg-[#111114]/80 border border-white/5 p-6 rounded-xl">
                  <span className="text-[10px] mono text-white/35 uppercase block mb-2 tracking-[0.18em]">Target Area Density</span>
                  <div className="text-2xl font-bold text-amber mono leading-none">
                    HIGH
                  </div>
                  <span className="text-[10px] text-white/35 mt-2 block leading-[1.35]">Saturated trade zones</span>
                </div>
              </div>

              {/* Call-to-Actions */}
              <div className="space-y-4">
                <Link
                  href="/login"
                  className="w-full btn-molten h-[60px] flex items-center justify-center gap-3 group tactile-hover hover:scale-[1.01] text-center decoration-none"
                >
                  <Cpu size={16} className="animate-spin-slow text-obsidian" />
                  <span className="text-obsidian font-bold">Initialize AI Platform Planner</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform text-obsidian" />
                </Link>

                <div className="flex items-center justify-center gap-2 mt-4 text-[9px] mono text-white/30 uppercase tracking-widest">
                  <ShieldCheck size={10} className="text-amber animate-pulse" /> Verified programmatic planner console
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CampaignEstimator;
