import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { ref, set, onValue } from 'firebase/database';
import { 
  Layout, Save, CheckCircle2, ShieldCheck, 
  BarChart2, Award, AlertTriangle, Layers, 
  CheckCircle, Workflow, HelpCircle, Star, Megaphone, Plus, Trash2,
  Grid, Clock, BookOpen, ArrowUp, ArrowDown, Shield, Zap
} from 'lucide-react';
import BlogModule from './BlogModule';

export default function HomepageEditor({ cmsConfig, setCmsConfig, initialSection }) {
  const [activeSection, setActiveSection] = useState(initialSection || 'hero');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (initialSection) setActiveSection(initialSection);
  }, [initialSection]);

  // 1. Hero State
  const [heroHeadline, setHeroHeadline] = useState(cmsConfig?.hero?.mainHeadline || "Bring your family to the UAE with 100% Guaranteed SLA Approval.");
  const [heroSubtext, setHeroSubtext] = useState(cmsConfig?.hero?.subtext || "We prepare, submit, and track family residence visas, 10-Year Golden Visas, and Emirates ID applications so you deal with one consultant instead of five counters.");
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
  const defaultAchievements = [
    { id: 'ach-1', title: 'Top UAE Residency Advisory 2026', badge: 'RANKED #1 IN DUBAI', desc: 'Voted #1 for transparent family visa processing and 100% online convenience across Dubai & Abu Dhabi.' },
    { id: 'ach-2', title: 'Official GDRFA & ICP Partner', badge: 'GOVERNMENT LICENSED', desc: 'Licensed under 800 DOCS LLC SOC with direct server access to federal immigration portals.' },
    { id: 'ach-3', title: 'Zero Hidden Markups Guarantee', badge: 'UNBUNDLED BILLING', desc: 'Saved over AED 4.5 Million in hidden typing fees for client families through itemized government receipts.' },
    { id: 'ach-4', title: '24-Hour VIP Approval SLA', badge: 'RECORD FAST TRACK', desc: 'Fastest entry permit and status change clearance recorded in Dubai immigration history.' }
  ];
  const [achTitle, setAchTitle] = useState(cmsConfig?.achievements?.title || "Official Recognition & Government Excellence Awards");
  const [achSubtext, setAchSubtext] = useState(cmsConfig?.achievements?.subtext || "Authorized document clearing partner operating under license from Dubai Economy & Tourism (DET).");
  const [achievementsList, setAchievementsList] = useState(
    cmsConfig?.achievements?.items && cmsConfig.achievements.items.length > 0 ? cmsConfig.achievements.items : defaultAchievements
  );

  // 4. Problems We Solve State
  const defaultProblems = [
    { id: 'prb-1', problemTitle: 'Standing in 5 different queues at Amer centers, medical clinics, and typing offices.', solutionTitle: '100% Online WhatsApp Concierge', desc: 'Send scans from home — we handle all government counters for you.' },
    { id: 'prb-2', problemTitle: 'Hidden service center surcharges and mysterious fee markups on government tariffs.', solutionTitle: 'Itemized Unbundled Billing', desc: 'We pass on exact GDRFA/ICP fees at cost with official receipts.' },
    { id: 'prb-3', problemTitle: 'Visa rejections caused by improper MOFA attestation stamps or Ejari errors.', solutionTitle: 'Free Pre-Flight Document Audit', desc: 'We verify your certificates before you spend a single Dirham.' },
    { id: 'prb-4', problemTitle: 'Heavy daily overstay fines while waiting for status change or medical checkups.', solutionTitle: 'Guaranteed Fast-Track SLA', desc: 'In-country status change cleared in 24-48 hours with zero fine risk.' }
  ];
  const [probTitle, setProbTitle] = useState(cmsConfig?.problems?.title || "The Problems We Solve");
  const [probSubtext, setProbSubtext] = useState(cmsConfig?.problems?.subtext || "Avoid bureaucracy, surprise fees, and endless waiting queues at service centers.");
  const [problemsList, setProblemsList] = useState(
    cmsConfig?.problems?.items && cmsConfig.problems.items.length > 0 ? cmsConfig.problems.items : defaultProblems
  );

  // 5. Categorized Services State
  const defaultServices = [
    { id: 'property-visa', title: 'Real Estate Investor Residency', tag: 'Visas', desc: 'Turn your AED 750k or AED 2M+ property equity into a 2-Year or 10-Year residency.', category: 'visas' },
    { id: 'family-visa', title: 'Executive Family Sponsorship', tag: 'Visas', desc: 'End-to-end management of family and dependant residency files.', category: 'visas' },
    { id: 'golden-visa', title: '10-Year Sovereign Golden Visa', tag: 'Visas', desc: 'Elite, long-term residency acquisition for executives and investors.', category: 'visas' },
    { id: 'maid-visa', title: 'Domestic Staff & Nanny Sponsorship', tag: 'Visas', desc: 'Fully compliant MOHRE and Tadbeer visa processing for household staff.', category: 'visas' },
    { id: 'newborn-visa', title: 'Express Newborn Registration', tag: 'Visas', desc: 'Urgent 120-day compliance processing for newborns.', category: 'visas' },
    { id: 'emirates-id', title: 'Biometrics & Emirates ID Concierge', tag: 'Emirates ID & Medical', desc: 'Priority scheduling for ICP biometrics and fast-track typing.', category: 'emiratesId' },
    { id: 'medical-fitness', title: 'VIP 30-Minute Medical Clearance', tag: 'Emirates ID & Medical', desc: 'Chauffeur-driven, priority medical fitness testing.', category: 'emiratesId' },
    { id: 'attestation-mofa', title: 'Global MOFA Attestation', tag: 'Legal & Attestation', desc: 'Secure, international document legalization.', category: 'legal' }
  ];
  const [servTitle, setServTitle] = useState(cmsConfig?.services?.title || "Everything We Handle");
  const [servSubtext, setServSubtext] = useState(cmsConfig?.services?.subtext || "One dedicated advisory team for residency visas, identity cards, medical checkups, and document attestation.");
  const [servicesList, setServicesList] = useState(
    cmsConfig?.services?.items && cmsConfig.services.items.length > 0 ? cmsConfig.services.items : defaultServices
  );

  // 6. Packages State (Property & Support)
  const defaultPackages = [
    { id: 'pkg-1', title: 'Property Investor Visa', desc: 'End-to-end processing for the 2-Year and 10-Year Property Investor visas.', features: ['DLD Taskeen Application Processing', '10-Year Golden Visa via Real Estate', '2-Year Property Visa (AED 750k+)'], btnText: 'Calculate Property Visa Cost', btnLink: 'calculator', icon: 'Building2' },
    { id: 'pkg-2', title: 'DLD Trustee & Revaluation', desc: 'Complete representation at the Dubai Land Department.', features: ['Title Deed Updates & Amendments', 'Official Property Revaluation for Visa', 'Representation via Power of Attorney (POA)'], btnText: 'Talk to an Expert', btnLink: 'whatsapp', icon: 'Scale' }
  ];
  const [pkgTitle, setPkgTitle] = useState(cmsConfig?.packages?.title || "Comprehensive Property Investor Services");
  const [pkgSubtext, setPkgSubtext] = useState(cmsConfig?.packages?.subtext || "End-to-end management for property investors. From DLD registration to Golden Visa processing.");
  const [packagesList, setPackagesList] = useState(
    cmsConfig?.packages?.items && cmsConfig.packages.items.length > 0 ? cmsConfig.packages.items : defaultPackages
  );

  // 7. Why Us State
  const defaultWhyUs = [
    { id: 'wu-1', title: '100% Online WhatsApp Concierge', desc: 'Send scans from home — we handle all government counters for you.' },
    { id: 'wu-2', title: 'Unbundled Government Pass-Through Rates', desc: 'We pass on exact GDRFA/ICP fees at cost with official receipts.' },
    { id: 'wu-3', title: 'Guaranteed Fast-Track 24h Approval SLA', desc: 'In-country status change cleared in 24-48 hours with zero fine risk.' },
    { id: 'wu-4', title: 'Free Pre-Flight Document Audit', desc: 'We verify your certificates before you spend a single Dirham.' }
  ];
  const [whyTitle, setWhyTitle] = useState(cmsConfig?.whyUs?.title || "Why Families Choose Us Over Typing Centers");
  const [whySubtext, setWhySubtext] = useState(cmsConfig?.whyUs?.subtext || "Combining digital speed with VIP white-glove advisory.");
  const [whyUsList, setWhyUsList] = useState(
    cmsConfig?.whyUs?.items && cmsConfig.whyUs.items.length > 0 ? cmsConfig.whyUs.items : defaultWhyUs
  );

  // 8. Process Workflow State
  const defaultProcess = [
    { step: '1', title: 'Scans & Pre-Audit', time: 'Day 1', desc: 'Send passport & certificate scans via WhatsApp for free eligibility verification.' },
    { step: '2', title: 'GDRFA Entry Permit', time: 'Days 1-2', desc: 'We issue official ICP/GDRFA entry permit or in-country status change clearance.' },
    { step: '3', title: 'VIP Medical & EID', time: 'Day 3', desc: 'Chauffeur escort to VIP 30-minute DHA medical check and ICP biometrics.' },
    { step: '4', title: 'Visa Stamping & Delivery', time: 'Days 4-5', desc: 'Physical Emirates ID delivered directly to your doorstep in Dubai or Abu Dhabi.' }
  ];
  const [procTitle, setProcTitle] = useState(cmsConfig?.process?.title || "How We Process Your Family Residency");
  const [procSubtext, setProcSubtext] = useState(cmsConfig?.process?.subtext || "Clear timeline from initial document review to passport stamping.");
  const [processList, setProcessList] = useState(
    cmsConfig?.process?.steps && cmsConfig.process.steps.length > 0 ? cmsConfig.process.steps : defaultProcess
  );

  // 9. FAQs Accordion State
  const defaultFaqs = [
    { id: 'faq-1', question: 'Do I need a minimum salary to sponsor my family in the UAE?', answer: 'Yes — AED 4,000 per month (or AED 3,000 per month if your employer provides free housing) is required to sponsor your spouse and children.' },
    { id: 'faq-2', question: 'Can my family stay inside the UAE while their visa is processed?', answer: 'Yes. If your family members hold a valid visit visa or tourist visa, we perform an in-country Status Change so they never need to exit.' },
    { id: 'faq-3', question: 'How much do you charge for family visa processing?', answer: 'We operate on a transparent fixed service retainer fee per applicant. All statutory government charges are passed on at cost with official receipts.' },
    { id: 'faq-4', question: 'Which emirates do your visa services cover?', answer: 'We cover all seven UAE emirates: Dubai (GDRFA), Abu Dhabi (ICP), Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain.' }
  ];
  const [faqsTitle, setFaqsTitle] = useState(cmsConfig?.faqs?.title || "Frequently Asked Questions");
  const [faqsSubtext, setFaqsSubtext] = useState(cmsConfig?.faqs?.subtext || "Got questions about salary thresholds, Ejari, or medical tests? We have answers.");
  const [faqItems, setFaqItems] = useState(
    cmsConfig?.faqs?.items && cmsConfig.faqs.items.length > 0 ? cmsConfig.faqs.items : defaultFaqs
  );

  // 10. Reviews State
  const defaultReviews = [
    { id: 'rev-1', author: 'Mohammed Al Hashmi', text: 'Excellent PRO service, they got my Golden Visa in record time.', rating: 5, platform: 'Google' },
    { id: 'rev-2', author: 'Sarah Jenkins', text: 'Highly recommended for family sponsorships. Transparent pricing.', rating: 5, platform: 'Trustpilot' },
    { id: 'rev-3', author: 'David Chen', text: 'Smooth process for company setup and employee visas.', rating: 5, platform: 'Google' }
  ];
  const [revTitle, setRevTitle] = useState(cmsConfig?.reviews?.title || "What Families Say About Our PRO Advisory");
  const [revSubtext, setRevSubtext] = useState(cmsConfig?.reviews?.subtext || "Over 500+ five-star reviews on Google & Trustpilot.");
  const [reviewsList, setReviewsList] = useState(
    cmsConfig?.reviews?.items && cmsConfig.reviews.items.length > 0 ? cmsConfig.reviews.items : defaultReviews
  );

  // 11. Blog Teaser State
  const [blogTitle, setBlogTitle] = useState(cmsConfig?.blogSection?.title || "Latest UAE Visa & Residency Guides");
  const [blogSubtext, setBlogSubtext] = useState(cmsConfig?.blogSection?.subtext || "Expert insights on Golden Visas, GDRFA rules, and document attestations.");

  // 12. Final CTA State
  const defaultCtaButtons = [
    { id: 'btn-1', label: 'Calculate Visa Cost', link: 'calculator', isPrimary: true },
    { id: 'btn-2', label: 'Talk to Us', link: 'whatsapp', isPrimary: false }
  ];
  const [ctaHeadline, setCtaHeadline] = useState(cmsConfig?.cta?.headline || "Ready to Sponsor Your Family in the UAE?");
  const [ctaSubtext, setCtaSubtext] = useState(cmsConfig?.cta?.subtext || "Get an itemized fee breakdown in 30 seconds or chat with a Senior PRO Consultant now.");
  const [ctaButtons, setCtaButtons] = useState(
    cmsConfig?.cta?.buttons && cmsConfig.cta.buttons.length > 0 ? cmsConfig.cta.buttons : defaultCtaButtons
  );

  // Sync state variables when cmsConfig prop updates from Firebase
  useEffect(() => {
    if (!cmsConfig) return;
    if (cmsConfig.hero?.mainHeadline) setHeroHeadline(cmsConfig.hero.mainHeadline);
    if (cmsConfig.hero?.subtext) setHeroSubtext(cmsConfig.hero.subtext);
    if (cmsConfig.hero?.stat1) setBadge1(cmsConfig.hero.stat1);
    if (cmsConfig.hero?.stat2) setBadge2(cmsConfig.hero.stat2);
    if (cmsConfig.hero?.stat3) setBadge3(cmsConfig.hero.stat3);

    if (cmsConfig.stats?.title) setStatsTitle(cmsConfig.stats.title);
    if (cmsConfig.stats?.subtext) setStatsSubtext(cmsConfig.stats.subtext);
    if (cmsConfig.stats?.metric1Val) setM1Val(cmsConfig.stats.metric1Val);
    if (cmsConfig.stats?.metric1Label) setM1Lbl(cmsConfig.stats.metric1Label);
    if (cmsConfig.stats?.metric2Val) setM2Val(cmsConfig.stats.metric2Val);
    if (cmsConfig.stats?.metric2Label) setM2Lbl(cmsConfig.stats.metric2Label);
    if (cmsConfig.stats?.metric3Val) setM3Val(cmsConfig.stats.metric3Val);
    if (cmsConfig.stats?.metric3Label) setM3Lbl(cmsConfig.stats.metric3Label);
    if (cmsConfig.stats?.metric4Val) setM4Val(cmsConfig.stats.metric4Val);
    if (cmsConfig.stats?.metric4Label) setM4Lbl(cmsConfig.stats.metric4Label);

    if (cmsConfig.achievements?.title) setAchTitle(cmsConfig.achievements.title);
    if (cmsConfig.achievements?.subtext) setAchSubtext(cmsConfig.achievements.subtext);
    if (Array.isArray(cmsConfig.achievements?.items)) setAchievementsList(cmsConfig.achievements.items);

    if (cmsConfig.problems?.title) setProbTitle(cmsConfig.problems.title);
    if (cmsConfig.problems?.subtext) setProbSubtext(cmsConfig.problems.subtext);
    if (Array.isArray(cmsConfig.problems?.items)) setProblemsList(cmsConfig.problems.items);

    if (cmsConfig.services?.title) setServTitle(cmsConfig.services.title);
    if (cmsConfig.services?.subtext) setServSubtext(cmsConfig.services.subtext);
    if (Array.isArray(cmsConfig.services?.items)) setServicesList(cmsConfig.services.items);

    if (cmsConfig.packages?.title) setPkgTitle(cmsConfig.packages.title);
    if (cmsConfig.packages?.subtext) setPkgSubtext(cmsConfig.packages.subtext);
    if (Array.isArray(cmsConfig.packages?.items)) setPackagesList(cmsConfig.packages.items);

    if (cmsConfig.whyUs?.title) setWhyTitle(cmsConfig.whyUs.title);
    if (cmsConfig.whyUs?.subtext) setWhySubtext(cmsConfig.whyUs.subtext);
    if (Array.isArray(cmsConfig.whyUs?.items)) setWhyUsList(cmsConfig.whyUs.items);

    if (cmsConfig.process?.title) setProcTitle(cmsConfig.process.title);
    if (cmsConfig.process?.subtext) setProcSubtext(cmsConfig.process.subtext);
    if (Array.isArray(cmsConfig.process?.steps)) setProcessList(cmsConfig.process.steps);

    if (cmsConfig.faqs?.title) setFaqsTitle(cmsConfig.faqs.title);
    if (cmsConfig.faqs?.subtext) setFaqsSubtext(cmsConfig.faqs.subtext);
    if (Array.isArray(cmsConfig.faqs?.items)) setFaqItems(cmsConfig.faqs.items);

    if (cmsConfig.reviews?.title) setRevTitle(cmsConfig.reviews.title);
    if (cmsConfig.reviews?.subtext) setRevSubtext(cmsConfig.reviews.subtext);
    if (Array.isArray(cmsConfig.reviews?.items)) setReviewsList(cmsConfig.reviews.items);

    if (cmsConfig.blogSection?.title) setBlogTitle(cmsConfig.blogSection.title);
    if (cmsConfig.blogSection?.subtext) setBlogSubtext(cmsConfig.blogSection.subtext);

    if (cmsConfig.cta?.headline) setCtaHeadline(cmsConfig.cta.headline);
    if (cmsConfig.cta?.subtext) setCtaSubtext(cmsConfig.cta.subtext);
    if (Array.isArray(cmsConfig.cta?.buttons)) setCtaButtons(cmsConfig.cta.buttons);
  }, [cmsConfig]);

  const handleSave = async (e) => {
    e.preventDefault();

    const updatedConfig = {
      ...(cmsConfig || {}),
      hero: { ...(cmsConfig?.hero || {}), mainHeadline: heroHeadline, subtext: heroSubtext, stat1: badge1, stat2: badge2, stat3: badge3 },
      stats: { ...(cmsConfig?.stats || {}), title: statsTitle, subtext: statsSubtext, metric1Val: m1Val, metric1Label: m1Lbl, metric2Val: m2Val, metric2Label: m2Lbl, metric3Val: m3Val, metric3Label: m3Lbl, metric4Val: m4Val, metric4Label: m4Lbl },
      achievements: { ...(cmsConfig?.achievements || {}), title: achTitle, subtext: achSubtext, items: achievementsList },
      problems: { ...(cmsConfig?.problems || {}), title: probTitle, subtext: probSubtext, items: problemsList },
      services: { ...(cmsConfig?.services || {}), title: servTitle, subtext: servSubtext, items: servicesList },
      packages: { ...(cmsConfig?.packages || {}), title: pkgTitle, subtext: pkgSubtext, items: packagesList },
      whyUs: { ...(cmsConfig?.whyUs || {}), title: whyTitle, subtext: whySubtext, items: whyUsList },
      process: { ...(cmsConfig?.process || {}), title: procTitle, subtext: procSubtext, steps: processList },
      faqs: { ...(cmsConfig?.faqs || {}), title: faqsTitle, subtext: faqsSubtext, items: faqItems },
      reviews: { ...(cmsConfig?.reviews || {}), title: revTitle, subtext: revSubtext, items: reviewsList },
      blogSection: { title: blogTitle, subtext: blogSubtext },
      cta: { ...(cmsConfig?.cta || {}), headline: ctaHeadline, subtext: ctaSubtext, buttons: ctaButtons }
    };

    if (setCmsConfig) {
      setCmsConfig(updatedConfig);
    }

    try {
      const cmsRef = ref(db, 'cmsConfig');
      await set(cmsRef, updatedConfig);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3500);
    } catch(err) {
      alert("Error saving to Firebase: " + err.message);
    }
  };

  const sectionsList = [
    { id: 'hero', label: '1. Hero', icon: Layout },
    { id: 'stats', label: '2. Stats Bar', icon: BarChart2 },
    { id: 'achievements', label: '3. Achievements', icon: Award },
    { id: 'problems', label: '4. Problems', icon: AlertTriangle },
    { id: 'services', label: '5. Services Grid', icon: Grid },
    { id: 'packages', label: '6. Property & Support', icon: Layers },
    { id: 'whyus', label: '7. Why Choose Us', icon: CheckCircle },
    { id: 'process', label: '8. 4-Step Process', icon: Workflow },
    { id: 'faqs', label: '9. FAQs Accordion', icon: HelpCircle },
    { id: 'reviews', label: '10. Reviews', icon: Star },
    { id: 'blog', label: '11. Blog Teaser', icon: BookOpen },
    { id: 'cta', label: '12. CTA Banner', icon: Megaphone }
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      
      {savedSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-semibold flex items-center gap-3 shadow-lg animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span>Homepage sections published live and synced to Firebase Realtime Database!</span>
        </div>
      )}

      {/* Sub-Tabs for All 12 Homepage Sections */}
      <div className="flex flex-wrap gap-2 bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 p-2 rounded-2xl shadow-xl">
        {sectionsList.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveSection(sec.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                isActive 
                  ? 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black shadow-lg shadow-amber-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
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
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                  <Layout className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg text-white">1. Hero Section Text & Badges</h2>
                  <p className="text-slate-400 text-xs mt-0.5">Edit main hero copy displayed at the top of the homepage</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Main Hero H1 Headline</label>
                  <textarea
                    rows={2}
                    value={heroHeadline}
                    onChange={(e) => setHeroHeadline(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-white font-bold text-base focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Hero Subtext Description</label>
                  <textarea
                    rows={3}
                    value={heroSubtext}
                    onChange={(e) => setHeroSubtext(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-slate-300 text-xs leading-relaxed focus:outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>
            </div>

            {/* 3 Callout Badges */}
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-base text-white">Trust Badges & SLA Checkmarks</h2>
                  <p className="text-slate-400 text-xs">3 stat bullet checkmarks under the main headline</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Badge 1</label>
                  <input
                    type="text"
                    value={badge1}
                    onChange={(e) => setBadge1(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-white font-medium text-xs focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Badge 2</label>
                  <input
                    type="text"
                    value={badge2}
                    onChange={(e) => setBadge2(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-white font-medium text-xs focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Badge 3</label>
                  <input
                    type="text"
                    value={badge3}
                    onChange={(e) => setBadge3(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-white font-medium text-xs focus:outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: METRICS & STATS BAR */}
        {activeSection === 'stats' && (
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                <BarChart2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg text-white">2. Live Metrics & Stats Counter Bar</h2>
                <p className="text-slate-400 text-xs mt-0.5">Edit 4 statistical figures shown in the counter bar</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Stats Section Title</label>
                <input
                  type="text"
                  value={statsTitle}
                  onChange={(e) => setStatsTitle(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-white font-bold text-sm focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2">
                  <label className="block text-xs font-mono font-bold text-amber-400 uppercase">Metric 1</label>
                  <input type="text" value={m1Val} onChange={(e) => setM1Val(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white font-bold text-sm" />
                  <input type="text" value={m1Lbl} onChange={(e) => setM1Lbl(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 text-xs" />
                </div>

                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2">
                  <label className="block text-xs font-mono font-bold text-amber-400 uppercase">Metric 2</label>
                  <input type="text" value={m2Val} onChange={(e) => setM2Val(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white font-bold text-sm" />
                  <input type="text" value={m2Lbl} onChange={(e) => setM2Lbl(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 text-xs" />
                </div>

                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2">
                  <label className="block text-xs font-mono font-bold text-amber-400 uppercase">Metric 3</label>
                  <input type="text" value={m3Val} onChange={(e) => setM3Val(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white font-bold text-sm" />
                  <input type="text" value={m3Lbl} onChange={(e) => setM3Lbl(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 text-xs" />
                </div>

                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2">
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
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg text-white">3. Achievements & Government Badges</h2>
                  <p className="text-slate-400 text-xs mt-0.5">Edit official awards, government badges, and trust indicators</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAchievementsList([...achievementsList, { id: `ach-${Date.now()}`, title: 'New Achievement', badge: 'NEW BADGE', desc: 'Achievement description...' }])}
                className="px-3.5 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/20 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Achievement
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Section Headline</label>
                <input type="text" value={achTitle} onChange={(e) => setAchTitle(e.target.value)} className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-white font-bold text-sm focus:outline-none focus:border-amber-500/50" />
              </div>

              <div className="space-y-4">
                {achievementsList.map((ach, idx) => (
                  <div key={ach.id || idx} className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3 relative group">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-xs font-mono font-bold text-amber-400">ACHIEVEMENT ITEM #{idx + 1}</span>
                      <div className="flex items-center gap-1.5">
                        <button type="button" disabled={idx === 0} onClick={() => { const u = [...achievementsList]; const temp = u[idx-1]; u[idx-1] = u[idx]; u[idx] = temp; setAchievementsList(u); }} className={`p-1.5 rounded-lg border transition-colors ${idx === 0 ? 'border-slate-800/50 text-slate-700' : 'border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800'}`}><ArrowUp className="w-3.5 h-3.5" /></button>
                        <button type="button" disabled={idx === achievementsList.length - 1} onClick={() => { const u = [...achievementsList]; const temp = u[idx+1]; u[idx+1] = u[idx]; u[idx] = temp; setAchievementsList(u); }} className={`p-1.5 rounded-lg border transition-colors ${idx === achievementsList.length - 1 ? 'border-slate-800/50 text-slate-700' : 'border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800'}`}><ArrowDown className="w-3.5 h-3.5" /></button>
                        <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); const u = achievementsList.filter((_, i) => i !== idx); setAchievementsList(u); }} className="p-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer" title="Remove Item"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] text-slate-400 uppercase mb-1">Title</label>
                        <input type="text" value={ach.title || ''} onChange={(e) => { const u = [...achievementsList]; u[idx].title = e.target.value; setAchievementsList(u); }} placeholder="Achievement Title" className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-xs font-bold focus:outline-none focus:border-amber-500/50" />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400 uppercase mb-1">Badge Tag</label>
                        <input type="text" value={ach.badge || ''} onChange={(e) => { const u = [...achievementsList]; u[idx].badge = e.target.value; setAchievementsList(u); }} placeholder="Badge (e.g. RANKED #1)" className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-amber-400 font-mono text-xs font-bold focus:outline-none focus:border-amber-500/50" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase mb-1">Description</label>
                      <textarea rows={2} value={ach.desc || ''} onChange={(e) => { const u = [...achievementsList]; u[idx].desc = e.target.value; setAchievementsList(u); }} placeholder="Achievement Description" className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 text-xs focus:outline-none focus:border-amber-500/50" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: PROBLEMS */}
        {activeSection === 'problems' && (
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg text-white">4. The Problems We Solve</h2>
                  <p className="text-slate-400 text-xs mt-0.5">Edit customer pain points and corresponding PRO solutions</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setProblemsList([...problemsList, { id: `prb-${Date.now()}`, problemTitle: 'New Problem', solutionTitle: 'New Solution', desc: '' }])}
                className="px-3.5 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/20 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Problem Card
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Section Headline</label>
                <input type="text" value={probTitle} onChange={(e) => setProbTitle(e.target.value)} className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-white font-bold text-sm focus:outline-none focus:border-amber-500/50" />
              </div>

              <div className="space-y-4">
                {problemsList.map((prb, idx) => (
                  <div key={prb.id || idx} className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3 relative group">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-xs font-mono font-bold text-amber-400">PROBLEM CARD #{idx + 1}</span>
                      <div className="flex items-center gap-1.5">
                        <button type="button" disabled={idx === 0} onClick={() => { const u = [...problemsList]; const temp = u[idx-1]; u[idx-1] = u[idx]; u[idx] = temp; setProblemsList(u); }} className={`p-1.5 rounded-lg border transition-colors ${idx === 0 ? 'border-slate-800/50 text-slate-700' : 'border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800'}`}><ArrowUp className="w-3.5 h-3.5" /></button>
                        <button type="button" disabled={idx === problemsList.length - 1} onClick={() => { const u = [...problemsList]; const temp = u[idx+1]; u[idx+1] = u[idx]; u[idx] = temp; setProblemsList(u); }} className={`p-1.5 rounded-lg border transition-colors ${idx === problemsList.length - 1 ? 'border-slate-800/50 text-slate-700' : 'border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800'}`}><ArrowDown className="w-3.5 h-3.5" /></button>
                        <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); const u = problemsList.filter((_, i) => i !== idx); setProblemsList(u); }} className="p-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer" title="Remove Item"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-red-400">The Problem (Old Way)</label>
                        <input type="text" value={prb.problemTitle || prb.problem || ''} onChange={(e) => { const u = [...problemsList]; u[idx].problemTitle = e.target.value; u[idx].problem = e.target.value; setProblemsList(u); }} placeholder="The pain point..." className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 font-bold text-xs text-white focus:outline-none focus:border-amber-500/50" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-emerald-400">How We Solve It (800 DOCS Solution)</label>
                        <input type="text" value={prb.solutionTitle || prb.solution || ''} onChange={(e) => { const u = [...problemsList]; u[idx].solutionTitle = e.target.value; u[idx].solution = e.target.value; setProblemsList(u); }} placeholder="How we solve it..." className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-amber-400 font-bold text-xs focus:outline-none focus:border-amber-500/50" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: SERVICES GRID */}
        {activeSection === 'services' && (
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                  <Grid className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg text-white">5. Categorized Services Grid</h2>
                  <p className="text-slate-400 text-xs mt-0.5">Edit main services grid header and category items</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setServicesList([...servicesList, { id: `srv-${Date.now()}`, title: 'New Service', tag: 'Visas', desc: 'Description of service...', category: 'visas' }])}
                className="px-3.5 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/20 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Service Card
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Services Section Headline</label>
                <input type="text" value={servTitle} onChange={(e) => setServTitle(e.target.value)} className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-white font-bold text-sm focus:outline-none focus:border-amber-500/50" />
              </div>

              <div className="space-y-4">
                {servicesList.map((srv, idx) => (
                  <div key={srv.id || idx} className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3 relative group">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-xs font-mono font-bold text-amber-400">SERVICE #{idx + 1}</span>
                      <div className="flex items-center gap-1.5">
                        <button type="button" disabled={idx === 0} onClick={() => { const u = [...servicesList]; const temp = u[idx-1]; u[idx-1] = u[idx]; u[idx] = temp; setServicesList(u); }} className={`p-1.5 rounded-lg border transition-colors ${idx === 0 ? 'border-slate-800/50 text-slate-700' : 'border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800'}`}><ArrowUp className="w-3.5 h-3.5" /></button>
                        <button type="button" disabled={idx === servicesList.length - 1} onClick={() => { const u = [...servicesList]; const temp = u[idx+1]; u[idx+1] = u[idx]; u[idx] = temp; setServicesList(u); }} className={`p-1.5 rounded-lg border transition-colors ${idx === servicesList.length - 1 ? 'border-slate-800/50 text-slate-700' : 'border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800'}`}><ArrowDown className="w-3.5 h-3.5" /></button>
                        <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); const u = servicesList.filter((_, i) => i !== idx); setServicesList(u); }} className="p-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer" title="Remove Item"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input type="text" value={srv.title || ''} onChange={(e) => { const u = [...servicesList]; u[idx].title = e.target.value; setServicesList(u); }} placeholder="Service Title" className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-xs font-bold focus:outline-none focus:border-amber-500/50" />
                      <input type="text" value={srv.tag || ''} onChange={(e) => { const u = [...servicesList]; u[idx].tag = e.target.value; setServicesList(u); }} placeholder="Tag (e.g. Visas)" className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-amber-400 font-mono text-xs focus:outline-none focus:border-amber-500/50" />
                    </div>
                    <textarea rows={2} value={srv.desc || ''} onChange={(e) => { const u = [...servicesList]; u[idx].desc = e.target.value; setServicesList(u); }} placeholder="Service Description" className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 text-xs focus:outline-none focus:border-amber-500/50" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 6: PACKAGES */}
        {activeSection === 'packages' && (
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg text-white">6. Property & Support Cards</h2>
                  <p className="text-slate-400 text-xs mt-0.5">Edit property support items and callout cards</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPackagesList([...packagesList, { id: `pkg-${Date.now()}`, title: 'New Package', icon: 'Building2', desc: 'Description...', features: ['Feature 1'], btnText: 'Learn More', btnLink: 'calculator' }])}
                className="px-3.5 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/20 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Card
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Property Support Headline</label>
                <input type="text" value={pkgTitle} onChange={(e) => setPkgTitle(e.target.value)} className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-white font-bold text-sm focus:outline-none focus:border-amber-500/50" />
              </div>

              <div className="space-y-4">
                {packagesList.map((pkg, idx) => (
                  <div key={pkg.id || idx} className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3 relative group">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-xs font-mono font-bold text-amber-400">CARD #{idx + 1}</span>
                      <div className="flex items-center gap-1.5">
                        <button type="button" disabled={idx === 0} onClick={() => { const u = [...packagesList]; const temp = u[idx-1]; u[idx-1] = u[idx]; u[idx] = temp; setPackagesList(u); }} className={`p-1.5 rounded-lg border transition-colors ${idx === 0 ? 'border-slate-800/50 text-slate-700' : 'border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800'}`}><ArrowUp className="w-3.5 h-3.5" /></button>
                        <button type="button" disabled={idx === packagesList.length - 1} onClick={() => { const u = [...packagesList]; const temp = u[idx+1]; u[idx+1] = u[idx]; u[idx] = temp; setPackagesList(u); }} className={`p-1.5 rounded-lg border transition-colors ${idx === packagesList.length - 1 ? 'border-slate-800/50 text-slate-700' : 'border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800'}`}><ArrowDown className="w-3.5 h-3.5" /></button>
                        <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); const u = packagesList.filter((_, i) => i !== idx); setPackagesList(u); }} className="p-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer" title="Remove Item"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input type="text" value={pkg.title || ''} onChange={(e) => { const u = [...packagesList]; u[idx].title = e.target.value; setPackagesList(u); }} placeholder="Card Title" className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-xs font-bold focus:outline-none focus:border-amber-500/50" />
                      <input type="text" value={pkg.btnText || ''} onChange={(e) => { const u = [...packagesList]; u[idx].btnText = e.target.value; setPackagesList(u); }} placeholder="Button Label" className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-[#D4AF37] font-bold text-xs focus:outline-none focus:border-amber-500/50" />
                    </div>
                    <textarea rows={2} value={pkg.desc || ''} onChange={(e) => { const u = [...packagesList]; u[idx].desc = e.target.value; setPackagesList(u); }} placeholder="Card Description" className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 text-xs focus:outline-none focus:border-amber-500/50" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 7: WHY CHOOSE US */}
        {activeSection === 'whyus' && (
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg text-white">7. Why Families Choose Us</h2>
                  <p className="text-slate-400 text-xs mt-0.5">Edit key advantage title and feature points</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setWhyUsList([...whyUsList, { id: `wu-${Date.now()}`, title: 'New Advantage Point', desc: 'Description...' }])}
                className="px-3.5 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/20 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Advantage Point
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Section Headline</label>
                <input type="text" value={whyTitle} onChange={(e) => setWhyTitle(e.target.value)} className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-white font-bold text-sm focus:outline-none focus:border-amber-500/50" />
              </div>

              <div className="space-y-4">
                {whyUsList.map((wu, idx) => (
                  <div key={wu.id || idx} className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3 relative group">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-xs font-mono font-bold text-amber-400">FEATURE #{idx + 1}</span>
                      <div className="flex items-center gap-1.5">
                        <button type="button" disabled={idx === 0} onClick={() => { const u = [...whyUsList]; const temp = u[idx-1]; u[idx-1] = u[idx]; u[idx] = temp; setWhyUsList(u); }} className={`p-1.5 rounded-lg border transition-colors ${idx === 0 ? 'border-slate-800/50 text-slate-700' : 'border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800'}`}><ArrowUp className="w-3.5 h-3.5" /></button>
                        <button type="button" disabled={idx === whyUsList.length - 1} onClick={() => { const u = [...whyUsList]; const temp = u[idx+1]; u[idx+1] = u[idx]; u[idx] = temp; setWhyUsList(u); }} className={`p-1.5 rounded-lg border transition-colors ${idx === whyUsList.length - 1 ? 'border-slate-800/50 text-slate-700' : 'border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800'}`}><ArrowDown className="w-3.5 h-3.5" /></button>
                        <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); const u = whyUsList.filter((_, i) => i !== idx); setWhyUsList(u); }} className="p-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer" title="Remove Item"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <input type="text" value={wu.title || ''} onChange={(e) => { const u = [...whyUsList]; u[idx].title = e.target.value; setWhyUsList(u); }} placeholder="Feature Title" className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-xs font-bold focus:outline-none focus:border-amber-500/50" />
                    <textarea rows={2} value={wu.desc || ''} onChange={(e) => { const u = [...whyUsList]; u[idx].desc = e.target.value; setWhyUsList(u); }} placeholder="Feature Description" className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 text-xs focus:outline-none focus:border-amber-500/50" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 8: 4-STEP PROCESS */}
        {activeSection === 'process' && (
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                  <Workflow className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg text-white">8. Step-by-Step 4-Step Process</h2>
                  <p className="text-slate-400 text-xs mt-0.5">Edit process workflow timeline steps and SLA durations</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setProcessList([...processList, { step: String(processList.length + 1), title: 'New Step', time: 'Day X', desc: 'Description...' }])}
                className="px-3.5 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/20 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Workflow Step
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Process Section Headline</label>
                <input type="text" value={procTitle} onChange={(e) => setProcTitle(e.target.value)} className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-white font-bold text-sm focus:outline-none focus:border-amber-500/50" />
              </div>

              <div className="space-y-4">
                {processList.map((stp, idx) => (
                  <div key={stp.step || idx} className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3 relative group">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-xs font-mono font-bold text-amber-400">STEP #{idx + 1}</span>
                      <div className="flex items-center gap-1.5">
                        <button type="button" disabled={idx === 0} onClick={() => { const u = [...processList]; const temp = u[idx-1]; u[idx-1] = u[idx]; u[idx] = temp; setProcessList(u); }} className={`p-1.5 rounded-lg border transition-colors ${idx === 0 ? 'border-slate-800/50 text-slate-700' : 'border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800'}`}><ArrowUp className="w-3.5 h-3.5" /></button>
                        <button type="button" disabled={idx === processList.length - 1} onClick={() => { const u = [...processList]; const temp = u[idx+1]; u[idx+1] = u[idx]; u[idx] = temp; setProcessList(u); }} className={`p-1.5 rounded-lg border transition-colors ${idx === processList.length - 1 ? 'border-slate-800/50 text-slate-700' : 'border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800'}`}><ArrowDown className="w-3.5 h-3.5" /></button>
                        <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); const u = processList.filter((_, i) => i !== idx); setProcessList(u); }} className="p-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer" title="Remove Item"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input type="text" value={stp.title || ''} onChange={(e) => { const u = [...processList]; u[idx].title = e.target.value; setProcessList(u); }} placeholder="Step Title" className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-xs font-bold focus:outline-none focus:border-amber-500/50" />
                      <input type="text" value={stp.time || ''} onChange={(e) => { const u = [...processList]; u[idx].time = e.target.value; setProcessList(u); }} placeholder="Duration (e.g. Day 1)" className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-amber-400 font-mono text-xs focus:outline-none focus:border-amber-500/50" />
                    </div>
                    <textarea rows={2} value={stp.desc || ''} onChange={(e) => { const u = [...processList]; u[idx].desc = e.target.value; setProcessList(u); }} placeholder="Step Description" className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 text-xs focus:outline-none focus:border-amber-500/50" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 9: FAQS ACCORDION */}
        {activeSection === 'faqs' && (
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg text-white">9. Frequently Asked Questions (FAQs)</h2>
                  <p className="text-slate-400 text-xs mt-0.5">Add, edit, or reorder homepage FAQ accordion items</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFaqItems([...faqItems, { id: `faq-${Date.now()}`, question: 'New Question?', answer: 'Answer text...' }])}
                className="px-3.5 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/20 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add FAQ Item
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">FAQ Section Headline</label>
                <input type="text" value={faqsTitle} onChange={(e) => setFaqsTitle(e.target.value)} className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-white font-bold text-sm focus:outline-none focus:border-amber-500/50" />
              </div>

              <div className="space-y-4">
                {faqItems.map((faq, idx) => (
                  <div key={faq.id || idx} className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-xs font-mono font-bold text-amber-400">FAQ ITEM #{idx + 1}</span>
                      <div className="flex items-center gap-1.5">
                        <button type="button" disabled={idx === 0} onClick={() => { const u = [...faqItems]; const temp = u[idx-1]; u[idx-1] = u[idx]; u[idx] = temp; setFaqItems(u); }} className={`p-1.5 rounded-lg border transition-colors ${idx === 0 ? 'border-slate-800/50 text-slate-700' : 'border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800'}`}><ArrowUp className="w-3.5 h-3.5" /></button>
                        <button type="button" disabled={idx === faqItems.length - 1} onClick={() => { const u = [...faqItems]; const temp = u[idx+1]; u[idx+1] = u[idx]; u[idx] = temp; setFaqItems(u); }} className={`p-1.5 rounded-lg border transition-colors ${idx === faqItems.length - 1 ? 'border-slate-800/50 text-slate-700' : 'border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800'}`}><ArrowDown className="w-3.5 h-3.5" /></button>
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setFaqItems(faqItems.filter((_, i) => i !== idx)); }}
                          className="p-1.5 border border-red-500/20 text-red-400 hover:bg-red-500/10 rounded-lg ml-2 cursor-pointer"
                          title="Remove Item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase mb-1">Question</label>
                      <input type="text" value={faq.question || faq.q || ''} onChange={(e) => { const u = [...faqItems]; u[idx].question = e.target.value; u[idx].q = e.target.value; setFaqItems(u); }} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-xs font-bold focus:outline-none focus:border-amber-500/50" />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase mb-1">Answer</label>
                      <textarea rows={2} value={faq.answer || faq.a || ''} onChange={(e) => { const u = [...faqItems]; u[idx].answer = e.target.value; u[idx].a = e.target.value; setFaqItems(u); }} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 text-xs focus:outline-none focus:border-amber-500/50" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 10: REVIEWS */}
        {activeSection === 'reviews' && (
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg text-white">10. Customer Reviews Ticker</h2>
                  <p className="text-slate-400 text-xs mt-0.5">Edit customer reviews and rating testimonials</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setReviewsList([...reviewsList, { id: `rev-${Date.now()}`, author: 'New Customer', text: 'Great experience!', rating: 5, platform: 'Google' }])}
                className="px-3.5 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/20 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Review
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Reviews Section Headline</label>
                <input type="text" value={revTitle} onChange={(e) => setRevTitle(e.target.value)} className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-white font-bold text-sm focus:outline-none focus:border-amber-500/50" />
              </div>

              <div className="space-y-4">
                {reviewsList.map((rev, idx) => (
                  <div key={rev.id || idx} className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3 relative group">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-xs font-mono font-bold text-amber-400">REVIEW #{idx + 1}</span>
                      <div className="flex items-center gap-1.5">
                        <button type="button" disabled={idx === 0} onClick={() => { const u = [...reviewsList]; const temp = u[idx-1]; u[idx-1] = u[idx]; u[idx] = temp; setReviewsList(u); }} className={`p-1.5 rounded-lg border transition-colors ${idx === 0 ? 'border-slate-800/50 text-slate-700' : 'border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800'}`}><ArrowUp className="w-3.5 h-3.5" /></button>
                        <button type="button" disabled={idx === reviewsList.length - 1} onClick={() => { const u = [...reviewsList]; const temp = u[idx+1]; u[idx+1] = u[idx]; u[idx] = temp; setReviewsList(u); }} className={`p-1.5 rounded-lg border transition-colors ${idx === reviewsList.length - 1 ? 'border-slate-800/50 text-slate-700' : 'border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800'}`}><ArrowDown className="w-3.5 h-3.5" /></button>
                        <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); const u = reviewsList.filter((_, i) => i !== idx); setReviewsList(u); }} className="p-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer" title="Remove Item"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input type="text" value={rev.author || ''} onChange={(e) => { const u = [...reviewsList]; u[idx].author = e.target.value; setReviewsList(u); }} placeholder="Customer Name" className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-xs font-bold focus:outline-none focus:border-amber-500/50" />
                      <input type="text" value={rev.platform || ''} onChange={(e) => { const u = [...reviewsList]; u[idx].platform = e.target.value; setReviewsList(u); }} placeholder="Platform (e.g. Google)" className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 font-mono text-xs focus:outline-none focus:border-amber-500/50" />
                    </div>
                    <textarea rows={2} value={rev.text || ''} onChange={(e) => { const u = [...reviewsList]; u[idx].text = e.target.value; setReviewsList(u); }} placeholder="Review Content" className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 text-xs focus:outline-none focus:border-amber-500/50" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 11: BLOG TEASER */}
        {activeSection === 'blog' && (
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg text-white">11. Blog Guides Teaser</h2>
                <p className="text-slate-400 text-xs mt-0.5">Edit homepage blog teaser headline and subtext</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Blog Section Headline</label>
                <input type="text" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-white font-bold text-sm focus:outline-none focus:border-amber-500/50" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Blog Section Subtext</label>
                <textarea rows={2} value={blogSubtext} onChange={(e) => setBlogSubtext(e.target.value)} className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-slate-300 text-xs focus:outline-none focus:border-amber-500/50" />
              </div>
            </div>
            
            <div className="mt-8 border-t border-slate-800 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-base text-white">Embedded Articles Engine</h3>
                <span className="text-xs text-amber-400 font-mono">Full Blog Editor</span>
              </div>
              <BlogModule cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} isEmbedded={true} />
            </div>
          </div>
        )}

        {/* SECTION 12: CTA BANNER */}
        {activeSection === 'cta' && (
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                  <Megaphone className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg text-white">12. Final CTA Conversion Banner</h2>
                  <p className="text-slate-400 text-xs mt-0.5">Edit bottom conversion call-to-action banner text and action buttons</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCtaButtons([...ctaButtons, { id: `btn-${Date.now()}`, label: 'New Action Button', link: 'whatsapp', isPrimary: false }])}
                className="px-3.5 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/20 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Button
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">CTA Banner Headline</label>
                <input type="text" value={ctaHeadline} onChange={(e) => setCtaHeadline(e.target.value)} className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-white font-bold text-sm focus:outline-none focus:border-amber-500/50" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">CTA Banner Subtext</label>
                <textarea rows={2} value={ctaSubtext} onChange={(e) => setCtaSubtext(e.target.value)} className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-slate-300 text-xs focus:outline-none focus:border-amber-500/50" />
              </div>

              {/* CTA Buttons UI */}
              <div className="space-y-4">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">CTA Action Buttons</label>
                {ctaButtons.map((btn, idx) => (
                  <div key={btn.id || idx} className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3 relative group">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-xs font-mono font-bold text-amber-400">BUTTON #{idx + 1}</span>
                      <div className="flex items-center gap-1.5">
                        <button type="button" disabled={idx === 0} onClick={() => { const u = [...ctaButtons]; const temp = u[idx-1]; u[idx-1] = u[idx]; u[idx] = temp; setCtaButtons(u); }} className={`p-1.5 rounded-lg border transition-colors ${idx === 0 ? 'border-slate-800/50 text-slate-700' : 'border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800'}`}><ArrowUp className="w-3.5 h-3.5" /></button>
                        <button type="button" disabled={idx === ctaButtons.length - 1} onClick={() => { const u = [...ctaButtons]; const temp = u[idx+1]; u[idx+1] = u[idx]; u[idx] = temp; setCtaButtons(u); }} className={`p-1.5 rounded-lg border transition-colors ${idx === ctaButtons.length - 1 ? 'border-slate-800/50 text-slate-700' : 'border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800'}`}><ArrowDown className="w-3.5 h-3.5" /></button>
                        <button type="button" onClick={() => { const u = ctaButtons.filter((_, i) => i !== idx); setCtaButtons(u); }} className="p-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input type="text" value={btn.label || ''} onChange={(e) => { const u = [...ctaButtons]; u[idx].label = e.target.value; setCtaButtons(u); }} placeholder="Button Label" className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-xs font-bold focus:outline-none focus:border-amber-500/50" />
                      <input type="text" value={btn.link || ''} onChange={(e) => { const u = [...ctaButtons]; u[idx].link = e.target.value; setCtaButtons(u); }} placeholder="Action Link (e.g. calculator, whatsapp)" className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-amber-400 font-mono text-xs focus:outline-none focus:border-amber-500/50" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Prominent Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold rounded-xl text-sm shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Publish Homepage Section Changes</span>
          </button>
        </div>

      </form>

    </div>
  );
}
