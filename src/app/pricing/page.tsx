'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import { motion } from 'framer-motion';
import { Shield, Smartphone, Check, ArrowRight, Zap, Activity, Target } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

const FAQS = [
  { q: 'Is there a minimum campaign spend?', a: 'No minimum spend. You can start with as few as 10 nodes for a single day to test performance before scaling.' },
  { q: 'How is billing calculated?', a: 'Billing is per node per day. Self-Verified campaigns are ₹12/node/day; Agent-Verified campaigns are ₹20/node/day. You only pay for verified active days.' },
  { q: 'What if a display goes down mid-campaign?', a: 'If a node goes offline, billing is automatically paused for that node and resumed upon reinstatement. You are never charged for unverified days.' },
  { q: 'Can I pause or cancel a campaign?', a: 'Yes. Campaigns can be paused or cancelled anytime from your dashboard with 24 hours notice. Prepaid amounts for unused days are fully refunded.' },
  { q: 'Do you offer custom enterprise pricing?', a: 'Yes. For campaigns across 500+ nodes or multi-city deployments, contact our network team for volume pricing and managed campaign support.' },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [nodes, setNodes] = useState(50);
  const [days, setDays] = useState(30);
  const [tier, setTier] = useState<'self' | 'agent'>('agent');

  const rate = tier === 'self' ? 12 : 20;
  const total = nodes * days * rate;
  const cpm = ((total / (nodes * days * 400)) * 1000).toFixed(1);

  return (
    <div className="min-h-screen bg-obsidian text-dirty-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-obsidian overflow-hidden">
        <div className="absolute inset-0 glowing-grid opacity-[0.06] pointer-events-none" />
        <div className="container-full relative z-10 text-center">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-3 mb-8 px-5 py-2.5 border border-amber/20 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
              <span className="text-[10px] mono text-amber/60 uppercase tracking-[0.4em]">Transparent · Performance-Based · Verified</span>
            </div>
            <h1 className="text-6xl lg:text-[clamp(56px,8vw,110px)] font-bold tracking-tighter leading-[0.9] text-dirty-white mb-10 uppercase">
              Simple.<br /><span className="italic font-serif text-amber">Honest Pricing.</span>
            </h1>
            <p className="text-xl text-white/50 max-w-xl mx-auto font-light leading-[1.9]">
              Pay only for verified, active placements. No hidden fees. No long-term lock-in. Full transparency on every rupee spent.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative py-24 bg-obsidian border-t border-white/5">
        <div className="container-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                tier: 'Self-Verified',
                price: '12',
                unit: 'per node / per day',
                desc: 'Ideal for brands running their own campaign monitoring with access to our digital proof dashboard.',
                features: ['Dashboard Access', 'GPS-Tagged Proofs', 'Photo Verification Feed', '24/7 Support', 'Standard Analytics Reports'],
                accent: 'border-white/10',
                icon: Smartphone,
                cta: 'Start Self-Verified',
                badge: null,
              },
              {
                tier: 'Agent-Verified',
                price: '20',
                unit: 'per node / per day',
                desc: 'Our flagship tier. Physical audits by ground agents, blockchain-sealed proofs, and a dedicated campaign manager.',
                features: ['Everything in Self-Verified', 'Monthly Physical Audits', 'Blockchain-Sealed Proofs', 'Dedicated Campaign Manager', 'Priority Node Selection', 'ROI Projection Reports'],
                accent: 'border-amber',
                icon: Shield,
                cta: 'Start Agent-Verified',
                badge: 'Most Recommended',
              },
            ].map((plan, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className={`relative p-10 lg:p-14 rounded-2xl border ${plan.accent} ${plan.badge ? 'bg-amber/[0.04]' : 'bg-white/[0.02]'} group hover:-translate-y-1 transition-all duration-400`}>
                {plan.badge && (
                  <div className="absolute top-6 right-6 bg-amber text-obsidian text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tight">{plan.badge}</div>
                )}
                <plan.icon size={36} className={`mb-8 ${plan.badge ? 'text-amber' : 'text-white/20'}`} />
                <h3 className="text-2xl font-bold text-dirty-white mb-2 tracking-tight">{plan.tier}</h3>
                <p className="text-sm text-white/40 font-light mb-8 leading-relaxed">{plan.desc}</p>
                <div className="flex items-baseline gap-2 mb-10 pb-10 border-b border-white/5">
                  <span className="text-5xl font-bold text-amber mono">₹{plan.price}</span>
                  <span className="text-sm text-white/30 font-light">{plan.unit}</span>
                </div>
                <ul className="space-y-4 mb-10">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-white/60 font-light">
                      <Check size={14} className="text-amber shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/login" className={`w-full py-4 flex justify-center items-center font-bold text-[11px] tracking-[0.2em] uppercase transition-all ${plan.badge ? 'bg-amber text-obsidian hover:opacity-90' : 'bg-white/5 border border-white/10 text-dirty-white hover:bg-white/10'}`}>
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="relative py-32 bg-obsidian border-t border-white/5">
        <div className="container-full">
          <motion.div {...fadeUp} className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-amber/40" />
              <span className="mono text-amber text-[11px] tracking-[0.5em] uppercase">02 // ROI CALCULATOR</span>
            </div>
            <h2 className="text-4xl font-bold text-dirty-white tracking-tighter uppercase mb-12">
              Estimate Your <span className="italic font-serif text-amber">Reach.</span>
            </h2>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-10 lg:p-14">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
                <div className="space-y-3">
                  <label className="text-[10px] mono text-amber/60 uppercase tracking-[0.3em]">Number of Nodes</label>
                  <input type="number" min={1} value={nodes} onChange={e => setNodes(Number(e.target.value))}
                    className="w-full terminal-underline-input text-2xl font-bold text-dirty-white py-2" />
                  <span className="text-[10px] text-white/20 mono">stores</span>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] mono text-amber/60 uppercase tracking-[0.3em]">Campaign Duration</label>
                  <input type="number" min={1} value={days} onChange={e => setDays(Number(e.target.value))}
                    className="w-full terminal-underline-input text-2xl font-bold text-dirty-white py-2" />
                  <span className="text-[10px] text-white/20 mono">days</span>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] mono text-amber/60 uppercase tracking-[0.3em]">Verification Tier</label>
                  <div className="flex gap-3 pt-2">
                    {(['self', 'agent'] as const).map(t => (
                      <button key={t} onClick={() => setTier(t)}
                        className={`flex-1 py-2 text-[11px] mono uppercase tracking-widest border transition-all ${tier === t ? 'border-amber bg-amber/10 text-amber' : 'border-white/10 text-white/30 hover:border-white/20'}`}>
                        {t === 'self' ? 'Self' : 'Agent'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-t border-white/5 pt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="text-[10px] mono text-white/30 uppercase tracking-widest mb-2">Total Budget</div>
                  <div className="text-4xl font-bold text-amber mono">₹{total.toLocaleString('en-IN')}</div>
                </div>
                <div>
                  <div className="text-[10px] mono text-white/30 uppercase tracking-widest mb-2">Est. Impressions</div>
                  <div className="text-4xl font-bold text-dirty-white mono">{(nodes * days * 400).toLocaleString('en-IN')}</div>
                </div>
                <div>
                  <div className="text-[10px] mono text-white/30 uppercase tracking-widest mb-2">Est. CPM</div>
                  <div className="text-4xl font-bold text-dirty-white mono">₹{cpm}</div>
                </div>
              </div>
              <p className="text-[11px] text-white/20 mt-6 font-light">* Impressions estimated at 400 daily views per node average. Actual results may vary by location.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-32 bg-obsidian border-t border-white/5">
        <div className="container-full max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-amber/40" />
              <span className="mono text-amber text-[11px] tracking-[0.5em] uppercase">03 // FAQ</span>
            </div>
            <h2 className="text-4xl font-bold text-dirty-white tracking-tighter uppercase">
              Common <span className="italic font-serif text-amber">Questions.</span>
            </h2>
          </motion.div>
          <div className="space-y-px">
            {FAQS.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="border border-white/5 rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-8 py-6 text-left hover:bg-white/[0.02] transition-colors">
                  <span className="text-sm font-medium text-dirty-white pr-4">{faq.q}</span>
                  <span className="text-amber text-xl shrink-0">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="px-8 pb-6">
                    <p className="text-sm text-white/50 font-light leading-[1.8]">{faq.a}</p>
                  </div>
                )}
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
            <span className="mono text-amber text-[11px] tracking-[0.5em] uppercase mb-6 block">04 // GET STARTED</span>
            <h2 className="text-5xl lg:text-7xl font-bold text-dirty-white tracking-tighter uppercase mb-8">
              Start Your<br /><span className="italic font-serif text-amber">First Campaign.</span>
            </h2>
            <p className="text-lg text-white/40 max-w-lg mx-auto mb-12 font-light">
              No commitment. No minimum spend. Go live in under 48 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <Link href="/login" className="btn-molten px-10 h-[56px] inline-flex items-center gap-3">
                Launch Campaign <ArrowRight size={16} />
              </Link>
              <Link href="/#pilot" className="btn-ghost px-8 h-[56px] inline-flex items-center">
                Request Pilot
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
