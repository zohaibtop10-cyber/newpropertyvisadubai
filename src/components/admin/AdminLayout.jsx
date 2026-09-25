import React from 'react';
import {
  Layout, FileText, Star, Settings, LogOut, Globe, CheckCircle2, Move, MousePointerClick
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
    { id: 'homepage', label: 'Homepage CMS', icon: Layout, description: 'Hero copy & main settings' },
    { id: 'settings', label: 'Footer & Info CMS', icon: Settings, description: 'Phone, Email, Address, Social Media & Footer' },
    { id: 'marquee', label: 'Top Header Ticker CMS', icon: Globe, description: 'Manage top announcements ticker' },
    { id: 'reorder', label: 'Navbar CMS', icon: Move, description: 'Reorder sections & edit Navbar links' },
    { id: 'pages', label: 'Pages CMS', icon: Globe, description: 'Edit all inner pages: About, Contact, Checklist' },
    { id: 'services', label: 'Service Pages CMS', icon: FileText, description: 'Fees, requirements & FAQs for services' },
    { id: 'testimonials', label: 'Reviews CMS', icon: Star, description: 'Client Reviews & ratings' },
    { id: 'blog', label: 'Blog CMS', icon: FileText, description: 'Articles & Editorial SEO' },
    { id: 'pricing_home', label: 'Pricing CMS', icon: FileText, description: 'Retainer Packages & Pricing' },
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
      case 'marquee':
        return 'Top Header Ticker CMS';
      case 'reorder':
        return 'Homepage Section & Navbar Manager';
      case 'services':
        return 'Service Pages Editor';
      case 'pages':
        return 'Inner Pages CMS Editor (About, Contact, Pricing, etc.)';
      case 'testimonials':
        return 'Testimonials & Reviews Manager';
      case 'blog':
        return 'Blog & Editorial SEO Suite';
      case 'settings':
        return 'Global Website Settings';
      case 'homepage':
      default:
        return 'Homepage Content Editor';
    }
  };

  return (
    <div className="min-h-screen bg-[#121417] text-slate-100 font-sans flex relative overflow-x-hidden selection:bg-[#E01E37] selection:text-white">

      {/* Subtle Ambient Red Glow */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-[#E01E37]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* ------------------------------------------------------------------ */}
      {/* CMS LEFT SIDEBAR NAVIGATION                                        */}
      {/* ------------------------------------------------------------------ */}
      <aside className="w-72 bg-slate-900 border-r border-slate-800/80 flex flex-col shrink-0 z-20">

        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E01E37] via-[#B81A2C] to-[#C8102E] p-0.5 shadow-lg shadow-[#E01E37]/25 flex items-center justify-center">
            <div className="w-full h-full bg-[#121417] rounded-[14px] flex items-center justify-center">
              <Globe className="w-5 h-5 text-[#E01E37]" />
            </div>
          </div>
          <div>
            <div className="font-display font-extrabold text-base tracking-tight text-white leading-none">
              Property Visa
            </div>
            <div className="text-xs text-[#E01E37] font-semibold mt-1">
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
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left transition-all cursor-pointer group ${isActive
                    ? 'bg-[#E01E37] text-white shadow-lg shadow-[#E01E37]/25 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                <div>
                  <div className="text-sm font-bold leading-tight">{item.label}</div>
                  <div className={`text-[11px] mt-0.5 ${isActive ? 'text-white/80' : 'text-slate-500'}`}>
                    {item.description}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>

        {/* User Footer & Exit Button */}
        <div className="p-4 border-t border-slate-800/80 space-y-3 bg-slate-950/40">
          <button
            onClick={onExitAdmin}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-[#E01E37]" />
            <span>Exit to Public Website</span>
          </button>
        </div>

      </aside>

      {/* ------------------------------------------------------------------ */}
      {/* MAIN CONTENT AREA                                                  */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">

        {/* Top Header */}
        <header className="h-16 border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-20">
          <h1 className="font-display font-extrabold text-xl text-white">
            {getActiveTitle()}
          </h1>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20">
            <CheckCircle2 className="w-4 h-4" /> Live Website Connected
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>

      </div>

    </div>
  );
}
