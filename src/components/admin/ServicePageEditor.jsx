import React, { useState, useEffect } from 'react';
import { FileText, Plus, Trash2, Save, CheckCircle2, DollarSign, HelpCircle, ListCheck, Sparkles, Navigation } from 'lucide-react';
import { servicesData } from '../../data/cmsData';
import { visaServices } from '../../data/propertyVisaData';

// Combine all possible services into a dropdown list
const allServices = [...servicesData, ...visaServices];
const SERVICE_PAGES = allServices.map(s => ({ id: s.id, name: s.title }));

export default function ServicePageEditor({ cmsConfig, setCmsConfig }) {
  const [selectedService, setSelectedService] = useState(SERVICE_PAGES[0]?.id || 'golden-visa');
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

  useEffect(() => {
    // Load from CMS Config if overridden, otherwise load from hardcoded default data
    const overrideData = cmsConfig?.servicePages?.[selectedService];
    const defaultData = allServices.find(s => s.id === selectedService) || {};

    const activeData = { ...defaultData, ...overrideData };

    setSlug(activeData.slug || activeData.id || '');
    setTitle(activeData.title || '');
    setSubtitle(activeData.subtitle || '');
    setHeroDescription(activeData.heroDescription || activeData.overview || '');
    setStartingPrice(activeData.pricing?.totalEstimate || activeData.startingPrice || '');
    setProcessingTime(activeData.processingTime || '');
    
    setBenefits(activeData.benefits || []);
    setRequirements(activeData.requirements || activeData.documents || []);
    setProcessSteps(activeData.processSteps || []);
  }, [selectedService, cmsConfig]);

  // Array Handlers
  const handleAddBenefit = () => setBenefits([...benefits, { title: 'New Benefit', desc: '' }]);
  const handleUpdateBenefit = (idx, field, value) => {
    const updated = [...benefits];
    updated[idx][field] = value;
    setBenefits(updated);
  };
  const handleDeleteBenefit = (idx) => setBenefits(benefits.filter((_, i) => i !== idx));

  const handleAddRequirement = () => setRequirements([...requirements, 'New requirement']);
  const handleUpdateRequirement = (idx, value) => {
    const updated = [...requirements];
    updated[idx] = value;
    setRequirements(updated);
  };
  const handleDeleteRequirement = (idx) => setRequirements(requirements.filter((_, i) => i !== idx));

  const handleAddProcessStep = () => setProcessSteps([...processSteps, { title: 'New Step', desc: '' }]);
  const handleUpdateProcessStep = (idx, field, value) => {
    const updated = [...processSteps];
    updated[idx][field] = value;
    setProcessSteps(updated);
  };
  const handleDeleteProcessStep = (idx) => setProcessSteps(processSteps.filter((_, i) => i !== idx));

  // Save Handler
  const handleSave = () => {
    // Mock save process with console.log
    console.log("Saving Service Data:", {
      slug, title, subtitle, heroDescription, startingPrice, processingTime, benefits, requirements, processSteps
    });

    const updatedServiceData = {
      slug,
      title,
      subtitle,
      heroDescription,
      startingPrice,
      processingTime,
      benefits,
      requirements,
      processSteps
    };

    setCmsConfig(prev => ({
      ...prev,
      servicePages: {
        ...(prev.servicePages || {}),
        [selectedService]: updatedServiceData
      }
    }));

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-display font-bold text-brand-gold flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Services Manager
          </h2>
          <p className="text-sm text-slate-400 mt-1">Manage standard inputs and dynamic arrays for your services.</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="px-4 py-2 bg-transparent border border-white/20 rounded-lg text-sm font-medium text-white focus:outline-none focus:border-brand-gold min-w-[200px]"
          >
            {SERVICE_PAGES.map(page => (
              <option key={page.id} value={page.id} className="bg-[#121417] text-white">{page.name}</option>
            ))}
          </select>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] hover:opacity-90 text-black px-6 py-2.5 rounded-lg font-bold text-sm transition-all shadow-md"
          >
            {saveSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saveSuccess ? 'Saved' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Basic Info Column */}
        <div className="bg-[#121417] border border-white/10 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white mb-4">Standard Information</h3>
          
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">ID (Slug)</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full bg-transparent border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-gold"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-gold"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Subtitle</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full bg-transparent border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-gold"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Hero Description</label>
            <textarea
              value={heroDescription}
              onChange={(e) => setHeroDescription(e.target.value)}
              rows="3"
              className="w-full bg-transparent border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-gold resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Starting Price</label>
              <input
                type="text"
                value={startingPrice}
                onChange={(e) => setStartingPrice(e.target.value)}
                className="w-full bg-transparent border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-gold"
                placeholder="AED 5,000"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Processing Time</label>
              <input
                type="text"
                value={processingTime}
                onChange={(e) => setProcessingTime(e.target.value)}
                className="w-full bg-transparent border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-gold"
                placeholder="3-5 Days"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Arrays Column */}
        <div className="space-y-6">
          
          {/* Benefits Array */}
          <div className="bg-[#121417] border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-gold" />
                Benefits
              </h3>
              <button onClick={handleAddBenefit} className="text-xs font-bold text-brand-gold hover:opacity-80 flex items-center gap-1">
                <Plus className="w-4 h-4" /> Add Item
              </button>
            </div>
            <div className="space-y-3">
              {benefits.map((item, idx) => (
                <div key={idx} className="flex gap-3 bg-surface/5 p-3 rounded-xl border border-white/10">
                  <div className="flex-1 space-y-2">
                    <input type="text" value={item.title} onChange={(e) => handleUpdateBenefit(idx, 'title', e.target.value)} className="w-full bg-transparent border-b border-white/20 px-2 py-1 text-sm font-bold text-white focus:outline-none focus:border-brand-gold" placeholder="Benefit Title" />
                    <input type="text" value={item.desc} onChange={(e) => handleUpdateBenefit(idx, 'desc', e.target.value)} className="w-full bg-transparent border-none px-2 py-1 text-sm text-slate-300 focus:outline-none" placeholder="Description" />
                  </div>
                  <button onClick={() => handleDeleteBenefit(idx)} className="text-content-muted hover:text-red-500 p-2 h-fit"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>

          {/* Requirements Array */}
          <div className="bg-[#121417] border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ListCheck className="w-5 h-5 text-brand-gold" />
                Requirements
              </h3>
              <button onClick={handleAddRequirement} className="text-xs font-bold text-brand-gold hover:opacity-80 flex items-center gap-1">
                <Plus className="w-4 h-4" /> Add Item
              </button>
            </div>
            <div className="space-y-3">
              {requirements.map((req, idx) => (
                <div key={idx} className="flex gap-3 bg-surface/5 p-3 rounded-xl border border-white/10 items-center">
                  <input type="text" value={req} onChange={(e) => handleUpdateRequirement(idx, e.target.value)} className="flex-1 bg-transparent border-none px-2 py-1 text-sm text-white focus:outline-none" placeholder="Requirement string" />
                  <button onClick={() => handleDeleteRequirement(idx)} className="text-content-muted hover:text-red-500 p-2"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>

          {/* Process Steps Array */}
          <div className="bg-[#121417] border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Navigation className="w-5 h-5 text-brand-gold" />
                Process Steps
              </h3>
              <button onClick={handleAddProcessStep} className="text-xs font-bold text-brand-gold hover:opacity-80 flex items-center gap-1">
                <Plus className="w-4 h-4" /> Add Item
              </button>
            </div>
            <div className="space-y-3">
              {processSteps.map((step, idx) => (
                <div key={idx} className="flex gap-3 bg-surface/5 p-3 rounded-xl border border-white/10">
                  <div className="flex-1 space-y-2">
                    <input type="text" value={step.title} onChange={(e) => handleUpdateProcessStep(idx, 'title', e.target.value)} className="w-full bg-transparent border-b border-white/20 px-2 py-1 text-sm font-bold text-white focus:outline-none focus:border-brand-gold" placeholder="Step Title" />
                    <textarea value={step.desc} onChange={(e) => handleUpdateProcessStep(idx, 'desc', e.target.value)} rows="2" className="w-full bg-transparent border-none px-2 py-1 text-sm text-slate-300 focus:outline-none resize-none" placeholder="Step Description" />
                  </div>
                  <button onClick={() => handleDeleteProcessStep(idx)} className="text-content-muted hover:text-red-500 p-2 h-fit"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
