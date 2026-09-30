const fs = require('fs');
let content = fs.readFileSync('src/data/cmsData.js', 'utf8');

const newServices = [
  {
    id: 'family-visa',
    slug: 'family-visa',
    title: 'Family Residence Visa',
    category: 'Family Visa',
    subtitle: 'Sponsor Your Loved Ones in Dubai',
    heroTag: 'MOST POPULAR',
    icon: 'Users',
    heroImage: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1200&auto=format&fit=crop',
    heroDescription: 'Bring your spouse, children, and parents to the UAE with our end-to-end Family Visa services. We handle the complex medical, typing, and attestation requirements so your family can settle in Dubai without stress.',
    overview: 'Sponsoring your family in the UAE is simple when you have the right guidance. We handle everything for you.',
    eligibility: ['Minimum Salary: AED 4,000 per month', 'Attested Marriage/Birth Certificates', 'Ejari in sponsors name'],
    documents: ['Passport copies', 'Photos', 'Salary Certificate', 'Ejari'],
    pricing: { breakdown: [{ label: 'Entry Permit', cost: 1150 }], totalEstimate: 5300 },
    processingTime: '3 to 5 Working Days',
    rules: ['Sponsor must have valid residency', 'Children up to 25 years'],
    faqs: [],
    benefits: [
      { title: 'VIP Medical & Emirates ID', desc: 'Skip the queues with our premium typing.' },
      { title: 'Attestation Support', desc: 'In-house MOFA attestation.' }
    ],
    processSteps: [
      { title: 'Eligibility Check', desc: 'We verify your salary and Ejari.' },
      { title: 'Entry Permit', desc: 'Secure the pink visa.' },
      { title: 'Medical', desc: 'VIP medical test.' },
      { title: 'Visa Stamping', desc: 'Final ICP approval.' }
    ]
  },
  {
    id: 'retirement-visa',
    slug: 'retirement-visa',
    title: '5-Year Retirement Visa',
    category: 'Golden Visa',
    subtitle: 'Retire in Dubai with Peace of Mind',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
    heroDescription: 'A 5-year renewable residency for individuals aged 55 and above. Benefit from Dubais world-class healthcare, zero income tax, and luxurious lifestyle during your retirement.',
    overview: 'Retire in Dubai under the DLD or ICP guidelines.',
    eligibility: ['Aged 55 or older', 'Property worth AED 1M OR Savings of AED 1M OR Monthly income of AED 15,000'],
    documents: ['Passport', 'Title Deed or Bank Statements', 'Health Insurance'],
    pricing: { breakdown: [{ label: 'Medical & EID', cost: 2500 }], totalEstimate: 4000 },
    processingTime: '7 Working Days',
    rules: [], faqs: [],
    benefits: [{ title: 'No Sponsor Required', desc: 'Self-sponsored residency.' }],
    processSteps: [{ title: 'Application', desc: 'Submit financial proof.' }, { title: 'Approval', desc: 'Receive residency.' }]
  },
  {
    id: 'amer-center',
    title: 'Amer Center Services',
    slug: 'amer-center',
    category: 'PRO Services',
    subtitle: 'VIP Amer & GDRFA Processing',
    heroImage: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1200&auto=format&fit=crop',
    heroDescription: 'Skip the queues at traditional Amer centers. We provide VIP typing, direct GDRFA system access, and priority processing for all entry permits, status changes, and fine reductions.',
    overview: '', eligibility: [], documents: [], pricing: { breakdown: [], totalEstimate: 1000 }, processingTime: '24 Hours', rules: [], faqs: [],
    benefits: [{ title: 'No Waiting', desc: 'Direct digital submission.' }],
    processSteps: [{ title: 'Document Review', desc: 'We verify your papers.' }]
  },
  {
    id: 'tourist-visa',
    title: 'Dubai Tourist Visa',
    slug: 'tourist-visa',
    category: 'Visit Visa',
    subtitle: '30 & 60 Days UAE Visit Visas',
    heroImage: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1200&auto=format&fit=crop',
    heroDescription: 'Fast-track your UAE tourist visa. Whether visiting family, exploring Dubai, or attending business meetings, we process 30-day and 60-day entry permits with minimal documentation.',
    overview: '', eligibility: [], documents: [], pricing: { breakdown: [], totalEstimate: 500 }, processingTime: '1 to 2 Days', rules: [], faqs: [],
    benefits: [{ title: 'No Deposit Required', desc: 'For eligible nationalities.' }],
    processSteps: [{ title: 'Passport Copy', desc: 'Send us your passport.' }, { title: 'Visa Issued', desc: 'Receive e-visa via WhatsApp.' }]
  },
  {
    id: 'poa',
    title: 'Power of Attorney (POA)',
    slug: 'poa',
    category: 'Legal Services',
    subtitle: 'Notarized Legal Representation',
    heroImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1200&auto=format&fit=crop',
    heroDescription: 'Draft and notarize a Power of Attorney without leaving your home. We facilitate online Notary Public sessions through the Dubai Courts to authorize someone to manage your property, business, or vehicles.',
    overview: '', eligibility: [], documents: [], pricing: { breakdown: [], totalEstimate: 1500 }, processingTime: '1 Day', rules: [], faqs: [],
    benefits: [{ title: 'Online Notarization', desc: 'Video call with the Notary Public.' }],
    processSteps: [{ title: 'Drafting', desc: 'We write the POA.' }, { title: 'Notary Call', desc: 'Verify identity online.' }]
  },
  {
    id: 'translation',
    title: 'Legal Translation',
    slug: 'translation',
    category: 'Legal Services',
    subtitle: 'Ministry of Justice Approved',
    heroImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200&auto=format&fit=crop',
    heroDescription: 'Certified legal translation from over 50 languages into Arabic or English. Our translations are officially recognized by UAE Courts, Notary Public, DLD, and GDRFA.',
    overview: '', eligibility: [], documents: [], pricing: { breakdown: [], totalEstimate: 150 }, processingTime: '24 Hours', rules: [], faqs: [],
    benefits: [{ title: 'Sworn Translators', desc: 'Approved by the UAE MOJ.' }],
    processSteps: [{ title: 'Submit Document', desc: 'Email us the scan.' }, { title: 'Translate & Stamp', desc: 'We deliver the hard copy.' }]
  },
  {
    id: 'dld-trustee',
    title: 'DLD Trustee Services',
    slug: 'dld-trustee',
    category: 'Property Services',
    subtitle: 'Secure Real Estate Transfers',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    heroDescription: 'Finalize your property buying, selling, or gifting securely through official Dubai Land Department Registration Trustee centers with our VIP escort service.',
    overview: '', eligibility: [], documents: [], pricing: { breakdown: [], totalEstimate: 4200 }, processingTime: '1 Day', rules: [], faqs: [],
    benefits: [{ title: 'Escrow Security', desc: 'Safe fund transfers.' }],
    processSteps: [{ title: 'NOC & Contract', desc: 'Prepare Form F.' }, { title: 'Transfer', desc: 'Visit Trustee office.' }]
  },
  {
    id: 'property-revaluation',
    title: 'Property Revaluation',
    slug: 'property-revaluation',
    category: 'Property Services',
    subtitle: 'DLD Official Valuation for Golden Visa',
    heroImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop',
    heroDescription: 'If you bought your property years ago and its current market value exceeds AED 2 Million, we arrange an official DLD valuation so you can qualify for the 10-Year Golden Visa.',
    overview: '', eligibility: [], documents: [], pricing: { breakdown: [], totalEstimate: 4000 }, processingTime: '3 Days', rules: [], faqs: [],
    benefits: [{ title: 'Golden Visa Eligibility', desc: 'Upgrade your residency.' }],
    processSteps: [{ title: 'Apply to DLD', desc: 'Request official valuator.' }]
  },
  {
    id: 'medical-eid',
    title: 'Medical & Emirates ID',
    slug: 'medical-eid',
    category: 'PRO Services',
    subtitle: 'VIP Express Processing',
    heroImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop',
    heroDescription: 'We book VIP Medical Fitness tests (results in 2 hours) and schedule your Emirates ID biometrics instantly. No more waiting weeks for appointments.',
    overview: '', eligibility: [], documents: [], pricing: { breakdown: [], totalEstimate: 750 }, processingTime: '1 Day', rules: [], faqs: [],
    benefits: [{ title: '2-Hour Results', desc: 'Fast-track medical.' }],
    processSteps: [{ title: 'Booking', desc: 'We schedule the VIP slot.' }]
  },
  {
    id: 'visa-checker',
    title: 'UAE Visa Checker',
    slug: 'visa-checker',
    category: 'PRO Services',
    subtitle: 'Overstay Fines & Status Verification',
    heroImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
    heroDescription: 'Not sure if your visa is valid? Have absconding cases or overstay fines? We check your official status in the ICP/GDRFA systems and provide solutions to clear your file.',
    overview: '', eligibility: [], documents: [], pricing: { breakdown: [], totalEstimate: 0 }, processingTime: 'Instant', rules: [], faqs: [],
    benefits: [{ title: 'Confidential', desc: '100% private checks.' }],
    processSteps: [{ title: 'Provide Passport', desc: 'Send passport copy.' }]
  },
  {
    id: 'iloe-insurance',
    title: 'ILOE Unemployment Insurance',
    slug: 'iloe-insurance',
    category: 'PRO Services',
    subtitle: 'Mandatory UAE Job Loss Cover',
    heroImage: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=1200&auto=format&fit=crop',
    heroDescription: 'Avoid the AED 400 fine. We quickly register you for the mandatory Involuntary Loss of Employment (ILOE) scheme, ensuring full compliance with MOHRE regulations.',
    overview: '', eligibility: [], documents: [], pricing: { breakdown: [], totalEstimate: 60 }, processingTime: '1 Hour', rules: [], faqs: [],
    benefits: [{ title: 'Compliance', desc: 'Avoid MOHRE fines.' }],
    processSteps: [{ title: 'Registration', desc: 'We issue your certificate.' }]
  }
];

const appendStr = newServices.map(s => JSON.stringify(s, null, 2)).join(',\n');
const targetStr = 'export const servicesData = new Proxy(defaultServicesData,';
const idx = content.lastIndexOf('];', content.indexOf(targetStr));

if (idx !== -1) {
  content = content.slice(0, idx) + ',\n' + appendStr + '\n];\n' + content.slice(idx + 2);
  fs.writeFileSync('src/data/cmsData.js', content);
  console.log('Appended successfully');
}
