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

const getTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return "Just now";

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "1 day ago";
  if (diffInDays < 30) return `${diffInDays} days ago`;

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;

  return `${Math.floor(diffInMonths / 12)} year${Math.floor(diffInMonths / 12) > 1 ? 's' : ''} ago`;
};

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

  const activeNavLinks = (cmsConfig?.navbarLinks || defaultNavLinks)
    .filter(link => link.visible !== false)
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

  const handleServiceSelect = (serviceId) => {
    setActiveDropdown(null);
    onNavigate('service', serviceId);
  };

  return (
    <>
      <motion.header initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4, ease: "easeOut" }} className="sticky top-0 z-40 w-full backdrop-blur-md transition-all duration-300 bg-surface/96 dark:bg-[#121417]/96 border-b-[3px] border-brand-primary text-content-primary dark:text-white">

        {/* Top Marquee Bar removed as requested */}

        {/* Main Navigation Bar */}
        <div className="max-w-[1400px] mx-auto px-[clamp(0.5rem,1.5vw,1.5rem)] py-3 flex items-center justify-between flex-wrap xl:flex-nowrap w-full gap-[clamp(0.5rem,1vw,2rem)] relative">

          {/* Left Section: Brand Logo */}
          <div className="flex items-center gap-3 shrink-0 z-10 rtl:ml-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 group cursor-pointer notranslate"
            >
              {/* Logo Icon Badge */}
              <div className="w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] rounded-[14px] bg-surface dark:bg-[#121417] border border-border-subtle dark:border-brand-primary/30 flex flex-col items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(212,175,55,0.15)] group-hover:shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-shadow">
                <span className="text-brand-primary font-black text-xl sm:text-2xl tracking-tighter leading-none mt-1">{cmsConfig?.global?.branding?.logoIcon || 'PV'}</span>
                <span className="text-[8px] sm:text-[9px] font-bold tracking-widest text-content-muted dark:text-slate-500 uppercase mt-0.5 mb-1">{cmsConfig?.global?.branding?.logoSubtext || 'DUBAI'}</span>
              </div>

              {/* Brand Title & Subtitle */}
              <div className="flex flex-col text-start leading-tight">
                <span className="text-[clamp(16px,1.5vw,24px)] font-black tracking-tight text-content-primary dark:text-white">
                  {cmsConfig?.global?.branding?.brandTitle || 'PropertyVisaDubai'}
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-content-muted dark:text-slate-500 uppercase">
                  {cmsConfig?.global?.branding?.brandSubtitle || 'operated by brightlink'}
                </span>
              </div>
            </motion.button>
          </div>
          
          {/* Center Section: Navigation Links */}
          <nav className="flex-1 hidden xl:flex items-center justify-center flex-wrap gap-x-[clamp(0.5rem,1vw,1.25rem)] gap-y-2 z-0">
            {activeNavLinks.map(link => (
              <motion.button
                key={link.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { setActiveDropdown(null); onNavigate(link.view); }}
                className={`flex items-center gap-1 rounded-xl px-3 py-2 text-sm xl:text-base font-semibold transition-colors cursor-pointer ${activeView === link.view ? 'text-brand-primary' : 'text-content-secondary dark:text-slate-300 hover:text-brand-primary'}`}
              >
                <span>{link.label}</span>
              </motion.button>
            ))}
          </nav>

          {/* Right Section: Utilities & Actions */}
          <div className="flex-shrink-0 flex items-center justify-end flex-wrap sm:flex-nowrap gap-[clamp(0.4rem,0.8vw,0.75rem)] z-10 rtl:mr-auto">

            {/* Services Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onOpenOverlayMenu()}
              className="hidden sm:flex items-center justify-center gap-1.5 bg-surface dark:bg-[#121417] border-[1.5px] border-border-subtle dark:border-white/10 text-content-primary dark:text-white font-bold rounded-xl px-3 py-2 xl:px-4 xl:py-[11px] text-[0.9rem] xl:text-[0.95rem] hover:bg-canvas dark:hover:bg-surface/5 transition-all shadow-sm"
            >
              <LayoutGrid className="w-4 h-4" />
              <span>{cmsConfig?.global?.branding?.btnServices || 'Services'}</span>
              <ChevronDown className="w-3 h-3 opacity-65" />
            </motion.button>

            {/* Visa Calculator Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onOpenCalculator('family')}
              className="hidden sm:flex items-center justify-center gap-1.5 bg-gold-gradient btn-shine-effect text-black font-extrabold rounded-xl px-3 py-2 xl:px-[20px] xl:py-[11px] text-[0.9rem] xl:text-[0.95rem] shadow-[0_6px_18px_rgba(212,175,55,0.28)] hover:brightness-110 transition-all cursor-pointer whitespace-nowrap"
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
              className="hidden sm:flex items-center justify-center gap-1.5 bg-[#25d366] text-white font-bold rounded-xl px-3 py-2 xl:px-[20px] xl:py-[11px] text-[0.9rem] xl:text-[0.95rem] shadow-[0_6px_18px_rgba(37,211,102,0.25)] hover:shadow-[0_8px_22px_rgba(37,211,102,0.4)] transition-all cursor-pointer whitespace-nowrap"
            >
              <span>{cmsConfig?.global?.branding?.btnTalk || 'Talk to Us'}</span>
            </motion.a>

            {/* Hover Globe Language Selector */}
            <div className="relative hidden sm:block notranslate" onMouseEnter={() => handleMouseEnter('language')} onMouseLeave={handleMouseLeave}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDropdownToggle('language')}
                className={`flex items-center gap-[clamp(0.25rem,0.5vw,0.375rem)] px-2 py-2 rounded-xl transition-colors cursor-pointer ${activeDropdown === 'language' ? 'bg-brand-primary/10 text-brand-primary' : 'text-content-secondary dark:text-slate-300 hover:bg-surface-elevated dark:hover:bg-surface/5 hover:text-brand-primary'}`}
              >
                <Globe className="w-4 h-4" />
                <span className="text-[11px] xl:text-[14px] font-bold uppercase">{activeLang}</span>
              </motion.button>

              <AnimatePresence>
                {activeDropdown === 'language' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute right-0 top-full mt-2 w-48 bg-surface dark:bg-brand-surface border border-border-subtle dark:border-white/10 rounded-lg shadow-xl overflow-hidden z-50 p-2 flex flex-col gap-0.5"
                  >
                    {siteConfig.languages?.map((lang) => {
                      const isActive = activeLang === lang.code;
                      return (
                        <button
                          key={lang.code}
                          onClick={() => { setActiveLang(lang.code); setActiveDropdown(null); }}
                          className={`w-full flex justify-between items-center px-4 py-2.5 rounded-lg transition-all cursor-pointer ${isActive ? 'bg-brand-primary/10 text-brand-primary font-bold' : 'bg-transparent text-content-secondary dark:text-slate-300 hover:bg-canvas dark:hover:bg-surface/5 font-semibold'}`}
                        >
                          <span>{lang.name}</span>
                          <span className={`${isActive ? 'text-brand-primary' : 'text-content-muted'} text-[11px]`}>{lang.code}</span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <ThemeToggle theme={theme} setTheme={setTheme} />

            {/* Old CMS Buttons Removed to match reference site */}

            {/* Mobile Menu Toggle */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveDropdown(activeDropdown === 'mobile' ? null : 'mobile')}
              className="xl:hidden p-[clamp(0.25rem,0.5vw,0.5rem)] text-content-secondary dark:text-slate-300 hover:text-brand-primary transition-colors flex items-center justify-center cursor-pointer flex-nowrap"
            >
              {activeDropdown === 'mobile' ? <X className="w-[clamp(20px,1.5vw,24px)] h-[clamp(20px,1.5vw,24px)] shrink-0" /> : <Menu className="w-[clamp(20px,1.5vw,24px)] h-[clamp(20px,1.5vw,24px)] shrink-0" />}
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
              className="xl:hidden absolute top-full left-0 w-full bg-surface dark:bg-brand-surface border-t border-border-subtle dark:border-white/10 shadow-xl overflow-hidden z-40"
            >
              <div className="flex flex-col px-4 py-2 space-y-1 max-h-[75vh] overflow-y-auto">
                <button onClick={() => { setActiveDropdown(null); onNavigate('home'); }} className="text-left font-bold py-3 px-2 border-b border-border-subtle dark:border-white/5 text-content-primary dark:text-white">Home</button>
                <button onClick={() => { setActiveDropdown(null); onNavigate('about'); }} className="text-left font-bold py-3 px-2 border-b border-border-subtle dark:border-white/5 text-content-primary dark:text-white">About Us</button>
                <button onClick={() => { setActiveDropdown(null); onNavigate('blog-index'); }} className="text-left font-bold py-3 px-2 border-b border-border-subtle dark:border-white/5 text-content-primary dark:text-white">Articles</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

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
              className="mb-4 bg-surface dark:bg-brand-surface border border-border-subtle dark:border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col w-52"
            >
              <button
                onClick={() => { setIsToolsOpen(false); onOpenCalculator('spouse'); }}
                className="flex items-center gap-3 px-4 py-3.5 hover:bg-canvas dark:hover:bg-surface/5 border-b border-border-subtle dark:border-white/5 text-sm font-semibold text-content-primary dark:text-white transition-colors"
              >
                <Calculator className="w-4 h-4 text-brand-primary" /> Calculator
              </button>
              <button
                onClick={() => { setIsToolsOpen(false); onOpenOverlayMenu(); }}
                className="flex items-center gap-3 px-4 py-3.5 hover:bg-canvas dark:hover:bg-surface/5 border-b border-border-subtle dark:border-white/5 text-sm font-semibold text-content-primary dark:text-white transition-colors"
              >
                <Menu className="w-4 h-4 text-brand-gold" /> Other Tools
              </button>
              <a
                href={`https://wa.me/${siteConfig.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3.5 hover:bg-canvas dark:hover:bg-surface/5 text-sm font-semibold text-content-primary dark:text-white transition-colors"
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
          className="bg-brand-primary text-black p-4 rounded-full shadow-2xl flex items-center justify-center relative"
        >
          <span className="absolute inset-0 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)]"></span>
          {isToolsOpen ? <X className="w-6 h-6" /> : <LayoutGrid className="w-6 h-6" />}
        </motion.button>
      </div>
    </>
  );
}
