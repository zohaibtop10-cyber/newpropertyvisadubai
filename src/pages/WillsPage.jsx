import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Scale,
  Users,
  Building,
  Home,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Heart,
  FileCheck,
  Award,
  Lock,
  Globe,
  DollarSign,
  AlertTriangle,
  Briefcase
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

// --- INTERACTIVE WILLS REGISTRATION & ESTATE CALCULATOR ---
const WillsCalculator = () => {
  const [jurisdiction, setJurisdiction] = useState('difc'); // difc | dubaicourts | adjd
  const [willScope, setWillScope] = useState('full'); // full | guardianship | property | business

  const priceMap = {
    difc: {
      name: 'DIFC Courts Wills Service (English Jurisdiction)',
      full: { court: 10000, draft: 3500, desc: 'Full Estate Will covering all UAE real estate, bank accounts, investments & guardianship.' },
      guardianship: { court: 5000, draft: 2500, desc: 'Guardianship Will specifically securing custody for minor children in the UAE.' },
      property: { court: 7500, draft: 3000, desc: 'Property-Only Will for up to 5 UAE real estate properties.' },
      business: { court: 7500, draft: 3000, desc: 'Business Ownership Will for UAE company shares and freezone entities.' }
    },
    dubaicourts: {
      name: 'Dubai Courts Notary Registration (Bilingual Arabic/English)',
      full: { court: 2500, draft: 2500, desc: 'Notarized Non-Muslim Will registered with Dubai Courts Notary Public.' },
      guardianship: { court: 2000, draft: 2000, desc: 'Notarized Guardianship Declaration for minor children.' },
      property: { court: 2200, draft: 2200, desc: 'Property Will registered with Dubai Courts Notary.' },
      business: { court: 2200, draft: 2200, desc: 'Company Share Will notarized with Dubai Courts.' }
    }
  };

  const currentJur = priceMap[jurisdiction] || priceMap['difc'];
  const currentWill = currentJur[willScope];

  const courtFee = currentWill.court;
  const draftingFee = currentWill.draft;
  const grandTotal = courtFee + draftingFee;

  return (
    <LuxuryCard className="p-6 md:p-8 bg-gradient-to-br from-[#12100E]/90 via-[#1A1612]/80 to-[#12100E]/90 border-[#D4AF37]/30 backdrop-blur-xl relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-[#D4AF37]/20 pb-4">
        <div>
          <GoldBadge text="Expat Estate Planning Simulator" icon={ShieldCheck} />
          <h3 className="text-xl md:text-2xl font-serif text-[#FFE58F] mt-2 font-bold">
            UAE Will Registration & Fee Calculator
          </h3>
          <p className="text-xs text-[#D4AF37]/70">
            Compare official DIFC Courts vs Dubai Courts Will registration & legal drafting costs
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
          {/* Jurisdiction Choice */}
          <div>
            <label className="text-xs font-semibold text-[#FFE58F] uppercase tracking-wider block mb-2">
              Registration Jurisdiction
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setJurisdiction('difc')}
                className={`p-3 rounded-[10px] text-xs font-bold transition-all border flex items-center justify-center gap-2 ${
                  jurisdiction === 'difc'
                    ? 'bg-gradient-to-r from-[#8C5E00] to-[#D4AF37] text-black border-[#FFE58F]'
                    : 'bg-[#1A1612]/60 text-zinc-300 border-[#D4AF37]/20'
                }`}
              >
                <Scale className="w-4 h-4" />
                DIFC Courts (English Common Law)
              </button>
              <button
                type="button"
                onClick={() => setJurisdiction('dubaicourts')}
                className={`p-3 rounded-[10px] text-xs font-bold transition-all border flex items-center justify-center gap-2 ${
                  jurisdiction === 'dubaicourts'
                    ? 'bg-gradient-to-r from-[#8C5E00] to-[#D4AF37] text-black border-[#FFE58F]'
                    : 'bg-[#1A1612]/60 text-zinc-300 border-[#D4AF37]/20'
                }`}
              >
                <Building className="w-4 h-4" />
                Dubai Courts (Bilingual Notary)
              </button>
            </div>
          </div>

          {/* Will Category */}
          <div>
            <label className="text-xs font-semibold text-[#FFE58F] uppercase tracking-wider block mb-2">
              Scope of Will Coverage
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: 'full', label: 'Full Estate Will', sub: 'Assets + Guardianship' },
                { id: 'guardianship', label: 'Guardianship Will', sub: 'Minor Children Custody' },
                { id: 'property', label: 'Property Will', sub: 'Up to 5 Real Estates' },
                { id: 'business', label: 'Business Ownership', sub: 'Company Shares' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setWillScope(item.id)}
                  className={`p-3 rounded-[10px] text-left transition-all border ${
                    willScope === item.id
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
        </div>

        {/* Invoice Column */}
        <div className="lg:col-span-6 bg-[#0E0C0A] border border-[#D4AF37]/30 rounded-[10px] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-3 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                <FileCheck className="w-4 h-4" /> Estate Breakdown
              </span>
              <span className="text-[11px] font-semibold text-[#FFE58F]">
                3 - 7 Days Completion
              </span>
            </div>

            <div className="text-xs font-bold text-[#FFE58F] mb-1">{currentJur.name}</div>
            <p className="text-[11px] text-zinc-400 mb-4">{currentWill.desc}</p>

            <div className="space-y-2 text-xs border-y border-[#D4AF37]/15 py-3 mb-3">
              <div className="flex justify-between text-zinc-300">
                <span>Official Court Registration Fee</span>
                <span className="font-mono">AED {courtFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Specialist Estate Lawyer Drafting Fee</span>
                <span className="font-mono">AED {draftingFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#FFE58F]">
                <span>Virtual Video Notarization / Registration</span>
                <span className="font-mono">INCLUDED</span>
              </div>
            </div>

            <div className="space-y-1 text-xs text-zinc-400">
              <div className="text-[11px] font-bold text-[#FFE58F] uppercase tracking-wider mb-1">
                Asset Protection Benefit:
              </div>
              <p className="text-[11px] text-zinc-300 leading-relaxed">
                Prevents default application of Sharia local inheritance laws to non-Muslim estates. Guarantees 100% asset allocation to named beneficiaries and immediate child custody protection.
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
              Consult Senior Estate Planner <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </LuxuryCard>
  );
};

export default function WillsPage() {
  const bentoServices = [
    {
      icon: ShieldCheck,
      title: 'Full Estate Will Registration',
      desc: 'Complete asset protection covering UAE real estate, bank accounts, business shares, and personal belongings.'
    },
    {
      icon: Heart,
      title: 'Guardianship Protection for Minors',
      desc: 'Appointing permanent and temporary guardians to prevent emergency state custody of minor children in the UAE.'
    },
    {
      icon: Scale,
      title: 'DIFC Courts Wills Service',
      desc: 'Registered under English Common Law principles at the DIFC Wills Service Centre, enforcing testamentary freedom.'
    },
    {
      icon: Building,
      title: 'Dubai Courts Non-Muslim Notary',
      desc: 'Bilingual legal wills registered with Dubai Courts Notary Public under federal Non-Muslim Personal Status Law.'
    },
    {
      icon: Briefcase,
      title: 'Company Share Succession',
      desc: 'Ensuring smooth corporate succession and transfer of mainland or freezone company shares to designated heirs.'
    },
    {
      icon: Lock,
      title: 'Bank Account Unfreezing Protocols',
      desc: 'Providing legal structures to avoid freeze of sole and joint bank accounts upon the passing of an account holder.'
    }
  ];

  const documentTabs = [
    {
      id: 'personal',
      title: 'Personal & Family',
      icon: Users,
      docs: [
        { name: 'Testator Passport & Emirates ID Copy', req: 'Mandatory', hint: 'Must hold valid passport and UAE residence visa' },
        { name: 'Beneficiaries & Guardians Passports', req: 'Mandatory', hint: 'Clear copies of designated heirs and child guardians' },
        { name: 'Marriage / Birth Certificates', req: 'Conditional', hint: 'Proving family relations for minor children' }
      ]
    },
    {
      id: 'assets',
      title: 'Asset Documents',
      icon: Home,
      docs: [
        { name: 'Property Title Deeds / Oqood', req: 'Conditional', hint: 'Required for real estate inclusion' },
        { name: 'Trade Licenses / MOA', req: 'Conditional', hint: 'Required for corporate share legacy inclusion' },
        { name: 'Bank IBAN / Account Statements', req: 'Conditional', hint: 'Listing account numbers for cash distribution' }
      ]
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Strategic Estate Consultation',
      desc: 'Private audit of your UAE assets, family structure, and guardianship requirements.'
    },
    {
      step: '02',
      title: 'Specialist Legal Drafting',
      desc: 'Drafting your custom Will under DIFC Courts or Dubai Courts legal standards.'
    },
    {
      step: '03',
      title: 'Court Portal Upload & Review',
      desc: 'Submitting draft documents to DIFC Courts or Dubai Courts Notary for judicial pre-approval.'
    },
    {
      step: '04',
      title: 'Video Notarization & Registration',
      desc: 'Executing the formal Will registration via video call with the Court Registrar.'
    }
  ];

  const faqs = [
    {
      q: 'Why is it critical for expatriates in the UAE to register a Will?',
      a: 'Without a registered Will, local UAE laws (such as Sharia-based statutory inheritance rules) may automatically dictate how your bank accounts, real estate, and company shares are distributed. Furthermore, without a Guardianship Will, minor children may face temporary state custody until a court determines guardianship.'
    },
    {
      q: 'What is the difference between DIFC Courts Wills and Dubai Courts Wills?',
      a: 'DIFC Courts Wills are written and registered entirely in English under Common Law principles, providing maximum flexibility and international recognition. Dubai Courts Wills are bilingual (Arabic/English) notarized by Dubai Courts Notary under UAE Civil Code laws. Both options prevent default Sharia distribution for non-Muslims.'
    },
    {
      q: 'Are bank accounts automatically frozen upon the death of an account holder in the UAE?',
      a: 'Yes. Upon notification of death, UAE banks freeze sole accounts (and in some cases joint accounts) until a legally registered Will or court distribution order is presented. Having a registered Will drastically accelerates the release of funds to surviving spouses and heirs.'
    },
    {
      q: 'Can I register a Will remotely without visiting the court?',
      a: 'Yes. Both DIFC Courts and Dubai Courts allow 100% remote Will registration via secure video conference calls with the court registrar.'
    }
  ];

  return (
    <SectionShell activeServiceId="wills-last-testament">
      {/* --- HERO SECTION --- */}
      <div className="relative pt-6 pb-12 overflow-hidden">
        <SectionInner>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div variants={fadeUp} className="lg:col-span-7 space-y-6">
              <GoldBadge text="Expat Estate & Guardianship Protection" icon={ShieldCheck} />

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.1]">
                UAE Wills Registration & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFE58F] to-[#D4AF37]">
                  Last Testament Concierge
                </span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
                Protect your family, secure child guardianship, and guarantee 100% asset allocation. Specialist legal drafting and registration with DIFC Courts and Dubai Courts.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#D4AF37]/20">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FFE58F] font-mono">100%</div>
                  <div className="text-xs text-zinc-400 mt-1">Asset Protection</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FFE58F] font-mono">DIFC & Dubai</div>
                  <div className="text-xs text-zinc-400 mt-1">Court Registration</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FFE58F] font-mono">Remote</div>
                  <div className="text-xs text-zinc-400 mt-1">Video Call Filing</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="https://wa.me/9718003627"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-[10px] bg-gradient-to-r from-[#8C5E00] via-[#D4AF37] to-[#8C5E00] text-black font-bold text-sm uppercase tracking-wider hover:opacity-95 transition-all shadow-xl shadow-[#D4AF37]/20 flex items-center gap-3"
                >
                  Consult Estate Legal Advisor <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Calculator Column */}
            <motion.div variants={scaleIn} className="lg:col-span-12">
              <WillsCalculator />
            </motion.div>
          </div>
        </SectionInner>
      </div>

      {/* --- BENTO CAPABILITIES --- */}
      <div className="py-16 bg-[#0E0C0A]/60 border-y border-[#D4AF37]/15">
        <SectionInner>
          <SectionHeader
            badge="Estate Architecture"
            title="Comprehensive Asset & Guardianship Protection"
            subtitle="Tailored testamentary instruments to protect your hard-earned wealth and family legacy in the UAE."
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
            title="Required Information for Will Registration"
            subtitle="Clear details needed for beneficiary designation, child guardianship, and asset schedules."
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
            badge="4-Stage Registration"
            title="Will Drafting & Court Registration Timeline"
            subtitle="From confidential estate consultation to final court video registration."
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
            badge="Estate Knowledgebase"
            title="Frequently Asked Expat Will Questions"
            subtitle="Essential legal insights on child custody, bank accounts, DIFC Courts, and Dubai Courts."
          />

          <div className="mt-12 max-w-4xl mx-auto">
            <LuxuryFAQ items={faqs} />
          </div>
        </SectionInner>
      </div>

      {/* --- FOOTER CTA --- */}
      <LuxuryFooterCTA
        title="Secure Your Family’s UAE Future Today"
        subtitle="Book a confidential legal consultation with our Senior Estate Planning Directors to draft and register your Will."
        buttonText="Schedule Confidential Consultation"
        whatsappNumber="9718003627"
      />
    </SectionShell>
  );
}
