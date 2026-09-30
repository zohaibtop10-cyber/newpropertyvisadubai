import React, { useState } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { motion } from 'framer-motion';
import { FileCheck, CheckCircle2 } from 'lucide-react';
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-24 space-y-16 relative z-10">
      
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 15 }}
        className="text-center max-w-3xl mx-auto space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
          <FileCheck className="w-4 h-4" />
          <span>DOCUMENT PREPARATION GUIDE</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-content-primary dark:text-white tracking-tight">
          {headline}
        </h1>

        <p className="text-content-muted dark:text-slate-400 text-base sm:text-lg leading-relaxed">
          {subtext}
        </p>
      </motion.section>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory('spouse')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            selectedCategory === 'spouse' ? 'bg-brand-primary text-white shadow-md' : 'bg-surface dark:bg-brand-surface border border-border-subtle dark:border-white/10 text-content-secondary dark:text-slate-300'
          }`}
        >
          Spouse Visa
        </button>
        <button
          onClick={() => setSelectedCategory('children')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            selectedCategory === 'children' ? 'bg-brand-primary text-white shadow-md' : 'bg-surface dark:bg-brand-surface border border-border-subtle dark:border-white/10 text-content-secondary dark:text-slate-300'
          }`}
        >
          Children Visa
        </button>
        <button
          onClick={() => setSelectedCategory('golden')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            selectedCategory === 'golden' ? 'bg-brand-primary text-white shadow-md' : 'bg-surface dark:bg-brand-surface border border-border-subtle dark:border-white/10 text-content-secondary dark:text-slate-300'
          }`}
        >
          Golden Visa
        </button>
        <button
          onClick={() => setSelectedCategory('property')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            selectedCategory === 'property' ? 'bg-brand-primary text-white shadow-md' : 'bg-surface dark:bg-brand-surface border border-border-subtle dark:border-white/10 text-content-secondary dark:text-slate-300'
          }`}
        >
          Property Visa
        </button>
        <button
          onClick={() => setSelectedCategory('maid')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            selectedCategory === 'maid' ? 'bg-brand-primary text-white shadow-md' : 'bg-surface dark:bg-brand-surface border border-border-subtle dark:border-white/10 text-content-secondary dark:text-slate-300'
          }`}
        >
          Maid Visa
        </button>
      </div>

      {/* Checklist Card */}
      <motion.div
        key={selectedCategory}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-3xl mx-auto p-8 rounded-xl bg-surface dark:bg-brand-surface border border-border-subtle dark:border-white/10 shadow-xl space-y-6"
      >
        <div className="flex items-center justify-between border-b border-border-subtle dark:border-white/10 pb-4">
          <h2 className="font-display font-bold text-xl text-content-primary dark:text-white">
            {currentChecklist.title}
          </h2>
          <span className="text-xs font-mono text-brand-gold font-semibold bg-emerald-500/10 px-3 py-1 rounded-full">
            READY FOR WHATSAPP UPLOAD
          </span>
        </div>

        <div className="space-y-3">
          {currentChecklist.items.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-canvas dark:bg-black/30 border border-border-subtle dark:border-white/5 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-sm text-content-primary dark:text-white">{item.title}</div>
                <div className="text-xs text-content-muted dark:text-slate-400 mt-0.5">{item.note}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={`https://wa.me/${cmsConfig?.global?.whatsappRaw || siteConfig.whatsappRaw}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-2"
          >
            <WhatsAppIcon className="w-4 h-4" /> Send Scans via WhatsApp
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onOpenCalculator('spouse')}
            className="py-3.5 px-6 bg-brand-primary text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
          >
            Calculate Fees →
          </motion.button>
        </div>
      </motion.div>

      {/* Render Markdown Content if available */}
      {cmsConfig?.pages?.checklist?.contentMarkdown && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mt-12 p-8 rounded-xl bg-surface dark:bg-brand-surface border border-border-subtle dark:border-white/10 shadow-xl prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: marked.parse(cmsConfig.pages.checklist.contentMarkdown) }}
        />
      )}

    </div>
  );
}
