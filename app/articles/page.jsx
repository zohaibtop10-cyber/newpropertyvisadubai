'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Mock Articles Data
const MOCK_ARTICLES = [
  {
    id: '1',
    slug: 'uae-family-visa-requirements-2026',
    title: 'Complete 2026 Guide to Sponsoring Your Family in Dubai & UAE',
    excerpt: 'Detailed breakdown of minimum salary thresholds, Ejari tenancy rules, mandatory medical fitness screenings, and step-by-step document attestation.',
    category: 'Family Visa',
    date: 'Sep 28, 2026',
    readTime: '6 min read',
    featuredImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '2',
    slug: 'uae-10-year-golden-visa-real-estate',
    title: 'How to Qualify for the 10-Year UAE Golden Visa via Property Investment',
    excerpt: 'Understand the AED 2 Million real estate threshold, mortgaged property eligibility, off-plan investment rules, and long-term residency benefits for families.',
    category: 'Golden Visa',
    date: 'Sep 24, 2026',
    readTime: '8 min read',
    featuredImage: 'https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '3',
    slug: 'gdrfa-icp-medical-fitness-center-dubai',
    title: 'GDRFA vs ICP: Essential Medical Test & Emirates ID Processing Rules',
    excerpt: 'Everything you need to know about typing centers, VIP medical fitness speed-tracking, biometrics appointment scheduling, and approval timelines.',
    category: 'Corporate',
    date: 'Sep 19, 2026',
    readTime: '5 min read',
    featuredImage: 'https://images.unsplash.com/photo-1582560469781-1965b9af903d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '4',
    slug: 'degree-attestation-mofa-uae-residency',
    title: 'MOFA Degree Attestation Guide for UAE Residency & High-Salary Visas',
    excerpt: 'Step-by-step verification of educational certificates through home nation embassies and the Ministry of Foreign Affairs in the UAE.',
    category: 'Family Visa',
    date: 'Sep 12, 2026',
    readTime: '7 min read',
    featuredImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=800&auto=format&fit=crop'
  }
];

const CATEGORIES = ['All', 'Family Visa', 'Golden Visa', 'Corporate'];

export default function ArticlesIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = MOCK_ARTICLES.filter((article) => {
    const matchesCategory =
      selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-[#050505] min-h-screen text-slate-300 pt-24 pb-24 selection:bg-gold selection:text-black">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-mono font-bold uppercase tracking-widest mb-4">
          Knowledge Base
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight font-display mb-4">
          GDRFA & ICP Knowledge Base
        </h1>

        <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed mb-8">
          Clear, up-to-date guidance on UAE residency rules and visa updates.
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative mb-8">
          <input
            type="text"
            placeholder="Search guides, regulations, or visa types..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-5 pr-10 py-3.5 bg-surface/5 border border-white/10 rounded-2xl text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-gold transition-colors"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer backdrop-blur-md ${
                  isActive
                    ? 'bg-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.4)] font-extrabold'
                    : 'bg-surface/5 border border-white/10 text-slate-300 hover:border-gold/40 hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Article Grid */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="group bg-brand-surfaceLight backdrop-blur-xl border border-white/10 hover:border-gold/40 transition-all duration-300 rounded-2xl overflow-hidden flex flex-col justify-between hover:-translate-y-1 shadow-xl hover:shadow-[0_0_25px_rgba(212,175,55,0.15)]"
            >
              <div>
                {/* Cover Image Placeholder */}
                <div className="w-full aspect-[16/10] relative overflow-hidden bg-surface">
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-3">
                  {/* Gold Tinted Date Badge */}
                  <div className="inline-block bg-gold/10 text-gold border border-gold/30 px-3 py-0.5 rounded-full text-xs font-mono font-bold">
                    {article.date}
                  </div>

                  {/* Bold White H3 Title */}
                  <h3 className="font-bold text-xl text-white group-hover:text-gold transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h3>

                  {/* 2-line Excerpt */}
                  <p className="text-text-muted text-sm leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="p-6 pt-0">
                <Link
                  href={`/articles/${article.slug}`}
                  className="text-gold font-bold text-sm inline-flex items-center gap-1 group-hover:underline"
                >
                  Read Full Guide &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16 bg-surface/5 rounded-2xl border border-white/10">
            <p className="text-text-muted">No articles found matching your filters.</p>
          </div>
        )}
      </section>
    </div>
  );
}
