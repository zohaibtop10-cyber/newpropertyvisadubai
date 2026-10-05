import React from 'react';
import { FileText, Shield } from 'lucide-react';
import { siteConfig } from '../data/cmsData';
import { marked } from 'marked';

export default function TermsPage({ cmsConfig }) {
  const headline = cmsConfig?.pages?.terms?.headline || "Terms of Service & Regulatory Disclosures";
  const body = cmsConfig?.pages?.terms?.body;

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-28 px-4 sm:px-6 font-sans selection:bg-[#D4AF37] selection:text-black">
      <div className="max-w-3xl mx-auto space-y-10">
        
        {/* Directive 10: Centered Header with Massive Gold H1 */}
        <header className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[10px] text-xs font-mono font-bold bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 uppercase tracking-widest">
            <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>LEGAL & REGULATORY DISCLOSURE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFF8DC] via-[#D4AF37] to-[#B8860B] tracking-tight font-display">
            <span>{headline}</span>
          </h1>

          <div className="text-xs font-mono text-slate-400">
            <span>Last Updated: October 2026 • Operator: {siteConfig.operatorName}</span>
          </div>
        </header>

        {/* Directive 10: Policy Sections using prose & rounded-[10px] card containers */}
        <div className="space-y-6 text-sm leading-relaxed">
          {body ? (
            <div 
              className="p-6 sm:p-8 rounded-[10px] bg-[#111111] border border-white/10 shadow-xl prose prose-invert max-w-none prose-headings:font-bold prose-headings:text-white prose-p:text-slate-300"
              dangerouslySetInnerHTML={{ __html: marked.parse(body) }}
            />
          ) : (
            <>
              {/* Section 1 */}
              <section className="space-y-3 p-6 sm:p-8 rounded-[10px] bg-[#111111] border border-white/10 shadow-xl">
                <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
                  <span className="text-[#D4AF37]">1.</span> <span>Operator Identity & Service Scope</span>
                </h2>
                <p className="text-slate-300">
                  PropertyVisaDubai is an online document clearing consultancy operated by <strong>{siteConfig.operatorName}</strong>, registered in Dubai, United Arab Emirates under DED License DET-789421-DXB. We assist individuals, families, and corporate clients with filing applications for family residency visas, Emirates IDs, MOFA attestations, and medical fitness appointments through official government channels (ICP, GDRFA, MOHRE, and DLD).
                </p>
              </section>

              {/* Section 2 */}
              <section className="space-y-3 p-6 sm:p-8 rounded-[10px] bg-[#111111] border border-white/10 shadow-xl">
                <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
                  <span className="text-[#D4AF37]">2.</span> <span>Third-Party Government Disclaimer</span>
                </h2>
                <p className="text-slate-300">
                  PropertyVisaDubai is a private consultancy and is not directly affiliated with, owned by, or part of the UAE Federal Authority for Identity, Citizenship, Customs and Port Security (ICP) or the General Directorate of Residency and Foreigners Affairs (GDRFA). Applicants have the right to apply directly through official portals (such as <code>icp.gov.ae</code> or <code>gdrfad.gov.ae</code>). Our fees represent an unbundled service retainer for administrative preparation, typing, document audit, and concierge handling.
                </p>
              </section>

              {/* Section 3 */}
              <section className="space-y-3 p-6 sm:p-8 rounded-[10px] bg-[#111111] border border-white/10 shadow-xl">
                <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
                  <span className="text-[#D4AF37]">3.</span> <span>Data Privacy & Confidentiality</span>
                </h2>
                <p className="text-slate-300">
                  We adhere to strict data privacy guidelines under UAE Federal Decree-Law No. 45 of 2021 regarding Personal Data Protection. All personal identification documents (passports, marriage certificates, birth records, salary certificates) submitted over WhatsApp or our web forms are encrypted and used solely for the purpose of executing requested government visa filings. We do not sell or share client data with unauthorized third parties.
                </p>
              </section>

              {/* Section 4 */}
              <section className="space-y-3 p-6 sm:p-8 rounded-[10px] bg-[#111111] border border-white/10 shadow-xl">
                <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
                  <span className="text-[#D4AF37]">4.</span> <span>Government Pass-Through Fees & Refunds</span>
                </h2>
                <p className="text-slate-300">
                  Government tariffs (GDRFA entry permits, ICP Emirates ID fees, DHA medical fees) are collected on behalf of official UAE authorities. In the event an application is rejected due to a legal oversight by our team, our advisory retainer is fully refunded. Government fees paid to authorities are subject to official GDRFA/ICP refund regulations.
                </p>
              </section>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
