import React, { useState } from 'react';
import { Users, Crown, IdCard, Stethoscope, Home, Baby, ScrollText, Languages, Scale, ArrowRight, CheckCircle2 } from 'lucide-react';
import ProcessTimeline from './ProcessTimeline';

export default function FamilyVisaServices() {
  const [activeTab, setActiveTab] = useState('all');

  const services = [
    {
      icon: Users,
      title: "Family Residence Visa",
      badge: "MOST POPULAR",
      category: "visas",
      desc: "Sponsor your spouse, children, or parents with a fully managed application from entry permit to Emirates ID issuance.",
      perks: ["Free eligibility check", "In-country status change without exit", "Complete filing in 5-10 working days"]
    },
    {
      icon: Crown,
      title: "10-Year Golden Visa",
      badge: "EXECUTIVE TIER",
      category: "visas",
      desc: "Long-term 10-year residence for property investors, entrepreneurs, executives, and specialized talents. All-inclusive processing.",
      perks: ["10-year renewable residency", "Unlimited dependant sponsorship", "Approvals in 24-48 hours"]
    },
    {
      icon: IdCard,
      title: "Emirates ID & Typing",
      badge: "SAME-DAY",
      category: "id",
      desc: "Official ICP Emirates ID application typing, biometrics scheduling, renewals, and lost/damaged replacement services.",
      perks: ["Instant typing center filing", "Biometrics VIP queue pass", "Express courier delivery"]
    },
    {
      icon: Stethoscope,
      title: "VIP Medical Fitness Test",
      badge: "30-MIN RESULT",
      category: "medical",
      desc: "Priority Medical Fitness screening at certified VIP centers across Dubai, Abu Dhabi, and all 7 Emirates.",
      perks: ["30-minute express results", "VIP lounge accession", "Transportation assistance"]
    },
    {
      icon: Home,
      title: "Maid / Domestic Worker Visa",
      badge: "DOMESTIC TIER",
      category: "visas",
      desc: "End-to-end sponsorship for nannies, housemaids, cooks, and private drivers under your personal or Golden Visa status.",
      perks: ["MOHRE contract drafting", "Medical & Emirates ID included", "Annual visa renewals"]
    },
    {
      icon: Baby,
      title: "Newborn Visa Processing",
      badge: "120-DAY WINDOW",
      category: "visas",
      desc: "Fast-track residence visa and Emirates ID setup for babies born in the UAE to avoid fines within the statutory 120-day window.",
      perks: ["Birth certificate attestation", "Immediate entry permit", "No hospital visit required"]
    },
    {
      icon: ScrollText,
      title: "MOFA Document Attestation",
      badge: "LEGAL TIER",
      category: "docs",
      desc: "Consulate, embassy, and Ministry of Foreign Affairs (MOFA) attestation for marriage certificates, birth certificates, and degrees.",
      perks: ["Global embassy network", "Home pick-up & delivery", "100% legal validity guarantee"]
    },
    {
      icon: Languages,
      title: "Legal Translation Services",
      badge: "OFFICIAL",
      category: "docs",
      desc: "Certified legal Arabic translation for all foreign official documents accepted by UAE Courts, GDRFA, and ICP authorities.",
      perks: ["Court-certified translators", "Same-day turnaround", "Digital & hardcopy stamps"]
    },
    {
      icon: Scale,
      title: "Power of Attorney & Wills",
      badge: "PROTECTION",
      category: "docs",
      desc: "Notarized Power of Attorney drafting, DIFC Wills registration, and legal protection structures for non-Muslim expatriates.",
      perks: ["DIFC Court registry", "Notary Public execution", "Asset protection shielding"]
    }
  ];

  const filteredServices = activeTab === 'all' 
    ? services 
    : services.filter(s => s.category === activeTab);

  return (
    <section id="family-services" className="bg-[#050505] text-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 font-sans border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-[10px] bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
              FULL FAMILY & DEPENDANT SERVICES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Everything We Handle
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mt-2 leading-relaxed font-medium">
              One dedicated advisory team for family residence visas, Golden Visas, Emirates ID typing, and supporting legal document attestations across all 7 Emirates.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 bg-surface/5 p-1.5 rounded-[10px] border border-white/10 shrink-0">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-[8px] text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'all' ? 'bg-dark-gold-gloss text-black font-black shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              All Services
            </button>
            <button
              onClick={() => setActiveTab('visas')}
              className={`px-3.5 py-1.5 rounded-[8px] text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'visas' ? 'bg-dark-gold-gloss text-black font-black shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              Visas & Residency
            </button>
            <button
              onClick={() => setActiveTab('id')}
              className={`px-3.5 py-1.5 rounded-[8px] text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'id' ? 'bg-dark-gold-gloss text-black font-black shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              Emirates ID & Medical
            </button>
            <button
              onClick={() => setActiveTab('docs')}
              className={`px-3.5 py-1.5 rounded-[8px] text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'docs' ? 'bg-dark-gold-gloss text-black font-black shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              Attestation & Legal
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {filteredServices.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={idx}
                className="bg-[#111319] border border-white/10 rounded-[10px] p-6 hover:border-[#D4AF37]/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-[10px] bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:bg-dark-gold-gloss group-hover:text-black transition-all shadow-sm">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#D4AF37] bg-[#D4AF37]/15 border border-[#D4AF37]/30 px-2.5 py-0.5 rounded-[6px] uppercase tracking-wider">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-5">
                    {item.desc}
                  </p>

                  <ul className="space-y-2 mb-5 pt-3 border-t border-white/10">
                    {item.perks.map((perk, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-2 text-xs font-medium text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a 
                  href="#categories" 
                  className="inline-flex items-center justify-between text-xs font-mono font-bold text-[#D4AF37] hover:text-amber-300 pt-3 border-t border-white/10 transition-colors"
                >
                  <span>Calculate Visa Cost</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Render 4-Step Process Wave Timeline */}
        <ProcessTimeline
          title="The 4-Step Concierge Process"
          subtitle="From first contact to residency card in hand — fully managed, with zero government visits required."
        />

      </div>
    </section>
  );
}
