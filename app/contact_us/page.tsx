"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { useThemeContext } from "@/context/ThemeContext";

// Animation Variants
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 60, damping: 15 } }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 80, damping: 15 } }
};

const receiptVariant: Variants = {
  hidden: { opacity: 0, rotateX: 30, y: 40, scale: 0.9 },
  show: { opacity: 1, rotateX: 0, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 60, damping: 14 } }
};

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_REGISTRY: FAQItem[] = [
  {
    question: "What is your typical production timeframe for dynamic bespoke orders?",
    answer: "Bespoke projects are hand-knotted by master technicians on custom loom arrays. Production workflows usually balance between 12 to 16 weeks depending strictly on density parameters, line complications, and specified architectural matrix dimension arrays."
  },
  {
    question: "Do you offer direct commercial wall-to-wall scaling specifications?",
    answer: "Yes. Our hospitality enterprise team collaborates with global architecture networks to scale performance-tested, high-friction backing runs mapped specifically to commercial real estate code templates and superyacht floor profiles."
  },
  {
    question: "How do we verify fine weave traceability metrics?",
    answer: "Every masterwork carpet leaves our manufacturing terminal catalogued with an official signed provenance passport. This certificate traces material selection batches, knot volume counts, and the precise master signature origins."
  }
];

export default function ContactUsPage() {
  const { theme } = useThemeContext();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Faq Accordion State Management Engine
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Form Field State Parameters
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryOrigin, setCountryOrigin] = useState("");
  const [subjectTitle, setSubjectTitle] = useState("");
  const [clientMessage, setClientMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setFullName(""); setCompanyName(""); setEmailAddress(""); setPhoneNumber("");
    setCountryOrigin(""); setSubjectTitle(""); setClientMessage("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "var(--bg-page)" }}>
      <Navbar isScrolled={isScrolled}  scrollToSection={scrollToSection} />
      <div className="dot-matrix" />

      {/* */}
      <div style={{ flexGrow: 1, width: "100%", clear: "both" }}>
        <main className="contact-page-wrapper">

          {/* Editorial Section Header */}
          <motion.header variants={staggerContainer} initial="hidden" animate="show" style={{ textAlign: "center", marginBottom: "4rem" }}>
            <motion.span variants={fadeUp} className="tagline-mono" style={{ display: "block", marginBottom: "0.5rem" }}>Global Orchestration Inquiries</motion.span>
            <motion.h1 variants={fadeUp} className="gradient-text" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>Connect With Us</motion.h1>
          </motion.header>

          <div className="contact-split-grid">

            {/* */}
            <motion.div variants={staggerContainer} initial="hidden" animate="show" className="contact-info-cards-stack">
              <motion.div variants={fadeUp}>
                <h2 style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--text-pure)", margin: "0 0 8px 0" }}>Abdul Rahman Carpets</h2>
                <p style={{ color: "var(--text-body)", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>Corporate Headquarters & Global Specifications Studio Room.</p>
              </motion.div>

              <div className="contact-channels-matrix">
                {/* Office Address Card Block */}
                <motion.div variants={fadeUp} whileHover={{ y: -5, boxShadow: "0 12px 30px rgba(0,0,0,0.06)" }} whileTap={{ scale: 0.98 }} className="contact-node-card">
                  <div className="contact-node-icon-frame">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  </div>
                  <div>
                    <span className="contact-node-headline">Office Address</span>
                    <p className="contact-node-data">Suite 500, Industrial Hub Complex, Atlanta, GA 30120, USA</p>
                  </div>
                </motion.div>

                {/* Click To Call Node */}
                <motion.div variants={fadeUp} whileHover={{ y: -5, boxShadow: "0 12px 30px rgba(0,0,0,0.06)" }} whileTap={{ scale: 0.98 }} className="contact-node-card">
                  <div className="contact-node-icon-frame">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.79 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  </div>
                  <div>
                    <span className="contact-node-headline">Phone Line</span>
                    <p className="contact-node-data"><a href="tel:+15550192">+1 (555) 0192</a></p>
                  </div>
                </motion.div>

                {/* Click To Email Node */}
                <motion.div variants={fadeUp} whileHover={{ y: -5, boxShadow: "0 12px 30px rgba(0,0,0,0.06)" }} whileTap={{ scale: 0.98 }} className="contact-node-card">
                  <div className="contact-node-icon-frame">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  </div>
                  <div>
                    <span className="contact-node-headline">Communications Email</span>
                    <p className="contact-node-data"><a href="mailto:info@abdulrahmancarpets.com">info@abdulrahmancarpets.com</a></p>
                  </div>
                </motion.div>

                {/* Direct Whatsapp Action Node */}
                <motion.div variants={fadeUp} whileHover={{ y: -5, boxShadow: "0 12px 30px rgba(0,0,0,0.06)" }} whileTap={{ scale: 0.98 }} className="contact-node-card">
                  <div className="contact-node-icon-frame">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                  </div>
                  <div>
                    <span className="contact-node-headline">Atelier WhatsApp Network</span>
                    <p className="contact-node-data"><a href="https://wa.me/9833644653?text=Hello%20Team,%20I%20am%20inquiring%20about%20a%20new%20architectural%20rug%20project." target="_blank" rel="noopener noreferrer">Initiate WhatsApp Studio Chat</a></p>
                  </div>
                </motion.div>

                {/* Operating Business Hours Node */}
                <motion.div variants={fadeUp} whileHover={{ y: -5, boxShadow: "0 12px 30px rgba(0,0,0,0.06)" }} whileTap={{ scale: 0.98 }} className="contact-node-card">
                  <div className="contact-node-icon-frame">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  </div>
                  <div>
                    <span className="contact-node-headline">Studio Core Business Hours</span>
                    <p className="contact-node-data">Monday — Friday: 09:00 - 18:00 EST<br />Saturday: By Direct Appointment Only</p>
                  </div>
                </motion.div>
              </div>

              {/* */}
              <motion.div variants={scaleIn} className="google-maps-viewport-housing">
                <iframe
                  src="https://maps.google.com/maps?q=Atlanta,%20GA&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: theme === 'dark' ? 'grayscale(1) invert(90%) contrast(100%)' : 'none' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Abdul Rahman Carpets Spatial Headquarters"
                />
              </motion.div>
            </motion.div>

            {/* */}
            <div className="details-inquiry-form-card" style={{ marginTop: 0, overflow: "hidden" }}>
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form key="inquiry-form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }} exit={{ opacity: 0, x: -20, transition: { duration: 0.3 } }} onSubmit={handleFormSubmission}>
                    <div style={{ borderBottom: "1px solid var(--border-subtle)", paddingBottom: "1rem" }}>
                      <h2 style={{ fontSize: "1.6rem", color: "var(--text-pure)", margin: 0, fontWeight: 700 }}>Intake Matrix Form</h2>
                      <p style={{ color: "var(--text-body)", fontSize: "13px", margin: "4px 0 0 0" }}>Every configuration note logs directly onto our centralized loom orchestration desk.</p>
                    </div>

                    <div className="details-form-row-split" style={{ marginTop: "1rem" }}>
                      <div>
                        <label className="luxury-select-label">Full Name *</label>
                        <input type="text" required placeholder="Maulik Mhatre" className="luxury-input-field" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                      </div>
                      <div>
                        <label className="luxury-select-label">Company Name</label>
                        <input type="text" placeholder="Architecture Firm LLC" className="luxury-input-field" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                      </div>
                    </div>

                    <div className="details-form-row-split" style={{ marginTop: "1rem" }}>
                      <div>
                        <label className="luxury-select-label">Email Address *</label>
                        <input type="email" required placeholder="name@firm.com" className="luxury-input-field" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
                      </div>
                      <div>
                        <label className="luxury-select-label">Phone Number</label>
                        <input type="tel" placeholder="+1 (555) 0000" className="luxury-input-field" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                      </div>
                    </div>

                    <div style={{ marginTop: "1rem" }}>
                      <label className="luxury-select-label">Country / Origin Region *</label>
                      <input type="text" required placeholder="India" className="luxury-input-field" value={countryOrigin} onChange={(e) => setCountryOrigin(e.target.value)} />
                    </div>

                    <div style={{ marginTop: "1rem" }}>
                      <label className="luxury-select-label">Subject Line Portfolio *</label>
                      <input type="text" required placeholder="Bespoke Residential Contract Brief" className="luxury-input-field" value={subjectTitle} onChange={(e) => setSubjectTitle(e.target.value)} />
                    </div>

                    <div style={{ marginTop: "1rem" }}>
                      <label className="luxury-select-label">Specification Message Notes *</label>
                      <textarea required rows={5} placeholder="Provide structural dimensions, targeted weave parameters, pile thickness requests, or general partnership queries..." className="luxury-input-field" style={{ resize: "none" }} value={clientMessage} onChange={(e) => setClientMessage(e.target.value)} />
                    </div>

                    <button type="submit" className="ux-btn-primary" style={{ width: "100%", marginTop: "1.5rem" }}>
                      Submit Specification Inquiry
                    </button>
                  </motion.form>
                ) : (
                  <motion.div key="success-receipt" variants={receiptVariant} initial="hidden" animate="show" exit={{ opacity: 0, scale: 0.9 }} style={{ textAlign: "center", padding: "2rem 1rem", perspective: "1000px" }}>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                      style={{ width: "80px", height: "80px", borderRadius: "50%", background: "linear-gradient(135deg, var(--accent-solid), rgba(197, 160, 89, 0.4))", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", color: "#fff", boxShadow: "0 10px 30px rgba(197, 160, 89, 0.3)" }}
                    >
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.4 }} d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></motion.path><motion.polyline initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.8 }} points="22 4 12 14.01 9 11.01"></motion.polyline></svg>
                    </motion.div>
                    <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ fontFamily: "var(--font-playfair), serif", color: "var(--text-pure)", fontWeight: 400, fontSize: "2.6rem", margin: "0 0 0.5rem", lineHeight: 1.1 }}>Inquiry Logged</motion.h2>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} style={{ color: "var(--text-muted)", margin: "0 0 2rem 0", fontSize: "1.1rem" }}>Your structural blueprint request has been successfully securely transmitted.</motion.p>

                    <div style={{ background: "var(--bg-secondary)", border: "1px solid rgba(197, 160, 89, 0.3)", borderRadius: "16px", padding: "2rem", textAlign: "left", display: "grid", gap: "16px", fontSize: "1.1rem", margin: "0 auto", boxShadow: "0 20px 40px rgba(0,0,0,0.08)", backdropFilter: "blur(10px)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px dashed var(--border-subtle)", paddingBottom: "12px" }}><strong style={{ color: "var(--text-pure)", fontWeight: 600 }}>Full Name:</strong> <span style={{ color: "var(--text-body)", textAlign: "right" }}>{fullName}</span></div>
                      {companyName && <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px dashed var(--border-subtle)", paddingBottom: "12px" }}><strong style={{ color: "var(--text-pure)", fontWeight: 600 }}>Company:</strong> <span style={{ color: "var(--text-body)", textAlign: "right" }}>{companyName}</span></div>}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px dashed var(--border-subtle)", paddingBottom: "12px" }}><strong style={{ color: "var(--text-pure)", fontWeight: 600 }}>Email Address:</strong> <span style={{ color: "var(--text-body)", textAlign: "right", wordBreak: "break-all", maxWidth: "60%" }}>{emailAddress}</span></div>
                      {phoneNumber && <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px dashed var(--border-subtle)", paddingBottom: "12px" }}><strong style={{ color: "var(--text-pure)", fontWeight: 600 }}>Phone:</strong> <span style={{ color: "var(--text-body)", textAlign: "right" }}>{phoneNumber}</span></div>}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px dashed var(--border-subtle)", paddingBottom: "12px" }}><strong style={{ color: "var(--text-pure)", fontWeight: 600 }}>Region:</strong> <span style={{ color: "var(--text-body)", textAlign: "right" }}>{countryOrigin}</span></div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><strong style={{ color: "var(--text-pure)", fontWeight: 600 }}>Subject:</strong> <span style={{ color: "var(--text-body)", textAlign: "right" }}>{subjectTitle}</span></div>
                      {clientMessage && (
                        <div style={{ borderTop: "1px dashed var(--border-subtle)", paddingTop: "20px", marginTop: "4px" }}>
                          <strong style={{ color: "var(--text-pure)", display: "block", marginBottom: "12px", fontWeight: 600 }}>Specification Notes:</strong>
                          <span style={{ color: "var(--text-body)", lineHeight: "1.7", display: "block", fontSize: "1.05rem" }}>{clientMessage}</span>
                        </div>
                      )}
                    </div>

                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="button" onClick={handleResetForm} className="ux-btn-primary" style={{ marginTop: "3rem", padding: "16px 48px", fontSize: "1.1rem" }}>
                      OK, Refresh Form
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Section 3: Frequently Asked Questions */}
          {/* */}
          <section className="faq-section">
            <div className="faq-header">
              <h2 className="faq-main-title">Frequently Asked Questions</h2>
            </div>
            <div className="faq-accordion-container">
              {FAQ_REGISTRY.map((faq, index) => (
                <details key={index} className="faq-item">
                  <summary className="faq-trigger">
                    <span className="faq-question">{faq.question}</span>
                    <div className="faq-arrow-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" fill="none" viewBox="0 0 12 8">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 5 5 5-5" />
                      </svg>
                    </div>
                  </summary>
                  <div className="faq-content">
                    <p className="faq-answer">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </section>

        </main>
      </div>

      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}