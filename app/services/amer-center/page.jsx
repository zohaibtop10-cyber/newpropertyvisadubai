'use client';

import React, { useState } from 'react';
import { 
  FileCheck2, 
  Search, 
  CheckCircle2, 
  XCircle, 
  UploadCloud, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  FileText, 
  ArrowRight, 
  MessageSquare, 
  ChevronDown, 
  UserCheck, 
  RefreshCw, 
  UserX, 
  Receipt, 
  Lock,
  BadgeCheck
} from 'lucide-react';
import ProcessTimeline from '../../components/ProcessTimeline';

export default function AmerCenterServicesPage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // Document upload mockup states
  const [uploadedFiles, setUploadedFiles] = useState({
    passport: false,
    uid: false,
    sponsorEid: false
  });

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setTrackingResult({
        ref: trackingNumber.toUpperCase(),
        status: 'GDRFA Approved & Issued',
        date: 'Today, 14:20 GST',
        type: 'Residency Visa Renewal & Stamping',
        applicant: 'Verified Enterprise Client'
      });
    }, 800);
  };

  const handleSimulateUpload = (key) => {
    setUploadedFiles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const faqs = [
    { 
      q: "What happens after a UAE residency visa is officially cancelled?", 
      a: "Upon cancellation approval from GDRFA, the visa holder receives a standard 30-day grace period (or up to 60-90 days under updated 2024 regulations depending on visa category) to either exit the country or amend status to a new residency visa without incurring daily overstay fines." 
    },
    { 
      q: "How to clear an absconding report or overstay fine through Amer Center?", 
      a: "Absconding clearance and overstay fine waivers require direct GDRFA legal audit. Our digital Amer team files a formal modification petition along with passport copy and sponsor NOC, allowing fine settlement or status regularization without deportation." 
    },
    { 
      q: "How fast is digital Amer typing compared to visiting a physical center?", 
      a: "While physical typing centers require waiting in queues for 1-2 hours, our digital portal pre-audits documents in real time and submits directly to GDRFA within 15 to 30 minutes of receipt." 
    },
    { 
      q: "Can I process an Inside-Country Status Change without exiting the UAE?", 
      a: "Yes. GDRFA allows inside-country status modification (In-Country Entry Permit adjustment). You do not need to exit via airport or border; our digital service handles the status change paper electronically within 24 hours." 
    }
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-brand-goldBg selection:text-black">
      
      {/* 1. HERO & REAL-TIME TRACKING WIDGET */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 px-6 overflow-hidden border-b border-white/10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-goldBg/10 via-[#050505] to-[#050505]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-goldBg/10 border border-brand-goldBg/30 text-brand-goldText text-xs font-mono font-bold rounded-[10px] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-brand-goldText" />
              <span>OFFICIAL GDRFA & AMER TYPING PORTAL—100% ONLINE</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              Official GDRFA Typing & Amer Center Services—100% Online
            </h1>
            
            <p className="text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              Skip the queues. We process entry permits, status adjustments, and visa cancellations digitally with guaranteed typing accuracy.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
              {[
                "100% Digital GDRFA Typing",
                "Zero Physical Center Visits",
                "Direct WhatsApp Liaison"
              ].map((b, i) => (
                <div key={i} className="bg-[#111111] border border-white/10 p-4 rounded-[10px] flex items-center justify-center gap-2.5 shadow-md">
                  <CheckCircle2 className="w-4 h-4 text-brand-goldText shrink-0" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Widget: Real-Time GDRFA Application Tracking */}
          <div className="lg:col-span-5">
            <div className="bg-[#111111] backdrop-blur-md border border-brand-goldBg/30 p-6 sm:p-8 rounded-[10px] shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#B8860B] via-[#F3E5AB] to-[#D4AF37]" />

              <div className="border-b border-white/10 pb-4">
                <span className="bg-brand-goldBg/20 text-brand-goldText border border-brand-goldBg/40 text-[10px] font-mono font-bold px-2.5 py-1 rounded-[10px] inline-block uppercase tracking-wider mb-2">
                  LIVE GDRFA PORTAL STATUS
                </span>
                <h3 className="text-xl font-extrabold text-white">Track Your GDRFA Application</h3>
                <p className="text-xs text-text-muted mt-1">Enter your application reference or transaction number.</p>
              </div>

              <form onSubmit={handleTrackSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase font-mono">
                    Application Ref / GDRFA Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      placeholder="e.g. GDRFA-2026-98412X or 201/2026/..."
                      className="w-full bg-[#050505] border border-white/10 rounded-[10px] pl-4 pr-10 py-3.5 text-white text-xs font-mono focus:border-brand-goldBg focus:outline-none placeholder:text-text-muted"
                    />
                    <Search className="w-4 h-4 text-brand-goldText absolute right-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSearching}
                  className="w-full py-3.5 bg-brand-goldBg text-black font-extrabold rounded-[10px] shadow-[0_0_20px_rgba(212,175,55,0.3)] text-xs uppercase font-mono tracking-wider cursor-pointer hover:bg-brand-goldText transition-all flex items-center justify-center gap-2"
                >
                  {isSearching ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <FileCheck2 className="w-4 h-4" />
                  )}
                  <span>{isSearching ? 'Auditing GDRFA System...' : 'Track Real-Time Status'}</span>
                </button>
              </form>

              {trackingResult && (
                <div className="p-4 bg-[#050505] border border-brand-goldBg/40 rounded-[10px] space-y-2 font-mono animate-fadeIn">
                  <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
                    <span className="text-text-muted">Ref: {trackingResult.ref}</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <BadgeCheck className="w-3.5 h-3.5" />
                      {trackingResult.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-300 pt-1">
                    <div><span className="text-text-muted">Service:</span> {trackingResult.type}</div>
                    <div><span className="text-text-muted">Last Updated:</span> {trackingResult.date}</div>
                  </div>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between text-[11px] text-text-muted border-t border-white/5 font-mono">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-goldText" /> Encrypted Direct Typing
                </span>
                <a 
                  href="https://wa.me/971566556645?text=Hello%2C%20I%20need%20urgent%20Amer%20GDRFA%20typing%20assistance."
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-brand-goldText hover:underline font-bold"
                >
                  Instant PRO WhatsApp →
                </a>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. IMMIGRATION SERVICES GRID */}
      <section className="py-24 px-6 bg-[#050505] border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 bg-brand-goldBg/10 border border-brand-goldBg/30 text-brand-goldText text-xs font-mono font-bold rounded-[10px] uppercase tracking-wider">
              Comprehensive GDRFA Catalog
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Official Amer & Immigration Services Grid
            </h2>
            <p className="text-xs sm:text-sm text-text-muted max-w-xl mx-auto">
              Every GDRFA transaction typed with guaranteed accuracy and submitted directly to Dubai Immigration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="bg-[#111111] border border-white/10 p-6 rounded-[10px] space-y-4 hover:border-brand-goldBg/40 transition-all group">
              <div className="w-12 h-12 rounded-[10px] bg-brand-goldBg/10 border border-brand-goldBg/30 flex items-center justify-center text-brand-goldText group-hover:scale-105 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-brand-goldText transition-colors">
                Entry Permits (Work/Visit)
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Urgent digital typing for employment entry permits, family visit visas, and investor initial entry approvals.
              </p>
              <div className="pt-2 text-[11px] font-mono text-brand-goldText font-bold">
                Typical Turnaround: 2–6 Hours
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#111111] border border-white/10 p-6 rounded-[10px] space-y-4 hover:border-brand-goldBg/40 transition-all group">
              <div className="w-12 h-12 rounded-[10px] bg-brand-goldBg/10 border border-brand-goldBg/30 flex items-center justify-center text-brand-goldText group-hover:scale-105 transition-transform">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-brand-goldText transition-colors">
                Change of Status (Inside Country)
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Seamless in-country visa status modification without border runs or airport exit requirements.
              </p>
              <div className="pt-2 text-[11px] font-mono text-brand-goldText font-bold">
                Avoids Overstay Fines Instantly
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#111111] border border-white/10 p-6 rounded-[10px] space-y-4 hover:border-brand-goldBg/40 transition-all group">
              <div className="w-12 h-12 rounded-[10px] bg-brand-goldBg/10 border border-brand-goldBg/30 flex items-center justify-center text-brand-goldText group-hover:scale-105 transition-transform">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-brand-goldText transition-colors">
                Visa Stamping / Renewal
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Residency visa electronic approval, medical fitness link integration, and Emirates ID renewal typing.
              </p>
              <div className="pt-2 text-[11px] font-mono text-brand-goldText font-bold">
                100% E-Visa Digital Delivery
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-[#111111] border border-white/10 p-6 rounded-[10px] space-y-4 hover:border-brand-goldBg/40 transition-all group">
              <div className="w-12 h-12 rounded-[10px] bg-brand-goldBg/10 border border-brand-goldBg/30 flex items-center justify-center text-brand-goldText group-hover:scale-105 transition-transform">
                <UserX className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-brand-goldText transition-colors">
                Visa Cancellation & Clearance
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Fast employee or dependent visa cancellation typing with official GDRFA clearance & departure advice.
              </p>
              <div className="pt-2 text-[11px] font-mono text-brand-goldText font-bold">
                Express Same-Day Cancellation
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. THE "VIP AMER EXPERIENCE" SPLIT SCREEN */}
      <section className="py-24 px-6 bg-[#050505] border-t border-white/10">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 bg-brand-goldBg/10 border border-brand-goldBg/30 text-brand-goldText text-xs font-mono font-bold rounded-[10px] uppercase tracking-wider">
              Service Paradigm Comparison
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              The "VIP Amer Experience" vs. Physical Typing Centers
            </h2>
            <p className="text-xs sm:text-sm text-text-muted max-w-xl mx-auto">
              Why leading UAE corporations and residents choose our digital platform over manual counter visits.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Left Side: Standard Amer Center */}
            <div className="bg-[#111111] border border-red-500/20 p-6 sm:p-8 rounded-[10px] space-y-6">
              <div className="border-b border-red-500/20 pb-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-wider">TRADITIONAL COUNTER</span>
                  <h3 className="text-xl font-bold text-slate-300">Standard Physical Amer Center</h3>
                </div>
                <XCircle className="w-6 h-6 text-red-400 shrink-0" />
              </div>

              <ul className="space-y-4 text-xs text-text-muted">
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>Physical queueing & long wait times (1 to 3 hours spent at counter).</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>High risk of manual typing errors leading to GDRFA rejection & lost fee payments.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>Multiple physical trips required for photo resubmissions and document amendments.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>No dedicated account officer — dealing with different counter clerks each time.</span>
                </li>
              </ul>
            </div>

            {/* Right Side: Our Digital Platform */}
            <div className="bg-[#111111] border border-brand-goldBg/40 p-6 sm:p-8 rounded-[10px] space-y-6 shadow-[0_0_30px_rgba(212,175,55,0.1)] relative">
              <div className="absolute top-0 right-0 bg-brand-goldBg text-black text-[10px] font-mono font-black px-3 py-1 rounded-bl-[10px] uppercase">
                RECOMMENDED DIGITAL TRACK
              </div>

              <div className="border-b border-white/10 pb-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-brand-goldText uppercase tracking-wider">100% ONLINE CONCIERGE</span>
                  <h3 className="text-xl font-bold text-white">Our VIP Digital Platform</h3>
                </div>
                <CheckCircle2 className="w-6 h-6 text-brand-goldText shrink-0" />
              </div>

              <ul className="space-y-4 text-xs text-slate-200">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-goldText shrink-0 mt-0.5" />
                  <span><strong>Zero physical visits:</strong> 100% online WhatsApp and web document upload.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-goldText shrink-0 mt-0.5" />
                  <span><strong>AI + Senior PRO Audit:</strong> Dual pre-check eliminates typing error rejections completely.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-goldText shrink-0 mt-0.5" />
                  <span><strong>Instant Digital PDF Delivery:</strong> Entry permits and stamped visas sent directly via WhatsApp & Email.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-goldText shrink-0 mt-0.5" />
                  <span><strong>Dedicated VIP Support Officer:</strong> Real-time status updates and direct hotline access.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 4. GOVERNMENT FEE INVOICE BREAKDOWN */}
      <section className="py-24 px-6 bg-[#050505] border-t border-white/10">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 bg-brand-goldBg/10 border border-brand-goldBg/30 text-brand-goldText text-xs font-mono font-bold rounded-[10px] uppercase tracking-wider">
              100% Transparent Billing
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Official GDRFA Fee Invoice Breakdown
            </h2>
            <p className="text-xs sm:text-sm text-text-muted">
              No hidden surcharges. Itemized digital receipt of official Dubai GDRFA government fees.
            </p>
          </div>

          <div className="bg-[#111111] border border-white/10 rounded-[10px] p-6 sm:p-8 shadow-2xl relative font-mono overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#B8860B] via-[#F3E5AB] to-[#D4AF37]" />

            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-brand-goldText" />
                <span className="text-sm font-bold text-white">Sample GDRFA Status Change Invoice</span>
              </div>
              <span className="text-xs text-brand-goldText bg-brand-goldBg/10 border border-brand-goldBg/30 px-2.5 py-1 rounded-[10px]">
                GDRFA OFFICIAL RATES
              </span>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex justify-between py-2 border-b border-white/5">
                <span>Official Amer Center Typing Fee</span>
                <span className="text-white font-bold">AED 150.00</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span>GDRFA In-Country Status Change Fee</span>
                <span className="text-white font-bold">AED 675.00</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span>Residency Entry Permit Clearance</span>
                <span className="text-white font-bold">AED 350.00</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span>Emirates ID (2-Year Application)</span>
                <span className="text-white font-bold">AED 370.00</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span>DHA Medical Fitness Smart Audit</span>
                <span className="text-white font-bold">AED 320.00</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-brand-goldBg/30 flex justify-between items-center text-sm font-bold text-white">
              <span className="text-brand-goldText uppercase">Total Government & Typing Cost</span>
              <span className="text-xl text-brand-goldText font-black">AED 1,865.00</span>
            </div>

            <p className="text-[11px] text-text-muted mt-4 leading-relaxed">
              *Note: GDRFA transaction fees are established by Dubai General Directorate of Residency and Foreigners Affairs and are subject to official government portal updates.
            </p>
          </div>

        </div>
      </section>

      {/* 5. DOCUMENT UPLOAD CONCIERGE */}
      <section className="py-24 px-6 bg-[#050505] border-t border-white/10">
        <div className="max-w-5xl mx-auto space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 bg-brand-goldBg/10 border border-brand-goldBg/30 text-brand-goldText text-xs font-mono font-bold rounded-[10px] uppercase tracking-wider">
              256-Bit Encrypted Digital Vault
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Document Pre-Audit Concierge
            </h2>
            <p className="text-xs sm:text-sm text-text-muted">
              Upload your documents below or send via WhatsApp for immediate typing verification.
            </p>
          </div>

          <div className="bg-[#111111] border border-brand-goldBg/30 rounded-[10px] p-6 sm:p-8 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Dropzone 1 */}
              <div 
                onClick={() => handleSimulateUpload('passport')}
                className={`border-2 border-dashed rounded-[10px] p-6 text-center cursor-pointer transition-all ${
                  uploadedFiles.passport 
                    ? 'border-emerald-500/50 bg-emerald-500/5' 
                    : 'border-white/10 bg-[#050505] hover:border-brand-goldBg/50'
                }`}
              >
                {uploadedFiles.passport ? (
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                ) : (
                  <UploadCloud className="w-8 h-8 text-brand-goldText mx-auto mb-2" />
                )}
                <div className="text-xs font-bold text-white mb-1">Passport & UID Page</div>
                <p className="text-[10px] text-text-muted">PDF or JPG (Min 6 months validity)</p>
                <div className="mt-3 text-[10px] font-mono text-brand-goldText font-bold">
                  {uploadedFiles.passport ? '✓ Document Loaded' : '+ Click to Select'}
                </div>
              </div>

              {/* Dropzone 2 */}
              <div 
                onClick={() => handleSimulateUpload('uid')}
                className={`border-2 border-dashed rounded-[10px] p-6 text-center cursor-pointer transition-all ${
                  uploadedFiles.uid 
                    ? 'border-emerald-500/50 bg-emerald-500/5' 
                    : 'border-white/10 bg-[#050505] hover:border-brand-goldBg/50'
                }`}
              >
                {uploadedFiles.uid ? (
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                ) : (
                  <UploadCloud className="w-8 h-8 text-brand-goldText mx-auto mb-2" />
                )}
                <div className="text-xs font-bold text-white mb-1">Sponsor Emirates ID</div>
                <p className="text-[10px] text-text-muted">Front & Back scan copy</p>
                <div className="mt-3 text-[10px] font-mono text-brand-goldText font-bold">
                  {uploadedFiles.uid ? '✓ Document Loaded' : '+ Click to Select'}
                </div>
              </div>

              {/* Dropzone 3 */}
              <div 
                onClick={() => handleSimulateUpload('sponsorEid')}
                className={`border-2 border-dashed rounded-[10px] p-6 text-center cursor-pointer transition-all ${
                  uploadedFiles.sponsorEid 
                    ? 'border-emerald-500/50 bg-emerald-500/5' 
                    : 'border-white/10 bg-[#050505] hover:border-brand-goldBg/50'
                }`}
              >
                {uploadedFiles.sponsorEid ? (
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                ) : (
                  <UploadCloud className="w-8 h-8 text-brand-goldText mx-auto mb-2" />
                )}
                <div className="text-xs font-bold text-white mb-1">Passport Photo</div>
                <p className="text-[10px] text-text-muted">High-res white background photo</p>
                <div className="mt-3 text-[10px] font-mono text-brand-goldText font-bold">
                  {uploadedFiles.sponsorEid ? '✓ Document Loaded' : '+ Click to Select'}
                </div>
              </div>

            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <Lock className="w-4 h-4 text-brand-goldText shrink-0" />
                <span>Encrypted transmission directly to our GDRFA Typing Specialist.</span>
              </div>
              
              <a
                href="https://wa.me/971566556645?text=Hello%2C%20I%20want%20to%20submit%20documents%20for%20GDRFA%20Amer%20typing."
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-brand-goldBg text-black font-extrabold rounded-[10px] shadow-[0_0_20px_rgba(212,175,55,0.3)] text-xs uppercase font-mono tracking-wider flex items-center justify-center gap-2 hover:bg-brand-goldText transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Submit Vault to WhatsApp</span>
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* 6. ONBOARDING WORKFLOW */}
      <ProcessTimeline
        title="4-Step Online GDRFA Typing Roadmap"
        subtitle="Document Audit -> Digital Typing -> GDRFA Submission -> E-Visa Delivery."
      />

      {/* 7. GDRFA FAQS ACCORDION */}
      <section className="py-24 px-6 bg-[#050505] border-t border-white/10">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl font-black text-white text-center">
            Frequently Asked GDRFA Questions
          </h2>
          
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-[#111111] border border-white/10 rounded-[10px] overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex justify-between items-center font-bold text-sm text-white hover:text-brand-goldText transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === idx ? 'rotate-180 text-brand-goldText' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-l-2 border-l-brand-goldBg pl-4 ml-5 mb-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
