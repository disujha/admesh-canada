'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Zap } from 'lucide-react';

interface ChannelComparison {
  name: string;
  isAdmesh: boolean;
  visibilityDuration: string;
  repeatExposure: string;
  localTrust: string;
  dailyInteraction: string;
  hyperlocalTargeting: string;
  score: string;
}

const CHANNELS: ChannelComparison[] = [
  {
    name: 'Instagram Ads',
    isAdmesh: false,
    visibilityDuration: '1.2 Seconds (Feed scroll)',
    repeatExposure: 'Near Zero (Scroll past)',
    localTrust: 'Low (Sponsored spam noise)',
    dailyInteraction: 'Passive scrolling, high ad-blindness',
    hyperlocalTargeting: 'Broad region / cookie-based',
    score: '42%'
  },
  {
    name: 'YouTube Ads',
    isAdmesh: false,
    visibilityDuration: '5.0 Seconds (Skip wait limit)',
    repeatExposure: 'Low (Algorithm dependent)',
    localTrust: 'Medium (Interrupted video noise)',
    dailyInteraction: 'Skip-button focused impatience',
    hyperlocalTargeting: 'Broad metros & interests',
    score: '51%'
  },
  {
    name: 'Traditional Billboards',
    isAdmesh: false,
    visibilityDuration: '2.4 Seconds (Drive pass)',
    repeatExposure: 'Medium (Same commute loop)',
    localTrust: 'High authority branding scale',
    dailyInteraction: 'Static highway background noise',
    hyperlocalTargeting: 'Single static coordinate',
    score: '60%'
  },
  {
    name: 'AdMesh Retail Ads',
    isAdmesh: true,
    visibilityDuration: '45+ Minutes (Dwell time)',
    repeatExposure: '4.8x Weekly Repeat Rate',
    localTrust: 'High (Shopkeeper-endorsed presence)',
    dailyInteraction: 'Active checkout transaction focus',
    hyperlocalTargeting: 'Surgical Block-by-Block',
    score: '98%'
  }
];

const WhyRetailAdvertising = () => {
  return (
    <section id="why-works" className="relative py-32 bg-obsidian overflow-hidden border-t border-white/[0.05]">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[700px] bg-amber/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-glowing-grid opacity-[0.02] pointer-events-none" />

      <div className="container-full relative z-10">
        
        {/* Section Header */}
        <div className="max-w-4xl pt-4 lg:pt-6 mb-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-amber/40" />
            <span className="mono text-amber text-[11px] tracking-[0.5em] uppercase" style={{ fontFamily: 'var(--font-departure)' }}>
              08 // CONVERSION ADVANTAGE
            </span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-bold text-dirty-white mb-8 tracking-tighter uppercase leading-[1.05]">
            Why Retail <br />
            <span className="text-amber italic font-serif text-glow">Advertising Works.</span>
          </h2>
          <p className="text-lg text-white/50 leading-relaxed font-light max-w-2xl">
            Skip the algorithms and ad-blockers. Deploy your branding directly inside physical transaction paths where decisions are made.
          </p>
        </div>

        {/* Premium Channel Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {CHANNELS.map((chan, i) => (
            <motion.div
              key={chan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`relative rounded-[16px] p-9 flex flex-col justify-between transition-all duration-500 cursor-pointer ${
                chan.isAdmesh
                  ? 'bg-amber/[0.04] border-2 border-amber shadow-[0_0_40px_rgba(201,115,32,0.18)] scale-[1.03] z-10'
                  : 'bg-[#111114]/90 border border-white/[0.08] opacity-75 hover:opacity-100 hover:border-white/15'
              }`}
            >
              
              {/* Highlight Tag for AdMesh */}
              {chan.isAdmesh && (
                <div className="absolute top-4 right-4 bg-amber text-obsidian text-[8px] mono font-bold px-3 py-1 rounded-full uppercase tracking-wider animate-pulse flex items-center gap-1">
                  <Award size={10} /> Dominant Impact
                </div>
              )}

              <div>
                
                {/* Card Title */}
                <div className="mb-8">
                  <span className={`text-[9px] mono uppercase tracking-widest block mb-1 ${chan.isAdmesh ? 'text-amber font-bold' : 'text-white/20'}`}>
                    Media Grid // 0{i + 1}
                  </span>
                  <h3 className={`text-xl font-black uppercase tracking-tight ${chan.isAdmesh ? 'text-dirty-white' : 'text-white/60'}`}>
                    {chan.name}
                  </h3>
                </div>

                {/* Metrics Segment */}
                <div className="space-y-6 border-t border-white/5 pt-6 mb-8 font-sans">
                  
                  {/* Metric 1 */}
                  <div>
                    <span className="text-[8px] mono text-white/25 uppercase tracking-wider block mb-1">Visibility Duration</span>
                    <p className={`text-xs font-semibold ${chan.isAdmesh ? 'text-amber' : 'text-white/60'}`}>
                      {chan.visibilityDuration}
                    </p>
                  </div>

                  {/* Metric 2 */}
                  <div>
                    <span className="text-[8px] mono text-white/25 uppercase tracking-wider block mb-1">Repeat Exposure</span>
                    <p className={`text-xs font-semibold ${chan.isAdmesh ? 'text-amber' : 'text-white/60'}`}>
                      {chan.repeatExposure}
                    </p>
                  </div>

                  {/* Metric 3 */}
                  <div>
                    <span className="text-[8px] mono text-white/25 uppercase tracking-wider block mb-1">Local Trust</span>
                    <p className={`text-xs font-semibold ${chan.isAdmesh ? 'text-amber' : 'text-white/60'}`}>
                      {chan.localTrust}
                    </p>
                  </div>

                  {/* Metric 4 */}
                  <div>
                    <span className="text-[8px] mono text-white/25 uppercase tracking-wider block mb-1">Daily Interaction</span>
                    <p className={`text-xs font-semibold ${chan.isAdmesh ? 'text-amber' : 'text-white/60'}`}>
                      {chan.dailyInteraction}
                    </p>
                  </div>

                  {/* Metric 5 */}
                  <div>
                    <span className="text-[8px] mono text-white/25 uppercase tracking-wider block mb-1">Hyperlocal Targeting</span>
                    <p className={`text-xs font-semibold ${chan.isAdmesh ? 'text-amber' : 'text-white/60'}`}>
                      {chan.hyperlocalTargeting}
                    </p>
                  </div>

                </div>

              </div>

              {/* Bottom Score Badge */}
              <div className="mt-auto border-t border-white/5 pt-6 flex justify-between items-center">
                <span className="text-[9px] mono text-white/30 uppercase">Efficiency Rating</span>
                <span className={`text-3xl font-black mono tracking-tighter ${
                  chan.isAdmesh 
                    ? 'text-amber shadow-amber/20 drop-shadow-[0_0_8px_#C97320]' 
                    : 'text-white/40'
                }`}>
                  {chan.score}
                </span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyRetailAdvertising;
