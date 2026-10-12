import React from 'react';
import { Nav } from '../components/Nav';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Accordion } from '../components/Accordion';
import { StatCounter } from '../components/StatCounter';
import { TimelineStep } from '../components/TimelineStep';
import { ThemeToggle } from '../components/ThemeToggle';
import { Footer } from '../components/Footer';
import { MessageSquare, ShieldCheck } from 'lucide-react';

export const StyleCheck: React.FC = () => {
  const sampleFaqItems = [
    {
      id: 'faq-1',
      title: 'What is the minimum property value for a 10-Year Golden Visa?',
      content:
        'The minimum title-deed property investment required for the UAE 10-Year Golden Visa is AED 2,000,000. Off-plan or mortgaged properties from approved developers are also eligible subject to bank NOC.',
    },
    {
      id: 'faq-2',
      title: 'Can I sponsor my spouse and children on a Property Visa?',
      content:
        'Yes, property visa holders can sponsor their spouse, unmarried daughters of any age, and sons up to 25 years old. Parents can also be sponsored under specific income and tenancy criteria.',
    },
    {
      id: 'faq-3',
      title: 'How long does the entire processing timeline take?',
      content:
        'Typical processing from document submission to Emirates ID stamping is 7 to 10 working days, depending on medical fitness check queue times.',
    },
  ];

  return (
    <div className="min-h-screen bg-bg text-text transition-colors duration-200 font-sans">
      {/* Navigation Header */}
      <Nav activeRoute="/style-check" />

      {/* Main Container */}
      <main className="max-w-[1200px] mx-auto px-4 md:px-6 pt-28 pb-16 space-y-16">
        {/* Style Check Header */}
        <section className="border-b border-border-hairline pb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-gold font-mono">
                Phase 1 Verification
              </span>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-text mt-1">
                Design System & Component Showcase
              </h1>
              <p className="text-text-muted text-sm md:text-base mt-2">
                Every component is styled exclusively using tokens defined in <code className="font-mono text-gold">tokens.css</code> with 100% light/dark theme parity.
              </p>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg border border-border-hairline bg-surface">
              <span className="text-xs font-medium text-text-muted">Theme State:</span>
              <ThemeToggle />
            </div>
          </div>
        </section>

        {/* 1. Button Variants & States */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-text border-b border-border-hairline pb-2">
            1. Button Component (<code className="font-mono text-xs text-gold">Button.tsx</code>)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="content">
              <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">
                Primary Gold Variant
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" size="sm">
                  Primary Small
                </Button>
                <Button variant="primary" size="md">
                  Primary Medium
                </Button>
                <Button variant="primary" size="lg">
                  Primary Large
                </Button>
                <Button variant="primary" size="md" disabled>
                  Disabled State
                </Button>
              </div>
            </Card>

            <Card variant="content">
              <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">
                Secondary Hairline Variant
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="secondary" size="sm">
                  Secondary Small
                </Button>
                <Button variant="secondary" size="md">
                  Secondary Medium
                </Button>
                <Button variant="secondary" size="lg">
                  Secondary Large
                </Button>
                <Button variant="secondary" size="md" disabled>
                  Disabled State
                </Button>
              </div>
            </Card>

            <Card variant="content">
              <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">
                WhatsApp Deep-Link Variant
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="whatsapp"
                  size="md"
                  icon={<MessageSquare className="w-4 h-4" />}
                >
                  WhatsApp Consultation
                </Button>
                <Button
                  variant="whatsapp"
                  size="lg"
                  icon={<MessageSquare className="w-5 h-5" />}
                >
                  Instant Quote
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* 2. Card Variants */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-text border-b border-border-hairline pb-2">
            2. Card Component (<code className="font-mono text-xs text-gold">Card.tsx</code>)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="content">
              <span className="text-xs font-semibold text-gold font-mono uppercase tracking-wider">
                Content Card
              </span>
              <h3 className="text-lg font-semibold text-text mt-2">10-Year Golden Visa</h3>
              <p className="text-text-muted text-sm mt-2 leading-relaxed">
                Direct residency processing for real estate investors with AED 2,000,000+ title deeds.
              </p>
              <div className="mt-4 pt-4 border-t border-border-hairline flex items-center justify-between">
                <span className="text-xs text-text-muted">Government SLA</span>
                <span className="text-xs font-semibold text-gold font-mono">7–10 Days</span>
              </div>
            </Card>

            <Card variant="stat">
              <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                Stat Counter Card
              </span>
              <div className="my-4">
                <StatCounter value={15000} suffix="+" label="Processed Visas" />
              </div>
              <p className="text-xs text-text-muted">100% verified SLA approval rate.</p>
            </Card>

            <Card variant="testimonial">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span className="text-xs font-medium text-gold font-mono">Unedited Google Review</span>
              </div>
              <p className="text-sm text-text italic leading-relaxed">
                &ldquo;Extremely smooth process for my Golden Visa. Every fee was broken down beforehand with zero hidden surprises.&rdquo;
              </p>
              <div className="mt-4 pt-3 border-t border-border-hairline not-italic flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-text">Alexander V.</div>
                  <div className="text-[11px] text-text-muted">Property Investor, Dubai Marina</div>
                </div>
                <span className="text-[10px] text-text-muted font-mono">2 months ago</span>
              </div>
            </Card>
          </div>
        </section>

        {/* 3. StatCounter Component */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-text border-b border-border-hairline pb-2">
            3. StatCounter Component (<code className="font-mono text-xs text-gold">StatCounter.tsx</code>)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card variant="content">
              <StatCounter value={2000000} prefix="AED " label="Minimum Investment" />
            </Card>
            <Card variant="content">
              <StatCounter value={100} suffix="%" label="SLA Compliance" />
            </Card>
            <Card variant="content">
              <StatCounter value={10} suffix=" Years" label="Residency Term" />
            </Card>
            <Card variant="content">
              <StatCounter value={7} suffix=" Days" label="Average Stamping" />
            </Card>
          </div>
        </section>

        {/* 4. TimelineStep Component */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-text border-b border-border-hairline pb-2">
            4. TimelineStep Component (<code className="font-mono text-xs text-gold">TimelineStep.tsx</code>)
          </h2>
          <Card variant="content">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 py-4">
              <TimelineStep
                stepNumber={1}
                title="Eligibility Audit"
                description="We review your property title deed, NOC, and passport copy."
              />
              <TimelineStep
                stepNumber={2}
                title="Fee Itemization"
                description="Receive a transparent breakdown of DLD and service fees."
              />
              <TimelineStep
                stepNumber={3}
                title="VIP Medical & EID"
                description="Chaperoned biometric appointment at Amer center."
              />
              <TimelineStep
                stepNumber={4}
                title="Visa Stamping"
                description="10-year residency permit delivered to your residence."
                isLast
              />
            </div>
          </Card>
        </section>

        {/* 5. Accordion Component */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-text border-b border-border-hairline pb-2">
            5. Accordion Component (<code className="font-mono text-xs text-gold">Accordion.tsx</code>)
          </h2>
          <div className="max-w-3xl">
            <Accordion items={sampleFaqItems} defaultOpenIds={['faq-1']} />
          </div>
        </section>
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default StyleCheck;
