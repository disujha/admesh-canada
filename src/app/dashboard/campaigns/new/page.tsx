'use client';

import React, { useMemo, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Layers, MapPin, Clock3, Store, LayoutTemplate, Eye, X, Package, Pill, ShoppingBasket, Coffee, Scissors, Smartphone, Building2, Zap, Calendar, CalendarRange } from 'lucide-react';
import { useRouter } from 'next/navigation';

type AdFormat = {
  id: string;
  name: string;
  retailType: string;
  imageUrl: string;
  sizeOptions: string[];
  description: string;
  material: string;
  printType: string;
  visibilityScore: string;
  advantage: string;
};

const AD_FORMATS: AdFormat[] = [
  {
    id: 'counter-sticker',
    name: 'A4 Counter Sticker',
    retailType: 'Kirana • Pharmacy • Tea Stall',
    imageUrl: '/images/admesh-counter-promo-card.png',
    sizeOptions: ['A4 (297 x 210 mm)', 'A5 (210 x 148 mm)'],
    description: 'High visibility adhesive stickers placed near billing counters.',
    material: 'Pre-laminated high-tac vinyl',
    printType: 'UV Digital Print',
    visibilityScore: '8.2 / 10',
    advantage: 'Captures attention at the point of sale during transaction checkout.',
  },
  {
    id: 'countertop-display',
    name: 'Countertop Display',
    retailType: 'Kirana • Pharmacy • Cafe',
    imageUrl: '/images/admesh-countertop-display-unit.png',
    sizeOptions: ['Small (150 x 100 mm)', 'Medium (210 x 148 mm)', 'Large (297 x 210 mm)'],
    description: 'Premium acrylic and board units placed adjacent to cash tills.',
    material: 'Premium 3mm gloss acrylic',
    printType: 'High-resolution digital print',
    visibilityScore: '8.6 / 10',
    advantage: '3D structural placement ensures active eye-level gaze tracking.',
  },
  {
    id: 'dangler',
    name: 'Hanging Dangler',
    retailType: 'Kirana • Salon • Supermarket',
    imageUrl: '/images/admesh-aisle-dangler.png',
    sizeOptions: ['300 x 300 mm', '450 x 450 mm'],
    description: 'Double-sided suspended cards creating overhead visual loops.',
    material: '350 GSM double-side printed card',
    printType: 'Double-sided offset print',
    visibilityScore: '8.4 / 10',
    advantage: 'Extended dwell visibility hanging directly above product aisles.',
  },
  {
    id: 'shelf-branding',
    name: 'Shelf Branding',
    retailType: 'Kirana • Pharmacy • Supermarket',
    imageUrl: '/images/admesh-shelf-edge-branding.png',
    sizeOptions: ['600 x 40 mm', '900 x 40 mm', '1200 x 50 mm'],
    description: 'High-yield category dividers and horizontal shelf highlight strips.',
    material: 'Scratch-proof rigid PVC strips',
    printType: 'UV-resistant digital print',
    visibilityScore: '8.9 / 10',
    advantage: 'Drives instant in-category brand recognition and impulse buys.',
  },
  {
    id: 'wall-poster',
    name: 'Wall Poster',
    retailType: 'Cafe • Tea Stall • Salon',
    imageUrl: '/images/admesh-instore-poster-display.png',
    sizeOptions: ['A2 (594 x 420 mm)', 'A1 (841 x 594 mm)'],
    description: 'Sleek premium indoor posters positioned in high-dwell spaces.',
    material: '220 GSM gloss poster paper',
    printType: 'High-quality offset print',
    visibilityScore: '8.7 / 10',
    advantage: 'High-contrast branding aligned to seating spots and social areas.',
  },
  {
    id: 'flex-banner',
    name: 'Flex Banner',
    retailType: 'Kirana • Mobile Shop • Cafe',
    imageUrl: '/images/admesh-exterior-flex-banner.png',
    sizeOptions: ['4 x 2 ft', '6 x 3 ft', '8 x 4 ft'],
    description: 'Weatherproof heavy-duty outdoor banners mounted on facades.',
    material: '440 GSM frontlit matte flex sheet',
    printType: 'Large format solvent print',
    visibilityScore: '9.1 / 10',
    advantage: 'Deep street exposure capturing neighborhood foot traffic 24/7.',
  },
  {
    id: 'shutter-branding',
    name: 'Shop Shutter Branding',
    retailType: 'Kirana • Pharmacy • Salon',
    imageUrl: '/images/admesh-shutter-branding.png',
    sizeOptions: ['Single Shutter', 'Double Shutter', 'Full Frontage'],
    description: 'Massive outdoor full-shutter wraps visible during off-hours.',
    material: 'Industrial flexible adhesive vinyl',
    printType: 'Solvent-based digital print',
    visibilityScore: '9.3 / 10',
    advantage: 'Dominates neighborhood streets when markets are closed.',
  },
  {
    id: 'digital-display',
    name: 'Digital Display Screen',
    retailType: 'Cafe • Pharmacy • Supermarket',
    imageUrl: '/images/admesh-smart-digital-screen.png',
    sizeOptions: ['24 inch', '32 inch', '43 inch'],
    description: 'Smart connected display screens running automated video ads.',
    material: 'Plug-and-play smart media terminal',
    printType: 'Digital screen display',
    visibilityScore: '9.5 / 10',
    advantage: 'Dynamic digital scheduling, remote updates, and movement capture.',
  },
  {
    id: 'store-takeover',
    name: 'Full Store Takeover',
    retailType: 'Kirana • Pharmacy • Supermarket',
    imageUrl: '/images/admesh-store-takeover.png',
    sizeOptions: ['Compact Store', 'Standard Store', 'Large Store'],
    description: '100% brand dominance wrapping the shop exterior and interior.',
    material: 'Multi-Asset Complete wrap package including shutters, outer walls, counters, and stickers',
    printType: 'Mixed media print package',
    visibilityScore: '9.8 / 10',
    advantage: 'Maximum impact, turns the entire local store into your brand billboard.',
  },
];

const RETAIL_TYPES = ['Kirana', 'Pharmacy', 'Supermarket', 'Tea Stall', 'Cafe', 'Salon/Spa', 'Mobile Shop', 'Modern Retail'];
const TIMELINE_OPTIONS = ['Within 7 days', 'Within 14 days', 'Within 21 days', 'Within 30 days'];
const CITIES = ['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai', 'Pune'];

const TIMELINE_CARDS = [
  {
    id: 'Within 7 days',
    label: 'Express Deployment',
    duration: 'Within 7 days',
    description: 'High-speed rollout for urgent visual campaigns.',
    icon: Zap,
    badge: 'Fast Track',
  },
  {
    id: 'Within 14 days',
    label: 'Standard Rollout',
    duration: 'Within 14 days',
    description: 'Our most popular optimized setup timeline.',
    icon: Calendar,
    badge: 'Popular',
  },
  {
    id: 'Within 21 days',
    label: 'Strategic Planned',
    duration: 'Within 21 days',
    description: 'Perfect for scheduled launches and coordinates.',
    icon: Clock3,
  },
  {
    id: 'Within 30 days',
    label: 'Flexible Horizon',
    duration: 'Within 30 days',
    description: 'Optimized rates and maximum customizability.',
    icon: CalendarRange,
  },
];

const RETAIL_TYPE_ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Kirana: ShoppingBasket,
  Pharmacy: Pill,
  Supermarket: Store,
  'Tea Stall': Coffee,
  Cafe: Coffee,
  'Salon/Spa': Scissors,
  'Mobile Shop': Smartphone,
  'Modern Retail': Building2,
};

const getSizeShape = (size: string): 'vertical' | 'horizontal' | 'square' => {
  const normalized = size.toLowerCase();
  if (normalized.includes('300 x 300') || normalized.includes('450 x 450') || normalized.includes('single shutter') || normalized.includes('double shutter') || normalized.includes('full frontage')) {
    return 'square';
  }
  const match = normalized.match(/(\d+)\s*x\s*(\d+)/);
  if (match) {
    const w = Number(match[1]);
    const h = Number(match[2]);
    if (!Number.isNaN(w) && !Number.isNaN(h)) {
      if (w > h) return 'horizontal';
      if (h > w) return 'vertical';
      return 'square';
    }
  }
  if (normalized.includes('a4') || normalized.includes('a5') || normalized.includes('a2') || normalized.includes('a1')) return 'vertical';
  return 'horizontal';
};

const CreateCampaignRequest = () => {
  const { user, profile } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedFormatForView, setSelectedFormatForView] = useState<AdFormat | null>(null);

  const [formData, setFormData] = useState({
    adFormatId: AD_FORMATS[0].id,
    adSize: AD_FORMATS[0].sizeOptions[0],
    retailTypes: [] as string[],
    outletCount: '100',
    timeline: TIMELINE_OPTIONS[1],
    targetLocations: [] as string[],
    campaignObjective: '',
    useCustomMaterial: false,
    customMaterialDetails: '',
    pickupLocation: '',
  });

  const selectedFormat = useMemo(
    () => AD_FORMATS.find((f) => f.id === formData.adFormatId) ?? AD_FORMATS[0],
    [formData.adFormatId]
  );

  const toggleRetailType = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      retailTypes: prev.retailTypes.includes(type)
        ? prev.retailTypes.filter((t) => t !== type)
        : [...prev.retailTypes, type],
    }));
  };

  const toggleCity = (city: string) => {
    setFormData((prev) => ({
      ...prev,
      targetLocations: prev.targetLocations.includes(city)
        ? prev.targetLocations.filter((c) => c !== city)
        : [...prev.targetLocations, city],
    }));
  };

  const onFormatChange = (formatId: string) => {
    const format = AD_FORMATS.find((f) => f.id === formatId);
    if (!format) return;
    setFormData((prev) => ({
      ...prev,
      adFormatId: format.id,
      adSize: format.sizeOptions[0],
    }));
  };

  const openViewModal = (format: AdFormat) => {
    setSelectedFormatForView(format);
    setViewModalOpen(true);
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
    setSelectedFormatForView(null);
  };

  const isValid =
    !!formData.adFormatId &&
    !!formData.adSize &&
    formData.retailTypes.length > 0 &&
    Number(formData.outletCount) > 0 &&
    formData.targetLocations.length > 0 &&
    !!formData.timeline &&
    (!formData.useCustomMaterial || (formData.customMaterialDetails && formData.pickupLocation));

  const totalSteps = 5;
  const isStepValid = (step: number) => {
    if (step === 1) return !!formData.adFormatId;
    if (step === 2) {
      return !!formData.adSize && (!formData.useCustomMaterial || (!!formData.customMaterialDetails && !!formData.pickupLocation));
    }
    if (step === 3) return formData.retailTypes.length > 0 && Number(formData.outletCount) > 0 && formData.targetLocations.length > 0;
    if (step === 4) return !!formData.timeline;
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'campaign_requests'), {
        brandId: profile?.brandId || user?.uid,
        brandName: profile?.displayName || 'Unknown Brand',
        status: 'pending',
        adFormat: {
          id: selectedFormat.id,
          name: selectedFormat.name,
          imageUrl: selectedFormat.imageUrl,
        },
        adSize: formData.adSize,
        retailTypes: formData.retailTypes,
        outletCount: Number(formData.outletCount),
        timeline: formData.timeline,
        targetLocations: formData.targetLocations.join(', '),
        campaignObjective: formData.campaignObjective.trim(),
        useCustomMaterial: formData.useCustomMaterial,
        customMaterialDetails: formData.customMaterialDetails.trim(),
        pickupLocation: formData.pickupLocation.trim(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      setSubmitted(true);
      setTimeout(() => router.push('/dashboard/campaigns'), 2200);
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white mb-6"
        >
          <CheckCircle2 size={38} />
        </motion.div>
        <h2 className="text-3xl font-bold mb-3">Thank you. Request submitted.</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          We are processing your ad request and it has been listed in your campaign queue. You will receive the next update shortly.
        </p>
      </div>
    );
  }

  const renderAdFormatModal = () => {
    if (!selectedFormatForView) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#111114] border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="relative">
            <button
              onClick={closeViewModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X size={20} />
            </button>
            <div className="aspect-video bg-[#09090b]">
              <img
                src={selectedFormatForView.imageUrl}
                alt={selectedFormatForView.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="p-8 space-y-6">
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">{selectedFormatForView.name}</h3>
              <p className="text-amber-400 text-sm font-medium">{selectedFormatForView.retailType}</p>
            </div>
            <p className="text-slate-300 leading-relaxed">{selectedFormatForView.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <h4 className="text-amber-400 font-semibold mb-3 flex items-center gap-2">
                  <Package size={18} />
                  Material Specifications
                </h4>
                <p className="text-slate-300 text-sm">{selectedFormatForView.material}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <h4 className="text-amber-400 font-semibold mb-3 flex items-center gap-2">
                  <Layers size={18} />
                  Print Type
                </h4>
                <p className="text-slate-300 text-sm">{selectedFormatForView.printType}</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <h4 className="text-amber-400 font-semibold mb-3">Available Sizes</h4>
              <div className="flex flex-wrap gap-2">
                {selectedFormatForView.sizeOptions.map((size) => (
                  <span key={size} className="px-3 py-2 bg-white/10 rounded-lg text-slate-300 text-sm">
                    {size}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <h4 className="text-amber-400 font-semibold mb-3">Strategic Advantage</h4>
              <p className="text-slate-300 text-sm">{selectedFormatForView.advantage}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span className="text-amber-400 font-semibold">Visibility Score:</span>
              <span>{selectedFormatForView.visibilityScore}</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto db-page pb-12">
      <div className="flex flex-row items-start justify-between gap-4 w-full">
        <div className="min-w-0 flex-1">
          <h1 className="db-heading">New Campaign Request</h1>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Place a request quickly: choose format, size, retail types, outlet count, and timeline.
          </p>
        </div>
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center justify-center gap-2.5 h-11 px-5 rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30 hover:text-rose-300 transition-all text-xs font-bold uppercase tracking-wider shrink-0"
          title="Cancel Campaign Request"
        >
          <X size={14} />
          <span>Cancel</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 pb-[75px]">
        <div className="db-card p-6 lg:p-8 space-y-5">
          <div className="flex items-center justify-between">
            <span className="db-kicker">Step {currentStep} / {totalSteps}</span>
            <span className="text-xs text-muted-foreground">
              {currentStep === 1 && 'Ad Format'}
              {currentStep === 2 && 'Size & Material'}
              {currentStep === 3 && 'Coverage'}
              {currentStep === 4 && 'Timeline'}
              {currentStep === 5 && 'Review & Submit'}
            </span>
          </div>
          <div className="h-1 w-full bg-white/10 overflow-hidden rounded-full">
            <div className="h-full bg-amber transition-all duration-300" style={{ width: `${(currentStep / totalSteps) * 100}%` }} />
          </div>
        </div>

        {currentStep === 1 && (
        <div className="db-card p-8 lg:p-10 space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-2 inline-flex items-center gap-2"><LayoutTemplate className="db-accent" size={20} /> 1. Select Ad Format</h2>
            <p className="text-sm text-muted-foreground">Choose from our available ad formats. Click &quot;View&quot; to see detailed specifications.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {AD_FORMATS.map((format) => {
              const active = formData.adFormatId === format.id;
              return (
                <div
                  key={format.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    active
                      ? 'border-amber-400 bg-amber-500/10 ring-2 ring-amber-400/30 shadow-lg shadow-amber-400/10'
                      : 'border-white/10 bg-white/5 hover:border-amber-300/40 hover:shadow-lg hover:shadow-black/20'
                  }`}
                >
                  <div className="h-52 bg-[#20242b] border-b border-white/10 relative overflow-hidden">
                    <img 
                      src={format.imageUrl} 
                      alt={format.name} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                    />
                    {active && (
                      <div className="absolute top-4 right-4 bg-amber-500 text-black px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                        Selected
                      </div>
                    )}
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <p className="text-lg font-semibold text-slate-100 leading-tight">{format.name}</p>
                      <p className="text-sm text-slate-400 leading-relaxed">{format.retailType}</p>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => onFormatChange(format.id)}
                        className={`flex-1 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                          active
                            ? 'bg-amber-500 text-black hover:bg-amber-400 shadow-md shadow-amber-500/20'
                            : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
                        }`}
                      >
                        Select
                      </button>
                      <button
                        type="button"
                        onClick={() => openViewModal(format)}
                        className="flex-1 px-5 py-3 rounded-xl text-sm font-semibold bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-200 flex items-center justify-center gap-2 border border-white/10"
                      >
                        <Eye size={18} />
                        View
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        )}

        {currentStep === 2 && (
        <>
        <div className="db-card p-8 lg:p-10 space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-2 inline-flex items-center gap-2"><Layers className="db-accent" size={20} /> 2. Select Size</h2>
            <p className="text-sm text-muted-foreground">
              Choose size based on selected ad format: <span className="text-slate-200">{selectedFormat.name}</span>. Each option includes a quick shape reference.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {selectedFormat.sizeOptions.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, adSize: size }))}
                className={`rounded-lg border px-4 py-3 text-sm text-left ${
                  formData.adSize === size
                    ? 'border-amber-400 bg-amber-500/10 text-slate-100'
                    : 'border-white/10 bg-white/5 text-slate-300 hover:border-amber-300/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-md border border-white/20 bg-white/5 flex items-center justify-center shrink-0">
                    {getSizeShape(size) === 'vertical' && <span className="w-3 h-5 border border-amber-300/80 rounded-[2px] block" />}
                    {getSizeShape(size) === 'horizontal' && <span className="w-5 h-3 border border-amber-300/80 rounded-[2px] block" />}
                    {getSizeShape(size) === 'square' && <span className="w-4 h-4 border border-amber-300/80 rounded-[2px] block" />}
                  </div>
                  <span>{size}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="db-card p-8 lg:p-10 space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-2 inline-flex items-center gap-2"><Package className="db-accent" size={20} /> 3. Material Options</h2>
            <p className="text-sm text-muted-foreground">
              Decide whether AdMesh handles printing + installation, or you provide the printed material and we handle deployment.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-slate-300 space-y-3 leading-relaxed">
              <p><span className="text-slate-100 font-semibold">Option A:</span> AdMesh prints, dispatches, and installs (recommended for faster execution).</p>
              <p><span className="text-slate-100 font-semibold">Option B:</span> You provide print-ready material; AdMesh manages on-ground installation and verification.</p>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="useCustomMaterial"
                checked={formData.useCustomMaterial}
                onChange={(e) => setFormData((prev) => ({ ...prev, useCustomMaterial: e.target.checked }))}
                className="w-5 h-5 rounded border-white/20 bg-white/5 text-amber-500 focus:ring-amber-500 focus:ring-offset-0"
              />
              <label htmlFor="useCustomMaterial" className="text-sm font-medium text-slate-200 cursor-pointer">
                I will provide my own printed material (AdMesh installation only)
              </label>
            </div>

            {formData.useCustomMaterial && (
              <div className="space-y-4 pl-8 border-l-2 border-amber-400/30 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold ml-1">Custom Material Details</label>
                  <textarea
                    value={formData.customMaterialDetails}
                    onChange={(e) => setFormData((prev) => ({ ...prev, customMaterialDetails: e.target.value }))}
                    className="db-input w-full px-4 py-3 min-h-[100px]"
                    placeholder="Describe your custom material (e.g., type, dimensions, specifications, quantity)"
                    required={formData.useCustomMaterial}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold ml-1">Pickup Location</label>
                  <input
                    type="text"
                    value={formData.pickupLocation}
                    onChange={(e) => setFormData((prev) => ({ ...prev, pickupLocation: e.target.value }))}
                    className="db-input w-full px-4 py-3"
                    placeholder="Enter the address where we can pick up your material"
                    required={formData.useCustomMaterial}
                  />
                </div>
                <div className="rounded-lg border border-amber-400/30 bg-amber-500/5 p-4 text-sm text-slate-300 flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5 text-amber-400 flex-shrink-0" />
                  <span>Our team will coordinate with you to schedule the pickup of your custom material at the specified location.</span>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                  Installation/service fees may still apply based on format type, outlet count, and city-level deployment complexity.
                </div>
              </div>
            )}

            {!formData.useCustomMaterial && (
              <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                AdMesh will handle print production standards, logistics, and installation as part of your campaign workflow.
              </div>
            )}
          </div>
        </div>
        </>
        )}

        {currentStep === 3 && (
        <div className="db-card p-8 lg:p-10 space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-2 inline-flex items-center gap-2"><Store className="db-accent" size={20} /> 4. Retail Types & Coverage</h2>
            <p className="text-sm text-muted-foreground">Pick where to run and how many outlets to cover.</p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="text-sm font-semibold mb-3 block">Retail Types (select one or more)</label>
              <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '16px 20px', marginTop: '24px', marginBottom: '32px' }}>
                {RETAIL_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleRetailType(type)}
                    className={`rounded-xl border p-3 md:p-4 flex flex-col items-center gap-2 md:gap-3 transition-all ${
                      formData.retailTypes.includes(type)
                        ? 'bg-amber-500 border-amber-500 text-[#1b140c]'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:border-amber-300/40'
                    }`}
                  >
                    {(() => {
                      const Icon = RETAIL_TYPE_ICON_MAP[type] ?? Store;
                      return <Icon className={`h-5 w-5 md:h-6 md:w-6 mt-1.5 md:mt-2.5 ${formData.retailTypes.includes(type) ? 'text-[#1b140c]' : 'text-amber-300'}`} />;
                    })()}
                    <span className="text-xs md:text-sm font-medium text-center">{type}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-sm font-semibold">Number of Outlets to Cover</label>
                  <span className="text-lg font-bold text-amber-400 tabular-nums">{formData.outletCount}</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={500}
                  step={5}
                  value={formData.outletCount}
                  onChange={(e) => setFormData((prev) => ({ ...prev, outletCount: e.target.value }))}
                  className="db-slider w-full"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-medium px-1">
                  <span>5</span>
                  <span>125</span>
                  <span>250</span>
                  <span>375</span>
                  <span>500+</span>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-semibold ml-1">Target Cities (select one or more)</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {CITIES.map((city) => {
                    const selected = formData.targetLocations.includes(city);
                    return (
                      <button
                        key={city}
                        type="button"
                        onClick={() => toggleCity(city)}
                        className={`px-5 py-3 rounded-xl text-sm font-semibold border transition-all ${
                          selected
                            ? 'bg-amber-500 border-amber-500 text-[#1b140c]'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:border-amber-400/40 hover:text-slate-100'
                        }`}
                      >
                        {city}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        )}

        {currentStep === 4 && (
        <div className="db-card p-8 lg:p-10 space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-2 inline-flex items-center gap-2"><Clock3 className="db-accent" size={20} /> 5. Timeline & Notes</h2>
            <p className="text-sm text-muted-foreground">Select your desired execution timeline and outline your campaign objectives.</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-semibold mb-3 block">Deployment Timeline (select one)</label>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {TIMELINE_CARDS.map((card) => {
                  const Icon = card.icon;
                  const isSelected = formData.timeline === card.duration;
                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, timeline: card.duration }))}
                      className={`relative text-left rounded-xl border p-5 flex flex-col justify-between h-[155px] transition-all ${
                        isSelected
                          ? 'bg-amber-500/10 border-amber-500 text-slate-100 shadow-[0_0_15px_rgba(201,115,32,0.15)]'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:border-amber-500/40 hover:bg-white/8'
                      }`}
                    >
                      {card.badge && (
                        <span className={`absolute top-3 right-3 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-amber-500 text-[#1b140c]' : 'bg-white/10 text-slate-400'
                        }`}>
                          {card.badge}
                        </span>
                      )}
                      <div>
                        <Icon size={22} className={isSelected ? 'text-amber-400' : 'text-slate-400'} />
                      </div>
                      <div className="mt-4">
                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{card.label}</p>
                        <p className="text-sm font-bold text-slate-100 mt-0.5">{card.duration}</p>
                        <p className="text-[10px] text-slate-500 mt-1 leading-normal line-clamp-2">{card.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Campaign Objective (optional)</label>
              <input
                type="text"
                value={formData.campaignObjective}
                onChange={(e) => setFormData((prev) => ({ ...prev, campaignObjective: e.target.value }))}
                className="db-input w-full px-4 py-3"
                placeholder="e.g. Improve in-store visibility for new SKU"
              />
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-slate-300 inline-flex items-start gap-2">
            <MapPin size={16} className="mt-0.5 text-amber-300" />
            We will use your selections to quickly shortlist matching stores, estimate rollout feasibility, and queue your request for execution.
          </div>
        </div>
        )}

        {currentStep === 5 && (
          <div className="db-card p-8 lg:p-10 space-y-6">
            <h2 className="text-xl font-bold inline-flex items-center gap-2"><Send className="db-accent" size={20} /> 5. Review & Submit</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="rounded-lg border border-white/10 bg-white/5 p-4"><span className="text-muted-foreground">Format:</span> <span className="text-slate-100">{selectedFormat.name}</span></div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4"><span className="text-muted-foreground">Size:</span> <span className="text-slate-100">{formData.adSize}</span></div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4"><span className="text-muted-foreground">Retail:</span> <span className="text-slate-100">{formData.retailTypes.join(', ')}</span></div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4"><span className="text-muted-foreground">Outlets:</span> <span className="text-slate-100">{formData.outletCount}</span></div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4"><span className="text-muted-foreground">Timeline:</span> <span className="text-slate-100">{formData.timeline}</span></div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4"><span className="text-muted-foreground">Location:</span> <span className="text-slate-100">{formData.targetLocations.join(', ') || 'Not specified'}</span></div>
            </div>
          </div>
        )}

        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#0c0c0e]/92 backdrop-blur-xl">
          <div className="container-full py-4 flex items-center justify-between gap-4">
            <div className="text-xs text-white/45 mono uppercase tracking-[0.18em]">
              Step {currentStep} / {totalSteps}
            </div>
            <div className="flex items-center gap-3">
              {currentStep > 1 && (
                <button type="button" onClick={() => setCurrentStep((s) => Math.max(1, s - 1))} className="db-btn-ghost px-8">
                  Back
                </button>
              )}
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  disabled={!isStepValid(currentStep)}
                  onClick={() => setCurrentStep((s) => Math.min(totalSteps, s + 1))}
                  className="db-btn-primary px-10 disabled:opacity-60"
                >
                  Next
                </button>
              ) : (
                <button type="submit" disabled={loading || !isValid} className="db-btn-primary px-10 disabled:opacity-60">
                  {loading ? 'Submitting...' : 'Submit Ad Request'}
                </button>
              )}
            </div>
          </div>
        </div>
      </form>

      {viewModalOpen && renderAdFormatModal()}
    </div>
  );
};

export default CreateCampaignRequest;
