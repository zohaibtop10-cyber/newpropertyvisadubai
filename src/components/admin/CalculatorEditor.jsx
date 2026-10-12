import React, { useState, useEffect } from 'react';
import { 
  Calculator, DollarSign, Save, CheckCircle2, Sparkles, Plus, Trash2, 
  Receipt, ShieldCheck, MapPin, Layers
} from 'lucide-react';
import { db } from '../../firebase';
import { ref, set } from 'firebase/database';

const DEFAULT_CALCULATOR_CONFIG = {
  inCountryStatusChangeFee: 675.65,
  categories: {
    family: {
      serviceCharge: 1450,
      label: 'Family Residence Visa (Spouse)',
      items: [
        { label: 'GDRFA / ICP Entry Permit (Spouse)', price: 1150, desc: 'Initial Residence Entry Approval' },
        { label: 'Medical Fitness Screening (Standard)', price: 320, desc: 'DHA / EHS Blood & X-Ray Screening' },
        { label: 'Emirates ID (2-Year Validity)', price: 390, desc: 'ICA Smart Card Processing' },
        { label: 'Visa Stamping & Status Amendment', price: 1990, desc: 'Final Residence Visa Approval' }
      ]
    },
    golden: {
      serviceCharge: 2450,
      label: '10-Year Golden Visa (Property Investor)',
      items: [
        { label: 'DLD Property Valuation & Audit', price: 4020, desc: 'Dubai Land Dept Official Valuation & Title Deed Clearance' },
        { label: 'GDRFA 10-Year Golden Visa Entry Permit', price: 2680, desc: 'Immigration Golden Visa Nomination & Approval' },
        { label: 'VIP Express Medical & 10-Year Emirates ID', price: 2721, desc: '30-min VIP Medical & 10-Yr Smart Card' }
      ]
    },
    investor: {
      serviceCharge: 1850,
      label: '2-Year Investor Residency (DLD)',
      items: [
        { label: 'DLD Title Deed Audit & Clearance', price: 3100, desc: 'Property Valuation Check & NOC' },
        { label: 'GDRFA Entry Permit & Residency Stamp', price: 2150, desc: '2-Year Investor Residency Approval' },
        { label: 'VIP Medical Test & 2-Yr Emirates ID', price: 1600, desc: 'Medical Fitness & Smart Card' }
      ]
    },
    child: {
      serviceCharge: 1250,
      label: 'Child Dependant Visa',
      items: [
        { label: 'ICP / GDRFA Dependent Entry Permit', price: 1100, desc: 'Child Entry Permit Approval' },
        { label: 'Emirates ID Card (2-Year Validity)', price: 380, desc: 'Child Smart Card Processing (No Medical Needed)' },
        { label: 'File Opening & Visa Stamping Fee', price: 1770, desc: 'Final Residence Visa Stamping' }
      ]
    },
    maid: {
      serviceCharge: 1650,
      label: 'Domestic Helper / Maid Visa (Tadbeer)',
      items: [
        { label: 'MOHRE Entry Permit & Labor Contract', price: 2100, desc: 'Domestic Worker Labor Agreement' },
        { label: 'VIP Medical Screening & Emirates ID', price: 1200, desc: 'Mandatory Medical & Smart Card' },
        { label: 'Refundable Security Deposit (GDRFA)', price: 2000, desc: 'Official Government Security Deposit' },
        { label: 'Residency Visa Stamping', price: 1200, desc: '2-Year Domestic Worker Stamping' }
      ]
    },
    corporate: {
      serviceCharge: 2500,
      label: 'Business Setup & License (DET)',
      items: [
        { label: 'DET / Freezone Initial Approval', price: 1200, desc: 'Trade Name Reservation & Activity Approval' },
        { label: 'Company MOA & Legal Notarization', price: 1500, desc: 'Court Notary Public Attestation' },
        { label: 'Trade License & Establishment Card', price: 9800, desc: 'Annual License & Immigration File Card' }
      ]
    }
  }
};

export default function CalculatorEditor({ cmsConfig, setCmsConfig }) {
  const [calcConfig, setCalcConfig] = useState(
    cmsConfig?.calculator || DEFAULT_CALCULATOR_CONFIG
  );

  const [activeCategory, setActiveCategory] = useState('family');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (cmsConfig?.calculator) {
      setCalcConfig(cmsConfig.calculator);
    }
  }, [cmsConfig]);

  const handleUpdateCategoryField = (field, value) => {
    setCalcConfig(prev => ({
      ...prev,
      categories: {
        ...prev?.categories,
        [activeCategory]: {
          ...prev?.categories?.[activeCategory],
          [field]: value
        }
      }
    }));
  };

  const handleAddItem = () => {
    const currentItems = calcConfig?.categories?.[activeCategory]?.items || [];
    handleUpdateCategoryField('items', [
      ...currentItems,
      { label: 'New Government Fee Item', price: 500, desc: 'Official authority fee' }
    ]);
  };

  const handleUpdateItem = (idx, field, value) => {
    const currentItems = [...(calcConfig?.categories?.[activeCategory]?.items || [])];
    currentItems[idx][field] = field === 'price' ? Number(value) : value;
    handleUpdateCategoryField('items', currentItems);
  };

  const handleDeleteItem = (idx) => {
    const currentItems = calcConfig?.categories?.[activeCategory]?.items || [];
    handleUpdateCategoryField('items', currentItems.filter((_, i) => i !== idx));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (setCmsConfig) {
      setCmsConfig(prev => ({ ...prev, calculator: calcConfig }));
    }

    try {
      const cmsRef = ref(db, 'cmsConfig/calculator');
      await set(cmsRef, calcConfig);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch(err) {
      alert("Error saving calculator pricing to Firebase: " + err.message);
    }
  };

  const categoryKeys = [
    { id: 'family', label: 'Spouse & Family' },
    { id: 'golden', label: '10-Yr Golden Visa' },
    { id: 'investor', label: '2-Yr Property Investor' },
    { id: 'child', label: 'Child Dependant' },
    { id: 'maid', label: 'Domestic Staff (Maid)' },
    { id: 'corporate', label: 'Business Setup' }
  ];

  const activeData = calcConfig?.categories?.[activeCategory] || DEFAULT_CALCULATOR_CONFIG.categories[activeCategory] || {};

  return (
    <div className="max-w-6xl space-y-6 animate-fadeIn pb-16">
      
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-brand-darkSurface border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive 3-Tab Fee Calculator</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Calculator Popup Pricing CMS
            </h1>
            <p className="text-text-muted text-xs sm:text-sm max-w-xl">
              Configure government line items, advisory service charges, and in-country status change fees for the popup calculator.
            </p>
          </div>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Publish Calculator CMS</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-semibold flex items-center gap-3 shadow-lg animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span>Calculator pricing and line items published live!</span>
        </div>
      )}

      {/* Global In-Country Surcharge Config Card */}
      <div className="bg-surface/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-base text-white">Global In-Country Status Change Surcharge</h3>
            <p className="text-text-muted text-xs">Fee added when applicant selects "Inside the UAE" in the calculator</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Inside UAE Status Change Surcharge (AED)</label>
            <input
              type="number"
              step="0.01"
              value={calcConfig.inCountryStatusChangeFee ?? 675.65}
              onChange={(e) => setCalcConfig(prev => ({ ...prev, inCountryStatusChangeFee: Number(e.target.value) }))}
              className="w-full bg-surface/80 border border-slate-800 rounded-xl px-4 py-3 text-emerald-400 font-mono font-bold text-sm focus:outline-none focus:border-amber-500/50"
            />
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 bg-surface/80 backdrop-blur-xl border border-slate-800/80 p-2 rounded-2xl shadow-xl">
        {categoryKeys.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black shadow-lg shadow-amber-500/20'
                : 'text-text-muted hover:text-white hover:bg-surface/60'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Category Breakdown Items Editor */}
      <form onSubmit={handleSave} className="bg-surface/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div>
            <h2 className="font-display font-bold text-lg text-white capitalize">{activeData.label || activeCategory} Breakdown</h2>
            <p className="text-text-muted text-xs mt-0.5">Configure government tariffs and service charge retainer for this category</p>
          </div>

          <div className="flex items-center gap-3">
            <div>
              <label className="block text-[11px] font-mono text-amber-400 font-bold uppercase mb-1">Advisory Service Charge (AED)</label>
              <input
                type="number"
                value={activeData.serviceCharge ?? 1450}
                onChange={(e) => handleUpdateCategoryField('serviceCharge', Number(e.target.value))}
                className="w-36 bg-surface border border-slate-700/60 rounded-xl px-3 py-2 text-white font-mono font-bold text-xs focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <button
              type="button"
              onClick={handleAddItem}
              className="px-3.5 py-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer self-end"
            >
              <Plus className="w-4 h-4" /> Add Item
            </button>
          </div>
        </div>

        {/* Itemized Line Items */}
        <div className="space-y-4">
          {(activeData.items || []).map((item, idx) => (
            <div key={idx} className="p-4 bg-surface/80 border border-slate-800/80 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400">LINE ITEM #{idx + 1}</span>
                <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDeleteItem(idx); }} className="p-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 cursor-pointer" title="Delete Item"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
                <div className="sm:col-span-5">
                  <label className="block text-text-muted font-medium mb-1">Item Name / Label</label>
                  <input
                    type="text"
                    value={item.label || ''}
                    onChange={(e) => handleUpdateItem(idx, 'label', e.target.value)}
                    className="w-full bg-surface border border-slate-700/60 rounded-xl px-3 py-2 text-white font-bold"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-text-muted font-medium mb-1">Government Price (AED)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={item.price ?? 0}
                    onChange={(e) => handleUpdateItem(idx, 'price', e.target.value)}
                    className="w-full bg-surface border border-slate-700/60 rounded-xl px-3 py-2 text-emerald-400 font-mono font-bold"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-text-muted font-medium mb-1">Description / Subtext</label>
                  <input
                    type="text"
                    value={item.desc || ''}
                    onChange={(e) => handleUpdateItem(idx, 'desc', e.target.value)}
                    className="w-full bg-surface border border-slate-700/60 rounded-xl px-3 py-2 text-slate-300"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Save Button */}
        <div className="pt-4 sticky bottom-4 z-20">
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-base rounded-xl shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
          >
            <Save className="w-5 h-5" />
            <span>Publish Calculator Pricing CMS</span>
          </button>
        </div>

      </form>

    </div>
  );
}
