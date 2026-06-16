'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Map as MapIcon,
  Download,
  Zap,
  Target,
} from 'lucide-react';

const AnalyticsPage = () => {
  return (
    <div className="db-page">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#11233B', textTransform: 'uppercase', letterSpacing: '-0.02em', fontFamily: 'var(--font-space)', marginBottom: '4px' }}>Analytics & Insights</h1>
          <p style={{ fontSize: '11px', color: '#52617A', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Deep dive into your campaign performance and reach metrics.</p>
        </div>
        <button className="db-btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px' }}>
          <Download size={14} /> Export Report
        </button>
      </div>

      {/* Headline Metric Card */}
      <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(17,35,59,0.10)', padding: '40px 44px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%', background: 'radial-gradient(circle at top right, rgba(255,179,0,0.08), transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '48px', position: 'relative', zIndex: 1 }}>
          <div>
            <p style={{ fontSize: '9px', fontWeight: 700, color: '#52617A', textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: 'var(--font-mono)', marginBottom: '12px' }}>Total Impressions</p>
            <h2 style={{ fontSize: '52px', fontWeight: 900, color: '#11233B', lineHeight: 1, fontFamily: 'var(--font-space)', marginBottom: '10px' }}>2.4M</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontWeight: 700, fontSize: '12px' }}>
              <TrendingUp size={16} /> +24% from last month
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ height: '80px', display: 'flex', alignItems: 'flex-end', gap: '6px', marginBottom: '12px' }}>
              {[40, 60, 45, 90, 65, 80, 100].map((h, i) => (
                <div key={i} style={{ flex: 1, backgroundColor: i === 6 ? '#FFB300' : 'rgba(255,179,0,0.25)', height: `${h}%`, transition: 'background-color 0.15s ease' }} />
              ))}
            </div>
            <p style={{ fontSize: '10px', color: '#52617A', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Daily Engagement Growth</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px' }}>
            {[
              { label: 'Average CPC', value: '$0.12' },
              { label: 'Store Coverage', value: '1,284 stores' },
            ].map(({ label, value }) => (
              <div key={label} style={{ padding: '14px 18px', backgroundColor: '#F1EFE6', border: '1px solid rgba(17,35,59,0.08)' }}>
                <p style={{ fontSize: '9px', fontWeight: 700, color: '#52617A', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', marginBottom: '6px' }}>{label}</p>
                <p style={{ fontSize: '20px', fontWeight: 800, color: '#11233B', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Two column charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Province breakdown */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(17,35,59,0.10)', padding: '28px 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#11233B', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Target size={14} style={{ color: '#FFB300' }} /> Province Performance
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { province: 'Ontario', reach: '1.2M', pct: 52 },
              { province: 'Quebec', reach: '580K', pct: 26 },
              { province: 'British Columbia', reach: '380K', pct: 16 },
              { province: 'Alberta', reach: '140K', pct: 6 },
            ].map(({ province, reach, pct }) => (
              <div key={province}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#11233B', fontFamily: 'var(--font-mono)' }}>{province}</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#52617A', fontFamily: 'var(--font-mono)' }}>{reach}</span>
                </div>
                <div style={{ height: '4px', backgroundColor: 'rgba(17,35,59,0.08)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', backgroundColor: '#FFB300', width: `${pct}%`, transition: 'width 0.3s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Store category breakdown */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(17,35,59,0.10)', padding: '28px 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#11233B', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={14} style={{ color: '#FFB300' }} /> Category Breakdown
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Convenience Stores', stores: 612, pct: 48 },
              { label: 'Pharmacies', stores: 284, pct: 22 },
              { label: 'Supermarkets', stores: 218, pct: 17 },
              { label: 'Cafe & Coffee Shops', stores: 170, pct: 13 },
            ].map(({ label, stores, pct }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', backgroundColor: '#F1EFE6', border: '1px solid rgba(17,35,59,0.06)' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '11px', fontWeight: 600, color: '#11233B', fontFamily: 'var(--font-mono)', marginBottom: '5px' }}>{label}</p>
                  <div style={{ height: '3px', backgroundColor: 'rgba(17,35,59,0.08)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', backgroundColor: '#11233B', width: `${pct}%` }} />
                  </div>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#11233B', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{stores}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
