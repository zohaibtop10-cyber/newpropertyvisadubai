import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Phone, Navigation, Search, Building2, Stethoscope, ShieldCheck, ExternalLink, CheckCircle } from 'lucide-react';

const LOCATIONS_DATA = [
  {
    id: 'gdrfa-jafiliya',
    name: 'GDRFA Main Customer Happiness Centre - Al Jafiliya',
    city: 'Dubai',
    category: 'Happiness Centre',
    authority: 'GDRFA Dubai',
    address: 'Sheikh Rashid Road, Al Kifaf / Al Jafiliya, Dubai',
    landmark: 'Adjacent to Max Metro Station',
    hours: 'Mon – Thu: 7:30 AM – 3:30 PM | Fri: 7:30 AM – 12:00 PM',
    phone: '+971 800 5111',
    mapUrl: 'https://maps.google.com/?q=GDRFA+Al+Jafiliya+Dubai',
    services: ['Family Visa Approvals', 'Golden Visa Residency Hub', 'Residency Cancellation', 'Entry Permit Printing', 'Legal Status Modification'],
    isVip: true,
    expressAvailable: true
  },
  {
    id: 'dha-[#E01E37]-city',
    name: 'Smart Salem Executive Medical Screening Centre - City Walk',
    city: 'Dubai',
    category: 'Medical Centre',
    authority: 'DHA Dubai',
    address: 'Building 10, City Walk Phase 2, Dubai',
    landmark: 'Near Coca-Cola Arena',
    hours: 'Mon – Fri: 7:00 AM – 10:00 PM | Sun: 8:00 AM – 4:00 PM',
    phone: '+971 4 270 2000',
    mapUrl: 'https://maps.google.com/?q=Smart+Salem+City+Walk+Dubai',
    services: ['30-Minute VIP Medical Fitness Result', 'Blood Test & Digital X-Ray', 'Emirates ID Biometrics On-Site', 'Golden Visa Express VIP Medical'],
    isVip: true,
    expressAvailable: true
  },
  {
    id: 'dha-karama',
    name: 'Al Karama Medical Fitness Centre',
    city: 'Dubai',
    category: 'Medical Centre',
    authority: 'DHA Dubai',
    address: '18th Street, Near Karama Bus Station, Al Karama, Dubai',
    landmark: 'Behind Karama Fish Market',
    hours: 'Mon – Thu: 7:30 AM – 9:30 PM | Fri: 7:30 AM – 12:00 PM',
    phone: '+971 800 342',
    mapUrl: 'https://maps.google.com/?q=Al+Karama+Medical+Fitness+Centre+Dubai',
    services: ['Standard & Express Medical Screening', 'Occupational Health Certificate', 'Blood Screening & Chest X-Ray', 'Typing Desk On-Site'],
    isVip: false,
    expressAvailable: true
  },
  {
    id: 'amer-business-bay',
    name: 'Amer Center Executive - Business Bay',
    city: 'Dubai',
    category: 'Amer Centre',
    authority: 'GDRFA Strategic Partner',
    address: 'Bay Square 11, Ground Floor, Business Bay, Dubai',
    landmark: 'Opposite South Ridge Towers',
    hours: 'Mon – Sat: 8:00 AM – 8:00 PM',
    phone: '+971 4 456 7890',
    mapUrl: 'https://maps.google.com/?q=Amer+Center+Business+Bay+Dubai',
    services: ['Family Visa Application Typing', 'Newborn Visa Processing', 'Maid Visa Sponsorship Setup', 'Emirates ID Typing', 'Passport Fine Clearing'],
    isVip: true,
    expressAvailable: true
  },
  {
    id: 'icp-mushrif-abudhabi',
    name: 'ICP Main Customer Happiness Centre - Al Mushrif',
    city: 'Abu Dhabi',
    category: 'Happiness Centre',
    authority: 'ICP UAE',
    address: 'Al Saada Street, Al Mushrif, Abu Dhabi',
    landmark: 'Near Abu Dhabi Police Headquarters',
    hours: 'Mon – Thu: 7:30 AM – 3:30 PM | Fri: 7:30 AM – 12:00 PM',
    phone: '+971 600 522222',
    mapUrl: 'https://maps.google.com/?q=ICP+Customer+Happiness+Centre+Abu+Dhabi',
    services: ['Golden Visa Nomination Verification', 'Emirates ID Biometrics Capture', 'Abu Dhabi Residency Issuance', 'Dependant Visa Approval'],
    isVip: true,
    expressAvailable: true
  },
  {
    id: 'doh-capital-screening',
    name: 'Capital Health Screening Centre - Al Jazira Club',
    city: 'Abu Dhabi',
    category: 'Medical Centre',
    authority: 'Department of Health (DOH)',
    address: 'Al Jazira Sports Club, Sultan Bin Zayed First Street, Abu Dhabi',
    landmark: 'Inside Al Jazira Club Gate 28',
    hours: 'Sun – Thu: 7:00 AM – 6:00 PM | Sat: 8:00 AM – 2:00 PM',
    phone: '+971 2 499 9000',
    mapUrl: 'https://maps.google.com/?q=Capital+Health+Screening+Centre+Abu+Dhabi',
    services: ['Same-Day Fast-Track Residency Medical', 'VIP Lounge Medical Examination', 'Emirates ID Biometrics Hub', 'Health Insurance Assistance'],
    isVip: true,
    expressAvailable: true
  },
  {
    id: 'icp-sharjah-main',
    name: 'ICP Customer Happiness Centre - Rahmaniya',
    city: 'Sharjah',
    category: 'Happiness Centre',
    authority: 'ICP UAE',
    address: 'Al Rahmaniya 5, Off E88 Road, Sharjah',
    landmark: 'Near Sharjah Airport International Zone',
    hours: 'Mon – Thu: 7:30 AM – 3:30 PM | Fri: 7:30 AM – 12:00 PM',
    phone: '+971 600 522222',
    mapUrl: 'https://maps.google.com/?q=ICP+Customer+Happiness+Centre+Sharjah',
    services: ['Sharjah Dependant Visa Stamping', 'Emirates ID Renewal & Fingerprinting', 'Golden Visa Nomination', 'Status Amendment'],
    isVip: false,
    expressAvailable: true
  },
  {
    id: 'ehs-nasiriya-sharjah',
    name: 'Nasiriya Medical Fitness Centre',
    city: 'Sharjah',
    category: 'Medical Centre',
    authority: 'Emirates Health Services (EHS)',
    address: 'Al Nasiriya Area, Near Sharjah Clock Tower, Sharjah',
    landmark: 'Opposite Al Nasiriya Park',
    hours: 'Mon – Thu: 7:30 AM – 4:00 PM | Fri: 7:30 AM – 12:00 PM',
    phone: '+971 800 8888',
    mapUrl: 'https://maps.google.com/?q=Nasiriya+Medical+Fitness+Centre+Sharjah',
    services: ['Residency Medical Screening', 'Domestic Worker Medical Examination', 'EHS Digital Certificate Issuance'],
    isVip: false,
    expressAvailable: false
  },
  {
    id: 'amer-al-barsha',
    name: 'Amer Center VIP - Al Barsha Mall',
    city: 'Dubai',
    category: 'Amer Centre',
    authority: 'GDRFA Strategic Partner',
    address: 'Ground Floor, Al Barsha Mall, Al Barsha 2, Dubai',
    landmark: 'Main Entrance Gate 3',
    hours: 'Mon – Sat: 8:00 AM – 9:00 PM',
    phone: '+971 4 385 0000',
    mapUrl: 'https://maps.google.com/?q=Amer+Center+Al+Barsha+Mall+Dubai',
    services: ['Spouse & Dependant Visa Filing', 'Parents 1-Year Visa Renewal', 'Overstay Fine Dispute Resolution', 'PRO Concierge Pickup'],
    isVip: true,
    expressAvailable: true
  },
  {
    id: 'dha-muhaisnah',
    name: 'Muhaisnah Medical Fitness Centre',
    city: 'Dubai',
    category: 'Medical Centre',
    authority: 'DHA Dubai',
    address: 'Muhaisnah 2, Sonapur Area, Dubai',
    landmark: 'Near Muhaisnah Bus Depot',
    hours: 'Mon – Fri: 24 Hours Operating',
    phone: '+971 800 342',
    mapUrl: 'https://maps.google.com/?q=Muhaisnah+Medical+Fitness+Centre+Dubai',
    services: ['24/7 Bulk & High-Volume Medical Screening', 'Express 4-Hour Results', 'Domestic Worker Health Check'],
    isVip: false,
    expressAvailable: true
  }
];

export default function LocationsPage({ onOpenCalculator, cmsConfig }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const headline = cmsConfig?.pages?.locations?.headline || "Customer Happiness & Medical Screening Hubs";
  const subtext = cmsConfig?.pages?.locations?.subtext || "Locate approved GDRFA, ICP, and Health Authority centres across Dubai, Abu Dhabi, and Sharjah for fingerprint biometrics and medical fitness tests.";

  const filteredLocations = LOCATIONS_DATA.filter((loc) => {
    const matchesCity = selectedCity === 'All' || loc.city === selectedCity;
    const matchesCategory = selectedCategory === 'All' || loc.category === selectedCategory;
    const matchesQuery = 
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCity && matchesCategory && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-24 space-y-12 relative z-10">
      
      {/* Hero Header */}
      <motion.section
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 15 }}
        className="text-center max-w-3xl mx-auto space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-[#E01E37]/10 text-[#E01E37] border border-[#E01E37]/20">
          <MapPin className="w-4 h-4" />
          <span>UAE GOVERNMENT SERVICE CENTRES DIRECTORY</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {headline}
        </h1>

        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
          {subtext}
        </p>
      </motion.section>

      {/* Filter and Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 80, damping: 15 }}
        className="bg-white dark:bg-[#141414] p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-lg space-y-4"
      >
        <div className="flex flex-col md:flex-row items-center gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by centre name, area (e.g., Business Bay, Al Jafiliya)..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-2xl text-sm font-sans text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#E01E37] transition-colors"
            />
          </div>

          {/* City Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-black/50 p-1.5 rounded-2xl w-full md:w-auto overflow-x-auto">
            {['All', 'Dubai', 'Abu Dhabi', 'Sharjah'].map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCity === city
                    ? 'bg-[#E01E37] text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {city}
              </button>
            ))}
          </div>

        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-white/5">
          <span className="text-xs font-mono font-semibold text-slate-400 uppercase mr-2">Filter Type:</span>
          {[
            { label: 'All Types', value: 'All' },
            { label: 'Customer Happiness', value: 'Happiness Centre' },
            { label: 'Medical Fitness', value: 'Medical Centre' },
            { label: 'Amer Centers', value: 'Amer Centre' },
          ].map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                selectedCategory === cat.value
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent shadow-sm'
                  : 'bg-transparent text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-slate-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Locations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {filteredLocations.map((loc) => (
            <motion.div
              key={loc.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 80, damping: 15 }}
              className="bg-white dark:bg-[#141414] rounded-3xl border border-slate-200 dark:border-white/10 p-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between space-y-6 relative overflow-hidden group"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E01E37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-4">
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                        {loc.city}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#E01E37]/10 text-[#E01E37]">
                        {loc.category}
                      </span>
                      {loc.isVip && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                          VIP Express Hub
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white pt-1">
                      {loc.name}
                    </h3>
                    <p className="text-xs font-mono text-slate-400">
                      Authority: <span className="text-slate-600 dark:text-slate-300 font-semibold">{loc.authority}</span>
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 shrink-0 text-[#E01E37]">
                    {loc.category === 'Medical Centre' ? <Stethoscope className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
                  </div>
                </div>

                {/* Details List */}
                <div className="space-y-2.5 pt-2 text-xs border-t border-slate-100 dark:border-white/5 text-slate-600 dark:text-slate-300">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#E01E37] shrink-0 mt-0.5" />
                    <div>
                      <div>{loc.address}</div>
                      <div className="text-[11px] text-slate-400 italic">Landmark: {loc.landmark}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="font-mono">{loc.hours}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-sky-500 shrink-0" />
                    <span className="font-mono font-semibold">{loc.phone}</span>
                  </div>
                </div>

                {/* Services List */}
                <div className="space-y-1.5 pt-2">
                  <div className="text-[11px] font-mono uppercase font-bold text-slate-400">Services Handled On-Site:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {loc.services.map((serv, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-50 dark:bg-white/5 text-[11px] text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/5">
                        <CheckCircle className="w-3 h-3 text-emerald-500" />
                        {serv}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center gap-3">
                <a
                  href={loc.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 bg-slate-900 dark:bg-white hover:bg-[#E01E37] dark:hover:bg-[#E01E37] text-white dark:text-slate-900 dark:hover:text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Navigation className="w-4 h-4" /> Get Directions
                </a>

                <button
                  onClick={() => onOpenCalculator('spouse')}
                  className="py-2.5 px-4 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-800 dark:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  Book PRO Escort
                </button>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredLocations.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-[#141414] rounded-3xl border border-slate-200 dark:border-white/10 space-y-3">
          <Building2 className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">No Centres Match Your Search</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">Try clearing your search query or selecting "All" cities to view available service centres.</p>
        </div>
      )}

      {/* Concierge Escort Banner */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-[#141414] text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden"
      >
        <div className="space-y-2 max-w-xl z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#E01E37]/20 text-[#E01E37] border border-[#E01E37]/30">
            <ShieldCheck className="w-3.5 h-3.5" /> VIP PRO CONCIERGE ESCORT
          </div>
          <h3 className="font-display font-bold text-2xl">Don't Want to Queue at Government Centres?</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Our licensed Public Relations Officers (PROs) greet you at the entrance, bypass standard lines, and guide your family step-by-step through biometrics and medical tests.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onOpenCalculator('spouse')}
          className="px-6 py-3.5 bg-[#E01E37] hover:bg-[#B81A2C] text-white font-bold text-xs rounded-2xl shadow-xl shadow-[#E01E37]/30 flex items-center gap-2 shrink-0 cursor-pointer z-10"
        >
          Book VIP Escort Package <ExternalLink className="w-4 h-4" />
        </motion.button>
      </motion.div>

    </div>
  );
}
