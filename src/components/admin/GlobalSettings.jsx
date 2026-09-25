import React, { useState } from 'react';
import { Settings, Save, CheckCircle2, Phone, Clock, ShieldCheck, FileText } from 'lucide-react';
import { siteConfig } from '../../data/cmsData';

export default function GlobalSettings({ cmsConfig, setCmsConfig }) {
  const [phone, setPhone] = useState(cmsConfig?.global?.phone || siteConfig.phone || '+971 4 220 8899');
  const [whatsapp, setWhatsapp] = useState(cmsConfig?.global?.whatsappRaw || siteConfig.whatsappRaw || '971501234567');
  const [email, setEmail] = useState(cmsConfig?.global?.email || siteConfig.email || 'advisory@familyvisa.ae');
  const [address, setAddress] = useState(cmsConfig?.global?.address || siteConfig.address || 'Business Village, Deira, Dubai');
  const [hours, setHours] = useState(cmsConfig?.global?.officeHours || siteConfig.officeHours || 'Mon – Sat: 8:00 AM – 8:00 PM');
  const [accreditation, setAccreditation] = useState(cmsConfig?.global?.licenseNumber || '800 DOCS LLC SOC — Official Document Clearing Services');
  const [disclaimer, setDisclaimer] = useState(
    cmsConfig?.global?.footerDisclaimer || 'FamilyVisa.ae is an independent administrative consultancy operating under License 800 DOCS LLC SOC. We provide document preparation, typing, and concierge PRO services.'
  );

  // Social Media
  const [facebook, setFacebook] = useState(cmsConfig?.global?.social?.facebook || '');
  const [instagram, setInstagram] = useState(cmsConfig?.global?.social?.instagram || '');
  const [linkedin, setLinkedin] = useState(cmsConfig?.global?.social?.linkedin || '');

  // Nav Links
  const [navHome, setNavHome] = useState(cmsConfig?.global?.nav?.home || 'Home');
  const [navServices, setNavServices] = useState(cmsConfig?.global?.nav?.services || 'Services');
  const [navVisas, setNavVisas] = useState(cmsConfig?.global?.nav?.visas || 'Visas');
  const [navEmiratesId, setNavEmiratesId] = useState(cmsConfig?.global?.nav?.emiratesId || 'Emirates ID & Medical');
  const [navCorporate, setNavCorporate] = useState(cmsConfig?.global?.nav?.corporate || 'Corporate & Legal');
  const [navGuides, setNavGuides] = useState(cmsConfig?.global?.nav?.guides || 'Residency Guides');
  const [navAbout, setNavAbout] = useState(cmsConfig?.global?.nav?.about || 'About Us');
  const [navContact, setNavContact] = useState(cmsConfig?.global?.nav?.contact || 'Contact');

  // Theme & Branding
  const [primaryColor, setPrimaryColor] = useState(cmsConfig?.global?.theme?.primaryColor || '#E01E37');
  const [fontFamily, setFontFamily] = useState(cmsConfig?.global?.theme?.fontFamily || '"Inter", system-ui, -apple-system, sans-serif');
  const [buttonRadius, setButtonRadius] = useState(cmsConfig?.global?.theme?.buttonRadius || '9999px');

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    const updatedGlobal = {
      ...cmsConfig?.global,
      phone,
      whatsapp,
      whatsappRaw: whatsapp,
      email,
      address,
      officeHours: hours,
      licenseNumber: accreditation,
      footerDisclaimer: disclaimer,
      social: { facebook, instagram, linkedin },
      nav: { home: navHome, services: navServices, visas: navVisas, emiratesId: navEmiratesId, corporate: navCorporate, guides: navGuides, about: navAbout, contact: navContact },
      theme: { primaryColor, fontFamily, buttonRadius }
    };

    if (setCmsConfig) {
      setCmsConfig(prev => ({
        ...prev,
        global: updatedGlobal
      }));
    }

    if (typeof window !== 'undefined') {
      const currentConfig = cmsConfig || {};
      const newConfig = { ...currentConfig, global: updatedGlobal };
      localStorage.setItem('app_cms_config', JSON.stringify(newConfig));
    }

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  return (
    <div className="max-w-4xl space-y-8 animate-fadeIn">
      
      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-sm font-bold flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Global website settings published and saved to live site!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Theme & UI Branding Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
            <div className="p-3 rounded-2xl bg-fuchsia-500/15 text-fuchsia-500">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-xl text-white">Theme & UI Branding</h2>
              <p className="text-slate-400 text-xs mt-0.5">Control global aesthetics: colors, typography, and button styles</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Primary Brand Color</label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-14 h-14 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-4 text-white font-mono focus:outline-none focus:border-[#E01E37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Button Border Radius</label>
              <select
                value={buttonRadius}
                onChange={(e) => setButtonRadius(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white font-semibold focus:outline-none focus:border-[#E01E37] appearance-none"
              >
                <option value="0px">Sharp (0px)</option>
                <option value="0.375rem">Slightly Rounded (Sm)</option>
                <option value="0.75rem">Rounded (Md)</option>
                <option value="1rem">Highly Rounded (Lg)</option>
                <option value="9999px">Fully Rounded (Pill)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-2">Global Font Family</label>
              <input
                type="text"
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                placeholder='"Inter", system-ui, sans-serif'
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white font-mono focus:outline-none focus:border-[#E01E37]"
              />
              <p className="text-[10px] text-slate-500 mt-2">Example: "Inter", system-ui, -apple-system, sans-serif</p>
            </div>
          </div>
        </div>

        {/* Contact Info & Office Hours Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
            <div className="p-3 rounded-2xl bg-sky-500/15 text-sky-500">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-xl text-white">Contact & Operating Hours</h2>
              <p className="text-slate-400 text-xs mt-0.5">Edit phone numbers and operational hours shown across headers and footers</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Display Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-mono font-bold focus:outline-none focus:border-[#E01E37]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">WhatsApp Raw Number (with country code)</label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-emerald-400 font-mono font-bold focus:outline-none focus:border-[#E01E37]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Official Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-mono font-bold focus:outline-none focus:border-[#E01E37]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Physical Office Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-semibold focus:outline-none focus:border-[#E01E37]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-2">Office Operating Hours</label>
              <input
                type="text"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-semibold focus:outline-none focus:border-[#E01E37]"
              />
            </div>
          </div>
        </div>

        {/* Accreditation & Legal Disclaimer Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
            <div className="p-3 rounded-2xl bg-[#E01E37]/15 text-[#E01E37]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-xl text-white">Accreditation & Disclaimer</h2>
              <p className="text-slate-400 text-xs mt-0.5">Edit license accreditation badges and footer legal text</p>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Government Accreditation Badge Text</label>
              <input
                type="text"
                value={accreditation}
                onChange={(e) => setAccreditation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-semibold focus:outline-none focus:border-[#E01E37]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Footer Legal Disclaimer Copy</label>
              <textarea
                rows={3}
                value={disclaimer}
                onChange={(e) => setDisclaimer(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 text-xs leading-relaxed focus:outline-none focus:border-[#E01E37]"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
            <div className="p-3 rounded-2xl bg-indigo-500/15 text-indigo-500">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-xl text-white">Social Media Links</h2>
              <p className="text-slate-400 text-xs mt-0.5">Edit links to your social media profiles</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Facebook URL</label>
              <input type="text" value={facebook} onChange={(e) => setFacebook(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-semibold focus:outline-none focus:border-[#E01E37]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Instagram URL</label>
              <input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-semibold focus:outline-none focus:border-[#E01E37]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">LinkedIn URL</label>
              <input type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-semibold focus:outline-none focus:border-[#E01E37]" />
            </div>
          </div>
        </div>

        {/* Nav Links Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
            <div className="p-3 rounded-2xl bg-purple-500/15 text-purple-500">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-xl text-white">Navigation Links</h2>
              <p className="text-slate-400 text-xs mt-0.5">Edit the text labels for the main navigation menu</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Home Label</label>
              <input type="text" value={navHome} onChange={(e) => setNavHome(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-white font-semibold focus:outline-none focus:border-[#E01E37]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Services Label</label>
              <input type="text" value={navServices} onChange={(e) => setNavServices(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-white font-semibold focus:outline-none focus:border-[#E01E37]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Visas Label</label>
              <input type="text" value={navVisas} onChange={(e) => setNavVisas(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-white font-semibold focus:outline-none focus:border-[#E01E37]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Emirates ID Label</label>
              <input type="text" value={navEmiratesId} onChange={(e) => setNavEmiratesId(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-white font-semibold focus:outline-none focus:border-[#E01E37]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Corporate Label</label>
              <input type="text" value={navCorporate} onChange={(e) => setNavCorporate(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-white font-semibold focus:outline-none focus:border-[#E01E37]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Guides Label</label>
              <input type="text" value={navGuides} onChange={(e) => setNavGuides(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-white font-semibold focus:outline-none focus:border-[#E01E37]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">About Us Label</label>
              <input type="text" value={navAbout} onChange={(e) => setNavAbout(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-white font-semibold focus:outline-none focus:border-[#E01E37]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Contact Label</label>
              <input type="text" value={navContact} onChange={(e) => setNavContact(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-white font-semibold focus:outline-none focus:border-[#E01E37]" />
            </div>
          </div>
        </div>

        {/* Single Save Button */}
        <button
          type="submit"
          className="w-full py-4 bg-[#E01E37] hover:bg-[#B81A2C] text-white font-bold text-base rounded-2xl shadow-xl shadow-[#E01E37]/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
        >
          <Save className="w-5 h-5" />
          <span>Publish & Save Global Settings</span>
        </button>

      </form>

    </div>
  );
}
