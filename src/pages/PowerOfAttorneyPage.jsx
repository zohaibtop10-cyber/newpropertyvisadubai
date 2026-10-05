import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileCheck,
  ShieldCheck,
  Video,
  Scale,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  UserCheck,
  Building2,
  Home,
  Car,
  Users,
  FileText,
  Clock,
  Sparkles,
  Lock,
  Globe
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

// --- INTERACTIVE POWER OF ATTORNEY CALCULATOR WIDGET ---
const PoaCalculator = () => {
  const [poaType, setPoaType] = useState('general'); // general | property | corporate | vehicle
  const [notaryMethod, setNotaryMethod] = useState('online'); // online | physical
  const [principalCount, setPrincipalCount] = useState(1);

  const poaPrices = {
    general: { name: 'General Power of Attorney (Full Powers)', draftFee: 850, courtFee: 280 },
    property: { name: 'Real Estate / Property Buying & Selling POA', draftFee: 950, courtFee: 280 },
    corporate: { name: 'Corporate Business / Shareholder POA', draftFee: 1450, courtFee: 520 },
    vehicle: { name: 'Vehicle Selling & Export POA', draftFee: 650, courtFee: 280 }
  };

  const currentPoa = poaPrices[poaType];
  const totalDrafting = currentPoa.draftFee * principalCount;
  const totalCourt = currentPoa.courtFee;
  const videoNotaryFee = notaryMethod === 'online' ? 250 : 0;
  const grandTotal = totalDrafting + totalCourt + videoNotaryFee;

  return (
    <LuxuryCard className="p-6 md:p-8 bg-gradient-to-br from-[#12100E]/90 via-[#1A1612]/80 to-[#12100E]/90 border-[#D4AF37]/30 backdrop-blur-xl relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-[#D4AF37]/20 pb-4">
        <div>
          <GoldBadge text="Online Video Notary Simulator" icon={Video} />
          <h3 className="text-xl md:text-2xl font-serif text-[#FFE58F] mt-2 font-bold">
            Power of Attorney Drafting & Notarization Estimator
          </h3>
          <p className="text-xs text-[#D4AF37]/70">
            Lawyer-drafted bilingual POA with official Dubai Courts remote video notarization
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
          {/* POA Category */}
          <div>
            <label className="text-xs font-semibold text-[#FFE58F] uppercase tracking-wider block mb-2">
              Select Power of Attorney Type
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: 'general', label: 'General POA', icon: FileCheck },
                { id: 'property', label: 'Property POA', icon: Home },
                { id: 'corporate', label: 'Corporate POA', icon: Building2 },
                { id: 'vehicle', label: 'Vehicle POA', icon: Car }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPoaType(item.id)}
                  className={`p-3 rounded-[10px] text-left transition-all border flex items-center gap-2.5 ${
                    poaType === item.id
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

          {/* Notarization Method */}
          <div>
            <label className="text-xs font-semibold text-[#FFE58F] uppercase tracking-wider block mb-2">
              Notarization Execution Method
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setNotaryMethod('online')}
                className={`px-4 py-3 rounded-[10px] text-xs font-bold transition-all border flex items-center justify-center gap-2 ${
                  notaryMethod === 'online'
                    ? 'bg-gradient-to-r from-[#8C5E00] to-[#D4AF37] text-black border-[#FFE58F]'
                    : 'bg-[#1A1612]/60 text-zinc-300 border-[#D4AF37]/20'
                }`}
              >
                <Video className="w-4 h-4" />
                Remote Video Call (No Visit)
              </button>
              <button
                type="button"
                onClick={() => setNotaryMethod('physical')}
                className={`px-4 py-3 rounded-[10px] text-xs font-bold transition-all border flex items-center justify-center gap-2 ${
                  notaryMethod === 'physical'
                    ? 'bg-gradient-to-r from-[#8C5E00] to-[#D4AF37] text-black border-[#FFE58F]'
                    : 'bg-[#1A1612]/60 text-zinc-300 border-[#D4AF37]/20'
                }`}
              >
                <Building2 className="w-4 h-4" />
                Physical Notary Counter
              </button>
            </div>
          </div>

          {/* Principal Count */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-[#FFE58F] uppercase tracking-wider">
                Number of Principals (Grantors)
              </label>
              <span className="text-xs font-mono font-bold text-[#FFE58F] bg-[#8C5E00]/30 px-2 py-0.5 rounded border border-[#D4AF37]/30">
                {principalCount} Person{principalCount > 1 ? 's' : ''}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="4"
              value={principalCount}
              onChange={(e) => setPrincipalCount(parseInt(e.target.value))}
              className="w-full accent-[#D4AF37] bg-[#1A1612] cursor-pointer"
            />
          </div>
        </div>

        {/* Breakdown Output */}
        <div className="lg:col-span-6 bg-[#0E0C0A] border border-[#D4AF37]/30 rounded-[10px] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-3 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                <Scale className="w-4 h-4" /> Itemized Invoice
              </span>
              <span className="text-[11px] font-semibold text-[#FFE58F]">
                24 - 48 Hours Ready
              </span>
            </div>

            <div className="space-y-2 text-xs border-b border-[#D4AF37]/15 pb-3 mb-3">
              <div className="flex justify-between text-zinc-300">
                <span>Bilingual Legal Drafting (Lawyer Formatted)</span>
                <span className="font-mono">AED {totalDrafting.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Dubai Courts Official Notary Fee</span>
                <span className="font-mono">AED {totalCourt.toLocaleString()}</span>
              </div>
              {notaryMethod === 'online' && (
                <div className="flex justify-between text-[#FFE58F]">
                  <span>Remote BOTIM Video Notarization Concierge</span>
                  <span className="font-mono">AED {videoNotaryFee}</span>
                </div>
              )}
            </div>

            <div className="space-y-1 text-xs text-zinc-400">
              <div className="text-[11px] font-bold text-[#FFE58F] uppercase tracking-wider mb-1">
                Legal Guarantee:
              </div>
              <p className="text-[11px] text-zinc-300 leading-relaxed">
                Drafted by UAE-licensed legal advocates. 100% tailored to your specific powers—never a generic template—and legally valid before all UAE authorities, DLD, and banks.
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
              Draft Power of Attorney via WhatsApp <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </LuxuryCard>
  );
};

export default function PowerOfAttorneyPage() {
  const bentoServices = [
    {
      icon: Scale,
      title: 'Custom Lawyer Drafting',
      desc: 'Bilingual English & Arabic POAs drafted by licensed UAE legal consultants. Never generic templates.'
    },
    {
      icon: Video,
      title: 'Online Video Call Notarization',
      desc: 'Notarize your POA via official Dubai Courts BOTIM video call without leaving your desk or flying to the UAE.'
    },
    {
      icon: Home,
      title: 'Real Estate & Property POA',
      desc: 'Authorizing trusted representatives to buy, sell, lease, or manage Dubai Land Department (DLD) property files.'
    },
    {
      icon: Building2,
      title: 'Corporate & Managerial POA',
      desc: 'Authorizing managers to handle commercial bank accounts, trade license renewals, and MOHRE company files.'
    },
    {
      icon: Users,
      title: 'Family & Inheritance Representation',
      desc: 'Enabling family members to handle visa sponsorships, bank transactions, and government department affairs.'
    },
    {
      icon: Lock,
      title: 'Strict Revocation & Safeguards',
      desc: 'Custom safety clauses preventing unauthorized actions, with structured expiry dates and clear revocation terms.'
    }
  ];

  const documentTabs = [
    {
      id: 'general',
      title: 'General / Property POA',
      icon: Home,
      docs: [
        { name: 'Passport Copy of Principal (Grantor)', req: 'Mandatory', hint: 'Clear color scan showing signature' },
        { name: 'Emirates ID / Visa Copy of Attorney', req: 'Mandatory', hint: 'Representative must hold valid UAE ID' },
        { name: 'Title Deed Copy', req: 'Conditional', hint: 'Mandatory for real estate selling or purchase POAs' }
      ]
    },
    {
      id: 'corporate',
      title: 'Corporate POA',
      icon: Building2,
      docs: [
        { name: 'Valid Trade License Copy', req: 'Mandatory', hint: 'DED or Freezone company license' },
        { name: 'MOA / Board Resolution', req: 'Mandatory', hint: 'Demonstrating authority of principal to delegate powers' },
        { name: 'Manager Passport & EID Copy', req: 'Mandatory', hint: 'Original ID of authorized signatory' }
      ]
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Requirements Gathering & Scope Audit',
      desc: 'We consult with you to identify exact legal powers needed for your transaction.'
    },
    {
      step: '02',
      title: 'Lawyer Drafting & Bilingual Formatting',
      desc: 'Our legal team drafts the POA in side-by-side English and Arabic legal format.'
    },
    {
      step: '03',
      title: 'Dubai Courts Electronic Upload',
      desc: 'Filing the bilingual document into the official Dubai Courts Notary Public portal.'
    },
    {
      step: '04',
      title: 'Video Call Notarization & E-Sign',
      desc: 'A 2-minute video call with the Dubai Courts Notary Judge to verify identity and issue the digitally stamped POA.'
    }
  ];

  const faqs = [
    {
      q: 'Can I notarize a UAE Power of Attorney remotely from abroad?',
      a: 'Yes. Dubai Courts provides an official online video notarization service. As long as you hold an active UAE Pass or valid passport, you can complete the notary video call from anywhere in the world without traveling to Dubai.'
    },
    {
      q: 'Why should I avoid using free online POA templates?',
      a: 'Generic POA templates routinely fail at government counters (such as the Dubai Land Department or banks) due to missing mandatory statutory clauses, improper bilingual alignment, or vague authority language. Our POAs are custom-drafted by licensed UAE legal consultants.'
    },
    {
      q: 'How long is a Power of Attorney valid in the UAE?',
      a: 'By default, a General POA remains valid until revoked. However, Real Estate Property POAs in Dubai have a statutory limitation of 2 to 5 years under Dubai Land Department regulations unless renewed.'
    },
    {
      q: 'Is a POA drafted in Dubai valid across all UAE Emirates?',
      a: 'Yes. A Power of Attorney notarized by Dubai Courts or Abu Dhabi Judicial Department (ADJD) is legally recognized and enforceable across all 7 Emirates of the UAE.'
    }
  ];

  return (
    <SectionShell activeServiceId="poa">
      {/* --- HERO SECTION --- */}
      <div className="relative pt-6 pb-12 overflow-hidden">
        <SectionInner>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div variants={fadeUp} className="lg:col-span-7 space-y-6">
              <GoldBadge text="Remote Video Call Notarization" icon={Video} />

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.1]">
                Lawyer-Drafted <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFE58F] to-[#D4AF37]">
                  Power of Attorney Dubai
                </span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
                Bilingual English & Arabic Power of Attorney drafted by legal professionals and notarized online via video call. Zero physical notary visit required.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#D4AF37]/20">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FFE58F] font-mono">100%</div>
                  <div className="text-xs text-zinc-400 mt-1">Lawyer Custom Drafted</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FFE58F] font-mono">Video Call</div>
                  <div className="text-xs text-zinc-400 mt-1">Remote Notarization</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FFE58F] font-mono">24 Hours</div>
                  <div className="text-xs text-zinc-400 mt-1">Fast Turnaround</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="https://wa.me/9718003627"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-[10px] bg-gradient-to-r from-[#8C5E00] via-[#D4AF37] to-[#8C5E00] text-black font-bold text-sm uppercase tracking-wider hover:opacity-95 transition-all shadow-xl shadow-[#D4AF37]/20 flex items-center gap-3"
                >
                  Consult Legal POA Advisor <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Calculator Column */}
            <motion.div variants={scaleIn} className="lg:col-span-12">
              <PoaCalculator />
            </motion.div>
          </div>
        </SectionInner>
      </div>

      {/* --- BENTO CAPABILITIES --- */}
      <div className="py-16 bg-[#0E0C0A]/60 border-y border-[#D4AF37]/15">
        <SectionInner>
          <SectionHeader
            badge="Bilingual Legal Engineering"
            title="Custom Power of Attorney Solutions"
            subtitle="Architected for seamless execution before Dubai Land Department, banks, and government ministries."
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
            badge="Pre-Requisites Matrix"
            title="Required Information for POA Drafting"
            subtitle="Essential IDs and title deeds needed to draft your notarized Power of Attorney."
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
            badge="Online Video Notarization"
            title="4-Step Remote POA Execution Flow"
            subtitle="From legal drafting to a 2-minute video call with the Dubai Notary Judge."
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
            badge="Legal POA FAQ"
            title="Frequently Asked Power of Attorney Questions"
            subtitle="Authoritative answers regarding video notarization, validity, and legal powers."
          />

          <div className="mt-12 max-w-4xl mx-auto">
            <LuxuryFAQ items={faqs} />
          </div>
        </SectionInner>
      </div>

      {/* --- FOOTER CTA --- */}
      <LuxuryFooterCTA
        title="Protect Your Assets with a Lawyer-Drafted POA"
        subtitle="Schedule a strategic consultation to draft and remotely notarize your Power of Attorney within 24 hours."
        buttonText="Draft POA via WhatsApp"
        whatsappNumber="9718003627"
      />
    </SectionShell>
  );
}
