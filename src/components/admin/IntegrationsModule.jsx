import React, { useState } from 'react';
import { 
  Settings, ShieldCheck, Zap, Send, CheckCircle2, Code2, Database
} from 'lucide-react';

export default function IntegrationsModule({ auditLogs }) {
  const [activeTab, setActiveTab] = useState('integrations'); // 'integrations' | 'n8n' | 'audit'
  const [testWebhookStatus, setTestWebhookStatus] = useState(null);
  const [isFirebaseLive, setIsFirebaseLive] = useState(true);
  const [n8nThresholdAED, setN8nThresholdAED] = useState(10000);
  const [targetAgent, setTargetAgent] = useState('Tariq Al-Mansoori (Super Admin)');

  const integrations = [
    {
      name: 'Firebase Realtime Database',
      category: 'Live Data Stream',
      status: 'ACTIVE',
      detail: '0ms latency socket stream feeding frontend calculator leads directly into CRM pipeline.',
      iconColor: 'text-amber-400'
    },
    {
      name: 'n8n Automation Webhook Layer',
      category: 'Lead Routing Webhook',
      status: 'ACTIVE',
      detail: 'Routes high-value property & Golden Visa inquiries directly to agent WhatsApp.',
      iconColor: 'text-rose-400'
    },
    {
      name: 'WhatsApp Cloud API (Meta Official)',
      category: 'Messaging & Dispatches',
      status: 'ACTIVE',
      detail: 'Automated 1-click calculator PDF dispatches & ICP status update alerts.',
      iconColor: 'text-emerald-400'
    },
    {
      name: 'ICP Government Gateway Webhook',
      category: 'Immigration Sync',
      status: 'ACTIVE',
      detail: 'Real-time entry permit issuance webhook callbacks from Federal Authority.',
      iconColor: 'text-blue-400'
    }
  ];

  const handleTriggerN8nTest = () => {
    setTestWebhookStatus({
      status: 'SENDING',
      message: 'Dispatching JSON payload to n8n webhook listener...'
    });

    setTimeout(() => {
      setTestWebhookStatus({
        status: 'SUCCESS',
        code: 200,
        message: `Payload received! High-value Property Visa lead (> AED ${n8nThresholdAED}) routed to ${targetAgent} via WhatsApp API.`
      });
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase mb-1">
            <Settings className="w-3.5 h-3.5" /> SYSTEM ARCHITECTURE & WEBHOOK LAYER
          </div>
          <h1 className="text-xl font-black text-white">Firebase Sync & n8n Webhook Automations</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Configure Firebase Realtime sockets, n8n automated lead routing rules for high-value clients, and inspect system audit logs.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('integrations')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'integrations' ? 'bg-[#E01E37] text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            System Gateways
          </button>
          <button
            onClick={() => setActiveTab('n8n')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'n8n' ? 'bg-[#E01E37] text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            n8n Webhook Control
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'audit' ? 'bg-[#E01E37] text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Audit Trail ({auditLogs.length})
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* TAB 1: SYSTEM GATEWAYS & FIREBASE STATUS                           */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'integrations' && (
        <div className="space-y-6">
          
          {/* Firebase Realtime Connection Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Firebase Realtime Database Stream</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  CONNECTED (0ms latency)
                </span>
              </div>
              <p className="text-xs text-slate-400 max-w-xl">
                Listens to frontend calculator fee estimations and contact form dispatches, instantly populating the admin CRM Kanban pipeline.
              </p>
            </div>

            <button
              onClick={() => setIsFirebaseLive(!isFirebaseLive)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                isFirebaseLive 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              }`}
            >
              {isFirebaseLive ? '✓ Listening Mode Active' : 'Reconnect Socket'}
            </button>
          </div>

          {/* Integrations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrations.map((ing, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-400">{ing.category}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {ing.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Zap className={`w-4 h-4 ${ing.iconColor}`} /> {ing.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">{ing.detail}</p>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Endpoint: https://api.familyvisa.ae/v1/webhook</span>
                  <button 
                    onClick={() => alert(`Testing connection for ${ing.name}`)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Test Ping
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* TAB 2: n8n AUTOMATED WEBHOOK ROUTING LAYER                          */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'n8n' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-rose-500" /> Automated n8n Webhook Lead Dispatch Engine
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Construct automated rules to route high-value leads (&gt; AED 10,000) directly to assigned legal consultants via WhatsApp &amp; Email.
              </p>
            </div>

            <button
              onClick={handleTriggerN8nTest}
              className="px-5 py-2.5 bg-[#E01E37] hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-lg flex items-center gap-2 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" /> Trigger Test n8n Webhook Payload
            </button>
          </div>

          {/* Test Status Banner */}
          {testWebhookStatus && (
            <div className={`p-4 rounded-xl border text-xs font-bold space-y-2 animate-fadeIn ${
              testWebhookStatus.status === 'SENDING' 
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            }`}>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Status: {testWebhookStatus.code || '200 OK'} - {testWebhookStatus.message}
                </span>
                <span className="font-mono text-[10px]">Latency: 142ms</span>
              </div>
            </div>
          )}

          {/* n8n Configuration Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-4">
              <h4 className="text-xs font-mono font-bold text-slate-300 uppercase">Routing Rules Matrix</h4>
              
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 font-mono mb-1">High-Value Contract Threshold (AED)</label>
                  <input
                    type="number"
                    value={n8nThresholdAED}
                    onChange={(e) => setN8nThresholdAED(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold font-mono focus:outline-none focus:border-[#E01E37]"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-mono mb-1">Target Assigned Consultant</label>
                  <select
                    value={targetAgent}
                    onChange={(e) => setTargetAgent(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-semibold focus:outline-none"
                  >
                    <option value="Tariq Al-Mansoori (Super Admin)">Tariq Al-Mansoori (Super Admin)</option>
                    <option value="Elena Rostova (Senior Legal PRO)">Elena Rostova (Senior Legal PRO)</option>
                    <option value="Rashid Khan (Filing Officer)">Rashid Khan (Filing Officer)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* n8n JSON Payload Preview */}
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-[#E01E37]" /> Simulated n8n JSON Webhook Payload
                </span>
                <span className="text-[10px] font-mono text-emerald-400">POST /webhook/high-value-lead</span>
              </div>

              <pre className="p-3 bg-slate-900 rounded-lg text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed border border-slate-800">
{`{
  "event": "LEAD_INGESTED",
  "source": "Frontend_Modal_Calculator",
  "contract_value_aed": ${Math.max(n8nThresholdAED, 17300)},
  "is_high_value": true,
  "service": "Property Investor Visa (2-Year / 10-Year)",
  "assigned_agent": "${targetAgent}",
  "dispatch_channel": "WHATSAPP_CLOUD_API",
  "client_phone": "+971 50 491 8273"
}`}
              </pre>
            </div>
          </div>

        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* TAB 3: IMMUTABLE AUDIT TRAIL                                       */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'audit' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#E01E37]" /> Immutable Administrative Activity Trail
            </h3>
            <span className="text-xs text-slate-400 font-mono">256-Bit Signed Audit Logs</span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Timestamp</th>
                  <th className="py-3.5 px-4">Staff User</th>
                  <th className="py-3.5 px-4">Role</th>
                  <th className="py-3.5 px-4">Action Event</th>
                  <th className="py-3.5 px-4">Target Entity</th>
                  <th className="py-3.5 px-4">IP Address</th>
                  <th className="py-3.5 px-4">Change Log Diff</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {auditLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-mono text-slate-400">{log.timestamp}</td>
                    <td className="py-3 px-4 font-bold text-white">{log.userName}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E01E37]/20 text-[#E01E37] border border-[#E01E37]/30">
                        {log.userRole}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold text-emerald-400">{log.action}</td>
                    <td className="py-3 px-4 font-mono text-slate-300">{log.entityId}</td>
                    <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">{log.ipAddress}</td>
                    <td className="py-3 px-4 font-mono text-slate-300 text-[11px]">{log.diff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
