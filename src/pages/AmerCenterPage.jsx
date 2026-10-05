import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Search,
  FileText,
  PhoneCall,
  ExternalLink,
  Zap,
  Award,
  Globe,
  Users,
  Compass,
  CreditCard,
  BadgeCheck,
  Scale
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

// --- INTERACTIVE AMER CENTER FINDER & FEE CALCULATOR ---
const AmerServiceCalculator = () => {
  const [selectedService, setSelectedService] = useState('family-new'); // family-new, family-renew, status-change, cancellation
  const [isVIP, setIsVIP] = useState(false);

  const servicesMap = {
    'family-new': {
      title: 'Family Residence Entry Permit (New)',
      gdrfaFee: 550,
      typingFee: 280,
      eidFee: 370,
      medicalFee: 320,
      desc: 'Issuance of new entry permit for spouse, children, or parents under family sponsorship.',
      documents: ['Sponsor Passport & EID Copy', 'Attested Marriage / Birth Certificate', 'Ejari & Salary Certificate', 'Passport Copy of Dependent']
    },
    'family-renew': {
      title: 'Family Visa Renewal (2 Years)',
      gdrfaFee: 450,
      typingFee: 220,
      eidFee: 370,
      medicalFee: 320,
      desc: 'Renewal of existing Dubai residence visa for family members.',
      documents: ['Sponsor Original EID', 'Dependent Passport & EID', 'DHA Medical Fitness Certificate', 'Valid Ejari Lease']
    },
    'status-change': {
      title: 'In-Country Change of Status',
      gdrfaFee: 680,
      typingFee: 180,
      eidFee: 0,
      medicalFee: 0,
      desc: 'Modifying immigration status inside the UAE without exiting the country.',
      documents: ['New Entry Permit Copy', 'Old Visa / Tourist Visa Copy', 'Applicant Passport Copy']
    },
    'cancellation': {
      title: 'Residency Visa Cancellation',
      gdrfaFee: 220,
      typingFee: 150,
      eidFee: 0,
      medicalFee: 0,
      desc: 'Formal cancellation of residency visa for exit or transfer of sponsorship.',
      documents: ['Original Emirates ID', 'Sponsor EID Copy', 'Passport Copy of Resident']
    }
  };

  const curr = servicesMap[selectedService];
  const vipFee = isVIP ? 350 : 0;
  const totalFee = curr.gdrfaFee + curr.typingFee + curr.eidFee + curr.medicalFee + vipFee;

  return (
    <LuxuryCard className="p-6 md:p-8 bg-gradient-to-br from-[#12100E]/90 via-[#1A1612]/80 to-[#12100E]/90 border-[#D4AF37]/30 backdrop-blur-xl relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-[#D4AF37]/20 pb-4">
        <div>
          <GoldBadge text="GDRFA Fee Directory" icon={Search} />
          <h3 className="text-xl md:text-2xl font-serif text-[#FFE58F] mt-2 font-bold">
            Amer Center Service & Fee Breakdown
          </h3>
          <p className="text-xs text-[#D4AF37]/70">
            Official Dubai GDRFA fees combined with Amer typing and medical charges
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs uppercase tracking-widest text-zinc-400 block font-medium">Estimated Total Fee</span>
          <span className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFE58F] to-[#D4AF37] font-mono">
            AED {totalFee.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Service Selector */}
        <div className="lg:col-span-6 space-y-4">
          <label className="text-xs font-semibold text-[#FFE58F] uppercase tracking-wider block">
            Select Visa Transaction Type
          </label>

          <div className="space-y-2">
            {[
              { id: 'family-new', label: 'New Family Entry Permit' },
              { id: 'family-renew', label: 'Family Visa Renewal (2 Years)' },
              { id: 'status-change', label: 'In-Country Status Change' },
              { id: 'cancellation', label: 'Visa Cancellation' }
            ].map((srv) => (
              <button
                key={srv.id}
                type="button"
                onClick={() => setSelectedService(srv.id)}
                className={`w-full p-3.5 rounded-[10px] text-left transition-all duration-300 flex items-center justify-between border ${
                  selectedService === srv.id
                    ? 'bg-gradient-to-r from-[#8C5E00]/40 to-[#D4AF37]/20 border-[#D4AF37] text-[#FFE58F] shadow-md'
                    : 'bg-[#1A1612]/60 border-[#D4AF37]/15 text-zinc-400 hover:border-[#D4AF37]/40'
                }`}
              >
                <span className="text-xs font-bold">{srv.label}</span>
                <CheckCircle2
                  className={`w-4 h-4 ${
                    selectedService === srv.id ? 'text-[#FFE58F]' : 'text-zinc-600'
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#D4AF37]/15">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={isVIP}
                onChange={(e) => setIsVIP(e.target.checked)}
                className="w-4 h-4 accent-[#D4AF37] rounded"
              />
              <span className="text-xs text-zinc-300 group-hover:text-[#FFE58F] transition-colors">
                Add VIP Amer Express Lounge Service (Fast-Track Counter) (+AED 350)
              </span>
            </label>
          </div>
        </div>

        {/* Fee & Document Output */}
        <div className="lg:col-span-6 bg-[#0E0C0A] border border-[#D4AF37]/30 rounded-[10px] p-5 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-[#FFE58F] mb-1">{curr.title}</div>
            <p className="text-[11px] text-zinc-400 mb-4">{curr.desc}</p>

            <div className="space-y-2 text-xs border-y border-[#D4AF37]/15 py-3 mb-4">
              <div className="flex justify-between text-zinc-300">
                <span>GDRFA Government Fee</span>
                <span className="font-mono">AED {curr.gdrfaFee}</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Amer Typing & Filing Charge</span>
                <span className="font-mono">AED {curr.typingFee}</span>
              </div>
              {curr.eidFee > 0 && (
                <div className="flex justify-between text-zinc-300">
                  <span>Emirates ID Authority Fee</span>
                  <span className="font-mono">AED {curr.eidFee}</span>
                </div>
              )}
              {curr.medicalFee > 0 && (
                <div className="flex justify-between text-zinc-300">
                  <span>DHA Medical Fitness Test</span>
                  <span className="font-mono">AED {curr.medicalFee}</span>
                </div>
              )}
              {isVIP && (
                <div className="flex justify-between text-[#FFE58F]">
                  <span>VIP Lounge Concierge</span>
                  <span className="font-mono">AED {vipFee}</span>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <div className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider mb-2">
                Required Documents Checklist:
              </div>
              {curr.documents.map((doc, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#D4AF37]/20">
            <a
              href="https://wa.me/9718003627"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-[10px] bg-gradient-to-r from-[#8C5E00] via-[#D4AF37] to-[#8C5E00] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-lg shadow-[#D4AF37]/20"
            >
              Submit via Online Concierge (No Visit Required) <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </LuxuryCard>
  );
};

export default function AmerCenterPage() {
  const amerVsOthers = [
    {
      feature: 'Governing Authority',
      amer: 'GDRFA Dubai (Residency & Visas)',
      tasheel: 'MOHRE (Labour Permits & Contracts)',
      typing: 'Unregistered / General Forms'
    },
    {
      feature: 'Core Jurisdiction',
      amer: 'Dubai Residence & Entry Permits',
      tasheel: 'Federal UAE Employment Contracts',
      typing: 'Basic Drafts & Translation'
    },
    {
      feature: 'System Integration',
      amer: 'Direct Direct Portal into GDRFA',
      tasheel: 'Direct Access to MOHRE Portal',
      typing: 'No Direct Immigration Access'
    },
    {
      feature: 'Processing Speed',
      amer: 'Instant Electronic Filing',
      tasheel: '24-48 Hours Labour Clearance',
      typing: 'Manual Referral'
    }
  ];

  const documentTabs = [
    {
      id: 'family',
      title: 'Family Visa',
      icon: Users,
      docs: [
        { name: 'Sponsor Passport & Original EID', req: 'Mandatory', hint: 'Sponsor must hold valid Dubai residency' },
        { name: 'Attested Marriage Certificate', req: 'Mandatory', hint: 'Attested by MOFA UAE and Ministry in Origin Country' },
        { name: 'Salary Certificate / Labor Contract', req: 'Mandatory', hint: 'Minimum AED 4,000 salary or AED 3,000 + accommodation' },
        { name: 'Tenancy Contract (Ejari)', req: 'Mandatory', hint: 'Attested Ejari under sponsor’s name' }
      ]
    },
    {
      id: 'visit',
      title: 'Entry Permit',
      icon: Globe,
      docs: [
        { name: 'Applicant Passport Copy', req: 'Mandatory', hint: 'Minimum 6 months validity from entry date' },
        { name: 'White Background Photo', req: 'Mandatory', hint: 'ICA standard digital photo' },
        { name: 'Sponsor Residence Copy', req: 'Mandatory', hint: 'Active Dubai visa copy' }
      ]
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Document Verification & Audit',
      desc: 'Our legal concierge audits your birth, marriage, or employment documents to prevent GDRFA rejection.'
    },
    {
      step: '02',
      title: 'Digital Application Typing',
      desc: 'Direct electronic submission into GDRFA system using official accredited channels.'
    },
    {
      step: '03',
      title: 'Government Payment & Approval',
      desc: 'Settling official fees and securing the electronic Entry Permit or Visa Approval.'
    },
    {
      step: '04',
      title: 'Medical Fitness & EID Completion',
      desc: 'Fast-tracking DHA medical screening and Emirates ID biometrics capture.'
    }
  ];

  const faqs = [
    {
      q: 'What is an Amer Center in Dubai?',
      a: 'An Amer Center (آمر) is a semi-private, government-accredited service center licensed by GDRFA Dubai (General Directorate of Residency and Foreigners Affairs) to type, process, and submit residence visas, entry permits, and company establishment transactions in Dubai.'
    },
    {
      q: 'Is an Amer Center a government office?',
      a: 'No. Amer Centers are privately operated businesses licensed and monitored by GDRFA Dubai. While Amer counter staff type and submit your files, only the government authority (GDRFA) approves or rejects visa applications.'
    },
    {
      q: 'Can I apply for Dubai visas online without visiting an Amer Center in person?',
      a: 'Yes. FamilyVisa.ae offers 100% online concierged submission through authorized GDRFA digital channels. You do not need to stand in line or travel to an Amer center; our team manages document pick-up, typing, and digital submission on your behalf.'
    },
    {
      q: 'What is the difference between Amer and Tasheel?',
      a: 'Amer centers process immigration and residency visas for GDRFA Dubai. Tasheel centers process work permits, employment contracts, and labor disputes for the Ministry of Human Resources and Emiratisation (MOHRE).'
    },
    {
      q: 'Where are the 24/7 Amer Centers located in Dubai?',
      a: 'Amer247 located near Abu Baker Al Siddique metro station in Deira operates 24 hours. Additionally, GDRFA’s Customer Happiness Center at Dubai International Airport Terminal 3 operates 24/7 for urgent entry permit and overstay fine clearances.'
    }
  ];

  return (
    <SectionShell activeServiceId="amer-center">
      {/* --- HERO SECTION --- */}
      <div className="relative pt-6 pb-12 overflow-hidden">
        <SectionInner>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div variants={fadeUp} className="lg:col-span-7 space-y-6">
              <GoldBadge text="Official GDRFA Accredited Channels" icon={Building} />

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.1]">
                Amer Center Dubai & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFE58F] to-[#D4AF37]">
                  Digital Visa Concierge
                </span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
                Complete guide to Amer Centers in Dubai: GDRFA official government fees, required documents, location guidance, or instant 100% remote online visa processing.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#D4AF37]/20">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FFE58F] font-mono">100%</div>
                  <div className="text-xs text-zinc-400 mt-1">GDRFA Compliance</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FFE58F] font-mono">0 Hours</div>
                  <div className="text-xs text-zinc-400 mt-1">No Center Waiting Lines</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FFE58F] font-mono">24/7</div>
                  <div className="text-xs text-zinc-400 mt-1">Online Submission</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="https://wa.me/9718003627"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-[10px] bg-gradient-to-r from-[#8C5E00] via-[#D4AF37] to-[#8C5E00] text-black font-bold text-sm uppercase tracking-wider hover:opacity-95 transition-all shadow-xl shadow-[#D4AF37]/20 flex items-center gap-3"
                >
                  Start Online Visa Filing <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Calculator Column */}
            <motion.div variants={scaleIn} className="lg:col-span-12">
              <AmerServiceCalculator />
            </motion.div>
          </div>
        </SectionInner>
      </div>

      {/* --- AMER VS TASHEEL VS TYPING MATRIX --- */}
      <div className="py-16 bg-[#0E0C0A]/60 border-y border-[#D4AF37]/15">
        <SectionInner>
          <SectionHeader
            badge="Institutional Matrix"
            title="Amer vs Tasheel vs Ordinary Typing Office"
            subtitle="Understand the exact regulatory roles of Dubai government service entities."
          />

          <div className="mt-12 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-[#D4AF37]/30 bg-[#161310]">
                  <th className="p-4 text-xs font-bold text-[#FFE58F] uppercase tracking-wider">Feature / Metric</th>
                  <th className="p-4 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Amer Center (GDRFA)</th>
                  <th className="p-4 text-xs font-bold text-zinc-300 uppercase tracking-wider">Tasheel Center (MOHRE)</th>
                  <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Ordinary Typing Center</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D4AF37]/10 text-xs sm:text-sm text-zinc-300">
                {amerVsOthers.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#1A1612]/50 transition-colors">
                    <td className="p-4 font-bold text-[#FFE58F]">{row.feature}</td>
                    <td className="p-4 text-[#D4AF37] font-semibold">{row.amer}</td>
                    <td className="p-4">{row.tasheel}</td>
                    <td className="p-4 text-zinc-400">{row.typing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionInner>
      </div>

      {/* --- DOCUMENT MATRIX --- */}
      <div className="py-16">
        <SectionInner>
          <SectionHeader
            badge="Document Guidelines"
            title="Required Documents for Amer Transactions"
            subtitle="Standard GDRFA document requirements for family visas, entry permits, and status changes."
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
            badge="Digital Concierge Workflow"
            title="Online Application Process"
            subtitle="Avoid long queues at physical centers by submitting your applications online."
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
            badge="Amer Directory FAQ"
            title="Frequently Asked Questions About Amer Centers"
            subtitle="Essential information regarding Dubai visa centers, working hours, and digital filings."
          />

          <div className="mt-12 max-w-4xl mx-auto">
            <LuxuryFAQ items={faqs} />
          </div>
        </SectionInner>
      </div>

      {/* --- FOOTER CTA --- */}
      <LuxuryFooterCTA
        title="Skip the Amer Center Waiting Lines Today"
        subtitle="Submit your family visa, renewal, or entry permit application 100% online through our licensed GDRFA concierge."
        buttonText="File Online via WhatsApp"
        whatsappNumber="9718003627"
      />
    </SectionShell>
  );
}
