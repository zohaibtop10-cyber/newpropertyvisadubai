import React from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { motion } from 'framer-motion';
import { ShieldCheck, Phone, Mail, MapPin, ExternalLink, ArrowUp, Heart, Handshake, Clock } from 'lucide-react';
import { siteConfig, servicesData } from '../data/cmsData';

export default function Footer({ onNavigate, onOpenCalculator, cmsConfig }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // CMS-driven contact info
  const phone = cmsConfig?.global?.phone || '+971566556645';
  const whatsapp = cmsConfig?.global?.whatsappRaw || '971566556645';
  const email = cmsConfig?.global?.email || 'info@brightlinkconsulting.ae';
  const address = cmsConfig?.global?.address || 'Office M08-27, M1 Floor, Crystal Tower, Millennium Central Same Building, Al Asayel St, Business Bay, Dubai, U.A.E - PO Box: 554552';
  const hours = cmsConfig?.global?.officeHours || 'Monday - Saturday : 9 AM - 6 PM';
  const disclaimer = cmsConfig?.global?.footerDisclaimer || null;
  const referralTitle = cmsConfig?.aboutPage?.referral?.title || 'Grow Together With Our B2B Referral Program';
  const referralDesc = cmsConfig?.aboutPage?.referral?.description || `Partner with ${siteConfig.operatorName} through our structured B2B and Corporate Referral Program.`;
  const referralBtn = cmsConfig?.aboutPage?.referral?.buttonText || 'Become a Referral Partner';

  const socialLinks = {
    facebook: cmsConfig?.global?.social?.facebook || siteConfig.socialLinks.facebook,
    instagram: cmsConfig?.global?.social?.instagram || siteConfig.socialLinks.instagram,
    linkedin: cmsConfig?.global?.social?.linkedin || siteConfig.socialLinks.linkedin,
    tiktok: cmsConfig?.global?.social?.tiktok || siteConfig.socialLinks.tiktok,
    youtube: cmsConfig?.global?.social?.youtube || siteConfig.socialLinks.youtube,
    twitter: cmsConfig?.global?.social?.twitter || siteConfig.socialLinks.twitter,
    pinterest: cmsConfig?.global?.social?.pinterest || siteConfig.socialLinks.pinterest,
    telegram: cmsConfig?.global?.social?.telegram || siteConfig.socialLinks.telegram,
  };

  return (
    <>
      {/* Referral Partnership Banner */}
      <div className="border-t border-brand-gold/10 bg-brand-darkBg py-16 px-4 font-sans">
        <motion.div
          className="max-w-4xl mx-auto text-center space-y-6 p-10 bg-brand-surfaceLight rounded-xl border border-white/5 backdrop-blur-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          whileHover={{ scale: 1.02, boxShadow: "0px 10px 30px rgba(212, 175, 55, 0.15)" }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            {referralTitle}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            {referralDesc}
          </p>
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-gold-gradient btn-shine-effect hover:brightness-110 text-black px-8 py-3.5 rounded-full font-extrabold transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] hover:-translate-y-1 hover:scale-105 active:scale-95"
          >
            <Handshake className="w-5 h-5" />
            {referralBtn} &rarr;
          </a>
        </motion.div>
      </div>

      <footer className="relative font-sans bg-brand-darkBg text-zinc-400 border-t border-brand-gold/10 pt-16 pb-24 md:pb-16 text-xs z-10 overflow-hidden">
        {/* Decorative gradient line at top */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gold-shimmer" />

        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-12 gap-10 relative z-10">

          {/* Brand Column (4 Columns) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex flex-row items-center gap-2.5 group cursor-pointer" onClick={scrollToTop}>
              {/* Logo Icon Badge */}
              <div className="w-[52px] h-[52px] rounded-[14px] bg-[#1A1A1A] dark:bg-[#121417] border border-white/10 dark:border-brand-primary/30 flex flex-col items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(212,175,55,0.15)] group-hover:shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-shadow">
                <span className="text-brand-primary font-black text-2xl tracking-tighter leading-none mt-1">PV</span>
                <span className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase mt-0.5 mb-1">DUBAI</span>
              </div>

              {/* Brand Title & Subtitle */}
              <div className="flex flex-col min-w-0 text-left leading-tight">
                <span className="text-[clamp(18px,1.8vw,24px)] font-black tracking-tight text-white whitespace-nowrap">
                  PropertyVisa<span className="text-brand-primary">Dubai</span>
                </span>
                <span className="text-[11px] font-semibold tracking-wider text-zinc-500 uppercase whitespace-nowrap">
                  operated by brightlink
                </span>
              </div>
            </div>

            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
              {siteConfig.subtagline} Independent document clearing consultancy operated by {siteConfig.operatorName} (Dubai, UAE).
            </p>

            {/* Official Government Portals Links */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <div className="text-[11px] font-mono text-brand-goldLight font-semibold uppercase">Official Authority Portals:</div>
              <div className="flex flex-wrap gap-3 text-[11px] font-mono text-zinc-400">
                {siteConfig.officialPortals.map((p, idx) => (
                  <a
                    key={idx}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-gold flex items-center gap-1 transition-colors duration-200"
                  >
                    <span>{p.label}</span>
                    <ExternalLink className="w-3 h-3 text-zinc-600" />
                  </a>
                ))}
              </div>
            </div>

            <div className="text-[11px] font-mono text-zinc-500 pt-2">
              © {new Date().getFullYear()} {siteConfig.domain} · {siteConfig.operatorName}. All Rights Reserved.
            </div>
          </div>

          {/* Core Services Links (3 Columns) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-brand-goldLight font-semibold">
              Residency Services
            </div>
            <ul className="space-y-2 text-zinc-400">
              {servicesData.map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => onNavigate('service', service.id)}
                    className="hover:text-brand-gold hover:translate-x-1 transition-all duration-200 cursor-pointer text-left inline-flex items-center gap-1"
                  >
                    <span className="w-1 h-1 rounded-full bg-zinc-700 group-hover:bg-brand-gold shrink-0" />
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Corporate & Legal Links (2 Columns) */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-brand-goldLight font-semibold">
              Platform & Legal
            </div>
            <ul className="space-y-2 text-zinc-400">
              {[
                { label: 'Homepage', action: () => onNavigate('home') },
                { label: 'Visa Calculator', action: () => onOpenCalculator('spouse') },
                { label: 'Residency Guides', action: () => onNavigate('blog-index') },
                { label: 'About Us', action: () => onNavigate('about') },
                { label: 'Terms & Privacy', action: () => onNavigate('privacy') },
              ].map((item, i) => (
                <li key={i}>
                  <button
                    onClick={item.action}
                    className="hover:text-brand-gold hover:translate-x-1 transition-all duration-200 cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Physical Office HQ & Contact (3 Columns) */}
          <div className="md:col-span-3 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-brand-gold drop-shadow-[0_0_5px_rgba(212,175,55,0.3)] font-semibold">
              Advisory Desk & HQ
            </div>
            <div className="space-y-3 text-zinc-400">
              <div className="flex items-center gap-3 hover:text-white transition-colors">
                <WhatsAppIcon className="w-4 h-4 text-brand-goldLight" />
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">+{whatsapp}</a>
              </div>
              <div className="flex items-center gap-3 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-brand-gold" />
                <a href={`tel:${phone}`}>{phone}</a>
              </div>
              <div className="flex items-center gap-3 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-brand-gold" />
                <a href={`mailto:${email}`}>{email}</a>
              </div>
              <div className="flex items-start gap-3 mt-1">
                <Clock className="w-4 h-4 text-brand-gold mt-0.5 shrink-0" />
                <div className="flex flex-col text-sm">
                  <span>{hours}</span>
                  <span>Sunday : Closed</span>
                </div>
              </div>
              <div className="flex items-start gap-3 mt-1 hover:text-zinc-300 transition-colors">
                <MapPin className="w-4 h-4 text-brand-gold mt-0.5 shrink-0" />
                <span className="leading-relaxed">
                  {address}
                </span>
              </div>
            </div>            {/* Social Media Links */}
            <div className="pt-6 mt-6 border-t border-brand-gold/10 flex items-center gap-2 flex-wrap">
              {socialLinks.facebook && (
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-brand-surfaceLight hover:bg-[#1877F2] border border-white/10 flex items-center justify-center text-brand-gold hover:text-white hover:border-transparent transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                </a>
              )}
              {socialLinks.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-brand-surfaceLight hover:bg-[#E1306C] border border-white/10 flex items-center justify-center text-brand-gold hover:text-white hover:border-transparent transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                </a>
              )}
              {socialLinks.tiktok && (
                <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-brand-surfaceLight hover:bg-black border border-white/10 flex items-center justify-center text-brand-gold hover:text-white hover:border-transparent transition-all">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 15.68a6.34 6.34 0 0012.67-1.13V8.84A8.32 8.32 0 0021.72 10.5V7a5.53 5.53 0 01-2.13-.31z" /></svg>
                </a>
              )}
              {socialLinks.linkedin && (
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-brand-surfaceLight hover:bg-[#0077b5] border border-white/10 flex items-center justify-center text-brand-gold hover:text-white hover:border-transparent transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                </a>
              )}
              {socialLinks.youtube && (
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-brand-surfaceLight hover:bg-[#FF0000] border border-white/10 flex items-center justify-center text-brand-gold hover:text-white hover:border-transparent transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                </a>
              )}
              {socialLinks.twitter && (
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-brand-surfaceLight hover:bg-black border border-white/10 flex items-center justify-center text-brand-gold hover:text-white hover:border-transparent transition-all">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M13.969 10.157l8.738-10.157h-2.071l-7.587 8.819-6.060-8.819h-6.989l9.164 13.336-9.164 10.651h2.071l8.012-9.313 6.4 9.313h6.989l-9.503-13.831zM11.133 13.454l-8.316-11.895h3.181l14.64 20.941h-3.181l-6.324-9.046z" /></svg>
                </a>
              )}
              {socialLinks.pinterest && (
                <a href={socialLinks.pinterest} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-brand-surfaceLight hover:bg-[#E60023] border border-white/10 flex items-center justify-center text-brand-gold hover:text-white hover:border-transparent transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.366 18.605 0 12.017 0z" /></svg>
                </a>
              )}
              {socialLinks.telegram && (
                <a href={socialLinks.telegram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-brand-surfaceLight hover:bg-[#229ED9] border border-white/10 flex items-center justify-center text-brand-gold hover:text-white hover:border-transparent transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.686c.223-.195-.054-.282-.346-.088l-6.4 4.024-2.76-.86c-.6-.185-.615-.6.125-.89l10.736-4.136c.5-.184.945.116.825.992z" /></svg>
                </a>
              )}
            </div>


          </div>

        </div>
        {/* Disclaimer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 pt-8 border-t border-brand-gold/10 relative z-10 text-center">
          <p className="text-[10px] text-zinc-500 max-w-5xl mx-auto leading-relaxed">
            <strong>Disclaimer:</strong> Propertyvisadubai.ae is operated by Brightlink Management Consultancy LLC, a private third-party service provider licensed in Dubai. We are not a government authority and have no affiliation with, or endorsement from, the Government of the UAE or any of its departments. We assist customers with visa-related typing, documentation, application filling and submission through the relevant official channels (GDRFA Dubai, ICP, MOFA), acting on the customer's behalf and with their consent. Government fees are set by the authorities and paid to them; our service fee is charged separately and disclosed before any commitment. Applicants can complete the same applications directly through the official portals: icp.gov.ae, gdrfad.gov.ae, u.ae. Estimates shown are for information only and do not constitute legal advice. Content last reviewed 01-09-2026.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6 pt-6 border-t border-brand-gold/10 relative z-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500">
            <span className="flex items-center gap-1.5">
              Made with <Heart className="w-3 h-3 text-brand-gold fill-brand-gold" /> in Dubai, UAE
            </span>
            <span className="font-mono">
              Licensed PRO Document Clearing • DED Business Registration
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
