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
  if (!icon) return null;
  if (typeof icon === 'string') return ICON_MAP[icon] || null;
  return icon;
}
import {
  diyProcessGuides,
  reviewsData,
  blogPostsData,
  siteConfig
} from '../data/cmsData';
import ProcessTimeline from './ProcessTimeline';

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
    ? (categorizedServices || [])
    : (categorizedServices || []).filter(s => {
      if (!s) return false;
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
          <section key="hero" id="top" className="pt-6 sm:pt-8 lg:pt-10 pb-12 px-4 sm:px-6 max-w-7xl mx-auto relative z-10 min-h-[75vh] lg:min-h-[80vh] flex flex-col justify-center" style={{ backgroundImage: "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(212,175,55,0.12), rgba(255,255,255,0))" }}>
            {/* Luxury Ambient Lighting Layer */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05),transparent_50%)] pointer-events-none -z-10 mix-blend-screen" />
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_60%)] pointer-events-none -z-10"
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
                  <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[10px] bg-[#D4AF37]/5 border border-[#D4AF37]/40 text-[#B8860B] text-xs font-extrabold uppercase tracking-widest shadow-sm">
                    <span className="text-[#B37700] animate-pulse">★</span> Premium Visa Consultancy
                  </motion.div>
                  <motion.h1 variants={itemVariants} className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-black tracking-tight leading-[1.05] drop-shadow-sm">
                    <span className="text-content-primary dark:text-white drop-shadow-sm">
                      {heroMainHeadline.split(' ').slice(0, 3).join(' ')}
                    </span>
                    <br />
                    <span className="text-dark-gold-shine font-black tracking-tight drop-shadow-[0_2px_4px_rgba(89,58,0,0.15)]">
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
                      <div className="p-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20">
                        <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                      </div>
                      <span>{stat}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    onClick={() => onOpenCalculator('property')}
                    className="group relative px-8 py-4 rounded-[10px] bg-dark-gold-gloss text-slate-950 font-black text-sm tracking-widest uppercase shadow-[0_8px_16px_rgba(212,175,55,0.25)] hover:shadow-[0_12px_24px_rgba(212,175,55,0.4)] hover:-translate-y-1 transition-all duration-500 overflow-hidden cursor-pointer"
                  >
                    <span className="relative z-10">Calculate Property Visa &rarr;</span>
                    {/* Magnetic Sweeping Shine Effect */}
                    <div className="absolute inset-0 w-[200%] -translate-x-[150%] skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:translate-x-[50%] transition-transform duration-1000 ease-in-out pointer-events-none" />
                  </button>

                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    href={`https://wa.me/${cmsConfig?.global?.whatsappRaw || siteConfig.whatsappRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-surface dark:bg-white/5 hover:bg-canvas dark:hover:bg-surface/10 text-content-primary dark:text-white px-8 py-4.5 rounded-[10px] font-extrabold text-base transition-all shadow-md border border-border-subtle dark:border-white/10 group cursor-pointer"
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
                  className="rounded-[10px] bg-white/70 dark:bg-[#0A0B0E]/70 backdrop-blur-2xl border border-white/50 dark:border-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_60px_-20px_rgba(212,175,55,0.15)] relative overflow-hidden flex flex-col"
                >
                  {/* Calculator Header (Inspired by familyvisa.ae) */}
                  <div className="w-full px-6 py-4 bg-[#0A0A0A] rounded-t-[10px] border-b border-[#D4AF37]/40 flex justify-between items-center shadow-sm">
                    <h3 className="font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FCE181]">
                      Instant Visa Calculator
                    </h3>
                    <span className="px-2 py-0.5 rounded-[10px] bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 text-[10px] font-black uppercase tracking-wider animate-pulse">
                      Live
                    </span>
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
                            className="group flex items-center gap-4 p-4 rounded-[10px] border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-black/40 backdrop-blur-sm cursor-pointer transition-all hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/5 hover:shadow-[0_10px_20px_-10px_rgba(212,175,55,0.2)]"
                          >
                            <div className="flex-none w-5 h-5 rounded-full border-2 border-border-strong dark:border-slate-600 relative group-hover:border-brand-primary transition-colors">
                              <div className="absolute inset-1 rounded-full bg-dark-gold-gloss text-slate-950 font-bold hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300 shadow-[0_4px_12px_rgba(212,175,55,0.25)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            <div className="flex-1">
                              <span className="block font-bold text-sm text-content-primary dark:text-white group-hover:text-[#B8860B] transition-colors">
                                {item.title}
                              </span>
                              <span className="block text-xs text-content-muted dark:text-slate-400 mt-0.5">
                                {item.desc}
                              </span>
                            </div>
                            <Icon className="flex-none w-5 h-5 text-content-muted dark:text-slate-400 group-hover:text-[#B8860B] transition-colors" />
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
                    className={`space-y-1.5 ${i > 0 ? 'pt-6 sm:pt-0' : ''} group`}
                  >
                    <div className="font-display font-black text-3xl sm:text-4xl bg-gradient-to-br from-[#F3E5AB] via-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{m.val}</div>
                    <div className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{m.label}</div>
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
              <motion.div variants={cardItemVariants} whileHover={{ y: -10 }} className="flex flex-col items-center space-y-4 p-6 rounded-2xl bg-white/5 dark:bg-[#111111]/80 border border-slate-200 dark:border-white/5 backdrop-blur-xl group hover:border-[#D4AF37]/30 transition-all duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="absolute -inset-4 bg-[#D4AF37]/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-[#D4AF37] relative z-10 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                </div>
                <div className="space-y-1 relative z-10">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white font-display tracking-tight">No #1</div>
                  <div className="text-[#B8860B] dark:text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest">Top Agency</div>
                </div>
              </motion.div>

              {/* Item 2 */}
              <motion.div variants={cardItemVariants} whileHover={{ y: -10 }} className="flex flex-col items-center space-y-4 p-6 rounded-2xl bg-white/5 dark:bg-[#111111]/80 border border-slate-200 dark:border-white/5 backdrop-blur-xl group hover:border-[#D4AF37]/30 transition-all duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="absolute -inset-4 bg-[#D4AF37]/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  <Star className="w-10 h-10 sm:w-12 sm:h-12 text-[#D4AF37] fill-[#D4AF37]/20 relative z-10 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                </div>
                <div className="space-y-1 relative z-10">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white font-display tracking-tight">4.9*</div>
                  <div className="text-[#B8860B] dark:text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest">Google Rating</div>
                </div>
              </motion.div>

              {/* Item 3 */}
              <motion.div variants={cardItemVariants} whileHover={{ y: -10 }} className="flex flex-col items-center space-y-4 p-6 rounded-2xl bg-white/5 dark:bg-[#111111]/80 border border-slate-200 dark:border-white/5 backdrop-blur-xl group hover:border-[#D4AF37]/30 transition-all duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="absolute -inset-4 bg-[#D4AF37]/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  <ThumbsUp className="w-10 h-10 sm:w-12 sm:h-12 text-[#D4AF37] relative z-10 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                </div>
                <div className="space-y-1 relative z-10">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white font-display tracking-tight">100%</div>
                  <div className="text-[#B8860B] dark:text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest">Client Satisfaction</div>
                </div>
              </motion.div>

              {/* Item 4 */}
              <motion.div variants={cardItemVariants} whileHover={{ y: -10 }} className="flex flex-col items-center space-y-4 p-6 rounded-2xl bg-white/5 dark:bg-[#111111]/80 border border-slate-200 dark:border-white/5 backdrop-blur-xl group hover:border-[#D4AF37]/30 transition-all duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="absolute -inset-4 bg-[#D4AF37]/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  <Users className="w-10 h-10 sm:w-12 sm:h-12 text-[#D4AF37] relative z-10 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                </div>
                <div className="space-y-1 relative z-10">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white font-display tracking-tight">15+</div>
                  <div className="text-[#B8860B] dark:text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest">Expert PROs</div>
                </div>
              </motion.div>

              {/* Item 5 */}
              <motion.div variants={cardItemVariants} whileHover={{ y: -10 }} className="flex flex-col items-center space-y-4 col-span-2 lg:col-span-1 p-6 rounded-2xl bg-white/5 dark:bg-[#111111]/80 border border-slate-200 dark:border-white/5 backdrop-blur-xl group hover:border-[#D4AF37]/30 transition-all duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="absolute -inset-4 bg-[#D4AF37]/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-[#D4AF37] relative z-10 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                </div>
                <div className="space-y-1 relative z-10">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white font-display tracking-tight">5500+</div>
                  <div className="text-[#B8860B] dark:text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest">Visas Issued</div>
                </div>
              </motion.div>

            </motion.div>
          </RevealSection>
        );

      case 'problems':
        return (
          <RevealSection key="problems" className="px-4 sm:px-6 max-w-7xl mx-auto relative z-10 space-y-10">
            <div className="bg-white/80 dark:bg-[#0a0a0a]/90 backdrop-blur-2xl rounded-[24px] p-8 sm:p-12 border border-slate-200 dark:border-white/10 space-y-10 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 blur-3xl rounded-full pointer-events-none -mr-20 -mt-20" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4AF37]/5 blur-3xl rounded-full pointer-events-none -ml-20 -mb-20" />
              
              <div className="text-center max-w-2xl mx-auto space-y-4 relative z-10">
                <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 text-[10px] font-mono font-bold px-3 py-1 rounded-[10px] uppercase tracking-widest">
                  THE 800 DOCS ADVANTAGE
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">{cmsConfig?.problems?.title || "The Problems We Solve"}</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{cmsConfig?.problems?.subtext || "Avoid bureaucracy, surprise fees, and endless waiting queues at service centers."}</p>
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
                    className="p-6 rounded-[16px] bg-slate-50 dark:bg-[#111111] border border-slate-200 dark:border-white/5 space-y-4 shadow-sm hover:border-[#D4AF37]/30 transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <div className="flex items-start gap-4 p-4 rounded-[12px] bg-slate-100 dark:bg-[#1a1a1a] border border-transparent text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                      <XCircle className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1 text-[10px] tracking-widest uppercase">The Old Way / Problem:</span>
                        {item.problem}
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-[12px] bg-white dark:bg-[#111111] border border-[#D4AF37]/30 text-slate-900 dark:text-white text-xs leading-relaxed shadow-[0_4px_20px_rgba(212,175,55,0.08)]">
                      <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-[#B8860B] dark:text-[#D4AF37] block mb-1 text-[10px] tracking-widest uppercase">How We Solve It:</span>
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
              <div className="space-y-4 max-w-2xl">
                <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 text-[10px] font-mono font-bold px-3 py-1 rounded-[10px] uppercase tracking-widest">
                  END-TO-END SERVICES
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Everything We Handle</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">One dedicated advisory team for residency visas, identity cards, medical checkups, and document attestation.</p>
              </div>

              <div className="flex flex-wrap gap-2 bg-slate-100 dark:bg-[#1a1a1a] p-1.5 rounded-[12px] border border-slate-200 dark:border-white/5 shadow-inner">
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
                    className={`px-4 py-2 rounded-[10px] text-xs font-bold transition-all duration-300 cursor-pointer ${serviceCategory === cat.key ? 'bg-gradient-to-b from-[#F3E5AB] to-[#D4AF37] text-black shadow-[0_4px_12px_rgba(212,175,55,0.3)]' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredServices.map((srv, idx) => {
                  const Icon = resolveIcon(srv.icon);
                  return (
                    <motion.div
                      key={srv.id}
                      layout
                      variants={cardItemVariants}
                      initial="hidden"
                      animate="show"
                      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                      className="group relative bg-white/80 dark:bg-[#111111]/80 backdrop-blur-xl p-8 rounded-[12px] border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)] hover:-translate-y-1 hover:border-[#D4AF37]/40 transition-all duration-500 overflow-hidden cursor-pointer flex flex-col justify-between"
                    >
                      {/* Animated inner glow on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      <div className="space-y-4 relative z-10">
                        <div className="flex items-center justify-between">
                          <div className="p-3 rounded-[12px] bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/5 text-[#B8860B] dark:text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300 shadow-sm group-hover:shadow-[0_4px_15px_rgba(212,175,55,0.4)]">
                            <Icon className="w-6 h-6 transition-colors duration-300" />
                          </div>
                          <span className="text-[9px] font-mono font-bold text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-2.5 py-1 rounded-full uppercase transition-colors group-hover:bg-[#D4AF37]/20">
                            {srv.tag || srv.category || 'Visa'}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-display text-xl font-black text-slate-900 dark:text-white group-hover:text-[#B8860B] transition-colors">{srv.title}</h3>
                          <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mt-2 font-medium">{srv.desc || srv.shortDesc}</p>
                        </div>
                      </div>

                      <div className="pt-6 mt-6 border-t border-border-subtle dark:border-white/5 flex items-center justify-between relative z-10">
                        <button
                          onClick={() => onNavigate('service', srv.linkId || srv.id)}
                          className="text-xs font-bold text-brand-primary group-hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <span>View Details</span>
                        </button>

                        <button
                          onClick={() => onOpenCalculator('spouse')}
                          className="relative z-20 text-xs font-bold bg-[#D4AF37]/10 text-[#B8860B] px-4 py-2 rounded-[10px] group-hover:bg-dark-gold-gloss group-hover:text-black transition-all cursor-pointer"
                        >
                          Calculate →
                        </button>
                      </div>
                      
                      {/* Animated Arrow */}
                      <div className="absolute bottom-6 right-6 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-[#D4AF37] pointer-events-none">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
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
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 text-[10px] font-mono font-bold px-3 py-1 rounded-[10px] uppercase tracking-widest">
                TOTAL TRANSPARENCY GUARANTEE
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Unbundled Billing. Zero Hidden Surprises.
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
                We split government statutory fees and our professional fee line-by-line so you know exactly where every Dirham goes.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Card: Official Government Tariffs */}
              <div className="bg-white/80 dark:bg-[#111111]/80 backdrop-blur-md border border-slate-200 dark:border-white/5 rounded-[20px] p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-200/50 dark:bg-white/5 blur-3xl rounded-full pointer-events-none" />
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4 relative z-10">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">Official Government Tariffs</span>
                    <h3 className="font-black text-xl text-slate-900 dark:text-white mt-1">Government & Authority Fees</h3>
                  </div>
                  <span className="bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white font-mono text-[10px] font-bold px-3 py-1 rounded-[10px] uppercase">At Official Cost</span>
                </div>

                <ul className="space-y-3.5 text-sm text-slate-600 dark:text-slate-300 relative z-10">
                  <li className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-white/5">
                    <span>GDRFA File Opening & Sponsor Clearance</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">AED 268.90</span>
                  </li>
                  <li className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-white/5">
                    <span>Entry Permit E-Visa Clearance</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">AED 1,125.65</span>
                  </li>
                  <li className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-white/5">
                    <span>Status Change (In-Country Transfer)</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">AED 675.65</span>
                  </li>
                  <li className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-white/5">
                    <span>DHA / EHS Medical Fitness Test</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">AED 320.00</span>
                  </li>
                  <li className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-white/5">
                    <span>ICP Emirates ID Card (2-Year Validity)</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">AED 390.00</span>
                  </li>
                </ul>

                <div className="p-4 rounded-[12px] bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-between relative z-10">
                  <span className="text-xs text-emerald-900 dark:text-emerald-300 font-bold tracking-tight">Original GDRFA & ICP Government Receipts Provided</span>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                </div>
              </div>

              {/* Right Card: Fixed Service Retainer */}
              <div className="bg-gradient-to-br from-white to-slate-50 dark:from-[#1a1a1a] dark:to-[#111111] border-2 border-[#D4AF37]/40 rounded-[20px] p-6 sm:p-8 space-y-6 shadow-[0_8px_30px_rgba(212,175,55,0.15)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/10 blur-3xl rounded-full pointer-events-none -mr-10 -mt-10" />
                
                <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-4 relative z-10">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#B8860B] dark:text-[#D4AF37] uppercase tracking-wider block">One Flat Retainer</span>
                    <h3 className="font-black text-xl text-slate-900 dark:text-white mt-1">Our Professional Service Charge</h3>
                  </div>
                  <span className="bg-[#D4AF37] text-black font-mono text-[10px] font-black px-3.5 py-1.5 rounded-[10px] uppercase shadow-md shadow-[#D4AF37]/30">AED 1,450 Flat</span>
                </div>

                <ul className="space-y-4 text-sm text-slate-700 dark:text-slate-300 relative z-10 font-medium">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>100% Online File Preparation & Pre-Flight Document Check</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>Dedicated Personal PRO Specialist on WhatsApp</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>VIP Priority Scheduling for Medical & Biometrics</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>Guaranteed Approval SLA & Emirates ID Courier Home Delivery</span>
                  </li>
                </ul>

                <div className="pt-6 border-t border-[#D4AF37]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                  <span className="text-[10px] font-mono font-black text-[#B8860B] dark:text-[#D4AF37] uppercase tracking-widest">Zero Hidden Surcharges</span>
                  <button onClick={() => onOpenCalculator('family')} className="bg-dark-gold-gloss text-slate-950 font-black text-xs px-5 py-3 rounded-[10px] hover:brightness-110 hover:-translate-y-1 transition-all shadow-[0_4px_15px_rgba(212,175,55,0.3)] cursor-pointer tracking-wider uppercase">
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
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 text-[10px] font-mono font-bold px-3 py-1 rounded-[10px] uppercase tracking-widest">
                REAL ESTATE & INVESTORS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Complete Property Support</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">Comprehensive assistance for property investors. From DLD registration to Golden Visa processing through real estate investment.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Feature 1 */}
              <div className="group p-8 rounded-[20px] border border-slate-200 dark:border-white/5 bg-white/80 dark:bg-[#111111]/80 backdrop-blur-md hover:-translate-y-2 shadow-sm hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)] hover:border-[#D4AF37]/30 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/5 text-[#B8860B] dark:text-[#D4AF37] flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] group-hover:text-black group-hover:scale-110 transition-all duration-300 shadow-sm group-hover:shadow-[0_4px_15px_rgba(212,175,55,0.4)]">
                    <Building2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 font-display tracking-tight group-hover:text-[#B8860B] transition-colors">Property Investor Visa</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                    End-to-end processing for the 2-Year and 10-Year (Golden) Property Investor visas. We handle DLD taskeen, medical, and Emirates ID.
                  </p>
                  <ul className="space-y-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <li className="flex items-center gap-3"><div className="p-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37]"><Check className="w-4 h-4" /></div> DLD Taskeen Application</li>
                    <li className="flex items-center gap-3"><div className="p-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37]"><Check className="w-4 h-4" /></div> Golden Visa via Real Estate</li>
                    <li className="flex items-center gap-3"><div className="p-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37]"><Check className="w-4 h-4" /></div> Family Sponsorship included</li>
                  </ul>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group p-8 rounded-[20px] border border-slate-200 dark:border-white/5 bg-white/80 dark:bg-[#111111]/80 backdrop-blur-md hover:-translate-y-2 shadow-sm hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)] hover:border-[#D4AF37]/30 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-bl from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/5 text-[#B8860B] dark:text-[#D4AF37] flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] group-hover:text-black group-hover:scale-110 transition-all duration-300 shadow-sm group-hover:shadow-[0_4px_15px_rgba(212,175,55,0.4)]">
                    <Scale className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 font-display tracking-tight group-hover:text-[#B8860B] transition-colors">DLD Trustee & Revaluation</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                    Complete representation at the Dubai Land Department. We assist with property revaluation for visa eligibility and title deed transfers.
                  </p>
                  <ul className="space-y-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <li className="flex items-center gap-3"><div className="p-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37]"><Check className="w-4 h-4" /></div> Title Deed Updates</li>
                    <li className="flex items-center gap-3"><div className="p-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37]"><Check className="w-4 h-4" /></div> Official Property Revaluation</li>
                    <li className="flex items-center gap-3"><div className="p-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37]"><Check className="w-4 h-4" /></div> Representation via POA</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center pt-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onOpenCalculator('property')}
                className="inline-flex items-center justify-center gap-3 bg-dark-gold-gloss text-slate-950 font-black hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_15px_rgba(212,175,55,0.3)] hover:shadow-[0_8px_25px_rgba(212,175,55,0.5)] px-10 py-5 rounded-[12px] uppercase tracking-wider text-sm"
              >
                <span>Calculate Property Visa Cost</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </RevealSection>
        );

      case 'whyUs':
        return (
          <RevealSection key="whyUs" className="px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
            <div className="bg-white/80 dark:bg-[#0a0a0a]/90 backdrop-blur-2xl rounded-[24px] p-8 sm:p-12 border border-slate-200 dark:border-white/10 space-y-10 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-2xl relative overflow-hidden">
              {/* Top gold accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />
              <div className="text-center max-w-2xl mx-auto space-y-4 relative z-10">
                <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 text-[10px] font-mono font-bold px-3 py-1 rounded-[10px] uppercase tracking-widest">
                  OFFICIAL LICENSE 800 DOCS LLC SOC
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Why Families Choose Us</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">We eliminate administrative delays and guarantee full transparency on every government fee.</p>
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
                      const fallbackIcons = [ShieldCheck, Calculator, WhatsAppIcon, Sparkles];
                      const Icon = resolveIcon(item.icon) || fallbackIcons[idx % fallbackIcons.length];

                      return (
                        <motion.div
                          key={idx}
                          variants={cardItemVariants}
                          whileHover={{ y: -8, scale: 1.02 }}
                          className="p-8 rounded-[12px] bg-gradient-to-b from-white to-[#fcfaf5] dark:from-[#111111]/90 dark:to-[#0a0a0a]/90 border border-[#D4AF37]/20 space-y-6 shadow-[0_4px_20px_rgba(212,175,55,0.05)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)] hover:border-[#D4AF37]/50 transition-all duration-500 group relative overflow-hidden flex flex-col h-full"
                        >
                          {/* Ambient glow effect on hover */}
                          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                          <div className="relative z-10 flex flex-col h-full">
                            <div className="p-4 rounded-[12px] bg-white dark:bg-[#1a1a1a] border border-[#D4AF37]/20 w-fit shadow-sm group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-500 text-[#B8860B] dark:text-[#D4AF37]">
                              <Icon className="w-8 h-8 transition-colors duration-300" strokeWidth={1.5} />
                            </div>
                            <h3 className="font-display font-black text-xl text-slate-900 dark:text-white mt-6 mb-3 tracking-tight group-hover:text-[#B8860B] transition-colors">{item.title}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium flex-1">{item.desc}</p>
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
          <RevealSection key="process" id="process" className="relative z-10 w-full overflow-hidden">
            <ProcessTimeline title={activeGuide.title} subtitle={activeGuide.subtitle} steps={activeGuide.steps} />
          </RevealSection>
        );

      case 'faqs':
        return (
          <RevealSection key="faqs" className="px-4 sm:px-6 max-w-4xl mx-auto relative z-10 space-y-10">
            <div className="text-center space-y-4">
              <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 text-[10px] font-mono font-bold px-3 py-1 rounded-[10px] uppercase tracking-widest">
                GOT QUESTIONS?
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Frequently Asked Questions</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Everything you need to know about sponsoring family in Dubai & UAE.</p>
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
                    className={`rounded-[16px] border transition-all overflow-hidden shadow-sm ${isOpen
                      ? 'bg-white/80 dark:bg-[#111111]/80 backdrop-blur-md border-[#D4AF37]/30 shadow-[0_8px_30px_rgba(212,175,55,0.1)]'
                      : 'bg-white/50 dark:bg-black/40 backdrop-blur-sm border-slate-200 dark:border-white/5 hover:border-[#D4AF37]/20 hover:bg-white/80 dark:hover:bg-[#111111]/60'
                      }`}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 dark:text-white cursor-pointer hover:text-[#B8860B] dark:hover:text-[#D4AF37] transition-colors"
                    >
                      <span>{faq.question}</span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <ChevronDown className={`w-5 h-5 shrink-0 ${isOpen ? 'text-[#D4AF37]' : 'text-slate-400 dark:text-slate-500'}`} />
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
                          <div className="px-6 pb-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-white/5 pt-4 font-medium">
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
          <RevealSection key="reviews" className="relative z-10 overflow-hidden py-10">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-4 px-4 relative z-10">
              <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 text-[10px] font-mono font-bold px-3 py-1 rounded-[10px] uppercase tracking-widest">
                VERIFIED CLIENT FEEDBACK
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">4.9★ Rated on Google (500+ Client Reviews)</h2>
            </div>

            {/* Infinite Marquee with CSS animation — seamless loop */}
            <div className="marquee-container relative py-4">
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 dark:from-[#050505] to-transparent z-20 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 dark:from-[#050505] to-transparent z-20 pointer-events-none" />
              <div className="marquee-track">
                {infiniteReviews.map((rev, idx) => (
                  <div key={`a-${idx}`} className="w-[340px] sm:w-[420px] min-h-[220px] p-8 rounded-[24px] bg-white/80 dark:bg-[#111111]/80 backdrop-blur-xl border border-slate-200 dark:border-[#D4AF37]/10 flex flex-col shadow-sm hover:shadow-[0_15px_40px_rgba(212,175,55,0.12)] hover:-translate-y-2 transition-all duration-500 whitespace-normal group relative overflow-hidden shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="absolute top-0 right-0 p-4 opacity-[0.03] dark:opacity-5 group-hover:opacity-[0.06] dark:group-hover:opacity-10 transition-opacity duration-300 pointer-events-none">
                      <Quote className="w-24 h-24 text-slate-900 dark:text-[#D4AF37]" />
                    </div>
                    <div className="flex items-center justify-between mb-6 relative z-10">
                      <div className="flex items-center gap-1.5">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37] drop-shadow-sm" />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono font-bold text-[#B8860B] dark:text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1.5 rounded-full border border-[#D4AF37]/20 uppercase tracking-widest flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </span>
                    </div>
                    <p className="text-base text-slate-600 dark:text-slate-300 italic leading-relaxed flex-1 overflow-hidden break-words relative z-10 font-medium">"{rev.comment}"</p>
                    <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/5 flex items-center gap-4 relative z-10">
                      <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-[#1a1a1a] flex items-center justify-center font-display font-black text-[#B8860B] dark:text-[#D4AF37] uppercase ring-2 ring-[#D4AF37]/20 shadow-sm text-lg">
                        {rev.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-black text-slate-900 dark:text-white text-sm tracking-tight">{rev.name}</div>
                        <div className="text-xs text-[#B8860B] dark:text-[#D4AF37] font-mono font-bold mt-0.5">{rev.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Second copy for seamless loop */}
                {infiniteReviews.map((rev, idx) => (
                  <div key={`b-${idx}`} className="w-[340px] sm:w-[420px] min-h-[220px] p-8 rounded-[24px] bg-white/80 dark:bg-[#111111]/80 backdrop-blur-xl border border-slate-200 dark:border-[#D4AF37]/10 flex flex-col shadow-sm hover:shadow-[0_15px_40px_rgba(212,175,55,0.12)] hover:-translate-y-2 transition-all duration-500 whitespace-normal group relative overflow-hidden shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="absolute top-0 right-0 p-4 opacity-[0.03] dark:opacity-5 group-hover:opacity-[0.06] dark:group-hover:opacity-10 transition-opacity duration-300 pointer-events-none">
                      <Quote className="w-24 h-24 text-slate-900 dark:text-[#D4AF37]" />
                    </div>
                    <div className="flex items-center justify-between mb-6 relative z-10">
                      <div className="flex items-center gap-1.5">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37] drop-shadow-sm" />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono font-bold text-[#B8860B] dark:text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1.5 rounded-full border border-[#D4AF37]/20 uppercase tracking-widest flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </span>
                    </div>
                    <p className="text-base text-slate-600 dark:text-slate-300 italic leading-relaxed flex-1 overflow-hidden break-words relative z-10 font-medium">"{rev.comment}"</p>
                    <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/5 flex items-center gap-4 relative z-10">
                      <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-[#1a1a1a] flex items-center justify-center font-display font-black text-[#B8860B] dark:text-[#D4AF37] uppercase ring-2 ring-[#D4AF37]/20 shadow-sm text-lg">
                        {rev.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-black text-slate-900 dark:text-white text-sm tracking-tight">{rev.name}</div>
                        <div className="text-xs text-[#B8860B] dark:text-[#D4AF37] font-mono font-bold mt-0.5">{rev.role}</div>
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
              <div className="space-y-4 max-w-2xl">
                <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 text-[10px] font-mono font-bold px-3 py-1 rounded-[10px] uppercase tracking-widest">
                  OFFICIAL IMMIGRATION INSIGHTS
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Latest UAE Residency & Visa Guides</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">Expert advice on GDRFA salary rules, Golden Visa benefits, Ejari requirements, and newborn clearance.</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, x: 3 }}
                onClick={() => onNavigate('blog-index')}
                className="text-xs font-bold text-[#B8860B] dark:text-[#D4AF37] hover:underline cursor-pointer flex items-center gap-1.5 shrink-0 self-start sm:self-auto bg-[#D4AF37]/10 px-4 py-2.5 rounded-[10px]"
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
              className="grid md:grid-cols-3 gap-8"
            >
              {blogPostsData.map((post) => (
                <motion.article
                  key={post.id}
                  variants={cardItemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => onNavigate('blog-post', post.id)}
                  className="p-6 rounded-[20px] bg-white/80 dark:bg-[#111111]/80 backdrop-blur-md border border-slate-200 dark:border-white/5 flex flex-col justify-between cursor-pointer group space-y-5 shadow-sm hover:shadow-[0_15px_40px_rgba(212,175,55,0.12)] hover:border-[#D4AF37]/30 transition-all duration-500 overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="space-y-4 relative z-10">
                    <div className="relative h-48 rounded-[12px] overflow-hidden">
                      <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-3 left-3 bg-[#111111]/80 backdrop-blur-md px-3 py-1 rounded-[8px] text-[9px] font-mono font-bold text-[#D4AF37] border border-[#D4AF37]/20 uppercase tracking-widest shadow-sm">
                        {post.category}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#B8860B] dark:text-[#D4AF37]" />
                          {post.date}
                        </span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="font-display text-lg font-black text-slate-900 dark:text-white group-hover:text-[#B8860B] transition-colors leading-snug tracking-tight">{post.title}</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 font-medium">{post.excerpt}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-mono relative z-10">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">{post.author}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </RevealSection>
        );

      case 'cta':
        return (
          <RevealSection key="cta" className="px-0 relative z-10">
            <section className="relative w-full py-16 bg-[#050505] border-y border-[#D4AF37]/40 shadow-[inset_0_0_100px_rgba(212,175,55,0.05)] overflow-hidden">
              {/* Subtle gold ambient glow behind the text */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.15)_0%,_rgba(5,5,5,0)_60%)] pointer-events-none"></div>
              
              <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl md:text-4xl font-black bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#D4AF37] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(212,175,55,0.2)]"
                >
                  {cmsConfig?.cta?.headline || "Ready to Sponsor Your Family in the UAE?"}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-slate-400 mt-4"
                >
                  {cmsConfig?.cta?.subtext || "Talk to a visa specialist today or calculate your exact government fee in 60 seconds."}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8"
                >
                  {(cmsConfig?.cta?.buttons || [
                    { id: 'btn-1', label: 'Get Started Now', link: 'calculator', style: 'primary' },
                    { id: 'btn-2', label: 'Chat on WhatsApp', link: 'whatsapp', style: 'secondary' }
                  ]).map((btn) => {
                    if (btn.link === 'calculator') {
                      return (
                        <button
                          key={btn.id}
                          onClick={() => onOpenCalculator('property')}
                          className="w-full sm:w-auto px-8 py-4 rounded-[10px] bg-gradient-to-r from-[#C9981E] via-[#FCE181] to-[#C9981E] text-black font-extrabold shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),_0_0_20px_rgba(212,175,55,0.3)] hover:brightness-110 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                        >
                          {btn.label}
                        </button>
                      );
                    } else if (btn.link === 'whatsapp') {
                      return (
                        <a
                          key={btn.id}
                          href={`https://wa.me/${cmsConfig?.global?.whatsappRaw || siteConfig.whatsappRaw}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto px-8 py-4 rounded-[10px] bg-[#111111] border border-white/10 text-white font-extrabold hover:bg-black transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <WhatsAppIcon className="w-5 h-5 text-[#D4AF37]" />
                          <span>{btn.label}</span>
                        </a>
                      );
                    } else {
                      return (
                        <a
                          key={btn.id}
                          href={btn.link}
                          className="w-full sm:w-auto px-8 py-4 rounded-[10px] bg-[#111111] border border-white/10 text-white font-extrabold hover:bg-black transition-all duration-300 cursor-pointer"
                        >
                          {btn.label}
                        </a>
                      );
                    }
                  })}
                </motion.div>
              </div>
            </section>
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
        className="absolute top-10 left-1/4 w-[550px] h-[550px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none z-0"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90], x: [0, -50, 0], y: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-[#D4AF37]/3 rounded-full blur-[160px] pointer-events-none z-0"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], y: [0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 left-10 w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none z-0"
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
