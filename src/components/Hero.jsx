import React from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { ArrowRight, CheckCircle2, ShieldCheck, Star, Calculator as CalcIcon, Sparkles, Clock, Shield, Award } from 'lucide-react';
import Calculator from './Calculator';
import { siteConfig } from '../data/cmsData';

export default function Hero({ onOpenCalculator }) {
  return (
    <section className="relative bg-gradient-to-b from-[#0a0c10] via-[#0f1117] to-[#0a0c10] text-white pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans border-b border-white/10">
      {/* Subtle Radial Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#D4AF37]/15 to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-emerald-500/10 blur-[140px] pointer-events-none rounded-full hidden lg:block" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Trust Badges, USP Strip */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Google Rating Badge */}
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-lg">
              <div className="flex items-center gap-1 text-[#FBBC05]">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="font-mono font-bold text-white">5.0 / 5.0</span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-300 font-medium">500+ Verified Client Reviews</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.12]">
              UAE Family & Property Visa <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF8DC] via-[#D4AF37] to-[#B8860B]">
                Cost Calculator — Free & Instant
              </span>
            </h1>

            {/* Lead Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-medium">
              Calculate exact UAE government fees in under 30 seconds. 100% itemized invoice with zero hidden markups. Sponsor spouse, children, parents, or domestic staff online.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onOpenCalculator && onOpenCalculator('family')}
                className="bg-gradient-to-r from-[#D4AF37] via-[#FFF8DC] to-[#B8860B] text-black font-extrabold text-sm sm:text-base px-7 py-4 rounded-xl transition-all shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] hover:-translate-y-0.5 flex items-center gap-2.5 cursor-pointer btn-shine-effect tracking-wide"
              >
                <CalcIcon className="w-5 h-5 text-black" />
                <span>Calculate Visa Costs</span>
                <ArrowRight className="w-4 h-4 text-black stroke-[3]" />
              </button>

              <a
                href={`https://wa.me/${siteConfig.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-sm sm:text-base px-7 py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] flex items-center gap-2.5 cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5 fill-current" />
                <span>WhatsApp Specialist</span>
              </a>
            </div>

            {/* USP Strip (Inspired by familyvisa.ae) */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10">
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3.5 text-center">
                <Clock className="w-5 h-5 text-brand-gold mx-auto mb-1" />
                <span className="block font-extrabold text-sm text-white font-mono">30-Sec</span>
                <span className="text-[11px] text-slate-400 font-medium">Instant Calculation</span>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3.5 text-center">
                <Shield className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                <span className="block font-extrabold text-sm text-white font-mono">100% Online</span>
                <span className="text-[11px] text-slate-400 font-medium">No Office Visit Required</span>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3.5 text-center">
                <Award className="w-5 h-5 text-brand-gold mx-auto mb-1" />
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