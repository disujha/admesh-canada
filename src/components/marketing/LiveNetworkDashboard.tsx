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
  { id: 1, type: 'VERIFICATION', location: 'Mumbai North', time: 'Just now', status: 'SUCCESS' },
  { id: 2, type: 'DEPLOYMENT', location: 'Delhi Metro Grid', time: '2m ago', status: 'ACTIVE' },
  { id: 3, type: 'SYNC', location: 'Bangalore Tech Park', time: '5m ago', status: 'OK' },
  { id: 4, type: 'AUDIT', location: 'Kolkata Retail Hub', time: '12m ago', status: 'COMPLETE' },
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
    <div ref={containerRef} className="relative w-full min-h-[900px] bg-obsidian border border-white/10 rounded-[16px] overflow-hidden shadow-3xl">
      {/* Background - Network Pulse Video */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover opacity-30 grayscale brightness-[0.3] contrast-[1.4]"
        >
          <source src="/videos/admesh-network.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-tr from-obsidian via-transparent to-obsidian opacity-90" />
        <div className="absolute inset-0 glowing-grid opacity-[0.1]" />
      </div>

      <div className="container-full relative z-10 p-12 lg:p-16 flex flex-col lg:grid lg:grid-cols-12 gap-12">
        {/* Left Column: Metrics & Alerts */}
        <div className="lg:col-span-4 space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-signal-green animate-pulse shadow-[0_0_10px_#10B981]" />
              <span className="mono text-amber text-[11px] tracking-[0.5em] uppercase" style={{ fontFamily: 'var(--font-departure)' }}>11 // LIVE TELEMETRY</span>
            </div>
            <h2 className="text-4xl font-bold text-dirty-white tracking-tighter mb-10">
              OPERATIONAL <br />
              <span className="text-amber italic font-serif">DASHBOARD.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {METRICS.map((metric, i) => (
              <div key={metric.label} className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-7 rounded-xl group hover:border-amber/30 hover:-translate-y-[2px] transition-all duration-500 cursor-default">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber/10 border border-amber/20 flex items-center justify-center">
                    <metric.icon size={18} className="text-amber" />
                  </div>
                  <span className="text-[10px] font-medium text-white/30 uppercase tracking-widest">{metric.label}</span>
                </div>
                <div className="text-3xl font-bold text-dirty-white mono">
                  {counts[i].toLocaleString(undefined, { maximumFractionDigits: 1 })}{metric.suffix}
                </div>
              </div>
            ))}
          </div>

          {/* Real-time Activity Feed */}
          <div className="bg-obsidian/60 backdrop-blur-2xl border border-white/10 rounded-xl p-7">
             <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Protocol Feed</span>
                <Clock size={14} className="text-white/20" />
             </div>
             <div className="space-y-4">
                {RECENT_ALERTS.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-amber mono uppercase tracking-tighter">{alert.type}</span>
                      <span className="text-xs text-white/60 font-medium">{alert.location}</span>
                    </div>
                    <div className="text-right">
                       <span className="text-[8px] text-signal-green mono block mb-1">{alert.status}</span>
                       <span className="text-[9px] text-white/20 mono">{alert.time}</span>
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
               className="absolute top-20 right-40 w-32 aspect-video bg-white/5 border border-white/20 rounded-lg p-1 backdrop-blur-md"
             >
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200')] bg-cover grayscale opacity-60 rounded" />
                <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                   <div className="w-1 h-1 rounded-full bg-signal-green" />
                   <span className="text-[7px] text-dirty-white mono uppercase">MUM_G12</span>
                </div>
             </motion.div>

             <motion.div 
               animate={{ y: [0, -15, 0], opacity: [0, 1, 0] }}
               transition={{ duration: 6, repeat: Infinity, delay: 2.5 }}
               className="absolute bottom-40 right-20 w-32 aspect-video bg-white/5 border border-white/20 rounded-lg p-1 backdrop-blur-md"
             >
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=200')] bg-cover grayscale opacity-60 rounded" />
                <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                   <div className="w-1 h-1 rounded-full bg-signal-green" />
                   <span className="text-[7px] text-dirty-white mono uppercase">DEL_N04</span>
                </div>
             </motion.div>
          </div>

          {/* Heatmap Overlay (Faked with glowing radial gradients) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
             <div className="relative w-full h-full">
                <div className="absolute top-[30%] left-[45%] w-32 h-32 bg-amber/20 blur-[60px] rounded-full animate-pulse" />
                <div className="absolute top-[65%] left-[35%] w-48 h-48 bg-amber/10 blur-[80px] rounded-full animate-pulse" />
                <div className="absolute top-[75%] left-[42%] w-24 h-24 bg-signal-green/10 blur-[50px] rounded-full animate-pulse" />
                <div className="absolute top-[45%] left-[75%] w-24 h-24 bg-amber/15 blur-[60px] rounded-full animate-pulse" />
             </div>
          </div>

          {/* Tactical Overlay Elements */}
          <div className="absolute top-0 right-0 p-8 border-r border-t border-white/10 rounded-tr-3xl hidden lg:block">
             <div className="flex flex-col gap-7">
                <div className="flex flex-col items-end">
                   <span className="text-[9px] text-white/30 mono uppercase">Audit_Lock</span>
                   <span className="text-xs text-dirty-white mono">CONNECTED_RSA</span>
                </div>
                <div className="flex flex-col items-end">
                   <span className="text-[9px] text-white/30 mono uppercase">Grid_Load</span>
                   <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden mt-2">
                      <div className="w-[78%] h-full bg-amber" />
                   </div>
                </div>
             </div>
          </div>
          
          <div className="absolute bottom-0 left-0 p-8 border-l border-b border-white/10 rounded-bl-3xl hidden lg:block">
             <div className="mono text-[10px] text-white/30 uppercase tracking-widest flex items-center gap-4">
                <span>TX_FEED // 0.2s</span>
                <div className="flex gap-1">
                   {[1,2,3,4,5].map(i => (
                     <motion.div 
                       key={i}
                       animate={{ height: [4, 12, 4] }}
                       transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                       className="w-[2px] bg-amber/40"
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
