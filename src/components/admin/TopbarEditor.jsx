import React, { useState } from 'react';
import { Layout, Save, CheckCircle2 } from 'lucide-react';

export default function TopbarEditor({ cmsConfig, setCmsConfig }) {
  const [enabled, setEnabled] = useState(cmsConfig?.topbar?.enabled ?? true);
  const [showLocation, setShowLocation] = useState(cmsConfig?.topbar?.showLocation ?? true);
  const [showHours, setShowHours] = useState(cmsConfig?.topbar?.showHours ?? true);
  const [showPhone, setShowPhone] = useState(cmsConfig?.topbar?.showPhone ?? true);
  const [badgeText, setBadgeText] = useState(cmsConfig?.topbar?.badgeText || 'Notice');
  const [announcementText, setAnnouncementText] = useState(cmsConfig?.topbar?.announcementText || 'Limited Time Offer on Golden Visas');
  const [targetDate, setTargetDate] = useState(cmsConfig?.topbar?.targetDate || '');

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    const topbarConfig = {
      enabled,
      showLocation,
      showHours,
      showPhone,
      badgeText,
      announcementText,
      targetDate
    };

    if (setCmsConfig) {
      setCmsConfig(prev => ({ ...prev, topbar: topbarConfig }));
    }

    if (typeof window !== 'undefined') {
      const currentConfig = cmsConfig || {};
      const updatedConfig = { ...currentConfig, topbar: topbarConfig };
    }

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  return (
    <div className="max-w-4xl space-y-8 animate-fadeIn">
      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-brand-gold/30 rounded-xl text-brand-goldLight text-sm font-bold flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Topbar settings published successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
          <div className="p-3 rounded-xl bg-blue-500/15 text-blue-500">
            <Layout className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-display font-extrabold text-xl text-white">Top Bar Header Manager</h2>
            <p className="text-slate-400 text-xs mt-0.5">Edit the header strip above the navigation menu.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <div className="sm:col-span-2 flex items-center justify-between bg-brand-darkBg p-4 rounded-xl border border-slate-800">
            <label className="font-bold text-white">Enable Topbar Header</label>
            <input 
              type="checkbox" 
              checked={enabled} 
              onChange={(e) => setEnabled(e.target.checked)} 
              className="w-5 h-5 accent-brand-gold" 
            />
          </div>
          
          <div className="flex items-center justify-between bg-brand-darkBg p-4 rounded-xl border border-slate-800">
            <label className="font-bold text-slate-300">Show Location (Dubai)</label>
            <input 
              type="checkbox" 
              checked={showLocation} 
              onChange={(e) => setShowLocation(e.target.checked)} 
              className="w-5 h-5 accent-brand-gold" 
            />
          </div>
          
          <div className="flex items-center justify-between bg-brand-darkBg p-4 rounded-xl border border-slate-800">
            <label className="font-bold text-slate-300">Show Office Hours</label>
            <input 
              type="checkbox" 
              checked={showHours} 
              onChange={(e) => setShowHours(e.target.checked)} 
              className="w-5 h-5 accent-brand-gold" 
            />
          </div>
          
          <div className="flex items-center justify-between bg-brand-darkBg p-4 rounded-xl border border-slate-800">
            <label className="font-bold text-slate-300">Show Contact Phone</label>
            <input 
              type="checkbox" 
              checked={showPhone} 
              onChange={(e) => setShowPhone(e.target.checked)} 
              className="w-5 h-5 accent-brand-gold" 
            />
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <div className="sm:col-span-2">
            <h3 className="font-bold text-lg text-white mb-4">Announcement & Countdown</h3>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">Badge Text</label>
            <input
              type="text"
              value={badgeText}
              onChange={(e) => setBadgeText(e.target.value)}
              className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-semibold focus:outline-none focus:border-brand-primary"
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">Target Date (For Countdown)</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-semibold focus:outline-none focus:border-brand-primary"
            />
          </div>
          
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-300 mb-2">Announcement / Offer Text</label>
            <input
              type="text"
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-semibold focus:outline-none focus:border-brand-primary"
            />
          </div>
        </div>

        <button type="submit" className="w-full py-4 bg-gold-gradient btn-shine-effect text-black font-extrabold rounded-xl shadow-xl hover:scale-[1.02] transition-transform">
          Publish Topbar Changes
        </button>
      </form>
    </div>
  );
}
