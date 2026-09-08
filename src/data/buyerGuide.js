export const PROTOCOL_PHASES = [
  {
    phase: "Phase 1",
    title: "Document & Title Discovery",
    duration: "Days 1–7",
    description: "Gather original paper trails dating back 30 years. Cross-reference registry records, succession certificates, and Jamabandi.",
    actionItems: [
      "Obtain certified copies of parent sale deeds and partition deeds",
      "Inspect Rajasthan Revenue Portal (Apna Khata / E-Dharti) for live Jamabandi",
      "Request 30-year Non-Encumbrance Certificate from Sub-Registrar",
      "Verify seller identity and Aadhaar/PAN alignment with revenue Khata"
    ]
  },
  {
    phase: "Phase 2",
    title: "Statutory Approvals & Land Conversion",
    duration: "Days 8–14",
    description: "Validate statutory land conversion under Section 90-A and ensure urban development body sanctions.",
    actionItems: [
      "Verify Section 90-A order issued by competent revenue authority (JDA / Collectorate)",
      "Confirm JDA/Town Planning layout approval seal with approved plot dimensions",
      "Cross-check RERA registration number directly on rera.rajasthan.gov.in",
      "Verify developer's dedicated RERA escrow account details"
    ]
  },
  {
    phase: "Phase 3",
    title: "Ground Demarcation & Physical Survey",
    duration: "Days 15–20",
    description: "Step foot on the physical parcel with a certified private surveyor or patwari to confirm coordinates.",
    actionItems: [
      "Compare Nakal Aks (revenue field map) with GPS boundaries on site",
      "Check for high-tension power line easements or canal buffer zones",
      "Confirm unobstructed 30ft+ approach road physically connected to public highway",
      "Ensure absence of informal encroachments, religious shrines, or shared wells"
    ]
  },
  {
    phase: "Phase 4",
    title: "Commercial & Cost Audit",
    duration: "Days 21–25",
    description: "Deconstruct the developer's price sheet to eliminate hidden levies and ambiguous possession penalties.",
    actionItems: [
      "Demand itemized breakdown of EDC, IDC, electrification, and clubhouse fees",
      "Verify DLC rate (District Level Committee) for accurate stamp duty budgeting",
      "Confirm written possession milestone timeline with concrete RERA delay penalties",
      "Confirm transfer charges (if buying on resale prior to registry)"
    ]
  },
  {
    phase: "Phase 5",
    title: "Formal Registration & Mutation",
    duration: "Days 26–30",
    description: "Execute the conveyance deed before the Sub-Registrar and ensure timely government mutation.",
    actionItems: [
      "Draft standard Sale Deed vetted by independent legal counsel",
      "Execute biometric and witness verification at Sub-Registrar office",
      "Collect original registered sale deed with biometric stamping",
      "Apply immediately for Dakhil Kharij (Revenue Mutation) in buyer's name"
    ]
  }
];

export const CHECKLIST_QUESTIONS = [
  {
    id: "check_title_30yr",
    category: "Legal Title",
    question: "Do you have the complete 30-year chain of title deeds from the original agricultural khatedar to current seller?",
    points: 20,
    critical: true
  },
  {
    id: "check_90a_sanction",
    category: "Conversion",
    question: "Has Section 90-A land conversion been sanctioned by competent government authority (JDA / SDM)?",
    points: 20,
    critical: true
  },
  {
    id: "check_jamabandi_mutation",
    category: "Revenue Records",
    question: "Is the seller's name actively updated in the latest government Jamabandi (RoR / Dakhil Kharij)?",
    points: 15,
    critical: true
  },
  {
    id: "check_non_encumbrance",
    category: "Legal Cleanliness",
    question: "Do you possess an official Non-Encumbrance Certificate confirming zero bank mortgages or court attachments?",
    points: 15,
    critical: false
  },
  {
    id: "check_rera_portal",
    category: "Statutory Compliance",
    question: "Have you verified the project registration number directly on the official RERA portal?",
    points: 10,
    critical: false
  },
  {
    id: "check_physical_demarcation",
    category: "Ground Reality",
    question: "Have you physically surveyed the plot coordinates against the official revenue patwari map (Nakal Aks)?",
    points: 10,
    critical: false
  },
  {
    id: "check_all_inclusive_cost",
    category: "Financial Clarity",
    question: "Do you have a legally signed all-inclusive cost sheet with zero ambiguous subsequent development fees?",
    points: 10,
    critical: false
  }
];

export const BUYER_FAQS = [
  {
    q: "What is Section 90-A in Rajasthan land transactions?",
    a: "Section 90-A of the Rajasthan Land Revenue Act regulates the formal surrender of agricultural khatedari rights to the government, followed by conversion and allotment for residential, commercial, or industrial purposes. Buying unconverted agricultural land with the intention of building residential units without 90-A sanction is legally void and invites demolition."
  },
  {
    q: "Why is an Agreement to Sell or Power of Attorney not ownership?",
    a: "Under Section 54 of the Transfer of Property Act and affirmed by the Supreme Court of India in Suraj Lamp & Industries, an Agreement to Sell or General Power of Attorney does not confer title. Legal ownership is only vested once a registered Sale Deed is executed and mutation is entered into revenue books."
  },
  {
    q: "Can I get a home/plot loan on a property that is not RERA approved?",
    a: "Nationalized and scheduled private banks require clean title, sanctioned layout approvals, and mandatory RERA registration numbers for eligible plotted township projects before sanctioning credit facilities."
  },
  {
    q: "What is Dakhil Kharij (Mutation) and why is it essential after registry?",
    a: "Registry at the Sub-Registrar office records the financial transaction between parties. Mutation (Dakhil Kharij) updates the government revenue registers (Jamabandi). Without mutation, the previous owner's name continues in revenue records, leaving scope for unauthorized subsequent dealings."
  }
];
