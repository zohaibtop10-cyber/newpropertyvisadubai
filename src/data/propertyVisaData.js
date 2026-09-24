export const siteConfig = {
  brandName: "Property Visa Dubai",
  domain: "PropertyVisaDubai.ae",
  tagline: "Your UAE Property Visa & Family Residency — Handled 100% Online.",
  subtagline: "Skip typing center queues. Get exact government fees in 30 seconds, send documents over WhatsApp, and get Emirates IDs delivered to your door.",
  phone: "+971 4 800 PROP (7767)",
  phoneRaw: "+97148007767",
  whatsapp: "+971 50 888 9900",
  whatsappRaw: "971508889900",
  email: "residency@propertyvisadubai.ae",
  officeHours: "Mon-Sat: 8:00 AM - 8:00 PM GST",
  accreditation: "DLD & ICP Accredited Real Estate Residency Partner",
  languages: [
    { code: "EN", name: "English" },
    { code: "AR", name: "العربية" },
    { code: "RU", name: "Русский" },
    { code: "ZH", name: "中文" }
  ]
};

export const visaServices = [
  {
    id: "10-year-golden-visa",
    slug: "property-golden-visa",
    title: "10-Year Property Golden Visa",
    category: "Golden Residency",
    minThreshold: "AED 2,000,000 Property Value",
    shortDesc: "10-year Golden Visa for property owners holding AED 2M+ in Dubai real estate.",
    badge: "MOST POPULAR",
    icon: "Crown",
    heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
    overview: "Get a 10-Year Golden Visa by owning real estate in Dubai worth AED 2,000,000 or more. You can sponsor your spouse, children of any age, parents, and domestic staff with total peace of mind.",
    eligibility: [
      "Total property purchase value of AED 2,000,000 or more (Title Deed or Oqood).",
      "Qualifying properties include completed homes or off-plan projects from approved developers.",
      "Mortgaged properties qualify if your bank NOC confirms AED 2M+ paid equity.",
      "You can combine multiple properties in Dubai to reach the AED 2M requirement.",
      "Pass a simple routine medical fitness test in Dubai."
    ],
    documents: [
      "Original Title Deed or Oqood certificate",
      "Passport copy (valid for at least 6 months)",
      "Bank NOC letter (if property is mortgaged)",
      "Digital passport photo with white background",
      "UAE Health Insurance certificate"
    ],
    pricing: {
      statutoryGovTariff: 9850,
      advisoryRetainer: 2450,
      totalEstimate: 12300,
      breakdown: [
        { label: "DLD Property Verification & Audit", cost: 4020 },
        { label: "ICP / GDRFA 10-Year Golden Visa Fee", cost: 2680 },
        { label: "VIP Medical Test & 10-Yr Emirates ID", cost: 3150 },
        { label: "Property Visa Dubai Service Fee", cost: 2450 }
      ]
    },
    processingTime: "5 to 7 Working Days (100% Online)",
    rules: [
      "No limit on time spent outside the UAE — keep your visa active anytime.",
      "Uncapped family sponsorship for spouse, children, parents, and domestic helpers."
    ],
    faqs: [
      {
        question: "Does a mortgaged property qualify for the Golden Visa?",
        answer: "Yes! If your property is mortgaged, you qualify once your bank issues a letter confirming AED 2,000,000+ has been paid off."
      },
      {
        question: "Can I combine two properties worth 1 Million AED each?",
        answer: "Yes! You can combine multiple properties in Dubai registered under your name to meet the AED 2,000,000 total."
      }
    ]
  },

  {
    id: "2-year-investor-visa",
    slug: "2-year-property-investor-visa",
    title: "2-Year Property Investor Visa",
    category: "Investor Visa",
    minThreshold: "AED 750,000 Property Value",
    shortDesc: "2-Year renewable residence visa for owners of completed property worth AED 750k+.",
    badge: "POPULAR TRACK",
    icon: "Building2",
    heroImage: "https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=1200&auto=format&fit=crop",
    overview: "Get a 2-Year renewable residence visa if you own a completed residential property in Dubai worth AED 750,000 or more. Comes with full residency rights, Emirates ID, and family sponsorship.",
    eligibility: [
      "Minimum property valuation of AED 750,000 on Dubai Land Department (DLD) Title Deed.",
      "Must be a completed residential property.",
      "Passing routine medical test and security clearance."
    ],
    documents: [
      "Original DLD Title Deed copy",
      "Passport copy & current visit or residence visa",
      "Digital passport photo"
    ],
    pricing: {
      statutoryGovTariff: 6850,
      advisoryRetainer: 1850,
      totalEstimate: 8700,
      breakdown: [
        { label: "DLD Approval & Property Check", cost: 3100 },
        { label: "GDRFA Visa Stamp & Entry Permit", cost: 2150 },
        { label: "VIP Medical Test & 2-Yr Emirates ID", cost: 1600 },
        { label: "Property Visa Dubai Service Fee", cost: 1850 }
      ]
    },
    processingTime: "4 to 6 Working Days",
    rules: [
      "You can sponsor your spouse and kids once your visa is stamped."
    ],
    faqs: [
      {
        question: "Is off-plan property eligible for the 2-Year Investor Visa?",
        answer: "No. The 2-Year Investor Visa requires a completed property with a Title Deed. Off-plan properties qualify under the 10-Year Golden Visa track."
      }
    ]
  }
];

export const processTimelineSteps = [
  {
    step: "01",
    title: "Check Fees Online",
    desc: "Calculate your exact government fees in 30 seconds with our online fee calculator.",
    icon: "Calculator"
  },
  {
    step: "02",
    title: "Send Documents on WhatsApp",
    desc: "Upload your Title Deed and passport copies directly over secure WhatsApp chat.",
    icon: "MessageSquare"
  },
  {
    step: "03",
    title: "Government Application",
    desc: "We file your application with Dubai Land Department and GDRFA for fast approval.",
    icon: "FileCheck"
  },
  {
    step: "04",
    title: "Emirates ID Delivery",
    desc: "Quick 15-minute VIP medical check and physical Emirates ID delivered to your door.",
    icon: "BadgeCheck"
  }
];

export const faqsData = [
  {
    question: "Does a mortgaged property qualify for Golden Visa?",
    answer: "Yes! Mortgaged properties qualify as long as your bank confirms AED 2,000,000+ of the equity has been paid."
  },
  {
    question: "How long can Golden Visa holders stay outside the UAE?",
    answer: "Golden Visa holders can remain outside the UAE for any length of time without losing their visa status."
  },
  {
    question: "Is the process really 100% online?",
    answer: "Yes! Document filing is handled digitally over WhatsApp. You only attend a brief 15-minute VIP medical appointment in Dubai."
  }
];
