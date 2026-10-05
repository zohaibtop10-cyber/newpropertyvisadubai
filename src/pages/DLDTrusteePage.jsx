import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  FileCheck,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Home,
  FileText,
  DollarSign,
  Briefcase,
  Layers,
  Award
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

// --- INTERACTIVE DLD TRUSTEE CALCULATOR WIDGET ---
const DldTrusteeCalculator = () => {
  const [transferType, setTransferType] = useState('sale'); // sale | gift | mortgage | titledeed
  const [propertyValue, setPropertyValue] = useState(2500000); // Property Price in AED

  const transferSpecs = {
    sale: {
      name: 'Property Sale Transfer (Buyer & Seller)',
      dldRate: 0.04, // 4% DLD Fee
      trusteeFee: propertyValue >= 500000 ? 4000 : 2000,
      adminFee: 580,
      desc: 'Official transfer of property ownership from seller to buyer at a DLD Real Estate Trustee office.'
    },
    gift: {
      name: 'First-Degree Family Gift Transfer (Hiba)',
      dldRate: 0.00125, // 0.125% DLD Fee for direct relatives
      trusteeFee: 4000,
      adminFee: 580,
      desc: 'Transferring property ownership between parents, children, or spouses at reduced DLD gift rates.'
    },
    mortgage: {
      name: 'Mortgage Registration / Discharge',
      dldRate: 0.0025, // 0.25% of loan value
      trusteeFee: 1290,
      adminFee: 290,
      desc: 'Registering a new bank mortgage or discharging an paid-off bank mortgage on DLD title deed.'
    },
    titledeed: {
      name: 'Title Deed Issuance / Modification',
      dldRate: 0,
      trusteeFee: 250,
      adminFee: 250,
      desc: 'Issuing a new electronic DLD Title Deed following developer handover or legal update.'
    }
  };

  const currentTransfer = transferSpecs[transferType];
  const dldGovFee = Math.round(propertyValue * currentTransfer.dldRate);
  const totalTrusteeFee = currentTransfer.trusteeFee + currentTransfer.adminFee;
  const grandTotal = dldGovFee + totalTrusteeFee;

  return (
    <LuxuryCard className="p-6 md:p-8 bg-gradient-to-br from-[#12100E]/90 via-[#1A1612]/80 to-[#12100E]/90 border-[#D4AF37]/30 backdrop-blur-xl relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-[#D4AF37]/20 pb-4">
        <div>
          <GoldBadge text="DLD Trustee Office Simulator" icon={Building2} />
          <h3 className="text-xl md:text-2xl font-serif text-[#FFE58F] mt-2 font-bold">
            Dubai Property Trustee Fee Calculator
          </h3>
          <p className="text-xs text-[#D4AF37]/70">
            Real-time Dubai Land Department (DLD) transfer fees, trustee charges, and admin fees
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs uppercase tracking-widest text-zinc-400 block font-medium">Estimated Total Fee</span>
          <span className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFE58F] to-[#D4AF37] font-mono">
            AED {grandTotal.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-5">
          {/* Transfer Type */}
          <div>
            <label className="text-xs font-semibold text-[#FFE58F] uppercase tracking-wider block mb-2">
              Select DLD Transfer Category
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: 'sale', label: 'Sale Transfer (4%)', icon: Home },
                { id: 'gift', label: 'Family Gift Transfer', icon: ShieldCheck },
                { id: 'mortgage', label: 'Mortgage Register', icon: Building2 },
                { id: 'titledeed', label: 'Title Deed Issuance', icon: FileText }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTransferType(item.id)}
                  className={`p-3 rounded-[10px] text-left transition-all border flex items-center gap-2 ${
                    transferType === item.id
                      ? 'bg-[#8C5E00]/40 border-[#D4AF37] text-[#FFE58F]'
                      : 'bg-[#1A1612]/60 border-[#D4AF37]/15 text-zinc-400'
                  }`}
                >
                  <item.icon className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                  <div className="text-xs font-bold">{item.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Property Value Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-[#FFE58F] uppercase tracking-wider">
                Property Valuation / Price
              </label>
              <span className="text-xs font-mono font-bold text-[#FFE58F] bg-[#8C5E00]/30 px-2.5 py-0.5 rounded border border-[#D4AF37]/30">
                AED {propertyValue.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="500000"
              max="20000000"
              step="250000"
              value={propertyValue}
              onChange={(e) => setPropertyValue(parseInt(e.target.value))}
              className="w-full accent-[#D4AF37] bg-[#1A1612] cursor-pointer"
            />
          </div>
        </div>

        {/* Invoice Column */}
        <div className="lg:col-span-6 bg-[#0E0C0A] border border-[#D4AF37]/30 rounded-[10px] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-3 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                <FileCheck className="w-4 h-4" /> Itemized DLD Breakdown
              </span>
              <span className="text-[11px] font-semibold text-[#FFE58F]">
                Same-Day Transfer
              </span>
            </div>

            <div className="text-xs font-bold text-[#FFE58F] mb-1">{currentTransfer.name}</div>
            <p className="text-[11px] text-zinc-400 mb-4">{currentTransfer.desc}</p>

            <div className="space-y-2 text-xs border-y border-[#D4AF37]/15 py-3 mb-3">
              <div className="flex justify-between text-zinc-300">
                <span>DLD Government Registration Fee</span>
                <span className="font-mono">AED {dldGovFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Official Real Estate Trustee Office Fee</span>
                <span className="font-mono">AED {currentTransfer.trusteeFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>DLD Title Deed & Admin Knowledge Fee</span>
                <span className="font-mono">AED {currentTransfer.adminFee.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-1 text-xs text-zinc-400">
              <div className="text-[11px] font-bold text-[#FFE58F] uppercase tracking-wider mb-1">
                Concierge Trustee Support:
              </div>
              <p className="text-[11px] text-zinc-300 leading-relaxed">
                Full document audit prior to appointment: developer NOC verification, manager check audit, and fast-track booking at licensed Dubai Trustee offices.
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
              Schedule Trustee Transfer Appointment <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </LuxuryCard>
  );
};

export default function DLDTrusteePage() {
  const bentoServices = [
    {
      icon: Home,
      title: 'Property Sale Transfers',
      desc: 'Complete document pre-audit and booking at official DLD Real Estate Trustee offices for seamless buyer/seller transfers.'
    },
    {
      icon: ShieldCheck,
      title: 'First-Degree Gift Transfer (Hiba)',
      desc: 'Specialized assistance for gifting property to spouses, children, or parents under DLD 0.125% reduced fee regulations.'
    },
    {
      icon: Building2,
      title: 'Mortgage Registration & Release',
      desc: 'Filing bank mortgage contracts, securing bank NOC clearance, and releasing cleared mortgages on electronic Title Deeds.'
    },
    {
      icon: FileText,
      title: 'Developer NOC Acquisition',
      desc: 'Securing electronic No Objection Certificates (NOC) from master developers including Emaar, Nakheel, and DAMAC.'
    },
    {
      icon: DollarSign,
      title: 'Manager Check & Escrow Audit',
      desc: 'Verifying exact DLD manager checks and electronic bank transfers prior to official Trustee signing.'
    },
    {
      icon: Award,
      title: 'Golden Visa Title Deed Support',
      desc: 'Issuing DLD-certified valuation certificates and title deeds specifically formatted for 10-Year Golden Visa filings.'
    }
  ];

  const documentTabs = [
    {
      id: 'saletransfer',
      title: 'Sale Transfer',
      icon: Home,
      docs: [
        { name: 'Original Title Deed / E-Title Deed', req: 'Mandatory', hint: 'Issued by Dubai Land Department' },
        { name: 'Valid Passport & Emirates ID of Seller & Buyer', req: 'Mandatory', hint: 'Original hard copies presented at trustee desk' },
        { name: 'Developer NOC (No Objection Certificate)', req: 'Mandatory', hint: 'Valid electronic NOC from property developer' },
        { name: 'DLD Manager Checks (4% + Trustee Fee)', req: 'Mandatory', hint: 'Issued by UAE licensed bank' }
      ]
    },
    {
      id: 'gifftransfer',
      title: 'Family Gift (Hiba)',
      icon: ShieldCheck,
      docs: [
        { name: 'Attested Marriage or Birth Certificate', req: 'Mandatory', hint: 'Attested by MOFA to prove first-degree relationship' },
        { name: 'DLD Family Gift Pre-Approval Letter', req: 'Mandatory', hint: 'Issued via Dubai REST app' },
        { name: 'Original Title Deed', req: 'Mandatory', hint: 'Clean title deed without active mortgages' }
      ]
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Document & Manager Check Audit',
      desc: 'Our legal concierge audits developer NOCs, passports, title deeds, and manager checks.'
    },
    {
      step: '02',
      title: 'Trustee Appointment Reservation',
      desc: 'Reserving priority time slots at licensed Dubai Land Department Trustee centers.'
    },
    {
      step: '03',
      title: 'Official In-Person Signing & Payment',
      desc: 'Attending the Trustee counter for biometric validation, manager check surrender, and contract signing.'
    },
    {
      step: '04',
      title: 'Instant Electronic Title Deed Issuance',
      desc: 'Direct electronic issuance of the new DLD Title Deed via email and Dubai REST app.'
    }
  ];

  const faqs = [
    {
      q: 'What is a DLD Real Estate Trustee office in Dubai?',
      a: 'A Dubai Land Department (DLD) Real Estate Trustee office is an accredited private center authorized by DLD to process property buy/sell transfers, gift transfers, and mortgage registrations, eliminating the need to visit DLD headquarters.'
    },
    {
      q: 'What are the official DLD fees for transferring a property in Dubai?',
      a: 'The standard DLD transfer fee is 4% of the property purchase price (split 2% buyer / 2% seller by custom, or negotiated). Additionally, trustee office fees are AED 4,000 + VAT for properties above AED 500,000 and AED 2,000 + VAT for properties below AED 500,000.'
    },
    {
      q: 'How does a family gift (Hiba) transfer work in Dubai?',
      a: 'A Hiba gift transfer allows property ownership to be transferred between first-degree relatives (parents, children, legal spouses) at a reduced DLD government fee of 0.125% of the property value (minimum AED 2,000), provided attested proof of relationship is submitted.'
    },
    {
      q: 'Is a developer NOC mandatory for property transfer in Dubai?',
      a: 'Yes. DLD requires a valid electronic No Objection Certificate (NOC) from the property developer (confirming all service charges are paid) before any trustee transfer can occur.'
    }
  ];

  return (
    <SectionShell activeServiceId="dld-trustee">
      {/* --- HERO SECTION --- */}
      <div className="relative pt-6 pb-12 overflow-hidden">
        <SectionInner>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div variants={fadeUp} className="lg:col-span-7 space-y-6">
              <GoldBadge text="Dubai Land Department Accredited Support" icon={Building2} />

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.1]">
                Dubai Property Trustee & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFE58F] to-[#D4AF37]">
                  DLD Transfer Concierge
                </span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
                Expert document preparation, manager check audit, developer NOC coordination, and priority appointment booking at Dubai Land Department Trustee offices.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#D4AF37]/20">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FFE58F] font-mono">100%</div>
                  <div className="text-xs text-zinc-400 mt-1">DLD Compliance</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FFE58F] font-mono">Same-Day</div>
                  <div className="text-xs text-zinc-400 mt-1">Transfer Booking</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FFE58F] font-mono">Instant</div>
                  <div className="text-xs text-zinc-400 mt-1">Title Deed Issuance</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="https://wa.me/9718003627"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-[10px] bg-gradient-to-r from-[#8C5E00] via-[#D4AF37] to-[#8C5E00] text-black font-bold text-sm uppercase tracking-wider hover:opacity-95 transition-all shadow-xl shadow-[#D4AF37]/20 flex items-center gap-3"
                >
                  Consult Trustee Specialist <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Calculator Column */}
            <motion.div variants={scaleIn} className="lg:col-span-12">
              <DldTrusteeCalculator />
            </motion.div>
          </div>
        </SectionInner>
      </div>

      {/* --- BENTO CAPABILITIES --- */}
      <div className="py-16 bg-[#0E0C0A]/60 border-y border-[#D4AF37]/15">
        <SectionInner>
          <SectionHeader
            badge="Real Estate Architecture"
            title="Comprehensive DLD Trustee Services"
            subtitle="Architectural precision for real estate transfers, gift deeds, and mortgage registrations in Dubai."
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
            badge="Transfer Checklists"
            title="Required Documentation for Trustee Office"
            subtitle="Clear document specifications for property sales and family gift transfers."
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
            badge="4-Stage Transfer Flow"
            title="Seamless Property Transfer Process"
            subtitle="From initial document audit to instant electronic Title Deed delivery."
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
            badge="Trustee FAQ"
            title="Frequently Asked Property Trustee Questions"
            subtitle="Essential insights on DLD fees, manager checks, NOCs, and trustee appointments."
          />

          <div className="mt-12 max-w-4xl mx-auto">
            <LuxuryFAQ items={faqs} />
          </div>
        </SectionInner>
      </div>

      {/* --- FOOTER CTA --- */}
      <LuxuryFooterCTA
        title="Book Your Dubai Property Trustee Transfer Today"
        subtitle="Schedule a priority appointment and document pre-audit with our Senior Real Estate Trustee Directors."
        buttonText="Book Trustee Transfer via WhatsApp"
        whatsappNumber="9718003627"
      />
    </SectionShell>
  );
}
