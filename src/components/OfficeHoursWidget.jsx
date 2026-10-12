'use client';
import React, { useState, useEffect } from 'react';

export default function OfficeHoursWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const checkHours = () => {
      // UAE is UTC+4
      const uaeTime = new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Dubai"}));
      const day = uaeTime.getDay(); // 0 is Sunday
      const hour = uaeTime.getHours();
      
      // Mon-Sat (1-6), 08:00 - 20:00 (8-19)
      const isWorkingDay = day >= 1 && day <= 6;
      const isWorkingHour = hour >= 8 && hour < 20;
      
      setIsOpen(isWorkingDay && isWorkingHour);
      setLocalTime(uaeTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    };

    checkHours();
    const interval = setInterval(checkHours, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 mt-4 text-sm bg-surface/10 p-3 rounded-[6px] border border-border-hairline w-max">
      <div className="flex flex-col">
        <span className="text-text-muted text-xs">Dubai Time: {localTime}</span>
        <div className="flex items-center gap-2 font-medium">
          <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500 shadow-glow-green' : 'bg-red-500'}`}></span>
          <span className={isOpen ? 'text-text' : 'text-text-muted'}>
            {isOpen ? 'Office Open Now' : 'Office Closed'}
          </span>
        </div>
      </div>
    </div>
  );
}
