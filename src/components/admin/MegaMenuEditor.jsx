import React, { useState, useEffect } from 'react';
import { 
  Building, Award, Users, Baby, UserCheck, CreditCard, 
  FileText, Building2, CheckCircle2, Languages, Scale, 
  FileCheck, ShieldCheck, TrendingUp, Stethoscope, Clock, Shield,
  Plus, Trash2, Save, Sparkles, Menu, LayoutGrid, ArrowUp, ArrowDown
} from 'lucide-react';
import { db } from '../../firebase';
import { ref, set } from 'firebase/database';

const DEFAULT_TOP_FEATURED = [
  { title: 'Property Visa', subtitle: 'DLD Real Estate Investor', icon: 'Building', serviceId: 'property-visa', category: 'golden', price: 'AED 2,150', tag: 'DLD 10-YR' },
  { title: 'Golden Visa', subtitle: '10-Year Residency VIP', icon: 'Award', serviceId: 'golden-visa', category: 'golden', price: 'AED 2,450', tag: '10-YEAR' },
  { title: 'Family Visa', subtitle: 'Spouse & Children Clearance', icon: 'Users', serviceId: 'family-visa', category: 'residency', price: 'AED 1,450', tag: 'POPULAR' },
  { title: 'Newborn Visa', subtitle: '120-Day Fast Clearance', icon: 'Baby', serviceId: 'new-born-visa', category: 'residency', price: 'AED 1,250', tag: 'INFANT' },
  { title: 'Maid Visa', subtitle: 'Domestic Helper Quota', icon: 'UserCheck', serviceId: 'maid-visa', category: 'residency', price: 'AED 1,650', tag: 'TADBEER' },
  { title: 'Emirates ID', subtitle: 'VIP Medical & Biometrics', icon: 'CreditCard', serviceId: 'emirates-id', category: 'residency', price: 'AED 390', tag: '30-MIN' }
];

const DEFAULT_ALL_SERVICES = [
  { title: 'PRO Services', subtitle: 'MOHRE Quota & Trade License Renewal', icon: 'FileText', serviceId: 'pro-services', category: 'corporate' },
  { title: 'Amer Center GDRFA', subtitle: 'Official Typing & Entry Permit Desk', icon: 'Building2', serviceId: 'amer-center', category: 'residency' },
  { title: 'Document Attestation', subtitle: 'MOFA & Foreign Embassy Verification', icon: 'CheckCircle2', serviceId: 'attestation', category: 'legal' },
  { title: 'Legal Translation', subtitle: 'MOJ Sworn Multi-Language Translation', icon: 'Languages', serviceId: 'translation', category: 'legal' },
  { title: 'Power of Attorney', subtitle: 'POA Drafting & Notary Representation', icon: 'Scale', serviceId: 'poa', category: 'legal' },
  { title: 'Wills & Testament', subtitle: 'DIFC & Dubai Courts Asset Protection', icon: 'FileCheck', serviceId: 'wills-testament', category: 'legal' },
  { title: 'DLD Trustee Services', subtitle: 'Property Sale & Transfer Title Clearance', icon: 'ShieldCheck', serviceId: 'dld-trustee', category: 'golden' },
  { title: 'Property Revaluation', subtitle: 'Official DLD Valuation Certificate', icon: 'TrendingUp', serviceId: 'property-revaluation', category: 'golden' },
  { title: 'Medical & EID Package', subtitle: 'VIP DHA Medical Fitness & EIDA Typing', icon: 'Stethoscope', serviceId: 'medical-eid', category: 'residency' },
  { title: 'Visa Validity Checker', subtitle: 'ICP & GDRFA Overstay Status Audit', icon: 'Clock', serviceId: 'visa-checker', category: 'residency' },
  { title: 'ILOE Insurance', subtitle: 'Mandatory UAE Unemployment Shield', icon: 'Shield', serviceId: 'iloe-insurance', category: 'corporate' }
];

export default function MegaMenuEditor({ cmsConfig, setCmsConfig }) {
  const [topFeatured, setTopFeatured] = useState(
    cmsConfig?.megaMenu?.topFeatured && Array.isArray(cmsConfig.megaMenu.topFeatured) && cmsConfig.megaMenu.topFeatured.length > 0
      ? cmsConfig.megaMenu.topFeatured
      : DEFAULT_TOP_FEATURED
  );

  const [allServices, setAllServices] = useState(
    cmsConfig?.megaMenu?.allServicesList && Array.isArray(cmsConfig.megaMenu.allServicesList) && cmsConfig.megaMenu.allServicesList.length > 0
      ? cmsConfig.megaMenu.allServicesList
      : DEFAULT_ALL_SERVICES
  );

  const [activeTab, setActiveTab] = useState('featured');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (cmsConfig?.megaMenu?.topFeatured && Array.isArray(cmsConfig.megaMenu.topFeatured)) {
      setTopFeatured(cmsConfig.megaMenu.topFeatured);
    }
    if (cmsConfig?.megaMenu?.allServicesList && Array.isArray(cmsConfig.megaMenu.allServicesList)) {
      setAllServices(cmsConfig.megaMenu.allServicesList);
    }
  }, [cmsConfig]);

  // Featured Item Handlers
  const handleAddFeatured = () => {
    setTopFeatured([
      ...topFeatured,
      { title: 'New Service', subtitle: 'Service subtitle...', icon: 'Award', serviceId: 'family-visa', category: 'residency', price: 'AED 1,000', tag: 'NEW' }
    ]);
  };

  const handleUpdateFeatured = (idx, field, val) => {
    const updated = [...topFeatured];
    updated[idx][field] = val;
    setTopFeatured(updated);
  };

  const handleDeleteFeatured = (idx) => {
    setTopFeatured(topFeatured.filter((_, i) => i !== idx));
  };

  // All Services List Handlers
  const handleAddService = () => {
    setAllServices([
      ...allServices,
      { title: 'New Service Item', subtitle: 'Service description...', icon: 'FileText', serviceId: 'pro-services', category: 'corporate' }
    ]);
  };

  const handleUpdateService = (idx, field, val) => {
    const updated = [...allServices];
    updated[idx][field] = val;
    setAllServices(updated);
  };

  const handleDeleteService = (idx) => {
    setAllServices(allServices.filter((_, i) => i !== idx));
  };

  // Move items
  const handleMoveFeatured = (idx, dir) => {
    const updated = [...topFeatured];
    const target = dir === 'up' ? idx - 1 : idx + 1;
    if (target < 0 || target >= updated.length) return;
    const temp = updated[idx];
    updated[idx] = updated[target];
    updated[target] = temp;
    setTopFeatured(updated);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const megaMenuConfig = {
      topFeatured,
      allServicesList: allServices
    };

    if (setCmsConfig) {
      setCmsConfig(prev => ({ ...prev, megaMenu: megaMenuConfig }));
    }

    try {
      const cmsRef = ref(db, 'cmsConfig/megaMenu');
      await set(cmsRef, megaMenuConfig);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch(err) {
      alert("Error saving mega menu to Firebase: " + err.message);
    }
  };

  return (
    <div className="max-w-6xl space-y-6 animate-fadeIn pb-16">
      
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-brand-darkSurface border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Header Navigation & Directory Modal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Services Mega-Menu CMS
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
              Configure featured flagship services cards and full directory items in the header dropdown modal.
            </p>
          </div>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Publish Mega Menu</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-semibold flex items-center gap-3 shadow-lg animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span>Services mega-menu configuration published live!</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 p-2 rounded-2xl shadow-xl">
        <button
          type="button"
          onClick={() => setActiveTab('featured')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
            activeTab === 'featured'
              ? 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black shadow-lg shadow-amber-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>1. Flagship Featured Grid ({topFeatured.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
            activeTab === 'all'
              ? 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black shadow-lg shadow-amber-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
          <span>2. Additional Directory Services ({allServices.length})</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">

        {/* TAB 1: FLAGSHIP FEATURED GRID */}
        {activeTab === 'featured' && (
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div>
                <h3 className="font-display font-bold text-base text-white">Top 6 Flagship Featured Cards</h3>
                <p className="text-slate-400 text-xs">These 6 luxury cards are rendered in the top grid of the mega menu</p>
              </div>
              <button
                type="button"
                onClick={handleAddFeatured}
                className="px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Featured Card
              </button>
            </div>

            <div className="space-y-4">
              {topFeatured.map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-950/80 border border-slate-800/80 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400">CARD #{idx + 1} — {item.title}</span>
                    <div className="flex items-center gap-1.5">
                      <button type="button" disabled={idx === 0} onClick={() => handleMoveFeatured(idx, 'up')} className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white"><ArrowUp className="w-3.5 h-3.5" /></button>
                      <button type="button" disabled={idx === topFeatured.length - 1} onClick={() => handleMoveFeatured(idx, 'down')} className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white"><ArrowDown className="w-3.5 h-3.5" /></button>
                      <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDeleteFeatured(idx); }} className="p-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 cursor-pointer" title="Delete Card"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-400 font-medium mb-1">Title</label>
                      <input type="text" value={item.title || ''} onChange={(e) => handleUpdateFeatured(idx, 'title', e.target.value)} className="w-full bg-slate-900 border border-slate-700/60 rounded-xl px-3 py-2 text-white font-bold" />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-medium mb-1">Subtitle</label>
                      <input type="text" value={item.subtitle || ''} onChange={(e) => handleUpdateFeatured(idx, 'subtitle', e.target.value)} className="w-full bg-slate-900 border border-slate-700/60 rounded-xl px-3 py-2 text-slate-300" />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-medium mb-1">Price Tag</label>
                      <input type="text" value={item.price || ''} onChange={(e) => handleUpdateFeatured(idx, 'price', e.target.value)} className="w-full bg-slate-900 border border-slate-700/60 rounded-xl px-3 py-2 text-emerald-400 font-mono font-bold" placeholder="AED 2,150" />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-medium mb-1">Route Service ID</label>
                      <input type="text" value={item.serviceId || ''} onChange={(e) => handleUpdateFeatured(idx, 'serviceId', e.target.value)} className="w-full bg-slate-900 border border-slate-700/60 rounded-xl px-3 py-2 text-amber-300 font-mono" placeholder="property-visa" />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-medium mb-1">Filter Category</label>
                      <select value={item.category || 'residency'} onChange={(e) => handleUpdateFeatured(idx, 'category', e.target.value)} className="w-full bg-slate-900 border border-slate-700/60 rounded-xl px-3 py-2 text-white cursor-pointer">
                        <option value="residency">Family & Residency</option>
                        <option value="golden">Golden & Property</option>
                        <option value="corporate">Business & PRO</option>
                        <option value="legal">Attestation & Legal</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 font-medium mb-1">Badge Tag</label>
                      <input type="text" value={item.tag || ''} onChange={(e) => handleUpdateFeatured(idx, 'tag', e.target.value)} className="w-full bg-slate-900 border border-slate-700/60 rounded-xl px-3 py-2 text-amber-400 font-mono" placeholder="MOST POPULAR" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: ADDITIONAL DIRECTORY SERVICES */}
        {activeTab === 'all' && (
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div>
                <h3 className="font-display font-bold text-base text-white">Additional Directory Services</h3>
                <p className="text-slate-400 text-xs">Secondary grid items in the mega menu dropdown</p>
              </div>
              <button
                type="button"
                onClick={handleAddService}
                className="px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Directory Item
              </button>
            </div>

            <div className="space-y-4">
              {allServices.map((srv, idx) => (
                <div key={idx} className="p-4 bg-slate-950/80 border border-slate-800/80 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400">ITEM #{idx + 1} — {srv.title}</span>
                    <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDeleteService(idx); }} className="p-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 cursor-pointer" title="Delete Item"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-400 font-medium mb-1">Service Title</label>
                      <input type="text" value={srv.title || ''} onChange={(e) => handleUpdateService(idx, 'title', e.target.value)} className="w-full bg-slate-900 border border-slate-700/60 rounded-xl px-3 py-2 text-white font-bold" />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-medium mb-1">Subtitle</label>
                      <input type="text" value={srv.subtitle || ''} onChange={(e) => handleUpdateService(idx, 'subtitle', e.target.value)} className="w-full bg-slate-900 border border-slate-700/60 rounded-xl px-3 py-2 text-slate-300" />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-medium mb-1">Route Service ID</label>
                      <input type="text" value={srv.serviceId || ''} onChange={(e) => handleUpdateService(idx, 'serviceId', e.target.value)} className="w-full bg-slate-900 border border-slate-700/60 rounded-xl px-3 py-2 text-amber-300 font-mono" placeholder="pro-services" />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-medium mb-1">Filter Category</label>
                      <select value={srv.category || 'residency'} onChange={(e) => handleUpdateService(idx, 'category', e.target.value)} className="w-full bg-slate-900 border border-slate-700/60 rounded-xl px-3 py-2 text-white cursor-pointer">
                        <option value="residency">Family & Residency</option>
                        <option value="golden">Golden & Property</option>
                        <option value="corporate">Business & PRO</option>
                        <option value="legal">Attestation & Legal</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Floating Save Button */}
        <div className="pt-4 sticky bottom-4 z-20">
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-base rounded-xl shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
          >
            <Save className="w-5 h-5" />
            <span>Publish Services Mega-Menu CMS</span>
          </button>
        </div>

      </form>

    </div>
  );
}
