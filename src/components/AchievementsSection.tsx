import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Medal, Star, Crown, TrendingUp, CheckCircle, ShieldCheck } from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto overflow-hidden">
      
      {/* Ambient Golden Radial Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-400/20 via-yellow-300/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Top Header matching Image 2 */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/15 via-yellow-400/20 to-amber-500/15 border border-[#D4AF37]/40 text-[#D4AF37] dark:text-amber-300 px-4 py-1.5 rounded-[8px] text-xs font-black tracking-widest uppercase shadow-sm mb-4">
          <Trophy className="w-4 h-4 text-[#D4AF37]" />
          Award & Achievement
        </span>
        <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          Achieving <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-[#D4AF37] to-yellow-500">Greatness</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Recognized as Dubai's premier corporate visa advisory firm with zero-friction approval records and government excellence certifications.
        </p>
      </div>

      {/* Main Grid matching Image 2 Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Hero Card: Big Golden Trophy Graphic matching Image 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 bg-gradient-to-b from-amber-50/90 via-yellow-50/50 to-white dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 rounded-[12px] p-8 sm:p-12 border-2 border-[#D4AF37]/30 shadow-[0_20px_60px_rgba(212,175,55,0.15)] relative overflow-hidden flex flex-col justify-between min-h-[460px]"
        >
          {/* Decorative Corner Badge */}
          <div className="absolute top-6 right-6 bg-[#D4AF37] text-slate-950 font-black text-xs px-3.5 py-1 rounded-[8px] uppercase tracking-wider shadow-md">
            2025/2026 Winner
          </div>

          <div>
            <span className="text-xs font-black tracking-wider text-amber-600 dark:text-amber-400 uppercase font-mono mb-2 block">
              UAE MINISTRY OF ECONOMY RECOGNITION
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
              Top Corporate Advisory Firm in the GCC
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              Awarded for highest SLA precision in Golden Visa processing, direct ICP system integration, and zero operational delays.
            </p>
          </div>

          {/* 3D Golden Trophy Center Image/Graphic */}
          <div className="relative my-4 flex items-center justify-center">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 p-1 shadow-[0_0_50px_rgba(212,175,55,0.6)] flex items-center justify-center border-4 border-white dark:border-slate-800">
              <div className="w-full h-full rounded-full bg-gradient-to-b from-amber-500 to-yellow-600 flex flex-col items-center justify-center text-slate-950 p-4">
                <Trophy className="w-16 h-16 text-white drop-shadow-md animate-bounce" />
                <span className="text-xs font-black uppercase text-white mt-1 font-mono">GOLD AWARD</span>
              </div>
            </div>

            {/* Orbital Badge Pills matching Image 2 */}
            <div className="absolute -left-2 top-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-1.5 rounded-[10px] shadow-xl border border-amber-300 text-xs font-bold flex items-center gap-1.5">
              <Crown className="w-4 h-4 text-amber-500" />
              <span>#1 Visa Advisor</span>
            </div>
            <div className="absolute -right-2 bottom-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-1.5 rounded-[10px] shadow-xl border border-amber-300 text-xs font-bold flex items-center gap-1.5">
              <Medal className="w-4 h-4 text-amber-500" />
              <span>DLD Certified</span>
            </div>
          </div>

          {/* Bottom Footer Stat Pill */}
          <div className="mt-6 pt-6 border-t border-amber-200/60 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">Certified Government PRO Group</span>
            <span className="font-mono font-black text-amber-600 dark:text-amber-400">GDRFA Partner #4802</span>
          </div>
        </motion.div>

        {/* Right Stack of Achievement Cards matching Image 2 */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Achievement Card 1 */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-[12px] border border-amber-200/80 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all group"
          >
            <div className="w-12 h-12 rounded-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F7DE9C] via-[#EFC45C] to-[#C99824] font-mono mb-1">
              AED 2.4B+
            </div>
            <h4 className="font-bold text-base text-slate-900 dark:text-white mb-2">Real Estate Volume</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Total property value mapped and processed for 10-Year DLD Golden Visas.
            </p>
          </motion.div>

          {/* Achievement Card 2 */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-[12px] border border-amber-200/80 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all group"
          >
            <div className="w-12 h-12 rounded-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F7DE9C] via-[#EFC45C] to-[#C99824] font-mono mb-1">
              15,000+
            </div>
            <h4 className="font-bold text-base text-slate-900 dark:text-white mb-2">Visas Issued</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Successfully issued Golden, Investor & Family residency permits across Dubai & Abu Dhabi.
            </p>
          </motion.div>

          {/* Achievement Card 3 */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-[12px] border border-amber-200/80 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all group"
          >
            <div className="w-12 h-12 rounded-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F7DE9C] via-[#EFC45C] to-[#C99824] font-mono mb-1">
              99.8%
            </div>
            <h4 className="font-bold text-base text-slate-900 dark:text-white mb-2">Approval Rate</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Industry-leading success rate guaranteed by pre-submission audit protocols.
            </p>
          </motion.div>

          {/* Achievement Card 4 */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-[12px] border border-amber-200/80 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all group"
          >
            <div className="w-12 h-12 rounded-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F7DE9C] via-[#EFC45C] to-[#C99824] font-mono mb-1">
              48-Hour
            </div>
            <h4 className="font-bold text-base text-slate-900 dark:text-white mb-2">VIP SLA Speed</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Express chaperoned biometrics, medical fitness, and digital Emirates ID printing.
            </p>
          </motion.div>

        </div>

      </div>

    </section>
  );
};

export default AchievementsSection;
