import React, { useState } from 'react';
import { Star, Play, X } from 'lucide-react';

export default function SocialProof() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section id="social" className="bg-brand-surfaceLight dark:bg-brand-darkBg text-white py-20 px-4 sm:px-6 lg:px-8 font-sans border-b border-slate-800 dark:border-white/10 relative overflow-hidden transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        {/* Top 4 Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pb-16 border-b border-slate-800 dark:border-white/10 text-center lg:text-left">
          <div className="space-y-1">
            <div className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight">
              500<span className="text-brand-primary">+</span>
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-300">LICENSED ENTITIES</div>
            <div className="text-[11px] text-slate-400">Advisory DIFC, ADGM & Free Zones</div>
          </div>

          <div className="space-y-1">
            <div className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight">
              4,800<span className="text-brand-primary">+</span>
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-300">VISAS PROCESSED</div>
            <div className="text-[11px] text-slate-400">Golden Visas & Executive Residencies</div>
          </div>

          <div className="space-y-1">
            <div className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight">
              15<span className="text-brand-primary">+</span>
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-300">YEARS IN UAE</div>
            <div className="text-[11px] text-slate-400">Trusted governance & regulatory expertise</div>
          </div>

          <div className="space-y-1">
            <div className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight">
              99.8<span className="text-brand-primary">%</span>
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-300">SUCCESS APPROVAL</div>
            <div className="text-[11px] text-slate-400">Flawless compliance record</div>
          </div>
        </div>

        {/* Bottom Section Layout */}
        <div className="pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Testimonial Blockquote */}
          <div className="lg:col-span-7 space-y-6">
            {/* Stars */}
            <div className="flex items-center gap-2">
              <div className="flex items-center text-brand-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-300 tracking-wider uppercase">
                5.0 Star Executive Rating (Verified by Clutch & Trustpilot)
              </span>
            </div>

            {/* Quote Headline */}
            <blockquote className="text-2xl sm:text-3xl font-display font-bold text-white leading-snug tracking-tight">
              "EmiratesPrime structured our regional headquarters with mathematical precision."
            </blockquote>

            {/* Paragraph */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Relocating our fintech entity from London to DIFC was fraught with regulatory nuance. The institutional advisory group at EmiratesPrime navigated our category license in under 4 weeks while simultaneously securing 10-year Golden Visas for our entire founding cohort.
            </p>

            {/* Profile Snippet */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-800 dark:border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" 
                alt="Sir Arthur James Montgomery" 
                className="w-12 h-12 rounded-full object-cover border-2 border-brand-primary"
              />
              <div>
                <div className="font-display font-bold text-sm text-white">Sir Arthur James Montgomery</div>
                <div className="text-xs text-slate-400">Managing Director • Sovereign Global Capital Ltd</div>
              </div>
            </div>
          </div>

          {/* Right Column: Stacked Video Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Video Card 1 */}
            <div 
              onClick={() => setActiveVideo('Case Study: DIFC Setup Governance')}
              className="relative rounded-xl overflow-hidden border border-white/15 bg-black/40 cursor-pointer group hover:border-brand-primary/50 transition-all shadow-xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" 
                alt="Elena Rostova Video Thumbnail" 
                className="w-full h-44 object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Play Icon */}
              <div className="absolute right-5 bottom-5 w-11 h-11 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </div>

              {/* Text Overlay */}
              <div className="absolute left-5 bottom-5 right-18 space-y-0.5">
                <div className="text-[10px] uppercase font-bold text-brand-primary tracking-widest">
                  Case Study: DIFC Setup Governance
                </div>
                <div className="font-display font-bold text-sm text-white">Elena Rostova</div>
                <div className="text-[11px] text-slate-300">Managing Partner, Volex Risk Solutions</div>
              </div>
            </div>

            {/* Video Card 2 */}
            <div 
              onClick={() => setActiveVideo('Family Office Structure')}
              className="relative rounded-xl overflow-hidden border border-white/15 bg-black/40 cursor-pointer group hover:border-brand-primary/50 transition-all shadow-xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80" 
                alt="Tariq Al-Mansoor Video Thumbnail" 
                className="w-full h-44 object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Play Icon */}
              <div className="absolute right-5 bottom-5 w-11 h-11 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </div>

              {/* Text Overlay */}
              <div className="absolute left-5 bottom-5 right-18 space-y-0.5">
                <div className="text-[10px] uppercase font-bold text-brand-primary tracking-widest">
                  Family Office Structure
                </div>
                <div className="font-display font-bold text-sm text-white">Tariq Al-Mansoor</div>
                <div className="text-[11px] text-slate-300">Principal, Al-Mansoor Family Office</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-brand-surfaceLight border border-white/20 rounded-xl p-6 max-w-xl w-full text-white space-y-4 relative">
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs font-bold text-brand-primary uppercase tracking-wider">Video Case Briefing</div>
            <h3 className="text-xl font-display font-bold">{activeVideo}</h3>

            <div className="aspect-video bg-black rounded-xl flex items-center justify-center border border-white/10 relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                alt="Video playing"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-2">
                <div className="w-16 h-16 rounded-full bg-brand-primary flex items-center justify-center shadow-2xl animate-bounce">
                  <Play className="w-8 h-8 fill-white text-white ml-1" />
                </div>
                <span className="text-xs font-semibold text-white bg-black/60 px-3 py-1 rounded-full">
                  Playing Video Interview...
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Watch how our senior sovereign advisory team handled fast-track licensing, regulatory compliance, bank account opening, and Golden Visa issuance.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
