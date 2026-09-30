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
  BadgeCheck
} from 'lucide-react';

// Icon map: resolve lucide icon by string name (used when CMS config stores icon as a string)
const ICON_MAP = {
  Heart, Baby, Users, Crown, Shield, ShieldCheck, ArrowRight, Calculator,
  Star, ChevronRight, Building2, CheckCircle2, XCircle,
  Clock, Sparkles, FileCheck, Stethoscope, IdCard, Languages, Scale,
  Award, Trophy, Zap, Check, AlertTriangle, BookOpen, Calendar, User,
  MapPin, Briefcase, Building, BadgeCheck
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

export default function Home({ onNavigate, onOpenCalculator, cmsConfig }) {
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
  const heroMainHeadline = cmsConfig?.hero?.mainHeadline || "Bring your family to the UAE with 100% Guaranteed SLA Approval.";
  const heroSubtext = cmsConfig?.hero?.subtext || "We prepare, submit, and track family residence visas, 10-Year Golden Visas, and Emirates ID applications so you deal with one consultant instead of five counters.";
  const heroStat1 = cmsConfig?.hero?.stat1 || "Free eligibility check before any fee";
  const heroStat2 = cmsConfig?.hero?.stat2 || "Fixed service fee, government at cost";
  const heroStat3 = cmsConfig?.hero?.stat3 || "Most files completed in 5-10 days";

  // Homepage FAQs matching familyvisauae.com
  const homepageFaqs = cmsConfig?.faqs?.items || [
    {
      question: "Do I need a minimum salary to sponsor my family in the UAE?",
      answer: "Yes ΓÇö AED 4,000 per month (or AED 3,000 per month if your employer provides free housing) is required to sponsor your spouse and children. Sponsoring parents requires a minimum monthly salary of AED 10,000 and a registered 2-bedroom rental contract (EJARI)."
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
      id: 'family-visa',
      title: 'Executive Family Sponsorship',
      desc: 'End-to-end management of spouse and dependant residency files. We handle GDRFA compliance, entry permits, and Emirates ID issuance seamlessly.',
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
      id: 'property-visa',
      title: 'Real Estate Investor Residency',
      desc: 'Turn your AED 750k or AED 2M+ property equity into a 2-Year or 10-Year residency. We manage DLD approvals and title deed verification.',
      tag: 'Visas',
      icon: Building2,
      linkId: 'property-visa'
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
      stat: "4.9 Γÿà Rating"
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
        solution: "100% Online WhatsApp Concierge. Send scans from home ΓÇö we handle all government counters for you."
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
      tagline: "Complete end-to-end handling ΓÇö from entry permit to Emirates ID home delivery.",
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

  // Duplicated reviews for infinite ticker loop ΓÇö 4x for seamless CSS marquee
  const infiniteReviews = [...reviewsData, ...reviewsData];

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
    { val: cmsConfig?.stats?.metric1Val || '15,000+', label: cmsConfig?.stats?.metric1Label || 'Family Applications', color: 'text-gradient-shimmer' },
    { val: cmsConfig?.stats?.metric2Val || '99.8%', label: cmsConfig?.stats?.metric2Label || 'ICP Approval Rate', color: 'text-white' },
    { val: cmsConfig?.stats?.metric3Val || '5-10 Days', label: cmsConfig?.stats?.metric3Label || 'Average Turnaround', color: 'text-gradient-shimmer' },
    { val: cmsConfig?.stats?.metric4Val || '15 Mins', label: cmsConfig?.stats?.metric4Label || 'WhatsApp Response', color: 'text-emerald-400' },
  ];

  // Helper render function for each section
  const renderSection = (id) => {
    switch (id) {
      case 'hero':
        return (
          <section key="hero" id="top" className="pt-8 sm:pt-12 lg:pt-16 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid lg:grid-cols-12 gap-12 items-center"
            >
              <div className="lg:col-span-7 space-y-6 md:space-y-8">
                <motion.h1 variants={itemVariants} className="font-display text-[2.5rem] sm:text-5xl lg:text-[4rem] font-extrabold tracking-tight leading-[1.05]">
                  <span className="text-[#E01E37]">{heroMainHeadline.split(' ').slice(0, 3).join(' ')}</span>{' '}
                  <span className="text-slate-900 dark:text-white">{heroMainHeadline.split(' ').slice(3).join(' ')}</span>
                </motion.h1>

                <motion.p variants={itemVariants} className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                  {heroSubtext}
                </motion.p>

                <motion.ul variants={itemVariants} className="space-y-3 pt-1">
                  {[heroStat1, heroStat2, heroStat3].map((stat, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.15, duration: 0.5 }}
                      className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200"
                    >
                      <div className="p-0.5 rounded-full bg-[#E01E37]/10">
                        <CheckCircle2 className="w-4 h-4 text-[#E01E37]" />
                      </div>
                      <span>{stat}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-3">
                  <motion.button
                    whileHover={{ scale: 1.04, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onOpenCalculator('spouse')}
                    className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#E01E37] to-[#B81A2C] hover:from-[#C8102E] hover:to-[#8B0A1E] text-white px-7 py-4 rounded-2xl font-bold text-base transition-all shadow-lg shadow-[#E01E37]/25 cursor-pointer group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                    <Calculator className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Calculate Your Visa Cost</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform relative z-10" />
                  </motion.button>

                  <motion.a
                    whileHover={{ scale: 1.04, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    href={`https://wa.me/${cmsConfig?.global?.whatsappRaw || siteConfig.whatsappRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-4 rounded-2xl font-bold text-base transition-all shadow-md shadow-emerald-600/20 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                    <svg className="w-5 h-5 relative z-10 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                    <span className="relative z-10">WhatsApp Specialist</span>
                  </motion.a>
                </motion.div>
              </div>

              {/* Right Floating Glass Card */}
              <motion.div variants={itemVariants} className="lg:col-span-5 relative z-20">
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-black/40 backdrop-blur-3xl border border-white/40 dark:border-white/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-2xl space-y-6 relative overflow-hidden"
                >
                  {/* Inner Glass Highlights */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none rounded-3xl dark:from-white/5" />

                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-4">
                    <div>
                      <div className="text-xs font-mono font-bold text-[#E01E37] uppercase tracking-wider">INSTANT ELIGIBILITY CHECKER</div>
                      <div className="font-display font-bold text-base text-slate-900 dark:text-white mt-0.5">Select Your Sponsorship Goal</div>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  </div>

                  <div className="space-y-3">
                    {[
                      { icon: Heart, label: 'Sponsor Wife / Husband', sub: 'Min Salary AED 4,000 + EJARI', tab: 'spouse', special: false },
                      { icon: Baby, label: 'Sponsor Children', sub: 'Sons up to 25, Unmarried daughters', tab: 'spouse', special: false },
                      { icon: Users, label: 'Sponsor Both Parents', sub: '1-Yr Senior Residence Visa', tab: 'parents', special: false },
                      { icon: Crown, label: '10-Year Golden Visa', sub: 'Real Estate or High Earner', tab: 'golden', special: true },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.button
                          key={i}
                          whileHover={{ x: 4, scale: 1.01 }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          onClick={() => onOpenCalculator(item.tab)}
                          className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer group ${item.special
                              ? 'bg-amber-500/10 border-amber-500/30 hover:border-amber-500'
                              : 'bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 hover:border-[#E01E37]'
                            }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2.5 rounded-xl ${item.special ? 'bg-amber-500/20 text-amber-500' : 'bg-white dark:bg-white/10 text-[#E01E37]'}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className={`text-xs font-bold ${item.special ? 'text-amber-400' : 'text-slate-900 dark:text-white'}`}>{item.label}</div>
                              <div className={`text-[11px] ${item.special ? 'text-amber-300/80' : 'text-slate-500 dark:text-slate-400'}`}>{item.sub}</div>
                            </div>
                          </div>
                          <ChevronRight className={`w-4 h-4 group-hover:translate-x-1.5 transition-transform ${item.special ? 'text-amber-400' : 'text-slate-400'}`} />
                        </motion.button>
                      );
                    })}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => onOpenCalculator('spouse')}
                    className="w-full bg-[#E01E37] text-white py-4 rounded-xl font-bold text-sm transition-all shadow-xl shadow-[#E01E37]/25 cursor-pointer flex items-center justify-center gap-2 relative overflow-hidden group hover:shadow-[#E01E37]/40"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                    <span className="relative z-10">Launch Tariff Calculator</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </section>
        );

      case 'stats':
        return (
          <RevealSection key="stats" className="px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
            <div ref={statsRef} className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-700/50 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#E01E37]/8 rounded-full blur-[100px] pointer-events-none" />

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-700/50 text-center relative z-10">
                {statsMetrics.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: i * 0.1, duration: 0.5, type: 'spring' }}
                    className={`space-y-1 ${i > 0 ? 'pt-6 sm:pt-0' : ''}`}
                  >
                    <div className={`font-display font-extrabold text-3xl sm:text-4xl ${m.color}`}>{m.val}</div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-300">{m.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </RevealSection>
        );

      case 'achievements':
        return (
          <RevealSection key="achievements" className="w-full relative z-10 my-16 py-16 px-4 sm:px-6 bg-gradient-to-r from-slate-950 via-[#0a0a0a] to-slate-950 shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)] border-y border-white/5">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none" />
            <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-5 gap-8 md:gap-4 text-center items-center relative z-10">

              {/* Item 1 */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-red-700/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-70 group-hover:opacity-100"></div>
                  <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-white relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]" strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">No #1</div>
                  <div className="text-[#E01E37] text-xs sm:text-sm font-bold uppercase tracking-wider">Top Agency</div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-red-700/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-70 group-hover:opacity-100"></div>
                  <Star className="w-10 h-10 sm:w-12 sm:h-12 text-white fill-white/20 relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]" strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">4.9*</div>
                  <div className="text-[#E01E37] text-xs sm:text-sm font-bold uppercase tracking-wider">Google Rating</div>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-red-700/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-70 group-hover:opacity-100"></div>
                  <ThumbsUp className="w-10 h-10 sm:w-12 sm:h-12 text-white relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]" strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">100%</div>
                  <div className="text-[#E01E37] text-xs sm:text-sm font-bold uppercase tracking-wider">Client Satisfaction</div>
                </div>
              </div>

              {/* Item 4 */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-red-700/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-70 group-hover:opacity-100"></div>
                  <Users className="w-10 h-10 sm:w-12 sm:h-12 text-white relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]" strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">15+</div>
                  <div className="text-[#E01E37] text-xs sm:text-sm font-bold uppercase tracking-wider">Expert PROs</div>
                </div>
              </div>

              {/* Item 5 */}
              <div className="flex flex-col items-center space-y-4 col-span-2 lg:col-span-1">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-red-700/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-70 group-hover:opacity-100"></div>
                  <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-white relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]" strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">5500+</div>
                  <div className="text-[#E01E37] text-xs sm:text-sm font-bold uppercase tracking-wider">Visas Issued</div>
                </div>
              </div>

            </div>
          </RevealSection>
        );

      case 'problems':
        return (
          <RevealSection key="problems" className="px-4 sm:px-6 max-w-7xl mx-auto relative z-10 space-y-10">
            <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-700/50 space-y-10 relative overflow-hidden">
              {/* Subtle grid pattern overlay */}
              <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
              {/* Decorative glow */}
              <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-[#E01E37]/8 rounded-full blur-[120px] pointer-events-none" />

              <div className="text-center max-w-2xl mx-auto space-y-2 relative z-10">
                <div className="text-[#E01E37] font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#E01E37]" />
                  <span>THE 800 DOCS ADVANTAGE</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">{cmsConfig?.problems?.title || "The Problems We Solve"}</h2>
                <p className="text-slate-300 text-sm">{cmsConfig?.problems?.subtext || "Avoid bureaucracy, surprise fees, and endless waiting queues at service centers."}</p>
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
                    className="p-6 rounded-2xl bg-slate-950/80 border border-slate-700/50 space-y-4 backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs leading-relaxed">
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-rose-400 block mb-0.5">THE OLD WAY / PROBLEM:</span>
                        {item.problem}
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-emerald-400 block mb-0.5">HOW WE SOLVE IT:</span>
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
                <div className="text-[#E01E37] font-mono text-xs font-bold uppercase tracking-widest">END-TO-END SERVICES</div>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Everything We Handle</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">One dedicated advisory team for residency visas, identity cards, medical checkups, and document attestation.</p>
              </div>

              <div className="flex flex-wrap gap-2 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
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
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${serviceCategory === cat.key ? 'bg-[#E01E37] text-white shadow-md shadow-[#E01E37]/20' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
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
                      className="card-premium p-7 rounded-3xl border flex flex-col justify-between bg-white dark:bg-[#141414] border-slate-200 dark:border-white/10 group shadow-sm hover:shadow-xl hover:shadow-[#E01E37]/5 transition-all duration-300 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-[#E01E37]/0 to-[#E01E37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      <div className="space-y-4 relative z-10">
                        <div className="flex items-center justify-between">
                          <div className="p-3 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-white/10 dark:to-white/5 border border-slate-200 dark:border-white/10 text-[#E01E37] group-hover:bg-[#E01E37] group-hover:border-[#E01E37] group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:shadow-[#E01E37]/30">
                            <Icon className="w-6 h-6 transition-colors duration-300" />
                          </div>
                          <span className="text-[10px] font-mono font-bold text-[#E01E37] bg-[#E01E37]/10 border border-[#E01E37]/20 px-2.5 py-1 rounded-full uppercase transition-colors group-hover:bg-[#E01E37]/20">
                            {srv.tag || srv.category || 'Visa'}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#E01E37] transition-colors">{srv.title}</h3>
                          <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mt-2">{srv.desc || srv.shortDesc}</p>
                        </div>
                      </div>

                      <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between relative z-10">
                        <button
                          onClick={() => onNavigate('service', srv.linkId || srv.id)}
                          className="text-xs font-bold text-[#E01E37] group-hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <span>View Details</span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button
                          onClick={() => onOpenCalculator('spouse')}
                          className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-[#E01E37] dark:hover:text-[#E01E37] cursor-pointer transition-colors bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-lg group-hover:bg-[#E01E37]/10 group-hover:text-[#E01E37]"
                        >
                          Calculate ΓåÆ
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </RevealSection>
        );

      case 'packages':
        return (
          <RevealSection key="packages" className="px-4 sm:px-6 max-w-7xl mx-auto relative z-10 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="text-[#E01E37] font-mono text-xs font-bold uppercase tracking-widest">TRANSPARENT ADVISORY PRICING</div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Clear Service Retainer Packages</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">Fixed retainer fees. All statutory government charges (GDRFA, ICP, Medical) are billed separately at exact cost with official receipts.</p>
            </div>

            <motion.div
              variants={cardGridVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="grid md:grid-cols-3 gap-8"
            >
              {packages.map((pkg, idx) => (
                <motion.div
                  key={idx}
                  variants={cardItemVariants}
                  whileHover={{ y: -10 }}
                  className={`p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${pkg.popular
                      ? 'bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white border-[#E01E37] shadow-2xl shadow-[#E01E37]/15 ring-2 ring-[#E01E37] animate-border-glow'
                      : 'card-premium bg-white dark:bg-[#141414] text-slate-900 dark:text-white border-slate-200 dark:border-white/10'
                    }`}
                >
                  {/* Decorative gradient for popular */}
                  {pkg.popular && (
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#E01E37]/10 rounded-full blur-[80px] pointer-events-none" />
                  )}

                  {/* Removed absolute MOST POPULAR badge per user request */}

                  <div className="space-y-6 relative z-10">
                    <div>
                      <div className="text-xs font-mono font-bold text-[#E01E37] uppercase">{pkg.type || (pkg.popular ? 'Most Popular' : 'Advisory Package')}</div>
                      <h3 className="font-display text-2xl font-extrabold mt-1">{pkg.name}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{pkg.tagline || pkg.subtext || ''}</p>
                    </div>

                    <div className={`p-4 rounded-2xl border flex items-baseline gap-2 ${pkg.popular
                        ? 'bg-white/10 border-white/20'
                        : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10'
                      }`}>
                      <span className="font-display text-3xl font-extrabold text-[#E01E37] drop-shadow-sm">{pkg.fee || pkg.price}</span>
                      <span className={`text-xs font-semibold ${pkg.popular ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>/ applicant</span>
                    </div>

                    <ul className="space-y-3 text-xs font-semibold">
                      {(pkg.features || []).map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2.5">
                          <div className="p-0.5 rounded-full bg-[#E01E37]/10">
                            <Check className="w-3.5 h-3.5 text-[#E01E37]" />
                          </div>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8 relative z-10">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => onOpenCalculator(pkg.calcTab || 'spouse')}
                      className={`w-full py-3.5 rounded-2xl font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 relative overflow-hidden group ${pkg.popular
                          ? 'bg-gradient-to-r from-[#E01E37] to-[#B81A2C] hover:from-[#C8102E] hover:to-[#8B0A1E] text-white shadow-lg shadow-[#E01E37]/30'
                          : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-[#E01E37] dark:hover:bg-[#E01E37] dark:hover:text-white'
                        }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                      <span className="relative z-10">{pkg.buttonText || 'Get Started'}</span>
                      <ArrowRight className="w-4 h-4 relative z-10" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </RevealSection>
        );

      case 'whyUs':
        return (
          <RevealSection key="whyUs" className="px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
            <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-700/50 space-y-10 relative overflow-hidden">
              <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-[#E01E37]/5 rounded-full blur-[120px] pointer-events-none" />

              <div className="text-center max-w-2xl mx-auto space-y-2 relative z-10">
                <div className="text-[#E01E37] font-mono text-xs font-bold uppercase tracking-widest">OFFICIAL LICENSE 800 DOCS LLC SOC</div>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">Why Families Choose Us</h2>
                <p className="text-slate-300 text-sm">We eliminate administrative delays and guarantee full transparency on every government fee.</p>
              </div>

              {(() => {
                const whyUsItems = cmsConfig?.whyUs?.items || [
                  { icon: ShieldCheck, color: 'from-[#E01E37]/15 to-[#E01E37]/5', iconColor: 'text-[#E01E37]', title: 'Direct GDRFA & ICP Portal', desc: 'Direct government integration ensures your family file is submitted directly into immigration servers without third-party delay.' },
                  { icon: Calculator, color: 'from-amber-500/15 to-amber-500/5', iconColor: 'text-amber-500', title: 'Zero Hidden Charges', desc: 'Itemized breakdown before payment starts. You receive official government receipts for all ICP, GDRFA, and Emirates ID fees.' },
                  { icon: WhatsAppIcon, color: 'from-emerald-500/15 to-emerald-500/5', iconColor: 'text-emerald-500', title: 'Dedicated WhatsApp PRO', desc: 'Enjoy 1-on-1 direct communication with your assigned PRO specialist. Instant updates every step of the way.' },
                  { icon: Sparkles, color: 'from-sky-500/15 to-sky-500/5', iconColor: 'text-sky-500', title: '24-48 Hr Fast Track', desc: 'Need your visa urgently? Our VIP fast-track option gets entry permits and medical checkup approvals cleared in 24 to 48 hours.' },
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
                      // Dynamic fallback colors if missing from CMS
                      const colorThemes = [
                        { bg: 'from-[#E01E37]/20 to-[#E01E37]/5', text: 'text-[#E01E37]', border: 'border-[#E01E37]/30' },
                        { bg: 'from-blue-500/20 to-indigo-500/5', text: 'text-blue-400', border: 'border-blue-500/30' },
                        { bg: 'from-amber-500/20 to-orange-500/5', text: 'text-amber-400', border: 'border-amber-500/30' },
                        { bg: 'from-emerald-500/20 to-teal-500/5', text: 'text-emerald-400', border: 'border-emerald-500/30' },
                        { bg: 'from-purple-500/20 to-fuchsia-500/5', text: 'text-purple-400', border: 'border-purple-500/30' },
                      ];
                      const theme = colorThemes[idx % colorThemes.length];

                      return (
                        <motion.div
                          key={idx}
                          variants={cardItemVariants}
                          whileHover={{ y: -8, scale: 1.02 }}
                          className="p-8 rounded-3xl bg-slate-800/40 border border-slate-700/50 hover:border-slate-500/50 space-y-6 backdrop-blur-xl transition-all group relative overflow-hidden"
                        >
                          {/* Ambient glow effect on hover */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${theme.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                          <div className="relative z-10">
                            <div className={`p-4 rounded-2xl bg-slate-900/80 border ${theme.border} w-fit shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                              <Icon className={`w-8 h-8 ${theme.text}`} strokeWidth={1.5} />
                            </div>
                            <h3 className="font-display font-extrabold text-xl text-white mt-6 mb-3 tracking-tight">{item.title}</h3>
                            <p className="text-sm text-slate-300 leading-relaxed font-medium">{item.desc}</p>
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
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white border border-slate-700/50 space-y-10 relative overflow-hidden">
              <div className="absolute inset-0 dot-pattern opacity-15 pointer-events-none" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div>
                  <div className="text-xs font-mono text-[#E01E37] font-semibold uppercase tracking-wider mb-1">STEP-BY-STEP SLA WORKFLOW</div>
                  <h2 className="font-display text-3xl font-extrabold tracking-tight">{activeGuide.title}</h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">{activeGuide.subtitle}</p>
                </div>

                <div className="flex items-center bg-slate-950 p-1.5 rounded-2xl border border-slate-800 shrink-0">
                  {['newVisa', 'renewal'].map(tab => (
                    <motion.button
                      key={tab}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setGuideTab(tab)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${guideTab === tab ? 'bg-[#E01E37] text-white shadow-md shadow-[#E01E37]/30' : 'text-slate-400 hover:text-white'
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
                className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10"
              >
                {activeGuide.steps.map((st, i) => (
                  <motion.div
                    key={st.num}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    whileHover={{ y: -6 }}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover:bg-white/10 transition-all backdrop-blur-sm"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#E01E37] to-[#B81A2C] text-white font-mono font-bold text-xs flex items-center justify-center shadow-md shadow-[#E01E37]/30">
                      {st.num}
                    </div>
                    <h3 className="font-display font-bold text-sm text-white">{st.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{st.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </RevealSection>
        );

      case 'faqs':
        return (
          <RevealSection key="faqs" className="px-4 sm:px-6 max-w-4xl mx-auto relative z-10 space-y-8">
            <div className="text-center space-y-2">
              <div className="text-[#E01E37] font-mono text-xs font-bold uppercase tracking-widest">GOT QUESTIONS?</div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Frequently Asked Questions</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Everything you need to know about sponsoring family in Dubai & UAE.</p>
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
                    className={`rounded-2xl border transition-all overflow-hidden shadow-sm ${isOpen
                        ? 'bg-white dark:bg-[#141414] border-[#E01E37]/30 shadow-md shadow-[#E01E37]/5'
                        : 'bg-white dark:bg-[#141414] border-slate-200 dark:border-white/10 hover:border-[#E01E37]/20'
                      }`}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 dark:text-white cursor-pointer hover:text-[#E01E37] transition-colors"
                    >
                      <span>{faq.question}</span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <ChevronDown className={`w-5 h-5 shrink-0 ${isOpen ? 'text-[#E01E37]' : 'text-slate-400'}`} />
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
                          <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/5 pt-3">
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
              <div className="text-[#E01E37] font-mono text-xs tracking-widest uppercase font-bold">VERIFIED CLIENT FEEDBACK</div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">4.9Γÿà Rated on Google (500+ Client Reviews)</h2>
            </div>

            {/* Infinite Marquee with CSS animation ΓÇö seamless loop */}
            <div className="marquee-container">
              <div className="marquee-track">
                {/* First copy */}
                {infiniteReviews.map((rev, idx) => (
                  <div key={`a-${idx}`} className="w-[340px] sm:w-[380px] min-h-[200px] p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 flex flex-col shadow-sm shrink-0 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 whitespace-normal">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[9px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 uppercase tracking-widest">
                        Verified Client
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed flex-1 overflow-hidden break-words">{rev.comment}</p>
                    <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-slate-900 dark:text-white">{rev.name}</span>
                      <span className="text-slate-400">{rev.role}</span>
                    </div>
                  </div>
                ))}
                {/* Second copy for seamless loop */}
                {infiniteReviews.map((rev, idx) => (
                  <div key={`b-${idx}`} className="w-[340px] sm:w-[380px] min-h-[200px] p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 flex flex-col shadow-sm shrink-0 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 whitespace-normal">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[9px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 uppercase tracking-widest">
                        Verified Client
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed flex-1 overflow-hidden break-words">{rev.comment}</p>
                    <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-slate-900 dark:text-white">{rev.name}</span>
                      <span className="text-slate-400">{rev.role}</span>
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
                <div className="text-[#E01E37] font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#E01E37]" />
                  <span>OFFICIAL IMMIGRATION INSIGHTS</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Latest UAE Residency & Visa Guides</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">Expert advice on GDRFA salary rules, Golden Visa benefits, Ejari requirements, and newborn clearance.</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, x: 3 }}
                onClick={() => onNavigate('blog-index')}
                className="text-xs font-bold text-[#E01E37] hover:underline cursor-pointer flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
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
                  className="card-premium p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 flex flex-col justify-between cursor-pointer group space-y-5"
                >
                  <div className="space-y-4">
                    <div className="relative h-48 rounded-2xl overflow-hidden">
                      <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-3 left-3 bg-[#121417]/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono font-bold text-white border border-white/10 uppercase">
                        {post.category}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#E01E37]" />
                          {post.date}
                        </span>
                        <span>ΓÇó</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#E01E37] transition-colors leading-snug">{post.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed line-clamp-2">{post.excerpt}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{post.author}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#E01E37] group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </RevealSection>
        );

      case 'cta':
        return (
          <RevealSection key="cta" className="px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
            <div className="bg-gradient-to-r from-[#E01E37] via-[#C8102E] to-[#B81A2C] rounded-3xl p-8 sm:p-14 text-white text-center shadow-2xl space-y-6 relative overflow-hidden animate-gradient-shift" style={{ backgroundSize: '200% 200%' }}>
              {/* Animated decorative elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none animate-float-slow" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none animate-float" />
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
                className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 pt-2"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onOpenCalculator('spouse')}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-[#E01E37] hover:bg-slate-100 font-bold text-base rounded-2xl shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#E01E37]/0 via-[#E01E37]/10 to-[#E01E37]/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                  <Calculator className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Calculate Visa Cost</span>
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  href={`https://wa.me/${cmsConfig?.global?.whatsappRaw || siteConfig.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-slate-950 hover:bg-slate-900 text-white font-bold text-base rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <WhatsAppIcon className="w-5 h-5 text-emerald-400" />
                  <span>Chat on WhatsApp</span>
                </motion.a>
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
        className="absolute top-10 left-1/4 w-[550px] h-[550px] bg-[#E01E37]/8 rounded-full blur-[140px] pointer-events-none z-0"
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
        return (
          <React.Fragment key={sectionId}>
            {renderSection(sectionId)}
            {/* Subtle section divider between sections (not after last) */}
            {index < sectionOrder.length - 1 && sectionVisibility[sectionOrder[index + 1]] !== false && (
              <div className="section-divider" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
