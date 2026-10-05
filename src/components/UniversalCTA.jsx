import React from 'react';
import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { siteConfig } from '../data/cmsData';

export default function UniversalCTA({
  headline = "Ready to Sponsor Your Family in the UAE?",
  subtext = "Talk to a visa specialist today or calculate your exact government fee in 60 seconds.",
  onOpenCalculator,
  cmsConfig
}) {
  const finalHeadline = cmsConfig?.cta?.headline || headline;
  const finalSubtext = cmsConfig?.cta?.subtext || subtext;

  return (
    <section className="relative w-full py-16 bg-[#050505] border-y border-[#D4AF37]/40 shadow-[inset_0_0_100px_rgba(212,175,55,0.05)] overflow-hidden">
      {/* Subtle gold ambient glow behind the text */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.15)_0%,_rgba(5,5,5,0)_60%)] pointer-events-none" />
      
      <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-black bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#D4AF37] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(212,175,55,0.2)] font-display tracking-tight"
        >
          <span>{finalHeadline}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-slate-400 mt-4 text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
        >
          <span>{finalSubtext}</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onOpenCalculator ? onOpenCalculator('spouse') : null}
            className="bg-dark-gold-gloss text-black font-extrabold px-8 py-4 rounded-[10px] shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:brightness-110 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider cursor-pointer"
          >
            <Calculator className="w-5 h-5" />
            <span>Launch Visa Calculator</span>
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={`https://wa.me/${cmsConfig?.global?.whatsappRaw || siteConfig.whatsappRaw}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#128C7E] text-white font-extrabold px-8 py-4 rounded-[10px] shadow-[0_4px_20px_rgba(37,211,102,0.3)] transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider cursor-pointer"
          >
            <WhatsAppIcon className="w-5 h-5 fill-current" />
            <span>Talk on WhatsApp</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
