'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, MapPin, Zap, Shield, Search, Filter, Crosshair, Activity, Globe, Database } from 'lucide-react';

const CATEGORIES = [
  { id: 'kirana', label: 'Kirana Stores', color: '#C97320', icon: Database },
  { id: 'pharmacy', label: 'Pharmacies', color: '#00FF85', icon: Activity },
  { id: 'tea', label: 'Tea Stalls', color: '#3B82F6', icon: Globe },
  { id: 'electronics', label: 'Electronics', color: '#F43F5E', icon: Zap },
];

// Generate random nodes for a more "populated" feel
const generateNodes = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: 20 + Math.random() * 60 + '%',
    y: 20 + Math.random() * 60 + '%',
    category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)].id,
    active: Math.random() > 0.3,
  }));
};

const TargetingCommandCenter = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>(['kirana', 'pharmacy']);
  const [radius, setRadius] = useState(80);
  const [isScanning, setIsScanning] = useState(false);
  const [scanPulse, setScanPulse] = useState(0);

  // Memoize nodes to prevent re-renders on radius/filter change unless they actually change
  const nodes = useMemo(() => generateNodes(120), []);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanPulse(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const toggleFilter = (id: string) => {
    setActiveFilters(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
    triggerScan();
  };

  const triggerScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 1200);
  };

  return (
    <div className="relative w-full min-h-[850px] bg-obsidian border border-white/10 rounded-3xl overflow-hidden shadow-2xl group/map">
      {/* Cinematic Map Background */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover opacity-30 grayscale brightness-[0.3] contrast-[1.4]"
        >
          <source src="/videos/target-2.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian opacity-90" />
        
        {/* Radar Sweep Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-amber/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-amber/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] border border-amber/5 rounded-full" />
          
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-amber/10 to-transparent rounded-full opacity-20 origin-center"
          />
        </div>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 glowing-grid opacity-[0.15] z-0" />

      {/* Intelligent Node Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {nodes.map((node) => {
          const isCategoryActive = activeFilters.includes(node.category);
          const color = CATEGORIES.find(c => c.id === node.category)?.color;

          return (
            <motion.div
              key={node.id}
              initial={false}
              animate={{ 
                opacity: isCategoryActive ? 1 : 0.05,
                scale: isCategoryActive ? 1 : 0.5,
              }}
              whileHover={isCategoryActive ? { 
                scale: 2.5, 
                zIndex: 50,
                transition: { duration: 0.2 }
              } : {}}
              style={{ left: node.x, top: node.y }}
              className={`absolute w-1.5 h-1.5 rounded-full cursor-crosshair ${isCategoryActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
            >
              <div 
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: color, boxShadow: isCategoryActive ? `0 0 10px ${color}` : 'none' }}
              />
              
              {isCategoryActive && (
                <motion.div 
                  animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: color }}
                />
              )}
            </motion.div>
          );
        })}

        {/* Central Targeting Crosshair */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{ width: radius * 3, height: radius * 3 }}
            className="border border-amber/40 rounded-full bg-amber/[0.03] backdrop-blur-[1px] relative flex items-center justify-center"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-2">
              <span className="mono text-[10px] text-amber tracking-widest uppercase bg-obsidian/80 px-2 py-0.5 rounded border border-amber/20">Radius_Active</span>
            </div>
            
            {/* Tactical Crosshair Lines */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 w-px h-4 bg-amber/60 -translate-x-1/2" />
              <div className="absolute bottom-0 left-1/2 w-px h-4 bg-amber/60 -translate-x-1/2" />
              <div className="absolute left-0 top-1/2 h-px w-4 bg-amber/60 -translate-y-1/2" />
              <div className="absolute right-0 top-1/2 h-px w-4 bg-amber/60 -translate-y-1/2" />
            </div>

            <div className="w-1.5 h-1.5 bg-amber rounded-full shadow-[0_0_15px_#C97320]" />
          </motion.div>
        </div>

        {/* Scan Bar Animation */}
        <AnimatePresence>
          {isScanning && (
            <motion.div 
              initial={{ left: '-10%' }}
              animate={{ left: '110%' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute top-0 bottom-0 w-[100px] bg-gradient-to-r from-transparent via-amber/20 to-transparent skew-x-12 z-20 pointer-events-none"
            >
               <div className="w-[1px] h-full bg-amber/40 ml-[50px]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Control Center Sidebar */}
      <div className="absolute top-8 left-8 z-30 w-full max-w-[340px] space-y-4">
        <div className="bg-obsidian/80 backdrop-blur-3xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber/10 border border-amber/20 flex items-center justify-center">
                <Crosshair className="text-amber" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-dirty-white tracking-tight uppercase">Node Targeting</h3>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-signal-green animate-pulse" />
                  <span className="mono text-[9px] text-white/40 uppercase tracking-widest">System_Online</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Category Filters */}
            <div>
              <label className="text-[11px] font-medium text-white/40 uppercase tracking-[0.2em] mb-6 block">Store Type Selection</label>
              <div className="grid grid-cols-1 gap-3">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => toggleFilter(cat.id)}
                    className={`relative flex items-center justify-between p-4 rounded-xl border transition-all duration-300 hover:-translate-y-[2px] ${
                      activeFilters.includes(cat.id) 
                        ? 'border-amber/40 bg-amber/5 shadow-[inset_0_0_20px_rgba(201,115,32,0.1)]' 
                        : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <cat.icon size={16} className={activeFilters.includes(cat.id) ? 'text-amber' : 'text-white/20'} />
                      <span className="text-[12px] font-medium tracking-wide uppercase">{cat.label}</span>
                    </div>
                    
                    <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
                      activeFilters.includes(cat.id) ? 'bg-amber shadow-[0_0_8px_#C97320]' : 'bg-white/10'
                    }`} />

                    {/* Hover Glow */}
                    <div className="absolute inset-0 rounded-xl bg-amber opacity-0 group-hover:opacity-[0.03] transition-opacity pointer-events-none" />
                  </button>
                ))}
              </div>
            </div>

            {/* Radius Control */}
            <div className="pt-8 border-t border-white/10">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <label className="text-[11px] font-medium text-white/40 uppercase tracking-[0.2em] block mb-1">Target Radius</label>
                  <span className="text-[10px] mono text-white/20 uppercase">Effective_Reach_Km</span>
                </div>
                <span className="text-xl font-bold text-amber italic font-serif tracking-tighter">{radius}KM</span>
              </div>
              <div className="relative">
                <input 
                  type="range" 
                  min="20" 
                  max="200" 
                  value={radius}
                  onChange={(e) => setRadius(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber"
                />
                {/* Tactical Slider Marks */}
                <div className="flex justify-between mt-3 text-[9px] mono text-white/20">
                  <span>LOC_020</span>
                  <span>REG_100</span>
                  <span>MAX_200</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Intelligence Feed */}
        <div className="bg-obsidian/80 backdrop-blur-3xl border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4">
              <div className="w-1.5 h-1.5 rounded-full bg-signal-green animate-pulse shadow-[0_0_10px_#10B981]" />
           </div>
           <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <Database size={14} className="text-amber/60" />
                 <span className="mono text-[10px] text-white/40 uppercase tracking-widest">Active_Inventory_Sync</span>
              </div>
              <div className="text-2xl font-bold text-dirty-white tracking-tighter mono">
                {(nodes.filter(n => activeFilters.includes(n.category)).length * 12).toLocaleString()} <span className="text-xs text-white/30 ml-1">NODES_IDENTIFIED</span>
              </div>
              <div className="h-[2px] bg-white/5 w-full rounded-full overflow-hidden">
                 <motion.div 
                   animate={{ width: ['0%', '100%'] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                   className="h-full bg-amber/40"
                 />
              </div>
           </div>
        </div>
      </div>

      {/* Tactical Data HUD (Bottom Right) */}
      <div className="absolute bottom-8 right-8 z-30 hidden lg:block">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-obsidian/60 backdrop-blur-3xl border border-white/10 p-4 rounded-xl min-w-[180px]">
            <div className="mono text-[9px] text-white/30 uppercase mb-2">Geo_Sync_Status</div>
            <div className="flex items-center justify-between">
               <span className="text-dirty-white font-bold text-xs mono">GRID_SYNC_09</span>
               <span className="text-[10px] text-signal-green mono font-bold">OK</span>
            </div>
          </div>
          <div className="bg-obsidian/60 backdrop-blur-3xl border border-white/10 p-4 rounded-xl min-w-[180px]">
            <div className="mono text-[9px] text-white/30 uppercase mb-2">Deployment_Auth</div>
            <div className="flex items-center justify-between">
               <span className="text-dirty-white font-bold text-xs mono">RSA_SECURE_V4</span>
               <Shield size={12} className="text-amber" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Coordinate Labels (Randomly Appearing) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute top-[20%] right-[30%] text-[8px] mono text-amber">19.0760 N // 72.8777 E</div>
         <div className="absolute bottom-[25%] left-[25%] text-[8px] mono text-amber">28.6139 N // 77.2090 E</div>
         <div className="absolute top-[40%] left-[15%] text-[8px] mono text-amber">12.9716 N // 77.5946 E</div>
      </div>
    </div>
  );
};

export default TargetingCommandCenter;
