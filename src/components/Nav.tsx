import React, { useEffect, useState } from 'react';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './Button';

export interface NavProps {
  onNavigate?: (route: string) => void;
  activeRoute?: string;
}

export const Nav: React.FC<NavProps> = ({ onNavigate, activeRoute = '/' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Property Visa', href: '/property-visa' },
    { label: 'Golden Visa', href: '/golden-visa' },
    { label: 'Family Visa', href: '/family-visa' },
    { label: 'Services', href: '/services' },
    { label: 'Calculator', href: '/calculator' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(href);
    } else if (typeof window !== 'undefined') {
      window.location.href = href;
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-surface border-b border-border-hairline shadow-[0_4px_20px_rgba(0,0,0,0.06)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleLinkClick('/')}
          className="flex items-center gap-2.5 text-left focus-visible:outline-2 focus-visible:outline-gold"
        >
          <div className="w-9 h-9 rounded-md bg-gold flex items-center justify-center text-bg font-bold">
            <ShieldCheck className="w-5 h-5 text-bg" />
          </div>
          <div>
            <span className="font-bold text-base md:text-lg text-text tracking-tight block leading-tight">
              UAE Residency
            </span>
            <span className="text-[10px] text-text-muted tracking-wider uppercase block">
              Licensed Consultancy
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => handleLinkClick(link.href)}
              className={`text-sm font-medium transition-colors duration-150 ${
                activeRoute === link.href ? 'text-gold' : 'text-text hover:text-gold'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleLinkClick('/calculator')}
          >
            Check Eligibility
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-text border border-border-hairline rounded-md bg-surface"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface border-b border-border-hairline px-6 py-6 space-y-4 shadow-lg">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => handleLinkClick(link.href)}
                className={`text-left py-2 text-base font-medium border-b border-border-hairline/40 ${
                  activeRoute === link.href ? 'text-gold' : 'text-text'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
          <div className="pt-2">
            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => handleLinkClick('/calculator')}
            >
              Check Eligibility
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Nav;
