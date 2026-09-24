import React, { useState } from 'react';
import { 
  Layout, Save, CheckCircle2, ShieldCheck, 
  BarChart2, Award, AlertTriangle, Layers, 
  CheckCircle, Workflow, HelpCircle, Star, Megaphone, Plus, Trash2,
  Grid, Clock, BookOpen, ArrowUp, ArrowDown
} from 'lucide-react';

export default function HomepageEditor({ cmsConfig, setCmsConfig, initialSection }) {
  const [activeSection, setActiveSection] = useState(initialSection || 'hero');
  const [savedSuccess, setSavedSuccess] = useState(false);

  React.useEffect(() => {
    if (initialSection) setActiveSection(initialSection);
  }, [initialSection]);

  // 1. Hero State
  const [heroHeadline, setHeroHeadline] = useState(cmsConfig?.hero?.mainHeadline || "Bring your family to the UAE without the paperwork headache.");
  const [heroSubtext, setHeroSubtext] = useState(cmsConfig?.hero?.subtext || "We prepare, submit, and track family residence visas, 10-Year Golden Visas, and Emirates ID applications...");
  const [badge1, setBadge1] = useState(cmsConfig?.hero?.stat1 || "Free eligibility check before any fee");
  const [badge2, setBadge2] = useState(cmsConfig?.hero?.stat2 || "Fixed service fee, government at cost");
  const [badge3, setBadge3] = useState(cmsConfig?.hero?.stat3 || "Most files completed in 5-10 days");

  // 2. Stats Bar State
  const [statsTitle, setStatsTitle] = useState(cmsConfig?.stats?.title || "Trusted by 15,000+ Families Across Dubai & Abu Dhabi");
  const [statsSubtext, setStatsSubtext] = useState(cmsConfig?.stats?.subtext || "Live status indicators synced with ICP and GDRFA government filing portals.");
  const [m1Val, setM1Val] = useState(cmsConfig?.stats?.metric1Val || "15,000+");
  const [m1Lbl, setM1Lbl] = useState(cmsConfig?.stats?.metric1Label || "Residency Visas Issued");
  const [m2Val, setM2Val] = useState(cmsConfig?.stats?.metric2Val || "99.8%");
  const [m2Lbl, setM2Lbl] = useState(cmsConfig?.stats?.metric2Label || "ICP Approval Rate");
  const [m3Val, setM3Val] = useState(cmsConfig?.stats?.metric3Val || "5-10 Days");
  const [m3Lbl, setM3Lbl] = useState(cmsConfig?.stats?.metric3Label || "Average Turnaround");
  const [m4Val, setM4Val] = useState(cmsConfig?.stats?.metric4Val || "15 Mins");
  const [m4Lbl, setM4Lbl] = useState(cmsConfig?.stats?.metric4Label || "WhatsApp Response Time");

  // 3. Achievements State
  const [achTitle, setAchTitle] = useState(cmsConfig?.achievements?.title || "Official Recognition & Government Excellence Awards");
  const [achSubtext, setAchSubtext] = useState(cmsConfig?.achievements?.subtext || "Authorized document clearing partner operating under license from Dubai Economy & Tourism (DET).");
  const [achievementsList, setAchievementsList] = useState(
    cmsConfig?.achievements?.items || [
      { id: 'ach-1', title: 'Top GDRFA Document Clearing Partner 2025', badge: 'GOLD AWARD', desc: 'Recognized for highest compliance and zero rejected family residency dossiers in Dubai.' },
      { id: 'ach-2', title: '100% Digital SLA Fast-Track Accreditation', badge: 'ICP ACCREDITED', desc: 'Direct API filing with ICP Federal Authority for Identity, Citizenship, Customs & Port Security.' },
      { id: 'ach-3', title: 'Dubai Land Department Golden Visa Specialist', badge: 'DLD CERTIFIED', desc: 'Specialized VIP real estate title deed verification for 10-Year Golden Residency approvals.' }
    ]
  );

  // 4. Problems We Solve State
  const [probTitle, setProbTitle] = useState(cmsConfig?.problems?.title || "Why DIY Family Visa Processing Fails in Dubai");
  const [probSubtext, setProbSubtext] = useState(cmsConfig?.problems?.subtext || "Avoid fines, unexpected rejections, and endless queues with dedicated PRO management.");
  const [problemsList, setProblemsList] = useState(
    cmsConfig?.problems?.items || [
      { id: 'prb-1', problemTitle: 'Confusing Statutory Fees & Hidden Charges', solutionTitle: 'Itemized Government Price Guarantee', desc: 'Typing centers often add hidden surcharges. We provide unbundled fee breakdowns before taking any payment.' },
      { id: 'prb-2', problemTitle: 'Attestation & MOFA Compliance Rejections', solutionTitle: 'Pre-Audit Document Verification', desc: 'Missing legalizations cause automatic ICP rejections. We verify your birth and marriage certificates before submission.' },
      { id: 'prb-3', problemTitle: 'Wasted Hours in Typing Centers & Medical Centers', solutionTitle: 'VIP Chauffeur & 30-Min Medical Fast-Track', desc: 'Skip standard lines. We arrange home biometrics or VIP Smart Medical appointments with 30-min result delivery.' }
    ]
  );

  // 5. Categorized Services State
  const [servTitle, setServTitle] = useState(cmsConfig?.services?.title || "All-Inclusive Family & Investor Visa Services");
  const [servSubtext, setServSubtext] = useState(cmsConfig?.services?.subtext || "Select your dependant category to calculate government fees and view required documents.");
  const [servicesList, setServicesList] = useState(cmsConfig?.services?.items || []);

  // 6. Packages State
  const [pkgTitle, setPkgTitle] = useState(cmsConfig?.packages?.title || "Unbundled Service Retainer Packages");
  const [pkgSubtext, setPkgSubtext] = useState(cmsConfig?.packages?.subtext || "Choose your preferred level of advisory support. All government fees are billed strictly at cost.");
  const [packagesList, setPackagesList] = useState(cmsConfig?.packages?.items || []);

  // 7. Why Us State
  const [whyTitle, setWhyTitle] = useState(cmsConfig?.whyUs?.title || "Why Families Choose Us Over Typing Centers");
  const [whySubtext, setWhySubtext] = useState(cmsConfig?.whyUs?.subtext || "Combining digital speed with VIP white-glove advisory.");
  const [whyUsList, setWhyUsList] = useState(cmsConfig?.whyUs?.items || []);

  // 8. Process Workflow State
  const [procTitle, setProcTitle] = useState(cmsConfig?.process?.title || "How We Process Your Family Residency");
  const [procSubtext, setProcSubtext] = useState(cmsConfig?.process?.subtext || "Clear timeline from initial document review to passport stamping.");
  const [processList, setProcessList] = useState(cmsConfig?.process?.steps || []);

  // 9. FAQs Accordion State
  const [faqsTitle, setFaqsTitle] = useState(cmsConfig?.faqs?.title || "Everything You Need to Know About UAE Family Visas");
  const [faqsSubtext, setFaqsSubtext] = useState(cmsConfig?.faqs?.subtext || "Got questions about salary thresholds, Ejari, or medical tests? We have answers.");
  const [faqItems, setFaqItems] = useState(
    cmsConfig?.faqs?.items || [
      { id: 'faq-1', question: 'What is the minimum salary required to sponsor a spouse in Dubai?', answer: 'The sponsor must have a minimum monthly salary of AED 4,000 or AED 3,000 plus housing (Ejari).' },
      { id: 'faq-2', question: 'Can I sponsor my parents under a residency visa?', answer: 'Yes! Sponsoring parents requires a minimum monthly salary of AED 20,000 and a 2-bedroom tenancy contract (Ejari).' },
      { id: 'faq-3', question: 'How long does the 10-Year Golden Visa take to complete?', answer: 'Initial nomination is approved within 24-48 hours. The complete process takes 5 to 7 working days.' }
    ]
  );

  // 10. Reviews State
  const [revTitle, setRevTitle] = useState(cmsConfig?.reviews?.title || "What Families Say About Our PRO Advisory");
  const [revSubtext, setRevSubtext] = useState(cmsConfig?.reviews?.subtext || "Over 500+ five-star reviews on Google & Trustpilot.");

  // 11. Blog Teaser State
  const [blogTitle, setBlogTitle] = useState(cmsConfig?.blogSection?.title || "Latest UAE Visa & Residency Guides");
  const [blogSubtext, setBlogSubtext] = useState(cmsConfig?.blogSection?.subtext || "Expert insights on Golden Visas, GDRFA rules, and document attestations.");

  // 12. Final CTA State
  const [ctaHeadline, setCtaHeadline] = useState(cmsConfig?.cta?.headline || "Ready to Sponsor Your Family in the UAE?");
  const [ctaSubtext, setCtaSubtext] = useState(cmsConfig?.cta?.subtext || "Get an itemized fee breakdown in 30 seconds or chat with a Senior PRO Consultant now.");

  const handleSave = (e) => {
    e.preventDefault();
    if (setCmsConfig) {
      setCmsConfig(prev => ({
        ...prev,
        hero: { ...prev?.hero, mainHeadline: heroHeadline, subtext: heroSubtext, stat1: badge1, stat2: badge2, stat3: badge3 },
        stats: { ...prev?.stats, title: statsTitle, subtext: statsSubtext, metric1Val: m1Val, metric1Label: m1Lbl, metric2Val: m2Val, metric2Label: m2Lbl, metric3Val: m3Val, metric3Label: m3Lbl, metric4Val: m4Val, metric4Label: m4Lbl },
        achievements: { ...prev?.achievements, title: achTitle, subtext: achSubtext, items: achievementsList },
        problems: { ...prev?.problems, title: probTitle, subtext: probSubtext, items: problemsList },
        services: {
          ...prev?.services,
          title: servTitle,
          subtext: servSubtext,
          items: servicesList
        },
        packages: {
          ...prev?.packages,
          title: pkgTitle,
          subtext: pkgSubtext,
          items: packagesList
        },
        whyUs: {
          ...prev?.whyUs,
          title: whyTitle,
          subtext: whySubtext,
          items: whyUsList
        },
        process: {
          ...prev?.process,
          title: procTitle,
          subtext: procSubtext,
          steps: processList
        },
        faqs: { ...prev?.faqs, title: faqsTitle, subtext: faqsSubtext, items: faqItems },
        reviews: { ...prev?.reviews, title: revTitle, subtext: revSubtext },
        blogSection: { title: blogTitle, subtext: blogSubtext },
        cta: { ...prev?.cta, headline: ctaHeadline, subtext: ctaSubtext }
      }));
    }

    if (typeof window !== 'undefined') {
      const currentConfig = cmsConfig || {};
      const updatedConfig = {
        ...currentConfig,
        hero: { ...currentConfig?.hero, mainHeadline: heroHeadline, subtext: heroSubtext, stat1: badge1, stat2: badge2, stat3: badge3 },
        stats: { ...currentConfig?.stats, title: statsTitle, subtext: statsSubtext, metric1Val: m1Val, metric1Label: m1Lbl, metric2Val: m2Val, metric2Label: m2Lbl, metric3Val: m3Val, metric3Label: m3Lbl, metric4Val: m4Val, metric4Label: m4Lbl },
        achievements: { ...currentConfig?.achievements, title: achTitle, subtext: achSubtext, items: achievementsList },
        problems: { ...currentConfig?.problems, title: probTitle, subtext: probSubtext, items: problemsList },
        services: { ...currentConfig?.services, title: servTitle, subtext: servSubtext, items: servicesList },
        packages: { ...currentConfig?.packages, title: pkgTitle, subtext: pkgSubtext, items: packagesList },
        whyUs: { ...currentConfig?.whyUs, title: whyTitle, subtext: whySubtext, items: whyUsList },
        process: { ...currentConfig?.process, title: procTitle, subtext: procSubtext, steps: processList },
        faqs: { ...currentConfig?.faqs, title: faqsTitle, subtext: faqsSubtext, items: faqItems },
        reviews: { ...currentConfig?.reviews, title: revTitle, subtext: revSubtext },
        blogSection: { title: blogTitle, subtext: blogSubtext },
        cta: { ...currentConfig?.cta, headline: ctaHeadline, subtext: ctaSubtext }
      };
      localStorage.setItem('app_cms_config', JSON.stringify(updatedConfig));
    }

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const sectionsList = [
    { id: 'hero', label: '1. Hero', icon: Layout },
    { id: 'stats', label: '2. Stats Bar', icon: BarChart2 },
    { id: 'achievements', label: '3. Achievements', icon: Award },
    { id: 'problems', label: '4. Problems', icon: AlertTriangle },
    { id: 'services', label: '5. Services Grid', icon: Grid },
    { id: 'packages', label: '6. Packages', icon: Layers },
    { id: 'whyUs', label: '7. Why Choose Us', icon: CheckCircle },
    { id: 'process', label: '8. 4-Step Process', icon: Workflow },
    { id: 'faqs', label: '9. FAQs Accordion', icon: HelpCircle },
    { id: 'reviews', label: '10. Reviews', icon: Star },
    { id: 'blog', label: '11. Blog Teaser', icon: BookOpen },
    { id: 'cta', label: '12. CTA Banner', icon: Megaphone }
  ];

  return (
    <div className="max-w-5xl space-y-8 animate-fadeIn">
      
      {savedSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-sm font-bold flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Homepage section updates published! Live website updated seamlessly.</span>
        </div>
      )}

      {/* Sub-Tabs for All 12 Homepage Sections */}
      <div className="flex flex-wrap gap-2 bg-slate-900 border border-slate-800 p-2 rounded-2xl shadow-xl">
        {sectionsList.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveSection(sec.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                isActive 
                  ? 'bg-[#E01E37] text-white shadow-md shadow-[#E01E37]/20' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{sec.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* SECTION 1: HERO & BADGES */}
        {activeSection === 'hero' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
                <div className="p-3 rounded-2xl bg-[#E01E37]/15 text-[#E01E37]">
                  <Layout className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-display font-extrabold text-xl text-white">1. Hero Section Text & Badges</h2>
                  <p className="text-slate-400 text-xs mt-0.5">Edit main hero copy displayed at the top of the homepage</p>
                </div>
              </div>

              <div className="space-y-6">


                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">Main Hero Headline</label>
                  <textarea
                    rows={2}
                    value={heroHeadline}
                    onChange={(e) => setHeroHeadline(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold text-base focus:outline-none focus:border-[#E01E37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">Hero Subtext Description</label>
                  <textarea
                    rows={3}
                    value={heroSubtext}
                    onChange={(e) => setHeroSubtext(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 text-xs leading-relaxed focus:outline-none focus:border-[#E01E37]"
                  />
                </div>
              </div>
            </div>

            {/* 3 Callout Badges */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
                <div className="p-3 rounded-2xl bg-amber-500/15 text-amber-500">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-display font-extrabold text-xl text-white">Trust Badges</h2>
                  <p className="text-slate-400 text-xs mt-0.5">3 stat callouts under the main headline</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Badge 1</label>
                  <input
                    type="text"
                    value={badge1}
                    onChange={(e) => setBadge1(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold text-xs focus:outline-none focus:border-[#E01E37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Badge 2</label>
                  <input
                    type="text"
                    value={badge2}
                    onChange={(e) => setBadge2(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold text-xs focus:outline-none focus:border-[#E01E37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Badge 3</label>
                  <input
                    type="text"
                    value={badge3}
                    onChange={(e) => setBadge3(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold text-xs focus:outline-none focus:border-[#E01E37]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: METRICS & STATS BAR */}
        {activeSection === 'stats' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="p-3 rounded-2xl bg-blue-500/15 text-blue-500">
                <BarChart2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">2. Live Metrics & Stats Counter Bar</h2>
                <p className="text-slate-400 text-xs mt-0.5">Edit 4 statistical figures shown in the counter bar</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Stats Section Title</label>
                <input
                  type="text"
                  value={statsTitle}
                  onChange={(e) => setStatsTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold text-sm focus:outline-none focus:border-[#E01E37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                  <label className="block text-xs font-mono font-bold text-blue-400 uppercase">Metric 1</label>
                  <input type="text" value={m1Val} onChange={(e) => setM1Val(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white font-bold text-sm" />
                  <input type="text" value={m1Lbl} onChange={(e) => setM1Lbl(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 text-xs" />
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                  <label className="block text-xs font-mono font-bold text-emerald-400 uppercase">Metric 2</label>
                  <input type="text" value={m2Val} onChange={(e) => setM2Val(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white font-bold text-sm" />
                  <input type="text" value={m2Lbl} onChange={(e) => setM2Lbl(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 text-xs" />
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                  <label className="block text-xs font-mono font-bold text-purple-400 uppercase">Metric 3</label>
                  <input type="text" value={m3Val} onChange={(e) => setM3Val(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white font-bold text-sm" />
                  <input type="text" value={m3Lbl} onChange={(e) => setM3Lbl(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 text-xs" />
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                  <label className="block text-xs font-mono font-bold text-amber-400 uppercase">Metric 4</label>
                  <input type="text" value={m4Val} onChange={(e) => setM4Val(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white font-bold text-sm" />
                  <input type="text" value={m4Lbl} onChange={(e) => setM4Lbl(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 text-xs" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: ACHIEVEMENTS */}
        {activeSection === 'achievements' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/15 text-amber-500">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-display font-extrabold text-xl text-white">3. Achievements & Awards</h2>
                  <p className="text-slate-400 text-xs mt-0.5">Edit official awards and government badges</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Section Headline</label>
                <input type="text" value={achTitle} onChange={(e) => setAchTitle(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold text-sm" />
              </div>

              <div className="space-y-4">
                {achievementsList.map((ach, idx) => (
                  <div key={ach.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-amber-400">ACHIEVEMENT ITEM #{idx + 1}</span>
                      <div className="flex items-center gap-1.5">
                        <button type="button" disabled={idx === 0} onClick={() => { const u = [...achievementsList]; const temp = u[idx-1]; u[idx-1] = u[idx]; u[idx] = temp; setAchievementsList(u); }} className={`p-1.5 rounded-lg border transition-colors ${idx === 0 ? 'border-slate-800 text-slate-600' : 'border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800'}`}><ArrowUp className="w-3.5 h-3.5" /></button>
                        <button type="button" disabled={idx === achievementsList.length - 1} onClick={() => { const u = [...achievementsList]; const temp = u[idx+1]; u[idx+1] = u[idx]; u[idx] = temp; setAchievementsList(u); }} className={`p-1.5 rounded-lg border transition-colors ${idx === achievementsList.length - 1 ? 'border-slate-800 text-slate-600' : 'border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800'}`}><ArrowDown className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input type="text" value={ach.title} onChange={(e) => { const u = [...achievementsList]; u[idx].title = e.target.value; setAchievementsList(u); }} className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-xs font-bold" />
                      <input type="text" value={ach.badge} onChange={(e) => { const u = [...achievementsList]; u[idx].badge = e.target.value; setAchievementsList(u); }} className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-amber-400 font-mono text-xs font-bold" />
                    </div>
                    <textarea rows={2} value={ach.desc} onChange={(e) => { const u = [...achievementsList]; u[idx].desc = e.target.value; setAchievementsList(u); }} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 text-xs" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: PROBLEMS */}
        {activeSection === 'problems' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="p-3 rounded-2xl bg-rose-500/15 text-rose-500">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">4. The Problems We Solve</h2>
                <p className="text-slate-400 text-xs mt-0.5">Edit customer pain points and PRO solutions</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Section Headline</label>
                <input type="text" value={probTitle} onChange={(e) => setProbTitle(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold text-sm" />
              </div>

              <div className="space-y-4">
                {problemsList.map((prb, idx) => (
                  <div key={prb.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-rose-400">CARD #{idx + 1}</span>
                      <div className="flex items-center gap-1.5">
                        <button type="button" disabled={idx === 0} onClick={() => { const u = [...problemsList]; const temp = u[idx-1]; u[idx-1] = u[idx]; u[idx] = temp; setProblemsList(u); }} className={`p-1.5 rounded-lg border transition-colors ${idx === 0 ? 'border-slate-800 text-slate-600' : 'border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800'}`}><ArrowUp className="w-3.5 h-3.5" /></button>
                        <button type="button" disabled={idx === problemsList.length - 1} onClick={() => { const u = [...problemsList]; const temp = u[idx+1]; u[idx+1] = u[idx]; u[idx] = temp; setProblemsList(u); }} className={`p-1.5 rounded-lg border transition-colors ${idx === problemsList.length - 1 ? 'border-slate-800 text-slate-600' : 'border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800'}`}><ArrowDown className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input type="text" value={prb.problemTitle} onChange={(e) => { const u = [...problemsList]; u[idx].problemTitle = e.target.value; setProblemsList(u); }} className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-rose-300 font-bold text-xs" />
                      <input type="text" value={prb.solutionTitle} onChange={(e) => { const u = [...problemsList]; u[idx].solutionTitle = e.target.value; setProblemsList(u); }} className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-emerald-400 font-bold text-xs" />
                    </div>
                    <textarea rows={2} value={prb.desc} onChange={(e) => { const u = [...problemsList]; u[idx].desc = e.target.value; setProblemsList(u); }} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-200 text-xs" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: SERVICES GRID */}
        {activeSection === 'services' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="p-3 rounded-2xl bg-cyan-500/15 text-cyan-500">
                <Grid className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">5. Categorized Services Grid</h2>
                <p className="text-slate-400 text-xs mt-0.5">Edit main services grid header and category text</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Services Section Headline</label>
                <input type="text" value={servTitle} onChange={(e) => setServTitle(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Services Subtext</label>
                <textarea rows={2} value={servSubtext} onChange={(e) => setServSubtext(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 text-xs" />
              </div>

              {/* Services List UI */}
              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate-300 mb-2">Categorized Services Items</label>
                {servicesList.map((srv, idx) => (
                  <div key={srv.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-cyan-400">SERVICE #{idx + 1}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input type="text" value={srv.title} onChange={(e) => { const u = [...servicesList]; u[idx].title = e.target.value; setServicesList(u); }} className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-xs font-bold" />
                      <input type="text" value={srv.tag} onChange={(e) => { const u = [...servicesList]; u[idx].tag = e.target.value; setServicesList(u); }} className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 font-mono text-xs" />
                    </div>
                    <textarea rows={2} value={srv.desc} onChange={(e) => { const u = [...servicesList]; u[idx].desc = e.target.value; setServicesList(u); }} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 text-xs" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 6: PACKAGES */}
        {activeSection === 'packages' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="p-3 rounded-2xl bg-purple-500/15 text-purple-500">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">6. Service Retainer Packages</h2>
                <p className="text-slate-400 text-xs mt-0.5">Edit package titles and retainer callouts</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Packages Headline</label>
                <input type="text" value={pkgTitle} onChange={(e) => setPkgTitle(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Packages Subtitle</label>
                <textarea rows={2} value={pkgSubtext} onChange={(e) => setPkgSubtext(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 text-xs" />
              </div>

              {/* Packages List UI */}
              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate-300 mb-2">Retainer Packages Items</label>
                {packagesList.map((pkg, idx) => (
                  <div key={pkg.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-purple-400">PACKAGE #{idx + 1}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input type="text" value={pkg.name} onChange={(e) => { const u = [...packagesList]; u[idx].name = e.target.value; setPackagesList(u); }} className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-xs font-bold" />
                      <input type="text" value={pkg.fee} onChange={(e) => { const u = [...packagesList]; u[idx].fee = e.target.value; setPackagesList(u); }} className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-emerald-400 font-mono text-xs font-bold" />
                    </div>
                    <input type="text" value={pkg.tagline} onChange={(e) => { const u = [...packagesList]; u[idx].tagline = e.target.value; setPackagesList(u); }} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 text-xs" />
                    <textarea rows={2} value={pkg.features.join(', ')} onChange={(e) => { const u = [...packagesList]; u[idx].features = e.target.value.split(',').map(s=>s.trim()); setPackagesList(u); }} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 text-xs" placeholder="Comma separated features" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 7: WHY CHOOSE US */}
        {activeSection === 'whyUs' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="p-3 rounded-2xl bg-emerald-500/15 text-emerald-500">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">7. Why Families Choose Us</h2>
                <p className="text-slate-400 text-xs mt-0.5">Edit advantage title and feature text</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Section Headline</label>
                <input type="text" value={whyTitle} onChange={(e) => setWhyTitle(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Section Subtext</label>
                <textarea rows={2} value={whySubtext} onChange={(e) => setWhySubtext(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 text-xs" />
              </div>

              {/* Why Us List UI */}
              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate-300 mb-2">Why Us Feature Points</label>
                {whyUsList.map((wu, idx) => (
                  <div key={wu.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-emerald-400">FEATURE #{idx + 1}</span>
                    </div>
                    <input type="text" value={wu.title} onChange={(e) => { const u = [...whyUsList]; u[idx].title = e.target.value; setWhyUsList(u); }} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-xs font-bold" />
                    <textarea rows={2} value={wu.desc} onChange={(e) => { const u = [...whyUsList]; u[idx].desc = e.target.value; setWhyUsList(u); }} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 text-xs" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 8: 4-STEP PROCESS */}
        {activeSection === 'process' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="p-3 rounded-2xl bg-indigo-500/15 text-indigo-500">
                <Workflow className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">8. Step-by-Step 4-Step Process</h2>
                <p className="text-slate-400 text-xs mt-0.5">Edit process workflow timeline title and subtext</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Process Section Headline</label>
                <input type="text" value={procTitle} onChange={(e) => setProcTitle(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Process Section Subtext</label>
                <textarea rows={2} value={procSubtext} onChange={(e) => setProcSubtext(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 text-xs" />
              </div>

              {/* Process List UI */}
              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate-300 mb-2">Workflow Steps</label>
                {processList.map((stp, idx) => (
                  <div key={stp.step} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-indigo-400">STEP {stp.step}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input type="text" value={stp.title} onChange={(e) => { const u = [...processList]; u[idx].title = e.target.value; setProcessList(u); }} className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-xs font-bold" />
                      <input type="text" value={stp.time} onChange={(e) => { const u = [...processList]; u[idx].time = e.target.value; setProcessList(u); }} className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 font-mono text-xs" />
                    </div>
                    <textarea rows={2} value={stp.desc} onChange={(e) => { const u = [...processList]; u[idx].desc = e.target.value; setProcessList(u); }} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 text-xs" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 9: FAQS ACCORDION */}
        {activeSection === 'faqs' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-purple-500/15 text-purple-500">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-display font-extrabold text-xl text-white">9. Frequently Asked Questions (FAQs)</h2>
                  <p className="text-slate-400 text-xs mt-0.5">Add/edit questions and answers shown on the homepage</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFaqItems([...faqItems, { id: `faq-${Date.now()}`, question: 'New Question', answer: 'Answer text...' }])}
                className="px-3.5 py-2 bg-slate-800 hover:bg-[#E01E37] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add FAQ
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">FAQ Section Headline</label>
                <input type="text" value={faqsTitle} onChange={(e) => setFaqsTitle(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold text-sm" />
              </div>

              <div className="space-y-4">
                {faqItems.map((faq, idx) => (
                  <div key={faq.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-purple-400">FAQ #{idx + 1}</span>
                      <div className="flex items-center gap-1.5">
                        <button type="button" disabled={idx === 0} onClick={() => { const u = [...faqItems]; const temp = u[idx-1]; u[idx-1] = u[idx]; u[idx] = temp; setFaqItems(u); }} className={`p-1.5 rounded-lg border transition-colors ${idx === 0 ? 'border-slate-800 text-slate-600' : 'border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800'}`}><ArrowUp className="w-3.5 h-3.5" /></button>
                        <button type="button" disabled={idx === faqItems.length - 1} onClick={() => { const u = [...faqItems]; const temp = u[idx+1]; u[idx+1] = u[idx]; u[idx] = temp; setFaqItems(u); }} className={`p-1.5 rounded-lg border transition-colors ${idx === faqItems.length - 1 ? 'border-slate-800 text-slate-600' : 'border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800'}`}><ArrowDown className="w-3.5 h-3.5" /></button>
                        <button
                          type="button"
                          onClick={() => setFaqItems(faqItems.filter(f => f.id !== faq.id))}
                          className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg ml-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <input type="text" value={faq.question} onChange={(e) => { const u = [...faqItems]; u[idx].question = e.target.value; setFaqItems(u); }} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-xs font-bold" />
                    <textarea rows={2} value={faq.answer} onChange={(e) => { const u = [...faqItems]; u[idx].answer = e.target.value; setFaqItems(u); }} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 text-xs" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 10: REVIEWS */}
        {activeSection === 'reviews' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="p-3 rounded-2xl bg-amber-500/15 text-amber-500">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">10. Customer Reviews Ticker</h2>
                <p className="text-slate-400 text-xs mt-0.5">Edit section title and subtitle for customer reviews</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Reviews Section Headline</label>
                <input type="text" value={revTitle} onChange={(e) => setRevTitle(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Reviews Section Subtitle</label>
                <textarea rows={2} value={revSubtext} onChange={(e) => setRevSubtext(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 text-xs" />
              </div>
            </div>
          </div>
        )}

        {/* SECTION 11: BLOG TEASER */}
        {activeSection === 'blog' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="p-3 rounded-2xl bg-sky-500/15 text-sky-500">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">11. Blog Guides Teaser</h2>
                <p className="text-slate-400 text-xs mt-0.5">Edit homepage blog teaser headline and subtext</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Blog Section Headline</label>
                <input type="text" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Blog Section Subtext</label>
                <textarea rows={2} value={blogSubtext} onChange={(e) => setBlogSubtext(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 text-xs" />
              </div>
            </div>
          </div>
        )}

        {/* SECTION 12: CTA BANNER */}
        {activeSection === 'cta' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="p-3 rounded-2xl bg-[#E01E37]/15 text-[#E01E37]">
                <Megaphone className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">12. Final CTA Conversion Banner</h2>
                <p className="text-slate-400 text-xs mt-0.5">Edit bottom call-to-action banner text</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">CTA Banner Headline</label>
                <input type="text" value={ctaHeadline} onChange={(e) => setCtaHeadline(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">CTA Banner Subtext</label>
                <textarea rows={2} value={ctaSubtext} onChange={(e) => setCtaSubtext(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 text-xs" />
              </div>
            </div>
          </div>
        )}

        {/* Prominent Save Button */}
        <button
          type="submit"
          className="w-full py-4 bg-[#E01E37] hover:bg-[#B81A2C] text-white font-bold text-base rounded-2xl shadow-xl shadow-[#E01E37]/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
        >
          <Save className="w-5 h-5" />
          <span>Publish All Homepage Section Changes</span>
        </button>

      </form>

    </div>
  );
}
