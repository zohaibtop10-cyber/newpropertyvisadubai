import React, { useState } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { motion } from 'framer-motion';
import { FileCheck, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { siteConfig } from '../data/cmsData';
import { marked } from 'marked';

export default function DocumentChecklistPage({ onOpenCalculator, cmsConfig }) {
  const [selectedCategory, setSelectedCategory] = useState('spouse'); // 'spouse' | 'children' | 'golden' | 'property' | 'maid'

  const headline = cmsConfig?.pages?.checklist?.headline || "Interactive Document Checklist";
  const subtext = cmsConfig?.pages?.checklist?.subtext || "Select your visa category below to view exact required documents before submitting on WhatsApp.";

  const checklists = {
    spouse: {
      title: "Family Residence Visa Checklist",
      items: [
        { title: "Passport Copy of Sponsor & Spouse", note: "Minimum 6 months validity remaining" },
        { title: "Attested Marriage Certificate", note: "MOFA stamped in home country and UAE + Arabic translation" },
        { title: "Registered EJARI / Tawtheeq Lease", note: "Active home rental agreement in sponsor's name" },
        { title: "Sponsor Salary Certificate & Labor Contract", note: "Minimum salary AED 4,000 (or AED 3,000 + housing)" },
        { title: "Sponsor 3-Month Bank Statement", note: "Stamped by UAE bank" },
        { title: "Passport Photo", note: "White background, digital copy" }
      ]
    },
    children: {
      title: "Children Dependant Visa Checklist",
      items: [
        { title: "Passports of Children & Parents", note: "Minimum 6 months validity" },
        { title: "Attested Birth Certificate", note: "Showing father & mother names with MOFA stamps" },
        { title: "Registered EJARI Rental Contract", note: "Sponsor's active lease" },
        { title: "Parents' UAE Residence Visas & Emirates IDs", note: "Active legal status" }
      ]
    },
    golden: {
      title: "10-Year Golden Visa Family Checklist",
      items: [
        { title: "Sponsor Golden Visa & Emirates ID", note: "Active 10-year residency" },
        { title: "Family Member Passport Copies", note: "Valid for min 6 months" },
        { title: "Attested Marriage & Birth Certificates", note: "MOFA UAE stamped" }
      ]
    },
    property: {
      title: "Property Investor Visa Checklist",
      items: [
        { title: "Original Title Deed / Oqood Copy", note: "Proving AED 750k+ or AED 2M+ value" },
        { title: "Applicant Passport & Visit/Residence Visa", note: "Current status copy" },
        { title: "Bank NOC Letter", note: "If property is mortgaged" }
      ]
    },
    maid: {
      title: "Maid & Domestic Worker Checklist",
      items: [
        { title: "Maid Passport Copy", note: "Valid for min 6 months" },
        { title: "Sponsor Passport, Visa & Emirates ID", note: "Active legal status" },
        { title: "Sponsor Salary Certificate & Bank Statement", note: "Min household salary AED 25,000" }
      ]
    }
  };

  const currentChecklist = checklists[selectedCategory];

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-12 relative z-10 font-sans transition-colors duration-200">
      
      {/* Ambient Radial Glow Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.12)_0%,transparent_70%)] opacity-70 pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none -z-10" />

      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 15 }}
        className="text-center max-w-3xl mx-auto space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[10px] bg-[#8C5E00]/10 dark:bg-[#8C5E00]/20 border border-[#8C5E00]/30 dark:border-[#D4AF37]/30 text-[#8C5E00] dark:text-[#FFE58F] text-xs font-mono font-bold uppercase tracking-widest shadow-md">
          <FileCheck className="w-4 h-4 text-[#8C5E00] dark:text-[#D4AF37]" />
          <span>DOCUMENT PREPARATION GUIDE</span>
        </div>

        <h1 className="font-display font-black text-4xl sm:text-6xl text-text  tracking-tight leading-tight">
          {headline.includes("Checklist") ? (
            <>
              {headline.replace("Checklist", "")}
              <span className="text-dark-gold-shine">Checklist</span>
            </>
          ) : headline}
        </h1>

        <p className="text-text-muted dark:text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
          {subtext}
        </p>
      </motion.section>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
        {[
          { id: 'spouse', label: 'Spouse Visa' },
          { id: 'children', label: 'Children Visa' },
          { id: 'golden', label: 'Golden Visa' },
          { id: 'property', label: 'Property Visa' },
          { id: 'maid', label: 'Maid Visa' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id)}
            className={`px-5 py-2.5 rounded-[10px] text-xs font-bold uppercase tracking-wider font-mono transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === tab.id
                ? 'bg-dark-gold-gloss text-slate-950 font-black shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                : 'bg-surface /5 border border-border-hairline dark:border-white/10 text-text dark:text-slate-300 hover:border-[#D4AF37]/40 hover:text-text dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Checklist Card */}
      <motion.div
        key={selectedCategory}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-3xl mx-auto p-8 sm:p-10 rounded-[12px] bg-surface/80 dark:bg-[#111111]/80 backdrop-blur-2xl border border-border-hairline dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-2xl space-y-6 relative overflow-hidden"
      >
        <div className="flex items-center justify-between border-b border-border-hairline dark:border-white/10 pb-5">
          <h2 className="font-display font-black text-2xl text-text  tracking-tight">
            {currentChecklist.title}
          </h2>
          <span className="text-[10px] font-mono text-[#D4AF37] dark:text-[#D4AF37] font-bold bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-3 py-1.5 rounded-[10px] uppercase tracking-wider">
            READY FOR AUDIT
          </span>
        </div>

        <div className="space-y-3">
          {currentChecklist.items.map((item, idx) => (
            <div key={idx} className="p-4 rounded-[12px] bg-surface dark:bg-[#1a1a1a] border border-border-hairline/60 dark:border-white/5 flex items-start gap-3.5 hover:border-[#D4AF37]/30 transition-all">
              <div className="p-1 rounded-[8px] bg-[#D4AF37]/10 border border-[#D4AF37]/20 shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] dark:text-[#D4AF37]" />
              </div>
              <div>
                <div className="font-bold text-sm text-text  font-sans">{item.title}</div>
                <div className="text-xs text-text-muted dark:text-text-muted mt-0.5 font-sans">{item.note}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-3.5">
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={`https://wa.me/${cmsConfig?.global?.whatsappRaw || siteConfig.whatsappRaw}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[10px] text-xs font-black uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <WhatsAppIcon className="w-4 h-4" /> Send Scans via WhatsApp
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onOpenCalculator('spouse')}
            className="py-4 px-8 bg-dark-gold-gloss text-slate-950 font-black rounded-[10px] text-xs uppercase tracking-wider shadow-[0_8px_16px_rgba(212,175,55,0.25)] hover:shadow-[0_12px_24px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Calculate Fees</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>

      {/* Render Markdown Content if available */}
      {cmsConfig?.pages?.checklist?.contentMarkdown && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mt-12 p-8 sm:p-10 rounded-[12px] bg-surface dark:bg-[#111111] border border-border-hairline dark:border-white/10 shadow-xl prose dark:prose-invert max-w-none text-text dark:text-slate-300"
          dangerouslySetInnerHTML={{ __html: marked.parse(cmsConfig.pages.checklist.contentMarkdown) }}
        />
      )}

    </div>
  );
}
