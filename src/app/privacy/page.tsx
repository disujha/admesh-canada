'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, Bell, Mail, FileText, UserCheck, ArrowRight } from 'lucide-react';

const LAST_UPDATED = 'June 14, 2026';
const COMPANY = 'AdMesh Technologies Inc.';
const BRAND = 'AdMesh';
const CONTACT = 'hello@admesh.ca';
const LEGAL = 'legal@admesh.ca';

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'data-we-collect', label: 'Data We Collect' },
  { id: 'how-we-use', label: 'How We Use Data' },
  { id: 'legal-basis', label: 'Legal Compliance (PIPEDA)' },
  { id: 'your-rights', label: 'Your Rights' },
  { id: 'data-sharing', label: 'Data Sharing' },
  { id: 'data-retention', label: 'Data Retention' },
  { id: 'security', label: 'Security' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'children', label: 'Children\'s Privacy' },
  { id: 'grievance', label: 'Privacy Officer Enquiries' },
  { id: 'updates', label: 'Policy Updates' },
];

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState('overview');

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
              <span className="mono text-amber text-[11px] tracking-[0.5em] uppercase">Legal // Privacy</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-[0.9] text-dirty-white mb-6 uppercase">
              Privacy <span className="italic font-serif text-amber">Policy.</span>
            </h1>
            <p className="text-base text-slate-500 font-light max-w-2xl leading-[1.9] mb-4">
              This Privacy Policy governs how {COMPANY} ("{BRAND}") collects, processes, stores, and protects your personal information. We are committed to full compliance with the <strong className="text-slate-700">Personal Information Protection and Electronic Documents Act (PIPEDA)</strong> of Canada, Quebec's Law 25, and other provincial privacy laws.
            </p>
            <div className="flex flex-wrap gap-6 mt-8 text-[11px] mono text-slate-400 uppercase tracking-widest">
              <span>Last Updated: {LAST_UPDATED}</span>
              <span>|</span>
              <span>Effective: {LAST_UPDATED}</span>
              <span>|</span>
              <span>Jurisdiction: Canada</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-full py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Sidebar nav */}
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

            {/* Overview */}
            <div id="overview" style={{ scrollMarginTop: '100px' }}>
              <div className="flex items-center gap-3 mb-6">
                <Shield size={18} className="text-amber" />
                <h2 className="text-2xl font-bold text-dirty-white tracking-tight">1. Overview</h2>
              </div>
              <p className="mb-4">{COMPANY} ("{BRAND}", "we", "our", "us") operates the AdMesh platform — a verified physical retail advertising network. We act as a <strong className="text-slate-800 font-semibold">Data Custodian / Organization</strong> responsible for safeguarding personal information under PIPEDA and applicable provincial rules.</p>
              <p className="mb-4">This policy applies to all individuals who interact with our platform, including brand partners, store owners (Carriers), visitors to our website, and users of our dashboard applications.</p>
              <p>By using our services, you acknowledge that you have read, understood, and consented to the practices described in this policy. If you do not agree, please discontinue use of our services.</p>
            </div>

            <div className="h-px bg-slate-200" />

            {/* Data We Collect */}
            <div id="data-we-collect" style={{ scrollMarginTop: '100px' }}>
              <div className="flex items-center gap-3 mb-6">
                <Database size={18} className="text-amber" />
                <h2 className="text-2xl font-bold text-dirty-white tracking-tight">2. Data We Collect</h2>
              </div>
              <p className="mb-6">We collect personal information only to the extent necessary to deliver our services. Under PIPEDA, we practice <strong className="text-slate-800 font-semibold">limiting collection</strong> — collecting only what is required for a specific, identified purpose.</p>

              <div className="space-y-6">
                {[
                  {
                    title: '2.1 Account & Identity Data',
                    items: ['Full name', 'Email address', 'Company name and designation', 'Phone number', 'Business license or registration information (Carrier accounts)'],
                  },
                  {
                    title: '2.2 Campaign & Business Data',
                    items: ['Campaign briefs, target geographies, and creative assets uploaded to the platform', 'Billing, invoicing, and bank deposit details', 'Campaign performance data and analytics'],
                  },
                  {
                    title: '2.3 Location & Operational Data',
                    items: ['GPS coordinates of registered store nodes (Carrier accounts)', 'Photographic proof-of-display images captured by field agents', 'Timestamp and device metadata associated with proof uploads'],
                  },
                  {
                    title: '2.4 Technical & Usage Data',
                    items: ['IP address, browser type, device identifiers', 'Pages visited, session duration, clickstream data', 'Error logs and diagnostic data for service improvement'],
                  },
                  {
                    title: '2.5 Communication Data',
                    items: ['Emails or messages sent to our support team', 'Form submissions (pilot requests, carrier registrations)', 'Survey responses or feedback provided voluntarily'],
                  },
                ].map((block, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-base font-bold text-dirty-white mb-4">{block.title}</h3>
                    <ul className="space-y-2 text-slate-500">
                      {block.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-amber/60 mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-slate-200" />

            {/* How We Use Data */}
            <div id="how-we-use" style={{ scrollMarginTop: '100px' }}>
              <div className="flex items-center gap-3 mb-6">
                <Eye size={18} className="text-amber" />
                <h2 className="text-2xl font-bold text-dirty-white tracking-tight">3. How We Use Your Data</h2>
              </div>
              <p className="mb-6">We use collected data strictly for the purposes disclosed at the time of collection. We do not use your personal information for purposes beyond those explicitly stated, consistent with the <strong className="text-slate-800 font-semibold">limiting use</strong> principle of PIPEDA.</p>
              <div className="space-y-3">
                {[
                  'To create and manage your AdMesh account',
                  'To process campaign orders, manage billing, and issue invoices',
                  'To verify and activate Carrier (store) nodes via GPS tagging and photo verification',
                  'To communicate campaign updates, performance reports, and account notifications',
                  'To send product updates, new features, or promotional communications (with your explicit consent, which can be withdrawn at any time)',
                  'To comply with tax laws and business regulations under Canadian federal and provincial laws',
                  'To detect, prevent, and address fraud, security incidents, or misuse of our platform',
                  'To improve our services through aggregated, anonymized analytics',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-amber/50 mt-2 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-slate-200" />

            {/* Legal Basis under PIPEDA */}
            <div id="legal-basis" style={{ scrollMarginTop: '100px' }}>
              <div className="flex items-center gap-3 mb-6">
                <FileText size={18} className="text-amber" />
                <h2 className="text-2xl font-bold text-dirty-white tracking-tight">4. Compliance Framework (PIPEDA & Quebec Law 25)</h2>
              </div>
              <p className="mb-6">We adhere to the 10 Fair Information Principles of PIPEDA and specific requirements under Quebec's Law 25:</p>
              <div className="space-y-4">
                {[
                  { basis: 'Consent & Control', desc: 'Consent is obtained before or at the time of collection. Under Quebec Law 25, consent must be manifest, free, specific, and informed. You may withdraw consent at any time.' },
                  { basis: 'Identifying Purposes', desc: 'We identify the purposes for which personal information is collected before or at the time of collection.' },
                  { basis: 'Safeguards', desc: 'We protect personal information with security safeguards appropriate to the sensitivity of the information, including AES-256 encryption.' },
                  { basis: 'Accountability', desc: 'Our designated Privacy Officer is responsible for our overall compliance and is available to respond to your privacy questions.' },
                ].map((item, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-amber mb-2">{item.basis}</h3>
                    <p className="text-slate-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-slate-200" />

            {/* Your Rights */}
            <div id="your-rights" style={{ scrollMarginTop: '100px' }}>
              <div className="flex items-center gap-3 mb-6">
                <UserCheck size={18} className="text-amber" />
                <h2 className="text-2xl font-bold text-dirty-white tracking-tight">5. Your Rights as an Information Subject</h2>
              </div>
              <p className="mb-6">Under PIPEDA and Law 25, you have significant rights regarding your personal information:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { right: 'Right to Access', desc: 'Request details of the personal information we hold about you and how it is being processed.' },
                  { right: 'Right to Rectification', desc: 'Request correction of inaccurate, incomplete, or outdated personal information.' },
                  { right: 'Right to Erasure (De-indexing)', desc: 'Request deletion or cessation of dissemination of your personal data under certain conditions.' },
                  { right: 'Right to Portability', desc: 'Receive your personal information in a structured, commonly used technology format.' },
                  { right: 'Right to Withdraw Consent', desc: 'Withdraw previously given consent for any processing activity at any time.' },
                  { right: 'Right to File Complaint', desc: 'File a complaint with our Privacy Officer or with the Office of the Privacy Commissioner of Canada (OPC).' },
                ].map((item, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                    <h3 className="text-sm font-bold text-dirty-white mb-2">{item.right}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6">To exercise any of these rights, email us at <a href={`mailto:${LEGAL}`} className="text-amber hover:underline">{LEGAL}</a>. We will respond within <strong className="text-slate-700">30 days</strong>, as required by law.</p>
            </div>

            <div className="h-px bg-slate-200" />

            {/* Data Sharing */}
            <div id="data-sharing" style={{ scrollMarginTop: '100px' }}>
              <div className="flex items-center gap-3 mb-6">
                <Bell size={18} className="text-amber" />
                <h2 className="text-2xl font-bold text-dirty-white tracking-tight">6. Data Sharing & Disclosure</h2>
              </div>
              <p className="mb-4">We do not sell, rent, or trade your personal information. We may share data only in the following limited circumstances:</p>
              <div className="space-y-3">
                {[
                  { title: 'Service Providers', desc: 'We share data with trusted third-party processors (cloud hosting, payment processors, analytics) who are contractually bound to handle data under our instructions and in compliance with Canadian laws.' },
                  { title: 'Legal Compliance', desc: 'We may disclose data to Canadian law enforcement or government authorities when required by law or a valid subpoena/court order.' },
                  { title: 'Business Transfers', desc: 'In the event of a merger, acquisition, or sale of assets, personal information may be transferred to the successor entity, subject to equivalent privacy protections.' },
                  { title: 'Aggregated Analytics', desc: 'We may share anonymized, aggregated data with partners. This data cannot be used to identify any individual.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-5 bg-slate-50 border border-slate-200 rounded-xl shadow-sm text-slate-500">
                    <span className="w-1 h-1 rounded-full bg-amber/50 mt-2 shrink-0" />
                    <div>
                      <strong className="text-dirty-white font-semibold">{item.title}: </strong>{item.desc}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6"><strong className="text-slate-700 font-semibold">Cross-border transfers:</strong> Where data is stored or processed outside your home province or Canada (e.g. on cloud platforms), it is subject to the laws of that jurisdiction. Under Quebec Law 25, we conduct Privacy Impact Assessments before transferring information outside of Quebec.</p>
            </div>

            <div className="h-px bg-slate-200" />

            {/* Data Retention */}
            <div id="data-retention" style={{ scrollMarginTop: '100px' }}>
              <h2 className="text-2xl font-bold text-dirty-white tracking-tight mb-6">7. Data Retention</h2>
              <p className="mb-4">We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, or as required by law. In general:</p>
              <div className="space-y-3 mb-4">
                {[
                  'Account data is retained for the duration of your active account plus 3 years after account closure.',
                  'Campaign and proof-of-display data is retained for 7 years for audit and tax compliance purposes.',
                  'Technical logs and usage data are retained for 12 months.',
                  'Financial and billing records are retained for 7 years as required by the Canada Revenue Agency (CRA).',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-amber/40 mt-2 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p>Upon expiry of the retention period, data is securely deleted or anonymized in accordance with our data lifecycle management procedures.</p>
            </div>

            <div className="h-px bg-slate-200" />

            {/* Security */}
            <div id="security" style={{ scrollMarginTop: '100px' }}>
              <div className="flex items-center gap-3 mb-6">
                <Lock size={18} className="text-amber" />
                <h2 className="text-2xl font-bold text-dirty-white tracking-tight">8. Security</h2>
              </div>
              <p className="mb-4">We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, disclosure, alteration, or destruction. These include:</p>
              <div className="space-y-2">
                {[
                  'AES-256 encryption at rest for all personal data stored on our servers',
                  'TLS 1.3 encryption in transit for all data communications',
                  'Role-based access controls restricting data access to authorized personnel only',
                  'Regular security audits and vulnerability assessments',
                  'Cryptographic blockchain sealing of proof-of-display records',
                  'Multi-factor authentication for platform administrator accounts',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-amber/40 mt-2 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4">In the event of a personal information breach that poses a real risk of significant harm, we will notify affected individuals and the Office of the Privacy Commissioner of Canada (OPC) or relevant provincial authorities as required by law.</p>
            </div>

            <div className="h-px bg-slate-200" />

            {/* Cookies */}
            <div id="cookies" style={{ scrollMarginTop: '100px' }}>
              <h2 className="text-2xl font-bold text-dirty-white tracking-tight mb-6">9. Cookies & Tracking</h2>
              <p className="mb-4">We use cookies and similar tracking technologies to operate our platform and improve your experience. Cookie categories:</p>
              <div className="space-y-3">
                {[
                  { type: 'Strictly Necessary', desc: 'Required for the platform to function (session authentication, security). Cannot be disabled.' },
                  { type: 'Analytics', desc: 'Help us understand how the platform is used. Anonymized data only. Can be disabled.' },
                  { type: 'Preference', desc: 'Remember your settings and preferences across sessions. Can be disabled.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl shadow-sm text-slate-500">
                    <div>
                      <strong className="text-dirty-white font-semibold">{item.type}: </strong>{item.desc}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4">You may manage cookie preferences through your browser settings at any time.</p>
            </div>

            <div className="h-px bg-slate-200" />

            {/* Children */}
            <div id="children" style={{ scrollMarginTop: '100px' }}>
              <h2 className="text-2xl font-bold text-dirty-white tracking-tight mb-6">10. Children's Privacy</h2>
              <p>Our services are not directed to children under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected data from a child, please contact us immediately at <a href={`mailto:${LEGAL}`} className="text-amber hover:underline">{LEGAL}</a> and we will promptly delete such data.</p>
            </div>

            <div className="h-px bg-slate-200" />

            {/* Privacy Officer */}
            <div id="grievance" style={{ scrollMarginTop: '100px' }}>
              <h2 className="text-2xl font-bold text-dirty-white tracking-tight mb-6">11. Privacy Officer</h2>
              <p className="mb-6">We have designated a Privacy Officer responsible for addressing inquiries, concerns, and access requests regarding your personal information.</p>
              <div className="bg-amber/5 border border-amber/20 rounded-2xl p-8 space-y-3 shadow-sm text-slate-600">
                <div className="text-[10px] mono text-amber uppercase tracking-widest mb-4 font-semibold">Privacy Officer Details</div>
                <p><strong className="text-dirty-white">Organization:</strong> {COMPANY}</p>
                <p><strong className="text-dirty-white">Platform:</strong> {BRAND}</p>
                <p><strong className="text-dirty-white">Email:</strong> <a href={`mailto:${LEGAL}`} className="text-amber hover:underline">{LEGAL}</a></p>
                <p><strong className="text-dirty-white">General Enquiries:</strong> <a href={`mailto:${CONTACT}`} className="text-amber hover:underline">{CONTACT}</a></p>
                <p><strong className="text-dirty-white">Response Time:</strong> We will acknowledge all requests within 48 hours and resolve or provide a formal response within 30 days.</p>
              </div>
            </div>

            <div className="h-px bg-slate-200" />

            {/* Updates */}
            <div id="updates" style={{ scrollMarginTop: '100px' }}>
              <h2 className="text-2xl font-bold text-dirty-white tracking-tight mb-6">12. Policy Updates</h2>
              <p className="mb-4">We may update this Privacy Policy from time to time. When we make material changes, we will notify you by email (to your registered address) and post a prominent notice on our platform at least 14 days before the changes take effect.</p>
              <p>Continued use of our services after the effective date of the revised policy constitutes your acceptance of the updated terms.</p>
            </div>

            {/* Contact CTA */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-10 text-center shadow-sm">
              <p className="text-slate-500 text-sm mb-6">Questions about your data or this policy?</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href={`mailto:${LEGAL}`} className="btn-molten px-8 h-[48px] inline-flex items-center gap-3 text-sm text-slate-900 font-bold">
                  <Mail size={14} /> {LEGAL}
                </a>
                <Link href="/terms" className="btn-ghost px-8 h-[48px] inline-flex items-center gap-3 text-sm text-slate-700 hover:text-slate-900 border-slate-200 hover:bg-slate-50">
                  <FileText size={14} /> Terms of Service
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
