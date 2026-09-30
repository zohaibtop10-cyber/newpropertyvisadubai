const fs = require('fs');
let content = fs.readFileSync('src/data/cmsData.js', 'utf8');

const newServices = [
  {
    id: 'emirates-id',
    slug: 'emirates-id',
    title: 'Emirates ID Processing',
    category: 'PRO Services',
    subtitle: 'VIP & Express Identity Card Services',
    heroImage: 'https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=1200&auto=format&fit=crop',
    heroDescription: 'Whether renewing, replacing a lost card, or applying for the first time, our dedicated PRO team ensures your Emirates ID is processed via the VIP channel, skipping the long queues at ICP centers.',
    overview: 'The Emirates ID is the most essential document for residents in the UAE. Let us manage the typing, medical coordination, and biometrics booking for you.',
    eligibility: ['Valid Entry Permit or Residency Visa', 'Original Passport', 'Physical presence in the UAE for biometrics (if applicable)'],
    documents: ['Passport Copy', 'High-res Digital Photo', 'Old Emirates ID (for renewals)'],
    pricing: { breakdown: [{ label: 'ICP Govt Fee', cost: 385 }, { label: 'Typing & PRO VIP', cost: 150 }], totalEstimate: 535 },
    processingTime: '24 to 48 Hours',
    rules: [],
    faqs: [],
    benefits: [
      { title: 'VIP Biometrics Booking', desc: 'We book your fingerprinting slot at premium ICP centers.' },
      { title: 'Doorstep Delivery', desc: 'Your physical Emirates ID card is securely couriered to your home.' }
    ],
    processSteps: [
      { title: 'Document Submission', desc: 'Send us your passport and photo via WhatsApp.' },
      { title: 'ICP Typing', desc: 'We instantly process your application.' },
      { title: 'Biometrics', desc: 'Complete your fingerprints at the VIP center.' },
      { title: 'Delivery', desc: 'Receive the digital ID immediately and physical card within days.' }
    ]
  }
];

const appendStr = newServices.map(s => JSON.stringify(s, null, 2)).join(',\n');
const targetStr = 'export const servicesData = new Proxy(defaultServicesData,';
const idx = content.lastIndexOf('];', content.indexOf(targetStr));

if (idx !== -1) {
  content = content.slice(0, idx) + ',\n' + appendStr + '\n];\n' + content.slice(idx + 2);
  fs.writeFileSync('src/data/cmsData.js', content);
  console.log('Appended emirates-id successfully');
}
