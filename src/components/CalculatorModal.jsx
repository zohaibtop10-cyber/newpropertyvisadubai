import React, { useState, useEffect } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Check,
  Building2,
  Users,
  Briefcase,
  Globe,
  MapPin,
  Plane,
  ShieldCheck,
  Receipt,
  Info,
  BadgeCheck,
  UserPlus,
  Heart,
  Baby,
  Clock,
  Crown,
  Sparkles,
  Copy,
  CheckCheck,
  PhoneCall,
  Zap,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Scale,
  FileCheck2,
  Shield,
  FileText
} from 'lucide-react';
import { siteConfig } from '../data/cmsData';

export default function CalculatorModal({ isOpen, onClose, initialTab = 'golden', cmsConfig }) {
  // Normalize initial tab
  const getInitialCategory = (tab) => {
    if (tab === 'golden' || tab === 'property-golden') return 'golden';
    if (tab === 'property') return 'property';
    if (tab === 'corporate') return 'corporate';
    if (tab === 'maid') return 'maid';
    if (tab === 'parents') return 'parents';
    if (tab === 'child') return 'child';
    return 'spouse';
  };

  // 4-Step Wizard Flow:
  // Step 1: Visa Category
  // Step 2: Applicant Status & Dependents
  // Step 3: Speed & Add-ons
  // Step 4: Itemized Invoice & WhatsApp Quote
  const [currentStep, setCurrentStep] = useState(1);
  const [activeCategory, setActiveCategory] = useState(() => getInitialCategory(initialTab));
  const [locationStatus, setLocationStatus] = useState('inside'); // 'inside' | 'outside'
  const [dependentsCount, setDependentsCount] = useState(0);
  const [vipFastTrack, setVipFastTrack] = useState(false);
  const [mofaAttestation, setMofaAttestation] = useState(false);
  const [doorstepCourier, setDoorstepCourier] = useState(true);
  const [copied, setCopied] = useState(false);

  // Sync category when initialTab changes or modal opens
  useEffect(() => {
    if (isOpen) {
      const cat = getInitialCategory(initialTab);
      setActiveCategory(cat);
      setCurrentStep(1);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  // 6 Primary Residency Categories matching UAE Government Framework
  const categoriesList = [
    {
      id: 'golden',
      label: '10-Yr Golden Visa',
      subtitle: 'Property equity AED 2M+ or executive salary AED 30k+',
      icon: Crown,
      badge: '10-Year Self-Sponsored',
      startingPrice: 'AED 3,864',
      validity: '10 Years',
      sla: '48H VIP Turnaround',
      govtItems: [
        { label: 'DLD Property Valuation & Land Dept Audit', cost: 4020, authority: 'Dubai Land Dept' },
        { label: 'GDRFA Golden Visa Entry Permit & Nomination', cost: 2680, authority: 'GDRFA Immigration' },
        { label: 'VIP Express Medical Fitness (Blood & X-Ray)', cost: 1200, authority: 'DHA Smart Salem' },
        { label: 'Federal Emirates ID Card (10-Year Validity)', cost: 1521, authority: 'ICP Federal' }
      ],
      conciergeFee: 2450
    },
    {
      id: 'spouse',
      label: 'Spouse Residence Visa',
      subtitle: 'Husband or wife sponsorship with full legal file opening',
      icon: Heart,
      badge: 'Family Sponsorship',
      startingPrice: 'AED 1,103',
      validity: '2 Years Renewable',
      sla: '24–48 Hours',
      govtItems: [
        { label: 'GDRFA / ICP Spouse Entry Permit', cost: 1150, authority: 'GDRFA Dubai' },
        { label: 'Medical Fitness Screening (Blood & X-Ray)', cost: 320, authority: 'DHA Healthcare' },
        { label: 'Federal Emirates ID Card (2-Year Validity)', cost: 390, authority: 'ICP Federal' },
        { label: 'Residence Visa Stamping & Ministry File Opening', cost: 1990, authority: 'GDRFA Dubai' }
      ],
      conciergeFee: 1450
    },
    {
      id: 'child',
      label: 'Child Dependent Visa',
      subtitle: 'Sons up to 25 yrs & unmarried daughters of any age',
      icon: Baby,
      badge: 'Dependent File',
      startingPrice: 'AED 1,029',
      validity: '2 Years Renewable',
      sla: '24–48 Hours',
      govtItems: [
        { label: 'ICP / GDRFA Child Entry Permit', cost: 1100, authority: 'GDRFA Dubai' },
        { label: 'Child Emirates ID Card (2-Year Validity)', cost: 380, authority: 'ICP Federal' },
        { label: 'Residence Stamping & File Linking', cost: 1970, authority: 'GDRFA Dubai' }
      ],
      conciergeFee: 1250
    },
    {
      id: 'property',
      label: 'Property Investor Visa',
      subtitle: '2-Year or 5-Year residency for Dubai properties AED 750k+',
      icon: Building2,
      badge: 'DLD Trustee Channel',
      startingPrice: 'AED 6,311',
      validity: '2–5 Years',
      sla: '2–3 Days',
      govtItems: [
        { label: 'DLD Title Deed Valuation & Clearance', cost: 3100, authority: 'Dubai Land Dept' },
        { label: 'GDRFA Entry Permit & Investor Approval', cost: 2150, authority: 'GDRFA Dubai' },
        { label: 'VIP Medical Fitness & 2-Yr Emirates ID', cost: 1600, authority: 'DHA & ICP' }
      ],
      conciergeFee: 1850
    },
    {
      id: 'parents',
      label: 'Parents Residence Visa',
      subtitle: 'Humanitarian sponsorship for mother & father (1-Year)',
      icon: Users,
      badge: 'Humanitarian File',
      startingPrice: 'AED 1,750',
      validity: '1 Year Renewable',
      sla: '3–5 Days',
      govtItems: [
        { label: 'ICP / GDRFA Humanitarian Entry Approval', cost: 1250, authority: 'GDRFA Dubai' },
        { label: 'DHA Senior Medical Fitness Screening', cost: 450, authority: 'DHA Healthcare' },
        { label: 'Emirates ID Card (1-Year Validity)', cost: 290, authority: 'ICP Federal' },
        { label: 'GDRFA Humanitarian Refundable Deposit', cost: 2500, authority: 'Official Deposit' },
        { label: 'Residence Visa Stamping & File Opening', cost: 1980, authority: 'GDRFA Dubai' }
      ],
      conciergeFee: 1750
    },
    {
      id: 'maid',
      label: 'Maid & Tadbeer Domestic',
      subtitle: 'Domestic helper, nanny, cook or driver with MOHRE contract',
      icon: ShieldCheck,
      badge: 'Tadbeer Direct',
      startingPrice: 'AED 1,650',
      validity: '2-Year Domestic',
      sla: '3–5 Days',
      govtItems: [
        { label: 'MOHRE Entry Permit & Domestic Labor Contract', cost: 2100, authority: 'MOHRE Labor' },
        { label: 'VIP Medical Screening & Emirates ID', cost: 1200, authority: 'DHA & ICP' },
        { label: 'GDRFA Refundable Deposit & Labor File', cost: 1900, authority: 'Official Deposit' },
        { label: '2-Year Domestic Worker Visa Stamping', cost: 1200, authority: 'GDRFA Dubai' }
      ],
      conciergeFee: 1650
    }
  ];

  const currentCatObj = categoriesList.find(c => c.id === activeCategory) || categoriesList[0];

  // Dynamic Calculation Function
  const calculateTotal = () => {
    let govtList = [...currentCatObj.govtItems];
    let conciergeBase = currentCatObj.conciergeFee;

    // Inside UAE In-Country Status Change Fee (if applicant is already inside UAE on visit/tourist/cancelled visa)
    if (locationStatus === 'inside') {
      govtList.push({
        label: 'GDRFA In-Country Visa Status Change (Zero Airport Exit)',
        cost: 1180.00,
        authority: 'GDRFA Immigration',
        note: 'Bypasses flights & border exit runs'
      });
    }

    // Additional Dependents
    if (dependentsCount > 0) {
      const depUnitGovtCost = activeCategory === 'golden' ? 2450 : 1850;
      govtList.push({
        label: `Additional Dependents (${dependentsCount} ${dependentsCount === 1 ? 'person' : 'people'}) — Entry & EID`,
        cost: depUnitGovtCost * dependentsCount,
        authority: 'GDRFA & ICP',
        note: `Full file opening for ${dependentsCount} dependent${dependentsCount > 1 ? 's' : ''}`
      });
      conciergeBase += 650 * dependentsCount;
    }

    // VIP 30-Minute Fast-Track Addon
    if (vipFastTrack) {
      govtList.push({
        label: 'VIP Smart Salem AI Lounge Medical & Priority Biometrics',
        cost: 750.00,
        authority: 'Smart Salem & ICP',
        note: 'Same-day blood results & priority queue'
      });
    }

    // MOFA Attestation & Sworn Legal Translation Addon
    if (mofaAttestation) {
      govtList.push({
        label: 'MOFA Legal Attestation & Sworn Arabic Translation',
        cost: 450.00,
        authority: 'MOFA & MOJ',
        note: 'Ministry apostille & court sworn stamps'
      });
    }

    const totalGovt = govtList.reduce((acc, curr) => acc + curr.cost, 0);
    const grandTotal = totalGovt + conciergeBase;

    return {
      govtList,
      conciergeFee: conciergeBase,
      totalGovt,
      grandTotal
    };
  };

  const { govtList, conciergeFee, totalGovt, grandTotal } = calculateTotal();

  // WhatsApp Concierge Handoff
  const handleWhatsApp = () => {
    const rawPhone = cmsConfig?.global?.whatsappRaw || siteConfig?.whatsappRaw || '971586600396';
    const text = `Hello 800 DOCS LLC! 👋\n\nI just calculated my official visa fees on your Live Tariff Calculator:\n\n• *Residency Category:* ${currentCatObj.label}\n• *Applicant Location:* ${locationStatus === 'inside' ? 'Inside UAE (Status Change)' : 'Outside UAE (Direct eVisa Entry)'}\n• *Dependents:* ${dependentsCount > 0 ? `${dependentsCount} Additional` : 'None'}\n• *VIP Fast-Track (24H):* ${vipFastTrack ? 'Yes (+AED 750)' : 'Standard'}\n• *MOFA Attestation:* ${mofaAttestation ? 'Yes (+AED 450)' : 'No'}\n\n📊 *Statutory Government Tariffs:* AED ${totalGovt.toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n💼 *Licensed Concierge PRO Fee:* AED ${conciergeFee.toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n🏆 *Estimated Grand Total:* AED ${grandTotal.toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n\nPlease audit my documents and confirm the earliest filing appointment.`;

    window.open(`https://wa.me/${rawPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopyQuote = () => {
    const summary = `800 DOCS LLC — Official Tariff Quote\nCategory: ${currentCatObj.label}\nApplicant Location: ${locationStatus === 'inside' ? 'Inside UAE' : 'Outside UAE'}\nDependents: ${dependentsCount}\nGovt Tariffs: AED ${totalGovt.toLocaleString('en-AE', { minimumFractionDigits: 2 })}\nConcierge PRO: AED ${conciergeFee.toLocaleString('en-AE', { minimumFractionDigits: 2 })}\nGrand Total: AED ${grandTotal.toLocaleString('en-AE', { minimumFractionDigits: 2 })}\n100% Direct Ministry Tariffs • Zero Hidden Markups Guarantee`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const wizardSteps = [
    { num: 1, label: '1. Category' },
    { num: 2, label: '2. Location & Dependents' },
    { num: 3, label: '3. Speed & Add-ons' },
    { num: 4, label: '4. Itemized Invoice' }
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
        style={{ fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif' }}
      >
        {/* Backdrop click to close */}
        <div className="fixed inset-0" onClick={onClose} />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ type: 'spring', stiffness: 240, damping: 25 }}
          className="w-full max-w-[980px] bg-[#FAF8F5] dark:bg-[#0D0B08] border border-[#DECFA8] dark:border-[#EFC45C]/35 rounded-[16px] shadow-[0_25px_80px_rgba(40,30,10,0.25),0_0_50px_rgba(239,196,92,0.18)] overflow-hidden flex flex-col max-h-[94vh] text-slate-900 dark:text-[#F3ECD9] my-auto relative z-10 transition-colors duration-300"
        >
          {/* Top Radiant Gold Shimmer Accent Line */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#DBB24B] via-[#EFC45C] to-[#F7DE9C] shrink-0" />

          {/* Modal Header */}
          <div className="px-5 sm:px-7 py-4 border-b border-[#E8DFC8] dark:border-white/10 bg-[#FAF6ED] dark:bg-[#14120D] shrink-0 flex items-center justify-between transition-colors duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[10px] bg-[#F6EED9] dark:bg-[#262116] border border-[#EFC45C]/40 flex items-center justify-center text-[#8A6412] dark:text-[#EFC45C] shadow-sm shrink-0">
                <Receipt className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-black text-lg sm:text-xl tracking-tight text-slate-950 dark:text-white leading-none">
                    800 DOCS<span className="text-[#EFC45C]"> LLC</span>
                  </h2>
                  <span className="bg-[#F6EED9] dark:bg-[#262116] text-[#8A6412] dark:text-[#EFC45C] border border-[#EFC45C]/40 text-[9px] uppercase font-bold px-2 py-0.5 rounded-[8px] flex items-center gap-1 shadow-xs font-mono">
                    <Sparkles className="w-3 h-3 text-[#EFC45C]" />
                    <span>Official Tariff Calculator</span>
                  </span>
                </div>
                <p className="text-slate-600 dark:text-[#A99D84] text-xs mt-1 font-medium hidden sm:block">
                  Direct GDRFA, ICP, DHA & DLD Government Tariff Schedule • 100% Transparent Itemization
                </p>
              </div>
            </div>

            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={onClose}
              aria-label="Close Calculator"
              className="w-9 h-9 rounded-[10px] bg-white dark:bg-white/5 border border-[#DECFA8] dark:border-white/15 hover:border-[#EFC45C] hover:bg-[#F6EED9] dark:hover:bg-[#262116] text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Stepper Progress Tabs */}
          <div className="px-4 sm:px-7 py-3 bg-[#F4EEDF] dark:bg-[#120F0A] border-b border-[#E8DFC8] dark:border-white/10 shrink-0">
            <div className="grid grid-cols-4 gap-2">
              {wizardSteps.map((s) => {
                const isActive = currentStep === s.num;
                const isPassed = currentStep > s.num;
                return (
                  <button
                    key={s.num}
                    onClick={() => setCurrentStep(s.num)}
                    className={`py-2 px-2 sm:px-3 rounded-[8px] border text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer text-xs font-bold ${
                      isActive
                        ? 'bg-[#EFC45C] text-[#0B0A08] border-[#DBB24B] shadow-sm font-black'
                        : isPassed
                        ? 'bg-[#F6EED9] dark:bg-[#1E1A12] text-[#8A6412] dark:text-[#EFC45C] border-[#EFC45C]/40'
                        : 'bg-white/60 dark:bg-white/5 text-slate-500 dark:text-slate-400 border-transparent hover:border-[#EFC45C]/30'
                    }`}
                  >
                    {isPassed ? (
                      <Check className="w-3.5 h-3.5 stroke-[3] text-emerald-600 dark:text-emerald-400 shrink-0" />
                    ) : (
                      <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-[#0B0A08] text-[#EFC45C]' : 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300'
                      }`}>
                        {s.num}
                      </span>
                    )}
                    <span className="truncate hidden sm:inline">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Wizard Step Body */}
          <div className="p-4 sm:p-7 overflow-y-auto flex-1 space-y-6">

            {/* ══════════════════════════════════════════════════════════════
                STEP 1: CHOOSE RESIDENCY CATEGORY
                ══════════════════════════════════════════════════════════════ */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-950 dark:text-white">
                      Step 1: Select Your Visa Category
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-[#A99D84] mt-0.5">
                      Choose the primary residency or sponsorship pathway you require in Dubai:
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#8A6412] dark:text-[#EFC45C] bg-[#F6EED9] dark:bg-[#262116] border border-[#EFC45C]/40 px-2.5 py-1 rounded-[8px]">
                    1 of 4
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {categoriesList.map((cat) => {
                    const isSelected = activeCategory === cat.id;
                    const IconComp = cat.icon;
                    return (
                      <motion.div
                        key={cat.id}
                        whileHover={{ y: -2, scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`p-4 rounded-[12px] border transition-all cursor-pointer relative flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#FAF6ED] dark:bg-[#1E1A12] border-[#EFC45C] ring-2 ring-[#EFC45C]/40 shadow-[0_8px_24px_rgba(239,196,92,0.25)]'
                            : 'bg-white dark:bg-[#141210] border-[#E8DFC8] dark:border-[#2A241A] hover:border-[#EFC45C]/60 hover:bg-[#FAF8F5] dark:hover:bg-[#181510]'
                        }`}
                      >
                        {/* Top Row: Icon & Badge */}
                        <div className="flex items-start justify-between mb-3">
                          <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-[#EFC45C] text-[#0B0A08]' : 'bg-[#F6EED9] dark:bg-[#262116] text-[#8A6412] dark:text-[#EFC45C] border border-[#EFC45C]/35'
                          }`}>
                            <IconComp className="w-5 h-5 stroke-[2.2]" />
                          </div>
                          <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-[6px] border ${
                            isSelected ? 'bg-[#EFC45C]/20 text-[#8A6412] dark:text-[#F7DE9C] border-[#EFC45C]/60' : 'bg-slate-100 dark:bg-white/5 text-slate-500 border-slate-200 dark:border-white/10'
                          }`}>
                            {cat.badge}
                          </span>
                        </div>

                        {/* Title & Subtitle */}
                        <div className="mb-4">
                          <h4 className={`text-sm sm:text-base font-black ${isSelected ? 'text-slate-950 dark:text-white' : 'text-slate-800 dark:text-slate-200'}`}>
                            {cat.label}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-[#A99D84] mt-1 leading-relaxed">
                            {cat.subtitle}
                          </p>
                        </div>

                        {/* Bottom Row: Starting Tariff & SLA */}
                        <div className="pt-3 border-t border-[#E8DFC8]/60 dark:border-white/10 flex items-center justify-between text-xs">
                          <div>
                            <span className="text-[10px] text-slate-500 block">Starting from</span>
                            <span className="font-mono font-black text-slate-900 dark:text-[#EFC45C]">{cat.startingPrice}</span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{cat.sla}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="pt-4 flex items-center justify-end">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="btn-gold shimmer-sweep px-6 py-3 rounded-[10px] text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-[0_4px_16px_rgba(239,196,92,0.35)] cursor-pointer"
                  >
                    <span>Next: Location & Dependents</span>
                    <ArrowRight className="w-4 h-4 text-[#0B0A08]" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ══════════════════════════════════════════════════════════════
                STEP 2: APPLICANT LOCATION & DEPENDENTS
                ══════════════════════════════════════════════════════════════ */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-950 dark:text-white">
                      Step 2: Location Status & Dependents
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-[#A99D84] mt-0.5">
                      Configure where the applicants are currently staying and how many family members:
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#8A6412] dark:text-[#EFC45C] bg-[#F6EED9] dark:bg-[#262116] border border-[#EFC45C]/40 px-2.5 py-1 rounded-[8px]">
                    2 of 4
                  </span>
                </div>

                {/* Location Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block">
                    Where is the applicant right now?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setLocationStatus('inside')}
                      className={`p-4 rounded-[12px] border text-left transition-all cursor-pointer flex items-start gap-3.5 ${
                        locationStatus === 'inside'
                          ? 'bg-[#FAF6ED] dark:bg-[#1E1A12] border-[#EFC45C] ring-2 ring-[#EFC45C]/40 shadow-sm'
                          : 'bg-white dark:bg-[#141210] border-[#E8DFC8] dark:border-[#2A241A] hover:border-[#EFC45C]/50'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                        locationStatus === 'inside' ? 'border-[#EFC45C] bg-[#EFC45C] text-[#0B0A08]' : 'border-slate-300 dark:border-white/20'
                      }`}>
                        {locationStatus === 'inside' && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="text-sm font-black text-slate-950 dark:text-white flex items-center gap-2">
                          <span>Inside the UAE</span>
                          <span className="text-[10px] font-mono font-bold bg-amber-500/15 text-[#8A6412] dark:text-[#EFC45C] px-1.5 py-0.5 rounded-[4px]">
                            In-Country Change
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-[#A99D84] mt-1 leading-relaxed">
                          Currently on visit visa, tourist visa, or cancelled residency. Includes official GDRFA status change (+AED 1,180) without leaving the UAE.
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setLocationStatus('outside')}
                      className={`p-4 rounded-[12px] border text-left transition-all cursor-pointer flex items-start gap-3.5 ${
                        locationStatus === 'outside'
                          ? 'bg-[#FAF6ED] dark:bg-[#1E1A12] border-[#EFC45C] ring-2 ring-[#EFC45C]/40 shadow-sm'
                          : 'bg-white dark:bg-[#141210] border-[#E8DFC8] dark:border-[#2A241A] hover:border-[#EFC45C]/50'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                        locationStatus === 'outside' ? 'border-[#EFC45C] bg-[#EFC45C] text-[#0B0A08]' : 'border-slate-300 dark:border-white/20'
                      }`}>
                        {locationStatus === 'outside' && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="text-sm font-black text-slate-950 dark:text-white flex items-center gap-2">
                          <span>Outside the UAE</span>
                          <span className="text-[10px] font-mono font-bold bg-blue-500/15 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded-[4px]">
                            eVisa Entry Permit
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-[#A99D84] mt-1 leading-relaxed">
                          Currently in home country. Direct federal eVisa entry permit issued for arrival into UAE airport with 60 days validity.
                        </p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Dependents Counter */}
                <div className="p-4 sm:p-5 rounded-[12px] bg-white dark:bg-[#141210] border border-[#E8DFC8] dark:border-[#2A241A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-black text-slate-950 dark:text-white flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#8A6412] dark:text-[#EFC45C]" />
                      <span>Additional Dependents (Children or Relatives)</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-[#A99D84] mt-1">
                      Are you sponsoring additional family members in the same file application?
                    </p>
                  </div>

                  <div className="flex items-center gap-3 bg-[#FAF8F5] dark:bg-[#1E1A12] border border-[#E8DFC8] dark:border-[#332E24] px-3 py-1.5 rounded-[10px]">
                    <button
                      type="button"
                      onClick={() => setDependentsCount(Math.max(0, dependentsCount - 1))}
                      className="w-8 h-8 rounded-[8px] bg-white dark:bg-white/10 border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:text-black dark:hover:text-white hover:border-[#EFC45C] flex items-center justify-center font-bold text-base cursor-pointer transition-all"
                    >
                      -
                    </button>
                    <span className="font-mono font-black text-base w-8 text-center text-slate-950 dark:text-white">
                      {dependentsCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setDependentsCount(dependentsCount + 1)}
                      className="w-8 h-8 rounded-[8px] bg-[#EFC45C] text-[#0B0A08] font-black text-base flex items-center justify-center hover:bg-[#F7DE9C] cursor-pointer shadow-sm transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Back / Next Nav */}
                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-5 py-3 rounded-[10px] border border-[#DECFA8] dark:border-white/15 hover:border-[#EFC45C] text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Category</span>
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="btn-gold shimmer-sweep px-6 py-3 rounded-[10px] text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-[0_4px_16px_rgba(239,196,92,0.35)] cursor-pointer"
                  >
                    <span>Next: Speed & Add-ons</span>
                    <ArrowRight className="w-4 h-4 text-[#0B0A08]" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ══════════════════════════════════════════════════════════════
                STEP 3: SPEED & CONCIERGE ADD-ONS
                ══════════════════════════════════════════════════════════════ */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-950 dark:text-white">
                      Step 3: Processing Speed & Legal Add-ons
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-[#A99D84] mt-0.5">
                      Select optional express services to eliminate hospital queues or attest overseas documents:
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#8A6412] dark:text-[#EFC45C] bg-[#F6EED9] dark:bg-[#262116] border border-[#EFC45C]/40 px-2.5 py-1 rounded-[8px]">
                    3 of 4
                  </span>
                </div>

                <div className="space-y-3">
                  {/* VIP Fast Track */}
                  <label
                    onClick={() => setVipFastTrack(!vipFastTrack)}
                    className={`p-4 rounded-[12px] border transition-all cursor-pointer flex items-start justify-between gap-4 block ${
                      vipFastTrack
                        ? 'bg-[#FAF6ED] dark:bg-[#1E1A12] border-[#EFC45C] ring-2 ring-[#EFC45C]/35'
                        : 'bg-white dark:bg-[#141210] border-[#E8DFC8] dark:border-[#2A241A] hover:border-[#EFC45C]/50'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`w-5 h-5 rounded-[6px] border mt-0.5 flex items-center justify-center shrink-0 ${
                        vipFastTrack ? 'bg-[#EFC45C] border-[#DBB24B] text-[#0B0A08]' : 'border-slate-300 dark:border-white/20'
                      }`}>
                        {vipFastTrack && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="text-sm font-black text-slate-950 dark:text-white flex items-center gap-2">
                          <Zap className="w-4 h-4 text-[#8A6412] dark:text-[#EFC45C]" />
                          <span>Smart Salem VIP AI Medical Lounge & Priority Biometrics</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-[#A99D84] mt-1 leading-relaxed">
                          30-minute express blood test & X-ray with results in 2 hours. Chauffeur lounge access and expedited fingerprinting slot.
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-black text-[#8A6412] dark:text-[#EFC45C] shrink-0 bg-[#F6EED9] dark:bg-[#262116] border border-[#EFC45C]/35 px-2 py-1 rounded-[6px]">
                      +AED 750
                    </span>
                  </label>

                  {/* MOFA Attestation */}
                  <label
                    onClick={() => setMofaAttestation(!mofaAttestation)}
                    className={`p-4 rounded-[12px] border transition-all cursor-pointer flex items-start justify-between gap-4 block ${
                      mofaAttestation
                        ? 'bg-[#FAF6ED] dark:bg-[#1E1A12] border-[#EFC45C] ring-2 ring-[#EFC45C]/35'
                        : 'bg-white dark:bg-[#141210] border-[#E8DFC8] dark:border-[#2A241A] hover:border-[#EFC45C]/50'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`w-5 h-5 rounded-[6px] border mt-0.5 flex items-center justify-center shrink-0 ${
                        mofaAttestation ? 'bg-[#EFC45C] border-[#DBB24B] text-[#0B0A08]' : 'border-slate-300 dark:border-white/20'
                      }`}>
                        {mofaAttestation && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="text-sm font-black text-slate-950 dark:text-white flex items-center gap-2">
                          <FileCheck2 className="w-4 h-4 text-[#8A6412] dark:text-[#EFC45C]" />
                          <span>MOFA Legal Attestation & Sworn Arabic Translation</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-[#A99D84] mt-1 leading-relaxed">
                          Ministry of Foreign Affairs legalization for foreign marriage/birth certificates, plus Ministry of Justice sworn Arabic translation.
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-black text-[#8A6412] dark:text-[#EFC45C] shrink-0 bg-[#F6EED9] dark:bg-[#262116] border border-[#EFC45C]/35 px-2 py-1 rounded-[6px]">
                      +AED 450
                    </span>
                  </label>

                  {/* Free Courier Included */}
                  <div className="p-4 rounded-[12px] bg-white dark:bg-[#141210] border border-[#E8DFC8] dark:border-[#2A241A] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <div>
                        <span className="text-xs font-black text-slate-950 dark:text-white">
                          Door-to-Door Insured VIP Courier (All 7 Emirates)
                        </span>
                        <span className="text-[11px] text-slate-500 block">
                          Passports and Emirates IDs delivered directly to your doorstep.
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-black text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-[6px]">
                      FREE INCLUDED
                    </span>
                  </div>
                </div>

                {/* Back / Next Nav */}
                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-5 py-3 rounded-[10px] border border-[#DECFA8] dark:border-white/15 hover:border-[#EFC45C] text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Location</span>
                  </button>
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="btn-gold shimmer-sweep px-6 py-3 rounded-[10px] text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-[0_4px_16px_rgba(239,196,92,0.35)] cursor-pointer"
                  >
                    <span>View Itemized Invoice</span>
                    <ArrowRight className="w-4 h-4 text-[#0B0A08]" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ══════════════════════════════════════════════════════════════
                STEP 4: ITEMIZED GOVERNMENT INVOICE & WHATSAPP QUOTE
                ══════════════════════════════════════════════════════════════ */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-950 dark:text-white">
                      Step 4: Official Itemized Government Tariff Schedule
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-[#A99D84] mt-0.5">
                      100% unbundled breakdown backed by official Ministry tax receipts:
                    </p>
                  </div>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-xs font-mono font-bold text-[#8A6412] dark:text-[#EFC45C] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Recalculate</span>
                  </button>
                </div>

                {/* The Ledger Table */}
                <div className="rounded-[16px] border border-[#E8DFC8] dark:border-[#2A241A] bg-white dark:bg-[#141210] overflow-hidden shadow-sm">
                  <div className="p-3.5 bg-[#FAF6ED] dark:bg-[#1A160F] border-b border-[#E8DFC8] dark:border-[#2A241A] flex items-center justify-between text-xs font-bold font-mono text-[#8A6412] dark:text-[#EFC45C]">
                    <span>STATUTORY GOVERNMENT CHARGES (EXACT COST)</span>
                    <span>AUTHORITY</span>
                  </div>

                  <div className="divide-y divide-[#E8DFC8]/60 dark:divide-white/5">
                    {govtList.map((item, idx) => (
                      <div key={idx} className="p-3.5 sm:p-4 flex items-center justify-between text-xs gap-3">
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 dark:text-[#F3ECD9]">
                            {item.label}
                          </div>
                          {item.note && (
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                              {item.note}
                            </div>
                          )}
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-mono font-black text-slate-900 dark:text-white block">
                            AED {item.cost.toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                          <span className="text-[9px] font-mono font-bold text-[#8A6412] dark:text-[#EFC45C] bg-[#F6EED9] dark:bg-[#262116] px-1.5 py-0.5 rounded-[4px] inline-block mt-0.5">
                            {item.authority}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Government Subtotal */}
                  <div className="p-3.5 sm:p-4 bg-slate-50 dark:bg-white/[0.02] border-t border-[#E8DFC8] dark:border-[#2A241A] flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-600 dark:text-slate-300">Total Statutory Government Tariffs:</span>
                    <span className="font-mono font-black text-slate-900 dark:text-white text-sm">
                      AED {totalGovt.toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  {/* Concierge PRO Service Fee */}
                  <div className="p-3.5 sm:p-4 bg-[#FAF6ED]/70 dark:bg-[#1E1A12]/50 border-t border-[#EFC45C]/30 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-[#8A6412] dark:text-[#F7DE9C] block">
                        800 DOCS Senior Concierge & PRO Legal Filing Fee
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-[#A99D84]">
                        End-to-end case officer, pre-flight legal audit, appointment coordination & doorstep delivery.
                      </span>
                    </div>
                    <span className="font-mono font-black text-slate-950 dark:text-white text-sm shrink-0">
                      AED {conciergeFee.toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  {/* Grand Total Bar */}
                  <div className="p-4 sm:p-5 bg-gradient-to-r from-[#FAF6ED] via-[#F6EED9] to-[#FAF6ED] dark:from-[#1A160F] dark:via-[#262116] dark:to-[#1A160F] border-t-2 border-[#EFC45C] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8A6412] dark:text-[#EFC45C] block">
                        Estimated Grand Total (Unbundled)
                      </span>
                      <span className="text-[11px] text-slate-600 dark:text-slate-300">
                        Official Ministry receipts provided for all government disbursements.
                      </span>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-950 dark:text-[#F7DE9C]">
                        AED {grandTotal.toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        100% SLA Guarantee • 0% Hidden Markups
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleWhatsApp}
                    className="w-full py-4 px-6 bg-[#25D366] hover:bg-[#20BD5A] text-white font-black text-sm rounded-[10px] flex items-center justify-center gap-2.5 shadow-[0_4px_20px_rgba(37,211,102,0.35)] cursor-pointer"
                  >
                    <WhatsAppIcon className="w-5 h-5 fill-current" />
                    <span>Chat on WhatsApp Concierge</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCopyQuote}
                    className="w-full py-4 px-6 btn-gold shimmer-sweep text-[#0B0A08] font-black text-sm rounded-[10px] flex items-center justify-center gap-2.5 shadow-[0_4px_20px_rgba(239,196,92,0.35)] cursor-pointer"
                  >
                    {copied ? <CheckCheck className="w-5 h-5 text-[#0B0A08]" /> : <Copy className="w-5 h-5 text-[#0B0A08]" />}
                    <span>{copied ? 'Quote Copied to Clipboard!' : 'Copy Itemized Quote Summary'}</span>
                  </motion.button>
                </div>
              </motion.div>
            )}

          </div>

          {/* Sticky Bottom Ledger Ribbon (Visible on Steps 1, 2, 3) */}
          {currentStep < 4 && (
            <div className="p-3.5 sm:p-4 bg-[#FAF6ED] dark:bg-[#14120D] border-t border-[#E8DFC8] dark:border-white/10 shrink-0 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <span className="text-[10px] font-mono uppercase text-[#8A6412] dark:text-[#EFC45C] font-bold block truncate">
                  Active Configuration: {currentCatObj.label} ({locationStatus === 'inside' ? 'Inside UAE' : 'Outside UAE'})
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg sm:text-xl font-mono font-black text-slate-950 dark:text-white">
                    AED {grandTotal.toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-[10px] text-slate-500 hidden sm:inline font-mono">
                    (Govt: AED {totalGovt.toLocaleString('en-AE')} + Concierge: AED {conciergeFee.toLocaleString('en-AE')})
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="btn-gold shimmer-sweep px-5 py-2.5 rounded-[10px] text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#0B0A08]" />
                </button>
              </div>
            </div>
          )}

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
