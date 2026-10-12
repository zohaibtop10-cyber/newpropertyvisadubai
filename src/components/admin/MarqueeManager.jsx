import React, { useState } from 'react';
import { Megaphone, Plus, Trash2, Save, CheckCircle2, Sparkles } from 'lucide-react';

export default function MarqueeManager({ cmsConfig, setCmsConfig }) {
  const [items, setItems] = useState(
    cmsConfig?.marqueeItems || [
      { id: 'mq-1', name: 'Markus S.', actionText: 'secured Golden Visa', timestamp: '2026-09-28T14:30' },
      { id: 'mq-2', name: 'Fatima A.', actionText: 'secured Family Visa', timestamp: '2026-09-28T11:00' },
      { id: 'mq-3', name: 'James W.', actionText: 'secured Property Investor Visa', timestamp: '2026-09-27T08:00' }
    ]
  );
  
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleAddItem = (e) => {
    e.preventDefault();
    const now = new Date();
    const formatted = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    setItems([...items, { id: `mq-${Date.now()}`, name: '', actionText: '', timestamp: formatted }]);
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleUpdateItem = (id, field, value) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (setCmsConfig) {
      setCmsConfig(prev => ({
        ...prev,
        marqueeItems: items
      }));
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="max-w-5xl space-y-8 animate-fadeIn pb-16">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-brand-darkSurface border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Marquee Announcement Feed</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Ticker Marquee Manager
            </h1>
            <p className="text-text-muted text-xs sm:text-sm max-w-xl">
              Manage client success ticker items displayed across site headers.
            </p>
          </div>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Ticker Items</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-semibold flex items-center gap-3 shadow-lg animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span>Ticker marquee items published live!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-surface/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Megaphone className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white">Active Ticker Items ({items.length})</h2>
              <p className="text-text-muted text-xs mt-0.5">Edit customer names, action text, and timestamps</p>
            </div>
          </div>
          
          <button
            type="button"
            onClick={handleAddItem}
            className="px-4 py-2.5 bg-surface hover:bg-surface text-white text-xs font-bold rounded-xl border border-slate-700/80 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-amber-400" /> Add Item
          </button>
        </div>

        {/* List of Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="p-4 bg-surface/80 border border-slate-800/80 rounded-xl flex flex-col md:flex-row gap-4 items-end md:items-center">
              
              <div className="flex-1 w-full space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-300">Client Name</label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleUpdateItem(item.id, 'name', e.target.value)}
                  placeholder="e.g. Isabella Garcia"
                  className="w-full bg-surface border border-slate-700/60 rounded-xl p-3 text-white text-xs font-bold focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div className="flex-1 w-full space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-300">Action Text</label>
                <input
                  type="text"
                  value={item.actionText}
                  onChange={(e) => handleUpdateItem(item.id, 'actionText', e.target.value)}
                  placeholder="e.g. secured Golden Visa"
                  className="w-full bg-surface border border-slate-700/60 rounded-xl p-3 text-white text-xs font-medium focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div className="flex-1 w-full space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-300">Timestamp</label>
                <input
                  type="datetime-local"
                  value={item.timestamp}
                  onChange={(e) => handleUpdateItem(item.id, 'timestamp', e.target.value)}
                  className="w-full bg-surface border border-slate-700/60 rounded-xl p-3 text-white text-xs font-mono focus:outline-none focus:border-amber-500/50 [color-scheme:dark]"
                />
              </div>

              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDeleteItem(item.id); }}
                className="p-3 text-text-muted hover:text-red-400 hover:bg-red-500/10 border border-slate-800 rounded-xl transition-colors shrink-0 mb-0.5 cursor-pointer"
                title="Delete Item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          
          {items.length === 0 && (
            <div className="text-center py-8 text-text-muted text-xs border border-dashed border-slate-800 rounded-xl">
              No ticker items found. Click "Add Item" to create one.
            </div>
          )}
        </div>

        {/* Floating Save Button */}
        <div className="pt-4 sticky bottom-4 z-20">
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-base rounded-xl shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
          >
            <Save className="w-5 h-5" />
            <span>Publish Marquee Ticker</span>
          </button>
        </div>
      </form>
    </div>
  );
}
