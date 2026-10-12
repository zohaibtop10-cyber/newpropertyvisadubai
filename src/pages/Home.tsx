import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SEOHead } from '../components/SEOHead';
import { XStrapTicker } from '../components/XStrapTicker';
import { AchievementsSection } from '../components/AchievementsSection';
import { JurisdictionTabs } from '../components/JurisdictionTabs';
import { ProcessSection } from '../components/ProcessSection';
import { Accordion } from '../components/Accordion';
import { getLocalBusinessSchema, getFaqSchema } from '../lib/jsonLd';
import {
  useSiteSettings,
  useTestimonials,
  useFaqs,
} from '../hooks/useFirestoreData';
import {
  ShieldCheck, ArrowRight, MessageSquare, Calculator as CalcIcon,
  CheckCircle2, Star, UserCheck, Building2, Users,
  Award, Zap, FileText, ChevronRight, Search, Sparkles, Play, X, Lock, Check,
  RefreshCw, Layers, ArrowUpRight, Compass, Target, HelpCircle, PhoneCall
} from 'lucide-react';

export interface HomeProps {
  onNavigate?: (route: string) => void;
  onOpenCalculator?: (tab?: string) => void;
  homePageData?: any;
  cmsConfig?: any;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onOpenCalculator }) => {
  const { settings } = useSiteSettings();
  const { testimonials } = useTestimonials();
  const { faqs } = useFaqs();

  // Interactive UI State
  const [applicantType, setApplicantType] = useState<'property' | 'investor' | 'family'>('property');
  const [investmentVal, setInvestmentVal] = useState<string>('2,000,000');
  const [referralEmail, setReferralEmail] = useState<string>('');
  const [referralSuccess, setReferralSuccess] = useState<boolean>(false);
  const [faqSearch, setFaqSearch] = useState<string>('');
  const [activeVideo, setActiveVideo] = useState<any>(null);

  const handleLink = (href: string) => {
    if (onNavigate) {
      onNavigate(href);
    } else if (typeof window !== 'undefined') {
      window.location.href = href;
    }
  };

  const handleReferralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (referralEmail.trim()) {
      setReferralSuccess(true);
      setTimeout(() => setReferralSuccess(false), 5000);
      setReferralEmail('');
    }
  };

  // Dynamic fee calculation estimation preview
  const numericVal = parseInt(investmentVal.replace(/,/g, ''), 10) || 0;
  const estimatedFee = applicantType === 'property' 
    ? (numericVal >= 2000000 ? '9,800 AED' : '14,500 AED')
    : applicantType === 'investor' ? '12,500 AED' : '6,900 AED';

  const defaultFaqs = [
    { question: 'What is the minimum property value required for the 10-Year Golden Visa?', answer: 'As per current UAE regulations, an investor needs property valued at AED 2,000,000 or above (mortgaged properties are eligible subject to bank NOC).' },
    { question: 'How fast can my Emirates ID and residency stamp be issued?', answer: 'With our VIP Express Concierge service, biometrics and medical fitness testing are completed with priority chaperoning, resulting in approval typically within 24 to 48 hours.' },
    { question: 'Can I sponsor my spouse, children, and parents under my Golden Visa?', answer: 'Yes, Golden Visa holders enjoy unlimited sponsorship rights for spouses, children of any age, and parents, with residency validity matching the primary sponsor.' },
    { question: 'What documents are required to initiate the visa application?', answer: 'Primary requirements include copy of Passport, Property Title Deed or Trade License, Health Insurance, and Passport-size photo with white background.' },
    { question: 'Are there hidden government fees in your pricing quotes?', answer: 'No. We adhere to strict itemized breakdown policies. Every dirham for GDRFA, ICP, DLD Trustee, medical typing, and VIP escort is clearly itemized.' }
  ];

  const displayFaqs = faqs && faqs.length > 0 ? faqs : defaultFaqs;
  const filteredFaqs = displayFaqs.filter((faq: any) => 
    faq.question.toLowerCase().includes(faqSearch.toLowerCase()) || 
    (faq.answer && faq.answer.toLowerCase().includes(faqSearch.toLowerCase()))
  );

  const whatsappUrl = `https://wa.me/${settings?.whatsapp || '971501234567'}?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20UAE%20Residency%20Visas.`;

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-[#D4AF37]/20 selection:text-[#D4AF37] overflow-x-hidden">
      <SEOHead
        title="UAE Residency & Golden Visa Consultants | 800 DOCS"
        description="Secure your UAE Golden Visa or property residency with 800 DOCS. Expert business consultancy, itemized transparent fees, and fast processing."
        canonicalUrl="https://propertyvisadubai.netlify.app/"
        schema={[
          getLocalBusinessSchema(settings),
          getFaqSchema(displayFaqs),
        ]}
      />
      
      <main className="pt-20 pb-0">

        {/* ========================================================================= */}
        {/* 1. HERO SECTION (EXACT IMAGE 4 REPLICATION)                              */}
        {/* ========================================================================= */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-6">
          
          {/* MAIN HERO CONTAINER BOX (Neo-Corporate Gold Container) */}
          <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/80 rounded-[12px] sm:rounded-[12px] p-6 sm:p-10 lg:p-14 text-white shadow-[0_30px_90px_rgba(212,175,55,0.25)] overflow-hidden min-h-[580px] lg:min-h-[640px] flex flex-col justify-between border-4 border-[#D4AF37]/40">
            
            {/* Giant Background Typographic Numbers "2 0 2 6" from Image 4 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[260px] sm:text-[380px] lg:text-[520px] font-black text-white/[0.12] select-none pointer-events-none leading-none tracking-tighter z-0 font-mono">
              2026
            </div>

            {/* Absolute Center Floating 3D Suit / Gold Pass Rendering (Image 4 exact focal point) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none hidden md:block">
               <motion.div 
                 animate={{ y: [0, -18, 0], rotate: [0, 2, 0] }}
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                 className="relative w-[280px] h-[380px] lg:w-[320px] lg:h-[420px] bg-gradient-to-t from-slate-900 via-blue-950 to-slate-900 rounded-[12px] shadow-[0_35px_90px_rgba(0,0,0,0.6)] border-4 border-white/30 flex flex-col justify-between p-6 backdrop-blur-xl overflow-hidden"
               >
                 <div className="flex items-center justify-between">
                   <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-amber-600 flex items-center justify-center text-white font-black text-xl shadow-md">
                     UAE
                   </div>
                   <span className="text-xs font-mono font-bold text-[#D4AF37] bg-white/10 px-3 py-1 rounded-full border border-[#D4AF37]/40">
                     GOLD PASS
                   </span>
                 </div>
                 
                 {/* 3D Suit Icon Graphic */}
                 <div className="my-auto text-center flex flex-col items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.6)] border-2 border-white">
                      <Award className="w-12 h-12 text-slate-900" />
                    </div>
                    <span className="text-sm font-black text-white mt-4 tracking-wider uppercase font-mono">10-Year Golden Residency</span>
                 </div>

                 <div className="bg-white/10 rounded-2xl p-3 border border-white/20 flex justify-between items-center text-xs font-mono">
                   <span className="text-slate-300">Status</span>
                   <span className="text-emerald-400 font-bold flex items-center gap-1">
                     <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                     GDRFA Approved
                   </span>
                 </div>
               </motion.div>
            </div>

            {/* Split Content Grid (Image 4 Left Card & Right Headline) */}
            <div className="relative z-20 grid lg:grid-cols-12 gap-8 items-center my-auto pt-8 pb-4">
              
              {/* Left Column (Glass Calculator Card from Image 4) */}
              <div className="lg:col-span-4 flex flex-col justify-center">
                <div className="bg-white/15 backdrop-blur-2xl border border-white/30 rounded-[12px] p-6 shadow-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white/80 uppercase tracking-wider">Eligibility & Fee Search</span>
                    <span className="text-[10px] bg-amber-400 text-slate-900 font-extrabold px-2 py-0.5 rounded-full">Instant</span>
                  </div>

                  <div className="relative">
                    <input 
                      type="text"
                      value={investmentVal}
                      onChange={(e) => setInvestmentVal(e.target.value)}
                      placeholder="Enter Property Value e.g. 2,000,000"
                      className="w-full bg-slate-900/80 border border-white/20 rounded-xl px-4 py-3 text-white text-sm placeholder-white/40 focus:outline-none focus:border-amber-400 font-mono shadow-inner"
                    />
                  </div>

                  {/* Category Pills */}
                  <div className="grid grid-cols-3 gap-2">
                    <button onClick={() => setApplicantType('property')} className={`py-2 rounded-lg text-xs font-bold transition-all ${applicantType === 'property' ? 'bg-amber-400 text-slate-900 shadow-md' : 'bg-white/10 text-white hover:bg-white/20'}`}>Property</button>
                    <button onClick={() => setApplicantType('investor')} className={`py-2 rounded-lg text-xs font-bold transition-all ${applicantType === 'investor' ? 'bg-amber-400 text-slate-900 shadow-md' : 'bg-white/10 text-white hover:bg-white/20'}`}>Investor</button>
                    <button onClick={() => setApplicantType('family')} className={`py-2 rounded-lg text-xs font-bold transition-all ${applicantType === 'family' ? 'bg-amber-400 text-slate-900 shadow-md' : 'bg-white/10 text-white hover:bg-white/20'}`}>Family</button>
                  </div>

                  {/* Dynamic Fee Pill */}
                  <div className="bg-slate-900/90 rounded-xl p-3 border border-white/20 flex justify-between items-center text-xs">
                    <span className="text-slate-300">Govt Fee Estimate:</span>
                    <span className="font-mono font-black text-amber-300 text-sm">{estimatedFee}</span>
                  </div>
                </div>

                {/* Bottom Left Note from Image 4 */}
                <div className="mt-4 flex items-center justify-between bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20">
                  <span className="text-xs font-bold text-white">The free AI residency assessment</span>
                  <button onClick={() => onOpenCalculator ? onOpenCalculator('spouse') : handleLink('/calculator')} className="text-xs font-extrabold text-amber-300 hover:underline flex items-center gap-1">
                    How to use →
                  </button>
                </div>
              </div>

              {/* Right Column (Visa Consultancy Hero Headline & Golden Action CTAs) */}
              <div className="lg:col-span-5 lg:col-start-8 text-left space-y-6">
                 
                 <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-[#D4AF37]/50 text-amber-300 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
                   <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                   GDRFA & ICP CERTIFIED DIRECT PARTNER
                 </div>

                 <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.06]">
                   Secure Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-[#D4AF37] to-yellow-400">10-Year UAE</span> Golden Visa
                 </h1>

                 <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
                   Fast-track property residency, family sponsorship, and corporate business setup in Dubai with 100% SLA approval guarantee.
                 </p>

                 {/* Golden Action Buttons */}
                 <div className="flex flex-wrap items-center gap-4 pt-1">
                   <button 
                     onClick={() => window.open(whatsappUrl, '_blank')}
                     className="bg-gradient-to-r from-amber-400 via-[#D4AF37] to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black px-8 py-4 rounded-xl shadow-[0_10px_35px_rgba(212,175,55,0.4)] text-sm uppercase tracking-wider cursor-pointer transform hover:scale-105 transition-all flex items-center gap-2"
                   >
                     <span>START VISA APPLICATION</span>
                     <ArrowUpRight className="w-4 h-4 text-slate-950" />
                   </button>

                   <button 
                     onClick={() => handleLink('/services')}
                     className="bg-white/10 hover:bg-white/20 border-2 border-[#D4AF37]/40 hover:border-[#D4AF37] text-white font-bold px-7 py-4 rounded-xl transition-all text-sm uppercase tracking-wider cursor-pointer backdrop-blur-md"
                   >
                     DISCOVER PACKAGES
                   </button>
                 </div>

                 {/* Stats Counter Bar */}
                 <div className="flex items-center gap-6 pt-4 border-t border-white/15">
                   <div>
                     <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">26,000+</div>
                     <div className="text-[10px] font-bold text-white/80 uppercase">Visas Issued</div>
                   </div>
                   <div className="w-px h-8 bg-white/20"></div>
                   <div>
                     <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">100%</div>
                     <div className="text-[10px] font-bold text-white/80 uppercase">SLA Approval</div>
                   </div>
                   <div className="w-px h-8 bg-white/20"></div>
                   <div>
                     <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">48h</div>
                     <div className="text-[10px] font-bold text-white/80 uppercase">VIP Turnaround</div>
                   </div>
                 </div>

                 {/* Floating White Review Card */}
                 <div className="bg-white text-slate-900 rounded-2xl p-4 shadow-2xl border border-white/40 max-w-xs flex items-center gap-3">
                   <img 
                     src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" 
                     alt="Verified Client" 
                     className="w-10 h-10 rounded-full object-cover border-2 border-amber-400 shrink-0"
                   />
                   <div className="text-left text-xs">
                     <div className="flex text-amber-400 mb-0.5">★★★★★</div>
                     <p className="font-bold leading-tight text-slate-900">"Approved in 24h! Emirates ID delivered."</p>
                   </div>
                 </div>

              </div>

            </div>
          </div>
        </section>

        {/* TICKER */}
        <div className="mt-8 overflow-hidden w-full">
          <XStrapTicker />
        </div>

        {/* ========================================================================= */}
        {/* 2. SERVICES SECTION & CARDS (IMAGE 2 & IMAGE 3 BENTO REPLICATION)          */}
        {/* ========================================================================= */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
          
          {/* Top Pill Tag matching Image 3 */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 px-4 py-1.5 rounded-full text-xs font-bold shadow-sm inline-block mb-3">
              Services
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
              Services we offer
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">
              From sleek 10-year Golden Visas to seamless family sponsorship, our collection is meticulously curated.
            </p>
          </div>

          {/* Bento Grid Layout matching Image 3 Cards Structure */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
             
             {/* Bento Card 1: Left Tall Vertical Card (Golden Visa - Image 3 Left Card) */}
             <div 
               onClick={() => handleLink('/golden-visa')}
               className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-[12px] p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
             >
                <div>
                  {/* Top Image Graphic matching Image 3 */}
                  <div className="w-full h-64 sm:h-72 rounded-[12px] overflow-hidden mb-6 relative">
                    <img 
                      src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop" 
                      alt="Golden Visa" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-amber-400 text-xs font-black px-3.5 py-1 rounded-full border border-amber-400/40">
                      10-Year Validity
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                    Golden Visa for Investors & Executives
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                    Bring residency goals to life with 10-year renewable residency that captures long-term stability and unlocks tax-free prosperity.
                  </p>
                  
                  <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:translate-x-1 inline-flex items-center gap-1 transition-transform">
                    Learn more &rarr;
                  </span>
                </div>

                {/* Bottom Avatars Proof Pill matching Image 3 */}
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                  <div className="flex -space-x-2 overflow-hidden">
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop" alt="" />
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop" alt="" />
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop" alt="" />
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop" alt="" />
                  </div>
                  <div>
                    <div className="flex text-amber-400 text-xs">★★★★★</div>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Grown over 15K+ clients</span>
                  </div>
                </div>
             </div>

             {/* Right Column Cards (Image 3 Right Stack Cards) */}
             <div className="lg:col-span-7 flex flex-col gap-8">
                
                {/* Bento Card 2: Top Right Wide Horizontal Card (Property Visa) */}
                <div 
                  onClick={() => handleLink('/property-visa')}
                  className="bg-white dark:bg-slate-900 rounded-[12px] p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 grid sm:grid-cols-12 gap-6 items-center group cursor-pointer"
                >
                   <div className="sm:col-span-5 h-48 sm:h-full min-h-[180px] rounded-[12px] overflow-hidden relative">
                     <img 
                       src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop" 
                       alt="Property Visa" 
                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                     />
                   </div>
                   <div className="sm:col-span-7 flex flex-col justify-between">
                     <div>
                       <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                         Property Residency (2-Yr & 10-Yr)
                       </h3>
                       <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
                         Direct DLD Trustee submission for completed or mortgaged real estate assets starting from AED 750,000.
                       </p>
                     </div>
                     <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:translate-x-1 inline-flex items-center gap-1 transition-transform">
                       Learn more &rarr;
                     </span>
                   </div>
                </div>

                {/* Bento Card 3: Bottom Right Wide Horizontal Card (Family Visa) */}
                <div 
                  onClick={() => handleLink('/family-visa')}
                  className="bg-white dark:bg-slate-900 rounded-[12px] p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 grid sm:grid-cols-12 gap-6 items-center group cursor-pointer"
                >
                   <div className="sm:col-span-5 h-48 sm:h-full min-h-[180px] rounded-[12px] overflow-hidden relative">
                     <img 
                       src="https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?q=80&w=800&auto=format&fit=crop" 
                       alt="Family Visa" 
                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                     />
                   </div>
                   <div className="sm:col-span-7 flex flex-col justify-between">
                     <div>
                       <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                         Family & Spouse Sponsorship
                       </h3>
                       <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
                         Sponsor spouse, children of any age, and parents with 100% SLA approval rate and VIP chaperoned medical typing.
                       </p>
                     </div>
                     <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:translate-x-1 inline-flex items-center gap-1 transition-transform">
                       Learn more &rarr;
                     </span>
                   </div>
                </div>

             </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* JURISDICTION COMPARISON TABS (BEST-SOLUTION.AE MECHANIC REPLICATION)       */}
        {/* ========================================================================= */}
        <JurisdictionTabs onNavigate={handleLink} />

        {/* ========================================================================= */}
        {/* 3. PROCESS SECTION (EXACT 6-STEP CYCLICAL WORKFLOW REPLICATION)           */}
        {/* ========================================================================= */}
        <ProcessSection />

        {/* ========================================================================= */}
        {/* 4. ACHIEVEMENTS & AWARDS SECTION (EXACT IMAGE 2 REPLICATION)              */}
        {/* ========================================================================= */}
        <AchievementsSection />

        {/* 5. WHY CHOOSE US (Modern Rotated Floating Cards with Gold Hairline Borders & Pins) */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 py-28 overflow-hidden relative">
          <div className="text-center max-w-3xl mx-auto mb-20">
             <span className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-[#D4AF37]/30 text-[#D4AF37] dark:text-amber-300 px-4 py-1.5 rounded-full text-xs font-mono font-black uppercase tracking-widest shadow-sm inline-block mb-3">
               INSTITUTIONAL ADVANTAGE
             </span>
             <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
               Why <span className="italic font-serif text-[#D4AF37] underline decoration-[#D4AF37]/40">Choose</span> 800 DOCS?
             </h2>
             <p className="text-lg text-slate-600 dark:text-slate-300">Here's why corporate leaders & investors trust us to handle their Dubai residency needs.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
             
             {/* Card 1: Expertise (Yellow top dot) */}
             <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-[12px] border-2 border-[#D4AF37]/30 dark:border-[#D4AF37]/30 shadow-xl hover:shadow-[0_25px_60px_rgba(212,175,55,0.2)] relative -rotate-2 hover:rotate-0 transition-all duration-300 flex flex-col items-center text-center group">
                <div className="w-11 h-11 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full shadow-[0_6px_20px_rgba(245,158,11,0.5)] border-2 border-white dark:border-slate-800 mb-6 flex items-center justify-center shrink-0 -mt-2 group-hover:scale-110 transition-transform">
                  <div className="w-4 h-4 rounded-full bg-white/70"></div>
                </div>
                <h3 className="text-2xl font-black mb-3 text-slate-900 dark:text-white group-hover:text-[#D4AF37] transition-colors">100% Guaranteed SLA Accuracy</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                  Our senior team of PROs and legal consultants pre-audit every document to eliminate rejections before GDRFA & DLD filing.
                </p>
             </div>

             {/* Card 2: Custom Solutions (Purple top dot) */}
             <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-[12px] border-2 border-[#D4AF37]/30 dark:border-[#D4AF37]/30 shadow-xl hover:shadow-[0_25px_60px_rgba(212,175,55,0.2)] relative rotate-2 hover:rotate-0 transition-all duration-300 flex flex-col items-center text-center group">
                <div className="w-11 h-11 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full shadow-[0_6px_20px_rgba(212,175,55,0.5)] border-2 border-white dark:border-slate-800 mb-6 flex items-center justify-center shrink-0 -mt-2 group-hover:scale-110 transition-transform">
                  <div className="w-4 h-4 rounded-full bg-white/70"></div>
                </div>
                <h3 className="text-2xl font-black mb-3 text-slate-900 dark:text-white group-hover:text-[#D4AF37] transition-colors">Bespoke Golden Visa Mapping</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                  Tailored property asset structuring, commercial trade license evaluation, and family residency mapping designed for your wealth goals.
                </p>
             </div>

             {/* Card 3: Customer-Focused (Pink top dot) */}
             <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-[12px] border-2 border-[#D4AF37]/30 dark:border-[#D4AF37]/30 shadow-xl hover:shadow-[0_25px_60px_rgba(212,175,55,0.2)] relative -rotate-1 hover:rotate-0 transition-all duration-300 flex flex-col items-center text-center group">
                <div className="w-11 h-11 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full shadow-[0_6px_20px_rgba(245,158,11,0.5)] border-2 border-white dark:border-slate-800 mb-6 flex items-center justify-center shrink-0 -mt-2 group-hover:scale-110 transition-transform">
                  <div className="w-4 h-4 rounded-full bg-white/70"></div>
                </div>
                <h3 className="text-2xl font-black mb-3 text-slate-900 dark:text-white group-hover:text-[#D4AF37] transition-colors">VIP Chaperoned Concierge</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                  Dedicated executive PRO officer escorts you through fast-track medical fitness testing and biometric typing with private luxury transport.
                </p>
             </div>

             {/* Card 4: Direct Portal Access (Blue top dot) */}
             <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-[12px] border-2 border-[#D4AF37]/30 dark:border-[#D4AF37]/30 shadow-xl hover:shadow-[0_25px_60px_rgba(212,175,55,0.2)] relative rotate-3 hover:rotate-0 transition-all duration-300 flex flex-col items-center text-center group">
                <div className="w-11 h-11 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full shadow-[0_6px_20px_rgba(212,175,55,0.5)] border-2 border-white dark:border-slate-800 mb-6 flex items-center justify-center shrink-0 -mt-2 group-hover:scale-110 transition-transform">
                  <div className="w-4 h-4 rounded-full bg-white/70"></div>
                </div>
                <h3 className="text-2xl font-black mb-3 text-slate-900 dark:text-white group-hover:text-[#D4AF37] transition-colors">Direct Portal Integration</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                  Certified government portal access with direct ICP & GDRFA API connectivity — ensuring zero operational delay for your visa stamping.
                </p>
             </div>

          </div>
        </section>

        {/* 5. REVIEWS SECTION (Executive Video Case Studies & Ratings) */}
        <section className="bg-[#050505] py-28 px-4 sm:px-6 lg:px-8 border-t border-b border-white/10 relative overflow-hidden font-sans">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
            
            {/* Left Column: Anchor Quote Block */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>
                <span className="text-xs font-bold tracking-widest text-slate-400 uppercase font-mono">
                  5.0 STAR EXECUTIVE RATING (VERIFIED BY CLUTCH & TRUSTPILOT)
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight font-sans">
                &ldquo;Brightlink & 800 DOCS structured our Golden Visas with mathematical precision.&rdquo;
              </h2>

              <p className="text-slate-300 text-base md:text-lg leading-relaxed font-sans font-medium">
                From property title deed verification to MOFA document attestations and VIP medical clearances, their senior PRO team managed every milestone with total transparency and zero operational delay.
              </p>

              <div className="border-t border-white/15 pt-6 mt-6 flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
                  alt="Sir Arthur James Montgomery"
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#D4AF37] shadow-md shrink-0"
                />
                <div>
                  <h4 className="text-white font-bold text-base font-sans">
                    Sir Arthur James Montgomery
                  </h4>
                  <p className="text-slate-400 text-xs font-sans font-medium">
                    Managing Director, Sovereign Global Capital Ltd
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Video Case Study Cards */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {[
                {
                  id: 'difc-setup',
                  category: 'CASE STUDY: GOLDEN VISA ASSET MAPPING',
                  name: 'Elena Rostova',
                  title: 'Managing Partner, Volex Risk Solutions',
                  image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'
                },
                {
                  id: 'family-office',
                  category: 'CASE STUDY: FAMILY RESIDENCY SPONSORSHIP',
                  name: 'Tariq Al-Mansoor',
                  title: 'Principal, Al-Mansoor Family Office',
                  image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop'
                }
              ].map((study, idx) => (
                <div
                  key={study.id}
                  onClick={() => setActiveVideo(study)}
                  className="relative h-[210px] w-full rounded-[12px] overflow-hidden group cursor-pointer border border-white/15 hover:border-[#D4AF37] transition-all duration-500 shadow-2xl"
                >
                  <img
                    src={study.image}
                    alt={study.name}
                    className="object-cover w-full h-full grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent pointer-events-none" />

                  <div className="absolute bottom-5 left-6 z-10 max-w-[70%]">
                    <span className="block text-[#D4AF37] text-[10px] font-bold tracking-wider uppercase mb-1 font-mono">
                      {study.category}
                    </span>
                    <h3 className="text-white font-bold text-lg font-sans group-hover:text-amber-300 transition-colors">
                      {study.name}
                    </h3>
                    <p className="text-slate-300 text-xs font-sans">
                      {study.title}
                    </p>
                  </div>

                  <div className="absolute right-6 bottom-5 z-10">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-tr from-amber-400 to-[#D4AF37] text-slate-950 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Play className="w-5 h-5 fill-slate-950 text-slate-950 translate-x-0.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 6. REFERRAL PROGRAM SECTION (3-Layer Window Stack) */}
        <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#D4AF37] font-bold tracking-wider text-xs uppercase mb-2 block font-mono">Client Ambassador Program</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">Refer & Earn Concierge Rewards</h2>
          </div>

          <div className="relative w-full max-w-[1200px] mx-auto min-h-[580px] flex items-center justify-center">
            
            {/* Back Card */}
            <div className="absolute inset-x-0 top-0 h-[520px] bg-slate-800/90 dark:bg-slate-900/90 rounded-[12px] border border-slate-700 shadow-xl transform -translate-x-8 -translate-y-8 scale-95 opacity-50 hidden md:block">
              <div className="h-10 border-b border-slate-700/60 px-6 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              </div>
            </div>

            {/* Middle Card */}
            <div className="absolute inset-x-0 top-0 h-[530px] bg-slate-900/95 dark:bg-slate-800/95 rounded-[12px] border border-[#D4AF37]/30 shadow-2xl transform -translate-x-4 -translate-y-4 scale-98 opacity-75 hidden sm:block">
              <div className="h-10 border-b border-slate-700 px-6 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              </div>
            </div>

            {/* Front Active Card */}
            <div className="relative w-full bg-white dark:bg-slate-900 rounded-[12px] border border-slate-200 dark:border-slate-800 shadow-[0_30px_80px_rgba(0,0,0,0.15)] overflow-hidden z-20">
              
              <div className="bg-slate-100 dark:bg-slate-800/90 px-6 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                </div>
                <div className="bg-white dark:bg-slate-900 text-amber-500 font-bold text-xs px-4 py-1 rounded-full border border-slate-200 dark:border-slate-700 font-mono">
                  https://800docs.ae/ambassador-portal
                </div>
                <div className="w-12"></div>
              </div>

              <div className="relative bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/80 p-8 sm:p-12 lg:p-16 text-white min-h-[260px] flex flex-col justify-center border-b border-[#D4AF37]/30">
                <div className="relative z-10 max-w-xl">
                  <h3 className="text-3xl sm:text-4xl font-black mb-3 text-white tracking-tight">
                    Travel & Residency without limits
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base mb-8 leading-relaxed">
                    Find the right Golden Visa or family sponsorship for your future in Dubai & UAE, easily in 48 hours.
                  </p>

                  {referralSuccess ? (
                    <div className="bg-amber-500/20 border border-amber-500/50 text-amber-300 p-4 rounded-2xl font-bold text-sm">
                      ✓ Invitation sent successfully! Our VIP ambassador team will reach out shortly.
                    </div>
                  ) : (
                    <form onSubmit={handleReferralSubmit} className="bg-white/10 backdrop-blur-xl border border-white/20 p-2 rounded-2xl flex flex-col sm:flex-row gap-2 max-w-lg shadow-2xl">
                      <div className="flex-grow flex items-center bg-slate-900/80 rounded-xl px-4 py-3 border border-white/10">
                        <UserCheck className="w-5 h-5 text-[#D4AF37] mr-3 shrink-0" />
                        <input 
                          type="email" 
                          required
                          value={referralEmail}
                          onChange={(e) => setReferralEmail(e.target.value)}
                          placeholder="Colleague's Email Address" 
                          className="bg-transparent border-none outline-none text-white placeholder:text-slate-400 w-full focus:ring-0 text-sm font-sans" 
                        />
                      </div>
                      <button type="submit" className="bg-gradient-to-r from-amber-400 via-[#D4AF37] to-amber-500 text-slate-950 font-black px-6 py-3.5 rounded-xl hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all shadow-lg flex items-center justify-center gap-2 text-sm shrink-0 cursor-pointer">
                        <span>Send Invite</span>
                        <Search className="w-4 h-4" />
                      </button>
                    </form>
                  )}
                </div>
              </div>

              <div className="p-8 sm:p-12 bg-white dark:bg-slate-900 grid grid-cols-2 md:grid-cols-5 gap-8 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white uppercase mb-3">Overview</h4>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[11px]">
                    800 DOCS is the premier VIP residency and corporate setup group in the UAE.
                  </p>
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white uppercase mb-3">Services</h4>
                  <ul className="space-y-2 text-slate-500 dark:text-slate-400 font-medium">
                    <li><a href="#golden-visa" onClick={() => handleLink('/golden-visa')} className="hover:text-[#D4AF37]">Golden Visa</a></li>
                    <li><a href="#property" onClick={() => handleLink('/property-visa')} className="hover:text-[#D4AF37]">Property Visa</a></li>
                    <li><a href="#family" onClick={() => handleLink('/family-visa')} className="hover:text-[#D4AF37]">Family Sponsorship</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white uppercase mb-3">Company</h4>
                  <ul className="space-y-2 text-slate-500 dark:text-slate-400 font-medium">
                    <li><a href="#about" onClick={() => handleLink('/about')} className="hover:text-[#D4AF37]">About Us</a></li>
                    <li><a href="#articles" onClick={() => handleLink('/articles')} className="hover:text-[#D4AF37]">Articles</a></li>
                    <li><a href="#faq" className="hover:text-[#D4AF37]">FAQ</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white uppercase mb-3">Governance</h4>
                  <ul className="space-y-2 text-slate-500 dark:text-slate-400 font-medium">
                    <li>GDRFA Partner</li>
                    <li>ICP Direct Portal</li>
                    <li>DLD Trustee</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white uppercase mb-3">Follow Us</h4>
                  <div className="flex gap-3 text-slate-400">
                    <span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold hover:text-[#D4AF37] cursor-pointer">in</span>
                    <span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold hover:text-[#D4AF37] cursor-pointer">x</span>
                    <span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold hover:text-[#D4AF37] cursor-pointer">f</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 7. FAQS SECTION (Question Graphic Card on Left & Accordion on Right) */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 py-20">
          <div className="bg-white dark:bg-slate-900 rounded-[12px] shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-8 sm:p-12 lg:p-16 border border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row gap-12 items-center">
            
            <div className="lg:w-1/3 flex flex-col items-center text-center w-full">
              <div className="w-48 h-48 sm:w-56 sm:h-56 bg-gradient-to-br from-amber-400 via-[#D4AF37] to-yellow-600 rounded-[3rem] rotate-6 flex items-center justify-center mb-6 relative shadow-2xl border-4 border-white dark:border-slate-800">
                 <div className="absolute inset-0 bg-white/10 rounded-[3rem] -rotate-6"></div>
                 <span className="text-8xl font-black text-slate-950 drop-shadow-md -rotate-6 select-none">?</span>
              </div>
              <h3 className="text-3xl font-black mb-2 tracking-tight text-slate-900 dark:text-white">Frequently Asked Questions</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs leading-relaxed mb-6">
                Everything you need to know about processing times, government fees, and eligibility criteria.
              </p>

              <div className="relative w-full max-w-sm">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                  placeholder="Search FAQ topics..." 
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-[#D4AF37] transition-all"
                />
              </div>
            </div>
            
            <div className="lg:w-2/3 w-full">
              <Accordion 
                items={filteredFaqs.map((faq: any, idx: number) => ({
                  id: faq.id || `faq-${idx}`,
                  title: faq.question,
                  content: (
                    <div className="p-6 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl mt-2 shadow-sm">
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm font-medium">{faq.answer}</p>
                    </div>
                  )
                }))}
              />
            </div>
            
          </div>
        </section>

        {/* 8. FINAL CTA BANNER (5 Fanning App Screens Display) */}
        <section className="bg-slate-100/70 dark:bg-slate-900/70 pt-28 pb-16 overflow-hidden text-center relative border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-[850px] mx-auto px-4 relative z-20 mb-12">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4 text-slate-900 dark:text-white">
              Your All-in-One Visa Partner
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Track rights, status, document upload and visa guidance in 1 app on the go. Get real-time status updates, schedules, smart info.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-14">
              <button onClick={() => window.open(whatsappUrl, '_blank')} className="bg-slate-900 text-white px-7 py-3.5 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl flex items-center gap-3 cursor-pointer border border-[#D4AF37]/30">
                 <svg className="w-6 h-6 fill-current text-amber-400" viewBox="0 0 24 24"><path d="M3.609 1.814L13.792 12 3.61 22.186c-.165-.183-.284-.424-.284-.714V2.528c0-.29.119-.531.283-.714zM14.736 12.946l2.846 2.846-13.063 7.54c.264.183.585.263.906.263.302 0 .586-.08.849-.244l11.41-6.582-2.948-3.823zm3.921-3.415c.378.22.604.604.604 1.056 0 .452-.226.836-.604 1.056l-2.093 1.207-3.13-3.13 3.13-3.13 2.093 1.207zm-4.864 2.56L2.383 4.55C2.12 4.386 1.836 4.306 1.534 4.306c-.32 0-.641.08-.905.263l13.164 7.522z"/></svg>
                 <div className="text-left leading-none">
                    <span className="text-[9px] uppercase font-bold text-slate-400">GET IT ON</span><br/>
                    <span className="text-sm font-black text-amber-300">Google Play</span>
                 </div>
              </button>

              <button onClick={() => window.open(whatsappUrl, '_blank')} className="bg-slate-900 text-white px-7 py-3.5 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl flex items-center gap-3 cursor-pointer border border-[#D4AF37]/30">
                 <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.31-.88 3.5-.8 1.49.09 2.59.59 3.34 1.55-2.92 1.77-2.39 5.86.43 7.15-.65 1.73-1.48 3.44-2.35 4.27zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                 <div className="text-left leading-none">
                    <span className="text-[9px] uppercase font-bold text-slate-400">Download on the</span><br/>
                    <span className="text-sm font-black text-amber-300">App Store</span>
                 </div>
              </button>
            </div>
          </div>
          
          <div className="relative max-w-[1100px] mx-auto h-[340px] md:h-[480px] flex justify-center items-end overflow-hidden px-4">
            
            <div className="absolute bottom-0 -ml-[450px] w-[200px] md:w-[260px] h-[360px] md:h-[460px] bg-gradient-to-b from-amber-600 to-amber-900 rounded-t-[36px] shadow-2xl border-4 border-white dark:border-slate-800 origin-bottom z-0 hidden lg:flex flex-col p-5 text-white text-left">
               <div className="w-8 h-8 rounded-xl bg-white/20 mb-4 flex items-center justify-center font-bold">01</div>
               <div className="text-xs font-bold">Document Locker</div>
            </div>

            <div className="absolute bottom-0 -ml-[230px] w-[220px] md:w-[280px] h-[380px] md:h-[480px] bg-gradient-to-b from-amber-500 to-amber-700 rounded-t-[36px] shadow-2xl border-6 border-white dark:border-slate-800 origin-bottom z-10 hidden sm:flex flex-col p-6 text-white text-left">
               <div className="w-10 h-10 rounded-2xl bg-white/20 mb-4 flex items-center justify-center font-bold">02</div>
               <div className="text-sm font-extrabold">Visa Requirements</div>
            </div>
            
            <div className="absolute bottom-0 w-[260px] md:w-[340px] h-[420px] md:h-[520px] bg-white dark:bg-slate-900 rounded-t-[44px] shadow-[0_-20px_60px_rgba(212,175,55,0.3)] border-8 border-white dark:border-slate-800 z-20 flex flex-col overflow-hidden text-left p-6">
               <div className="bg-gradient-to-r from-amber-500 via-[#D4AF37] to-yellow-500 rounded-2xl p-5 text-slate-950 mb-4 shadow-md">
                 <div className="text-[10px] font-black uppercase tracking-wider opacity-90 mb-1">Welcome to 800 DOCS</div>
                 <div className="text-xl font-black">Visa Portal Active</div>
               </div>
               
               <div className="grid grid-cols-2 gap-3 flex-1">
                 {[
                   { title: 'Golden Visa', icon: <Award className="w-5 h-5 text-[#D4AF37]" /> },
                   { title: 'Property Visa', icon: <Building2 className="w-5 h-5 text-[#D4AF37]" /> },
                   { title: 'Family Sponsor', icon: <Users className="w-5 h-5 text-[#D4AF37]" /> },
                   { title: 'PRO Setup', icon: <FileText className="w-5 h-5 text-[#D4AF37]" /> }
                 ].map((item, i) => (
                   <div key={i} className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-3 border border-slate-100 dark:border-slate-700 flex flex-col justify-between">
                     {item.icon}
                     <span className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</span>
                   </div>
                 ))}
               </div>
            </div>

            <div className="absolute bottom-0 ml-[230px] w-[220px] md:w-[280px] h-[380px] md:h-[480px] bg-gradient-to-b from-amber-500 to-amber-700 rounded-t-[36px] shadow-2xl border-6 border-white dark:border-slate-800 origin-bottom z-10 hidden sm:flex flex-col p-6 text-white text-left">
               <div className="w-10 h-10 rounded-2xl bg-white/20 mb-4 flex items-center justify-center font-bold">04</div>
               <div className="text-sm font-extrabold">Track Status</div>
            </div>

            <div className="absolute bottom-0 ml-[450px] w-[200px] md:w-[260px] h-[360px] md:h-[460px] bg-gradient-to-b from-amber-600 to-amber-900 rounded-t-[36px] shadow-2xl border-4 border-white dark:border-slate-800 origin-bottom z-0 hidden lg:flex flex-col p-5 text-white text-left">
               <div className="w-8 h-8 rounded-xl bg-white/20 mb-4 flex items-center justify-center font-bold">05</div>
               <div className="text-xs font-bold">24/7 VIP Chat</div>
            </div>
            
          </div>

          <div className="max-w-[1100px] mx-auto pt-16 px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-left text-xs border-t border-slate-200 dark:border-slate-800">
            <div>
              <h4 className="font-extrabold text-slate-900 dark:text-white uppercase mb-3">About 800 DOCS</h4>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[11px]">
                Creating extraordinary UAE residency & corporate advisory experiences since 2012. Your trusted government partner.
              </p>
            </div>

            <div>
              <h4 className="font-extrabold text-slate-900 dark:text-white uppercase mb-3">Quick Links</h4>
              <ul className="space-y-2 text-slate-500 dark:text-slate-400 font-medium">
                <li><a href="#about" onClick={() => handleLink('/about')} className="hover:text-[#D4AF37]">About Us</a></li>
                <li><a href="#services" onClick={() => handleLink('/services')} className="hover:text-[#D4AF37]">Residency Packages</a></li>
                <li><a href="#articles" onClick={() => handleLink('/articles')} className="hover:text-[#D4AF37]">Dubai Guides</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-extrabold text-slate-900 dark:text-white uppercase mb-3">Support</h4>
              <ul className="space-y-2 text-slate-500 dark:text-slate-400 font-medium">
                <li><a href="#faq" className="hover:text-[#D4AF37]">FAQs</a></li>
                <li><a href="#terms" onClick={() => handleLink('/terms')} className="hover:text-[#D4AF37]">Terms of Service</a></li>
                <li><a href="#privacy" className="hover:text-[#D4AF37]">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-extrabold text-slate-900 dark:text-white uppercase mb-3">Contact Us</h4>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[11px] space-y-1">
                <span className="block">📍 Business Bay, Suite 402, Dubai, UAE</span>
                <span className="block">📞 +971 4 000 0000</span>
                <span className="block">✉️ advisory@800docs.ae</span>
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Home;
