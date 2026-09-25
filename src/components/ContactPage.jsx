import React, { useState } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { Phone, Mail, MapPin, Clock, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';
import { siteConfig } from '../data/cmsData';

export default function ContactPage({ cmsConfig }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const headline = cmsConfig?.pages?.contact?.headline || "Get in Touch with Family Visa Specialists";
  const subtext = cmsConfig?.pages?.contact?.subtext || "Connect directly on WhatsApp or visit our Dubai advisory desk at Business Village.";
  const address = cmsConfig?.pages?.contact?.address || siteConfig.address;
  const phoneNo = cmsConfig?.pages?.contact?.phone || siteConfig.phone;
  const email = cmsConfig?.pages?.contact?.email || siteConfig.email;
  const hours = cmsConfig?.pages?.contact?.hours || siteConfig.officeHours;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-24 space-y-16">
      
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-[#E01E37]/10 text-[#E01E37] border border-[#E01E37]/20">
          <Phone className="w-3.5 h-3.5" />
          <span>CONTACT ADVISORY DESK</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {headline}
        </h1>

        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
          {subtext}
        </p>
      </section>

      {/* Main Grid: Left Details, Right Form */}
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Contact Details (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-7 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 space-y-6 shadow-sm">
            <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white">
              Executive HQ & Contact Channels
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                <MapPin className="w-5 h-5 text-[#E01E37] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white text-sm">Physical Office Address</div>
                  <div className="text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    {address}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                <Phone className="w-5 h-5 text-[#E01E37] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white text-sm">Direct Phone Line</div>
                  <a href={`tel:${phoneNo}`} className="text-[#E01E37] font-mono hover:underline">
                    {phoneNo}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                <WhatsAppIcon className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white text-sm">WhatsApp Direct Desk</div>
                  <a
                    href={`https://wa.me/${cmsConfig?.global?.whatsappRaw || siteConfig.whatsappRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-500 font-mono hover:underline font-semibold"
                  >
                    {siteConfig.whatsapp} (Instant Response)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                <Mail className="w-5 h-5 text-[#E01E37] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white text-sm">Email Support</div>
                  <span className="text-slate-500 dark:text-slate-400">{email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                <Clock className="w-5 h-5 text-[#E01E37] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white text-sm">Working Hours</div>
                  <span className="text-slate-500 dark:text-slate-400">{hours}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-2 text-xs">
            <div className="font-semibold flex items-center gap-2 text-[#E01E37]">
              <ShieldCheck className="w-4 h-4" />
              <span>Operator & Licensing Details</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              FamilyVisa.ae is operated by <strong>{siteConfig.operatorName}</strong>, registered in Dubai, UAE for document clearing services.
            </p>
          </div>

        </div>

        {/* Right Column: Contact Enquiry Form (7 Columns) */}
        <div className="lg:col-span-7">
          <div className="p-8 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 shadow-xl space-y-6">
            <div>
              <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
                Send an Online Message
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                A Senior Dependant Specialist will reply within 15 minutes.
              </p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-white/10 focus:border-[#E01E37] rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">WhatsApp / Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+971 50 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-white/10 focus:border-[#E01E37] rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">How can we assist you?</label>
                  <textarea
                    rows={4}
                    placeholder="E.g. Sponsoring spouse and 2 children, salary threshold questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-white/10 focus:border-[#E01E37] rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-[#E01E37] hover:bg-[#b50e2f] text-white py-3.5 rounded-xl font-semibold text-xs transition-all shadow-md shadow-[#E01E37]/30 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Send Enquiry to Advisory Desk</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="font-display font-semibold text-base text-slate-900 dark:text-white">
                  Message Sent Successfully!
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Thank you for reaching out. A Senior Dependant Specialist from 800 DOCS LLC SOC will contact you on WhatsApp shortly.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
