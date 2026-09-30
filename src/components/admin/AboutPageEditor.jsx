import React, { useState } from 'react';
import { 
  Save, CheckCircle2, Info, Shield, Users, Award, Target, 
  Building2, Handshake, Star, Quote, ArrowUp, ArrowDown, Plus, Trash2, FileText
} from 'lucide-react';

export default function AboutPageEditor({ cmsConfig, setCmsConfig }) {
  const [activeTab, setActiveTab] = useState('hero');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // About Hero
  const [heroBadge, setHeroBadge] = useState(cmsConfig?.aboutPage?.hero?.badge || "Official DET-Licensed Provider");
  const [heroTitle, setHeroTitle] = useState(cmsConfig?.aboutPage?.hero?.title || "About 800 DOCS — Your Trusted UAE Consultancy");
  const [heroSubtitle, setHeroSubtitle] = useState(cmsConfig?.aboutPage?.hero?.subtitle || "800 DOCS is a UAE-based consultancy providing comprehensive solutions for individuals, families, investors, entrepreneurs, and businesses — from residency and Golden Visas to business setup, corporate, property, and professional services.");

  // Welcome & CEO
  const [welcomeBadge, setWelcomeBadge] = useState(cmsConfig?.aboutPage?.welcome?.badge || "Welcome to 800 DOCS UAE");
  const [welcomeTitle, setWelcomeTitle] = useState(cmsConfig?.aboutPage?.welcome?.title || "A Strong Future Starts with a Strong Foundation");
  const [welcomeP1, setWelcomeP1] = useState(cmsConfig?.aboutPage?.welcome?.p1 || "As your trusted UAE consultancy partner, 800 DOCS helps individuals, families, investors, entrepreneurs, and businesses turn their goals into reality.");
  const [welcomeP2, setWelcomeP2] = useState(cmsConfig?.aboutPage?.welcome?.p2 || "From UAE residency and Golden Visas to business setup, property and professional services, we simplify complex processes and provide clear, reliable support — so you can move forward with confidence.");
  const [ceoName, setCeoName] = useState(cmsConfig?.aboutPage?.welcome?.ceo?.name || "Executive Director");
  const [ceoTitle, setCeoTitle] = useState(cmsConfig?.aboutPage?.welcome?.ceo?.title || "Founder & CEO, 800 DOCS");
  const [ceoQuote, setCeoQuote] = useState(cmsConfig?.aboutPage?.welcome?.ceo?.quote || "I built 800 DOCS with one purpose — to create a link between ambition and opportunity.");
  const [welcomeImage, setWelcomeImage] = useState(cmsConfig?.aboutPage?.welcome?.image || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop");

  // License Section
  const [licBadge, setLicBadge] = useState(cmsConfig?.aboutPage?.license?.badge || "DET Verified Authority");
  const [licTitle, setLicTitle] = useState(cmsConfig?.aboutPage?.license?.title || "Officially Licensed for Government Applications");
  const [licDesc, setLicDesc] = useState(cmsConfig?.aboutPage?.license?.description || "We are a registered Dubai consultancy, authorised to support and process your government applications with confidence and transparency.");
  const [licDays, setLicDays] = useState(cmsConfig?.aboutPage?.license?.daysImpact || "2500+");
  const [licAuthority, setLicAuthority] = useState(cmsConfig?.aboutPage?.license?.card?.authority || "Government of Dubai – Economy & Tourism (DET)");
  const [licNo, setLicNo] = useState(cmsConfig?.aboutPage?.license?.card?.licenseNo || "800-DOCS-LLC");
  const [licBizName, setLicBizName] = useState(cmsConfig?.aboutPage?.license?.card?.businessName || "800 DOCS Management Consultancy LLC");
  const [licRegDate, setLicRegDate] = useState(cmsConfig?.aboutPage?.license?.card?.registrationDate || "10/04/2015");
  const [licLegalType, setLicLegalType] = useState(cmsConfig?.aboutPage?.license?.card?.legalType || "LLC");
  const [licActivities, setLicActivities] = useState(cmsConfig?.aboutPage?.license?.card?.activities || "Management Consultancies | Documents Clearing Services | Project Development Consultant");

  // Strength in Numbers
  const [strBadge, setStrBadge] = useState(cmsConfig?.aboutPage?.strength?.badge || "Active");
  const [strTitle, setStrTitle] = useState(cmsConfig?.aboutPage?.strength?.title || "Our Strength in Numbers");
  const [strSubtitle, setStrSubtitle] = useState(cmsConfig?.aboutPage?.strength?.subtitle || "Trusted UAE Consultants with 10+ Years of Experience");
  const [strStats, setStrStats] = useState(cmsConfig?.aboutPage?.strength?.stats || [
    { value: "10+", label: "Years in Market" },
    { value: "4.9", label: "Google Rating" },
    { value: "25+", label: "Team Members" },
    { value: "15,000+", label: "Clients Assisted" }
  ]);

  // Vision & Mission
  const [vmBadge, setVmBadge] = useState(cmsConfig?.aboutPage?.visionMission?.badge || "Our Vision & Mission");
  const [vmTitle, setVmTitle] = useState(cmsConfig?.aboutPage?.visionMission?.title || "Your Goals Matter to Us");
  const [vmDesc, setVmDesc] = useState(cmsConfig?.aboutPage?.visionMission?.description || "At 800 DOCS, understanding your goals comes first.");
  const [vmTabs, setVmTabs] = useState(cmsConfig?.aboutPage?.visionMission?.tabs || [
    { id: "promise", label: "Our Promise", content: "To make every process simple, transparent, and stress-free." },
    { id: "mission", label: "Our Mission", content: "To empower entrepreneurs, investors, professionals, and families with reliable, personalized, and practical solutions." },
    { id: "vision", label: "Our Vision", content: "To be a trusted link between people and opportunities in the UAE." }
  ]);

  // Pillars (Why 800 DOCS)
  const [pillarsBadge, setPillarsBadge] = useState(cmsConfig?.aboutPage?.pillars?.badge || "Why 800 DOCS?");
  const [pillarsTitle, setPillarsTitle] = useState(cmsConfig?.aboutPage?.pillars?.title || "What Makes Us Different");
  const [pillarsItems, setPillarsItems] = useState(cmsConfig?.aboutPage?.pillars?.items || [
    { icon: "Shield", title: "Trust", desc: "We stand by you from your first enquiry to successful completion." },
    { icon: "CheckCircle2", title: "Reliability", desc: "Clear communication, responsive support, and commitments you can depend on." },
    { icon: "Diamond", title: "Transparency", desc: "Straightforward guidance, clear costs, and visibility at every stage." },
    { icon: "Users", title: "Client Experience", desc: "Personalised support designed to make every process simple and stress-free." },
    { icon: "Award", title: "Service Excellence", desc: "Professional service focused on quality, efficiency, and long-term client relationships." }
  ]);

  // Reviews
  const [reviewsBadge, setReviewsBadge] = useState(cmsConfig?.aboutPage?.reviews?.badge || "Client Success Stories | Trusted UAE Consultancy");
  const [reviewsTitle, setReviewsTitle] = useState(cmsConfig?.aboutPage?.reviews?.title || "Real Clients, Real Results");
  const [reviewsItems, setReviewsItems] = useState(cmsConfig?.aboutPage?.reviews?.items || [
    { name: "M J", text: "I highly recommend it, very professional and effective." },
    { name: "Tausif Ahmad", text: "Excellent service with prompt response and follow up action." },
    { name: "ZeeShan Butt", text: "Excellent service.. very Honest and helpful team." },
    { name: "Muhammad", text: "800 DOCS management deserved 100/100." }
  ]);

  // Business Setup CTA
  const [bizTitle, setBizTitle] = useState(cmsConfig?.aboutPage?.businessSetup?.title || "Start Your Dubai Business with Confidence");
  const [bizDesc, setBizDesc] = useState(cmsConfig?.aboutPage?.businessSetup?.description || "Whether you're starting a new business, expanding into the UAE, or relocating your company to Dubai, 800 DOCS provides end-to-end business setup support.");

  // Referral
  const [refTitle, setRefTitle] = useState(cmsConfig?.aboutPage?.referral?.title || "Grow Together with Our B2B Referral Program");
  const [refDesc, setRefDesc] = useState(cmsConfig?.aboutPage?.referral?.description || "Partner with 800 DOCS through our structured B2B and Corporate Referral Program.");
  const [refBtn, setRefBtn] = useState(cmsConfig?.aboutPage?.referral?.buttonText || "Become a Referral Partner");

  // Long Form Markdown Content
  const [contentMarkdown, setContentMarkdown] = useState(cmsConfig?.aboutPage?.contentMarkdown || "");

  const handleSave = (e) => {
    e.preventDefault();
    const aboutPageConfig = {
      hero: { badge: heroBadge, title: heroTitle, subtitle: heroSubtitle },
      welcome: { badge: welcomeBadge, title: welcomeTitle, p1: welcomeP1, p2: welcomeP2, image: welcomeImage, ceo: { name: ceoName, title: ceoTitle, quote: ceoQuote } },
      license: { badge: licBadge, title: licTitle, description: licDesc, daysImpact: licDays, card: { authority: licAuthority, licenseNo: licNo, businessName: licBizName, registrationDate: licRegDate, legalType: licLegalType, activities: licActivities } },
      strength: { badge: strBadge, title: strTitle, subtitle: strSubtitle, stats: strStats },
      visionMission: { badge: vmBadge, title: vmTitle, description: vmDesc, tabs: vmTabs },
      pillars: { badge: pillarsBadge, title: pillarsTitle, items: pillarsItems },
      reviews: { badge: reviewsBadge, title: reviewsTitle, items: reviewsItems },
      businessSetup: { title: bizTitle, description: bizDesc },
      referral: { title: refTitle, description: refDesc, buttonText: refBtn },
      contentMarkdown
    };

    if (setCmsConfig) {
      setCmsConfig(prev => ({ ...prev, aboutPage: aboutPageConfig }));
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  const tabsList = [
    { id: 'hero', label: 'Hero Section', icon: Info },
    { id: 'welcome', label: 'Welcome & CEO', icon: Quote },
    { id: 'license', label: 'DET License', icon: Shield },
    { id: 'strength', label: 'Stats / Numbers', icon: Award },
    { id: 'vision', label: 'Vision & Mission', icon: Target },
    { id: 'pillars', label: 'Why Us Pillars', icon: Star },
    { id: 'reviews', label: 'Client Reviews', icon: Users },
    { id: 'business', label: 'Business Setup CTA', icon: Building2 },
    { id: 'referral', label: 'Referral Program', icon: Handshake },
    { id: 'markdown', label: 'Long Form Markdown', icon: FileText }
  ];

  return (
    <div className="max-w-5xl space-y-8 animate-fadeIn">
      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-brand-gold/30 rounded-xl text-brand-goldLight text-sm font-bold flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>About page content published to Firebase! Live site updated.</span>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 bg-brand-surfaceLight border border-slate-800 p-2 rounded-xl shadow-xl">
        {tabsList.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button key={t.id} type="button" onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${isActive ? 'bg-brand-primary text-white shadow-md shadow-[#D4AF37]/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/80'}`}>
              <Icon className="w-3.5 h-3.5" /><span>{t.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSave} className="space-y-8">

        {/* HERO */}
        {activeTab === 'hero' && (
          <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="p-3 rounded-xl bg-brand-gold/15 text-brand-gold"><Info className="w-6 h-6" /></div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">About Page Hero Section</h2>
                <p className="text-slate-400 text-xs mt-0.5">Edit main headline, badge text, and subtitle</p>
              </div>
            </div>
            <div className="space-y-4">
              <div><label className="block text-xs font-bold text-slate-300 mb-2">Badge Text</label>
                <input type="text" value={heroBadge} onChange={(e) => setHeroBadge(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-bold text-sm focus:outline-none focus:border-brand-primary" /></div>
              <div><label className="block text-xs font-bold text-slate-300 mb-2">Hero Title</label>
                <input type="text" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-bold text-sm focus:outline-none focus:border-brand-primary" /></div>
              <div><label className="block text-xs font-bold text-slate-300 mb-2">Hero Subtitle</label>
                <textarea rows={3} value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-slate-200 text-xs leading-relaxed focus:outline-none focus:border-brand-primary" /></div>
            </div>
          </div>
        )}

        {/* WELCOME & CEO */}
        {activeTab === 'welcome' && (
          <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="p-3 rounded-xl bg-brand-gold/15 text-brand-gold"><Quote className="w-6 h-6" /></div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">Welcome Section & CEO Statement</h2>
                <p className="text-slate-400 text-xs mt-0.5">Edit welcome copy, CEO quote, and background image</p>
              </div>
            </div>
            <div className="space-y-4">
              <div><label className="block text-xs font-bold text-slate-300 mb-2">Section Badge</label>
                <input type="text" value={welcomeBadge} onChange={(e) => setWelcomeBadge(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-bold text-xs focus:outline-none focus:border-brand-primary" /></div>
              <div><label className="block text-xs font-bold text-slate-300 mb-2">Welcome Title</label>
                <input type="text" value={welcomeTitle} onChange={(e) => setWelcomeTitle(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-bold text-sm focus:outline-none focus:border-brand-primary" /></div>
              <div><label className="block text-xs font-bold text-slate-300 mb-2">Paragraph 1</label>
                <textarea rows={2} value={welcomeP1} onChange={(e) => setWelcomeP1(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-slate-200 text-xs focus:outline-none focus:border-brand-primary" /></div>
              <div><label className="block text-xs font-bold text-slate-300 mb-2">Paragraph 2</label>
                <textarea rows={2} value={welcomeP2} onChange={(e) => setWelcomeP2(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-slate-200 text-xs focus:outline-none focus:border-brand-primary" /></div>
              <div><label className="block text-xs font-bold text-slate-300 mb-2">Background Image URL</label>
                <input type="text" value={welcomeImage} onChange={(e) => setWelcomeImage(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-mono text-xs focus:outline-none focus:border-brand-primary" /></div>
              <div className="p-5 bg-brand-darkBg border border-slate-800 rounded-xl space-y-3">
                <span className="text-xs font-mono font-bold text-brand-goldLight">CEO / FOUNDER STATEMENT</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div><label className="block text-[10px] font-bold text-content-muted uppercase mb-1">Name</label>
                    <input type="text" value={ceoName} onChange={(e) => setCeoName(e.target.value)} className="w-full bg-brand-surfaceLight border border-slate-800 rounded-xl p-3 text-white text-xs font-bold" /></div>
                  <div><label className="block text-[10px] font-bold text-content-muted uppercase mb-1">Title</label>
                    <input type="text" value={ceoTitle} onChange={(e) => setCeoTitle(e.target.value)} className="w-full bg-brand-surfaceLight border border-slate-800 rounded-xl p-3 text-white text-xs" /></div>
                </div>
                <div><label className="block text-[10px] font-bold text-content-muted uppercase mb-1">Quote</label>
                  <textarea rows={3} value={ceoQuote} onChange={(e) => setCeoQuote(e.target.value)} className="w-full bg-brand-surfaceLight border border-slate-800 rounded-xl p-3 text-slate-200 text-xs italic" /></div>
              </div>
            </div>
          </div>
        )}

        {/* DET LICENSE */}
        {activeTab === 'license' && (
          <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="p-3 rounded-xl bg-brand-gold/15 text-brand-gold"><Shield className="w-6 h-6" /></div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">DET License & Accreditation Card</h2>
                <p className="text-slate-400 text-xs mt-0.5">Edit license verification card displayed on About page</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-xs font-bold text-slate-300 mb-2">Badge Text</label>
                  <input type="text" value={licBadge} onChange={(e) => setLicBadge(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-3 text-white text-xs font-bold" /></div>
                <div><label className="block text-xs font-bold text-slate-300 mb-2">Days Impact Counter</label>
                  <input type="text" value={licDays} onChange={(e) => setLicDays(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-3 text-brand-goldLight font-mono text-xs font-bold" /></div>
              </div>
              <div><label className="block text-xs font-bold text-slate-300 mb-2">Section Title</label>
                <input type="text" value={licTitle} onChange={(e) => setLicTitle(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-bold text-sm" /></div>
              <div><label className="block text-xs font-bold text-slate-300 mb-2">Description</label>
                <textarea rows={2} value={licDesc} onChange={(e) => setLicDesc(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-slate-200 text-xs" /></div>
              <div className="p-5 bg-brand-darkBg border border-slate-800 rounded-xl space-y-3">
                <span className="text-xs font-mono font-bold text-brand-goldLight">LICENSE CARD DETAILS</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div><label className="block text-[10px] font-bold text-content-muted uppercase mb-1">Authority</label>
                    <input type="text" value={licAuthority} onChange={(e) => setLicAuthority(e.target.value)} className="w-full bg-brand-surfaceLight border border-slate-800 rounded-xl p-3 text-white text-xs" /></div>
                  <div><label className="block text-[10px] font-bold text-content-muted uppercase mb-1">License No.</label>
                    <input type="text" value={licNo} onChange={(e) => setLicNo(e.target.value)} className="w-full bg-brand-surfaceLight border border-slate-800 rounded-xl p-3 text-white text-xs font-mono" /></div>
                  <div><label className="block text-[10px] font-bold text-content-muted uppercase mb-1">Business Name</label>
                    <input type="text" value={licBizName} onChange={(e) => setLicBizName(e.target.value)} className="w-full bg-brand-surfaceLight border border-slate-800 rounded-xl p-3 text-white text-xs" /></div>
                  <div><label className="block text-[10px] font-bold text-content-muted uppercase mb-1">Registration Date</label>
                    <input type="text" value={licRegDate} onChange={(e) => setLicRegDate(e.target.value)} className="w-full bg-brand-surfaceLight border border-slate-800 rounded-xl p-3 text-white text-xs font-mono" /></div>
                  <div><label className="block text-[10px] font-bold text-content-muted uppercase mb-1">Legal Type</label>
                    <input type="text" value={licLegalType} onChange={(e) => setLicLegalType(e.target.value)} className="w-full bg-brand-surfaceLight border border-slate-800 rounded-xl p-3 text-white text-xs" /></div>
                </div>
                <div><label className="block text-[10px] font-bold text-content-muted uppercase mb-1">Approved Activities</label>
                  <textarea rows={2} value={licActivities} onChange={(e) => setLicActivities(e.target.value)} className="w-full bg-brand-surfaceLight border border-slate-800 rounded-xl p-3 text-slate-300 text-xs" /></div>
              </div>
            </div>
          </div>
        )}

        {/* STRENGTH IN NUMBERS */}
        {activeTab === 'strength' && (
          <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="p-3 rounded-xl bg-brand-gold/15 text-brand-gold"><Award className="w-6 h-6" /></div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">Strength in Numbers Statistics</h2>
                <p className="text-slate-400 text-xs mt-0.5">Edit stat counters and section headline</p>
              </div>
            </div>
            <div className="space-y-4">
              <div><label className="block text-xs font-bold text-slate-300 mb-2">Section Title</label>
                <input type="text" value={strTitle} onChange={(e) => setStrTitle(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-bold text-sm" /></div>
              <div><label className="block text-xs font-bold text-slate-300 mb-2">Subtitle</label>
                <input type="text" value={strSubtitle} onChange={(e) => setStrSubtitle(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-slate-200 text-xs" /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {strStats.map((stat, idx) => (
                  <div key={idx} className="p-4 bg-brand-darkBg border border-slate-800 rounded-xl space-y-2">
                    <span className="text-xs font-mono font-bold text-brand-goldLight">STAT #{idx + 1}</span>
                    <input type="text" value={stat.value} onChange={(e) => { const u = [...strStats]; u[idx].value = e.target.value; setStrStats(u); }} placeholder="Value" className="w-full bg-brand-surfaceLight border border-slate-800 rounded-xl p-3 text-white font-bold text-sm" />
                    <input type="text" value={stat.label} onChange={(e) => { const u = [...strStats]; u[idx].label = e.target.value; setStrStats(u); }} placeholder="Label" className="w-full bg-brand-surfaceLight border border-slate-800 rounded-xl p-3 text-slate-300 text-xs" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VISION & MISSION */}
        {activeTab === 'vision' && (
          <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="p-3 rounded-xl bg-brand-gold/15 text-brand-gold"><Target className="w-6 h-6" /></div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">Vision & Mission Tabs</h2>
                <p className="text-slate-400 text-xs mt-0.5">Edit Promise, Mission, and Vision tab content</p>
              </div>
            </div>
            <div className="space-y-4">
              <div><label className="block text-xs font-bold text-slate-300 mb-2">Section Title</label>
                <input type="text" value={vmTitle} onChange={(e) => setVmTitle(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-bold text-sm" /></div>
              <div><label className="block text-xs font-bold text-slate-300 mb-2">Section Description</label>
                <textarea rows={2} value={vmDesc} onChange={(e) => setVmDesc(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-slate-200 text-xs" /></div>
              {vmTabs.map((tab, idx) => (
                <div key={tab.id} className="p-4 bg-brand-darkBg border border-slate-800 rounded-xl space-y-3">
                  <span className="text-xs font-mono font-bold text-brand-goldLight">TAB: {tab.label}</span>
                  <input type="text" value={tab.label} onChange={(e) => { const u = [...vmTabs]; u[idx].label = e.target.value; setVmTabs(u); }} className="w-full bg-brand-surfaceLight border border-slate-800 rounded-xl p-3 text-white text-xs font-bold" />
                  <textarea rows={3} value={tab.content} onChange={(e) => { const u = [...vmTabs]; u[idx].content = e.target.value; setVmTabs(u); }} className="w-full bg-brand-surfaceLight border border-slate-800 rounded-xl p-3 text-slate-300 text-xs" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PILLARS */}
        {activeTab === 'pillars' && (
          <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="p-3 rounded-xl bg-brand-primary/15 text-brand-primary"><Star className="w-6 h-6" /></div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">Why 800 DOCS — 5 Pillars</h2>
                <p className="text-slate-400 text-xs mt-0.5">Edit trust, reliability, transparency pillar cards</p>
              </div>
            </div>
            <div className="space-y-4">
              <div><label className="block text-xs font-bold text-slate-300 mb-2">Section Title</label>
                <input type="text" value={pillarsTitle} onChange={(e) => setPillarsTitle(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-bold text-sm" /></div>
              {pillarsItems.map((item, idx) => (
                <div key={idx} className="p-4 bg-brand-darkBg border border-slate-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-brand-primary">PILLAR #{idx + 1}</span>
                    <button type="button" onClick={() => { const u = [...pillarsItems]; u.splice(idx, 1); setPillarsItems(u); }} className="p-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/20"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="text" value={item.title} onChange={(e) => { const u = [...pillarsItems]; u[idx].title = e.target.value; setPillarsItems(u); }} placeholder="Pillar Title" className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-3 text-white text-xs font-bold" />
                    <input type="text" value={item.icon} onChange={(e) => { const u = [...pillarsItems]; u[idx].icon = e.target.value; setPillarsItems(u); }} placeholder="Icon name (Shield, Users, etc)" className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-3 text-slate-400 font-mono text-xs" />
                  </div>
                  <textarea rows={2} value={item.desc} onChange={(e) => { const u = [...pillarsItems]; u[idx].desc = e.target.value; setPillarsItems(u); }} className="w-full bg-brand-surfaceLight border border-slate-800 rounded-xl p-3 text-slate-300 text-xs" />
                </div>
              ))}
              <button type="button" onClick={() => setPillarsItems([...pillarsItems, { icon: "Star", title: "New Pillar", desc: "Description" }])} className="w-full py-3 rounded-xl border-2 border-dashed border-slate-700 text-slate-400 font-bold text-xs hover:border-brand-primary hover:text-brand-primary transition-colors flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Add Pillar
              </button>
            </div>
          </div>
        )}

        {/* REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="p-3 rounded-xl bg-brand-gold/15 text-brand-gold"><Users className="w-6 h-6" /></div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">Client Success Reviews</h2>
                <p className="text-slate-400 text-xs mt-0.5">Edit client testimonials on About page</p>
              </div>
            </div>
            <div className="space-y-4">
              <div><label className="block text-xs font-bold text-slate-300 mb-2">Section Title</label>
                <input type="text" value={reviewsTitle} onChange={(e) => setReviewsTitle(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-bold text-sm" /></div>
              {reviewsItems.map((rev, idx) => (
                <div key={idx} className="p-4 bg-brand-darkBg border border-slate-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-brand-goldLight">REVIEW #{idx + 1}</span>
                    <button type="button" onClick={() => { const u = [...reviewsItems]; u.splice(idx, 1); setReviewsItems(u); }} className="p-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/20"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                  <input type="text" value={rev.name} onChange={(e) => { const u = [...reviewsItems]; u[idx].name = e.target.value; setReviewsItems(u); }} placeholder="Client Name" className="w-full bg-brand-surfaceLight border border-slate-800 rounded-xl p-3 text-white text-xs font-bold" />
                  <textarea rows={2} value={rev.text} onChange={(e) => { const u = [...reviewsItems]; u[idx].text = e.target.value; setReviewsItems(u); }} placeholder="Review Text" className="w-full bg-brand-surfaceLight border border-slate-800 rounded-xl p-3 text-slate-300 text-xs" />
                </div>
              ))}
              <button type="button" onClick={() => setReviewsItems([...reviewsItems, { name: "New Client", text: "Great service!" }])} className="w-full py-3 rounded-xl border-2 border-dashed border-slate-700 text-slate-400 font-bold text-xs hover:border-brand-primary hover:text-brand-primary transition-colors flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Add Review
              </button>
            </div>
          </div>
        )}

        {/* BUSINESS SETUP CTA */}
        {activeTab === 'business' && (
          <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="p-3 rounded-xl bg-brand-gold/15 text-brand-gold"><Building2 className="w-6 h-6" /></div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">Business Setup CTA Block</h2>
                <p className="text-slate-400 text-xs mt-0.5">Edit the business setup call-to-action section</p>
              </div>
            </div>
            <div className="space-y-4">
              <div><label className="block text-xs font-bold text-slate-300 mb-2">CTA Title</label>
                <input type="text" value={bizTitle} onChange={(e) => setBizTitle(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-bold text-sm" /></div>
              <div><label className="block text-xs font-bold text-slate-300 mb-2">CTA Description</label>
                <textarea rows={3} value={bizDesc} onChange={(e) => setBizDesc(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-slate-200 text-xs leading-relaxed" /></div>
            </div>
          </div>
        )}

        {/* REFERRAL PROGRAM */}
        {activeTab === 'referral' && (
          <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="p-3 rounded-xl bg-brand-gold/15 text-brand-gold"><Handshake className="w-6 h-6" /></div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">B2B Referral Program Block</h2>
                <p className="text-slate-400 text-xs mt-0.5">Edit the referral CTA and button text</p>
              </div>
            </div>
            <div className="space-y-4">
              <div><label className="block text-xs font-bold text-slate-300 mb-2">Referral Section Title</label>
                <input type="text" value={refTitle} onChange={(e) => setRefTitle(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-bold text-sm" /></div>
              <div><label className="block text-xs font-bold text-slate-300 mb-2">Referral Description</label>
                <textarea rows={3} value={refDesc} onChange={(e) => setRefDesc(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-slate-200 text-xs leading-relaxed" /></div>
              <div><label className="block text-xs font-bold text-slate-300 mb-2">Button Text</label>
                <input type="text" value={refBtn} onChange={(e) => setRefBtn(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-bold text-xs" /></div>
            </div>
          </div>
        )}

        {/* LONG FORM MARKDOWN */}
        {activeTab === 'markdown' && (
          <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="p-3 rounded-xl bg-emerald-500/15 text-emerald-500"><FileText className="w-6 h-6" /></div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">Additional Details & History (Markdown)</h2>
                <p className="text-slate-400 text-xs mt-0.5">Provide long-form text, comprehensive company history, and more using Markdown</p>
              </div>
            </div>
            <div className="space-y-4">
              <div><label className="block text-xs font-bold text-slate-300 mb-2">Detailed About Us Content</label>
                <textarea rows={15} placeholder="## Our History&#10;&#10;In 2010 we started..." value={contentMarkdown} onChange={(e) => setContentMarkdown(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-slate-200 text-xs font-mono leading-relaxed focus:outline-none focus:border-brand-primary" /></div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <button type="submit" className="w-full py-4 bg-gold-gradient btn-shine-effect text-black font-extrabold hover:brightness-110 text-base rounded-xl shadow-xl shadow-[#D4AF37]/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer">
          <Save className="w-5 h-5" />
          <span>Publish About Page Changes</span>
        </button>
      </form>
    </div>
  );
}
