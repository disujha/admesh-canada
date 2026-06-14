'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Smartphone, ClipboardCheck, Drill, Camera, ShieldCheck, Zap } from 'lucide-react';

const DEPLOYMENT_STEPS = [
  {
    id: '01',
    label: 'TASKING',
    title: 'Agent Assignment',
    desc: 'Local installers receive encrypted protocols and synchronize with retailer grid schedules.',
    icon: Smartphone,
  },
  {
    id: '02',
    label: 'INSTALL',
    title: 'Precision Deployment',
    desc: 'Physical media is installed using standardized grid-alignment and placement protocols.',
    icon: Drill,
  },
  {
    id: '03',
    label: 'VALIDATION',
    title: 'Visual Verification',
    desc: 'Unique QR codes are scanned, capturing geo-tagged proof-of-work for real-time audit.',
    icon: Camera,
  },
  {
    id: '04',
    label: 'LIVE SYNC',
    title: 'Network Activation',
    desc: 'Final logs are committed to a tamper-evident live audit trail, and node visibility goes live globally.',
    icon: ShieldCheck,
  },
];

const RapidDeploymentTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const progressWidth = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="rounded-[16px] overflow-hidden border border-white/5">

      {/* â”€â”€ Full-width video block at the top â”€â”€ */}
      <div className="relative w-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full block object-cover grayscale brightness-50 contrast-[1.1]"
          style={{ maxHeight: '420px', objectPosition: 'center' }}
        >
          <source src="/videos/deploy.webm" type="video/webm" />
        </video>
        {/* Fade bottom of video into the dark content panel below */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0C0C0E] to-transparent pointer-events-none" />
      </div>

      {/* â”€â”€ Dark content panel below the video â”€â”€ */}
      <div className="bg-[#0C0C0E] py-16">
        <div className="container-full">

          {/* Header */}
          <div className="max-w-2xl mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="mono text-amber text-[11px] tracking-[0.5em] uppercase" style={{ fontFamily: 'var(--font-departure)' }}>10 // OPERATIONAL EXECUTION</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-dirty-white tracking-tighter mb-6">
              RAPID FIELD <br />
              <span className="text-amber italic font-serif">DEPLOYMENT.</span>
            </h2>
            <p className="text-lg text-white/50 font-light leading-[1.8] max-w-xl">
              From digital tasking to physical activation in under 48 hours. Our automated field coordination ensures every placement is verified, geo-tagged, and continuously audit-locked.
            </p>
          </div>

          {/* Horizontal Timeline */}
          <div className="relative pt-12">
            {/* Main Connecting Line */}
            <div className="absolute top-[84px] left-0 right-0 h-[2px] bg-white/5 hidden lg:block">
              <motion.div
                style={{ width: progressWidth }}
                className="h-full bg-gradient-to-r from-amber/20 via-amber to-amber/20 shadow-[0_0_15px_rgba(201,115,32,0.5)]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {DEPLOYMENT_STEPS.map((step, i) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative group"
                >
                  {/* Node Dot */}
                  <div className="hidden lg:flex absolute top-[28px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-obsidian border-2 border-white/20 z-20 group-hover:border-amber transition-colors duration-500">
                    <div className="w-full h-full rounded-full bg-amber opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                  </div>

                  <div className="relative flex flex-col items-center lg:items-start text-center lg:text-left hover:-translate-y-[2px] transition-transform duration-200 cursor-default">
                    {/* Icon Card */}
                    <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:border-amber/30 group-hover:bg-amber/5 transition-all duration-500">
                      <step.icon size={24} className="text-white/40 group-hover:text-amber transition-colors" />
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-center lg:justify-start gap-3">
                        <span className="text-[10px] mono text-amber/60 font-bold tracking-widest">{step.id}</span>
                        <span className="text-[11px] font-medium text-white/30 uppercase tracking-[0.2em]">{step.label}</span>
                      </div>
                      <h3 className="text-xl font-bold text-dirty-white group-hover:text-amber transition-colors">{step.title}</h3>
                      <p className="text-sm text-white/40 font-light leading-relaxed max-w-[240px]">
                        {step.desc}
                      </p>
                    </div>

                    {/* Visual Connector for Mobile/Tablet */}
                    <div className="w-px h-12 bg-white/5 my-6 lg:hidden" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Operational Proof Stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            {[
              { label: 'Avg Install Time', val: '48h',   desc: 'From task to live node' },
              { label: 'Network Integrity', val: '99.9%', desc: 'Verified placement uptime' },
              { label: 'Field Capacity',   val: '1.2k',  desc: 'Active agents nationwide' },
            ].map((stat, i) => (
              <div key={i} className="p-8 bg-obsidian hover:bg-white/[0.02] hover:-translate-y-[2px] transition-all duration-200 group cursor-default">
                <div className="text-3xl font-bold text-dirty-white mb-2 group-hover:text-amber transition-colors">{stat.val}</div>
                <div className="text-[11px] font-medium text-white/30 uppercase tracking-[0.2em] mb-3">{stat.label}</div>
                <p className="text-xs text-white/20 font-light italic">{stat.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default RapidDeploymentTimeline;
