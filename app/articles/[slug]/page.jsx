'use client';

import React from 'react';
import ArticleLayout from '../../../src/components/ArticleLayout';

export default function ArticlePage({ params }) {
  return (
    <ArticleLayout
      article={{
        title: "Complete 2026 Guide to Sponsoring Your Family in Dubai & UAE",
        category: "Family Residency",
        date: "October 2026",
        readTime: "7 min read",
        author: "Bilal Saleem",
        authorRole: "Founder & Chief Executive Officer",
        authorAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
        featuredImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
        calloutTitle: "Official GDRFA & ICP Compliance (2026)",
        calloutContent: "All family residency permits require an attested Ejari tenancy contract registered under the primary sponsor's name, certified by Dubai Land Department or equivalent municipality.",
        pricingCards: [
          {
            title: 'Inside Country Status',
            subtitle: 'For dependents already inside the UAE',
            price: '3,850',
            currency: 'AED',
            features: [
              'No exit trip required',
              'Includes GDRFA status change fee',
              'VIP Smart Salem Medical screening',
              '2-Year physical Emirates ID delivery'
            ],
            tag: 'Most Popular',
            primary: true
          },
          {
            title: 'Outside Country Entry',
            subtitle: 'For dependents currently abroad',
            price: '2,950',
            currency: 'AED',
            features: [
              'Electronic Entry Permit',
              '60-day entry window authorization',
              'In-country status activation upon entry',
              '2-Year physical Emirates ID delivery'
            ],
            tag: 'Standard Route',
            primary: false
          }
        ],
        tableCaption: "Government Filing Tariffs & Concierge Breakdown (2026)",
        tableHeaders: ['Residency Category', 'Government Fee', 'VIP Medical & EID', 'Total Estimate'],
        tableRows: [
          ['Spouse Residence (2-Year)', 'AED 3,040', 'AED 850', 'AED 3,890'],
          ['Child Residence (Per Child)', 'AED 2,860', 'AED 680', 'AED 3,540'],
          ['Parent Residence (1-Year)', 'AED 3,040', 'AED 950', 'AED 3,990']
        ],
        ctaTitle: "Calculate Your Exact Visa Cost",
        ctaSubtitle: "Zero obligation. Instant GDRFA fee breakdown in under 30 seconds.",
        ctaBtnText: "CALCULATE MY FEES →",
        contentMarkdown: `
The Federal Authority for Identity, Citizenship, Customs and Port Security (ICP) and the General Directorate of Residency and Foreigners Affairs (GDRFA) have updated and streamlined the UAE residency application workflow for 2026.

Whether you are securing a 10-Year Golden Visa, sponsoring immediate family members, or establishing a corporate free zone entity, strict adherence to official attestation and medical protocols is mandatory.

## Key Residency Pillars for 2026

To successfully sponsor dependents in Dubai or Abu Dhabi, primary sponsors must meet exact financial and housing prerequisites:

* **Minimum Salary Threshold:** AED 4,000 per month (or AED 3,000 + company accommodation) for spouse and children.
* **Registered Ejari (Tenancy Contract):** A valid residential tenancy contract under the sponsor's name, certified by Dubai Land Department (DLD) or equivalent municipality.
* **Attested Marriage & Birth Certificates:** Fully legalized through the Ministry of Foreign Affairs (MOFA) in the country of origin and MOFAIC UAE.
* **Comprehensive Health Insurance:** Mandatory DHA/DOH compliant medical coverage for all dependents prior to visa stamping.

> "The UAE residency framework guarantees long-term stability for global business leaders and families. However, incomplete documentation remains the primary cause of rejection or delayed SLA approvals."

## Critical Considerations & Pitfalls

Failing to update family status within 60 days of entry can incur daily administrative fines. Additionally, dependents over 18 years of age must undergo individual medical screening without exception.
        `
      }}
    />
  );
}
