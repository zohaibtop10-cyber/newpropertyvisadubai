import React from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { Calculator } from 'lucide-react';
import { siteConfig } from '../data/propertyVisaData';

export default function MobileFooter({  onOpenCalculator , cmsConfig }) {
  return (
    <div className="fixed bottom-0 w-full flex md:hidden z-[100] bg-[#070C16] border-t border-[#F5D061]/25 p-2 shadow-2xl">
      <div className="grid grid-cols-2 gap-2 w-full">
        {/* Left 50%: Radiant Shining Gold "Calculate Fees" */}
        <button
          onClick={() => onOpenCalculator && onOpenCalculator('golden')}
          className="flex items-center justify-center gap-2 btn-gold text-slate-950 py-3 rounded-[10px] font-black text-xs transition-all shadow-md cursor-pointer"
        >
          <Calculator className="w-4 h-4 text-slate-950 stroke-[2.5]" />
          <span>Calculate Fees</span>
        </button>

        {/* Right 50%: WhatsApp Direct Link */}
        <a
          href={`https://wa.me/${cmsConfig?.global?.whatsappRaw || siteConfig.whatsappRaw}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#128C7E] hover:bg-[#075E54] text-white py-3 rounded-[10px] font-bold text-xs transition-all shadow-md shadow-emerald-950/40"
        >
          <WhatsAppIcon className="w-4 h-4 text-white" />
          <span>Chat with Expert</span>
        </a>
      </div>
    </div>
  );
}
