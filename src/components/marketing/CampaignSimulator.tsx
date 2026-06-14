'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { Calculator, BarChart3, TrendingUp, Globe, Users, ShoppingBag, Zap, Clock, MapPin } from 'lucide-react';

const CITIES = [
  { name: 'Mumbai', baseNodes: 1400, multiplier: 1.2 },
  { name: 'Delhi', baseNodes: 1200, multiplier: 1.1 },
  { name: 'Bangalore', baseNodes: 950, multiplier: 1.3 },
  { name: 'Kolkata', baseNodes: 800, multiplier: 0.95 },
];

const CATEGORIES = [
  { id: 'all', label: 'All Retail', reach: 1.0 },
  { id: 'kirana', label: 'Kirana', reach: 0.8 },
  { id: 'pharmacy', label: 'Pharmacy', reach: 0.4 },
  { id: 'electronics', label: 'Electronics', reach: 0.2 },
];

// Helper to animate numbers dynamically
function AnimatedNumber({ value, isFloat = false, suffix = '' }: { value: number, isFloat?: boolean, suffix?: string }) {
  const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  
  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  const display = useTransform(spring, (current) => 
    isFloat ? current.toFixed(1) + suffix : Math.round(current).toLocaleString() + suffix
  );

  return <motion.span>{display}</motion.span>;
}

const CampaignSimulator = () => {
  const [budget, setBudget] = useState(250000);
  const [city, setCity] = useState(CITIES[0]);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [duration, setDuration] = useState(30);

  const stats = useMemo(() => {
    const nodes = Math.floor((budget / (12 * duration)) * city.multiplier * category.reach);
    const impressions = nodes * 450 * duration;
    const reach = Math.floor(impressions * 0.42);
    
    return { nodes, impressions, reach };
  }, [budget, city, category, duration]);

  return (
    <div className="relative w-full min-h-[850px] bg-obsidian border border-amber/30 rounded-[16px] overflow-hidden shadow-[0_0_80px_rgba(201,115,32,0.15)] group transition-shadow duration-700 hover:shadow-[0_0_120px_rgba(201,115,32,0.25)]">
      {/* Background Cinematic Video */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/estimate.png" 
          alt="Campaign Reach Projection"
          className="w-full h-full object-cover opacity-20 grayscale brightness-[0.3] contrast-[1.2]"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-obsidian/95 via-obsidian/80 to-obsidian/95 opacity-90" />
      </div>

      <div className="container-full relative z-10 p-8 lg:p-16 h-full flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* Left Column: Input Panel */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-12">
          {/* Header */}
          <div className="mb-16">
            <span className="mono text-amber text-[11px] mb-4 block tracking-[0.5em] uppercase" style={{ fontFamily: 'var(--font-departure)' }}>05 // CAMPAIGN SIMULATOR</span>
            <h2 className="text-6xl lg:text-[80px] font-bold text-dirty-white tracking-tighter leading-[0.9] mb-8">
              ESTIMATE YOUR <br />
              <span className="text-amber italic font-serif">NETWORK REACH.</span>
            </h2>
            <p className="text-white/40 font-light text-lg max-w-md leading-relaxed">
              Model your deployment scale and audience impact across our verified retail network. Adjust parameters to see real-time projections.
            </p>
          </div>

          <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-8 rounded-[14px] space-y-10">
            {/* Budget Slider */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-[11px] font-medium text-white/40 uppercase tracking-widest">Monthly Budget</label>
                <span className="text-2xl font-bold text-amber italic font-serif">
                  â‚¹<AnimatedNumber value={budget / 1000} suffix="K" />
                </span>
              </div>
              <input 
                type="range" min="50000" max="2500000" step="50000"
                value={budget} onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber hover:accent-amber-400 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* City Selection */}
              <div>
                <label className="text-[11px] font-medium text-white/40 uppercase tracking-widest mb-3 block">Target Region</label>
                <select 
                  value={city.name}
                  onChange={(e) => setCity(CITIES.find(c => c.name === e.target.value) || CITIES[0])}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white/70 focus:border-amber/50 outline-none transition-colors"
                >
                  {CITIES.map(c => <option key={c.name} value={c.name} className="bg-obsidian">{c.name}</option>)}
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="text-[11px] font-medium text-white/40 uppercase tracking-widest mb-3 block">Duration (Days)</label>
                <select 
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white/70 focus:border-amber/50 outline-none transition-colors"
                >
                  {[7, 14, 30, 60, 90].map(d => <option key={d} value={d} className="bg-obsidian">{d} Days</option>)}
                </select>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-[11px] font-medium text-white/40 uppercase tracking-widest mb-4 block">Node Categories</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-tighter transition-all duration-300 border ${
                      category.id === cat.id 
                        ? 'bg-amber border-amber text-obsidian shadow-[0_0_15px_rgba(201,115,32,0.3)]' 
                        : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visualization Panel */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Dynamic Map Simulation */}
          <div className="relative h-[300px] lg:h-[400px] bg-white/[0.02] border border-white/5 rounded-[14px] overflow-hidden mb-8">
            <div className="absolute inset-0 glowing-grid opacity-10" />
            
            {/* Expansion Nodes */}
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatePresence mode="popLayout">
                <motion.div 
                  key={`${budget}-${city.name}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative"
                >
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-64 h-64 border border-amber/20 rounded-full bg-amber/[0.02] flex items-center justify-center"
                  >
                     <div className="w-32 h-32 border border-amber/40 rounded-full bg-amber/[0.05] flex items-center justify-center">
                        <MapPin size={24} className="text-amber" />
                     </div>
                  </motion.div>
                  
                  {/* Floating Particle Nodes */}
                  {Array.from({ length: Math.min(20, Math.floor(stats.nodes / 100)) }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{ 
                        top: `${20 + Math.random() * 60}%`, 
                        left: `${20 + Math.random() * 60}%` 
                      }}
                      className="absolute w-1.5 h-1.5 bg-amber rounded-full shadow-[0_0_8px_#C97320]"
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Tactical Readout */}
            <div className="absolute bottom-6 right-6 flex flex-col gap-2 text-right">
              <span className="text-[10px] mono text-white/30 uppercase tracking-widest">Projection_Lock</span>
              <span className="text-xs text-dirty-white mono font-bold">GRID_VERSION_2.0.4</span>
            </div>
          </div>

          {/* Result Cards - Now Animated */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Network Nodes', val: stats.nodes, icon: Zap, isFloat: false },
              { label: 'Est. Impressions', val: stats.impressions / 1000000, suffix: 'M', icon: TrendingUp, isFloat: true },
              { label: 'Unique Reach', val: stats.reach / 1000, suffix: 'K', icon: Users, isFloat: false },
            ].map((res, i) => (
              <div key={i} className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-6 rounded-xl group hover:border-amber/30 hover:bg-white/[0.05] hover:-translate-y-[2px] transition-all duration-500 cursor-default">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-amber/10 flex items-center justify-center group-hover:bg-amber/20 transition-colors">
                    <res.icon size={14} className="text-amber" />
                  </div>
                  <span className="text-[9px] font-bold text-white/40 group-hover:text-amber/80 transition-colors uppercase tracking-widest">{res.label}</span>
                </div>
                <div className="text-3xl font-bold text-dirty-white tracking-tight mono">
                  <AnimatedNumber value={res.val} isFloat={res.isFloat} suffix={res.suffix} />
                </div>
              </div>
            ))}
          </div>

          {/* Performance Graph (Simplified) */}
          <div className="mt-6 bg-white/[0.02] border border-white/5 rounded-xl p-6 relative overflow-hidden">
             <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                   <BarChart3 size={14} className="text-amber" />
                   <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Growth Projection</span>
                </div>
                <span className="text-[10px] text-signal-green mono">ACCURACY 94.2%</span>
             </div>
             <div className="h-16 flex items-end gap-1.5">
                {Array.from({ length: 32 }).map((_, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 4 }}
                    animate={{ height: `${20 + Math.random() * 80}%` }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: i * 0.05 }}
                    className="flex-grow bg-amber/20 rounded-t-[1px]"
                  />
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignSimulator;
