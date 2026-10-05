export const servicesDatabase = {
  "property-visa": {
    hero: {
      headline: "Secure Your 10-Year UAE Golden Visa Through Real Estate",
      subheadline: "Own property worth AED 2,000,000+? Fast-track your family's 10-year residency with zero mortgages restrictions and 100% online DLD processing.",
      badge: "DLD Approved Partner",
      widgetType: "DLDValuationCalculator"
    },
    options: [
      { title: "2-Year Property Visa", subtitle: "Entry-Level Real Estate", price: "AED 750,000+", features: ["Valid for ready properties only", "Mortgage allowed (50% paid)", "Sponsor family members"] },
      { title: "10-Year Golden Visa", subtitle: "VIP Long-Term Residency", price: "AED 2,000,000+", features: ["Off-plan properties accepted", "Combine up to 3 title deeds", "No continuous stay requirement"] }
    ],
    documents: [
      { category: "Property Owner", items: ["Original Title Deed (or Oqood for off-plan)", "Passport Copy & High-Res Photo", "Current UAE Visa (if applicable)", "Bank Mortgage NOC (if mortgaged)"] },
      { category: "Dependents", items: ["Attested Marriage Certificate", "Birth Certificates for Children", "Passport Copies & Photos"] }
    ],
    fees: {
      breakdown: [
        { label: "DLD Golden Visa Nomination", amount: "AED 9,800" },
        { label: "VIP Medical Fitness Test", amount: "AED 750" },
        { label: "Emirates ID (10 Years)", amount: "AED 1,150" }
      ],
      agencyFee: "AED 3,000",
      totalEstimate: "AED 14,700"
    },
    process: [
      { step: 1, title: "Title Deed Audit", description: "We verify your DLD records and secure pre-approval from the land department." },
      { step: 2, title: "ICP Nomination", description: "Your file is submitted to GDRFA/ICP for the official Golden Visa nomination." },
      { step: 3, title: "VIP Medical", description: "A 30-minute fast-track medical fitness test at an executive lounge." },
      { step: 4, title: "Card Delivery", description: "Your 10-Year Emirates ID is delivered securely to your doorstep." }
    ],
    faqs: [
      { question: "Can I get a Golden Visa with a mortgaged property?", answer: "Yes, provided you have paid at least AED 2,000,000 of the property's value to the bank or developer, or hold a specific NOC from the bank." },
      { question: "Can I combine multiple properties?", answer: "Yes, you can combine up to 3 properties to reach the AED 2,000,000 threshold." }
    ]
  },

  "golden-visa": {
    hero: {
      headline: "UAE 10-Year Golden Visa: Live & Work Without Limits",
      subheadline: "Exclusive long-term residency for executives, doctors, engineers, and exceptional talents without the need for a local sponsor.",
      badge: "Premium Residency",
      widgetType: "CategoryTrackSelector"
    },
    options: [
      { title: "Executive / Manager", subtitle: "High-Income Earners", price: "Salary AED 30k+", features: ["Valid UAE Employment Contract", "Attested Bachelor's Degree", "6-Month Bank Statement"] },
      { title: "Specialized Talent", subtitle: "Doctors, Engineers, Creatives", price: "MOHAP/DHA Approved", features: ["Valid professional license", "Ministry recommendation letter", "No strict salary cap required"] }
    ],
    documents: [
      { category: "Executive Track", items: ["Labor Contract showing AED 30k+", "Attested University Degree (MOFA)", "6-Month Stamped Bank Statement", "NOC from Current Employer"] }
    ],
    fees: {
      breakdown: [
        { label: "GDRFA Nomination Fee", amount: "AED 150" },
        { label: "Golden Visa Stamping", amount: "AED 2,800" },
        { label: "10-Year Emirates ID", amount: "AED 1,150" }
      ],
      agencyFee: "AED 2,500",
      totalEstimate: "AED 6,600"
    },
    process: [
      { step: 1, title: "Eligibility Audit", description: "We review your degree, labor contract, and bank statements." },
      { step: 2, title: "GDRFA Pre-Approval", description: "We apply for the initial nomination clearance from Dubai Immigration." },
      { step: 3, title: "Status Adjustment", description: "Cancellation of your current visa and status change to Golden Visa." },
      { step: 4, title: "Final Issuance", description: "VIP Medical, Biometrics, and final Emirates ID printing." }
    ],
    faqs: [
      { question: "Do I lose my Golden Visa if I leave my job?", answer: "No. The Golden Visa is self-sponsored. You remain a resident even if you change employers or stay unemployed." }
    ]
  },

  "family-visa": {
    hero: {
      headline: "Bring Your Family to the UAE With 100% Guaranteed SLA",
      subheadline: "End-to-end processing for spouse, children, and parents. We handle the typing, attestations, and medical bookings so you don't have to.",
      badge: "Family Sponsorship",
      widgetType: "FamilyQuotaCalculator"
    },
    options: [],
    documents: [
      { category: "Sponsor (You)", items: ["Original Emirates ID", "Salary Certificate (Min AED 4,000) or Labor Contract", "Valid Ejari (Tenancy Contract)", "3-Month Bank Statement"] },
      { category: "Dependents", items: ["Passport Copies & Photos", "Attested Marriage Certificate (for Spouse)", "Attested Birth Certificates (for Children)"] }
    ],
    fees: {
      breakdown: [
        { label: "File Opening Fee", amount: "AED 260" },
        { label: "Entry Permit", amount: "AED 500" },
        { label: "Status Change", amount: "AED 675" },
        { label: "Medical & Emirates ID", amount: "AED 650" }
      ],
      agencyFee: "AED 1,000",
      totalEstimate: "AED 3,085 (Per Dependent)"
    },
    process: [
      { step: 1, title: "File Opening", description: "Registering you as a sponsor in the GDRFA system." },
      { step: 2, title: "Entry Permit", description: "Issuing the pink visa to allow your family to enter or change status." },
      { step: 3, title: "Medical Escort", description: "Fast-track medical fitness test for dependents over 18." },
      { step: 4, title: "Visa Stamping", description: "Final digital visa and Emirates ID issuance." }
    ],
    faqs: [
      { question: "What is the minimum salary to sponsor a wife and kids?", answer: "AED 4,000 per month, or AED 3,000 plus company-provided accommodation." }
    ]
  },

  "newborn-visa": {
    hero: {
      headline: "Stress-Free UAE Residency For Your Newborn Child",
      subheadline: "Zero hospital visits required. We manage birth notification typing, MOFA attestation, passport registration, and home delivery.",
      badge: "Urgent 120-Day Deadline",
      widgetType: "GracePeriodCountdown"
    },
    options: [],
    documents: [
      { category: "Child", items: ["Hospital Birth Notification", "Passport Size Photos"] },
      { category: "Parents", items: ["Original Passports & Emirates IDs", "Attested Marriage Certificate", "Valid Ejari"] }
    ],
    fees: {
      breakdown: [
        { label: "Birth Certificate & MOFA", amount: "AED 350" },
        { label: "GDRFA Entry Permit & Stamping", amount: "AED 1,150" },
        { label: "Emirates ID (2 Years)", amount: "AED 385" }
      ],
      agencyFee: "AED 900",
      totalEstimate: "AED 2,785"
    },
    process: [
      { step: 1, title: "Birth Certificate", description: "We process the MOHAP birth certificate and MOFA attestation." },
      { step: 2, title: "Passport Issuance", description: "You submit the documents to your embassy for the child's passport." },
      { step: 3, title: "ICP Stamping", description: "We apply for the visa—no medical test or fingerprints required for newborns." },
      { step: 4, title: "Home Delivery", description: "The Emirates ID is delivered to your home." }
    ],
    faqs: [
      { question: "What happens if I pass the 120-day grace period?", answer: "The UAE imposes a fine of AED 50 for every day you exceed the 120-day grace period from the child's date of birth." }
    ]
  },

  "maid-visa": {
    hero: {
      headline: "Legal Domestic Helper & Maid Sponsorship",
      subheadline: "Full MOHRE and immigration compliance for private household nannies, housemaids, and drivers.",
      badge: "Tadbeer Compliant",
      widgetType: "DomesticSalaryGate"
    },
    options: [
      { title: "In-Country Transfer", subtitle: "Maid is already in UAE", price: "Status Change", features: ["Overstay clearing", "Local medical test", "Fast-track processing"] },
      { title: "Overseas Recruitment", subtitle: "Bringing maid from home country", price: "Entry Permit", features: ["Embassy clearance advice", "Airport arrival protocols", "Flight booking assistance"] }
    ],
    documents: [
      { category: "Sponsor", items: ["Salary Certificate (Min AED 25,000) or Golden Visa", "Ejari (Min 2 Bedrooms)", "Passport & EID"] },
      { category: "Helper", items: ["Passport Copy", "White Background Photo", "Visit Visa / Cancelled Visa Copy"] }
    ],
    fees: {
      breakdown: [
        { label: "MOHRE File Opening & Quota", amount: "AED 300" },
        { label: "Government Security Deposit", amount: "AED 2,000 (Refundable)" },
        { label: "Basic Medical Insurance", amount: "AED 800" },
        { label: "Visa Stamping & Labor Contract", amount: "AED 1,200" }
      ],
      agencyFee: "AED 1,500",
      totalEstimate: "AED 5,800"
    },
    process: [
      { step: 1, title: "MOHRE Quota", description: "Applying for domestic worker quota under your sponsorship." },
      { step: 2, title: "Entry Permit", description: "Issuing the visa to allow the helper to enter or change status." },
      { step: 3, title: "Medical & Insurance", description: "Completing DHA medical and binding mandatory health insurance." },
      { step: 4, title: "Labor Contract", description: "Signing the official Tadbeer domestic labor contract and issuing EID." }
    ],
    faqs: [
      { question: "Do Golden Visa holders need a minimum salary to sponsor a maid?", answer: "No, Golden Visa holders are generally exempt from the AED 25,000 minimum salary requirement for domestic staff." }
    ]
  },

  "attestation": {
    hero: {
      headline: "Official MOFA & Global Embassy Document Attestation",
      subheadline: "Authenticate degrees, marriage certificates, and commercial documents with 100% legal compliance from foreign ministries to UAE MOFA.",
      badge: "MOFA Guaranteed",
      widgetType: "GlobalLegalizationPipeline"
    },
    options: [
      { title: "Standard Track", subtitle: "5-7 Working Days", price: "AED 650", features: ["Home Country Ministry Stamp", "UAE Embassy Legalization", "UAE MOFA Final Seal", "Doorstep Pickup & Return"] },
      { title: "Express VIP", subtitle: "24-48 Hours Turnaround", price: "AED 1,200", features: ["Dedicated Embassy Diplomatic Pouch", "Express MOFA Processing", "Real-Time Courier Tracking", "Guaranteed SLA Delivery"] }
    ],
    documents: [
      { category: "Educational Documents", items: ["Original Degree Certificate or Diploma", "Official Marksheets / Transcripts", "Passport Copy of Owner"] },
      { category: "Personal Certificates", items: ["Original Marriage / Birth Certificate", "Passport Copies of Spouses / Child"] }
    ],
    fees: {
      breakdown: [
        { label: "Home Country Foreign Ministry Stamp", amount: "AED 450" },
        { label: "UAE Embassy Legalization", amount: "AED 350" },
        { label: "UAE MOFA Final Verification Stamp", amount: "AED 150" }
      ],
      agencyFee: "AED 650",
      totalEstimate: "AED 1,600"
    },
    process: [
      { step: 1, title: "Document Pickup", description: "Secure physical pickup of original certificates from your home or office." },
      { step: 2, title: "Embassy Clearance", description: "Attestation at the relevant ministry of foreign affairs and UAE embassy." },
      { step: 3, title: "UAE MOFA Stamping", description: "Submission to the UAE Ministry of Foreign Affairs for official legalization." },
      { step: 4, title: "Safe Delivery", description: "Hand delivery of original attested documents back to your doorstep." }
    ],
    faqs: [
      { question: "Are physical original documents required for MOFA attestation?", answer: "Yes, MOFA and foreign embassies require original physical certificates to affix wax seals and holographic stamps." },
      { question: "Can you attest degrees issued outside the UAE?", answer: "Yes, we handle worldwide legalization across 120+ countries including UK, US, India, Pakistan, Canada, and EU." }
    ]
  },

  "legal-translation": {
    hero: {
      headline: "Certified Ministry of Justice Legal Arabic Translation",
      subheadline: "Sworn, court-accepted Arabic translations for official UAE government filings, contracts, degrees, and legal disputes.",
      badge: "MOJ Certified Seal",
      widgetType: "InstantWordEstimator"
    },
    options: [
      { title: "Standard Documents", subtitle: "Certificates & Passports", price: "AED 150 / page", features: ["MOJ Certified Legal Stamp", "Accepted by GDRFA & MOHRE", "Digital PDF + Hard Copy"] },
      { title: "Corporate & Contracts", subtitle: "MOA, Trade Licenses & Lawsuits", price: "AED 180 / page", features: ["Bilingual Legal Terminologies", "Notary Public Ready", "Same-Day Delivery Available"] }
    ],
    documents: [
      { category: "Client Requirements", items: ["Clear PDF Scan or Photo of Source Document", "Correct English/Arabic Spelling of Names as per Passport"] }
    ],
    fees: {
      breakdown: [
        { label: "MOJ Official Stamp & Seal (Per Page)", amount: "AED 150" },
        { label: "Sworn Arabic Translator Certification", amount: "AED 100" }
      ],
      agencyFee: "AED 150",
      totalEstimate: "AED 400"
    },
    process: [
      { step: 1, title: "Digital Upload", description: "Send your document scans via WhatsApp or email for instant quote." },
      { step: 2, title: "Sworn Translation", description: "Licensed Ministry of Justice translator executes the certified translation." },
      { step: 3, title: "MOJ Stamping", description: "Official court seal and translator signature are stamped on paper." },
      { step: 4, title: "Instant Dispatch", description: "Receive digital PDF immediately and physical hard copies via courier." }
    ],
    faqs: [
      { question: "Are your translations accepted by Dubai Courts and GDRFA?", answer: "Yes, 100%. All our legal translations carry certified stamps from licensed UAE Ministry of Justice sworn translators." }
    ]
  },

  "poa": {
    hero: {
      headline: "Bilingual Power of Attorney (POA) & Remote Notarization",
      subheadline: "Legally binding English/Arabic POA drafting and online video notarization via Dubai Courts without traveling to the UAE.",
      badge: "Dubai Courts Notary",
      widgetType: "RemoteVideoWorkflow"
    },
    options: [
      { title: "General POA", subtitle: "Full Representation Authority", price: "AED 1,850", features: ["Government & Business Representation", "Property & Utility Management", "Banking Restrictions Option"] },
      { title: "Property Specific POA", subtitle: "Buying, Selling & Managing", price: "AED 1,600", features: ["DLD Transfer & Title Deed Registration", "Developer NOC Collection", "Bank Cheque Handover Authority"] }
    ],
    documents: [
      { category: "Principal & Attorney", items: ["Principal Passport & Emirates ID / National ID", "Attorney Passport & Emirates ID Copy", "Property Title Deed Copy (for Property POA)"] }
    ],
    fees: {
      breakdown: [
        { label: "Dubai Courts Official Notary Fee", amount: "AED 950" },
        { label: "Bilingual English/Arabic Legal Drafting", amount: "AED 850" }
      ],
      agencyFee: "AED 700",
      totalEstimate: "AED 2,500"
    },
    process: [
      { step: 1, title: "Custom Legal Drafting", description: "Our legal consultants draft a bilingual POA tailored strictly to your instructions." },
      { step: 2, title: "Dubai Courts Verification", description: "We upload the draft and identity credentials to the Dubai Courts Notary portal." },
      { step: 3, title: "Remote Video Call", description: "Attend a 5-minute video notarization session with the Dubai Courts Notary Public." },
      { step: 4, title: "E-Notarized POA Delivery", description: "Receive your digitally signed electronic POA with QR code verification instantly." }
    ],
    faqs: [
      { question: "Can I notarize a POA if I am outside the UAE?", answer: "Yes. Remote video notarization through Dubai Courts allows non-residents to sign POAs abroad via secure identity verification." }
    ]
  },

  "wills-testament": {
    hero: {
      headline: "DIFC & ADJD Non-Muslim Will Registration in Dubai",
      subheadline: "Protect your real estate, bank accounts, corporate assets, and child guardianship under Common Law, overriding default Sharia distribution.",
      badge: "DIFC Courts Registered",
      widgetType: "JurisdictionBento"
    },
    options: [
      { title: "Single Property Will", subtitle: "Real Estate Asset Protection", price: "AED 8,500", features: ["Covers up to 1 UAE Real Estate Asset", "Common Law Inheritance Rules", "DIFC Courts Registration Included"] },
      { title: "Full Comprehensive Will", subtitle: "All UAE Assets & Guardianship", price: "AED 13,500", features: ["Covers all Real Estate, Banks & Shares", "Minor Child Guardianship Clauses", "Mirror Wills Option for Couples"] }
    ],
    documents: [
      { category: "Testator & Beneficiaries", items: ["Testator Passport & Emirates ID", "Passports of Beneficiaries & Executrix", "Title Deeds & UAE Bank Account Statements", "Passports of Nominated Minor Guardians"] }
    ],
    fees: {
      breakdown: [
        { label: "DIFC Courts Official Registry Fee", amount: "AED 10,000" },
        { label: "Bilingual Will Drafting & Legal Review", amount: "AED 3,500" }
      ],
      agencyFee: "AED 1,500",
      totalEstimate: "AED 15,000"
    },
    process: [
      { step: 1, title: "Estate Audit", description: "We analyze your UAE real estate, company shares, bank accounts, and guardianship requirements." },
      { step: 2, title: "Will Drafting", description: "Drafting a bespoke DIFC/ADJD Will compliant with UAE Common Law rules." },
      { step: 3, title: "Pre-Registration", description: "Submitting the draft for formal compliance review by DIFC Courts registry." },
      { step: 4, title: "Registry Hearing", description: "Virtual or in-person signing session at DIFC Courts for final execution." }
    ],
    faqs: [
      { question: "Why do non-Muslim expats need a DIFC Will?", answer: "Without a registered Will, UAE courts apply default Sharia rules to freeze bank accounts and distribute real estate." }
    ]
  },

  "dld-trustee-services": {
    hero: {
      headline: "DLD Trustee Real Estate Conveyancing & Property Transfers",
      subheadline: "Official Dubai Land Department trustee office representation for seamless property sales, title deed transfers, gift transfers (Hiba), and mortgage registrations.",
      badge: "DLD Licensed Trustee",
      widgetType: "DLDTransferCalculator"
    },
    options: [
      { title: "Property Transfer Representation", subtitle: "Buyer & Seller Conveyancing", price: "AED 4,000", features: ["Form F & MOU Drafting", "Developer NOC Clearance", "Trustee Office Escort & Cheque Audit"] },
      { title: "Gift Transfer (Hiba)", subtitle: "Transfer to First-Degree Relative", price: "Reduced DLD Fee (0.125%)", features: ["Family Relationship Attestation", "DLD Special Permission Approval", "Same-Day Title Deed Re-Issuance"] }
    ],
    documents: [
      { category: "Seller & Buyer", items: ["Original Title Deed", "Signed Form F (MOU)", "Developer NOC", "Passports & Emirates IDs of Buyer & Seller", "Manager Cheques for Purchase Price & DLD 4% Fee"] }
    ],
    fees: {
      breakdown: [
        { label: "DLD Official Transfer Fee", amount: "4% of Property Value" },
        { label: "DLD Trustee Office Tariff", amount: "AED 4,200" },
        { label: "Title Deed Electronic Issuance Fee", amount: "AED 580" }
      ],
      agencyFee: "AED 2,500",
      totalEstimate: "AED 7,280 + DLD 4%"
    },
    process: [
      { step: 1, title: "MOU & NOC Verification", description: "Reviewing Form F contract, manager cheques, and developer clearance certificates." },
      { step: 2, title: "Trustee Filing", description: "Submitting buyer and seller files to the DLD Trustee portal." },
      { step: 3, title: "Office Transfer", description: "Executing the physical or digital transfer session at the licensed Trustee Office." },
      { step: 4, title: "Title Deed Dispatch", description: "Instant generation and handover of the new DLD Title Deed." }
    ],
    faqs: [
      { question: "How long does property conveyancing take at a DLD Trustee office?", answer: "Once NOC and manager cheques are ready, the actual transfer session takes approximately 1 hour." }
    ]
  },

  "property-revaluation": {
    hero: {
      headline: "Official DLD Property Revaluation for 10-Year Golden Visa",
      subheadline: "Capitalize on market appreciation. Obtain an official Dubai Land Department Valuation Certificate proving your property equity meets the AED 2,000,000 threshold.",
      badge: "DLD Valuer Partner",
      widgetType: "DLDValuationCalculator"
    },
    options: [
      { title: "Single Property Valuation", subtitle: "Residential / Commercial", price: "AED 4,020", features: ["DLD Official Valuer Site Visit", "Certified Assessment Certificate", "Unlocks Golden Visa Nomination"] }
    ],
    documents: [
      { category: "Property Owner", items: ["Original Title Deed Copy", "DEWA Bill showing active connection", "Owner Passport & Emirates ID", "Building Access Permission for Inspection"] }
    ],
    fees: {
      breakdown: [
        { label: "DLD Official Valuation Certificate Fee", amount: "AED 4,020" },
        { label: "Site Inspection & Municipal Filing", amount: "AED 1,000" }
      ],
      agencyFee: "AED 1,200",
      totalEstimate: "AED 6,220"
    },
    process: [
      { step: 1, title: "DLD Application", description: "Submitting property title deed and DEWA records to the Dubai Land Department valuation unit." },
      { step: 2, title: "Site Inspection", description: "Official DLD valuer visits the property to verify area, fit-out, and market comparable value." },
      { step: 3, title: "Certificate Issuance", description: "DLD generates the official stamped Property Valuation Certificate." },
      { step: 4, title: "Golden Visa Application", description: "We immediately file your nomination for the 10-Year Golden Visa." }
    ],
    faqs: [
      { question: "If I bought a property for AED 1.5M, but it is now worth AED 2M+, do I qualify?", answer: "Yes! An official DLD Property Valuation Certificate proves current market value, enabling Golden Visa eligibility regardless of original purchase price." }
    ]
  },

  "medical-eid": {
    hero: {
      headline: "30-Minute VIP Medical Screening & Smart Salem Emirates ID",
      subheadline: "Skip long queues. Enjoy executive lounge comfort, AI-powered blood and X-ray analysis, 30-minute medical clearance, and biometrics handling.",
      badge: "Smart Salem Partner",
      widgetType: "VIPTierPricing"
    },
    options: [
      { title: "Smart Salem VIP Lounge", subtitle: "30-Minute Results SLA", price: "AED 950", features: ["Executive Lounge Access", "AI-Automated Blood & X-Ray Analysis", "Same-Day DHA Certificate", "Emirates ID Biometrics Escort"] },
      { title: "VIP Home / Office Screening", subtitle: "Chauffeur Mobile Unit", price: "AED 1,850", features: ["Mobile Nurse & X-Ray Van at your door", "Zero travel required", "Priority 2-Hour Result Clearance"] }
    ],
    documents: [
      { category: "Applicant Requirements", items: ["Original Passport", "GDRFA / ICP Visa Entry Permit or Change of Status Paper", "Digital Passport Photo with White Background"] }
    ],
    fees: {
      breakdown: [
        { label: "Smart Salem VIP Medical Screening", amount: "AED 950" },
        { label: "Emirates ID Typing (2-Year)", amount: "AED 385" },
        { label: "Courier Express Card Delivery", amount: "AED 120" }
      ],
      agencyFee: "AED 450",
      totalEstimate: "AED 1,905"
    },
    process: [
      { step: 1, title: "Executive Booking", description: "We schedule your preferred time slot at Smart Salem City Walk, DIFC, or Knowledge Park." },
      { step: 2, title: "Lounge Screening", description: "30-minute painless blood collection and digital chest X-ray in a luxury private suite." },
      { step: 3, title: "DHA Approval", description: "DHA fitness certificate issued electronically within 30-60 minutes." },
      { step: 4, title: "Biometrics & EID", description: "Escorted biometrics capture and express Emirates ID printing." }
    ],
    faqs: [
      { question: "How long does the Smart Salem VIP medical process take?", answer: "The physical appointment takes less than 15 minutes, and your official DHA medical fitness certificate is issued within 30 to 60 minutes." }
    ]
  },

  "check-visa-status-uae": {
    hero: {
      headline: "Instant UAE Visa Status Audit & Overstay Fine Calculator",
      subheadline: "Real-time verification of GDRFA Dubai and ICP Federal residence permits, entry visas, grace period deadlines, and fine calculations.",
      badge: "GDRFA & ICP Direct API",
      widgetType: "OverstayFineCalculator"
    },
    options: [],
    documents: [
      { category: "Audit Requirements", items: ["Passport Number & Expiry Date", "Unified Number (UID) or Visa File Number (if available)"] }
    ],
    fees: {
      breakdown: [
        { label: "GDRFA / ICP Verification API Query", amount: "AED 0 (Free)" },
        { label: "Overstay Fine Settlement Handling (Optional)", amount: "AED 50 / day fine" }
      ],
      agencyFee: "AED 250 (Fine Clearing)",
      totalEstimate: "AED 250 + Overstay Fines"
    },
    process: [
      { step: 1, title: "Passport Input", description: "Enter your passport number, nationality, and expiry date into our secure audit tool." },
      { step: 2, title: "System Query", description: "Our direct portal queries ICP and GDRFA databases for active visa status." },
      { step: 3, title: "Fine Calculation", description: "Calculate exact overstay penalties accrued at AED 50 per day plus exit permit typing." },
      { step: 4, title: "Resolution & Clearance", description: "We assist in paying accumulated fines or securing an outpass to restore legal status." }
    ],
    faqs: [
      { question: "What is the overstay fine rate in the UAE?", answer: "Overstay fines in the UAE are standardized at AED 50 per day for both visit visa holders and expired residence visa holders after grace periods." },
      { question: "How long is the grace period after visa cancellation?", answer: "Residence visa holders receive a 30 to 60-day grace period depending on visa tier (up to 6 months for Golden Visa holders) to modify status or exit." }
    ]
  },

  "emirates-id": {
    hero: {
      headline: "Fast-Track Emirates ID Processing",
      subheadline: "New registrations, renewals, and replacements with VIP medical integration.",
      badge: "VIP Processing",
      widgetType: "EIDServiceTabs"
    },
    options: [],
    documents: [],
    fees: { breakdown: [], agencyFee: "", totalEstimate: "" },
    process: [
      { step: 1, title: "Application Typing", description: "We draft and submit your official ICP smart card application online." },
      { step: 2, title: "ICP Biometrics Appointment", description: "Fast-track fingerprinting and facial biometrics capture at an official ICP center." },
      { step: 3, title: "Application Approval", description: "The Federal Authority reviews your medical and biometrics for final approval." },
      { step: 4, title: "Zajel Courier Delivery", description: "Your physical Emirates ID card is securely delivered to your doorstep." }
    ],
    faqs: []
  },

  "pro-services": {
    hero: {
      headline: "UAE PRO Services — Employee Visas, Work Permits & MOHRE",
      subheadline: "B2B immigration PRO services for UAE companies: new employee visas, renewals, MOHRE work permits, part-time permits and cancellations with transparent government fees.",
      badge: "MOHRE & GDRFA Registered",
      widgetType: "HeroStandard"
    },
    options: [
      { title: "New Employee Visa", subtitle: "Fresh Hire Entry Permit", price: "AED 2,800+", features: ["MOHRE Work Permit Issuance", "GDRFA Entry Permit", "Medical Fitness & Emirates ID", "Labor Contract Drafting"] },
      { title: "Visa Renewal", subtitle: "Existing Employee Renewal", price: "AED 1,500+", features: ["Renewal within grace period", "Medical fitness re-screening", "Updated Emirates ID", "MOHRE contract endorsement"] },
      { title: "Visa Cancellation", subtitle: "Leaving or Terminating", price: "AED 800+", features: ["Proper MOHRE cancellation", "Grace period calculation", "Final exit or status change", "Fine clearance if needed"] }
    ],
    documents: [
      { category: "Company (Employer)", items: ["Valid Trade License Copy", "Establishment Card / Company Stamp", "HR Manager Emirates ID & Passport"] },
      { category: "Employee", items: ["Passport Copy (minimum 6 months validity)", "White Background Photo", "Educational Certificates (for skilled categories)", "Offer Letter or Employment Contract"] }
    ],
    fees: {
      breakdown: [
        { label: "MOHRE Work Permit (Skill Category 1-4)", amount: "AED 300 – 500" },
        { label: "GDRFA Entry Permit Issuance", amount: "AED 540" },
        { label: "Medical Fitness Test", amount: "AED 750" },
        { label: "Emirates ID (2 Year)", amount: "AED 370" }
      ],
      agencyFee: "AED 1,200",
      totalEstimate: "AED 3,160+"
    },
    process: [
      { step: 1, title: "MOHRE Work Permit", description: "We apply for the MOHRE work permit quota and approval for the new employee under your trade license." },
      { step: 2, title: "Entry Permit Issuance", description: "GDRFA entry permit is issued to allow the employee to enter the UAE or change status." },
      { step: 3, title: "Medical & Biometrics", description: "DHA medical fitness test and Emirates ID biometrics captured at an approved Smart Salem center." },
      { step: 4, title: "Visa Stamping & Labor Contract", description: "Official visa stamp in passport, Emirates ID delivered, and MOHRE labor contract signed." }
    ],
    faqs: [
      { question: "What is the minimum salary to sponsor an employee on a standard work visa?", answer: "There is no single minimum, but MOHRE sets wage criteria by skill category. Managers and professionals typically need AED 4,000–8,000+; manual workers have lower thresholds." },
      { question: "Can we process visas for free zone employees?", answer: "Yes, but through the relevant free zone authority (TECOM, JAFZA, DIFC, etc.) rather than MOHRE. We handle both mainland and free zone visa processing." }
    ]
  },

  "amer-center": {
    hero: {
      headline: "Amer Center Dubai: Online Visa Filing Without the Queue",
      subheadline: "We are a licensed private typing and PRO service that submits Dubai residence visa, entry permit, and GDRFA applications through official channels — on your behalf, online, in hours.",
      badge: "GDRFA Authorised Submissions",
      widgetType: "HeroStandard"
    },
    options: [
      { title: "Entry Permit (Family / Visit)", subtitle: "New UAE Entry Visa", price: "AED 540 Gov + fee", features: ["Family, visit & tourist entry", "Online submission", "24–48 hour result", "Status change possible"] },
      { title: "Residence Visa (New & Renewal)", subtitle: "2–10 Year Residency", price: "AED 675 Gov + fee", features: ["Family, employee, investor", "In-country status adjustment", "Medical & EID handling", "Guaranteed SLA"] },
      { title: "Visa Cancellation & Clearance", subtitle: "Overstay & Fine Settlement", price: "AED 200 Gov + fee", features: ["Proper immigration cancellation", "Overstay fine calculation", "Out-pass issuance if needed", "Grace period advisory"] }
    ],
    documents: [
      { category: "Sponsor", items: ["Original Emirates ID", "Salary Certificate or Labor Contract", "Valid Ejari (Tenancy Contract)"] },
      { category: "Applicant", items: ["Passport Copy (6 months validity)", "White Background Passport Photo", "Attested Certificates (if applicable)"] }
    ],
    fees: {
      breakdown: [
        { label: "GDRFA Entry Permit Fee", amount: "AED 540" },
        { label: "Status Change (Inside UAE)", amount: "AED 675" },
        { label: "Visa Stamping", amount: "AED 100" }
      ],
      agencyFee: "AED 500",
      totalEstimate: "AED 1,815+"
    },
    process: [
      { step: 1, title: "Document Preparation", description: "We review your file, advise on any missing documents, and prepare your GDRFA application." },
      { step: 2, title: "Online GDRFA Submission", description: "Your application is submitted through official GDRFA Dubai portals — no physical visit needed." },
      { step: 3, title: "Medical & Biometrics (If Required)", description: "For residence visas, we book and escort your DHA medical fitness test and EID biometrics." },
      { step: 4, title: "Digital Visa & EID Delivery", description: "E-visa confirmation sent to your inbox and Emirates ID physically delivered to your address." }
    ],
    faqs: [
      { question: "What is an Amer center?", answer: "An Amer center is a private service center in Dubai licensed by GDRFA to type and submit Dubai visa and residency applications on behalf of customers." },
      { question: "Is FamilyVisa.ae an Amer center?", answer: "No. We are a private typing and PRO services company. We submit applications through the official GDRFA digital channels on your behalf — you can always apply directly yourself." },
      { question: "Is there an Amer center in Sharjah or Abu Dhabi?", answer: "No. Amer is a Dubai-only GDRFA program. Federal visas (Sharjah, Abu Dhabi, other emirates) are handled through ICP — we process those too." }
    ]
  },

  "iloe-insurance": {
    hero: {
      headline: "Check Your ILOE Insurance Status & Fines — Free",
      subheadline: "Verify your UAE mandatory unemployment insurance subscription and outstanding fines by Emirates ID. Plus an ILOE claim calculator to estimate your 60% salary payout.",
      badge: "MOHRE & ILOE Official",
      widgetType: "HeroWithStatusChecker"
    },
    options: [
      { title: "Category A", subtitle: "Basic Salary ≤ AED 16,000", price: "AED 5 / month", features: ["Covers most private sector employees", "Benefit: 60% of salary", "Capped at AED 10,000/month", "Up to 3 months benefit per claim"] },
      { title: "Category B", subtitle: "Basic Salary > AED 16,000", price: "AED 10 / month", features: ["Higher salary earners", "Benefit: 60% of salary", "Capped at AED 20,000/month", "Up to 3 months benefit per claim"] }
    ],
    documents: [
      { category: "For Status Check", items: ["Emirates ID Number", "Date of Birth"] },
      { category: "For Fine Payment Assistance", items: ["Emirates ID Copy", "Employee Name & Employer Name", "Mobile Number for WhatsApp Results"] }
    ],
    fees: {
      breakdown: [
        { label: "ILOE Fine (Non-Subscription)", amount: "AED 400" },
        { label: "ILOE Fine (Non-Payment 3+ months)", amount: "AED 200" },
        { label: "Monthly Premium (Category A)", amount: "AED 5 + VAT" },
        { label: "Monthly Premium (Category B)", amount: "AED 10 + VAT" }
      ],
      agencyFee: "AED 150 (Fine Clearance Guidance)",
      totalEstimate: "AED 400 + outstanding fines"
    },
    process: [
      { step: 1, title: "Enter Emirates ID", description: "Submit your Emirates ID number and date of birth using our secure checker tool." },
      { step: 2, title: "Status Check", description: "Our team queries the official ILOE/MOHRE system for your subscription status and any outstanding fines." },
      { step: 3, title: "WhatsApp Results", description: "Receive your detailed ILOE status report and fine summary directly on WhatsApp within minutes." },
      { step: 4, title: "Fine Payment & Subscription", description: "If fines exist, we guide you through the ILOE portal to pay and re-subscribe to avoid work permit blocks." }
    ],
    faqs: [
      { question: "What is ILOE insurance in the UAE?", answer: "ILOE (Involuntary Loss of Employment) is the UAE's mandatory unemployment insurance scheme. If you lose your job through no fault of your own, it pays 60% of your average basic salary for up to 3 months." },
      { question: "Who must subscribe to ILOE?", answer: "Most employees in the UAE private sector and federal government must subscribe. Investors, domestic workers, those under 18, and retirees returning to work are generally exempt." },
      { question: "What is the ILOE fine for not subscribing?", answer: "Failing to subscribe by your deadline carries an AED 400 fine. Failing to pay premiums for more than 3 months carries an AED 200 fine. Fines can block new work permits." },
      { question: "How much ILOE compensation will I receive?", answer: "60% of your average basic salary over the 6 months before unemployment — capped at AED 10,000/month (Category A) or AED 20,000/month (Category B), for up to 3 months." }
    ]
  }
};

// Aliases mapping for backward compatibility and alternate slug routing
servicesDatabase["property-golden-visa"] = servicesDatabase["property-visa"];
servicesDatabase["new-born"] = servicesDatabase["newborn-visa"];
servicesDatabase["document-attestation"] = servicesDatabase["attestation"];
servicesDatabase["visa-validity-checker"] = servicesDatabase["check-visa-status-uae"];
servicesDatabase["medical-eid-package"] = servicesDatabase["medical-eid"];
servicesDatabase["power-of-attorney"] = servicesDatabase["poa"];
servicesDatabase["wills-last-testament"] = servicesDatabase["wills-testament"];
servicesDatabase["wills-and-testaments"] = servicesDatabase["wills-testament"];
servicesDatabase["dld-trustee"] = servicesDatabase["dld-trustee-services"];
servicesDatabase["property-revaluation"] = servicesDatabase["property-revaluation"];
servicesDatabase["translation"] = servicesDatabase["legal-translation"];
servicesDatabase["iloe"] = servicesDatabase["iloe-insurance"];
servicesDatabase["amer"] = servicesDatabase["amer-center"];
servicesDatabase["pro"] = servicesDatabase["pro-services"];

export function getServiceBySlug(slug) {
  return servicesDatabase[slug] || servicesDatabase["property-visa"];
}
