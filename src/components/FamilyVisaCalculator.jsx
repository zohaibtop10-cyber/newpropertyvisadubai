import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { siteConfig } from '../data/cmsData';

const FAMILY_FEES = {
  spouse: {
    title: 'Spouse Visa',
    total: 3040,
    items: [
      { label: 'Entry Permit (New / In-Country)', amount: 540, desc: 'GDRFA electronic quota clearance & entry voucher' },
      { label: 'Status Change / Visa Stamping', amount: 740, desc: 'In-country status amendment without exiting UAE' },
      { label: 'Smart Salem Medical Screening', amount: 850, desc: 'VIP 30-minute DHA blood test & chest X-ray' },
      { label: 'Emirates ID (2-Year)', amount: 370, desc: 'ICP 2-year biometric smart card issuance' },
      { label: 'Residence Permit Issuance', amount: 540, desc: 'Final residency approval & digital e-visa stamping' }
    ]
  },
  child: {
    title: 'Child Visa',
    total: 1670,
    items: [
      { label: 'Entry Permit (New / In-Country)', amount: 540, desc: 'GDRFA dependent entry voucher' },
      { label: 'GDRFA File Opening & Typing', amount: 220, desc: 'Sponsorship file establishment & typing fee' },
      { label: 'Emirates ID (2-Year)', amount: 370, desc: 'ICP 2-year smart card (No biometrics under 15)' },
      { label: 'Residence Permit Issuance', amount: 540, desc: 'Final child residency approval & e-visa stamping' }
    ]
  },
  parent: {
    title: 'Parent Visa',
    total: 5820,
    items: [
      { label: 'Entry Permit (Parent Visa)', amount: 1100, desc: 'GDRFA humanitarian parent entry permit' },
      { label: 'Smart Salem Medical Screening', amount: 850, desc: 'VIP DHA senior medical examination' },
      { label: 'Emirates ID (1-Year)', amount: 270, desc: 'ICP 1-year smart card issuance' },
      { label: 'Residence Permit Issuance', amount: 1100, desc: 'Final 1-year parent residency approval' },
      { label: 'GDRFA Security Deposit / Insurance', amount: 2500, desc: 'Refundable government guarantee deposit' }
    ]
  }
};

export default function FamilyVisaCalculator({ dark = true }) {
  const [activeTab, setActiveTab] = useState('spouse');
  const activeData = FAMILY_FEES[activeTab] || FAMILY_FEES.spouse;

  const whatsappUrl = `https://wa.me/${siteConfig.whatsappRaw || '9718003627'}?text=${encodeURIComponent(`Hello EmiratesPrime! 👋 I would like to apply for a ${activeData.title} (Estimated Gov Fees: AED ${activeData.total.toLocaleString()}).`)}`;

  return (
    <div className={`w-full font-sans transition-all duration-300 ${dark ? 'dark' : ''}`}>
      <div className="bg-[#111319] border border-[#D4AF37]/30 border-t-4 border-t-[#8C5E00] rounded-[10px] shadow-2xl overflow-hidden relative">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 blur-3xl pointer-events-none" />

        {/* ── HEADER SECTION ────────────────────────────────────────── */}
        <div className="p-6 sm:p-7 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-[10px] bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shadow-sm">
              <Link2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-xl sm:text-2xl text-white tracking-tight leading-tight">
                Family Visa Fee Calculator
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-0.5 font-medium">
                Exact government fee itemization by visa type
              </p>
            </div>
          </div>

          {/* Pulsing Live Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>LIVE GDRFA TARIFFS</span>
          </div>
        </div>

        {/* ── 3-SEGMENT TOGGLE SELECTOR ─────────────────────────────── */}
        <div className="p-6 sm:p-7 pb-4">
          <div className="p-1 bg-[#0A0B0E] border border-white/10 rounded-[10px] flex gap-1">
            {[
              { id: 'spouse', label: 'Spouse Visa' },
              { id: 'child', label: 'Child Visa' },
              { id: 'parent', label: 'Parent Visa' }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 px-3 rounded-[8px] text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer text-center relative ${
                    isActive
                      ? 'bg-gradient-to-r from-[#8C5E00] to-[#D4AF37] text-white shadow-lg shadow-[#D4AF37]/20 scale-[1.02]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── DYNAMIC INVOICE LIST WITH FRAMER-MOTION CROSSFADE ─────── */}
        <div className="px-6 sm:px-7 py-2 min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="space-y-1 divide-y divide-white/5"
            >
              {activeData.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-3.5 px-2 hover:bg-white/[0.02] transition-colors rounded-[6px]"
                >
                  <div className="space-y-0.5">
                    <div className="text-sm font-bold text-slate-200 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.desc && (
                      <p className="text-[11px] text-slate-400 pl-6 font-medium">
                        {item.desc}
                      </p>
                    )}
                  </div>
                  <div className="font-mono font-extrabold text-white text-sm sm:text-base shrink-0 ml-4">
                    AED {item.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── TOTAL & CTA BLOCK ─────────────────────────────────────── */}
        <div className="p-6 sm:p-7 bg-[#0A0B0E] border-t border-white/10 space-y-5">
          
          {/* Highlighted Total Box */}
          <div className="bg-gradient-to-r from-[#8C5E00]/15 via-[#D4AF37]/20 to-[#8C5E00]/15 border border-[#D4AF37]/40 rounded-[10px] p-5 flex items-center justify-between shadow-lg">
            <div>
              <span className="text-[10px] font-mono font-extrabold text-[#D4AF37] uppercase tracking-widest block">
                GOV. FEES TOTAL
              </span>
              <span className="text-xs text-slate-300 font-medium">
                Statutory tariff for {activeData.title}
              </span>
            </div>
            <div className="text-right">
              <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5C0] via-[#D4AF37] to-[#B8860B] font-mono tracking-tight">
                AED {activeData.total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Full-width Gold CTA Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 rounded-[10px] bg-gradient-to-r from-[#8C5E00] via-[#D4AF37] to-[#8C5E00] text-black font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-xl shadow-[#D4AF37]/20 cursor-pointer"
          >
            <span>Apply on WhatsApp →</span>
          </a>
        </div>

      </div>
    </div>
  );
}
