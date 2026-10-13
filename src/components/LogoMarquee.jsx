import React from 'react';
import { Building2, ShieldCheck, Scale, FileCheck, Crown, Sparkles, Award } from 'lucide-react';

export default function LogoMarquee() {
  const governmentPartners = [
    { name: 'Dubai Land Department (DLD)', sub: 'Taskeen Real Estate Trustee', icon: Building2 },
    { name: 'GDRFA Dubai', sub: 'Directorate of Residency & Foreigners', icon: Crown },
    { name: 'Federal ICP', sub: 'Identity, Citizenship & Ports', icon: ShieldCheck },
    { name: 'Economy & Tourism (DET)', sub: 'Official Commercial Licensing', icon: Award },
    { name: 'Dubai Courts', sub: 'Notary Public & Electronic POA', icon: Scale },
    { name: 'Smart Salem DHA', sub: 'VIP AI Medical Fitness Screening', icon: Sparkles },
    { name: 'Ministry of Foreign Affairs (MOFA)', sub: 'Official Legalization & Stamping', icon: FileCheck },
    { name: 'Ministry of Justice (MOJ)', sub: 'Sworn Arabic Legal Translation', icon: Scale },
  ];

  return (
    <div className="w-full overflow-hidden py-4 smooth-marquee-mask">
      <div className="flex items-center group">
        <div className="flex space-x-5 animate-[marquee_35s_linear_infinite] group-hover:[animation-play-state:paused] pr-5">
          {[...governmentPartners, ...governmentPartners, ...governmentPartners].map((gov, idx) => {
            const GovIcon = gov.icon;
            return (
              <div 
                key={idx} 
                className="inline-flex items-center gap-3 px-4 py-2.5 rounded-[10px] bg-white border border-[#E8DFC8] shadow-sm hover:shadow-md hover:border-[#C59B27]/60 transition-all shrink-0 cursor-default group/item"
              >
                <div className="w-8 h-8 rounded-[8px] bg-[#F6EED9] border border-[#EFC45C]/40 text-[#8A6412] flex items-center justify-center shrink-0 shadow-sm group-hover/item:scale-105 transition-transform">
                  <GovIcon className="w-4 h-4 stroke-[2]" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-black tracking-tight text-slate-900 block leading-tight">
                    {gov.name}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500 block leading-none mt-0.5 font-mono">
                    {gov.sub}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
