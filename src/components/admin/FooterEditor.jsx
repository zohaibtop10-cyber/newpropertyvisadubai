import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, Link2, Hash, Type, AlignLeft, Plus, Trash2, ExternalLink, Sparkles } from 'lucide-react';

export default function FooterEditor({ cmsConfig, setCmsConfig }) {
  const f = cmsConfig?.footer || {};

  // Brand column
  const [logoIcon, setLogoIcon] = useState(f.logoIcon ?? cmsConfig?.global?.branding?.logoIcon ?? 'PV');
  const [logoSubtext, setLogoSubtext] = useState(f.logoSubtext ?? cmsConfig?.global?.branding?.logoSubtext ?? 'DUBAI');
  const [brandTitle, setBrandTitle] = useState(f.brandTitle ?? cmsConfig?.global?.branding?.brandTitle ?? 'PropertyVisaDubai');
  const [brandSubtitle, setBrandSubtitle] = useState(f.brandSubtitle ?? cmsConfig?.global?.branding?.brandSubtitle ?? 'operated by brightlink');
  const [tagline, setTagline] = useState(f.tagline ?? 'Calculate your exact government fees in seconds, or text us on WhatsApp — a friendly visa specialist replies in minutes.');
  const [copyrightText, setCopyrightText] = useState(f.copyrightText ?? '© 2026 PropertyVisa Dubai. All rights reserved. Operated by Brightlink Management Consultancy.');

  // Official portals
  const defaultPortals = [
    { label: 'icp.gov.ae', url: 'https://icp.gov.ae' },
    { label: 'gdrfad.gov.ae', url: 'https://www.gdrfad.gov.ae' },
    { label: 'u.ae', url: 'https://u.ae' },
  ];
  const [portals, setPortals] = useState(f.portals ?? defaultPortals);

  // Column headings
  const [servicesColHeading, setServicesColHeading] = useState(f.servicesColHeading ?? 'Residency Services');
  const [legalColHeading, setLegalColHeading] = useState(f.legalColHeading ?? 'Platform & Legal');
  const [contactColHeading, setContactColHeading] = useState(f.contactColHeading ?? 'Advisory Desk & HQ');

  // Platform & Legal links
  const defaultLegalLinks = [
    { label: 'Homepage', view: 'home' },
    { label: 'Visa Calculator', view: 'calculator' },
    { label: 'Residency Guides', view: 'blog-index' },
    { label: 'About Us', view: 'about' },
    { label: 'Terms & Privacy', view: 'privacy' },
  ];
  const [legalLinks, setLegalLinks] = useState(f.legalLinks ?? defaultLegalLinks);

  // Bottom bar
  const [madeWithText, setMadeWithText] = useState(f.madeWithText ?? 'Made with ♥ in Dubai, UAE');
  const [bottomBadge, setBottomBadge] = useState(f.bottomBadge ?? 'Licensed PRO Document Clearing • DED Business Registration');

  // Disclaimer
  const [disclaimer, setDisclaimer] = useState(
    f.disclaimer ?? cmsConfig?.global?.footerDisclaimer ??
    'Propertyvisadubai.ae is operated by Brightlink Management Consultancy LLC, a private third-party service provider licensed in Dubai. We are not a government authority and have no affiliation with, or endorsement from, the Government of the UAE or any of its departments.'
  );

  // Referral banner
  const [referralTitle, setReferralTitle] = useState(f.referralTitle ?? cmsConfig?.aboutPage?.referral?.title ?? 'Grow Together With Our B2B Referral Program');
  const [referralDesc, setReferralDesc] = useState(f.referralDesc ?? cmsConfig?.aboutPage?.referral?.description ?? 'Partner with us through our structured B2B and Corporate Referral Program.');
  const [referralBtn, setReferralBtn] = useState(f.referralBtn ?? cmsConfig?.aboutPage?.referral?.buttonText ?? 'Become a Referral Partner');

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const footerObj = cmsConfig?.footer || {};
    if (footerObj.logoIcon || cmsConfig?.global?.branding?.logoIcon) setLogoIcon(footerObj.logoIcon ?? cmsConfig?.global?.branding?.logoIcon);
    if (footerObj.logoSubtext || cmsConfig?.global?.branding?.logoSubtext) setLogoSubtext(footerObj.logoSubtext ?? cmsConfig?.global?.branding?.logoSubtext);
    if (footerObj.brandTitle || cmsConfig?.global?.branding?.brandTitle) setBrandTitle(footerObj.brandTitle ?? cmsConfig?.global?.branding?.brandTitle);
    if (footerObj.brandSubtitle || cmsConfig?.global?.branding?.brandSubtitle) setBrandSubtitle(footerObj.brandSubtitle ?? cmsConfig?.global?.branding?.brandSubtitle);
    if (footerObj.tagline) setTagline(footerObj.tagline);
    if (footerObj.copyrightText) setCopyrightText(footerObj.copyrightText);
    if (footerObj.portals && Array.isArray(footerObj.portals)) setPortals(footerObj.portals);
    if (footerObj.servicesColHeading) setServicesColHeading(footerObj.servicesColHeading);
    if (footerObj.legalColHeading) setLegalColHeading(footerObj.legalColHeading);
    if (footerObj.contactColHeading) setContactColHeading(footerObj.contactColHeading);
    if (footerObj.legalLinks && Array.isArray(footerObj.legalLinks)) setLegalLinks(footerObj.legalLinks);
    if (footerObj.madeWithText) setMadeWithText(footerObj.madeWithText);
    if (footerObj.bottomBadge) setBottomBadge(footerObj.bottomBadge);
    if (footerObj.disclaimer || cmsConfig?.global?.footerDisclaimer) setDisclaimer(footerObj.disclaimer ?? cmsConfig?.global?.footerDisclaimer);
    if (footerObj.referralTitle || cmsConfig?.aboutPage?.referral?.title) setReferralTitle(footerObj.referralTitle ?? cmsConfig?.aboutPage?.referral?.title);
    if (footerObj.referralDesc || cmsConfig?.aboutPage?.referral?.description) setReferralDesc(footerObj.referralDesc ?? cmsConfig?.aboutPage?.referral?.description);
    if (footerObj.referralBtn || cmsConfig?.aboutPage?.referral?.buttonText) setReferralBtn(footerObj.referralBtn ?? cmsConfig?.aboutPage?.referral?.buttonText);
  }, [cmsConfig]);

  const handleSave = (e) => {
    e.preventDefault();
    const updatedFooter = {
      logoIcon, logoSubtext, brandTitle, brandSubtitle, tagline, copyrightText,
      portals,
      servicesColHeading, legalColHeading, contactColHeading,
      legalLinks,
      madeWithText, bottomBadge,
      disclaimer,
      referralTitle, referralDesc, referralBtn
    };
    if (setCmsConfig) {
      setCmsConfig(prev => ({
        ...prev,
        footer: updatedFooter,
        global: {
          ...prev?.global,
          branding: {
            ...prev?.global?.branding,
            logoIcon, logoSubtext, brandTitle, brandSubtitle
          },
          footerDisclaimer: disclaimer
        },
        aboutPage: {
          ...prev?.aboutPage,
          referral: { title: referralTitle, description: referralDesc, buttonText: referralBtn }
        }
      }));
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addPortal = () => setPortals([...portals, { label: '', url: '' }]);
  const removePortal = (i) => setPortals(portals.filter((_, idx) => idx !== i));

  const addLegalLink = () => setLegalLinks([...legalLinks, { label: '', view: '' }]);
  const removeLegalLink = (i) => setLegalLinks(legalLinks.filter((_, idx) => idx !== i));

  return (
    <div className="max-w-5xl space-y-8 animate-fadeIn pb-16">

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-brand-darkSurface border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Global Footers & Portals</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Footer & Disclaimer Editor
            </h1>
            <p className="text-text-muted text-xs sm:text-sm max-w-xl">
              Configure footer branding, government portal links, B2B referral banner, and legal disclaimers.
            </p>
          </div>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Publish Footer</span>
          </button>
        </div>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-semibold flex items-center gap-3 shadow-lg animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span>Footer settings published and synced live!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">

        {/* 1. REFERRAL BANNER */}
        <div className="bg-surface/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-5">
          <div className="flex items-center gap-3.5 border-b border-slate-800/80 pb-5">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400"><Type className="w-6 h-6" /></div>
            <div>
              <h2 className="font-display font-bold text-lg text-white">Referral Partnership Banner</h2>
              <p className="text-text-muted text-xs mt-0.5">Full-width call-to-action banner above the footer grid</p>
            </div>
          </div>
          <div className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Banner Headline</label>
              <input type="text" value={referralTitle} onChange={e => setReferralTitle(e.target.value)} className="w-full bg-surface/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold text-base focus:outline-none focus:border-amber-500/50" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Banner Description</label>
              <textarea rows={2} value={referralDesc} onChange={e => setReferralDesc(e.target.value)} className="w-full bg-surface/80 border border-slate-800 rounded-xl p-3.5 text-slate-300 text-xs focus:outline-none focus:border-amber-500/50" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Button Text</label>
              <input type="text" value={referralBtn} onChange={e => setReferralBtn(e.target.value)} className="w-full bg-surface/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-semibold text-xs focus:outline-none focus:border-amber-500/50" />
            </div>
          </div>
        </div>

        {/* 2. BRAND COLUMN */}
        <div className="bg-surface/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-5">
          <div className="flex items-center gap-3.5 border-b border-slate-800/80 pb-5">
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400"><Hash className="w-6 h-6" /></div>
            <div>
              <h2 className="font-display font-bold text-lg text-white">Brand Column</h2>
              <p className="text-text-muted text-xs mt-0.5">Logo, brand title, tagline, and copyright text</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Logo Icon Badge</label>
              <input type="text" value={logoIcon} onChange={e => setLogoIcon(e.target.value)} className="w-full bg-surface/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:border-amber-500/50" placeholder="PV" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Logo Subtext</label>
              <input type="text" value={logoSubtext} onChange={e => setLogoSubtext(e.target.value)} className="w-full bg-surface/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:border-amber-500/50" placeholder="DUBAI" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Brand Main Title</label>
              <input type="text" value={brandTitle} onChange={e => setBrandTitle(e.target.value)} className="w-full bg-surface/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold text-base focus:outline-none focus:border-amber-500/50" placeholder="PropertyVisaDubai" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Operator Subtitle</label>
              <input type="text" value={brandSubtitle} onChange={e => setBrandSubtitle(e.target.value)} className="w-full bg-surface/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:border-amber-500/50" placeholder="operated by brightlink" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Footer Tagline</label>
              <textarea rows={2} value={tagline} onChange={e => setTagline(e.target.value)} className="w-full bg-surface/80 border border-slate-800 rounded-xl p-3.5 text-slate-300 text-xs focus:outline-none focus:border-amber-500/50" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Copyright Notice</label>
              <input type="text" value={copyrightText} onChange={e => setCopyrightText(e.target.value)} className="w-full bg-surface/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-medium text-xs focus:outline-none focus:border-amber-500/50" />
            </div>
          </div>
        </div>

        {/* 3. OFFICIAL PORTALS */}
        <div className="bg-surface/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-5">
          <div className="flex items-center gap-3.5 border-b border-slate-800/80 pb-5">
            <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400"><ExternalLink className="w-6 h-6" /></div>
            <div>
              <h2 className="font-display font-bold text-lg text-white">Official Government Portals</h2>
              <p className="text-text-muted text-xs mt-0.5">External official portal links shown under footer brand block</p>
            </div>
          </div>
          <div className="space-y-3">
            {portals.map((p, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center bg-surface/80 p-3.5 rounded-xl border border-slate-800/80">
                <div className="flex-1 w-full">
                  <label className="block text-[11px] font-semibold text-text-muted mb-1">Label</label>
                  <input type="text" value={p.label} onChange={e => { const u = [...portals]; u[i].label = e.target.value; setPortals(u); }} className="w-full bg-surface border border-slate-700/60 rounded-lg px-3 py-2 text-white font-medium text-xs focus:outline-none" placeholder="icp.gov.ae" />
                </div>
                <div className="flex-1 w-full">
                  <label className="block text-[11px] font-semibold text-text-muted mb-1">URL</label>
                  <input type="url" value={p.url} onChange={e => { const u = [...portals]; u[i].url = e.target.value; setPortals(u); }} className="w-full bg-surface border border-slate-700/60 rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none" placeholder="https://icp.gov.ae" />
                </div>
                <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); removePortal(i); }} className="p-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors shrink-0 self-end sm:self-center cursor-pointer" title="Remove Portal"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
            <button type="button" onClick={addPortal} className="w-full py-3 rounded-xl border border-dashed border-slate-700 text-text-muted text-xs font-semibold flex items-center justify-center gap-2 hover:border-amber-500/50 hover:text-amber-400 transition-colors cursor-pointer">
              <Plus className="w-4 h-4" /> Add Portal Link
            </button>
          </div>
        </div>

        {/* 4. PLATFORM & LEGAL LINKS */}
        <div className="bg-surface/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-5">
          <div className="flex items-center gap-3.5 border-b border-slate-800/80 pb-5">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400"><Link2 className="w-6 h-6" /></div>
            <div>
              <h2 className="font-display font-bold text-lg text-white">Platform Navigation Links</h2>
              <p className="text-text-muted text-xs mt-0.5">Custom footer navigation links and view route keys</p>
            </div>
          </div>
          <div className="space-y-3">
            {legalLinks.map((lnk, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center bg-surface/80 p-3.5 rounded-xl border border-slate-800/80">
                <div className="flex-1 w-full">
                  <label className="block text-[11px] font-semibold text-text-muted mb-1">Link Label</label>
                  <input type="text" value={lnk.label} onChange={e => { const u = [...legalLinks]; u[i].label = e.target.value; setLegalLinks(u); }} className="w-full bg-surface border border-slate-700/60 rounded-lg px-3 py-2 text-white font-medium text-xs focus:outline-none" placeholder="About Us" />
                </div>
                <div className="flex-1 w-full">
                  <label className="block text-[11px] font-semibold text-text-muted mb-1">View Key</label>
                  <input type="text" value={lnk.view} onChange={e => { const u = [...legalLinks]; u[i].view = e.target.value; setLegalLinks(u); }} className="w-full bg-surface border border-slate-700/60 rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none" placeholder="about" />
                </div>
                <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); removeLegalLink(i); }} className="p-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors shrink-0 self-end sm:self-center cursor-pointer" title="Remove Link"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
            <button type="button" onClick={addLegalLink} className="w-full py-3 rounded-xl border border-dashed border-slate-700 text-text-muted text-xs font-semibold flex items-center justify-center gap-2 hover:border-amber-500/50 hover:text-amber-400 transition-colors cursor-pointer">
              <Plus className="w-4 h-4" /> Add Link
            </button>
          </div>
        </div>

        {/* 5. LEGAL DISCLAIMER */}
        <div className="bg-surface/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-5">
          <div className="flex items-center gap-3.5 border-b border-slate-800/80 pb-5">
            <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
              <AlignLeft className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white">Regulatory Legal Disclaimer</h2>
              <p className="text-text-muted text-xs mt-0.5">Regulatory compliance paragraph displayed in footer</p>
            </div>
          </div>
          <div>
            <textarea rows={5} value={disclaimer} onChange={e => setDisclaimer(e.target.value)} className="w-full bg-surface/80 border border-slate-800 rounded-xl p-4 text-slate-300 text-xs leading-relaxed focus:outline-none focus:border-amber-500/50" />
          </div>
        </div>

        {/* Floating Save Button */}
        <div className="pt-4 sticky bottom-4 z-20">
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-base rounded-xl shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
          >
            <Save className="w-5 h-5" />
            <span>Save Footer CMS Settings</span>
          </button>
        </div>

      </form>
    </div>
  );
}
