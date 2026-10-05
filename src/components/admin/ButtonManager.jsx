import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, MousePointerClick, Plus, Trash2, ArrowUp, ArrowDown, Sparkles } from 'lucide-react';

export default function ButtonManager({ cmsConfig, setCmsConfig }) {
  const defaultButtons = [
    {
      id: 'btn-1',
      label: 'Services',
      link: '#services',
      bgColor: '#D4AF37',
      textColor: '#000000',
      icon: 'LayoutGrid',
      location: 'navbar'
    },
    {
      id: 'btn-2',
      label: 'Visa Calculator',
      link: 'calculator',
      bgColor: '#1E293B',
      textColor: '#FFFFFF',
      icon: 'Calculator',
      location: 'hero'
    },
    {
      id: 'btn-3',
      label: 'Talk to Us',
      link: 'whatsapp',
      bgColor: '#FFFFFF',
      textColor: '#000000',
      icon: 'Globe',
      location: 'all'
    }
  ];

  const initialButtons = (cmsConfig?.global?.buttons && cmsConfig.global.buttons.length >= 3) 
    ? cmsConfig.global.buttons 
    : defaultButtons;

  const [buttons, setButtons] = useState(initialButtons);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (cmsConfig?.global?.buttons && Array.isArray(cmsConfig.global.buttons)) {
      setButtons(cmsConfig.global.buttons);
    }
  }, [cmsConfig]);

  const handleAddButton = () => {
    const newBtn = {
      id: `btn-${Date.now()}`,
      label: 'New Button',
      link: '/contact',
      bgColor: '#1E293B',
      textColor: '#FFFFFF',
      icon: 'ArrowRight',
      location: 'navbar'
    };
    setButtons([...buttons, newBtn]);
  };

  const handleUpdate = (idx, field, value) => {
    const updated = [...buttons];
    updated[idx][field] = value;
    setButtons(updated);
  };

  const handleDelete = (id) => {
    setButtons(buttons.filter(b => b.id !== id));
  };

  const handleMove = (idx, direction) => {
    const updated = [...buttons];
    if (direction === 'up' && idx > 0) {
      const temp = updated[idx - 1];
      updated[idx - 1] = updated[idx];
      updated[idx] = temp;
    } else if (direction === 'down' && idx < updated.length - 1) {
      const temp = updated[idx + 1];
      updated[idx + 1] = updated[idx];
      updated[idx] = temp;
    }
    setButtons(updated);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (setCmsConfig) {
      setCmsConfig(prev => ({
        ...prev,
        global: {
          ...prev?.global,
          buttons: buttons
        }
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
              <span>Interactive UI Controls</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Global Action Buttons Manager
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
              Configure labels, background colors, and destination links for primary buttons.
            </p>
          </div>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Publish Buttons</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-semibold flex items-center gap-3 shadow-lg animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span>Navigation and action buttons updated live across the website!</span>
        </div>
      )}

      <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <MousePointerClick className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white">Configured Buttons ({buttons.length})</h2>
              <p className="text-slate-400 text-xs mt-0.5">Edit colors, labels, and target URLs</p>
            </div>
          </div>
          
          <button
            onClick={handleAddButton}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700/80 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-amber-400" /> Add Button
          </button>
        </div>

        <div className="space-y-4">
          {buttons.map((btn, idx) => (
            <div key={btn.id} className="p-5 bg-slate-950/80 border border-slate-800/80 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400">BUTTON #{idx + 1}</span>
                <div className="flex items-center gap-1.5">
                  <button type="button" disabled={idx === 0} onClick={() => handleMove(idx, 'up')} className={`p-1.5 rounded-lg border transition-colors ${idx === 0 ? 'border-slate-800/50 text-slate-700' : 'border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800'}`}><ArrowUp className="w-3.5 h-3.5" /></button>
                  <button type="button" disabled={idx === buttons.length - 1} onClick={() => handleMove(idx, 'down')} className={`p-1.5 rounded-lg border transition-colors ${idx === buttons.length - 1 ? 'border-slate-800/50 text-slate-700' : 'border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800'}`}><ArrowDown className="w-3.5 h-3.5" /></button>
                  <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDelete(btn.id); }} className="p-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer" title="Delete Button"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Button Text</label>
                  <input
                    type="text"
                    value={btn.label}
                    onChange={(e) => handleUpdate(idx, 'label', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700/60 rounded-xl px-4 py-3 text-white text-xs font-bold focus:outline-none focus:border-amber-500/50"
                    placeholder="e.g. Free Consultation"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Link Destination</label>
                  <input
                    type="text"
                    value={btn.link}
                    onChange={(e) => handleUpdate(idx, 'link', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700/60 rounded-xl px-4 py-3 text-slate-300 text-xs font-mono focus:outline-none focus:border-amber-500/50"
                    placeholder="URL or route (e.g. /contact, whatsapp)"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Background Color</label>
                  <div className="flex gap-2.5">
                    <input
                      type="color"
                      value={btn.bgColor || '#D4AF37'}
                      onChange={(e) => handleUpdate(idx, 'bgColor', e.target.value)}
                      className="w-11 h-11 rounded-xl cursor-pointer bg-slate-900 border border-slate-700/60 p-1"
                    />
                    <input
                      type="text"
                      value={btn.bgColor || '#D4AF37'}
                      onChange={(e) => handleUpdate(idx, 'bgColor', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700/60 rounded-xl px-4 text-white text-xs font-mono focus:outline-none focus:border-amber-500/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Text Color</label>
                  <div className="flex gap-2.5">
                    <input
                      type="color"
                      value={btn.textColor || '#FFFFFF'}
                      onChange={(e) => handleUpdate(idx, 'textColor', e.target.value)}
                      className="w-11 h-11 rounded-xl cursor-pointer bg-slate-900 border border-slate-700/60 p-1"
                    />
                    <input
                      type="text"
                      value={btn.textColor || '#FFFFFF'}
                      onChange={(e) => handleUpdate(idx, 'textColor', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700/60 rounded-xl px-4 text-white text-xs font-mono focus:outline-none focus:border-amber-500/50"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Display Location</label>
                  <select
                    value={btn.location || 'all'}
                    onChange={(e) => handleUpdate(idx, 'location', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700/60 rounded-xl px-4 py-3 text-white text-xs font-medium focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Locations</option>
                    <option value="navbar">Navbar Only</option>
                    <option value="hero">Hero Section</option>
                    <option value="footer">Footer</option>
                  </select>
                </div>
              </div>
            </div>
          ))}

          {buttons.length === 0 && (
            <div className="p-8 border border-dashed border-slate-800 rounded-xl text-center text-slate-400 text-xs">
              No buttons configured. Click "Add Button" to create one.
            </div>
          )}
        </div>

        {/* Floating Save Button */}
        <div className="pt-4 sticky bottom-4 z-20">
          <button
            onClick={handleSave}
            className="w-full py-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-base rounded-xl shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
          >
            <Save className="w-5 h-5" />
            <span>Publish Action Buttons</span>
          </button>
        </div>
      </div>
    </div>
  );
}
