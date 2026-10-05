import React, { useState, useEffect } from 'react';
import { Layout, Save, CheckCircle2, Sparkles } from 'lucide-react';

export default function TopbarEditor({ cmsConfig, setCmsConfig }) {
  const [enabled, setEnabled] = useState(cmsConfig?.topbar?.enabled ?? true);
  const [showLocation, setShowLocation] = useState(cmsConfig?.topbar?.showLocation ?? true);
  const [showHours, setShowHours] = useState(cmsConfig?.topbar?.showHours ?? true);
  const [showPhone, setShowPhone] = useState(cmsConfig?.topbar?.showPhone ?? true);
  const [badgeText, setBadgeText] = useState(cmsConfig?.topbar?.badgeText || 'Notice');
  const [announcementText, setAnnouncementText] = useState(cmsConfig?.topbar?.announcementText || 'Limited Time Offer on Golden Visas');
  const [targetDate, setTargetDate] = useState(cmsConfig?.topbar?.targetDate || '');

  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (cmsConfig?.topbar) {
      if (cmsConfig.topbar.enabled !== undefined) setEnabled(cmsConfig.topbar.enabled);
      if (cmsConfig.topbar.showLocation !== undefined) setShowLocation(cmsConfig.topbar.showLocation);
      if (cmsConfig.topbar.showHours !== undefined) setShowHours(cmsConfig.topbar.showHours);
      if (cmsConfig.topbar.showPhone !== undefined) setShowPhone(cmsConfig.topbar.showPhone);
      if (cmsConfig.topbar.badgeText) setBadgeText(cmsConfig.topbar.badgeText);
      if (cmsConfig.topbar.announcementText) setAnnouncementText(cmsConfig.topbar.announcementText);
      if (cmsConfig.topbar.targetDate !== undefined) setTargetDate(cmsConfig.topbar.targetDate);
    }
  }, [cmsConfig]);

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

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  return (
    <div className="max-w-5xl space-y-8 animate-fadeIn pb-16">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-brand-darkSurface border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Header Strip Preferences</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Top Bar Header Manager
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
              Configure top bar visibility toggles, announcement badges, and countdown timers.
            </p>
          </div>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Publish Top Bar</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-semibold flex items-center gap-3 shadow-lg animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span>Top bar header settings published and synced live!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center gap-3.5 border-b border-slate-800/80 pb-5">
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Layout className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg text-white">Header Topbar Visibility</h2>
            <p className="text-slate-400 text-xs mt-0.5">Toggle visibility of topbar elements across desktop and mobile headers</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
          <div className="sm:col-span-2 flex items-center justify-between bg-slate-950/80 p-4 rounded-xl border border-slate-800/80">
            <label className="font-bold text-white text-xs">Enable Topbar Header Strip</label>
            <input 
              type="checkbox" 
              checked={enabled} 
              onChange={(e) => setEnabled(e.target.checked)} 
              className="w-5 h-5 accent-amber-500 cursor-pointer" 
            />
          </div>
          
          <div className="flex items-center justify-between bg-slate-950/80 p-4 rounded-xl border border-slate-800/80">
            <label className="font-semibold text-slate-300 text-xs">Show Location (Dubai HQ)</label>
            <input 
              type="checkbox" 
              checked={showLocation} 
              onChange={(e) => setShowLocation(e.target.checked)} 
              className="w-5 h-5 accent-amber-500 cursor-pointer" 
            />
          </div>
          
          <div className="flex items-center justify-between bg-slate-950/80 p-4 rounded-xl border border-slate-800/80">
            <label className="font-semibold text-slate-300 text-xs">Show Office Working Hours</label>
            <input 
              type="checkbox" 
              checked={showHours} 
              onChange={(e) => setShowHours(e.target.checked)} 
              className="w-5 h-5 accent-amber-500 cursor-pointer" 
            />
          </div>
          
          <div className="flex items-center justify-between bg-slate-950/80 p-4 rounded-xl border border-slate-800/80">
            <label className="font-semibold text-slate-300 text-xs">Show Contact Phone</label>
            <input 
              type="checkbox" 
              checked={showPhone} 
              onChange={(e) => setShowPhone(e.target.checked)} 
              className="w-5 h-5 accent-amber-500 cursor-pointer" 
            />
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
          <div className="sm:col-span-2">
            <h3 className="font-display font-bold text-base text-white">Announcement & Countdown Banner</h3>
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Badge Text</label>
            <input
              type="text"
              value={badgeText}
              onChange={(e) => setBadgeText(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold text-xs focus:outline-none focus:border-amber-500/50"
            />
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Target Date (For Countdown Timer)</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-mono text-xs focus:outline-none focus:border-amber-500/50"
            />
          </div>
          
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-2">Announcement / Offer Notice Text</label>
            <input
              type="text"
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-medium text-xs focus:outline-none focus:border-amber-500/50"
            />
          </div>
        </div>

        {/* Floating Save Button */}
        <div className="pt-4 sticky bottom-4 z-20">
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-base rounded-xl shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
          >
            <Save className="w-5 h-5" />
            <span>Publish Top Bar Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
}
