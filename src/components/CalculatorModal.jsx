import React, { useState } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowLeft,
  Check,
  Edit2,
  Building2,
  Users,
  Briefcase,
  Globe,
  MapPin,
  Plane,
  Calculator as CalcIcon,
  Sparkles,
  ShieldCheck,
  Receipt,
  ChevronRight,
  Info,
  BadgeCheck
} from 'lucide-react';
import { siteConfig } from '../data/cmsData';

export default function CalculatorModal({ isOpen, onClose, initialTab = 'spouse', cmsConfig }) {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [locationStatus, setLocationStatus] = useState('');

  if (!isOpen) return null;

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const resetAll = () => {
    setStep(1);
    setCategory('');
    setSubCategory('');
    setLocationStatus('');
  };

  const getBreakdown = () => {
    let items = [];
    let serviceCharge = 1450;

    const key = subCategory === 'golden' || (category === 'property' && subCategory === 'golden') ? 'golden'
              : subCategory === 'golden-executive' ? 'golden-executive'
              : subCategory === 'investor' || (category === 'property' && subCategory === 'investor') ? 'investor'
              : subCategory === 'child' ? 'child'
              : subCategory === 'maid' ? 'maid'
              : (category === 'family' || subCategory === 'family-residence') ? 'family-residence'
              : category === 'corporate' ? 'corporate'
              : 'default';

    if (cmsConfig?.calculator && cmsConfig.calculator[key]) {
      const catConfig = cmsConfig.calculator[key];
      serviceCharge = catConfig.serviceCharge ?? serviceCharge;
      items = (catConfig.items || []).map(i => ({ ...i }));
      if (locationStatus === 'inside') {
        const surchargePrice = cmsConfig.calculator.inCountrySurcharge ?? 675.65;
        if (!items.some(i => i.label?.toLowerCase().includes('status change') || i.label?.toLowerCase().includes('in-country'))) {
          items.push({ label: 'Status Change (In-Country)', price: surchargePrice, desc: 'Transfer without exiting UAE border' });
        }
      }
    } else if (subCategory === 'golden' || (category === 'property' && subCategory === 'golden')) {
      serviceCharge = 2450;
      items = [
        { label: 'DLD Property Valuation & Audit', price: 4020.00, desc: 'Dubai Land Dept Official Valuation & Title Deed Clearance' },
        { label: 'GDRFA 10-Year Golden Visa Entry Permit', price: 2680.00, desc: 'Immigration Golden Visa Nomination & Approval' },
        { label: 'VIP Express Medical & 10-Year Emirates ID', price: 2721.00, desc: '30-min VIP Medical & 10-Yr Smart Card' }
      ];
    } else if (subCategory === 'golden-executive') {
      serviceCharge = 1800;
      items = [
        { label: 'ICP / GDRFA Nomination & Entry Approval', price: 2400.00, desc: 'Executive / Skilled Talent Nomination' },
        { label: 'VIP Medical Screening & 10-Yr Emirates ID', price: 1737.00, desc: 'VIP Medical Test & 10-Yr Smart Card' }
      ];
    } else if (subCategory === 'investor' || (category === 'property' && subCategory === 'investor')) {
      serviceCharge = 1850;
      items = [
        { label: 'DLD Title Deed Audit & Clearance', price: 3100.00, desc: 'Property Valuation Check & NOC' },
        { label: 'GDRFA Entry Permit & Residency Stamp', price: 2150.00, desc: '2-Year Investor Residency Approval' },
        { label: 'VIP Medical Test & 2-Yr Emirates ID', price: 1600.00, desc: 'Medical Fitness & Smart Card' }
      ];
    } else if (subCategory === 'child') {
      serviceCharge = 1250;
      items = [
        { label: 'ICP / GDRFA Dependent Entry Permit', price: 1100.00, desc: 'Child Entry Permit Approval' },
        { label: 'Emirates ID Card (2-Year Validity)', price: 380.00, desc: 'Child Smart Card Processing (No Medical Needed)' },
        { label: 'File Opening & Visa Stamping Fee', price: 1770.00, desc: 'Final Residence Visa Stamping' }
      ];
    } else if (subCategory === 'maid') {
      serviceCharge = 1650;
      items = [
        { label: 'MOHRE Entry Permit & Labor Contract', price: 2100.00, desc: 'Domestic Worker Labor Agreement' },
        { label: 'VIP Medical Screening & Emirates ID', price: 1200.00, desc: 'Mandatory Medical & Smart Card' },
        { label: 'Refundable Security Deposit (GDRFA)', price: 2000.00, desc: 'Official Government Security Deposit' },
        { label: 'Residency Visa Stamping', price: 1200.00, desc: '2-Year Domestic Worker Stamping' }
      ];
    } else if (category === 'family' || subCategory === 'family-residence') {
      serviceCharge = 1450;
      items = [
        { label: 'GDRFA / ICP Entry Permit (Spouse)', price: 1150.00, desc: 'Initial Residence Entry Approval' },
        { label: 'Medical Fitness Screening (Standard)', price: 320.00, desc: 'DHA / EHS Blood & X-Ray Screening' },
        { label: 'Emirates ID (2-Year Validity)', price: 390.00, desc: 'ICA Smart Card Processing' },
        { label: 'Visa Stamping & Status Amendment', price: 1990.00, desc: 'Final Residence Visa Approval' },
        ...(locationStatus === 'inside' ? [{ label: 'Status Change (In-Country)', price: 675.65, desc: 'Transfer without exiting UAE border' }] : [])
      ];
    } else if (category === 'corporate') {
      serviceCharge = 2500;
      items = [
        { label: 'DET / Freezone Initial Approval', price: 1200.00, desc: 'Trade Name Reservation & Activity Approval' },
        { label: 'Company MOA & Legal Notarization', price: 1500.00, desc: 'Court Notary Public Attestation' },
        { label: 'Trade License & Establishment Card', price: 9800.00, desc: 'Annual License & Immigration File Card' }
      ];
    } else {
      serviceCharge = 850;
      items = [
        { label: 'Government Processing & Typing Fee', price: 850.00, desc: 'GDRFA / Ministry Standard Typing' },
        { label: 'Document Translation & Admin Typing', price: 450.00, desc: 'Sworn Arabic Translation' }
      ];
    }

    const totalGov = items.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0);
    return { items, serviceCharge, totalGov, grandTotal: totalGov + serviceCharge };
  };

  const getSubCategoryLabel = () => {
    const map = {
      'family-residence': 'Family Residence Visa (Spouse/Children)',
      'maid': 'Domestic Helper / Maid Visa (Tadbeer)',
      'golden': '10-Year Golden Visa (Property Investor)',
      'investor': '2-Year Investor Residency (DLD)',
      'setup': 'Business Setup & Trade License (DET)',
      'pro': 'Corporate PRO Services Package'
    };
    return map[subCategory] || (category === 'family' ? 'Family Residence Visa' : category === 'property' ? 'Property Investor Visa' : category === 'corporate' ? 'Business Setup & License' : 'UAE Residency Service');
  };

  const { items, serviceCharge, totalGov, grandTotal } = getBreakdown();

  const handleWhatsApp = () => {
    const message = `Hello EmiratesPrime! 👋\nI calculated my fee on your website:\n• Service: *${getSubCategoryLabel()}*\n• Location: *${locationStatus === 'inside' ? 'Inside UAE (In-Country Status Change)' : 'Outside UAE'}*\n• Estimated Grand Total: *AED ${grandTotal.toLocaleString('en-AE', { minimumFractionDigits: 2 })}*\n\nPlease confirm availability and document checklist for fast-track processing.`;
    window.open(`https://wa.me/${cmsConfig?.global?.whatsappRaw || siteConfig.whatsappRaw}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const stepsList = [
    { num: 1, name: 'Category' },
    { num: 2, name: 'Service' },
    { num: 3, name: 'Location' },
    { num: 4, name: 'Breakdown' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ type: 'spring', stiffness: 140, damping: 20 }}
        className="w-full max-w-[840px] bg-[#0A0B0E] border-[1.5px] border-[#D4AF37]/40 rounded-[10px] shadow-[0_0_80px_rgba(212,175,55,0.25)] overflow-hidden flex flex-col max-h-[92vh] text-white my-auto relative"
      >
        {/* Shimmer Top Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#B8860B] via-[#FFF8DC] to-[#D4AF37] relative z-20" />

        {/* Directive 4: Header Bar with Gold "Official Fee Calculator" badge */}
        <div className="bg-gradient-to-b from-[#141720] to-[#0A0B0E] border-b border-white/10 px-5 sm:px-7 py-4 flex items-center justify-between shrink-0 relative z-10">
          <div className="flex items-center gap-3.5">
            {step > 1 ? (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleBack}
                className="w-9 h-9 flex items-center justify-center rounded-[10px] bg-white/5 border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#D4AF37]/15 transition-colors text-[#D4AF37] cursor-pointer"
                title="Go Back"
              >
                <ArrowLeft className="w-4 h-4" />
              </motion.button>
            ) : (
              <div className="w-9 h-9 rounded-[10px] bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shadow-md">
                <CalcIcon className="w-4 h-4" />
              </div>
            )}

            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                  <span>Emirates</span><span className="text-[#D4AF37]">Prime</span>
                </span>
                <span className="bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 text-[10px] uppercase font-mono font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <BadgeCheck className="w-3 h-3 text-[#D4AF37]" /> <span>Official Fee Calculator</span>
                </span>
              </div>
              <p className="text-slate-400 text-xs mt-0.5 font-medium hidden sm:block">
                <span>Instant GDRFA, ICP & DHA Official Government Fee Estimator</span>
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            aria-label="Close Calculator"
            className="w-9 h-9 flex items-center justify-center rounded-[10px] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#D4AF37]/50 transition-colors text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Directive 4: Progress Bar (Horizontal Step Tracker) */}
        <div className="bg-[#10121a] px-5 sm:px-7 py-3.5 border-b border-white/5 flex items-center justify-between shrink-0">
          {stepsList.map((st, idx) => {
            const isActive = step === st.num;
            const isCompleted = step > st.num;
            return (
              <React.Fragment key={st.num}>
                <div
                  onClick={() => { if (isCompleted) setStep(st.num); }}
                  className={`flex items-center gap-2 cursor-pointer transition-all ${isCompleted ? 'hover:opacity-80' : ''}`}
                >
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${isCompleted
                    ? 'bg-dark-gold-gloss text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                    : isActive
                      ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-2 border-[#D4AF37] shadow-[0_0_18px_rgba(212,175,55,0.35)]'
                      : 'bg-white/5 text-slate-500 border border-white/10'
                    }`}>
                    {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : st.num}
                  </div>
                  <span className={`text-xs font-extrabold hidden md:inline ${isActive ? 'text-[#D4AF37]' : isCompleted ? 'text-slate-200' : 'text-slate-500'
                    }`}>
                    <span>{st.name}</span>
                  </span>
                </div>
                {idx < stepsList.length - 1 && (
                  <div className={`flex-1 h-[2px] mx-2 rounded-full transition-colors ${step > st.num ? 'bg-[#D4AF37]/70' : 'bg-white/10'
                    }`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 relative bg-gradient-to-b from-[#0A0B0E] via-[#0E1017] to-[#0A0B0E]">

          {step < 4 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
                {step === 1 && "Select Category"}
                {step === 2 && "Choose Package"}
                {step === 3 && "Applicant Current Location"}
              </h2>

            </motion.div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={`step-${step}-${category}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              {/* Directive 4: Bento Grid Selection Cards (bg-[#1A1A1A] border border-white/5 with glowing gold border and gold pill badge on hover/select) */}
              {step === 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'property', label: 'Property Investor Visa', desc: '10-Year Golden Visa (AED 2M+) or 2-Year Investor Visa (AED 750k+)', icon: Building2, tag: '10-Year Golden' },
                    { id: 'family', label: 'Family & Dependents', desc: 'Sponsor Spouse, Children, Parents, or Domestic Helper / Maid', icon: Users, tag: 'Most Popular' },
                    { id: 'corporate', label: 'Business Setup & License', desc: 'Mainland or Freezone Trade License & PRO Corporate Services', icon: Briefcase, tag: 'Turnkey Package' },
                    { id: 'other', label: 'Attestation & Typing', desc: 'Legal Translation, Document Attestation, EID & Medical', icon: Globe, tag: 'Express Service' }
                  ].map((opt) => {
                    const isSelected = category === opt.id;
                    const Icon = opt.icon;
                    return (
                      <motion.div
                        key={opt.id}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setCategory(opt.id);
                          setSubCategory('');
                          setTimeout(() => setStep(2), 150);
                        }}
                        className={`p-5 sm:p-6 rounded-[10px] border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between group ${isSelected
                          ? 'border-[#D4AF37] bg-[#1A1A1A] shadow-[0_0_25px_rgba(212,175,55,0.25)]'
                          : 'border-white/5 bg-[#1A1A1A] hover:border-[#D4AF37] hover:bg-white/5'
                          }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-12 h-12 rounded-[10px] flex items-center justify-center transition-all ${isSelected ? 'bg-dark-gold-gloss text-black shadow-lg shadow-[#D4AF37]/30' : 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 group-hover:scale-110'
                            }`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="text-[10px] font-mono font-bold tracking-wider uppercase bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 px-2.5 py-1 rounded-full">
                            <span>{opt.tag}</span>
                          </span>
                        </div>

                        <div>
                          <h3 className="font-extrabold text-lg sm:text-xl text-white group-hover:text-[#D4AF37] transition-colors mb-1.5 flex items-center justify-between">
                            <span>{opt.label}</span>
                            <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-[#D4AF37] transition-transform group-hover:translate-x-1" />
                          </h3>
                          <p className="text-slate-400 text-xs sm:text-sm font-medium leading-relaxed">
                            <span>{opt.desc}</span>
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* STEP 2: Subcategory Selection */}
              {step === 2 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(category === 'family' ? [
                    { id: 'family-residence', label: 'Family Residence Visa', desc: 'Sponsor spouse, children (sons up to 25 yrs, unmarried daughters), or parents.' },
                    { id: 'maid', label: 'Maid / Domestic Helper Visa', desc: 'Sponsor domestic nanny or housemaid directly under personal sponsorship.' }
                  ] : category === 'property' ? [
                    { id: 'golden', label: '10-Year Golden Visa (Property)', desc: 'For Dubai title deed value AED 2,000,000+ (Mortgaged properties included).' },
                    { id: 'investor', label: '2-Year Property Investor Visa', desc: 'For Dubai title deed value AED 750,000+ through DLD Trustee.' }
                  ] : category === 'corporate' ? [
                    { id: 'setup', label: 'Business Setup / Trade License', desc: 'Complete DET Mainland or Freezone company incorporation & establishment card.' },
                    { id: 'pro', label: 'Corporate PRO Services', desc: 'Annual corporate PRO retainer, quota addition, work permits & visa renewals.' }
                  ] : [
                    { id: 'attestation', label: 'Document Attestation', desc: 'Degree, Marriage, Birth Certificate attestation from MOFA & Embassy.' },
                    { id: 'medical-eid', label: 'Express Medical & EID', desc: 'VIP fast-track medical fitness test & Emirates ID biometric appointment.' }
                  ]).map((opt) => {
                    const isSelected = subCategory === opt.id;
                    return (
                      <motion.div
                        key={opt.id}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSubCategory(opt.id);
                          setTimeout(() => setStep(3), 150);
                        }}
                        className={`p-6 rounded-[10px] border transition-all cursor-pointer relative overflow-hidden group flex flex-col justify-between ${isSelected
                          ? 'border-[#D4AF37] bg-[#1A1A1A] shadow-[0_0_25px_rgba(212,175,55,0.25)]'
                          : 'border-white/5 bg-[#1A1A1A] hover:border-[#D4AF37] hover:bg-white/5'
                          }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-extrabold text-lg text-white group-hover:text-[#D4AF37] transition-colors">
                            <span>{opt.label}</span>
                          </span>
                          <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-[#D4AF37] transition-transform group-hover:translate-x-1" />
                        </div>
                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                          <span>{opt.desc}</span>
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* STEP 3: Applicant Location */}
              {step === 3 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { id: 'inside', label: 'Inside the UAE', desc: 'Applicant is currently inside Dubai/UAE. Change of Status fee (+AED 675.65) will be added automatically.', icon: MapPin, highlight: 'No travel required' },
                    { id: 'outside', label: 'Outside the UAE', desc: 'Applicant is outside UAE. Entry permit will be issued for entry into Dubai.', icon: Plane, highlight: 'Entry Permit via Email' }
                  ].map((opt) => {
                    const isSelected = locationStatus === opt.id;
                    const Icon = opt.icon;
                    return (
                      <motion.div
                        key={opt.id}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setLocationStatus(opt.id);
                          setTimeout(() => setStep(4), 150);
                        }}
                        className={`p-6 sm:p-8 rounded-[10px] border transition-all cursor-pointer relative overflow-hidden text-center flex flex-col items-center justify-center group ${isSelected
                          ? 'border-[#D4AF37] bg-[#1A1A1A] shadow-[0_0_35px_rgba(212,175,55,0.25)]'
                          : 'border-white/5 bg-[#1A1A1A] hover:border-[#D4AF37] hover:bg-white/5'
                          }`}
                      >
                        <div className={`w-16 h-16 rounded-[10px] flex items-center justify-center mb-4 transition-transform ${isSelected ? 'bg-dark-gold-gloss text-black shadow-lg shadow-[#D4AF37]/40' : 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 group-hover:scale-110'
                          }`}>
                          <Icon className="w-8 h-8" />
                        </div>
                        <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
                          <span>{opt.highlight}</span>
                        </span>
                        <h3 className="font-extrabold text-xl text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                          <span>{opt.label}</span>
                        </h3>
                        <p className="text-slate-400 text-xs sm:text-sm max-w-xs leading-relaxed">
                          <span>{opt.desc}</span>
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* STEP 4: Detailed Breakdown Receipt */}
              {step === 4 && (
                <div className="space-y-6">
                  {/* Result Header Card */}
                  <div className="bg-[#141720] border border-[#D4AF37]/40 rounded-[10px] p-6 sm:p-8 shadow-[0_0_40px_rgba(212,175,55,0.15)] relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#FFF8DC] to-[#B8860B]" />

                    <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                      <div>
                        <div className="flex items-center gap-2 text-[#D4AF37] font-mono text-xs font-bold uppercase tracking-wider mb-1">
                          <Receipt className="w-4 h-4" /> <span>Official Tariff Breakdown</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                          <span>{getSubCategoryLabel()}</span>
                        </h2>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase">
                          <span>{category}</span>
                        </span>
                        <span className="bg-white/5 text-slate-300 border border-white/10 px-3 py-1 rounded-full text-xs font-bold">
                          <span>{locationStatus === 'inside' ? 'Inside UAE' : 'Outside UAE'}</span>
                        </span>
                      </div>
                    </div>

                    {/* Government & Official Items */}
                    <div className="py-6 space-y-3">
                      <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> <span>Itemized Government & Authority Fees</span>
                      </div>

                      {items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-sm py-3 px-3.5 rounded-[10px] bg-white/[0.02] border border-white/5 hover:border-[#D4AF37]/20 transition-colors"
                        >
                          <div>
                            <div className="font-bold text-slate-200"><span>{item.label}</span></div>
                            <div className="text-[11px] text-slate-400 font-medium"><span>{item.desc}</span></div>
                          </div>
                          <div className="font-mono font-extrabold text-white text-base shrink-0 ml-4">
                            <span>AED {item.price.toLocaleString('en-AE', { minimumFractionDigits: 2 })}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Totals Summary */}
                    <div className="pt-5 border-t-2 border-[#D4AF37]/30 space-y-3">
                      <div className="flex justify-between items-center text-sm sm:text-base text-slate-300">
                        <span>Total Government & Typing Fees</span>
                        <span className="font-mono font-bold text-white text-lg">
                          <span>AED {totalGov.toLocaleString('en-AE', { minimumFractionDigits: 2 })}</span>
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-sm sm:text-base text-slate-300">
                        <span className="flex items-center gap-1.5 text-[#D4AF37] font-semibold">
                          <Sparkles className="w-4 h-4" /> <span>Professional Service & Typing Charge</span>
                        </span>
                        <span className="font-mono font-bold text-[#D4AF37] text-lg bg-[#D4AF37]/10 px-3 py-1 rounded-[10px] border border-[#D4AF37]/30">
                          <span>AED {serviceCharge.toLocaleString('en-AE', { minimumFractionDigits: 2 })}</span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-2">
                        <div>
                          <span className="text-xs text-slate-400 uppercase tracking-wider font-mono font-bold block"><span>Estimated Grand Total</span></span>
                          <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                            <Info className="w-3 h-3" /> <span>Includes typing, admin & government receipts at cost</span>
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFF8DC] via-[#D4AF37] to-[#B8860B] font-mono tracking-tight">
                            <span>AED {grandTotal.toLocaleString('en-AE', { minimumFractionDigits: 2 })}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Bar Controls */}
        <div className="bg-[#0E1017] border-t border-white/10 p-4 sm:p-5 flex items-center justify-between shrink-0 relative z-20 rounded-b-[10px]">
          {step < 4 ? (
            <>
              <button
                onClick={resetAll}
                className="text-xs text-slate-400 hover:text-white underline transition-colors cursor-pointer font-medium"
              >
                <span>Reset Calculator</span>
              </button>

              <div className="flex items-center gap-2 text-xs text-[#D4AF37] font-mono font-bold">
                <span>Select options to calculate automatically</span>
              </div>
            </>
          ) : (
            <div className="w-full flex flex-col sm:flex-row gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep(1)}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 border border-[#D4AF37]/40 hover:border-[#D4AF37] text-white rounded-[10px] font-extrabold transition-all cursor-pointer bg-white/5 hover:bg-[#D4AF37]/10 text-sm"
              >
                <Edit2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Modify Selection</span>
              </motion.button>

              {/* Directive 7: WhatsApp button strictly bg-[#25D366] hover:bg-[#128C7E] text-white font-extrabold rounded-[10px] */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsApp}
                className="flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-[10px] font-extrabold transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)] cursor-pointer text-sm"
              >
                <WhatsAppIcon className="w-5 h-5 fill-current" />
                <span>WhatsApp Instant Inquiry</span>
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
