import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Scale, Check, ArrowRight, MessageSquare } from 'lucide-react';
import { marked } from 'marked';

export default function PropertyPage({ onOpenCalculator, onNavigate, cmsConfig }) {
  const headline = cmsConfig?.pages?.property?.headline || "Comprehensive Property Investor Services";
  const subtext = cmsConfig?.pages?.property?.subtext || "End-to-end management for property investors. From DLD registration to Golden Visa processing through real estate investment.";

  return (
    <div className="pt-8 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12 animate-fade-in relative z-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="text-brand-primary font-mono text-xs font-bold uppercase tracking-widest">
          REAL ESTATE & INVESTORS
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-content-primary dark:text-white leading-tight">
          {headline}
        </h1>
        <p className="text-content-muted dark:text-slate-400 text-base sm:text-lg">
          {subtext}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        {/* Service 1 */}
        <motion.div
          whileHover={{ y: -5 }}
          className="p-8 rounded-xl border border-border-subtle dark:border-white/10 bg-surface dark:bg-brand-surface shadow-sm flex flex-col"
        >
          <div className="w-14 h-14 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-6">
            <Building2 className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-bold text-content-primary dark:text-white mb-4 font-display">Property Investor Visa</h3>
          <p className="text-content-muted dark:text-slate-400 text-sm leading-relaxed mb-8 flex-1">
            End-to-end processing for the 2-Year and 10-Year (Golden) Property Investor visas. We handle everything from the initial DLD taskeen to medical checks and Emirates ID issuance.
          </p>
          <ul className="space-y-4 text-sm font-semibold text-content-secondary dark:text-slate-300 mb-8">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-brand-primary shrink-0" />
              <span>DLD Taskeen Application Processing</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-brand-primary shrink-0" />
              <span>10-Year Golden Visa via Real Estate (AED 2M+)</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-brand-primary shrink-0" />
              <span>2-Year Property Visa (AED 750k+)</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-brand-primary shrink-0" />
              <span>Complete Family Sponsorship Inclusion</span>
            </li>
          </ul>
          <button onClick={() => onOpenCalculator('property')} className="w-full py-4 rounded-xl font-bold bg-gold-gradient btn-shine-effect text-black font-extrabold hover:brightness-110 transition-colors flex items-center justify-center gap-2">
            Calculate Property Visa Cost <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Service 2 */}
        <motion.div
          whileHover={{ y: -5 }}
          className="p-8 rounded-xl border border-border-subtle dark:border-white/10 bg-surface dark:bg-brand-surface shadow-sm flex flex-col"
        >
          <div className="w-14 h-14 rounded-xl bg-zinc-100 dark:bg-white/5 text-content-primary dark:text-white flex items-center justify-center mb-6">
            <Scale className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-bold text-content-primary dark:text-white mb-4 font-display">DLD Trustee & Revaluation</h3>
          <p className="text-content-muted dark:text-slate-400 text-sm leading-relaxed mb-8 flex-1">
            Complete representation at the Dubai Land Department. We assist with official property revaluation for visa eligibility, title deed transfers, and POA management.
          </p>
          <ul className="space-y-4 text-sm font-semibold text-content-secondary dark:text-slate-300 mb-8">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-brand-primary shrink-0" />
              <span>Title Deed Updates & Amendments</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-brand-primary shrink-0" />
              <span>Official Property Revaluation for Visa</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-brand-primary shrink-0" />
              <span>Representation via Power of Attorney (POA)</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-brand-primary shrink-0" />
              <span>Ejari Registration & Management</span>
            </li>
          </ul>
          <button onClick={() => onNavigate('contact')} className="w-full py-4 rounded-xl font-bold bg-brand-surfaceLight dark:bg-white text-white dark:text-slate-900 hover:bg-brand-primary dark:hover:bg-brand-primary dark:hover:text-white transition-colors flex items-center justify-center gap-2">
            Talk to an Expert <MessageSquare className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Render Markdown Content if available */}
      {cmsConfig?.pages?.property?.contentMarkdown && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 rounded-xl bg-surface dark:bg-brand-surface border border-border-subtle dark:border-white/10 shadow-xl prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: marked.parse(cmsConfig.pages.property.contentMarkdown) }}
        />
      )}
      
    </div>
  );
}
