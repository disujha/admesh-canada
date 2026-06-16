'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ShoppingCart, Radio, CreditCard, Utensils, Compass, Store, Box, ChevronRight } from 'lucide-react';

const INDUSTRIES = [
  {
    title: 'CPG Brands',
    desc: 'Dominate the last mile where purchase decisions happen in real time.',
    icon: ShoppingCart,
    accent: 'from-blue-600/10 to-transparent',
    nodes: 140
  },
  {
    title: 'Subscription Apps',
    desc: 'Drive local app installations and boost regional brand awareness.',
    icon: Radio,
    accent: 'from-blue-500/10 to-transparent',
    nodes: 85
  },
  {
    title: 'Fintech & Insurtech',
    desc: 'Scale user acquisition and build local trust at checkout.',
    icon: CreditCard,
    accent: 'from-emerald-600/10 to-transparent',
    nodes: 110
  },
  {
    title: 'QSR & Food Delivery',
    desc: 'Hyper-local targeting in high-density delivery and QSR zones.',
    icon: Utensils,
    accent: 'from-orange-600/10 to-transparent',
    nodes: 75
  },
  {
    title: 'Travel & Automotive',
    desc: 'Deploy high-impact campaigns across transit corridors and hubs.',
    icon: Compass,
    accent: 'from-blue-400/10 to-transparent',
    nodes: 200
  },
  {
    title: 'Neighborhood Services',
    desc: 'Affordable, high-impact visibility capturing municipal footfall.',
    icon: Store,
    accent: 'from-indigo-600/10 to-transparent',
    nodes: 60
  },
  {
    title: 'Direct-to-Consumer (D2C)',
    desc: 'Bridge the gap between digital ads and physical checkout.',
    icon: Box,
    accent: 'from-purple-600/10 to-transparent',
    nodes: 90
  }
];

const IndustryCard = ({ ind, i }: { ind: any, i: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

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
      className="group relative p-8 bg-slate-50 border border-slate-200/80 rounded-[24px] overflow-hidden transition-all duration-500 hover:border-slate-300 hover:bg-white hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.035)] cursor-default flex flex-col h-full light-sweep"
    >
      {/* Card Accent Glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${ind.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      <div className="relative z-10 flex flex-col h-full" style={{ transform: "translateZ(50px)" }}>
        <div className="text-slate-600 group-hover:text-blue-600 transition-colors duration-300 mb-6 shrink-0">
          <ind.icon size={48} strokeWidth={1.5} />
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">{ind.title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed font-light mb-8 flex-grow line-clamp-2">
          {ind.desc}
        </p>

        {/* Mini Network Preview */}
        <div className="pt-6 border-t border-slate-200/60 relative">
          <div className="flex justify-between items-center mb-3">
             <span className="text-[10px] mono text-slate-400 uppercase tracking-widest font-bold">Network_Nodes</span>
             <span className="text-[10px] mono text-blue-600 font-bold">{ind.nodes}K+</span>
          </div>
          <div className="flex gap-1 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
             <motion.div 
               initial={{ width: 0 }}
               whileInView={{ width: '100%' }}
               transition={{ duration: 1.5, delay: 0.5 }}
               className="h-full bg-blue-600/40"
             />
          </div>
        </div>
      </div>

      {/* Hover Arrow */}
      <div className="absolute top-6 right-6 p-2 rounded-full border border-slate-200 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
        <ChevronRight size={14} className="text-blue-600" />
      </div>
    </motion.div>
  );
};

const IndustryVerticals = () => {
  return (
    <section id="verticals" className="py-32 bg-white relative overflow-hidden">
      {/* Background Brand Image Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.02] pointer-events-none">
        <img src="/images/brands.png" alt="" className="w-full h-full object-cover grayscale" />
      </div>

      <div className="container-full relative z-10">
        <div className="max-w-3xl pt-4 lg:pt-6 mb-24">
          <div className="mono text-blue-600 text-[11px] mb-6 block tracking-[0.5em] uppercase font-bold" style={{ fontFamily: 'var(--font-departure)' }}>13 // INDUSTRY VERTICALS</div>
          <h2 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-8 tracking-tighter">
            WHO IS THIS <br />
            <span className="text-blue-600 italic font-serif">FOR?</span>
          </h2>
          <p className="text-xl text-slate-500 leading-[1.8] font-light max-w-2xl">
            AdMesh is the physical infrastructure layer for Canada's most ambitious brands, from enterprise CPG leaders to hyper-local neighborhood service providers.
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
            className="group relative p-8 bg-slate-900 border border-slate-800 rounded-[24px] overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-[0_12px_30px_rgba(0,0,0,0.035)] hover:-translate-y-1.5 transition-all duration-500"
          >
             <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white tracking-tighter leading-none mb-4 uppercase">Join the <br />Network.</h3>
                <p className="text-slate-400 text-sm font-medium mb-8">Scale your brand's physical footprint across Canada.</p>
             </div>
             <button className="w-full py-5 bg-blue-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-3 shadow-sm cursor-pointer">
                Start Piloting <ChevronRight size={16} />
             </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IndustryVerticals;
