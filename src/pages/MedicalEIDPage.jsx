import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Clock,
  Zap,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  UserCheck,
  Award,
  Search,
  Building,
  Navigation
} from 'lucide-react';
import {
  SectionShell,
  SectionInner,
  SectionHeader,
  LuxuryCard,
  GoldBadge,
  LuxuryFAQ,
  LuxuryFooterCTA,
  LuxuryProcessTimeline,
  LuxuryDocumentTabs,
  fadeUp,
  scaleIn
} from '../components/LuxuryServicePage';

// --- INTERACTIVE MEDICAL & EID CENTER FINDER WIDGET ---
const MedicalCenterFinder = () => {
  const [speedCategory, setSpeedCategory] = useState('smart-salem'); // smart-salem | express | standard
  const [areaZone, setAreaZone] = useState('all');

  const centerList = [
    {
      name: 'Smart Salem Executive Center (DIFC / City Walk)',
      type: 'smart-salem',
      time: '30-Minute AI Fast-Track Results',
      fee: 800,
      area: 'central',
      address: 'City Walk & DIFC Gate Precinct, Dubai',
      desc: '100% paperless AI medical screening with blood test, chest X-ray, and 30-minute electronic DHA result issuance.'
    },
    {
      name: 'Smart Salem Knowledge Park (JLT / Marina)',
      type: 'smart-salem',
      time: '30-Minute AI Fast-Track Results',
      fee: 800,
      area: 'south',
      address: 'Dubai Knowledge Park, Block 12, Dubai',
      desc: 'Executive VIP lounge screening for Dubai South, JLT, Palm Jumeirah, and Marina residents.'
    },
    {
      name: 'DHA Al Twar Medical Fitness Center',
      type: 'express',
      time: '4-Hour Express Medical Result',
      fee: 520,
      area: 'north',
      address: 'Al Twar Center, Deira, Dubai',
      desc: 'Official DHA government center offering 4-hour express medical fitness reports and ICP biometrics.'
    },
    {
      name: 'DHA Muhaisnah Medical Fitness Center',
      type: 'standard',
      time: '24-48 Hour Standard Medical Result',
      fee: 320,
      area: 'north',
      address: 'Muhaisnah 4, Deira, Dubai',
      desc: '24-hour operational capacity center for general employment and family residence visas.'
    },
    {
      name: 'ICP Emirates ID Center (Al Rashidiya / Jafiliya)',
      type: 'express',
      time: 'Biometric Fingerprint Capture',
      fee: 370,
      area: 'central',
      address: 'Al Rashidiya / Al Jafiliya, Dubai',
      desc: 'Official Federal Authority for Identity (ICP) biometric center for fingerprinting and photo capture.'
    }
  ];

  const filteredCenters = centerList.filter((c) => {
    const matchType = speedCategory === 'all' || c.type === speedCategory;
    const matchArea = areaZone === 'all' || c.area === areaZone;
    return matchType && matchArea;
  });

  return (
    <LuxuryCard className="p-6 md:p-8 bg-gradient-to-br from-[#12100E]/90 via-[#1A1612]/80 to-[#12100E]/90 border-[#D4AF37]/30 backdrop-blur-xl relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-[#D4AF37]/20 pb-4">
        <div>
          <GoldBadge text="DHA & ICP Center Directory" icon={MapPin} />
          <h3 className="text-xl md:text-2xl font-serif text-[#FFE58F] mt-2 font-bold">
            Visa Medical & Emirates ID Center Directory
          </h3>
          <p className="text-xs text-[#D4AF37]/70">
            Find nearest DHA medical screening centers, Smart Salem VIP 30-min lounges, and ICP fingerprint locations
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Filter Controls */}
        <div className="lg:col-span-4 space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#FFE58F] uppercase tracking-wider block mb-2">
              Select Processing Speed
            </label>
            <div className="space-y-2">
              {[
                { id: 'smart-salem', label: '30-Min Smart Salem VIP (AI)', icon: Zap },
                { id: 'express', label: '4-Hour Express Medical', icon: Clock },
                { id: 'standard', label: '24-48 Hour Standard', icon: ShieldCheck }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSpeedCategory(item.id)}
                  className={`w-full p-3 rounded-[10px] text-left transition-all border flex items-center justify-between ${
                    speedCategory === item.id
                      ? 'bg-gradient-to-r from-[#8C5E00]/40 to-[#D4AF37]/20 border-[#D4AF37] text-[#FFE58F]'
                      : 'bg-[#1A1612]/60 border-[#D4AF37]/15 text-zinc-400'
                  }`}
                >
                  <span className="text-xs font-bold">{item.label}</span>
                  <item.icon className="w-3.5 h-3.5 text-[#D4AF37]" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#FFE58F] uppercase tracking-wider block mb-2">
              Dubai Geographic Zone
            </label>
            <select
              value={areaZone}
              onChange={(e) => setAreaZone(e.target.value)}
              className="w-full bg-[#1A1612] border border-[#D4AF37]/30 rounded-[10px] px-3.5 py-2.5 text-xs text-[#FFE58F] font-semibold focus:outline-none"
            >
              <option value="all">All Dubai Regions</option>
              <option value="central">Central (DIFC / City Walk / Downtown)</option>
              <option value="south">South (JLT / Marina / Palm Jumeirah)</option>
              <option value="north">North (Deira / Al Twar / Muhaisnah)</option>
            </select>
          </div>
        </div>

        {/* Directory Output */}
        <div className="lg:col-span-8 bg-[#0E0C0A] border border-[#D4AF37]/30 rounded-[10px] p-5 space-y-3 max-h-[400px] overflow-y-auto">
          {filteredCenters.map((c, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-[8px] bg-[#161310] border border-[#D4AF37]/20 flex flex-col justify-between gap-2 hover:border-[#D4AF37]/50 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-[#FFE58F] flex items-center gap-2">
                    <Building className="w-3.5 h-3.5 text-[#D4AF37]" /> {c.name}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-1 flex items-center gap-1.5">
                    <Navigation className="w-3 h-3 text-zinc-500" /> {c.address}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-xs font-mono font-bold text-[#FFE58F]">AED {c.fee}</span>
                  <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">{c.time}</div>
                </div>
              </div>

              <p className="text-[11px] text-zinc-400 leading-relaxed pt-2 border-t border-[#D4AF37]/10">
                {c.desc}
              </p>

              <div className="pt-2 flex justify-end">
                <a
                  href="https://wa.me/9718003627"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] hover:text-[#FFE58F] flex items-center gap-1"
                >
                  Book Priority Appointment <ArrowRight className="w-3 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LuxuryCard>
  );
};

export default function MedicalEIDPage() {
  const bentoServices = [
    {
      icon: Zap,
      title: '30-Minute Smart Salem VIP',
      desc: 'Ultra-fast AI medical screening at Smart Salem centers (City Walk, DIFC, Knowledge Park) with 30-minute DHA results.'
    },
    {
      icon: Clock,
      title: '4-Hour DHA Express Medical',
      desc: 'Same-day 4-hour express blood test and chest X-ray screening across major DHA medical fitness centers in Dubai.'
    },
    {
      icon: UserCheck,
      title: 'ICP Biometrics & Fingerprinting',
      desc: 'Appointment scheduling and document typing for mandatory Emirates ID fingerprinting and photo capture.'
    },
    {
      icon: ShieldCheck,
      title: 'Executive VIP Medical Pickup',
      desc: 'Doorstep luxury chauffeur transport to Smart Salem or DHA centers with dedicated VIP concierge assistance.'
    },
    {
      icon: MapPin,
      title: 'Nearest Center Finder',
      desc: 'Real-time geographic directory sorting official DHA medical centers and ICP offices by proximity to your home.'
    },
    {
      icon: Award,
      title: 'Golden Visa Fast-Track Medical',
      desc: 'Specialized VIP screening packages tailored for 10-Year Golden Visa applicants and corporate executives.'
    }
  ];

  const documentTabs = [
    {
      id: 'medical',
      title: 'Visa Medical',
      icon: Zap,
      docs: [
        { name: 'Original Passport or Clear Color Copy', req: 'Mandatory', hint: 'Must show valid entry permit or current residence' },
        { name: 'GDRFA Entry Permit Copy', req: 'Mandatory', hint: 'Issued by GDRFA for new residence visas' },
        { name: '2 White Background Photos', req: 'Mandatory', hint: 'Standard ICA passport size photo' }
      ]
    },
    {
      id: 'eid',
      title: 'Emirates ID Biometrics',
      icon: UserCheck,
      docs: [
        { name: 'ICP Emirates ID Application Form', req: 'Mandatory', hint: 'Typed application showing reference number' },
        { name: 'Original Passport', req: 'Mandatory', hint: 'Must be presented physically at ICP counter' },
        { name: 'Appointment Confirmation QR Code', req: 'Mandatory', hint: 'Scheduled time slot for fingerprinting' }
      ]
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Medical Typing & Appointment Reservation',
      desc: 'Generating official DHA medical typing form and booking Smart Salem or express time slot.'
    },
    {
      step: '02',
      title: 'DHA Medical Fitness Screening',
      desc: 'Attending center for rapid blood test and digital chest X-ray.'
    },
    {
      step: '03',
      title: 'ICP Emirates ID Biometrics',
      desc: 'Completing fingerprinting, signature, and photo capture at accredited ICP biometric center.'
    },
    {
      step: '04',
      title: 'E-Medical Result & EID Issuance',
      desc: 'Receiving electronic DHA Medical Fitness Certificate via SMS/Email and digital Emirates ID on UAE Pass.'
    }
  ];

  const faqs = [
    {
      q: 'What is Smart Salem 30-Minute VIP Visa Medical in Dubai?',
      a: 'Smart Salem is an AI-powered premium medical fitness center accredited by DHA. It delivers your official medical fitness result within 30 minutes using robotic blood testing and automated X-ray analysis, located at City Walk, DIFC, and Knowledge Park.'
    },
    {
      q: 'Do children need to undergo visa medical screening in Dubai?',
      a: 'No. Dependents under 18 years of age are exempt from DHA medical fitness screening (blood test & X-ray). However, they require Emirates ID typing and passport photo submission.'
    },
    {
      q: 'What tests are included in the DHA Visa Medical Fitness Examination?',
      a: 'The mandatory DHA medical examination includes a blood test for communicable diseases (HIV, Hepatitis B, Syphilis) and a chest X-ray for tuberculosis.'
    },
    {
      q: 'Who needs to attend ICP Emirates ID biometric fingerprinting?',
      a: 'First-time residence visa applicants in the UAE (and certain renewals depending on nationality) must attend an ICP center to register biometrics (fingerprints, eye scan, digital photograph).'
    }
  ];

  return (
    <SectionShell activeServiceId="medical-eid">
      {/* --- HERO SECTION --- */}
      <div className="relative pt-6 pb-12 overflow-hidden">
        <SectionInner>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div variants={fadeUp} className="lg:col-span-7 space-y-6">
              <GoldBadge text="DHA & ICP Official Screening Directory" icon={MapPin} />

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.1]">
                Visa Medical Fitness & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFE58F] to-[#D4AF37]">
                  Emirates ID Biometric Centers
                </span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
                Find every official DHA visa medical center and ICP biometrics location in Dubai. Book 30-minute Smart Salem VIP or 4-hour express appointments.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#D4AF37]/20">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FFE58F] font-mono">30 Mins</div>
                  <div className="text-xs text-zinc-400 mt-1">Smart Salem AI VIP</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FFE58F] font-mono">4 Hours</div>
                  <div className="text-xs text-zinc-400 mt-1">DHA Express Screening</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FFE58F] font-mono">100%</div>
                  <div className="text-xs text-zinc-400 mt-1">VIP Priority Booking</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="https://wa.me/9718003627"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-[10px] bg-gradient-to-r from-[#8C5E00] via-[#D4AF37] to-[#8C5E00] text-black font-bold text-sm uppercase tracking-wider hover:opacity-95 transition-all shadow-xl shadow-[#D4AF37]/20 flex items-center gap-3"
                >
                  Book Express Medical Appointment <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Finder Column */}
            <motion.div variants={scaleIn} className="lg:col-span-12">
              <MedicalCenterFinder />
            </motion.div>
          </div>
        </SectionInner>
      </div>

      {/* --- BENTO CAPABILITIES --- */}
      <div className="py-16 bg-[#0E0C0A]/60 border-y border-[#D4AF37]/15">
        <SectionInner>
          <SectionHeader
            badge="Healthcare & Biometrics"
            title="Comprehensive Medical & EID Solutions"
            subtitle="Fast-track medical fitness screening and biometric fingerprinting for all Dubai residence visas."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {bentoServices.map((svc, idx) => {
              const IconComp = svc.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="p-6 rounded-[10px] bg-[#161310] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
                >
                  <div className="w-12 h-12 rounded-[8px] bg-gradient-to-br from-[#8C5E00]/30 to-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#FFE58F] mb-5 group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-serif text-[#FFE58F] font-bold mb-2">
                    {svc.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {svc.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </SectionInner>
      </div>

      {/* --- DOCUMENT TABS --- */}
      <div className="py-16">
        <SectionInner>
          <SectionHeader
            badge="Checklist Matrix"
            title="Required Documentation for Medical & EID"
            subtitle="Essential IDs and entry permits needed at DHA screening and ICP counters."
          />

          <div className="mt-10">
            <LuxuryDocumentTabs tabs={documentTabs} />
          </div>
        </SectionInner>
      </div>

      {/* --- PROCESS TIMELINE --- */}
      <div className="py-16 bg-[#0E0C0A]/80 border-t border-[#D4AF37]/15">
        <SectionInner>
          <SectionHeader
            badge="4-Stage Workflow"
            title="Medical & Biometrics Execution Flow"
            subtitle="From typing reservation to 30-minute AI screening and final digital EID issuance."
          />

          <div className="mt-12">
            <LuxuryProcessTimeline steps={processSteps} />
          </div>
        </SectionInner>
      </div>

      {/* --- FAQ SECTION --- */}
      <div className="py-16">
        <SectionInner>
          <SectionHeader
            badge="Medical FAQ"
            title="Frequently Asked Visa Medical Questions"
            subtitle="Essential information on Smart Salem AI centers, DHA turnaround times, and biometrics."
          />

          <div className="mt-12 max-w-4xl mx-auto">
            <LuxuryFAQ items={faqs} />
          </div>
        </SectionInner>
      </div>

      {/* --- FOOTER CTA --- */}
      <LuxuryFooterCTA
        title="Book 30-Minute Smart Salem VIP Medical Screening"
        subtitle="Schedule your fast-track DHA medical fitness screening and ICP biometrics with our VIP concierge team."
        buttonText="Book VIP Medical via WhatsApp"
        whatsappNumber="9718003627"
      />
    </SectionShell>
  );
}
