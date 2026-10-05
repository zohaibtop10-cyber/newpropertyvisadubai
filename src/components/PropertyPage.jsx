import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Scale, Check, ArrowRight, MessageSquare } from 'lucide-react';
import { marked } from 'marked';
import ProcessTimeline from './ProcessTimeline';

export default function PropertyPage({ onOpenCalculator, onNavigate, cmsConfig }) {
  const headline = cmsConfig?.pages?.property?.headline || "Comprehensive Property Investor Services";
  const subtext = cmsConfig?.pages?.property?.subtext || "End-to-end management for property investors. From DLD registration to Golden Visa processing through real estate investment.";

  return (
    <div className="pt-8 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12 animate-fade-in relative z-10 font-sans">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="text-[#D4AF37] font-mono text-xs font-bold uppercase tracking-widest">
          REAL ESTATE & INVESTORS
        </div>
        <h1 className="font-sans font-extrabold text-3xl sm:text-5xl text-white leading-tight">
          {headline}
        </h1>
        <p className="text-slate-400 text-base sm:text-lg">
          {subtext}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        {/* Service 1 */}
        <motion.div
          whileHover={{ y: -5 }}
          className="p-8 rounded-[10px] border border-white/10 bg-[#0A0A0A] shadow-xl flex flex-col justify-between group hover:border-[#D4AF37]/50 transition-all"
        >
          <div>
            <div className="w-14 h-14 rounded-[10px] bg-[#8C5E00]/20 border border-[#8C5E00]/30 text-[#FFE58F] flex items-center justify-center mb-6">
              <Building2 className="w-7 h-7 text-[#D4AF37]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 font-sans">Property Investor Visa</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium">
              End-to-end processing for the 2-Year and 10-Year (Golden) Property Investor visas. We handle everything from the initial DLD taskeen to medical checks and Emirates ID issuance.
            </p>
            <ul className="space-y-4 text-sm font-semibold text-slate-300 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>DLD Taskeen Application Processing</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>10-Year Golden Visa via Real Estate (AED 2M+)</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>2-Year Property Visa (AED 750k+)</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>Complete Family Sponsorship Inclusion</span>
              </li>
            </ul>
          </div>
          <button onClick={() => onOpenCalculator('property')} className="w-full py-4 rounded-[10px] font-bold bg-gradient-to-r from-[#C9981E] to-[#FCE181] text-black font-extrabold hover:brightness-110 transition-colors flex items-center justify-center gap-2 cursor-pointer font-mono text-xs uppercase tracking-wider">
            Calculate Property Visa Cost <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Service 2 */}
        <motion.div
          whileHover={{ y: -5 }}
          className="p-8 rounded-[10px] border border-white/10 bg-[#0A0A0A] shadow-xl flex flex-col justify-between group hover:border-[#D4AF37]/50 transition-all"
        >
          <div>
            <div className="w-14 h-14 rounded-[10px] bg-white/5 border border-white/10 text-white flex items-center justify-center mb-6">
              <Scale className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 font-sans">DLD Trustee & Revaluation</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium">
              Complete representation at the Dubai Land Department. We assist with official property revaluation for visa eligibility, title deed transfers, and POA management.
            </p>
            <ul className="space-y-4 text-sm font-semibold text-slate-300 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>Title Deed Updates & Amendments</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>Official Property Revaluation for Visa</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>Representation via Power of Attorney (POA)</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>Ejari Registration & Management</span>
              </li>
            </ul>
          </div>
          <button onClick={() => onNavigate('contact')} className="w-full py-4 rounded-[10px] font-bold bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer font-mono text-xs uppercase tracking-wider">
            Talk to an Expert <MessageSquare className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Render Process Timeline Section */}
      <ProcessTimeline
        title="The 4-Step Concierge Process"
        subtitle="From initial property title deed audit to physical 10-Year Emirates ID delivery — 100% managed for you."
      />

      {/* Render Markdown Content if available */}
      {cmsConfig?.pages?.property?.contentMarkdown && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 rounded-[10px] bg-[#0A0A0A] border border-white/10 shadow-xl prose prose-invert max-w-none font-sans"
          dangerouslySetInnerHTML={{ __html: marked.parse(cmsConfig.pages.property.contentMarkdown) }}
        />
      )}
      
    </div>
  );
}
