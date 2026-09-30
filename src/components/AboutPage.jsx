import React, { useState, useEffect } from 'react';
import { 
  Shield, Clock, Award, Users, ChevronRight, Target, Lightbulb, 
  Diamond, Briefcase, Globe, CheckCircle2, Zap, Phone, MapPin, 
  Quote, Star, Building2, Handshake, ArrowRight, FileText 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

// --- DATA ABSTRACTION (100% Matching Brightlink's Structure) ---
export const aboutPageData = {
  hero: {
    badge: "Official DET-Licensed Provider",
    title: "About 800 DOCS — Your Trusted UAE Consultancy",
    subtitle: "800 DOCS is a UAE-based consultancy providing comprehensive solutions for individuals, families, investors, entrepreneurs, and businesses — from residency and Golden Visas to business setup, corporate, property, and professional services.",
    carousel: ["The 800 DOCS Advantage", "Dedicated VIP Office", "Lightning Fast", "Expert Legal Review", "Data Privacy"]
  },
  welcome: {
    badge: "Welcome to 800 DOCS UAE",
    title: "A Strong Future Starts with a Strong Foundation",
    p1: "As your trusted UAE consultancy partner, 800 DOCS helps individuals, families, investors, entrepreneurs, and businesses turn their goals into reality.",
    p2: "From UAE residency and Golden Visas to business setup, property and professional services, we simplify complex processes and provide clear, reliable support — so you can move forward with confidence.",
    ceo: {
      title: "Founder & CEO, 800 DOCS",
      name: "Executive Director",
      description: "Driven by a vision to connect ambition with opportunity. Through 800 DOCS, they help entrepreneurs, investors, professionals, and families navigate the UAE with clarity, confidence, and trusted support.",
      quote: "I built 800 DOCS with one purpose — to create a link between ambition and opportunity. When our clients grow, establish themselves, and achieve their goals, we grow with them."
    },
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop"
  },
  license: {
    badge: "DET Verified Authority",
    title: "Officially Licensed for Government Applications",
    description: "We are a registered Dubai consultancy, authorised to support and process your government applications with confidence and transparency.",
    daysImpact: "2500+",
    card: {
      authority: "Government of Dubai – Economy & Tourism (DET)",
      licenseNo: "800-DOCS-LLC",
      businessName: "800 DOCS Management Consultancy LLC",
      registrationDate: "10/04/2015",
      legalType: "LLC",
      activities: "Management Consultancies | Documents Clearing Services | Project Development Consultant"
    }
  },
  strength: {
    badge: "Active",
    title: "Our Strength in Numbers",
    subtitle: "Trusted UAE Consultants with 10+ Years of Experience",
    stats: [
      { value: "10+", label: "Years in Market" },
      { value: "4.9", label: "Google Rating" },
      { value: "25+", label: "Team Members" },
      { value: "15,000+", label: "Clients Assisted" }
    ],
    p1: "At 800 DOCS, we provide end-to-end support for individuals, investors, entrepreneurs, families, and businesses across the UAE. From business setup and residency to Golden Visas, property, and professional services, our team delivers clear guidance and practical solutions at every stage.",
    p2: "We believe great service goes beyond completing a transaction — it’s about building trust, simplifying the journey, and creating long-term relationships with our clients."
  },
  trustedPartner: {
    badge: "Your",
    title: "Trusted Partner for Business, Residency & Professional Services in the UAE",
    p1: "800 DOCS Management Consultancy is a UAE-based consultancy and VIP service centre providing end-to-end government, residency, and business solutions for UAE nationals, residents, and international investors. We simplify complex government procedures by offering multiple essential services under one roof.",
    p2: "Focused on efficiency, transparency, and premium client experience, 800 DOCS helps individuals and companies complete most procedures quickly with dedicated support, pre-scheduled appointments, and fast-track VIP assistance.",
    office: {
      address: "VIP Suite, Corporate Hub Building, Business Bay, Dubai, U.A.E",
      hours: "Monday – Saturday: 9:00 am – 6:00 pm | Sunday: Closed",
      phone: "+971 800 3627"
    }
  },
  visionMission: {
    badge: "Our Vision & Mission",
    title: "Your Goals Matter to Us",
    description: "At 800 DOCS, understanding your goals comes first. Whether you’re starting a business, investing, relocating, or establishing your future in the UAE, we provide clear guidance and dependable support throughout your journey.",
    tabs: [
      { id: "promise", label: "Our Promise", content: "To make every process simple, transparent, and stress-free. We provide tailored solutions, clear communication, and end-to-end support so you can move forward with confidence." },
      { id: "mission", label: "Our Mission", content: "To empower entrepreneurs, investors, professionals, and families with reliable, personalized, and practical solutions for achieving their goals in the UAE." },
      { id: "vision", label: "Our Vision", content: "To be a trusted link between people and opportunities in the UAE — helping our clients establish, grow, invest, and build their future with confidence." }
    ]
  },
  pillars: {
    badge: "Why 800 DOCS?",
    title: "What Makes Us Different",
    subtitle: "Connecting ambition with opportunity through trusted UAE expertise.",
    items: [
      { icon: "Shield", title: "Trust", desc: "We stand by you from your first enquiry to successful completion." },
      { icon: "CheckCircle2", title: "Reliability", desc: "Clear communication, responsive support, and commitments you can depend on." },
      { icon: "Diamond", title: "Transparency", desc: "Straightforward guidance, clear costs, and visibility at every stage." },
      { icon: "Users", title: "Client Experience", desc: "Personalised support designed to make every process simple and stress-free." },
      { icon: "Award", title: "Service Excellence", desc: "Professional service focused on quality, efficiency, and long-term client relationships." }
    ]
  },
  reviews: {
    badge: "Client Success Stories | Trusted UAE Consultancy",
    title: "Real Clients, Real Results",
    description: "The best reflection of our commitment is the experience of the people and businesses we serve. From UAE residency and Golden Visas to business setup, property services, PRO services, and more, discover how 800 DOCS has helped clients achieve their goals.",
    items: [
      { name: "M J", text: "I highly recommend it, very professional and effective. They guided my Golden Visa perfectly." },
      { name: "Tausif Ahmad", text: "Excellent service with prompt response and follow up action. Transparent from day one." },
      { name: "ZeeShan Butt", text: "Excellent service.. very Honest and helpful team. They set up my mainland business effortlessly." },
      { name: "Muhammad", text: "800 DOCS management deserved 100/100. VIP treatment all the way." }
    ]
  },
  businessSetup: {
    title: "Start Your Dubai Business with Confidence",
    description: "Whether you’re starting a new business, expanding into the UAE, or relocating your company to Dubai, 800 DOCS provides end-to-end business setup support tailored to your goals. Speak with our business setup specialists today and start your UAE company quickly, compliantly, and with confidence.",
    highlights: [
      { title: "VIP Service", desc: "Personalised assistance with priority processing and queue-free support." },
      { title: "Affordable Fees", desc: "Official government-regulated fees with transparent and fixed pricing." },
      { title: "All Services in One Place", desc: "Access to a wide range of UAE government services under one roof." },
      { title: "One-Visit Completion", desc: "Most procedures can be completed in a single visit to our office." }
    ]
  },
  referral: {
    title: "Grow Together with Our B2B Referral Program",
    description: "Partner with 800 DOCS through our structured B2B and Corporate Referral Program. Refer clients who need Business Setup, Golden Visa, Family Visa, Attestation, VAT & Corporate Tax, PRO, or Corporate Services and benefit from a transparent referral structure.",
    buttonText: "Become a Referral Partner"
  }
};

const iconMap = {
  Shield: <Shield className="w-8 h-8 text-brand-gold" />,
  Users: <Users className="w-8 h-8 text-brand-gold" />,
  Award: <Award className="w-8 h-8 text-brand-gold" />,
  CheckCircle2: <CheckCircle2 className="w-8 h-8 text-brand-gold" />,
  Target: <Target className="w-8 h-8 text-brand-gold" />,
  Lightbulb: <Lightbulb className="w-8 h-8 text-brand-gold" />,
  Diamond: <Diamond className="w-8 h-8 text-brand-gold" />,
  Briefcase: <Briefcase className="w-8 h-8 text-brand-gold" />,
  Globe: <Globe className="w-8 h-8 text-brand-gold" />,
  Zap: <Zap className="w-8 h-8 text-brand-gold" />
};

export default function AboutPage({ onOpenCalculator, onNavigate, cmsConfig }) {
  const cms = cmsConfig?.aboutPage;
  const data = JSON.parse(JSON.stringify(aboutPageData));
  
  // Deep merge CMS overrides into each section
  if (cms?.hero) Object.assign(data.hero, cms.hero);
  if (cms?.welcome) {
    Object.assign(data.welcome, cms.welcome);
    if (cms.welcome.ceo) Object.assign(data.welcome.ceo, cms.welcome.ceo);
  }
  if (cms?.license) {
    Object.assign(data.license, cms.license);
    if (cms.license.card) Object.assign(data.license.card, cms.license.card);
  }
  if (cms?.strength) {
    Object.assign(data.strength, cms.strength);
    if (cms.strength.stats) data.strength.stats = cms.strength.stats;
  }
  if (cms?.visionMission) {
    Object.assign(data.visionMission, cms.visionMission);
    if (cms.visionMission.tabs) data.visionMission.tabs = cms.visionMission.tabs;
  }
  if (cms?.pillars) {
    Object.assign(data.pillars, cms.pillars);
    if (cms.pillars.items) data.pillars.items = cms.pillars.items;
  }
  if (cms?.reviews) {
    Object.assign(data.reviews, cms.reviews);
    if (cms.reviews.items) data.reviews.items = cms.reviews.items;
  }
  if (cms?.businessSetup) Object.assign(data.businessSetup, cms.businessSetup);
  if (cms?.referral) Object.assign(data.referral, cms.referral);

  // Also support pages.about overrides (from InnerPagesEditor)
  if (cmsConfig?.pages?.about) {
    if (cmsConfig.pages.about.headline) data.hero.title = cmsConfig.pages.about.headline;
    if (cmsConfig.pages.about.subtext) data.hero.subtitle = cmsConfig.pages.about.subtext;
    if (cmsConfig.pages.about.licensedEntity) data.license.description = cmsConfig.pages.about.licensedEntity;
  }

  const [activeTab, setActiveTab] = useState('promise');
  const [tickerOffset, setTickerOffset] = useState(0);

  // Simple auto-ticker for Hero advantage bar
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerOffset((prev) => (prev - 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white pb-10 selection:bg-brand-gold selection:text-black">
      
      {/* 1. HERO SECTION & ADVANTAGE TICKER */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-24 px-6 overflow-hidden border-b border-brand-gold/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-gold/10 via-brand-darkBg to-brand-darkBg -z-10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 text-brand-gold px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-8">
            <Shield className="w-4 h-4" /> {data.hero.badge}
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-8"
          >
            {data.hero.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed mb-10"
          >
            {data.hero.subtitle}
          </motion.p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => onOpenCalculator('spouse')} className="bg-brand-gold text-black font-extrabold py-4 px-8 rounded-xl hover:scale-105 transition-transform shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              Free Consultation
            </button>
            <button className="bg-transparent border border-white/20 text-white font-bold py-4 px-8 rounded-xl hover:bg-surface/5 transition-colors">
              WhatsApp Us
            </button>
          </div>
        </div>

        {/* Ticker */}
        <div className="absolute bottom-0 left-0 w-full bg-[#121417] border-t border-brand-gold/20 py-3 overflow-hidden flex">
          <div className="flex whitespace-nowrap" style={{ transform: `translateX(${tickerOffset}px)` }}>
            {[...data.hero.carousel, ...data.hero.carousel, ...data.hero.carousel].map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-2 text-brand-gold text-sm font-bold uppercase tracking-widest mx-8">
                <CheckCircle2 className="w-4 h-4" /> {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. WELCOME & CEO STATEMENT */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative h-[600px] rounded-3xl overflow-hidden border border-brand-gold/20">
            <img src={data.welcome.image} alt="UAE Corporate" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
            <div>
              <span className="text-brand-gold font-bold uppercase tracking-widest text-sm block mb-4">— {data.welcome.badge}</span>
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">{data.welcome.title}</h2>
            </div>
            <div className="text-slate-300 space-y-6 text-lg">
              <p>{data.welcome.p1}</p>
              <p>{data.welcome.p2}</p>
            </div>
            
            <div className="bg-[#121417] p-8 rounded-2xl border border-white/5 relative mt-10">
              <Quote className="absolute top-6 right-6 w-12 h-12 text-brand-gold/20" />
              <p className="text-xl font-medium italic text-white mb-6">"{data.welcome.ceo.quote}"</p>
              <div>
                <div className="font-bold text-brand-gold">{data.welcome.ceo.name}</div>
                <div className="text-sm text-slate-400">{data.welcome.ceo.title}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. DET VERIFIED AUTHORITY */}
      <section className="py-24 px-6 bg-[#0A0B0E] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-brand-gold font-bold uppercase tracking-widest text-sm block mb-4">— {data.license.badge}</span>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-8">{data.license.title}</h2>
            <p className="text-slate-300 text-lg mb-10">{data.license.description}</p>
            <div className="inline-flex flex-col bg-brand-gold/10 border border-brand-gold/30 p-6 rounded-2xl">
              <span className="text-4xl font-black text-brand-gold mb-1">{data.license.daysImpact}</span>
              <span className="text-sm uppercase tracking-widest font-bold text-white">Days of Making an Impact</span>
            </div>
          </div>
          
          <div className="bg-[#121417] border border-brand-gold/30 rounded-3xl p-8 shadow-[0_0_40px_rgba(212,175,55,0.05)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-brand-gold"></div>
            <Shield className="w-12 h-12 text-brand-gold mb-8" />
            <div className="space-y-6">
              <div><span className="block text-xs text-content-muted uppercase font-bold mb-1">Authority</span><span className="text-lg font-bold text-white">{data.license.card.authority}</span></div>
              <div className="grid grid-cols-2 gap-6">
                <div><span className="block text-xs text-content-muted uppercase font-bold mb-1">License No.</span><span className="text-white font-medium">{data.license.card.licenseNo}</span></div>
                <div><span className="block text-xs text-content-muted uppercase font-bold mb-1">Registration</span><span className="text-white font-medium">{data.license.card.registrationDate}</span></div>
                <div><span className="block text-xs text-content-muted uppercase font-bold mb-1">Business Name</span><span className="text-white font-medium">{data.license.card.businessName}</span></div>
                <div><span className="block text-xs text-content-muted uppercase font-bold mb-1">Legal Type</span><span className="text-white font-medium">{data.license.card.legalType}</span></div>
              </div>
              <div className="pt-4 border-t border-white/10"><span className="block text-xs text-content-muted uppercase font-bold mb-1">Approved Activities</span><span className="text-sm text-slate-300">{data.license.card.activities}</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STRENGTH IN NUMBERS */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-gold font-bold uppercase tracking-widest text-sm block mb-4">— {data.strength.badge}</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">{data.strength.title}</h2>
            <p className="text-slate-400 text-lg">{data.strength.subtitle}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {data.strength.stats.map((stat, idx) => (
              <div key={idx} className="bg-gradient-to-br from-[#121417] to-[#0A0B0E] border border-white/5 p-8 rounded-2xl text-center hover:border-brand-gold/30 transition-colors">
                <div className="text-4xl lg:text-5xl font-black text-brand-gold mb-3">{stat.value}</div>
                <div className="text-sm font-bold text-white uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto text-center text-slate-300 space-y-6 text-lg">
            <p>{data.strength.p1}</p>
            <p>{data.strength.p2}</p>
            <button className="mt-8 bg-transparent border border-brand-gold text-brand-gold font-bold py-3 px-8 rounded-xl hover:bg-brand-gold hover:text-black transition-all">
              Chat on WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* 5. TRUSTED PARTNER */}
      <section className="py-24 px-6 bg-[#0A0B0E] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3">
            <span className="text-brand-gold font-bold uppercase tracking-widest text-sm block mb-4">— {data.trustedPartner.badge}</span>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-8">{data.trustedPartner.title}</h2>
            <div className="text-slate-300 space-y-6 text-lg">
              <p>{data.trustedPartner.p1}</p>
              <p>{data.trustedPartner.p2}</p>
            </div>
          </div>
          
          <div className="lg:col-span-2 bg-[#121417] p-8 rounded-3xl border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Our Office Details</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-brand-gold shrink-0" />
                <p className="text-slate-300 text-sm leading-relaxed">{data.trustedPartner.office.address}</p>
              </div>
              <div className="flex gap-4">
                <Clock className="w-6 h-6 text-brand-gold shrink-0" />
                <p className="text-slate-300 text-sm leading-relaxed">{data.trustedPartner.office.hours}</p>
              </div>
            </div>
            <div className="mt-8 space-y-3">
              <button className="w-full bg-surface/5 border border-white/10 hover:border-brand-gold text-white font-bold py-3 rounded-xl transition-colors inline-flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" /> {data.trustedPartner.office.phone}
              </button>
              <button onClick={() => onNavigate('contact')} className="w-full bg-brand-gold text-black font-extrabold py-3 rounded-xl shadow-lg shadow-brand-gold/20 hover:scale-[1.02] transition-transform">
                Book an Appointment
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. VISION & MISSION TABS */}
      <section className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-brand-gold font-bold uppercase tracking-widest text-sm block mb-4">— {data.visionMission.badge}</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">{data.visionMission.title}</h2>
          <p className="text-slate-400 text-lg mb-12">{data.visionMission.description}</p>
          
          <div className="bg-[#121417] border border-white/10 rounded-2xl p-2 flex flex-col md:flex-row gap-2 mb-8">
            {data.visionMission.tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 px-6 rounded-xl text-lg font-bold transition-all ${
                  activeTab === tab.id ? 'bg-brand-gold text-black shadow-md' : 'text-slate-400 hover:bg-surface/5 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-gradient-to-br from-[#121417] to-[#0A0B0E] border border-white/5 rounded-3xl p-10 md:p-16 min-h-[250px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
                className="text-2xl md:text-3xl font-medium text-white leading-relaxed italic"
              >
                "{data.visionMission.tabs.find(t => t.id === activeTab).content}"
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE US? 5 PILLARS */}
      <section className="py-24 px-6 bg-[#0A0B0E] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-gold font-bold uppercase tracking-widest text-sm block mb-4">— {data.pillars.badge}</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">{data.pillars.title}</h2>
            <p className="text-slate-400 text-lg">{data.pillars.subtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {data.pillars.items.map((item, idx) => (
              <div key={idx} className="bg-[#121417] border border-white/10 hover:border-brand-gold/50 rounded-2xl p-8 transition-colors">
                <div className="w-14 h-14 rounded-xl bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20 mb-6">
                  {iconMap[item.icon]}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CLIENT SUCCESS STORIES */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-brand-gold font-bold uppercase tracking-widest text-sm block mb-4">— {data.reviews.badge}</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">{data.reviews.title}</h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto mb-16">{data.reviews.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {data.reviews.items.map((review, idx) => (
              <div key={idx} className="bg-[#121417] border border-white/5 p-6 rounded-2xl text-left flex flex-col justify-between h-full">
                <div>
                  <div className="flex gap-1 text-brand-gold mb-4">
                    {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-slate-300 italic text-sm leading-relaxed mb-6">"{review.text}"</p>
                </div>
                <div className="font-bold text-white border-t border-white/10 pt-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold font-bold text-xs">{review.name.charAt(0)}</div>
                  {review.name}
                </div>
              </div>
            ))}
          </div>
          <button className="text-brand-gold hover:text-white font-bold inline-flex items-center gap-2 transition-colors">
            Write a Review <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 9. BUSINESS SETUP CTA & HIGHLIGHTS */}
      <section className="py-24 px-6 bg-[url('https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-fixed bg-center relative">
        <div className="absolute inset-0 bg-[#050505]/95 backdrop-blur-md"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">{data.businessSetup.title}</h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-10">{data.businessSetup.description}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-brand-gold text-black font-extrabold py-4 px-10 rounded-xl hover:scale-105 transition-transform shadow-xl shadow-brand-gold/20 inline-flex items-center justify-center gap-2">
                Free Consultation <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-[#121417] border border-white/20 text-white font-bold py-4 px-10 rounded-xl hover:bg-surface/10 transition-colors">
                Chat on WhatsApp
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.businessSetup.highlights.map((hl, idx) => (
              <div key={idx} className="bg-[#121417]/80 backdrop-blur-md border border-brand-gold/20 p-6 rounded-2xl flex flex-col items-center text-center">
                <CheckCircle2 className="w-8 h-8 text-brand-gold mb-4" />
                <h4 className="text-white font-bold mb-2">{hl.title}</h4>
                <p className="text-slate-400 text-sm">{hl.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9.5 LONG FORM MARKDOWN CONTENT */}
      {data.contentMarkdown && (
        <section className="py-24 px-6 bg-[#0A0B0E] border-t border-white/5">
          <div className="max-w-4xl mx-auto prose prose-invert prose-brand prose-headings:font-display prose-headings:font-black prose-a:text-brand-gold hover:prose-a:text-white prose-img:rounded-xl">
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(data.contentMarkdown)) }} />
          </div>
        </section>
      )}

      {/* 10. B2B REFERRAL BLOCK */}
      <section className="py-24 px-6 bg-[#0A0B0E] border-t border-white/5">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-brand-gold/10 to-transparent border border-brand-gold/30 rounded-3xl p-10 md:p-14 text-center">
          <Handshake className="w-16 h-16 text-brand-gold mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">{data.referral.title}</h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-10">{data.referral.description}</p>
          <button className="bg-transparent border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-black font-bold py-4 px-10 rounded-xl transition-all">
            {data.referral.buttonText}
          </button>
        </div>
      </section>

    </div>
  );
}
