import React from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';
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
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg> Text Us on WhatsApp
        </motion.a>
      </motion.div>

    </div>
  );
}
