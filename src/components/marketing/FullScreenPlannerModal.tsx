'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { 
  Megaphone, Zap, Target, Smartphone, Building, Coffee, Heart, ShoppingBag, 
  Layers, Check, ChevronLeft, ChevronRight, X, Cpu, ShieldCheck, FileUp, 
  Radio, Play, Trophy, Users, BarChart3, CheckCircle2, ArrowRight 
} from 'lucide-react';

// Reusable Animated Number Component
function AnimatedNumber({ value, isFloat = false, suffix = '', prefix = '' }: { value: number; isFloat?: boolean; suffix?: string; prefix?: string }) {
  const spring = useSpring(value, { mass: 0.5, stiffness: 100, damping: 18 });

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  const display = useTransform(spring, (current) => {
    if (isFloat) {
      return prefix + current.toFixed(1) + suffix;
    }
    return prefix + Math.round(current).toLocaleString() + suffix;
  });

  return <motion.span>{display}</motion.span>;
}

// Data definitions
const OBJECTIVES = [
  { id: 'awareness', label: 'Brand Awareness', icon: Megaphone, desc: 'Establish dominant local presence in neighborhood corridors.' },
  { id: 'activation', label: 'Retail Activation', icon: Zap, desc: 'Spark immediate neighborhood buying actions near cashier tills.' },
  { id: 'reach', label: 'Hyperlocal Reach', icon: Target, desc: 'Surgically target stores surrounding specific dealer outlets.' },
  { id: 'engagement', label: 'Interactive Engagement', icon: Smartphone, desc: 'Acquire QR scans, surveys, and tactile button feedback.' }
];

const RETAIL_TYPES = [
  { id: 'kirana', label: 'Kirana Store', weight: 1.0, peak: '8 AM - 12 PM & 6 PM - 9 PM', audience: 'Groceries • Spices' },
  { id: 'cafe', label: 'Cafe & Tea Stall', weight: 1.5, peak: '4 PM - 9 PM', audience: 'Lifestyle • Tech Apps' },
  { id: 'pharmacy', label: 'Pharmacy', weight: 1.2, peak: '10 AM - 1 PM & 5 PM - 8 PM', audience: 'OTC Drugs • Diagnostics' },
  { id: 'supermarket', label: 'Supermarket', weight: 1.8, peak: '5 PM - 9 PM', audience: 'All Consumer Packaged Goods' },
  { id: 'salon', label: 'Salon & Parlor', weight: 1.3, peak: '11 AM - 4 PM', audience: 'Cosmetics • Grooming' },
  { id: 'society_store', label: 'Society Store', weight: 1.05, peak: '7 AM - 10 AM & 5 PM - 8 PM', audience: 'Dairy • Provisions' }
];

const FORMATS = [
  { id: 'counter-sticker', label: 'A4 Counter Sticker', repeat: 2.8, imageUrl: '/images/admesh-counter-sticker.png', visibility: '8.2/10', bestFor: 'Checkout Zones' },
  { id: 'countertop-display', label: 'Countertop Display', repeat: 3.5, imageUrl: '/images/admesh-countertop-display.png', visibility: '8.6/10', bestFor: 'Eye-level Cash tills' },
  { id: 'dangler', label: 'Hanging Dangler', repeat: 4.1, imageUrl: '/images/admesh-dangler.png', visibility: '8.4/10', bestFor: 'Aisle Suspensions' },
  { id: 'shelf-branding', label: 'Shelf Branding', repeat: 4.8, imageUrl: '/images/admesh-shelf-branding.png', visibility: '8.9/10', bestFor: 'Category Dividers' },
  { id: 'wall-poster', label: 'Wall Poster', repeat: 5.5, imageUrl: '/images/admesh-wall-poster.png', visibility: '8.7/10', bestFor: 'Waiting/Dwell Spots' },
  { id: 'digital-display', label: 'Digital Display Screen', repeat: 6.2, imageUrl: '/images/admesh-digital-display.png', visibility: '9.5/10', bestFor: 'Smart Connected Terminals' }
];

interface FullScreenPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FullScreenPlannerModal({ isOpen, onClose }: FullScreenPlannerModalProps) {
  const [currentStep, setCurrentStep] = useState(1);

  // Strategy Selections
  const [planObjective, setPlanObjective] = useState(OBJECTIVES[0].id);
  const [footfallInput, setFootfallInput] = useState(350000); // 350K views
  const [planEnvironments, setPlanEnvironments] = useState<string[]>([RETAIL_TYPES[0].id]);
  const [planFormats, setPlanFormats] = useState<string[]>([FORMATS[0].id]);
  const [planDuration, setPlanDuration] = useState(45); // 45 Days default

  // Lead Generation state
  const [showBriefForm, setShowBriefForm] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadCompany, setLeadCompany] = useState('');
  const [leadBrand, setLeadBrand] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadCity, setLeadCity] = useState('Mumbai Metropolitan Region (MMR)');
  const [leadBriefFile, setLeadBriefFile] = useState<string>('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Telemetry metric multipliers
  const activeObjective = useMemo(() => {
    return OBJECTIVES.find(o => o.id === planObjective) || OBJECTIVES[0];
  }, [planObjective]);

  const telemetryStats = useMemo(() => {
    const formatWeight = planFormats.reduce((acc, fId) => {
      const f = FORMATS.find(x => x.id === fId);
      return acc + (f ? f.repeat : 1.0);
    }, 0) / Math.max(1, planFormats.length);

    const envWeight = planEnvironments.reduce((acc, eId) => {
      const e = RETAIL_TYPES.find(x => x.id === eId);
      return acc + (e ? e.weight : 1.0);
    }, 0) / Math.max(1, planEnvironments.length);

    const reach = Math.round(footfallInput * 0.72);
    const storeCount = Math.max(8, Math.round(footfallInput / (25000 / envWeight)));
    const exposure = Math.round(formatWeight * envWeight * 10) / 10;

    return { reach, storeCount, exposure };
  }, [footfallInput, planEnvironments, planFormats]);

  const typicalInvestmentRange = useMemo(() => {
    const nodeCount = telemetryStats.storeCount;
    if (nodeCount <= 20) return 'Local Area Pilot (Estimated ₹45K - ₹80K)';
    if (nodeCount <= 75) return 'Suburban Dominance Mix (Estimated ₹1.2L - ₹2.5L)';
    if (nodeCount <= 150) return 'Multi-Area Hub Density (Estimated ₹3.5L - ₹6L)';
    return 'Metro Domination Expansion (Custom Enterprise Budgeting)';
  }, [telemetryStats.storeCount]);

  // Navigation callbacks
  const handleNext = () => { if (currentStep < 4) setCurrentStep(currentStep + 1); };
  const handlePrev = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };

  // Selectors toggles
  const toggleEnvironment = (id: string) => {
    if (planEnvironments.includes(id)) {
      if (planEnvironments.length > 1) setPlanEnvironments(planEnvironments.filter(x => x !== id));
    } else {
      setPlanEnvironments([...planEnvironments, id]);
    }
  };

  const toggleFormat = (id: string) => {
    if (planFormats.includes(id)) {
      if (planFormats.length > 1) setPlanFormats(planFormats.filter(x => x !== id));
    } else {
      setPlanFormats([...planFormats, id]);
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadSubmitted(true);
    setTimeout(() => {
      setLeadSubmitted(false);
      setShowBriefForm(false);
      onClose();
      alert('Your tactical Campaign Blueprint media request has been dispatched! A network manager is compiling your high-resolution footprint proposal.');
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-obsidian flex flex-col justify-between"
          style={{ backgroundColor: '#0C0C0E', zIndex: 99999, position: 'fixed', overflowY: 'auto' }}
        >
          {/* Cyber Grid Background */}
          <div className="absolute inset-0 bg-glowing-grid opacity-[0.02] pointer-events-none" />
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-amber/5 rounded-full blur-[140px] pointer-events-none" />

          {/* Modal Header bar */}
          <header className="sticky top-0 bg-[#0C0C0E]/90 backdrop-blur-md border-b border-white/5 px-6 lg:px-12 py-5 flex justify-between items-center" style={{ zIndex: 30 }}>
            <div className="flex items-center gap-3">
              <img src="/icon_transparent.png" alt="AdMesh" className="w-6 h-6 object-contain" />
              <span className="font-bold text-[10px] tracking-[0.3em] text-amber uppercase font-sans">
                AdMesh AI Platform Planner
              </span>
            </div>

            {/* Horizontal Top Navigation track */}
            <div className="hidden md:flex items-center gap-2 max-w-md flex-grow justify-center mx-8">
              {[
                { step: 1, label: 'Objective & Scale' },
                { step: 2, label: 'Channel Mix' },
                { step: 3, label: 'Media Formats' },
                { step: 4, label: 'Campaign Blueprint' }
              ].map((s) => (
                <div key={s.step} className="flex items-center gap-2">
                  <div
                    onClick={() => { if (s.step <= currentStep || currentStep === 4) setCurrentStep(s.step); }}
                    className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${
                      s.step === currentStep 
                        ? 'w-10 bg-amber' 
                        : s.step < currentStep 
                          ? 'w-4 bg-signal-green' 
                          : 'w-4 bg-white/10'
                    }`}
                    title={s.label}
                  />
                </div>
              ))}
            </div>

            <button
              onClick={onClose}
              className="text-white/40 hover:text-white/80 p-2 rounded-full hover:bg-white/5 transition-all"
            >
              <X size={18} />
            </button>
          </header>

          {/* Interactive Workspace Body */}
          <main className="flex-grow container-full py-12 px-6 lg:px-16 flex flex-col justify-center relative z-10 max-w-7xl mx-auto w-full">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: OBJECTIVE & TELEMETRY */}
              {currentStep === 1 && (
                <motion.div
                  key="modal-step-1"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-12"
                >
                  <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="text-[10px] mono text-amber uppercase tracking-widest block mb-2">STEP 01 // GOAL & TARGET COEFFS</span>
                    <h2 className="text-4xl lg:text-5xl font-bold uppercase tracking-tight text-dirty-white">
                      Campaign Objective & Projected Scale
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Objectives select grids */}
                    <div className="lg:col-span-7 space-y-5">
                      <label className="text-[11px] mono text-white/45 uppercase tracking-[0.2em] block mb-2">
                        Strategic Target Goal
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        {OBJECTIVES.map((obj) => {
                          const IconComp = obj.icon;
                          const isSelected = planObjective === obj.id;

                          return (
                            <motion.div
                              key={obj.id}
                              onClick={() => setPlanObjective(obj.id)}
                              whileHover={{ y: -3, scale: 1.01, borderColor: isSelected ? '#C97320' : 'rgba(201, 115, 32, 0.4)' }}
                              whileTap={{ scale: 0.99 }}
                              transition={{ duration: 0.2 }}
                              className={`p-6 rounded-2xl border cursor-pointer group transition-all flex flex-col justify-between h-[156px] ${
                                isSelected 
                                  ? 'bg-[#111114]/90 border-amber shadow-[0_0_15px_rgba(201,115,32,0.12)]' 
                                  : 'bg-[#111114]/40 border-white/5'
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <div className={`p-2.5 rounded-lg ${isSelected ? 'bg-amber/10 text-amber' : 'bg-white/5 text-white/40 group-hover:text-white/60'} transition-all`}>
                                  <IconComp size={16} />
                                </div>
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${isSelected ? 'border-amber bg-amber text-obsidian' : 'border-white/10'}`}>
                                  {isSelected && <Check size={12} strokeWidth={3.5} />}
                                </div>
                              </div>
                              <div>
                                <h4 className="text-sm font-bold uppercase tracking-wide text-dirty-white mb-1">{obj.label}</h4>
                                <p className="text-xs text-white/55 leading-relaxed line-clamp-2">{obj.desc}</p>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Scale Footfall Telemetry Selector */}
                    <div className="lg:col-span-5 bg-[#111114]/60 border border-white/5 rounded-3xl p-7 lg:p-8 space-y-7">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-[11px] mono text-white/45 uppercase tracking-[0.2em]">Target Monthly Footfall</label>
                          <span className="text-sm font-bold text-amber mono">
                            <AnimatedNumber value={footfallInput / 1000} suffix="K" /> views
                          </span>
                        </div>
                        <input
                          type="range"
                          min="100000"
                          max="1000000"
                          step="50000"
                          value={footfallInput}
                          onChange={(e) => setFootfallInput(Number(e.target.value))}
                          className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber"
                        />
                        <div className="flex justify-between text-[10px] mono text-white/35 mt-3">
                          <span>100K MIN</span>
                          <span>550K MID</span>
                          <span>1.0M MAX</span>
                        </div>
                      </div>

                      {/* Telemetry readout */}
                      <div className="border-t border-white/5 pt-6 grid grid-cols-2 gap-4">
                        <div className="bg-[#0C0C0E]/60 border border-white/5 p-4 rounded-xl">
                          <span className="text-[10px] mono text-white/35 uppercase block mb-1">Est. Local Reach</span>
                          <div className="text-xl font-bold text-dirty-white mono">
                            <AnimatedNumber value={telemetryStats.reach / 1000} suffix="K" />
                          </div>
                        </div>
                        <div className="bg-[#0C0C0E]/60 border border-white/5 p-4 rounded-xl">
                          <span className="text-[10px] mono text-white/35 uppercase block mb-1">Active Nodes</span>
                          <div className="text-xl font-bold text-dirty-white mono">
                            <AnimatedNumber value={telemetryStats.storeCount} suffix=" stores" />
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}

              {/* STEP 2: RETAIL CHANNELS */}
              {currentStep === 2 && (
                <motion.div
                  key="modal-step-2"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-12"
                >
                  <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="text-[10px] mono text-amber uppercase tracking-widest block mb-2">STEP 02 // CHANNELS</span>
                    <h2 className="text-4xl lg:text-5xl font-bold uppercase tracking-tight text-dirty-white">
                      Target Retail Channels
                    </h2>
                    <p className="text-sm text-white/55 mt-2 leading-relaxed">Select one or multiple neighborhood retail networks for your campaign.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-6">
                    {RETAIL_TYPES.map((env) => {
                      const isSelected = planEnvironments.includes(env.id);

                      return (
                        <motion.div
                          key={env.id}
                          onClick={() => toggleEnvironment(env.id)}
                          whileHover={{ y: -3, scale: 1.01, borderColor: isSelected ? '#C97320' : 'rgba(201, 115, 32, 0.4)' }}
                          whileTap={{ scale: 0.99 }}
                          transition={{ duration: 0.2 }}
                          className={`p-6 rounded-2xl border cursor-pointer group transition-all flex flex-col justify-between h-[156px] bg-[#111114] ${
                            isSelected 
                              ? 'border-amber shadow-[0_0_15px_rgba(201,115,32,0.12)]' 
                              : 'border-white/5'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <span className="text-sm font-bold uppercase tracking-wide text-dirty-white leading-tight">
                              {env.label}
                            </span>
                            <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                              isSelected ? 'border-amber bg-amber text-obsidian' : 'border-white/10'
                            }`}>
                              {isSelected && <Check size={10} strokeWidth={3} />}
                            </div>
                          </div>

                          <div className="text-[10px] mono uppercase text-white/35 pt-3 border-t border-white/5 flex justify-between gap-2">
                            <span className="truncate">{env.audience}</span>
                            <span className="text-amber bg-amber/5 px-1 py-0.5 rounded border border-amber/10 shrink-0">x{env.weight}</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 3: AD FORMATS */}
              {currentStep === 3 && (
                <motion.div
                  key="modal-step-3"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-12"
                >
                  <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="text-[10px] mono text-amber uppercase tracking-widest block mb-2">STEP 03 // AD FORMATS</span>
                    <h2 className="text-4xl lg:text-5xl font-bold uppercase tracking-tight text-dirty-white">
                      Select High-Visibility Media Formats
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-6">
                    {FORMATS.map((fmt) => {
                      const isSelected = planFormats.includes(fmt.id);

                      return (
                        <motion.div
                          key={fmt.id}
                          onClick={() => toggleFormat(fmt.id)}
                          whileHover={{ y: -3, scale: 1.01, borderColor: isSelected ? '#C97320' : 'rgba(201, 115, 32, 0.4)' }}
                          whileTap={{ scale: 0.99 }}
                          transition={{ duration: 0.2 }}
                          className={`p-6 rounded-2xl border cursor-pointer group transition-all flex flex-col justify-between h-[156px] bg-[#111114] ${
                            isSelected 
                              ? 'border-amber shadow-[0_0_15px_rgba(201,115,32,0.12)]' 
                              : 'border-white/5'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <span className="text-sm font-bold uppercase tracking-wide text-dirty-white leading-tight">
                              {fmt.label}
                            </span>
                            <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                              isSelected ? 'border-amber bg-amber text-obsidian' : 'border-white/10'
                            }`}>
                              {isSelected && <Check size={10} strokeWidth={3} />}
                            </div>
                          </div>

                          <div className="text-[10px] mono uppercase text-white/35 pt-3 border-t border-white/5 flex justify-between gap-2">
                            <span>{fmt.bestFor}</span>
                            <span className="text-amber font-bold">Vis: {fmt.visibility}</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-7 pt-8 border-t border-white/5 max-w-4xl mx-auto">
                    <div className="bg-[#111114]/50 border border-white/5 rounded-2xl p-5">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-[11px] mono text-white/45 uppercase tracking-[0.2em]">Campaign Schedule</label>
                        <span className="text-base font-bold text-amber mono">{planDuration} Days</span>
                      </div>
                      <input
                        type="range"
                        min="30"
                        max="120"
                        step="15"
                        value={planDuration}
                        onChange={(e) => setPlanDuration(Number(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber"
                      />
                      <div className="flex justify-between text-[10px] mono text-white/35 mt-2">
                        <span>30 DAYS</span>
                        <span>75 DAYS</span>
                        <span>120 DAYS</span>
                      </div>
                    </div>

                    <div className="bg-[#111114]/50 border border-white/5 rounded-2xl p-5 flex flex-col justify-between">
                      <label className="text-[11px] mono text-white/45 uppercase tracking-[0.2em] mb-2 block">Target Metopolitan Zone</label>
                      <select
                        value={leadCity}
                        onChange={(e) => setLeadCity(e.target.value)}
                        className="w-full h-14 bg-[#0C0C0E] border border-white/10 rounded-xl px-4 text-base text-white/85 focus:border-amber/50 outline-none transition-colors appearance-none cursor-pointer"
                      >
                        <option value="Mumbai Metropolitan Region (MMR)">Mumbai Region (MMR)</option>
                        <option value="Delhi NCR">Delhi NCR Hub</option>
                        <option value="Bengaluru Urban">Bengaluru Urban Hub</option>
                        <option value="Hyderabad Region">Hyderabad Hub</option>
                        <option value="Chennai Metro">Chennai Hub</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: BLUEPRINT DASHBOARD */}
              {currentStep === 4 && (
                <motion.div
                  key="modal-step-4"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-12"
                >
                  <div className="flex justify-between items-start flex-wrap gap-4 border-b border-white/5 pb-6 mb-12">
                    <div>
                      <span className="text-[10px] mono text-amber uppercase tracking-widest block mb-1">
                        COMPILE_COMPLETE // MODEL_OUTPUT
                      </span>
                      <h3 className="text-2xl font-bold uppercase tracking-tight text-dirty-white">
                        Recommended Campaign Blueprint
                      </h3>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-signal-green/10 border border-signal-green/20 px-3 py-1 rounded-full text-signal-green text-[8px] mono uppercase tracking-wider">
                      <Radio size={9} className="animate-pulse" /> Algorithmic Mix Secured
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    
                    {/* Media Mix */}
                    <div className="bg-[#111114] border border-white/5 rounded-2xl p-5 space-y-3">
                      <span className="text-[8px] mono text-amber uppercase tracking-widest block border-b border-white/5 pb-1.5">
                        RECOMMENDED FORMATS
                      </span>
                      <ul className="space-y-1.5">
                        {planFormats.map(fmtId => {
                          const f = FORMATS.find(x => x.id === fmtId);
                          return (
                            <li key={fmtId} className="flex items-center gap-2 text-xs text-white/70 font-light">
                              <CheckCircle2 size={11} className="text-amber" />
                              <span className="truncate">{f?.label || fmtId}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* Environment network */}
                    <div className="bg-[#111114] border border-white/5 rounded-2xl p-5 space-y-3">
                      <span className="text-[8px] mono text-amber uppercase tracking-widest block border-b border-white/5 pb-1.5">
                        SUGGESTED RETAIL NETWORK
                      </span>
                      <ul className="space-y-1.5">
                        {planEnvironments.map(envId => {
                          const e = RETAIL_TYPES.find(x => x.id === envId);
                          return (
                            <li key={envId} className="flex items-center gap-2 text-xs text-white/70 font-light">
                              <CheckCircle2 size={11} className="text-amber" />
                              <span className="truncate">{e?.label || envId}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* Reach estimations */}
                    <div className="bg-[#111114] border border-white/5 rounded-2xl p-5 space-y-3">
                      <span className="text-[8px] mono text-amber uppercase tracking-widest block border-b border-white/5 pb-1.5">
                        ESTIMATED TELEMETRY
                      </span>
                      <div className="space-y-2">
                        <div>
                          <span className="text-[7px] text-white/20 block uppercase">Est. Monthly Reach</span>
                          <span className="text-base font-bold text-dirty-white mono">
                            <AnimatedNumber value={telemetryStats.reach / 1000} suffix="K" /> Unique eyes
                          </span>
                        </div>
                        <div>
                          <span className="text-[7px] text-white/20 block uppercase">Active Network Nodes</span>
                          <span className="text-xs font-bold text-dirty-white mono">
                            {telemetryStats.storeCount} stores
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Duration schedule */}
                    <div className="bg-[#111114] border border-white/5 rounded-2xl p-5 space-y-3">
                      <span className="text-[8px] mono text-amber uppercase tracking-widest block border-b border-white/5 pb-1.5">
                        SCHEDULE TIMELINE
                      </span>
                      <div className="space-y-2">
                        <div className="text-xl font-bold text-dirty-white mono italic font-serif">
                          {planDuration} Days
                        </div>
                        <p className="text-[9px] text-white/30 leading-relaxed font-light">
                          Optimal schedule to establish strong visual presence.
                        </p>
                      </div>
                    </div>

                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch pt-2">
                    
                    {/* Investment guideline */}
                    <div className="bg-[#111114]/90 border border-amber/15 rounded-2xl p-5 flex flex-col justify-between">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[8px] mono text-amber uppercase tracking-widest">
                          TYPICAL INVESTMENT RANGE
                        </span>
                        <span className="text-[7px] mono text-white/20">Density-Driven</span>
                      </div>
                      <div className="text-base font-bold text-amber tracking-tight mb-1.5">
                        {typicalInvestmentRange}
                      </div>
                      <p className="text-[9px] text-white/40 leading-relaxed font-light">
                        Exact budgets are dynamic and calculated based on regional retail density coefficients, chosen production materials, and digital interactive scale. No raw markup overhead.
                      </p>
                    </div>

                    {/* Quality standards */}
                    <div className="bg-[#111114]/50 border border-white/5 rounded-2xl p-5 space-y-2">
                      <span className="text-[8px] mono text-white/30 uppercase tracking-widest block">
                        ENTERPRISE PLATFORM STANDARDS INCLUDED:
                      </span>
                      <div className="grid grid-cols-2 gap-2.5 text-[9px] text-white/60 font-light">
                        <div className="flex items-center gap-2">
                          <ShieldCheck size={11} className="text-signal-green" />
                          <span>Geo-tagged verification</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ShieldCheck size={11} className="text-signal-green" />
                          <span>AI image validation</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ShieldCheck size={11} className="text-signal-green" />
                          <span>Live Terminal Access</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ShieldCheck size={11} className="text-signal-green" />
                          <span>Weekly logistics reports</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  <div className="flex justify-end pt-4 border-t border-white/5">
                    <button
                      onClick={() => setShowBriefForm(true)}
                      className="btn-molten h-[50px] px-6 flex items-center gap-2 font-bold uppercase tracking-wider text-xs shadow-[0_0_20px_rgba(201,115,32,0.15)] text-obsidian"
                    >
                      <span>Request Detailed Media Plan Proposal</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </main>

          {/* Modal Footer Controls (Visible in step 1-3) */}
          {currentStep < 4 && (
            <footer className="sticky bottom-0 bg-[#0C0C0E]/90 backdrop-blur-md border-t border-white/5 px-6 lg:px-12 py-5 flex justify-between items-center" style={{ zIndex: 30 }}>
              <button
                onClick={handlePrev}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-[9px] font-bold uppercase tracking-wider transition-all ${
                  currentStep === 1 
                    ? 'opacity-20 border-white/5 text-white/20 cursor-not-allowed' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-dirty-white'
                }`}
              >
                <ChevronLeft size={12} />
                <span>Back</span>
              </button>

              <button
                onClick={handleNext}
                className="btn-molten flex items-center gap-2 px-5 py-3 text-[9px] font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(201,115,32,0.15)] text-obsidian"
              >
                <span>Next Step</span>
                <ChevronRight size={12} />
              </button>
            </footer>
          )}

          {/* OPTIONAL BRIEF FORM MODAL OVERLAY */}
          <AnimatePresence>
            {showBriefForm && (
              <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 100000, position: 'fixed' }}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowBriefForm(false)}
                  className="absolute inset-0 bg-obsidian/95 backdrop-blur-md"
                  style={{ backgroundColor: 'rgba(12, 12, 14, 0.95)' }}
                />

                <motion.div
                  initial={{ scale: 0.95, opacity: 0, y: 15 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: 15 }}
                  transition={{ type: 'spring', duration: 0.4 }}
                  className="relative w-full max-w-[500px] bg-[#111114] border border-white/10 rounded-2xl p-6 lg:p-8 shadow-2xl overflow-hidden"
                  style={{ zIndex: 100001, position: 'relative' }}
                >
                  <button
                    onClick={() => setShowBriefForm(false)}
                    className="absolute top-5 right-5 text-white/30 hover:text-white/60 p-1 transition-colors"
                  >
                    <X size={18} />
                  </button>

                  <AnimatePresence mode="wait">
                    {!leadSubmitted ? (
                      <motion.div
                        key="brief-form-fields"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                      >
                        <div>
                          <span className="text-[8px] mono text-amber uppercase tracking-widest block mb-1">
                            OPTIONAL HYPERLOCAL QUALIFICATION
                          </span>
                          <h3 className="text-xl font-bold text-dirty-white tracking-tight uppercase">
                            Request Media Proposal
                          </h3>
                        </div>

                        <form onSubmit={handleLeadSubmit} className="space-y-3.5">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[8px] mono text-white/30 uppercase">Your Name</label>
                              <input
                                type="text"
                                value={leadName}
                                onChange={(e) => setLeadName(e.target.value)}
                                placeholder="Rahul Sharma"
                                required
                                className="w-full bg-[#0C0C0E] border border-white/10 rounded-lg px-3 py-3 text-sm text-dirty-white focus:border-amber/50 outline-none transition-colors"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[8px] mono text-white/30 uppercase">Company</label>
                              <input
                                type="text"
                                value={leadCompany}
                                onChange={(e) => setLeadCompany(e.target.value)}
                                placeholder="Coca-Cola India"
                                required
                                className="w-full bg-[#0C0C0E] border border-white/10 rounded-lg px-3 py-3 text-sm text-dirty-white focus:border-amber/50 outline-none transition-colors"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[8px] mono text-white/30 uppercase">Brand Name</label>
                              <input
                                type="text"
                                value={leadBrand}
                                onChange={(e) => setLeadBrand(e.target.value)}
                                placeholder="Sprite"
                                required
                                className="w-full bg-[#0C0C0E] border border-white/10 rounded-lg px-3 py-3 text-sm text-dirty-white focus:border-amber/50 outline-none transition-colors"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[8px] mono text-white/30 uppercase">Work Email</label>
                              <input
                                type="email"
                                value={leadEmail}
                                onChange={(e) => setLeadEmail(e.target.value)}
                                placeholder="rahul@company.com"
                                required
                                className="w-full bg-[#0C0C0E] border border-white/10 rounded-lg px-3 py-3 text-sm text-dirty-white focus:border-amber/50 outline-none transition-colors"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[8px] mono text-white/30 uppercase">Phone Number</label>
                              <input
                                type="tel"
                                value={leadPhone}
                                onChange={(e) => setLeadPhone(e.target.value)}
                                placeholder="+91 XXXXX XXXXX"
                                required
                                className="w-full bg-[#0C0C0E] border border-white/10 rounded-lg px-3 py-3 text-sm text-dirty-white focus:border-amber/50 outline-none transition-colors"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[8px] mono text-white/30 uppercase">Target Hub</label>
                              <input
                                type="text"
                                value={leadCity}
                                onChange={(e) => setLeadCity(e.target.value)}
                                required
                                className="w-full bg-[#0C0C0E] border border-white/10 rounded-lg px-3 py-3 text-sm text-dirty-white focus:border-amber/50 outline-none transition-colors"
                              />
                            </div>
                          </div>

                          {/* Brief mock file uploader */}
                          <div className="space-y-1">
                            <label className="text-[8px] mono text-white/30 uppercase">Upload Brief (Optional)</label>
                            <div className="relative border border-dashed border-white/10 hover:border-amber/40 rounded-lg p-3 flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer bg-[#0C0C0E]/50 group">
                              <FileUp size={14} className="text-white/20 group-hover:text-amber transition-colors" />
                              <span className="text-[9px] text-white/40">Drag brief PDF or click to browse</span>
                              <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    setLeadBriefFile(e.target.files[0].name);
                                  }
                                }}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                              />
                              {leadBriefFile && (
                                <span className="text-[9px] text-signal-green mono mt-0.5 font-bold">
                                  ✓ {leadBriefFile} Selected
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="pt-3 flex flex-col gap-2">
                            <button
                              type="submit"
                              className="w-full btn-molten h-[46px] flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-obsidian"
                            >
                              <span>Request Proposal Plan</span>
                              <ArrowRight size={12} />
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setShowBriefForm(false);
                                onClose();
                                alert('Your anonymous configuration blueprint has been downloaded successfully.');
                              }}
                              className="w-full h-[46px] bg-white/5 border border-white/10 text-white/45 text-[9px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
                            >
                              Skip & Download Anonymously
                            </button>
                          </div>

                        </form>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="brief-success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-8 text-center"
                      >
                        <div className="w-12 h-12 bg-signal-green/10 border border-signal-green/30 rounded-full flex items-center justify-center text-signal-green mb-4 shadow-[0_0_15px_rgba(0,255,133,0.15)] animate-bounce">
                          <Check size={20} strokeWidth={3} />
                        </div>
                        <h3 className="text-lg font-bold text-dirty-white tracking-tight uppercase mb-1">
                          Proposal Queued
                        </h3>
                        <p className="text-[10px] text-white/40 leading-relaxed max-w-[240px]">
                          Generating campaign footprint grids for {leadCompany}...
                        </p>
                        <div className="w-36 h-1 bg-white/5 rounded-full overflow-hidden mt-4">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 1.8 }}
                            className="h-full bg-signal-green"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              </div>
            )}
          </AnimatePresence>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
