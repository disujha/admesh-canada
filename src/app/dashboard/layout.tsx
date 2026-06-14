'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import {
  LayoutDashboard,
  Megaphone,
  FileCheck,
  BarChart2,
  Store,
  Bot,
  Rocket,
  Users,
  Settings,
  LogOut,
  Bell,
  Search,
  ChevronRight,
  Menu,
  X,
  ChevronsLeft,
  ChevronsRight,
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

const navGroups: { title: string; items: NavItem[] }[] = [
  {
    title: 'Core',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', match: (p) => p === '/dashboard' },
      { label: 'Campaigns', icon: Megaphone, href: '/dashboard/campaigns', match: (p) => p.startsWith('/dashboard/campaigns') },
      { label: 'Deployments', icon: Rocket, href: '/dashboard/campaigns/new', match: (p) => p === '/dashboard/campaigns/new' },
      { label: 'Compliance', icon: FileCheck, href: '/dashboard/compliance', match: (p) => p === '/dashboard/compliance' },
      { label: 'Analytics', icon: BarChart2, href: '/dashboard/analytics', match: (p) => p === '/dashboard/analytics' },
    ],
  },
  {
    title: 'Intelligence',
    items: [
      { label: 'Retail Network', icon: Store, comingSoon: true },
      { label: 'AI Insights', icon: Bot, comingSoon: true },
      { label: 'Retailers', icon: Users, comingSoon: true },
      { label: 'Settings', icon: Settings, comingSoon: true },
    ],
  },
];

function NavLink({
  item,
  pathname,
  collapsed,
  onNavigate,
}: {
  item: NavItem;
  pathname: string;
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const active = item.match ? item.match(pathname) : item.href === pathname;
  const Icon = item.icon;

  const commonClass = `group ${collapsed ? 'w-full justify-center px-0 mx-0' : 'w-full px-4'} min-h-[42px] flex items-center gap-3.5 py-2 rounded-xl transition-all duration-200 ${
    active
      ? 'bg-white/8 text-slate-100'
      : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
  }`;

  if (!item.href || item.comingSoon) {
    return (
      <button type="button" className={`${commonClass} cursor-default`} title={item.label}>
        <Icon size={20} className={active ? 'text-amber-400' : 'text-slate-500 group-hover:text-slate-300'} />
        {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
        {!collapsed && item.comingSoon && (
          <span className="ml-auto text-[10px] uppercase tracking-wider text-slate-500">Soon</span>
        )}
        {active && !collapsed && <ChevronRight size={14} className="ml-auto text-amber-300" />}
      </button>
    );
  }

  return (
    <Link href={item.href} onClick={onNavigate} className={commonClass} title={item.label}>
      <Icon size={20} className={active ? 'text-amber-400' : 'text-slate-500 group-hover:text-slate-300'} />
      {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
      {active && !collapsed && <ChevronRight size={14} className="ml-auto text-amber-300" />}
    </Link>
  );
}

function SidebarBody({
  pathname,
  profile,
  collapsed,
  onNavigate,
  onLogout,
}: {
  pathname: string;
  profile: { displayName?: string | null; role?: string | null } | null;
  collapsed: boolean;
  onNavigate?: () => void;
  onLogout: () => void;
}) {
  return (
    <div className="h-full flex flex-col">
      <div
        className={`${collapsed ? 'px-4 py-5' : 'px-6'} border-b border-white/5`}
        style={collapsed ? undefined : { paddingLeft: '2rem', paddingTop: '1.2rem', paddingBottom: '1.2rem' }}
      >
        <Link href="/" onClick={onNavigate} className={`flex min-h-[40px] ${collapsed ? 'justify-center' : 'items-center gap-3.5'}`}>
          <img src="/icon_transparent.png" alt="AdMesh" className="w-8 h-8 object-contain" />
          {!collapsed && (
            <span className="text-[22px] leading-none font-bold tracking-tight text-slate-100">
              Ad<span className="db-accent">Mesh</span>
            </span>
          )}
        </Link>
      </div>

      <div
        className={`${collapsed ? 'px-0 py-4 overflow-y-hidden' : 'px-3 py-5 overflow-y-auto'} flex-grow space-y-4`}
        style={collapsed ? undefined : { paddingLeft: '2rem' }}
      >
        {navGroups.map((group) => (
          <div key={group.title} className="space-y-1.5">
            {group.items.map((item) => (
              <NavLink
                key={item.label}
                item={item}
                pathname={pathname}
                collapsed={collapsed}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        ))}
      </div>

      <div className={`${collapsed ? 'p-2' : 'p-4'} border-t border-white/5`}>
        <div className={`${collapsed ? 'p-2 flex flex-col items-center' : 'p-4'} rounded-xl bg-white/5 border border-white/10`}>
          <div className={`flex items-center min-w-0 ${collapsed ? 'justify-center mb-2' : 'gap-3.5 mb-3.5'}`}>
            <div className="w-10 h-10 rounded-lg bg-[rgba(201,115,32,0.2)] db-accent flex items-center justify-center font-semibold shrink-0">
              {(profile?.displayName || 'U').charAt(0)}
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-100 truncate max-w-[160px]">{profile?.displayName || 'User'}</p>
                <p className="text-xs text-slate-500 truncate">{profile?.role || 'brand_account'}</p>
              </div>
            )}
          </div>
          <button
            onClick={onLogout}
            className={`${collapsed ? 'w-10 h-10 p-0 self-center' : 'w-full py-2.5'} inline-flex items-center justify-center gap-2 rounded-lg text-xs font-semibold text-rose-200 bg-rose-500/12 hover:bg-rose-500/18 transition-colors`}
            aria-label="Logout"
          >
            <LogOut size={collapsed ? 16 : 14} />
            {!collapsed && 'Logout'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { profile, logout, loading } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    const applyLayout = () => {
      const mobile = mediaQuery.matches;
      setIsMobile(mobile);
      setIsSidebarOpen(false);
      if (mobile) setCollapsed(false);
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
      <div className="min-h-screen flex items-center justify-center bg-[#0B0C0F]">
        <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const desktopSidebarWidthPx = collapsed ? 96 : 232;

  return (
    <div className="dashboard-shell min-h-screen bg-[#0f1114] text-slate-100 flex overflow-x-hidden">
      <aside
        className="hidden lg:flex bg-[#14171b] border-r border-white/10 flex-col h-screen fixed left-0 top-0 z-40 transition-all duration-300"
        style={{ width: `${desktopSidebarWidthPx}px` }}
      >
        <SidebarBody pathname={pathname} profile={profile} collapsed={collapsed} onLogout={logout} />
      </aside>

      {isMobile && isSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <motion.aside
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            className="w-56 bg-[#14171b] border-r border-white/10 flex flex-col fixed top-0 left-0 h-screen z-50"
          >
            <SidebarBody
              pathname={pathname}
              profile={profile}
              collapsed={false}
              onNavigate={() => setIsSidebarOpen(false)}
              onLogout={logout}
            />
          </motion.aside>
        )}
      </AnimatePresence>

      <main
        className="flex-grow flex flex-col min-w-0 w-full"
        style={{ marginLeft: isMobile ? 0 : `${desktopSidebarWidthPx + 16}px` }}
      >
        <header className="h-16 lg:h-20 bg-[#0f1114]/90 backdrop-blur-md border-b border-white/10 px-7 lg:px-10 xl:px-12 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4 lg:gap-5 min-w-0">
            <button
              onClick={() => (isMobile ? setIsSidebarOpen((v) => !v) : setCollapsed((v) => !v))}
              className="p-2 rounded-lg border border-white/10 text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
              aria-label="Toggle sidebar"
            >
              {isMobile ? (isSidebarOpen ? <X size={18} /> : <Menu size={18} />) : collapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
            </button>
            <div className="relative min-w-0 hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
              <input
                type="text"
                placeholder="Search campaigns, retailers, insights..."
                className="db-input w-[240px] lg:w-[380px] pl-14 pr-4"
                style={{ paddingLeft: '3.25rem' }}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-5">
            <button className="relative p-2 rounded-lg border border-white/10 text-slate-300 hover:bg-white/5 hover:text-white transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full db-accent-bg shadow-[0_0_10px_rgba(201,115,32,0.9)]" />
            </button>
            <div className="hidden sm:flex items-center gap-3 pl-2">
              <span className="text-sm font-medium text-slate-200 truncate max-w-[180px]">{profile?.displayName}</span>
              <img src="/icon_transparent.png" alt="User" className="w-8 h-8 object-contain" />
            </div>
          </div>
        </header>

        <div className="p-7 lg:p-9 xl:p-12 w-full max-w-[1540px] mx-auto">{children}</div>
      </main>
    </div>
  );
}
