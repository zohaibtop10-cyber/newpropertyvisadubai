import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  ShieldCheck,
  Globe,
  Award,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Truck,
  Building,
  Clock,
  Briefcase,
  Users,
  Search,
  CheckSquare,
  FileCheck,
  Scale,
  Sparkles,
  Layers,
  MapPin
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

// --- INTERACTIVE ATTESTATION PIPELINE & FEE ESTIMATOR ---
const AttestationCalculator = () => {
  const [docCategory, setDocCategory] = useState('educational'); // educational | personal | commercial
  const [originCountry, setOriginCountry] = useState('india'); // india | uk | usa | pakistan | philippines | europe | other
  const [expressSpeed, setExpressSpeed] = useState(false);

  const feeMatrix = {
    educational: {
      name: 'Educational Degree / Diploma Attestation',
      mofaFee: 150,
      embassyEstimate: 250,
      baseDays: '3 - 5 Days',
      expressDays: '24 - 48 Hours',
      chain: [
        'Home Country Notary Public Verification',
        'Ministry of Education / Higher Ed Board Stamp',
        'Ministry of External / Foreign Affairs (Home Country)',
        'UAE Embassy in Capital of Origin Country',
        'MOFA (Ministry of Foreign Affairs UAE) Final Seal'
      ]
    },
    personal: {
      name: 'Marriage / Birth / Police Clearance Certificate',
      mofaFee: 150,
      embassyEstimate: 220,
      baseDays: '3 - 4 Days',
      expressDays: '24 Hours',
      chain: [
        'Local Home Country Registrar / Sub-Divisional Magistrate',
        'State Department / Ministry of Foreign Affairs',
        'UAE Embassy Stamping in Origin Country',
        'MOFA UAE Final Authentication Stamp'
      ]
    },
    commercial: {
      name: 'Commercial Document (POA / Invoices / MOA / Trade License)',
      mofaFee: 2000,
      embassyEstimate: 1200,
      baseDays: '5 - 7 Days',
      expressDays: '48 Hours',
      chain: [
        'Chamber of Commerce / High Court Notarization',
        'Ministry of Foreign Affairs (Origin Country)',
        'UAE Embassy Commercial Section Legalization',
        'MOFA UAE Commercial Attestation Stamp (AED 2,000)'
      ]
    }
  };

  const curr = feeMatrix[docCategory];
  const proServiceFee = expressSpeed ? 650 : 350;
  const totalGovFee = curr.mofaFee + curr.embassyEstimate;
  const grandTotal = totalGovFee + proServiceFee;

  return (
    <LuxuryCard className="p-6 md:p-8 bg-gradient-to-br from-[#12100E]/90 via-[#1A1612]/80 to-[#12100E]/90 border-[#D4AF37]/30 backdrop-blur-xl relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-[#D4AF37]/20 pb-4">
        <div>
          <GoldBadge text="Global Legalization Simulator" icon={Globe} />
          <h3 className="text-xl md:text-2xl font-serif text-[#FFE58F] mt-2 font-bold">
            MOFA & Embassy Attestation Fee Calculator
          </h3>
          <p className="text-xs text-[#D4AF37]/70">
            Real-time calculation of UAE MOFA government fees and multi-stage embassy legalizations
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
          {/* Document Type */}
          <div>
            <label className="text-xs font-semibold text-[#FFE58F] uppercase tracking-wider block mb-2">
              Select Document Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'educational', label: 'Educational', sub: 'Degrees & Diplomas' },
                { id: 'personal', label: 'Personal', sub: 'Marriage / Birth' },
                { id: 'commercial', label: 'Commercial', sub: 'POA & Trade Lic' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setDocCategory(cat.id)}
                  className={`p-3 rounded-[10px] text-left transition-all border ${
                    docCategory === cat.id
                      ? 'bg-[#8C5E00]/40 border-[#D4AF37] text-[#FFE58F]'
                      : 'bg-[#1A1612]/60 border-[#D4AF37]/15 text-zinc-400'
                  }`}
                >
                  <div className="text-xs font-bold">{cat.label}</div>
                  <div className="text-[10px] text-zinc-400 truncate mt-0.5">{cat.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Origin Country */}
          <div>
            <label className="text-xs font-semibold text-[#FFE58F] uppercase tracking-wider block mb-2">
              Country of Document Origin
            </label>
            <select
              value={originCountry}
              onChange={(e) => setOriginCountry(e.target.value)}
              className="w-full bg-[#1A1612] border border-[#D4AF37]/30 rounded-[10px] px-4 py-3 text-xs text-[#FFE58F] font-semibold focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="india">India (HRD + MEA + UAE Embassy)</option>
              <option value="uk">United Kingdom (FCO / Apostille + UAE Embassy)</option>
              <option value="usa">United States (State Dept + UAE Embassy)</option>
              <option value="pakistan">Pakistan (MOFA Pakistan + UAE Embassy)</option>
              <option value="philippines">Philippines (DFA Apostille + UAE Embassy)</option>
              <option value="europe">European Union Countries</option>
              <option value="other">Other Global Jurisdictions</option>
            </select>
          </div>

          {/* Speed Toggle */}
          <div className="pt-2 border-t border-[#D4AF37]/15">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={expressSpeed}
                onChange={(e) => setExpressSpeed(e.target.checked)}
                className="w-4 h-4 accent-[#D4AF37] rounded"
              />
              <span className="text-xs text-zinc-300 group-hover:text-[#FFE58F] transition-colors">
                Enable 24-48 Hour VIP Express Courier & Concierge Handling
              </span>
            </label>
          </div>
        </div>

        {/* Invoice & Legal Chain Output */}
        <div className="lg:col-span-6 bg-[#0E0C0A] border border-[#D4AF37]/30 rounded-[10px] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-3 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                <Truck className="w-4 h-4" /> Legal Chain & Fees
              </span>
              <span className="text-[11px] font-semibold text-[#FFE58F]">
                {expressSpeed ? curr.expressDays : curr.baseDays}
              </span>
            </div>

            <div className="space-y-2 text-xs border-b border-[#D4AF37]/15 pb-3 mb-3">
              <div className="flex justify-between text-zinc-300">
                <span>MOFA UAE Official Government Fee</span>
                <span className="font-mono">AED {curr.mofaFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Embassy Legalization Fee (Approx)</span>
                <span className="font-mono">AED {curr.embassyEstimate.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#D4AF37]">
                <span>Doorstep Courier & Concierge Fee</span>
                <span className="font-mono">AED {proServiceFee.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-[#FFE58F] uppercase tracking-wider mb-2">
                Full 5-Stage Authentication Path:
              </div>
              {curr.chain.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2 text-[11px] text-zinc-300">
                  <div className="w-4 h-4 rounded-full bg-[#8C5E00]/40 border border-[#D4AF37] text-[#FFE58F] flex items-center justify-center font-bold text-[9px] flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-[#D4AF37]/20">
            <a
              href="https://wa.me/9718003627"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-[10px] bg-gradient-to-r from-[#8C5E00] via-[#D4AF37] to-[#8C5E00] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-lg shadow-[#D4AF37]/20"
            >
              Request Doorstep Document Pickup <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </LuxuryCard>
  );
};

export default function AttestationPage() {
  const bentoServices = [
    {
      icon: Award,
      title: 'Educational Attestation',
      desc: 'Degree certificates, master diplomas, transcripts, and school reports legalised for UAE Golden Visas and employment permits.'
    },
    {
      icon: FileCheck,
      title: 'Personal Certificate Legalisation',
      desc: 'Marriage, birth, death, and police clearance certificates attested by home country ministries, embassies, and UAE MOFA.'
    },
    {
      icon: Building,
      title: 'Commercial Document Attestation',
      desc: 'Company trade licenses, Memorandum of Association (MOA), Board Resolutions, Power of Attorney, and commercial invoices.'
    },
    {
      icon: Truck,
      title: 'Free Doorstep Pickup & Delivery',
      desc: 'Complimentary secure courier pickup and return of original certificates anywhere in Dubai and the wider UAE.'
    },
    {
      icon: Globe,
      title: '100+ Country Global Network',
      desc: 'Direct embassies and notary affiliations across UK, USA, India, Pakistan, Philippines, Canada, Australia, and Europe.'
    },
    {
      icon: ShieldCheck,
      title: '100% Legal Acceptance Guarantee',
      desc: 'Ironclad guarantee that all documents bear verified government seals accepted by MOHRE, GDRFA, and UAE Ministries.'
    }
  ];

  const documentTabs = [
    {
      id: 'educational',
      title: 'Educational',
      icon: Award,
      docs: [
        { name: 'Original Degree Certificate', req: 'Mandatory', hint: 'Original hard copy required for physical seal application' },
        { name: 'Official Transcripts / Mark Sheets', req: 'Conditional', hint: 'Required for specific home countries like India/Pakistan' },
        { name: 'Passport Copy of Certificate Holder', req: 'Mandatory', hint: 'Clear color copy of information page' },
        { name: 'Authorization Letter', req: 'Mandatory', hint: 'Signed authorization for concierge representation' }
      ]
    },
    {
      id: 'personal',
      title: 'Personal',
      icon: FileCheck,
      docs: [
        { name: 'Original Marriage / Birth Certificate', req: 'Mandatory', hint: 'Must be issued by official government registrar' },
        { name: 'Passport Copies of Both Spouses / Parents', req: 'Mandatory', hint: 'Required for embassy verification' },
        { name: 'Police Clearance Certificate (PCC)', req: 'Conditional', hint: 'Required for specific residency categories' }
      ]
    },
    {
      id: 'commercial',
      title: 'Commercial',
      icon: Building,
      docs: [
        { name: 'Original Commercial Document / Board Resolution', req: 'Mandatory', hint: 'Notarized by Chamber of Commerce in origin country' },
        { name: 'Valid Trade License Copy', req: 'Mandatory', hint: 'UAE or Foreign Company registration document' },
        { name: 'Passport Copy of Authorized Manager', req: 'Mandatory', hint: 'Required for MOFA commercial invoice filings' }
      ]
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Secure Doorstep Document Pickup',
      desc: 'Our insured courier collects your original certificates directly from your residence or office in Dubai.'
    },
    {
      step: '02',
      title: 'Home Country & Embassy Attestation',
      desc: 'Processing through origin country Notary, Ministry of Foreign Affairs, and the UAE Embassy.'
    },
    {
      step: '03',
      title: 'UAE MOFA Final Legalization',
      desc: 'Filing with the Ministry of Foreign Affairs & International Cooperation (MOFAIC) in Dubai/Abu Dhabi.'
    },
    {
      step: '04',
      title: 'Verified Doorstep Return',
      desc: 'Safe return of your fully attested certificates with official hologram stickers and seals attached.'
    }
  ];

  const faqs = [
    {
      q: 'Why is MOFA attestation mandatory in the UAE?',
      a: 'MOFA (Ministry of Foreign Affairs) attestation validates foreign-issued documents for legal recognition within the United Arab Emirates. Without MOFA seals, degrees cannot be used for employment visas or Golden Visas, and marriage/birth certificates cannot be used for family visas.'
    },
    {
      q: 'How long does document attestation take?',
      a: 'Standard attestation takes 3 to 5 business days. With our VIP Express service, educational and personal certificates can be fully legalised within 24 to 48 hours.'
    },
    {
      q: 'What is the official MOFA UAE fee for attestation?',
      a: 'The official MOFA government fee is AED 150 for personal and educational documents (degrees, diplomas, marriage, birth certificates). For commercial documents (trade licenses, invoices, POA), the MOFA government fee is AED 2,000.'
    },
    {
      q: 'Do I need to send my original document or is a copy sufficient?',
      a: 'Official government seals (Embassy and MOFA) must be physically stamped on the original certificate or an official duplicate issued by the university/authority.'
    },
    {
      q: 'Is doorstep pickup and delivery included?',
      a: 'Yes. We provide complimentary secure, insured courier pickup and delivery anywhere across Dubai and all 7 Emirates.'
    }
  ];

  return (
    <SectionShell activeServiceId="attestation">
      {/* --- HERO SECTION --- */}
      <div className="relative pt-6 pb-12 overflow-hidden">
        <SectionInner>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div variants={fadeUp} className="lg:col-span-7 space-y-6">
              <GoldBadge text="Global Certificate Authentication" icon={Award} />

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.1]">
                MOFA & Embassy <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFE58F] to-[#D4AF37]">
                  Document Attestation
                </span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
                Complete legalisation for educational degrees, marriage & birth certificates, and commercial documents. 100% online, doorstep pickup, and express 24-hour turnaround.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#D4AF37]/20">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FFE58F] font-mono">100+</div>
                  <div className="text-xs text-zinc-400 mt-1">Countries Supported</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FFE58F] font-mono">24-48h</div>
                  <div className="text-xs text-zinc-400 mt-1">Express Turnaround</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FFE58F] font-mono">100%</div>
                  <div className="text-xs text-zinc-400 mt-1">Doorstep Pickup & Return</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="https://wa.me/9718003627"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-[10px] bg-gradient-to-r from-[#8C5E00] via-[#D4AF37] to-[#8C5E00] text-black font-bold text-sm uppercase tracking-wider hover:opacity-95 transition-all shadow-xl shadow-[#D4AF37]/20 flex items-center gap-3"
                >
                  Book Doorstep Pickup <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Calculator Column */}
            <motion.div variants={scaleIn} className="lg:col-span-12">
              <AttestationCalculator />
            </motion.div>
          </div>
        </SectionInner>
      </div>

      {/* --- BENTO CAPABILITIES --- */}
      <div className="py-16 bg-[#0E0C0A]/60 border-y border-[#D4AF37]/15">
        <SectionInner>
          <SectionHeader
            badge="Institutional Capabilities"
            title="Comprehensive Document Legalisation Services"
            subtitle="Full-spectrum attestation solutions trusted by multinational executives, expatriates, and corporate entities."
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
            title="Required Documents for Attestation"
            subtitle="Clear document specifications based on certificate category."
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
            badge="Authentication Chain"
            title="4-Step Multi-Government Legalisation Chain"
            subtitle="From your doorstep to final MOFA stamp placement."
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
            badge="Attestation Knowledgebase"
            title="Frequently Asked Questions About MOFA Attestation"
            subtitle="Clear answers on government fees, embassy procedures, and doorstep couriers."
          />

          <div className="mt-12 max-w-4xl mx-auto">
            <LuxuryFAQ items={faqs} />
          </div>
        </SectionInner>
      </div>

      {/* --- FOOTER CTA --- */}
      <LuxuryFooterCTA
        title="Legalise Your Certificates with Zero Hassle Today"
        subtitle="Schedule a free doorstep document pickup across Dubai or consult with our global attestation directors."
        buttonText="Schedule Pickup via WhatsApp"
        whatsappNumber="9718003627"
      />
    </SectionShell>
  );
}
