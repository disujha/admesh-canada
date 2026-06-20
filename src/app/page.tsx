'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import CustomCursor from '@/components/marketing/CustomCursor';
import BrandMarquee from '@/components/marketing/BrandMarquee';
import NetworkMap from '@/components/marketing/NetworkMap';
import PhoneAuthModal from '@/components/marketing/PhoneAuthModal';
import RetailAdFormats from '@/components/marketing/RetailAdFormats';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';

// Ticking counter component for network statistics
const TickingCounter = ({ target, duration = 1200, suffix = "", decimals = 0 }: { target: number, duration?: number, suffix?: string, decimals?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(progress * target);
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };
    
    const delayTimer = setTimeout(() => {
      animationFrameId = window.requestAnimationFrame(step);
    }, 1200); // Trigger counting after boot animation completes

    return () => {
      clearTimeout(delayTimer);
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, [target, duration]);

  const formattedValue = decimals > 0 
    ? count.toFixed(decimals)
    : Math.floor(count).toLocaleString();

  return <span>{formattedValue}{suffix}</span>;
};

const LandingPage = () => {
  const [loading, setLoading] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const goToDashboardWithLoader = React.useCallback(() => {
    setLoading(true);
    router.push('/dashboard');
  }, [router]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('plan=true')) {
      setIsAuthOpen(true);
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, []);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('admesh_loaded');
    if (!hasLoaded) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('admesh_loaded', 'true');
      }, 1600); // System boot-up latency
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="relative bg-[#F1EFE6] text-[#11233B] min-h-screen selection:bg-[#FFB300] selection:text-[#0A1A2C] font-sans antialiased overflow-x-hidden">
      
      {/* Persistent Left Margin Rail (Desktop only) */}
      <div className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[5vw] border-r border-[#11233B]/10 flex-col items-center justify-between py-24 z-40 select-none pointer-events-none font-mono text-[9px] uppercase tracking-[0.25em] text-[#52617A]">
        <div style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          ADMESH — FIELD MANIFEST — 2026
        </div>
        <div style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }} className="text-[#FFB300] font-bold">
          [ SYS.STATUS // OPERATIONAL ]
        </div>
      </div>

      {/* 3D Octagonal System Boot-Up Sequence */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[1000] bg-[#0A1A2C] flex flex-col items-center justify-center text-[#F1EFE6]"
          >
            <div className="octa-loader mb-8">
              <div className="octa-ring octa-ring-outer" />
              <div className="octa-ring octa-ring-mid" />
              <div className="octa-ring octa-ring-inner" />
              <div className="octa-core" />
            </div>
            <span className="text-[10px] tracking-[0.45em] text-[#FFB300] font-mono font-semibold uppercase mb-2">
              ADMESH OPERATING SYSTEM INITIALIZATION
            </span>
            <span className="text-[8px] tracking-[0.25em] text-[#52617A] font-mono uppercase">
              ESTABLISHING VERIFIED PHYSICAL NETWORK PROTOCOLS // BOOTING v2.6
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <CustomCursor />
      <Navbar onPlanClick={() => setIsAuthOpen(true)} onDashboardClick={goToDashboardWithLoader} />
      
      {/* Main content wrapper */}
      <main className="w-full lg:pl-[5vw]">
        
        {/* SECTION 1: HERO (Asymmetrical 58/42 Split) */}
        <section id="network" className="enterprise-hero w-full bg-[#F1EFE6]">
          <div className="container-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[48px] items-center">
              
              {/* Left 7 columns (58%): OS Editorial Copy + Ticking Stats */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <span className="os-label mb-4 block text-[#FFB300]">[ NATIONAL NETWORK ]</span>
                
                <h1 className="font-sans text-[#11233B] mb-8 uppercase leading-[0.95] tracking-tight">
                  <span className="block text-3xl lg:text-5xl font-medium opacity-85 mb-2">Canada's</span>
                  <span className="block text-5xl lg:text-[76px] font-black">Retail Media Network.</span>
                </h1>

                <p className="text-lg lg:text-[20px] text-[#52617A] font-light leading-relaxed max-w-[54ch] mb-8">
                  Connect your brand with thousands of verified storefront locations across Canada. Plan, deploy, and verify physical advertising campaigns at scale.
                </p>                <div className="flex flex-wrap items-center gap-8 mb-10">
                  <button
                    onClick={() => setIsAuthOpen(true)}
                    className="btn-primary"
                  >
                    {/* Small technical status indicator dot */}
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0A1A2C] mr-2 inline-block animate-pulse"></span>
                    Book a Demo
                  </button>
                  {/* SECONDARY CTA — referencing btn-secondary class */}
                  <a
                    href="#coverage"
                    className="btn-secondary"
                  >
                    Explore the Network <ArrowRight size={12} className="opacity-70 stroke-[2.5]" />
                  </a>
                </div>

                {/* Hero Stat Strip (Left Column) */}
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#11233B]/10 w-full font-mono text-left">
                  <div>
                    <span className="block text-[#52617A] text-[9px] uppercase tracking-wider mb-1 font-semibold">CONNECTED NODES</span>
                    <span className="text-2xl font-bold text-[#11233B] font-mono">
                      <TickingCounter target={35214} />
                    </span>
                  </div>
                  <div>
                    <span className="block text-[#52617A] text-[9px] uppercase tracking-wider mb-1 font-semibold">ACTIVE CAMPAIGNS</span>
                    <span className="text-2xl font-bold text-[#11233B] font-mono">
                      <TickingCounter target={842} />
                    </span>
                  </div>
                  <div>
                    <span className="block text-[#52617A] text-[9px] uppercase tracking-wider mb-1 font-semibold">MONTHLY REACH</span>
                    <span className="text-2xl font-bold text-[#11233B] font-mono">
                      <TickingCounter target={18.5} decimals={1} suffix="M" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Right 5 columns (42%): Ledger Map Dashboard Panel */}
              <div className="lg:col-span-5">
                <div className="w-full bg-[#0A1A2C] border border-[#FFB300]/25 p-5 relative flex flex-col justify-between overflow-hidden" style={{ height: '460px' }}>
                  {/* Subtle background retail environment video feed loop */}
                  <div className="absolute inset-0 z-0 opacity-15 pointer-events-none mix-blend-screen">
                    <video autoPlay muted loop playsInline className="w-full h-full object-cover filter grayscale">
                      <source src="/videos/hero-retail-loop.webm" type="video/webm" />
                    </video>
                  </div>

                  {/* Telemetry Header */}
                  <div className="flex items-center justify-between border-b border-[#F1EFE6]/10 pb-3 mb-3 font-mono text-[9px] uppercase tracking-wider text-[#52617A] z-10">
                    <div className="flex items-center gap-2">
                      <span className="live-beacon"></span>
                      <span className="text-[#FFB300] font-bold">LEDGER MAP v2.6 // LIVE</span>
                    </div>
                    <div>CA.GRID // SECURE</div>
                  </div>
                  
                  {/* Pulsing Interactive Network Canvas */}
                  <div className="flex-1 relative overflow-hidden z-10">
                    <NetworkMap />
                  </div>

                  {/* Telemetry Footer */}
                  <div className="border-t border-[#F1EFE6]/10 pt-3 mt-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-[#52617A] z-10">
                    <div>LOC.SCAN: ACTIVE</div>
                    <div className="text-[#FFB300] font-bold">VERIFIED NODE STREAM</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* PARTNER BRAND MARQUEE */}
        <BrandMarquee />

        {/* SECTION 2: RETAIL MEDIA OPPORTUNITY (Asymmetric 58/42 Grid Split - Image Left, Copy Right) */}
        <section className="enterprise-section w-full bg-[#F1EFE6] border-t border-[#11233B]/10">
          <div className="container-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[64px] items-center">
              
              {/* Left 7 columns (58%): Cropped Storefront Interior Photo wrapped in Amber Corner Reticle */}
              <div className="lg:col-span-7">
                <div className="relative">
                  <div className="reticle-frame bg-[#0A1A2C] shadow-lg">
                    <div className="reticle-frame-inner"></div>
                    <img 
                      src="/images/admesh-smart-digital-screen.jpeg" 
                      alt="Cropped storefront interior digital screen node" 
                      className="w-full aspect-[16/10] object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div className="mt-3 font-mono text-[10px] uppercase tracking-wider text-[#52617A] flex justify-between">
                    <span>[ NODE #11054 // INTERIOR DIGITAL MEDIA NODE // ACTIVE ]</span>
                    <span className="text-[#FFB300] flex items-center gap-1.5 font-bold">
                      <span className="live-beacon"></span> VERIFIED · 06.16.2026
                    </span>
                  </div>
                </div>
              </div>

              {/* Right 5 columns (42%): Copy Block */}
              <div className="lg:col-span-5 flex flex-col items-start">
                <span className="os-label mb-4 block text-[#FFB300]">[ OPPORTUNITY ]</span>
                <h2 className="font-sans font-bold text-[#11233B] text-2xl lg:text-3xl tracking-tight leading-snug mb-6 uppercase">
                  The physical retail opportunity.
                </h2>
                <p className="text-lg text-[#52617A] font-light leading-relaxed mb-6">
                  Modern brands face escalating digital advertising costs and fragmenting online attention. AdMesh unlocks a physical advertising channel inside neighborhood transaction paths—where consumers are active, focused, and ready to buy.
                </p>
                <p className="text-sm text-[#52617A] font-light leading-relaxed">
                  We route campaign assets through verified retail outlets, mapping audience footfall coordinates directly to offline display real estate.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 3: SYSTEM OPERATIONS (3-Column Vertical Step Cards on Darker Containment Background) */}
        <section className="enterprise-section w-full bg-[#E7E5DB] border-t border-[#11233B]/10">
          <div className="container-full">
            <div className="max-w-3xl mb-[48px]">
              <span className="os-label mb-4 block text-[#FFB300]">[ OPERATIONS ]</span>
              <h2 className="font-sans font-bold text-[#11233B] text-2xl lg:text-3xl tracking-tight leading-snug uppercase">
                How the network works.
              </h2>
            </div>

            {/* 3 Step Cards using Looping Operational Videos framed inside Amber Reticles */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-[32px]">
              
              {/* Card 1: Brand Configuration */}
              <div className="flex flex-col bg-[#F1EFE6] p-5 border border-[#11233B]/10">
                <div className="relative mb-6">
                  <div className="reticle-frame aspect-[4/3] bg-[#0A1A2C]">
                    <div className="reticle-frame-inner"></div>
                    <video 
                      autoPlay 
                      muted 
                      loop 
                      playsInline 
                      className="w-full h-full object-cover"
                      style={{ filter: 'brightness(1.15) contrast(1.1)' }}
                    >
                      <source src="/videos/admesh-intro.mp4" type="video/mp4" />
                    </video>
                  </div>
                  <div className="mt-2 font-mono text-[9px] uppercase tracking-wider text-[#52617A]">
                    [ SYSTEM FEED // ESTIMATION_PANEL_v1.9 ]
                  </div>
                </div>
                
                <span className="os-label-muted mb-2 block font-semibold">[ STAGE 01 // PLANNING ]</span>
                <h3 className="text-lg font-bold text-[#11233B] mb-3 uppercase tracking-tight font-sans">Brand Configuration</h3>
                <p className="text-sm text-[#52617A] font-light leading-relaxed">
                  Brands plan target footprints and configure campaign budgets through a unified programmatic portal, estimating reach coordinates.
                </p>
              </div>

              {/* Card 2: Logistical Routing */}
              <div className="flex flex-col bg-[#F1EFE6] p-5 border border-[#11233B]/10">
                <div className="relative mb-6">
                  <div className="reticle-frame aspect-[4/3] bg-[#0A1A2C]">
                    <div className="reticle-frame-inner"></div>
                    <video 
                      autoPlay 
                      muted 
                      loop 
                      playsInline 
                      className="w-full h-full object-cover"
                      style={{ filter: 'brightness(1.15) contrast(1.1)' }}
                    >
                      <source src="/videos/deploy.webm" type="video/webm" />
                    </video>
                  </div>
                  <div className="mt-2 font-mono text-[9px] uppercase tracking-wider text-[#52617A]">
                    [ SYSTEM FEED // DISTRIBUTOR_FLOW_LOCK ]
                  </div>
                </div>
                
                <span className="os-label-muted mb-2 block font-semibold">[ STAGE 02 // ROUTING ]</span>
                <h3 className="text-lg font-bold text-[#11233B] mb-3 uppercase tracking-tight font-sans">Logistical Deployment</h3>
                <p className="text-sm text-[#52617A] font-light leading-relaxed">
                  Regional distribution partners coordinate logistical routing and install physical display materials at verified store nodes.
                </p>
              </div>

              {/* Card 3: Retail Monetization */}
              <div className="flex flex-col bg-[#F1EFE6] p-5 border border-[#11233B]/10">
                <div className="relative mb-6">
                  <div className="reticle-frame aspect-[4/3] bg-[#0A1A2C]">
                    <div className="reticle-frame-inner"></div>
                    <video 
                      autoPlay 
                      muted 
                      loop 
                      playsInline 
                      className="w-full h-full object-cover"
                      style={{ filter: 'brightness(1.15) contrast(1.1)' }}
                    >
                      <source src="/videos/verification-terminal-loop.webm" type="video/webm" />
                    </video>
                  </div>
                  <div className="mt-2 font-mono text-[9px] uppercase tracking-wider text-[#52617A]">
                    [ SYSTEM FEED // TERMINAL_OUTPUT_VERIFIED ]
                  </div>
                </div>
                
                <span className="os-label-muted mb-2 block font-semibold">[ STAGE 03 // EXECUTION ]</span>
                <h3 className="text-lg font-bold text-[#11233B] mb-3 uppercase tracking-tight font-sans">Retail Execution</h3>
                <p className="text-sm text-[#52617A] font-light leading-relaxed">
                  Store owners host campaign placements, monetizing prime spaces while providing brands with verified, street-level media access.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 4: RETAIL AD FORMATS */}
        <RetailAdFormats />

        {/* SECTION 5: NATIONAL SCALE (Full-Bleed Field Navy Panel - 58/42 Grid) */}
        <section id="coverage" className="enterprise-section w-full bg-[#0A1A2C] border-t border-[#11233B]/10 text-[#F1EFE6]">
          <div className="container-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[48px] items-center">
              
              {/* Left 7 columns (58%): Canada Network Video Loop */}
              <div className="lg:col-span-7">
                <div className="relative">
                  <div className="reticle-frame bg-[#0A1A2C] border-[#FFB300]/40 shadow-2xl">
                    <div className="reticle-frame-inner"></div>
                    <video 
                      autoPlay 
                      muted 
                      loop 
                      playsInline 
                      className="w-full aspect-[16/10] object-cover opacity-95"
                    >
                      <source src="/videos/admesh-network.webm" type="video/webm" />
                    </video>
                  </div>
                  <div className="mt-3 font-mono text-[10px] uppercase tracking-wider text-[#52617A] flex justify-between">
                    <span>[ LEDGER MAP FEED // CA.SYS.SCALE ]</span>
                    <span className="text-[#FFB300] font-bold">LIVE BROADCAST</span>
                  </div>
                </div>
              </div>

              {/* Right 5 columns (42%): Headline and Stats directly on the dark field */}
              <div className="lg:col-span-5 flex flex-col items-start">
                <span className="os-label mb-4 block text-[#FFB300]">[ SCALE ]</span>
                
                <h2 className="font-sans font-bold text-[#F1EFE6] text-3xl lg:text-[48px] tracking-tight leading-[1.1] mb-6 uppercase">
                  National scale.
                </h2>
                
                <p className="text-lg text-[#52617A] font-light leading-relaxed mb-8">
                  AdMesh coordinates physical media access in every major province, connecting national campaigns with localized neighborhood audiences through audited nodes.
                </p>

                {/* Statistics sitting directly on the dark Field Navy background */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#F1EFE6]/10 w-full font-mono text-left">
                  <div>
                    <span className="text-3xl font-bold text-[#F1EFE6] block mb-1 font-sans">
                      <TickingCounter target={35000} suffix="+" />
                    </span>
                    <span className="text-[9px] text-[#52617A] uppercase tracking-wider block font-semibold">Locations</span>
                  </div>
                  <div>
                    <span className="text-3xl font-bold text-[#F1EFE6] block mb-1 font-sans">
                      <TickingCounter target={18.5} decimals={1} suffix="M+" />
                    </span>
                    <span className="text-[9px] text-[#52617A] uppercase tracking-wider block font-semibold">Impressions</span>
                  </div>
                  <div>
                    <span className="text-3xl font-bold text-[#F1EFE6] block mb-1 font-sans">
                      <TickingCounter target={99.8} decimals={1} suffix="%" />
                    </span>
                    <span className="text-[9px] text-[#52617A] uppercase tracking-wider block font-semibold">Verification</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 5: CASE STUDY — Stats strip + full-width pull-quote + image */}
        <section id="verification" className="enterprise-section w-full bg-[#F1EFE6] border-t border-[#11233B]/10">
          <div className="container-full">

            {/* Section label + heading */}
            <div className="max-w-3xl mb-[48px]">
              <span className="os-label mb-4 block text-[#FFB300]">[ RESULTS ]</span>
              <h2 className="font-sans font-bold text-[#11233B] text-2xl lg:text-3xl tracking-tight leading-snug uppercase">
                Enterprise results.
              </h2>
            </div>

            {/* Stats strip — compact horizontal row */}
            <div className="flex flex-wrap gap-0 border border-[#11233B]/10 w-full max-w-xl" style={{ marginBottom: 'var(--space-sm)' }}>
              <div className="flex-1 border-r border-[#11233B]/10" style={{ padding: 'var(--space-sm)' }}>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#52617A] font-semibold block" style={{ marginBottom: 'var(--space-xs)' }}>Unique Reach</span>
                <span className="font-mono text-3xl font-bold text-[#11233B]">
                  <TickingCounter target={12.4} decimals={1} suffix="M" />
                </span>
              </div>
              <div className="flex-1" style={{ padding: 'var(--space-sm)' }}>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#52617A] font-semibold block" style={{ marginBottom: 'var(--space-xs)' }}>Active Nodes</span>
                <span className="font-mono text-3xl font-bold text-[#11233B]">
                  <TickingCounter target={1800} suffix="+" />
                </span>
              </div>
            </div>

            {/* Main grid: pull-quote left, image right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[48px] items-start">

              {/* Pull-quote block — full persuasive weight */}
              <div className="lg:col-span-5">
                <div className="bg-[#0A1A2C] relative overflow-hidden" style={{ padding: 'var(--space-sm) var(--space-md) var(--space-md) var(--space-md)' }}>
                  {/* Oversized decorative quotation mark */}
                  <div
                    className="font-serif font-black text-[#FFB300] leading-none select-none"
                    style={{ fontSize: '72px', lineHeight: '0.8', opacity: 0.9, marginBottom: 'var(--space-xs)' }}
                    aria-hidden="true"
                  >
                    &ldquo;
                  </div>
                  <blockquote className="text-[#F1EFE6] font-light leading-relaxed" style={{ fontSize: '1.1rem', marginBottom: 'var(--space-sm)' }}>
                    AdMesh enabled us to scale our campaign across hundreds of storefronts with absolute visibility. The photographic verification gave our marketing team complete confidence in our physical spend.
                  </blockquote>
                  <div className="border-t border-[#F1EFE6]/10" style={{ paddingTop: 'var(--space-sm)' }}>
                    <cite className="not-italic">
                      <span className="block font-mono font-bold text-[#FFB300] text-[10px] uppercase tracking-widest" style={{ marginBottom: '4px' }}>VP of Brand Marketing</span>
                      <span className="block font-mono text-[10px] uppercase tracking-widest text-[#52617A]">CPG Beverages · Canada</span>
                    </cite>
                  </div>
                </div>
              </div>

              {/* Right 7 columns: Supermarket Image inside Amber Reticle Frame */}
              <div className="lg:col-span-7">
                <div className="relative">
                  <div className="reticle-frame bg-[#0A1A2C] shadow-lg">
                    <div className="reticle-frame-inner"></div>
                    <img 
                      src="/images/instore.jpeg" 
                      alt="CPG beverage campaign execution in retail store" 
                      className="w-full aspect-[16/10] object-cover grayscale opacity-95 hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div className="mt-3 font-mono text-[10px] uppercase tracking-wider text-[#52617A] flex justify-between">
                    <span>[ NODE #22941 // SUPERMARKET IN-STORE, QC // AUDITED PLACEMENT ]</span>
                    <span className="text-[#FFB300] flex items-center gap-1.5 font-bold">
                      <span className="live-beacon"></span> VERIFIED · 06.16.2026
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 6: FINAL CALL TO ACTION (Minimal Operating System Access Portal) */}
        <section id="pilot" className="enterprise-cta-section w-full bg-[#F1EFE6] border-t border-[#11233B]/10 text-center">
          <div className="container-full flex flex-col items-center justify-center">
            <div className="max-w-4xl w-full flex flex-col items-center py-12">
              <span className="os-label mb-4 block text-[#FFB300] text-center">[ SYSTEM ACCESS ]</span>
              <h2 className="font-sans font-bold text-[#11233B] text-4xl lg:text-[64px] tracking-tight leading-[1.05] mb-10 uppercase max-w-2xl text-center">
                Canada's Retail Media Network.
              </h2>
              <button 
                onClick={() => setIsAuthOpen(true)}
                className="btn-primary"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#0A1A2C] mr-2 inline-block animate-pulse"></span>
                Book a Demo
              </button>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <PhoneAuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
};

export default LandingPage;
