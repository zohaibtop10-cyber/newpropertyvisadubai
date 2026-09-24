import React from 'react';
import { FileText } from 'lucide-react';
import { siteConfig } from '../data/cmsData';

export default function TermsPage({ cmsConfig }) {
  const headline = cmsConfig?.pages?.terms?.headline || "Terms of Service & Privacy Policy";
  const body = cmsConfig?.pages?.terms?.body;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-24 space-y-12 text-slate-800 dark:text-slate-200">
      
      {/* Header */}
      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#E01E37]/10 text-[#E01E37] border border-[#E01E37]/20">
          <FileText className="w-3.5 h-3.5" />
          <span>LEGAL DISCLOSURE</span>
        </div>

        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {headline}
        </h1>

        <div className="text-xs font-mono text-slate-500">
          Last Updated: September 2026 • Operator: {siteConfig.operatorName}
        </div>
      </header>

      {/* Policy Sections */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed">
        
        {/* Section 1 */}
        <section className="space-y-3 p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10">
          <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">
            1. Operator Identity & Service Scope
          </h2>
          <p>
            FamilyVisa.ae is an online document clearing consultancy operated by <strong>{siteConfig.operatorName}</strong>, registered in Dubai, United Arab Emirates. We assist individuals and corporate clients with filing applications for family residency visas, Emirates IDs, MOFA attestations, and medical fitness appointments through official government channels (ICP, GDRFA, MOHRE, and DLD).
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10">
          <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">
            2. Third-Party Government Disclaimer
          </h2>
          <p>
            FamilyVisa.ae is a private consultancy and is not directly affiliated with, owned by, or part of the UAE Federal Authority for Identity, Citizenship, Customs and Port Security (ICP) or the General Directorate of Residency and Foreigners Affairs (GDRFA). Applicants have the right to apply directly through official portals (such as <code>icp.gov.ae</code> or <code>gdrfad.gov.ae</code>). Our fees represent an unbundled service retainer for administrative preparation, typing, document audit, and concierge handling.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10">
          <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">
            3. Data Privacy & Confidentiality
          </h2>
          <p>
            We adhere to strict data privacy guidelines. All personal identification documents (passports, marriage certificates, birth records, salary certificates) submitted over WhatsApp or our web forms are encrypted and used solely for the purpose of executing requested government visa filings. We do not sell or share client data with unauthorized third parties.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10">
          <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">
            4. Government Pass-Through Fees & Refunds
          </h2>
          <p>
            Government tariffs (GDRFA entry permits, ICP Emirates ID fees, DHA medical fees) are collected on behalf of official UAE authorities. In the event an application is rejected due to a legal oversight by our team, our advisory retainer is fully refunded. Government fees paid to authorities are subject to official GDRFA/ICP refund regulations.
          </p>
        </section>

      </div>

    </div>
  );
}
