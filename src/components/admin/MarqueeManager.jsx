import React, { useState } from 'react';
import { Megaphone, Plus, Trash2, Save, CheckCircle2 } from 'lucide-react';

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
    // format as YYYY-MM-DDThh:mm for datetime-local
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
    console.log("Saving Ticker Data:", items);

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
    <div className="max-w-5xl space-y-8 animate-fadeIn">
      {saveSuccess && (
        <div className="p-4 bg-brand-gold/10 border border-brand-gold/30 rounded-xl text-brand-gold text-sm font-bold flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Ticker Marquee updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-[#121417] border border-white/10 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-brand-gold/15 text-brand-gold">
              <Megaphone className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-xl text-brand-gold">Ticker Marquee Manager</h2>
              <p className="text-slate-400 text-xs mt-0.5">Manage the top scrolling notifications.</p>
            </div>
          </div>
          
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] hover:opacity-90 text-black px-6 py-2.5 rounded-lg font-bold text-sm transition-all shadow-md cursor-pointer"
          >
            {saveSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saveSuccess ? 'Saved' : 'Save Changes'}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Active Ticker Items</h3>
          <button
            type="button"
            onClick={handleAddItem}
            className="px-4 py-2 bg-surface/5 hover:bg-surface/10 border border-white/20 text-brand-gold text-xs font-bold rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>

        {/* List of Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="p-4 bg-black/40 border border-white/10 rounded-xl flex flex-col md:flex-row gap-4 items-end md:items-center">
              
              <div className="flex-1 w-full space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">Client Name</label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleUpdateItem(item.id, 'name', e.target.value)}
                  placeholder="e.g. Isabella Garcia"
                  className="w-full bg-transparent border border-white/20 rounded-lg p-3 text-white text-sm font-medium focus:outline-none focus:border-brand-gold transition-colors"
                />
              </div>

              <div className="flex-1 w-full space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">Action Text</label>
                <input
                  type="text"
                  value={item.actionText}
                  onChange={(e) => handleUpdateItem(item.id, 'actionText', e.target.value)}
                  placeholder="e.g. secured Golden Visa"
                  className="w-full bg-transparent border border-white/20 rounded-lg p-3 text-white text-sm font-medium focus:outline-none focus:border-brand-gold transition-colors"
                />
              </div>

              <div className="flex-1 w-full space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">Timestamp</label>
                <input
                  type="datetime-local"
                  value={item.timestamp}
                  onChange={(e) => handleUpdateItem(item.id, 'timestamp', e.target.value)}
                  className="w-full bg-transparent border border-white/20 rounded-lg p-3 text-white text-sm font-medium focus:outline-none focus:border-brand-gold transition-colors [color-scheme:dark]"
                />
              </div>

              <button
                type="button"
                onClick={() => handleDeleteItem(item.id)}
                className="p-3 text-content-muted hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors shrink-0 mb-0.5"
                title="Delete Item"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
          
          {items.length === 0 && (
            <div className="text-center py-8 text-content-muted text-sm border border-dashed border-white/20 rounded-xl">
              No ticker items found. Click "Add Item" to create one.
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
