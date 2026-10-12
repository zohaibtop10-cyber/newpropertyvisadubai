import React from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { ArrowRight, CheckCircle2, ShieldCheck, Star, Calculator as CalcIcon, Sparkles, Clock, Shield, Award } from 'lucide-react';
import Calculator from './Calculator';
import { siteConfig } from '../data/cmsData';

export default function Hero({ onOpenCalculator }) {
  return (
    <section className="relative w-full pt-16 pb-16 md:pt-20 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans border-b border-[#DBB24B]/20 text-white bg-[#0B0A08] transition-colors duration-300">
      {/* goldenvisadubai.ai Signature Hero Background Gradient & Bloom */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(120% 70% at 50% 0%, rgba(219, 178, 75, 0.18), transparent 62%), linear-gradient(180deg, #18140C 0%, #0F0D09 46%, #0B0A08 100%)'
        }}
      />

      {/* Ambient Radial Golden Bloom & Arc */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[700px] h-[360px] bg-[radial-gradient(circle,rgba(239,196,92,0.24)_0%,transparent_70%)] blur-[56px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-[#DBB24B]/10 blur-[140px] pointer-events-none rounded-full hidden lg:block" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Headline, Trust Badges, USP Strip */}
          <div className="lg:col-span-7 flex flex-col items-start pt-0 lg:pt-8 space-y-6 sm:space-y-8">
            
            {/* Google Rating & Verified Trust Pill */}
            <div className="inline-flex items-center gap-3 bg-[#18140C]/90 border border-[#DBB24B]/35 rounded-[10px] px-4 py-2 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-lg">
              <div className="flex items-center gap-1 text-[#DBB24B]">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="font-mono font-bold text-white">5.0 / 5.0</span>
              <span className="text-[#DBB24B]/40">|</span>
              <span className="text-slate-300 font-medium">500+ Verified Client Approvals</span>
            </div>

            {/* Main Headline with goldenvisadubai.ai Radiant Gold Masthead */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
              UAE Family &amp; Property Visa <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#FFFFFF] via-[#FFF6DC] via-40% via-[#F3D489] to-[#DBB24B] bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(219,178,75,0.35)]">
                Cost Calculator — Free &amp; Instant
              </span>
            </h1>

            {/* Lead Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-medium">
              Calculate exact UAE government fees in under 30 seconds. 100% itemized invoice with zero hidden markups. Sponsor spouse, children, parents, or domestic staff online.
            </p>

            {/* CTA Buttons (matching user's uploaded button image) */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onOpenCalculator && onOpenCalculator('family')}
                className="btn-gold px-8 py-4 rounded-[10px] text-sm sm:text-base font-bold shadow-[0_4px_20px_rgba(219,178,75,0.4)] transition-all flex items-center gap-2.5 cursor-pointer group tracking-tight"
              >
                <span>Consult with a Senior</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1.5 transition-transform" />
              </button>

              <a
                href={`https://wa.me/${siteConfig.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-secondary text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-[10px] transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                <span>WhatsApp Specialist</span>
              </a>
            </div>

            {/* USP Strip */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10 w-full">
              <div className="bg-[#18140C]/80 border border-[#DBB24B]/20 rounded-[10px] p-3.5 text-center">
                <Clock className="w-5 h-5 text-[#DBB24B] mx-auto mb-1" />
                <span className="block font-extrabold text-sm text-white font-mono">30-Sec</span>
                <span className="text-[11px] text-slate-400 font-medium">Instant Calculation</span>
              </div>

              <div className="bg-[#18140C]/80 border border-[#DBB24B]/20 rounded-[10px] p-3.5 text-center">
                <Shield className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                <span className="block font-extrabold text-sm text-white font-mono">100% Online</span>
                <span className="text-[11px] text-slate-400 font-medium">No Counter Queues</span>
              </div>

              <div className="bg-[#18140C]/80 border border-[#DBB24B]/20 rounded-[10px] p-3.5 text-center">
                <Award className="w-5 h-5 text-[#DBB24B] mx-auto mb-1" />
                <span className="block font-extrabold text-sm text-white font-mono">AED 1,450</span>
                <span className="text-[11px] text-slate-400 font-medium">Fixed Service Fee</span>
              </div>
            </div>

          </div>

          {/* Right Column: Calculator Widget */}
          <div className="lg:col-span-5 relative">
            <Calculator onLaunch={(tab) => onOpenCalculator && onOpenCalculator(tab)} />
          </div>

        </div>
      </div>
    </section>
  );
}