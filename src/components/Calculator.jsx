import React, { useState } from 'react';
import { Heart, Building2, UserCheck, Crown, ChevronRight, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export default function Calculator({ onLaunch }) {
  const [selectedGoal, setSelectedGoal] = useState('family');

  const options = [
    {
      id: 'property',
      title: 'Property Investor Visa',
      subtitle: '10-Yr Golden (AED 2M+) or 2-Yr (AED 750k+)',
      icon: Building2,
      badge: 'Golden Visa'
    },
    {
      id: 'family',
      title: 'Family Residence Visa',
      subtitle: 'Sponsor Spouse, Children, or Parents',
      icon: Heart,
      badge: 'Most Popular'
    },
    {
      id: 'golden',
      title: '10-Year Golden Visa',
      subtitle: 'Real Estate Title Deed or High Salary',
      icon: Crown,
      badge: '10-Yr Sovereign'
    },
    {
      id: 'domestic',
      title: 'Domestic Helper / Maid',
      subtitle: 'Sponsor Housemaid or Private Nanny',
      icon: UserCheck,
      badge: 'Tadbeer Direct'
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto bg-gradient-to-b from-[#141720]/95 via-[#0A0B0E]/95 to-[#0A0B0E]/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-7 shadow-[0_20px_60px_-15px_rgba(212,175,55,0.25)] border-[1.5px] border-brand-gold/40 hover:border-brand-gold/70 relative transition-all duration-300 group text-white">
      {/* Top Gold Shimmer Border Accent */}
      <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

      <div className="flex justify-between items-center mb-3">
        <span className="text-brand-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.5)] text-[11px] font-bold tracking-widest uppercase font-mono flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> INSTANT TARIFF CALCULATOR
        </span>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse" />
          <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase tracking-wider">LIVE AUDIT</span>
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl font-black text-white mt-1 mb-5 tracking-tight font-display">
        Select Sponsorship Goal
      </h2>

      <div className="space-y-2.5">
        {options.map((opt) => {
          const isSelected = selectedGoal === opt.id;
          const Icon = opt.icon;

          return (
            <div
              key={opt.id}
              onClick={() => setSelectedGoal(opt.id)}
              className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'border-brand-gold bg-gradient-to-r from-brand-gold/20 via-brand-gold/10 to-transparent shadow-[0_0_20px_rgba(212,175,55,0.25)]'
                  : 'border-white/10 bg-white/[0.03] hover:border-brand-gold/40 hover:bg-white/[0.06]'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform ${
                  isSelected 
                    ? 'bg-brand-gold text-black shadow-md shadow-brand-gold/30' 
                    : 'bg-brand-gold/10 text-brand-gold border border-brand-gold/30'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className={`text-sm font-extrabold tracking-tight ${isSelected ? 'text-brand-gold' : 'text-slate-100'}`}>
                    {opt.title}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400">
                    {opt.subtitle}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isSelected && (
                  <span className="w-5 h-5 rounded-full bg-brand-gold text-black flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </span>
                )}
                <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-brand-gold translate-x-0.5' : 'text-slate-500'}`} />
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => onLaunch && onLaunch(selectedGoal)}
        className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#FFF8DC] to-[#B8860B] text-black text-sm font-extrabold flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.7)] hover:-translate-y-0.5 transition-all cursor-pointer active:translate-y-0 tracking-wide"
      >
        <ShieldCheck className="w-4 h-4 text-black" />
        <span>Launch Full Tariff Calculator</span>
        <ArrowRight className="w-4 h-4 text-black stroke-[3]" />
      </button>
    </div>
  );
}