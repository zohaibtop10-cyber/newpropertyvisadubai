import React from 'react';
import { ShieldCheck, ExternalLink, Building2, Lock, Award } from 'lucide-react';
import { siteConfig } from '../data/cmsData';

export default function AboutPage({ onOpenCalculator, cmsConfig }) {
  const headline = cmsConfig?.pages?.about?.headline || `We Are ${siteConfig.operatorName}`;
  const subtext = cmsConfig?.pages?.about?.subtext || "On your side, working on your behalf. Providing 100% online family residency documentation advisory across Dubai, Abu Dhabi, and the UAE.";
  const licensedEntity = cmsConfig?.pages?.about?.licensedEntity || `Registered as ${siteConfig.operatorName} in Dubai, UAE under Commercial Registration for document clearing services.`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-24 space-y-16">
      
      {/* Hero Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-[#E01E37]/10 text-[#E01E37] border border-[#E01E37]/20">
          <ShieldCheck className="w-4 h-4" />
          <span>ABOUT 800 DOCS LLC SOC</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {headline}
        </h1>

        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
          {subtext}
        </p>
      </section>

      {/* Operator & Licensing Disclosures Grid */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="p-7 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
          <div className="p-3 rounded-2xl bg-[#E01E37]/10 text-[#E01E37] w-fit">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Licensed Entity</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {licensedEntity}
          </p>
        </div>

        <div className="p-7 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
          <div className="p-3 rounded-2xl bg-[#E01E37]/10 text-[#E01E37] w-fit">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">100% Online Privacy</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Zero physical typing center queues. Submit passports and certificates over bank-grade encrypted digital portals.
          </p>
        </div>

        <div className="p-7 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
          <div className="p-3 rounded-2xl bg-[#E01E37]/10 text-[#E01E37] w-fit">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Fee Pass-Through</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            We unbundle government statutory charges from our single, transparent advisory retainer for total fiscal clarity.
          </p>
        </div>
      </section>

      {/* Official Government Portals Disclosure Banner */}
      <section className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-mono text-[#E01E37] font-semibold uppercase">
            THIRD-PARTY DISCLOSURE & OFFICIAL GOVERNMENT LINKS
          </div>
          <h2 className="font-display font-bold text-2xl">
            Official UAE Authority Portals
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            FamilyVisa.ae is an independent document clearing consultancy operated by 800 DOCS LLC SOC. We assist applicants with GDRFA and ICP online filings. Applicants may also apply directly through official government portals below:
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 pt-2">
          {siteConfig.officialPortals.map((portal, idx) => (
            <a
              key={idx}
              href={portal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex items-center justify-between text-xs font-mono group"
            >
              <div>
                <div className="font-bold text-white group-hover:text-[#E01E37] transition-colors">
                  {portal.name}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">{portal.label}</div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
            </a>
          ))}
        </div>
      </section>

      {/* Action CTA */}
      <div className="text-center space-y-4 pt-4">
        <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
          Ready to bring your family together?
        </h3>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => onOpenCalculator('spouse')}
            className="bg-[#E01E37] hover:bg-[#b50e2f] text-white px-7 py-3.5 rounded-xl font-semibold text-xs sm:text-sm transition-all shadow-md shadow-[#E01E37]/30 cursor-pointer"
          >
            Calculate Visa Cost Now
          </button>
        </div>
      </div>

    </div>
  );
}
