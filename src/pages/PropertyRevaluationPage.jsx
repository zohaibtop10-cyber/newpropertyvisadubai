import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Building,
  FileCheck,
  Award,
  CheckCircle2,
  Clock,
  ArrowRight,
  Home,
  FileText,
  DollarSign,
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

// --- INTERACTIVE PROPERTY REVALUATION CALCULATOR WIDGET ---
const RevaluationCalculator = () => {
  const [propCategory, setPropCategory] = useState('residential'); // residential | commercial | land
  const [valPurpose, setValPurpose] = useState('golden-visa'); // golden-visa | mortgage | hiba | corporate-tax

  const valPrices = {
    residential: { name: 'Residential Apartment / Villa / Townhouse', dldFee: 4000, adminFee: 230, time: '3 - 5 Business Days' },
    commercial: { name: 'Commercial Office / Retail / Warehouse', dldFee: 4000, adminFee: 230, time: '3 - 5 Business Days' },
    land: { name: 'Vacant Plot / Mixed-Use Land Building', dldFee: 10000, adminFee: 230, time: '5 - 7 Business Days' }
  };

  const curr = valPrices[propCategory];
  const proServiceFee = 750;
  const grandTotal = curr.dldFee + curr.adminFee + proServiceFee;

  return (
    <LuxuryCard className="p-6 md:p-8 bg-gradient-to-br from-[#12100E]/90 via-[#1A1612]/80 to-[#12100E]/90 border-[#D4AF37]/30 backdrop-blur-xl relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-[#D4AF37]/20 pb-4">
        <div>
          <GoldBadge text="DLD Valuation Simulator" icon={TrendingUp} />
          <h3 className="text-xl md:text-2xl font-serif text-[#FFE58F] mt-2 font-bold">
            Official DLD Property Valuation Calculator
          </h3>
          <p className="text-xs text-[#D4AF37]/70">
            Real-time Dubai Land Department official property valuation fees & turnaround times
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs uppercase tracking-widest text-zinc-400 block font-medium">Estimated Total</span>
          <span className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFE58F] to-[#D4AF37] font-mono">
            AED {grandTotal.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-5">
          {/* Property Category */}
          <div>
            <label className="text-xs font-semibold text-[#FFE58F] uppercase tracking-wider block mb-2">
              Select Property Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'residential', label: 'Residential', sub: 'Apartment/Villa' },
                { id: 'commercial', label: 'Commercial', sub: 'Office/Retail' },
                { id: 'land', label: 'Land Plot', sub: 'Vacant / Project' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPropCategory(item.id)}
                  className={`p-3 rounded-[10px] text-left transition-all border ${
                    propCategory === item.id
                      ? 'bg-[#8C5E00]/40 border-[#D4AF37] text-[#FFE58F]'
                      : 'bg-[#1A1612]/60 border-[#D4AF37]/15 text-zinc-400'
                  }`}
                >
                  <div className="text-xs font-bold">{item.label}</div>
                  <div className="text-[10px] text-zinc-400 truncate mt-0.5">{item.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Valuation Purpose */}
          <div>
            <label className="text-xs font-semibold text-[#FFE58F] uppercase tracking-wider block mb-2">
              Primary Purpose of Valuation Certificate
            </label>
            <select
              value={valPurpose}
              onChange={(e) => setValPurpose(e.target.value)}
              className="w-full bg-[#1A1612] border border-[#D4AF37]/30 rounded-[10px] px-4 py-3 text-xs text-[#FFE58F] font-semibold focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="golden-visa">10-Year Golden Visa Qualification (Min AED 2M Threshold)</option>
              <option value="mortgage">Mortgage Refinance / Equity Release</option>
              <option value="hiba">Family Gift (Hiba) Property Transfer</option>
              <option value="corporate-tax">Corporate Tax / Audited Financial Statements</option>
            </select>
          </div>
        </div>

        {/* Invoice Column */}
        <div className="lg:col-span-6 bg-[#0E0C0A] border border-[#D4AF37]/30 rounded-[10px] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-3 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                <FileCheck className="w-4 h-4" /> Valuation Certificate Quote
              </span>
              <span className="text-[11px] font-semibold text-[#FFE58F]">
                {curr.time}
              </span>
            </div>

            <div className="text-xs font-bold text-[#FFE58F] mb-1">{curr.name}</div>

            <div className="space-y-2 text-xs border-y border-[#D4AF37]/15 py-3 mb-3">
              <div className="flex justify-between text-zinc-300">
                <span>DLD Official Valuation Certificate Fee</span>
                <span className="font-mono">AED {curr.dldFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>DLD Innovation & Knowledge Fee</span>
                <span className="font-mono">AED {curr.adminFee}</span>
              </div>
              <div className="flex justify-between text-[#D4AF37]">
                <span>Concierge Application & Site Inspection Filing</span>
                <span className="font-mono">AED {proServiceFee}</span>
              </div>
            </div>

            <div className="space-y-1 text-xs text-zinc-400">
              <div className="text-[11px] font-bold text-[#FFE58F] uppercase tracking-wider mb-1">
                Golden Visa Benefit:
              </div>
              <p className="text-[11px] text-zinc-300 leading-relaxed">
                If your property’s current market value has appreciated to AED 2,000,000 or above, this DLD Valuation Certificate serves as official government proof to unlock your 10-Year UAE Golden Visa.
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
              Apply for DLD Valuation Certificate <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </LuxuryCard>
  );
};

export default function PropertyRevaluationPage() {
  const bentoServices = [
    {
      icon: Award,
      title: 'Golden Visa Valuation Proof',
      desc: 'Official DLD valuation certifying market appreciation to AED 2 Million+, enabling Golden Visa eligibility without buying new real estate.'
    },
    {
      icon: TrendingUp,
      title: 'DLD Official Valuation Certificate',
      desc: 'Government certificate issued directly by Dubai Land Department real estate evaluation committee.'
    },
    {
      icon: Home,
      title: 'Family Gift Transfer (Hiba) Audit',
      desc: 'Determining exact property market value to calculate the 0.125% reduced DLD gift transfer fee.'
    },
    {
      icon: DollarSign,
      title: 'Mortgage Refinance & Equity Release',
      desc: 'Providing bank-accepted valuation certificates to unlock equity and refinance existing property mortgages.'
    },
    {
      icon: Scale,
      title: 'Corporate Tax & Audit Compliance',
      desc: 'Audited property valuations for corporate balance sheets and UAE Federal Tax Authority (FTA) reporting.'
    },
    {
      icon: FileCheck,
      title: 'Site Inspection Coordination',
      desc: 'Managing DLD official valuer appointments, site visits, and photo inspections across all Dubai communities.'
    }
  ];

  const documentTabs = [
    {
      id: 'residential',
      title: 'Residential Property',
      icon: Home,
      docs: [
        { name: 'Original Title Deed Copy', req: 'Mandatory', hint: 'Issued by Dubai Land Department' },
        { name: 'Ejari Tenancy Contract (If Rented)', req: 'Conditional', hint: 'Showing annual rental income' },
        { name: 'DEWA Account Number / Bill', req: 'Mandatory', hint: 'Verifying active utility connection' },
        { name: 'Owner Passport & Emirates ID', req: 'Mandatory', hint: 'Clear color copy of owner details' }
      ]
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Title Deed & DEWA Document Audit',
      desc: 'Reviewing title deeds, DEWA records, and floor plans for DLD submission.'
    },
    {
      step: '02',
      title: 'DLD Valuation Portal Filing',
      desc: 'Electronic submission into the Dubai Land Department valuation system.'
    },
    {
      step: '03',
      title: 'DLD Physical / Smart Site Inspection',
      desc: 'Coordinating valuer inspection or automated algorithmic DLD assessment.'
    },
    {
      step: '04',
      title: 'Valuation Certificate Issuance',
      desc: 'Receiving the official stamped DLD Valuation Certificate bearing the certified market price.'
    }
  ];

  const faqs = [
    {
      q: 'What is a DLD Property Valuation Certificate?',
      a: 'A DLD Property Valuation Certificate is an official document issued by the Dubai Land Department certifying the current fair market value of a specific real estate asset in Dubai based on historical transaction data and physical inspection.'
    },
    {
      q: 'How does property revaluation help with the 10-Year Golden Visa?',
      a: 'If you bought a property years ago for less than AED 2 Million, but its current market value has appreciated to AED 2 Million or more, a DLD Valuation Certificate proves your property meets the Golden Visa financial requirement.'
    },
    {
      q: 'What is the official DLD fee for a property valuation certificate in Dubai?',
      a: 'The official DLD fee is AED 4,000 + AED 230 knowledge/innovation fee for residential apartments, villas, and commercial units. For vacant land plots, the DLD fee is AED 10,000 + AED 230.'
    },
    {
      q: 'How long does it take to receive the DLD Valuation Certificate?',
      a: 'Standard processing takes 3 to 5 business days from the date of submission and fee payment.'
    }
  ];

  return (
    <SectionShell activeServiceId="property-revaluation">
      {/* --- HERO SECTION --- */}
      <div className="relative pt-6 pb-12 overflow-hidden">
        <SectionInner>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div variants={fadeUp} className="lg:col-span-7 space-y-6">
              <GoldBadge text="Official Dubai Land Department Valuation" icon={TrendingUp} />

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.1]">
                Property Revaluation & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFE58F] to-[#D4AF37]">
                  DLD Valuation Certificate
                </span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
                Unlock your 10-Year Golden Visa, family gift transfers, and mortgage refinancing with an official DLD Property Valuation Certificate in Dubai.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#D4AF37]/20">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FFE58F] font-mono">100%</div>
                  <div className="text-xs text-zinc-400 mt-1">DLD Official Seals</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FFE58F] font-mono">AED 2M+</div>
                  <div className="text-xs text-zinc-400 mt-1">Golden Visa Threshold</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FFE58F] font-mono">3-5 Days</div>
                  <div className="text-xs text-zinc-400 mt-1">Certificate Turnaround</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="https://wa.me/9718003627"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-[10px] bg-gradient-to-r from-[#8C5E00] via-[#D4AF37] to-[#8C5E00] text-black font-bold text-sm uppercase tracking-wider hover:opacity-95 transition-all shadow-xl shadow-[#D4AF37]/20 flex items-center gap-3"
                >
                  Apply for Valuation Certificate <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Calculator Column */}
            <motion.div variants={scaleIn} className="lg:col-span-12">
              <RevaluationCalculator />
            </motion.div>
          </div>
        </SectionInner>
      </div>

      {/* --- BENTO CAPABILITIES --- */}
      <div className="py-16 bg-[#0E0C0A]/60 border-y border-[#D4AF37]/15">
        <SectionInner>
          <SectionHeader
            badge="Valuation Architecture"
            title="Real Estate Market Revaluation Solutions"
            subtitle="Government-recognized valuation reports formatted for immigration, taxation, and mortgage authorities."
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
            badge="Pre-Requisite Matrix"
            title="Required Documentation for Property Valuation"
            subtitle="Essential title deeds and DEWA documents needed for DLD valuation filing."
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
            badge="4-Stage Valuation Flow"
            title="DLD Valuation Certificate Filing Process"
            subtitle="From document upload to DLD site inspection and final certificate delivery."
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
            badge="Valuation FAQ"
            title="Frequently Asked Property Valuation Questions"
            subtitle="Essential information regarding Golden Visa thresholds, DLD valuer visits, and fees."
          />

          <div className="mt-12 max-w-4xl mx-auto">
            <LuxuryFAQ items={faqs} />
          </div>
        </SectionInner>
      </div>

      {/* --- FOOTER CTA --- */}
      <LuxuryFooterCTA
        title="Get Your Official DLD Property Valuation Certificate"
        subtitle="Consult with our real estate valuation directors to verify your property market appreciation and Golden Visa eligibility."
        buttonText="Get DLD Certificate via WhatsApp"
        whatsappNumber="9718003627"
      />
    </SectionShell>
  );
}
