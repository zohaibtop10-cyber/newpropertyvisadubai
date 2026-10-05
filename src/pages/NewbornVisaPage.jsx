/**
 * NewbornVisaPage.jsx  ──  Service Page #4
 * ─────────────────────────────────────────
 * Bespoke luxury page for UAE Newborn Family Visa.
 * Covers all 5 phases: Birth Certificate → MOFA Attestation →
 * Embassy Passport → Emirates ID → Visa Stamping.
 * Critical: 120-day grace period from birth date.
 *
 * Fully styled in Dark Golden Luxury Theme (#050505, #111319, #D4AF37).
 * Data extracted from: https://www.familyvisa.ae/new-born/ & https://800docs.ae/family-visa/
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Baby, FileText, Globe, CreditCard, Stamp,
  ArrowRight, CheckCircle2, Clock, AlertTriangle,
  Calendar, Heart, ShieldCheck, Zap, ChevronRight, Sparkles
} from 'lucide-react';
import {
  SectionShell, SectionInner, SectionHeader,
  LuxuryCard, GoldBadge, LuxuryDocumentTabs, fadeUp, scaleIn,
  LuxuryFooterCTA
} from '../components/LuxuryServicePage';
import FAQAccordion from '../components/FAQAccordion';

// ─── 5 PHASES DATA ─────────────────────────────────────────────────────────────

const PHASES = [
  {
    id: 'birth-cert',
    phase: '01',
    icon: Baby,
    label: 'Birth Certificate',
    authority: 'DHA / Hospital',
    window: 'Days 1–5',
    color: 'from-[#D4AF37] to-[#B8860B]',
    accentBg: 'bg-[#D4AF37]/10',
    accentText: 'text-[#D4AF37]',
    borderAccent: 'border-[#D4AF37]/30',
    summary: 'The UAE birth certificate — called the "Birth Notification" — is issued by the hospital in partnership with Dubai Health Authority (DHA). It must be collected within 5 business days of delivery.',
    steps: [
      'Hospital issues Arabic Birth Notification — available within 24–48 hours of delivery',
      'Father\'s Emirates ID and residence visa copy required at hospital registration desk',
      'Mother\'s passport and Emirates ID copy required alongside father\'s documents',
      'DHA Birth Notification can be used immediately for MOFA attestation',
      'If father is not UAE resident, the baby defaults to mother\'s nationality for visa purposes',
    ],
    fee: 'AED 0 (hospital issue)',
    tip: 'Request multiple certified copies of the birth certificate at the hospital — you will need originals for MOFA, the embassy, and ICP.'
  },
  {
    id: 'mofa',
    phase: '02',
    icon: Stamp,
    label: 'MOFA Attestation',
    authority: 'Ministry of Foreign Affairs',
    window: 'Days 5–10',
    color: 'from-[#D4AF37] to-[#996515]',
    accentBg: 'bg-[#D4AF37]/10',
    accentText: 'text-[#D4AF37]',
    borderAccent: 'border-[#D4AF37]/30',
    summary: 'The UAE Ministry of Foreign Affairs (MOFA) must attest the birth certificate before it is accepted by foreign embassies. We handle this door-to-door — no government counter visits.',
    steps: [
      'Original DHA Birth Notification presented to MOFA for attestation stamp',
      'MOFA attestation confirms authenticity for international use (embassy submission)',
      'Standard turnaround: 1–2 business days; express: same day',
      'We collect the document from your home, process at MOFA, and return it attested',
      'Attested birth certificate is then ready for submission to the baby\'s home country embassy',
    ],
    fee: 'AED 150 (MOFA fee)',
    tip: 'Some embassies require the birth certificate to be translated into their national language before attestation. We provide certified legal translations in 12 languages.'
  },
  {
    id: 'passport',
    phase: '03',
    icon: Globe,
    label: 'Embassy Passport',
    authority: 'Home Country Embassy',
    window: 'Days 10–30',
    color: 'from-[#D4AF37] to-[#8C5E00]',
    accentBg: 'bg-[#D4AF37]/10',
    accentText: 'text-[#D4AF37]',
    borderAccent: 'border-[#D4AF37]/30',
    summary: 'The baby must obtain a passport from their home country\'s embassy in the UAE before a UAE residence visa can be applied. Processing times vary by nationality — from 5 days to 6 weeks.',
    steps: [
      'Submit MOFA-attested birth certificate to the home country consulate in Dubai or Abu Dhabi',
      'Parents\' passports, marriage certificate, and passport photos required at embassy appointment',
      'Embassy issues an Emergency Travel Document or full passport for the newborn',
      'Common embassies (India, Pakistan, Philippines, UK) — typical processing: 7–21 days',
      'We coordinate appointments, prepare embassy forms, and attend submissions on your behalf',
    ],
    fee: 'Varies by nationality',
    tip: 'Emergency Travel Documents (ETD) are accepted for UAE visa purposes. No need to wait for a full passport if the embassy offers an ETD option — this can save 2–4 weeks.'
  },
  {
    id: 'eid',
    phase: '04',
    icon: CreditCard,
    label: 'Emirates ID',
    authority: 'ICP',
    window: 'After Passport',
    color: 'from-[#D4AF37] to-[#B8860B]',
    accentBg: 'bg-[#D4AF37]/10',
    accentText: 'text-[#D4AF37]',
    borderAccent: 'border-[#D4AF37]/30',
    summary: 'Every UAE resident — including newborns — must have an Emirates ID. Children under 15 do not require fingerprints or biometrics. Only a photograph is needed. We file via ICP online systems.',
    steps: [
      'Baby\'s new passport received from embassy — now ready to file EID application',
      'Parents file the Emirates ID application online via ICP portal (we do this for you)',
      'No biometrics appointment required for children under 15 — only a photograph is submitted',
      'EID application fee: AED 100 per year of visa duration (e.g., AED 200 for a 2-year visa)',
      'Physical EID card delivered to home address by Emirates Post within 3–7 working days',
    ],
    fee: 'AED 100/year of visa',
    tip: 'File the Emirates ID application simultaneously with the GDRFA entry permit — both can be initiated as soon as the baby\'s passport is in hand, saving up to 5 days.'
  },
  {
    id: 'visa',
    phase: '05',
    icon: Stamp,
    label: 'Visa Stamping',
    authority: 'GDRFA / ICP',
    window: 'Final Step',
    color: 'from-[#D4AF37] to-[#C5A059]',
    accentBg: 'bg-[#D4AF37]/10',
    accentText: 'text-[#D4AF37]',
    borderAccent: 'border-[#D4AF37]/30',
    summary: 'The final step — obtaining the residence visa stamp in the baby\'s passport. We file this with GDRFA (Dubai) or ICP (other emirates) entirely online. No Smart Salem medical required for children under 18.',
    steps: [
      'GDRFA / ICP entry permit application filed online using the baby\'s new passport',
      'Sponsor parent\'s documents (visa, EID, salary certificate) submitted alongside',
      'No medical examination (Smart Salem) required for children under 18',
      'Entry Permit approved in 24–48 hours — then converted to residence stamp same day',
      'Residence visa stamped directly into baby\'s passport — 2-year duration standard',
    ],
    fee: 'AED 1,820 (entry + visa)',
    tip: 'If the baby was born in the UAE and has not left the country, the visa is stamped inside the UAE as a status change. No exit trip or "visa run" is needed.'
  }
];

const DOCUMENTS = {
  parents: [
    'Father\'s UAE Residence Visa and Emirates ID (both sides, clear scan)',
    'Mother\'s UAE Residence Visa and Emirates ID — or visiting visa if non-resident',
    'Both parents\' passports — minimum 6 months validity, all pages visible',
    'MOFA-attested and Arabic-translated Marriage Certificate',
    'Sponsor\'s current salary certificate or payslip (last 3 months)',
    'Ejari-registered tenancy contract or DEWA utility bill (accommodation proof)',
  ],
  baby: [
    'Original DHA / Hospital Birth Notification (Arabic) — certified copy',
    'MOFA-attested Birth Certificate (for embassy submission)',
    'Baby\'s new passport or Emergency Travel Document from home country embassy',
    'Passport-size photographs of the baby (white background, looking forward)',
    'Emirates ID application form (filed by us via ICP portal)',
  ]
};

const FAQS = [
  {
    question: 'What is the 120-day grace period for a newborn visa in the UAE?',
    answer: 'A baby born in the UAE automatically receives a 120-calendar-day grace period from their date of birth. During this window, no overstay fines accrue. However, the full visa stamping process — including birth certificate, MOFA, embassy passport, EID, and GDRFA entry permit — must be completed before Day 120. If Day 120 passes without a valid visa, daily overstay fines begin at AED 25/day.'
  },
  {
    question: 'What happens if the baby\'s embassy passport takes longer than 120 days?',
    answer: 'If passport delays threaten the 120-day window (common with some embassies), we apply for a 30-day visa extension from GDRFA as a buffer. This extension costs approximately AED 200–300 and gives additional time to obtain the embassy passport. We proactively monitor the timeline and flag this risk from Day 60.'
  },
  {
    question: 'Does the baby need to do a Smart Salem medical examination?',
    answer: 'No. Children under 18 years of age are fully exempt from the UAE Smart Salem medical examination (health screening) requirement. Only adults applying for a first-time or renewal residence visa need to undergo medical screening.'
  },
  {
    question: 'Can the mother be the visa sponsor if the father is not a UAE resident?',
    answer: 'Yes. If the father does not hold a UAE residence visa, a UAE-resident mother with a minimum salary of AED 4,000 per month can sponsor the newborn directly. The baby will take the mother\'s nationality for visa sponsorship purposes. We handle this less common but fully supported scenario routinely.'
  },
  {
    question: 'How long does the full newborn visa process take?',
    answer: 'The timeline varies by the embassy involved: Phase 1 (Birth Certificate): 1–3 days. Phase 2 (MOFA Attestation): 1–2 days. Phase 3 (Embassy Passport): 7–45 days depending on nationality. Phase 4 (Emirates ID): 3–7 days after passport. Phase 5 (GDRFA Visa Stamp): 2–5 days after EID filing. Total typical range: 20 to 55 days. We start tracking from Day 1 of birth.'
  },
  {
    question: 'Do I need the baby\'s birth certificate translated to Arabic?',
    answer: 'The DHA (Dubai Health Authority) birth certificate is already issued in Arabic — no translation needed. However, if the baby was born outside the UAE (e.g., the mother gave birth in her home country and is returning to the UAE), the foreign birth certificate requires MOFA attestation plus a certified Arabic legal translation.'
  }
];

// ─── COUNTDOWN TIMER ──────────────────────────────────────────────────────────

function GracePeriodTimer() {
  const [birthDate, setBirthDate] = useState('');
  const [daysRemaining, setDaysRemaining] = useState(null);
  const [urgencyLevel, setUrgencyLevel] = useState(null);

  const calculateDays = () => {
    if (!birthDate) return;
    const birth = new Date(birthDate);
    const today = new Date();
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysSinceBirth = Math.floor((today - birth) / msPerDay);
    const remaining = 120 - daysSinceBirth;
    setDaysRemaining(remaining);
    if (remaining <= 0) setUrgencyLevel('expired');
    else if (remaining <= 14) setUrgencyLevel('critical');
    else if (remaining <= 30) setUrgencyLevel('urgent');
    else setUrgencyLevel('safe');
  };

  const urgencyConfig = {
    safe: { bg: 'from-emerald-950/80 to-emerald-900/60 border-emerald-500/40 text-emerald-200', label: 'On Track', icon: '✓', text: 'You have comfortable time remaining. Begin Phase 3 (Embassy Passport) immediately.' },
    urgent: { bg: 'from-amber-950/80 to-amber-900/60 border-amber-500/40 text-amber-200', label: 'Act Now', icon: '!', text: 'Under 30 days remaining. Contact us immediately to expedite the process.' },
    critical: { bg: 'from-red-950/80 to-red-900/60 border-red-500/40 text-red-200', label: 'Critical', icon: '!!', text: 'CRITICAL — 14 days or fewer. We can apply for a 30-day GDRFA extension today.' },
    expired: { bg: 'from-zinc-950 to-zinc-900 border-zinc-700 text-zinc-300', label: 'Grace Period Ended', icon: '✕', text: 'The 120-day grace period has ended. Overstay fines are accruing. Contact us urgently for fine calculation and regularization.' }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="bg-[#111319] border border-white/10 rounded-[10px] shadow-[0_30px_60px_-20px_rgba(212,175,55,0.15)] overflow-hidden font-sans"
    >
      <div className="h-[3px] bg-gradient-to-r from-[#B8860B] via-[#FFF8DC] to-[#D4AF37]" />
      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <Clock className="w-5 h-5 text-[#D4AF37]" />
          <h3 className="font-bold text-white text-sm tracking-wide">120-Day Grace Period Calculator</h3>
        </div>
        <p className="text-xs text-slate-400">Enter your baby's birth date to see days remaining in the visa grace period</p>
      </div>

      <div className="p-6 space-y-5">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wide">Baby's Date of Birth</label>
          <input
            type="date"
            value={birthDate}
            onChange={e => { setBirthDate(e.target.value); setDaysRemaining(null); }}
            max={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 text-sm font-semibold text-white bg-[#0A0B0E] border border-white/15 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all"
          />
        </div>

        {/* Visual timeline bar */}
        <div className="bg-[#0A0B0E] rounded-[10px] p-4 border border-white/10">
          <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2 font-mono">
            <span>Day 0 (Birth)</span>
            <span>Day 120 (Deadline)</span>
          </div>
          <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-full bg-gradient-to-r from-emerald-500 via-amber-400 to-red-500 rounded-full" />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
            <span>Safe Zone</span>
            <span>Urgent</span>
            <span>Critical</span>
          </div>
        </div>

        <motion.button
          onClick={calculateDays}
          disabled={!birthDate}
          whileHover={birthDate ? { scale: 1.02, y: -1 } : {}}
          whileTap={birthDate ? { scale: 0.97 } : {}}
          className="w-full py-3.5 rounded-[10px] font-bold text-xs uppercase tracking-wider text-black bg-dark-gold-gloss shadow-[0_6px_20px_rgba(212,175,55,0.3)] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          Calculate Remaining Days →
        </motion.button>

        <AnimatePresence>
          {daysRemaining !== null && urgencyLevel && (
            <motion.div
              key="result"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className={`bg-gradient-to-br ${urgencyConfig[urgencyLevel].bg} border rounded-[10px] p-5 shadow-2xl`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-[10px] bg-white/10 border border-white/20 flex items-center justify-center font-extrabold text-xl text-white">
                    {daysRemaining > 0 ? daysRemaining : '0'}
                  </div>
                  <div>
                    <div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-white/70 font-mono">Days Remaining</div>
                    <div className="font-extrabold text-lg text-white">{urgencyConfig[urgencyLevel].label}</div>
                  </div>
                </div>
                <p className="text-xs text-white/90 mb-4 leading-relaxed">{urgencyConfig[urgencyLevel].text}</p>
                <a
                  href="https://wa.me/971586600396"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-2.5 rounded-[8px] bg-[#25D366] hover:bg-[#128C7E] text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-colors"
                >
                  Start Process on WhatsApp →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Key milestone dates */}
        <div className="space-y-2">
          {[
            { day: 'Day 5', label: 'Birth certificate collection deadline', urgency: 'low' },
            { day: 'Day 30', label: 'Embassy passport submission recommended', urgency: 'low' },
            { day: 'Day 90', label: 'Begin GDRFA entry permit filing', urgency: 'medium' },
            { day: 'Day 105', label: 'Extension application window — if needed', urgency: 'high' },
            { day: 'Day 120', label: 'Grace period deadline — visa must be stamped', urgency: 'critical' },
          ].map((m, i) => (
            <div key={i} className={`flex items-center gap-3 p-2.5 rounded-[8px] border ${m.urgency === 'critical' ? 'bg-red-950/40 border-red-500/30' : m.urgency === 'high' ? 'bg-amber-950/40 border-amber-500/30' : 'bg-white/5 border-white/10'}`}>
              <span className={`text-[10px] font-mono font-extrabold rounded-[6px] px-2 py-1 whitespace-nowrap ${m.urgency === 'critical' ? 'bg-red-500/20 text-red-300' : m.urgency === 'high' ? 'bg-amber-500/20 text-amber-300' : 'bg-white/10 text-slate-300'}`}>{m.day}</span>
              <span className="text-xs text-slate-300 font-medium">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function NewbornHero() {
  return (
    <SectionShell className="bg-[#050505] !pt-8 !pb-12 overflow-visible">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 right-0 w-[600px] h-[600px] bg-[#D4AF37]/10 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-2">
              <GoldBadge>Newborn Visa UAE</GoldBadge>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-950/60 text-red-400 border border-red-500/30 text-[10px] font-mono font-extrabold uppercase tracking-widest rounded-[10px]">
                ⏱ 120-Day Grace Period
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black text-white leading-[1.08] tracking-tight font-sans"
            >
              Your Baby Is Here.{' '}
              <span className="bg-gradient-to-r from-[#FFF8DC] via-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent">
                5 Phases.
              </span>
              <br />120 Days. We Handle All of It.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.16 }} className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-medium">
              From the DHA birth certificate to the residence visa stamp in your baby's passport — all 5 phases managed end-to-end. Focus on your newborn while we race the 120-day clock.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.24 }} className="flex flex-wrap gap-2">
              {['No Medical for Baby', 'Door-to-Door MOFA', 'Embassy Coordination', 'EID Doorstep Delivery', 'Grace Period Tracked'].map(chip => (
                <span key={chip} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#111319] border border-white/10 text-slate-200 text-xs font-medium rounded-[10px] shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {chip}
                </span>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto pt-2">
              <motion.a href="#phases" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-dark-gold-gloss text-black font-extrabold text-xs uppercase tracking-wider rounded-[10px] shadow-[0_8px_24px_rgba(212,175,55,0.35)]">
                View 5-Phase Journey <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a href="https://wa.me/971586600396" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-extrabold text-xs uppercase tracking-wider rounded-[10px] shadow-lg transition-all">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Consultation
              </motion.a>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <GracePeriodTimer />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

// ─── 5-PHASE JOURNEY ──────────────────────────────────────────────────────────

function FivePhaseJourney() {
  const [activePhase, setActivePhase] = useState('birth-cert');
  const current = PHASES.find(p => p.id === activePhase);

  return (
    <SectionShell className="bg-[#0A0B0E]" id="phases">
      <SectionInner>
        <SectionHeader
          eyebrow="5-Phase Journey"
          title="The Complete Newborn Visa Roadmap"
          subtitle="Every baby born in the UAE must complete all 5 phases within the 120-day grace period. Select a phase to see exact requirements and our role."
        />

        {/* Phase selector — horizontal stepper */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {PHASES.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setActivePhase(phase.id)}
              className={`
                flex-shrink-0 flex flex-col items-center gap-1.5 px-4 py-3 rounded-[10px] border transition-all duration-200 min-w-[110px] cursor-pointer
                ${activePhase === phase.id
                  ? 'bg-dark-gold-gloss text-black border-transparent shadow-[0_4px_20px_rgba(212,175,55,0.35)] font-bold'
                  : 'bg-[#111319] border-white/10 text-slate-300 hover:border-[#D4AF37]/50 hover:text-white'
                }
              `}
            >
              <span className="text-[10px] font-mono font-extrabold tracking-widest opacity-80">PHASE {phase.phase}</span>
              <phase.icon className="w-5 h-5" />
              <span className="text-xs font-bold text-center leading-tight">{phase.label}</span>
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
                <LuxuryCard hover={false} className="p-7 h-full bg-[#111319] border-white/10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-[10px] flex items-center justify-center bg-dark-gold-gloss shadow-[0_6px_20px_rgba(212,175,55,0.25)]">
                      <current.icon className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-widest">{current.window} · {current.authority}</div>
                      <h3 className="font-bold text-white text-xl">{current.label}</h3>
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-medium">{current.summary}</p>

                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4AF37] mb-3">What Happens in This Phase</h4>
                  <ul className="space-y-3">
                    {current.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-[6px] bg-dark-gold-gloss flex items-center justify-center mt-0.5">
                          <span className="text-[10px] font-black text-black">{i + 1}</span>
                        </div>
                        <span className="text-sm text-slate-200 font-medium">{step}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Pro tip */}
                  <div className="mt-6 p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-[10px]">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="w-4 h-4 text-[#D4AF37]" />
                      <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wide">PRO TIP</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{current.tip}</p>
                  </div>
                </LuxuryCard>
              </div>

              <div>
                <LuxuryCard hover={false} className="h-full bg-[#111319] border-white/10">
                  <div className="h-[3px] bg-gradient-to-r from-[#B8860B] via-[#FFF8DC] to-[#D4AF37]" />
                  <div className="p-6">
                    <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4AF37] mb-4">Phase Summary</p>

                    <div className="bg-[#0A0B0E] border border-white/10 rounded-[10px] p-4 mb-4">
                      <div className="text-[10px] font-mono font-bold uppercase tracking-wide text-slate-400 mb-1">Authority</div>
                      <div className="font-bold text-base text-white">{current.authority}</div>
                    </div>

                    <div className="bg-[#0A0B0E] border border-white/10 rounded-[10px] p-4 mb-4">
                      <div className="text-[10px] font-mono font-bold uppercase tracking-wide text-slate-400 mb-1">Typical Fee</div>
                      <div className="font-extrabold text-[#D4AF37] text-lg font-mono">{current.fee}</div>
                    </div>

                    <div className="bg-[#0A0B0E] border border-white/10 rounded-[10px] p-4 mb-6">
                      <div className="text-[10px] font-mono font-bold uppercase tracking-wide text-slate-400 mb-1">Timing Window</div>
                      <div className="font-bold text-white">{current.window}</div>
                    </div>

                    <motion.a
                      href="https://wa.me/971586600396"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="block w-full text-center py-3.5 rounded-[10px] font-extrabold text-xs uppercase tracking-wider text-black bg-dark-gold-gloss shadow-[0_6px_20px_rgba(212,175,55,0.3)] transition-all cursor-pointer"
                    >
                      Start Phase {current.phase} →
                    </motion.a>
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

// ─── TOTAL FEE ESTIMATE ───────────────────────────────────────────────────────

function TotalFeeSection() {
  const feeItems = [
    { phase: 'Phase 1', label: 'DHA Birth Certificate (hospital)', cost: 0 },
    { phase: 'Phase 2', label: 'MOFA Attestation', cost: 150 },
    { phase: 'Phase 3', label: 'Embassy Passport (varies by nationality)', cost: null },
    { phase: 'Phase 4', label: 'Emirates ID (2-year visa)', cost: 200 },
    { phase: 'Phase 5', label: 'GDRFA Entry Permit + Visa Stamp', cost: 1820 },
    { phase: 'All', label: 'Concierge Service Fee (all 5 phases)', cost: 1500 },
  ];
  const minTotal = feeItems.filter(f => f.cost !== null).reduce((s, f) => s + (f.cost || 0), 0);

  return (
    <SectionShell className="bg-[#050505]" id="fees">
      <SectionInner>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <SectionHeader
            eyebrow="Transparent Fees"
            title="Full 5-Phase Cost Breakdown"
            subtitle="Every government fee for every phase — itemized and transparent. Embassy passport fees vary by nationality and are quoted separately."
          />
          <motion.div
            className="bg-[#111319] border border-white/10 rounded-[10px] overflow-hidden shadow-[0_20px_60px_-20px_rgba(212,175,55,0.15)] font-sans"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={scaleIn}
          >
            <div className="h-[3px] bg-gradient-to-r from-[#B8860B] via-[#FFF8DC] to-[#D4AF37]" />
            <div className="p-6">
              <div className="space-y-2 mb-4">
                {feeItems.map((item, i) => (
                  <div key={i} className="flex justify-between items-baseline gap-4 py-2.5 border-b border-white/5 last:border-0">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-wide mr-2">{item.phase}</span>
                      <span className="text-sm text-slate-300">{item.label}</span>
                    </div>
                    <span className="font-bold text-sm text-white font-mono whitespace-nowrap">
                      {item.cost === null ? 'Variable' : item.cost === 0 ? 'Free' : `AED ${item.cost.toLocaleString()}`}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-[10px] px-4 py-4 flex justify-between items-center">
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wide text-white">Total from</div>
                  <div className="text-[10px] text-slate-400 font-mono">(excl. embassy passport fee)</div>
                </div>
                <span className="font-extrabold text-xl text-[#D4AF37] font-mono">AED {minTotal.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionInner>
    </SectionShell>
  );
}

export default function NewbornVisaPage() {
  return (
    <div className="font-sans antialiased bg-[#050505] text-white selection:bg-[#D4AF37]/30 selection:text-[#D4AF37]">
      <NewbornHero />
      <FivePhaseJourney />
      <TotalFeeSection />
      <LuxuryDocumentTabs
        documents={DOCUMENTS}
        tabs={[
          { key: 'parents', label: 'Parent Documents' },
          { key: 'baby', label: 'Baby\'s Documents' }
        ]}
      />
      <FAQAccordion
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about UAE Newborn Visa processing & the 120-day grace period."
        badge="NEWBORN VISA FAQS"
        items={FAQS}
      />
      <LuxuryFooterCTA
        headline="Your Baby's Clock Is Ticking. Let's Beat the 120-Day Deadline Together."
        subline="Share your baby's birth date on WhatsApp and we'll map out the full 5-phase timeline, identify the critical path, and start Phase 1 today. Free consultation."
      />
    </div>
  );
}

