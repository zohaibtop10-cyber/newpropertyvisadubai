import React, { useState } from 'react';
import { Star, Plus, Trash2, CheckCircle2, User } from 'lucide-react';

export default function TestimonialsManager({ cmsConfig, setCmsConfig }) {
  const [testimonials, setTestimonials] = useState(
    cmsConfig?.reviews?.items?.map(r => ({
      id: r.id,
      name: r.name,
      visaType: r.country,
      rating: r.rating || 5,
      quote: r.text
    })) || [
      { id: 'rev-1', name: 'Alexander Wright', visaType: '10-Year Golden Visa', rating: 5, quote: 'Flawless spouse visa processing. 800 DOCS handles everything with zero hassle.' },
      { id: 'rev-2', name: 'Dmitry Smirnov', visaType: 'Property Investor Visa', rating: 5, quote: 'Secured my 10-Year Golden Visa via real estate within 48 hours. Extraordinary service.' },
      { id: 'rev-3', name: 'Dr. Sarah Jenkins', visaType: 'Parents Residency Visa', rating: 5, quote: 'Brought my elderly parents to Dubai under residency seamlessly. Highly recommended!' }
    ]
  );

  const [newName, setNewName] = useState('');
  const [newVisaType, setNewVisaType] = useState('Spouse Residency Visa');
  const [newRating, setNewRating] = useState(5);
  const [newQuote, setNewQuote] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const syncToCms = (updatedList) => {
    const formatted = updatedList.map(t => ({
      id: t.id,
      name: t.name,
      country: t.visaType,
      rating: t.rating,
      text: t.quote
    }));

    if (setCmsConfig) {
      setCmsConfig(prev => ({
        ...prev,
        reviews: {
          ...prev?.reviews,
          items: formatted
        }
      }));
    }

    if (typeof window !== 'undefined') {
      const currentConfig = cmsConfig || {};
      const newConfig = {
        ...currentConfig,
        reviews: {
          ...currentConfig.reviews,
          items: formatted
        }
      };
      localStorage.setItem('app_cms_config', JSON.stringify(newConfig));
    }
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newQuote.trim()) return;

    const newEntry = {
      id: Date.now(),
      name: newName.trim(),
      visaType: newVisaType,
      rating: Number(newRating),
      quote: newQuote.trim()
    };

    const updated = [newEntry, ...testimonials];
    setTestimonials(updated);
    syncToCms(updated);
    setNewName('');
    setNewQuote('');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDeleteReview = (id) => {
    const updated = testimonials.filter(t => t.id !== id);
    setTestimonials(updated);
    syncToCms(updated);
  };

  return (
    <div className="max-w-4xl space-y-8 animate-fadeIn">
      
      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-sm font-bold flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>New client review published to live website!</span>
        </div>
      )}

      {/* Add New Review Card/Form */}
      <form onSubmit={handleAddReview} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
          <div className="p-3 rounded-2xl bg-amber-500/15 text-amber-500">
            <Star className="w-6 h-6 fill-amber-500" />
          </div>
          <div>
            <h2 className="font-display font-extrabold text-xl text-white">Add New Client Review</h2>
            <p className="text-slate-400 text-xs mt-0.5">Publish a verified client testimonial on the live homepage</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 text-sm">
          <div className="sm:col-span-5">
            <label className="block text-xs font-bold text-slate-300 mb-2">Client Full Name</label>
            <input
              type="text"
              placeholder="e.g. Marcus Vance"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold focus:outline-none focus:border-[#E01E37]"
            />
          </div>

          <div className="sm:col-span-4">
            <label className="block text-xs font-bold text-slate-300 mb-2">Visa Type</label>
            <select
              value={newVisaType}
              onChange={(e) => setNewVisaType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-semibold focus:outline-none focus:border-[#E01E37] cursor-pointer"
            >
              <option value="10-Year Golden Visa">10-Year Golden Visa</option>
              <option value="Spouse Residency Visa">Spouse Residency Visa</option>
              <option value="Property Investor Visa">Property Investor Visa</option>
              <option value="Parents Residency Visa">Parents Residency Visa</option>
              <option value="Newborn Baby Clearance">Newborn Baby Clearance</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <label className="block text-xs font-bold text-slate-300 mb-2">Star Rating</label>
            <select
              value={newRating}
              onChange={(e) => setNewRating(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-amber-400 font-bold focus:outline-none focus:border-[#E01E37] cursor-pointer"
            >
              <option value={5}>5 Stars (★★★★★)</option>
              <option value={4}>4 Stars (★★★★☆)</option>
              <option value={3}>3 Stars (★★★☆☆)</option>
            </select>
          </div>

          <div className="sm:col-span-12">
            <label className="block text-xs font-bold text-slate-300 mb-2">Review Text / Quote</label>
            <textarea
              rows={3}
              placeholder="Type the client's review statement..."
              value={newQuote}
              onChange={(e) => setNewQuote(e.target.value)}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 text-sm leading-relaxed focus:outline-none focus:border-[#E01E37]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3.5 bg-[#E01E37] hover:bg-[#B81A2C] text-white font-bold text-sm rounded-2xl shadow-lg shadow-[#E01E37]/25 flex items-center gap-2 transition-all cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span>Publish New Review</span>
        </button>
      </form>

      {/* Existing Published Reviews List */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="font-display font-extrabold text-lg text-white">
            Currently Published Reviews ({testimonials.length})
          </div>
          <span className="text-xs font-mono text-slate-400">Live Homepage Feed</span>
        </div>

        <div className="space-y-4">
          {testimonials.map((review) => (
            <div key={review.id} className="p-5 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-slate-900 text-[#E01E37]">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white text-base">{review.name}</span>
                    <span className="text-xs font-mono text-slate-400 ml-2">• {review.visaType}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-300 text-sm italic">"{review.quote}"</p>
              </div>

              <button
                type="button"
                onClick={() => handleDeleteReview(review.id)}
                className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 self-start sm:self-center"
              >
                <Trash2 className="w-4 h-4" /> Delete Review
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
