'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { db } from '@/lib/firebase';
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { ArrowRight, RefreshCw, MapPin, Store, X, TrendingUp, ClipboardList, Clock, Layers } from 'lucide-react';

type StoreItem = {
  id: string;
  name: string;
  category: string;
  location: string;
  imageUrl: string | null;
};

function mapStoreDoc(id: string, data: Record<string, unknown>): StoreItem {
  const pick = (...keys: string[]) => {
    for (const key of keys) {
      const value = data[key];
      if (typeof value === 'string' && value.trim()) return value.trim();
    }
    return '';
  };

  const name = pick('storeName', 'name', 'retailerName', 'shopName', 'title') || 'Unnamed Store';
  const category = pick('category', 'storeCategory', 'retailCategory', 'type') || 'General Retail';
  const location = pick('location', 'locationName', 'city', 'area', 'pincode', 'postalCode') || 'Location unavailable';
  const imageUrl = pick('storefrontImage', 'storeFrontImage', 'imageUrl', 'photoUrl', 'frontImage') || null;

  return { id, name, category, location, imageUrl };
}

export default function DashboardOverview() {
  const { profile, user } = useAuth();
  const [stores, setStores] = useState<StoreItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedStore, setSelectedStore] = useState<StoreItem | null>(null);

  // Metrics States
  const [campaignCount, setCampaignCount] = useState(0);
  const [requestCount, setRequestCount] = useState(0);
  const [totalOutlets, setTotalOutlets] = useState(0);
  const [loadingMetrics, setLoadingMetrics] = useState(true);

  const firstName = useMemo(() => (profile?.displayName || 'Team').split(' ')[0], [profile?.displayName]);

  const loadStores = React.useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const candidates = ['stores', 'retailers'];
      let result: StoreItem[] = [];

      for (const coll of candidates) {
        try {
          const q = query(collection(db, coll), orderBy('createdAt', 'desc'), limit(20));
          const snap = await getDocs(q);
          result = snap.docs.map((d) => mapStoreDoc(d.id, d.data() as Record<string, unknown>));
          if (result.length > 0) break;
        } catch {
          const qFallback = query(collection(db, coll), limit(20));
          const snapFallback = await getDocs(qFallback);
          result = snapFallback.docs.map((d) => mapStoreDoc(d.id, d.data() as Record<string, unknown>));
          if (result.length > 0) break;
        }
      }

      setStores(result);
    } catch {
      setError('Could not load recent stores right now.');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMetrics = React.useCallback(async () => {
    const brandId = profile?.brandId || user?.uid;
    if (!brandId) return;

    setLoadingMetrics(true);
    try {
      // 1. Fetch offers (active campaigns)
      let activeCount = 0;
      try {
        const qOffers = query(collection(db, 'offers'), where('brandId', '==', brandId));
        const snap = await getDocs(qOffers);
        activeCount = snap.size;
      } catch (err) {
        console.warn('Error fetching offers metrics:', err);
      }

      // 2. Fetch campaign_requests (pending rollout requests)
      let pendingCount = 0;
      let outletsSum = 0;
      try {
        const qReqs = query(collection(db, 'campaign_requests'), where('brandId', '==', brandId));
        const snap = await getDocs(qReqs);
        pendingCount = snap.size;
        snap.forEach((doc) => {
          const data = doc.data();
          outletsSum += Number(data.outletCount || 0);
        });
      } catch (err) {
        console.warn('Error fetching requests metrics:', err);
      }

      setCampaignCount(activeCount);
      setRequestCount(pendingCount);
      setTotalOutlets(outletsSum);
    } catch (error) {
      console.error('Error loading metrics:', error);
    } finally {
      setLoadingMetrics(false);
    }
  }, [profile, user]);

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadStores();
      void loadMetrics();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [loadStores, loadMetrics]);

  return (
    <div className="db-page">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-semibold text-slate-50 tracking-tight">Welcome back, {firstName}</h1>
          <p className="text-slate-400 text-sm lg:text-base mt-2">Strategic retail media intelligence across campaigns, deployments, and market performance.</p>
        </div>
        <div className="flex items-center gap-3.5">
          <Link href="/dashboard/campaigns/new" className="db-btn-primary h-[44px] px-6 text-sm font-semibold normal-case tracking-normal">
            New Campaign <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      <section className="w-full grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-7 items-start">
        <div className="space-y-7">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-6">
            <div className="db-card p-5 relative overflow-hidden group">
              <div className="absolute right-4 top-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <TrendingUp size={48} className="text-amber-500" />
              </div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Active Campaigns</p>
              {loadingMetrics ? (
                <div className="h-9 w-12 bg-white/5 animate-pulse rounded mt-2" />
              ) : (
                <h3 className="text-3xl font-extrabold text-slate-100 mt-2">{campaignCount}</h3>
              )}
              <p className="text-xs text-muted-foreground mt-1">Live screen deployments</p>
            </div>

            <div className="db-card p-5 relative overflow-hidden group">
              <div className="absolute right-4 top-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <ClipboardList size={48} className="text-amber-500" />
              </div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Campaign Requests</p>
              {loadingMetrics ? (
                <div className="h-9 w-12 bg-white/5 animate-pulse rounded mt-2" />
              ) : (
                <h3 className="text-3xl font-extrabold text-amber-400 mt-2">{requestCount}</h3>
              )}
              <p className="text-xs text-muted-foreground mt-1">Pending review & rollout</p>
            </div>

            <div className="db-card p-5 relative overflow-hidden group">
              <div className="absolute right-4 top-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Store size={48} className="text-amber-500" />
              </div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Outlets Covered</p>
              {loadingMetrics ? (
                <div className="h-9 w-12 bg-white/5 animate-pulse rounded mt-2" />
              ) : (
                <h3 className="text-3xl font-extrabold text-slate-100 mt-2">{totalOutlets}</h3>
              )}
              <p className="text-xs text-muted-foreground mt-1">Across all campaigns</p>
            </div>
          </div>

          <div aria-hidden="true" className="h-6 lg:h-8" />

          {/* Quick Actions / Recent Campaign Request teaser */}
          <div>
            <div className="db-card p-6 lg:p-7 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="db-card-title">Campaign Request Center</h3>
                  <p className="db-card-subtitle">Manage pipeline execution and request status</p>
                </div>
                <Link href="/dashboard/campaigns" className="text-xs text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-1">
                  View All <ArrowRight size={14} />
                </Link>
              </div>

              {loadingMetrics ? (
                <div className="space-y-3">
                  <div className="h-16 bg-white/5 animate-pulse rounded-lg" />
                  <div className="h-16 bg-white/5 animate-pulse rounded-lg" />
                </div>
              ) : requestCount === 0 && campaignCount === 0 ? (
                <div className="text-center py-8 rounded-lg border border-dashed border-white/10 bg-white/5">
                  <p className="text-sm text-slate-400">No campaigns or requests drafted yet.</p>
                  <Link href="/dashboard/campaigns/new" className="text-xs text-amber-400 hover:text-amber-300 font-semibold mt-2 inline-block">
                    Launch first campaign request &rarr;
                  </Link>
                </div>
              ) : (
                <div className="rounded-2xl border border-white/10 overflow-visible divide-y divide-white/10" style={{ padding: '6px' }}>
                  <div
                    className="bg-white/5 min-h-[46px] flex items-center justify-between text-[11px] leading-5 tracking-wide text-muted-foreground rounded-xl"
                    style={{ padding: '12px 20px' }}
                  >
                    <span className="pr-4">DEPLOYMENT DESCRIPTION</span>
                    <span className="pl-4">STATUS</span>
                  </div>
                  {requestCount > 0 && (
                    <div className="min-h-[72px] flex items-center justify-between text-sm rounded-xl" style={{ padding: '14px 20px' }}>
                      <div className="pl-1 flex items-center gap-3.5" style={{ paddingLeft: '4px' }}>
                        <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-lg" style={{ padding: '10px' }}>
                          <Clock size={16} />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-100">{requestCount} Pending Campaign {requestCount === 1 ? 'Request' : 'Requests'}</p>
                          <p className="text-xs text-muted-foreground mt-2 leading-[1.35]">Awaiting rollout plan shortlisting</p>
                        </div>
                      </div>
                      <span className="mr-1 db-chip bg-amber-500/10 text-amber-400 border border-amber-500/20" style={{ marginRight: '4px' }}>Awaiting Action</span>
                    </div>
                  )}
                  {campaignCount > 0 && (
                    <div className="min-h-[72px] flex items-center justify-between text-sm rounded-xl" style={{ padding: '14px 20px' }}>
                      <div className="pl-1 flex items-center gap-3.5" style={{ paddingLeft: '4px' }}>
                        <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-lg" style={{ padding: '10px' }}>
                          <Layers size={16} />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-100">{campaignCount} Active {campaignCount === 1 ? 'Campaign' : 'Campaigns'}</p>
                          <p className="text-xs text-muted-foreground mt-2 leading-[1.35]">Live media screen placement</p>
                        </div>
                      </div>
                      <span className="mr-1 db-chip bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono" style={{ marginRight: '4px' }}>ACTIVE</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <aside
          className="w-full rounded-2xl border border-white/10 bg-[#171a1f] space-y-5 sticky top-24"
          style={{ padding: '0.5rem' }}
        >
          <div className="flex items-center justify-between gap-4 pb-2">
            <div>
              <h2 className="text-lg font-semibold text-slate-50">New Stores Added</h2>
              <p className="text-sm text-slate-400 mt-1.5">Live network ticker</p>
            </div>
            <button
              onClick={() => void loadStores()}
              disabled={loading}
              className="h-8 px-3 rounded-lg border border-white/10 bg-white/5 text-xs text-slate-300 hover:bg-white/10 disabled:opacity-50 inline-flex items-center gap-1.5"
              style={{ padding: '0.4rem' }}
            >
              <RefreshCw size={15} className={loading ? 'animate-spin' : ''} /> Refresh
            </button>
          </div>

          {error && <div className="rounded-lg border border-rose-400/30 bg-rose-500/10 text-xs text-rose-200" style={{ padding: '0.5rem' }}>{error}</div>}

          <div className="max-h-[70vh] overflow-y-auto pr-1 space-y-4" style={{ padding: '0.5rem' }}>
            {!loading && stores.length === 0 && (
              <div className="rounded-lg border border-white/10 bg-[#20242b] text-sm text-slate-400" style={{ padding: '0.5rem' }}>
                No recent store additions found.
              </div>
            )}

            {stores.map((store) => (
              <button
                key={store.id}
                type="button"
                onClick={() => setSelectedStore(store)}
                className="w-full text-left rounded-lg border border-white/10 bg-[#20242b] hover:border-amber-400/40 transition-colors"
                style={{ padding: '0.75rem' }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-100 truncate">{store.name}</p>
                    <p className="text-xs text-slate-400 mt-1 truncate">{store.category}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs text-slate-400 shrink-0 max-w-[140px] truncate">
                    <MapPin size={12} /> {store.location}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </aside>
      </section>

      {selectedStore && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
            onClick={() => setSelectedStore(null)}
            aria-label="Close modal"
          />

          <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-[#15181d]" style={{ padding: '0.5rem' }}>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="min-w-0">
                <p className="text-lg font-semibold text-slate-50 truncate">{selectedStore.name}</p>
                <p className="text-sm text-slate-400 mt-1">{selectedStore.category}</p>
                <p className="text-sm text-slate-400 mt-1 inline-flex items-center gap-1"><MapPin size={13} /> {selectedStore.location}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedStore(null)}
                className="w-9 h-9 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 inline-flex items-center justify-center text-slate-300"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#20242b] overflow-hidden">
              {selectedStore.imageUrl ? (
                <img src={selectedStore.imageUrl} alt={`${selectedStore.name} storefront`} className="w-full h-[280px] object-cover" />
              ) : (
                <div className="w-full h-[280px] flex flex-col items-center justify-center text-slate-400 gap-2">
                  <Store size={22} />
                  <p className="text-sm">No storefront image available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
