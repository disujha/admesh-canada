'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, Bell, Mail, FileText, UserCheck, ArrowRight } from 'lucide-react';

const LAST_UPDATED = 'May 17, 2026';
const COMPANY = 'Rethela Technology Private Limited';
const BRAND = 'AdMesh';
const CONTACT = 'hello@admesh.co.in';
const LEGAL = 'legal@admesh.co.in';

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'data-we-collect', label: 'Data We Collect' },
  { id: 'how-we-use', label: 'How We Use Data' },
  { id: 'legal-basis', label: 'Legal Basis (DPDP Act)' },
  { id: 'your-rights', label: 'Your Rights' },
  { id: 'data-sharing', label: 'Data Sharing' },
  { id: 'data-retention', label: 'Data Retention' },
  { id: 'security', label: 'Security' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'children', label: 'Children\'s Privacy' },
  { id: 'grievance', label: 'Grievance Redressal' },
  { id: 'updates', label: 'Policy Updates' },
];

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className="min-h-screen bg-obsidian text-dirty-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-20 bg-obsidian overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 glowing-grid opacity-[0.04] pointer-events-none" />
        <div className="container-full relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-amber/40" />
              <span className="mono text-amber text-[11px] tracking-[0.5em] uppercase">Legal // Privacy</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-[0.9] text-dirty-white mb-6 uppercase">
              Privacy <span className="italic font-serif text-amber">Policy.</span>
            </h1>
            <p className="text-base text-white/40 font-light max-w-2xl leading-[1.9] mb-4">
              This Privacy Policy governs how {COMPANY} ("{BRAND}") collects, processes, stores, and protects your personal data. We are committed to full compliance with the <strong className="text-white/60">Digital Personal Data Protection (DPDP) Act, 2023</strong> of India.
            </p>
            <div className="flex flex-wrap gap-6 mt-8 text-[11px] mono text-white/30 uppercase tracking-widest">
              <span>Last Updated: {LAST_UPDATED}</span>
              <span>|</span>
              <span>Effective: {LAST_UPDATED}</span>
              <span>|</span>
              <span>Jurisdiction: India</span>
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
              <p className="text-[10px] mono text-white/20 uppercase tracking-widest mb-4">Contents</p>
              {sections.map((s) => (
                <a key={s.id} href={`#${s.id}`}
                  onClick={() => setActiveSection(s.id)}
                  className={`block text-sm py-1.5 px-3 rounded-lg transition-all duration-200 ${activeSection === s.id ? 'text-amber bg-amber/5 border-l-2 border-amber' : 'text-white/30 hover:text-white/60'}`}>
                  {s.label}
                </a>
              ))}
              <div className="mt-8 pt-8 border-t border-white/5">
                <a href={`mailto:${LEGAL}`} className="flex items-center gap-2 text-[11px] mono text-amber/50 hover:text-amber transition-colors uppercase tracking-widest">
                  <Mail size={12} /> {LEGAL}
                </a>
              </div>
            </div>
          </aside>

          {/* Content */}
          <article className="lg:col-span-9 space-y-16 text-sm text-white/55 leading-[1.9] font-light">

            {/* Overview */}
            <div id="overview" style={{ scrollMarginTop: '100px' }}>
              <div className="flex items-center gap-3 mb-6">
                <Shield size={18} className="text-amber/60" />
                <h2 className="text-2xl font-bold text-dirty-white tracking-tight">1. Overview</h2>
              </div>
              <p className="mb-4">{COMPANY} ("{BRAND}", "we", "our", "us") operates the AdMesh platform — a verified physical retail advertising network. We act as a <strong className="text-white/70">Data Fiduciary</strong> as defined under the Digital Personal Data Protection Act, 2023 (DPDP Act).</p>
              <p className="mb-4">This policy applies to all individuals who interact with our platform, including brand partners, store owners (Carriers), visitors to our website, and users of our dashboard applications.</p>
              <p>By using our services, you acknowledge that you have read, understood, and consented to the practices described in this policy. If you do not agree, please discontinue use of our services.</p>
            </div>

            <div className="h-px bg-white/5" />

            {/* Data We Collect */}
            <div id="data-we-collect" style={{ scrollMarginTop: '100px' }}>
              <div className="flex items-center gap-3 mb-6">
                <Database size={18} className="text-amber/60" />
                <h2 className="text-2xl font-bold text-dirty-white tracking-tight">2. Data We Collect</h2>
              </div>
              <p className="mb-6">We collect personal data only to the extent necessary to deliver our services. Under the DPDP Act, we practise <strong className="text-white/70">data minimisation</strong> — collecting only what is required for a specific, stated purpose.</p>

              <div className="space-y-6">
                {[
                  {
                    title: '2.1 Account & Identity Data',
                    items: ['Full name', 'Email address', 'Company name and designation', 'Phone number', 'GST / MSME registration number (Carrier accounts)'],
                  },
                  {
                    title: '2.2 Campaign & Business Data',
                    items: ['Campaign briefs, target geographies, and creative assets uploaded to the platform', 'Billing and invoicing information', 'Campaign performance data and analytics'],
                  },
                  {
                    title: '2.3 Location & Operational Data',
                    items: ['GPS coordinates of registered store nodes (Carrier accounts)', 'Photographic proof-of-display images captured by ground agents', 'Timestamp and device metadata associated with proof uploads'],
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
                  <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                    <h3 className="text-base font-bold text-dirty-white mb-4">{block.title}</h3>
                    <ul className="space-y-2">
                      {block.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-amber/40 mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-white/5" />

            {/* How We Use Data */}
            <div id="how-we-use" style={{ scrollMarginTop: '100px' }}>
              <div className="flex items-center gap-3 mb-6">
                <Eye size={18} className="text-amber/60" />
                <h2 className="text-2xl font-bold text-dirty-white tracking-tight">3. How We Use Your Data</h2>
              </div>
              <p className="mb-6">We use collected data strictly for the purposes disclosed at the time of collection. We do not use your personal data for purposes beyond those explicitly stated, consistent with the <strong className="text-white/70">purpose limitation</strong> principle of the DPDP Act.</p>
              <div className="space-y-3">
                {[
                  'To create and manage your AdMesh account',
                  'To process campaign orders, manage billing, and issue invoices',
                  'To verify and activate Carrier (store) nodes via GPS tagging and photo verification',
                  'To communicate campaign updates, performance reports, and account notifications',
                  'To send product updates, new features, or promotional communications (with your explicit consent, which can be withdrawn at any time)',
                  'To comply with legal obligations under applicable Indian law',
                  'To detect, prevent, and address fraud, security incidents, or misuse of our platform',
                  'To improve our services through aggregated, anonymised analytics',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-amber/50 mt-2 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-white/5" />

            {/* Legal Basis under DPDP */}
            <div id="legal-basis" style={{ scrollMarginTop: '100px' }}>
              <div className="flex items-center gap-3 mb-6">
                <FileText size={18} className="text-amber/60" />
                <h2 className="text-2xl font-bold text-dirty-white tracking-tight">4. Legal Basis for Processing (DPDP Act, 2023)</h2>
              </div>
              <p className="mb-6">Under the Digital Personal Data Protection Act, 2023, we process your personal data on the following lawful bases:</p>
              <div className="space-y-4">
                {[
                  { basis: 'Consent', desc: 'You have given free, specific, informed, and unambiguous consent for processing. Consent is obtained at the point of account creation or service enrolment. You may withdraw consent at any time by contacting us at ' + LEGAL + '.' },
                  { basis: 'Contract Performance', desc: 'Processing is necessary to deliver our services to you — including campaign deployment, Carrier node activation, and payment processing.' },
                  { basis: 'Legal Obligation', desc: 'We may process data to comply with applicable Indian laws, regulations, or court orders, including GST filing, KYC requirements, and responding to lawful government requests.' },
                  { basis: 'Legitimate Interests', desc: 'We process certain technical and usage data to maintain platform security, detect fraud, and improve service quality — where this does not override your fundamental rights.' },
                ].map((item, i) => (
                  <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                    <h3 className="text-sm font-bold text-amber mb-2">{item.basis}</h3>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-white/5" />

            {/* Your Rights */}
            <div id="your-rights" style={{ scrollMarginTop: '100px' }}>
              <div className="flex items-center gap-3 mb-6">
                <UserCheck size={18} className="text-amber/60" />
                <h2 className="text-2xl font-bold text-dirty-white tracking-tight">5. Your Rights as a Data Principal</h2>
              </div>
              <p className="mb-6">Under the DPDP Act, 2023, you (the Data Principal) have the following rights, which we are legally obligated to honour:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { right: 'Right to Access', desc: 'Request a summary of personal data we hold about you and how it is being processed.' },
                  { right: 'Right to Correction', desc: 'Request correction of inaccurate, incomplete, or outdated personal data.' },
                  { right: 'Right to Erasure', desc: 'Request deletion of your personal data, subject to legal retention obligations.' },
                  { right: 'Right to Grievance Redressal', desc: 'File a complaint with our Grievance Officer and receive a response within 48 hours.' },
                  { right: 'Right to Withdraw Consent', desc: 'Withdraw previously given consent for any processing activity at any time.' },
                  { right: 'Right to Nominate', desc: 'Nominate another individual to exercise your rights in the event of your death or incapacity.' },
                ].map((item, i) => (
                  <div key={i} className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
                    <h3 className="text-sm font-bold text-dirty-white mb-2">{item.right}</h3>
                    <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6">To exercise any of these rights, email us at <a href={`mailto:${LEGAL}`} className="text-amber hover:underline">{LEGAL}</a>. We will respond within <strong className="text-white/70">30 days</strong>, as required by the DPDP Act.</p>
            </div>

            <div className="h-px bg-white/5" />

            {/* Data Sharing */}
            <div id="data-sharing" style={{ scrollMarginTop: '100px' }}>
              <div className="flex items-center gap-3 mb-6">
                <Bell size={18} className="text-amber/60" />
                <h2 className="text-2xl font-bold text-dirty-white tracking-tight">6. Data Sharing & Disclosure</h2>
              </div>
              <p className="mb-4">We do not sell, rent, or trade your personal data. We may share data only in the following limited circumstances:</p>
              <div className="space-y-3">
                {[
                  { title: 'Service Providers', desc: 'We share data with trusted third-party processors (cloud hosting, payment gateways, analytics) who are contractually bound to handle data only under our instructions and in compliance with applicable law.' },
                  { title: 'Legal & Regulatory Compliance', desc: 'We may disclose data to government authorities, courts, or regulators when required by law, including responding to valid legal process.' },
                  { title: 'Business Transfers', desc: 'In the event of a merger, acquisition, or sale of assets, personal data may be transferred to the successor entity, subject to the same privacy protections.' },
                  { title: 'Aggregated Analytics', desc: 'We may share anonymised, aggregated data with partners or publish it publicly. This data cannot be used to identify any individual.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-5 bg-white/[0.02] border border-white/5 rounded-xl">
                    <span className="w-1 h-1 rounded-full bg-amber/50 mt-2 shrink-0" />
                    <div>
                      <strong className="text-white/70">{item.title}: </strong>{item.desc}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6"><strong className="text-white/70">Cross-border transfers:</strong> Where data is transferred outside India, we ensure appropriate safeguards are in place as per Section 16 of the DPDP Act and applicable rules notified by the Central Government.</p>
            </div>

            <div className="h-px bg-white/5" />

            {/* Data Retention */}
            <div id="data-retention" style={{ scrollMarginTop: '100px' }}>
              <h2 className="text-2xl font-bold text-dirty-white tracking-tight mb-6">7. Data Retention</h2>
              <p className="mb-4">We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, or as required by law. In general:</p>
              <div className="space-y-3 mb-4">
                {[
                  'Account data is retained for the duration of your active account plus 3 years after account closure.',
                  'Campaign and proof-of-display data is retained for 5 years for audit and legal compliance purposes.',
                  'Technical logs and usage data are retained for 12 months.',
                  'Financial and billing records are retained for 7 years as required under the Income Tax Act, 1961 and GST laws.',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-amber/40 mt-2 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p>Upon expiry of the retention period, data is securely deleted or anonymised in accordance with our data lifecycle management procedures.</p>
            </div>

            <div className="h-px bg-white/5" />

            {/* Security */}
            <div id="security" style={{ scrollMarginTop: '100px' }}>
              <div className="flex items-center gap-3 mb-6">
                <Lock size={18} className="text-amber/60" />
                <h2 className="text-2xl font-bold text-dirty-white tracking-tight">8. Security</h2>
              </div>
              <p className="mb-4">We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, disclosure, alteration, or destruction. These include:</p>
              <div className="space-y-2">
                {[
                  'AES-256 encryption at rest for all personal data stored on our servers',
                  'TLS 1.3 encryption in transit for all data communications',
                  'Role-based access controls restricting data access to authorised personnel only',
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
              <p className="mt-4">In the event of a personal data breach, we will notify affected Data Principals and the Data Protection Board of India as required under the DPDP Act.</p>
            </div>

            <div className="h-px bg-white/5" />

            {/* Cookies */}
            <div id="cookies" style={{ scrollMarginTop: '100px' }}>
              <h2 className="text-2xl font-bold text-dirty-white tracking-tight mb-6">9. Cookies & Tracking</h2>
              <p className="mb-4">We use cookies and similar tracking technologies to operate our platform and improve your experience. Cookie categories:</p>
              <div className="space-y-3">
                {[
                  { type: 'Strictly Necessary', desc: 'Required for the platform to function (session authentication, security). Cannot be disabled.' },
                  { type: 'Analytics', desc: 'Help us understand how the platform is used. Anonymised data only. Can be disabled.' },
                  { type: 'Preference', desc: 'Remember your settings and preferences across sessions. Can be disabled.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                    <div>
                      <strong className="text-white/70">{item.type}: </strong>{item.desc}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4">You may manage cookie preferences through your browser settings at any time.</p>
            </div>

            <div className="h-px bg-white/5" />

            {/* Children */}
            <div id="children" style={{ scrollMarginTop: '100px' }}>
              <h2 className="text-2xl font-bold text-dirty-white tracking-tight mb-6">10. Children's Privacy</h2>
              <p>Our services are not directed to children under the age of 18. We do not knowingly collect personal data from children. If you believe we have inadvertently collected data from a child, please contact us immediately at <a href={`mailto:${LEGAL}`} className="text-amber hover:underline">{LEGAL}</a> and we will promptly delete such data as required under Section 9 of the DPDP Act.</p>
            </div>

            <div className="h-px bg-white/5" />

            {/* Grievance Redressal */}
            <div id="grievance" style={{ scrollMarginTop: '100px' }}>
              <h2 className="text-2xl font-bold text-dirty-white tracking-tight mb-6">11. Grievance Redressal</h2>
              <p className="mb-6">As required by the DPDP Act, we have designated a <strong className="text-white/70">Grievance Officer</strong> to address any complaints or concerns regarding your personal data.</p>
              <div className="bg-amber/5 border border-amber/20 rounded-2xl p-8 space-y-3">
                <div className="text-[10px] mono text-amber/50 uppercase tracking-widest mb-4">Grievance Officer Details</div>
                <p><strong className="text-white/70">Organisation:</strong> {COMPANY}</p>
                <p><strong className="text-white/70">Platform:</strong> {BRAND}</p>
                <p><strong className="text-white/70">Email:</strong> <a href={`mailto:${LEGAL}`} className="text-amber hover:underline">{LEGAL}</a></p>
                <p><strong className="text-white/70">General Enquiries:</strong> <a href={`mailto:${CONTACT}`} className="text-amber hover:underline">{CONTACT}</a></p>
                <p><strong className="text-white/70">Response Time:</strong> We will acknowledge complaints within 48 hours and resolve within 30 days.</p>
              </div>
              <p className="mt-6">If your complaint is not resolved to your satisfaction, you may approach the <strong className="text-white/70">Data Protection Board of India</strong> as constituted under the DPDP Act, 2023.</p>
            </div>

            <div className="h-px bg-white/5" />

            {/* Updates */}
            <div id="updates" style={{ scrollMarginTop: '100px' }}>
              <h2 className="text-2xl font-bold text-dirty-white tracking-tight mb-6">12. Policy Updates</h2>
              <p className="mb-4">We may update this Privacy Policy from time to time. When we make material changes, we will notify you by email (to your registered address) and post a prominent notice on our platform at least 14 days before the changes take effect.</p>
              <p>Continued use of our services after the effective date of the revised policy constitutes your acceptance of the updated terms.</p>
            </div>

            {/* Contact CTA */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-10 text-center">
              <p className="text-white/40 text-sm mb-6">Questions about your data or this policy?</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href={`mailto:${LEGAL}`} className="btn-molten px-8 h-[48px] inline-flex items-center gap-3 text-sm">
                  <Mail size={14} /> {LEGAL}
                </a>
                <Link href="/terms" className="btn-ghost px-8 h-[48px] inline-flex items-center gap-3 text-sm">
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
