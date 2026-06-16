'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { User, Mail, Shield, Building2, Save, CheckCircle2, Edit3, Lock, Bell, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const { profile, logout } = useAuth();
  const [editingName, setEditingName] = useState(false);
  const [displayName, setDisplayName] = useState(profile?.displayName || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // In production this would call Firestore update
    setEditingName(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const initials = (profile?.displayName || 'U').charAt(0).toUpperCase();

  return (
    <div className="db-page">
      {/* Page Header */}
      <div>
        <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#11233B', textTransform: 'uppercase', letterSpacing: '-0.02em', fontFamily: 'var(--font-space)', marginBottom: '4px' }}>Account Profile</h1>
        <p style={{ fontSize: '11px', color: '#52617A', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Manage your account settings and preferences.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', alignItems: 'start' }}>
        {/* Left: Main Profile Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Identity card */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(17,35,59,0.10)', padding: '36px 40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px', paddingBottom: '28px', borderBottom: '1px solid rgba(17,35,59,0.08)' }}>
              {/* Avatar */}
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: '#11233B', color: '#F1EFE6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 800, fontFamily: 'var(--font-mono)', flexShrink: 0, border: '3px solid rgba(255,179,0,0.3)' }}>
                {initials}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '9px', fontWeight: 700, color: '#52617A', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', marginBottom: '6px' }}>Logged in as</p>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#11233B', fontFamily: 'var(--font-space)', textTransform: 'uppercase', marginBottom: '2px', letterSpacing: '-0.01em' }}>{profile?.displayName || 'User'}</h2>
                <p style={{ fontSize: '11px', color: '#52617A', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{profile?.role || 'brand_account'}</p>
              </div>
              {saved && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontSize: '11px', fontWeight: 700, fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                  <CheckCircle2 size={14} /> Saved
                </div>
              )}
            </div>

            {/* Fields */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {/* Display Name */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', gridColumn: '1 / -1' }}>
                <label style={{ fontSize: '9px', fontWeight: 700, color: '#52617A', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)' }}>Display Name</label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  {editingName ? (
                    <>
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        autoFocus
                        className="font-mono text-[#11233B] focus:outline-none focus:border-[#11233B] transition-all"
                        style={{ flex: 1, border: '1px solid rgba(17,35,59,0.15)', padding: '10px 14px', fontSize: '13px', backgroundColor: '#F1EFE6' }}
                      />
                      <button
                        onClick={handleSave}
                        className="db-btn-primary"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '10px', padding: '0 16px', height: '40px', whiteSpace: 'nowrap' }}
                      >
                        <Save size={12} /> Save
                      </button>
                      <button
                        onClick={() => { setEditingName(false); setDisplayName(profile?.displayName || ''); }}
                        className="db-btn-ghost"
                        style={{ fontSize: '10px', padding: '0 14px', height: '40px' }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <span style={{ flex: 1, fontSize: '14px', fontWeight: 600, color: '#11233B', fontFamily: 'var(--font-mono)', padding: '10px 14px', backgroundColor: '#F1EFE6', border: '1px solid rgba(17,35,59,0.08)' }}>{profile?.displayName || '—'}</span>
                      <button
                        onClick={() => setEditingName(true)}
                        className="db-btn-ghost"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '10px', padding: '0 14px', height: '40px', whiteSpace: 'nowrap' }}
                      >
                        <Edit3 size={12} /> Edit
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '9px', fontWeight: 700, color: '#52617A', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)' }}>Email Address</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', backgroundColor: '#F1EFE6', border: '1px solid rgba(17,35,59,0.08)' }}>
                  <Mail size={13} style={{ color: '#52617A', flexShrink: 0 }} />
                  <span style={{ fontSize: '12px', color: '#11233B', fontFamily: 'var(--font-mono)', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{profile?.email || '—'}</span>
                </div>
              </div>

              {/* Role */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '9px', fontWeight: 700, color: '#52617A', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)' }}>Account Role</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', backgroundColor: '#F1EFE6', border: '1px solid rgba(17,35,59,0.08)' }}>
                  <Shield size={13} style={{ color: '#FFB300', flexShrink: 0 }} />
                  <span style={{ fontSize: '12px', color: '#11233B', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', fontWeight: 600 }}>{profile?.role || 'brand_account'}</span>
                </div>
              </div>

              {/* Brand ID */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '9px', fontWeight: 700, color: '#52617A', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)' }}>Brand ID</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', backgroundColor: '#F1EFE6', border: '1px solid rgba(17,35,59,0.08)' }}>
                  <Building2 size={13} style={{ color: '#52617A', flexShrink: 0 }} />
                  <span style={{ fontSize: '11px', color: '#52617A', fontFamily: 'var(--font-mono)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{profile?.brandId || '—'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(17,35,59,0.10)', padding: '28px 40px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#11233B', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid rgba(17,35,59,0.08)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lock size={13} style={{ color: '#FFB300' }} /> Security
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0' }}>
              <div>
                <p style={{ fontSize: '12px', fontWeight: 600, color: '#11233B', fontFamily: 'var(--font-mono)', marginBottom: '3px' }}>Password</p>
                <p style={{ fontSize: '10px', color: '#52617A', fontFamily: 'var(--font-mono)' }}>Last changed: Never</p>
              </div>
              <button
                className="db-btn-ghost"
                style={{ fontSize: '10px', padding: '0 16px', height: '36px' }}
                onClick={() => alert('Password change via email link — coming soon.')}
              >
                Change Password
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderTop: '1px solid rgba(17,35,59,0.06)' }}>
              <div>
                <p style={{ fontSize: '12px', fontWeight: 600, color: '#11233B', fontFamily: 'var(--font-mono)', marginBottom: '3px' }}>Two-Factor Authentication</p>
                <p style={{ fontSize: '10px', color: '#52617A', fontFamily: 'var(--font-mono)' }}>Not enabled — coming soon</p>
              </div>
              <span style={{ fontSize: '8px', fontWeight: 700, color: '#52617A', backgroundColor: 'rgba(17,35,59,0.06)', border: '1px solid rgba(17,35,59,0.1)', padding: '3px 10px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Soon</span>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Notifications card */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(17,35,59,0.10)', padding: '24px 24px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#11233B', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bell size={12} style={{ color: '#FFB300' }} /> Notifications
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Campaign status updates', enabled: true },
                { label: 'Compliance alerts', enabled: true },
                { label: 'New placement matches', enabled: false },
                { label: 'Weekly performance digest', enabled: false },
              ].map(({ label, enabled }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                  <span style={{ fontSize: '11px', color: '#11233B', fontFamily: 'var(--font-mono)' }}>{label}</span>
                  <div style={{ width: '32px', height: '18px', borderRadius: '9px', backgroundColor: enabled ? '#11233B' : 'rgba(17,35,59,0.12)', position: 'relative', cursor: 'pointer', flexShrink: 0, transition: 'background-color 0.2s ease' }}>
                    <div style={{ position: 'absolute', top: '3px', left: enabled ? '17px' : '3px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffffff', transition: 'left 0.2s ease' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Danger zone */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(239,68,68,0.15)', padding: '20px 24px' }}>
            <h3 style={{ fontSize: '11px', fontWeight: 700, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)', marginBottom: '14px' }}>Account Actions</h3>
            <button
              onClick={logout}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px', fontSize: '11px', fontWeight: 700, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#ef4444', backgroundColor: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', cursor: 'pointer', transition: 'background-color 0.15s ease' }}
            >
              <LogOut size={12} /> Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
