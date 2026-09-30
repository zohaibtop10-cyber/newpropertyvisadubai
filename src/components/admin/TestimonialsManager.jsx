import React, { useState, useEffect } from 'react';
import { Star, Plus, Trash2, CheckCircle2, User, ArrowUp, ArrowDown, Save } from 'lucide-react';
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
      if (data && Array.isArray(data) && data.length > 0) {
        setTestimonials(data.map(r => ({
          id: r.id || Date.now() + Math.random(),
          name: r.name || r.author || 'Client',
          visaType: r.country || r.visaType || 'Residency Visa',
          rating: Number(r.rating) || 5,
          quote: r.text || r.quote || ''
        })));
      } else if (cmsConfig?.reviews?.items) {
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

    // Direct Firebase save
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
    <div className="max-w-4xl space-y-8 animate-fadeIn">

      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-brand-gold/30 rounded-xl text-brand-goldLight text-sm font-bold flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>New client review published to live Firebase database!</span>
        </div>
      )}

      {/* Add New Review Card / Form */}
      <form onSubmit={handleAddReview} className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
          <div className="p-3 rounded-xl bg-brand-gold/15 text-brand-gold">
            <Star className="w-6 h-6 fill-amber-500 text-amber-500" />
          </div>
          <div>
            <h2 className="font-display font-extrabold text-xl text-white">Add New Client Review</h2>
            <p className="text-slate-400 text-xs mt-0.5">Publish a verified client testimonial on the live homepage & review sections.</p>
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
              className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-bold focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div className="sm:col-span-4">
            <label className="block text-xs font-bold text-slate-300 mb-2">Visa / Service Category</label>
            <select
              value={newVisaType}
              onChange={(e) => setNewVisaType(e.target.value)}
              className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-white font-semibold focus:outline-none focus:border-brand-primary cursor-pointer"
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
            <label className="block text-xs font-bold text-slate-300 mb-2">Star Rating</label>
            <select
              value={newRating}
              onChange={(e) => setNewRating(Number(e.target.value))}
              className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-brand-goldLight font-bold focus:outline-none focus:border-brand-primary cursor-pointer"
            >
              <option value={5}>5 Stars (★★★★★)</option>
              <option value={4}>4 Stars (★★★★☆)</option>
              <option value={3}>3 Stars (★★★☆☆)</option>
            </select>
          </div>

          <div className="sm:col-span-12">
            <label className="block text-xs font-bold text-slate-300 mb-2">Review Text / Testimonial Quote</label>
            <textarea
              rows={3}
              placeholder="Type the client's review statement..."
              value={newQuote}
              onChange={(e) => setNewQuote(e.target.value)}
              required
              className="w-full bg-brand-darkBg border border-slate-800 rounded-xl p-4 text-slate-200 text-sm leading-relaxed focus:outline-none focus:border-brand-primary"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3.5 bg-gold-gradient btn-shine-effect text-black font-extrabold hover:brightness-110 text-sm rounded-xl shadow-lg shadow-[#D4AF37]/25 flex items-center gap-2 transition-all cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span>Publish New Review</span>
        </button>
      </form>

      {/* Existing Published Reviews List */}
      <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="font-display font-extrabold text-lg text-white">
            Currently Published Reviews ({testimonials.length})
          </div>
          <span className="text-xs font-mono text-brand-gold">Reviews</span>
        </div>

        {loading ? (
          <div className="text-slate-400 text-xs py-4">Loading published reviews...</div>
        ) : testimonials.length === 0 ? (
          <div className="text-slate-400 text-xs py-6 text-center border border-dashed border-slate-800 rounded-xl">
            No reviews published yet. Use the form above to add your first client review.
          </div>
        ) : (
          <div className="space-y-4">
            {testimonials.map((review, idx) => (
              <div key={review.id} className="p-5 bg-brand-darkBg border border-slate-800 rounded-xl space-y-4 relative group">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-brand-gold">REVIEW #{idx + 1}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveUp(idx)}
                      className={`p-1.5 rounded-lg border transition-colors ${idx === 0 ? 'border-slate-800 text-slate-600' : 'border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800'}`}
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      disabled={idx === testimonials.length - 1}
                      onClick={() => handleMoveDown(idx)}
                      className={`p-1.5 rounded-lg border transition-colors ${idx === testimonials.length - 1 ? 'border-slate-800 text-slate-600' : 'border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800'}`}
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteReview(review.id)}
                      className="p-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors"
                      title="Delete Review"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-400 font-mono block mb-1">Client Name</label>
                    <input
                      type="text"
                      value={review.name}
                      onChange={(e) => {
                        const u = [...testimonials];
                        u[idx].name = e.target.value;
                        setTestimonials(u);
                        syncToCms(u);
                      }}
                      className="w-full bg-brand-surfaceLight border border-slate-800 rounded-xl p-3 text-white text-xs font-bold focus:outline-none focus:border-brand-gold"
                      placeholder="Client Name"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-mono block mb-1">Visa Category</label>
                    <select
                      value={review.visaType}
                      onChange={(e) => {
                        const u = [...testimonials];
                        u[idx].visaType = e.target.value;
                        setTestimonials(u);
                        syncToCms(u);
                      }}
                      className="w-full bg-brand-surfaceLight border border-slate-800 rounded-xl p-3 text-slate-300 text-xs font-semibold focus:outline-none focus:border-brand-gold cursor-pointer"
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
                  <label className="text-[10px] uppercase font-bold text-slate-400 shrink-0">Rating:</label>
                  <select
                    value={review.rating}
                    onChange={(e) => {
                      const u = [...testimonials];
                      u[idx].rating = Number(e.target.value);
                      setTestimonials(u);
                      syncToCms(u);
                    }}
                    className="w-full bg-brand-surfaceLight border border-slate-800 rounded-xl p-2.5 text-brand-gold font-bold text-xs focus:outline-none focus:border-brand-gold cursor-pointer"
                  >
                    <option value={5}>5 Stars (★★★★★)</option>
                    <option value={4}>4 Stars (★★★★☆)</option>
                    <option value={3}>3 Stars (★★★☆☆)</option>
                    <option value={2}>2 Stars (★★☆☆☆)</option>
                    <option value={1}>1 Star (★☆☆☆☆)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-mono block mb-1">Testimonial Quote</label>
                  <textarea
                    rows={2}
                    value={review.quote}
                    onChange={(e) => {
                      const u = [...testimonials];
                      u[idx].quote = e.target.value;
                      setTestimonials(u);
                      syncToCms(u);
                    }}
                    className="w-full bg-brand-surfaceLight border border-slate-800 rounded-xl p-3 text-slate-300 text-xs italic focus:outline-none focus:border-brand-gold"
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
