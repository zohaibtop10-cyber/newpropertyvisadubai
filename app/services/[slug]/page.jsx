import React from 'react';
import { fetchCMSData } from '../../../src/lib/fetchCMSData';
import {
  ShieldCheck,
  CheckCircle2,
  Calculator,
  Award,
  Clock,
  Sparkles,
  ArrowRight,
  FileCheck,
  Stethoscope,
  ChevronRight
} from 'lucide-react';

/**
 * Generate Dynamic SEO Metadata for App Router
 */
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || 'family-visa';
  const cmsData = await fetchCMSData(slug);

  return {
    title: cmsData.title,
    description: cmsData.metaDescription,
    openGraph: {
      title: cmsData.title,
      description: cmsData.metaDescription,
      images: [cmsData.hero.heroBackgroundImg]
    }
  };
}

/**
 * Next.js App Router Server Component - Dynamic Service Page
 * 
 * Fetches dynamic CMS data via `fetchCMSData(slug)` with ISR revalidation.
 * Passes data down to Hero, PricingGrid, and ProcessTimeline while preserving
 * 100% of our Modern Luxury (Dark Antique Gloss Gold) design system & rounded-[10px] geometry.
 */
export default async function ServicePage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || 'family-visa';
  
  // Fetch dynamic CMS data contract asynchronously on Server
  const cmsData = await fetchCMSData(slug);

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#D4AF37] selection:text-black">
      
      {/* 1. DYNAMIC HERO SECTION */}
      <ServiceHero hero={cmsData.hero} />

      {/* 2. DYNAMIC PRICING TIERS GRID */}
      <PricingGrid pricingTiers={cmsData.pricingTiers} title={cmsData.title} />

      {/* 3. DYNAMIC PROCESS TIMELINE */}
      <ProcessTimeline processSteps={cmsData.processSteps} />

      {/* 4. DYNAMIC FAQS SECTION */}
      {cmsData.faqs && cmsData.faqs.length > 0 && (
        <FAQSection faqs={cmsData.faqs} />
      )}

    </main>
  );
}

/**
 * ServiceHero Component - Receives dynamic hero payload from Server Component
 */
function ServiceHero({ hero }) {
  const primaryCta = hero.primaryCta || { label: 'Launch Visa Calculator', url: '/calculator', type: 'gold' };
  const secondaryCta = hero.secondaryCta || { label: 'WhatsApp Senior Advisor', url: 'https://wa.me/971566556645', type: 'whatsapp' };

  return (
    <section className="relative pt-28 pb-20 px-5 sm:px-8 lg:px-12 overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#0F1117] via-[#050505] to-[#050505]">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center space-y-6 relative z-10">
        
        {/* Badge */}
        {hero.heroBadge && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-mono font-bold uppercase tracking-widest shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{hero.heroBadge}</span>
          </div>
        )}

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-[#D4AF37]">
            {hero.heroTitle}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto font-medium leading-relaxed">
          {hero.heroSubtitle}
        </p>

        {/* Dynamic Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <DynamicCTAButton cta={primaryCta} />
          <DynamicCTAButton cta={secondaryCta} />
        </div>

      </div>
    </section>
  );
}

/**
 * PricingGrid Component - Maps dynamic pricing cards from CMS payload
 */
function PricingGrid({ pricingTiers, title }) {
  return (
    <section className="py-20 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-surface/5 border border-white/10 text-[#D4AF37]">
          <Award className="w-4 h-4" />
          <span>TRANSPARENT GDRFA PRICING</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          <span>Official {title} Packages</span>
        </h2>
        <p className="text-text-muted text-sm max-w-xl mx-auto font-medium">
          <span>No hidden fees. Government typing, medical screening, and Emirates ID fees included.</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {pricingTiers.map((tier) => (
          <div
            key={tier.id}
            className={`relative p-6 sm:p-8 rounded-[10px] bg-[#0A0B0E] border transition-all duration-300 flex flex-col justify-between space-y-6 ${
              tier.isRecommended || tier.isPopular
                ? 'border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.2)] bg-gradient-to-b from-[#141620] via-[#0A0B0E] to-[#0A0B0E]'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            {/* Top Badge */}
            {(tier.isPopular || tier.isRecommended) && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-dark-gold-gloss text-black font-black text-[10px] uppercase font-mono px-3 py-1 rounded-full shadow-md">
                <span>{tier.isPopular ? 'Most Popular' : 'Recommended'}</span>
              </span>
            )}

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white leading-tight">
                <span>{tier.tierName}</span>
              </h3>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-[#D4AF37]">
                  <span>{tier.price}</span>
                </span>
                {tier.originalPrice && (
                  <span className="text-sm font-mono line-through text-text-muted">
                    <span>{tier.originalPrice}</span>
                  </span>
                )}
                {tier.billingPeriod && (
                  <span className="text-xs text-text-muted font-medium">
                    <span>/ {tier.billingPeriod}</span>
                  </span>
                )}
              </div>

              {/* Feature List */}
              <div className="space-y-2.5 pt-4 border-t border-white/10">
                {tier.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic CTA Button */}
            <div className="pt-6 border-t border-white/10">
              <DynamicCTAButton cta={tier.cta} fullWidth />
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * ProcessTimeline Component - Maps dynamic step timeline from CMS payload
 */
function ProcessTimeline({ processSteps }) {
  return (
    <section className="py-20 px-5 sm:px-8 lg:px-12 bg-[#08090C] border-y border-white/10">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37]">
            <Clock className="w-4 h-4" />
            <span>STEP-BY-STEP PROCESS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            <span>How Your Visa Is Processed</span>
          </h2>
          <p className="text-text-muted text-sm max-w-xl mx-auto font-medium">
            <span>Seamless 4-step execution managed entirely by our accredited Public Relations Officers.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step) => (
            <div
              key={step.stepNumber}
              className="p-6 rounded-[10px] bg-surface/[0.03] border border-white/10 hover:border-[#D4AF37]/40 transition-all space-y-4 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-[10px] bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] font-mono font-extrabold text-sm flex items-center justify-center">
                  <span>0{step.stepNumber}</span>
                </span>
                {step.timeEstimate && (
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-[6px]">
                    <span>{step.timeEstimate}</span>
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                <span>{step.title}</span>
              </h3>

              <p className="text-xs text-text-muted leading-relaxed font-medium">
                <span>{step.description}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * FAQSection Component - Render dynamic FAQs
 */
function FAQSection({ faqs }) {
  return (
    <section className="py-20 px-5 sm:px-8 lg:px-12 max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-white tracking-tight">
          <span>Frequently Asked Questions</span>
        </h2>
        <p className="text-text-muted text-xs font-mono uppercase tracking-wider">
          <span>Official GDRFA Rules & Regulations</span>
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="p-6 rounded-[10px] bg-[#0A0B0E] border border-white/10 space-y-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-[#D4AF37]">Q:</span>
              <span>{faq.question}</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed pl-6">
              <span>{faq.answer}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * DynamicCTAButton Component - Maps button type to strict design system styling
 */
function DynamicCTAButton({ cta, fullWidth = false }) {
  if (!cta) return null;

  const isWhatsApp = cta.type === 'whatsapp' || (cta.url && cta.url.includes('wa.me'));
  const isGold = cta.type === 'gold' || !cta.type;

  const baseClasses = `py-3.5 px-6 rounded-[10px] font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
    fullWidth ? 'w-full' : 'w-full sm:w-auto'
  }`;

  if (isWhatsApp) {
    return (
      <a
        href={cta.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} bg-[#25D366] hover:bg-[#128C7E] text-white shadow-[0_4px_20px_rgba(37,211,102,0.3)]`}
      >
        <span>{cta.label}</span>
        <ArrowRight className="w-4 h-4" />
      </a>
    );
  }

  if (isGold) {
    return (
      <a
        href={cta.url}
        className={`${baseClasses} bg-dark-gold-gloss text-black hover:brightness-110 shadow-[0_4px_20px_rgba(212,175,55,0.3)]`}
      >
        <Calculator className="w-4 h-4 text-black" />
        <span>{cta.label}</span>
      </a>
    );
  }

  return (
    <a
      href={cta.url}
      className={`${baseClasses} bg-surface/10 border border-white/15 text-white hover:bg-surface/20`}
    >
      <span>{cta.label}</span>
      <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
    </a>
  );
}
