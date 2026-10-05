import React from 'react';
import { motion } from 'framer-motion';
import {
  Users, FileText, Star, Settings, ArrowRight, TrendingUp,
  LayoutDashboard, Briefcase, Info, AlignLeft, Layout,
  BookOpen, Shield, Zap, Award, HelpCircle, MousePointerClick,
  Move, Layers, Megaphone, Workflow, Globe, CheckCircle2,
  ExternalLink, Edit3
} from 'lucide-react';

const fadeUp = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } };

const QUICK_LINKS = [
  { id: 'homepage', label: 'Homepage Hero', icon: LayoutDashboard, color: 'from-[#D4AF37]/20 to-[#8C5E00]/10', border: 'border-[#D4AF37]/25', text: 'text-[#D4AF37]', desc: 'Edit main headline & badges' },
  { id: 'blog', label: 'Articles', icon: BookOpen, color: 'from-sky-500/15 to-sky-500/5', border: 'border-sky-500/20', text: 'text-sky-400', desc: 'Create & manage blog posts' },
  { id: 'testimonials', label: 'Reviews', icon: Star, color: 'from-amber-500/15 to-amber-500/5', border: 'border-amber-500/20', text: 'text-amber-400', desc: 'Add client testimonials' },
  { id: 'services', label: 'Services', icon: Briefcase, color: 'from-purple-500/15 to-purple-500/5', border: 'border-purple-500/20', text: 'text-purple-400', desc: 'Edit service page content' },
  { id: 'settings', label: 'Settings', icon: Settings, color: 'from-emerald-500/15 to-emerald-500/5', border: 'border-emerald-500/20', text: 'text-emerald-400', desc: 'Contact, social & theme' },
  { id: 'footer', label: 'Footer', icon: Layout, color: 'from-rose-500/15 to-rose-500/5', border: 'border-rose-500/20', text: 'text-rose-400', desc: 'Brand, links & disclaimer' },
];

const SITE_STATS = [
  { label: 'CMS Modules', value: '18', icon: Layers, color: 'text-[#D4AF37]', bg: 'bg-[#D4AF37]/10' },
  { label: 'Pages Managed', value: '12+', icon: FileText, color: 'text-sky-400', bg: 'bg-sky-500/10' },
  { label: 'Firebase Synced', value: '100%', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { label: 'Live Edits', value: 'Real-Time', icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-500/10' },
];

export default function DashboardModule({ onNavigateModule }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* ── Welcome banner ────────────────────────────────── */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.4 }}
        className="relative rounded-[14px] overflow-hidden border border-[#D4AF37]/15 bg-gradient-to-br from-[#D4AF37]/8 via-[#8C5E00]/4 to-transparent p-7"
      >
        {/* Decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/8 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[#D4AF37]/70 text-xs font-mono uppercase tracking-widest mb-1">{greeting} 👋</p>
              <h2 className="font-bold text-2xl text-white leading-tight">Welcome to the CMS</h2>
              <p className="text-slate-400 text-sm mt-1.5 max-w-lg">
                Every element of your website is editable here. Changes sync to Firebase in real-time — no redeployment needed.
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Live & Connected</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Site stats ────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {SITE_STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              {...fadeUp}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-[#0d0f13] border border-white/6 rounded-[12px] p-5 flex items-center gap-4"
            >
              <div className={`${stat.bg} p-3 rounded-[10px] shrink-0`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <div className={`text-lg font-extrabold ${stat.color} leading-none`}>{stat.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Quick access grid ─────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-base text-white">Quick Access</h3>
          <span className="text-xs text-slate-600 font-mono">Most used editors</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {QUICK_LINKS.map((link, i) => {
            const Icon = link.icon;
            return (
              <motion.button
                key={link.id}
                {...fadeUp}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                onClick={() => onNavigateModule(link.id)}
                whileHover={{ y: -2, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.98 }}
                className={`text-left p-5 rounded-[12px] border ${link.border} bg-gradient-to-br ${link.color} hover:bg-white/3 transition-all cursor-pointer group relative overflow-hidden`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className={`p-2.5 rounded-[10px] bg-white/5 ${link.text}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <ArrowRight className={`w-4 h-4 ${link.text} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all`} />
                </div>
                <div className="mt-4">
                  <div className={`text-sm font-bold ${link.text} leading-tight`}>{link.label}</div>
                  <div className="text-xs text-slate-500 mt-1">{link.desc}</div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ── Full modules list ─────────────────────────────── */}
      <motion.div {...fadeUp} transition={{ duration: 0.4, delay: 0.5 }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-base text-white">All CMS Modules</h3>
          <span className="text-xs text-slate-600 font-mono">18 modules total</span>
        </div>
        <div className="bg-[#0d0f13] border border-white/6 rounded-[14px] overflow-hidden">
          {[
            { id: 'homepage', label: 'Homepage Hero', group: 'Homepage' },
            { id: 'achievements', label: 'Achievements & Awards', group: 'Homepage' },
            { id: 'problems', label: 'Problems We Solve', group: 'Homepage' },
            { id: 'whyus', label: 'Why Choose Us', group: 'Homepage' },
            { id: 'process', label: 'Process Steps', group: 'Homepage' },
            { id: 'faqs', label: 'FAQs', group: 'Homepage' },
            { id: 'cta', label: 'CTA Banner', group: 'Homepage' },
            { id: 'aboutPage', label: 'About Page', group: 'Pages' },
            { id: 'services', label: 'Service Pages', group: 'Pages' },
            { id: 'pages', label: 'Inner Pages', group: 'Pages' },
            { id: 'blog', label: 'Blog & Articles', group: 'Content' },
            { id: 'testimonials', label: 'Reviews', group: 'Content' },
            { id: 'blockBuilder', label: 'Block Builder', group: 'Design' },
            { id: 'reorder', label: 'Navbar & Sections', group: 'Design' },
            { id: 'buttons', label: 'Buttons', group: 'Design' },
            { id: 'topbar', label: 'Top Bar', group: 'Global' },
            { id: 'footer', label: 'Footer', group: 'Global' },
            { id: 'settings', label: 'Settings', group: 'Global' },
          ].map((mod, i) => (
            <button
              key={mod.id}
              onClick={() => onNavigateModule(mod.id)}
              className={`w-full flex items-center justify-between px-5 py-3.5 hover:bg-white/3 transition-colors cursor-pointer group text-left ${i < 17 ? 'border-b border-white/4' : ''}`}
            >
              <div className="flex items-center gap-3">
                <Edit3 className="w-3.5 h-3.5 text-slate-700 group-hover:text-[#D4AF37] transition-colors" />
                <span className="text-sm text-slate-400 group-hover:text-white transition-colors font-medium">{mod.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-slate-700 uppercase">{mod.group}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-700 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all" />
              </div>
            </button>
          ))}
        </div>
      </motion.div>

    </div>
  );
}
