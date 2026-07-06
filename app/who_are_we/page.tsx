"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { useThemeContext } from '@/context/ThemeContext';

export default function WhoWeAre() {
  const { theme } = useThemeContext();
  //
  const [isScrolled, setIsScrolled] = useState<boolean>(false);


  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: timelineScrollY } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });
  const timelineHeight = useTransform(timelineScrollY, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' });
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Original Global Appearonscroll Fadein Animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal-node").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  //
  useEffect(() => {
    if (window.innerWidth >= 1024) return;

    const mobileObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active-mobile-scroll");
          } else {
            //
            entry.target.classList.remove("active-mobile-scroll");
          }
        });
      },
      {
        root: null, // Relative To Device Viewport
        rootMargin: "0px 0px -10% 0px", //
        threshold: 0.1, //
      }
    );

    document.querySelectorAll(".mobile-scroll-target").forEach((el) => mobileObserver.observe(el));
    return () => mobileObserver.disconnect();
  }, []);

  const stats = [
    { value: "1978", label: "Heritage Loomed" },
    { value: "50+", label: "Global Regions" },
    { value: "100%", label: "Artisanal Integrity" },
    { value: "Passed", label: "Quality Audits" },
  ];

  const coreValues = [
    { title: "Weft Precision", desc: "Uncompromising knot-density accuracy and structural calibration across every weave we produce." },
    { title: "Material Integrity", desc: "Complete supply chain transparency, sourcing elite New Zealand wools and fine organic silks." },
    { title: "Timeless Continuity", desc: "Preserving generation-old hand-knotting frameworks while mastering modern design translations." },
    { title: "Absolute Accountability", desc: "Every masterpiece carpet is traceable, verified, and signed off by the lead artisan." },
  ];

  const qualityStandards = [
    "Rigorous material analysis testing for supreme yarn tensile strength",
    "Zero-bleeding pigment fixation and premium organic vat dye consistency",
    "Multi-point knot density auditing matching historical preservation rules",
    "Hand-shearing finishes for impeccable pile alignment and tactile consistency",
  ];

  const milestones = [
    { year: "1978", title: "The First Loom", desc: "Established with a foundational mandate to preserve master-craft hand-knotted carpet weaving architectures." },
    { year: "2002", title: "Global Expansion", desc: "Recognized internationally for introducing complex technical patterns to global architectural hubs." },
    { year: "2026", title: "Modern Design Initiative", desc: "Merging high-fidelity contemporary aesthetics with traditional masterwork structural matrices." },
  ];

  const commitments = [
    { title: "Lifetime Tactile Security", desc: "Every bespoke carpet is loomed with materials designed to resist wear across structural generations." },
    { title: "Bespoke Design Consultancy", desc: "Direct collaboration with internal textile engineers to customize density, size, and fiber profiles." },
    { title: "Transparent Sourcing", desc: "Every creation ships with auditable material provenance certificates. Zero black boxes." },
  ];

  const galleryImages = [
    { src: "/images/carpet_01.jpg", alt: "Traditional hand-knotted premium carpet detail layout" },
    { src: "/images/carpet_02.jpg", alt: "Minimalist modern luxury geometric linear carpet pile" },
    { src: "/images/carpet_03.jpg", alt: "Authentic premium hand-woven rug knot details" },
    { src: "/images/carpet_04.jpg", alt: "Detailed macro view of artisan high-density wool weaves" },
    { src: "/images/carpet_05.jpg", alt: "High-end residential interior displaying custom design rug" },
    { src: "/images/carpet_06.jpg", alt: "Raw masterwork textile design yarn processing metrics" }
  ];

  return (
    <>
      <Navbar isScrolled={isScrolled} scrollToSection={scrollToSection} />
      <div className="dot-matrix" />

      <style dangerouslySetInnerHTML={{
        __html: `
        .ux-section {
          padding: 140px 5%;
          position: relative;
          z-index: 10;
        }
        
        .ux-section-title {
          font-size: clamp(3.5rem, 7vw, 5.5rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 0.95;
          margin-bottom: 2rem;
          color: var(--text-pure);
        }
        .ux-section-subtitle {
          font-size: 1.25rem;
          color: var(--text-body);
          max-width: 650px;
          line-height: 1.65;
          margin-bottom: 4rem;
        }
        
        /* Card Matrix Compositions */
        .ux-card {
          background: var(--bg-cards);
          border: 1px solid var(--border-subtle);
          border-radius: 16px;
          padding: 3.5rem 3rem;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .ux-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 100%; height: 4px;
          background: var(--accent-solid);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }

        /* Desktop Hover Matrix Interaction Layers */
        @media (min-width: 1024px) {
          .ux-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 24px 48px rgba(0,0,0,0.09);
            border-color: var(--accent-solid);
          }
          .ux-card:hover::before {
            transform: scaleX(1);
          }
        }

        /* */
        @media (max-width: 1023px) {
          .ux-card.active-mobile-scroll {
            animation: mobileBorderFlash 5s ease-in-out forwards;
          }
          .ux-card.active-mobile-scroll::before {
            animation: mobileBarFlash 5s ease-in-out forwards;
          }
        }

        @keyframes mobileBorderFlash {
          0% {
            border-color: var(--border-subtle);
            box-shadow: none;
            transform: translateY(0);
          }
          /* */
          6% {
            border-color: var(--accent-solid);
            box-shadow: 0 16px 32px rgba(0,0,0,0.08);
            transform: translateY(-4px);
          }
          /* */
          90% {
            border-color: var(--accent-solid);
            box-shadow: 0 16px 32px rgba(0,0,0,0.08);
            transform: translateY(-4px);
          }
          /* */
          100% {
            border-color: var(--border-subtle);
            box-shadow: none;
            transform: translateY(0);
          }
        }

        @keyframes mobileBarFlash {
          0% { transform: scaleX(0); }
          6% { transform: scaleX(1); }
          90% { transform: scaleX(1); }
          100% { transform: scaleX(0); }
        }

        .gradient-text {
          background: linear-gradient(180deg, var(--text-pure) 30%, var(--text-muted) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .tagline-mono {
          font-family: var(--font-mono, monospace);
          color: var(--accent-solid);
          font-weight: 600;
          letter-spacing: 5px;
          text-transform: uppercase;
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 0;
        }
        .tagline-mono::after {
          content: '';
          height: 1px;
          width: 24px;
          background: linear-gradient(to right, var(--accent-solid), transparent);
        }

        .card-number-callout {
          font-family: var(--font-mono, monospace);
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--text-muted);
          opacity: 0.4;
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
        }

        .ux-btn-primary {
          background: var(--accent-solid);
          color: #fff !important;
          padding: 18px 40px;
          border-radius: 4px;
          font-weight: 600;
          letter-spacing: 1px;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          font-size: 13px;
          text-transform: uppercase;
        }
        .ux-btn-primary:hover {
          background: var(--button-hover);
          color: var(--button-text-hover) !important;
          transform: translateY(-2px);
          box-shadow: 0 12px 24px var(--accent-glow);
        }

        .ux-step {
          position: relative;
          padding-left: 3rem;
          padding-bottom: 3rem;
          border-left: 2px solid var(--border-subtle);
        }
        .ux-step::before {
          content: '';
          position: absolute;
          left: -11px;
          top: 0;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--bg-page);
          border: 4px solid var(--accent-solid);
        }
        .ux-step:last-child {
          border-left-color: transparent;
          padding-bottom: 0;
        }

        .gallery-pinterest-board {
          column-count: 3;
          column-gap: 24px;
          width: 100%;
        }
        .pinterest-item {
          break-inside: avoid;
          margin-bottom: 24px;
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--border-subtle);
          background: var(--bg-cards);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease;
          display: block;
        }
        .pinterest-item img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
          transition: transform 0.8s ease;
        }
        .pinterest-item:hover {
          border-color: var(--accent-solid);
          box-shadow: 0 24px 48px rgba(0,0,0,0.18);
          transform: translateY(-6px);
        }
        .pinterest-item:hover img {
          transform: scale(1.04);
        }

        @media (max-width: 1024px) {
          .gallery-pinterest-board { column-count: 2; }
        }
        @media (max-width: 640px) {
          .gallery-pinterest-board { 
            column-count: 2; 
            column-gap: 12px;
          }
          .pinterest-item {
            margin-bottom: 12px;
            border-radius: 12px;
          }
          /* */
          .ux-section {
            padding: 80px 5% !important;
          }
          .ux-section-title {
            font-size: 2.2rem !important;
            margin-bottom: 1.5rem !important;
          }
          .ux-section-subtitle {
            font-size: 1rem !important;
            margin-bottom: 2rem !important;
          }
          .ux-card {
            padding: 1.75rem 1.25rem !important;
            border-radius: 16px !important;
            gap: 1rem !important;
          }
          .ux-card h2 {
            font-size: 1.6rem !important;
          }
          .ux-card h3 {
            font-size: 1.3rem !important;
          }
          .ux-card p {
            font-size: 0.95rem !important;
            line-height: 1.6 !important;
          }
          /* */
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
        
        /* Split Hero Css */
        .split-hero-container {
          display: flex;
          width: 100%;
          height: 100vh;
          position: relative;
          background: var(--bg-page);
          overflow: hidden;
        }

        .split-hero-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 5% 0 10%;
          position: relative;
          z-index: 10;
        }

        .split-hero-right {
          flex: 1;
          display: flex;
          gap: 20px;
          overflow: hidden;
          position: relative;
          padding: 20px;
          background: var(--bg-secondary);
          mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
        }

        .marquee-column {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .marquee-track-up {
          display: flex;
          flex-direction: column;
          gap: 20px;
          animation: scrollUp 25s linear infinite;
        }

        .marquee-track-down {
          display: flex;
          flex-direction: column;
          gap: 20px;
          animation: scrollDown 25s linear infinite;
        }

        .marquee-item {
          width: 100%;
          aspect-ratio: 3/4;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 12px 32px rgba(0,0,0,0.08);
          position: relative;
        }

        .marquee-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(calc(-50% - 10px)); }
        }

        @keyframes scrollDown {
          0% { transform: translateY(calc(-50% - 10px)); }
          100% { transform: translateY(0); }
        }

        @media (max-width: 968px) {
          .split-hero-container {
            justify-content: center;
            align-items: center;
            background: #0a0a0a !important; /* */
          }
          .split-hero-right {
            position: absolute !important;
            top: 0;
            left: 0;
            width: 100% !important;
            height: 100vh !important;
            padding: 10px !important;
            z-index: 1;
            opacity: 0.35;
            background: transparent !important;
          }
          .split-hero-left {
            position: relative;
            z-index: 10;
            padding: 0 5% !important;
            align-items: center;
            text-align: center;
          }
          .split-hero-left h1 {
            font-size: clamp(2.8rem, 10vw, 4rem) !important;
            color: #ffffff !important;
            text-shadow: 0 4px 24px rgba(0,0,0,0.8);
          }
          .split-hero-left p {
            color: #eaeaea !important;
            font-size: 1.05rem !important;
            text-shadow: 0 2px 12px rgba(0,0,0,0.8);
          }
          .split-hero-left .tagline-mono {
            color: var(--accent-solid) !important;
            justify-content: center !important;
            text-shadow: 0 2px 12px rgba(0,0,0,0.8);
          }
          .wa-hero-title-gradient {
            background: linear-gradient(180deg, var(--accent-solid) 0%, #ffffff 100%) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
          }
        }
      `}} />

      <main style={{ position: "relative", zIndex: 2, overflow: "hidden", paddingTop: "0" }}>

        {/* Woven Mosaic Split Hero */}
        <section className="split-hero-container">
          <div className="split-hero-left">
            <motion.span
              initial={{ opacity: 0, letterSpacing: "0em" }}
              animate={{ opacity: 1, letterSpacing: "0.2em" }}
              transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
              className="tagline-mono"
              style={{ justifyContent: 'flex-start', marginBottom: '1.5rem', fontSize: '0.85rem' }}
            >
              Corporate Provenance
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)", fontFamily: "var(--font-sans)", letterSpacing: "-0.03em", fontWeight: 800, lineHeight: 1.1, marginBottom: "1.5rem", color: "var(--text-pure)" }}
            >
              We weave what <br />
              <span className="wa-hero-title-gradient" style={{ fontWeight: 600, background: "linear-gradient(180deg, var(--accent-solid) 0%, var(--text-muted) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>others imagine.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{ fontSize: "1.15rem", fontWeight: 300, letterSpacing: "0.02em", color: "var(--text-body)", lineHeight: 1.6, maxWidth: "600px" }}
            >
              Abdul Rahman Carpets is a fine textile engineering studio crafting high-fidelity hand-loomed architectures and masterpiece rugs for global venues that request structural absolute perfection.
            </motion.p>
          </div>

          <div className="split-hero-right">
            <div className="marquee-column">
              <div className="marquee-track-up">
                {[...galleryImages, ...galleryImages].map((img, i) => (
                  <div key={`col1-${i}`} className="marquee-item">
                    <img src={img.src} alt={img.alt} />
                  </div>
                ))}
              </div>
            </div>

            <div className="marquee-column" style={{ marginTop: "-20%" }}>
              <div className="marquee-track-down">
                {[...galleryImages.slice().reverse(), ...galleryImages.slice().reverse()].map((img, i) => (
                  <div key={`col2-${i}`} className="marquee-item">
                    <img src={img.src} alt={img.alt} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Matrix */}
        <section className="ux-section reveal-node is-visible" style={{ paddingBottom: "0px", paddingTop: "40px" }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', maxWidth: '1400px', margin: '0 auto' }}>
            {stats.map((s) => (
              <div className="ux-card mobile-scroll-target" key={s.label} style={{ textAlign: 'center', padding: '2.5rem' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent-solid)', fontFamily: 'var(--font-mono, monospace)', display: 'block', marginBottom: '6px' }}>{s.value}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1.5px' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Company Introduction & Floating Image */}
        <section className="ux-section reveal-node">
          <div className="ux-card mobile-scroll-target" style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <span className="tagline-mono">Introduction Blueprint</span>
              <h2 style={{ fontSize: '2.5rem', color: 'var(--text-pure)', marginBottom: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Decades of Measured Operational Rigor</h2>
              <p style={{ color: 'var(--text-body)', fontSize: '1.15rem', lineHeight: 1.8, margin: '0' }}>
                Abdul Rahman Carpets is constructed upon a singular operational standard: luxury textile density must be calculated, not guessed. From our foundational loom blueprints to our international contract logistics layers, we work at the cross-section of manufacturing discipline and timeless artistic canvas architecture—shipping creations prepared to perform for generations.
              </p>
            </div>

            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              style={{ borderRadius: "20px", overflow: "hidden", aspectRatio: "4/3", border: "1px solid var(--border-subtle)", boxShadow: "0 24px 48px rgba(0,0,0,0.12)" }}
            >
              <img
                src="/images/carpet_01.jpg"
                alt="Abdul Rahman Carpets premium loom installation master layout"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision Box Diptych */}
        <section id="core-philosophy" className="ux-section reveal-node" style={{ paddingTop: "0px" }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', maxWidth: '1400px', margin: '0 auto' }}>

            <div className="ux-card mobile-scroll-target">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span className="tagline-mono">The Mandate</span>
                <span className="card-number-callout">// 01</span>
                </div>
                  <h3 style={{ fontSize: '1.8rem', color: 'var(--text-pure)', fontWeight: 700, letterSpacing: '-0.02em', margin: '0' }}>Mission Statement</h3>
                  <p style={{ color: 'var(--text-body)', fontSize: '1.05rem', lineHeight: 1.7, margin: '0' }}>To hand-loom scalable, elite-tier artistic textiles and custom rugs that transform high-end spatial venues into environments of monumental balance, heritage status, and prestige comfort.</p>
              </div>

              <div className="ux-card mobile-scroll-target">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span className="tagline-mono">The Horizon</span>
                  <span className="card-number-callout">// 02</span>
                  </div>
                    <h3 style={{ fontSize: '1.8rem', color: 'var(--text-pure)', fontWeight: 700, letterSpacing: '-0.02em', margin: '0' }}>Vision Statement</h3>
                    <p style={{ color: 'var(--text-body)', fontSize: '1.05rem', lineHeight: 1.7, margin: '0' }}>To set the definitive architectural standard for global luxury textile sourcing, where absolute tracking transparency, thread purity calibration, and fine knot-weaving fidelity converge flawlessly.</p>
                </div>

              </div>
            </section>

            {/* Business Philosophy Creed */}
            <section className="ux-section reveal-node" style={{ paddingTop: "0px" }}>
              <div className="ux-card mobile-scroll-target" style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center', padding: '5.5rem 3rem', background: 'var(--bg-secondary)', gap: '1.5rem' }}>
                <span className="tagline-mono" style={{ justifyContent: 'center' }}>Our Underlying Creed</span>
                <p className="gradient-text" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, lineHeight: 1.3, maxWidth: '1000px', margin: '0 auto' }}>
                  "True spatial luxury flourishes at the precise nexus of organic textile engineering metrics and structural architectural alignment."
                </p>
              </div>
            </section>

            {/* Core Values Bar */}
            <section className="ux-section reveal-node" style={{ paddingTop: "0px" }}>
              <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <div style={{ marginBottom: "3.5rem" }}>
                  <span className="tagline-mono">Internal Directives</span>
                  <h2 className="ux-section-title" style={{ fontSize: '3rem' }}>Core Values</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                  {coreValues.map((v) => (
                    <div className="ux-card mobile-scroll-target" key={v.title} style={{ padding: '2.5rem' }}>
                      <h3 style={{ fontSize: '1.35rem', color: 'var(--text-pure)', fontWeight: 700, margin: '0' }}>{v.title}</h3>
                      <p style={{ color: 'var(--text-body)', fontSize: '0.95rem', lineHeight: 1.65, margin: '0' }}>{v.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Manufacturing Expertise & Quality Matrix */}
            <section id="industrial-precision" className="ux-section reveal-node" style={{ paddingTop: "0px" }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px', maxWidth: '1400px', margin: '0 auto' }}>

                <div className="ux-card mobile-scroll-target" style={{ justifyContent: 'center' }}>
                  <span className="tagline-mono">Industrial Mastery</span>
                  <h2 style={{ fontSize: '2.5rem', color: 'var(--text-pure)', fontWeight: 700, margin: '0' }}>Manufacturing Expertise</h2>
                  <p style={{ color: 'var(--text-body)', fontSize: '1.05rem', lineHeight: 1.75, margin: '0' }}>
                    Our micro-weaving production pipelines enforce strict performance thresholds—from executing precise dye vat spectrum calculations to managing warp-and-weft balance parameters across complex architectural site dimensions.
                  </p>
                </div>

                <div className="ux-card mobile-scroll-target" style={{ background: 'var(--bg-secondary)' }}>
                  <span className="tagline-mono">Verification Architecture</span>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--text-pure)', fontWeight: 700, margin: '0' }}>Quality Standards</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {qualityStandards.map((q) => (
                      <div key={q} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <span style={{ color: 'var(--accent-solid)', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>✓</span>
                        <span style={{ color: 'var(--text-body)', fontSize: '1rem', lineHeight: 1.5 }}>{q}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </section>

            {/* Customer Commitment Module */}
            <section className="ux-section reveal-node" style={{ paddingTop: "0px" }}>
              <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <div style={{ marginBottom: "3.5rem" }}>
                  <span className="tagline-mono">Transactional Assurances</span>
                  <h2 className="ux-section-title" style={{ fontSize: '3rem' }}>Customer Commitment</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                  {commitments.map((c) => (
                    <div className="ux-card mobile-scroll-target" key={c.title} style={{ borderLeft: '4px solid var(--accent-solid)', padding: '2.5rem' }}>
                      <h3 style={{ fontSize: '1.35rem', color: 'var(--text-pure)', fontWeight: 700, margin: '0' }}>{c.title}</h3>
                      <p style={{ color: 'var(--text-body)', fontSize: '1rem', lineHeight: 1.6, margin: '0' }}>{c.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Company History & Milestones */}
            <section id="company-provenance" className="ux-section reveal-node" style={{ paddingTop: "0px" }}>
              <div className="ux-card mobile-scroll-target" style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <span className="tagline-mono">Chronology</span>
                <h2 className="ux-section-title" style={{ fontSize: '3rem', marginBottom: '4.5rem' }}>Milestones Ledger</h2>

                <div ref={timelineRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column', paddingLeft: '2rem' }}>
                  {/* Animated Timeline Line */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      left: '0px',
                      top: '0px',
                      width: '4px',
                      height: timelineHeight,
                      background: 'var(--accent-solid)',
                      borderRadius: '4px',
                      zIndex: 2
                    }}
                  />
                  {/* Background Line */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '0px',
                      top: '0px',
                      width: '4px',
                      height: '100%',
                      background: 'var(--border-subtle)',
                      borderRadius: '4px',
                      zIndex: 1
                    }}
                  />

                  {milestones.map((m) => (
                    <div className="ux-step" key={m.year} style={{ borderLeft: 'none', paddingLeft: '2rem' }}>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      >
                        {/* */}
                        <div style={{
                          position: 'absolute',
                          left: '-29px',
                          top: '0',
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: 'var(--bg-page)',
                          border: '4px solid var(--accent-solid)',
                          zIndex: 3
                        }} />

                        <h4 style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-solid)', fontSize: '1.25rem', marginBottom: '0.35rem', fontWeight: 600 }}>{m.year}</h4>
                        <h3 style={{ fontSize: '1.4rem', color: 'var(--text-pure)', marginBottom: '0.5rem', fontWeight: 700 }}>{m.title}</h3>
                        <p style={{ color: 'var(--text-body)', fontSize: '1rem', maxWidth: '850px', lineHeight: 1.65, margin: '0' }}>{m.desc}</p>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Masonry Pinterest Gallery */}
            <section className="ux-section reveal-node" style={{ paddingTop: "0px" }}>
              <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <div style={{ marginBottom: "4rem" }}>
                  <span className="tagline-mono">Visual Dossier</span>
                  <h2 className="ux-section-title" style={{ fontSize: '3rem' }}>The Atelier & Weaving Ecosystem</h2>
                </div>

                <div className="gallery-pinterest-board">
                  {galleryImages.map((img, idx) => (
                    <div key={idx} className="pinterest-item">
                      <img src={img.src} alt={img.alt} loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Action Partnership Funnel Deck */}
            <section className="ux-section reveal-node" style={{ paddingBottom: "120px" }}>
              <div className="ux-card mobile-scroll-target" style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center', padding: '6rem 2rem', position: 'relative', overflow: 'hidden', gap: '1.5rem' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(196,160,84,0.08) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }}></div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1.5rem', color: 'var(--text-pure)' }}>Initialize a Custom Commission</h2>
                  <p style={{ fontSize: '1.15rem', color: 'var(--text-body)', marginBottom: '3.5rem', lineHeight: 1.65, maxWidth: '650px', margin: '0 auto 3.5rem' }}>
                    Coordinate seamlessly with our internal loom technicians to custom render pile textures, materials, and canvas contours.
                  </p>
                  <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
                    <a href="/services" className="ux-btn-primary" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}>Our Services</a>
                    <a href="/contact" className="ux-btn-primary" style={{ textDecoration: "none", background: "transparent", border: "1px solid var(--text-pure)", color: "var(--text-pure) !important" }}>Contact Hub</a>
                    <a
                      href="https://wa.me/9833644653?text=Hello%20Abdul%20Rahman%20Carpets%20Team,%20I%20am%20interested%20in%20commissioning%20a%20custom%20high-density%20carpet."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ux-btn-primary"
                      style={{ textDecoration: "none", background: "transparent", borderColor: "var(--accent-solid)", color: "var(--accent-solid) !important", display: "flex", gap: "8px", alignItems: "center" }}
                    >
                      <svg viewBox="0 0 24 24" style={{ width: "16px", height: "16px", fill: "currentColor" }}>
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.455L0 24zm6.59-4.846c1.66.986 3.292 1.482 4.809 1.483 5.479 0 9.936-4.436 9.939-9.886.002-2.64-1.019-5.123-2.877-6.981C16.662 1.91 14.184.88 11.55.88c-5.485 0-9.94 4.437-9.944 9.888-.002 1.78.471 3.515 1.371 5.019l-.993 3.63 3.731-.969z" />
                      </svg>
                      WhatsApp Inquiry
                    </a>
                  </div>
                </div>
              </div>
            </section>

          </main>

          <Footer scrollToSection={scrollToSection} />
        </>
        );
}