import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Search,
  Clock,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  UserCheck,
  Building,
  FileCheck,
  Scale,
  Sparkles
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

// --- INTERACTIVE VISA VALIDITY & OVERSTAY FINE CALCULATOR WIDGET ---
const VisaValidityCalculator = () => {
  const [visaType, setVisaType] = useState('residence'); // residence | tourist
  const [overstayDays, setOverstayDays] = useState(15);
  const [isGraceExpired, setIsGraceExpired] = useState(true);

  // New Unified Fine Regulations (AED 50/day flat rate)
  const finePerDay = 50;
  const gracePeriodDays = visaType === 'residence' ? 30 : 10;
  
  const actualBillableDays = Math.max(0, overstayDays - (isGraceExpired ? 0 : gracePeriodDays));
  const overstayFineTotal = actualBillableDays * finePerDay;
  const outpassFee = overstayDays > 0 ? 350 : 0;
  const grandTotal = overstayFineTotal + outpassFee;

  return (
    <LuxuryCard className="p-6 md:p-8 bg-gradient-to-br from-[#12100E]/90 via-[#1A1612]/80 to-[#12100E]/90 border-[#D4AF37]/30 backdrop-blur-xl relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-[#D4AF37]/20 pb-4">
        <div>
          <GoldBadge text="GDRFA & ICP Official Status Audit" icon={Search} />
          <h3 className="text-xl md:text-2xl font-serif text-[#FFE58F] mt-2 font-bold">
            UAE Visa Expiry & Overstay Fine Calculator
          </h3>
          <p className="text-xs text-[#D4AF37]/70">
            Unified UAE immigration fine regulations (AED 50/day flat rate) for residence & tourist visas
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs uppercase tracking-widest text-zinc-400 block font-medium">Estimated Fine & Outpass</span>
          <span className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-[#FFE58F] to-amber-400 font-mono">
            AED {grandTotal.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-5">
          {/* Visa Category */}
          <div>
            <label className="text-xs font-semibold text-[#FFE58F] uppercase tracking-wider block mb-2">
              Select Visa Category
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setVisaType('residence')}
                className={`px-4 py-3 rounded-[10px] text-xs font-bold transition-all border flex items-center justify-center gap-2 ${
                  visaType === 'residence'
                    ? 'bg-gradient-to-r from-[#8C5E00] to-[#D4AF37] text-black border-[#FFE58F]'
                    : 'bg-[#1A1612]/60 text-zinc-300 border-[#D4AF37]/20'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                Residence Visa (30-Day Grace)
              </button>
              <button
                type="button"
                onClick={() => setVisaType('tourist')}
                className={`px-4 py-3 rounded-[10px] text-xs font-bold transition-all border flex items-center justify-center gap-2 ${
                  visaType === 'tourist'
                    ? 'bg-gradient-to-r from-[#8C5E00] to-[#D4AF37] text-black border-[#FFE58F]'
                    : 'bg-[#1A1612]/60 text-zinc-300 border-[#D4AF37]/20'
                }`}
              >
                <Building className="w-4 h-4" />
                Visit / Tourist Visa (10-Day Grace)
              </button>
            </div>
          </div>

          {/* Overstay Days Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-[#FFE58F] uppercase tracking-wider">
                Days Past Expiry Date
              </label>
              <span className="text-xs font-mono font-bold text-[#FFE58F] bg-[#8C5E00]/30 px-2.5 py-0.5 rounded border border-[#D4AF37]/30">
                {overstayDays} Day{overstayDays > 1 ? 's' : ''}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="90"
              value={overstayDays}
              onChange={(e) => setOverstayDays(parseInt(e.target.value))}
              className="w-full accent-[#D4AF37] bg-[#1A1612] cursor-pointer"
            />
          </div>

          {/* Grace Period Checkbox */}
          <div className="pt-2 border-t border-[#D4AF37]/15">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={isGraceExpired}
                onChange={(e) => setIsGraceExpired(e.target.checked)}
                className="w-4 h-4 accent-[#D4AF37] rounded"
              />
              <span className="text-xs text-zinc-300 group-hover:text-[#FFE58F] transition-colors">
                Grace period has passed (Fine accrual active)
              </span>
            </label>
          </div>
        </div>

        {/* Invoice Column */}
        <div className="lg:col-span-6 bg-[#0E0C0A] border border-[#D4AF37]/30 rounded-[10px] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-3 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Fine Breakdown
              </span>
              <span className="text-[11px] font-semibold text-amber-400">
                GDRFA / ICP Official Rates
              </span>
            </div>

            <div className="space-y-2 text-xs border-b border-[#D4AF37]/15 pb-3 mb-3">
              <div className="flex justify-between text-zinc-300">
                <span>Overstay Accrual ({actualBillableDays} days @ AED 50/day)</span>
                <span className="font-mono text-[#FFE58F]">AED {overstayFineTotal.toLocaleString()}</span>
              </div>
              {overstayDays > 0 && (
                <div className="flex justify-between text-zinc-300">
                  <span>GDRFA Outpass / Exit Permit Application</span>
                  <span className="font-mono">AED {outpassFee}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-300">
                <span>GDRFA Fine Waiver Petition Service</span>
                <span className="font-mono text-emerald-400">AVAILABLE</span>
              </div>
            </div>

            <div className="space-y-1 text-xs text-zinc-400">
              <div className="text-[11px] font-bold text-[#FFE58F] uppercase tracking-wider mb-1">
                Fine Amnesty & Reduction:
              </div>
              <p className="text-[11px] text-zinc-300 leading-relaxed">
                If you have accumulated significant overstay fines due to humanitarian, legal, or medical reasons, our PRO team can submit an official reduction petition to GDRFA Dubai.
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
              Verify Passport / File Reduction Petition <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </LuxuryCard>
  );
};

export default function VisaValidityPage() {
  const bentoServices = [
    {
      icon: Search,
      title: 'GDRFA & ICP Live Status Audit',
      desc: 'Checking official UAE immigration portals using your passport number, visa number, or file number.'
    },
    {
      icon: Scale,
      title: 'GDRFA Overstay Fine Waiver Petition',
      desc: 'Submitting legal petitions to the General Directorate of Residency for fine reductions on medical or technical grounds.'
    },
    {
      icon: FileCheck,
      title: 'Exit Permit & Outpass Issuance',
      desc: 'Securing official GDRFA exit permits (outpass) for overstayed individuals exiting the country cleanly.'
    },
    {
      icon: Clock,
      title: 'Grace Period Transition Management',
      desc: 'Managing status amendments during the 30-day residency grace period without incurring overstay penalties.'
    },
    {
      icon: ShieldCheck,
      title: 'Absconding Case Clearance',
      desc: 'Legal investigation and clearance of absconding reports (Huroob) registered on employment files.'
    },
    {
      icon: UserCheck,
      title: 'In-Country Status Amendment',
      desc: 'Executing seamless status change from expired visa to new residence visa without leaving the UAE.'
    }
  ];

  const documentTabs = [
    {
      id: 'audit',
      title: 'Visa Status Audit',
      icon: Search,
      docs: [
        { name: 'Passport Copy of Visa Holder', req: 'Mandatory', hint: 'Showing passport number, nationality & DOB' },
        { name: 'Unified Number (UID) / Visa File Number', req: 'Conditional', hint: 'Found on old visa sticker or entry permit' },
        { name: 'Emirates ID Number (If Resident)', req: 'Conditional', hint: 'Used for GDRFA Dubai smart system lookup' }
      ]
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Passport & File Number Submission',
      desc: 'Provide your passport details or UID number via WhatsApp for instant status lookup.'
    },
    {
      step: '02',
      title: 'Official GDRFA System Audit',
      desc: 'Our team queries official Dubai immigration servers to determine exact fine amount and expiry status.'
    },
    {
      step: '03',
      title: 'Petition Filing or Settlement',
      desc: 'Executing fine payment or filing humanitarian reduction petitions with GDRFA committee.'
    },
    {
      step: '04',
      title: 'Status Amendment or Exit Outpass',
      desc: 'Issuing your new Entry Permit / Status Change or securing your clean Airport Exit Outpass.'
    }
  ];

  const faqs = [
    {
      q: 'How do I check my UAE visa validity and overstay fine online?',
      a: 'You can check your visa validity using your passport number and expiration date on the official GDRFA Dubai portal (for Dubai visas) or the ICP portal (for other Emirates). Alternatively, send your details to our team via WhatsApp for an instant status check.'
    },
    {
      q: 'What is the daily overstay fine rate in the UAE?',
      a: 'Under unified UAE immigration rules introduced in 2023, the overstay fine is a flat AED 50 per day for both residence visas and visit/tourist visas once the grace period expires.'
    },
    {
      q: 'How many days is the grace period after a residence visa expires or is cancelled?',
      a: 'For Dubai residence visas, residents are granted a 30-day grace period from the date of visa cancellation or expiry to renew, change status, or depart the country without incurring fines.'
    },
    {
      q: 'Can overstay fines in Dubai be reduced or waived?',
      a: 'Yes. GDRFA Dubai allows overstayed individuals to submit official fine reduction or waiver petitions if compelling medical, technical, or humanitarian reasons prevented timely visa renewal or exit.'
    }
  ];

  return (
    <SectionShell activeServiceId="visa-validity">
      {/* --- HERO SECTION --- */}
      <div className="relative pt-6 pb-12 overflow-hidden">
        <SectionInner>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div variants={fadeUp} className="lg:col-span-7 space-y-6">
              <GoldBadge text="Live GDRFA & ICP Immigration Audit" icon={Search} />

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.1]">
                UAE Visa Validity & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFE58F] to-[#D4AF37]">
                  Overstay Fine Audit
                </span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
                Check your UAE visa expiry date, calculate daily overstay fines, and request official GDRFA fine reduction petitions online.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#D4AF37]/20">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FFE58F] font-mono">AED 50/Day</div>
                  <div className="text-xs text-zinc-400 mt-1">Flat Overstay Rate</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FFE58F] font-mono">30 Days</div>
                  <div className="text-xs text-zinc-400 mt-1">Residence Grace Period</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FFE58F] font-mono">100%</div>
                  <div className="text-xs text-zinc-400 mt-1">GDRFA Portal Audit</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="https://wa.me/9718003627"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-[10px] bg-gradient-to-r from-[#8C5E00] via-[#D4AF37] to-[#8C5E00] text-black font-bold text-sm uppercase tracking-wider hover:opacity-95 transition-all shadow-xl shadow-[#D4AF37]/20 flex items-center gap-3"
                >
                  Audit Visa Status via WhatsApp <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Calculator Column */}
            <motion.div variants={scaleIn} className="lg:col-span-12">
              <VisaValidityCalculator />
            </motion.div>
          </div>
        </SectionInner>
      </div>

      {/* --- BENTO CAPABILITIES --- */}
      <div className="py-16 bg-[#0E0C0A]/60 border-y border-[#D4AF37]/15">
        <SectionInner>
          <SectionHeader
            badge="Immigration Audit Architecture"
            title="Comprehensive Visa Status & Fine Management"
            subtitle="Resolving immigration overstays, exit permits, and status amendments with complete legal precision."
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
            title="Required Information for Status Audit"
            subtitle="Essential passport details needed for GDRFA immigration system lookup."
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
            title="Visa Status Audit & Fine Waiver Flow"
            subtitle="From instant system query to official fine petitioning and status amendment."
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
            badge="Immigration FAQ"
            title="Frequently Asked Visa Validity Questions"
            subtitle="Essential information on overstay fine rates, grace periods, and GDRFA waiver petitions."
          />

          <div className="mt-12 max-w-4xl mx-auto">
            <LuxuryFAQ items={faqs} />
          </div>
        </SectionInner>
      </div>

      {/* --- FOOTER CTA --- */}
      <LuxuryFooterCTA
        title="Check Your Visa Expiry & Overstay Fines Today"
        subtitle="Audit your passport status with our senior PRO team and file an official GDRFA fine reduction petition."
        buttonText="Audit Status via WhatsApp"
        whatsappNumber="9718003627"
      />
    </SectionShell>
  );
}
