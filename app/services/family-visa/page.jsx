'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Heart, 
  CheckCircle2, 
  AlertTriangle, 
  Calculator, 
  ArrowRight, 
  MessageSquare, 
  ChevronDown, 
  Receipt,
  FileCheck,
  ShieldCheck
} from 'lucide-react';

export default function FamilyVisaPage() {
  const [spouse, setSpouse] = useState(true);
  const [sons, setSons] = useState(1);
  const [daughters, setDaughters] = useState(0);
  const [parents, setParents] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  const spouseGov = spouse ? 3850 : 0;
  const sonsGov = sons * 3450;
  const daughtersGov = daughters * 3450;
  const parentsGov = parents * 5200;

  const totalGovFee = spouseGov + sonsGov + daughtersGov + parentsGov;
  const conciergeRetainer = (spouse ? 1450 : 0) + (sons + daughters) * 950 + parents * 1850;
  const grandTotal = totalGovFee + conciergeRetainer;

  const faqs = [
    { q: "Can a mother sponsor her children in Dubai?", a: "Yes. Mothers earning a minimum monthly salary of AED 10,000 (or AED 8,000 + accommodation) can sponsor their children, provided a NOC letter from the father is submitted." },
    { q: "What is the requirement to sponsor parents in Dubai?", a: "To sponsor parents in Dubai, the sponsor must earn a minimum monthly salary of AED 20,000 and hold a 2-bedroom minimum Ejari contract, sponsoring both parents together." },
    { q: "Do children under 18 require a medical fitness test?", a: "No. Children under the age of 18 are exempt from blood tests and X-ray medical fitness screenings." }
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-brand-goldBg selection:text-black">
      
      {/* 1. HERO & FAMILY SIZE CALCULATOR */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 px-6 overflow-hidden border-b border-white/10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-goldBg/10 via-[#050505] to-[#050505]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block px-3.5 py-1.5 bg-brand-goldBg/10 border border-brand-goldBg/30 text-brand-goldText text-xs font-mono font-bold rounded-[10px] uppercase tracking-wider">
              100% GUARANTEED SLA APPROVAL
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              Bring Your Family to Dubai With Guaranteed SLA Approval
            </h1>
            <p className="text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              Complete typing, MOFA document attestation, Ejari compliance check, and VIP escorted medical fitness for spouse, children, and parents.
            </p>
          </div>

          {/* Interactive Quota Calculator Widget */}
          <div className="lg:col-span-5">
            <div className="bg-[#111111] backdrop-blur-md border border-brand-goldBg/30 p-6 sm:p-8 rounded-[10px] shadow-2xl space-y-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#B8860B] via-[#F3E5AB] to-[#D4AF37]" />

              <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-brand-goldText uppercase">FAMILY QUOTA CALCULATOR</span>
                  <h3 className="text-lg font-extrabold text-white">Instant Family Filing Quota</h3>
                </div>
                <Calculator className="w-6 h-6 text-brand-goldText" />
              </div>

              <div className="space-y-3 text-xs">
                {/* Spouse Toggle */}
                <div className="flex items-center justify-between p-3 bg-[#050505] border border-white/10 rounded-[10px]">
                  <span className="font-bold text-white">Sponsor Spouse (Wife / Husband)</span>
                  <button
                    type="button"
                    onClick={() => setSpouse(!spouse)}
                    className={`px-3 py-1 rounded-[10px] font-bold text-[10px] uppercase transition-all cursor-pointer ${
                      spouse ? 'bg-brand-goldBg text-black' : 'bg-[#1a1a1a] text-text-muted'
                    }`}
                  >
                    {spouse ? 'Included' : 'Exclude'}
                  </button>
                </div>

                {/* Sons Counter */}
                <div className="flex items-center justify-between p-3 bg-[#050505] border border-white/10 rounded-[10px]">
                  <span className="font-bold text-white">Sons (Under 25 Years)</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setSons(Math.max(0, sons - 1))} className="w-6 h-6 bg-[#1a1a1a] rounded-[10px] text-white font-bold">-</button>
                    <span className="font-mono text-white font-bold w-4 text-center">{sons}</span>
                    <button onClick={() => setSons(sons + 1)} className="w-6 h-6 bg-[#1a1a1a] rounded-[10px] text-white font-bold">+</button>
                  </div>
                </div>

                {/* Daughters Counter */}
                <div className="flex items-center justify-between p-3 bg-[#050505] border border-white/10 rounded-[10px]">
                  <span className="font-bold text-white">Unmarried Daughters</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setDaughters(Math.max(0, daughters - 1))} className="w-6 h-6 bg-[#1a1a1a] rounded-[10px] text-white font-bold">-</button>
                    <span className="font-mono text-white font-bold w-4 text-center">{daughters}</span>
                    <button onClick={() => setDaughters(daughters + 1)} className="w-6 h-6 bg-[#1a1a1a] rounded-[10px] text-white font-bold">+</button>
                  </div>
                </div>

                {/* Total Cost Display */}
                <div className="p-4 bg-[#050505] border border-brand-goldBg/40 rounded-[10px] space-y-1">
                  <div className="flex justify-between text-text-muted">
                    <span>Govt Charges:</span>
                    <span className="font-mono text-white">AED {totalGovFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold border-t border-white/10 pt-2 text-sm text-brand-goldText">
                    <span>Total Investment:</span>
                    <span className="font-mono font-black">AED {grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => window.open(`https://wa.me/971566556645?text=I%20want%20to%20sponsor%20my%20family.%20Total%20Quote:%20AED%20${grandTotal}`, '_blank')}
                className="w-full py-3.5 bg-brand-goldBg text-black font-extrabold rounded-[10px] text-xs uppercase font-mono tracking-wider cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Request Family Application Filing</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 2. SPONSOR ELIGIBILITY WARNING NOTICE */}
      <section className="py-12 px-6 bg-[#050505] border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#111111] border border-amber-500/40 p-6 rounded-[10px] flex items-start gap-4 shadow-xl">
            <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
            <div className="space-y-1 text-xs">
              <span className="font-mono font-bold text-amber-400 uppercase">MANDATORY SPONSOR PREREQUISITES</span>
              <h3 className="text-lg font-bold text-white">GDRFA Sponsor Requirements</h3>
              <p className="text-slate-300 leading-relaxed">
                Minimum Sponsor Salary: <strong>AED 4,000/month</strong> (or AED 3,000 + employer accommodation). Sponsor must hold an active registered <strong>Ejari Tenancy Contract</strong> in Dubai or Tawtheeq in Abu Dhabi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SPONSOR VS DEPENDENT DOCUMENT CONCIERGE */}
      <section className="py-24 px-6 bg-[#050505] border-t border-white/10">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Sponsor vs Dependent Document Concierge
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#111111] border border-white/10 p-6 rounded-[10px] space-y-4">
              <h3 className="text-lg font-bold text-brand-goldText border-b border-white/10 pb-2">1. Sponsor Documents</h3>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand-goldText" /> Original Sponsor Passport & Emirates ID</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand-goldText" /> Stamped Salary Certificate / MOHRE Labor Contract</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand-goldText" /> 3 Months Stamped Bank Statement</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand-goldText" /> Active Registered Ejari Contract</li>
              </ul>
            </div>

            <div className="bg-[#111111] border border-white/10 p-6 rounded-[10px] space-y-4">
              <h3 className="text-lg font-bold text-brand-goldText border-b border-white/10 pb-2">2. Dependents Documents</h3>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand-goldText" /> MOFA Attested Marriage Certificate (Spouse)</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand-goldText" /> MOFA Attested Birth Certificates (Children)</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand-goldText" /> Passport Scans (> 6 months validity)</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand-goldText" /> White Background Passport Photographs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FAMILY FAQS */}
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
