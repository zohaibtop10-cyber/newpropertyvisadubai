import React, { useState, useEffect } from 'react';
import { Search, FileText, User, Calculator, Layers, ShieldCheck, ArrowRight, X, Terminal } from 'lucide-react';

export default function CommandPaletteModal({ isOpen, onClose, onSelectAction, dossiers, tariffs }) {
  const [query, setQuery] = useState('');

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter items based on query
  const cleanQuery = query.toLowerCase().trim();

  const filteredDossiers = dossiers ? dossiers.filter(d => 
    d.clientName.toLowerCase().includes(cleanQuery) ||
    d.dossierNumber.toLowerCase().includes(cleanQuery) ||
    d.passportNo.toLowerCase().includes(cleanQuery) ||
    d.phone.includes(cleanQuery)
  ) : [];

  const filteredTariffs = tariffs ? tariffs.filter(t => 
    t.itemName.toLowerCase().includes(cleanQuery) ||
    t.itemCode.toLowerCase().includes(cleanQuery) ||
    t.authority.toLowerCase().includes(cleanQuery)
  ) : [];

  const quickActions = [
    { title: 'Go to Executive Telemetry', module: 'dashboard', icon: Layers },
    { title: 'View Active CRM Pipeline (Kanban)', module: 'dossiers', icon: User },
    { title: 'Modify Dynamic Tariff Matrix', module: 'tariffs', icon: Calculator },
    { title: 'Edit Landing Page & CMS Hero', module: 'cms', icon: FileText },
    { title: 'Open Regulatory Blog & SEO Inspector', module: 'blog', icon: Terminal },
    { title: 'View Audit Logs & System Webhooks', module: 'integrations', icon: ShieldCheck }
  ].filter(a => cleanQuery === '' || a.title.toLowerCase().includes(cleanQuery));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-surface/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-brand-surfaceLight border border-slate-700/60 rounded-xl shadow-2xl overflow-hidden flex flex-col text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-brand-surfaceLight/90 gap-3">
          <Search className="w-5 h-5 text-brand-primary shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search dossiers, passports, trade license IDs, CMS pages, tariffs... (Cmd+K)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-slate-100 placeholder-slate-400 focus:outline-none text-base font-medium"
          />
          <button 
            onClick={onClose} 
            className="p-1 rounded-lg hover:bg-surface text-text-muted hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[420px] overflow-y-auto p-3 space-y-4">
          
          {/* Quick Actions */}
          {quickActions.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-text-muted px-3 mb-1.5">
                Quick Navigation & Commands
              </div>
              <div className="space-y-1">
                {quickActions.map((act, i) => {
                  const Icon = act.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => { onSelectAction(act.module); onClose(); }}
                      className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-brand-primary/15 hover:border hover:border-brand-primary/30 transition-all text-sm group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-surface text-slate-300 group-hover:bg-dark-gold-gloss text-slate-950 font-bold hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300 shadow-[0_4px_12px_rgba(212,175,55,0.25)] group-hover:text-white transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-slate-200 group-hover:text-white">{act.title}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-content-muted group-hover:text-[#D4AF37] transition-colors" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Dossiers Matches */}
          {filteredDossiers.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-text-muted px-3 mb-1.5">
                Client Dossiers ({filteredDossiers.length})
              </div>
              <div className="space-y-1">
                {filteredDossiers.map((dos) => (
                  <button
                    key={dos.id}
                    onClick={() => { onSelectAction('dossiers', dos); onClose(); }}
                    className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-surface transition-colors text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4 text-brand-primary" />
                      <div>
                        <div className="font-semibold text-white">{dos.clientName} <span className="text-xs text-text-muted font-normal">({dos.passportNo})</span></div>
                        <div className="text-xs text-text-muted">{dos.dossierNumber} • {dos.serviceTitle}</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-surface text-slate-300 border border-slate-700">
                      {dos.stage.replace('_', ' ')}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tariffs Matches */}
          {filteredTariffs.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-text-muted px-3 mb-1.5">
                Government Tariffs ({filteredTariffs.length})
              </div>
              <div className="space-y-1">
                {filteredTariffs.map((trf) => (
                  <button
                    key={trf.id}
                    onClick={() => { onSelectAction('tariffs'); onClose(); }}
                    className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-surface transition-colors text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <Calculator className="w-4 h-4 text-brand-goldLight" />
                      <div>
                        <div className="font-medium text-slate-200">{trf.itemName}</div>
                        <div className="text-xs text-text-muted">{trf.authority} • Code: {trf.itemCode}</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-brand-goldLight">
                      AED {(trf.govtFeeAED + trf.retainerMarkupAED).toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {query !== '' && filteredDossiers.length === 0 && filteredTariffs.length === 0 && quickActions.length === 0 && (
            <div className="py-8 text-center text-text-muted text-sm">
              No matching client records, tariffs, or commands found for "<span className="text-slate-200">{query}</span>".
            </div>
          )}

        </div>

        {/* Footer Shortcut Legend */}
        <div className="px-4 py-2.5 border-t border-slate-800 bg-surface/60 flex items-center justify-between text-xs text-text-muted">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 bg-surface rounded text-slate-300 font-mono text-[10px]">ESC</span> to close
            <span className="px-1.5 py-0.5 bg-surface rounded text-slate-300 font-mono text-[10px]">↑↓</span> to navigate
          </div>
          <div className="text-text-muted">
            <span className="font-semibold text-brand-primary">EmiratesPrime</span> Admin Search Engine
          </div>
        </div>

      </div>
    </div>
  );
}
