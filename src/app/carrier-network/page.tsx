'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import { motion } from 'framer-motion';
import { MapPin, Zap, Shield, Check, ArrowRight, Store, IndianRupee, Camera, Wifi } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

export default function CarrierNetworkPage() {
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
              <span className="mono text-amber text-[11px] tracking-[0.5em] uppercase">01 // CARRIER NETWORK</span>
            </div>
            <h1 className="text-6xl lg:text-[clamp(64px,9vw,120px)] font-bold tracking-tighter leading-[0.9] text-dirty-white mb-10 uppercase">
              Your Store.<br />
              <span className="italic font-serif text-amber">Our Network.</span><br />
              Your Earnings.
            </h1>
            <p className="text-xl text-white/50 max-w-2xl font-light leading-[1.9] mb-12">
              Register your kirana, pharmacy, or tea stall as a verified AdMesh node. Earn passive income by hosting brand displays — zero upfront cost, zero hassle.
            </p>
            <div className="flex flex-wrap gap-5">
              <Link href="/login" className="btn-molten px-8 h-[56px] flex items-center gap-3">
                Register Your Store <ArrowRight size={16} />
              </Link>
              <Link href="#how-it-works" className="btn-ghost px-8 h-[56px] flex items-center">
                How It Works
              </Link>
            </div>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="absolute bottom-16 right-[8%] hidden lg:block">
          <div className="px-6 py-5 bg-amber/10 border border-amber/30 rounded-2xl">
            <div className="text-[10px] mono text-amber/60 uppercase tracking-widest mb-1">Avg Monthly Earning</div>
            <div className="text-3xl font-bold text-amber mono">₹4,200</div>
            <div className="text-[10px] text-white/30 mono mt-1">Per registered node</div>
          </div>
        </motion.div>
      </section>

      {/* Benefits */}
      <section className="relative py-32 bg-obsidian border-t border-white/5">
        <div className="container-full">
          <motion.div {...fadeUp} className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-amber/40" />
              <span className="mono text-amber text-[11px] tracking-[0.5em] uppercase">02 // BENEFITS</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-dirty-white tracking-tighter uppercase">
              Why Join <span className="italic font-serif text-amber">AdMesh?</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: IndianRupee, title: 'Passive Income', desc: 'Earn ₹3,000–₹6,000 per month per display. No selling. No effort. Just space on your wall.', accent: 'border-amber/20 bg-amber/5', iconColor: 'text-amber' },
              { icon: Shield, title: 'Verified & Safe', desc: 'Every campaign is brand-safe, legally compliant, and verified by AI before going live in your store.', accent: 'border-signal-green/20 bg-signal-green/[0.03]', iconColor: 'text-signal-green' },
              { icon: Zap, title: 'Instant Payouts', desc: 'Earnings processed weekly. Direct UPI transfer to your account — zero delays, zero paperwork.', accent: 'border-white/10 bg-white/[0.02]', iconColor: 'text-amber' },
              { icon: Wifi, title: 'Zero Tech Burden', desc: 'Our ground team handles installation and maintenance. You do nothing except earn.', accent: 'border-white/10 bg-white/[0.02]', iconColor: 'text-amber' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className={`p-8 rounded-2xl border ${item.accent} group hover:-translate-y-1 transition-transform duration-300`}>
                <item.icon size={24} className={`${item.iconColor} mb-6 opacity-70 group-hover:opacity-100 transition-opacity`} />
                <h3 className="text-lg font-bold text-dirty-white mb-3 tracking-tight">{item.title}</h3>
                <p className="text-sm text-white/40 font-light leading-[1.8]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative py-32 bg-obsidian border-t border-white/5" style={{ scrollMarginTop: '80px' }}>
        <div className="container-full">
          <motion.div {...fadeUp} className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-amber/40" />
              <span className="mono text-amber text-[11px] tracking-[0.5em] uppercase">03 // PROCESS</span>
            </div>
            <h2 className="text-5xl font-bold text-dirty-white tracking-tighter uppercase">
              Three Steps to <span className="italic font-serif text-amber">Earning.</span>
            </h2>
          </motion.div>
          <div className="flex flex-col divide-y divide-white/[0.05]">
            {[
              { step: '01', icon: Store, label: 'APPLY', title: 'Register Your Store', desc: 'Fill out the quick form with your store details. Our team verifies your location within 48 hours and confirms eligibility.' },
              { step: '02', icon: Camera, label: 'INSTALL', title: 'We Handle Installation', desc: 'Our ground agents visit, install the display, and GPS-tag your node. Takes under 2 hours. You don\'t lift a finger.' },
              { step: '03', icon: IndianRupee, label: 'EARN', title: 'Collect Weekly Payouts', desc: 'Earn every week. Track your earnings in real time. Payouts directly to your UPI — no delays.' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="py-12 flex flex-col lg:flex-row gap-10 items-start group">
                <div className="text-[100px] font-black text-amber/10 leading-none tracking-tighter mono shrink-0 group-hover:text-amber/20 transition-colors w-32">{item.step}</div>
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <item.icon size={14} className="text-amber/50" />
                    <span className="text-[10px] mono text-amber/50 uppercase tracking-[0.4em]">{item.label}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-dirty-white tracking-tight mb-3">{item.title}</h3>
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
            <span className="mono text-amber text-[11px] tracking-[0.5em] uppercase mb-6 block">04 // START EARNING</span>
            <h2 className="text-5xl lg:text-7xl font-bold text-dirty-white tracking-tighter uppercase mb-8">
              New Revenue.<br /><span className="italic font-serif text-amber">Zero Effort.</span>
            </h2>
            <p className="text-lg text-white/40 max-w-lg mx-auto mb-12 font-light">
              Join 14,000+ store owners already earning with AdMesh. Registration is free. Earnings start within 7 days.
            </p>
            <Link href="/login" className="btn-molten px-10 h-[56px] inline-flex items-center gap-3">
              Register Your Store <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
