'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  Briefcase, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  Users, 
  ArrowRight, 
  MessageSquare, 
  PhoneCall, 
  ChevronDown, 
  BadgeCheck, 
  Layers, 
  Globe 
} from 'lucide-react';
import ProcessTimeline from '../../components/ProcessTimeline';

export default function CorporateProServicesPage() {
  const [jurisdiction, setJurisdiction] = useState('mainland');
  const [activity, setActivity] = useState('');
  const [employees, setEmployees] = useState('1-10');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const text = encodeURIComponent(
      `Corporate PRO Consultation Request:\nJurisdiction: ${jurisdiction}\nActivity: ${activity}\nEmployees: ${employees}`
    );
    window.open(`https://wa.me/971566556645?text=${text}`, '_blank');
  };

  const faqs = [
    { q: "What triggers a Wage Protection System (WPS) block on a UAE mainland company?", a: "A WPS block is automatically triggered if salaries are delayed by more than 15 days or if less than 80% of registered workforce salaries are processed through MOHRE-compliant bank accounts." },
    { q: "How quickly can you process labor quota increases for expanding companies?", a: "Labor quota upgrades are submitted electronically through our direct MOHRE portal liaison and are typically cleared within 24 to 48 hours following document audit." },
    { q: "Do you manage freezone portals like DMCC, DDA, and JAFZA?", a: "Yes. Our corporate PRO team manages both mainland MOHRE/GDRFA portals and all major freezone portals (DMCC, DDA, JAFZA, IFZA, RAKEZ, Meydan) under a unified account manager." }
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-brand-goldBg selection:text-black">
      
      {/* 1. CORPORATE HERO & CONSULTATION WIDGET */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 px-6 overflow-hidden border-b border-white/10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-goldBg/10 via-[#050505] to-[#050505]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block px-3.5 py-1.5 bg-brand-goldBg/10 border border-brand-goldBg/30 text-brand-goldText text-xs font-mono font-bold rounded-[10px] uppercase tracking-wider">
              ENTERPRISE GOVERNMENT LIAISON
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              Outsourced Corporate PRO Services & Government Liaison
            </h1>
            <p className="text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              Seamless management of Ministry of Human Resources (MOHRE), GDRFA, and Economic Department portals for your enterprise.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
              {[
                "Dedicated PRO Account Mgr",
                "MOHRE & GDRFA Portals",
                "Zero Penalties Guarantee"
              ].map((b, i) => (
                <div key={i} className="bg-[#111111] border border-white/10 p-4 rounded-[10px] flex items-center justify-center gap-2.5 shadow-md">
                  <CheckCircle2 className="w-4 h-4 text-brand-goldText shrink-0" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Consultation Widget */}
          <div className="lg:col-span-5">
            <div className="bg-[#111111] backdrop-blur-md border border-brand-goldBg/30 p-6 sm:p-8 rounded-[10px] shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#B8860B] via-[#F3E5AB] to-[#D4AF37]" />

              <div className="border-b border-white/10 pb-4">
                <span className="bg-brand-goldBg/20 text-brand-goldText border border-brand-goldBg/40 text-[10px] font-mono font-bold px-2.5 py-1 rounded-[10px] inline-block uppercase tracking-wider mb-2">
                  VIP ENTERPRISE CONSULTATION
                </span>
                <h3 className="text-xl font-extrabold text-white">Schedule Corporate PRO Audit</h3>
                <p className="text-xs text-text-muted mt-1">Audit your trade license & MOHRE labor quota status.</p>
              </div>

              {submitted ? (
                <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-[10px] text-center space-y-2">
                  <BadgeCheck className="w-10 h-10 text-emerald-400 mx-auto" />
                  <div className="text-sm font-bold text-white">Consultation Requested!</div>
                  <p className="text-xs text-slate-300">A Senior Corporate PRO Officer will reach out on WhatsApp in 10 minutes.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase font-mono">Entity Jurisdiction</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setJurisdiction('mainland')}
                        className={`p-3 text-xs font-bold rounded-[10px] border transition-all ${
                          jurisdiction === 'mainland' 
                            ? 'bg-brand-goldBg text-black border-brand-goldBg font-black' 
                            : 'bg-[#050505] border-white/10 text-text-muted'
                        }`}
                      >
                        Mainland LLC
                        <span className="block text-[10px] font-normal opacity-80 mt-0.5">DET & MOHRE</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setJurisdiction('freezone')}
                        className={`p-3 text-xs font-bold rounded-[10px] border transition-all ${
                          jurisdiction === 'freezone' 
                            ? 'bg-brand-goldBg text-black border-brand-goldBg font-black' 
                            : 'bg-[#050505] border-white/10 text-text-muted'
                        }`}
                      >
                        Freezone Entity
                        <span className="block text-[10px] font-normal opacity-80 mt-0.5">DMCC, DDA, IFZA</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase font-mono">Trade License Activity</label>
                    <input
                      type="text"
                      required
                      value={activity}
                      onChange={(e) => setActivity(e.target.value)}
                      placeholder="e.g. IT Consultancy / Commercial Trading"
                      className="w-full bg-[#050505] border border-white/10 rounded-[10px] px-4 py-3 text-white text-xs focus:border-brand-goldBg focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase font-mono">Number of Employees</label>
                    <select
                      value={employees}
                      onChange={(e) => setEmployees(e.target.value)}
                      className="w-full bg-[#050505] border border-white/10 rounded-[10px] px-4 py-3 text-white text-xs focus:border-brand-goldBg focus:outline-none font-mono"
                    >
                      <option value="1-10">1 – 10 Employees</option>
                      <option value="11-50">11 – 50 Employees</option>
                      <option value="51-200">51 – 200 Employees</option>
                      <option value="200+">200+ Corporate Enterprise</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-brand-goldBg text-black font-extrabold rounded-[10px] shadow-[0_0_20px_rgba(212,175,55,0.3)] text-xs uppercase font-mono tracking-wider cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Schedule VIP PRO Consultation</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* 2. CORE PRO CAPABILITIES BENTO GRID */}
      <section className="py-24 px-6 bg-[#050505] border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 bg-brand-goldBg/10 border border-brand-goldBg/30 text-brand-goldText text-xs font-semibold rounded-[10px] mb-3 uppercase tracking-wider">
              Complete Corporate Spectrum
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Core Corporate PRO Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#111111] border border-white/10 p-6 rounded-[10px] space-y-4 hover:border-brand-goldBg/40 transition-all">
              <div className="w-12 h-12 rounded-[10px] bg-brand-goldBg/10 border border-brand-goldBg/30 flex items-center justify-center text-brand-goldText">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Establishment Card & Quotas</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Immigration establishment card renewals, MOHRE electronic file opening, and labor quota allocation upgrades.
              </p>
            </div>

            <div className="bg-[#111111] border border-white/10 p-6 rounded-[10px] space-y-4 hover:border-brand-goldBg/40 transition-all">
              <div className="w-12 h-12 rounded-[10px] bg-brand-goldBg/10 border border-brand-goldBg/30 flex items-center justify-center text-brand-goldText">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Employment Visa Processing</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                End-to-end work permit filing, entry permits, status adjustments, DHA medical fitness, and Emirates ID delivery.
              </p>
            </div>

            <div className="bg-[#111111] border border-white/10 p-6 rounded-[10px] space-y-4 hover:border-brand-goldBg/40 transition-all">
              <div className="w-12 h-12 rounded-[10px] bg-brand-goldBg/10 border border-brand-goldBg/30 flex items-center justify-center text-brand-goldText">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Trade License Renewals</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                DET / DED annual trade license renewals, activity additions, partner shareholding amendments, and MOA updates.
              </p>
            </div>

            <div className="bg-[#111111] border border-white/10 p-6 rounded-[10px] space-y-4 hover:border-brand-goldBg/40 transition-all">
              <div className="w-12 h-12 rounded-[10px] bg-brand-goldBg/10 border border-brand-goldBg/30 flex items-center justify-center text-brand-goldText">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Investor & Partner Visas</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Corporate investor 2-year & 10-year Golden Visa nomination processing for board members and shareholders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAINLAND VS FREEZONE COMPLIANCE DASHBOARD */}
      <section className="py-24 px-6 bg-[#050505] border-t border-white/10">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Mainland vs. Freezone Compliance Dashboard
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 bg-[#111111] p-2 rounded-[10px] border border-white/10 max-w-2xl mx-auto">
            <button
              onClick={() => setJurisdiction('mainland')}
              className={`flex-1 py-3 px-4 rounded-[10px] text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                jurisdiction === 'mainland' ? 'bg-brand-goldBg text-black font-black' : 'text-text-muted hover:text-white'
              }`}
            >
              Mainland LLCs (MOHRE & DET)
            </button>
            <button
              onClick={() => setJurisdiction('freezone')}
              className={`flex-1 py-3 px-4 rounded-[10px] text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                jurisdiction === 'freezone' ? 'bg-brand-goldBg text-black font-black' : 'text-text-muted hover:text-white'
              }`}
            >
              Freezone Authorities (DMCC / DDA / JAFZA)
            </button>
          </div>

          <div className="bg-[#111111] border border-white/10 p-6 sm:p-8 rounded-[10px] shadow-2xl space-y-4">
            {jurisdiction === 'mainland' ? (
              <div className="space-y-3 text-xs text-slate-300">
                <div className="font-bold text-white text-sm mb-2">Mainland Compliance Suite:</div>
                <div className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand-goldText" /> MOHRE Wage Protection System (WPS) payroll monitoring & block prevention</div>
                <div className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand-goldText" /> Electronic labor offer letter & labor contract registration</div>
                <div className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand-goldText" /> DET Dubai Economy trade license renewal & NOC attestations</div>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-slate-300">
                <div className="font-bold text-white text-sm mb-2">Freezone Authority Compliance Suite:</div>
                <div className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand-goldText" /> DMCC, DDA, JAFZA, RAKEZ, and IFZA portal management</div>
                <div className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand-goldText" /> Freezone employment visa entry permits & EID typing</div>
                <div className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand-goldText" /> Dual-license approvals & Mainland branch office permit clearance</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. TRANSPARENT RETAINER PRICING */}
      <section className="py-24 px-6 bg-[#050505] border-t border-white/10">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Pay-Per-Transaction vs. Monthly Corporate Retainer
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#111111] border border-white/10 p-6 rounded-[10px] space-y-4">
              <span className="text-xs font-mono font-bold text-text-muted uppercase">FLEXIBLE TRACK</span>
              <h3 className="text-2xl font-black text-white">Pay-Per-Transaction</h3>
              <div className="text-3xl font-black text-brand-goldText font-mono">Billed Per Transaction</div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-goldText" /> Ideal for small companies with occasional visa filings</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-goldText" /> Standard PRO processing turnarounds</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-goldText" /> Clear itemized billing per Government fee</li>
              </ul>
            </div>

            <div className="bg-[#111111] border border-brand-goldBg/40 p-6 rounded-[10px] space-y-4 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
              <span className="text-xs font-mono font-bold text-brand-goldText uppercase">ENTERPRISE SLA TRACK</span>
              <h3 className="text-2xl font-black text-white">Monthly Corporate Retainer</h3>
              <div className="text-3xl font-black text-brand-goldText font-mono">Custom Monthly SLA</div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-goldText" /> Dedicated Senior PRO Account Manager assigned to your firm</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-goldText" /> Priority express processing for all executive visas & quota updates</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-goldText" /> Full WPS monitoring & fine protection compliance guarantee</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ONBOARDING WORKFLOW */}
      <ProcessTimeline
        title="4-Step Corporate Onboarding Workflow"
        subtitle="Trade License Audit -> Portal Takeover -> Quota Allocation -> Active Processing."
      />

      {/* 6. CORPORATE FAQ ACCORDION */}
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
