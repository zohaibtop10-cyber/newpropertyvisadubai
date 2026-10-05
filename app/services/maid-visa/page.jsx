'use client';

import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  ChevronDown, 
  Building2, 
  Crown, 
  Plane, 
  Home 
} from 'lucide-react';
import ProcessTimeline from '../../components/ProcessTimeline';

export default function MaidVisaPage() {
  const [recruitType, setRecruitType] = useState('in-country');
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { q: "What is the non-relationship affidavit required by MOHRE for domestic workers?", a: "MOHRE regulations state that the domestic worker must not be a first-degree or second-degree relative of the sponsor or spouse." },
    { q: "Is a pregnancy test mandatory during the maid's medical fitness screening?", a: "Yes. Under DHA and MOHRE regulations, female domestic workers undergo mandatory pregnancy testing during their residency medical fitness screening." },
    { q: "Can Golden Visa holders sponsor maids without the AED 25,000 salary proof?", a: "Yes! 10-Year Golden Visa holders are granted special exemption from the standard AED 25,000 monthly salary proof requirement." }
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-brand-goldBg selection:text-black">
      
      {/* 1. HERO & TADBEER DIRECT PARTNER HEADER */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 px-6 overflow-hidden border-b border-white/10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-goldBg/10 via-[#050505] to-[#050505]">
        <div className="max-w-7xl mx-auto space-y-10 relative z-10 text-center">
          
          <div className="max-w-4xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-goldBg/10 border border-brand-goldBg/30 text-brand-goldText text-xs font-mono font-bold rounded-[10px] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-brand-goldText" /> FULL MOHRE DOMESTIC WORKER COMPLIANCE
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              Legal Domestic Helper & Maid Sponsorship Handled End-to-End
            </h1>
            <p className="text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
              Full MOHRE and immigration compliance for private household nannies, housemaids, cooks, and private drivers in Dubai & Abu Dhabi.
            </p>
          </div>

        </div>
      </section>

      {/* 2. SPONSOR ELIGIBILITY & SALARY REQUIREMENT BANNER */}
      <section className="py-12 px-6 bg-[#050505] border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#111111] border border-brand-goldBg/30 p-6 sm:p-8 rounded-[10px] shadow-2xl relative overflow-hidden grid md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-8 space-y-3">
              <span className="inline-block bg-brand-goldBg/20 text-brand-goldText border border-brand-goldBg/40 text-[10px] font-mono font-bold px-2.5 py-1 rounded-[10px] uppercase">
                MOHRE SPONSORSHIP CRITERIA
              </span>
              <h3 className="text-2xl font-black text-white">AED 25,000 Minimum Household Salary Rule</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                To sponsor a domestic worker, housemaid, or nanny in Dubai, MOHRE requires the head of the family to demonstrate a minimum monthly salary of <strong>AED 25,000</strong> and an active <strong>2-bedroom Ejari tenancy agreement</strong>.
              </p>
              
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#050505] border border-brand-goldBg/40 text-brand-goldText text-[11px] font-bold rounded-[10px]">
                <Crown className="w-4 h-4" /> Golden Visa holders are exempt from salary proof audits.
              </div>
            </div>

            <div className="md:col-span-4 bg-[#050505] border border-white/10 p-5 rounded-[10px] text-center space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Minimum Income Threshold</span>
              <div className="text-3xl font-black text-brand-goldText font-mono">AED 25,000</div>
              <p className="text-[11px] text-slate-400">Monthly Household Salary</p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. IN-COUNTRY VS OVERSEAS RECRUITMENT SELECTOR */}
      <section className="py-24 px-6 bg-[#050505] border-t border-white/10">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Recruitment & Entry Track Selector
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 bg-[#111111] p-2 rounded-[10px] border border-white/10 max-w-2xl mx-auto">
            <button
              onClick={() => setRecruitType('in-country')}
              className={`flex-1 py-3 px-4 rounded-[10px] text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                recruitType === 'in-country' ? 'bg-brand-goldBg text-black font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Home className="w-4 h-4" /> Hiring In-Country (Already in UAE)
            </button>
            <button
              onClick={() => setRecruitType('overseas')}
              className={`flex-1 py-3 px-4 rounded-[10px] text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                recruitType === 'overseas' ? 'bg-brand-goldBg text-black font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Plane className="w-4 h-4" /> Direct Overseas Recruitment
            </button>
          </div>

          <div className="bg-[#111111] border border-white/10 p-6 sm:p-8 rounded-[10px] space-y-4 shadow-2xl">
            {recruitType === 'in-country' ? (
              <div className="space-y-3 text-xs text-slate-300">
                <div className="font-bold text-white text-sm mb-2">In-Country Domestic Worker Track:</div>
                <div className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand-goldText" /> Domestic helper remains in employer household during processing</div>
                <div className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand-goldText" /> Includes in-country Status Change so no flight out is needed</div>
                <div className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand-goldText" /> Escalated overstay fine clearance & cancellation verification</div>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-slate-300">
                <div className="font-bold text-white text-sm mb-2">Direct Overseas Recruitment Track:</div>
                <div className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand-goldText" /> Electronic MOHRE entry permit issued before arrival</div>
                <div className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand-goldText" /> Home country embassy labor contract attestation</div>
                <div className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand-goldText" /> Airport arrival clearance protocol & VIP medical screening within 48h</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. MANDATORY DOMESTIC STAFF PACKAGE BREAKDOWN */}
      <section className="py-24 px-6 bg-[#050505] border-t border-white/10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-black text-white">Itemized Package Tariff Breakdown</h2>
          </div>

          <div className="bg-[#111111] border border-white/10 rounded-[10px] p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between text-xs font-mono font-bold text-slate-400 border-b border-white/10 pb-2">
              <span>Service Component</span>
              <span>Official Tariff</span>
            </div>
            <div className="flex justify-between text-xs text-slate-300">
              <span>MOHRE Domestic Maid Filing & Entry Permit</span>
              <span className="font-mono text-white">AED 1,450</span>
            </div>
            <div className="flex justify-between text-xs text-slate-300">
              <span>VIP Medical Fitness Screening & Pregnancy Test</span>
              <span className="font-mono text-white">AED 850</span>
            </div>
            <div className="flex justify-between text-xs text-slate-300">
              <span>Emirates ID Typing (1-Year Validity)</span>
              <span className="font-mono text-white">AED 370</span>
            </div>
            <div className="flex justify-between text-xs text-slate-300">
              <span>In-Country Status Change & Deposit Clearance</span>
              <span className="font-mono text-white">AED 1,130</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-brand-goldText border-t border-white/10 pt-3">
              <span>Total Fixed SLA Investment:</span>
              <span className="font-mono font-black">AED 5,200</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 4-STEP MAID VISA ROADMAP */}
      <ProcessTimeline
        title="4-Step Domestic Worker Sponsorship Process"
        subtitle="MOHRE Approval -> Status Change -> VIP Medical & Biometrics -> EID Delivery."
      />

      {/* 6. DOMESTIC SPONSORSHIP FAQS */}
      <section className="py-24 px-6 bg-[#050505] border-t border-white/10">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl font-black text-white text-center">Frequently Asked Questions</h2>
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
