import React from 'react';
import { motion } from 'framer-motion';

const DEFAULT_SERVICE_STATS = [
  { value: "3,200+", label: "PROPERTIES FILED" },
  { value: "72 hrs", label: "AVERAGE SLA TIME" },
  { value: "100%", label: "APPROVAL RATE" },
  { value: "AED 0", label: "HIDDEN SURCHARGES" }
];

export default function ServiceStats({ stats = DEFAULT_SERVICE_STATS, className = "" }) {
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#050505] font-sans ${className}`}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-[#0A0A0A] border border-white/5 rounded-[10px] py-8 px-4 flex flex-col items-center justify-center text-center shadow-lg hover:border-white/10 transition-colors"
          >
            {/* Metallic Gold Gradient Numbers */}
            <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFE58F] mb-2 font-sans">
              {stat.value}
            </div>

            {/* Label */}
            <div className="text-text-muted text-[11px] font-bold tracking-widest uppercase font-mono">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
