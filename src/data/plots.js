const CLOUDINARY_DRONE_IMAGE = "https://res.cloudinary.com/dqpbo1uho/image/upload/v1788952291/yzmkuehvawne25oas0lr.png";
import heroEstateImg from '../assets/images/hero-plotted-estate.jpg';

export const PLOTS_DATA = [
  {
    id: "plot-aura-sovereign",
    slug: "aura-grand-sovereign-plotted-enclave",
    name: "Aura Grand Sovereign Plotted Enclave",
    corridor: "Ajmer Road & Tech Corridor",
    tagline: "Ultra-Luxury Gated Plotted Township with Grand Clubhouse & 60ft Boulevards",
    featured: true,
    badge: "Premier Plotted Township",
    status: "Ready for Registry & Possession",
    jdaApproved: true,
    reraRegistered: true,
    reraNumber: "RAJ/P/2026/8941",
    priceStartingGaj: "₹24,500 / Gaj",
    priceStartingLakhs: "₹36.75 Lakhs",
    plotSizesGaj: [150, 200, 250, 350, 500],
    plotSizesSqFt: [1350, 1800, 2250, 3150, 4500],
    roadWidths: ["40 Ft", "60 Ft", "80 Ft Main Avenue"],
    image: CLOUDINARY_DRONE_IMAGE,
    coverImage: CLOUDINARY_DRONE_IMAGE,
    description: "Jaipur's most distinguished gated plotted sanctuary, spanning 45 meticulously planned acres along the bustling Ajmer Road expansion corridor. Designed with underground cabling, Olympic-style swimming pool, curated botanical gardens, and 24/7 biometric security surveillance.",
    amenities: [
      "Grand Architectural Entrance Gate with Water Cascades",
      "Underground Electrification & High-Speed Optical Fiber",
      "Demarcated Plots with Concrete Boundary Stones",
      "60-Foot Wide Interlocked Bitumen Boulevards",
      "15,000 Sq.Ft Luxury Clubhouse & Wellness Center",
      "Continuous Treated Overhead Water Supply System",
      "Rainwater Harvesting Reservoirs & Eco STP",
      "Full JDA Layout Sanction & Clear 30-Year Revenue Title"
    ],
    connectivity: [
      { location: "Jaipur Ring Road Interchange", time: "4 mins" },
      { location: "Major IT campuses & Export Hubs", time: "8 mins" },
      { location: "Leading International Schools & Universities", time: "5 mins" },
      { location: "Jaipur International Airport", time: "25 mins" }
    ],
    bankApprovals: ["SBI", "HDFC Bank", "ICICI Bank", "Bank of Baroda"],
    dueDiligenceGrade: "A+ Institutional Grade (Verified by AVM Talks)"
  },
  {
    id: "plot-ring-road-imperial",
    slug: "ring-road-imperial-boulevard-plots",
    name: "Ring Road Imperial Commercial & Plotted Boulevard",
    corridor: "47-KM Ring Road Belt",
    tagline: "High-Visibility Commercial & Mixed-Use Plots along 100ft Sector Road",
    featured: true,
    badge: "High Capital Compounding",
    status: "Sector Road Sanctioned",
    jdaApproved: true,
    reraRegistered: true,
    reraNumber: "RAJ/P/2026/7420",
    priceStartingGaj: "₹38,000 / Gaj",
    priceStartingLakhs: "₹76.00 Lakhs",
    plotSizesGaj: [200, 300, 500, 1000],
    plotSizesSqFt: [1800, 2700, 4500, 9000],
    roadWidths: ["60 Ft", "100 Ft Sector Road Frontage"],
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80",
    coverImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    description: "Positioned directly inside the sanctioned 360-meter high-density development corridor of the operational Jaipur Ring Road. Exceptional frontage engineered for high-value commercial corporate offices, branded retail hubs, and premium residential land-banking.",
    amenities: [
      "100ft Masterplan Sector Road Direct Access",
      "Commercial & Residential Dual Utility Approvals",
      "Heavy-Duty Bitumen Paving for Commercial Vehicles",
      "Immediate Proximity to Cloverleaf Transit Toll",
      "Dedicated High-Tension Free Corridor Zone",
      "RERA Escrow Protected Account Compliance",
      "Complete 30-Year Revenue Lineage Audited"
    ],
    connectivity: [
      { location: "Ring Road Cloverleaf Toll Plaza", time: "2 mins" },
      { location: "Ajmer Road Highway Link", time: "6 mins" },
      { location: "Tonk Road Junction", time: "12 mins" },
      { location: "Agra Road Terminal", time: "22 mins" }
    ],
    bankApprovals: ["HDFC Bank", "SBI", "Axis Bank"],
    dueDiligenceGrade: "A+ Institutional Grade"
  },
  {
    id: "plot-expressway-heritage-farms",
    slug: "heritage-valley-sovereign-farm-villas",
    name: "The Heritage Valley Farm Villa Plotted Sanctuary",
    corridor: "Delhi-Mumbai Expressway Hub",
    tagline: "Sprawling 500 to 2000 Gaj Estate Parcels for Generational Luxury Living",
    featured: false,
    badge: "Boutique Farm Plots",
    status: "Limited Release",
    jdaApproved: true,
    reraRegistered: true,
    reraNumber: "RAJ/P/2026/6211",
    priceStartingGaj: "₹16,500 / Gaj",
    priceStartingLakhs: "₹82.50 Lakhs",
    plotSizesGaj: [500, 1000, 1500, 2000],
    plotSizesSqFt: [4500, 9000, 13500, 18000],
    roadWidths: ["40 Ft", "60 Ft"],
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
    coverImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    description: "A private eco-sanctuary situated near the Delhi-Mumbai Expressway spur junction. Designed for ultra-high-net-worth families desiring large, serene estate parcels with private water borewells, fruit orchards, and gated security.",
    amenities: [
      "Perimeter Boundary Wall with 24/7 Security Patrol",
      "Private Plantation & Drip Irrigation Grid",
      "Independent 3-Phase High Voltage Electric Grid",
      "Natural Stone Paved Internal Streets",
      "Equestrian Trails & Clubhouse Pavilion",
      "100% Clear Agricultural to Farm Conversion Order"
    ],
    connectivity: [
      { location: "Delhi-Mumbai Expressway Entry Plaza", time: "6 mins" },
      { location: "Central Jaipur (MI Road)", time: "35 mins" },
      { location: "Delhi NCR Border via NE-4", time: "2.5 hours" }
    ],
    bankApprovals: ["SBI", "ICICI Bank"],
    dueDiligenceGrade: "A+ Institutional Grade"
  },
  {
    id: "plot-skyline-institutional",
    slug: "skyline-plotted-heights-sector-township",
    name: "The Skyline Institutional Plotted Heights",
    corridor: "Ajmer Road & Tech Corridor",
    tagline: "Smart 111 to 222 Gaj Plots Near Educational Clusters & Global IT Employers",
    featured: false,
    badge: "High End-User Demand",
    status: "Bank Loan Approved 80%",
    jdaApproved: true,
    reraRegistered: true,
    reraNumber: "RAJ/P/2026/5129",
    priceStartingGaj: "₹21,000 / Gaj",
    priceStartingLakhs: "₹23.31 Lakhs",
    plotSizesGaj: [111, 166, 222, 277],
    plotSizesSqFt: [999, 1494, 1998, 2493],
    roadWidths: ["30 Ft", "40 Ft", "60 Ft"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    description: "Engineered for young professionals, corporate leaders, and disciplined investors seeking entry into master-planned JDA layouts with low ticket sizes, seamless bank finance, and explosive rental demand from nearby universities.",
    amenities: [
      "JDA Patta Handover on Registry",
      "Demarcated Corner & Park-Facing Plots",
      "Underground Drainage & Water Lines",
      "Children's Play Park & Open Air Gym",
      "Solar Street Lighting System",
      "Up to 80% Bank Loan from All Nationalized Banks"
    ],
    connectivity: [
      { location: "Premier Universities & Schools", time: "3 mins" },
      { location: "Ajmer Road 6-Lane Highway", time: "5 mins" },
      { location: "Corporate Tech Campuses", time: "10 mins" }
    ],
    bankApprovals: ["SBI", "HDFC", "Punjab National Bank", "Bank of Baroda"],
    dueDiligenceGrade: "A+ Institutional Grade"
  }
];
