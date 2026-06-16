'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ShieldAlert, ShieldCheck, FileText, Database, Camera, MapPin, Zap, Lock, Cpu, AlertTriangle, Wifi } from 'lucide-react';

const ForensicTimestamp = () => {
  const [ts, setTs] = useState<string | null>(null);
  useEffect(() => {
    const update = () => setTs(new Date().toLocaleTimeString('en-CA', { timeZone: 'America/Toronto', hour12: false }));
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);
  return <span className="text-blue-600 mono text-[9px] font-bold">{ts ?? '--:--:--'} EST</span>;
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
    <div className="relative w-full bg-white rounded-[40px] overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10">

        {/* ─── LEFT: Legacy Chaos ─── */}
        <div className="relative p-12 lg:p-16 border-r border-slate-200 overflow-hidden">
          {/* Red tint atmosphere */}
          <div className="absolute inset-0 bg-red-50/20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-red-500/10 to-transparent" />

          {/* Corrupted data watermark */}
          <div className="absolute inset-0 overflow-hidden opacity-[0.03] pointer-events-none select-none">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="absolute text-[9px] mono text-red-500 whitespace-nowrap" style={{ top: `${i * 7}%`, left: `${(i % 4) * 25}%`, transform: `rotate(${(i % 3 - 1) * 2}deg)` }}>
                ERROR_PROOF_FINAL_COPY_V{i + 1}.XLSX // DUPLICATE_DETECTED // NULL_GPS
              </div>
            ))}
          </div>

          {/* Header */}
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
              <ShieldAlert className="text-red-500" size={18} />
            </div>
            <div>
              <div className="text-[10px] mono text-red-600/70 uppercase tracking-[0.4em] font-bold">Legacy_Protocol // COMPROMISED</div>
              <div className="text-[9px] text-slate-400 mono">Status: Unverified</div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span className="text-[9px] mono text-red-500 font-bold uppercase">OFFLINE</span>
            </div>
          </div>

          <h3 className="text-4xl font-bold text-slate-300 tracking-tighter mb-2 leading-none uppercase">
            Traditional<br />
            <span className="italic font-serif text-red-500/30">Verification</span>
          </h3>
          <p className="text-sm text-slate-400 font-light mb-10 max-w-xs">Unstructured, unverified, and vulnerable to fraud at every layer.</p>

          {/* Chaos items */}
          <div className="space-y-6">
            {[
              { icon: Camera, label: 'Manual Photo Uploads', detail: 'Blurry, reused, unverifiable', status: 'DUPLICATE_DETECTED' },
              { icon: FileText, label: 'Spreadsheet Reporting', detail: 'Delayed, inconsistent, no audit trail', status: 'DATA_CORRUPT' },
              { icon: AlertTriangle, label: 'No GPS Binding', detail: 'Location unverifiable, easily spoofed', status: 'NULL_COORDS' },
              { icon: Database, label: 'Disconnected Systems', detail: 'Siloed data, zero cross-verification', status: 'SYNC_FAILED' },
            ].map((item, i) => (
              <div key={i} className="relative flex items-start gap-4 p-4 bg-red-50/50 border border-red-200 rounded-xl opacity-85 group">
                <div className="p-2 bg-white border border-red-200 rounded-lg shrink-0">
                  <item.icon size={16} className="text-red-500/50" />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="text-sm font-medium text-slate-500 mb-1 line-through decoration-red-500/40">{item.label}</div>
                  <div className="text-xs text-slate-400 font-light italic">{item.detail}</div>
                </div>
                <div className="shrink-0 flex items-center gap-2 ml-auto">
                  <span className="text-[8px] mono text-red-500 font-bold uppercase tracking-widest border border-red-200 px-2 py-0.5 rounded">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Fake proof mockup */}
          <div className="relative mt-8 overflow-hidden rounded-2xl border border-slate-200">
            <div className="aspect-video bg-slate-100 opacity-60">
              <img
                src="/images/storefront.png"
                alt="Unverified proof"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-900/85">
              <X size={32} className="text-red-500/70" />
              <div className="flex flex-col items-center gap-1">
                <span className="mono text-[10px] text-red-500 uppercase tracking-[0.3em] font-bold">Proof_Invalid</span>
                <span className="mono text-[9px] text-slate-400">No GPS · No Timestamp · Duplicate Hash</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── RIGHT: AdMesh Intelligence ─── */}
        <div className="relative p-12 lg:p-16 overflow-hidden">
          {/* Video background */}
          <div className="absolute inset-0 z-0">
            <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-[0.06] grayscale brightness-[1.05]">
              <source src="/videos/verification-terminal-loop.webm" type="video/webm" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-br from-white via-white/95 to-transparent" />
            <div className="absolute inset-0 glowing-grid opacity-[0.04]" />
          </div>

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center gap-3 mb-10">
              <div className="relative p-2 bg-blue-50 border border-blue-200 rounded-lg">
                <ShieldCheck className="text-blue-600" size={18} />
                <div className="live-ring absolute inset-0 rounded-lg" />
              </div>
              <div>
                <div className="text-[10px] mono text-blue-600 uppercase tracking-[0.4em] font-bold">AdMesh_Protocol // ACTIVE</div>
                <ForensicTimestamp />
              </div>
              <div className="ml-auto flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse shadow-[0_0_8px_rgba(37,99,235,0.5)]" />
                <span className="text-[9px] mono text-blue-600 font-bold uppercase">LIVE</span>
              </div>
            </div>

            <h3 className="text-4xl font-bold text-slate-900 tracking-tighter mb-2 leading-none uppercase">
              AdMesh<br />
              <span className="italic font-serif text-blue-600">Intelligence</span>
            </h3>
            <p className="text-sm text-slate-500 font-light mb-10 max-w-xs">Multi-layer forensic verification — GPS, AI, QR, and tamper-evident audit locked.</p>

            {/* Forensic verification items */}
            <div className="space-y-4">
              {[
                {
                  icon: MapPin,
                  label: 'GPS Coordinate Lock',
                  detail: 'LAT 43.6532 // LONG -79.3832',
                  status: 'LOCKED',
                  statusColor: 'text-blue-600',
                  borderColor: 'border-blue-200/60',
                  bgColor: 'bg-blue-50/50',
                },
                {
                  icon: Cpu,
                  label: 'AI Visual Validation',
                  detail: `Brand match: ${aiProgress}% confidence`,
                  status: aiProgress >= 90 ? 'VALIDATED' : 'SCANNING',
                  statusColor: aiProgress >= 90 ? 'text-blue-600' : 'text-amber-600',
                  borderColor: 'border-blue-200/60',
                  bgColor: 'bg-blue-50/50',
                },
                {
                  icon: Wifi,
                  label: 'QR Proof-of-Work',
                  detail: 'Node ID: CN_0442 · Store: CN_94821',
                  status: 'SCANNED',
                  statusColor: 'text-blue-600',
                  borderColor: 'border-blue-200/60',
                  bgColor: 'bg-blue-50/50',
                },
                {
                  icon: Lock,
                  label: 'Audit Log Commit',
                  detail: 'Hash: 0x42f8a9...c3d1 · Immutable',
                  status: 'SEALED',
                  statusColor: 'text-blue-600',
                  borderColor: 'border-blue-200/60',
                  bgColor: 'bg-blue-50/50',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className={`relative flex items-center gap-4 p-4 ${item.bgColor} border ${item.borderColor} rounded-xl group hover:border-blue-600/30 transition-all duration-500`}
                >
                  <div className="p-2 bg-white border border-slate-200 rounded-lg shrink-0 group-hover:border-blue-600/30 transition-colors">
                    <item.icon size={16} className="text-blue-600 group-hover:scale-105 transition-all" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="text-sm font-medium text-slate-800 mb-0.5">{item.label}</div>
                    <div className="text-[10px] mono text-slate-500 truncate">{item.detail}</div>
                  </div>
                  <div className={`shrink-0 flex items-center gap-1.5 ${item.statusColor}`}>
                    <div className="w-1 h-1 rounded-full bg-current animate-pulse" />
                    <span className="text-[9px] mono font-bold uppercase tracking-widest">{item.status}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* AI progress bar */}
            <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] mono text-slate-400 uppercase tracking-widest font-bold">AI_Neural_Validation</span>
                <span className="text-[10px] mono text-blue-600 font-bold">{aiProgress}%</span>
              </div>
              <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  style={{ width: `${aiProgress}%` }}
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.3)]"
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[8px] mono text-slate-400 font-bold">Brand_Detect</span>
                <span className="text-[8px] mono text-slate-400 font-bold">Env_Compliance</span>
                <span className="text-[8px] mono text-slate-400 font-bold">Geo_Match</span>
              </div>
            </div>

            {/* Final confirmation badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-6 flex items-center justify-between p-5 bg-blue-50 border border-blue-200 rounded-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full border border-blue-300 flex items-center justify-center bg-white">
                  <Check size={18} className="text-blue-600" />
                  <div className="absolute -inset-1 rounded-full border border-blue-300/10 animate-ping" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800">Verification Complete</div>
                  <div className="text-[10px] mono text-blue-600/60 font-bold">99.8% Confidence · Live Audit Sealed</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[9px] mono text-slate-400 uppercase font-bold">Proof_ID</div>
                <div className="text-[10px] mono text-blue-600 font-bold">CN_0442_CAN</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FraudVerificationComparison;
