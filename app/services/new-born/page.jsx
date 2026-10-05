'use client';

import React, { useState } from 'react';
import { 
  Baby, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  FileCheck, 
  Home, 
  Truck, 
  MessageSquare, 
  ChevronDown, 
  Receipt 
} from 'lucide-react';

export default function NewbornVisaPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const steps = [
    { num: '1', title: 'Hospital Birth Notification', desc: 'DHA / MOHAP digital notification generated at hospital.' },
    { num: '2', title: 'Ministry Birth Certificate', desc: 'Official Arabic & English birth certificate issued.' },
    { num: '3', title: 'MOFA Legalization', desc: 'Ministry of Foreign Affairs stamp affixed.' },
    { num: '4', title: 'Embassy Passport Issuance', desc: 'Baby passport issued by your embassy in UAE.' },
    { num: '5', title: 'ICP / GDRFA Visa Stamping', desc: 'Residence permit issued & E-ID delivered to your doorstep.' }
  ];

  const faqs = [
    { q: "What happens if our home country embassy delays issuing the baby's passport?", a: "If passport processing takes longer than 120 days due to embassy backlogs, our PRO team can file an official grace period extension request with GDRFA to freeze overstay fine accumulation." },
    { q: "Does a newborn baby need to attend a medical fitness test or biometrics?", a: "No. Newborn infants are completely exempt from medical fitness screenings, blood tests, X-rays, and fingerprint biometrics." },
    { q: "Can a baby be sponsored if the parents hold different visa types?", a: "Yes. The baby is typically sponsored under the father's visa file, provided the father earns at least AED 4,000/month and holds a registered Ejari." }
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-brand-goldBg selection:text-black">
      
      {/* 1. HERO WITH 120-DAY GRACE PERIOD URGENT NOTICE */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 px-6 overflow-hidden border-b border-white/10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-goldBg/10 via-[#050505] to-[#050505]">
        <div className="max-w-7xl mx-auto space-y-10 relative z-10">
          
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-goldBg/10 border border-brand-goldBg/30 text-brand-goldText text-xs font-mono font-bold rounded-[10px] uppercase tracking-wider">
              <Baby className="w-4 h-4 text-brand-goldText" /> URGENT NEWBORN RESIDENCY CONCIERGE
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              Stress-Free UAE Residency For Your Newborn Child
            </h1>
            <p className="text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
              Zero hospital or government visits required. We manage birth notification typing, MOFA attestation, passport registration, and doorstep E-ID delivery.
            </p>
          </div>

          {/* Urgent Countdown Alert Banner Widget */}
          <div className="max-w-4xl mx-auto bg-[#111111] border-2 border-red-500/40 p-6 sm:p-8 rounded-[10px] shadow-2xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-[10px] bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-1 text-left">
                <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-[10px] inline-block uppercase">
                  STRICT 120-DAY DEADLINE
                </span>
                <h3 className="text-xl font-extrabold text-white">120-Day Grace Period Expiry Alert</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The UAE allows a strict <strong>120-day grace period from the date of birth</strong>. Overstay fines of <strong>AED 50 per day</strong> accumulate automatically after 120 days.
                </p>
              </div>
            </div>

            <button
              onClick={() => window.open('https://wa.me/971566556645?text=Hello%20I%20need%20urgent%20help%20with%20a%20newborn%20baby%20visa', '_blank')}
              className="w-full sm:w-auto px-6 py-3.5 bg-red-500 hover:bg-red-600 text-white font-bold text-xs uppercase font-mono rounded-[10px] transition-colors shrink-0 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-500/20"
            >
              <Clock className="w-4 h-4" />
              <span>Fast-Track Filing</span>
            </button>
          </div>

        </div>
      </section>

      {/* 2. HOSPITAL TO PASSPORT CHECKLIST FLOWCHART */}
      <section className="py-24 px-6 bg-[#050505] border-t border-white/10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Hospital to Passport Residency Sequence
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {steps.map((st, idx) => (
              <div key={idx} className="bg-[#111111] border border-white/10 p-5 rounded-[10px] space-y-3 relative text-center">
                <div className="w-8 h-8 rounded-[10px] bg-brand-goldBg/10 border border-brand-goldBg/30 text-brand-goldText font-mono font-bold flex items-center justify-center mx-auto text-xs">
                  {st.num}
                </div>
                <h4 className="text-sm font-bold text-white">{st.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ZERO-CONTACT HOME CONCIERGE WORKFLOW */}
      <section className="py-24 px-6 bg-[#050505] border-t border-white/10">
        <div className="max-w-5xl mx-auto bg-[#111111] border border-brand-goldBg/30 p-8 rounded-[10px] shadow-2xl grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="bg-brand-goldBg/20 text-brand-goldText border border-brand-goldBg/40 text-[10px] font-mono font-bold px-2.5 py-1 rounded-[10px] uppercase">
              ZERO HOSPITAL OR AMER VISITS
            </span>
            <h3 className="text-2xl font-black text-white">100% Home Delivery Concierge</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Newborn infants do NOT undergo medical fitness tests or biometrics fingerprinting. Our executive courier collects original documents directly from your home and returns the completed Emirates ID in 5-7 working days.
            </p>
          </div>

          <div className="space-y-3 bg-[#050505] p-6 border border-white/10 rounded-[10px]">
            <div className="flex items-center gap-3 text-xs text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Medical Screening Exempt</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Fingerprint Biometrics Exempt</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Doorstep Document Pickup & Courier</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GOVERNMENT & TYPING FEE TABLE */}
      <section className="py-24 px-6 bg-[#050505] border-t border-white/10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-black text-white">Itemized Government Tariff Table</h2>
          </div>

          <div className="bg-[#111111] border border-white/10 rounded-[10px] p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between text-xs font-mono font-bold text-slate-400 border-b border-white/10 pb-2">
              <span>Government Component</span>
              <span>Official Tariff</span>
            </div>
            <div className="flex justify-between text-xs text-slate-300">
              <span>MOHAP / DHA Official Birth Certificate</span>
              <span className="font-mono text-white">AED 450</span>
            </div>
            <div className="flex justify-between text-xs text-slate-300">
              <span>MOFA Legalization Stamp Sticker</span>
              <span className="font-mono text-white">AED 150</span>
            </div>
            <div className="flex justify-between text-xs text-slate-300">
              <span>GDRFA Entry Permit & 2-Year Visa Stamping</span>
              <span className="font-mono text-white">AED 1,150</span>
            </div>
            <div className="flex justify-between text-xs text-slate-300">
              <span>Emirates ID Typing & Issuance Card</span>
              <span className="font-mono text-white">AED 700</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-brand-goldText border-t border-white/10 pt-3">
              <span>Total Statutory Govt Charges:</span>
              <span className="font-mono font-black">AED 2,450</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. URGENT NEWBORN FAQ */}
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
