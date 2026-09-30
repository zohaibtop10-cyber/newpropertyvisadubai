'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { siteConfig } from '../../src/data/cmsData';

// ============================================================================
// 1. EDITORIAL CUSTOM COMPONENTS FOR RICH TEXT & MDX RENDERING
// ============================================================================

/**
 * Executive Summary Callout Box
 * High-impact glassmorphic TL;DR box placed at the top of the article.
 */
export function ExecutiveSummary({ title = "Executive Summary", points = [] }) {
  return (
    <div className="my-8 bg-[#12141c]/90 backdrop-blur-xl border-l-4 border-[#D4AF37] border-y border-r border-white/10 p-6 sm:p-8 rounded-r-2xl text-slate-200 shadow-[0_0_35px_rgba(212,175,55,0.12)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="flex items-center gap-3 mb-4">
        <span className="bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 text-[11px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full">
          ⚡ Quick Take / TL;DR
        </span>
        <h3 className="text-lg font-bold text-white font-display m-0">{title}</h3>
      </div>
      <ul className="space-y-3 m-0 p-0 list-none text-sm text-slate-300">
        {points.map((pt, idx) => (
          <li key={idx} className="flex items-start gap-3 m-0">
            <span className="w-5 h-5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              ✓
            </span>
            <span className="leading-relaxed">{pt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Gold Quote Blockquote Component
 * Highlights critical immigration rules and legal advisories with high editorial flair.
 */
export function GoldQuote({ quote, author, role }) {
  return (
    <div className="my-10 relative p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#14161f] via-[#0f1118] to-[#0a0c10] border border-white/10 shadow-2xl overflow-hidden">
      <div className="absolute -top-6 -left-2 text-[#D4AF37]/10 text-9xl font-serif select-none pointer-events-none leading-none">
        “
      </div>
      <div className="relative z-10 space-y-4">
        <p className="text-xl sm:text-2xl font-medium text-white italic leading-relaxed font-sans m-0">
          "{quote}"
        </p>
        {(author || role) && (
          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
            <div className="w-8 h-0.5 bg-[#D4AF37]" />
            <div>
              {author && <div className="text-sm font-bold text-white font-display">{author}</div>}
              {role && <div className="text-xs text-[#D4AF37] font-mono">{role}</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Process Timeline Component
 * Vertical step-by-step milestone visualization with glowing gold nodes.
 */
export function ProcessTimeline({ steps = [] }) {
  return (
    <div className="my-10 pl-6 sm:pl-8 border-l-2 border-[#D4AF37]/40 space-y-8 relative">
      {steps.map((step, idx) => (
        <div key={idx} className="relative group">
          {/* Glowing Gold Milestone Dot */}
          <div className="w-4 h-4 rounded-full bg-[#D4AF37] shadow-[0_0_12px_#D4AF37] border-2 border-[#050505] absolute -left-[31px] sm:-left-[39px] top-1.5 group-hover:scale-125 transition-transform" />
          
          <div className="bg-white/[0.02] border border-white/10 hover:border-[#D4AF37]/30 transition-all rounded-xl p-5 sm:p-6 backdrop-blur-md">
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">
                Step 0{idx + 1}
              </span>
              {step.duration && (
                <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2.5 py-0.5 rounded-md border border-white/10">
                  ⏱ {step.duration}
                </span>
              )}
            </div>
            <h4 className="text-lg font-bold text-white mb-2 font-display">{step.title}</h4>
            <p className="text-slate-300 text-sm leading-relaxed m-0">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Fee Table Component
 * Dark mode comparison & breakdown table with gold header and glowing total rows.
 */
export function FeeTable({ title, headers = [], rows = [], totalRow }) {
  return (
    <div className="my-10 rounded-2xl overflow-hidden border border-white/10 bg-[#0e1015]/80 backdrop-blur-md shadow-2xl">
      {title && (
        <div className="bg-white/5 px-6 py-4 border-b border-white/10 font-display font-bold text-white text-base">
          {title}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse m-0">
          <thead>
            <tr className="bg-[#D4AF37]/10 border-b border-[#D4AF37]/30">
              {headers.map((h, idx) => (
                <th key={idx} className="py-4 px-6 text-[#D4AF37] text-xs font-mono font-bold uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-white/[0.04] transition-colors text-sm">
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className={`py-4 px-6 ${cIdx === 0 ? 'font-medium text-white' : 'text-slate-300'}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
            {totalRow && (
              <tr className="bg-[#D4AF37]/10 font-bold text-white text-sm border-t border-[#D4AF37]/40">
                {totalRow.map((cell, cIdx) => (
                  <td key={cIdx} className={`py-4 px-6 ${cIdx === 0 ? 'text-[#D4AF37] font-mono uppercase' : 'text-white'}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================================
// 2. MOCK ARTICLE DATA WITH RICH EDITORIAL STRUCTURE
// ============================================================================

const ARTICLE_DATA = {
  'uae-family-visa-requirements-2026': {
    title: 'Complete 2026 Guide to Sponsoring Your Family in Dubai & UAE',
    category: 'Family Visa',
    date: 'September 28, 2026',
    author: 'EmiratesPrime Advisory',
    authorRole: 'Senior Residency Counsel',
    readTime: '7 min read',
    featuredImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
    tableOfContents: [
      { id: 'summary', title: 'Executive Overview' },
      { id: 'financial-rules', title: '1. Financial & Salary Criteria' },
      { id: 'process', title: '2. Application Workflow' },
      { id: 'fee-breakdown', title: '3. Government Fee Structure' },
      { id: 'legal-quote', title: '4. Critical Compliance Notice' }
    ],
    summaryPoints: [
      'Minimum monthly salary required to sponsor a family is AED 4,000 (or AED 3,000 + accommodation).',
      'Attested Marriage Certificate and Ejari Tenancy Contract are 100% mandatory before submission.',
      'VIP Medical Fitness and Emirates ID processing can be completed within 24 business hours.',
      'Sponsors have a 30-day grace period to issue visas after entry permit generation.'
    ],
    timelineSteps: [
      {
        title: 'Document Attestation & Ejari Validation',
        duration: '1 – 2 Days',
        description: 'Verify foreign marriage and birth certificates with MOFA UAE. Ensure Ejari registration matches the sponsor name.'
      },
      {
        title: 'Entry Permit Application Submission',
        duration: '24 Hours',
        description: 'Submit dependent entry visa application through GDRFA Dubai or ICP portal.'
      },
      {
        title: 'Medical Fitness Screening & Biometrics',
        duration: 'Same Day',
        description: 'Dependents attend VIP Medical Screening center for blood test, chest X-ray, and Emirates ID fingerprint capture.'
      },
      {
        title: 'Residence Visa Stamping & E-ID Issuance',
        duration: '24 – 48 Hours',
        description: 'Final approval and digital residency visa issued directly to your ICP/GDRFA wallet.'
      }
    ],
    feeHeaders: ['Service Component', 'GDRFA Statutory Fee', 'Typer / Legal Retainer', 'Total Estimate'],
    feeRows: [
      ['Family Entry Permit', 'AED 540', 'AED 250', 'AED 790'],
      ['Status Change (In-Country)', 'AED 675', 'AED 150', 'AED 825'],
      ['VIP Medical Screening', 'AED 750', 'AED 100', 'AED 850'],
      ['Emirates ID (2-Year)', 'AED 370', 'AED 80', 'AED 450']
    ],
    feeTotal: ['Total Package Fee', 'AED 2,335', 'AED 580', 'AED 2,915']
  }
};

// ============================================================================
// 3. MAIN PAGE COMPONENT WITH READING PROGRESS BAR & STICKY TOC
// ============================================================================

export default function SingleArticlePage({ params }) {
  const slug = params?.slug || 'uae-family-visa-requirements-2026';
  const article = ARTICLE_DATA[slug] || ARTICLE_DATA['uae-family-visa-requirements-2026'];

  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('summary');

  // Track Reading Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }

      // Check Active Table of Contents Section
      const sections = article.tableOfContents || [];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article]);

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hello EmiratesPrime! I am reading "${article.title}" and would like expert assistance.`);
    window.open(`https://wa.me/${siteConfig.whatsappRaw}?text=${text}`, '_blank');
  };

  return (
    <div className="w-full bg-[#050505] min-h-screen text-slate-300 pt-24 pb-24 selection:bg-[#D4AF37] selection:text-black">
      
      {/* 1. Thin Glowing Gold Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#050505] z-50">
        <div
          className="h-full bg-gradient-to-r from-[#D4AF37] via-[#FFF8DC] to-[#B8860B] shadow-[0_0_12px_#D4AF37] transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        
        {/* Back Link */}
        <div className="mb-8 max-w-3xl">
          <Link
            href="/articles"
            className="text-xs font-mono font-bold uppercase text-slate-400 hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1.5"
          >
            &larr; Back to Knowledge Base
          </Link>
        </div>

        {/* Article Header */}
        <header className="max-w-4xl space-y-4 mb-12">
          <div className="inline-block bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            {article.category}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight font-display tracking-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between border-y border-white/10 py-4 my-6 text-xs text-slate-400 font-mono gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] font-bold flex items-center justify-center">
                {article.author.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-white text-sm">{article.author}</div>
                <div className="text-[11px] text-slate-400">{article.authorRole}</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span>📅 {article.date}</span>
              <span>•</span>
              <span className="text-[#D4AF37]">⏱ {article.readTime}</span>
            </div>
          </div>

          {/* Breakout Hero Cover Image */}
          <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/70 via-transparent to-transparent pointer-events-none" />
          </div>
        </header>

        {/* 2. Grid Layout with Sticky Table of Contents Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Article Content Column (Span 8) */}
          <main className="lg:col-span-8 space-y-12">
            
            {/* Executive Summary Callout */}
            <div id="summary">
              <ExecutiveSummary points={article.summaryPoints} />
            </div>

            {/* Enhanced Typography Section Wrapper */}
            <div className="prose prose-lg prose-invert max-w-none space-y-8 leading-loose
              prose-headings:text-transparent prose-headings:bg-clip-text prose-headings:bg-gradient-to-r prose-headings:from-[#D4AF37] prose-headings:via-[#FFF8DC] prose-headings:to-[#B8860B]
              prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:font-extrabold prose-h2:pt-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-white/10
              prose-p:text-slate-300 prose-p:text-base sm:prose-p:text-lg prose-p:leading-loose
              prose-strong:text-white prose-strong:font-bold
              prose-a:text-[#D4AF37] hover:prose-a:underline font-semibold"
            >
              <div id="financial-rules">
                <h2>1. Financial & Salary Criteria</h2>
                <p>
                  Sponsoring family members in the UAE requires sponsors to maintain strict compliance with official Ministry of Human Resources & Emiratisation (MOHRE) and GDRFA income benchmarks.
                </p>
                <p>
                  Under current regulations, male or female sponsors must earn a minimum base salary of <strong>AED 4,000</strong> per month, or <strong>AED 3,000 plus company-provided accommodation</strong>. Valid WPS (Wage Protection System) pay slips and official stamped 3-month bank statements are mandatory verification proof.
                </p>
              </div>

              {/* Process Timeline Component */}
              <div id="process">
                <h2>2. Application Workflow</h2>
                <p>Follow our verified step-by-step roadmap to avoid delays or application rejections:</p>
                <ProcessTimeline steps={article.timelineSteps} />
              </div>

              {/* Fee Breakdown Table Component */}
              <div id="fee-breakdown">
                <h2>3. Government Fee Structure</h2>
                <p>Here is an itemized breakdown of mandatory GDRFA government statutory fees versus typing center retainers:</p>
                <FeeTable
                  title="Estimated Sponsoring Breakdown (Per Dependent)"
                  headers={article.feeHeaders}
                  rows={article.feeRows}
                  totalRow={article.feeTotal}
                />
              </div>

              {/* Gold Quote Component */}
              <div id="legal-quote">
                <GoldQuote
                  quote="Failure to initiate medical fitness testing within 30 days of Entry Permit status change triggers automated daily fines enforced by ICP systems."
                  author="GDRFA Compliance Advisory"
                  role="Official Immigration Note"
                />
              </div>
            </div>

            {/* Bottom Conversion CTA Glassmorphic Card */}
            <div className="mt-16 bg-gradient-to-br from-[#12141c] via-[#0e1015] to-[#0b0c10] backdrop-blur-xl border border-[#D4AF37]/40 rounded-2xl p-8 sm:p-10 text-center shadow-[0_0_40px_rgba(212,175,55,0.18)] relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#FFF8DC] to-[#B8860B]" />
              
              <h3 className="text-2xl font-extrabold text-white font-display">
                Need expert guidance on your UAE Visa?
              </h3>
              <p className="text-slate-400 text-sm mt-3 max-w-lg mx-auto leading-relaxed">
                Our senior advisors are ready to review your file and calculate exact government fees with zero obligation.
              </p>

              <button
                onClick={handleWhatsApp}
                className="mt-6 bg-gold-gradient text-black font-extrabold py-4 px-8 rounded-xl shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all cursor-pointer inline-flex items-center justify-center gap-2 text-sm uppercase font-mono tracking-wider"
              >
                💬 Chat with an Expert
              </button>
            </div>
          </main>

          {/* Sticky Table of Contents Sidebar (Span 4 - Desktop Only) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28 self-start space-y-6">
            <div className="bg-[#12141a]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#D4AF37] mb-4 pb-3 border-b border-white/10">
                <span>📑 Table of Contents</span>
              </div>

              <nav className="space-y-2">
                {article.tableOfContents.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-xs font-medium py-2 px-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-[#D4AF37]/15 text-[#D4AF37] border-l-2 border-[#D4AF37] font-bold'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.title}
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Quick Contact Box */}
            <div className="bg-gradient-to-br from-[#181a24] to-[#0f1117] border border-white/10 rounded-2xl p-6 text-center space-y-3">
              <div className="text-xs font-mono text-[#D4AF37] uppercase font-bold">Fast-Track Support</div>
              <div className="text-sm text-white font-bold">Have questions regarding your visa eligibility?</div>
              <button
                onClick={handleWhatsApp}
                className="w-full py-2.5 bg-white/5 border border-[#D4AF37]/40 hover:bg-[#D4AF37] hover:text-black transition-all rounded-xl text-xs font-bold uppercase text-[#D4AF37] cursor-pointer"
              >
                Ask an Advisor
              </button>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
