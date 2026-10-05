import React, { useState } from 'react';
import { 
  ArrowUp, ArrowDown, Eye, EyeOff, CheckCircle2, Save, Plus, Trash2, Menu, Move, Compass, Sparkles
} from 'lucide-react';

const SECTION_LABELS = {
  hero: '1. Hero Section & Eligibility Widget',
  stats: '2. Stats Counter Bar (4,800+ Visas, 7 Emirates)',
  achievements: '3. Key Industry Achievements & Awards',
  problems: '4. The Problems We Solve (Before vs After)',
  services: '5. Everything We Handle (Categorized Services Grid)',
  packages: '6. Service Retainer Pricing Packages',
  whyUs: '7. Why Families Choose Us (Trust Cards)',
  process: '8. Step-by-Step SLA Workflow (How It Works)',
  faqs: '9. Frequently Asked Questions (Accordion)',
  reviews: '10. Verified Client Reviews (Infinite Marquee Ticker)',
  blog: '11. Latest UAE Residency & Visa Guides',
  cta: '12. Final Call-to-Action Banner'
};

export default function SectionReorderManager({ cmsConfig, setCmsConfig }) {
  const [sectionOrder, setSectionOrder] = useState(
    cmsConfig?.homepageSectionOrder || [
      'hero', 'stats', 'achievements', 'problems', 'services', 'packages', 'whyUs', 'process', 'faqs', 'reviews', 'blog', 'cta'
    ]
  );

  const [visibility, setVisibility] = useState(
    cmsConfig?.sectionVisibility || {
      hero: true, stats: true, achievements: true, problems: true, services: true, packages: true, whyUs: true, process: true, faqs: true, reviews: true, blog: true, cta: true
    }
  );

  const [navLinks, setNavLinks] = useState(
    cmsConfig?.navbarLinks || [
      { id: 'nav-1', label: 'Home', view: 'home', visible: true },
      { id: 'nav-2', label: 'Visas & Residency', view: 'service', visible: true },
      { id: 'nav-3', label: 'Emirates ID', view: 'service', visible: true },
      { id: 'nav-4', label: 'Pricing & Tariffs', view: 'pricing', visible: true },
      { id: 'nav-5', label: 'Guides', view: 'blog-index', visible: true },
      { id: 'nav-6', label: 'About', view: 'about', visible: true },
      { id: 'nav-7', label: 'Contact', view: 'contact', visible: true }
    ]
  );

  const [newNavLabel, setNewNavLabel] = useState('');
  const [newNavView, setNewNavView] = useState('home');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const updated = [...sectionOrder];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    setSectionOrder(updated);
  };

  const handleMoveDown = (index) => {
    if (index === sectionOrder.length - 1) return;
    const updated = [...sectionOrder];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    setSectionOrder(updated);
  };

  const handleToggleVisibility = (sectionId) => {
    setVisibility(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleToggleNavVisibility = (id) => {
    setNavLinks(navLinks.map(item => item.id === id ? { ...item, visible: !item.visible } : item));
  };

  const handleDeleteNavLink = (id) => {
    setNavLinks(navLinks.filter(item => item.id !== id));
  };

  const handleNavMoveUp = (index) => {
    if (index === 0) return;
    const updated = [...navLinks];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    setNavLinks(updated);
  };

  const handleNavMoveDown = (index) => {
    if (index === navLinks.length - 1) return;
    const updated = [...navLinks];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    setNavLinks(updated);
  };

  const handleAddNavLink = (e) => {
    e.preventDefault();
    if (!newNavLabel.trim()) return;
    const newEntry = {
      id: `nav-${Date.now()}`,
      label: newNavLabel.trim(),
      view: newNavView,
      visible: true
    };
    setNavLinks([...navLinks, newEntry]);
    setNewNavLabel('');
  };

  const handleSaveAll = (e) => {
    e.preventDefault();
    if (setCmsConfig) {
      setCmsConfig(prev => ({
        ...prev,
        homepageSectionOrder: sectionOrder,
        sectionVisibility: visibility,
        navbarLinks: navLinks
      }));
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  return (
    <div className="max-w-5xl space-y-8 animate-fadeIn pb-16">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-brand-darkSurface border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Layout & Navigation Control</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Section Reorder & Navbar Manager
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
              Drag or reorder homepage sections, toggle visibility, and configure top navigation links.
            </p>
          </div>
          <button
            onClick={handleSaveAll}
            className="px-6 py-3 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Publish Layout</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-semibold flex items-center gap-3 shadow-lg animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span>Homepage section order and navbar settings successfully published!</span>
        </div>
      )}

      <form onSubmit={handleSaveAll} className="space-y-8">
        
        {/* HOMEPAGE SECTION ORDER */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Move className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg text-white">Homepage Section Sequence & Visibility</h2>
                <p className="text-slate-400 text-xs mt-0.5">Use ↑ and ↓ to reorder homepage blocks or hide sections</p>
              </div>
            </div>

            <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              {sectionOrder.length} Sections
            </span>
          </div>

          <div className="space-y-3">
            {sectionOrder.map((sectionId, idx) => {
              const isVisible = visibility[sectionId] !== false;
              const label = SECTION_LABELS[sectionId] || sectionId;

              return (
                <div
                  key={sectionId}
                  className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all ${
                    isVisible 
                      ? 'bg-slate-950/80 border-slate-800/80 text-white' 
                      : 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="w-7 h-7 rounded-xl bg-slate-900 text-amber-400 font-mono text-xs font-bold flex items-center justify-center border border-slate-700/60 shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-sm truncate">{label}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveUp(idx)}
                      className={`p-2 rounded-xl border transition-colors ${
                        idx === 0 
                          ? 'border-slate-800/50 text-slate-700 cursor-not-allowed' 
                          : 'border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer'
                      }`}
                      title="Move section up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      disabled={idx === sectionOrder.length - 1}
                      onClick={() => handleMoveDown(idx)}
                      className={`p-2 rounded-xl border transition-colors ${
                        idx === sectionOrder.length - 1 
                          ? 'border-slate-800/50 text-slate-700 cursor-not-allowed' 
                          : 'border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer'
                      }`}
                      title="Move section down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleVisibility(sectionId)}
                      className={`px-3 py-2 rounded-xl border text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                        isVisible 
                          ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' 
                          : 'bg-slate-950 border-slate-800 text-slate-500'
                      }`}
                    >
                      {isVisible ? (
                        <>
                          <Eye className="w-3.5 h-3.5" /> Visible
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5" /> Hidden
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* NAVBAR NAVIGATION LINKS MANAGER */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3.5 border-b border-slate-800/80 pb-5">
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Menu className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white">Header Navbar Navigation Items</h2>
              <p className="text-slate-400 text-xs mt-0.5">Manage custom navbar navigation links</p>
            </div>
          </div>

          <div className="p-4 bg-slate-950/80 border border-slate-800/80 rounded-xl space-y-4">
            <span className="text-xs font-mono font-bold text-slate-300 uppercase">ADD NEW NAVBAR ITEM</span>
            <div className="grid sm:grid-cols-12 gap-3">
              <div className="sm:col-span-6">
                <input
                  type="text"
                  placeholder="Nav Label (e.g. Services)"
                  value={newNavLabel}
                  onChange={(e) => setNewNavLabel(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700/60 rounded-xl p-3 text-white text-xs font-semibold focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div className="sm:col-span-4">
                <select
                  value={newNavView}
                  onChange={(e) => setNewNavView(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700/60 rounded-xl p-3 text-white text-xs font-medium focus:outline-none focus:border-amber-500/50 cursor-pointer"
                >
                  <option value="home">Home Page ('home')</option>
                  <option value="service">Services Page ('service')</option>
                  <option value="pricing">Pricing Page ('pricing')</option>
                  <option value="blog-index">Guides / Blog ('blog-index')</option>
                  <option value="about">About Us ('about')</option>
                  <option value="contact">Contact Us ('contact')</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <button
                  type="button"
                  onClick={handleAddNavLink}
                  className="w-full h-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {navLinks.map((item) => (
              <div key={item.id} className="p-4 bg-slate-950/80 border border-slate-800/80 rounded-xl flex items-center justify-between gap-4 text-xs font-semibold text-white">
                <div className="flex items-center gap-3">
                  <Compass className="w-4 h-4 text-amber-400" />
                  <span>{item.label}</span>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-full border border-slate-700/60">
                    Route: {item.view}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={navLinks.findIndex(n => n.id === item.id) === 0}
                    onClick={() => handleNavMoveUp(navLinks.findIndex(n => n.id === item.id))}
                    className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                      navLinks.findIndex(n => n.id === item.id) === 0 ? 'border-slate-800/50 text-slate-700 cursor-not-allowed' : 'border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    disabled={navLinks.findIndex(n => n.id === item.id) === navLinks.length - 1}
                    onClick={() => handleNavMoveDown(navLinks.findIndex(n => n.id === item.id))}
                    className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                      navLinks.findIndex(n => n.id === item.id) === navLinks.length - 1 ? 'border-slate-800/50 text-slate-700 cursor-not-allowed' : 'border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleNavVisibility(item.id)}
                    className={`px-3 py-1.5 rounded-xl border text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                      item.visible !== false
                        ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                        : 'bg-slate-950 border-slate-800 text-slate-500'
                    }`}
                  >
                    {item.visible !== false ? 'Active' : 'Hidden'}
                  </button>

                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDeleteNavLink(item.id); }}
                    className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 rounded-xl transition-colors cursor-pointer"
                    title="Delete Nav Link"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 sticky bottom-4 z-20">
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-base rounded-xl shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
          >
            <Save className="w-5 h-5" />
            <span>Publish Section Order & Navbar Layout</span>
          </button>
        </div>

      </form>
    </div>
  );
}
