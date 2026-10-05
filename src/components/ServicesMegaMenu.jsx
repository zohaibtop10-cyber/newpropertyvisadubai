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
  TrendingUp,
  MapPin,
  Clock,
  IdCard,
  Briefcase
} from 'lucide-react';
import { siteConfig } from '../data/cmsData';

const ICON_MAP = {
  Building, Award, Users, Baby, UserCheck, CreditCard,
  FileText, Building2, CheckCircle2, Languages, Scale, FileCheck,
  ShieldCheck, Stethoscope, Search, Shield, Sparkles, ArrowRight,
  TrendingUp, MapPin, Clock, IdCard, Briefcase
};

const getIconComp = (iconName, fallback = Building) => {
  if (typeof iconName === 'function') return iconName;
  if (typeof iconName === 'string' && ICON_MAP[iconName]) return ICON_MAP[iconName];
  return fallback;
};

export default function ServicesMegaMenu({
  isOpen,
  onClose,
  onOpenCalculator,
  onNavigate,
  cmsConfig
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const defaultTopFeatured = [
    { title: 'Property Visa', subtitle: 'DLD Real Estate Investor', icon: 'Building', serviceId: 'property-visa', category: 'golden', price: 'AED 2,150' },
    { title: 'Golden Visa', subtitle: '10-Year Residency VIP', icon: 'Award', serviceId: 'golden-visa', category: 'golden', price: 'AED 2,450' },
    { title: 'Family Visa', subtitle: 'Spouse & Children Clearance', icon: 'Users', serviceId: 'family-visa', category: 'residency', price: 'AED 1,450' },
    { title: 'Newborn Visa', subtitle: '120-Day Fast Clearance', icon: 'Baby', serviceId: 'new-born-visa', category: 'residency', price: 'AED 1,250' },
    { title: 'Maid Visa', subtitle: 'Domestic Helper Quota', icon: 'UserCheck', serviceId: 'maid-visa', category: 'residency', price: 'AED 1,650' },
    { title: 'Emirates ID', subtitle: 'VIP Medical & Biometrics', icon: 'CreditCard', serviceId: 'emirates-id', category: 'residency', price: 'AED 390' }
  ];

  const defaultAllServices = [
    { title: 'PRO Services', subtitle: 'MOHRE Quota & Trade License Renewal', icon: 'FileText', serviceId: 'pro-services', category: 'corporate' },
    { title: 'Amer Center GDRFA', subtitle: 'Official Typing & Entry Permit Desk', icon: 'Building2', serviceId: 'amer-center', category: 'residency' },
    { title: 'Document Attestation', subtitle: 'MOFA & Foreign Embassy Verification', icon: 'CheckCircle2', serviceId: 'attestation', category: 'legal' },
    { title: 'Legal Translation', subtitle: 'MOJ Sworn Multi-Language Translation', icon: 'Languages', serviceId: 'translation', category: 'legal' },
    { title: 'Power of Attorney', subtitle: 'POA Drafting & Notary Representation', icon: 'Scale', serviceId: 'poa', category: 'legal' },
    { title: 'Wills & Testament', subtitle: 'DIFC & Dubai Courts Asset Protection', icon: 'FileCheck', serviceId: 'wills-testament', category: 'legal' },
    { title: 'DLD Trustee Services', subtitle: 'Property Sale & Transfer Title Clearance', icon: 'ShieldCheck', serviceId: 'dld-trustee', category: 'golden' },
    { title: 'Property Revaluation', subtitle: 'Official DLD Valuation Certificate', icon: 'TrendingUp', serviceId: 'property-revaluation', category: 'golden' },
    { title: 'Medical & EID Package', subtitle: 'VIP DHA Medical Fitness & EIDA Typing', icon: 'Stethoscope', serviceId: 'medical-eid', category: 'residency' },
    { title: 'Visa Validity Checker', subtitle: 'ICP & GDRFA Overstay Status Audit', icon: 'Clock', serviceId: 'visa-checker', category: 'residency' },
    { title: 'ILOE Insurance', subtitle: 'Mandatory UAE Unemployment Shield', icon: 'Shield', serviceId: 'iloe-insurance', category: 'corporate' }
  ];

  const defaultCategories = [
    { id: 'all', label: 'All Services' },
    { id: 'residency', label: 'Family & Residency' },
    { id: 'golden', label: 'Golden & Property' },
    { id: 'corporate', label: 'Business & PRO' },
    { id: 'legal', label: 'Attestation & Legal' }
  ];

  const rawTopFeatured = cmsConfig?.megaMenu?.topFeatured || defaultTopFeatured;
  const topFeatured = rawTopFeatured.map(item => ({
    ...item,
    icon: getIconComp(item.icon, Building)
  }));

  const rawAllServicesList = cmsConfig?.megaMenu?.allServicesList || defaultAllServices;
  const allServicesList = rawAllServicesList.map(item => ({
    ...item,
    icon: getIconComp(item.icon, FileText)
  }));

  const categories = cmsConfig?.megaMenu?.categories || defaultCategories;

  const handleItemClick = (serviceId) => {
    onClose();
    if (onNavigate) {
      onNavigate('service', serviceId);
    }
  };

  const filteredFeatured = (topFeatured || []).filter(item => {
    if (!item) return false;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const filteredOthers = (allServicesList || []).filter(item => {
    if (!item) return false;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const whatsappUrl = siteConfig.whatsapp?.link || `https://wa.me/${siteConfig.whatsappRaw || '971566556645'}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: 'spring', stiffness: 140, damping: 20 }}
            className="w-full max-w-[1050px] bg-[#0A0B0E] border border-[#D4AF37]/30 rounded-[10px] shadow-[0_0_80px_rgba(212,175,55,0.2)] overflow-hidden flex flex-col max-h-[92vh] text-white my-auto relative"
          >
            {/* Top Metallic Gold Accent Border */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#8C5E00] via-[#D4AF37] to-[#F3E5AB] shrink-0" />

            {/* Header Section */}
            <div className="p-4 sm:p-6 border-b border-white/10 bg-gradient-to-b from-[#14161F] to-[#0A0B0E] shrink-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-[#D4AF37]">
                    <span>{siteConfig.brandName || 'EmiratesPrime'}</span>
                  </span>
                  <span className="bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40 text-[10px] uppercase font-mono font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                    <Sparkles className="w-3 h-3" /> <span>GDRFA & DET Directory</span>
                  </span>
                </div>
                <p className="text-slate-400 text-xs mt-1 font-medium">
                  <span>Official Dubai Residency, Business Setup & Legal Documentation</span>
                </p>
              </div>

              {/* Header Right: Search & Close Button */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search services..."
                    className="w-full pl-9 pr-8 py-2 bg-white/5 border border-white/10 rounded-[10px] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all font-medium"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs w-4 h-4 rounded-full bg-white/10 flex items-center justify-center cursor-pointer"
                    >
                      ×
                    </button>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  aria-label="Close mega menu"
                  className="w-9 h-9 rounded-[10px] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#D4AF37]/50 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Category Navigation Filter Tabs */}
            <div className="bg-[#0E1017] px-4 sm:px-6 py-3 border-b border-white/10 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-[10px] text-xs font-black whitespace-nowrap transition-all cursor-pointer ${isActive
                      ? 'bg-dark-gold-gloss text-black shadow-[0_0_20px_rgba(212,175,55,0.3)] scale-105'
                      : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5'
                      }`}
                  >
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Scrollable Main Content */}
            <div className="p-5 sm:p-7 space-y-7 overflow-y-auto flex-1 bg-gradient-to-b from-[#0A0B0E] via-[#0E1017] to-[#0A0B0E]">

              {/* 1. Top Featured Services (Grid of 6 Luxury Glass Cards) */}
              {filteredFeatured.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <h4 className="font-mono text-xs uppercase font-extrabold text-[#D4AF37] tracking-widest flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                      <span>Featured Flagship Services</span>
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono">
                      <span>{filteredFeatured.length} Flagships</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
                    {filteredFeatured.map((item, idx) => {
                      const IconComp = item.icon;
                      return (
                        <motion.button
                          key={idx}
                          whileHover={{ y: -4, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleItemClick(item.serviceId)}
                          className="p-3.5 rounded-[10px] border border-white/10 bg-[#111319] hover:border-[#D4AF37] hover:bg-gradient-to-b hover:from-[#1A1D27] hover:to-[#D4AF37]/15 hover:shadow-[0_0_25px_rgba(212,175,55,0.25)] transition-all duration-300 flex flex-col items-center justify-between text-center group cursor-pointer relative overflow-hidden min-h-[165px]"
                        >
                          {item.tag && (
                            <span className="absolute top-2 right-2 text-[8px] font-mono font-bold text-[#D4AF37] bg-[#D4AF37]/15 px-2 py-0.5 rounded-[6px] border border-[#D4AF37]/30 shadow-sm">
                              <span>{item.tag}</span>
                            </span>
                          )}

                          <div className="w-11 h-11 rounded-[10px] bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center mt-2 group-hover:scale-110 group-hover:bg-dark-gold-gloss group-hover:text-black transition-all shadow-md">
                            <IconComp className="w-5.5 h-5.5" />
                          </div>

                          <div className="my-2">
                            <span className="font-extrabold text-xs text-white group-hover:text-[#D4AF37] transition-colors leading-snug block">
                              {item.title}
                            </span>
                            <span className="text-[10px] text-slate-400 group-hover:text-slate-200 font-medium leading-snug block mt-0.5 line-clamp-1">
                              {item.subtitle}
                            </span>
                          </div>

                          {item.price && (
                            <span className="text-[9px] font-mono font-extrabold text-emerald-400 bg-emerald-500/15 border border-emerald-400/30 px-2 py-0.5 rounded-[6px] mt-auto">
                              <span>{item.price}</span>
                            </span>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 2. All Services Organized List */}
              {filteredOthers.length > 0 && (
                <div className="bg-white/[0.02] border border-white/10 p-5 sm:p-6 rounded-[10px]">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3.5 mb-4">
                    <h4 className="font-mono text-xs uppercase font-extrabold text-white tracking-wider flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
                      <span>Additional UAE Services & Concierge</span>
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono">
                      <span>{filteredOthers.length} Services</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredOthers.map((srv, idx) => {
                      const IconComponent = srv.icon;
                      return (
                        <motion.button
                          key={idx}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleItemClick(srv.serviceId)}
                          className="w-full p-3.5 rounded-[10px] transition-all flex items-center justify-between text-left group cursor-pointer border border-white/10 bg-[#111319] hover:bg-[#1A1D27] hover:border-[#D4AF37]/60 shadow-sm"
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <div className="w-9 h-9 rounded-[8px] bg-white/5 border border-white/10 text-slate-400 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/20 group-hover:text-[#D4AF37] flex items-center justify-center shrink-0 transition-all shadow-sm">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div className="truncate">
                              <span className="text-xs font-extrabold text-slate-200 group-hover:text-white transition-colors truncate block leading-tight">
                                {srv.title}
                              </span>
                              <span className="text-[10px] text-slate-400 group-hover:text-slate-300 font-medium truncate block mt-0.5">
                                {srv.subtitle}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 ml-2">
                            {srv.badge && (
                              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/15 border border-emerald-400/30 px-2 py-0.5 rounded-[6px] hidden sm:inline">
                                <span>{srv.badge}</span>
                              </span>
                            )}
                            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-[#D4AF37] group-hover:translate-x-1.5 transition-all" />
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* No Results Found State */}
              {filteredFeatured.length === 0 && filteredOthers.length === 0 && (
                <div className="text-center py-14 bg-white/[0.02] border border-white/5 rounded-[10px]">
                  <Search className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400 font-medium text-sm">
                    <span>No matching services found for "{searchQuery}".</span>
                  </p>
                  <button
                    onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                    className="mt-3 text-xs text-[#D4AF37] font-bold underline cursor-pointer hover:text-amber-300 transition-colors"
                  >
                    <span>Clear Search Filters</span>
                  </button>
                </div>
              )}

            </div>

            {/* Sticky Action Footer */}
            <div className="p-4 sm:p-5 bg-[#08090C] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 rounded-b-[10px]">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onClose();
                  if (onOpenCalculator) onOpenCalculator('spouse');
                }}
                className="w-full sm:w-1/2 py-3.5 px-4 bg-dark-gold-gloss text-black font-black text-xs sm:text-sm rounded-[10px] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:brightness-110"
              >
                <Calculator className="w-4 h-4 text-black" />
                <span>Visa Calculator</span>
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-1/2 py-3.5 px-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-extrabold text-xs sm:text-sm rounded-[10px] flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-[0_4px_20px_rgba(37,211,102,0.3)]"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>WhatsApp Senior Advisor</span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
