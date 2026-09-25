import React, { useState } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowLeft,
  ArrowRight,
  Check,
  Edit2,
  Phone,
  Building2,
  Users,
  Baby,
  Briefcase,
  Globe,
  MapPin,
  Plane
} from 'lucide-react';
import { siteConfig } from '../data/cmsData';

export default function CalculatorModal({ isOpen, onClose, initialTab = 'spouse' }) {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [locationStatus, setLocationStatus] = useState('');

  // Close handler
  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 1 && category) setStep(2);
    else if (step === 2 && subCategory) {
      if (['family', 'property'].includes(category)) setStep(3);
      else setStep(4);
    }
    else if (step === 3 && locationStatus) setStep(4);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const getBreakdown = () => {
    let items = [];
    let serviceCharge = 1450;
    
    if (category === 'family') {
      serviceCharge = 1450;
      items = [
        { label: 'File Opening / Sponsor Registration', price: 268.90 },
        { label: 'Entry Permit', price: 1125.65 },
        ...(locationStatus === 'inside' ? [{ label: 'Change of Status', price: 675.65 }] : []),
        { label: 'Medical Fitness Test (Normal)', price: 320.00 },
        { label: 'Emirates ID (2 Years)', price: 390.00 },
        { label: 'Basic Health Insurance', price: 650.00 },
        { label: 'Visa Stamping', price: 546.65 }
      ];
    } else if (category === 'property') {
      serviceCharge = 2450;
      items = [
        { label: 'DLD Property Valuation / NOC', price: 2000.00 },
        { label: 'Medical Fitness Test (VIP)', price: 700.00 },
        { label: 'Emirates ID (10 Years)', price: 1150.00 },
        { label: 'Golden Visa Stamping', price: 6000.00 }
      ];
    } else if (category === 'corporate') {
      serviceCharge = 3500;
      items = [
        { label: 'Initial Approval', price: 120.00 },
        { label: 'Trade Name Reservation', price: 620.00 },
        { label: 'MOA Notarization', price: 1500.00 },
        { label: 'Trade License Issuance', price: 6500.00 },
        { label: 'Establishment Card', price: 750.00 }
      ];
    } else {
      serviceCharge = 850;
      items = [
        { label: 'Government Processing Fee', price: 1250.00 },
        { label: 'Typing & Admin', price: 150.00 }
      ];
    }

    const totalGov = items.reduce((acc, curr) => acc + curr.price, 0);
    return { items, serviceCharge, totalGov, grandTotal: totalGov + serviceCharge };
  };

  const getSubCategoryLabel = () => {
    const map = {
      'spouse': 'Spouse Residence Visa',
      'children': 'Children Dependant Visa',
      'parents': 'Parents Residence Visa',
      'maid': 'Maid / Nanny Visa',
      'golden': '10-Year Golden Visa (Property)',
      'investor': '2-Year Investor Visa',
      'setup': 'Business Setup / Trade License',
      'pro': 'Corporate PRO Services'
    };
    return map[subCategory] || 'UAE Service';
  };

  const { items, serviceCharge, totalGov, grandTotal } = getBreakdown();

  const handleWhatsApp = () => {
    const message = `Hello, I used the calculator on your website for *${getSubCategoryLabel()}*.\nThe estimated total is *AED ${grandTotal.toLocaleString()}*.\nCan you provide more details?`;
    window.open(`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="w-full max-w-[800px] bg-slate-50 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header - Dark slate like 800docs */}
        <div className="bg-slate-900 text-white px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-display font-black text-xl tracking-tight text-white">
              PropertyVisaDubai<span className="text-[#E01E37]">UAE</span>
            </span>
            <span className="w-px h-5 bg-white/20 hidden sm:block"></span>
            <span className="text-slate-300 font-medium text-sm hidden sm:block">Fee Calculator</span>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 relative">
          
          {step < 4 && (
            <div className="mb-8">
              <div className="text-[10px] sm:text-xs font-bold font-mono tracking-wider text-slate-500 uppercase mb-2">Question {step}</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                {step === 1 && "What type of service do you need?"}
                {step === 2 && "Which specific visa or service?"}
                {step === 3 && "Where is the applicant currently located?"}
              </h2>
              <p className="text-slate-500 text-sm mt-2">
                {step === 1 && "Select a broad category to begin your estimate."}
                {step === 2 && "Pick the exact service — government charges will appear line by line at the end."}
                {step === 3 && "Location impacts the requirement for 'Change of Status' fees."}
              </p>
            </div>
          )}

          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'family', label: 'Family & Dependents', desc: 'Spouse, children, parents, maid', icon: Users },
                { id: 'property', label: 'Property Investor', desc: 'Golden Visa, 2-Year Investor', icon: Building2 },
                { id: 'corporate', label: 'Corporate & Legal', desc: 'Business setup, PRO, Trade License', icon: Briefcase },
                { id: 'other', label: 'Other Services', desc: 'Emirates ID, Attestation, Typing', icon: Globe }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => { setCategory(opt.id); setSubCategory(''); }}
                  className={`p-5 rounded-2xl border-2 text-left transition-all ${category === opt.id ? 'border-[#E01E37] bg-red-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                >
                  <opt.icon className={`w-6 h-6 mb-3 ${category === opt.id ? 'text-[#E01E37]' : 'text-slate-400'}`} />
                  <div className={`font-bold text-base sm:text-lg mb-1 ${category === opt.id ? 'text-[#E01E37]' : 'text-slate-900'}`}>{opt.label}</div>
                  <div className="text-slate-500 text-sm">{opt.desc}</div>
                </button>
              ))}
            </div>
          )}

          {step === 2 && category === 'family' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'spouse', label: 'Spouse Residence Visa', desc: 'Sponsor your husband or wife' },
                { id: 'children', label: 'Children Dependant Visa', desc: 'Sponsor your children under your visa' },
                { id: 'parents', label: 'Parents Residence Visa', desc: 'Sponsor father or mother' },
                { id: 'maid', label: 'Maid / Domestic Helper', desc: 'Hire a nanny or maid directly' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setSubCategory(opt.id)}
                  className={`p-5 rounded-2xl border-2 text-left transition-all ${subCategory === opt.id ? 'border-[#E01E37] bg-red-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                >
                  <div className={`font-bold text-base mb-1 ${subCategory === opt.id ? 'text-[#E01E37]' : 'text-slate-900'}`}>{opt.label}</div>
                  <div className="text-slate-500 text-sm">{opt.desc}</div>
                </button>
              ))}
            </div>
          )}

          {step === 2 && category === 'property' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'golden', label: '10-Year Golden Visa', desc: 'For property worth AED 2 Million+' },
                { id: 'investor', label: '2-Year Investor Visa', desc: 'For property worth AED 750,000+' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setSubCategory(opt.id)}
                  className={`p-5 rounded-2xl border-2 text-left transition-all ${subCategory === opt.id ? 'border-[#E01E37] bg-red-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                >
                  <div className={`font-bold text-base mb-1 ${subCategory === opt.id ? 'text-[#E01E37]' : 'text-slate-900'}`}>{opt.label}</div>
                  <div className="text-slate-500 text-sm">{opt.desc}</div>
                </button>
              ))}
            </div>
          )}

          {step === 2 && category === 'corporate' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'setup', label: 'Business Setup', desc: 'Mainland or Freezone company formation' },
                { id: 'pro', label: 'PRO Services', desc: 'Corporate portal management & quotas' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setSubCategory(opt.id)}
                  className={`p-5 rounded-2xl border-2 text-left transition-all ${subCategory === opt.id ? 'border-[#E01E37] bg-red-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                >
                  <div className={`font-bold text-base mb-1 ${subCategory === opt.id ? 'text-[#E01E37]' : 'text-slate-900'}`}>{opt.label}</div>
                  <div className="text-slate-500 text-sm">{opt.desc}</div>
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'inside', label: 'Inside the UAE', desc: 'Requires Change of Status', icon: MapPin },
                { id: 'outside', label: 'Outside the UAE', desc: 'Requires Pink Visa Entry Permit', icon: Plane }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setLocationStatus(opt.id)}
                  className={`p-6 rounded-2xl border-2 text-left transition-all flex flex-col items-center justify-center text-center ${locationStatus === opt.id ? 'border-[#E01E37] bg-red-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                >
                  <opt.icon className={`w-8 h-8 mb-4 ${locationStatus === opt.id ? 'text-[#E01E37]' : 'text-slate-400'}`} />
                  <div className={`font-bold text-lg mb-2 ${locationStatus === opt.id ? 'text-[#E01E37]' : 'text-slate-900'}`}>{opt.label}</div>
                  <div className="text-slate-500 text-sm">{opt.desc}</div>
                </button>
              ))}
            </div>
          )}

          {/* Results Step 4 */}
          {step === 4 && (
            <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-sm">
              <div className="text-[10px] sm:text-xs font-bold font-mono tracking-wider text-[#E01E37] uppercase mb-2">YOUR ESTIMATE</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">{getSubCategoryLabel()}</h2>
              <div className="text-slate-500 text-sm mb-8 flex items-center gap-2">
                <span>{category.toUpperCase()}</span>
                <span>•</span>
                <span>{locationStatus === 'inside' ? 'Inside UAE' : 'Outside UAE'}</span>
                <span>•</span>
                <span>Normal Processing</span>
              </div>

              <div className="space-y-4 mb-6">
                {items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm sm:text-base border-b border-slate-100 pb-3">
                    <span className="text-slate-700">{item.label}</span>
                    <span className="font-semibold text-slate-900">{item.price.toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t-2 border-slate-900 pt-6">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-slate-900 text-base sm:text-lg">Amer / Tasheel / Gov charges</span>
                  <span className="text-slate-900 text-base sm:text-lg">AED {totalGov.toLocaleString('en-AE', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600 font-medium">
                  <span>Our Service Charge <span className="text-xs text-slate-400 ml-1 font-normal">(per applicant)</span></span>
                  <span>AED {serviceCharge.toLocaleString('en-AE', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Bar - Sticky */}
        <div className="bg-white border-t border-slate-200 p-4 sm:p-6 flex items-center justify-between shrink-0 rounded-b-2xl sm:rounded-b-3xl">
          {step < 4 ? (
            <>
              <button 
                onClick={handleBack}
                disabled={step === 1}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-colors ${step === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-700 hover:bg-slate-100 cursor-pointer'}`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </button>
              
              <div className="flex items-center gap-3">
                <span className="text-slate-400 text-sm font-medium mr-2">Answer to see fee</span>
                <button 
                  onClick={handleNext}
                  disabled={(step === 1 && !category) || (step === 2 && !subCategory) || (step === 3 && !locationStatus)}
                  className="flex items-center gap-2 px-8 py-3 bg-[#E01E37] text-white rounded-xl font-bold hover:bg-[#B81A2C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="w-full flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => setStep(1)}
                className="flex items-center justify-center gap-2 px-6 py-4 border-2 border-slate-200 text-slate-700 rounded-xl font-bold hover:border-slate-300 hover:bg-slate-50 transition-colors w-full sm:w-auto shrink-0"
              >
                <Edit2 className="w-4 h-4" />
                <span>Edit Details</span>
              </button>
              <button 
                onClick={handleWhatsApp}
                className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-xl font-bold hover:bg-[#20bd5a] transition-all shadow-lg shadow-[#25D366]/20"
              >
                <WhatsAppIcon className="w-5 h-5 fill-current" />
                <span className="text-sm sm:text-base">Confirm on WhatsApp • AED {grandTotal.toLocaleString('en-AE', { minimumFractionDigits: 2 })}</span>
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
