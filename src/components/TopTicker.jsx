import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { DEFAULT_TICKER_ITEMS, formatTickerTime } from '../data/tickerData';

export default function TopTicker() {
  const [items, setItems] = useState(DEFAULT_TICKER_ITEMS);

  useEffect(() => {
    const tickerRef = ref(db, 'topBarTicker');
    const unsubscribe = onValue(tickerRef, (snapshot) => {
      const data = snapshot.val();
      if (data && typeof data === 'object') {
        const parsed = Object.values(data).filter((item) => item && item.isActive !== false);
        if (parsed.length > 0) {
          setItems(parsed);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const activeItems = (items || []).filter((item) => item && item.isActive !== false);
  if (activeItems.length === 0) return null;

  return (
    <div className="w-full bg-[#050505] text-slate-200 border-b border-white/10 text-xs py-2 overflow-hidden sticky top-0 z-50 selection:bg-gold selection:text-black">
      <div className="w-full overflow-hidden whitespace-nowrap relative">
        <div className="inline-flex items-center space-x-10 animate-marquee font-sans tracking-wide">
          {/* Render 3 copies for seamless infinite loop */}
          {[...activeItems, ...activeItems, ...activeItems].map((item, idx) => {
            const timeFormatted = formatTickerTime(item) || item.timeText || '';

            return (
              <div key={`${item.id}-${idx}`} className="inline-flex items-center space-x-4 shrink-0 text-xs sm:text-sm">
                {/* Glowing Gold Diamond Star Separator Icon */}
                <span className="text-[#D4AF37] font-bold text-sm drop-shadow-[0_0_8px_rgba(212,175,55,0.8)] select-none">
                  ✦
                </span>

                {/* Main Activity Bullet Content */}
                <span className="text-slate-200 font-medium">
                  {item.name && (
                    <strong className="font-bold text-[#D4AF37] mr-1.5">{item.name}</strong>
                  )}
                  <span>{item.action || item.message}</span>
                  {timeFormatted && (
                    <span className="text-text-muted font-normal ml-1.5 border-l border-white/10 pl-2">
                      – {timeFormatted}
                    </span>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
