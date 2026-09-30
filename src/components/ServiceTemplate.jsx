import React, { useState } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import {
  CheckCircle2,
  FileText,
  Clock,
  HelpCircle,
  Calculator,
  Lock,
  Users
} from 'lucide-react';
import { visaServices, siteConfig } from '../data/propertyVisaData';
import { servicesData } from '../data/cmsData';

export default function ServiceTemplate({
  serviceId,
  onOpenCalculator,
  onNavigate,
  cmsConfig
}) {
  const masterServices = [...servicesData, ...visaServices];
  const baseService = masterServices.find((s) => s.id === serviceId) || masterServices[0];
  
  // Merge CMS overrides
  const cmsOverride = cmsConfig?.servicePages?.[serviceId] || {};
  const service = { ...baseService, ...cmsOverride };


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
        <div className="rounded-xl overflow-hidden relative border border-white/10 bg-brand-darkBg text-white min-h-[380px] flex items-center">
          <img
            src={service.heroImage}
            alt={service.title}
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gold-shimmer opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-transparent" />

          <div className="relative z-10 p-8 sm:p-12 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-brand-gold/20 text-brand-gold border border-brand-gold/30">
              <span>{service.minThreshold || service.heroTag || service.badge || 'PRO VERIFIED'}</span>
              <span>•</span>
              <span>{service.category}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-brand-gold">
              {service.title}
            </h1>

            {service.subtitle && (
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-2">
                {service.subtitle}
              </h2>
            )}

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {service.heroDescription || service.overview}
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={onOpenCalculator}
                className="flex items-center gap-2 bg-gold-gradient btn-shine-effect text-black font-extrabold hover:brightness-110 px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-[#D4AF37]/30 cursor-pointer"
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
                <WhatsAppIcon className="w-4 h-4" />
                <span>WhatsApp an Expert</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STICKY QUICK-ACTION SUB-MENU */}
      <nav className="sticky top-[65px] z-30 bg-surface/90 dark:bg-brand-darkBg/90 backdrop-blur-xl border-y border-border-subtle dark:border-white/10 py-3 px-4 sm:px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar text-xs font-semibold">
          <button
            onClick={() => scrollToSection('eligibility')}
            className="px-3.5 py-2 rounded-xl border bg-surface-elevated dark:bg-white/5 border-border-subtle dark:border-white/10 text-content-secondary dark:text-slate-300 hover:border-brand-primary hover:text-brand-primary whitespace-nowrap cursor-pointer transition-colors"
          >
            Eligibility
          </button>
          <button
            onClick={() => scrollToSection('documents')}
            className="px-3.5 py-2 rounded-xl border bg-surface-elevated dark:bg-white/5 border-border-subtle dark:border-white/10 text-content-secondary dark:text-slate-300 hover:border-brand-primary hover:text-brand-primary whitespace-nowrap cursor-pointer transition-colors"
          >
            Required Documents
          </button>
          <button
            onClick={() => scrollToSection('fees')}
            className="px-3.5 py-2 rounded-xl border bg-surface-elevated dark:bg-white/5 border-border-subtle dark:border-white/10 text-content-secondary dark:text-slate-300 hover:border-brand-primary hover:text-brand-primary whitespace-nowrap cursor-pointer transition-colors"
          >
            Govt Fees
          </button>
          <button
            onClick={() => scrollToSection('timeline')}
            className="px-3.5 py-2 rounded-xl border bg-surface-elevated dark:bg-white/5 border-border-subtle dark:border-white/10 text-content-secondary dark:text-slate-300 hover:border-brand-primary hover:text-brand-primary whitespace-nowrap cursor-pointer transition-colors"
          >
            Processing Time
          </button>
          <button
            onClick={() => scrollToSection('family-rules')}
            className="px-3.5 py-2 rounded-xl border bg-surface-elevated dark:bg-white/5 border-border-subtle dark:border-white/10 text-content-secondary dark:text-slate-300 hover:border-brand-primary hover:text-brand-primary whitespace-nowrap cursor-pointer transition-colors"
          >
            Family Sponsorship
          </button>
          <button
            onClick={() => scrollToSection('service-faqs')}
            className="px-3.5 py-2 rounded-xl border bg-surface-elevated dark:bg-white/5 border-border-subtle dark:border-white/10 text-content-secondary dark:text-slate-300 hover:border-brand-primary hover:text-brand-primary whitespace-nowrap cursor-pointer transition-colors"
          >
            FAQs
          </button>
          <button
            onClick={() => scrollToSection('audit-lead-form')}
            className="px-4 py-2 rounded-xl bg-brand-primary text-white whitespace-nowrap cursor-pointer hover:bg-[#D4AF37] transition-colors"
          >
            Free Deed Audit
          </button>
        </div>
      </nav>

      {/* 3. CONTENT SECTIONS MAPPED TO SUB-MENU */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Sections (8 Columns) */}
        <div className="lg:col-span-8 space-y-16">
          
          {/* BENEFITS SECTION (NEW) */}
          {service.benefits && service.benefits.length > 0 && (
            <section id="benefits" className="scroll-mt-32 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-brand-gold/10 text-brand-gold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h2 className="font-display text-2xl font-bold text-content-primary dark:text-white">
                  Key Advantages & Benefits
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {service.benefits.map((benefit, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-brand-surfaceLight backdrop-blur-md border border-white/10 hover:border-brand-gold/30 transition-all flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-white">{benefit.title || benefit}</div>
                      {benefit.desc && <div className="text-xs text-slate-400 mt-1">{benefit.desc}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ELIGIBILITY SECTION */}
          <section id="eligibility" className="scroll-mt-32 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-brand-primary/10 text-brand-primary">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h2 className="font-display text-2xl font-bold text-content-primary dark:text-white">
                Eligibility Criteria
              </h2>
            </div>

            <div className="p-6 rounded-xl bg-surface dark:bg-brand-surface border border-border-subtle dark:border-white/10 space-y-3">
              <p className="text-xs text-content-muted dark:text-slate-400 font-mono">
                Official ICP & GDRFA Eligibility Directives for {service.title}:
              </p>
              <ul className="space-y-3 text-xs sm:text-sm text-content-secondary dark:text-slate-300">
                {service.eligibility.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* REQUIRED DOCUMENTS SECTION */}
          <section id="documents" className="scroll-mt-32 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-brand-primary/10 text-brand-primary">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="font-display text-2xl font-bold text-content-primary dark:text-white">
                Required Documents Checklist
              </h2>
            </div>

            <div className="p-6 rounded-xl bg-surface dark:bg-brand-surface border border-border-subtle dark:border-white/10 space-y-3">
              <p className="text-xs text-content-muted dark:text-slate-400 font-mono">
                Prepare high-resolution digital scans for WhatsApp submission:
              </p>
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {service.documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-canvas dark:bg-white/[0.02] border border-border-subtle dark:border-white/10 text-xs text-content-primary dark:text-slate-200 font-medium flex items-center gap-2.5"
                  >
                    <FileText className="w-4 h-4 text-brand-primary shrink-0" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* GOVT FEES & PRICING SECTION */}
          <section id="fees" className="scroll-mt-32 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-brand-primary/10 text-brand-primary">
                <Calculator className="w-5 h-5" />
              </div>
              <h2 className="font-display text-2xl font-bold text-content-primary dark:text-white">
                Government Fees & Pass-Through Costs
              </h2>
            </div>

            <div className="p-6 rounded-xl bg-surface dark:bg-brand-surface border border-border-subtle dark:border-white/10 space-y-5">
              <div className="space-y-3">
                <div className="text-xs font-mono text-slate-400">Statutory Cost Split:</div>
                <div className="space-y-2 text-xs font-mono text-content-secondary dark:text-slate-300">
                  {service.pricing.breakdown.map((item, idx) => (
                    <div key={idx} className="flex justify-between py-2 border-b border-border-subtle dark:border-white/5">
                      <span>{item.label}</span>
                      <span className="font-semibold text-content-primary dark:text-white">AED {item.cost.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-canvas dark:bg-black/40 border border-border-subtle dark:border-white/10 flex items-center justify-between font-mono text-sm font-bold">
                <span>Estimated Net Investment:</span>
                <span className="text-brand-primary text-base">AED {service.pricing.totalEstimate.toLocaleString()}</span>
              </div>
            </div>
          </section>

          {/* PROCESSING TIMELINE SECTION */}
          <section id="timeline" className="scroll-mt-32 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-brand-primary/10 text-brand-primary">
                <Clock className="w-5 h-5" />
              </div>
              <h2 className="font-display text-2xl font-bold text-content-primary dark:text-white">
                Processing SLA & Progress Timeline
              </h2>
            </div>

            <div className="p-7 rounded-xl bg-surface dark:bg-brand-surface border border-border-subtle dark:border-white/10 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-brand-primary font-semibold">ESTIMATED COMPLETION SLA</div>
                  <div className="font-display font-extrabold text-2xl text-content-primary dark:text-white mt-0.5">
                    {typeof service.processingTime === 'object'
                      ? `${service.processingTime.standard} (${service.processingTime.express})`
                      : (service.processingTime || '3 to 5 Working Days')}
                  </div>
                </div>
                <span className="text-xs font-mono text-brand-gold bg-emerald-500/10 px-3 py-1 rounded-full font-semibold">
                  100% ONLINE TRACK
                </span>
              </div>

              {/* Progress Bar Visual */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>Day 1: Audit</span>
                  <span>Day 3: Submission</span>
                  <span>Day 7: E-ID Delivery</span>
                </div>
                <div className="w-full h-3 rounded-full bg-surface-elevated dark:bg-white/10 overflow-hidden">
                  <div className="w-3/4 h-full bg-gradient-to-r from-[#D4AF37] to-sky-400 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </section>

          {/* PROCESS STEPS SECTION (NEW) */}
          {service.processSteps && service.processSteps.length > 0 && (
            <section id="process" className="scroll-mt-32 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-brand-gold/10 text-brand-gold">
                  <Clock className="w-5 h-5" />
                </div>
                <h2 className="font-display text-2xl font-bold text-content-primary dark:text-white">
                  Step-by-Step Process
                </h2>
              </div>
              <div className="space-y-3">
                {service.processSteps.map((step, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-surface dark:bg-brand-surface border border-border-subtle dark:border-white/10 flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center font-bold font-mono shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="font-bold text-content-primary dark:text-white text-sm">{step.title}</div>
                      <div className="text-content-muted dark:text-slate-400 text-xs mt-1">{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FAMILY SPONSORSHIP RULES SECTION */}
          <section id="family-rules" className="scroll-mt-32 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-brand-primary/10 text-brand-primary">
                <Users className="w-5 h-5" />
              </div>
              <h2 className="font-display text-2xl font-bold text-content-primary dark:text-white">
                Family Sponsorship Privileges
              </h2>
            </div>

            <div className="p-6 rounded-xl bg-surface dark:bg-brand-surface border border-border-subtle dark:border-white/10 space-y-3">
              {service.rules.map((rule, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-content-secondary dark:text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-brand-primary mt-2 shrink-0" />
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </section>

          {/* FAQS SECTION */}
          <section id="service-faqs" className="scroll-mt-32 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-brand-primary/10 text-brand-primary">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h2 className="font-display text-2xl font-bold text-content-primary dark:text-white">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {service.faqs.map((faq, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-surface dark:bg-brand-surface border border-border-subtle dark:border-white/10 space-y-2">
                  <div className="font-display font-semibold text-sm text-content-primary dark:text-white">
                    Q: {faq.question}
                  </div>
                  <div className="text-xs text-content-muted dark:text-slate-400 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* 4. BOTTOM LEAD CAPTURE FORM (4 Columns - Sticky) */}
        <div id="audit-lead-form" className="lg:col-span-4 sticky top-28 space-y-6">
          <div className="relative p-7 rounded-xl bg-surface dark:bg-[#050505] border border-border-subtle dark:border-white/5 shadow-2xl overflow-hidden">
            {/* Premium Glow Effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-70"></div>
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10 space-y-6">
              <div>
                <div className="inline-block px-2.5 py-1 bg-brand-primary/10 border border-brand-primary/20 rounded-full text-[10px] font-mono font-bold text-brand-primary uppercase tracking-widest mb-3">
                  Free Consultation
                </div>
                <h3 className="font-display font-bold text-2xl text-content-primary dark:text-white leading-tight">
                  Ready for your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]">{service.title}</span>?
                </h3>
                <p className="text-xs text-content-muted dark:text-slate-400 mt-2 leading-relaxed">
                  Submit your details below. Our specialists will contact you on WhatsApp with a clear action plan and cost breakdown.
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => onOpenCalculator('family')}
                  className="w-full group relative overflow-hidden bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] bg-[length:200%_auto] hover:bg-[position:100%_center] text-black font-extrabold py-4 rounded-xl shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2 btn-shine-effect"
                >
                  <Calculator className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span>Calculate Visa Cost Now</span>
                </button>
                <a
                  href={`https://wa.me/${cmsConfig?.global?.whatsappRaw || '971566556645'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full group bg-surface-elevated dark:bg-[#121212] border border-border-subtle dark:border-white/10 hover:border-[#25D366]/50 text-content-primary dark:text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5 text-[#25D366] fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
