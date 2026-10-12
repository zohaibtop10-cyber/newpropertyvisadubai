import React, { useState, useEffect } from 'react';
import { Globe, Save, CheckCircle2, ChevronRight, ChevronDown, Code, Layers, Sparkles, Database } from 'lucide-react';
import { db } from '../../firebase';
import { ref, set, onValue } from 'firebase/database';

export default function UniversalFormBuilder({ collectionPath = 'cmsConfig', data = {}, onSave }) {
  const [formData, setFormData] = useState(data || {});
  const [activeSection, setActiveSection] = useState('hero');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [viewMode, setViewMode] = useState('visual');
  const [jsonText, setJsonText] = useState(JSON.stringify(data, null, 2));

  // Default Schema Nodes if data is empty or single node
  const defaultSchemaNodes = {
    hero: { mainHeadline: 'Bring your family to the UAE with 100% Guaranteed SLA Approval.', subtext: 'We prepare, submit, and track family residence visas...' },
    stats: { title: 'Live Status Indicators', metric1Val: '15,000+', metric1Label: 'Visas Issued' },
    achievements: { title: 'Official Recognition', items: [] },
    problems: { title: 'The Problems We Solve', items: [] },
    services: { title: 'Everything We Handle', items: [] },
    packages: { title: 'Comprehensive Property Investor Services', items: [] },
    whyUs: { title: 'Why Families Choose Us', items: [] },
    process: { title: 'Step-by-Step 4-Step Process', steps: [] },
    faqs: { title: 'Frequently Asked Questions', items: [] },
    reviews: { title: 'Customer Reviews', items: [] },
    cta: { headline: 'Ready to Sponsor Your Family in the UAE?', subtext: 'Get an itemized fee breakdown in 30 seconds.' },
    global: { siteName: 'Property Visa', contactEmail: 'advisory@familyvisa.ae', phone: '+971 4 220 8899' },
    topbar: { tickerText: 'GDRFA & ICP 2026 Residency Rules Updated • Fast-Track Family Visa Approvals' },
    footer: { copyright: '© 2026 Property Visa / 800 DOCS LLC SOC. All rights reserved.' }
  };

  useEffect(() => {
    const merged = { ...defaultSchemaNodes, ...(data || {}) };
    setFormData(merged);
    setJsonText(JSON.stringify(merged, null, 2));
    const keys = Object.keys(merged);
    if (keys.length > 0 && !keys.includes(activeSection)) {
      setActiveSection(keys[0]);
    }
  }, [data]);

  // Fetch real-time Firebase DB schema if needed
  useEffect(() => {
    const cmsRef = ref(db, collectionPath);
    const unsubscribe = onValue(cmsRef, (snapshot) => {
      const dbVal = snapshot.val();
      if (dbVal) {
        const merged = { ...defaultSchemaNodes, ...dbVal };
        setFormData(merged);
        setJsonText(JSON.stringify(merged, null, 2));
      }
    });
    return () => unsubscribe();
  }, [collectionPath]);

  const handleFieldChange = (path, value) => {
    const keys = path.split('.');
    const updated = { ...formData };
    let current = updated;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;

    setFormData(updated);
    setJsonText(JSON.stringify(updated, null, 2));
  };

  const handleSave = (e) => {
    e.preventDefault();
    let finalData = formData;

    if (viewMode === 'json') {
      try {
        finalData = JSON.parse(jsonText);
        setFormData(finalData);
      } catch (err) {
        alert('Invalid JSON format: ' + err.message);
        return;
      }
    }

    if (onSave) {
      onSave(finalData);
    }

    try {
      const dbRef = ref(db, collectionPath);
      set(dbRef, finalData)
        .then(() => {
          setSaveSuccess(true);
          setTimeout(() => setSaveSuccess(false), 3500);
        });
    } catch (err) {
      console.error('Error saving to Firebase:', err);
    }
  };

  const renderField = (key, val, fullPath) => {
    if (typeof val === 'boolean') {
      return (
        <div key={fullPath} className="flex items-center justify-between p-4 bg-surface/80 border border-slate-800/80 rounded-xl">
          <label className="text-xs font-semibold text-slate-300 capitalize">{key}</label>
          <input
            type="checkbox"
            checked={val}
            onChange={(e) => handleFieldChange(fullPath, e.target.checked)}
            className="w-4 h-4 accent-amber-500 cursor-pointer"
          />
        </div>
      );
    }

    if (typeof val === 'number') {
      return (
        <div key={fullPath} className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 block capitalize">{key}</label>
          <input
            type="number"
            value={val}
            onChange={(e) => handleFieldChange(fullPath, Number(e.target.value))}
            className="w-full bg-surface/80 border border-slate-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/50 font-mono text-xs"
          />
        </div>
      );
    }

    if (typeof val === 'string') {
      const isLongText = val.length > 60 || key.toLowerCase().includes('desc') || key.toLowerCase().includes('text') || key.toLowerCase().includes('quote') || key.toLowerCase().includes('subtext');
      return (
        <div key={fullPath} className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 block capitalize">{key}</label>
          {isLongText ? (
            <textarea
              rows={3}
              value={val}
              onChange={(e) => handleFieldChange(fullPath, e.target.value)}
              className="w-full bg-surface/80 border border-slate-800 text-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/50 text-xs leading-relaxed"
            />
          ) : (
            <input
              type="text"
              value={val}
              onChange={(e) => handleFieldChange(fullPath, e.target.value)}
              className="w-full bg-surface/80 border border-slate-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/50 text-xs font-medium"
            />
          )}
        </div>
      );
    }

    return null;
  };

  const sectionKeys = Object.keys(formData);

  return (
    <div className="max-w-6xl space-y-6 animate-fadeIn pb-16">
      
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-brand-darkSurface border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
              <Database className="w-3.5 h-3.5" />
              <span>Universal Database Schema Editor</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Firebase Realtime Database Inspector
            </h1>
            <p className="text-text-muted text-xs sm:text-sm max-w-xl">
              Inspect &amp; edit live database schema nodes directly in <code className="text-amber-400 font-mono">{collectionPath}</code>.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-surface p-1.5 rounded-xl border border-slate-800/80">
            <button
              type="button"
              onClick={() => setViewMode('visual')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                viewMode === 'visual' ? 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black font-bold shadow-md shadow-amber-500/20' : 'text-text-muted hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" /> Visual Form
            </button>
            <button
              type="button"
              onClick={() => setViewMode('json')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                viewMode === 'json' ? 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black font-bold shadow-md shadow-amber-500/20' : 'text-text-muted hover:text-white'
              }`}
            >
              <Code className="w-4 h-4" /> Raw JSON
            </button>
          </div>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-semibold flex items-center gap-3 shadow-lg animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span>Firebase database schema updated live!</span>
        </div>
      )}

      {/* Editor Content */}
      {viewMode === 'json' ? (
        <form onSubmit={handleSave} className="bg-surface/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
          <label className="text-xs font-semibold text-slate-300 block">Raw Firebase JSON Schema</label>
          <textarea
            rows={18}
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            className="w-full bg-surface/80 border border-slate-800 text-emerald-400 font-mono text-xs leading-relaxed focus:outline-none focus:border-amber-500/50 p-4 rounded-xl"
          />
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold rounded-xl shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2.5 transition-all cursor-pointer text-xs uppercase tracking-wider"
          >
            <Save className="w-4 h-4" />
            <span>Publish Raw JSON Schema</span>
          </button>
        </form>
      ) : (
        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <div className="lg:col-span-4 bg-surface/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4 shadow-xl space-y-1 sticky top-24">
            <div className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider px-3 py-2 border-b border-slate-800/80 mb-2 flex justify-between items-center">
              <span>DATABASE SCHEMA NODES ({sectionKeys.length})</span>
            </div>

            <div className="space-y-1 max-h-[500px] overflow-y-auto pr-1">
              {sectionKeys.map((secKey) => {
                const isActive = activeSection === secKey;
                return (
                  <button
                    key={secKey}
                    type="button"
                    onClick={() => setActiveSection(secKey)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold'
                        : 'text-text-muted hover:text-white hover:bg-surface/60'
                    }`}
                  >
                    <span className="capitalize">{secKey}</span>
                    {isActive ? <ChevronDown className="w-4 h-4 text-amber-400" /> : <ChevronRight className="w-4 h-4 text-text-muted" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-8 bg-surface/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <h3 className="font-display font-bold text-base text-white capitalize">{activeSection} Node Fields</h3>
              <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">Key: {activeSection}</span>
            </div>

            {formData[activeSection] && typeof formData[activeSection] === 'object' ? (
              <div className="space-y-5">
                {Object.entries(formData[activeSection]).map(([k, v]) => {
                  if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
                    return (
                      <div key={k} className="p-5 bg-surface/80 border border-slate-800/80 rounded-xl space-y-4">
                        <div className="text-xs font-bold text-amber-400 font-mono uppercase border-b border-slate-800/80 pb-2">{k}</div>
                        <div className="space-y-4">
                          {Object.entries(v).map(([subK, subV]) => renderField(subK, subV, `${activeSection}.${k}.${subK}`))}
                        </div>
                      </div>
                    );
                  }
                  return renderField(k, v, `${activeSection}.${k}`);
                })}
              </div>
            ) : (
              <div className="text-text-muted text-xs py-4">No editable primitive fields found for this node.</div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2.5 transition-all cursor-pointer mt-4"
            >
              <Save className="w-4 h-4" />
              <span>Publish Node Schema Changes</span>
            </button>
          </div>

        </form>
      )}

    </div>
  );
}
