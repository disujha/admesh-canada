'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import { motion } from 'framer-motion';
import { Shield, Zap, Target, BarChart, ArrowRight, Check, Network, Users, TrendingUp } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

export default function DistributorsPage() {
  return (
    <div className="min-h-screen bg-obsidian text-dirty-white selection:bg-amber selection:text-obsidian">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-obsidian pt-32 pb-24">
        <div className="absolute inset-0 glowing-grid opacity-[0.03] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-obsidian pointer-events-none" />
        <div className="container-full relative z-10">
          <motion.div {...fadeUp}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-amber/40" />
              <span className="mono text-amber text-[11px] tracking-[0.5em] uppercase font-bold">01 // DISTRIBUTOR PORTAL</span>
            </div>
            <h1 className="text-6xl lg:text-[clamp(64px,9vw,110px)] font-bold tracking-tighter leading-[0.9] text-dirty-white mb-10 uppercase">
              Scale Your Network.<br />
              <span className="italic font-serif text-amber">Earn Recurring</span><br />
              Commissions.
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl font-light leading-[1.9] mb-12">
              AdMesh empowers distributors and sales agencies to connect storefront networks with national brands. Manage your regional deployments, track placement compliance, and secure sustainable recurring revenue.
            </p>
            <div className="flex flex-wrap gap-5">
              <Link href="/login" className="btn-molten px-8 h-[56px] flex items-center gap-3 text-obsidian font-bold">
                Become a Partner <ArrowRight size={16} />
              </Link>
              <Link href="#value" className="btn-ghost px-8 h-[56px] flex items-center text-slate-700 hover:text-slate-900 border-slate-200 hover:bg-slate-50">
                Why Partner With Us
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Metric Badge */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="absolute bottom-16 right-[8%] hidden lg:block">
          <div className="px-6 py-5 bg-amber/5 border border-amber/20 rounded-2xl shadow-sm">
            <div className="text-[10px] mono text-slate-500 uppercase tracking-widest mb-1">Network Commission</div>
            <div className="text-3xl font-bold text-amber mono">Up to 15%</div>
            <div className="text-[10px] text-slate-400 mono mt-1">On all active campaign revenues</div>
          </div>
        </motion.div>
      </section>

      {/* Value Proposition */}
      <section id="value" className="relative py-32 bg-slate-50 border-t border-slate-200/80" style={{ scrollMarginTop: '80px' }}>
        <div className="container-full">
          <motion.div {...fadeUp} className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-amber/40" />
              <span className="mono text-amber text-[11px] tracking-[0.5em] uppercase font-bold">02 // PARTNER VALUE</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-dirty-white tracking-tighter uppercase">
              The Engine of <span className="italic font-serif text-amber">Distribution.</span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: TrendingUp, title: 'Recurring Commission', desc: 'Earn a steady share of all ad revenue passing through your retail network nodes, building a predictable monthly revenue stream.' },
              { icon: Network, title: 'Seamless Store Onboarding', desc: 'Provide your existing independent retailers with an immediate path to passive income, strengthening merchant loyalty.' },
              { icon: Users, title: 'Regional Autonomy', desc: 'Act as the exclusive deployment and maintenance partner for AdMesh storefront campaigns in your defined territory.' },
              { icon: Shield, title: 'Guaranteed Brand Safety', desc: 'All incoming ad campaigns are vetted for compliance before dispatch, protecting your merchants storefront integrity.' },
              { icon: Zap, title: 'Operational Support', desc: 'We supply the campaign assets and coordinate deployments, letting you focus on scaling your merchant connections.' },
              { icon: BarChart, title: 'Transparent Telemetry', desc: 'Monitor node deployment status, compliance approvals, and accumulated commissions from a single unified partner dashboard.' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.6 }}
                className="p-8 rounded-[24px] border border-slate-200 bg-white group hover:border-blue-600/30 hover:bg-slate-50/50 hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.035)] transition-all duration-500 flex flex-col justify-between h-full">
                <div className="flex items-start justify-between mb-8 shrink-0">
                  <item.icon size={48} strokeWidth={1.5} className="text-slate-600 group-hover:text-blue-600 transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-dirty-white mb-3 tracking-tight">{item.title}</h3>
                <p className="text-sm text-slate-500 font-light leading-relaxed flex-grow line-clamp-3">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Flow */}
      <section className="relative py-32 bg-obsidian border-t border-slate-200/80">
        <div className="container-full">
          <motion.div {...fadeUp} className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-amber/40" />
              <span className="mono text-amber text-[11px] tracking-[0.5em] uppercase font-bold">03 // HOW IT WORKS</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-dirty-white tracking-tighter uppercase">
              The Partnership <span className="italic font-serif text-amber">Workflow.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Register Network', desc: 'Onboard your partner independent retail locations into the AdMesh partner portal to activate them as media nodes.' },
              { step: '02', title: 'Deploy Campaigns', desc: 'Coordinate the distribution and physical setup of brand advertising displays to your registered merchants.' },
              { step: '03', title: 'Accumulate Commission', desc: 'Track storefront campaign runtime and collect recurring commissions paid directly to your distribution firm.' },
            ].map((step, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="relative p-8 rounded-2xl border border-slate-800 bg-obsidian-light">
                <div className="text-[12px] mono text-amber font-bold mb-4">{step.step} // STEP</div>
                <h3 className="text-xl font-bold text-dirty-white mb-3 uppercase tracking-tight">{step.title}</h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-32 bg-slate-50 border-t border-slate-200">
        <div className="container-full text-center">
          <motion.div {...fadeUp} className="max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-bold text-dirty-white mb-8 tracking-tighter uppercase">
              Ready to Expand your <span className="italic font-serif text-amber">Commission Revenue?</span>
            </h2>
            <p className="text-lg text-slate-500 font-light leading-relaxed mb-10">
              Join Canada's fastest-growing physical retail advertising ecosystem. Partner with AdMesh to help your retail merchants monetize their prime customer spaces.
            </p>
            <div className="flex justify-center gap-5">
              <Link href="/login" className="btn-molten px-8 h-[56px] flex items-center gap-3 text-obsidian font-bold">
                Become a Partner <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
