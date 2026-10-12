import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQAccordion({
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about sponsoring family and residency in Dubai.",
  badge = "GOT QUESTIONS?",
  items = [],
  faqs = []
}) {
  const [openIndex, setOpenIndex] = useState(null);
  const faqList = (items && items.length > 0) ? items : faqs;

  if (!faqList || faqList.length === 0) return null;

  return (
    <div className="px-4 sm:px-6 max-w-4xl mx-auto relative z-10 space-y-8 py-12">
      <div className="text-center space-y-3">
        {badge && (
          <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 text-[10px] font-mono font-bold px-3 py-1 rounded-[10px] uppercase tracking-widest">
            <span>{badge}</span>
          </span>
        )}
        <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
          <span>{title}</span>
        </h2>
        {subtitle && (
          <p className="text-text-muted text-sm max-w-xl mx-auto">
            <span>{subtitle}</span>
          </p>
        )}
      </div>

      <div className="space-y-4">
        {faqList.map((item, idx) => {
          const isOpen = openIndex === idx;
          const questionText = item.question || item.q;
          const answerText = item.answer || item.a;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              className={`rounded-[10px] border transition-all overflow-hidden shadow-sm ${
                isOpen
                  ? 'bg-[#111111] border-[#D4AF37]/40 shadow-[0_4px_25px_rgba(212,175,55,0.12)]'
                  : 'bg-[#0E1017] border-white/10 hover:border-[#D4AF37]/30 hover:bg-[#111111]'
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white cursor-pointer hover:text-[#D4AF37] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? 'text-[#D4AF37]' : 'text-text-muted'}`} />
                  <span>{questionText}</span>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <ChevronDown className={`w-5 h-5 shrink-0 ${isOpen ? 'text-[#D4AF37]' : 'text-text-muted'}`} />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-4 font-medium pl-12">
                      <span>{answerText}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
