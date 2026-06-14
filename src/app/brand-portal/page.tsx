'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import { motion } from 'framer-motion';
import { Shield, Zap, Target, Activity, BarChart, MapPin, ArrowRight, Check, Lock } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

export default function BrandPortalPage() {
  return (
    <div className="min-h-screen bg-obsidian text-dirty-white">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-obsidian pt-32 pb-24">
        <div className="absolute inset-0 glowing-grid opacity-[0.06] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-obsidian pointer-events-none" />
        <div className="container-full relative z-10">
          <motion.div {...fadeUp}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-amber/40" />
              <span className="mono text-amber text-[11px] tracking-[0.5em] uppercase">01 // BRAND PORTAL</span>
            </div>
            <h1 className="text-6xl lg:text-[clamp(64px,9vw,110px)] font-bold tracking-tighter leading-[0.9] text-dirty-white mb-10 uppercase">
              Your Command<br />Center for<br />
              <span className="italic font-serif text-amber">Retail Media.</span>
            </h1>
            <p className="text-xl text-white/50 max-w-2xl font-light leading-[1.9] mb-12">
              Launch, monitor, and verify physical advertising campaigns across 50,000+ retail stores — all from a single dashboard built for precision and accountability.
            </p>
            <div className="flex flex-wrap gap-5">
              <Link href="/login" className="btn-molten px-8 h-[56px] flex items-center gap-3">
                Launch Campaign <ArrowRight size={16} />
              </Link>
              <Link href="#features" className="btn-ghost px-8 h-[56px] flex items-center">
                Explore Features
              </Link>
            </div>
          </motion.div>
        </div>
        {/* Live indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="absolute bottom-16 right-[8%] hidden lg:flex items-center gap-3 px-5 py-3 bg-signal-green/5 border border-signal-green/20 rounded-full">
          <div className="w-2 h-2 rounded-full bg-signal-green animate-pulse" />
          <span className="text-[11px] mono text-signal-green/70 uppercase tracking-widest">Portal Live · 128 Campaigns Active</span>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="relative py-32 bg-obsidian border-t border-white/5" style={{ scrollMarginTop: '80px' }}>
        <div className="container-full">
          <motion.div {...fadeUp} className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-amber/40" />
              <span className="mono text-amber text-[11px] tracking-[0.5em] uppercase">02 // FEATURES</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-dirty-white tracking-tighter uppercase">
              Built for <span className="italic font-serif text-amber">Precision.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Target, title: 'Surgical Targeting', desc: 'Filter 50,000+ stores by pin code, footfall tier, store type, and demographic proximity. Deploy to exactly the right nodes.', tag: 'AI-Powered' },
              { icon: MapPin, title: 'Live Map Dashboard', desc: 'See every active node in real time. Track deployment progress, view proof uploads, and monitor campaign health from a single view.', tag: 'Real-Time' },
              { icon: Shield, title: 'Verified Proof Feed', desc: 'Every placement generates GPS-stamped, AI-verified photographic proof — stored on blockchain. Zero dispute risk.', tag: 'Blockchain-Sealed' },
              { icon: BarChart, title: 'ROI Analytics', desc: 'Track impressions, reach, and cost-per-store against your campaign benchmarks. Export detailed reports anytime.', tag: 'Live Data' },
              { icon: Zap, title: '48hr Deployment', desc: 'From campaign approval to live in-store — under 48 hours. Ground agents execute with military precision.', tag: 'Guaranteed' },
              { icon: Lock, title: 'Secure & Compliant', desc: 'All campaigns are screened for legal compliance before activation. Your brand is always protected.', tag: 'Enterprise-Grade' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.6 }}
                className="p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] group hover:border-amber/20 hover:bg-amber/[0.03] transition-all duration-300">
                <div className="flex items-start justify-between mb-6">
                  <item.icon size={22} className="text-amber/50 group-hover:text-amber transition-colors" />
                  <span className="text-[9px] mono text-amber/40 uppercase tracking-widest border border-amber/20 px-2 py-1 rounded-full">{item.tag}</span>
                </div>
                <h3 className="text-lg font-bold text-dirty-white mb-3 tracking-tight">{item.title}</h3>
                <p className="text-sm text-white/40 font-light leading-[1.8]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Campaign Workflow */}
      <section className="relative py-32 bg-obsidian border-t border-white/5">
        <div className="container-full">
          <motion.div {...fadeUp} className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-amber/40" />
              <span className="mono text-amber text-[11px] tracking-[0.5em] uppercase">03 // WORKFLOW</span>
            </div>
            <h2 className="text-5xl font-bold text-dirty-white tracking-tighter uppercase">
              From Brief to <span className="italic font-serif text-amber">Live.</span>
            </h2>
          </motion.div>
          <div className="flex flex-col divide-y divide-white/[0.05]">
            {[
              { step: '01', title: 'Select', desc: 'Define your target geography, store type, and budget. Our system suggests optimal node clusters based on your campaign goals.' },
              { step: '02', title: 'Deploy', desc: 'Ground agents receive tasking within 2 hours. Installations complete in under 48 hours across all selected nodes.' },
              { step: '03', title: 'Monitor', desc: 'Track every node in real time. View photo proofs, GPS data, and campaign compliance from your brand portal dashboard.' },
              { step: '04', title: 'Report', desc: 'Download comprehensive campaign reports: verified reach, cost-per-node, proof gallery, and ROI analysis.' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="py-10 flex flex-col lg:flex-row gap-10 items-start group">
                <div className="text-[80px] font-black text-amber/10 leading-none tracking-tighter mono shrink-0 group-hover:text-amber/20 transition-colors w-24">{item.step}</div>
                <div className="flex-grow border-l border-white/5 pl-10">
                  <h3 className="text-2xl font-bold text-dirty-white tracking-tight mb-3 uppercase">{item.title}</h3>
                  <p className="text-base text-white/40 font-light leading-[1.8] max-w-xl">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 bg-obsidian border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,115,32,0.06),transparent_70%)]" />
        <div className="container-full relative z-10 text-center">
          <motion.div {...fadeUp}>
            <span className="mono text-amber text-[11px] tracking-[0.5em] uppercase mb-6 block">04 // LAUNCH</span>
            <h2 className="text-5xl lg:text-7xl font-bold text-dirty-white tracking-tighter uppercase mb-8">
              Ready to Deploy?<br /><span className="italic font-serif text-amber">Start Today.</span>
            </h2>
            <p className="text-lg text-white/40 max-w-lg mx-auto mb-12 font-light">
              Your first campaign can be live in under 48 hours. No long contracts. No minimum spend.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <Link href="/login" className="btn-molten px-10 h-[56px] inline-flex items-center gap-3">
                Launch Campaign <ArrowRight size={16} />
              </Link>
              <Link href="/#pilot" className="btn-ghost px-8 h-[56px] inline-flex items-center">
                Request Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
