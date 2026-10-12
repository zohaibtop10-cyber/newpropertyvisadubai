'use client';

import React, { useState, useEffect } from 'react';
import { calculateTimeRemaining } from '../../src/utils/timeUtils';

const DEFAULT_TICKER_ITEMS = [
  {
    id: 'default-1',
    message: '🔥 Special 10-Year Golden Visa Legal Consultation Discount',
    hasDeadline: true,
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    isActive: true
  },
  {
    id: 'default-2',
    message: '⚡ VIP 24-Hour Express Medical & Emirates ID Processing Available',
    hasDeadline: false,
    isActive: true
  },
  {
    id: 'default-3',
    message: '✨ Zero Retainer Fee Guarantee on GDRFA Family Visa Rejections',
    hasDeadline: true,
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    isActive: true
  }
];

export default function NextTopTicker({ items = DEFAULT_TICKER_ITEMS }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeItems = items.filter((item) => item.isActive !== false);
  if (activeItems.length === 0) return null;

  return (
    <div className="w-full bg-[#030303] text-slate-300 border-b border-white/10 text-xs py-2 overflow-hidden relative z-40 selection:bg-gold selection:text-black">
      <div className="max-w-7xl mx-auto px-4 flex items-center">
        {/* Badge Label */}
        <div className="shrink-0 bg-gold/15 text-gold border border-gold/30 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider mr-4 z-10 hidden sm:inline-block">
          ANNOUNCEMENT
        </div>

        {/* Ticker Marquee */}
        <div className="w-full overflow-hidden whitespace-nowrap relative">
          <div className="inline-flex items-center space-x-8 animate-marquee font-sans">
            {[...activeItems, ...activeItems].map((item, idx) => {
              const timeRemaining = mounted && item.hasDeadline && item.endDate
                ? calculateTimeRemaining(item.endDate)
                : '';

              return (
                <div key={`${item.id}-${idx}`} className="inline-flex items-center space-x-3 shrink-0">
                  {/* Glowing Gold Bullet */}
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_6px_#D4AF37] inline-block shrink-0" />
                  
                  {/* Message */}
                  <span className="text-slate-300 font-medium text-xs sm:text-sm">{item.message}</span>

                  {/* Dynamic Time Badge */}
                  {timeRemaining && (
                    <span className="text-gold font-bold bg-gold/10 border border-gold/30 px-2 py-0.5 rounded text-[10px] font-mono tracking-tight">
                      ⏱ {timeRemaining}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
