'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import {
  LayoutDashboard,
  FileCheck,
  BarChart2,
  Store,
  Rocket,
  Users,
  Settings,
  LogOut,
  Bell,
  Search,
  ChevronRight,
  Menu,
  X,
  HelpCircle,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type NavItem = {
  label: string;
  icon: LucideIcon;
  href?: string;
  comingSoon?: boolean;
  match?: (pathname: string) => boolean;
};

const navItems: NavItem[] = [
  { label: 'Campaigns', icon: LayoutDashboard, href: '/dashboard', match: (p) => p === '/dashboard' },
  { label: 'New Campaign', icon: Rocket, href: '/dashboard/campaigns/new', match: (p) => p === '/dashboard/campaigns/new' },
  { label: 'Compliance Log', icon: FileCheck, href: '/dashboard/compliance', match: (p) => p === '/dashboard/compliance' },
  { label: 'Retail Network', icon: Store, comingSoon: true },
  { label: 'Retailers', icon: Users, comingSoon: true },
  { label: 'Performance', icon: BarChart2, comingSoon: true },
  { label: 'Account Settings', icon: Settings, comingSoon: true },
];

function NavLink({
  item,
  pathname,
  onNavigate,
}: {
  item: NavItem;
  pathname: string;
  onNavigate?: () => void;
}) {
  const active = item.match ? item.match(pathname) : item.href === pathname;
  const Icon = item.icon;

  const base = 'group w-full h-11 flex items-center gap-3 font-mono text-xs uppercase tracking-wider transition-all duration-150 cursor-pointer';
  const activeClass = 'bg-[#E7E5DB] text-[#11233B] font-bold border-l-2 border-[#FFB300]';
  const inactiveClass = 'text-[#52617A] hover:text-[#11233B] hover:bg-[#E7E5DB]/40';

  const style = { paddingLeft: '20px', paddingRight: '16px' };

  if (!item.href || item.comingSoon) {
    return (
      <div className={`${base} ${active ? activeClass : inactiveClass} cursor-default`} style={style} title={item.label}>
        <Icon size={15} className={active ? 'text-[#11233B] shrink-0' : 'text-[#52617A] shrink-0 group-hover:text-[#11233B]'} />
        <span className="font-semibold truncate flex-1">{item.label}</span>
        {item.comingSoon && (
          <span className="shrink-0 text-[7px] font-bold tracking-widest text-[#52617A] bg-[#E7E5DB] border border-[#11233B]/10 px-1.5 py-0.5 uppercase">Soon</span>
        )}
      </div>
    );
  }

  return (
    <Link href={item.href} onClick={onNavigate} className={`${base} ${active ? activeClass : inactiveClass}`} style={style} title={item.label}>
      <Icon size={15} className={active ? 'text-[#11233B] shrink-0' : 'text-[#52617A] shrink-0 group-hover:text-[#11233B]'} />
      <span className="font-semibold truncate flex-1">{item.label}</span>
      {active && <ChevronRight size={12} className="shrink-0 text-[#11233B]" />}
    </Link>
  );
}

function SidebarBody({
  pathname,
  profile,
  onNavigate,
  onLogout,
}: {
  pathname: string;
  profile: { displayName?: string | null; role?: string | null } | null;
  onNavigate?: () => void;
  onLogout: () => void;
}) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingTop: '20px', paddingBottom: '16px' }}>
      {/* Nav links */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {navItems.map((item) => (
          <NavLink key={item.label} item={item} pathname={pathname} onNavigate={onNavigate} />
        ))}
      </nav>

      {/* User profile card */}
      <div style={{ margin: '0 12px' }}>
        <Link href="/dashboard/profile" style={{ textDecoration: 'none', display: 'block' }} onClick={onNavigate}>
          <div className="bg-[#E7E5DB]/60 border border-[#11233B]/10 font-mono hover:bg-[#E7E5DB] transition-all cursor-pointer" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
              <div className="bg-[#11233B] text-[#F1EFE6] font-bold text-xs shrink-0 rounded-full flex items-center justify-center" style={{ width: '28px', height: '28px' }}>
                {(profile?.displayName || 'U').charAt(0)}
              </div>
              <div style={{ minWidth: 0 }}>
                <p className="font-bold text-[#11233B] uppercase truncate" style={{ fontSize: '10px', lineHeight: '1.2', marginBottom: '2px' }}>{profile?.displayName || 'User'}</p>
                <p className="text-[#52617A] uppercase tracking-wider truncate" style={{ fontSize: '9px', lineHeight: '1.2' }}>{profile?.role || 'brand_account'}</p>
              </div>
            </div>
          </div>
        </Link>
        <button
          onClick={onLogout}
          className="w-full text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 uppercase tracking-wider font-bold transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5"
          style={{ padding: '6px 0', fontSize: '9px', marginTop: '8px' }}
          aria-label="Logout"
        >
          <LogOut size={10} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { profile, logout, loading } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    const applyLayout = () => {
      const mobile = mediaQuery.matches;
      setIsMobile(mobile);
      setIsSidebarOpen(false);
    };
    applyLayout();
    mediaQuery.addEventListener('change', applyLayout);
    return () => mediaQuery.removeEventListener('change', applyLayout);
  }, []);

  React.useEffect(() => {
    document.body.classList.add('dashboard-mode');
    return () => document.body.classList.remove('dashboard-mode');
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F1EFE6]">
        <div className="w-6 h-6 border-2 border-[#11233B] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="dashboard-shell" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F1EFE6', overflow: 'hidden' }}>

      {/* ── Top Application Header ── */}
      <header
        className="bg-[#F1EFE6] border-b border-[#11233B]/10"
        style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', position: 'sticky', top: 0, zIndex: 30, flexShrink: 0 }}
      >
        {/* Left: Hamburger + Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          {isMobile && (
            <button
              onClick={() => setIsSidebarOpen((v) => !v)}
              className="border border-[#11233B]/15 text-[#11233B] hover:bg-[#E7E5DB] transition-colors"
              style={{ padding: '8px' }}
              aria-label="Toggle sidebar"
            >
              {isSidebarOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          )}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/icon_transparent.png" alt="AdMesh" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
            <span className="font-mono font-bold text-[#11233B] uppercase" style={{ fontSize: '13px', letterSpacing: '0.18em' }}>AdMesh</span>
          </Link>
        </div>

        {/* Centre: Search bar */}
        <div className="hidden md:block" style={{ flex: 1, maxWidth: '440px', margin: '0 24px' }}>
          <div style={{ position: 'relative' }}>
            <Search className="text-[#52617A] pointer-events-none" size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search campaigns, cities, retailers..."
              className="bg-[#E7E5DB]/60 border border-[#11233B]/15 text-[#11233B] font-mono focus:outline-none focus:border-[#11233B] focus:bg-white transition-all w-full"
              style={{ height: '38px', fontSize: '11px', paddingLeft: '36px', paddingRight: '16px' }}
            />
          </div>
        </div>

        {/* Right: Icons + Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <button
            onClick={() => setIsHelpOpen(true)}
            className="text-[#11233B] hover:bg-[#E7E5DB] transition-all"
            style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}
            title="Help"
          >
            <HelpCircle size={16} />
          </button>
          <button className="text-[#11233B] hover:bg-[#E7E5DB] transition-all" style={{ padding: '8px', position: 'relative', background: 'none', border: 'none', cursor: 'pointer' }} title="Notifications">
            <Bell size={16} />
            <span className="rounded-full bg-[#FFB300]" style={{ position: 'absolute', top: '6px', right: '6px', width: '6px', height: '6px' }} />
          </button>
          <Link
            href="/dashboard/profile"
            className="bg-[#11233B] text-[#F1EFE6] font-mono font-bold rounded-full flex items-center justify-center shrink-0"
            style={{ width: '32px', height: '32px', fontSize: '11px', textDecoration: 'none' }}
          >
            {(profile?.displayName || 'U').charAt(0)}
          </Link>
        </div>
      </header>

      {/* ── Body row: Sidebar + Main ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* Desktop Sidebar */}
        <aside
          className="hidden lg:flex flex-col bg-white border-r border-[#11233B]/10"
          style={{ width: '240px', flexShrink: 0, overflowY: 'auto' }}
        >
          <SidebarBody pathname={pathname} profile={profile} onLogout={logout} />
        </aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMobile && isSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(10,26,44,0.25)', backdropFilter: 'blur(2px)', zIndex: 40 }}
                onClick={() => setIsSidebarOpen(false)}
              />
              <motion.aside
                initial={{ x: -240 }}
                animate={{ x: 0 }}
                exit={{ x: -240 }}
                transition={{ type: 'spring', damping: 28, stiffness: 260 }}
                className="flex flex-col bg-white border-r border-[#11233B]/10"
                style={{ position: 'fixed', top: '64px', bottom: 0, left: 0, width: '220px', zIndex: 50, overflowY: 'auto', boxShadow: '4px 0 20px rgba(0,0,0,0.08)' }}
              >
                <SidebarBody pathname={pathname} profile={profile} onNavigate={() => setIsSidebarOpen(false)} onLogout={logout} />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* ── Main workspace content area ── */}
        <main
          className="flex-1"
          style={{ overflowY: 'auto', backgroundColor: '#F1EFE6' }}
        >
          {/* Content wrapper — padding applied here via inline style, guaranteed to render */}
          <div style={{ padding: '40px 48px 64px 48px', maxWidth: '1280px', width: '100%' }}>
            {children}
          </div>
        </main>

      </div>

      {/* Help Side Sheet Panel */}
      <AnimatePresence>
        {isHelpOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(10,26,44,0.25)', backdropFilter: 'blur(2px)', zIndex: 100 }}
              onClick={() => setIsHelpOpen(false)}
            />
            {/* Sheet */}
            <motion.div
              initial={{ x: 380 }}
              animate={{ x: 0 }}
              exit={{ x: 380 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, width: '380px', maxWidth: '100%',
                backgroundColor: '#ffffff', borderLeft: '1px solid rgba(17,35,59,0.10)',
                boxShadow: '-4px 0 20px rgba(0,0,0,0.08)', zIndex: 101, display: 'flex', flexDirection: 'column',
                fontFamily: 'var(--font-mono)'
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid rgba(17,35,59,0.10)' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#11233B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Support & Help</h3>
                <button
                  onClick={() => setIsHelpOpen(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#11233B' }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Content */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <h4 style={{ fontSize: '11px', fontWeight: 700, color: '#11233B', textTransform: 'uppercase', marginBottom: '8px' }}>FAQs</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { q: 'How is compliance verified?', a: 'Every campaign placement requires a verification photo uploaded by either store operators or checked by field agents, processed by our AI verification suite.' },
                      { q: 'What is Province Coverage?', a: 'Province Performance shows impressions split by province where screens and placements are active.' },
                      { q: 'How to download invoice?', a: 'Invoices are sent to the registered email address upon campaign launch. You can also view them under Billing.' }
                    ].map((item, i) => (
                      <div key={i} style={{ padding: '12px', backgroundColor: '#F1EFE6', border: '1px solid rgba(17,35,59,0.08)' }}>
                        <p style={{ fontSize: '11px', fontWeight: 700, color: '#11233B', marginBottom: '4px' }}>{item.q}</p>
                        <p style={{ fontSize: '10px', color: '#52617A', lineHeight: '1.4' }}>{item.a}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(17,35,59,0.08)', paddingTop: '20px' }}>
                  <h4 style={{ fontSize: '11px', fontWeight: 700, color: '#11233B', textTransform: 'uppercase', marginBottom: '8px' }}>Contact Support</h4>
                  <p style={{ fontSize: '11px', color: '#52617A', marginBottom: '12px', lineHeight: '1.4' }}>
                    Need extra assistance with your retail campaign or distributor onboarding? Contact us:
                  </p>
                  <div style={{ padding: '12px', border: '1px solid rgba(17,35,59,0.1)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <p style={{ fontSize: '11px', fontWeight: 600, color: '#11233B' }}>Email: support@admesh.ca</p>
                    <p style={{ fontSize: '11px', fontWeight: 600, color: '#11233B' }}>Phone: +1 (800) 555-MESH</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
