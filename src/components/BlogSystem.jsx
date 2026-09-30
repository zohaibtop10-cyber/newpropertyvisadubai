import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MessageCircle,
  Share2,
  BookOpen,
  Search,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { articlesData } from '../data/articlesData';
import { blogPostsData, siteConfig } from '../data/cmsData';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

// ============================================================================
// EDITORIAL COMPONENTS
// ============================================================================

export function ExecutiveSummary({ title = "Executive Overview", points = [] }) {
  if (!points || points.length === 0) return null;
  return (
    <div className="my-8 bg-[#12141c]/90 backdrop-blur-xl border-l-4 border-[#D4AF37] border-y border-r border-white/10 p-6 sm:p-8 rounded-r-2xl text-slate-200 shadow-[0_0_35px_rgba(212,175,55,0.12)] relative overflow-hidden">
      <div className="flex items-center gap-3 mb-4">
        <span className="bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 text-[11px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full">
          ⚡ Quick Take / TL;DR
        </span>
        <h3 className="text-lg font-bold text-white font-display m-0">{title}</h3>
      </div>
      <ul className="space-y-3 m-0 p-0 list-none text-sm text-slate-300">
        {points.map((pt, idx) => (
          <li key={idx} className="flex items-start gap-3 m-0">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
            <span className="leading-relaxed">{pt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function GoldQuote({ quote, author, role }) {
  if (!quote) return null;
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

export function ProcessTimeline({ steps = [] }) {
  if (!steps || steps.length === 0) return null;
  return (
    <div className="my-10 pl-6 sm:pl-8 border-l-2 border-[#D4AF37]/40 space-y-8 relative">
      {steps.map((step, idx) => (
        <div key={idx} className="relative group">
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

export function FeeTable({ title, headers = [], rows = [], totalRow }) {
  if (!rows || rows.length === 0) return null;
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

export default function BlogSystem({
  activePostId,
  onNavigatePost,
  onBackToIndex,
  onOpenCalculator,
  cmsConfig
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [firebasePosts, setFirebasePosts] = useState([]);
  const [readingProgress, setReadingProgress] = useState(0);

  // Fetch articles from Firebase Realtime DB
  useEffect(() => {
    const articlesRef = ref(db, 'articles');
    const unsubscribe = onValue(articlesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setFirebasePosts(Object.values(data));
      } else {
        setFirebasePosts([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // Track Reading Scroll Progress for Single Article View
  useEffect(() => {
    if (!activePostId) return;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activePostId]);

  // Merge articles from Firebase, articlesData, and blogPostsData
  let mergedPosts = [...firebasePosts, ...articlesData, ...blogPostsData];
  
  const uniquePosts = [];
  const ids = new Set();
  mergedPosts.forEach(post => {
    if (post.status && post.status !== 'PUBLISHED') return;
    const id = post.slug || post.id;
    if (!ids.has(id)) {
      uniquePosts.push(post);
      ids.add(id);
    }
  });

  const activePost = uniquePosts.find((p) => (p.slug === activePostId || p.id === activePostId));

  const handleWhatsApp = () => {
    const message = `Hello EmiratesPrime! 👋\nI'm reading "${activePost?.title || 'UAE Residency Guide'}" and I need expert guidance.`;
    window.open(`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = activePost?.title;
    let shareUrl = '';
    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`;
        break;
    }
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  // --------------------------------------------------------------------------
  // DYNAMIC SINGLE ARTICLE DETAIL PAGE
  // --------------------------------------------------------------------------
  if (activePost) {
    // Default executive summary points if none exist in dataset
    const summaryPoints = activePost.summaryPoints || [
      'Verified 2026 rules according to latest GDRFA Dubai and ICP federal updates.',
      'Document attestation and valid Ejari tenancy contract mandatory for processing.',
      'VIP Medical fitness and Emirates ID biometric processing options available.',
      'Zero hidden fees with unbundled statutory breakdown.'
    ];

    const timelineSteps = activePost.timelineSteps || [
      { title: 'Document Attestation & Ejari Verification', duration: '1 – 2 Days', description: 'Attest family certificates via MOFA and register Ejari contract under sponsor name.' },
      { title: 'Entry Visa Application Submission', duration: '24 Hours', description: 'Submit entry permit via GDRFA/ICP portal for dependent family members.' },
      { title: 'Medical Fitness & Biometrics', duration: 'Same Day', description: 'Complete medical fitness screening and Emirates ID fingerprint capture.' },
      { title: 'Digital E-Visa & E-ID Issuance', duration: '48 Hours', description: 'Receive official residence visa e-copy and active Emirates ID.' }
    ];

    const feeHeaders = activePost.feeHeaders || ['Service Item', 'GDRFA Statutory Fee', 'Retainer', 'Total Estimate'];
    const feeRows = activePost.feeRows || [
      ['Family Entry Permit', 'AED 540', 'AED 250', 'AED 790'],
      ['In-Country Status Adjustment', 'AED 675', 'AED 150', 'AED 825'],
      ['Medical Fitness (Express)', 'AED 750', 'AED 100', 'AED 850'],
      ['Emirates ID Card (2-Year)', 'AED 370', 'AED 80', 'AED 450']
    ];
    const feeTotal = activePost.feeTotal || ['Total Fee Package', 'AED 2,335', 'AED 580', 'AED 2,915'];

    return (
      <div className="w-full bg-[#050505] min-h-screen text-slate-300 pt-28 pb-24 selection:bg-brand-gold selection:text-black">
        
        {/* Thin Glowing Gold Reading Progress Bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-[#050505] z-50">
          <div
            className="h-full bg-gradient-to-r from-[#D4AF37] via-[#FFF8DC] to-[#B8860B] shadow-[0_0_12px_#D4AF37] transition-all duration-150 ease-out"
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        {/* Main Article Reading Container */}
        <article className="max-w-4xl mx-auto px-5 sm:px-6">
          
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBackToIndex}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-slate-400 hover:text-brand-gold transition-colors mb-8 cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Knowledge Base</span>
          </motion.button>

          {/* Article Header Area */}
          <header className="space-y-5 mb-8">
            <div className="flex flex-wrap items-center gap-3">
              {activePost.category && (
                <span className="bg-brand-gold/15 text-brand-gold border border-brand-gold/30 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
                  {activePost.category}
                </span>
              )}
              <span className="text-xs text-slate-500 font-mono">•</span>
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-gold" />
                {activePost.readTime || '7 min read'}
              </span>
            </div>

            {/* Massive Crisp Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight font-display tracking-tight drop-shadow-md">
              {activePost.title}
            </h1>

            {/* Author & Date Bar */}
            <div className="flex items-center justify-between border-y border-white/10 py-4 my-6 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold flex items-center justify-center font-bold">
                  {activePost.author ? activePost.author.charAt(0) : 'E'}
                </div>
                <div>
                  <div className="font-bold text-white text-sm font-sans">{activePost.author || 'EmiratesPrime Advisory'}</div>
                  <div className="text-[11px] text-slate-400">{activePost.authorRole || 'Senior Residency Counsel'}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                  {activePost.date}
                </span>
                <button 
                  onClick={() => handleShare('twitter')}
                  title="Share Article"
                  className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-brand-gold hover:text-white transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-slate-300" />
                </button>
              </div>
            </div>
          </header>

          {/* Hero Cover Image */}
          <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 mb-10 shadow-2xl relative">
            <img
              src={activePost.featuredImage || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop'}
              alt={activePost.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Executive Summary Callout Box */}
          <ExecutiveSummary points={summaryPoints} />

          {/* Rich Text Body Rendering (Enhanced Typography Classes) */}
          <div 
            className="prose prose-lg prose-invert max-w-none space-y-8 leading-loose
              prose-headings:text-transparent prose-headings:bg-clip-text prose-headings:bg-gradient-to-r prose-headings:from-[#D4AF37] prose-headings:via-[#FFF8DC] prose-headings:to-[#B8860B]
              prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:font-extrabold prose-h2:pt-8 prose-h2:pb-3 prose-h2:border-b prose-h2:border-white/10
              prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:text-brand-gold prose-h3:font-bold
              prose-p:text-slate-300 prose-p:text-base sm:prose-p:text-lg prose-p:leading-loose
              prose-a:text-brand-gold hover:prose-a:underline prose-a:font-semibold
              prose-strong:text-white prose-strong:font-bold
              prose-li:text-slate-300 prose-li:leading-relaxed
              prose-ul:list-disc prose-ul:pl-6 marker:text-brand-gold
              prose-table:w-full prose-th:text-brand-gold prose-td:text-slate-300 prose-tr:border-b-white/10"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(marked.parse(activePost.contentMarkdown || 'Article content is currently being updated by legal advisory.'), {
                ADD_TAGS: ['svg', 'path', 'circle', 'rect'],
                ADD_ATTR: ['viewBox', 'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'cx', 'cy', 'r', 'd', 'rx']
              })
            }}
          />

          {/* Process Timeline */}
          <div className="mt-12">
            <h2 className="text-2xl font-extrabold text-[#D4AF37] font-display mb-2">Step-by-Step Application Timeline</h2>
            <p className="text-slate-400 text-sm mb-6">Estimated completion stages for GDRFA & ICP residency processing:</p>
            <ProcessTimeline steps={timelineSteps} />
          </div>

          {/* Fee Table Component */}
          <div className="mt-12">
            <h2 className="text-2xl font-extrabold text-[#D4AF37] font-display mb-2">Government Statutory & Service Fees</h2>
            <p className="text-slate-400 text-sm mb-6">Itemized breakdown of official statutory charges vs retainer costs:</p>
            <FeeTable
              title="Official Sponsoring Cost Matrix"
              headers={feeHeaders}
              rows={feeRows}
              totalRow={feeTotal}
            />
          </div>

          {/* Gold Quote Blockquote */}
          <GoldQuote
            quote="Official residency applications submitted with incomplete Ejari documentation or un-attested certificates face immediate return or rejection by GDRFA audit systems."
            author="UAE Residency Department"
            role="Immigration Directive 2026"
          />

          {/* Bottom Glassmorphic Conversion CTA Card */}
          <div className="mt-16 bg-gradient-to-br from-[#12141c]/90 via-[#0e1015]/95 to-[#0b0c10]/95 backdrop-blur-xl border-[1.5px] border-brand-gold/40 rounded-2xl p-8 sm:p-10 shadow-[0_0_50px_rgba(212,175,55,0.2)] text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#FFF8DC] to-[#B8860B]" />
            <div className="w-12 h-12 rounded-2xl bg-brand-gold/15 border border-brand-gold/30 text-brand-gold flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <h3 className="text-2xl font-extrabold text-white mb-2 font-display">
              Need expert guidance on your UAE Visa?
            </h3>
            <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
              Our senior advisors are ready to review your file and calculate exact government fees with zero obligation.
            </p>

            <button
              onClick={handleWhatsApp}
              className="mt-6 bg-gradient-to-r from-[#D4AF37] via-[#FFF8DC] to-[#B8860B] text-black font-extrabold py-4 px-8 rounded-xl shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all cursor-pointer btn-shine-effect inline-flex items-center justify-center gap-2 text-sm uppercase font-mono tracking-wider"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat with an Expert</span>
            </button>
          </div>

        </article>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // ARTICLES INDEX LISTING PAGE
  // --------------------------------------------------------------------------
  const categoriesList = ['All', 'Family Visa', 'Golden Visa', 'Corporate', 'Attestation', 'General Updates'];

  const filteredPosts = uniquePosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || 
      (post.category && post.category.toLowerCase().includes(selectedCategory.toLowerCase()));
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full bg-[#050505] min-h-screen text-slate-300 pt-28 pb-24 selection:bg-brand-gold selection:text-black">
      
      {/* Index Hero Section */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 mb-12 text-center relative">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-mono font-bold uppercase tracking-widest mb-4">
          <BookOpen className="w-3.5 h-3.5" /> Official Knowledge Base
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight font-display mb-4">
          GDRFA & ICP Knowledge Base
        </h1>

        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed mb-8">
          Clear, up-to-date guidance on UAE residency rules and visa updates.
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative mb-10">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search immigration guides (e.g. Golden Visa, Ejari, Medical)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-gold transition-colors"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-sm">
              ×
            </button>
          )}
        </div>

        {/* Glassmorphic Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {categoriesList.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-brand-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.4)] font-extrabold'
                    : 'bg-white/5 border border-white/10 text-slate-300 hover:border-brand-gold/40 hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3-Column Article Cards Grid */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredPosts.map((post, idx) => (
              <motion.div
                key={post.slug || post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.06 }}
                onClick={() => onNavigatePost(post.slug || post.id)}
                className="group bg-[#12141a]/80 backdrop-blur-xl border border-white/10 hover:border-brand-gold/40 transition-all duration-300 rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer"
              >
                {/* Cover Image Placeholder */}
                <div className="w-full aspect-[16/10] relative overflow-hidden bg-[#0a0c10]">
                  <img
                    src={post.featuredImage || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600&auto=format&fit=crop'}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e12] via-transparent to-transparent" />
                  
                  {/* Category Tag Pill */}
                  {post.category && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="text-[10px] font-mono font-bold uppercase text-brand-gold bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-brand-gold/30">
                        {post.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content Area */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    {/* Gold Tinted Date Badge */}
                    <div className="inline-flex items-center gap-1.5 bg-brand-gold/10 text-brand-gold border border-brand-gold/30 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold">
                      <Calendar className="w-3 h-3 text-brand-gold" />
                      <span>{post.date}</span>
                    </div>

                    {/* Bold White H3 Title */}
                    <h3 className="font-display font-extrabold text-xl text-white group-hover:text-brand-gold transition-colors leading-tight line-clamp-2">
                      {post.title}
                    </h3>

                    {/* 2-Line Excerpt */}
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 font-medium">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Read Link */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-brand-gold font-extrabold text-sm group-hover:translate-x-1 transition-transform">
                    <span className="flex items-center gap-1">
                      Read Full Guide <ArrowUpRight className="w-4 h-4" />
                    </span>
                    <span className="text-xs text-slate-500 font-mono font-normal">
                      {post.readTime || '5 min'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20 bg-white/[0.02] border border-white/10 rounded-2xl">
            <Search className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <h3 className="font-bold text-white text-lg mb-1">No articles found</h3>
            <p className="text-slate-400 text-sm">Try adjusting your search criteria or category filter.</p>
            <button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }} className="mt-4 text-xs font-bold text-brand-gold underline">
              Reset Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
