import React, { useState } from 'react';
import { 
  ArrowUp, ArrowDown, Eye, EyeOff, CheckCircle2, Save, Plus, Trash2, Menu, Layout, Move, Compass
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
  // Local state for homepage section order & visibility
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

  // Local state for Navbar Links
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

  // Handlers for Section Reordering
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

  // Handlers for Navbar Links
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

  // Publish all changes
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
    <div className="max-w-4xl space-y-8 animate-fadeIn">
      
      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-sm font-bold flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Homepage section order and navbar configurations updated cleanly on live site!</span>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 1. HOMEPAGE SECTION ORDER & VISIBILITY MANAGER                     */}
      {/* ------------------------------------------------------------------ */}
      <form onSubmit={handleSaveAll} className="space-y-8">
        
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-[#E01E37]/15 text-[#E01E37]">
                <Move className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">Homepage Section Reorder & Visibility</h2>
                <p className="text-slate-400 text-xs mt-0.5">Use ↑ and ↓ to rearrange homepage sections, or toggle visibility</p>
              </div>
            </div>

            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-full border border-slate-800">
              {sectionOrder.length} Total Sections
            </span>
          </div>

          <div className="space-y-3">
            {sectionOrder.map((sectionId, idx) => {
              const isVisible = visibility[sectionId] !== false;
              const label = SECTION_LABELS[sectionId] || sectionId;

              return (
                <div
                  key={sectionId}
                  className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                    isVisible 
                      ? 'bg-slate-950 border-slate-800 text-white' 
                      : 'bg-slate-950/40 border-slate-800/40 text-slate-500 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-7 h-7 rounded-xl bg-slate-900 text-[#E01E37] font-mono text-xs font-bold flex items-center justify-center border border-slate-800 shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-sm truncate">{label}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Move Up */}
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveUp(idx)}
                      className={`p-2 rounded-xl border border-slate-800 transition-colors ${
                        idx === 0 
                          ? 'text-slate-600 border-slate-800/40 cursor-not-allowed' 
                          : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-[#E01E37] cursor-pointer'
                      }`}
                      title="Move section up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>

                    {/* Move Down */}
                    <button
                      type="button"
                      disabled={idx === sectionOrder.length - 1}
                      onClick={() => handleMoveDown(idx)}
                      className={`p-2 rounded-xl border border-slate-800 transition-colors ${
                        idx === sectionOrder.length - 1 
                          ? 'text-slate-600 border-slate-800/40 cursor-not-allowed' 
                          : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-[#E01E37] cursor-pointer'
                      }`}
                      title="Move section down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>

                    {/* Visibility Toggle */}
                    <button
                      type="button"
                      onClick={() => handleToggleVisibility(sectionId)}
                      className={`px-3 py-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                        isVisible 
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20' 
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
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

        {/* ------------------------------------------------------------------ */}
        {/* 2. NAVBAR NAVIGATION LINKS MANAGER                                 */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
            <div className="p-3 rounded-2xl bg-amber-500/15 text-amber-500">
              <Menu className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-xl text-white">Header Navbar Menu Links</h2>
              <p className="text-slate-400 text-xs mt-0.5">Manage navigation items displayed in the public website header</p>
            </div>
          </div>

          {/* Add New Nav Link Form */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
            <span className="text-xs font-mono font-bold text-slate-300 uppercase">ADD NEW NAVBAR ITEM</span>
            <div className="grid sm:grid-cols-12 gap-3">
              <div className="sm:col-span-6">
                <input
                  type="text"
                  placeholder="Nav Item Label (e.g. Services)"
                  value={newNavLabel}
                  onChange={(e) => setNewNavLabel(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-xs font-bold focus:outline-none focus:border-[#E01E37]"
                />
              </div>

              <div className="sm:col-span-4">
                <select
                  value={newNavView}
                  onChange={(e) => setNewNavView(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-xs font-semibold focus:outline-none focus:border-[#E01E37]"
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
                  className="w-full h-full py-2.5 bg-slate-800 hover:bg-[#E01E37] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
            </div>
          </div>

          {/* Existing Nav Links */}
          <div className="space-y-3">
            {navLinks.map((item) => (
              <div key={item.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between gap-4 text-xs font-bold text-white">
                <div className="flex items-center gap-3">
                  <Compass className="w-4 h-4 text-[#E01E37]" />
                  <span>{item.label}</span>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800">
                    Target View: {item.view}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={navLinks.findIndex(n => n.id === item.id) === 0}
                    onClick={() => handleNavMoveUp(navLinks.findIndex(n => n.id === item.id))}
                    className={`p-2 rounded-xl border border-slate-800 transition-colors cursor-pointer ${
                      navLinks.findIndex(n => n.id === item.id) === 0 ? 'text-slate-600 border-slate-800/40 cursor-not-allowed' : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-[#E01E37]'
                    }`}
                  >
                    <ArrowUp className="w-3 h-3" />
                  </button>

                  <button
                    type="button"
                    disabled={navLinks.findIndex(n => n.id === item.id) === navLinks.length - 1}
                    onClick={() => handleNavMoveDown(navLinks.findIndex(n => n.id === item.id))}
                    className={`p-2 rounded-xl border border-slate-800 transition-colors cursor-pointer ${
                      navLinks.findIndex(n => n.id === item.id) === navLinks.length - 1 ? 'text-slate-600 border-slate-800/40 cursor-not-allowed' : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-[#E01E37]'
                    }`}
                  >
                    <ArrowDown className="w-3 h-3" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleNavVisibility(item.id)}
                    className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                      item.visible !== false
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : 'bg-slate-900 border-slate-800 text-slate-500'
                    }`}
                  >
                    {item.visible !== false ? 'Active' : 'Hidden'}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteNavLink(item.id)}
                    className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Single Prominent Save Button */}
        <button
          type="submit"
          className="w-full py-4 bg-[#E01E37] hover:bg-[#B81A2C] text-white font-bold text-base rounded-2xl shadow-xl shadow-[#E01E37]/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
        >
          <Save className="w-5 h-5" />
          <span>Publish Section Order & Navbar Changes</span>
        </button>

      </form>

    </div>
  );
}
