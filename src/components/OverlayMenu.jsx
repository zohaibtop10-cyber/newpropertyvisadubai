import React, { useState } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import {
  X,
  Users,
  Crown,
  Building2,
  Baby,
  UserCheck,
  IdCard,
  Briefcase,
  Building,
  FileCheck,
  Languages,
  FileEdit,
  ScrollText,
  Scale,
  Stethoscope,
  Clock,
  ShieldAlert,
  Calculator,
  ChevronRight,
  Search,
  Sparkles,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { siteConfig } from '../data/cmsData';

export default function OverlayMenu({
  isOpen,
  onClose,
  onNavigate,
  onOpenCalculator,
  cmsConfig
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  if (!isOpen) return null;

  const handleSelectService = (serviceId) => {
    onClose();
    onNavigate('service', serviceId);
  };

  const categories = ['All', 'Residency Visas', 'Golden & Property', 'Document & Legal'];

  // 1. Featured Flagship Services (6 Glassmorphic Square Cards with Price Tags)
  const flagshipServices = [
    { id: 'family-visa', label: 'Family Visa', subtitle: 'Spouse & Children', icon: Users, badge: 'Popular', category: 'Residency Visas', price: 'AED 1,450' },
    { id: 'golden-visa', label: 'Golden Visa', subtitle: '10-Year Sovereign', icon: Crown, badge: '10-Year VIP', category: 'Golden & Property', price: 'AED 2,450' },
    { id: 'property-visa', label: 'Property Visa', subtitle: 'AED 2M+ Equity', icon: Building2, badge: 'DLD Direct', category: 'Golden & Property', price: 'AED 2,150' },
    { id: 'new-born', label: 'Newborn Visa', subtitle: '120-Day Fast Track', icon: Baby, badge: 'Express', category: 'Residency Visas', price: 'AED 1,250' },
    { id: 'maid-visa', label: 'Maid Visa', subtitle: 'Domestic Helper', icon: UserCheck, badge: 'Tadbeer', category: 'Residency Visas', price: 'AED 1,650' },
    { id: 'visa-medical-emirates-id-location', label: 'Emirates ID', subtitle: 'VIP Biometrics', icon: IdCard, badge: 'Fast-Track', category: 'Residency Visas', price: 'AED 390' }
  ];

  // 2. Additional UAE Services Grid
  const additionalServices = [
    { id: 'pro-services', title: 'PRO Services', subtitle: 'Corporate quota & trade license renewals', icon: Briefcase, category: 'Document & Legal', price: 'Annual Retainers' },
    { id: 'amer-center', title: 'Amer Center', subtitle: 'GDRFA official clearance & typing', icon: Building, category: 'Residency Visas', price: 'GDRFA Direct' },
    { id: 'attestation', title: 'Attestation', subtitle: 'MOFA & embassy legalization for certificates', icon: FileCheck, category: 'Document & Legal', price: 'MOFA Legalized' },
    { id: 'legal-translation', title: 'Legal Translation', subtitle: 'MOJ certified Arabic document translations', icon: Languages, category: 'Document & Legal', price: 'MOJ Certified' },
    { id: 'poa', title: 'Power of Attorney', subtitle: 'Personal & corporate legal representation POA', icon: FileEdit, category: 'Document & Legal', price: 'Notary Public' },
    { id: 'wills-last-testament', title: 'Wills & Testament', subtitle: 'DIFC & ADJD non-Muslim estate protection', icon: ScrollText, category: 'Document & Legal', price: 'DIFC Court' },
    { id: 'dld-trustee-services', title: 'DLD Trustee Services', subtitle: 'Property transfer & title deed clearance', icon: Building, category: 'Golden & Property', price: 'DLD Audit' },
    { id: 'property-revaluation', title: 'Property Revaluation', subtitle: 'Official DLD valuation certificates', icon: Scale, category: 'Golden & Property', price: 'Official DLD' },
    { id: 'visa-medical-emirates-id-location', title: 'Medical & EID', subtitle: '24-hour express medical screening centers', icon: Stethoscope, category: 'Residency Visas', price: '24H VIP' },
    { id: 'check-visa-status-uae', title: 'Visa Validity Checker', subtitle: 'Instant ICP & GDRFA visa status verification', icon: Clock, category: 'Residency Visas', price: 'Instant Audit' },
    { id: 'iloe-insurance', title: 'ILOE Insurance', subtitle: 'Mandatory UAE unemployment insurance', icon: ShieldAlert, category: 'Document & Legal', price: 'MOHRE Shield' }
  ];

  // Filter Logic
  const filteredFlagship = flagshipServices.filter((srv) => {
    const matchesSearch = srv.label.toLowerCase().includes(searchQuery.toLowerCase()) || srv.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || srv.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredAdditional = additionalServices.filter((srv) => {
    const matchesSearch = srv.title.toLowerCase().includes(searchQuery.toLowerCase()) || srv.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || srv.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn overflow-y-auto">
      
      <div className="w-full max-w-6xl bg-[#0A0B0E] border-[1.5px] border-brand-gold/40 rounded-2xl shadow-[0_0_80px_rgba(212,175,55,0.25)] relative my-auto text-white flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Top Header & Search Bar */}
        <div className="px-6 py-5 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-b from-[#141720] to-[#0A0B0E] shrink-0 rounded-t-2xl">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-brand-gold/15 border border-brand-gold/40 flex items-center justify-center text-brand-gold shadow-lg shadow-brand-gold/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-xl tracking-tight text-white">
                  {cmsConfig?.global?.branding?.brandTitle || 'PropertyVisaDubai'}
                </span>
                <span className="text-[10px] font-mono font-bold text-brand-gold bg-brand-gold/15 border border-brand-gold/40 px-2.5 py-0.5 rounded-full uppercase">
                  GDRFA & DET Directory
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 font-medium">Explore all family residency, Golden Visas & document clearing services</p>
            </div>
          </div>

          {/* Search Input */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-8 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-gold transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs w-4 h-4 rounded-full bg-white/10 flex items-center justify-center"
                >
                  ×
                </button>
              )}
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center border border-white/10 hover:border-brand-gold/40 transition-colors cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="px-6 py-3 border-b border-white/5 bg-[#10121a] shrink-0 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap cursor-pointer transition-all ${
                activeCategory === cat
                  ? 'bg-brand-gold text-black border border-brand-gold font-black shadow-[0_0_18px_rgba(212,175,55,0.35)]'
                  : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto flex-1 bg-gradient-to-b from-[#0A0B0E] via-[#0E1017] to-[#0A0B0E]">
          
          {/* 1. Featured Flagship Services */}
          {filteredFlagship.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-extrabold uppercase tracking-widest text-brand-gold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured Flagship Services</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
                {filteredFlagship.map((item) => {
                  const IconComp = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectService(item.id)}
                      className="relative flex flex-col items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-brand-gold/60 hover:bg-white/[0.07] hover:shadow-[0_0_25px_rgba(212,175,55,0.18)] transition-all duration-300 group cursor-pointer text-center h-full min-h-[160px]"
                    >
                      {/* Badge */}
                      {item.badge && (
                        <span className="absolute -top-2.5 bg-[#14161f] border border-brand-gold/40 text-brand-gold text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full z-10 shadow-sm">
                          {item.badge}
                        </span>
                      )}

                      {/* Icon */}
                      <div className="w-11 h-11 rounded-xl border border-brand-gold/30 bg-brand-gold/10 flex items-center justify-center text-brand-gold mt-2 group-hover:bg-brand-gold group-hover:text-black group-hover:shadow-lg transition-all">
                        <IconComp className="w-5 h-5" />
                      </div>

                      {/* Text */}
                      <div className="my-2">
                        <span className="text-white font-extrabold text-sm block leading-tight group-hover:text-brand-gold transition-colors">{item.label}</span>
                        <span className="text-slate-400 text-[11px] block mt-0.5 leading-none">{item.subtitle}</span>
                      </div>

                      {/* Price Tag */}
                      <div className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-md">
                        {item.price}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. Additional UAE Services Grid */}
          {filteredAdditional.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-extrabold uppercase tracking-widest text-slate-400">
                <Building className="w-3.5 h-3.5 text-brand-gold" />
                <span>Additional UAE Services & Concierge</span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {filteredAdditional.map((srv) => {
                  const Icon = srv.icon;
                  return (
                    <div
                      key={srv.id}
                      onClick={() => handleSelectService(srv.id)}
                      className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.06] hover:border-brand-gold/40 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* Icon Container */}
                        <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex flex-shrink-0 items-center justify-center text-slate-400 group-hover:text-brand-gold group-hover:border-brand-gold/40 group-hover:bg-brand-gold/10 transition-colors">
                          <Icon className="w-5 h-5 stroke-[2]" />
                        </div>
                        
                        <div className="min-w-0">
                          <h4 className="text-slate-200 font-bold text-sm group-hover:text-white transition-colors truncate">
                            {srv.title}
                          </h4>
                          <p className="text-slate-400 text-xs mt-0.5 line-clamp-1 leading-snug">
                            {srv.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-md hidden sm:inline">
                          {srv.price}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {filteredFlagship.length === 0 && filteredAdditional.length === 0 && (
            <div className="py-12 text-center text-slate-500 font-mono text-xs">
              No services match your search query "{searchQuery}".
            </div>
          )}

        </div>

        {/* Sticky Bottom Action Bar */}
        <div className="sticky bottom-0 w-full bg-[#0E1017] border-t border-white/10 p-4 md:p-5 flex flex-col sm:flex-row gap-3 justify-center z-20 rounded-b-2xl">
          <button
            onClick={() => {
              onClose();
              onOpenCalculator('family');
            }}
            className="flex-1 max-w-sm bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 text-black font-extrabold py-3.5 px-6 rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 text-xs uppercase font-mono tracking-wider cursor-pointer"
          >
            <Calculator className="w-4 h-4" />
            <span>Open Pop-Up Fee Calculator</span>
          </button>

          <a
            href={`https://wa.me/${cmsConfig?.global?.whatsappRaw || siteConfig.whatsappRaw}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 max-w-sm bg-dark-gold-gloss hover:bg-[#20BD5A] text-white font-extrabold py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 text-xs uppercase font-mono tracking-wider cursor-pointer"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>WhatsApp Senior Advisor</span>
          </a>
        </div>

      </div>

    </div>
  );
}

// Alias export for backwards compatibility
export { OverlayMenu as ServiceDirectoryModal };
