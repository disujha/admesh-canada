'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Map, ShieldCheck, Globe, Clock, Zap, Store, Camera, MapPin } from 'lucide-react';

const METRICS = [
  { label: 'Stores Activated Today', val: 128, icon: Store, suffix: '' },
  { label: 'Proof Uploads', val: 14201, icon: Camera, suffix: '+' },
  { label: 'Cities Active', val: 42, icon: MapPin, suffix: '' },
  { label: 'Verification Accuracy', val: 99.8, icon: ShieldCheck, suffix: '%' },
];

const RECENT_ALERTS = [
  { id: 1, type: 'VERIFICATION', location: 'GTA West (Convenience)', time: 'Just now', status: 'SUCCESS' },
  { id: 2, type: 'DEPLOYMENT', location: 'Robson Street (Cafe)', time: '2m ago', status: 'ACTIVE' },
  { id: 3, type: 'SYNC', location: 'Waterloo Hub (Pharmacy)', time: '5m ago', status: 'OK' },
  { id: 4, type: 'AUDIT', location: 'Montreal Downtown (Grocery)', time: '12m ago', status: 'COMPLETE' },
];

import { useInView } from 'framer-motion';

const LiveNetworkDashboard = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [counts, setCounts] = useState(METRICS.map(m => 0));

  useEffect(() => {
    if (!isInView) return;

    const intervals = METRICS.map((m, i) => {
      const step = m.val / 100;
      return setInterval(() => {
        setCounts(prev => {
          const next = [...prev];
          if (next[i] < m.val) {
            next[i] = Math.min(m.val, next[i] + step);
          }
          return next;
        });
      }, 30);
    });
    return () => intervals.forEach(clearInterval);
  }, [isInView]);

  return (
    <div ref={containerRef} className="relative w-full min-h-[900px] bg-white border border-slate-200 rounded-[16px] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-700">
      {/* Background - Network Pulse Video */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover opacity-[0.08] grayscale brightness-[1.1]"
        >
          <source src="/videos/admesh-network.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-tr from-white via-transparent to-white opacity-95" />
        <div className="absolute inset-0 glowing-grid opacity-[0.03]" />
      </div>

      <div className="container-full relative z-10 p-12 lg:p-16 flex flex-col lg:grid lg:grid-cols-12 gap-12">
        {/* Left Column: Metrics & Alerts */}
        <div className="lg:col-span-4 space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
              <span className="mono text-blue-600 text-[11px] tracking-[0.5em] uppercase font-bold" style={{ fontFamily: 'var(--font-departure)' }}>11 // LIVE TELEMETRY</span>
            </div>
            <h2 className="text-4xl font-bold text-slate-900 tracking-tighter mb-10">
              OPERATIONAL <br />
              <span className="text-slate-900 italic font-serif">DASHBOARD.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {METRICS.map((metric, i) => (
              <div key={metric.label} className="bg-slate-50/80 backdrop-blur-3xl border border-slate-200 p-7 rounded-xl group hover:border-blue-600/30 hover:-translate-y-[2px] transition-all duration-500 cursor-default shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <metric.icon size={18} className="text-blue-600" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{metric.label}</span>
                </div>
                <div className="text-3xl font-bold text-slate-800 mono">
                  {counts[i].toLocaleString(undefined, { maximumFractionDigits: 1 })}{metric.suffix}
                </div>
              </div>
            ))}
          </div>

          {/* Real-time Activity Feed */}
          <div className="bg-white/90 backdrop-blur-2xl border border-slate-200 rounded-xl p-7 shadow-sm">
             <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Protocol Feed</span>
                <Clock size={14} className="text-slate-400" />
             </div>
             <div className="space-y-4">
                {RECENT_ALERTS.map((alert) => (
                   <div key={alert.id} className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-blue-600 mono uppercase tracking-tighter font-bold">{alert.type}</span>
                      <span className="text-xs text-slate-700 font-medium">{alert.location}</span>
                    </div>
                    <div className="text-right">
                       <span className="text-[8px] text-blue-600 mono block mb-1 font-bold">{alert.status}</span>
                       <span className="text-[9px] text-slate-400 mono">{alert.time}</span>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Center/Right: Network Heatmap Visualization */}
        <div className="lg:col-span-8 relative min-h-[500px]">
          {/* Floating Proof Thumbnails */}
          <div className="absolute inset-0 z-20 pointer-events-none">
             <motion.div 
               animate={{ y: [0, -20, 0], opacity: [0, 1, 0] }}
               transition={{ duration: 5, repeat: Infinity, delay: 0 }}
               className="absolute top-20 right-40 w-32 aspect-video bg-white border border-slate-200 rounded-lg p-1 shadow-sm backdrop-blur-md"
             >
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200')] bg-cover grayscale opacity-60 rounded" />
                <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                   <span className="text-[7px] text-slate-700 mono font-bold uppercase">GTA_W08</span>
                </div>
             </motion.div>

             <motion.div 
               animate={{ y: [0, -15, 0], opacity: [0, 1, 0] }}
               transition={{ duration: 6, repeat: Infinity, delay: 2.5 }}
               className="absolute bottom-40 right-20 w-32 aspect-video bg-white border border-slate-200 rounded-lg p-1 shadow-sm backdrop-blur-md"
             >
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=200')] bg-cover grayscale opacity-60 rounded" />
                <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                   <span className="text-[7px] text-slate-700 mono font-bold uppercase">YVR_C04</span>
                </div>
             </motion.div>
          </div>

          {/* Heatmap Overlay (Faked with glowing radial gradients) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
             <div className="relative w-full h-full">
                <div className="absolute top-[30%] left-[45%] w-32 h-32 bg-blue-600/10 blur-[60px] rounded-full animate-pulse" />
                <div className="absolute top-[65%] left-[35%] w-48 h-48 bg-blue-600/5 blur-[80px] rounded-full animate-pulse" />
                <div className="absolute top-[75%] left-[42%] w-24 h-24 bg-blue-600/10 blur-[50px] rounded-full animate-pulse" />
                <div className="absolute top-[45%] left-[75%] w-24 h-24 bg-blue-600/5 blur-[60px] rounded-full animate-pulse" />
             </div>
          </div>

          {/* Tactical Overlay Elements */}
          <div className="absolute top-0 right-0 p-8 border-r border-t border-slate-200 rounded-tr-3xl hidden lg:block">
             <div className="flex flex-col gap-7">
                <div className="flex flex-col items-end">
                   <span className="text-[9px] text-slate-400 mono uppercase">Audit_Lock</span>
                   <span className="text-xs text-slate-700 mono">CONNECTED_RSA</span>
                </div>
                <div className="flex flex-col items-end">
                   <span className="text-[9px] text-slate-400 mono uppercase">Grid_Load</span>
                   <div className="w-24 h-1 bg-slate-100 rounded-full overflow-hidden mt-2">
                      <div className="w-[78%] h-full bg-blue-600" />
                   </div>
                </div>
             </div>
          </div>
          
          <div className="absolute bottom-0 left-0 p-8 border-l border-b border-slate-200 rounded-bl-3xl hidden lg:block">
             <div className="mono text-[10px] text-slate-400 uppercase tracking-widest flex items-center gap-4">
                <span>TX_FEED // 0.2s</span>
                <div className="flex gap-1">
                   {[1,2,3,4,5].map(i => (
                     <motion.div 
                       key={i}
                       animate={{ height: [4, 12, 4] }}
                       transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                       className="w-[2px] bg-blue-600/40"
                     />
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveNetworkDashboard;
