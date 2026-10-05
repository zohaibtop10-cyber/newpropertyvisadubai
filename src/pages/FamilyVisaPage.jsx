/**
 * FamilyVisaPage.jsx  ──  Service Page #3
 * ─────────────────────────────────────────
 * Bespoke luxury page for UAE Family Residence Visa.
 * Covers: Spouse Visa, Children Visa, Parents Visa,
 * fee calculator by sponsor salary bracket, renewal.
 *
 * Data extracted from: https://www.familyvisa.ae/
 * All copy fully rewritten in "Apple-level" luxury tone.
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Users, Baby, HeartHandshake, ArrowRight,
  CheckCircle2, Coins, Clock, ShieldCheck,
  TrendingUp, Repeat, FileText, Building2, User
} from 'lucide-react';
import {
  SectionShell, SectionInner, SectionHeader,
  LuxuryCard, GoldBadge, LuxuryFAQ, LuxuryFooterCTA,
  LuxuryProcessTimeline, LuxuryDocumentTabs,
  fadeUp, scaleIn
} from '../components/LuxuryServicePage';
import FamilyVisaCalculator from '../components/FamilyVisaCalculator';

// ─── SPONSOR CATEGORIES ────────────────────────────────────────────────────────

const SPONSOR_CATEGORIES = [
  {
    id: 'spouse',
    icon: Heart,
    label: 'Spouse Visa',
    tagline: 'Bring your partner home to Dubai',
    color: 'from-rose-700 to-rose-900',
    accentLight: 'bg-rose-50',
    accentText: 'text-rose-800',
    minSalary: 'AED 4,000',
    minSalaryNote: 'Or AED 3,000 + accommodation',
    duration: '2 Years',
    details: [
      'Sponsor your husband or wife regardless of their nationality',
      'Minimum sponsor salary AED 4,000/month (or AED 3,000 + free accommodation)',
      'Spouse must complete Smart Salem medical screening on entry',
      'Spouse can sponsor their own parents once they hold the residence visa',
      'Spouse visa renewable every 1 or 2 years based on sponsor\'s visa type',
    ],
    govFee: 'AED 3,040',
    totalEst: 'AED 5,280'
  },
  {
    id: 'children',
    icon: Baby,
    label: 'Children Visa',
    tagline: 'Raise your family under one roof',
    color: 'from-sky-700 to-sky-900',
    accentLight: 'bg-sky-50',
    accentText: 'text-sky-800',
    minSalary: 'AED 4,000',
    minSalaryNote: 'Same as spouse — per family unit',
    duration: '2 Years',
    details: [
      'Sons sponsored until age 18 (extendable to 21 if in full-time education)',
      'Unmarried daughters sponsored with no age restriction',
      'Disabled children of any age sponsored regardless of marital status',
      'Each additional child beyond 3 requires individual visa application',
      'Child\'s birth certificate must be attested by MOFA and translated to Arabic',
    ],
    govFee: 'AED 2,860',
    totalEst: 'AED 4,950'
  },
  {
    id: 'parents',
    icon: Users,
    label: 'Parents Visa',
    tagline: 'Keep your family close — no age limit',
    color: 'from-violet-700 to-violet-900',
    accentLight: 'bg-violet-50',
    accentText: 'text-violet-800',
    minSalary: 'AED 20,000',
    minSalaryNote: 'Or AED 10,000 + housing allowance (GDRFA)',
    duration: '1 Year (renewable)',
    details: [
      'Both parents (father and mother) can be sponsored simultaneously',
      'Minimum sponsor salary AED 20,000/month or AED 10,000 + housing allowance',
      'No age cap — parents of any age are eligible for sponsorship',
      'Parents must show a clean bill of health — medical screening required',
      'Both parents need individual visa applications (not a single joint application)',
    ],
    govFee: 'AED 3,040',
    totalEst: 'AED 5,800'
  },
  {
    id: 'renewal',
    icon: Repeat,
    label: 'Visa Renewal',
    tagline: 'Seamless renewals — zero office visits',
    color: 'from-emerald-700 to-emerald-900',
    accentLight: 'bg-emerald-50',
    accentText: 'text-emerald-800',
    minSalary: 'Unchanged',
    minSalaryNote: 'Original eligibility criteria maintained',
    duration: '2 Years (typical)',
    details: [
      'Renew 30 days before expiry — we handle the entire process online',
      'Out-of-status renewals (overstay) accepted with overstay fine payment',
      'Sponsor salary threshold re-verified at renewal — must still meet minimum',
      'New medical screening required for each renewal cycle',
      'EID renewal done simultaneously — one payment, one process',
    ],
    govFee: 'AED 1,490',
    totalEst: 'AED 3,900'
  }
];

// ─── FEE CALCULATOR ───────────────────────────────────────────────────────────

const FEE_MATRIX = [
  {
    category: 'Spouse Visa (New)',
    items: [
      { label: 'Entry Permit', cost: 540 },
      { label: 'Status Change / Visa Stamping', cost: 740 },
      { label: 'Smart Salem Medical', cost: 850 },
      { label: 'Emirates ID (2-Year)', cost: 370 },
      { label: 'Residence Permit Issuance', cost: 540 }
    ]
  },
  {
    category: 'Child Visa (Per Child)',
    items: [
      { label: 'Entry Permit', cost: 460 },
      { label: 'Status Change / Visa Stamping', cost: 680 },
      { label: 'Smart Salem Medical', cost: 680 },
      { label: 'Emirates ID (2-Year)', cost: 370 },
      { label: 'Residence Permit Issuance', cost: 540 }
    ]
  },
  {
    category: 'Parent Visa (Per Parent)',
    items: [
      { label: 'Entry Permit', cost: 540 },
      { label: 'Status Change / Visa Stamping', cost: 740 },
      { label: 'Smart Salem Medical', cost: 950 },
      { label: 'Emirates ID (1-Year)', cost: 200 },
      { label: 'Residence Permit Issuance', cost: 540 }
    ]
  }
];

function FamilyFeeCalculator() {
  const [selectedCat, setSelectedCat] = useState(0);
  const cat = FEE_MATRIX[selectedCat];
  const total = cat.items.reduce((s, i) => s + i.cost, 0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="bg-[#111319] border border-white/10 rounded-[10px] shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden text-white"
    >
      <div className="h-[3px] bg-gradient-to-r from-[#8C5E00] via-[#D4AF37] to-[#F3E5AB]" />

      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <Coins className="w-5 h-5 text-[#D4AF37]" />
          <h3 className="font-bold text-white text-sm">Unified Family Visa Fee Calculator</h3>
          <span className="ml-auto flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-400/20 px-2 py-0.5 rounded-[6px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE
          </span>
        </div>
        <p className="text-xs text-slate-400">All-in-one itemized government fee calculator for your entire family unit</p>
      </div>

      <div className="p-6 space-y-4">
        {/* Category selector */}
        <div className="grid grid-cols-3 gap-1.5">
          {FEE_MATRIX.map((c, i) => (
            <button
              key={i}
              onClick={() => setSelectedCat(i)}
              className={`
                py-2 px-2 text-[10px] font-mono font-bold rounded-[8px] border text-center transition-all duration-150 cursor-pointer
                ${selectedCat === i
                  ? 'bg-dark-gold-gloss text-black border-transparent shadow-sm font-black'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:border-[#D4AF37]/40 hover:text-white'
                }
              `}
            >
              {c.category.replace(' (New)', '').replace(' (Per Child)', '').replace(' (Per Parent)', '')}
            </button>
          ))}
        </div>

        {/* Fee breakdown */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCat}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="space-y-2"
          >
            {cat.items.map((item, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                <span className="text-xs text-slate-300">{item.label}</span>
                <span className="font-mono font-bold text-xs text-white">AED {item.cost.toLocaleString()}</span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Total */}
        <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-[10px] px-4 py-3.5 flex justify-between items-center">
          <span className="font-extrabold text-xs font-mono uppercase tracking-wider text-white">Gov. Fees Total</span>
          <span className="font-extrabold font-mono text-lg text-[#D4AF37]">AED {total.toLocaleString()}</span>
        </div>

        <motion.a
          href="https://wa.me/971586600396"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="block w-full text-center py-3 rounded-[10px] font-black text-xs uppercase tracking-wider text-black bg-dark-gold-gloss shadow-[0_6px_20px_rgba(212,175,55,0.3)] transition-all"
        >
          Apply via WhatsApp Concierge →
        </motion.a>
        <p className="text-center text-[10px] text-slate-400 font-mono">+Concierge fee from AED 800 · All taxes included</p>
      </div>
    </motion.div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function FamilyVisaHero() {
  return (
    <SectionShell className="bg-[#050505] !pt-8 !pb-12 overflow-visible">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-48 w-[700px] h-[700px] bg-gradient-radial from-[#D4AF37]/15 via-[#D4AF37]/5 to-transparent blur-[120px] rounded-full" />
        <div className="absolute top-1/2 -left-32 w-[400px] h-[400px] bg-gradient-radial from-[#D4AF37]/10 to-transparent blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 flex flex-col items-start space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2 flex-wrap"
            >
              <GoldBadge>GDRFA Approved Concierge</GoldBadge>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 text-slate-300 text-[10px] font-mono font-bold uppercase tracking-widest rounded-[10px]">
                15,000+ Families Reunited
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight"
            >
              Unified UAE Family Visa{' '}
              <span className="bg-gradient-to-r from-amber-200 via-[#D4AF37] to-amber-400 bg-clip-text text-transparent">
                — Spouse, Children & Parents
              </span>
              <br />All in One Package.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
              className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl"
            >
              Sponsor your spouse, children, and parents under 1 seamless family residence visa hub. Zero government office visits. SLA: 72 business hours.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
              className="flex flex-wrap gap-2"
            >
              {['100% Online Filing', '72-Hr SLA Guarantee', 'Doorstep EID Delivery', 'VIP Medical', 'Overstay Cases Accepted'].map(chip => (
                <span key={chip} className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 text-slate-300 text-xs font-medium rounded-[10px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {chip}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto pt-2"
            >
              <motion.a
                href="#categories"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-dark-gold-gloss text-black font-black text-xs uppercase tracking-wider rounded-[10px] shadow-[0_8px_20px_rgba(212,175,55,0.25)]"
              >
                Explore Family Visa Hub <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="https://wa.me/971586600396"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-extrabold text-xs rounded-[10px] shadow-sm transition-all"
              >
                <span>WhatsApp Consultation</span>
              </motion.a>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <FamilyVisaCalculator />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

// ─── VISA CATEGORY CARDS ───────────────────────────────────────────────────────

function VisaCategorySection() {
  const [active, setActive] = useState('spouse');
  const current = SPONSOR_CATEGORIES.find(c => c.id === active);

  return (
    <SectionShell className="bg-[#0A0B0E] py-12 md:py-16" id="categories">
      <SectionInner>
        <SectionHeader
          eyebrow="Unified Family Hub"
          title="One Family. Complete Coverage. Zero Hassle."
          subtitle="Select any family member category to review eligibility, salary thresholds, and estimated government fees."
        />

        {/* Tab row */}
        <div className="flex flex-wrap gap-2 mb-6">
          {SPONSOR_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`
                flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-bold rounded-[10px] border transition-all duration-200 cursor-pointer
                ${active === cat.id
                  ? 'bg-dark-gold-gloss text-black border-transparent shadow-[0_4px_16px_rgba(212,175,55,0.25)] font-black'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:border-[#D4AF37]/40 hover:text-white'
                }
              `}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-5"
            >
              <div className="lg:col-span-2">
                <LuxuryCard hover={false} className="p-6 h-full bg-[#111319] border-white/10 text-white">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[10px] bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] mb-4">
                    <current.icon className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">{current.tagline}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="bg-white/5 border border-white/10 rounded-[10px] p-3.5">
                      <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">Min. Salary</div>
                      <div className="font-extrabold text-base text-[#D4AF37]">{current.minSalary}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{current.minSalaryNote}</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-[10px] p-3.5">
                      <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">Visa Duration</div>
                      <div className="font-extrabold text-base text-white">{current.duration}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Renewable online</div>
                    </div>
                  </div>

                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4AF37] mb-3">Key Details</h4>
                  <ul className="space-y-2">
                    {current.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-200">{d}</span>
                      </li>
                    ))}
                  </ul>
                </LuxuryCard>
              </div>

              <div>
                <LuxuryCard hover={false} className="h-full bg-[#111319] border-white/10 text-white">
                  <div className="h-[3px] bg-gradient-to-r from-[#8C5E00] via-[#D4AF37] to-[#F3E5AB]" />
                  <div className="p-6 space-y-4">
                    <p className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">Government Fees</p>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Gov Fees (est.)</span>
                        <span className="font-mono font-bold text-white">{current.govFee}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs border-t border-white/10 pt-3">
                        <span className="text-slate-400">Total incl. concierge</span>
                        <span className="font-mono font-extrabold text-[#D4AF37] text-base">{current.totalEst}</span>
                      </div>
                    </div>

                    <motion.a
                      href="https://wa.me/971586600396"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="block w-full text-center py-3 rounded-[10px] font-black text-xs uppercase tracking-wider text-black bg-dark-gold-gloss shadow-[0_6px_20px_rgba(212,175,55,0.25)]"
                    >
                      Apply via WhatsApp →
                    </motion.a>

                    {/* Salary eligibility note */}
                    <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-[10px] p-3">
                      <p className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider mb-1">Salary Requirement</p>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {current.minSalary} minimum monthly salary per payslip. We pre-audit eligibility before filing.
                      </p>
                    </div>
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

// ─── WHY US ───────────────────────────────────────────────────────────────────

const WHY_US = [
  { icon: ShieldCheck, title: 'Pre-Submission Document Audit', body: 'Every file is reviewed by our PRO team before GDRFA submission, eliminating rejections caused by translation errors, missing attestations, or expired documents.' },
  { icon: Clock, title: '72-Hour End-to-End SLA', body: 'From complete document receipt to residence visa stamp: 72 business hours. We publish live SLA updates on WhatsApp throughout the process.' },
  { icon: HeartHandshake, title: 'Overstay & Violation Resolution', body: 'Currently overstaying? We regularize your status with GDRFA, pay overstay fines on your behalf, and proceed with the new visa — all without you appearing in person.' },
  { icon: TrendingUp, title: 'Same-Day Smart Salem VIP Medical', body: 'Skip the queues. Our VIP medical appointments are booked at premium Smart Salem centers — results in 30 to 120 minutes, same day. No waiting rooms.' },
  { icon: Building2, title: 'GDRFA & ICP Registered PRO', body: 'Our licensed PRO team holds official GDRFA and ICP access — submitting on AMER Center priority channels, not public queues. Same-day nominee, every time.' },
  { icon: FileText, title: 'Doorstep Emirates ID Delivery', body: 'After biometric capture, your physical Emirates ID is shipped directly to your home. No GDRFA collection counter visits. End-to-end concierge.' }
];

function WhyUsSection() {
  return (
    <SectionShell className="bg-[#050505] py-12 md:py-16">
      <SectionInner>
        <SectionHeader
          eyebrow="Why PropertyVisaDubai"
          title="15,000+ Families Trust Us — Here's Why"
          subtitle="We've built the UAE's only fully end-to-end family visa concierge. From document audit to physical EID delivery — you never visit a government counter."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {WHY_US.map((item, i) => (
            <LuxuryCard key={i} delay={i * 0.07} className="p-5 group bg-[#111319] border-white/10 text-white">
              <div className="w-10 h-10 mb-4 rounded-[10px] bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center group-hover:bg-dark-gold-gloss transition-all duration-300">
                <item.icon className="w-5 h-5 text-[#D4AF37] group-hover:text-black transition-colors duration-300" />
              </div>
              <h3 className="font-bold text-white text-sm mb-1.5">{item.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{item.body}</p>
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
            { value: '15,000+', label: 'Visas Processed' },
            { value: '72 hrs', label: 'SLA Commitment' },
            { value: '99.1%', label: 'First-Submit Approval' },
            { value: 'AED 0', label: 'Hidden Fees' }
          ].map((stat, i) => (
            <div key={i} className="text-center p-4 bg-white/5 border border-white/10 rounded-[10px]">
              <div className="text-xl font-mono font-extrabold text-[#D4AF37] mb-0.5">{stat.value}</div>
              <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </SectionInner>
    </SectionShell>
  );
}

// ─── DOCUMENTS ────────────────────────────────────────────────────────────────

const DOCUMENTS = {
  sponsor: [
    'Sponsor\'s UAE Residence Visa (minimum 1-year remaining validity)',
    'Sponsor\'s Emirates ID (both sides, high resolution scan)',
    'Salary certificate or bank statement (last 3 months) showing AED 4,000+ salary',
    'Employment contract or appointment letter on company letterhead',
    'Tenancy contract (Ejari registered) or DEWA bill — accommodation proof',
    'Company trade license copy (if self-employed)',
  ],
  dependents: [
    'Original passport — minimum 6 months validity, all pages visible',
    'Passport-size photograph — white background, recent (within 3 months)',
    'MOFA attested & Arabic-translated marriage certificate (for spouse)',
    'MOFA attested & Arabic-translated birth certificate (for children)',
    'Current UAE Entry Stamp or Tourist Visa copy (if already in UAE)',
    'Medical fitness certificate (Smart Salem — arranged by us)',
  ]
};

const PROCESS_STEPS = [
  {
    title: 'Document Collection & Audit',
    description: 'Share your documents via WhatsApp or secure upload. Our PRO team audits every page — attestation, translation, and eligibility — before filing.'
  },
  {
    title: 'GDRFA Entry Permit',
    description: 'We file the family member\'s entry permit on AMER Center priority channels. Approval in 24–48 hours. Status change handled inside-country if dependent is already in UAE.'
  },
  {
    title: 'VIP Medical & Status Change',
    description: 'Smart Salem VIP medical appointment booked same day. Results within 30–120 minutes. GDRFA status change and visa stamping processed immediately after medical clearance.'
  },
  {
    title: 'EID Biometrics & Delivery',
    description: 'Emirates ID biometric capture at our registered center — no ICA customer happiness center visits. Physical 2-Year EID couriered to your address within 5–7 working days.'
  }
];

const FAQS = [
  {
    q: 'What is the minimum salary required to sponsor a spouse in Dubai?',
    a: 'The minimum monthly salary to sponsor a spouse in Dubai is AED 4,000. Alternatively, if your employer provides free accommodation, the salary threshold drops to AED 3,000 per month. This salary must be evidenced by a stamped salary certificate or verifiable bank salary credits for the last 3 months.'
  },
  {
    q: 'Can I sponsor my parents on a UAE family visa?',
    a: 'Yes. UAE residents can sponsor their parents under the family visa program. The minimum salary required is AED 20,000 per month, or AED 10,000 if the employer provides a housing allowance. Both parents receive 1-year renewable visas. There is no age restriction for parents.'
  },
  {
    q: 'My dependent is currently overstaying in the UAE — can we still apply?',
    a: 'Yes. Overstay cases are handled regularly. We file a GDRFA overstay waiver application, calculate and pay the exact overstay fine on your behalf, and proceed with the new residence visa application simultaneously. Your dependent does not need to leave the country in most cases.'
  },
  {
    q: 'Can my sponsored daughter remain on my visa after she turns 18?',
    a: 'For unmarried daughters, there is no age restriction — they remain eligible to be sponsored on your family visa regardless of age, as long as they remain unmarried. For sons, the visa can be extended beyond 18 if the son is enrolled in full-time education in the UAE, up to age 21.'
  },
  {
    q: 'How long does the family visa process take?',
    a: 'Our 72-hour SLA covers the full process from document receipt to visa stamp. Breakdown: GDRFA Entry Permit / Status Change — 24–48 hours; Smart Salem VIP Medical — same day, 30–120 minutes; Emirates ID biometric capture — same day; Physical EID delivery — 5–7 working days after capture.'
  },
  {
    q: 'Does my family member need to be outside the UAE to get an entry permit?',
    a: 'No. If your family member is currently in the UAE on a tourist or visit visa, we process an inside-country status change — converting their current status to a residence visa without any need for an exit trip or visa run. This is the most common scenario we handle.'
  },
  {
    q: 'What documents need MOFA attestation?',
    a: 'The following documents require UAE Ministry of Foreign Affairs (MOFA) attestation before they can be used in a UAE visa application: marriage certificates, birth certificates, educational certificates, and police clearance certificates. All documents in non-Arabic languages also require a sworn Arabic translation by a UAE Ministry of Justice-approved legal translator — a service we provide in-house.'
  }
];

// ─── ROOT COMPONENT ────────────────────────────────────────────────────────────

export default function FamilyVisaPage() {
  return (
    <div className="font-sans antialiased bg-[#050505] text-white selection:bg-[#D4AF37]/20 selection:text-[#D4AF37]">
      {/* 1. Hero + Fee Calculator */}
      <FamilyVisaHero />

      {/* 2. Visa Category Selector */}
      <VisaCategorySection />

      {/* 3. Why Us Bento */}
      <WhyUsSection />

      {/* 4. Document Checklist */}
      <LuxuryDocumentTabs
        documents={DOCUMENTS}
        tabs={[
          { key: 'sponsor', label: 'UAE Sponsor (Host)' },
          { key: 'dependents', label: 'Dependent Documents' }
        ]}
      />

      {/* 5. Process Timeline */}
      <LuxuryProcessTimeline steps={PROCESS_STEPS} />

      {/* 6. FAQ */}
      <LuxuryFAQ faqs={FAQS} />

      {/* 7. Dark CTA */}
      <LuxuryFooterCTA
        headline="Your Family Deserves to Be Together — in 72 Hours."
        subline="Send us your sponsor's salary certificate and we'll confirm exact visa eligibility, government fees, and SLA — on WhatsApp, in under 15 minutes. Free."
        ctaLabel="Reunite My Family on WhatsApp"
        ctaHref="https://wa.me/971586600396"
      />
    </div>
  );
}
