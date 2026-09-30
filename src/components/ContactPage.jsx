import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Mail, Clock, MessageSquare, ArrowRight } from 'lucide-react';
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
    <div className="pt-8 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12 animate-fade-in relative z-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="text-brand-primary font-mono text-xs font-bold uppercase tracking-widest">
          CONTACT US
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-content-primary dark:text-white leading-tight">
          {headline}
        </h1>
        <p className="text-content-muted dark:text-slate-400 text-base sm:text-lg">
          {subtext}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        {/* Contact Details */}
        <motion.div
          whileHover={{ y: -5 }}
          className="p-8 rounded-xl border border-border-subtle dark:border-white/10 bg-surface dark:bg-brand-surface shadow-sm flex flex-col space-y-6"
        >
          <div className="w-14 h-14 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-2">
            <MapPin className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-bold text-content-primary dark:text-white font-display">Our Office</h3>
          
          <div className="space-y-4 text-sm font-semibold text-content-secondary dark:text-slate-300">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-brand-primary shrink-0" />
              <span>{address}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-brand-primary shrink-0" />
              <span>{phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-brand-primary shrink-0" />
              <span>{email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-brand-primary shrink-0" />
              <span>{hours}</span>
            </div>
          </div>
        </motion.div>

        {/* Action Options */}
        <motion.div
          whileHover={{ y: -5 }}
          className="p-8 rounded-xl border border-border-subtle dark:border-white/10 bg-surface dark:bg-brand-surface shadow-sm flex flex-col justify-center space-y-6"
        >
          <h3 className="text-2xl font-bold text-content-primary dark:text-white font-display text-center mb-4">How can we help?</h3>
          <a href={`https://wa.me/${cmsConfig?.global?.whatsappRaw || siteConfig.whatsappRaw}`} target="_blank" rel="noopener noreferrer" className="w-full py-4 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center justify-center gap-2">
            Chat on WhatsApp <MessageSquare className="w-4 h-4" />
          </a>
          <button onClick={() => onOpenCalculator('spouse')} className="w-full py-4 rounded-xl font-bold bg-gold-gradient btn-shine-effect text-black hover:brightness-110 transition-colors flex items-center justify-center gap-2">
            Calculate Visa Cost <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Render Markdown Content if available */}
      {cmsConfig?.pages?.contact?.contentMarkdown && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 rounded-xl bg-surface dark:bg-brand-surface border border-border-subtle dark:border-white/10 shadow-xl prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: marked.parse(cmsConfig.pages.contact.contentMarkdown) }}
        />
      )}
      
    </div>
  );
}
