"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Target, Search, FileCheck, Fingerprint, Award, Package, RefreshCw } from 'lucide-react';

export function ProcessSection() {
  const steps = [
    {
      step: 1,
      title: '1. Consultation',
      subtext: 'Target & Document Strategy',
      color: 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400',
      badgeBg: 'bg-blue-600',
      shadow: 'shadow-[0_10px_30px_rgba(37,99,235,0.15)]',
      icon: <Target className="w-8 h-8 text-amber-500 fill-amber-500/20" />,
      deg: 0,
    },
    {
      step: 2,
      title: '2. Document Assembly',
      subtext: 'Filing & Attestation Prep',
      color: 'border-emerald-500 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400',
      badgeBg: 'bg-emerald-600',
      shadow: 'shadow-[0_10px_30px_rgba(16,185,129,0.15)]',
      icon: <Search className="w-8 h-8 text-amber-500" />,
      deg: 60,
    },
    {
      step: 3,
      title: '3. Pre-Audit & Submission',
      subtext: 'GDRFA System Pre-Check',
      color: 'border-amber-500 text-amber-600 dark:border-amber-400 dark:text-amber-400',
      badgeBg: 'bg-amber-500',
      shadow: 'shadow-[0_10px_30px_rgba(245,158,11,0.15)]',
      icon: <FileCheck className="w-8 h-8 text-amber-500" />,
      deg: 120,
    },
    {
      step: 4,
      title: '4. VIP Medical & Biometrics',
      subtext: 'Fingerprint & Fast Medical',
      color: 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400',
      badgeBg: 'bg-indigo-600',
      shadow: 'shadow-[0_10px_30px_rgba(79,70,229,0.15)]',
      icon: <Fingerprint className="w-8 h-8 text-amber-500" />,
      deg: 180,
    },
    {
      step: 5,
      title: '5. GDRFA Approval',
      subtext: 'Visa Issued & Verified',
      color: 'border-teal-500 text-teal-600 dark:border-teal-400 dark:text-teal-400',
      badgeBg: 'bg-teal-600',
      shadow: 'shadow-[0_10px_30px_rgba(20,184,166,0.15)]',
      icon: <Award className="w-8 h-8 text-amber-500 fill-amber-500/20" />,
      deg: 240,
    },
    {
      step: 6,
      title: '6. Handover & Delivery',
      subtext: 'VIP Express Courier',
      color: 'border-pink-500 text-pink-600 dark:border-pink-400 dark:text-pink-400',
      badgeBg: 'bg-pink-600',
      shadow: 'shadow-[0_10px_30px_rgba(236,72,153,0.15)]',
      icon: <Package className="w-8 h-8 text-amber-500" />,
      deg: 300,
    },
  ];

  return (
    <section className="bg-white dark:bg-slate-900 py-24 border-y border-slate-100 dark:border-slate-800 overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        
        {/* Top Header matching reference screenshot */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400/20 via-yellow-300/30 to-amber-500/20 text-[#D4AF37] dark:text-amber-300 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider shadow-sm mb-4 border border-[#D4AF37]/40">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            THE WORKFLOW
          </span>
          
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-3">
            Our 6-Step Cyclical Process
          </h2>
          
          <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg">
            An effortless, expert-guided journey to your residency and business launch.
          </p>
        </div>

        {/* Circular Cyclical Diagram Layout */}
        <div className="relative w-full max-w-[800px] aspect-square mx-auto hidden lg:block my-4">
          
          {/* Orbital Circular Track with Clockwise Arrow Indicators */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 800" fill="none">
            <circle cx="400" cy="400" r="300" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="6 6" className="dark:stroke-slate-800" />
            
            {/* Clockwise Curved Connecting Arrow Markers */}
            <path d="M 460,110 A 300,300 0 0,1 660,260" stroke="#94A3B8" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
            <path d="M 690,340 A 300,300 0 0,1 660,540" stroke="#94A3B8" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
            <path d="M 600,640 A 300,300 0 0,1 400,700" stroke="#94A3B8" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
            <path d="M 340,690 A 300,300 0 0,1 140,540" stroke="#94A3B8" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
            <path d="M 110,460 A 300,300 0 0,1 140,260" stroke="#94A3B8" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
            <path d="M 200,160 A 300,300 0 0,1 340,110" stroke="#94A3B8" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />

            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748B" />
              </marker>
            </defs>
          </svg>

          {/* Center Hub Circle matching reference screenshot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-72 sm:h-72 bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-full flex flex-col items-center justify-center text-center shadow-[0_20px_60px_rgba(0,0,0,0.08)] z-10 border-4 border-slate-100 dark:border-slate-800 p-6">
            <h3 className="text-2xl font-extrabold tracking-tight leading-tight mb-2 text-slate-900 dark:text-white">
              Seamless<br />Application<br />Workflow
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[180px] leading-relaxed mt-1">
              Continuous expert processing from start to finish.
            </p>
          </div>

          {/* 6 Circular Nodes positioned along orbit radius 300px */}
          {steps.map((node, idx) => {
            const angleInRad = (node.deg - 90) * (Math.PI / 180);
            const radius = 300;
            const cx = 400 + radius * Math.cos(angleInRad);
            const cy = 400 + radius * Math.sin(angleInRad);

            return (
              <motion.div
                key={node.step}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                style={{
                  left: `${(cx / 800) * 100}%`,
                  top: `${(cy / 800) * 100}%`,
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white dark:bg-slate-900 border-2 ${node.color.split(' ')[0]} rounded-full ${node.shadow} flex flex-col items-center justify-center p-4 text-center z-20 group hover:scale-105 transition-transform cursor-default`}
              >
                {/* Step Number Badge pill on top border */}
                <div className={`absolute -top-3 w-7 h-7 rounded-full ${node.badgeBg} text-white flex items-center justify-center text-xs font-black shadow-md`}>
                  {node.step}
                </div>

                {/* Center Icon */}
                <div className="mb-1.5 p-2 rounded-2xl bg-amber-500/10">
                  {node.icon}
                </div>

                {/* Node Title & Subtext */}
                <h4 className="text-sm font-black text-slate-900 dark:text-white leading-tight mb-0.5">
                  {node.title}
                </h4>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium leading-tight max-w-[130px]">
                  {node.subtext}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Responsive Grid View for Mobile & Tablet */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {steps.map((step) => (
            <div
              key={step.step}
              className={`bg-white dark:bg-slate-900 p-6 rounded-2xl border-2 ${step.color.split(' ')[0]} ${step.shadow} flex items-center gap-4`}
            >
              <div className={`w-12 h-12 rounded-2xl ${step.badgeBg} text-white flex items-center justify-center font-black text-lg shrink-0 shadow-md`}>
                {step.step}
              </div>
              <div>
                <h4 className="font-extrabold text-base text-slate-900 dark:text-white">{step.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{step.subtext}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Notification Pill matching reference screenshot */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2.5 bg-slate-800/90 text-white dark:bg-slate-800 dark:text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold shadow-xl border border-slate-700">
            <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            </div>
            <span>
              Processing is not linear. We handle <span className="text-amber-300 underline font-black">ongoing renewals & PRO services.</span>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

export default ProcessSection;
