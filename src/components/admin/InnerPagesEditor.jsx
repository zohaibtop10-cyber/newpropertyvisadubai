import React, { useState } from 'react';
import { 
  FileText, Save, CheckCircle2, Info, Phone, 
  MapPin, HelpCircle, Shield, FileCheck, Layers, Building2
} from 'lucide-react';
import AboutPageEditor from './AboutPageEditor';

export default function InnerPagesEditor({ cmsConfig, setCmsConfig }) {
  const [activeTab, setActiveTab] = useState('about');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Contact Page State
  const [contactHeadline, setContactHeadline] = useState(
    cmsConfig?.pages?.contact?.headline || "Get in Touch with Family Visa Specialists"
  );
  const [contactSubtext, setContactSubtext] = useState(
    cmsConfig?.pages?.contact?.subtext || "Connect directly on WhatsApp or visit our Dubai advisory desk at Business Village."
  );
  const [contactAddress, setContactAddress] = useState(
    cmsConfig?.pages?.contact?.address || "Suite 402, Block B, Business Village, Deira, Clock Tower Roundabout, Dubai, UAE"
  );
  const [contactPhone, setContactPhone] = useState(
    cmsConfig?.pages?.contact?.phone || "+971 4 220 8899"
  );
  const [contactEmail, setContactEmail] = useState(
    cmsConfig?.pages?.contact?.email || "advisory@familyvisa.ae"
  );
  const [contactHours, setContactHours] = useState(
    cmsConfig?.pages?.contact?.hours || "Mon - Sat: 8:00 AM - 7:00 PM (GST)"
  );
  const [contactMarkdown, setContactMarkdown] = useState(
    cmsConfig?.pages?.contact?.contentMarkdown || ""
  );

  // Checklist Page State
  const [checklistHeadline, setChecklistHeadline] = useState(
    cmsConfig?.pages?.checklist?.headline || "Official GDRFA & ICP Required Documents Checklist"
  );
  const [checklistSubtext, setChecklistSubtext] = useState(
    cmsConfig?.pages?.checklist?.subtext || "Ensure your file passes government compliance audit on the first submission."
  );
  const [checklistMarkdown, setChecklistMarkdown] = useState(
    cmsConfig?.pages?.checklist?.contentMarkdown || ""
  );

  // Locations Page State
  const [dubaiOffice, setDubaiOffice] = useState(
    cmsConfig?.pages?.locations?.dubai || "Suite 402, Block B, Business Village, Deira, Dubai"
  );
  const [abudhabiOffice, setAbuDhabiOffice] = useState(
    cmsConfig?.pages?.locations?.abuDhabi || "Al Maqam Tower, ADGM Square, Maryah Island, Abu Dhabi"
  );
  const [locationsMarkdown, setLocationsMarkdown] = useState(
    cmsConfig?.pages?.locations?.contentMarkdown || ""
  );

  // Terms & Privacy State
  const [termsHeadline, setTermsHeadline] = useState(
    cmsConfig?.pages?.terms?.headline || "Terms of Service & Regulatory Disclosures"
  );
  const [termsBody, setTermsBody] = useState(
    cmsConfig?.pages?.terms?.body || "FamilyVisa.ae is an independent document clearing consultancy operated by 800 DOCS LLC SOC..."
  );

  // Property Page State
  const [propertyHeadline, setPropertyHeadline] = useState(
    cmsConfig?.pages?.property?.headline || "Comprehensive Property Investor Services"
  );
  const [propertySubtext, setPropertySubtext] = useState(
    cmsConfig?.pages?.property?.subtext || "End-to-end management for property investors. From DLD registration to Golden Visa processing through real estate investment."
  );
  const [propertyMarkdown, setPropertyMarkdown] = useState(
    cmsConfig?.pages?.property?.contentMarkdown || ""
  );

  const handleSave = (e) => {
    e.preventDefault();
    const newPagesConfig = {
      about: { ...cmsConfig?.pages?.about },
      contact: { headline: contactHeadline, subtext: contactSubtext, address: contactAddress, phone: contactPhone, email: contactEmail, hours: contactHours, contentMarkdown: contactMarkdown },
      checklist: { headline: checklistHeadline, subtext: checklistSubtext, contentMarkdown: checklistMarkdown },
      locations: { dubai: dubaiOffice, abuDhabi: abudhabiOffice, contentMarkdown: locationsMarkdown },
      terms: { headline: termsHeadline, body: termsBody },
      property: { headline: propertyHeadline, subtext: propertySubtext, contentMarkdown: propertyMarkdown }
    };

    if (setCmsConfig) {
      setCmsConfig(prev => ({
        ...prev,
        pages: newPagesConfig
      }));
    }

    if (typeof window !== 'undefined') {
      const currentConfig = cmsConfig || {};
      const updatedConfig = { ...currentConfig, pages: newPagesConfig };
    }

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  const pagesList = [
    { id: 'about', label: 'About Us Page', icon: Info },
    { id: 'contact', label: 'Contact Us Page', icon: Phone },
    { id: 'checklist', label: 'Document Checklist', icon: FileCheck },
    { id: 'locations', label: 'Locations Page', icon: MapPin },
    { id: 'terms', label: 'Terms & Privacy', icon: Shield },
    { id: 'property', label: 'Property Page', icon: Building2 }
  ];

  return (
    <div className="max-w-5xl space-y-8 animate-fadeIn">
      
      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-brand-gold/30 rounded-xl text-brand-goldLight text-sm font-bold flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Inner page CMS content published! Live site updated seamlessly.</span>
        </div>
      )}

      {/* Sub-Tab Navigation for Inner Pages */}
      <div className="flex flex-wrap gap-2 bg-brand-surfaceLight border border-slate-800 p-2 rounded-xl shadow-xl">
        {pagesList.map((p) => {
          const Icon = p.icon;
          const isActive = activeTab === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveTab(p.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                isActive 
                  ? 'bg-brand-primary text-white shadow-md shadow-[#D4AF37]/20' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{p.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* TAB 1: ABOUT US PAGE */}
        {activeTab === 'about' && (
          <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5 mb-8">
              <div className="p-3 rounded-xl bg-brand-gold/15 text-brand-gold">
                <Info className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">About Us Page Content</h2>
                <p className="text-slate-400 text-xs mt-0.5">Edit company overview, licensing, and brand mission</p>
              </div>
            </div>

            <AboutPageEditor cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} isEmbedded={true} />
          </div>
        )}

        {/* TAB 2: CONTACT US PAGE */}
        {activeTab === 'contact' && (
          <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="p-3 rounded-xl bg-brand-gold/15 text-brand-gold">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">Contact Page Details</h2>
                <p className="text-slate-400 text-xs mt-0.5">Edit head office address, phone numbers, and working hours</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-300 mb-2">Contact Page Headline</label>
                <input
                  type="text"
                  value={contactHeadline}
                  onChange={(e) => setContactHeadline(e.target.value)}
                  className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-bold text-sm focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-300 mb-2">Contact Subheadline</label>
                <input
                  type="text"
                  value={contactSubtext}
                  onChange={(e) => setContactSubtext(e.target.value)}
                  className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-slate-200 text-xs focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-300 mb-2">Physical Office Address</label>
                <input
                  type="text"
                  value={contactAddress}
                  onChange={(e) => setContactAddress(e.target.value)}
                  className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-slate-200 text-xs focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Direct Phone Number</label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-mono text-xs focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Support Email Address</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-mono text-xs focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-300 mb-2">Working Hours</label>
                <input
                  type="text"
                  value={contactHours}
                  onChange={(e) => setContactHours(e.target.value)}
                  className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-slate-200 text-xs focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-300 mb-2">Page Body Content (Markdown)</label>
                <textarea
                  rows={6}
                  placeholder="Optional: Add detailed Markdown content here..."
                  value={contactMarkdown}
                  onChange={(e) => setContactMarkdown(e.target.value)}
                  className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-slate-200 text-xs font-mono leading-relaxed focus:outline-none focus:border-brand-primary"
                />
              </div>
            </div>
          </div>
        )}


        {/* TAB 4: CHECKLIST PAGE */}
        {activeTab === 'checklist' && (
          <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="p-3 rounded-xl bg-brand-gold/15 text-brand-gold">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">Document Checklist Page</h2>
                <p className="text-slate-400 text-xs mt-0.5">Edit title and document requirement guidelines</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Checklist Page Title</label>
                <input
                  type="text"
                  value={checklistHeadline}
                  onChange={(e) => setChecklistHeadline(e.target.value)}
                  className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-bold text-sm focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Instructions Subtext</label>
                <textarea
                  rows={3}
                  value={checklistSubtext}
                  onChange={(e) => setChecklistSubtext(e.target.value)}
                  className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-slate-200 text-xs leading-relaxed focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Page Body Content (Markdown)</label>
                <textarea
                  rows={6}
                  placeholder="Optional: Add detailed Markdown content here..."
                  value={checklistMarkdown}
                  onChange={(e) => setChecklistMarkdown(e.target.value)}
                  className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-slate-200 text-xs font-mono leading-relaxed focus:outline-none focus:border-brand-primary"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: LOCATIONS PAGE */}
        {activeTab === 'locations' && (
          <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="p-3 rounded-xl bg-brand-primary/15 text-brand-primary">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">Locations Page</h2>
                <p className="text-slate-400 text-xs mt-0.5">Edit physical office locations across Dubai & Abu Dhabi</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Dubai Main HQ Address</label>
                <input
                  type="text"
                  value={dubaiOffice}
                  onChange={(e) => setDubaiOffice(e.target.value)}
                  className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-semibold text-xs focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Abu Dhabi Branch Address</label>
                <input
                  type="text"
                  value={abudhabiOffice}
                  onChange={(e) => setAbuDhabiOffice(e.target.value)}
                  className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-semibold text-xs focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Page Body Content (Markdown)</label>
                <textarea
                  rows={6}
                  placeholder="Optional: Add detailed Markdown content here..."
                  value={locationsMarkdown}
                  onChange={(e) => setLocationsMarkdown(e.target.value)}
                  className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-slate-200 text-xs font-mono leading-relaxed focus:outline-none focus:border-brand-primary"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: TERMS & PRIVACY */}
        {activeTab === 'terms' && (
          <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="p-3 rounded-xl bg-brand-gold/15 text-brand-gold">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">Terms & Regulatory Page</h2>
                <p className="text-slate-400 text-xs mt-0.5">Edit legal disclaimers and privacy statement</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Terms Page Title</label>
                <input
                  type="text"
                  value={termsHeadline}
                  onChange={(e) => setTermsHeadline(e.target.value)}
                  className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-bold text-sm focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Terms & Legal Body Text</label>
                <textarea
                  rows={8}
                  value={termsBody}
                  onChange={(e) => setTermsBody(e.target.value)}
                  className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-slate-200 text-xs leading-relaxed focus:outline-none focus:border-brand-primary"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: PROPERTY PAGE */}
        {activeTab === 'property' && (
          <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="p-3 rounded-xl bg-brand-gold/15 text-brand-gold">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">Property Page Content</h2>
                <p className="text-slate-400 text-xs mt-0.5">Edit headline and description for real estate investor services</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Property Page Headline</label>
                <input
                  type="text"
                  value={propertyHeadline}
                  onChange={(e) => setPropertyHeadline(e.target.value)}
                  className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-bold text-sm focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Property Description Text</label>
                <textarea
                  rows={3}
                  value={propertySubtext}
                  onChange={(e) => setPropertySubtext(e.target.value)}
                  className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-slate-200 text-xs leading-relaxed focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Page Body Content (Markdown)</label>
                <textarea
                  rows={6}
                  placeholder="Optional: Add detailed Markdown content here..."
                  value={propertyMarkdown}
                  onChange={(e) => setPropertyMarkdown(e.target.value)}
                  className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-slate-200 text-xs font-mono leading-relaxed focus:outline-none focus:border-brand-primary"
                />
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <button
          type="submit"
          className="w-full py-4 bg-gold-gradient btn-shine-effect text-black font-extrabold hover:brightness-110 font-bold text-base rounded-xl shadow-xl shadow-[#D4AF37]/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
        >
          <Save className="w-5 h-5" />
          <span>Publish Inner Page Changes</span>
        </button>

      </form>

    </div>
  );
}
