'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  Building2, 
  MessageSquare, 
  ArrowRight, 
  FileText, 
  Lock, 
  Info,
  Calendar,
  AlertCircle,
  BadgeCheck,
  CheckSquare,
  Square,
  Sparkles,
  Users,
  CreditCard,
  Briefcase,
  Award,
  Globe,
  FileCheck2,
  XCircle,
  UploadCloud,
  Calculator,
  Scale,
  Video,
  Layers,
  HeartHandshake,
  DollarSign,
  TrendingUp,
  Sliders,
  Sparkle
} from 'lucide-react';

// ============================================================================
// CORE PREVIOUS WIDGETS
// ============================================================================

export function HeroWithStatusChecker({ data }) {
  const [passportNumber, setPassportNumber] = useState('');
  const [nationality, setNationality] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const handleVerify = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hello! I want to check my UAE Visa Status & Fines.\n\n` +
      `Passport No: ${passportNumber}\n` +
      `Nationality: ${nationality}\n` +
      `Expiry Date: ${expiryDate}`
    );
    window.open(`https://wa.me/971566556645?text=${text}`, '_blank');
  };

  return (
    <section className="relative w-full pt-16 pb-16 md:pt-20 md:pb-24 px-6 overflow-hidden border-b border-slate-200 dark:border-white/10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-goldBg/10 via-slate-50 to-slate-50 dark:via-[#050505] dark:to-[#050505]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
        
        <div className="lg:col-span-7 flex flex-col items-start pt-0 lg:pt-8 space-y-6">
          <span className="inline-block px-3.5 py-1.5 bg-brand-goldBg/10 border border-brand-goldBg/30 text-brand-goldText text-xs font-mono font-bold rounded-[10px] uppercase tracking-wider">
            GDRFA & ICP OFFICIAL PORTAL LOOKUP
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            Check UAE Visa Status & Overstay Fines Online
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-normal leading-relaxed max-w-2xl">
            Instantly verify your Dubai residence permit validity, active entry permit status, or overstay fine calculation through our direct GDRFA clearance PRO team.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {[
              "Direct GDRFA Query",
              "Instant Overstay Audit",
              "100% Confidential"
            ].map((item, idx) => (
              <div key={idx} className="bg-white/80 dark:bg-[#111111]/80 backdrop-blur-lg border border-slate-200/60 dark:border-white/10 p-4 rounded-2xl flex hover:shadow-[0_10px_20px_rgba(212,175,55,0.05)] hover:-translate-y-1 transition-all duration-300 items-center justify-center gap-2 shadow-sm dark:shadow-none">
                <CheckCircle2 className="w-4 h-4 text-brand-goldText shrink-0" />
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-white dark:bg-[#111111] backdrop-blur-md border border-brand-goldBg/30 p-6 sm:p-8 rounded-[10px] shadow-sm dark:shadow-none space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#B8860B] via-[#F3E5AB] to-[#B8860B]" />

            <div className="border-b border-slate-200 dark:border-white/10 pb-4">
              <span className="bg-brand-goldBg/20 text-brand-goldText border border-brand-goldBg/40 text-[10px] font-mono font-bold px-2.5 py-1 rounded-[10px] inline-block uppercase tracking-wider mb-2">
                FREE PASSPORT AUDIT
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Instant Visa & Fine Verification</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Get an official status report directly on WhatsApp.</p>
            </div>

            <form onSubmit={handleVerify} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase font-mono">Passport Number</label>
                <input
                  type="text"
                  value={passportNumber}
                  onChange={(e) => setPassportNumber(e.target.value)}
                  placeholder="e.g. A12345678"
                  required
                  className="w-full bg-slate-50 dark:bg-[#050505] border border-slate-200 dark:border-white/10 rounded-[10px] px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-brand-goldBg focus:outline-none transition-all text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase font-mono">Nationality / Country</label>
                <input
                  type="text"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  placeholder="e.g. British / Indian / Russian"
                  required
                  className="w-full bg-slate-50 dark:bg-[#050505] border border-slate-200 dark:border-white/10 rounded-[10px] px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-brand-goldBg focus:outline-none transition-all text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase font-mono">Passport Expiry Date</label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  required
                  className="w-full bg-slate-50 dark:bg-[#050505] border border-slate-200 dark:border-white/10 rounded-[10px] px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-brand-goldBg focus:outline-none transition-all text-xs font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-brand-goldBg hover:opacity-90 text-white font-extrabold rounded-[10px] transition-opacity shadow-[0_0_20px_rgba(212,175,55,0.3)] text-xs uppercase font-mono tracking-wider cursor-pointer flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Verify Visa Status on WhatsApp</span>
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}

export function OverstayCountdownWidget() {
  return (
    <section className="py-12 px-6 bg-slate-50 dark:bg-[#050505] border-t border-slate-200 dark:border-white/10">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-[#111111] border-2 border-red-500/40 p-6 sm:p-8 rounded-[10px] shadow-sm dark:shadow-none relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-[10px] bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 dark:text-red-400 shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="inline-block bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-[10px] uppercase">
                STRICT 120-DAY GRACE PERIOD RULE
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Avoid AED 50/Day Newborn Overstay Fines</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
                Under GDRFA regulations, parents have exactly <strong>120 days from the birth date</strong> of a baby born in Dubai to issue a birth certificate, passport, and residence visa. After 120 days, a fine of AED 50 per day is charged automatically.
              </p>
            </div>
          </div>

          <button
            onClick={() => window.open('https://wa.me/971566556645?text=I%20need%20urgent%20help%20with%20a%20newborn%20baby%20visa', '_blank')}
            className="w-full md:w-auto px-6 py-3.5 bg-red-500 hover:bg-red-600 text-white font-bold text-xs uppercase font-mono rounded-[10px] transition-colors shrink-0 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-500/20"
          >
            <Clock className="w-4 h-4" />
            <span>Fast-Track Baby Visa Filing</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export function SalaryRequirementNotice() {
  return (
    <section className="py-12 px-6 bg-slate-50 dark:bg-[#050505] border-t border-slate-200 dark:border-white/10">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-[#111111] border border-brand-goldBg/30 p-6 sm:p-8 rounded-[10px] shadow-sm dark:shadow-none relative overflow-hidden grid md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <span className="inline-block bg-brand-goldBg/20 text-brand-goldText border border-brand-goldBg/40 text-[10px] font-mono font-bold px-2.5 py-1 rounded-[10px] uppercase">
              MOHRE SPONSORSHIP CRITERIA
            </span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">AED 25,000 Minimum Household Salary Rule</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              To sponsor a domestic worker, housemaid, or nanny in Dubai, MOHRE requires the head of the family to demonstrate a minimum monthly salary of <strong>AED 25,000</strong> (proven by a stamped salary certificate & 3-month bank statement) and an active <strong>2-bedroom Ejari tenancy agreement</strong>.
            </p>
          </div>

          <div className="md:col-span-4 bg-slate-50 dark:bg-[#050505] border border-slate-200 dark:border-white/10 p-5 rounded-[10px] text-center space-y-2">
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Minimum Income Threshold</span>
            <div className="text-3xl font-black text-brand-goldText font-mono">AED 25,000</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Monthly Household Salary</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinesWarningBanner() {
  return (
    <section className="py-12 px-6 bg-slate-50 dark:bg-[#050505] border-t border-slate-200 dark:border-white/10">
      <div className="max-w-5xl mx-auto bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 p-6 sm:p-8 rounded-[10px] space-y-4 shadow-sm dark:shadow-none">
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-white/10 pb-4">
          <AlertCircle className="w-6 h-6 text-brand-goldText shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Official UAE Overstay Fine Structure</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Unified fines enforced across Dubai GDRFA & Federal ICP portals.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-50 dark:bg-[#050505] border border-slate-200 dark:border-white/10 p-4 rounded-[10px] space-y-1">
            <span className="text-slate-500 dark:text-slate-400 font-mono block text-[10px]">RESIDENCE VISA OVERSTAY</span>
            <div className="text-xl font-extrabold text-slate-900 dark:text-white font-mono">AED 50 / Day</div>
            <p className="text-[11px] text-slate-500">Billed daily after 30-day grace period.</p>
          </div>

          <div className="bg-slate-50 dark:bg-[#050505] border border-slate-200 dark:border-white/10 p-4 rounded-[10px] space-y-1">
            <span className="text-slate-500 dark:text-slate-400 font-mono block text-[10px]">VISIT / TOURIST VISA OVERSTAY</span>
            <div className="text-xl font-extrabold text-slate-900 dark:text-white font-mono">AED 50 / Day</div>
            <p className="text-[11px] text-slate-500">Plus AED 200/300 outpass clearance fee.</p>
          </div>

          <div className="bg-slate-50 dark:bg-[#050505] border border-slate-200 dark:border-white/10 p-4 rounded-[10px] space-y-1">
            <span className="text-slate-500 dark:text-slate-400 font-mono block text-[10px]">FINE WAIVER / OUTPASS</span>
            <div className="text-xl font-extrabold text-brand-goldText font-mono">PRO Representation</div>
            <p className="text-[11px] text-slate-500">We request official reduction from GDRFA.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 1. PROPERTY VISA WIDGETS
// ============================================================================
export function DLDValuationCalculator() {
  const [propType, setPropType] = useState('ready');
  const [value, setValue] = useState(2000000);

  const isEligible10Yr = value >= 2000000;
  const isEligible2Yr = value >= 750000;

  return (
    <section className="py-12 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-5xl mx-auto bg-white dark:bg-[#111111] rounded-[10px] shadow-sm dark:shadow-none relative">
        
        {/* Premium Top Border Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-70" />

        <div className="p-6 sm:p-8 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-white/10 pb-6">
            <div className="space-y-1.5">
              <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 text-[10px] font-mono font-bold px-2.5 py-1 rounded-[10px] uppercase tracking-wider">
                Instant Visa Calculator
              </span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">DLD Valuation & Eligibility Calculator</h3>
            </div>
            
            <div className="flex bg-slate-100 dark:bg-[#1a1a1a] p-1 rounded-[12px] border border-slate-200 dark:border-white/5 shadow-inner">
              <button
                onClick={() => setPropType('ready')}
                className={`px-5 py-2.5 rounded-[10px] text-xs font-bold transition-all duration-300 ${
                  propType === 'ready' 
                    ? 'bg-gradient-to-b from-[#F3E5AB] to-[#D4AF37] text-black shadow-md' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Ready Property
              </button>
              <button
                onClick={() => setPropType('offplan')}
                className={`px-5 py-2.5 rounded-[10px] text-xs font-bold transition-all duration-300 ${
                  propType === 'offplan' 
                    ? 'bg-gradient-to-b from-[#F3E5AB] to-[#D4AF37] text-black shadow-md' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Off-Plan (Oqood)
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-500 dark:text-slate-400">Total Property Valuation (DLD Title Deed):</span>
              <span className="text-brand-goldText font-bold text-base">AED {value.toLocaleString()}</span>
            </div>

            <input
              type="range"
              min="500000"
              max="10000000"
              step="100000"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="w-full accent-brand-goldBg bg-slate-200 dark:bg-[#050505] rounded-[10px] h-2 cursor-pointer"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className={`relative p-5 rounded-[12px] border transition-all duration-500 overflow-hidden ${
                isEligible2Yr ? 'bg-gradient-to-br from-[#D4AF37]/10 to-transparent border-[#D4AF37]/40 shadow-[0_0_15px_rgba(212,175,55,0.1)]' : 'bg-slate-50 dark:bg-[#050505] border-slate-200 dark:border-white/5 opacity-70 grayscale'
              }`}>
                {isEligible2Yr && <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/20 blur-2xl rounded-full -mr-10 -mt-10" />}
                <div className="relative z-10 flex items-center justify-between font-mono text-xs font-bold mb-2">
                  <span className={isEligible2Yr ? 'text-slate-900 dark:text-white' : 'text-slate-500'}>2-Year Investor Residency</span>
                  <span className={isEligible2Yr ? 'text-[#B8860B] dark:text-[#D4AF37] drop-shadow-sm' : 'text-slate-400'}>
                    {isEligible2Yr ? '✓ ELIGIBLE' : 'Min AED 750K'}
                  </span>
                </div>
                <p className="relative z-10 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">Requires minimum AED 750,000 Title Deed value.</p>
              </div>

              <div className={`relative p-5 rounded-[12px] border transition-all duration-500 overflow-hidden ${
                isEligible10Yr ? 'bg-gradient-to-br from-[#D4AF37]/10 to-transparent border-[#D4AF37]/40 shadow-[0_0_15px_rgba(212,175,55,0.1)]' : 'bg-slate-50 dark:bg-[#050505] border-slate-200 dark:border-white/5 opacity-70 grayscale'
              }`}>
                {isEligible10Yr && <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/20 blur-2xl rounded-full -mr-10 -mt-10" />}
                <div className="relative z-10 flex items-center justify-between font-mono text-xs font-bold mb-2">
                  <span className={isEligible10Yr ? 'text-slate-900 dark:text-white' : 'text-slate-500'}>10-Year Golden Visa</span>
                  <span className={isEligible10Yr ? 'text-[#B8860B] dark:text-[#D4AF37] drop-shadow-sm' : 'text-slate-400'}>
                    {isEligible10Yr ? '✓ ELIGIBLE' : 'Min AED 2M'}
                  </span>
                </div>
                <p className="relative z-10 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">Requires minimum AED 2,000,000 equity (Ready or Off-Plan).</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => window.open(`https://wa.me/971566556645?text=I%20want%20to%20verify%20my%20DLD%20Title%20Deed%20valuation%20of%20AED%20${value}`, '_blank')}
            className="w-full py-4 bg-dark-gold-gloss text-slate-950 font-black text-sm uppercase tracking-wider rounded-[10px] hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 shadow-[0_8px_20px_rgba(212,175,55,0.25)] hover:shadow-[0_10px_25px_rgba(212,175,55,0.35)] flex items-center justify-center gap-2"
          >
            <span>Calculate Property Visa &rarr;</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export function InvestmentBentoGrid() {
  return (
    <section className="py-16 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 text-[10px] font-mono font-bold px-2.5 py-1 rounded-[10px] uppercase tracking-wider mb-1">
            Comparative Thresholds
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">2-Year Investor vs 10-Year Golden Visa</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-8 rounded-[12px] bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none hover:border-[#D4AF37]/40 transition-all duration-500 group flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-[#1a1a1a] px-2 py-1 rounded-md">2-YEAR TRACK</span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-4">Property Residency</h3>
              <div className="text-3xl font-black text-[#B8860B] dark:text-[#D4AF37] font-mono mt-4">AED 750,000</div>
            </div>
            <ul className="space-y-3.5 text-xs text-slate-600 dark:text-slate-400 mt-8 border-t border-slate-200 dark:border-white/5 pt-6">
              <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" /> Requires completed ready property with DLD Title Deed</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" /> Mortgaged property allowed with bank NOC</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" /> Sponsor spouse and dependent children</li>
            </ul>
          </div>

          <div className="relative p-8 rounded-[12px] bg-gradient-to-b from-white to-slate-50 dark:from-[#111111] dark:to-[#0a0a0a] border-2 border-[#D4AF37]/50 shadow-[0_8px_30px_rgba(212,175,55,0.15)] hover:shadow-[0_12px_40px_rgba(212,175,55,0.25)] hover:-translate-y-1 transition-all duration-500 group flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4AF37]/10 blur-3xl rounded-full -mr-10 -mt-10" />
            <div className="relative z-10">
              <span className="text-[10px] font-bold font-mono text-[#4A3B18] dark:text-[#F3E5AB] uppercase tracking-widest bg-[#D4AF37]/20 px-2 py-1 rounded-md">10-YEAR GOLDEN TRACK</span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-4">10-Year Property Golden Visa</h3>
              <div className="text-3xl font-black bg-gold-text-shine bg-clip-text text-transparent font-mono mt-4">AED 2,000,000</div>
            </div>
            <ul className="relative z-10 space-y-3.5 text-xs text-slate-600 dark:text-slate-300 mt-8 border-t border-[#D4AF37]/20 pt-6">
              <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" /> Off-Plan Oqood properties accepted from approved developers</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" /> Zero UAE stay requirement (visit once per year)</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" /> Sponsor unlimited domestic workers, drivers, and parents</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DeedDocumentTabs() {
  const [tab, setTab] = useState('single');

  return (
    <section className="py-12 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/5 p-8 rounded-[12px] space-y-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-none relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 blur-3xl rounded-full -mr-20 -mt-20 pointer-events-none" />
        
        <h3 className="text-xl font-black text-slate-900 dark:text-white text-center relative z-10 tracking-tight">Title Deed Requirement Checklist</h3>
        
        <div className="relative z-10 flex bg-slate-100 dark:bg-[#1a1a1a] p-1.5 rounded-[12px] border border-slate-200 dark:border-white/5 shadow-inner">
          {['single', 'joint', 'mortgaged'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-3 rounded-[10px] text-xs font-bold capitalize transition-all duration-300 ${
                tab === t 
                  ? 'bg-gradient-to-b from-[#F3E5AB] to-[#D4AF37] text-black shadow-md' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'
              }`}
            >
              {t} Ownership
            </button>
          ))}
        </div>

        <div className="relative z-10 space-y-3.5 text-sm text-slate-600 dark:text-slate-300">
          {tab === 'single' && (
            <>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-[#1a1a1a] border border-transparent hover:border-[#D4AF37]/20 transition-all duration-300"><CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" /> Original DLD Title Deed under single owner name</div>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-[#1a1a1a] border border-transparent hover:border-[#D4AF37]/20 transition-all duration-300"><CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" /> Passport scan (valid &gt; 6 months) & EID copy</div>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-[#1a1a1a] border border-transparent hover:border-[#D4AF37]/20 transition-all duration-300"><CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" /> Dubai Police Good Conduct Certificate</div>
            </>
          )}
          {tab === 'joint' && (
            <>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-[#1a1a1a] border border-transparent hover:border-[#D4AF37]/20 transition-all duration-300"><CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" /> Title Deed showing combined value ≥ AED 2M (Spouses combined allowed)</div>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-[#1a1a1a] border border-transparent hover:border-[#D4AF37]/20 transition-all duration-300"><CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" /> MOFA-attested marriage certificate with sworn Arabic translation</div>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-[#1a1a1a] border border-transparent hover:border-[#D4AF37]/20 transition-all duration-300"><CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" /> Joint owner NOC consent letter</div>
            </>
          )}
          {tab === 'mortgaged' && (
            <>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-[#1a1a1a] border border-transparent hover:border-[#D4AF37]/20 transition-all duration-300"><CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" /> Bank NOC letter stating paid-up equity amount</div>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-[#1a1a1a] border border-transparent hover:border-[#D4AF37]/20 transition-all duration-300"><CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" /> Paid equity must equal or exceed AED 750k (2-Yr) or AED 2M (10-Yr)</div>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-[#1a1a1a] border border-transparent hover:border-[#D4AF37]/20 transition-all duration-300"><CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" /> Official bank statement confirming mortgage clearance schedule</div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 2. FAMILY VISA WIDGETS
// ============================================================================
export function FamilyQuotaCalculator() {
  const [spouse, setSpouse] = useState(1);
  const [children, setChildren] = useState(2);

  const totalFee = 3500 + (spouse * 2200) + (children * 1850);

  return (
    <section className="py-12 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#111111] border border-brand-goldBg/30 p-6 rounded-[10px] shadow-sm dark:shadow-none space-y-6">
        <div className="border-b border-slate-200 dark:border-white/10 pb-4">
          <span className="text-[10px] font-mono text-brand-goldText uppercase font-bold">FEES CALCULATOR</span>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">Family Sponsorship Fee Calculator</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-500 dark:text-slate-400 font-bold mb-2">Spouse (Husband / Wife)</label>
              <div className="flex items-center gap-3 bg-slate-50 dark:bg-[#050505] p-2 rounded-[10px] border border-slate-200 dark:border-white/10">
                <button onClick={() => setSpouse(Math.max(0, spouse - 1))} className="w-8 h-8 bg-slate-200 dark:bg-white/10 rounded-[10px] text-slate-900 dark:text-white font-bold">-</button>
                <span className="flex-1 text-center font-mono font-bold text-slate-900 dark:text-white text-base">{spouse}</span>
                <button onClick={() => setSpouse(spouse + 1)} className="w-8 h-8 bg-brand-goldBg text-white font-bold rounded-[10px]">+</button>
              </div>
            </div>

            <div>
              <label className="block text-slate-500 dark:text-slate-400 font-bold mb-2">Children (Sons / Daughters)</label>
              <div className="flex items-center gap-3 bg-slate-50 dark:bg-[#050505] p-2 rounded-[10px] border border-slate-200 dark:border-white/10">
                <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-8 h-8 bg-slate-200 dark:bg-white/10 rounded-[10px] text-slate-900 dark:text-white font-bold">-</button>
                <span className="flex-1 text-center font-mono font-bold text-slate-900 dark:text-white text-base">{children}</span>
                <button onClick={() => setChildren(children + 1)} className="w-8 h-8 bg-brand-goldBg text-white font-bold rounded-[10px]">+</button>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-[#050505] border border-brand-goldBg/30 p-5 rounded-[10px] flex flex-col justify-between space-y-4">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">ESTIMATED GOVT & FILE FILING COST</span>
            <div className="text-3xl font-black text-brand-goldText font-mono">AED {totalFee.toLocaleString()}</div>
            <button
              onClick={() => window.open(`https://wa.me/971566556645?text=Family%20Visa%20Quote%20for%20${spouse}%20Spouse%20and%20${children}%20Children`, '_blank')}
              className="w-full py-3 bg-brand-goldBg text-white font-extrabold text-xs uppercase font-mono rounded-[10px]"
            >
              Get Itemized Breakdown
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SalaryWarningAlert() {
  return (
    <section className="py-8 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#111111] border border-amber-500/40 p-6 rounded-[10px] flex items-start gap-4 shadow-sm dark:shadow-none">
        <AlertTriangle className="w-6 h-6 text-amber-500 dark:text-amber-400 shrink-0 mt-1" />
        <div className="space-y-1 text-xs">
          <span className="font-mono text-amber-600 dark:text-amber-400 font-bold uppercase">MOHRE & GDRFA MANDATORY RULES</span>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">Sponsor Salary & Ejari Prerequisites</h4>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
            Minimum monthly salary required to sponsor family in Dubai is <strong>AED 4,000</strong> (or AED 3,000 + accommodation). An active attested <strong>Ejari Tenancy Contract</strong> under sponsor's name is strictly required.
          </p>
        </div>
      </div>
    </section>
  );
}

export function SponsorVsDependentTabs() {
  const [tab, setTab] = useState('sponsor');
  return (
    <section className="py-12 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 p-6 rounded-[10px] space-y-4 shadow-sm dark:shadow-none">
        <div className="flex bg-slate-100 dark:bg-[#050505] p-1 rounded-[10px] border border-slate-200 dark:border-white/10">
          <button onClick={() => setTab('sponsor')} className={`flex-1 py-2 rounded-[10px] text-xs font-bold ${tab === 'sponsor' ? 'bg-brand-goldBg text-white' : 'text-slate-500 dark:text-slate-400'}`}>Sponsor Documents</button>
          <button onClick={() => setTab('dependent')} className={`flex-1 py-2 rounded-[10px] text-xs font-bold ${tab === 'dependent' ? 'bg-brand-goldBg text-white' : 'text-slate-500 dark:text-slate-400'}`}>Dependent Documents</button>
        </div>
        <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
          {tab === 'sponsor' ? (
            <>
              <div>✓ Passport & Emirates ID Copy</div>
              <div>✓ Salary Certificate & 3-Month Bank Statement</div>
              <div>✓ Attested Ejari Tenancy Contract</div>
            </>
          ) : (
            <>
              <div>✓ Dependent Passport Copy (&gt; 6 months validity)</div>
              <div>✓ MOFA Attested Marriage / Birth Certificate</div>
              <div>✓ Passport Photos (White Background)</div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 3. GOLDEN VISA WIDGETS
// ============================================================================
export function CategoryTrackSelector() {
  const [track, setTrack] = useState('executive');

  const info = {
    executive: { title: "Executive Directors & CEOs", req: "AED 30,000/month basic salary, Bachelor's degree, NOC letter from employer." },
    talent: { title: "Specialized Talent & Scientists", req: "Recommendation letter from Dubai Culture, Mohammed Bin Rashid Council of Scientists, or Patent holder." },
    doctor: { title: "Doctors & Healthcare Professionals", req: "Active DHA/DOH license, minimum 10 years medical experience or specialization." },
    entrepreneur: { title: "Entrepreneurs & Business Founders", req: "Approved business project valued at AED 500k+ or Auditor letter from UAE incubator." }
  };

  return (
    <section className="py-12 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-5xl mx-auto bg-white dark:bg-[#111111] border border-brand-goldBg/30 p-6 rounded-[10px] space-y-6 shadow-sm dark:shadow-none">
        <h3 className="text-2xl font-black text-slate-900 dark:text-white text-center">10-Year Golden Visa Nomination Category Selector</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-slate-100 dark:bg-[#050505] p-2 rounded-[10px] border border-slate-200 dark:border-white/10">
          {Object.keys(info).map((key) => (
            <button
              key={key}
              onClick={() => setTrack(key)}
              className={`py-3 px-2 rounded-[10px] text-xs font-bold uppercase transition-all ${
                track === key ? 'bg-brand-goldBg text-white font-black' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {key}
            </button>
          ))}
        </div>

        <div className="p-6 bg-slate-50 dark:bg-[#050505] border border-brand-goldBg/20 rounded-[10px] space-y-3">
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">{info[track].title}</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{info[track].req}</p>
          <button
            onClick={() => window.open(`https://wa.me/971566556645?text=Check%20Golden%20Visa%20eligibility%20for%20${track}`, '_blank')}
            className="px-6 py-2.5 bg-brand-goldBg text-white font-extrabold text-xs rounded-[10px] uppercase font-mono"
          >
            Check Category Nominee Eligibility
          </button>
        </div>
      </div>
    </section>
  );
}

export function PrivilegeMatrix() {
  return (
    <section className="py-12 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-5xl mx-auto bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 p-6 rounded-[10px] space-y-6 shadow-sm dark:shadow-none">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center">Standard Visa vs 10-Year Golden Visa Privilege Matrix</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-500 dark:text-slate-400">
            <thead className="bg-slate-100 dark:bg-[#050505] text-slate-900 dark:text-white font-mono uppercase text-[11px] border-b border-slate-200 dark:border-white/10">
              <tr>
                <th className="p-3">Privilege / Feature</th>
                <th className="p-3">Standard Residence Visa</th>
                <th className="p-3 text-brand-goldText">10-Year Golden Visa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/5">
              <tr>
                <td className="p-3 font-bold text-slate-900 dark:text-white">Sponsor Requirement</td>
                <td className="p-3 text-slate-500 dark:text-slate-400">Employer / Local Sponsor Required</td>
                <td className="p-3 text-brand-goldText font-bold">100% Self-Sponsored</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900 dark:text-white">Stay Exemption Limit</td>
                <td className="p-3 text-slate-500 dark:text-slate-400">Max 6 Months Outside UAE</td>
                <td className="p-3 text-brand-goldText font-bold">Unlimited Stay Outside UAE</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900 dark:text-white">Domestic Staff Sponsorship</td>
                <td className="p-3 text-slate-500 dark:text-slate-400">Max 1-2 Maid Quota</td>
                <td className="p-3 text-brand-goldText font-bold">Unlimited Domestic Staff Quota</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 4. NEWBORN VISA WIDGETS
// ============================================================================
export function GracePeriodCountdown() {
  return (
    <section className="py-8 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#111111] border-2 border-red-500/40 p-6 rounded-[10px] flex items-center justify-between gap-4 shadow-sm dark:shadow-none">
        <div className="flex items-center gap-3">
          <Clock className="w-8 h-8 text-red-500 dark:text-red-400 shrink-0" />
          <div>
            <span className="bg-red-500/20 text-red-600 dark:text-red-400 text-[10px] font-mono px-2 py-0.5 rounded-[10px] uppercase font-bold">URGENT DEADLINE</span>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Strict 120-Day Grace Period Rule</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">AED 50/day fine applies automatically after 120 days from hospital birth.</p>
          </div>
        </div>
        <button onClick={() => window.open('https://wa.me/971566556645?text=Newborn%20Baby%20Visa%20Urgent', '_blank')} className="px-5 py-3 bg-red-500 text-white font-bold text-xs uppercase font-mono rounded-[10px] shrink-0">
          Fast-Track Filing
        </button>
      </div>
    </section>
  );
}

export function ZeroContactWorkflow() {
  return (
    <section className="py-12 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-5xl mx-auto bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 p-6 rounded-[10px] space-y-6 shadow-sm dark:shadow-none">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center">Zero-Contact Hospital-to-Home Pipeline</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center text-xs">
          <div className="bg-slate-50 dark:bg-[#050505] p-4 rounded-[10px] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-medium">1. Hospital Birth Cert</div>
          <div className="bg-slate-50 dark:bg-[#050505] p-4 rounded-[10px] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-medium">2. MOFA Attestation</div>
          <div className="bg-slate-50 dark:bg-[#050505] p-4 rounded-[10px] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-medium">3. Embassy Passport</div>
          <div className="bg-slate-50 dark:bg-[#050505] p-4 rounded-[10px] border border-brand-goldBg/40 text-brand-goldText font-bold">4. GDRFA E-Visa Delivered</div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 5. MAID VISA WIDGETS
// ============================================================================
export function DomesticSalaryGate() {
  return (
    <section className="py-8 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#111111] border border-brand-goldBg/30 p-6 rounded-[10px] space-y-2 shadow-sm dark:shadow-none">
        <span className="bg-brand-goldBg/20 text-brand-goldText text-[10px] font-mono px-2 py-0.5 rounded-[10px] font-bold uppercase">MOHRE SPONSOR RULE</span>
        <h4 className="text-xl font-bold text-slate-900 dark:text-white">AED 25,000 Household Salary Gate</h4>
        <p className="text-xs text-slate-500 dark:text-slate-400">Golden Visa holders enjoy an official exemption badge allowing maid sponsorship without standard minimum salary caps.</p>
      </div>
    </section>
  );
}

export function LocationToggleWidget() {
  const [loc, setLoc] = useState('incountry');
  return (
    <section className="py-12 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 p-6 rounded-[10px] space-y-6 shadow-sm dark:shadow-none">
        <div className="flex bg-slate-100 dark:bg-[#050505] p-1 rounded-[10px] border border-slate-200 dark:border-white/10">
          <button onClick={() => setLoc('incountry')} className={`flex-1 py-2.5 rounded-[10px] text-xs font-bold ${loc === 'incountry' ? 'bg-brand-goldBg text-white' : 'text-slate-500 dark:text-slate-400'}`}>Hiring In-Country (AED 6,500)</button>
          <button onClick={() => setLoc('overseas')} className={`flex-1 py-2.5 rounded-[10px] text-xs font-bold ${loc === 'overseas' ? 'bg-brand-goldBg text-white' : 'text-slate-500 dark:text-slate-400'}`}>Overseas Recruitment (AED 5,200)</button>
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {loc === 'incountry' ? 'Includes in-country status change paper, medical fitness escort, MOHRE work permit & EID.' : 'Includes overseas entry permit, airport arrival clearance & 48-hr medical appointment.'}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 6. EMIRATES ID WIDGETS
// ============================================================================
export function EIDServiceTabs() {
  const [type, setType] = useState('new');
  return (
    <section className="py-12 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#111111] border border-brand-goldBg/30 p-6 rounded-[10px] space-y-6 shadow-sm dark:shadow-none">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center">Emirates ID (ICP Smart Card) Concierge</h3>
        <div className="flex bg-slate-100 dark:bg-[#050505] p-1 rounded-[10px] border border-slate-200 dark:border-white/10">
          <button onClick={() => setType('new')} className={`flex-1 py-2 text-xs font-bold rounded-[10px] ${type === 'new' ? 'bg-brand-goldBg text-white' : 'text-slate-500 dark:text-slate-400'}`}>New Application</button>
          <button onClick={() => setType('renewal')} className={`flex-1 py-2 text-xs font-bold rounded-[10px] ${type === 'renewal' ? 'bg-brand-goldBg text-white' : 'text-slate-500 dark:text-slate-400'}`}>Residency Renewal</button>
          <button onClick={() => setType('replacement')} className={`flex-1 py-2 text-xs font-bold rounded-[10px] ${type === 'replacement' ? 'bg-brand-goldBg text-white' : 'text-slate-500 dark:text-slate-400'}`}>Lost / Replacement</button>
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400 text-center font-mono">
          Official ICP Typing Fee: AED 370 (2-Year) / AED 730 (10-Year)
        </div>
      </div>
    </section>
  );
}

export function BiometricExemptionGuide() {
  return (
    <section className="py-12 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 p-6 rounded-[10px] space-y-4 shadow-sm dark:shadow-none">
        <h4 className="text-lg font-bold text-slate-900 dark:text-white">Biometric Fingerprinting Exemption Guide</h4>
        <div className="grid grid-cols-2 gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="bg-slate-50 dark:bg-[#050505] p-4 rounded-[10px] border border-slate-200 dark:border-white/10">
            <span className="text-[#B8860B] dark:text-emerald-400 font-bold block">✓ EXEMPT FROM BIOMETRICS</span>
            Renewal applicants with existing biometric data on ICP system.
          </div>
          <div className="bg-slate-50 dark:bg-[#050505] p-4 rounded-[10px] border border-slate-200 dark:border-white/10">
            <span className="text-brand-goldText font-bold block">⚡ REQUIRE BIOMETRICS</span>
            First-time applicants & individuals updating fingerprint data.
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 7. PRO SERVICES WIDGETS
// ============================================================================
export function CorporateOnboardingForm() {
  return (
    <section className="py-12 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#111111] border border-brand-goldBg/30 p-6 rounded-[10px] space-y-4 shadow-sm dark:shadow-none">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Corporate PRO Portal Takeover</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">Manage MOHRE labor quotas, DET trade licenses, and employee visas.</p>
        <button onClick={() => window.open('https://wa.me/971566556645?text=Corporate%20PRO%20Audit', '_blank')} className="w-full py-3 bg-brand-goldBg text-white font-extrabold text-xs uppercase font-mono rounded-[10px]">
          Request Enterprise Audit
        </button>
      </div>
    </section>
  );
}

export function JurisdictionDashboard() {
  return (
    <section className="py-12 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 p-6 rounded-[10px] space-y-4 shadow-sm dark:shadow-none">
        <h4 className="text-lg font-bold text-slate-900 dark:text-white">Mainland DET vs Freezone Authority Portal Rules</h4>
        <div className="grid md:grid-cols-2 gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="bg-slate-50 dark:bg-[#050505] p-4 rounded-[10px] border border-slate-200 dark:border-white/10">Mainland: Subject to MOHRE WPS Payroll & Quotas.</div>
          <div className="bg-slate-50 dark:bg-[#050505] p-4 rounded-[10px] border border-slate-200 dark:border-white/10">Freezone: Managed under DMCC, DDA, or JAFZA portals.</div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 8. AMER CENTER WIDGETS
// ============================================================================
export function AppTrackerWidget() {
  const [ref, setRef] = useState('');
  return (
    <section className="py-12 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#111111] border border-brand-goldBg/30 p-6 rounded-[10px] space-y-4 shadow-sm dark:shadow-none">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Live GDRFA Application Tracker</h3>
        <div className="flex gap-2">
          <input value={ref} onChange={(e) => setRef(e.target.value)} placeholder="e.g. GDRFA-2026-98412X" className="flex-1 bg-slate-50 dark:bg-[#050505] border border-slate-200 dark:border-white/10 rounded-[10px] px-4 text-xs text-slate-900 dark:text-white" />
          <button onClick={() => window.open(`https://wa.me/971566556645?text=Track%20GDRFA%20${ref}`, '_blank')} className="px-6 py-3 bg-brand-goldBg text-white font-extrabold text-xs uppercase font-mono rounded-[10px]">Track</button>
        </div>
      </div>
    </section>
  );
}

export function DigitalVsPhysicalSplit() {
  return (
    <section className="py-12 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 text-xs">
        <div className="bg-white dark:bg-[#111111] border border-red-500/20 p-6 rounded-[10px] space-y-2 shadow-sm dark:shadow-none">
          <span className="text-red-600 dark:text-red-400 font-bold">Physical Amer Center</span>
          <p className="text-slate-500 dark:text-slate-400">1-3 hours queue wait, risk of typing errors, multiple center visits.</p>
        </div>
        <div className="bg-white dark:bg-[#111111] border border-brand-goldBg/40 p-6 rounded-[10px] space-y-2 shadow-md dark:shadow-none">
          <span className="text-brand-goldText font-bold">100% Digital Platform</span>
          <p className="text-slate-700 dark:text-slate-200">Instant WhatsApp upload, dual AI pre-audit, zero physical visits.</p>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 9. DOCUMENT ATTESTATION WIDGETS
// ============================================================================
export function GlobalLegalizationPipeline() {
  return (
    <section className="py-12 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 p-6 rounded-[10px] space-y-6 shadow-sm dark:shadow-none">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center">3-Stage Legalization Pipeline</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs">
          <div className="bg-slate-50 dark:bg-[#050505] p-4 rounded-[10px] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white">1. Home Country Foreign Affairs</div>
          <div className="bg-slate-50 dark:bg-[#050505] p-4 rounded-[10px] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white">2. UAE Embassy Origin</div>
          <div className="bg-slate-50 dark:bg-[#050505] p-4 rounded-[10px] border border-brand-goldBg/40 text-brand-goldText font-bold">3. UAE MOFA Legalization</div>
        </div>
      </div>
    </section>
  );
}

export function SpeedBentoGrid() {
  return (
    <section className="py-12 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 text-xs">
        <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 p-6 rounded-[10px] space-y-2 shadow-sm dark:shadow-none">
          <h4 className="text-base font-bold text-slate-900 dark:text-white">Standard Attestation (5-7 Days)</h4>
          <p className="text-slate-500 dark:text-slate-400">Regular diplomatic pouch delivery & MOFA seal.</p>
        </div>
        <div className="bg-white dark:bg-[#111111] border border-brand-goldBg/40 p-6 rounded-[10px] space-y-2 shadow-md dark:shadow-none">
          <h4 className="text-base font-bold text-slate-900 dark:text-white">Express 24-Hour VIP</h4>
          <p className="text-slate-700 dark:text-slate-200">Same-day MOFA priority stamping & dedicated courier.</p>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 10. LEGAL TRANSLATION WIDGETS
// ============================================================================
export function InstantWordEstimator() {
  return (
    <section className="py-12 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#111111] border border-brand-goldBg/30 p-6 rounded-[10px] space-y-4 text-center shadow-sm dark:shadow-none">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Ministry of Justice Sworn Translation Estimator</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">Upload document scan for instant page count & Arabic certification quote.</p>
        <button onClick={() => window.open('https://wa.me/971566556645?text=Legal%20Translation%20Quote', '_blank')} className="px-6 py-3 bg-brand-goldBg text-white font-extrabold text-xs uppercase font-mono rounded-[10px]">
          Upload Document Scan
        </button>
      </div>
    </section>
  );
}

export function LanguagePairGrid() {
  return (
    <section className="py-8 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 p-6 rounded-[10px] space-y-3 text-xs text-slate-500 dark:text-slate-400 shadow-sm dark:shadow-none">
        <h4 className="text-base font-bold text-slate-900 dark:text-white">Certified Language Pairings to Arabic</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center font-mono">
          <div className="bg-slate-50 dark:bg-[#050505] p-3 rounded-[10px]">English ➔ Arabic</div>
          <div className="bg-slate-50 dark:bg-[#050505] p-3 rounded-[10px]">French ➔ Arabic</div>
          <div className="bg-slate-50 dark:bg-[#050505] p-3 rounded-[10px]">Russian ➔ Arabic</div>
          <div className="bg-slate-50 dark:bg-[#050505] p-3 rounded-[10px]">German ➔ Arabic</div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 11. POWER OF ATTORNEY WIDGETS
// ============================================================================
export function RemoteVideoWorkflow() {
  return (
    <section className="py-12 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 p-6 rounded-[10px] space-y-6 shadow-sm dark:shadow-none">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center">Dubai Courts Remote Video Notarization</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center text-xs">
          <div className="bg-slate-50 dark:bg-[#050505] p-4 rounded-[10px] text-slate-900 dark:text-white font-medium">1. Draft Bilingual POA</div>
          <div className="bg-slate-50 dark:bg-[#050505] p-4 rounded-[10px] text-slate-900 dark:text-white font-medium">2. Botim Video Session</div>
          <div className="bg-slate-50 dark:bg-[#050505] p-4 rounded-[10px] text-slate-900 dark:text-white font-medium">3. E-Signature Stamp</div>
          <div className="bg-slate-50 dark:bg-[#050505] p-4 rounded-[10px] border border-brand-goldBg/40 text-brand-goldText font-bold">4. Digital POA Issued</div>
        </div>
      </div>
    </section>
  );
}

export function POAScopeSelector() {
  const [scope, setScope] = useState('realestate');
  return (
    <section className="py-12 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#111111] border border-brand-goldBg/30 p-6 rounded-[10px] space-y-4 shadow-sm dark:shadow-none">
        <div className="flex bg-slate-100 dark:bg-[#050505] p-1 rounded-[10px] border border-slate-200 dark:border-white/10">
          <button onClick={() => setScope('realestate')} className={`flex-1 py-2 text-xs font-bold rounded-[10px] ${scope === 'realestate' ? 'bg-brand-goldBg text-white' : 'text-slate-500 dark:text-slate-400'}`}>Real Estate POA</button>
          <button onClick={() => setScope('vehicle')} className={`flex-1 py-2 text-xs font-bold rounded-[10px] ${scope === 'vehicle' ? 'bg-brand-goldBg text-white' : 'text-slate-500 dark:text-slate-400'}`}>Vehicle POA</button>
          <button onClick={() => setScope('business')} className={`flex-1 py-2 text-xs font-bold rounded-[10px] ${scope === 'business' ? 'bg-brand-goldBg text-white' : 'text-slate-500 dark:text-slate-400'}`}>General Business POA</button>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 12. WILLS & TESTAMENT WIDGETS
// ============================================================================
export function JurisdictionBento() {
  return (
    <section className="py-12 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 text-xs">
        <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 p-6 rounded-[10px] space-y-2 shadow-sm dark:shadow-none">
          <h4 className="text-base font-bold text-slate-900 dark:text-white">DIFC Courts Will (Common Law)</h4>
          <p className="text-slate-500 dark:text-slate-400">Full freedom of asset distribution under English Common Law principles.</p>
        </div>
        <div className="bg-white dark:bg-[#111111] border border-brand-goldBg/40 p-6 rounded-[10px] space-y-2 shadow-md dark:shadow-none">
          <h4 className="text-base font-bold text-slate-900 dark:text-white">ADJD Civil Family Court Will</h4>
          <p className="text-slate-700 dark:text-slate-200">Civil law registration for UAE non-Muslim residents across all Emirates.</p>
        </div>
      </div>
    </section>
  );
}

export function AssetProtectionModules() {
  return (
    <section className="py-12 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 p-6 rounded-[10px] space-y-4 text-xs shadow-sm dark:shadow-none">
        <h4 className="text-lg font-bold text-slate-900 dark:text-white text-center">Asset Protection Scope Options</h4>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-slate-50 dark:bg-[#050505] p-4 rounded-[10px] text-slate-900 dark:text-white font-medium">Full Estate Will</div>
          <div className="bg-slate-50 dark:bg-[#050505] p-4 rounded-[10px] text-slate-900 dark:text-white font-medium">Real Estate Only Will</div>
          <div className="bg-slate-50 dark:bg-[#050505] p-4 rounded-[10px] text-slate-900 dark:text-white font-medium">Guardianship Will</div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 13. DLD TRUSTEE SERVICES WIDGETS
// ============================================================================
export function DLDTransferCalculator() {
  const [price, setPrice] = useState(2500000);
  const dldFee = price * 0.04;
  const trusteeFee = price >= 500000 ? 4200 : 2100;
  const titleDeedFee = 580;

  return (
    <section className="py-12 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#111111] border border-brand-goldBg/30 p-6 rounded-[10px] space-y-6 shadow-sm dark:shadow-none">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">DLD Trustee Property Transfer Calculator</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-500 dark:text-slate-400">Property Transfer Price:</span>
            <span className="text-brand-goldText font-bold">AED {price.toLocaleString()}</span>
          </div>
          <input type="range" min="500000" max="10000000" step="100000" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full bg-slate-200 dark:bg-[#050505]" />
        </div>

        <div className="grid grid-cols-3 gap-3 text-xs font-mono text-center">
          <div className="bg-slate-50 dark:bg-[#050505] p-3 rounded-[10px] text-slate-900 dark:text-white">DLD 4% Fee: AED {dldFee.toLocaleString()}</div>
          <div className="bg-slate-50 dark:bg-[#050505] p-3 rounded-[10px] text-slate-900 dark:text-white">Trustee Fee: AED {trusteeFee.toLocaleString()}</div>
          <div className="bg-slate-50 dark:bg-[#050505] p-3 rounded-[10px] text-slate-900 dark:text-white">Title Deed: AED {titleDeedFee}</div>
        </div>
      </div>
    </section>
  );
}

export function TransactionTypeGrid() {
  return (
    <section className="py-8 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 p-6 rounded-[10px] space-y-3 text-xs shadow-sm dark:shadow-none">
        <h4 className="text-base font-bold text-slate-900 dark:text-white">DLD Registration Trustee Services</h4>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-slate-50 dark:bg-[#050505] p-3 rounded-[10px] text-slate-900 dark:text-white font-medium">Sale & Purchase Transfer</div>
          <div className="bg-slate-50 dark:bg-[#050505] p-3 rounded-[10px] text-slate-900 dark:text-white font-medium">Hiba (Gift) Grant Transfer</div>
          <div className="bg-slate-50 dark:bg-[#050505] p-3 rounded-[10px] text-slate-900 dark:text-white font-medium">Mortgage Registration / Discharge</div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 14. PROPERTY REVALUATION WIDGETS
// ============================================================================
export function EquityUnlockExplainer() {
  return (
    <section className="py-12 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#111111] border border-brand-goldBg/30 p-6 rounded-[10px] space-y-4 text-center text-xs shadow-sm dark:shadow-none">
        <span className="bg-brand-goldBg/20 text-brand-goldText text-[10px] font-mono px-2 py-0.5 rounded-[10px] font-bold uppercase">DLD VALUATION CERTIFICATE</span>
        <h3 className="text-2xl font-black text-slate-900 dark:text-white">Unlock Golden Visa via Property Revaluation</h3>
        <p className="text-slate-500 dark:text-slate-400">Bought at AED 1.5M? If market appreciation raises property value to AED 2M+, an official DLD Valuation Certificate unlocks your 10-Year Golden Visa.</p>
        <button onClick={() => window.open('https://wa.me/971566556645?text=DLD%20Revaluation%20Audit', '_blank')} className="px-6 py-3 bg-brand-goldBg text-white font-extrabold text-xs uppercase font-mono rounded-[10px]">
          Request DLD Valuation Audit
        </button>
      </div>
    </section>
  );
}

// ============================================================================
// 15. VISA VALIDITY CHECKER WIDGETS
// ============================================================================
export function PassportLookupForm() {
  return (
    <section className="py-12 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#111111] border border-brand-goldBg/30 p-6 rounded-[10px] space-y-4 shadow-sm dark:shadow-none">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">ICP / GDRFA Passport Status Lookup</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input placeholder="Passport Number" className="bg-slate-50 dark:bg-[#050505] border border-slate-200 dark:border-white/10 rounded-[10px] p-3 text-xs text-slate-900 dark:text-white" />
          <input placeholder="Nationality" className="bg-slate-50 dark:bg-[#050505] border border-slate-200 dark:border-white/10 rounded-[10px] p-3 text-xs text-slate-900 dark:text-white" />
          <button onClick={() => window.open('https://wa.me/971566556645?text=Check%20Passport%20Status', '_blank')} className="bg-brand-goldBg text-white font-extrabold text-xs uppercase font-mono rounded-[10px] py-3">Audit Record</button>
        </div>
      </div>
    </section>
  );
}

export function OverstayFineCalculator() {
  const [days, setDays] = useState(10);
  const fine = days * 50;
  return (
    <section className="py-12 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 p-6 rounded-[10px] space-y-4 shadow-sm dark:shadow-none">
        <h4 className="text-lg font-bold text-slate-900 dark:text-white">Interactive Overstay Fine Calculator</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-500 dark:text-slate-400">Overstay Days:</span>
            <span className="text-brand-goldText font-bold">{days} Days</span>
          </div>
          <input type="range" min="1" max="180" value={days} onChange={(e) => setDays(Number(e.target.value))} className="w-full bg-slate-200 dark:bg-[#050505]" />
        </div>
        <div className="text-xl font-black text-brand-goldText font-mono text-center">Estimated Fine: AED {fine.toLocaleString()}</div>
      </div>
    </section>
  );
}

// ============================================================================
// 16. MEDICAL & EID PACKAGE WIDGETS
// ============================================================================
export function VIPTierPricing() {
  return (
    <section className="py-12 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 text-xs">
        <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 p-6 rounded-[10px] space-y-3 shadow-sm dark:shadow-none">
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">48-Hour Regular DHA</h4>
          <div className="text-2xl font-mono text-brand-goldText font-bold">AED 850</div>
          <p className="text-slate-500 dark:text-slate-400">Standard health screening & typing.</p>
        </div>
        <div className="bg-white dark:bg-[#111111] border border-brand-goldBg/40 p-6 rounded-[10px] space-y-3 shadow-md dark:shadow-none">
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">24-Hour Express VIP</h4>
          <div className="text-2xl font-mono text-brand-goldText font-bold">AED 1,450</div>
          <p className="text-slate-500 dark:text-slate-400">Priority lab processing & fast EID.</p>
        </div>
        <div className="bg-white dark:bg-[#111111] border border-brand-goldBg p-6 rounded-[10px] space-y-3 shadow-lg dark:shadow-[0_0_30px_rgba(212,175,55,0.15)]">
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">2-Hour Smart Salem Ultra VIP</h4>
          <div className="text-2xl font-mono text-brand-goldText font-bold">AED 2,850</div>
          <p className="text-slate-700 dark:text-slate-200">Private lounge, AI X-ray & chauffeur service.</p>
        </div>
      </div>
    </section>
  );
}

export function LoungeExperienceGallery() {
  return (
    <section className="py-8 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 p-6 rounded-[10px] space-y-3 text-xs text-slate-500 dark:text-slate-400 shadow-sm dark:shadow-none">
        <h4 className="text-base font-bold text-slate-900 dark:text-white text-center">Smart Salem VIP Lounge Experience</h4>
        <div className="grid grid-cols-3 gap-3 text-center font-mono">
          <div className="bg-slate-50 dark:bg-[#050505] p-3 rounded-[10px] text-slate-900 dark:text-white">Private Executive Pods</div>
          <div className="bg-slate-50 dark:bg-[#050505] p-3 rounded-[10px] text-slate-900 dark:text-white">AI Blood & X-Ray Lab</div>
          <div className="bg-slate-50 dark:bg-[#050505] p-3 rounded-[10px] text-slate-900 dark:text-white">Doorstep Chauffeur Escort</div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 17. ILOE INSURANCE WIDGETS
// ============================================================================
export function DeadlineWarningBanner() {
  return (
    <section className="py-8 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#111111] border border-amber-500/40 p-6 rounded-[10px] flex items-center justify-between gap-4 shadow-sm dark:shadow-none">
        <div>
          <span className="bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-mono px-2 py-0.5 rounded-[10px] font-bold uppercase">MANDATORY LAW</span>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">Avoid AED 400 ILOE Non-Registration Fine</h4>
        </div>
        <button onClick={() => window.open('https://wa.me/971566556645?text=Issue%20ILOE%20Policy', '_blank')} className="px-5 py-2.5 bg-brand-goldBg text-white font-extrabold text-xs uppercase font-mono rounded-[10px]">
          Issue Policy Instantly
        </button>
      </div>
    </section>
  );
}

export function SalaryTierSelector() {
  const [tier, setTier] = useState('below');
  return (
    <section className="py-12 px-6 bg-slate-50 dark:bg-[#050505]">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#111111] border border-brand-goldBg/30 p-6 rounded-[10px] space-y-4 shadow-sm dark:shadow-none">
        <div className="flex bg-slate-100 dark:bg-[#050505] p-1 rounded-[10px] border border-slate-200 dark:border-white/10">
          <button onClick={() => setTier('below')} className={`flex-1 py-2 text-xs font-bold rounded-[10px] ${tier === 'below' ? 'bg-brand-goldBg text-white' : 'text-slate-500 dark:text-slate-400'}`}>Basic Salary ≤ AED 16k (AED 60/yr)</button>
          <button onClick={() => setTier('above')} className={`flex-1 py-2 text-xs font-bold rounded-[10px] ${tier === 'above' ? 'bg-brand-goldBg text-white' : 'text-slate-500 dark:text-slate-400'}`}>Basic Salary &gt; AED 16k (AED 120/yr)</button>
        </div>
      </div>
    </section>
  );
}
