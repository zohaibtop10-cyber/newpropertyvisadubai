import React, { useState } from 'react';
import { 
  Save, CheckCircle2, MapPin, Clock, Phone, Building2, 
  Plus, Trash2, ShieldCheck, Stethoscope
} from 'lucide-react';

export default function LocationsEditor({ cmsConfig, setCmsConfig }) {
  const [activeTab, setActiveTab] = useState('header');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Page header
  const [headline, setHeadline] = useState(cmsConfig?.locationsPage?.headline || "Customer Happiness & Medical Screening Hubs");
  const [subtext, setSubtext] = useState(cmsConfig?.locationsPage?.subtext || "Locate approved GDRFA, ICP, and Health Authority centres across Dubai, Abu Dhabi, and Sharjah for fingerprint biometrics and medical fitness tests.");

  // Locations list
  const [locations, setLocations] = useState(cmsConfig?.locationsPage?.locations || [
    { id: 'gdrfa-jafiliya', name: 'GDRFA Main Customer Happiness Centre - Al Jafiliya', city: 'Dubai', category: 'Happiness Centre', authority: 'GDRFA Dubai', address: 'Sheikh Rashid Road, Al Kifaf / Al Jafiliya, Dubai', landmark: 'Adjacent to Max Metro Station', hours: 'Mon – Thu: 7:30 AM – 3:30 PM | Fri: 7:30 AM – 12:00 PM', phone: '+971 800 5111', isVip: true },
    { id: 'dha-city', name: 'Smart Salem Executive Medical Screening Centre', city: 'Dubai', category: 'Medical Centre', authority: 'DHA Dubai', address: 'Building 10, City Walk Phase 2, Dubai', landmark: 'Near Coca-Cola Arena', hours: 'Mon – Fri: 7:00 AM – 10:00 PM', phone: '+971 4 270 2000', isVip: true },
    { id: 'amer-business-bay', name: 'Amer Center Executive - Business Bay', city: 'Dubai', category: 'Amer Centre', authority: 'GDRFA Strategic Partner', address: 'Bay Square 11, Ground Floor, Business Bay, Dubai', landmark: 'Opposite South Ridge Towers', hours: 'Mon – Sat: 8:00 AM – 8:00 PM', phone: '+971 4 456 7890', isVip: true },
    { id: 'icp-mushrif', name: 'ICP Customer Happiness Centre - Al Mushrif', city: 'Abu Dhabi', category: 'Happiness Centre', authority: 'ICP UAE', address: 'Al Saada Street, Al Mushrif, Abu Dhabi', landmark: 'Near Abu Dhabi Police HQ', hours: 'Mon – Thu: 7:30 AM – 3:30 PM', phone: '+971 600 522222', isVip: true }
  ]);

  // Concierge CTA section
  const [ctaTitle, setCtaTitle] = useState(cmsConfig?.locationsPage?.cta?.title || "Don't Want to Queue at Government Centres?");
  const [ctaDesc, setCtaDesc] = useState(cmsConfig?.locationsPage?.cta?.description || "Our licensed PROs greet you at the entrance, bypass standard lines, and guide your family step-by-step through biometrics and medical tests.");
  const [ctaBtn, setCtaBtn] = useState(cmsConfig?.locationsPage?.cta?.buttonText || "Book VIP Escort Package");

  const updateLocation = (idx, field, value) => {
    const updated = [...locations];
    updated[idx][field] = value;
    setLocations(updated);
  };

  const addLocation = () => {
    setLocations([...locations, {
      id: `loc-${Date.now()}`,
      name: 'New Location',
      city: 'Dubai',
      category: 'Happiness Centre',
      authority: 'Authority Name',
      address: 'Full address here',
      landmark: 'Nearby landmark',
      hours: 'Mon – Sat: 8:00 AM – 6:00 PM',
      phone: '+971 ...',
      isVip: false
    }]);
  };

  const removeLocation = (idx) => {
    const updated = [...locations];
    updated.splice(idx, 1);
    setLocations(updated);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const locationsPageConfig = {
      headline,
      subtext,
      locations,
      cta: { title: ctaTitle, description: ctaDesc, buttonText: ctaBtn }
    };

    if (setCmsConfig) {
      setCmsConfig(prev => ({ ...prev, locationsPage: locationsPageConfig }));
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  const tabsList = [
    { id: 'header', label: 'Page Header', icon: MapPin },
    { id: 'locations', label: 'Locations List', icon: Building2 },
    { id: 'cta', label: 'VIP Escort CTA', icon: ShieldCheck }
  ];

  return (
    <div className="max-w-5xl space-y-8 animate-fadeIn">
      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-brand-gold/30 rounded-xl text-brand-goldLight text-sm font-bold flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Locations page updated and published to Firebase!</span>
        </div>
      )}

      <div className="flex flex-wrap gap-2 bg-brand-surfaceLight border border-slate-800 p-2 rounded-xl shadow-xl">
        {tabsList.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button key={t.id} type="button" onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${isActive ? 'bg-brand-primary text-white shadow-md shadow-[#D4AF37]/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/80'}`}>
              <Icon className="w-4 h-4" /><span>{t.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSave} className="space-y-8">

        {/* PAGE HEADER */}
        {activeTab === 'header' && (
          <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="p-3 rounded-xl bg-brand-gold/15 text-brand-gold"><MapPin className="w-6 h-6" /></div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">Locations Page Header</h2>
                <p className="text-slate-400 text-xs mt-0.5">Edit the page headline and description</p>
              </div>
            </div>
            <div className="space-y-4">
              <div><label className="block text-xs font-bold text-slate-300 mb-2">Page Headline</label>
                <input type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-bold text-sm focus:outline-none focus:border-brand-primary" /></div>
              <div><label className="block text-xs font-bold text-slate-300 mb-2">Page Description</label>
                <textarea rows={3} value={subtext} onChange={(e) => setSubtext(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-slate-200 text-xs leading-relaxed focus:outline-none focus:border-brand-primary" /></div>
            </div>
          </div>
        )}

        {/* LOCATIONS LIST */}
        {activeTab === 'locations' && (
          <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="p-3 rounded-xl bg-brand-gold/15 text-brand-gold"><Building2 className="w-6 h-6" /></div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">Government Service Centres ({locations.length})</h2>
                <p className="text-slate-400 text-xs mt-0.5">Add, edit, or remove government locations</p>
              </div>
            </div>
            <div className="space-y-4">
              {locations.map((loc, idx) => (
                <div key={loc.id} className="p-5 bg-brand-darkBg border border-slate-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-brand-goldLight">LOCATION #{idx + 1} — {loc.city}</span>
                    <button type="button" onClick={() => removeLocation(idx)} className="p-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="text" value={loc.name} onChange={(e) => updateLocation(idx, 'name', e.target.value)} placeholder="Centre Name" className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-3 text-white text-xs font-bold sm:col-span-2" />
                    <select value={loc.city} onChange={(e) => updateLocation(idx, 'city', e.target.value)} className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-3 text-white text-xs appearance-none">
                      <option value="Dubai">Dubai</option>
                      <option value="Abu Dhabi">Abu Dhabi</option>
                      <option value="Sharjah">Sharjah</option>
                      <option value="Ajman">Ajman</option>
                    </select>
                    <select value={loc.category} onChange={(e) => updateLocation(idx, 'category', e.target.value)} className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-3 text-white text-xs appearance-none">
                      <option value="Happiness Centre">Happiness Centre</option>
                      <option value="Medical Centre">Medical Centre</option>
                      <option value="Amer Centre">Amer Centre</option>
                    </select>
                    <input type="text" value={loc.authority} onChange={(e) => updateLocation(idx, 'authority', e.target.value)} placeholder="Authority" className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-3 text-slate-300 text-xs" />
                    <input type="text" value={loc.address} onChange={(e) => updateLocation(idx, 'address', e.target.value)} placeholder="Full Address" className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-3 text-slate-300 text-xs sm:col-span-2" />
                    <input type="text" value={loc.landmark} onChange={(e) => updateLocation(idx, 'landmark', e.target.value)} placeholder="Landmark" className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-3 text-slate-400 text-xs" />
                    <input type="text" value={loc.hours} onChange={(e) => updateLocation(idx, 'hours', e.target.value)} placeholder="Working Hours" className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-3 text-slate-300 text-xs" />
                    <input type="text" value={loc.phone} onChange={(e) => updateLocation(idx, 'phone', e.target.value)} placeholder="Phone" className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-3 text-white font-mono text-xs" />
                    <div className="flex items-center gap-3 p-3 bg-brand-surfaceLight border border-slate-800 rounded-xl">
                      <label className="text-xs text-slate-400 font-bold">VIP Express:</label>
                      <button type="button" onClick={() => updateLocation(idx, 'isVip', !loc.isVip)} className={`w-10 h-5 rounded-full p-0.5 transition-colors ${loc.isVip ? 'bg-brand-primary' : 'bg-slate-700'}`}>
                        <div className={`w-4 h-4 bg-surface rounded-full shadow transition-transform ${loc.isVip ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" onClick={addLocation} className="w-full py-3 rounded-xl border-2 border-dashed border-slate-700 text-slate-400 font-bold text-xs hover:border-brand-primary hover:text-brand-primary transition-colors flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Add New Location
              </button>
            </div>
          </div>
        )}

        {/* VIP ESCORT CTA */}
        {activeTab === 'cta' && (
          <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="p-3 rounded-xl bg-brand-gold/15 text-brand-gold"><ShieldCheck className="w-6 h-6" /></div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">VIP PRO Concierge Escort Banner</h2>
                <p className="text-slate-400 text-xs mt-0.5">Edit the escort service call-to-action at bottom of page</p>
              </div>
            </div>
            <div className="space-y-4">
              <div><label className="block text-xs font-bold text-slate-300 mb-2">CTA Title</label>
                <input type="text" value={ctaTitle} onChange={(e) => setCtaTitle(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-bold text-sm" /></div>
              <div><label className="block text-xs font-bold text-slate-300 mb-2">CTA Description</label>
                <textarea rows={3} value={ctaDesc} onChange={(e) => setCtaDesc(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-slate-200 text-xs leading-relaxed" /></div>
              <div><label className="block text-xs font-bold text-slate-300 mb-2">Button Text</label>
                <input type="text" value={ctaBtn} onChange={(e) => setCtaBtn(e.target.value)} className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-bold text-xs" /></div>
            </div>
          </div>
        )}

        <button type="submit" className="w-full py-4 bg-gold-gradient btn-shine-effect text-black font-extrabold hover:brightness-110 text-base rounded-xl shadow-xl shadow-[#D4AF37]/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer">
          <Save className="w-5 h-5" /><span>Publish Locations Page Changes</span>
        </button>
      </form>
    </div>
  );
}
