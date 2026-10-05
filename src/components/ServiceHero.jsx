import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, MessageSquare, Calculator, Sparkles, ShieldCheck } from 'lucide-react';

const DEFAULT_FEATURES = ['DLD Approved', '72-Hr SLA', '100% Direct Filing', 'Doorstep EID Delivery'];

export default function ServiceHero({
  badge1 = "DLD APPROVED PARTNER",
  badge2 = "★ ★ ★ ★ ★ 5.0 - 284 REVIEWS",
  title = "UAE Property Visa Calculator & Residency Filing",
  highlightWord = "Calculator",
  subtitle = "Calculate statutory government fees for 2-Year, 5-Year, and 10-Year Golden Property Visas instantly. Accredited DLD filing channel.",
  features = DEFAULT_FEATURES,
  primaryCtaText = "CALCULATE MY FEES →",
  secondaryCtaText = "WHATSAPP US",
  calculatorTitle = "Property Visa Fee Calculator",
  calculatorSubtitle = "Instant GDRFA & DLD fee estimate",
  onOpenCalculator,
  onPrimaryCtaClick
}) {
  const [propertyValue, setPropertyValue] = useState('2,000,000');
  const [age, setAge] = useState('35');
  const [activeTrack, setActiveTrack] = useState('10-Year'); // 2-Year, 5-Year, 10-Year

  const handleWhatsApp = () => {
    window.open('https://wa.me/971501234567?text=Hello%2C%20I%20would%20like%20to%20calculate%20my%20UAE%20Property%20Visa%20fees.', '_blank');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (typeof onOpenCalculator === 'function') {
      onOpenCalculator(activeTrack.toLowerCase().replace('-year', ''));
    } else if (typeof onPrimaryCtaClick === 'function') {
      onPrimaryCtaClick();
    }
  };

  // Helper to split title and highlight word
  const renderTitle = () => {
    if (!highlightWord || !title.includes(highlightWord)) {
      return <span>{title}</span>;
    }
    const parts = title.split(highlightWord);
    return (
      <>
        {parts[0]}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFE58F]">
          {highlightWord}
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <section className="bg-[#050505] relative overflow-hidden font-sans border-b border-white/10 !py-12 lg:!py-20">
      
      {/* Ambient Radial Background & Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-48 w-[700px] h-[700px] bg-[#D4AF37]/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#996515]/6 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ── LEFT COLUMN: COPY & TRUST SIGNALS (lg:col-span-7) ───────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-6 lg:pt-2"
          >
            {/* Top Badges (Flex Row) */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] font-mono font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-[10px] shadow-sm flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{badge1}</span>
              </span>
              <span className="bg-white/5 border border-white/10 text-slate-300 font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-[10px]">
                {badge2}
              </span>
            </div>

            {/* Main Headline (H1) */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.12] tracking-tight font-sans">
              {renderTitle()}
            </h1>

            {/* Subheadline */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-sans font-medium">
              {subtitle}
            </p>

            {/* Feature Check-Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 border border-white/10 bg-[#111319] rounded-[10px] px-3.5 py-1.5 text-xs text-slate-200 font-sans font-medium shadow-sm hover:border-[#D4AF37]/40 transition-colors"
                >
                  <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleFormSubmit}
                className="bg-dark-gold-gloss text-black font-extrabold rounded-[10px] px-8 py-3.5 text-xs uppercase tracking-wider font-mono shadow-[0_8px_24px_rgba(212,175,55,0.35)] hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{primaryCtaText}</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleWhatsApp}
                className="bg-[#25D366] hover:bg-[#128C7E] text-white font-extrabold rounded-[10px] px-8 py-3.5 text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-current text-white" />
                <span>{secondaryCtaText}</span>
              </motion.button>
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN: CALCULATOR WIDGET (lg:col-span-5) ────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="bg-[#111319] border border-white/10 shadow-[0_30px_60px_-20px_rgba(212,175,55,0.15)] rounded-[10px] p-6 lg:p-7 relative overflow-hidden font-sans">
              
              {/* Top Shimmer Border */}
              <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#B8860B] via-[#FFF8DC] to-[#D4AF37]" />

              {/* Widget Header */}
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="text-white font-extrabold text-base sm:text-lg font-sans flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                  <span>{calculatorTitle}</span>
                </h3>
                <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded-[6px] bg-emerald-500/15 border border-emerald-400/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>LIVE</span>
                </div>
              </div>
              <p className="text-slate-400 text-xs font-sans mb-6">
                {calculatorSubtitle}
              </p>

              {/* Form Inputs */}
              <form onSubmit={handleFormSubmit} className="space-y-4">
                
                {/* Property Value Input */}
                <div>
                  <label className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase mb-1.5 block">
                    ESTIMATED VALUE / TARIFF (AED)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-mono font-bold">AED</span>
                    <input
                      type="text"
                      value={propertyValue}
                      onChange={(e) => setPropertyValue(e.target.value)}
                      className="w-full bg-[#0A0B0E] border border-white/15 rounded-[10px] pl-14 pr-4 py-3 text-white text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all font-mono font-bold"
                    />
                  </div>
                </div>

                {/* Age / Category Input */}
                <div>
                  <label className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase mb-1.5 block">
                    APPLICANT AGE / APPLICANTS
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full bg-[#0A0B0E] border border-white/15 rounded-[10px] px-4 py-3 text-white text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all font-mono font-bold"
                  />
                </div>

                {/* Track Selectors */}
                <div>
                  <label className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase mb-1.5 block">
                    SELECT VISA VALIDITY
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['2-Year', '5-Year', '10-Year'].map((track) => (
                      <button
                        key={track}
                        type="button"
                        onClick={() => setActiveTrack(track)}
                        className={`py-2.5 px-2 rounded-[10px] text-xs text-center cursor-pointer transition-all font-mono ${
                          activeTrack === track
                            ? 'bg-dark-gold-gloss text-black font-extrabold shadow-md'
                            : 'bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10'
                        }`}
                      >
                        {track}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3.5 mt-4 rounded-[10px] bg-dark-gold-gloss text-black font-extrabold text-xs uppercase tracking-wider font-mono shadow-[0_6px_20px_rgba(212,175,55,0.3)] hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>CALCULATE MY TARIFF →</span>
                </motion.button>

              </form>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
