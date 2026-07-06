"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

import { CarpetProduct, CARPET_CATALOGUE, CATEGORY_COVERS } from "../../data";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemReveal = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 70, damping: 15 } }
};

const pageFade = {
  initial: { opacity: 0, filter: "blur(10px)" },
  animate: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { opacity: 0, filter: "blur(10px)", transition: { duration: 0.4, ease: "easeIn" as const } }
};

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const routeId = params?.id as string;

  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeImage, setActiveImage] = useState("");

  //
  const [viewState, setViewState] = useState<'LANDING' | 'LIST' | 'DETAILS'>('LANDING');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<CarpetProduct | null>(null);

  // Form Fields Ledger Parameter State
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [customNotes, setClientNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const zoomViewportRef = useRef<HTMLDivElement>(null);
  const zoomImageRef = useRef<HTMLImageElement>(null);

  //
  useEffect(() => {
    if (!routeId || routeId === "all") {
      setViewState('LANDING');
      setActiveCategory(null);
      setSelectedProduct(null);
    } else if (["Contemporary", "Heritage", "Hospitality", "Bespoke"].includes(routeId)) {
      setViewState('LIST');
      setActiveCategory(routeId);
      setSelectedProduct(null);
    } else {
      const product = CARPET_CATALOGUE.find(p => p.id === routeId);
      if (product) {
        setSelectedProduct(product);
        setActiveCategory(product.category);
        setActiveImage(product.images[0]);
        setViewState('DETAILS');
      }
    }
  }, [routeId]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setSelectedSize(selectedProduct.sizes[0]);
      setSelectedColor(selectedProduct.colors[0]);
      setIsSubmitted(false);
    }
  }, [selectedProduct]);

  const updateRouteSegment = (targetSegment: string) => {
    router.push(`/products/${targetSegment}`);
  };

  const handleZoomMove = (gridEvent: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomViewportRef.current || !zoomImageRef.current || window.innerWidth < 1024) return;
    const { left, top, width, height } = zoomViewportRef.current.getBoundingClientRect();
    const x = ((gridEvent.clientX - left) / width) * 100;
    const y = ((gridEvent.clientY - top) / height) * 100;
    zoomImageRef.current.style.transformOrigin = `${x}% ${y}%`;
  };

  const generateWhatsAppUrl = () => {
    if (!selectedProduct) return "#";
    const message = `Hello Abdul Rahman Carpets Team, I am inquiring about the luxury model: ${selectedProduct.name}.\n\n` +
                    `• Selected Size: ${selectedSize}\n` +
                    `• Targeted Color: ${selectedColor}\n` +
                    (customNotes.trim() ? `• Custom Requirements: ${customNotes}` : "");
    return `https://wa.me/9833644653?text=${encodeURIComponent(message)}`;
  };

  const scrollToSection = (id: string) => {
    if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredProducts = CARPET_CATALOGUE.filter(p => p.category === activeCategory);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "var(--bg-page)" }}>
      <Navbar isScrolled={isScrolled}  scrollToSection={scrollToSection} />
      <div className="dot-matrix" />

      <div style={{ flexGrow: 1, width: "100%", clear: "both" }}>
        <main className="details-page-wrapper">
          
          {/* */}
          {viewState !== 'LANDING' && (
            <div style={{ marginBottom: "2.5rem", display: "flex", gap: "12px", alignItems: "center" }}>
              <button onClick={() => updateRouteSegment("all")} className="ux-btn-secondary-ghost" style={{ padding: "8px 16px", fontSize: "11px" }}>
                ✕ Reset to Categories
              </button>
              {viewState === 'DETAILS' && activeCategory && (
                <button onClick={() => updateRouteSegment(activeCategory)} className="ux-btn-secondary-ghost" style={{ padding: "8px 16px", fontSize: "11px" }}>
                  ← Return to {activeCategory} Line
                </button>
              )}
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* */}
            {viewState === 'LANDING' && (
              <motion.div key="landing" variants={pageFade} initial="initial" animate="animate" exit="exit" className="reveal-node is-visible">
              <motion.header 
                variants={staggerContainer} initial="hidden" animate="show"
                style={{ textAlign: "center", marginBottom: "4.5rem", marginTop: "1rem" }}
              >
                <motion.span variants={itemReveal} style={{ 
                  fontFamily: "var(--font-geist-mono)", 
                  display: "inline-block", 
                  marginBottom: "1.25rem", 
                  color: "var(--accent-solid)", 
                  letterSpacing: "0.3em", 
                  textTransform: "uppercase", 
                  fontSize: "0.8rem", 
                  fontWeight: 600 
                }}>
                  Atelier Vault Registry
                </motion.span>
                <motion.h1 variants={itemReveal} style={{ 
                  fontFamily: "var(--font-playfair), serif", 
                  fontSize: "clamp(2.8rem, 6vw, 4.5rem)", 
                  fontWeight: 400, 
                  margin: 0, 
                  color: "var(--text-pure)",
                  lineHeight: 1.1 
                }}>
                  Our Collections
                </motion.h1>
                <motion.p variants={itemReveal} style={{ 
                  color: "var(--text-muted)", 
                  marginTop: "1.25rem", 
                  fontSize: "1.1rem", 
                  maxWidth: "500px", 
                  margin: "1.25rem auto 0", 
                  lineHeight: 1.6 
                }}>
                  Discover our curated selection of masterful floor coverings, engineered to redefine spatial boundaries.
                </motion.p>
              </motion.header>
              
              <motion.div variants={staggerContainer} initial="hidden" animate="show" className="responsive-luxury-category-grid">
                {CATEGORY_COVERS.map((cat) => (
                  <motion.div 
                    key={cat.id} 
                    variants={itemReveal}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="ux-card collection-cover-node" 
                    onClick={() => { updateRouteSegment(cat.id); window.scrollTo(0,0); }}
                    style={{ cursor: "pointer", overflow: "hidden" }}
                  >
                    <motion.div className="product-image-frame" style={{ height: "100%", width: "100%" }}>
                      <motion.img 
                        whileHover={{ scale: 1.08 }} 
                        transition={{ duration: 0.6 }} 
                        src={cat.image} 
                        alt={cat.label} 
                        style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                      />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,14,16,0.95) 15%, rgba(0,0,0,0.1) 100%)", display: "flex", alignItems: "flex-end", padding: "clamp(16px, 4vw, 32px)", zIndex: 5 }}>
                        <h2 className="collection-cover-title">{cat.label}</h2>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* */}
          {viewState === 'LIST' && (
            <motion.div key="list" variants={pageFade} initial="initial" animate="animate" exit="exit" className="reveal-node is-visible">
              <div style={{ marginBottom: "3.5rem" }}>
                <span style={{ 
                  fontFamily: "var(--font-geist-mono)", 
                  display: "block", 
                  marginBottom: "0.5rem",
                  color: "var(--accent-solid)", 
                  letterSpacing: "0.2em", 
                  textTransform: "uppercase", 
                  fontSize: "0.8rem", 
                  fontWeight: 600 
                }}>
                  Atelier Line Allocation
                </span>
                <h1 style={{ 
                  fontFamily: "var(--font-playfair), serif", 
                  fontSize: "clamp(2.5rem, 5vw, 3.8rem)", 
                  margin: 0,
                  fontWeight: 400,
                  color: "var(--text-pure)",
                  lineHeight: 1.1
                }}>
                  {activeCategory} Compositions
                </h1>
              </div>
              
              <div className="catalogue-grid">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="ux-card mobile-scroll-target">
                    <div className="product-image-frame" style={{ aspectRatio: "4/3" }}>
                      <img src={product.images[0]} alt={product.name} />
                      <span className="availability-badge">{product.availability}</span>
                    </div>
                    <div className="card-text-header" style={{ marginTop: "1rem" }}>
                      <span className="card-collection-tag">{product.collection}</span>
                      <h3 className="card-product-title" style={{ fontSize: "1.35rem" }}>{product.name}</h3>
                    </div>
                    <button 
                      type="button"
                      className="ux-btn-primary" 
                      style={{ width: "100%", marginTop: "1rem" }}
                      onClick={() => { updateRouteSegment(product.id); window.scrollTo(0,0); }}
                    >
                      View Blueprint Registry
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* */}
          {viewState === 'DETAILS' && selectedProduct && (
            <motion.div key="details" variants={pageFade} initial="initial" animate="animate" exit="exit" className="reveal-node is-visible">
              <div className="details-grid-container">
                
                <div className="product-gallery-showcase">
                  <div 
                    className="main-zoom-viewport" 
                    ref={zoomViewportRef} 
                    onMouseMove={handleZoomMove}
                    onMouseLeave={() => { if(zoomImageRef.current) zoomImageRef.current.style.transformOrigin = "center center"; }}
                  >
                    <img ref={zoomImageRef} src={activeImage} alt={selectedProduct.name} />
                    <span className="availability-badge" style={{ top: "24px", right: "24px" }}>{selectedProduct.availability}</span>
                  </div>
                  
                  <div className="gallery-thumbnails-strip">
                    {selectedProduct.images.map((img, i) => (
                      <div 
                        key={i} 
                        className={`thumbnail-node ${activeImage === img ? "active-thumb" : ""}`} 
                        onClick={() => setActiveImage(img)}
                      >
                        <img src={img} alt="Spec Thumbnail Tile" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="details-content-panel">
                  <div className="specs-editorial-block">
                    <span className="specs-provenance-tag" style={{ color: "var(--accent-solid)", letterSpacing: "0.15em", textTransform: "uppercase", fontSize: "0.75rem", fontWeight: 600 }}>
                      {selectedProduct.collection}
                    </span>
                    <h1 className="specs-title-headline" style={{ fontFamily: "var(--font-playfair), serif", fontSize: "2.5rem", fontWeight: 400, margin: "0.5rem 0 1rem", lineHeight: 1.1 }}>
                      {selectedProduct.name}
                    </h1>
                    <span className="specs-availability-pill">{selectedProduct.carpetType}</span>
                  </div>

                  <p className="specs-core-description">{selectedProduct.description}</p>
                  
                  <div className="technical-properties-table">
                    <div className="property-row-node"><span className="property-label">Weft Architecture</span><span className="property-value">{selectedProduct.carpetType}</span></div>
                    <div className="property-row-node"><span className="property-label">Fiber Profile Calibration</span><span className="property-value">{selectedProduct.material}</span></div>
                    <div className="property-row-node"><span className="property-label">Design Alignment</span><span className="property-value">{selectedProduct.designStyle}</span></div>
                    <div className="property-row-node"><span className="property-label">Contour Shape</span><span className="property-value">{selectedProduct.shape}</span></div>
                  </div>

                  <div className="info-accordion-container">
                    <div className="accordion-tab-trigger" style={{ cursor: "default", borderBottom: "1px solid var(--border-subtle)" }}>Product Signature Features</div>
                    <div className="accordion-content-panel" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                      <ul>{selectedProduct.features.map((f, i) => <li key={i}>{f}</li>)}</ul>
                    </div>
                    <div className="accordion-tab-trigger" style={{ cursor: "default", borderBottom: "none" }}>Care &amp; Structural Maintenance</div>
                    <div className="accordion-content-panel">
                      <ul>{selectedProduct.careInstructions.map((c, i) => <li key={i}>{c}</li>)}</ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Highend Bespoke Quotation Intake Module */}
              <section className="details-inquiry-form-card">
                {!isSubmitted ? (
                  <>
                    <h2 style={{ color: "var(--text-pure)", fontWeight: 800, fontSize: "1.8rem", margin: 0, letterSpacing: "-0.01em" }}>Request Formal Quotation</h2>
                    <p style={{ color: "var(--text-muted)", margin: "4px 0 24px 0", fontSize: "14px" }}>Build your spec profile parameters directly to clear quotes seamlessly.</p>
                    
                    <div className="details-form-row-split">
                      <div>
                        <label className="luxury-select-label">Your Name</label>
                        <input type="text" placeholder="Enter name" className="luxury-input-field" value={clientName} onChange={(e) => setClientName(e.target.value)} />
                      </div>
                      <div>
                        <label className="luxury-select-label">Email Address</label>
                        <input type="email" placeholder="name@architectfirm.com" className="luxury-input-field" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
                      </div>
                    </div>
                    
                    <div className="details-form-row-split" style={{ marginTop: "1rem" }}>
                      <div>
                        <label className="luxury-select-label">Target Area Dimensional Footprint</label>
                        <select className="luxury-input-field" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                          {selectedProduct.sizes.map((sz, i) => <option key={i} value={sz}>{sz}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="luxury-select-label">Target Color Spectrum Way</label>
                        <select className="luxury-input-field" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                          {selectedProduct.colors.map((cl, i) => <option key={i} value={cl}>{cl}</option>)}
                        </select>
                      </div>
                    </div>

                    <div style={{ marginTop: "1rem" }}>
                      <label className="luxury-select-label">Bespoke Blueprint Design Notes</label>
                      <textarea placeholder="Provide specific customization requests or wall-to-wall architectural adjustments..." className="luxury-input-field" rows={4} style={{ resize: "none" }} value={customNotes} onChange={(e) => setClientNotes(e.target.value)} />
                    </div>

                    <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "1.5rem", flexWrap: "wrap" }}>
                      <a href={generateWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="ux-btn-secondary-ghost" style={{ gap: "8px" }}>
                        <svg viewBox="0 0 24 24" style={{ width: "16px", height: "16px", fill: "currentColor" }}>
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.455L0 24zm6.59-4.846c1.66.986 3.292 1.482 4.809 1.483 5.479 0 9.936-4.436 9.939-9.886.002-2.64-1.019-5.123-2.877-6.981C16.662 1.91 14.184.88 11.55.88c-5.485 0-9.94 4.437-9.944 9.888-.002 1.78.471 3.515 1.371 5.019l-.993 3.63 3.731-.969z"/>
                        </svg>
                        Forward Specs via WhatsApp
                      </a>
                      <button type="button" onClick={() => setIsSubmitted(true)} className="ux-btn-primary">
                        Submit Quotation Request
                      </button>
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign: "center", padding: "1rem 0" }}>
                    <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", color: "#10b981" }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </div>
                    <h2 style={{ color: "var(--text-pure)", fontWeight: 800, fontSize: "1.8rem", margin: "0 0 0.5rem", letterSpacing: "-0.01em" }}>Quotation Submitted</h2>
                    <p style={{ color: "var(--text-muted)", margin: "0 0 2rem 0", fontSize: "14px" }}>Your structural blueprint request has been logged successfully.</p>
                    
                    <div style={{ background: "var(--bg-page)", border: "1px solid var(--border-subtle)", borderRadius: "12px", padding: "1.5rem", textAlign: "left", display: "grid", gap: "12px", fontSize: "14px", maxWidth: "600px", margin: "0 auto" }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ color: "var(--text-pure)" }}>Client Name:</strong> <span style={{ color: "var(--text-body)", textAlign: "right" }}>{clientName || "N/A"}</span></div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ color: "var(--text-pure)" }}>Email Address:</strong> <span style={{ color: "var(--text-body)", textAlign: "right" }}>{clientEmail || "N/A"}</span></div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ color: "var(--text-pure)" }}>Model Specs:</strong> <span style={{ color: "var(--text-body)", textAlign: "right" }}>{selectedProduct.name}</span></div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ color: "var(--text-pure)" }}>Footprint:</strong> <span style={{ color: "var(--text-body)", textAlign: "right" }}>{selectedSize}</span></div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ color: "var(--text-pure)" }}>Colorway:</strong> <span style={{ color: "var(--text-body)", textAlign: "right" }}>{selectedColor}</span></div>
                      {customNotes && (
                        <div style={{ borderTop: "1px dashed var(--border-subtle)", paddingTop: "12px", marginTop: "4px" }}>
                          <strong style={{ color: "var(--text-pure)", display: "block", marginBottom: "8px" }}>Blueprint Notes:</strong>
                          <span style={{ color: "var(--text-body)", lineHeight: "1.6" }}>{customNotes}</span>
                        </div>
                      )}
                    </div>
                    
                    <button type="button" onClick={() => setIsSubmitted(false)} className="ux-btn-secondary-ghost" style={{ marginTop: "2.5rem" }}>
                      Submit Another Request
                    </button>
                  </div>
                )}
              </section>

              {/* Crossrouting Categories Vault Exploration */}
              <section className="related-showcase-section" style={{ marginTop: "80px" }}>
                <div style={{ marginBottom: "2.5rem" }}>
                  <span className="tagline-mono" style={{ display: "block", marginBottom: "0.5rem" }}>Atelier Vault Exploration</span>
                  <h2 style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--text-pure)", margin: 0, letterSpacing: "-0.01em" }}>More Categories to Explore</h2>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
                  {CATEGORY_COVERS.filter(cat => cat.id !== selectedProduct.category).map((cat) => (
                    <div 
                      key={cat.id} 
                      className="ux-card" 
                      style={{ padding: 0, cursor: "pointer", height: "220px", overflow: "hidden" }}
                      onClick={() => { updateRouteSegment(cat.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    >
                      <div className="product-image-frame" style={{ height: "100%", width: "100%", borderRadius: "16px" }}>
                        <img src={cat.image} alt={cat.label} />
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,14,16,0.9) 15%, transparent)", display: "flex", alignItems: "flex-end", padding: "24px", zIndex: 5 }}>
                          <h4 style={{ color: "#fff", fontSize: "1.15rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", margin: 0, textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>{cat.label}</h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}
          </AnimatePresence>

        </main>
      </div>

      {/* */}
      <style dangerouslySetInnerHTML={{__html: `
        .responsive-luxury-category-grid {
          display: grid;
          grid-template-columns: 1fr 1fr; /* Permanent 2X2 Grid Setup */
          gap: 24px;
          padding: 20px 0;
          max-width: 1200px;
          margin: 0 auto;
        }
        .collection-cover-node {
          padding: 0 !important;
          cursor: pointer;
          aspect-ratio: 4/3; /* Aesthetic Proportioning */
          height: auto;
          overflow: hidden;
          border-radius: 16px;
        }
        .collection-cover-title {
          color: #fff;
          font-family: var(--font-playfair), serif;
          font-size: 2.25rem;
          font-weight: 400;
          letter-spacing: 0.02em;
          margin: 0;
          text-shadow: 0 4px 16px rgba(0,0,0,0.8);
        }
        
        @media (max-width: 767px) {
          .responsive-luxury-category-grid {
            gap: 16px !important;
          }
          .collection-cover-node {
            aspect-ratio: 1/1 !important; /* */
            border-radius: 12px !important;
          }
          .collection-cover-title {
            font-size: 1.1rem !important;
            letter-spacing: 1px !important;
          }
        }
      `}} />

      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}