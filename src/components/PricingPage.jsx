import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, MessageSquare } from 'lucide-react';
import { servicesData, siteConfig } from '../data/cmsData';

export default function PricingPage({ onOpenCalculator, onNavigate, cmsConfig }) {
  const headline = cmsConfig?.pages?.pricing?.headline || "Fixed Service Fees, Government Charges at Cost";
  const subtext = cmsConfig?.pages?.pricing?.subtext || "No hidden fees or unexpected charges. Every government fee comes with official GDRFA / ICP receipts, unbundled from our simple service retainer.";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-24 space-y-16 relative z-10">
      
      {/* Header Banner */}
      <motion.section
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 15 }}
        className="text-center max-w-3xl mx-auto space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-[#E01E37]/10 text-[#E01E37] border border-[#E01E37]/20">
          <Calculator className="w-4 h-4" />
          <span>TRANSPARENT PASS-THROUGH PRICING</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {headline}
        </h1>

        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
          {subtext}
        </p>
      </motion.section>

      {/* Global Pricing Table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 80, damping: 15 }}
        className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 rounded-3xl shadow-xl overflow-hidden"
      >
        <div className="p-6 border-b border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white">Full Service Pricing Overview</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Estimated statutory government tariffs vs. FamilyVisa.ae service retainers (AED)</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onOpenCalculator('spouse')}
            className="px-5 py-2.5 bg-[#E01E37] text-white rounded-xl text-xs font-bold shadow-md shadow-[#E01E37]/20 flex items-center gap-2 cursor-pointer"
          >
            <Calculator className="w-4 h-4" /> Launch Interactive Calculator
          </motion.button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-black/40 text-slate-500 dark:text-slate-400 font-mono uppercase text-[10px] border-b border-slate-200 dark:border-white/10">
              <tr>
                <th className="py-4 px-6">Service Name</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Govt Tariff (Est.)</th>
                <th className="py-4 px-6">Service Retainer</th>
                <th className="py-4 px-6">Est. Total Investment</th>
                <th className="py-4 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 font-sans">
              {servicesData.map((service) => (
                <tr key={service.id} className="hover:bg-slate-50/80 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">
                    {service.title}
                    <div className="text-[10px] text-slate-400 font-mono font-normal">{service.processingTime.standard || service.processingTime}</div>
                  </td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-400 font-mono">{service.category}</td>
                  <td className="py-4 px-6 font-mono text-slate-700 dark:text-slate-300">AED {service.pricing.statutoryGovTariff.toLocaleString()}</td>
                  <td className="py-4 px-6 font-mono font-semibold text-emerald-600 dark:text-emerald-400">AED {service.pricing.advisoryRetainer.toLocaleString()}</td>
                  <td className="py-4 px-6 font-mono font-black text-slate-900 dark:text-white text-sm">
                    AED {service.pricing.totalEstimate.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => onNavigate('service', service.id)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-[#E01E37] hover:text-white text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Trust Callout */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="space-y-2 max-w-xl">
          <div className="text-xs font-mono text-[#E01E37] uppercase font-bold">100% MONEY-BACK GUARANTEE</div>
          <h3 className="font-display font-bold text-2xl">Need a Custom Company or Multi-Family Quote?</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Sponsoring 3+ dependants or setting up a corporate Golden Visa package? Contact our senior team on WhatsApp for volume discounts.
          </p>
        </div>

        <motion.a
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          href={`https://wa.me/${cmsConfig?.global?.whatsappRaw || siteConfig.whatsappRaw}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl shadow-lg flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" /> Text Us on WhatsApp
        </motion.a>
      </motion.div>

    </div>
  );
}
