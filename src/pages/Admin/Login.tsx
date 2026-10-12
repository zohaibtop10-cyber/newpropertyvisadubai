import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { ShieldCheck, Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';

export interface AdminLoginProps {
  onLoginSuccess?: () => void;
  onNavigateHome?: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  onNavigateHome,
}) => {
  const { refreshRole } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both email address and password.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      await refreshRole();

      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (err: any) {
      console.error('Admin Sign-In Error:', err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setErrorMsg('Invalid staff credentials. Please check email and password.');
      } else {
        setErrorMsg(err.message || 'Authentication failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text flex items-center justify-center px-4 font-sans">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-lg bg-gold flex items-center justify-center text-bg mx-auto mb-3">
            <ShieldCheck className="w-7 h-7 text-bg" />
          </div>
          <span className="text-xs font-mono font-bold text-gold uppercase tracking-wider">
            Licensed Consultancy Staff Portal
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-text mt-1">
            Admin CMS Login
          </h1>
          <p className="text-xs text-text-muted mt-1">
            Sign in with authorized staff credentials (Admin / Editor / Sales).
          </p>
        </div>

        <Card variant="content" className="p-8 border border-gold/30 shadow-xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-mono font-semibold uppercase text-text">
                Staff Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-text-muted absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="admin@clientdomain.ae"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-md border border-border-hairline bg-bg text-sm text-text focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-semibold uppercase text-text">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-text-muted absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-md border border-border-hairline bg-bg text-sm text-text focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded border border-red-500/30 bg-red-500/10 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <Button
              variant="primary"
              size="md"
              type="submit"
              className="w-full"
              disabled={isSubmitting}
              icon={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : undefined}
            >
              {isSubmitting ? 'Authenticating...' : 'Sign In to CMS Portal'}
            </Button>
          </form>

          <div className="pt-4 border-t border-border-hairline text-center">
            <button
              type="button"
              onClick={() => {
                if (onNavigateHome) onNavigateHome();
                else window.location.href = '/';
              }}
              className="text-xs text-text-muted hover:text-gold transition-colors"
            >
              &larr; Return to Public Marketing Site
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
