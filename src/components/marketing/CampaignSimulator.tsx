'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { Calculator, BarChart3, TrendingUp, Globe, Users, ShoppingBag, Zap, Clock, MapPin } from 'lucide-react';

const CITIES = [
  { name: 'Greater Toronto Area', baseNodes: 650, multiplier: 1.35 },
  { name: 'Metro Vancouver', baseNodes: 450, multiplier: 1.25 },
  { name: 'Greater Montreal', baseNodes: 400, multiplier: 1.15 },
  { name: 'Calgary-Edmonton Corridor', baseNodes: 350, multiplier: 1.1 },
];

const CATEGORIES = [
  { id: 'all', label: 'All Retail', reach: 1.0 },
  { id: 'convenience', label: 'Convenience Stores', reach: 0.85 },
  { id: 'grocery', label: 'Grocery Stores', reach: 0.75 },
  { id: 'pharmacy', label: 'Pharmacies', reach: 0.5 },
  { id: 'cafe', label: 'Coffee Shops', reach: 0.4 },
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
  const [budget, setBudget] = useState(15000);
  const [city, setCity] = useState(CITIES[0]);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [duration, setDuration] = useState(30);

  const stats = useMemo(() => {
    // Calculated based on a standard CAD CPM / placement rate
    const nodes = Math.floor((budget / (1.5 * duration)) * city.multiplier * category.reach);
    const impressions = nodes * 450 * duration;
    const reach = Math.floor(impressions * 0.42);
    
    return { nodes: Math.max(5, nodes), impressions, reach };
  }, [budget, city, category, duration]);

  return (
    <div className="relative w-full min-h-[850px] bg-white border border-slate-200 rounded-[16px] overflow-hidden shadow-sm group transition-shadow duration-700 hover:shadow-md">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 bg-slate-50/30">
        <div className="absolute inset-0 glowing-grid opacity-[0.03]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-white via-transparent to-white opacity-90" />
      </div>

      <div className="container-full relative z-10 p-8 lg:p-16 h-full flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* Left Column: Input Panel */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-12">
          {/* Header */}
          <div className="mb-8">
            <span className="mono text-blue-600 text-[11px] mb-4 block tracking-[0.5em] uppercase font-bold" style={{ fontFamily: 'var(--font-departure)' }}>05 // CAMPAIGN SIMULATOR</span>
            <h2 className="text-5xl lg:text-6xl font-bold text-slate-900 tracking-tighter leading-[0.95] mb-8">
              ESTIMATE YOUR <br />
              <span className="text-blue-600 italic font-serif">NETWORK REACH.</span>
            </h2>
            <p className="text-slate-500 font-light text-lg max-w-md leading-relaxed">
              Model your deployment scale and audience impact across our verified Canadian retail network. Adjust parameters to see real-time projections.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-8 rounded-[14px] space-y-10 shadow-sm">
            {/* Budget Slider */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">Monthly Budget</label>
                <span className="text-2xl font-bold text-blue-600 italic font-serif">
                  $<AnimatedNumber value={budget} /> CAD
                </span>
              </div>
              <input 
                type="range" min="1500" max="100000" step="500"
                value={budget} onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* City Selection */}
              <div>
                <label className="text-[11px] font-medium text-slate-500 uppercase tracking-widest mb-3 block">Target Region</label>
                <select 
                  value={city.name}
                  onChange={(e) => setCity(CITIES.find(c => c.name === e.target.value) || CITIES[0])}
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm text-slate-700 focus:border-blue-500 outline-none transition-colors appearance-none cursor-pointer"
                >
                  {CITIES.map(c => <option key={c.name} value={c.name} className="bg-white text-slate-800">{c.name}</option>)}
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="text-[11px] font-medium text-slate-500 uppercase tracking-widest mb-3 block">Duration (Days)</label>
                <select 
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm text-slate-700 focus:border-blue-500 outline-none transition-colors appearance-none cursor-pointer"
                >
                  {[7, 14, 30, 60, 90].map(d => <option key={d} value={d} className="bg-white text-slate-800">{d} Days</option>)}
                </select>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-[11px] font-medium text-slate-500 uppercase tracking-widest mb-4 block">Node Categories</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-tighter transition-all duration-300 border ${
                      category.id === cat.id 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-sm' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
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
          <div className="relative h-[300px] lg:h-[400px] bg-slate-50 border border-slate-200/60 rounded-[14px] overflow-hidden mb-8 shadow-inner">
            <div className="absolute inset-0 glowing-grid opacity-[0.02]" />
            
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
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-64 h-64 border border-blue-600/10 rounded-full bg-blue-600/[0.01] flex items-center justify-center"
                  >
                     <div className="w-32 h-32 border border-blue-600/20 rounded-full bg-blue-600/[0.03] flex items-center justify-center">
                        <MapPin size={24} className="text-blue-600" />
                     </div>
                  </motion.div>
                  
                  {/* Floating Particle Nodes */}
                  {Array.from({ length: Math.min(25, Math.floor(stats.nodes / 4)) }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{ 
                        top: `${20 + Math.random() * 60}%`, 
                        left: `${20 + Math.random() * 60}%` 
                      }}
                      className="absolute w-1.5 h-1.5 bg-blue-600 rounded-full shadow-[0_0_8px_#2563EB]"
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Tactical Readout */}
            <div className="absolute bottom-6 right-6 flex flex-col gap-1 text-right">
              <span className="text-[10px] mono text-slate-400 uppercase tracking-widest">Projection_Lock</span>
              <span className="text-xs text-slate-700 mono font-bold">GRID_VERSION_3.1.2</span>
            </div>
          </div>

          {/* Result Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Network Locations', val: stats.nodes, icon: Zap, isFloat: false },
              { label: 'Est. Impressions', val: stats.impressions / 1000000, suffix: 'M', icon: TrendingUp, isFloat: true },
              { label: 'Unique Reach', val: stats.reach / 1000, suffix: 'K', icon: Users, isFloat: false },
            ].map((res, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 p-6 rounded-xl group hover:border-blue-500/50 hover:bg-white hover:-translate-y-[2px] transition-all duration-500 cursor-default shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <res.icon size={14} className="text-blue-600" />
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 group-hover:text-blue-600 transition-colors uppercase tracking-widest">{res.label}</span>
                </div>
                <div className="text-3xl font-bold text-slate-950 tracking-tight mono">
                  <AnimatedNumber value={res.val} isFloat={res.isFloat} suffix={res.suffix} />
                </div>
              </div>
            ))}
          </div>

          {/* Performance Graph (Simplified) */}
          <div className="mt-6 bg-slate-50 border border-slate-200/60 rounded-xl p-6 relative overflow-hidden shadow-sm">
             <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                   <BarChart3 size={14} className="text-blue-600" />
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Growth Projection</span>
                </div>
                <span className="text-[10px] text-blue-600 font-bold mono">ACCURACY 98.4%</span>
             </div>
             <div className="h-16 flex items-end gap-1.5">
                {Array.from({ length: 32 }).map((_, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 4 }}
                    animate={{ height: `${20 + Math.random() * 80}%` }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: i * 0.05 }}
                    className="flex-grow bg-blue-600/10 rounded-t-[2px]"
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
