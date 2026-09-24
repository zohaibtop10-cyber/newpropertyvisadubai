import React, { useState } from 'react';
import { 
  Search, X, FileText, UploadCloud, Download, Phone, Mail, CheckCircle2
} from 'lucide-react';

export default function DossiersModule({ dossiers, setDossiers }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const statusOptions = ['New Lead', 'Processing', 'Waiting on Client', 'Completed'];

  // Handler to update client status in state (prepped for Firebase Realtime DB sync!)
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

  // Map initial stage to simple status if needed
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
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Header & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div>
          <h2 className="font-display font-extrabold text-xl text-white">Clients & Leads Management</h2>
          <p className="text-xs text-slate-400 mt-1">Manage inquiries, change statuses, and handle client documents.</p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, phone, or visa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-[#E01E37] w-64"
          />
        </div>
      </div>

      {/* Beginner-Friendly Lead Data Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-4 px-6">Client Name</th>
                <th className="py-4 px-6">Contact Number</th>
                <th className="py-4 px-6">Visa Type</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredClients.map((client) => {
                const currentStatus = getClientStatus(client);
                return (
                  <tr key={client.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-6 font-bold text-white">
                      {client.clientName}
                      <div className="text-xs text-slate-400 font-normal">{client.email}</div>
                    </td>
                    <td className="py-4 px-6 font-mono text-slate-300">{client.phone}</td>
                    <td className="py-4 px-6 font-semibold text-slate-200">{client.serviceTitle}</td>
                    
                    {/* Simple Status Dropdown */}
                    <td className="py-4 px-6">
                      <select
                        value={currentStatus}
                        onChange={(e) => handleStatusChange(client.id, e.target.value)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border focus:outline-none cursor-pointer ${
                          currentStatus === 'New Lead' ? 'bg-blue-500/15 text-blue-400 border-blue-500/30' :
                          currentStatus === 'Processing' ? 'bg-amber-500/15 text-amber-400 border-amber-500/30' :
                          currentStatus === 'Waiting on Client' ? 'bg-purple-500/15 text-purple-400 border-purple-500/30' :
                          'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                        }`}
                      >
                        {statusOptions.map(opt => (
                          <option key={opt} value={opt} className="bg-slate-900 text-slate-100">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => setSelectedClient(client)}
                        className="px-4 py-2 bg-slate-800 hover:bg-[#E01E37] text-white rounded-xl font-bold text-xs transition-colors cursor-pointer"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* SLIDE-OUT CLIENT DETAILS DRAWER                                    */}
      {/* ------------------------------------------------------------------ */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div 
            className="w-full max-w-lg bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl p-6 overflow-y-auto space-y-6 text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="font-display font-extrabold text-xl text-white">{selectedClient.clientName}</h3>
                <p className="text-xs text-slate-400">{selectedClient.serviceTitle}</p>
              </div>

              <button
                onClick={() => setSelectedClient(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contact Details */}
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3 text-xs">
              <div className="font-mono uppercase font-bold text-slate-400 text-[10px]">CONTACT INFORMATION</div>
              
              <div className="flex items-center gap-3 text-slate-200">
                <Phone className="w-4 h-4 text-[#E01E37]" />
                <span className="font-mono font-semibold">{selectedClient.phone}</span>
              </div>

              <div className="flex items-center gap-3 text-slate-200">
                <Mail className="w-4 h-4 text-sky-400" />
                <span>{selectedClient.email}</span>
              </div>

              <div className="flex items-center gap-3 text-slate-200">
                <FileText className="w-4 h-4 text-amber-400" />
                <span className="font-mono">Passport: {selectedClient.passportNo}</span>
              </div>
            </div>

            {/* Document Vault Section */}
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div className="font-mono uppercase font-bold text-slate-400 text-[10px]">DOCUMENT VAULT</div>
                <button
                  onClick={handleSimulatedUpload}
                  className="px-3 py-1.5 bg-[#E01E37] text-white rounded-lg font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <UploadCloud className="w-3.5 h-3.5" /> Upload PDF
                </button>
              </div>

              {uploadSuccess && (
                <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Document uploaded to secure vault successfully!
                </div>
              )}

              {/* Sample Documents List */}
              <div className="space-y-2">
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-[#E01E37]" />
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

                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
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

            {/* Firebase Sync Status Note */}
            <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Firebase Realtime Sync: Ready</span>
              <span className="text-emerald-400 font-bold">Synced</span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
