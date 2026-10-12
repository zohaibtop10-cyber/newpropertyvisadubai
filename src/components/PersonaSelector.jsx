import React, { useState } from 'react';

export default function PersonaSelector() {
  const [active, setActive] = useState('investor');

  const personas = [
    { id: 'investor', label: "I'm an investor" },
    { id: 'family', label: "I'm relocating with family" },
    { id: 'partner', label: "I'm a referral partner" },
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <span className="text-text-muted text-sm self-center mr-2">Who are you?</span>
      {personas.map(p => (
        <button
          key={p.id}
          onClick={() => setActive(p.id)}
          className={`px-4 py-2 rounded-[6px] text-sm font-medium transition-colors border ${
            active === p.id
              ? 'bg-gold text-bg border-gold'
              : 'bg-surface text-text border-border-hairline hover:border-gold/50'
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
