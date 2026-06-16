'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import { motion } from 'framer-motion';
import { Shield, Zap, Globe, MapPin, Camera, Activity, ArrowRight, Check } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

export default function AboutPage() {
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
              <span className="mono text-amber text-[11px] tracking-[0.5em] uppercase">01 // ABOUT</span>
            </div>
            <h1 className="text-6xl lg:text-[clamp(64px,9vw,120px)] font-bold tracking-tighter leading-[0.9] text-dirty-white mb-10 uppercase">
              Building the Future<br />
              of <span className="italic font-serif text-amber">Physical Media.</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl font-light leading-[1.9] mb-12">
              AdMesh is Canada's premier verified retail media infrastructure — connecting brands to 35,000+ convenience stores, pharmacies, and independent retailers with GPS precision and AI-powered proof of play.
            </p>
            <div className="flex flex-wrap gap-5">
              <Link href="/login" className="btn-molten px-8 h-[56px] flex items-center gap-3 text-obsidian font-bold">
                Join the Network <ArrowRight size={16} />
              </Link>
              <Link href="#mission" className="btn-ghost px-8 h-[56px] flex items-center text-slate-700 hover:text-slate-900 border-slate-200 hover:bg-slate-50">
                Our Mission
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating stat badges */}
        <div className="absolute bottom-12 right-[8%] hidden lg:flex flex-col gap-3">
          {[
            { val: '35,000+', label: 'Retail Nodes' },
            { val: '42', label: 'Municipalities Active' },
            { val: '99.9%', label: 'Verify Rate' },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.15 }}
              className="flex items-center gap-4 px-5 py-3 bg-slate-50 border border-slate-200/60 rounded-xl shadow-sm backdrop-blur-sm"
            >
              <span className="text-xl font-bold text-amber mono">{s.val}</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="relative py-32 bg-slate-50 border-t border-slate-200/80 overflow-hidden" style={{ scrollMarginTop: '80px' }}>
        <div className="container-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div {...fadeUp}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-px bg-amber/40" />
                <span className="mono text-amber text-[11px] tracking-[0.5em] uppercase">02 // MISSION</span>
              </div>
              <h2 className="text-5xl lg:text-6xl font-bold text-dirty-white tracking-tighter leading-[1.0] mb-8 uppercase">
                Verified. Transparent.<br />
                <span className="italic font-serif text-amber">Accountable.</span>
              </h2>
              <p className="text-lg text-slate-600 leading-[1.9] font-light mb-8">
                Traditional out-of-home advertising is broken. Brands pay for placements they cannot verify. Store owners earn less than they deserve. Consumers are bombarded with irrelevant static ads.
              </p>
              <p className="text-lg text-slate-600 leading-[1.9] font-light mb-12">
                AdMesh fixes this by building a verified, transparent, performance-based media layer across Canada's independent retail locations — engineered by our teams in Toronto, Waterloo, Vancouver, and Montreal.
              </p>
              <div className="space-y-4">
                {[
                  'Every placement GPS-tagged at the moment of installation',
                  'AI verification confirms display quality and location accuracy',
                  'Blockchain seals every proof — immutable, auditable forever',
                  'Real-time dashboard gives brands 100% visibility',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border border-amber/30 bg-amber/5 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={11} className="text-amber" />
                    </div>
                    <span className="text-sm text-slate-600 font-light leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: '12,450+', label: 'Active Nodes', icon: Globe, color: 'border-amber-200 bg-amber-50/50' },
                  { val: '99.9%', label: 'Verify Rate', icon: Shield, color: 'border-blue-200 bg-blue-50/50' },
                  { val: '48hrs', label: 'Deploy Time', icon: Zap, color: 'border-slate-200 bg-slate-100/50' },
                  { val: '320+', label: 'Campaigns Done', icon: Activity, color: 'border-amber-200 bg-amber-50/50' },
                ].map((stat, i) => (
                  <div key={i} className={`p-8 rounded-2xl border ${stat.color} flex flex-col gap-4 shadow-sm`}>
                    <stat.icon size={20} className="text-amber/80" />
                    <div>
                      <div className="text-3xl font-bold text-dirty-white mono tracking-tight">{stat.val}</div>
                      <div className="text-[10px] mono text-slate-400 uppercase tracking-widest mt-1">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="relative py-32 bg-obsidian border-t border-slate-200/80">
        <div className="container-full">
          <motion.div {...fadeUp} className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-amber/40" />
              <span className="mono text-amber text-[11px] tracking-[0.5em] uppercase">03 // TECHNOLOGY</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-dirty-white tracking-tighter uppercase">
              How We <span className="italic font-serif text-amber">Verify.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 rounded-3xl overflow-hidden shadow-sm border border-slate-200">
            {[
              {
                num: '01',
                icon: MapPin,
                title: 'GPS Tagging',
                desc: 'Every installation is tagged with precise GPS coordinates at the exact moment of deployment. Location data is immutable and timestamped.',
                detail: 'Accuracy: ±3 metres',
              },
              {
                num: '02',
                icon: Camera,
                title: 'Computer Vision',
                desc: 'Ground agent photos are processed by our computer vision model — confirming display quality, placement accuracy, and brand compliance.',
                detail: 'Verification: 2.4 seconds',
              },
              {
                num: '03',
                icon: Shield,
                title: 'Blockchain Seal',
                desc: 'Every verified proof is cryptographically sealed on-chain. Immutable, permanently auditable, and impossible to manipulate or dispute.',
                detail: 'Dispute Rate: 0.0%',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white p-12 lg:p-16 group hover:bg-slate-50/80 transition-colors duration-300"
              >
                <div className="text-[80px] font-black text-amber/10 leading-none tracking-tighter mono mb-6 group-hover:text-amber/20 transition-colors">
                  {item.num}
                </div>
                <item.icon size={28} className="text-amber/50 mb-6 group-hover:text-amber transition-colors" />
                <h3 className="text-2xl font-bold text-dirty-white mb-4 tracking-tight">{item.title}</h3>
                <p className="text-sm text-slate-500 font-light leading-[1.8] mb-6">{item.desc}</p>
                <div className="text-[10px] mono text-amber/60 uppercase tracking-widest border-t border-slate-100 pt-4">
                  {item.detail}
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
            <span className="mono text-amber text-[11px] tracking-[0.5em] uppercase mb-6 block">04 // JOIN US</span>
            <h2 className="text-5xl lg:text-7xl font-bold text-dirty-white tracking-tighter uppercase mb-8">
              Ready to Build<br />
              <span className="italic font-serif text-amber">Canada's Network?</span>
            </h2>
            <p className="text-lg text-slate-500 max-w-xl mx-auto mb-12 font-light leading-[1.9]">
              Whether you are a national brand looking to reach verified stores, or an independent retail owner wanting to earn — AdMesh is your platform.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <Link href="/login" className="btn-molten px-8 h-[56px] flex items-center gap-3 text-obsidian font-bold">
                Launch Campaign <ArrowRight size={16} />
              </Link>
              <Link href="/carrier-network" className="btn-ghost px-8 h-[56px] flex items-center text-slate-700 hover:text-slate-900 border-slate-200 hover:bg-slate-50">
                Join as Retailer
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
