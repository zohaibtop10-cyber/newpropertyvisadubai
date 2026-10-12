'use client';

import React, { useState } from 'react';
import ServiceOptionsBlock from './ServiceOptionsBlock';
import ProcessTimeline from './ProcessTimeline';
import { getServiceBySlug } from '../data/servicesDatabase';
import { 
  HeroWithStatusChecker, 
  OverstayCountdownWidget, 
  SalaryRequirementNotice, 
  FinesWarningBanner,
  DLDValuationCalculator,
  InvestmentBentoGrid,
  DeedDocumentTabs,
  FamilyQuotaCalculator,
  SalaryWarningAlert,
  SponsorVsDependentTabs,
  CategoryTrackSelector,
  PrivilegeMatrix,
  GracePeriodCountdown,
  ZeroContactWorkflow,
  DomesticSalaryGate,
  LocationToggleWidget,
  EIDServiceTabs,
  BiometricExemptionGuide,
  CorporateOnboardingForm,
  JurisdictionDashboard,
  AppTrackerWidget,
  DigitalVsPhysicalSplit,
  GlobalLegalizationPipeline,
  SpeedBentoGrid,
  InstantWordEstimator,
  LanguagePairGrid,
  RemoteVideoWorkflow,
  POAScopeSelector,
  JurisdictionBento,
  AssetProtectionModules,
  DLDTransferCalculator,
  TransactionTypeGrid,
  EquityUnlockExplainer,
  PassportLookupForm,
  OverstayFineCalculator,
  VIPTierPricing,
  LoungeExperienceGallery,
  DeadlineWarningBanner,
  SalaryTierSelector
} from './widgets/BespokeWidgets';
import { 
  CheckCircle2, 
  ShieldCheck, 
  MessageSquare, 
  BadgeCheck, 
  ChevronDown, 
  CheckSquare, 
  Square, 
  Receipt
} from 'lucide-react';

// ============================================================================
// HERO STANDARD BLOCK WITH STICKY AUDIT FORM
// ============================================================================
function HeroStandardBlock({ data }) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const text = encodeURIComponent(`Service Inquiry for ${data?.title}:\nName: ${fullName}\nPhone: ${phone}`);
    window.open(`https://wa.me/971566556645?text=${text}`, '_blank');
  };

  const titleWords = data?.title ? data.title.split(' ') : [];
  const highlightWords = titleWords.length > 2 ? titleWords.splice(-2).join(' ') : '';
  const mainWords = titleWords.join(' ');

  return (
    <section className="relative w-full pt-16 pb-16 md:pt-20 md:pb-24 px-6 overflow-hidden border-b border-border-hairline dark:border-white/5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-goldBg/10 via-slate-50 to-slate-50 dark:from-[#D4AF37]/5 dark:via-[#0a0a0a] dark:to-[#050505]">
      {/* Subtle ambient glow behind text */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#D4AF37]/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
        
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col items-start pt-0 lg:pt-8 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37]/20 to-transparent border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-mono font-bold uppercase tracking-widest shadow-sm mb-2 backdrop-blur-md">
            <span>★</span> {data?.category || 'PREMIUM VISA CONSULTANCY'}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-text  tracking-tight leading-[1.15]">
            {highlightWords ? (
              <>
                {mainWords}{" "}
                <span className="bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#C59B27] bg-clip-text text-transparent font-black filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {highlightWords}
                </span>
              </>
            ) : (
              data?.title
            )}
          </h1>
          <p className="text-lg sm:text-xl text-text-muted dark:text-text-muted font-normal leading-relaxed max-w-2xl">
            {data?.subtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
            {(data?.heroBadges || ['100% SLA Guarantee', 'At-Cost Gov Fees', '15,000+ Visas Processed']).map((badge, idx) => (
              <div key={idx} className="bg-surface/50 /5 backdrop-blur-md border border-border-hairline dark:border-white/10 hover:border-[#D4AF37]/40 hover:bg-surface/80 dark:hover:bg-surface/10 transition-all duration-300 p-4 rounded-[12px] flex items-center justify-center gap-3 shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="text-[10px] font-bold text-text dark:text-slate-200 uppercase tracking-widest">{badge}</span>
              </div>
            ))}
          </div>

          <div className="p-6 bg-surface dark:bg-[#111111] border border-border-hairline dark:border-white/10 rounded-[10px] space-y-2 text-xs text-text-muted dark:text-text-muted leading-relaxed shadow-sm dark:shadow-none">
            <div className="font-bold text-text  text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> Executive Concierge Guarantee
            </div>
            <p>
              Operating under License 800 DOCS LLC SOC. Statutory government charges are billed at pure official cost with unbundled receipts.
            </p>
          </div>
        </div>

        {/* Right Column: Lead Form */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <div className="bg-surface/90 dark:bg-[#111111]/80 backdrop-blur-2xl border border-border-hairline/50 dark:border-[#D4AF37]/20 p-8 sm:p-10 rounded-[12px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.5)] space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4AF37]/10 blur-3xl rounded-full -mr-10 -mt-10" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-70" />

            <div className="border-b border-border-hairline dark:border-white/10 pb-6 relative z-10">
              <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 text-[10px] font-mono font-bold px-3 py-1 rounded-[10px] uppercase tracking-widest mb-3">
                FREE INSTANT AUDIT
              </span>
              <h3 className="text-2xl font-black text-text  tracking-tight">Check Your Eligibility</h3>
              <p className="text-sm text-text-muted dark:text-text-muted mt-2">Get an instant document audit & fee estimate.</p>
            </div>

            {submitted ? (
              <div className="p-8 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-[12px] text-center space-y-3 relative z-10">
                <BadgeCheck className="w-12 h-12 text-[#D4AF37] mx-auto" />
                <div className="text-base font-black text-text ">Audit Request Submitted!</div>
                <p className="text-sm text-text-muted dark:text-text-muted">A Senior PRO will contact you on WhatsApp within 10 minutes.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-sm relative z-10">
                <div>
                  <label className="block text-xs font-bold text-text-muted dark:text-text-muted mb-2 uppercase tracking-wider">Full Legal Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alexander Wright"
                    required
                    className="w-full bg-surface dark:bg-[#1a1a1a] border border-border-hairline dark:border-white/5 rounded-[12px] px-5 py-4 text-text  placeholder:text-text-muted dark:placeholder:text-text-muted focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 focus:outline-none transition-all shadow-inner font-medium text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-text-muted dark:text-text-muted mb-2 uppercase tracking-wider">WhatsApp / Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+971 50 123 4567"
                    required
                    className="w-full bg-surface dark:bg-[#1a1a1a] border border-border-hairline dark:border-white/5 rounded-[12px] px-5 py-4 text-text  placeholder:text-text-muted dark:placeholder:text-text-muted focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 focus:outline-none transition-all shadow-inner font-mono text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 mt-2 bg-dark-gold-gloss text-slate-950 font-black hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 shadow-[0_8px_20px_rgba(212,175,55,0.25)] hover:shadow-[0_10px_25px_rgba(212,175,55,0.35)] rounded-[12px] text-sm uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                  <span>Request Free File Audit</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

// ============================================================================
// DOCUMENT CONCIERGE BLOCK
// ============================================================================
function DocumentConciergeBlock({ documents }) {
  const [activeTab, setActiveTab] = useState('investor');
  const [checkedState, setCheckedState] = useState({});

  if (!documents) return null;

  const toggleCheck = (doc) => {
    setCheckedState(prev => ({ ...prev, [doc]: !prev[doc] }));
  };

  const tabs = [
    { id: 'investor', label: 'Primary Applicant' },
    { id: 'family', label: 'Dependants' },
    { id: 'company', label: 'Corporate Docs' }
  ];

  const currentDocs = documents[activeTab] || documents.investor || [];

  return (
    <section className="py-24 px-6 bg-surface dark:bg-[#050505] border-t border-border-hairline dark:border-white/10">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 bg-dark-gold-gloss text-slate-950 font-bold hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300 shadow-[0_4px_12px_rgba(212,175,55,0.25)]/10 border border-brand-goldBg/30 text-[#D4AF37] text-xs font-semibold rounded-[10px] mb-3 uppercase tracking-wider">
            Document Audit
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-text  tracking-tight">
            Interactive Document Concierge
          </h2>
          <p className="text-text-muted dark:text-text-muted text-sm mt-2">
            Select an applicant tab to audit required document scans before filing.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 bg-surface dark:bg-[#111111] p-2 rounded-[10px] border border-border-hairline dark:border-white/10 max-w-2xl mx-auto shadow-sm dark:shadow-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 rounded-[10px] text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-dark-gold-gloss text-slate-950 font-bold hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300 shadow-[0_4px_12px_rgba(212,175,55,0.25)] text-black shadow-md font-black'
                  : 'text-text-muted dark:text-text-muted hover:text-text dark:hover:text-white hover:bg-surface dark:hover:bg-surface/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-surface/80 dark:bg-[#111111]/80 backdrop-blur-2xl border border-border-hairline/50 dark:border-white/10 p-8 sm:p-10 rounded-[12px] space-y-4 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentDocs.map((doc, idx) => {
              const isChecked = !!checkedState[doc];
              return (
                <div
                  key={idx}
                  onClick={() => toggleCheck(doc)}
                  className={`flex items-center gap-3.5 p-4 rounded-[10px] border transition-all cursor-pointer ${
                    isChecked 
                      ? 'bg-dark-gold-gloss text-slate-950 font-bold hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300 shadow-[0_4px_12px_rgba(212,175,55,0.25)]/10 border-brand-goldBg/40 text-text ' 
                      : 'bg-surface/50 dark:bg-[#050505]/60 backdrop-blur-md border-border-hairline/50 dark:border-white/10 text-text-muted dark:text-text-muted hover:-translate-y-1 hover:shadow-md hover:border-[#D4AF37]/30 transition-all duration-300'
                  }`}
                >
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-text-muted  shrink-0" />
                  )}
                  <span className={`text-xs font-semibold ${isChecked ? 'line-through text-text-muted dark:text-text-muted' : ''}`}>
                    {doc}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// ZERO HIDDEN FEES INVOICE BLOCK
// ============================================================================
function FeeInvoiceBlock({ invoice }) {
  const [showItemized, setShowItemized] = useState(false);

  if (!invoice) return null;

  const totalGovt = invoice.govtFees || 0;
  const totalConcierge = invoice.conciergeFee || 0;
  const totalInvestment = totalGovt + totalConcierge;

  return (
    <section className="py-24 px-6 bg-surface dark:bg-[#050505] border-t border-border-hairline dark:border-white/10">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 text-[10px] font-mono font-bold px-2.5 py-1 rounded-[10px] uppercase tracking-wider">
            Unbundled Transparency
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-text  tracking-tight">
            The Zero-Hidden-Fees <span className="bg-gold-text-shine bg-clip-text text-transparent">Digital Invoice</span>
          </h2>
          <p className="text-text-muted dark:text-text-muted text-sm mt-2">
            Government fees passed on at exact official cost. No typing center markups.
          </p>
        </div>

        <div className="bg-surface dark:bg-[#111111] border border-border-hairline dark:border-white/5 rounded-[12px] p-8 lg:p-10 space-y-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-none relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface dark:bg-[#1a1a1a] border border-border-hairline/50 dark:border-white/5 hover:border-[#D4AF37]/30 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 p-8 rounded-[12px] space-y-4">
              <span className="text-[10px] font-mono font-bold text-text-muted dark:text-text-muted uppercase tracking-wider block">
                1. Statutory Govt Fees (At Cost)
              </span>
              <div className="text-3xl font-black text-text  font-mono">
                AED {totalGovt.toLocaleString()}
              </div>
              <p className="text-xs text-text-muted dark:text-text-muted leading-relaxed">
                Direct pass-through for entry permits, medical & Emirates ID.
              </p>
            </div>

            <div className="bg-surface dark:bg-[#1a1a1a] border border-border-hairline/50 dark:border-white/5 hover:border-[#D4AF37]/30 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 p-8 rounded-[12px] space-y-4">
              <span className="text-[10px] font-mono font-bold text-[#D4AF37] dark:text-[#D4AF37] uppercase tracking-wider block">
                2. VIP Concierge Retainer
              </span>
              <div className="text-3xl font-black text-[#D4AF37] dark:text-[#D4AF37] font-mono">
                AED {totalConcierge.toLocaleString()}
              </div>
              <p className="text-xs text-text-muted dark:text-text-muted leading-relaxed">
                Dedicated PRO liaison, biometrics escort & doorstep delivery.
              </p>
            </div>

            <div className="relative bg-gradient-to-br from-white to-slate-50 dark:from-[#1a1a1a] dark:to-[#111111] border-2 border-[#D4AF37]/40 p-8 rounded-[12px] space-y-4 shadow-[0_8px_30px_rgba(212,175,55,0.1)] hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(212,175,55,0.2)] transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 blur-3xl rounded-full -mr-10 -mt-10" />
              <div className="relative z-10">
                <span className="text-[10px] font-mono font-bold text-[#D4AF37] dark:text-[#D4AF37] uppercase tracking-wider block">
                  Total Fixed Investment
                </span>
                <div className="text-3xl sm:text-4xl font-black bg-gold-text-shine bg-clip-text text-transparent font-mono mt-4">
                  AED {totalInvestment.toLocaleString()}
                </div>
                <p className="text-xs text-text dark:text-slate-300 leading-relaxed font-medium mt-4">
                  Complete end-to-end execution under fixed SLA contract.
                </p>
              </div>
            </div>
          </div>

          {invoice.breakdown && (
            <div className="pt-4 border-t border-border-hairline dark:border-white/10 flex flex-col items-center">
              <button
                onClick={() => setShowItemized(!showItemized)}
                className="text-xs font-bold text-brandGold-800 dark:text-brandGold-400 hover:text-brandGold-900 dark:hover:text-brandGold-300 flex items-center gap-2 cursor-pointer py-2 transition-colors"
              >
                <Receipt className="w-4 h-4" />
                <span>{showItemized ? 'Hide Itemized Line Items' : 'View Full Itemized Line Item Breakdown'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showItemized ? 'rotate-180' : ''}`} />
              </button>

              {showItemized && (
                <div className="w-full max-w-3xl mt-4 bg-surface dark:bg-[#050505] border border-border-hairline dark:border-white/10 rounded-[10px] p-6 space-y-3 text-xs">
                  <div className="font-bold text-text  border-b border-border-hairline dark:border-white/10 pb-2 flex justify-between">
                    <span>Line Item Description</span>
                    <span>Official Tariff</span>
                  </div>
                  {invoice.breakdown.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-text-muted dark:text-text-muted border-b border-border-hairline/60 dark:border-white/5 pb-2 last:border-b-0">
                      <span>{item.item}</span>
                      <span className="font-mono text-text ">AED {item.cost.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// FAQS BLOCK
// ============================================================================
function FaqBlock({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-surface dark:bg-[#050505] border-t border-border-hairline dark:border-white/10">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 bg-dark-gold-gloss text-slate-950 font-bold hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300 shadow-[0_4px_12px_rgba(212,175,55,0.25)]/10 border border-brand-goldBg/30 text-[#D4AF37] text-xs font-semibold rounded-[10px] mb-3 uppercase tracking-wider">
            Regulatory Guidance
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-text  tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="bg-surface/80 dark:bg-[#111111]/80 backdrop-blur-xl border border-border-hairline/50 dark:border-white/10 rounded-[12px] overflow-hidden hover:shadow-[0_10px_30px_rgba(212,175,55,0.05)] transition-all duration-300">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex justify-between items-center gap-4 font-bold text-sm text-text  hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  <span className={isOpen ? 'text-[#D4AF37]' : ''}>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180 text-[#D4AF37]' : 'text-text-muted '}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-text-muted dark:text-text-muted leading-relaxed border-l-2 border-l-brand-goldBg pl-4 ml-5 mb-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// MASTER POLYMORPHIC BLOCK RENDERER
// ============================================================================
export default function BlockRenderer({ serviceData }) {
  if (!serviceData || !serviceData.layout) return null;

  // Retrieve matching legacy database content to populate generic blocks
  const serviceDbData = getServiceBySlug(serviceData.slug);
  
  // Map specific process steps if available
  const mappedSteps = serviceDbData?.process ? serviceDbData.process.map(p => ({
    stepNumber: `0${p.step}`,
    title: p.title,
    desc: p.description,
    iconName: p.step === 1 ? 'ClipboardCheck' : p.step === 2 ? 'BadgeCheck' : p.step === 3 ? 'Stethoscope' : 'Crown'
  })) : undefined;

  return (
    <div className="w-full min-h-screen bg-surface dark:bg-[#050505] text-text  transition-colors duration-300">
      {serviceData.layout.map((blockName, idx) => {
        switch (blockName) {
          // Standard core blocks
          case 'HeroStandard':
            return <HeroStandardBlock key={idx} data={serviceData} />;
          case 'HeroWithStatusChecker':
            return <HeroWithStatusChecker key={idx} data={serviceData} />;
          case 'ThresholdOptionsBento':
            return <ServiceOptionsBlock key={idx} options={serviceData.serviceOptions} />;
          case 'DocumentConcierge':
            return <DocumentConciergeBlock key={idx} documents={serviceData.documents} />;
          case 'FeeInvoice':
            return <FeeInvoiceBlock key={idx} invoice={serviceData.invoice} />;
          case 'ProcessTimeline':
            return <ProcessTimeline key={idx} title="SLA Step-by-Step Application Process" subtitle="Experience our concierge workflow." steps={mappedSteps} />;
          case 'FAQ':
            return <FaqBlock key={idx} faqs={serviceData.faqs} />;

          // Bespoke 17 Service Page Widgets
          case 'DLDValuationCalculator':
            return <DLDValuationCalculator key={idx} />;
          case 'InvestmentBentoGrid':
            return <InvestmentBentoGrid key={idx} />;
          case 'DeedDocumentTabs':
            return <DeedDocumentTabs key={idx} />;
          case 'FamilyQuotaCalculator':
            return <FamilyQuotaCalculator key={idx} />;
          case 'SalaryWarningAlert':
            return <SalaryWarningAlert key={idx} />;
          case 'SponsorVsDependentTabs':
            return <SponsorVsDependentTabs key={idx} />;
          case 'CategoryTrackSelector':
            return <CategoryTrackSelector key={idx} />;
          case 'PrivilegeMatrix':
            return <PrivilegeMatrix key={idx} />;
          case 'GracePeriodCountdown':
            return <GracePeriodCountdown key={idx} />;
          case 'ZeroContactWorkflow':
            return <ZeroContactWorkflow key={idx} />;
          case 'DomesticSalaryGate':
            return <DomesticSalaryGate key={idx} />;
          case 'LocationToggleWidget':
            return <LocationToggleWidget key={idx} />;
          case 'EIDServiceTabs':
            return <EIDServiceTabs key={idx} />;
          case 'BiometricExemptionGuide':
            return <BiometricExemptionGuide key={idx} />;
          case 'CorporateOnboardingForm':
            return <CorporateOnboardingForm key={idx} />;
          case 'JurisdictionDashboard':
            return <JurisdictionDashboard key={idx} />;
          case 'AppTrackerWidget':
            return <AppTrackerWidget key={idx} />;
          case 'DigitalVsPhysicalSplit':
            return <DigitalVsPhysicalSplit key={idx} />;
          case 'GlobalLegalizationPipeline':
            return <GlobalLegalizationPipeline key={idx} />;
          case 'SpeedBentoGrid':
            return <SpeedBentoGrid key={idx} />;
          case 'InstantWordEstimator':
            return <InstantWordEstimator key={idx} />;
          case 'LanguagePairGrid':
            return <LanguagePairGrid key={idx} />;
          case 'RemoteVideoWorkflow':
            return <RemoteVideoWorkflow key={idx} />;
          case 'POAScopeSelector':
            return <POAScopeSelector key={idx} />;
          case 'JurisdictionBento':
            return <JurisdictionBento key={idx} />;
          case 'AssetProtectionModules':
            return <AssetProtectionModules key={idx} />;
          case 'DLDTransferCalculator':
            return <DLDTransferCalculator key={idx} />;
          case 'TransactionTypeGrid':
            return <TransactionTypeGrid key={idx} />;
          case 'EquityUnlockExplainer':
            return <EquityUnlockExplainer key={idx} />;
          case 'PassportLookupForm':
            return <PassportLookupForm key={idx} />;
          case 'OverstayFineCalculator':
            return <OverstayFineCalculator key={idx} />;
          case 'VIPTierPricing':
            return <VIPTierPricing key={idx} />;
          case 'LoungeExperienceGallery':
            return <LoungeExperienceGallery key={idx} />;
          case 'DeadlineWarningBanner':
            return <DeadlineWarningBanner key={idx} />;
          case 'SalaryTierSelector':
            return <SalaryTierSelector key={idx} />;
          case 'SalaryRequirementNotice':
            return <SalaryRequirementNotice key={idx} />;
          case 'FinesWarningBanner':
            return <FinesWarningBanner key={idx} />;
          case 'OverstayCountdownWidget':
            return <OverstayCountdownWidget key={idx} />;

          default:
            return null;
        }
      })}
    </div>
  );
}
