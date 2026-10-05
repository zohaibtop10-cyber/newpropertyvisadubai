import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

const DEFAULT_TIERS = [
  {
    id: '10-year',
    label: '10-Year Golden Visa',
    title: '10-Year Property Investor Golden Visa',
    investment: 'AED 2,000,000+',
    subtitle: 'Direct GDRFA submission with 10-year renewable residency for self, spouse, children, and domestic staff.',
    features: [
      'AED 2M+ real estate title deed or unencumbered off-plan property',
      '10-Year self-sponsored residency without corporate sponsor',
      'Includes spouse, sons up to age 25, and unmarried daughters',
      'No physical presence requirement (stay outside UAE >6 months allowed)',
      'VIP Smart Salem medical fitness screening (results in 2-3 hours)',
      'Doorstep 10-Year physical Emirates ID delivery'
    ]
  },
  {
    id: '5-year',
    label: '5-Year Retirement',
    title: '5-Year Property Investor / Retirement Visa',
    investment: 'AED 1,000,000+',
    subtitle: 'Tailored for senior investors and real estate owners seeking long-term UAE residency status.',
    features: [
      'AED 1M+ property valuation certified by Dubai Land Department',
      '5-Year renewable residency visa with zero corporate sponsor needed',
      'Full family sponsorship inclusion for spouse and dependent children',
      'Fast-track medical fitness & Emirates ID processing',
      'Access to UAE personal banking and driving license privileges'
    ]
  },
  {
    id: '2-year',
    label: '2-Year Investor',
    title: '2-Year Taskeen Property Visa',
    investment: 'AED 750,000+',
    subtitle: 'Standard residential property visa route administered directly through Dubai Land Department Cube.',
    features: [
      'AED 750k+ freehold title deed registered in Dubai',
      '2-Year renewable residency visa under DLD Taskeen program',
      'Sponsor spouse and dependent children under standard rules',
      'Complete PRO concierge management from Ejari to Emirates ID'
    ]
  }
];

export default function ResidencyTiers({
  eyebrow = "Residency Options",
  title = "Three Residency Tiers, One Definitive Answer.",
  tiers = DEFAULT_TIERS,
  onOpenCalculator
}) {
  const [activeTab, setActiveTab] = useState(tiers[0].id);

  const currentTier = tiers.find(t => t.id === activeTab) || tiers[0];

  return (
    <section className="bg-[#050505] py-16 lg:py-24 font-sans text-white border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[10px] bg-[#8C5E00]/15 border border-[#8C5E00]/30 text-[#FFE58F] text-xs font-mono font-bold uppercase tracking-widest"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFE58F]" />
            <span>{eyebrow}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight font-sans tracking-tight"
          >
            {title}
          </motion.h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {tiers.map((tier) => (
            <button
              key={tier.id}
              onClick={() => setActiveTab(tier.id)}
              className={`px-6 py-3 rounded-[10px] text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tier.id
                  ? 'bg-white/10 text-white border border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                  : 'text-slate-500 hover:text-slate-300 border border-transparent'
              }`}
            >
              {tier.label}
            </button>
          ))}
        </div>

        {/* Content Layout (2-Column Grid) with Tab Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            
            {/* Left Column (Features): lg:col-span-7 */}
            <div className="lg:col-span-7 bg-[#0A0A0A] border border-white/10 rounded-[10px] p-8 flex flex-col justify-between space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 font-sans">
                  {currentTier.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 font-sans font-medium">
                  {currentTier.subtitle}
                </p>

                <div className="space-y-3">
                  {currentTier.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-[4px] bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-[#FFE58F]" />
                      </div>
                      <span className="text-slate-300 text-sm font-medium leading-relaxed font-sans">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (Summary Card): lg:col-span-5 */}
            <div className="lg:col-span-5 bg-[#0A0A0A] border border-[#8C5E00]/30 p-8 rounded-[10px] shadow-2xl flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#8C5E00] via-[#FFE58F] to-[#D4AF37]" />
              
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">
                  MINIMUM THRESHOLD
                </span>

                <div className="text-3xl lg:text-4xl font-black text-[#FFE58F] font-sans tracking-tight">
                  {currentTier.investment}
                </div>

                <p className="text-slate-400 text-xs leading-relaxed font-sans font-medium">
                  Includes full government filing, DLD taskeen registration, VIP Smart Salem medical fitness, and physical Emirates ID delivery.
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 space-y-3">
                <button
                  onClick={() => onOpenCalculator && onOpenCalculator(currentTier.id.replace('-year', ''))}
                  className="w-full py-4 rounded-[10px] bg-gradient-to-r from-[#C9981E] to-[#FCE181] text-black font-extrabold text-xs uppercase tracking-wider font-mono shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:brightness-110 transition-all cursor-pointer"
                >
                  CALCULATE MY FEES →
                </button>

                <p className="text-[10px] text-slate-500 font-mono text-center">
                  100% Upfront Government Statutory Accounting
                </p>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
