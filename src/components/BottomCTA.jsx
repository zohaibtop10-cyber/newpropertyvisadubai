import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, MessageSquare, ArrowRight } from 'lucide-react';

export default function BottomCTA({
  headline = "Your Dubai Residency is One Title Deed Away.",
  subtext = "Calculate your exact statutory government fees in 60 seconds or speak directly with our PRO advisory desk on WhatsApp.",
  primaryCtaText = "CALCULATE MY FEES →",
  secondaryCtaText = "WHATSAPP US",
  onOpenCalculator
}) {
  const handleWhatsApp = () => {
    window.open('https://wa.me/971501234567?text=Hello%20Brightlink%21%20I%20would%20like%20to%20speak%20with%20a%20PRO%20advisor.', '_blank');
  };

  const handleCalculator = () => {
    if (typeof onOpenCalculator === 'function') {
      onOpenCalculator('spouse');
    }
  };

  return (
    <section className="bg-[#050505] py-20 lg:py-28 relative overflow-hidden font-sans border-t border-white/10 text-white">
      
      {/* Soft Gold Radial Glow in Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(140,94,0,0.15),transparent_60%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        
        {/* H2 Headline in Metallic Gold Gradient */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-[#D4AF37] via-[#FFE58F] to-[#8C5E00] bg-clip-text text-transparent leading-tight font-sans tracking-tight"
        >
          {headline}
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-text-muted text-base sm:text-lg font-medium leading-relaxed max-w-2xl mx-auto font-sans"
        >
          {subtext}
        </motion.p>

        {/* Action Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <button
            onClick={handleCalculator}
            className="w-full sm:w-auto bg-gradient-to-r from-[#C9981E] to-[#FCE181] text-black font-extrabold rounded-[10px] px-8 py-4 text-xs uppercase tracking-wider font-mono shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{primaryCtaText}</span>
          </button>

          <button
            onClick={handleWhatsApp}
            className="w-full sm:w-auto bg-[#25D366] text-white font-bold rounded-[10px] px-8 py-4 text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-all cursor-pointer shadow-md"
          >
            <MessageSquare className="w-4 h-4 fill-white text-white" />
            <span>{secondaryCtaText}</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
