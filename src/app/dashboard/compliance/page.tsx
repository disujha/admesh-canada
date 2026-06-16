'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { motion } from 'framer-motion';
import {
  FileCheck,
  MapPin,
  Calendar,
  User,
  CheckCircle2,
  AlertCircle,
  Clock,
  Eye,
} from 'lucide-react';

type ComplianceLog = {
  id: string;
  status?: string;
  offerTitle?: string;
  retailerName?: string;
  locationName?: string;
  timestamp?: { seconds?: number };
  photoUrls?: string[];
  verifiedBy?: string;
  verificationType?: string;
};

const ComplianceView = () => {
  const { profile, user } = useAuth();
  const [logs, setLogs] = useState<ComplianceLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      const brandId = profile?.brandId || user?.uid;
      if (!brandId) return;

      try {
        const q = query(
          collection(db, 'compliance_logs'),
          where('brandId', '==', brandId),
          orderBy('timestamp', 'desc'),
          limit(20)
        );
        const querySnapshot = await getDocs(q);
        const fetchedLogs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ComplianceLog[];
        setLogs(fetchedLogs);
      } catch (error) {
        console.error('Error fetching compliance logs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [profile, user]);

  return (
    <div className="db-page">
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#11233B', textTransform: 'uppercase', letterSpacing: '-0.02em', fontFamily: 'var(--font-space)', marginBottom: '4px' }}>Compliance & Proof</h1>
          <p style={{ fontSize: '11px', color: '#52617A', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Monitor real-time verification logs and proof images for your campaigns.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', alignItems: 'start' }}>
        {/* Left: Live Feed */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(17,35,59,0.10)', padding: '32px 36px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#11233B', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid rgba(17,35,59,0.08)' }}>Live Verification Feed</h2>

          {loading ? (
            <div style={{ padding: '80px 0', display: 'flex', justifyContent: 'center' }}>
              <div className="w-8 h-8 border-2 border-[#FFB300] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : logs.length === 0 ? (
            <div style={{ padding: '80px 0', textAlign: 'center' }}>
              <FileCheck size={40} style={{ margin: '0 auto 16px', color: 'rgba(17,35,59,0.15)' }} />
              <p style={{ fontSize: '12px', color: '#52617A', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>No compliance logs available yet.</p>
              <p style={{ fontSize: '11px', color: '#52617A', marginTop: '8px' }}>Logs will appear here once your campaigns go live.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {logs.map((log, i) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  style={{ display: 'flex', gap: '16px', paddingBottom: '24px', borderBottom: '1px solid rgba(17,35,59,0.06)' }}
                >
                  <div style={{ flexShrink: 0 }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      backgroundColor: log.status === 'verified' ? 'rgba(16,185,129,0.10)' : 'rgba(255,179,0,0.10)',
                      color: log.status === 'verified' ? '#10b981' : '#FFB300'
                    }}>
                      {log.status === 'verified' ? <CheckCircle2 size={20} /> : <Clock size={20} />}
                    </div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                      <div>
                        <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#11233B', marginBottom: '3px' }}>{log.offerTitle || 'Campaign Update'}</h4>
                        <p style={{ fontSize: '11px', color: '#52617A', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <MapPin size={11} /> {log.retailerName} — {log.locationName}
                        </p>
                      </div>
                      <p style={{ fontSize: '11px', color: '#52617A', display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                        <Calendar size={11} /> {log.timestamp?.seconds ? new Date(log.timestamp.seconds * 1000).toLocaleString() : 'N/A'}
                      </p>
                    </div>
                    {log.photoUrls && log.photoUrls.length > 0 && (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '12px' }}>
                        {log.photoUrls.map((url: string, idx: number) => (
                          <div key={idx} style={{ aspectRatio: '1', overflow: 'hidden', position: 'relative', cursor: 'pointer', border: '1px solid rgba(17,35,59,0.08)' }}>
                            <img src={url} alt="Proof" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(10,26,44,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0 }} className="group-hover:opacity-100">
                              <Eye className="text-white" size={20} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '10px', color: '#52617A', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--font-mono)' }}>
                        <User size={11} /> Verified by: {log.verifiedBy || 'System AI'}
                      </span>
                      <span style={{
                        fontSize: '8px', fontWeight: 700, padding: '2px 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em',
                        backgroundColor: log.verificationType === 'agent' ? 'rgba(255,179,0,0.10)' : 'rgba(17,35,59,0.06)',
                        color: log.verificationType === 'agent' ? '#FFB300' : '#52617A',
                        border: `1px solid ${log.verificationType === 'agent' ? 'rgba(255,179,0,0.2)' : 'rgba(17,35,59,0.1)'}`
                      }}>
                        {log.verificationType?.toUpperCase() || 'SELF'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Compliance Health */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(17,35,59,0.10)', padding: '28px 24px' }}>
          <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#11233B', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)', marginBottom: '24px', paddingBottom: '14px', borderBottom: '1px solid rgba(17,35,59,0.08)' }}>Compliance Health</h2>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '24px', borderBottom: '1px solid rgba(17,35,59,0.06)', marginBottom: '20px' }}>
            <div style={{ position: 'relative', width: '160px', height: '160px', marginBottom: '12px' }}>
              <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                <circle cx="80" cy="80" r="64" stroke="rgba(17,35,59,0.08)" strokeWidth="10" fill="transparent" />
                <circle cx="80" cy="80" r="64" stroke="#FFB300" strokeWidth="10" fill="transparent" strokeDasharray="402" strokeDashoffset={402 * (1 - 0.942)} strokeLinecap="butt" />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '26px', fontWeight: 900, color: '#11233B', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>94.2%</span>
                <span style={{ fontSize: '8px', fontWeight: 700, color: '#52617A', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>Avg Rate</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: 'Verified Placements', value: '1,120', Icon: CheckCircle2, color: '#10b981' },
              { label: 'Pending Verification', value: '164', Icon: AlertCircle, color: '#FFB300' },
              { label: 'Non-Compliant', value: '42', Icon: AlertCircle, color: '#ef4444' },
            ].map(({ label, value, Icon, color }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', backgroundColor: '#F1EFE6', border: '1px solid rgba(17,35,59,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icon size={15} style={{ color }} />
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#11233B', fontFamily: 'var(--font-mono)' }}>{label}</span>
                </div>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#11233B', fontFamily: 'var(--font-mono)' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceView;
