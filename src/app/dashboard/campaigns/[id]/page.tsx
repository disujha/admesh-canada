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
  X,
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
  adFormat?: { name: string; imageUrl?: string };
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
  assignment?: { agentName?: string };
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

const LABEL = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontSize: '9px', fontWeight: 700, color: '#52617A', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '4px' }}>
    {children}
  </span>
);
const VALUE = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontSize: '12px', fontWeight: 600, color: '#11233B', fontFamily: 'var(--font-mono)' }}>
    {children}
  </span>
);

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
        const reqDoc = await getDoc(doc(db, 'campaign_requests', id));
        if (reqDoc.exists()) {
          const data = reqDoc.data();
          let executionOrder: ExecutionOrderDoc | null = null;
          try {
            const qExecution = query(collection(db, 'campaign_execution_orders'), where('campaignRequestId', '==', reqDoc.id));
            const executionSnap = await getDocs(qExecution);
            if (!executionSnap.empty) executionOrder = executionSnap.docs[0].data();
          } catch {}
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
            agentCommissionPerInstall: executionOrder?.brief?.payout?.agentCommissionPerInstall || data.agentCommissionPerInstall,
            payoutSchedule: executionOrder?.brief?.payout?.schedule || data.payoutSchedule,
            installByDate: executionOrder?.brief?.installByDate || data.installByDate,
            payoutRunDate: executionOrder?.brief?.payout?.payoutRunDate || data.payoutRunDate,
          });
          return;
        }

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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 0' }}>
        <div className="w-10 h-10 border-2 border-[#FFB300] border-t-transparent rounded-full animate-spin" style={{ marginBottom: '16px' }} />
        <p style={{ fontSize: '11px', color: '#52617A', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Fetching campaign record...</p>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <button onClick={() => router.back()} className="db-btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', alignSelf: 'flex-start' }}>
          <ArrowLeft size={13} /> Back to campaigns
        </button>
        <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(17,35,59,0.10)', padding: '60px 40px', textAlign: 'center', maxWidth: '480px', margin: '0 auto' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#ef4444' }}>
            <X size={24} />
          </div>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#11233B', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '8px' }}>Details Unavailable</h2>
          <p style={{ fontSize: '12px', color: '#52617A', marginBottom: '24px' }}>{error || 'Campaign details could not be retrieved.'}</p>
          <Link href="/dashboard/campaigns" className="db-btn-primary" style={{ display: 'inline-flex', fontSize: '11px' }}>Campaign Overview</Link>
        </div>
      </div>
    );
  }

  const isRequest = !campaign.adConfig && !!campaign.adFormat;
  const statusColors: Record<string, { bg: string; color: string; border: string }> = {
    active: { bg: 'rgba(16,185,129,0.08)', color: '#10b981', border: 'rgba(16,185,129,0.2)' },
    pending: { bg: 'rgba(255,179,0,0.08)', color: '#FFB300', border: 'rgba(255,179,0,0.2)' },
    draft: { bg: 'rgba(82,97,122,0.08)', color: '#52617A', border: 'rgba(82,97,122,0.15)' },
  };
  const sc = statusColors[campaign.status || 'draft'] || statusColors.draft;
  const previewImage = isRequest ? campaign.adFormat?.imageUrl : campaign.assets?.referenceImages?.[0];

  return (
    <div className="db-page" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Header */}
      <div>
        <button onClick={() => router.back()} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: '#52617A', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '14px', fontWeight: 700 }}>
          <ArrowLeft size={12} /> Back to Campaigns
        </button>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '6px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#11233B', textTransform: 'uppercase', letterSpacing: '-0.01em', fontFamily: 'var(--font-space)' }}>{campaign.title}</h1>
              <span style={{ fontSize: '8px', fontWeight: 700, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '3px 10px', backgroundColor: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>
                {campaign.status}
              </span>
            </div>
            <p style={{ fontSize: '10px', color: '#52617A', fontFamily: 'var(--font-mono)' }}>ID: {campaign.id}</p>
          </div>
        </div>
      </div>

      {/* Main 2-col grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px', alignItems: 'start' }}>

        {/* Left: detail cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Deployment Specs */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(17,35,59,0.10)', padding: '28px 32px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#11233B', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid rgba(17,35,59,0.08)' }}>Deployment Specifications</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
              <div>
                <LABEL>Ad Format / Product</LABEL>
                <VALUE>{isRequest ? campaign.adFormat?.name : campaign.adConfig?.adType || 'Retail Media'}</VALUE>
              </div>
              <div>
                <LABEL>Size / Dimensions</LABEL>
                <VALUE>{isRequest ? campaign.adSize : campaign.placementType || 'Standard placement'}</VALUE>
              </div>
              <div>
                <LABEL>Outlets Shortlisted</LABEL>
                <VALUE>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Store size={13} style={{ color: '#FFB300' }} />
                    {isRequest ? campaign.outletCount : 'Multi-outlet deployment'}
                  </span>
                </VALUE>
              </div>
              <div>
                <LABEL>Timeline</LABEL>
                <VALUE>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={13} style={{ color: '#FFB300' }} />
                    {isRequest ? campaign.timeline : 'Ongoing campaign'}
                  </span>
                </VALUE>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <LABEL>Geographic Targets</LABEL>
                <VALUE>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={13} style={{ color: '#FFB300' }} />
                    {campaign.location}
                  </span>
                </VALUE>
              </div>
              {isRequest && campaign.retailTypes && (
                <div style={{ gridColumn: '1 / -1' }}>
                  <LABEL>Target Retail Channels</LABEL>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                    {campaign.retailTypes.map((type) => (
                      <span key={type} style={{ fontSize: '10px', fontWeight: 600, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', padding: '4px 10px', backgroundColor: '#F1EFE6', border: '1px solid rgba(17,35,59,0.10)', color: '#52617A' }}>{type}</span>
                    ))}
                  </div>
                </div>
              )}
              {isRequest && campaign.campaignObjective && (
                <div style={{ gridColumn: '1 / -1' }}>
                  <LABEL>Campaign Objective</LABEL>
                  <p style={{ fontSize: '12px', color: '#11233B', backgroundColor: '#F1EFE6', border: '1px solid rgba(17,35,59,0.08)', padding: '12px 14px', lineHeight: 1.6, fontFamily: 'var(--font-mono)' }}>{campaign.campaignObjective}</p>
                </div>
              )}
            </div>
          </div>

          {/* Custom Material */}
          {isRequest && campaign.useCustomMaterial && (
            <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(17,35,59,0.10)', padding: '28px 32px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#11233B', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid rgba(17,35,59,0.08)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={13} style={{ color: '#FFB300' }} /> Custom Collateral Management
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div><LABEL>Material Specification</LABEL><VALUE>{campaign.customMaterialDetails}</VALUE></div>
                <div><LABEL>Warehouse Pickup Location</LABEL><VALUE>{campaign.pickupLocation}</VALUE></div>
              </div>
            </div>
          )}

          {/* Assignment & Execution */}
          {isRequest && (campaign.assignedAgentName || campaign.executionStatus) && (
            <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(17,35,59,0.10)', padding: '28px 32px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#11233B', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid rgba(17,35,59,0.08)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={13} style={{ color: '#FFB300' }} /> Assignment & Execution
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', backgroundColor: '#F1EFE6', border: '1px solid rgba(17,35,59,0.06)', padding: '20px' }}>
                {[
                  { label: 'Assigned Agent', value: campaign.assignedAgentName || 'Pending' },
                  { label: 'Execution Status', value: campaign.executionStatus || 'pending' },
                  { label: 'Print Responsibility', value: campaign.printResponsibility || 'Not specified' },
                  { label: 'Material Source', value: campaign.materialSource || 'Not specified' },
                  { label: 'Pickup Contact', value: `${campaign.pickupContactName || 'N/A'}${campaign.pickupContactPhone ? ` (${campaign.pickupContactPhone})` : ''}` },
                  { label: 'Pickup Window', value: campaign.pickupWindow || 'N/A' },
                  { label: 'Retailer Payout / Install', value: typeof campaign.retailerPayoutPerInstall === 'number' ? `$${campaign.retailerPayoutPerInstall} CAD` : 'Not specified' },
                  { label: 'Agent Commission / Install', value: typeof campaign.agentCommissionPerInstall === 'number' ? `$${campaign.agentCommissionPerInstall} CAD` : 'Not specified' },
                  { label: 'Payout Schedule', value: campaign.payoutSchedule || 'N/A' },
                  { label: 'Payout Run Date', value: campaign.payoutRunDate || 'N/A' },
                  { label: 'Install By Date', value: campaign.installByDate || 'N/A' },
                  { label: 'Target Retailer Profile', value: campaign.targetRetailerProfile || 'N/A' },
                ].map(({ label, value }) => (
                  <div key={label}><LABEL>{label}</LABEL><VALUE>{value}</VALUE></div>
                ))}
              </div>
              {campaign.placementInstructions && (
                <div style={{ marginTop: '16px' }}>
                  <LABEL>Placement Instructions</LABEL>
                  <p style={{ fontSize: '12px', color: '#11233B', backgroundColor: '#F1EFE6', border: '1px solid rgba(17,35,59,0.08)', padding: '14px', lineHeight: 1.7, fontFamily: 'var(--font-mono)', marginTop: '6px' }}>{campaign.placementInstructions}</p>
                </div>
              )}
            </div>
          )}

          {/* Review & Deployment info */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(17,35,59,0.10)', padding: '22px 28px', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', flexShrink: 0, backgroundColor: 'rgba(255,179,0,0.08)', border: '1px solid rgba(255,179,0,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFB300' }}>
              <Clock size={18} />
            </div>
            <div>
              <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#11233B', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '6px' }}>Review & Deployment Process</h4>
              <p style={{ fontSize: '11px', color: '#52617A', lineHeight: 1.7, fontFamily: 'var(--font-mono)' }}>
                AdMesh deployment engineers are shortlisting store availability matching your filters. You will receive an email confirmation as soon as rollout plans are generated.
              </p>
            </div>
          </div>

          {/* Admin Response */}
          {isRequest && campaign.adminResponse && (
            <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(17,35,59,0.10)', padding: '24px 28px' }}>
              <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#11233B', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={13} style={{ color: '#10b981' }} /> Admin Response
              </h4>
              <p style={{ fontSize: '12px', color: '#11233B', backgroundColor: '#F1EFE6', border: '1px solid rgba(17,35,59,0.08)', padding: '14px', lineHeight: 1.7, marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>{campaign.adminResponse}</p>
              <p style={{ fontSize: '10px', color: '#52617A', fontFamily: 'var(--font-mono)' }}>Updated: {campaign.reviewedAt?.seconds ? new Date(campaign.reviewedAt.seconds * 1000).toLocaleString() : 'Recently'}</p>
            </div>
          )}
        </div>

        {/* Right: Preview + Metrics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(17,35,59,0.10)', padding: '20px' }}>
            <p style={{ fontSize: '9px', fontWeight: 700, color: '#52617A', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', marginBottom: '12px' }}>Format Visual</p>
            <div style={{ aspectRatio: '16/9', backgroundColor: '#E7E5DB', overflow: 'hidden', border: '1px solid rgba(17,35,59,0.08)', position: 'relative' }}>
              {previewImage ? (
                <img src={previewImage} alt="Ad Format Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 700, color: 'rgba(17,35,59,0.2)', fontFamily: 'var(--font-mono)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  Preview Unavailable
                </div>
              )}
            </div>
          </div>

          {!isRequest && (
            <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(17,35,59,0.10)', padding: '20px' }}>
              <p style={{ fontSize: '9px', fontWeight: 700, color: '#52617A', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', marginBottom: '12px' }}>Live Metrics</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', backgroundColor: '#F1EFE6', border: '1px solid rgba(17,35,59,0.08)' }}>
                <span style={{ fontSize: '11px', color: '#52617A', fontFamily: 'var(--font-mono)' }}>Compliance Rating</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 700, color: '#10b981', fontSize: '13px', fontFamily: 'var(--font-mono)' }}>
                  <ShieldCheck size={13} />
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
