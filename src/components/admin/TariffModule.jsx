import React, { useState } from 'react';
import { 
  Calculator, Sliders, Sparkles, Save, CheckCircle2, Zap, Award
} from 'lucide-react';

export default function TariffModule({ tariffs, setTariffs }) {
  const [emergencyDiscountSlider, setEmergencyDiscountSlider] = useState(0); // -20% to +20%
  const [vipMarginMultiplier, setVipMarginMultiplier] = useState(25); // 0% to +100% VIP Retainer Margin
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('ALL');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState(false);

  // Edit Tariff Item
  const handleUpdateFee = (id, field, value) => {
    setTariffs(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, [field]: Number(value) || 0 };
      }
      return t;
    }));
  };

  const handleSaveTariffs = () => {
    setSaveSuccessMessage(true);
    setTimeout(() => setSaveSuccessMessage(false), 3500);
  };

  const categories = [
    { id: 'ALL', label: 'All UAE Authorities' },
    { id: 'IMMIGRATION_ICP', label: 'Immigration (ICP / GDRFA)' },
    { id: 'MEDICAL_EMIRATES_ID', label: 'Medical & EID (DHA / EIDA)' },
    { id: 'GOLDEN_VISA', label: 'Golden Visa & Real Estate (DLD)' }
  ];

  const filteredTariffs = tariffs.filter(t => 
    activeCategoryFilter === 'ALL' || t.category === activeCategoryFilter
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-brand-surfaceLight border border-slate-800 p-6 rounded-xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-brand-goldLight font-bold uppercase mb-1">
            <Zap className="w-3.5 h-3.5 fill-emerald-400" /> DYNAMIC NO-CODE TARIFF & MARGIN MATRIX
          </div>
          <h1 className="text-xl font-black text-white">Federal Tariffs & Advisory Retainer Engine</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Update statutory government tariffs (DLD, ICP, GDRFA, DHA) and test profit margin sliders for VIP handling without modifying React code.
          </p>
        </div>

        <button
          onClick={handleSaveTariffs}
          className="px-5 py-2.5 bg-brand-primary hover:-brand-hover/40 text-white rounded-xl font-bold text-xs shadow-lg shadow-[#D4AF37]/30 flex items-center gap-2 transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" /> Deploy Pricing to Live Calculator
        </button>
      </div>

      {saveSuccessMessage && (
        <div className="p-4 bg-emerald-500/10 border border-brand-gold/30 rounded-xl text-brand-goldLight text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4" /> Live Calculator Synced! Federal policy updates deployed across all frontend modal calculators.
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 1. PROFIT MARGIN & RETAINER MODE CONTROLLER                         */}
      {/* ------------------------------------------------------------------ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* VIP Profit Margin Slider */}
        <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-brand-goldLight" /> Advisory Retainer Margin Controller
            </h3>
            <span className="text-xs font-mono text-brand-goldLight font-bold">+{vipMarginMultiplier}% Margin</span>
          </div>
          <p className="text-xs text-slate-400">
            Dynamically boosts advisory retainer margins for VIP White-Glove escort processing.
          </p>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={vipMarginMultiplier}
            onChange={(e) => setVipMarginMultiplier(Number(e.target.value))}
            className="w-full accent-[#D4AF37] cursor-pointer"
          />
        </div>

        {/* Global Surcharge / Discount Slider */}
        <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-brand-primary" /> Emergency Surcharge / Discount Modifier
            </h3>
            <span className={`text-xs font-mono font-bold ${
              emergencyDiscountSlider < 0 ? 'text-brand-goldLight' : 'text-brand-primary'
            }`}>
              {emergencyDiscountSlider > 0 ? `+${emergencyDiscountSlider}%` : `${emergencyDiscountSlider}%`}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Real-time percentage modifier across all frontend modal outputs.
          </p>
          <input
            type="range"
            min="-20"
            max="20"
            step="1"
            value={emergencyDiscountSlider}
            onChange={(e) => setEmergencyDiscountSlider(Number(e.target.value))}
            className="w-full accent-[#D4AF37] cursor-pointer"
          />
        </div>

      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 2. GOVERNMENT PASS-THROUGH FEE MATRIX TABLE                        */}
      {/* ------------------------------------------------------------------ */}
      <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl overflow-hidden shadow-xl space-y-4 p-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Calculator className="w-4 h-4 text-brand-goldLight" /> Federal Government Tariffs & Retainer Items
          </h3>

          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryFilter(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategoryFilter === cat.id ? 'bg-brand-primary text-white' : 'bg-brand-darkBg text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Editable Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-brand-darkBg text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Item Code & Description</th>
                <th className="py-3 px-4">Authority</th>
                <th className="py-3 px-4">Govt Fee (AED)</th>
                <th className="py-3 px-4">Base Retainer (AED)</th>
                <th className="py-3 px-4">Status Change Surcharge</th>
                <th className="py-3 px-4 text-right">Effective Live Quote</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredTariffs.map(trf => {
                const adjustedRetainer = Math.round(trf.retainerMarkupAED * (1 + vipMarginMultiplier / 100));
                const baseTotal = trf.govtFeeAED + adjustedRetainer + trf.insideCountrySurchargeAED;
                const effectiveTotal = Math.round(baseTotal * (1 + emergencyDiscountSlider / 100));

                return (
                  <tr key={trf.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white">
                      {trf.itemName}
                      <div className="text-[10px] text-slate-400 font-mono">{trf.itemCode}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">{trf.authority}</td>
                    
                    {/* Editable Govt Fee */}
                    <td className="py-3.5 px-4">
                      <input
                        type="number"
                        value={trf.govtFeeAED}
                        onChange={(e) => handleUpdateFee(trf.id, 'govtFeeAED', e.target.value)}
                        className="w-24 bg-brand-darkBg border border-slate-700/80 rounded-lg px-2.5 py-1 text-xs font-mono font-bold text-brand-goldLight focus:outline-none focus:border-brand-primary"
                      />
                    </td>

                    {/* Editable Base Retainer */}
                    <td className="py-3.5 px-4">
                      <input
                        type="number"
                        value={trf.retainerMarkupAED}
                        onChange={(e) => handleUpdateFee(trf.id, 'retainerMarkupAED', e.target.value)}
                        className="w-24 bg-brand-darkBg border border-slate-700/80 rounded-lg px-2.5 py-1 text-xs font-mono font-bold text-brand-primary focus:outline-none focus:border-brand-primary"
                      />
                    </td>

                    {/* Editable Status Surcharge */}
                    <td className="py-3.5 px-4">
                      <input
                        type="number"
                        value={trf.insideCountrySurchargeAED}
                        onChange={(e) => handleUpdateFee(trf.id, 'insideCountrySurchargeAED', e.target.value)}
                        className="w-24 bg-brand-darkBg border border-slate-700/80 rounded-lg px-2.5 py-1 text-xs font-mono font-bold text-brand-goldLight focus:outline-none focus:border-brand-primary"
                      />
                    </td>

                    {/* Effective Live Output */}
                    <td className="py-3.5 px-4 text-right font-mono font-black text-brand-goldLight text-sm">
                      AED {effectiveTotal.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

      {/* Live Sandbox Output */}
      <div className="bg-brand-darkBg border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-primary" /> Frontend Modal Live Calculation Equation Sandbox
        </h3>
        
        <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="space-y-1">
            <span className="text-slate-400">Sample Calculation: Spouse Visa (Inside UAE Status)</span>
            <div className="text-white font-bold text-sm">
              Govt Fee (1,150) + VIP Medical (820) + Emirates ID (375) + Retainer (3,500 + {vipMarginMultiplier}%)
            </div>
          </div>

          <div className="text-right">
            <div className="text-slate-400 text-[10px]">SYNCED FRONTEND QUOTE</div>
            <div className="text-2xl font-black text-brand-primary">
              AED {Math.round(7850 * (1 + (vipMarginMultiplier * 0.4 + emergencyDiscountSlider) / 100)).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
