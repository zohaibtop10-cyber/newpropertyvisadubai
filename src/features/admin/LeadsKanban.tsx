import React, { useState, useEffect } from 'react';
import {
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { LeadDoc, leadConverter } from '../../lib/converters';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import {
  Users,
  Download,
  Search,
  CheckCircle2,
  Clock,
  ChevronRight,
  X,
  MessageSquare,
  Plus,
} from 'lucide-react';

export const LeadsKanban: React.FC = () => {
  const [leads, setLeads] = useState<LeadDoc[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLead, setSelectedLead] = useState<LeadDoc | null>(null);
  const [newNote, setNewNote] = useState<string>('');

  const columns: ('New' | 'Contacted' | 'Qualified' | 'Closed')[] = [
    'New',
    'Contacted',
    'Qualified',
    'Closed',
  ];

  // Fetch leads from Firestore
  const fetchLeads = async () => {
    try {
      const ref = collection(db, 'leads').withConverter(leadConverter);
      const q = query(ref, orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      const docs = snap.docs.map((d) => d.data());
      setLeads(docs);
    } catch (err) {
      console.warn('Leads fetch error in Kanban:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Update lead status
  const handleStatusChange = async (leadId: string, newStatus: 'New' | 'Contacted' | 'Qualified' | 'Closed') => {
    // Optimistic UI update
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    try {
      const leadRef = doc(db, 'leads', leadId);
      await updateDoc(leadRef, {
        status: newStatus,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error('Error updating lead status:', err);
      fetchLeads(); // Revert on failure
    }
  };

  // Add note to lead
  const handleAddNote = async (leadId: string) => {
    if (!newNote.trim()) return;

    const noteText = `${new Date().toLocaleDateString()} - ${newNote.trim()}`;

    // Optimistic update
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId ? { ...l, notes: [...(l.notes || []), noteText] } : l
      )
    );
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead((prev) =>
        prev ? { ...prev, notes: [...(prev.notes || []), noteText] } : null
      );
    }

    setNewNote('');

    try {
      const leadRef = doc(db, 'leads', leadId);
      await updateDoc(leadRef, {
        notes: arrayUnion(noteText),
      });
    } catch (err) {
      console.error('Error adding note:', err);
    }
  };

  // Export filtered leads as CSV
  const exportCSV = () => {
    const filteredLeads = leads.filter(
      (l) =>
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.phone.includes(searchQuery) ||
        l.serviceInterest.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const headers = ['ID', 'Name', 'Phone', 'Email', 'Service Interest', 'Route', 'Status', 'Total Amount (AED)'];
    const rows = filteredLeads.map((l) => [
      l.id || '',
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${l.serviceInterest}"`,
      `"${l.route || ''}"`,
      `"${l.status}"`,
      l.calculatorSnapshot?.totalAmount || 0,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery) ||
      l.serviceInterest.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      {/* Search & Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-text-muted absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search leads by name, phone, service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-md border border-border-hairline bg-surface text-xs text-text focus:border-gold focus:outline-none"
          />
        </div>

        <Button
          variant="secondary"
          size="sm"
          icon={<Download className="w-4 h-4" />}
          onClick={exportCSV}
        >
          Export CSV ({filteredLeads.length} Leads)
        </Button>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((col) => {
          const colLeads = filteredLeads.filter((l) => l.status === col);
          return (
            <div key={col} className="bg-bg border border-border-hairline rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-border-hairline pb-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-gold">
                  {col}
                </span>
                <span className="text-xs font-mono font-bold text-text-muted bg-surface px-2 py-0.5 rounded border border-border-hairline">
                  {colLeads.length}
                </span>
              </div>

              <div className="space-y-3 min-h-[300px]">
                {colLeads.map((lead) => (
                  <Card
                    key={lead.id}
                    variant="content"
                    onClick={() => setSelectedLead(lead)}
                    className="p-4 cursor-pointer hover:border-gold border-border-hairline bg-surface space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <h4 className="text-sm font-bold text-text">{lead.name}</h4>
                      {lead.calculatorSnapshot?.totalAmount && (
                        <span className="text-xs font-mono font-bold text-gold">
                          AED {lead.calculatorSnapshot.totalAmount.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-text-muted font-mono">{lead.phone}</div>
                    <div className="text-xs text-text">{lead.serviceInterest}</div>

                    {/* Quick Move Buttons */}
                    <div className="pt-2 flex flex-wrap gap-1 border-t border-border-hairline/40">
                      {columns
                        .filter((c) => c !== col)
                        .map((targetCol) => (
                          <button
                            key={targetCol}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (lead.id) handleStatusChange(lead.id, targetCol);
                            }}
                            className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-border-hairline hover:border-gold hover:text-gold text-text-muted"
                          >
                            &rarr; {targetCol}
                          </button>
                        ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lead Detail Drawer */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-end">
          <div className="w-full max-w-lg bg-surface border-l border-border-hairline p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-border-hairline pb-4">
              <div>
                <span className="text-xs font-mono text-gold font-bold uppercase">Lead Detail Drawer</span>
                <h3 className="text-xl font-bold text-text">{selectedLead.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="p-2 text-text-muted hover:text-text rounded-md border border-border-hairline"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-text-muted uppercase font-mono block">Phone</span>
                  <span className="text-text font-mono text-sm font-semibold">{selectedLead.phone}</span>
                </div>
                <div>
                  <span className="text-text-muted uppercase font-mono block">Email</span>
                  <span className="text-text font-mono">{selectedLead.email || 'N/A'}</span>
                </div>
              </div>

              <div>
                <span className="text-text-muted uppercase font-mono block">Service Interest</span>
                <span className="text-text font-semibold">{selectedLead.serviceInterest}</span>
              </div>

              {/* Calculator Snapshot */}
              {selectedLead.calculatorSnapshot && (
                <div className="border border-border-hairline rounded-md p-4 bg-bg space-y-2">
                  <span className="text-[11px] font-mono font-bold text-gold uppercase block">
                    Calculator Breakdown Snapshot
                  </span>
                  <div className="space-y-1 text-text-muted">
                    {selectedLead.calculatorSnapshot.governmentFees?.map((item, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>{item.label}</span>
                        <span className="font-mono">AED {item.amount.toLocaleString()}</span>
                      </div>
                    ))}
                    {selectedLead.calculatorSnapshot.serviceFees?.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-gold">
                        <span>{item.label}</span>
                        <span className="font-mono">AED {item.amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-border-hairline flex justify-between font-bold text-text">
                    <span>Total Calculated Quote:</span>
                    <span className="font-mono text-gold">
                      AED {selectedLead.calculatorSnapshot.totalAmount?.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              {/* Staff Notes */}
              <div className="space-y-3 pt-2">
                <span className="text-[11px] font-mono font-bold text-gold uppercase block">
                  Staff Activity Notes ({selectedLead.notes?.length || 0})
                </span>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedLead.notes?.map((n, i) => (
                    <div key={i} className="p-2 rounded border border-border-hairline bg-bg text-text-muted">
                      {n}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Append staff note..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded border border-border-hairline bg-bg text-xs text-text focus:border-gold focus:outline-none"
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<Plus className="w-4 h-4" />}
                    onClick={() => {
                      if (selectedLead.id) handleAddNote(selectedLead.id);
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsKanban;
