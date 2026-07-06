'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

const HERO_SLIDES: string[] = [
  '/images/carpet_best_01.jpg',
  '/images/carpet_best_02.jpg',
  '/images/carpet_05.jpg'
];

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const isDragging = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const currentX = useRef<number>(0);
  const autoTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const startSliderInterval = (): void => {
    if (autoTimer.current) clearInterval(autoTimer.current);
    autoTimer.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
  };

  useEffect(() => {
    startSliderInterval();
    return () => {
      if (autoTimer.current) clearInterval(autoTimer.current);
    };
  }, []);

  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
    startSliderInterval();
  };

  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    startSliderInterval();
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    startSliderInterval();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>): void => {
    isDragging.current = true;
    startX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
    if (autoTimer.current) clearInterval(autoTimer.current);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>): void => {
    if (!isDragging.current) return;
    currentX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>): void => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diffX = currentX.current - startX.current;

    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    } else {
      startSliderInterval();
    }
  };

  // Original Global Appearonscroll Fadein Animations
  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, observerOptions);

    const nodes = document.querySelectorAll('.reveal-node');
    nodes.forEach((node) => observer.observe(node));

    return () => {
      nodes.forEach((node) => observer.unobserve(node));
    };
  }, []);

  //
  useEffect(() => {
    if (window.innerWidth >= 1024) return;

    const mobileObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active-mobile-scroll');
          } else {
            entry.target.classList.remove('active-mobile-scroll');
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.1,
      }
    );

    document.querySelectorAll('.mobile-scroll-target').forEach((el) => mobileObserver.observe(el));
    return () => mobileObserver.disconnect();
  }, []);

  const scrollToSection = (id: string): void => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="dot-matrix"></div>

      <Navbar
        isScrolled={isScrolled}
        
        scrollToSection={scrollToSection}
      />

      {/* Hero Banner Section */}
      <header
        className="slider"
        id="slider"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => { isDragging.current = false; startSliderInterval(); }}
        style={{ touchAction: 'none' }}
      >
        {HERO_SLIDES.map((slideUrl, idx) => (
          <div
            key={slideUrl}
            className={`slide ${idx === currentSlide ? 'active' : ''}`}
            style={{
              transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: idx === currentSlide ? 'translateX(0%)' : idx < currentSlide ? 'translateX(-100%)' : 'translateX(100%)',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
          >
            <div className="slide-bg" style={{ backgroundImage: `url('${slideUrl}')` }}></div>
          </div>
        ))}

        {/* Dynamic Dark Gradient Mask */}
        <div
          className="slider-overlay-mask"
          style={{
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.6) 100%)',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 2
          }}
        ></div>

        <div className="hero-layout" style={{ position: 'relative', zIndex: 10, padding: '0 24px', paddingTop: 'clamp(130px, 16vh, 160px)', textAlign: 'center' }}>
          <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', width: '100%' }}>
            <span className="eyebrow-line" style={{ flex: 1, maxWidth: '50px', height: '1px', background: 'linear-gradient(to right, transparent, rgba(197, 160, 89, 0.8))' }}></span>
            <span
              className="welcome-eyebrow"
              style={{
                color: '#e2cca0',
                letterSpacing: '8px',
                fontWeight: 500,
                fontSize: '15px',
                textTransform: 'uppercase',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)',
                fontFamily: 'var(--font-sans, sans-serif)',
                textAlign: 'center',
                whiteSpace: 'normal',
                wordWrap: 'break-word'
              }}
            >
              Welcome to Abdul Rahman Carpets
            </span>
            <span className="eyebrow-line" style={{ flex: 1, maxWidth: '50px', height: '1px', background: 'linear-gradient(to left, transparent, rgba(197, 160, 89, 0.8))' }}></span>
          </div>

          <h1 className="display-headline" style={{ textShadow: '0 4px 16px rgba(0, 0, 0, 0.75)', color: '#ffffff' }}>
            Premium Carpet Collections &amp; Tailored Manufacturing
          </h1>

          <p className="editorial-subtext" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.85)', maxWidth: '800px', margin: '0 auto 40px auto', color: '#f5f5f7', fontWeight: 400 }}>
            Discover unmatched textile engineering. We serve as the official online ecosystem for high-fidelity custom rugs, designed to fit pristine residential, commercial, and hospitality venues flawlessly.
          </p>

          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/collections"
              className="nav-action-btn"
              style={{
                fontSize: '13px',
                padding: '14px 32px',
                background: '#c5a059',
                color: '#1c1d21',
                border: '1px solid #c5a059',
                fontWeight: 600,
                boxShadow: '0 4px 14px rgba(197, 160, 89, 0.3)',
                display: 'inline-block',
                textAlign: 'center',
                textDecoration: 'none'
              }}
            >
              Explore Collection
            </Link>
            <Link
              href="/contact_us"
              className="nav-action-btn"
              style={{
                fontSize: '13px',
                padding: '14px 32px',
                background: 'transparent',
                color: '#ffffff',
                border: '1px solid #ffffff',
                fontWeight: 500,
                display: 'inline-block',
                textAlign: 'center',
                textDecoration: 'none'
              }}
            >
              Request a Quote
            </Link>
          </div>
        </div>

        <button className="arrow prev" id="prevBtn" onClick={prevSlide}>&#8249;</button>
        <button className="arrow next" id="nextBtn" onClick={nextSlide}>&#8250;</button>

        <div className="scroll-down" onClick={() => scrollToSection('corporate-overview')}>&#8964;</div>

        <div className="dots" id="dots">
          {HERO_SLIDES.map((_, idx) => (
            <span
              key={idx}
              className={idx === currentSlide ? 'active' : ''}
              onClick={() => goToSlide(idx)}
            />
          ))}
        </div>
      </header>

      {/* Redesigned Structural Css Layers Mapping */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .redesign-section {
            padding: 120px 5%;
            position: relative;
            z-index: 10;
          }

          .eyebrow {
            color: var(--accent-solid);
            font-family: var(--font-mono);
            text-transform: uppercase;
            letter-spacing: 0.2em;
            font-size: 0.85rem;
            font-weight: 600;
            display: block;
            margin-bottom: 1rem;
          }

          .title-primary {
            font-size: clamp(2.5rem, 5vw, 4.5rem);
            font-weight: 700;
            line-height: 1.1;
            letter-spacing: -0.02em;
            color: var(--text-pure);
            margin-bottom: 1.5rem;
          }

          .title-gradient {
            background: linear-gradient(135deg, var(--text-pure) 0%, var(--text-muted) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .body-large {
            font-size: 1.15rem;
            color: var(--text-body);
            line-height: 1.7;
            max-width: 600px;
          }

          .grid-layout {
            max-width: 1400px;
            margin: 0 auto;
            display: grid;
            gap: 4rem;
          }

          .glass-panel {
            background: var(--bg-cards);
            border: 1px solid var(--border-subtle);
            border-radius: 16px;
            padding: 3rem;
            position: relative;
            overflow: hidden;
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 4px 20px rgba(0,0,0,0.02);
          }

          .glass-panel:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.08);
            border-color: var(--accent-solid);
          }

          .glass-panel::before {
            content: '';
            position: absolute;
            top: 0; left: 0; width: 100%; height: 4px;
            background: var(--accent-solid);
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.5s ease;
          }

          .glass-panel:hover::before {
            transform: scaleX(1);
          }

          .image-showcase {
            border-radius: 16px;
            overflow: hidden;
            position: relative;
            aspect-ratio: 4/5;
            background: var(--bg-secondary);
          }

          .image-showcase img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .image-showcase:hover img {
            transform: scale(1.05);
          }

          .image-showcase-content {
            position: absolute;
            bottom: 0; left: 0; width: 100%;
            padding: 3rem 2rem 2rem;
            background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%);
            color: #fff;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.5s ease;
          }

          .image-showcase:hover .image-showcase-content {
            opacity: 1;
            transform: translateY(0);
          }

          .btn-elegant {
            background: var(--accent-solid);
            color: #fff !important;
            padding: 16px 40px;
            border-radius: 4px;
            font-weight: 600;
            letter-spacing: 1px;
            font-size: 13px;
            text-transform: uppercase;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            text-decoration: none;
          }

          .btn-elegant:hover {
            background: var(--button-hover);
            color: var(--button-text-hover) !important;
            transform: translateY(-2px);
            box-shadow: 0 10px 20px var(--accent-glow);
          }

          /* Flash Animation Framework Mapping */
          @media (max-width: 1023px) {
            .glass-panel.active-mobile-scroll {
              animation: mobileBorderFlash 5s ease-in-out forwards;
            }
            .glass-panel.active-mobile-scroll::before {
              animation: mobileBarFlash 5s ease-in-out forwards;
            }
          }

          @keyframes mobileBorderFlash {
            0% { border-color: var(--border-subtle); box-shadow: none; transform: translateY(0); }
            6% { border-color: var(--accent-solid); box-shadow: 0 16px 32px rgba(0,0,0,0.08); transform: translateY(-4px); }
            90% { border-color: var(--accent-solid); box-shadow: 0 16px 32px rgba(0,0,0,0.08); transform: translateY(-4px); }
            100% { border-color: var(--border-subtle); box-shadow: none; transform: translateY(0); }
          }

          @keyframes mobileBarFlash {
            0% { transform: scaleX(0); }
            6% { transform: scaleX(1); }
            90% { transform: scaleX(1); }
            100% { transform: scaleX(0); }
          }
          
          /* Mobile Typography & Card Fixes */
          @media (max-width: 768px) {
            .welcome-eyebrow {
              letter-spacing: 3px !important;
              font-size: 13px !important;
              padding: 0 10px;
            }
            .eyebrow-line {
              display: none !important;
            }
            .redesign-section {
              padding: 80px 5% !important;
            }
            .title-primary {
              font-size: 2.2rem !important;
              margin-bottom: 1rem !important;
            }
            .body-large {
              font-size: 1rem !important;
              line-height: 1.6 !important;
            }
            .display-headline {
              font-size: 2.4rem !important;
              line-height: 1.2 !important;
            }
            .editorial-subtext {
              font-size: 1rem !important;
              line-height: 1.6 !important;
            }
            .glass-panel {
              padding: 2rem 1.5rem !important;
              background: var(--bg-secondary) !important; /* Slightly Darker Than Page Bg */
              border-color: var(--border-active) !important;
            }
            .glass-panel h3 {
              font-size: 1.3rem !important;
            }
            .glass-panel p {
              font-size: 0.95rem !important;
            }
            /* */
            .image-showcase-content {
              opacity: 1 !important;
              transform: none !important;
              padding: 2rem 1.5rem 1.5rem !important;
              background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 60%, transparent 100%) !important;
            }
            .image-showcase-content h3 {
              font-size: 1.4rem !important;
            }
            .image-showcase-content p {
              font-size: 0.9rem !important;
            }
            /* Fix Slider Padding On Mobile */
            .hero-layout {
              padding-top: 100px !important;
            }
          }
          
          .gallery-grid {
            max-width: 1400px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
          }
          
          @media (max-width: 768px) {
            .gallery-grid {
              grid-template-columns: 1fr 1fr !important;
              gap: 15px !important;
            }
            .gallery-grid .image-showcase-content {
              padding: 1.25rem 1rem !important;
            }
            .gallery-grid .image-showcase-content h3 {
              font-size: 1rem !important;
              margin: 0.25rem 0 !important;
            }
            .gallery-grid .image-showcase-content p {
              font-size: 0.75rem !important;
              display: none; /* */
            }
          }
        `
      }} />

      {/* Corporate Overview Section */}
      <section id="corporate-overview" className="redesign-section" style={{ background: 'var(--bg-page)' }}>
        <div className="grid-layout" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', alignItems: 'center' }}>
          <div className="reveal-node">
            <span className="eyebrow">Corporate Profile</span>
            <h2 className="title-primary title-gradient">Mastery in Every Thread.</h2>
            <p className="body-large" style={{ marginBottom: '2.5rem' }}>
              For over two decades, Abdul Rahman Carpets has been the cornerstone of luxury textile engineering. We provide organized catalogs, meticulous production metrics, and seamless collaboration for world-class architectural projects.
            </p>
            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-solid)', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-pure)', marginBottom: '0.25rem' }}>Unparalleled Quality</h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-body)' }}>Sourcing only certified premium wool blends and performance silks.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-solid)', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-pure)', marginBottom: '0.25rem' }}>Direct Collaboration</h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-body)' }}>Real-time production communication eliminating middle-tier friction.</p>
                </div>
              </div>
            </div>
            <Link href="/collections" className="btn-elegant">View Standards</Link>
          </div>
          <div className="reveal-node" style={{ position: 'relative' }}>
            <div className="image-showcase" style={{ aspectRatio: '4/3' }}>
              <img src="/images/carpet_06.jpg" alt="Corporate Overview" />
            </div>
          </div>
        </div>
      </section>

      {/* Curated Carpet Collections Gallery Preview */}
      <section id="collections-preview" className="redesign-section" style={{ background: 'var(--bg-secondary)' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }} className="reveal-node">
          <span className="eyebrow">Organized Catalog</span>
          <h2 className="title-primary">Featured Collections</h2>
          <p className="body-large" style={{ margin: '0 auto' }}>Explore an excerpt of our premium, high-density offerings explicitly tailored for architectural layouts.</p>
        </div>

        <div className="gallery-grid">
          <div className="image-showcase reveal-node">
            <img src="/images/carpet_01.jpg" alt="The Contemporary Line" />
            <div className="image-showcase-content">
              <span style={{ color: 'var(--accent-solid)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Premium Catalog</span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: '600', margin: '0.5rem 0' }}>The Contemporary Line</h3>
              <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)' }}>Streamlined modern geometry met with resilient structural backings.</p>
            </div>
          </div>

          <div className="image-showcase reveal-node" style={{ transform: 'translateY(40px)' }}>
            <img src="/images/carpet_02.jpg" alt="Hospitality Collection" />
            <div className="image-showcase-content">
              <span style={{ color: 'var(--accent-solid)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>High Traffic Standard</span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: '600', margin: '0.5rem 0' }}>Hospitality Series</h3>
              <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)' }}>Specially treated structures constructed to mitigate frictional wear.</p>
            </div>
          </div>

          <div className="image-showcase reveal-node">
            <img src="/images/carpet_03.jpg" alt="Heritage Masterworks" />
            <div className="image-showcase-content">
              <span style={{ color: 'var(--accent-solid)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Artisanal Masterpiece</span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: '600', margin: '0.5rem 0' }}>Heritage Masterworks</h3>
              <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)' }}>Meticulously constructed hand-knotted arrays featuring high-density distributions.</p>
            </div>
          </div>
        </div>

        <div className="reveal-node" style={{ textAlign: 'center', marginTop: '6rem' }}>
          <Link href="/products/all" className="btn-elegant">View Full Catalog</Link>
        </div>
      </section>

      {/* Core Services Overview */}
      <section id="services-ecosystem" className="redesign-section" style={{ background: 'var(--bg-page)' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }} className="reveal-node">
          <span className="eyebrow">Operational Focus</span>
          <h2 className="title-primary">End-to-End Solutions</h2>
          <p className="body-large" style={{ margin: '0 auto' }}>Comprehensive enterprise support from inception to final staging.</p>
        </div>

        <div className="grid-layout" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          <div className="glass-panel mobile-scroll-target reveal-node">
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--accent-solid)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: '600', color: 'var(--text-pure)', marginBottom: '1rem' }}>Custom Manufacturing</h3>
            <p style={{ color: 'var(--text-body)', fontSize: '1rem', lineHeight: '1.6' }}>Modifying density metrics, pile dimensions, color matching, and yarn selections exactly to client architectural drawings.</p>
          </div>

          <div className="glass-panel mobile-scroll-target reveal-node">
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--accent-solid)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: '600', color: 'var(--text-pure)', marginBottom: '1rem' }}>Design Consultation</h3>
            <p style={{ color: 'var(--text-body)', fontSize: '1rem', lineHeight: '1.6' }}>Collaborative layout audits delivering structural rendering mockups to align seamlessly with spatial requirements.</p>
          </div>

          <div className="glass-panel mobile-scroll-target reveal-node">
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--accent-solid)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: '600', color: 'var(--text-pure)', marginBottom: '1rem' }}>Bulk Orders &amp; Export</h3>
            <p style={{ color: 'var(--text-body)', fontSize: '1rem', lineHeight: '1.6' }}>A streamlined fulfillment pipeline prepared to execute expansive hospitality assignments with strict protective shipping protocols.</p>
          </div>
        </div>
      </section>

      {/* Manufacturing Process & Industries Served */}
      <section id="manufacturing-lifecycle" className="redesign-section" style={{ background: 'var(--bg-cards)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="grid-layout" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', alignItems: 'center' }}>
          <div>
            <span className="eyebrow">Process Lifecycle</span>
            <h2 className="title-primary">Traceable Craftsmanship</h2>

            <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ paddingLeft: '2rem', borderLeft: '2px solid var(--accent-solid)', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-6px', top: '0', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent-solid)' }}></div>
                <h4 style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '0.5rem' }}>PHASE 01</h4>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-pure)', fontWeight: '600', marginBottom: '0.5rem' }}>Yarn Selection</h3>
                <p style={{ color: 'var(--text-body)', fontSize: '0.95rem' }}>Sourcing certified premium wool blends and pristine architectural performance silks.</p>
              </div>
              <div style={{ paddingLeft: '2rem', borderLeft: '2px solid var(--accent-solid)', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-6px', top: '0', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent-solid)' }}></div>
                <h4 style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '0.5rem' }}>PHASE 02</h4>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-pure)', fontWeight: '600', marginBottom: '0.5rem' }}>Weaving Execution</h3>
                <p style={{ color: 'var(--text-body)', fontSize: '0.95rem' }}>Deploying high-precision contract power looms or expert traditional hand-knotting sequences.</p>
              </div>
              <div style={{ paddingLeft: '2rem', borderLeft: '2px solid transparent', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-6px', top: '0', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent-solid)' }}></div>
                <h4 style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '0.5rem' }}>PHASE 03</h4>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-pure)', fontWeight: '600', marginBottom: '0.5rem' }}>Quality Assurance</h3>
                <p style={{ color: 'var(--text-body)', fontSize: '0.95rem' }}>Rigid tensile tests, pattern checking, and light stress validation cycles prior to packaging.</p>
              </div>
            </div>
          </div>

          <div className="reveal-node" style={{ background: 'var(--bg-secondary)', padding: '4rem', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
            <span className="eyebrow">Market Adaptability</span>
            <h2 className="title-primary" style={{ fontSize: '2rem' }}>Industries We Serve</h2>
            <p className="body-large" style={{ marginBottom: '2.5rem' }}>Our specialized infrastructure is trusted by leading commercial real estate and hospitality chains globally.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {['Luxury Hospitality & Resorts', 'Commercial Real Estate', 'High-End Residential', 'Interior Architecture Firms'].map((industry, i) => (
                <div key={i} style={{ padding: '1.25rem 1.5rem', background: 'var(--bg-cards)', borderRadius: '12px', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: '500', color: 'var(--text-pure)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-solid)" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  {industry}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section id="client-testimonials" className="redesign-section reveal-node" style={{ background: 'var(--bg-page)', textAlign: 'center' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', color: 'var(--accent-solid)' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
          </div>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontStyle: 'italic', fontWeight: '400', lineHeight: '1.5', color: 'var(--text-pure)', marginBottom: '3rem' }}>
            "The custom design accuracy and structural thickness achieved by Abdul Rahman Carpets transformed our grand ballroom installation completely."
          </h2>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', textAlign: 'left' }}>
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" alt="Elena Rousseau" style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }} />
            <div>
              <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-pure)' }}>Elena Rousseau</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Principal Design Partner, Global Contracts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call To Action Module */}
      <section id="cta-funnel" className="reveal-node" style={{ background: '#09090A', color: '#FFFFFF', padding: '120px 5%', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(196,160,84,0.1) 0%, transparent 60%)', filter: 'blur(40px)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>Ready to Elevate Your Space?</h2>
          <p style={{ fontSize: '1.15rem', color: '#A1A1AA', marginBottom: '3.5rem', lineHeight: '1.6' }}>
            Browse through our full premium texturized collection patterns or connect directly with our sales consultants for instantaneous custom evaluations.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/collections" className="btn-elegant">
              Browse Collection
            </Link>
            <Link href="https://wa.me/" className="btn-elegant" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.4)', color: '#fff' }}>
              Contact on WhatsApp
            </Link>
            <Link href="/contact_us" className="btn-elegant" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.4)', color: '#fff' }}>
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      <Footer scrollToSection={scrollToSection} />
    </>
  );
}