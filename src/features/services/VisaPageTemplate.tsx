import React from 'react';
import { Nav } from '../../components/Nav';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Accordion } from '../../components/Accordion';
import { TimelineStep } from '../../components/TimelineStep';
import { Footer } from '../../components/Footer';
import { Calculator } from '../calculator/Calculator';
import { ServiceDoc } from '../../lib/converters';
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  Calculator as CalcIcon,
  MessageSquare,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';

import { useService } from '../../hooks/useFirestoreData';

export interface VisaPageTemplateProps {
  routeId: 'property' | 'golden' | 'family';
  pageId: string;
  onNavigate?: (route: string) => void;
}

export const VisaPageTemplate: React.FC<VisaPageTemplateProps> = ({
  routeId,
  pageId,
  onNavigate,
}) => {
  const { service: serviceData, loading } = useService(pageId);
  const handleLink = (href: string) => {
    if (onNavigate) {
      onNavigate(href);
    } else if (typeof window !== 'undefined') {
      window.location.href = href;
    }
  };

  const whatsappUrl = `https://wa.me/971501234567?text=Hello%2C%20I%20am%20enquiring%20about%20${encodeURIComponent(
    serviceData.title
  )}.`;

  const samplePageFaqs = [
    {
      id: 'pf-1',
      title: `What is the processing SLA for ${serviceData.title}?`,
      content: `Standard processing from document submission to Emirates ID stamping is completed within ${serviceData.timelineDays} working days under our SLA.`,
    },
    {
      id: 'pf-2',
      title: 'What documents are required upfront?',
      content: serviceData.requiredDocs.join(', '),
    },
  ];

  if (loading) {
    return <div className="min-h-screen bg-bg text-text pt-32 text-center">Loading {routeId} visa info...</div>;
  }

  if (!serviceData) {
    return <div className="min-h-screen bg-bg text-text pt-32 text-center">Service data not found for {pageId}</div>;
  }

  return (
    <div className="min-h-screen bg-bg text-text transition-colors duration-200 font-sans">
      {/* Nav */}
      <Nav onNavigate={onNavigate} activeRoute={`/${serviceData.slug}`} />

      <main className="pt-24 pb-16">
        {/* 1. Page Hero */}
        <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-12 md:py-16 border-b border-border-hairline">
          <div className="flex items-center gap-2 text-xs font-mono text-text-muted mb-4">
            <button type="button" onClick={() => handleLink('/')} className="hover:text-gold">
              Home
            </button>
            <ChevronRight className="w-3 h-3 text-border-hairline" />
            <button type="button" onClick={() => handleLink('/services')} className="hover:text-gold">
              Services
            </button>
            <ChevronRight className="w-3 h-3 text-border-hairline" />
            <span className="text-gold font-semibold">{serviceData.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold-soft/10 text-gold text-xs font-mono font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span>{serviceData.category.toUpperCase()} ROUTE &bull; {serviceData.timelineDays} DAYS SLA</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text">
                {serviceData.title}
              </h1>

              <p className="text-text-muted text-base md:text-lg leading-relaxed max-w-2xl">
                {serviceData.shortDescription}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button
                  variant="whatsapp"
                  size="lg"
                  icon={<MessageSquare className="w-5 h-5" />}
                  onClick={() => window.open(whatsappUrl, '_blank')}
                >
                  WhatsApp Consultation
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  icon={<CalcIcon className="w-5 h-5" />}
                  onClick={() => handleLink(`/calculator?route=${routeId}`)}
                >
                  Calculate Scoped Fee
                </Button>
              </div>
            </div>

            <div className="lg:col-span-4">
              <Card variant="content" className="bg-surface border border-gold/40 shadow-md space-y-4">
                <div className="text-xs font-mono text-gold font-bold uppercase tracking-wider">
                  Itemized Fee Summary
                </div>
                <div className="space-y-2 border-y border-border-hairline py-3">
                  <div className="flex justify-between text-xs text-text-muted">
                    <span>Government Fee:</span>
                    <span className="font-mono text-text">AED {serviceData.governmentFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-text-muted">
                    <span>Fixed Service Fee:</span>
                    <span className="font-mono text-text">AED {serviceData.serviceFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-text pt-2 border-t border-border-hairline">
                    <span>Total Starting Fee:</span>
                    <span className="font-mono text-gold">AED {serviceData.startingFee.toLocaleString()}</span>
                  </div>
                </div>
                <div className="text-[11px] text-text-muted">
                  Official DLD / ICP channel fees included. No hidden charges.
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* 2. Eligibility Table */}
        <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-12 border-b border-border-hairline">
          <h2 className="text-2xl font-bold text-text mb-6">Eligibility Criteria &amp; Thresholds</h2>
          <div className="overflow-x-auto border border-border-hairline rounded-lg bg-surface">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border-hairline bg-bg/50 text-xs font-mono font-semibold uppercase text-gold">
                  <th className="p-4">Criteria</th>
                  <th className="p-4">Requirement Standard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-hairline text-sm text-text-muted">
                <tr>
                  <td className="p-4 font-semibold text-text">Investment Threshold</td>
                  <td className="p-4 font-mono text-gold">
                    {serviceData.thresholdAmount
                      ? `AED ${serviceData.thresholdAmount.toLocaleString()}+`
                      : 'Salary >= AED 4,000 / month'}
                  </td>
                </tr>
                {serviceData.requirements.map((req, i) => (
                  <tr key={i}>
                    <td className="p-4 font-semibold text-text">Requirement #{i + 1}</td>
                    <td className="p-4">{req}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. Embedded Scoped Calculator */}
        <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-12 border-b border-border-hairline">
          {/* TODO(Phase 5): Wire the real <Calculator initialRoute={routeId} /> import here once Phase 5 is done */}
          <div className="bg-surface border-2 border-dashed border-gold/30 rounded-lg p-12 text-center text-text-muted">
            <CalcIcon className="w-10 h-10 mx-auto mb-4 text-gold/50" />
            <h3 className="text-xl font-bold text-text mb-2">Cost Calculator Placeholder</h3>
            <p>The interactive {serviceData.title} fee calculator will be implemented here in Phase 5.</p>
          </div>
        </section>

        {/* 4. Required Documents Checklist */}
        <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-12 border-b border-border-hairline">
          <h2 className="text-2xl font-bold text-text mb-6">Required Documentation Checklist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="content">
              <h3 className="text-base font-bold text-text flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-gold" />
                Individual Applicant Documents
              </h3>
              <ul className="space-y-3">
                {serviceData.requiredDocs.map((docItem, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-text-muted">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>{docItem}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card variant="content">
              <h3 className="text-base font-bold text-text flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-gold" />
                Corporate / Sponsor Verification
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-text-muted">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>Trade Licence &amp; Establishment Card copy</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-text-muted">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>Sponsor passport &amp; Emirates ID copy</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-text-muted">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>Attested NOC letter (where applicable)</span>
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* 5. Process Timeline */}
        <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-12 border-b border-border-hairline">
          <h2 className="text-2xl font-bold text-text mb-8">Processing Timeline ({serviceData.timelineDays} Days)</h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <TimelineStep stepNumber={1} title="Document Verification" description="Title deed or NOC submission and audit." />
            <TimelineStep stepNumber={2} title="Government Clearance" description="DLD and ICP entry permit processing." />
            <TimelineStep stepNumber={3} title="VIP Medical & EID" description="Fast-track medical fitness test and biometrics." />
            <TimelineStep stepNumber={4} title="Permit Issuance" description="Residency stamped and Emirates ID delivered." isLast />
          </div>
        </section>

        {/* 6. Page FAQ Block */}
        <section className="max-w-[720px] mx-auto px-4 py-12 border-b border-border-hairline">
          <h2 className="text-2xl font-bold text-text text-center mb-6">Page FAQ</h2>
          <Accordion items={samplePageFaqs} defaultOpenIds={['pf-1']} />
        </section>
      </main>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default VisaPageTemplate;
