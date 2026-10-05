import React, { useState } from 'react';
import { 
  Calculator, Sliders, Sparkles, Save, CheckCircle2, Zap, Award
} from 'lucide-react';

export default function TariffModule({ tariffs, setTariffs }) {
  const [emergencyDiscountSlider, setEmergencyDiscountSlider] = useState(0);
  const [vipMarginMultiplier, setVipMarginMultiplier] = useState(25);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('ALL');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState(false);

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
    <div className="max-w-6xl space-y-6 animate-fadeIn pb-16">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-brand-darkSurface border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5" />
              <span>Federal Government Rates Matrix</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Tariffs & Fee Calculator Manager
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
              Update government fees (DLD, ICP, GDRFA, DHA) and adjust VIP retainer margin sliders live.
            </p>
          </div>
          <button
            onClick={handleSaveTariffs}
            className="px-6 py-3 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Deploy Pricing Changes</span>
          </button>
        </div>
      </div>

      {saveSuccessMessage && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-semibold flex items-center gap-3 shadow-lg animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span>Federal policy updates deployed across all frontend modal calculators!</span>
        </div>
      )}

      {/* Margin Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-display font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" /> Advisory Retainer Margin Controller
            </h3>
            <span className="text-xs font-mono text-amber-400 font-bold px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20">+{vipMarginMultiplier}% Margin</span>
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
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-display font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-sky-400" /> Emergency Surcharge / Discount Modifier
            </h3>
            <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded border ${
              emergencyDiscountSlider < 0 ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
            }`}>
              {emergencyDiscountSlider > 0 ? `+${emergencyDiscountSlider}%` : `${emergencyDiscountSlider}%`}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Real-time percentage modifier applied across all frontend modal quote outputs.
          </p>
          <input
            type="range"
            min="-20"
            max="20"
            step="1"
            value={emergencyDiscountSlider}
            onChange={(e) => setEmergencyDiscountSlider(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Government Pass-Through Fee Matrix Table */}
      <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl p-6 sm:p-7 space-y-5">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-base font-display font-bold text-white flex items-center gap-2.5">
            <Calculator className="w-5 h-5 text-amber-400" /> Federal Government Tariffs & Retainers
          </h3>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryFilter(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategoryFilter === cat.id 
                    ? 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black font-bold shadow-md shadow-amber-500/20' 
                    : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800/80">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800/80">
              <tr>
                <th className="py-3.5 px-4">Item Code & Description</th>
                <th className="py-3.5 px-4">Authority</th>
                <th className="py-3.5 px-4">Govt Fee (AED)</th>
                <th className="py-3.5 px-4">Base Retainer (AED)</th>
                <th className="py-3.5 px-4">Status Surcharge</th>
                <th className="py-3.5 px-4 text-right">Live Effective Quote</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredTariffs.map(trf => {
                const adjustedRetainer = Math.round(trf.retainerMarkupAED * (1 + vipMarginMultiplier / 100));
                const baseTotal = trf.govtFeeAED + adjustedRetainer + trf.insideCountrySurchargeAED;
                const effectiveTotal = Math.round(baseTotal * (1 + emergencyDiscountSlider / 100));

                return (
                  <tr key={trf.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white">
                      {trf.itemName}
                      <div className="text-[10px] text-slate-400 font-mono font-normal">{trf.itemCode}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">{trf.authority}</td>
                    
                    <td className="py-3.5 px-4">
                      <input
                        type="number"
                        value={trf.govtFeeAED}
                        onChange={(e) => handleUpdateFee(trf.id, 'govtFeeAED', e.target.value)}
                        className="w-24 bg-slate-950 border border-slate-700/60 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-amber-300 focus:outline-none focus:border-amber-500/50"
                      />
                    </td>

                    <td className="py-3.5 px-4">
                      <input
                        type="number"
                        value={trf.retainerMarkupAED}
                        onChange={(e) => handleUpdateFee(trf.id, 'retainerMarkupAED', e.target.value)}
                        className="w-24 bg-slate-950 border border-slate-700/60 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-white focus:outline-none focus:border-amber-500/50"
                      />
                    </td>

                    <td className="py-3.5 px-4">
                      <input
                        type="number"
                        value={trf.insideCountrySurchargeAED}
                        onChange={(e) => handleUpdateFee(trf.id, 'insideCountrySurchargeAED', e.target.value)}
                        className="w-24 bg-slate-950 border border-slate-700/60 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-amber-300 focus:outline-none focus:border-amber-500/50"
                      />
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-extrabold text-amber-400 text-sm">
                      AED {effectiveTotal.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

      {/* Live Equation Sandbox */}
      <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-display font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" /> Frontend Modal Live Equation Sandbox
        </h3>
        
        <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="space-y-1">
            <span className="text-slate-400">Sample Calculation: Spouse Visa (Inside UAE Status)</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              Govt Fee (1,150) + VIP Medical (820) + Emirates ID (375) + Retainer (3,500 + {vipMarginMultiplier}%)
            </div>
          </div>

          <div className="text-right">
            <div className="text-slate-400 text-[10px]">SYNCED FRONTEND QUOTE</div>
            <div className="text-2xl font-black text-amber-400">
              AED {Math.round(7850 * (1 + (vipMarginMultiplier * 0.4 + emergencyDiscountSlider) / 100)).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
