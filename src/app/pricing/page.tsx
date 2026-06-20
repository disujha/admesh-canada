'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import { motion } from 'framer-motion';
import { Shield, Smartphone, Check, ArrowRight } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

const FAQS = [
  { q: 'Is there a minimum campaign spend?', a: 'No minimum spend. You can start with as few as 10 nodes for a single day to test performance before scaling across the network.' },
  { q: 'How is billing calculated?', a: 'Billing is calculated per node per day. Self-Verified campaigns are $1.50/node/day; Agent-Verified campaigns are $2.50/node/day. You only pay for verified active days.' },
  { q: 'What if a display goes down mid-campaign?', a: 'If a node goes offline, billing is automatically paused for that node and resumed upon reinstatement. You are never charged for unverified days.' },
  { q: 'Can I pause or cancel a campaign?', a: 'Yes. Campaigns can be paused or cancelled anytime from your dashboard with 24 hours notice. Prepaid amounts for unused days are fully refunded.' },
  { q: 'Do you offer custom enterprise pricing?', a: 'Yes. For campaigns across 250+ nodes or multi-province deployments, contact our network team for volume pricing and managed campaign support.' },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [nodes, setNodes] = useState(50);
  const [days, setDays] = useState(30);
  const [tier, setTier] = useState<'self' | 'agent'>('agent');

  const rate = tier === 'self' ? 1.5 : 2.5;
  const total = nodes * days * rate;
  const cpm = ((total / (nodes * days * 400)) * 1000).toFixed(2);

  return (
    <div className="relative bg-[#F1EFE6] text-[#11233B] min-h-screen selection:bg-[#FFB300] selection:text-[#0A1A2C] font-sans antialiased overflow-x-hidden">
      
      {/* Persistent Left Margin Rail (Desktop only) */}
      <div className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[5vw] border-r border-[#11233B]/10 flex-col items-center justify-between py-24 z-40 select-none pointer-events-none font-mono text-[9px] uppercase tracking-[0.25em] text-[#52617A]">
        <div style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          ADMESH — PRICING MANIFEST — 2026
        </div>
        <div style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }} className="text-[#FFB300] font-bold">
          [ CA.PRICING // PROGRAMMATIC ]
        </div>
      </div>

      <Navbar />

      <main className="w-full lg:pl-[5vw]">
        {/* Hero */}
        <section className="relative pt-40 pb-16 bg-[#F1EFE6]">
          <div className="container-full relative z-10">
            <motion.div {...fadeUp} className="max-w-3xl">
              <span className="os-label mb-4 block text-[#FFB300]">[ NETWORK COST ]</span>
              <h1 className="font-sans text-[#11233B] text-4xl lg:text-6xl font-black uppercase leading-none tracking-tight mb-6">
                Simple.<br /><span className="text-[#FFB300]">Honest pricing.</span>
              </h1>
              <p className="text-base text-[#52617A] font-light leading-relaxed max-w-xl">
                Pay only for verified, active placements. No hidden fees. No long-term lock-in. Full transparency on every marketing dollar spent.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="enterprise-section w-full bg-[#E7E5DB] border-t border-[#11233B]/10">
          <div className="container-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  tier: 'Self-Verified',
                  price: '1.50',
                  unit: 'per node / per day',
                  desc: 'Ideal for brands running their own campaign monitoring with access to our digital proof dashboard.',
                  features: ['Dashboard Access', 'GPS-Tagged Proofs', 'Photo Verification Feed', '24/7 Support', 'Standard Analytics Reports'],
                  accent: 'border-[#11233B]/10 bg-[#F1EFE6]',
                  cta: 'Start Self-Verified',
                  badge: null,
                },
                {
                  tier: 'Agent-Verified',
                  price: '2.50',
                  unit: 'per node / per day',
                  desc: 'Our flagship tier. Physical audits by ground agents, blockchain-sealed proofs, and a dedicated campaign manager.',
                  features: ['Everything in Self-Verified', 'Monthly Physical Audits', 'Blockchain-Sealed Proofs', 'Dedicated Campaign Manager', 'Priority Node Selection', 'ROI Projection Reports'],
                  accent: 'border-[#11233B]/10 bg-[#F1EFE6]',
                  cta: 'Start Agent-Verified',
                  badge: 'Most Recommended',
                },
              ].map((plan, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  className={`border ${plan.accent} flex flex-col justify-between`}
                  style={{ padding: 'var(--space-sm) var(--space-sm) var(--space-sm) var(--space-sm)', borderRadius: '0px' }}>
                  
                  <div>
                    <div className="flex items-start justify-between gap-3" style={{ marginBottom: 'var(--space-xs)' }}>
                      <h3 className="font-sans font-black text-[#11233B] text-lg uppercase tracking-tight leading-tight">{plan.tier}</h3>
                      {plan.badge && (
                        <span className="font-mono text-[8px] uppercase tracking-widest text-[#0A1A2C] bg-[#FFB300] px-2 py-0.5 font-bold">
                          {plan.badge}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-xs text-[#52617A] font-light leading-relaxed mb-4 line-clamp-2 h-9" style={{ marginBottom: 'var(--space-sm)' }}>
                      {plan.desc}
                    </p>

                    <div className="flex items-baseline gap-2 border-b border-[#11233B]/10" style={{ paddingBottom: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>
                      <span className="text-4xl font-bold text-[#FFB300] font-mono">${plan.price}</span>
                      <span className="text-xs text-[#52617A] font-light font-mono">{plan.unit}</span>
                    </div>

                    <ul className="space-y-3" style={{ marginBottom: 'var(--space-sm)' }}>
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-3 text-xs text-[#52617A] font-light">
                          <Check size={12} className="text-[#FFB300] shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-[#11233B]/10" style={{ paddingTop: 'var(--space-sm)' }}>
                    <Link href="/login" className="btn-primary w-full text-center" style={{ padding: '12px 24px !important', fontSize: '0.75rem' }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0A1A2C] mr-2 inline-block animate-pulse"></span>
                      {plan.cta}
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ROI Calculator */}
        <section className="enterprise-section w-full bg-[#F1EFE6] border-t border-[#11233B]/10">
          <div className="container-full">
            <motion.div {...fadeUp} className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-[#FFB300]/40" />
                <span className="font-mono text-[#FFB300] text-[10px] tracking-[0.4em] uppercase">02 // ROI CALCULATOR</span>
              </div>
              <h2 className="font-sans font-bold text-[#11233B] text-2xl lg:text-3xl tracking-tight leading-snug uppercase" style={{ marginBottom: 'var(--space-sm)' }}>
                Estimate your reach.
              </h2>
              
              <div className="bg-[#E7E5DB] border border-[#11233B]/10 p-6 lg:p-10" style={{ borderRadius: '0px' }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ marginBottom: 'var(--space-sm)' }}>
                  <div className="flex flex-col">
                    <label className="text-[9px] font-mono text-[#52617A] uppercase tracking-wider mb-2">Number of Nodes</label>
                    <input type="number" min={1} value={nodes} onChange={e => setNodes(Number(e.target.value))}
                      className="bg-transparent border-b-2 border-[#11233B]/15 focus:border-[#FFB300] outline-none text-2xl font-bold text-[#11233B] py-2 font-mono" />
                    <span className="text-[9px] text-[#52617A] font-mono mt-1">stores</span>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[9px] font-mono text-[#52617A] uppercase tracking-wider mb-2">Campaign Duration</label>
                    <input type="number" min={1} value={days} onChange={e => setDays(Number(e.target.value))}
                      className="bg-transparent border-b-2 border-[#11233B]/15 focus:border-[#FFB300] outline-none text-2xl font-bold text-[#11233B] py-2 font-mono" />
                    <span className="text-[9px] text-[#52617A] font-mono mt-1">days</span>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[9px] font-mono text-[#52617A] uppercase tracking-wider mb-2">Verification Tier</label>
                    <div className="flex gap-2 pt-1">
                      {(['self', 'agent'] as const).map(t => (
                        <button key={t} onClick={() => setTier(t)}
                          className={`flex-1 py-2 text-[10px] font-mono uppercase tracking-wider border transition-all ${tier === t ? 'border-[#FFB300] bg-[#FFB300]/10 text-[#FFB300] font-bold' : 'border-[#11233B]/15 text-[#52617A] hover:border-[#11233B]/30 hover:text-[#11233B]'}`}
                          style={{ borderRadius: '0px' }}>
                          {t === 'self' ? 'Self' : 'Agent'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#11233B]/10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-[9px] font-mono text-[#52617A] uppercase tracking-wider mb-1">Total Budget</div>
                    <div className="text-3xl font-bold text-[#FFB300] font-mono">${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-[#52617A] uppercase tracking-wider mb-1">Est. Impressions</div>
                    <div className="text-3xl font-bold text-[#11233B] font-mono">{(nodes * days * 400).toLocaleString('en-US')}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-[#52617A] uppercase tracking-wider mb-1">Est. CPM</div>
                    <div className="text-3xl font-bold text-[#11233B] font-mono">${cpm}</div>
                  </div>
                </div>
                <p className="text-[10px] text-[#52617A] mt-6 font-light leading-relaxed">* Impressions estimated at 400 daily views per node average. Actual results may vary by province and retail type.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="enterprise-section w-full bg-[#E7E5DB] border-t border-[#11233B]/10">
          <div className="container-full max-w-3xl mx-auto">
            <motion.div {...fadeUp} style={{ marginBottom: 'var(--space-sm)' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-[#FFB300]/40" />
                <span className="font-mono text-[#FFB300] text-[10px] tracking-[0.4em] uppercase">03 // FAQ</span>
              </div>
              <h2 className="font-sans font-bold text-[#11233B] text-2xl lg:text-3xl tracking-tight leading-snug uppercase">
                Common questions.
              </h2>
            </motion.div>
            
            <div className="space-y-2">
              {FAQS.map((faq, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  className="border border-[#11233B]/10 bg-[#F1EFE6]" style={{ borderRadius: '0px' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#11233B]/5 transition-colors cursor-pointer">
                    <span className="text-sm font-bold text-[#11233B] pr-4">{faq.q}</span>
                    <span className="text-[#FFB300] text-lg font-mono shrink-0">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5">
                      <p className="text-xs text-[#52617A] font-light leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="enterprise-cta-section w-full bg-[#F1EFE6] border-t border-[#11233B]/10 text-center">
          <div className="container-full flex flex-col items-center justify-center">
            <div className="max-w-4xl w-full flex flex-col items-center py-12">
              <span className="os-label mb-4 block text-[#FFB300] text-center">[ SYSTEM ACCESS ]</span>
              <h2 className="font-sans font-bold text-[#11233B] text-4xl lg:text-[64px] tracking-tight leading-[1.05] mb-10 uppercase max-w-2xl text-center">
                Start Your First Campaign.
              </h2>
              <p className="text-base text-[#52617A] max-w-md mx-auto mb-10 font-light leading-relaxed">
                No commitment. No minimum spend. Go live in under 48 hours.
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                <Link href="/login" className="btn-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0A1A2C] mr-2 inline-block animate-pulse"></span>
                  Launch Campaign
                </Link>
                <Link href="/#pilot" className="btn-secondary">
                  Request Pilot <ArrowRight size={12} className="opacity-70 stroke-[2.5]" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
