import React, { useState, useEffect } from 'react';
import { Star, Plus, Trash2, CheckCircle2, User, ArrowUp, ArrowDown, Save, MessageSquareQuote, Sparkles } from 'lucide-react';
import { db } from '../../firebase';
import { ref, onValue, set } from 'firebase/database';

export default function TestimonialsManager({ cmsConfig, setCmsConfig }) {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Review Form State
  const [newName, setNewName] = useState('');
  const [newVisaType, setNewVisaType] = useState('10-Year Golden Visa');
  const [newRating, setNewRating] = useState(5);
  const [newQuote, setNewQuote] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load reviews from Firebase DB or cmsConfig fallback
  useEffect(() => {
    const reviewsRef = ref(db, 'cmsConfig/reviews/items');
    const unsubscribe = onValue(reviewsRef, (snapshot) => {
      const data = snapshot.val();
      if (data && Array.isArray(data)) {
        setTestimonials(data.map(r => ({
          id: r.id || Date.now() + Math.random(),
          name: r.name || r.author || 'Client',
          visaType: r.country || r.visaType || 'Residency Visa',
          rating: Number(r.rating) || 5,
          quote: r.text || r.quote || ''
        })));
      } else if (cmsConfig?.reviews?.items && Array.isArray(cmsConfig.reviews.items)) {
        setTestimonials(cmsConfig.reviews.items.map(r => ({
          id: r.id || Date.now() + Math.random(),
          name: r.name || 'Client',
          visaType: r.country || r.visaType || 'Residency Visa',
          rating: Number(r.rating) || 5,
          quote: r.text || r.quote || ''
        })));
      } else {
        // Defaults
        setTestimonials([
          { id: 'rev-1', name: 'Alexander Wright', visaType: '10-Year Golden Visa', rating: 5, quote: 'Flawless spouse visa processing. 800 DOCS handles everything with zero hassle.' },
          { id: 'rev-2', name: 'Dmitry Smirnov', visaType: 'Property Investor Visa', rating: 5, quote: 'Secured my 10-Year Golden Visa via real estate within 48 hours. Extraordinary service.' },
          { id: 'rev-3', name: 'Dr. Sarah Jenkins', visaType: 'Parents Residency Visa', rating: 5, quote: 'Brought my elderly parents to Dubai under residency seamlessly. Highly recommended!' }
        ]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Sync to Firebase & Parent State
  const syncToCms = (updatedList) => {
    const formatted = updatedList.map(t => ({
      id: t.id,
      name: t.name,
      country: t.visaType,
      visaType: t.visaType,
      rating: t.rating,
      text: t.quote,
      quote: t.quote
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

    try {
      const reviewsRef = ref(db, 'cmsConfig/reviews/items');
      set(reviewsRef, formatted);
    } catch (e) {
      console.error('Error saving reviews to Firebase:', e);
    }
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newQuote.trim()) return;

    const newEntry = {
      id: `rev-${Date.now()}`,
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
    if (window.confirm('Are you sure you want to delete this review?')) {
      const updated = testimonials.filter(t => t.id !== id);
      setTestimonials(updated);
      syncToCms(updated);
    }
  };

  const handleMoveUp = (idx) => {
    if (idx === 0) return;
    const updated = [...testimonials];
    const temp = updated[idx - 1];
    updated[idx - 1] = updated[idx];
    updated[idx] = temp;
    setTestimonials(updated);
    syncToCms(updated);
  };

  const handleMoveDown = (idx) => {
    if (idx === testimonials.length - 1) return;
    const updated = [...testimonials];
    const temp = updated[idx + 1];
    updated[idx + 1] = updated[idx];
    updated[idx] = temp;
    setTestimonials(updated);
    syncToCms(updated);
  };

  return (
    <div className="max-w-5xl space-y-8 animate-fadeIn pb-16">
      
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-brand-darkSurface border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Client Social Proof</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Testimonials & Reviews Manager
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
              Add, edit, reorder, and sync real client reviews directly to the live site and Firebase DB.
            </p>
          </div>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-semibold flex items-center gap-3 shadow-lg animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span>New client review successfully published live!</span>
        </div>
      )}

      {/* Add New Review Card / Form */}
      <form onSubmit={handleAddReview} className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center gap-3.5 border-b border-slate-800/80 pb-5">
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg text-white">Add New Client Review</h2>
            <p className="text-slate-400 text-xs mt-0.5">Publish a verified client testimonial to the live homepage & review carousels.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 text-sm">
          <div className="sm:col-span-5">
            <label className="block text-xs font-semibold text-slate-300 mb-2">Client Full Name</label>
            <input
              type="text"
              placeholder="e.g. Marcus Vance"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:border-amber-500/50"
            />
          </div>

          <div className="sm:col-span-4">
            <label className="block text-xs font-semibold text-slate-300 mb-2">Visa / Service Category</label>
            <select
              value={newVisaType}
              onChange={(e) => setNewVisaType(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:border-amber-500/50 cursor-pointer"
            >
              <option value="10-Year Golden Visa">10-Year Golden Visa</option>
              <option value="Spouse Residency Visa">Spouse Residency Visa</option>
              <option value="Property Investor Visa">Property Investor Visa</option>
              <option value="Parents Residency Visa">Parents Residency Visa</option>
              <option value="Newborn Baby Clearance">Newborn Baby Clearance</option>
              <option value="Corporate PRO Services">Corporate PRO Services</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <label className="block text-xs font-semibold text-slate-300 mb-2">Star Rating</label>
            <select
              value={newRating}
              onChange={(e) => setNewRating(Number(e.target.value))}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-amber-400 font-bold focus:outline-none focus:border-amber-500/50 cursor-pointer"
            >
              <option value={5}>5 Stars (★★★★★)</option>
              <option value={4}>4 Stars (★★★★☆)</option>
              <option value={3}>3 Stars (★★★☆☆)</option>
            </select>
          </div>

          <div className="sm:col-span-12">
            <label className="block text-xs font-semibold text-slate-300 mb-2">Testimonial Quote</label>
            <textarea
              rows={3}
              placeholder="Type the client's testimonial quote..."
              value={newQuote}
              onChange={(e) => setNewQuote(e.target.value)}
              required
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-slate-200 text-sm leading-relaxed focus:outline-none focus:border-amber-500/50"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Publish Testimonial</span>
        </button>
      </form>

      {/* Existing Published Reviews List */}
      <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div className="font-display font-bold text-lg text-white flex items-center gap-2.5">
            <MessageSquareQuote className="w-5 h-5 text-amber-400" />
            <span>Currently Published Reviews ({testimonials.length})</span>
          </div>
          <span className="text-xs font-mono text-amber-400 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20">Live Sync</span>
        </div>

        {loading ? (
          <div className="text-slate-400 text-xs py-4">Loading published reviews...</div>
        ) : testimonials.length === 0 ? (
          <div className="text-slate-400 text-xs py-8 text-center border border-dashed border-slate-800 rounded-xl">
            No reviews published yet. Use the form above to add your first client review.
          </div>
        ) : (
          <div className="space-y-4">
            {testimonials.map((review, idx) => (
              <div key={review.id} className="p-5 bg-slate-950/80 border border-slate-800/80 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-amber-400">REVIEW #{idx + 1}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveUp(idx)}
                      className={`p-1.5 rounded-lg border transition-colors ${idx === 0 ? 'border-slate-800/50 text-slate-700' : 'border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800'}`}
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      disabled={idx === testimonials.length - 1}
                      onClick={() => handleMoveDown(idx)}
                      className={`p-1.5 rounded-lg border transition-colors ${idx === testimonials.length - 1 ? 'border-slate-800/50 text-slate-700' : 'border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800'}`}
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDeleteReview(review.id); }}
                      className="p-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                      title="Delete Review"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-slate-400 font-medium block mb-1">Client Name</label>
                    <input
                      type="text"
                      value={review.name}
                      onChange={(e) => {
                        const u = [...testimonials];
                        u[idx].name = e.target.value;
                        setTestimonials(u);
                        syncToCms(u);
                      }}
                      className="w-full bg-slate-900 border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-white text-xs font-semibold focus:outline-none focus:border-amber-500/50"
                      placeholder="Client Name"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 font-medium block mb-1">Visa Category</label>
                    <select
                      value={review.visaType}
                      onChange={(e) => {
                        const u = [...testimonials];
                        u[idx].visaType = e.target.value;
                        setTestimonials(u);
                        syncToCms(u);
                      }}
                      className="w-full bg-slate-900 border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-slate-200 text-xs font-medium focus:outline-none focus:border-amber-500/50 cursor-pointer"
                    >
                      <option value="10-Year Golden Visa">10-Year Golden Visa</option>
                      <option value="Spouse Residency Visa">Spouse Residency Visa</option>
                      <option value="Property Investor Visa">Property Investor Visa</option>
                      <option value="Parents Residency Visa">Parents Residency Visa</option>
                      <option value="Newborn Baby Clearance">Newborn Baby Clearance</option>
                      <option value="Corporate PRO Services">Corporate PRO Services</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <label className="text-[11px] font-semibold text-slate-400 shrink-0">Rating:</label>
                  <select
                    value={review.rating}
                    onChange={(e) => {
                      const u = [...testimonials];
                      u[idx].rating = Number(e.target.value);
                      setTestimonials(u);
                      syncToCms(u);
                    }}
                    className="w-full bg-slate-900 border border-slate-700/60 rounded-xl px-3.5 py-2 text-amber-400 font-bold text-xs focus:outline-none focus:border-amber-500/50 cursor-pointer"
                  >
                    <option value={5}>5 Stars (★★★★★)</option>
                    <option value={4}>4 Stars (★★★★☆)</option>
                    <option value={3}>3 Stars (★★★☆☆)</option>
                    <option value={2}>2 Stars (★★☆☆☆)</option>
                    <option value={1}>1 Star (★☆☆☆☆)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 font-medium block mb-1">Testimonial Quote</label>
                  <textarea
                    rows={2}
                    value={review.quote}
                    onChange={(e) => {
                      const u = [...testimonials];
                      u[idx].quote = e.target.value;
                      setTestimonials(u);
                      syncToCms(u);
                    }}
                    className="w-full bg-slate-900 border border-slate-700/60 rounded-xl p-3.5 text-slate-300 text-xs leading-relaxed focus:outline-none focus:border-amber-500/50"
                    placeholder="Review quote..."
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
