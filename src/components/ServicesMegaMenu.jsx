import React from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Users,
  Award,
  Building,
  Baby,
  UserCheck,
  CreditCard,
  ChevronRight,
  Calculator,
  FileText,
  Building2,
  CheckCircle2,
  Languages,
  Scale,
  FileCheck,
  ShieldCheck,
  TrendingUp,
  Stethoscope,
  Search,
  Shield,
  ArrowRight
} from 'lucide-react';
import { siteConfig } from '../data/cmsData';

export default function ServicesMegaMenu({
  isOpen,
  onClose,
  onOpenCalculator,
  onNavigate
}) {
  const topFeatured = [
    {
      title: 'Family Visa',
      icon: Users,
      bg: 'bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900/30',
      action: () => { onClose(); onNavigate('service', 'spouse-visa'); }
    },
    {
      title: 'Golden Visa',
      icon: Award,
      bg: 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/30',
      action: () => { onClose(); onNavigate('service', 'golden-visa'); }
    },
    {
      title: 'Property Visa',
      icon: Building,
      bg: 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/30',
      action: () => { onClose(); onNavigate('service', 'property-visa'); }
    },
    {
      title: 'Newborn Visa',
      icon: Baby,
      bg: 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/30',
      action: () => { onClose(); onNavigate('service', 'new-born'); }
    },
    {
      title: 'Maid Visa',
      icon: UserCheck,
      bg: 'bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-900/30',
      action: () => { onClose(); onNavigate('service', 'maid-visa'); }
    },
    {
      title: 'Emirates ID',
      icon: CreditCard,
      bg: 'bg-cyan-50 text-cyan-600 border-cyan-100 dark:bg-cyan-950/40 dark:text-cyan-400 dark:border-cyan-900/30',
      action: () => { onClose(); onNavigate('service', 'emirates-id'); }
    }
  ];

  const column1Services = [
    { title: 'Corporate PRO Services', icon: FileText, serviceId: 'pro-services' },
    { title: 'Business Setup & Licensing', icon: Building2, serviceId: 'business-setup' },
    { title: 'Document Attestation (MOFA)', icon: CheckCircle2, serviceId: 'attestation' },
    { title: 'Legal Translation (Arabic)', icon: Languages, serviceId: 'legal-translation' },
    { title: 'Power of Attorney (Notary)', icon: Scale, serviceId: 'power-of-attorney' },
    { title: 'Wills & Estate Planning', icon: FileCheck, serviceId: 'wills-testament' }
  ];

  const column2Services = [
    { title: 'DLD Trustee & Revaluation', icon: ShieldCheck, serviceId: 'dld-trustee' },
    { title: 'VIP Medical Fitness (30-Min)', icon: Stethoscope, serviceId: 'medical-fitness' },
    { title: 'Amer Services at Home', icon: Building2, serviceId: 'amer-services' },
    { title: 'Health Insurance (DHA)', icon: ShieldCheck, serviceId: 'health-insurance' },
    { title: 'ILOE Unemployment Cover', icon: Shield, serviceId: 'iloe-insurance' },
    { title: 'Visa Status & Overstay Fines', icon: Search, serviceId: 'visa-status' }
  ];

  const handleItemClick = (serviceId) => {
    onClose();
    if (onNavigate) {
      onNavigate('service', serviceId);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md overflow-y-auto"
        >
          {/* Modal Container with Spring Physics */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', stiffness: 80, damping: 15 }}
            className="w-full max-w-4xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden relative my-auto text-slate-900 dark:text-white transition-colors duration-200 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-white dark:bg-[#141414] sticky top-0 z-20">
              <div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white tracking-tight leading-none">
                  Property Visa Dubai
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  All services in one place
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                aria-label="Close mega menu"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-600 dark:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Scrollable Body Content */}
            <div className="p-5 sm:p-8 space-y-8 overflow-y-auto flex-1">
              
              {/* Top Featured Row (Square Cards) */}
              <div>
                <div className="text-xs font-mono font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
                  PRIMARY VISA TRACKS
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {topFeatured.map((item, idx) => {
                    const IconComp = item.icon;
                    return (
                      <motion.button
                        key={idx}
                        whileHover={{ y: -4, scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                        onClick={item.action}
                        className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#1A1A1A] hover:bg-slate-50 dark:hover:bg-white/10 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col items-center justify-center text-center group cursor-pointer"
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2.5 transition-transform group-hover:scale-110 border ${item.bg}`}>
                          <IconComp className="w-6 h-6" />
                        </div>
                        <span className="font-display font-bold text-xs text-slate-900 dark:text-white group-hover:text-[#E01E37] transition-colors leading-tight">
                          {item.title}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Promotional Conversion Banners */}
              <div className="grid sm:grid-cols-2 gap-4">
                
                {/* Promo 1: Golden Visa Package */}
                <motion.div
                  whileHover={{ y: -3, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { onClose(); onNavigate('service', 'golden-visa'); }}
                  className="p-5 rounded-2xl border border-amber-200 dark:border-amber-900/40 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent relative overflow-hidden group cursor-pointer hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
                      alt="Professional Couple"
                      className="w-14 h-14 rounded-xl object-cover border border-amber-300 dark:border-amber-800 shrink-0"
                    />
                    <div className="space-y-1.5 flex-1">
                      <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded uppercase">
                        10-YEAR GOLDEN VISA PROMO
                      </span>
                      <p className="text-xs font-semibold text-slate-900 dark:text-white leading-snug">
                        10-year residency from AED 11,553 all-inclusive, approvals in 24 hours.
                      </p>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#E01E37] group-hover:underline pt-0.5">
                        <span>See packages</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Promo 2: Medical + Emirates ID */}
                <motion.div
                  whileHover={{ y: -3, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { onClose(); onNavigate('service', 'emirates-id'); }}
                  className="p-5 rounded-2xl border border-emerald-200 dark:border-emerald-900/40 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent relative overflow-hidden group cursor-pointer hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=200&q=80"
                      alt="Executive Group"
                      className="w-14 h-14 rounded-xl object-cover border border-emerald-300 dark:border-emerald-800 shrink-0"
                    />
                    <div className="space-y-1.5 flex-1">
                      <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded uppercase">
                        VIP MEDICAL & EID TYPING
                      </span>
                      <p className="text-xs font-semibold text-slate-900 dark:text-white leading-snug">
                        VIP medical in 30 minutes (AED 750) and typing included with every ID.
                      </p>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:underline pt-0.5">
                        <span>View fees</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </motion.div>

              </div>

              {/* Bottom Section: Two Columns */}
              <div className="grid md:grid-cols-2 gap-6 pt-2">
                
                {/* Column 1: Other Services */}
                <div className="space-y-3">
                  <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white flex items-center">
                    <span className="w-2 h-2 rounded-full bg-[#E01E37] inline-block mr-2" />
                    Other Services
                  </h4>

                  <div className="space-y-2">
                    {column1Services.map((srv, idx) => {
                      const IconComponent = srv.icon;
                      return (
                        <motion.button
                          key={idx}
                          whileHover={{ x: 5 }}
                          onClick={() => handleItemClick(srv.serviceId)}
                          className="w-full p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#1A1A1A] hover:bg-slate-50 dark:hover:bg-white/5 transition-all flex items-center justify-between text-left group cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 group-hover:text-[#E01E37] group-hover:bg-[#E01E37]/10 transition-colors">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-[#E01E37] transition-colors">
                              {srv.title}
                            </span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Column 2: Property & Support */}
                <div className="space-y-3">
                  <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white flex items-center">
                    <span className="w-2 h-2 rounded-full bg-[#E01E37] inline-block mr-2" />
                    Property & Support
                  </h4>

                  <div className="space-y-2">
                    {column2Services.map((srv, idx) => {
                      const IconComponent = srv.icon;
                      return (
                        <motion.button
                          key={idx}
                          whileHover={{ x: 5 }}
                          onClick={() => handleItemClick(srv.serviceId)}
                          className="w-full p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#1A1A1A] hover:bg-slate-50 dark:hover:bg-white/5 transition-all flex items-center justify-between text-left group cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 group-hover:text-[#E01E37] group-hover:bg-[#E01E37]/10 transition-colors">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-[#E01E37] transition-colors">
                              {srv.title}
                            </span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>

            {/* Sticky Bottom Bar */}
            <div className="p-4 bg-white dark:bg-[#141414] border-t-2 border-[#E01E37] flex items-center gap-3 shadow-lg sticky bottom-0 z-20">
              <div className="grid grid-cols-2 gap-3 w-full">
                
                {/* White Button with Red Outline: Visa Calculator */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onClose();
                    if (onOpenCalculator) onOpenCalculator('spouse');
                  }}
                  className="flex items-center justify-center gap-2 border-2 border-[#E01E37] bg-white dark:bg-transparent text-[#E01E37] hover:bg-[#E01E37]/5 font-display font-bold text-xs sm:text-sm py-3 rounded-xl transition-all cursor-pointer shadow-sm"
                >
                  <Calculator className="w-4 h-4 text-[#E01E37]" />
                  <span>Visa Calculator</span>
                </motion.button>

                {/* Solid Green Button: WhatsApp */}
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={`https://wa.me/${siteConfig.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-display font-bold text-xs sm:text-sm py-3 rounded-xl transition-all shadow-md shadow-emerald-600/20"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>WhatsApp</span>
                </motion.a>

              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
