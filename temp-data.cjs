const defaultSiteConfig = {
  brandName: "FamilyVisa.ae",
  domain: "FamilyVisa.ae",
  operatorName: "800 DOCS LLC SOC",
  tagline: "Bring your family to the UAE without the paperwork headache.",
  subtagline: "Calculate your exact government fees in seconds, or text us on WhatsApp — a friendly visa specialist replies in minutes.",
  phone: "+971 56 655 6645",
  phoneRaw: "+971566556645",
  whatsapp: "+971 56 655 6645",
  whatsappRaw: "971566556645",
  email: "info@brightlinkconsulting.ae",
  officeHours: "Mon-Sat: 8:00 AM - 8:00 PM GST",
  address: "709 Business Village B Block, Next to Clock Tower, Port Saeed, Deira, Dubai, UAE",
  accreditation: "Brightlink Management Consultancy",
  officialPortals: [
    { name: "ICP Official Portal", url: "https://icp.gov.ae", label: "icp.gov.ae" },
    { name: "GDRFA Dubai Portal", url: "https://www.gdrfad.gov.ae", label: "gdrfad.gov.ae" },
    { name: "UAE Government Portal", url: "https://u.ae", label: "u.ae" }
  ],
  socialLinks: {
    facebook: "https://www.facebook.com/brightlinkconsulting.uae/",
    twitter: "https://twitter.com/BRIGHTLINKCONS1",
    instagram: "https://www.instagram.com/brightlink.consulting/",
    linkedin: "https://www.linkedin.com/company/brightlink-management-consultancy/"
  },
  languages: [
    { code: "EN", name: "English" },
    { code: "AR", name: "Arabic" },
    { code: "RU", name: "Russian" },
    { code: "DE", name: "Deutsch" },
    { code: "FR", name: "Français" },
    { code: "TR", name: "Türkçe" },
    { code: "ES", name: "Español" },
    { code: "ZH", name: "Chinese" },
    { code: "TL", name: "Tagalog" },
    { code: "HI", name: "Hindi" },
    { code: "UR", name: "Urdu" }
  ]
};

const siteConfig = new Proxy(defaultSiteConfig, {
  get(target, prop) {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('app_cms_config');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.global && parsed.global[prop] !== undefined) {
            return parsed.global[prop];
          }
        } catch (e) {}
      }
    }
    return target[prop];
  }
});

const defaultServicesData = [
  {
    id: 'family-visa',

    subtitle: "Sponsor Your Family in Dubai Seamlessly",
    heroDescription: "Bring your loved ones to the UAE with our end-to-end Family Visa services. Whether you are sponsoring a spouse, child, or parent, we handle the complex medical, typing, and attestation requirements so your family can settle in Dubai without stress.",
    benefits: [{"title":"VIP Medical & Emirates ID","desc":"Skip the queues with our premium typing and escorted medical typing."},{"title":"Ejari & Tawtheeq Guidance","desc":"Expert assistance in ensuring your housing contracts meet GDRFA standards."},{"title":"Attestation Support","desc":"In-house MOFA attestation for marriage and birth certificates."},{"title":"100% Online Processing","desc":"No need to visit Amer or typing centers. We process it entirely digitally."}],
    processSteps: [{"title":"Eligibility Check","desc":"We verify your salary (AED 4000+) and Ejari."},{"title":"Entry Permit Issuance","desc":"We secure the pink visa allowing your family to enter the UAE."},{"title":"Medical & Biometrics","desc":"We book your VIP medical test and Emirates ID fingerprinting."},{"title":"Visa Stamping","desc":"Final ICP approval and digital residence visa issuance."}],
    slug: "spouse-residency-visa",
    title: "Spouse Residence Visa",
    category: "Family Visa",
    shortDesc: "Sponsor your husband or wife for a 2-year UAE residence visa easily online.",
    heroTag: "MOST POPULAR",
    icon: "Heart",
    heroImage: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1200&auto=format&fit=crop",
    overview: "Sponsoring your spouse in the UAE is simple when you have the right guidance. We handle everything for you — from getting the initial entry permit to arranging VIP medical checkups and delivering your Emirates ID.",
    eligibility: [
      "Minimum Salary: AED 4,000 per month (or AED 3,000 if your employer provides free housing).",
      "Marriage Certificate: Must be officially stamped by MOFA in your home country and the UAE.",
      "Rental Contract: Active EJARI in Dubai or Tawtheeq in Abu Dhabi in the sponsor's name.",
      "Sponsor Visa: Must have at least 6 months validity left on your UAE residence visa.",
      "Medical Check: Spouse must pass a routine medical fitness test in the UAE."
    ],
    documents: [
      "Passport copy of sponsor and spouse (valid for at least 6 months)",
      "Official Marriage Certificate (attested + Arabic translation)",
      "EJARI / Tawtheeq rental agreement and recent electricity bill",
      "Salary certificate & 3 months stamped bank statement",
      "Sponsor's Emirates ID copy & labor contract",
      "Passport-size photo with white background"
    ],
    pricing: {
      statutoryGovTariff: 3850,
      advisoryRetainer: 1450,
      totalEstimate: 5300,
      breakdown: [
        { label: "GDRFA / ICP Entry Permit", cost: 1150 },
        { label: "VIP Medical Fitness Test & X-Ray", cost: 750 },
        { label: "Emirates ID (2 Years)", cost: 380 },
        { label: "File Opening & Status Change", cost: 1570 },
        { label: "FamilyVisa.ae Service & Concierge Fee", cost: 1450 }
      ]
    },
    processingTime: {
      standard: "5 to 7 Working Days",
      express: "48 Hours VIP Express"
    },
    rules: [
      "Marriage certificate must have official MOFA stamps before applying.",
      "Wives earning AED 10,000+ per month can also sponsor their husbands.",
      "Your spouse can get a work permit to take a job in the UAE anytime later."
    ],
    faqs: [
      {
        question: "Can a wife sponsor her husband in Dubai?",
        answer: "Yes! A female resident earning at least AED 10,000 per month (or AED 8,000 + housing) can sponsor her husband and children."
      },
      {
        question: "Is an EJARI rental agreement required?",
        answer: "Yes, an official EJARI (Dubai) or Tawtheeq (Abu Dhabi) rental contract is required by immigration."
      }
    ]
  },

  {
    id: "children-visa",
    slug: "children-dependant-visa",
    title: "Children Dependant Visa",
    category: "Family Visa",
    shortDesc: "Sponsor your sons (up to age 25) and daughters (no age limit) for UAE residency.",
    heroTag: "FOR KIDS",
    icon: "Baby",
    heroImage: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=1200&auto=format&fit=crop",
    overview: "Bring your children to live with you in Dubai. You can sponsor sons up to age 25 and unmarried daughters of any age. We take care of birth certificate verification and complete the visa process fast.",
    eligibility: [
      "Sons can be sponsored up to 25 years old (uncapped for university students).",
      "Unmarried daughters can be sponsored with no age limit.",
      "Minimum Sponsor Salary: AED 4,000 per month (or AED 3,000 + housing).",
      "Attested birth certificate showing parent names."
    ],
    documents: [
      "Passport copies of children and parents",
      "Attested Birth Certificates (MOFA stamped)",
      "Parents' valid UAE Residence Visas & Emirates IDs",
      "Registered EJARI rental contract"
    ],
    pricing: {
      statutoryGovTariff: 3450,
      advisoryRetainer: 1250,
      totalEstimate: 4700,
      breakdown: [
        { label: "ICP / GDRFA Dependant Entry Permit", cost: 1100 },
        { label: "Emirates ID Card (2 Years)", cost: 380 },
        { label: "File Opening & Visa Stamping", cost: 1970 },
        { label: "FamilyVisa.ae Service Fee", cost: 1250 }
      ]
    },
    processingTime: {
      standard: "3 to 5 Working Days",
      express: "24 Hours Express"
    },
    rules: [
      "Babies born inside the UAE must have their visa issued within 120 days of birth.",
      "Stepchildren require a simple consent letter from the biological parent."
    ],
    faqs: [
      {
        question: "What is the maximum age to sponsor a son?",
        answer: "Under UAE rules, sons can be sponsored up to 25 years old. Unmarried daughters have no age limit."
      }
    ]
  },

  {
    id: "parents-visa",
    slug: "parents-residency-visa",
    title: "Parents Residence Visa",
    category: "Senior Family",
    shortDesc: "1-Year renewable residence visa to bring your parents to live with you in the UAE.",
    heroTag: "PARENTS CARE",
    icon: "Users",
    heroImage: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?q=80&w=1200&auto=format&fit=crop",
    overview: "Bring your parents to Dubai to live with you under a 1-year renewable visa. We assist with humanitarian approvals, medical insurance, and fast visa issuance.",
    eligibility: [
      "Both father and mother must be sponsored together (unless one parent has passed away or is divorced).",
      "Minimum Sponsor Salary: AED 10,000 per month.",
      "Housing: Minimum 2-Bedroom apartment or villa with EJARI contract.",
      "Mandatory UAE basic health insurance policy for both parents."
    ],
    documents: [
      "Passports of parents and sponsor",
      "Attested proof of relationship (Sponsor's birth certificate)",
      "Death or divorce certificate if sponsoring a single parent",
      "Sponsor's salary certificate & 6 months bank statement"
    ],
    pricing: {
      statutoryGovTariff: 7800,
      advisoryRetainer: 2500,
      totalEstimate: 10300,
      breakdown: [
        { label: "GDRFA File Opening & Approval", cost: 3200 },
        { label: "Refundable Security Deposit", cost: 2500 },
        { label: "VIP Medical Test & Emirates ID", cost: 2100 },
        { label: "FamilyVisa.ae Service Fee", cost: 2500 }
      ]
    },
    processingTime: {
      standard: "7 to 10 Working Days",
      express: "72 Hours Express"
    },
    rules: [
      "Sponsoring both parents together is required unless legal proof shows single parent status."
    ],
    faqs: [
      {
        question: "What salary do I need to sponsor my parents?",
        answer: "You need a minimum monthly salary of AED 10,000 and a registered 2-bedroom home."
      }
    ]
  },

  {
    id: "golden-visa",

    subtitle: "The Ultimate 10-Year UAE Residency",
    heroDescription: "Secure your long-term future in Dubai with the 10-Year Golden Visa. Available for property investors, entrepreneurs, specialized talents, and outstanding students. Enjoy unparalleled privileges including sponsoring domestic workers without limits and staying outside the UAE indefinitely.",
    benefits: [{"title":"No Sponsor Required","desc":"You are your own sponsor. Complete freedom to work or live."},{"title":"10-Year Validity","desc":"Long-term stability for you and your entire family."},{"title":"No 6-Month Entry Rule","desc":"Keep your visa active even if you stay outside the UAE for years."},{"title":"Sponsor Dependents For Life","desc":"Sponsor male children up to 25 years and unmarried daughters indefinitely."}],
    processSteps: [{"title":"Eligibility Nomination","desc":"We submit your profile to the relevant ministry (DLD, DED, or DHA) for approval."},{"title":"ICP Pre-Approval","desc":"Once nominated, we secure the Golden Visa approval from immigration."},{"title":"Medical Fitness","desc":"A quick medical test for issuance."},{"title":"Golden Visa Stamping","desc":"Your 10-year residency is issued and linked to your Emirates ID."}],
    slug: "golden-visa-family-sponsorship",
    title: "10-Year Golden Visa",
    category: "VIP Residency",
    shortDesc: "Long-term 10-year residency for property owners, high earners, and their families.",
    heroTag: "10-YEAR VIP",
    icon: "Crown",
    heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
    overview: "Enjoy the ultimate UAE privilege with a 10-Year Golden Visa. Sponsor your spouse, children of any age, and parents with no minimum salary limits and no 6-month stay restriction.",
    eligibility: [
      "Sponsor holds an active 10-Year UAE Golden Visa.",
      "No age limit for sponsored children.",
      "No salary minimum required to sponsor family members."
    ],
    documents: [
      "Sponsor Golden Visa & Emirates ID Copy",
      "Family member passport copies",
      "Attested marriage and birth certificates"
    ],
    pricing: {
      statutoryGovTariff: 4200,
      advisoryRetainer: 1800,
      totalEstimate: 6000,
      breakdown: [
        { label: "ICP / GDRFA 10-Yr Dependant Permit", cost: 2400 },
        { label: "VIP Express Medical & Emirates ID", cost: 1800 },
        { label: "FamilyVisa.ae Service Fee", cost: 1800 }
      ]
    },
    processingTime: {
      standard: "3 to 4 Working Days",
      express: "24 Hours VIP Express"
    },
    rules: [
      "Golden Visa family members can stay outside the UAE for any length of time without losing residency."
    ],
    faqs: [
      {
        question: "Can Golden Visa holders sponsor children over 25?",
        answer: "Yes! Golden Visa holders can sponsor unmarried sons and daughters of any age."
      }
    ]
  },

  {
    id: "property-visa",

    subtitle: "2-Year & 10-Year Real Estate Investor Visas",
    heroDescription: "Leverage your real estate investments. Whether you own a property worth AED 750,000 for a 2-year visa or AED 2 Million for the Golden Visa, our DLD-authorized experts process your title deed audit, property valuation, and residency stamping.",
    benefits: [{"title":"Off-Plan & Mortgaged Properties","desc":"We process visas even if your property is mortgaged or off-plan (if paid > AED 2M)."},{"title":"No Age Limit","desc":"Retirees and senior investors are fully eligible for this category."},{"title":"Sponsor Your Family","desc":"The investor visa allows you to sponsor your spouse, children, and parents."},{"title":"DLD Cube VIP Processing","desc":"We accompany you to the DLD Cube for VIP medical and biometrics."}],
    processSteps: [{"title":"Title Deed Audit","desc":"We review your Oqood or Title Deed for eligibility."},{"title":"DLD Pre-Approval","desc":"We submit the property valuation request to Dubai Land Department."},{"title":"Medical & Biometrics","desc":"Visit the DLD Cube for a rapid 2-hour medical test."},{"title":"Visa Issuance","desc":"Receive your Golden Visa or Investor Visa on the same day."}],
    slug: "property-investor-residency-visa",
    title: "Property Investor Visa",
    category: "Real Estate",
    shortDesc: "UAE residency for property owners with AED 750k+ (2-Yr) or AED 2M+ (10-Yr) property equity.",
    heroTag: "REAL ESTATE",
    icon: "Building2",
    heroImage: "https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=1200&auto=format&fit=crop",
    overview: "Turn your real estate investment in Dubai into a residency visa. Qualifying properties give you 2-year renewable or 10-year Golden Visa status for you and your family.",
    eligibility: [
      "Minimum Property Equity: AED 750,000 for 2-Year Visa; AED 2,000,000 for 10-Year Golden Visa.",
      "Completed Title Deed or approved off-plan contract (Oqood)."
    ],
    documents: [
      "Original Title Deed / Oqood copy",
      "Investor passport copy",
      "Bank NOC letter if property is mortgaged"
    ],
    pricing: {
      statutoryGovTariff: 6850,
      advisoryRetainer: 1850,
      totalEstimate: 8700,
      breakdown: [
        { label: "DLD Property Valuation & Approval", cost: 3100 },
        { label: "GDRFA Residency Stamp & Entry Permit", cost: 2150 },
        { label: "VIP Medical Test & Emirates ID", cost: 1600 },
        { label: "FamilyVisa.ae Service Fee", cost: 1850 }
      ]
    },
    processingTime: {
      standard: "4 to 6 Working Days",
      express: "48 Hours Express"
    },
    rules: [
      "Mortgaged properties qualify if your paid equity meets the threshold."
    ],
    faqs: [
      {
        question: "Can I combine two properties to reach 2 Million AED?",
        answer: "Yes! You can combine multiple properties under your name in Dubai to qualify."
      }
    ]
  },

  {
    id: "maid-visa",

    subtitle: "Legal Domestic Worker Sponsorship",
    heroDescription: "Hire a nanny, maid, or private driver legally in the UAE. We manage the entire Tadbeer and GDRFA process, including drafting the MOHRE domestic worker contract, processing the medical insurance, and finalizing the residency visa.",
    benefits: [{"title":"Tadbeer Contract Assistance","desc":"We ensure your domestic worker contract complies with UAE labor laws."},{"title":"Basic Medical Insurance","desc":"We issue the mandatory DHA health insurance for your maid."},{"title":"Change of Status","desc":"Convert tourist visas to domestic worker visas without exiting the country."},{"title":"Refundable Deposit Management","desc":"We guide you through the government deposit requirements."}],
    processSteps: [{"title":"Initial Approval","desc":"We apply for the entry permit via GDRFA."},{"title":"Status Change","desc":"If the maid is in the UAE, we process the inside-country amendment."},{"title":"Medical & Contract","desc":"We sign the Tadbeer contract and complete the medical fitness test."},{"title":"Final Residency","desc":"Issuance of the 2-year domestic worker visa."}],
    slug: "domestic-worker-maid-visa",
    title: "Maid & Domestic Helper Visa",
    category: "Household Staff",
    shortDesc: "Official Tadbeer sponsorship for housemaids, nannies, cooks, and drivers.",
    heroTag: "TADBEER APPROVED",
    icon: "Shield",
    heroImage: "https://images.unsplash.com/photo-1581579438747-1dc8d1e2724a?q=80&w=1200&auto=format&fit=crop",
    overview: "Sponsor your housemaid or nanny legally through MOHRE and Tadbeer channels. We manage work permits, medical screenings, labor contracts, and Emirates IDs.",
    eligibility: [
      "Sponsor Minimum Household Salary: AED 25,000 per month.",
      "Registered domestic employment agreement."
    ],
    documents: [
      "Domestic worker original passport",
      "Sponsor passport, visa & Emirates ID",
      "Sponsor salary certificate & 3 months bank statement"
    ],
    pricing: {
      statutoryGovTariff: 5200,
      advisoryRetainer: 1650,
      totalEstimate: 6850,
      breakdown: [
        { label: "MOHRE Entry Permit & Labor Contract", cost: 2100 },
        { label: "VIP Medical Screening & Emirates ID", cost: 1200 },
        { label: "Security Deposit & Labor Approval", cost: 1900 },
        { label: "FamilyVisa.ae Service Fee", cost: 1650 }
      ]
    },
    processingTime: {
      standard: "5 to 7 Working Days",
      express: "48 Hours VIP Express"
    },
    rules: [
      "Domestic workers undergo mandatory medical testing for communicable diseases."
    ],
    faqs: [
      {
        question: "How long does maid visa processing take?",
        answer: "Most maid entry permits are issued within 48 to 72 hours online."
      }
    ]
  },

  {
    id: 'new-born-visa',

    subtitle: "120-Day Grace Period Hassle-Free Visa",
    heroDescription: "Just had a baby in the UAE? Avoid overstay fines and late fees. Our specialized Newborn Visa service registers your child with the Ministry of Health, processes the birth certificate attestation, and secures the residency visa seamlessly.",
    benefits: [{"title":"Full Hospital-to-Visa Support","desc":"We guide you from the hospital discharge to the final Emirates ID."},{"title":"Birth Certificate Attestation","desc":"Direct MOFA attestation for your UAE-issued birth certificate."},{"title":"Urgent Processing Available","desc":"Beat the 120-day deadline with our 24-hour express typing."},{"title":"No Biometrics Required","desc":"Infants do not need to visit typing centers for fingerprinting."}],
    processSteps: [{"title":"Birth Certificate Issuance","desc":"Obtain the stamped certificate from DHA/MOHAP."},{"title":"Passport Issuance","desc":"Apply for the newborn passport at your embassy."},{"title":"Emirates ID Typing","desc":"We submit the ICP application directly."},{"title":"Visa Approval","desc":"The childs residency is digitally linked to your file."}],
    slug: "newborn-baby-residence-visa",
    title: "Newborn Baby Visa",
    category: "Infants",
    shortDesc: "Get your baby's UAE residence visa processed within the 120-day birth rule.",
    heroTag: "NEWBORN CARE",
    icon: "Baby",
    heroImage: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1200&auto=format&fit=crop",
    overview: "Parents in the UAE have 120 days from their baby's birth to issue their residence visa. We handle birth certificate stamps, typing, and Emirates ID delivery.",
    eligibility: [
      "Baby born inside the UAE.",
      "Both parents hold valid UAE Residence Visas.",
      "Application filed within 120 days of birth."
    ],
    documents: [
      "UAE Ministry of Health attested birth certificate",
      "Baby's passport (from home country embassy)",
      "Parents' passports, Emirates IDs & marriage certificate"
    ],
    pricing: {
      statutoryGovTariff: 2850,
      advisoryRetainer: 1150,
      totalEstimate: 4000,
      breakdown: [
        { label: "GDRFA File Opening & Entry Permit", cost: 1400 },
        { label: "Emirates ID Card (2 Years)", cost: 380 },
        { label: "Residency Stamping Fee", cost: 1070 },
        { label: "FamilyVisa.ae Service Fee", cost: 1150 }
      ]
    },
    processingTime: {
      standard: "2 to 3 Working Days",
      express: "24 Hours Express"
    },
    rules: [
      "Filing after 120 days incurs a daily fine of AED 100 per day."
    ],
    faqs: [
      {
        question: "What is the penalty for late newborn visa filing?",
        answer: "A fine of AED 100 per day applies if the visa is not stamped within 120 days of birth."
      }
    ]
  },

  {
    id: "emirates-id",
    slug: "emirates-id-services-renewal",
    title: "Emirates ID Services & Renewal",
    category: "ID Cards",
    shortDesc: "Fast online typing for new Emirates ID, renewals, and lost card replacements.",
    heroTag: "EXPRESS TYPING",
    icon: "FileText",
    heroImage: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop",
    overview: "Fast online typing and biometrics appointment booking for new Emirates IDs, 2-year / 10-year renewals, and lost card replacements.",
    eligibility: [
      "Valid UAE Entry Permit or Residence Visa.",
      "Attending biometrics center if needed for first-time applicants."
    ],
    documents: [
      "Passport copy",
      "Current Emirates ID copy (for renewal)",
      "Digital passport photo"
    ],
    pricing: {
      statutoryGovTariff: 380,
      advisoryRetainer: 250,
      totalEstimate: 630,
      breakdown: [
        { label: "ICP Official Emirates ID Fee", cost: 380 },
        { label: "FamilyVisa.ae Online Typing Fee", cost: 250 }
      ]
    },
    processingTime: {
      standard: "2 to 3 Working Days",
      express: "24 Hours VIP"
    },
    rules: [
      "Emirates ID is mandatory for banking, property rental, and healthcare in the UAE."
    ],
    faqs: [
      {
        question: "How do I replace a lost Emirates ID?",
        answer: "We file an official ICP replacement application and schedule biometrics if required."
      }
    ]
  },

  {
    id: "attestation",
    slug: "document-legalization-attestation",
    title: "Document Attestation & MOFA",
    category: "Attestation",
    shortDesc: "Official legalization for marriage certificates, birth certificates, and degrees.",
    heroTag: "MOFA STAMPED",
    icon: "FileCheck",
    heroImage: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop",
    overview: "Before submitting family visa files, foreign documents must have official stamps from your home country and the UAE Ministry of Foreign Affairs (MOFA).",
    eligibility: [
      "Original certificate issued by government authority.",
      "Certified Arabic translation."
    ],
    documents: [
      "Original certificate (Marriage / Birth / Degree)",
      "Passport copy of owner"
    ],
    pricing: {
      statutoryGovTariff: 850,
      advisoryRetainer: 450,
      totalEstimate: 1300,
      breakdown: [
        { label: "MOFA UAE Official Stamp Fee", cost: 500 },
        { label: "Sworn Arabic Translation", cost: 350 },
        { label: "Courier Pick-Up & Delivery Fee", cost: 450 }
      ]
    },
    processingTime: {
      standard: "3 to 4 Working Days",
      express: "24 Hours Express Courier"
    },
    rules: [
      "Documents must be stamped in your home country before MOFA UAE stamping."
    ],
    faqs: [
      {
        question: "Is marriage certificate attestation mandatory?",
        answer: "Yes! Foreign marriage certificates must be attested by MOFA before immigration approves family visas."
      }
    ]
  },

  {
    id: "legal-translation",
    slug: "legal-translation-dld-trustee",
    title: "Legal Translation & DLD Trustee",
    category: "Legal Translation",
    shortDesc: "Certified Arabic translation by Ministry of Justice translators and DLD Trustee services.",
    heroTag: "SWORN ARABIC",
    icon: "FileText",
    heroImage: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop",
    overview: "Certified legal translations into Arabic for foreign contracts, marriage certificates, wills, and power of attorney documents accepted by all UAE ministries.",
    eligibility: [
      "Any foreign language legal document."
    ],
    documents: [
      "Original document copy"
    ],
    pricing: {
      statutoryGovTariff: 350,
      advisoryRetainer: 200,
      totalEstimate: 550,
      breakdown: [
        { label: "Ministry of Justice Sworn Legal Stamp", cost: 350 },
        { label: "FamilyVisa.ae Translation Fee", cost: 200 }
      ]
    },
    processingTime: {
      standard: "24 Hours",
      express: "Same Day Express"
    },
    rules: [
      "Must be completed by a Ministry of Justice licensed legal translator."
    ],
    faqs: [
      {
        question: "Are English documents accepted by immigration?",
        answer: "Passports are accepted in English, but marriage and birth certificates require official Sworn Arabic Translation."
      }
    ]
  },

  {
    id: "pro-services",

    subtitle: "The Ultimate Corporate & Individual PRO Support",
    heroDescription: "Combining insights from top industry leaders, our comprehensive PRO services handle everything from license renewals to golden visa typing. Stop dealing with paperwork and typing centers—let our certified Public Relations Officers fast-track your GDRFA, DED, and MOHRE approvals.",
    benefits: [{"title":"Dedicated Account Manager","desc":"A single point of contact for all your typing, medical, and Emirates ID needs."},{"title":"Doorstep Document Collection","desc":"We collect and deliver your original documents securely via VIP courier."},{"title":"Government Portal Access","desc":"We navigate ICP, GDRFA, and MOHRE systems instantly without errors."},{"title":"Zero Rejection Guarantee","desc":"Pre-audited applications ensure your typing is perfect the first time."}],
    processSteps: [{"title":"Submit Request","desc":"Send us your requirements via WhatsApp."},{"title":"Document Audit","desc":"We review your trade license, passport, and Ejari."},{"title":"Payment & Typing","desc":"We process the statutory fees and submit to GDRFA/DED."},{"title":"Approval & Delivery","desc":"Receive your approved documents and Emirates ID via courier."}],
    slug: "pro-services-dubai",
    title: "Corporate & Individual PRO Services",
    category: "PRO Services",
    shortDesc: "End-to-end PRO management, trade license renewals, labour cards, and government approvals.",
    heroTag: "CORPORATE PRO",
    icon: "Briefcase",
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    overview: "Dedicated PRO representation at GDRFA, MOHRE, DED, and Ministry of Economy. We handle trade license renewals, establishment card updates, labor quotas, and employee residency filings with door-to-door courier service across Dubai.",
    eligibility: [
      "Mainland, Freezone, or Offshore companies operating in the UAE.",
      "Individuals requiring dedicated government relations management."
    ],
    documents: [
      "Trade License copy & Establishment Card",
      "Company Memorandum of Association (MOA)",
      "Passport & Emirates ID copy of Authorized Signatory",
      "Tenancy Contract (Ejari) for office space"
    ],
    pricing: {
      statutoryGovTariff: 1200,
      advisoryRetainer: 800,
      totalEstimate: 2000,
      breakdown: [
        { label: "MOHRE / GDRFA Government Processing", cost: 1200 },
        { label: "Dedicated PRO & Courier Doorstep Service", cost: 800 }
      ]
    },
    processingTime: {
      standard: "2 to 3 Working Days",
      express: "24 Hours VIP Express"
    },
    rules: [
      "Establishment cards must be renewed annually to maintain visa processing capabilities.",
      "Labor quotas require active company bank account verification."
    ],
    faqs: [
      {
        question: "Do you offer monthly PRO retainer packages for business?",
        answer: "Yes! We provide dedicated corporate PRO retainer plans for startups and enterprises with unlimited monthly filings."
      }
    ]
  },

  {
    id: "business-setup",
    slug: "uae-business-setup-company-formation",
    title: "Business Setup & Company Formation",
    category: "Business Setup",
    shortDesc: "Form your Dubai Mainland or Free Zone company with 100% foreign ownership and instant visa allocations.",
    heroTag: "100% OWNERSHIP",
    icon: "Building",
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    overview: "Launch your business in Dubai with zero hassle. We handle trade name reservation, initial approval, MOA drafting, DED license issuance, and investor visa quotas in Mainland & Free Zones.",
    eligibility: [
      "Individual investors or international corporate entities.",
      "Valid passport with at least 6 months validity."
    ],
    documents: [
      "Passport copies of shareholders and managers",
      "Proposed company name options (3 options)",
      "Proof of address / Utility bill"
    ],
    pricing: {
      statutoryGovTariff: 12500,
      advisoryRetainer: 2500,
      totalEstimate: 15000,
      breakdown: [
        { label: "DED / Freezone License Fee & Name Reservation", cost: 9500 },
        { label: "Establishment Card & Investor Quota", cost: 3000 },
        { label: "Company Formation Concierge & Legal Drafting", cost: 2500 }
      ]
    },
    processingTime: {
      standard: "3 to 5 Working Days",
      express: "24 Hours Instant License"
    },
    rules: [
      "Mainland companies now support 100% foreign ownership for over 1,000 commercial activities.",
      "Freezone licenses include flexi-desk and investor visa eligibility."
    ],
    faqs: [
      {
        question: "Can I get a UAE Investor Visa with a new company license?",
        answer: "Yes! A new company formation entitles you to 2-year renewable or 10-year Golden investor visas for owners and managers."
      }
    ]
  },

  {
    id: "power-of-attorney",
    slug: "power-of-attorney-notary-services",
    title: "Power of Attorney (POA) & Notary Services",
    category: "Legal Services",
    shortDesc: "Drafting, legal translation, and notary public attestation for General & Special Power of Attorney.",
    heroTag: "NOTARY APPROVED",
    icon: "Scale",
    heroImage: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop",
    overview: "Draft legally binding General or Special Power of Attorney documents for property management, vehicle sales, business management, and family affairs with official Dubai Courts & MOJ notarization.",
    eligibility: [
      "Principals holding valid passport or Emirates ID.",
      "Bilingual English/Arabic draft required for UAE courts."
    ],
    documents: [
      "Passport / Emirates ID of Principal and Agent",
      "Title Deed / Vehicle Registration (for special POA)"
    ],
    pricing: {
      statutoryGovTariff: 950,
      advisoryRetainer: 550,
      totalEstimate: 1500,
      breakdown: [
        { label: "Dubai Courts / MOJ Notary Fee", cost: 950 },
        { label: "Bilingual Drafting & Legal Translation", cost: 550 }
      ]
    },
    processingTime: {
      standard: "1 to 2 Working Days",
      express: "Same-Day E-Notary"
    },
    rules: [
      "UAE E-Notary allows remote online notarization via video call for UAE residents."
    ],
    faqs: [
      {
        question: "Can I issue a Power of Attorney while residing outside the UAE?",
        answer: "Yes! We handle overseas POA attestation starting from your local UAE Embassy to UAE MOFA legalization."
      }
    ]
  },

  {
    id: "wills-testament",
    slug: "wills-estate-planning-dubai",
    title: "Wills & Estate Planning",
    category: "Legal Services",
    shortDesc: "Protect your assets, real estate, and guardianship rights with DIFC & Dubai Courts registered wills.",
    heroTag: "ASSET PROTECTION",
    icon: "FileCheck",
    heroImage: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop",
    overview: "Secure your family's future and safeguard your property, bank accounts, and child guardianship in the UAE with official DIFC Wills Service Centre or Dubai Courts registration for Non-Muslims.",
    eligibility: [
      "Non-Muslim UAE residents or foreign property owners.",
      "Must be over 21 years of age."
    ],
    documents: [
      "Passport copies of testator, beneficiaries, and executors",
      "Title deeds & bank account details to be covered"
    ],
    pricing: {
      statutoryGovTariff: 10000,
      advisoryRetainer: 2500,
      totalEstimate: 12500,
      breakdown: [
        { label: "DIFC Courts Official Registration Fee", cost: 10000 },
        { label: "Legal Drafting & Guardianship Clause Advisory", cost: 2500 }
      ]
    },
    processingTime: {
      standard: "5 to 7 Working Days",
      express: "48 Hours Urgent DIFC Filing"
    },
    rules: [
      "DIFC registered wills allow complete freedom of asset distribution without Sharia default rules."
    ],
    faqs: [
      {
        question: "Why do non-Muslim expats need a registered Will in Dubai?",
        answer: "Without a registered Will, bank accounts and property in the UAE may be frozen according to standard court probate procedures."
      }
    ]
  },

  {
    id: "health-insurance",
    slug: "uae-family-health-insurance-dha",
    title: "Health & Medical Insurance",
    category: "Insurance",
    shortDesc: "Compliant DHA & Abu Dhabi DOH basic and premium health insurance policies for dependants.",
    heroTag: "MANDATORY COVER",
    icon: "ShieldCheck",
    heroImage: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1200&auto=format&fit=crop",
    overview: "Every sponsored family member in the UAE requires valid health insurance for visa issuance and renewal. We issue DHA Basic Benefits Plan (LSA) and comprehensive private medical cover in minutes.",
    eligibility: [
      "Spouse, children, parents, and domestic workers.",
      "Valid Entry Permit or Emirates ID."
    ],
    documents: [
      "Passport copy & Entry Permit",
      "Digital photo"
    ],
    pricing: {
      statutoryGovTariff: 650,
      advisoryRetainer: 150,
      totalEstimate: 800,
      breakdown: [
        { label: "DHA Approved Basic Insurance Policy", cost: 650 },
        { label: "Instant Digital Certificate & System Upload Fee", cost: 150 }
      ]
    },
    processingTime: {
      standard: "Instant (15 Minutes)",
      express: "Immediate Delivery"
    },
    rules: [
      "Health insurance policy reference must be linked in GDRFA/ICP portal prior to visa stamping."
    ],
    faqs: [
      {
        question: "Is health insurance required for newborn baby visas?",
        answer: "Yes, health insurance must be activated for the baby prior to final visa stamping."
      }
    ]
  },

  {
    id: "iloe-insurance",
    slug: "iloe-unemployment-insurance-uae",
    title: "ILOE Unemployment Insurance",
    category: "Insurance",
    shortDesc: "Mandatory Involuntary Loss of Employment insurance registration for private & federal employees.",
    heroTag: "COMPLIANCE",
    icon: "Shield",
    heroImage: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop",
    overview: "Ensure compliance with UAE Federal Decree Law No. 13. We register employees for ILOE insurance to avoid fines and guarantee income protection during career transitions.",
    eligibility: [
      "All federal government and private sector employees in the UAE."
    ],
    documents: [
      "Emirates ID number & UAE mobile number"
    ],
    pricing: {
      statutoryGovTariff: 120,
      advisoryRetainer: 50,
      totalEstimate: 170,
      breakdown: [
        { label: "Official ILOE 2-Year Policy Premium", cost: 120 },
        { label: "Registration & Certificate Issuance Fee", cost: 50 }
      ]
    },
    processingTime: {
      standard: "Instant (10 Minutes)",
      express: "Immediate Delivery"
    },
    rules: [
      "Non-compliance results in MOHRE fines of AED 400."
    ],
    faqs: [
      {
        question: "Who is exempt from ILOE insurance?",
        answer: "Investors, domestic workers, temporary contract workers, and minors under 18 are exempt."
      }
    ]
  },

  {
    id: "medical-fitness",
    slug: "vip-medical-fitness-test-dubai",
    title: "VIP Medical Fitness Test",
    category: "Medical Services",
    shortDesc: "30-minute VIP express medical screening with private escort and fast-track results.",
    heroTag: "30-MIN VIP",
    icon: "Stethoscope",
    heroImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop",
    overview: "Skip the queues at DHA Medical Fitness Centres. Enjoy private VIP lounge access, instant blood tests and X-rays, with official medical certificates delivered in 2 to 4 hours.",
    eligibility: [
      "New visa applicants and residency renewal candidates aged 18+."
    ],
    documents: [
      "Original Passport or Emirates ID",
      "Visa Entry Permit copy & digital photo"
    ],
    pricing: {
      statutoryGovTariff: 750,
      advisoryRetainer: 250,
      totalEstimate: 1000,
      breakdown: [
        { label: "DHA VIP Medical Examination Fee", cost: 750 },
        { label: "Doorstep Escort & Express 4-Hour Result Sync", cost: 250 }
      ]
    },
    processingTime: {
      standard: "24 Hours",
      express: "4-Hour VIP Super Express"
    },
    rules: [
      "Fasting is not required for medical fitness blood tests."
    ],
    faqs: [
      {
        question: "Where are the VIP Medical Fitness Centres located?",
        answer: "VIP services are available at City Walk, Smart Salem (Index Tower & DIFC), and Al Twar Centre."
      }
    ]
  },

  {
    id: "amer-services",
    slug: "amer-center-services-home-doorstep",
    title: "Amer Services at Home & Doorstep PRO",
    category: "Doorstep Services",
    shortDesc: "On-demand mobile PRO service: document pickup, typing, and biometric verification at your home or office.",
    heroTag: "DOORSTEP PRO",
    icon: "MapPin",
    heroImage: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop",
    overview: "No need to visit Amer or typing centres in Dubai. Our licensed mobile PRO arrives at your doorstep for document verification, biometrics capture, and official filing.",
    eligibility: [
      "Residents across Dubai, Abu Dhabi, and Sharjah."
    ],
    documents: [
      "Required visa documents based on service request"
    ],
    pricing: {
      statutoryGovTariff: 500,
      advisoryRetainer: 300,
      totalEstimate: 800,
      breakdown: [
        { label: "Amer Official Portal Filing Tariff", cost: 500 },
        { label: "Doorstep Mobile PRO Concierge Fee", cost: 300 }
      ]
    },
    processingTime: {
      standard: "Same-Day Dispatch",
      express: "2-Hour On-Demand Dispatch"
    },
    rules: [
      "All documents are securely tracked via encrypted digital chain of custody."
    ],
    faqs: [
      {
        question: "Can I complete biometrics at my house?",
        answer: "Yes! For VIP applicants, mobile biometric units can collect fingerprints and photos at your location."
      }
    ]
  },

  {
    id: "dld-trustee",
    slug: "dld-trustee-property-revaluation",
    title: "DLD Trustee & Property Revaluation",
    category: "Real Estate Legal",
    shortDesc: "Dubai Land Department title deed transfers, valuation certificates, and Golden Visa eligibility clearance.",
    heroTag: "DLD CERTIFIED",
    icon: "Building2",
    heroImage: "https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=1200&auto=format&fit=crop",
    overview: "Official DLD Trustee office representation for property registration, title deed issuance, mortgage registration, and official property valuation certificates for 10-Year Golden Visas.",
    eligibility: [
      "Dubai real estate buyers, sellers, and property investors."
    ],
    documents: [
      "Original Title Deed / Sale & Purchase Agreement (SPA)",
      "NOC from Developer & Passport of Buyer/Seller"
    ],
    pricing: {
      statutoryGovTariff: 4000,
      advisoryRetainer: 1500,
      totalEstimate: 5500,
      breakdown: [
        { label: "DLD Official Valuation & Registration Fee", cost: 4000 },
        { label: "Trustee Office Concierge & Clearance Fee", cost: 1500 }
      ]
    },
    processingTime: {
      standard: "2 to 3 Working Days",
      express: "24 Hours Express DLD Approval"
    },
    rules: [
      "Properties valued at AED 2 Million+ qualify for 10-Year Golden Visas even if mortgaged."
    ],
    faqs: [
      {
        question: "How do I get an official DLD Property Valuation Certificate?",
        answer: "We arrange an official Dubai Land Department inspection and valuation certificate needed for Golden Visa applications."
      }
    ]
  },

  {
    id: "visa-status",
    slug: "visa-status-check-overstay-fine-waiver",
    title: "Visa Status & Overstay Fine Waiver",
    category: "Visa Clearance",
    shortDesc: "Official GDRFA visa status verification, overstay fine reduction applications, and outpass clearance.",
    heroTag: "FINE REDUCTION",
    icon: "Search",
    heroImage: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop",
    overview: "Resolve overstay fines, visa cancellations, absconding cases, and status changes smoothly. We submit fine waiver requests directly to GDRFA committees to minimize charges.",
    eligibility: [
      "Individuals with expired visas, overstay fines, or status modification needs."
    ],
    documents: [
      "Passport copy",
      "Expired Visa / Entry Permit copy",
      "Immigration Unified Number (UID)"
    ],
    pricing: {
      statutoryGovTariff: 300,
      advisoryRetainer: 500,
      totalEstimate: 800,
      breakdown: [
        { label: "GDRFA File Inspection & Status Modification Tariff", cost: 300 },
        { label: "Fine Waiver Petition & Legal Advisory Fee", cost: 500 }
      ]
    },
    processingTime: {
      standard: "1 to 3 Working Days",
      express: "24 Hours Express Resolution"
    },
    rules: [
      "Overstay fines in the UAE are AED 50 per day for residence and visit visa holders."
    ],
    faqs: [
      {
        question: "Can overstay fines in Dubai be reduced or waived?",
        answer: "Yes! We file formal humanitarian or technical petition letters to GDRFA to reduce or waive accumulated overstay fines."
      }
    ]
  }
];

const diyProcessGuides = {
  newVisa: {
    title: "Simple 4-Step Family Visa Process",
    subtitle: "From document check to Emirates ID delivery — 100% managed for you.",
    steps: [
      {
        num: "01",
        title: "Send Documents on WhatsApp",
        desc: "Share your passport, marriage certificate, and EJARI scans over encrypted WhatsApp chat."
      },
      {
        num: "02",
        title: "Entry Permit Approval",
        desc: "We file your application with GDRFA / ICP and issue your official entry permit."
      },
      {
        num: "03",
        title: "VIP Medical & Emirates ID Typing",
        desc: "Fast 30-minute medical screening with private escort and biometrics typing."
      },
      {
        num: "04",
        title: "Emirates ID Doorstep Delivery",
        desc: "Your physical 2-year or 10-year Emirates ID is delivered directly to your home."
      }
    ]
  },
  renewal: {
    title: "Simple 3-Step Renewal Guide",
    subtitle: "Renew your family residency before expiration to avoid overstay fines.",
    steps: [
      {
        num: "01",
        title: "Document Check & Insurance",
        desc: "We verify your active EJARI and arrange mandatory health insurance coverage."
      },
      {
        num: "02",
        title: "Medical Screening & Typing",
        desc: "Complete your quick medical checkup without standing in long queues."
      },
      {
        num: "03",
        title: "Emirates ID Delivery",
        desc: "Your renewed Emirates ID is printed and couriered straight to your door."
      }
    ]
  }
};

const reviewsData = [
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
];

const blogPostsData = [
  {
    id: "post-1",
    slug: "uae-family-visa-salary-rules-2026",
    title: "UAE Family Visa Rules: Salary & Housing Requirements (2026)",
    category: "Salary & Housing",
    readTime: "4 min read",
    date: "September 18, 2026",
    author: "Fatima Al-Mansoori",
    authorRole: "Senior GDRFA Legal Advisor",
    featuredImage: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1200&auto=format&fit=crop",
    excerpt: "Everything you need to know to sponsor your wife, children, or parents in Dubai and Abu Dhabi.",
    sections: [
      {
        heading: "1. Minimum Salary for Family Sponsorship",
        body: "To sponsor your wife and children, you need a minimum salary of AED 4,000 per month (or AED 3,000 if your company provides housing)."
      },
      {
        heading: "2. Rules for Female Sponsors",
        body: "Women working in professional fields (engineers, doctors, teachers, corporate roles) with a salary of AED 10,000+ can sponsor their husband and kids."
      },
      {
        heading: "3. EJARI Rental Contract Rules",
        body: "A registered EJARI (Dubai) or Tawtheeq (Abu Dhabi) lease contract is required for all family visas."
      }
    ]
  },
  {
    id: "post-2",
    slug: "golden-visa-family-sponsorship-perks",
    title: "Benefits of Sponsoring Family on a 10-Year Golden Visa",
    category: "Golden Visa",
    readTime: "3 min read",
    date: "September 12, 2026",
    author: "Tariq Al-Hashemi",
    authorRole: "Head of Executive Residency",
    featuredImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
    excerpt: "Discover perks for Golden Visa holders: no age caps for sons and unlimited time spent outside the UAE.",
    sections: [
      {
        heading: "No Salary Minimums or Age Limits",
        body: "Golden Visa holders can sponsor sons of any age, as long as they are unmarried, and there is no salary minimum required."
      },
      {
        heading: "Unlimited Stay Outside UAE",
        body: "Golden Visa dependants can remain outside the UAE for longer than 6 months without losing their visa status."
      }
    ]
  },
  {
    id: "post-3",
    slug: "newborn-baby-residence-visa-120-day-rule",
    title: "Newborn Baby Visa Rules: How to Avoid the 120-Day Penalty",
    category: "Infants",
    readTime: "5 min read",
    date: "September 05, 2026",
    author: "Zayed Al-Ameri",
    authorRole: "MOHRE & GDRFA Consultant",
    featuredImage: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1200&auto=format&fit=crop",
    excerpt: "Parents have 120 days from their baby's birth to complete residency stamping. Learn how to avoid daily fines.",
    sections: [
      {
        heading: "The 120-Day Grace Period",
        body: "Newborn babies born in the UAE must have their residence visa stamped within 120 days to prevent a AED 100 per day fine."
      }
    ]
  }
];

const blogCategories = [
  "All Articles",
  "Salary & Housing",
  "Golden Visa",
  "Dependant Visas",
  "Domestic Workers",
  "Attestation Guides"
,
{
  "id": "family-visa",
  "slug": "family-visa",
  "title": "Family Residence Visa",
  "category": "Family Visa",
  "subtitle": "Sponsor Your Loved Ones in Dubai",
  "heroTag": "MOST POPULAR",
  "icon": "Users",
  "heroImage": "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1200&auto=format&fit=crop",
  "heroDescription": "Bring your spouse, children, and parents to the UAE with our end-to-end Family Visa services. We handle the complex medical, typing, and attestation requirements so your family can settle in Dubai without stress.",
  "overview": "Sponsoring your family in the UAE is simple when you have the right guidance. We handle everything for you.",
  "eligibility": [
    "Minimum Salary: AED 4,000 per month",
    "Attested Marriage/Birth Certificates",
    "Ejari in sponsors name"
  ],
  "documents": [
    "Passport copies",
    "Photos",
    "Salary Certificate",
    "Ejari"
  ],
  "pricing": {
    "breakdown": [
      {
        "label": "Entry Permit",
        "cost": 1150
      }
    ],
    "totalEstimate": 5300
  },
  "processingTime": "3 to 5 Working Days",
  "rules": [
    "Sponsor must have valid residency",
    "Children up to 25 years"
  ],
  "faqs": [],
  "benefits": [
    {
      "title": "VIP Medical & Emirates ID",
      "desc": "Skip the queues with our premium typing."
    },
    {
      "title": "Attestation Support",
      "desc": "In-house MOFA attestation."
    }
  ],
  "processSteps": [
    {
      "title": "Eligibility Check",
      "desc": "We verify your salary and Ejari."
    },
    {
      "title": "Entry Permit",
      "desc": "Secure the pink visa."
    },
    {
      "title": "Medical",
      "desc": "VIP medical test."
    },
    {
      "title": "Visa Stamping",
      "desc": "Final ICP approval."
    }
  ]
},
{
  "id": "retirement-visa",
  "slug": "retirement-visa",
  "title": "5-Year Retirement Visa",
  "category": "Golden Visa",
  "subtitle": "Retire in Dubai with Peace of Mind",
  "heroImage": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
  "heroDescription": "A 5-year renewable residency for individuals aged 55 and above. Benefit from Dubais world-class healthcare, zero income tax, and luxurious lifestyle during your retirement.",
  "overview": "Retire in Dubai under the DLD or ICP guidelines.",
  "eligibility": [
    "Aged 55 or older",
    "Property worth AED 1M OR Savings of AED 1M OR Monthly income of AED 15,000"
  ],
  "documents": [
    "Passport",
    "Title Deed or Bank Statements",
    "Health Insurance"
  ],
  "pricing": {
    "breakdown": [
      {
        "label": "Medical & EID",
        "cost": 2500
      }
    ],
    "totalEstimate": 4000
  },
  "processingTime": "7 Working Days",
  "rules": [],
  "faqs": [],
  "benefits": [
    {
      "title": "No Sponsor Required",
      "desc": "Self-sponsored residency."
    }
  ],
  "processSteps": [
    {
      "title": "Application",
      "desc": "Submit financial proof."
    },
    {
      "title": "Approval",
      "desc": "Receive residency."
    }
  ]
},
{
  "id": "amer-center",
  "title": "Amer Center Services",
  "slug": "amer-center",
  "category": "PRO Services",
  "subtitle": "VIP Amer & GDRFA Processing",
  "heroImage": "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1200&auto=format&fit=crop",
  "heroDescription": "Skip the queues at traditional Amer centers. We provide VIP typing, direct GDRFA system access, and priority processing for all entry permits, status changes, and fine reductions.",
  "overview": "",
  "eligibility": [],
  "documents": [],
  "pricing": {
    "breakdown": [],
    "totalEstimate": 1000
  },
  "processingTime": "24 Hours",
  "rules": [],
  "faqs": [],
  "benefits": [
    {
      "title": "No Waiting",
      "desc": "Direct digital submission."
    }
  ],
  "processSteps": [
    {
      "title": "Document Review",
      "desc": "We verify your papers."
    }
  ]
},
{
  "id": "tourist-visa",
  "title": "Dubai Tourist Visa",
  "slug": "tourist-visa",
  "category": "Visit Visa",
  "subtitle": "30 & 60 Days UAE Visit Visas",
  "heroImage": "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1200&auto=format&fit=crop",
  "heroDescription": "Fast-track your UAE tourist visa. Whether visiting family, exploring Dubai, or attending business meetings, we process 30-day and 60-day entry permits with minimal documentation.",
  "overview": "",
  "eligibility": [],
  "documents": [],
  "pricing": {
    "breakdown": [],
    "totalEstimate": 500
  },
  "processingTime": "1 to 2 Days",
  "rules": [],
  "faqs": [],
  "benefits": [
    {
      "title": "No Deposit Required",
      "desc": "For eligible nationalities."
    }
  ],
  "processSteps": [
    {
      "title": "Passport Copy",
      "desc": "Send us your passport."
    },
    {
      "title": "Visa Issued",
      "desc": "Receive e-visa via WhatsApp."
    }
  ]
},
{
  "id": "poa",
  "title": "Power of Attorney (POA)",
  "slug": "poa",
  "category": "Legal Services",
  "subtitle": "Notarized Legal Representation",
  "heroImage": "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1200&auto=format&fit=crop",
  "heroDescription": "Draft and notarize a Power of Attorney without leaving your home. We facilitate online Notary Public sessions through the Dubai Courts to authorize someone to manage your property, business, or vehicles.",
  "overview": "",
  "eligibility": [],
  "documents": [],
  "pricing": {
    "breakdown": [],
    "totalEstimate": 1500
  },
  "processingTime": "1 Day",
  "rules": [],
  "faqs": [],
  "benefits": [
    {
      "title": "Online Notarization",
      "desc": "Video call with the Notary Public."
    }
  ],
  "processSteps": [
    {
      "title": "Drafting",
      "desc": "We write the POA."
    },
    {
      "title": "Notary Call",
      "desc": "Verify identity online."
    }
  ]
},
{
  "id": "translation",
  "title": "Legal Translation",
  "slug": "translation",
  "category": "Legal Services",
  "subtitle": "Ministry of Justice Approved",
  "heroImage": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200&auto=format&fit=crop",
  "heroDescription": "Certified legal translation from over 50 languages into Arabic or English. Our translations are officially recognized by UAE Courts, Notary Public, DLD, and GDRFA.",
  "overview": "",
  "eligibility": [],
  "documents": [],
  "pricing": {
    "breakdown": [],
    "totalEstimate": 150
  },
  "processingTime": "24 Hours",
  "rules": [],
  "faqs": [],
  "benefits": [
    {
      "title": "Sworn Translators",
      "desc": "Approved by the UAE MOJ."
    }
  ],
  "processSteps": [
    {
      "title": "Submit Document",
      "desc": "Email us the scan."
    },
    {
      "title": "Translate & Stamp",
      "desc": "We deliver the hard copy."
    }
  ]
},
{
  "id": "dld-trustee",
  "title": "DLD Trustee Services",
  "slug": "dld-trustee",
  "category": "Property Services",
  "subtitle": "Secure Real Estate Transfers",
  "heroImage": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
  "heroDescription": "Finalize your property buying, selling, or gifting securely through official Dubai Land Department Registration Trustee centers with our VIP escort service.",
  "overview": "",
  "eligibility": [],
  "documents": [],
  "pricing": {
    "breakdown": [],
    "totalEstimate": 4200
  },
  "processingTime": "1 Day",
  "rules": [],
  "faqs": [],
  "benefits": [
    {
      "title": "Escrow Security",
      "desc": "Safe fund transfers."
    }
  ],
  "processSteps": [
    {
      "title": "NOC & Contract",
      "desc": "Prepare Form F."
    },
    {
      "title": "Transfer",
      "desc": "Visit Trustee office."
    }
  ]
},
{
  "id": "property-revaluation",
  "title": "Property Revaluation",
  "slug": "property-revaluation",
  "category": "Property Services",
  "subtitle": "DLD Official Valuation for Golden Visa",
  "heroImage": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",
  "heroDescription": "If you bought your property years ago and its current market value exceeds AED 2 Million, we arrange an official DLD valuation so you can qualify for the 10-Year Golden Visa.",
  "overview": "",
  "eligibility": [],
  "documents": [],
  "pricing": {
    "breakdown": [],
    "totalEstimate": 4000
  },
  "processingTime": "3 Days",
  "rules": [],
  "faqs": [],
  "benefits": [
    {
      "title": "Golden Visa Eligibility",
      "desc": "Upgrade your residency."
    }
  ],
  "processSteps": [
    {
      "title": "Apply to DLD",
      "desc": "Request official valuator."
    }
  ]
},
{
  "id": "medical-eid",
  "title": "Medical & Emirates ID",
  "slug": "medical-eid",
  "category": "PRO Services",
  "subtitle": "VIP Express Processing",
  "heroImage": "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop",
  "heroDescription": "We book VIP Medical Fitness tests (results in 2 hours) and schedule your Emirates ID biometrics instantly. No more waiting weeks for appointments.",
  "overview": "",
  "eligibility": [],
  "documents": [],
  "pricing": {
    "breakdown": [],
    "totalEstimate": 750
  },
  "processingTime": "1 Day",
  "rules": [],
  "faqs": [],
  "benefits": [
    {
      "title": "2-Hour Results",
      "desc": "Fast-track medical."
    }
  ],
  "processSteps": [
    {
      "title": "Booking",
      "desc": "We schedule the VIP slot."
    }
  ]
},
{
  "id": "visa-checker",
  "title": "UAE Visa Checker",
  "slug": "visa-checker",
  "category": "PRO Services",
  "subtitle": "Overstay Fines & Status Verification",
  "heroImage": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
  "heroDescription": "Not sure if your visa is valid? Have absconding cases or overstay fines? We check your official status in the ICP/GDRFA systems and provide solutions to clear your file.",
  "overview": "",
  "eligibility": [],
  "documents": [],
  "pricing": {
    "breakdown": [],
    "totalEstimate": 0
  },
  "processingTime": "Instant",
  "rules": [],
  "faqs": [],
  "benefits": [
    {
      "title": "Confidential",
      "desc": "100% private checks."
    }
  ],
  "processSteps": [
    {
      "title": "Provide Passport",
      "desc": "Send passport copy."
    }
  ]
},
{
  "id": "iloe-insurance",
  "title": "ILOE Unemployment Insurance",
  "slug": "iloe-insurance",
  "category": "PRO Services",
  "subtitle": "Mandatory UAE Job Loss Cover",
  "heroImage": "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=1200&auto=format&fit=crop",
  "heroDescription": "Avoid the AED 400 fine. We quickly register you for the mandatory Involuntary Loss of Employment (ILOE) scheme, ensuring full compliance with MOHRE regulations.",
  "overview": "",
  "eligibility": [],
  "documents": [],
  "pricing": {
    "breakdown": [],
    "totalEstimate": 60
  },
  "processingTime": "1 Hour",
  "rules": [],
  "faqs": [],
  "benefits": [
    {
      "title": "Compliance",
      "desc": "Avoid MOHRE fines."
    }
  ],
  "processSteps": [
    {
      "title": "Registration",
      "desc": "We issue your certificate."
    }
  ]
}
,
{
  "id": "emirates-id",
  "slug": "emirates-id",
  "title": "Emirates ID Processing",
  "category": "PRO Services",
  "subtitle": "VIP & Express Identity Card Services",
  "heroImage": "https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=1200&auto=format&fit=crop",
  "heroDescription": "Whether renewing, replacing a lost card, or applying for the first time, our dedicated PRO team ensures your Emirates ID is processed via the VIP channel, skipping the long queues at ICP centers.",
  "overview": "The Emirates ID is the most essential document for residents in the UAE. Let us manage the typing, medical coordination, and biometrics booking for you.",
  "eligibility": [
    "Valid Entry Permit or Residency Visa",
    "Original Passport",
    "Physical presence in the UAE for biometrics (if applicable)"
  ],
  "documents": [
    "Passport Copy",
    "High-res Digital Photo",
    "Old Emirates ID (for renewals)"
  ],
  "pricing": {
    "breakdown": [
      {
        "label": "ICP Govt Fee",
        "cost": 385
      },
      {
        "label": "Typing & PRO VIP",
        "cost": 150
      }
    ],
    "totalEstimate": 535
  },
  "processingTime": "24 to 48 Hours",
  "rules": [],
  "faqs": [],
  "benefits": [
    {
      "title": "VIP Biometrics Booking",
      "desc": "We book your fingerprinting slot at premium ICP centers."
    },
    {
      "title": "Doorstep Delivery",
      "desc": "Your physical Emirates ID card is securely couriered to your home."
    }
  ],
  "processSteps": [
    {
      "title": "Document Submission",
      "desc": "Send us your passport and photo via WhatsApp."
    },
    {
      "title": "ICP Typing",
      "desc": "We instantly process your application."
    },
    {
      "title": "Biometrics",
      "desc": "Complete your fingerprints at the VIP center."
    },
    {
      "title": "Delivery",
      "desc": "Receive the digital ID immediately and physical card within days."
    }
  ]
}
];



const servicesData = new Proxy(defaultServicesData, {
  get(target, prop) {
    if (prop === 'length') return target.length;
    
    if (typeof prop === 'string' && !isNaN(prop)) {
      const item = target[prop];
      if (!item) return item;
      
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('app_cms_config');
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (parsed.servicePages && parsed.servicePages[item.id]) {
               const adminData = parsed.servicePages[item.id];
               
               let newPricing = item.pricing;
               if (adminData.feeRows && adminData.feeRows.length > 0) {
                 const statutoryGovTariff = adminData.feeRows.reduce((acc, row) => acc + parseInt(String(row.govtFee).replace(/,/g, '') || 0), 0);
                 const advisoryRetainer = adminData.feeRows.reduce((acc, row) => acc + parseInt(String(row.serviceFee).replace(/,/g, '') || 0), 0);
                 
                 const breakdown = adminData.feeRows.map(row => ({
                   label: row.name,
                   cost: parseInt(String(row.govtFee).replace(/,/g, '') || 0) + parseInt(String(row.serviceFee).replace(/,/g, '') || 0)
                 }));
                 
                 newPricing = {
                   statutoryGovTariff,
                   advisoryRetainer,
                   totalEstimate: statutoryGovTariff + advisoryRetainer,
                   breakdown
                 };
               }
               
               let newEligibility = item.eligibility;
               if (adminData.requirements && adminData.requirements.length > 0) {
                 newEligibility = adminData.requirements;
               }
               
               let newFaqs = item.faqs;
               if (adminData.faqs && adminData.faqs.length > 0) {
                 newFaqs = adminData.faqs.map(faq => ({
                   question: faq.question,
                   answer: faq.answer
                 }));
               }

               return {
                 ...item,
                 pricing: newPricing,
                 eligibility: newEligibility,
                 faqs: newFaqs
               };
            }
          } catch(e) {}
        }
      }
      return item;
    }
    
    const value = target[prop];
    if (typeof value === 'function') {
      return value.bind(target);
    }
    return value;
  }
});


module.exports = { servicesData, blogPostsData, blogCategories, reviewsData, diyProcessGuides, siteConfig };