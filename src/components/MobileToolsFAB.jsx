import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, X, Calculator, Box, MessageSquare } from 'lucide-react';
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
              className="absolute bottom-16 right-0 w-52 bg-white/95 dark:bg-[#141414]/95 backdrop-blur-xl border border-slate-200 dark:border-white/15 rounded-2xl shadow-2xl p-2 space-y-1.5 z-50 mb-2"
            >
              <div className="px-3 py-1 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                QUICK ACCESS TOOLS
              </div>

              {/* Item 1: Calculator */}
              <button
                onClick={handleCalculatorClick}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 text-left transition-colors cursor-pointer group"
              >
                <div className="p-2 rounded-lg bg-[#E01E37]/10 text-[#E01E37]">
                  <Calculator className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#E01E37]">
                    Calculator
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    Instant fee estimate
                  </div>
                </div>
              </button>

              {/* Item 2: Other Tools (Document Checklist) */}
              <button
                onClick={handleOtherToolsClick}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 text-left transition-colors cursor-pointer group"
              >
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                  <Box className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#E01E37]">
                    Other Tools
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    Document checklist
                  </div>
                </div>
              </button>

              {/* Item 3: WhatsApp */}
              <button
                onClick={handleWhatsAppClick}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 text-left transition-colors cursor-pointer group"
              >
                <div className="p-2 rounded-lg bg-emerald-500/10 text-[#25D366]">
                  <MessageSquare className="w-4 h-4 fill-[#25D366] stroke-none" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#25D366]">
                    WhatsApp
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
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
          className="w-14 h-14 rounded-full bg-[#E01E37] text-white flex items-center justify-center shadow-2xl shadow-[#E01E37]/40 cursor-pointer relative z-50"
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
