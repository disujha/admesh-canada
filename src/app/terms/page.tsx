'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import { motion } from 'framer-motion';
import { FileText, Shield, AlertCircle, Mail, Scale, Ban, RefreshCw, Globe } from 'lucide-react';

const LAST_UPDATED = 'June 14, 2026';
const COMPANY = 'AdMesh Technologies Inc.';
const BRAND = 'AdMesh';
const CONTACT = 'hello@admesh.ca';
const LEGAL = 'legal@admesh.ca';

const sections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'definitions', label: 'Definitions' },
  { id: 'eligibility', label: 'Eligibility & Account' },
  { id: 'services', label: 'Our Services' },
  { id: 'brand-obligations', label: 'Brand Obligations' },
  { id: 'carrier-obligations', label: 'Carrier Obligations' },
  { id: 'payments', label: 'Payments & Billing' },
  { id: 'ip', label: 'Intellectual Property' },
  { id: 'prohibited', label: 'Prohibited Conduct' },
  { id: 'disclaimers', label: 'Disclaimers' },
  { id: 'liability', label: 'Limitation of Liability' },
  { id: 'indemnity', label: 'Indemnity' },
  { id: 'termination', label: 'Termination' },
  { id: 'governing-law', label: 'Governing Law' },
  { id: 'changes', label: 'Changes to Terms' },
  { id: 'contact', label: 'Contact' },
];

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState('introduction');

  return (
    <div className="min-h-screen bg-obsidian text-dirty-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-20 bg-obsidian overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 glowing-grid opacity-[0.03] pointer-events-none" />
        <div className="container-full relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-amber/40" />
              <span className="mono text-amber text-[11px] tracking-[0.5em] uppercase">Legal // Terms</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-[0.9] text-dirty-white mb-6 uppercase">
              Terms of <span className="italic font-serif text-amber">Service.</span>
            </h1>
            <p className="text-base text-slate-500 font-light max-w-2xl leading-[1.9] mb-4">
              These Terms of Service constitute a legally binding agreement between you and {COMPANY} ("{BRAND}"). Please read them carefully before accessing or using our platform.
            </p>
            <div className="flex flex-wrap gap-6 mt-8 text-[11px] mono text-slate-400 uppercase tracking-widest">
              <span>Last Updated: {LAST_UPDATED}</span>
              <span>|</span>
              <span>Effective: {LAST_UPDATED}</span>
              <span>|</span>
              <span>Governing Law: Ontario, Canada</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-full py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Sidebar */}
          <aside className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-24 space-y-1">
              <p className="text-[10px] mono text-slate-400 uppercase tracking-widest mb-4">Contents</p>
              {sections.map((s) => (
                <a key={s.id} href={`#${s.id}`}
                  onClick={() => setActiveSection(s.id)}
                  className={`block text-sm py-1.5 px-3 rounded-lg transition-all duration-200 ${activeSection === s.id ? 'text-amber bg-amber/5 border-l-2 border-amber' : 'text-slate-400 hover:text-slate-600'}`}>
                  {s.label}
                </a>
              ))}
              <div className="mt-8 pt-8 border-t border-slate-200">
                <a href={`mailto:${LEGAL}`} className="flex items-center gap-2 text-[11px] mono text-amber hover:text-amber/80 transition-colors uppercase tracking-widest font-semibold">
                  <Mail size={12} /> {LEGAL}
                </a>
              </div>
            </div>
          </aside>

          {/* Content */}
          <article className="lg:col-span-9 space-y-16 text-sm text-slate-600 leading-[1.9] font-light">

            <div id="introduction" style={{ scrollMarginTop: '100px' }}>
              <div className="flex items-center gap-3 mb-6">
                <FileText size={18} className="text-amber" />
                <h2 className="text-2xl font-bold text-dirty-white tracking-tight">1. Introduction</h2>
              </div>
              <p className="mb-4">Welcome to AdMesh, operated by {COMPANY}, a corporation incorporated under the Canada Business Corporations Act (CBCA) ("Company", "we", "us", "our"). These Terms of Service ("Terms") govern your access to and use of the AdMesh platform, including our website, brand dashboard, carrier portal, and all related services (collectively, the "Services").</p>
              <p className="mb-4">By registering an account, accessing the platform, or using any of our Services, you agree to be bound by these Terms. If you are using our Services on behalf of a company or other legal entity, you represent that you have the authority to bind that entity to these Terms.</p>
              <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-5 shadow-sm">
                <p className="text-amber text-sm font-semibold"><strong>Important:</strong> If you do not agree to these Terms, please do not access or use our Services. Continued use constitutes acceptance.</p>
              </div>
            </div>

            <div className="h-px bg-slate-200" />

            <div id="definitions" style={{ scrollMarginTop: '100px' }}>
              <h2 className="text-2xl font-bold text-dirty-white tracking-tight mb-6">2. Definitions</h2>
              <div className="space-y-3">
                {[
                  { term: '"Platform"', def: 'The AdMesh website, dashboards, APIs, and all digital interfaces operated by the Company.' },
                  { term: '"Brand Partner" or "Brand"', def: 'A business or individual that purchases advertising placements through AdMesh.' },
                  { term: '"Carrier" or "Store Owner"', def: 'A retail store owner or operator who hosts AdMesh display materials at their premises.' },
                  { term: '"Node"', def: 'A single verified AdMesh display installation at a Carrier\'s store location.' },
                  { term: '"Campaign"', def: 'A discrete advertising initiative configured by a Brand Partner on the Platform.' },
                  { term: '"Proof of Display"', def: 'GPS-tagged, computer-vision verified photographic evidence of active display at a Node, cryptographically sealed on blockchain.' },
                  { term: '"User"', def: 'Any individual accessing or using the Platform, whether as a Brand Partner, Carrier, or visitor.' },
                  { term: '"Content"', def: 'Any creative assets, text, images, or data uploaded or submitted to the Platform.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl shadow-sm">
                    <div><strong className="text-amber font-semibold">{item.term}:</strong> <span className="text-slate-500">{item.def}</span></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-slate-200" />

            <div id="eligibility" style={{ scrollMarginTop: '100px' }}>
              <h2 className="text-2xl font-bold text-dirty-white tracking-tight mb-6">3. Eligibility & Account Registration</h2>
              <p className="mb-4">To use our Services, you must be at least 18 years of age and legally capable of entering into binding contracts under Canadian law. By using the Platform, you represent and warrant that you meet these requirements.</p>
              <div className="space-y-3">
                {[
                  'You agree to provide accurate, current, and complete information during registration.',
                  'You are responsible for maintaining the confidentiality of your account credentials.',
                  'You must notify us immediately at ' + CONTACT + ' if you suspect unauthorized access to your account.',
                  'One person or legal entity may not maintain more than one free account. Multiple accounts for misuse or manipulation are prohibited.',
                  'We reserve the right to refuse registration or terminate accounts at our sole discretion, including for providing false information.',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-amber/40 mt-2 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-slate-200" />

            <div id="services" style={{ scrollMarginTop: '100px' }}>
              <h2 className="text-2xl font-bold text-dirty-white tracking-tight mb-6">4. Our Services</h2>
              <p className="mb-4">AdMesh provides a two-sided marketplace connecting Brand Partners seeking verified physical retail advertising placements with Carriers who host those placements at their stores. Our Services include:</p>
              <div className="space-y-3">
                {[
                  'Campaign configuration, targeting, and deployment management tools for Brand Partners',
                  'GPS-based node activation, verification, and proof-of-display generation',
                  'Computer-vision photo verification and blockchain-sealed proof records',
                  'Real-time analytics dashboards, reporting, and campaign performance data',
                  'Carrier registration, node management, and earnings tracking portals',
                  'Field operations managed physical installation and audit services',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-amber/40 mt-2 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4">We reserve the right to modify, suspend, or discontinue any aspect of our Services at any time with reasonable notice, except where immediate action is required for security or legal compliance.</p>
            </div>

            <div className="h-px bg-slate-200" />

            <div id="brand-obligations" style={{ scrollMarginTop: '100px' }}>
              <h2 className="text-2xl font-bold text-dirty-white tracking-tight mb-6">5. Brand Partner Obligations</h2>
              <p className="mb-4">As a Brand Partner, you agree to:</p>
              <div className="space-y-3">
                {[
                  'Ensure all creative content submitted to the Platform complies with applicable Canadian advertising standards, including guidelines issued by Ad Standards (Canada).',
                  'Not submit content that is defamatory, obscene, misleading, discriminatory, or violates any third-party intellectual property rights.',
                  'Ensure all claims made in advertising materials are accurate, substantiated, and not misleading to consumers.',
                  'Obtain all necessary licences and clearances for creative assets, including music, images, trademarks, and endorsements.',
                  'Pay all fees associated with your campaigns in accordance with agreed payment terms.',
                  'Not use the Platform to run campaigns for categories prohibited under applicable provincial laws, including tobacco, cannabis targeting minors, or unregulated financial products.',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-amber/40 mt-2 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-slate-200" />

            <div id="carrier-obligations" style={{ scrollMarginTop: '100px' }}>
              <h2 className="text-2xl font-bold text-dirty-white tracking-tight mb-6">6. Carrier Obligations</h2>
              <p className="mb-4">As a registered Carrier, you agree to:</p>
              <div className="space-y-3">
                {[
                  'Provide accurate information about your store, including address, store type, and estimated daily footprint.',
                  'Maintain the display material in good condition and in the agreed location for the duration of the campaign.',
                  'Not relocate, cover, obscure, deface, or remove display materials without prior written approval from AdMesh.',
                  'Grant AdMesh and its agents the right to enter your premises during business hours for installation, maintenance, audits, and removal of display materials.',
                  'Not solicit competing advertising placement services during the period of an active AdMesh campaign at your premises.',
                  'Notify AdMesh promptly at ' + CONTACT + ' if a display is damaged, removed, or if your store ceases to operate.',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-amber/40 mt-2 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-slate-200" />

            <div id="payments" style={{ scrollMarginTop: '100px' }}>
              <div className="flex items-center gap-3 mb-6">
                <Scale size={18} className="text-amber" />
                <h2 className="text-2xl font-bold text-dirty-white tracking-tight">7. Payments & Billing</h2>
              </div>
              <div className="space-y-4">
                {[
                  { title: '7.1 Brand Partner Fees', desc: 'Campaigns are billed on a per-node, per-day basis. Applicable rates are $1.50/node/day (Self-Verified) or $2.50/node/day (Agent-Verified) in Canadian Dollars. GST/HST at applicable rates will be charged additionally. All fees are exclusive of taxes unless stated.' },
                  { title: '7.2 Carrier Payouts', desc: 'Carrier earnings are calculated based on verified active display days and paid weekly via Direct Deposit to the registered business account. Payments are subject to statutory withholding tax regulations under the Income Tax Act (Canada) where applicable.' },
                  { title: '7.3 Non-Payment', desc: 'Brand Partners who fail to pay invoices within 15 days of the due date may have their campaigns suspended. We reserve the right to pursue recovery of outstanding amounts including through legal recovery actions.' },
                  { title: '7.4 Refunds', desc: 'Prepaid amounts for unverified or inactive node-days are credited back to your AdMesh account balance. Cash refunds are processed within 14 business days upon request, subject to verification.' },
                  { title: '7.5 Disputes', desc: 'Any billing disputes must be raised within 30 days of the invoice date by emailing ' + CONTACT + '. We will investigate and respond within 10 business days.' },
                ].map((item, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-dirty-white mb-2">{item.title}</h3>
                    <p className="text-slate-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-slate-200" />

            <div id="ip" style={{ scrollMarginTop: '100px' }}>
              <h2 className="text-2xl font-bold text-dirty-white tracking-tight mb-6">8. Intellectual Property</h2>
              <p className="mb-4">All intellectual property rights in the AdMesh Platform, including software, design, trademarks, logos, and proprietary technology, are owned by or licensed to {COMPANY}. Nothing in these Terms grants you any right, title, or interest in our IP.</p>
              <p className="mb-4">By uploading Content to the Platform, you grant us a non-exclusive, worldwide, royalty-free licence to use, reproduce, and display that Content solely for the purpose of delivering the Services.</p>
              <p>You retain ownership of all Content you upload. You represent and warrant that you have all necessary rights to grant this licence and that your Content does not infringe any third-party intellectual property rights.</p>
            </div>

            <div className="h-px bg-slate-200" />

            <div id="prohibited" style={{ scrollMarginTop: '100px' }}>
              <div className="flex items-center gap-3 mb-6">
                <Ban size={18} className="text-amber" />
                <h2 className="text-2xl font-bold text-dirty-white tracking-tight">9. Prohibited Conduct</h2>
              </div>
              <p className="mb-4">You agree not to:</p>
              <div className="space-y-2">
                {[
                  'Use the Platform for any unlawful purpose or in violation of any applicable Canadian or international law',
                  'Attempt to reverse-engineer, decompile, or extract source code from the Platform',
                  'Use automated bots, scrapers, or scripts to access the Platform without our prior written consent',
                  'Submit false or misleading information, including fabricated proof-of-display data',
                  'Interfere with or disrupt the integrity or performance of the Platform or its infrastructure',
                  'Impersonate another person or entity, or misrepresent your affiliation with any person or entity',
                  'Use the Platform to transmit malware, viruses, or any other harmful code',
                  'Attempt to gain unauthorized access to other users\' accounts or our systems',
                  'Engage in any conduct that is abusive, harassing, or discriminatory toward our staff, agents, or other users',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-amber/40 mt-2 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-slate-200" />

            <div id="disclaimers" style={{ scrollMarginTop: '100px' }}>
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle size={18} className="text-amber" />
                <h2 className="text-2xl font-bold text-dirty-white tracking-tight">10. Disclaimers</h2>
              </div>
              <p className="mb-4">THE PLATFORM AND SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.</p>
              <p className="mb-4">We do not warrant that the Platform will be uninterrupted, error-free, or completely secure. Campaign performance outcomes (impressions, sales uplift, brand recall) are estimates based on historical averages and are not guaranteed.</p>
              <p>AdMesh is a technology platform and marketplace. We are not responsible for the actions or omissions of Brand Partners or Carriers beyond our contractual obligations to verify placements and process payments.</p>
            </div>

            <div className="h-px bg-slate-200" />

            <div id="liability" style={{ scrollMarginTop: '100px' }}>
              <h2 className="text-2xl font-bold text-dirty-white tracking-tight mb-6">11. Limitation of Liability</h2>
              <p className="mb-4">TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, {COMPANY.toUpperCase()} SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL, ARISING FROM YOUR USE OF OR INABILITY TO USE THE SERVICES.</p>
              <p>OUR TOTAL LIABILITY TO YOU FOR ANY CLAIMS ARISING UNDER THESE TERMS SHALL NOT EXCEED THE TOTAL AMOUNT PAID BY YOU TO US IN THE THREE (3) MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM.</p>
            </div>

            <div className="h-px bg-slate-200" />

            <div id="indemnity" style={{ scrollMarginTop: '100px' }}>
              <h2 className="text-2xl font-bold text-dirty-white tracking-tight mb-6">12. Indemnity</h2>
              <p>You agree to indemnify, defend, and hold harmless {COMPANY}, its directors, officers, employees, and agents from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising from: (a) your use of the Platform; (b) your violation of these Terms; (c) your Content; or (d) your violation of any applicable law or third-party rights.</p>
            </div>

            <div className="h-px bg-slate-200" />

            <div id="termination" style={{ scrollMarginTop: '100px' }}>
              <div className="flex items-center gap-3 mb-6">
                <RefreshCw size={18} className="text-amber" />
                <h2 className="text-2xl font-bold text-dirty-white tracking-tight">13. Termination</h2>
              </div>
              <p className="mb-4">Either party may terminate these Terms at any time with 30 days written notice. We may terminate immediately upon material breach, fraudulent conduct, or violation of applicable law.</p>
              <p className="mb-4">Upon termination: (a) active campaigns will be wound down within the notice period; (b) outstanding Carrier payouts for verified active days will be settled within 14 days; (c) prepaid Brand Partner balances will be refunded within 14 business days; (d) your account access will be revoked.</p>
              <p>Provisions that by their nature should survive termination (including Intellectual Property, Limitation of Liability, Indemnity, and Governing Law) shall survive.</p>
            </div>

            <div className="h-px bg-slate-200" />

            <div id="governing-law" style={{ scrollMarginTop: '100px' }}>
              <div className="flex items-center gap-3 mb-6">
                <Globe size={18} className="text-amber" />
                <h2 className="text-2xl font-bold text-dirty-white tracking-tight">14. Governing Law & Dispute Resolution</h2>
              </div>
              <p className="mb-4">These Terms shall be governed by and construed in accordance with the laws of the Province of Ontario and the federal laws of Canada applicable therein. The courts at Toronto, Ontario shall have exclusive jurisdiction over any disputes arising from these Terms.</p>
              <p className="mb-4">Before initiating legal proceedings, the parties agree to attempt resolution through good-faith negotiation for a period of 30 days. If unresolved, disputes shall be submitted to arbitration under the Arbitration Act (Ontario), with a sole arbitrator appointed by mutual agreement.</p>
              <p>Nothing in this clause prevents either party from seeking urgent injunctive relief from a court of competent jurisdiction.</p>
            </div>

            <div className="h-px bg-slate-200" />

            <div id="changes" style={{ scrollMarginTop: '100px' }}>
              <h2 className="text-2xl font-bold text-dirty-white tracking-tight mb-6">15. Changes to Terms</h2>
              <p className="mb-4">We reserve the right to modify these Terms at any time. We will provide at least 14 days notice of material changes by email and via a prominent notice on the Platform. Your continued use after the effective date constitutes acceptance.</p>
              <p>Non-material changes (such as typographical corrections or clarifications) may be made without notice.</p>
            </div>

            <div className="h-px bg-slate-200" />

            <div id="contact" style={{ scrollMarginTop: '100px' }}>
              <h2 className="text-2xl font-bold text-dirty-white tracking-tight mb-6">16. Contact Us</h2>
              <div className="bg-amber/5 border border-amber/20 rounded-2xl p-8 space-y-3 shadow-sm text-slate-600">
                <div className="text-[10px] mono text-amber uppercase tracking-widest mb-4 font-semibold">Contact Details</div>
                <p><strong className="text-dirty-white">Company:</strong> {COMPANY}</p>
                <p><strong className="text-dirty-white">Platform:</strong> {BRAND}</p>
                <p><strong className="text-dirty-white">General Enquiries:</strong> <a href={`mailto:${CONTACT}`} className="text-amber hover:underline">{CONTACT}</a></p>
                <p><strong className="text-dirty-white">Legal & Compliance:</strong> <a href={`mailto:${LEGAL}`} className="text-amber hover:underline">{LEGAL}</a></p>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-10 text-center shadow-sm">
              <p className="text-slate-500 text-sm mb-6">Have a legal question or compliance concern?</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href={`mailto:${LEGAL}`} className="btn-molten px-8 h-[48px] inline-flex items-center gap-3 text-sm text-slate-900 font-bold">
                  <Mail size={14} /> {LEGAL}
                </a>
                <Link href="/privacy" className="btn-ghost px-8 h-[48px] inline-flex items-center gap-3 text-sm text-slate-700 hover:text-slate-900 border-slate-200 hover:bg-slate-50">
                  <Shield size={14} /> Privacy Policy
                </Link>
              </div>
            </div>

          </article>
        </div>
      </div>

      <Footer />
    </div>
  );
}
