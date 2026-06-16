'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/auth-context';

const NAV_LINKS = [
  { label: 'Network', href: '/#network' },
  { label: 'Verification', href: '/#verification' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Pilot', href: '/#pilot' },
];

type NavbarProps = {
  forceSolid?: boolean;
  onPlanClick?: () => void;
  onDashboardClick?: () => void;
};

const Navbar = ({ forceSolid = false, onPlanClick, onDashboardClick }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();
  const ctaHref = user ? '/dashboard' : '/login';
  const ctaLabel = user ? 'Dashboard' : 'Start Now';
  const handleCtaClick = (e: React.MouseEvent<HTMLElement>) => {
    if (user && onDashboardClick) {
      e.preventDefault();
      onDashboardClick();
      setMenuOpen(false);
      return;
    }

    if (!user && onPlanClick) {
      e.preventDefault();
      onPlanClick();
    }
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <style>{`
        .navbar-links { display: flex; align-items: center; gap: 2.5rem; }
        .navbar-ctas  { display: flex; align-items: center; gap: 1rem; }
        .hamburger    { display: none; background: none; border: none; cursor: pointer; padding: 6px; }

        @media (max-width: 768px) {
          .navbar-links { display: none; }
          .navbar-ctas  { display: none; }
          .hamburger    { display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 5px; }
        }
      `}</style>

      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all 0.5s ease',
          padding: isScrolled ? '0.75rem 0' : '1.25rem 0',
          background: isScrolled || menuOpen || forceSolid ? 'rgba(241, 239, 230, 0.96)' : 'transparent',
          backdropFilter: isScrolled || menuOpen || forceSolid ? 'blur(20px)' : 'none',
          borderBottom: `1px solid ${isScrolled || forceSolid ? 'rgba(17, 35, 59, 0.08)' : 'rgba(17, 35, 59, 0)'}`,
        }}
      >
        <div className="container-full" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <img src="/icon_transparent.png" alt="AdMesh Icon" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '13px', letterSpacing: '0.22em', color: 'var(--dirty-white)', textTransform: 'uppercase', paddingTop: '2px' }}>
              ADMESH
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="navbar-links">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  position: 'relative',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: 'var(--dirty-white)',
                  opacity: 0.8,
                  textDecoration: 'none',
                  letterSpacing: '0.15em',
                  padding: '4px 0',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => { 
                  (e.currentTarget as HTMLElement).style.color = 'var(--amber)';
                  (e.currentTarget as HTMLElement).style.opacity = '1';
                }}
                onMouseLeave={(e) => { 
                  (e.currentTarget as HTMLElement).style.color = 'var(--dirty-white)';
                  (e.currentTarget as HTMLElement).style.opacity = '0.8';
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="navbar-ctas font-mono">
            <Link
              href={ctaHref}
              onClick={handleCtaClick}
              style={{
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.15em',
                color: 'var(--dirty-white)',
                background: 'transparent',
                textDecoration: 'none',
                textTransform: 'uppercase',
                fontWeight: 600,
                padding: '8px 16px',
                border: '1px solid transparent',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { 
                (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--dirty-white)'; 
                (e.currentTarget as HTMLElement).style.color = 'var(--obsidian)';
              }}
              onMouseLeave={(e) => { 
                (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; 
                (e.currentTarget as HTMLElement).style.color = 'var(--dirty-white)';
              }}
            >
              [ {ctaLabel} ]
            </Link>
          </div>

          {/* Hamburger Button (mobile only) */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              style={{ display: 'block', width: '22px', height: '2px', background: '#0F172A', borderRadius: '2px', transformOrigin: 'center' }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'block', width: '22px', height: '2px', background: '#0F172A', borderRadius: '2px' }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              style={{ display: 'block', width: '22px', height: '2px', background: '#0F172A', borderRadius: '2px', transformOrigin: 'center' }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 98,
                background: 'rgba(15,23,42,0.15)',
                backdropFilter: 'blur(4px)',
              }}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: '80vw',
                maxWidth: '320px',
                zIndex: 99,
                background: 'var(--obsidian)', /* Warm Paper */
                borderLeft: '1px solid rgba(17, 35, 59, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                paddingTop: '80px',
                paddingBottom: '2rem',
                paddingLeft: '2rem',
                paddingRight: '2rem',
              }}
            >
              {/* Nav Links */}
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {NAV_LINKS.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      style={{
                        display: 'block',
                        fontSize: '14px',
                        fontFamily: 'var(--font-mono)',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        color: 'var(--dirty-white)',
                        textDecoration: 'none',
                        letterSpacing: '0.12em',
                        padding: '14px 0',
                        borderBottom: '1px solid rgba(17, 35, 59, 0.1)',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--amber)'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--dirty-white)'; }}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.35 }}
                style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}
              >

                <Link
                  href={ctaHref}
                  onClick={handleCtaClick}
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.15em',
                    color: 'var(--dirty-white)',
                    background: 'transparent',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    padding: '12px 20px',
                    border: '1px solid var(--dirty-white)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => { 
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--dirty-white)'; 
                    (e.currentTarget as HTMLElement).style.color = 'var(--obsidian)';
                  }}
                  onMouseLeave={(e) => { 
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; 
                    (e.currentTarget as HTMLElement).style.color = 'var(--dirty-white)';
                  }}
                >
                  [ {ctaLabel} ]
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
