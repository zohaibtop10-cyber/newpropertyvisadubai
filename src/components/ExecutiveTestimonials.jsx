import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Play, X, ShieldCheck } from 'lucide-react';

const CASE_STUDIES = [
  {
    id: 'difc-setup',
    category: 'CASE STUDY: DIFC SETUP GOVERNANCE',
    name: 'Elena Rostova',
    title: 'Chief Legal Officer, Vostok Global',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
  },
  {
    id: 'golden-visa',
    category: 'CASE STUDY: GOLDEN VISA ASSET MAPPING',
    name: 'Tariq Al-Mansoor',
    title: 'Managing Partner, Gulf Advisory Partners',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
  }
];

export default function ExecutiveTestimonials() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className="bg-[#050505] py-24 border-t border-b border-white/5 relative overflow-hidden font-sans">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* ── LEFT COLUMN: THE ANCHOR QUOTE (lg:col-span-7) ───────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-6"
        >
          {/* Trust Badge with 5 Gold Stars */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
              ))}
            </div>
            <span className="text-xs font-bold tracking-widest text-slate-400 uppercase font-mono">
              5.0 STAR EXECUTIVE RATING (VERIFIED BY CLUTCH & TRUSTPILOT)
            </span>
          </div>

          {/* Massive Typographical Quote */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight font-sans">
            &ldquo;Brightlink structured our regional headquarters with mathematical precision.&rdquo;
          </h2>

          {/* Body Text */}
          <p className="text-slate-400 text-lg leading-relaxed font-sans font-medium">
            From Ejari verification to MOFA document attestations and VIP Smart Salem medical clearances, their senior PRO council managed every milestone with complete transparency and zero operational delay.
          </p>

          {/* Author Block */}
          <div className="border-t border-white/10 pt-8 mt-8 flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
              alt="Sir Arthur James Montgomery"
              className="w-14 h-14 rounded-full object-cover border border-[#D4AF37]/40 shadow-md shrink-0"
            />
            <div>
              <h4 className="text-white font-bold text-base font-sans">
                Sir Arthur James Montgomery
              </h4>
              <p className="text-slate-500 text-sm font-sans font-medium">
                Managing Director, Montgomery Capital Partners
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── RIGHT COLUMN: VIDEO CASE STUDIES (lg:col-span-5) ────────────────── */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {CASE_STUDIES.map((study, idx) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              onClick={() => setActiveVideo(study)}
              className="relative h-[220px] w-full rounded-[10px] overflow-hidden group cursor-pointer border border-white/10 hover:border-[#D4AF37]/60 transition-all duration-500 shadow-xl"
            >
              {/* Background Image */}
              <img
                src={study.image}
                alt={study.name}
                className="object-cover w-full h-full grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
              />

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent pointer-events-none" />

              {/* Card Content (Bottom Left) */}
              <div className="absolute bottom-6 left-6 z-10 max-w-[70%]">
                <span className="block text-[#D4AF37] text-xs font-bold tracking-wider uppercase mb-1 font-mono">
                  {study.category}
                </span>
                <h3 className="text-white font-bold text-lg font-sans group-hover:text-[#FFE58F] transition-colors">
                  {study.name}
                </h3>
                <p className="text-slate-300 text-xs font-sans">
                  {study.title}
                </p>
              </div>

              {/* Play Button (Bottom Right) */}
              <div className="absolute right-6 bottom-6 z-10">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#C9981E] to-[#FCE181] text-black group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                  <Play className="w-5 h-5 fill-black text-black translate-x-0.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl bg-[#0A0A0A] border border-[#D4AF37]/30 rounded-[10px] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div>
                  <h4 className="text-white font-bold text-sm font-sans">{activeVideo.name}</h4>
                  <p className="text-[#D4AF37] text-xs font-mono">{activeVideo.category}</p>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="p-2 rounded-[10px] bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="relative pt-[56.25%] bg-black">
                <iframe
                  src={activeVideo.videoUrl}
                  title={activeVideo.name}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
