import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, Building2, Globe, Layers } from 'lucide-react';

export interface JurisdictionItem {
  id: string;
  label: string;
  title: string;
  badge: string;
  description: string;
  benefits: string[];
  ctaText: string;
  ctaLink: string;
  image: string;
}

export const JURISDICTIONS_DATA: JurisdictionItem[] = [
  {
    id: 'mainland',
    label: 'Mainland',
    title: 'UAE Mainland Business Setup',
    badge: '100% FOREIGN OWNERSHIP',
    description: 'Empower your company to trade directly anywhere in the local UAE market and globally without restrictions or local agent requirements.',
    benefits: [
      '100% foreign ownership allowed under recent UAE Commercial Companies Law',
      'Unrestricted ability to trade directly in the UAE local market & government contracts',
      'No minimum share capital requirement for most business activities',
      'Freedom to open physical commercial offices anywhere in Dubai & UAE',
      'Eligibility for 10-Year Golden Visas for business owners & executive directors'
    ],
    ctaText: 'Start Mainland Setup',
    ctaLink: '/services/mainland-visa',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'freezone',
    label: 'Free Zone',
    title: 'Free Zone Company Registration',
    badge: '0% CORPORATE & PERSONAL TAX',
    description: 'Ideal for tech startups, e-commerce, and international firms operating in specialized economic hubs with 100% capital repatriation.',
    benefits: [
      '0% personal tax & 0% corporate tax benefits for qualifying Free Zone entities',
      '100% full capital and profit repatriation to your global bank account',
      '100% import and export custom duty exemptions within tax-free zones',
      'Fast-track 24-hour company formation with flexible flexi-desk options',
      'Streamlined investor & employee visa allocation without local sponsor hassle'
    ],
    ctaText: 'Start Free Zone Setup',
    ctaLink: '/services/freezone-visa',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'offshore',
    label: 'Offshore',
    title: 'International Offshore Entity',
    badge: 'ASSET PROTECTION & PRIVACY',
    description: 'Secure corporate structures designed for holding global assets, international IP rights, wealth management, and complete privacy.',
    benefits: [
      'Maximum confidentiality with non-public shareholder registries',
      'Ideal for international property holding & cross-border wealth management',
      'No physical office requirements or local UAE audit filings required',
      'Seamless multi-currency bank account opening in top international banks',
      'Complete protection against local tax liabilities and inheritance disputes'
    ],
    ctaText: 'Start Offshore Setup',
    ctaLink: '/services/offshore-setup',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=1200&auto=format&fit=crop',
  }
];

export interface JurisdictionTabsProps {
  onNavigate?: (route: string) => void;
}

export const JurisdictionTabs: React.FC<JurisdictionTabsProps> = ({ onNavigate }) => {
  const [activeTabId, setActiveTabId] = useState<string>('mainland');

  const activeData = JURISDICTIONS_DATA.find((j) => j.id === activeTabId) || JURISDICTIONS_DATA[0];

  const handleCtaClick = (href: string) => {
    if (onNavigate) {
      onNavigate(href);
    } else if (typeof window !== 'undefined') {
      window.location.href = href;
    }
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto overflow-hidden">
      
      {/* 1. Section Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500/15 via-yellow-400/20 to-amber-500/15 border border-[#D4AF37]/40 text-[#D4AF37] dark:text-amber-300 px-4 py-1.5 rounded-[8px] text-xs font-black tracking-widest uppercase shadow-sm mb-4">
          ✨ JURISDICTIONS
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          Choose the Right Business Jurisdiction
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Mainland, Free Zone, and Offshore, built for scale, compliance, and global reach.
        </p>
      </div>

      {/* 2. Interactive Tab Controller */}
      <div className="max-w-md mx-auto mt-10 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-[10px] flex justify-between border border-slate-200 dark:border-slate-800 shadow-inner relative">
        {JURISDICTIONS_DATA.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`relative z-10 flex-1 py-3 text-xs sm:text-sm transition-colors duration-200 cursor-pointer select-none text-center ${
                isActive
                  ? 'text-slate-950 dark:text-slate-950 font-black'
                  : 'text-slate-500 dark:text-slate-400 font-semibold hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicatorTS"
                  className="absolute inset-0 bg-gradient-to-r from-amber-400 via-[#D4AF37] to-amber-500 rounded-[8px] shadow-md"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 tracking-wide uppercase font-mono">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Dynamic Content Display Payload */}
      <div className="max-w-6xl mx-auto mt-12 rounded-[12px] overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl transition-all">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTabId}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="grid grid-cols-1 lg:grid-cols-2"
          >
            {/* Left Column (Details & Checklist) */}
            <div className="p-8 sm:p-10 lg:p-16 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-mono font-black text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-[8px] border border-[#D4AF37]/30 uppercase tracking-widest">
                    {activeData.badge}
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
                  {activeData.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                  {activeData.description}
                </p>

                {/* Vertical Checklist */}
                <ul className="space-y-4 mb-10">
                  {activeData.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3.5 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-snug">
                      <CheckCircle className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span className="font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action CTA Button */}
              <div>
                <button
                  onClick={() => handleCtaClick(activeData.ctaLink)}
                  className="w-full sm:w-auto bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 hover:from-[#D4AF37] hover:to-amber-500 dark:from-[#D4AF37] dark:to-amber-500 text-white dark:text-slate-950 font-black px-8 py-4 rounded-[10px] shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm uppercase tracking-wider group cursor-pointer"
                >
                  <span>{activeData.ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Column (Visual Hook with Gradient Blend) */}
            <div className="relative min-h-[380px] lg:min-h-[540px] overflow-hidden">
              <img
                src={activeData.image}
                alt={activeData.title}
                className="w-full h-full object-cover object-center"
              />
              
              {/* Left Gradient Overlay to blend seamlessly with left column */}
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-white via-white/40 to-transparent dark:from-slate-900 dark:via-slate-900/40 dark:to-transparent pointer-events-none" />

              {/* Bottom Card Badge Overlay */}
              <div className="absolute bottom-6 left-6 right-6 lg:left-10 lg:right-10 bg-slate-950/80 backdrop-blur-md p-5 rounded-[10px] border border-white/20 text-white flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-amber-400 font-bold uppercase">100% SLA COMPLIANCE GUARANTEE</div>
                  <div className="text-xs font-extrabold mt-0.5">Government GDRFA & DLD Approved</div>
                </div>
                <div className="w-9 h-9 rounded-[8px] bg-[#D4AF37] text-slate-950 flex items-center justify-center font-black">
                  ✓
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </section>
  );
};

export default JurisdictionTabs;
