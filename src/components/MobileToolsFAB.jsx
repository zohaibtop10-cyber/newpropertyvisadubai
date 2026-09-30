import React, { useState } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, X, Calculator, Box } from 'lucide-react';
import { siteConfig } from '../data/cmsData';

export default function MobileToolsFAB({ onOpenCalculator, onNavigate }) {
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  const toggleTools = () => {
    setIsToolsOpen(prev => !prev);
  };

  const handleCalculatorClick = () => {
    setIsToolsOpen(false);
    if (onOpenCalculator) onOpenCalculator('spouse');
  };

  const handleOtherToolsClick = () => {
    setIsToolsOpen(false);
    if (onNavigate) onNavigate('checklist');
  };

  const handleWhatsAppClick = () => {
    setIsToolsOpen(false);
    window.open(`https://wa.me/${siteConfig.whatsappRaw}`, '_blank');
  };

  return (
    <div className="flex md:hidden fixed bottom-6 right-6 z-50">
      <div className="relative">
        
        {/* Glassmorphic Pop-up Menu */}
        <AnimatePresence>
          {isToolsOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 15 }}
              transition={{ type: 'spring', stiffness: 140, damping: 16 }}
              className="absolute bottom-16 right-0 w-52 bg-surface/95 dark:bg-brand-surface/95 backdrop-blur-xl border border-border-subtle dark:border-white/15 rounded-xl shadow-2xl p-2 space-y-1.5 z-50 mb-2"
            >
              <div className="px-3 py-1 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                QUICK ACCESS TOOLS
              </div>

              {/* Item 1: Calculator */}
              <button
                onClick={handleCalculatorClick}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-elevated dark:hover:bg-surface/10 text-left transition-colors cursor-pointer group"
              >
                <div className="p-2 rounded-lg bg-brand-primary/10 text-brand-primary">
                  <Calculator className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-content-primary dark:text-white group-hover:text-brand-primary">
                    Calculator
                  </div>
                  <div className="text-[10px] text-content-muted dark:text-slate-400">
                    Instant fee estimate
                  </div>
                </div>
              </button>

              {/* Item 2: Other Tools (Document Checklist) */}
              <button
                onClick={handleOtherToolsClick}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-elevated dark:hover:bg-surface/10 text-left transition-colors cursor-pointer group"
              >
                <div className="p-2 rounded-lg bg-brand-gold/10 text-brand-gold">
                  <Box className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-content-primary dark:text-white group-hover:text-brand-primary">
                    Other Tools
                  </div>
                  <div className="text-[10px] text-content-muted dark:text-slate-400">
                    Document checklist
                  </div>
                </div>
              </button>

              {/* Item 3: WhatsApp */}
              <button
                onClick={handleWhatsAppClick}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-elevated dark:hover:bg-surface/10 text-left transition-colors cursor-pointer group"
              >
                <div className="p-2 rounded-lg bg-emerald-500/10 text-[#25D366]">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-content-primary dark:text-white group-hover:text-[#25D366]">
                    WhatsApp
                  </div>
                  <div className="text-[10px] text-content-muted dark:text-slate-400">
                    Direct advisory chat
                  </div>
                </div>
              </button>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Circular Floating Action Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTools}
          aria-label="Toggle Tools Menu"
          className="w-14 h-14 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-2xl shadow-[#D4AF37]/40 cursor-pointer relative z-50"
        >
          <AnimatePresence mode="wait">
            {isToolsOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="tools"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <LayoutGrid className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

      </div>
    </div>
  );
}
