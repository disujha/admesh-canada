'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import {
  ArrowLeft,
  MapPin,
  Store,
  Clock,
  ShieldCheck,
  Layers,
  FileText,
  CheckCircle,
  X
} from 'lucide-react';

type CampaignDetails = {
  id: string;
  title?: string;
  status?: string;
  location?: string;
  createdAt?: { seconds?: number };
  assets?: { referenceImages?: string[] };
  adConfig?: { adType?: string };
  placementType?: string;
  performance?: { complianceRate?: string | number };
  // Campaign request fields:
  adFormat?: {
    name: string;
    imageUrl?: string;
  };
  adSize?: string;
  retailTypes?: string[];
  outletCount?: number;
  timeline?: string;
  targetLocations?: string;
  campaignObjective?: string;
  useCustomMaterial?: boolean;
  customMaterialDetails?: string;
  pickupLocation?: string;
  adminResponse?: string;
  reviewedAt?: { seconds?: number };
  assignedAgentName?: string;
  executionStatus?: string;
  printResponsibility?: string;
  materialSource?: string;
  pickupContactName?: string;
  pickupContactPhone?: string;
  pickupWindow?: string;
  placementInstructions?: string;
  targetRetailerProfile?: string;
  retailerPayoutPerInstall?: number;
  agentCommissionPerInstall?: number;
  payoutSchedule?: string;
  installByDate?: string;
  payoutRunDate?: string;
};

type ExecutionOrderDoc = {
  status?: string;
  assignment?: {
    agentName?: string;
  };
  brief?: {
    printResponsibility?: string;
    materialSource?: string;
    pickupContactName?: string;
    pickupContactPhone?: string;
    pickupWindow?: string;
    placementInstructions?: string;
    targetRetailerProfile?: string;
    installByDate?: string;
    payout?: {
      retailerPerInstall?: number;
      agentCommissionPerInstall?: number;
      schedule?: string;
      payoutRunDate?: string;
    };
  };
};

export default function CampaignDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [campaign, setCampaign] = useState<CampaignDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1. Try fetching from campaign_requests collection first
        const reqDoc = await getDoc(doc(db, 'campaign_requests', id));
        if (reqDoc.exists()) {
          const data = reqDoc.data();
          let executionOrder: ExecutionOrderDoc | null = null;
          try {
            const qExecution = query(
              collection(db, 'campaign_execution_orders'),
              where('campaignRequestId', '==', reqDoc.id)
            );
            const executionSnap = await getDocs(qExecution);
            if (!executionSnap.empty) executionOrder = executionSnap.docs[0].data();
          } catch (executionError) {
            console.warn('Error fetching execution order:', executionError);
          }

          setCampaign({
            id: reqDoc.id,
            title: data.adFormat?.name ? `${data.adFormat.name} Request` : 'Campaign Request',
            status: data.status || 'pending',
            location: data.targetLocations || 'Multi-city',
            createdAt: data.createdAt,
            adFormat: data.adFormat,
            adSize: data.adSize,
            retailTypes: data.retailTypes,
            outletCount: data.outletCount,
            timeline: data.timeline,
            targetLocations: data.targetLocations,
            campaignObjective: data.campaignObjective,
            useCustomMaterial: data.useCustomMaterial,
            customMaterialDetails: data.customMaterialDetails,
            pickupLocation: data.pickupLocation,
            adminResponse: data.adminResponse,
            reviewedAt: data.reviewedAt,
            assignedAgentName: executionOrder?.assignment?.agentName || data.assignedAgentName,
            executionStatus: executionOrder?.status,
            printResponsibility: executionOrder?.brief?.printResponsibility || data.printResponsibility,
            materialSource: executionOrder?.brief?.materialSource || data.materialSource,
            pickupContactName: executionOrder?.brief?.pickupContactName || data.pickupContactName,
            pickupContactPhone: executionOrder?.brief?.pickupContactPhone || data.pickupContactPhone,
            pickupWindow: executionOrder?.brief?.pickupWindow || data.pickupWindow,
            placementInstructions: executionOrder?.brief?.placementInstructions || data.placementInstructions,
            targetRetailerProfile: executionOrder?.brief?.targetRetailerProfile || data.targetRetailerProfile,
            retailerPayoutPerInstall: executionOrder?.brief?.payout?.retailerPerInstall || data.retailerPayoutPerInstall,
            agentCommissionPerInstall:
              executionOrder?.brief?.payout?.agentCommissionPerInstall || data.agentCommissionPerInstall,
            payoutSchedule: executionOrder?.brief?.payout?.schedule || data.payoutSchedule,
            installByDate: executionOrder?.brief?.installByDate || data.installByDate,
            payoutRunDate: executionOrder?.brief?.payout?.payoutRunDate || data.payoutRunDate,
          });
          return;
        }

        // 2. Try fetching from offers collection
        const offerDoc = await getDoc(doc(db, 'offers', id));
        if (offerDoc.exists()) {
          const data = offerDoc.data();
          setCampaign({
            id: offerDoc.id,
            title: data.title || 'Active Campaign',
            status: data.status || 'active',
            location: data.location || 'Multi-city',
            createdAt: data.createdAt,
            assets: data.assets,
            adConfig: data.adConfig,
            placementType: data.placementType,
            performance: data.performance,
          });
          return;
        }

        setError('No campaign or request found with this ID.');
      } catch (err) {
        console.error('Error fetching campaign details:', err);
        setError('Failed to load campaign details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    void fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="db-page flex flex-col items-center justify-center py-24">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-muted-foreground text-sm">Fetching campaign deployment record...</p>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="db-page space-y-6">
        <button
          onClick={() => router.back()}
          className="db-btn-ghost px-4 py-2 text-xs flex items-center gap-1.5"
        >
          <ArrowLeft size={14} /> Back to campaigns
        </button>
        <div className="db-card p-12 text-center max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
            <X size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Details Unavailable</h2>
          <p className="text-sm text-muted-foreground">{error || 'Campaign details could not be retrieved.'}</p>
          <Link href="/dashboard/campaigns" className="db-btn-primary mt-4">
            Campaign Overview
          </Link>
        </div>
      </div>
    );
  }

  // Check if this is a raw campaign request or an offer
  const isRequest = !campaign.adConfig && !!campaign.adFormat;
  const statusColor =
    campaign.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
    campaign.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
    'bg-slate-500/10 text-slate-400 border border-slate-500/20';

  const previewImage = isRequest 
    ? campaign.adFormat?.imageUrl 
    : campaign.assets?.referenceImages?.[0];

  return (
    <div className="db-page space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <button
            onClick={() => router.back()}
            className="text-xs text-muted-foreground hover:text-slate-100 flex items-center gap-1.5 transition-colors mb-2"
          >
            <ArrowLeft size={12} /> Back to Campaigns
          </button>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-50">{campaign.title}</h1>
            <span className={`db-chip uppercase ${statusColor}`}>
              {campaign.status}
            </span>
          </div>
          <p className="text-xs text-muted-foreground font-mono">ID: {campaign.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Details Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="db-card p-6 lg:p-8 space-y-6">
            <h3 className="text-lg font-semibold text-slate-100 border-b border-white/5 pb-3">Deployment Specifications</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="space-y-1">
                <span className="text-muted-foreground block text-xs">AD FORMAT / PRODUCT</span>
                <span className="font-medium text-slate-200">{isRequest ? campaign.adFormat?.name : campaign.adConfig?.adType || 'Retail Media'}</span>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground block text-xs">SIZE / DIMENSIONS</span>
                <span className="font-medium text-slate-200">{isRequest ? campaign.adSize : campaign.placementType || 'Standard placement'}</span>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground block text-xs">OUTLETS SHORTLISTED</span>
                <span className="font-medium text-slate-200 inline-flex items-center gap-1.5">
                  <Store size={15} className="text-amber-400" />
                  {isRequest ? campaign.outletCount : 'Multi-outlet deployment'}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground block text-xs">TIMELINE</span>
                <span className="font-medium text-slate-200 inline-flex items-center gap-1.5">
                  <Clock size={15} className="text-amber-400" />
                  {isRequest ? campaign.timeline : 'Ongoing campaign'}
                </span>
              </div>
            </div>

            {isRequest && campaign.retailTypes && (
              <div className="space-y-2 pt-2">
                <span className="text-muted-foreground block text-xs">TARGET RETAIL CHANNELS</span>
                <div className="flex flex-wrap gap-1.5">
                  {campaign.retailTypes.map((type) => (
                    <span key={type} className="db-chip bg-white/5 border border-white/10 text-slate-300">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2 pt-2">
              <span className="text-muted-foreground block text-xs">GEOGRAPHIC TARGETS</span>
              <span className="font-medium text-slate-200 inline-flex items-center gap-1.5">
                <MapPin size={15} className="text-amber-400" />
                {campaign.location}
              </span>
            </div>

            {isRequest && campaign.campaignObjective && (
              <div className="space-y-2 pt-2">
                <span className="text-muted-foreground block text-xs">CAMPAIGN OBJECTIVE</span>
                <p className="text-slate-300 bg-white/5 rounded-lg p-3 text-xs leading-relaxed border border-white/5">
                  {campaign.campaignObjective}
                </p>
              </div>
            )}
          </div>

          {/* Custom Material Details if applicable */}
          {isRequest && campaign.useCustomMaterial && (
            <div className="db-card p-6 lg:p-8 space-y-4">
              <h3 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
                <FileText size={18} className="text-amber-400" /> Custom Collateral Management
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="space-y-1">
                  <span className="text-muted-foreground block">MATERIAL SPECIFICATION</span>
                  <span className="font-medium text-slate-200">{campaign.customMaterialDetails}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground block">WAREHOUSE PICKUP LOCATION</span>
                  <span className="font-medium text-slate-200">{campaign.pickupLocation}</span>
                </div>
              </div>
            </div>
          )}

          {isRequest && (campaign.assignedAgentName || campaign.executionStatus) && (
            <div className="db-card p-6 lg:p-8 space-y-4">
              <h3 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
                <Layers size={18} className="text-amber-400" /> Assignment & Execution
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="space-y-1">
                  <span className="text-muted-foreground block">ASSIGNED AGENT</span>
                  <span className="font-medium text-slate-200">{campaign.assignedAgentName || 'Pending'}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground block">EXECUTION STATUS</span>
                  <span className="font-medium text-amber-300 uppercase">{campaign.executionStatus || 'pending'}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground block">PRINT RESPONSIBILITY</span>
                  <span className="font-medium text-slate-200">{campaign.printResponsibility || 'Not specified'}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground block">MATERIAL SOURCE</span>
                  <span className="font-medium text-slate-200">{campaign.materialSource || 'Not specified'}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground block">PICKUP CONTACT</span>
                  <span className="font-medium text-slate-200">
                    {campaign.pickupContactName || 'N/A'} {campaign.pickupContactPhone ? `(${campaign.pickupContactPhone})` : ''}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground block">PICKUP WINDOW</span>
                  <span className="font-medium text-slate-200">{campaign.pickupWindow || 'N/A'}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground block">RETAILER PAYOUT / INSTALL</span>
                  <span className="font-medium text-slate-200">
                    {typeof campaign.retailerPayoutPerInstall === 'number'
                      ? `₹${campaign.retailerPayoutPerInstall}`
                      : 'Not specified'}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground block">AGENT COMMISSION / INSTALL</span>
                  <span className="font-medium text-slate-200">
                    {typeof campaign.agentCommissionPerInstall === 'number'
                      ? `₹${campaign.agentCommissionPerInstall}`
                      : 'Not specified'}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground block">PAYOUT SCHEDULE</span>
                  <span className="font-medium text-slate-200">{campaign.payoutSchedule || 'N/A'}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground block">PAYOUT RUN DATE</span>
                  <span className="font-medium text-slate-200">{campaign.payoutRunDate || 'N/A'}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground block">INSTALL BY DATE</span>
                  <span className="font-medium text-slate-200">{campaign.installByDate || 'N/A'}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground block">TARGET RETAILER PROFILE</span>
                  <span className="font-medium text-slate-200">{campaign.targetRetailerProfile || 'N/A'}</span>
                </div>
              </div>
              {campaign.placementInstructions && (
                <div className="text-xs bg-white/5 border border-white/10 rounded-lg p-4">
                  <span className="text-muted-foreground block mb-1">PLACEMENT INSTRUCTIONS</span>
                  <p className="text-slate-200 leading-relaxed">{campaign.placementInstructions}</p>
                </div>
              )}
            </div>
          )}

          {/* Campaign status explanation */}
          <div className="db-card p-6 flex items-start gap-4">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl">
              <Clock size={20} />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-semibold text-slate-100">Review & Deployment Process</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                AdMesh deployment engineers are shortlisting store availability matching your filters. You will receive an email confirmation and notification here as soon as rollout plans are generated.
              </p>
            </div>
          </div>

          {isRequest && campaign.adminResponse && (
            <div className="db-card p-6 space-y-2">
              <h4 className="font-semibold text-slate-100 flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-400" /> Admin Response
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed bg-white/5 p-3 rounded-lg border border-white/10">
                {campaign.adminResponse}
              </p>
              <p className="text-xs text-muted-foreground">
                Updated:{' '}
                {campaign.reviewedAt?.seconds
                  ? new Date(campaign.reviewedAt.seconds * 1000).toLocaleString()
                  : 'Recently'}
              </p>
            </div>
          )}
        </div>

        {/* Sidebar Preview */}
        <div className="space-y-6">
          <div className="db-card p-4 space-y-4">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider ml-1">Format Visual</h3>
            <div className="aspect-video bg-[#17181B] rounded-xl overflow-hidden border border-white/10 relative">
              {previewImage ? (
                <img src={previewImage} alt="Ad Format Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm font-bold bg-[radial-gradient(circle_at_center,rgba(201,115,32,0.15),transparent_70%)]">
                  PREVIEW UNAVAILABLE
                </div>
              )}
            </div>
          </div>

          {!isRequest && (
            <div className="db-card p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Live Metrics</h3>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                <span className="text-xs text-muted-foreground">Compliance Rating</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <ShieldCheck size={14} />
                  {campaign.performance?.complianceRate || 100}%
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
