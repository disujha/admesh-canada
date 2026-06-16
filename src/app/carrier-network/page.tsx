'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import { motion } from 'framer-motion';
import { MapPin, Zap, Shield, Check, ArrowRight, Store, DollarSign, Camera, Wifi } from 'lucide-react';

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
        <div className="absolute inset-0 glowing-grid opacity-[0.03] pointer-events-none" />
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
            <p className="text-xl text-slate-500 max-w-2xl font-light leading-[1.9] mb-12">
              Register your convenience store, pharmacy, or neighborhood market as a verified AdMesh node. Earn passive income by hosting brand displays — zero upfront cost, zero hassle.
            </p>
            <div className="flex flex-wrap gap-5">
              <Link href="/login" className="btn-molten px-8 h-[56px] flex items-center gap-3 text-obsidian font-bold">
                Register Your Store <ArrowRight size={16} />
              </Link>
              <Link href="#how-it-works" className="btn-ghost px-8 h-[56px] flex items-center text-slate-700 hover:text-slate-900 border-slate-200 hover:bg-slate-50">
                How It Works
              </Link>
            </div>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="absolute bottom-16 right-[8%] hidden lg:block">
          <div className="px-6 py-5 bg-amber/5 border border-amber/20 rounded-2xl shadow-sm">
            <div className="text-[10px] mono text-slate-500 uppercase tracking-widest mb-1">Avg Monthly Earning</div>
            <div className="text-3xl font-bold text-amber mono">$150 – $350</div>
            <div className="text-[10px] text-slate-400 mono mt-1">Per registered display node</div>
          </div>
        </motion.div>
      </section>

      {/* Benefits */}
      <section className="relative py-32 bg-slate-50 border-t border-slate-200/80">
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
              { icon: DollarSign, title: 'Passive Income', desc: 'Earn $150–$350 monthly per display. Simply dedicate prime wall or window space with zero sales effort.' },
              { icon: Shield, title: 'Verified & Safe', desc: 'Every campaign is brand-safe, compliant, and verified before going live in your store.' },
              { icon: Zap, title: 'Instant Payouts', desc: 'Receive weekly earnings processed directly via Direct Deposit with zero delays or paperwork.' },
              { icon: Wifi, title: 'Zero Tech Burden', desc: 'Our team handles complete installation and setup. You do nothing except collect earnings.' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="p-8 rounded-[24px] border border-slate-200 bg-white group hover:border-blue-600/30 hover:bg-slate-50/50 hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.035)] transition-all duration-500 flex flex-col justify-between h-full shadow-sm">
                <div className="mb-6 shrink-0">
                  <item.icon size={48} strokeWidth={1.5} className="text-slate-600 group-hover:text-blue-600 transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-dirty-white mb-3 tracking-tight">{item.title}</h3>
                <p className="text-sm text-slate-500 font-light leading-relaxed flex-grow line-clamp-2">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative py-32 bg-obsidian border-t border-slate-200/80" style={{ scrollMarginTop: '80px' }}>
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
          <div className="flex flex-col divide-y divide-slate-100">
            {[
              { step: '01', icon: Store, label: 'APPLY', title: 'Register Your Store', desc: 'Fill out the quick form with your retail details. Our regional team verifies your location within 48 hours and confirms eligibility.' },
              { step: '02', icon: Camera, label: 'INSTALL', title: 'We Handle Installation', desc: 'Our field agents visit, set up the smart display, and geo-tag your node. Takes under 2 hours. You do not lift a finger.' },
              { step: '03', icon: DollarSign, label: 'EARN', title: 'Collect Weekly Payouts', desc: 'Earn every single week. Track your display performance in real time. Payouts are made directly via Direct Deposit.' },
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
                  <p className="text-base text-slate-500 font-light leading-[1.8] max-w-xl">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 bg-slate-50 border-t border-slate-200/80 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,115,32,0.04),transparent_70%)]" />
        <div className="container-full relative z-10 text-center">
          <motion.div {...fadeUp}>
            <span className="mono text-amber text-[11px] tracking-[0.5em] uppercase mb-6 block">04 // START EARNING</span>
            <h2 className="text-5xl lg:text-7xl font-bold text-dirty-white tracking-tighter uppercase mb-8">
              New Revenue.<br /><span className="italic font-serif text-amber">Zero Effort.</span>
            </h2>
            <p className="text-lg text-slate-500 max-w-lg mx-auto mb-12 font-light">
              Join 12,000+ retail owners already earning with AdMesh. Registration is completely free. Earnings start within 7 days.
            </p>
            <Link href="/login" className="btn-molten px-10 h-[56px] inline-flex items-center gap-3 text-obsidian font-bold">
              Register Your Store <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
