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
    <div
      className="w-full max-w-md mx-auto bg-[#FAF9F6] dark:bg-[#0B0A08] rounded-[16px] p-5 sm:p-6 shadow-[0_20px_60px_-15px_rgba(239,196,92,0.18)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] border border-[#DECFA8] dark:border-[#EFC45C]/35 hover:border-[#EFC45C] relative transition-all duration-300 text-slate-900 dark:text-white card-shine"
      style={{ fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif' }}
    >
      {/* Top Gold Shimmer Border Accent */}
      <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#EFC45C] to-transparent" />

      <div className="flex justify-between items-center mb-3">
        <span className="text-[#8A6412] dark:text-[#EFC45C] text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-[#EFC45C]" /> INSTANT TARIFF CALCULATOR
        </span>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider font-mono">LIVE AUDIT</span>
        </div>
      </div>

      <h2 className="text-xl font-black text-slate-950 dark:text-white mt-1 mb-4 tracking-tight">
        Select Sponsorship Goal
      </h2>

      <div className="space-y-2">
        {options.map((opt) => {
          const isSelected = selectedGoal === opt.id;
          const Icon = opt.icon;

          return (
            <div
              key={opt.id}
              onClick={() => setSelectedGoal(opt.id)}
              className={`w-full flex items-center justify-between p-3 rounded-[10px] border transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'border-[#EFC45C] bg-[#FAF6ED] dark:bg-[#1E1A12] shadow-[0_0_15px_rgba(239,196,92,0.18)]'
                  : 'border-[#E8DFC8] dark:border-white/10 bg-white dark:bg-[#141210] hover:border-[#EFC45C]/50 hover:bg-[#FAF6ED] dark:hover:bg-[#1E1A12]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-[8px] flex items-center justify-center shrink-0 transition-transform ${
                  isSelected 
                    ? 'bg-[#EFC45C] text-[#0B0A08] font-black shadow-sm' 
                    : 'bg-[#F6EED9] dark:bg-[#262116] text-[#8A6412] dark:text-[#EFC45C] border border-[#EFC45C]/40'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className={`text-xs sm:text-sm font-bold tracking-tight ${isSelected ? 'text-[#8A6412] dark:text-[#EFC45C]' : 'text-slate-900 dark:text-slate-100'}`}>
                    {opt.title}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    {opt.subtitle}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {isSelected && (
                  <span className="w-4 h-4 rounded-[6px] bg-[#EFC45C] text-[#0B0A08] flex items-center justify-center text-[10px] font-black">
                    ✓
                  </span>
                )}
                <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-[#8A6412] dark:text-[#EFC45C] translate-x-0.5' : 'text-slate-400'}`} />
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => onLaunch && onLaunch(selectedGoal)}
        className="w-full mt-5 py-3.5 rounded-[10px] btn-gold shimmer-sweep text-[#0B0A08] text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(239,196,92,0.35)] hover:scale-[1.01] transition-all cursor-pointer tracking-wide"
      >
        <ShieldCheck className="w-4 h-4 text-[#0B0A08]" />
        <span>Launch Full Tariff Calculator</span>
        <ArrowRight className="w-4 h-4 text-[#0B0A08] stroke-[3]" />
      </button>
    </div>
  );
}