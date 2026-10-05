import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Topbar from './components/Topbar';
import TopTicker from './components/TopTicker';
import ServicesMegaMenu from './components/ServicesMegaMenu';
import MobileFooter from './components/MobileFooter';
import CalculatorModal from './components/CalculatorModal';
import Home from './components/Home';
import ServiceTemplate from './components/ServiceTemplate';
import PropertyVisaPage from './pages/PropertyVisaPage';
import GoldenVisaPage from './pages/GoldenVisaPage';
import FamilyVisaPage from './pages/FamilyVisaPage';
import NewbornVisaPage from './pages/NewbornVisaPage';
import MaidVisaPage from './pages/MaidVisaPage';
import EmiratesIDPage from './pages/EmiratesIDPage';
import PROServicesPage from './pages/PROServicesPage';
import AmerCenterPage from './pages/AmerCenterPage';
import AttestationPage from './pages/AttestationPage';
import LegalTranslationPage from './pages/LegalTranslationPage';
import PowerOfAttorneyPage from './pages/PowerOfAttorneyPage';
import WillsPage from './pages/WillsPage';
import DLDTrusteePage from './pages/DLDTrusteePage';
import PropertyRevaluationPage from './pages/PropertyRevaluationPage';
import MedicalEIDPage from './pages/MedicalEIDPage';
import ILOEInsurancePage from './pages/ILOEInsurancePage';
import VisaValidityPage from './pages/VisaValidityPage';
import BlogSystem from './components/BlogSystem';
import AboutPage from './components/AboutPage';
import TermsPage from './components/TermsPage';
import DocumentChecklistPage from './components/DocumentChecklistPage';
import LocationsPage from './components/LocationsPage';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';
import DesktopWhatsAppFAB from './components/DesktopWhatsAppFAB';
import MobileToolsFAB from './components/MobileToolsFAB';
import BackToTopFAB from './components/BackToTopFAB';
import ErrorBoundary from './components/ErrorBoundary';

import BlockPageBuilder from './components/admin/BlockPageBuilder';

// Admin Suite Imports
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './components/admin/AdminLogin';
import CMSModule from './components/admin/CMSModule';
import UniversalFormBuilder from './components/admin/UniversalFormBuilder';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import './firebase';
import { TranslationProvider } from './context/TranslationContext';

import { 
  INITIAL_STAFF_USERS, INITIAL_CMS_CONFIG 
} from './data/adminState';

export default function App() {
  // Global Theme Mode (strictly 100% dark mode)
  const theme = 'dark';
  const setTheme = () => {};

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

  // Helper for initial URL route resolution
  const getInitialRoute = () => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname.toLowerCase();
      if (p === '/admin') return { view: 'admin', postId: null };
      if (p === '/articles' || p === '/blog' || p === '/articles/') return { view: 'blog-index', postId: null };
      if (p.startsWith('/articles/')) {
        const parts = p.split('/').filter(Boolean);
        if (parts[1]) return { view: 'blog-post', postId: parts[1] };
        return { view: 'blog-index', postId: null };
      }
    }
    return { view: 'home', postId: null };
  };

  const initialRoute = getInitialRoute();
  const [activeView, setActiveView] = useState(initialRoute.view);
  const [selectedServiceId, setSelectedServiceId] = useState('spouse-visa');
  const [selectedPostId, setSelectedPostId] = useState(initialRoute.postId);

  // Admin Module State ('homepage' | 'services' | 'testimonials' | 'settings')
  const [adminModule, setAdminModule] = useState('homepage');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [firebaseUser, setFirebaseUser] = useState(null);

  // Listen to Firebase Auth state changes for persistent login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setFirebaseUser(user);
      } else {
        setIsAuthenticated(false);
        setFirebaseUser(null);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Admin Data Stores with localStorage persistence
  const [staffUsers] = useState(INITIAL_STAFF_USERS);
  const [currentUser, setCurrentUser] = useState(INITIAL_STAFF_USERS[0]);
  
  const [homePageData, setHomePageData] = useState({
    hero: {
      badgeText: "15,000+ Visas Processed",
      title: "Bring your family to the UAE with 100% Guaranteed SLA Approval.",
      subtitle: "We prepare, submit, and track family residence visas, 10-Year Golden Visas, and Emirates ID applications so you deal with one consultant instead of five counters.",
      primaryButtonText: "Start Free Assessment",
      secondaryButtonText: "Calculate Fees"
    }
  });

  useEffect(() => {
    try {
      const db = getDatabase();
      const docRef = ref(db, 'pages/home');
      onValue(docRef, (snapshot) => {
        if (snapshot.exists()) {
          setHomePageData(snapshot.val());
        }
      });
    } catch (e) {
      console.error("Firebase fetch error", e);
    }
  }, []);

  const [cmsConfig, setCmsConfigState] = useState(INITIAL_CMS_CONFIG);

  // Helper to deeply merge website defaults with Firebase config
  const deepMerge = (target, source) => {
    if (!source) return target;
    if (!target) return source;
    const result = { ...target };
    Object.keys(source).forEach(key => {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = deepMerge(target[key] || {}, source[key]);
      } else if (source[key] !== undefined && source[key] !== null) {
        result[key] = source[key];
      }
    });
    return result;
  };

  // Fetch cmsConfig from Firebase on mount
  useEffect(() => {
    try {
      const db = getDatabase();
      const docRef = ref(db, 'cmsConfig');
      onValue(docRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          if (data?.global?.theme?.buttonRadius === '9999px') {
            data.global.theme.buttonRadius = '10px';
          }
          const merged = deepMerge(INITIAL_CMS_CONFIG, data);
          setCmsConfigState(merged);
        } else {
          // If no data exists yet in Firebase, populate it
          set(docRef, INITIAL_CMS_CONFIG);
        }
      });
    } catch (e) {
      console.error('Error loading cmsConfig from Firebase:', e);
    }
  }, []);

  // Sync cmsConfig changes to Firebase
  const setCmsConfig = (newConfigOrUpdater) => {
    let updatedConfig;
    if (typeof newConfigOrUpdater === 'function') {
      setCmsConfigState(prev => {
        updatedConfig = newConfigOrUpdater(prev);
        saveToFirebase(updatedConfig);
        return updatedConfig;
      });
    } else {
      updatedConfig = newConfigOrUpdater;
      setCmsConfigState(updatedConfig);
      saveToFirebase(updatedConfig);
    }
  };

  const saveToFirebase = (config) => {
    try {
      const db = getDatabase();
      const docRef = ref(db, 'cmsConfig');
      set(docRef, config);
    } catch (e) {
      console.error('Error saving cmsConfig to Firebase:', e);
    }
  };

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
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  // Sync URL Routes for /admin, /articles, /articles/:slug
  useEffect(() => {
    const syncRouteFromUrl = () => {
      const p = window.location.pathname.toLowerCase();
      if (p === '/admin') {
        setActiveView('admin');
      } else if (p === '/articles' || p === '/blog' || p === '/articles/') {
        setActiveView('blog-index');
        setSelectedPostId(null);
      } else if (p.startsWith('/articles/')) {
        const parts = p.split('/').filter(Boolean);
        if (parts[1]) {
          setSelectedPostId(parts[1]);
          setActiveView('blog-post');
        } else {
          setActiveView('blog-index');
        }
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
    } else if (view === 'blog-index') {
      if (window.location.pathname !== '/articles') {
        window.history.pushState(null, '', '/articles');
      }
    } else if (view === 'blog-post' && payload) {
      if (window.location.pathname !== `/articles/${payload}`) {
        window.history.pushState(null, '', `/articles/${payload}`);
      }
    } else if (view === 'home') {
      if (window.location.pathname !== '/') {
        window.history.pushState(null, '', '/');
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCalculator = (tab = 'spouse') => {
    setCalculatorTab(tab);
    setIsCalculatorOpen(true);
  };

  // Handle admin exit with Firebase sign out
  const handleAdminExit = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error('Sign out error:', e);
    }
    handleNavigate('home');
  };

  // Render Admin View if activeView === 'admin'
  if (activeView === 'admin') {
    // Show loading while checking auth state
    if (authLoading) {
      return (
        <div className="min-h-screen bg-[#0A0B0D] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <svg className="animate-spin w-8 h-8 text-[#D4AF37]" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-25" /><path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
            <span className="text-slate-400 text-sm font-mono">Verifying authentication...</span>
          </div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return (
        <div className="dark bg-[#0a0a0a] text-slate-100 min-h-screen">
          <AdminLogin 
            onLoginSuccess={() => setIsAuthenticated(true)} 
            onExitAdmin={() => handleNavigate('home')} 
          />
        </div>
      );
    }

    return (
      <div className="dark bg-[#0a0a0a] text-slate-100 notranslate w-full min-h-screen" dir="ltr" translate="no">
        <AdminLayout
          activeModule={adminModule}
          setActiveModule={setAdminModule}
          onExitAdmin={handleAdminExit}
          currentUser={firebaseUser}
          setCurrentUser={setCurrentUser}
          staffUsers={staffUsers}
        >
          
                {adminModule === 'blockBuilder' ? (
                  <BlockPageBuilder slug="home" />
                ) : adminModule === 'pagesEditor' ? (
                  <UniversalFormBuilder collectionPath="pages/home" data={homePageData} />
                ) : (
                  <CMSModule
                    activeModule={adminModule}
                    cmsConfig={cmsConfig}
                    setCmsConfig={setCmsConfig}
                    onNavigateModule={setAdminModule}
                  />
                )}
        </AdminLayout>
      </div>
    );
  }

  // Otherwise render Public SPA Frontend
  return (
    <TranslationProvider language={language} setLanguage={setLanguage}>
      <div className={`min-h-screen transition-colors duration-200 ${
        theme === 'dark' ? 'bg-brand-darkBg text-slate-100 dark' : 'bg-canvas text-content-primary'
      } font-sans antialiased relative overflow-x-clip selection:bg-[var(--primary-color)] selection:text-white`}>

      <style>
        {`
          :root {
            --primary-color: ${cmsConfig?.global?.theme?.primaryColor || '#D4AF37'};
            --font-family: ${cmsConfig?.global?.theme?.fontFamily || '"Inter", system-ui, -apple-system, sans-serif'};
            --button-radius: ${cmsConfig?.global?.theme?.buttonRadius && cmsConfig.global.theme.buttonRadius !== '9999px' ? cmsConfig.global.theme.buttonRadius : '10px'};
            --radius: 10px;
          }
          body, .font-sans, .font-display, h1, h2, h3, h4, h5, h6 {
            font-family: var(--font-family) !important;
          }
          /* Apply Primary Color overrides to static Tailwind utility classes */
          .bg-\\[\\#D4AF37\\] { background-color: var(--primary-color) !important; }
          .text-\\[\\#D4AF37\\] { color: var(--primary-color) !important; }
          .border-\\[\\#D4AF37\\] { border-color: var(--primary-color) !important; }
          .from-\\[\\#D4AF37\\]\\/15 { --tw-gradient-from: var(--primary-color) var(--tw-gradient-from-position); }
          .to-\\[\\#D4AF37\\]\\/5 { --tw-gradient-to: var(--primary-color) var(--tw-gradient-to-position); }
        `}
      </style>
      
      {/* Dynamic Theme Glow Backgrounds */}
      <div className={`fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] rounded-full blur-[140px] pointer-events-none z-0 ${theme === 'dark' ? 'bg-brand-primary/10' : 'bg-brand-primary/[0.03]'}`} />
      <div className={`fixed bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none z-0 ${theme === 'dark' ? 'bg-brand-primary/5' : 'bg-brand-primary/[0.02]'}`} />
      <div className={`fixed top-1/2 left-0 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none z-0 ${theme === 'dark' ? 'bg-brand-gold/5' : 'bg-brand-gold/[0.02]'}`} />

      {/* Global Header Navigation */}
      <TopTicker />
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
        <ErrorBoundary>
          {activeView === 'home' && (
            <Home
              homePageData={homePageData}
              onNavigate={handleNavigate}
              onOpenCalculator={handleOpenCalculator}
              cmsConfig={cmsConfig}
            />
          )}

          {activeView === 'service' && (
            selectedServiceId === 'property-visa' || selectedServiceId === 'property' ? (
              <PropertyVisaPage cmsConfig={cmsConfig} />
            ) : selectedServiceId === 'golden-visa' || selectedServiceId === 'golden' ? (
              <GoldenVisaPage cmsConfig={cmsConfig} />
            ) : selectedServiceId === 'family-visa' || selectedServiceId === 'spouse-visa' || selectedServiceId === 'child-visa' || selectedServiceId === 'parent-visa' ? (
              <FamilyVisaPage cmsConfig={cmsConfig} />
            ) : selectedServiceId === 'newborn-visa' || selectedServiceId === 'new-born' || selectedServiceId === 'new-born-visa' ? (
              <NewbornVisaPage cmsConfig={cmsConfig} />
            ) : selectedServiceId === 'maid-visa' || selectedServiceId === 'domestic-worker' || selectedServiceId === 'domestic-helper' ? (
              <MaidVisaPage cmsConfig={cmsConfig} />
            ) : selectedServiceId === 'emirates-id' || selectedServiceId === 'eid' || selectedServiceId === 'visa-medical-emirates-id-location' ? (
              <EmiratesIDPage cmsConfig={cmsConfig} />
            ) : selectedServiceId === 'pro-services' || selectedServiceId === 'pro' ? (
              <PROServicesPage cmsConfig={cmsConfig} />
            ) : selectedServiceId === 'amer-center' || selectedServiceId === 'amer' ? (
              <AmerCenterPage cmsConfig={cmsConfig} />
            ) : selectedServiceId === 'attestation' ? (
              <AttestationPage cmsConfig={cmsConfig} />
            ) : selectedServiceId === 'legal-translation' || selectedServiceId === 'translation' ? (
              <LegalTranslationPage cmsConfig={cmsConfig} />
            ) : selectedServiceId === 'poa' || selectedServiceId === 'power-of-attorney' ? (
              <PowerOfAttorneyPage cmsConfig={cmsConfig} />
            ) : selectedServiceId === 'wills-last-testament' || selectedServiceId === 'wills-testament' || selectedServiceId === 'wills' ? (
              <WillsPage cmsConfig={cmsConfig} />
            ) : selectedServiceId === 'dld-trustee-services' || selectedServiceId === 'dld-trustee' ? (
              <DLDTrusteePage cmsConfig={cmsConfig} />
            ) : selectedServiceId === 'property-revaluation' ? (
              <PropertyRevaluationPage cmsConfig={cmsConfig} />
            ) : selectedServiceId === 'medical-eid' ? (
              <MedicalEIDPage cmsConfig={cmsConfig} />
            ) : selectedServiceId === 'iloe' || selectedServiceId === 'iloe-insurance' ? (
              <ILOEInsurancePage cmsConfig={cmsConfig} />
            ) : selectedServiceId === 'visa-validity' || selectedServiceId === 'visa-checker' || selectedServiceId === 'check-visa-status-uae' ? (
              <VisaValidityPage cmsConfig={cmsConfig} />
            ) : (
              <ServiceTemplate
                serviceId={selectedServiceId}
                onOpenCalculator={handleOpenCalculator}
                onNavigate={handleNavigate}
                cmsConfig={cmsConfig}
              />
            )
          )}

          {activeView === 'about' && (
            <AboutPage
              onOpenCalculator={handleOpenCalculator}
              onNavigate={handleNavigate}
              cmsConfig={cmsConfig}
            />
          )}

          {activeView === 'contact' && (
            <ContactPage
              onOpenCalculator={handleOpenCalculator}
              cmsConfig={cmsConfig}
            />
          )}

          {activeView === 'privacy' && (
            <TermsPage cmsConfig={cmsConfig} />
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
              cmsConfig={cmsConfig}
              activePostId={activeView === 'blog-post' ? selectedPostId : null}
              onNavigatePost={(postId) => handleNavigate('blog-post', postId)}
              onBackToIndex={() => handleNavigate('blog-index')}
              onOpenCalculator={handleOpenCalculator}
            />
          )}
        </ErrorBoundary>
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
            cmsConfig={cmsConfig}
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
            cmsConfig={cmsConfig}
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

      {/* Global Scroll-to-Top FAB */}
      <BackToTopFAB />

    </div>
    </TranslationProvider>
  );
}
