'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  MapPin, 
  Activity, 
  BarChart3, 
  Zap,
  Target,
  Eye
} from 'lucide-react';

const RetailAnalytics = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const [activeCity, setActiveCity] = useState(0);

  const cities = [
    { name: 'Mumbai', stores: 4821, campaigns: 34, reach: '2.4M' },
    { name: 'Delhi NCR', stores: 3201, campaigns: 28, reach: '1.8M' },
    { name: 'Bangalore', stores: 2940, campaigns: 25, reach: '1.5M' },
  ];

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setActiveCity((prev) => (prev + 1) % cities.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isInView]);

  return (
    <section ref={sectionRef} id="analytics" className="relative py-32 lg:py-48 bg-obsidian overflow-hidden border-t border-white/[0.05]">
      {/* Cinematic Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep dark base */}
        <div className="absolute inset-0 bg-obsidian" />
        
        {/* Animated grid */}
        <div className="absolute inset-0 glowing-grid opacity-[0.03]" />
        
        {/* Ambient glow - Orange */}
        <motion.div
          className="absolute top-[20%] left-[20%] w-[600px] h-[600px] bg-amber/5 rounded-full blur-[200px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Ambient glow - Blue */}
        <motion.div
          className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[180px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Depth vignette */}
        <div className="depth-vignette" />
      </div>

      <div className="container-full relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-amber/40" />
            <span className="mono text-amber text-[11px] tracking-[0.5em] uppercase" style={{ fontFamily: 'var(--font-departure)' }}>
              05 // INTELLIGENCE TERMINAL
            </span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-bold text-dirty-white tracking-tighter uppercase leading-[1.05] mb-6">
            Real-Time <br />
            <span className="text-amber italic font-serif text-glow">Retail Intelligence.</span>
          </h2>
          <p className="text-lg text-white/50 font-light max-w-2xl leading-relaxed">
            Bloomberg-grade analytics meet Tesla UI. Monitor campaign performance, audience heatmaps, and city-wide targeting with cinematic precision.
          </p>
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column - City Network Visualization */}
          <motion.div
            style={{ y: y1, opacity: opacity1 }}
            className="lg:col-span-8 relative"
          >
            <div className="relative bg-[#0a0a0c] border border-white/[0.08] rounded-3xl overflow-hidden backdrop-blur-xl">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.05]">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber animate-pulse" />
                  <span className="mono text-[10px] text-white/40 uppercase tracking-widest">LIVE_CITY_NETWORK</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="mono text-[9px] text-blue-400/60">DATA_STREAM_ACTIVE</span>
                  <Activity size={12} className="text-blue-400/60" />
                </div>
              </div>

              {/* City Network Visualization */}
              <div className="relative h-[400px] lg:h-[500px] bg-[#08080a]">
                {/* Animated heatmap overlay */}
                <div className="absolute inset-0 opacity-30">
                  <svg className="w-full h-full">
                    <defs>
                      <radialGradient id="heatmapGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgba(201,115,32,0.4)" />
                        <stop offset="50%" stopColor="rgba(59,130,246,0.2)" />
                        <stop offset="100%" stopColor="rgba(59,130,246,0)" />
                      </radialGradient>
                    </defs>
                    <motion.circle
                      cx="50%"
                      cy="50%"
                      r="200"
                      fill="url(#heatmapGrad)"
                      animate={{
                        r: [180, 220, 180],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </svg>
                </div>

                {/* City nodes with connections */}
                <div className="absolute inset-0">
                  {cities.map((city, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        left: `${30 + i * 20}%`,
                        top: `${35 + (i % 2) * 25}%`,
                      }}
                      animate={{
                        scale: activeCity === i ? [1, 1.2, 1] : 1,
                        opacity: activeCity === i ? 1 : 0.5,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Node */}
                      <div className={`w-16 h-16 rounded-full border-2 ${activeCity === i ? 'border-amber' : 'border-white/20'} bg-obsidian/80 backdrop-blur-sm flex items-center justify-center`}>
                        <MapPin size={20} className={activeCity === i ? 'text-amber' : 'text-white/40'} />
                      </div>
                      
                      {/* Pulse ring */}
                      {activeCity === i && (
                        <motion.div
                          className="absolute inset-0 rounded-full border border-amber/30"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.6, 0, 0.6],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      )}
                      
                      {/* City label */}
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <span className={`mono text-[10px] uppercase tracking-wider ${activeCity === i ? 'text-amber' : 'text-white/30'}`}>
                          {city.name}
                        </span>
                      </div>
                    </motion.div>
                  ))}

                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <motion.line
                      x1="30%" y1="35%" x2="50%" y2="60%"
                      stroke="rgba(201,115,32,0.3)"
                      strokeWidth="1"
                      animate={{ opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <motion.line
                      x1="50%" y1="60%" x2="70%" y2="35%"
                      stroke="rgba(59,130,246,0.3)"
                      strokeWidth="1"
                      animate={{ opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    />
                    <motion.line
                      x1="30%" y1="35%" x2="70%" y2="35%"
                      stroke="rgba(201,115,32,0.2)"
                      strokeWidth="1"
                      strokeDasharray="5,5"
                      animate={{ strokeDashoffset: [0, -10] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </svg>
                </div>

                {/* Active city data overlay */}
                <motion.div
                  className="absolute bottom-6 left-6 bg-obsidian/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={activeCity}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 rounded-full bg-amber animate-pulse" />
                    <span className="mono text-[10px] text-amber uppercase tracking-widest">{cities[activeCity].name}_HUB</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <span className="text-[8px] mono text-white/30 uppercase tracking-wider block mb-1">STORES</span>
                      <span className="text-lg font-bold text-white mono">{cities[activeCity].stores}</span>
                    </div>
                    <div>
                      <span className="text-[8px] mono text-white/30 uppercase tracking-wider block mb-1">CAMPAIGNS</span>
                      <span className="text-lg font-bold text-amber mono">{cities[activeCity].campaigns}</span>
                    </div>
                    <div>
                      <span className="text-[8px] mono text-white/30 uppercase tracking-wider block mb-1">REACH</span>
                      <span className="text-lg font-bold text-blue-400 mono">{cities[activeCity].reach}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Floating Data Cards */}
          <motion.div
            style={{ y: y2, opacity: opacity1 }}
            className="lg:col-span-4 space-y-4"
          >
            {/* Performance Metrics Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#0a0a0c] border border-white/[0.08] rounded-2xl p-5 backdrop-blur-xl hover:border-amber/30 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-amber" />
                  <span className="mono text-[10px] text-white/40 uppercase tracking-wider">PERFORMANCE</span>
                </div>
                <span className="mono text-[9px] text-green-400">+24.3%</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Impressions', val: '2.4M', color: 'amber' },
                  { label: 'Engagement', val: '847K', color: 'blue-400' },
                  { label: 'Conversion', val: '3.2%', color: 'green-400' },
                ].map((metric, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-[10px] mono text-white/40 uppercase tracking-wider">{metric.label}</span>
                    <span className={`text-sm font-bold text-${metric.color} mono`}>{metric.val}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Audience Analytics Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-[#0a0a0c] border border-white/[0.08] rounded-2xl p-5 backdrop-blur-xl hover:border-blue-400/30 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-blue-400" />
                  <span className="mono text-[10px] text-white/40 uppercase tracking-wider">AUDIENCE</span>
                </div>
                <span className="mono text-[9px] text-blue-400">LIVE</span>
              </div>
              
              {/* Animated bar chart */}
              <div className="space-y-2">
                {[
                  { label: '18-24', val: 35, color: 'amber' },
                  { label: '25-34', val: 42, color: 'blue-400' },
                  { label: '35-44', val: 18, color: 'purple-400' },
                  { label: '45+', val: 5, color: 'green-400' },
                ].map((segment, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] mono text-white/40 uppercase">{segment.label}</span>
                      <span className="text-[10px] mono text-white/60">{segment.val}%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-${segment.color} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${segment.val}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 + i * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Targeting Simulation Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-[#0a0a0c] border border-white/[0.08] rounded-2xl p-5 backdrop-blur-xl hover:border-green-400/30 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Target size={16} className="text-green-400" />
                  <span className="mono text-[10px] text-white/40 uppercase tracking-wider">TARGETING</span>
                </div>
                <Zap size={12} className="text-green-400 animate-pulse" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-white/[0.02] rounded-lg">
                  <span className="text-[9px] mono text-white/40 uppercase">Postal Code</span>
                  <span className="text-[10px] mono text-white/60">M5V 2H1</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white/[0.02] rounded-lg">
                  <span className="text-[9px] mono text-white/40 uppercase">Radius</span>
                  <span className="text-[10px] mono text-white/60">2.5km</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white/[0.02] rounded-lg">
                  <span className="text-[9px] mono text-white/40 uppercase">Stores</span>
                  <span className="text-[10px] mono text-amber font-bold">127</span>
                </div>
              </div>
            </motion.div>

            {/* Campaign Metrics Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-[#0a0a0c] border border-white/[0.08] rounded-2xl p-5 backdrop-blur-xl hover:border-purple-400/30 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BarChart3 size={16} className="text-purple-400" />
                  <span className="mono text-[10px] text-white/40 uppercase tracking-wider">METRICS</span>
                </div>
                <Eye size={12} className="text-purple-400" />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-white/[0.02] rounded-xl">
                  <span className="text-[8px] mono text-white/30 uppercase tracking-wider block mb-1">CTR</span>
                  <span className="text-lg font-bold text-white mono">4.8%</span>
                </div>
                <div className="text-center p-3 bg-white/[0.02] rounded-xl">
                  <span className="text-[8px] mono text-white/30 uppercase tracking-wider block mb-1">CPM</span>
                  <span className="text-lg font-bold text-amber mono">$2.50</span>
                </div>
                <div className="text-center p-3 bg-white/[0.02] rounded-xl">
                  <span className="text-[8px] mono text-white/30 uppercase tracking-wider block mb-1">ROAS</span>
                  <span className="text-lg font-bold text-blue-400 mono">3.2x</span>
                </div>
                <div className="text-center p-3 bg-white/[0.02] rounded-xl">
                  <span className="text-[8px] mono text-white/30 uppercase tracking-wider block mb-1">LIFT</span>
                  <span className="text-lg font-bold text-green-400 mono">+18%</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RetailAnalytics;
