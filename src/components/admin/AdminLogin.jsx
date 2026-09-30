import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Mail, ArrowRight, ArrowLeft, AlertCircle, Eye, EyeOff, UserPlus, LogIn } from 'lucide-react';
import { auth } from '../../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';

export default function AdminLogin({ onLoginSuccess, onExitAdmin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState('login'); // 'login' | 'register' | 'reset'

  const getFriendlyError = (code) => {
    switch (code) {
      case 'auth/user-not-found':
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please check your credentials and try again.';
      case 'auth/wrong-password':
        return 'Incorrect password. Try again or use "Forgot Password" to reset.';
      case 'auth/email-already-in-use':
        return 'This email is already registered. Please sign in instead.';
      case 'auth/weak-password':
        return 'Password must be at least 6 characters long.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please wait a moment and try again.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your internet connection.';
      default:
        return 'Authentication failed. Please try again.';
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      setIsLoading(false);
      onLoginSuccess();
    } catch (err) {
      console.error("Login Error: ", err);
      setIsLoading(false);
      setError(getFriendlyError(err.code) + ' (' + err.message + ')');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsLoading(true);

    if (password.length < 6) {
      setIsLoading(false);
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      setIsLoading(false);
      onLoginSuccess();
    } catch (err) {
      setIsLoading(false);
      setError(getFriendlyError(err.code));
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsLoading(true);

    try {
      await sendPasswordResetEmail(auth, email.trim());
      setIsLoading(false);
      setSuccessMsg('Password reset email sent! Check your inbox.');
    } catch (err) {
      setIsLoading(false);
      setError(getFriendlyError(err.code));
    }
  };

  const handleSubmit = mode === 'login' ? handleLogin : mode === 'register' ? handleRegister : handleResetPassword;

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans selection:bg-brand-primary selection:text-white">
      {/* Background Ambient Glows */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed bottom-0 right-10 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Bar Exit Link */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={onExitAdmin}
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-white bg-brand-surfaceLight/80 hover:bg-slate-800 border border-slate-800 px-4 py-2 rounded-xl transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-brand-primary" />
          <span>Back to Website</span>
        </button>
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-brand-surfaceLight/90 border border-slate-800 backdrop-blur-2xl p-8 rounded-xl shadow-2xl shadow-black/80 relative z-10"
      >
        {/* Header Branding */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex w-14 h-14 rounded-xl bg-gradient-to-br from-[#D4AF37] via-[#996515] to-[#D4AF37] p-0.5 shadow-xl shadow-[#D4AF37]/30 mb-2">
            <div className="w-full h-full bg-[#121417] rounded-[14px] flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-brand-primary" />
            </div>
          </div>
          <h1 className="font-display font-extrabold text-2xl text-white tracking-tight">
            {mode === 'login' && 'Admin Portal Sign In'}
            {mode === 'register' && 'Create Admin Account'}
            {mode === 'reset' && 'Reset Password'}
          </h1>
          <p className="text-slate-400 text-xs leading-relaxed">
            {mode === 'login' && 'Firebase-secured admin access. Enter your credentials to manage website content.'}
            {mode === 'register' && 'Register a new admin account. This will be authenticated via Firebase.'}
            {mode === 'reset' && 'Enter your email address and we\'ll send you a password reset link.'}
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

        {/* Success Alert */}
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3 text-emerald-400 text-xs"
          >
            <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-content-muted">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@propertyvisadubai.ae"
                className="w-full bg-brand-darkBg/80 border border-slate-800 focus:border-brand-primary focus:ring-1 focus:ring-[#D4AF37] text-white text-sm rounded-xl pl-10 pr-4 py-3 outline-none transition-all placeholder:text-content-muted font-mono"
              />
            </div>
          </div>

          {mode !== 'reset' && (
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-content-muted">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  minLength={6}
                  className="w-full bg-brand-darkBg/80 border border-slate-800 focus:border-brand-primary focus:ring-1 focus:ring-[#D4AF37] text-white text-sm rounded-xl pl-10 pr-10 py-3 outline-none transition-all placeholder:text-content-muted font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-content-muted hover:text-slate-300 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* Forgot password link (login mode only) */}
          {mode === 'login' && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => { setMode('reset'); setError(''); setSuccessMsg(''); }}
                className="text-xs text-brand-primary hover:text-brand-goldLight transition-colors cursor-pointer font-semibold"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            disabled={isLoading}
            type="submit"
            className="w-full mt-2 bg-gradient-to-r from-[#D4AF37] to-[#996515] hover:from-[#E5C158] hover:to-[#A67822] text-white py-3.5 px-6 rounded-xl font-bold text-sm transition-all shadow-lg shadow-[#D4AF37]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-25" /><path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
                Authenticating...
              </span>
            ) : (
              <>
                {mode === 'login' && <><LogIn className="w-4 h-4" /><span>Sign In to Admin CMS</span></>}
                {mode === 'register' && <><UserPlus className="w-4 h-4" /><span>Create Admin Account</span></>}
                {mode === 'reset' && <><Mail className="w-4 h-4" /><span>Send Reset Link</span></>}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </form>

        {/* Mode Switcher */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 text-center space-y-3">
          {mode === 'login' && (
            <p className="text-xs text-slate-400">
              Don't have an admin account?{' '}
              <button
                onClick={() => { setMode('register'); setError(''); setSuccessMsg(''); }}
                className="text-brand-primary hover:text-brand-goldLight font-bold cursor-pointer transition-colors"
              >
                Register here
              </button>
            </p>
          )}
          {(mode === 'register' || mode === 'reset') && (
            <p className="text-xs text-slate-400">
              Already have an account?{' '}
              <button
                onClick={() => { setMode('login'); setError(''); setSuccessMsg(''); }}
                className="text-brand-primary hover:text-brand-goldLight font-bold cursor-pointer transition-colors"
              >
                Sign in
              </button>
            </p>
          )}
          <p className="text-[11px] text-content-muted">
            Secured by Firebase Authentication • 256-bit SSL Encryption
          </p>
        </div>
      </motion.div>
    </div>
  );
}
