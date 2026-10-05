import React from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { motion } from 'framer-motion';
import { ShieldCheck, Phone, Mail, MapPin, ExternalLink, ArrowUp, Heart, Handshake, Clock } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';
import { siteConfig, servicesData } from '../data/cmsData';

const SocialSvg = {
  FB: (props) => (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  IG: (props) => (
    <svg className="w-4 h-4 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  TK: (props) => (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-2.22V8.2a6.34 6.34 0 0 0-5.06 6.13 6.34 6.34 0 1 0 10.86-4.54 8.24 8.24 0 0 0 4.31 1.15v-4.25z"/>
    </svg>
  ),
  IN: (props) => (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
    </svg>
  ),
  YT: (props) => (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  X: (props) => (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  PIN: (props) => (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" {...props}>
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
    </svg>
  ),
  TG: (props) => (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" {...props}>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )
};

export default function Footer({ onNavigate, onOpenCalculator, cmsConfig }) {
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
      {/* Referral Partnership Banner */}
      <section className="border-t border-[#D4AF37]/10 bg-[#0a0a0a] py-24 px-4 font-sans text-white relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />
        
        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center space-y-8 p-10 sm:p-14 bg-white/5 backdrop-blur-2xl rounded-[10px] border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          whileHover={{ boxShadow: "0px 15px 40px rgba(212, 175, 55, 0.15)", borderColor: "rgba(212, 175, 55, 0.3)" }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-4">
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
              <span>{referralTitle}</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              <span>{referralDesc}</span>
            </p>
          </div>
          
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-dark-gold-gloss text-slate-950 px-10 py-4 rounded-[10px] font-black text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_8px_20px_rgba(212,175,55,0.25)] hover:shadow-[0_12px_25px_rgba(212,175,55,0.35)] hover:-translate-y-1"
          >
            <Handshake className="w-5 h-5 shrink-0" />
            <span>{referralBtn} &rarr;</span>
          </a>
        </motion.div>
      </section>

      {/* Main Footer */}
      <footer className="relative font-sans bg-[#050505] text-zinc-400 border-t border-white/10 pt-16 pb-24 md:pb-16 text-xs z-10 overflow-hidden">
        {/* Decorative gradient line at top */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gold-shimmer" />

        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#D4AF37]/5 rounded-[10px] blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-12 gap-10 relative z-10">

          {/* Brand Column (4 Columns) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex flex-row items-center gap-2.5 group cursor-pointer" onClick={scrollToTop}>
              {/* Logo Icon Badge */}
              <div className="w-[52px] h-[52px] rounded-[10px] bg-[#1A1A1A] border border-white/10 flex flex-col items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(212,175,55,0.15)] group-hover:shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-shadow">
                <span className="text-[#D4AF37] font-black text-2xl tracking-tighter leading-none mt-1">{logoIcon}</span>
                <span className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase mt-0.5 mb-1">{logoSubtext}</span>
              </div>

              {/* Brand Title & Subtitle */}
              <div className="flex flex-col min-w-0 text-left leading-tight">
                <span className="text-[clamp(18px,1.8vw,24px)] font-black tracking-tight text-white whitespace-nowrap">
                  {brandTitle}
                </span>
                <span className="text-[11px] font-semibold tracking-wider text-zinc-500 uppercase whitespace-nowrap">
                  {brandSubtitle}
                </span>
              </div>
            </div>

            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
              <span>{tagline}</span>
            </p>

            {/* Official Government Portals Links */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <div className="text-[11px] font-mono text-[#D4AF37] font-semibold uppercase">Official Authority Portals:</div>
              <div className="flex flex-wrap gap-3 text-[11px] font-mono text-zinc-400">
                {portals.map((p, idx) => (
                  <a
                    key={idx}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#D4AF37] flex items-center gap-1 transition-colors duration-200"
                  >
                    <span>{p.label}</span>
                    <ExternalLink className="w-3 h-3 text-zinc-600" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Core Services Links (3 Columns) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] font-semibold">
              <span>{servicesColHeading}</span>
            </div>
            <ul className="space-y-2 text-zinc-400">
              {servicesData.map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => onNavigate('service', service.id)}
                    className="hover:text-[#D4AF37] hover:translate-x-1 transition-all duration-200 cursor-pointer text-left inline-flex items-center gap-1"
                  >
                    <span className="w-1 h-1 rounded-[10px] bg-zinc-700 group-hover:bg-[#D4AF37] shrink-0" />
                    <span>{service.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Corporate & Legal Links (2 Columns) */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] font-semibold">
              <span>{legalColHeading}</span>
            </div>
            <ul className="space-y-2 text-zinc-400">
              {legalLinks.map((item, i) => (
                <li key={i}>
                  <button
                    onClick={() => {
                      if (item.view === 'calculator') onOpenCalculator('spouse');
                      else onNavigate(item.view);
                    }}
                    className="hover:text-[#D4AF37] hover:translate-x-1 transition-all duration-200 cursor-pointer"
                  >
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Physical Office HQ & Contact (3 Columns) */}
          <div className="md:col-span-3 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] font-semibold">
              <span>{contactColHeading}</span>
            </div>
            <div className="space-y-3 text-zinc-400">
              <div className="flex items-center gap-3 hover:text-white transition-colors">
                <WhatsAppIcon className="w-4 h-4 text-[#D4AF37]" />
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">+{whatsapp}</a>
              </div>
              <div className="flex items-center gap-3 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <a href={`tel:${phone}`}>{phone}</a>
              </div>
              <div className="flex items-center gap-3 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                <a href={`mailto:${email}`}>{email}</a>
              </div>
              <div className="flex items-start gap-3 mt-1">
                <Clock className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                <div className="flex flex-col text-xs">
                  <span>{hours}</span>
                  <span>Sunday : Closed</span>
                </div>
              </div>
              <div className="flex items-start gap-3 mt-1 hover:text-zinc-300 transition-colors">
                <MapPin className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                <span className="leading-relaxed text-xs">
                  {address}
                </span>
              </div>
            </div>

            {/* Social Links under Advisory Desk & HQ */}
            <div className="pt-3 border-t border-white/10 space-y-2">
              <div className="text-[11px] font-mono text-[#D4AF37] font-semibold uppercase">Connect With Us:</div>
              <div className="flex flex-wrap gap-2">
                {socialLinksList.map((soc, idx) => {
                  const IconComp = SocialSvg[soc.icon];
                  return (
                    <a
                      key={idx}
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-[10px] bg-white/5 border border-white/15 flex items-center justify-center text-white/80 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-[#D4AF37]/15 transition-all shadow-sm group"
                      title={soc.name}
                    >
                      {IconComp ? <IconComp className="w-4 h-4 text-slate-300 group-hover:text-[#D4AF37] transition-colors" /> : <span className="font-mono text-[10px] font-bold">{soc.icon}</span>}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* Disclaimer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 pt-6 border-t border-white/10 relative z-10 text-center">
          <p className="text-[10px] text-zinc-500 max-w-5xl mx-auto leading-relaxed">
            <strong>Disclaimer:</strong> {disclaimer || 'Propertyvisadubai.ae is operated by Brightlink Management Consultancy LLC, a private third-party service provider licensed in Dubai. We are not a government authority and have no affiliation with, or endorsement from, the Government of the UAE or any of its departments. We assist customers with visa-related typing, documentation, application filling and submission through the relevant official channels (GDRFA Dubai, ICP, MOFA), acting on the customer\'s behalf and with their consent. Government fees are set by the authorities and paid to them; our service fee is charged separately and disclosed before any commitment. Applicants can complete the same applications directly through the official portals: icp.gov.ae, gdrfad.gov.ae, u.ae.'}
          </p>
        </div>

        {/* Directive 11: Copyright Line (Centered bottom border border-t border-white/10 pt-6 mt-12 with exact text) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 border-t border-white/10 pt-6 mt-12 text-center">
          <p className="text-xs text-slate-400 font-mono font-medium m-0">
            © 2026 PropertyVisaDubai. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
