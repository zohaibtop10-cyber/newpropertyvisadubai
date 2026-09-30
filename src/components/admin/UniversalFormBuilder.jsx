import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ChevronDown, ChevronUp, Save, SaveAll } from 'lucide-react';
import { getDatabase, ref, update, set } from 'firebase/database';

/**
 * Universal Form Builder (Recursive CMS Engine)
 * Automatically generates a dark luxury UI for ANY JSON object.
 */
export default function UniversalFormBuilder({ collectionPath, data, onSave }) {
  const [formData, setFormData] = useState(data || {});
  const [isSaving, setIsSaving] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  React.useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setFormData(data);
    }
  }, [data]);

  const toggleSection = (key) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFieldChange = (pathArray, newValue) => {
    setFormData(prev => {
      const newData = JSON.parse(JSON.stringify(prev)); // Deep clone
      let current = newData;
      for (let i = 0; i < pathArray.length - 1; i++) {
        if (!current[pathArray[i]]) current[pathArray[i]] = {};
        current = current[pathArray[i]];
      }
      current[pathArray[pathArray.length - 1]] = newValue;
      return newData;
    });
  };

  const handleArrayAdd = (pathArray, templateItem) => {
    setFormData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      let current = newData;
      for (let i = 0; i < pathArray.length - 1; i++) {
        current = current[pathArray[i]];
      }
      const arr = current[pathArray[pathArray.length - 1]] || [];
      arr.push(typeof templateItem === 'object' ? { ...templateItem } : '');
      current[pathArray[pathArray.length - 1]] = arr;
      return newData;
    });
  };

  const handleArrayRemove = (pathArray, index) => {
    setFormData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      let current = newData;
      for (let i = 0; i < pathArray.length - 1; i++) {
        current = current[pathArray[i]];
      }
      const arr = current[pathArray[pathArray.length - 1]];
      arr.splice(index, 1);
      return newData;
    });
  };

  const saveToFirebase = async () => {
    setIsSaving(true);
    try {
      const db = getDatabase();
      const docRef = ref(db, collectionPath);
      await set(docRef, formData);
      if (onSave) onSave(formData);
      alert('Changes saved successfully to Firebase!');
    } catch (error) {
      console.error('Error saving to Firebase:', error);
      alert('Failed to save. Check console.');
    } finally {
      setIsSaving(false);
    }
  };

  const renderField = (key, value, currentPath) => {
    // 1. Array Handling
    if (Array.isArray(value)) {
      const isExpanded = expandedSections[currentPath.join('.')];
      const templateItem = value.length > 0 ? (typeof value[0] === 'object' ? Object.fromEntries(Object.keys(value[0]).map(k => [k, typeof value[0][k] === 'string' ? '' : typeof value[0][k] === 'number' ? 0 : typeof value[0][k] === 'boolean' ? false : null])) : '') : '';
      
      return (
        <div key={key} className="mb-6 p-5 bg-surface/5 border border-white/10 rounded-xl">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection(currentPath.join('.'))}>
            <label className="block text-sm font-bold text-brand-gold uppercase tracking-wider">{key.replace(/([A-Z])/g, ' $1').trim()} (List)</label>
            {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </div>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mt-4 space-y-4">
                {value.map((item, index) => (
                  <div key={index} className="p-4 bg-black/40 rounded-lg border border-white/5 relative group">
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleArrayRemove(currentPath, index)} className="p-2 text-red-400 hover:bg-red-400/20 rounded-md transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {typeof item === 'object' ? (
                      <div className="pl-2 border-l-2 border-brand-gold/30">
                        {Object.entries(item).map(([subKey, subVal]) => renderField(subKey, subVal, [...currentPath, index, subKey]))}
                      </div>
                    ) : (
                      renderField(`Item ${index + 1}`, item, [...currentPath, index])
                    )}
                  </div>
                ))}
                <button
                  onClick={() => handleArrayAdd(currentPath, templateItem)}
                  className="w-full py-3 flex items-center justify-center gap-2 bg-brand-gold/10 hover:bg-brand-gold/20 text-brand-gold font-bold rounded-lg transition-colors border border-brand-gold/30 border-dashed"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Item to {key}</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    // 2. Object (Nested Section) Handling
    if (typeof value === 'object' && value !== null) {
      const isExpanded = expandedSections[currentPath.join('.')] !== false; // Default expanded for objects
      return (
        <div key={key} className="mb-6 p-5 bg-[#121417] border border-white/10 rounded-xl shadow-lg">
          <div className="flex items-center justify-between cursor-pointer border-b border-white/5 pb-3 mb-4" onClick={() => toggleSection(currentPath.join('.'))}>
            <h3 className="text-lg font-bold text-white capitalize flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </h3>
            {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden space-y-4">
                {Object.entries(value).map(([subKey, subVal]) => renderField(subKey, subVal, [...currentPath, subKey]))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    // 3. String Handling (Short vs Long)
    if (typeof value === 'string') {
      const isLongText = value.length > 60 || key.toLowerCase().includes('description') || key.toLowerCase().includes('content') || key.toLowerCase().includes('text');
      return (
        <div key={key} className="mb-4">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </label>
          {isLongText ? (
            <textarea
              value={value}
              onChange={(e) => handleFieldChange(currentPath, e.target.value)}
              rows={4}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
            />
          ) : (
            <input
              type="text"
              value={value}
              onChange={(e) => handleFieldChange(currentPath, e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
            />
          )}
        </div>
      );
    }

    // 4. Boolean Handling
    if (typeof value === 'boolean') {
      return (
        <div key={key} className="mb-4 flex items-center justify-between bg-black/30 p-4 rounded-lg border border-white/5">
          <label className="text-sm font-semibold text-slate-300 capitalize">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </label>
          <button
            onClick={() => handleFieldChange(currentPath, !value)}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${value ? 'bg-brand-gold' : 'bg-slate-700'}`}
          >
            <motion.div
              layout
              className="w-4 h-4 bg-surface rounded-full shadow-sm"
              animate={{ x: value ? 24 : 0 }}
            />
          </button>
        </div>
      );
    }

    // 5. Number Handling
    if (typeof value === 'number') {
      return (
        <div key={key} className="mb-4">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) => handleFieldChange(currentPath, parseFloat(e.target.value))}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
          />
        </div>
      );
    }

    return null;
  };

  if (!formData || Object.keys(formData).length === 0) {
    return <div className="p-8 text-center text-slate-400">Loading CMS Data...</div>;
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* Top Action Bar */}
      <div className="flex items-center justify-between bg-[#121417] p-5 rounded-xl border border-white/10 shadow-xl sticky top-4 z-50">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Database Editor</h2>
          <p className="text-xs text-brand-gold font-mono mt-1">Path: /{collectionPath}</p>
        </div>
        <button
          onClick={saveToFirebase}
          disabled={isSaving}
          className="flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:brightness-110 text-black px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-[0_4px_15px_rgba(212,175,55,0.25)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? <Save className="w-4 h-4 animate-spin" /> : <SaveAll className="w-4 h-4" />}
          <span>{isSaving ? 'Deploying to Firebase...' : 'Save & Publish Changes'}</span>
        </button>
      </div>

      {/* Recursive Form Body */}
      <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6 sm:p-8 shadow-2xl">
        {Object.entries(formData).map(([key, value]) => renderField(key, value, [key]))}
      </div>

    </div>
  );
}
