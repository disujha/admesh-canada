'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-obsidian pt-28 lg:pt-36 pb-20 lg:pb-24 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 glowing-grid opacity-[0.025] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian/70 to-obsidian pointer-events-none" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[880px] h-[400px] bg-amber/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-full relative z-10">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl px-7 py-9 lg:px-10 lg:py-10 mb-16 lg:mb-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-10">
          <div>
            <p className="mono text-[10px] tracking-[0.28em] text-white/35 uppercase mb-3">Network Ready</p>
            <h3 className="text-2xl lg:text-3xl font-bold text-dirty-white tracking-tight leading-tight">
              Ready to launch your next <span className="text-amber italic font-serif">retail media burst?</span>
            </h3>
          </div>
          <div className="flex flex-wrap gap-3 pt-2 lg:pt-3">
            <Link href="/pricing" className="btn-ghost h-[50px] px-6 text-[11px] tracking-[0.14em]">
              View Pricing
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 pb-14 lg:pb-16 border-b border-white/5">
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <img src="/icon_transparent.png" alt="AdMesh Logo" className="w-10 h-10 object-contain" />
              <span className="text-2xl font-bold text-amber tracking-tighter uppercase italic font-serif">ADMESH.</span>
            </Link>
            <p className="text-white/55 text-[15px] leading-8 max-w-lg">
              Verified physical retail media infrastructure for brands that need measurable neighborhood reach and accountable deployment outcomes.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-12">
            <div>
              <h4 className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.28em] mb-5">Platform</h4>
              <ul className="space-y-4">
                <li><Link href="/#formats" className="text-sm text-white/60 hover:text-amber transition-colors">Ad Formats</Link></li>
                <li><Link href="/#targeting" className="text-sm text-white/60 hover:text-amber transition-colors">Targeting</Link></li>
                <li><Link href="/#verification" className="text-sm text-white/60 hover:text-amber transition-colors">Verification</Link></li>
                <li><Link href="/#network-live" className="text-sm text-white/60 hover:text-amber transition-colors">Live Network</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.28em] mb-5">Company</h4>
              <ul className="space-y-4">
                <li><Link href="/about" className="text-sm text-white/60 hover:text-amber transition-colors">About</Link></li>
                <li><Link href="/carrier-network" className="text-sm text-white/60 hover:text-amber transition-colors">Carrier Network</Link></li>
                <li><Link href="/brand-portal" className="text-sm text-white/60 hover:text-amber transition-colors">Brand Portal</Link></li>
                <li><Link href="/pricing" className="text-sm text-white/60 hover:text-amber transition-colors">Pricing</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.28em] mb-5">Legal</h4>
              <ul className="space-y-4">
                <li><Link href="/privacy" className="text-sm text-white/60 hover:text-amber transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-sm text-white/60 hover:text-amber transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-10 lg:pt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 lg:gap-8">
          <p className="text-[11px] text-white/30 mono uppercase tracking-[0.2em]">
            © 2026 Rethela Technology Pvt Ltd.
          </p>

          <div className="flex items-center gap-6 text-[10px] mono font-bold text-white/40 uppercase tracking-[0.18em]">
            <Link href="#" className="hover:text-amber transition-colors inline-flex items-center gap-1.5">
              LinkedIn <ArrowUpRight size={11} />
            </Link>
            <Link href="#" className="hover:text-amber transition-colors inline-flex items-center gap-1.5">
              X <ArrowUpRight size={11} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

