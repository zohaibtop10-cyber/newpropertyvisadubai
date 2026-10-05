import React from 'react';
import { CheckCircle2 } from 'lucide-react';

/**
 * ServiceOptionsBlock (Dynamic Bento / Comparative Grid)
 * 
 * Conditionally renders comparative options for a service.
 * If no options exist (or empty array), returns null cleanly.
 * 
 * @param {Array} options - Array of option objects
 * @param {string} title - Section title (defaults to "Eligibility & Comparative Options")
 * @param {string} subtitle - Section subtitle
 */
export default function ServiceOptionsBlock({ 
  options = [], 
  title = "Eligibility & Comparative Options", 
  subtitle = "Compare available service tiers, minimum investment thresholds, and package privileges." 
}) {
  // Directive Rule 2: Conditional Rendering Check
  if (!options || !Array.isArray(options) || options.length === 0) {
    return null;
  }

  // Directive Rule 3: Dynamic Grid Layout Calculation
  const getGridColsClass = (count) => {
    switch (count) {
      case 1:
        return "grid-cols-1 max-w-xl mx-auto";
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-3";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
    }
  };

  const gridClass = getGridColsClass(options.length);

  return (
    <section className="py-24 px-6 bg-slate-50 dark:bg-[#050505] border-t border-slate-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 bg-brand-goldBg/10 border border-brand-goldBg/30 text-brand-goldText text-xs font-semibold rounded-[10px] mb-3 uppercase tracking-wider">
            Qualification Framework
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
              {subtitle}
            </p>
          )}
        </div>

        {/* Dynamic Responsive Grid */}
        <div className={`grid ${gridClass} gap-8`}>
          {options.map((card, idx) => (
            <div 
              key={card.id || idx}
              className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 rounded-[10px] p-6 lg:p-8 hover:border-brand-goldBg/40 transition-all space-y-6 shadow-xl dark:shadow-2xl relative overflow-hidden group"
            >
              {/* Option Header */}
              <div className="flex items-start justify-between border-b border-slate-200 dark:border-white/10 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                    {card.subtitle || card.threshold}
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-brand-goldText font-mono tracking-tight mb-2">
                    {card.investment || card.price}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-goldText transition-colors">
                    {card.title}
                  </h3>
                </div>
                {card.badge && (
                  <span className="bg-slate-100 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 text-[10px] font-mono font-bold px-3 py-1 rounded-[10px]">
                    {card.badge}
                  </span>
                )}
              </div>

              {/* Feature Highlights */}
              {card.highlights && card.highlights.length > 0 && (
                <ul className="space-y-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {card.highlights.map((hl, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-brand-goldText shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{hl}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
