'use client';

import React, { useState } from 'react';
import { 
  Crown, 
  CheckCircle2, 
  Briefcase, 
  Building2, 
  Stethoscope, 
  Lightbulb, 
  ArrowRight, 
  MessageSquare, 
  PhoneCall, 
  ChevronDown, 
  Download, 
  CheckSquare, 
  Square,
  ShieldCheck,
  FileCheck,
  Users
} from 'lucide-react';
import ProcessTimeline from '../../components/ProcessTimeline';

export default function GoldenVisaDirectoryPage() {
  const [track, setTrack] = useState('executive');
  const [salary, setSalary] = useState(35000);
  const [licenseBody, setLicenseBody] = useState('DHA');
  const [openFaq, setOpenFaq] = useState(null);

  const tracks = [
    { id: 'property', label: 'Real Estate (AED 2M+)', icon: Building2 },
    { id: 'executive', label: 'Executive Salary (AED 30k+)', icon: Briefcase },
    { id: 'talent', label: 'Doctors & Talents', icon: Stethoscope },
    { id: 'entrepreneur', label: 'Entrepreneurs', icon: Lightbulb }
  ];

  const faqs = [
    { q: "Can Golden Visa holders obtain a UAE Tax Residency Certificate?", a: "Yes. Golden Visa holders who reside in the UAE for 183+ days per year qualify for official UAE Tax Residency Certificates issued by the Federal Tax Authority." },
    { q: "What happens to family visas if the Golden Visa sponsor passes away?", a: "Under UAE Golden Visa regulations, family members can retain their 10-year residency permits until the expiration of their visa term, even upon the demise of the primary Golden Visa holder." },
    { q: "Are sons over 18 years old eligible for Golden Visa sponsorship?", a: "Yes. Primary Golden Visa holders can sponsor sons up to any age without educational caps or work restrictions, as well as unmarried daughters of any age." }
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-brand-goldBg selection:text-black">
      
      {/* 1. MULTI-TRACK HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 px-6 overflow-hidden border-b border-white/10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-goldBg/10 via-[#050505] to-[#050505]">
        <div className="max-w-7xl mx-auto space-y-10 relative z-10 text-center">
          
          <div className="max-w-4xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-goldBg/10 border border-brand-goldBg/30 text-brand-goldText text-xs font-mono font-bold rounded-[10px] uppercase tracking-wider">
              <Crown className="w-4 h-4 text-brand-goldText" /> OFFICIAL UAE 10-YEAR GOLDEN VISA DIRECTORY
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              UAE 10-Year Golden Visa: Live, Work, and Invest Without a Local Sponsor
            </h1>
            <p className="text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
              Self-sponsored residency with zero stay limits, unlimited family sponsorship, and priority VIP concierge processing through ICP & GDRFA.
            </p>
          </div>

          {/* Interactive Category Switcher Tabs */}
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto bg-[#111111] p-2 rounded-[10px] border border-white/10">
            {tracks.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setTrack(t.id)}
                  className={`flex items-center gap-2 px-5 py-3.5 rounded-[10px] text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    track === t.id
                      ? 'bg-brand-goldBg text-black font-black shadow-lg shadow-brand-goldBg/20'
                      : 'text-text-muted hover:text-white hover:bg-surface/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* 2. BESPOKE ELIGIBILITY CHECKER WIDGET */}
      <section className="py-20 px-6 bg-[#050505] border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#111111] border border-brand-goldBg/30 p-8 rounded-[10px] shadow-2xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#B8860B] via-[#F3E5AB] to-[#D4AF37]" />

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-brand-goldText uppercase">DYNAMIC EVALUATOR</span>
                <h3 className="text-2xl font-black text-white capitalize">{track} Golden Visa Eligibility</h3>
              </div>
              <ShieldCheck className="w-8 h-8 text-brand-goldText" />
            </div>

            {track === 'executive' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-2">Monthly Basic + Allowance Salary (AED)</label>
                  <input
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(Number(e.target.value))}
                    className="w-full bg-[#050505] border border-white/10 rounded-[10px] p-3.5 text-white font-mono text-sm"
                  />
                </div>
                <div className="p-4 rounded-[10px] bg-[#050505] border border-white/10 flex items-center justify-between">
                  <span>Threshold Status:</span>
                  <span className={`font-mono font-bold ${salary >= 30000 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {salary >= 30000 ? '✓ QUALIFIED (>= AED 30,000)' : '⚠️ BELOW THRESHOLD (< AED 30,000)'}
                  </span>
                </div>
              </div>
            )}

            {track === 'talent' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-2">Medical Accreditation Authority</label>
                  <select
                    value={licenseBody}
                    onChange={(e) => setLicenseBody(e.target.value)}
                    className="w-full bg-[#050505] border border-white/10 rounded-[10px] p-3.5 text-white text-sm"
                  >
                    <option value="DHA">Dubai Health Authority (DHA)</option>
                    <option value="MOHAP">Ministry of Health & Prevention (MOHAP)</option>
                    <option value="DOH">Department of Health Abu Dhabi (DOH)</option>
                  </select>
                </div>
              </div>
            )}

            <button
              onClick={() => window.open(`https://wa.me/971566556645?text=Hello%20I%20want%20to%20apply%20for%20a%20${track}%20Golden%20Visa`, '_blank')}
              className="w-full py-4 bg-brand-goldBg text-black font-extrabold rounded-[10px] shadow-lg text-xs uppercase font-mono tracking-wider cursor-pointer flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Apply for {track.toUpperCase()} Golden Visa</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. GOLDEN VISA PRIVILEGE COMPARISON MATRIX */}
      <section className="py-24 px-6 bg-[#050505] border-t border-white/10">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Standard 2-Year Visa vs 10-Year Golden Visa
            </h2>
          </div>

          <div className="bg-[#111111] border border-white/10 rounded-[10px] overflow-hidden shadow-2xl">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
              <thead className="bg-[#050505] text-text-muted font-mono uppercase border-b border-white/10">
                <tr>
                  <th className="py-4 px-6">Privilege Category</th>
                  <th className="py-4 px-6">Standard 2-Year Visa</th>
                  <th className="py-4 px-6 text-brand-goldText font-bold">10-Year Golden Visa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="py-4 px-6 font-bold text-white">Local Sponsor Requirement</td>
                  <td className="py-4 px-6 text-text-muted">Employer Dependent</td>
                  <td className="py-4 px-6 text-brand-goldText font-bold">100% Self-Sponsored</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-white">UAE Stay Outside Limits</td>
                  <td className="py-4 px-6 text-text-muted">Max 6 Months</td>
                  <td className="py-4 px-6 text-brand-goldText font-bold">Unlimited (Zero Stay Limits)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-white">Son Sponsorship Age Limit</td>
                  <td className="py-4 px-6 text-text-muted">Capped at 25 Years</td>
                  <td className="py-4 px-6 text-brand-goldText font-bold">No Age Limit for Sons</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. CONCIERGE APPLICATION TIMELINE */}
      <ProcessTimeline
        title="5-Step Golden Visa Concierge Roadmap"
        subtitle="Nomination Clearance -> ICP Pre-Approval -> In-Country Status Change -> VIP Medical -> EID Delivery."
      />

      {/* 5. ENTERPRISE & FAMILY FAQ */}
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
