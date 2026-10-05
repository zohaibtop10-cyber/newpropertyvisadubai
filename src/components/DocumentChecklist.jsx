import React from 'react';
import { motion } from 'framer-motion';
import { FileCheck, Sparkles, MessageSquare, Upload, CheckCircle2 } from 'lucide-react';

const DEFAULT_DOCUMENTS = [
  { title: "Passport Copy (6+ Months Validity)", status: "Pre-Audited" },
  { title: "Title Deed or Property Valuation (DLD)", status: "Verified" },
  { title: "Attested Marriage Certificate (MOFA)", status: "Legalized" },
  { title: "Attested Birth Certificate for Children", status: "Legalized" },
  { title: "Ejari Residential Tenancy Contract", status: "Required" },
  { title: "Digital Passport Photograph (White BG)", status: "Standard" },
  { title: "Current UAE Visa or Entry Stamp Copy", status: "Filing Ready" },
  { title: "DHA / DOH Health Insurance Policy", status: "Required" }
];

export default function DocumentChecklist({
  eyebrow = "Required Documentation",
  title = "Document Concierge Checklist",
  subtitle = "Our accredited PRO council performs a complimentary pre-audit on all documents prior to government submission.",
  documents = DEFAULT_DOCUMENTS
}) {
  const handleWhatsAppAudit = () => {
    window.open('https://wa.me/971501234567?text=Hello%20Brightlink%21%20I%20would%20like%20to%20request%20a%20document%20pre-audit.', '_blank');
  };

  return (
    <section className="bg-[#050505] py-16 lg:py-24 font-sans text-white border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[10px] bg-[#8C5E00]/15 border border-[#8C5E00]/30 text-[#FFE58F] text-xs font-mono font-bold uppercase tracking-widest"
          >
            <FileCheck className="w-3.5 h-3.5 text-[#FFE58F]" />
            <span>{eyebrow}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight font-sans tracking-tight"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base font-medium leading-relaxed"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {documents.map((doc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-[#0A0A0A] border border-white/5 rounded-[10px] p-4 sm:p-5 flex items-center justify-between group hover:bg-white/[0.02] hover:border-white/10 transition-colors"
            >
              <div className="flex items-center gap-3 pr-3">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-slate-200 group-hover:text-white leading-snug font-sans">
                  {doc.title}
                </span>
              </div>

              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-mono font-bold shrink-0">
                {doc.status || "Pre-Audited"}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom Upload CTA Banner */}
        <div className="bg-[#0A0A0A] border border-[#8C5E00]/30 rounded-[10px] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#FFE58F]">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Free PRO Document Pre-Audit</span>
            </div>
            <h4 className="text-lg font-bold text-white font-sans">
              Need Help Verifying or Legalizing Your Attestation?
            </h4>
            <p className="text-xs text-slate-400 font-sans max-w-xl">
              Send your Ejari, salary certificate, or marriage certificate scans via WhatsApp. Our PRO desk verifies eligibility & attestation compliance in under 15 minutes.
            </p>
          </div>

          <button
            onClick={handleWhatsAppAudit}
            className="px-6 py-3.5 rounded-[10px] bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider font-mono shadow-md transition-all shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 fill-white text-white" />
            <span>WhatsApp Instant Pre-Audit →</span>
          </button>
        </div>

      </div>
    </section>
  );
}
