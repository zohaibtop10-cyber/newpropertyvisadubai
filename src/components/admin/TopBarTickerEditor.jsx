import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { ref, onValue, set, push, remove, update } from 'firebase/database';
import { Plus, Trash2, Edit3, Check, X, Clock, CheckCircle2, Sparkles, RefreshCw } from 'lucide-react';
import { DEFAULT_TICKER_ITEMS, formatTickerTime } from '../../data/tickerData';

export default function TopBarTickerEditor() {
  const [tickerItems, setTickerItems] = useState(DEFAULT_TICKER_ITEMS);
  const [loading, setLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // New Item State
  const [newName, setNewName] = useState('');
  const [newAction, setNewAction] = useState('secured Golden Visa');
  const [newTimeValue, setNewTimeValue] = useState(3);
  const [newTimeUnit, setNewTimeUnit] = useState('days'); // 'days' | 'hours' | 'minutes'
  const [newTimeMode, setNewTimeMode] = useState('ago');   // 'ago' | 'left' | 'custom'
  const [newCustomTimeText, setNewCustomTimeText] = useState('');

  // Editing State
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editAction, setEditAction] = useState('');
  const [editTimeValue, setEditTimeValue] = useState(1);
  const [editTimeUnit, setEditTimeUnit] = useState('days');
  const [editTimeMode, setEditTimeMode] = useState('ago');
  const [editCustomTimeText, setEditCustomTimeText] = useState('');

  // Fetch items from Firebase
  useEffect(() => {
    const tickerRef = ref(db, 'topBarTicker');
    const unsubscribe = onValue(tickerRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const items = Object.entries(data).map(([key, val]) => ({
          id: key,
          ...val
        }));
        if (items.length > 0) {
          setTickerItems(items);
        } else {
          setTickerItems(DEFAULT_TICKER_ITEMS);
        }
      } else {
        // Fallback to default activity items if Firebase node is empty
        setTickerItems(DEFAULT_TICKER_ITEMS);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Save / Initialize Defaults to Firebase
  const handleSeedDefaults = () => {
    const tickerRef = ref(db, 'topBarTicker');
    const seedData = {};
    DEFAULT_TICKER_ITEMS.forEach((item) => {
      seedData[item.id] = item;
    });

    set(tickerRef, seedData)
      .then(() => {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      });
  };

  // Add Item to Firebase
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newName.trim() && !newAction.trim()) return;

    const tickerRef = ref(db, 'topBarTicker');
    const newItemRef = push(tickerRef);
    const itemData = {
      id: newItemRef.key,
      name: newName.trim() || 'Client',
      action: newAction.trim() || 'secured Visa',
      timeValue: Number(newTimeValue) || 1,
      timeUnit: newTimeUnit,
      timeMode: newTimeMode, // 'ago' or 'left'
      customTimeText: newCustomTimeText.trim(),
      isActive: true,
      createdAt: new Date().toISOString()
    };

    set(newItemRef, itemData)
      .then(() => {
        setNewName('');
        setNewAction('secured Golden Visa');
        setNewTimeValue(3);
        setNewTimeMode('ago');
        setNewCustomTimeText('');
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      })
      .catch((err) => console.error('Error saving ticker item:', err));
  };

  // Start Editing
  const handleStartEdit = (item) => {
    setEditingId(item.id);
    setEditName(item.name || '');
    setEditAction(item.action || item.message || '');
    setEditTimeValue(item.timeValue ?? 1);
    setEditTimeUnit(item.timeUnit || 'days');
    setEditTimeMode(item.timeMode || 'ago');
    setEditCustomTimeText(item.customTimeText || item.timeText || '');
  };

  // Save Edit
  const handleSaveEdit = (id) => {
    const itemRef = ref(db, `topBarTicker/${id}`);
    update(itemRef, {
      name: editName,
      action: editAction,
      timeValue: Number(editTimeValue) || 1,
      timeUnit: editTimeUnit,
      timeMode: editTimeMode,
      customTimeText: editCustomTimeText
    }).then(() => {
      setEditingId(null);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    });
  };

  // Toggle Active/Paused
  const handleToggleActive = (id, currentStatus) => {
    const itemRef = ref(db, `topBarTicker/${id}/isActive`);
    set(itemRef, currentStatus === false ? true : false);
  };

  // Delete Item
  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this activity bullet?')) {
      const itemRef = ref(db, `topBarTicker/${id}`);
      remove(itemRef);
    }
  };

  return (
    <div className="max-w-4xl space-y-8 animate-fadeIn">
      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-brand-gold/30 rounded-xl text-brand-goldLight text-sm font-bold flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Top bar activity bullets updated live on Firebase!</span>
        </div>
      )}

      {/* Main CMS Container */}
      <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
        
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-brand-gold/15 text-brand-gold">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-xl text-white">Top Bar Header Activity CMS</h2>
              <p className="text-slate-400 text-xs mt-0.5">Manage activity bullets shown above the navbar (Customer names, actions, "3 days ago" vs "3 days left").</p>
            </div>
          </div>

          <button
            onClick={handleSeedDefaults}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono font-bold text-brand-gold rounded-xl flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
            title="Publish Default Items to Firebase"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Initialize Firebase Data
          </button>
        </div>

        {/* Add New Activity Form */}
        <form onSubmit={handleAddItem} className="bg-brand-darkBg border border-slate-800 p-6 rounded-xl space-y-5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Plus className="w-4 h-4 text-brand-gold" /> Add New Activity Bullet
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Customer Name / Title</label>
              <input
                type="text"
                placeholder="e.g. Arjun Verma"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full bg-brand-surfaceLight border border-slate-700 rounded-xl p-3.5 text-white text-sm focus:outline-none focus:border-brand-gold font-bold"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Action / Visa Service</label>
              <input
                type="text"
                placeholder="e.g. secured Golden Visa"
                value={newAction}
                onChange={(e) => setNewAction(e.target.value)}
                className="w-full bg-brand-surfaceLight border border-slate-700 rounded-xl p-3.5 text-white text-sm focus:outline-none focus:border-brand-gold"
                required
              />
            </div>
          </div>

          {/* Time & Mode Controls: Ago vs Left */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-brand-surfaceLight/50 p-4 rounded-xl border border-slate-800">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Time Number</label>
              <input
                type="number"
                min="1"
                max="999"
                value={newTimeValue}
                onChange={(e) => setNewTimeValue(e.target.value)}
                className="w-full bg-brand-darkBg border border-slate-700 rounded-xl p-3 text-white text-sm font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Time Unit</label>
              <select
                value={newTimeUnit}
                onChange={(e) => setNewTimeUnit(e.target.value)}
                className="w-full bg-brand-darkBg border border-slate-700 rounded-xl p-3 text-white text-xs font-bold"
              >
                <option value="days">Days</option>
                <option value="hours">Hours</option>
                <option value="minutes">Minutes</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-gold mb-2">Time Display Mode</label>
              <div className="flex items-center gap-2 pt-1">
                <label className="flex items-center gap-1.5 text-xs text-white font-bold cursor-pointer bg-brand-darkBg px-3 py-2 rounded-lg border border-slate-700">
                  <input
                    type="radio"
                    name="timeMode"
                    value="ago"
                    checked={newTimeMode === 'ago'}
                    onChange={() => setNewTimeMode('ago')}
                    className="accent-brand-gold"
                  />
                  <span>"ago" (e.g. 3 days ago)</span>
                </label>

                <label className="flex items-center gap-1.5 text-xs text-white font-bold cursor-pointer bg-brand-darkBg px-3 py-2 rounded-lg border border-slate-700">
                  <input
                    type="radio"
                    name="timeMode"
                    value="left"
                    checked={newTimeMode === 'left'}
                    onChange={() => setNewTimeMode('left')}
                    className="accent-brand-gold"
                  />
                  <span>"left" (e.g. 3 days left)</span>
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gold-gradient text-black font-extrabold rounded-xl shadow-lg hover:scale-[1.01] transition-transform btn-shine-effect flex items-center justify-center gap-2 text-xs uppercase font-mono tracking-wider cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Activity Bullet to Ticker
          </button>
        </form>

        {/* Existing Bullets Queue */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Live Activity Bullets Queue ({tickerItems.length})</h3>
            <span className="text-xs text-brand-gold font-mono">✦ Glowing Diamond Stars Enabled</span>
          </div>

          {loading ? (
            <div className="text-slate-400 text-xs py-4">Loading ticker activity bullets...</div>
          ) : tickerItems.length === 0 ? (
            <div className="text-slate-400 text-xs py-6 text-center border border-dashed border-slate-800 rounded-xl">
              No activity bullets found. Click "Initialize Firebase Data" above to generate defaults.
            </div>
          ) : (
            <div className="space-y-3">
              {tickerItems.map((item) => {
                const isEditing = editingId === item.id;
                const formattedTime = formatTickerTime(item) || item.timeText || '';

                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                      item.isActive !== false
                        ? 'bg-brand-darkBg border-slate-800 text-white'
                        : 'bg-brand-darkBg/50 border-slate-900 text-slate-500 opacity-60'
                    }`}
                  >
                    {isEditing ? (
                      <div className="flex-1 space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] text-slate-400 font-mono">Customer Name</label>
                            <input
                              type="text"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="w-full bg-brand-surfaceLight border border-brand-gold rounded-lg p-2 text-xs text-white font-bold"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] text-slate-400 font-mono">Action / Visa</label>
                            <input
                              type="text"
                              value={editAction}
                              onChange={(e) => setEditAction(e.target.value)}
                              className="w-full bg-brand-surfaceLight border border-brand-gold rounded-lg p-2 text-xs text-white"
                            />
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 bg-brand-surfaceLight/60 p-3 rounded-lg border border-slate-800">
                          <div>
                            <label className="text-[10px] text-slate-400 font-mono block">Time Value</label>
                            <input
                              type="number"
                              min="1"
                              value={editTimeValue}
                              onChange={(e) => setEditTimeValue(e.target.value)}
                              className="w-20 bg-brand-darkBg border border-slate-700 rounded p-1.5 text-xs text-white font-mono"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] text-slate-400 font-mono block">Unit</label>
                            <select
                              value={editTimeUnit}
                              onChange={(e) => setEditTimeUnit(e.target.value)}
                              className="bg-brand-darkBg border border-slate-700 rounded p-1.5 text-xs text-white font-bold"
                            >
                              <option value="days">Days</option>
                              <option value="hours">Hours</option>
                              <option value="minutes">Minutes</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-[10px] text-brand-gold font-mono block">Mode</label>
                            <div className="flex items-center gap-3 pt-1">
                              <label className="flex items-center gap-1 text-xs text-white cursor-pointer">
                                <input
                                  type="radio"
                                  name={`editMode-${item.id}`}
                                  value="ago"
                                  checked={editTimeMode === 'ago'}
                                  onChange={() => setEditTimeMode('ago')}
                                  className="accent-brand-gold"
                                />
                                <span>"ago"</span>
                              </label>

                              <label className="flex items-center gap-1 text-xs text-white cursor-pointer">
                                <input
                                  type="radio"
                                  name={`editMode-${item.id}`}
                                  value="left"
                                  checked={editTimeMode === 'left'}
                                  onChange={() => setEditTimeMode('left')}
                                  className="accent-brand-gold"
                                />
                                <span>"left"</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <span className="text-[#D4AF37] font-bold text-sm">✦</span>
                        <div className="text-sm">
                          <strong className="font-bold text-[#D4AF37] mr-2">{item.name || 'Client'}</strong>
                          <span className="text-slate-200">{item.action || item.message}</span>
                          {formattedTime && (
                            <span className="text-slate-400 font-mono text-xs ml-2 border-l border-white/10 pl-2">
                              – {formattedTime}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2 shrink-0">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => handleSaveEdit(item.id)}
                            className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-colors cursor-pointer"
                            title="Save Changes"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                            title="Cancel"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleStartEdit(item)}
                            className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:border-brand-gold hover:text-brand-gold transition-colors cursor-pointer"
                            title="Edit Activity Bullet"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleToggleActive(item.id, item.isActive)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-colors ${
                              item.isActive !== false
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-slate-800 text-slate-400 border border-slate-700'
                            }`}
                          >
                            {item.isActive !== false ? 'Active' : 'Paused'}
                          </button>

                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                            title="Delete Activity Bullet"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
