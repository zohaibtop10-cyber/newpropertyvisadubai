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

const defaultNavLinks = [
  { id: 'nav-1', label: 'Home', view: 'home', visible: true },
  { id: 'nav-2', label: 'Visas & Residency', view: 'service', visible: true },
  { id: 'nav-3', label: 'Emirates ID', view: 'service', visible: true },
  { id: 'nav-4', label: 'Other Services', view: 'service', visible: true },
  { id: 'nav-5', label: 'Pricing & Tariffs', view: 'pricing', visible: true },
  { id: 'nav-6', label: 'Guides', view: 'blog-index', visible: true },
  { id: 'nav-7', label: 'About', view: 'about', visible: true },
  { id: 'nav-8', label: 'Contact', view: 'contact', visible: true }
];

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

  const activeNavLinks = (cmsConfig?.navbarLinks || defaultNavLinks).filter(link => link.visible !== false);

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

        {/* Top Marquee Bar */}
        <div className="hidden lg:flex bg-gradient-to-r from-slate-900 via-[#0a0a0a] to-slate-900 text-slate-300 py-2.5 px-6 text-[11px] sm:text-xs border-b border-white/10 w-full justify-center overflow-hidden shadow-inner">
          <style>
            {`
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-marquee {
                display: flex;
                animation: marquee 40s linear infinite;
              }
              .animate-marquee:hover {
                animation-play-state: paused;
              }
            `}
          </style>
          {cmsConfig?.marqueeItems && cmsConfig.marqueeItems.length > 0 ? (
            <div className="animate-marquee min-w-max cursor-default">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center">
                  {cmsConfig.marqueeItems.map((item, idx) => (
                    <React.Fragment key={`${i}-${idx}`}>
                      <span className="mx-4 text-white font-medium" dangerouslySetInnerHTML={{__html: item.text}}></span>
                      <span className="text-[#E01E37] mx-2">✦</span>
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-[1400px] w-full flex justify-between items-center font-sans tracking-wide">
              <div>UAE family visa, Golden Visa & Emirates ID specialists</div>
              <div className="flex items-center gap-6">
                <span className="text-slate-400">Sat – Thu, 9:00 – 19:00 (GST)</span>
                <a href={`tel:${siteConfig.phoneRaw}`} className="text-[#E01E37] font-semibold hover:text-white transition-colors">
                  +971 56 655 6645
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between w-full gap-4 relative">

          {/* Left Section: Brand Logo */}
          <div className="flex shrink-0 z-10 min-w-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 group text-left cursor-pointer"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#E01E37] flex items-center justify-center shadow-md shrink-0">
                <span className="text-white font-black text-lg">FV</span>
              </div>
              <div className="min-w-0">
                <div className="notranslate font-display font-extrabold text-[clamp(16px,1.2vw,20px)] tracking-tight text-slate-900 dark:text-white leading-none truncate">
                  PropertyVisaDubai<span className="text-[#E01E37]">UAE</span>
                </div>
                <div className="notranslate text-[9px] font-mono tracking-wider uppercase text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                  https://propertyvisadubai.ae
                </div>
              </div>
            </motion.button>
          </div>

          {/* Center Section: Navigation Links */}
          <nav className="hidden xl:flex items-center justify-center gap-1 2xl:gap-3 z-0 min-w-0 px-1 overflow-visible">
            {activeNavLinks.map(link => {
              if (link.label.toLowerCase().includes('visas')) {
                return (
                  <div key={link.id} className="relative" onMouseEnter={() => handleMouseEnter('visas')} onMouseLeave={handleMouseLeave}>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleDropdownToggle('visas')}
                      className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-[clamp(11px,0.85vw,14px)] font-medium transition-colors cursor-pointer ${activeDropdown === 'visas' ? 'text-[#E01E37]' : 'text-slate-700 dark:text-slate-300 hover:text-[#E01E37]'}`}
                    >
                      <span className="block whitespace-nowrap">{link.label}</span>
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
                );
              }

              if (link.label.toLowerCase().includes('emirates')) {
                return (
                  <div key={link.id} className="relative" onMouseEnter={() => handleMouseEnter('emiratesId')} onMouseLeave={handleMouseLeave}>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleDropdownToggle('emiratesId')}
                      className={`whitespace-nowrap flex items-center gap-1.5 rounded-xl px-3 py-2 text-[clamp(11px,0.85vw,14px)] font-medium transition-colors cursor-pointer ${activeDropdown === 'emiratesId' ? 'text-[#E01E37]' : 'text-slate-700 dark:text-slate-300 hover:text-[#E01E37]'}`}
                    >
                      <span className="block whitespace-nowrap">{link.label}</span>
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
                );
              }

              if (link.label.toLowerCase().includes('other')) {
                return (
                  <div key={link.id} className="relative" onMouseEnter={() => handleMouseEnter('corporate')} onMouseLeave={handleMouseLeave}>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleDropdownToggle('corporate')}
                      className={`whitespace-nowrap flex items-center gap-1.5 rounded-xl px-3 py-2 text-[clamp(11px,0.85vw,14px)] font-medium transition-colors cursor-pointer ${activeDropdown === 'corporate' ? 'text-[#E01E37]' : 'text-slate-700 dark:text-slate-300 hover:text-[#E01E37]'}`}
                    >
                      <span className="block whitespace-nowrap">{link.label}</span>
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
                );
              }

              return (
                <motion.button
                  key={link.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setActiveDropdown(null); onNavigate(link.view); }}
                  className={`whitespace-nowrap px-3 py-2 text-[clamp(11px,0.85vw,14px)] font-medium transition-colors cursor-pointer ${activeView === link.view ? 'text-[#E01E37]' : 'text-slate-700 dark:text-slate-300 hover:text-[#E01E37]'}`}
                >
                  {link.label}
                </motion.button>
              );
            })}
          </nav>

          {/* Right Section: Utilities & Actions */}
          <div className="flex justify-end items-center gap-3 shrink-0 z-10 min-w-max">

            {/* Hover Globe Language Selector */}
            <div className="relative hidden sm:block notranslate" onMouseEnter={() => handleMouseEnter('language')} onMouseLeave={handleMouseLeave}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDropdownToggle('language')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors cursor-pointer ${activeDropdown === 'language' ? 'bg-slate-100 dark:bg-white/10 text-[#E01E37]' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-[#E01E37]'}`}
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
                          className={`w-full flex justify-between items-center px-4 py-2.5 rounded-lg transition-all cursor-pointer ${isActive ? 'bg-red-50 dark:bg-[#E01E37]/10 text-[#E01E37] font-bold' : 'bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 font-semibold'}`}
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

            {/* Dynamic CMS Buttons */}
            {(!cmsConfig?.global?.buttons || cmsConfig.global.buttons.length === 0) ? (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onOpenCalculator('spouse')}
                className="hidden sm:flex items-center gap-2 px-5 py-2 bg-[#E01E37] text-white text-[13px] font-bold rounded-full shadow-md hover:bg-[#B81A2C] transition-colors cursor-pointer shrink-0 whitespace-nowrap"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                <span>Talk to us</span>
              </motion.button>
            ) : (
              cmsConfig.global.buttons.map((btn) => (
                <motion.button
                  key={btn.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    if (btn.link === 'whatsapp') {
                      window.open(`https://wa.me/${siteConfig.whatsappRaw}`, '_blank');
                    } else if (btn.link.startsWith('/')) {
                      onNavigate(btn.link.replace('/', ''));
                    } else {
                      window.location.href = btn.link;
                    }
                  }}
                  className="hidden sm:flex items-center gap-2 px-5 py-2 text-[13px] font-bold rounded-full shadow-md transition-colors cursor-pointer shrink-0 whitespace-nowrap"
                  style={{
                    backgroundColor: btn.bgColor || '#E01E37',
                    color: btn.textColor || '#ffffff'
                  }}
                >
                  {btn.icon === 'ArrowRight' ? (
                    <ArrowRight className="w-4 h-4" />
                  ) : (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                  )}
                  <span>{btn.label}</span>
                </motion.button>
              ))
            )}

            {/* Mobile Menu Toggle */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveDropdown(activeDropdown === 'mobile' ? null : 'mobile')}
              className="xl:hidden p-2 text-slate-700 dark:text-slate-300 hover:text-[#E01E37] transition-colors flex items-center justify-center cursor-pointer"
            >
              {activeDropdown === 'mobile' ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {activeDropdown === 'mobile' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="xl:hidden absolute top-full left-0 w-full bg-white dark:bg-[#141414] border-t border-slate-200 dark:border-white/10 shadow-xl overflow-hidden z-40"
            >
              <div className="flex flex-col px-4 py-2 space-y-1 max-h-[75vh] overflow-y-auto">
                {activeNavLinks.map(link => (
                  <button
                    key={link.id}
                    onClick={() => { setActiveDropdown(null); onNavigate(link.view); }}
                    className="text-left font-bold py-3 px-2 border-b border-slate-100 dark:border-white/5 text-slate-900 dark:text-white"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
        <svg className="w-6 h-6 relative z-10 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
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
                <svg className="w-4 h-4 text-[#25D366] fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg> WhatsApp Support
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
