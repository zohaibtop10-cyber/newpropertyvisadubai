import React, { useState } from 'react';
import { Mail, Phone, Globe, MessageCircle } from 'lucide-react';

// Custom Minimalist SVG Social Icons
const LinkedInIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

const InstagramIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export default function Topbar({ cmsConfig }) {
  const [currentLang, setCurrentLang] = useState('EN');
  
  const email = cmsConfig?.global?.email || "info@propertyvisadubai.com";
  const phone = cmsConfig?.global?.phone || "+971 50 123 4567";
  const whatsappRaw = cmsConfig?.global?.whatsappRaw || "971501234567";
  const socials = cmsConfig?.global?.socials || {
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com"
  };

  return (
    <div className="w-full bg-[#0a0a0a] text-slate-300 border-b border-white/10 text-xs py-2 px-4 md:px-8 relative z-50 selection:bg-gold selection:text-black">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Section: Email & Phone Contact Info */}
        <div className="flex items-center gap-4 sm:gap-6 mx-auto md:mx-0">
          {/* Email Address (Hidden on Mobile) */}
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2 text-slate-300 hover:text-gold transition-colors font-mono text-[11px] sm:text-xs group"
          >
            <Mail className="w-3.5 h-3.5 text-gold group-hover:scale-110 transition-transform" />
            <span>{email}</span>
          </a>

          {/* Vertical Divider (Hidden on Mobile) */}
          <span className="block h-3.5 w-[1px] bg-surface/15" />

          {/* Phone Number */}
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-2 text-slate-200 hover:text-gold transition-colors font-mono font-semibold text-xs group"
          >
            <Phone className="w-3.5 h-3.5 text-gold group-hover:scale-110 transition-transform" />
            <span>{phone}</span>
          </a>
        </div>

        {/* Right Section: Minimalist Social Icons & Language Switcher (Hidden on Mobile) */}
        <div className="flex items-center gap-5">
          {/* Social Media Icons */}
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-text-muted hover:text-gold transition-colors p-1 hover:scale-110"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </a>

            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-text-muted hover:text-gold transition-colors p-1 hover:scale-110"
              >
                <LinkedInIcon className="w-3.5 h-3.5" />
              </a>
            )}

            {socials.instagram && (
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-text-muted hover:text-gold transition-colors p-1 hover:scale-110"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
            )}

            {socials.facebook && (
              <a
                href={socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-text-muted hover:text-gold transition-colors p-1 hover:scale-110"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Vertical Divider */}
          <span className="h-3.5 w-[1px] bg-surface/15" />

          {/* Language Selector Dropdown */}
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <Globe className="w-3.5 h-3.5 text-gold" />
            <button
              onClick={() => setCurrentLang(currentLang === 'EN' ? 'AR' : 'EN')}
              className="text-slate-300 hover:text-gold transition-colors font-bold uppercase cursor-pointer"
            >
              <span className={currentLang === 'EN' ? 'text-gold font-extrabold' : 'text-text-muted'}>EN</span>
              <span className="text-text-muted mx-1">|</span>
              <span className={currentLang === 'AR' ? 'text-gold font-extrabold' : 'text-text-muted'}>AR</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
