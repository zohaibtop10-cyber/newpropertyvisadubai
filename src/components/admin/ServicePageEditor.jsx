import React, { useState, useEffect } from 'react';
import { FileText, Plus, Trash2, Save, CheckCircle2, DollarSign, HelpCircle, ListCheck } from 'lucide-react';

const SERVICE_PAGES = [
  { id: 'golden-visa', name: '10-Year Property Golden Visa' },
  { id: 'spouse-visa', name: 'Spouse Residence Visa' },
  { id: 'children-visa', name: 'Children Dependant Visa' },
  { id: 'parents-visa', name: 'Parents Residency Visa' },
  { id: 'maid-visa', name: 'Maid & Domestic Helper Visa' }
];

export default function ServicePageEditor({ cmsConfig, setCmsConfig }) {
  const [selectedService, setSelectedService] = useState('golden-visa');
  const [saveSuccess, setSaveSuccess] = useState(false);


  useEffect(() => {
    if (cmsConfig?.servicePages?.[selectedService]) {
      const data = cmsConfig.servicePages[selectedService];
      if (data.feeRows) setFeeRows(data.feeRows);
      if (data.requirements) setRequirements(data.requirements);
      if (data.faqs) setFaqs(data.faqs);
    } else {
      // Default dummy data if nothing is saved yet
      setFeeRows([
        { id: 1, name: 'Statutory Government Tariff (ICP/GDRFA)', govtFee: '4,850', serviceFee: '1,450' },
        { id: 2, name: 'VIP Smart Medical Fitness & Emirates ID', govtFee: '1,195', serviceFee: '500' }
      ]);
      setRequirements([
        'Valid passport copy with minimum 6 months validity',
        'Health Insurance coverage in Dubai/UAE'
      ]);
      setFaqs([
        { id: 1, question: 'What is the processing timeframe?', answer: 'Initial approval is issued within 24 to 48 hours.' }
      ]);
    }
  }, [selectedService, cmsConfig]);

  // Fees repeater state
  const [feeRows, setFeeRows] = useState([
    { id: 1, name: 'Statutory Government Tariff (ICP/GDRFA)', govtFee: '4,850', serviceFee: '1,450' },
    { id: 2, name: 'VIP Smart Medical Fitness & Emirates ID', govtFee: '1,195', serviceFee: '500' }
  ]);

  // Requirements repeater state
  const [requirements, setRequirements] = useState([
    'Title Deed issued by Dubai Land Department (DLD) with valuation of AED 2,000,000+',
    'Valid passport copy with minimum 6 months validity',
    'Health Insurance coverage in Dubai/UAE'
  ]);

  // FAQ repeater state
  const [faqs, setFaqs] = useState([
    { id: 1, question: 'Can I sponsor my spouse and children under the 10-Year Golden Visa?', answer: 'Yes! Golden Visa holders can sponsor their spouse, sons (up to age 25), and unmarried daughters for the full 10-year duration.' },
    { id: 2, question: 'Is physical presence in the UAE required every 6 months?', answer: 'No. Golden Visa holders are exempt from the standard rule that invalidates residency if outside the UAE for more than 6 months.' }
  ]);

  // Handlers for Fees
  const handleAddFeeRow = () => {
    setFeeRows([
      ...feeRows,
      { id: Date.now(), name: 'New Fee Item', govtFee: '1,000', serviceFee: '500' }
    ]);
  };

  const handleUpdateFee = (id, field, value) => {
    setFeeRows(feeRows.map(row => row.id === id ? { ...row, [field]: value } : row));
  };

  const handleDeleteFee = (id) => {
    setFeeRows(feeRows.filter(row => row.id !== id));
  };

  // Handlers for Requirements
  const handleAddRequirement = () => {
    setRequirements([...requirements, 'New eligibility requirement detail']);
  };

  const handleUpdateRequirement = (idx, value) => {
    const updated = [...requirements];
    updated[idx] = value;
    setRequirements(updated);
  };

  const handleDeleteRequirement = (idx) => {
    setRequirements(requirements.filter((_, i) => i !== idx));
  };

  // Handlers for FAQs
  const handleAddFaq = () => {
    setFaqs([
      ...faqs,
      { id: Date.now(), question: 'What is the processing timeframe?', answer: 'Initial nomination approval is issued within 24 to 48 hours.' }
    ]);
  };

  const handleUpdateFaq = (id, field, value) => {
    setFaqs(faqs.map(faq => faq.id === id ? { ...faq, [field]: value } : faq));
  };

  const handleDeleteFaq = (id) => {
    setFaqs(faqs.filter(faq => faq.id !== id));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (setCmsConfig) {
      setCmsConfig(prev => ({
        ...prev,
        servicePages: {
          ...prev?.servicePages,
          [selectedService]: {
            feeRows,
            requirements,
            faqs
          }
        }
      }));
    }

    if (typeof window !== 'undefined') {
      const currentConfig = cmsConfig || {};
      const newConfig = {
        ...currentConfig,
        servicePages: {
          ...currentConfig.servicePages,
          [selectedService]: { feeRows, requirements, faqs }
        }
      };
      localStorage.setItem('app_cms_config', JSON.stringify(newConfig));
    }

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  return (
    <div className="max-w-4xl space-y-8 animate-fadeIn">
      
      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-sm font-bold flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Service page updates published cleanly to live website!</span>
        </div>
      )}

      {/* Target Service Page Selector */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
            SELECT SERVICE PAGE TO EDIT
          </label>
          <div className="font-display font-bold text-lg text-white">Target Visa Service</div>
        </div>

        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="bg-slate-950 border border-slate-800 text-white font-bold text-sm rounded-2xl p-4 focus:outline-none focus:border-[#E01E37] cursor-pointer min-w-[280px]"
        >
          {SERVICE_PAGES.map(page => (
            <option key={page.id} value={page.id} className="bg-slate-900 text-white">
              {page.name}
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* 1. PRICING & FEES REPEATER */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-blue-500/15 text-blue-500">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">Pricing & Fees Table</h2>
                <p className="text-slate-400 text-xs mt-0.5">Edit government tariffs and service retainer fees for this page</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddFeeRow}
              className="px-4 py-2.5 bg-slate-800 hover:bg-[#E01E37] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Fee Row
            </button>
          </div>

          <div className="space-y-4">
            {feeRows.map((row) => (
              <div key={row.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                <div className="sm:col-span-5">
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Fee Item Name</label>
                  <input
                    type="text"
                    value={row.name}
                    onChange={(e) => handleUpdateFee(row.id, 'name', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-xs font-semibold focus:outline-none focus:border-[#E01E37]"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Govt Fee (AED)</label>
                  <input
                    type="text"
                    value={row.govtFee}
                    onChange={(e) => handleUpdateFee(row.id, 'govtFee', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-xs font-mono font-bold focus:outline-none focus:border-[#E01E37]"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Service Fee (AED)</label>
                  <input
                    type="text"
                    value={row.serviceFee}
                    onChange={(e) => handleUpdateFee(row.id, 'serviceFee', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-emerald-400 text-xs font-mono font-bold focus:outline-none focus:border-[#E01E37]"
                  />
                </div>

                <div className="sm:col-span-1 flex justify-end pt-4 sm:pt-0">
                  <button
                    type="button"
                    onClick={() => handleDeleteFee(row.id)}
                    className="p-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl transition-colors cursor-pointer"
                    title="Delete Fee Row"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. REQUIREMENTS LIST BUILDER */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-500/15 text-emerald-500">
                <ListCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">Eligibility Requirements List</h2>
                <p className="text-slate-400 text-xs mt-0.5">Bullet points outlining requirements for applicants</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddRequirement}
              className="px-4 py-2.5 bg-slate-800 hover:bg-[#E01E37] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Requirement
            </button>
          </div>

          <div className="space-y-3">
            {requirements.map((req, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <input
                  type="text"
                  value={req}
                  onChange={(e) => handleUpdateRequirement(idx, e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white text-sm font-semibold focus:outline-none focus:border-[#E01E37]"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteRequirement(idx)}
                  className="p-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-2xl transition-colors cursor-pointer shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 3. FAQ BUILDER */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-purple-500/15 text-purple-500">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">Frequently Asked Questions (FAQs)</h2>
                <p className="text-slate-400 text-xs mt-0.5">Add question and answer pairs displayed at the bottom of the page</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddFaq}
              className="px-4 py-2.5 bg-slate-800 hover:bg-[#E01E37] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add New FAQ
            </button>
          </div>

          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.id} className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-4 relative">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-purple-400 uppercase">FAQ QUESTION & ANSWER</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteFaq(faq.id)}
                    className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Question</label>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => handleUpdateFaq(faq.id, 'question', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white font-bold text-sm focus:outline-none focus:border-[#E01E37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Answer</label>
                  <textarea
                    rows={3}
                    value={faq.answer}
                    onChange={(e) => handleUpdateFaq(faq.id, 'answer', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-200 text-xs leading-relaxed focus:outline-none focus:border-[#E01E37]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Single Prominent Save Button */}
        <button
          type="submit"
          className="w-full py-4 bg-[#E01E37] hover:bg-[#B81A2C] text-white font-bold text-base rounded-2xl shadow-xl shadow-[#E01E37]/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
        >
          <Save className="w-5 h-5" />
          <span>Publish Service Page Changes</span>
        </button>

      </form>

    </div>
  );
}
