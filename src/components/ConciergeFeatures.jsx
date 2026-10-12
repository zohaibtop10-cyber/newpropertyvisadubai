import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Receipt, MonitorCheck, Truck, Lock, Award, FileCheck, CheckCircle2 } from 'lucide-react';

const DEFAULT_CONCIERGE_FEATURES = [
  {
    icon: Receipt,
    title: "Government Fees at Direct Cost",
    body: "Every statutory tariff (GDRFA, ICP, EID, Medical) is billed at exact government cost with official receipts provided. Zero hidden surcharges."
  },
  {
    icon: MonitorCheck,
    title: "100% Digital Document Vault",
    body: "Upload passports and certificates securely via our 256-bit encrypted portal. We handle all typing, status changes, and filing digitally."
  },
  {
    icon: Truck,
    title: "VIP Doorstep EID Logistics",
    body: "Our accredited PRO concierges collect physical passports and deliver 2-Year or 10-Year Emirates IDs directly to your residence or office."
  },
  {
    icon: Zap,
    title: "Fast-Track SLA Guarantee",
    body: "Express entry permits in 24 hours and VIP Smart Salem medical fitness appointments with results processed in under 3 hours."
  },
  {
    icon: ShieldCheck,
    title: "Dedicated PRO Legal Counsel",
    body: "Single-point executive legal liaison assigned to your file. Direct escalation path with GDRFA and Ministry of Foreign Affairs (MOFA)."
  },
  {
    icon: Lock,
    title: "Bank-Grade Compliance",
    body: "Strict adherence to UAE Data Protection Law and Central Bank KYC guidelines for commercial bank account opening support."
  }
];

export default function ConciergeFeatures({
  badge = "✨ WHY BRIGHTLINK",
  title = "The Concierge Difference",
  subtitle = "Pioneering zero-friction corporate immigration and family residency through transparent government filing and VIP execution.",
  items = DEFAULT_CONCIERGE_FEATURES
}) {
  return (
    <section className="bg-[#050505] py-16 lg:py-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#8C5E00]/30 bg-[#8C5E00]/10 text-[#FFE58F] text-xs font-bold tracking-wider uppercase mb-6 font-mono"
        >
          <span>{badge}</span>
        </motion.div>

        {/* H2 Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl font-black text-white leading-tight mb-4 font-sans"
        >
          {title}
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-text-muted text-lg max-w-3xl mb-12 font-sans font-medium leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {/* The Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => {
            const IconComp = item.icon || ShieldCheck;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-[#0A0A0A] border border-white/5 rounded-[10px] p-8 hover:bg-surface/[0.02] hover:border-white/10 transition-colors duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* Icon Box Top Left */}
                  <div className="w-12 h-12 rounded-[10px] border border-[#8C5E00]/20 bg-gradient-to-br from-[#8C5E00]/10 to-transparent flex items-center justify-center mb-6 group-hover:border-[#D4AF37]/40 transition-all">
                    <IconComp className="w-5 h-5 text-[#FFE58F] group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* Card Title */}
                  <h3 className="text-white font-bold text-lg mb-3 font-sans group-hover:text-[#FFE58F] transition-colors">
                    {item.title}
                  </h3>

                  {/* Card Body */}
                  <p className="text-text-muted text-sm leading-relaxed font-sans font-medium">
                    {item.body || item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
