import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MessageCircle,
  Share2,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
  Check,
  BookOpen,
  ArrowUpRight,
  User,
  PhoneCall,
  ExternalLink,
  Award,
  Zap,
  Copy,
  Sparkles
} from 'lucide-react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { siteConfig } from '../data/cmsData';
import FAQAccordion from './FAQAccordion';
import ProcessTimeline from './ProcessTimeline';

// ============================================================================
// 1. <CalloutBox> COMPONENT
// ============================================================================
export function CalloutBox({
  type = 'highlight',
  title = "Official Compliance Notice",
  children,
  content
}) {
  return (
    <div className="bg-[#8C5E00]/10 border-l-4 border-[#D4AF37] p-6 rounded-r-[10px] text-slate-300 my-8 shadow-md font-sans">
      <div className="flex items-start gap-4">
        <Sparkles className="w-5 h-5 text-[#FFE58F] shrink-0 mt-0.5" />
        <div className="space-y-1.5 flex-1">
          {title && (
            <h4 className="text-xs font-black uppercase tracking-wider font-mono text-[#FFE58F] m-0">
              {title}
            </h4>
          )}
          <div className="text-sm leading-relaxed font-medium m-0 text-slate-300">
            {children || content}
          </div>
        </div>
      </div>
    </div>
  );
}

// Legacy alias for backwards compatibility
export const NoticeBox = CalloutBox;

// ============================================================================
// 2. <PricingCards> COMPONENT (2-Column Bento Grid)
// ============================================================================
export function PricingCards({
  cards = [
    {
      title: 'Inside Country Status',
      subtitle: 'For dependents currently inside the UAE',
      price: '3,850',
      currency: 'AED',
      features: [
        'No exit trip required',
        'Includes GDRFA status change fee',
        'VIP Smart Salem Medical screening',
        '2-Year physical Emirates ID delivery'
      ],
      tag: 'Most Popular',
      primary: true
    },
    {
      title: 'Outside Country Entry',
      subtitle: 'For dependents currently abroad',
      price: '2,950',
      currency: 'AED',
      features: [
        'Electronic Entry Permit',
        '60-day entry window authorization',
        'In-country status activation upon entry',
        '2-Year physical Emirates ID delivery'
      ],
      tag: 'Standard Route',
      primary: false
    }
  ],
  onSelect
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10 font-sans">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-[#0A0A0A] border border-white/10 rounded-[10px] p-6 shadow-xl flex flex-col justify-between hover:border-[#D4AF37]/50 transition-all group"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-bold text-lg m-0 font-sans group-hover:text-[#FFE58F] transition-colors">
                {card.title}
              </h4>
              {card.tag && (
                <span className="px-2.5 py-1 rounded-[10px] bg-[#8C5E00]/20 border border-[#D4AF37]/40 text-[#FFE58F] text-[10px] font-mono font-bold uppercase tracking-wider">
                  {card.tag}
                </span>
              )}
            </div>

            {card.subtitle && (
              <p className="text-xs text-slate-400 font-medium m-0 mb-4 font-sans leading-relaxed">
                {card.subtitle}
              </p>
            )}

            <div className="text-3xl text-[#FFE58F] font-black my-4 font-sans tracking-tight">
              <span className="text-sm font-bold text-[#D4AF37] align-super mr-1 font-mono">{card.currency || 'AED'}</span>
              {card.price}
            </div>

            <ul className="space-y-2.5 pt-4 border-t border-white/10 list-none p-0 m-0">
              {card.features && card.features.map((feat, fIdx) => (
                <li key={fIdx} className="flex items-center gap-2.5 text-xs text-slate-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-6">
            <button
              onClick={() => onSelect && onSelect(card)}
              className={`w-full py-3 rounded-[10px] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer font-mono ${
                card.primary
                  ? 'bg-gradient-to-r from-[#C9981E] to-[#FCE181] text-black shadow-md hover:brightness-110'
                  : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
              }`}
            >
              Select Route →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export const ComparisonCards = PricingCards;

// ============================================================================
// 3. <LuxuryTable> COMPONENT
// ============================================================================
export function LuxuryTable({ headers = [], rows = [], caption }) {
  if (!rows || rows.length === 0) return null;
  return (
    <div className="rounded-[10px] overflow-hidden border border-white/10 shadow-md my-10 font-sans bg-[#050505]">
      {caption && (
        <div className="bg-[#111111] px-6 py-3 border-b border-white/10 text-xs font-mono font-bold uppercase tracking-wider text-[#FFE58F]">
          {caption}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse m-0">
          {headers && headers.length > 0 && (
            <thead>
              <tr className="bg-[#111111] text-[#FFE58F] border-b border-white/10">
                {headers.map((head, idx) => (
                  <th
                    key={idx}
                    className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-[#FFE58F] font-mono border-r border-white/10 last:border-r-0"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody className="divide-y divide-white/5">
            {rows.map((row, rIdx) => (
              <tr
                key={rIdx}
                className={`transition-colors hover:bg-white/5 ${
                  rIdx % 2 === 1 ? 'bg-[#0A0A0A]' : 'bg-[#050505]'
                }`}
              >
                {Array.isArray(row)
                  ? row.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className="py-4 px-6 text-sm text-slate-300 font-medium border-r border-white/5 last:border-r-0 font-sans"
                      >
                        {cell}
                      </td>
                    ))
                  : Object.values(row).map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className="py-4 px-6 text-sm text-slate-300 font-medium border-r border-white/5 last:border-r-0 font-sans"
                      >
                        {cell}
                      </td>
                    ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================================
// 4. <InlineCTA> COMPONENT
// ============================================================================
export function InlineCTA({
  title = "Calculate Your Exact Government Visa Fees",
  btnText = "CALCULATE MY FEES →",
  subtitle = "Zero obligation. Instant GDRFA & ICP fee breakdown in under 30 seconds.",
  onAction
}) {
  return (
    <div className="bg-gradient-to-r from-[#111111] to-[#0A0A0A] border border-[#8C5E00]/30 p-8 sm:p-10 rounded-[10px] text-center my-12 text-white shadow-xl space-y-4 font-sans relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />
      
      <span className="bg-white/10 border border-white/20 text-[#FFE58F] text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full inline-block font-mono">
        FAST-TRACK PRO PROCESSING
      </span>

      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-sans m-0">
        {title}
      </h3>

      {subtitle && (
        <p className="text-slate-300 text-sm max-w-xl mx-auto m-0 font-sans font-medium">
          {subtitle}
        </p>
      )}

      <div className="pt-4">
        <button
          onClick={onAction}
          className="bg-gradient-to-r from-[#C9981E] to-[#FCE181] text-black font-extrabold rounded-[10px] px-8 py-3.5 text-xs uppercase tracking-wider font-mono shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:brightness-110 transition-all cursor-pointer inline-flex items-center gap-2"
        >
          <Zap className="w-4 h-4 fill-black text-black" />
          <span>{btnText}</span>
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// 5. <ArticleFAQ> COMPONENT
// ============================================================================
export function ArticleFAQ({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="my-12 font-sans">
      <FAQAccordion
        title="Frequently Asked Questions"
        subtitle="Key insights & answers regarding this article topic."
        badge="ARTICLE FAQS"
        items={items}
      />
    </div>
  );
}

// MDX Components Object
export const mdxComponents = {
  CalloutBox,
  NoticeBox: CalloutBox,
  PricingCards,
  ComparisonCards: PricingCards,
  LuxuryTable,
  InlineCTA,
  ArticleFAQ
};

// ============================================================================
// MAIN ARTICLE LAYOUT COMPONENT
// ============================================================================
export default function ArticleLayout({
  article,
  relatedArticles = [],
  onBack,
  onNavigateArticle,
  onOpenCalculator
}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHeadingId, setActiveHeadingId] = useState('');
  const [tocHeadings, setTocHeadings] = useState([]);
  const [copiedLink, setCopiedLink] = useState(false);
  const contentRef = useRef(null);

  let resolvedMarkdown = article?.contentMarkdown || article?.content || article?.body;
  if (!resolvedMarkdown && Array.isArray(article?.sections) && article.sections.length > 0) {
    resolvedMarkdown = article.sections
      .map(sec => `## ${sec.heading || sec.title || ''}\n\n${sec.body || sec.content || ''}`)
      .join('\n\n');
  }

  const post = {
    title: article?.title || "UAE Residency & Family Visa Complete Guide (2026)",
    category: article?.category || "Golden Visa",
    date: article?.date || article?.publishedDate || "October 2026",
    readTime: article?.readTime || "6 min read",
    author: article?.author || "Bilal Saleem",
    authorRole: article?.authorRole || "Senior Immigration Advisor & Founder",
    authorAvatar: article?.authorAvatar || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
    authorBio: article?.authorBio || "Specializing in GDRFA and ICP residency compliance, Golden Visa nominations, and VIP corporate family relocation across all 7 UAE Emirates.",
    featuredImage: article?.featuredImage || article?.imageUrl || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
    excerpt: article?.excerpt || article?.summary || "Comprehensive breakdown of government rules, medical fitness requirements, salary thresholds, and step-by-step submission timelines.",
    calloutTitle: article?.calloutTitle || article?.noticeBoxTitle || "Official GDRFA & ICP Compliance (2026)",
    calloutContent: article?.calloutContent || article?.noticeBoxContent || "All family residency permits require an attested Ejari tenancy contract registered under the primary sponsor's name, certified by Dubai Land Department or equivalent municipality.",
    pricingCards: article?.pricingCards || article?.comparisonCards || [
      {
        title: 'Inside Country Status',
        subtitle: 'For dependents already inside the UAE',
        price: '3,850',
        currency: 'AED',
        features: [
          'No exit trip required',
          'Includes GDRFA status change fee',
          'VIP Smart Salem Medical screening',
          '2-Year physical Emirates ID delivery'
        ],
        tag: 'Most Popular',
        primary: true
      },
      {
        title: 'Outside Country Entry',
        subtitle: 'For dependents currently abroad',
        price: '2,950',
        currency: 'AED',
        features: [
          'Electronic Entry Permit',
          '60-day entry window authorization',
          'In-country status activation upon entry',
          '2-Year physical Emirates ID delivery'
        ],
        tag: 'Standard Route',
        primary: false
      }
    ],
    tableCaption: article?.tableCaption || "Government Filing Tariffs & Concierge Breakdown (2026)",
    tableHeaders: article?.tableHeaders || ['Residency Category', 'Government Fee', 'VIP Medical & EID', 'Total Estimate'],
    tableRows: article?.tableRows || [
      ['Spouse Residence (2-Year)', 'AED 3,040', 'AED 850', 'AED 3,890'],
      ['Child Residence (Per Child)', 'AED 2,860', 'AED 680', 'AED 3,540'],
      ['Parent Residence (1-Year)', 'AED 3,040', 'AED 950', 'AED 3,990']
    ],
    ctaTitle: article?.ctaTitle || "Calculate Your Exact Visa Cost",
    ctaSubtitle: article?.ctaSubtitle || "Zero obligation. Instant GDRFA fee breakdown in under 30 seconds.",
    ctaBtnText: article?.ctaBtnText || "CALCULATE MY FEES →",
    faqs: article?.faqs || [
      {
        q: "What is the minimum salary required to sponsor a spouse in Dubai?",
        a: "The minimum monthly salary is AED 4,000, or AED 3,000 if your employer provides free company accommodation. Verified by salary certificate or 3-month bank statement."
      },
      {
        q: "Can I sponsor both parents on a single application?",
        a: "Both parents must be sponsored together unless one is deceased or divorced. Minimum sponsor salary threshold is AED 20,000 per month."
      },
      {
        q: "How long does standard visa processing take?",
        a: "Our VIP concierge processes entry permits in 24–48 hours, medical screening same-day, and physical Emirates ID delivery within 5–7 working days."
      }
    ],
    showCallout: article?.showCallout !== false,
    showPricingCards: article?.showPricingCards !== false,
    showLuxuryTable: article?.showLuxuryTable !== false,
    showInlineCTA: article?.showInlineCTA !== false,
    showFaqs: article?.showFaqs !== false,
    contentMarkdown: resolvedMarkdown || `
The Federal Authority for Identity, Citizenship, Customs and Port Security (ICP) and the General Directorate of Residency and Foreigners Affairs (GDRFA) have updated and streamlined the UAE residency application workflow for 2026.

Whether you are securing a 10-Year Golden Visa, sponsoring immediate family members, or establishing a corporate free zone entity, strict adherence to official attestation and medical protocols is mandatory.

## Key Residency Pillars for 2026

To successfully sponsor dependents in Dubai or Abu Dhabi, primary sponsors must meet exact financial and housing prerequisites:

* **Minimum Salary Threshold:** AED 4,000 per month (or AED 3,000 + company accommodation) for spouse and children.
* **Registered Ejari (Tenancy Contract):** A valid residential tenancy contract under the sponsor's name, certified by Dubai Land Department (DLD) or equivalent municipality.
* **Attested Marriage & Birth Certificates:** Fully legalized through the Ministry of Foreign Affairs (MOFA) in the country of origin and MOFAIC UAE.
* **Comprehensive Health Insurance:** Mandatory DHA/DOH compliant medical coverage for all dependents prior to visa stamping.

> "The UAE residency framework guarantees long-term stability for global business leaders and families. However, incomplete documentation remains the primary cause of rejection or delayed SLA approvals."

## Critical Considerations & Pitfalls

Failing to update family status within 60 days of entry can incur daily administrative fines. Additionally, dependents over 18 years of age must undergo individual medical screening without exception.
    `
  };

  // Scroll Progress Indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // TOC Tracking
  useEffect(() => {
    if (!contentRef.current) return;
    const headings = contentRef.current.querySelectorAll('h2, h3');
    const extracted = Array.from(headings).map((h, index) => {
      let id = h.id;
      if (!id) {
        id = `section-${index}-${h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
        h.id = id;
      }
      return { id, text: h.textContent, level: h.tagName.toLowerCase(), element: h };
    });

    setTocHeadings(extracted);

    if (extracted.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeadingId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: 0.1 }
    );

    extracted.forEach(({ element }) => {
      if (element) observer.observe(element);
    });

    return () => {
      extracted.forEach(({ element }) => {
        if (element) observer.unobserve(element);
      });
    };
  }, [post.contentMarkdown]);

  const handleWhatsApp = () => {
    const message = `Hello Brightlink! I am reading "${post.title}" and would like to speak with a senior advisor.`;
    window.open(`https://wa.me/${siteConfig.whatsappRaw || '971501234567'}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const renderedContent = DOMPurify.sanitize(marked.parse(post.contentMarkdown), {
    ADD_TAGS: ['iframe', 'svg', 'path', 'circle', 'rect'],
    ADD_ATTR: ['target', 'rel', 'src', 'width', 'height', 'frameborder', 'allow', 'allowfullscreen', 'viewBox', 'fill', 'stroke', 'stroke-width']
  });

  return (
    <div className="w-full bg-[#050505] min-h-screen text-slate-300 selection:bg-[#D4AF37] selection:text-[#050505] font-sans">
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-50">
        <div 
          className="h-full bg-gradient-to-r from-[#8C5E00] via-[#D4AF37] to-[#FFF5C0] transition-all duration-150 ease-out" 
          style={{ width: `${scrollProgress}%` }} 
        />
      </div>

      {/* ── MAIN ARTICLE CANVAS (PURE BLACK bg-[#050505]) ──────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* ── LEFT COLUMN: PROSE & CONTENT (lg:col-span-8) ──────────────────── */}
        <main className="lg:col-span-8 space-y-8">
          
          {/* Category Badge */}
          <div>
            <span className="bg-white/10 border border-white/20 text-[#FFE58F] text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full inline-block mb-6 font-mono">
              {post.category}
            </span>
          </div>

          {/* H1 Title */}
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6 font-sans">
            {post.title}
          </h1>

          {/* Author Row */}
          <div className="flex items-center gap-4 border-y border-white/10 py-4 mb-8">
            <img
              src={post.authorAvatar}
              alt={post.author}
              className="w-12 h-12 rounded-full object-cover border border-[#D4AF37]/40 shadow-sm shrink-0"
            />
            <div>
              <div className="text-white font-bold text-base font-sans">{post.author}</div>
              <div className="text-slate-400 text-xs font-sans">{post.date} • {post.readTime}</div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="w-full aspect-video object-cover rounded-[10px] overflow-hidden border border-white/10 shadow-2xl mb-12 bg-slate-950">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Callout Box Component */}
          {post.showCallout && (
            <CalloutBox title={post.calloutTitle}>
              {post.calloutContent}
            </CalloutBox>
          )}

          {/* Rich Text Overrides (prose-invert) */}
          <article 
            ref={contentRef}
            className="prose prose-invert prose-lg max-w-none font-sans
              prose-p:text-slate-300 prose-p:leading-relaxed prose-p:text-lg prose-p:mb-6
              prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-3
              prose-h3:text-xl prose-h3:text-[#FFE58F] prose-h3:mt-6 prose-h3:mb-3
              prose-a:text-[#FFE58F] prose-a:no-underline prose-a:border-b prose-a:border-[#8C5E00]/50 hover:prose-a:border-[#D4AF37] transition-colors
              prose-blockquote:border-l-4 prose-blockquote:border-[#D4AF37] prose-blockquote:bg-[#0A0A0A] prose-blockquote:p-6 prose-blockquote:rounded-r-[10px] prose-blockquote:text-slate-300 prose-blockquote:not-italic prose-blockquote:my-8
              prose-img:rounded-[10px] prose-img:border prose-img:border-white/10 prose-img:my-8
              prose-ul:list-disc prose-ul:pl-6 prose-ul:my-6 prose-ul:marker:text-[#D4AF37] prose-li:text-slate-300 prose-li:mb-2
              prose-strong:text-white prose-strong:font-bold"
            dangerouslySetInnerHTML={{ __html: renderedContent }}
          />

          {/* Injected Pricing Cards Component */}
          {post.showPricingCards && post.pricingCards && (
            <PricingCards cards={post.pricingCards} onSelect={onOpenCalculator} />
          )}

          {/* Injected Luxury Table Component */}
          {post.showLuxuryTable && post.tableRows && (
            <LuxuryTable
              caption={post.tableCaption}
              headers={post.tableHeaders}
              rows={post.tableRows}
            />
          )}

          {/* Injected Inline CTA Component */}
          {post.showInlineCTA && (
            <InlineCTA
              title={post.ctaTitle}
              subtitle={post.ctaSubtitle}
              btnText={post.ctaBtnText}
              onAction={onOpenCalculator}
            />
          )}

          {/* Injected Article FAQ Component */}
          {post.showFaqs && post.faqs && (
            <ArticleFAQ items={post.faqs} />
          )}

        </main>

        {/* ── RIGHT COLUMN: STICKY SIDEBAR (lg:col-span-4) ──────────────────── */}
        <aside className="lg:col-span-4 space-y-8 sticky top-24">
          
          {/* Table of Contents */}
          {tocHeadings.length > 0 && (
            <div className="bg-[#0A0A0A] border border-white/10 rounded-[10px] p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                <h3 className="text-xs font-black uppercase tracking-widest text-white font-mono m-0">
                  TABLE OF CONTENTS
                </h3>
              </div>

              <nav className="space-y-1.5 max-h-[350px] overflow-y-auto pr-1">
                {tocHeadings.map((heading) => {
                  const isActive = activeHeadingId === heading.id;
                  return (
                    <a
                      key={heading.id}
                      href={`#${heading.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(heading.id);
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`block text-xs leading-snug py-2 px-3 transition-all duration-300 font-sans no-underline ${
                        heading.level === 'h3' ? 'pl-6' : ''
                      } ${
                        isActive
                          ? 'text-[#FFE58F] border-l-2 border-[#D4AF37] bg-[#D4AF37]/10 font-bold rounded-r-[10px]'
                          : 'text-slate-400 hover:bg-white/5 hover:text-white rounded-[10px]'
                      }`}
                    >
                      {heading.text}
                    </a>
                  );
                })}
              </nav>
            </div>
          )}

          {/* Sidebar CTA Card */}
          <div className="bg-[#0A0A0A] border border-[#8C5E00]/30 rounded-[10px] p-6 shadow-xl space-y-4 relative overflow-hidden">
            <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-[#8C5E00]/20 to-transparent border border-[#8C5E00]/30 flex items-center justify-center text-[#FFE58F]">
              <Calculator className="w-5 h-5 text-[#D4AF37]" />
            </div>

            <h4 className="text-white font-bold text-base font-sans m-0">
              Calculate Visa Fees Instantly
            </h4>

            <p className="text-slate-400 text-xs leading-relaxed font-sans m-0">
              Get direct GDRFA statutory tariffs and instant SLA turnaround timing for your family visa.
            </p>

            <button
              onClick={onOpenCalculator}
              className="w-full py-3.5 rounded-[10px] bg-gradient-to-r from-[#C9981E] to-[#FCE181] text-black font-extrabold text-xs uppercase tracking-wider font-mono shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:brightness-110 transition-all cursor-pointer"
            >
              CALCULATE MY FEES →
            </button>
          </div>

        </aside>

      </div>

      {/* ── 4-STEP CONCIERGE PROCESS ROADMAP (ON ALL ARTICLE PAGES) ───────────── */}
      <ProcessTimeline 
        title="The 4-Step Concierge Process"
        subtitle="From first contact to residency card in hand — fully managed, with zero government visits required."
      />

      {/* ── MORE ARTICLES SECTION (DARK LUXURY MORE ARTICLES) ─────────────── */}
      <section className="bg-[#050505] py-20 border-t border-white/10 text-white w-full font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8C5E00]/15 border border-[#8C5E00]/30 text-[#FFE58F] text-xs font-mono font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> MORE ARTICLES & GUIDES
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-sans m-0">
                Explore Related Insights
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400 font-medium">Curated by Senior Immigration Lawyers</span>
          </div>

          {/* 3-Column Dark Glass Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(relatedArticles.length > 0 ? relatedArticles.slice(0, 3) : [
              {
                id: '1',
                slug: 'golden-visa-family-sponsorship-perks',
                title: 'Dubai Golden Visa 10-Year Real Estate Investment Criteria',
                category: 'Golden Visa',
                date: 'October 2026',
                excerpt: 'Complete legal walkthrough of DLD property valuation requirements and title deed registration.',
                image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600&auto=format&fit=crop'
              },
              {
                id: '2',
                slug: 'newborn-baby-residence-visa-120-day-rule',
                title: 'Newborn Visa 120-Day Rule in UAE: Avoid Fines',
                category: 'Family Residency',
                date: 'September 2026',
                excerpt: 'Step-by-step guidance on consular birth certificates and in-country GDRFA status registration.',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop'
              },
              {
                id: '3',
                slug: 'uae-family-visa-salary-rules-2026',
                title: 'DIFC vs ADGM Corporate Structure & Visa Allocations',
                category: 'Corporate PRO',
                date: 'September 2026',
                excerpt: 'Comparing free zone establishment card costs and employment visa quota allocations.',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop'
              }
            ]).map((item, idx) => (
              <div
                key={idx}
                onClick={() => onNavigateArticle && onNavigateArticle(item.slug || item.id)}
                className="bg-[#0A0A0A] border border-white/10 rounded-[10px] overflow-hidden shadow-xl hover:border-[#D4AF37]/50 hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)] transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="relative aspect-video overflow-hidden bg-slate-950">
                  <img
                    src={item.image || item.featuredImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-[10px] bg-black/80 backdrop-blur-md text-[#FFE58F] border border-[#D4AF37]/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                      {item.category || 'Residency'}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="text-xs text-slate-400 font-mono">
                      {item.date || '2026'}
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#FFE58F] transition-colors leading-snug font-sans m-0">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed font-sans font-medium line-clamp-2 m-0">
                      {item.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#D4AF37] font-bold">
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read Guide →
                    </span>
                    <span className="text-slate-500 font-normal">5 min read</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
