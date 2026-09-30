import React, { useState } from 'react';
import { Settings, Save, CheckCircle2, Phone, Clock, ShieldCheck, FileText, MapPin } from 'lucide-react';
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

  // Locations
  const [dubaiOffice, setDubaiOffice] = useState(
    cmsConfig?.global?.locations?.dubai || "Suite 402, Block B, Business Village, Deira, Dubai"
  );
  const [abudhabiOffice, setAbuDhabiOffice] = useState(
    cmsConfig?.global?.locations?.abuDhabi || "Al Maqam Tower, ADGM Square, Maryah Island, Abu Dhabi"
  );

  // Social Media
  const [facebook, setFacebook] = useState(cmsConfig?.global?.social?.facebook || '');
  const [instagram, setInstagram] = useState(cmsConfig?.global?.social?.instagram || '');
  const [linkedin, setLinkedin] = useState(cmsConfig?.global?.social?.linkedin || '');
  const [twitter, setTwitter] = useState(cmsConfig?.global?.social?.twitter || '');
  const [youtube, setYoutube] = useState(cmsConfig?.global?.social?.youtube || '');
  const [tiktok, setTiktok] = useState(cmsConfig?.global?.social?.tiktok || '');
  const [pinterest, setPinterest] = useState(cmsConfig?.global?.social?.pinterest || '');
  const [telegram, setTelegram] = useState(cmsConfig?.global?.social?.telegram || '');

  // Branding & UI Elements
  const [logoIcon, setLogoIcon] = useState(cmsConfig?.global?.branding?.logoIcon || 'PV');
  const [logoSubtext, setLogoSubtext] = useState(cmsConfig?.global?.branding?.logoSubtext || 'DUBAI');
  const [brandTitle, setBrandTitle] = useState(cmsConfig?.global?.branding?.brandTitle || 'PropertyVisaDubai');
  const [brandSubtitle, setBrandSubtitle] = useState(cmsConfig?.global?.branding?.brandSubtitle || 'operated by brightlink');
  const [btnServices, setBtnServices] = useState(cmsConfig?.global?.branding?.btnServices || 'Services');
  const [btnCalculator, setBtnCalculator] = useState(cmsConfig?.global?.branding?.btnCalculator || 'Visa Calculator');
  const [btnTalk, setBtnTalk] = useState(cmsConfig?.global?.branding?.btnTalk || 'Talk to Us');

  // Dynamic Nav Links
  const defaultNavLinks = [
    { id: 'nav-1', label: 'Home', view: 'home', visible: true },
    { id: 'nav-2', label: 'Articles', view: 'blog-index', visible: true },
    { id: 'nav-3', label: 'About Us', view: 'about', visible: true }
  ];

  // Map over existing config to overwrite 'Property Support' to 'About Us' if it exists.
  const initialNavLinks = (cmsConfig?.navbarLinks || defaultNavLinks).map(link => 
    (link.label === 'Property Support') ? { ...link, label: 'About Us', view: 'about' } : link
  );

  const [navLinks, setNavLinks] = useState(initialNavLinks);

  // Theme & Branding
  const [primaryColor, setPrimaryColor] = useState(cmsConfig?.global?.theme?.primaryColor || '#D4AF37');
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
      locations: { dubai: dubaiOffice, abuDhabi: abudhabiOffice },
      social: { facebook, instagram, linkedin, twitter, youtube, tiktok, pinterest, telegram },
      branding: { logoIcon, logoSubtext, brandTitle, brandSubtitle, btnServices, btnCalculator, btnTalk },
      theme: { primaryColor, fontFamily, buttonRadius }
    };

    if (setCmsConfig) {
      setCmsConfig(prev => ({
        ...prev,
        global: updatedGlobal,
        navbarLinks: navLinks
      }));
    }

    if (typeof window !== 'undefined') {
      const currentConfig = cmsConfig || {};
      const newConfig = { ...currentConfig, global: updatedGlobal, navbarLinks: navLinks };
    }

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  return (
    <div className="max-w-4xl space-y-8 animate-fadeIn">
      
      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-brand-gold/30 rounded-xl text-brand-goldLight text-sm font-bold flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Global website settings published and saved to live site!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Theme & UI Branding Card */}
        <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
            <div className="p-3 rounded-xl bg-fuchsia-500/15 text-fuchsia-500">
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
                  className="w-14 h-14 bg-brand-darkBg border border-slate-800 rounded-xl cursor-pointer"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="flex-1 bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-mono focus:outline-none focus:border-brand-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Button Border Radius</label>
              <select
                value={buttonRadius}
                onChange={(e) => setButtonRadius(e.target.value)}
                className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-semibold focus:outline-none focus:border-brand-primary appearance-none"
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
                className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-mono focus:outline-none focus:border-brand-primary"
              />
              <p className="text-[10px] text-content-muted mt-2">Example: "Inter", system-ui, -apple-system, sans-serif</p>
            </div>
          </div>
        </div>

        {/* Contact Info & Office Hours Card */}
        <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
            <div className="p-3 rounded-xl bg-sky-500/15 text-sky-500">
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
                className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-mono font-bold focus:outline-none focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">WhatsApp Raw Number (with country code)</label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-brand-goldLight font-mono font-bold focus:outline-none focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Official Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-mono font-bold focus:outline-none focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Physical Office Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-semibold focus:outline-none focus:border-brand-primary"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-2">Office Operating Hours</label>
              <input
                type="text"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-semibold focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>
        </div>

        {/* Accreditation & Legal Disclaimer Card */}
        <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
            <div className="p-3 rounded-xl bg-brand-primary/15 text-brand-primary">
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
                className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-semibold focus:outline-none focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Footer Legal Disclaimer Copy</label>
              <textarea
                rows={3}
                value={disclaimer}
                onChange={(e) => setDisclaimer(e.target.value)}
                className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-slate-200 text-xs leading-relaxed focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>
        </div>

        {/* Locations Card */}
        <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
            <div className="p-3 rounded-xl bg-orange-500/15 text-orange-500">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-xl text-white">Office Locations</h2>
              <p className="text-slate-400 text-xs mt-0.5">Edit physical office locations across Dubai & Abu Dhabi</p>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Dubai Main HQ Address</label>
              <input
                type="text"
                value={dubaiOffice}
                onChange={(e) => setDubaiOffice(e.target.value)}
                className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-semibold focus:outline-none focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Abu Dhabi Branch Address</label>
              <input
                type="text"
                value={abudhabiOffice}
                onChange={(e) => setAbuDhabiOffice(e.target.value)}
                className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-semibold focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links Card */}
        <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
            <div className="p-3 rounded-xl bg-brand-gold/15 text-brand-gold">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-xl text-white">Social Media Links</h2>
              <p className="text-slate-400 text-xs mt-0.5">Edit links to your social media profiles</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Facebook URL</label>
              <input type="text" value={facebook} onChange={(e) => setFacebook(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-semibold focus:outline-none focus:border-brand-primary" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Instagram URL</label>
              <input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-semibold focus:outline-none focus:border-brand-primary" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">LinkedIn URL</label>
              <input type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-semibold focus:outline-none focus:border-brand-primary" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">X (Twitter) URL</label>
              <input type="text" value={twitter} onChange={(e) => setTwitter(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-semibold focus:outline-none focus:border-brand-primary" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">YouTube URL</label>
              <input type="text" value={youtube} onChange={(e) => setYoutube(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-semibold focus:outline-none focus:border-brand-primary" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">TikTok URL</label>
              <input type="text" value={tiktok} onChange={(e) => setTiktok(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-semibold focus:outline-none focus:border-brand-primary" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Pinterest URL</label>
              <input type="text" value={pinterest} onChange={(e) => setPinterest(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-semibold focus:outline-none focus:border-brand-primary" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Telegram URL</label>
              <input type="text" value={telegram} onChange={(e) => setTelegram(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-semibold focus:outline-none focus:border-brand-primary" />
            </div>
          </div>
        </div>

        {/* Logo & Branding Card */}
        <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
            <div className="p-3 rounded-xl bg-purple-500/15 text-purple-500">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-xl text-white">Logo & Navbar Branding</h2>
              <p className="text-slate-400 text-xs mt-0.5">Edit your logo texts and header action buttons</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Logo Icon Badge (Main Text)</label>
              <input type="text" value={logoIcon} onChange={(e) => setLogoIcon(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-3 text-white font-semibold focus:outline-none focus:border-brand-primary" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Logo Icon Subtext</label>
              <input type="text" value={logoSubtext} onChange={(e) => setLogoSubtext(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-3 text-white font-semibold focus:outline-none focus:border-brand-primary" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Brand Title (Main Name)</label>
              <input type="text" value={brandTitle} onChange={(e) => setBrandTitle(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-3 text-white font-semibold focus:outline-none focus:border-brand-primary" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Brand Subtitle</label>
              <input type="text" value={brandSubtitle} onChange={(e) => setBrandSubtitle(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-3 text-white font-semibold focus:outline-none focus:border-brand-primary" />
            </div>
            <div className="sm:col-span-2 mt-2 border-t border-slate-800 pt-4">
              <h3 className="text-sm font-bold text-slate-300 mb-3">Navbar Buttons</h3>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Services Button Label</label>
              <input type="text" value={btnServices} onChange={(e) => setBtnServices(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-3 text-white font-semibold focus:outline-none focus:border-brand-primary" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Calculator Button Label</label>
              <input type="text" value={btnCalculator} onChange={(e) => setBtnCalculator(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-3 text-white font-semibold focus:outline-none focus:border-brand-primary" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Talk to Us Button Label</label>
              <input type="text" value={btnTalk} onChange={(e) => setBtnTalk(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-3 text-white font-semibold focus:outline-none focus:border-brand-primary" />
            </div>
          </div>
        </div>

        {/* Nav Links Card */}
        <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
            <div className="p-3 rounded-xl bg-brand-gold/15 text-brand-gold">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-xl text-white">Dynamic Navigation Links</h2>
              <p className="text-slate-400 text-xs mt-0.5">Edit the exact labels and destinations for the main navigation menu</p>
            </div>
          </div>
          <div className="space-y-4">
            {navLinks.map((link, index) => (
              <div key={link.id} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-brand-darkBg/50 p-4 rounded-xl border border-slate-800">
                <div className="flex-1 w-full">
                  <label className="block text-xs font-bold text-slate-400 mb-1.5">Link Label</label>
                  <input 
                    type="text" 
                    value={link.label} 
                    onChange={(e) => {
                      const newLinks = [...navLinks];
                      newLinks[index].label = e.target.value;
                      setNavLinks(newLinks);
                    }} 
                    className="w-full bg-brand-darkBg border border-slate-700 rounded-lg p-2.5 text-white font-semibold focus:outline-none focus:border-brand-primary text-sm" 
                  />
                </div>
                <div className="flex-1 w-full">
                  <label className="block text-xs font-bold text-slate-400 mb-1.5">Navigation Destination (View)</label>
                  <select 
                    value={link.view} 
                    onChange={(e) => {
                      const newLinks = [...navLinks];
                      newLinks[index].view = e.target.value;
                      setNavLinks(newLinks);
                    }} 
                    className="w-full bg-brand-darkBg border border-slate-700 rounded-lg p-2.5 text-white font-semibold focus:outline-none focus:border-brand-primary text-sm"
                  >
                    <option value="home">Home Page</option>
                    <option value="about">About Us Page</option>
                    <option value="blog-index">Articles Page</option>
                    <option value="contact">Contact Us Page</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Single Save Button */}
        <button
          type="submit"
          className="w-full py-4 bg-gold-gradient btn-shine-effect text-black font-extrabold hover:brightness-110 font-bold text-base rounded-xl shadow-xl shadow-[#D4AF37]/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
        >
          <Save className="w-5 h-5" />
          <span>Publish & Save Global Settings</span>
        </button>

      </form>

    </div>
  );
}
