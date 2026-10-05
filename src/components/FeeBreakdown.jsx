import React from 'react';
import { motion } from 'framer-motion';
import { Receipt, ShieldCheck, CheckCircle2 } from 'lucide-react';

const DEFAULT_FEE_ITEMS = [
  { label: "GDRFA Entry Permit Authorization", amount: "AED 1,100" },
  { label: "In-Country Visa Status Change", amount: "AED 675" },
  { label: "VIP Smart Salem Medical Fitness Screening", amount: "AED 750" },
  { label: "10-Year Emirates ID Registration", amount: "AED 1,170" },
  { label: "Dubai Land Department (DLD) Taskeen Fee", amount: "AED 4,020" },
  { label: "Concierge PRO Legal & Doorstep Delivery Retainer", amount: "AED 1,500" }
];

export default function FeeBreakdown({
  eyebrow = "100% Upfront Accounting",
  title = "Full Government Fee Breakdown",
  description = "Zero hidden surcharges. All official statutory tariffs (GDRFA, ICP, DLD, Medical) are billed at exact government cost with official receipts provided for your corporate accounting.",
  items = DEFAULT_FEE_ITEMS,
  totalLabel = "TOTAL ESTIMATED COST",
  totalAmount = "AED 9,315"
}) {
  return (
    <section className="bg-[#050505] py-16 lg:py-24 font-sans text-white border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ── LEFT COLUMN: DESCRIPTIVE TEXT (lg:col-span-5) ────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[10px] bg-[#8C5E00]/15 border border-[#8C5E00]/30 text-[#FFE58F] text-xs font-mono font-bold uppercase tracking-widest">
              <Receipt className="w-3.5 h-3.5 text-[#FFE58F]" />
              <span>{eyebrow}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight font-sans tracking-tight">
              {title}
            </h2>

            <p className="text-slate-400 text-base leading-relaxed font-sans font-medium">
              {description}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Original GDRFA & ICP Government Receipts Provided</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Flat Upfront Service Retainer with Zero Hidden Fees</span>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN: THE INVOICE CARD (lg:col-span-7) ───────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="bg-[#0A0A0A] border border-white/10 rounded-[10px] p-6 lg:p-8 shadow-2xl relative overflow-hidden">
              
              {/* Top Shimmer Line */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#8C5E00] via-[#FFE58F] to-[#D4AF37]" />

              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-2">
                <span className="text-xs font-mono font-bold text-[#FFE58F] uppercase tracking-wider">
                  STATUTORY ITEM & SERVICE BREAKDOWN
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold">
                  VERIFIED TARIFFS
                </span>
              </div>

              {/* Rows */}
              <div className="divide-y divide-white/5">
                {items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-3.5 text-sm font-sans">
                    <span className="text-slate-400 font-medium pr-4">
                      {item.label}
                    </span>
                    <span className="text-white font-bold font-mono whitespace-nowrap">
                      {item.amount}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total Box */}
              <div className="mt-6 pt-5 border-t border-[#8C5E00]/50 flex justify-between items-center bg-[#D4AF37]/5 p-4 rounded-[10px] border border-[#D4AF37]/20">
                <span className="bg-gradient-to-r from-[#D4AF37] via-[#FFE58F] to-[#8C5E00] bg-clip-text text-transparent text-sm sm:text-base font-black font-mono tracking-wider uppercase">
                  {totalLabel}
                </span>
                <span className="bg-gradient-to-r from-[#D4AF37] via-[#FFE58F] to-[#8C5E00] bg-clip-text text-transparent text-2xl sm:text-3xl font-black font-mono tracking-tight">
                  {totalAmount}
                </span>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
