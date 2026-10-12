'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Award,
  Building,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Calculator,
  MessageSquare,
  FileCheck,
  Stethoscope,
  IdCard,
  Building2,
  Clock,
  TrendingUp,
  ChevronRight,
  Star,
  FileText,
  Scale,
  Check,
  Crown,
  Heart,
  Baby
} from 'lucide-react';
import LogoMarquee from '../src/components/LogoMarquee';
import PersonaSelector from '../src/components/PersonaSelector';
import GoogleReviewCard from '../src/components/GoogleReviewCard';
import WhatsAppIcon from '../src/components/WhatsAppIcon';

export default function HomePage() {
  const [propertyVal, setPropertyVal] = useState('2,000,000');
  const [selectedRoute, setSelectedRoute] = useState('golden');

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
      transition: { type: 'spring', stiffness: 100, damping: 20 }
    }
  };

  const processSteps = [
    { num: "01", title: "Document Audit", sub: "Goal & File Review", desc: "Thorough pre-audit of title deeds, salary certificates, and legal attestations to guarantee 100% GDRFA approval.", icon: FileCheck },
    { num: "02", title: "Legal Attestation", sub: "MOFA & Embassy", desc: "Fast-track foreign embassy legalization, degree attestation, and certified Arabic legal translation.", icon: FileText },
    { num: "03", title: "Entry Permit Typing", sub: "ICP / GDRFA Portal", desc: "Direct e-channel entry permit typing and express in-country visa status change without exiting the UAE.", icon: Building },
    { num: "04", title: "VIP Medical & Biometrics", sub: "Priority Escort", desc: "30-minute escorted VIP medical fitness screening and smart card biometrics typing with zero queues.", icon: Stethoscope },
    { num: "05", title: "GDRFA Approval", sub: "10-Year Stamp", desc: "Official GDRFA residency visa approval, 10-year Golden Visa stamping, and digital Emirates ID issuance.", icon: Award },
    { num: "06", title: "Emirates ID Delivery", sub: "Doorstep Handover", desc: "Physical delivery of your printed Emirates ID smart card, official trade license, and portal credentials.", icon: IdCard }
  ];

  return (
    <main className="w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased overflow-x-hidden selection:bg-[#D4AF37] selection:text-slate-950">
      
      {/* =========================================================================
          1. HERO SECTION — Edge-to-Edge Deep Dark Canvas (bg-slate-950)
             Unified with Neo-Corporate Gold (#D4AF37) Aesthetics & Ambient Bloom
          ========================================================================= */}
      <section className="relative w-full bg-slate-950 text-white pt-16 pb-24 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/30 overflow-hidden">
        
        {/* Ambient Gold Radial Arc Bloom */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#D4AF37]/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-[1340px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6">
            
            {/* Gold Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#F3E5AB] text-xs font-extrabold uppercase tracking-widest self-start shadow-inner">
              <Crown className="w-4 h-4 text-[#D4AF37]" />
              <span>GDRFA & ICP CERTIFIED UAE CONSULTANCY</span>
            </div>

            {/* Massive Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.06]">
              Secure Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B8860B] font-black">
                Dubai Golden Residency
              </span> & Visas.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed max-w-2xl">
              Official 10-Year Golden Visas, DLD Real Estate Investor Visas, Family Residency, and 24H VIP Emirates ID processing. Zero hidden markups, transparent government tariffs, and dedicated advisors.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="https://wa.me/971501234567"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-amber-400 via-[#D4AF37] to-amber-500 text-slate-950 px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_4px_25px_rgba(212,175,55,0.4)] hover:scale-105 transition-all cursor-pointer"
              >
                <ShieldCheck className="w-5 h-5 text-slate-950" />
                <span>Start Free Assessment</span>
                <ArrowRight className="w-4 h-4 text-slate-950 stroke-[3]" />
              </a>

              <a
                href="#calculator-section"
                className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 hover:border-[#D4AF37] px-8 py-4 rounded-xl font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Calculator className="w-5 h-5 text-[#D4AF37]" />
                <span>Calculate Fees</span>
              </a>
            </div>

            {/* Key Trust Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-800 max-w-xl">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">15,000+</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">Visas Approved</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#D4AF37] font-mono">10-Year</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">Golden Residency</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">24-48 Hours</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">Fast SLA SLA</div>
              </div>
            </div>

          </div>

          {/* Right Hero Interactive Calculator Preview Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-slate-900/90 border-2 border-[#D4AF37]/50 rounded-[28px] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative backdrop-blur-xl">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div>
                  <span className="text-[10px] font-mono font-extrabold text-[#D4AF37] uppercase tracking-wider block">Official Tariff Calculator</span>
                  <h3 className="text-lg font-extrabold text-white">Residency Fee Estimator</h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                  <Calculator className="w-5 h-5" />
                </div>
              </div>

              {/* Input Group */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-[11px] font-extrabold text-slate-300 uppercase tracking-wider mb-2">Property / Equity Value (AED)</label>
                  <input
                    type="text"
                    value={propertyVal}
                    onChange={(e) => setPropertyVal(e.target.value)}
                    placeholder="e.g. 2,000,000"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white font-mono font-bold focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'golden', name: '10-Yr Golden' },
                    { id: 'property', name: '2-Yr Property' },
                    { id: 'family', name: 'Family' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedRoute(tab.id)}
                      className={`py-2 px-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                        selectedRoute === tab.id
                          ? 'bg-[#D4AF37] text-slate-950 shadow-md font-black'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculation Result Preview Box */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 mb-6 space-y-2">
                <div className="flex justify-between text-xs text-slate-400 font-medium">
                  <span>Government & Authority Fees</span>
                  <span className="font-mono font-bold text-white">AED {selectedRoute === 'golden' ? '9,421.00' : selectedRoute === 'property' ? '6,850.00' : '4,630.00'}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400 font-medium">
                  <span>Professional Admin Typing</span>
                  <span className="font-mono font-bold text-[#D4AF37]">AED {selectedRoute === 'golden' ? '2,450.00' : selectedRoute === 'property' ? '2,150.00' : '1,450.00'}</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                  <span className="text-xs font-extrabold text-white uppercase">Est. Total Fee</span>
                  <span className="text-xl font-extrabold text-[#D4AF37] font-mono">AED {selectedRoute === 'golden' ? '11,871.00' : selectedRoute === 'property' ? '9,000.00' : '6,080.00'}</span>
                </div>
              </div>

              <a
                href="https://wa.me/971501234567"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-emerald-600 text-white font-extrabold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>Confirm Live Breakdown</span>
              </a>

            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. THE X-STRAP MARQUEE — Luxury Dark Slate (bg-slate-900) & Gold Text (#D4AF37)
             Overlapping Geometries (-rotate-3 and rotate-3)
          ========================================================================= */}
      <section className="relative w-full py-16 overflow-hidden bg-slate-950 border-b border-slate-800">
        <div className="relative w-full max-w-[1500px] mx-auto h-[160px] flex items-center justify-center">
          
          {/* Strap 1: Rotated -3 degrees */}
          <div className="absolute w-[110%] bg-slate-900 text-white py-4 shadow-2xl border-y-2 border-[#D4AF37]/50 origin-center transform -rotate-3 z-10 flex items-center whitespace-nowrap overflow-hidden">
            <div className="flex items-center gap-8 text-sm font-extrabold tracking-widest uppercase font-mono animate-marquee text-[#D4AF37]">
              <span className="flex items-center gap-2 text-[#D4AF37]"><Sparkles className="w-4 h-4" /> GDRFA OFFICIAL TYPING CENTER</span>
              <span className="text-white">•</span>
              <span className="text-white">10-YEAR GOLDEN VISA APPROVAL SLA</span>
              <span className="text-white">•</span>
              <span className="flex items-center gap-2 text-[#D4AF37]"><ShieldCheck className="w-4 h-4" /> 100% TRANSPARENT GOVERNMENT FEES</span>
              <span className="text-white">•</span>
              <span className="text-white">EXPRESS 24H EMIRATES ID & MEDICAL FITNESS</span>
              <span className="text-white">•</span>
              <span className="flex items-center gap-2 text-[#D4AF37]"><Award className="w-4 h-4" /> DLD PROPERTY INVESTOR SPECIALISTS</span>
              <span className="text-white">•</span>
            </div>
            <div className="flex items-center gap-8 text-sm font-extrabold tracking-widest uppercase font-mono animate-marquee text-[#D4AF37]" aria-hidden="true">
              <span className="flex items-center gap-2 text-[#D4AF37]"><Sparkles className="w-4 h-4" /> GDRFA OFFICIAL TYPING CENTER</span>
              <span className="text-white">•</span>
              <span className="text-white">10-YEAR GOLDEN VISA APPROVAL SLA</span>
              <span className="text-white">•</span>
              <span className="flex items-center gap-2 text-[#D4AF37]"><ShieldCheck className="w-4 h-4" /> 100% TRANSPARENT GOVERNMENT FEES</span>
              <span className="text-white">•</span>
              <span className="text-white">EXPRESS 24H EMIRATES ID & MEDICAL FITNESS</span>
              <span className="text-white">•</span>
              <span className="flex items-center gap-2 text-[#D4AF37]"><Award className="w-4 h-4" /> DLD PROPERTY INVESTOR SPECIALISTS</span>
              <span className="text-white">•</span>
            </div>
          </div>

          {/* Strap 2: Rotated +3 degrees */}
          <div className="absolute w-[110%] bg-slate-900 text-[#D4AF37] py-4 shadow-2xl border-y-2 border-[#D4AF37]/50 origin-center transform rotate-3 z-20 flex items-center whitespace-nowrap overflow-hidden">
            <div className="flex items-center gap-8 text-sm font-extrabold tracking-widest uppercase font-mono animate-marquee-reverse">
              <span className="flex items-center gap-2 text-white"><Building2 className="w-4 h-4 text-[#D4AF37]" /> PROPERTY INVESTOR VISA AED 2M+</span>
              <span>•</span>
              <span className="text-white">FAMILY RESIDENCE SPONSORSHIP</span>
              <span>•</span>
              <span className="flex items-center gap-2 text-white"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> ZERO THIRD-PARTY OUTSOURCING</span>
              <span>•</span>
              <span className="text-white">VIP EXPRESS CONCIERGE DESK</span>
              <span>•</span>
              <span className="flex items-center gap-2 text-white"><Users className="w-4 h-4 text-[#D4AF37]" /> 15,000+ SATISFIED RESIDENTS</span>
              <span>•</span>
            </div>
            <div className="flex items-center gap-8 text-sm font-extrabold tracking-widest uppercase font-mono animate-marquee-reverse" aria-hidden="true">
              <span className="flex items-center gap-2 text-white"><Building2 className="w-4 h-4 text-[#D4AF37]" /> PROPERTY INVESTOR VISA AED 2M+</span>
              <span>•</span>
              <span className="text-white">FAMILY RESIDENCE SPONSORSHIP</span>
              <span>•</span>
              <span className="flex items-center gap-2 text-white"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> ZERO THIRD-PARTY OUTSOURCING</span>
              <span>•</span>
              <span className="text-white">VIP EXPRESS CONCIERGE DESK</span>
              <span>•</span>
              <span className="flex items-center gap-2 text-white"><Users className="w-4 h-4 text-[#D4AF37]" /> 15,000+ SATISFIED RESIDENTS</span>
              <span>•</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Logo Marquee */}
      <section className="py-8 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <LogoMarquee />
      </section>

      {/* =========================================================================
          4. CORE SERVICES GRID (JURISDICTION TABS) — Pure bg-white (dark:bg-slate-900)
             Clean border-slate-200, bg-slate-100 tab pill, active tab #D4AF37 gold
          ========================================================================= */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-[1300px] mx-auto">
        <PersonaSelector />

        <div className="mb-14 text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono font-extrabold text-[#D4AF37] uppercase tracking-widest bg-amber-500/10 px-3.5 py-1 rounded-full border border-[#D4AF37]/30">
            OFFICIAL GOVERNMENT DIRECTORY
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Our Flagship Residency Services
          </h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium text-base sm:text-lg">
            Tailored UAE residency, Golden Visa, and legal documentation packages handled directly through official government portals.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
        >
          {[
            { tag: 'DLD Title Deed', title: 'Property Investor Visa', desc: 'Secure a 2-Year or 10-Year residency through Dubai real estate investment (AED 750k+ or AED 2M+).', icon: Building2, price: 'From AED 2,150' },
            { tag: '10-Year VIP', title: 'UAE Golden Visa', desc: 'Long-term 10-year residency for property owners, high earners (AED 30k+ salary), and executives.', icon: Award, price: 'From AED 2,450' },
            { tag: 'Spouse & Child', title: 'Family Sponsorship', desc: 'Sponsor your spouse, children, and parents with 100% SLA clearance and document verification.', icon: Users, price: 'From AED 1,450' },
            { tag: 'Tadbeer Quota', title: 'Domestic Worker / Maid Visa', desc: 'Complete MOHRE and GDRFA legal sponsorship for housemaids, nannies, and private drivers.', icon: FileCheck, price: 'From AED 1,650' },
            { tag: '24H VIP Express', title: 'Emirates ID & DHA Medical', desc: 'Fast-track VIP medical fitness testing and smart card biometrics typing.', icon: IdCard, price: 'From AED 390' },
            { tag: 'Corporate PRO', title: 'Business Setup & License Renewal', desc: 'Mainland & Freezone corporate PRO services, MOHRE quota additions, and license renewals.', icon: TrendingUp, price: 'Custom Retainers' },
          ].map((srv, i) => {
            const IconComp = srv.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[24px] p-7 hover:border-[#D4AF37] shadow-lg hover:shadow-[0_12px_40px_rgba(212,175,55,0.15)] transition-all duration-300 group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold text-[#D4AF37] bg-amber-500/10 px-3 py-1 rounded-full border border-[#D4AF37]/30">
                      {srv.tag}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-slate-950 transition-all shadow-sm">
                      <IconComp className="w-5.5 h-5.5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 font-medium text-sm leading-relaxed mb-6">
                    {srv.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
                    {srv.price}
                  </span>
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-[#D4AF37] flex items-center gap-1 transition-colors">
                    Learn More <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* =========================================================================
          5. WHY CHOOSE US (800 DOCS ADVANTAGE)
          ========================================================================= */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-[1300px] mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-extrabold text-[#D4AF37] uppercase tracking-widest bg-amber-500/10 px-3.5 py-1 rounded-full border border-[#D4AF37]/30">
              TRUSTED UAE GOVERNMENT PARTNER
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              The 800 DOCS Corporate Advantage
            </h2>
            <p className="text-slate-600 dark:text-slate-400 font-medium text-base sm:text-lg">
              We eliminate immigration delays through direct portal access and strict SLA compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Direct Government Portal Access',
                desc: 'As a certified typing center, we process applications directly inside ICP and GDRFA portals. Zero third-party handoffs or outsourced agents.',
                icon: ShieldCheck
              },
              {
                step: '02',
                title: '100% Transparent Itemized Receipts',
                desc: 'Every official government fee and typing charge is separated clearly on your invoice. No hidden fees or unexpected surcharges.',
                icon: CheckCircle2
              },
              {
                step: '03',
                title: 'End-to-End VIP Concierge',
                desc: 'From DLD property valuation audits to DHA medical appointments and biometrics typing, our team accompanies your workflow step by step.',
                icon: Award
              }
            ].map((item, i) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="bg-white dark:bg-slate-900 rounded-[24px] p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl font-extrabold font-mono text-[#D4AF37]">{item.step}</span>
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center">
                        <IconComponent className="w-6 h-6" />
                      </div>
                    </div>

                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium text-sm leading-relaxed">{item.desc}</p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-extrabold text-[#D4AF37]">
                    <span>100% SLA Guarantee</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          6. THE PROCESS SECTION (REBUILT FROM SCRATCH WITH TAILWIND & REACT)
             ZERO PLACEHOLDER IMAGES — 6 Clean Rounded Cards with #D4AF37 Gold Borders
          ========================================================================= */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-[1300px] mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-extrabold text-[#D4AF37] uppercase tracking-widest bg-amber-500/10 px-3.5 py-1 rounded-full border border-[#D4AF37]/30">
            OUR 6-STEP WORKFLOW
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Seamless Application Workflow
          </h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium text-base sm:text-lg">
            Continuous expert processing from start to finish with zero delays.
          </p>
        </div>

        {/* Rebuilt 6-Step Grid (grid-cols-1 md:grid-cols-3 gap-8) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processSteps.map((step, i) => {
            const StepIcon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-900 border-2 border-[#D4AF37]/40 hover:border-[#D4AF37] rounded-[24px] p-8 shadow-lg hover:shadow-[0_12px_40px_rgba(212,175,55,0.2)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Step Badge + Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="w-12 h-12 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] font-black text-lg font-mono flex items-center justify-center border border-[#D4AF37]/40 shadow-sm">
                      {step.num}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 text-[#D4AF37] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <StepIcon className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="text-xs font-extrabold text-[#D4AF37] uppercase tracking-wider mb-1 font-mono">{step.sub}</div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3 group-hover:text-[#D4AF37] transition-colors">{step.num}. {step.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{step.desc}</p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-extrabold text-slate-400 font-mono">
                  <span>STAGE {step.num} / 06</span>
                  <span className="text-[#D4AF37] flex items-center gap-1">VERIFIED <CheckCircle2 className="w-3.5 h-3.5" /></span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Process Bottom Note Pill */}
        <div className="mt-12 p-4 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-center max-w-2xl mx-auto flex items-center justify-center gap-3">
          <Clock className="w-5 h-5 text-[#D4AF37] shrink-0" />
          <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100">Processing is continuous. We handle ongoing renewals, PRO services, and document updates.</span>
        </div>

      </section>

      {/* =========================================================================
          7. TESTIMONIALS — Soft bg-slate-900 Background with High-Contrast Text
             and 5 #D4AF37 Gold Stars
          ========================================================================= */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-[1300px] mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-extrabold text-[#D4AF37] uppercase tracking-widest bg-[#D4AF37]/15 px-3.5 py-1 rounded-full border border-[#D4AF37]/30">
              VERIFIED CLIENT REVIEWS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              4.9★ Rated on Google (500+ Reviews)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Alexander V.",
                role: "Property Investor",
                tag: "Golden Visa 10-Yr",
                review: "Got my 10-year Golden Visa issued within 4 days of purchasing my Dubai Marina property. Incredible VIP service by the 800 DOCS team."
              },
              {
                name: "Sarah Jenkins",
                role: "Family Sponsor",
                tag: "Family Sponsorship",
                review: "Incredibly efficient team. They handled my entire family's residency visas within a week. No hidden fees, exactly as quoted."
              },
              {
                name: "Dmitry R.",
                role: "Tech Entrepreneur",
                tag: "Business Setup",
                review: "Set up my DED mainland trade license and sponsored my family in less than a week. Highly recommended PROs."
              }
            ].map((rev, idx) => (
              <div key={idx} className="p-8 rounded-[24px] bg-slate-950 border border-slate-800 hover:border-[#D4AF37]/60 shadow-xl flex flex-col justify-between transition-all">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex gap-1 text-[#D4AF37]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4.5 h-4.5 fill-current text-[#D4AF37]" />
                      ))}
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-[#D4AF37]/15 text-[#D4AF37] uppercase tracking-wider">
                      {rev.tag}
                    </span>
                  </div>

                  <p className="text-sm text-slate-300 font-medium leading-relaxed mb-8">
                    "{rev.review}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-extrabold text-base text-white">{rev.name}</div>
                    <div className="text-xs font-semibold text-[#D4AF37]">{rev.role}</div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          8. THE BOTTOM APP CTA — Massive Rounded Container (rounded-[40px])
             bg-slate-900 Canvas, 2x2 Feature Grid, Zero Orange Graphics
          ========================================================================= */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-[1150px] mx-auto bg-slate-900 text-white border-2 border-[#D4AF37]/40 rounded-[40px] p-8 sm:p-14 md:p-16 shadow-[0_25px_60px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          {/* Top Gold Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#F3E5AB] text-xs font-extrabold uppercase tracking-widest mb-6">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>ALL-IN-ONE UAE RESIDENCY PLATFORM</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 text-white">
            Ready to Begin Your UAE Visa Process?
          </h2>

          <p className="text-slate-300 font-medium text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Get your documents pre-audited by our senior typing consultants today. Receive an itemized government fee breakdown and instant eligibility confirmation.
          </p>

          {/* 2x2 Abstract Clean Feature Grid (No Orange Graphics) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10 text-left">
            {[
              { title: "Direct GDRFA Portal Access", desc: "100% official typing with zero third-party agent handoffs." },
              { title: "Transparent Tariff Receipts", desc: "Government fees billed at exact cost with official receipts." },
              { title: "24-48 Hour SLA Guarantee", desc: "Express status change and VIP medical biometrics slots." },
              { title: "Dedicated PRO Case Officer", desc: "1-on-1 legal representation throughout your file." }
            ].map((feat, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-800/60 border border-white/10 flex items-start gap-3">
                <div className="p-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-white">{feat.title}</div>
                  <div className="text-[11px] font-medium text-slate-400 leading-tight">{feat.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://wa.me/971501234567"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#25D366] hover:bg-emerald-600 text-white font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-xl flex items-center justify-center gap-3 shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current" />
              <span>WhatsApp Senior Advisor</span>
            </a>

            <a
              href="#calculator-section"
              className="w-full sm:w-auto bg-[#D4AF37] hover:bg-[#B8860B] text-slate-950 font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-slate-950" />
              <span>Calculate Fees Online</span>
            </a>
          </div>

          <div className="mt-8 text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            Certified GDRFA & DET Partner • License 800 DOCS LLC SOC
          </div>
        </motion.div>
      </section>

    </main>
  );
}
