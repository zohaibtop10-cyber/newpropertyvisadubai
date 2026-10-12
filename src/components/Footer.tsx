import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export interface FooterProps {
  onNavigate?: (route: string) => void;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, className = '' }) => {
  const handleLinkClick = (href: string) => {
    if (onNavigate) {
      onNavigate(href);
    } else if (typeof window !== 'undefined') {
      window.location.href = href;
    }
  };

  return (
    <footer className={`bg-surface border-t border-border-hairline text-text pt-12 pb-8 ${className}`}>
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        {/* 4 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold mb-4">
              Residency Services
            </h4>
            <ul className="space-y-2.5 text-sm text-text-muted">
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('/property-visa')}
                  className="hover:text-gold transition-colors"
                >
                  Property Visa (AED 750K–2M+)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('/golden-visa')}
                  className="hover:text-gold transition-colors"
                >
                  10-Year Golden Visa
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('/family-visa')}
                  className="hover:text-gold transition-colors"
                >
                  Family & Dependent Visa
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('/services')}
                  className="hover:text-gold transition-colors"
                >
                  PRO & Attestation Services
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('/calculator')}
                  className="hover:text-gold transition-colors"
                >
                  Fee Cost Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-text-muted">
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('/about')}
                  className="hover:text-gold transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('/blog')}
                  className="hover:text-gold transition-colors"
                >
                  Regulations & Insights
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('/faq')}
                  className="hover:text-gold transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('/contact')}
                  className="hover:text-gold transition-colors"
                >
                  Contact Consultancy
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold mb-4">
              Legal & Compliance
            </h4>
            <ul className="space-y-2.5 text-sm text-text-muted">
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('/privacy')}
                  className="hover:text-gold transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('/terms')}
                  className="hover:text-gold transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('/disclaimer')}
                  className="hover:text-gold transition-colors"
                >
                  Government Disclaimer
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold mb-4">
              Dubai Advisory Office
            </h4>
            <ul className="space-y-3 text-sm text-text-muted">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>Business Bay, Downtown Dubai, United Arab Emirates</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>+971 4 000 0000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>advisory@clientdomain.ae</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="border-t border-border-hairline pt-6 mt-6">
          <div className="flex items-start gap-3 p-4 rounded-md border border-border-hairline bg-bg/50 mb-6">
            <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            <p className="text-xs text-text-muted leading-relaxed">
              <strong>Government Disclaimer:</strong> We are an independent business consultancy providing professional advisory and document processing services for UAE residency applications. We are not a government authority or an official department of GDRFA, ICP, or DLD. Official government portals can be accessed directly at icp.gov.ae or gdrfad.gov.ae. Registered trade licence number: <span className="font-mono text-gold">DET-100234</span>.
            </p>
          </div>

          {/* Copyright Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-text-muted gap-4">
            <div>
              © {new Date().getFullYear()} UAE Residency Consultancy. All rights reserved.
            </div>
            <div className="text-[11px]">
              Design System Token Spec Compliant • Inter Typography
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
