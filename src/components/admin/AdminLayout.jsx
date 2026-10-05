import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Star, Settings, LogOut, Globe, Move,
  MousePointerClick, LayoutDashboard, Briefcase, Info,
  Layers, Layout, ChevronDown, Zap, PenTool, BarChart2,
  HelpCircle, Megaphone, AlignLeft, BookOpen, Award, Workflow,
  Shield, Link2, ExternalLink, Hash, Menu, X, Bell, Search, MapPin
} from 'lucide-react';

// ── Nav Structure with groups ────────────────────────────────────
const NAV_GROUPS = [
  {
    groupLabel: 'Overview',
    items: [
      { id: 'homepage', label: 'Dashboard', icon: LayoutDashboard, description: 'Quick stats & overview' },
    ]
  },
  {
    groupLabel: 'Content',
    items: [
      { id: 'pagesEditor', label: 'Hero Headings', icon: PenTool, description: 'Page titles & subtitles' },
      { id: 'blog', label: 'Articles & Blog', icon: BookOpen, description: 'Posts, SEO & editorial' },
      { id: 'testimonials', label: 'Reviews', icon: Star, description: 'Client reviews & ratings' },
    ]
  },
  {
    groupLabel: 'Homepage Sections',
    items: [
      { id: 'achievements', label: 'Achievements', icon: Award, description: 'Trust badges & awards' },
      { id: 'problems', label: 'Problems We Solve', icon: Zap, description: 'Pain points section' },
      { id: 'whyus', label: 'Why Choose Us', icon: Shield, description: 'Key differentiators' },
      { id: 'process', label: 'Process Steps', icon: Workflow, description: '4-step SLA workflow' },
      { id: 'faqs', label: 'FAQs', icon: HelpCircle, description: 'Frequently asked questions' },
      { id: 'cta', label: 'CTA Banner', icon: Megaphone, description: 'Final call to action' },
    ]
  },
  {
    groupLabel: 'Pages & Pricing',
    items: [
      { id: 'aboutPage', label: 'About Page', icon: Info, description: 'CEO, license, pillars, reviews' },
      { id: 'services', label: 'Service Pages', icon: Briefcase, description: 'Fees, requirements & process' },
      { id: 'tariffs', label: 'Pricing & Charges', icon: Zap, description: 'Gov tariffs & retainer margins' },
      { id: 'calculator', label: 'Calculator Popup', icon: BarChart2, description: 'Tariffs, fees & surcharges' },
      { id: 'locations', label: 'Government Hubs', icon: MapPin, description: 'GDRFA, ICP & DHA centres' },
      { id: 'pages', label: 'Inner Pages', icon: FileText, description: 'Contact, checklist, terms' },
    ]
  },
  {
    groupLabel: 'Design & Layout',
    items: [
      { id: 'megaMenu', label: 'Services Mega-Menu', icon: Menu, description: 'Header dropdown cards & links' },
      { id: 'blockBuilder', label: 'Block Builder', icon: Layers, description: 'Drag-and-drop sections' },
      { id: 'reorder', label: 'Navbar & Sections', icon: Move, description: 'Navigation & section order' },
      { id: 'buttons', label: 'Buttons', icon: MousePointerClick, description: 'Global action buttons' },
    ]
  },
  {
    groupLabel: 'Global & System',
    items: [
      { id: 'topbar', label: 'Top Bar', icon: AlignLeft, description: 'Announcement & ticker' },
      { id: 'footer', label: 'Footer', icon: Layout, description: 'Brand, links & disclaimer' },
      { id: 'settings', label: 'Settings', icon: Settings, description: 'Contact, socials & theme' },
    ]
  },
];

const TITLE_MAP = {
  blockBuilder: 'Dynamic Block Builder',
  pagesEditor: 'Hero Section Headings',
  homepage: 'Dashboard',
  services: 'Service Pages Editor',
  tariffs: 'Pricing & Charges Manager',
  calculator: 'Calculator Popup & Tariffs Editor',
  locations: 'Government Hubs & Centres Editor',
  megaMenu: 'Services Dropdown Mega-Menu Editor',
  aboutPage: 'About Page CMS',
  topbar: 'Top Bar & Ticker Editor',
  footer: 'Footer CMS Editor',
  blog: 'Blog & Editorial Suite',
  settings: 'Global Settings',
  reorder: 'Navbar & Section Manager',
  pages: 'Inner Pages CMS',
  testimonials: 'Reviews Manager',
  achievements: 'Achievements & Awards',
  problems: 'Problems We Solve',
  whyus: 'Why Choose Us',
  process: 'Process Steps',
  faqs: 'FAQs Editor',
  cta: 'CTA Banner Editor',
  buttons: 'Global Action Buttons',
};

export default function AdminLayout({ activeModule, setActiveModule, onExitAdmin, currentUser, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [collapsedGroups, setCollapsedGroups] = useState({});

  const toggleGroup = (label) =>
    setCollapsedGroups(prev => ({ ...prev, [label]: !prev[label] }));

  const activeTitle = TITLE_MAP[activeModule] || 'CMS Dashboard';

  return (
    <div className="dark min-h-screen bg-[#07080a] text-slate-200 flex font-sans relative overflow-hidden w-full">

      {/* ── Ambient glows ──────────────────────────────────── */}
      <div className="fixed top-[-10%] left-[15%] w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-[#996515]/4 rounded-full blur-[160px] pointer-events-none" />

      {/* ── SIDEBAR ───────────────────────────────────────── */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-[270px] shrink-0 bg-[#0b0c10] border-r border-white/6 flex flex-col z-30 relative"
          >
            {/* ── Brand header ─────────────────────────────── */}
            <div className="px-5 py-4 border-b border-white/6 flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[#D4AF37] via-[#8C5E00] to-[#D4AF37] p-[1.5px] shadow-[0_4px_16px_rgba(212,175,55,0.3)] flex-shrink-0">
                <div className="w-full h-full bg-[#0b0c10] rounded-[9px] flex items-center justify-center">
                  <Globe className="w-4 h-4 text-[#D4AF37]" />
                </div>
              </div>
              <div className="min-w-0">
                <div className="text-sm font-extrabold text-white tracking-tight leading-none truncate">Property Visa</div>
                <div className="text-[10px] text-[#D4AF37]/70 font-mono mt-0.5 uppercase tracking-widest">CMS Manager</div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="ml-auto p-1.5 rounded-[8px] text-slate-600 hover:text-slate-300 hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* ── Nav ──────────────────────────────────────── */}
            <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5 scrollbar-none">
              {NAV_GROUPS.map((group) => {
                const isCollapsed = collapsedGroups[group.groupLabel];
                return (
                  <div key={group.groupLabel} className="mb-1">
                    {/* Group label */}
                    <button
                      onClick={() => toggleGroup(group.groupLabel)}
                      className="w-full flex items-center justify-between px-2 py-1.5 mb-0.5 cursor-pointer group"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 group-hover:text-slate-400 transition-colors">
                        {group.groupLabel}
                      </span>
                      <ChevronDown className={`w-3 h-3 text-slate-700 group-hover:text-slate-500 transition-all ${isCollapsed ? '-rotate-90' : 'rotate-0'}`} />
                    </button>

                    {/* Items */}
                    <AnimatePresence initial={false}>
                      {!isCollapsed && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden space-y-0.5"
                        >
                          {group.items.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeModule === item.id || (activeModule === 'cms' && item.id === 'homepage');
                            return (
                              <motion.button
                                key={item.id}
                                onClick={() => setActiveModule(item.id)}
                                whileHover={{ x: 2 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-left transition-all cursor-pointer group relative ${
                                  isActive
                                    ? 'bg-[#D4AF37]/12 border border-[#D4AF37]/25 text-[#D4AF37]'
                                    : 'border border-transparent text-slate-500 hover:text-slate-200 hover:bg-white/4'
                                }`}
                              >
                                {isActive && (
                                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[60%] bg-[#D4AF37] rounded-full" />
                                )}
                                <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-[#D4AF37]' : 'text-slate-600 group-hover:text-slate-300'}`} />
                                <div className="min-w-0">
                                  <div className={`text-xs font-semibold leading-tight truncate ${isActive ? 'text-[#D4AF37]' : ''}`}>
                                    {item.label}
                                  </div>
                                  <div className={`text-[10px] mt-0.5 truncate ${isActive ? 'text-[#D4AF37]/60' : 'text-slate-700 group-hover:text-slate-500'}`}>
                                    {item.description}
                                  </div>
                                </div>
                              </motion.button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            {/* ── User footer ──────────────────────────────── */}
            <div className="px-3 py-3 border-t border-white/6 bg-[#08090c] space-y-2 shrink-0">
              {currentUser?.email && (
                <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] bg-white/4 border border-white/6">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8C5E00] flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-black text-black">{currentUser.email[0].toUpperCase()}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[9px] text-slate-600 uppercase tracking-wider font-mono">Signed in as</div>
                    <div className="text-xs text-slate-300 font-semibold truncate">{currentUser.email}</div>
                  </div>
                </div>
              )}
              <button
                onClick={onExitAdmin}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-[10px] border border-white/8 bg-white/3 hover:bg-red-500/10 hover:border-red-500/20 text-slate-500 hover:text-red-400 text-xs font-semibold transition-all cursor-pointer group"
              >
                <LogOut className="w-3.5 h-3.5 group-hover:text-red-400 transition-colors" />
                <span>Sign Out & Exit CMS</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── MAIN CONTENT AREA ─────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">

        {/* ── Top header bar ─────────────────────────────── */}
        <header className="h-14 border-b border-white/6 bg-[#0b0c10]/90 backdrop-blur-md px-5 flex items-center gap-4 sticky top-0 z-20 shrink-0">

          {/* Sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-[10px] text-slate-500 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Breadcrumb / Title */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-slate-600 text-xs font-mono hidden sm:block">CMS</span>
            <span className="text-slate-700 text-xs hidden sm:block">/</span>
            <h1 className="font-bold text-sm text-white truncate">{activeTitle}</h1>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Right utilities */}
          <div className="flex items-center gap-2">
            {/* Live badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Live</span>
            </div>

            {/* Firebase badge */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D4AF37]/8 border border-[#D4AF37]/15">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span className="text-[10px] font-bold text-[#D4AF37]/70 uppercase tracking-wider">Firebase</span>
            </div>

            {/* Exit button */}
            <button
              onClick={onExitAdmin}
              className="flex items-center gap-1.5 px-3 py-2 rounded-[10px] border border-white/8 bg-white/3 hover:bg-white/8 text-slate-400 hover:text-white text-xs font-semibold transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:block">View Site</span>
            </button>
          </div>
        </header>

        {/* ── Page content ──────────────────────────────── */}
        <main className="flex-1 overflow-y-auto bg-[#07080a]">
          {/* Content wrapper with consistent padding */}
          <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}
