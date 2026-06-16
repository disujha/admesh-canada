'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {
  Plus,
  Search,
  ExternalLink,
  MapPin,
  Calendar,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

type Campaign = {
  id: string;
  title?: string;
  status?: string;
  location?: string;
  createdAt?: { seconds?: number };
  assets?: { referenceImages?: string[] };
  adConfig?: { adType?: string };
  placementType?: string;
  performance?: { complianceRate?: string | number };
  assignedAgentName?: string;
  executionStatus?: string;
  printResponsibility?: string;
  payoutSchedule?: string;
};

type ExecutionOrderDoc = {
  campaignRequestId?: string;
  status?: string;
  assignment?: { agentName?: string };
  brief?: {
    printResponsibility?: string;
    payout?: { schedule?: string };
  };
};

const CampaignsList = () => {
  const { profile, user } = useAuth();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCampaigns = async () => {
      const brandId = profile?.brandId || user?.uid;
      if (!brandId) return;

      try {
        let offersList: Campaign[] = [];
        let requestsList: Campaign[] = [];

        // Execution orders map
        let executionOrderMap: Record<string, ExecutionOrderDoc> = {};
        try {
          const execSnap = await getDocs(collection(db, 'execution_orders'));
          execSnap.docs.forEach((d) => {
            const data = d.data() as ExecutionOrderDoc;
            if (data.campaignRequestId) {
              executionOrderMap[data.campaignRequestId] = data;
            }
          });
        } catch {}

        // Offers
        try {
          const qOffers = query(collection(db, 'offers'), where('brandId', '==', brandId));
          const offersSnap = await getDocs(qOffers);
          offersList = offersSnap.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data.title || 'Active Campaign',
              status: data.status || 'active',
              location: data.location || 'Multi-city',
              createdAt: data.createdAt,
              assets: data.assets,
              adConfig: data.adConfig,
              placementType: data.placementType,
              performance: data.performance,
            };
          }) as Campaign[];
        } catch {}

        // Campaign requests
        try {
          const qReqs = query(collection(db, 'campaign_requests'), where('brandId', '==', brandId));
          const reqsSnap = await getDocs(qReqs);
          requestsList = reqsSnap.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data.adFormat?.name ? `${data.adFormat.name} Request` : 'New Campaign Request',
              status: data.status || 'pending',
              location: data.targetLocations || 'Multi-city',
              createdAt: data.createdAt,
              assets: { referenceImages: data.adFormat?.imageUrl ? [data.adFormat.imageUrl] : [] },
              adConfig: { adType: data.adFormat?.name || 'Retail Ad' },
              placementType: data.adSize || 'Custom Size',
              performance: { complianceRate: 0 },
              assignedAgentName: executionOrderMap[doc.id]?.assignment?.agentName || data.assignedAgentName,
              executionStatus: executionOrderMap[doc.id]?.status,
              printResponsibility: executionOrderMap[doc.id]?.brief?.printResponsibility,
              payoutSchedule: executionOrderMap[doc.id]?.brief?.payout?.schedule,
            };
          }) as Campaign[];
        } catch {}

        const combined = [...requestsList, ...offersList].sort((a, b) => {
          const timeA = a.createdAt?.seconds || 0;
          const timeB = b.createdAt?.seconds || 0;
          return timeB - timeA;
        });

        setCampaigns(combined);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [profile, user]);

  const filteredCampaigns = campaigns.filter((c) =>
    (c.title || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusColors: Record<string, { bg: string; color: string; border: string }> = {
    active: { bg: 'rgba(16,185,129,0.08)', color: '#10b981', border: 'rgba(16,185,129,0.2)' },
    live: { bg: 'rgba(16,185,129,0.08)', color: '#10b981', border: 'rgba(16,185,129,0.2)' },
    pending: { bg: 'rgba(255,179,0,0.08)', color: '#FFB300', border: 'rgba(255,179,0,0.2)' },
    review: { bg: 'rgba(255,179,0,0.08)', color: '#FFB300', border: 'rgba(255,179,0,0.2)' },
    draft: { bg: 'rgba(82,97,122,0.08)', color: '#52617A', border: 'rgba(82,97,122,0.15)' },
  };

  return (
    <div className="db-page">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#11233B', textTransform: 'uppercase', letterSpacing: '-0.02em', fontFamily: 'var(--font-space)', marginBottom: '4px' }}>Campaigns</h1>
          <p style={{ fontSize: '11px', color: '#52617A', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Manage and track all your active and past campaigns.</p>
        </div>
        <Link href="/dashboard/campaigns/new" className="db-btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px' }}>
          <Plus size={14} /> New Campaign
        </Link>
      </div>

      {/* Search bar */}
      <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(17,35,59,0.10)', padding: '16px 20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={13} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#52617A' }} />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="font-mono text-[#11233B] focus:outline-none focus:border-[#11233B] transition-all w-full"
            style={{ border: '1px solid rgba(17,35,59,0.12)', backgroundColor: '#F1EFE6', padding: '9px 12px 9px 34px', fontSize: '11px' }}
          />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
          <div className="w-8 h-8 border-2 border-[#FFB300] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredCampaigns.length === 0 ? (
        <div style={{ backgroundColor: '#ffffff', border: '2px dashed rgba(17,35,59,0.12)', padding: '80px 40px', textAlign: 'center' }}>
          <TrendingUp size={36} style={{ margin: '0 auto 16px', color: 'rgba(17,35,59,0.15)' }} />
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#11233B', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '8px' }}>No campaigns found</h3>
          <p style={{ fontSize: '12px', color: '#52617A', fontFamily: 'var(--font-mono)', marginBottom: '24px' }}>You haven&apos;t created any campaigns yet.</p>
          <Link href="/dashboard/campaigns/new" className="db-btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px' }}>
            <Plus size={13} /> Create Your First Campaign
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {filteredCampaigns.map((campaign) => {
            const sc = statusColors[campaign.status || 'draft'] || statusColors.draft;
            const previewImg = campaign.assets?.referenceImages?.[0];
            return (
              <div key={campaign.id} style={{ backgroundColor: '#ffffff', border: '1px solid rgba(17,35,59,0.10)', overflow: 'hidden', transition: 'box-shadow 0.15s ease' }}>
                {/* Image */}
                <div style={{ aspectRatio: '16/9', backgroundColor: '#E7E5DB', position: 'relative', overflow: 'hidden' }}>
                  {previewImg ? (
                    <img src={previewImg} alt={campaign.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, color: 'rgba(17,35,59,0.2)', fontFamily: 'var(--font-mono)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                      Ad Preview
                    </div>
                  )}
                  {/* Status badge */}
                  <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '8px', fontWeight: 700, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '3px 8px', backgroundColor: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>
                    {campaign.status || 'draft'}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '20px 22px' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#11233B', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.03em' }}>{campaign.title || 'Untitled Campaign'}</h3>
                  <p style={{ fontSize: '10px', color: '#52617A', fontFamily: 'var(--font-mono)', marginBottom: '14px' }}>{campaign.adConfig?.adType} · {campaign.placementType}</p>

                  <div style={{ display: 'flex', gap: '16px', paddingBottom: '14px', marginBottom: '14px', borderBottom: '1px solid rgba(17,35,59,0.06)' }}>
                    <span style={{ fontSize: '10px', color: '#52617A', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--font-mono)' }}>
                      <MapPin size={10} /> {campaign.location || 'Multi-city'}
                    </span>
                    <span style={{ fontSize: '10px', color: '#52617A', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--font-mono)' }}>
                      <Calendar size={10} /> {campaign.createdAt?.seconds ? new Date(campaign.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontSize: '11px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                      <ShieldCheck size={12} /> {campaign.performance?.complianceRate || '0'}%
                    </div>
                    <Link href={`/dashboard/campaigns/${campaign.id}`} className="db-btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '10px', padding: '6px 12px' }}>
                      Details <ExternalLink size={11} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CampaignsList;
