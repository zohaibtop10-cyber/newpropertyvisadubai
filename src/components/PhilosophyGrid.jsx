import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Target, Compass, ShieldCheck, Zap, Award } from 'lucide-react';

const DEFAULT_PHILOSOPHY_ITEMS = [
  {
    icon: Building2,
    title: 'Established Excellence in Business Bay',
    body: 'Operating under The Brightlink Group from our executive headquarters in Crystal Tower, Business Bay, Dubai, Brightlink Management Consultancy has served as an authoritative bridge between global investors, families, corporations, and UAE government entities for over 15 years.'
  },
  {
    icon: Target,
    title: 'The Philosophy of Zero Friction',
    body: 'Navigating UAE immigration shouldn\'t feel like navigating a maze. We founded our agency to replace bureaucratic friction, unexpected fee surcharges, and endless typing center queues with 100% digital transparency, upfront statutory fee accounting, and guaranteed SLA turnaround speeds.'
  },
  {
    icon: Compass,
    title: 'End-to-End Accountable Execution',
    body: 'From initial Ejari housing registration and Ministry of Foreign Affairs (MOFA) certificate legalization to VIP Smart Salem medical fitness testing and doorstep Emirates ID delivery, our accredited Public Relations Officers (PROs) take direct legal accountability for every single milestone.'
  }
];

export default function PhilosophyGrid({ items = DEFAULT_PHILOSOPHY_ITEMS, title = "Redefining UAE Relocation & Corporate Immigration", badge = "Our Philosophy & Heritage" }) {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-14 bg-[#050505]">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[10px] bg-[#8C5E00]/15 border border-[#8C5E00]/30 text-[#FFE58F] text-xs font-mono font-bold uppercase tracking-widest"
        >
          <Award className="w-3.5 h-3.5 text-[#FFE58F]" />
          <span>{badge}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight font-sans"
        >
          {title}
        </motion.h2>
      </div>

      {/* Floating Glassmorphic Hover Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((item, idx) => {
          const IconComponent = item.icon || ShieldCheck;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="bg-[#0A0A0A] border border-white/5 shadow-lg relative overflow-hidden group rounded-[10px] p-8 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(140,94,0,0.2)] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top Glow Accent Bar */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Gold Glowing Icon Container */}
                <div className="w-14 h-14 rounded-[10px] bg-gradient-to-br from-[#8C5E00]/20 to-transparent border border-[#8C5E00]/30 flex items-center justify-center mb-6 group-hover:border-[#D4AF37]/50 group-hover:from-[#8C5E00]/30 transition-all">
                  <IconComponent className="w-7 h-7 text-[#FFE58F] group-hover:scale-110 transition-transform duration-300" />
                </div>

                {/* Card Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#FFE58F] transition-colors font-sans">
                  {item.title}
                </h3>

                {/* Card Paragraph */}
                <p className="text-slate-400 leading-relaxed text-sm font-sans font-medium">
                  {item.body || item.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
