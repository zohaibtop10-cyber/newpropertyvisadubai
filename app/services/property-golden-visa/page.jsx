'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Building2, 
  FileCheck, 
  ArrowRight, 
  MessageSquare, 
  PhoneCall, 
  ChevronDown, 
  Download, 
  CheckSquare, 
  Square, 
  Receipt,
  Sparkles,
  BadgeCheck,
  Building,
  KeyRound
} from 'lucide-react';
import { motion } from 'framer-motion';
import ProcessTimeline from '../../components/ProcessTimeline';

export default function PropertyGoldenVisaPage() {
  const [propertyType, setPropertyType] = useState('ready');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [docTab, setDocTab] = useState('single');
  const [checkedDocs, setCheckedDocs] = useState({});
  const [openFaq, setOpenFaq] = useState(null);
  const [showInvoiceBreakdown, setShowInvoiceBreakdown] = useState(false);

  const toggleDoc = (doc) => {
    setCheckedDocs(prev => ({ ...prev, [doc]: !prev[doc] }));
  };

  const docData = {
    single: [
      'DLD Title Deed or Developer Oqood (Min. AED 2,000,000 value)',
      'Passport Scan (> 6 months validity for all applicants)',
      'UAE Residence Visa copy or Visit Visa Entry Stamp',
      'Good Conduct Certificate issued by Dubai Police'
    ],
    joint: [
      'Joint DLD Title Deed (Husband & Wife total >= AED 2,000,000)',
      'MOFA Attested Marriage Certificate + Sworn Arabic Translation',
      'Passport Scans for both Spouse applicants',
      'Emirates ID Scans (If currently UAE residents)'
    ],
    mortgaged: [
      'DLD Title Deed specifying total property value >= AED 2M',
      'Official Bank NOC Letter stating paid equity >= AED 2,000,000',
      'Stamped Bank Mortgage Payment Statement',
      'Developer Off-Plan Oqood Registration (If under-construction)'
    ]
  };

  const handleAuditSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const msg = encodeURIComponent(
      `Property Golden Visa Audit Request:\nName: ${fullName}\nPhone: ${phone}\nProperty Type: ${propertyType}`
    );
    window.open(`https://wa.me/971566556645?text=${msg}`, '_blank');
  };

  const faqs = [
    { q: "Can I combine multiple properties to reach the AED 2 Million Golden Visa threshold?", a: "Yes! The Dubai Land Department allows you to aggregate the purchase value of up to 3 properties under your name to meet or exceed the AED 2,000,000 threshold for the 10-Year Golden Visa." },
    { q: "Is mortgaged real estate eligible for the Property Golden Visa?", a: "Yes. If your property is mortgaged, you qualify provided the paid equity portion equals or exceeds AED 2 Million, supported by an official NOC letter issued by your mortgage bank." },
    { q: "Can off-plan properties qualify for the Golden Visa?", a: "Yes. Off-plan properties valued at AED 2 Million or higher qualify provided they are purchased from DLD-approved master developers (such as Emaar, Nakheel, or Damac) and have an active Oqood registration with 50%+ paid." },
    { q: "Do I need to live in Dubai to keep my Property Golden Visa active?", a: "No. Unlike standard residency visas that expire if you stay outside the UAE for more than 6 months, 10-Year Golden Visa holders can stay outside the UAE indefinitely without losing residency status." }
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-brand-goldBg selection:text-black">
      
      {/* 1. HERO WITH DLD VALUATION CHECKER */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 px-6 overflow-hidden border-b border-white/10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-goldBg/10 via-[#050505] to-[#050505]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block px-3.5 py-1.5 bg-brand-goldBg/10 border border-brand-goldBg/30 text-brand-goldText text-xs font-mono font-bold rounded-[10px] uppercase tracking-wider">
              DUBAI LAND DEPARTMENT & ICP VIP CONCIERGE
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              Secure Your 10-Year UAE Golden Visa Through Real Estate Investment
            </h1>
            <p className="text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              Zero mortgages needed, combined property values allowed, and 100% online file processing through DLD Cube & ICP.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
              {[
                "100% SLA Guarantee",
                "Combined Title Deeds",
                "Indefinite Stay Privileges"
              ].map((b, i) => (
                <div key={i} className="bg-[#111111] border border-white/10 p-4 rounded-[10px] flex items-center justify-center gap-2.5 shadow-md">
                  <CheckCircle2 className="w-4 h-4 text-brand-goldText shrink-0" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive DLD Threshold Form */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="bg-[#111111] backdrop-blur-md border border-brand-goldBg/30 p-6 sm:p-8 rounded-[10px] shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#B8860B] via-[#F3E5AB] to-[#D4AF37]" />

              <div className="border-b border-white/10 pb-4">
                <span className="bg-brand-goldBg/20 text-brand-goldText border border-brand-goldBg/40 text-[10px] font-mono font-bold px-2.5 py-1 rounded-[10px] inline-block uppercase tracking-wider mb-2">
                  DLD TITLE DEED AUDIT
                </span>
                <h3 className="text-xl font-extrabold text-white">Check Title Deed Eligibility</h3>
                <p className="text-xs text-text-muted mt-1">Select your property category for instant evaluation.</p>
              </div>

              {submitted ? (
                <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-[10px] text-center space-y-2">
                  <BadgeCheck className="w-10 h-10 text-emerald-400 mx-auto" />
                  <div className="text-sm font-bold text-white">Title Deed Audit Submitted!</div>
                  <p className="text-xs text-slate-300">A Senior DLD Golden Visa Specialist will message you on WhatsApp within 10 minutes.</p>
                </div>
              ) : (
                <form onSubmit={handleAuditSubmit} className="space-y-4 text-sm">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase font-mono">Property Status</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPropertyType('ready')}
                        className={`p-3 text-xs font-bold rounded-[10px] border transition-all ${
                          propertyType === 'ready' 
                            ? 'bg-brand-goldBg text-black border-brand-goldBg font-black' 
                            : 'bg-[#050505] border-white/10 text-text-muted'
                        }`}
                      >
                        Ready Property
                        <span className="block text-[10px] font-normal opacity-80 mt-0.5">AED 2M+ Title Deed</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPropertyType('mortgaged')}
                        className={`p-3 text-xs font-bold rounded-[10px] border transition-all ${
                          propertyType === 'mortgaged' 
                            ? 'bg-brand-goldBg text-black border-brand-goldBg font-black' 
                            : 'bg-[#050505] border-white/10 text-text-muted'
                        }`}
                      >
                        Mortgaged / Off-Plan
                        <span className="block text-[10px] font-normal opacity-80 mt-0.5">AED 2M+ Equity / Oqood</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase font-mono">Full Legal Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Alexander Wright"
                      className="w-full bg-[#050505] border border-white/10 rounded-[10px] px-4 py-3 text-white text-xs focus:border-brand-goldBg focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase font-mono">WhatsApp Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+971 50 123 4567"
                      className="w-full bg-[#050505] border border-white/10 rounded-[10px] px-4 py-3 text-white text-xs font-mono focus:border-brand-goldBg focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-brand-goldBg text-black font-extrabold rounded-[10px] shadow-[0_0_20px_rgba(212,175,55,0.3)] text-xs uppercase font-mono tracking-wider cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Check Title Deed Eligibility</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* 2. COMPARATIVE INVESTMENT BENTO GRID */}
      <section className="py-24 px-6 bg-[#050505] border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 bg-brand-goldBg/10 border border-brand-goldBg/30 text-brand-goldText text-xs font-semibold rounded-[10px] mb-3 uppercase tracking-wider">
              Real Estate Qualification Framework
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Comparative Investment Bento Grid
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-[#111111] border border-white/10 rounded-[10px] p-6 lg:p-8 hover:border-brand-goldBg/40 transition-all space-y-6 shadow-xl relative overflow-hidden group">
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-text-muted uppercase tracking-wider block mb-1">
                    Minimum Purchase Value
                  </span>
                  <div className="text-3xl font-black text-brand-goldText font-mono tracking-tight mb-2">
                    AED 2,000,000
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-brand-goldText transition-colors">
                    10-Year Golden Visa
                  </h3>
                </div>
                <span className="bg-[#1a1a1a] border border-white/10 text-slate-300 text-[10px] font-mono font-bold px-3 py-1 rounded-[10px]">
                  FLAGSHIP
                </span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-goldText shrink-0 mt-0.5" />
                  <span>Aggregate up to 3 residential properties under your name</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-goldText shrink-0 mt-0.5" />
                  <span>Zero stay limits (stay outside UAE indefinitely)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-goldText shrink-0 mt-0.5" />
                  <span>Sponsor spouse, children (no age limit for sons), & domestic staff</span>
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-[#111111] border border-white/10 rounded-[10px] p-6 lg:p-8 hover:border-brand-goldBg/40 transition-all space-y-6 shadow-xl relative overflow-hidden group">
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-text-muted uppercase tracking-wider block mb-1">
                    Entry Level Property
                  </span>
                  <div className="text-3xl font-black text-brand-goldText font-mono tracking-tight mb-2">
                    AED 750,000
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-brand-goldText transition-colors">
                    2-Year Investor Visa
                  </h3>
                </div>
                <span className="bg-[#1a1a1a] border border-white/10 text-slate-300 text-[10px] font-mono font-bold px-3 py-1 rounded-[10px]">
                  ENTRY TRACK
                </span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-goldText shrink-0 mt-0.5" />
                  <span>Requires completed residential unit with DLD Title Deed</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-goldText shrink-0 mt-0.5" />
                  <span>Mortgaged units accepted with bank NOC letter</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-goldText shrink-0 mt-0.5" />
                  <span>Renewable every 2 years as long as property is retained</span>
                </li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-[#111111] border border-white/10 rounded-[10px] p-6 lg:p-8 hover:border-brand-goldBg/40 transition-all space-y-6 shadow-xl relative overflow-hidden group">
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-text-muted uppercase tracking-wider block mb-1">
                    Off-Plan Developer Track
                  </span>
                  <div className="text-3xl font-black text-brand-goldText font-mono tracking-tight mb-2">
                    AED 2M Oqood
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-brand-goldText transition-colors">
                    Off-Plan Golden Visa
                  </h3>
                </div>
                <span className="bg-[#1a1a1a] border border-white/10 text-slate-300 text-[10px] font-mono font-bold px-3 py-1 rounded-[10px]">
                  UNDER-CONST.
                </span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-goldText shrink-0 mt-0.5" />
                  <span>Off-plan properties from DLD-approved master developers</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-goldText shrink-0 mt-0.5" />
                  <span>Requires developer statement of 50%+ construction or AED 2M paid</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-goldText shrink-0 mt-0.5" />
                  <span>Full 10-year residency self-sponsored privileges</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TITLE DEED VERIFICATION CONCIERGE */}
      <section className="py-24 px-6 bg-[#050505] border-t border-white/10">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 bg-brand-goldBg/10 border border-brand-goldBg/30 text-brand-goldText text-xs font-semibold rounded-[10px] mb-3 uppercase tracking-wider">
              Document Audit
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Title Deed Verification Concierge
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 bg-[#111111] p-2 rounded-[10px] border border-white/10 max-w-2xl mx-auto">
            {[
              { id: 'single', label: 'Single Owner' },
              { id: 'joint', label: 'Joint Spouse' },
              { id: 'mortgaged', label: 'Mortgaged Unit' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setDocTab(tab.id)}
                className={`flex-1 py-3 px-4 rounded-[10px] text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  docTab === tab.id
                    ? 'bg-brand-goldBg text-black font-black'
                    : 'text-text-muted hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-[#111111] border border-white/10 p-6 sm:p-8 rounded-[10px] space-y-4 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {docData[docTab].map((doc, idx) => {
                const isChecked = !!checkedDocs[doc];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleDoc(doc)}
                    className={`flex items-center gap-3.5 p-4 rounded-[10px] border transition-all cursor-pointer ${
                      isChecked 
                        ? 'bg-brand-goldBg/10 border-brand-goldBg/40 text-white' 
                        : 'bg-[#050505] border-white/10 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-brand-goldText shrink-0" />
                    ) : (
                      <Square className="w-5 h-5 text-text-muted shrink-0" />
                    )}
                    <span className={`text-xs font-semibold ${isChecked ? 'line-through text-text-muted' : ''}`}>
                      {doc}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. TRANSPARENT FEE BREAKDOWN INVOICE */}
      <section className="py-24 px-6 bg-[#050505] border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 bg-brand-goldBg/10 border border-brand-goldBg/30 text-brand-goldText text-xs font-semibold rounded-[10px] mb-3 uppercase tracking-wider">
              Unbundled Tariff Policy
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Transparent Fee Breakdown Invoice
            </h2>
          </div>

          <div className="bg-[#111111] border border-white/10 rounded-[10px] p-6 lg:p-8 space-y-8 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#050505] border border-white/10 p-6 rounded-[10px] space-y-3">
                <span className="text-xs font-mono font-bold text-text-muted uppercase block">1. DLD Cube Nomination</span>
                <div className="text-3xl font-black text-white font-mono">AED 4,020</div>
                <p className="text-xs text-text-muted">Official Dubai Land Department nomination filing tariff.</p>
              </div>

              <div className="bg-[#050505] border border-white/10 p-6 rounded-[10px] space-y-3">
                <span className="text-xs font-mono font-bold text-text-muted uppercase block">2. VIP Medical & EID</span>
                <div className="text-3xl font-black text-white font-mono">AED 1,880</div>
                <p className="text-xs text-text-muted">Smart Salem VIP 30-min medical & 10-year EID typing.</p>
              </div>

              <div className="bg-brand-goldBg/5 border border-brand-goldBg/40 p-6 rounded-[10px] space-y-3 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                <span className="text-xs font-mono font-bold text-brand-goldText uppercase block">Total All-Inclusive Investment</span>
                <div className="text-3xl sm:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#B8860B] via-[#F3E5AB] to-[#D4AF37] font-mono">
                  AED 8,700
                </div>
                <p className="text-xs text-slate-300">Complete end-to-end concierge retainer included.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 6-STEP STAGGERED WORKFLOW */}
      <ProcessTimeline
        title="6-Step Property Golden Visa Application Process"
        subtitle="Streamlined workflow from initial title deed audit to doorstep Emirates ID delivery."
      />

      {/* 6. PROPERTY SPECIFIC FAQS */}
      <section className="py-24 px-6 bg-[#050505] border-t border-white/10">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-[#111111] border border-white/10 rounded-[10px] overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex justify-between items-center gap-4 font-bold text-sm text-white hover:text-brand-goldText transition-colors cursor-pointer"
                  >
                    <span className={isOpen ? 'text-brand-goldText' : ''}>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180 text-brand-goldText' : 'text-text-muted'}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-l-2 border-l-brand-goldBg pl-4 ml-5 mb-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </main>
  );
}
