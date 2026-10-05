/**
 * EmiratesIDPage.jsx  ──  Service Page #6
 * ─────────────────────────────────────────
 * Bespoke luxury page for UAE Emirates ID.
 * Covers: New Application, Typing, Renewal, Lost/Damaged,
 * Fawri Urgent service, fine calculator, and ICP FAQ.
 *
 * Data extracted from: https://www.familyvisa.ae/emirates-id/
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard, RefreshCw, AlertTriangle, Zap,
  CheckCircle2, ArrowRight, Clock, ShieldCheck,
  FileText, Calculator, Fingerprint, Truck
} from 'lucide-react';
import {
  SectionShell, SectionInner, SectionHeader,
  LuxuryCard, GoldBadge, LuxuryFooterCTA,
  LuxuryProcessTimeline, LuxuryDocumentTabs,
  fadeUp, scaleIn
} from '../components/LuxuryServicePage';
import FAQAccordion from '../components/FAQAccordion';

// ─── SERVICE TRACKS ────────────────────────────────────────────────────────────

const TRACKS = [
  {
    id: 'new',
    icon: CreditCard,
    label: 'New Emirates ID',
    tagline: 'First-time application for new residents',
    color: 'from-sky-600 to-sky-900',
    accentBg: 'bg-[#D4AF37]/10 border border-[#D4AF37]/30',
    accentText: 'text-[#D4AF37]',
    fee: 'AED 100/year',
    feeNote: 'Based on visa duration (e.g., AED 200 for 2-year visa)',
    sla: '3–7 Working Days',
    details: [
      'Filed online via ICP portal immediately after residence visa entry permit approval',
      'Biometrics (fingerprints + photo) required for residents aged 15 and above',
      'Children under 15 — photo only, no fingerprint appointment needed',
      'Payment processed online; no cash required at any ICP counter',
      'Physical card shipped by Emirates Post to registered home address',
      'EID number activates immediately for government services — before card arrives',
    ]
  },
  {
    id: 'renewal',
    icon: RefreshCw,
    label: 'Emirates ID Renewal',
    tagline: 'Renew before expiry to avoid daily fines',
    color: 'from-emerald-600 to-emerald-900',
    accentBg: 'bg-[#D4AF37]/10 border border-[#D4AF37]/30',
    accentText: 'text-[#D4AF37]',
    fee: 'AED 100/year',
    feeNote: 'Plus AED 300 knowledge and innovation fee',
    sla: '3–7 Working Days',
    details: [
      'Renew up to 90 days before the expiry date — we send a proactive reminder at Day 60',
      'Renewal filed simultaneously with residence visa renewal — single process, no double visits',
      'No biometrics required for renewal in most cases (no change in personal data)',
      'Late renewal fine: AED 20 per day after the 30-day grace period, capped at AED 1,000',
      'Fawri (urgent) renewal available — card issued within 24 hours at AED 150 surcharge',
      'EID renewed online from anywhere — no need to be physically present in UAE for renewal',
    ]
  },
  {
    id: 'lost',
    icon: AlertTriangle,
    label: 'Lost or Damaged Card',
    tagline: 'Replacement in 3–5 working days',
    color: 'from-red-600 to-red-900',
    accentBg: 'bg-[#D4AF37]/10 border border-[#D4AF37]/30',
    accentText: 'text-[#D4AF37]',
    fee: 'AED 300',
    feeNote: 'Replacement card fee (fixed government tariff)',
    sla: '3–5 Working Days',
    details: [
      'Lost card: police report from Dubai Police app required (we obtain this for you)',
      'Damaged card: original damaged card must be surrendered to ICP at replacement filing',
      'Replacement fee: AED 300 flat (ICP tariff) — no additional typing or service center fee',
      'New card issued with same EID number — all linked accounts remain unaffected',
      'Fawri urgent replacement: AED 450 total, card issued within 24 hours',
      'No new biometrics required for replacement unless your fingerprints have changed',
    ]
  },
  {
    id: 'fawri',
    icon: Zap,
    label: 'Fawri Urgent Service',
    tagline: 'Emirates ID in 24 hours — guaranteed',
    color: 'from-[#4A3000] to-[#8C5E00]',
    accentBg: 'bg-[#D4AF37]/10 border border-[#D4AF37]/30',
    accentText: 'text-[#D4AF37]',
    fee: 'AED 150 surcharge',
    feeNote: 'In addition to standard EID fee',
    sla: '24 Hours',
    details: [
      'Available for new, renewal, and replacement Emirates ID applications',
      'Card issued and available for collection at ICP main service centers within 24 hours',
      'Fawri surcharge: AED 150 in addition to standard card issuance fee',
      'Physical card collected at ICP office — no home delivery for Fawri (speed trade-off)',
      'Available for urgent travel, banking, property, or government service needs',
      'We file the Fawri application and confirm your 24-hour collection slot on WhatsApp',
    ]
  }
];

// ─── FINE CALCULATOR ──────────────────────────────────────────────────────────

function FineLateCalculator() {
  const [expiryDate, setExpiryDate] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!expiryDate) return;
    const expiry = new Date(expiryDate);
    const gracePeriodEnd = new Date(expiry);
    gracePeriodEnd.setDate(gracePeriodEnd.getDate() + 30);
    const today = new Date();

    if (today <= gracePeriodEnd) {
      setResult({ fine: 0, daysLate: 0, status: 'grace', message: 'Still within the 30-day grace period — no fines yet. Renew immediately.' });
      return;
    }

    const daysLate = Math.floor((today - gracePeriodEnd) / (1000 * 60 * 60 * 24));
    const fine = Math.min(daysLate * 20, 1000);
    setResult({ fine, daysLate, status: fine >= 1000 ? 'capped' : 'accruing', message: fine >= 1000 ? 'Maximum fine of AED 1,000 has been reached. Renew immediately to stop accumulation.' : `AED 20 per day fine is accruing. Renew now to stop further fines.` });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="bg-[#111319] border border-[#D4AF37]/30 rounded-[10px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] overflow-hidden text-white"
    >
      <div className="h-[3px] bg-gradient-to-r from-[#D4AF37] via-[#FFF5C0] to-[#D4AF37]" />
      <div className="px-6 py-5 border-b border-[#D4AF37]/20">
        <div className="flex items-center gap-2 mb-1">
          <Calculator className="w-5 h-5 text-[#D4AF37]" />
          <h3 className="font-bold text-white text-sm">Late Renewal Fine Calculator</h3>
        </div>
        <p className="text-xs text-slate-400">Enter your EID expiry date to calculate any accumulated ICP fines</p>
      </div>

      <div className="p-6 space-y-5">
        {/* Fine rules strip */}
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { label: 'Grace Period', value: '30 days', note: 'After expiry' },
            { label: 'Daily Fine', value: 'AED 20', note: 'From Day 31' },
            { label: 'Max Fine', value: 'AED 1,000', note: 'Hard cap' }
          ].map((r, i) => (
            <div key={i} className="text-center py-2.5 bg-[#0A0B0E] border border-[#D4AF37]/20 rounded-[10px]">
              <div className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-wide">{r.label}</div>
              <div className="font-extrabold text-sm text-white mt-0.5">{r.value}</div>
              <div className="text-[9px] text-slate-400">{r.note}</div>
            </div>
          ))}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wide">EID Expiry Date</label>
          <input
            type="date"
            value={expiryDate}
            onChange={e => { setExpiryDate(e.target.value); setResult(null); }}
            className="w-full px-4 py-3 text-sm font-semibold text-white bg-[#0A0B0E] border border-[#D4AF37]/30 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all"
          />
        </div>

        <motion.button
          onClick={calculate}
          disabled={!expiryDate}
          whileHover={expiryDate ? { scale: 1.02, y: -1 } : {}}
          whileTap={expiryDate ? { scale: 0.97 } : {}}
          className="w-full py-3.5 rounded-[10px] font-bold text-sm text-[#050505] bg-gradient-to-r from-[#D4AF37] via-[#FFF5C0] to-[#D4AF37] shadow-[0_6px_20px_rgba(212,175,55,0.35)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Calculate My Fine →
        </motion.button>

        <AnimatePresence>
          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className={`rounded-[10px] p-5 ${result.status === 'grace' ? 'bg-emerald-950/40 border border-emerald-500/30' : result.status === 'capped' ? 'bg-red-950/40 border border-red-500/30' : 'bg-amber-950/40 border border-amber-500/30'}`}>
                <div className={`text-2xl font-extrabold mb-2 ${result.status === 'grace' ? 'text-emerald-400' : result.status === 'capped' ? 'text-red-400' : 'text-amber-400'}`}>
                  {result.status === 'grace' ? '✓ No Fine' : `AED ${result.fine.toLocaleString()} Fine`}
                </div>
                {result.daysLate > 0 && (
                  <div className="text-sm font-semibold text-slate-300 mb-2">{result.daysLate} days overdue</div>
                )}
                <p className={`text-sm leading-relaxed ${result.status === 'grace' ? 'text-emerald-300' : result.status === 'capped' ? 'text-red-300' : 'text-amber-300'}`}>
                  {result.message}
                </p>
                <a href="https://wa.me/9718003627" target="_blank" rel="noopener noreferrer" className={`mt-3 block w-full text-center py-2.5 rounded-[8px] font-bold text-sm text-white transition-colors ${result.status === 'grace' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'}`}>
                  {result.status === 'grace' ? 'Renew Now (Free Consultation)' : 'Pay Fine & Renew — WhatsApp'}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function EmiratesIDHero() {
  return (
    <SectionShell className="bg-[#050505] !pt-0 !pb-0 overflow-visible text-white">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-40 w-[700px] h-[600px] bg-gradient-radial from-[#D4AF37]/15 via-[#D4AF37]/5 to-transparent blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-20 md:pb-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="flex items-center gap-2">
              <GoldBadge>ICP Registered</GoldBadge>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#111319] border border-[#D4AF37]/30 text-slate-300 text-[10px] font-bold uppercase tracking-[0.1em] rounded-[10px]">New · Renewal · Replacement</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
              className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-[1.05] tracking-tight"
            >
              Emirates ID —{' '}
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#FFF5C0] to-[#D4AF37] bg-clip-text text-transparent">
                Applied, Renewed,
              </span>
              <br />Replaced. 100% Online.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.16 }} className="text-lg text-slate-300 leading-relaxed max-w-xl">
              New EID, renewal before expiry, lost card replacement, and Fawri 24-hour urgent issuance — all filed directly with ICP. No ICA customer happiness center visits. Card delivered to your door.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.24 }} className="flex flex-wrap gap-2">
              {['No ICA Counter Visits', 'Doorstep Delivery', '24-Hr Fawri Available', 'Fine Payment Handled', 'Children Under 15 — No Biometrics'].map(chip => (
                <span key={chip} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#111319] border border-[#D4AF37]/20 text-slate-300 text-xs font-semibold rounded-[10px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />{chip}
                </span>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }} className="flex flex-col sm:flex-row gap-3">
              <motion.a href="#tracks" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#FFF5C0] to-[#D4AF37] text-[#050505] font-bold text-sm tracking-wide rounded-[10px] shadow-[0_8px_24px_rgba(212,175,55,0.35)]">
                View All EID Services <ArrowRight className="w-4 h-4 text-[#050505]" />
              </motion.a>
              <motion.a href="https://wa.me/9718003627" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#111319] border border-[#D4AF37]/30 text-white font-semibold text-sm rounded-[10px] shadow-sm hover:border-[#D4AF37] transition-all">
                <svg className="w-4 h-4 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Consultation
              </motion.a>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <FineLateCalculator />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

// ─── TRACK SELECTOR ───────────────────────────────────────────────────────────

function TrackSection() {
  const [active, setActive] = useState('new');
  const current = TRACKS.find(t => t.id === active);

  return (
    <SectionShell className="bg-[#050505] text-white border-t border-[#D4AF37]/10" id="tracks">
      <SectionInner>
        <SectionHeader eyebrow="Emirates ID Services" title="New, Renewal, Lost & Urgent — All in One Place" subtitle="Select your EID service type to see exact fees, requirements, and our processing timeline." />

        <div className="flex flex-wrap gap-2 mb-8">
          {TRACKS.map(t => (
            <button key={t.id} onClick={() => setActive(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-[10px] border transition-all duration-200 ${active === t.id ? 'bg-gradient-to-r from-[#D4AF37] via-[#FFF5C0] to-[#D4AF37] text-[#050505] border-transparent shadow-[0_4px_16px_rgba(212,175,55,0.3)]' : 'bg-[#111319] border-[#D4AF37]/20 text-slate-300 hover:border-[#D4AF37]/50'}`}
            >
              <t.icon className="w-4 h-4" />{t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-5"
            >
              <div className="lg:col-span-2">
                <LuxuryCard hover={false} className="p-7 h-full bg-[#111319] border-[#D4AF37]/30 text-white">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 ${current.accentBg} rounded-[10px] mb-5`}>
                    <current.icon className={`w-4 h-4 ${current.accentText}`} />
                    <span className={`text-xs font-bold ${current.accentText} uppercase tracking-wide`}>{current.tagline}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[{ label: 'ICP Fee', value: current.fee }, { label: 'SLA', value: current.sla }, { label: 'Delivery', value: 'Home' }].map((s, i) => (
                      <div key={i} className="bg-[#0A0B0E] border border-[#D4AF37]/20 rounded-[10px] p-3 text-center">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">{s.label}</div>
                        <div className="font-bold text-sm text-white">{s.value}</div>
                      </div>
                    ))}
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-3">Key Information</h4>
                  <ul className="space-y-2.5">
                    {current.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-300">{d}</span>
                      </li>
                    ))}
                  </ul>
                  {current.id === 'fawri' && (
                    <div className="mt-5 p-4 bg-amber-950/40 border border-amber-500/30 rounded-[10px] flex items-start gap-2.5">
                      <Zap className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-300 leading-relaxed">Fawri is ideal for urgent travel, emergency banking, or property closings requiring a valid EID the same day. Card must be collected in person at an ICP service center.</p>
                    </div>
                  )}
                </LuxuryCard>
              </div>
              <div>
                <LuxuryCard hover={false} className="h-full bg-[#111319] border-[#D4AF37]/30 text-white">
                  <div className={`h-[3px] bg-gradient-to-r from-[#D4AF37] via-[#FFF5C0] to-[#D4AF37]`} />
                  <div className="p-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-5">Fee Summary</p>
                    <div className="space-y-3 mb-3">
                      <div className="flex justify-between text-sm"><span className="text-slate-400">ICP Card Fee</span><span className="font-bold text-white">{current.fee}</span></div>
                      <div className="text-[10px] text-slate-400 -mt-1">{current.feeNote}</div>
                    </div>
                    <div className="bg-[#0A0B0E] border border-[#D4AF37]/20 rounded-[10px] p-3 mb-5">
                      <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-1">Our Concierge Fee</div>
                      <div className="font-extrabold text-[#D4AF37]">From AED 250</div>
                    </div>
                    <motion.a href="https://wa.me/9718003627" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      className={`block w-full text-center py-3 rounded-[10px] font-bold text-sm text-[#050505] bg-gradient-to-r from-[#D4AF37] via-[#FFF5C0] to-[#D4AF37] shadow-[0_6px_20px_rgba(212,175,55,0.3)] mb-3`}>
                      Apply via WhatsApp →
                    </motion.a>
                    <p className="text-[10px] text-slate-400 text-center">Government receipts provided · Zero hidden fees</p>
                  </div>
                </LuxuryCard>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </SectionInner>
    </SectionShell>
  );
}

// ─── PROCESS + DOCS ────────────────────────────────────────────────────────────

const PROCESS_STEPS = [
  {
    title: 'Application Filing',
    description: 'We file your Emirates ID application on the ICP portal. Payment processed online. Confirmation reference number sent to you immediately.'
  },
  {
    title: 'Biometrics Appointment',
    description: 'For new applicants aged 15+, we book a biometrics slot at our registered ICP-connected center. Walk-in, 10 minutes. No long queues.'
  },
  {
    title: 'Card Printing & Dispatch',
    description: 'ICP prints your EID within 24–48 hours after biometric capture. Emirates Post dispatches the physical card to your registered address.'
  },
  {
    title: 'Doorstep Delivery',
    description: 'Physical Emirates ID card delivered to your door within 3–7 working days from application. We track the Emirates Post shipment and notify you on WhatsApp.'
  }
];

const DOCUMENTS = {
  residents: [
    'Valid UAE Residence Visa (entry permit or stamped visa in passport)',
    'Passport — minimum 6 months validity, clear scan of photo page',
    'Current Emirates ID (if renewal or replacement)',
    'Dubai Police report (for lost card replacement — we obtain this)',
    'Passport-size photograph — white background (for children under 15)',
  ],
  citizens: [
    'UAE National ID or birth certificate (for first-time citizen EID)',
    'Family book (Huwiyya) — applicable for UAE nationals',
    'Passport — all data pages visible and high resolution',
    'GCC resident card copy (for GCC nationals applying in UAE)',
  ]
};

const FAQS = [
  {
    q: 'How long does it take to get an Emirates ID?',
    a: 'Typically 3–7 working days from the day of biometrics to physical card delivery at your door. With the Fawri (urgent) service, the card is issued within 24 hours at ICP main centers — but must be collected in person, not delivered.'
  },
  {
    q: 'What happens if my Emirates ID expires?',
    a: 'You have a 30-day grace period after your EID expires — no fines accrue during this window. After Day 30, ICP charges AED 20 per day in late fines, capped at a maximum of AED 1,000. The EID number remains active throughout — only the physical card becomes overdue for renewal. Use our fine calculator above to check your current accumulated fine.'
  },
  {
    q: 'Is the Emirates ID validity the same as my residence visa?',
    a: 'Yes — always. For UAE residents, the EID is always issued to match the exact duration of your residence visa. A 2-year visa gets a 2-year EID (AED 200 fee). A 10-year Golden Visa gets a 10-year EID (AED 1,000 fee). Nationals and GCC nationals receive 5- or 10-year cards by default.'
  },
  {
    q: 'Do children and newborns need an Emirates ID?',
    a: 'Yes — every UAE resident of any age must hold an Emirates ID, including infants. Children under 15 do not need to give fingerprints — only a photograph is submitted online. There is no need for an ICP appointment for minors under 15. The EID card is issued and delivered by post to the home address.'
  },
  {
    q: 'Can you process my Emirates ID while I\'m outside the UAE?',
    a: 'Renewals: Yes — if your data has not changed, renewal can be filed and paid online without biometrics, and the card is delivered inside the UAE to your registered address. New applications: First-time applicants must be physically present in the UAE for biometrics capture before the card can be issued.'
  },
  {
    q: 'How do I check my Emirates ID application status?',
    a: 'ICP application status is tracked free of charge on the official ICP UAE app or ICP website using your PRAN (application reference number). We share your PRAN with you immediately after filing, and we actively track and update you via WhatsApp at each stage: Applied → Biometrics → Printing → Dispatched → Delivered.'
  }
];

// ─── ROOT COMPONENT ────────────────────────────────────────────────────────────

export default function EmiratesIDPage() {
  return (
    <div className="font-sans antialiased bg-[#050505] text-white selection:bg-[#D4AF37]/30 selection:text-white">
      <EmiratesIDHero />
      <TrackSection />
      <LuxuryDocumentTabs
        documents={DOCUMENTS}
        tabs={[{ key: 'residents', label: 'UAE Residents' }, { key: 'citizens', label: 'Nationals & GCC' }]}
      />
      <LuxuryProcessTimeline steps={PROCESS_STEPS} />
      <FAQAccordion faqs={FAQS} title="Frequently Asked Questions" subtitle="Everything you need to know about UAE Emirates ID applications, renewals, fines, and delivery." />
      <LuxuryFooterCTA
        headline="Your Emirates ID — Applied, Renewed, or Replaced. In Days, Not Weeks."
        subline="Share your visa copy on WhatsApp and we'll confirm the exact EID fee, filing time, and delivery date in under 10 minutes. Free quote, no commitment."
        ctaLabel="Apply for Emirates ID Now"
        ctaHref="https://wa.me/9718003627"
      />
    </div>
  );
}
