/**
 * Service Registry Configuration
 * 
 * Config-driven architectural mapping for polymorphic service pages.
 * Maps all 17 bespoke service slugs to their custom layout sequences and metadata.
 */

export const serviceRegistry = {
  // 1. Property Visa (Real Estate Investor)
  "property-visa": {
    slug: "property-visa",
    category: "Real Estate Residency",
    title: "Dubai Property Investor Golden Visa & 2-Year Residency",
    subtitle: "Secure UAE residency through real estate. Minimum AED 750,000 for 2-Year Investor Residency and AED 2,000,000 for 10-Year Golden Visas.",
    heroBadges: ["DLD Approved", "Mortgaged Eligible", "100% SLA Guarantee"],
    layout: [
      "HeroStandard",
      "DLDValuationCalculator",
      "InvestmentBentoGrid",
      "DeedDocumentTabs",
      "FeeInvoice",
      "ProcessTimeline",
      "FAQ"
    ],
    invoice: {
      govtFees: 6850,
      conciergeFee: 1850,
      breakdown: [
        { item: "Dubai Land Department (DLD) Nomination Fee", cost: 4020 },
        { item: "ICP / GDRFA Entry Permit & Status Change", cost: 1150 },
        { item: "VIP Smart Medical Fitness Screening", cost: 950 },
        { item: "Emirates ID Typing & Biometrics (10-Year)", cost: 730 }
      ]
    },
    documents: {
      investor: [
        "DLD Title Deed or Developer Oqood (Min. AED 750k / 2M)",
        "Passport Scans (> 6 months validity for all applicants)",
        "UAE Residence Visa copy or Visit Visa Entry Stamp",
        "Good Conduct Certificate issued by Dubai Police"
      ],
      family: [
        "MOFA Attested Marriage Certificate + Sworn Arabic Translation",
        "MOFA Attested Birth Certificates for all children",
        "Passport-size Photographs with white background"
      ]
    },
    faqs: [
      { q: "Can I combine multiple properties to reach the AED 2 Million Golden Visa threshold?", a: "Yes! Dubai Land Department allows combining up to 3 properties to meet the AED 2M requirement." },
      { q: "Is mortgaged real estate eligible for Golden Visa?", a: "Yes. Mortgaged properties qualify if paid equity equals or exceeds AED 2 Million with a bank NOC letter." }
    ]
  },

  // 2. Family Visa (Spouse & Children)
  "family-visa": {
    slug: "family-visa",
    category: "Family Sponsorship",
    title: "Sponsor Spouse & Dependent Children Residency Visa",
    subtitle: "Complete GDRFA entry permits, status adjustments, DHA medical screening, and Emirates ID delivery for your family.",
    heroBadges: ["MOHRE Compliant", "Ejari Audit Included", "Express 48-Hour SLA"],
    layout: [
      "HeroStandard",
      "FamilyQuotaCalculator",
      "SalaryWarningAlert",
      "SponsorVsDependentTabs",
      "FeeInvoice",
      "ProcessTimeline",
      "FAQ"
    ],
    invoice: {
      govtFees: 3250,
      conciergeFee: 1100,
      breakdown: [
        { item: "GDRFA Family Entry Permit Filing", cost: 1150 },
        { item: "Status Adjustment & Inside-Country Clearance", cost: 675 },
        { item: "DHA Medical Screening & Typing", cost: 850 },
        { item: "Emirates ID Typing (2-Year)", cost: 575 }
      ]
    },
    documents: {
      investor: ["Sponsor Passport & Emirates ID", "Stamped Salary Certificate / Trade License", "Attested Ejari Tenancy Contract"],
      family: ["Dependent Passport Copy", "MOFA Attested Marriage / Birth Certificate", "White Background Photos"]
    },
    faqs: [
      { q: "What is the minimum salary to sponsor family in Dubai?", a: "The minimum monthly salary requirement is AED 4,000 (or AED 3,000 + accommodation) with an attested Ejari contract." }
    ]
  },

  // 3. Golden Visa (10-Year Residency)
  "golden-visa": {
    slug: "golden-visa",
    category: "Executive Residency",
    title: "UAE 10-Year Golden Visa Nomination & Processing",
    subtitle: "Self-sponsored 10-year residency for Executives, Investors, Specialized Talents, Doctors, and Entrepreneurs.",
    heroBadges: ["No Sponsor Required", "Unlimited Stay Exemption", "Unlimited Maid Quotas"],
    layout: [
      "HeroStandard",
      "CategoryTrackSelector",
      "PrivilegeMatrix",
      "DocumentConcierge",
      "FeeInvoice",
      "ProcessTimeline",
      "FAQ"
    ],
    invoice: {
      govtFees: 6850,
      conciergeFee: 1850,
      breakdown: [
        { item: "GDRFA Golden Nomination Clearance", cost: 4020 },
        { item: "10-Year E-Visa & Residency Permit", cost: 1150 },
        { item: "VIP Medical Fitness & EID Typing", cost: 1680 }
      ]
    },
    documents: {
      investor: ["Passport Copy (> 6 months validity)", "AED 30,000 Salary Cert or Title Deed or Degree", "6-Month Bank Statement"],
      family: ["Spouse & Dependent Passport Scans", "MOFA Attested Marriage & Birth Certificates"]
    },
    faqs: [
      { q: "How long can I stay outside the UAE with a Golden Visa?", a: "Golden Visa holders can remain outside the UAE for unlimited periods without losing their residency status." }
    ]
  },

  // 4. Newborn Visa (UAE Born Infant)
  "newborn-visa": {
    slug: "newborn-visa",
    category: "Infant Residency",
    title: "Newborn Baby Visa & Grace Period Filing",
    subtitle: "Complete hospital birth certificate attestation, passport registration, and GDRFA 120-day grace period filing.",
    heroBadges: ["120-Day Grace Period SLA", "Zero Physical Visits", "Doorstep Delivery"],
    layout: [
      "HeroStandard",
      "GracePeriodCountdown",
      "ZeroContactWorkflow",
      "DocumentConcierge",
      "FeeInvoice",
      "ProcessTimeline",
      "FAQ"
    ],
    invoice: {
      govtFees: 2450,
      conciergeFee: 950,
      breakdown: [
        { item: "MOFA Birth Certificate Legalization", cost: 450 },
        { item: "GDRFA Baby Visa Stamping", cost: 1150 },
        { item: "Emirates ID 2-Year Typing", cost: 850 }
      ]
    },
    documents: {
      investor: ["Father & Mother Passports & Emirates IDs", "Hospital Birth Certificate", "Attested Marriage Certificate"],
      family: ["Baby Home Country Passport Copy", "Passport Photo"]
    },
    faqs: [
      { q: "How many days do parents have to file a newborn visa?", a: "Parents have exactly 120 days from birth before AED 50/day overstay fines begin." }
    ]
  },

  // 5. Maid Visa (Nanny / Housemaid)
  "maid-visa": {
    slug: "maid-visa",
    category: "Domestic Workers",
    title: "Sponsor Nanny & Housemaid Visa in Dubai",
    subtitle: "Hassle-free MOHRE approval, typing, medical fitness, and Emirates ID delivery for domestic helpers.",
    heroBadges: ["MOHRE Approved", "In-Country & Overseas", "Medical Escort"],
    layout: [
      "HeroStandard",
      "DomesticSalaryGate",
      "LocationToggleWidget",
      "DocumentConcierge",
      "FeeInvoice",
      "ProcessTimeline",
      "FAQ"
    ],
    invoice: {
      govtFees: 3800,
      conciergeFee: 1400,
      breakdown: [
        { item: "MOHRE Entry Permit Filing", cost: 1450 },
        { item: "VIP Medical Screening Lab", cost: 850 },
        { item: "Status Change & EID Typing", cost: 1500 }
      ]
    },
    documents: {
      investor: ["Sponsor Passport & EID Copy", "Sponsor Salary Certificate (Min. AED 25,000) or Bank Statement", "Ejari Contract (2-Bedroom)"],
      family: ["Maid Passport Scan", "Maid Photo", "Home Country Police Clearance"]
    },
    faqs: [
      { q: "What is the minimum household salary to sponsor a maid?", a: "MOHRE requires a minimum monthly salary of AED 25,000 (Golden Visa holders exempt)." }
    ]
  },

  // 6. Emirates ID (ICP Smart Card)
  "emirates-id": {
    slug: "emirates-id",
    category: "Identity Services",
    title: "Emirates ID (ICP Smart Card) Typing & Renewal",
    subtitle: "Official Federal Authority for Identity & Citizenship (ICP) smart card typing, biometrics scheduling, and lost card replacement.",
    heroBadges: ["ICP Certified", "Biometric Scheduling", "Doorstep Delivery"],
    layout: [
      "HeroStandard",
      "EIDServiceTabs",
      "BiometricExemptionGuide",
      "DocumentConcierge",
      "FeeInvoice",
      "ProcessTimeline",
      "FAQ"
    ],
    invoice: {
      govtFees: 370,
      conciergeFee: 250,
      breakdown: [
        { item: "ICP 2-Year Card Official Fee", cost: 370 },
        { item: "Smart Typing & Biometrics Reservation", cost: 250 }
      ]
    },
    documents: {
      investor: ["Passport Copy", "Current Residence Visa / Entry Permit", "Existing Emirates ID (if renewing)"],
      family: []
    },
    faqs: [
      { q: "Do I need biometrics fingerprinting for Emirates ID renewal?", a: "Existing cardholders usually have biometrics stored and do not need to re-do fingerprints." }
    ]
  },

  // 7. PRO Services (Government Quota & File Opening)
  "pro-services": {
    slug: "pro-services",
    category: "Corporate Government Liaison",
    title: "Outsourced Corporate PRO Services & Government Liaison",
    subtitle: "Seamless management of MOHRE, GDRFA, and DET Economic Department portals for your enterprise.",
    heroBadges: ["Dedicated Account Manager", "MOHRE & GDRFA Portals", "Zero Penalties SLA"],
    layout: [
      "HeroStandard",
      "CorporateOnboardingForm",
      "JurisdictionDashboard",
      "FeeInvoice",
      "ProcessTimeline",
      "FAQ"
    ],
    invoice: {
      govtFees: 4500,
      conciergeFee: 2500,
      breakdown: [
        { item: "MOHRE Establishment File Opening", cost: 2200 },
        { item: "Immigration Establishment Card Renewal", cost: 2300 },
        { item: "Corporate Monthly SLA Retainer", cost: 2500 }
      ]
    },
    documents: {
      investor: ["Trade License Copy", "MOA / Share Certificate", "Manager Passport & EID Copy"],
      family: []
    },
    faqs: [
      { q: "What triggers a Wage Protection System (WPS) block?", a: "WPS blocks trigger if 80% of registered employee salaries are not paid via MOHRE accounts." }
    ]
  },

  // 8. Amer Center (GDRFA Immigration Services)
  "amer-center": {
    slug: "amer-center",
    category: "Digital Immigration Portal",
    title: "Official GDRFA Typing & Amer Center Services—100% Online",
    subtitle: "Skip physical queues. Process entry permits, status adjustments, and visa cancellations digitally with guaranteed typing accuracy.",
    heroBadges: ["100% Online Typing", "Zero Center Visits", "Direct GDRFA Portal"],
    layout: [
      "HeroStandard",
      "AppTrackerWidget",
      "DigitalVsPhysicalSplit",
      "FeeInvoice",
      "ProcessTimeline",
      "FAQ"
    ],
    invoice: {
      govtFees: 1865,
      conciergeFee: 450,
      breakdown: [
        { item: "Official Amer Typing Center Tariff", cost: 150 },
        { item: "GDRFA Status Change Fee", cost: 675 },
        { item: "Emirates ID & Medical Typing", cost: 1040 }
      ]
    },
    documents: {
      investor: ["Passport & Visa Copy", "Sponsor Emirates ID", "Passport Photo"],
      family: []
    },
    faqs: [
      { q: "How fast is digital Amer typing?", a: "Documents are pre-audited and submitted to GDRFA within 15-30 minutes of receipt." }
    ]
  },

  // 9. Document Attestation (MOFA & Embassy Attestation)
  "document-attestation": {
    slug: "document-attestation",
    category: "Legalization",
    title: "Degree & Personal Document MOFA Attestation",
    subtitle: "Official legalization for educational degrees, marriage, and birth certificates with embassy & UAE MOFA stamps.",
    heroBadges: ["100% MOFA Guaranteed", "Doorstep Pickup", "Express 24-Hour Track"],
    layout: [
      "HeroStandard",
      "GlobalLegalizationPipeline",
      "SpeedBentoGrid",
      "DocumentConcierge",
      "FeeInvoice",
      "ProcessTimeline",
      "FAQ"
    ],
    invoice: {
      govtFees: 1250,
      conciergeFee: 650,
      breakdown: [
        { item: "Home Country Foreign Ministry Stamp", cost: 450 },
        { item: "UAE Embassy Stamp Origin", cost: 350 },
        { item: "UAE MOFA Official Stamp", cost: 150 },
        { item: "Certified Sworn Translation", cost: 300 }
      ]
    },
    documents: {
      investor: ["Original Degree or Certificate", "Passport Copy of Owner", "Authorization Letter"],
      family: []
    },
    faqs: [
      { q: "Do you require physical original documents?", a: "Yes. MOFA and foreign embassies require original physical certificates for official seals." }
    ]
  },

  // 10. Legal Translation (Arabic Sworn Translation)
  "legal-translation": {
    slug: "legal-translation",
    category: "Sworn Translation",
    title: "Certified Ministry of Justice Legal Translation",
    subtitle: "Sworn Arabic legal translation for court documents, contracts, certificates, and visa filings.",
    heroBadges: ["Ministry of Justice Certified", "Same-Day Delivery", "All Languages"],
    layout: [
      "HeroStandard",
      "InstantWordEstimator",
      "LanguagePairGrid",
      "FeeInvoice",
      "ProcessTimeline",
      "FAQ"
    ],
    invoice: {
      govtFees: 200,
      conciergeFee: 250,
      breakdown: [
        { item: "Ministry Certified Legal Seal (Per Page)", cost: 150 },
        { item: "Sworn Arabic Translator Fee", cost: 300 }
      ]
    },
    documents: {
      investor: ["Document Scan (PDF or JPG)"],
      family: []
    },
    faqs: [
      { q: "Are your translations accepted by UAE courts & GDRFA?", a: "Yes. Our sworn translations carry official stamps certified by the UAE Ministry of Justice." }
    ]
  },

  // 11. Power of Attorney (POA Drafting & Notary)
  "power-of-attorney": {
    slug: "power-of-attorney",
    category: "Notary & Legal Drafting",
    title: "Power of Attorney (POA) Drafting & Video Notarization",
    subtitle: "Bilingual English/Arabic POA drafting and remote video notarization through Dubai Courts notary portal.",
    heroBadges: ["Dubai Courts Notary", "Remote Video Session", "Bilingual Drafts"],
    layout: [
      "HeroStandard",
      "RemoteVideoWorkflow",
      "POAScopeSelector",
      "FeeInvoice",
      "ProcessTimeline",
      "FAQ"
    ],
    invoice: {
      govtFees: 950,
      conciergeFee: 850,
      breakdown: [
        { item: "Dubai Courts Official Notary Fee", cost: 950 },
        { item: "Bilingual English/Arabic Legal Drafting", cost: 850 }
      ]
    },
    documents: {
      investor: ["Principal Passport & EID Copy", "Attorney Passport & EID Copy", "Property Title Deed (if Real Estate POA)"],
      family: []
    },
    faqs: [
      { q: "Can I notarize a POA while outside the UAE?", a: "Yes. Remote video notarization allows principals abroad to sign via official Botim/Zoom sessions." }
    ]
  },

  // 12. Wills & Testament (DIFC & Dubai Court Wills)
  "wills-testament": {
    slug: "wills-testament",
    category: "Asset Protection",
    title: "DIFC & ADJD Non-Muslim Will Registration",
    subtitle: "Protect your UAE real estate, bank accounts, corporate shares, and child guardianship under Common Law rules.",
    heroBadges: ["DIFC Registered", "Common Law Protection", "Full Estate Coverage"],
    layout: [
      "HeroStandard",
      "JurisdictionBento",
      "AssetProtectionModules",
      "FeeInvoice",
      "ProcessTimeline",
      "FAQ"
    ],
    invoice: {
      govtFees: 10000,
      conciergeFee: 3500,
      breakdown: [
        { item: "DIFC Courts Official Will Registry Fee", cost: 10000 },
        { item: "Legal Will Drafting & Guardianship Clauses", cost: 3500 }
      ]
    },
    documents: {
      investor: ["Testator Passport Copy", "List of UAE Assets (Title Deeds, Bank Accounts)", "Guardianship Nominee Passports"],
      family: []
    },
    faqs: [
      { q: "Why do non-Muslim residents need a DIFC Will?", a: "A DIFC Will bypasses default Sharia inheritance laws, allowing full freedom of asset distribution." }
    ]
  },

  // 13. DLD Trustee Services (Property Sale & Transfer NOC)
  "dld-trustee-services": {
    slug: "dld-trustee-services",
    category: "Real Estate Transfer",
    title: "DLD Trustee Property Transfer & Registration",
    subtitle: "Official Dubai Land Department trustee office representation for property sale, purchase, gift transfers (Hiba), and mortgage registration.",
    heroBadges: ["DLD Licensed Trustee", "Same-Day Transfer", "Title Deed Issuance"],
    layout: [
      "HeroStandard",
      "DLDTransferCalculator",
      "TransactionTypeGrid",
      "FeeInvoice",
      "ProcessTimeline",
      "FAQ"
    ],
    invoice: {
      govtFees: 104200,
      conciergeFee: 2500,
      breakdown: [
        { item: "DLD 4% Transfer Fee (Sample on AED 2.5M Property)", cost: 100000 },
        { item: "DLD Trustee Office Processing Tariff", cost: 4200 },
        { item: "Title Deed Electronic Issuance Fee", cost: 580 }
      ]
    },
    documents: {
      investor: ["Form F (MOU Contract)", "Buyer & Seller Passports & EIDs", "Manager Cheques for DLD Fee & Purchase Price"],
      family: []
    },
    faqs: [
      { q: "How long does a DLD Trustee property transfer take?", a: "Transfers are executed at the trustee office within 1 to 2 hours once funds and documents are ready." }
    ]
  },

  // 14. Property Revaluation (Official DLD Valuation Certificate)
  "property-revaluation": {
    slug: "property-revaluation",
    category: "Real Estate Valuation",
    title: "Official DLD Property Revaluation Certificate",
    subtitle: "Obtain an official Dubai Land Department valuation certificate to unlock your 10-Year Golden Visa eligibility.",
    heroBadges: ["DLD Official Valuer", "Unlocks Golden Visa", "Site Audit Included"],
    layout: [
      "HeroStandard",
      "EquityUnlockExplainer",
      "FeeInvoice",
      "ProcessTimeline",
      "FAQ"
    ],
    invoice: {
      govtFees: 4020,
      conciergeFee: 1200,
      breakdown: [
        { item: "DLD Official Valuation Certificate Fee", cost: 4020 },
        { item: "DLD Valuer Site Inspection & File Management", cost: 1200 }
      ]
    },
    documents: {
      investor: ["Title Deed Copy", "DEWA Bill Copy", "Building Inspection Access"],
      family: []
    },
    faqs: [
      { q: "How does property revaluation help for Golden Visa?", a: "If market growth increases your property value to AED 2M+, a DLD Valuation Certificate proves eligibility." }
    ]
  },

  // 15. Visa Validity Checker (ICP / GDRFA Status Audit)
  "visa-validity-checker": {
    slug: "visa-validity-checker",
    category: "GDRFA & ICP Audit",
    title: "Check UAE Visa Validity & Overstay Fines Online",
    subtitle: "Instantly check residence permit validity, active entry permit status, or calculate overstay fines via official GDRFA & ICP channels.",
    heroBadges: ["Official GDRFA / ICP Query", "Instant WhatsApp Report", "Overstay Fine Audit"],
    layout: [
      "HeroWithStatusChecker",
      "PassportLookupForm",
      "OverstayFineCalculator",
      "FAQ"
    ],
    invoice: { govtFees: 0, conciergeFee: 0, breakdown: [] },
    documents: { investor: ["Passport Number & Expiry Date"], family: [] },
    faqs: [
      { q: "What is the overstay fine rate in UAE?", a: "Standard overstay fines are AED 50 per day for both residence and visit visa holders." }
    ]
  },

  // 16. Medical & EID Package (DHA Medical Fitness & Biometrics)
  "medical-eid-package": {
    slug: "medical-eid-package",
    category: "Medical & Biometrics",
    title: "DHA Medical Fitness Screening & VIP Smart Salem Package",
    subtitle: "Fast-track DHA medical screening (2-Hour, 24-Hour Express, or VIP Salem) integrated with Emirates ID biometrics.",
    heroBadges: ["DHA Integrated", "2-Hour Smart Salem VIP", "Chauffeur Escort"],
    layout: [
      "HeroStandard",
      "VIPTierPricing",
      "LoungeExperienceGallery",
      "FeeInvoice",
      "ProcessTimeline",
      "FAQ"
    ],
    invoice: {
      govtFees: 1220,
      conciergeFee: 450,
      breakdown: [
        { item: "DHA Smart Salem VIP Screening Fee", cost: 850 },
        { item: "Emirates ID Typing & Biometric Appointment", cost: 370 }
      ]
    },
    documents: {
      investor: ["Passport Copy", "Entry Permit / Visa Copy", "White Background Photo"],
      family: []
    },
    faqs: [
      { q: "How fast are Smart Salem VIP medical results?", a: "Results are generated in 30 to 120 minutes via AI X-ray and blood analysis." }
    ]
  },

  // 17. ILOE Insurance (Mandatory Unemployment Shield)
  "iloe-insurance": {
    slug: "iloe-insurance",
    category: "Unemployment Insurance",
    title: "Mandatory UAE Involuntary Loss of Employment (ILOE) Insurance",
    subtitle: "Avoid AED 400 penalties and non-renewal of work permits. We register and issue your official insurance policy certificate instantly.",
    heroBadges: ["Mandatory Law", "Instant Policy Certificate", "Avoid AED 400 Fine"],
    layout: [
      "HeroStandard",
      "DeadlineWarningBanner",
      "SalaryTierSelector",
      "FeeInvoice",
      "ProcessTimeline",
      "FAQ"
    ],
    invoice: {
      govtFees: 60,
      conciergeFee: 90,
      breakdown: [
        { item: "ILOE Mandatory Policy Annual Premium (Tier A)", cost: 60 },
        { item: "Instant Certificate Issuance & E-Delivery", cost: 90 }
      ]
    },
    documents: {
      investor: ["Emirates ID Number", "Mobile Number", "Basic Salary Category"],
      family: []
    },
    faqs: [
      { q: "Are company investors and partners exempt from ILOE?", a: "Yes. Company investors, sole shareholders, partners, domestic workers, and minors are exempt." }
    ]
  }
};

// Map convenient aliases so legacy routes work out of the box
serviceRegistry["property-golden-visa"] = serviceRegistry["property-visa"];
serviceRegistry["new-born"] = serviceRegistry["newborn-visa"];
serviceRegistry["attestation"] = serviceRegistry["document-attestation"];
serviceRegistry["check-visa-status-uae"] = serviceRegistry["visa-validity-checker"];

export function getServiceConfig(slug) {
  return serviceRegistry[slug] || serviceRegistry["property-visa"];
}
