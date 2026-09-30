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
  
  const [homePageData, setHomePageData] = useState(null);

  useEffect(() => {
    try {
      const db = getDatabase();
      const docRef = ref(db, 'pages/home');
      onValue(docRef, (snapshot) => {
        if (snapshot.exists()) {
          setHomePageData(snapshot.val());
        } else {
          // Default schema if not exists
          setHomePageData({
            hero: {
              badgeText: "15,000+ Visas Processed",
              title: "Stress-Free UAE Family Visas",
              subtitle: "Bring your loved ones to the UAE with our end-to-end Family Visa services.",
              primaryButtonText: "Start Free Assessment",
              secondaryButtonText: "Calculate Fees"
            }
          });
        }
      });
    } catch (e) {
      console.error("Firebase fetch error", e);
    }
  }, []);

  const [cmsConfig, setCmsConfigState] = useState(INITIAL_CMS_CONFIG);

  // Fetch cmsConfig from Firebase on mount
  useEffect(() => {
    try {
      const db = getDatabase();
      const docRef = ref(db, 'cmsConfig');
      onValue(docRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const merged = { ...INITIAL_CMS_CONFIG, ...data };
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
        <AdminLogin 
          onLoginSuccess={() => setIsAuthenticated(true)} 
          onExitAdmin={() => handleNavigate('home')} 
        />
      );
    }

    return (
      <div className="notranslate w-full min-h-screen" dir="ltr" translate="no">
        <AdminLayout
          activeModule={adminModule}
          setActiveModule={setAdminModule}
          onExitAdmin={handleAdminExit}
          currentUser={firebaseUser}
          setCurrentUser={setCurrentUser}
          staffUsers={staffUsers}
        >
          
                {adminModule === 'pagesEditor' ? (
                  <UniversalFormBuilder collectionPath="pages/home" data={homePageData} />
                ) : (
                  <CMSModule
                    activeModule={adminModule}
                    cmsConfig={cmsConfig}
                    setCmsConfig={setCmsConfig}
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
            --button-radius: ${cmsConfig?.global?.theme?.buttonRadius || '12px'};
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
          
          /* Apply Button Radius */
          button {
            border-radius: var(--button-radius);
          }
          .rounded-full {
            border-radius: var(--button-radius) !important;
          }
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
        {activeView === 'home' && (
          <Home
            homePageData={homePageData}
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
            cmsConfig={cmsConfig}
          />
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

      {/* Global Scroll-to-Top FAB */}
      <BackToTopFAB />

    </div>
    </TranslationProvider>
  );
}
