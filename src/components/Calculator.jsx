import React, { useState } from 'react';
import { Calculator as CalcIcon, Shield, ChevronDown, CheckCircle2, Users, Building2, Crown, Heart, Baby, Home, Sparkles, Stethoscope, RefreshCw, Lock } from 'lucide-react';

export default function Calculator() {
  // Main Calculator Mode: 'family' | 'corporate'
  const [calcMode, setCalcMode] = useState('family');

  // --- FAMILY VISA CALCULATOR STATE (familyvisauae.com style) ---
  const [visaCategory, setVisaCategory] = useState('family'); // 'family' | 'golden' | 'parents' | 'maid' | 'newborn' | 'renewal'
  const [applicantType, setApplicantType] = useState('adult'); // 'adult' | 'child'
  const [locationStatus, setLocationStatus] = useState('inside'); // 'inside' | 'outside'
  const [medicalOption, setMedicalOption] = useState('vip'); // 'standard' (320) | 'vip' (750)
  const [attestation, setAttestation] = useState(true); // 450
  const [healthInsurance, setHealthInsurance] = useState(true); // 950
  const [applicantCount, setApplicantCount] = useState(1);

  // --- CORPORATE CALCULATOR STATE ---
  const [jurisdiction, setJurisdiction] = useState('mainland');
  const [visas, setVisas] = useState(3);
  const [license, setLicense] = useState('tech');
  const [banking] = useState(true);
  const [desk] = useState(false);

  // --- LEAD CAPTURE STATE ---
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // --- FAMILY VISA ITEMISED FEE LOGIC (Exact UAE GDRFA/ICP Tariffs) ---
  const getFamilyItemizedFees = () => {
    const isAdult = applicantType === 'adult';
    const isInside = locationStatus === 'inside';

    const fileOpening = 285; // One-time file opening fee
    const entryPermit = isInside ? 989 : 339;
    const statusChange = isInside ? 630 : 0;
    const medical = isAdult ? (medicalOption === 'vip' ? 750 : 320) : 0;
    const emiratesId = visaCategory === 'golden' ? 1153 : 385; // 10yr vs 2yr
    const stamping = 410;
    const attestationFee = attestation ? 450 : 0;
    const insuranceFee = healthInsurance ? 950 : 0;
    const advisoryFee = 500; // Fixed transparent service fee

    const totalPerApplicant = (fileOpening / applicantCount) + entryPermit + statusChange + medical + emiratesId + stamping + attestationFee + insuranceFee + advisoryFee;
    const grandTotal = totalPerApplicant * applicantCount;

    return {
      fileOpening: Math.round(fileOpening / applicantCount),
      entryPermit,
      statusChange,
      medical,
      emiratesId,
      stamping,
      attestationFee,
      insuranceFee,
      advisoryFee,
      totalPerApplicant: Math.round(totalPerApplicant),
      grandTotal: Math.round(grandTotal)
    };
  };

  // --- CORPORATE CALCULATION LOGIC ---
  const getCorporateTotal = () => {
    let base = jurisdiction === 'mainland' ? 18500 : jurisdiction === 'freezone' ? 12900 : 28000;
    let visaCost = visas * 3800;
    let bankCost = banking ? 4500 : 0;
    let deskCost = desk ? 6200 : 0;
    return base + visaCost + bankCost + deskCost;
  };

  const familyFees = getFamilyItemizedFees();
  const corporateTotal = getCorporateTotal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && phone) {
      setUnlocked(true);
      setSubmitted(true);
    }
  };

  return (
    <section id="calculator" className="bg-slate-50 dark:bg-[#0A0A0A] text-slate-900 dark:text-white py-20 px-4 sm:px-6 lg:px-8 font-sans border-b border-slate-200 dark:border-white/5 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">

        {/* Mode Switcher Tabs */}
        <div className="flex justify-center mb-10">
          <div className="bg-slate-200/90 dark:bg-white/5 p-1.5 rounded-2xl flex items-center gap-2 border border-slate-300 dark:border-white/10 shadow-inner max-w-xl w-full">
            <button
              onClick={() => setCalcMode('family')}
              className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-display font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${calcMode === 'family'
                ? 'bg-[#E01E37] text-white shadow-lg shadow-[#E01E37]/30 scale-[1.02]'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
            >
              <Users className="w-4 h-4" />
              <span>Family & Golden Visa Fee Calculator</span>
            </button>

            <button
              onClick={() => setCalcMode('corporate')}
              className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-display font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${calcMode === 'corporate'
                ? 'bg-[#E01E37] text-white shadow-lg shadow-[#E01E37]/30 scale-[1.02]'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Corporate Setup Cost Matrix</span>
            </button>
          </div>
        </div>

        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E01E37]/10 text-[#E01E37] border border-[#E01E37]/20 text-xs font-bold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-[#E01E37] animate-pulse-red" />
              {calcMode === 'family' ? 'LIVE UAE GOVERNMENT FEE CALCULATOR' : 'INSTITUTIONAL TARIFF ARCHITECTURE'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
              {calcMode === 'family' ? 'Itemized Family & Golden Visa Calculator' : 'UAE Corporate Setup Cost Architecture'}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl mt-2 leading-relaxed">
              {calcMode === 'family'
                ? 'Every official government transaction itemized—entry permit, status change, medical VIP, Emirates ID, & residence stamping.'
                : 'Estimate your setup costs across mainland, free zone, and offshore jurisdictions in under 30 seconds with official live tariff calculation.'}
            </p>
          </div>

        </div>

        {/* FAMILY VISA CALCULATOR */}
        {calcMode === 'family' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left Controls Column (Steps 1 to 3) */}
            <div className="lg:col-span-7 space-y-6">

              {/* Step 1: Visa Category */}
              <div className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:border-[#E01E37]/30 transition-all">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                  <span>STEP 01</span>
                  <Crown className="w-4 h-4 text-[#E01E37]" />
                </div>
                <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-1">Select Visa Category</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Choose the primary visa type for your dependants.</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'family', label: 'Family Visa', desc: 'Spouse & Kids', icon: Users },
                    { id: 'golden', label: '10-Yr Golden Visa', desc: '10-Year Validity', icon: Crown },
                    { id: 'parents', label: 'Parents Visa', desc: 'Mother & Father', icon: Heart },
                    { id: 'maid', label: 'Domestic / Maid', desc: 'Nanny / Driver', icon: Home },
                    { id: 'newborn', label: 'Newborn Baby', desc: 'Born in UAE', icon: Baby },
                    { id: 'renewal', label: 'Visa Renewal', desc: 'Extend Residence', icon: RefreshCw },
                  ].map((cat) => {
                    const IconComp = cat.icon;
                    const isSelected = visaCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setVisaCategory(cat.id)}
                        className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between cursor-pointer ${isSelected
                          ? 'bg-[#E01E37] border-[#E01E37] text-white shadow-md shadow-[#E01E37]/20 scale-[1.02]'
                          : 'bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 hover:border-slate-300 dark:hover:border-white/20'
                          }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <IconComp className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#E01E37]'}`} />
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                        <div>
                          <div className="font-display font-bold text-xs">{cat.label}</div>
                          <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'}`}>{cat.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Applicant Type & Current Location */}
              <div className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:border-[#E01E37]/30 transition-all">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                  <span>STEP 02</span>
                  <Stethoscope className="w-4 h-4 text-[#E01E37]" />
                </div>
                <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-1">Applicant Age & Location Status</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Adults require medical screening; in-country applicants require status change.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {/* Age */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Applicant Age Group</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setApplicantType('adult')}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${applicantType === 'adult' ? 'bg-[#E01E37] border-[#E01E37] text-white' : 'bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                          }`}
                      >
                        Adult (18+ Yrs)
                      </button>
                      <button
                        type="button"
                        onClick={() => setApplicantType('child')}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${applicantType === 'child' ? 'bg-[#E01E37] border-[#E01E37] text-white' : 'bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                          }`}
                      >
                        Child (No Medical)
                      </button>
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Current Location</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setLocationStatus('inside')}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${locationStatus === 'inside' ? 'bg-[#E01E37] border-[#E01E37] text-white' : 'bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                          }`}
                      >
                        Inside UAE
                      </button>
                      <button
                        type="button"
                        onClick={() => setLocationStatus('outside')}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${locationStatus === 'outside' ? 'bg-[#E01E37] border-[#E01E37] text-white' : 'bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                          }`}
                      >
                        Outside UAE
                      </button>
                    </div>
                  </div>
                </div>

                {/* Applicant Count Slider */}
                <div className="pt-3 border-t border-slate-100 dark:border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Number of Dependant Applicants:</span>
                    <span className="text-lg font-display font-extrabold text-[#E01E37]">{applicantCount} {applicantCount === 1 ? 'Person' : 'Persons'}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    value={applicantCount}
                    onChange={(e) => setApplicantCount(parseInt(e.target.value))}
                    className="w-full accent-[#E01E37] bg-slate-200 dark:bg-white/20 h-2 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Step 3: Medical Speed & Add-ons */}
              <div className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:border-[#E01E37]/30 transition-all">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                  <span>STEP 03</span>
                  <Sparkles className="w-4 h-4 text-[#E01E37]" />
                </div>
                <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-1">Medical VIP & Add-on Services</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Customize your processing speed and document attestations.</p>

                <div className="space-y-3">
                  {applicantType === 'adult' && (
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setMedicalOption('vip')}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${medicalOption === 'vip' ? 'bg-[#E01E37]/10 border-[#E01E37] text-slate-900 dark:text-white font-bold' : 'bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
                          }`}
                      >
                        <div className="text-xs font-bold text-[#E01E37]">⚡ VIP Medical Screening</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">30-min result (AED 750)</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setMedicalOption('standard')}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${medicalOption === 'standard' ? 'bg-[#E01E37]/10 border-[#E01E37] text-slate-900 dark:text-white font-bold' : 'bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
                          }`}
                      >
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Standard Medical</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">24-48 hr result (AED 320)</div>
                      </button>
                    </div>
                  )}

                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] cursor-pointer hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={attestation}
                        onChange={(e) => setAttestation(e.target.checked)}
                        className="w-4 h-4 accent-[#E01E37] rounded cursor-pointer"
                      />
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">MOFA Marriage / Birth Certificate Attestation</span>
                    </div>
                    <span className="text-[11px] font-bold text-[#E01E37] bg-[#E01E37]/10 px-2 py-0.5 rounded">+AED 450</span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] cursor-pointer hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={healthInsurance}
                        onChange={(e) => setHealthInsurance(e.target.checked)}
                        className="w-4 h-4 accent-[#E01E37] rounded cursor-pointer"
                      />
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Compliant Basic Health Insurance Policy</span>
                    </div>
                    <span className="text-[11px] font-bold text-[#E01E37] bg-[#E01E37]/10 px-2 py-0.5 rounded">+AED 950</span>
                  </label>
                </div>
              </div>

            </div>

            {/* Right Itemized Receipt Column */}
            <div className="lg:col-span-5 sticky top-28">
              <div className="bg-[#111111] dark:bg-[#141414] text-white border border-white/15 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#E01E37]/10 rounded-full blur-3xl pointer-events-none" />

                {/* Card Top Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#E01E37]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                      Itemized Government Fee Receipt
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-0.5 rounded-full">
                    GDRFA/ICP VERIFIED
                  </span>
                </div>

                {/* Itemized Table Breakdown */}
                <div className="space-y-3 text-xs mb-6 border-b border-white/10 pb-6 font-mono">
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Family File Opening Fee (One-time)</span>
                    <span className="font-semibold text-white">AED {familyFees.fileOpening}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Entry Permit Application</span>
                    <span className="font-semibold text-white">AED {familyFees.entryPermit}</span>
                  </div>
                  {familyFees.statusChange > 0 && (
                    <div className="flex justify-between items-center text-slate-300">
                      <span>In-Country Status Change Fee</span>
                      <span className="font-semibold text-[#E01E37]">AED {familyFees.statusChange}</span>
                    </div>
                  )}
                  {familyFees.medical > 0 && (
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Medical Fitness Screening ({medicalOption === 'vip' ? 'VIP 30-min' : 'Standard'})</span>
                      <span className="font-semibold text-white">AED {familyFees.medical}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Emirates ID Typing & Card ({visaCategory === 'golden' ? '10-Year' : '2-Year'})</span>
                    <span className="font-semibold text-white">AED {familyFees.emiratesId}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Residence Visa Stamping & Approval</span>
                    <span className="font-semibold text-white">AED {familyFees.stamping}</span>
                  </div>
                  {familyFees.attestationFee > 0 && (
                    <div className="flex justify-between items-center text-slate-300">
                      <span>MOFA Attestation Add-on</span>
                      <span className="font-semibold text-white">AED {familyFees.attestationFee}</span>
                    </div>
                  )}
                  {familyFees.insuranceFee > 0 && (
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Basic Health Insurance Add-on</span>
                      <span className="font-semibold text-white">AED {familyFees.insuranceFee}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-slate-300 pt-2 border-t border-white/5">
                    <span className="text-slate-400">Fixed Sovereign Advisory Fee</span>
                    <span className="font-semibold text-emerald-400">AED {familyFees.advisoryFee}</span>
                  </div>
                </div>

                {/* Total Display */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                    TOTAL ESTIMATED COST ({applicantCount} APPLICANT{applicantCount > 1 ? 'S' : ''}):
                  </div>
                  <div className="mt-1 flex items-baseline justify-between">
                    {unlocked ? (
                      <div className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
                        AED {familyFees.grandTotal.toLocaleString()}
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight blur-md select-none">
                          AED 4,950
                        </div>
                        <Lock className="w-5 h-5 text-[#E01E37]" />
                      </div>
                    )}
                    <span className="text-[11px] text-slate-400 font-medium">All government fees included</span>
                  </div>
                </div>

                {/* Lead Unlock Form */}
                {submitted ? (
                  <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-xl p-4 text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                    <div className="font-display font-bold text-sm text-white">Itemized Quote Unlocked</div>
                    <p className="text-[11px] text-slate-300">
                      Detailed itemized tariff memo dispatched to <span className="font-semibold text-white">{email}</span>.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      Unlock Official Itemized Breakdown PDF
                    </div>
                    <div className="space-y-2">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Primary Email Address"
                        className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#E01E37]"
                      />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="WhatsApp / Phone Number"
                        className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#E01E37]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#E01E37] hover:bg-[#b00e2e] text-white font-display font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-lg shadow-[#E01E37]/30 flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <Lock className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>UNLOCK FULL ITEMISED QUOTE</span>
                    </button>
                  </form>
                )}

              </div>
            </div>

          </div>
        ) : (
          /* CORPORATE SETUP CALCULATOR MODE */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Jurisdiction Class */}
            <div className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                <span>PARAMETER 01</span>
                <CalcIcon className="w-4 h-4 text-[#E01E37]" />
              </div>
              <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-1">Jurisdiction Class</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">Select operational domain of structure.</p>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setJurisdiction('mainland')}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start justify-between cursor-pointer ${jurisdiction === 'mainland'
                    ? 'bg-[#E01E37] border-[#E01E37] text-white shadow-md'
                    : 'bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-white/20'
                    }`}
                >
                  <div>
                    <div className="font-display font-bold text-sm">Mainland LLC</div>
                    <div className={`text-[11px] mt-0.5 ${jurisdiction === 'mainland' ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'}`}>
                      100% Foreign Ownership & Local Access
                    </div>
                  </div>
                  {jurisdiction === 'mainland' && <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />}
                </button>

                <button
                  type="button"
                  onClick={() => setJurisdiction('freezone')}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start justify-between cursor-pointer ${jurisdiction === 'freezone'
                    ? 'bg-[#E01E37] border-[#E01E37] text-white shadow-md'
                    : 'bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-white/20'
                    }`}
                >
                  <div>
                    <div className="font-display font-bold text-sm">Free Zone Enterprise</div>
                    <div className={`text-[11px] mt-0.5 ${jurisdiction === 'freezone' ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'}`}>
                      0% Corporate Tax Eligible Structure
                    </div>
                  </div>
                  {jurisdiction === 'freezone' && <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />}
                </button>

                <button
                  type="button"
                  onClick={() => setJurisdiction('difc')}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start justify-between cursor-pointer ${jurisdiction === 'difc'
                    ? 'bg-[#E01E37] border-[#E01E37] text-white shadow-md'
                    : 'bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-white/20'
                    }`}
                >
                  <div>
                    <div className="font-display font-bold text-sm">Offshore / Holding (DIFC)</div>
                    <div className={`text-[11px] mt-0.5 ${jurisdiction === 'difc' ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'}`}>
                      DFSA / ADGM Legal Framework
                    </div>
                  </div>
                  {jurisdiction === 'difc' && <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />}
                </button>
              </div>
            </div>

            {/* Card 2: Visa Quota */}
            <div className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                <span>PARAMETER 02</span>
                <CalcIcon className="w-4 h-4 text-[#E01E37]" />
              </div>
              <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-1">Visa Quota Allocation</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Monthly capacity for executive, investor, and staff.</p>

              <div className="text-center my-6">
                <div className="text-5xl font-display font-extrabold text-[#E01E37] tracking-tight">
                  {visas} <span className="text-2xl font-bold text-slate-800 dark:text-slate-200">Visas</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Investor, Executive & Staff Allocation</div>
              </div>

              <div className="space-y-2 pt-2">
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={visas}
                  onChange={(e) => setVisas(parseInt(e.target.value))}
                  className="w-full accent-[#E01E37] bg-slate-200 dark:bg-white/20 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                  <span>0 (Solo)</span>
                  <span>5 Visas</span>
                  <span>10+ (Enterprise)</span>
                </div>
              </div>
            </div>

            {/* Card 3: License */}
            <div className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                <span>PARAMETER 03</span>
                <CalcIcon className="w-4 h-4 text-[#E01E37]" />
              </div>
              <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-1">Operational License</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Classified according to DET & Free Zone standards.</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Select License Category
                  </label>
                  <div className="relative">
                    <select
                      value={license}
                      onChange={(e) => setLicense(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-medium text-sm rounded-xl p-3.5 pr-10 focus:outline-none focus:border-[#E01E37] appearance-none cursor-pointer"
                    >
                      <option value="tech">IT Equipment & Strategic Advisory Sect 74</option>
                      <option value="trade">Commercial Trade & General Import/Export</option>
                      <option value="finance">Financial Services & Investment Holding</option>
                      <option value="ecom">E-Commerce & Digital Services Platform</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Memo */}
            <div className="md:col-span-3 bg-[#111111] dark:bg-[#141414] border border-white/15 dark:border-white/10 rounded-3xl p-6 lg:p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#E01E37]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Official Corporate Formation Estimate Memo
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded">
                  ESTIMATE ID: UAE-88392
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-2">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                    ESTIMATED TOTAL CAPITAL REQUIREMENT:
                  </div>
                  <div>
                    {unlocked ? (
                      <div className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
                        AED {corporateTotal.toLocaleString()}
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight blur-md select-none">
                          AED 24,900
                        </div>
                        <Lock className="w-5 h-5 text-[#E01E37]" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-xl p-5">
                  {submitted ? (
                    <div className="text-center py-4 space-y-2">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                      <div className="font-display font-bold text-sm text-white">Rate Unlocked & Dossier Sent</div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Business Email"
                          className="bg-black/50 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#E01E37]"
                        />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="WhatsApp / Phone"
                          className="bg-black/50 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#E01E37]"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-[#E01E37] hover:bg-[#b00e2e] text-white font-display font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>UNLOCK CORPORATE BREAKDOWN</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}