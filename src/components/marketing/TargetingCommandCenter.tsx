'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, MapPin, Zap, Shield, Search, Filter, Crosshair, Activity, Globe, Database } from 'lucide-react';

const CATEGORIES = [
  { id: 'convenience', label: 'Convenience Chains', color: '#FFB000', icon: Database },
  { id: 'grocery', label: 'Grocery Stores', color: '#2563EB', icon: Activity },
  { id: 'pharmacy', label: 'Pharmacies', color: '#0D9488', icon: Globe },
  { id: 'cafe', label: 'Coffee Shops', color: '#F43F5E', icon: Zap },
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
  const [activeFilters, setActiveFilters] = useState<string[]>(['convenience', 'grocery']);
  const [radius, setRadius] = useState(40);
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
    <div className="relative w-full min-h-[850px] bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm group/map">
      {/* Map Background grid */}
      <div className="absolute inset-0 z-0 bg-slate-50">
        <div className="absolute inset-0 glowing-grid opacity-[0.03]" />
        
        {/* Radar Sweep Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-blue-500/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-blue-500/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] border border-blue-500/5 rounded-full" />
          
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-blue-500/[0.04] to-transparent rounded-full opacity-60 origin-center"
          />
        </div>
      </div>

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
                zIndex: 40 
              } : {}}
              style={{ 
                left: node.x, 
                top: node.y,
                borderColor: color,
                backgroundColor: node.active ? color : 'transparent'
              }}
              className="absolute w-2 h-2 rounded-full border cursor-pointer pointer-events-auto flex items-center justify-center group/node"
            >
              {isCategoryActive && (
                <div 
                  style={{ backgroundColor: color }}
                  className="absolute inset-0 rounded-full animate-ping opacity-25 group-hover/node:animate-none" 
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Control Center Panel (Left Overlay) */}
      <div className="absolute top-8 left-8 z-30 w-[360px] flex flex-col gap-6 max-w-[calc(100vw-4rem)]">
        <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-md backdrop-blur-md">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
             <div>
                <span className="text-[10px] mono text-blue-600 font-bold uppercase tracking-widest block mb-1">Targeting_Console</span>
                <h3 className="text-xl font-bold tracking-tight text-slate-900 uppercase">Interactive Filter</h3>
             </div>
             <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-200">
                <Filter size={14} className="text-slate-500" />
             </div>
          </div>

          <div className="space-y-8">
            
            {/* Filter buttons */}
            <div>
              <label className="text-[11px] font-medium text-slate-400 uppercase tracking-widest block mb-4">Location Class</label>
              <div className="flex flex-col gap-2.5">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeFilters.includes(cat.id);

                  return (
                    <button
                      key={cat.id}
                      onClick={() => toggleFilter(cat.id)}
                      className={`group relative w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300 text-left ${
                        isActive 
                          ? 'bg-slate-50 border-slate-300 text-slate-900 shadow-sm' 
                          : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 relative z-10">
                        <div 
                          style={{ 
                            backgroundColor: isActive ? cat.color : 'rgba(15,23,42,0.05)',
                            color: isActive ? '#FFFFFF' : 'rgba(15,23,42,0.4)'
                          }}
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300"
                        >
                          <Icon size={14} />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wide">{cat.label}</span>
                      </div>
                      
                      <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
                        isActive ? 'bg-blue-600 shadow-[0_0_8px_#2563EB]' : 'bg-slate-200'
                      }`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Radius Control */}
            <div className="pt-8 border-t border-slate-100">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <label className="text-[11px] font-medium text-slate-400 uppercase tracking-[0.2em] block mb-1">Target Radius</label>
                  <span className="text-[10px] mono text-slate-400 uppercase">Effective_Reach_Km</span>
                </div>
                <span className="text-xl font-bold text-blue-600 italic font-serif tracking-tighter">{radius}KM</span>
              </div>
              <div className="relative">
                <input 
                  type="range" 
                  min="5" 
                  max="100" 
                  value={radius}
                  onChange={(e) => setRadius(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between mt-3 text-[9px] mono text-slate-400">
                  <span>LOC_005</span>
                  <span>REG_040</span>
                  <span>MAX_100</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Intelligence Feed */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse shadow-[0_0_10px_#2563EB]" />
           </div>
           <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <Database size={14} className="text-blue-600" />
                 <span className="mono text-[10px] text-slate-400 uppercase tracking-widest">Active_Inventory_Sync</span>
              </div>
              <div className="text-2xl font-bold text-slate-900 tracking-tighter mono">
                {(nodes.filter(n => activeFilters.includes(n.category)).length * 6).toLocaleString()} <span className="text-xs text-slate-400 ml-1">LOCATIONS_IDENTIFIED</span>
              </div>
              <div className="h-[2px] bg-slate-100 w-full rounded-full overflow-hidden">
                 <motion.div 
                   animate={{ width: ['0%', '100%'] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                   className="h-full bg-blue-600"
                 />
              </div>
           </div>
        </div>
      </div>

      {/* Tactical Data HUD (Bottom Right) */}
      <div className="absolute bottom-8 right-8 z-30 hidden lg:block">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 p-4 rounded-xl min-w-[180px] shadow-sm">
            <div className="mono text-[9px] text-slate-400 uppercase mb-2">Geo_Sync_Status</div>
            <div className="flex items-center justify-between">
               <span className="text-slate-800 font-bold text-xs mono">GRID_SYNC_CA</span>
               <span className="text-[10px] text-blue-600 mono font-bold">OK</span>
            </div>
          </div>
          <div className="bg-white border border-slate-200 p-4 rounded-xl min-w-[180px] shadow-sm">
            <div className="mono text-[9px] text-slate-400 uppercase mb-2">Deployment_Auth</div>
            <div className="flex items-center justify-between">
               <span className="text-slate-800 font-bold text-xs mono">SECURE_SSL_V2</span>
               <Shield size={12} className="text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Coordinate Labels (Randomly Appearing) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute top-[20%] right-[30%] text-[8px] mono text-blue-600">43.6532 N // -79.3832 W</div>
         <div className="absolute bottom-[25%] left-[25%] text-[8px] mono text-blue-600">49.2827 N // -123.1207 W</div>
         <div className="absolute top-[40%] left-[15%] text-[8px] mono text-blue-600">45.5017 N // -73.5673 W</div>
      </div>
    </div>
  );
};

export default TargetingCommandCenter;
