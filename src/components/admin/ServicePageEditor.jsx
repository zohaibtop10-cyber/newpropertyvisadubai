import React, { useState, useEffect } from 'react';
import { FileText, Plus, Trash2, Save, CheckCircle2, HelpCircle, ListCheck, Sparkles, Navigation, Globe, ArrowRight } from 'lucide-react';
import { servicesData } from '../../data/cmsData';

const ALL_17_SERVICE_PAGES = [
  { id: 'property-visa', name: '1. Property Visa (Investor)' },
  { id: 'golden-visa', name: '2. 10-Year Golden Visa' },
  { id: 'family-visa', name: '3. Family & Spouse Visa' },
  { id: 'newborn-visa', name: '4. Newborn Baby Visa' },
  { id: 'maid-visa', name: '5. Maid & Domestic Visa' },
  { id: 'emirates-id', name: '6. Emirates ID & Medical' },
  { id: 'pro-services', name: '7. B2B Corporate PRO Services' },
  { id: 'amer-center', name: '8. Amer Center Directory' },
  { id: 'attestation', name: '9. MOFA Document Attestation' },
  { id: 'legal-translation', name: '10. Sworn Legal Translation' },
  { id: 'poa', name: '11. Power of Attorney (POA)' },
  { id: 'wills-last-testament', name: '12. Wills & Last Testament' },
  { id: 'dld-trustee', name: '13. DLD Property Trustee' },
  { id: 'property-revaluation', name: '14. Property Revaluation' },
  { id: 'medical-eid', name: '15. Visa Medical & EID Locations' },
  { id: 'iloe-insurance', name: '16. ILOE Insurance Check' },
  { id: 'visa-validity', name: '17. Visa Validity & Fine Audit' }
];

export default function ServicePageEditor({ cmsConfig, setCmsConfig }) {
  const [selectedService, setSelectedService] = useState('property-visa');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form State
  const [slug, setSlug] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [heroDescription, setHeroDescription] = useState('');
  const [startingPrice, setStartingPrice] = useState('');
  const [processingTime, setProcessingTime] = useState('');
  const [benefits, setBenefits] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [processSteps, setProcessSteps] = useState([]);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const defaultData = (servicesData || []).find(s => s.id === selectedService || s.slug === selectedService) || {};
    const activeData = cmsConfig?.servicePages?.[selectedService] || {};

    setSlug(activeData.slug || defaultData.slug || selectedService);
    setTitle(activeData.title || defaultData.title || '');
    setSubtitle(activeData.subtitle || defaultData.subtitle || '');
    setHeroDescription(activeData.heroDescription || activeData.overview || defaultData.overview || defaultData.heroDescription || '');
    setStartingPrice(activeData.startingPrice || (defaultData.pricing ? `AED ${defaultData.pricing.advisoryRetainer || defaultData.pricing.statutoryGovTariff}` : ''));
    setProcessingTime(typeof activeData.processingTime === 'string' ? activeData.processingTime : (defaultData.processingTime?.standard || ''));
    
    setBenefits(Array.isArray(activeData.benefits) ? activeData.benefits : (defaultData.benefits || []));
    
    const reqs = Array.isArray(activeData.requirements)
      ? activeData.requirements
      : (defaultData.documents ? defaultData.documents.map(d => (typeof d === 'string' ? { name: d, req: 'Mandatory', hint: '' } : d)) : []);
    setRequirements(reqs);

    setProcessSteps(Array.isArray(activeData.processSteps) ? activeData.processSteps : (defaultData.processSteps || []));
    setFaqs(Array.isArray(activeData.faqs) ? activeData.faqs : (defaultData.faqs || []));
  }, [selectedService, cmsConfig]);

  // Array Handlers
  const handleAddBenefit = () => setBenefits([...benefits, { title: 'New Capability / Benefit', desc: '' }]);
  const handleUpdateBenefit = (idx, field, value) => {
    const updated = [...benefits];
    updated[idx][field] = value;
    setBenefits(updated);
  };
  const handleDeleteBenefit = (idx) => setBenefits(benefits.filter((_, i) => i !== idx));

  const handleAddRequirement = () => setRequirements([...requirements, { name: 'New Document Item', req: 'Mandatory', hint: 'Document instructions' }]);
  const handleUpdateRequirement = (idx, field, value) => {
    const updated = [...requirements];
    if (typeof updated[idx] === 'string') {
      updated[idx] = { name: value, req: 'Mandatory', hint: '' };
    } else {
      updated[idx][field] = value;
    }
    setRequirements(updated);
  };
  const handleDeleteRequirement = (idx) => setRequirements(requirements.filter((_, i) => i !== idx));

  const handleAddProcessStep = () => setProcessSteps([...processSteps, { title: 'New Step Title', desc: '' }]);
  const handleUpdateProcessStep = (idx, field, value) => {
    const updated = [...processSteps];
    updated[idx][field] = value;
    setProcessSteps(updated);
  };
  const handleDeleteProcessStep = (idx) => setProcessSteps(processSteps.filter((_, i) => i !== idx));

  const handleAddFaq = () => setFaqs([...faqs, { question: 'Question?', answer: 'Answer text...' }]);
  const handleUpdateFaq = (idx, field, value) => {
    const updated = [...faqs];
    updated[idx][field] = value;
    setFaqs(updated);
  };
  const handleDeleteFaq = (idx) => setFaqs(faqs.filter((_, i) => i !== idx));

  // Save Handler
  const handleSave = () => {
    const updatedServiceData = {
      slug,
      title,
      subtitle,
      heroDescription,
      startingPrice,
      processingTime,
      benefits,
      requirements,
      processSteps,
      faqs,
      updatedAt: new Date().toISOString()
    };

    setCmsConfig(prev => ({
      ...prev,
      servicePages: {
        ...(prev?.servicePages || {}),
        [selectedService]: updatedServiceData
      }
    }));

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="max-w-6xl space-y-6 animate-fadeIn pb-16">
      {/* Top Selector & Action Header */}
      <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
              Bespoke Service Pages Editor
            </h2>
            <p className="text-slate-400 text-xs mt-0.5">
              Select and edit any of the 17 UAE service pages with instant real-time synchronization.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="px-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-amber-500/50 min-w-[260px] cursor-pointer"
            >
              {ALL_17_SERVICE_PAGES.map(page => (
                <option key={page.id} value={page.id} className="bg-slate-900 text-white">
                  {page.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black px-6 py-2.5 rounded-xl font-extrabold text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            {saveSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saveSuccess ? 'Saved to Live Site!' : 'Save & Publish Service Page'}
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-semibold flex items-center gap-3 shadow-lg animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span>Service page data published live and synced to state!</span>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column: Hero & Overview */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-7 shadow-xl space-y-5">
          <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white">Hero Section & Pricing</h3>
              <p className="text-slate-400 text-xs">Core titles, SLA timelines, and starting fee</p>
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Service Route Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Hero Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white font-medium focus:outline-none focus:border-amber-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Subtitle / Tagline</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Hero Overview Copy</label>
            <textarea
              value={heroDescription}
              onChange={(e) => setHeroDescription(e.target.value)}
              rows="4"
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500/50 resize-none leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Base Service Fee</label>
              <input
                type="text"
                value={startingPrice}
                onChange={(e) => setStartingPrice(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-amber-400 font-bold focus:outline-none focus:border-amber-500/50"
                placeholder="AED 4,000"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Turnaround SLA</label>
              <input
                type="text"
                value={processingTime}
                onChange={(e) => setProcessingTime(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/50"
                placeholder="3-5 Business Days"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Lists */}
        <div className="space-y-6">
          
          {/* Bento Capabilities Array */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="font-display font-bold text-sm text-white">Capabilities & Key Benefits</h3>
              </div>
              <button onClick={handleAddBenefit} className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer">
                <Plus className="w-3.5 h-3.5" /> Add Item
              </button>
            </div>
            <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
              {benefits.map((item, idx) => (
                <div key={idx} className="flex gap-3 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80 items-start">
                  <div className="flex-1 space-y-2">
                    <input type="text" value={item.title || ''} onChange={(e) => handleUpdateBenefit(idx, 'title', e.target.value)} className="w-full bg-slate-900 border border-slate-700/60 rounded-lg px-3 py-1.5 text-xs font-bold text-amber-300 focus:outline-none" placeholder="Card Title" />
                    <input type="text" value={item.desc || ''} onChange={(e) => handleUpdateBenefit(idx, 'desc', e.target.value)} className="w-full bg-slate-900 border border-slate-700/60 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none" placeholder="Description" />
                  </div>
                  <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDeleteBenefit(idx); }} className="text-slate-500 hover:text-red-400 p-1.5 transition-colors cursor-pointer" title="Remove Item"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>

          {/* Documents Array */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2.5">
                <ListCheck className="w-4 h-4 text-sky-400" />
                <h3 className="font-display font-bold text-sm text-white">Document Pre-Requisites</h3>
              </div>
              <button type="button" onClick={handleAddRequirement} className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer">
                <Plus className="w-3.5 h-3.5" /> Add Document
              </button>
            </div>
            <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
              {requirements.map((req, idx) => {
                const docObj = typeof req === 'string' ? { name: req, req: 'Mandatory', hint: '' } : req;
                return (
                  <div key={idx} className="flex gap-3 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80 items-start">
                    <div className="flex-1 space-y-2">
                      <input type="text" value={docObj.name || ''} onChange={(e) => handleUpdateRequirement(idx, 'name', e.target.value)} className="w-full bg-slate-900 border border-slate-700/60 rounded-lg px-3 py-1.5 text-xs font-semibold text-white focus:outline-none" placeholder="Document Name" />
                      <input type="text" value={docObj.hint || ''} onChange={(e) => handleUpdateRequirement(idx, 'hint', e.target.value)} className="w-full bg-slate-900 border border-slate-700/60 rounded-lg px-3 py-1.5 text-xs text-slate-400 focus:outline-none" placeholder="Instructions / Hint" />
                    </div>
                    <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDeleteRequirement(idx); }} className="text-slate-500 hover:text-red-400 p-1.5 transition-colors cursor-pointer" title="Remove Item"><Trash2 className="w-4 h-4" /></button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Process Timeline Steps */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2.5">
                <Navigation className="w-4 h-4 text-emerald-400" />
                <h3 className="font-display font-bold text-sm text-white">Process Timeline Steps</h3>
              </div>
              <button type="button" onClick={handleAddProcessStep} className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer">
                <Plus className="w-3.5 h-3.5" /> Add Step
              </button>
            </div>
            <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
              {processSteps.map((step, idx) => (
                <div key={idx} className="flex gap-3 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80 items-start">
                  <div className="flex-1 space-y-2">
                    <input type="text" value={step.title || ''} onChange={(e) => handleUpdateProcessStep(idx, 'title', e.target.value)} className="w-full bg-slate-900 border border-slate-700/60 rounded-lg px-3 py-1.5 text-xs font-semibold text-white focus:outline-none" placeholder="Step Title" />
                    <textarea value={step.desc || step.description || ''} onChange={(e) => handleUpdateProcessStep(idx, 'desc', e.target.value)} rows="2" className="w-full bg-slate-900 border border-slate-700/60 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none resize-none" placeholder="Step Description" />
                  </div>
                  <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDeleteProcessStep(idx); }} className="text-slate-500 hover:text-red-400 p-1.5 transition-colors cursor-pointer" title="Remove Item"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs Array */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4 text-purple-400" />
                <h3 className="font-display font-bold text-sm text-white">Service Page FAQs</h3>
              </div>
              <button type="button" onClick={handleAddFaq} className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer">
                <Plus className="w-3.5 h-3.5" /> Add FAQ
              </button>
            </div>
            <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
              {faqs.map((faq, idx) => (
                <div key={idx} className="flex gap-3 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80 items-start">
                  <div className="flex-1 space-y-2">
                    <input type="text" value={faq.q || faq.question || ''} onChange={(e) => handleUpdateFaq(idx, 'q', e.target.value)} className="w-full bg-slate-900 border border-slate-700/60 rounded-lg px-3 py-1.5 text-xs font-bold text-amber-300 focus:outline-none" placeholder="Question" />
                    <textarea value={faq.a || faq.answer || ''} onChange={(e) => handleUpdateFaq(idx, 'a', e.target.value)} rows="2" className="w-full bg-slate-900 border border-slate-700/60 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none resize-none" placeholder="Answer" />
                  </div>
                  <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDeleteFaq(idx); }} className="text-slate-500 hover:text-red-400 p-1.5 transition-colors cursor-pointer" title="Remove Item"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
