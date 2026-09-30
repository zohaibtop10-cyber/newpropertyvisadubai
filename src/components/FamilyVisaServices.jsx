import React, { useState } from 'react';
import { Users, Crown, IdCard, Stethoscope, Home, Baby, ScrollText, Languages, Scale, ArrowRight, CheckCircle2 } from 'lucide-react';

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
    <section id="family-services" className="bg-canvas dark:bg-brand-darkBg text-content-primary dark:text-white py-20 px-4 sm:px-6 lg:px-8 font-sans border-b border-border-subtle dark:border-white/5 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20 text-xs font-bold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse-gold" />
              FULL FAMILY & DEPENDANT SERVICES
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-content-primary dark:text-white tracking-tight">
              Everything We Handle
            </h2>
            <p className="text-content-muted dark:text-slate-400 text-sm sm:text-base max-w-2xl mt-2 leading-relaxed">
              One dedicated advisory team for family residence visas, Golden Visas, Emirates ID typing, and supporting legal document attestations across all 7 Emirates.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 bg-surface-hover/80 dark:bg-white/5 p-1.5 rounded-xl border border-border-strong dark:border-white/10 shrink-0">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all' ? 'bg-brand-primary text-white shadow-sm' : 'text-content-secondary dark:text-slate-300 hover:text-content-primary dark:hover:text-white'
              }`}
            >
              All Services
            </button>
            <button
              onClick={() => setActiveTab('visas')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'visas' ? 'bg-brand-primary text-white shadow-sm' : 'text-content-secondary dark:text-slate-300 hover:text-content-primary dark:hover:text-white'
              }`}
            >
              Visas & Residency
            </button>
            <button
              onClick={() => setActiveTab('id')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'id' ? 'bg-brand-primary text-white shadow-sm' : 'text-content-secondary dark:text-slate-300 hover:text-content-primary dark:hover:text-white'
              }`}
            >
              Emirates ID & Medical
            </button>
            <button
              onClick={() => setActiveTab('docs')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'docs' ? 'bg-brand-primary text-white shadow-sm' : 'text-content-secondary dark:text-slate-300 hover:text-content-primary dark:hover:text-white'
              }`}
            >
              Attestation & Legal
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={idx}
                className="bg-surface dark:bg-brand-surface border border-border-subtle dark:border-white/10 rounded-xl p-7 hover:border-brand-primary/40 hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-surface-elevated dark:bg-white/10 border border-border-subtle dark:border-white/10 flex items-center justify-center text-brand-primary shadow-sm group-hover:bg-brand-primary group-hover:text-white transition-all">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-brand-primary bg-brand-primary/10 border border-brand-primary/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-content-primary dark:text-white mb-2 group-hover:text-brand-primary transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-content-muted dark:text-slate-400 leading-relaxed mb-6">
                    {item.desc}
                  </p>

                  <ul className="space-y-2 mb-6 pt-4 border-t border-border-subtle dark:border-white/5">
                    {item.perks.map((perk, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-2 text-xs font-semibold text-content-secondary dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a 
                  href="#calculator" 
                  className="inline-flex items-center justify-between text-xs font-bold text-brand-primary hover:text-brand-hover pt-4 border-t border-border-subtle dark:border-white/5 transition-colors"
                >
                  <span>Calculate Visa Cost</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            );
          })}
        </div>

        {/* 4 Step Process Banner */}
        <div className="mt-16 bg-[#111111] dark:bg-brand-surface text-white rounded-xl p-8 lg:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mb-10">
            <div className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-2">
              STREAMLINED 4-STEP PROCESS
            </div>
            <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              How Your Family Visa File Is Processed
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              You deal with one dedicated sovereign advisor instead of visiting 5 separate government counters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-surface/5 dark:bg-white/[0.03] border border-white/10 rounded-xl p-5 space-y-3">
              <div className="text-2xl font-display font-extrabold text-brand-primary">01</div>
              <div className="font-display font-bold text-sm text-white">Free Pre-Audit</div>
              <div className="text-xs text-slate-400 leading-relaxed">
                We review salary certificates, tenancy (Ejari), & marriage/birth attestations before paying any fee.
              </div>
            </div>

            <div className="bg-surface/5 dark:bg-white/[0.03] border border-white/10 rounded-xl p-5 space-y-3">
              <div className="text-2xl font-display font-extrabold text-brand-primary">02</div>
              <div className="font-display font-bold text-sm text-white">Entry Permit & Status</div>
              <div className="text-xs text-slate-400 leading-relaxed">
                Issuance of electronic entry permit and immediate In-Country Status Change without travel exit.
              </div>
            </div>

            <div className="bg-surface/5 dark:bg-white/[0.03] border border-white/10 rounded-xl p-5 space-y-3">
              <div className="text-2xl font-display font-extrabold text-brand-primary">03</div>
              <div className="font-display font-bold text-sm text-white">VIP Medical & Biometrics</div>
              <div className="text-xs text-slate-400 leading-relaxed">
                Escorted 30-minute VIP medical fitness test & express biometrics queue pass for Emirates ID.
              </div>
            </div>

            <div className="bg-surface/5 dark:bg-white/[0.03] border border-white/10 rounded-xl p-5 space-y-3">
              <div className="text-2xl font-display font-extrabold text-brand-primary">04</div>
              <div className="font-display font-bold text-sm text-white">Visa Stamping & Card</div>
              <div className="text-xs text-slate-400 leading-relaxed">
                Final e-visa stamping approval and courier dispatch of physical Emirates ID cards directly to your residence.
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
