import React, { useState } from 'react';
import { 
  Save, CheckCircle2, Info, Shield, Users, Award, Target, 
  Building2, Handshake, Star, Quote, Plus, Trash2, FileText, Sparkles,
  UserCheck, BadgeCheck, MessageSquare, HelpCircle
} from 'lucide-react';
import { pageData as defaultPageData } from '../../../app/about-us/page.jsx';

export default function AboutPageEditor({ cmsConfig, setCmsConfig }) {
  const [activeTab, setActiveTab] = useState('hero');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const activeAboutData = cmsConfig?.aboutPage || defaultPageData;

  // About Hero
  const [heroBadge, setHeroBadge] = useState(activeAboutData?.hero?.badge || defaultPageData.hero.badge);
  const [heroTitle, setHeroTitle] = useState(activeAboutData?.hero?.headline || activeAboutData?.hero?.title || defaultPageData.hero.headline);
  const [heroSubtitle, setHeroSubtitle] = useState(activeAboutData?.hero?.subheadline || activeAboutData?.hero?.subtitle || defaultPageData.hero.subheadline);
  const [heroPrimaryCta, setHeroPrimaryCta] = useState(activeAboutData?.hero?.primaryCta || defaultPageData.hero.primaryCta);
  const [heroSecondaryCta, setHeroSecondaryCta] = useState(activeAboutData?.hero?.secondaryCta || defaultPageData.hero.secondaryCta);

  // Company Story
  const [storyBadge, setStoryBadge] = useState(activeAboutData?.companyStory?.badge || defaultPageData.companyStory.badge);
  const [storyHeadline, setStoryHeadline] = useState(activeAboutData?.companyStory?.headline || defaultPageData.companyStory.headline);
  const [paragraphs, setParagraphs] = useState(activeAboutData?.companyStory?.paragraphs || defaultPageData.companyStory.paragraphs);

  // DET License & Verified Authority
  const [licBadge, setLicBadge] = useState(activeAboutData?.verifiedAuthority?.badge || activeAboutData?.license?.badge || defaultPageData.verifiedAuthority.badge);
  const [licTitle, setLicTitle] = useState(activeAboutData?.verifiedAuthority?.headline || activeAboutData?.license?.title || defaultPageData.verifiedAuthority.headline);
  const [licDesc, setLicDesc] = useState(activeAboutData?.verifiedAuthority?.subheadline || activeAboutData?.license?.description || defaultPageData.verifiedAuthority.subheadline);
  const [specs, setSpecs] = useState(activeAboutData?.verifiedAuthority?.specs || defaultPageData.verifiedAuthority.specs);

  // Strength in Numbers / Stats
  const [impactStats, setImpactStats] = useState(activeAboutData?.impactStats || defaultPageData.impactStats);

  // Team Roster
  const [teamRoster, setTeamRoster] = useState(activeAboutData?.teamRoster || defaultPageData.teamRoster);

  // Core Values
  const [coreValues, setCoreValues] = useState(activeAboutData?.coreValues || defaultPageData.coreValues);

  // How We Work (3-Step Process)
  const [howWeWork, setHowWeWork] = useState(activeAboutData?.howWeWork || defaultPageData.howWeWork);

  // Reviews
  const [reviewsList, setReviewsList] = useState(activeAboutData?.reviews || defaultPageData.reviews);

  // FAQs
  const [faqsList, setFaqsList] = useState(activeAboutData?.faqs || defaultPageData.faqs);

  // Sync with cmsConfig prop when loaded or updated from Firebase
  React.useEffect(() => {
    if (!cmsConfig?.aboutPage) return;
    const data = cmsConfig.aboutPage;
    if (data.hero?.badge) setHeroBadge(data.hero.badge);
    if (data.hero?.headline || data.hero?.title) setHeroTitle(data.hero.headline || data.hero.title);
    if (data.hero?.subheadline || data.hero?.subtitle) setHeroSubtitle(data.hero.subheadline || data.hero.subtitle);
    if (data.hero?.primaryCta) setHeroPrimaryCta(data.hero.primaryCta);
    if (data.hero?.secondaryCta) setHeroSecondaryCta(data.hero.secondaryCta);

    if (data.companyStory?.badge) setStoryBadge(data.companyStory.badge);
    if (data.companyStory?.headline) setStoryHeadline(data.companyStory.headline);
    if (Array.isArray(data.companyStory?.paragraphs)) setParagraphs(data.companyStory.paragraphs);

    if (data.verifiedAuthority?.badge) setLicBadge(data.verifiedAuthority.badge);
    if (data.verifiedAuthority?.headline) setLicTitle(data.verifiedAuthority.headline);
    if (data.verifiedAuthority?.subheadline) setLicDesc(data.verifiedAuthority.subheadline);
    if (Array.isArray(data.verifiedAuthority?.specs)) setSpecs(data.verifiedAuthority.specs);

    if (Array.isArray(data.impactStats)) setImpactStats(data.impactStats);
    if (Array.isArray(data.teamRoster)) setTeamRoster(data.teamRoster);
    if (Array.isArray(data.coreValues)) setCoreValues(data.coreValues);
    if (Array.isArray(data.howWeWork)) setHowWeWork(data.howWeWork);
    if (Array.isArray(data.reviews)) setReviewsList(data.reviews);
    if (Array.isArray(data.faqs)) setFaqsList(data.faqs);

    if (data.cta?.badge) setCtaBadge(data.cta.badge);
    if (data.cta?.headline) setCtaHeadline(data.cta.headline);
    if (data.cta?.subheadline) setCtaSubheadline(data.cta.subheadline);
    if (data.cta?.primaryBtn) setCtaPrimaryBtn(data.cta.primaryBtn);
    if (data.cta?.secondaryBtn) setCtaSecondaryBtn(data.cta.secondaryBtn);
  }, [cmsConfig]);

  const handleSave = (e) => {
    if (e) e.preventDefault();
    
    const aboutPageConfig = {
      hero: { badge: heroBadge, headline: heroTitle, title: heroTitle, subheadline: heroSubtitle, subtitle: heroSubtitle, primaryCta: heroPrimaryCta, secondaryCta: heroSecondaryCta },
      companyStory: { badge: storyBadge, headline: storyHeadline, paragraphs },
      verifiedAuthority: { badge: licBadge, headline: licTitle, subheadline: licDesc, specs },
      license: { badge: licBadge, title: licTitle, description: licDesc },
      impactStats,
      teamRoster,
      coreValues,
      howWeWork,
      reviews: reviewsList,
      faqs: faqsList,
      cta: { badge: ctaBadge, headline: ctaHeadline, subheadline: ctaSubheadline, primaryBtn: ctaPrimaryBtn, secondaryBtn: ctaSecondaryBtn }
    };

    if (setCmsConfig) {
      setCmsConfig(prev => ({ ...prev, aboutPage: aboutPageConfig }));
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  const tabsList = [
    { id: 'hero', label: 'Hero Header', icon: Info },
    { id: 'story', label: 'Company Story', icon: Quote },
    { id: 'team', label: 'Executive Team Roster', icon: Users },
    { id: 'authority', label: 'DET Licensing Specs', icon: Shield },
    { id: 'stats', label: 'Impact Numbers', icon: Award },
    { id: 'values', label: 'Core Values', icon: Star },
    { id: 'howWeWork', label: '3-Step Flow', icon: Target },
    { id: 'reviews', label: 'Client Reviews', icon: Star },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle },
    { id: 'cta', label: 'CTA Banner', icon: Sparkles }
  ];

  return (
    <div className="max-w-5xl space-y-8 animate-fadeIn pb-16">
      
      {/* Top Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-brand-darkSurface border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Company Profile CMS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              About Us Page Editor
            </h1>
            <p className="text-text-muted text-xs sm:text-sm max-w-xl">
              Configure hero messaging, executive team members, DET license credentials, stats, core values, and CTAs.
            </p>
          </div>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Publish About Page</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-semibold flex items-center gap-3 shadow-lg animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span>About Us page content successfully published live!</span>
        </div>
      )}

      {/* Tab Bar */}
      <div className="flex flex-wrap gap-2 bg-surface/80 backdrop-blur-xl border border-slate-800/80 p-2 rounded-2xl shadow-xl">
        {tabsList.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all cursor-pointer ${
                isActive 
                  ? 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black font-bold shadow-lg shadow-amber-500/20' 
                  : 'text-text-muted hover:text-white hover:bg-surface/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSave} className="space-y-8">

        {/* HERO TAB */}
        {activeTab === 'hero' && (
          <div className="bg-surface/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3.5 border-b border-slate-800/80 pb-5">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400"><Info className="w-6 h-6" /></div>
              <div>
                <h2 className="font-display font-bold text-lg text-white">Hero Header Section</h2>
                <p className="text-text-muted text-xs mt-0.5">Edit main title, government badge text, and call-to-action buttons</p>
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Pill Badge Text</label>
                <input type="text" value={heroBadge} onChange={(e) => setHeroBadge(e.target.value)} className="w-full bg-surface/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:border-amber-500/50" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Hero Main H1 Headline</label>
                <input type="text" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} className="w-full bg-surface/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold text-base focus:outline-none focus:border-amber-500/50" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Hero Subheadline</label>
                <textarea rows={3} value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} className="w-full bg-surface/80 border border-slate-800 rounded-xl p-4 text-slate-300 text-xs leading-relaxed focus:outline-none focus:border-amber-500/50" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Primary Button Text</label>
                  <input type="text" value={heroPrimaryCta} onChange={(e) => setHeroPrimaryCta(e.target.value)} className="w-full bg-surface/80 border border-slate-800 rounded-xl px-4 py-3 text-amber-400 font-bold text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Secondary Button Text</label>
                  <input type="text" value={heroSecondaryCta} onChange={(e) => setHeroSecondaryCta(e.target.value)} className="w-full bg-surface/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold text-xs" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* COMPANY STORY TAB */}
        {activeTab === 'story' && (
          <div className="bg-surface/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3.5 border-b border-slate-800/80 pb-5">
              <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400"><Quote className="w-6 h-6" /></div>
              <div>
                <h2 className="font-display font-bold text-lg text-white">Company Philosophy & Heritage</h2>
                <p className="text-text-muted text-xs mt-0.5">Edit story cards and narrative paragraphs</p>
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Section Badge</label>
                <input type="text" value={storyBadge} onChange={(e) => setStoryBadge(e.target.value)} className="w-full bg-surface/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-medium" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Story Headline</label>
                <input type="text" value={storyHeadline} onChange={(e) => setStoryHeadline(e.target.value)} className="w-full bg-surface/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold text-base" />
              </div>
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold text-amber-400">PHILOSOPHY PARAGRAPHS</span>
                {paragraphs.map((p, idx) => (
                  <div key={idx} className="p-4 bg-surface/80 border border-slate-800/80 rounded-xl space-y-3">
                    <input type="text" value={p.title} onChange={(e) => { const u = [...paragraphs]; u[idx].title = e.target.value; setParagraphs(u); }} placeholder="Paragraph Title" className="w-full bg-surface border border-slate-700/60 rounded-xl px-3.5 py-2 text-white text-xs font-bold" />
                    <textarea rows={3} value={p.body} onChange={(e) => { const u = [...paragraphs]; u[idx].body = e.target.value; setParagraphs(u); }} placeholder="Paragraph Body Text" className="w-full bg-surface border border-slate-700/60 rounded-xl p-3 text-slate-300 text-xs" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* EXECUTIVE TEAM ROSTER TAB */}
        {activeTab === 'team' && (
          <div className="bg-surface/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-5">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400"><Users className="w-6 h-6" /></div>
                <div>
                  <h2 className="font-display font-bold text-lg text-white">Executive Leadership & Immigration Roster</h2>
                  <p className="text-text-muted text-xs mt-0.5">Manage executive team members shown on the About Us page</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setTeamRoster([...teamRoster, { name: "New Executive", role: "Specialist Consultant", bio: "Bio details...", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop", badge: "Executive Advisory" }])}
                className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Team Member
              </button>
            </div>

            <div className="space-y-4">
              {teamRoster.map((member, idx) => (
                <div key={idx} className="p-5 bg-surface/80 border border-slate-800/80 rounded-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400">MEMBER #{idx + 1}: {member.name}</span>
                    <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setTeamRoster(teamRoster.filter((_, i) => i !== idx)); }} className="p-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 cursor-pointer" title="Remove Member"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-text-muted mb-1">Full Name</label>
                      <input type="text" value={member.name} onChange={(e) => { const u = [...teamRoster]; u[idx].name = e.target.value; setTeamRoster(u); }} className="w-full bg-surface border border-slate-700/60 rounded-xl px-3.5 py-2 text-white text-xs font-bold" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-text-muted mb-1">Role Title</label>
                      <input type="text" value={member.role} onChange={(e) => { const u = [...teamRoster]; u[idx].role = e.target.value; setTeamRoster(u); }} className="w-full bg-surface border border-slate-700/60 rounded-xl px-3.5 py-2 text-white text-xs" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-text-muted mb-1">Department Badge</label>
                      <input type="text" value={member.badge || ''} onChange={(e) => { const u = [...teamRoster]; u[idx].badge = e.target.value; setTeamRoster(u); }} className="w-full bg-surface border border-slate-700/60 rounded-xl px-3.5 py-2 text-amber-400 font-mono text-xs" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-text-muted mb-1">Image URL</label>
                    <input type="text" value={member.image} onChange={(e) => { const u = [...teamRoster]; u[idx].image = e.target.value; setTeamRoster(u); }} className="w-full bg-surface border border-slate-700/60 rounded-xl px-3.5 py-2 text-slate-300 font-mono text-xs" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-text-muted mb-1">Biography</label>
                    <textarea rows={2} value={member.bio} onChange={(e) => { const u = [...teamRoster]; u[idx].bio = e.target.value; setTeamRoster(u); }} className="w-full bg-surface border border-slate-700/60 rounded-xl p-3 text-slate-300 text-xs" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DET LICENSING & ACCREDITATION TAB */}
        {activeTab === 'authority' && (
          <div className="bg-surface/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3.5 border-b border-slate-800/80 pb-5">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"><Shield className="w-6 h-6" /></div>
              <div>
                <h2 className="font-display font-bold text-lg text-white">DET Licensing Credentials</h2>
                <p className="text-text-muted text-xs mt-0.5">Edit license accreditation details and authority credentials</p>
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Badge Label</label>
                <input type="text" value={licBadge} onChange={(e) => setLicBadge(e.target.value)} className="w-full bg-surface/80 border border-slate-800 rounded-xl px-4 py-3 text-white text-xs font-medium" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Section Headline</label>
                <input type="text" value={licTitle} onChange={(e) => setLicTitle(e.target.value)} className="w-full bg-surface/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Subheadline Description</label>
                <textarea rows={2} value={licDesc} onChange={(e) => setLicDesc(e.target.value)} className="w-full bg-surface/80 border border-slate-800 rounded-xl p-4 text-slate-300 text-xs" />
              </div>

              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-emerald-400">CREDENTIAL SPECIFICATIONS</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {specs.map((spec, idx) => (
                    <div key={idx} className="p-4 bg-surface/80 border border-slate-800/80 rounded-xl space-y-2">
                      <input type="text" value={spec.label} onChange={(e) => { const u = [...specs]; u[idx].label = e.target.value; setSpecs(u); }} placeholder="Label" className="w-full bg-surface border border-slate-700/60 rounded-xl px-3 py-1.5 text-text-muted text-xs font-mono" />
                      <input type="text" value={spec.value} onChange={(e) => { const u = [...specs]; u[idx].value = e.target.value; setSpecs(u); }} placeholder="Value" className="w-full bg-surface border border-slate-700/60 rounded-xl px-3 py-1.5 text-white font-bold text-xs" />
                      <input type="text" value={spec.detail} onChange={(e) => { const u = [...specs]; u[idx].detail = e.target.value; setSpecs(u); }} placeholder="Detail" className="w-full bg-surface border border-slate-700/60 rounded-xl px-3 py-1.5 text-text-muted text-xs" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* IMPACT NUMBERS TAB */}
        {activeTab === 'stats' && (
          <div className="bg-surface/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3.5 border-b border-slate-800/80 pb-5">
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400"><Award className="w-6 h-6" /></div>
              <div>
                <h2 className="font-display font-bold text-lg text-white">Impact Numbers & Stats</h2>
                <p className="text-text-muted text-xs mt-0.5">Edit impact statistics counters</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {impactStats.map((stat, idx) => (
                <div key={idx} className="p-4 bg-surface/80 border border-slate-800/80 rounded-xl space-y-3">
                  <span className="text-xs font-mono font-bold text-amber-400">STAT METRIC #{idx + 1}</span>
                  <input type="text" value={stat.value} onChange={(e) => { const u = [...impactStats]; u[idx].value = e.target.value; setImpactStats(u); }} placeholder="Value" className="w-full bg-surface border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-white font-bold text-sm" />
                  <input type="text" value={stat.label} onChange={(e) => { const u = [...impactStats]; u[idx].label = e.target.value; setImpactStats(u); }} placeholder="Label" className="w-full bg-surface border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-slate-200 text-xs font-bold" />
                  <input type="text" value={stat.detail} onChange={(e) => { const u = [...impactStats]; u[idx].detail = e.target.value; setImpactStats(u); }} placeholder="Detail" className="w-full bg-surface border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-text-muted text-xs font-mono" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CORE VALUES TAB */}
        {activeTab === 'values' && (
          <div className="bg-surface/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3.5 border-b border-slate-800/80 pb-5">
              <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400"><Star className="w-6 h-6" /></div>
              <div>
                <h2 className="font-display font-bold text-lg text-white">Core Values & Commitments</h2>
                <p className="text-text-muted text-xs mt-0.5">Edit core operational commitments</p>
              </div>
            </div>
            <div className="space-y-4">
              {coreValues.map((item, idx) => (
                <div key={idx} className="p-4 bg-surface/80 border border-slate-800/80 rounded-xl space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="text" value={item.title} onChange={(e) => { const u = [...coreValues]; u[idx].title = e.target.value; setCoreValues(u); }} placeholder="Title" className="bg-surface border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-white text-xs font-bold" />
                    <input type="text" value={item.tag} onChange={(e) => { const u = [...coreValues]; u[idx].tag = e.target.value; setCoreValues(u); }} placeholder="Tag" className="bg-surface border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-amber-400 font-mono text-xs" />
                  </div>
                  <textarea rows={2} value={item.desc} onChange={(e) => { const u = [...coreValues]; u[idx].desc = e.target.value; setCoreValues(u); }} className="w-full bg-surface border border-slate-700/60 rounded-xl p-3 text-slate-300 text-xs" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3-STEP FLOW TAB */}
        {activeTab === 'howWeWork' && (
          <div className="bg-surface/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3.5 border-b border-slate-800/80 pb-5">
              <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400"><Target className="w-6 h-6" /></div>
              <div>
                <h2 className="font-display font-bold text-lg text-white">How We Work (3-Step Process)</h2>
                <p className="text-text-muted text-xs mt-0.5">Edit step-by-step zero-queue workflow</p>
              </div>
            </div>
            <div className="space-y-4">
              {howWeWork.map((stepItem, idx) => (
                <div key={idx} className="p-4 bg-surface/80 border border-slate-800/80 rounded-xl space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-amber-400">STEP {stepItem.step}</span>
                    <input type="text" value={stepItem.title} onChange={(e) => { const u = [...howWeWork]; u[idx].title = e.target.value; setHowWeWork(u); }} className="flex-1 bg-surface border border-slate-700/60 rounded-xl px-3.5 py-2 text-white text-xs font-bold" />
                  </div>
                  <textarea rows={2} value={stepItem.desc} onChange={(e) => { const u = [...howWeWork]; u[idx].desc = e.target.value; setHowWeWork(u); }} className="w-full bg-surface border border-slate-700/60 rounded-xl p-3 text-slate-300 text-xs" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CLIENT REVIEWS TAB */}
        {activeTab === 'reviews' && (
          <div className="bg-surface/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-5">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400"><Star className="w-6 h-6 fill-current" /></div>
                <div>
                  <h2 className="font-display font-bold text-lg text-white">Client Reviews</h2>
                  <p className="text-text-muted text-xs mt-0.5">Edit client testimonials shown on About page</p>
                </div>
              </div>
              <button type="button" onClick={() => setReviewsList([...reviewsList, { name: "New Client", role: "Resident", rating: 5, text: "Great experience!" }])} className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer">
                <Plus className="w-4 h-4" /> Add Review
              </button>
            </div>
            <div className="space-y-4">
              {reviewsList.map((rev, idx) => (
                <div key={idx} className="p-4 bg-surface/80 border border-slate-800/80 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400">REVIEW #{idx + 1}</span>
                    <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setReviewsList(reviewsList.filter((_, i) => i !== idx)); }} className="p-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 cursor-pointer" title="Remove Review"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="text" value={rev.name} onChange={(e) => { const u = [...reviewsList]; u[idx].name = e.target.value; setReviewsList(u); }} placeholder="Name" className="bg-surface border border-slate-700/60 rounded-xl px-3.5 py-2 text-white text-xs font-bold" />
                    <input type="text" value={rev.role} onChange={(e) => { const u = [...reviewsList]; u[idx].role = e.target.value; setReviewsList(u); }} placeholder="Role" className="bg-surface border border-slate-700/60 rounded-xl px-3.5 py-2 text-amber-400 text-xs" />
                  </div>
                  <textarea rows={2} value={rev.text} onChange={(e) => { const u = [...reviewsList]; u[idx].text = e.target.value; setReviewsList(u); }} className="w-full bg-surface border border-slate-700/60 rounded-xl p-3 text-slate-300 text-xs" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQS TAB */}
        {activeTab === 'faqs' && (
          <div className="bg-surface/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-5">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400"><HelpCircle className="w-6 h-6" /></div>
                <div>
                  <h2 className="font-display font-bold text-lg text-white">Transparency FAQs</h2>
                  <p className="text-text-muted text-xs mt-0.5">Edit FAQ items shown on the About page</p>
                </div>
              </div>
              <button type="button" onClick={() => setFaqsList([...faqsList, { q: "New Question?", a: "Answer text..." }])} className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer">
                <Plus className="w-4 h-4" /> Add FAQ
              </button>
            </div>
            <div className="space-y-4">
              {faqsList.map((faq, idx) => (
                <div key={idx} className="p-4 bg-surface/80 border border-slate-800/80 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400">FAQ #{idx + 1}</span>
                    <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setFaqsList(faqsList.filter((_, i) => i !== idx)); }} className="p-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 cursor-pointer" title="Remove FAQ"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                  <input type="text" value={faq.q} onChange={(e) => { const u = [...faqsList]; u[idx].q = e.target.value; setFaqsList(u); }} placeholder="Question" className="w-full bg-surface border border-slate-700/60 rounded-xl px-3.5 py-2 text-white text-xs font-bold" />
                  <textarea rows={2} value={faq.a} onChange={(e) => { const u = [...faqsList]; u[idx].a = e.target.value; setFaqsList(u); }} placeholder="Answer" className="w-full bg-surface border border-slate-700/60 rounded-xl p-3 text-slate-300 text-xs" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA TAB */}
        {activeTab === 'cta' && (
          <div className="bg-surface/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3.5 border-b border-slate-800/80 pb-5">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400"><Sparkles className="w-6 h-6" /></div>
              <div>
                <h2 className="font-display font-bold text-lg text-white">About Page Footer CTA Banner</h2>
                <p className="text-text-muted text-xs mt-0.5">Edit call-to-action banner text and button labels</p>
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Badge Text</label>
                <input type="text" value={ctaBadge} onChange={(e) => setCtaBadge(e.target.value)} className="w-full bg-surface/80 border border-slate-800 rounded-xl px-4 py-3 text-white text-xs font-medium" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Headline</label>
                <input type="text" value={ctaHeadline} onChange={(e) => setCtaHeadline(e.target.value)} className="w-full bg-surface/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Subheadline</label>
                <textarea rows={2} value={ctaSubheadline} onChange={(e) => setCtaSubheadline(e.target.value)} className="w-full bg-surface/80 border border-slate-800 rounded-xl p-4 text-slate-300 text-xs" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Primary Button Text</label>
                  <input type="text" value={ctaPrimaryBtn} onChange={(e) => setCtaPrimaryBtn(e.target.value)} className="w-full bg-surface/80 border border-slate-800 rounded-xl px-4 py-3 text-amber-400 font-bold text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Secondary Button Text</label>
                  <input type="text" value={ctaSecondaryBtn} onChange={(e) => setCtaSecondaryBtn(e.target.value)} className="w-full bg-surface/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold text-xs" />
                </div>
              </div>
            </div>
          </div>
        )}

      </form>
    </div>
  );
}
