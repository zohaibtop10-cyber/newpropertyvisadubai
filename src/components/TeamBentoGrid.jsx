import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const TEAM_MEMBERS = [
  {
    id: 'bilal-saleem',
    name: 'Bilal Saleem',
    role: 'Founder & Chief Executive Officer',
    badge: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop',
    spanClass: 'md:col-span-2 md:row-span-2 min-h-[380px] md:min-h-[480px]'
  },
  {
    id: 'muhammad-anas',
    name: 'Muhammad Anas',
    role: 'Managing Director & Head of Strategy',
    badge: 'Managing Director',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop',
    spanClass: 'md:col-span-2 md:row-span-1 min-h-[240px] md:min-h-[230px]'
  },
  {
    id: 'aziza-kamilova',
    name: 'Aziza Kamilova',
    role: 'Director of Government Relations',
    badge: 'Government Relations',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
    spanClass: 'col-span-1 row-span-1 min-h-[240px]'
  },
  {
    id: 'haroon-saleem',
    name: 'Haroon Saleem',
    role: 'Head of Corporate Services & PRO',
    badge: 'Corporate PRO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
    spanClass: 'col-span-1 row-span-1 min-h-[240px]'
  },
  {
    id: 'olga-kulish',
    name: 'Olga Kulish',
    role: 'Senior Golden Visa Advisor',
    badge: 'Golden Visa',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop',
    spanClass: 'col-span-1 row-span-1 min-h-[240px]'
  },
  {
    id: 'malika-ikramova',
    name: 'Malika Ikramova',
    role: 'Client Relations Manager',
    badge: 'Client Relations',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=600&auto=format&fit=crop',
    spanClass: 'col-span-1 row-span-1 min-h-[240px]'
  },
  {
    id: 'ilya-merzlyakov',
    name: 'Ilya Merzlyakov',
    role: 'Legal & Attestation Specialist',
    badge: 'Legal & MOFA',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
    spanClass: 'col-span-1 row-span-1 min-h-[240px]'
  }
];

export default function TeamBentoGrid() {
  return (
    <section id="leadership-bento" className="w-full py-16 md:py-24 bg-[#050505] text-white font-sans relative overflow-hidden border-t border-[#D4AF37]/15">
      
      {/* Ambient Radial Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.06] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[10px] bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono font-bold uppercase tracking-widest"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>EXECUTIVE LEADERSHIP</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight font-sans"
          >
            Executive Leadership &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5C0] via-[#D4AF37] to-[#C59B27]">
              Immigration Advisory
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium"
          >
            Our accredited executive council combining senior immigration lawyers, GDRFA PRO specialists, and dedicated family relocation concierges.
          </motion.p>
        </div>

        {/* ── ASYMMETRICAL BENTO GRID LAYOUT ─────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`bg-surface/5 backdrop-blur-md border border-white/10 rounded-[10px] overflow-hidden relative group cursor-pointer shadow-xl hover:border-[#D4AF37]/60 hover:shadow-[0_20px_40px_rgba(212,175,55,0.18)] transition-all duration-500 flex flex-col justify-end ${member.spanClass}`}
            >
              {/* Top Accent Shimmer Line on Hover */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#C59B27] via-[#FFF5C0] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

              {/* Background Image Element */}
              <div className="absolute inset-0 w-full h-full overflow-hidden bg-surface">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
                />
              </div>

              {/* Top Glass Pill Badge */}
              {member.badge && (
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-2.5 py-1 rounded-[10px] bg-black/70 backdrop-blur-md border border-[#D4AF37]/40 text-[#FFE58F] text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
                    {member.badge}
                  </span>
                </div>
              )}

              {/* Nameplate Overlay at Bottom */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 z-10 flex flex-col justify-end">
                <div className="space-y-0.5">
                  <h3 className="text-[#FFE58F] font-bold text-lg md:text-xl tracking-tight group-hover:text-[#D4AF37] transition-colors leading-tight font-sans">
                    {member.name}
                  </h3>
                  <p className="text-white/80 text-sm font-medium leading-snug font-sans">
                    {member.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
