import React, { useState, useEffect } from 'react';
import { useAuth, UserRole } from '../../context/AuthContext';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { LeadDoc, leadConverter } from '../../lib/converters';
import { LeadsKanban } from '../../features/admin/LeadsKanban';
import { ContentModuleCrud } from '../../features/admin/ContentModuleCrud';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Newspaper,
  HelpCircle,
  MessageSquareQuote,
  UserCheck,
  Settings,
  LogOut,
  ShieldCheck,
  Search,
  CheckCircle2,
  Clock,
  ChevronRight,
} from 'lucide-react';

export interface AdminDashboardProps {
  onNavigateHome?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateHome }) => {
  const { user, role, logout } = useAuth();

  const [activeModule, setActiveModule] = useState<string>('dashboard');
  const [recentLeads, setRecentLeads] = useState<LeadDoc[]>([]);
  const [leadStats, setLeadStats] = useState({
    new: 0,
    contacted: 0,
    qualified: 0,
    closed: 0,
    total: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch leads and compute status counts
  useEffect(() => {
    async function fetchLeadsData() {
      try {
        const ref = collection(db, 'leads').withConverter(leadConverter);
        const q = query(ref, orderBy('createdAt', 'desc'), limit(50));
        const snap = await getDocs(q);
        const docs = snap.docs.map((d) => d.data());

        setRecentLeads(docs.slice(0, 10));

        const stats = { new: 0, contacted: 0, qualified: 0, closed: 0, total: docs.length };
        docs.forEach((l) => {
          if (l.status === 'New') stats.new++;
          else if (l.status === 'Contacted') stats.contacted++;
          else if (l.status === 'Qualified') stats.qualified++;
          else if (l.status === 'Closed') stats.closed++;
        });
        setLeadStats(stats);
      } catch (err) {
        console.warn('Leads fetch error in Admin Dashboard:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchLeadsData();
  }, []);

  // Define sidebar navigation items with role gating rules
  const sidebarItems: { id: string; label: string; icon: any; allowedRoles: UserRole[] }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, allowedRoles: ['admin', 'editor', 'sales'] },
    { id: 'leads', label: 'Leads Pipeline', icon: Users, allowedRoles: ['admin', 'sales'] },
    { id: 'services', label: 'Services CMS', icon: Briefcase, allowedRoles: ['admin', 'editor'] },
    { id: 'pages', label: 'Pages & Sections', icon: FileText, allowedRoles: ['admin', 'editor'] },
    { id: 'blog', label: 'Blog & Articles', icon: Newspaper, allowedRoles: ['admin', 'editor'] },
    { id: 'faqs', label: 'FAQs CMS', icon: HelpCircle, allowedRoles: ['admin', 'editor'] },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote, allowedRoles: ['admin', 'editor'] },
    { id: 'team', label: 'Team Members', icon: UserCheck, allowedRoles: ['admin', 'editor'] },
    { id: 'settings', label: 'Site Settings', icon: Settings, allowedRoles: ['admin'] },
  ];

  // Filter sidebar menu items by current user role
  const visibleSidebarItems = sidebarItems.filter((item) =>
    role ? item.allowedRoles.includes(role) : false
  );

  return (
    <div className="min-h-screen bg-bg text-text flex font-sans">
      {/* Left Sidebar */}
      <aside className="w-64 border-r border-border-hairline bg-surface flex flex-col justify-between p-4 shrink-0">
        <div className="space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-2 px-2 pt-2">
            <div className="w-8 h-8 rounded bg-gold flex items-center justify-center text-bg font-bold">
              <ShieldCheck className="w-5 h-5 text-bg" />
            </div>
            <div>
              <span className="font-bold text-sm text-text block leading-tight">Admin CMS</span>
              <span className="text-[10px] font-mono text-gold uppercase tracking-wider block">
                Role: {role || 'unassigned'}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {visibleSidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveModule(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-gold text-bg font-bold'
                      : 'text-text-muted hover:text-text hover:bg-bg/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Info & Logout */}
        <div className="border-t border-border-hairline pt-4 space-y-3 px-2">
          <div className="text-xs">
            <div className="font-bold text-text truncate">{user?.email || 'Staff User'}</div>
            <div className="text-[10px] font-mono text-gold uppercase mt-0.5">
              Claims Role: {role || 'none'}
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="w-full justify-start text-xs"
            icon={<LogOut className="w-3.5 h-3.5 text-text-muted" />}
            onClick={() => logout()}
          >
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto max-w-[1200px]">
        {/* Header Bar */}
        <header className="flex items-center justify-between pb-6 border-b border-border-hairline mb-8">
          <div>
            <span className="text-xs font-mono font-bold text-gold uppercase tracking-wider">
              Management Portal
            </span>
            <h1 className="text-2xl font-bold text-text mt-0.5 capitalize">
              {activeModule === 'dashboard' ? 'Overview Dashboard' : `${activeModule} Module`}
            </h1>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              if (onNavigateHome) onNavigateHome();
              else window.location.href = '/';
            }}
          >
            &larr; View Public Site
          </Button>
        </header>

        {/* Dashboard Home View */}
        {activeModule === 'dashboard' && (
          <div className="space-y-8">
            {/* Stat Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card variant="content">
                <span className="text-xs font-mono font-bold uppercase text-gold">New Submissions</span>
                <div className="text-3xl font-bold font-mono text-text mt-2">{leadStats.new}</div>
                <span className="text-[11px] text-text-muted mt-1 block">Awaiting sales outreach</span>
              </Card>

              <Card variant="content">
                <span className="text-xs font-mono font-bold uppercase text-gold">Contacted</span>
                <div className="text-3xl font-bold font-mono text-text mt-2">{leadStats.contacted}</div>
                <span className="text-[11px] text-text-muted mt-1 block">In conversation</span>
              </Card>

              <Card variant="content">
                <span className="text-xs font-mono font-bold uppercase text-gold">Qualified</span>
                <div className="text-3xl font-bold font-mono text-text mt-2">{leadStats.qualified}</div>
                <span className="text-[11px] text-text-muted mt-1 block">Document audit in progress</span>
              </Card>

              <Card variant="content">
                <span className="text-xs font-mono font-bold uppercase text-gold">Total Pipeline</span>
                <div className="text-3xl font-bold font-mono text-gold mt-2">{leadStats.total}</div>
                <span className="text-[11px] text-text-muted mt-1 block">Total leads recorded</span>
              </Card>
            </div>

            {/* Quick Links Row (Filtered by Role) */}
            <div>
              <h3 className="text-base font-bold text-text mb-4">Quick Module Shortcuts</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {visibleSidebarItems
                  .filter((i) => i.id !== 'dashboard')
                  .map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveModule(item.id)}
                        className="p-4 rounded-lg border border-border-hairline bg-surface text-left hover:border-gold transition-colors space-y-2"
                      >
                        <Icon className="w-5 h-5 text-gold" />
                        <div className="text-sm font-bold text-text">{item.label}</div>
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Recent Leads Table */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-text">Recent Leads Submissions</h3>
                {role === 'admin' || role === 'sales' ? (
                  <Button variant="secondary" size="sm" onClick={() => setActiveModule('leads')}>
                    Open Leads Pipeline &rarr;
                  </Button>
                ) : null}
              </div>

              <div className="border border-border-hairline rounded-lg overflow-hidden bg-surface">
                {recentLeads.length === 0 ? (
                  <div className="p-8 text-center text-text-muted text-sm">
                    No leads recorded yet. Submissions from the public fee calculator will appear here live.
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-border-hairline bg-bg/50 font-mono text-gold uppercase text-[11px]">
                        <th className="p-3">Client Name</th>
                        <th className="p-3">Phone</th>
                        <th className="p-3">Service Interest</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-hairline text-text-muted">
                      {recentLeads.map((lead, idx) => (
                        <tr key={lead.id || idx} className="hover:bg-bg/30">
                          <td className="p-3 font-semibold text-text">{lead.name}</td>
                          <td className="p-3 font-mono">{lead.phone}</td>
                          <td className="p-3">{lead.serviceInterest}</td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                                lead.status === 'New'
                                  ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30'
                                  : 'bg-gold-soft/20 text-gold border border-gold/30'
                              }`}
                            >
                              {lead.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Module Content Area */}
        {activeModule === 'leads' && <LeadsKanban />}
        {activeModule === 'services' && <ContentModuleCrud collectionName="services" />}
        {activeModule === 'pages' && <ContentModuleCrud collectionName="pages" />}
        {activeModule === 'blog' && <ContentModuleCrud collectionName="blogPosts" />}
        {activeModule === 'faqs' && <ContentModuleCrud collectionName="faqs" />}
        {activeModule === 'testimonials' && <ContentModuleCrud collectionName="testimonials" />}
        {activeModule === 'team' && <ContentModuleCrud collectionName="team" />}
        {activeModule === 'settings' && (
          <Card variant="content" className="p-8 text-center space-y-4">
            <h3 className="text-lg font-bold text-text uppercase">Site Settings Module</h3>
            <p className="text-sm text-text-muted max-w-md mx-auto">
              Global site configuration (Trade Licence, Address, Office Hours, Authority Logos) stored in <code className="font-mono text-gold">siteSettings/global</code> document.
            </p>
          </Card>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
