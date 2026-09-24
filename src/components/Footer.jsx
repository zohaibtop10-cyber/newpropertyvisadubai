import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Phone, Mail, MapPin, ExternalLink, ArrowUp, MessageSquare, Heart } from 'lucide-react';
import { siteConfig, servicesData } from '../data/cmsData';

export default function Footer({ onNavigate, onOpenCalculator, cmsConfig }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-slate-950 to-[#0A0B0D] text-slate-400 border-t border-slate-800/80 pt-16 pb-24 md:pb-16 text-xs z-10 overflow-hidden">
      {/* Decorative gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E01E37]/50 to-transparent" />
      
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#E01E37]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-12 gap-10 relative z-10">
        
        {/* Brand Column (4 Columns) */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E01E37] to-[#B81A2C] flex items-center justify-center text-white shadow-lg shadow-[#E01E37]/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display font-bold text-lg text-white leading-none">
                FamilyVisa<span className="text-[#E01E37]">.ae</span>
              </div>
              <div className="text-[10px] font-mono tracking-wider uppercase text-slate-500 mt-0.5">
                {siteConfig.operatorName}
              </div>
            </div>
          </div>

          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            {siteConfig.subtagline} Independent document clearing consultancy operated by {siteConfig.operatorName} (Dubai, UAE).
          </p>

          {/* Official Government Portals Links */}
          <div className="space-y-2 pt-2 border-t border-slate-800/80">
            <div className="text-[11px] font-mono text-slate-300 font-semibold uppercase">Official Authority Portals:</div>
            <div className="flex flex-wrap gap-3 text-[11px] font-mono text-slate-400">
              {siteConfig.officialPortals.map((p, idx) => (
                <a
                  key={idx}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#E01E37] flex items-center gap-1 transition-colors duration-200"
                >
                  <span>{p.label}</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              ))}
            </div>
          </div>

          <div className="text-[11px] font-mono text-slate-500 pt-2">
            © {new Date().getFullYear()} {siteConfig.domain} · {siteConfig.operatorName}. All Rights Reserved.
          </div>
        </div>

        {/* Core Services Links (3 Columns) */}
        <div className="md:col-span-3 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
            Residency Services
          </div>
          <ul className="space-y-2 text-slate-400">
            {servicesData.map((service) => (
              <li key={service.id}>
                <button
                  onClick={() => onNavigate('service', service.id)}
                  className="hover:text-[#E01E37] hover:translate-x-1 transition-all duration-200 cursor-pointer text-left inline-flex items-center gap-1"
                >
                  <span className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-[#E01E37] shrink-0" />
                  {service.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Corporate & Legal Links (2 Columns) */}
        <div className="md:col-span-2 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
            Platform & Legal
          </div>
          <ul className="space-y-2 text-slate-400">
            {[
              { label: 'Homepage', action: () => onNavigate('home') },
              { label: 'Visa Calculator', action: () => onOpenCalculator('spouse') },
              { label: 'Residency Guides', action: () => onNavigate('blog-index') },
              { label: 'About Us', action: () => onNavigate('about') },
              { label: 'Contact Us', action: () => onNavigate('contact') },
              { label: 'Terms & Privacy', action: () => onNavigate('privacy') },
            ].map((item, i) => (
              <li key={i}>
                <button 
                  onClick={item.action} 
                  className="hover:text-[#E01E37] hover:translate-x-1 transition-all duration-200 cursor-pointer"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Physical Office HQ & Contact (3 Columns) */}
        <div className="md:col-span-3 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
            Advisory Desk & HQ
          </div>
          <div className="space-y-2.5 text-slate-400">
            <div className="flex items-start gap-2 hover:text-slate-300 transition-colors">
              <MapPin className="w-3.5 h-3.5 text-[#E01E37] mt-0.5 shrink-0" />
              <span>{cmsConfig?.global?.address || siteConfig.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#E01E37]" />
              <a href={`tel:${cmsConfig?.global?.phoneRaw || siteConfig.phoneRaw}`} className="hover:text-white transition-colors">
                📞 {cmsConfig?.global?.phone || siteConfig.phone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <a
                href={`https://wa.me/${cmsConfig?.global?.whatsappRaw || siteConfig.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-300 transition-colors text-emerald-400 font-semibold"
              >
                💬 WhatsApp
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#E01E37]" />
              <span>✉️ {cmsConfig?.global?.email || siteConfig.email}</span>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="pt-4 flex items-center gap-3">
            {cmsConfig?.global?.social?.facebook && (
              <a href={cmsConfig.global.social.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#1877F2] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
            )}
            {cmsConfig?.global?.social?.instagram && (
              <a href={cmsConfig.global.social.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#E1306C] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            )}
            {cmsConfig?.global?.social?.linkedin && (
              <a href={cmsConfig.global.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#0077b5] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            )}
          </div>

          {/* Back to top button */}
          <div className="pt-3">
            <motion.button
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-[#E01E37]/10 border border-white/10 hover:border-[#E01E37]/30 text-xs text-slate-300 hover:text-white transition-all cursor-pointer group"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#E01E37] group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          </div>
        </div>

      </div>
      
      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 pt-6 border-t border-slate-800/60 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5">
            Made with <Heart className="w-3 h-3 text-[#E01E37] fill-[#E01E37]" /> in Dubai, UAE
          </span>
          <span className="font-mono">
            Licensed PRO Document Clearing • DED Business Registration
          </span>
        </div>
      </div>
    </footer>
  );
}
