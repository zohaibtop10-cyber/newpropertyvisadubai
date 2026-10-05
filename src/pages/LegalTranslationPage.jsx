import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Languages,
  FileText,
  ShieldCheck,
  Award,
  CheckCircle2,
  Clock,
  ArrowRight,
  Calculator,
  Building,
  FileCheck,
  Scale,
  Sparkles,
  Globe,
  Truck,
  BookOpen
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

// --- INTERACTIVE LEGAL TRANSLATION COST WIDGET ---
const TranslationCalculator = () => {
  const [docType, setDocType] = useState('certificate'); // certificate | contract | court
  const [targetLang, setTargetLang] = useState('arabic'); // arabic | russian | french | german
  const [pageCount, setPageCount] = useState(2);
  const [isUrgent, setIsUrgent] = useState(false);

  const ratePerCategory = {
    certificate: { baseRate: 75, name: 'Personal Certificate (Marriage, Birth, Degree)' },
    contract: { baseRate: 95, name: 'Commercial Contract / MOA / Trade License' },
    court: { baseRate: 120, name: 'Legal Litigation / Court Judgment / Memorandum' }
  };

  const currentCategory = ratePerCategory[docType];
  const langMultiplier = targetLang === 'arabic' ? 1.0 : 1.25;
  const urgentFee = isUrgent ? 150 : 0;

  const translationTotal = Math.round(currentCategory.baseRate * pageCount * langMultiplier);
  const grandTotal = translationTotal + urgentFee;

  return (
    <LuxuryCard className="p-6 md:p-8 bg-gradient-to-br from-[#12100E]/90 via-[#1A1612]/80 to-[#12100E]/90 border-[#D4AF37]/30 backdrop-blur-xl relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-[#D4AF37]/20 pb-4">
        <div>
          <GoldBadge text="MOJ Sworn Translation Simulator" icon={Languages} />
          <h3 className="text-xl md:text-2xl font-serif text-[#FFE58F] mt-2 font-bold">
            Certified Legal Translation Rate Estimator
          </h3>
          <p className="text-xs text-[#D4AF37]/70">
            Official Ministry of Justice (MOJ) licensed translation pricing for UAE Courts & Notaries
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs uppercase tracking-widest text-zinc-400 block font-medium">Estimated Fee</span>
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
              Select Document Classification
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'certificate', label: 'Certificate', sub: 'Birth / Marriage' },
                { id: 'contract', label: 'Contracts', sub: 'MOA / Agreements' },
                { id: 'court', label: 'Court Legal', sub: 'Litigation Files' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setDocType(item.id)}
                  className={`p-3 rounded-[10px] text-left transition-all border ${
                    docType === item.id
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

          {/* Target Language */}
          <div>
            <label className="text-xs font-semibold text-[#FFE58F] uppercase tracking-wider block mb-2">
              Target Legal Language
            </label>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="w-full bg-[#1A1612] border border-[#D4AF37]/30 rounded-[10px] px-4 py-3 text-xs text-[#FFE58F] font-semibold focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="arabic">Arabic (MOJ Court Certified — Official UAE)</option>
              <option value="russian">Russian ↔ English / Arabic</option>
              <option value="french">French ↔ English / Arabic</option>
              <option value="german">German ↔ English / Arabic</option>
            </select>
          </div>

          {/* Page Counter Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-[#FFE58F] uppercase tracking-wider">
                Total Page Count
              </label>
              <span className="text-xs font-mono font-bold text-[#FFE58F] bg-[#8C5E00]/30 px-2 py-0.5 rounded border border-[#D4AF37]/30">
                {pageCount} Page{pageCount > 1 ? 's' : ''}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              value={pageCount}
              onChange={(e) => setPageCount(parseInt(e.target.value))}
              className="w-full accent-[#D4AF37] bg-[#1A1612] cursor-pointer"
            />
          </div>

          {/* Urgent Toggle */}
          <div className="pt-2 border-t border-[#D4AF37]/15">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={isUrgent}
                onChange={(e) => setIsUrgent(e.target.checked)}
                className="w-4 h-4 accent-[#D4AF37] rounded"
              />
              <span className="text-xs text-zinc-300 group-hover:text-[#FFE58F] transition-colors">
                Enable Same-Day Express Delivery (Same Business Day Turnaround) (+AED 150)
              </span>
            </label>
          </div>
        </div>

        {/* Invoice & Specs Column */}
        <div className="lg:col-span-6 bg-[#0E0C0A] border border-[#D4AF37]/30 rounded-[10px] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-3 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                <FileCheck className="w-4 h-4" /> Translation Quotation
              </span>
              <span className="text-[11px] font-semibold text-[#FFE58F]">
                {isUrgent ? '3 - 6 Hours' : '24 Hours'} Turnaround
              </span>
            </div>

            <div className="space-y-2 text-xs border-b border-[#D4AF37]/15 pb-3 mb-3">
              <div className="flex justify-between text-zinc-300">
                <span>{currentCategory.name}</span>
                <span className="font-mono">AED {translationTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>MOJ Official Stamp & Seal</span>
                <span className="font-mono text-[#FFE58F]">INCLUDED</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Digital E-Copy PDF Delivery</span>
                <span className="font-mono text-[#FFE58F]">FREE</span>
              </div>
              {isUrgent && (
                <div className="flex justify-between text-[#FFE58F]">
                  <span>Same-Day VIP Express Speed</span>
                  <span className="font-mono">AED {urgentFee}</span>
                </div>
              )}
            </div>

            <div className="space-y-1.5 text-xs text-zinc-400">
              <div className="flex items-center gap-2 text-[#FFE58F] font-semibold mb-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Guarantee Compliance
              </div>
              <p className="text-[11px] text-zinc-300 leading-relaxed">
                Certified and stamped by licensed Ministry of Justice (MOJ) translators. 100% accepted by Dubai Courts, Notary Public, GDRFA, MOHRE, and UAE Embassies.
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
              Upload Document for Free Review <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </LuxuryCard>
  );
};

export default function LegalTranslationPage() {
  const bentoServices = [
    {
      icon: Scale,
      title: 'MOJ Certified Arabic Translation',
      desc: 'Legal translation bearing the official stamp and license of the UAE Ministry of Justice, legally mandatory for all Dubai Courts filings.'
    },
    {
      icon: FileText,
      title: 'Corporate Contracts & MOA',
      desc: 'Bilingual legal translation of Memorandum of Association, Power of Attorney, Shareholder Agreements, and Board Resolutions.'
    },
    {
      icon: BookOpen,
      title: 'Court Pleadings & Verdicts',
      desc: 'Expert translation of legal litigation files, case memorandums, expert reports, and official judgment decrees.'
    },
    {
      icon: Award,
      title: 'Personal Certificates & Degrees',
      desc: 'Sworn translation of marriage certificates, birth certificates, academic degrees, and police clearance reports.'
    },
    {
      icon: Globe,
      title: 'Multi-Lingual Sworn Desk',
      desc: 'Certified translations between Arabic, English, French, Russian, German, Spanish, Italian, Turkish, Chinese, and Farsi.'
    },
    {
      icon: Truck,
      title: 'Doorstep Courier & Hard Copy',
      desc: 'Digital PDF delivered within hours, backed by hard-copy delivery with embossed MOJ seals anywhere in the UAE.'
    }
  ];

  const documentTabs = [
    {
      id: 'certificates',
      title: 'Certificates',
      icon: Award,
      docs: [
        { name: 'Original / High-Res Scan of Certificate', req: 'Mandatory', hint: 'Clear scan showing all stamps and signatures' },
        { name: 'Passport Copy of Certificate Holder', req: 'Mandatory', hint: 'Used for exact spelling matching in Arabic' }
      ]
    },
    {
      id: 'contracts',
      title: 'Contracts & MOA',
      icon: FileText,
      docs: [
        { name: 'Complete Contract PDF', req: 'Mandatory', hint: 'Must include all schedules and exhibits' },
        { name: 'Trade License Copy', req: 'Mandatory', hint: 'Required for corporate name transliteration' }
      ]
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Document Upload & Assessment',
      desc: 'Send your documents via WhatsApp or email for instant page audit and binding quote.'
    },
    {
      step: '02',
      title: 'MOJ Legal Translator Drafting',
      desc: 'Translation performed by sworn legal translators licensed by the UAE Ministry of Justice.'
    },
    {
      step: '03',
      title: 'Quality Audit & MOJ Stamping',
      desc: 'Secondary legal review and application of official MOJ stamps and license seals.'
    },
    {
      step: '04',
      title: 'Digital & Hard-Copy Delivery',
      desc: 'Instant high-resolution PDF delivery, followed by physical courier delivery of hard copies.'
    }
  ];

  const faqs = [
    {
      q: 'What is Ministry of Justice (MOJ) certified legal translation in the UAE?',
      a: 'MOJ certified legal translation is performed by translators who have passed rigorous UAE legal examinations and hold an official license from the Ministry of Justice. Their legal stamp renders the translated document legally binding before Dubai Courts, Notary Public, and government authorities.'
    },
    {
      q: 'When is legal translation legally required in Dubai?',
      a: 'Any foreign-language document (English, French, Russian, etc.) presented to Dubai Courts, Public Prosecution, Notary Public, GDRFA, or Ministry of Foreign Affairs must be accompanied by an MOJ-certified Arabic translation.'
    },
    {
      q: 'How fast can I get my legal translation completed?',
      a: 'Standard documents (1 to 5 pages) are completed within 24 hours. Our VIP Express service delivers certified translations within 3 to 6 hours.'
    },
    {
      q: 'Do I need to submit the physical original document?',
      a: 'For most certified translations, a clear high-resolution digital PDF or scan is sufficient. Our sworn translators print and bind the translated text alongside a copy of your original document with official MOJ stamps.'
    }
  ];

  return (
    <SectionShell activeServiceId="legal-translation">
      {/* --- HERO SECTION --- */}
      <div className="relative pt-6 pb-12 overflow-hidden">
        <SectionInner>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div variants={fadeUp} className="lg:col-span-7 space-y-6">
              <GoldBadge text="MOJ Licensed Legal Translators" icon={Scale} />

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.1]">
                Certified Legal Translation & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFE58F] to-[#D4AF37]">
                  Court Sworn Services
                </span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
                Ministry of Justice (MOJ) licensed legal translations in Dubai. Certified Arabic and multi-lingual translations accepted by Dubai Courts, Notary Public, and UAE Ministries.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#D4AF37]/20">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FFE58F] font-mono">100%</div>
                  <div className="text-xs text-zinc-400 mt-1">Court Accepted</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FFE58F] font-mono">3-6 Hours</div>
                  <div className="text-xs text-zinc-400 mt-1">VIP Express Speed</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FFE58F] font-mono">MOJ Seals</div>
                  <div className="text-xs text-zinc-400 mt-1">Sworn Legal Stamps</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="https://wa.me/9718003627"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-[10px] bg-gradient-to-r from-[#8C5E00] via-[#D4AF37] to-[#8C5E00] text-black font-bold text-sm uppercase tracking-wider hover:opacity-95 transition-all shadow-xl shadow-[#D4AF37]/20 flex items-center gap-3"
                >
                  Upload Files for Free Quote <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Calculator Column */}
            <motion.div variants={scaleIn} className="lg:col-span-12">
              <TranslationCalculator />
            </motion.div>
          </div>
        </SectionInner>
      </div>

      {/* --- BENTO CAPABILITIES --- */}
      <div className="py-16 bg-[#0E0C0A]/60 border-y border-[#D4AF37]/15">
        <SectionInner>
          <SectionHeader
            badge="Sworn Capabilities"
            title="Comprehensive Legal & Sworn Translation"
            subtitle="Authoritative linguistic translation engineered for legal validity before courts and official authorities."
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
            badge="Document Specifications"
            title="Required Files for Certified Translation"
            subtitle="Clear instructions for digital submission and name spelling verification."
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
            title="Fast-Track Translation & Certification Flow"
            subtitle="From instant upload to final MOJ stamping and physical delivery."
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
            badge="Translation FAQ"
            title="Frequently Asked Legal Translation Questions"
            subtitle="Essential insights on Ministry of Justice certification and court requirements."
          />

          <div className="mt-12 max-w-4xl mx-auto">
            <LuxuryFAQ items={faqs} />
          </div>
        </SectionInner>
      </div>

      {/* --- FOOTER CTA --- */}
      <LuxuryFooterCTA
        title="Get Your MOJ Certified Translation Today"
        subtitle="Upload your document via WhatsApp for an immediate free quote and express 3-hour processing."
        buttonText="Get Instant Quote via WhatsApp"
        whatsappNumber="9718003627"
      />
    </SectionShell>
  );
}
