export interface CarpetProduct {
  id: string;
  name: string;
  collection: string;
  category: "Contemporary" | "Heritage" | "Hospitality" | "Bespoke";
  material: string;
  carpetType: string;
  designStyle: string;
  shape: string;
  sizes: string[];
  colors: string[];
  customization: string;
  availability: "In Stock" | "Bespoke Only";
  description: string;
  images: string[];
  features: string[];
  careInstructions: string[];
  isPopular: boolean;
  isFeatured: boolean;
  dateAdded: string;
}

export const CARPET_CATALOGUE: CarpetProduct[] = [
  {
    id: "ar-001",
    name: "Nebula Linear Matrix",
    collection: "The Contemporary Line",
    category: "Contemporary",
    material: "Elite New Zealand Wool & Bamboo Silk Blend",
    carpetType: "Fine Hand-Knotted",
    designStyle: "Minimalist Modern Avant-Garde",
    shape: "Rectangular Configuration",
    sizes: ["8x10 ft", "9x12 ft", "10x14 ft", "Custom Dimensions"],
    colors: ["Gold & Charcoal Black", "Sovereign Ochre & Slate", "Prussian Blue & Ivory"],
    customization: "Fully Custom Sizes, Pile Heights, and Colorways via Atelier Direct Request.",
    availability: "In Stock",
    description: "Crafted to redefine architectural boundaries, the Nebula Linear Matrix offers an ultra-dense pile count integrated with premium organic bamboo silk line treatments. Hand-shearing finishes ensure supreme tactile consistency across high-end custom residential briefs.",
    images: ["/images/carpet_01.jpg", "/images/carpet_02.jpg", "/images/carpet_03.jpg", "/images/carpet_04.jpg"],
    features: ["Ultra-High Knot Density for Pattern Precision", "100% Sustainable Sourced New Zealand Wool", "Bamboo Silk Infusions Delivering Silk Sheen Surfaces"],
    careInstructions: ["Vacuum regularly using straight suction settings.", "Blot unexpected spills instantly with white absorbent cloths.", "Professional dry cleaning recommended annually."],
    isPopular: true,
    isFeatured: true,
    dateAdded: "2026-04-12"
  },
  {
    id: "ar-002",
    name: "Sultanate Heritage Canvas",
    collection: "Heritage Masterworks",
    category: "Heritage",
    material: "100% Organic Vat-Dyed Silk",
    carpetType: "Fine Hand-Knotted",
    designStyle: "Traditional Classical Imperial",
    shape: "Rectangular Configuration",
    sizes: ["10x14 ft", "12x18 ft", "Custom Dimensions"],
    colors: ["Crimson & Indigo", "Imperial Madder Red", "Antique Ivory"],
    customization: "Bespoke sizing matching historical restoration blueprints precisely.",
    availability: "Bespoke Only",
    description: "Multi-point historical preservation density rendering ancient imperial frameworks with flawless structural continuity and zero-bleeding organic color permanence.",
    images: ["/images/carpet_02.jpg", "/images/carpet_01.jpg", "/images/carpet_03.jpg", "/images/carpet_04.jpg"],
    features: ["Vat-Dyed Natural Organic Silk Threads", "Museum-Grade Intricate Medallion Detail", "Signed Asset Hand-Woven by Master Loom Technicians"],
    careInstructions: ["Professional silk cleaning parameters only.", "Avoid exposure to high moisture architectural states."],
    isPopular: true,
    isFeatured: true,
    dateAdded: "2026-05-01"
  },
  {
    id: "ar-003",
    name: "Travertine Frictional Pile",
    collection: "Hospitality Collection",
    category: "Hospitality",
    material: "Premium Wool Blend with Tensile Core",
    carpetType: "Durable Hand-Tufted",
    designStyle: "Textured Contemporary",
    shape: "Runner Profile",
    sizes: ["3x12 ft", "4x15 ft", "Custom Scale Runners"],
    colors: ["Beige & Natural Ivory", "Travertine Cream", "Urban Gray"],
    customization: "Custom edge binding options and anti-slip backing treatments available.",
    availability: "In Stock",
    description: "Specially calibrated friction-resistant structure engineered to prevent pile collapse and preserve texture profile layouts in heavy high-traffic spatial venues.",
    images: ["/images/carpet_03.jpg", "/images/carpet_04.jpg", "/images/carpet_01.jpg", "/images/carpet_02.jpg"],
    features: ["High-Friction Crush-Resistant Core Architecture", "Calibrated for Corridors, Executive Lounges and Yachts", "Stain-Shield Invisible Barrier Treatment Applied"],
    careInstructions: ["Heavy-duty commercial vacuuming acceptable.", "Steam clean safety rated extraction protocols."],
    isPopular: false,
    isFeatured: false,
    dateAdded: "2026-01-15"
  },
  {
    id: "ar-004",
    name: "Artisan Bespoke Loom",
    collection: "Bespoke Custom Works",
    category: "Bespoke",
    material: "Pure Fine Organic Silk Threads",
    carpetType: "Fine Hand-Knotted",
    designStyle: "Tailored Architecture Profiles",
    shape: "Circular Configuration",
    sizes: ["8x8 ft", "10x10 ft", "Custom Radius Parameters"],
    colors: ["Unlimited Color Palette Spectrum", "Emerald & Cream Match"],
    customization: "Fully tailored blueprint mapping with unrestricted scale or design adaptations.",
    availability: "Bespoke Only",
    description: "A signed masterwork carpet offering ultimate designer traceability, completely customizable to fit structural contours, curved staircases, or circular vestibules.",
    images: ["/images/carpet_04.jpg", "/images/carpet_03.jpg", "/images/carpet_02.jpg", "/images/carpet_01.jpg"],
    features: ["Flawless Curvilinear Hand-Weaving Grid Matrix", "Sourced with Pure Mulberry Silk Fibers", "Tailored to Coordinate with Bespoke Interior Briefs"],
    careInstructions: ["Treat as a structural fine art luxury asset.", "Rotate quarterly to eliminate localized traffic wear patterns."],
    isPopular: false,
    isFeatured: true,
    dateAdded: "2026-05-20"
  },
  {
    id: "ar-005",
    name: "Onyx Monolith Geometrics",
    collection: "The Contemporary Line",
    category: "Contemporary",
    material: "Merino Wool & Tencel Highlight",
    carpetType: "Hand-Tufted Architectural",
    designStyle: "Brutalist Geometric",
    shape: "Rectangular Configuration",
    sizes: ["9x12 ft", "10x14 ft", "12x15 ft"],
    colors: ["Onyx Black", "Charcoal Slate", "Monochrome Ivory"],
    customization: "Dimension tuning and pile density scaling available on request.",
    availability: "In Stock",
    description: "A stark, commanding geometric visual featuring raised Tencel borders against a matte Merino wool background, engineered to complement raw concrete and glass interior volumes.",
    images: ["/images/carpet_05.jpg", "/images/carpet_06.jpg", "/images/carpet_01.jpg", "/images/carpet_02.jpg"],
    features: ["Multi-Level Pile Topography", "Low Light Reflectivity Index", "Acoustic Dampening Matrix"],
    careInstructions: ["Vacuum without beater bar.", "Professional extraction recommended."],
    isPopular: true,
    isFeatured: false,
    dateAdded: "2026-03-10"
  },
  {
    id: "ar-006",
    name: "Persian Safavid Echo",
    collection: "Heritage Masterworks",
    category: "Heritage",
    material: "Antique Washed Afghan Wool",
    carpetType: "Fine Hand-Knotted",
    designStyle: "Transitional Antique",
    shape: "Rectangular Configuration",
    sizes: ["8x10 ft", "10x14 ft"],
    colors: ["Faded Terracotta", "Indigo Wash", "Sandstone"],
    customization: "Vintage distressing levels can be customized.",
    availability: "In Stock",
    description: "Utilizing specialized enzyme washing techniques to recreate a century of elegant aging while maintaining absolute structural integrity for modern usage.",
    images: ["/images/carpet_06.jpg", "/images/carpet_05.jpg", "/images/carpet_03.jpg", "/images/carpet_04.jpg"],
    features: ["Zero-Harm Enzyme Wash Finish", "Double-Knotted Tensile Strength", "Historically Accurate Dyes"],
    careInstructions: ["Gentle suction vacuuming.", "Protect from prolonged direct sunlight."],
    isPopular: true,
    isFeatured: true,
    dateAdded: "2026-06-02"
  },
  {
    id: "ar-007",
    name: "Grand Foyer Imperial",
    collection: "Hospitality Collection",
    category: "Hospitality",
    material: "Solution-Dyed Nylon & Wool Blend",
    carpetType: "Axminster Woven",
    designStyle: "Grand Scale Floral",
    shape: "Broadloom / Custom Cuts",
    sizes: ["Custom Square Footage", "Standard 12ft Widths"],
    colors: ["Regal Ruby", "Sapphire Navy", "Gold Leaf"],
    customization: "Pattern scaling tailored to lobby dimensions.",
    availability: "Bespoke Only",
    description: "The ultimate solution for five-star hotel lobbies. Axminster weaving ensures the pattern goes entirely through the backing, meaning the design remains crisp even after millions of footfalls.",
    images: ["/images/carpet_01.jpg", "/images/carpet_06.jpg", "/images/carpet_05.jpg", "/images/carpet_02.jpg"],
    features: ["Axminster Woven Durability", "Bleach Cleanable Fibers", "Class 1 Fire Rating"],
    careInstructions: ["Hot water extraction compatible.", "Commercial grade spot treatments approved."],
    isPopular: false,
    isFeatured: true,
    dateAdded: "2026-02-14"
  },
  {
    id: "ar-008",
    name: "Silk Road Tapestry",
    collection: "Bespoke Custom Works",
    category: "Bespoke",
    material: "100% Pure Mulberry Silk",
    carpetType: "Ultra-Fine Hand-Knotted",
    designStyle: "Pictorial Masterpiece",
    shape: "Wall Hanging / Centerpiece",
    sizes: ["5x7 ft", "6x9 ft", "Custom"],
    colors: ["Iridescent Jewel Tones"],
    customization: "Client can submit bespoke artwork for 1:1 translation.",
    availability: "Bespoke Only",
    description: "Operating at a staggering 600 knots per square inch, this piece is treated as a fine art installation rather than a floor covering. Pure Mulberry silk reflects light dynamically throughout the day.",
    images: ["/images/carpet_02.jpg", "/images/carpet_05.jpg", "/images/carpet_01.jpg", "/images/carpet_06.jpg"],
    features: ["600 KPSI Resolution", "Dynamic Light Reflection", "Includes Hanging Armature System"],
    careInstructions: ["Specialist art restorer cleaning only.", "Do not fold; must be rolled on rigid core."],
    isPopular: false,
    isFeatured: true,
    dateAdded: "2026-07-01"
  }
];

export const CATEGORY_COVERS = [
  { id: "Contemporary", label: "Contemporary Line", image: "/images/carpet_05.jpg" },
  { id: "Heritage", label: "Heritage Masterworks", image: "/images/carpet_02.jpg" },
  { id: "Hospitality", label: "Hospitality Collection", image: "/images/carpet_06.jpg" },
  { id: "Bespoke", label: "Bespoke Custom Works", image: "/images/carpet_04.jpg" }
] as const;
