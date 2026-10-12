import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Lock, Mail, ArrowRight, ArrowLeft,
  AlertCircle, Eye, EyeOff, LogIn, Sparkles
} from 'lucide-react';
import { auth } from '../../firebase';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';

export default function AdminLogin({ onLoginSuccess, onExitAdmin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState('login'); // 'login' | 'reset'

  const getFriendlyError = (code) => {
    switch (code) {
      case 'auth/user-not-found':
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please check your credentials.';
      case 'auth/wrong-password':
        return 'Incorrect password. Try again or use "Forgot Password".';
      case 'auth/weak-password':
        return 'Password must be at least 6 characters long.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please wait a moment and try again.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your internet connection.';
      default:
        return 'Authentication failed. Please check your Firebase credentials and try again.';
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); setSuccessMsg(''); setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      setIsLoading(false);
      onLoginSuccess();
    } catch (err) {
      setIsLoading(false);
      setError(getFriendlyError(err.code));
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(''); setSuccessMsg(''); setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setIsLoading(false);
      setSuccessMsg('Password reset email sent! Check your inbox.');
    } catch (err) {
      setIsLoading(false);
      setError(getFriendlyError(err.code));
    }
  };

  const handleSubmit = mode === 'login' ? handleLogin : handleResetPassword;

  const inputCls = "w-full bg-surface/5 border border-white/10 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-white text-sm rounded-[10px] outline-none transition-all placeholder:text-text-muted font-mono py-3 pr-4";

  return (
    <div className="min-h-screen bg-[#07080a] text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">

      {/* ── Ambient Background ───────────────────────── */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[30%] w-[700px] h-[700px] bg-[#D4AF37]/8 rounded-full blur-[180px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-[#996515]/6 rounded-full blur-[160px]" />
        <div className="absolute top-[60%] left-[-5%] w-[400px] h-[400px] bg-[#D4AF37]/4 rounded-full blur-[140px]" />
      </div>

      {/* ── Decorative grid overlay ───────────────────── */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.015]"
        style={{ backgroundImage: 'linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      {/* ── Back button ───────────────────────────────── */}
      <div className="absolute top-6 left-6 z-20">
        <motion.button
          whileHover={{ x: -2 }}
          onClick={onExitAdmin}
          className="flex items-center gap-2 text-xs text-text-muted hover:text-white bg-surface/5 hover:bg-surface/10 border border-white/10 px-4 py-2.5 rounded-[10px] transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Back to Website</span>
        </motion.button>
      </div>

      {/* ── Brand watermark ──────────────────────────── */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]/50" />
        <span className="text-[11px] font-mono text-text-muted uppercase tracking-widest">CMS v2.0</span>
      </div>

      {/* ── Login Card ───────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.97 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="w-full max-w-[420px] relative z-10"
        >
          {/* Gold border glow effect */}
          <div className="absolute -inset-[1px] rounded-[12px] bg-gradient-to-br from-[#D4AF37]/30 via-transparent to-[#996515]/20 pointer-events-none" />

          <div className="relative bg-[#0d0f13]/95 backdrop-blur-2xl rounded-[12px] shadow-2xl shadow-black/60 overflow-hidden">

            {/* Top accent line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

            <div className="p-8">
              {/* ── Header ───────────────────────────────── */}
              <div className="text-center space-y-3 mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-[12px] bg-gradient-to-br from-[#4A3000] via-[#8C5E00] to-[#D4AF37] p-[1.5px] shadow-[0_0_30px_rgba(212,175,55,0.25)]">
                  <div className="w-full h-full bg-[#0d0f13] rounded-[10px] flex items-center justify-center">
                    <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                </div>
                <div>
                  <h1 className="font-bold text-xl text-white tracking-tight">
                    {mode === 'login' && 'Admin Sign In'}
                    {mode === 'reset' && 'Reset Password'}
                  </h1>
                  <p className="text-text-muted text-xs mt-1 leading-relaxed">
                    {mode === 'login' && 'Authorized Firebase CMS credentials only'}
                    {mode === 'reset' && 'Enter registered email to receive a password reset link'}
                  </p>
                </div>
              </div>

              {/* ── Alerts ───────────────────────────────── */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-5 p-3.5 rounded-[10px] bg-red-500/8 border border-red-500/25 flex items-start gap-2.5 text-red-400 text-xs"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </motion.div>
                )}
                {successMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-5 p-3.5 rounded-[10px] bg-emerald-500/8 border border-emerald-500/25 flex items-start gap-2.5 text-emerald-400 text-xs"
                  >
                    <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{successMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Form ─────────────────────────────────── */}
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Email */}
                <div>
                  <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                    <input
                      type="email" required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="admin@propertyvisadubai.ae"
                      className={`${inputCls} pl-10`}
                    />
                  </div>
                </div>

                {/* Password */}
                {mode !== 'reset' && (
                  <div>
                    <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                      <input
                        type={showPassword ? 'text' : 'password'} required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="••••••••"
                        minLength={6}
                        className={`${inputCls} pl-10 pr-11`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-slate-300 cursor-pointer transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Forgot password */}
                {mode === 'login' && (
                  <div className="text-right">
                    <button type="button" onClick={() => { setMode('reset'); setError(''); setSuccessMsg(''); }}
                      className="text-[11px] text-[#D4AF37] hover:text-[#FFE58F] transition-colors cursor-pointer font-semibold"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                {/* Submit */}
                <motion.button
                  whileHover={{ scale: 1.015, brightness: 1.05 }}
                  whileTap={{ scale: 0.985 }}
                  disabled={isLoading}
                  type="submit"
                  className="w-full mt-1 bg-gradient-to-r from-[#C59B27] via-[#D4AF37] to-[#C9A227] text-black py-3.5 px-6 rounded-[10px] font-extrabold text-sm transition-all shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_6px_28px_rgba(212,175,55,0.45)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                        <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      Authenticating...
                    </span>
                  ) : (
                    <>
                      {mode === 'login' && <><LogIn className="w-4 h-4" /><span>Sign In to CMS</span></>}
                      {mode === 'reset' && <><Mail className="w-4 h-4" /><span>Send Reset Link</span></>}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* ── Footer ─────────────────────────── */}
              <div className="mt-6 pt-5 border-t border-white/6 text-center space-y-2.5">
                {mode === 'reset' && (
                  <p className="text-xs text-text-muted">
                    Remembered your credentials?{' '}
                    <button onClick={() => { setMode('login'); setError(''); setSuccessMsg(''); }}
                      className="text-[#D4AF37] hover:text-[#FFE58F] font-bold cursor-pointer transition-colors">
                      Back to Sign In
                    </button>
                  </p>
                )}
                {mode === 'login' && (
                  <p className="text-[11px] text-text-muted">
                    Authorized access only. Account creation from public login is disabled.
                  </p>
                )}
                <p className="text-[10px] text-text font-mono">
                  🔒 Firebase Auth • 256-bit SSL • Encrypted
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
