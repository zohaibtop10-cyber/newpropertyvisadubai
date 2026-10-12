/**
 * GoldenVisaPage.jsx  ──  Service Page #2
 * ────────────────────────────────────────
 * Bespoke luxury page for UAE 10-Year Golden Visa.
 * Covers: 5 qualification routes — Property, Company Owner, 
 * Manager/Executive, Fixed Deposit, Family Dependent.
 *
 * Data extracted from: https://www.familyvisa.ae/golden-visa/
 * All copy fully rewritten in "Apple-level" luxury tone.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Crown, Building2, Briefcase, PiggyBank, Users, Home,
  ArrowRight, CheckCircle2, ChevronDown, Star, Globe,
  TrendingUp, Clock, ShieldCheck, Zap, Award
} from 'lucide-react';
import {
  SectionShell, SectionInner, SectionHeader,
  LuxuryCard, GoldBadge, LuxuryFAQ, LuxuryFooterCTA,
  LuxuryProcessTimeline, LuxuryDocumentTabs,
  fadeUp, scaleIn
} from '../components/LuxuryServicePage';

// ─── QUALIFICATION ROUTES ──────────────────────────────────────────────────────

const ROUTES = [
  {
    id: 'property',
    icon: Home,
    label: 'Real Estate Investor',
    threshold: 'AED 2,000,000',
    thresholdNote: 'Paid equity in UAE property',
    accentColor: 'from-amber-600 to-amber-800',
    accentLight: 'bg-amber-50',
    accentText: 'text-amber-800',
    summary: 'Own UAE property with a minimum paid equity of AED 2 million. Mortgaged and off-plan properties both qualify. Combine up to 3 properties to reach threshold.',
    criteria: [
      'Minimum paid equity (not purchase price) of AED 2,000,000',
      'One, two, or three combined properties with separate title deeds / Oqood',
      'Mortgaged properties accepted — bank NOC required (we obtain this)',
      'Off-plan developer Oqood accepted at stated value',
      'Joint ownership accepted (each owner qualifies independently per share)',
    ],
    govFee: 'AED 8,850',
    totalEst: 'AED 12,550'
  },
  {
    id: 'company',
    icon: Building2,
    label: 'Company Owner',
    threshold: 'AED 2,000,000+',
    thresholdNote: 'Share capital or audited profit',
    accentColor: 'from-blue-700 to-blue-900',
    accentLight: 'bg-blue-50',
    accentText: 'text-blue-800',
    summary: 'Own a UAE mainland or free zone company with AED 2M+ annual turnover or paid share capital — and achieve minimum AED 250K in annual tax contributions.',
    criteria: [
      'Trade License with minimum 2 years of operation in UAE',
      'Annual audited financial statement showing AED 2M+ turnover or net profit',
      'Annual tax contribution of AED 250,000+ (verified via FTA portal)',
      'Valid ICV Certificate for mainland companies (preferred)',
      'Free zone companies: letter of incorporation + financial audit required',
    ],
    govFee: 'AED 8,850',
    totalEst: 'AED 13,200'
  },
  {
    id: 'manager',
    icon: Briefcase,
    label: 'Manager or Executive',
    threshold: 'AED 30,000/mo',
    thresholdNote: 'Minimum salary from UAE employer',
    accentColor: 'from-slate-700 to-slate-900',
    accentLight: 'bg-surface',
    accentText: 'text-text',
    summary: 'Senior corporate leaders — CFOs, CTOs, VPs, GMs — earning AED 30,000+ monthly from a licensed UAE employer qualify for the 10-Year residency under the "Talented Professionals" stream.',
    criteria: [
      'Monthly salary minimum AED 30,000 (all-in package, per payslip)',
      'Job title must be at director, VP, GM, CFO, CTO, or equivalent level',
      'Employer must hold a valid UAE trade license (mainland or free zone)',
      'Minimum 1-year active employment contract term remaining',
      'Bachelor degree or higher — attested and Ministry-approved',
    ],
    govFee: 'AED 6,720',
    totalEst: 'AED 10,450'
  },
  {
    id: 'deposit',
    icon: PiggyBank,
    label: 'Fixed Deposit',
    threshold: 'AED 2,000,000',
    thresholdNote: 'Locked for 3 years in UAE bank',
    accentColor: 'from-emerald-700 to-emerald-900',
    accentLight: 'bg-emerald-50',
    accentText: 'text-emerald-800',
    summary: 'Maintain a minimum AED 2M fixed deposit in a UAE-licensed bank, locked for a non-withdrawal period of 3 years. This route requires no property or company ownership.',
    criteria: [
      'Minimum fixed deposit balance of AED 2,000,000 at a UAE-licensed bank',
      'Deposit must be locked for a non-withdrawal minimum of 36 months',
      'Bank NOC letter on official letterhead confirming balance and lock-in',
      'Deposit must be in your personal name (not corporate)',
      'All major UAE banks accepted: Emirates NBD, ADCB, FAB, Mashreq, etc.',
    ],
    govFee: 'AED 6,720',
    totalEst: 'AED 10,100'
  },
  {
    id: 'dependent',
    icon: Users,
    label: 'Golden Visa Dependent',
    threshold: 'Sponsored by holder',
    thresholdNote: 'Spouse, children, parents',
    accentColor: 'from-rose-700 to-rose-900',
    accentLight: 'bg-rose-50',
    accentText: 'text-rose-800',
    summary: 'Immediate family members of a UAE Golden Visa holder — spouses, children of any age, and parents — automatically qualify as Golden Visa dependents for the full 10-year duration.',
    criteria: [
      'Primary sponsor must hold an active 10-Year UAE Golden Visa',
      'Spouse (husband or wife) — sponsored regardless of nationality',
      'Children: unmarried sons and daughters, no age restriction',
      'Parents of the Golden Visa holder are eligible for dependent Golden Visa',
      'Domestic workers of Golden Visa holders may be sponsored on 2-year visa',
    ],
    govFee: 'AED 4,890',
    totalEst: 'AED 7,200'
  }
];

const PRIVILEGES = [
  {
    icon: Globe,
    title: 'No Continuous Stay Requirement',
    body: 'Unlike standard residence visas which require entry every 180 days, the Golden Visa has no continuous stay rule. Live abroad for years without losing your UAE residency.'
  },
  {
    icon: ShieldCheck,
    title: '100% Ownership — No Local Sponsor',
    body: 'Golden Visa holders can establish 100% UAE mainland companies without a local Emirati sponsor or partner. Full business sovereignty from day one.'
  },
  {
    icon: Users,
    title: 'Unlimited Family Sponsorship',
    body: 'Sponsor your spouse, children of any age, parents, and an unlimited number of domestic workers — without the minimum salary restrictions of employment visas.'
  },
  {
    icon: Zap,
    title: 'Priority Government Services',
    body: 'Fast-track access to government services, expedited licensing, and priority banking onboarding. Your Golden Visa signals premium residency status across the UAE.'
  },
  {
    icon: Award,
    title: 'Self-Renewing without Employer',
    body: 'The Golden Visa is not tied to any employer. Renewal requires only maintaining the qualifying condition — property ownership, company, salary, or deposit.'
  },
  {
    icon: TrendingUp,
    title: 'UAE Tax Residency Certificate',
    body: 'Qualify for a UAE Tax Residency Certificate to benefit from the UAE\'s 0% personal income tax framework and access the UAE\'s double-tax treaty network of 130+ countries.'
  }
];

const DOCUMENTS = {
  principal: [
    'Passport — minimum 6 months validity (all pages clear and undamaged)',
    'Current UAE Visa or Entry Stamp — if already in-country',
    'Dubai Police Good Conduct Certificate (UAE residents, within 6 months)',
    'Route-specific primary document (Title Deed / Trade License / Payslip / Bank NOC)',
    'Passport-size photographs — white background, high resolution',
    'Emirates ID (if renewing existing Golden Visa)',
    'MOFA attested academic certificates — for Manager/Executive route',
  ],
  family: [
    'Golden Visa holder\'s residence visa copy and Emirates ID',
    'MOFA attested and legally translated marriage certificate (for spouse)',
    'MOFA attested birth certificates for all dependent children',
    'Passport copies for all dependents — 6 months minimum validity',
    'Passport-size photographs for each dependent (white background)',
    'Health insurance policy covering all dependents (mandatory)',
  ]
};

const PROCESS_STEPS = [
  {
    title: 'Eligibility Audit',
    description: 'We run a complete eligibility check against your documents — property, company, salary, or deposit — before a single form is filed. Zero surprises.'
  },
  {
    title: 'Document Preparation',
    description: 'All attestations, translations, Good Conduct certificates, and primary qualification documents are prepared and pre-audited by our legal team.'
  },
  {
    title: 'ICP Nomination & Entry Permit',
    description: 'Your full Golden Visa nomination is filed with GDRFA / ICP. Entry Permit issued within 1–3 business days. Concurrent status change if already in UAE.'
  },
  {
    title: 'VIP Medical, Biometrics & EID',
    description: 'Executive Smart Salem VIP medical (30–120 minutes). Biometric Emirates ID capture. 10-Year residence visa stamp. EID delivered to your door.'
  }
];

const FAQS = [
  {
    q: 'Can I combine property value across multiple emirates for the Golden Visa threshold?',
    a: 'Yes. Property in Dubai, Abu Dhabi, Sharjah, and other emirates all qualify individually. You can combine up to 3 properties across different emirates — as long as the total paid equity across all combined properties reaches AED 2,000,000, you meet the threshold.'
  },
  {
    q: 'How does the Manager/Executive Golden Visa differ from an employment residence visa?',
    a: 'A standard employment residence visa expires the moment your employment ends. The Golden Visa is self-sovereign — it remains valid for 10 years regardless of employer changes, career gaps, or business ventures. It is renewed based on your qualifying condition, not your employer\'s trade license.'
  },
  {
    q: 'Does a joint-ownership property qualify for the Golden Visa?',
    a: 'Yes. In a joint property, each co-owner\'s proportional share of the paid equity is counted independently. If two partners each own 50% of a AED 5,000,000 property, each holds AED 2,500,000 in equity — both individually qualify for the Golden Visa.'
  },
  {
    q: 'What is the minimum age for a child dependent to get a Golden Visa?',
    a: 'There is no minimum age. Newborns and infants can be enrolled as Golden Visa dependents immediately after the parent\'s Golden Visa is activated. There is also no maximum age for unmarried dependent children — a 40-year-old unmarried daughter can remain a dependent of her Golden Visa parent.'
  },
  {
    q: 'Can I cancel my employment visa and switch to a Golden Visa while in the UAE?',
    a: 'Yes. If you are currently on an employment residence visa in the UAE, we process a simultaneous visa status change and Golden Visa entry permit, so you transition without leaving the country. No need for an exit and re-entry trip. Our 72-hour SLA covers in-country status changes.'
  },
  {
    q: 'How long does the full Golden Visa process take with 800 DOCS?',
    a: 'From submission of complete documents: GDRFA/ICP nomination approval 1–3 business days; Good Conduct Certificate 1–2 days; Smart Salem VIP medical 30–120 minutes, same day; biometrics and EID application same day; 10-year Emirates ID production and delivery 5–7 days. Total elapsed calendar time: 7 to 14 days from document submission.'
  },
  {
    q: 'Do I need to cancel my current UAE residence visa before applying for a Golden Visa?',
    a: 'No. If you are currently on any UAE residence visa, we handle the inside-country status change simultaneously with the Golden Visa filing. Your current visa is cancelled only when the new Golden Visa entry permit is approved — ensuring you remain in legal status throughout the transition.'
  }
];

// ─── HERO SECTION ─────────────────────────────────────────────────────────────

function GoldenVisaHero() {
  return (
    <SectionShell className="bg-[#050505] !pt-8 !pb-12 overflow-visible">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[800px] h-[700px] bg-[#D4AF37]/10 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left column */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2 flex-wrap"
            >
              <GoldBadge>10-Year Golden Visa</GoldBadge>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface/5 border border-white/10 text-slate-300 text-[10px] font-mono font-bold uppercase tracking-widest rounded-[10px]">
                5 Qualification Routes
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
              className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black text-white leading-[1.08] tracking-tight"
            >
              The UAE Golden Visa.{' '}
              <span className="bg-gradient-to-r from-[#FFF8DC] via-[#D4AF37] to-[#C59B27] bg-clip-text text-transparent">
                Five Routes.
              </span>
              <br />
              One Elite Status.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
              className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-medium"
            >
              A sovereign 10-year UAE residency — no employer dependency, no continuous stay obligation, no renewal anxiety. Qualify through property, company, salary, deposit, or family sponsorship.
            </motion.p>

            {/* Feature chips */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
              className="flex flex-wrap gap-2"
            >
              {['No Stay Requirement', 'Sponsor Unlimited Family', '100% Company Ownership', '0% Income Tax', 'Self-Renewing'].map(chip => (
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
                href="#routes"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-dark-gold-gloss text-black font-extrabold text-xs uppercase tracking-wider rounded-[10px] shadow-[0_8px_24px_rgba(212,175,55,0.35)]"
              >
                Find My Route <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="https://wa.me/971586600396"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-extrabold text-xs uppercase tracking-wider rounded-[10px] shadow-lg transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Free WhatsApp Audit
              </motion.a>
            </motion.div>
          </div>

          {/* Right — stat block */}
          <div className="lg:col-span-5">
            <GoldenVisaStatCard />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function GoldenVisaStatCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="bg-[#111319] border border-white/10 rounded-[10px] shadow-[0_30px_60px_-20px_rgba(212,175,55,0.15)] overflow-hidden font-sans"
    >
      <div className="h-[3px] bg-gradient-to-r from-[#C59B27] via-[#FFF8DC] to-[#D4AF37]" />

      {/* Crown header */}
      <div className="bg-[#0A0B0E] px-6 py-7 border-b border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-[10px] bg-dark-gold-gloss flex items-center justify-center shadow-[0_6px_18px_rgba(212,175,55,0.3)]">
            <Crown className="w-6 h-6 text-black" />
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37]">UAE Government</div>
            <div className="font-extrabold text-white text-base">10-Year Golden Visa</div>
          </div>
        </div>
        <p className="text-slate-300 text-xs leading-relaxed font-medium">
          Issued by the Federal Authority for Identity, Citizenship, Customs & Ports Security (ICP) — the highest residency tier in the UAE.
        </p>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 divide-x divide-y divide-white/10">
        {[
          { value: '5', label: 'Qualification Routes', sub: 'All eligible nationalities' },
          { value: '10 Yrs', label: 'Residency Duration', sub: 'Self-renewable, no employer' },
          { value: 'AED 0', label: 'Income Tax', sub: 'Personal income, forever' },
          { value: '130+', label: 'Tax Treaty Nations', sub: 'UAE double-tax network' }
        ].map((stat, i) => (
          <div key={i} className="p-4 text-center">
            <div className="font-extrabold text-xl text-[#D4AF37] font-mono">{stat.value}</div>
            <div className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-wide mt-0.5">{stat.label}</div>
            <div className="text-[10px] text-text-muted mt-0.5 font-mono">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="p-5 border-t border-white/10">
        <motion.a
          href="https://wa.me/971586600396"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.97 }}
          className="block w-full text-center py-3.5 rounded-[10px] font-extrabold text-xs uppercase tracking-wider text-black bg-dark-gold-gloss shadow-[0_6px_20px_rgba(212,175,55,0.3)] transition-all cursor-pointer"
        >
          Start Golden Visa Application →
        </motion.a>
        <p className="text-center text-[10px] text-text-muted mt-2 font-mono">Free eligibility check · No commitment · 15-min WhatsApp audit</p>
      </div>
    </motion.div>
  );
}

// ─── ROUTE SELECTOR ────────────────────────────────────────────────────────────

function RouteSelectorSection() {
  const [activeRoute, setActiveRoute] = useState('property');
  const current = ROUTES.find(r => r.id === activeRoute);

  return (
    <SectionShell className="bg-[#0A0B0E]" id="routes">
      <SectionInner>
        <SectionHeader
          eyebrow="Qualification Routes"
          title="Which Golden Visa Path Is Yours?"
          subtitle="Select your primary qualifying category to see exact eligibility criteria, required documents, and government fee estimate."
        />

        {/* Route tabs — horizontal scroll on mobile */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {ROUTES.map(route => (
            <button
              key={route.id}
              onClick={() => setActiveRoute(route.id)}
              className={`
                flex-shrink-0 flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider rounded-[10px] border transition-all duration-200 whitespace-nowrap cursor-pointer
                ${activeRoute === route.id
                  ? 'bg-dark-gold-gloss text-black border-transparent shadow-[0_4px_16px_rgba(212,175,55,0.35)] font-black'
                  : 'bg-[#111319] border-white/10 text-slate-300 hover:border-[#D4AF37]/50 hover:text-white'
                }
              `}
            >
              <route.icon className="w-4 h-4" />
              {route.label}
            </button>
          ))}
        </div>

        {/* Active route detail */}
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
              {/* Main card */}
              <div className="lg:col-span-2">
                <LuxuryCard hover={false} className="p-7 h-full bg-[#111319] border-white/10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[10px] bg-[#D4AF37]/10 border border-[#D4AF37]/30 mb-4">
                    <current.icon className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wide">{current.label}</span>
                  </div>

                  <div className="mb-5">
                    <p className="text-3xl font-extrabold text-[#D4AF37] font-mono">{current.threshold}</p>
                    <p className="text-sm text-slate-300 mt-1 font-medium">{current.thresholdNote}</p>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-medium">{current.summary}</p>

                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4AF37] mb-3">Eligibility Criteria</h4>
                  <ul className="space-y-3">
                    {current.criteria.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-300 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </LuxuryCard>
              </div>

              {/* Fee card */}
              <div>
                <LuxuryCard hover={false} className="h-full bg-[#111319] border-white/10">
                  <div className="h-[3px] bg-gradient-to-r from-[#C59B27] via-[#FFF8DC] to-[#D4AF37]" />
                  <div className="p-6">
                    <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4AF37] mb-5">Fee Estimate</p>
                    <div className="space-y-3 mb-5">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-text-muted font-medium">Government Fees</span>
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
                      className="block w-full text-center py-3.5 rounded-[10px] font-extrabold text-xs uppercase tracking-wider text-black bg-dark-gold-gloss shadow-[0_6px_20px_rgba(212,175,55,0.3)] transition-all cursor-pointer"
                    >
                      Apply via WhatsApp →
                    </motion.a>
                    <p className="text-[10px] text-text-muted text-center mt-3 font-mono">Free eligibility check included</p>
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

// ─── PRIVILEGES BENTO ─────────────────────────────────────────────────────────

function PrivilegesBento() {
  return (
    <SectionShell className="bg-[#050505]">
      <SectionInner>
        <SectionHeader
          eyebrow="Golden Visa Privileges"
          title="A Residency That Works For You — Always"
          subtitle="Beyond ten years of security, the Golden Visa unlocks a suite of sovereign privileges unavailable on any other UAE residency category."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRIVILEGES.map((priv, i) => (
            <LuxuryCard key={i} delay={i * 0.07} className="p-6 group bg-[#111319] border-white/10 hover:border-[#D4AF37] hover:shadow-[0_20px_40px_rgba(212,175,55,0.18)] hover:-translate-y-1 transition-all">
              <div className="w-11 h-11 mb-5 rounded-[10px] bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center group-hover:bg-dark-gold-gloss transition-all duration-300">
                <priv.icon className="w-5 h-5 text-[#D4AF37] group-hover:text-black transition-colors duration-300" />
              </div>
              <h3 className="font-bold text-white text-base mb-2">{priv.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">{priv.body}</p>
            </LuxuryCard>
          ))}
        </div>

        {/* Comparison strip */}
        <motion.div
          className="mt-8 rounded-[10px] overflow-hidden border border-white/10 shadow-lg font-sans"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.3}
        >
          <div className="grid grid-cols-3 text-xs font-mono font-bold uppercase tracking-wider bg-[#111319] border-b border-white/10">
            <div className="p-4 text-text-muted">Feature</div>
            <div className="p-4 text-center border-l border-white/10 text-text-muted">Employment Visa</div>
            <div className="p-4 text-center border-l border-white/10 bg-[#D4AF37]/10 text-[#D4AF37]">Golden Visa</div>
          </div>
          {[
            ['Duration', '2 Years', '10 Years'],
            ['Employer Tied', 'Yes — cancelled on exit', 'No — fully self-sovereign'],
            ['180-Day Stay Rule', 'Mandatory', 'No requirement'],
            ['Family Sponsorship', 'Salary-dependent', 'Unlimited, no threshold'],
            ['Company Ownership', 'Requires local partner', '100% ownership, no sponsor'],
          ].map(([feature, emp, gv], i) => (
            <div key={i} className="grid grid-cols-3 text-sm bg-[#0A0B0E] border-b border-white/5 last:border-0">
              <div className="p-4 font-semibold text-white">{feature}</div>
              <div className="p-4 text-center border-l border-white/5 text-text-muted text-xs font-medium">{emp}</div>
              <div className="p-4 text-center border-l border-white/5 bg-[#D4AF37]/5 text-[#D4AF37] font-bold text-xs">{gv}</div>
            </div>
          ))}
        </motion.div>
      </SectionInner>
    </SectionShell>
  );
}

// ─── ROOT COMPONENT ────────────────────────────────────────────────────────────

export default function GoldenVisaPage() {
  return (
    <div className="font-sans antialiased bg-[#050505] text-white selection:bg-[#D4AF37]/30 selection:text-[#D4AF37]">
      {/* 1. Hero */}
      <GoldenVisaHero />

      {/* 2. Route Selector */}
      <RouteSelectorSection />

      {/* 3. Privileges Bento + Comparison */}
      <PrivilegesBento />

      {/* 4. Document Checklist */}
      <LuxuryDocumentTabs
        documents={DOCUMENTS}
        tabs={[
          { key: 'principal', label: 'Principal Applicant' },
          { key: 'family', label: 'Dependents' }
        ]}
      />

      {/* 5. Process Timeline */}
      <LuxuryProcessTimeline steps={PROCESS_STEPS} />

      {/* 6. FAQ */}
      <LuxuryFAQ faqs={FAQS} />

      {/* 7. Dark CTA */}
      <LuxuryFooterCTA
        headline="Ten Years of Sovereignty. Applied in 72 Hours."
        subline="Share your qualifying route on WhatsApp and we'll deliver your eligibility report, exact government fees, and application timeline in 15 minutes — free."
      />
    </div>
  );
}
