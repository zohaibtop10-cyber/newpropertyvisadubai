import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Mail, ArrowRight, ArrowLeft, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess, onExitAdmin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const normalizedEmail = email.trim().toLowerCase();
      // Allow exact specified credentials: consulatancy@business.com & Password (also allowing consultancy@business.com as common typo)
      if (
        (normalizedEmail === 'consulatancy@business.com' || normalizedEmail === 'consultancy@business.com') &&
        password === 'Password'
      ) {
        setIsLoading(false);
        onLoginSuccess();
      } else {
        setIsLoading(false);
        setError('Invalid admin credentials. Please enter authorized email and password.');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans selection:bg-[#E01E37] selection:text-white">
      {/* Background Ambient Glows */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#E01E37]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed bottom-0 right-10 w-[400px] h-[400px] bg-[#E01E37]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Bar Exit Link */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={onExitAdmin}
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 px-4 py-2 rounded-xl transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#E01E37]" />
          <span>Back to Website</span>
        </button>
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-slate-900/90 border border-slate-800 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl shadow-black/80 relative z-10"
      >
        {/* Header Branding */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E01E37] via-[#B81A2C] to-[#8B0A1E] p-0.5 shadow-xl shadow-[#E01E37]/30 mb-2">
            <div className="w-full h-full bg-[#121417] rounded-[14px] flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-[#E01E37]" />
            </div>
          </div>
          <h1 className="font-display font-extrabold text-2xl text-white tracking-tight">
            Enterprise CMS Admin Portal
          </h1>
          <p className="text-slate-400 text-xs leading-relaxed">
            Authorized staff access only. Enter your credentials to manage website content, tariffs, and dossier CRM.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-400 text-xs"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
              Admin Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="consulatancy@business.com"
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-[#E01E37] focus:ring-1 focus:ring-[#E01E37] text-white text-sm rounded-xl pl-10 pr-4 py-3 outline-none transition-all placeholder:text-slate-600 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-[#E01E37] focus:ring-1 focus:ring-[#E01E37] text-white text-sm rounded-xl pl-10 pr-10 py-3 outline-none transition-all placeholder:text-slate-600 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            disabled={isLoading}
            type="submit"
            className="w-full mt-2 bg-gradient-to-r from-[#E01E37] to-[#B81A2C] hover:from-[#C8102E] hover:to-[#8B0A1E] text-white py-3.5 px-6 rounded-xl font-bold text-sm transition-all shadow-lg shadow-[#E01E37]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Admin CMS</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </form>

        {/* Footer info */}
        <div className="mt-8 pt-5 border-t border-slate-800/80 text-center">
          <p className="text-[11px] text-slate-500">
            Protected by 256-bit SSL Encryption • EmiratesPrime Security Gateway
          </p>
        </div>
      </motion.div>
    </div>
  );
}
