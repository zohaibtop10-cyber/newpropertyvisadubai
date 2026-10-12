import React, { useState } from 'react';
import { Star, Play, X } from 'lucide-react';

export default function SocialProof() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section id="social" className="bg-[#050505] text-white py-20 px-4 sm:px-6 lg:px-8 font-sans border-b border-white/10 relative overflow-hidden transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Directive 5: Floating Card Wrapper with text-dark-gold-shine and vertical dividers */}
        <div className="bg-[#121417] shadow-[0_10px_30px_rgba(0,0,0,0.2)] rounded-[10px] py-8 px-6 sm:px-12 border border-white/10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center lg:text-left">
            <div className="space-y-1 lg:border-r lg:border-slate-700/60 lg:pr-8">
              <div className="text-4xl sm:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F7DE9C] via-[#EFC45C] to-[#C99824] tracking-tight drop-shadow-sm">
                <span>500+</span>
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-white"><span>LICENSED ENTITIES</span></div>
              <div className="text-[11px] text-slate-400"><span>Advisory DIFC, ADGM & Free Zones</span></div>
            </div>

            <div className="space-y-1 lg:border-r lg:border-slate-700/60 lg:pr-8">
              <div className="text-4xl sm:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F7DE9C] via-[#EFC45C] to-[#C99824] tracking-tight drop-shadow-sm">
                <span>15,000+</span>
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-white"><span>VISAS PROCESSED</span></div>
              <div className="text-[11px] text-slate-400"><span>Golden Visas & Executive Residencies</span></div>
            </div>

            <div className="space-y-1 lg:border-r lg:border-slate-700/60 lg:pr-8">
              <div className="text-4xl sm:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F7DE9C] via-[#EFC45C] to-[#C99824] tracking-tight drop-shadow-sm">
                <span>15+</span>
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-white"><span>YEARS IN UAE</span></div>
              <div className="text-[11px] text-slate-400"><span>Trusted governance & regulatory expertise</span></div>
            </div>

            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F7DE9C] via-[#EFC45C] to-[#C99824] tracking-tight drop-shadow-sm">
                <span>99.8%</span>
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-white"><span>SUCCESS APPROVAL</span></div>
              <div className="text-[11px] text-slate-400"><span>Flawless compliance record</span></div>
            </div>
          </div>
        </div>

        {/* Bottom Section Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Testimonial Blockquote */}
          <div className="lg:col-span-7 space-y-6">
            {/* Stars */}
            <div className="flex items-center gap-2">
              <div className="flex items-center text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-300 tracking-wider uppercase">
                <span>5.0 Star Executive Rating (Verified by Clutch & Trustpilot)</span>
              </span>
            </div>

            {/* Quote Headline */}
            <blockquote className="text-2xl sm:text-3xl font-display font-bold text-white leading-snug tracking-tight">
              <span>"EmiratesPrime structured our regional headquarters with mathematical precision."</span>
            </blockquote>

            {/* Paragraph */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              <span>Relocating our fintech entity from London to DIFC was fraught with regulatory nuance. The institutional advisory group at EmiratesPrime navigated our category license in under 4 weeks while simultaneously securing 10-year Golden Visas for our entire founding cohort.</span>
            </p>

            {/* Profile Snippet */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" 
                alt="Sir Arthur James Montgomery" 
                className="w-12 h-12 rounded-full object-cover border-2 border-[#D4AF37]"
              />
              <div>
                <div className="font-display font-bold text-sm text-white"><span>Sir Arthur James Montgomery</span></div>
                <div className="text-xs text-text-muted"><span>Managing Director • Sovereign Global Capital Ltd</span></div>
              </div>
            </div>
          </div>

          {/* Right Column: Stacked Video Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Video Card 1 */}
            <div 
              onClick={() => setActiveVideo('Case Study: DIFC Setup Governance')}
              className="relative rounded-[10px] overflow-hidden border border-white/15 bg-black/40 cursor-pointer group hover:border-[#D4AF37]/50 transition-all shadow-xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" 
                alt="Elena Rostova Video Thumbnail" 
                className="w-full h-44 object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Play Icon */}
              <div className="absolute right-5 bottom-5 w-11 h-11 rounded-full bg-dark-gold-gloss text-black font-bold flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </div>

              {/* Text Overlay */}
              <div className="absolute left-5 bottom-5 right-18 space-y-0.5">
                <div className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest">
                  <span>Case Study: DIFC Setup Governance</span>
                </div>
                <div className="font-display font-bold text-sm text-white"><span>Elena Rostova</span></div>
                <div className="text-[11px] text-slate-300"><span>Managing Partner, Volex Risk Solutions</span></div>
              </div>
            </div>

            {/* Video Card 2 */}
            <div 
              onClick={() => setActiveVideo('Family Office Structure')}
              className="relative rounded-[10px] overflow-hidden border border-white/15 bg-black/40 cursor-pointer group hover:border-[#D4AF37]/50 transition-all shadow-xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80" 
                alt="Tariq Al-Mansoor Video Thumbnail" 
                className="w-full h-44 object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Play Icon */}
              <div className="absolute right-5 bottom-5 w-11 h-11 rounded-full bg-dark-gold-gloss text-black font-bold flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </div>

              {/* Text Overlay */}
              <div className="absolute left-5 bottom-5 right-18 space-y-0.5">
                <div className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest">
                  <span>Family Office Structure</span>
                </div>
                <div className="font-display font-bold text-sm text-white"><span>Tariq Al-Mansoor</span></div>
                <div className="text-[11px] text-slate-300"><span>Principal, Al-Mansoor Family Office</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121417] border border-white/20 rounded-[10px] p-6 max-w-xl w-full text-white space-y-4 relative">
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 p-2 text-text-muted hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider"><span>Video Case Briefing</span></div>
            <h3 className="text-xl font-display font-bold"><span>{activeVideo}</span></h3>

            <div className="aspect-video bg-black rounded-[10px] flex items-center justify-center border border-white/10 relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                alt="Video playing"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-2">
                <div className="w-16 h-16 rounded-full bg-dark-gold-gloss text-black flex items-center justify-center shadow-2xl animate-bounce">
                  <Play className="w-8 h-8 fill-black text-black ml-1" />
                </div>
                <span className="text-xs font-semibold text-white bg-black/60 px-3 py-1 rounded-full">
                  <span>Playing Video Interview...</span>
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              <span>Watch how our senior sovereign advisory team handled fast-track licensing, regulatory compliance, bank account opening, and Golden Visa issuance.</span>
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
