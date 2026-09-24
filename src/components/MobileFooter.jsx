import React from 'react';
import { Calculator, MessageSquare } from 'lucide-react';
import { siteConfig } from '../data/propertyVisaData';

export default function MobileFooter({  onOpenCalculator , cmsConfig }) {
  return (
    <div className="fixed bottom-0 w-full flex md:hidden z-[100] bg-[#0A0A0A] border-t border-white/10 p-2 shadow-2xl">
      <div className="grid grid-cols-2 gap-2 w-full">
        {/* Left 50%: Dark Background "Calculate Fees" */}
        <button
          onClick={() => onOpenCalculator()}
          className="flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-[#252525] text-white py-3 rounded-xl font-semibold text-xs transition-all border border-white/10 shadow-md cursor-pointer"
        >
          <Calculator className="w-4 h-4 text-[#0284C7]" />
          <span>Calculate Fees</span>
        </button>

        {/* Right 50%: WhatsApp Green Background */}
        <a
          href={`https://wa.me/${cmsConfig?.global?.whatsappRaw || siteConfig.whatsappRaw}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold text-xs transition-all shadow-md shadow-emerald-600/30"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Chat with Expert</span>
        </a>
      </div>
    </div>
  );
}
