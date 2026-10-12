import React from 'react';
import { useAuth, UserRole } from '../context/AuthContext';
import { Card } from './Card';
import { Button } from './Button';
import { ShieldAlert, Lock, ArrowLeft } from 'lucide-react';

export interface RequireRoleProps {
  roles: UserRole[];
  children: React.ReactNode;
  onNavigate?: (route: string) => void;
}

export const RequireRole: React.FC<RequireRoleProps> = ({
  roles,
  children,
  onNavigate,
}) => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-bg text-text flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
          <span className="text-xs font-mono text-text-muted">Authenticating Staff Credentials...</span>
        </div>
      </div>
    );
  }

  // 1. Unauthenticated -> Login Screen
  if (!user) {
    return (
      <div className="min-h-screen bg-bg text-text flex items-center justify-center px-4 font-sans">
        <Card variant="content" className="max-w-md w-full text-center p-8 space-y-4 border border-gold/30">
          <Lock className="w-12 h-12 text-gold mx-auto" />
          <h2 className="text-xl font-bold text-text">Authentication Required</h2>
          <p className="text-xs text-text-muted">
            Please log in with your staff account to access the administrative CMS portal.
          </p>
          <Button
            variant="primary"
            size="md"
            className="w-full"
            onClick={() => {
              if (onNavigate) onNavigate('admin-login');
              else window.location.href = '/admin/login';
            }}
          >
            Go to Admin Login &rarr;
          </Button>
        </Card>
      </div>
    );
  }

  // 2. Authenticated but Wrong Role -> Access Denied Screen
  const hasPermission = role ? roles.includes(role) : false;
  if (!hasPermission) {
    return (
      <div className="min-h-screen bg-bg text-text flex items-center justify-center px-4">
        <Card variant="content" className="max-w-md w-full text-center p-8 space-y-4 border border-red-500/30">
          <ShieldAlert className="w-12 h-12 text-red-500 mx-auto" />
          <h2 className="text-xl font-bold text-text">Access Denied (403)</h2>
          <p className="text-xs text-text-muted leading-relaxed">
            Your role (<span className="font-mono text-gold font-bold uppercase">{role || 'unassigned'}</span>) does not have authorization to view this module. Permitted roles: {roles.map(r => r?.toUpperCase()).join(', ')}.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <Button
              variant="secondary"
              size="md"
              className="w-full"
              icon={<ArrowLeft className="w-4 h-4" />}
              onClick={() => {
                if (onNavigate) onNavigate('/admin');
                else window.location.href = '/admin';
              }}
            >
              Return to Staff Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // 3. Authorized -> Render Children
  return <>{children}</>;
};

export default RequireRole;
