import React from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { ArrowRight, CheckCircle2, ShieldCheck, Building2 } from 'lucide-react';

export default function Hero({ onOpenCalculator }) {
  return (
    <section className="relative bg-slate-50 dark:bg-[#0A0A0A] pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-slate-900 dark:text-white overflow-hidden font-sans border-b border-slate-200 dark:border-white/5 transition-colors duration-200">
      {/* Background Subtle Radial Gradient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#E01E37]/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Hero Headline */}
        <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl leading-[1.1] mb-6">
          Setup Your UAE Business<span className="text-[#E01E37]">.</span> <br />
          <span className="text-slate-600 dark:text-slate-300">
            Seamlessly<span className="text-[#E01E37]">.</span>
          </span>
        </h1>

        {/* Hero Subheadline */}
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-12 font-normal">
          Architected for institutional capital, multinational groups, and distinguished family offices.
          Guaranteed UAE and Free Zone Fast-Track formation with end-to-end corporate governance.
        </p>

        {/* Inner Card Container */}
        <div className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl mb-12">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 w-fit rounded-full bg-[#E01E37]/10 border border-[#E01E37]/20 text-xs font-bold text-[#E01E37] tracking-widest uppercase">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Strategic Incorporation Hub
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                Corporate Architecture for UAE Mainland & Free Zones
              </h2>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                EmiratesPrime structures 100% foreign-owned Free Zone & Mainland LLCs to provide DIFC single family offices, crypto ventures, fintech hub setups, VIP executive visas, and Free Banking channels in 24-72 hours.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onOpenCalculator && onOpenCalculator('spouse')}
                  className="bg-[#E01E37] hover:bg-[#b00e2e] text-white font-display font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-[#E01E37]/20 flex items-center gap-2 group cursor-pointer"
                >
                  <span>Calculate Setup Capital</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="#services"
                  className="bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/15 text-slate-900 dark:text-white font-display font-semibold text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all flex items-center gap-2"
                >
                  Explore Advisory Scope
                </a>
              </div>

              {/* 3 Metrics Row */}
              <div className="grid grid-cols-3 gap-4 pt-8 mt-2 border-t border-slate-200 dark:border-white/10">
                <div>
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white">100%</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mt-1">Foreign Ownership</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white">48 Hrs</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mt-1">DED Fast-Track</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white">AED 0</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mt-1">Income Tax</div>
                </div>
              </div>
            </div>

            {/* Right Image Column */}
            <div className="lg:col-span-5 relative w-full h-[300px] lg:h-auto rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
                alt="DIFC Corporate Headquarters"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 dark:opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 dark:from-[#111111] via-transparent to-transparent" />

              {/* Floating Bottom Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-xl p-4 flex items-center justify-between shadow-lg">
                <div>
                  <div className="text-[10px] uppercase text-[#E01E37] font-bold tracking-wider mb-1">Live Registry Node</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                    DIFC Gate Tower 4
                  </div>
                </div>
                <span className="bg-[#E01E37] text-white text-[10px] font-bold px-3 py-1 rounded tracking-widest uppercase shadow-lg shadow-[#E01E37]/30">
                  ACTIVE
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Bar */}
        <div className="pt-2">
          <div className="flex flex-wrap items-center justify-center lg:justify-between gap-6 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
            <div className="flex items-center gap-2 hover:text-slate-900 dark:hover:text-white transition-colors cursor-default">
              <ShieldCheck className="w-4 h-4 text-[#E01E37]" />
              <span>Global Economy Rated</span>
            </div>
            <div className="flex items-center gap-2 hover:text-slate-900 dark:hover:text-white transition-colors cursor-default">
              <ShieldCheck className="w-4 h-4 text-[#E01E37]" />
              <span>100% Legal Guarantee</span>
            </div>
            <div className="flex items-center gap-2 hover:text-slate-900 dark:hover:text-white transition-colors cursor-default">
              <ShieldCheck className="w-4 h-4 text-[#E01E37]" />
              <span>Regulatory Certified</span>
            </div>
            <div className="flex items-center gap-2 hover:text-slate-900 dark:hover:text-white transition-colors cursor-default hidden sm:flex">
              <ShieldCheck className="w-4 h-4 text-[#E01E37]" />
              <span>24/7 VIP Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Advisory WhatsApp Trigger */}
      <a
        href="https://wa.me/97140009988"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white font-display font-bold text-sm px-5 py-3.5 rounded-full shadow-[0_8px_30px_rgb(37,211,102,0.3)] flex items-center gap-2 hover:-translate-y-1 transition-all duration-300"
      >
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
        <span className="hidden sm:inline">Advisory WhatsApp</span>
      </a>
    </section>
  );
}