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
  LayoutGrid,
  Briefcase
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { siteConfig } from '../data/cmsData';
import { useTranslation } from '../context/TranslationContext';

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
  const [isToolsOpen, setIsToolsOpen] = useState(false);
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

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-40 w-full backdrop-blur-md transition-all duration-300 bg-surface/96 dark:bg-[#121417]/96 border-b-[3px] border-brand-primary text-content-primary dark:text-white"
      >
        {/* Main Navigation Bar */}
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between flex-nowrap w-full gap-2 xl:gap-6 relative">

          {/* Left Section: Brand Logo */}
          <div className="flex items-center gap-3 shrink-0 z-10 rtl:ml-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 group cursor-pointer notranslate flex-shrink-0"
            >
              {/* Logo Icon Badge */}
              <div className="w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] rounded-[14px] bg-surface dark:bg-[#121417] border border-border-subtle dark:border-brand-primary/30 flex flex-col items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(212,175,55,0.15)] group-hover:shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-shadow">
                <span className="text-brand-primary font-black text-xl sm:text-2xl tracking-tighter leading-none mt-1">
                  {cmsConfig?.global?.branding?.logoIcon || 'PV'}
                </span>
                <span className="text-[8px] sm:text-[9px] font-bold tracking-widest text-content-muted dark:text-slate-500 uppercase mt-0.5 mb-1">
                  {cmsConfig?.global?.branding?.logoSubtext || 'DUBAI'}
                </span>
              </div>

              {/* Brand Title & Subtitle */}
              <div className="flex flex-col text-start leading-tight">
                <span className="text-[clamp(16px,1.5vw,22px)] font-black tracking-tight text-content-primary dark:text-white whitespace-nowrap">
                  {cmsConfig?.global?.branding?.brandTitle || 'PropertyVisaDubai'}
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-content-muted dark:text-slate-500 uppercase whitespace-nowrap">
                  {cmsConfig?.global?.branding?.brandSubtitle || 'operated by brightlink'}
                </span>
              </div>
            </motion.button>
          </div>

          {/* Center Section: Navigation Links - Single row, no wrap, dynamic gap, scrollable on small overflow */}
          <nav className="flex-1 hidden xl:flex items-center justify-center flex-nowrap whitespace-nowrap overflow-x-auto hide-scrollbar gap-2 xl:gap-6 text-sm xl:text-base z-0">
            {activeNavLinks.map(link => (
              <motion.button
                key={link.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { setActiveDropdown(null); onNavigate(link.view); }}
                className={`flex-shrink-0 whitespace-nowrap flex items-center gap-1 rounded-xl px-3 py-2 text-sm xl:text-base font-semibold transition-colors cursor-pointer ${
                  activeView === link.view ? 'text-brand-primary' : 'text-content-secondary dark:text-slate-300 hover:text-[#B8860B]'
                }`}
              >
                <span>{link.label}</span>
              </motion.button>
            ))}
          </nav>

          {/* Right Section: Utilities & Actions */}
          <div className="flex-shrink-0 flex items-center justify-end flex-nowrap gap-2 xl:gap-3 z-10 rtl:mr-auto">

            {/* Services Button - Opens Overlay Mega Menu */}
            <div className="hidden sm:block flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onOpenOverlayMenu()}
                className="flex-shrink-0 whitespace-nowrap flex items-center justify-center gap-1.5 bg-surface dark:bg-[#1A1C23] border-[1.5px] border-[#D4AF37]/40 text-slate-900 dark:text-white rounded-[10px] px-3 py-2 xl:px-4 xl:py-[10px] text-xs xl:text-sm font-extrabold hover:border-amber-500 shadow-sm transition-all cursor-pointer"
              >
                <LayoutGrid className="w-4 h-4 text-amber-500" />
                <span>{cmsConfig?.global?.branding?.btnServices || 'Services'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-amber-500 opacity-80" />
              </motion.button>
            </div>

            {/* Visa Calculator Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onOpenCalculator('family')}
              className="hidden sm:flex flex-shrink-0 whitespace-nowrap items-center justify-center gap-1.5 bg-dark-gold-gloss text-black font-extrabold rounded-[10px] px-3 py-2 xl:px-4 xl:py-[10px] text-xs xl:text-sm shadow-[0_4px_16px_rgba(212,175,55,0.3)] hover:brightness-110 transition-all cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              <span>{cmsConfig?.global?.branding?.btnCalculator || 'Visa Calculator'}</span>
            </motion.button>

            {/* Talk to Us Button */}
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              href={`https://wa.me/${siteConfig.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex flex-shrink-0 whitespace-nowrap items-center justify-center gap-1.5 bg-[#25D366] text-white hover:bg-[#128C7E] font-extrabold transition-all duration-300 rounded-[10px] px-3 py-2 xl:px-4 xl:py-[10px] text-xs xl:text-sm shadow-[0_4px_16px_rgba(37,211,102,0.3)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.4)] cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              <span>{cmsConfig?.global?.branding?.btnTalk || 'Talk to Us'}</span>
            </motion.a>

            {/* Hover Globe Language Selector */}
            <div className="relative hidden sm:block notranslate flex-shrink-0" onMouseEnter={() => handleMouseEnter('language')} onMouseLeave={handleMouseLeave}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDropdownToggle('language')}
                className={`flex items-center gap-1.5 px-2.5 py-2 rounded-[10px] transition-colors cursor-pointer ${
                  activeDropdown === 'language' ? 'bg-brand-primary/10 text-brand-primary' : 'text-content-secondary dark:text-slate-300 hover:bg-surface-elevated dark:hover:bg-surface/5 hover:text-[#B8860B]'
                }`}
              >
                <Globe className="w-4 h-4 text-amber-500" />
                <span className="text-xs xl:text-sm font-bold uppercase">{activeLang}</span>
              </motion.button>

              <AnimatePresence>
                {activeDropdown === 'language' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute right-0 top-full mt-2 w-48 bg-surface dark:bg-[#121417] border border-border-subtle dark:border-white/10 rounded-[10px] shadow-xl overflow-hidden z-50 p-2 flex flex-col gap-0.5"
                  >
                    {siteConfig.languages?.map((lang) => {
                      const isActive = activeLang === lang.code;
                      return (
                        <button
                          key={lang.code}
                          onClick={() => { setActiveLang(lang.code); setActiveDropdown(null); }}
                          className={`w-full flex justify-between items-center px-4 py-2.5 rounded-[10px] transition-all cursor-pointer ${
                            isActive ? 'bg-brand-primary/10 text-brand-primary font-bold' : 'bg-transparent text-content-secondary dark:text-slate-300 hover:bg-canvas dark:hover:bg-surface/5 font-semibold'
                          }`}
                        >
                          <span>{lang.name}</span>
                          <span className={`${isActive ? 'text-brand-primary' : 'text-content-muted'} text-xs`}>{lang.code}</span>
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
              className="xl:hidden p-2 text-content-secondary dark:text-slate-300 hover:text-[#B8860B] transition-colors flex items-center justify-center cursor-pointer flex-shrink-0"
            >
              {activeDropdown === 'mobile' ? <X className="w-6 h-6 shrink-0" /> : <Menu className="w-6 h-6 shrink-0" />}
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
              className="xl:hidden absolute top-full left-0 w-full bg-surface dark:bg-[#121417] border-t border-border-subtle dark:border-white/10 shadow-xl overflow-hidden z-40"
            >
              <div className="flex flex-col px-4 py-2 space-y-1 max-h-[75vh] overflow-y-auto">
                <button onClick={() => { setActiveDropdown(null); onNavigate('home'); }} className="text-left font-bold py-3 px-2 border-b border-border-subtle dark:border-white/5 text-content-primary dark:text-white"><span>Home</span></button>
                <button onClick={() => { setActiveDropdown(null); onNavigate('about'); }} className="text-left font-bold py-3 px-2 border-b border-border-subtle dark:border-white/5 text-content-primary dark:text-white"><span>About Us</span></button>
                <button onClick={() => { setActiveDropdown(null); onNavigate('blog-index'); }} className="text-left font-bold py-3 px-2 border-b border-border-subtle dark:border-white/5 text-content-primary dark:text-white"><span>Articles</span></button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
