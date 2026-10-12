import React from 'react';

export default function LogoMarquee() {
  const logos = [
    'Dubai Land Department (DLD)',
    'ICP UAE',
    'GDRFA Dubai',
    'Department of Economy and Tourism',
    'DHA',
    'Dubai Courts',
  ];

  return (
    <div className="overflow-hidden bg-surface/30 border-y border-border-hairline py-8 mask-edges-x">
      <div className="flex items-center group">
        <div className="flex space-x-12 animate-[marquee_30s_linear_infinite] group-hover:[animation-play-state:paused] pr-12">
          {[...logos, ...logos, ...logos].map((logo, idx) => (
            <span 
              key={idx} 
              className="text-text-muted font-medium text-sm whitespace-nowrap opacity-50 hover:opacity-100 hover:text-text transition-all duration-300 cursor-default"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
