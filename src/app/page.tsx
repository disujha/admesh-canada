'use client';

import React, { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import CustomCursor from '@/components/marketing/CustomCursor';
import NetworkMap from '@/components/marketing/NetworkMap';
import Ticker from '@/components/marketing/Ticker';
import Icosahedron from '@/components/marketing/Icosahedron';
import SectionDivider from '@/components/marketing/SectionDivider';
import BrandMarquee from '@/components/marketing/BrandMarquee';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { 
  Shield, 
  ShieldCheck,
  Zap, 
  Globe, 
  BarChart, 
  Camera,
  Check,
  Plus,
  Target,
  Activity,
  Lock,
  Smartphone,
  Cpu,
  MapPin,
  FileText,
  TrendingUp,
  X
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import CampaignSimulator from '@/components/marketing/CampaignSimulator';
import TargetingCommandCenter from '@/components/marketing/TargetingCommandCenter';
import RapidDeploymentTimeline from '@/components/marketing/RapidDeploymentTimeline';
import LiveNetworkDashboard from '@/components/marketing/LiveNetworkDashboard';
import FraudVerificationComparison from '@/components/marketing/FraudVerificationComparison';
import IndustryVerticals from '@/components/marketing/IndustryVerticals';

// New hyperlocal elements
import RetailAdFormats from '@/components/marketing/RetailAdFormats';
import RetailEnvironmentGallery from '@/components/marketing/RetailEnvironmentGallery';
import BrandDashboardPreview from '@/components/marketing/BrandDashboardPreview';
import WhyRetailAdvertising from '@/components/marketing/WhyRetailAdvertising';
import CampaignJourney from '@/components/marketing/CampaignJourney';
import RetailerEarnings from '@/components/marketing/RetailerEarnings';
import CampaignEstimator from '@/components/marketing/CampaignEstimator';
import PhoneAuthModal from '@/components/marketing/PhoneAuthModal';

const LandingPage = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [entryComplete, setEntryComplete] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const goToDashboardWithLoader = React.useCallback(() => {
    setLoading(true);
    router.push('/dashboard');
  }, [router]);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -30]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

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
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // 3-Phase Entrance Animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setEntryComplete(true)
      });

      // Phase 1: Background Video Fade In
      tl.fromTo('.hero-bg-video', 
        { opacity: 0 }, 
        { opacity: 0.25, duration: 2, ease: "power4.out" }
      );

      // Phase 2: Per-line headline reveal (keeps line breaks & style spans intact)
      tl.fromTo(['.hero-title-line-1', '.hero-title-line-2'],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 1.0, ease: "power4.out" },
        "-=1.4"
      );

      // Phase 3: CTAs
      tl.from('.hero-cta', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power4.out"
      }, "-=0.4");
    });

    // Scroll Progress
    const handleScroll = () => {
      const progress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Intersection Observer for section reveals
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.section-reveal').forEach(el => observer.observe(el));

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Hero Mockup Interactive Parallax
  useEffect(() => {
    const mockup = document.querySelector('.hero-mockup-container');
    if (!mockup) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 15;
      const yPos = (clientY / window.innerHeight - 0.5) * 15;

      gsap.to(mockup, {
        rotationY: xPos,
        rotationX: -yPos,
        x: xPos * 0.2,
        y: yPos * 0.2,
        duration: 1.5,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative bg-obsidian text-dirty-white min-h-screen selection:bg-amber selection:text-obsidian">
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[1000] bg-obsidian flex flex-col items-center justify-center"
          >
            <Icosahedron className="w-24 h-24 text-amber animate-loader-pulse mb-8" />
            <span className="mono text-[11px] tracking-[0.4em] text-amber">ADMESH</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      <CustomCursor />
      <Navbar onPlanClick={() => setIsAuthOpen(true)} onDashboardClick={goToDashboardWithLoader} />
      
      <main>
                {/* Cinematic Hero Section */}
        <section ref={heroRef} className="relative h-screen flex flex-col justify-center pt-32 pb-12 overflow-hidden bg-obsidian">

          {/* Background Video */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.div style={{ y: y1 }} className="absolute inset-0 scale-110">
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="hero-bg-video w-full h-full object-cover opacity-0"
              style={{ filter: 'grayscale(100%) brightness(1.2)' }}
            >
              <source src="/videos/hero3.webm" type="video/webm" />
            </video>
            </motion.div>

            <div className="absolute inset-0 bg-obsidian/92" />
            <div className="absolute inset-0 glowing-grid opacity-[0.1]" />
            <div className="depth-vignette" />

            <div className="absolute inset-0 pointer-events-none hidden md:block">
              {[
                { cls: 'top-[18%] left-[5%] w-56 h-36', tint: 'from-amber/20 to-transparent', id: 'NODE_014' },
                { cls: 'top-[26%] right-[9%] w-64 h-40', tint: 'from-blue-400/15 to-transparent', id: 'CITY_221' },
                { cls: 'bottom-[20%] left-[12%] w-52 h-32', tint: 'from-signal-green/15 to-transparent', id: 'STORE_908' },
                { cls: 'bottom-[14%] right-[18%] w-60 h-36', tint: 'from-amber/15 to-transparent', id: 'HUB_774' },
              ].map((panel, i) => (
                <motion.div
                  key={panel.id}
                  className={`absolute ${panel.cls} rounded-xl border border-white/15 bg-gradient-to-br ${panel.tint} backdrop-blur-md`}
                  animate={{ y: [0, -14 - (i * 2), 0], rotateY: [0, i % 2 ? 4 : -4, 0], rotateX: [0, i % 2 ? -3 : 3, 0] }}
                  transition={{ duration: 8 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="absolute inset-2 rounded-xl border border-white/10 bg-obsidian/55" />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
                    <span className="mono text-[8px] text-white/55 tracking-[0.2em]">LIVE</span>
                  </div>
                  <div className="absolute bottom-3 right-3 mono text-[8px] tracking-[0.2em] text-amber/70">{panel.id}</div>
                </motion.div>
              ))}
            </div>

            <div className="absolute inset-0 pointer-events-none hidden md:block">
              {[
                { t: '24%', l: '30%', c: 'bg-amber' },
                { t: '36%', l: '68%', c: 'bg-blue-300' },
                { t: '52%', l: '44%', c: 'bg-signal-green' },
                { t: '62%', l: '22%', c: 'bg-amber' },
                { t: '66%', l: '72%', c: 'bg-blue-300' },
              ].map((n, i) => (
                <motion.div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ top: n.t, left: n.l }}
                  animate={{ scale: [1, 1.25, 1], opacity: [0.45, 0.9, 0.45] }}
                  transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}>
                  <div className={`w-3 h-3 rounded-full ${n.c} shadow-[0_0_16px_rgba(201,115,32,0.7)]`} />
                </motion.div>
              ))}
            </div>

            <div className="absolute inset-0 pointer-events-none">
              <motion.div className="absolute -top-[20%] left-[10%] w-[45vw] h-[45vw] rounded-full bg-amber/10 blur-[120px]"
                animate={{ x: [0, 30, 0], y: [0, 20, 0], opacity: [0.22, 0.36, 0.22] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
              <motion.div className="absolute -bottom-[10%] right-[8%] w-[38vw] h-[38vw] rounded-full bg-blue-400/10 blur-[120px]"
                animate={{ x: [0, -24, 0], y: [0, -24, 0], opacity: [0.14, 0.28, 0.14] }}
                transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
            </div>

            {[...Array(16)].map((_, i) => (
              <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-amber/45"
                style={{ left: `${6 + (i * 5)}%`, top: `${18 + ((i * 7) % 64)}%` }}
                animate={{ y: [0, -34, 0], opacity: [0.15, 0.7, 0.15], scale: [1, 1.45, 1] }}
                transition={{ duration: 4.5 + (i % 4), repeat: Infinity, ease: 'easeInOut', delay: i * 0.22 }} />
            ))}
          </div>

          <motion.div style={{ y: y2, opacity }} className="container-full z-10 relative flex flex-col items-center text-center pt-16 hero-mockup-container">

            <h1
              ref={headlineRef}
              className="mb-8 leading-[0.9] text-dirty-white max-w-none uppercase flex flex-col items-center font-black tracking-[-0.015em]"
              style={{ fontSize: 'clamp(2.86rem, 8.84vw, 8.84rem)' }}
            >
              <span className="block whitespace-nowrap hero-title-line-1">Turn India&apos;s Retail,</span>
              <span className="block whitespace-nowrap mt-2 hero-title-line-2">Network Into Your..</span>
              <span className="block whitespace-nowrap mt-2 hero-title-line-2">.. <span className="italic text-amber font-serif text-glow">Advertising Engine.</span></span>
            </h1>


          </motion.div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-25 z-10">
            <span className="mono text-[9px] tracking-[0.4em] uppercase">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-amber to-transparent" />
          </div>
        </section>        <SectionDivider />


        <BrandMarquee />

        <SectionDivider />
        <RetailAdFormats />
        <SectionDivider />
        <RetailEnvironmentGallery />

        {/* 03 // THE NETWORK â€” Immersive Editorial Layout */}
        <section id="network" className="relative py-24 lg:py-40 bg-obsidian section-explicit-white overflow-hidden">
          {/* Atmospheric depth */}
          <div className="atmo-fog-top opacity-80" />
          <div className="atmo-fog-bottom opacity-80" />
          <div className="depth-vignette" />

          {/* Full-bleed video â€” bleeds off right edge */}
          <div className="absolute top-0 right-0 bottom-0 w-[55%] z-0 pointer-events-none overflow-hidden hidden lg:block">
            <video autoPlay muted loop playsInline
              className="w-full h-full object-cover opacity-25 grayscale brightness-[0.4] contrast-[1.3]"
            >
              <source src="/videos/target-2.webm" type="video/webm" />
            </video>
            <div className="atmo-fog-left" style={{ width: '50%' }} />
            <div className="scanlines opacity-30" />
            <div className="hologram-scan opacity-30" />

            {/* Campaign wave rings floating over video */}
            <div className="absolute top-[40%] left-[30%] pointer-events-none">
              {[0,1,2].map(i => (
                <div key={i} className="campaign-wave absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ width: 60+i*80, height: 60+i*80, animationDelay: `${i*0.9}s`, top:'50%', left:'50%' }}
                />
              ))}
              <div className="w-2 h-2 rounded-full bg-amber shadow-[0_0_15px_rgba(201,115,32,0.9)] animate-pulse" />
            </div>
            <div className="absolute top-[65%] left-[60%] pointer-events-none">
              {[0,1].map(i => (
                <div key={i} className="campaign-wave absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ width: 40+i*60, height: 40+i*60, animationDelay: `${i*1.2+0.5}s`, top:'50%', left:'50%', borderColor:'rgba(0,255,133,0.2)' }}
                />
              ))}
              <div className="w-1.5 h-1.5 rounded-full bg-signal-green shadow-[0_0_10px_rgba(0,255,133,0.7)] animate-pulse" />
            </div>

            {/* Floating coordinate labels */}
            <div className="absolute top-[25%] right-[15%] flex flex-col items-end gap-1">
              <span className="text-[8px] mono text-amber/30 uppercase tracking-widest">Active_Cluster</span>
              <span className="text-[9px] mono text-white/20">19.07Â°N Â· 72.87Â°E</span>
            </div>
            <div className="absolute bottom-[30%] left-[10%] flex flex-col gap-1">
              <span className="text-[8px] mono text-amber/30 uppercase tracking-widest">Campaign_Wave_04</span>
              <span className="text-[9px] mono text-white/20">2,341 nodes Â· ACTIVE</span>
            </div>
          </div>

          <div className="container-full relative z-10">
            <div className="lg:max-w-[52%] pt-4 lg:pt-6">
              {/* Section label */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-px bg-amber/40" />
                <span className="mono text-amber text-[11px] tracking-[0.5em] uppercase" style={{ fontFamily: 'var(--font-departure)' }}>03 // THE NETWORK</span>
              </div>

              <h2 className="text-5xl lg:text-7xl font-bold text-dirty-white tracking-tighter leading-[1.0] mb-8">
                TARGET ANY STORE.<br />
                <span className="italic font-serif text-amber">SCALE INSTANTLY.</span>
              </h2>

              <p className="text-lg text-white/50 max-w-xl leading-[1.9] font-light mb-16">
                From Mumbai kirana stores to Bangalore cafes â€” deploy campaigns with surgical precision across every retail format that matters to India&apos;s consumers.
              </p>

              {/* Stats â€” editorial vertical list */}
              <div className="space-y-8 mb-16">
                {[
                  { val: '50,000+', label: 'Active Retail Touchpoints', desc: 'Kirana, pharmacy, tea stall, electronics across 12 states', icon: Globe },
                  { val: '99.8%', label: 'Verified Proof Accuracy', desc: 'Every placement geo-tagged, AI-validated, and timestamp-audited in real time', icon: Shield },
                  { val: '48hrs', label: 'Deployment to Live', desc: 'Digital tasking to physical activation in under 2 days', icon: Zap },
                ].map((stat, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 items-start group hover:-translate-y-[2px] transition-transform duration-200"
                  >
                    <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center shrink-0 group-hover:border-amber/40 group-hover:bg-amber/5 transition-all duration-500">
                      <stat.icon size={20} className="text-amber/50 group-hover:text-amber transition-colors" />
                    </div>
                    <div className="border-b border-white/5 pb-8 flex-grow">
                      <div className="flex items-baseline gap-4 mb-2">
                        <span className="text-3xl font-bold text-dirty-white tracking-tight mono">{stat.val}</span>
                        <span className="text-[11px] mono text-amber uppercase tracking-wider">{stat.label}</span>
                      </div>
                      <p className="text-sm text-white/30 font-light leading-relaxed">{stat.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Floating node status cards */}
              <div className="flex flex-wrap gap-3">
                {[
                  { city: 'Mumbai', nodes: '4,821', color: 'border-amber/30 bg-amber/5' },
                  { city: 'Delhi NCR', nodes: '3,201', color: 'border-white/10 bg-white/[0.02]' },
                  { city: 'Bangalore', nodes: '2,940', color: 'border-signal-green/20 bg-signal-green/5' },
                ].map((c, i) => (
                  <div key={i} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border glass-panel ${c.color} hover:-translate-y-[2px] transition-transform duration-200 cursor-default`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
                    <span className="text-[11px] font-medium text-white/60">{c.city}</span>
                    <span className="text-[10px] mono text-amber/60 font-bold">{c.nodes}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 04 // DEPLOY IN 3 STAGES â€” Distinct visual temperature per stage */}
        <section id="process" className="relative py-32 bg-obsidian overflow-hidden border-t border-white/5">
          <div className="container-full">

            {/* Section header */}
            <div className="pt-4 lg:pt-6 mb-20">
              <span className="mono text-amber text-[11px] mb-4 block tracking-[0.4em] uppercase" style={{ fontFamily: 'var(--font-departure)' }}>04 // DEPLOYMENT PROTOCOL</span>
              <h2 className="text-5xl lg:text-7xl font-bold text-dirty-white tracking-tighter">
                DEPLOY IN <span className="italic font-serif text-amber/80">3 STAGES.</span>
              </h2>
            </div>

            {/* Stages */}
            <div className="flex flex-col divide-y divide-white/[0.06]">
              {[
                {
                  step: '01',
                  label: 'CONFIGURATION',
                  title: 'Select Target Nodes',
                  desc: 'Filter 50k+ stores by pin code or footfall. Set budget and creative parameters.',
                  icon: Target,
                  video: '/videos/hero-retail-loop.webm',
                  videoType: 'video/webm',
                  // Coolest â€” research & selection mode
                  videoClass: 'grayscale-[80%] brightness-[0.45] contrast-[1.1] saturate-[0.4]',
                  tint: 'bg-blue-950/20',
                  borderColor: 'group-hover:border-l-blue-400/50',
                  stepColor: 'text-blue-400/20',
                  labelColor: 'text-blue-300/60',
                  status: 'STANDBY',
                  statusColor: 'text-blue-300/50',
                },
                {
                  step: '02',
                  label: 'LOGISTICS',
                  title: 'Rapid Deployment',
                  desc: 'Ground agents install within 48h. Every node is tagged at the moment of activation.',
                  icon: Zap,
                  image: '/images/kirana.png',
                  // Mid-brightness â€” action and motion
                  videoClass: 'grayscale-[30%] brightness-[0.75] contrast-[1.2] saturate-[0.8]',
                  tint: 'bg-amber/10',
                  borderColor: 'group-hover:border-l-amber',
                  stepColor: 'text-amber/20',
                  labelColor: 'text-amber/60',
                  status: 'DEPLOYING',
                  statusColor: 'text-amber/70',
                },
                {
                  step: '03',
                  label: 'MONITORING',
                  title: 'Live Proof Feed',
                  desc: 'Access store images and real-time analytics via your secure terminal.',
                  icon: Activity,
                  video: '/videos/verification-terminal-loop.webm',
                  videoType: 'video/webm',
                  // Brightest â€” live results, high contrast
                  videoClass: 'grayscale-[0%] brightness-[1.0] contrast-[1.4] saturate-[1.2]',
                  tint: 'bg-signal-green/5',
                  borderColor: 'group-hover:border-l-signal-green',
                  stepColor: 'text-signal-green/20',
                  labelColor: 'text-signal-green/60',
                  status: 'LIVE',
                  statusColor: 'text-signal-green',
                },
              ].map((item, i) => (
                <div key={i}
                  className={`group relative border-l-2 border-white/0 ${item.borderColor} hover:pl-8 hover:-translate-y-[2px] transition-all duration-500 cursor-default`}
                >
                  {/* Stage tint layer */}
                  <div className={`absolute inset-0 ${item.tint} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                  <div className="py-12 lg:py-16 flex flex-col lg:flex-row gap-12 items-stretch relative">

                    {/* Left: Large step number + content */}
                    <div className="lg:w-1/2 relative z-10 flex gap-8 items-start">
                      {/* Giant step number â€” editorial anchor */}
                      <div className={`font-black ${item.stepColor} text-[100px] lg:text-[120px] leading-none tracking-tighter select-none shrink-0 transition-colors duration-500 group-hover:opacity-40`}
                        style={{ fontFamily: 'var(--font-departure)', lineHeight: 0.85 }}
                      >
                        {item.step}
                      </div>

                      <div className="pt-3 flex flex-col justify-between min-h-[160px]">
                        {/* Label + status */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`flex items-center gap-2 ${item.labelColor} text-[10px] mono uppercase tracking-[0.4em] font-medium`}>
                            <item.icon size={12} />
                            {item.label}
                          </div>
                          <div className={`flex items-center gap-1.5 ${item.statusColor}`}>
                            <div className="w-1 h-1 rounded-full bg-current animate-pulse" />
                            <span className="text-[9px] mono font-bold uppercase tracking-widest">{item.status}</span>
                          </div>
                        </div>

                        {/* Title â€” prominent */}
                        <h3 className="text-3xl lg:text-4xl font-bold text-dirty-white mb-5 tracking-tighter leading-tight group-hover:text-white transition-colors">
                          {item.title}
                        </h3>

                        <p className="text-base text-white/40 font-light leading-[1.8] max-w-md group-hover:text-white/55 transition-colors">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {/* Right: Video panel with distinct temperature */}
                    <div className="lg:w-1/2 relative z-10">
                      <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-colors duration-500">
                        {/* Tinted overlay for temperature effect */}
                        <div className={`absolute inset-0 ${item.tint} z-10 pointer-events-none transition-opacity duration-500`} />

                        {item.video ? (
                          <video autoPlay muted loop playsInline
                            className={`w-full h-full object-cover transition-all duration-700 ${item.videoClass} group-hover:brightness-[${i === 0 ? '0.6' : i === 1 ? '0.9' : '1.1'}]`}
                          >
                            <source src={item.video} type={item.videoType} />
                          </video>
                        ) : (
                          <img src={item.image} alt={item.title}
                            className={`w-full h-full object-cover transition-all duration-700 ${item.videoClass}`}
                          />
                        )}

                        {/* Corner accents */}
                        <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-white/20 z-20" />
                        <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-white/20 z-20" />

                        {/* Status readout */}
                        <div className="absolute bottom-5 left-5 z-20 flex items-center gap-3">
                          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-obsidian/80 backdrop-blur-md border border-white/10 ${item.statusColor}`}>
                            <div className="w-1 h-1 rounded-full bg-current animate-pulse" />
                            <span className="text-[9px] mono font-bold uppercase tracking-widest">{item.status}</span>
                          </div>
                          <span className="text-[8px] mono text-white/20 uppercase tracking-widest">PRTC_00{item.step}</span>
                        </div>

                        {/* Hologram scan on hover */}
                        <div className="hologram-scan opacity-0 group-hover:opacity-60 transition-opacity duration-700 z-20" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* 05 // SIMULATION TERMINAL */}
        <section className="py-32 bg-obsidian overflow-hidden relative z-10">
          <div className="container-full">
            <CampaignSimulator />
          </div>
        </section>

        <SectionDivider />

        {/* Precision Targeting Section - Integrated Command Center */}
        <section id="targeting" className="py-32 bg-obsidian relative overflow-hidden border-t border-white-5">
          <div className="container-full relative z-10">
            <div className="max-w-4xl pt-4 lg:pt-6 mb-16">
              <div className="mono text-amber text-[11px] tracking-[0.5em] uppercase mb-6 block" style={{ fontFamily: 'var(--font-departure)' }}>06 // TARGETING COMMAND</div>
              <h2 className="text-4xl lg:text-7xl font-bold text-dirty-white mb-8 tracking-tighter">
                PRECISION <br />
                <span className="text-amber italic font-serif">RETAIL TARGETING.</span>
              </h2>
              <p className="text-xl text-white/60 leading-[1.8] font-light max-w-2xl">
                Our command center allows you to filter the entire Indian retail landscape by category, footfall, and geographic radius with surgical accuracy.
              </p>
            </div>

            <TargetingCommandCenter />
          </div>
        </section>

        <SectionDivider />
        <BrandDashboardPreview />
        <SectionDivider />
        <WhyRetailAdvertising />
        <SectionDivider />
        <CampaignJourney />

        <SectionDivider />

        {/* Rapid Deployment Workflow - Operational Execution */}
        <section id="deployment-flow" className="py-32 bg-obsidian relative overflow-hidden border-t border-white-5">
          <div className="container-full relative z-10">
            <RapidDeploymentTimeline />
          </div>
        </section>

        <SectionDivider />

        {/* Live Network Section - Operational Transparency */}
        <section id="network-live" className="py-32 bg-obsidian relative overflow-hidden border-t border-white-5">
          <div className="container-full relative z-10">
            <LiveNetworkDashboard />
          </div>
        </section>

        <SectionDivider />

        {/* 12 // VERIFICATION TERMINAL - Trust Evidence */}
        <section id="verification" className="relative py-32 bg-obsidian overflow-hidden border-t border-white-5">
          <div className="container-full">
            <div className="grid grid-cols-1 gap-20 items-center">
              <div>
                <span className="mono text-amber text-[11px] mb-4 block tracking-[0.4em] uppercase" style={{ fontFamily: 'var(--font-departure)' }}>12 // VERIFICATION PROTOCOL</span>
                <h2 className="text-6xl lg:text-[80px] font-bold text-dirty-white mb-10 tracking-tighter leading-[0.9]">
                  FRAUD-PROOF <br />
                  <span className="text-amber italic font-serif">VERIFICATION.</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 border border-white/10 rounded-[16px] overflow-hidden mb-20 shadow-2xl divide-y md:divide-y-0 md:divide-x divide-white/10 bg-white/[0.02]">
                  {[
                    { label: 'Live Audit Logged', val: '100%', desc: 'Tamper-evident proof of play', icon: Shield },
                    { label: 'Audit Velocity', val: '2.4s', desc: 'Real-time sync to grid', icon: Zap },
                    { label: 'Physical Checks', val: '150k+', desc: 'Monthly agent spot-checks', icon: Activity },
                    { label: 'Dispute Rate', val: '0.0%', desc: 'Verified placement records', icon: Target }
                  ].map((item, i) => (
                    <div key={i} className="relative p-12 lg:p-20 hover:bg-white/5 transition-all duration-500 group flex flex-col justify-between border-b md:border-b-0 border-white/10 last:border-b-0 hover:-translate-y-[2px] cursor-default">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      
                      <div className="text-amber mb-12 opacity-60 group-hover:opacity-100 transition-opacity">
                        <item.icon size={48} />
                      </div>
                      
                      <div>
                        {/* Massive numbers */}
                        <div className="text-[300px] md:text-[480px] lg:text-[600px] font-black text-amber mb-4 leading-[0.8] tracking-tighter mono drop-shadow-[0_0_30px_rgba(201,115,32,0.6)]">
                          {item.val}
                        </div>
                        {/* Enlarged labels */}
                        <div className="text-2xl lg:text-3xl text-dirty-white font-bold uppercase tracking-tight mb-3">
                          {item.label}
                        </div>
                        <p className="text-[16px] text-white/50 leading-[1.8] font-light max-w-[280px]">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <FraudVerificationComparison />
              </div>

              <div className="relative group mt-24 lg:mt-32">
                <div className="absolute inset-0 bg-amber/5 blur-[120px] rounded-full" />
                <div className="relative border border-white-10 rounded-[14px] p-4 bg-white/5 backdrop-blur-2xl overflow-hidden">
                  <div className="video-screen-container aspect-video">
                    <video autoPlay muted loop className="video-screen-content grayscale opacity-40 brightness-[1.3] contrast-[0.95]">
                      <source src="/videos/verification-terminal-loop.webm" type="video/webm" />
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-center">
                        <div className="w-20 h-20 rounded-full border-2 border-amber/30 flex items-center justify-center mx-auto mb-6 bg-amber/5">
                          <ShieldCheck size={36} className="text-amber" />
                        </div>
                        <div className="text-amber text-[11px] font-medium tracking-[0.5em] uppercase">System_Secured // Audit_Master</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-between items-center px-4">
                    <div className="flex gap-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-white-30 mono uppercase">Lat_Long</span>
                        <span className="text-xs text-dirty-white mono">19.076 / 72.877</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-white-30 mono uppercase">Timestamp</span>
                        <span className="text-xs text-dirty-white mono">16:54:22 IST</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-signal-green mono text-[10px]">
                      <div className="w-1.5 h-1.5 rounded-full bg-signal-green animate-pulse" />
                      LIVE_VALIDATED
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Editorial Proof Image - Full Bleed */}
        <section className="relative w-full h-[500px] lg:h-[600px] bg-obsidian overflow-hidden border-y border-white-5">
          {/* Deep Amber Color Grade */}
          <div className="absolute inset-0 z-10 bg-amber/30 mix-blend-multiply pointer-events-none" />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-obsidian/80 via-transparent to-transparent pointer-events-none" />
          
          <img 
            src="/images/kirana.png" 
            alt="Verified Kirana Store Network" 
            className="absolute inset-0 w-full h-full object-cover object-center grayscale-[50%] contrast-[1.2]"
          />
          
          <div className="container-full relative z-20 h-full flex items-end pb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-amber" />
              <p className="text-white mono text-[11px] tracking-[0.4em] uppercase font-bold" style={{ fontFamily: 'var(--font-departure)' }}>
                50,000+ STORES. EVERY ONE VERIFIED.
              </p>
            </div>
          </div>
        </section>

        {/* Industry Verticals Section - Who is this for? */}
        <IndustryVerticals />

        <SectionDivider />
        <RetailerEarnings />

        <SectionDivider />
        <CampaignEstimator />

        {/* Cinematic Brand Closure */}
        <section className="relative py-48 bg-obsidian overflow-hidden border-t border-white-5">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,115,32,0.05),transparent_70%)]" />
           
           <div className="container-full relative z-10">
             <div className="flex flex-col items-center text-center">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                >
                  <span className="mono text-amber text-[10px] mb-6 block tracking-[0.6em] uppercase">Protocol // Complete</span>
                </motion.div>

                <h2 className="text-6xl lg:text-[clamp(64px,12vw,140px)] font-bold tracking-tighter leading-[0.8] mb-12 uppercase" style={{ WebkitTextStroke: '1px #C97320', color: 'transparent' }}>
                   ADMESH
                </h2>

                <div className="h-px w-24 bg-amber mb-12 opacity-50" />

                <h3 className="text-2xl lg:text-3xl font-bold text-amber mb-8 tracking-[0.2em] max-w-2xl mono uppercase">
                  RETAIL MEDIA. RE-ENGINEERED.
                </h3>

                <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-16">
                   {[
                     { label: 'OPERATIONAL', status: 'ACTIVE' },
                     { label: 'SECURED', status: 'VERIFIED' },
                     { label: 'SCALABLE', status: 'READY' }
                   ].map((item, i) => (
                     <div key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-signal-green shadow-[0_0_8px_rgba(0,255,133,0.5)]" />
                        <span className="mono text-[10px] text-white-40">{item.label}</span>
                        <span className="mono text-[10px] text-signal-green/60">[{item.status}]</span>
                     </div>
                   ))}
                </div>

                <div className="h-[56px]" aria-hidden="true" />
             </div>
           </div>

           {/* Large Background Wordmark with Scroll Parallax (simulated via scale) */}
           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 pointer-events-none opacity-[0.02]">
              <span className="text-[40vw] font-black tracking-tighter select-none">ADMESH</span>
           </div>
        </section>
      </main>

      <Footer />

      <PhoneAuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
};

export default LandingPage;



