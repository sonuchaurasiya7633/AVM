// Initial Seed Data for AVM Talks Real Estate CRM
export const CRM_STAGES = [
  { id: 'new', labelEn: 'New Inquiries', labelHi: 'नई लीड्स', color: 'cyan', icon: 'Sparkles' },
  { id: 'contacted', labelEn: 'Contacted / Qualified', labelHi: 'सम्पर्क किया / योग्य', color: 'blue', icon: 'Phone' },
  { id: 'site_visit', labelEn: 'Site Visit Scheduled', labelHi: 'साइट विजिट निर्धारित', color: 'amber', icon: 'Car' },
  { id: 'due_diligence', labelEn: '90-A Due Diligence', labelHi: '90-ए राजस्व जांच', color: 'purple', icon: 'FileCheck' },
  { id: 'token', labelEn: 'Token / Agreement', labelHi: 'टोकन / बैनामा प्रक्रिया', color: 'orange', icon: 'Award' },
  { id: 'closed', labelEn: 'Deal Closed / Registered', labelHi: 'सफल रजिस्ट्री / पूर्ण', color: 'emerald', icon: 'CheckCircle2' },
];

export const CRM_PRIORITIES = [
  { id: 'hot', labelEn: 'Hot Lead', labelHi: 'अति-महत्वपूर्ण (Hot)', badge: '🔥 Hot', color: 'text-rose-500 bg-rose-500/10 border-rose-500/30' },
  { id: 'warm', labelEn: 'Warm Lead', labelHi: 'मध्यम (Warm)', badge: '⚡ Warm', color: 'text-amber-500 bg-amber-500/10 border-amber-500/30' },
  { id: 'cold', labelEn: 'Cold Lead', labelHi: 'सामान्य (Cold)', badge: '❄️ Cold', color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30' },
];

export const CRM_CORRIDORS = [
  'Ajmer Road & Tech Corridor (NH-48)',
  '47-KM Ring Road Expressway Belt',
  'Delhi-Mumbai Expressway (DMIC Hub)',
  'Diggi-Malpura Corridor & Phagi Axis',
  'Tonk Road & Chaksu Knowledge City',
  'Sirsi Road & Western Extension',
];

export const INITIAL_LEADS = [
  {
    id: 'lead-101',
    name: 'Dr. Arvind Shekhawat',
    phone: '98290-11234',
    email: 'dr.shekhawat@apollohospitals.com',
    city: 'Jaipur (C-Scheme)',
    corridor: 'Ajmer Road & Tech Corridor (NH-48)',
    plotId: 'plot-aura-sovereign',
    plotName: 'Aura Grand Sovereign Plotted Enclave',
    budgetLakhs: 125,
    plotSizeGaj: 500,
    stage: 'site_visit',
    priority: 'hot',
    source: '4K Drone Video',
    coordinatorAssigned: 'Abhishek Khandelwal ji',
    createdAt: '2026-03-01T10:30:00Z',
    lastContacted: '2026-03-08T14:15:00Z',
    notes: 'Senior cardiologist. Wants 500 Gaj East-facing corner plot for villa construction. Requested full JDA section 90-A revenue copy before site visit.',
    activities: [
      { id: 'act-1', type: 'inquiry', text: 'Submitted VIP site visit request via YouTube masterclass link', timestamp: '2026-03-01T10:30:00Z' },
      { id: 'act-2', type: 'call', text: 'Introductory call conducted by Avnish team. Clarified 60ft boulevard specifications.', timestamp: '2026-03-02T11:45:00Z' },
      { id: 'act-3', type: 'visit', text: 'Chauffeur inspection booked for upcoming Saturday 10:30 AM', timestamp: '2026-03-08T14:15:00Z' }
    ]
  },
  {
    id: 'lead-102',
    name: 'Rajeshwari Devi Rathore',
    phone: '94140-55821',
    email: 'rajeshwari.rathore@heritageholdings.in',
    city: 'Udaipur / Jaipur',
    corridor: '47-KM Ring Road Expressway Belt',
    plotId: 'plot-ring-grandeur',
    plotName: 'Ring Road Grandeur Plotted Estate',
    budgetLakhs: 85,
    plotSizeGaj: 350,
    stage: 'due_diligence',
    priority: 'hot',
    source: 'Advisory Consultation',
    coordinatorAssigned: 'Bhanwar Choudhary ji',
    createdAt: '2026-02-24T09:15:00Z',
    lastContacted: '2026-03-07T16:00:00Z',
    notes: 'Family office fund allocation. Needs 30-year Jamabandi and Non-Encumbrance Certificate verification by revenue tehsildar.',
    activities: [
      { id: 'act-4', type: 'inquiry', text: 'Initial consultation booked via web portal', timestamp: '2026-02-24T09:15:00Z' },
      { id: 'act-5', type: 'document', text: 'Dispatched 30-Year Title Chain Audit Dossier to client advocate', timestamp: '2026-03-05T12:00:00Z' }
    ]
  },
  {
    id: 'lead-103',
    name: 'Amit Bansal',
    phone: '99801-44720',
    email: 'amit.bansal@techscale.io',
    city: 'Bengaluru (NRI / Tech Leader)',
    corridor: 'Delhi-Mumbai Expressway (DMIC Hub)',
    plotId: 'plot-dmic-logistics',
    plotName: 'DMIC Freight Frontage Commercial & Residential Hub',
    budgetLakhs: 165,
    plotSizeGaj: 600,
    stage: 'token',
    priority: 'hot',
    source: 'Website Inquiry',
    coordinatorAssigned: 'Mukesh Singh Rajput ji',
    createdAt: '2026-02-18T11:20:00Z',
    lastContacted: '2026-03-09T09:30:00Z',
    notes: 'VP of Engineering in Bengaluru. Investing generational capital. Token agreement draft prepared with 90-day registry covenant.',
    activities: [
      { id: 'act-6', type: 'inquiry', text: 'Submitted interest via Plot Demarcation Modal', timestamp: '2026-02-18T11:20:00Z' },
      { id: 'act-7', type: 'visit', text: 'Completed on-ground physical audit via Fortuner transit', timestamp: '2026-02-27T15:30:00Z' },
      { id: 'act-8', type: 'stage', text: 'Advanced to Token / Agreement stage. Token ₹5,00,000 received.', timestamp: '2026-03-09T09:30:00Z' }
    ]
  },
  {
    id: 'lead-104',
    name: 'Col. Pradeep K. Verma (Retd)',
    phone: '98280-99312',
    email: 'col.verma.veteran@gmail.com',
    city: 'Jaipur (Vaishali Nagar)',
    corridor: 'Diggi-Malpura Corridor & Phagi Axis',
    plotId: 'plot-green-haven',
    plotName: 'Green Meadows Agro-Plotted Enclave',
    budgetLakhs: 48,
    plotSizeGaj: 250,
    stage: 'contacted',
    priority: 'warm',
    source: 'Referral',
    coordinatorAssigned: 'Kailash Saini ji',
    createdAt: '2026-03-04T14:00:00Z',
    lastContacted: '2026-03-06T17:30:00Z',
    notes: 'Looking for serene retirement plot with boundary wall demarcation and sweet groundwater connection.',
    activities: [
      { id: 'act-9', type: 'inquiry', text: 'Referred by Veteran Officers Welfare Association', timestamp: '2026-03-04T14:00:00Z' },
      { id: 'act-10', type: 'call', text: 'Coordinator explained PHED water line & JDA approval status', timestamp: '2026-03-06T17:30:00Z' }
    ]
  },
  {
    id: 'lead-105',
    name: 'Vikramaditya S. Shekhawat',
    phone: '98291-77880',
    email: 'vikram.shekhawat@rajasthancotton.com',
    city: 'Jaipur (Civil Lines)',
    corridor: 'Ajmer Road & Tech Corridor (NH-48)',
    plotId: 'plot-aura-sovereign',
    plotName: 'Aura Grand Sovereign Plotted Enclave',
    budgetLakhs: 140,
    plotSizeGaj: 500,
    stage: 'closed',
    priority: 'hot',
    source: 'Advisory Consultation',
    coordinatorAssigned: 'Abhishek Khandelwal ji',
    createdAt: '2026-01-15T09:00:00Z',
    lastContacted: '2026-03-02T11:00:00Z',
    notes: 'Deal closed! Sub-Registrar deed registered with 1% stamp duty concession under spouse name. Possession handed over.',
    activities: [
      { id: 'act-11', type: 'stage', text: 'Sub-registrar registry successfully executed. Patta delivered.', timestamp: '2026-03-02T11:00:00Z' }
    ]
  },
  {
    id: 'lead-106',
    name: 'Meenakshi Gupta',
    phone: '97844-33211',
    email: 'meenakshi.gupta@infosys.com',
    city: 'Jaipur (Mahindra World City)',
    corridor: 'Ajmer Road & Tech Corridor (NH-48)',
    plotId: 'plot-aura-sovereign',
    plotName: 'Aura Grand Sovereign Plotted Enclave',
    budgetLakhs: 55,
    plotSizeGaj: 200,
    stage: 'new',
    priority: 'hot',
    source: 'Website Inquiry',
    coordinatorAssigned: 'Anil Tiwari ji',
    createdAt: '2026-03-09T07:45:00Z',
    lastContacted: null,
    notes: 'Just submitted inquiry via CAD Masterplan viewer. Wants immediate callback regarding SBI home loan approval on 90-A.',
    activities: [
      { id: 'act-12', type: 'inquiry', text: 'Inquiry received through CAD blueprint mode', timestamp: '2026-03-09T07:45:00Z' }
    ]
  },
  {
    id: 'lead-107',
    name: 'Suresh Chandra Sharma',
    phone: '93145-22019',
    email: 'scsharma.ca@rediffmail.com',
    city: 'Delhi NCR (Gurugram)',
    corridor: 'Delhi-Mumbai Expressway (DMIC Hub)',
    plotId: 'plot-dmic-logistics',
    plotName: 'DMIC Freight Frontage Commercial & Residential Hub',
    budgetLakhs: 110,
    plotSizeGaj: 400,
    stage: 'site_visit',
    priority: 'warm',
    source: 'Due Diligence Calculator',
    coordinatorAssigned: 'Mukesh Singh Rajput ji',
    createdAt: '2026-03-03T16:20:00Z',
    lastContacted: '2026-03-07T12:10:00Z',
    notes: 'Practicing Chartered Accountant in Delhi. Evaluating logistics-facing commercial plot. Flight arriving Sunday morning.',
    activities: [
      { id: 'act-13', type: 'visit', text: 'Chauffeur pickup assigned for Jaipur Airport T2', timestamp: '2026-03-07T12:10:00Z' }
    ]
  },
  {
    id: 'lead-108',
    name: 'Gaurav & Neha Singhal',
    phone: '98730-66512',
    email: 'gaurav.singhal@amazon.com',
    city: 'Hyderabad (Tech Corporate)',
    corridor: '47-KM Ring Road Expressway Belt',
    plotId: 'plot-ring-grandeur',
    plotName: 'Ring Road Grandeur Plotted Estate',
    budgetLakhs: 75,
    plotSizeGaj: 300,
    stage: 'contacted',
    priority: 'warm',
    source: 'Instagram Masterclass',
    coordinatorAssigned: 'Bhanwar Choudhary ji',
    createdAt: '2026-03-06T18:10:00Z',
    lastContacted: '2026-03-08T15:00:00Z',
    notes: 'Looking for 300 Gaj plot inside Ring Road cloverleaf radius. Requested video recording of sector road tarmac.',
    activities: [
      { id: 'act-14', type: 'call', text: 'Shared 4K drone audit video via WhatsApp', timestamp: '2026-03-08T15:00:00Z' }
    ]
  },
  {
    id: 'lead-109',
    name: 'Harishankar Somani',
    phone: '94141-88902',
    email: 'hsomani@somanitextiles.com',
    city: 'Bhilwara / Jaipur',
    corridor: 'Tonk Road & Chaksu Knowledge City',
    plotId: 'plot-south-square',
    plotName: 'South Square Institutional Landbank',
    budgetLakhs: 190,
    plotSizeGaj: 800,
    stage: 'due_diligence',
    priority: 'hot',
    source: 'Advisory Consultation',
    coordinatorAssigned: 'Om Sharma ji',
    createdAt: '2026-02-28T10:00:00Z',
    lastContacted: '2026-03-08T11:30:00Z',
    notes: 'Textile industrialist looking for institutional size parcel. Verifying master plan 2025 sector road widening alignment.',
    activities: [
      { id: 'act-15', type: 'document', text: 'Masterplan alignment certified by JDA empanelled town planner', timestamp: '2026-03-08T11:30:00Z' }
    ]
  },
  {
    id: 'lead-110',
    name: 'Deepak Agarwal',
    phone: '99290-77112',
    email: 'dagarwal@modernbuilders.in',
    city: 'Jaipur (Mansarovar)',
    corridor: 'Ajmer Road & Tech Corridor (NH-48)',
    plotId: 'plot-aura-sovereign',
    plotName: 'Aura Grand Sovereign Plotted Enclave',
    budgetLakhs: 42,
    plotSizeGaj: 160,
    stage: 'new',
    priority: 'cold',
    source: 'Website Inquiry',
    coordinatorAssigned: 'Arpit Choudhary ji',
    createdAt: '2026-03-09T08:15:00Z',
    lastContacted: null,
    notes: 'Inquired about smallest available plot size and payment milestone schedule.',
    activities: [
      { id: 'act-16', type: 'inquiry', text: 'Submitted website callback request', timestamp: '2026-03-09T08:15:00Z' }
    ]
  }
];

export const INITIAL_VISITS = [
  {
    id: 'visit-201',
    leadId: 'lead-101',
    leadName: 'Dr. Arvind Shekhawat',
    phone: '98290-11234',
    date: '2026-03-14',
    timeSlot: 'Morning (10:30 AM)',
    pickupLocation: 'Residence: C-Scheme, Jaipur',
    corridor: 'Ajmer Road & Tech Corridor (NH-48)',
    vehicle: 'Executive SUV (Toyota Fortuner)',
    coordinator: 'Abhishek Khandelwal ji',
    status: 'confirmed',
    notes: 'Focus on 60ft corner demarcation and club house foundation.'
  },
  {
    id: 'visit-202',
    leadId: 'lead-107',
    leadName: 'Suresh Chandra Sharma',
    phone: '93145-22019',
    date: '2026-03-15',
    timeSlot: 'Morning (11:00 AM)',
    pickupLocation: 'Jaipur International Airport (T2 Arrivals)',
    corridor: 'Delhi-Mumbai Expressway (DMIC Hub)',
    vehicle: 'Innova Crysta Luxury Chauffeur',
    coordinator: 'Mukesh Singh Rajput ji',
    status: 'confirmed',
    notes: 'Flight arriving from New Delhi 10:15 AM. Chauffeur with placard.'
  },
  {
    id: 'visit-203',
    leadId: 'lead-108',
    leadName: 'Gaurav & Neha Singhal',
    phone: '98730-66512',
    date: '2026-03-21',
    timeSlot: 'Afternoon (02:30 PM)',
    pickupLocation: 'Hotel Marriott, Ashram Marg, Jaipur',
    corridor: '47-KM Ring Road Expressway Belt',
    vehicle: 'Executive SUV (Toyota Fortuner)',
    coordinator: 'Bhanwar Choudhary ji',
    status: 'scheduled',
    notes: 'Couple visiting from Hyderabad for weekend site evaluation.'
  }
];

export const INITIAL_TASKS = [
  {
    id: 'task-301',
    leadId: 'lead-102',
    leadName: 'Rajeshwari Devi Rathore',
    title: 'Obtain 30-Year Non-Encumbrance Certificate from Sub-Registrar Sanganer',
    dueDate: '2026-03-11',
    priority: 'urgent',
    assignedTo: 'Arpit Choudhary ji',
    completed: false
  },
  {
    id: 'task-302',
    leadId: 'lead-103',
    leadName: 'Amit Bansal',
    title: 'Draft Tri-Party Stamp Agreement with 90-day possession covenant',
    dueDate: '2026-03-12',
    priority: 'urgent',
    assignedTo: 'Nitigya ji',
    completed: false
  },
  {
    id: 'task-303',
    leadId: 'lead-106',
    leadName: 'Meenakshi Gupta',
    title: 'Follow up on SBI Home Loan approval letter for 90-A plot',
    dueDate: '2026-03-10',
    priority: 'high',
    assignedTo: 'Anil Tiwari ji',
    completed: false
  },
  {
    id: 'task-304',
    leadId: 'lead-101',
    leadName: 'Dr. Arvind Shekhawat',
    title: 'Confirm Fortuner chauffeur details and send driver contact card',
    dueDate: '2026-03-13',
    priority: 'medium',
    assignedTo: 'Abhishek Khandelwal ji',
    completed: false
  },
  {
    id: 'task-305',
    leadId: 'lead-105',
    leadName: 'Vikramaditya S. Shekhawat',
    title: 'Deliver framed original JDA Patta & demarcation certificate',
    dueDate: '2026-03-05',
    priority: 'medium',
    assignedTo: 'Abhishek Khandelwal ji',
    completed: true
  }
];
