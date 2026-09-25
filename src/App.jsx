import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import ServicesMegaMenu from './components/ServicesMegaMenu';
import MobileFooter from './components/MobileFooter';
import CalculatorModal from './components/CalculatorModal';
import Home from './components/Home';
import ServiceTemplate from './components/ServiceTemplate';
import BlogSystem from './components/BlogSystem';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import TermsPage from './components/TermsPage';
import PricingPage from './components/PricingPage';
import DocumentChecklistPage from './components/DocumentChecklistPage';
import LocationsPage from './components/LocationsPage';
import Footer from './components/Footer';
import DesktopWhatsAppFAB from './components/DesktopWhatsAppFAB';
import MobileToolsFAB from './components/MobileToolsFAB';

// Admin Suite Imports
import AdminLayout from './components/admin/AdminLayout';
import CMSModule from './components/admin/CMSModule';
import { TranslationProvider } from './context/TranslationContext';

import { 
  INITIAL_STAFF_USERS, INITIAL_CMS_CONFIG 
} from './data/adminState';

export default function App() {
  // Global Theme Mode ('light' | 'dark')
  const [theme, setTheme] = useState('light');

  // Global Language State ('EN' | 'AR' | 'RU' | 'DE' | 'ES' | 'FR' | 'TR' | 'ZH')
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('app_language') || 'EN';
    }
    return 'EN';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('app_language', language);
    }
  }, [language]);

  // View Navigation State ('home' | 'service' | 'about' | 'contact' | 'privacy' | 'blog-index' | 'blog-post' | 'admin')
  const [activeView, setActiveView] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname.toLowerCase();
      const h = window.location.hash.toLowerCase();
      if (p === '/admin') {
        return 'admin';
      }
    }
    return 'home';
  });

  const [selectedServiceId, setSelectedServiceId] = useState('spouse-visa');
  const [selectedPostId, setSelectedPostId] = useState(null);

  // Admin Module State ('homepage' | 'services' | 'testimonials' | 'settings')
  const [adminModule, setAdminModule] = useState('homepage');

  // Admin Data Stores with localStorage persistence
  const [staffUsers] = useState(INITIAL_STAFF_USERS);
  const [currentUser, setCurrentUser] = useState(INITIAL_STAFF_USERS[0]);
  const [cmsConfig, setCmsConfig] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('app_cms_config');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Error loading cmsConfig from localStorage:', e);
        }
      }
    }
    return INITIAL_CMS_CONFIG;
  });

  // Sync cmsConfig changes to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && cmsConfig) {
      localStorage.setItem('app_cms_config', JSON.stringify(cmsConfig));
    }
  }, [cmsConfig]);

  // Modal States
  const [isOverlayMenuOpen, setIsOverlayMenuOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [calculatorTab, setCalculatorTab] = useState('spouse'); // 'spouse' | 'parents' | 'domestic'

  // Apply dark mode class to root document element when theme changes!
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Sync /admin URL Route
  useEffect(() => {
    const syncRouteFromUrl = () => {
      const p = window.location.pathname.toLowerCase();
      const h = window.location.hash.toLowerCase();
      if (p === '/admin') {
        setActiveView('admin');
      } else {
        setActiveView(prev => (prev === 'admin' ? 'home' : prev));
      }
    };

    window.addEventListener('popstate', syncRouteFromUrl);
    return () => window.removeEventListener('popstate', syncRouteFromUrl);
  }, []);

  // Handlers
  const handleNavigate = (view, payload = null) => {
    setActiveView(view);
    if (view === 'service' && payload) {
      setSelectedServiceId(payload);
    }
    if (view === 'blog-post' && payload) {
      setSelectedPostId(payload);
    }

    if (view === 'admin') {
      if (window.location.pathname !== '/admin') {
        window.history.pushState(null, '', '/admin');
      }
    } else {
      if (window.location.pathname === '/admin') {
        window.history.pushState(null, '', '/');
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCalculator = (tab = 'spouse') => {
    setCalculatorTab(tab);
    setIsCalculatorOpen(true);
  };

  // Render Admin View if activeView === 'admin'
  if (activeView === 'admin') {
    return (
      <div className="notranslate w-full min-h-screen" dir="ltr" translate="no">
        <AdminLayout
          activeModule={adminModule}
          setActiveModule={setAdminModule}
          onExitAdmin={() => handleNavigate('home')}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          staffUsers={staffUsers}
        >
          <CMSModule
            activeModule={adminModule}
            cmsConfig={cmsConfig}
            setCmsConfig={setCmsConfig}
          />
        </AdminLayout>
      </div>
    );
  }

  // Otherwise render Public SPA Frontend
  return (
    <TranslationProvider language={language} setLanguage={setLanguage}>
      <div className={`min-h-screen transition-colors duration-200 ${
        theme === 'dark' ? 'bg-[#0A0A0A] text-slate-100 dark' : 'bg-slate-50 text-slate-900'
      } font-sans antialiased relative overflow-x-clip selection:bg-[var(--primary-color)] selection:text-white`}>

      <style>
        {`
          :root {
            --primary-color: ${cmsConfig?.global?.theme?.primaryColor || '#E01E37'};
            --font-family: ${cmsConfig?.global?.theme?.fontFamily || '"Inter", system-ui, -apple-system, sans-serif'};
            --button-radius: ${cmsConfig?.global?.theme?.buttonRadius || '9999px'};
          }
          body, .font-sans, .font-display, h1, h2, h3, h4, h5, h6 {
            font-family: var(--font-family) !important;
          }
          /* Apply Primary Color overrides to static Tailwind utility classes */
          .bg-\\[\\#E01E37\\] { background-color: var(--primary-color) !important; }
          .text-\\[\\#E01E37\\] { color: var(--primary-color) !important; }
          .border-\\[\\#E01E37\\] { border-color: var(--primary-color) !important; }
          .from-\\[\\#E01E37\\]\\/15 { --tw-gradient-from: var(--primary-color) var(--tw-gradient-from-position); }
          .to-\\[\\#E01E37\\]\\/5 { --tw-gradient-to: var(--primary-color) var(--tw-gradient-to-position); }
          
          /* Apply Button Radius */
          button, .rounded-full {
            border-radius: var(--button-radius) !important;
          }
        `}
      </style>
      
      {/* Dynamic Theme Glow Backgrounds */}
      <div className={`fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] rounded-full blur-[140px] pointer-events-none z-0 ${theme === 'dark' ? 'bg-[#E01E37]/10' : 'bg-[#E01E37]/[0.03]'}`} />
      <div className={`fixed bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none z-0 ${theme === 'dark' ? 'bg-[#E01E37]/5' : 'bg-[#E01E37]/[0.02]'}`} />
      <div className={`fixed top-1/2 left-0 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none z-0 ${theme === 'dark' ? 'bg-blue-500/5' : 'bg-blue-500/[0.02]'}`} />

      {/* Global Header Navigation */}
      <Navbar
        theme={theme}
        setTheme={setTheme}
        language={language}
        setLanguage={setLanguage}
        onOpenOverlayMenu={() => setIsOverlayMenuOpen(true)}
        onOpenCalculator={handleOpenCalculator}
        onNavigate={handleNavigate}
        activeView={activeView}
        cmsConfig={cmsConfig}
      />

      {/* Main Content Area */}
      <main className="relative z-10">
        {activeView === 'home' && (
          <Home
            onNavigate={handleNavigate}
            onOpenCalculator={handleOpenCalculator}
            cmsConfig={cmsConfig}
          />
        )}

        {activeView === 'service' && (
          <ServiceTemplate
            serviceId={selectedServiceId}
            onOpenCalculator={handleOpenCalculator}
            onNavigate={handleNavigate}
          />
        )}

        {activeView === 'about' && (
          <AboutPage
            onOpenCalculator={handleOpenCalculator}
            onNavigate={handleNavigate}
            cmsConfig={cmsConfig}
          />
        )}



        {activeView === 'privacy' && (
          <TermsPage cmsConfig={cmsConfig} />
        )}

        {activeView === 'pricing' && (
          <PricingPage
            onOpenCalculator={handleOpenCalculator}
            onNavigate={handleNavigate}
            cmsConfig={cmsConfig}
          />
        )}

        {activeView === 'checklist' && (
          <DocumentChecklistPage cmsConfig={cmsConfig} />
        )}

        {activeView === 'locations' && (
          <LocationsPage
            onOpenCalculator={handleOpenCalculator}
            cmsConfig={cmsConfig}
          />
        )}

        {(activeView === 'blog-index' || activeView === 'blog-post') && (
          <BlogSystem
            activePostId={activeView === 'blog-post' ? selectedPostId : null}
            onNavigatePost={(postId) => handleNavigate('blog-post', postId)}
            onBackToIndex={() => handleNavigate('blog-index')}
            onOpenCalculator={handleOpenCalculator}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenCalculator={handleOpenCalculator}
        cmsConfig={cmsConfig}
      />

      {/* Sticky Mobile Footer (50/50 split) */}
      <MobileFooter cmsConfig={cmsConfig} onOpenCalculator={handleOpenCalculator} />

      {/* Services Mega-Menu Modal */}
      <AnimatePresence>
        {isOverlayMenuOpen && (
          <ServicesMegaMenu
            isOpen={isOverlayMenuOpen}
            onClose={() => setIsOverlayMenuOpen(false)}
            onNavigate={handleNavigate}
            onOpenCalculator={handleOpenCalculator}
          />
        )}
      </AnimatePresence>

      {/* Global 3-Tab Pop-Up Calculator Modal */}
      <AnimatePresence>
        {isCalculatorOpen && (
          <CalculatorModal
            isOpen={isCalculatorOpen}
            onClose={() => setIsCalculatorOpen(false)}
            initialTab={calculatorTab}
          />
        )}
      </AnimatePresence>

      {/* Desktop Floating WhatsApp FAB (hidden on mobile, fixed bottom-6 right-6 on desktop) */}
      <DesktopWhatsAppFAB cmsConfig={cmsConfig} />

      {/* Mobile Floating Tools Menu FAB (flex on mobile, fixed bottom-6 right-6) */}
      <MobileToolsFAB
        onOpenCalculator={handleOpenCalculator}
        onNavigate={handleNavigate}
      />

    </div>
    </TranslationProvider>
  );
}
