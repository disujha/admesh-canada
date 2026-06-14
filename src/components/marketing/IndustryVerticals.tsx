'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ShoppingCart, Radio, CreditCard, Utensils, Flag, Store, Box, ChevronRight } from 'lucide-react';

const INDUSTRIES = [
  {
    title: 'FMCG Brands',
    desc: 'Dominate the last mile where purchase decisions happen in real-time.',
    icon: ShoppingCart,
    accent: 'from-amber/20 to-transparent',
    nodes: 140
  },
  {
    title: 'Telecom',
    desc: 'Deep local visibility to drive prepaid recharges and neighborhood awareness.',
    icon: Radio,
    accent: 'from-blue-500/10 to-transparent',
    nodes: 85
  },
  {
    title: 'Fintech Apps',
    desc: 'Scale merchant acquisition and app downloads at the point of commerce.',
    icon: CreditCard,
    accent: 'from-emerald-500/10 to-transparent',
    nodes: 110
  },
  {
    title: 'Food Delivery',
    desc: 'Hyper-local targeting in high-density delivery zones and restaurant hubs.',
    icon: Utensils,
    accent: 'from-orange-500/10 to-transparent',
    nodes: 75
  },
  {
    title: 'Political Campaigns',
    desc: 'Mass-scale visibility across every street corner with verified deployment.',
    icon: Flag,
    accent: 'from-amber/20 to-transparent',
    nodes: 200
  },
  {
    title: 'Local Businesses',
    desc: 'Affordable, high-impact visibility to capture neighborhood footfall.',
    icon: Store,
    accent: 'from-white/10 to-transparent',
    nodes: 60
  },
  {
    title: 'D2C Brands',
    desc: 'Bridge the gap between digital discovery and physical presence.',
    icon: Box,
    accent: 'from-purple-500/10 to-transparent',
    nodes: 90
  }
];

const IndustryCard = ({ ind, i }: { ind: any, i: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative p-10 bg-white/[0.03] border border-white/10 rounded-[16px] overflow-hidden transition-all duration-500 hover:border-amber/30 hover:bg-white/[0.05] hover:-translate-y-[2px] cursor-default flex flex-col h-full light-sweep"
    >
      {/* Card Accent Glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${ind.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      <div className="relative z-10 flex flex-col h-full" style={{ transform: "translateZ(50px)" }}>
        <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-amber/10 group-hover:border-amber/30 transition-all duration-500">
          <ind.icon size={24} className="text-white/30 group-hover:text-amber transition-colors" />
        </div>

        <h3 className="text-2xl font-bold text-dirty-white mb-4 group-hover:text-amber transition-colors">{ind.title}</h3>
        <p className="text-sm text-white/40 leading-[1.7] font-light mb-10 flex-grow">
          {ind.desc}
        </p>

        {/* Mini Network Preview */}
        <div className="pt-8 border-t border-white/5 relative">
          <div className="flex justify-between items-center mb-4">
             <span className="text-[10px] mono text-white/20 uppercase tracking-widest">Network_Nodes</span>
             <span className="text-[10px] mono text-amber font-bold">{ind.nodes}K+</span>
          </div>
          <div className="flex gap-1 h-1 w-full bg-white/5 rounded-full overflow-hidden">
             <motion.div 
               initial={{ width: 0 }}
               whileInView={{ width: '100%' }}
               transition={{ duration: 1.5, delay: 0.5 }}
               className="h-full bg-amber/40"
             />
          </div>
        </div>
      </div>

      {/* Hover Arrow */}
      <div className="absolute top-8 right-8 p-2 rounded-full border border-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
        <ChevronRight size={14} className="text-amber" />
      </div>
    </motion.div>
  );
};

const IndustryVerticals = () => {
  return (
    <section id="verticals" className="py-32 bg-obsidian relative overflow-hidden">
      {/* Background Brand Image Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.05] pointer-events-none">
        <img src="/images/brands.png" alt="" className="w-full h-full object-cover grayscale" />
      </div>

      <div className="container-full relative z-10">
        <div className="max-w-3xl pt-4 lg:pt-6 mb-24">
          <div className="mono text-amber text-[11px] mb-6 block tracking-[0.5em] uppercase" style={{ fontFamily: 'var(--font-departure)' }}>13 // INDUSTRY VERTICALS</div>
          <h2 className="text-5xl lg:text-7xl font-bold text-dirty-white mb-8 tracking-tighter">
            WHO IS THIS <br />
            <span className="text-amber italic font-serif">FOR?</span>
          </h2>
          <p className="text-xl text-white/50 leading-[1.8] font-light max-w-2xl">
            AdMesh is the physical infrastructure layer for India's most ambitious brands, from global FMCG giants to hyper-local neighborhood services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: "1000px" }}>
          {INDUSTRIES.map((ind, i) => (
            <IndustryCard key={ind.title} ind={ind} i={i} />
          ))}
          
          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group relative p-10 bg-amber border border-amber rounded-[16px] overflow-hidden flex flex-col justify-between shadow-2xl shadow-amber/20 hover:-translate-y-[2px] transition-all duration-300"
          >
             <div className="relative z-10">
                <h3 className="text-3xl font-bold text-obsidian tracking-tighter leading-none mb-4">Join the <br />Network.</h3>
                <p className="text-obsidian/70 text-sm font-medium mb-8">Scale your brand's physical footprint across India.</p>
             </div>
             <button className="w-full py-5 bg-obsidian text-amber font-bold text-xs uppercase tracking-widest rounded-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-3 shadow-xl">
                Start Piloting <ChevronRight size={16} />
             </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IndustryVerticals;
