'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface FooterProps {
  scrollToSection: (id: string) => void;
}

export default function Footer({ scrollToSection }: FooterProps) {
  return (
    <div 
      style={{
        color: '#ffffff',
        borderTop: '1px solid rgba(197, 160, 89, 0.15)',
        padding: '80px 0 0 0',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden',
        boxShadow: '0 -20px 50px rgba(0,0,0,0.5)'
      }}
    >
      {/* 3D Parallax Background Layer */}
      <div 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          zIndex: -2, 
          backgroundImage: "url('/images/carpet_best_01.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed", /* */
          filter: "saturate(0.4)" 
        }} 
      />

      {/* */}
      <div 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'linear-gradient(to top, rgba(13, 14, 16, 0.98) 10%, rgba(20, 22, 26, 0.85) 100%)',
          zIndex: -1 
        }} 
      />

      {/* */}
      <div style={{ position: "relative", zIndex: 1, perspective: "1000px" }}>
        <footer className="footer-grid">

        {/* Brand Identity Column */}
        <div>
          {/* */}
          <div
            style={{
              position: 'relative',
              paddingLeft: '62px', /* */
              minHeight: '46px',
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px'
            }}
          >
            {/* Circular Logo Housing Shifted Left */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                overflow: 'hidden',
                background: '#ffffff',
                border: '1px solid #c5a059',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Image
                src="/logo.jpeg"
                alt="Abdul Rahman Carpets Logo"
                fill
                sizes="46px"
                style={{ objectFit: 'cover' }}
              />
            </div>

            <div style={{ fontSize: '24px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', fontFamily: "'Cinzel', serif" }}>
              Abdul Rahman<span style={{ color: '#c5a059', marginLeft: '6px' }}>Carpets</span>
            </div>
          </div>
          
          <p 
            style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#ffffff',
              margin: '16px 0 0 0',
              maxWidth: '320px',
              paddingLeft: '62px' /* */
            }}
          >
            Official online ecosystem dedicated to showcasing trackable custom rugs, pioneering fine-tuned manufacturing, and managing hospitality and commercial specifications worldwide.
          </p>
        </div>

        {/* Navigation Directory */}
        <div>
          <span
            style={{
              fontSize: '16px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: 'var(--accent-solid)',
              marginBottom: '24px',
              display: 'block'
            }}
          >
            Important Links
          </span>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Link href="/" style={directoryLinkStyle}>Home</Link>
            <Link href="/who_are_we" style={directoryLinkStyle}>About Us</Link>
            <Link href="/collections" style={directoryLinkStyle}>Collections</Link>
            <button
              type="button"
              onClick={() => scrollToSection('cta-funnel')}
              style={{
                ...directoryLinkStyle,
                background: 'transparent',
                border: 'none',
                padding: 0,
                textAlign: 'left',
                cursor: 'pointer'
              }}
            >
              Contact Us
            </button>
          </nav>
        </div>

        {/* Intouch Channels */}
        <div>
          <span
            style={{
              fontSize: '16px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: 'var(--accent-solid)',
              marginBottom: '24px',
              display: 'block'
            }}
          >
            Get In Touch
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={contactNodeStyle}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c5a059" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '3px' }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.79 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              <a href="tel:+15550192" style={{ color: 'inherit', textDecoration: 'none' }}>+1 (555) 0192</a>
            </div>
            <div style={contactNodeStyle}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c5a059" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '3px' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              <span>Corporate HQ, Suite 500<br />Hub Area, Atlanta, GA 30120</span>
            </div>
          </div>
        </div>

        {/* Social Panel With Backtotop Button */}
        <div>
          <span
            style={{
              fontSize: '16px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: 'var(--accent-solid)',
              marginBottom: '24px',
              display: 'block'
            }}
          >
            Follow Us
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <a
                href="https://www.instagram.com/arcarpets_/"
                target="_blank"
                rel="noopener noreferrer"
                style={socialIconStyle}
                aria-label="Instagram Channel"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              </a>

              <a
                href="https://wa.me/9833644653?text=Hello%20Abdul%20Rahman%20Carpets%20Team,%20I%20am%20reaching%20out%20from%20your%20website%20portfolio."
                target="_blank"
                rel="noopener noreferrer"
                style={socialIconStyle}
                aria-label="WhatsApp Chat Pipeline"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>

              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" style={socialIconStyle} aria-label="Pinterest Boards">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              </a>
            </div>

            <button
              type="button"
              onClick={() => scrollToSection('top')}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                borderRadius: '2px'
              }}
              title="Return to Header Viewport"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15" /></svg>
            </button>
          </div>
        </div>

      </footer>
      </div>

      {/* Copyright Bottom Bar */}
      <div
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          padding: '32px 5%',
          background: '#0d0e10'
        }}
      >
        <div className="footer-bottom-bar">
          <span>&copy; 2026 ABDUL RAHMAN CARPETS. ALL RIGHTS RESERVED.</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            <a href="#" style={legalLinkStyle}>Privacy Policy</a>
            <a href="#" style={legalLinkStyle}>Terms and Conditions</a>
          </div>
        </div>
      </div>

      {/* Responsive Css Dials */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .footer-grid {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 5% 60px 5%;
          display: grid;
          grid-template-columns: 1.5fr repeat(3, 1fr);
          gap: 48px;
          align-items: start;
        }

        .footer-bottom-bar {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
          font-size: 14px;
          color: #d4d4d8;
        }

        @media (max-width: 1023px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 767px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .footer-bottom-bar {
            flex-direction: column;
            justify-content: center;
            text-align: center;
          }
        }
        `
      }} />
    </div>
  );
}

/* Reusable Inline Style Objects */

const directoryLinkStyle: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '1px',
  textDecoration: 'none',
  color: '#ffffff',
  width: 'max-content'
};

const contactNodeStyle: React.CSSProperties = {
  fontSize: '16px',
  color: '#ffffff',
  lineHeight: '1.6',
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
  textDecoration: 'none'
};

const socialIconStyle: React.CSSProperties = {
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const legalLinkStyle: React.CSSProperties = {
  color: '#d4d4d8',
  textDecoration: 'none',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
};