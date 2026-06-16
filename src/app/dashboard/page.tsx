'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { 
  Plus, 
  Search, 
  ChevronDown, 
  SlidersHorizontal,
  Calendar,
  DollarSign,
  TrendingUp,
  Store,
  Play,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type CampaignDoc = {
  id: string;
  name?: string;
  title?: string;
  status?: string;
  targetLocations?: string;
  location?: string;
  retailTypes?: string[];
  outletCount?: number;
  budget?: number;
  createdAt?: { seconds?: number };
  adFormat?: { name?: string };
  roi?: string;
  progress?: number;
  updatedAt?: { seconds?: number };
  cities?: string;
  lastUpdated?: string;
};

export default function CampaignWorkspaceLanding() {
  const { profile, user } = useAuth();
  
  // Dynamic Campaigns State loaded from Firebase
  const [campaigns, setCampaigns] = useState<CampaignDoc[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Search & Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [provinceFilter, setProvinceFilter] = useState('All');
  const [budgetFilter, setBudgetFilter] = useState('All');

  const [activeDropdown, setActiveDropdown] = useState<'status' | 'province' | 'budget' | null>(null);
  const [showDemoModal, setShowDemoModal] = useState(false);

  // Fetch campaign requests and active offers from Firestore
  const loadCampaigns = React.useCallback(async () => {
    const brandId = profile?.brandId || user?.uid;
    if (!brandId) return;

    setLoading(true);
    try {
      // 1. Fetch offers (active campaigns)
      let offersList: CampaignDoc[] = [];
      try {
        const qOffers = query(collection(db, 'offers'), where('brandId', '==', brandId));
        const snap = await getDocs(qOffers);
        offersList = snap.docs.map(doc => {
          const data = doc.data();
          return { 
            id: doc.id, 
            name: data.title || 'Active Campaign',
            status: data.status || 'active',
            cities: data.location || 'Multi-city',
            stores: data.outletCount || 45,
            budget: data.budget || 15000,
            roi: data.roi || '4.2x',
            progress: data.progress || 100,
            lastUpdated: data.updatedAt?.seconds 
              ? `${Math.round((Date.now() - data.updatedAt.seconds * 1000) / (1000 * 3600 * 24))} days ago` 
              : 'Yesterday',
            ...data 
          } as CampaignDoc;
        });
      } catch (err) {
        console.warn('Error fetching offers:', err);
      }

      // 2. Fetch campaign requests (pending/review/draft campaigns)
      let requestsList: CampaignDoc[] = [];
      try {
        const qReqs = query(collection(db, 'campaign_requests'), where('brandId', '==', brandId));
        const snap = await getDocs(qReqs);
        requestsList = snap.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || (data.adFormat?.name ? `${data.adFormat.name} Request` : 'Campaign Request'),
            status: data.status || 'pending',
            cities: data.targetLocations || 'Multi-city',
            stores: data.outletCount || 25,
            budget: data.budget || 12000,
            roi: data.roi || '3.5x',
            progress: data.status === 'pending' ? 20 : data.status === 'review' ? 60 : 10,
            lastUpdated: data.updatedAt?.seconds 
              ? `${Math.round((Date.now() - data.updatedAt.seconds * 1000) / (1000 * 3600))} hours ago` 
              : '2 hours ago',
            createdAt: data.createdAt,
            adFormat: data.adFormat
          } as CampaignDoc;
        });
      } catch (err) {
        console.warn('Error fetching requests:', err);
      }

      // Combine lists and sort by date descending
      const combined = [...requestsList, ...offersList];
      setCampaigns(combined);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  }, [profile, user]);

  useEffect(() => {
    if (user) {
      loadCampaigns();
    }
  }, [user, loadCampaigns]);

  // Filtering Logic
  const filteredCampaigns = useMemo(() => {
    return campaigns.filter(c => {
      // 1. Search term match
      const nameMatch = (c.name || '').toLowerCase().includes(searchTerm.toLowerCase());
      const cityMatch = (c.cities || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSearch = nameMatch || cityMatch;

      // 2. Status match
      const matchesStatus = statusFilter === 'All' || c.status?.toLowerCase() === statusFilter.toLowerCase();

      // 3. Province match
      const matchesProvince = provinceFilter === 'All' || (c.cities || '').toLowerCase().includes(provinceFilter.toLowerCase());

      // 4. Budget match
      let matchesBudget = true;
      if (budgetFilter !== 'All') {
        const budgetVal = Number(c.budget || 0);
        if (budgetFilter === '< $15,000') matchesBudget = budgetVal < 15000;
        if (budgetFilter === '$15,000 - $30,000') matchesBudget = budgetVal >= 15000 && budgetVal <= 30000;
        if (budgetFilter === '> $30,000') matchesBudget = budgetVal > 30000;
      }

      return matchesSearch && matchesStatus && matchesProvince && matchesBudget;
    });
  }, [campaigns, searchTerm, statusFilter, provinceFilter, budgetFilter]);

  const toggleDropdown = (dropdown: 'status' | 'province' | 'budget') => {
    setActiveDropdown(prev => prev === dropdown ? null : dropdown);
  };

  return (
    <div className="db-page">

      {/* Workspace Header Panel */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#11233B', textTransform: 'uppercase', letterSpacing: '-0.02em', fontFamily: 'var(--font-space)' }}>Campaigns</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/dashboard/campaigns/new?templates=true" className="db-btn-ghost text-xs">Browse Templates</Link>
          <Link href="/dashboard/campaigns/new" className="db-btn-primary text-xs">
            <Plus size={14} />
            <span>New Campaign</span>
          </Link>
        </div>
      </div>

      {/* Conditional Workspace State */}
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0' }}>
          <div className="w-6 h-6 border-2 border-[#11233B] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : campaigns.length === 0 ? (

        /* ── Empty State Card ── */
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid rgba(17,35,59,0.10)',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '48px',
          alignItems: 'center',
          padding: '64px 56px',
        }}>
          {/* Left: copy + CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: 0 }}>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#11233B', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1.2, fontFamily: 'var(--font-space)' }}>
              Create your first retail media campaign
            </h2>
            <p style={{ fontSize: '12px', color: '#52617A', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', lineHeight: 1.8, maxWidth: '520px' }}>
              Launch campaigns across verified convenience stores, pharmacies, supermarkets and cafés in Canada. Plan target locations, budget metrics, and placements directly from your workspace.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px' }}>
              <Link href="/dashboard/campaigns/new" className="db-btn-primary text-xs">
                Create Campaign
              </Link>
              <button
                onClick={() => setShowDemoModal(true)}
                className="text-xs font-bold font-mono uppercase tracking-wider text-[#11233B] hover:text-[#FFB300] transition-all cursor-pointer"
                style={{ padding: '8px 12px' }}
              >
                Watch Demo
              </button>
            </div>
          </div>

          {/* Right: decorative SVG */}
          <div style={{ width: '160px', flexShrink: 0 }}>
            <svg viewBox="0 0 200 200" style={{ width: '100%', height: 'auto' }} fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#52617A]/25">
              <line x1="10" y1="180" x2="190" y2="180" stroke="rgba(17,35,59,0.15)" strokeWidth="2"/>
              <rect x="35" y="45" width="130" height="135" rx="0" stroke="rgba(17,35,59,0.08)"/>
              <rect x="50" y="85" width="40" height="95" stroke="rgba(17,35,59,0.25)"/>
              <circle cx="82" cy="130" r="1.5" fill="rgba(17,35,59,0.25)"/>
              <rect x="102" y="65" width="55" height="75" rx="0" stroke="rgba(17,35,59,0.25)"/>
              <rect x="110" y="75" width="39" height="48" rx="0" fill="rgba(255,179,0,0.06)" stroke="#FFB300" strokeWidth="1.5"/>
              <path d="M129 93 L126 97 L128 98 L126 102 L130 100 L132 104 L133 100 L137 102 L135 98 L137 97 Z" fill="#FFB300" stroke="none"/>
              <rect x="58" y="100" width="24" height="16" rx="0" stroke="#11233B" fill="#11233B" fillOpacity="0.03"/>
            </svg>
          </div>
        </div>

      ) : (

        /* ── Campaigns Listing Table ── */
        <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(17,35,59,0.10)', padding: '32px 36px' }}>

          {/* Filters & Search Toolbar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', paddingBottom: '20px', borderBottom: '1px solid rgba(17,35,59,0.08)', marginBottom: '8px' }}>

            {/* Search Input */}
            <div style={{ position: 'relative', width: '280px' }}>
              <Search className="absolute text-[#52617A]" size={13} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Filter campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="font-mono text-[#11233B] bg-[#E7E5DB]/30 border border-[#11233B]/15 focus:bg-white focus:outline-none focus:border-[#11233B] transition-all w-full"
                style={{ height: '36px', fontSize: '11px', paddingLeft: '34px', paddingRight: '12px' }}
              />
            </div>

            {/* Filter Dropdown Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span className="font-mono font-bold text-[#52617A] uppercase" style={{ fontSize: '9px', letterSpacing: '0.12em' }}>Filter:</span>

              {/* Status Filter */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => toggleDropdown('status')}
                  className="border border-[#11233B]/15 font-mono uppercase text-[#11233B] hover:border-[#11233B]/30 flex items-center gap-1.5 bg-[#E7E5DB]/20 cursor-pointer"
                  style={{ padding: '6px 10px', fontSize: '10px', letterSpacing: '0.08em' }}
                >
                  <span>Status: {statusFilter}</span>
                  <ChevronDown size={11} className="text-[#52617A]" />
                </button>
                {activeDropdown === 'status' && (
                  <div className="absolute right-0 mt-1 bg-[#F1EFE6] border border-[#11233B]/15 shadow-xl z-20 font-mono uppercase" style={{ width: '140px', padding: '4px', fontSize: '9px', letterSpacing: '0.08em' }}>
                    {['All', 'Active', 'Pending', 'Draft'].map(st => (
                      <button key={st} onClick={() => { setStatusFilter(st); setActiveDropdown(null); }} className="w-full text-left font-semibold text-[#11233B] hover:bg-[#E7E5DB]/50" style={{ padding: '6px 10px' }}>{st}</button>
                    ))}
                  </div>
                )}
              </div>

              {/* Province Filter */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => toggleDropdown('province')}
                  className="border border-[#11233B]/15 font-mono uppercase text-[#11233B] hover:border-[#11233B]/30 flex items-center gap-1.5 bg-[#E7E5DB]/20 cursor-pointer"
                  style={{ padding: '6px 10px', fontSize: '10px', letterSpacing: '0.08em' }}
                >
                  <span>Province: {provinceFilter}</span>
                  <ChevronDown size={11} className="text-[#52617A]" />
                </button>
                {activeDropdown === 'province' && (
                  <div className="absolute right-0 mt-1 bg-[#F1EFE6] border border-[#11233B]/15 shadow-xl z-20 font-mono uppercase" style={{ width: '160px', padding: '4px', fontSize: '9px', letterSpacing: '0.08em' }}>
                    {['All', 'Ontario', 'Quebec', 'British Columbia', 'Alberta'].map(pr => (
                      <button key={pr} onClick={() => { setProvinceFilter(pr); setActiveDropdown(null); }} className="w-full text-left font-semibold text-[#11233B] hover:bg-[#E7E5DB]/50" style={{ padding: '6px 10px' }}>{pr}</button>
                    ))}
                  </div>
                )}
              </div>

              {/* Budget Filter */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => toggleDropdown('budget')}
                  className="border border-[#11233B]/15 font-mono uppercase text-[#11233B] hover:border-[#11233B]/30 flex items-center gap-1.5 bg-[#E7E5DB]/20 cursor-pointer"
                  style={{ padding: '6px 10px', fontSize: '10px', letterSpacing: '0.08em' }}
                >
                  <span>Budget: {budgetFilter}</span>
                  <ChevronDown size={11} className="text-[#52617A]" />
                </button>
                {activeDropdown === 'budget' && (
                  <div className="absolute right-0 mt-1 bg-[#F1EFE6] border border-[#11233B]/15 shadow-xl z-20 font-mono uppercase" style={{ width: '176px', padding: '4px', fontSize: '9px', letterSpacing: '0.08em' }}>
                    {['All', '< $15,000', '$15,000 - $30,000', '> $30,000'].map(bu => (
                      <button key={bu} onClick={() => { setBudgetFilter(bu); setActiveDropdown(null); }} className="w-full text-left font-semibold text-[#11233B] hover:bg-[#E7E5DB]/50" style={{ padding: '6px 10px' }}>{bu}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Campaigns Workspace Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', textAlign: 'left', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(17,35,59,0.08)', color: '#52617A', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  <th style={{ padding: '12px 16px 12px 0' }}>Campaign Name</th>
                  <th style={{ padding: '12px 8px' }}>Status</th>
                  <th style={{ padding: '12px 8px' }}>Cities</th>
                  <th style={{ padding: '12px 8px' }}>Stores</th>
                  <th style={{ padding: '12px 8px' }}>Budget</th>
                  <th style={{ padding: '12px 8px' }}>ROI</th>
                  <th style={{ padding: '12px 8px' }}>Progress</th>
                  <th style={{ padding: '12px 0 12px 8px', textAlign: 'right' }}>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {filteredCampaigns.map((c) => (
                  <tr key={c.id} className="hover:bg-[#E7E5DB]/30 transition-colors group" style={{ borderBottom: '1px solid rgba(17,35,59,0.04)' }}>
                    <td style={{ padding: '16px 16px 16px 0', fontWeight: 700, color: '#11233B' }}>
                      <Link href={`/dashboard/campaigns/${c.id}`} className="hover:text-[#FFB300] transition-colors uppercase">{c.name}</Link>
                    </td>
                    <td style={{ padding: '16px 8px' }}>
                      <span className={`text-[8px] font-bold border uppercase tracking-wider ${
                        c.status === 'active' || c.status === 'live' ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : c.status === 'draft' ? 'bg-[#52617A]/10 text-[#52617A] border-[#52617A]/20'
                        : 'bg-[#FFB300]/10 text-[#FFB300] border-[#FFB300]/20'
                      }`} style={{ padding: '2px 6px' }}>
                        {c.status || 'pending'}
                      </span>
                    </td>
                    <td style={{ padding: '16px 8px', color: '#52617A', textTransform: 'uppercase' }}>{c.cities}</td>
                    <td style={{ padding: '16px 8px', color: '#52617A', textTransform: 'uppercase' }}>{c.outletCount ? `${c.outletCount} stores` : '45 stores'}</td>
                    <td style={{ padding: '16px 8px', fontWeight: 700, color: '#11233B' }}>${Number(c.budget || 0).toLocaleString()}</td>
                    <td style={{ padding: '16px 8px', color: '#52617A', fontWeight: 700 }}>{c.roi || '4.2x'}</td>
                    <td style={{ padding: '16px 8px', minWidth: '100px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '56px', height: '4px', backgroundColor: '#E7E5DB', overflow: 'hidden', flexShrink: 0 }}>
                          <div style={{ height: '100%', backgroundColor: '#11233B', width: `${c.progress || 50}%`, transition: 'width 0.3s ease' }} />
                        </div>
                        <span style={{ fontSize: '9px', color: '#52617A', fontWeight: 700 }}>{c.progress || 50}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px 0 16px 8px', textAlign: 'right', color: '#52617A', textTransform: 'uppercase' }}>{c.lastUpdated || '2 days ago'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* Demo Modal walkthrough popup */}
      <AnimatePresence>
        {showDemoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0A1A2C]/40 backdrop-blur-sm"
              onClick={() => setShowDemoModal(false)}
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-[#F1EFE6] border border-[#11233B]/15 rounded-none p-6 overflow-hidden z-10 space-y-4 font-mono uppercase"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#11233B]">[ WATCH WORKSPACE DEMO ]</p>
                  <p className="text-[9px] text-[#52617A] tracking-wider mt-1">LAUNCH CAMPAIGNS IN CANADIAN RETAIL OUTLETS</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDemoModal(false)}
                  className="w-7 h-7 rounded-none border border-[#11233B]/15 bg-[#E7E5DB] hover:bg-[#E7E5DB]/80 inline-flex items-center justify-center text-[#11233B] transition-colors cursor-pointer"
                >
                  <X size={12} />
                </button>
              </div>

              <div className="rounded-none border border-[#11233B]/10 bg-[#0A1A2C] overflow-hidden relative aspect-video flex flex-col items-center justify-center text-slate-400 gap-2">
                <Play size={28} className="text-[#FFB300] cursor-pointer hover:scale-110 transition-transform" />
                <span className="text-[9px] font-bold text-[#52617A] font-mono">ADMESH_WORKSPACE_DEMO.MP4</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
