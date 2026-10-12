import React, { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../lib/firebase';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';

export interface ContentModuleCrudProps {
  collectionName: 'services' | 'pages' | 'blogPosts' | 'faqs' | 'testimonials' | 'team';
}

export const ContentModuleCrud: React.FC<ContentModuleCrudProps> = ({ collectionName }) => {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editFormData, setEditFormData] = useState<any>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const fetchRecords = async () => {
    try {
      const snap = await getDocs(collection(db, collectionName));
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setRecords(data);
    } catch (err: any) {
      console.error(`Error fetching ${collectionName}:`, err);
      showToast('error', `Failed to load ${collectionName}: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [collectionName]);

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const handleCreateNew = () => {
    setEditFormData({ id: `item_${Date.now()}` });
    setSelectedFile(null);
    setIsEditing(true);
  };

  const handleEditRecord = (record: any) => {
    setEditFormData({ ...record });
    setSelectedFile(null);
    setIsEditing(true);
  };

  const handleDeleteRecord = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;

    // Optimistic delete
    setRecords((prev) => prev.filter((r) => r.id !== id));

    try {
      await deleteDoc(doc(db, collectionName, id));
      showToast('success', 'Record deleted successfully.');
    } catch (err: any) {
      console.error('Delete record error:', err);
      showToast('error', `Failed to delete: ${err.message}`);
      fetchRecords();
    }
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      let photoUrl = editFormData.photoUrl || editFormData.coverImageUrl || '';

      // Upload image to Firebase Storage if selected
      if (selectedFile) {
        const fileRef = ref(storage, `${collectionName}/${Date.now()}_${selectedFile.name}`);
        await uploadBytes(fileRef, selectedFile);
        photoUrl = await getDownloadURL(fileRef);
      }

      const id = editFormData.id || `record_${Date.now()}`;
      const payload = {
        ...editFormData,
        ...(photoUrl ? (collectionName === 'blogPosts' ? { coverImageUrl: photoUrl } : { photoUrl }) : {}),
        updatedAt: serverTimestamp(),
      };

      // Optimistic update
      setRecords((prev) => {
        const exists = prev.some((r) => r.id === id);
        if (exists) {
          return prev.map((r) => (r.id === id ? { ...r, ...payload } : r));
        }
        return [payload, ...prev];
      });

      await setDoc(doc(db, collectionName, id), payload, { merge: true });
      showToast('success', 'Record saved successfully!');
      setIsEditing(false);
    } catch (err: any) {
      console.error('Save record error:', err);
      showToast('error', `Failed to save: ${err.message}`);
      fetchRecords();
    } finally {
      setIsSaving(false);
    }
  };

  const filteredRecords = records.filter((r) =>
    JSON.stringify(r).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`p-4 rounded-md text-xs flex items-center gap-2 font-mono ${
            toast.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
              : 'bg-red-500/10 border border-red-500/30 text-red-400'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{toast.msg}</span>
        </div>
      )}

      {/* Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-text-muted absolute left-3 top-3" />
          <input
            type="text"
            placeholder={`Search ${collectionName}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-md border border-border-hairline bg-surface text-xs text-text focus:border-gold focus:outline-none"
          />
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<Plus className="w-4 h-4" />}
          onClick={handleCreateNew}
        >
          Create New Record
        </Button>
      </div>

      {/* Table View */}
      <div className="border border-border-hairline rounded-lg overflow-hidden bg-surface">
        {loading ? (
          <div className="p-8 text-center text-text-muted text-xs font-mono">
            Loading {collectionName} collection...
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="p-8 text-center text-text-muted text-xs font-mono">
            No records found in {collectionName}.
          </div>
        ) : (
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr className="border-b border-border-hairline bg-bg/50 font-mono text-gold uppercase text-[11px]">
                <th className="p-3">ID / Title</th>
                <th className="p-3">Primary Info</th>
                <th className="p-3">Status / Category</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-hairline text-text-muted">
              {filteredRecords.map((r) => (
                <tr key={r.id} className="hover:bg-bg/30">
                  <td className="p-3 font-semibold text-text">
                    {r.title || r.clientName || r.question || r.name || r.id}
                  </td>
                  <td className="p-3">
                    {r.shortDescription || r.quote || r.answer || r.companyName || r.slug || 'N/A'}
                  </td>
                  <td className="p-3 font-mono text-[10px]">
                    <span className="px-2 py-0.5 rounded border border-border-hairline bg-bg text-text-muted uppercase">
                      {r.status || r.category || r.category || 'Active'}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => handleEditRecord(r)}
                      className="p-1 text-text-muted hover:text-gold"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteRecord(r.id)}
                      className="p-1 text-text-muted hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Form Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <Card variant="content" className="max-w-lg w-full bg-surface border border-gold/40 p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border-hairline pb-3">
              <h3 className="text-lg font-bold text-text capitalize">
                Edit Record ({collectionName})
              </h3>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="p-1 text-text-muted hover:text-text"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-mono text-text uppercase">Record Identifier (ID / Title)</label>
                <input
                  type="text"
                  required
                  value={editFormData.title || editFormData.clientName || editFormData.question || editFormData.name || editFormData.id || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value, name: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-border-hairline bg-bg text-text focus:border-gold focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-text uppercase">Description / Content / Quote</label>
                <textarea
                  rows={4}
                  value={editFormData.shortDescription || editFormData.quote || editFormData.answer || editFormData.content || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, shortDescription: e.target.value, quote: e.target.value, answer: e.target.value, content: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-border-hairline bg-bg text-text focus:border-gold focus:outline-none"
                />
              </div>

              {/* Image Upload Input */}
              <div className="space-y-1">
                <label className="font-mono text-text uppercase">Upload Image to Firebase Storage</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                  className="w-full text-xs text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-gold file:text-bg hover:file:opacity-90 cursor-pointer"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border-hairline">
                <Button variant="secondary" size="sm" type="button" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  type="submit"
                  disabled={isSaving}
                  icon={isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : undefined}
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ContentModuleCrud;
