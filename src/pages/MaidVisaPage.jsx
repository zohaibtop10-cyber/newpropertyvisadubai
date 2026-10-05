/**
 * MaidVisaPage.jsx  ──  Service Page #5
 * ──────────────────────────────────────
 * Bespoke luxury page for UAE Domestic Worker / Maid / Nanny Visa.
 * Covers: GDRFA entry permit, MOHRE contract, DHA medical,
 * sponsorship eligibility, nationalities, and fee breakdown.
 *
 * Data extracted from: https://www.familyvisa.ae/maid-visa/
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Users, FileText, Heart, ShieldCheck,
  CheckCircle2, ArrowRight, Clock, Briefcase,
  Globe, AlertTriangle, Coins, Repeat
} from 'lucide-react';
import {
  SectionShell, SectionInner, SectionHeader,
  LuxuryCard, GoldBadge, LuxuryFAQ, LuxuryFooterCTA,
  LuxuryProcessTimeline, LuxuryDocumentTabs,
  fadeUp, scaleIn
} from '../components/LuxuryServicePage';

// ─── DATA ─────────────────────────────────────────────────────────────────────

const SERVICE_TYPES = [
  {
    id: 'new',
    icon: Home,
    label: 'New Domestic Worker Visa',
    tagline: 'Fresh entry — from abroad or inside UAE',
    color: 'from-violet-600 to-violet-900',
    accentBg: 'bg-violet-50',
    accentText: 'text-violet-800',
    minSalary: 'AED 6,000',
    minSalaryNote: 'Minimum sponsor household income',
    duration: '2 Years',
    govFee: 'AED 5,450',
    totalEst: 'AED 7,800',
    details: [
      'Sponsor must earn minimum AED 6,000 per month from verified employment',
      'Domestic worker recruited from approved source countries only (see below)',
      'MOHRE employment contract mandatory — we prepare and file on your behalf',
      'DHA medical screening required before visa stamping (we book same-day)',
      'Worker must sign MOHRE contract in home country before flying to UAE',
      'Minimum 1-year contract period — renewable annually',
    ]
  },
  {
    id: 'transfer',
    icon: Repeat,
    label: 'Transfer from Another Sponsor',
    tagline: 'Move an existing worker to your household',
    color: 'from-emerald-600 to-emerald-900',
    accentBg: 'bg-emerald-50',
    accentText: 'text-emerald-800',
    minSalary: 'AED 6,000',
    minSalaryNote: 'New sponsor minimum income',
    duration: '2 Years',
    govFee: 'AED 3,720',
    totalEst: 'AED 5,900',
    details: [
      'Worker must hold a valid residence visa under a current UAE sponsor',
      'Current sponsor must provide a No Objection Certificate (NOC) for transfer',
      'MOHRE NOC is obtained automatically if the worker has completed 1-year contract',
      'New MOHRE contract signed between new sponsor and worker before transfer',
      'No new medical exam required if DHA medical is still within valid period',
      'Transfer processing time: 3–7 business days after NOC issuance',
    ]
  },
  {
    id: 'renewal',
    icon: Repeat,
    label: 'Visa Renewal',
    tagline: 'Renew before the 2-year expiry',
    color: 'from-amber-600 to-amber-800',
    accentBg: 'bg-amber-50',
    accentText: 'text-amber-800',
    minSalary: 'AED 6,000',
    minSalaryNote: 'Sponsor income re-verified at renewal',
    duration: '2 Years',
    govFee: 'AED 2,940',
    totalEst: 'AED 5,100',
    details: [
      'Renew 30 days before expiry — we send reminders and initiate automatically',
      'Fresh MOHRE contract renewal signed for another 1 or 2 year term',
      'New DHA medical examination required for each renewal cycle',
      'Emirates ID renewed simultaneously with the residence visa renewal',
      'Sponsor salary re-verified against AED 6,000 minimum at renewal stage',
      'Overstay renewals accepted — we calculate and pay fines on your behalf',
    ]
  }
];

const ELIGIBLE_NATIONALITIES = [
  { country: 'Philippines', flag: '🇵🇭', note: 'POEA clearance required' },
  { country: 'India', flag: '🇮🇳', note: 'ECR passport holders — emigration check' },
  { country: 'Sri Lanka', flag: '🇱🇰', note: 'SLBFE clearance required' },
  { country: 'Indonesia', flag: '🇮🇩', note: 'BNP2TKI clearance required' },
  { country: 'Bangladesh', flag: '🇧🇩', note: 'BMET clearance required' },
  { country: 'Nepal', flag: '🇳🇵', note: 'DoFE clearance required' },
  { country: 'Pakistan', flag: '🇵🇰', note: 'BEOE clearance required' },
  { country: 'Ethiopia', flag: '🇪🇹', note: 'Standard clearance' },
  { country: 'Uganda', flag: '🇺🇬', note: 'Standard clearance' },
  { country: 'Ghana', flag: '🇬🇭', note: 'Standard clearance' },
  { country: 'Kenya', flag: '🇰🇪', note: 'Standard clearance' },
  { country: 'Madagascar', flag: '🇲🇬', note: 'Standard clearance' },
];

const FEATURES = [
  { icon: FileText, title: 'MOHRE Contract Preparation', body: 'We draft the bilingual MOHRE-approved domestic worker contract, file it on the MOHRE portal, and obtain the official contract approval before the worker travels.' },
  { icon: ShieldCheck, title: 'Home Country Clearance', body: 'We coordinate with recruitment agencies to obtain mandatory home-country labor clearances (POEA, SLBFE, BNP2TKI etc.) — a step most employers miss.' },
  { icon: Heart, title: 'DHA Medical Coordination', body: 'Same-day DHA medical appointments booked at approved clinics. Results in 30–120 minutes. Medical fitness certificate issued and filed digitally.' },
  { icon: Briefcase, title: 'GDRFA / ICP Entry Permit', body: 'Entry permit filed on GDRFA AMER priority channels. Approved in 24–48 hours. Visa stamped in the worker\'s passport before departure or inside UAE on transfer.' },
  { icon: Coins, title: 'Transparent Fee Breakdown', body: 'Zero hidden charges. Our MOHRE filing fee, GDRFA entry permit, DHA medical, and EID fees are quoted upfront — with government receipts provided.' },
  { icon: Clock, title: '72-Hour Filing SLA', body: 'From complete document receipt to GDRFA entry permit submission: 72 business hours. We send WhatsApp status updates throughout the process.' },
];

const DOCUMENTS = {
  sponsor: [
    'Sponsor\'s UAE Residence Visa and Emirates ID (both sides)',
    'Salary certificate showing minimum AED 6,000 per month (last 3 months)',
    'Ejari-registered tenancy contract or DEWA utility bill',
    'Passport copy — minimum 6 months validity',
    'Emirates ID copy — both sides, high resolution',
  ],
  worker: [
    'Worker\'s passport — minimum 2 years validity, all pages scanned',
    'Passport-size photographs — white background, recent',
    'Home country labor clearance certificate (POEA / SLBFE / BNP2TKI etc.)',
    'Medical fitness certificate from home country (if required by embassy)',
    'Previous UAE visa copy (if previously worked in UAE)',
    'Bank account details for monthly salary transfer (MOHRE wage protection)',
  ]
};

const PROCESS_STEPS = [
  {
    title: 'Eligibility & Contract',
    description: 'We verify sponsor income, confirm worker nationality eligibility, and draft the MOHRE employment contract — submitted and approved on the MOHRE portal.'
  },
  {
    title: 'Home Country Clearance',
    description: 'We coordinate the home-country labor clearance for the worker (POEA, SLBFE, BNP2TKI etc.) — mandatory before the worker boards a flight to the UAE.'
  },
  {
    title: 'GDRFA Entry Permit',
    description: 'Entry permit filed on AMER priority channels. Approved in 24–48 hours. Sponsor signs the GDRFA authorization form digitally — no office visit.'
  },
  {
    title: 'DHA Medical & Visa Stamp',
    description: 'Worker arrives in UAE. Same-day DHA medical appointment. Visa stamped in passport immediately after medical clearance. EID biometrics same day.'
  }
];

const FAQS = [
  {
    q: 'What is the minimum salary to sponsor a maid or domestic worker in Dubai?',
    a: 'The minimum monthly household income to sponsor a domestic worker (maid, nanny, cook, driver, or similar) in Dubai under GDRFA is AED 6,000 per month. This is verified from the sponsor\'s salary certificate or bank statements showing regular salary credits. Both spouses\' combined income may count in some circumstances — we assess this on a case-by-case basis.'
  },
  {
    q: 'Which countries are approved for domestic worker recruitment in the UAE?',
    a: 'The UAE Ministry of Human Resources (MOHRE) maintains an approved source country list for domestic workers. The primary approved nationalities include: Philippines, India, Sri Lanka, Indonesia, Bangladesh, Nepal, Pakistan, Ethiopia, Uganda, Ghana, Kenya, and Madagascar. Workers from non-listed countries require special MOHRE approval. We handle this pre-approval for you.'
  },
  {
    q: 'Can I bring a maid who is already inside the UAE on a visit visa?',
    a: 'Yes. If the domestic worker is currently in the UAE on a visit or tourist visa, we process an inside-country status change — eliminating the need for the worker to exit and re-enter. A MOHRE contract must still be signed and home-country clearance obtained. The inside-country process costs slightly less in government fees than a fresh entry permit.'
  },
  {
    q: 'What is the MOHRE contract and do I really need it?',
    a: 'Yes — the MOHRE domestic worker employment contract is legally mandatory under UAE Labour Law (Federal Decree-Law No. 9/2022). It must be registered on the MOHRE portal before the worker is issued a visa. The contract specifies salary, working hours, rest days, accommodation, and leave entitlements. We prepare the bilingual (Arabic/English) contract, have it signed by both parties, and file it on MOHRE — all included in our service.'
  },
  {
    q: 'What are the domestic worker\'s rights under UAE law?',
    a: 'Under Federal Decree-Law No. 9/2022 (Domestic Workers Law), domestic workers in the UAE are entitled to: 8 hours of daily rest, one day off per week, 30 days paid annual leave after one year, 30 days paid sick leave per year, return air ticket to home country after contract completion, end-of-service gratuity (one month per year of service), and access to MOHRE dispute resolution. We include all these provisions in the MOHRE contract we prepare.'
  },
  {
    q: 'Can the domestic worker bring their own family to the UAE?',
    a: 'No. Domestic workers sponsored on a domestic worker visa (laborer/housemaid category) are not permitted to sponsor dependents (spouse or children) in the UAE. They also cannot change their visa category to an employment or family visa without first leaving the country and canceling the domestic worker visa. These restrictions are standard under GDRFA rules.'
  }
];

// ─── HERO ─────────────────────────────────────────────────────────────────────

function MaidVisaHero() {
  return (
    <SectionShell className="bg-[#050505] !pt-8 !pb-12 overflow-visible">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-48 w-[700px] h-[600px] bg-[#D4AF37]/10 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-2">
              <GoldBadge>MOHRE Licensed PRO</GoldBadge>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 text-slate-300 text-[10px] font-mono font-bold uppercase tracking-widest rounded-[10px]">Maid · Nanny · Cook · Driver</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black text-white leading-[1.08] tracking-tight font-sans"
            >
              UAE Domestic Worker Visa.{' '}
              <span className="bg-gradient-to-r from-[#FFF8DC] via-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent">
                100% Online.
              </span>
              <br />MOHRE + GDRFA Managed.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.16 }} className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-medium">
              Sponsor a maid, nanny, cook, houseboy, or private driver in the UAE — without visiting a typing centre or MOHRE office. We handle MOHRE contract, home-country clearance, GDRFA entry permit, DHA medical, and Emirates ID. End-to-end.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.24 }} className="flex flex-wrap gap-2">
              {['No Typing Centre Visits', 'MOHRE Contract Filed', 'Home Country Clearance', 'Same-Day DHA Medical', '12 Eligible Nationalities'].map(chip => (
                <span key={chip} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#111319] border border-white/10 text-slate-200 text-xs font-medium rounded-[10px] shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />{chip}
                </span>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-col sm:flex-row gap-3 pt-2">
              <motion.a href="#services" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-dark-gold-gloss text-black font-extrabold text-xs uppercase tracking-wider rounded-[10px] shadow-[0_8px_24px_rgba(212,175,55,0.35)]">
                View Service Options <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a href="https://wa.me/971586600396" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-extrabold text-xs uppercase tracking-wider rounded-[10px] shadow-lg transition-all">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us
              </motion.a>
            </motion.div>
          </div>

          {/* Stat block */}
          <div className="lg:col-span-5">
            <MaidVisaStatsCard />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function MaidVisaStatsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="bg-[#111319] border border-white/10 rounded-[10px] shadow-[0_30px_60px_-20px_rgba(212,175,55,0.15)] overflow-hidden font-sans"
    >
      <div className="h-[3px] bg-gradient-to-r from-[#B8860B] via-[#FFF8DC] to-[#D4AF37]" />
      <div className="bg-[#0A0B0E] px-6 py-6 border-b border-white/10">
        <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37] mb-2">UAE Domestic Worker Visa</div>
        <p className="font-extrabold text-white text-lg mb-1">Managed End-to-End</p>
        <p className="text-slate-300 text-xs leading-relaxed font-medium">MOHRE contract · Home country clearance · GDRFA entry permit · DHA medical · Emirates ID</p>
      </div>
      <div className="grid grid-cols-2 divide-x divide-y divide-white/10">
        {[
          { value: '12', label: 'Eligible Nationalities' },
          { value: 'AED 6K', label: 'Min Sponsor Salary' },
          { value: '2 Years', label: 'Visa Duration' },
          { value: '72 hrs', label: 'Processing SLA' }
        ].map((s, i) => (
          <div key={i} className="p-4 text-center">
            <div className="font-extrabold text-xl text-[#D4AF37] font-mono">{s.value}</div>
            <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wide mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
      {/* Nationality flags */}
      <div className="p-5 border-t border-white/10">
        <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wide mb-3">Approved Source Countries</p>
        <div className="flex flex-wrap gap-2">
          {ELIGIBLE_NATIONALITIES.map(n => (
            <span key={n.country} className="flex items-center gap-1 px-2.5 py-1 bg-[#0A0B0E] border border-white/10 rounded-[8px] text-xs font-semibold text-slate-200">
              {n.flag} {n.country}
            </span>
          ))}
        </div>
      </div>
      <div className="p-5 border-t border-white/10">
        <motion.a
          href="https://wa.me/971586600396"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.97 }}
          className="block w-full text-center py-3.5 rounded-[10px] font-extrabold text-xs uppercase tracking-wider text-black bg-dark-gold-gloss shadow-[0_6px_20px_rgba(212,175,55,0.3)] transition-all cursor-pointer"
        >
          Start Domestic Worker Visa →
        </motion.a>
      </div>
    </motion.div>
  );
}

// ─── SERVICE TYPE SELECTOR ────────────────────────────────────────────────────

function ServiceTypeSection() {
  const [active, setActive] = useState('new');
  const current = SERVICE_TYPES.find(s => s.id === active);

  return (
    <SectionShell className="bg-[#0A0B0E]" id="services">
      <SectionInner>
        <SectionHeader
          eyebrow="Service Options"
          title="New Visa, Transfer, or Renewal — We Do All Three"
          subtitle="Select your scenario to see exact requirements, government fees, and our concierge process."
        />
        <div className="flex flex-wrap gap-2 mb-8">
          {SERVICE_TYPES.map(s => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider rounded-[10px] border transition-all duration-200 cursor-pointer ${active === s.id ? 'bg-dark-gold-gloss text-black border-transparent shadow-[0_4px_16px_rgba(212,175,55,0.35)] font-black' : 'bg-[#111319] border-white/10 text-slate-300 hover:border-[#D4AF37]/50 hover:text-white'}`}
            >
              <s.icon className="w-4 h-4" />{s.label}
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
                <LuxuryCard hover={false} className="p-7 h-full bg-[#111319] border-white/10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-[10px] mb-5">
                    <current.icon className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wide">{current.tagline}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#0A0B0E] border border-white/10 rounded-[10px] p-4">
                      <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wide mb-1">Min. Sponsor Income</div>
                      <div className="font-extrabold text-lg text-white font-mono">{current.minSalary}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{current.minSalaryNote}</div>
                    </div>
                    <div className="bg-[#0A0B0E] border border-white/10 rounded-[10px] p-4">
                      <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wide mb-1">Visa Duration</div>
                      <div className="font-extrabold text-lg text-white font-mono">{current.duration}</div>
                      <div className="text-[10px] text-slate-400 font-mono">Renewable online</div>
                    </div>
                  </div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4AF37] mb-3">Requirements</h4>
                  <ul className="space-y-3">
                    {current.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-300 font-medium">{d}</span>
                      </li>
                    ))}
                  </ul>
                </LuxuryCard>
              </div>
              <div>
                <LuxuryCard hover={false} className="h-full bg-[#111319] border-white/10">
                  <div className="h-[3px] bg-gradient-to-r from-[#B8860B] via-[#FFF8DC] to-[#D4AF37]" />
                  <div className="p-6">
                    <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4AF37] mb-5">Fee Estimate</p>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm"><span className="text-slate-400">Government Fees</span><span className="font-bold text-white font-mono">{current.govFee}</span></div>
                      <div className="flex justify-between text-sm border-t border-white/10 pt-3"><span className="text-slate-400">Total incl. concierge</span><span className="font-extrabold text-[#D4AF37] text-lg font-mono">{current.totalEst}</span></div>
                    </div>
                    <motion.a href="https://wa.me/971586600396" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      className="block w-full text-center py-3.5 rounded-[10px] font-extrabold text-xs uppercase tracking-wider text-black bg-dark-gold-gloss shadow-[0_6px_20px_rgba(212,175,55,0.3)] transition-all cursor-pointer">
                      Apply via WhatsApp →
                    </motion.a>
                    <p className="text-[10px] text-slate-400 text-center mt-3 font-mono">Free eligibility check · No commitment</p>
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

export default function MaidVisaPage() {
  return (
    <div className="font-sans antialiased bg-[#050505] text-white selection:bg-[#D4AF37]/30 selection:text-[#D4AF37]">
      <MaidVisaHero />
      <ServiceTypeSection />
      <SectionShell className="bg-[#050505]">
        <SectionInner>
          <SectionHeader eyebrow="Why Brightlink" title="Why Families Choose Us for Domestic Worker Visas" subtitle="We handle the parts most sponsors don't know exist — home country clearance, MOHRE compliance, and GDRFA coordination." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <LuxuryCard key={i} delay={i * 0.07} className="p-6 group bg-[#111319] border-white/10 hover:border-[#D4AF37] hover:shadow-[0_20px_40px_rgba(212,175,55,0.18)] hover:-translate-y-1 transition-all">
                <div className="w-11 h-11 mb-5 rounded-[10px] bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center group-hover:bg-dark-gold-gloss transition-all duration-300">
                  <f.icon className="w-5 h-5 text-[#D4AF37] group-hover:text-black transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-white text-base mb-2">{f.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed font-medium">{f.body}</p>
              </LuxuryCard>
            ))}
          </div>
        </SectionInner>
      </SectionShell>
      <LuxuryDocumentTabs documents={DOCUMENTS} tabs={[{ key: 'sponsor', label: 'Sponsor (Employer)' }, { key: 'worker', label: 'Domestic Worker' }]} />
      <LuxuryProcessTimeline steps={PROCESS_STEPS} />
      <LuxuryFAQ faqs={FAQS} />
      <LuxuryFooterCTA
        headline="Your Home Deserves the Best Help. Start the Visa Today."
        subline="Send us your sponsoring salary certificate and the worker's nationality on WhatsApp — we'll confirm full eligibility, fees, and timeline in 15 minutes. Free."
      />
    </div>
  );
}
