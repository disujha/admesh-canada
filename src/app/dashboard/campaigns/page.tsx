'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
  ExternalLink,
  MoreVertical,
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
  assignment?: {
    agentName?: string;
  };
  brief?: {
    printResponsibility?: string;
    payout?: {
      schedule?: string;
    };
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
        const executionOrderMap: Record<string, ExecutionOrderDoc> = {};
        try {
          const qExecution = query(
            collection(db, 'campaign_execution_orders'),
            where('brandId', '==', brandId)
          );
          const executionSnap = await getDocs(qExecution);
          executionSnap.forEach((executionDoc) => {
            const executionData = executionDoc.data();
            const requestId = executionData.campaignRequestId as string | undefined;
            if (requestId) executionOrderMap[requestId] = executionData;
          });
        } catch (err) {
          console.warn('Error fetching campaign_execution_orders:', err);
        }

        // Query offers (actual campaigns)
        let offersList: Campaign[] = [];
        try {
          const qOffers = query(
            collection(db, 'offers'),
            where('brandId', '==', brandId)
          );
          const offersSnap = await getDocs(qOffers);
          offersList = offersSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Campaign[];
        } catch (err) {
          console.warn('Error fetching offers:', err);
        }

        // Query campaign_requests (new request wizard submissions)
        let requestsList: Campaign[] = [];
        try {
          const qReqs = query(
            collection(db, 'campaign_requests'),
            where('brandId', '==', brandId)
          );
          const reqsSnap = await getDocs(qReqs);
          requestsList = reqsSnap.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data.adFormat?.name ? `${data.adFormat.name} Request` : 'New Campaign Request',
              status: data.status || 'pending',
              location: data.targetLocations || 'Multi-city',
              createdAt: data.createdAt,
              assets: {
                referenceImages: data.adFormat?.imageUrl ? [data.adFormat.imageUrl] : [],
              },
              adConfig: {
                adType: data.adFormat?.name || 'Retail Ad',
              },
              placementType: data.adSize || 'Custom Size',
              performance: {
                complianceRate: 0,
              },
              assignedAgentName: executionOrderMap[doc.id]?.assignment?.agentName || data.assignedAgentName,
              executionStatus: executionOrderMap[doc.id]?.status,
              printResponsibility: executionOrderMap[doc.id]?.brief?.printResponsibility,
              payoutSchedule: executionOrderMap[doc.id]?.brief?.payout?.schedule,
            };
          }) as Campaign[];
        } catch (err) {
          console.warn('Error fetching campaign_requests:', err);
        }

        // Combine and sort by createdAt descending
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

  return (
    <div className="db-page">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="db-heading">Campaigns</h1>
          <p className="text-muted-foreground">Manage and track all your active and past campaigns.</p>
        </div>
        <Link href="/dashboard/campaigns/new" className="db-btn-primary flex items-center gap-2">
          <Plus size={18} /> New Request
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 db-card p-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="db-input w-full pl-10 pr-4 py-2"
          />
        </div>
        <button className="db-btn-ghost flex items-center gap-2 px-6">
          <Filter size={18} /> Filters
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredCampaigns.length === 0 ? (
        <div className="db-card border-dashed py-24 text-center">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
            <TrendingUp size={40} />
          </div>
          <h3 className="text-xl font-bold mb-2">No campaigns found</h3>
          <p className="text-muted-foreground mb-8">You haven&apos;t created any campaigns yet.</p>
          <Link href="/dashboard/campaigns/new" className="db-btn-primary">Create Your First Campaign</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign, i) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="db-card rounded-[1.5rem] overflow-hidden hover:shadow-xl transition-all group"
            >
              <div className="aspect-video bg-[#17181B] relative">
                {campaign.assets?.referenceImages?.[0] ? (
                  <img src={campaign.assets.referenceImages[0]} alt={campaign.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold text-xl bg-[radial-gradient(circle_at_center,rgba(201,115,32,0.25),transparent_70%)]">
                    AD PREVIEW
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <div className={`db-chip shadow-lg ${
                    campaign.status === 'active' ? 'bg-green-500 text-white' :
                    campaign.status === 'review' ? 'bg-orange-500 text-white' : 'bg-slate-500 text-white'
                  }`}>
                    {(campaign.status || 'draft').toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-amber-300 transition-colors">{campaign.title || 'Untitled Campaign'}</h3>
                    <p className="text-sm text-muted-foreground">{campaign.adConfig?.adType} - {campaign.placementType}</p>
                  </div>
                  <button className="p-2 hover:bg-white/5 rounded-full">
                    <MoreVertical size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 py-2 border-y border-white/5">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin size={16} /> {campaign.location || 'Multi-city'}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar size={16} /> {campaign.createdAt?.seconds ? new Date(campaign.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Compliance</p>
                    <div className="flex items-center gap-2 text-emerald-400 font-bold">
                      <ShieldCheck size={16} /> {campaign.performance?.complianceRate || '0'}%
                    </div>
                    {(campaign.assignedAgentName || campaign.executionStatus) && (
                      <div className="mt-2 space-y-1">
                        {campaign.assignedAgentName && (
                          <p className="text-[11px] text-slate-300">Agent: {campaign.assignedAgentName}</p>
                        )}
                        {campaign.executionStatus && (
                          <p className="text-[11px] text-amber-300 uppercase">Execution: {campaign.executionStatus}</p>
                        )}
                      </div>
                    )}
                  </div>
                  <Link href={`/dashboard/campaigns/${campaign.id}`} className="db-btn-ghost py-2 px-4 text-xs flex items-center gap-2">
                    Details <ExternalLink size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CampaignsList;
