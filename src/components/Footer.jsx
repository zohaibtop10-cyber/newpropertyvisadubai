import React from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { motion } from 'framer-motion';
import { ShieldCheck, Phone, Mail, MapPin, ExternalLink, ArrowUp, Heart, Handshake, Clock } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';
import { siteConfig, servicesData } from '../data/cmsData';

const SocialSvg = {
  FB: (props) => (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  IG: (props) => (
    <svg className="w-4 h-4 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  TK: (props) => (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-2.22V8.2a6.34 6.34 0 0 0-5.06 6.13 6.34 6.34 0 1 0 10.86-4.54 8.24 8.24 0 0 0 4.31 1.15v-4.25z" />
    </svg>
  ),
  IN: (props) => (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  ),
  YT: (props) => (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  X: (props) => (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  PIN: (props) => (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" {...props}>
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
    </svg>
  ),
  TG: (props) => (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" {...props}>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
};

export function Footer({ onNavigate, onOpenCalculator, cmsConfig }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Footer-specific CMS overrides (from FooterEditor) with global fallbacks
  const ft = cmsConfig?.footer || {};

  // Brand
  const logoIcon = ft.logoIcon ?? cmsConfig?.global?.branding?.logoIcon ?? 'PV';
  const logoSubtext = ft.logoSubtext ?? cmsConfig?.global?.branding?.logoSubtext ?? 'DUBAI';
  const brandTitle = ft.brandTitle ?? cmsConfig?.global?.branding?.brandTitle ?? 'PropertyVisaDubai';
  const brandSubtitle = ft.brandSubtitle ?? cmsConfig?.global?.branding?.brandSubtitle ?? 'operated by brightlink';
  const tagline = ft.tagline ?? siteConfig.subtagline;

  // Column headings
  const servicesColHeading = ft.servicesColHeading ?? 'Residency Services';
  const legalColHeading = ft.legalColHeading ?? 'Platform & Legal';
  const contactColHeading = ft.contactColHeading ?? 'Advisory Desk & HQ';

  // Official portals
  const portals = ft.portals ?? siteConfig.officialPortals.map(p => ({ label: p.label, url: p.url }));

  // Legal / platform nav links
  const defaultLegalLinks = [
    { label: 'Homepage', view: 'home' },
    { label: 'Visa Calculator', view: 'calculator' },
    { label: 'Residency Guides', view: 'blog-index' },
    { label: 'About Us', view: 'about' },
    { label: 'Terms & Privacy', view: 'privacy' },
  ];
  const legalLinks = ft.legalLinks ?? defaultLegalLinks;

  // Bottom bar
  const madeWithText = ft.madeWithText ?? 'Made with ♥ in Dubai, UAE';
  const bottomBadge = ft.bottomBadge ?? 'Licensed PRO Document Clearing • DED Business Registration';

  // Disclaimer
  const disclaimer = ft.disclaimer ?? cmsConfig?.global?.footerDisclaimer ?? null;

  // CMS-driven contact info synchronized with companyInfo
  const phone = cmsConfig?.global?.phone || companyInfo.phone;
  const whatsapp = cmsConfig?.global?.whatsappRaw || companyInfo.whatsappRaw;
  const email = cmsConfig?.global?.email || companyInfo.email;
  const address = cmsConfig?.global?.address || companyInfo.address;
  const hours = cmsConfig?.global?.officeHours || companyInfo.workingHours;
  const referralTitle = ft.referralTitle ?? cmsConfig?.aboutPage?.referral?.title ?? 'Grow Together With Our B2B Referral Program';
  const referralDesc = ft.referralDesc ?? cmsConfig?.aboutPage?.referral?.description ?? `Partner with ${companyInfo.name} (${companyInfo.operatorName}) through our structured B2B and Corporate Referral Program.`;
  const referralBtn = ft.referralBtn ?? cmsConfig?.aboutPage?.referral?.buttonText ?? 'Become a Referral Partner';

  const socialLinksList = [
    { name: 'Facebook', url: cmsConfig?.global?.social?.facebook || siteConfig.socialLinks.facebook || 'https://facebook.com', icon: 'FB' },
    { name: 'Instagram', url: cmsConfig?.global?.social?.instagram || siteConfig.socialLinks.instagram || 'https://instagram.com', icon: 'IG' },
    { name: 'TikTok', url: cmsConfig?.global?.social?.tiktok || siteConfig.socialLinks.tiktok || 'https://tiktok.com', icon: 'TK' },
    { name: 'LinkedIn', url: cmsConfig?.global?.social?.linkedin || siteConfig.socialLinks.linkedin || 'https://linkedin.com', icon: 'IN' },
    { name: 'YouTube', url: cmsConfig?.global?.social?.youtube || siteConfig.socialLinks.youtube || 'https://youtube.com', icon: 'YT' },
    { name: 'Twitter', url: cmsConfig?.global?.social?.twitter || siteConfig.socialLinks.twitter || 'https://twitter.com', icon: 'X' },
    { name: 'Pinterest', url: cmsConfig?.global?.social?.pinterest || siteConfig.socialLinks.pinterest || 'https://pinterest.com', icon: 'PIN' },
    { name: 'Telegram', url: cmsConfig?.global?.social?.telegram || siteConfig.socialLinks.telegram || 'https://telegram.org', icon: 'TG' }
  ];

  return (
    <>
      {/* 1. LUXURY B2B PARTNER & REFERRAL PROGRAM SECTION (Warm Light Linen Paper like goldenvisauae.net) */}
      <section id="referral" className="border-t border-[#DECFA8] bg-[#F7F3E8] py-16 sm:py-20 px-4 font-sans text-slate-900 relative overflow-hidden transition-colors duration-300">
        {/* Ambient Radial Golden Bloom */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[280px] bg-[#EFC45C]/15 blur-[120px] rounded-[12px] pointer-events-none" />

        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center space-y-6 p-8 sm:p-12 rounded-[22px] bg-gradient-to-b from-[#FFFFFF] via-[#FAF8F3] to-[#F5EFE0] border border-[#DFD3BA] shadow-[0_20px_50px_rgba(50,35,10,0.06),inset_0_1px_1px_rgba(255,255,255,1)] card-shine"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          {/* Subtle Golden Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[8px] bg-gradient-to-r from-[#F8EED6] to-[#EEDDB2] border border-[#EFC45C]/60 text-[#8A6412] text-[11px] font-mono font-bold tracking-widest uppercase shadow-xs">
            <Handshake className="w-3.5 h-3.5 text-[#8A6412]" />
            <span>OFFICIAL B2B PARTNERSHIP PROGRAM • 10%–20% COMMISSION</span>
          </div>

          {/* Heading */}
          <h2 className="font-display text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Monetize Your Client Network With Our <span className="hybrid-gold-text">B2B PRO Referral</span> Program
          </h2>

          {/* Small Text */}
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto font-medium">
            Are you a real estate broker, corporate lawyer, wealth manager, or tax consultant? Partner with 800 DOCS LLC to offer seamless Golden Visa and residency solutions to your clients while earning industry-leading referral commissions.
          </p>

          {/* 3 Value Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 text-left">
            <div className="p-4 rounded-[14px] bg-gradient-to-b from-[#FAF6EE] to-[#EFE7D5] border border-[#E1D4B8] shadow-xs">
              <div className="text-xs font-mono font-bold text-[#8A6412] uppercase">10%–20% Commission</div>
              <div className="text-xs text-slate-600 mt-1 font-medium">Generous payouts on every completed residency file.</div>
            </div>
            <div className="p-4 rounded-[14px] bg-gradient-to-b from-[#FAF6EE] to-[#EFE7D5] border border-[#E1D4B8] shadow-xs">
              <div className="text-xs font-mono font-bold text-[#8A6412] uppercase">Direct Bank Payouts</div>
              <div className="text-xs text-slate-600 mt-1 font-medium">Fast IBAN settlement upon official visa stamping.</div>
            </div>
            <div className="p-4 rounded-[14px] bg-gradient-to-b from-[#FAF6EE] to-[#EFE7D5] border border-[#E1D4B8] shadow-xs">
              <div className="text-xs font-mono font-bold text-[#8A6412] uppercase">Dedicated Senior PRO</div>
              <div className="text-xs text-slate-600 mt-1 font-medium">Direct case manager handling your clients end-to-end.</div>
            </div>
          </div>

          {/* Referral Button - strictly Golden, NO Green */}
          <div className="pt-3">
            <a
              href={`https://wa.me/${whatsapp}?text=Hello%20800%20DOCS%2C%20I%20am%20interested%20in%20joining%20your%20B2B%20Referral%20Partner%20Program.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold shimmer-sweep text-[#0B0A08] font-black px-8 py-4 rounded-[10px] text-xs uppercase tracking-wider shadow-[0_4px_24px_rgba(239,196,92,0.45)] hover:scale-102 transition-all cursor-pointer inline-flex items-center gap-2.5"
            >
              <Handshake className="w-4 h-4 text-[#0B0A08] stroke-[2.5]" />
              <span>Become an Official Referral Partner →</span>
            </a>
          </div>
        </motion.div>
      </section>

      {/* 2. ARCHITECTURAL LUXURY UAE CORPORATE FOOTER */}
      <footer className="relative font-sans bg-[#0B0A08] text-slate-300 border-t border-[#EFC45C]/25 pt-16 pb-24 md:pb-16 text-xs z-10 overflow-hidden">
        {/* Top Metallic Gold Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#EFC45C] to-transparent" />

        {/* Ambient Warm Golden Luminescence */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[220px] bg-[#EFC45C]/10 rounded-[10px] blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

          {/* 4-Column Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#2A241A]">

            {/* Column 1: Brand & Government Portals (4 Cols) */}
            <div className="lg:col-span-4 space-y-5">
              <div className="flex items-center gap-3 group cursor-pointer" onClick={scrollToTop}>
                {/* Logo Icon Badge */}
                <div className="w-[50px] h-[50px] rounded-[10px] bg-[#14120D] border border-[#EFC45C]/40 flex flex-col items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(239,196,92,0.2)] group-hover:border-[#EFC45C] transition-all">
                  <span className="text-[#EFC45C] font-black text-2xl tracking-tighter leading-none mt-0.5">{logoIcon}</span>
                  <span className="text-[8px] font-bold tracking-widest text-[#F7DE9C]/80 uppercase mt-0.5 mb-0.5">{logoSubtext}</span>
                </div>

                {/* Brand Title & Subtitle */}
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-lg sm:text-xl font-black tracking-tight text-white group-hover:text-[#EFC45C] transition-colors whitespace-nowrap font-mono uppercase">
                    {brandTitle}
                  </span>
                  <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase whitespace-nowrap">
                    {brandSubtitle}
                  </span>
                </div>
              </div>

              <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                <span>{tagline}</span>
              </p>

              {/* Prominent Social Media Channels */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-mono text-[#EFC45C] font-bold uppercase tracking-wider block">
                  Official Social Channels
                </span>
                <div className="flex flex-wrap gap-2">
                  {socialLinksList.map((soc, idx) => {
                    const IconComp = SocialSvg[soc.icon];
                    return (
                      <a
                        key={idx}
                        href={soc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group w-8 h-8 rounded-[8px] bg-[#14120D] border border-[#2A241A] hover:border-[#EFC45C] hover:bg-[#EFC45C]/15 flex items-center justify-center text-slate-400 hover:text-[#EFC45C] transition-all shadow-sm"
                        title={soc.name}
                      >
                        {IconComp ? <IconComp className="w-3.5 h-3.5 fill-current text-slate-400 group-hover:text-[#EFC45C] transition-colors" /> : <span className="font-mono text-xs font-bold">{soc.icon}</span>}
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Official Authority Portals Quick-Links */}
              <div className="space-y-2 pt-2 border-t border-[#2A241A]">
                <div className="text-[11px] font-mono text-[#EFC45C] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#EFC45C]" />
                  <span>Official Authority Portals</span>
                </div>
                <div className="flex flex-wrap gap-2 text-[11px] font-mono text-slate-400">
                  {portals.map((p, idx) => (
                    <a
                      key={idx}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-[8px] bg-[#14120D] border border-[#2A241A] hover:border-[#EFC45C]/50 hover:text-[#EFC45C] flex items-center gap-1.5 transition-colors duration-200"
                    >
                      <span>{p.label}</span>
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Core Residency Services (Categorized Subsections to Prevent Wall of Links) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-[#EFC45C] font-bold border-b border-[#2A241A] pb-2 flex items-center justify-between">
                <span>{servicesColHeading}</span>
                <span className="text-xs text-slate-500 font-mono">Directory</span>
              </div>

              {/* Sub-Category 1: Golden & Investor */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  Golden &amp; Investor Visas
                </span>
                <ul className="space-y-1 text-slate-300">
                  {[
                    { id: 'golden-visa', title: '10-Year Golden Visa' },
                    { id: 'property-visa', title: 'Property Investor Visa (AED 750k+)' },
                    { id: 'dld-trustee', title: 'DLD Trustee Transfer Desk' },
                    { id: 'property-revaluation', title: 'DLD Property Valuation' },
                  ].map((s) => (
                    <li key={s.id}>
                      <button
                        onClick={() => onNavigate('service', s.id)}
                        className="hover:text-[#EFC45C] hover:translate-x-1 transition-all duration-200 cursor-pointer text-left inline-flex items-center gap-2 group w-full py-0.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-[4px] bg-[#EFC45C]/40 group-hover:bg-[#EFC45C] shrink-0 transition-colors" />
                        <span className="text-xs font-medium text-slate-300 group-hover:text-white line-clamp-1">{s.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sub-Category 2: Family & Domestic */}
              <div className="space-y-1.5 pt-2 border-t border-[#2A241A]/60">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  Family &amp; Domestic Sponsorship
                </span>
                <ul className="space-y-1 text-slate-300">
                  {[
                    { id: 'family-visa', title: 'Spouse & Child Residence' },
                    { id: 'newborn-visa', title: 'Newborn Baby Visa (120 Days)' },
                    { id: 'parents-visa', title: 'Parents Residence Visa' },
                    { id: 'maid-visa', title: 'Maid & Domestic Worker Visa' },
                  ].map((s) => (
                    <li key={s.id}>
                      <button
                        onClick={() => onNavigate('service', s.id)}
                        className="hover:text-[#EFC45C] hover:translate-x-1 transition-all duration-200 cursor-pointer text-left inline-flex items-center gap-2 group w-full py-0.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-[4px] bg-[#EFC45C]/40 group-hover:bg-[#EFC45C] shrink-0 transition-colors" />
                        <span className="text-xs font-medium text-slate-300 group-hover:text-white line-clamp-1">{s.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sub-Category 3: Corporate PRO & Legal */}
              <div className="space-y-1.5 pt-2 border-t border-[#2A241A]/60">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  Corporate &amp; Government PRO
                </span>
                <ul className="space-y-1 text-slate-300">
                  {[
                    { id: 'pro-services', title: 'Corporate PRO Retainers' },
                    { id: 'amer-center', title: 'Amer Center Official Desk' },
                    { id: 'attestation', title: 'MOFA Legal Attestation' },
                    { id: 'legal-translation', title: 'Sworn Arabic Legal Translation' },
                  ].map((s) => (
                    <li key={s.id}>
                      <button
                        onClick={() => onNavigate('service', s.id)}
                        className="hover:text-[#EFC45C] hover:translate-x-1 transition-all duration-200 cursor-pointer text-left inline-flex items-center gap-2 group w-full py-0.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-[4px] bg-[#EFC45C]/40 group-hover:bg-[#EFC45C] shrink-0 transition-colors" />
                        <span className="text-xs font-medium text-slate-300 group-hover:text-white line-clamp-1">{s.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 3: Platform & Corporate (2 Cols) */}
            <div className="lg:col-span-2 space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-[#EFC45C] font-bold border-b border-[#2A241A] pb-2">
                <span>{legalColHeading}</span>
              </div>
              <ul className="space-y-2.5 text-slate-300">
                {legalLinks.map((item, i) => (
                  <li key={i}>
                    <button
                      onClick={() => {
                        if (item.view === 'calculator') onOpenCalculator('spouse');
                        else onNavigate(item.view);
                      }}
                      className="hover:text-[#EFC45C] hover:translate-x-1 transition-all duration-200 cursor-pointer text-left inline-flex items-center gap-2 group w-full"
                    >
                      <span className="w-1.5 h-1.5 rounded-[4px] bg-[#EFC45C]/40 group-hover:bg-[#EFC45C] shrink-0 transition-colors" />
                      <span className="text-xs font-medium text-slate-300 group-hover:text-white">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>

              {/* Quick WhatsApp Audit Card */}
              <div className="pt-3">
                <a
                  href={`https://wa.me/${whatsapp}?text=Hello%20800%20DOCS%2C%20I%20would%20like%20to%20verify%20my%20visa%20eligibility.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-[12px] bg-gradient-to-b from-[#181510] to-[#0E0C09] border border-[#EFC45C]/35 hover:border-[#EFC45C] block transition-all group card-shine shadow-sm"
                >
                  <div className="text-xs font-mono text-[#EFC45C] font-bold uppercase mb-0.5">Need Rapid Support?</div>
                  <div className="text-white text-xs font-bold group-hover:text-[#EFC45C] transition-colors flex items-center justify-between">
                    <span>WhatsApp Concierge</span>
                    <span>&rarr;</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Column 4: Physical Office HQ & Contact (3 Cols) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-[#EFC45C] font-bold border-b border-[#2A241A] pb-2">
                <span>{contactColHeading}</span>
              </div>

              <div className="space-y-3 text-slate-300">
                <div className="flex items-center gap-2.5 hover:text-white transition-colors">
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
                  <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="font-mono text-xs">+{whatsapp}</a>
                </div>
                <div className="flex items-center gap-2.5 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-[#EFC45C] shrink-0" />
                  <a href={`tel:${phone}`} className="font-mono text-xs">{phone}</a>
                </div>
                <div className="flex items-center gap-2.5 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-[#EFC45C] shrink-0" />
                  <a href={`mailto:${email}`} className="text-xs truncate">{email}</a>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#EFC45C] mt-0.5 shrink-0" />
                  <div className="flex flex-col text-xs text-slate-400">
                    <span className="text-slate-200">{hours}</span>
                    <span>Sunday : Digital On-Duty</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 hover:text-slate-200 transition-colors">
                  <MapPin className="w-4 h-4 text-[#EFC45C] mt-0.5 shrink-0" />
                  <span className="leading-relaxed text-xs text-slate-400">
                    {address}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Legal Disclaimer Box */}
          <div className="mt-8 p-4 rounded-[14px] bg-[#14120D] border border-[#2A241A] text-center">
            <p className="text-xs text-slate-400 max-w-5xl mx-auto leading-relaxed">
              <strong className="text-slate-300">Disclaimer:</strong> {disclaimer || 'Propertyvisadubai.ae is operated by Brightlink Management Consultancy LLC & 800 DOCS LLC SOC, licensed private third-party document clearing service providers in Dubai. We are not a government authority and have no affiliation with, or endorsement from, the Government of the UAE. We assist applicants with visa-related typing, documentation, and filing through relevant official channels (GDRFA Dubai, ICP, MOFA, DLD), acting on customer consent. Government tariffs are set by official authorities and paid directly to them; our professional concierge service fee is disclosed with 100% itemization prior to commitment. Customers can also apply directly via icp.gov.ae, gdrfad.gov.ae, or u.ae.'}
            </p>
          </div>

          {/* Bottom Copyright & Back to Top Row */}
          <div className="mt-8 pt-6 border-t border-[#2A241A] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-3 text-xs text-slate-400 font-mono">
              <span>© 2026 PropertyVisaDubai. All rights reserved.</span>
              <span className="hidden sm:inline text-slate-700">•</span>
              <span className="text-xs text-slate-400">{bottomBadge}</span>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[#14120D] border border-[#2A241A] hover:border-[#EFC45C] text-slate-300 hover:text-[#EFC45C] transition-colors text-xs font-mono font-bold cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#EFC45C]" />
            </button>
          </div>

        </div>
      </footer>
    </>
  );
}

        export default Footer;
