import React from 'react';

export default function LiveFeeExample() {
  return (
    <div className="glass-panel rounded-[10px] p-6 max-w-md w-full relative overflow-hidden group">
      {/* Subtle hover gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <h3 className="font-semibold text-lg text-text">Live Fee Example</h3>
          <p className="text-sm text-text-muted mt-1">Property investor — title-deed value from AED 2,000,000</p>
        </div>
        <div className="text-xs font-medium text-gold bg-gold-soft/10 px-2 py-1 rounded border border-gold/20 whitespace-nowrap ml-4">
          Licence 800 DOCS LLC SOC
        </div>
      </div>
      
      <div className="space-y-3 text-sm relative z-10 mt-6">
        <div className="flex justify-between border-b border-border-hairline pb-2">
          <span className="text-text-muted">DLD and admin fees</span>
          <span className="font-medium text-text">AED 5,333</span>
        </div>
        <div className="flex justify-between border-b border-border-hairline pb-2">
          <span className="text-text-muted">Medical fitness test</span>
          <span className="font-medium text-text">AED 700</span>
        </div>
        <div className="flex justify-between border-b border-border-hairline pb-2">
          <span className="text-text-muted">Emirates ID processing</span>
          <span className="font-medium text-text">AED 1,150</span>
        </div>
        <div className="flex justify-between border-b border-border-hairline pb-2">
          <span className="text-text-muted">Golden Visa stamping</span>
          <span className="font-medium text-text">AED 2,800</span>
        </div>
        <div className="flex justify-between pt-3 font-semibold text-base">
          <span className="text-text">Total Estimated Fees</span>
          <span className="text-gold">AED 9,983</span>
        </div>
      </div>
    </div>
  );
}
