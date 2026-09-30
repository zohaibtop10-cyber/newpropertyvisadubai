import React, { useState } from 'react';
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
  Stethoscope,
  Search,
  Shield,
  Sparkles,
  ArrowRight,
  Briefcase,
  Globe
} from 'lucide-react';
import { siteConfig } from '../data/cmsData';

export default function ServicesMegaMenu({
  isOpen,
  onClose,
  onOpenCalculator,
  onNavigate
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const topFeatured = [
    { title: 'Family Visa', subtitle: 'Spouse & Children', icon: Users, serviceId: 'family-visa', category: 'residency', tag: 'Popular' },
    { title: 'Golden Visa', subtitle: '10-Year Residency', icon: Award, serviceId: 'golden-visa', category: 'golden', tag: '10-Year VIP' },
    { title: 'Property Visa', subtitle: 'Real Estate Investor', icon: Building, serviceId: 'property-visa', category: 'golden', tag: 'DLD Direct' },
    { title: 'Newborn Visa', subtitle: 'UAE Born Infant', icon: Baby, serviceId: 'new-born-visa', category: 'residency', tag: 'Express' },
    { title: 'Maid Visa', subtitle: 'Nanny / Housemaid', icon: UserCheck, serviceId: 'maid-visa', category: 'residency', tag: 'Domestic' },
    { title: 'Emirates ID', subtitle: 'ICP Smart Card', icon: CreditCard, serviceId: 'emirates-id', category: 'residency', tag: 'Fast-Track' }
  ];

  const allServicesList = [
    { title: 'PRO Services', subtitle: 'Government Quota & File Opening', icon: FileText, serviceId: 'pro-services', category: 'corporate' },
    { title: 'Amer Center', subtitle: 'GDRFA Immigration Services', icon: Building2, serviceId: 'amer-center', category: 'residency' },
    { title: 'Document Attestation', subtitle: 'MOFA & Embassy Attestation', icon: CheckCircle2, serviceId: 'attestation', category: 'legal' },
    { title: 'Legal Translation', subtitle: 'Arabic Sworn Translation', icon: Languages, serviceId: 'translation', category: 'legal' },
    { title: 'Power of Attorney', subtitle: 'POA Drafting & Notary', icon: Scale, serviceId: 'poa', category: 'legal' },
    { title: 'Wills & Testament', subtitle: 'DIFC & Dubai Court Wills', icon: FileCheck, serviceId: 'wills-testament', category: 'legal' },
    { title: 'DLD Trustee Services', subtitle: 'Property Sale & Transfer NOC', icon: ShieldCheck, serviceId: 'dld-trustee', category: 'golden' },
    { title: 'Property Revaluation', subtitle: 'Official DLD Valuation Certificate', icon: Building, serviceId: 'property-revaluation', category: 'golden' },
    { title: 'Medical & EID Package', subtitle: 'DHA Medical Fitness & Biometrics', icon: Stethoscope, serviceId: 'medical-eid', category: 'residency' },
    { title: 'Visa Validity Checker', subtitle: 'ICP / GDRFA Status Audit', icon: Search, serviceId: 'visa-checker', category: 'residency' },
    { title: 'ILOE Insurance', subtitle: 'Mandatory Unemployment Shield', icon: Shield, serviceId: 'iloe-insurance', category: 'corporate' }
  ];

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'residency', label: 'Family & Residency' },
    { id: 'golden', label: 'Golden & Property' },
    { id: 'corporate', label: 'Business & PRO' },
    { id: 'legal', label: 'Attestation & Legal' }
  ];

  const handleItemClick = (serviceId) => {
    onClose();
    if (onNavigate) {
      onNavigate('service', serviceId);
    }
  };

  const filteredFeatured = topFeatured.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const filteredOthers = allServicesList.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            className="w-full max-w-[960px] bg-[#0c0e12] border-[1.5px] border-brand-gold/40 rounded-2xl shadow-[0_0_60px_rgba(212,175,55,0.2)] overflow-hidden flex flex-col max-h-[92vh] text-white my-auto relative"
          >
            {/* Gold Shimmer Top Accent Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#B8860B] via-[#F3E5AB] to-[#D4AF37] shrink-0" />

            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-white/10 bg-gradient-to-b from-[#16181f] to-[#0c0e12] shrink-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                    Emirates<span className="text-brand-gold">Prime</span>
                  </span>
                  <span className="bg-brand-gold/20 text-brand-gold border border-brand-gold/40 text-[10px] uppercase font-mono font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Service Directory
                  </span>
                </div>
                <p className="text-slate-400 text-xs mt-1 font-medium">
                  Official Dubai Residency, Business Setup & Legal Documentation
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                {/* Search Bar */}
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search services..."
                    className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-gold transition-colors font-medium"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs">
                      ×
                    </button>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  aria-label="Close mega menu"
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-gold/50 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Category Navigation Filter Tabs */}
            <div className="bg-[#12141a] px-4 sm:px-6 py-2.5 border-b border-white/5 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-brand-gold text-black shadow-md shadow-brand-gold/30'
                      : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Scrollable Main Content */}
            <div className="p-5 sm:p-7 space-y-6 overflow-y-auto flex-1 bg-gradient-to-b from-[#0c0e12] via-[#101217] to-[#0c0e12]">

              {/* Top Featured Services (Grid of Square Luxury Cards) */}
              {filteredFeatured.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-mono text-xs uppercase font-bold text-brand-gold tracking-widest flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Featured Flagship Services
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {filteredFeatured.map((item, idx) => {
                      const IconComp = item.icon;
                      return (
                        <motion.button
                          key={idx}
                          whileHover={{ y: -3, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleItemClick(item.serviceId)}
                          className="p-3.5 rounded-xl border border-white/10 bg-white/[0.03] hover:border-brand-gold hover:bg-brand-gold/10 hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] transition-all duration-300 flex flex-col items-center justify-center text-center group cursor-pointer relative overflow-hidden"
                        >
                          <span className="absolute top-1.5 right-1.5 text-[8px] font-mono font-bold text-brand-gold bg-brand-gold/10 px-1.5 py-0.5 rounded border border-brand-gold/20">
                            {item.tag}
                          </span>

                          <div className="w-10 h-10 rounded-xl bg-brand-gold/10 border border-brand-gold/30 text-brand-gold flex items-center justify-center mb-2.5 group-hover:scale-110 group-hover:bg-brand-gold group-hover:text-black transition-all">
                            <IconComp className="w-5 h-5" />
                          </div>

                          <span className="font-extrabold text-xs text-white group-hover:text-brand-gold transition-colors leading-tight mb-1">
                            {item.title}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium leading-snug line-clamp-1">
                            {item.subtitle}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* All Services Organized List */}
              {filteredOthers.length > 0 && (
                <div className="bg-white/[0.02] border border-white/10 p-5 rounded-2xl">
                  <h4 className="font-mono text-xs uppercase font-bold text-white tracking-wider flex items-center border-b border-white/5 pb-3 mb-3 gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-gold" />
                    Additional UAE Services & Solutions
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {filteredOthers.map((srv, idx) => {
                      const IconComponent = srv.icon;
                      return (
                        <motion.button
                          key={idx}
                          whileHover={{ x: 4, backgroundColor: 'rgba(212, 175, 55, 0.08)' }}
                          onClick={() => handleItemClick(srv.serviceId)}
                          className="w-full px-3.5 py-3 rounded-xl transition-all flex items-center justify-between text-left group cursor-pointer border border-white/5 hover:border-brand-gold/40"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-slate-400 group-hover:border-brand-gold/40 group-hover:bg-brand-gold/10 group-hover:text-brand-gold flex items-center justify-center shrink-0 transition-colors">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div className="truncate">
                              <div className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors truncate">
                                {srv.title}
                              </div>
                              <div className="text-[10px] text-slate-400 font-medium truncate">
                                {srv.subtitle}
                              </div>
                            </div>
                          </div>

                          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-brand-gold opacity-0 group-hover:opacity-100 transition-all shrink-0 ml-2" />
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {filteredFeatured.length === 0 && filteredOthers.length === 0 && (
                <div className="text-center py-12">
                  <Search className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400 font-medium text-sm">No matching services found for "{searchQuery}".</p>
                  <button onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} className="mt-3 text-xs text-brand-gold font-bold underline">
                    Clear Search Filters
                  </button>
                </div>
              )}

            </div>

            {/* Sticky Action Footer */}
            <div className="p-4 sm:p-5 bg-[#0e1015] border-t border-white/10 flex flex-row items-center justify-between gap-3 shrink-0">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onClose();
                  if (onOpenCalculator) onOpenCalculator();
                }}
                className="flex-1 px-4 py-3 bg-white/5 hover:bg-brand-gold/10 border-2 border-brand-gold/40 hover:border-brand-gold text-white font-extrabold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer text-xs sm:text-sm btn-shine-effect"
              >
                <Calculator className="w-4 h-4 text-brand-gold" />
                <span>Launch Visa Calculator</span>
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={siteConfig.whatsapp.link}
                target="_blank"
                rel="noreferrer"
                className="flex-1 px-4 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(37,211,102,0.3)] text-xs sm:text-sm"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>WhatsApp Instant Help</span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

