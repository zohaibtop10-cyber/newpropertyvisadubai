import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Calculator,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  DollarSign,
  Briefcase,
  FileCheck,
  Scale,
  Sparkles,
  Users
} from 'lucide-react';
import {
  SectionShell,
  SectionInner,
  SectionHeader,
  LuxuryCard,
  GoldBadge,
  LuxuryFAQ,
  LuxuryFooterCTA,
  LuxuryProcessTimeline,
  LuxuryDocumentTabs,
  fadeUp,
  scaleIn
} from '../components/LuxuryServicePage';

// --- INTERACTIVE ILOE PAYOUT & FINE CALCULATOR WIDGET ---
const IloeCalculator = () => {
  const [basicSalary, setBasicSalary] = useState(12000);
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [monthsUnpaid, setMonthsUnpaid] = useState(0);

  // Category Determination
  const isCategoryA = basicSalary <= 16000;
  const categoryTier = isCategoryA ? 'Category 1 (Basic Salary ≤ AED 16,000)' : 'Category 2 (Basic Salary > AED 16,000)';

  // Monthly Premium
  const monthlyPremium = isCategoryA ? 5 : 10;
  const annualPremium = monthlyPremium * 12;

  // Monthly Unemployment Payout (60% of basic salary capped)
  const calculatedPayout = Math.round(basicSalary * 0.6);
  const maxCap = isCategoryA ? 10000 : 20000;
  const actualMonthlyPayout = Math.min(calculatedPayout, maxCap);
  const totalMax3MonthPayout = actualMonthlyPayout * 3;

  // Fine Calculation
  const nonSubscriptionFine = !isSubscribed ? 400 : 0;
  const latePaymentFine = monthsUnpaid >= 3 ? 200 : 0;
  const totalFines = nonSubscriptionFine + latePaymentFine;

  return (
    <LuxuryCard className="p-6 md:p-8 bg-gradient-to-br from-[#12100E]/90 via-[#1A1612]/80 to-[#12100E]/90 border-[#D4AF37]/30 backdrop-blur-xl relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-[#D4AF37]/20 pb-4">
        <div>
          <GoldBadge text="MOHRE ILOE Insurance Simulator" icon={ShieldCheck} />
          <h3 className="text-xl md:text-2xl font-serif text-[#FFE58F] mt-2 font-bold">
            ILOE Premium, Fine & Unemployment Payout Calculator
          </h3>
          <p className="text-xs text-[#D4AF37]/70">
            Mandatory UAE Involuntary Loss of Employment Insurance (MOHRE Federal Law)
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs uppercase tracking-widest text-zinc-400 block font-medium">Max 3-Month Claim Payout</span>
          <span className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-[#FFE58F] to-emerald-400 font-mono">
            AED {totalMax3MonthPayout.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-5">
          {/* Basic Salary Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-[#FFE58F] uppercase tracking-wider">
                Monthly Basic Salary (MOHRE Contract)
              </label>
              <span className="text-xs font-mono font-bold text-[#FFE58F] bg-[#8C5E00]/30 px-2.5 py-0.5 rounded border border-[#D4AF37]/30">
                AED {basicSalary.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="2000"
              max="50000"
              step="1000"
              value={basicSalary}
              onChange={(e) => setBasicSalary(parseInt(e.target.value))}
              className="w-full accent-[#D4AF37] bg-[#1A1612] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-400 mt-1 font-mono">
              <span>AED 2,000 (Cat 1)</span>
              <span>AED 16,000 (Tier Shift)</span>
              <span>AED 50,000+ (Cat 2 Cap)</span>
            </div>
          </div>

          {/* Subscription & Fine Checkers */}
          <div className="pt-3 border-t border-[#D4AF37]/15 space-y-3">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={!isSubscribed}
                onChange={(e) => setIsSubscribed(!e.target.checked)}
                className="w-4 h-4 accent-amber-500 rounded"
              />
              <span className="text-xs text-zinc-300 group-hover:text-[#FFE58F] transition-colors">
                I have NOT subscribed to ILOE insurance yet (Applies AED 400 Fine)
              </span>
            </label>

            {!isSubscribed && (
              <div className="p-3 rounded-[8px] bg-red-950/40 border border-red-500/30 flex items-center justify-between text-xs text-red-300">
                <span className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" /> Non-Subscription Penalty
                </span>
                <span className="font-mono font-bold">AED 400 Fine</span>
              </div>
            )}
          </div>
        </div>

        {/* Breakdown Column */}
        <div className="lg:col-span-6 bg-[#0E0C0A] border border-[#D4AF37]/30 rounded-[10px] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-3 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> ILOE Coverage Summary
              </span>
              <span className="text-[11px] font-semibold text-emerald-400">
                {categoryTier}
              </span>
            </div>

            <div className="space-y-2 text-xs border-b border-[#D4AF37]/15 pb-3 mb-3">
              <div className="flex justify-between text-zinc-300">
                <span>Annual ILOE Premium Cost</span>
                <span className="font-mono text-[#FFE58F]">AED {annualPremium} / Year (AED {monthlyPremium}/mo)</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Monthly Compensation Payout (60% Basic)</span>
                <span className="font-mono text-emerald-400 font-bold">AED {actualMonthlyPayout.toLocaleString()} / Month</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Maximum Benefit Period</span>
                <span className="font-mono">3 Consecutive Months</span>
              </div>
              {totalFines > 0 && (
                <div className="flex justify-between text-red-400 font-bold pt-1">
                  <span>Outstanding MOHRE Fines</span>
                  <span className="font-mono">AED {totalFines}</span>
                </div>
              )}
            </div>

            <div className="space-y-1 text-xs text-zinc-400">
              <div className="text-[11px] font-bold text-[#FFE58F] uppercase tracking-wider mb-1">
                Claim Eligibility:
              </div>
              <p className="text-[11px] text-zinc-300 leading-relaxed">
                Requires minimum 12 consecutive months of ILOE subscription. Involuntary job loss compensation pays 60% of average basic salary for up to 3 months.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-[#D4AF37]/20">
            <a
              href="https://wa.me/9718003627"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-[10px] bg-gradient-to-r from-[#8C5E00] via-[#D4AF37] to-[#8C5E00] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-lg shadow-[#D4AF37]/20"
            >
              Check ILOE Fines & Subscribe Online <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </LuxuryCard>
  );
};

export default function ILOEInsurancePage() {
  const bentoServices = [
    {
      icon: ShieldCheck,
      title: 'Mandatory Unemployment Coverage',
      desc: 'Compliance under UAE Federal Decree Law No. 13 of 2022 for all mainland and freezone employees.'
    },
    {
      icon: DollarSign,
      title: '60% Monthly Basic Payout',
      desc: 'Involuntary job loss protection paying 60% of your average basic salary for up to 3 consecutive months.'
    },
    {
      icon: AlertTriangle,
      title: 'Emirates ID Fine Clearance',
      desc: 'Checking and clearing unpaid MOHRE ILOE fines (AED 400 non-subscription fine, AED 200 late payment fine).'
    },
    {
      icon: Briefcase,
      title: 'Category 1 & Category 2 Plans',
      desc: 'Low-cost mandatory plans: AED 5/month for basic salary ≤ AED 16k, and AED 10/month for basic salary > AED 16k.'
    },
    {
      icon: FileCheck,
      title: '30-Day Claim Submission Desk',
      desc: 'Assistance filing formal unemployment claims within the 30-day statutory window following job termination.'
    },
    {
      icon: Users,
      title: 'Corporate Employee Bulk Enrolment',
      desc: 'Retainer management for enterprise employers enrolling hundreds of staff onto the ILOE portal.'
    }
  ];

  const documentTabs = [
    {
      id: 'subscription',
      title: 'Registration',
      icon: ShieldCheck,
      docs: [
        { name: 'Emirates ID Number', req: 'Mandatory', hint: '15-digit EID number of employee' },
        { name: 'Active UAE Mobile Number', req: 'Mandatory', hint: 'Receives OTP for ILOE portal login' },
        { name: 'MOHRE Basic Salary Confirmation', req: 'Mandatory', hint: 'Determines Category 1 or Category 2 tier' }
      ]
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Emirates ID Fine & Status Audit',
      desc: 'Checking official ILOE insurance portal for active subscription or unpaid fines.'
    },
    {
      step: '02',
      title: 'Fine Settlement (If Applicable)',
      desc: 'Clearing outstanding AED 400 / AED 200 MOHRE penalties to unlock work permit transfers.'
    },
    {
      step: '03',
      title: '1-Year or 2-Year Policy Subscription',
      desc: 'Executing annual policy payment (AED 60 or AED 120 + VAT) on the official ILOE portal.'
    },
    {
      step: '04',
      title: 'Digital Policy & Certificate Delivery',
      desc: 'Instant issuance of official ILOE Insurance Certificate sent via SMS/Email.'
    }
  ];

  const faqs = [
    {
      q: 'Is ILOE Insurance mandatory for all employees in the UAE?',
      a: 'Yes. ILOE (Involuntary Loss of Employment) insurance is mandatory for all UAE private sector and federal government employees. Failure to subscribe incurs an AED 400 fine.'
    },
    {
      q: 'What happens if I fail to pay my ILOE insurance fines?',
      a: 'Unpaid ILOE fines (AED 400 for non-subscription, AED 200 for late payment) can be deducted from your salary or end-of-service gratuity and will block the issuance of new MOHRE work permits.'
    },
    {
      q: 'How much compensation does ILOE pay if I am terminated?',
      a: 'If terminated involuntarily (not for cause or resignation), ILOE pays 60% of your average basic salary for up to 3 months, capped at AED 10,000/month for Category 1 and AED 20,000/month for Category 2.'
    },
    {
      q: 'Who is exempt from mandatory ILOE insurance in the UAE?',
      a: 'Investors/business owners, domestic workers, temporary contract workers, juveniles under 18, and retirees receiving a pension who have re-entered employment.'
    }
  ];

  return (
    <SectionShell activeServiceId="iloe-insurance">
      {/* --- HERO SECTION --- */}
      <div className="relative pt-6 pb-12 overflow-hidden">
        <SectionInner>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div variants={fadeUp} className="lg:col-span-7 space-y-6">
              <GoldBadge text="Mandatory UAE Unemployment Insurance" icon={ShieldCheck} />

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.1]">
                ILOE Insurance Status & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFE58F] to-[#D4AF37]">
                  MOHRE Fine Clearance
                </span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
                Check your ILOE status by Emirates ID, calculate 60% unemployment payouts, and clear outstanding MOHRE fines online.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#D4AF37]/20">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FFE58F] font-mono">AED 5/Mo</div>
                  <div className="text-xs text-zinc-400 mt-1">Category 1 Premium</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FFE58F] font-mono">60% Payout</div>
                  <div className="text-xs text-zinc-400 mt-1">Unemployment Benefit</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FFE58F] font-mono">AED 400</div>
                  <div className="text-xs text-zinc-400 mt-1">Non-Subscription Fine</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="https://wa.me/9718003627"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-[10px] bg-gradient-to-r from-[#8C5E00] via-[#D4AF37] to-[#8C5E00] text-black font-bold text-sm uppercase tracking-wider hover:opacity-95 transition-all shadow-xl shadow-[#D4AF37]/20 flex items-center gap-3"
                >
                  Check ILOE Fines via WhatsApp <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Calculator Column */}
            <motion.div variants={scaleIn} className="lg:col-span-12">
              <IloeCalculator />
            </motion.div>
          </div>
        </SectionInner>
      </div>

      {/* --- BENTO CAPABILITIES --- */}
      <div className="py-16 bg-[#0E0C0A]/60 border-y border-[#D4AF37]/15">
        <SectionInner>
          <SectionHeader
            badge="Social Protection Architecture"
            title="Comprehensive ILOE & MOHRE Compliance"
            subtitle="Protecting UAE workforce livelihoods through mandatory unemployment scheme management."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {bentoServices.map((svc, idx) => {
              const IconComp = svc.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="p-6 rounded-[10px] bg-[#161310] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
                >
                  <div className="w-12 h-12 rounded-[8px] bg-gradient-to-br from-[#8C5E00]/30 to-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#FFE58F] mb-5 group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-serif text-[#FFE58F] font-bold mb-2">
                    {svc.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {svc.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </SectionInner>
      </div>

      {/* --- DOCUMENT TABS --- */}
      <div className="py-16">
        <SectionInner>
          <SectionHeader
            badge="Checklist Matrix"
            title="Required Information for ILOE Subscription"
            subtitle="Essential IDs needed for fine clearance and portal subscription."
          />

          <div className="mt-10">
            <LuxuryDocumentTabs tabs={documentTabs} />
          </div>
        </SectionInner>
      </div>

      {/* --- PROCESS TIMELINE --- */}
      <div className="py-16 bg-[#0E0C0A]/80 border-t border-[#D4AF37]/15">
        <SectionInner>
          <SectionHeader
            badge="4-Stage Workflow"
            title="ILOE Registration & Fine Clearance Flow"
            subtitle="From Emirates ID fine audit to instant digital policy certificate delivery."
          />

          <div className="mt-12">
            <LuxuryProcessTimeline steps={processSteps} />
          </div>
        </SectionInner>
      </div>

      {/* --- FAQ SECTION --- */}
      <div className="py-16">
        <SectionInner>
          <SectionHeader
            badge="ILOE FAQ"
            title="Frequently Asked ILOE Insurance Questions"
            subtitle="Essential insights on MOHRE fines, claim payouts, and eligibility thresholds."
          />

          <div className="mt-12 max-w-4xl mx-auto">
            <LuxuryFAQ items={faqs} />
          </div>
        </SectionInner>
      </div>

      {/* --- FOOTER CTA --- */}
      <LuxuryFooterCTA
        title="Subscribe to ILOE & Clear Fines Today"
        subtitle="Avoid work permit blocks and salary deductions by checking and clearing your ILOE insurance status."
        buttonText="Clear ILOE Fines via WhatsApp"
        whatsappNumber="9718003627"
      />
    </SectionShell>
  );
}
