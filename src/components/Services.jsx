import React from 'react';
import { Building2, Award, Landmark, ShieldAlert, Sparkles, ArrowRight, Check } from 'lucide-react';

export default function Services() {
  return (
    <section id="services" className="bg-[#F8F9FA] text-slate-900 py-20 px-4 sm:px-6 lg:px-8 font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Eyebrow & Title */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E01E37]/10 text-[#E01E37] text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-[#E01E37]" />
            END-TO-END CORPORATE SERVICES
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight max-w-3xl">
            Full Lifecycle Advisory Under UAE Jurisdiction
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-3xl mt-3 leading-relaxed">
            From preliminary structuration to complete international tax defense, our practice delivers end-to-end institutional compliance.
          </p>
        </div>

        {/* Top Row: 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Card 01 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#E01E37] group-hover:scale-110 transition-transform">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-slate-400">01 / INCORPORATION</span>
              </div>

              <h3 className="text-xl font-display font-bold text-slate-900 mb-3 group-hover:text-[#E01E37] transition-colors">
                Company Formation Architecture
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Seamless structure setup for 100% foreign-owned entities across DIFC, ADGM, Free Zones, and UAE Mainland.
              </p>

              <ul className="space-y-2.5 mb-6 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#E01E37] shrink-0" />
                  <span>All Types of Legal Structures</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#E01E37] shrink-0" />
                  <span>Regulatory Pre-Approvals & Verification</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#E01E37] shrink-0" />
                  <span>Trade License Execution</span>
                </li>
              </ul>
            </div>

            <a href="#contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E01E37] hover:text-[#a00d2b] transition-colors uppercase tracking-wider pt-4 border-t border-slate-100">
              <span>Request Structure Briefing</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Card 02 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#E01E37] group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-slate-400">02 / IMMIGRATION</span>
              </div>

              <h3 className="text-xl font-display font-bold text-slate-900 mb-3 group-hover:text-[#E01E37] transition-colors">
                10-Year Golden Visa Services
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Expedited residency processing for investors, executives, tech founders, and real estate holders.
              </p>

              <ul className="space-y-2.5 mb-6 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#E01E37] shrink-0" />
                  <span>Golden Visa Processing & Medical VIP</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#E01E37] shrink-0" />
                  <span>Work Permits & VIP Executive Residence</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#E01E37] shrink-0" />
                  <span>Zero Minimum Physical Stay Requirement</span>
                </li>
              </ul>
            </div>

            <a href="#contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E01E37] hover:text-[#a00d2b] transition-colors uppercase tracking-wider pt-4 border-t border-slate-100">
              <span>Assess Golden Visa Eligibility</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Card 03 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#E01E37] group-hover:scale-110 transition-transform">
                  <Landmark className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-slate-400">03 / BANKING</span>
              </div>

              <h3 className="text-xl font-display font-bold text-slate-900 mb-3 group-hover:text-[#E01E37] transition-colors">
                Private & VIP Commercial Banking
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Direct relationships with Tier-1 UAE & international banks for corporate accounts and wealth management.
              </p>

              <ul className="space-y-2.5 mb-6 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#E01E37] shrink-0" />
                  <span>Direct Introductions with Senior Officers</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#E01E37] shrink-0" />
                  <span>Private Banking & Multi-Currency Setup</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#E01E37] shrink-0" />
                  <span>High-Speed Account Opening Assistance</span>
                </li>
              </ul>
            </div>

            <a href="#contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E01E37] hover:text-[#a00d2b] transition-colors uppercase tracking-wider pt-4 border-t border-slate-100">
              <span>Engage VIP Advisory</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Bottom Row: 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 04 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#E01E37] group-hover:scale-110 transition-transform">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-slate-400">04 / TAXATION & COMPLIANCE</span>
              </div>

              <h3 className="text-xl font-display font-bold text-slate-900 mb-3 group-hover:text-[#E01E37] transition-colors">
                Corporate Tax & OECD Pillar 2
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Complete compliance with 9% Corporate Tax regulations, ESR, UBO declarations, and transfer pricing requirements.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-[11px] font-semibold text-slate-700">
                  ✓ 0% Corporate Tax Exemption Advisory
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-[11px] font-semibold text-slate-700">
                  ✓ International Tax & OECD Compliance
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-[11px] font-semibold text-slate-700">
                  ✓ Tax Registration & Transfer Filing
                </div>
              </div>
            </div>

            <a href="#contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E01E37] hover:text-[#a00d2b] transition-colors uppercase tracking-wider pt-4 border-t border-slate-100">
              <span>Tax Framework Review</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Card 05 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#E01E37] group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-slate-400">05 / INTELLECTUAL PROPERTY</span>
              </div>

              <h3 className="text-xl font-display font-bold text-slate-900 mb-3 group-hover:text-[#E01E37] transition-colors">
                Trademarks & Sovereign IP Protection
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Protection of brand assets, patents, copyrights, and intellectual property across the GCC region.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-[11px] font-semibold text-slate-700">
                  ✓ Trademark Registration GCC
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-[11px] font-semibold text-slate-700">
                  ✓ Patent Filings & Monitoring
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-[11px] font-semibold text-slate-700">
                  ✓ IP Portfolio Management
                </div>
              </div>
            </div>

            <a href="#contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E01E37] hover:text-[#a00d2b] transition-colors uppercase tracking-wider pt-4 border-t border-slate-100">
              <span>Protect Enterprise IP</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
