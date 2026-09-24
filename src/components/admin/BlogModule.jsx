import React, { useState } from 'react';
import { 
  Terminal, FileText, Sparkles, 
  Search, Share2, Save 
} from 'lucide-react';

export default function BlogModule() {
  const [title, setTitle] = useState('UAE Golden Visa Rules 2026: Complete Ministerial Guide');
  const [summary, setSummary] = useState('Comprehensive analysis of Cabinet Resolution No. 65 on 10-year investor and family residency requirements in Dubai.');
  const [contentMarkdown, setContentMarkdown] = useState('# UAE Golden Visa Framework 2026\n\nUnder recent Cabinet directives...');
  const [metaTitle, setMetaTitle] = useState('UAE Golden Visa Requirements 2026 | Official Advisory Guide');
  const [metaDesc, setMetaDesc] = useState('Learn how to secure a 10-Year UAE Golden Visa through real estate investment (AED 2M+) or commercial licensing. Step-by-step government procedure.');
  const [category, setCategory] = useState('Golden Visa');
  const [status, setStatus] = useState('PUBLISHED');

  // Real-Time SEO Calculators
  const metaTitlePixelWidth = metaTitle.length * 9.2; // approx Google desktop px width (max 600px)
  const isTitleWidthOptimal = metaTitlePixelWidth >= 300 && metaTitlePixelWidth <= 580;
  const isDescLengthOptimal = metaDesc.length >= 120 && metaDesc.length <= 160;

  // Real-Time JSON-LD Schema Generator
  const generatedJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": summary,
    "author": {
      "@type": "Organization",
      "name": "EmiratesPrime Sovereign Advisory"
    },
    "publisher": {
      "@type": "Organization",
      "name": "800 DOCS LLC SOC"
    }
  }, null, 2);

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-bold uppercase mb-1">
            <Terminal className="w-3.5 h-3.5" /> Regulatory Publishing & SEO Hub
          </div>
          <h1 className="text-xl font-black text-white">Editorial & Enterprise SEO Suite</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Publish ministerial briefings with real-time Google pixel width inspection, JSON-LD Schema generation, and OpenGraph social card previews.
          </p>
        </div>

        <button
          onClick={() => alert('Article and SEO metadata saved successfully!')}
          className="px-5 py-2.5 bg-[#E01E37] hover:bg-rose-700 text-white rounded-xl font-bold text-xs shadow-lg shadow-[#E01E37]/30 flex items-center gap-2 transition-all"
        >
          <Save className="w-4 h-4" /> Publish Briefing & Deploy Schema
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ------------------------------------------------------------------ */}
        {/* EDITORIAL MARKDOWN EDITOR (2 COLS)                                 */}
        {/* ------------------------------------------------------------------ */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#E01E37]" /> Article Content & Taxonomy
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-mono mb-1">Article Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 font-bold text-sm focus:outline-none focus:border-[#E01E37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Taxonomy Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 font-semibold focus:outline-none"
                  >
                    <option value="Golden Visa">Golden Visa</option>
                    <option value="Mainland LLC">Mainland LLC</option>
                    <option value="Corporate Tax">Corporate Tax</option>
                    <option value="Family Residency">Family Residency</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-mono mb-1">Publication Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 font-semibold focus:outline-none"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="SCHEDULED">Scheduled</option>
                    <option value="PUBLISHED">Published (Live)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-mono mb-1">Executive Summary / Excerpt</label>
                <textarea
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-300 focus:outline-none focus:border-[#E01E37]"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-mono mb-1">Markdown Body Content</label>
                <textarea
                  rows={10}
                  value={contentMarkdown}
                  onChange={(e) => setContentMarkdown(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-slate-200 focus:outline-none focus:border-[#E01E37]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* ENTERPRISE SEO INSPECTOR & OPENGRAPH PREVIEW (1 COL)               */}
        {/* ------------------------------------------------------------------ */}
        <div className="space-y-6">
          
          {/* Real-Time SEO Inspector */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Search className="w-4 h-4 text-emerald-400" /> Enterprise SEO Inspector
            </h3>

            {/* Meta Title Pixel Width Bar */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-slate-400">Meta Title Google Px Width:</span>
                <span className={`font-bold ${isTitleWidthOptimal ? 'text-emerald-400' : 'text-amber-400'}`}>
                  ~{Math.round(metaTitlePixelWidth)}px / 600px
                </span>
              </div>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-200 text-xs font-medium focus:outline-none focus:border-[#E01E37]"
              />
              <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden">
                <div 
                  style={{ width: `${Math.min(100, (metaTitlePixelWidth / 600) * 100)}%` }}
                  className={`h-full ${isTitleWidthOptimal ? 'bg-emerald-500' : 'bg-amber-500'}`}
                />
              </div>
            </div>

            {/* Meta Description Inspector */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-slate-400">Meta Description Length:</span>
                <span className={`font-bold ${isDescLengthOptimal ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {metaDesc.length} / 160 chars
                </span>
              </div>
              <textarea
                rows={3}
                value={metaDesc}
                onChange={(e) => setMetaDesc(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-300 text-xs focus:outline-none focus:border-[#E01E37]"
              />
            </div>
          </div>

          {/* OpenGraph Social Card Preview */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase text-slate-400 flex items-center gap-2">
              <Share2 className="w-4 h-4 text-blue-400" /> OpenGraph Social Preview
            </h3>

            <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-md">
              <div className="h-28 bg-gradient-to-tr from-[#E01E37] to-slate-900 flex items-center justify-center font-bold text-white text-sm p-4 text-center">
                {title}
              </div>
              <div className="p-3 space-y-1">
                <div className="text-[10px] font-mono text-slate-500 uppercase">familyvisa.ae • 2 min read</div>
                <div className="font-bold text-white text-xs line-clamp-1">{metaTitle}</div>
                <div className="text-[11px] text-slate-400 line-clamp-2">{metaDesc}</div>
              </div>
            </div>
          </div>

          {/* Generated JSON-LD Schema Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase text-slate-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" /> JSON-LD Schema Markup (Auto-Generated)
            </h3>
            <pre className="bg-slate-950 p-3 rounded-xl text-[10px] font-mono text-slate-300 overflow-x-auto max-h-40 border border-slate-800">
              {generatedJsonLd}
            </pre>
          </div>

        </div>

      </div>

    </div>
  );
}
