import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  Globe,
  LayoutGrid,
  Menu,
  ChevronDown,
  X,
  MessageSquare,
  Sparkles,
  Crown,
  Users,
  FileCheck,
  Briefcase
} from 'lucide-react';
import { siteConfig } from '../data/cmsData';
import { useTranslation } from '../context/TranslationContext';
import ThemeToggle from './ThemeToggle';

const defaultNavLinks = [
  { id: 'nav-1', label: 'Home', view: 'home', visible: true },
  { id: 'nav-2', label: 'Articles', view: 'blog-index', visible: true },
  { id: 'nav-3', label: 'About Us', view: 'about', visible: true }
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
  const { t, language: activeLang, setLanguage: setActiveLang } = useTranslation();
  const timeoutRef = useRef(null);

  const activeNavLinks = (Array.isArray(cmsConfig?.navbarLinks) ? cmsConfig.navbarLinks : defaultNavLinks)
    .filter(link => link && link.visible !== false)
    .map(link => link.label === 'Property Support' ? { ...link, label: 'About Us', view: 'about' } : link);

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

  const handleServicesClick = () => {
    if (onOpenOverlayMenu) {
      setActiveDropdown(null);
      onOpenOverlayMenu();
    } else {
      handleDropdownToggle('services');
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/95 dark:bg-[#0D0B08]/95 border-b border-[#E8DFC8]/80 dark:border-[#EFC45C]/20 text-slate-900 dark:text-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-300"
      style={{ fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif' }}
    >
      {/* Main Navigation Bar Container */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between flex-nowrap w-full gap-2 xl:gap-6 relative">

        {/* Left Section: Brand Logo */}
        <div className="flex items-center gap-3 shrink-0 z-10 rtl:ml-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 group cursor-pointer notranslate flex-shrink-0"
          >
            {/* Logo Icon Badge */}
            <div className="w-[42px] h-[42px] sm:w-[46px] sm:h-[46px] rounded-[10px] bg-slate-950 text-[#F5D061] border border-[#F5D061]/40 flex flex-col items-center justify-center shrink-0 shadow-sm group-hover:border-[#F5D061] transition-all">
              <span className="font-black text-lg sm:text-xl tracking-tight leading-none mt-0.5">
                {cmsConfig?.global?.branding?.logoIcon || 'PV'}
              </span>
              <span className="text-[7px] sm:text-[8px] font-bold tracking-widest uppercase mt-0.5 mb-0.5 text-slate-400">
                {cmsConfig?.global?.branding?.logoSubtext || 'DUBAI'}
              </span>
            </div>

            {/* Brand Title & Subtitle */}
            <div className="flex flex-col text-start leading-tight">
              <span className="text-base sm:text-lg lg:text-xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-[#EFC45C] dark:group-hover:text-[#EFC45C] transition-colors whitespace-nowrap">
                {cmsConfig?.global?.branding?.brandTitle || 'PropertyVisaDubai'}
              </span>
              <span className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400 whitespace-nowrap">
                {(cmsConfig?.global?.branding?.brandSubtitle || 'Operated by Brightlink & 800 DOCS').replace(/brigtlink/i, 'Brightlink & 800 DOCS')}
              </span>
            </div>
          </motion.button>
        </div>

        {/* Center Section: Navigation Links */}
        <nav className="flex-1 hidden xl:flex items-center justify-center flex-nowrap whitespace-nowrap overflow-x-auto hide-scrollbar gap-2 xl:gap-6 text-sm xl:text-base z-0">
          {activeNavLinks.map(link => (
            <motion.button
              key={link.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { setActiveDropdown(null); onNavigate(link.view); }}
              className={`flex-shrink-0 whitespace-nowrap flex items-center gap-1 rounded-[10px] px-3.5 py-2 text-sm xl:text-base font-bold transition-all cursor-pointer ${
                activeView === link.view
                  ? 'bg-amber-500/10 text-[#F5D061] border border-[#F5D061]/35 shadow-sm'
                  : 'text-slate-700 dark:text-slate-200 hover:text-[#F5D061] hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              <span>{link.label}</span>
            </motion.button>
          ))}
        </nav>

        {/* Right Section: Utilities & Actions */}
        <div className="flex-shrink-0 flex items-center justify-end flex-nowrap gap-2 xl:gap-3 z-10 rtl:mr-auto">

          {/* Services Button - Opens Service Menu Dropdown Modal */}
          <div className="hidden sm:block flex-shrink-0 relative group">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleServicesClick}
              className="flex-shrink-0 whitespace-nowrap flex items-center justify-center gap-2 px-3.5 py-2 xl:px-4 xl:py-[10px] rounded-[10px] text-xs xl:text-sm font-black border border-[#EFC45C]/50 dark:border-[#EFC45C]/40 hover:border-[#EFC45C] dark:hover:border-[#EFC45C] bg-gradient-to-r from-[#FAF5E8] to-[#F5EDD6] hover:from-[#F6EED9] hover:to-[#EEDFA8] dark:from-[#1A160F] dark:to-[#221C12] dark:hover:from-[#241E13] dark:hover:to-[#2C2417] text-[#7A560E] hover:text-[#4A3304] dark:text-[#F7DE9C] dark:hover:text-[#FFF3D0] shadow-[0_2px_8px_rgba(239,196,92,0.18)] hover:shadow-[0_4px_18px_rgba(239,196,92,0.32)] transition-all cursor-pointer"
            >
              <div className="w-5 h-5 rounded-[6px] bg-[#EFC45C]/25 border border-[#EFC45C]/40 flex items-center justify-center text-[#8A6412] dark:text-[#EFC45C] group-hover:scale-105 transition-transform shrink-0">
                <LayoutGrid className="w-3.5 h-3.5 stroke-[2.4]" />
              </div>
              <span className="tracking-wide">{cmsConfig?.global?.branding?.btnServices || 'Services'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#8A6412] dark:text-[#EFC45C] group-hover:translate-y-0.5 transition-transform stroke-[2.5]" />
            </motion.button>
          </div>

          {/* Visa Calculator Button - Directly Launches Pop-Up Modal */}
          {onOpenCalculator && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onOpenCalculator('golden')}
              className="hidden sm:flex flex-shrink-0 whitespace-nowrap items-center justify-center gap-2 btn-gold px-4 py-2 xl:px-5 xl:py-[10px] text-xs xl:text-sm font-black rounded-[10px] shadow-[0_4px_16px_rgba(245,208,97,0.35)] cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              <span>{cmsConfig?.global?.branding?.btnCalculator || 'Visa Calculator'}</span>
            </motion.button>
          )}

          {/* Talk to Us WhatsApp Button - Official Green */}
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            href={`https://wa.me/${siteConfig?.whatsappRaw || '971501234567'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex flex-shrink-0 whitespace-nowrap items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-4 py-2 xl:px-4 xl:py-[10px] text-xs xl:text-sm font-extrabold rounded-[10px] shadow-[0_4px_16px_rgba(37,211,102,0.3)] transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-white fill-current" />
            <span>{cmsConfig?.global?.branding?.btnTalk || 'Talk to Us'}</span>
          </motion.a>

          {/* Theme Toggle Button (Light/Dark Switch with Golden Colors) */}
          <div className="flex-shrink-0">
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>

          {/* Language Selector Dropdown */}
          <div className="relative hidden sm:block notranslate flex-shrink-0" onMouseEnter={() => handleMouseEnter('language')} onMouseLeave={handleMouseLeave}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDropdownToggle('language')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-[10px] border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer text-xs font-bold ${
                activeDropdown === 'language' ? 'bg-amber-500/10 text-[#F5D061]' : 'text-slate-700 dark:text-slate-300 hover:text-[#F5D061]'
              }`}
            >
              <Globe className="w-4 h-4 text-[#F5D061]" />
              <span className="uppercase">{activeLang}</span>
            </motion.button>

            <AnimatePresence>
              {activeDropdown === 'language' && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[10px] shadow-2xl p-2 z-50 flex flex-col gap-1"
                >
                  {(siteConfig.languages || [{ code: 'EN', name: 'English' }, { code: 'AR', name: 'العربية' }]).map((lang) => {
                    const isActive = activeLang === lang.code;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => { setActiveLang(lang.code); setActiveDropdown(null); }}
                        className={`w-full flex justify-between items-center px-4 py-2.5 rounded-[10px] transition-all cursor-pointer text-xs ${
                          isActive ? 'bg-amber-500/10 text-[#F5D061] font-bold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold'
                        }`}
                      >
                        <span>{lang.name}</span>
                        <span className="text-[10px] text-slate-400">{lang.code}</span>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveDropdown(activeDropdown === 'mobile' ? null : 'mobile')}
            className="xl:hidden p-2 text-slate-700 dark:text-slate-300 hover:text-[#F5D061] transition-colors flex items-center justify-center cursor-pointer flex-shrink-0"
          >
            {activeDropdown === 'mobile' ? <X className="w-6 h-6 shrink-0" /> : <Menu className="w-6 h-6 shrink-0" />}
          </motion.button>
        </div>
      </div>

      {/* 10-YEAR UAE GOLDEN RESIDENCY ANNOUNCEMENT TICKER (Sticky with Navbar) */}
      <div className="bg-[#0B0A08] text-white py-2 px-4 border-t border-[#E8DFC8]/60 dark:border-[#EFC45C]/20 border-b border-[#EFC45C]/25 text-xs font-bold uppercase tracking-wider overflow-hidden shadow-inner">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[#EFC45C] shrink-0">
            <Crown className="w-4 h-4 text-[#EFC45C] animate-pulse" />
            <span className="tracking-widest text-[11px] sm:text-xs">10-YEAR UAE GOLDEN RESIDENCY</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="flex whitespace-nowrap animate-marquee gap-8 text-[11px] sm:text-xs font-semibold text-slate-300">
              <span>★ Recent Golden Visa Approval: Alexander V. (Dubai Marina Title Deed - 10 Year Visa)</span>
              <span>★ 15,000+ Family Visas Processed in Dubai & Abu Dhabi</span>
              <span>★ VIP Express Medical & Biometrics Slots Available Today</span>
              <span>★ Same-Day DED Company Trade License Issuance</span>
            </div>
          </div>
          <button
            onClick={() => onOpenCalculator && onOpenCalculator('golden')}
            aria-label="Start Free Eligibility Check"
            className="hidden md:flex items-center gap-2 bg-[#EFC45C] hover:bg-[#F7DE9C] text-[#0B0A08] px-3.5 py-1.5 rounded-[8px] text-[11px] sm:text-xs font-black shrink-0 transition-all shadow-sm cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0B0A08]" />
            <span>Free Eligibility Check →</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Drawer */}
      <AnimatePresence>
        {activeDropdown === 'mobile' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden absolute top-full left-0 w-full bg-white dark:bg-[#0D0B08] border-t border-[#E8DFC8] dark:border-[#EFC45C]/20 shadow-2xl overflow-hidden z-40"
          >
            <div className="flex flex-col px-4 py-3 space-y-1.5 max-h-[75vh] overflow-y-auto">
              <button onClick={() => { setActiveDropdown(null); onNavigate('home'); }} className="text-left font-extrabold py-3 px-3 rounded-[10px] hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800">Home</button>
              
              {/* Mobile Services Trigger */}
              <button
                onClick={() => {
                  setActiveDropdown(null);
                  if (onOpenOverlayMenu) onOpenOverlayMenu();
                }}
                className="text-left font-black py-3 px-3 rounded-[10px] bg-gradient-to-r from-[#FAF5E8] to-[#F5EDD6] dark:from-[#1A160F] dark:to-[#221C12] text-[#7A560E] dark:text-[#F7DE9C] border border-[#EFC45C]/45 flex items-center justify-between shadow-xs transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-[6px] bg-[#EFC45C]/25 border border-[#EFC45C]/40 flex items-center justify-center text-[#8A6412] dark:text-[#EFC45C]">
                    <LayoutGrid className="w-3.5 h-3.5 stroke-[2.4]" />
                  </div>
                  <span>All Services (Directory)</span>
                </div>
                <ChevronDown className="w-4 h-4 -rotate-90 text-[#8A6412] dark:text-[#EFC45C]" />
              </button>

              <button onClick={() => { setActiveDropdown(null); onNavigate('about'); }} className="text-left font-extrabold py-3 px-3 rounded-[10px] hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800">About Us</button>
              <button onClick={() => { setActiveDropdown(null); onNavigate('blog-index'); }} className="text-left font-extrabold py-3 px-3 rounded-[10px] hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800">Articles</button>
              
              <div className="flex items-center justify-between py-3 px-3 border-b border-slate-100 dark:border-slate-800">
                <span className="font-extrabold text-slate-900 dark:text-white text-sm">Appearance</span>
                <ThemeToggle theme={theme} setTheme={setTheme} />
              </div>
              
              {onOpenCalculator && (
                <button
                  onClick={() => {
                    setActiveDropdown(null);
                    onOpenCalculator('golden');
                  }}
                  className="w-full mt-2 btn-gold text-slate-950 font-black p-3.5 rounded-[10px] text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Calculator className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                  <span>Visa Calculator</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
