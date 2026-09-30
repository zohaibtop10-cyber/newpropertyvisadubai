import React from 'react';
import {
  Layout, FileText, Star, Settings, LogOut, Globe, CheckCircle2, Move, MousePointerClick, LayoutDashboard, Briefcase, Activity, Info, MapPin
} from 'lucide-react';

export default function AdminLayout({
  activeModule,
  setActiveModule,
  onExitAdmin,
  currentUser,
  children
}) {
  // CMS Sidebar Menu Items (Every Section & Every Page covered)
  const cmsNavItems = [
    { id: 'pagesEditor', label: 'Hero Section Headings', icon: Globe, description: 'Universal Auto-Generating CMS' },
    { id: 'homepage', label: 'Dashboard', icon: LayoutDashboard, description: 'Homepage copy & main settings' },
    { id: 'services', label: 'Services', icon: Briefcase, description: 'Fees, requirements & process for services' },
    { id: 'aboutPage', label: 'About Page CMS', icon: Info, description: 'Hero, CEO, License, Pillars, Reviews' },
    { id: 'topbar', label: 'Top Bar Header CMS', icon: Layout, description: 'Countdown & Contact Info' },
    { id: 'blog', label: 'Articles', icon: FileText, description: 'Articles & Editorial SEO' },
    { id: 'settings', label: 'Settings & Locations', icon: Settings, description: 'Phone, Email, Address, Socials & Locations' },
    { id: 'reorder', label: 'Navbar Manager', icon: Move, description: 'Reorder sections & Nav links' },
    { id: 'pages', label: 'Inner Pages CMS', icon: Globe, description: 'About, Contact, Checklist, Terms, Property' },
    { id: 'testimonials', label: 'Reviews CMS', icon: Star, description: 'Client Reviews & ratings' },
    { id: 'achievements', label: 'Achievements CMS', icon: Layout, description: 'Trust badges and awards' },
    { id: 'problems', label: 'Problems We Solve CMS', icon: Layout, description: 'Why DIY fails section' },
    { id: 'whyus', label: 'Why Families Choose Us CMS', icon: Layout, description: 'The EmiratesPrime advantage' },
    { id: 'process', label: 'Process CMS', icon: Layout, description: 'Step-by-step SLA workflow' },
    { id: 'faqs', label: 'FAQs CMS', icon: Layout, description: 'Frequently asked questions' },
    { id: 'cta', label: 'CTA CMS', icon: Layout, description: 'Final call to action banner' },
    { id: 'buttons', label: 'Buttons CMS', icon: MousePointerClick, description: 'Global action buttons' }
  ];

  const getActiveTitle = () => {
    switch (activeModule) {
      case 'reorder': return 'Navbar, Header & Section Manager';
      case 'services': return 'Service Pages Editor';
      case 'pages': return 'Inner Pages CMS Editor (About, Contact, etc.)';
      case 'testimonials': return 'Testimonials & Reviews Manager';
      case 'blog': return 'Blog & Editorial SEO Suite';
      case 'settings': return 'Global Website Settings & Locations';
      case 'aboutPage': return 'About Page CMS Editor';
      case 'topbar': return 'Top Bar Header CMS';
      case 'buttons': return 'Global Buttons Manager';
      case 'achievements': return 'Achievements & Awards CMS';
      case 'problems': return 'Problems We Solve CMS';
      case 'whyus': return 'Why Families Choose Us CMS';
      case 'process': return 'Process Steps CMS';
      case 'faqs': return 'FAQs Accordion CMS';
      case 'cta': return 'Final CTA Banner CMS';
      case 'pagesEditor': return 'Universal Firebase Pages Editor';
      case 'homepage':
      default:
        return 'Homepage Content Editor';
    }
  };

  return (
    <div className="min-h-screen bg-[#121417] text-slate-100 font-sans flex relative overflow-x-hidden selection:bg-brand-primary selection:text-white">

      {/* Subtle Ambient Red Glow */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[140px] pointer-events-none" />

      {/* ------------------------------------------------------------------ */}
      {/* CMS LEFT SIDEBAR NAVIGATION                                        */}
      {/* ------------------------------------------------------------------ */}
      <aside className="w-72 bg-[#0a0a0a] border-r border-white/10 flex flex-col shrink-0 z-20">

        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] via-[#996515] to-[#D4AF37] p-0.5 shadow-lg shadow-[#D4AF37]/25 flex items-center justify-center">
            <div className="w-full h-full bg-[#121417] rounded-[14px] flex items-center justify-center">
              <Globe className="w-5 h-5 text-brand-primary" />
            </div>
          </div>
          <div>
            <div className="font-display font-extrabold text-base tracking-tight text-white leading-none">
              Property Visa
            </div>
            <div className="text-xs text-brand-primary font-semibold mt-1">
              Website CMS Manager
            </div>
          </div>
        </div>

        {/* 4 CMS Sidebar Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-3 mb-3">
            WEBSITE SECTIONS
          </div>
          {cmsNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id || (activeModule === 'cms' && item.id === 'homepage');
            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all cursor-pointer group ${isActive
                  ? 'bg-brand-gold/10 text-brand-gold shadow-lg shadow-brand-gold/25 font-bold border border-brand-gold/20'
                  : 'text-slate-400 hover:text-white hover:bg-surface/5'
                  }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                <div>
                  <div className="text-sm font-bold leading-tight">{item.label}</div>
                  <div className={`text-[11px] mt-0.5 ${isActive ? 'text-white/80' : 'text-content-muted'}`}>
                    {item.description}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>

        {/* User Footer & Exit Button */}
        <div className="p-4 border-t border-slate-800/80 space-y-3 bg-brand-darkBg/40">
          {/* Show current user email */}
          {currentUser?.email && (
            <div className="px-3 py-2 rounded-lg bg-black/40 border border-slate-800/50">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-0.5">Signed in as</div>
              <div className="text-xs text-slate-300 font-semibold truncate">{currentUser.email}</div>
            </div>
          )}
          <button
            onClick={onExitAdmin}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-800 bg-brand-surfaceLight hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-brand-primary" />
            <span>Sign Out & Exit</span>
          </button>
        </div>

      </aside>

      {/* ------------------------------------------------------------------ */}
      {/* MAIN CONTENT AREA                                                  */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">

        {/* Top Header */}
        <header className="h-16 border-b border-slate-800/80 bg-brand-surfaceLight/90 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-20">
          <h1 className="font-display font-extrabold text-xl text-white">
            {getActiveTitle()}
          </h1>


        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>

      </div>

    </div>
  );
}
