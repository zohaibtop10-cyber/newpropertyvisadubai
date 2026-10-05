import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const DEFAULT_STATS = [
  { value: "500+", numericValue: 500, suffix: "+", label: "CORPORATE ENTITIES", detail: "Incorporated across Dubai DIFC, ADGM & Free Zones" },
  { value: "15,000+", numericValue: 15000, suffix: "+", label: "VISAS PROCESSED", detail: "Zero-rejection SLA across GDRFA & ICP portals" },
  { value: "15+", numericValue: 15, suffix: "+", label: "YEARS IN DUBAI", detail: "Senior advisory council headquartered in Business Bay" },
  { value: "99.8%", numericValue: 99.8, suffix: "%", decimals: 1, label: "SLA ACCURACY", detail: "Statutory government fees billed at exact cost" }
];

function AnimatedCounter({ value, numericValue, suffix = "", decimals = 0, isInView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || typeof numericValue !== 'number') return;
    let start = 0;
    const end = numericValue;
    const duration = 1800; // ms
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentVal = start + (end - start) * eased;
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [isInView, numericValue]);

  if (typeof numericValue !== 'number') {
    return <span>{value}</span>;
  }

  const formatted = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString();

  return (
    <span>
      {formatted}{suffix}
    </span>
  );
}

export default function ImpactStatsBar({ stats = DEFAULT_STATS }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-[#050505] relative overflow-hidden" ref={containerRef}>
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[250px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating Pill/Ribbon Container */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-[20px] p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center text-center px-4 lg:px-6 ${
                idx < stats.length - 1 ? 'lg:border-r lg:border-white/10' : ''
              }`}
            >
              {/* Metallic Gold Animated Number */}
              <div className="bg-gradient-to-r from-[#D4AF37] via-[#FFE58F] to-[#8C5E00] bg-clip-text text-transparent text-4xl sm:text-5xl font-black mb-2 tracking-tight font-sans">
                <AnimatedCounter
                  value={stat.value}
                  numericValue={stat.numericValue}
                  suffix={stat.suffix}
                  decimals={stat.decimals || 0}
                  isInView={isInView}
                />
              </div>

              {/* Stat Label */}
              <h4 className="text-white font-bold tracking-wider text-xs uppercase mb-1 font-sans">
                {stat.label}
              </h4>

              {/* Detail Subtext */}
              <p className="text-slate-500 text-xs font-medium max-w-[200px] leading-snug font-sans">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
