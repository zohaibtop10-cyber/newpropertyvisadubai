import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, Crown, Building2, Users, Calculator, ShieldCheck,
  ArrowRight, PhoneCall, Star, Clock, FileText, ChevronDown, ChevronRight,
  Sparkles, Award, ExternalLink, HelpCircle, Gift, MessageSquare, Zap,
  X, AlertTriangle, Scale, FileCheck, Check, Heart, UserPlus, Baby, HeartHandshake, BookOpen
} from 'lucide-react';
import LogoMarquee from './LogoMarquee';

  const reviewsList = [
    {
      name: "Alexander V.",
      role: "Tech Entrepreneur",
      origin: "London, UK",
      badge: "10-Year Golden Visa Approved",
      quote: "Obtained my 10-Year Golden Visa in 4 business days based on my Dubai Marina property title deed. The direct PRO filing bypassed all counters and queues.",
      initials: "AV",
      date: "Verified Review"
    },
    {
      name: "Elena Rostova",
      role: "Family Office Principal",
      origin: "Monaco",
      badge: "Family Sponsorship Approved",
      quote: "Relocated our entire family and domestic staff to Palm Jumeirah. 800 DOCS orchestrated the MOFA certificate attestations, VIP medical screenings, and Emirates IDs seamlessly.",
      initials: "ER",
      date: "Verified Review"
    },
    {
      name: "Marc & Sophie Dubois",
      role: "Executive Director",
      origin: "Paris, France",
      badge: "Investor Residency Stamped",
      quote: "Completely transparent unbundled government tariffs with official receipts. No undisclosed fees. Their 24H fast-track turnaround SLA is the gold standard in the UAE.",
      initials: "MD",
      date: "Verified Review"
    },
    {
      name: "Dr. Tariq Al-Hashimi",
      role: "Consultant Surgeon",
      origin: "Munich, Germany",
      badge: "Golden Visa Stamped",
      quote: "From newborn baby visa typing to DLD property revaluation, they handle our family requirements with utmost professionalism. Truly first-class government advisory.",
      initials: "TA",
      date: "Verified Review"
    },
    {
      name: "James Pemberton",
      role: "Investment Principal",
      origin: "London, UK",
      badge: "Property Investor Visa",
      quote: "Our DLD title deed valuation was completed without having to visit the land department. The VIP Emirates ID appointment took less than 20 minutes in Al Mina.",
      initials: "JP",
      date: "Verified Review"
    },
    {
      name: "Sarah Jenkins",
      role: "Corporate Manager",
      origin: "Manchester, UK",
      badge: "Maid & Helper Visa Stamped",
      quote: "Superb Tadbeer and domestic helper sponsorship service. Contract, insurance, and medical were coordinated end-to-end with total transparency.",
      initials: "SJ",
      date: "Verified Review"
    }
  ];

export default function Home({ homePageData, onNavigate, onOpenCalculator, cmsConfig }) {
  const [activeTab, setActiveTab] = useState('all');
  const [activeArticleTab, setActiveArticleTab] = useState('all');
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedFaqIndex, setSelectedFaqIndex] = useState(0);
  const [whyChooseTab, setWhyChooseTab] = useState('concierge');
  const [ctaPhone, setCtaPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+971');
  const [calcGoal, setCalcGoal] = useState('golden');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  };

  // Why Choose 800 DOCS Interactive Pillars
  const whyChoosePillars = [
    {
      id: 'concierge',
      tabLabel: "WhatsApp Concierge",
      tag: "ZERO QUEUES",
      icon: MessageSquare,
      headline: "100% Digital Concierge via WhatsApp",
      description: "Experience effortless residency management without ever setting foot in a government typing center. From instant document uploads to door-to-door courier delivery of your stamped passport and Emirates ID, our senior PRO team handles the entire lifecycle seamlessly.",
      stat: "100% Remote",
      statLabel: "Digital Filing",
      badge: "GDRFA & ICP Direct Channel",
      perks: [
        "Instant document upload & pre-screening via secure WhatsApp",
        "Door-to-door insured VIP courier service across all 7 UAE Emirates",
        "Dedicated Senior PRO Case Officer assigned directly to your family file"
      ],
      quote: "No queues, no counters. Upload your files via phone and our dedicated team orchestrates every government filing seamlessly.",
      actionText: "Chat on WhatsApp Concierge",
      actionType: "whatsapp"
    },
    {
      id: 'transparency',
      tabLabel: "Unbundled Billing",
      tag: "100% TRANSPARENCY",
      icon: Calculator,
      headline: "Absolute Fee Transparency with Official Receipts",
      description: "We completely eliminate hidden agency markups and undisclosed typist surcharges. Every dirham of official government tariffs (GDRFA, ICP, Medical Fitness, and Emirates ID) is billed strictly at exact government cost, backed by official Ministry tax receipts.",
      stat: "AED 0",
      statLabel: "Undisclosed Markups",
      badge: "Ministry Tax Receipts Provided",
      perks: [
        "Itemized government tariffs billed at zero-markup exact cost",
        "Official Ministry of Finance & Federal ICP tax invoices provided",
        "Clear unbundled quotation provided before any application filing"
      ],
      quote: "Direct government fees, zero hidden markups. You pay exact government fees with genuine federal receipts.",
      actionText: "Calculate Exact Tariff",
      actionType: "calc"
    },
    {
      id: 'audit',
      tabLabel: "Pre-Flight Audit",
      tag: "99.8% APPROVAL",
      icon: FileCheck,
      headline: "Licensed Senior PRO Pre-Flight Legal Audit",
      description: "Avoid costly rejections, rejected Ejari registrations, or disqualified marriage certificates. Before submitting a single file to GDRFA or ICP, our licensed senior PROs perform a meticulous pre-flight audit to ensure 100% compliance with prevailing immigration regulations.",
      stat: "99.8%",
      statLabel: "ICP Approval Rate",
      badge: "Zero-Rejection Guarantee",
      perks: [
        "Comprehensive pre-submission audit of salary certificates, Ejari, and attestations",
        "MOJ-certified sworn Arabic translation verification",
        "Guaranteed rejection prevention backed by licensed PRO expertise"
      ],
      quote: "Every document is audited against current federal immigration directives before submission.",
      actionText: "Request Free Pre-Audit",
      actionType: "whatsapp"
    },
    {
      id: 'sla',
      tabLabel: "24–48H Turnaround",
      tag: "GUARANTEED SLA",
      icon: Zap,
      headline: "Express Fast-Track In-Country Stamping SLA",
      description: "Never worry about visa overstay fines or airport visa runs. We execute rapid in-country status adjustments, VIP private medical fitness appointments with same-day blood test results, and expedited biometric fingerprint scheduling within 24 to 48 hours.",
      stat: "24–48h",
      statLabel: "Status Change SLA",
      badge: "Zero Airport Exit Trips",
      perks: [
        "Seamless in-country status modification without leaving the UAE",
        "Priority VIP medical lounge appointments with express blood test results",
        "Expedited Emirates ID biometrics scheduling and priority doorstep delivery"
      ],
      quote: "Guaranteed express status change and residency stamping without leaving the country.",
      actionText: "Fast-Track Application",
      actionType: "whatsapp"
    }
  ];

  // Pure Services Catalog Data matching approved Layout B Scrollytelling
  const netlifyServicesList = [
    {
      id: 'golden-visa',
      category: 'golden',
      categoryTag: '10-YEAR SOVEREIGN',
      title: "10-Year UAE Golden Visa",
      desc: "Long-term self-sponsored residency without salary caps, local employers, or minimum UAE stay requirements.",
      price: "AED 3,864",
      perks: ["10-Year self-sponsorship", "Full family & domestic file sponsorship", "100% business ownership control", "VIP 24H priority fast-track"],
      actionId: 'golden',
      icon: Crown
    },
    {
      id: 'property-visa',
      category: 'golden',
      categoryTag: 'DLD VERIFIED',
      title: "Property Investor Visa (AED 750k+ / AED 2M+)",
      desc: "2-Year or 10-Year Golden Visa for ready or off-plan property equity certified by Dubai Land Department.",
      price: "AED 6,311",
      perks: ["Direct DLD Title Deed audit", "Mortgage equity acceptance", "Includes spouse & child files", "Official DLD Trustee filing"],
      actionId: 'property',
      icon: Building2
    },
    {
      id: 'family-visa',
      category: 'family',
      categoryTag: 'FAMILY SPONSORSHIP',
      title: "Family Residence Visa (Spouse & Kids)",
      desc: "Sponsor your spouse, children, or parents with a fully managed application from entry permit to Emirates ID.",
      price: "AED 1,103",
      perks: ["In-country status change", "VIP medical fitness booking", "Express Emirates ID typing", "Zero overstay fine risk"],
      actionId: 'family',
      icon: Heart
    },
    {
      id: 'maid-visa',
      category: 'family',
      categoryTag: 'DOMESTIC SPONSORSHIP',
      title: "Maid & Domestic Worker Visa",
      desc: "Legal sponsorship for housemaids, nannies, cooks, and drivers under family files with Tadbeer contracts.",
      price: "AED 1,650",
      perks: ["MOHRE legal agreement", "Medical test & health insurance", "Consulate clearance & stamping", "Door-to-door courier"],
      actionId: 'family',
      icon: ShieldCheck
    },
    {
      id: 'newborn-visa',
      category: 'family',
      categoryTag: '120-DAY FAST TRACK',
      title: "Newborn Baby Visa",
      desc: "Birth certificate typing, passport stamping, and Emirates ID delivery within the 120-day grace period.",
      price: "AED 1,029",
      perks: ["MOFA certificate translation", "Zero delay fines guarantee", "Direct GDRFA file linking", "Courier passport delivery"],
      actionId: 'family',
      icon: Baby
    },
    {
      id: 'medical-eid',
      category: 'corporate',
      categoryTag: 'VIP FAST-TRACK',
      title: "VIP Emirates ID & Medical Screening",
      desc: "VIP medical fitness check slot booking and priority biometrics scheduling with zero waiting queues.",
      price: "AED 2,500",
      perks: ["Same-day blood & X-ray results", "VIP lounge accession", "ICP fingerprinting slot", "Priority doorstep card delivery"],
      actionId: 'family',
      icon: Sparkles
    },
    {
      id: 'document-attestation',
      category: 'corporate',
      categoryTag: 'LEGAL & MOFA',
      title: "MOFA Document Attestation",
      desc: "Foreign embassy legalization and UAE MOFA stamps for marriage, degree, and birth certificates.",
      price: "AED 650",
      perks: ["Home country embassy stamp", "UAE Ministry of Foreign Affairs (MOFA)", "Notary public verification", "Insured international courier"],
      actionId: 'family',
      icon: FileCheck,
      iconBg: 'bg-gradient-to-br from-teal-500 via-emerald-600 to-teal-700 text-white shadow-[0_4px_16px_rgba(20,184,166,0.4)]'
    },
    {
      id: 'arabic-translation',
      category: 'corporate',
      categoryTag: 'MOJ CERTIFIED',
      title: "Sworn Arabic Legal Translation",
      desc: "MOJ certified legal translations accepted by GDRFA, DED, courts, and federal ministries.",
      price: "AED 450",
      perks: ["Ministry of Justice sworn stamp", "Accepted across all 7 emirates", "24-hour express turnaround", "Digital stamped copy provided"],
      actionId: 'family',
      icon: FileText,
      iconBg: 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 text-white shadow-[0_4px_16px_rgba(59,130,246,0.4)]'
    },
    {
      id: 'dld-trustee',
      category: 'golden',
      categoryTag: 'DLD AUDIT',
      title: "DLD Trustee & Power of Attorney",
      desc: "Dubai Land Department trustee representation, title deed updates, and notary public electronic POAs.",
      price: "AED 2,141",
      perks: ["Notary Public electronic POA", "Title deed issuance & transfer", "Mortgage release representation", "Official government receipt"],
      actionId: 'property',
      icon: Scale,
      iconBg: 'bg-gradient-to-br from-amber-600 via-yellow-600 to-orange-700 text-white shadow-[0_4px_16px_rgba(217,119,6,0.4)]'
    }
  ];

  const filteredNetlifyServices = activeTab === 'all'
    ? netlifyServicesList
    : netlifyServicesList.filter(s => s.category === activeTab);

  // Dual-Stream Scrolling Datasets (5 Services Left, 5 Services Right)
  const servicesRow1 = [
    netlifyServicesList[0], // 10-Year UAE Golden Visa
    netlifyServicesList[1], // Property Investor Visa
    netlifyServicesList[2], // Family Residence Visa
    netlifyServicesList[5], // VIP Emirates ID & Medical
    netlifyServicesList[7], // Sworn Arabic Translation
  ];

  const servicesRow2 = [
    netlifyServicesList[3], // Maid & Domestic Visa
    netlifyServicesList[4], // Newborn Baby Visa
    netlifyServicesList[6], // MOFA Document Attestation
    netlifyServicesList[8], // DLD Trustee & POA
    {
      id: 'fast-track-audit',
      category: 'golden',
      categoryTag: 'VIP CONCIERGE',
      title: "Express 24H In-Country Status Change",
      desc: "Instant visa status modification within UAE borders without airport runs or travel tickets.",
      price: "AED 1,180",
      actionId: 'golden',
      icon: Zap
    }
  ];

  // Articles List
  const fullArticlesList = [
    {
      id: 'freelance-visa-scam-dubai',
      title: 'Beware of Freelance Visa Scams in Dubai: How to Protect Yourself in 2026',
      excerpt: 'Learn how to identify fake freelance visa offers and protect your investments in the UAE with our comprehensive guide to vetting PRO agencies.',
      date: 'Oct 12, 2026',
      category: 'Warning & Alerts',
      readTime: '12 min read',
      author: 'Tariq Al-Mansoori',
      authorRole: 'Senior Verification Expert',
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'complete-guide-to-ejari-2026',
      title: 'The Ultimate Guide to EJARI for Family Sponsorship in Dubai',
      excerpt: 'Understand exactly what an EJARI is, why the GDRFA strictly requires it, and how to register your tenancy contract to ensure your family visa is approved.',
      date: 'Sep 28, 2026',
      category: 'Housing & EJARI',
      readTime: '15 min read',
      author: 'Elena Rostova',
      authorRole: 'GDRFA Compliance Specialist',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'golden-visa-rules-2026',
      title: '2026 Dubai Golden Visa Rules: Property Valuation & Salary Criteria',
      excerpt: 'Complete breakdown of official DLD and ICP rules for 10-year Golden Visa eligibility through real estate equity or high-income executive positions.',
      date: 'Aug 15, 2026',
      category: 'Residency Rules',
      readTime: '10 min read',
      author: 'Fatima Al-Mansoori',
      authorRole: 'Head of Legal & PRO',
      image: 'https://images.unsplash.com/photo-1546412414-8035e1786b9b?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'newborn-baby-visa-rules',
      title: 'Newborn Baby Visa Rules in Dubai: How to Avoid the 120-Day Penalty',
      excerpt: 'Step-by-step guide for parents on birth certificate attestation, entry permit typing, and Emirates ID delivery within the 120-day grace period.',
      date: 'Jul 20, 2026',
      category: 'Family Care',
      readTime: '8 min read',
      author: 'Zayed Al-Ameri',
      authorRole: 'Family Relations Manager',
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=1200&auto=format&fit=crop'
    }
  ];

  const filteredArticles = activeArticleTab === 'all'
    ? fullArticlesList
    : fullArticlesList.filter(a => a.category.toLowerCase().includes(activeArticleTab.toLowerCase()));

  const faqs = [
    {
      id: "salary-req",
      q: "What is the minimum salary required to sponsor a family visa in Dubai?",
      a: "To sponsor a spouse and children in Dubai, the minimum monthly salary requirement is AED 4,000 (or AED 3,000 + company housing). To sponsor parents, the minimum salary is AED 10,000 plus an active 2-bedroom Ejari tenancy contract. All contracts must be registered via MOHRE or free zone authority.",
      category: "SALARY & CRITERIA",
      tag: "GDRFA Regulated",
      statHighlight: { label: "Minimum Monthly Salary", val: "AED 4,000" },
      sla: "Same-Day Audit",
      perks: [
        "Spouse & children: AED 4,000/mo threshold",
        "Parents sponsorship: AED 10,000/mo + 2BR Ejari",
        "Valid across mainland & all UAE Free Zones"
      ]
    },
    {
      id: "in-country-status",
      q: "Can my family complete their visa processing while staying inside the UAE?",
      a: "Yes! Family members currently on visit visas, tourist visas, or cancelled residency visas can undergo an official 'In-Country Status Change' without airport runs or exiting the country. This saves substantial airfare and expedites your Emirates ID stamping.",
      category: "IN-COUNTRY STATUS",
      tag: "No Exit Required",
      statHighlight: { label: "Airport Exit Needed", val: "0 Visits" },
      sla: "24–48h Turnaround",
      perks: [
        "Immediate file switch within the UAE",
        "Zero flight tickets or border exit trips",
        "Preserves existing medical fitness records"
      ]
    },
    {
      id: "unbundled-fees",
      q: "Are government fees included in your pricing?",
      a: "We operate on a 100% transparent, unbundled pricing philosophy. All official government tariffs (GDRFA, ICP, DED, DLD, Medical fitness, Emirates ID) are billed at exact government cost with official Ministry receipts provided directly to you.",
      category: "TRANSPARENCY",
      tag: "100% Unbundled",
      statHighlight: { label: "Hidden Surcharges", val: "AED 0" },
      sla: "Official Receipts",
      perks: [
        "Zero markup on government ministry tariffs",
        "Official federal tax invoices and receipts",
        "Clear itemized quotes prior to case submission"
      ]
    },
    {
      id: "emirates-coverage",
      q: "Which Emirates do you cover for Family and Golden Visas?",
      a: "We process residency and corporate visas across all 7 UAE Emirates: Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain. Our PROs coordinate directly with GDRFA Dubai and federal ICP Abu Dhabi authorities.",
      category: "FEDERAL SCOPE",
      tag: "All 7 Emirates",
      statHighlight: { label: "Federal Jurisdiction", val: "7 Emirates" },
      sla: "Nationwide PRO",
      perks: [
        "Direct GDRFA Dubai & ICP Federal access",
        "Inter-emirate visa transfers and status shifts",
        "VIP door-to-door courier across all emirates"
      ]
    },
    {
      id: "attestation-req",
      q: "What document attestations are required for family sponsorship?",
      a: "Marriage certificates and children's birth certificates issued outside the UAE must undergo legal attestation: first in the home country (Notary & Ministry of Foreign Affairs), then the UAE Embassy abroad, and finally MOFA in Dubai. Sworn Arabic translation is mandatory.",
      category: "LEGAL & MOFA",
      tag: "MOFA Certified",
      statHighlight: { label: "Attestation Route", val: "Full MOFA Chain" },
      sla: "2–3 Days Express",
      perks: [
        "Complete embassy and MOFA attestation service",
        "MOJ-certified sworn Arabic legal translation",
        "Safe insured international document courier"
      ]
    },
    {
      id: "female-sponsor",
      q: "Can a female resident sponsor her husband and children in Dubai?",
      a: "Yes. Under modern GDRFA guidelines, employed mothers, doctors, engineers, executives, and female entrepreneurs earning a minimum salary of AED 10,000 (or AED 8,000 + housing) can sponsor their husband and children seamlessly.",
      category: "FEMALE SPONSORSHIP",
      tag: "GDRFA Standard",
      statHighlight: { label: "Minimum Female Salary", val: "AED 10,000" },
      sla: "Full Equality",
      perks: [
        "Mothers can sponsor children independently",
        "Sponsorship of husband with standard NOC",
        "Medical insurance packages included"
      ]
    }
  ];

  return (
    <div className="w-full bg-[#FAF8F5] dark:bg-[#0D0B08] text-slate-900 dark:text-[#F3EDE2] transition-colors duration-300 overflow-x-hidden font-sans relative">

      {/* Ambient Radial Gold Glow background (Inspired by goldenvisadubai.ai) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[700px] pointer-events-none opacity-30 dark:opacity-20">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.18),transparent_70%)]" />
      </div>

      {/* 2. HERO MASTHEAD SECTION (Cinematic Dubai Skyline Video & Luxury Sovereign Gold System) */}
      <section 
        id="hero" 
        className="w-full text-white py-14 sm:py-20 px-4 md:px-8 relative z-10 transition-colors duration-300 border-b border-[#EFC45C]/25 overflow-hidden bg-[#0B0A08]"
      >
        {/* High-Definition Dubai Skyline Background Video */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1920&auto=format&fit=crop"
            className="w-full h-full object-cover opacity-45 brightness-90 contrast-125 scale-105"
          >
            <source src="/videos/dubai-hero.webm" type="video/webm" />
          </video>
          {/* Sovereign Warm Gold & Espresso Gradient Overlays to Ensure Pristine Contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0A08]/95 via-[#0F0E0C]/80 to-[#0B0A08]/90 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0A08]/40 to-[#0B0A08] pointer-events-none" />
        </div>

        <div className="max-w-[1340px] mx-auto relative z-10">

          {/* Radial Gold Arc Bloom */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-[radial-gradient(circle,rgba(239,196,92,0.24)_0%,transparent_70%)] blur-[56px] pointer-events-none rounded-full" />
          <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-[#DBB24B]/10 blur-[130px] pointer-events-none rounded-full hidden lg:block" />

          {/* MAIN HERO SPLIT: Text on Left (50%), Option A Dual-Tier Bento Cards on Right (50%) */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-center w-full justify-between relative z-10">

            {/* LEFT SIDE: Minimalist Luxury Headline & Authority */}
            <motion.div
              className="w-full lg:w-[50%] text-left"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {/* Skeuomorphic Gold Stamp Badge */}
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-[#D4AF37]/15 text-[#F3E5AB] px-4 py-2 rounded-[8px] mb-6 border border-[#D4AF37]/40 text-xs font-extrabold uppercase tracking-[0.18em] hybrid-neumorphic-inset shadow-md">
                <Crown className="w-4 h-4 text-[#D4AF37] animate-pulse" />
                <span>OFFICIAL GDRFA & ICP CONCIERGE</span>
              </motion.div>

              {/* Masthead Headline with Luminous Gold Text Clips */}
              <motion.h1 variants={itemVariants} className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6 text-white font-sans">
                Dubai 10-Year <br />
                <span className="bg-gradient-to-r from-[#FFFFFF] via-[#FFF6DC] via-35% via-[#F3D489] to-[#DBB24B] bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(219,178,75,0.35)] font-black">Golden &amp; Property</span> Residency
              </motion.h1>

              <motion.p variants={itemVariants} className="text-base sm:text-lg text-slate-300 mb-8 max-w-xl leading-relaxed font-medium">
                Official Dubai Land Department (DLD) property equity valuation, Golden Visa self-sponsorship, family residence visas, and 24H VIP Emirates ID processing with 100% SLA approval guarantee.
              </motion.p>

              {/* Trust Pill Tags */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-8 text-xs font-extrabold uppercase tracking-wider text-slate-300">
                <span className="flex items-center gap-1.5 bg-slate-900/90 px-3.5 py-1.5 rounded-[8px] border border-slate-800 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> DET Licensed
                </span>
                <span className="flex items-center gap-1.5 bg-slate-900/90 px-3.5 py-1.5 rounded-[8px] border border-slate-800 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> ICP & GDRFA Direct
                </span>
                <span className="flex items-center gap-1.5 bg-slate-900/90 px-3.5 py-1.5 rounded-[8px] border border-slate-800 shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Transparent Fees
                </span>
              </motion.div>

              {/* CTA Action Buttons */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onOpenCalculator && onOpenCalculator(calcGoal)}
                  className="bg-[#EFC45C] hover:bg-[#F7DE9C] text-[#0B0A08] font-black px-8 py-4 rounded-[10px] shadow-[0_4px_20px_rgba(239,196,92,0.35)] hover:scale-103 active:scale-97 transition-all duration-300 text-xs uppercase tracking-widest flex items-center justify-center gap-3 group cursor-pointer"
                >
                  <span>START APPLICATION ↗</span>
                </button>

                <button
                  onClick={() => window.open('https://wa.me/971501234567', '_blank')}
                  className="bg-[#25D366] hover:bg-[#20BD5A] text-white font-black px-8 py-4 rounded-[10px] shadow-[0_4px_20px_rgba(37,211,102,0.35)] hover:scale-103 active:scale-97 transition-all duration-300 text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-white fill-current" />
                  <span>GET FREE CONSULTATION</span>
                </button>
              </motion.div>
            </motion.div>

            {/* RIGHT SIDE: OPTION A DUAL-TIER BENTO GLASS CARDS */}
            <motion.div variants={itemVariants} className="w-full lg:w-[50%] flex flex-col items-center">
              <div className="w-full max-w-lg flex flex-col gap-4">

                {/* TIER 1: 3 SIDE-BY-SIDE CATEGORY CARDS */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      id: 'golden',
                      title: 'Golden Visa',
                      sub: '(10-Year)',
                      price: '3,864',
                      icon: Crown,
                    },
                    {
                      id: 'property',
                      title: 'Property Visa',
                      sub: '(5-Year)',
                      price: '6,311',
                      icon: Building2,
                    },
                    {
                      id: 'family',
                      title: 'Family Visa',
                      sub: '(Residency)',
                      price: '1,103',
                      icon: Users,
                    }
                  ].map((card) => {
                    const isSelected = calcGoal === card.id;
                    const IconComp = card.icon;
                    return (
                      <motion.div
                        key={card.id}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setCalcGoal(card.id);
                          }}
                        className={`p-3.5 sm:p-4 rounded-[16px] border text-center transition-all cursor-pointer backdrop-blur-2xl relative overflow-hidden flex flex-col items-center justify-between card-shine ${isSelected
                            ? 'border-[#EFC45C] bg-gradient-to-b from-[#251E13] via-[#14100A] to-[#080705] shadow-[0_10px_28px_rgba(239,196,92,0.35),inset_0_1px_1px_rgba(255,255,255,0.15)] ring-1 ring-[#EFC45C]/60'
                            : 'border-[#2D2619] bg-gradient-to-b from-[#18140E] to-[#0D0B08] hover:border-[#EFC45C]/60 hover:bg-[#1E1911] shadow-md'
                          }`}
                      >
                        <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center mb-2.5 transition-all ${isSelected
                            ? 'bg-gradient-to-br from-[#F7DE9C] via-[#EFC45C] to-[#C99824] text-[#0B0A08] shadow-[0_4px_14px_rgba(239,196,92,0.5)]'
                            : 'luxury-icon-emblem-dark'
                          }`}>
                          <IconComp className="w-4 h-4 stroke-[2.2]" />
                        </div>
                        <div className={`text-xs font-black tracking-tight ${isSelected ? 'text-[#F7DE9C]' : 'text-slate-200'}`}>
                          {card.title}
                        </div>
                        <div className="text-xs text-slate-400 font-medium mb-1.5">
                          {card.sub}
                        </div>
                        <div className={`text-xs font-mono font-black px-2 py-0.5 rounded-[8px] border w-full ${isSelected
                            ? 'bg-[#EFC45C]/20 text-[#F7DE9C] border-[#EFC45C]/60 shadow-xs'
                            : 'bg-black/60 text-[#D8CFBC] border-white/10'
                          }`}>
                          <span className="text-xs text-[#A19D94] block sm:inline mr-1">AED</span>
                          {card.price}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* TIER 2: STREAMLINED LIVE PATHWAY SNAPSHOT */}
                <div className="w-full bg-gradient-to-b from-[#15120D] via-[#0D0B08] to-[#070604] border border-[#EFC45C]/40 rounded-[20px] p-5 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.08)] backdrop-blur-3xl hybrid-3d-card relative overflow-hidden card-shine">

                  {/* Top Ambient Glow */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

                  {/* Header Row */}
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EFC45C] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#EFC45C]"></span>
                      </span>
                      <span className="text-xs font-black uppercase tracking-[0.16em] text-[#D4AF37] font-mono">
                        Live Pathway Snapshot
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-[8px]">
                      Official ICP & GDRFA
                    </span>
                  </div>

                  {/* Live Big Fee Display */}
                  <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-slate-900">
                    <div>
                      <span className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight mr-2">
                        {calcGoal === 'golden' ? '3,864' : calcGoal === 'property' ? '6,311' : '1,103'}
                      </span>
                      <span className="text-xs font-black text-[#D4AF37] font-mono uppercase">
                        AED Estimated Starting
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-[8px]">
                      100% SLA Guarantee
                    </span>
                  </div>

                  {/* Simplified Key Guarantees */}
                  <div className="grid grid-cols-3 gap-2.5 mb-4 text-center">
                    <div className="p-3 rounded-[12px] bg-gradient-to-b from-[#1C1811] to-[#120F0A] border border-[#EFC45C]/25 shadow-xs">
                      <Clock className="w-4 h-4 text-[#EFC45C] mx-auto mb-1.5" />
                      <div className="text-xs font-bold text-slate-200">24H Fast-Track</div>
                      <div className="text-[11px] text-slate-400">VIP Turnaround</div>
                    </div>
                    <div className="p-3 rounded-[12px] bg-gradient-to-b from-[#1C1811] to-[#120F0A] border border-[#EFC45C]/25 shadow-xs">
                      <ShieldCheck className="w-4 h-4 text-[#EFC45C] mx-auto mb-1.5" />
                      <div className="text-xs font-bold text-slate-200">Zero Queues</div>
                      <div className="text-[11px] text-slate-400">Doorstep Biometrics</div>
                    </div>
                    <div className="p-3 rounded-[12px] bg-gradient-to-b from-[#1C1811] to-[#120F0A] border border-[#EFC45C]/25 shadow-xs">
                      <Award className="w-4 h-4 text-[#EFC45C] mx-auto mb-1.5" />
                      <div className="text-xs font-bold text-slate-200">Direct Endorsed</div>
                      <div className="text-[11px] text-slate-400">DLD / ICP Channel</div>
                    </div>
                  </div>

                  {/* Non-competing Secondary Action Link */}
                  <button
                    onClick={() => onOpenCalculator && onOpenCalculator(calcGoal)}
                    className="w-full text-center text-xs font-bold text-[#EFC45C] hover:text-[#F7DE9C] hover:underline flex items-center justify-center gap-1.5 pt-3 border-t border-slate-900 cursor-pointer"
                  >
                    <span>View itemized government tariff schedule & documents</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 3. ACHIEVEMENTS & TRUST METRICS (Alabaster Paper Canvas from goldenvisadubai.ai) */}
      <section id="achievements" className="w-full bg-[#FAF9F6] dark:bg-[#14100A] border-y border-[#E8DFC8] dark:border-[#EFC45C]/20 py-20 px-4 md:px-8 relative z-10 transition-colors duration-300">
        <div className="max-w-[1340px] mx-auto space-y-12">

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[8px] bg-[#F6EED9] border border-[#EFC45C]/40 text-[#8A6412] dark:bg-[#1E1A12] dark:text-[#EFC45C] text-xs font-black uppercase tracking-[0.2em] mb-4 shadow-sm">
              <Award className="w-3.5 h-3.5 text-[#8A6412] dark:text-[#EFC45C]" />
              <span>GOVERNMENT TRACK RECORD</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight mb-3 font-sans">
              Unmatched Authority in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C59B27] via-[#D4AF37] to-[#B38012] dark:from-[#F7DE9C] dark:via-[#EFC45C] dark:to-[#C99824]">UAE Residency</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-semibold leading-relaxed">
              Proven Excellence and Strategic Expertise in Securing Your Future in Dubai
            </p>
          </div>

          {/* 4 Core Scrollytelling Metric Figures with Ambient Glow in Dark Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6 sm:p-8 rounded-[16px] bg-[#0B0A08] border border-[#EFC45C]/35 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-3xl hybrid-3d-card relative overflow-hidden text-center">

            {/* Ambient Radial Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-40 bg-[#EFC45C]/15 rounded-full blur-3xl pointer-events-none" />

            <motion.div whileHover={{ scale: 1.05 }} className="space-y-1 p-2 md:border-r md:border-white/10">
              <div className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#F7DE9C] via-[#EFC45C] to-[#C99824] drop-shadow-[0_4px_24px_rgba(239,196,92,0.45)]">
                500+
              </div>
              <div className="text-xs font-black uppercase tracking-[0.14em] text-white font-sans mt-2 mb-1">
                CORPORATE ENTITIES
              </div>
              <div className="text-xs text-slate-400 font-medium leading-relaxed max-w-[210px] mx-auto">
                Incorporated across Dubai DIFC, ADGM & Free Zones
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="space-y-1 p-2 md:border-r md:border-white/10">
              <div className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#F7DE9C] via-[#EFC45C] to-[#C99824] drop-shadow-[0_4px_24px_rgba(239,196,92,0.45)]">
                15,000+
              </div>
              <div className="text-xs font-black uppercase tracking-[0.14em] text-white font-sans mt-2 mb-1">
                VISAS PROCESSED
              </div>
              <div className="text-xs text-slate-400 font-medium leading-relaxed max-w-[210px] mx-auto">
                Zero-rejection SLA across GDRFA & ICP portals
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="space-y-1 p-2 md:border-r md:border-white/10">
              <div className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#F7DE9C] via-[#EFC45C] to-[#C99824] drop-shadow-[0_4px_24px_rgba(239,196,92,0.45)]">
                15+
              </div>
              <div className="text-xs font-black uppercase tracking-[0.14em] text-white font-sans mt-2 mb-1">
                YEARS IN DUBAI
              </div>
              <div className="text-xs text-slate-400 font-medium leading-relaxed max-w-[210px] mx-auto">
                Senior advisory council headquartered in Business Bay
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="space-y-1 p-2">
              <div className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#F7DE9C] via-[#EFC45C] to-[#C99824] drop-shadow-[0_4px_24px_rgba(239,196,92,0.45)]">
                99.8%
              </div>
              <div className="text-xs font-black uppercase tracking-[0.14em] text-white font-sans mt-2 mb-1">
                SLA ACCURACY
              </div>
              <div className="text-xs text-slate-400 font-medium leading-relaxed max-w-[210px] mx-auto">
                Statutory government fees billed at exact cost
              </div>
            </motion.div>
          </div>

          {/* 5 Dark Achievement Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-5">
            {[
              { icon: Award, num: "No #1", sub: "Top Agency" },
              { icon: Star, num: "4.9★", sub: "Google Rating" },
              { icon: ShieldCheck, num: "100%", sub: "Client Satisfaction" },
              { icon: Users, num: "15+", sub: "Expert Senior PROs" },
              { icon: FileCheck, num: "5,500+", sub: "Visas Stamped" }
            ].map((badge, idx) => {
              const BadgeIcon = badge.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.04, y: -3 }}
                  className="p-5 sm:p-6 rounded-[18px] bg-gradient-to-b from-[#1C1812] via-[#120F0A] to-[#080705] hover:from-[#241E15] hover:via-[#18140D] hover:to-[#0C0A07] border border-[#EFC45C]/35 hover:border-[#EFC45C] shadow-[0_12px_32px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.08)] hover:shadow-[0_16px_40px_rgba(239,196,92,0.3)] backdrop-blur-2xl flex flex-col items-center justify-center text-center transition-all group hybrid-3d-card card-shine"
                >
                  <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-[#2E2413] via-[#20180B] to-[#140F06] border border-[#EFC45C]/60 text-[#F5CF6B] flex items-center justify-center mb-3.5 group-hover:scale-110 group-hover:border-[#EFC45C] group-hover:shadow-[0_6px_18px_rgba(239,196,92,0.4)] shadow-[0_4px_12px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(239,196,92,0.3)] transition-all">
                    <BadgeIcon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#FFF0C8] via-[#F5CF6B] to-[#C99824] font-mono tracking-tight mb-1 drop-shadow-[0_2px_8px_rgba(239,196,92,0.35)]">
                    {badge.num}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-200 group-hover:text-white transition-colors">
                    {badge.sub}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </section>


      {/* 4. WHY CHOOSE 800 DOCS — INTERACTIVE TABBED PILLARS (Warm Linen Paper from goldenvisadubai.ai) */}
      <section id="why-us" className="w-full bg-[#F5EFE0] dark:bg-[#1A140C] border-b border-[#E0D3B8] dark:border-[#EFC45C]/20 py-24 px-4 md:px-8 relative z-10 transition-colors duration-300">
        <div className="max-w-[1340px] mx-auto">

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[8px] bg-[#F6EED9] border border-[#EFC45C]/40 text-[#8A6412] dark:bg-[#1E1A12] dark:text-[#EFC45C] text-xs font-black uppercase tracking-[0.2em] mb-4 shadow-sm">
              <Award className="w-3.5 h-3.5 text-[#8A6412] dark:text-[#EFC45C]" />
              <span>THE 800 DOCS STANDARD</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight mb-4 font-sans">
              Why Choose <span className="hybrid-gold-text">US</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 font-semibold text-sm sm:text-base leading-relaxed">
              Setting the benchmark in sovereign residency, unbundled transparency, and white-glove government concierge.
            </p>
          </div>

          {/* 4 Top Luxury Tab Selectors */}
          <div role="tablist" aria-label="Why Choose 800 DOCS Pillars" className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
            {whyChoosePillars.map((pillar) => {
              const isSelected = whyChooseTab === pillar.id;
              const TabIcon = pillar.icon;
              return (
                <motion.button
                  key={pillar.id}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls="why-choose-content"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setWhyChooseTab(pillar.id);
                  }}
                  className={`group p-4 sm:p-5 rounded-[16px] border text-left transition-all duration-300 flex items-center gap-3.5 cursor-pointer relative overflow-hidden card-shine ${isSelected
                      ? 'bg-gradient-to-b from-[#1A1610] via-[#100E0A] to-[#070604] text-white border-[#EFC45C] shadow-[0_12px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(239,196,92,0.4)] ring-1 ring-[#EFC45C]/60'
                      : 'bg-gradient-to-b from-[#FFFFFF] via-[#FAF7F0] to-[#F1ECE1] border-[#DCD1BA] text-[#1F190C] hover:border-[#EFC45C]/70 shadow-[0_4px_16px_rgba(40,30,10,0.04),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-[0_8px_24px_rgba(239,196,92,0.18)] hover:-translate-y-0.5'
                    }`}
                >
                  <div className={`w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0 transition-all ${isSelected
                      ? 'bg-gradient-to-br from-[#F7DE9C] via-[#EFC45C] to-[#C99824] text-[#0B0A08] shadow-[0_4px_14px_rgba(239,196,92,0.5)]'
                      : 'luxury-icon-emblem shadow-xs'
                    }`}>
                    <TabIcon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`text-xs font-bold uppercase tracking-wider font-mono block ${isSelected ? 'text-[#EFC45C]' : 'text-[#8A6412] dark:text-[#A19D94]'
                      }`}>
                      {pillar.tag}
                    </span>
                    <div className="text-xs sm:text-sm font-black tracking-tight leading-snug">
                      {pillar.tabLabel}
                    </div>
                  </div>

                  <div className="ml-auto shrink-0 flex items-center">
                    <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isSelected ? 'text-[#EFC45C] translate-x-0.5' : 'text-slate-400 group-hover:translate-x-0.5'}`} />
                  </div>

                  {isSelected && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#EFC45C]" />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Dynamic Interactive Showcase Console */}
          <AnimatePresence mode="wait">
            {(() => {
              const currentPillar = whyChoosePillars.find(p => p.id === whyChooseTab) || whyChoosePillars[0];
              const PillarIcon = currentPillar.icon;
              return (
                <motion.div
                  key={currentPillar.id}
                  id="why-choose-content"
                  role="tabpanel"
                  aria-labelledby={currentPillar.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="p-8 sm:p-10 rounded-[20px] bg-gradient-to-b from-[#FFFFFF] via-[#FAF8F3] to-[#F4EEE0] border border-[#DDD3BD] shadow-[0_24px_60px_rgba(40,30,10,0.06),inset_0_1px_1px_rgba(255,255,255,1)] backdrop-blur-3xl hybrid-3d-card relative overflow-hidden card-shine"
                >
                  {/* Ambient Radial Gold Luminescence */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-[#EFC45C]/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                    {/* Left Column: Feature Focus (7 Cols) */}
                    <div className="lg:col-span-7 space-y-6 text-left">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-black uppercase tracking-wider text-[#8A6412] font-mono px-3 py-1 rounded-[8px] bg-gradient-to-r from-[#F8EED6] to-[#EEDDB2] border border-[#EFC45C]/60 shadow-xs">
                          {currentPillar.badge}
                        </span>
                        <span className="text-xs font-mono text-emerald-600 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 rounded-[8px] flex items-center gap-1.5 font-bold">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          ACTIVE VERIFIED SLA
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-snug font-sans">
                        {currentPillar.headline}
                      </h3>

                      <p className="text-slate-600 font-medium text-xs sm:text-sm leading-relaxed max-w-2xl">
                        {currentPillar.description}
                      </p>

                      {/* 3 Executive Deliverables with Gold Checkmarks */}
                      <div className="space-y-3 pt-2">
                        {currentPillar.perks.map((perk, i) => (
                          <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-800 font-medium">
                            <div className="w-4 h-4 rounded-full bg-[#EFC45C]/25 border border-[#EFC45C]/60 flex items-center justify-center shrink-0 mt-0.5">
                              <CheckCircle2 className="w-3 h-3 text-[#8A6412]" />
                            </div>
                            <span>{perk}</span>
                          </div>
                        ))}
                      </div>

                      {/* Key Numeric Metric Highlight & Action CTA */}
                      <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                        <div className="p-3.5 px-5 rounded-[12px] bg-gradient-to-b from-[#FAF6EE] to-[#EFE7D5] border border-[#DFD3BA] shadow-xs flex items-center gap-3">
                          <div className="text-2xl font-black font-mono text-[#8A6412] tracking-tight">
                            {currentPillar.stat}
                          </div>
                          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                            {currentPillar.statLabel}
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            if (currentPillar.actionType === 'calc') {
                              onOpenCalculator('golden');
                            } else {
                              window.open('https://wa.me/971586600396?text=Hello%2C%20I%20am%20interested%20in%20learning%20more%20about%20800%20DOCS%20services', '_blank');
                            }
                          }}
                          className={currentPillar.actionType === 'whatsapp'
                            ? "bg-[#25D366] hover:bg-[#20BD5A] text-white font-black py-3.5 px-6 rounded-[10px] shadow-[0_4px_16px_rgba(37,211,102,0.35)] text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
                            : "btn-gold shimmer-sweep text-[#0B0A08] font-black py-3.5 px-6 rounded-[10px] shadow-[0_4px_16px_rgba(239,196,92,0.3)] text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
                          }
                        >
                          <MessageSquare className={`w-4 h-4 stroke-[2.5] ${currentPillar.actionType === 'whatsapp' ? 'text-white fill-current' : 'text-[#0B0A08]'}`} />
                          <span>{currentPillar.actionText} →</span>
                        </motion.button>
                      </div>

                    </div>

                    {/* Right Column: Trust & Verification Vault Card (5 Cols) */}
                    <div className="lg:col-span-5 flex flex-col gap-4">

                      {/* Official Seal Console */}
                      <div className="p-7 rounded-[18px] bg-gradient-to-b from-[#FAF6EE] to-[#F0E8D5] border-2 border-[#E5D7B7] shadow-[0_8px_24px_rgba(40,30,10,0.06),inset_0_1px_2px_rgba(255,255,255,1)] flex flex-col items-center text-center relative overflow-hidden">
                        <div className="w-16 h-16 rounded-[14px] luxury-icon-emblem flex items-center justify-center mb-4 mx-auto">
                          <Crown className="w-8 h-8 stroke-[2.2]" />
                        </div>

                        <div className="text-xs font-black uppercase tracking-[0.2em] text-[#8A6412] font-mono mb-1">
                          FEDERAL COMPLIANCE SEAL
                        </div>
                        <h4 className="text-base font-black text-slate-950 mb-2">
                          Official Government Protocol
                        </h4>

                        <p className="text-xs text-slate-600 font-medium italic leading-relaxed mb-4 px-2">
                          "{currentPillar.quote}"
                        </p>

                        <div className="w-full pt-4 border-t border-[#DFD8C5] flex items-center justify-between text-xs font-mono text-slate-500">
                          <span>DET License:</span>
                          <span className="text-slate-900 font-bold">800 DOCS LLC SOC</span>
                        </div>
                      </div>

                      {/* Live Case Officer Assistance Card */}
                      <div className="p-4 rounded-[14px] bg-gradient-to-b from-[#FFFFFF] to-[#F8F4EA] border border-[#DFD5BF] shadow-[0_4px_14px_rgba(0,0,0,0.04)] flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-[10px] luxury-icon-emblem flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5" />
                          </div>
                          <div className="text-left">
                            <div className="text-xs font-black text-slate-950">Senior PRO Case Officer</div>
                            <div className="text-xs text-slate-500 font-medium">Available online 24/7</div>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-black text-emerald-600 px-2.5 py-1 rounded-[8px] bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          Active Now
                        </span>
                      </div>

                    </div>

                  </div>

                  {/* Bottom Trust Highlights Row */}
                  <div className="mt-8 pt-6 border-t border-[#DFD8C5] dark:border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8A6412] dark:text-[#EFC45C]" />
                      <span>DET Licensed 800 DOCS LLC SOC</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8A6412] dark:text-[#EFC45C]" />
                      <span>Direct ICP & GDRFA Integration</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8A6412] dark:text-[#EFC45C]" />
                      <span>DLD Real Estate Trustee Filing</span>
                    </div>
                  </div>

                </motion.div>
              );
            })()}
          </AnimatePresence>

        </div>
      </section>

      {/* 5. SERVICES SECTION — ELEVATED LUXURY 3x2 GRID (Warm Champagne Pearl from goldenvisadubai.ai) */}
      <section id="services" className="w-full bg-[#FAF8F5] dark:bg-[#120E09] border-b border-[#E8DFC8] dark:border-[#EFC45C]/20 py-24 px-4 md:px-8 relative z-10 transition-colors duration-300">
        <div className="max-w-[1340px] mx-auto">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[8px] bg-[#F6EED9] border border-[#EFC45C]/40 text-[#8A6412] dark:bg-[#1E1A12] dark:text-[#EFC45C] text-xs font-black uppercase tracking-[0.2em] mb-4 shadow-sm font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#8A6412] dark:text-[#EFC45C]" />
              <span>OFFICIAL RESIDENCY & PRO DIRECTORY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight mb-4 font-sans">
              Our <span className="hybrid-gold-text">Services</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 font-normal text-sm sm:text-base leading-relaxed">
              Comprehensive residency, property investment visas, and white-glove government clearance solutions managed with official UAE authorities.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'golden', label: 'Golden & Property Visas' },
              { id: 'family', label: 'Family & Domestic Visas' },
              { id: 'corporate', label: 'Corporate & Legal PRO' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-[10px] text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#0B0A08] text-[#EFC45C] border border-[#EFC45C] shadow-md dark:bg-white dark:text-slate-950 dark:border-white'
                    : 'bg-[#FAF9F6] dark:bg-[#1A160F] text-[#1F190C] dark:text-[#E8E2D5] border border-[#E8DFC8] dark:border-[#2A241A] hover:border-[#EFC45C]/50 shadow-sm'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 3x2 Grid of Service Cards (NO Upper Image, Centered Icon Badge + Content + Action Link) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredNetlifyServices.slice(0, 6).map((service) => {
              const ServiceIcon = service.icon || Building2;
              return (
                <motion.div
                  key={service.id}
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="p-7 sm:p-8 rounded-[22px] bg-gradient-to-b from-[#FFFFFF] via-[#FDFCFA] to-[#F6F1E3] border border-[#E2D6BA] hover:border-[#EFC45C] shadow-[0_10px_32px_rgba(50,35,10,0.06),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-[0_24px_55px_rgba(239,196,92,0.26),0_6px_16px_rgba(0,0,0,0.04)] flex flex-col items-center text-center justify-between group transition-all duration-300 relative overflow-hidden card-shine"
                >
                  {/* Subtle Ambient Luminescence on hover */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#EFC45C]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#EFC45C]/20 transition-colors" />

                  <div className="w-full flex flex-col items-center">
                    {/* Unified 3D Luxury Gold Icon Emblem */}
                    <div className="w-16 h-16 rounded-[18px] luxury-icon-emblem flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-2 group-hover:shadow-[0_12px_28px_rgba(239,196,92,0.45)] transition-all duration-300">
                      <ServiceIcon className="w-8 h-8 stroke-[2.2]" />
                    </div>

                    {/* Category Rosette Tag */}
                    <span className="luxury-pill-tag text-[11px] font-mono font-black uppercase tracking-wider mb-2.5 px-3 py-1 rounded-[8px] inline-flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#8A6412]" />
                      {service.categoryTag}
                    </span>

                    {/* Service Title */}
                    <h3 className="text-lg sm:text-xl font-black text-slate-950 mb-2.5 tracking-tight group-hover:text-[#8A6412] transition-colors leading-snug">
                      {service.title}
                    </h3>

                    {/* Service Description */}
                    <p className="text-xs sm:text-[13px] text-slate-600 font-medium leading-relaxed mb-5">
                      {service.desc}
                    </p>

                    {/* Key Perks / Deliverables Inset */}
                    {service.perks && (
                      <div className="w-full luxury-perks-inset p-4 rounded-[14px] space-y-2 mb-5 text-left">
                        {service.perks.slice(0, 2).map((perk, pIdx) => (
                          <div key={pIdx} className="flex items-center gap-2.5 text-xs text-slate-800 font-semibold">
                            <div className="w-4 h-4 rounded-full bg-[#EFC45C]/25 border border-[#EFC45C]/60 flex items-center justify-center shrink-0">
                              <CheckCircle2 className="w-3 h-3 text-[#8A6412]" />
                            </div>
                            <span className="line-clamp-1">{perk}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Bottom Row: Tariff & Action Link */}
                  <div className="w-full pt-4 border-t border-[#E5DBC1] flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-500 font-mono block uppercase tracking-wider text-left font-bold">ESTIMATED TARIFF</span>
                      <span className="text-base sm:text-lg font-black font-mono text-slate-950">
                        {service.price}
                      </span>
                    </div>

                    <button
                      onClick={() => onOpenCalculator(service.actionId || 'golden')}
                      aria-label={`View ${service.title} services and tariffs`}
                      className="btn-gold shimmer-sweep text-[#0B0A08] font-black text-xs px-5 py-2.5 rounded-[10px] shadow-[0_4px_14px_rgba(239,196,92,0.35)] hover:shadow-[0_6px_20px_rgba(239,196,92,0.5)] inline-flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <span>View Services</span>
                      <ArrowRight className="w-4 h-4 text-[#0B0A08] stroke-[2.5] group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </motion.div>
              );
            })}
          </div>

          {/* Bottom VIP Relocation Assistance Banner */}
          <div className="mt-14 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-4 p-4 px-6 rounded-[12px] bg-[#FAF9F6] dark:bg-[#181510] border border-[#E8DFC8] dark:border-[#2A241A] shadow-sm text-xs">
              <span className="text-slate-600 dark:text-slate-300 font-medium">
                Looking for customized VIP corporate or family relocation packages?
              </span>
              <button 
                onClick={() => window.open('https://wa.me/971586600396?text=Hello%20800%20DOCS%2C%20I%20would%20like%20a%20customized%20residency%20package.', '_blank')}
                className="text-[#8A6412] dark:text-[#EFC45C] hover:underline font-bold inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Speak with Senior Case Officer on WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 7. DLD PROPERTY INVESTOR SUPPORT — LUXURY CONSOLE (Alabaster Paper from goldenvisadubai.ai) */}
      <section id="property-support" className="w-full bg-[#F5EFE0] dark:bg-[#18130D] border-b border-[#E0D3B8] dark:border-[#EFC45C]/20 py-24 px-4 md:px-8 relative z-10 transition-colors duration-300">
        <div className="max-w-[1340px] mx-auto">

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[8px] bg-[#F6EED9] border border-[#EFC45C]/40 text-[#8A6412] dark:bg-[#1E1A12] dark:text-[#EFC45C] text-xs font-black uppercase tracking-[0.2em] mb-4 shadow-sm">
              <Building2 className="w-3.5 h-3.5 text-[#8A6412] dark:text-[#EFC45C]" />
              <span>DUBAI LAND DEPARTMENT · TASKEEN DIRECTORY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight mb-4 font-sans">
              Complete Property Investor <span className="hybrid-gold-text">Residency Support</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 font-semibold text-sm sm:text-base leading-relaxed">
              Direct DLD Taskeen submission for completed title deeds and off-plan equity across Dubai.
            </p>
          </div>

          {/* Dual Luxury Glass Slabs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Card 1: Property Investor Visa */}
            <motion.div
              whileHover={{ scale: 1.015, y: -5 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="p-8 sm:p-9 rounded-[22px] bg-gradient-to-b from-[#FFFFFF] via-[#FDFBF7] to-[#F6F0E2] border border-[#E2D5BA] hover:border-[#EFC45C] shadow-[0_12px_36px_rgba(50,35,10,0.06),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-[0_24px_55px_rgba(239,196,92,0.28)] backdrop-blur-2xl flex flex-col justify-between transition-all duration-300 group relative overflow-hidden text-left card-shine"
            >
              {/* Ambient Radial Glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#EFC45C]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#EFC45C]/20 transition-colors" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-[16px] luxury-icon-emblem flex items-center justify-center group-hover:scale-110 group-hover:rotate-1 transition-all">
                    <Building2 className="w-8 h-8 stroke-[2.2]" />
                  </div>
                  <span className="luxury-pill-tag text-xs font-mono font-black uppercase tracking-wider px-3.5 py-1 rounded-[8px]">
                    2-YEAR & 10-YEAR GOLDEN VISA
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-950 group-hover:text-[#8A6412] transition-colors mb-3 tracking-tight">
                  Property Investor Visa (AED 750k+ / AED 2M+)
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-6">
                  Complete evaluation of completed or off-plan properties. Includes DLD Title Deed verification, mortgage equity acceptance, and family file sponsorship.
                </p>

                {/* Deliverable Perk Chips */}
                <div className="w-full luxury-perks-inset p-4 sm:p-5 rounded-[14px] space-y-2.5 mb-8">
                  {[
                    "Direct Dubai Land Department (DLD) Taskeen filing",
                    "Mortgaged property equity & multiple title deed pooling",
                    "Includes full sponsorship for spouse, children & domestic staff"
                  ].map((perk, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-slate-800 font-semibold">
                      <div className="w-4 h-4 rounded-full bg-[#EFC45C]/25 border border-[#EFC45C]/60 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-[#8A6412]" />
                      </div>
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onOpenCalculator('property');
                }}
                className="w-full btn-gold shimmer-sweep text-[#0B0A08] font-black py-4 px-6 rounded-[12px] shadow-[0_4px_16px_rgba(239,196,92,0.35)] text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>Calculate Property Visa Cost →</span>
              </motion.button>
            </motion.div>

            {/* Card 2: DLD Trustee & Legal Support */}
            <motion.div
              whileHover={{ scale: 1.015, y: -5 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="p-8 sm:p-9 rounded-[22px] bg-gradient-to-b from-[#FFFFFF] via-[#FDFBF7] to-[#F6F0E2] border border-[#E2D5BA] hover:border-[#EFC45C] shadow-[0_12px_36px_rgba(50,35,10,0.06),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-[0_24px_55px_rgba(239,196,92,0.28)] backdrop-blur-2xl flex flex-col justify-between transition-all duration-300 group relative overflow-hidden text-left card-shine"
            >
              {/* Ambient Radial Glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#EFC45C]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#EFC45C]/20 transition-colors" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-[16px] luxury-icon-emblem flex items-center justify-center group-hover:scale-110 group-hover:rotate-1 transition-all">
                    <Scale className="w-8 h-8 stroke-[2.2]" />
                  </div>
                  <span className="luxury-pill-tag text-xs font-mono font-black uppercase tracking-wider px-3.5 py-1 rounded-[8px]">
                    OFFICIAL NOTARY & TRUSTEE
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-950 group-hover:text-[#8A6412] transition-colors mb-3 tracking-tight">
                  DLD Trustee, Valuation & Electronic POA
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-6">
                  Official property revaluation certificates, title deed ownership name changes, remote electronic Power of Attorney (POA), and trustee transfers.
                </p>

                {/* Deliverable Perk Chips */}
                <div className="w-full luxury-perks-inset p-4 sm:p-5 rounded-[14px] space-y-2.5 mb-8">
                  {[
                    "Official DLD property revaluation certificates issued",
                    "Notary Public electronic Power of Attorney drafting & stamping",
                    "Mortgage release representation and title deed trustee transfers"
                  ].map((perk, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-slate-800 font-semibold">
                      <div className="w-4 h-4 rounded-full bg-[#EFC45C]/25 border border-[#EFC45C]/60 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-[#8A6412]" />
                      </div>
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  window.open('https://wa.me/971586600396?text=Hello%2C%20I%20would%20like%20to%20request%20DLD%20Trustee%20or%20Property%20Revaluation%20services.', '_blank');
                }}
                className="w-full bg-[#0B0A08] hover:bg-[#1A160F] text-[#EFC45C] border border-[#EFC45C]/40 font-black py-4 px-6 rounded-[12px] shadow-md text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Request Trustee Service →</span>
              </motion.button>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 8. HOW IT WORKS — CONNECTED 4-STAGE GOVERNMENT WORKFLOW (Warm Camel Sand from goldenvisadubai.ai) */}
      <section id="process" className="w-full bg-[#FAF8F5] dark:bg-[#120E09] border-b border-[#E8DFC8] dark:border-[#EFC45C]/20 py-24 px-4 md:px-8 relative z-10 transition-colors duration-300">
        <div className="max-w-[1340px] mx-auto">

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[8px] bg-[#F6EED9] border border-[#EFC45C]/40 text-[#8A6412] dark:bg-[#1E1A12] dark:text-[#EFC45C] text-xs font-black uppercase tracking-[0.2em] mb-4 shadow-sm font-mono">
              <Clock className="w-3.5 h-3.5 text-[#8A6412] dark:text-[#EFC45C]" />
              <span>OFFICIAL IMMIGRATION PIPELINE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight mb-4 font-sans">
              Connected End-to-End <span className="hybrid-gold-text">Residency Process</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 font-semibold text-sm sm:text-base leading-relaxed">
              A seamless, chronological government roadmap connecting every stage from initial legal audit to final Emirates ID delivery.
            </p>
          </div>

          {/* Connected Process Flow Container */}
          <div className="space-y-8">

            {/* Top Interactive Progress Beam */}
            <div className="p-4 sm:p-5 rounded-[16px] bg-[#FAF9F6] dark:bg-[#1A160F] border border-[#DECFA8] dark:border-[#2A241A] shadow-sm">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {[
                  { step: '01', label: 'Pre-Audit & Verification', time: 'Day 1' },
                  { step: '02', label: 'GDRFA / ICP Filing', time: 'Day 2–3' },
                  { step: '03', label: 'VIP Medical & Biometrics', time: 'Day 4–5' },
                  { step: '04', label: 'Visa Stamped & Handover', time: 'Day 5–7' }
                ].map((item, idx, arr) => (
                  <React.Fragment key={item.step}>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                      <div className="w-8 h-8 rounded-[8px] bg-[#0B0A08] border border-[#EFC45C] text-[#EFC45C] font-mono text-xs font-black flex items-center justify-center shrink-0 shadow-sm">
                        {item.step}
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-extrabold text-slate-950 dark:text-white leading-tight">
                          {item.label}
                        </div>
                        <div className="text-xs font-mono font-bold text-[#8A6412] dark:text-[#EFC45C]">
                          SLA: {item.time}
                        </div>
                      </div>
                    </div>
                    {idx < arr.length - 1 && (
                      <div className="hidden md:flex items-center text-[#EFC45C]/60 px-2">
                        <div className="w-8 sm:w-12 h-[2px] bg-gradient-to-r from-[#EFC45C] to-[#EFC45C]/30" />
                        <ChevronRight className="w-4 h-4 text-[#8A6412] dark:text-[#EFC45C] -ml-1" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* 4 Connected Chronological Stage Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {[
                {
                  phase: "STAGE 01",
                  title: "Document Pre-Flight Audit",
                  authority: "DET & GDRFA PRE-CHECK",
                  sla: "24-HOUR SLA",
                  icon: FileCheck,
                  desc: "Comprehensive pre-submission audit of salary slips, Ejari, marriage & birth certificates, and MOFA attestations to guarantee zero rejections.",
                  deliverables: [
                    "MOFA legalization verification",
                    "Ejari tenancy contract validation",
                    "Salary certificate compliance check"
                  ],
                  nextStep: "Proceeds to Portal Filing →"
                },
                {
                  phase: "STAGE 02",
                  title: "ICP & GDRFA Digital Filing",
                  authority: "FEDERAL IMMIGRATION PORTAL",
                  sla: "48-HOUR APPROVAL",
                  icon: FileText,
                  desc: "Immediate submission through our accredited government PRO portal. Entry permits issued and in-country visa status changed seamlessly.",
                  deliverables: [
                    "Official electronic Entry Permit",
                    "In-country visa status change",
                    "Overstay fine waiver protection"
                  ],
                  nextStep: "Proceeds to Medical Screening →"
                },
                {
                  phase: "STAGE 03",
                  title: "VIP Medical & Biometrics",
                  authority: "SMART SALEM AI & DHA",
                  sla: "SAME-DAY RESULTS",
                  icon: ShieldCheck,
                  desc: "Dedicated VIP chauffeur and priority access to Smart Salem AI medical lounges with 30-minute blood and X-ray test results.",
                  deliverables: [
                    "30-min VIP medical fitness certificate",
                    "Priority ICP fingerprint appointment",
                    "Private case officer escort"
                  ],
                  nextStep: "Proceeds to Final Stamping →"
                },
                {
                  phase: "STAGE 04",
                  title: "Residency Stamped & Handover",
                  authority: "EMIRATES POST & GDRFA",
                  sla: "DOORSTEP HANDOVER",
                  icon: Crown,
                  desc: "Final residence approval by Dubai immigration. Electronic residency sticker generated and physical Emirates ID delivered via secure courier.",
                  deliverables: [
                    "Official UAE electronic residence visa",
                    "3-Year or 10-Year Emirates ID card",
                    "Door-to-door insured VIP courier delivery"
                  ],
                  nextStep: "Complete Lifecycle Handover ✓"
                }
              ].map((stage, idx) => {
                const StageIcon = stage.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -6 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="p-6 sm:p-7 rounded-[20px] bg-gradient-to-b from-[#FFFFFF] via-[#FDFBF7] to-[#F7F2E6] border border-[#E3D7BD] hover:border-[#EFC45C] shadow-[0_10px_28px_rgba(50,35,10,0.05),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-[0_20px_45px_rgba(239,196,92,0.25)] flex flex-col justify-between transition-all duration-300 relative group overflow-hidden text-left card-shine"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="luxury-pill-tag text-xs font-mono font-black uppercase tracking-wider px-3 py-1 rounded-[8px]">
                          {stage.phase}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-800 bg-white/95 border border-[#DFD3BB] px-2.5 py-0.5 rounded-[8px] shadow-xs">
                          {stage.sla}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-13 h-13 rounded-[14px] luxury-icon-emblem flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-1 transition-all">
                          <StageIcon className="w-6 h-6 stroke-[2.2]" />
                        </div>
                        <div>
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                            {stage.authority}
                          </span>
                          <h3 className="text-base font-black text-slate-950 group-hover:text-[#8A6412] transition-colors leading-tight">
                            {stage.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4">
                        {stage.desc}
                      </p>

                      <div className="space-y-2 p-3.5 rounded-[12px] luxury-perks-inset mb-4">
                        {stage.deliverables.map((item, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-800 font-medium">
                            <div className="w-3.5 h-3.5 rounded-full bg-[#EFC45C]/25 border border-[#EFC45C]/60 flex items-center justify-center shrink-0">
                              <CheckCircle2 className="w-2.5 h-2.5 text-[#8A6412]" />
                            </div>
                            <span className="line-clamp-1">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3.5 border-t border-[#E5DAC0] flex items-center justify-between text-xs font-mono font-bold text-[#8A6412]">
                      <span>{stage.nextStep}</span>
                      {idx < 3 && <ChevronRight className="w-3.5 h-3.5 text-[#8A6412]" />}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Support Callout */}
            <div className="p-4 px-6 rounded-[10px] bg-[#FAF9F6] dark:bg-[#181510] border border-[#DECFA8] dark:border-[#2A241A] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium text-center sm:text-left">
                <ShieldCheck className="w-4 h-4 text-[#8A6412] dark:text-[#EFC45C] shrink-0" />
                <span>Every file is assigned an individual licensed Senior PRO Case Officer with direct WhatsApp filing updates.</span>
              </div>
              <button
                onClick={() => window.open('https://wa.me/971586600396?text=Hello%2C%20I%20would%20like%20to%20track%20my%20UAE%20residency%20process.', '_blank')}
                className="px-4 py-2 rounded-[8px] bg-[#EFC45C] hover:bg-[#DBB24B] text-[#0B0A08] font-bold text-xs uppercase tracking-wider transition-all shadow-sm shrink-0 cursor-pointer"
              >
                Track File On WhatsApp →
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS — INTERACTIVE LIVE VIEWER (Warm Linen Paper from goldenvisadubai.ai) */}
      <section id="faq" className="w-full bg-[#F5EFE0] dark:bg-[#18130D] border-b border-[#E0D3B8] dark:border-[#EFC45C]/20 py-24 px-4 md:px-8 relative z-10 transition-colors duration-300">
        <div className="max-w-[1340px] mx-auto">

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[8px] bg-[#F6EED9] border border-[#EFC45C]/40 text-[#8A6412] dark:bg-[#1E1A12] dark:text-[#EFC45C] text-xs font-black uppercase tracking-[0.2em] mb-4 shadow-sm font-mono">
              <HelpCircle className="w-3.5 h-3.5 text-[#8A6412] dark:text-[#EFC45C]" />
              <span>GOVERNMENT KNOWLEDGE BASE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight mb-4 font-sans">
              Frequently Answered <span className="hybrid-gold-text">Residency Queries</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 font-semibold text-sm sm:text-base leading-relaxed">
              Direct regulatory guidance on GDRFA salary requirements, in-country status adjustments, and unbundled government fees.
            </p>
          </div>

          {/* Interactive Dual-Panel Live Viewer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* LEFT PANEL: QUESTIONS STREAM (5 Cols) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-black uppercase tracking-[0.16em] text-slate-600 dark:text-slate-400 font-mono px-1 mb-2 flex items-center justify-between">
                <span>Select Inquiry Topic</span>
                <span className="text-[#8A6412] dark:text-[#EFC45C] font-bold">{faqs.length} Key Directives</span>
              </div>

              {faqs.map((faq, idx) => {
                const isSelected = selectedFaqIndex === idx;
                return (
                  <motion.button
                    key={faq.id}
                    whileHover={{ scale: 1.015, x: 2 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => {
                      setSelectedFaqIndex(idx);
                      }}
                    className={`w-full p-4 sm:p-5 rounded-[16px] border text-left transition-all duration-300 flex items-start gap-4 cursor-pointer relative overflow-hidden card-shine ${isSelected
                        ? 'bg-gradient-to-b from-[#18140E] via-[#0E0C09] to-[#070604] text-white border-[#EFC45C] shadow-[0_14px_35px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(239,196,92,0.4)] ring-1 ring-[#EFC45C]/60'
                        : 'bg-gradient-to-b from-[#FFFFFF] via-[#FAF8F3] to-[#F2ECE0] border-[#DDD2BD] text-[#1F190C] hover:border-[#EFC45C] hover:bg-white shadow-[0_4px_14px_rgba(40,30,10,0.04),inset_0_1px_0_rgba(255,255,255,0.9)] hover:shadow-[0_8px_24px_rgba(239,196,92,0.18)] hover:-translate-y-0.5'
                      }`}
                  >
                    {/* Left Indicator Numerals */}
                    <div className={`w-9 h-9 rounded-[10px] font-mono text-xs font-black flex items-center justify-center shrink-0 transition-all ${isSelected
                        ? 'bg-gradient-to-br from-[#F7DE9C] to-[#C99824] text-[#0B0A08] shadow-[0_4px_12px_rgba(239,196,92,0.4)]'
                        : 'bg-gradient-to-br from-[#FAF3DF] via-[#F5E8C3] to-[#E5CCA0] border border-[#EFC45C]/60 text-[#7A5608] shadow-xs'
                      }`}>
                      0{idx + 1}
                    </div>

                    {/* Question & Category */}
                    <div className="flex-1 space-y-1">
                      <span className={`text-xs font-black uppercase tracking-wider font-mono block ${isSelected ? 'text-[#EFC45C]' : 'text-[#8A6412]'
                        }`}>
                        {faq.category}
                      </span>
                      <h3 className="text-xs sm:text-sm font-black leading-snug tracking-tight">
                        {faq.q}
                      </h3>
                    </div>

                    {/* Right Active Chevron */}
                    <div className="shrink-0 self-center">
                      <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isSelected ? 'text-[#EFC45C] translate-x-1' : 'text-slate-400'
                        }`} />
                    </div>

                    {/* Active Golden Glow Accent on Edge */}
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#EFC45C]" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* RIGHT PANEL: LIVE ANSWER VIEWER CONSOLE (7 Cols) */}
            <div className="lg:col-span-7 lg:sticky lg:top-28">
              <AnimatePresence mode="wait">
                {(() => {
                  const activeItem = faqs[selectedFaqIndex] || faqs[0];
                  return (
                    <motion.div
                      key={activeItem.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                      className="p-7 sm:p-9 rounded-[20px] bg-gradient-to-b from-[#FFFFFF] via-[#FAF8F3] to-[#F4EEE0] border border-[#DDD3BD] shadow-[0_20px_50px_rgba(40,30,10,0.07),inset_0_1px_1px_rgba(255,255,255,1)] backdrop-blur-3xl relative overflow-hidden text-left card-shine"
                    >
                      {/* Ambient Radial Luminescence */}
                      <div className="absolute top-0 right-0 w-64 h-64 bg-[#EFC45C]/10 rounded-full blur-3xl pointer-events-none" />

                      {/* Console Header Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#DFD8C5]/70 mb-6">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#EFC45C] animate-pulse" />
                          <span className="text-xs font-black uppercase tracking-[0.16em] text-[#8A6412] font-mono px-3 py-1 rounded-[8px] bg-gradient-to-r from-[#F8EED6] to-[#EEDDB2] border border-[#EFC45C]/60 shadow-xs">
                            {activeItem.tag}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-700 bg-[#F1EEE7] border border-[#DFD8C5] px-3 py-1 rounded-[8px] font-bold">
                          <Clock className="w-3.5 h-3.5 text-[#8A6412]" />
                          <span>SLA: {activeItem.sla}</span>
                        </div>
                      </div>

                      {/* Question Title */}
                      <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight mb-4 leading-snug">
                        {activeItem.q}
                      </h3>

                      {/* Legal Breakdown Answer */}
                      <p className="text-slate-600 font-medium text-xs sm:text-sm leading-relaxed mb-6">
                        {activeItem.a}
                      </p>

                      {/* Highlighted Stat Banner */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                        <div className="p-4 rounded-[12px] bg-gradient-to-b from-[#F8F4EA] to-[#EFE7D5] border border-[#E1D4B8] shadow-xs">
                          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                            {activeItem.statHighlight.label}
                          </div>
                          <div className="text-xl sm:text-2xl font-black font-mono text-[#8A6412] tracking-tight">
                            {activeItem.statHighlight.val}
                          </div>
                        </div>

                        <div className="p-4 rounded-[12px] bg-gradient-to-b from-[#F8F4EA] to-[#EFE7D5] border border-[#E1D4B8] flex items-center gap-3 shadow-xs">
                          <div className="w-10 h-10 rounded-[10px] luxury-icon-emblem flex items-center justify-center shrink-0">
                            <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                              Legal Jurisdiction
                            </div>
                            <div className="text-xs font-black text-slate-950 tracking-tight">
                              GDRFA & ICP Authorized
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Key Regulatory Takeaways */}
                      <div className="space-y-2 mb-8">
                        <div className="text-xs font-black uppercase tracking-[0.14em] text-slate-500 font-mono mb-2">
                          Official Directives & Compliance Checklist
                        </div>
                        {activeItem.perks.map((perk, i) => (
                          <div key={i} className="flex items-center gap-2.5 text-xs text-slate-800 font-medium">
                            <div className="w-4 h-4 rounded-full bg-[#EFC45C]/25 border border-[#EFC45C]/60 flex items-center justify-center shrink-0">
                              <CheckCircle2 className="w-3 h-3 text-[#8A6412]" />
                            </div>
                            <span>{perk}</span>
                          </div>
                        ))}
                      </div>

                      {/* Interactive Direct WhatsApp Action Footer */}
                      <div className="pt-6 border-t border-[#DFD8C5]/70 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                        <div>
                          <div className="text-xs font-extrabold text-slate-950">Need Customized Advice?</div>
                          <div className="text-xs text-slate-500 font-medium">
                            Consult directly with a Senior PRO Case Officer
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            const msg = encodeURIComponent(`Hello, I have a specific question regarding: ${activeItem.q}`);
                            window.open(`https://wa.me/971586600396?text=${msg}`, '_blank');
                          }}
                          className="btn-gold shimmer-sweep text-[#0B0A08] font-black py-3 px-5 rounded-[10px] shadow-[0_4px_16px_rgba(239,196,92,0.3)] text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shrink-0 transition-all"
                        >
                          <MessageSquare className="w-4 h-4 text-[#0B0A08] stroke-[2.5]" />
                          <span>Ask Case Officer on WhatsApp →</span>
                        </motion.button>
                      </div>

                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* 10. CLIENT REVIEWS & VERIFIED TESTIMONIALS — CONTINUOUS INFINITE TICKER (BLACK SMOKE MASKED) */}
      <section 
        id="reviews" 
        className="w-full bg-[#0B0A08] text-white border-y border-[#EFC45C]/30 py-24 px-4 md:px-8 relative z-10 transition-colors duration-300 overflow-hidden"
      >
        {/* Top & Bottom 24K Gold Metallic Accent Borders */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#EFC45C]/60 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#EFC45C]/40 to-transparent pointer-events-none" />

        {/* Ambient Center Golden Nebula Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[340px] bg-[#EFC45C]/12 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-[1340px] mx-auto mb-14 text-center relative z-10">

          {/* Section Header */}
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[8px] bg-[#1E1A12] border border-[#EFC45C]/40 text-[#EFC45C] text-xs font-black uppercase tracking-[0.2em] mb-4 shadow-sm font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-[#EFC45C]" />
              <span>VERIFIED INVESTOR EXPERIENCES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 font-sans">
              Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7DE9C] via-[#EFC45C] to-[#C99824]">Global Investors</span> & Families
            </h2>
            <p className="text-slate-300 font-semibold text-sm sm:text-base leading-relaxed">
              Real reviews from real expats, property owners, and corporate leaders who obtained their UAE residency through 800 DOCS.
            </p>

            {/* Luminous Rating Pill in Dark Accent */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 mt-6 rounded-[10px] bg-[#14120E] border border-[#EFC45C]/40 shadow-lg text-white">
              <span className="text-sm font-black font-mono text-[#EFC45C]">4.9</span>
              <div className="flex gap-1 text-[#EFC45C]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#EFC45C] text-[#EFC45C]" />
                ))}
              </div>
              <span className="text-xs text-slate-300 font-medium pl-1 border-l border-white/20">
                1,200+ Verified Client Approvals
              </span>
            </div>
          </div>
        </div>

        {/* Continuous Marquee Ticker Track with Deep Black Smoke Masks */}
        <div className="w-full relative overflow-hidden py-4">
          {/* Left Deep Black Smoke Edge Gradient */}
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-56 bg-gradient-to-r from-[#0B0A08] via-[#0B0A08]/95 to-transparent pointer-events-none z-20" />

          {/* Right Deep Black Smoke Edge Gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-56 bg-gradient-to-l from-[#0B0A08] via-[#0B0A08]/95 to-transparent pointer-events-none z-20" />

          <div className="animate-scroll-left-stream flex gap-6 hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
            {[...reviewsList, ...reviewsList].map((rev, idx) => (
              <div
                key={idx}
                className="w-[370px] sm:w-[430px] shrink-0 p-7 sm:p-8 rounded-[20px] bg-gradient-to-b from-[#181510] via-[#110F0B] to-[#0A0907] border border-[#EFC45C]/35 hover:border-[#EFC45C] shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.07)] hover:shadow-[0_26px_60px_rgba(239,196,92,0.3)] hover:-translate-y-2 flex flex-col justify-between transition-all duration-300 relative text-left group overflow-hidden card-shine"
              >
                {/* Top Subtle Gold Illumination on Hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#EFC45C]/0 to-transparent group-hover:via-[#EFC45C] transition-all duration-500 pointer-events-none" />

                <div>
                  {/* Stars + Verified Badge Row */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex gap-1 text-[#EFC45C] drop-shadow-[0_2px_8px_rgba(239,196,92,0.5)]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#EFC45C] text-[#EFC45C]" />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono font-bold text-[#F5CF6B] bg-gradient-to-r from-[#241E14] to-[#1A150D] border border-[#EFC45C]/50 px-3 py-1 rounded-[8px] uppercase tracking-wider shadow-xs">
                      {rev.badge}
                    </span>
                  </div>

                  {/* Review Quote */}
                  <p className="text-xs sm:text-[13px] text-slate-200 font-medium leading-relaxed mb-6 italic">
                    "{rev.quote}"
                  </p>
                </div>

                {/* Client Profile Row */}
                <div className="pt-4 border-t border-slate-800/90 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-[12px] bg-gradient-to-br from-[#2D2415] via-[#1F190E] to-[#120F08] border border-[#EFC45C]/60 text-[#F5CF6B] font-mono font-black text-xs flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(239,196,92,0.3)] shrink-0">
                      {rev.initials}
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-white leading-tight">
                        {rev.name}
                      </div>
                      <div className="text-xs text-slate-400 font-medium">
                        {rev.role} · <span className="text-slate-400">{rev.origin}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {rev.date || 'Verified'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee Hint */}
        <div className="mt-8 text-center text-xs font-mono text-slate-400 flex items-center justify-center gap-2 relative z-10">
          <span className="w-2 h-2 rounded-[2px] bg-[#EFC45C] animate-pulse" />
          <span>Hover over any review card to pause animation</span>
        </div>
      </section>

      {/* 11. ARTICLES & IMMIGRATION GUIDES — WARM CAMEL SAND EDITORIAL CANVAS */}
      <section id="articles" className="w-full bg-[#F5EFE0] dark:bg-[#18130D] border-b border-[#E0D3B8] dark:border-[#EFC45C]/20 py-24 px-4 md:px-8 relative z-10 transition-colors duration-300">
        <div className="max-w-[1340px] mx-auto">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[8px] bg-[#F6EED9] dark:bg-[#262116] border border-[#EFC45C]/40 text-[#8A6412] dark:text-[#EFC45C] text-xs font-black uppercase tracking-[0.2em] mb-4 shadow-sm">
                <BookOpen className="w-3.5 h-3.5 text-[#8A6412] dark:text-[#EFC45C]" />
                <span>OFFICIAL IMMIGRATION GUIDES & ARTICLES</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight font-sans">
                Latest UAE Residency, Tax & Legal <span className="text-[#EFC45C]">Articles</span>
              </h2>
              <p className="text-slate-700 dark:text-slate-300 font-semibold text-sm mt-3 max-w-2xl leading-relaxed">
                Stay informed with verified legal guides, GDRFA rule updates, and scam protection alerts written by licensed senior UAE immigration advisors.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate('blog-index')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-[10px] bg-[#FAF9F6] dark:bg-[#181510] text-slate-900 dark:text-white hover:border-[#EFC45C] border border-[#DECFA8] dark:border-[#2A241A] hover:text-[#8A6412] dark:hover:text-[#EFC45C] text-xs font-black uppercase tracking-wider transition-all shadow-sm shrink-0 cursor-pointer"
            >
              <span>View All Articles ({fullArticlesList.length})</span>
              <ArrowRight className="w-4 h-4 text-[#8A6412] dark:text-[#EFC45C]" />
            </motion.button>
          </div>

          {/* Articles Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2.5 mb-12">
            {[
              { id: 'all', label: "All Guides" },
              { id: 'warning', label: "Scam Warnings & Alerts" },
              { id: 'housing', label: "Housing & EJARI" },
              { id: 'residency', label: "Residency Rules" },
              { id: 'family', label: "Family Care" }
            ].map((aTab) => {
              const isActive = activeArticleTab === aTab.id;
              return (
                <motion.button
                  key={aTab.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setActiveArticleTab(aTab.id);
                  }}
                  className={`px-4 py-2 rounded-[10px] text-xs font-black transition-all tracking-wider uppercase cursor-pointer ${isActive
                      ? 'bg-[#EFC45C] text-[#0B0A08] shadow-sm'
                      : 'bg-[#FAF9F6] dark:bg-[#181510] border border-[#DECFA8] dark:border-[#2A241A] text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:border-[#EFC45C]/60 hover:bg-white dark:hover:bg-slate-900 shadow-sm'
                    }`}
                >
                  {aTab.label}
                </motion.button>
              );
            })}
          </div>

          {/* Editorial Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, idx) => {
              const isFeatured = idx === 0 && activeArticleTab === 'all';
              return (
                <motion.div
                  key={article.id}
                  whileHover={{ scale: 1.015, y: -5 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  onClick={() => onNavigate('blog-post', article.id)}
                  className={`rounded-[22px] bg-gradient-to-b from-[#FFFFFF] via-[#FDFBF7] to-[#F6F0E3] border border-[#E2D5BA] hover:border-[#EFC45C] shadow-[0_12px_36px_rgba(50,35,10,0.06),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-[0_24px_55px_rgba(239,196,92,0.26)] overflow-hidden group transition-all duration-300 cursor-pointer flex flex-col justify-between relative text-left card-shine ${isFeatured ? 'md:col-span-2 lg:col-span-2' : ''
                    }`}
                >
                  <div>
                    {/* Article Thumbnail with Gradient Vignette */}
                    <div className={`relative w-full overflow-hidden bg-slate-100 ${isFeatured ? 'h-64 sm:h-72' : 'h-52'}`}>
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                      {/* Category Rosette Tag */}
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-[8px] bg-[#0B0A08]/90 backdrop-blur-md text-[#F7DE9C] text-xs font-black uppercase tracking-wider border border-[#EFC45C]/40 shadow-md">
                        {article.category}
                      </div>

                      {/* Read Time & Date Floating Badge */}
                      <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs font-mono text-slate-300 bg-[#0B0A08]/85 backdrop-blur-md px-3 py-1 rounded-[8px] border border-[#EFC45C]/25">
                        <Clock className="w-3.5 h-3.5 text-[#EFC45C]" />
                        <span>{article.readTime}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                      </div>
                    </div>

                    {/* Article Content */}
                    <div className="p-6 sm:p-7 space-y-3">
                      <h3 className={`font-black text-slate-950 group-hover:text-[#8A6412] transition-colors leading-snug tracking-tight ${isFeatured ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'
                        }`}>
                        {article.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Article Footer with Author & Direct Arrow */}
                  <div className="px-6 sm:px-7 pb-6 pt-4 border-t border-[#E5DAC0] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-[10px] luxury-icon-emblem text-[#7A5608] font-black text-xs flex items-center justify-center shadow-xs">
                        {article.author.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs font-black text-slate-950 group-hover:text-[#8A6412] transition-colors">
                          {article.author}
                        </div>
                        <div className="text-xs font-medium text-slate-500">
                          {article.authorRole}
                        </div>
                      </div>
                    </div>

                    <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-[#0B0A08] to-[#1E190E] border border-[#EFC45C]/50 text-[#EFC45C] group-hover:scale-110 group-hover:bg-[#EFC45C] group-hover:text-[#0B0A08] transition-all flex items-center justify-center shadow-sm">
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 12. STREAMLINED EXECUTIVE BANNER */}
      <section id="cta" className="w-full bg-[#FAF8F5] dark:bg-[#0D0B08] border-t border-[#E0D3B8] dark:border-[#EFC45C]/30 py-20 px-4 md:px-8 relative z-10 transition-colors duration-300">
        <div className="max-w-[1100px] mx-auto">
          <div className="p-8 sm:p-14 rounded-[16px] bg-[#0B0A08] border border-[#EFC45C]/35 shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-3xl relative overflow-hidden text-center">

            {/* Ambient Radial Golden Luminescence */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-64 bg-[#EFC45C]/15 rounded-[12px] blur-3xl pointer-events-none" />

            <div className="max-w-2xl mx-auto relative z-10 space-y-6">

              {/* Crown Seal Emblem */}
              <div className="w-14 h-14 rounded-[10px] bg-[#EFC45C] text-[#0B0A08] flex items-center justify-center mx-auto shadow-[0_8px_30px_rgba(239,196,92,0.4)] animate-float-slow">
                <Crown className="w-7 h-7 stroke-[2.2]" />
              </div>

              {/* Heading */}
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-snug font-sans">
                Accelerate Your 10-Year <span className="text-[#EFC45C]">UAE Residency</span> Today
              </h2>

              {/* Short Line */}
              <p className="text-slate-300 font-medium text-xs sm:text-base max-w-xl mx-auto leading-relaxed">
                Direct government channel filing with zero hidden markups and guaranteed 24–48h SLA turnaround.
              </p>

              {/* Action Buttons: WhatsApp & Calculator */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://wa.me/971586600396?text=Hello%20800%20DOCS%2C%20I%20would%20like%20to%20request%20an%20official%20visa%20eligibility%20audit."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20BD5A] text-white px-8 py-3.5 rounded-[10px] text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-102 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-white fill-current" />
                  <span>Chat on WhatsApp</span>
                </a>

                <button
                  onClick={() => onOpenCalculator && onOpenCalculator('golden')}
                  className="w-full sm:w-auto btn-gold shimmer-sweep px-8 py-3.5 rounded-[10px] text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-[0_4px_20px_rgba(239,196,92,0.4)] text-[#0B0A08] hover:scale-102 transition-all cursor-pointer"
                >
                  <Calculator className="w-4 h-4 text-[#0B0A08] stroke-[2.5]" />
                  <span>Calculate Visa Fees</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
