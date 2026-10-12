'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Heart, 
  Crown, 
  Building2, 
  Users, 
  Baby, 
  Stethoscope, 
  FileCheck, 
  Languages, 
  Scale, 
  ShieldCheck, 
  Briefcase, 
  ArrowRight, 
  Sparkles,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- MOCK SERVICES DATA ARRAY FOR CMS / DIRECTORY INTEGRATION ---
export const servicesList = [
  {
    id: 'spouse-residency-visa',
    slug: 'spouse-residency-visa',
    title: 'Spouse Residence Visa',
    subtitle: 'Sponsor your husband or wife for a 2-year UAE residence visa with full GDRFA & medical clearance.',
    category: 'Family & Residency',
    price: 'From AED 3,650',
    iconName: 'Heart',
    tag: 'Popular',
    processingTime: '3-5 Days'
  },
  {
    id: 'child-parent-visa',
    slug: 'child-parent-visa',
    title: 'Children & Parents Visa',
    subtitle: 'Comprehensive family sponsorship for dependants and parents with EJARI & salary compliance.',
    category: 'Family & Residency',
    price: 'From AED 4,200',
    iconName: 'Users',
    tag: 'Family',
    processingTime: '5-7 Days'
  },
  {
    id: 'golden-visa-property',
    slug: 'golden-visa-property',
    title: '10-Year Real Estate Golden Visa',
    subtitle: 'Long-term self-sponsored residency for Dubai property owners holding AED 2M+ equity title deed.',
    category: 'Golden & Property',
    price: 'From AED 9,800',
    iconName: 'Crown',
    tag: '10-Year VIP',
    processingTime: '24-48 Hours'
  },
  {
    id: 'golden-visa-executive',
    slug: 'golden-visa-executive',
    title: '10-Year High Earner Golden Visa',
    subtitle: 'Specialized Golden Visa pathway for executives, engineers, and directors with AED 30k+ monthly salary.',
    category: 'Golden & Property',
    price: 'From AED 8,500',
    iconName: 'Sparkles',
    tag: 'Executive Tier',
    processingTime: '48 Hours'
  },
  {
    id: 'maid-domestic-worker',
    slug: 'maid-domestic-worker',
    title: 'Maid & Domestic Worker Visa',
    subtitle: 'MOHRE & Tadbeer compliant sponsorship for housemaids, nannies, private drivers, and cooks.',
    category: 'Family & Residency',
    price: 'From AED 5,100',
    iconName: 'ShieldCheck',
    tag: 'MOHRE Certified',
    processingTime: '5-7 Days'
  },
  {
    id: 'newborn-baby-visa',
    slug: 'newborn-baby-visa',
    title: 'Newborn Baby Visa & ID',
    subtitle: 'Complete UAE birth certificate processing, passport entry permit, and Emirates ID delivery.',
    category: 'Family & Residency',
    price: 'From AED 2,800',
    iconName: 'Baby',
    tag: 'Urgent',
    processingTime: '3 Days'
  },
  {
    id: 'mainland-business-setup',
    slug: 'mainland-business-setup',
    title: 'Dubai Mainland Company Setup',
    subtitle: 'Establish your LLC with DET commercial license, corporate bank account support, and office space.',
    category: 'Business & PRO',
    price: 'From AED 12,500',
    iconName: 'Building2',
    tag: 'Complete LLC',
    processingTime: '1-3 Days'
  },
  {
    id: 'corporate-pro-services',
    slug: 'corporate-pro-services',
    title: 'Corporate PRO & Retainer',
    subtitle: 'Outsourced government liaison for trade license renewals, establishment cards, and quota approvals.',
    category: 'Business & PRO',
    price: 'From AED 2,500 / mo',
    iconName: 'Briefcase',
    tag: 'B2B Retainer',
    processingTime: 'Instant'
  },
  {
    id: 'mofa-attestation',
    slug: 'mofa-attestation',
    title: 'MOFA & Embassy Attestation',
    subtitle: 'Home country legalization and UAE Ministry of Foreign Affairs stamps for marriage & birth certs.',
    category: 'Attestation & Legal',
    price: 'From AED 450',
    iconName: 'FileCheck',
    tag: 'Legalization',
    processingTime: '2-4 Days'
  },
  {
    id: 'arabic-legal-translation',
    slug: 'arabic-legal-translation',
    title: 'Sworn Arabic Legal Translation',
    subtitle: 'Ministry of Justice certified Arabic translations required by GDRFA, courts, and government bodies.',
    category: 'Attestation & Legal',
    price: 'From AED 150 / page',
    iconName: 'Languages',
    tag: 'MOJ Certified',
    processingTime: 'Same-Day'
  },
  {
    id: 'vip-medical-emirates-id',
    slug: 'vip-medical-emirates-id',
    title: 'VIP Smart Medical & Biometrics',
    subtitle: 'Queue-free 30-minute DHA medical fitness test with escorted biometrics and express ID printing.',
    category: 'Emirates ID & Medical',
    price: 'From AED 1,200',
    iconName: 'Stethoscope',
    tag: 'Fast-Track',
    processingTime: '30 Mins Result'
  },
  {
    id: 'dld-trustee-support',
    slug: 'dld-trustee-support',
    title: 'DLD Trustee & Property Endorsement',
    subtitle: 'Dubai Land Department property evaluation letters, trustee representation, and title deed updates.',
    category: 'Golden & Property',
    price: 'From AED 3,200',
    iconName: 'Scale',
    tag: 'DLD Trustee',
    processingTime: '1-2 Days'
  }
];

// Icon mapping dictionary
const iconMap = {
  Heart: Heart,
  Users: Users,
  Crown: Crown,
  Sparkles: Sparkles,
  ShieldCheck: ShieldCheck,
  Baby: Baby,
  Building2: Building2,
  Briefcase: Briefcase,
  FileCheck: FileCheck,
  Languages: Languages,
  Stethoscope: Stethoscope,
  Scale: Scale
};

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Services');

  const categories = [
    'All Services',
    'Family & Residency',
    'Golden & Property',
    'Business & PRO',
    'Attestation & Legal',
    'Emirates ID & Medical'
  ];

  // Filtered Services Computation
  const filteredServices = useMemo(() => {
    return servicesList.filter((service) => {
      const matchesCategory = selectedCategory === 'All Services' || service.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !query || 
        service.title.toLowerCase().includes(query) || 
        service.subtitle.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-brand-goldBg selection:text-black pb-24">
      
      {/* 1. HERO & SEARCH HEADER */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 px-6 overflow-hidden border-b border-white/10">
        {/* Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-brand-goldBg/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#1a1a1a] border border-brand-goldBg/30 text-brand-goldText px-4 py-1.5 rounded-[10px] text-xs font-bold uppercase tracking-wider mb-6 shadow-md"
          >
            <Sparkles className="w-4 h-4 text-brand-goldText" />
            DET & GDRFA Compliant Directory
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6"
          >
            Our Premium UAE Services
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto mb-10"
          >
            End-to-end management for residency, golden visas, and corporate legal documentation.
          </motion.p>

          {/* Search Bar Input */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative max-w-2xl mx-auto"
          >
            <div className="relative flex items-center">
              <Search className="absolute left-5 w-5 h-5 text-brand-goldText pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services by keyword (e.g. Spouse, Golden Visa, MOFA)..."
                className="w-full bg-[#111111] border border-white/10 rounded-[10px] text-white placeholder:text-text-muted pl-14 pr-12 py-4 focus:border-brand-goldBg/60 focus:outline-none transition-all duration-300 shadow-2xl text-base"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 p-1.5 text-text-muted hover:text-white bg-surface/5 hover:bg-surface/10 rounded-[10px] transition-colors"
                  aria-label="Clear Search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. CATEGORY FILTER TABS */}
      <section className="py-8 px-6 border-b border-white/10 bg-[#080808]/80 sticky top-16 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-brand-goldBg/10 border border-brand-goldBg/50 text-brand-goldText px-6 py-2.5 rounded-[10px] text-sm font-semibold shadow-md shadow-brand-goldBg/5'
                      : 'bg-transparent border border-white/10 text-text-muted hover:text-slate-200 hover:bg-surface/5 px-6 py-2.5 rounded-[10px] text-sm font-medium'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. THE SERVICES GRID */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Active Filter Indicator */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
            <div className="text-sm text-text-muted font-medium">
              Showing <span className="text-brand-goldText font-bold">{filteredServices.length}</span> services 
              {selectedCategory !== 'All Services' && <span> under <span className="text-white font-semibold">{selectedCategory}</span></span>}
            </div>

            {(searchQuery || selectedCategory !== 'All Services') && (
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('All Services'); }}
                className="text-xs font-semibold text-brand-goldText hover:underline flex items-center gap-1 cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Grid Layout */}
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {filteredServices.map((service, index) => {
                  const IconComponent = iconMap[service.iconName] || Heart;

                  return (
                    <motion.div
                      key={service.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <a
                        href={`/services/${service.slug}`}
                        className="bg-[#111111] border border-white/5 rounded-[10px] p-6 hover:border-brand-goldBg/40 hover:bg-[#151515] hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between h-full shadow-lg relative overflow-hidden block"
                      >
                        {/* Top Badge (Optional Tag) */}
                        {service.tag && (
                          <div className="absolute top-4 right-4 bg-[#1a1a1a] border border-white/10 text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded-[10px] group-hover:border-brand-goldBg/30 group-hover:text-brand-goldText transition-colors">
                            {service.tag}
                          </div>
                        )}

                        <div>
                          {/* Icon Wrapper */}
                          <div className="w-12 h-12 rounded-[8px] bg-brand-goldBg/10 border border-brand-goldBg/20 text-brand-goldText flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <IconComponent className="w-6 h-6" />
                          </div>

                          {/* Card Content */}
                          <h3 className="text-lg font-bold text-white group-hover:text-brand-goldText transition-colors mb-2 leading-snug">
                            {service.title}
                          </h3>

                          <p className="text-text-muted text-sm line-clamp-2 leading-relaxed mb-6">
                            {service.subtitle}
                          </p>
                        </div>

                        {/* Price & Action Link Footer */}
                        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                          <span className="text-xs font-bold text-brand-goldText bg-brand-goldBg/5 px-2.5 py-1 rounded-[10px] border border-brand-goldBg/20">
                            {service.price}
                          </span>

                          <span className="text-xs font-bold text-slate-300 group-hover:text-brand-goldText transition-colors flex items-center gap-1">
                            View Details 
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>

                      </a>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ) : (
            /* No Results State */
            <div className="bg-[#111111] border border-white/10 rounded-[10px] p-12 text-center max-w-xl mx-auto my-12 space-y-4">
              <Search className="w-12 h-12 text-text-muted mx-auto opacity-50" />
              <h3 className="text-xl font-bold text-white">No Matching Services Found</h3>
              <p className="text-text-muted text-sm">
                We couldn't find any services matching "{searchQuery}". Try searching for terms like "Golden Visa", "Spouse", or "Attestation".
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All Services'); }}
                className="bg-brand-goldBg text-black font-extrabold px-6 py-2.5 rounded-[10px] text-sm hover:brightness-110 transition-all inline-block mt-2 cursor-pointer"
              >
                Clear Search & Filters
              </button>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
