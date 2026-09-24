import React, { useState } from 'react';
import {
  CheckCircle2,
  FileText,
  Clock,
  HelpCircle,
  Calculator,
  Lock,
  MessageSquare,
  Users
} from 'lucide-react';
import { visaServices, siteConfig } from '../data/propertyVisaData';
import { servicesData } from '../data/cmsData';

export default function ServiceTemplate({
  serviceId,
  onOpenCalculator
}) {
  const masterServices = [...servicesData, ...visaServices];
  const service = masterServices.find((s) => s.id === serviceId) || masterServices[0];


  // Lead form state
  const [ownerName, setOwnerName] = useState('');
  const [whatsappPhone, setWhatsappPhone] = useState('');
  const [propertyDetails, setPropertyDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitDeedAudit = (e) => {
    e.preventDefault();
    if (!whatsappPhone) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-12 pb-20">
      
      {/* 1. DYNAMIC HERO */}
      <section className="relative pt-12 sm:pt-16 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="rounded-3xl overflow-hidden relative border border-slate-200 dark:border-white/10 bg-slate-900 text-white min-h-[380px] flex items-center">
          <img
            src={service.heroImage}
            alt={service.title}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />

          <div className="relative z-10 p-8 sm:p-12 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-[#E01E37] text-white">
              <span>{service.minThreshold || service.heroTag || service.badge || 'PRO VERIFIED'}</span>
              <span>•</span>
              <span>{service.category}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              {service.title}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {service.overview}
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={onOpenCalculator}
                className="flex items-center gap-2 bg-[#E01E37] hover:bg-[#C8102E] text-white px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-[#E01E37]/30 cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                <span>Calculate Exact Fees</span>
              </button>

              <a
                href={`https://wa.me/${cmsConfig?.global?.whatsappRaw || siteConfig.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-600/30"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp DLD Advisor</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STICKY QUICK-ACTION SUB-MENU */}
      <nav className="sticky top-[65px] z-30 bg-white/90 dark:bg-[#0A0A0A]/90 backdrop-blur-xl border-y border-slate-200 dark:border-white/10 py-3 px-4 sm:px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar text-xs font-semibold">
          <button
            onClick={() => scrollToSection('eligibility')}
            className="px-3.5 py-2 rounded-xl border bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-[#E01E37] hover:text-[#E01E37] whitespace-nowrap cursor-pointer transition-colors"
          >
            Eligibility
          </button>
          <button
            onClick={() => scrollToSection('documents')}
            className="px-3.5 py-2 rounded-xl border bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-[#E01E37] hover:text-[#E01E37] whitespace-nowrap cursor-pointer transition-colors"
          >
            Required Documents
          </button>
          <button
            onClick={() => scrollToSection('fees')}
            className="px-3.5 py-2 rounded-xl border bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-[#E01E37] hover:text-[#E01E37] whitespace-nowrap cursor-pointer transition-colors"
          >
            Govt Fees
          </button>
          <button
            onClick={() => scrollToSection('timeline')}
            className="px-3.5 py-2 rounded-xl border bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-[#E01E37] hover:text-[#E01E37] whitespace-nowrap cursor-pointer transition-colors"
          >
            Processing Time
          </button>
          <button
            onClick={() => scrollToSection('family-rules')}
            className="px-3.5 py-2 rounded-xl border bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-[#E01E37] hover:text-[#E01E37] whitespace-nowrap cursor-pointer transition-colors"
          >
            Family Sponsorship
          </button>
          <button
            onClick={() => scrollToSection('service-faqs')}
            className="px-3.5 py-2 rounded-xl border bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-[#E01E37] hover:text-[#E01E37] whitespace-nowrap cursor-pointer transition-colors"
          >
            FAQs
          </button>
          <button
            onClick={() => scrollToSection('audit-lead-form')}
            className="px-4 py-2 rounded-xl bg-[#E01E37] text-white whitespace-nowrap cursor-pointer hover:bg-[#C8102E] transition-colors"
          >
            Free Deed Audit
          </button>
        </div>
      </nav>

      {/* 3. CONTENT SECTIONS MAPPED TO SUB-MENU */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Sections (8 Columns) */}
        <div className="lg:col-span-8 space-y-16">
          
          {/* ELIGIBILITY SECTION */}
          <section id="eligibility" className="scroll-mt-32 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#E01E37]/10 text-[#E01E37]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                Eligibility Criteria
              </h2>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 space-y-3">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Official DLD & ICP Eligibility Directives for {service.title}:
              </p>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {service.eligibility.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* REQUIRED DOCUMENTS SECTION */}
          <section id="documents" className="scroll-mt-32 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#E01E37]/10 text-[#E01E37]">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                Required Documents Checklist
              </h2>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 space-y-3">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Prepare high-resolution digital scans for WhatsApp submission:
              </p>
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {service.documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 text-xs text-slate-800 dark:text-slate-200 font-medium flex items-center gap-2.5"
                  >
                    <FileText className="w-4 h-4 text-[#E01E37] shrink-0" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* GOVT FEES & PRICING SECTION */}
          <section id="fees" className="scroll-mt-32 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#E01E37]/10 text-[#E01E37]">
                <Calculator className="w-5 h-5" />
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                Government Fees & Pass-Through Costs
              </h2>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 space-y-5">
              <div className="space-y-3">
                <div className="text-xs font-mono text-slate-400">Statutory Cost Split:</div>
                <div className="space-y-2 text-xs font-mono text-slate-700 dark:text-slate-300">
                  {service.pricing.breakdown.map((item, idx) => (
                    <div key={idx} className="flex justify-between py-2 border-b border-slate-100 dark:border-white/5">
                      <span>{item.label}</span>
                      <span className="font-semibold text-slate-900 dark:text-white">AED {item.cost.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 flex items-center justify-between font-mono text-sm font-bold">
                <span>Estimated Net Investment:</span>
                <span className="text-[#E01E37] text-base">AED {service.pricing.totalEstimate.toLocaleString()}</span>
              </div>
            </div>
          </section>

          {/* PROCESSING TIMELINE SECTION */}
          <section id="timeline" className="scroll-mt-32 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#E01E37]/10 text-[#E01E37]">
                <Clock className="w-5 h-5" />
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                Processing SLA & Progress Timeline
              </h2>
            </div>

            <div className="p-7 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-[#E01E37] font-semibold">ESTIMATED COMPLETION SLA</div>
                  <div className="font-display font-extrabold text-2xl text-slate-900 dark:text-white mt-0.5">
                    {typeof service.processingTime === 'object'
                      ? `${service.processingTime.standard} (${service.processingTime.express})`
                      : (service.processingTime || '3 to 5 Working Days')}
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full font-semibold">
                  100% ONLINE TRACK
                </span>
              </div>

              {/* Progress Bar Visual */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>Day 1: Title Audit</span>
                  <span>Day 3: DLD Nomination</span>
                  <span>Day 7: E-ID Delivery</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
                  <div className="w-3/4 h-full bg-gradient-to-r from-[#E01E37] to-sky-400 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </section>

          {/* FAMILY SPONSORSHIP RULES SECTION */}
          <section id="family-rules" className="scroll-mt-32 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#E01E37]/10 text-[#E01E37]">
                <Users className="w-5 h-5" />
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                Family Sponsorship Privileges
              </h2>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 space-y-3">
              {service.rules.map((rule, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-[#E01E37] mt-2 shrink-0" />
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </section>

          {/* FAQS SECTION */}
          <section id="service-faqs" className="scroll-mt-32 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#E01E37]/10 text-[#E01E37]">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {service.faqs.map((faq, idx) => (
                <div key={idx} className="p-5 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 space-y-2">
                  <div className="font-display font-semibold text-sm text-slate-900 dark:text-white">
                    Q: {faq.question}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* 4. BOTTOM LEAD CAPTURE FORM (4 Columns - Sticky) */}
        <div id="audit-lead-form" className="lg:col-span-4 sticky top-28 space-y-6">
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 shadow-2xl space-y-5">
            <div>
              <div className="text-xs font-mono font-semibold text-[#E01E37] uppercase">FREE PROPERTY AUDIT</div>
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mt-1">
                Ready to Secure Your Golden Visa?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Submit your details for a free property Title Deed audit and DLD eligibility confirmation.
              </p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmitDeedAudit} className="space-y-3.5">
                <input
                  type="text"
                  placeholder="Property Owner Name"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  required
                  className="w-full bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-white/10 focus:border-[#E01E37] rounded-xl px-3.5 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-colors"
                />

                <input
                  type="tel"
                  placeholder="WhatsApp Number"
                  value={whatsappPhone}
                  onChange={(e) => setWhatsappPhone(e.target.value)}
                  required
                  className="w-full bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-white/10 focus:border-[#E01E37] rounded-xl px-3.5 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-colors"
                />

                <input
                  type="text"
                  placeholder="Property Location / Developer (e.g. Emaar Downtown)"
                  value={propertyDetails}
                  onChange={(e) => setPropertyDetails(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-white/10 focus:border-[#E01E37] rounded-xl px-3.5 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-colors"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-[#E01E37] hover:bg-[#C8102E] text-white py-3.5 rounded-xl font-semibold text-xs transition-all shadow-md shadow-[#E01E37]/30 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Auditing Title Deed...</span>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Submit Details for Free Deed Audit</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="font-display font-semibold text-xs text-slate-900 dark:text-white">
                  Title Deed Audit Requested!
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  Your property details have been logged. A Senior DLD Legal Advisor will audit your title deed and message you on WhatsApp.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
