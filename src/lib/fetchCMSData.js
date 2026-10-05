/**
 * @file fetchCMSData.js
 * @description Universal Data Fetching Utility for Next.js App Router Server Components.
 * Connects to the backend CMS / Database (Firebase Realtime DB / Supabase / REST API) with ISR caching.
 */

import { siteConfig, DEFAULT_CMS_CONFIG } from '../data/cmsData';

/**
 * @typedef {Object} DynamicButton
 * @property {string} label - Button display text
 * @property {string} url - Target URL or action link
 * @property {'gold' | 'whatsapp' | 'secondary' | 'calculator'} type - Styling token variant
 */

/**
 * @typedef {Object} PricingTier
 * @property {string} id - Unique tier identifier
 * @property {string} tierName - Name of the pricing plan
 * @property {string} price - Price value (e.g. "AED 1,450")
 * @property {string} [originalPrice] - Strikethrough comparison price
 * @property {string} [billingPeriod] - Billing frequency label
 * @property {string[]} features - List of included features/perks
 * @property {boolean} [isPopular] - Highlight as popular choice
 * @property {boolean} [isRecommended] - Highlight with gold border glow
 * @property {DynamicButton} cta - Action button configuration
 */

/**
 * @typedef {Object} ProcessStep
 * @property {number} stepNumber - Numerical index of step
 * @property {string} title - Step headline
 * @property {string} description - Step detailed explanation
 * @property {string} [timeEstimate] - Processing duration estimate
 * @property {string} [iconName] - Lucide icon identifier string
 */

/**
 * @typedef {Object} HeroSection
 * @property {string} heroTitle - Main H1 headline
 * @property {string} heroSubtitle - Subtitle paragraph
 * @property {string} heroBadge - Pill badge text
 * @property {string} [heroBackgroundImg] - Background backdrop image URL
 * @property {DynamicButton} primaryCta - Main action button
 * @property {DynamicButton} secondaryCta - Secondary action button
 */

/**
 * @typedef {Object} ServiceCMSPageData
 * @property {string} title - Page title
 * @property {string} subtitle - Page subtitle
 * @property {string} slug - Unique page route slug
 * @property {string} metaDescription - SEO Meta Description tag
 * @property {HeroSection} hero - Hero section configuration
 * @property {PricingTier[]} pricingTiers - Array of pricing cards
 * @property {ProcessStep[]} processSteps - Timeline steps
 * @property {Object[]} [faqs] - Array of FAQ question/answer pairs
 */

/**
 * Default Fallback Data Contract
 * Ensures 100% Zero UI Breakage if CMS API returns null or incomplete payload.
 */
const DEFAULT_FALLBACK_PAGE_DATA = {
  title: 'Official UAE Visa & Residency Services',
  subtitle: 'Fast-Track GDRFA & ICP Approvals with 100% Approval Guarantee',
  slug: 'default-service',
  metaDescription: 'Official Dubai residency visa processing, Golden Visa nomination, family sponsorship, and document attestation by senior immigration consultants.',
  hero: {
    heroTitle: 'Dubai Residency & Visas. Fast. Guaranteed.',
    heroSubtitle: 'Complete end-to-end processing for Family Visas, 10-Year Golden Visas, Property Investor Residency, and Emirates ID in as fast as 24 hours.',
    heroBadge: 'GDRFA & DET Accredited',
    heroBackgroundImg: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop',
    primaryCta: {
      label: 'Launch Visa Calculator',
      url: '/calculator',
      type: 'gold'
    },
    secondaryCta: {
      label: 'WhatsApp Senior Advisor',
      url: `https://wa.me/${siteConfig?.whatsappRaw || '971566556645'}`,
      type: 'whatsapp'
    }
  },
  pricingTiers: [
    {
      id: 'express-residency',
      tierName: 'Express Family Residency',
      price: 'AED 1,450',
      originalPrice: 'AED 1,850',
      billingPeriod: 'per applicant',
      isPopular: true,
      isRecommended: true,
      features: [
        'Entry Permit & Status Change',
        'VIP Medical Fitness Screening',
        'Emirates ID Biometrics Booking',
        'Stamping & Physical Card Delivery',
        '100% Money-Back Guarantee'
      ],
      cta: {
        label: 'Select Express Package',
        url: '/calculator',
        type: 'gold'
      }
    },
    {
      id: 'golden-investor',
      tierName: '10-Year Golden Visa VIP',
      price: 'AED 2,450',
      originalPrice: 'AED 3,200',
      billingPeriod: 'all inclusive',
      isPopular: false,
      isRecommended: true,
      features: [
        'DLD Property Title Deed Audit',
        'Nomination & ICP Clearance',
        '10-Year Family & Maid Inclusion',
        'Dedicated VIP Escort Officer',
        'Private Doorstep Biometrics'
      ],
      cta: {
        label: 'Apply for Golden Visa',
        url: `https://wa.me/${siteConfig?.whatsappRaw || '971566556645'}`,
        type: 'whatsapp'
      }
    },
    {
      id: 'corporate-pro',
      tierName: 'Corporate & Maid Quota',
      price: 'AED 1,650',
      originalPrice: 'AED 2,100',
      billingPeriod: 'per quota',
      isPopular: false,
      isRecommended: false,
      features: [
        'Tadbeer Domestic Worker Visa',
        'MOHRE Labor Quota Allocation',
        'Trade License Partner Addition',
        'Embassy Document Attestation',
        '24/7 Dedicated Account Manager'
      ],
      cta: {
        label: 'Request Corporate Quote',
        url: '/contact',
        type: 'secondary'
      }
    }
  ],
  processSteps: [
    {
      stepNumber: 1,
      title: 'Free Eligibility & Document Review',
      description: 'Our senior PROs verify your salary, Ejari tenancy contract, and marriage/birth certificates to guarantee zero GDRFA rejections.',
      timeEstimate: '15 Minutes',
      iconName: 'ShieldCheck'
    },
    {
      stepNumber: 2,
      title: 'Entry Permit & Status Modification',
      description: 'Official GDRFA typing and electronic entry permit issuance. In-country status change applied instantly without exit required.',
      timeEstimate: '24 Hours',
      iconName: 'FileCheck'
    },
    {
      stepNumber: 3,
      title: 'VIP Medical & Emirates ID Biometrics',
      description: 'Guided VIP access at Smart Salem DHA Medical centers with express 30-minute blood test results and fast-track fingerprinting.',
      timeEstimate: '1 Hour',
      iconName: 'Stethoscope'
    },
    {
      stepNumber: 4,
      title: 'E-Residency & Physical ID Delivery',
      description: 'Final ICP approval, e-residency visa issuance, and express courier delivery of your 2-year or 10-year physical Emirates ID card.',
      timeEstimate: '48 Hours',
      iconName: 'Award'
    }
  ],
  faqs: [
    {
      question: 'What is the minimum salary required to sponsor a family visa in Dubai?',
      answer: 'The official GDRFA minimum salary requirement to sponsor a spouse and children is AED 4,000 per month (or AED 3,000 plus employer-provided accommodation).'
    },
    {
      question: 'How long does the 10-Year Golden Visa processing take?',
      answer: 'Initial ICP/DLD nomination approval takes 24 to 48 hours. Once approved, medical screening and Emirates ID biometrics are completed in a single VIP visit.'
    },
    {
      question: 'Is Ejari tenancy contract required for sponsoring dependents?',
      answer: 'Yes, a registered Ejari in the sponsor’s name (or attested title deed) is mandatory for spouse and child visa applications in Dubai.'
    }
  ]
};

/**
 * Universal Data Fetching Utility for Next.js App Router Pages
 * 
 * Fetches page content dynamically from the backend API/Database with ISR (Incremental Static Regeneration).
 * Automatically merges response with default fallback tokens to prevent any UI breakage if fields are empty.
 * 
 * @param {string} slug - The page or service route identifier (e.g. 'family-visa', 'golden-visa')
 * @returns {Promise<ServiceCMSPageData>} Production-ready page configuration object
 */
export async function fetchCMSData(slug = 'family-visa') {
  const normalizedSlug = (slug || 'family-visa').toLowerCase();

  try {
    // Attempt backend API fetch with 60-second ISR revalidation
    const apiEndpoint = process.env.NEXT_PUBLIC_CMS_API_URL 
      ? `${process.env.NEXT_PUBLIC_CMS_API_URL}/api/services/${normalizedSlug}`
      : null;

    if (apiEndpoint) {
      const response = await fetch(apiEndpoint, {
        next: { revalidate: 60 },
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        const rawData = await response.json();
        return mergeWithFallbacks(rawData, normalizedSlug);
      }
    }
  } catch (error) {
    console.warn(`[CMS Fetching Notice]: Unable to reach CMS endpoint for "${normalizedSlug}". Utilizing fallback contract.`, error);
  }

  // Gracefully fallback to structured default contract if endpoint is unreachable or missing
  return mergeWithFallbacks({}, normalizedSlug);
}

/**
 * Merges raw CMS JSON input with the default fallback data contract.
 * Enforces strict typing, default array values, and non-empty strings.
 * 
 * @param {Object} rawData - Partial or raw JSON payload from API/Database
 * @param {string} slug - Current route slug
 * @returns {ServiceCMSPageData} Fully populated page data object
 */
function mergeWithFallbacks(rawData = {}, slug = 'family-visa') {
  const base = DEFAULT_FALLBACK_PAGE_DATA;

  return {
    title: rawData.title || rawData.pageTitle || `${formatSlugTitle(slug)} | EmiratesPrime Dubai`,
    subtitle: rawData.subtitle || base.subtitle,
    slug: slug,
    metaDescription: rawData.metaDescription || base.metaDescription,
    hero: {
      heroTitle: rawData.hero?.heroTitle || rawData.heroTitle || `${formatSlugTitle(slug)} in Dubai`,
      heroSubtitle: rawData.hero?.heroSubtitle || rawData.heroSubtitle || base.hero.heroSubtitle,
      heroBadge: rawData.hero?.heroBadge || rawData.heroBadge || base.hero.heroBadge,
      heroBackgroundImg: rawData.hero?.heroBackgroundImg || base.hero.heroBackgroundImg,
      primaryCta: {
        label: rawData.hero?.primaryCta?.label || base.hero.primaryCta.label,
        url: rawData.hero?.primaryCta?.url || base.hero.primaryCta.url,
        type: rawData.hero?.primaryCta?.type || base.hero.primaryCta.type
      },
      secondaryCta: {
        label: rawData.hero?.secondaryCta?.label || base.hero.secondaryCta.label,
        url: rawData.hero?.secondaryCta?.url || base.hero.secondaryCta.url,
        type: rawData.hero?.secondaryCta?.type || base.hero.secondaryCta.type
      }
    },
    pricingTiers: Array.isArray(rawData.pricingTiers) && rawData.pricingTiers.length > 0
      ? rawData.pricingTiers.map(tier => ({
          id: tier.id || tier.tierName?.toLowerCase().replace(/\s+/g, '-') || 'tier',
          tierName: tier.tierName || 'Standard Package',
          price: tier.price || 'AED 1,450',
          originalPrice: tier.originalPrice || null,
          billingPeriod: tier.billingPeriod || 'all inclusive',
          isPopular: Boolean(tier.isPopular),
          isRecommended: Boolean(tier.isRecommended),
          features: Array.isArray(tier.features) ? tier.features : ['Complete GDRFA Processing', 'VIP Expedited Medical'],
          cta: {
            label: tier.cta?.label || 'Select Package',
            url: tier.cta?.url || '/calculator',
            type: tier.cta?.type || 'gold'
          }
        }))
      : base.pricingTiers,
    processSteps: Array.isArray(rawData.processSteps) && rawData.processSteps.length > 0
      ? rawData.processSteps.map((step, idx) => ({
          stepNumber: step.stepNumber || idx + 1,
          title: step.title || `Step ${idx + 1}`,
          description: step.description || 'Verified government application processing.',
          timeEstimate: step.timeEstimate || '24 Hours',
          iconName: step.iconName || 'CheckCircle2'
        }))
      : base.processSteps,
    faqs: Array.isArray(rawData.faqs) && rawData.faqs.length > 0
      ? rawData.faqs
      : base.faqs
  };
}

/**
 * Formats a slug string into Title Case (e.g. 'golden-visa' -> 'Golden Visa')
 * @param {string} slug 
 * @returns {string}
 */
function formatSlugTitle(slug = '') {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
