import React, { useState } from 'react';
import { Settings, Save, CheckCircle2, Phone, ShieldCheck, FileText, MapPin, Sparkles, Sliders, Share2, Layers, Compass } from 'lucide-react';
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

  const initialNavLinks = (cmsConfig?.navbarLinks || defaultNavLinks).map(link => 
    (link.label === 'Property Support') ? { ...link, label: 'About Us', view: 'about' } : link
  );

  const [navLinks, setNavLinks] = useState(initialNavLinks);

  // Theme & Branding
  const [primaryColor, setPrimaryColor] = useState(cmsConfig?.global?.theme?.primaryColor || '#D4AF37');
  const [fontFamily, setFontFamily] = useState(cmsConfig?.global?.theme?.fontFamily || '"Inter", system-ui, -apple-system, sans-serif');
  const [buttonRadius, setButtonRadius] = useState(cmsConfig?.global?.theme?.buttonRadius && cmsConfig.global.theme.buttonRadius !== '9999px' ? cmsConfig.global.theme.buttonRadius : '10px');

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

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  return (
    <div className="max-w-5xl space-y-8 animate-fadeIn pb-16">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-brand-darkSurface border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>System-wide Preferences</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Global Site Settings
            </h1>
            <p className="text-slate-400 text-sm max-w-xl">
              Configure brand colors, contact channels, office locations, footer disclaimers, and top navbar destinations.
            </p>
          </div>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-sm rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all duration-200 flex items-center gap-2.5 shrink-0 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Publish Changes</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-semibold flex items-center gap-3 shadow-lg animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span>Global website settings successfully saved and synced across all pages!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Theme & UI Branding Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Sliders className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg text-white">Theme & UI Styling</h2>
                <p className="text-slate-400 text-xs mt-0.5">Control global brand palette, typography, and border radius</p>
              </div>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 px-2.5 py-1 rounded bg-slate-800/60 border border-slate-700/50">Theme Tokens</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Primary Accent Color</label>
              <div className="flex gap-3">
                <div className="relative">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-12 h-12 bg-slate-950 border border-slate-700/60 rounded-xl cursor-pointer p-1"
                  />
                </div>
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="flex-1 bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Button Border Radius</label>
              <select
                value={buttonRadius}
                onChange={(e) => setButtonRadius(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:border-amber-500/50 transition-colors appearance-none"
              >
                <option value="10px">Default Luxury Boxy (10px)</option>
                <option value="0px">Sharp Angles (0px)</option>
                <option value="0.375rem">Slightly Rounded (6px)</option>
                <option value="0.75rem">Smooth Curve (12px)</option>
                <option value="1rem">High Round (16px)</option>
                <option value="9999px">Full Pill (Rounded)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-2">Global Font Stack</label>
              <input
                type="text"
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                placeholder='"Inter", system-ui, sans-serif'
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-mono text-xs focus:outline-none focus:border-amber-500/50 transition-colors"
              />
              <p className="text-[11px] text-slate-400 mt-1.5">Default fallback: "Inter", system-ui, -apple-system, sans-serif</p>
            </div>
          </div>
        </div>

        {/* Contact Info & Office Hours Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3.5 border-b border-slate-800/80 pb-5">
            <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white">Contact & Operating Hours</h2>
              <p className="text-slate-400 text-xs mt-0.5">Edit phone numbers, WhatsApp routing, and office hours across site headers and footers</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Display Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-mono font-medium focus:outline-none focus:border-amber-500/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">WhatsApp Number (Direct International)</label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-emerald-400 font-mono font-medium focus:outline-none focus:border-amber-500/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Official Advisory Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-mono focus:outline-none focus:border-amber-500/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Primary Office Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-2">Working Hours Schedule</label>
              <input
                type="text"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Accreditation & Legal Disclaimer Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3.5 border-b border-slate-800/80 pb-5">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white">Legal & Government Accreditation</h2>
              <p className="text-slate-400 text-xs mt-0.5">Manage trade license accreditation badges and compliance footers</p>
            </div>
          </div>

          <div className="space-y-5 text-sm">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Official Accreditation Badge Text</label>
              <input
                type="text"
                value={accreditation}
                onChange={(e) => setAccreditation(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Footer Legal Disclaimer Notice</label>
              <textarea
                rows={3}
                value={disclaimer}
                onChange={(e) => setDisclaimer(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-slate-300 text-xs leading-relaxed focus:outline-none focus:border-amber-500/50 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Locations Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3.5 border-b border-slate-800/80 pb-5">
            <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white">Branch Office Locations</h2>
              <p className="text-slate-400 text-xs mt-0.5">Edit exact office suite addresses for Dubai HQ and Abu Dhabi branches</p>
            </div>
          </div>

          <div className="space-y-5 text-sm">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Dubai Main HQ Address</label>
              <input
                type="text"
                value={dubaiOffice}
                onChange={(e) => setDubaiOffice(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Abu Dhabi Financial Center Branch</label>
              <input
                type="text"
                value={abudhabiOffice}
                onChange={(e) => setAbuDhabiOffice(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3.5 border-b border-slate-800/80 pb-5">
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Share2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white">Social Media Channels</h2>
              <p className="text-slate-400 text-xs mt-0.5">Link official corporate social profiles across all platform footers</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 text-sm">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Facebook URL</label>
              <input type="text" value={facebook} onChange={(e) => setFacebook(e.target.value)} className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Instagram URL</label>
              <input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">LinkedIn URL</label>
              <input type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">X (Twitter) URL</label>
              <input type="text" value={twitter} onChange={(e) => setTwitter(e.target.value)} className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">YouTube Channel</label>
              <input type="text" value={youtube} onChange={(e) => setYoutube(e.target.value)} className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">TikTok Profile</label>
              <input type="text" value={tiktok} onChange={(e) => setTiktok(e.target.value)} className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Pinterest URL</label>
              <input type="text" value={pinterest} onChange={(e) => setPinterest(e.target.value)} className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Telegram Support Channel</label>
              <input type="text" value={telegram} onChange={(e) => setTelegram(e.target.value)} className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors" />
            </div>
          </div>
        </div>

        {/* Dynamic Nav Links Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3.5 border-b border-slate-800/80 pb-5">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white">Dynamic Header Navigation Links</h2>
              <p className="text-slate-400 text-xs mt-0.5">Customize main navigation bar titles and page target destinations</p>
            </div>
          </div>
          <div className="space-y-4">
            {navLinks.map((link, index) => (
              <div key={link.id} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                <div className="flex-1 w-full">
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Link Display Label</label>
                  <input 
                    type="text" 
                    value={link.label} 
                    onChange={(e) => {
                      const newLinks = [...navLinks];
                      newLinks[index].label = e.target.value;
                      setNavLinks(newLinks);
                    }} 
                    className="w-full bg-slate-900 border border-slate-700/60 rounded-lg px-3.5 py-2.5 text-white font-medium focus:outline-none focus:border-amber-500/50 text-sm" 
                  />
                </div>
                <div className="flex-1 w-full">
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Destination View</label>
                  <select 
                    value={link.view} 
                    onChange={(e) => {
                      const newLinks = [...navLinks];
                      newLinks[index].view = e.target.value;
                      setNavLinks(newLinks);
                    }} 
                    className="w-full bg-slate-900 border border-slate-700/60 rounded-lg px-3.5 py-2.5 text-white font-medium focus:outline-none focus:border-amber-500/50 text-sm"
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

        {/* Save Button Bar */}
        <div className="pt-4 sticky bottom-4 z-20">
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-base rounded-xl shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30 flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer"
          >
            <Save className="w-5 h-5" />
            <span>Save & Publish All Global Settings</span>
          </button>
        </div>

      </form>
    </div>
  );
}
