"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Filter, ChevronDown, Sparkles } from "lucide-react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

import { CarpetProduct, CARPET_CATALOGUE } from "../data";

export default function CollectionsPage() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Filter Consoles
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterMaterial, setFilterMaterial] = useState("All");
  const [filterStyle, setFilterStyle] = useState("All");
  const [filterAvailability, setFilterAvailability] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const [activeModalProduct, setActiveModalProduct] = useState<CarpetProduct | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScrollY } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(heroScrollY, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(heroScrollY, [0, 1], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.05 }
    );
    document.querySelectorAll(".reveal-node").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 1024) return;

    const mobileObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active-mobile-scroll");
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

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    else if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  //
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // Realtime Matching Pipeline
  const filteredProducts = CARPET_CATALOGUE.filter((product) => {
    //
    if (!searchQuery) {
      const matchesType = filterType === "All" || product.carpetType === filterType;
      const matchesMaterial = filterMaterial === "All" || product.material.includes(filterMaterial);
      const matchesStyle = filterStyle === "All" || product.designStyle === filterStyle;
      const matchesAvailability = filterAvailability === "All" || product.availability === filterAvailability;
      return matchesType && matchesMaterial && matchesStyle && matchesAvailability;
    }

    const cleanQuery = searchQuery.toLowerCase().trim();

    const matchesSearch =
      product.name.toLowerCase().includes(cleanQuery) ||
      product.collection.toLowerCase().includes(cleanQuery) ||
      product.material.toLowerCase().includes(cleanQuery);

    const matchesType = filterType === "All" || product.carpetType === filterType;
    const matchesMaterial = filterMaterial === "All" || product.material.includes(filterMaterial);
    const matchesStyle = filterStyle === "All" || product.designStyle === filterStyle;
    const matchesAvailability = filterAvailability === "All" || product.availability === filterAvailability;

    return matchesSearch && matchesType && matchesMaterial && matchesStyle && matchesAvailability;
  }).sort((a, b) => {
    if (sortBy === "latest") return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    if (sortBy === "popular") return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    if (sortBy === "alphabetical") return a.name.localeCompare(b.name);
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  return (
    <>
      <Navbar isScrolled={isScrolled}  scrollToSection={scrollToSection} />
      <div className="dot-matrix" />

      {/* 1 Hero Section */}
      <section ref={heroRef} className="wa-hero">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="wa-hero-bg">
          <div className="wa-hero-overlay-dark"></div>
          <div className="wa-hero-overlay-grad"></div>
          <img src="/images/carpet_best_01.jpg" alt="Curated Premium Hand-knotted Carpet" className="wa-hero-img" />
        </motion.div>

        <div className="wa-hero-content">
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0em" }}
            animate={{ opacity: 1, letterSpacing: "0.2em" }}
            transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
            className="wa-hero-tagline"
          >
            Curated Collections
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="wa-hero-title"
            style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.03em", fontWeight: 800 }}
          >
            The Pinnacle Of <br/> 
            <span className="wa-hero-title-gradient" style={{ fontWeight: 600 }}>Woven Elegance</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="wa-hero-desc"
            style={{ fontSize: "1.15rem", fontWeight: 300, letterSpacing: "0.02em" }}
          >
            Discover a carefully curated anthology of masterfully hand-knotted luxury carpets. Each piece represents months of meticulous craftsmanship, designed to elevate your architectural spaces with unparalleled texture and heritage.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="wa-scroll-indicator"
        >
          <span className="wa-scroll-text">Scroll Discover</span>
          <ArrowDown size={16} color="rgba(255,255,255,0.8)" />
        </motion.div>
      </section>

      <main className="collections-page-wrapper">
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

          {/* Filter Console Matrix Panel */}
          <form className="filter-panel-card reveal-node" onSubmit={handleSearchSubmit}>
            <div className="filter-search-box">
              <label className="luxury-select-label">Interactive Registry Search</label>
              <div style={{ position: "relative", width: "100%" }}>
                <input
                  type="text"
                  placeholder="Search by unique card name, production series collection, or specific fiber profiles..."
                  className="luxury-input-field"
                  style={{ paddingRight: searchQuery ? "40px" : "16px" }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear Search Input"
                    style={{
                      position: "absolute",
                      right: "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "transparent",
                      border: "none",
                      color: "var(--text-muted)",
                      cursor: "pointer",
                      fontSize: "14px",
                      padding: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "color 0.2s ease",
                      zIndex: 10
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "var(--accent-solid)"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <div className="filter-grid-matrix">
              <div>
                <label className="luxury-select-label">Weft Calibration</label>
                <select className="luxury-input-field" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                  <option value="All">All Frameworks</option>
                  <option value="Hand-Knotted">Hand-Knotted Architecture</option>
                  <option value="Hand-Tufted">Hand-Tufted Architecture</option>
                </select>
              </div>

              <div>
                <label className="luxury-select-label">Material Provenance</label>
                <select className="luxury-input-field" value={filterMaterial} onChange={(e) => setFilterMaterial(e.target.value)}>
                  <option value="All">All Sourced Compositions</option>
                  <option value="Elite New Zealand Wool & Bamboo Silk">New Zealand Wool &amp; Silk</option>
                  <option value="100% Organic Vat-Dyed Silk">Pure Organic Silk</option>
                  <option value="Premium Wool Blend with Tensile Core">Premium Wool Blend</option>
                </select>
              </div>

              <div>
                <label className="luxury-select-label">Design Aesthetic</label>
                <select className="luxury-input-field" value={filterStyle} onChange={(e) => setFilterStyle(e.target.value)}>
                  <option value="All">All Design Alignments</option>
                  <option value="Minimalist Modern">Minimalist Modern</option>
                  <option value="Traditional Classical">Traditional Classical</option>
                  <option value="Textured Contemporary">Textured Contemporary</option>
                </select>
              </div>

              <div>
                <label className="luxury-select-label">Allocation Threshold</label>
                <select className="luxury-input-field" value={filterAvailability} onChange={(e) => setFilterAvailability(e.target.value)}>
                  <option value="All">All Availability States</option>
                  <option value="In Stock">In Stock (Atelier)</option>
                  <option value="Bespoke Only">Bespoke Orders Only</option>
                </select>
              </div>

              <div>
                <label className="luxury-select-label">Sort Orchestration</label>
                <select className="luxury-input-field" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="featured">Featured Index</option>
                  <option value="latest">Latest Chronology</option>
                  <option value="popular">Popular Density</option>
                  <option value="alphabetical">Alphabetical Sequence</option>
                </select>
              </div>
            </div>
          </form>

          {/* Highend Product Cards Grid */}
          <div className="catalogue-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="ux-card mobile-scroll-target reveal-node">

                  <div className="product-image-frame">
                    <img src={product.images[0]} alt={product.name} loading="lazy" />
                    <span className="availability-badge">{product.availability}</span>
                  </div>

                  <div className="card-text-header">
                    <span className="card-collection-tag">{product.collection}</span>
                    <h3 className="card-product-title">{product.name}</h3>
                  </div>

                  <p className="card-product-desc">{product.description}</p>

                  <div className="card-specs-preview-list">
                    <span><strong>Dimensions Array:</strong> {product.sizes[0]} ({product.shape})</span>
                    <span><strong>Fiber Calibration:</strong> {product.material}</span>
                  </div>

                  <div className="card-actions-wrapper">
                    <button type="button" onClick={() => setActiveModalProduct(product)} className="ux-btn-secondary-ghost" style={{ flexGrow: 1 }}>
                      Specs Detail
                    </button>

                    <button type="button" onClick={() => scrollToSection("cta-funnel")} className="ux-btn-primary" style={{ flexGrow: 1 }}>
                      Get Quote
                    </button>

                    <a
                      href={`https://wa.me/9833644653?text=Hello%20Abdul%20Rahman%20Carpets%20Team,%20I%20am%20interested%20in%20obtaining%20information%20for%20the%20${encodeURIComponent(product.name)}%20model.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ux-btn-whatsapp-ghost"
                      title="WhatsApp Inquiry Pipeline"
                    >
                      <svg viewBox="0 0 24 24" style={{ width: "16px", height: "16px", fill: "currentColor" }}>
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.455L0 24zm6.59-4.846c1.66.986 3.292 1.482 4.809 1.483 5.479 0 9.936-4.436 9.939-9.886.002-2.64-1.019-5.123-2.877-6.981C16.662 1.91 14.184.88 11.55.88c-5.485 0-9.94 4.437-9.944 9.888-.002 1.78.471 3.515 1.371 5.019l-.993 3.63 3.731-.969z" />
                      </svg>
                    </a>
                  </div>

                </div>
              ))
            ) : (
              /* */
              <div className="empty-results-fallback">
                <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "center", width: "100%" }}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--accent-solid)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.75 }}>
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </div>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 600, color: "var(--text-pure)", margin: "0 0 0.5rem" }}>No Coordinates Matched</h3>
                <p className="empty-results-text">No active parameters match your query frame. Try refining your keywords or clearing the filter consoles.</p>
                <button type="button" onClick={() => { setSearchQuery(""); setFilterType("All"); setFilterMaterial("All"); setFilterStyle("All"); setFilterAvailability("All"); }} className="ux-btn-secondary-ghost" style={{ marginTop: "1.5rem", padding: "10px 20px" }}>Reset Active Filters</button>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* */}
      {activeModalProduct && (
        <div className="luxury-modal-overlay" onClick={() => setActiveModalProduct(null)}>
          <div className="luxury-modal-body" onClick={(e) => e.stopPropagation()}>

            <div className="modal-image-host">
              <img src={activeModalProduct.images[0]} alt={activeModalProduct.name} />
              <span className="availability-badge" style={{ top: "20px", right: "24px" }}>{activeModalProduct.availability}</span>
            </div>

            <div className="modal-content-details">
              <div className="modal-header-block">
                <span className="modal-collection-tag">{activeModalProduct.collection}</span>
                <h3 className="modal-product-title">{activeModalProduct.name}</h3>
              </div>

              <p className="modal-product-desc">{activeModalProduct.description}</p>

              <div className="modal-technical-specs-grid">
                <div><strong>Weft Calibration:</strong> <span className="modal-spec-label-value">{activeModalProduct.carpetType}</span></div>
                <div><strong>Fiber Profiling:</strong> <span className="modal-spec-label-value">{activeModalProduct.material}</span></div>
                <div><strong>Dimensional Array:</strong> <span className="modal-spec-label-value">{activeModalProduct.sizes.join(", ")}</span></div>
                <div><strong>Colorway Matrix:</strong> <span className="modal-spec-label-value">{activeModalProduct.colors.join(", ")}</span></div>
              </div>

              <div className="modal-action-footer-wrapper">
                <button type="button" onClick={() => setActiveModalProduct(null)} className="ux-btn-secondary-ghost" style={{ flex: 1 }}>
                  Close Specsheet
                </button>
                <a
                  href={`https://wa.me/9833644653?text=Hello%20AR%20Carpets%20Team,%20I%20am%20inquiring%20about%20the%20${encodeURIComponent(activeModalProduct.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ux-btn-primary"
                  style={{ flex: 1 }}
                >
                  Confirm WhatsApp Inquiry
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Action Funnel Block */}
      <section id="cta-funnel" className="cta-funnel-block reveal-node">
        <div className="cta-decorative-blur"></div>
        <div className="cta-content-layout">
          <h2 className="cta-headline-text">Initiate Technical Evaluation</h2>
          <p className="cta-editorial-subtext">
            Coordinate seamlessly with our internal loom technicians to customize structural contours, textures, and grid metrics.
          </p>
          <div className="cta-actions-flex">
            <a href="https://wa.me/9833644653" target="_blank" rel="noopener noreferrer" className="ux-btn-primary" style={{ textDecoration: "none" }}>Open WhatsApp Evaluation Channel</a>
          </div>
        </div>
      </section>

      <Footer scrollToSection={scrollToSection} />
    </>
  );
}