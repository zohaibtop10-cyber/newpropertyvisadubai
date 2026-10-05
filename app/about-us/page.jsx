'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  Users, 
  ArrowRight, 
  Sparkles,
  Receipt,
  Globe2,
  Truck,
  MonitorCheck,
  Calculator,
  Building2,
  Zap,
  Star,
  Lock,
  ChevronRight,
  ChevronDown,
  History,
  Target,
  Compass,
  FileCheck,
  MessageSquare,
  HelpCircle,
  BadgeCheck,
  Building,
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProcessTimeline from '../../src/components/ProcessTimeline';
import SocialProof from '../../src/components/SocialProof';
import FAQAccordion from '../../src/components/FAQAccordion';
import UniversalCTA from '../../src/components/UniversalCTA';
import TeamBentoGrid from '../../src/components/TeamBentoGrid';
import PhilosophyGrid from '../../src/components/PhilosophyGrid';
import ImpactStatsBar from '../../src/components/ImpactStatsBar';
import ExecutiveTestimonials from '../../src/components/ExecutiveTestimonials';

export const pageData = {
  hero: {
    badge: "Brightlink Management Consultancy • DET & GDRFA Accredited",
    headline: "Dubai. Documents. Done. Perfectly.",
    subheadline: "Pioneering seamless business setup and visa processing in the UAE. We unify strategy, compliance, and execution into one flawless experience.",
    primaryCta: "Launch Visa Calculator",
    secondaryCta: "Explore Executive Roster"
  },
  companyStory: {
    badge: "Our Philosophy & Heritage",
    headline: "Redefining UAE Relocation & Corporate Immigration",
    paragraphs: [
      {
        title: "Established Excellence in Business Bay",
        body: "Operating under The Brightlink Group from our executive headquarters in Crystal Tower, Business Bay, Dubai, Brightlink Management Consultancy has served as an authoritative bridge between global investors, families, corporations, and UAE government entities for over 15 years."
      },
      {
        title: "The Philosophy of Zero Friction",
        body: "Navigating UAE immigration shouldn't feel like navigating a maze. We founded our agency to replace bureaucratic friction, unexpected fee surcharges, and endless typing center queues with 100% digital transparency, upfront statutory fee accounting, and guaranteed SLA turnaround speeds."
      },
      {
        title: "End-to-End Accountable Execution",
        body: "From initial Ejari housing registration and Ministry of Foreign Affairs (MOFA) certificate legalization to VIP Smart Salem medical fitness testing and doorstep Emirates ID delivery, our accredited Public Relations Officers (PROs) take direct legal accountability for every single milestone."
      }
    ]
  },
  impactStats: [
    { value: "15+ Years", label: "of Excellence", detail: "Serving global business leaders & families in Dubai" },
    { value: "20,000+", label: "Visas Processed", detail: "100% SLA compliance rate across GDRFA & ICP" },
    { value: "4.9 / 5", label: "Google Rating", detail: "Verified by 1,400+ client reviews" },
    { value: "100%", label: "Statutory Transparency", detail: "Direct government receipts provided at cost" }
  ],
  teamRoster: [
    {
      number: "01",
      name: "Bilal Saleem",
      role: "Founder & CEO",
      bio: "Pioneered transparent corporate immigration models in the UAE. Architect of Brightlink Group operations, establishing direct filing workflows with GDRFA, ICP, and Dubai Economy & Tourism.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      gridSpan: "lg:col-span-5 lg:row-span-2 min-h-[500px]",
      badge: "Executive Leadership"
    },
    {
      number: "02",
      name: "Muhammad Anas",
      role: "Managing Director",
      bio: "Oversees multi-emirate expansion, strategic partnership frameworks, and government relations across Dubai, Abu Dhabi, and Ras Al Khaimah.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
      gridSpan: "lg:col-span-7 min-h-[240px]",
      badge: "Board of Directors"
    },
    {
      number: "03",
      name: "Aziza Kamilova",
      role: "Director Operations",
      bio: "Directs daily VIP concierge workflows, document legalization, and fast-track medical fitness operations across all 7 UAE Emirates.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
      gridSpan: "lg:col-span-3 min-h-[240px]",
      badge: "Operations Desk"
    },
    {
      number: "04",
      name: "Haroon Saleem",
      role: "HR Manager",
      bio: "Leads talent acquisition, accredited PRO officer training, and internal compliance protocols ensuring 100% adherence to UAE labor laws.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
      gridSpan: "lg:col-span-4 min-h-[240px]",
      badge: "Human Resources"
    },
    {
      number: "05",
      name: "Olga Kulish",
      role: "Project Manager",
      bio: "Manages complex Golden Visa investor files, real estate valuations, DLD Cube schedules, and corporate free zone establishment cards.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
      gridSpan: "lg:col-span-4 min-h-[240px]",
      badge: "Golden Visa Specialist"
    },
    {
      number: "06",
      name: "Malika Ikramova",
      role: "Executive Director",
      bio: "Drives high-net-worth family office consultations, VIP domestic staff visas, and strategic commercial licensing portfolios.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
      gridSpan: "lg:col-span-4 min-h-[240px]",
      badge: "Executive Advisory"
    },
    {
      number: "07",
      name: "Ilya Merzlyakov",
      role: "Marketing Manager",
      bio: "Heads digital transparency initiatives, client feedback channels, user experience engineering, and multilingual client portals.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
      gridSpan: "lg:col-span-4 min-h-[240px]",
      badge: "Brand & Media"
    }
  ],
  coreValues: [
    {
      icon: "Receipt",
      title: "Government Fees at Cost",
      desc: "Every official fee comes with its original government receipt; our service fee is quoted upfront with zero hidden surcharges.",
      tag: "100% Transparent"
    },
    {
      icon: "MonitorCheck",
      title: "100% Online Processing",
      desc: "No typing center queues or physical waiting. We manage your entry permit, status change, and biometrics digitally.",
      tag: "Digital First"
    },
    {
      icon: "Truck",
      title: "Door-to-Door Delivery",
      desc: "We collect original passports and deliver physical 2-Year or 10-Year Emirates IDs securely to your doorstep via VIP courier.",
      tag: "Secure Logistics"
    }
  ],
  faqs: [
    {
      q: "Are you a government entity?",
      a: "No, we are an officially licensed private corporate immigration and typing consultancy operating under Dubai Economy & Tourism (DET) and GDRFA filing channels. We act as your authorized legal liaison to submit and fast-track applications through government portals."
    },
    {
      q: "How do you guarantee data privacy?",
      a: "We enforce bank-grade 256-bit SSL encrypted document vaults and strict adherence to UAE Data Protection Laws. Your passports, family records, and corporate filings are stored securely and never shared with third parties."
    },
    {
      q: "Are there any hidden fees?",
      a: "Never. All government statutory tariffs (GDRFA, ICP, Medical, Emirates ID) are charged at exact cost with official government receipts provided. Our service fee is flat, transparent, and quoted upfront."
    },
    {
      q: "How long does standard family visa processing take?",
      a: "Entry permits are issued in 24–48 hours online, VIP medical fitness screening takes 2–3 hours, and physical Emirates IDs are delivered to your doorstep within 5–7 working days."
    }
  ],
  howWeWork: [
    {
      stepNumber: '1',
      title: 'Document Audit & Strategy',
      desc: 'Comprehensive review of corporate structures, passport copies, and attested credentials.',
      iconName: 'ClipboardCheck'
    },
    {
      stepNumber: '2',
      title: 'GDRFA & ICP Pre-Approval',
      desc: 'Direct electronic filing with government immigration channels to issue initial entry permits.',
      iconName: 'BadgeCheck'
    },
    {
      stepNumber: '3',
      title: 'VIP Escorted Medical Fitness',
      desc: 'Fast-track 30-minute Smart Salem / DHA medical screening & biometric scan.',
      iconName: 'Stethoscope'
    },
    {
      stepNumber: '4',
      title: 'In-Country Status Modification',
      desc: 'Seamless visa status change without physical travel or airport departure.',
      iconName: 'FileX'
    },
    {
      stepNumber: '5',
      title: 'Emirates ID Biometrics',
      desc: 'Priority queue clearance for fingerprint capture and digital ID photo profiling.',
      iconName: 'Fingerprint'
    },
    {
      stepNumber: '6',
      title: 'Doorstep Courier Delivery',
      desc: 'Official 2-Year or 10-Year Emirates ID card & residency approval delivered directly to you.',
      iconName: 'Crown'
    }
  ]
};

export default function AboutUsPage({ onOpenCalculator, onNavigate, cmsConfig }) {
  const rawData = cmsConfig?.aboutPage ? { ...pageData, ...cmsConfig.aboutPage } : pageData;

  const data = {
    ...pageData,
    ...rawData
  };

  const primaryCtaLabel = (data.hero?.primaryCta && typeof data.hero.primaryCta === 'string' && data.hero.primaryCta.trim())
    ? data.hero.primaryCta
    : "Launch Visa Calculator";

  const secondaryCtaLabel = (data.hero?.secondaryCta && typeof data.hero.secondaryCta === 'string' && data.hero.secondaryCta.trim())
    ? data.hero.secondaryCta
    : "Explore Executive Roster";

  const handleLaunchCalculator = () => {
    if (typeof onOpenCalculator === 'function') {
      onOpenCalculator('spouse');
    } else if (typeof onNavigate === 'function') {
      onNavigate('contact');
    }
  };

  const handleScrollToRoster = () => {
    const el = document.getElementById('leadership-bento');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#D4AF37] selection:text-black transition-colors duration-200">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#0A0B0E] via-[#0D0F14] to-[#050505] border-b border-[#D4AF37]/20">
        
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-[#D4AF37]/10 rounded-full blur-[160px] pointer-events-none -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto text-center relative z-10 space-y-8">
          
          {/* Gold Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[10px] bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-mono font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.2)]"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>{data.hero.badge || "Brightlink Management Consultancy • DET & GDRFA Accredited"}</span>
          </motion.div>

          {/* H1 Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] font-sans"
          >
            <span>Dubai. Documents.</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF8DC] via-[#D4AF37] to-[#B8860B]">Done. Perfectly.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-300 font-medium leading-relaxed max-w-3xl mx-auto font-sans"
          >
            <span>{data.hero.subheadline || "Pioneering seamless business setup and visa processing in the UAE. We unify strategy, compliance, and execution into one flawless experience."}</span>
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4"
          >
            <button 
              onClick={handleLaunchCalculator} 
              className="w-full sm:w-auto px-8 py-4 rounded-[10px] bg-dark-gold-gloss text-black font-extrabold text-xs uppercase tracking-wider font-mono shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:brightness-110 transition-all inline-flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-black shrink-0" />
              <span>{primaryCtaLabel}</span>
            </button>

            <button 
              onClick={handleScrollToRoster}
              className="w-full sm:w-auto px-8 py-4 rounded-[10px] bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#D4AF37]/50 text-white font-bold text-xs uppercase tracking-wider font-mono transition-all inline-flex items-center justify-center gap-2.5 cursor-pointer backdrop-blur-md"
            >
              <Users className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>{secondaryCtaLabel}</span>
            </button>
          </motion.div>

        </div>
      </section>

      {/* 2. CORPORATE PHILOSOPHY GRID */}
      <PhilosophyGrid 
        items={data.companyStory.paragraphs} 
        title={data.companyStory.headline} 
        badge={data.companyStory.badge} 
      />

      {/* 3. IMPACT STATS RIBBON */}
      <ImpactStatsBar />

      {/* 4. EXECUTIVE TEAM BENTO GRID */}
      <TeamBentoGrid />

      {/* 5. EXECUTIVE TESTIMONIALS & CASE STUDIES */}
      <ExecutiveTestimonials />

      {/* 6. PROCESS TIMELINE */}
      <ProcessTimeline 
        title={data.processTitle || "Our Concierge Execution Process"}
        subtitle={data.processSubtitle || "Transparent, zero-queue corporate relocation and visa filing workflow."}
        steps={data.howWeWork || data.processSteps}
      />

      {/* 7. FAQS */}
      <FAQAccordion items={data.faqs} />

      {/* 8. UNIVERSAL CTA */}
      <UniversalCTA onOpenCalculator={onOpenCalculator} cmsConfig={cmsConfig} />

    </div>
  );
}
