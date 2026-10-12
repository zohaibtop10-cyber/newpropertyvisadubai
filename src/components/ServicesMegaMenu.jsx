import React, { useState, useMemo } from 'react';
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
  Search,
  Sparkles,
  Crown,
  Heart,
  ArrowRight,
  PhoneCall,
  Briefcase,
  Shield
} from 'lucide-react';
import { siteConfig } from '../data/cmsData';

export default function ServicesMegaMenu({
  isOpen,
  onClose,
  onOpenCalculator,
  onNavigate,
  cmsConfig
}) {
  const [activeCategoryTab, setActiveCategoryTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 6 Flagship Cards with Upgraded Story-Telling Colorful Icons
  const topFeatured = [
    {
      title: '10-Year Golden Visa',
      subtitle: 'Self-Sponsorship for Investors & Executives',
      icon: Crown,
      serviceId: 'golden-visa',
      price: 'AED 3,864',
      badge: '10-Yr Sovereign',
      category: 'golden',
      sla: '48H VIP SLA',
      iconBg: 'bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-slate-950 shadow-[0_4px_16px_rgba(245,208,97,0.45)]'
    },
    {
      title: 'Property Investor Visa',
      subtitle: 'DLD Real Estate Equity AED 750k+ / 2M+',
      icon: Building2,
      serviceId: 'property-visa',
      price: 'AED 6,311',
      badge: 'DLD Direct',
      category: 'golden',
      sla: 'Title Deed Audit',
      iconBg: 'bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 text-white shadow-[0_4px_16px_rgba(16,185,129,0.4)]'
    },
    {
      title: 'Family Residence Visa',
      subtitle: 'Spouse & Child Sponsorship File',
      icon: Heart,
      serviceId: 'family-visa',
      price: 'AED 1,103',
      badge: 'Family First',
      category: 'family',
      sla: 'Zero Overstay',
      iconBg: 'bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 text-white shadow-[0_4px_16px_rgba(244,63,94,0.4)]'
    },
    {
      title: 'Newborn Baby Visa',
      subtitle: '120-Day Fast-Track Registration',
      icon: Baby,
      serviceId: 'new-born-visa',
      price: 'AED 1,029',
      badge: '120-Day Grace',
      category: 'family',
      sla: 'Express Stamping',
      iconBg: 'bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 text-white shadow-[0_4px_16px_rgba(14,165,233,0.4)]'
    },
    {
      title: 'Maid & Domestic Staff',
      subtitle: 'Tadbeer Domestic Worker Sponsorship',
      icon: ShieldCheck,
      serviceId: 'maid-visa',
      price: 'AED 1,650',
      badge: 'Tadbeer Direct',
      category: 'family',
      sla: 'MOHRE Contract',
      iconBg: 'bg-gradient-to-br from-purple-500 via-violet-600 to-indigo-700 text-white shadow-[0_4px_16px_rgba(168,85,247,0.4)]'
    },
    {
      title: 'VIP Smart Salem & EID',
      subtitle: '30-Min AI Medical Screening & Biometrics',
      icon: Sparkles,
      serviceId: 'emirates-id',
      price: 'AED 2,500',
      badge: 'Smart Salem',
      category: 'corporate',
      sla: 'Same-Day Test',
      iconBg: 'bg-gradient-to-br from-cyan-400 via-teal-500 to-blue-600 text-white shadow-[0_4px_16px_rgba(6,182,212,0.4)]'
    }
  ];

  // Column 1: Corporate & Legal Services
  const corporateServices = [
    {
      title: 'Corporate PRO Services',
      subtitle: 'MOHRE Quotas, Establishment Cards & Renewals',
      icon: Briefcase,
      serviceId: 'pro-services',
      category: 'corporate',
      tag: 'MOHRE Verified',
      iconBg: 'bg-gradient-to-br from-indigo-500 via-indigo-600 to-blue-700 text-white shadow-[0_3px_12px_rgba(99,102,241,0.4)]'
    },
    {
      title: 'Official Amer Center Desk',
      subtitle: 'Government Electronic Typing & Entry Permit Filing',
      icon: Building,
      serviceId: 'amer-center',
      category: 'corporate',
      tag: 'GDRFA Direct',
      iconBg: 'bg-gradient-to-br from-orange-500 via-amber-600 to-orange-600 text-white shadow-[0_3px_12px_rgba(249,115,22,0.4)]'
    },
    {
      title: 'MOFA Attestation',
      subtitle: 'Degree, Marriage & Commercial Legalization',
      icon: FileCheck,
      serviceId: 'attestation',
      category: 'corporate',
      tag: 'Global MOFA',
      iconBg: 'bg-gradient-to-br from-teal-500 via-emerald-600 to-teal-700 text-white shadow-[0_3px_12px_rgba(20,184,166,0.4)]'
    },
    {
      title: 'Legal Arabic Translation',
      subtitle: 'Ministry of Justice (MOJ) Sworn Translation',
      icon: Languages,
      serviceId: 'translation',
      category: 'corporate',
      tag: 'MOJ Sworn',
      iconBg: 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 text-white shadow-[0_3px_12px_rgba(59,130,246,0.4)]'
    },
    {
      title: 'Power of Attorney (POA)',
      subtitle: 'Remote Digital & Notary Public Representation',
      icon: Scale,
      serviceId: 'poa',
      category: 'corporate',
      tag: 'Dubai Courts',
      iconBg: 'bg-gradient-to-br from-red-500 via-rose-600 to-red-700 text-white shadow-[0_3px_12px_rgba(239,68,68,0.4)]'
    },
    {
      title: 'Wills & DIFC Protection',
      subtitle: 'Non-Muslim Inheritance Registration',
      icon: Shield,
      serviceId: 'wills-testament',
      category: 'corporate',
      tag: 'DIFC Courts',
      iconBg: 'bg-gradient-to-br from-purple-600 via-violet-700 to-indigo-800 text-white shadow-[0_3px_12px_rgba(147,51,234,0.4)]'
    }
  ];

  // Column 2: DLD Trustee & Property Support
  const propertySupportServices = [
    {
      title: 'DLD Trustee Desk',
      subtitle: 'Official Property Transfer & Title Deed Updates',
      icon: Award,
      serviceId: 'dld-trustee',
      category: 'golden',
      tag: 'DLD Official',
      iconBg: 'bg-gradient-to-br from-emerald-500 via-teal-600 to-green-700 text-white shadow-[0_3px_12px_rgba(16,185,129,0.4)]'
    },
    {
      title: 'Property Revaluation',
      subtitle: 'DLD Golden Visa Property Valuation Letter',
      icon: Building2,
      serviceId: 'property-revaluation',
      category: 'golden',
      tag: 'Cube Verified',
      iconBg: 'bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 text-slate-950 shadow-[0_3px_12px_rgba(245,158,11,0.4)]'
    },
    {
      title: 'Medical Fitness & EID Express',
      subtitle: 'Fast-Track Typing & VIP Appointment Booking',
      icon: CreditCard,
      serviceId: 'medical-eid',
      category: 'family',
      tag: 'DHA Lounge',
      iconBg: 'bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 text-white shadow-[0_3px_12px_rgba(236,72,153,0.4)]'
    },
    {
      title: 'ILOE Unemployment Insurance',
      subtitle: 'Mandatory Federal Job Loss Scheme Filing',
      icon: ShieldCheck,
      serviceId: 'iloe-insurance',
      category: 'corporate',
      tag: 'Federal Law',
      iconBg: 'bg-gradient-to-br from-blue-500 via-cyan-600 to-blue-700 text-white shadow-[0_3px_12px_rgba(37,99,235,0.4)]'
    },
    {
      title: 'Visa Validity Check Desk',
      subtitle: 'GDRFA & ICP File Status & Fine Pre-Audit',
      icon: CheckCircle2,
      serviceId: 'visa-validity',
      category: 'family',
      tag: 'Free Audit',
      iconBg: 'bg-gradient-to-br from-teal-400 via-emerald-500 to-teal-600 text-white shadow-[0_3px_12px_rgba(20,184,166,0.4)]'
    }
  ];

  const allServicesList = [...topFeatured, ...corporateServices, ...propertySupportServices];

  // Search and Category Filter
  const filteredServices = useMemo(() => {
    return allServicesList.filter((s) => {
      const matchesCategory = activeCategoryTab === 'all' || s.category === activeCategoryTab;
      const matchesSearch =
        searchQuery.trim() === '' ||
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategoryTab, searchQuery]);

  const handleItemClick = (serviceId) => {
    onClose();
    if (onNavigate) {
      onNavigate('service', serviceId);
    }
  };

  const whatsappUrl = `https://wa.me/${cmsConfig?.global?.whatsappRaw || siteConfig?.whatsappRaw || '971586600396'}?text=${encodeURIComponent('Hello 800 DOCS LLC, I would like to inquire about your UAE residency and PRO consultant services.')}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
          style={{ fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif' }}
        >
          {/* Backdrop Click */}
          <div className="fixed inset-0" onClick={onClose} />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ type: 'spring', stiffness: 240, damping: 25 }}
            className="w-full max-w-[1020px] bg-[#FAF8F5] dark:bg-[#0D0B08] border border-[#DECFA8] dark:border-[#EFC45C]/35 rounded-[14px] shadow-[0_25px_80px_rgba(31,25,12,0.25),0_0_50px_rgba(239,196,92,0.18)] overflow-hidden flex flex-col max-h-[92vh] text-[#1F190C] dark:text-[#F3ECD9] my-auto relative z-10 transition-colors duration-300"
          >
            {/* Top 24K Radiant Gold Shimmer Accent Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#DBB24B] via-[#EFC45C] to-[#F7DE9C] shrink-0" />

            {/* Modal Header */}
            <div className="px-5 sm:px-7 py-4 border-b border-[#E8DFC8] dark:border-white/10 bg-[#FAF6ED] dark:bg-[#14120D] shrink-0 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-lg sm:text-xl tracking-tight text-[#1F190C] dark:text-white">
                    800 DOCS<span className="text-[#EFC45C]"> LLC</span>
                  </span>
                  <span className="bg-[#F6EED9] dark:bg-[#262116] text-[#8A6412] dark:text-[#EFC45C] border border-[#EFC45C]/40 text-[9px] uppercase font-bold px-2 py-0.5 rounded-[8px] flex items-center gap-1 shadow-xs font-mono">
                    <Sparkles className="w-2.5 h-2.5 text-[#EFC45C]" />
                    <span>Official Directory</span>
                  </span>
                </div>
                <p className="text-slate-600 dark:text-[#A99D84] text-xs mt-0.5 font-medium">
                  UAE Residency, Dubai Land Department (DLD) & Corporate PRO Services
                </p>
              </div>

              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={onClose}
                aria-label="Close menu"
                className="w-9 h-9 rounded-[10px] bg-white dark:bg-white/5 border border-[#DECFA8] dark:border-white/15 hover:border-[#EFC45C] hover:bg-[#F6EED9] dark:hover:bg-[#262116] text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Filter Bar: Category Tabs & Search Bar */}
            <div className="px-5 sm:px-7 py-3 bg-[#F4EEDF] dark:bg-[#120F0A] border-b border-[#E8DFC8] dark:border-white/10 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto hide-scrollbar">
                {[
                  { id: 'all', label: 'All Services' },
                  { id: 'golden', label: 'Golden & Property' },
                  { id: 'family', label: 'Family & Domestic' },
                  { id: 'corporate', label: 'Corporate PRO' }
                ].map((tab) => {
                  const isActive = activeCategoryTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveCategoryTab(tab.id)}
                      className={`px-3 py-1.5 rounded-[8px] text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                        isActive
                          ? 'bg-[#EFC45C] text-[#0B0A08] shadow-xs font-black'
                          : 'bg-white/70 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-[#F6EED9] dark:hover:bg-[#1E1A12] border border-[#E8DFC8]/60 dark:border-white/10'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white dark:bg-[#16130E] border border-[#E8DFC8] dark:border-white/15 rounded-[8px] pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#EFC45C]"
                />
              </div>
            </div>

            {/* Scrollable Grid Body */}
            <div className="p-4 sm:p-7 overflow-y-auto flex-1 bg-[#FAF8F5] dark:bg-[#0D0B08] space-y-6">
              {searchQuery.trim() === '' && activeCategoryTab === 'all' ? (
                <>
                  {/* Flagship Pathways Row */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8A6412] dark:text-[#EFC45C]">
                        FLAGSHIP RESIDENCY PATHWAYS
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 dark:text-[#A99D84]">
                        Click to view official tariffs &amp; requirements
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {topFeatured.map((item, idx) => {
                        const IconComp = item.icon;
                        return (
                          <motion.button
                            key={idx}
                            whileHover={{ y: -3, scale: 1.015 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleItemClick(item.serviceId)}
                            className="p-3.5 sm:p-4 rounded-[12px] border border-[#E8DFC8] dark:border-[#2A241A] bg-white dark:bg-[#14120D] hover:border-[#EFC45C] dark:hover:border-[#EFC45C] hover:shadow-[0_12px_32px_rgba(239,196,92,0.22)] ring-0 hover:ring-1 hover:ring-[#EFC45C]/40 transition-all flex items-start justify-between text-left group cursor-pointer relative overflow-hidden"
                          >
                            <div className="flex items-start gap-3 min-w-0 pr-2">
                              <div className={`w-11 h-11 rounded-[10px] ${item.iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-1 transition-all duration-300`}>
                                <IconComp className="w-5 h-5 stroke-[2.2]" />
                              </div>
                              <div className="truncate">
                                <span className="font-black text-xs sm:text-sm text-slate-900 dark:text-[#F3ECD9] group-hover:text-[#8A6412] dark:group-hover:text-[#EFC45C] transition-colors truncate block">
                                  {item.title}
                                </span>
                                <span className="text-[11px] text-slate-500 dark:text-[#A99D84] truncate block mt-0.5">
                                  {item.subtitle}
                                </span>
                                <span className="text-[10px] font-mono font-black text-emerald-700 dark:text-emerald-400 block mt-1.5">
                                  from {item.price}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2 shrink-0">
                              <span className="text-[9px] font-mono font-bold uppercase text-[#8A6412] dark:text-[#EFC45C] bg-[#F6EED9] dark:bg-[#262116] px-1.5 py-0.5 rounded-[4px] border border-[#EFC45C]/35">
                                {item.sla}
                              </span>
                              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#EFC45C] group-hover:translate-x-1 transition-all" />
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2-Column Corporate PRO & DLD Trustee Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {/* Column 1: Corporate & Legal */}
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between pb-1.5 border-b border-[#E8DFC8] dark:border-[#2A241A]">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-[2px] bg-[#EFC45C]" />
                          <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                            Corporate &amp; Government PRO
                          </h3>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">MOHRE &amp; MOFA</span>
                      </div>

                      <div className="space-y-1.5">
                        {corporateServices.map((srv, idx) => {
                          const IconComp = srv.icon;
                          return (
                            <motion.button
                              key={idx}
                              whileHover={{ x: 3 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => handleItemClick(srv.serviceId)}
                              className="w-full p-2.5 sm:p-3 rounded-[10px] border border-[#E8DFC8] dark:border-[#2A241A] bg-white dark:bg-[#14120D] hover:bg-[#FAF6ED] dark:hover:bg-[#1E1A12] hover:border-[#EFC45C]/70 hover:shadow-sm transition-all flex items-center justify-between text-left group cursor-pointer"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className={`w-8 h-8 rounded-[8px] ${srv.iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                                  <IconComp className="w-4 h-4 stroke-[2.2]" />
                                </div>
                                <div className="truncate">
                                  <span className="text-xs font-bold text-slate-900 dark:text-[#F3ECD9] group-hover:text-[#8A6412] dark:group-hover:text-[#EFC45C] transition-colors truncate block">
                                    {srv.title}
                                  </span>
                                  <span className="text-[10px] text-slate-500 dark:text-[#A99D84] truncate block">
                                    {srv.subtitle}
                                  </span>
                                </div>
                              </div>
                              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#EFC45C] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Column 2: DLD Trustee & Government Portals */}
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between pb-1.5 border-b border-[#E8DFC8] dark:border-[#2A241A]">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-[2px] bg-[#8A6412] dark:bg-[#EFC45C]" />
                          <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                            DLD Trustee &amp; Fast-Track Support
                          </h3>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">DLD &amp; GDRFA</span>
                      </div>

                      <div className="space-y-1.5">
                        {propertySupportServices.map((srv, idx) => {
                          const IconComp = srv.icon;
                          return (
                            <motion.button
                              key={idx}
                              whileHover={{ x: 3 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => handleItemClick(srv.serviceId)}
                              className="w-full p-2.5 sm:p-3 rounded-[10px] border border-[#E8DFC8] dark:border-[#2A241A] bg-white dark:bg-[#14120D] hover:bg-[#FAF6ED] dark:hover:bg-[#1E1A12] hover:border-[#EFC45C]/70 hover:shadow-sm transition-all flex items-center justify-between text-left group cursor-pointer"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className={`w-8 h-8 rounded-[8px] ${srv.iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                                  <IconComp className="w-4 h-4 stroke-[2.2]" />
                                </div>
                                <div className="truncate">
                                  <span className="text-xs font-bold text-slate-900 dark:text-[#F3ECD9] group-hover:text-[#8A6412] dark:group-hover:text-[#EFC45C] transition-colors truncate block">
                                    {srv.title}
                                  </span>
                                  <span className="text-[10px] text-slate-500 dark:text-[#A99D84] truncate block">
                                    {srv.subtitle}
                                  </span>
                                </div>
                              </div>
                              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#EFC45C] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* Filtered Results View */
                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold uppercase text-[#8A6412] dark:text-[#EFC45C]">
                    Matching Services ({filteredServices.length})
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredServices.map((srv, idx) => {
                      const IconComp = srv.icon;
                      return (
                        <motion.button
                          key={idx}
                          whileHover={{ y: -3, scale: 1.015 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleItemClick(srv.serviceId)}
                          className="p-3.5 rounded-[12px] border border-[#E8DFC8] dark:border-[#2A241A] bg-white dark:bg-[#14120D] hover:border-[#EFC45C] hover:shadow-[0_8px_24px_rgba(239,196,92,0.2)] transition-all flex items-start gap-3 text-left group cursor-pointer"
                        >
                          <div className={`w-10 h-10 rounded-[8px] ${srv.iconBg || 'bg-[#F6EED9] text-[#8A6412]'} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                            <IconComp className="w-5 h-5 stroke-[2.2]" />
                          </div>
                          <div className="truncate">
                            <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#EFC45C] transition-colors truncate block">
                              {srv.title}
                            </span>
                            <span className="text-[11px] text-slate-500 dark:text-[#A99D84] truncate block mt-0.5">
                              {srv.subtitle}
                            </span>
                            {srv.price && (
                              <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 block mt-1">
                                from {srv.price}
                              </span>
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Dual Action Bar */}
            <div className="p-3.5 sm:p-4 bg-[#FAF6ED] dark:bg-[#14120D] border-t border-[#E8DFC8] dark:border-white/10 flex flex-col sm:flex-row items-center gap-3 shrink-0 rounded-b-[14px]">
              {/* Visa Calculator Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onClose();
                  if (onOpenCalculator) onOpenCalculator('golden');
                }}
                className="w-full sm:w-1/2 py-3 px-4 btn-gold text-[#0B0A08] font-black text-xs sm:text-sm rounded-[10px] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_4px_16px_rgba(239,196,92,0.35)]"
              >
                <Calculator className="w-4 h-4 text-[#0B0A08] stroke-[2.5]" />
                <span>Calculate Official Visa Fees</span>
              </motion.button>

              {/* WhatsApp Button */}
              <motion.a
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-1/2 py-3 px-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-extrabold text-xs sm:text-sm rounded-[10px] flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-[0_4px_16px_rgba(37,211,102,0.25)]"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>Speak to Senior Case Officer</span>
              </motion.a>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
