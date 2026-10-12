import React, { useState, useEffect } from 'react';
import { 
  FileText, Save, CheckCircle2, Info, Phone, 
  MapPin, Shield, FileCheck, Building2, Sparkles
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

  useEffect(() => {
    if (cmsConfig?.pages) {
      if (cmsConfig.pages.contact) {
        if (cmsConfig.pages.contact.headline) setContactHeadline(cmsConfig.pages.contact.headline);
        if (cmsConfig.pages.contact.subtext) setContactSubtext(cmsConfig.pages.contact.subtext);
        if (cmsConfig.pages.contact.address) setContactAddress(cmsConfig.pages.contact.address);
        if (cmsConfig.pages.contact.phone) setContactPhone(cmsConfig.pages.contact.phone);
        if (cmsConfig.pages.contact.email) setContactEmail(cmsConfig.pages.contact.email);
        if (cmsConfig.pages.contact.hours) setContactHours(cmsConfig.pages.contact.hours);
        if (cmsConfig.pages.contact.contentMarkdown !== undefined) setContactMarkdown(cmsConfig.pages.contact.contentMarkdown);
      }
      if (cmsConfig.pages.checklist) {
        if (cmsConfig.pages.checklist.headline) setChecklistHeadline(cmsConfig.pages.checklist.headline);
        if (cmsConfig.pages.checklist.subtext) setChecklistSubtext(cmsConfig.pages.checklist.subtext);
        if (cmsConfig.pages.checklist.contentMarkdown !== undefined) setChecklistMarkdown(cmsConfig.pages.checklist.contentMarkdown);
      }
      if (cmsConfig.pages.locations) {
        if (cmsConfig.pages.locations.dubai) setDubaiOffice(cmsConfig.pages.locations.dubai);
        if (cmsConfig.pages.locations.abuDhabi) setAbuDhabiOffice(cmsConfig.pages.locations.abuDhabi);
        if (cmsConfig.pages.locations.contentMarkdown !== undefined) setLocationsMarkdown(cmsConfig.pages.locations.contentMarkdown);
      }
      if (cmsConfig.pages.terms) {
        if (cmsConfig.pages.terms.headline) setTermsHeadline(cmsConfig.pages.terms.headline);
        if (cmsConfig.pages.terms.body) setTermsBody(cmsConfig.pages.terms.body);
      }
      if (cmsConfig.pages.property) {
        if (cmsConfig.pages.property.headline) setPropertyHeadline(cmsConfig.pages.property.headline);
        if (cmsConfig.pages.property.subtext) setPropertySubtext(cmsConfig.pages.property.subtext);
        if (cmsConfig.pages.property.contentMarkdown !== undefined) setPropertyMarkdown(cmsConfig.pages.property.contentMarkdown);
      }
    }
  }, [cmsConfig]);

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
    <div className="max-w-5xl space-y-8 animate-fadeIn pb-16">
      
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-brand-darkSurface border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Secondary & Legal Pages CMS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Inner Pages CMS Manager
            </h1>
            <p className="text-text-muted text-xs sm:text-sm max-w-xl">
              Edit About, Contact, Checklist, Office Locations, Terms & Privacy, and Property Investor pages.
            </p>
          </div>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Publish Inner Pages</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-semibold flex items-center gap-3 shadow-lg animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span>Inner page CMS content published live!</span>
        </div>
      )}

      {/* Sub-Tab Navigation */}
      <div className="flex flex-wrap gap-2 bg-surface/80 backdrop-blur-xl border border-slate-800/80 p-2 rounded-2xl shadow-xl">
        {pagesList.map((p) => {
          const Icon = p.icon;
          const isActive = activeTab === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveTab(p.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all cursor-pointer ${
                isActive 
                  ? 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black font-bold shadow-lg shadow-amber-500/20' 
                  : 'text-text-muted hover:text-white hover:bg-surface/60'
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
          <div className="bg-surface/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <AboutPageEditor cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} isEmbedded={true} />
          </div>
        )}

        {/* TAB 2: CONTACT US PAGE */}
        {activeTab === 'contact' && (
          <div className="bg-surface/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3.5 border-b border-slate-800/80 pb-5">
              <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg text-white">Contact Page Details</h2>
                <p className="text-text-muted text-xs mt-0.5">Edit head office address, phone numbers, and working hours</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-2">Contact Page Headline</label>
                <input
                  type="text"
                  value={contactHeadline}
                  onChange={(e) => setContactHeadline(e.target.value)}
                  className="w-full bg-surface/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold text-base focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-2">Contact Subtext</label>
                <input
                  type="text"
                  value={contactSubtext}
                  onChange={(e) => setContactSubtext(e.target.value)}
                  className="w-full bg-surface/80 border border-slate-800 rounded-xl px-4 py-3 text-slate-300 text-xs focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-2">Physical Office Address</label>
                <input
                  type="text"
                  value={contactAddress}
                  onChange={(e) => setContactAddress(e.target.value)}
                  className="w-full bg-surface/80 border border-slate-800 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Direct Phone Number</label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full bg-surface/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-mono text-xs focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Support Email Address</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full bg-surface/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-mono text-xs focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-2">Working Hours</label>
                <input
                  type="text"
                  value={contactHours}
                  onChange={(e) => setContactHours(e.target.value)}
                  className="w-full bg-surface/80 border border-slate-800 rounded-xl px-4 py-3 text-slate-300 text-xs focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-2">Page Body Content (Markdown)</label>
                <textarea
                  rows={6}
                  placeholder="Optional: Add detailed Markdown content..."
                  value={contactMarkdown}
                  onChange={(e) => setContactMarkdown(e.target.value)}
                  className="w-full bg-surface/80 border border-slate-800 rounded-xl p-4 text-slate-300 text-xs font-mono leading-relaxed focus:outline-none focus:border-amber-500/50"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CHECKLIST PAGE */}
        {activeTab === 'checklist' && (
          <div className="bg-surface/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3.5 border-b border-slate-800/80 pb-5">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg text-white">Document Checklist Page</h2>
                <p className="text-text-muted text-xs mt-0.5">Edit title and document requirement guidelines</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Checklist Page Title</label>
                <input
                  type="text"
                  value={checklistHeadline}
                  onChange={(e) => setChecklistHeadline(e.target.value)}
                  className="w-full bg-surface/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold text-base focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Instructions Subtext</label>
                <textarea
                  rows={3}
                  value={checklistSubtext}
                  onChange={(e) => setChecklistSubtext(e.target.value)}
                  className="w-full bg-surface/80 border border-slate-800 rounded-xl p-4 text-slate-300 text-xs leading-relaxed focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Page Body Content (Markdown)</label>
                <textarea
                  rows={6}
                  placeholder="Optional: Add detailed Markdown content..."
                  value={checklistMarkdown}
                  onChange={(e) => setChecklistMarkdown(e.target.value)}
                  className="w-full bg-surface/80 border border-slate-800 rounded-xl p-4 text-slate-300 text-xs font-mono leading-relaxed focus:outline-none focus:border-amber-500/50"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: LOCATIONS PAGE */}
        {activeTab === 'locations' && (
          <div className="bg-surface/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3.5 border-b border-slate-800/80 pb-5">
              <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg text-white">Locations Page</h2>
                <p className="text-text-muted text-xs mt-0.5">Edit physical office locations across Dubai & Abu Dhabi</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Dubai Main HQ Address</label>
                <input
                  type="text"
                  value={dubaiOffice}
                  onChange={(e) => setDubaiOffice(e.target.value)}
                  className="w-full bg-surface/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-medium text-xs focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Abu Dhabi Branch Address</label>
                <input
                  type="text"
                  value={abudhabiOffice}
                  onChange={(e) => setAbuDhabiOffice(e.target.value)}
                  className="w-full bg-surface/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-medium text-xs focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Page Body Content (Markdown)</label>
                <textarea
                  rows={6}
                  placeholder="Optional: Add detailed Markdown content..."
                  value={locationsMarkdown}
                  onChange={(e) => setLocationsMarkdown(e.target.value)}
                  className="w-full bg-surface/80 border border-slate-800 rounded-xl p-4 text-slate-300 text-xs font-mono leading-relaxed focus:outline-none focus:border-amber-500/50"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: TERMS & PRIVACY */}
        {activeTab === 'terms' && (
          <div className="bg-surface/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3.5 border-b border-slate-800/80 pb-5">
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg text-white">Terms & Regulatory Page</h2>
                <p className="text-text-muted text-xs mt-0.5">Edit legal disclaimers and privacy policy copy</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Terms Page Title</label>
                <input
                  type="text"
                  value={termsHeadline}
                  onChange={(e) => setTermsHeadline(e.target.value)}
                  className="w-full bg-surface/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold text-base focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Terms & Regulatory Body Text</label>
                <textarea
                  rows={8}
                  value={termsBody}
                  onChange={(e) => setTermsBody(e.target.value)}
                  className="w-full bg-surface/80 border border-slate-800 rounded-xl p-4 text-slate-300 text-xs leading-relaxed focus:outline-none focus:border-amber-500/50"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: PROPERTY PAGE */}
        {activeTab === 'property' && (
          <div className="bg-surface/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3.5 border-b border-slate-800/80 pb-5">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg text-white">Property Investor Services Page</h2>
                <p className="text-text-muted text-xs mt-0.5">Edit headlines for real estate Golden Visa services</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Property Page Headline</label>
                <input
                  type="text"
                  value={propertyHeadline}
                  onChange={(e) => setPropertyHeadline(e.target.value)}
                  className="w-full bg-surface/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold text-base focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Property Subtext</label>
                <textarea
                  rows={3}
                  value={propertySubtext}
                  onChange={(e) => setPropertySubtext(e.target.value)}
                  className="w-full bg-surface/80 border border-slate-800 rounded-xl p-4 text-slate-300 text-xs leading-relaxed focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Page Body Content (Markdown)</label>
                <textarea
                  rows={6}
                  placeholder="Optional: Add detailed Markdown content..."
                  value={propertyMarkdown}
                  onChange={(e) => setPropertyMarkdown(e.target.value)}
                  className="w-full bg-surface/80 border border-slate-800 rounded-xl p-4 text-slate-300 text-xs font-mono leading-relaxed focus:outline-none focus:border-amber-500/50"
                />
              </div>
            </div>
          </div>
        )}

        {/* Floating Save Button */}
        <div className="pt-4 sticky bottom-4 z-20">
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-base rounded-xl shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
          >
            <Save className="w-5 h-5" />
            <span>Publish Inner Pages Changes</span>
          </button>
        </div>

      </form>
    </div>
  );
}
