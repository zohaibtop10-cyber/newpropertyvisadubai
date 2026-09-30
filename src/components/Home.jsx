import React, { useState, useEffect, useRef } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Heart,
  Baby,
  Users,
  Crown,
  Shield,
  ShieldCheck,
  ArrowRight,
  Calculator,
  Star,
  ChevronRight,
  ChevronDown,
  Building2,
  ThumbsUp,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  FileCheck,
  Stethoscope,
  IdCard,
  Languages,
  Scale,
  Award,
  Trophy,
  Zap,
  Check,
  AlertTriangle,
  BookOpen,
  Calendar,
  User,
  ArrowUpRight,
  MapPin,
  Briefcase,
  Building,
  BadgeCheck,
  Quote
} from 'lucide-react';

// Icon map: resolve lucide icon by string name (used when CMS config stores icon as a string)
const ICON_MAP = {
  Heart, Baby, Users, Crown, Shield, ShieldCheck, ArrowRight, Calculator,
  Star, ChevronRight, Building2, CheckCircle2, XCircle,
  Clock, Sparkles, FileCheck, Stethoscope, IdCard, Languages, Scale,
  Award, Trophy, Zap, Check, AlertTriangle, BookOpen, Calendar, User,
  MapPin, Briefcase, Building, BadgeCheck, Quote
};

// Resolve icon: accepts a React component OR a string name
function resolveIcon(icon) {
  if (!icon) return Trophy;
  if (typeof icon === 'string') return ICON_MAP[icon] || Trophy;
  return icon;
}
import {
  diyProcessGuides,
  reviewsData,
  blogPostsData,
  siteConfig
} from '../data/cmsData';

// Animated counter hook
function useCounter(end, duration = 2000, startOnView = false, isInView = true) {
  const [count, setCount] = useState(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!isInView || hasStarted.current) return;
    hasStarted.current = true;

    const num = parseFloat(String(end).replace(/[^0-9.]/g, ''));
    if (isNaN(num)) return;

    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(num * eased));
      if (progress >= 1) clearInterval(timer);
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration, isInView]);

  return count;
}

// Section wrapper with scroll-reveal
function RevealSection({ children, className = '', delay = 0, id }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export default function Home({ onNavigate, onOpenCalculator, cmsConfig, homePageData }) {
  // Process Guide Tab State ('newVisa' | 'renewal')
  const [guideTab, setGuideTab] = useState('newVisa');

  // Active FAQ Accordion State (open question index)
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Category Filter for "Everything We Handle" ('all' | 'visas' | 'emiratesId' | 'legal')
  const [serviceCategory, setServiceCategory] = useState('all');

  const defaultActiveGuide = diyProcessGuides[guideTab];
  const activeGuide = {
    ...defaultActiveGuide,
    title: cmsConfig?.process?.title || defaultActiveGuide.title,
    subtitle: cmsConfig?.process?.subtext || defaultActiveGuide.subtitle,
    steps: cmsConfig?.process?.steps || defaultActiveGuide.steps
  };

  // Dynamic Section Order & Visibility from cmsConfig
  const defaultSectionOrder = [
    'hero',
    'stats',
    'achievements',
    'problems',
    'services',
    'transparency',
    'packages',
    'whyUs',
    'process',
    'faqs',
    'reviews',
    'blog',
    'cta'
  ];

  const sectionOrder = cmsConfig?.homepageSectionOrder || defaultSectionOrder;
  const sectionVisibility = cmsConfig?.sectionVisibility || {};

  // Hero Section Dynamic Text
  const heroMainHeadline = homePageData?.hero?.title || cmsConfig?.hero?.mainHeadline || "Bring your family to the UAE with 100% Guaranteed SLA Approval.";
  const heroSubtext = homePageData?.hero?.subtitle || cmsConfig?.hero?.subtext || "We prepare, submit, and track family residence visas, 10-Year Golden Visas, and Emirates ID applications so you deal with one consultant instead of five counters.";
  const heroStat1 = homePageData?.hero?.badgeText || cmsConfig?.hero?.stat1 || "Free eligibility check before any fee";
  const heroStat2 = cmsConfig?.hero?.stat2 || "Fixed service fee, government at cost";
  const heroStat3 = cmsConfig?.hero?.stat3 || "Most files completed in 5-10 days";
  const primaryBtn = homePageData?.hero?.primaryButtonText || "Start Free Assessment";
  const secondaryBtn = homePageData?.hero?.secondaryButtonText || "Calculate Fees";

  // Homepage FAQs matching familyvisauae.com
  const homepageFaqs = cmsConfig?.faqs?.items || [
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
  ];

  // Categorized Services for "Everything We Handle"
  const categorizedServices = cmsConfig?.services?.items || [
    {
      id: 'property-visa',
      title: 'Real Estate Investor Residency',
      desc: 'Turn your AED 750k or AED 2M+ property equity into a 2-Year or 10-Year residency. We manage DLD approvals and title deed verification.',
      tag: 'Visas',
      icon: Building2,
      linkId: 'property-visa'
    },
    {
      id: 'family-visa',
      title: 'Executive Family Sponsorship',
      desc: 'End-to-end management of family and dependant residency files. We handle GDRFA compliance, entry permits, and Emirates ID issuance seamlessly.',
      tag: 'Visas',
      icon: Users,
      linkId: 'spouse-visa'
    },
    {
      id: 'family-visa-cost',
      title: 'Transparent Cost Structuring',
      desc: 'Unbundled, itemized breakdowns of all statutory government charges and medical fees before you commit. Zero hidden markups.',
      tag: 'Visas',
      icon: Calculator,
      linkId: 'spouse-visa'
    },
    {
      id: 'family-visa-renewal',
      title: 'Residency Renewal & Fine Prevention',
      desc: 'Proactive dependant visa renewals. We secure your family\'s legal status uninterrupted, eliminating the risk of costly ICP overstay penalties.',
      tag: 'Visas',
      icon: Clock,
      linkId: 'spouse-visa'
    },
    {
      id: 'golden-visa',
      title: '10-Year Sovereign Golden Visa',
      desc: 'Elite, long-term residency acquisition for executives, exceptional talents, and high-net-worth individuals, granting unparalleled UAE stability.',
      tag: 'Visas',
      icon: Crown,
      linkId: 'golden-visa'
    },
    {
      id: 'maid-visa',
      title: 'Domestic Staff & Nanny Sponsorship',
      desc: 'Fully compliant MOHRE and Tadbeer visa processing for household staff, nannies, and private chauffeurs with comprehensive legal contracts.',
      tag: 'Visas',
      icon: Shield,
      linkId: 'maid-visa'
    },
    {
      id: 'newborn-visa',
      title: 'Express Newborn Registration',
      desc: 'Urgent 120-day compliance processing for newborns. We secure birth certificates, passport linkages, and Emirates IDs without delays.',
      tag: 'Visas',
      icon: Baby,
      linkId: 'new-born'
    },
    {
      id: 'emirates-id-new',
      title: 'Biometrics & Emirates ID Concierge',
      desc: 'Priority scheduling for ICP biometrics. Skip the standard queues with our fast-tracked typing and application management services.',
      tag: 'Emirates ID & Medical',
      icon: IdCard,
      linkId: 'emirates-id'
    },
    {
      id: 'medical-fitness',
      title: 'VIP 30-Minute Medical Clearance',
      desc: 'Chauffeur-driven, priority medical fitness testing. Receive DHA/MOHAP blood and X-ray results securely within 24 hours.',
      tag: 'Emirates ID & Medical',
      icon: Stethoscope,
      linkId: 'emirates-id'
    },
    {
      id: 'attestation-mofa',
      title: 'Global MOFA Attestation',
      desc: 'Secure, international document legalization. We authenticate marriage and birth certificates through foreign embassies and UAE MOFA.',
      tag: 'Legal & Attestation',
      icon: FileCheck,
      linkId: 'attestation'
    },
    {
      id: 'legal-translation',
      title: 'Ministry-Certified Legal Translation',
      desc: 'Sworn, court-approved Arabic translations for all foreign jurisdictions, fully recognized by the UAE Ministry of Justice and GDRFA.',
      tag: 'Legal & Attestation',
      icon: Languages,
      linkId: 'legal-translation'
    },
    {
      id: 'dld-trustee',
      title: 'Notary & POA Representation',
      desc: 'Dedicated legal structuring for powers of attorney, wills, and Dubai Land Department trustee representation to protect your assets.',
      tag: 'Legal & Attestation',
      icon: Scale,
      linkId: 'property-visa'
    }
  ];

  const filteredServices = serviceCategory === 'all'
    ? categorizedServices
    : categorizedServices.filter(s => {
      if (serviceCategory === 'visas') return s.tag === 'Visas';
      if (serviceCategory === 'emiratesId') return s.tag === 'Emirates ID & Medical';
      if (serviceCategory === 'legal') return s.tag === 'Legal & Attestation';
      return true;
    });

  // Achievements Data
  const achievements = cmsConfig?.achievements?.items || [
    {
      icon: Trophy,
      badge: "RANKED #1 IN DUBAI",
      title: "Top UAE Residency Advisory 2026",
      desc: "Voted #1 for transparent family visa processing and 100% online convenience across Dubai & Abu Dhabi.",
      stat: "4.9 ★ Rating"
    },
    {
      icon: Award,
      badge: "GOVERNMENT LICENSED",
      title: "Official GDRFA & ICP Partner",
      desc: "Licensed under 800 DOCS LLC SOC with direct server access to federal immigration portals.",
      stat: "100% Authorized"
    },
    {
      icon: ShieldCheck,
      badge: "UNBUNDLED BILLING",
      title: "Zero Hidden Markups Guarantee",
      desc: "Saved over AED 4.5 Million in hidden typing fees for client families through itemized government receipts.",
      stat: "AED 4.5M+ Saved"
    },
    {
      icon: Zap,
      badge: "RECORD FAST TRACK",
      title: "24-Hour VIP Approval SLA",
      desc: "Fastest entry permit and status change clearance recorded in Dubai immigration history.",
      stat: "24h VIP Turnaround"
    }
  ];

  // Problems We Solve Data
  const problemsSolved = cmsConfig?.problems?.items?.map(p => ({
    problem: p.problemTitle,
    solution: p.solutionTitle,
    desc: p.desc
  })) || [
      {
        problem: "Standing in 5 different queues at Amer centers, medical clinics, and typing offices.",
        solution: "100% Online WhatsApp Concierge. Send scans from home — we handle all government counters for you."
      },
      {
        problem: "Hidden service center surcharges and mysterious fee markups on government tariffs.",
        solution: "Itemized Unbundled Billing. We pass on exact GDRFA/ICP fees at cost with official receipts."
      },
      {
        problem: "Visa rejections caused by improper MOFA attestation stamps or Ejari errors.",
        solution: "Free Pre-Flight Document Audit. We verify your certificates before you spend a single Dirham."
      },
      {
        problem: "Heavy daily overstay fines while waiting for status change or medical checkups.",
        solution: "Guaranteed Fast-Track SLA. In-country status change cleared in 24-48 hours with zero fine risk."
      }
    ];

  // Packages Data
  const packages = cmsConfig?.packages?.items || [
    {
      name: "Essential Typing",
      tagline: "For DIY applicants who only need official GDRFA/ICP typing & document check.",
      fee: "AED 750",
      type: "Standard Retainer",
      popular: false,
      features: [
        "Official ICP / GDRFA Online Typing",
        "Document & Attestation Audit",
        "Medical & Emirates ID Typing Forms",
        "WhatsApp Application Tracking",
        "Government Receipts Provided"
      ],

      calcTab: "spouse"
    },
    {
      name: "Full Concierge Family",
      tagline: "Complete end-to-end handling — from entry permit to Emirates ID home delivery.",
      fee: "AED 1,450",
      type: "Most Popular Package",
      popular: true,
      features: [
        "Everything in Essential Typing",
        "Complete File Submission & Status Change",
        "VIP Medical Appointment Booking",
        "Dedicated Personal PRO Specialist",
        "Emirates ID Courier Home Delivery",
        "100% Guaranteed Approval SLA"
      ],
      buttonText: "Choose Full Concierge",
      calcTab: "spouse"
    },
    {
      name: "VIP 24h Fast-Track Express",
      tagline: "Urgent VIP processing for executives, Golden Visa holders & urgent residency files.",
      fee: "AED 2,450",
      type: "VIP Express Tier",
      popular: false,
      features: [
        "24 to 48-Hour Approval Guarantee",
        "Private Chauffeur & Escort for Medical",
        "Priority GDRFA / ICP Queue Fast-Tracking",
        "24/7 Direct Line to Senior Partner",
        "Golden Visa & Dependant Fast-Track",
        "Same-Day Physical ID Processing"
      ],
      buttonText: "Choose VIP Express",
      calcTab: "golden"
    }
  ];

  const activeReviews = (cmsConfig?.reviews?.items && cmsConfig.reviews.items.length > 0) ? cmsConfig.reviews.items : reviewsData;
  const infiniteReviews = [...activeReviews, ...activeReviews];

  // Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15
      }
    }
  };

  const cardGridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.15 }
    }
  };

  const cardItemVariants = {
    hidden: { opacity: 0, y: 35, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 18
      }
    }
  };

  // Stats ref for counter animation
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-100px' });

  // Display CMS metric strings directly (they are pre-formatted like "15,000+", "99.8%", "5-10 Days")
  const statsMetrics = [
    { val: cmsConfig?.stats?.metric1Val || '15,000+', label: cmsConfig?.stats?.metric1Label || 'Family Applications' },
    { val: cmsConfig?.stats?.metric2Val || '99.8%', label: cmsConfig?.stats?.metric2Label || 'ICP Approval Rate' },
    { val: cmsConfig?.stats?.metric3Val || '5-10 Days', label: cmsConfig?.stats?.metric3Label || 'Average Turnaround' },
    { val: cmsConfig?.stats?.metric4Val || '15 Mins', label: cmsConfig?.stats?.metric4Label || 'WhatsApp Response' },
  ];

  // Helper render function for each section
  const renderSection = (id) => {
    switch (id) {
      case 'hero':
        return (
          <section key="hero" id="top" className="pt-12 sm:pt-16 lg:pt-20 px-4 sm:px-6 max-w-7xl mx-auto relative z-10 min-h-[85vh] flex flex-col justify-center">
            {/* Animated Background Blobs */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-10 -left-64 w-[500px] h-[500px] bg-brand-primary/20 rounded-full blur-[120px] pointer-events-none -z-10" 
            />
            <motion.div 
              animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute top-40 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none -z-10 hidden lg:block" 
            />
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center"
            >
              {/* Left Column: Text & CTA */}
              <div className="lg:col-span-7 space-y-8 md:space-y-10 relative z-20">
                <div className="space-y-4">
                  <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest">
                    <Star className="w-3.5 h-3.5 fill-brand-primary" />
                    Premium Visa Consultancy
                  </motion.div>
                  <motion.h1 variants={itemVariants} className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-black tracking-tight leading-[1.05] drop-shadow-sm">
                    <span className="text-content-primary dark:text-white drop-shadow-sm">
                      {heroMainHeadline.split(' ').slice(0, 3).join(' ')}
                    </span>
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D4AF37] via-[#F0D782] to-[#B8860B]">
                      {heroMainHeadline.split(' ').slice(3).join(' ')}
                    </span>
                  </motion.h1>

                  <motion.p variants={itemVariants} className="text-content-muted dark:text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl font-medium">
                    {heroSubtext}
                  </motion.p>
                </div>

                <motion.ul variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[heroStat1, heroStat2, heroStat3].map((stat, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.15, duration: 0.5 }}
                      className="flex items-center gap-3 text-sm font-bold text-content-secondary dark:text-slate-200"
                    >
                      <div className="p-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                      </div>
                      <span>{stat}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onOpenCalculator('property')}
                    className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#D4AF37] to-[#996515] hover:from-[#E5C158] hover:to-[#A67822] text-white px-8 py-4.5 rounded-xl font-extrabold text-base transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.5)] cursor-pointer group relative overflow-hidden border border-[#F0D782]/30 btn-shine-effect"
                  >
                    <Calculator className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Calculate Property Visa</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                  </motion.button>

                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    href={`https://wa.me/${cmsConfig?.global?.whatsappRaw || siteConfig.whatsappRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-surface dark:bg-white/5 hover:bg-canvas dark:hover:bg-surface/10 text-content-primary dark:text-white px-8 py-4.5 rounded-xl font-extrabold text-base transition-all shadow-md border border-border-subtle dark:border-white/10 group cursor-pointer"
                  >
                    <WhatsAppIcon className="w-5 h-5 text-brand-gold" />
                    <span>WhatsApp Specialist</span>
                  </motion.a>
                </motion.div>
              </div>

              {/* Right Column: Calculator Component */}
              <motion.div variants={itemVariants} className="lg:col-span-5 relative z-20 w-full max-w-[420px] mx-auto lg:ml-auto lg:mr-0 pt-8 lg:pt-0">
                {/* Decorative floating elements */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-primary/20 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-primary/10 rounded-full blur-2xl pointer-events-none" />

                <motion.div
                  className="rounded-3xl bg-surface dark:bg-[#0A0B0E]/95 backdrop-blur-xl border border-border-subtle dark:border-brand-primary/20 shadow-[0_8px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_40px_rgba(212,175,55,0.15)] relative overflow-hidden flex flex-col"
                >
                  {/* Calculator Header (Inspired by familyvisa.ae) */}
                  <div className="bg-gradient-to-r from-[#D4AF37] to-[#996515] p-5 flex items-center justify-between text-black shadow-md">
                    <div className="flex items-center gap-3">
                      <Calculator className="w-5 h-5 text-black" />
                      <h3 className="font-extrabold text-base tracking-tight uppercase">Instant Visa Calculator</h3>
                    </div>
                    <div className="flex items-center gap-1.5 bg-black/10 border border-black/20 px-3 py-1 rounded-full">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-700 animate-pulse"></div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-black">Live</span>
                    </div>
                  </div>

                  {/* Calculator Body */}
                  <div className="p-6 sm:p-8 space-y-6">
                    <div className="space-y-1">
                      <h4 className="font-bold text-lg text-content-primary dark:text-white">What is your primary goal?</h4>
                      <p className="text-sm text-content-muted dark:text-slate-400">Select an option to calculate exact costs.</p>
                    </div>

                    <div className="space-y-3">
                      {[
                        { id: 'golden', title: '10-Year Golden Visa', desc: 'Property investors & high earners', icon: Crown, tab: 'golden' },
                        { id: 'family', title: 'Family Residence Visa', desc: 'Sponsor spouse, children or parents', icon: Heart, tab: 'spouse' },
                        { id: 'property', title: 'Property Visa (2-Year)', desc: 'For real estate owners (AED 750k+)', icon: Building2, tab: 'property' },
                        { id: 'maid', title: 'Domestic Helper Visa', desc: 'Sponsor a maid, nanny or driver', icon: Users, tab: 'maid' }
                      ].map((item) => {
                        const Icon = item.icon;
                        return (
                          <div
                            key={item.id}
                            onClick={() => onOpenCalculator(item.tab)}
                            className="group flex items-center gap-4 p-4 rounded-2xl border border-border-subtle dark:border-white/10 bg-canvas dark:bg-black/40 cursor-pointer transition-all hover:border-brand-primary hover:bg-brand-primary/5 hover:shadow-md"
                          >
                            <div className="flex-none w-5 h-5 rounded-full border-2 border-border-strong dark:border-slate-600 relative group-hover:border-brand-primary transition-colors">
                              <div className="absolute inset-1 rounded-full bg-brand-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            <div className="flex-1">
                              <span className="block font-bold text-sm text-content-primary dark:text-white group-hover:text-brand-primary transition-colors">
                                {item.title}
                              </span>
                              <span className="block text-xs text-content-muted dark:text-slate-400 mt-0.5">
                                {item.desc}
                              </span>
                            </div>
                            <Icon className="flex-none w-5 h-5 text-content-muted dark:text-slate-400 group-hover:text-brand-primary transition-colors" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </section>
        );

      case 'stats':
        return (
          <RevealSection key="stats" className="px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
            <div ref={statsRef} className="bg-surface dark:bg-black/30 backdrop-blur-md border border-border-subtle dark:border-white/5 rounded-3xl p-8 sm:p-10 shadow-[var(--shadow-card)] relative overflow-hidden">
              {/* Subtle gold accent line at top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent" />
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-border-subtle dark:divide-white/10 text-center relative z-10">
                {statsMetrics.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: i * 0.1, duration: 0.5, type: 'spring' }}
                    className={`space-y-1.5 ${i > 0 ? 'pt-6 sm:pt-0' : ''}`}
                  >
                    <div className="font-display font-extrabold text-3xl sm:text-4xl text-brand-primary dark:text-gradient-shimmer">{m.val}</div>
                    <div className="text-xs sm:text-sm font-semibold text-content-secondary dark:text-slate-400">{m.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </RevealSection>
        );

      case 'achievements':
        return (
          <RevealSection key="achievements" className="w-full relative z-10 px-4 sm:px-6">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none" />
            <motion.div 
              variants={cardGridVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-5 gap-8 md:gap-4 text-center items-center relative z-10"
            >

              {/* Item 1 */}
              <motion.div variants={cardItemVariants} whileHover={{ y: -10 }} className="flex flex-col items-center space-y-4 p-6 rounded-2xl bg-surface dark:bg-black/40 border border-border-subtle dark:border-white/5 backdrop-blur-sm group hover:border-brand-primary/30 transition-colors shadow-sm">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-brand-primary/40 to-brand-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-brand-primary relative z-10 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-content-primary dark:text-white font-display tracking-tight">No #1</div>
                  <div className="text-brand-primary text-xs sm:text-sm font-bold uppercase tracking-wider">Top Agency</div>
                </div>
              </motion.div>

              {/* Item 2 */}
              <motion.div variants={cardItemVariants} whileHover={{ y: -10 }} className="flex flex-col items-center space-y-4 p-6 rounded-2xl bg-surface dark:bg-black/40 border border-border-subtle dark:border-white/5 backdrop-blur-sm group hover:border-brand-primary/30 transition-colors shadow-sm">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-brand-primary/40 to-brand-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  <Star className="w-10 h-10 sm:w-12 sm:h-12 text-brand-primary fill-brand-primary/20 relative z-10 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-content-primary dark:text-white font-display tracking-tight">4.9*</div>
                  <div className="text-brand-primary text-xs sm:text-sm font-bold uppercase tracking-wider">Google Rating</div>
                </div>
              </motion.div>

              {/* Item 3 */}
              <motion.div variants={cardItemVariants} whileHover={{ y: -10 }} className="flex flex-col items-center space-y-4 p-6 rounded-2xl bg-surface dark:bg-black/40 border border-border-subtle dark:border-white/5 backdrop-blur-sm group hover:border-brand-primary/30 transition-colors shadow-sm">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-brand-primary/40 to-brand-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  <ThumbsUp className="w-10 h-10 sm:w-12 sm:h-12 text-brand-primary relative z-10 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-content-primary dark:text-white font-display tracking-tight">100%</div>
                  <div className="text-brand-primary text-xs sm:text-sm font-bold uppercase tracking-wider">Client Satisfaction</div>
                </div>
              </motion.div>

              {/* Item 4 */}
              <motion.div variants={cardItemVariants} whileHover={{ y: -10 }} className="flex flex-col items-center space-y-4 p-6 rounded-2xl bg-surface dark:bg-black/40 border border-border-subtle dark:border-white/5 backdrop-blur-sm group hover:border-brand-primary/30 transition-colors shadow-sm">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-brand-primary/40 to-brand-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  <Users className="w-10 h-10 sm:w-12 sm:h-12 text-brand-primary relative z-10 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-content-primary dark:text-white font-display tracking-tight">15+</div>
                  <div className="text-brand-primary text-xs sm:text-sm font-bold uppercase tracking-wider">Expert PROs</div>
                </div>
              </motion.div>

              {/* Item 5 */}
              <motion.div variants={cardItemVariants} whileHover={{ y: -10 }} className="flex flex-col items-center space-y-4 col-span-2 lg:col-span-1 p-6 rounded-2xl bg-surface dark:bg-black/40 border border-border-subtle dark:border-white/5 backdrop-blur-sm group hover:border-brand-primary/30 transition-colors shadow-sm">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-brand-primary/40 to-brand-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-brand-primary relative z-10 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-content-primary dark:text-white font-display tracking-tight">5500+</div>
                  <div className="text-brand-primary text-xs sm:text-sm font-bold uppercase tracking-wider">Visas Issued</div>
                </div>
              </motion.div>

            </motion.div>
          </RevealSection>
        );

      case 'problems':
        return (
          <RevealSection key="problems" className="px-4 sm:px-6 max-w-7xl mx-auto relative z-10 space-y-10">
            <div className="bg-surface dark:bg-black/20 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-border-subtle dark:border-white/5 space-y-10 shadow-[var(--shadow-card)] relative overflow-hidden">
              <div className="text-center max-w-2xl mx-auto space-y-2 relative z-10">
                <div className="text-brand-primary font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-brand-primary" />
                  <span>THE 800 DOCS ADVANTAGE</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-content-primary dark:text-white tracking-tight">{cmsConfig?.problems?.title || "The Problems We Solve"}</h2>
                <p className="text-content-muted dark:text-slate-400 text-sm">{cmsConfig?.problems?.subtext || "Avoid bureaucracy, surprise fees, and endless waiting queues at service centers."}</p>
              </div>

              <motion.div
                variants={cardGridVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                className="grid md:grid-cols-2 gap-6 relative z-10"
              >
                {problemsSolved.map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={cardItemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="p-6 rounded-xl bg-surface dark:bg-black/40 border border-border-subtle dark:border-white/5 space-y-4 shadow-sm"
                  >
                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-900 dark:text-red-200 text-xs leading-relaxed">
                      <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-red-600 dark:text-red-400 block mb-0.5">THE OLD WAY / PROBLEM:</span>
                        {item.problem}
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-900 dark:text-emerald-200 text-xs leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-brand-gold dark:text-brand-goldLight shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-emerald-600 dark:text-brand-goldLight block mb-0.5">HOW WE SOLVE IT:</span>
                        {item.solution || item.desc}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </RevealSection>
        );

      case 'services':
        return (
          <RevealSection key="services" className="px-4 sm:px-6 max-w-7xl mx-auto relative z-10 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="text-brand-primary font-mono text-xs font-bold uppercase tracking-widest">END-TO-END SERVICES</div>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-content-primary dark:text-white tracking-tight">Everything We Handle</h2>
                <p className="text-content-muted dark:text-slate-400 text-sm sm:text-base">One dedicated advisory team for residency visas, identity cards, medical checkups, and document attestation.</p>
              </div>

              <div className="flex flex-wrap gap-2 bg-surface-elevated dark:bg-brand-surfaceLight p-1.5 rounded-xl border border-border-subtle dark:border-slate-800">
                {[
                  { key: 'all', label: `All Services (${categorizedServices.length})` },
                  { key: 'visas', label: 'Visas' },
                  { key: 'emiratesId', label: 'Emirates ID & Medical' },
                  { key: 'legal', label: 'Legal & Attestation' },
                ].map(cat => (
                  <motion.button
                    key={cat.key}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setServiceCategory(cat.key)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${serviceCategory === cat.key ? 'bg-brand-primary text-white shadow-md shadow-[#D4AF37]/20' : 'text-content-muted dark:text-slate-400 hover:text-content-primary dark:hover:text-white'
                      }`}
                  >
                    {cat.label}
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.div
              layout
              variants={cardGridVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredServices.map((srv) => {
                  const Icon = resolveIcon(srv.icon);
                  return (
                    <motion.div
                      key={srv.id}
                      layout
                      variants={cardItemVariants}
                      initial="hidden"
                      animate="show"
                      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="p-7 rounded-xl border flex flex-col justify-between bg-surface dark:bg-[#0A0B0E] border-border-subtle dark:border-white/10 group shadow-lg hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      <div className="space-y-4 relative z-10">
                        <div className="flex items-center justify-between">
                          <div className="p-3 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-white/10 dark:to-white/5 border border-border-subtle dark:border-white/10 text-brand-primary group-hover:bg-brand-primary group-hover:border-brand-primary group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:shadow-[#D4AF37]/30">
                            <Icon className="w-6 h-6 transition-colors duration-300" />
                          </div>
                          <span className="text-[10px] font-mono font-bold text-brand-primary bg-brand-primary/10 border border-brand-primary/20 px-2.5 py-1 rounded-full uppercase transition-colors group-hover:bg-brand-primary/20">
                            {srv.tag || srv.category || 'Visa'}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-display text-xl font-bold text-content-primary dark:text-white group-hover:text-brand-primary transition-colors">{srv.title}</h3>
                          <p className="text-content-muted dark:text-slate-400 text-xs leading-relaxed mt-2">{srv.desc || srv.shortDesc}</p>
                        </div>
                      </div>

                      <div className="pt-6 mt-6 border-t border-border-subtle dark:border-white/5 flex items-center justify-between relative z-10">
                        <button
                          onClick={() => onNavigate('service', srv.linkId || srv.id)}
                          className="text-xs font-bold text-brand-primary group-hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <span>View Details</span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button
                          onClick={() => onOpenCalculator('spouse')}
                          className="text-xs font-semibold text-content-muted dark:text-slate-400 hover:text-brand-primary dark:hover:text-brand-primary cursor-pointer transition-colors bg-surface-elevated dark:bg-white/5 px-3 py-1.5 rounded-lg group-hover:bg-brand-primary/10 group-hover:text-brand-primary"
                        >
                          Calculate →
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </RevealSection>
        );

      case 'transparency':
        return (
          <RevealSection key="transparency" className="px-4 sm:px-6 max-w-7xl mx-auto relative z-10 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="text-brand-gold font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-gold" />
                <span>TOTAL TRANSPARENCY GUARANTEE</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-content-primary dark:text-white tracking-tight">
                Unbundled Billing. Zero Hidden Surprises.
              </h2>
              <p className="text-content-muted dark:text-slate-400 text-sm sm:text-base">
                We split government statutory fees and our professional fee line-by-line so you know exactly where every Dirham goes.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Card: Official Government Tariffs */}
              <div className="bg-surface dark:bg-[#0c0e12] border border-border-subtle dark:border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">Official Government Tariffs</span>
                    <h3 className="font-extrabold text-xl text-white">Government & Authority Fees</h3>
                  </div>
                  <span className="bg-white/10 text-white font-mono text-xs font-bold px-3 py-1 rounded-full uppercase">At Official Cost</span>
                </div>

                <ul className="space-y-3.5 text-sm text-slate-300">
                  <li className="flex items-center justify-between py-2 border-b border-white/5">
                    <span>GDRFA File Opening & Sponsor Clearance</span>
                    <span className="font-mono font-bold text-white">AED 268.90</span>
                  </li>
                  <li className="flex items-center justify-between py-2 border-b border-white/5">
                    <span>Entry Permit E-Visa Clearance</span>
                    <span className="font-mono font-bold text-white">AED 1,125.65</span>
                  </li>
                  <li className="flex items-center justify-between py-2 border-b border-white/5">
                    <span>Status Change (In-Country Transfer)</span>
                    <span className="font-mono font-bold text-white">AED 675.65</span>
                  </li>
                  <li className="flex items-center justify-between py-2 border-b border-white/5">
                    <span>DHA / EHS Medical Fitness Test</span>
                    <span className="font-mono font-bold text-white">AED 320.00</span>
                  </li>
                  <li className="flex items-center justify-between py-2 border-b border-white/5">
                    <span>ICP Emirates ID Card (2-Year Validity)</span>
                    <span className="font-mono font-bold text-white">AED 390.00</span>
                  </li>
                </ul>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Original GDRFA & ICP Government Receipts Provided</span>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
              </div>

              {/* Right Card: Fixed Service Retainer */}
              <div className="bg-gradient-to-br from-brand-gold/15 via-[#0c0e12] to-[#0c0e12] border-2 border-brand-gold/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-[0_0_40px_rgba(212,175,55,0.15)] relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-brand-gold/30 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-brand-gold uppercase tracking-wider block">One Flat Retainer</span>
                    <h3 className="font-extrabold text-xl text-white">Our Professional Service Charge</h3>
                  </div>
                  <span className="bg-brand-gold text-black font-mono text-sm font-extrabold px-3.5 py-1.5 rounded-full uppercase shadow-md shadow-brand-gold/30">AED 1,450 Flat</span>
                </div>

                <ul className="space-y-3.5 text-sm text-slate-200">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0" />
                    <span>100% Online File Preparation & Pre-Flight Document Check</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0" />
                    <span>Dedicated Personal PRO Specialist on WhatsApp</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0" />
                    <span>VIP Priority Scheduling for Medical & Biometrics</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0" />
                    <span>Guaranteed Approval SLA & Emirates ID Courier Home Delivery</span>
                  </li>
                </ul>

                <div className="pt-4 border-t border-brand-gold/30 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-brand-gold uppercase">Zero Hidden Surcharges</span>
                  <button onClick={() => onOpenCalculator('family')} className="bg-brand-gold text-black font-extrabold text-xs px-4 py-2.5 rounded-lg hover:brightness-110 transition-all btn-shine-effect cursor-pointer">
                    Calculate Exact Total →
                  </button>
                </div>
              </div>
            </div>
          </RevealSection>
        );

      case 'packages':
        return (
          <RevealSection key="packages" className="px-4 sm:px-6 max-w-7xl mx-auto relative z-10 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="text-brand-primary font-mono text-xs font-bold uppercase tracking-widest">REAL ESTATE & INVESTORS</div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-content-primary dark:text-white tracking-tight">Complete Property Support</h2>
              <p className="text-content-muted dark:text-slate-400 text-sm sm:text-base">Comprehensive assistance for property investors. From DLD registration to Golden Visa processing through real estate investment.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Feature 1 */}
              <div className="group p-8 rounded-xl border border-border-subtle dark:border-brand-primary/10 bg-surface dark:bg-black/40 backdrop-blur-md hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                    <Building2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-content-primary dark:text-white mb-3 font-display tracking-tight">Property Investor Visa</h3>
                  <p className="text-content-muted dark:text-slate-400 text-sm leading-relaxed mb-6">
                    End-to-end processing for the 2-Year and 10-Year (Golden) Property Investor visas. We handle DLD taskeen, medical, and Emirates ID.
                  </p>
                  <ul className="space-y-4 text-sm font-semibold text-content-secondary dark:text-slate-300">
                    <li className="flex items-center gap-3"><div className="p-1 rounded-full bg-emerald-500/10 text-brand-gold"><Check className="w-4 h-4" /></div> DLD Taskeen Application</li>
                    <li className="flex items-center gap-3"><div className="p-1 rounded-full bg-emerald-500/10 text-brand-gold"><Check className="w-4 h-4" /></div> Golden Visa via Real Estate</li>
                    <li className="flex items-center gap-3"><div className="p-1 rounded-full bg-emerald-500/10 text-brand-gold"><Check className="w-4 h-4" /></div> Family Sponsorship included</li>
                  </ul>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group p-8 rounded-xl border border-border-subtle dark:border-brand-primary/10 bg-surface dark:bg-black/40 backdrop-blur-md hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-bl from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-surface-elevated dark:bg-white/5 text-content-primary dark:text-brand-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner group-hover:bg-brand-primary/10 group-hover:text-brand-primary">
                    <Scale className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-content-primary dark:text-white mb-3 font-display tracking-tight">DLD Trustee & Revaluation</h3>
                  <p className="text-content-muted dark:text-slate-400 text-sm leading-relaxed mb-6">
                    Complete representation at the Dubai Land Department. We assist with property revaluation for visa eligibility and title deed transfers.
                  </p>
                  <ul className="space-y-4 text-sm font-semibold text-content-secondary dark:text-slate-300">
                    <li className="flex items-center gap-3"><div className="p-1 rounded-full bg-emerald-500/10 text-brand-gold"><Check className="w-4 h-4" /></div> Title Deed Updates</li>
                    <li className="flex items-center gap-3"><div className="p-1 rounded-full bg-emerald-500/10 text-brand-gold"><Check className="w-4 h-4" /></div> Official Property Revaluation</li>
                    <li className="flex items-center gap-3"><div className="p-1 rounded-full bg-emerald-500/10 text-brand-gold"><Check className="w-4 h-4" /></div> Representation via POA</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="text-center pt-4">
               <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onOpenCalculator('property')}
                className="inline-flex items-center justify-center gap-2 bg-brand-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-[#D4AF37] transition-all shadow-lg shadow-[#D4AF37]/20"
              >
                <span>Calculate Property Visa Cost</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </RevealSection>
        );

      case 'whyUs':
        return (
          <RevealSection key="whyUs" className="px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
            <div className="bg-surface dark:bg-black/20 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-border-subtle dark:border-white/5 space-y-10 shadow-[var(--shadow-card)] relative overflow-hidden">
              {/* Top gold accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent" />
              <div className="text-center max-w-2xl mx-auto space-y-2 relative z-10">
                <div className="text-brand-primary font-mono text-xs font-bold uppercase tracking-widest">OFFICIAL LICENSE 800 DOCS LLC SOC</div>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-content-primary dark:text-white tracking-tight">Why Families Choose Us</h2>
                <p className="text-content-muted dark:text-slate-400 text-sm">We eliminate administrative delays and guarantee full transparency on every government fee.</p>
              </div>

              {(() => {
                const whyUsItems = cmsConfig?.whyUs?.items || [
                  { icon: ShieldCheck, color: 'from-[#D4AF37]/15 to-[#D4AF37]/5', iconColor: 'text-brand-primary', title: 'Direct GDRFA & ICP Portal', desc: 'Direct government integration ensures your family file is submitted directly into immigration servers without third-party delay.' },
                  { icon: Calculator, color: 'from-amber-500/15 to-amber-500/5', iconColor: 'text-brand-gold', title: 'Zero Hidden Charges', desc: 'Itemized breakdown before payment starts. You receive official government receipts for all ICP, GDRFA, and Emirates ID fees.' },
                  { icon: WhatsAppIcon, color: 'from-emerald-500/15 to-emerald-500/5', iconColor: 'text-brand-gold', title: 'Dedicated WhatsApp PRO', desc: 'Enjoy 1-on-1 direct communication with your assigned PRO specialist. Instant updates every step of the way.' },
                  { icon: Sparkles, color: 'from-slate-500/15 to-slate-500/5', iconColor: 'text-content-muted', title: '24-48 Hr Fast Track', desc: 'Need your visa urgently? Our VIP fast-track option gets entry permits and medical checkup approvals cleared in 24 to 48 hours.' },
                ];
                const lgGrid = whyUsItems.length === 3 ? 'lg:grid-cols-3' : whyUsItems.length === 2 ? 'lg:grid-cols-2' : whyUsItems.length === 1 ? 'lg:grid-cols-1' : 'lg:grid-cols-4';

                return (
                  <motion.div
                    variants={cardGridVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-60px' }}
                    className={`grid md:grid-cols-2 ${lgGrid} gap-6 relative z-10`}
                  >
                    {whyUsItems.map((item, idx) => {
                      const Icon = resolveIcon(item.icon) || ShieldCheck;

                      return (
                        <motion.div
                          key={idx}
                          variants={cardItemVariants}
                          whileHover={{ y: -8, scale: 1.02 }}
                          className="p-8 rounded-2xl bg-canvas dark:bg-black/40 border border-border-subtle dark:border-white/5 space-y-6 shadow-sm hover:shadow-[var(--shadow-card)] transition-all group relative overflow-hidden"
                        >
                          {/* Ambient glow effect on hover */}
                          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                          <div className="relative z-10">
                            <div className="p-4 rounded-xl bg-surface-elevated dark:bg-black/60 border border-border-subtle dark:border-white/5 w-fit shadow-sm group-hover:scale-110 group-hover:border-brand-primary/30 transition-all duration-500">
                              <Icon className="w-8 h-8 text-brand-primary" strokeWidth={1.5} />
                            </div>
                            <h3 className="font-display font-extrabold text-xl text-content-primary dark:text-white mt-6 mb-3 tracking-tight">{item.title}</h3>
                            <p className="text-sm text-content-muted dark:text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                );
              })()}
            </div>
          </RevealSection>
        );

      case 'process':
        return (
          <RevealSection key="process" id="process" className="px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
            <div className="p-8 sm:p-12 rounded-3xl bg-surface dark:bg-black/20 backdrop-blur-md border border-border-subtle dark:border-white/5 space-y-10 relative overflow-hidden shadow-[var(--shadow-card)]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div>
                  <div className="text-xs font-mono text-brand-primary font-semibold uppercase tracking-wider mb-1">STEP-BY-STEP SLA WORKFLOW</div>
                  <h2 className="font-display text-3xl font-extrabold text-content-primary dark:text-white tracking-tight">{activeGuide.title}</h2>
                  <p className="text-xs sm:text-sm text-content-muted dark:text-slate-400 mt-1 max-w-xl">{activeGuide.subtitle}</p>
                </div>

                <div className="flex items-center bg-surface-elevated dark:bg-black/40 p-1.5 rounded-xl border border-border-subtle dark:border-white/5 shrink-0">
                  {['newVisa', 'renewal'].map(tab => (
                    <motion.button
                      key={tab}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setGuideTab(tab)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${guideTab === tab ? 'bg-brand-primary text-white shadow-md shadow-[#D4AF37]/30' : 'text-content-muted dark:text-slate-400 hover:text-content-primary dark:hover:text-white'
                        }`}
                    >
                      {tab === 'newVisa' ? 'New Family Visa' : 'Visa Renewal'}
                    </motion.button>
                  ))}
                </div>
              </div>

              <motion.div
                key={guideTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 80 }}
                className="relative z-10 pt-10"
              >
                {/* Connecting Line (Desktop) */}
                <div className="hidden lg:block absolute top-[5.5rem] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent z-0 shadow-[0_0_10px_rgba(212,175,55,0.5)]" />

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                  {activeGuide.steps.map((st, i) => (
                    <motion.div
                      key={st.num}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="p-6 rounded-2xl bg-surface dark:bg-black/40 border border-border-subtle dark:border-brand-primary/20 space-y-4 shadow-sm group text-center"
                    >
                      <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-[#D4AF37] to-[#996515] text-white font-mono font-bold text-lg flex items-center justify-center shadow-lg shadow-[#D4AF37]/40 ring-4 ring-slate-100 dark:ring-black group-hover:ring-brand-primary/20 transition-all">
                        {st.num}
                      </div>
                      <h3 className="font-display font-extrabold text-base text-content-primary dark:text-white tracking-tight">{st.title}</h3>
                      <p className="text-sm text-content-muted dark:text-slate-400 leading-relaxed font-medium">{st.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </RevealSection>
        );

      case 'faqs':
        return (
          <RevealSection key="faqs" className="px-4 sm:px-6 max-w-4xl mx-auto relative z-10 space-y-8">
            <div className="text-center space-y-2">
              <div className="text-brand-primary font-mono text-xs font-bold uppercase tracking-widest">GOT QUESTIONS?</div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-content-primary dark:text-white tracking-tight">Frequently Asked Questions</h2>
              <p className="text-content-muted dark:text-slate-400 text-sm">Everything you need to know about sponsoring family in Dubai & UAE.</p>
            </div>

            <div className="space-y-4">
              {homepageFaqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.06, duration: 0.4 }}
                    className={`rounded-xl border transition-all overflow-hidden shadow-sm ${isOpen
                        ? 'bg-surface dark:bg-brand-surface border-brand-primary/30 shadow-md shadow-[#D4AF37]/5'
                        : 'bg-surface dark:bg-brand-surface border-border-subtle dark:border-white/10 hover:border-brand-primary/20'
                      }`}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-content-primary dark:text-white cursor-pointer hover:text-brand-primary transition-colors"
                    >
                      <span>{faq.question}</span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <ChevronDown className={`w-5 h-5 shrink-0 ${isOpen ? 'text-brand-primary' : 'text-content-muted dark:text-slate-400'}`} />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 text-xs sm:text-sm text-content-muted dark:text-slate-300 leading-relaxed border-t border-border-subtle dark:border-white/5 pt-3">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </RevealSection>
        );

      case 'reviews':
        return (
          <RevealSection key="reviews" className="relative z-10 overflow-hidden py-6">
            <div className="text-center max-w-3xl mx-auto mb-10 space-y-2 px-4">
              <div className="text-brand-primary font-mono text-xs tracking-widest uppercase font-bold">VERIFIED CLIENT FEEDBACK</div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-content-primary dark:text-white">4.9★ Rated on Google (500+ Client Reviews)</h2>
            </div>

            {/* Infinite Marquee with CSS animation — seamless loop */}
            <div className="marquee-container relative py-4">
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 dark:from-[#050505] to-transparent z-20 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 dark:from-[#050505] to-transparent z-20 pointer-events-none" />
              <div className="marquee-track">
                {/* First copy */}
                {infiniteReviews.map((rev, idx) => (
                  <div key={`a-${idx}`} className="w-[340px] sm:w-[420px] min-h-[220px] p-8 rounded-2xl bg-surface dark:bg-black/40 backdrop-blur-md border border-border-subtle dark:border-brand-primary/10 flex flex-col shadow-sm hover:shadow-2xl hover:shadow-brand-primary/10 hover:-translate-y-2 transition-all duration-500 whitespace-normal group relative overflow-hidden shrink-0">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none">
                      <Quote className="w-24 h-24 text-brand-primary" />
                    </div>
                    <div className="flex items-center justify-between mb-6 relative z-10">
                      <div className="flex items-center gap-1.5 text-brand-goldLight">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-amber-400 drop-shadow-sm" />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-brand-goldLight bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 uppercase tracking-widest flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </span>
                    </div>
                    <p className="text-base text-content-secondary dark:text-slate-300 italic leading-relaxed flex-1 overflow-hidden break-words relative z-10 font-medium">"{rev.comment}"</p>
                    <div className="pt-5 mt-5 border-t border-border-subtle dark:border-white/5 flex items-center gap-4 relative z-10">
                      <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center font-display font-bold text-brand-primary uppercase ring-2 ring-brand-primary/20">
                        {rev.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-extrabold text-content-primary dark:text-white text-sm tracking-tight">{rev.name}</div>
                        <div className="text-xs text-brand-primary font-mono font-medium">{rev.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Second copy for seamless loop */}
                {infiniteReviews.map((rev, idx) => (
                  <div key={`b-${idx}`} className="w-[340px] sm:w-[420px] min-h-[220px] p-8 rounded-2xl bg-surface dark:bg-black/40 backdrop-blur-md border border-border-subtle dark:border-brand-primary/10 flex flex-col shadow-sm hover:shadow-2xl hover:shadow-brand-primary/10 hover:-translate-y-2 transition-all duration-500 whitespace-normal group relative overflow-hidden shrink-0">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none">
                      <Quote className="w-24 h-24 text-brand-primary" />
                    </div>
                    <div className="flex items-center justify-between mb-6 relative z-10">
                      <div className="flex items-center gap-1.5 text-brand-goldLight">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-amber-400 drop-shadow-sm" />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-brand-goldLight bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 uppercase tracking-widest flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </span>
                    </div>
                    <p className="text-base text-content-secondary dark:text-slate-300 italic leading-relaxed flex-1 overflow-hidden break-words relative z-10 font-medium">"{rev.comment}"</p>
                    <div className="pt-5 mt-5 border-t border-border-subtle dark:border-white/5 flex items-center gap-4 relative z-10">
                      <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center font-display font-bold text-brand-primary uppercase ring-2 ring-brand-primary/20">
                        {rev.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-extrabold text-content-primary dark:text-white text-sm tracking-tight">{rev.name}</div>
                        <div className="text-xs text-brand-primary font-mono font-medium">{rev.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        );

      case 'blog':
        return (
          <RevealSection key="blog" className="px-4 sm:px-6 max-w-7xl mx-auto relative z-10 space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2 max-w-2xl">
                <div className="text-brand-primary font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-brand-primary" />
                  <span>OFFICIAL IMMIGRATION INSIGHTS</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-content-primary dark:text-white tracking-tight">Latest UAE Residency & Visa Guides</h2>
                <p className="text-content-muted dark:text-slate-400 text-sm sm:text-base">Expert advice on GDRFA salary rules, Golden Visa benefits, Ejari requirements, and newborn clearance.</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, x: 3 }}
                onClick={() => onNavigate('blog-index')}
                className="text-xs font-bold text-brand-primary hover:underline cursor-pointer flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
              >
                <span>View All Guides ({blogPostsData.length})</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>
            </div>

            <motion.div
              variants={cardGridVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="grid md:grid-cols-3 gap-6"
            >
              {blogPostsData.map((post) => (
                <motion.article
                  key={post.id}
                  variants={cardItemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => onNavigate('blog-post', post.id)}
                  className="card-premium p-6 rounded-xl bg-surface dark:bg-brand-surface border border-border-subtle dark:border-white/10 flex flex-col justify-between cursor-pointer group space-y-5"
                >
                  <div className="space-y-4">
                    <div className="relative h-48 rounded-xl overflow-hidden">
                      <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-3 left-3 bg-[#121417]/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono font-bold text-white border border-white/10 uppercase">
                        {post.category}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-[11px] font-mono text-content-muted dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-brand-primary" />
                          {post.date}
                        </span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-content-primary dark:text-white group-hover:text-brand-primary transition-colors leading-snug">{post.title}</h3>
                      <p className="text-content-muted dark:text-slate-400 text-xs leading-relaxed line-clamp-2">{post.excerpt}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border-subtle dark:border-white/5 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-content-muted dark:text-slate-400" />
                      <span className="font-semibold text-content-secondary dark:text-slate-300">{post.author}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-brand-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </RevealSection>
        );

      case 'cta':
        return (
          <RevealSection key="cta" className="px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
            <div className="bg-gradient-to-r from-[#D4AF37] via-[#D4AF37] to-[#996515] rounded-xl p-8 sm:p-14 text-white text-center shadow-2xl space-y-6 relative overflow-hidden animate-gradient-shift" style={{ backgroundSize: '200% 200%' }}>
              {/* Animated decorative elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-surface/10 rounded-full blur-3xl pointer-events-none animate-float-slow" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-surface/5 rounded-full blur-2xl pointer-events-none animate-float" />
              <div className="absolute inset-0 dot-pattern opacity-10 pointer-events-none" />

              <div className="max-w-2xl mx-auto space-y-3 relative z-10">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight"
                >
                  {cmsConfig?.cta?.headline || "Ready to bring your family to Dubai?"}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-white/90 text-sm sm:text-base leading-relaxed"
                >
                  {cmsConfig?.cta?.subtext || "Speak to a licensed UAE visa specialist on WhatsApp or calculate your exact government fee in 60 seconds."}
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10 pt-4"
              >
                {(cmsConfig?.cta?.buttons || [
                  { id: 'btn-1', label: 'Calculate Visa Cost', link: 'calculator', style: 'primary' },
                  { id: 'btn-2', label: 'Chat on WhatsApp', link: 'whatsapp', style: 'secondary' }
                ]).map((btn) => {
                  if (btn.link === 'calculator') {
                    return (
                      <motion.button
                        key={btn.id}
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => onOpenCalculator('property')}
                        className="w-full sm:w-auto px-8 py-5 bg-surface text-content-primary hover:text-brand-primary font-extrabold text-lg rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_35px_rgba(255,255,255,0.5)] transition-all cursor-pointer flex items-center justify-center gap-3 relative overflow-hidden group border-2 border-transparent btn-shine-effect"
                      >
                        <Calculator className="w-6 h-6 relative z-10 text-brand-primary" />
                        <span className="relative z-10">{btn.label}</span>
                      </motion.button>
                    );
                  } else if (btn.link === 'whatsapp') {
                    return (
                      <motion.a
                        key={btn.id}
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.97 }}
                        href={`https://wa.me/${cmsConfig?.global?.whatsappRaw || siteConfig.whatsappRaw}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-8 py-5 bg-slate-900 dark:bg-[#0A0B0E] hover:bg-black dark:hover:bg-[#15171C] text-white font-extrabold text-lg rounded-xl shadow-xl transition-all flex items-center justify-center gap-3 border border-brand-primary/20"
                      >
                        <WhatsAppIcon className="w-6 h-6 text-brand-goldLight" />
                        <span>{btn.label}</span>
                      </motion.a>
                    );
                  } else {
                    return (
                      <motion.a
                        key={btn.id}
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.97 }}
                        href={btn.link}
                        className="w-full sm:w-auto px-8 py-5 bg-slate-900 dark:bg-[#0A0B0E] hover:bg-black dark:hover:bg-[#15171C] text-white font-extrabold text-lg rounded-xl shadow-xl transition-all flex items-center justify-center gap-3 border border-brand-primary/20"
                      >
                        <span>{btn.label}</span>
                      </motion.a>
                    );
                  }
                })}
              </motion.div>
            </div>
          </RevealSection>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-20 pb-20 relative overflow-hidden">
      {/* Dynamic Ambient Background Glows */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], rotate: [0, 90, 0], x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 left-1/4 w-[550px] h-[550px] bg-brand-primary/8 rounded-full blur-[140px] pointer-events-none z-0"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90], x: [0, -50, 0], y: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-emerald-500/3 rounded-full blur-[160px] pointer-events-none z-0"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], y: [0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 left-10 w-[400px] h-[400px] bg-amber-500/3 rounded-full blur-[120px] pointer-events-none z-0"
      />

      {/* Render sections in dynamic order configured by CMS Admin */}
      {sectionOrder.map((sectionId, index) => {
        if (sectionVisibility[sectionId] === false) return null;
        const bgTheme = index % 2 === 0 ? 'bg-transparent' : 'bg-canvas/50 dark:bg-[#0a0a0a]/80 backdrop-blur-sm';
        return (
          <div key={sectionId} className={`w-full py-8 md:py-12 ${bgTheme}`}>
            {renderSection(sectionId)}
          </div>
        );
      })}
    </div>
  );
}
