'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ShieldAlert, ShieldCheck, FileText, Database, Camera, MapPin, Zap, Lock, Cpu, AlertTriangle, Wifi } from 'lucide-react';

const ForensicTimestamp = () => {
  const [ts, setTs] = useState<string | null>(null);
  useEffect(() => {
    const update = () => setTs(new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false }));
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);
  return <span className="text-signal-green mono text-[9px]">{ts ?? '--:--:--'} IST</span>;
};

const FraudVerificationComparison = () => {
  const [aiProgress, setAiProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAiProgress(p => p >= 100 ? 0 : p + 2);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full bg-obsidian rounded-[40px] overflow-hidden border border-white/5 shadow-2xl">
      {/* Global scanlines */}
      <div className="scanlines opacity-40 pointer-events-none" />

      {/* Atmospheric depth fog */}
      <div className="atmo-fog-top opacity-60" />
      <div className="atmo-fog-bottom opacity-60" />

      {/* Amber glow center */}
      <div className="amber-glow-burst w-[600px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />

      <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10">

        {/* â”€â”€â”€ LEFT: Legacy Chaos â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="relative p-12 lg:p-16 border-r border-white/5 overflow-hidden">
          {/* Red tint atmosphere */}
          <div className="absolute inset-0 bg-red-950/10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-red-500/10 to-transparent" />

          {/* Corrupted data watermark */}
          <div className="absolute inset-0 overflow-hidden opacity-[0.03] pointer-events-none select-none">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="absolute text-[9px] mono text-red-400 whitespace-nowrap" style={{ top: `${i * 7}%`, left: `${(i % 4) * 25}%`, transform: `rotate(${(i % 3 - 1) * 2}deg)` }}>
                ERROR_PROOF_FINAL_COPY_V{i + 1}.XLSX // DUPLICATE_DETECTED // NULL_GPS
              </div>
            ))}
          </div>

          {/* Header */}
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
              <ShieldAlert className="text-red-400/70" size={18} />
            </div>
            <div>
              <div className="text-[10px] mono text-red-400/60 uppercase tracking-[0.4em]">Legacy_Protocol // COMPROMISED</div>
              <div className="text-[9px] text-white/20 mono">Status: Unverified</div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
              <span className="text-[9px] mono text-red-400/40 uppercase">OFFLINE</span>
            </div>
          </div>

          <h3 className="text-4xl font-bold text-white/25 tracking-tighter mb-2 leading-none uppercase">
            Traditional<br />
            <span className="italic font-serif text-red-400/30">Verification</span>
          </h3>
          <p className="text-sm text-white/20 font-light mb-10 max-w-xs">Unstructured, unverified, and vulnerable to fraud at every layer.</p>

          {/* Chaos items */}
          <div className="space-y-6">
            {[
              { icon: Camera, label: 'Manual Photo Uploads', detail: 'Blurry, reused, unverifiable', status: 'DUPLICATE_DETECTED' },
              { icon: FileText, label: 'Spreadsheet Reporting', detail: 'Delayed, inconsistent, no audit trail', status: 'DATA_CORRUPT' },
              { icon: AlertTriangle, label: 'No GPS Binding', detail: 'Location unverifiable, easily spoofed', status: 'NULL_COORDS' },
              { icon: Database, label: 'Disconnected Systems', detail: 'Siloed data, zero cross-verification', status: 'SYNC_FAILED' },
            ].map((item, i) => (
              <div key={i} className="relative flex items-start gap-4 p-4 bg-red-950/10 border border-red-500/10 rounded-xl opacity-60 group">
                <div className="p-2 bg-red-500/5 border border-red-500/10 rounded-lg shrink-0">
                  <item.icon size={16} className="text-red-400/40" />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="text-sm font-medium text-white/30 mb-1 line-through decoration-red-500/30">{item.label}</div>
                  <div className="text-xs text-white/15 font-light italic">{item.detail}</div>
                </div>
                <div className="shrink-0 flex items-center gap-2 ml-auto">
                  <span className="text-[8px] mono text-red-400/40 uppercase tracking-widest border border-red-500/10 px-2 py-0.5 rounded">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Fake proof mockup */}
          <div className="relative mt-8 overflow-hidden rounded-2xl border border-red-500/10">
            <div className="aspect-video bg-white/5 blur-[2px] grayscale brightness-50 opacity-50">
              <img
                src="/images/kirana.png"
                alt="Unverified proof"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-obsidian/70">
              <X size={32} className="text-red-500/40" />
              <div className="flex flex-col items-center gap-1">
                <span className="mono text-[10px] text-red-400/50 uppercase tracking-[0.3em] font-bold">Proof_Invalid</span>
                <span className="mono text-[9px] text-white/20">No GPS Â· No Timestamp Â· Duplicate Hash</span>
              </div>
            </div>
          </div>
        </div>

        {/* â”€â”€â”€ RIGHT: AdMesh Intelligence â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="relative p-12 lg:p-16 overflow-hidden">
          {/* Video background */}
          <div className="absolute inset-0 z-0">
            <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-30 contrast-[1.2] brightness-[0.8]">
              <source src="/videos/verification-terminal-loop.webm" type="video/webm" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-br from-obsidian via-obsidian/80 to-transparent" />
            <div className="absolute inset-0 glowing-grid opacity-[0.08]" />
            <div className="scanlines opacity-20" />
          </div>

          {/* Amber glow top-right */}
          <div className="absolute top-0 right-0 w-64 h-64 amber-glow-burst opacity-40 -translate-y-1/4 translate-x-1/4" />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center gap-3 mb-10">
              <div className="relative p-2 bg-amber/10 border border-amber/30 rounded-lg">
                <ShieldCheck className="text-amber" size={18} />
                <div className="live-ring absolute inset-0 rounded-lg" />
              </div>
              <div>
                <div className="text-[10px] mono text-amber uppercase tracking-[0.4em]">AdMesh_Protocol // ACTIVE</div>
                <ForensicTimestamp />
              </div>
              <div className="ml-auto flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-signal-green animate-pulse shadow-[0_0_8px_rgba(0,255,133,0.5)]" />
                <span className="text-[9px] mono text-signal-green uppercase">LIVE</span>
              </div>
            </div>

            <h3 className="text-4xl font-bold text-dirty-white tracking-tighter mb-2 leading-none uppercase">
              AdMesh<br />
              <span className="italic font-serif text-amber">Intelligence</span>
            </h3>
            <p className="text-sm text-white/40 font-light mb-10 max-w-xs">Multi-layer forensic verification â€” GPS, AI, QR, and tamper-evident audit locked.</p>

            {/* Forensic verification items */}
            <div className="space-y-4">
              {[
                {
                  icon: MapPin,
                  label: 'GPS Coordinate Lock',
                  detail: 'LAT 19.0760 // LONG 72.8777',
                  status: 'LOCKED',
                  statusColor: 'text-signal-green',
                  borderColor: 'border-signal-green/20',
                  bgColor: 'bg-signal-green/5',
                },
                {
                  icon: Cpu,
                  label: 'AI Visual Validation',
                  detail: `Brand match: ${aiProgress}% confidence`,
                  status: aiProgress >= 90 ? 'VALIDATED' : 'SCANNING',
                  statusColor: aiProgress >= 90 ? 'text-signal-green' : 'text-amber',
                  borderColor: 'border-amber/20',
                  bgColor: 'bg-amber/5',
                },
                {
                  icon: Wifi,
                  label: 'QR Proof-of-Work',
                  detail: 'Node ID: BBY_0442 Â· Store: KI_94821',
                  status: 'SCANNED',
                  statusColor: 'text-signal-green',
                  borderColor: 'border-signal-green/20',
                  bgColor: 'bg-signal-green/5',
                },
                {
                  icon: Lock,
                  label: 'Audit Log Commit',
                  detail: 'Hash: 0x42f8a9...c3d1 Â· Immutable',
                  status: 'SEALED',
                  statusColor: 'text-amber',
                  borderColor: 'border-amber/30',
                  bgColor: 'bg-amber/5',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className={`relative flex items-center gap-4 p-4 ${item.bgColor} border ${item.borderColor} rounded-xl glass-panel group hover:border-amber/30 transition-all duration-500`}
                >
                  {/* Forensic corner marks */}
                  <div className="forensic-lock inset-0 rounded-xl" />

                  <div className="p-2 bg-white/5 border border-white/10 rounded-lg shrink-0 group-hover:border-amber/30 transition-colors">
                    <item.icon size={16} className="text-amber/70 group-hover:text-amber transition-colors" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="text-sm font-medium text-dirty-white mb-0.5">{item.label}</div>
                    <div className="text-[10px] mono text-white/30 truncate">{item.detail}</div>
                  </div>
                  <div className={`shrink-0 flex items-center gap-1.5 ${item.statusColor}`}>
                    <div className="w-1 h-1 rounded-full bg-current animate-pulse" />
                    <span className="text-[9px] mono font-bold uppercase tracking-widest">{item.status}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* AI progress bar */}
            <div className="mt-6 p-4 bg-white/[0.02] border border-amber/10 rounded-xl">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] mono text-white/30 uppercase tracking-widest">AI_Neural_Validation</span>
                <span className="text-[10px] mono text-amber font-bold">{aiProgress}%</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  style={{ width: `${aiProgress}%` }}
                  className="h-full bg-gradient-to-r from-amber/60 to-amber rounded-full shadow-[0_0_8px_rgba(201,115,32,0.5)]"
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[8px] mono text-white/20">Brand_Detect</span>
                <span className="text-[8px] mono text-white/20">Env_Compliance</span>
                <span className="text-[8px] mono text-white/20">Geo_Match</span>
              </div>
            </div>

            {/* Final confirmation badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-6 flex items-center justify-between p-5 bg-signal-green/5 border border-signal-green/20 rounded-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full border border-signal-green/30 flex items-center justify-center bg-signal-green/5">
                  <Check size={18} className="text-signal-green" />
                  <div className="absolute -inset-1 rounded-full border border-signal-green/10 animate-ping" />
                </div>
                <div>
                  <div className="text-sm font-bold text-dirty-white">Verification Complete</div>
                  <div className="text-[10px] mono text-signal-green/60">99.8% Confidence · Live Audit Sealed</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[9px] mono text-white/30 uppercase">Proof_ID</div>
                <div className="text-[10px] mono text-amber font-bold">ADM_0442_BBY</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FraudVerificationComparison;
