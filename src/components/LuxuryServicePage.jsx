/**
 * LuxuryServicePage.jsx
 * ─────────────────────
 * Shared layout wrapper for all 17 bespoke UAE service pages.
 * Fully aligned with Home Page design system authority.
 *
 * Design System:
 *  - Font: Inter
 *  - Geometry: rounded-[10px] everywhere
 *  - Palette: Dark Antique Gloss Gold (#D4AF37), Glassmorphic dark backdrops, bg-[#050505]
 *  - Action Buttons: Gold Gloss gradient for Calculator, bg-[#25D366] for WhatsApp
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  HelpCircle,
  FileCheck,
  Check,
  MessageCircle,
  Award,
  Zap,
  PhoneCall
} from 'lucide-react';

import ProcessTimeline from './ProcessTimeline';
import FAQAccordion from './FAQAccordion';
import UniversalCTA from './UniversalCTA';
import ServiceHero from './ServiceHero';
import ConciergeFeatures from './ConciergeFeatures';
import ServiceStats from './ServiceStats';
import ResidencyTiers from './ResidencyTiers';
import DocumentChecklist from './DocumentChecklist';
import FeeBreakdown from './FeeBreakdown';
import BottomCTA from './BottomCTA';

export { ServiceHero, ConciergeFeatures, ServiceStats, ResidencyTiers, DocumentChecklist, FeeBreakdown, BottomCTA };

// ─── Animation Presets ────────────────────────────────────────────────────────

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }
  })
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.45, ease: 'easeOut', delay }
  })
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }
  })
};

// ─── Section Shell ─────────────────────────────────────────────────────────────

export function SectionShell({ children, className = '', dark = true, id }) {
  return (
    <section
      id={id}
      className={`
        relative w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans
        ${dark ? 'bg-[#050505] text-white' : 'bg-[#0A0B0E] text-white'}
        ${className}
      `}
    >
      {/* Ambient Dot Grid & Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.08] pointer-events-none" />
      {children}
    </section>
  );
}

export function SectionInner({ children, className = '' }) {
  return (
    <div className={`max-w-7xl mx-auto relative z-10 ${className}`}>
      {children}
    </div>
  );
}

// ─── Section Header ────────────────────────────────────────────────────────────

export function SectionHeader({ eyebrow, title, subtitle, center = false }) {
  return (
    <motion.div
      className={`mb-12 ${center ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
    >
      {eyebrow && (
        <span className="
          inline-flex items-center gap-2 px-3.5 py-1.5
          bg-[#D4AF37]/15 border border-[#D4AF37]/30
          text-[#D4AF37] text-[10px] font-mono font-bold uppercase tracking-widest
          rounded-[10px] mb-4 shadow-sm
        ">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{eyebrow}</span>
        </span>
      )}
      <h2 className="
        text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight
        text-white leading-[1.1] font-sans
      ">
        <span>{title}</span>
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-sans font-medium">
          <span>{subtitle}</span>
        </p>
      )}
    </motion.div>
  );
}

// ─── Gold Badge / Pill ─────────────────────────────────────────────────────────

export function GoldBadge({ children }) {
  return (
    <span className="
      inline-flex items-center gap-1.5 px-3 py-1
      bg-dark-gold-gloss text-black text-[10px] font-mono font-bold uppercase tracking-wider
      rounded-[10px] shadow-sm
    ">
      <span>{children}</span>
    </span>
  );
}

// ─── Luxury Card (Bento Grid Style matching Home Page) ─────────────────────────

export function LuxuryCard({ children, className = '', hover = true, delay = 0 }) {
  return (
    <motion.div
      className={`
        relative bg-surface/5 backdrop-blur-xl
        border border-white/10
        rounded-[10px] overflow-hidden font-sans
        shadow-xl
        ${hover ? 'hover:shadow-[0_20px_40px_rgba(212,175,55,0.18)] hover:border-[#D4AF37]/60 hover:-translate-y-1 transition-all duration-300 cursor-default' : ''}
        ${className}
      `}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      custom={delay}
      variants={scaleIn}
    >
      {/* Top Gold Shimmer Border on Hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C59B27] via-[#FFF8DC] to-[#D4AF37] opacity-0 hover:opacity-100 transition-opacity" />
      {children}
    </motion.div>
  );
}

// ─── Process Timeline Wrapper ─────────────────────────────────────────────────

export function LuxuryProcessTimeline({ steps = [] }) {
  const stepCount = steps && steps.length > 0 ? steps.length : 4;
  return (
    <ProcessTimeline
      title={`The ${stepCount}-Step Concierge Process`}
      subtitle="From first contact to residency card in hand — fully managed, with zero government visits required."
      steps={steps && steps.length > 0 ? steps : undefined}
    />
  );
}

// ─── FAQ Accordion Wrapper ─────────────────────────────────────────────────────

export function LuxuryFAQ({ faqs = [] }) {
  if (!faqs.length) return null;

  return (
    <FAQAccordion
      title="Frequently Asked Questions"
      subtitle="Everything you need to know about this residency service."
      badge="COMMON QUESTIONS"
      items={faqs}
    />
  );
}

// ─── Dark Gold Footer CTA Wrapper ──────────────────────────────────────────────

export function LuxuryFooterCTA({ headline, subline, ctaLabel, onOpenCalculator, cmsConfig }) {
  return (
    <UniversalCTA
      headline={headline || "Ready to Start Your UAE Residency Application?"}
      subtext={subline || "Calculate your exact government fees in 60 seconds or speak directly with our PRO advisory desk on WhatsApp."}
      onOpenCalculator={onOpenCalculator}
      cmsConfig={cmsConfig}
    />
  );
}

// ─── Fee Invoice Card ──────────────────────────────────────────────────────────

export function LuxuryFeeInvoice({ invoice }) {
  if (!invoice) return null;
  const total = (invoice.govtFees || 0) + (invoice.conciergeFee || 0);

  return (
    <SectionShell className="bg-[#050505]" id="fees">
      <SectionInner>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <SectionHeader
            eyebrow="Transparent Pricing"
            title="Full Government Fee Breakdown"
            subtitle="Zero hidden fees. Government tariffs are fixed. Our concierge fee covers all typing, submissions, and SLA guarantees."
          />

          <motion.div
            className="
              bg-[#111111]
              border border-white/10
              rounded-[10px] overflow-hidden
              shadow-[0_20px_60px_-20px_rgba(212,175,55,0.15)] font-sans
            "
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={scaleIn}
          >
            {/* Header stripe */}
            <div className="h-[3px] bg-gradient-to-r from-[#C59B27] via-[#FFF8DC] to-[#D4AF37]" />

            <div className="p-6 space-y-4">
              {/* Breakdown rows */}
              <div className="space-y-2 mb-4">
                {invoice.breakdown?.map((row, i) => (
                  <div key={i} className="flex justify-between items-baseline gap-4 py-2 border-b border-white/5 last:border-0">
                    <span className="text-sm text-slate-300 font-medium"><span>{row.item}</span></span>
                    <span className="font-bold text-sm text-white font-mono whitespace-nowrap">
                      <span>AED {row.cost?.toLocaleString()}</span>
                    </span>
                  </div>
                ))}
              </div>

              {/* Govt subtotal */}
              <div className="flex justify-between items-center py-3 border-t border-dashed border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-text-muted font-mono"><span>Government Fees</span></span>
                <span className="font-bold text-white font-mono"><span>AED {invoice.govtFees?.toLocaleString()}</span></span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-xs font-bold uppercase tracking-wider text-text-muted font-mono"><span>Concierge Service</span></span>
                <span className="font-bold text-white font-mono"><span>AED {invoice.conciergeFee?.toLocaleString()}</span></span>
              </div>

              {/* Total */}
              <div className="
                mt-4 flex justify-between items-center
                bg-[#D4AF37]/10
                border border-[#D4AF37]/30
                rounded-[10px] px-4 py-4
              ">
                <span className="font-black text-white text-sm uppercase tracking-wider font-mono"><span>Total Estimate</span></span>
                <span className="font-black text-xl text-[#D4AF37] font-mono">
                  <span>AED {total.toLocaleString()}</span>
                </span>
              </div>

              <p className="text-[10px] text-text-muted font-mono text-center">
                <span>All figures include standard government tariffs. Final totals may vary based on nationality and visa category.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </SectionInner>
    </SectionShell>
  );
}

// ─── Document Checklist (Tabbed) ───────────────────────────────────────────────

export function LuxuryDocumentTabs({ documents, tabs = [{ key: 'investor', label: 'Principal / Investor' }, { key: 'family', label: 'Dependents' }] }) {
  const [active, setActive] = useState(tabs[0].key);
  const items = documents?.[active] || [];

  return (
    <SectionShell className="bg-[#0A0B0E] py-12 md:py-16" id="documents">
      <SectionInner>
        <SectionHeader
          eyebrow="Required Documents"
          title="Document Concierge Checklist"
          subtitle="Select a category to view exact mandatory documents. We perform a complimentary PRO pre-audit before filing to guarantee first-submit approval."
        />

        {/* Tab bar */}
        <div className="flex gap-2 mb-8 p-1.5 bg-surface/5 rounded-[10px] w-fit font-sans border border-white/10">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`
                px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider rounded-[10px] transition-all duration-200 cursor-pointer
                ${active === tab.key
                  ? 'bg-dark-gold-gloss text-black shadow-[0_4px_12px_rgba(212,175,55,0.3)] font-black'
                  : 'text-text-muted hover:text-white'
                }
              `}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Document grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-10"
          >
            {items.length ? items.map((doc, i) => (
              <div key={i} className="
                flex items-start justify-between gap-3.5 p-4 sm:p-5
                bg-[#111319]
                border border-white/10
                rounded-[10px]
                hover:border-[#D4AF37]/60 hover:shadow-[0_4px_25px_rgba(212,175,55,0.15)]
                transition-all duration-200 font-sans group
              ">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-white leading-relaxed"><span>{doc}</span></span>
                </div>
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/15 border border-emerald-400/30 px-2 py-0.5 rounded-[6px] shrink-0 hidden sm:inline">
                  Pre-Audited
                </span>
              </div>
            )) : (
              <p className="text-sm text-text-muted col-span-2 font-mono"><span>No documents specified for this category.</span></p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Pre-Audit Action Banner matching 800docs.ae */}
        <div className="bg-gradient-to-r from-[#111319] via-[#1A1D27] to-[#111319] border border-[#D4AF37]/30 rounded-[10px] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-wider text-[#D4AF37]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Complimentary Document Audit</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white">Need Help Legalizing or Auditing Your Documents?</h4>
            <p className="text-xs text-slate-300 max-w-xl">
              Send your Ejari, salary certificate, or marriage certificate scans on WhatsApp. Our PRO desk verifies eligibility & attestation compliance in under 15 minutes.
            </p>
          </div>

          <a
            href="https://wa.me/971586600396"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-[10px] bg-[#25D366] hover:bg-[#128C7E] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>WhatsApp Instant Pre-Audit →</span>
          </a>
        </div>

      </SectionInner>
    </SectionShell>
  );
}
