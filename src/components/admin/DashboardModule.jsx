import React from 'react';
import { Users, UserPlus, CheckCircle2, ArrowRight } from 'lucide-react';

export default function DashboardModule({ onNavigateModule, dossiers }) {
  // 3 Simple Top Metric Cards
  const stats = [
    {
      title: 'Total Active Clients',
      value: dossiers ? dossiers.length : 4,
      subtitle: 'Currently in progress',
      icon: Users,
      color: 'bg-brand-primary/10 text-brand-primary border-brand-primary/20'
    },
    {
      title: 'New Leads (This Week)',
      value: '12',
      subtitle: '+3 from calculator today',
      icon: UserPlus,
      color: 'bg-brand-gold/10 text-brand-goldLight border-brand-gold/20'
    },
    {
      title: 'Completed Visas',
      value: '158',
      subtitle: 'Total issued this year',
      icon: CheckCircle2,
      color: 'bg-emerald-500/10 text-brand-goldLight border-emerald-500/20'
    }
  ];

  // 5 Recent Inquiries from Website Calculator
  const recentInquiries = [
    { id: 1, name: 'Alexander Wright', visaType: 'Spouse Residency Visa', date: 'Today, 2:45 PM', status: 'New Lead' },
    { id: 2, name: 'Dmitry Smirnov', visaType: '10-Year Golden Visa', date: 'Today, 11:20 AM', status: 'Processing' },
    { id: 3, name: 'Sophia Martinez', visaType: 'Parents Residency Visa', date: 'Yesterday', status: 'Waiting on Client' },
    { id: 4, name: 'Jean-Luc Dubois', visaType: 'Domestic Worker Visa', date: 'Sep 21, 2026', status: 'New Lead' },
    { id: 5, name: 'Elena Rostova', visaType: 'Property Investor Visa', date: 'Sep 20, 2026', status: 'Completed' }
  ];

  const getStatusBadge = (st) => {
    switch (st) {
      case 'New Lead':
        return 'bg-brand-gold/15 text-brand-goldLight border-brand-gold/30';
      case 'Processing':
        return 'bg-brand-gold/15 text-brand-goldLight border-brand-gold/30';
      case 'Waiting on Client':
        return 'bg-brand-gold/15 text-brand-goldLight border-brand-gold/30';
      case 'Completed':
        return 'bg-brand-gold/15 text-brand-goldLight border-brand-gold/30';
      default:
        return 'bg-slate-800 text-slate-300';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Welcome Banner */}
      <div className="bg-brand-surfaceLight border border-slate-800 p-6 rounded-xl space-y-1">
        <h2 className="font-display font-extrabold text-2xl text-white">Welcome back, Admin 👋</h2>
        <p className="text-slate-400 text-sm">Here is what is happening with your client visas and website inquiries today.</p>
      </div>

      {/* 3 Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-brand-surfaceLight border border-slate-800 p-6 rounded-xl shadow-xl flex items-center justify-between">
              <div className="space-y-2">
                <div className="text-slate-400 text-xs font-semibold">{stat.title}</div>
                <div className="font-display font-extrabold text-3xl text-white">{stat.value}</div>
                <div className="text-slate-400 text-[11px]">{stat.subtitle}</div>
              </div>
              <div className={`p-4 rounded-xl border ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Inquiries Section */}
      <div className="bg-brand-surfaceLight border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-extrabold text-lg text-white">Recent Website Inquiries</h3>
            <p className="text-slate-400 text-xs">The 5 most recent requests submitted through the calculator</p>
          </div>

          <button
            onClick={() => onNavigateModule('clients')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            View All Clients <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Simple Clean Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-brand-darkBg text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-6">Client Name</th>
                <th className="py-3.5 px-6">Visa Type</th>
                <th className="py-3.5 px-6">Date Inquired</th>
                <th className="py-3.5 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {recentInquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 px-6 font-bold text-white">{inq.name}</td>
                  <td className="py-4 px-6 text-slate-300">{inq.visaType}</td>
                  <td className="py-4 px-6 text-slate-400 text-xs font-mono">{inq.date}</td>
                  <td className="py-4 px-6 text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(inq.status)}`}>
                      {inq.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
