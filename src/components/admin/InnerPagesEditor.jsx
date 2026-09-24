import React, { useState } from 'react';
import { 
  FileText, Save, CheckCircle2, Info, Phone, 
  MapPin, HelpCircle, Shield, FileCheck, Layers
} from 'lucide-react';

export default function InnerPagesEditor({ cmsConfig, setCmsConfig }) {
  const [activeTab, setActiveTab] = useState('about');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // About Page State
  const [aboutHeadline, setAboutHeadline] = useState(
    cmsConfig?.pages?.about?.headline || "We Are 800 DOCS LLC SOC"
  );
  const [aboutSubtext, setAboutSubtext] = useState(
    cmsConfig?.pages?.about?.subtext || "On your side, working on your behalf. Providing 100% online family residency documentation advisory across Dubai, Abu Dhabi, and the UAE."
  );
  const [aboutLicensedEntity, setAboutLicensedEntity] = useState(
    cmsConfig?.pages?.about?.licensedEntity || "Registered as 800 DOCS LLC SOC in Dubai, UAE under Commercial Registration for document clearing services."
  );

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

  // Pricing Page State
  const [pricingHeadline, setPricingHeadline] = useState(
    cmsConfig?.pages?.pricing?.headline || "Transparent Govt Tariffs & Advisory Pricing"
  );
  const [pricingSubtext, setPricingSubtext] = useState(
    cmsConfig?.pages?.pricing?.subtext || "No hidden typing fees. Government statutory charges billed at cost with an unbundled advisory retainer."
  );

  // Checklist Page State
  const [checklistHeadline, setChecklistHeadline] = useState(
    cmsConfig?.pages?.checklist?.headline || "Official GDRFA & ICP Required Documents Checklist"
  );
  const [checklistSubtext, setChecklistSubtext] = useState(
    cmsConfig?.pages?.checklist?.subtext || "Ensure your file passes government compliance audit on the first submission."
  );

  // Locations Page State
  const [dubaiOffice, setDubaiOffice] = useState(
    cmsConfig?.pages?.locations?.dubai || "Suite 402, Block B, Business Village, Deira, Dubai"
  );
  const [abudhabiOffice, setAbuDhabiOffice] = useState(
    cmsConfig?.pages?.locations?.abuDhabi || "Al Maqam Tower, ADGM Square, Maryah Island, Abu Dhabi"
  );

  // Terms & Privacy State
  const [termsHeadline, setTermsHeadline] = useState(
    cmsConfig?.pages?.terms?.headline || "Terms of Service & Regulatory Disclosures"
  );
  const [termsBody, setTermsBody] = useState(
    cmsConfig?.pages?.terms?.body || "FamilyVisa.ae is an independent document clearing consultancy operated by 800 DOCS LLC SOC..."
  );

  const handleSave = (e) => {
    e.preventDefault();
    const newPagesConfig = {
      about: { headline: aboutHeadline, subtext: aboutSubtext, licensedEntity: aboutLicensedEntity },
      contact: { headline: contactHeadline, subtext: contactSubtext, address: contactAddress, phone: contactPhone, email: contactEmail, hours: contactHours },
      pricing: { headline: pricingHeadline, subtext: pricingSubtext },
      checklist: { headline: checklistHeadline, subtext: checklistSubtext },
      locations: { dubai: dubaiOffice, abuDhabi: abudhabiOffice },
      terms: { headline: termsHeadline, body: termsBody }
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
      localStorage.setItem('app_cms_config', JSON.stringify(updatedConfig));
    }

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  const pagesList = [
    { id: 'about', label: 'About Us Page', icon: Info },
    { id: 'contact', label: 'Contact Us Page', icon: Phone },
    { id: 'pricing', label: 'Pricing Page', icon: Layers },
    { id: 'checklist', label: 'Document Checklist', icon: FileCheck },
    { id: 'locations', label: 'Locations Page', icon: MapPin },
    { id: 'terms', label: 'Terms & Privacy', icon: Shield }
  ];

  return (
    <div className="max-w-5xl space-y-8 animate-fadeIn">
      
      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-sm font-bold flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Inner page CMS content published! Live site updated seamlessly.</span>
        </div>
      )}

      {/* Sub-Tab Navigation for Inner Pages */}
      <div className="flex flex-wrap gap-2 bg-slate-900 border border-slate-800 p-2 rounded-2xl shadow-xl">
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
                  ? 'bg-[#E01E37] text-white shadow-md shadow-[#E01E37]/20' 
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
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="p-3 rounded-2xl bg-blue-500/15 text-blue-500">
                <Info className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">About Us Page Content</h2>
                <p className="text-slate-400 text-xs mt-0.5">Edit company overview, licensing, and brand mission</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Main Page Headline</label>
                <input
                  type="text"
                  value={aboutHeadline}
                  onChange={(e) => setAboutHeadline(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold text-sm focus:outline-none focus:border-[#E01E37]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Subheadline Description</label>
                <textarea
                  rows={3}
                  value={aboutSubtext}
                  onChange={(e) => setAboutSubtext(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 text-xs leading-relaxed focus:outline-none focus:border-[#E01E37]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Licensed Entity Disclosure Text</label>
                <textarea
                  rows={2}
                  value={aboutLicensedEntity}
                  onChange={(e) => setAboutLicensedEntity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 text-xs focus:outline-none focus:border-[#E01E37]"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CONTACT US PAGE */}
        {activeTab === 'contact' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="p-3 rounded-2xl bg-emerald-500/15 text-emerald-500">
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
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold text-sm focus:outline-none focus:border-[#E01E37]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-300 mb-2">Contact Subheadline</label>
                <input
                  type="text"
                  value={contactSubtext}
                  onChange={(e) => setContactSubtext(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 text-xs focus:outline-none focus:border-[#E01E37]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-300 mb-2">Physical Office Address</label>
                <input
                  type="text"
                  value={contactAddress}
                  onChange={(e) => setContactAddress(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 text-xs focus:outline-none focus:border-[#E01E37]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Direct Phone Number</label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-mono text-xs focus:outline-none focus:border-[#E01E37]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Support Email Address</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-mono text-xs focus:outline-none focus:border-[#E01E37]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-300 mb-2">Working Hours</label>
                <input
                  type="text"
                  value={contactHours}
                  onChange={(e) => setContactHours(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 text-xs focus:outline-none focus:border-[#E01E37]"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PRICING PAGE */}
        {activeTab === 'pricing' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="p-3 rounded-2xl bg-amber-500/15 text-amber-500">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">Pricing Page Content</h2>
                <p className="text-slate-400 text-xs mt-0.5">Edit headline and fee transparency text</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Pricing Headline</label>
                <input
                  type="text"
                  value={pricingHeadline}
                  onChange={(e) => setPricingHeadline(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold text-sm focus:outline-none focus:border-[#E01E37]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Pricing Subheadline / Disclaimer</label>
                <textarea
                  rows={3}
                  value={pricingSubtext}
                  onChange={(e) => setPricingSubtext(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 text-xs leading-relaxed focus:outline-none focus:border-[#E01E37]"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CHECKLIST PAGE */}
        {activeTab === 'checklist' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="p-3 rounded-2xl bg-purple-500/15 text-purple-500">
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
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold text-sm focus:outline-none focus:border-[#E01E37]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Instructions Subtext</label>
                <textarea
                  rows={3}
                  value={checklistSubtext}
                  onChange={(e) => setChecklistSubtext(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 text-xs leading-relaxed focus:outline-none focus:border-[#E01E37]"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: LOCATIONS PAGE */}
        {activeTab === 'locations' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="p-3 rounded-2xl bg-[#E01E37]/15 text-[#E01E37]">
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
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-semibold text-xs focus:outline-none focus:border-[#E01E37]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Abu Dhabi Branch Address</label>
                <input
                  type="text"
                  value={abudhabiOffice}
                  onChange={(e) => setAbuDhabiOffice(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-semibold text-xs focus:outline-none focus:border-[#E01E37]"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: TERMS & PRIVACY */}
        {activeTab === 'terms' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="p-3 rounded-2xl bg-cyan-500/15 text-cyan-500">
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
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold text-sm focus:outline-none focus:border-[#E01E37]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Terms & Legal Body Text</label>
                <textarea
                  rows={8}
                  value={termsBody}
                  onChange={(e) => setTermsBody(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 text-xs leading-relaxed focus:outline-none focus:border-[#E01E37]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <button
          type="submit"
          className="w-full py-4 bg-[#E01E37] hover:bg-[#B81A2C] text-white font-bold text-base rounded-2xl shadow-xl shadow-[#E01E37]/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
        >
          <Save className="w-5 h-5" />
          <span>Publish Inner Page Changes</span>
        </button>

      </form>

    </div>
  );
}
