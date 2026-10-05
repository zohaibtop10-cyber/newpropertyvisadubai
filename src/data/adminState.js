// Master Admin State & Schema Mock Data Store
// Provides live state and persistence helpers for the Enterprise Admin Suite
import {
  servicesData,
  reviewsData,
  blogPostsData,
  blogCategories
} from './cmsData';

export const INITIAL_STAFF_USERS = [
  {
    id: 'usr-001',
    fullName: 'Tariq Al-Mansoori',
    email: 'tariq.mansoori@emiratesprime.ae',
    role: 'SUPER_ADMIN',
    roleName: 'Super Admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    phone: '+971 50 112 3456',
    status: 'ACTIVE'
  },
  {
    id: 'usr-002',
    fullName: 'Elena Rostova',
    email: 'elena.rostova@emiratesprime.ae',
    role: 'LEGAL_PRO_CONSULTANT',
    roleName: 'Senior Legal / PRO Consultant',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    phone: '+971 52 987 6543',
    status: 'ACTIVE'
  },
  {
    id: 'usr-003',
    fullName: 'Rashid Khan',
    email: 'rashid.khan@emiratesprime.ae',
    role: 'CASE_FILING_OFFICER',
    roleName: 'Case Filing Officer / Typist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    phone: '+971 55 333 4455',
    status: 'ACTIVE'
  },
  {
    id: 'usr-004',
    fullName: 'Sarah Jenkins',
    email: 'sarah.j@emiratesprime.ae',
    role: 'SEO_CONTENT_EDITOR',
    roleName: 'Content / SEO Editor',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    phone: '+971 54 222 1100',
    status: 'ACTIVE'
  }
];

export const INITIAL_TELEMETRY = {
  grossVolumeAED: 2485900,
  grossVolumeGrowth: '+18.4%',
  netMarginAED: 842100,
  netMarginGrowth: '+22.1%',
  activePipelineCount: 42,
  activePipelineChange: '+7 cases today',
  conversionRate: '4.82%',
  conversionRateChange: '+0.64%',

  monthlyRevenue: [
    { month: 'Apr', govtTariff: 180000, advisoryRetainer: 75000 },
    { month: 'May', govtTariff: 210000, advisoryRetainer: 90000 },
    { month: 'Jun', govtTariff: 240000, advisoryRetainer: 110000 },
    { month: 'Jul', govtTariff: 290000, advisoryRetainer: 135000 },
    { month: 'Aug', govtTariff: 320000, advisoryRetainer: 160000 },
    { month: 'Sep', govtTariff: 380000, advisoryRetainer: 195000 }
  ],

  conversionFunnel: [
    { stage: 'Calculator Opened', count: 12450, percentage: '100%' },
    { stage: 'Phone / Email Captured', count: 2180, percentage: '17.5%' },
    { stage: 'Document Audit Initiated', count: 890, percentage: '7.1%' },
    { stage: 'ICP Entry Permit Issued', count: 420, percentage: '3.4%' },
    { stage: 'VIP Medical Cleared', count: 385, percentage: '3.1%' },
    { stage: 'Visa Stamped & Delivered', count: 360, percentage: '2.9%' }
  ],

  liveTicker: [
    { id: 1, time: 'Just now', action: 'Lead Ingested', detail: 'Spouse Visa request calculated via London UK IP', status: 'NEW' },
    { id: 2, time: '2 mins ago', action: 'Entry Permit Issued', detail: 'ICP Ref #ICP-883492 for Client Alexander Wright', status: 'SUCCESS' },
    { id: 3, time: '8 mins ago', action: 'WhatsApp Triggered', detail: 'Calculator PDF breakdown sent to +971 50 *** 8821', status: 'INFO' },
    { id: 4, time: '14 mins ago', action: 'Document Uploaded', detail: 'Attested Marriage Certificate uploaded for Dossier #DOS-2026-041', status: 'ACTION' }
  ]
};

export const INITIAL_DOSSIERS = [
  {
    id: 'dos-101',
    dossierNumber: 'DOS-2026-041',
    clientName: 'Alexander Wright',
    nationality: 'United Kingdom',
    phone: '+971 50 491 8273',
    email: 'a.wright@wrightcapital.co.uk',
    passportNo: 'GB9842104',
    passportExpiry: '2027-11-14',
    isPassportExpiredWarning: false,
    serviceId: 'spouse-visa',
    serviceTitle: 'Family Residence Visa',
    stage: 'GOVERNMENT_FILING', // 'LEAD_INGESTION' | 'COMPLIANCE_AUDIT' | 'GOVERNMENT_FILING' | 'IN_COUNTRY_STATUS' | 'VIP_BIOMETRICS_MEDICAL' | 'STAMPING_HANDOVER'
    priority: 'VIP_URGENT',
    governmentRefNo: 'ICP-883492-DXB',
    isInsideUae: true,
    adults: 1,
    children: 0,
    govtTariffAED: 4350,
    retainerAED: 3500,
    totalAED: 7850,
    assignedStaff: 'Elena Rostova',
    assignedStaffId: 'usr-002',
    targetDate: '2026-09-30',
    documents: [
      { id: 'doc-1', name: 'Passport_Copy_Alexander.pdf', type: 'PASSPORT', status: 'APPROVED', expiry: '2027-11-14' },
      { id: 'doc-2', name: 'Attested_Marriage_Cert.pdf', type: 'ATTESTED_CERT', status: 'APPROVED', expiry: null },
      { id: 'doc-3', name: 'Ejari_Tenancy_Contract_2026.pdf', type: 'EJARI', status: 'APPROVED', expiry: '2027-04-01' }
    ],
    auditTrail: [
      { timestamp: '2026-09-22 14:20', staff: 'Elena Rostova', note: 'Uploaded attested marriage cert and submitted ICP portal filing.' },
      { timestamp: '2026-09-21 10:15', staff: 'Rashid Khan', note: 'Verified passport copy validity (> 6 months).' }
    ]
  },
  {
    id: 'dos-102',
    dossierNumber: 'DOS-2026-042',
    clientName: 'Dmitry Smirnov',
    nationality: 'Russian Federation',
    phone: '+971 52 810 4492',
    email: 'dmitry@smirnov-tech.io',
    passportNo: 'RU4910283',
    passportExpiry: '2026-10-05',
    isPassportExpiredWarning: true,
    serviceId: 'golden-visa',
    serviceTitle: '10-Year Golden Visa (Investor)',
    stage: 'VIP_BIOMETRICS_MEDICAL',
    priority: 'VIP_URGENT',
    governmentRefNo: 'GDRFA-772109-DLD',
    isInsideUae: true,
    adults: 1,
    children: 2,
    govtTariffAED: 9800,
    retainerAED: 7500,
    totalAED: 17300,
    assignedStaff: 'Tariq Al-Mansoori',
    assignedStaffId: 'usr-001',
    targetDate: '2026-09-28',
    documents: [
      { id: 'doc-4', name: 'Passport_Dmitry_Smirnov.pdf', type: 'PASSPORT', status: 'APPROVED', expiry: '2026-10-05' },
      { id: 'doc-5', name: 'DLD_Title_Deed_AED_2M+.pdf', type: 'TITLE_DEED', status: 'APPROVED', expiry: null }
    ],
    auditTrail: [
      { timestamp: '2026-09-22 16:45', staff: 'Tariq Al-Mansoori', note: 'Scheduled VIP chauffeur & 30-min VIP Smart Medical in Al Mina.' }
    ]
  },
  {
    id: 'dos-103',
    dossierNumber: 'DOS-2026-043',
    clientName: 'Sophia Martinez',
    nationality: 'Spain',
    phone: '+34 612 940 112',
    email: 'sophia.m@barcelona-design.es',
    passportNo: 'ES1029384',
    passportExpiry: '2029-05-20',
    isPassportExpiredWarning: false,
    serviceId: 'parents-visa',
    serviceTitle: 'Parents Residency Visa',
    stage: 'COMPLIANCE_AUDIT',
    priority: 'STANDARD',
    governmentRefNo: 'ICP-FILING-PENDING',
    isInsideUae: false,
    adults: 2,
    children: 0,
    govtTariffAED: 7200,
    retainerAED: 4500,
    totalAED: 11700,
    assignedStaff: 'Elena Rostova',
    assignedStaffId: 'usr-002',
    targetDate: '2026-10-10',
    documents: [
      { id: 'doc-6', name: 'Birth_Certificate_Attested.pdf', type: 'ATTESTED_CERT', status: 'PENDING_REVIEW', expiry: null }
    ],
    auditTrail: [
      { timestamp: '2026-09-22 11:00', staff: 'Elena Rostova', note: 'Awaiting MOFA translation copy for parents birth cert.' }
    ]
  },
  {
    id: 'dos-104',
    dossierNumber: 'DOS-2026-044',
    clientName: 'Jean-Luc Dubois',
    nationality: 'France',
    phone: '+971 54 772 9011',
    email: 'j.dubois@luxuria.fr',
    passportNo: 'FR8829102',
    passportExpiry: '2028-08-12',
    isPassportExpiredWarning: false,
    serviceId: 'domestic-worker-visa',
    serviceTitle: 'Domestic Worker & Nanny Visa',
    stage: 'LEAD_INGESTION',
    priority: 'STANDARD',
    governmentRefNo: 'NEW-LEAD',
    isInsideUae: true,
    adults: 1,
    children: 0,
    govtTariffAED: 5100,
    retainerAED: 3000,
    totalAED: 8100,
    assignedStaff: 'Rashid Khan',
    assignedStaffId: 'usr-003',
    targetDate: '2026-10-15',
    documents: [],
    auditTrail: [
      { timestamp: '2026-09-22 17:10', staff: 'System Automation', note: 'Lead ingested via frontend calculator modal.' }
    ]
  }
];

export const INITIAL_TARIFFS = [
  {
    id: 'trf-001',
    category: 'IMMIGRATION_ICP',
    authority: 'ICP / GDRFA',
    itemCode: 'ENTRY_PERMIT_INSIDE',
    itemName: 'ICP Entry Permit (Inside UAE Status)',
    govtFeeAED: 1150,
    retainerMarkupAED: 750,
    insideCountrySurchargeAED: 500,
    isActive: true
  },
  {
    id: 'trf-002',
    category: 'IMMIGRATION_ICP',
    authority: 'ICP / GDRFA',
    itemCode: 'ENTRY_PERMIT_OUTSIDE',
    itemName: 'ICP Entry Permit (Outside UAE Status)',
    govtFeeAED: 650,
    retainerMarkupAED: 500,
    insideCountrySurchargeAED: 0,
    isActive: true
  },
  {
    id: 'trf-003',
    category: 'MEDICAL_EMIRATES_ID',
    authority: 'DHA / EIDA',
    itemCode: 'VIP_MEDICAL_30MIN',
    itemName: 'VIP Smart Medical Fitness (30-min Result)',
    govtFeeAED: 820,
    retainerMarkupAED: 400,
    insideCountrySurchargeAED: 0,
    isActive: true
  },
  {
    id: 'trf-004',
    category: 'MEDICAL_EMIRATES_ID',
    authority: 'ICP / EIDA',
    itemCode: 'EMIRATES_ID_2YEAR',
    itemName: 'Emirates ID Typing (2-Year Biometrics)',
    govtFeeAED: 375,
    retainerMarkupAED: 250,
    insideCountrySurchargeAED: 0,
    isActive: true
  },
  {
    id: 'trf-005',
    category: 'GOLDEN_VISA',
    authority: 'GDRFA / DLD',
    itemCode: 'GOLDEN_VISA_NOMINATION',
    itemName: '10-Year Golden Visa Nomination & Medical',
    govtFeeAED: 4850,
    retainerMarkupAED: 4500,
    insideCountrySurchargeAED: 0,
    isActive: true
  }
];

export const INITIAL_CMS_CONFIG = {
  // About Page CMS Configuration
  aboutPage: {
    hero: {
      badge: "Brightlink Management Consultancy • DET & GDRFA Accredited",
      title: "Dubai. Documents. Done. Perfectly.",
      subtitle: "Pioneering seamless business setup and visa processing in the UAE. We unify strategy, compliance, and execution into one flawless experience."
    },
    welcome: {
      badge: "Our Philosophy & Heritage",
      title: "Redefining UAE Relocation & Corporate Immigration",
      p1: "Operating under The Brightlink Group from our executive headquarters in Crystal Tower, Business Bay, Dubai, Brightlink Management Consultancy has served as an authoritative bridge between global investors, families, corporations, and UAE government entities for over 15 years.",
      p2: "Navigating UAE immigration shouldn't feel like navigating a maze. We founded our agency to replace bureaucratic friction, unexpected fee surcharges, and endless typing center queues with 100% digital transparency, upfront statutory fee accounting, and guaranteed SLA turnaround speeds.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      ceo: {
        name: "Bilal Saleem",
        title: "Founder & CEO",
        quote: "Pioneered transparent corporate immigration models in the UAE. Architect of Brightlink Group operations, establishing direct filing workflows with GDRFA, ICP, and Dubai Economy & Tourism."
      }
    },
    license: {
      badge: "Official Licensing & Accreditation",
      title: "Officially Licensed Corporate Immigration Agency",
      description: "Authorized by Dubai Economy & Tourism (DET) and General Directorate of Residency and Foreigners Affairs (GDRFA) to process government filings.",
      daysImpact: "15+ Years",
      card: {
        authority: "Government of Dubai - Economy & Tourism (DET)",
        licenseNo: "DET-789421-DXB",
        businessName: "Brightlink Management Consultancy LLC",
        registrationDate: "2011",
        legalType: "LLC",
        activities: "Management Consultancies | Documents Clearing Services | Corporate Immigration Partner"
      }
    },
    strength: {
      badge: "Strength in Numbers",
      title: "Our Strength in Numbers",
      subtitle: "Trusted UAE Consultants with 15+ Years of Excellence",
      stats: [
        { value: "15+ Years", label: "of Excellence" },
        { value: "20,000+", label: "Visas Processed" },
        { value: "4.9 / 5", label: "Google Rating" },
        { value: "100%", label: "Statutory Transparency" }
      ]
    },
    teamRoster: [
      {
        name: "Bilal Saleem",
        role: "Founder & CEO",
        bio: "Pioneered transparent corporate immigration models in the UAE. Architect of Brightlink Group operations, establishing direct filing workflows with GDRFA, ICP, and Dubai Economy & Tourism.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
        badge: "Executive Leadership"
      },
      {
        name: "Muhammad Anas",
        role: "Managing Director",
        bio: "Oversees multi-emirate expansion, strategic partnership frameworks, and government relations across Dubai, Abu Dhabi, and Ras Al Khaimah.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
        badge: "Board of Directors"
      },
      {
        name: "Aziza Kamilova",
        role: "Director Operations",
        bio: "Directs daily VIP concierge workflows, document legalization, and fast-track medical fitness operations across all 7 UAE Emirates.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
        badge: "Operations Desk"
      },
      {
        name: "Haroon Saleem",
        role: "HR Manager",
        bio: "Leads talent acquisition, accredited PRO officer training, and internal compliance protocols ensuring 100% adherence to UAE labor laws.",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
        badge: "Human Resources"
      },
      {
        name: "Olga Kulish",
        role: "Project Manager",
        bio: "Manages complex Golden Visa investor files, real estate valuations, DLD Cube schedules, and corporate free zone establishment cards.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
        badge: "Golden Visa Specialist"
      },
      {
        name: "Malika Ikramova",
        role: "Executive Director",
        bio: "Drives high-net-worth family office consultations, VIP domestic staff visas, and strategic commercial licensing portfolios.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
        badge: "Executive Advisory"
      },
      {
        name: "Ilya Merzlyakov",
        role: "Marketing Manager",
        bio: "Heads digital transparency initiatives, client feedback channels, user experience engineering, and multilingual client portals.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
        badge: "Brand & Media"
      }
    ]
  },
  // Service Pages CMS Overrides (Synced with Firebase)
  servicePages: {
    'property-visa': {
      title: 'Dubai Property Investor Residence Visa',
      subtitle: '2-Year & 10-Year Golden Visa for Real Estate Owners in Dubai',
      heroDescription: 'Secure your UAE residence visa through property investment. Complete DLD valuation, title deed audit, and priority application filing.',
      startingPrice: 'AED 4,000',
      processingTime: '3-5 Business Days'
    },
    'golden-visa': {
      title: '10-Year UAE Golden Visa Concierge',
      subtitle: 'Long-Term Residency for Investors, Entrepreneurs & High-Earner Executives',
      heroDescription: 'Direct nomination and GDRFA golden residency filing across property investment, salary (AED 30k+), and corporate nomination routes.',
      startingPrice: 'AED 4,850',
      processingTime: '48-72 Hours'
    },
    'family-visa': {
      title: 'Family & Spouse Residence Visa',
      subtitle: 'Sponsor Your Spouse, Children & Parents in Dubai',
      heroDescription: 'End-to-end family sponsorship handling: GDRFA entry permits, in-country status change, DHA VIP medical fitness, and Emirates ID.',
      startingPrice: 'AED 4,350',
      processingTime: '5-7 Business Days'
    },
    'newborn-visa': {
      title: 'Newborn Baby Residence Visa',
      subtitle: 'Complete 120-Day Grace Period Registration in Dubai',
      heroDescription: 'Hassle-free birth certificate attestation, entry permit issuance, and Emirates ID processing within the statutory 120-day grace period.',
      startingPrice: 'AED 2,200',
      processingTime: '3-5 Business Days'
    },
    'maid-visa': {
      title: 'Maid & Domestic Worker Sponsorship',
      subtitle: 'Official MOHRE & Tadbeer Domestic Residence Permits',
      heroDescription: 'Legal sponsorship for housemaids, nannies, cooks, and personal drivers under official MOHRE contract guidelines.',
      startingPrice: 'AED 5,100',
      processingTime: '4-6 Business Days'
    },
    'emirates-id': {
      title: 'Emirates ID & Medical Typing Concierge',
      subtitle: 'VIP Fast-Track Screening & ICP Biometrics',
      heroDescription: 'Fast-track 30-minute Smart Salem AI medical screening and priority ICP Emirates ID biometric fingerprint appointments.',
      startingPrice: 'AED 820',
      processingTime: '30-min to 24 Hours'
    },
    'pro-services': {
      title: 'B2B Corporate PRO Services',
      subtitle: 'Enterprise Government Affairs & MOHRE Work Permits',
      heroDescription: 'Comprehensive corporate PRO retainers: trade license renewals, MOHRE work permits, establishment cards, and labor quota management.',
      startingPrice: 'AED 1,500',
      processingTime: '3-5 Business Days'
    },
    'amer-center': {
      title: 'Amer Center Dubai Guide & Concierge',
      subtitle: '100% Online GDRFA Visa Submissions without Queue Lines',
      heroDescription: 'Avoid physical center waiting lines. Submit your family, visit, or corporate visa applications 100% online through our accredited GDRFA desk.',
      startingPrice: 'AED 220',
      processingTime: 'Instant / 24 Hours'
    },
    'attestation': {
      title: 'MOFA & Embassy Certificate Attestation',
      subtitle: 'Educational, Personal & Commercial Document Legalization',
      heroDescription: 'Complete 5-stage legalisation chain across 100+ countries with free doorstep pickup and return anywhere in the UAE.',
      startingPrice: 'AED 150',
      processingTime: '24-48 Hours'
    },
    'legal-translation': {
      title: 'Certified Sworn Legal Translation',
      subtitle: 'Ministry of Justice (MOJ) Licensed Arabic Translation',
      heroDescription: 'Court-stamped sworn legal translations accepted by Dubai Courts, Notary Public, GDRFA, MOHRE, and UAE Embassies.',
      startingPrice: 'AED 75 / Page',
      processingTime: '3-6 Hours Express'
    },
    'poa': {
      title: 'Lawyer-Drafted Power of Attorney',
      subtitle: 'Bilingual POA with Remote Video Call Notarization',
      heroDescription: 'Custom bilingual (English/Arabic) Power of Attorney drafted by UAE legal advocates and notarized via official video call.',
      startingPrice: 'AED 850',
      processingTime: '24-48 Hours'
    },
    'wills-last-testament': {
      title: 'UAE Wills Registration & Estate Protection',
      subtitle: 'DIFC Courts & Dubai Courts Expat Estate Planning',
      heroDescription: 'Protect your UAE real estate, bank accounts, and minor child guardianship under English Common Law or Dubai Notary Courts.',
      startingPrice: 'AED 2,500',
      processingTime: '3-7 Business Days'
    },
    'dld-trustee': {
      title: 'Dubai Property Trustee Services',
      subtitle: 'DLD Property Sale, Gift Transfer & Mortgage Registration',
      heroDescription: 'Complete document pre-audit, developer NOC coordination, and priority booking at official DLD Real Estate Trustee offices.',
      startingPrice: 'AED 2,000',
      processingTime: 'Same-Day Transfer'
    },
    'property-revaluation': {
      title: 'Official DLD Property Valuation Certificate',
      subtitle: 'Market Appreciation Proof for 10-Year Golden Visa',
      heroDescription: 'Certify your property market appreciation to AED 2 Million+ with an official DLD Valuation Certificate to unlock Golden Visa eligibility.',
      startingPrice: 'AED 4,000',
      processingTime: '3-5 Business Days'
    },
    'medical-eid': {
      title: 'Visa Medical & Emirates ID Center Directory',
      subtitle: 'Smart Salem 30-Min AI & ICP Biometrics Booking',
      heroDescription: 'Official directory of DHA visa medical centers and ICP biometric locations sorted by proximity to your home.',
      startingPrice: 'AED 320',
      processingTime: '30-min VIP Available'
    },
    'iloe-insurance': {
      title: 'ILOE Unemployment Insurance & Fine Audit',
      subtitle: 'MOHRE Mandatory Scheme & Fine Clearance',
      heroDescription: 'Check ILOE status by Emirates ID, calculate 60% unemployment payouts, and clear outstanding MOHRE fines online.',
      startingPrice: 'AED 5 / Month',
      processingTime: 'Instant Online'
    },
    'visa-validity': {
      title: 'UAE Visa Expiry & Overstay Fine Audit',
      subtitle: 'Live GDRFA Status Check & Fine Waiver Petitions',
      heroDescription: 'Audit your visa validity date, calculate daily overstay penalties (AED 50/day), and request official GDRFA fine reduction petitions.',
      startingPrice: 'AED 50 / Day Overstay',
      processingTime: 'Instant Audit'
    }
  },

  // Global Site Identity
  global: {
    brandName: 'Property Visa',
    operatorName: '800 DOCS LLC SOC',
    phone: '800 DOCS (3627)',
    phoneRaw: '+97142208899',
    whatsapp: '+971 50 123 4567',
    whatsappRaw: '971501234567',
    email: 'advisory@familyvisa.ae',
    address: 'Suite 402, Block B, Business Village, Deira, Clock Tower Roundabout, Dubai, UAE',
    officeHours: 'Mon - Sat: 8:00 AM - 8:00 PM (GST)',
    licenseNumber: 'License 800 DOCS LLC SOC',
    footerDisclaimer: 'FamilyVisa.ae is an independent administrative consultancy operating under License 800 DOCS LLC SOC. We provide document clearing services for GDRFA and ICP applications.',
    copyrightText: '© 2026 Property Visa UAE (800 DOCS LLC SOC). All rights reserved.'
  },

  // Hero Section
  hero: {
    mainHeadline: "Bring your family to the UAE without the paperwork headache.",
    subtext: 'We prepare, submit, and track family residence visas, 10-Year Golden Visas, and Emirates ID applications so you deal with one consultant instead of five counters.',
    stat1: 'Free eligibility check before any fee',
    stat2: 'Fixed service fee, government at cost',
    stat3: 'Most files completed in 5-10 days',
    ctaPrimary: 'Calculate Family Visa Fees',
    ctaSecondary: 'WhatsApp Senior Advisor'
  },

  // Stats Counter Bar
  stats: {
    badgeText: 'REAL-TIME SLA METRICS',
    title: 'Trusted by 15,000+ Families Across Dubai & Abu Dhabi',
    subtext: 'Live status indicators synced with ICP and GDRFA government filing portals.',
    metric1Val: '15,000+', metric1Label: 'Family Applications',
    metric2Val: '99.8%', metric2Label: 'ICP Approval Rate',
    metric3Val: '5-10 Days', metric3Label: 'Average Turnaround',
    metric4Val: '15 Mins', metric4Label: 'WhatsApp Response'
  },

  // Achievements Section
  achievements: {
    badgeText: 'LICENSED EXCELLENCE',
    title: 'Official Recognition & Government Excellence Awards',
    subtext: 'Authorized document clearing partner operating under license from Dubai Economy & Tourism (DET).',
    items: [
      { id: 'ach-1', icon: 'Trophy', badge: "RANKED #1 IN DUBAI", title: "Top UAE Residency Advisory 2026", desc: "Voted #1 for transparent family visa processing and 100% online convenience across Dubai & Abu Dhabi.", stat: "4.9 ★ Rating" },
      { id: 'ach-2', icon: 'Award', badge: "GOVERNMENT LICENSED", title: "Official GDRFA & ICP Partner", desc: "Licensed under 800 DOCS LLC SOC with direct server access to federal immigration portals.", stat: "100% Authorized" },
      { id: 'ach-3', icon: 'ShieldCheck', badge: "UNBUNDLED BILLING", title: "Zero Hidden Markups Guarantee", desc: "Saved over AED 4.5 Million in hidden typing fees for client families through itemized government receipts.", stat: "AED 4.5M+ Saved" },
      { id: 'ach-4', icon: 'Zap', badge: "RECORD FAST TRACK", title: "24-Hour VIP Approval SLA", desc: "Fastest entry permit and status change clearance recorded in Dubai immigration history.", stat: "24h VIP Turnaround" }
    ]
  },

  // Problems We Solve Section
  problems: {
    badgeText: 'THE PROBLEMS WE SOLVE',
    title: 'Why DIY Family Visa Processing Fails in Dubai',
    subtext: 'Avoid fines, unexpected rejections, and endless queues with dedicated PRO management.',
    items: [
      { id: 'prb-1', problemTitle: "Standing in 5 different queues at Amer centers, medical clinics, and typing offices.", solutionTitle: "100% Online WhatsApp Concierge. Send scans from home — we handle all government counters for you.", desc: "" },
      { id: 'prb-2', problemTitle: "Hidden service center surcharges and mysterious fee markups on government tariffs.", solutionTitle: "Itemized Unbundled Billing. We pass on exact GDRFA/ICP fees at cost with official receipts.", desc: "" },
      { id: 'prb-3', problemTitle: "Visa rejections caused by improper MOFA attestation stamps or Ejari errors.", solutionTitle: "Free Pre-Flight Document Audit. We verify your certificates before you spend a single Dirham.", desc: "" },
      { id: 'prb-4', problemTitle: "Heavy daily overstay fines while waiting for status change or medical checkups.", solutionTitle: "Guaranteed Fast-Track SLA. In-country status change cleared in 24-48 hours with zero fine risk.", desc: "" }
    ]
  },

  // Categorized Services Grid
  services: {
    badgeText: 'RESIDENCY SOLUTIONS',
    title: 'All-Inclusive Family & Investor Visa Services',
    subtext: 'Select your dependant category to calculate government fees and view required documents.',
    categories: ['All Visas', 'Family Visas', 'Golden Visas', 'Domestic Staff'],
    items: [
      { id: 'family-visa', title: 'Family Residence Visa', desc: 'Sponsor your spouse, children or parents with a fully managed application from entry permit to Emirates ID.', tag: 'Visas', icon: 'Users', linkId: 'spouse-visa' },
      { id: 'family-visa-cost', title: 'Family Visa Cost Breakdown', desc: 'Clear breakdown of every government and service charge in a family sponsorship file.', tag: 'Visas', icon: 'Calculator', linkId: 'spouse-visa' },
      { id: 'family-visa-renewal', title: 'Family Visa Renewal', desc: "Renew a dependant's residence before it expires and avoid daily overstay fines.", tag: 'Visas', icon: 'Clock', linkId: 'spouse-visa' },
      { id: 'golden-visa', title: '10-Year Golden Visa', desc: 'Long-term residence for investors, property owners, high earners and their families with no salary cap.', tag: 'Visas', icon: 'Crown', linkId: 'golden-visa' },
      { id: 'property-investor', title: 'Property Investor Visa', desc: '2-Year or 10-Year Golden Visa for real estate owners with AED 750k+ or AED 2M+ property equity.', tag: 'Visas', icon: 'Building2', linkId: 'property-visa' },
      { id: 'maid-visa', title: 'Maid & Domestic Worker Visa', desc: 'Official MOHRE & Tadbeer sponsorship for housemaids, nannies, cooks, and personal drivers.', tag: 'Visas', icon: 'Shield', linkId: 'maid-visa' },
      { id: 'new-born-visa', title: 'Newborn Baby Visa', desc: 'Complete birth certificate processing, passport stamping, and Emirates ID for your newborn in the UAE.', tag: 'Visas', icon: 'Baby', linkId: 'new-born' },
      { id: 'emirates-id', title: 'Emirates ID & Medical Typing', desc: 'Typing and processing of VIP medical fitness applications and Emirates ID biometrics appointments.', tag: 'Emirates ID & Medical', icon: 'Stethoscope', linkId: 'emirates-id' },
      { id: 'attestation-mofa', title: 'Document Attestation & MOFA', desc: 'Official home-country embassy legalization and MOFA UAE stamps for marriage & birth certificates.', tag: 'Legal & Attestation', icon: 'FileCheck', linkId: 'attestation' },
      { id: 'legal-translation', title: 'Sworn Arabic Legal Translation', desc: 'Ministry of Justice certified Arabic translations accepted by GDRFA and court authorities.', tag: 'Legal & Attestation', icon: 'Languages', linkId: 'legal-translation' },
      { id: 'dld-trustee', title: 'DLD Trustee & Power of Attorney', desc: 'Dubai Land Department trustee representation and notarized power of attorney assistance.', tag: 'Legal & Attestation', icon: 'Scale', linkId: 'property-visa' }
    ]
  },

  // Service Packages Section
  packages: {
    badgeText: 'TRANSPARENT TARIFFS',
    title: 'Unbundled Service Retainer Packages',
    subtext: 'Choose your preferred level of advisory support. All government fees are billed strictly at cost.',
    items: [
      { id: 'pkg-1', name: 'Essential Typing', tagline: 'For DIY applicants who only need official GDRFA/ICP typing & document check.', fee: 'AED 750', type: 'Standard Retainer', popular: false, features: ['Official ICP / GDRFA Online Typing', 'Document & Attestation Audit', 'Medical & Emirates ID Typing Forms', 'WhatsApp Application Tracking', 'Government Receipts Provided'], buttonText: 'Choose Essential', calcTab: 'spouse' },
      { id: 'pkg-2', name: 'Full Concierge Family', tagline: 'Complete end-to-end handling — from entry permit to Emirates ID home delivery.', fee: 'AED 1,450', type: 'Most Popular Package', popular: true, features: ['Everything in Essential Typing', 'Complete File Submission & Status Change', 'VIP Medical Appointment Booking', 'Dedicated Personal PRO Specialist', 'Emirates ID Courier Home Delivery', '100% Guaranteed Approval SLA'], buttonText: 'Choose Full Concierge', calcTab: 'spouse' },
      { id: 'pkg-3', name: 'VIP 24h Fast-Track Express', tagline: 'Urgent VIP processing for executives, Golden Visa holders & urgent residency files.', fee: 'AED 2,450', type: 'VIP Express Tier', popular: false, features: ['24 to 48-Hour Approval Guarantee', 'Private Chauffeur & Escort for Medical', 'Priority GDRFA / ICP Queue Fast-Tracking', '24/7 Direct Line to Senior Partner', 'Golden Visa & Dependant Fast-Track', 'Same-Day Physical ID Processing'], buttonText: 'Choose VIP Express', calcTab: 'golden' }
    ]
  },

  // Why Us Section
  whyUs: {
    badgeText: 'THE EMIRATESPRIME ADVANTAGE',
    title: 'Why Families Choose Us Over Typing Centers',
    subtext: 'Combining digital speed with VIP white-glove advisory.',
    items: [
      { id: 'wus-1', title: 'Zero Counter Queues', desc: 'Everything is submitted electronically through our encrypted client vault.' },
      { id: 'wus-2', title: 'Dedicated PRO Case Officer', desc: 'You deal with one assigned legal advisor throughout your application.' },
      { id: 'wus-3', title: 'Guaranteed Turnaround SLA', desc: 'We track every milestone from Entry Permit to Emirates ID delivery.' }
    ]
  },

  // Step-by-Step SLA Workflow
  process: {
    badgeText: '4-STEP SLA WORKFLOW',
    title: 'How We Process Your Family Residency',
    subtext: 'Clear timeline from initial document review to passport stamping.',
    steps: [
      { step: '01', title: 'Document Audit & Attestation', time: 'Day 1', desc: 'We verify Ejari, salary certificates, and attested marriage/birth documents.' },
      { step: '02', title: 'Entry Permit & Status Change', time: 'Days 2 - 4', desc: 'ICP/GDRFA entry permit is issued and in-country status change completed.' },
      { step: '03', title: 'VIP Medical & Biometrics', time: 'Days 5 - 7', desc: 'Fast-track 30-min VIP medical fitness test and Emirates ID fingerprinting.' },
      { step: '04', title: 'Residency Visa & EID Delivery', time: 'Days 8 - 10', desc: 'Emirates ID is printed and delivered directly to your doorstep.' }
    ]
  },

  // FAQs Accordion
  faqs: {
    badgeText: 'FREQUENTLY ASKED QUESTIONS',
    title: 'Everything You Need to Know About UAE Family Visas',
    subtext: 'Got questions about salary thresholds, Ejari, or medical tests? We have answers.',
    items: [
    {
      question: "Do I need a minimum salary to sponsor my family in the UAE?",
      answer: "Yes — AED 4,000 per month (or AED 3,000 per month if your employer provides free housing) is required to sponsor your spouse and children. Sponsoring parents requires a minimum monthly salary of AED 10,000 and a registered 2-bedroom rental contract (EJARI)."
    },
    {
      question: "Can my family stay inside the UAE while their visa is processed?",
      answer: "Yes. If your family members hold a valid visit visa, tourist visa, or previous cancelled visa, we perform an in-country Status Change so they never need to exit the UAE."
    },
    {
      question: "How much do you charge for family visa processing?",
      answer: "We operate on a transparent fixed service retainer fee per applicant, agreed in writing before work begins. All statutory government charges (GDRFA, ICP, Medical Check, Emirates ID) are passed on at cost with official government receipts."
    },
    {
      question: "Which emirates do your visa services cover?",
      answer: "We cover all seven UAE emirates: Dubai (GDRFA), Abu Dhabi (ICP), Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain, with dedicated PRO concierges in each jurisdiction."
    },
    {
      question: "What documents need to be officially attested?",
      answer: "Foreign Marriage Certificates (for spouse sponsorship) and Birth Certificates (for children sponsorship) must be legalized in your home country and stamped by the UAE Ministry of Foreign Affairs (MOFA)."
    },
    {
      question: "Can female residents sponsor their family in Dubai?",
      answer: "Yes! Female residents working in professional roles (such as engineers, doctors, teachers, executives, or managers) earning a minimum salary of AED 10,000 (or AED 8,000 + housing) can sponsor their husband and children."
    }
  ]
  },

  // Reviews Marquee
  reviews: {
    badgeText: 'VERIFIED REVIEWS',
    title: 'What Families Say About Our PRO Advisory',
    subtext: 'Over 500+ five-star reviews on Google & Trustpilot.',
    items: [
  {
    name: "Alexander Volkov",
    role: "Golden Visa Resident",
    rating: 5,
    date: "August 2026",
    comment: "Super easy service! Got Golden Visas for my wife and 3 kids completely over WhatsApp. No typing center visits needed!"
  },
  {
    name: "Sarah Jenkins",
    role: "Corporate Manager",
    rating: 5,
    date: "September 2026",
    comment: "Honest and transparent pricing. They gave me official government receipts for everything. 100% recommended!"
  },
  {
    name: "Mohammed Al-Otaibi",
    role: "Property Investor",
    rating: 5,
    date: "July 2026",
    comment: "800 DOCS handles everything smoothly. Sponsoring my parents was completely stress-free."
  }
]
  },

  // Final CTA Banner
  cta: {
    badgeText: 'START YOUR APPLICATION',
    headline: 'Ready to Sponsor Your Family in the UAE?',
    subtext: 'Get an itemized fee breakdown in 30 seconds or chat with a Senior PRO Consultant now.',
    ctaPrimary: 'Calculate Family Visa Fees',
    ctaSecondary: 'WhatsApp Senior Advisor (+971 50 123 4567)'
  },

  // Homepage Section Order & Visibility
  homepageSectionOrder: [
    'hero', 'stats', 'achievements', 'problems', 'services', 
    'packages', 'whyUs', 'process', 'faqs', 'reviews', 'blog', 'cta'
  ],
  sectionVisibility: {
    hero: true, stats: true, achievements: true, problems: true,
    services: true, packages: true, whyUs: true, process: true,
    faqs: true, reviews: true, blog: true, cta: true
  },

  // Footer CMS (editable via Footer Editor)
  footer: {
    logoIcon: 'PV',
    logoSubtext: 'DUBAI',
    brandTitle: 'PropertyVisaDubai',
    brandSubtitle: 'operated by brightlink',
    tagline: 'Calculate your exact government fees in seconds, or text us on WhatsApp — a friendly visa specialist replies in minutes.',
    copyrightText: '© 2026 PropertyVisa Dubai. All rights reserved. Operated by Brightlink Management Consultancy.',
    servicesColHeading: 'Residency Services',
    legalColHeading: 'Platform & Legal',
    contactColHeading: 'Advisory Desk & HQ',
    portals: [
      { label: 'icp.gov.ae', url: 'https://icp.gov.ae' },
      { label: 'gdrfad.gov.ae', url: 'https://www.gdrfad.gov.ae' },
      { label: 'u.ae', url: 'https://u.ae' }
    ],
    legalLinks: [
      { label: 'Homepage', view: 'home' },
      { label: 'Visa Calculator', view: 'calculator' },
      { label: 'Residency Guides', view: 'blog-index' },
      { label: 'About Us', view: 'about' },
      { label: 'Terms & Privacy', view: 'privacy' }
    ],
    madeWithText: 'Made with ♥ in Dubai, UAE',
    bottomBadge: 'Licensed PRO Document Clearing • DED Business Registration',
    disclaimer: 'Propertyvisadubai.ae is operated by Brightlink Management Consultancy LLC, a private third-party service provider licensed in Dubai. We are not a government authority and have no affiliation with, or endorsement from, the Government of the UAE or any of its departments. We assist customers with visa-related typing, documentation, application filling and submission through the relevant official channels (GDRFA Dubai, ICP, MOFA), acting on the customer\'s behalf and with their consent. Government fees are set by the authorities and paid to them; our service fee is charged separately and disclosed before any commitment. Applicants can complete the same applications directly through the official portals: icp.gov.ae, gdrfad.gov.ae, u.ae. Estimates shown are for information only and do not constitute legal advice. Content last reviewed 01-09-2026.',
    referralTitle: 'Grow Together With Our B2B Referral Program',
    referralDesc: 'Partner with us through our structured B2B and Corporate Referral Program.',
    referralBtn: 'Become a Referral Partner'
  },

  // Navigation Links
  navbarLinks: [
    { id: 'nav-1', label: 'Home', view: 'home', visible: true },
    { id: 'nav-2', label: 'Articles', view: 'blog-index', visible: true },
    { id: 'nav-3', label: 'About Us', view: 'about', visible: true }
  ],

  // Inner Pages CMS
  pages: {
    about: {
      headline: 'We Are 800 DOCS LLC SOC',
      subtext: 'On your side, working on your behalf. Providing 100% online family residency documentation advisory across Dubai, Abu Dhabi, and the UAE.',
      licensedEntity: 'Registered as 800 DOCS LLC SOC in Dubai, UAE under Commercial Registration for document clearing services.'
    },
    contact: {
      headline: 'Get in Touch with Family Visa Specialists',
      subtext: 'Connect directly on WhatsApp or visit our Dubai advisory desk at Business Village.',
      address: 'Suite 402, Block B, Business Village, Deira, Clock Tower Roundabout, Dubai, UAE',
      phone: '+971 4 220 8899',
      email: 'advisory@familyvisa.ae',
      hours: 'Mon - Sat: 8:00 AM - 7:00 PM (GST)'
    },
    pricing: {
      headline: 'Transparent Govt Tariffs & Advisory Pricing',
      subtext: 'No hidden typing fees. Government statutory charges billed at cost with an unbundled advisory retainer.'
    },
    checklist: {
      headline: 'Official GDRFA & ICP Required Documents Checklist',
      subtext: 'Ensure your file passes government compliance audit on the first submission.'
    },
    locations: {
      dubai: 'Suite 402, Block B, Business Village, Deira, Dubai',
      abuDhabi: 'Al Maqam Tower, ADGM Square, Maryah Island, Abu Dhabi'
    },
    terms: {
      headline: 'Terms of Service & Regulatory Disclosures',
      body: 'FamilyVisa.ae is an independent document clearing consultancy operated by 800 DOCS LLC SOC...'
    }
  }
};

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'log-801',
    timestamp: '2026-09-22 18:45:12',
    userName: 'Tariq Al-Mansoori',
    userRole: 'SUPER_ADMIN',
    ipAddress: '194.170.82.11 (Dubai, UAE)',
    action: 'TARIFF_UPDATE',
    entityType: 'Tariff',
    entityId: 'ENTRY_PERMIT_INSIDE',
    diff: 'Govt Fee adjusted from AED 1,100 to AED 1,150'
  },
  {
    id: 'log-802',
    timestamp: '2026-09-22 17:30:04',
    userName: 'Elena Rostova',
    userRole: 'LEGAL_PRO_CONSULTANT',
    ipAddress: '185.220.101.4 (Dubai, UAE)',
    action: 'STAGE_ADVANCE',
    entityType: 'Dossier',
    entityId: 'DOS-2026-041',
    diff: 'Stage moved from COMPLIANCE_AUDIT -> GOVERNMENT_FILING'
  },
  {
    id: 'log-803',
    timestamp: '2026-09-22 16:12:49',
    userName: 'Sarah Jenkins',
    userRole: 'SEO_CONTENT_EDITOR',
    ipAddress: '82.165.19.44 (London, UK)',
    action: 'CMS_PUBLISH',
    entityType: 'Article',
    entityId: 'uae-golden-visa-rules-2026',
    diff: 'Article status published & JSON-LD schema generated'
  }
];
