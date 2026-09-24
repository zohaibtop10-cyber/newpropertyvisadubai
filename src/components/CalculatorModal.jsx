import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Crown,
  Users,
  Baby,
  ChevronRight,
  ArrowLeft,
  MapPin,
  Copy,
  Check,
  Share2,
  RotateCcw
} from 'lucide-react';
import { servicesData, siteConfig } from '../data/cmsData';

export default function CalculatorModal({ isOpen, onClose, initialTab = 'spouse' }) {
  // Wizard Steps: 1 (Category) -> 2 (Sub-Category) -> 3 (Location) -> 4 (Results & Action Bar)
  const [step, setStep] = useState(1);

  // Selections
  const [category, setCategory] = useState('family'); // 'property' | 'family' | 'newborn'
  const [subCategory, setSubCategory] = useState(initialTab || 'spouse'); // property: '10-year-golden' | '2-year-investor' | '5-year-retirement', family: 'spouse' | 'children' | 'parents' | 'maid'
  const [locationStatus, setLocationStatus] = useState('inside'); // 'inside' | 'outside'

  // Copy success state
  const [isCopied, setIsCopied] = useState(false);

  const handleSelectCategory = (cat) => {
    setCategory(cat);
    if (cat === 'property') setSubCategory('10-year-golden');
    if (cat === 'family') setSubCategory('spouse');
    if (cat === 'newborn') setSubCategory('infant');
    setStep(2);
  };

  const handleSelectSubCategory = (subCat) => {
    setSubCategory(subCat);
    setStep(3);
  };

  const handleSelectLocation = (loc) => {
    setLocationStatus(loc);
    setStep(4);
  };

  const resetWizard = () => {
    setStep(1);
    setCategory('family');
    setSubCategory('spouse');
    setLocationStatus('inside');
    setIsCopied(false);
  };

  const getCategoryLabel = () => {
    if (category === 'family') {
      if (subCategory === 'spouse') return 'Spouse Residence Visa';
      if (subCategory === 'children') return 'Children Dependant Visa';
      if (subCategory === 'parents') return 'Parents Residence Visa';
      if (subCategory === 'maid') return 'Maid & Domestic Helper Visa';
      if (subCategory === 'newborn') return 'Newborn Baby Residence Clearance';
    }
    if (category === 'property') {
      if (subCategory === '10-year-golden') return '10-Year Property Golden Visa';
      if (subCategory === '2-year-investor') return '2-Year Property Investor Visa';
      if (subCategory === '5-year-retirement') return '5-Year Retirement Visa';
    }
    if (category === 'corporate') {
      if (subCategory === 'pro-services') return 'Corporate & Individual PRO Services';
      if (subCategory === 'business-setup') return 'Business Setup & Company Formation';
    }
    if (category === 'legal') {
      if (subCategory === 'attestation') return 'Document Legalization & MOFA Attestation';
      if (subCategory === 'legal-translation') return 'Sworn Legal Translation (Arabic)';
      if (subCategory === 'power-of-attorney') return 'Power of Attorney (POA) & Notary';
      if (subCategory === 'wills-testament') return 'DIFC / Court Wills & Estate Planning';
    }
    if (category === 'other') {
      if (subCategory === 'medical-fitness') return 'VIP Express Medical Fitness (30-Min)';
      if (subCategory === 'amer-services') return 'Amer Doorstep Mobile PRO Services';
      if (subCategory === 'health-insurance') return 'DHA / DOH Compliant Health Insurance';
      if (subCategory === 'visa-status') return 'Visa Status Check & Overstay Fine Waiver';
    }
    return 'UAE Residency & Document Service';
  };

  // Calculation Engine
  const calculateCosts = () => {
    let govTariff = 0;
    let advisoryRetainer = 1450;

    // Base Tariffs
    if (category === 'property') {
      if (subCategory === '10-year-golden') {
        govTariff = 9850;
        advisoryRetainer = 2450;
      } else if (subCategory === '2-year-investor') {
        govTariff = 6850;
        advisoryRetainer = 1850;
      } else if (subCategory === '5-year-retirement') {
        govTariff = 5900;
        advisoryRetainer = 1950;
      }
    } else if (category === 'family') {
      if (subCategory === 'spouse') {
        govTariff = 3850;
        advisoryRetainer = 1450;
      } else if (subCategory === 'children') {
        govTariff = 3450;
        advisoryRetainer = 1250;
      } else if (subCategory === 'parents') {
        govTariff = 7800;
        advisoryRetainer = 2500;
      } else if (subCategory === 'maid') {
        govTariff = 5200;
        advisoryRetainer = 1650;
      } else if (subCategory === 'newborn') {
        govTariff = 2850;
        advisoryRetainer = 1150;
      }
    } else if (category === 'corporate') {
      if (subCategory === 'pro-services') {
        govTariff = 1200;
        advisoryRetainer = 800;
      } else if (subCategory === 'business-setup') {
        govTariff = 12500;
        advisoryRetainer = 2500;
      }
    } else if (category === 'legal') {
      if (subCategory === 'attestation') {
        govTariff = 850;
        advisoryRetainer = 450;
      } else if (subCategory === 'legal-translation') {
        govTariff = 350;
        advisoryRetainer = 200;
      } else if (subCategory === 'power-of-attorney') {
        govTariff = 950;
        advisoryRetainer = 550;
      } else if (subCategory === 'wills-testament') {
        govTariff = 10000;
        advisoryRetainer = 2500;
      }
    } else if (category === 'other') {
      if (subCategory === 'medical-fitness') {
        govTariff = 750;
        advisoryRetainer = 250;
      } else if (subCategory === 'amer-services') {
        govTariff = 500;
        advisoryRetainer = 300;
      } else if (subCategory === 'health-insurance') {
        govTariff = 650;
        advisoryRetainer = 150;
      } else if (subCategory === 'visa-status') {
        govTariff = 300;
        advisoryRetainer = 500;
      }
    }

    // Dynamic override from Admin CMS (servicesData) if available
    const serviceMap = {
      '10-year-golden': 'golden-visa',
      'spouse': 'spouse-visa',
      'children': 'children-visa',
      'infant': 'children-visa',
      'parents': 'parents-visa',
      'maid': 'maid-visa'
    };
    const mappedId = serviceMap[subCategory];
    if (mappedId) {
      const service = servicesData.find(s => s.id === mappedId);
      if (service && service.pricing) {
        govTariff = service.pricing.statutoryGovTariff;
        advisoryRetainer = service.pricing.advisoryRetainer;
      }
    }

    // Inside UAE Location Surcharge (In-Country Status Amendment)
    const statusChangeFee = locationStatus === 'inside' ? 1150 : 0;
    const totalGovCost = govTariff + statusChangeFee;
    const grandTotal = totalGovCost + advisoryRetainer;
    const usdTotal = Math.round(grandTotal / 3.6725);

    return {
      govTariff,
      statusChangeFee,
      totalGovCost,
      advisoryRetainer,
      grandTotal,
      usdTotal
    };
  };

  const costs = calculateCosts();

  const compileQuoteText = () => {
    return `${siteConfig.brandName} - Itemized Quote Breakdown
----------------------------------------
Service: ${getCategoryLabel()}
Applicant Location: ${locationStatus === 'inside' ? 'Inside the UAE' : 'Outside the UAE'}

• Statutory Government Tariff: AED ${costs.govTariff.toLocaleString()}
${costs.statusChangeFee > 0 ? `• In-Country Status Amendment: AED ${costs.statusChangeFee.toLocaleString()}\n` : ''}• Advisory Retainer Fee: AED ${costs.advisoryRetainer.toLocaleString()}
----------------------------------------
Total Estimated Investment: AED ${costs.grandTotal.toLocaleString()} (~$${costs.usdTotal})`;
  };

  const handleCopyQuote = () => {
    const text = compileQuoteText();
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleShareQuote = async () => {
    const text = compileQuoteText();
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'FamilyVisa.ae Itemized Quote',
          text: text,
          url: window.location.href,
        });
      } catch {
        // Fall back if user canceled share sheet
      }
    } else {
      const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md overflow-y-auto"
        >
          {/* Modal Container with layout animation for smooth dynamic height shifts! */}
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', stiffness: 80, damping: 15 }}
            className="w-full max-w-2xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden relative my-auto text-slate-900 dark:text-white transition-colors duration-200"
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-white dark:bg-[#141414] sticky top-0 z-20">
              <div className="flex items-center gap-3">
                {step > 1 && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setStep(step - 1)}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </motion.button>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#E01E37] uppercase">STEP {step} OF 4</span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs font-mono text-slate-400">PASSTHROUGH ENGINE</span>
                  </div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white tracking-tight leading-none mt-0.5">
                    Instant Visa Cost Calculator
                  </h3>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => { resetWizard(); onClose(); }}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-600 dark:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Modal Body with Animated Step Transitions */}
            <div className="p-6 sm:p-8 space-y-6">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: CATEGORY SELECTOR */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                      SELECT RESIDENCY TRACK:
                    </div>

                    <div className="grid sm:grid-cols-3 gap-3">
                      <motion.button
                        whileHover={{ y: -4, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                        onClick={() => handleSelectCategory('family')}
                        className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                          category === 'family'
                            ? 'bg-[#E01E37]/10 border-[#E01E37] text-slate-900 dark:text-white shadow-md'
                            : 'bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 hover:border-[#E01E37]'
                        }`}
                      >
                        <div className="p-2.5 rounded-xl bg-[#E01E37]/15 text-[#E01E37] w-fit mb-4">
                          <Users className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-display font-bold text-sm text-slate-900 dark:text-white">Family Visa</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Spouse, Kids, Parents, Maid</div>
                        </div>
                      </motion.button>

                      <motion.button
                        whileHover={{ y: -4, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                        onClick={() => handleSelectCategory('property')}
                        className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                          category === 'property'
                            ? 'bg-[#E01E37]/10 border-[#E01E37] text-slate-900 dark:text-white shadow-md'
                            : 'bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 hover:border-[#E01E37]'
                        }`}
                      >
                        <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-500 w-fit mb-4">
                          <Crown className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-display font-bold text-sm text-slate-900 dark:text-white">Property Investor</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">2-Yr & 10-Yr Golden Visa</div>
                        </div>
                      </motion.button>

                      <motion.button
                        whileHover={{ y: -4, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                        onClick={() => handleSelectCategory('newborn')}
                        className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                          category === 'newborn'
                            ? 'bg-[#E01E37]/10 border-[#E01E37] text-slate-900 dark:text-white shadow-md'
                            : 'bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 hover:border-[#E01E37]'
                        }`}
                      >
                        <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-500 w-fit mb-4">
                          <Baby className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-display font-bold text-sm text-slate-900 dark:text-white">Newborn Baby</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">120-Day Clearance</div>
                        </div>
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: SUB-CATEGORY SELECTOR */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                      SELECT SPECIFIC SERVICE TYPE:
                    </div>

                    <div className="space-y-2.5">
                      {category === 'family' && (
                        <>
                          <motion.button
                            whileHover={{ x: 4 }}
                            onClick={() => handleSelectSubCategory('spouse')}
                            className="w-full p-4 rounded-2xl border text-left flex items-center justify-between bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 hover:border-[#E01E37] cursor-pointer group"
                          >
                            <div>
                              <div className="font-bold text-sm text-slate-900 dark:text-white">Spouse Residence Visa</div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">2-Year dependant visa for husband or wife</div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                          </motion.button>

                          <motion.button
                            whileHover={{ x: 4 }}
                            onClick={() => handleSelectSubCategory('children')}
                            className="w-full p-4 rounded-2xl border text-left flex items-center justify-between bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 hover:border-[#E01E37] cursor-pointer group"
                          >
                            <div>
                              <div className="font-bold text-sm text-slate-900 dark:text-white">Children Dependant Visa</div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">Sons (up to age 25) & unmarried daughters</div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                          </motion.button>

                          <motion.button
                            whileHover={{ x: 4 }}
                            onClick={() => handleSelectSubCategory('parents')}
                            className="w-full p-4 rounded-2xl border text-left flex items-center justify-between bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 hover:border-[#E01E37] cursor-pointer group"
                          >
                            <div>
                              <div className="font-bold text-sm text-slate-900 dark:text-white">Parents Residence Visa</div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">1-Year renewable senior residency visa</div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                          </motion.button>

                          <motion.button
                            whileHover={{ x: 4 }}
                            onClick={() => handleSelectSubCategory('maid')}
                            className="w-full p-4 rounded-2xl border text-left flex items-center justify-between bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 hover:border-[#E01E37] cursor-pointer group"
                          >
                            <div>
                              <div className="font-bold text-sm text-slate-900 dark:text-white">Maid & Domestic Helper Visa</div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">Tadbeer & MOHRE official domestic worker visa</div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                          </motion.button>
                        </>
                      )}

                      {category === 'property' && (
                        <>
                          <motion.button
                            whileHover={{ x: 4 }}
                            onClick={() => handleSelectSubCategory('10-year-golden')}
                            className="w-full p-4 rounded-2xl border text-left flex items-center justify-between bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 hover:border-[#E01E37] cursor-pointer group"
                          >
                            <div>
                              <div className="font-bold text-sm text-slate-900 dark:text-white">10-Year Property Golden Visa</div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">Property value AED 2,000,000+</div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                          </motion.button>

                          <motion.button
                            whileHover={{ x: 4 }}
                            onClick={() => handleSelectSubCategory('2-year-investor')}
                            className="w-full p-4 rounded-2xl border text-left flex items-center justify-between bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 hover:border-[#E01E37] cursor-pointer group"
                          >
                            <div>
                              <div className="font-bold text-sm text-slate-900 dark:text-white">2-Year Property Investor Visa</div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">Completed residential property AED 750,000+</div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                          </motion.button>
                        </>
                      )}

                      {category === 'newborn' && (
                        <motion.button
                          whileHover={{ x: 4 }}
                          onClick={() => handleSelectSubCategory('infant')}
                          className="w-full p-4 rounded-2xl border text-left flex items-center justify-between bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 hover:border-[#E01E37] cursor-pointer group"
                        >
                          <div>
                            <div className="font-bold text-sm text-slate-900 dark:text-white">Newborn Baby Residence Clearance</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Infant born inside the UAE (within 120 days)</div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: LOCATION STATUS */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                      CURRENT LOCATION OF APPLICANT:
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <motion.button
                        whileHover={{ y: -3, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelectLocation('inside')}
                        className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                          locationStatus === 'inside'
                            ? 'bg-[#E01E37]/10 border-[#E01E37] text-slate-900 dark:text-white shadow-md'
                            : 'bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 hover:border-[#E01E37]'
                        }`}
                      >
                        <div className="p-2.5 rounded-xl bg-[#E01E37]/15 text-[#E01E37] w-fit mb-3">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-slate-900 dark:text-white">Inside the UAE</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Requires In-Country Status Amendment (AED 1,150)</div>
                        </div>
                      </motion.button>

                      <motion.button
                        whileHover={{ y: -3, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelectLocation('outside')}
                        className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                          locationStatus === 'outside'
                            ? 'bg-[#E01E37]/10 border-[#E01E37] text-slate-900 dark:text-white shadow-md'
                            : 'bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 hover:border-[#E01E37]'
                        }`}
                      >
                        <div className="p-2.5 rounded-xl bg-blue-500/15 text-blue-500 w-fit mb-3">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-slate-900 dark:text-white">Outside the UAE</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Standard digital entry permit issuance</div>
                        </div>
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: ITEMISED COST BREAKDOWN & UTILITY ACTION BAR */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    {/* Selected Summary Badge */}
                    <div className="flex items-center justify-between text-xs font-mono bg-slate-100 dark:bg-white/5 p-3 rounded-xl border border-slate-200 dark:border-white/10">
                      <span className="font-bold text-slate-900 dark:text-white">{getCategoryLabel()}</span>
                      <span className="text-[#E01E37] font-semibold">
                        {locationStatus === 'inside' ? 'Inside UAE Status' : 'Outside UAE Status'}
                      </span>
                    </div>

                    {/* Itemized Table */}
                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 pb-2 border-b border-slate-200 dark:border-white/10">
                        <span>FEE BREAKDOWN ITEM</span>
                        <span>AMOUNT</span>
                      </div>

                      <div className="space-y-2 text-xs font-mono text-slate-700 dark:text-slate-300">
                        <div className="flex justify-between">
                          <span>Statutory Government Tariff</span>
                          <span>AED {costs.govTariff.toLocaleString()}</span>
                        </div>

                        {costs.statusChangeFee > 0 && (
                          <div className="flex justify-between text-purple-600 dark:text-purple-400">
                            <span>In-Country Status Amendment</span>
                            <span>AED {costs.statusChangeFee.toLocaleString()}</span>
                          </div>
                        )}

                        <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                          <span>Advisory Retainer Fee</span>
                          <span>AED {costs.advisoryRetainer.toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between pt-3 border-t border-slate-200 dark:border-white/10 font-bold text-sm text-slate-900 dark:text-white">
                          <span>TOTAL ESTIMATED INVESTMENT</span>
                          <span className="text-[#E01E37]">AED {costs.grandTotal.toLocaleString()} (~${costs.usdTotal})</span>
                        </div>
                      </div>
                    </div>

                    {/* Utility Action Bar */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      
                      {/* Button 1: Copy Quote */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCopyQuote}
                        className="py-3 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-500" />
                            <span className="text-emerald-500">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                            <span>Copy Breakdown</span>
                          </>
                        )}
                      </motion.button>

                      {/* Button 2: Share Quote */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleShareQuote}
                        className="py-3 px-4 bg-[#E01E37] hover:bg-[#B81A2C] text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-md shadow-[#E01E37]/20 cursor-pointer"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Share Quote</span>
                      </motion.button>

                      {/* Button 3: Recalculate */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={resetWizard}
                        className="py-3 px-4 bg-transparent hover:bg-[#E01E37]/10 text-[#E01E37] border border-[#E01E37]/20 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Recalculate</span>
                      </motion.button>

                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
