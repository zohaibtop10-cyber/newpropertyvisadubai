import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ChevronRight,
  Calculator,
  Search
} from 'lucide-react';
import { blogPostsData, blogCategories } from '../data/cmsData';

export default function BlogSystem({
  activePostId,
  onNavigatePost,
  onBackToIndex,
  onOpenCalculator
}) {
  const [selectedCategory, setSelectedCategory] = useState('All Articles');
  const [searchQuery, setSearchQuery] = useState('');

  // If activePostId is set, render Single Post Detail Template!
  const activePost = blogPostsData.find((p) => p.id === activePostId);

  if (activePost) {
    return (
      <article className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-20 space-y-10">
        
        {/* Back Button */}
        <button
          onClick={onBackToIndex}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#E01E37] hover:underline cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dependant Residency Guides</span>
        </button>

        {/* Article Header */}
        <header className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-semibold bg-[#E01E37] text-white px-3 py-1 rounded-full">
              {activePost.category}
            </span>
            <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {activePost.readTime}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {activePost.title}
          </h1>

          <div className="flex items-center justify-between pt-2 border-y border-slate-200 dark:border-white/10 py-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#E01E37]" />
              <span className="text-slate-900 dark:text-slate-200 font-semibold">{activePost.author}</span>
              <span>({activePost.authorRole})</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{activePost.date}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden shadow-2xl h-[380px] relative border border-slate-200 dark:border-white/10">
          <img
            src={activePost.featuredImage}
            alt={activePost.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Excerpt Banner */}
        <div className="p-6 rounded-2xl bg-slate-100 dark:bg-white/[0.03] border-l-4 border-[#E01E37] text-slate-700 dark:text-slate-300 text-base leading-relaxed italic">
          "{activePost.excerpt}"
        </div>

        {/* Article Body Sections */}
        <div className="space-y-8 text-slate-800 dark:text-slate-200 leading-relaxed text-base">
          {activePost.sections.map((section, idx) => (
            <section key={idx} className="space-y-3">
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                {section.heading}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        {/* Embedded Calculator Callout Box */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-black text-white border border-slate-800 space-y-4 shadow-xl">
          <div className="text-xs font-mono text-[#E01E37] font-semibold uppercase">
            CALCULATE YOUR SPECIFIC FEE
          </div>
          <h3 className="font-display font-bold text-2xl">
            Need an official GDRFA statutory quote for your family?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Use our global pop-up calculator engine to break down exact government pass-through tariffs vs advisory retainers.
          </p>
          <button
            onClick={() => onOpenCalculator('spouse')}
            className="inline-flex items-center gap-2 bg-[#E01E37] hover:bg-[#b50e2f] text-white px-6 py-3 rounded-xl font-semibold text-xs transition-all cursor-pointer shadow-md shadow-[#E01E37]/30"
          >
            <Calculator className="w-4 h-4" />
            <span>Launch Fee Calculator</span>
          </button>
        </div>

      </article>
    );
  }

  // Otherwise, render Blog Index Template!
  const filteredPosts = blogPostsData.filter((post) => {
    const matchesCategory =
      selectedCategory === 'All Articles' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-24 space-y-12">
      
      {/* Blog Index Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#E01E37]/10 text-[#E01E37] border border-[#E01E37]/20">
          <BookOpen className="w-3.5 h-3.5" />
          <span>GDRFA & ICP KNOWLEDGE BASE</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          UAE Dependant Residency Guides
        </h1>

        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
          Authoritative rules, salary threshold breakdowns, and legal attestation guides curated by senior family residency advisors.
        </p>

        {/* Search Input */}
        <div className="max-w-md mx-auto relative pt-2">
          <input
            type="text"
            placeholder="Search guides (e.g. Spouse salary, Golden Visa, Attestation)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 rounded-2xl pl-10 pr-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#E01E37] shadow-sm"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-5" />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {blogCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#E01E37] text-white shadow-md'
                : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-[#E01E37]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            onClick={() => onNavigatePost(post.id)}
            className="rounded-3xl border overflow-hidden bg-white dark:bg-[#141414] border-slate-200 dark:border-white/10 hover:border-[#E01E37]/50 transition-all cursor-pointer group flex flex-col justify-between shadow-sm hover:shadow-xl"
          >
            <div>
              <div className="h-52 overflow-hidden relative">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 text-[10px] font-mono font-semibold bg-black/75 text-white px-3 py-1 rounded-full backdrop-blur-md">
                  {post.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white group-hover:text-[#E01E37] transition-colors leading-snug">
                  {post.title}
                </h2>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between text-xs font-semibold text-[#E01E37]">
              <span>Read Full Article</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}
