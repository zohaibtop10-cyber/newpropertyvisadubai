'use client';

import React from 'react';
import { 
  ClipboardCheck, 
  BadgeCheck, 
  Stethoscope, 
  FileX, 
  Fingerprint, 
  Crown, 
  Sparkles,
  ChevronRight,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Zap,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';

// Icon mapping dictionary
const iconMap = {
  ClipboardCheck,
  BadgeCheck,
  Stethoscope,
  FileX,
  Fingerprint,
  Crown,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Zap,
  Award
};

// Default 6-Step Application Process Data
export const defaultProcessSteps = [
  {
    stepNumber: '1',
    title: 'Document Collection & Audit',
    desc: 'Audit passport copies, title deed, or Ejari for government clearance.',
    iconName: 'ClipboardCheck'
  },
  {
    stepNumber: '2',
    title: 'Initial GDRFA Clearance',
    desc: 'Pre-approval and entry permit electronic filing submitted to ICP/GDRFA.',
    iconName: 'BadgeCheck'
  },
  {
    stepNumber: '3',
    title: 'VIP Medical Fitness Test',
    desc: 'Escorted 30-minute DHA smart medical checkup & X-ray at priority center.',
    iconName: 'Stethoscope'
  },
  {
    stepNumber: '4',
    title: 'Status Change & Visa Stamping',
    desc: 'In-country status modification or seamless old visa cancellation.',
    iconName: 'FileX'
  },
  {
    stepNumber: '5',
    title: 'Emirates ID Biometrics',
    desc: 'Fast-track EID fingerprinting and digital facial biometrics capture.',
    iconName: 'Fingerprint'
  },
  {
    stepNumber: '6',
    title: 'Final Doorstep Delivery',
    desc: 'Residency visa issued & physical Emirates ID card delivered to your door.',
    iconName: 'Crown'
  }
];

export default function ProcessTimeline({
  title = "Our Simple 6-Step Process",
  subtitle = "Our streamlined VIP concierge process from initial document audit to doorstep delivery.",
  steps = defaultProcessSteps
}) {
  const stepList = steps && steps.length > 0 ? steps : defaultProcessSteps;
  const numSteps = stepList.length;

  // Generate smooth SVG Cubic Bezier Sine Wave Path
  const generateWavePath = () => {
    const W = 1000;
    const colW = W / numSteps;
    let path = '';

    stepList.forEach((_, i) => {
      const x = (i + 0.5) * colW;
      const y = i % 2 === 0 ? 55 : 185;

      if (i === 0) {
        path += `M ${x} ${y}`;
      } else {
        const prevX = (i - 0.5) * colW;
        const prevY = (i - 1) % 2 === 0 ? 55 : 185;
        const cp1x = (prevX + x) / 2;
        const cp1y = prevY;
        const cp2x = (prevX + x) / 2;
        const cp2y = y;
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${y}`;
      }
    });

    return path;
  };

  const gridColClasses = {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
    5: 'lg:grid-cols-5',
    6: 'lg:grid-cols-6',
  };
  const desktopGridClass = gridColClasses[numSteps > 6 ? 6 : numSteps] || 'lg:grid-cols-6';

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#050505] border-t border-[#D4AF37]/15 relative overflow-hidden text-white font-sans">
      
      {/* Background Ambient Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[350px] bg-[#D4AF37]/10 rounded-full blur-[180px] pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.07] pointer-events-none -z-10" />

      {/* 1. SECTION HEADER */}
      <div className="max-w-4xl mx-auto text-center mb-16 relative z-10 space-y-3">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] px-4 py-1.5 rounded-[10px] text-xs font-mono font-bold uppercase tracking-widest shadow-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>HOW IT WORKS</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-sans"
        >
          <span>{title}</span>
        </motion.h2>

        {subtitle && (
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium"
          >
            <span>{subtitle}</span>
          </motion.p>
        )}
      </div>

      {/* 2. WAVE TIMELINE WRAPPER (Auto-fits 100% width, zero horizontal scrollbar) */}
      <div className="relative w-full max-w-7xl mx-auto">
        
        {/* SVG Smooth Sine Wave Path for Desktop */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
          <svg className="w-full h-[240px]" preserveAspectRatio="none" viewBox="0 0 1000 240" fill="none">
            <path
              d={generateWavePath()}
              stroke="url(#gold-wave-gradient)"
              strokeWidth="3.5"
              strokeDasharray="6 6"
              className="animate-pulse opacity-80"
            />
            <defs>
              <linearGradient id="gold-wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8C5E00" />
                <stop offset="30%" stopColor="#D4AF37" />
                <stop offset="70%" stopColor="#FFF5C0" />
                <stop offset="100%" stopColor="#D4AF37" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Desktop Wave Grid Layout */}
        <div className={`hidden lg:grid ${desktopGridClass} gap-4 w-full relative z-10`}>
          {stepList.map((step, idx) => {
            const RawIcon = step.icon || iconMap[step.iconName] || ClipboardCheck;
            const stepNum = step.stepNumber || step.step || idx + 1;
            const isOffsetLower = idx % 2 === 1;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: isOffsetLower ? 35 : -15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: idx * 0.08 }}
                className={`flex flex-col items-center text-center relative group ${
                  isOffsetLower ? 'mt-28' : 'mb-6'
                }`}
              >
                {/* Large Subtle Watermark Step Number */}
                <span className="absolute -top-7 text-6xl xl:text-7xl font-black font-serif text-white/5 select-none pointer-events-none group-hover:text-[#D4AF37]/15 transition-colors duration-300">
                  {stepNum}
                </span>

                {/* Floating Wave Node Badge Icon */}
                <div className="relative mb-5 z-10">
                  <div className="w-14 h-14 rounded-[12px] bg-[#111319] border-2 border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.3)] flex items-center justify-center group-hover:scale-110 group-hover:bg-dark-gold-gloss group-hover:text-black transition-all duration-300 cursor-pointer">
                    <RawIcon className="w-6 h-6 text-[#D4AF37] group-hover:text-black stroke-[2.2] transition-colors" />
                  </div>
                  {/* Subtle Node Ring */}
                  <div className="absolute -inset-1 rounded-[12px] bg-[#D4AF37]/20 blur-sm pointer-events-none -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Card Container */}
                <div className="p-4 rounded-[10px] bg-[#111319]/90 border border-white/10 group-hover:border-[#D4AF37]/60 group-hover:shadow-[0_15px_30px_rgba(212,175,55,0.15)] group-hover:-translate-y-1 transition-all duration-300 w-full min-h-[120px] flex flex-col justify-center">
                  <div className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-widest mb-1">
                    STEP {stepNum}
                  </div>
                  <h4 className="text-sm font-extrabold text-white mb-1 leading-snug group-hover:text-[#D4AF37] transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium line-clamp-3">
                    {step.desc || step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Medium Screen Grid (2-3 columns) */}
        <div className="hidden md:grid lg:hidden grid-cols-2 sm:grid-cols-3 gap-5 relative z-10">
          {stepList.map((step, idx) => {
            const RawIcon = step.icon || iconMap[step.iconName] || ClipboardCheck;
            const stepNum = step.stepNumber || step.step || idx + 1;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-5 rounded-[10px] bg-[#111319] border border-white/10 hover:border-[#D4AF37] hover:shadow-[0_10px_30px_rgba(212,175,55,0.2)] transition-all duration-300 relative group flex flex-col items-start"
              >
                <span className="absolute top-2 right-3 text-5xl font-black font-serif text-white/5 select-none group-hover:text-[#D4AF37]/15 transition-colors">
                  {stepNum}
                </span>

                <div className="w-12 h-12 rounded-[10px] bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center mb-4 text-[#D4AF37] group-hover:bg-dark-gold-gloss group-hover:text-black transition-all">
                  <RawIcon className="w-5 h-5 stroke-[2.2]" />
                </div>

                <div className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-widest mb-1">
                  STEP {stepNum}
                </div>
                <h4 className="text-base font-extrabold text-white mb-1.5 group-hover:text-[#D4AF37] transition-colors">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {step.desc || step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Vertical Flow Timeline */}
        <div className="md:hidden relative space-y-4">
          <div className="absolute left-[26px] top-6 bottom-6 w-0.5 border-l-2 border-dashed border-[#D4AF37]/40 z-0" />

          {stepList.map((step, idx) => {
            const RawIcon = step.icon || iconMap[step.iconName] || ClipboardCheck;
            const stepNum = step.stepNumber || step.step || idx + 1;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.06 }}
                className="flex items-center gap-4 bg-[#111319] border border-white/10 p-4 rounded-[10px] shadow-md relative z-10 hover:border-[#D4AF37]/50 transition-all"
              >
                <div className="shrink-0 relative">
                  <div className="w-12 h-12 rounded-[10px] bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                    <RawIcon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-[8px] bg-dark-gold-gloss text-black font-mono font-black text-[10px] flex items-center justify-center shadow-md">
                    {stepNum}
                  </span>
                </div>

                <div className="space-y-0.5 min-w-0 flex-1">
                  <div className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider">
                    STEP {stepNum}
                  </div>
                  <h3 className="text-white font-bold text-xs truncate">
                    {step.title}
                  </h3>
                  <p className="text-slate-300 text-[11px] leading-snug line-clamp-2">
                    {step.desc || step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

    </section>
  );
}

