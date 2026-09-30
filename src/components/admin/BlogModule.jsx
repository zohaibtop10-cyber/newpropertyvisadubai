import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { ref, onValue, set } from 'firebase/database';
import { 
  Terminal, FileText, Sparkles, 
  Search, Share2, Save, Plus, Trash2, CheckCircle2
} from 'lucide-react';
import { articlesData } from '../../data/articlesData';
import { blogPostsData } from '../../data/cmsData';

export default function BlogModule({ cmsConfig, setCmsConfig, isEmbedded = false }) {
  const [blogs, setBlogs] = useState([]);
  const [activeBlogId, setActiveBlogId] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  // Firebase Realtime DB Fetch
  useEffect(() => {
    const articlesRef = ref(db, 'articles');
    const unsubscribe = onValue(articlesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const postsArray = Object.values(data);
        setBlogs(postsArray);
        if (!activeBlogId && postsArray.length > 0) {
          setActiveBlogId(postsArray[0].id);
        }
      } else {
        const rawFallback = [...articlesData, ...blogPostsData];
        const fallbackPosts = rawFallback.map(p => {
          if (!p.contentMarkdown && p.sections) {
            // Convert legacy sections to markdown
            const md = p.sections.map(s => `## ${s.heading}\n\n${s.body}`).join('\n\n');
            return { ...p, contentMarkdown: md };
          }
          return p;
        });
        setBlogs(fallbackPosts);
        if (!activeBlogId && fallbackPosts.length > 0) {
          setActiveBlogId(fallbackPosts[0].id || fallbackPosts[0].slug);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [activeBlogId]);

  const activeBlog = blogs.find(b => b.id === activeBlogId || b.slug === activeBlogId) || blogs[0];

  // Helper to update active blog
  const updateActiveBlog = (field, value) => {
    setBlogs(blogs.map(b => (b.id === activeBlogId || b.slug === activeBlogId) ? { ...b, [field]: value } : b));
  };

  const handleAddBlog = () => {
    const newBlog = {
      id: `blog-${Date.now()}`,
      title: 'New Editorial Article',
      summary: 'Executive summary here...',
      contentMarkdown: '# New Article\n\nWrite your content here...',
      imageUrl: '',
      author: 'Admin',
      publishedDate: new Date().toISOString().split('T')[0],
      keywords: '',
      metaTitle: 'New Article | SEO Title',
      metaDesc: 'Meta description for Google search results.',
      category: 'Golden Visa',
      status: 'DRAFT'
    };
    setBlogs([...blogs, newBlog]);
    setActiveBlogId(newBlog.id);
  };

  const handleDeleteBlog = async () => {
    if (blogs.length <= 1) {
      alert("You must have at least one article.");
      return;
    }
    const filtered = blogs.filter(b => b.id !== activeBlogId && b.slug !== activeBlogId);
    
    // Save deletion to Firebase
    try {
      const articlesRef = ref(db, 'articles');
      const articlesObject = {};
      filtered.forEach(b => {
        articlesObject[b.id || b.slug] = b;
      });
      await set(articlesRef, articlesObject);
      
      setBlogs(filtered);
      setActiveBlogId(filtered[0].id || filtered[0].slug);
    } catch(e) {
      alert("Error deleting article: " + e.message);
    }
  };

  const handleSave = async () => {
    try {
      const articlesRef = ref(db, 'articles');
      const articlesObject = {};
      blogs.forEach(b => {
        articlesObject[b.id || b.slug] = b;
      });
      await set(articlesRef, articlesObject);
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch(e) {
      alert("Error saving articles: " + e.message);
    }
  };

  if (!activeBlog) return null;

  // Real-Time SEO Calculators
  const metaTitlePixelWidth = (activeBlog.metaTitle || '').length * 9.2; // approx Google desktop px width (max 600px)
  const isTitleWidthOptimal = metaTitlePixelWidth >= 300 && metaTitlePixelWidth <= 580;
  const isDescLengthOptimal = (activeBlog.metaDesc || '').length >= 120 && (activeBlog.metaDesc || '').length <= 160;

  // Real-Time JSON-LD Schema Generator
  const generatedJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": activeBlog.title,
    "description": activeBlog.summary,
    "image": activeBlog.imageUrl || "",
    "datePublished": activeBlog.publishedDate || "",
    "author": {
      "@type": "Person",
      "name": activeBlog.author || "EmiratesPrime Sovereign Advisory"
    },
    "publisher": {
      "@type": "Organization",
      "name": "800 DOCS LLC SOC"
    }
  }, null, 2);

  return (
    <div className={`space-y-6 animate-fadeIn ${isEmbedded ? 'pt-6 border-t border-slate-800' : ''}`}>
      
      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-brand-gold/30 rounded-xl text-brand-goldLight text-sm font-bold flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Blog articles and SEO metadata published successfully!</span>
        </div>
      )}

      {/* Header Banner */}
      {!isEmbedded && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-brand-surfaceLight border border-slate-800 p-6 rounded-xl shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-brand-goldLight font-bold uppercase mb-1">
              <Terminal className="w-3.5 h-3.5" /> Regulatory Publishing & SEO Hub
            </div>
            <h1 className="text-xl font-black text-white">Editorial & Enterprise SEO Suite</h1>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Publish ministerial briefings with real-time Google pixel width inspection, JSON-LD Schema generation, and OpenGraph social card previews.
            </p>
          </div>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-brand-primary hover:-brand-hover/40 text-white rounded-xl font-bold text-xs shadow-lg shadow-[#D4AF37]/30 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" /> Publish & Save Articles
          </button>
        </div>
      )}

      {/* Article Selector */}
      <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
            SELECT ARTICLE TO EDIT
          </label>
          <select
            value={activeBlogId || ''}
            onChange={(e) => setActiveBlogId(e.target.value)}
            className="bg-brand-darkBg border border-slate-800 text-white font-bold text-sm rounded-xl p-3 focus:outline-none focus:border-brand-primary cursor-pointer min-w-[320px] max-w-full"
          >
            {blogs.map(b => (
              <option key={b.id} value={b.id} className="bg-brand-surfaceLight text-white">
                {b.status === 'PUBLISHED' ? '🟢 ' : '🟠 '} {b.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddBlog}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" /> New Article
          </button>
          <button
            type="button"
            onClick={handleDeleteBlog}
            className="px-4 py-2.5 bg-brand-primary/100/10 hover:bg-brand-primary/100/20 text-brand-primary text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ------------------------------------------------------------------ */}
        {/* EDITORIAL MARKDOWN EDITOR (2 COLS)                                 */}
        {/* ------------------------------------------------------------------ */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-primary" /> Article Content & Taxonomy
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-mono mb-1">Article Title</label>
                <input
                  type="text"
                  value={activeBlog.title || ''}
                  onChange={(e) => updateActiveBlog('title', e.target.value)}
                  className="w-full bg-brand-darkBg border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 font-bold text-sm focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Author Name</label>
                  <input
                    type="text"
                    value={activeBlog.author || ''}
                    onChange={(e) => updateActiveBlog('author', e.target.value)}
                    className="w-full bg-brand-darkBg border border-slate-800 rounded-xl px-3.5 py-2 text-slate-100 text-sm focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-mono mb-1">Published Date</label>
                  <input
                    type="date"
                    value={activeBlog.publishedDate || ''}
                    onChange={(e) => updateActiveBlog('publishedDate', e.target.value)}
                    className="w-full bg-brand-darkBg border border-slate-800 rounded-xl px-3.5 py-2 text-slate-100 text-sm focus:outline-none focus:border-brand-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-mono mb-1">Main Header Image URL</label>
                <input
                  type="text"
                  value={activeBlog.imageUrl || ''}
                  onChange={(e) => updateActiveBlog('imageUrl', e.target.value)}
                  className="w-full bg-brand-darkBg border border-slate-800 rounded-xl px-3.5 py-2 text-slate-100 text-sm focus:outline-none focus:border-brand-primary"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Taxonomy Category</label>
                  <select
                    value={activeBlog.category || 'Golden Visa'}
                    onChange={(e) => updateActiveBlog('category', e.target.value)}
                    className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-2 text-slate-200 font-semibold focus:outline-none cursor-pointer"
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
                    value={activeBlog.status || 'DRAFT'}
                    onChange={(e) => updateActiveBlog('status', e.target.value)}
                    className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-2 text-slate-200 font-semibold focus:outline-none cursor-pointer"
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
                  value={activeBlog.summary || ''}
                  onChange={(e) => updateActiveBlog('summary', e.target.value)}
                  className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-3 text-slate-300 focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-mono mb-1">Full Detailed Markdown Body Content</label>
                <textarea
                  rows={20}
                  value={activeBlog.contentMarkdown || ''}
                  onChange={(e) => updateActiveBlog('contentMarkdown', e.target.value)}
                  className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-3 font-mono text-slate-200 focus:outline-none focus:border-brand-primary"
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
          <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Search className="w-4 h-4 text-brand-goldLight" /> Enterprise SEO Inspector
            </h3>

            {/* Meta Title Pixel Width Bar */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-slate-400">Meta Title Google Px Width:</span>
                <span className={`font-bold ${isTitleWidthOptimal ? 'text-brand-goldLight' : 'text-brand-goldLight'}`}>
                  ~{Math.round(metaTitlePixelWidth)}px / 600px
                </span>
              </div>
              <input
                type="text"
                value={activeBlog.metaTitle || ''}
                onChange={(e) => updateActiveBlog('metaTitle', e.target.value)}
                className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-2 text-slate-200 text-xs font-medium focus:outline-none focus:border-brand-primary"
              />
              <div className="h-1.5 bg-brand-darkBg rounded-full overflow-hidden">
                <div 
                  style={{ width: `${Math.min(100, (metaTitlePixelWidth / 600) * 100)}%` }}
                  className={`h-full ${isTitleWidthOptimal ? 'bg-emerald-500' : 'bg-amber-500'}`}
                />
              </div>
            </div>

            {/* Target Keywords */}
            <div className="space-y-1.5 text-xs">
              <label className="block text-slate-400 font-mono text-[11px]">SEO Focus Keywords (Comma Separated)</label>
              <input
                type="text"
                value={activeBlog.keywords || ''}
                onChange={(e) => updateActiveBlog('keywords', e.target.value)}
                placeholder="e.g. uae golden visa, property investor visa"
                className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-2 text-slate-200 text-xs focus:outline-none focus:border-brand-primary"
              />
            </div>

            {/* Meta Description Inspector */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-slate-400">Meta Description Length:</span>
                <span className={`font-bold ${isDescLengthOptimal ? 'text-brand-goldLight' : 'text-brand-goldLight'}`}>
                  {(activeBlog.metaDesc || '').length} / 160 chars
                </span>
              </div>
              <textarea
                rows={3}
                value={activeBlog.metaDesc || ''}
                onChange={(e) => updateActiveBlog('metaDesc', e.target.value)}
                className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-2 text-slate-300 text-xs focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          {/* OpenGraph Social Card Preview */}
          <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 shadow-xl space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase text-slate-400 flex items-center gap-2">
              <Share2 className="w-4 h-4 text-brand-goldLight" /> OpenGraph Social Preview
            </h3>

            <div className="bg-brand-darkBg border border-slate-800 rounded-xl overflow-hidden shadow-md">
              <div className="h-28 bg-gradient-to-tr from-[#D4AF37] to-slate-900 flex items-center justify-center font-bold text-white text-sm p-4 text-center">
                {activeBlog.title}
              </div>
              <div className="p-3 space-y-1">
                <div className="text-[10px] font-mono text-content-muted uppercase">familyvisa.ae • 2 min read</div>
                <div className="font-bold text-white text-xs line-clamp-1">{activeBlog.metaTitle}</div>
                <div className="text-[11px] text-slate-400 line-clamp-2">{activeBlog.metaDesc}</div>
              </div>
            </div>
          </div>

          {/* Generated JSON-LD Schema Box */}
          <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 shadow-xl space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase text-slate-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-goldLight" /> JSON-LD Schema
            </h3>
            <pre className="bg-brand-darkBg p-3 rounded-xl text-[10px] font-mono text-slate-300 overflow-x-auto max-h-40 border border-slate-800">
              {generatedJsonLd}
            </pre>
          </div>

        </div>

      </div>

    </div>
  );
}
