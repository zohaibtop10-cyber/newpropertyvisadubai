import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { ref, onValue, set } from 'firebase/database';
import { 
  Terminal, FileText, Sparkles, User, HelpCircle,
  Search, Share2, Save, Plus, Trash2, CheckCircle2,
  DollarSign, Table, Megaphone, Info, Layers
} from 'lucide-react';
import { articlesData } from '../../data/articlesData';
import { blogPostsData } from '../../data/cmsData';

const DEFAULT_ARTICLE_AUTHOR_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop';
const DEFAULT_ARTICLE_AUTHOR_BIO = 'Specializing in GDRFA and ICP residency compliance, Golden Visa nominations, and VIP corporate family relocation across all 7 UAE Emirates.';
const DEFAULT_NOTICE_TITLE = 'Official GDRFA & ICP Compliance Notice';
const DEFAULT_NOTICE_CONTENT = 'All family residency permits require an attested Ejari tenancy contract registered under the primary sponsor\'s name.';
const DEFAULT_COMPARISON_CARDS = [
  {
    title: 'Inside Country Status',
    subtitle: 'For dependents currently inside the UAE',
    price: '3,850',
    currency: 'AED',
    tag: 'Most Popular',
    primary: true,
    features: ['No exit trip required', 'Includes GDRFA status change fee', 'VIP Smart Salem Medical screening', '2-Year physical Emirates ID delivery']
  },
  {
    title: 'Outside Country Entry',
    subtitle: 'For dependents currently abroad',
    price: '2,950',
    currency: 'AED',
    tag: 'Standard Route',
    primary: false,
    features: ['Electronic Entry Permit', '60-day entry window authorization', 'In-country status activation', '2-Year physical Emirates ID delivery']
  }
];
const DEFAULT_LUXURY_TABLE_CAPT = 'Government Filing Tariffs & Concierge Breakdown';
const DEFAULT_LUXURY_TABLE_HDRS = ['Residency Category', 'Government Fee', 'VIP Medical & EID', 'Total Estimate'];
const DEFAULT_LUXURY_TABLE_ROWS = [
  ['Spouse Residence (2-Year)', 'AED 3,040', 'AED 850', 'AED 3,890'],
  ['Child Residence (Per Child)', 'AED 2,860', 'AED 680', 'AED 3,540'],
  ['Parent Residence (1-Year)', 'AED 3,040', 'AED 950', 'AED 3,990']
];
const DEFAULT_CTA_BADGE = 'Fast-Track Processing';
const DEFAULT_CTA_TITLE = 'Calculate Your Exact Visa Cost';
const DEFAULT_CTA_SUBTITLE = 'Zero obligation. Instant GDRFA fee breakdown in under 30 seconds.';
const DEFAULT_CTA_BTN = 'Launch Visa Calculator';
const DEFAULT_ARTICLE_FAQS = [
  {
    q: 'What is the minimum salary required to sponsor a spouse in Dubai?',
    a: 'The minimum monthly salary is AED 4,000, or AED 3,000 if your employer provides free company accommodation.'
  },
  {
    q: 'How long does the family residency visa processing take?',
    a: 'Standard processing takes 3-5 working days. Fast-track VIP processing completes in 24-48 hours.'
  }
];

function enrichPostWithDefaults(p) {
  let md = p.contentMarkdown;
  if (!md && p.sections) {
    md = p.sections.map(s => `## ${s.heading}\n\n${s.body}`).join('\n\n');
  }

  return {
    id: p.id || p.slug || `blog-${Date.now()}`,
    slug: p.slug || p.id || 'article-slug',
    title: p.title || 'Untitled Residency Article',
    summary: p.summary || p.excerpt || 'Executive summary of this residency guide...',
    excerpt: p.excerpt || p.summary || 'Executive summary of this residency guide...',
    contentMarkdown: md || '# Article Title\n\nArticle content here...',
    imageUrl: p.imageUrl || p.featuredImage || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
    featuredImage: p.featuredImage || p.imageUrl || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
    author: p.author || 'Fatima Al-Mansoori',
    authorRole: p.authorRole || 'Senior Visa Specialist & Legal Counsel',
    authorAvatar: p.authorAvatar || DEFAULT_ARTICLE_AUTHOR_AVATAR,
    authorBio: p.authorBio || DEFAULT_ARTICLE_AUTHOR_BIO,
    readTime: p.readTime || '5 min read',
    publishedDate: p.publishedDate || p.date || new Date().toISOString().split('T')[0],
    keywords: p.keywords || 'uae family visa, property visa, GDRFA compliance',
    metaTitle: p.metaTitle || p.title || 'New UAE Residency & Family Visa Guide',
    metaDesc: p.metaDesc || p.summary || p.excerpt || 'Verified, up-to-date guidance on UAE residency rules.',
    category: p.category || 'Golden Visa',
    status: p.status || 'PUBLISHED',

    showNoticeBox: p.showNoticeBox !== false,
    noticeBoxTitle: p.noticeBoxTitle || p.noticeTitle || DEFAULT_NOTICE_TITLE,
    noticeBoxType: p.noticeBoxType || p.noticeType || 'highlight',
    noticeBoxContent: p.noticeBoxContent || p.noticeContent || DEFAULT_NOTICE_CONTENT,

    showComparisonCards: p.showComparisonCards !== false,
    comparisonCards: (p.comparisonCards && p.comparisonCards.length > 0) ? p.comparisonCards : DEFAULT_COMPARISON_CARDS,

    showLuxuryTable: p.showLuxuryTable !== false,
    tableCaption: p.tableCaption || DEFAULT_LUXURY_TABLE_CAPT,
    tableHeaders: (p.tableHeaders && p.tableHeaders.length > 0) ? p.tableHeaders : DEFAULT_LUXURY_TABLE_HDRS,
    tableRows: (p.tableRows && p.tableRows.length > 0) ? p.tableRows : DEFAULT_LUXURY_TABLE_ROWS,

    showInlineCTA: p.showInlineCTA !== false,
    ctaBadge: p.ctaBadge || DEFAULT_CTA_BADGE,
    ctaTitle: p.ctaTitle || DEFAULT_CTA_TITLE,
    ctaSubtitle: p.ctaSubtitle || DEFAULT_CTA_SUBTITLE,
    ctaBtnText: p.ctaBtnText || DEFAULT_CTA_BTN,

    showFaqs: p.showFaqs !== false,
    faqs: (p.faqs && p.faqs.length > 0) ? p.faqs : DEFAULT_ARTICLE_FAQS
  };
}

export default function BlogModule({ cmsConfig, setCmsConfig, isEmbedded = false }) {
  const [blogs, setBlogs] = useState([]);
  const [activeBlogId, setActiveBlogId] = useState(null);
  const [activeSubTab, setActiveSubTab] = useState('content');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  // Firebase Realtime DB Fetch
  useEffect(() => {
    const articlesRef = ref(db, 'articles');
    const unsubscribe = onValue(articlesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const postsArray = Object.values(data).map(p => enrichPostWithDefaults(p));
        setBlogs(postsArray);
        if (!activeBlogId && postsArray.length > 0) {
          setActiveBlogId(postsArray[0].id || postsArray[0].slug);
        }
      } else {
        const rawFallback = [...articlesData, ...blogPostsData];
        const fallbackPosts = rawFallback.map(p => enrichPostWithDefaults(p));
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

  const updateActiveBlog = (field, value) => {
    setBlogs(blogs.map(b => (b.id === activeBlogId || b.slug === activeBlogId) ? { ...b, [field]: value } : b));
  };

  const handleAddBlog = () => {
    const newBlog = {
      id: `blog-${Date.now()}`,
      title: 'New Ministerial Briefing / Article',
      summary: 'Executive summary of this residency guide...',
      contentMarkdown: '# New Residency Guide\n\nWrite your detailed guide here...',
      imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
      author: 'Fatima Al-Mansoori',
      authorRole: 'Senior Visa Specialist & Legal Counsel',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      authorBio: 'Specializing in GDRFA and ICP residency compliance, Golden Visa nominations, and VIP corporate family relocation across all 7 UAE Emirates.',
      readTime: '5 min',
      publishedDate: new Date().toISOString().split('T')[0],
      keywords: 'uae family visa, property visa, GDRFA compliance',
      metaTitle: 'New UAE Residency & Family Visa Guide (2026)',
      metaDesc: 'Verified, up-to-date guidance on UAE residency rules, Golden Visa eligibility, and document attestation.',
      category: 'Golden Visa',
      status: 'DRAFT',
      // Dynamic Section Controls
      showNoticeBox: true,
      noticeBoxTitle: 'Official GDRFA & ICP Compliance (2026)',
      noticeBoxType: 'highlight',
      noticeBoxContent: 'All family residency permits require an attested Ejari tenancy contract registered under the primary sponsor\'s name.',
      showComparisonCards: true,
      comparisonCards: [
        {
          title: 'Inside Country Status',
          subtitle: 'For dependents already inside the UAE',
          price: '3,850',
          currency: 'AED',
          tag: 'Most Popular',
          primary: true,
          features: ['No exit trip required', 'Includes GDRFA status change fee', 'VIP Smart Salem Medical screening', '2-Year physical Emirates ID delivery']
        },
        {
          title: 'Outside Country Entry',
          subtitle: 'For dependents currently abroad',
          price: '2,950',
          currency: 'AED',
          tag: 'Standard Route',
          primary: false,
          features: ['Electronic Entry Permit', '60-day entry window authorization', 'In-country status activation', '2-Year physical Emirates ID delivery']
        }
      ],
      showLuxuryTable: true,
      tableCaption: 'Government Filing Tariffs & Concierge Breakdown (2026)',
      tableHeaders: ['Residency Category', 'Government Fee', 'VIP Medical & EID', 'Total Estimate'],
      tableRows: [
        ['Spouse Residence (2-Year)', 'AED 3,040', 'AED 850', 'AED 3,890'],
        ['Child Residence (Per Child)', 'AED 2,860', 'AED 680', 'AED 3,540'],
        ['Parent Residence (1-Year)', 'AED 3,040', 'AED 950', 'AED 3,990']
      ],
      showInlineCTA: true,
      ctaBadge: 'Fast-Track Processing',
      ctaTitle: 'Calculate Your Exact Visa Cost',
      ctaSubtitle: 'Zero obligation. Instant GDRFA fee breakdown in under 30 seconds.',
      ctaBtnText: 'Launch Visa Calculator',
      showFaqs: true,
      faqs: [
        {
          q: 'What is the minimum salary required to sponsor a spouse in Dubai?',
          a: 'The minimum monthly salary is AED 4,000, or AED 3,000 if your employer provides free company accommodation.'
        }
      ]
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

  const metaTitlePixelWidth = (activeBlog.metaTitle || '').length * 9.2;
  const isTitleWidthOptimal = metaTitlePixelWidth >= 300 && metaTitlePixelWidth <= 580;
  const isDescLengthOptimal = (activeBlog.metaDesc || '').length >= 120 && (activeBlog.metaDesc || '').length <= 160;

  const generatedJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": activeBlog.title,
    "description": activeBlog.summary,
    "image": activeBlog.imageUrl || "",
    "datePublished": activeBlog.publishedDate || "",
    "author": {
      "@type": "Person",
      "name": activeBlog.author || "800 DOCS Advisory Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "800 DOCS LLC SOC"
    }
  }, null, 2);

  const subTabs = [
    { id: 'content', label: '1. Content & Body', icon: FileText },
    { id: 'author', label: '2. Author Bio', icon: User },
    { id: 'takeaways', label: '3. Notice Callout', icon: Info },
    { id: 'pricing', label: '4. Pricing Cards', icon: DollarSign },
    { id: 'table', label: '5. Fee Breakdown Table', icon: Table },
    { id: 'cta', label: '6. Offer Banner', icon: Megaphone },
    { id: 'faqs', label: '7. Article FAQs', icon: HelpCircle },
    { id: 'seo', label: '8. SEO Inspector', icon: Search }
  ];

  return (
    <div className={`max-w-6xl space-y-6 animate-fadeIn pb-16 ${isEmbedded ? 'pt-6 border-t border-slate-800' : ''}`}>
      
      {/* Header Banner */}
      {!isEmbedded && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-brand-darkSurface border border-slate-800 p-6 sm:p-8 shadow-2xl">
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SEO & Complete Article Section Engine</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                Articles & Editorial CMS
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
                Edit every visual section on the article page: pricing cards, fee tables, FAQs, author profiles, callouts, and SEO metadata.
              </p>
            </div>
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Publish Articles</span>
            </button>
          </div>
        </div>
      )}

      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-semibold flex items-center gap-3 shadow-lg animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span>Articles and all embedded section configurations published live!</span>
        </div>
      )}

      {/* Article Selector & Actions Controls */}
      <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Select Article to Edit
          </label>
          <select
            value={activeBlogId || ''}
            onChange={(e) => setActiveBlogId(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700/80 text-white font-semibold text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500/50 cursor-pointer"
          >
            {blogs.map(b => (
              <option key={b.id || b.slug} value={b.id || b.slug} className="bg-slate-900 text-white">
                {b.status === 'PUBLISHED' ? '🟢 ' : '🟠 '} {b.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleAddBlog}
            className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors cursor-pointer border border-slate-700"
          >
            <Plus className="w-4 h-4" /> New Article
          </button>
          <button
            type="button"
            onClick={handleDeleteBlog}
            className="px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold rounded-xl flex items-center gap-2 transition-colors cursor-pointer border border-red-500/20"
          >
            <Trash2 className="w-4 h-4" /> Delete Article
          </button>
        </div>
      </div>

      {/* Article Section Navigation Tabs */}
      <div className="flex flex-wrap gap-2 bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 p-2 rounded-2xl shadow-xl">
        {subTabs.map(t => {
          const Icon = t.icon;
          const isActive = activeSubTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveSubTab(t.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* ACTIVE TAB EDITOR CONTENT CONTAINER */}
      <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-7 shadow-xl space-y-6">
        
        {/* TAB 1: CONTENT & BODY */}
        {activeSubTab === 'content' && (
          <div className="space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-white">Article Content & Taxonomy</h3>
                <p className="text-slate-400 text-xs">Edit main title, cover image, category, status, summary, and markdown body</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Article Title</label>
                <input
                  type="text"
                  value={activeBlog.title || ''}
                  onChange={(e) => updateActiveBlog('title', e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold text-sm focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Published Date</label>
                  <input
                    type="date"
                    value={activeBlog.publishedDate || ''}
                    onChange={(e) => updateActiveBlog('publishedDate', e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Category</label>
                  <select
                    value={activeBlog.category || 'Golden Visa'}
                    onChange={(e) => updateActiveBlog('category', e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-xs font-medium focus:outline-none cursor-pointer"
                  >
                    <option value="Golden Visa">Golden Visa</option>
                    <option value="Mainland LLC">Mainland LLC</option>
                    <option value="Corporate Tax">Corporate Tax</option>
                    <option value="Family Residency">Family Residency</option>
                    <option value="UAE Family Visa">UAE Family Visa</option>
                    <option value="Attestation">Attestation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Publication Status</label>
                  <select
                    value={activeBlog.status || 'DRAFT'}
                    onChange={(e) => updateActiveBlog('status', e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-xs font-medium focus:outline-none cursor-pointer"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="SCHEDULED">Scheduled</option>
                    <option value="PUBLISHED">Published (Live)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Main Cover Image URL</label>
                <input
                  type="text"
                  value={activeBlog.imageUrl || activeBlog.featuredImage || ''}
                  onChange={(e) => {
                    updateActiveBlog('imageUrl', e.target.value);
                    updateActiveBlog('featuredImage', e.target.value);
                  }}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-amber-500/50"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Executive Excerpt / Summary</label>
                <textarea
                  rows={2}
                  value={activeBlog.summary || activeBlog.excerpt || ''}
                  onChange={(e) => {
                    updateActiveBlog('summary', e.target.value);
                    updateActiveBlog('excerpt', e.target.value);
                  }}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-slate-300 focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Article Body (Markdown)</label>
                <textarea
                  rows={14}
                  value={activeBlog.contentMarkdown || ''}
                  onChange={(e) => updateActiveBlog('contentMarkdown', e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 font-mono text-slate-200 text-xs leading-relaxed focus:outline-none focus:border-amber-500/50"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AUTHOR PROFILE */}
        {activeSubTab === 'author' && (
          <div className="space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-white">Author Profile & Bio Card</h3>
                <p className="text-slate-400 text-xs">Configure the author details rendered at the top and bottom of the article</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Author Name</label>
                  <input
                    type="text"
                    value={activeBlog.author || ''}
                    onChange={(e) => updateActiveBlog('author', e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-medium focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Author Role / Title</label>
                  <input
                    type="text"
                    value={activeBlog.authorRole || ''}
                    onChange={(e) => updateActiveBlog('authorRole', e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-medium focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Read Time</label>
                  <input
                    type="text"
                    value={activeBlog.readTime || ''}
                    onChange={(e) => updateActiveBlog('readTime', e.target.value)}
                    placeholder="e.g. 6 min"
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-medium focus:outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Author Avatar Image URL</label>
                <input
                  type="text"
                  value={activeBlog.authorAvatar || ''}
                  onChange={(e) => updateActiveBlog('authorAvatar', e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-amber-500/50"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Author Bio Description</label>
                <textarea
                  rows={4}
                  value={activeBlog.authorBio || ''}
                  onChange={(e) => updateActiveBlog('authorBio', e.target.value)}
                  placeholder="Specializing in GDRFA and ICP residency compliance..."
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-slate-300 focus:outline-none focus:border-amber-500/50"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: EXECUTIVE TAKEAWAYS CALLOUT BOX */}
        {activeSubTab === 'takeaways' && (
          <div className="space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-white">Notice Box / Key Takeaways Callout</h3>
                <p className="text-slate-400 text-xs">Configure the top highlighted warning/takeaway box rendered above the article text</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="showNoticeBox"
                  checked={activeBlog.showNoticeBox !== false}
                  onChange={(e) => updateActiveBlog('showNoticeBox', e.target.checked)}
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                />
                <label htmlFor="showNoticeBox" className="text-white font-bold cursor-pointer">
                  Display Notice Box on Article Page
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Notice Box Title</label>
                  <input
                    type="text"
                    value={activeBlog.noticeBoxTitle || activeBlog.noticeTitle || ''}
                    onChange={(e) => {
                      updateActiveBlog('noticeBoxTitle', e.target.value);
                      updateActiveBlog('noticeTitle', e.target.value);
                    }}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-medium focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Box Style / Accent Type</label>
                  <select
                    value={activeBlog.noticeBoxType || activeBlog.noticeType || 'highlight'}
                    onChange={(e) => {
                      updateActiveBlog('noticeBoxType', e.target.value);
                      updateActiveBlog('noticeType', e.target.value);
                    }}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-xs font-medium focus:outline-none cursor-pointer"
                  >
                    <option value="highlight">Gold Highlight (Luxury)</option>
                    <option value="info">Info Slate (Standard)</option>
                    <option value="warning">Amber Warning (Alert)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Notice Box Content</label>
                <textarea
                  rows={3}
                  value={activeBlog.noticeBoxContent || activeBlog.noticeContent || ''}
                  onChange={(e) => {
                    updateActiveBlog('noticeBoxContent', e.target.value);
                    updateActiveBlog('noticeContent', e.target.value);
                  }}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-slate-300 focus:outline-none focus:border-amber-500/50"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: EMBEDDED PRICING / ROUTE COMPARISON CARDS */}
        {activeSubTab === 'pricing' && (
          <div className="space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-white">Embedded Route & Pricing Cards</h3>
                <p className="text-slate-400 text-xs">Manage side-by-side route option cards rendered inside the article</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="showComparisonCards"
                    checked={activeBlog.showComparisonCards !== false}
                    onChange={(e) => updateActiveBlog('showComparisonCards', e.target.checked)}
                    className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                  />
                  <label htmlFor="showComparisonCards" className="text-white font-bold cursor-pointer">
                    Enable Embedded Pricing Cards
                  </label>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const cards = activeBlog.comparisonCards || [];
                    const newCard = {
                      title: 'New Route Option',
                      subtitle: 'Route description...',
                      price: '2,950',
                      currency: 'AED',
                      tag: 'Standard',
                      primary: false,
                      features: ['Feature point 1', 'Feature point 2']
                    };
                    updateActiveBlog('comparisonCards', [...cards, newCard]);
                  }}
                  className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/20 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Pricing Card
                </button>
              </div>

              {(activeBlog.comparisonCards || []).map((card, cIdx) => (
                <div key={cIdx} className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3 relative">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="font-mono font-bold text-amber-400 text-xs">Card #{cIdx + 1}: {card.title}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = activeBlog.comparisonCards.filter((_, i) => i !== cIdx);
                        updateActiveBlog('comparisonCards', updated);
                      }}
                      className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">Card Title</label>
                      <input
                        type="text"
                        value={card.title || ''}
                        onChange={(e) => {
                          const updated = [...activeBlog.comparisonCards];
                          updated[cIdx].title = e.target.value;
                          updateActiveBlog('comparisonCards', updated);
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Subtitle</label>
                      <input
                        type="text"
                        value={card.subtitle || ''}
                        onChange={(e) => {
                          const updated = [...activeBlog.comparisonCards];
                          updated[cIdx].subtitle = e.target.value;
                          updateActiveBlog('comparisonCards', updated);
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Price & Currency</label>
                      <div className="flex gap-1">
                        <input
                          type="text"
                          value={card.currency || 'AED'}
                          onChange={(e) => {
                            const updated = [...activeBlog.comparisonCards];
                            updated[cIdx].currency = e.target.value;
                            updateActiveBlog('comparisonCards', updated);
                          }}
                          className="w-16 bg-slate-900 border border-slate-800 rounded-lg px-2 py-2 text-white text-xs text-center font-mono"
                        />
                        <input
                          type="text"
                          value={card.price || ''}
                          onChange={(e) => {
                            const updated = [...activeBlog.comparisonCards];
                            updated[cIdx].price = e.target.value;
                            updateActiveBlog('comparisonCards', updated);
                          }}
                          className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Tag / Badge</label>
                      <input
                        type="text"
                        value={card.tag || ''}
                        onChange={(e) => {
                          const updated = [...activeBlog.comparisonCards];
                          updated[cIdx].tag = e.target.value;
                          updateActiveBlog('comparisonCards', updated);
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Bullet Features (one per line)</label>
                    <textarea
                      rows={3}
                      value={Array.isArray(card.features) ? card.features.join('\n') : card.features || ''}
                      onChange={(e) => {
                        const updated = [...activeBlog.comparisonCards];
                        updated[cIdx].features = e.target.value.split('\n');
                        updateActiveBlog('comparisonCards', updated);
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 text-xs font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: EMBEDDED FEE BREAKDOWN TABLE */}
        {activeSubTab === 'table' && (
          <div className="space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                <Table className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-white">Government Fee Breakdown Table</h3>
                <p className="text-slate-400 text-xs">Configure the itemized government filing tariffs table embedded in the article</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="showLuxuryTable"
                    checked={activeBlog.showLuxuryTable !== false}
                    onChange={(e) => updateActiveBlog('showLuxuryTable', e.target.checked)}
                    className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                  />
                  <label htmlFor="showLuxuryTable" className="text-white font-bold cursor-pointer">
                    Enable Fee Breakdown Table
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Table Header Caption</label>
                <input
                  type="text"
                  value={activeBlog.tableCaption || ''}
                  onChange={(e) => updateActiveBlog('tableCaption', e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-medium focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Table Headers (Comma-Separated)</label>
                <input
                  type="text"
                  value={Array.isArray(activeBlog.tableHeaders) ? activeBlog.tableHeaders.join(', ') : activeBlog.tableHeaders || ''}
                  onChange={(e) => updateActiveBlog('tableHeaders', e.target.value.split(',').map(s => s.trim()))}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-amber-500/50"
                  placeholder="Residency Category, Government Fee, VIP Medical & EID, Total Estimate"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-slate-300 font-semibold">Table Data Rows</label>
                  <button
                    type="button"
                    onClick={() => {
                      const rows = activeBlog.tableRows || [];
                      updateActiveBlog('tableRows', [...rows, ['Category', 'AED 0', 'AED 0', 'AED 0']]);
                    }}
                    className="px-3 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/20 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Row
                  </button>
                </div>

                {(activeBlog.tableRows || []).map((row, rIdx) => (
                  <div key={rIdx} className="flex items-center gap-2 bg-slate-950/80 p-2.5 border border-slate-800 rounded-xl">
                    <span className="font-mono text-amber-400 text-xs w-6 text-center">#{rIdx + 1}</span>
                    {Array.isArray(row) && row.map((cell, cIdx) => (
                      <input
                        key={cIdx}
                        type="text"
                        value={cell || ''}
                        onChange={(e) => {
                          const updatedRows = [...activeBlog.tableRows];
                          updatedRows[rIdx][cIdx] = e.target.value;
                          updateActiveBlog('tableRows', updatedRows);
                        }}
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white text-xs"
                      />
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const updatedRows = activeBlog.tableRows.filter((_, i) => i !== rIdx);
                        updateActiveBlog('tableRows', updatedRows);
                      }}
                      className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: MID-ARTICLE CTA OFFER BANNER */}
        {activeSubTab === 'cta' && (
          <div className="space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                <Megaphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-white">Mid-Article Callout / Offer Banner</h3>
                <p className="text-slate-400 text-xs">Configure the dark-gold promotion banner embedded inside the article</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="showInlineCTA"
                  checked={activeBlog.showInlineCTA !== false}
                  onChange={(e) => updateActiveBlog('showInlineCTA', e.target.checked)}
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                />
                <label htmlFor="showInlineCTA" className="text-white font-bold cursor-pointer">
                  Enable Mid-Article Offer Banner
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Banner Badge Text</label>
                  <input
                    type="text"
                    value={activeBlog.ctaBadge || ''}
                    onChange={(e) => updateActiveBlog('ctaBadge', e.target.value)}
                    placeholder="e.g. Fast-Track Processing"
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-medium focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Button Action Text</label>
                  <input
                    type="text"
                    value={activeBlog.ctaBtnText || ''}
                    onChange={(e) => updateActiveBlog('ctaBtnText', e.target.value)}
                    placeholder="e.g. Launch Visa Calculator"
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-medium focus:outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Banner Title</label>
                <input
                  type="text"
                  value={activeBlog.ctaTitle || ''}
                  onChange={(e) => updateActiveBlog('ctaTitle', e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-bold text-sm focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Banner Subtitle / Offer Details</label>
                <textarea
                  rows={2}
                  value={activeBlog.ctaSubtitle || ''}
                  onChange={(e) => updateActiveBlog('ctaSubtitle', e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-slate-300 focus:outline-none focus:border-amber-500/50"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: ARTICLE-SPECIFIC FAQS ACCORDION */}
        {activeSubTab === 'faqs' && (
          <div className="space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-white">Article FAQs Accordion</h3>
                <p className="text-slate-400 text-xs">Manage question and answer pairs displayed at the bottom of this article</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="showFaqs"
                    checked={activeBlog.showFaqs !== false}
                    onChange={(e) => updateActiveBlog('showFaqs', e.target.checked)}
                    className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                  />
                  <label htmlFor="showFaqs" className="text-white font-bold cursor-pointer">
                    Enable Article FAQs Section
                  </label>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const currentFaqs = activeBlog.faqs || [];
                    updateActiveBlog('faqs', [...currentFaqs, { q: 'New Question?', a: 'Answer text...' }]);
                  }}
                  className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/20 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add FAQ Item
                </button>
              </div>

              {(activeBlog.faqs || []).map((faq, fIdx) => (
                <div key={fIdx} className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2 relative">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="font-mono font-bold text-amber-400 text-xs">FAQ #{fIdx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = activeBlog.faqs.filter((_, i) => i !== fIdx);
                        updateActiveBlog('faqs', updated);
                      }}
                      className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Question</label>
                    <input
                      type="text"
                      value={faq.q || ''}
                      onChange={(e) => {
                        const updated = [...activeBlog.faqs];
                        updated[fIdx].q = e.target.value;
                        updateActiveBlog('faqs', updated);
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white font-bold text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Answer</label>
                    <textarea
                      rows={2}
                      value={faq.a || ''}
                      onChange={(e) => {
                        const updated = [...activeBlog.faqs];
                        updated[fIdx].a = e.target.value;
                        updateActiveBlog('faqs', updated);
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: SEO & OPENGRAPH INSPECTOR */}
        {activeSubTab === 'seo' && (
          <div className="space-y-6">
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-sm font-display font-bold text-white flex items-center gap-2">
                <Search className="w-4 h-4 text-amber-400" /> Enterprise SEO Inspector
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="text-slate-400">Google Title Width:</span>
                  <span className={`font-bold ${isTitleWidthOptimal ? 'text-emerald-400' : 'text-amber-400'}`}>
                    ~{Math.round(metaTitlePixelWidth)}px / 600px
                  </span>
                </div>
                <input
                  type="text"
                  value={activeBlog.metaTitle || ''}
                  onChange={(e) => updateActiveBlog('metaTitle', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-200 text-xs font-medium focus:outline-none focus:border-amber-500/50"
                />
                <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    style={{ width: `${Math.min(100, (metaTitlePixelWidth / 600) * 100)}%` }}
                    className={`h-full ${isTitleWidthOptimal ? 'bg-emerald-500' : 'bg-amber-500'}`}
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <label className="block text-slate-400 font-semibold">Focus Keywords</label>
                <input
                  type="text"
                  value={activeBlog.keywords || ''}
                  onChange={(e) => updateActiveBlog('keywords', e.target.value)}
                  placeholder="e.g. uae golden visa, property visa"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-200 text-xs focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="text-slate-400">Meta Description:</span>
                  <span className={`font-bold ${isDescLengthOptimal ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {(activeBlog.metaDesc || '').length} / 160 chars
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={activeBlog.metaDesc || ''}
                  onChange={(e) => updateActiveBlog('metaDesc', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 text-xs focus:outline-none focus:border-amber-500/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase text-slate-400 flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-amber-400" /> OpenGraph Social Preview
                </h3>

                <div className="bg-slate-900 border border-slate-800/80 rounded-xl overflow-hidden shadow-md">
                  <div className="h-28 bg-gradient-to-tr from-amber-500/20 to-slate-950 flex items-center justify-center font-bold text-white text-xs p-4 text-center">
                    {activeBlog.title}
                  </div>
                  <div className="p-3.5 space-y-1">
                    <div className="text-[10px] font-mono text-slate-500 uppercase">familyvisa.ae • 2 min read</div>
                    <div className="font-bold text-white text-xs line-clamp-1">{activeBlog.metaTitle}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-2">{activeBlog.metaDesc}</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase text-slate-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" /> JSON-LD Structured Data
                </h3>
                <pre className="bg-slate-900 p-3.5 rounded-xl text-[10px] font-mono text-slate-300 overflow-x-auto max-h-40 border border-slate-800">
                  {generatedJsonLd}
                </pre>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
