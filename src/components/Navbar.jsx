import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  MessageSquare,
  Menu,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Calculator,
  Globe,
  Users,
  Crown,
  Building2,
  Baby,
  UserCheck,
  CreditCard,
  Stethoscope,
  Search,
  MapPin,
  ArrowRight,
  Shield,
  Scale,
  X,
  LayoutGrid
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { siteConfig } from '../data/cmsData';
import { useTranslation } from '../context/TranslationContext';

export default function Navbar({
  cmsConfig,
  theme,
  setTheme,
  onOpenOverlayMenu,
  onOpenCalculator,
  onNavigate,
  activeView
}) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const { t, language: activeLang, setLanguage: setActiveLang } = useTranslation();
  const timeoutRef = useRef(null);

  const handleMouseEnter = (menu) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const handleDropdownToggle = (menu) => {
    setActiveDropdown(prev => prev === menu ? null : menu);
  };

  const handleServiceSelect = (serviceId) => {
    setActiveDropdown(null);
    onNavigate('service', serviceId);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-3xl border-b transition-all duration-300 bg-[#EEF0F4]/95 dark:bg-[#121417]/95 border-slate-200/60 dark:border-white/8 text-slate-900 dark:text-white" style={{ backdropFilter: 'blur(40px) saturate(1.8)' }}>

        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E01E37]/30 to-transparent" />

        {/* Top Utility Bar */}
        <div className="hidden lg:flex bg-[#1a1a1a] text-slate-300 py-2.5 px-6 text-xs border-b border-black w-full justify-center">
          <div className="max-w-[1400px] w-full flex justify-between items-center font-sans tracking-wide">
            <div>
              UAE family visa, Golden Visa & Emirates ID specialists
            </div>
            <div className="flex items-center gap-6">
              <span className="text-slate-400">Sat – Thu, 9:00 – 19:00 (GST)</span>
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="text-[#E01E37] font-semibold hover:text-white transition-colors"
              >
                +971 56 655 6645
              </a>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between w-full gap-4 relative">

          {/* Left Section: Brand Logo */}
          <div className="flex-1 flex justify-start shrink-0 z-10 min-w-max">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 group text-left cursor-pointer"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#E01E37] flex items-center justify-center shadow-md">
                <span className="text-white font-black text-lg">FV</span>
              </div>
              <div>
                <div className="font-display font-extrabold text-[clamp(16px,1.2vw,20px)] tracking-tight text-slate-900 dark:text-white leading-none">
                  PropertyVisaDubai<span className="text-[#E01E37]">UAE</span>
                </div>
                <div className="text-[9px] font-mono tracking-wider uppercase text-slate-500 dark:text-slate-400 mt-0.5">
                  https://propertyvisadubai.ae
                </div>
              </div>
            </motion.button>
          </div>

          {/* Center Section: Navigation Links */}
          <nav className="hidden xl:flex items-center justify-center gap-1 2xl:gap-3 z-0 min-w-0">

            {/* Home Link (Red Pill) */}
            {/* Home Link */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { setActiveDropdown(null); onNavigate('home'); }}
              className={`whitespace-nowrap flex items-center gap-1 px-3 py-2 text-[clamp(11px,0.85vw,14px)] font-medium transition-colors cursor-pointer ${activeView === 'home' && !activeDropdown
                ? 'text-[#E01E37]'
                : 'text-slate-700 dark:text-slate-300 hover:text-[#E01E37]'
                }`}
            >
              <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
                {(cmsConfig?.global?.nav?.home || t('navbar.home') || 'Home')}
              </span>
            </motion.button>
            {/* Visas Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('visas')}
              onMouseLeave={handleMouseLeave}
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleDropdownToggle('visas')}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-[clamp(11px,0.85vw,14px)] font-medium transition-colors cursor-pointer ${activeDropdown === 'visas' ? 'text-[#E01E37]' : 'text-slate-700 dark:text-slate-300 hover:text-[#E01E37]'}`}
              >
                <span className="block whitespace-nowrap">{(cmsConfig?.global?.nav?.visas || t('navbar.visas') || 'Visas')}</span>
                <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform duration-300 ${activeDropdown === 'visas' ? 'rotate-180 text-[#E01E37]' : 'text-slate-400'}`} />
              </motion.button>

              <AnimatePresence>
                {activeDropdown === 'visas' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                    className="absolute left-1/2 -translate-x-1/2 mt-3 w-80 bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl p-3 space-y-1 z-50"
                  >
                    <div className="px-3 py-1 text-[10px] font-mono font-bold text-[#E01E37] uppercase">FAMILY & INVESTOR VISAS</div>
                    <button onClick={() => handleServiceSelect('spouse-visa')} className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-3 transition-all group">
                      <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-500"><Users className="w-4 h-4" /></div>
                      <div><div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#E01E37]">Spouse Residence Visa</div></div>
                    </button>
                    <button onClick={() => handleServiceSelect('children-visa')} className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-3 transition-all group">
                      <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500"><Baby className="w-4 h-4" /></div>
                      <div><div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#E01E37]">Children Dependant Visa</div></div>
                    </button>
                    <button onClick={() => handleServiceSelect('parents-visa')} className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-3 transition-all group">
                      <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-500"><Users className="w-4 h-4" /></div>
                      <div><div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#E01E37]">Parents Residence Visa</div></div>
                    </button>
                    <button onClick={() => handleServiceSelect('golden-visa')} className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-3 transition-all group">
                      <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-500"><Crown className="w-4 h-4" /></div>
                      <div><div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#E01E37]">10-Year Golden Visa</div></div>
                    </button>
                    <button onClick={() => handleServiceSelect('property-visa')} className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-3 transition-all group">
                      <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500"><Building2 className="w-4 h-4" /></div>
                      <div><div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#E01E37]">Property Investor Visa</div></div>
                    </button>
                    <button onClick={() => handleServiceSelect('maid-visa')} className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-3 transition-all group">
                      <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-500"><UserCheck className="w-4 h-4" /></div>
                      <div><div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#E01E37]">Maid & Domestic Helper</div></div>
                    </button>
                    <button onClick={() => handleServiceSelect('new-born')} className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-3 transition-all group">
                      <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-500"><Baby className="w-4 h-4" /></div>
                      <div><div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#E01E37]">Newborn Baby Visa</div></div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Emirates ID Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('emiratesId')}
              onMouseLeave={handleMouseLeave}
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleDropdownToggle('emiratesId')}
                className={`whitespace-nowrap flex items-center gap-1.5 rounded-xl px-3 py-2 text-[clamp(11px,0.85vw,14px)] font-medium transition-colors cursor-pointer ${activeDropdown === 'emiratesId' ? 'text-[#E01E37]' : 'text-slate-700 dark:text-slate-300 hover:text-[#E01E37]'}`}
              >
                <span className="block whitespace-nowrap">{(cmsConfig?.global?.nav?.emiratesId || t('navbar.emiratesId') || 'Emirates ID')}</span>
                <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform duration-300 ${activeDropdown === 'emiratesId' ? 'rotate-180 text-[#E01E37]' : 'text-slate-400'}`} />
              </motion.button>

              <AnimatePresence>
                {activeDropdown === 'emiratesId' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                    className="absolute left-1/2 -translate-x-1/2 mt-3 w-80 bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl p-3 space-y-1 z-50"
                  >
                    <div className="px-3 py-1 text-[10px] font-mono font-bold text-cyan-600 uppercase">EMIRATES ID & HEALTH</div>
                    <button onClick={() => handleServiceSelect('emirates-id')} className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-3 transition-all group">
                      <div className="p-2 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 text-cyan-500"><CreditCard className="w-4 h-4" /></div>
                      <div><div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#E01E37]">New Emirates ID & Renewal</div></div>
                    </button>
                    <button onClick={() => handleServiceSelect('medical-fitness')} className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-3 transition-all group">
                      <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500"><Stethoscope className="w-4 h-4" /></div>
                      <div><div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#E01E37]">VIP Medical Fitness (30-Min)</div></div>
                    </button>
                    <button onClick={() => handleServiceSelect('amer-services')} className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-3 transition-all group">
                      <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-500"><MapPin className="w-4 h-4" /></div>
                      <div><div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#E01E37]">Amer Services at Home</div></div>
                    </button>
                    <button onClick={() => handleServiceSelect('health-insurance')} className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-3 transition-all group">
                      <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-500"><ShieldCheck className="w-4 h-4" /></div>
                      <div><div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#E01E37]">Health Insurance (DHA)</div></div>
                    </button>
                    <button onClick={() => handleServiceSelect('iloe-insurance')} className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-3 transition-all group">
                      <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-500"><Shield className="w-4 h-4" /></div>
                      <div><div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#E01E37]">ILOE Unemployment Cover</div></div>
                    </button>
                    <button onClick={() => handleServiceSelect('visa-status')} className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-3 transition-all group">
                      <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-orange-500"><Search className="w-4 h-4" /></div>
                      <div><div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#E01E37]">Visa Status & Fine Reduction</div></div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('corporate')}
              onMouseLeave={handleMouseLeave}
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleDropdownToggle('corporate')}
                className={`whitespace-nowrap flex items-center gap-1.5 rounded-xl px-3 py-2 text-[clamp(11px,0.85vw,14px)] font-medium transition-colors cursor-pointer ${activeDropdown === 'corporate' ? 'text-[#E01E37]' : 'text-slate-700 dark:text-slate-300 hover:text-[#E01E37]'}`}
              >
                <span className="block whitespace-nowrap">Other Services</span>
                <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform duration-300 ${activeDropdown === 'corporate' ? 'rotate-180 text-[#E01E37]' : 'text-slate-400'}`} />
              </motion.button>

              <AnimatePresence>
                {activeDropdown === 'corporate' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                    className="absolute left-1/2 -translate-x-1/2 mt-3 w-80 bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl p-3 space-y-1 z-50"
                  >
                    <div className="px-3 py-1 text-[10px] font-mono font-bold text-emerald-600 uppercase">CORPORATE & LEGAL</div>
                    <button onClick={() => handleServiceSelect('pro-services')} className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-3 transition-all group">
                      <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500"><Building2 className="w-4 h-4" /></div>
                      <div><div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#E01E37]">Corporate PRO Services</div></div>
                    </button>
                    <button onClick={() => handleServiceSelect('business-setup')} className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-3 transition-all group">
                      <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-500"><Building2 className="w-4 h-4" /></div>
                      <div><div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#E01E37]">Business Setup & Licensing</div></div>
                    </button>
                    <button onClick={() => handleServiceSelect('attestation')} className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-3 transition-all group">
                      <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500"><ShieldCheck className="w-4 h-4" /></div>
                      <div><div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#E01E37]">Document Attestation & MOFA</div></div>
                    </button>
                    <button onClick={() => handleServiceSelect('legal-translation')} className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-3 transition-all group">
                      <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-500"><Globe className="w-4 h-4" /></div>
                      <div><div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#E01E37]">Sworn Legal Translation</div></div>
                    </button>
                    <button onClick={() => handleServiceSelect('power-of-attorney')} className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-3 transition-all group">
                      <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-500"><Scale className="w-4 h-4" /></div>
                      <div><div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#E01E37]">Power of Attorney & Notary</div></div>
                    </button>
                    <button onClick={() => handleServiceSelect('wills-testament')} className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-3 transition-all group">
                      <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-500"><ShieldCheck className="w-4 h-4" /></div>
                      <div><div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#E01E37]">Wills & Estate Planning</div></div>
                    </button>
                    <button onClick={() => handleServiceSelect('dld-trustee')} className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-3 transition-all group">
                      <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-500"><Building2 className="w-4 h-4" /></div>
                      <div><div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#E01E37]">DLD Trustee & Revaluation</div></div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Static Links */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { setActiveDropdown(null); onNavigate('pricing'); }}
              className={`whitespace-nowrap px-3 py-2 text-[clamp(11px,0.85vw,14px)] font-medium transition-colors cursor-pointer ${activeView === 'pricing' ? 'text-[#E01E37]' : 'text-slate-700 dark:text-slate-300 hover:text-[#E01E37]'}`}
            >
              Pricing
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { setActiveDropdown(null); onNavigate('blog-index'); }}
              className={`whitespace-nowrap px-3 py-2 text-[clamp(11px,0.85vw,14px)] font-medium transition-colors cursor-pointer ${activeView === 'blog-index' || activeView === 'blog-post' ? 'text-[#E01E37]' : 'text-slate-700 dark:text-slate-300 hover:text-[#E01E37]'}`}
            >
              Guides
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { setActiveDropdown(null); onNavigate('about'); }}
              className={`whitespace-nowrap px-3 py-2 text-[clamp(11px,0.85vw,14px)] font-medium transition-colors cursor-pointer ${activeView === 'about' ? 'text-[#E01E37]' : 'text-slate-700 dark:text-slate-300 hover:text-[#E01E37]'}`}
            >
              About
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { setActiveDropdown(null); onNavigate('contact'); }}
              className={`whitespace-nowrap px-3 py-2 text-[clamp(11px,0.85vw,14px)] font-medium transition-colors cursor-pointer ${activeView === 'contact' ? 'text-[#E01E37]' : 'text-slate-700 dark:text-slate-300 hover:text-[#E01E37]'}`}
            >
              Contact
            </motion.button>
          </nav>

          {/* Right Section: Utilities & Actions */}
          <div className="flex-1 flex justify-end items-center gap-3 shrink-0 z-10 min-w-max">

            {/* Hover Globe Language Selector */}
            <div
              className="relative hidden sm:block notranslate"
              onMouseEnter={() => handleMouseEnter('language')}
              onMouseLeave={handleMouseLeave}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDropdownToggle('language')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors cursor-pointer ${activeDropdown === 'language'
                  ? 'bg-slate-100 dark:bg-white/10 text-[#E01E37]'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-[#E01E37]'
                  }`}
              >
                <Globe className="w-4 h-4" />
                <span className="text-[13px] font-bold uppercase">{activeLang}</span>
              </motion.button>

              <AnimatePresence>
                {activeDropdown === 'language' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden z-50 p-2 flex flex-col gap-0.5"
                  >
                    {siteConfig.languages?.map((lang) => {
                      const isActive = activeLang === lang.code;
                      return (
                        <button
                          key={lang.code}
                          onClick={() => { setActiveLang(lang.code); setActiveDropdown(null); }}
                          className={`w-full flex justify-between items-center px-4 py-2.5 rounded-lg transition-all cursor-pointer ${isActive
                            ? 'bg-red-50 dark:bg-[#E01E37]/10 text-[#E01E37] font-bold'
                            : 'bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 font-semibold'
                            }`}
                        >
                          <span>{lang.name}</span>
                          <span className={`${isActive ? 'text-[#E01E37]' : 'text-slate-500'} text-[11px]`}>{lang.code}</span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <ThemeToggle theme={theme} setTheme={setTheme} />

            {/* Talk to Us Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onOpenCalculator('spouse')}
              className="hidden sm:flex items-center gap-2 px-5 py-2 bg-[#E01E37] text-white text-[13px] font-bold rounded-full shadow-md hover:bg-[#B81A2C] transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Talk to us</span>
            </motion.button>
          </div>
        </div>
      </header>

      {/* --- DESKTOP FLOATING WHATSAPP BUTTON --- */}
      <motion.a
        href={`https://wa.me/${siteConfig.whatsappRaw}`}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="hidden md:flex fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl items-center justify-center group"
      >
        <div className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-75"></div>
        <MessageSquare className="w-6 h-6 relative z-10" />
      </motion.a>

      {/* --- MOBILE FLOATING TOOLS MENU --- */}
      <div className="flex md:hidden fixed bottom-6 right-6 z-50 flex-col items-end">
        <AnimatePresence>
          {isToolsOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="mb-4 bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col w-52"
            >
              <button
                onClick={() => { setIsToolsOpen(false); onOpenCalculator('spouse'); }}
                className="flex items-center gap-3 px-4 py-3.5 hover:bg-slate-50 dark:hover:bg-white/5 border-b border-slate-100 dark:border-white/5 text-sm font-semibold text-slate-800 dark:text-white transition-colors"
              >
                <Calculator className="w-4 h-4 text-[#E01E37]" /> Calculator
              </button>
              <button
                onClick={() => { setIsToolsOpen(false); onOpenOverlayMenu(); }}
                className="flex items-center gap-3 px-4 py-3.5 hover:bg-slate-50 dark:hover:bg-white/5 border-b border-slate-100 dark:border-white/5 text-sm font-semibold text-slate-800 dark:text-white transition-colors"
              >
                <Menu className="w-4 h-4 text-blue-500" /> Other Tools
              </button>
              <a
                href={`https://wa.me/${siteConfig.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3.5 hover:bg-slate-50 dark:hover:bg-white/5 text-sm font-semibold text-slate-800 dark:text-white transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" /> WhatsApp Support
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsToolsOpen(!isToolsOpen)}
          className="bg-[#E01E37] text-white p-4 rounded-full shadow-2xl flex items-center justify-center relative"
        >
          <span className="absolute inset-0 rounded-full shadow-[0_0_20px_rgba(224,30,55,0.4)]"></span>
          {isToolsOpen ? <X className="w-6 h-6" /> : <LayoutGrid className="w-6 h-6" />}
        </motion.button>
      </div>
    </>
  );
}