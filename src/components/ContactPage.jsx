import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Mail, Clock, MessageSquare, ArrowRight, Sparkles, Building2 } from 'lucide-react';
import { marked } from 'marked';
import { siteConfig } from '../data/cmsData';

export default function ContactPage({ onOpenCalculator, cmsConfig }) {
  const headline = cmsConfig?.pages?.contact?.headline || "Get in Touch with Family Visa Specialists";
  const subtext = cmsConfig?.pages?.contact?.subtext || "Connect directly on WhatsApp or visit our Dubai advisory desk at Business Village.";
  const address = cmsConfig?.pages?.contact?.address || "Suite 402, Block B, Business Village, Deira, Clock Tower Roundabout, Dubai, UAE";
  const phone = cmsConfig?.pages?.contact?.phone || "+971 4 220 8899";
  const email = cmsConfig?.pages?.contact?.email || "advisory@familyvisa.ae";
  const hours = cmsConfig?.pages?.contact?.hours || "Mon - Sat: 8:00 AM - 7:00 PM (GST)";

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-12 relative z-10 font-sans transition-colors duration-200">
      
      {/* Ambient Radial Glow Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.12)_0%,transparent_70%)] opacity-70 pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[10px] bg-[#8C5E00]/10 dark:bg-[#8C5E00]/20 border border-[#8C5E00]/30 dark:border-[#D4AF37]/30 text-[#8C5E00] dark:text-[#FFE58F] text-xs font-mono font-bold uppercase tracking-widest shadow-md">
          <Sparkles className="w-4 h-4 text-[#8C5E00] dark:text-[#D4AF37]" /> EXECUTIVE CONCIERGE DESK
        </div>
        <h1 className="font-display font-black text-4xl sm:text-6xl text-text  leading-tight tracking-tight">
          {headline.includes("Specialists") ? (
            <>
              {headline.replace("Specialists", "")}
              <span className="text-dark-gold-shine">Specialists</span>
            </>
          ) : headline}
        </h1>
        <p className="text-text-muted dark:text-slate-300 text-base sm:text-lg font-medium leading-relaxed">
          {subtext}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        {/* Contact Details Card */}
        <motion.div
          whileHover={{ y: -6 }}
          className="p-8 rounded-[12px] border border-border-hairline dark:border-white/10 bg-surface/80 dark:bg-[#111111]/80 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-2xl flex flex-col space-y-6 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <div className="w-14 h-14 rounded-[12px] bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] dark:text-[#D4AF37] flex items-center justify-center mb-2 shadow-sm">
            <Building2 className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-black text-text  font-sans tracking-tight">Our Dubai Headquarters</h3>
          
          <div className="space-y-5 text-sm font-semibold text-text dark:text-slate-300">
            <div className="flex items-start gap-3.5">
              <div className="p-1.5 rounded-[8px] bg-[#D4AF37]/10 border border-[#D4AF37]/20 shrink-0 mt-0.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] dark:text-[#D4AF37]" />
              </div>
              <span className="leading-relaxed">{address}</span>
            </div>
            <div className="flex items-center gap-3.5">
              <div className="p-1.5 rounded-[8px] bg-[#D4AF37]/10 border border-[#D4AF37]/20 shrink-0">
                <Phone className="w-4 h-4 text-[#D4AF37] dark:text-[#D4AF37]" />
              </div>
              <span>{phone}</span>
            </div>
            <div className="flex items-center gap-3.5">
              <div className="p-1.5 rounded-[8px] bg-[#D4AF37]/10 border border-[#D4AF37]/20 shrink-0">
                <Mail className="w-4 h-4 text-[#D4AF37] dark:text-[#D4AF37]" />
              </div>
              <span>{email}</span>
            </div>
            <div className="flex items-center gap-3.5">
              <div className="p-1.5 rounded-[8px] bg-[#D4AF37]/10 border border-[#D4AF37]/20 shrink-0">
                <Clock className="w-4 h-4 text-[#D4AF37] dark:text-[#D4AF37]" />
              </div>
              <span>{hours}</span>
            </div>
          </div>
        </motion.div>

        {/* Action Options Card */}
        <motion.div
          whileHover={{ y: -6 }}
          className="p-8 rounded-[12px] border border-border-hairline dark:border-white/10 bg-surface/80 dark:bg-[#111111]/80 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-2xl flex flex-col justify-center space-y-6 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <h3 className="text-2xl font-black text-text  font-sans text-center mb-2 tracking-tight">Direct Client Concierge</h3>
          
          <a
            href={`https://wa.me/${cmsConfig?.global?.whatsappRaw || siteConfig.whatsappRaw}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 rounded-[10px] font-black text-sm uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-lg hover:shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Chat Live on WhatsApp</span>
          </a>

          <button
            onClick={() => onOpenCalculator('spouse')}
            className="w-full py-4 rounded-[10px] bg-dark-gold-gloss text-slate-950 font-black text-sm uppercase tracking-wider shadow-[0_8px_16px_rgba(212,175,55,0.25)] hover:shadow-[0_12px_24px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Calculate Visa Cost</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Render Markdown Content if available */}
      {cmsConfig?.pages?.contact?.contentMarkdown && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 sm:p-10 rounded-[12px] bg-surface dark:bg-[#111111] border border-border-hairline dark:border-white/10 shadow-xl prose dark:prose-invert max-w-none text-text dark:text-slate-300"
          dangerouslySetInnerHTML={{ __html: marked.parse(cmsConfig.pages.contact.contentMarkdown) }}
        />
      )}
      
    </div>
  );
}
