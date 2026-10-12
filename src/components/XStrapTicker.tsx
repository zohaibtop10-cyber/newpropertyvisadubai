import React from 'react';
import { Sparkles, ShieldCheck, Award, Zap, PhoneCall, Mail } from 'lucide-react';

const TOP_HEADER_TEXT_1 = [
  "🏆 ICP & GDRFA AUTHORIZED",
  "⚡ VIP 24H EXPRESS CONCIERGE",
  "👑 10-YEAR GOLDEN VISA",
  "🏛️ DLD TRUSTEE PARTNER",
  "📩 ADVISORY@800DOCS.AE",
  "📞 +971 4 800 DOCS",
  "🌟 99.8% APPROVAL SLA",
  "💼 CORPORATE BANKING ADVISORY"
];

const TOP_HEADER_TEXT_2 = [
  "✨ ZERO FRICTION RESIDENCY",
  "🤝 HAVE A PROJECT? LET'S COLLABORATE",
  "🏆 TOP UAE CONSULTANCY 2026",
  "🔑 PROPERTY INVESTMENT VISAS",
  "👨‍👩‍👧‍👦 UNLIMITED FAMILY SPONSORSHIP",
  "💎 TAX-FREE WEALTH PRESERVATION",
  "📜 MOFA & ATTESTATION CONCIERGE"
];

export const XStrapTicker: React.FC = () => {
  const strap1Items = Array(4).fill(TOP_HEADER_TEXT_1).flat();
  const strap2Items = Array(4).fill(TOP_HEADER_TEXT_2).flat();

  return (
    <div className="relative w-full h-56 sm:h-72 overflow-hidden flex items-center justify-center my-6 bg-transparent select-none">
      
      {/* Background Strap 1 (Rotated Counter-Clockwise - Slate/Navy) */}
      <div className="absolute w-[220%] sm:w-[160%] bg-slate-900 dark:bg-slate-950 text-white py-4 sm:py-5 transform -rotate-3 z-0 shadow-xl overflow-hidden flex whitespace-nowrap border-y-2 border-[#D4AF37]/40">
        <div className="inline-flex animate-marquee font-black tracking-widest text-sm sm:text-base uppercase items-center gap-8">
          {strap1Items.map((text, idx) => (
            <span key={`strap1-${idx}`} className="inline-flex items-center gap-2 text-slate-200 hover:text-amber-400 transition-colors cursor-default">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Foreground Strap 2 (Rotated Clockwise - Rich Gold #D4AF37) */}
      <div className="absolute w-[220%] sm:w-[160%] bg-gradient-to-r from-amber-500 via-[#D4AF37] to-yellow-400 text-slate-950 py-4 sm:py-5 transform rotate-3 z-10 shadow-[0_25px_60px_rgba(212,175,55,0.4)] overflow-hidden flex whitespace-nowrap border-y-2 border-white/60">
        <div className="inline-flex animate-marquee-reverse font-black tracking-widest text-sm sm:text-base uppercase items-center gap-8">
          {strap2Items.map((text, idx) => (
            <span key={`strap2-${idx}`} className="inline-flex items-center gap-2 text-slate-950 hover:text-slate-800 transition-colors cursor-default">
              <Sparkles className="w-4 h-4 text-slate-900 fill-slate-900" />
              {text}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
};

export default XStrapTicker;
