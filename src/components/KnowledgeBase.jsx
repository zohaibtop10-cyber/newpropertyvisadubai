import React, { useState } from 'react';
import { ChevronDown, MessageSquare, ArrowRight, Clock } from 'lucide-react';

export default function KnowledgeBase() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      question: "What are the fundamental differences between UAE Mainland and Free Zone entities?",
      answer: "Mainland LLCs allow 100% foreign ownership with unrestricted access to conduct business directly anywhere in the local UAE onshore market and bid for government contracts. Free Zone entities offer 0% Corporate Tax eligibility for qualifying income, 100% customs duty exemptions, and streamlined virtual office setups, but require a local service agent or mainland branch for direct onshore commercial operations."
    },
    {
      question: "What is the minimum salary required to sponsor a family visa in the UAE?",
      answer: "To sponsor a spouse and children, the sponsor must earn a minimum salary of AED 4,000 per month (or AED 3,000 plus company-provided accommodation). To sponsor parents together, the minimum salary requirement is AED 10,000 per month along with a 2-bedroom tenancy contract."
    },
    {
      question: "Can family members stay in the UAE while their residence visa is processed?",
      answer: "Yes. If family members are currently inside the UAE on a valid visit or tourist visa, an In-Country Status Change can be processed without requiring them to exit the country."
    },
    {
      question: "How does the 9% Corporate Tax apply to Free Zone companies?",
      answer: "Qualifying Free Zone Entities (QFZE) maintain 0% Corporate Tax on qualifying income derived from transactions with entities located outside the UAE or within Free Zones. Income derived from Mainland UAE commercial activity is taxed at the standard 9% rate."
    },
    {
      question: "What are the qualifying investment criteria for the 10-Year UAE Golden Visa?",
      answer: "The 10-Year Golden Visa is granted to investors maintaining AED 2,000,000+ in public investment funds or real estate capital, as well as senior executives, entrepreneurs, and specialized talents subject to salary thresholds (AED 30,000/mo+) and Ministry of Economy endorsement."
    }
  ];

  const articles = [
    {
      img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
      category: "Corporate Tax & Audit",
      title: "Navigating UAE Corporate Tax 9%: Free Zone & Substance Benchmarks",
      desc: "A technical guide for executive teams on zero-tax qualifying income & mandatory ESR filing.",
      date: "Published January 2026 • 6 min read"
    },
    {
      img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80",
      category: "Family Sponsorship Guide",
      title: "Complete UAE Family Visa Checklist: Step-by-Step Sponsorship Framework",
      desc: "Salary thresholds, MOFA document attestation, medical fitness VIP centers, and Emirates ID typing.",
      date: "Published February 2026 • 5 min read"
    },
    {
      img: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=800&q=80",
      category: "Global Asset Protection",
      title: "OECD Pillar Two Impact: Minimum Effective Tax Architecture",
      desc: "Strategic roadmap for international groups operating within UAE jurisdiction.",
      date: "Published March 2026 • 8 min read"
    }
  ];

  return (
    <section id="knowledge" className="bg-slate-50 dark:bg-[#0A0A0A] text-slate-900 dark:text-white py-20 px-4 sm:px-6 lg:px-8 font-sans border-b border-slate-200 dark:border-white/5 transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Top FAQ Section */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Header Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E01E37]/10 text-[#E01E37] text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#E01E37]" />
                EXECUTIVE KNOWLEDGE BASE
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
                Top Regulatory & Visa Queries Answered
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Clear, authoritative answers regarding capital requirements, corporate tax, family sponsorship, visa quotas, and banking protocols.
              </p>

              {/* Consultation Card */}
              <div className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 p-5 rounded-2xl shadow-sm space-y-3 pt-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#E01E37]">
                  <MessageSquare className="w-4 h-4" />
                  <span>Need Direct Guidance?</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
                  Schedule a confidential 15-minute consultation with a Senior Partner to review your corporate structure or family visa file.
                </p>
                <a 
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white hover:text-[#E01E37] transition-colors"
                >
                  <span>Book Partner Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E01E37]" />
                </a>
              </div>
            </div>

            {/* Right Accordion Column */}
            <div className="lg:col-span-7 space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 font-display font-bold text-slate-900 dark:text-white hover:text-[#E01E37] transition-colors cursor-pointer"
                  >
                    <span className="text-base sm:text-lg">{faq.question}</span>
                    <div className={`w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180 bg-[#E01E37]/10 text-[#E01E37]' : 'text-slate-500 dark:text-slate-400'}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {openFaq === index && (
                    <div className="px-6 pb-6 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-white/5 pt-4 animate-modal-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Policy Briefings Section */}
        <div className="pt-8 border-t border-slate-200 dark:border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E01E37]/10 text-[#E01E37] text-xs font-bold uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-[#E01E37]" />
                TOPICAL REPORTS & POLICY
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
                Executive Policy Briefings & Visa Guides
              </h2>
            </div>
            <a 
              href="#contact" 
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E01E37] hover:text-[#b00e2e] transition-colors uppercase tracking-wider"
            >
              <span>Read Corporate Tax Guide</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* 3 Blog Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {item.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white group-hover:text-[#E01E37] transition-colors line-clamp-2 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0 text-[11px] font-medium text-slate-400 dark:text-slate-500 flex items-center gap-1 border-t border-slate-100 dark:border-white/5 mt-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
