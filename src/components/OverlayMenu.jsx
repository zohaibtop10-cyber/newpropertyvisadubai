import React from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import {
  X,
  Heart,
  Baby,
  Users,
  Crown,
  Shield,
  FileText,
  Calculator,
  Phone,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Building2,
  FileCheck
} from 'lucide-react';
import { servicesData, siteConfig } from '../data/cmsData';

export default function OverlayMenu({ 
  isOpen,
  onClose,
  onNavigate,
  onOpenCalculator
, cmsConfig }) {
  if (!isOpen) return null;

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Heart': return <Heart className="w-5 h-5 text-brand-primary" />;
      case 'Baby': return <Baby className="w-5 h-5 text-brand-primary" />;
      case 'Users': return <Users className="w-5 h-5 text-brand-primary" />;
      case 'Crown': return <Crown className="w-5 h-5 text-brand-primary" />;
      case 'Shield': return <Shield className="w-5 h-5 text-brand-primary" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-brand-primary" />;
      case 'FileCheck': return <FileCheck className="w-5 h-5 text-brand-primary" />;
      default: return <FileText className="w-5 h-5 text-brand-primary" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-2xl animate-modal-in overflow-y-auto">
      
      <div className="w-full max-w-5xl bg-surface dark:bg-[#121212] border border-border-subtle dark:border-white/15 rounded-xl shadow-2xl overflow-hidden relative my-auto text-content-primary dark:text-white">
        
        {/* Header Bar */}
        <div className="p-6 border-b border-border-subtle dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-primary/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-brand-primary" />
            </div>
            <div>
              <div className="font-display font-bold text-lg leading-tight">
                Family Residency Services Directory
              </div>
              <div className="text-xs text-content-muted dark:text-slate-400">
                800 DOCS LLC SOC — Official Document Clearing Portal
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-surface-elevated dark:bg-white/10 hover:bg-surface-hover dark:hover:bg-surface/20 text-content-secondary dark:text-white flex items-center justify-center border border-border-subtle dark:border-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body Grid */}
        <div className="p-6 sm:p-8 grid md:grid-cols-12 gap-8 max-h-[75vh] overflow-y-auto">
          
          {/* Services Icon Grid (8 Columns) */}
          <div className="md:col-span-8 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              All 10 Family Residency & Dependant Services
            </div>

            <div className="grid sm:grid-cols-2 gap-3.5">
              {servicesData.map((service) => (
                <button
                  key={service.id}
                  onClick={() => {
                    onClose();
                    onNavigate('service', service.id);
                  }}
                  className="p-4 rounded-xl border text-left transition-all group cursor-pointer bg-canvas dark:bg-white/[0.02] border-border-subtle dark:border-white/10 hover:border-brand-primary/50 hover:bg-surface-elevated dark:hover:bg-surface/[0.05]"
                >
                  <div className="flex items-start justify-between">
                    <div className="p-2 rounded-xl bg-surface dark:bg-white/10 shadow-sm border border-border-subtle dark:border-white/10">
                      {getIcon(service.icon)}
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded">
                      {service.heroTag}
                    </span>
                  </div>

                  <div className="font-display font-semibold text-sm mt-3 text-content-primary dark:text-white group-hover:text-brand-primary transition-colors flex items-center justify-between">
                    <span>{service.title}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </div>

                  <p className="text-xs text-content-muted dark:text-slate-400 mt-1 line-clamp-2">
                    {service.shortDesc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Quick Links & Contact CTAs (4 Columns) */}
          <div className="md:col-span-4 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Platform Pages & Guides
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    onClose();
                    onNavigate('home');
                  }}
                  className="w-full text-left p-3 rounded-xl border flex items-center justify-between text-xs font-medium bg-canvas dark:bg-white/5 border-border-subtle dark:border-white/10 hover:border-border-strong dark:hover:border-white/20 transition-all"
                >
                  <span>Homepage Overview</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onNavigate('blog-index');
                  }}
                  className="w-full text-left p-3 rounded-xl border flex items-center justify-between text-xs font-medium bg-canvas dark:bg-white/5 border-border-subtle dark:border-white/10 hover:border-border-strong dark:hover:border-white/20 transition-all"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-brand-primary" />
                    <span>Residency Guides & Blog</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onNavigate('about');
                  }}
                  className="w-full text-left p-3 rounded-xl border flex items-center justify-between text-xs font-medium bg-canvas dark:bg-white/5 border-border-subtle dark:border-white/10 hover:border-border-strong dark:hover:border-white/20 transition-all"
                >
                  <span>About 800 DOCS LLC SOC</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>



                <button
                  onClick={() => {
                    onClose();
                    onOpenCalculator('spouse');
                  }}
                  className="w-full text-left p-3 rounded-xl border flex items-center justify-between text-xs font-medium bg-brand-primary/10 border-brand-primary/30 text-brand-primary hover:bg-brand-primary/20 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2 font-semibold">
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Pop-Up Fee Calculator</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-primary" />
                </button>
              </div>
            </div>

            {/* Direct Assistance Card */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-[#1E1E1E] to-[#121212] border border-white/15 text-white space-y-3">
              <div className="text-xs font-semibold text-white">Need Urgent Family Residency Help?</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect directly with a Senior GDRFA Dependant Specialist.
              </p>

              <div className="space-y-2 pt-1">
                <a
                  href={`tel:${cmsConfig?.global?.phoneRaw || siteConfig.phoneRaw}`}
                  className="w-full flex items-center justify-center gap-2 bg-surface/10 hover:bg-surface/15 text-white py-2 rounded-xl text-xs font-medium border border-white/10 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-primary" />
                  <span>Call {cmsConfig?.global?.phone || siteConfig.phone}</span>
                </a>

                <a
                  href={`https://wa.me/${cmsConfig?.global?.whatsappRaw || siteConfig.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl text-xs font-medium transition-colors"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>WhatsApp Senior Advisor</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
