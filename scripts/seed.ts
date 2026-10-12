import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  projectId: 'propertyvisadubai-web',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// Seed Data definition with explicit markers
export const seedData = {
  siteSettings: [
    {
      id: 'global',
      companyName: 'Licensed UAE Residency Consultancy',
      licenseNumber: 'DET-100234',
      issuingAuthority: 'Dubai Economy and Tourism (DET)',
      address: 'Office 1402, Opal Tower, Business Bay, Dubai, UAE',
      phone: '+971 4 333 4444',
      whatsapp: '971501234567',
      email: 'advisory@clientdomain.ae',
      officeHours: 'Mon-Fri 9:00 AM - 6:00 PM GST',
      authorityLogos: [
        '/logos/dld.png',
        '/logos/icp.png',
        '/logos/gdrfa.png',
        '/logos/det.png',
      ],
      stats: {
        visasProcessed: 15000,
        avgDays: 7,
        complianceRate: 100,
      },
    },
  ],

  calculatorRules: [
    {
      id: 'property',
      routeName: 'Property Residency Visa',
      routeId: 'property',
      thresholdAmount: 2000000,
      governmentFees: [
        { label: 'DLD Admin Fee', amount: 4020 },
        { label: 'Medical Fitness Check', amount: 750 },
        { label: 'Emirates ID Stamping', amount: 563 },
      ],
      serviceFees: [
        { label: 'Consultancy & Processing SLA', amount: 2500 },
      ],
      familyMemberFeePerDependent: 1850,
      timelineDays: 7,
    },
    {
      id: 'golden',
      routeName: '10-Year Golden Visa (Real Estate)',
      routeId: 'property',
      thresholdAmount: 2000000,
      governmentFees: [
        { label: 'ICP Nomination Clearance', amount: 1250 },
        { label: 'DLD Title Deed Audit', amount: 5333 },
        { label: 'VIP Medical & Emirates ID', amount: 1150 },
      ],
      serviceFees: [
        { label: 'Bespoke Advisory & Concierge', amount: 3500 },
      ],
      familyMemberFeePerDependent: 2200,
      timelineDays: 10,
    },
    {
      id: 'family',
      routeName: 'Spouse & Family Visa',
      routeId: 'family',
      thresholdAmount: 4000,
      governmentFees: [
        { label: 'Entry Permit', amount: 1100 },
        { label: 'Status Change', amount: 650 },
        { label: 'Medical & EID', amount: 950 },
      ],
      serviceFees: [
        { label: 'Family Sponsorship Processing', amount: 1500 },
      ],
      familyMemberFeePerDependent: 1500,
      timelineDays: 5,
    },
  ],

  services: [
    {
      id: 'property-visa',
      title: 'Property Residency Visa (2-Year)',
      slug: 'property-visa',
      category: 'property',
      shortDescription: 'Residency for owners of UAE properties valued at AED 750,000 or above.',
      startingFee: 7833,
      governmentFee: 5333,
      serviceFee: 2500,
      timelineDays: 7,
      thresholdAmount: 750000,
      requirements: [
        'Title Deed issued by Dubai Land Department (DLD)',
        'Minimum property value of AED 750,000+',
        'Valid passport with at least 6 months validity',
        'UAE Health Insurance policy',
      ],
      requiredDocs: [
        'Original Title Deed copy',
        'Passport copy',
        'Current UAE visa / entry stamp',
        'Passport photograph (white background)',
      ],
      status: 'active',
    },
    {
      id: 'golden-visa',
      title: '10-Year Golden Visa (Property Investor)',
      slug: 'golden-visa',
      category: 'golden',
      shortDescription: 'Long-term 10-year residency permit for AED 2,000,000+ real estate owners.',
      startingFee: 11233,
      governmentFee: 7733,
      serviceFee: 3500,
      timelineDays: 10,
      thresholdAmount: 2000000,
      requirements: [
        'Total property portfolio value of AED 2,000,000+',
        'Mortgaged property requires NOC from financing bank',
        'Off-plan properties accepted from approved developers',
      ],
      requiredDocs: [
        'DLD Property Valuation certificate',
        'NOC from bank (if mortgaged)',
        'Passport and current visa copy',
      ],
      status: 'active',
    },
    {
      id: 'family-visa',
      title: 'Family Sponsorship Visa',
      slug: 'family-visa',
      category: 'family',
      shortDescription: 'Sponsor your spouse, children, and parents under your UAE residency.',
      startingFee: 4200,
      governmentFee: 2700,
      serviceFee: 1500,
      timelineDays: 5,
      thresholdAmount: 4000,
      requirements: [
        'Sponsor monthly salary >= AED 4,000 (or AED 3,000 + accommodation)',
        'Ejari tenancy contract under sponsor name',
        'Attested marriage/birth certificates',
      ],
      requiredDocs: [
        'Attested Marriage Certificate',
        'Attested Birth Certificate for dependents',
        'Sponsor Salary Certificate & Ejari',
      ],
      status: 'active',
    },
  ],

  faqs: [
    {
      id: 'faq-1',
      question: 'What is the exact title deed requirement for a 10-Year Golden Visa?',
      answer: 'The property must have a purchase value or valuation of AED 2,000,000+ on the official DLD title deed.',
      category: 'Golden Visa',
      order: 1,
      routeSpecific: ['golden-visa', 'property-visa'],
    },
    {
      id: 'faq-2',
      question: 'Can off-plan properties qualify for Golden Visa?',
      answer: 'Yes, provided the property is purchased from an accredited developer and title deed value meets AED 2M+.',
      category: 'Property Visa',
      order: 2,
      routeSpecific: ['property-visa'],
    },
    {
      id: 'faq-3',
      question: 'Are government fees itemized separately from consultancy fees?',
      answer: 'Yes, every client quote details official GDRFA/DLD fees separately from our fixed service fee.',
      category: 'General',
      order: 3,
      routeSpecific: ['all'],
    },
  ],

  testimonials: [
    {
      id: 't-1',
      clientName: 'Marcus Vance',
      clientRole: 'Property Investor',
      companyName: 'Vance Capital',
      quote: 'Seamless 10-year Golden Visa processing. Clear itemized fees with zero surprises.',
      relativeTime: '1 month ago',
      serviceTag: 'Golden Visa',
      googleReviewUrl: 'https://google.com/maps',
      rating: 5,
    },
    {
      id: 't-2',
      clientName: 'Elena Rostova',
      clientRole: 'Homeowner',
      companyName: 'Downtown Dubai Resident',
      quote: 'Handled our entire family visa sponsorship within 6 working days.',
      relativeTime: '2 months ago',
      serviceTag: 'Family Visa',
      googleReviewUrl: 'https://google.com/maps',
      rating: 5,
    },
  ],

  leads: [
    {
      id: 'lead-test-1',
      name: 'Test Client Lead',
      email: 'testclient@example.com',
      phone: '+971 50 999 8888',
      serviceInterest: '10-Year Golden Visa',
      route: 'golden',
      calculatorSnapshot: {
        inputs: { propertyValue: 2500000, familyMembers: 2 },
        governmentFees: [{ label: 'DLD Fee', amount: 5333 }],
        serviceFees: [{ label: 'Service Fee', amount: 3500 }],
        totalAmount: 11033,
      },
      status: 'New',
      notes: ['Submitted via Fee Calculator on Home page'],
      createdAt: new Date().toISOString(),
    },
  ],
};

export async function seedFirestore() {
  console.log('Seeding Firestore documents with tagged seed data...');

  for (const [collectionName, docs] of Object.entries(seedData)) {
    for (const d of docs) {
      const { id, ...data } = d;
      await setDoc(doc(db, collectionName, id), data);
      console.log(`[Seeded] ${collectionName}/${id}`);
    }
  }

  console.log('Seeding finished successfully.');
}

if (typeof process !== 'undefined' && process.env.RUN_SEED === 'true') {
  seedFirestore().catch(console.error);
}
