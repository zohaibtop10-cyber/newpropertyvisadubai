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
  FileText,
  Target,
  Info,
  Check,
  X,
  Calculator,
  ChevronDown,
  AlertTriangle,
  Sparkles,
  Award,
  Zap,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { articlesData } from '../data/articlesData';
import { blogPostsData, siteConfig } from '../data/cmsData';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';
import ArticleLayout from './ArticleLayout';

// ============================================================================
// MAIN BLOG SYSTEM COMPONENT (Articles Index & Single Article Router)
// ============================================================================

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

  // Demo showcase article
  const demoScamArticle = {
    id: 'freelance-visa-scam-dubai',
    slug: 'freelance-visa-scam-dubai',
    title: "The 'Freelance Visa' Scam in Dubai: What You're Really Being Sold (2026)",
    excerpt: "There is no official UAE 'freelance visa'. What agencies sell under that name is an employment visa from a shell company. How the scam works — and the legal way out.",
    category: 'UAE Family Visa',
    date: 'September 2026',
    author: 'Razeeb Abdulla',
    authorRole: 'CEO & Founder',
    readTime: '7 min',
    featuredImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
    isShowcase: true
  };

  const safeBlogPostsData = Array.isArray(blogPostsData) ? blogPostsData : [];
  const safeFirebasePosts = Array.isArray(firebasePosts) ? firebasePosts : [];
  let mergedPosts = [demoScamArticle, ...safeFirebasePosts, ...articlesData, ...safeBlogPostsData];
  
  const uniquePosts = [];
  const ids = new Set();
  mergedPosts.forEach(post => {
    if (!post) return;
    if (post.status && post.status !== 'PUBLISHED' && post.id !== 'freelance-visa-scam-dubai') return;
    const id = post.slug || post.id;
    if (id && !ids.has(id)) {
      uniquePosts.push(post);
      ids.add(id);
    }
  });

  const normalizedActiveId = (activePostId || '').trim().toLowerCase();
  let activePost = null;
  if (normalizedActiveId) {
    activePost = uniquePosts.find((p) => {
      const pSlug = (p.slug || '').toLowerCase();
      const pId = (p.id || '').toLowerCase();
      return pSlug === normalizedActiveId || pId === normalizedActiveId;
    });
    // Fallback if specific slug not found but an article was requested
    if (!activePost && uniquePosts.length > 0) {
      activePost = uniquePosts[0];
    }
  }

  // If a specific article post is active, render ArticleLayout!
  if (activePost) {
    const related = uniquePosts.filter(p => (p.slug !== activePost.slug && p.id !== activePost.id));
    return (
      <ArticleLayout
        article={activePost}
        relatedArticles={related}
        onBack={onBackToIndex}
        onNavigateArticle={onNavigatePost}
        onOpenCalculator={onOpenCalculator}
      />
    );
  }

  // Articles Index Category List
  const categoriesList = ['All', 'UAE Family Visa', 'Golden Visa', 'Corporate', 'Attestation', 'General Updates'];

  const filteredPosts = uniquePosts.filter((post) => {
    if (!post) return false;
    const title = post.title || post.name || '';
    const excerpt = post.excerpt || post.shortDesc || '';
    const category = post.category || '';

    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || 
      category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const featuredHeroPost = uniquePosts[0];
  const gridPosts = filteredPosts.slice(searchQuery || selectedCategory !== 'All' ? 0 : 1);

  return (
    <div className="w-full bg-[#050505] min-h-screen text-slate-200 pt-28 pb-24 selection:bg-[#D4AF37] selection:text-black font-sans">
      
      {/* Hero Banner Header Section */}
      <div className="relative w-full px-5 sm:px-8 lg:px-12 mb-16 overflow-hidden">
        
        {/* Ambient Radial Glow Lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.12)_0%,transparent_70%)] opacity-70 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[10px] bg-[#8C5E00]/10 dark:bg-[#8C5E00]/20 border border-[#8C5E00]/30 dark:border-[#D4AF37]/30 text-[#8C5E00] dark:text-[#FFE58F] text-xs font-mono font-bold uppercase tracking-widest shadow-md">
            <BookOpen className="w-4 h-4 text-[#8C5E00] dark:text-[#D4AF37]" /> GDRFA & ICP Official Knowledge Base
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.05] font-sans">
            Dubai & UAE{' '}
            <span className="text-dark-gold-shine">Residency Guides</span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-3xl mx-auto font-sans font-medium leading-relaxed">
            Verified, up-to-date guidance on UAE residency rules, Golden Visa eligibility, salary thresholds, Ejari tenancy registration, and document attestation — prepared by senior immigration advisors.
          </p>

          {/* Search Input Bar */}
          <div className="max-w-2xl mx-auto relative pt-4">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search immigration guides (e.g. Golden Visa, Ejari, Medical)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-4 bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[10px] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#D4AF37] transition-all shadow-xl font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 dark:hover:text-white text-base cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            {categoriesList.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-[10px] text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-dark-gold-gloss text-slate-950 shadow-[0_0_20px_rgba(212,175,55,0.4)] font-black'
                      : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-[#D4AF37]/40 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* Main Articles Container */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
        
        {/* Featured Hero Post Banner (if no active filter) */}
        {!searchQuery && selectedCategory === 'All' && featuredHeroPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => onNavigatePost(featuredHeroPost.slug || featuredHeroPost.id)}
            className="group bg-white dark:bg-gradient-to-br dark:from-[#12141a] dark:via-[#0c0c0c] dark:to-[#050505] border border-slate-200 dark:border-white/15 hover:border-[#D4AF37]/60 rounded-[10px] overflow-hidden shadow-xl hover:shadow-[0_25px_60px_-15px_rgba(212,175,55,0.25)] transition-all cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8"
          >
            <div className="lg:col-span-7 relative aspect-[16/9] rounded-[10px] overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10">
              <img
                src={featuredHeroPost.featuredImage || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop'}
                alt={featuredHeroPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-[10px] bg-black/80 backdrop-blur-md text-[#FFE58F] border border-[#D4AF37]/40 text-xs font-mono font-bold uppercase tracking-wider">
                  Featured Guide
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[10px] bg-[#8C5E00]/10 dark:bg-[#8C5E00]/20 border border-[#8C5E00]/30 dark:border-[#D4AF37]/30 text-[#8C5E00] dark:text-[#FFE58F] text-xs font-mono font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5 text-[#8C5E00] dark:text-[#D4AF37]" />
                {featuredHeroPost.category}
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white group-hover:text-dark-gold-shine transition-colors leading-tight font-sans tracking-tight">
                {featuredHeroPost.title}
              </h2>

              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-sans line-clamp-3">
                {featuredHeroPost.excerpt}
              </p>

              <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
                  <User className="w-3.5 h-3.5 text-[#8C5E00] dark:text-[#D4AF37]" />
                  <span>{featuredHeroPost.author}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>{featuredHeroPost.date}</span>
                  <span>•</span>
                  <span>{featuredHeroPost.readTime} read</span>
                </div>
              </div>

              <div className="pt-2 flex items-center text-[#8C5E00] dark:text-[#D4AF37] font-black text-xs font-mono uppercase tracking-wider group-hover:translate-x-1.5 transition-transform">
                Read Featured Investigation <ArrowUpRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </motion.div>
        )}

        {/* 3-Column Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {gridPosts.map((post, idx) => (
              <motion.div
                key={post.slug || post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => onNavigatePost(post.slug || post.id)}
                className="group bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 hover:border-[#D4AF37]/40 transition-all duration-300 rounded-[10px] overflow-hidden shadow-lg hover:shadow-[0_20px_40px_-10px_rgba(212,175,55,0.18)] hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer"
              >
                <div className="w-full aspect-[16/10] relative overflow-hidden bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-white/5">
                  <img
                    src={post.featuredImage || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600&auto=format&fit=crop'}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  {post.category && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="text-[10px] font-mono font-bold uppercase text-[#FFE58F] bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-[10px] border border-[#D4AF37]/30">
                        {post.category}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="inline-flex items-center gap-1.5 text-xs text-[#8C5E00] dark:text-[#D4AF37] font-mono font-bold">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.date}</span>
                    </div>

                    <h3 className="font-sans font-bold text-lg text-slate-900 dark:text-white group-hover:text-[#8C5E00] dark:group-hover:text-[#D4AF37] transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed line-clamp-3 font-sans font-medium">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[#8C5E00] dark:text-[#D4AF37] font-bold text-xs font-mono uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                    <span className="flex items-center gap-1">
                      Read Guide <ArrowUpRight className="w-3.5 h-3.5" />
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

        {/* Empty Search Fallback */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[10px]">
            <Search className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1 font-sans">No immigration guides found</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-sans">Try adjusting your search query or selected category filter.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-4 text-xs font-mono font-bold text-[#8C5E00] dark:text-[#D4AF37] uppercase tracking-wider underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
