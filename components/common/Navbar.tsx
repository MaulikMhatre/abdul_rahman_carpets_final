'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useThemeContext } from '@/context/ThemeContext';

interface NavbarProps {
  isScrolled: boolean;
  scrollToSection: (id: string) => void;
}

export default function Navbar({ isScrolled, scrollToSection }: NavbarProps) {
  const { theme, setTheme } = useThemeContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const isDarkBg = !isScrolled && pathname === '/';

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={`nav-container ${isScrolled ? 'is-scrolled' : ''}`}
        id="globalNavigationHeader"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isScrolled ? '16px 48px' : '24px 48px',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          background: isScrolled
            ? theme === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(28, 29, 33, 0.85)'
            : 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0) 100%)',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled
            ? theme === 'light' ? '1px solid rgba(0, 0, 0, 0.06)' : '1px solid rgba(255, 255, 255, 0.06)'
            : '1px solid rgba(255, 255, 255, 0.0)'
        }}
      >
        {/* Brand Logo Housing */}
        <Link
          href="/"
          className="nav-brand"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            cursor: 'pointer',
            userSelect: 'none',
            textDecoration: 'none'
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: isScrolled ? '1px solid #c5a059' : '1px solid rgba(255, 255, 255, 0.3)',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              transition: 'border 0.3s ease',
              flexShrink: 0
            }}
          >
            <Image
              src="/logo.jpeg"
              alt="Abdul Rahman Carpets Logo"
              fill
              sizes="40px"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>

          <span
            style={{
              fontWeight: 600,
              fontSize: '16px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              transition: 'color 0.3s ease',
              color: isDarkBg 
                ? '#ffffff' 
                : (theme === 'light' ? '#1c1d21' : '#ffffff'),
              textShadow: isDarkBg ? '0 2px 4px rgba(0, 0, 0, 0.4)' : 'none'
            }}
          >
            Abdul Rahman<span style={{ color: '#c5a059', marginLeft: '6px' }}>Carpets</span>
          </span>
        </Link>

        {/* Desktop Navigation Matrix */}
        <div
          className="desktop-menu-nodes"
          style={{
            display: 'flex',
            gap: '36px',
            alignItems: 'center'
          }}
        >
          <Link
            href="/"
            className="nav-link-item"
            style={{
              fontSize: '14px',
              fontWeight: 500,
              textDecoration: 'none',
              letterSpacing: '0.4px',
              transition: 'all 0.3s ease',
              color: pathname === '/'
                ? '#c5a059'
                : (isScrolled ? (theme === 'light' ? '#4e4f54' : '#a0a0a5') : 'rgba(255, 255, 255, 0.9)'),
              textShadow: isScrolled ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#c5a059'}
            onMouseLeave={(e) => {
              if (pathname !== '/') {
                e.currentTarget.style.color = isScrolled
                  ? theme === 'light' ? '#4e4f54' : '#a0a0a5'
                  : 'rgba(255, 255, 255, 0.9)';
              }
            }}
          >
            Home
          </Link>

          <Link
            href="/who_are_we"
            className="nav-link-item"
            style={{
              fontSize: '14px',
              fontWeight: 500,
              textDecoration: 'none',
              letterSpacing: '0.4px',
              transition: 'all 0.3s ease',
              color: pathname === '/who_are_we'
                ? '#c5a059'
                : (isScrolled ? (theme === 'light' ? '#4e4f54' : '#a0a0a5') : 'rgba(255, 255, 255, 0.9)'),
              textShadow: isScrolled ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#c5a059'}
            onMouseLeave={(e) => {
              if (pathname !== '/who_are_we') {
                e.currentTarget.style.color = isScrolled
                  ? theme === 'light' ? '#4e4f54' : '#a0a0a5'
                  : 'rgba(255, 255, 255, 0.9)';
              }
            }}
          >
            Who We Are
          </Link>

          <Link
            href="/collections"
            className="nav-link-item"
            style={{
              fontSize: '14px',
              fontWeight: 500,
              textDecoration: 'none',
              letterSpacing: '0.4px',
              transition: 'all 0.3s ease',
              color: pathname === '/collections'
                ? '#c5a059'
                : (isScrolled ? (theme === 'light' ? '#4e4f54' : '#a0a0a5') : 'rgba(255, 255, 255, 0.9)'),
              textShadow: isScrolled ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#c5a059'}
            onMouseLeave={(e) => {
              if (pathname !== '/collections') {
                e.currentTarget.style.color = isScrolled
                  ? theme === 'light' ? '#4e4f54' : '#a0a0a5'
                  : 'rgba(255, 255, 255, 0.9)';
              }
            }}
          >
            Collections
          </Link>

          <Link
            href="/products/all"
            className="nav-link-item"
            style={{
              fontSize: '14px',
              fontWeight: 500,
              textDecoration: 'none',
              letterSpacing: '0.4px',
              transition: 'all 0.3s ease',
              color: pathname.startsWith('/products')
                ? '#c5a059'
                : (isScrolled ? (theme === 'light' ? '#4e4f54' : '#a0a0a5') : 'rgba(255, 255, 255, 0.9)'),
              textShadow: isScrolled ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#c5a059'}
            onMouseLeave={(e) => {
              if (!pathname.startsWith('/products')) {
                e.currentTarget.style.color = isScrolled
                  ? theme === 'light' ? '#4e4f54' : '#a0a0a5'
                  : 'rgba(255, 255, 255, 0.9)';
              }
            }}
          >
            Product Details
          </Link>

          <Link
            href="/contact_us"
            className="nav-link-item"
            style={{
              fontSize: '14px',
              fontWeight: 500,
              textDecoration: 'none',
              letterSpacing: '0.4px',
              transition: 'all 0.3s ease',
              color: pathname === '/contact_us'
                ? '#c5a059'
                : (isScrolled ? (theme === 'light' ? '#4e4f54' : '#a0a0a5') : 'rgba(255, 255, 255, 0.9)'),
              textShadow: isScrolled ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#c5a059'}
            onMouseLeave={(e) => {
              if (pathname !== '/contact_us') {
                e.currentTarget.style.color = isScrolled
                  ? theme === 'light' ? '#4e4f54' : '#a0a0a5'
                  : 'rgba(255, 255, 255, 0.9)';
              }
            }}
          >
            Contact Us
          </Link>
        </div>

        {/* Utilities Panel */}
        <div
          className="nav-utilities"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(12px, 3vw, 24px)'
          }}
        >
          {/* Theme Toggle */}
          <button
            className="theme-toggle"
            id="themeEngineButton"
            title="Toggle Surface Treatment"
            onClick={() => setTheme((prev) => prev === 'light' ? 'dark' : 'light')}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px',
              borderRadius: '50%',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(15deg)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0deg)'}
          >
            <svg
              viewBox="0 0 24 24"
              style={{
                width: '20px',
                height: '20px',
                fill: 'none',
                stroke: isDarkBg
                  ? '#ffffff'
                  : (theme === 'light' ? '#1c1d21' : '#ffffff'),
                strokeWidth: 2,
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                filter: isDarkBg ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' : 'none',
                transition: 'stroke 0.3s ease'
              }}
            >
              {theme === 'light' ? (
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              ) : (
                <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
              )}
            </svg>
          </button>

          {/* Request A Quote Cta */}
          <Link
            href="/products/all"
            className="nav-action-btn desktop-action-cta"
            style={{
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.3px',
              padding: '11px 24px 8px 24px',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'inline-block', /* */
              textAlign: 'center',
              textDecoration: 'none', /* */
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              background: isScrolled
                ? theme === 'light' ? '#1c1d21' : '#c5a059'
                : '#ffffff',
              color: isScrolled
                ? theme === 'light' ? '#ffffff' : '#1c1d21'
                : '#1c1d21',
              border: isScrolled
                ? theme === 'light' ? '1px solid #1c1d21' : '1px solid #c5a059'
                : '1px solid #ffffff',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              uiStyleUpdate(e.currentTarget, '#c5a059', '#c5a059', '#1c1d21');
            }}
            onMouseLeave={(e) => {
              if (isScrolled) {
                uiStyleUpdate(
                  e.currentTarget,
                  theme === 'light' ? '#1c1d21' : '#c5a059',
                  theme === 'light' ? '#1c1d21' : '#c5a059',
                  theme === 'light' ? '#ffffff' : '#1c1d21'
                );
              } else {
                uiStyleUpdate(e.currentTarget, '#ffffff', '#ffffff', '#1c1d21');
              }
            }}
          >
            Request a Quote
          </Link>

          {/* Mobile Hamburger Toggle Box */}
          <button
            className={`mobile-burger-trigger ${isMobileMenuOpen ? 'burger-active' : ''}`}
            aria-label="Toggle Mobile Menu Navigation"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: isMobileMenuOpen 
                ? 'transparent' 
                : (isScrolled ? (theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)') : 'rgba(255,255,255,0.15)'),
              border: isMobileMenuOpen
                ? 'none'
                : (isScrolled ? (theme === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.2)') : '1px solid rgba(255,255,255,0.3)'),
              borderRadius: '10px',
              cursor: 'pointer',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '46px',
              height: '46px',
              padding: '0',
              gap: '5px',
              zIndex: 1100,
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              position: 'relative',
              transition: 'all 0.3s ease'
            }}
          >
            <span className="burger-line line-top" style={{ display: 'block', width: '22px', height: '2px', background: isMobileMenuOpen ? (theme === 'light' ? '#1c1d21' : '#ffffff') : (isDarkBg ? '#ffffff' : (theme === 'light' ? '#1c1d21' : '#ffffff')), transition: 'all 0.3s ease', transformOrigin: 'center' }}></span>
            <span className="burger-line line-mid" style={{ display: 'block', width: '22px', height: '2px', background: isMobileMenuOpen ? (theme === 'light' ? '#1c1d21' : '#ffffff') : (isDarkBg ? '#ffffff' : (theme === 'light' ? '#1c1d21' : '#ffffff')), transition: 'all 0.2s ease', opacity: isMobileMenuOpen ? 0 : 1 }}></span>
            <span className="burger-line line-bot" style={{ display: 'block', width: '22px', height: '2px', background: isMobileMenuOpen ? (theme === 'light' ? '#1c1d21' : '#ffffff') : (isDarkBg ? '#ffffff' : (theme === 'light' ? '#1c1d21' : '#ffffff')), transition: 'all 0.3s ease', transformOrigin: 'center' }}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Nav Drawer Overlay Map */}
      <div
        className={`mobile-navigation-drawer ${isMobileMenuOpen ? 'drawer-active' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: 'min(320px, 85vw)',
          height: '100vh',
          background: theme === 'light' ? '#ffffff' : 'var(--bg-cards)',
          borderLeft: '1px solid var(--border-subtle)',
          zIndex: 1050,
          display: 'flex',
          flexDirection: 'column',
          padding: '100px 32px 40px',
          gap: '24px',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: isMobileMenuOpen ? 'translateX(0%)' : 'translateX(100%)',
          boxShadow: isMobileMenuOpen ? '-10px 0 40px rgba(0,0,0,0.15)' : 'none'
        }}
      >
        {/* Explicit Close Anchor Button */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close Navigation Drawer"
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            background: 'transparent',
            border: 'none',
            fontSize: '22px',
            fontWeight: '300',
            color: 'var(--text-pure)',
            cursor: 'pointer',
            padding: '4px 8px',
            lineHeight: 1,
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#c5a059'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-pure)'}
        >
          ✕
        </button>

        <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="mobile-drawer-link" style={{ borderBottom: pathname === '/' ? '2px solid #c5a059' : '2px solid transparent' }}>Home</Link>
        <Link href="/who_are_we" onClick={() => setIsMobileMenuOpen(false)} className="mobile-drawer-link" style={{ borderBottom: pathname === '/who_are_we' ? '2px solid #c5a059' : '2px solid transparent' }}>Who We Are</Link>
        <Link href="/collections" onClick={() => setIsMobileMenuOpen(false)} className="mobile-drawer-link" style={{ borderBottom: pathname === '/collections' ? '2px solid #c5a059' : '2px solid transparent' }}>Collections</Link>
        <Link href="/products/all" onClick={() => setIsMobileMenuOpen(false)} className="mobile-drawer-link" style={{ borderBottom: pathname.startsWith('/products') ? '2px solid #c5a059' : '2px solid transparent' }}>Product Details</Link>
        <Link href="/contact_us" onClick={() => setIsMobileMenuOpen(false)} className="mobile-drawer-link" style={{ borderBottom: pathname === '/contact_us' ? '2px solid #c5a059' : '2px solid transparent' }}>Contact Us</Link>

        <button
          onClick={() => {
            setIsMobileMenuOpen(false);
            setTimeout(() => scrollToSection('cta-funnel'), 300);
          }}
          style={{
            width: '100%',
            marginTop: 'auto',
            padding: '14px',
            fontSize: '13px',
            background: '#c5a059',
            color: '#ffffff',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            cursor: 'pointer'
          }}
        >
          Request a Quote
        </button>
      </div>

      {/* Drawer Background Mask */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            zIndex: 1020
          }}
        />
      )}

      {/* Core Layout Responsive Media Dials */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .desktop-menu-nodes { display: flex; }
        .mobile-burger-trigger { display: none; }

        .mobile-drawer-link {
          font-size: 18px;
          font-weight: 600;
          letter-spacing: -0.01em;
          text-decoration: none;
          color: var(--text-pure);
          background: transparent;
          text-align: left;
          padding: 8px 0;
          cursor: pointer;
          width: max-content;
          transition: all 0.2s ease;
        }

        .mobile-drawer-link:hover {
          color: #c5a059;
        }

        .burger-active .line-top {
          transform: translateY(7px) rotate(45deg);
        }
        .burger-active .line-mid {
          opacity: 0 !important;
        }
        .burger-active .line-bot {
          transform: translateY(-7px) rotate(-45deg);
        }

        @media (max-width: 1023px) {
          .desktop-menu-nodes, .desktop-action-cta { display: none !important; }
          .mobile-burger-trigger { display: flex !important; }
          
          /* */
          .nav-container { 
            padding: 16px 20px !important;
            background: transparent !important;
            border: none !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            box-shadow: none !important;
            pointer-events: none; /* */
          }
          
          /* */
          .nav-brand, .nav-utilities {
            pointer-events: auto;
          }

          /* */
          .theme-toggle {
            background: ${isScrolled ? (theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)') : 'rgba(255,255,255,0.15)'} !important;
            border: ${isScrolled ? (theme === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.2)') : '1px solid rgba(255,255,255,0.3)'} !important;
            border-radius: 10px !important;
            width: 46px !important;
            height: 46px !important;
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
          }
          
          /* */
          .nav-brand {
            background: ${isScrolled ? (theme === 'light' ? 'rgba(255,255,255,0.85)' : 'rgba(28,29,33,0.85)') : 'rgba(255,255,255,0.1)'};
            padding: 6px 16px 6px 6px;
            border-radius: 40px;
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: ${isScrolled ? (theme === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.1)') : '1px solid rgba(255,255,255,0.2)'};
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
        }
      `}} />
    </>
  );
}

const uiStyleUpdate = (target: HTMLElement, bg: string, border: string, color: string) => {
  target.style.background = bg;
  target.style.borderColor = border;
  target.style.color = color;
};