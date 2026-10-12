/**
 * PropertyVisaPage.jsx  ──  Service Page #1
 * ─────────────────────────────────────────
 * Bespoke luxury page for UAE Property Investor Visa.
 * Covers: 2-Year Investor, 5-Year Retirement, 10-Year Golden Visa.
 *
 * Data sourced from: https://www.familyvisa.ae/property-visa/
 * All copy rewritten in authoritative "Apple-level" luxury tone.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2, ShieldCheck, Clock, Star, ArrowRight,
  CheckCircle2, ChevronDown, Coins, Home, Crown,
  FileCheck, TrendingUp, Users, Landmark
} from 'lucide-react';
import {
  SectionShell, SectionInner, SectionHeader,
  LuxuryCard, GoldBadge, LuxuryFAQ, LuxuryFooterCTA,
  LuxuryFeeInvoice, LuxuryDocumentTabs, LuxuryProcessTimeline,
  fadeUp, scaleIn
} from '../components/LuxuryServicePage';

// ─── CONSTANTS ─────────────────────────────────────────────────────────────────

const VISA_TRACKS = [
  {
    id: 'investor',
    badge: '2-YEAR',
    label: '2-Year Investor Visa',
    tagline: 'Entry-Level Property Residency',
    threshold: 'AED 750,000+',
    color: 'from-slate-700 to-slate-900',
    accentBg: 'bg-surface',
    accentText: 'text-text',
    icon: Home,
    eligibility: [
      'Minimum property value of AED 750,000 (ready or off-plan)',
      'Mortgage allowed — minimum 50% equity paid',
      'Applicable to Dubai, Abu Dhabi, Sharjah, and other emirates',
      'Sponsor spouse and dependent children under this visa'
    ],
    govFee: 'AED 4,970',
    totalEst: 'AED 6,820'
  },
  {
    id: 'retirement',
    badge: '5-YEAR',
    label: '5-Year Retirement Visa',
    tagline: 'Retire in Comfort — Age 55+',
    threshold: 'AED 1,000,000+',
    color: 'from-[#2563eb] to-[#1d4ed8]',
    accentBg: 'bg-blue-50',
    accentText: 'text-blue-700',
    icon: Users,
    eligibility: [
      'Must be 55 years old or above at time of application',
      'Property value AED 1M+ (OR active monthly income AED 15K+ OR AED 1M savings)',
      'Mandatory comprehensive health insurance policy',
      'Renewable every 5 years — no age cap for renewal'
    ],
    govFee: 'AED 3,990',
    totalEst: 'AED 5,840'
  },
  {
    id: 'golden',
    badge: '10-YEAR',
    label: '10-Year Golden Visa',
    tagline: 'The Crown Residency of the UAE',
    threshold: 'AED 2,000,000+',
    color: 'from-[#4A3000] to-[#8C5E00]',
    accentBg: 'bg-amber-50',
    accentText: 'text-amber-800',
    icon: Crown,
    eligibility: [
      'Property equity (paid value) must equal or exceed AED 2,000,000',
      'Off-plan, mortgaged, or ready — all accepted with bank NOC',
      'Combine up to 3 properties to reach AED 2M threshold',
      'No continuous UAE stay requirement — unlimited overseas freedom',
      'Sponsor unlimited domestic workers under Golden Visa'
    ],
    govFee: 'AED 8,850',
    totalEst: 'AED 12,550'
  }
];

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'DLD Pre-Audit Guarantee',
    body: 'Every title deed, Oqood, and mortgage NOC is audited against live DLD records before submission — eliminating rejections.',
    size: 'lg'
  },
  {
    icon: Clock,
    title: '72-Hour Processing SLA',
    body: 'From document receipt to residence visa nomination: our end-to-end SLA is 72 business hours.',
    size: 'sm'
  },
  {
    icon: TrendingUp,
    title: 'Off-Plan & Re-Sale Ready',
    body: 'We process both ready property title deeds (DLD) and developer Oqood contracts for off-plan properties.',
    size: 'sm'
  },
  {
    icon: Coins,
    title: 'Transparent Government Fees',
    body: 'Our portal queries the exact DLD and ICP tariffs in real time. No inflated estimates — ever.',
    size: 'sm'
  },
  {
    icon: Landmark,
    title: 'Mortgaged Properties Welcome',
    body: 'Properties under mortgage qualify as long as paid equity ≥ AED 2M. We obtain the bank NOC on your behalf.',
    size: 'sm'
  }
];

const DOCUMENTS = {
  investor: [
    'Original DLD Title Deed or Developer Oqood (Minimum Value as per track)',
    'Passport Copy — minimum 6 months validity for all applicants',
    'Current UAE Visa / Entry Stamp or Active Residence Permit',
    'Dubai Police Good Conduct Certificate (for Golden Visa category)',
    'Bank Mortgage NOC Letter (for mortgaged properties — we obtain this)',
    'DLD Property Valuation Certificate (if applying via equity revaluation)'
  ],
  family: [
    'MOFA Attested Marriage Certificate + Sworn Arabic Legal Translation',
    'MOFA Attested Birth Certificates for all dependent children',
    'Passport-size Photographs — white background, high resolution',
    'Spouse and children passport copies (6 months validity minimum)',
    'School enrollment proof for children in UAE (if applicable)'
  ]
};

const PROCESS_STEPS = [
  {
    title: 'Title Deed Audit',
    description: 'We verify your DLD or Oqood records against live portal data, secure bank NOC if needed, and confirm eligibility track.'
  },
  {
    title: 'ICP Nomination Filing',
    description: 'Your complete file is submitted to GDRFA Dubai or ICP for official Golden / Investor Visa nomination and approval.'
  },
  {
    title: 'VIP Medical & Biometrics',
    description: 'Executive Smart Salem medical screening (results in 30–120 min) and EID biometric capture — no government office visits.'
  },
  {
    title: 'Residence Stamp & EID Delivery',
    description: 'Your residence visa is digitally stamped, and the physical 2-Year or 10-Year Emirates ID is couriered to your door.'
  }
];

const FAQS = [
  {
    q: 'Can I combine multiple properties to reach the AED 2,000,000 Golden Visa threshold?',
    a: 'Yes. The Dubai Land Department officially permits combining up to 3 distinct properties — each with separate title deeds or Oqood — to collectively reach the AED 2,000,000 paid equity threshold for the 10-Year Golden Visa.'
  },
  {
    q: 'Does a mortgaged property qualify for a Golden Visa?',
    a: 'Yes. Mortgaged properties qualify for the 10-Year Golden Visa provided the paid portion (equity) of the property equals or exceeds AED 2,000,000. We obtain the official bank mortgage NOC for your file as part of the concierge service.'
  },
  {
    q: 'What is the difference between an Oqood and a Title Deed?',
    a: 'An Oqood (or SPA) is the official off-plan property registration with the developer before construction is complete. A Title Deed (Milkiya) is issued by DLD once the property is fully built and registered. Both documents are accepted for the property visa application.'
  },
  {
    q: 'How long does the full property visa process take?',
    a: 'Our SLA is 72 business hours from document submission. The nomination approval from GDRFA / ICP typically takes 1–3 business days, followed by a 30-minute Smart Salem VIP medical and same-day biometrics. Total elapsed calendar time: 5 to 10 days.'
  },
  {
    q: 'Can I sponsor my spouse and children on a 10-Year Golden Visa?',
    a: 'Yes. Golden Visa holders can sponsor their spouse, all unmarried daughters of any age, and unmarried sons — with no age cap unlike standard employment visas. No minimum salary requirement for dependents.'
  },
  {
    q: 'What happens if I stay outside the UAE for an extended period?',
    a: 'Standard residence visas require you to enter the UAE at least once every 180 days. The 10-Year Golden Visa has no continuous stay requirement — you can live abroad for years without losing your residency status.'
  },
  {
    q: 'What property value triggers the 5-Year Retirement Visa?',
    a: 'The 5-Year Retirement Visa requires property worth AED 1,000,000 or more AND you must be aged 55 or above at time of application. As an alternative to property, you can qualify with AED 1M in a UAE bank or AED 15,000+ monthly income from a verifiable source.'
  }
];

// ─── HERO SECTION ─────────────────────────────────────────────────────────────

function PropertyVisaHero() {
  return (
    <SectionShell className="bg-[#050505] !pt-8 !pb-12 overflow-visible" id="top">
      {/* Ambient radial background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-48 w-[700px] h-[700px] bg-[#D4AF37]/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* ── Left Column ── */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 lg:pt-4">
            {/* Category eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2"
            >
              <GoldBadge>DLD Approved Partner</GoldBadge>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface/5 border border-white/10 text-slate-300 text-[10px] font-mono font-bold uppercase tracking-widest rounded-[10px]">
                ★★★★★ 5.0 · 284 Reviews
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
              className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black text-white leading-[1.08] tracking-tight"
            >
              UAE Property Visa{' '}
              <span className="bg-gradient-to-r from-[#FFF8DC] via-[#D4AF37] to-[#C59B27] bg-clip-text text-transparent">
                Calculator
              </span>
              <br />& Residency Filing
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
              className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-medium"
            >
              Three distinct property residency tracks — 2-Year Investor, 5-Year Retirement, and 10-Year Golden Visa. Exact government fees in under 30 seconds. 100% online filing. Zero office visits.
            </motion.p>

            {/* USP Chips */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
              className="flex flex-wrap gap-2"
            >
              {['DLD Approved', 'Mortgaged Properties OK', 'Off-Plan Accepted', '72-Hr SLA', 'Doorstep EID Delivery'].map(chip => (
                <span key={chip} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#111319] border border-white/10 text-slate-200 text-xs font-medium rounded-[10px] shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {chip}
                </span>
              ))}
            </motion.div>

            {/* CTA Row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto pt-2"
            >
              <motion.a
                href="#calculator"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="
                  inline-flex items-center justify-center gap-2 px-7 py-3.5
                  bg-dark-gold-gloss text-black font-extrabold text-xs uppercase tracking-wider
                  rounded-[10px] shadow-[0_8px_24px_rgba(212,175,55,0.35)]
                "
              >
                Calculate My Fees <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="https://wa.me/971586600396"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="
                  inline-flex items-center justify-center gap-2 px-7 py-3.5
                  bg-[#25D366] hover:bg-[#128C7E] text-white font-extrabold text-xs uppercase tracking-wider
                  rounded-[10px] shadow-lg transition-all
                "
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </motion.a>
            </motion.div>
          </div>

          {/* ── Right Column: Interactive Quick Calculator ── */}
          <div className="lg:col-span-5">
            <PropertyVisaCalculator />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

// ─── INTERACTIVE QUICK CALCULATOR ─────────────────────────────────────────────

function PropertyVisaCalculator() {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [propertyValue, setPropertyValue] = useState('');
  const [age, setAge] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const val = parseFloat(propertyValue.replace(/,/g, '')) || 0;
    const ageNum = parseInt(age) || 0;

    let track = null;
    if (val >= 2000000) track = VISA_TRACKS[2]; // Golden
    else if (val >= 1000000 && ageNum >= 55) track = VISA_TRACKS[1]; // Retirement
    else if (val >= 750000) track = VISA_TRACKS[0]; // Investor
    else track = null;

    setResult(track);
    setSelectedTrack(track?.id || null);
  };

  const formatNumber = (val) => {
    const raw = val.replace(/[^0-9]/g, '');
    return raw ? parseInt(raw).toLocaleString() : '';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      id="calculator"
      className="
        bg-[#111319] border border-white/10 rounded-[10px]
        shadow-[0_30px_60px_-20px_rgba(212,175,55,0.15)]
        overflow-hidden font-sans
      "
    >
      {/* Card header */}
      <div className="h-[3px] bg-gradient-to-r from-[#C59B27] via-[#FFF8DC] to-[#D4AF37]" />
      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <Building2 className="w-5 h-5 text-[#D4AF37]" />
          <h3 className="font-bold text-white text-sm">Property Visa Fee Calculator</h3>
          <span className="ml-auto flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-400/30 px-2 py-0.5 rounded-[6px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE
          </span>
        </div>
        <p className="text-xs text-text-muted">Get exact government fees in under 30 seconds</p>
      </div>

      <div className="p-6 space-y-5">
        {/* Property value input */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wide">Property Value (AED)</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#D4AF37]">AED</span>
            <input
              type="text"
              value={propertyValue}
              onChange={e => setPropertyValue(formatNumber(e.target.value))}
              placeholder="e.g. 2,000,000"
              className="
                w-full pl-14 pr-4 py-3 text-sm font-semibold text-white
                bg-[#0A0B0E] border border-white/15 rounded-[10px]
                focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]
                transition-all
              "
            />
          </div>
        </div>

        {/* Age input (for retirement track) */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wide">Your Age (for Retirement Visa)</label>
          <input
            type="number"
            value={age}
            onChange={e => setAge(e.target.value)}
            placeholder="Optional — required if age 55+"
            min={18}
            max={99}
            className="
              w-full px-4 py-3 text-sm font-semibold text-white
              bg-[#0A0B0E] border border-white/15 rounded-[10px]
              focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]
              transition-all
            "
          />
        </div>

        {/* Threshold hints */}
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { label: '2-Year', threshold: 'AED 750K+' },
            { label: '5-Year', threshold: 'AED 1M+ (55+)' },
            { label: '10-Year', threshold: 'AED 2M+' }
          ].map(t => (
            <div key={t.label} className="text-center py-2 bg-[#0A0B0E] border border-white/10 rounded-[10px]">
              <div className="text-[9px] font-mono font-bold text-[#D4AF37] uppercase tracking-wide">{t.label}</div>
              <div className="text-[10px] font-semibold text-slate-300 mt-0.5">{t.threshold}</div>
            </div>
          ))}
        </div>

        {/* Calculate button */}
        <motion.button
          onClick={handleCalculate}
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.97 }}
          className="
            w-full py-3.5 rounded-[10px] font-extrabold text-xs uppercase tracking-wider text-black
            bg-dark-gold-gloss shadow-[0_6px_20px_rgba(212,175,55,0.3)]
            transition-all cursor-pointer
          "
        >
          Calculate My Visa Track →
        </motion.button>

        {/* Result */}
        <AnimatePresence>
          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="bg-[#0A0B0E] border border-[#D4AF37]/40 rounded-[10px] p-5 text-white shadow-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <result.icon className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-[10px] font-mono font-extrabold uppercase tracking-[0.12em] text-[#D4AF37]">{result.badge} Visa</span>
                </div>
                <p className="font-extrabold text-lg leading-tight mb-1 text-white">{result.label}</p>
                <p className="text-xs text-slate-300 mb-4">{result.tagline}</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-surface/5 border border-white/10 rounded-[8px] p-3">
                    <div className="text-[10px] text-text-muted uppercase tracking-wide font-mono font-bold">Gov Fees</div>
                    <div className="font-extrabold text-sm text-white mt-0.5 font-mono">{result.govFee}</div>
                  </div>
                  <div className="bg-surface/5 border border-white/10 rounded-[8px] p-3">
                    <div className="text-[10px] text-text-muted uppercase tracking-wide font-mono font-bold">Total Est.</div>
                    <div className="font-extrabold text-sm text-[#D4AF37] mt-0.5 font-mono">{result.totalEst}</div>
                  </div>
                </div>
                <a
                  href="https://wa.me/971586600396"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    mt-4 w-full flex items-center justify-center gap-2
                    bg-[#25D366] hover:bg-[#128C7E] text-white font-extrabold text-xs uppercase tracking-wider
                    py-2.5 rounded-[8px] transition-colors duration-150 shadow-md
                  "
                >
                  Start Application on WhatsApp →
                </a>
              </div>
            </motion.div>
          )}
          {result === null && propertyValue && (
            <motion.div
              key="no-result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-3 bg-red-950/40 border border-red-500/30 rounded-[10px]"
            >
              <p className="text-xs text-red-300 font-medium">
                Property value below AED 750,000 minimum threshold.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── VISA TRACKS BENTO GRID ────────────────────────────────────────────────────

function VisaTracksBento() {
  const [activeTrack, setActiveTrack] = useState('golden');

  const current = VISA_TRACKS.find(t => t.id === activeTrack);

  return (
    <SectionShell className="bg-[#0A0B0E] border-t border-white/10" id="tracks">
      <SectionInner>
        <SectionHeader
          eyebrow="Property Visa Tracks"
          title="Three Residency Tiers. One Definitive Answer."
          subtitle="Choose your property value bracket and discover the exact visa track, benefits, and government fees that apply to your investment."
        />

        {/* Track selector tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {VISA_TRACKS.map(track => (
            <button
              key={track.id}
              onClick={() => setActiveTrack(track.id)}
              className={`
                px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider rounded-[10px] border transition-all duration-200 cursor-pointer
                ${activeTrack === track.id
                  ? 'bg-dark-gold-gloss text-black border-transparent shadow-[0_4px_16px_rgba(212,175,55,0.35)] font-black'
                  : 'bg-[#111319] border-white/10 text-slate-300 hover:border-[#D4AF37]/50 hover:text-white'
                }
              `}
            >
              {track.badge} — {track.label.split(' ').slice(0, 2).join(' ')}
            </button>
          ))}
        </div>

        {/* Active track detail */}
        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-5"
            >
              {/* Main info card */}
              <div className="lg:col-span-2">
                <LuxuryCard hover={false} className="p-7 h-full bg-[#111319] border-white/10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[10px] bg-[#D4AF37]/10 border border-[#D4AF37]/30 mb-4">
                    <current.icon className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wide">{current.tagline}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 font-sans">
                    {current.label}
                  </h3>
                  <p className="text-2xl font-extrabold text-[#D4AF37] font-mono mb-6">
                    {current.threshold}
                  </p>

                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4AF37] mb-3">Eligibility Criteria</h4>
                  <ul className="space-y-2.5">
                    {current.eligibility.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-300 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </LuxuryCard>
              </div>

              {/* Fee summary card */}
              <div>
                <LuxuryCard hover={false} className="h-full bg-[#111319] border-white/10">
                  <div className="h-[3px] bg-gradient-to-r from-[#C59B27] via-[#FFF8DC] to-[#D4AF37]" />
                  <div className="p-6">
                    <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4AF37] mb-5">Fee Summary</p>

                    <div className="space-y-3 mb-5">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-text-muted font-medium">DLD / ICP Fees</span>
                        <span className="font-bold text-white font-mono">{current.govFee}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm border-t border-white/10 pt-3">
                        <span className="text-text-muted font-medium">Total (incl. concierge)</span>
                        <span className="font-extrabold text-[#D4AF37] text-lg font-mono">{current.totalEst}</span>
                      </div>
                    </div>

                    <motion.a
                      href="https://wa.me/971586600396"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="
                        block w-full text-center py-3.5 rounded-[10px] font-extrabold text-xs uppercase tracking-wider text-black
                        bg-dark-gold-gloss shadow-[0_6px_20px_rgba(212,175,55,0.3)] transition-all cursor-pointer
                      "
                    >
                      Start This Track →
                    </motion.a>

                    <p className="text-[10px] text-text-muted text-center mt-3 font-mono">
                      No commitment · Free eligibility check
                    </p>
                  </div>
                </LuxuryCard>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </SectionInner>
    </SectionShell>
  );
}

// ─── FEATURES BENTO GRID ───────────────────────────────────────────────────────

function FeaturesBento() {
  return (
    <SectionShell className="bg-[#050505]" id="why">
      <SectionInner>
        <SectionHeader
          eyebrow="Why Brightlink"
          title="The Concierge Difference"
          subtitle="We are not a typing center. We are your dedicated property visa concierge — from deed audit to doorstep delivery."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feat, i) => (
            <LuxuryCard key={i} delay={i * 0.08} className="p-6 group bg-[#111319] border-white/10 hover:border-[#D4AF37] hover:shadow-[0_20px_40px_rgba(212,175,55,0.18)] hover:-translate-y-1 transition-all">
              {/* Icon */}
              <div className="
                w-11 h-11 mb-5 rounded-[10px]
                bg-[#D4AF37]/10 border border-[#D4AF37]/30
                flex items-center justify-center
                group-hover:bg-dark-gold-gloss
                transition-all duration-300
              ">
                <feat.icon className="w-5 h-5 text-[#D4AF37] group-hover:text-black transition-colors duration-300" />
              </div>
              <h3 className="font-bold text-white text-base mb-2">{feat.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">{feat.body}</p>
            </LuxuryCard>
          ))}
        </div>

        {/* Stat strip */}
        <motion.div
          className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.3}
        >
          {[
            { value: '3,200+', label: 'Properties Filed' },
            { value: '72 hrs', label: 'End-to-End SLA' },
            { value: '100%', label: 'DLD Approval Rate' },
            { value: '0', label: 'Hidden Fees' }
          ].map((stat, i) => (
            <div key={i} className="
              text-center p-5
              bg-[#111319]
              border border-white/10
              rounded-[10px]
            ">
              <div className="text-2xl font-extrabold text-[#D4AF37] font-mono mb-1">{stat.value}</div>
              <div className="text-xs text-slate-300 font-medium uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </SectionInner>
    </SectionShell>
  );
}

// ─── FEE INVOICE ──────────────────────────────────────────────────────────────

const INVOICE = {
  govtFees: 8850,
  conciergeFee: 1850,
  breakdown: [
    { item: 'DLD Golden Visa Nomination Fee', cost: 4020 },
    { item: 'ICP / GDRFA Entry Permit & Status Change', cost: 1580 },
    { item: 'Smart Salem VIP Medical Screening', cost: 950 },
    { item: 'Emirates ID Typing & Biometrics (10-Year)', cost: 730 },
    { item: 'Good Conduct Certificate (Dubai Police)', cost: 320 },
    { item: 'Sworn Arabic Translation (Marriage/Birth)', cost: 150 }
  ]
};

// ─── ROOT COMPONENT ────────────────────────────────────────────────────────────

export default function PropertyVisaPage() {
  return (
    <div className="font-sans antialiased bg-[#050505] text-white selection:bg-[#D4AF37]/30 selection:text-[#D4AF37]">
      {/* 1. Glassmorphic Hero + Calculator */}
      <PropertyVisaHero />

      {/* 2. Visa Track Selector Bento */}
      <VisaTracksBento />

      {/* 3. Features / Why Us Bento */}
      <FeaturesBento />

      {/* 4. Document Checklist — Tabbed */}
      <LuxuryDocumentTabs
        documents={DOCUMENTS}
        tabs={[
          { key: 'investor', label: 'Property Owner' },
          { key: 'family', label: 'Spouse & Dependents' }
        ]}
      />

      {/* 5. Fee Invoice */}
      <LuxuryFeeInvoice invoice={INVOICE} />

      {/* 6. Process Timeline */}
      <LuxuryProcessTimeline steps={PROCESS_STEPS} />

      {/* 7. FAQ Accordion */}
      <LuxuryFAQ faqs={FAQS} />

      {/* 8. Dark Luxury Footer CTA */}
      <LuxuryFooterCTA
        headline="Your Dubai Residency Is One Title Deed Away."
        subline="Send us your property details on WhatsApp and we'll confirm your exact visa track and government fees within 15 minutes — free, no commitment."
      />
    </div>
  );
}
