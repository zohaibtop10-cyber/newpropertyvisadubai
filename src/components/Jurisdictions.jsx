import React from 'react';

export default function Jurisdictions() {
  const freezones = [
    {
      name: "IFZA DUBAI",
      tag: "MOST POPULAR",
      tagColor: "bg-brand-primary/10 text-brand-primary border-brand-primary/20",
      desc: "Cost-effective, highly flexible free zone for consulting, trading, and technology businesses.",
      spec1Label: "Min Setup",
      spec1Value: "AED 12,900",
      spec2Label: "Turnaround",
      spec2Value: "48 Hours"
    },
    {
      name: "DMCC DUBAI HUB",
      tag: "TOP COMMODITY",
      tagColor: "bg-amber-500/10 text-brand-gold border-amber-500/20",
      desc: "Global center for commodities, crypto, gold, and international trade.",
      spec1Label: "Tier-1 Status",
      spec1Value: "DMCC Original",
      spec2Label: "Tax Rate",
      spec2Value: "0% Qualifying"
    },
    {
      name: "ADGM ABU DHABI",
      tag: "FINANCIAL HUB",
      tagColor: "bg-brand-gold/10 text-brand-gold border-brand-gold/20",
      desc: "Independent international financial center using English Common Law framework.",
      spec1Label: "Legal System",
      spec1Value: "English Common Law",
      spec2Label: "Auditing",
      spec2Value: "Big-4 Mandatory"
    },
    {
      name: "RAKEZ / MEYDAN",
      tag: "TECH & E-COM",
      tagColor: "bg-[#D4AF37]/10 text-brand-gold border-[#D4AF37]/20",
      desc: "Ideal for tech startups, digital nomad setups, and e-commerce scaleups.",
      spec1Label: "Nomad Friendly",
      spec1Value: "Yes",
      spec2Label: "Setup Time",
      spec2Value: "24 Hours"
    }
  ];

  return (
    <section id="jurisdictions" className="bg-canvas dark:bg-brand-darkBg text-content-primary dark:text-white py-16 px-4 sm:px-6 lg:px-8 font-sans border-b border-border-subtle dark:border-white/5 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-dark-gold-gloss text-slate-950 font-bold hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300 shadow-[0_4px_12px_rgba(212,175,55,0.25)]" />
              FREE ZONE INTELLIGENCE
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-content-primary dark:text-white tracking-tight">
              Premier UAE Jurisdictions
            </h2>
          </div>
          <p className="text-xs text-content-muted dark:text-slate-400 max-w-xs font-medium">
            Tailored recommendation based on activity, tax status & capital allocation requirements.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {freezones.map((item, index) => (
            <div 
              key={index}
              className="bg-surface dark:bg-brand-surface border border-border-subtle dark:border-white/10 rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-extrabold text-lg text-content-primary dark:text-white group-hover:text-[#B8860B] transition-colors">
                    {item.name}
                  </h3>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${item.tagColor}`}>
                    {item.tag}
                  </span>
                </div>

                <p className="text-xs text-content-muted dark:text-slate-400 leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-border-subtle dark:border-white/5 bg-canvas/50 dark:bg-white/[0.02] -mx-6 -mb-6 p-6 rounded-b-2xl">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase">{item.spec1Label}</div>
                    <div className="font-bold text-content-primary dark:text-white mt-0.5">{item.spec1Value}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase">{item.spec2Label}</div>
                    <div className="font-bold text-content-primary dark:text-white mt-0.5">{item.spec2Value}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
