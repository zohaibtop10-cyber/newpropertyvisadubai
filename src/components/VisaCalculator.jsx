import React, { useState, useEffect } from 'react';
import { ChevronDown, Calculator as CalcIcon, Sparkles, Check, Info, ShieldCheck, MapPin, Plane } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';

const fallbackPricing = {
  'family-visa': {
    name: 'Family Residence Visa',
    subCategories: {
      spouse: { name: 'Spouse Residence Visa', pricing: { insideUAE: 4525, outsideUAE: 3850 } },
      child: { name: 'Child Dependent Visa (Under 18)', pricing: { insideUAE: 3925, outsideUAE: 3250 } },
      parent: { name: 'Parents Residence Visa', pricing: { insideUAE: 8475, outsideUAE: 7800 } }
    }
  },
  'golden-visa': {
    name: '10-Year Golden Visa',
    pricing: { insideUAE: 9421, outsideUAE: 9421 },
    subCategories: {
      property: { name: 'Property Investor (AED 2M+)', pricing: { insideUAE: 9421, outsideUAE: 9421 } },
      executive: { name: 'Executive / Skilled Talent (AED 30k+ Salary)', pricing: { insideUAE: 4137, outsideUAE: 4137 } }
    }
  },
  'domestic-worker': {
    name: 'Domestic Helper / Maid Visa',
    pricing: { insideUAE: 7175, outsideUAE: 6500 },
    subCategories: {
      maid: { name: 'Housemaid / Nanny Visa (Tadbeer)', pricing: { insideUAE: 7175, outsideUAE: 6500 } }
    }
  }
};

const defaultAddons = [
  { id: 'vip-medical', label: 'Upgrade to VIP / Express 4-Hour Medical Screening', extraCharge: 430, defaultSelected: false },
  { id: 'attestation', label: 'In-House MOFA & Embassy Document Attestation', extraCharge: 450, defaultSelected: false }
];

export default function VisaCalculator({ className = '', onOpenModal, cmsConfig }) {
  const [pricingData, setPricingData] = useState(fallbackPricing);
  const [addonsList, setAddonsList] = useState(defaultAddons);

  // User selections
  const [selectedCategory, setSelectedCategory] = useState('family-visa');
  const [selectedSubCategory, setSelectedSubCategory] = useState('spouse');
  const [locationStatus, setLocationStatus] = useState('outsideUAE'); // mandatory 'outsideUAE' | 'insideUAE'
  const [selectedAddons, setSelectedAddons] = useState({});

  // Fetch Firebase live schema if available
  useEffect(() => {
    try {
      const calcRef = ref(db, 'cmsConfig/calculator');
      const unsub = onValue(calcRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          if (data?.pricing) setPricingData(data.pricing);
          if (data?.addons) setAddonsList(data.addons);
        }
      });
      return () => unsub();
    } catch (e) {
      console.warn('Firebase pricing sync fallback to local defaults:', e);
    }
  }, []);

  // Update default selected subcategory when main category changes
  const handleCategoryChange = (e) => {
    const cat = e.target.value;
    setSelectedCategory(cat);
    if (cat === 'family-visa') {
      setSelectedSubCategory('spouse');
    } else if (cat === 'golden-visa') {
      setSelectedSubCategory('property');
    } else if (cat === 'domestic-worker') {
      setSelectedSubCategory('maid');
    }
  };

  // Toggle addon selection
  const toggleAddon = (addonId) => {
    setSelectedAddons((prev) => ({
      ...prev,
      [addonId]: !prev[addonId]
    }));
  };

  // Resolve active base price from location and category/subcategory
  const resolveBasePrice = () => {
    const catObj = pricingData[selectedCategory] || fallbackPricing['family-visa'];
    let priceObj = catObj.pricing;

    if (catObj.subCategories && catObj.subCategories[selectedSubCategory]) {
      priceObj = catObj.subCategories[selectedSubCategory].pricing;
    }

    if (!priceObj) {
      return locationStatus === 'insideUAE' ? 4525 : 3850;
    }

    return priceObj[locationStatus] || priceObj['outsideUAE'] || 3850;
  };

  // Calculate Addon Total
  const calculateAddonsTotal = () => {
    return addonsList.reduce((sum, item) => {
      if (selectedAddons[item.id]) {
        return sum + (item.extraCharge || 0);
      }
      return sum;
    }, 0);
  };

  const basePrice = resolveBasePrice();
  const addonsTotal = calculateAddonsTotal();
  const grandTotal = basePrice + addonsTotal;

  // Selected title label for display
  const getDisplayTitle = () => {
    if (selectedCategory === 'family-visa') {
      const map = { spouse: 'Spouse Residence Visa', child: 'Child Dependent Visa', parent: 'Parents Residence Visa' };
      return map[selectedSubCategory] || 'Family Residence Visa';
    }
    if (selectedCategory === 'golden-visa') {
      return selectedSubCategory === 'executive' ? '10-Year Golden Visa (Executive)' : '10-Year Golden Visa (Property Investor)';
    }
    return 'Domestic Helper / Maid Visa';
  };

  return (
    <div className={`w-full max-w-xl mx-auto bg-surface-primary/95 backdrop-blur-xl border border-brand-goldBg/30 p-6 sm:p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] relative overflow-hidden text-text-main ${className}`}>
      {/* Top Accent Shimmer */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gold-gradient" />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-brand-goldBg/10 text-brand-goldText border border-brand-goldBg/20">
            <Sparkles className="w-3.5 h-3.5" /> OFFICIAL TARIFF ENGINE
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-text-main mt-2 tracking-tight">
            UAE Residency Fee Calculator
          </h2>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-brand-goldBg/10 border border-brand-goldBg/30 flex items-center justify-center text-brand-goldText shrink-0">
          <CalcIcon className="w-5 h-5" />
        </div>
      </div>

      <div className="space-y-5">
        
        {/* Step 1: Main Service Category Selection */}
        <div>
          <label className="block text-xs font-mono font-bold uppercase text-text-muted mb-2">
            1. Select Primary Service Goal
          </label>
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full bg-surface-primary/50 border border-brand-goldBg/30 text-text-main rounded-xl p-4 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-goldBg transition-all font-bold text-sm cursor-pointer"
            >
              <option value="family-visa" className="bg-surface-primary text-text-main">Family Residence Visa (Spouse, Children, Parents)</option>
              <option value="golden-visa" className="bg-surface-primary text-text-main">10-Year Golden Visa (Property or Executive)</option>
              <option value="domestic-worker" className="bg-surface-primary text-text-main">Domestic Helper / Maid Visa (Tadbeer)</option>
            </select>
            <ChevronDown className="w-5 h-5 text-brand-goldText absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Step 2: Cascading Secondary Dropdown (Family Member Selection) */}
        {selectedCategory === 'family-visa' && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-300">
            <label className="block text-xs font-mono font-bold uppercase text-brand-goldText mb-2">
              2. Select Family Member
            </label>
            <div className="relative">
              <select
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
                className="w-full bg-surface-primary/50 border border-brand-goldBg/40 text-text-main rounded-xl p-4 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-goldBg transition-all font-bold text-sm cursor-pointer shadow-sm"
              >
                <option value="spouse" className="bg-surface-primary text-text-main">Spouse (Husband / Wife Residence Visa)</option>
                <option value="child" className="bg-surface-primary text-text-main">Child Dependent (Under 18 Years - No Medical Fee)</option>
                <option value="parent" className="bg-surface-primary text-text-main">Parents Residence Visa (1-Year Renewable)</option>
              </select>
              <ChevronDown className="w-5 h-5 text-brand-goldText absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        )}

        {/* Golden Visa Sub-Category Selector */}
        {selectedCategory === 'golden-visa' && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-300">
            <label className="block text-xs font-mono font-bold uppercase text-brand-goldText mb-2">
              2. Select Golden Visa Track
            </label>
            <div className="relative">
              <select
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
                className="w-full bg-surface-primary/50 border border-brand-goldBg/40 text-text-main rounded-xl p-4 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-goldBg transition-all font-bold text-sm cursor-pointer shadow-sm"
              >
                <option value="property" className="bg-surface-primary text-text-main">Property Investor Track (AED 2,000,000+ Real Estate Title Deed)</option>
                <option value="executive" className="bg-surface-primary text-text-main">Executive / High Salary Track (AED 30,000+ Monthly Salary)</option>
              </select>
              <ChevronDown className="w-5 h-5 text-brand-goldText absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        )}

        {/* Mandatory Segmented Location Control */}
        <div>
          <label className="block text-xs font-mono font-bold uppercase text-text-muted mb-2">
            3. Applicant Current Location (Mandatory)
          </label>
          <div className="grid grid-cols-2 gap-3 p-1.5 bg-surface-primary/50 rounded-2xl border border-brand-goldBg/20">
            <button
              type="button"
              onClick={() => setLocationStatus('outsideUAE')}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                locationStatus === 'outsideUAE'
                  ? 'bg-gold-gradient text-black shadow-md shadow-brand-goldBg/30 ring-2 ring-brand-goldBg'
                  : 'text-text-muted hover:text-text-main hover:bg-surface-primary'
              }`}
            >
              <Plane className="w-4 h-4 shrink-0" />
              <span>Outside UAE</span>
            </button>

            <button
              type="button"
              onClick={() => setLocationStatus('insideUAE')}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                locationStatus === 'insideUAE'
                  ? 'bg-gold-gradient text-black shadow-md shadow-brand-goldBg/30 ring-2 ring-brand-goldBg'
                  : 'text-text-muted hover:text-text-main hover:bg-surface-primary'
              }`}
            >
              <MapPin className="w-4 h-4 shrink-0" />
              <span>Inside UAE (+Status Change)</span>
            </button>
          </div>
        </div>

        {/* Optional Add-on Toggles */}
        <div className="pt-2 border-t border-brand-goldBg/10 space-y-3">
          <label className="block text-xs font-mono font-bold uppercase text-text-muted mb-1">
            4. Optional Express Upgrades & Add-ons
          </label>

          {addonsList.map((addon) => {
            const isChecked = !!selectedAddons[addon.id];
            return (
              <div
                key={addon.id}
                onClick={() => toggleAddon(addon.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs font-bold ${
                  isChecked
                    ? 'border-brand-goldBg bg-brand-goldBg/10 text-text-main shadow-sm'
                    : 'border-brand-goldBg/15 bg-surface-primary/30 text-text-muted hover:border-brand-goldBg/40 hover:text-text-main'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                    isChecked ? 'bg-brand-goldBg border-brand-goldBg text-black' : 'border-slate-500'
                  }`}>
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span>{addon.label}</span>
                </div>
                <span className="font-mono text-brand-goldText shrink-0 ml-2">
                  +AED {addon.extraCharge}
                </span>
              </div>
            );
          })}
        </div>

      </div>

      {/* Total Display Box */}
      <div className="bg-brand-goldBg/10 border-t border-brand-goldBg/20 p-5 mt-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono text-text-muted uppercase font-bold block">
            Itemized Total ({getDisplayTitle()})
          </span>
          <span className="text-xs text-brand-goldText font-medium flex items-center gap-1 mt-0.5">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Itemized • Includes Government & Typing Tariffs
          </span>
        </div>

        <div className="text-right sm:text-right w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3">
          <div className="text-3xl sm:text-4xl font-black text-brand-goldText font-mono tracking-tight">
            AED {grandTotal.toLocaleString('en-AE')}
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <button
        onClick={() => onOpenModal && onOpenModal(selectedCategory)}
        className="w-full mt-4 py-4 rounded-xl bg-gold-gradient text-black text-sm font-extrabold flex items-center justify-center gap-2.5 shadow-lg shadow-brand-goldBg/25 hover:brightness-110 hover:-translate-y-0.5 transition-all cursor-pointer btn-shine-effect"
      >
        <CalcIcon className="w-4 h-4 text-black" />
        <span>Get Instant Itemized Invoice</span>
      </button>

    </div>
  );
}
