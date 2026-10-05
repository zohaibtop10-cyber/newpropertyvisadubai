import React, { useState } from 'react';
import { 
  Search, X, FileText, UploadCloud, Download, Phone, Mail, CheckCircle2, Sparkles, UserCheck
} from 'lucide-react';

export default function DossiersModule({ dossiers, setDossiers }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const statusOptions = ['New Lead', 'Processing', 'Waiting on Client', 'Completed'];

  const handleStatusChange = (clientId, newStatus) => {
    setDossiers(prev => prev.map(c => {
      if (c.id === clientId) {
        return {
          ...c,
          simpleStatus: newStatus,
          lastSyncedAt: new Date().toISOString()
        };
      }
      return c;
    }));
  };

  const getClientStatus = (client) => {
    if (client.simpleStatus) return client.simpleStatus;
    if (client.stage === 'LEAD_INGESTION') return 'New Lead';
    if (client.stage === 'STAMPING_HANDOVER') return 'Completed';
    if (client.stage === 'COMPLIANCE_AUDIT') return 'Waiting on Client';
    return 'Processing';
  };

  const filteredClients = dossiers.filter(c => 
    c.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery) ||
    c.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSimulatedUpload = () => {
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  return (
    <div className="max-w-6xl space-y-6 animate-fadeIn pb-16">
      
      {/* Top Header & Search Bar */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-brand-darkSurface border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CRM & Client File Vault</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Clients & Leads Management
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
              Track visa applications, update client status stages, and manage passport documents.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, phone, or visa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500/50"
            />
          </div>
        </div>
      </div>

      {/* Lead Data Table */}
      <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800/80">
              <tr>
                <th className="py-4 px-6">Client Name</th>
                <th className="py-4 px-6">Contact Number</th>
                <th className="py-4 px-6">Visa Service</th>
                <th className="py-4 px-6">Status Stage</th>
                <th className="py-4 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredClients.map((client) => {
                const currentStatus = getClientStatus(client);
                return (
                  <tr key={client.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-6 font-bold text-white">
                      {client.clientName}
                      <div className="text-xs text-slate-400 font-normal">{client.email}</div>
                    </td>
                    <td className="py-4 px-6 font-mono text-slate-300">{client.phone}</td>
                    <td className="py-4 px-6 font-semibold text-amber-300">{client.serviceTitle}</td>
                    
                    <td className="py-4 px-6">
                      <select
                        value={currentStatus}
                        onChange={(e) => handleStatusChange(client.id, e.target.value)}
                        className="bg-slate-950 border border-slate-700/60 text-amber-400 font-semibold text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500/50 cursor-pointer"
                      >
                        {statusOptions.map(opt => (
                          <option key={opt} value={opt} className="bg-slate-900 text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => setSelectedClient(client)}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer border border-slate-700/60"
                      >
                        View Dossier
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SLIDE-OUT CLIENT DETAILS DRAWER */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div 
            className="w-full max-w-lg bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
              <div>
                <h3 className="font-display font-bold text-xl text-white">{selectedClient.clientName}</h3>
                <p className="text-xs text-amber-400 font-medium">{selectedClient.serviceTitle}</p>
              </div>

              <button
                onClick={() => setSelectedClient(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800/80 p-4 rounded-xl space-y-3 text-xs">
              <div className="font-mono uppercase font-bold text-amber-400 text-[10px]">CONTACT INFORMATION</div>
              
              <div className="flex items-center gap-3 text-slate-200">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span className="font-mono font-medium">{selectedClient.phone}</span>
              </div>

              <div className="flex items-center gap-3 text-slate-200">
                <Mail className="w-4 h-4 text-sky-400" />
                <span>{selectedClient.email}</span>
              </div>

              <div className="flex items-center gap-3 text-slate-200">
                <FileText className="w-4 h-4 text-amber-400" />
                <span className="font-mono">Passport No: {selectedClient.passportNo}</span>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800/80 p-4 rounded-xl space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div className="font-mono uppercase font-bold text-amber-400 text-[10px]">DOCUMENT VAULT</div>
                <button
                  onClick={handleSimulatedUpload}
                  className="px-3.5 py-2 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black font-extrabold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/20"
                >
                  <UploadCloud className="w-3.5 h-3.5" /> Upload PDF
                </button>
              </div>

              {uploadSuccess && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Document uploaded to secure vault successfully!
                </div>
              )}

              <div className="space-y-2.5">
                <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="font-bold text-white">Passport_Copy.pdf</div>
                      <div className="text-[10px] text-slate-400 font-mono">Verified PDF • 2.4 MB</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert('Downloading Passport_Copy.pdf')}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg cursor-pointer"
                    title="Download PDF"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="font-bold text-white">Visa_Entry_Permit.pdf</div>
                      <div className="text-[10px] text-slate-400 font-mono">Issued Document • 1.1 MB</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert('Downloading Visa_Entry_Permit.pdf')}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg cursor-pointer"
                    title="Download PDF"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-950 border border-slate-800/80 rounded-xl text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Firebase Realtime Sync</span>
              <span className="text-emerald-400 font-bold">Connected</span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
