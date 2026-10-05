import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { ref, onValue, set, push, remove, update } from 'firebase/database';
import { Plus, Trash2, Edit3, Check, X, CheckCircle2, Sparkles, RefreshCw } from 'lucide-react';
import { DEFAULT_TICKER_ITEMS, formatTickerTime } from '../../data/tickerData';

export default function TopBarTickerEditor() {
  const [tickerItems, setTickerItems] = useState(DEFAULT_TICKER_ITEMS);
  const [loading, setLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // New Item State
  const [newName, setNewName] = useState('');
  const [newAction, setNewAction] = useState('secured Golden Visa');
  const [newTimeValue, setNewTimeValue] = useState(3);
  const [newTimeUnit, setNewTimeUnit] = useState('days');
  const [newTimeMode, setNewTimeMode] = useState('ago');
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
        setTickerItems(items);
      } else {
        setTickerItems(DEFAULT_TICKER_ITEMS);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

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
      timeMode: newTimeMode,
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

  const handleStartEdit = (item) => {
    setEditingId(item.id);
    setEditName(item.name || '');
    setEditAction(item.action || item.message || '');
    setEditTimeValue(item.timeValue ?? 1);
    setEditTimeUnit(item.timeUnit || 'days');
    setEditTimeMode(item.timeMode || 'ago');
    setEditCustomTimeText(item.customTimeText || item.timeText || '');
  };

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

  const handleToggleActive = (id, currentStatus) => {
    const itemRef = ref(db, `topBarTicker/${id}/isActive`);
    set(itemRef, currentStatus === false ? true : false);
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this activity item?')) {
      const itemRef = ref(db, `topBarTicker/${id}`);
      remove(itemRef);
    }
  };

  return (
    <div className="max-w-5xl space-y-8 animate-fadeIn pb-16">
      
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-brand-darkSurface border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-Time Ticker & Announcement Feed</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Top Bar Activity Ticker Manager
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
              Manage client activity notifications and live status feeds shown above the main navbar.
            </p>
          </div>
          <button
            onClick={handleSeedDefaults}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 font-mono text-xs font-bold rounded-xl border border-slate-700/80 flex items-center gap-2 transition-colors cursor-pointer shrink-0"
          >
            <RefreshCw className="w-4 h-4" /> Reset Defaults
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-semibold flex items-center gap-3 shadow-lg animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span>Top bar activity ticker updated live on Firebase!</span>
        </div>
      )}

      {/* Add New Activity Form */}
      <form onSubmit={handleAddItem} className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Plus className="w-4 h-4 text-amber-400" /> Add New Activity Bullet
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Customer Name / Title</label>
            <input
              type="text"
              placeholder="e.g. Arjun Verma"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold text-sm focus:outline-none focus:border-amber-500/50"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Action / Visa Service</label>
            <input
              type="text"
              placeholder="e.g. secured Golden Visa"
              value={newAction}
              onChange={(e) => setNewAction(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500/50"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800/80">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Time Number</label>
            <input
              type="number"
              min="1"
              max="999"
              value={newTimeValue}
              onChange={(e) => setNewTimeValue(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/60 rounded-xl p-3 text-white text-sm font-mono font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Time Unit</label>
            <select
              value={newTimeUnit}
              onChange={(e) => setNewTimeUnit(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/60 rounded-xl p-3 text-white text-xs font-bold cursor-pointer"
            >
              <option value="days">Days</option>
              <option value="hours">Hours</option>
              <option value="minutes">Minutes</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-amber-400 mb-2">Time Display Mode</label>
            <div className="flex items-center gap-2 pt-1">
              <label className="flex items-center gap-1.5 text-xs text-white font-semibold cursor-pointer bg-slate-900 px-3 py-2 rounded-lg border border-slate-700/60">
                <input
                  type="radio"
                  name="timeMode"
                  value="ago"
                  checked={newTimeMode === 'ago'}
                  onChange={() => setNewTimeMode('ago')}
                  className="accent-amber-500"
                />
                <span>"ago"</span>
              </label>

              <label className="flex items-center gap-1.5 text-xs text-white font-semibold cursor-pointer bg-slate-900 px-3 py-2 rounded-lg border border-slate-700/60">
                <input
                  type="radio"
                  name="timeMode"
                  value="left"
                  checked={newTimeMode === 'left'}
                  onChange={() => setNewTimeMode('left')}
                  className="accent-amber-500"
                />
                <span>"left"</span>
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Activity Bullet
        </button>
      </form>

      {/* Bullets Queue */}
      <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider">
            Live Activity Bullets ({tickerItems.length})
          </h3>
          <span className="text-xs font-mono text-amber-400">✦ Diamond Stars Enabled</span>
        </div>

        {loading ? (
          <div className="text-slate-400 text-xs py-4">Loading ticker activity bullets...</div>
        ) : tickerItems.length === 0 ? (
          <div className="text-slate-400 text-xs py-8 text-center border border-dashed border-slate-800 rounded-xl">
            No activity bullets found. Click "Reset Defaults" above to load default data.
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
                      ? 'bg-slate-950/80 border-slate-800/80 text-white'
                      : 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60'
                  }`}
                >
                  {isEditing ? (
                    <div className="flex-1 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] text-slate-400 font-medium">Customer Name</label>
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700/60 rounded-lg px-3 py-2 text-xs text-white font-bold"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] text-slate-400 font-medium">Action / Visa</label>
                          <input
                            type="text"
                            value={editAction}
                            onChange={(e) => setEditAction(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700/60 rounded-lg px-3 py-2 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 bg-slate-900 p-3 rounded-lg border border-slate-800">
                        <div>
                          <label className="text-[10px] text-slate-400 font-mono block">Time Value</label>
                          <input
                            type="number"
                            min="1"
                            value={editTimeValue}
                            onChange={(e) => setEditTimeValue(e.target.value)}
                            className="w-20 bg-slate-950 border border-slate-700/60 rounded p-1.5 text-xs text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-slate-400 font-mono block">Unit</label>
                          <select
                            value={editTimeUnit}
                            onChange={(e) => setEditTimeUnit(e.target.value)}
                            className="bg-slate-950 border border-slate-700/60 rounded p-1.5 text-xs text-white font-bold"
                          >
                            <option value="days">Days</option>
                            <option value="hours">Hours</option>
                            <option value="minutes">Minutes</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] text-amber-400 font-mono block">Mode</label>
                          <div className="flex items-center gap-3 pt-1">
                            <label className="flex items-center gap-1 text-xs text-white cursor-pointer">
                              <input
                                type="radio"
                                name={`editMode-${item.id}`}
                                value="ago"
                                checked={editTimeMode === 'ago'}
                                onChange={() => setEditTimeMode('ago')}
                                className="accent-amber-500"
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
                                className="accent-amber-500"
                              />
                              <span>"left"</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span className="text-amber-400 font-bold text-sm">✦</span>
                      <div className="text-sm">
                        <strong className="font-bold text-amber-400 mr-2">{item.name || 'Client'}</strong>
                        <span className="text-slate-200">{item.action || item.message}</span>
                        {formattedTime && (
                          <span className="text-slate-400 font-mono text-xs ml-2 border-l border-slate-800 pl-2">
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
                          className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-black transition-colors cursor-pointer"
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
                          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
                          title="Edit Bullet"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleToggleActive(item.id, item.isActive)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-colors ${
                            item.isActive !== false
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-slate-800 text-slate-400 border border-slate-700/60'
                          }`}
                        >
                          {item.isActive !== false ? 'Active' : 'Paused'}
                        </button>

                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDeleteItem(item.id); }}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                          title="Delete Bullet"
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
  );
}
