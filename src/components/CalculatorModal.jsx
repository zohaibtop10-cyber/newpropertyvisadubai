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
  Info
} from 'lucide-react';
import { siteConfig } from '../data/cmsData';

export default function CalculatorModal({ isOpen, onClose, initialTab = 'spouse' }) {
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

    if (category === 'family') {
      serviceCharge = 1450;
      items = [
        { label: 'File Opening / Sponsor Registration', price: 268.90, desc: 'GDRFA Immigration System Opening' },
        { label: 'Entry Permit (E-Visa)', price: 1125.65, desc: 'Initial entry approval for dependent' },
        ...(locationStatus === 'inside' ? [{ label: 'Status Change (In-Country)', price: 675.65, desc: 'Transfer without exiting UAE' }] : []),
        { label: 'Medical Fitness Test (Standard)', price: 320.00, desc: 'DHA / EHS Blood & X-Ray Screening' },
        { label: 'Emirates ID (2-Year Validity)', price: 390.00, desc: 'ICA Smart Card Processing' },
        { label: 'Basic Health Insurance (EIB)', price: 650.00, desc: 'Mandatory Essential Benefits Plan' },
        { label: 'Passport Visa Stamping / Residence E-Visa', price: 546.65, desc: 'Final Residence Visa Approval' }
      ];
    } else if (category === 'property') {
      serviceCharge = 2450;
      items = [
        { label: 'DLD Property Valuation / NOC Clearance', price: 2000.00, desc: 'Dubai Land Dept Valuation Report' },
        { label: 'Medical Fitness Test (VIP Executive)', price: 700.00, desc: 'Express VIP Medical Center Screening' },
        { label: 'Emirates ID (10-Year Golden Visa Card)', price: 1150.00, desc: '10-Year Residency Card Issuance' },
        { label: 'Golden Visa Processing & Stamping', price: 6000.00, desc: 'Immigration & DLD Direct Approval' }
      ];
    } else if (category === 'corporate') {
      serviceCharge = 3500;
      items = [
        { label: 'Initial Approval Certificate', price: 120.00, desc: 'DET / Freezone Name & Activity Approval' },
        { label: 'Trade Name Reservation Fee', price: 620.00, desc: 'Official Commercial Name Booking' },
        { label: 'MOA / LSA Legal Notarization', price: 1500.00, desc: 'Court Notary Public Attestation' },
        { label: 'Trade License Issuance Fee', price: 6500.00, desc: 'Annual Commercial License Fee' },
        { label: 'Establishment Card (Immigration)', price: 750.00, desc: 'Company File Opening Card' }
      ];
    } else {
      serviceCharge = 850;
      items = [
        { label: 'Government Processing & Typing Fee', price: 1250.00, desc: 'GDRFA / Ministry Standard Fee' },
        { label: 'Document Translation & Admin Typing', price: 150.00, desc: 'Legal Typing & Verification' }
      ];
    }

    const totalGov = items.reduce((acc, curr) => acc + curr.price, 0);
    return { items, serviceCharge, totalGov, grandTotal: totalGov + serviceCharge };
  };

  const getSubCategoryLabel = () => {
    const map = {
      'family-residence': 'Family Residence Visa',
      'maid': 'Domestic Helper / Maid Visa',
      'golden': '10-Year Golden Visa (Property)',
      'investor': '2-Year Investor Residency',
      'setup': 'Business Setup & Trade License',
      'pro': 'Corporate PRO Services Package'
    };
    return map[subCategory] || (category === 'family' ? 'Family Residence Visa' : category === 'property' ? 'Property Investor Visa' : category === 'corporate' ? 'Business Setup & License' : 'UAE Residency Service');
  };

  const { items, serviceCharge, totalGov, grandTotal } = getBreakdown();

  const handleWhatsApp = () => {
    const message = `Hello EmiratesPrime! 👋\nI used the Calculator on your website:\n• Service: *${getSubCategoryLabel()}*\n• Location: *${locationStatus === 'inside' ? 'Inside UAE' : 'Outside UAE'}*\n• Estimated Grand Total: *AED ${grandTotal.toLocaleString('en-AE', { minimumFractionDigits: 2 })}*\n\nPlease confirm availability and next steps.`;
    window.open(`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const stepsList = [
    { num: 1, name: 'Category' },
    { num: 2, name: 'Service' },
    { num: 3, name: 'Location' },
    { num: 4, name: 'Estimate' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        className="w-full max-w-[820px] bg-[#0c0e12] border-[1.5px] border-brand-gold/40 rounded-2xl shadow-[0_0_60px_rgba(212,175,55,0.2)] overflow-hidden flex flex-col max-h-[92vh] text-white my-auto relative"
      >
        {/* Shimmer Top Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#B8860B] via-[#F3E5AB] to-[#D4AF37] relative z-20" />

        {/* Header Bar */}
        <div className="bg-gradient-to-b from-[#16181f] to-[#0c0e12] border-b border-white/10 px-5 sm:px-7 py-4 flex items-center justify-between shrink-0 relative z-10">
          <div className="flex items-center gap-3.5">
            {step > 1 ? (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleBack}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-brand-gold/30 hover:border-brand-gold hover:bg-brand-gold/10 transition-colors text-brand-gold cursor-pointer"
                title="Go Back"
              >
                <ArrowLeft className="w-4 h-4" />
              </motion.button>
            ) : (
              <div className="w-9 h-9 rounded-xl bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold">
                <CalcIcon className="w-4 h-4" />
              </div>
            )}

            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                  Emirates<span className="text-brand-gold">Prime</span>
                </span>
                <span className="bg-brand-gold/20 text-brand-gold border border-brand-gold/40 text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full">
                  Tariff Calculator
                </span>
              </div>
              <p className="text-slate-400 text-xs mt-0.5 font-medium hidden sm:block">
                Instant UAE Visa & Government Fee Calculator
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            aria-label="Close Calculator"
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-gold/50 transition-colors text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Step Wizard Dots Progress Bar */}
        <div className="bg-[#12141a] px-5 sm:px-7 py-3 border-b border-white/5 flex items-center justify-between shrink-0">
          {stepsList.map((st, idx) => {
            const isActive = step === st.num;
            const isCompleted = step > st.num;
            return (
              <React.Fragment key={st.num}>
                <div 
                  onClick={() => { if (isCompleted) setStep(st.num); }}
                  className={`flex items-center gap-2 cursor-pointer transition-all ${isCompleted ? 'hover:opacity-80' : ''}`}
                >
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    isCompleted 
                      ? 'bg-brand-gold text-black shadow-[0_0_12px_rgba(212,175,55,0.4)]' 
                      : isActive 
                        ? 'bg-brand-gold/20 text-brand-gold border-2 border-brand-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
                        : 'bg-white/5 text-slate-500 border border-white/10'
                  }`}>
                    {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : st.num}
                  </div>
                  <span className={`text-xs font-bold hidden md:inline ${
                    isActive ? 'text-brand-gold' : isCompleted ? 'text-slate-200' : 'text-slate-500'
                  }`}>
                    {st.name}
                  </span>
                </div>
                {idx < stepsList.length - 1 && (
                  <div className={`flex-1 h-[2px] mx-2 rounded-full transition-colors ${
                    step > st.num ? 'bg-brand-gold/70' : 'bg-white/10'
                  }`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 relative bg-gradient-to-b from-[#0c0e12] via-[#101217] to-[#0c0e12]">

          {step < 4 && (
            <motion.div 
              initial={{ opacity: 0, y: -8 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="mb-6"
            >
              <span className="text-brand-gold font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Step {step} of 3
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
                {step === 1 && "Select Service Category"}
                {step === 2 && "Choose Specific Package"}
                {step === 3 && "Applicant Current Location"}
              </h2>
              <p className="text-slate-400 text-sm mt-1 font-medium">
                {step === 1 && "Choose the main category for your UAE residency or business needs."}
                {step === 2 && "Pick your exact requirement — government fees will calculate line-by-line."}
                {step === 3 && "Location determines if Change of Status (In-Country) fees apply."}
              </p>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={`step-${step}-${category}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {/* STEP 1: Main Category Selection */}
              {step === 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { 
                      id: 'property', 
                      label: 'Property Investor Visa', 
                      desc: 'Golden Visa (AED 2M+) or 2-Year Investor Visa (AED 750k+)', 
                      icon: Building2, 
                      tag: '10-Year Golden'
                    },
                    { 
                      id: 'family', 
                      label: 'Family & Dependents', 
                      desc: 'Sponsor Spouse, Children, Parents, or Domestic Helper / Maid', 
                      icon: Users, 
                      tag: 'Most Popular'
                    },
                    { 
                      id: 'corporate', 
                      label: 'Business Setup & License', 
                      desc: 'Mainland or Freezone Trade License & PRO Corporate Services', 
                      icon: Briefcase, 
                      tag: 'Turnkey Package'
                    },
                    { 
                      id: 'other', 
                      label: 'Attestation & Typing', 
                      desc: 'Legal Translation, Document Attestation, EID & Medical', 
                      icon: Globe, 
                      tag: 'Express Service'
                    }
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
                          setTimeout(() => setStep(2), 180);
                        }}
                        className={`p-5 sm:p-6 rounded-2xl border-[1.5px] transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between group ${
                          isSelected
                            ? 'border-brand-gold bg-brand-gold/15 shadow-[0_0_30px_rgba(212,175,55,0.2)]'
                            : 'border-white/10 bg-white/[0.03] hover:border-brand-gold/60 hover:bg-white/[0.06] hover:shadow-[0_0_25px_rgba(212,175,55,0.1)]'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                            isSelected ? 'bg-brand-gold text-black shadow-lg shadow-brand-gold/30' : 'bg-brand-gold/10 text-brand-gold border border-brand-gold/30 group-hover:scale-110'
                          }`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="text-[10px] font-mono font-bold tracking-wider uppercase bg-brand-gold/15 text-brand-gold border border-brand-gold/30 px-2.5 py-1 rounded-full">
                            {opt.tag}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-extrabold text-lg sm:text-xl text-white group-hover:text-brand-gold transition-colors mb-1.5 flex items-center justify-between">
                            <span>{opt.label}</span>
                            <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-brand-gold transition-transform group-hover:translate-x-1" />
                          </h3>
                          <p className="text-slate-400 text-xs sm:text-sm font-medium leading-relaxed">
                            {opt.desc}
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
                    { id: 'family-residence', label: 'Family Residence Visa', desc: 'Sponsor spouse, children (up to age 25 for sons, unmarried daughters), or parents.' },
                    { id: 'maid', label: 'Maid / Domestic Helper Visa', desc: 'Sponsor domestic nanny or housemaid directly under personal sponsorship.' }
                  ] : category === 'property' ? [
                    { id: 'golden', label: '10-Year Golden Visa (Property)', desc: 'For Dubai real estate title deed value AED 2,000,000+ (Mortgaged properties included).' },
                    { id: 'investor', label: '2-Year Property Investor Visa', desc: 'For Dubai title deed value AED 750,000+ through DLD.' }
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
                          setTimeout(() => setStep(3), 180);
                        }}
                        className={`p-6 rounded-2xl border-[1.5px] transition-all cursor-pointer relative overflow-hidden group flex flex-col justify-between ${
                          isSelected
                            ? 'border-brand-gold bg-brand-gold/15 shadow-[0_0_30px_rgba(212,175,55,0.2)]'
                            : 'border-white/10 bg-white/[0.03] hover:border-brand-gold/60 hover:bg-white/[0.06]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-extrabold text-lg text-white group-hover:text-brand-gold transition-colors">
                            {opt.label}
                          </span>
                          <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-brand-gold transition-transform group-hover:translate-x-1" />
                        </div>
                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                          {opt.desc}
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
                          setTimeout(() => setStep(4), 180);
                        }}
                        className={`p-6 sm:p-8 rounded-2xl border-[1.5px] transition-all cursor-pointer relative overflow-hidden text-center flex flex-col items-center justify-center group ${
                          isSelected
                            ? 'border-brand-gold bg-brand-gold/15 shadow-[0_0_35px_rgba(212,175,55,0.25)]'
                            : 'border-white/10 bg-white/[0.03] hover:border-brand-gold/60 hover:bg-white/[0.06]'
                        }`}
                      >
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform ${
                          isSelected ? 'bg-brand-gold text-black shadow-lg shadow-brand-gold/40' : 'bg-brand-gold/10 text-brand-gold border border-brand-gold/30 group-hover:scale-110'
                        }`}>
                          <Icon className="w-8 h-8" />
                        </div>
                        <span className="text-xs font-mono font-bold text-brand-gold uppercase tracking-wider mb-1">
                          {opt.highlight}
                        </span>
                        <h3 className="font-extrabold text-xl text-white mb-2 group-hover:text-brand-gold transition-colors">
                          {opt.label}
                        </h3>
                        <p className="text-slate-400 text-xs sm:text-sm max-w-xs leading-relaxed">
                          {opt.desc}
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
                  <div className="bg-gradient-to-r from-[#171922] via-[#1c1e28] to-[#171922] border-[1.5px] border-brand-gold/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_40px_rgba(212,175,55,0.15)] relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#FFF8DC] to-[#B8860B]" />
                    
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                      <div>
                        <div className="flex items-center gap-2 text-brand-gold font-mono text-xs font-bold uppercase tracking-wider mb-1">
                          <Receipt className="w-4 h-4" /> Official Tariff Estimate
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                          {getSubCategoryLabel()}
                        </h2>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-brand-gold/15 text-brand-gold border border-brand-gold/30 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase">
                          {category}
                        </span>
                        <span className="bg-white/5 text-slate-300 border border-white/10 px-3 py-1 rounded-full text-xs font-bold">
                          {locationStatus === 'inside' ? 'Inside UAE' : 'Outside UAE'}
                        </span>
                      </div>
                    </div>

                    {/* Government & Official Items */}
                    <div className="py-6 space-y-3">
                      <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-brand-gold" /> Itemized Government & Authority Fees
                      </div>

                      {items.map((item, idx) => (
                        <div 
                          key={idx} 
                          className="flex items-center justify-between text-sm py-2.5 px-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-brand-gold/20 transition-colors"
                        >
                          <div>
                            <div className="font-semibold text-slate-200">{item.label}</div>
                            <div className="text-[11px] text-slate-400 font-medium">{item.desc}</div>
                          </div>
                          <div className="font-mono font-bold text-white text-base shrink-0 ml-4">
                            AED {item.price.toLocaleString('en-AE', { minimumFractionDigits: 2 })}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Totals Summary */}
                    <div className="pt-5 border-t-2 border-brand-gold/30 space-y-3">
                      <div className="flex justify-between items-center text-sm sm:text-base text-slate-300">
                        <span>Total Government & Typing Fees</span>
                        <span className="font-mono font-bold text-white text-lg">
                          AED {totalGov.toLocaleString('en-AE', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm sm:text-base text-slate-300">
                        <span className="flex items-center gap-1.5 text-brand-gold font-semibold">
                          <Sparkles className="w-4 h-4" /> Professional Service Charge
                        </span>
                        <span className="font-mono font-bold text-brand-gold text-lg bg-brand-gold/10 px-3 py-1 rounded-lg border border-brand-gold/30">
                          AED {serviceCharge.toLocaleString('en-AE', { minimumFractionDigits: 2 })}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-2">
                        <div>
                          <span className="text-xs text-slate-400 uppercase tracking-wider font-mono font-bold block">Estimated Grand Total</span>
                          <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                            <Info className="w-3 h-3" /> No hidden fees • Includes typing & admin
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FFF8DC] via-[#D4AF37] to-[#B8860B] font-mono tracking-tight drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                            AED {grandTotal.toLocaleString('en-AE', { minimumFractionDigits: 2 })}
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
        <div className="bg-[#0e1015] border-t border-white/10 p-4 sm:p-5 flex items-center justify-between shrink-0 relative z-20">
          {step < 4 ? (
            <>
              <button
                onClick={resetAll}
                className="text-xs text-slate-400 hover:text-white underline transition-colors cursor-pointer font-medium"
              >
                Reset Calculator
              </button>

              <div className="flex items-center gap-2 text-xs text-brand-gold font-mono font-bold">
                <span>Select options to calculate automatically</span>
              </div>
            </>
          ) : (
            <div className="w-full flex flex-col sm:flex-row gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep(1)}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 border-2 border-brand-gold/40 hover:border-brand-gold text-white rounded-xl font-extrabold transition-all cursor-pointer bg-white/5 hover:bg-brand-gold/10 btn-shine-effect text-sm"
              >
                <Edit2 className="w-4 h-4 text-brand-gold" />
                <span>Modify Details</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsApp}
                className="flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-extrabold transition-all shadow-[0_0_25px_rgba(37,211,102,0.3)] cursor-pointer text-sm"
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

