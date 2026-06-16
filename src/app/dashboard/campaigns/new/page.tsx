'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { 
  Send, 
  CheckCircle2, 
  MapPin, 
  Store, 
  X, 
  Plus, 
  Calendar, 
  Sparkles, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Upload,
  ArrowRight,
  ArrowLeft,
  Check
} from 'lucide-react';
import { useRouter } from 'next/navigation';

type PlacementType = {
  id: string;
  name: string;
  useCase: string;
  visibility: string;
  costPerStore: number;
  imageUrl: string;
  recommendedObjectives: string[];
};

const PLACEMENTS: PlacementType[] = [
  {
    id: 'storefront-poster',
    name: 'Storefront Posters',
    useCase: 'Drives high-impact street-level awareness to foot traffic before store entry.',
    visibility: 'Very High (9.1/10)',
    costPerStore: 150,
    imageUrl: '/images/admesh-instore-poster-display.jpeg',
    recommendedObjectives: ['Brand Awareness', 'Seasonal Promotion', 'Local Marketing']
  },
  {
    id: 'shelf-branding',
    name: 'Shelf Branding',
    useCase: 'Category highlight strips to steer instant brand recognition and shelf choice.',
    visibility: 'High (8.9/10)',
    costPerStore: 120,
    imageUrl: '/images/admesh-shelf-edge-branding.jpeg',
    recommendedObjectives: ['Product Launch', 'Sales Campaign', 'Seasonal Promotion']
  },
  {
    id: 'counter-display',
    name: 'Counter Displays',
    useCase: '3D structural placement at cash registers for active impulse gaze tracking.',
    visibility: 'Excellent (8.6/10)',
    costPerStore: 180,
    imageUrl: '/images/admesh-countertop-display-unit.jpeg',
    recommendedObjectives: ['Product Launch', 'Sales Campaign']
  },
  {
    id: 'digital-display',
    name: 'Digital Displays',
    useCase: 'Plug-and-play digital scheduling for dynamic in-store media campaigns.',
    visibility: 'High (8.7/10)',
    costPerStore: 250,
    imageUrl: '/images/admesh-smart-digital-screen.jpeg',
    recommendedObjectives: ['Brand Awareness', 'Product Launch', 'Seasonal Promotion']
  },
  {
    id: 'window-graphics',
    name: 'Window Graphics',
    useCase: 'Double-sided adhesive wraps catching attention during doors opening.',
    visibility: 'Good (8.2/10)',
    costPerStore: 100,
    imageUrl: '/images/admesh-counter-promo-card.jpeg',
    recommendedObjectives: ['Brand Awareness', 'Local Marketing']
  }
];

const PROVINCES = ['Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Nova Scotia', 'Manitoba', 'Saskatchewan'];
const OBJECTIVES = ['Brand Awareness', 'Product Launch', 'Seasonal Promotion', 'Sales Campaign', 'Local Marketing'];
const STORE_CATEGORIES = ['Convenience Stores', 'Pharmacies', 'Cafe & Coffee Shops', 'Supermarkets', 'Gas Stations'];

export default function StrategistCampaignWizard() {
  const { user, profile } = useAuth();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    brandName: '',
    productName: '',
    objective: 'Brand Awareness',
    province: 'Ontario',
    city: 'Toronto',
    storeCategories: [] as string[],
    budget: 25000,
    startDate: '',
    endDate: '',
    selectedPlacements: [] as string[],
    artworkUrl: '' as string | null,
    artworkName: ''
  });

  const [aiPrompt, setAiPrompt] = useState('');
  const [generatingAi, setGeneratingAi] = useState(false);
  const [aiStatus, setAiStatus] = useState('');

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;
    setGeneratingAi(true);
    setAiStatus('Strategizing campaign parameters...');
    setTimeout(() => {
      const promptLower = aiPrompt.toLowerCase();
      let parsedBudget = 25000;
      const budgetMatch = promptLower.match(/\$?(\d+[\d,]*)/);
      if (budgetMatch) parsedBudget = parseInt(budgetMatch[1].replace(/,/g, ''));
      let parsedCity = 'Toronto';
      let parsedProvince = 'Ontario';
      if (promptLower.includes('vancouver')) { parsedCity = 'Vancouver'; parsedProvince = 'British Columbia'; }
      else if (promptLower.includes('montreal') || promptLower.includes('montréal')) { parsedCity = 'Montreal'; parsedProvince = 'Quebec'; }
      else if (promptLower.includes('calgary')) { parsedCity = 'Calgary'; parsedProvince = 'Alberta'; }
      let parsedCategory = 'Convenience Stores';
      if (promptLower.includes('pharmacy') || promptLower.includes('pharmacies')) parsedCategory = 'Pharmacies';
      else if (promptLower.includes('cafe') || promptLower.includes('coffee')) parsedCategory = 'Cafe & Coffee Shops';
      else if (promptLower.includes('supermarket')) parsedCategory = 'Supermarkets';
      let parsedObjective = 'Seasonal Promotion';
      if (promptLower.includes('awareness') || promptLower.includes('brand')) parsedObjective = 'Brand Awareness';
      else if (promptLower.includes('launch')) parsedObjective = 'Product Launch';
      else if (promptLower.includes('sales')) parsedObjective = 'Sales Campaign';
      setAiStatus('Evaluating audience reach and budget timeline...');
      setTimeout(() => {
        setFormData(prev => ({
          ...prev,
          name: `AI: Back-to-School Refresh (${parsedCity})`,
          brandName: profile?.displayName?.split(' ')[0] || 'Coca-Cola',
          productName: 'Zero Sugar Refresh',
          objective: parsedObjective,
          province: parsedProvince,
          city: parsedCity,
          storeCategories: [parsedCategory],
          budget: parsedBudget,
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          selectedPlacements: ['storefront-poster', 'shelf-branding'],
          artworkUrl: '/images/admesh-network.jpeg',
          artworkName: 'back_to_school_creative.png'
        }));
        setGeneratingAi(false);
        setAiStatus('');
        setCurrentStep(6);
      }, 800);
    }, 800);
  };

  const estimatedStoreCount = useMemo(() => {
    if (formData.storeCategories.length === 0) return 0;
    let multiplier = 22;
    if (formData.province === 'Ontario') multiplier = 44;
    if (formData.province === 'Quebec') multiplier = 32;
    if (formData.province === 'British Columbia') multiplier = 28;
    return formData.storeCategories.length * multiplier;
  }, [formData.province, formData.storeCategories]);

  const recommendedPlacements = useMemo(() => {
    return PLACEMENTS.filter(p => p.recommendedObjectives.includes(formData.objective));
  }, [formData.objective]);

  useEffect(() => {
    if (currentStep === 4 && formData.selectedPlacements.length === 0) {
      setFormData(prev => ({ ...prev, selectedPlacements: recommendedPlacements.map(p => p.id) }));
    }
  }, [currentStep, recommendedPlacements, formData.selectedPlacements.length]);

  const isStepValid = (step: number) => {
    if (step === 1) return formData.name.trim() !== '' && formData.brandName.trim() !== '' && formData.objective !== '';
    if (step === 2) return formData.province !== '' && formData.city.trim() !== '' && formData.storeCategories.length > 0;
    if (step === 3) return formData.budget >= 5000 && formData.startDate !== '' && formData.endDate !== '';
    if (step === 4) return formData.selectedPlacements.length > 0;
    if (step === 5) return true;
    return true;
  };

  const toggleCategory = (cat: string) => {
    setFormData(prev => ({
      ...prev,
      storeCategories: prev.storeCategories.includes(cat)
        ? prev.storeCategories.filter(c => c !== cat)
        : [...prev.storeCategories, cat]
    }));
  };

  const togglePlacement = (pid: string) => {
    setFormData(prev => ({
      ...prev,
      selectedPlacements: prev.selectedPlacements.includes(pid)
        ? prev.selectedPlacements.filter(id => id !== pid)
        : [...prev.selectedPlacements, pid]
    }));
  };

  const [backdrop, setBackdrop] = useState<'convenience' | 'cafe' | 'pharmacy'>('convenience');
  const backdropImages = {
    convenience: '/images/storefront.jpeg',
    cafe: '/images/cafe.jpeg',
    pharmacy: '/images/medical.jpeg'
  };

  const predictions = useMemo(() => {
    const averageStoreCost = 150;
    const storesCovered = Math.min(estimatedStoreCount, Math.round(formData.budget / averageStoreCost));
    const reach = storesCovered * 5200;
    const impressions = storesCovered * 13500;
    let roi = '3.5x';
    if (formData.objective === 'Sales Campaign') roi = '4.8x';
    if (formData.objective === 'Product Launch') roi = '4.1x';
    if (formData.objective === 'Seasonal Promotion') roi = '3.8x';
    return {
      stores: storesCovered > 0 ? storesCovered : 12,
      reach: reach > 0 ? `${(reach / 1000).toFixed(0)}k` : '55k',
      impressions: impressions > 0 ? `${(impressions / 1000000).toFixed(1)}M` : '1.1M',
      roi
    };
  }, [formData.budget, formData.objective, estimatedStoreCount]);

  const handleLaunchCampaign = async () => {
    setLoading(true);
    try {
      const selectedPlacementsNames = formData.selectedPlacements.map(pid => PLACEMENTS.find(p => p.id === pid)?.name).filter(Boolean);
      const payload = {
        brandId: profile?.brandId || user?.uid || 'anonymous_brand',
        brandName: profile?.displayName || 'Coca-Cola Canada Marketing',
        status: 'pending',
        adFormat: {
          id: formData.selectedPlacements[0] || 'storefront-poster',
          name: selectedPlacementsNames.join(', ') || 'Storefront Posters',
          imageUrl: PLACEMENTS.find(p => p.id === formData.selectedPlacements[0])?.imageUrl || '/images/admesh-instore-poster-display.jpeg'
        },
        adSize: 'Standard Placement',
        retailTypes: formData.storeCategories,
        outletCount: predictions.stores,
        timeline: `${Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 3600 * 24))} Days Campaign`,
        targetLocations: `${formData.city}, ${formData.province}`,
        campaignObjective: formData.objective,
        budget: formData.budget,
        placements: formData.selectedPlacements,
        artworkUrl: formData.artworkUrl,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      await addDoc(collection(db, 'campaign_requests'), payload);
      setSubmitted(true);
      setTimeout(() => { router.push('/dashboard'); }, 1800);
    } catch (err) {
      console.error('Error launching campaign:', err);
      alert('Launch failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── Success state ──
  if (submitted) {
    return (
      <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(17,35,59,0.10)', padding: '80px 52px', maxWidth: '860px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '20px' }}>
        <div style={{ width: '52px', height: '52px', backgroundColor: 'rgba(255,179,0,0.08)', border: '2px solid rgba(255,179,0,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="animate-pulse">
          <CheckCircle2 size={24} className="text-[#FFB300]" />
        </div>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#11233B', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>Campaign Strategist Logged</h2>
          <p style={{ fontSize: '12px', color: '#52617A', lineHeight: 1.7, maxWidth: '360px', fontFamily: 'var(--font-mono)' }}>
            Your campaign details have been verified and scheduled. Partner checks, screen allocation, and print checks are starting.
          </p>
        </div>
        <p style={{ fontSize: '10px', color: '#52617A', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em' }} className="animate-pulse">Navigating back to campaign manager...</p>
      </div>
    );
  }

  // ── Wizard ──
  return (
    <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(17,35,59,0.10)', padding: '48px 52px 56px 52px', maxWidth: '860px' }}>

      {/* ── Wizard Header ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', paddingBottom: '24px', borderBottom: '1px solid rgba(17,35,59,0.08)', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#11233B', textTransform: 'uppercase', letterSpacing: '-0.01em', fontFamily: 'var(--font-space)', marginBottom: '6px' }}>New Campaign</h1>
          <p style={{ fontSize: '11px', color: '#52617A', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Step {currentStep} of 6 — {
              currentStep === 1 ? 'Product Details' :
              currentStep === 2 ? 'Audience Reach' :
              currentStep === 3 ? 'Budget & Timeline' :
              currentStep === 4 ? 'AI Placement Recommendations' :
              currentStep === 5 ? 'Artwork Mockups' : 'Review & Launch'
            }
          </p>
        </div>
        <button
          type="button"
          onClick={() => router.back()}
          className="text-[#52617A] hover:text-[#11233B] font-mono uppercase font-bold transition-colors"
          style={{ fontSize: '10px', letterSpacing: '0.1em', padding: '8px 14px', border: '1px solid rgba(17,35,59,0.12)', backgroundColor: 'transparent', cursor: 'pointer' }}
        >
          Cancel
        </button>
      </div>

      {/* ── AI Prompt Strategist ── */}
      <div style={{ backgroundColor: '#F1EFE6', border: '1px solid rgba(17,35,59,0.08)', padding: '20px 24px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Sparkles size={14} className="text-[#FFB300]" />
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#11233B', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>AI Prompt Strategist</span>
        </div>
        <form onSubmit={handleAiSubmit} style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="Launch a back-to-school campaign across Toronto convenience stores with a budget of $25,000."
            className="font-mono text-[#11233B] focus:outline-none focus:border-[#11233B] focus:bg-white transition-all"
            style={{ flex: 1, border: '1px solid rgba(17,35,59,0.15)', backgroundColor: '#ffffff', padding: '9px 14px', fontSize: '11px' }}
          />
          <button
            type="submit"
            disabled={generatingAi || !aiPrompt.trim()}
            className="db-btn-primary disabled:opacity-50"
            style={{ fontSize: '11px', padding: '0 20px', whiteSpace: 'nowrap' }}
          >
            Generate
          </button>
        </form>
        {generatingAi && (
          <p style={{ fontSize: '10px', color: '#FFB300', fontFamily: 'var(--font-mono)', marginTop: '10px', fontWeight: 600 }} className="animate-pulse">{aiStatus}</p>
        )}
      </div>

      {/* ── Step Progress Bar ── */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
        {Array.from({ length: 6 }).map((_, i) => {
          const stepNum = i + 1;
          const isCurrent = currentStep === stepNum;
          const isPassed = currentStep > stepNum;
          return (
            <React.Fragment key={i}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '10px', fontWeight: 700, fontFamily: 'var(--font-mono)',
                border: isCurrent ? '2px solid #11233B' : isPassed ? '2px solid #FFB300' : '2px solid rgba(17,35,59,0.15)',
                backgroundColor: isCurrent ? '#11233B' : isPassed ? '#FFB300' : 'transparent',
                color: isCurrent ? '#F1EFE6' : isPassed ? '#ffffff' : '#52617A',
                transition: 'all 0.2s ease'
              }}>
                {isPassed ? <Check size={10} /> : stepNum}
              </div>
              {i < 5 && <div style={{ flex: 1, height: '2px', backgroundColor: isPassed ? '#FFB300' : 'rgba(17,35,59,0.08)', transition: 'background-color 0.2s ease', margin: '0 4px' }} />}
            </React.Fragment>
          );
        })}
      </div>

      {/* ── Step Content ── */}
      <div style={{ minHeight: '280px' }}>

        {/* Step 1: What are you promoting? */}
        {currentStep === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#11233B', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>What are you promoting?</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {[
                { label: 'Campaign Name', key: 'name', placeholder: 'e.g. Summer Refresh 2026' },
                { label: 'Brand', key: 'brandName', placeholder: 'e.g. Coca-Cola' },
                { label: 'Product', key: 'productName', placeholder: 'e.g. Coca-Cola Zero Sugar' },
              ].map(({ label, key, placeholder }) => (
                <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '10px', fontWeight: 700, color: '#52617A', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>{label}</label>
                  <input
                    type="text"
                    value={formData[key as keyof typeof formData] as string}
                    onChange={(e) => setFormData(prev => ({ ...prev, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="focus:outline-none focus:border-[#11233B] text-[#11233B] font-mono transition-all"
                    style={{ border: '1px solid rgba(17,35,59,0.15)', padding: '10px 14px', fontSize: '12px', backgroundColor: '#F1EFE6' }}
                  />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ fontSize: '10px', fontWeight: 700, color: '#52617A', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>Campaign Objective</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {OBJECTIVES.map((obj) => (
                  <button
                    key={obj}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, objective: obj }))}
                    style={{
                      border: formData.objective === obj ? '2px solid #FFB300' : '1px solid rgba(17,35,59,0.12)',
                      backgroundColor: formData.objective === obj ? 'rgba(255,179,0,0.06)' : '#F1EFE6',
                      padding: '14px 16px', textAlign: 'left', cursor: 'pointer', transition: 'all 0.15s ease'
                    }}
                  >
                    <p style={{ fontSize: '11px', fontWeight: 700, color: '#11233B', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{obj}</p>
                    <p style={{ fontSize: '10px', color: '#52617A', lineHeight: 1.5 }}>
                      {obj === 'Brand Awareness' && 'Broad visibility across premium locations.'}
                      {obj === 'Product Launch' && 'Spotlight new SKUs on Canadian shelves.'}
                      {obj === 'Seasonal Promotion' && 'Aligned to holidays or calendar runs.'}
                      {obj === 'Sales Campaign' && 'Pushes checkout conversions and trials.'}
                      {obj === 'Local Marketing' && 'Geo-targeted neighbourhood impact.'}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Who do you want to reach? */}
        {currentStep === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#11233B', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>Who do you want to reach?</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '10px', fontWeight: 700, color: '#52617A', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>Province</label>
                <select
                  value={formData.province}
                  onChange={(e) => setFormData(prev => ({ ...prev, province: e.target.value }))}
                  className="focus:outline-none focus:border-[#11233B] text-[#11233B] font-mono transition-all"
                  style={{ border: '1px solid rgba(17,35,59,0.15)', padding: '10px 14px', fontSize: '12px', backgroundColor: '#F1EFE6' }}
                >
                  {PROVINCES.map((prov) => (<option key={prov} value={prov}>{prov}</option>))}
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '10px', fontWeight: 700, color: '#52617A', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>Target Cities</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  placeholder="e.g. Toronto, Mississauga"
                  className="focus:outline-none focus:border-[#11233B] text-[#11233B] font-mono transition-all"
                  style={{ border: '1px solid rgba(17,35,59,0.15)', padding: '10px 14px', fontSize: '12px', backgroundColor: '#F1EFE6' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '10px', fontWeight: 700, color: '#52617A', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>Retail Categories</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {STORE_CATEGORIES.map((cat) => {
                  const isSelected = formData.storeCategories.includes(cat);
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      style={{
                        padding: '8px 16px', fontSize: '11px', fontWeight: 600, fontFamily: 'var(--font-mono)',
                        border: isSelected ? '2px solid #FFB300' : '1px solid rgba(17,35,59,0.15)',
                        backgroundColor: isSelected ? 'rgba(255,179,0,0.08)' : '#F1EFE6',
                        color: isSelected ? '#FFB300' : '#52617A', cursor: 'pointer', transition: 'all 0.15s ease'
                      }}
                    >{cat}</button>
                  );
                })}
              </div>
              {formData.storeCategories.length > 0 && (
                <div style={{ backgroundColor: '#F1EFE6', border: '1px solid rgba(17,35,59,0.08)', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', color: '#52617A', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Estimated active coverage nodes:</span>
                  <span style={{ fontSize: '15px', fontWeight: 800, color: '#11233B', fontFamily: 'var(--font-mono)' }}>{estimatedStoreCount} outlets</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Budget & Timeline */}
        {currentStep === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#11233B', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>Budget & Timeline</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', backgroundColor: '#F1EFE6', border: '1px solid rgba(17,35,59,0.08)', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: '#52617A', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>Allocated Budget</span>
                <span style={{ fontSize: '24px', fontWeight: 800, color: '#FFB300', fontFamily: 'var(--font-mono)' }}>${formData.budget.toLocaleString()} CAD</span>
              </div>
              <input
                type="range" min={5000} max={100000} step={2500}
                value={formData.budget}
                onChange={(e) => setFormData(prev => ({ ...prev, budget: Number(e.target.value) }))}
                className="w-full cursor-pointer accent-[#FFB300]"
                style={{ height: '4px' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 700, color: '#52617A', fontFamily: 'var(--font-mono)' }}>
                <span>$5,000 MIN</span><span>$100,000 MAX</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[{ label: 'Start Date', key: 'startDate' }, { label: 'End Date', key: 'endDate' }].map(({ label, key }) => (
                <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '10px', fontWeight: 700, color: '#52617A', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>{label}</label>
                  <input
                    type="date"
                    value={formData[key as keyof typeof formData] as string}
                    onChange={(e) => setFormData(prev => ({ ...prev, [key]: e.target.value }))}
                    className="focus:outline-none focus:border-[#11233B] text-[#11233B] font-mono transition-all"
                    style={{ border: '1px solid rgba(17,35,59,0.15)', padding: '10px 14px', fontSize: '12px', backgroundColor: '#F1EFE6' }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: AI Recommendations */}
        {currentStep === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#11233B', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)', marginBottom: '6px' }}>AI Placement Recommendations</h3>
              <p style={{ fontSize: '11px', color: '#52617A', fontFamily: 'var(--font-mono)' }}>Matching objective: <strong>{formData.objective}</strong></p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {PLACEMENTS.map((placement) => {
                const isSelected = formData.selectedPlacements.includes(placement.id);
                const isAIRecommended = placement.recommendedObjectives.includes(formData.objective);
                return (
                  <div key={placement.id} style={{
                    border: isSelected ? '2px solid #FFB300' : '1px solid rgba(17,35,59,0.12)',
                    backgroundColor: isSelected ? 'rgba(255,179,0,0.04)' : '#F1EFE6',
                    padding: '18px', position: 'relative', transition: 'all 0.15s ease'
                  }}>
                    {isAIRecommended && (
                      <span style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '8px', fontWeight: 700, color: '#FFB300', backgroundColor: 'rgba(255,179,0,0.12)', padding: '3px 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', border: '1px solid rgba(255,179,0,0.2)' }}>
                        Recommended
                      </span>
                    )}
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                      <div style={{ width: '56px', height: '56px', flexShrink: 0, overflow: 'hidden', border: '1px solid rgba(17,35,59,0.1)' }}>
                        <img src={placement.imageUrl} alt={placement.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '12px', fontWeight: 700, color: '#11233B', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '4px' }}>{placement.name}</p>
                        <p style={{ fontSize: '10px', color: '#52617A', lineHeight: 1.5, marginBottom: '10px' }}>{placement.useCase}</p>
                        <div style={{ display: 'flex', gap: '14px', marginBottom: '12px' }}>
                          <span style={{ fontSize: '9px', color: '#52617A', fontFamily: 'var(--font-mono)' }}>Visibility: <strong style={{ color: '#11233B' }}>{placement.visibility}</strong></span>
                          <span style={{ fontSize: '9px', color: '#52617A', fontFamily: 'var(--font-mono)' }}>${placement.costPerStore}/store</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => togglePlacement(placement.id)}
                          style={{
                            padding: '6px 16px', fontSize: '10px', fontWeight: 700, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em',
                            border: isSelected ? '1px solid #FFB300' : '1px solid rgba(17,35,59,0.15)',
                            backgroundColor: isSelected ? '#FFB300' : 'transparent',
                            color: isSelected ? '#ffffff' : '#11233B', cursor: 'pointer', transition: 'all 0.15s ease',
                            display: 'inline-flex', alignItems: 'center', gap: '6px'
                          }}
                        >
                          {isSelected ? <><Check size={9} /> Selected</> : 'Select'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 5: Artwork */}
        {currentStep === 5 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#11233B', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>Upload Artwork & Mockups</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '24px', alignItems: 'start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ border: '2px dashed rgba(17,35,59,0.15)', padding: '32px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', backgroundColor: '#E7E5DB', border: '1px solid rgba(17,35,59,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Upload size={16} className="text-[#52617A]" />
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#11233B', marginBottom: '2px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Creative Artwork</p>
                    <p style={{ fontSize: '10px', color: '#52617A' }}>Drag files here or use sample below</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, artworkUrl: '/images/admesh-network.jpeg', artworkName: 'strategist_creative_brief.png' }))}
                    style={{ border: '1px solid rgba(17,35,59,0.15)', backgroundColor: '#E7E5DB', padding: '8px 20px', fontSize: '10px', fontWeight: 700, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: '#11233B', cursor: 'pointer', width: '100%' }}
                  >
                    Use Sample Artwork
                  </button>
                  {formData.artworkName && (
                    <p style={{ fontSize: '10px', color: '#FFB300', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{formData.artworkName}</p>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#52617A', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>Backdrop Template</span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                    {[{ id: 'convenience', label: 'Conv.' }, { id: 'cafe', label: 'Cafe' }, { id: 'pharmacy', label: 'Pharma' }].map((btn) => (
                      <button
                        key={btn.id}
                        type="button"
                        onClick={() => setBackdrop(btn.id as any)}
                        style={{
                          padding: '8px 4px', fontSize: '10px', fontWeight: 700, fontFamily: 'var(--font-mono)', textTransform: 'uppercase',
                          border: backdrop === btn.id ? '2px solid #FFB300' : '1px solid rgba(17,35,59,0.15)',
                          backgroundColor: backdrop === btn.id ? 'rgba(255,179,0,0.08)' : '#F1EFE6',
                          color: backdrop === btn.id ? '#FFB300' : '#52617A', cursor: 'pointer'
                        }}
                      >{btn.label}</button>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#52617A', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>Canadian Storefront Preview</span>
                <div style={{ border: '1px solid rgba(17,35,59,0.12)', overflow: 'hidden', backgroundColor: '#E7E5DB', position: 'relative', aspectRatio: '16/9' }}>
                  <img src={backdropImages[backdrop]} alt="Canadian storefront" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {formData.artworkUrl && (
                    <div className="absolute bg-white shadow-md border border-slate-400/20 overflow-hidden" style={
                      backdrop === 'convenience' ? { top: '28%', left: '42%', width: '18%', height: '38%', transform: 'perspective(500px) rotateY(-4deg)' }
                      : backdrop === 'cafe' ? { top: '32%', left: '26%', width: '16%', height: '33%', transform: 'perspective(400px) rotateY(2deg)' }
                      : { top: '20%', left: '46%', width: '20%', height: '38%' }
                    }>
                      <img src={formData.artworkUrl} alt="Artwork mock" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  {!formData.artworkUrl && (
                    <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(10,26,44,0.08)', backdropFilter: 'blur(1px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '10px', fontWeight: 600, color: '#11233B', backgroundColor: 'rgba(241,239,230,0.92)', padding: '6px 14px' }}>Upload artwork to overlay creative</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Review & Launch */}
        {currentStep === 6 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#11233B', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)', paddingBottom: '16px', borderBottom: '1px solid rgba(17,35,59,0.08)' }}>Review & Launch</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0', backgroundColor: '#F1EFE6', border: '1px solid rgba(17,35,59,0.08)' }}>
              {[
                { label: 'Stores Covered', value: `${predictions.stores} outlets` },
                { label: 'Est. Reach', value: `${predictions.reach} customers` },
                { label: 'Est. Impressions', value: predictions.impressions },
                { label: 'Projected ROI', value: predictions.roi, highlight: true },
              ].map(({ label, value, highlight }, idx) => (
                <div key={label} style={{ padding: '20px 24px', borderRight: idx < 3 ? '1px solid rgba(17,35,59,0.08)' : 'none' }}>
                  <span style={{ fontSize: '9px', fontWeight: 700, color: '#52617A', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '8px' }}>{label}</span>
                  <span style={{ fontSize: '18px', fontWeight: 800, color: highlight ? '#FFB300' : '#11233B', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>{value}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { label: 'Campaign Name', value: formData.name },
                { label: 'Objective', value: formData.objective },
                { label: 'Target Region', value: `${formData.city}, ${formData.province}` },
                { label: 'Allocated Budget', value: `$${formData.budget.toLocaleString()} CAD` },
                { label: 'Schedule', value: `${formData.startDate} → ${formData.endDate}` },
                { label: 'Placements', value: formData.selectedPlacements.map(pid => PLACEMENTS.find(p => p.id === pid)?.name).join(', ') || 'None' },
              ].map(({ label, value }) => (
                <div key={label} style={{ border: '1px solid rgba(17,35,59,0.08)', padding: '14px 18px', backgroundColor: '#F1EFE6' }}>
                  <span style={{ fontSize: '9px', fontWeight: 700, color: '#52617A', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '4px' }}>{label}</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#11233B', fontFamily: 'var(--font-mono)' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ── Navigation Footer ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '32px', marginTop: '40px', borderTop: '1px solid rgba(17,35,59,0.08)' }}>
        <div>
          {currentStep > 1 && (
            <button
              type="button"
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              className="db-btn-ghost"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px' }}
            >
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>
          )}
        </div>
        <div>
          {currentStep < 6 ? (
            <button
              type="button"
              disabled={!isStepValid(currentStep)}
              onClick={() => setCurrentStep(prev => Math.min(6, prev + 1))}
              className="db-btn-primary disabled:opacity-50"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', padding: '0 28px' }}
            >
              <span>Continue</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleLaunchCampaign}
              disabled={loading || formData.selectedPlacements.length === 0 || !formData.name}
              className="db-btn-primary disabled:opacity-50"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', padding: '0 36px', height: '44px' }}
            >
              <span>{loading ? 'Launching Campaign...' : 'Launch Campaign'}</span>
              <Send size={14} />
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
