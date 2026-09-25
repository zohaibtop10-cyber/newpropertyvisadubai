import React, { useState } from 'react';
import { Megaphone, Plus, Trash2, Save, CheckCircle2, GripVertical } from 'lucide-react';

export default function MarqueeManager({ cmsConfig, setCmsConfig }) {
  const [items, setItems] = useState(
    cmsConfig?.marqueeItems || [
      { id: 'mq-1', text: 'Markus S. secured Golden Visa \u2013 2 hours ago' },
      { id: 'mq-2', text: 'Fatima A. secured Family Visa \u2013 5 hours ago' },
      { id: 'mq-3', text: 'James W. secured Property Investor Visa \u2013 12 hours ago' },
      { id: 'mq-4', text: 'Aisha K. secured Golden Visa \u2013 1 day ago' },
      { id: 'mq-5', text: 'David L. secured Dependent Visa \u2013 1 day ago' },
      { id: 'mq-6', text: 'Elena R. secured Golden Visa \u2013 2 days ago' },
      { id: 'mq-7', text: 'Omar T. secured Maid Visa \u2013 2 days ago' }
    ]
  );
  const [newItemText, setNewItemText] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    setItems([...items, { id: `mq-${Date.now()}`, text: newItemText.trim() }]);
    setNewItemText('');
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleUpdateItem = (id, newText) => {
    setItems(items.map(item => item.id === id ? { ...item, text: newText } : item));
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
    <div className="max-w-4xl space-y-8 animate-fadeIn">
      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-sm font-bold flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Top Header Marquee updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
          <div className="p-3 rounded-2xl bg-indigo-500/15 text-indigo-400">
            <Megaphone className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-display font-extrabold text-xl text-white">Top Header Ticker Manager</h2>
            <p className="text-slate-400 text-xs mt-0.5">Manage the scrolling announcements at the very top of the website.</p>
          </div>
        </div>

        {/* Add New Item */}
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
          <label className="text-xs font-mono font-bold text-slate-300 uppercase">ADD NEW TICKER ITEM</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              placeholder="e.g. John D. secured Golden Visa - 1 hour ago"
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-xs font-bold focus:outline-none focus:border-[#E01E37]"
            />
            <button
              type="button"
              onClick={handleAddItem}
              className="px-6 py-2.5 bg-slate-800 hover:bg-[#E01E37] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
        </div>

        {/* List of Items */}
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={item.id} className="p-3 bg-slate-950 border border-slate-800 rounded-2xl flex items-center gap-4 group">
              <GripVertical className="w-5 h-5 text-slate-600 cursor-move shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
              <input
                type="text"
                value={item.text}
                onChange={(e) => handleUpdateItem(item.id, e.target.value)}
                className="flex-1 bg-transparent border-none text-white text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-slate-700 rounded-lg px-2 py-1"
              />
              <button
                type="button"
                onClick={() => handleDeleteItem(item.id)}
                className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl transition-colors cursor-pointer shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {items.length === 0 && (
            <div className="p-8 text-center border-2 border-dashed border-slate-800 rounded-3xl text-slate-500 text-sm font-semibold">
              No ticker items found. The marquee will be hidden.
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-[#E01E37] hover:bg-[#B81A2C] text-white font-bold text-base rounded-2xl shadow-xl shadow-[#E01E37]/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
        >
          <Save className="w-5 h-5" />
          <span>Save Marquee Ticker</span>
        </button>
      </form>
    </div>
  );
}
