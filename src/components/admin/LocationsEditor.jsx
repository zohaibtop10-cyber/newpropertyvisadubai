import React, { useState } from 'react';
import { 
  Save, CheckCircle2, MapPin, Building2, 
  Plus, Trash2, ShieldCheck, Sparkles
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
    <div className="max-w-5xl space-y-8 animate-fadeIn pb-16">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-brand-darkSurface border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Government Hubs Directory</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Locations & Centres Directory
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
              Configure official GDRFA, ICP, DHA, and Amer center directory listings across the UAE.
            </p>
          </div>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Publish Locations</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-semibold flex items-center gap-3 shadow-lg animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span>Locations page directory successfully updated live!</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 p-2 rounded-2xl shadow-xl">
        {tabsList.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all cursor-pointer ${
                isActive 
                  ? 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black font-bold shadow-lg shadow-amber-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSave} className="space-y-8">

        {/* PAGE HEADER TAB */}
        {activeTab === 'header' && (
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3.5 border-b border-slate-800/80 pb-5">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400"><MapPin className="w-6 h-6" /></div>
              <div>
                <h2 className="font-display font-bold text-lg text-white">Locations Page Header</h2>
                <p className="text-slate-400 text-xs mt-0.5">Edit headline and description for government centres directory</p>
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Page Headline</label>
                <input type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold text-base focus:outline-none focus:border-amber-500/50" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Page Description</label>
                <textarea rows={3} value={subtext} onChange={(e) => setSubtext(e.target.value)} className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-slate-300 text-xs leading-relaxed focus:outline-none focus:border-amber-500/50" />
              </div>
            </div>
          </div>
        )}

        {/* LOCATIONS LIST TAB */}
        {activeTab === 'locations' && (
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3.5 border-b border-slate-800/80 pb-5">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400"><Building2 className="w-6 h-6" /></div>
              <div>
                <h2 className="font-display font-bold text-lg text-white">Government Service Centres ({locations.length})</h2>
                <p className="text-slate-400 text-xs mt-0.5">Add, edit, or remove GDRFA, ICP, DHA, and Amer centers</p>
              </div>
            </div>
            <div className="space-y-4">
              {locations.map((loc, idx) => (
                <div key={loc.id} className="p-5 bg-slate-950/80 border border-slate-800/80 rounded-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400">LOCATION #{idx + 1} — {loc.city}</span>
                    <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); removeLocation(idx); }} className="p-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer" title="Remove Location"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" value={loc.name} onChange={(e) => updateLocation(idx, 'name', e.target.value)} placeholder="Centre Name" className="bg-slate-900 border border-slate-700/60 rounded-xl px-4 py-2.5 text-white text-xs font-bold sm:col-span-2" />
                    <select value={loc.city} onChange={(e) => updateLocation(idx, 'city', e.target.value)} className="bg-slate-900 border border-slate-700/60 rounded-xl px-4 py-2.5 text-white text-xs cursor-pointer">
                      <option value="Dubai">Dubai</option>
                      <option value="Abu Dhabi">Abu Dhabi</option>
                      <option value="Sharjah">Sharjah</option>
                      <option value="Ajman">Ajman</option>
                    </select>
                    <select value={loc.category} onChange={(e) => updateLocation(idx, 'category', e.target.value)} className="bg-slate-900 border border-slate-700/60 rounded-xl px-4 py-2.5 text-white text-xs cursor-pointer">
                      <option value="Happiness Centre">Happiness Centre</option>
                      <option value="Medical Centre">Medical Centre</option>
                      <option value="Amer Centre">Amer Centre</option>
                    </select>
                    <input type="text" value={loc.authority} onChange={(e) => updateLocation(idx, 'authority', e.target.value)} placeholder="Authority" className="bg-slate-900 border border-slate-700/60 rounded-xl px-4 py-2.5 text-slate-300 text-xs" />
                    <input type="text" value={loc.address} onChange={(e) => updateLocation(idx, 'address', e.target.value)} placeholder="Full Address" className="bg-slate-900 border border-slate-700/60 rounded-xl px-4 py-2.5 text-slate-300 text-xs sm:col-span-2" />
                    <input type="text" value={loc.landmark} onChange={(e) => updateLocation(idx, 'landmark', e.target.value)} placeholder="Landmark" className="bg-slate-900 border border-slate-700/60 rounded-xl px-4 py-2.5 text-slate-400 text-xs" />
                    <input type="text" value={loc.hours} onChange={(e) => updateLocation(idx, 'hours', e.target.value)} placeholder="Working Hours" className="bg-slate-900 border border-slate-700/60 rounded-xl px-4 py-2.5 text-slate-300 text-xs" />
                    <input type="text" value={loc.phone} onChange={(e) => updateLocation(idx, 'phone', e.target.value)} placeholder="Phone" className="bg-slate-900 border border-slate-700/60 rounded-xl px-4 py-2.5 text-white font-mono text-xs" />
                    <div className="flex items-center gap-3 p-3 bg-slate-900 border border-slate-700/60 rounded-xl">
                      <label className="text-xs text-slate-300 font-semibold">VIP Fast-Track Escort Badge:</label>
                      <button type="button" onClick={() => updateLocation(idx, 'isVip', !loc.isVip)} className={`w-10 h-5 rounded-full p-0.5 transition-colors ${loc.isVip ? 'bg-amber-500' : 'bg-slate-700'}`}>
                        <div className={`w-4 h-4 bg-black rounded-full shadow transition-transform ${loc.isVip ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" onClick={addLocation} className="w-full py-3 rounded-xl border border-dashed border-slate-700 text-slate-400 font-semibold text-xs hover:border-amber-500/50 hover:text-amber-400 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                <Plus className="w-4 h-4" /> Add New Location
              </button>
            </div>
          </div>
        )}

        {/* VIP ESCORT CTA TAB */}
        {activeTab === 'cta' && (
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3.5 border-b border-slate-800/80 pb-5">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400"><ShieldCheck className="w-6 h-6" /></div>
              <div>
                <h2 className="font-display font-bold text-lg text-white">VIP PRO Concierge Escort Banner</h2>
                <p className="text-slate-400 text-xs mt-0.5">Edit escort service call-to-action details</p>
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">CTA Title</label>
                <input type="text" value={ctaTitle} onChange={(e) => setCtaTitle(e.target.value)} className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold text-base focus:outline-none focus:border-amber-500/50" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">CTA Description</label>
                <textarea rows={3} value={ctaDesc} onChange={(e) => setCtaDesc(e.target.value)} className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-slate-300 text-xs leading-relaxed focus:outline-none focus:border-amber-500/50" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Button Text</label>
                <input type="text" value={ctaBtn} onChange={(e) => setCtaBtn(e.target.value)} className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-semibold text-xs focus:outline-none focus:border-amber-500/50" />
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="pt-4 sticky bottom-4 z-20">
          <button type="submit" className="w-full py-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-base rounded-xl shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2.5 transition-all cursor-pointer">
            <Save className="w-5 h-5" />
            <span>Publish Locations Directory Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}
