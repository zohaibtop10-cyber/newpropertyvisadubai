const fs = require('fs');

const dummyData = {
  'pro-services': {
    subtitle: 'The Ultimate Corporate & Individual PRO Support',
    heroDescription: 'Combining insights from top industry leaders, our comprehensive PRO services handle everything from license renewals to golden visa typing. Stop dealing with paperwork and typing centers—let our certified Public Relations Officers fast-track your GDRFA, DED, and MOHRE approvals.',
    benefits: [
      { title: 'Dedicated Account Manager', desc: 'A single point of contact for all your typing, medical, and Emirates ID needs.' },
      { title: 'Doorstep Document Collection', desc: 'We collect and deliver your original documents securely via VIP courier.' },
      { title: 'Government Portal Access', desc: 'We navigate ICP, GDRFA, and MOHRE systems instantly without errors.' },
      { title: 'Zero Rejection Guarantee', desc: 'Pre-audited applications ensure your typing is perfect the first time.' }
    ],
    processSteps: [
      { title: 'Submit Request', desc: 'Send us your requirements via WhatsApp.' },
      { title: 'Document Audit', desc: 'We review your trade license, passport, and Ejari.' },
      { title: 'Payment & Typing', desc: 'We process the statutory fees and submit to GDRFA/DED.' },
      { title: 'Approval & Delivery', desc: 'Receive your approved documents and Emirates ID via courier.' }
    ]
  },
  'spouse-visa': {
    subtitle: 'Sponsor Your Family in Dubai Seamlessly',
    heroDescription: 'Bring your loved ones to the UAE with our end-to-end Family Visa services. Whether you are sponsoring a spouse, child, or parent, we handle the complex medical, typing, and attestation requirements so your family can settle in Dubai without stress.',
    benefits: [
      { title: 'VIP Medical & Emirates ID', desc: 'Skip the queues with our premium typing and escorted medical typing.' },
      { title: 'Ejari & Tawtheeq Guidance', desc: 'Expert assistance in ensuring your housing contracts meet GDRFA standards.' },
      { title: 'Attestation Support', desc: 'In-house MOFA attestation for marriage and birth certificates.' },
      { title: '100% Online Processing', desc: 'No need to visit Amer or typing centers. We process it entirely digitally.' }
    ],
    processSteps: [
      { title: 'Eligibility Check', desc: 'We verify your salary (AED 4000+) and Ejari.' },
      { title: 'Entry Permit Issuance', desc: 'We secure the pink visa allowing your family to enter the UAE.' },
      { title: 'Medical & Biometrics', desc: 'We book your VIP medical test and Emirates ID fingerprinting.' },
      { title: 'Visa Stamping', desc: 'Final ICP approval and digital residence visa issuance.' }
    ]
  },
  'new-born': {
    subtitle: '120-Day Grace Period Hassle-Free Visa',
    heroDescription: 'Just had a baby in the UAE? Avoid overstay fines and late fees. Our specialized Newborn Visa service registers your child with the Ministry of Health, processes the birth certificate attestation, and secures the residency visa seamlessly.',
    benefits: [
      { title: 'Full Hospital-to-Visa Support', desc: 'We guide you from the hospital discharge to the final Emirates ID.' },
      { title: 'Birth Certificate Attestation', desc: 'Direct MOFA attestation for your UAE-issued birth certificate.' },
      { title: 'Urgent Processing Available', desc: 'Beat the 120-day deadline with our 24-hour express typing.' },
      { title: 'No Biometrics Required', desc: 'Infants do not need to visit typing centers for fingerprinting.' }
    ],
    processSteps: [
      { title: 'Birth Certificate Issuance', desc: 'Obtain the stamped certificate from DHA/MOHAP.' },
      { title: 'Passport Issuance', desc: 'Apply for the newborn passport at your embassy.' },
      { title: 'Emirates ID Typing', desc: 'We submit the ICP application directly.' },
      { title: 'Visa Approval', desc: 'The childs residency is digitally linked to your file.' }
    ]
  },
  'maid-visa': {
    subtitle: 'Legal Domestic Worker Sponsorship',
    heroDescription: 'Hire a nanny, maid, or private driver legally in the UAE. We manage the entire Tadbeer and GDRFA process, including drafting the MOHRE domestic worker contract, processing the medical insurance, and finalizing the residency visa.',
    benefits: [
      { title: 'Tadbeer Contract Assistance', desc: 'We ensure your domestic worker contract complies with UAE labor laws.' },
      { title: 'Basic Medical Insurance', desc: 'We issue the mandatory DHA health insurance for your maid.' },
      { title: 'Change of Status', desc: 'Convert tourist visas to domestic worker visas without exiting the country.' },
      { title: 'Refundable Deposit Management', desc: 'We guide you through the government deposit requirements.' }
    ],
    processSteps: [
      { title: 'Initial Approval', desc: 'We apply for the entry permit via GDRFA.' },
      { title: 'Status Change', desc: 'If the maid is in the UAE, we process the inside-country amendment.' },
      { title: 'Medical & Contract', desc: 'We sign the Tadbeer contract and complete the medical fitness test.' },
      { title: 'Final Residency', desc: 'Issuance of the 2-year domestic worker visa.' }
    ]
  },
  'property-visa': {
    subtitle: '2-Year & 10-Year Real Estate Investor Visas',
    heroDescription: 'Leverage your real estate investments. Whether you own a property worth AED 750,000 for a 2-year visa or AED 2 Million for the Golden Visa, our DLD-authorized experts process your title deed audit, property valuation, and residency stamping.',
    benefits: [
      { title: 'Off-Plan & Mortgaged Properties', desc: 'We process visas even if your property is mortgaged or off-plan (if paid > AED 2M).' },
      { title: 'No Age Limit', desc: 'Retirees and senior investors are fully eligible for this category.' },
      { title: 'Sponsor Your Family', desc: 'The investor visa allows you to sponsor your spouse, children, and parents.' },
      { title: 'DLD Cube VIP Processing', desc: 'We accompany you to the DLD Cube for VIP medical and biometrics.' }
    ],
    processSteps: [
      { title: 'Title Deed Audit', desc: 'We review your Oqood or Title Deed for eligibility.' },
      { title: 'DLD Pre-Approval', desc: 'We submit the property valuation request to Dubai Land Department.' },
      { title: 'Medical & Biometrics', desc: 'Visit the DLD Cube for a rapid 2-hour medical test.' },
      { title: 'Visa Issuance', desc: 'Receive your Golden Visa or Investor Visa on the same day.' }
    ]
  },
  'golden-visa': {
    subtitle: 'The Ultimate 10-Year UAE Residency',
    heroDescription: 'Secure your long-term future in Dubai with the 10-Year Golden Visa. Available for property investors, entrepreneurs, specialized talents, and outstanding students. Enjoy unparalleled privileges including sponsoring domestic workers without limits and staying outside the UAE indefinitely.',
    benefits: [
      { title: 'No Sponsor Required', desc: 'You are your own sponsor. Complete freedom to work or live.' },
      { title: '10-Year Validity', desc: 'Long-term stability for you and your entire family.' },
      { title: 'No 6-Month Entry Rule', desc: 'Keep your visa active even if you stay outside the UAE for years.' },
      { title: 'Sponsor Dependents For Life', desc: 'Sponsor male children up to 25 years and unmarried daughters indefinitely.' }
    ],
    processSteps: [
      { title: 'Eligibility Nomination', desc: 'We submit your profile to the relevant ministry (DLD, DED, or DHA) for approval.' },
      { title: 'ICP Pre-Approval', desc: 'Once nominated, we secure the Golden Visa approval from immigration.' },
      { title: 'Medical Fitness', desc: 'A quick medical test for issuance.' },
      { title: 'Golden Visa Stamping', desc: 'Your 10-year residency is issued and linked to your Emirates ID.' }
    ]
  }
};

let content = fs.readFileSync('src/data/cmsData.js', 'utf8');

const regex = /id:\s*["']([^"']+)["']/g;
let match;
const positions = [];
while ((match = regex.exec(content)) !== null) {
  positions.push({ id: match[1], index: match.index });
}

let newContent = content;
let offset = 0;

for (const [id, data] of Object.entries(dummyData)) {
  const objString = `
    subtitle: ${JSON.stringify(data.subtitle)},
    heroDescription: ${JSON.stringify(data.heroDescription)},
    benefits: ${JSON.stringify(data.benefits)},
    processSteps: ${JSON.stringify(data.processSteps)},`;

  // Find the exact object in the source
  const targetIdStr = `id: "${id}"`;
  const targetIdStr2 = `id: '${id}'`;
  
  let targetIndex = newContent.indexOf(targetIdStr);
  if (targetIndex === -1) targetIndex = newContent.indexOf(targetIdStr2);
  
  if (targetIndex !== -1) {
    // Find the end of this line
    const endOfLine = newContent.indexOf('\n', targetIndex);
    newContent = newContent.slice(0, endOfLine + 1) + objString + '\n' + newContent.slice(endOfLine + 1);
  }
}

fs.writeFileSync('src/data/cmsData.js', newContent);
console.log('cmsData.js updated with dummy data!');
