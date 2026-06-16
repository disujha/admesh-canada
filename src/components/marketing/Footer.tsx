'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0A1A2C] border-t border-[#F1EFE6]/10 w-full enterprise-footer pt-[60px] pb-[60px] relative overflow-hidden">
      
      {/* Footer Left Margin Rail Continuation (Desktop only) */}
      <div className="hidden lg:flex absolute left-0 top-0 bottom-0 w-[5vw] border-r border-[#F1EFE6]/10 flex-col items-center justify-between py-16 select-none pointer-events-none font-mono text-[9px] uppercase tracking-[0.25em] text-[#52617A]">
        <div style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          END OF MANIFEST — ADMESH TECHNOLOGIES INC.
        </div>
        <div className="text-[#FFB300] font-bold">
          [ CA.MANIFEST // EOF ]
        </div>
      </div>

      <div className="container-full">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[64px] pb-[60px]">
          
          {/* Brand Info (Left 5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link href="/" className="flex items-center gap-3 mb-6 decoration-none">
                <img src="/icon_transparent.png" alt="AdMesh Logo" className="w-7 h-7 object-contain" />
                <span className="text-sm font-semibold text-[#F1EFE6] tracking-[0.22em] uppercase font-mono">ADMESH</span>
              </Link>
              <p className="text-[20px] font-bold text-[#F1EFE6] tracking-tight leading-tight max-w-sm mb-4">
                Canada's Retail Media Network.
              </p>
              <p className="text-[12px] text-[#52617A] leading-relaxed max-w-sm font-mono uppercase tracking-wider">
                The infrastructure connecting brands, distributors, and independent storefronts into a unified physical advertising ecosystem.
              </p>
            </div>
          </div>

          {/* Directory Links (Right 7 Columns) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-[48px]">
            
            {/* Platform Links */}
            <div>
              <span className="text-[10px] font-bold text-[#52617A] uppercase tracking-[0.18em] mb-6 block font-mono">[ PLATFORM ]</span>
              <ul className="space-y-4 list-none p-0 m-0 font-mono text-[11px]">
                <li>
                  <Link href="/brand-portal" className="text-[#F1EFE6]/80 hover:text-[#FFB300] transition-colors uppercase tracking-wider decoration-none block py-1">
                    Brand Portal
                  </Link>
                </li>
                <li>
                  <Link href="/carrier-network" className="text-[#F1EFE6]/80 hover:text-[#FFB300] transition-colors uppercase tracking-wider decoration-none block py-1">
                    Retailer Portal
                  </Link>
                </li>
                <li>
                  <Link href="/distributors" className="text-[#F1EFE6]/80 hover:text-[#FFB300] transition-colors uppercase tracking-wider decoration-none block py-1">
                    Distributor Program
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <span className="text-[10px] font-bold text-[#52617A] uppercase tracking-[0.18em] mb-6 block font-mono">[ COMPANY ]</span>
              <ul className="space-y-4 list-none p-0 m-0 font-mono text-[11px]">
                <li>
                  <Link href="/about" className="text-[#F1EFE6]/80 hover:text-[#FFB300] transition-colors uppercase tracking-wider decoration-none block py-1">
                    About AdMesh
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-[#F1EFE6]/80 hover:text-[#FFB300] transition-colors uppercase tracking-wider decoration-none block py-1">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <span className="text-[10px] font-bold text-[#52617A] uppercase tracking-[0.18em] mb-6 block font-mono">[ LEGAL ]</span>
              <ul className="space-y-4 list-none p-0 m-0 font-mono text-[11px]">
                <li>
                  <Link href="/privacy" className="text-[#F1EFE6]/80 hover:text-[#FFB300] transition-colors uppercase tracking-wider decoration-none block py-1">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-[#F1EFE6]/80 hover:text-[#FFB300] transition-colors uppercase tracking-wider decoration-none block py-1">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#F1EFE6]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 font-mono text-[10px]">
          <p className="text-[#52617A] uppercase tracking-wider m-0">
            © 2026 AdMesh Technologies Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-8 text-[#52617A] uppercase tracking-wider">
            <a href="#" className="text-[#F1EFE6] hover:text-[#FFB300] transition-colors inline-flex items-center gap-1.5 decoration-none">
              LinkedIn <ArrowUpRight size={12} />
            </a>
            <a href="#" className="text-[#F1EFE6] hover:text-[#FFB300] transition-colors inline-flex items-center gap-1.5 decoration-none">
              X <ArrowUpRight size={12} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
