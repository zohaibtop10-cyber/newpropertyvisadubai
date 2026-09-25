import React, { useState } from 'react';
import { Save, CheckCircle2, MousePointerClick, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

export default function ButtonManager({ cmsConfig, setCmsConfig }) {
  const [buttons, setButtons] = useState(
    cmsConfig?.global?.buttons || [
      {
        id: 'btn-1',
        label: 'Talk to us',
        link: 'whatsapp',
        bgColor: '#E01E37',
        textColor: '#FFFFFF',
        icon: 'Phone'
      }
    ]
  );
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleAddButton = () => {
    const newBtn = {
      id: `btn-${Date.now()}`,
      label: 'New Button',
      link: '/contact',
      bgColor: '#1E293B',
      textColor: '#FFFFFF',
      icon: 'ArrowRight'
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

    if (typeof window !== 'undefined') {
      const currentConfig = cmsConfig || {};
      const newConfig = {
        ...currentConfig,
        global: {
          ...currentConfig.global,
          buttons: buttons
        }
      };
      localStorage.setItem('app_cms_config', JSON.stringify(newConfig));
    }

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-8 animate-fadeIn">
      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-sm font-bold flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Navigation buttons published to live website!</span>
        </div>
      )}

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-500/15 text-indigo-500">
              <MousePointerClick className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-xl text-white">Global Buttons CMS</h2>
              <p className="text-slate-400 text-xs mt-0.5">Manage action buttons in the Navbar and across the site.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleAddButton}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Button
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2.5 bg-[#E01E37] hover:bg-[#B81A2C] text-white text-xs font-bold rounded-xl shadow-lg shadow-[#E01E37]/30 flex items-center gap-2 transition-all"
            >
              <Save className="w-4 h-4" /> Publish
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {buttons.map((btn, idx) => (
            <div key={btn.id} className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-4 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#E01E37]">BUTTON #{idx + 1}</span>
                <div className="flex items-center gap-1.5">
                  <button type="button" disabled={idx === 0} onClick={() => handleMove(idx, 'up')} className={`p-1.5 rounded-lg border transition-colors ${idx === 0 ? 'border-slate-800 text-slate-600' : 'border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800'}`}><ArrowUp className="w-3.5 h-3.5" /></button>
                  <button type="button" disabled={idx === buttons.length - 1} onClick={() => handleMove(idx, 'down')} className={`p-1.5 rounded-lg border transition-colors ${idx === buttons.length - 1 ? 'border-slate-800 text-slate-600' : 'border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800'}`}><ArrowDown className="w-3.5 h-3.5" /></button>
                  <button type="button" onClick={() => handleDelete(btn.id)} className="p-1.5 rounded-lg border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Button Text</label>
                  <input
                    type="text"
                    value={btn.label}
                    onChange={(e) => handleUpdate(idx, 'label', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-xs font-bold focus:outline-none focus:border-[#E01E37]"
                    placeholder="e.g. Free Consultation"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Link Destination</label>
                  <input
                    type="text"
                    value={btn.link}
                    onChange={(e) => handleUpdate(idx, 'link', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 text-xs font-mono focus:outline-none focus:border-[#E01E37]"
                    placeholder="URL or route (e.g. /contact, whatsapp)"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Background Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={btn.bgColor || '#E01E37'}
                      onChange={(e) => handleUpdate(idx, 'bgColor', e.target.value)}
                      className="w-10 h-10 rounded-xl cursor-pointer bg-slate-900 border border-slate-800"
                    />
                    <input
                      type="text"
                      value={btn.bgColor || '#E01E37'}
                      onChange={(e) => handleUpdate(idx, 'bgColor', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 text-white text-xs font-mono focus:outline-none focus:border-[#E01E37]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Text Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={btn.textColor || '#FFFFFF'}
                      onChange={(e) => handleUpdate(idx, 'textColor', e.target.value)}
                      className="w-10 h-10 rounded-xl cursor-pointer bg-slate-900 border border-slate-800"
                    />
                    <input
                      type="text"
                      value={btn.textColor || '#FFFFFF'}
                      onChange={(e) => handleUpdate(idx, 'textColor', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 text-white text-xs font-mono focus:outline-none focus:border-[#E01E37]"
                    />
                  </div>
                </div>
              </div>

            </div>
          ))}

          {buttons.length === 0 && (
            <div className="p-8 border-2 border-dashed border-slate-800 rounded-2xl text-center text-slate-500 font-bold text-sm">
              No buttons configured. Click "Add Button" to create one.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
