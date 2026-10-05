import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Building2,
  FileCheck,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  HelpCircle,
  Award,
  Users,
  FileText,
  TrendingUp,
  Scale,
  Sparkles,
  Zap,
  Globe,
  UserCheck,
  ChevronRight,
  BadgeCheck,
  Layers,
  Search,
  DollarSign
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
  LuxuryFeeInvoice,
  fadeUp,
  scaleIn
} from '../components/LuxuryServicePage';

// --- INTERACTIVE B2B PRO COST CALCULATOR WIDGET ---
const ProCostCalculator = () => {
  const [employeeType, setEmployeeType] = useState('inside'); // inside | outside
  const [skillLevel, setSkillLevel] = useState('skilled'); // skilled | unskilled
  const [companyCategory, setCompanyCategory] = useState('cat2'); // cat1 | cat2 | cat3
  const [duration, setDuration] = useState('2years'); // 2years
  const [includeInsurance, setIncludeInsurance] = useState(true);
  const [includeVIPMedical, setIncludeVIPMedical] = useState(false);

  // Government Fee Calculations (AED)
  const calculateFees = () => {
    let mohreQuota = 250;
    let offerLetter = 150;
    let workPermit = companyCategory === 'cat1' ? 250 : companyCategory === 'cat2' ? 600 : 1200;
    let entryPermit = employeeType === 'inside' ? 1150 : 550;
    let statusChange = employeeType === 'inside' ? 680 : 0;
    let medicalFee = includeVIPMedical ? 750 : 320;
    let emiratesId = 370;
    let visaStamping = 550;
    let insurance = includeInsurance ? (skillLevel === 'skilled' ? 240 : 180) : 0;

    const totalGov = mohreQuota + offerLetter + workPermit + entryPermit + statusChange + medicalFee + emiratesId + visaStamping + insurance;
    const proServiceFee = 1500;

    return {
      mohreQuota,
      offerLetter,
      workPermit,
      entryPermit,
      statusChange,
      medicalFee,
      emiratesId,
      visaStamping,
      insurance,
      totalGov,
      proServiceFee,
      grandTotal: totalGov + proServiceFee
    };
  };

  const fees = calculateFees();

  return (
    <LuxuryCard className="p-6 md:p-8 bg-gradient-to-br from-[#12100E]/90 via-[#1A1612]/80 to-[#12100E]/90 border-[#D4AF37]/30 backdrop-blur-xl relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-[#D4AF37]/20 pb-4">
        <div>
          <GoldBadge text="B2B PRO Simulator" icon={Calculator} />
          <h3 className="text-xl md:text-2xl font-serif text-[#FFE58F] mt-2 font-bold">
            Corporate Employee Visa Cost Calculator
          </h3>
          <p className="text-xs text-[#D4AF37]/70">
            Real-time MOHRE & GDRFA Fee breakdown for Dubai Mainland & Freezone
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs uppercase tracking-widest text-zinc-400 block font-medium">Estimated Total</span>
          <span className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFE58F] to-[#D4AF37]">
            AED {fees.grandTotal.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-5">
          {/* Employee Location Status */}
          <div>
            <label className="text-xs font-semibold text-[#FFE58F] uppercase tracking-wider block mb-2">
              Employee Current Location
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setEmployeeType('inside')}
                className={`px-4 py-3 rounded-[10px] text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 border ${
                  employeeType === 'inside'
                    ? 'bg-gradient-to-r from-[#8C5E00] to-[#D4AF37] text-black border-[#FFE58F] shadow-lg shadow-[#D4AF37]/20'
                    : 'bg-[#1A1612]/60 text-zinc-300 border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                Inside UAE (In-Country)
              </button>
              <button
                type="button"
                onClick={() => setEmployeeType('outside')}
                className={`px-4 py-3 rounded-[10px] text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 border ${
                  employeeType === 'outside'
                    ? 'bg-gradient-to-r from-[#8C5E00] to-[#D4AF37] text-black border-[#FFE58F] shadow-lg shadow-[#D4AF37]/20'
                    : 'bg-[#1A1612]/60 text-zinc-300 border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                }`}
              >
                <Globe className="w-4 h-4" />
                Outside UAE (New Hire)
              </button>
            </div>
          </div>

          {/* Skill Classification */}
          <div>
            <label className="text-xs font-semibold text-[#FFE58F] uppercase tracking-wider block mb-2">
              MOHRE Skill Designation
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSkillLevel('skilled')}
                className={`px-4 py-3 rounded-[10px] text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 border ${
                  skillLevel === 'skilled'
                    ? 'bg-[#8C5E00]/40 text-[#FFE58F] border-[#D4AF37]'
                    : 'bg-[#1A1612]/60 text-zinc-400 border-[#D4AF37]/20'
                }`}
              >
                <Award className="w-4 h-4" />
                Skilled (Degree / Diploma)
              </button>
              <button
                type="button"
                onClick={() => setSkillLevel('unskilled')}
                className={`px-4 py-3 rounded-[10px] text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 border ${
                  skillLevel === 'unskilled'
                    ? 'bg-[#8C5E00]/40 text-[#FFE58F] border-[#D4AF37]'
                    : 'bg-[#1A1612]/60 text-zinc-400 border-[#D4AF37]/20'
                }`}
              >
                <Users className="w-4 h-4" />
                Unskilled / General Labour
              </button>
            </div>
          </div>

          {/* Company MOHRE Classification */}
          <div>
            <label className="text-xs font-semibold text-[#FFE58F] uppercase tracking-wider block mb-2">
              Company MOHRE Category Tier
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'cat1', label: 'Category 1', desc: 'Emiratization / High Diversity' },
                { id: 'cat2', label: 'Category 2', desc: 'Standard Mainland / Freezone' },
                { id: 'cat3', label: 'Category 3', desc: 'Non-compliant / Basic' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCompanyCategory(cat.id)}
                  className={`p-3 rounded-[10px] text-left transition-all border ${
                    companyCategory === cat.id
                      ? 'bg-[#8C5E00]/30 border-[#D4AF37] text-[#FFE58F]'
                      : 'bg-[#1A1612]/60 border-[#D4AF37]/15 text-zinc-400'
                  }`}
                >
                  <div className="text-xs font-bold">{cat.label}</div>
                  <div className="text-[10px] text-zinc-400 truncate mt-0.5">{cat.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Add-ons Checkboxes */}
          <div className="pt-2 border-t border-[#D4AF37]/10 space-y-3">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={includeInsurance}
                onChange={(e) => setIncludeInsurance(e.target.checked)}
                className="w-4 h-4 accent-[#D4AF37] rounded"
              />
              <span className="text-xs text-zinc-300 group-hover:text-[#FFE58F] transition-colors">
                Include Mandatory Worker Protection Insurance (ILO & Medical Scheme)
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={includeVIPMedical}
                onChange={(e) => setIncludeVIPMedical(e.target.checked)}
                className="w-4 h-4 accent-[#D4AF37] rounded"
              />
              <span className="text-xs text-zinc-300 group-hover:text-[#FFE58F] transition-colors">
                VIP Medical Express (2-Hour Fast-Track Screening & Pickup)
              </span>
            </label>
          </div>
        </div>

        {/* Invoice Breakdown Column */}
        <div className="lg:col-span-5 bg-[#0E0C0A] border border-[#D4AF37]/30 rounded-[10px] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                <FileText className="w-4 h-4" /> Itemized Invoice
              </span>
              <span className="text-[11px] text-zinc-400">2-Year Residence</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-zinc-300">
                <span>MOHRE Quota & Offer Approval</span>
                <span className="font-mono">AED {(fees.mohreQuota + fees.offerLetter).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Work Permit Pre-Approval</span>
                <span className="font-mono">AED {fees.workPermit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Entry Permit Visa Issuance</span>
                <span className="font-mono">AED {fees.entryPermit.toLocaleString()}</span>
              </div>
              {employeeType === 'inside' && (
                <div className="flex justify-between text-amber-300/90 font-medium">
                  <span>In-Country Status Change</span>
                  <span className="font-mono">AED {fees.statusChange.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-300">
                <span>DHA Medical Fitness Test</span>
                <span className="font-mono">AED {fees.medicalFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Emirates ID (2 Years)</span>
                <span className="font-mono">AED {fees.emiratesId.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>GDRFA Visa Residency Stamping</span>
                <span className="font-mono">AED {fees.visaStamping.toLocaleString()}</span>
              </div>
              {includeInsurance && (
                <div className="flex justify-between text-zinc-300">
                  <span>Worker Protection Insurance</span>
                  <span className="font-mono">AED {fees.insurance.toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className="border-t border-[#D4AF37]/20 my-4 pt-3 space-y-2">
              <div className="flex justify-between text-xs text-zinc-400">
                <span>Government Total</span>
                <span className="font-mono text-zinc-200">AED {fees.totalGov.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs text-[#D4AF37]">
                <span>Concierge PRO Management Fee</span>
                <span className="font-mono">AED {fees.proServiceFee.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-[#1A1612] p-3 rounded-[8px] border border-[#D4AF37]/30 flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-white">Estimated Final Total</span>
              <span className="text-xl font-bold text-[#FFE58F] font-mono">
                AED {fees.grandTotal.toLocaleString()}
              </span>
            </div>

            <a
              href="https://wa.me/9718003627"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-[10px] bg-gradient-to-r from-[#8C5E00] via-[#D4AF37] to-[#8C5E00] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-lg shadow-[#D4AF37]/20"
            >
              Initiate Employee Onboarding <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </LuxuryCard>
  );
};

export default function PROServicesPage() {
  const [activeCategoryTab, setActiveCategoryTab] = useState('corporate');

  const bentoServices = [
    {
      icon: Briefcase,
      title: 'MOHRE Work Permits & Contracts',
      desc: 'End-to-end management of electronic offer letters, employment contracts, electronic work permits, and MOHRE quota management.'
    },
    {
      icon: Building2,
      title: 'Company Formation & License Renewal',
      desc: 'Seamless annual renewal of DED Commercial Trade Licenses, Freezone Permits, and Corporate Establishment Cards.'
    },
    {
      icon: UserCheck,
      title: 'Employee Visa Processing',
      desc: 'Full-lifecycle employee onboarding: Entry permits, in-country status adjustments, medical fitness, EID, and residency stamping.'
    },
    {
      icon: Layers,
      title: 'Quota & Classification Management',
      desc: 'Strategic advisor for MOHRE company categorization upgrade (Tier 1/2) and national Emiratization ratio compliance.'
    },
    {
      icon: ShieldCheck,
      title: 'Labour & Immigration Fine Waiver',
      desc: 'Expert legal petitioning for overstay fines, expired work permit penalty reductions, and absconding clearance.'
    },
    {
      icon: Globe,
      title: 'Mission & Golden Visa Transfers',
      desc: 'Specialized PRO management for executive Golden Visas, temporary mission permits, and green residency transitions.'
    }
  ];

  const documentTabs = [
    {
      id: 'corporate',
      title: 'Company Setup',
      icon: Building2,
      docs: [
        { name: 'Trade License Copy', req: 'Mandatory', hint: 'Valid Dubai DED or Freezone License copy' },
        { name: 'Establishment Card', req: 'Mandatory', hint: 'Immigration computer card (GDRFA registered)' },
        { name: 'MOA & Shareholder Certificate', req: 'Mandatory', hint: 'Attested Memorandum of Association' },
        { name: 'Authorized Signatory EID', req: 'Mandatory', hint: 'Original Emirates ID of Manager / PRO' }
      ]
    },
    {
      id: 'employee',
      title: 'Employee Visa',
      icon: UserCheck,
      docs: [
        { name: 'Passport Copy (6+ Mo Validity)', req: 'Mandatory', hint: 'Clear color copy with observation page' },
        { name: 'Passport Size Photograph', req: 'Mandatory', hint: 'White background, digital high resolution' },
        { name: 'Attested Educational Degree', req: 'Conditional', hint: 'Required for Managerial & Executive titles' },
        { name: 'Attested Offer Letter (MOHRE)', req: 'Mandatory', hint: 'Signed by both employer and employee' }
      ]
    },
    {
      id: 'cancellation',
      title: 'Visa Cancellation',
      icon: FileCheck,
      docs: [
        { name: 'Original Emirates ID', req: 'Mandatory', hint: 'Surrendered during cancellation phase' },
        { name: 'MOHRE Work Permit Cancellation', req: 'Mandatory', hint: 'Signed end of service declaration' },
        { name: 'Residency Cancellation Form', req: 'Mandatory', hint: 'GDRFA approved electronic cancellation' }
      ]
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'MOHRE Quota & Offer Letter Approval',
      desc: 'Drafting the standardized MOHRE employment offer letter and securing electronic quota pre-approval from the ministry.'
    },
    {
      step: '02',
      title: 'Work Permit & Entry Visa Issuance',
      desc: 'Submitting the signed contract to issue the electronic Work Permit and GDRFA Entry Visa for immediate entry or status change.'
    },
    {
      step: '03',
      title: 'Status Amendment & Medical Screening',
      desc: 'Executing in-country status change (if inside UAE) followed by VIP DHA Medical Screening and Biometrics capture.'
    },
    {
      step: '04',
      title: 'Emirates ID & Residency Stamping',
      desc: 'Finalizing mandatory E-Medical fitness certification, EID issuance, and GDRFA e-Residence Visa approval.'
    }
  ];

  const faqs = [
    {
      q: 'What is the role of a Corporate PRO service in Dubai?',
      a: 'A Professional Relations Officer (PRO) manages all official governmental interactions between your company, employees, and UAE government bodies including MOHRE (Ministry of Human Resources & Emiratisation), GDRFA (General Directorate of Residency and Foreigners Affairs), DED, and Dubai Health Authority.'
    },
    {
      q: 'What is the difference between Mainland and Freezone PRO services?',
      a: 'Mainland PRO services require dual jurisdiction compliance—navigating both MOHRE for labor contracts and GDRFA for immigration. Freezone PRO services interact directly with the specific Freezone Authority portal (e.g. DMCC, DIFC, JAFZA), each having distinct visa rules and fee structures.'
    },
    {
      q: 'How does MOHRE company categorization affect employee visa fees?',
      a: 'MOHRE categorizes companies into Tier 1, Tier 2 (A/B/C), and Tier 3 based on skill diversity, salaries, and Emiratization compliance. Tier 1 companies enjoy discounted work permit fees (AED 250), while Tier 3 companies face fees up to AED 3,750 per employee.'
    },
    {
      q: 'How fast can a corporate employee visa be processed in Dubai?',
      a: 'With our VIP Concierge PRO service, an in-country employee visa—from MOHRE quota approval to Emirates ID typing and final residence approval—is routinely completed within 3 to 5 business days.'
    },
    {
      q: 'Can FamilyVisa.ae manage dedicated monthly PRO retainer contracts?',
      a: 'Yes. We offer fully outsourced corporate PRO retainer contracts tailored for SMEs and enterprise entities in Dubai, providing a dedicated Senior PRO, compliance tracking, and zero overhead.'
    }
  ];

  return (
    <SectionShell activeServiceId="pro-services">
      {/* --- HERO SECTION --- */}
      <div className="relative pt-6 pb-12 overflow-hidden">
        <SectionInner>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div variants={fadeUp} className="lg:col-span-7 space-y-6">
              <GoldBadge text="Elite Corporate Solutions" icon={ShieldCheck} />

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.1]">
                B2B Corporate PRO Services & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFE58F] to-[#D4AF37]">
                  UAE Government Concierge
                </span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
                Seamless corporate compliance, MOHRE work permits, trade license renewals, and executive employee visa management. Entrust your enterprise operations to Dubai’s premier PRO architects.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#D4AF37]/20">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FFE58F] font-mono">100%</div>
                  <div className="text-xs text-zinc-400 mt-1">MOHRE & GDRFA Compliance</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FFE58F] font-mono">3-5 Days</div>
                  <div className="text-xs text-zinc-400 mt-1">Express Visa Delivery</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FFE58F] font-mono">500+</div>
                  <div className="text-xs text-zinc-400 mt-1">Corporate Retainers Managed</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="https://wa.me/9718003627"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-[10px] bg-gradient-to-r from-[#8C5E00] via-[#D4AF37] to-[#8C5E00] text-black font-bold text-sm uppercase tracking-wider hover:opacity-95 transition-all shadow-xl shadow-[#D4AF37]/20 flex items-center gap-3"
                >
                  Consult Senior PRO Advisor <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Interactive Widget Column */}
            <motion.div variants={scaleIn} className="lg:col-span-12">
              <ProCostCalculator />
            </motion.div>
          </div>
        </SectionInner>
      </div>

      {/* --- BENTO SERVICES GRID --- */}
      <div className="py-16 bg-[#0E0C0A]/60 border-y border-[#D4AF37]/15">
        <SectionInner>
          <SectionHeader
            badge="Full-Spectrum Capabilities"
            title="Comprehensive Corporate Government Services"
            subtitle="Architectural precision for every facet of enterprise administration and labour law compliance in Dubai."
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

      {/* --- DOCUMENT MATRIX TABS --- */}
      <div className="py-16">
        <SectionInner>
          <SectionHeader
            badge="Pre-Requisite Matrix"
            title="Required Corporate Documentation"
            subtitle="Clear, uncompromised document guidelines for corporate registration, employee visas, and cancellations."
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
            badge="Seamless Workflow"
            title="Standardized 4-Step Employee Visa Onboarding"
            subtitle="From offer letter drafting to final GDRFA e-Residency issuance in record turnaround time."
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
            badge="Corporate FAQ"
            title="Frequently Asked PRO & Corporate Questions"
            subtitle="Authoritative answers regarding UAE labor laws, MOHRE regulations, and corporate PRO retainers."
          />

          <div className="mt-12 max-w-4xl mx-auto">
            <LuxuryFAQ items={faqs} />
          </div>
        </SectionInner>
      </div>

      {/* --- FOOTER CTA --- */}
      <LuxuryFooterCTA
        title="Elevate Your UAE Enterprise Infrastructure Today"
        subtitle="Schedule a strategic consultation with our Senior PRO Director to optimize your corporate visa quotas, labor compliance, and trade license structures."
        buttonText="Connect with Senior PRO via WhatsApp"
        whatsappNumber="9718003627"
      />
    </SectionShell>
  );
}
