import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { ref, set } from 'firebase/database';
import { 
  PenTool, Save, CheckCircle2, Sparkles, Layout, BookOpen, 
  Briefcase, Info, Phone, FileCheck, MapPin, Shield, Building2 
} from 'lucide-react';

export default function HeroHeadingsEditor({ cmsConfig, setCmsConfig }) {
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  // Page Hero Headings State
  const [homeTitle, setHomeTitle] = useState(cmsConfig?.hero?.mainHeadline || "Bring your family to the UAE with 100% Guaranteed SLA Approval.");
  const [homeSubtitle, setHomeSubtitle] = useState(cmsConfig?.hero?.subtext || "We prepare, submit, and track family residence visas, 10-Year Golden Visas, and Emirates ID applications so you deal with one consultant instead of five counters.");

  const [blogTitle, setBlogTitle] = useState(cmsConfig?.blogSection?.title || "Dubai & UAE Residency Guides");
  const [blogSubtitle, setBlogSubtitle] = useState(cmsConfig?.blogSection?.subtext || "Verified, up-to-date guidance on UAE residency rules, Golden Visa eligibility, salary thresholds, Ejari tenancy registration, and document attestation.");

  const [aboutTitle, setAboutTitle] = useState(cmsConfig?.aboutPage?.hero?.title || "About 800 DOCS — Your Trusted UAE Consultancy");
  const [aboutSubtitle, setAboutSubtitle] = useState(cmsConfig?.aboutPage?.hero?.subtitle || "800 DOCS is a UAE-based consultancy providing comprehensive solutions for individuals, families, investors, entrepreneurs, and businesses.");

  const [contactTitle, setContactTitle] = useState(cmsConfig?.pages?.contact?.headline || "Get in Touch with Family Visa Specialists");
  const [contactSubtitle, setContactSubtitle] = useState(cmsConfig?.pages?.contact?.subtext || "Connect directly on WhatsApp or visit our Dubai advisory desk at Business Village.");

  const [checklistTitle, setChecklistTitle] = useState(cmsConfig?.pages?.checklist?.headline || "Official GDRFA & ICP Required Documents Checklist");
  const [checklistSubtitle, setChecklistSubtitle] = useState(cmsConfig?.pages?.checklist?.subtext || "Ensure your file passes government compliance audit on the first submission.");

  const [locationsTitle, setLocationsTitle] = useState(cmsConfig?.pages?.locations?.headline || "Our UAE Advisory Offices & Processing Desks");
  const [locationsSubtitle, setLocationsSubtitle] = useState(cmsConfig?.pages?.locations?.subtext || "Visit our physical advisory desks in Dubai Deira Business Village or ADGM Abu Dhabi.");

  const [termsTitle, setTermsTitle] = useState(cmsConfig?.pages?.terms?.headline || "Terms of Service & Regulatory Disclosures");
  const [termsSubtitle, setTermsSubtitle] = useState(cmsConfig?.pages?.terms?.subtext || "Regulatory information, legal disclaimers, and government compliance policies.");

  const [propertyTitle, setPropertyTitle] = useState(cmsConfig?.pages?.property?.headline || "Comprehensive Property Investor Services");
  const [propertySubtitle, setPropertySubtitle] = useState(cmsConfig?.pages?.property?.subtext || "End-to-end management for property investors. From DLD registration to Golden Visa processing through real estate investment.");

  useEffect(() => {
    if (cmsConfig?.hero?.mainHeadline) setHomeTitle(cmsConfig.hero.mainHeadline);
    if (cmsConfig?.hero?.subtext) setHomeSubtitle(cmsConfig.hero.subtext);
    if (cmsConfig?.blogSection?.title) setBlogTitle(cmsConfig.blogSection.title);
    if (cmsConfig?.blogSection?.subtext) setBlogSubtitle(cmsConfig.blogSection.subtext);
    if (cmsConfig?.aboutPage?.hero?.title) setAboutTitle(cmsConfig.aboutPage.hero.title);
    if (cmsConfig?.aboutPage?.hero?.subtitle) setAboutSubtitle(cmsConfig.aboutPage.hero.subtitle);
    if (cmsConfig?.pages?.contact?.headline) setContactTitle(cmsConfig.pages.contact.headline);
    if (cmsConfig?.pages?.contact?.subtext) setContactSubtitle(cmsConfig.pages.contact.subtext);
    if (cmsConfig?.pages?.checklist?.headline) setChecklistTitle(cmsConfig.pages.checklist.headline);
    if (cmsConfig?.pages?.checklist?.subtext) setChecklistSubtitle(cmsConfig.pages.checklist.subtext);
    if (cmsConfig?.pages?.locations?.headline) setLocationsTitle(cmsConfig.pages.locations.headline);
    if (cmsConfig?.pages?.locations?.subtext) setLocationsSubtitle(cmsConfig.pages.locations.subtext);
    if (cmsConfig?.pages?.terms?.headline) setTermsTitle(cmsConfig.pages.terms.headline);
    if (cmsConfig?.pages?.terms?.subtext) setTermsSubtitle(cmsConfig.pages.terms.subtext);
    if (cmsConfig?.pages?.property?.headline) setPropertyTitle(cmsConfig.pages.property.headline);
    if (cmsConfig?.pages?.property?.subtext) setPropertySubtitle(cmsConfig.pages.property.subtext);
  }, [cmsConfig]);

  const handleSave = async (e) => {
    e.preventDefault();

    const updatedConfig = {
      ...(cmsConfig || {}),
      hero: {
        ...(cmsConfig?.hero || {}),
        mainHeadline: homeTitle,
        subtext: homeSubtitle
      },
      blogSection: {
        ...(cmsConfig?.blogSection || {}),
        title: blogTitle,
        subtext: blogSubtitle
      },
      aboutPage: {
        ...(cmsConfig?.aboutPage || {}),
        hero: {
          ...(cmsConfig?.aboutPage?.hero || {}),
          title: aboutTitle,
          subtitle: aboutSubtitle
        }
      },
      pages: {
        ...(cmsConfig?.pages || {}),
        contact: { ...(cmsConfig?.pages?.contact || {}), headline: contactTitle, subtext: contactSubtitle },
        checklist: { ...(cmsConfig?.pages?.checklist || {}), headline: checklistTitle, subtext: checklistSubtitle },
        locations: { ...(cmsConfig?.pages?.locations || {}), headline: locationsTitle, subtext: locationsSubtitle },
        terms: { ...(cmsConfig?.pages?.terms || {}), headline: termsTitle, subtext: termsSubtitle },
        property: { ...(cmsConfig?.pages?.property || {}), headline: propertyTitle, subtext: propertySubtitle }
      }
    };

    if (setCmsConfig) {
      setCmsConfig(updatedConfig);
    }

    try {
      const cmsRef = ref(db, 'cmsConfig');
      await set(cmsRef, updatedConfig);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch(err) {
      alert("Error saving hero headings to Firebase: " + err.message);
    }
  };

  const pagesList = [
    { id: 'home', label: 'Homepage Hero', icon: Layout },
    { id: 'blog', label: 'Blog & Knowledge Base', icon: BookOpen },
    { id: 'about', label: 'About Page', icon: Info },
    { id: 'contact', label: 'Contact Page', icon: Phone },
    { id: 'checklist', label: 'Checklist Page', icon: FileCheck },
    { id: 'locations', label: 'Locations Page', icon: MapPin },
    { id: 'terms', label: 'Terms & Regulatory', icon: Shield },
    { id: 'property', label: 'Property Page', icon: Building2 }
  ];

  return (
    <div className="max-w-6xl space-y-6 animate-fadeIn pb-16">
      
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-brand-darkSurface border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Page Typography & Hero Headings Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Hero Headings CMS
            </h1>
            <p className="text-text-muted text-xs sm:text-sm max-w-xl">
              Configure main page H1 headlines and sub-paragraphs across all website views.
            </p>
          </div>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Publish Hero Headings</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-semibold flex items-center gap-3 shadow-lg animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span>Hero headlines published live to Firebase database!</span>
        </div>
      )}

      {/* Sub-Tab Navigation */}
      <div className="flex flex-wrap gap-2 bg-surface/80 backdrop-blur-xl border border-slate-800/80 p-2 rounded-2xl shadow-xl">
        {pagesList.map((p) => {
          const Icon = p.icon;
          const isActive = activeTab === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveTab(p.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black shadow-lg shadow-amber-500/20'
                  : 'text-text-muted hover:text-white hover:bg-surface/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{p.label}</span>
            </button>
          );
        })}
      </div>

      {/* ACTIVE HERO EDITOR CARD */}
      <div className="bg-surface/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        
        {activeTab === 'home' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                <Layout className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-white">Homepage Hero Headline & Subtext</h3>
                <p className="text-text-muted text-xs">Primary hero section displayed at the top of the main landing page</p>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Homepage Main H1 Headline</label>
              <textarea
                rows={2}
                value={homeTitle}
                onChange={(e) => setHomeTitle(e.target.value)}
                className="w-full bg-surface/80 border border-slate-800 rounded-xl p-4 text-white font-bold text-base focus:outline-none focus:border-amber-500/50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Homepage Hero Subtext</label>
              <textarea
                rows={3}
                value={homeSubtitle}
                onChange={(e) => setHomeSubtitle(e.target.value)}
                className="w-full bg-surface/80 border border-slate-800 rounded-xl p-4 text-slate-300 text-xs leading-relaxed focus:outline-none focus:border-amber-500/50"
              />
            </div>
          </div>
        )}

        {activeTab === 'blog' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-white">Knowledge Base & Blog Hero</h3>
                <p className="text-text-muted text-xs">Main header displayed at the top of the editorial articles index</p>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Blog Index Main H1 Title</label>
              <input
                type="text"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                className="w-full bg-surface/80 border border-slate-800 rounded-xl p-4 text-white font-bold text-sm focus:outline-none focus:border-amber-500/50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Blog Index Subtitle Description</label>
              <textarea
                rows={3}
                value={blogSubtitle}
                onChange={(e) => setBlogSubtitle(e.target.value)}
                className="w-full bg-surface/80 border border-slate-800 rounded-xl p-4 text-slate-300 text-xs leading-relaxed focus:outline-none focus:border-amber-500/50"
              />
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-white">About Us Page Hero</h3>
                <p className="text-text-muted text-xs">Header displayed at the top of the company about page</p>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">About Page Main H1 Title</label>
              <input
                type="text"
                value={aboutTitle}
                onChange={(e) => setAboutTitle(e.target.value)}
                className="w-full bg-surface/80 border border-slate-800 rounded-xl p-4 text-white font-bold text-sm focus:outline-none focus:border-amber-500/50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">About Page Hero Subtitle</label>
              <textarea
                rows={3}
                value={aboutSubtitle}
                onChange={(e) => setAboutSubtitle(e.target.value)}
                className="w-full bg-surface/80 border border-slate-800 rounded-xl p-4 text-slate-300 text-xs leading-relaxed focus:outline-none focus:border-amber-500/50"
              />
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-white">Contact Page Hero</h3>
                <p className="text-text-muted text-xs">Headline displayed on the contact us page</p>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Contact Page Headline</label>
              <input
                type="text"
                value={contactTitle}
                onChange={(e) => setContactTitle(e.target.value)}
                className="w-full bg-surface/80 border border-slate-800 rounded-xl p-4 text-white font-bold text-sm focus:outline-none focus:border-amber-500/50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Contact Page Subtext</label>
              <textarea
                rows={2}
                value={contactSubtitle}
                onChange={(e) => setContactSubtitle(e.target.value)}
                className="w-full bg-surface/80 border border-slate-800 rounded-xl p-4 text-slate-300 text-xs leading-relaxed focus:outline-none focus:border-amber-500/50"
              />
            </div>
          </div>
        )}

        {activeTab === 'checklist' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-white">Document Checklist Hero</h3>
                <p className="text-text-muted text-xs">Header for the GDRFA & ICP requirements checklist page</p>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Checklist Page Headline</label>
              <input
                type="text"
                value={checklistTitle}
                onChange={(e) => setChecklistTitle(e.target.value)}
                className="w-full bg-surface/80 border border-slate-800 rounded-xl p-4 text-white font-bold text-sm focus:outline-none focus:border-amber-500/50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Checklist Page Subtext</label>
              <textarea
                rows={2}
                value={checklistSubtitle}
                onChange={(e) => setChecklistSubtitle(e.target.value)}
                className="w-full bg-surface/80 border border-slate-800 rounded-xl p-4 text-slate-300 text-xs leading-relaxed focus:outline-none focus:border-amber-500/50"
              />
            </div>
          </div>
        )}

        {activeTab === 'locations' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-white">Office Locations Hero</h3>
                <p className="text-text-muted text-xs">Header for Dubai Deira and Abu Dhabi office locations page</p>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Locations Page Headline</label>
              <input
                type="text"
                value={locationsTitle}
                onChange={(e) => setLocationsTitle(e.target.value)}
                className="w-full bg-surface/80 border border-slate-800 rounded-xl p-4 text-white font-bold text-sm focus:outline-none focus:border-amber-500/50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Locations Page Subtext</label>
              <textarea
                rows={2}
                value={locationsSubtitle}
                onChange={(e) => setLocationsSubtitle(e.target.value)}
                className="w-full bg-surface/80 border border-slate-800 rounded-xl p-4 text-slate-300 text-xs leading-relaxed focus:outline-none focus:border-amber-500/50"
              />
            </div>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-white">Terms & Regulatory Disclosures Hero</h3>
                <p className="text-text-muted text-xs">Header for terms of service and regulatory compliance page</p>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Terms Page Headline</label>
              <input
                type="text"
                value={termsTitle}
                onChange={(e) => setTermsTitle(e.target.value)}
                className="w-full bg-surface/80 border border-slate-800 rounded-xl p-4 text-white font-bold text-sm focus:outline-none focus:border-amber-500/50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Terms Page Subtext</label>
              <textarea
                rows={2}
                value={termsSubtitle}
                onChange={(e) => setTermsSubtitle(e.target.value)}
                className="w-full bg-surface/80 border border-slate-800 rounded-xl p-4 text-slate-300 text-xs leading-relaxed focus:outline-none focus:border-amber-500/50"
              />
            </div>
          </div>
        )}

        {activeTab === 'property' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-white">Property Investor Services Hero</h3>
                <p className="text-text-muted text-xs">Header for DLD property investor and Golden Visa page</p>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Property Page Headline</label>
              <input
                type="text"
                value={propertyTitle}
                onChange={(e) => setPropertyTitle(e.target.value)}
                className="w-full bg-surface/80 border border-slate-800 rounded-xl p-4 text-white font-bold text-sm focus:outline-none focus:border-amber-500/50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Property Page Subtext</label>
              <textarea
                rows={2}
                value={propertySubtitle}
                onChange={(e) => setPropertySubtitle(e.target.value)}
                className="w-full bg-surface/80 border border-slate-800 rounded-xl p-4 text-slate-300 text-xs leading-relaxed focus:outline-none focus:border-amber-500/50"
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
