'use client';

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  ArrowRight, 
  MessageSquare, 
  ChevronDown, 
  Zap, 
  CreditCard, 
  Award, 
  HelpCircle,
  Sparkles,
  Lock,
  BadgeCheck
} from 'lucide-react';
import ProcessTimeline from '../../components/ProcessTimeline';

export default function IloeInsurancePage() {
  const [emiratesId, setEmiratesId] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [salaryBracket, setSalaryBracket] = useState('below16k');
  const [policyPeriod, setPolicyPeriod] = useState('2year');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const text = encodeURIComponent(
      `Instant ILOE Policy Request:\nEmirates ID: ${emiratesId}\nMobile: ${mobileNumber}\nSalary Bracket: ${salaryBracket === 'below16k' ? 'AED 16,000 or below' : 'Above AED 16,000'}\nPeriod: ${policyPeriod === '1year' ? '1 Year' : '2 Years'}`
    );
    window.open(`https://wa.me/971566556645?text=${text}`, '_blank');
  };

  const faqs = [
    { 
      q: "Do business investors, partners, and shareholders need ILOE insurance?", 
      a: "No. Company investors, sole shareholders, partners owning business equity, domestic workers, temporary contract workers, and minors under 18 are officially exempt from mandatory ILOE registration." 
    },
    { 
      q: "Are freezone employees legally required to register for ILOE insurance?", 
      a: "Yes. Federal Decree-Law No. 13 of 2022 mandates that ALL employees in the UAE—across both mainland DET and all freezone jurisdictions (DMCC, DDA, DIFC, JAFZA, RAKEZ, etc.)—must be registered." 
    },
    { 
      q: "What are the penalties for non-compliance or delayed ILOE premium payments?", 
      a: "Failure to register results in an automatic MOHRE fine of AED 400. Failure to pay insurance premiums on time incurs an additional AED 200 fine. Unpaid fines block MOHRE work permit issuance and visa renewals." 
    },
    { 
      q: "How to appeal an ILOE fine or clear work permit restrictions?", 
      a: "If a fine was issued in error (e.g. during investor status change or visa grace period), our government liaison team files an official MOHRE exemption appeal along with supporting trade license or cancellation documents." 
    }
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-brand-goldBg selection:text-black">
      
      {/* 1. HERO & FINE WARNING BANNER */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 px-6 overflow-hidden border-b border-white/10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-[#050505] to-[#050505]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          <div className="lg:col-span-7 space-y-6">
            
            {/* Fine Warning Alert Banner */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-amber-500/10 border border-amber-500/40 text-amber-400 text-xs font-mono font-bold rounded-[10px] uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>MANDATORY LAW: AED 400 FINE FOR UNREGISTERED EMPLOYEES</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              Mandatory UAE Involuntary Loss of Employment (ILOE) Insurance
            </h1>

            <p className="text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              Avoid AED 400 penalties and non-renewal of work permits. We register and issue your official insurance policy certificate instantly.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
              {[
                "Instant Policy Generation",
                "MOHRE & Freezone Compliant",
                "Fine Blocking Relief"
              ].map((b, i) => (
                <div key={i} className="bg-[#111111] border border-white/10 p-4 rounded-[10px] flex items-center justify-center gap-2.5 shadow-md">
                  <CheckCircle2 className="w-4 h-4 text-brand-goldText shrink-0" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Registration Form */}
          <div className="lg:col-span-5">
            <div className="bg-[#111111] backdrop-blur-md border border-brand-goldBg/30 p-6 sm:p-8 rounded-[10px] shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#B8860B] via-[#F3E5AB] to-[#D4AF37]" />

              <div className="border-b border-white/10 pb-4">
                <span className="bg-brand-goldBg/20 text-brand-goldText border border-brand-goldBg/40 text-[10px] font-mono font-bold px-2.5 py-1 rounded-[10px] inline-block uppercase tracking-wider mb-2">
                  INSTANT REGISTRATION PORTAL
                </span>
                <h3 className="text-xl font-extrabold text-white">Generate ILOE Certificate</h3>
                <p className="text-xs text-slate-400 mt-1">Instant registration without complex paperwork.</p>
              </div>

              {submitted ? (
                <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-[10px] text-center space-y-3">
                  <BadgeCheck className="w-12 h-12 text-emerald-400 mx-auto" />
                  <div className="text-sm font-bold text-white">ILOE Order Initialized!</div>
                  <p className="text-xs text-slate-300">Your policy details have been routed to WhatsApp. You will receive your official ILOE certificate PDF in 5 minutes.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase font-mono">
                      Emirates ID Number
                    </label>
                    <input
                      type="text"
                      required
                      value={emiratesId}
                      onChange={(e) => setEmiratesId(e.target.value)}
                      placeholder="784-1990-1234567-1"
                      className="w-full bg-[#050505] border border-white/10 rounded-[10px] px-4 py-3 text-white text-xs font-mono focus:border-brand-goldBg focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase font-mono">
                      Mobile Number (UAE)
                    </label>
                    <input
                      type="tel"
                      required
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="+971 50 123 4567"
                      className="w-full bg-[#050505] border border-white/10 rounded-[10px] px-4 py-3 text-white text-xs font-mono focus:border-brand-goldBg focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase font-mono">
                      Basic Salary Category
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setSalaryBracket('below16k')}
                        className={`p-3 text-xs font-bold rounded-[10px] border transition-all text-left ${
                          salaryBracket === 'below16k' 
                            ? 'bg-brand-goldBg text-black border-brand-goldBg font-black' 
                            : 'bg-[#050505] border-white/10 text-slate-400'
                        }`}
                      >
                        <div>Category A</div>
                        <div className="text-[10px] font-normal opacity-90">AED 16,000 or below</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSalaryBracket('above16k')}
                        className={`p-3 text-xs font-bold rounded-[10px] border transition-all text-left ${
                          salaryBracket === 'above16k' 
                            ? 'bg-brand-goldBg text-black border-brand-goldBg font-black' 
                            : 'bg-[#050505] border-white/10 text-slate-400'
                        }`}
                      >
                        <div>Category B</div>
                        <div className="text-[10px] font-normal opacity-90">Above AED 16,000</div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase font-mono">
                      Policy Duration
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPolicyPeriod('1year')}
                        className={`p-2.5 text-xs font-bold rounded-[10px] border text-center transition-all ${
                          policyPeriod === '1year' ? 'bg-brand-goldBg text-black border-brand-goldBg' : 'bg-[#050505] border-white/10 text-slate-400'
                        }`}
                      >
                        1 Year Policy
                      </button>
                      <button
                        type="button"
                        onClick={() => setPolicyPeriod('2year')}
                        className={`p-2.5 text-xs font-bold rounded-[10px] border text-center transition-all ${
                          policyPeriod === '2year' ? 'bg-brand-goldBg text-black border-brand-goldBg' : 'bg-[#050505] border-white/10 text-slate-400'
                        }`}
                      >
                        2 Year Policy (Recommended)
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-brand-goldBg text-black font-extrabold rounded-[10px] shadow-[0_0_20px_rgba(212,175,55,0.3)] text-xs uppercase font-mono tracking-wider cursor-pointer hover:bg-brand-goldText transition-all flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4 fill-current" />
                    <span>Issue Instant ILOE Policy</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* 2. SALARY TIER OPTIONS BENTO GRID */}
      <section className="py-24 px-6 bg-[#050505] border-t border-white/10">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 bg-brand-goldBg/10 border border-brand-goldBg/30 text-brand-goldText text-xs font-mono font-bold rounded-[10px] uppercase tracking-wider">
              Official Government Tiers
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Official ILOE Salary Tiers & Compensation Limits
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Federal law categorizes all workers based on basic salary declared on the MOHRE / Freezone employment contract.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Tier 1 */}
            <div className="bg-[#111111] border border-white/10 p-6 sm:p-8 rounded-[10px] space-y-6 hover:border-brand-goldBg/40 transition-all relative">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono font-bold text-brand-goldText uppercase tracking-wider">CATEGORY A TIER</span>
                  <h3 className="text-2xl font-black text-white mt-1">Basic Salary ≤ AED 16,000</h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-brand-goldText font-mono">AED 5<span className="text-xs font-normal text-slate-400">/month</span></div>
                  <div className="text-[10px] text-slate-400 font-mono">AED 60 Annually + VAT</div>
                </div>
              </div>

              <div className="p-4 bg-[#050505] border border-white/10 rounded-[10px] space-y-2">
                <div className="text-xs font-bold text-white">Maximum Monthly Compensation:</div>
                <div className="text-xl font-black text-emerald-400 font-mono">Up to AED 10,000 / Month</div>
                <p className="text-[11px] text-slate-400">Payout: 60% of average basic salary for max 3 consecutive months per claim.</p>
              </div>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand-goldText" /> Mandatory for basic salaries up to AED 16,000</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand-goldText" /> Instant digital policy issuance & PDF delivery</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand-goldText" /> Fulfills MOHRE work permit renewal requirements</li>
              </ul>
            </div>

            {/* Tier 2 */}
            <div className="bg-[#111111] border border-brand-goldBg/40 p-6 sm:p-8 rounded-[10px] space-y-6 hover:border-brand-goldBg transition-all relative shadow-[0_0_30px_rgba(212,175,55,0.1)]">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono font-bold text-brand-goldText uppercase tracking-wider">CATEGORY B TIER</span>
                  <h3 className="text-2xl font-black text-white mt-1">Basic Salary &gt; AED 16,000</h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-brand-goldText font-mono">AED 10<span className="text-xs font-normal text-slate-400">/month</span></div>
                  <div className="text-[10px] text-slate-400 font-mono">AED 120 Annually + VAT</div>
                </div>
              </div>

              <div className="p-4 bg-[#050505] border border-brand-goldBg/30 rounded-[10px] space-y-2">
                <div className="text-xs font-bold text-white">Maximum Monthly Compensation:</div>
                <div className="text-xl font-black text-emerald-400 font-mono">Up to AED 20,000 / Month</div>
                <p className="text-[11px] text-slate-400">Payout: 60% of average basic salary for max 3 consecutive months per claim.</p>
              </div>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand-goldText" /> Mandatory for basic salaries exceeding AED 16,000</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand-goldText" /> High coverage payout for corporate executives & senior professionals</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand-goldText" /> Fully protects against MOHRE penalty imposition</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 3. CLAIM ELIGIBILITY REQUIREMENTS */}
      <section className="py-24 px-6 bg-[#050505] border-t border-white/10">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 bg-brand-goldBg/10 border border-brand-goldBg/30 text-brand-goldText text-xs font-mono font-bold rounded-[10px] uppercase tracking-wider">
              Legal Claim Framework
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              ILOE Compensation Claim Eligibility Requirements
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Understand the 3 core legal conditions required to receive monthly cash compensation in case of job loss.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-[#111111] border border-white/10 p-6 rounded-[10px] space-y-4 hover:border-brand-goldBg/40 transition-all">
              <div className="w-12 h-12 rounded-[10px] bg-brand-goldBg/10 border border-brand-goldBg/30 flex items-center justify-center text-brand-goldText font-mono font-bold text-lg">
                01
              </div>
              <h3 className="text-lg font-bold text-white">12-Month Consecutive Subscription</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                The employee must have been actively subscribed to the ILOE policy for at least 12 uninterrupted consecutive months without payment breaks prior to job termination.
              </p>
            </div>

            <div className="bg-[#111111] border border-white/10 p-6 rounded-[10px] space-y-4 hover:border-brand-goldBg/40 transition-all">
              <div className="w-12 h-12 rounded-[10px] bg-brand-goldBg/10 border border-brand-goldBg/30 flex items-center justify-center text-brand-goldText font-mono font-bold text-lg">
                02
              </div>
              <h3 className="text-lg font-bold text-white">Involuntary Non-Disciplinary Termination</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Coverage applies strictly to involuntary loss of employment (redundancy or company restructuring). Resignation or termination under Article 44 (disciplinary grounds) is excluded.
              </p>
            </div>

            <div className="bg-[#111111] border border-white/10 p-6 rounded-[10px] space-y-4 hover:border-brand-goldBg/40 transition-all">
              <div className="w-12 h-12 rounded-[10px] bg-brand-goldBg/10 border border-brand-goldBg/30 flex items-center justify-center text-brand-goldText font-mono font-bold text-lg">
                03
              </div>
              <h3 className="text-lg font-bold text-white">30-Day Filing & Legal UAE Residence</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Claims must be formally submitted within 30 days from employment termination date. The applicant must maintain legal residency in the UAE during the claim payout period.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. INSTANT CERTIFICATE DELIVERY WORKFLOW */}
      <ProcessTimeline
        title="3-Step Instant ILOE Certificate Workflow"
        subtitle="Emirates ID Submission -> Premium Gateway Payment -> Instant Policy Delivery via WhatsApp."
      />

      {/* 5. ILOE FAQ ACCORDION */}
      <section className="py-24 px-6 bg-[#050505] border-t border-white/10">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl font-black text-white text-center">
            Frequently Asked ILOE Questions
          </h2>
          
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-[#111111] border border-white/10 rounded-[10px] overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex justify-between items-center font-bold text-sm text-white hover:text-brand-goldText transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === idx ? 'rotate-180 text-brand-goldText' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-l-2 border-l-brand-goldBg pl-4 ml-5 mb-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
