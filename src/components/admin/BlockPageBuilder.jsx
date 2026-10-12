import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MoveUp,
  MoveDown,
  Trash2,
  Edit3,
  Plus,
  Save,
  Layers,
  Eye,
  CheckCircle2,
  X,
  Layout,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { ref, onValue, set } from 'firebase/database';
import { db } from '../../firebase';
import BlockRenderer from '../BlockRenderer';

const AVAILABLE_BLOCK_TYPES = [
  { type: 'HeroCalculator', name: 'Hero + Instant Fee Calculator', description: 'Two-column hero header with integrated fee calculator' },
  { type: 'LuxurySplit', name: 'DIY vs VIP Service Comparison', description: 'Comparative side-by-side comparison cards' },
  { type: 'DocumentConcierge', name: 'Document Concierge Checklist', description: 'Interactive document verification status dashboard' },
  { type: 'PricingInvoice', name: 'Transparent Pricing Invoice Table', description: 'Itemized statutory government fees & retainer table' },
  { type: 'ReviewGrid', name: 'Verified Google Reviews Grid', description: '5-star client testimonials and rating badges' },
  { type: 'FaqAccordion', name: 'FAQ Accordion Section', description: 'Expandable frequently asked questions list' }
];

const DEFAULT_BLOCK_DATA = {
  HeroCalculator: {
    badge: '100% Guaranteed SLA Approval',
    title: 'Sponsor Your Family in Dubai Without Paperwork Stress',
    subtitle: 'End-to-end family residency processing by Brightlink PRO specialists.',
    features: [
      'Free eligibility check before any fee',
      '100% Online in-country status change',
      'VIP escorted medical & biometrics',
      'Itemized government cost transparency'
    ]
  },
  LuxurySplit: {
    badge: 'Why Families Choose Us',
    title: 'The DIY Way vs Our VIP Service',
    subtitle: 'Compare self-service immigration versus our accredited PRO service.',
    diyPoints: [
      '5+ counter visits (Typing, Medical, Amer, MOFA)',
      'Risk of overstay fines due to document rejections',
      'Hidden fees, extra typing charges, & unlisted costs'
    ],
    vipPoints: [
      '100% Digital process with 1 dedicated PRO manager',
      'Guaranteed SLA approval or 100% service fee refund',
      'Itemized government charges passed on at cost'
    ]
  },
  DocumentConcierge: {
    title: 'Required Sponsorship Documents Checklist',
    documents: [
      { title: 'Attested Marriage Certificate', status: 'MOFA Stamped Required', verified: true },
      { title: 'Attested Birth Certificates', status: 'Required for Children', verified: true },
      { title: 'Active Ejari Tenancy Contract', status: 'Registered under Sponsor', verified: true }
    ]
  },
  PricingInvoice: {
    badge: 'Zero Hidden Fees',
    title: 'Itemized Government Cost Breakdown',
    feeRows: [
      { item: 'GDRFA / ICP Entry Permit Clearance', govFee: 1150, retainer: 450 },
      { item: 'VIP Medical Fitness Test & X-Ray', govFee: 750, retainer: 300 },
      { item: 'Emirates ID Biometrics (2 Years)', govFee: 380, retainer: 200 }
    ]
  },
  ReviewGrid: {
    reviews: [
      { author: 'Dr. Hamad Al-Maktoum', role: 'Spouse Visa Client', text: 'Exceptional service. Handled our family visa file smoothly.', rating: 5 },
      { author: 'Elena Rostova', role: '10-Year Golden Visa', text: 'Professional, fast, and transparent with government receipts.', rating: 5 }
    ]
  },
  FaqAccordion: {
    items: [
      { question: 'What is the minimum salary to sponsor my family?', answer: 'Minimum monthly salary required is AED 4,000 (or AED 3,000 + housing).' },
      { question: 'Can my family stay in the UAE during processing?', answer: 'Yes, we perform an in-country Status Change so they do not need to exit.' }
    ]
  }
};

export default function BlockPageBuilder({ slug = 'home' }) {
  const [blocks, setBlocks] = useState([]);
  const [selectedNewType, setSelectedNewType] = useState('HeroCalculator');
  const [editingBlock, setEditingBlock] = useState(null);
  const [editingDataJson, setEditingDataJson] = useState('');
  const [activeTab, setActiveTab] = useState('editor');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    try {
      const pageRef = ref(db, `pageLayouts/${slug}`);
      onValue(pageRef, (snapshot) => {
        if (snapshot.exists()) {
          const val = snapshot.val();
          if (Array.isArray(val)) {
            setBlocks(val);
          } else if (val.blocks && Array.isArray(val.blocks)) {
            setBlocks(val.blocks);
          }
        } else {
          setBlocks([
            { id: 'b-1', type: 'HeroCalculator', data: DEFAULT_BLOCK_DATA.HeroCalculator },
            { id: 'b-2', type: 'LuxurySplit', data: DEFAULT_BLOCK_DATA.LuxurySplit },
            { id: 'b-3', type: 'DocumentConcierge', data: DEFAULT_BLOCK_DATA.DocumentConcierge },
            { id: 'b-4', type: 'PricingInvoice', data: DEFAULT_BLOCK_DATA.PricingInvoice },
            { id: 'b-5', type: 'ReviewGrid', data: DEFAULT_BLOCK_DATA.ReviewGrid },
            { id: 'b-6', type: 'FaqAccordion', data: DEFAULT_BLOCK_DATA.FaqAccordion }
          ]);
        }
      });
    } catch (err) {
      console.error('Firebase layout fetch error:', err);
    }
  }, [slug]);

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const updated = [...blocks];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    setBlocks(updated);
  };

  const handleMoveDown = (index) => {
    if (index === blocks.length - 1) return;
    const updated = [...blocks];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    setBlocks(updated);
  };

  const handleDeleteBlock = (id) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const handleAddBlock = () => {
    const newBlock = {
      id: `block-${Date.now()}`,
      type: selectedNewType,
      data: JSON.parse(JSON.stringify(DEFAULT_BLOCK_DATA[selectedNewType] || {}))
    };
    setBlocks([...blocks, newBlock]);
  };

  const handleOpenEditModal = (block) => {
    setEditingBlock(block);
    setEditingDataJson(JSON.stringify(block.data || {}, null, 2));
  };

  const handleSaveModalData = () => {
    try {
      const parsed = JSON.parse(editingDataJson);
      setBlocks(blocks.map(b => (b.id === editingBlock.id ? { ...b, data: parsed } : b)));
      setEditingBlock(null);
    } catch (e) {
      alert('Invalid JSON formatting in block content. Please check syntax.');
    }
  };

  const handleSavePageLayout = async () => {
    setIsSaving(true);
    try {
      const pageRef = ref(db, `pageLayouts/${slug}`);
      await set(pageRef, { blocks, updatedAt: new Date().toISOString() });
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Save Page Layout Error:', err);
      setIsSaving(false);
      alert('Failed to save layout to Firebase: ' + err.message);
    }
  };

  return (
    <div className="max-w-6xl space-y-6 animate-fadeIn pb-16">
      
      {/* Top Header Controls */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-brand-darkSurface border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dynamic Component Builder</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Block Page Builder ({slug.toUpperCase()})
            </h1>
            <p className="text-text-muted text-xs sm:text-sm max-w-xl">
              Construct modular page layouts using reorderable component blocks and live previews.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-surface p-1.5 rounded-xl border border-slate-800/80 flex">
              <button
                onClick={() => setActiveTab('editor')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'editor' ? 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black font-bold shadow-md shadow-amber-500/20' : 'text-text-muted hover:text-white'
                }`}
              >
                <Layout className="w-4 h-4" /> Builder
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'preview' ? 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black font-bold shadow-md shadow-amber-500/20' : 'text-text-muted hover:text-white'
                }`}
              >
                <Eye className="w-4 h-4" /> Preview
              </button>
            </div>

            <button
              onClick={handleSavePageLayout}
              disabled={isSaving}
              className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{isSaving ? 'Saving...' : 'Save Layout'}</span>
            </button>
          </div>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-semibold flex items-center gap-3 shadow-lg animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span>Page block layout successfully saved and deployed to Firebase!</span>
        </div>
      )}

      {/* TABS CONTENT */}
      {activeTab === 'preview' ? (
        <div className="border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl">
          <div className="bg-surface px-6 py-3.5 border-b border-slate-800/80 text-xs font-mono text-amber-400 font-bold flex justify-between items-center">
            <span>LIVE PREVIEW MODE</span>
            <span>{blocks.length} Active Component Blocks</span>
          </div>
          <BlockRenderer blocks={blocks} />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-3">
            {blocks.map((block, index) => (
              <motion.div
                key={block.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-surface/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 transition-all shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      className="p-1 rounded bg-surface hover:bg-surface text-text-muted hover:text-white disabled:opacity-30 cursor-pointer"
                      title="Move Block Up"
                    >
                      <MoveUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMoveDown(index)}
                      disabled={index === blocks.length - 1}
                      className="p-1 rounded bg-surface hover:bg-surface text-text-muted hover:text-white disabled:opacity-30 cursor-pointer"
                      title="Move Block Down"
                    >
                      <MoveDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-mono font-bold text-xs">
                    {index + 1}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-display font-bold text-white text-sm sm:text-base">
                        {block.type}
                      </h4>
                      <span className="text-[10px] font-mono bg-surface text-text-muted px-2 py-0.5 rounded border border-slate-800">
                        ID: {block.id}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted mt-0.5">
                      {AVAILABLE_BLOCK_TYPES.find(t => t.type === block.type)?.description || 'Dynamic Page Component'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEditModal(block)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface hover:bg-surface border border-slate-700/60 text-xs font-bold text-slate-200 transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit JSON
                  </button>

                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDeleteBlock(block.id); }}
                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 transition-colors cursor-pointer"
                    title="Delete Block"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-6 bg-surface/80 backdrop-blur-xl border border-amber-500/20 rounded-2xl space-y-4">
            <h3 className="font-display font-bold text-sm text-amber-400 uppercase tracking-wider">
              + Add Component Block
            </h3>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <select
                value={selectedNewType}
                onChange={(e) => setSelectedNewType(e.target.value)}
                className="flex-1 w-full bg-surface border border-slate-700/60 text-white rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-amber-500/50 cursor-pointer"
              >
                {AVAILABLE_BLOCK_TYPES.map((b) => (
                  <option key={b.type} value={b.type} className="bg-surface text-white">
                    {b.type} — {b.name}
                  </option>
                ))}
              </select>

              <button
                onClick={handleAddBlock}
                className="w-full sm:w-auto bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-amber-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Add Block</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT CONTENT JSON MODAL */}
      <AnimatePresence>
        {editingBlock && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-surface border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4 text-white"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="font-display font-bold text-lg text-white">Edit Block Content ({editingBlock.type})</h3>
                  <p className="text-xs text-text-muted font-mono">Block ID: {editingBlock.id}</p>
                </div>
                <button
                  onClick={() => setEditingBlock(null)}
                  className="p-1 rounded-lg hover:bg-surface text-text-muted hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="block text-xs font-mono text-amber-400 font-bold uppercase mb-2">Block Properties JSON</label>
                <textarea
                  value={editingDataJson}
                  onChange={(e) => setEditingDataJson(e.target.value)}
                  rows={12}
                  className="w-full bg-surface border border-slate-800 focus:border-amber-500/50 rounded-xl p-4 font-mono text-xs text-amber-300 outline-none leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setEditingBlock(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-700 hover:bg-surface text-xs font-semibold text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveModalData}
                  className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black font-extrabold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-amber-500/20"
                >
                  Save Block Data
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
