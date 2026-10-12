'use client';

import React, { useState } from 'react';
import { calculateTimeRemaining } from '../../../src/utils/timeUtils';

export default function AdminTickerPage() {
  const [items, setItems] = useState([
    {
      id: '1',
      message: 'Special 10-Year Golden Visa Consultation Discount',
      hasDeadline: true,
      endDate: '2026-10-05T23:59',
      isActive: true
    }
  ]);

  const [message, setMessage] = useState('');
  const [hasDeadline, setHasDeadline] = useState(false);
  const [endDate, setEndDate] = useState('');

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newItem = {
      id: Date.now().toString(),
      message: message.trim(),
      hasDeadline,
      endDate: hasDeadline ? endDate : '',
      isActive: true
    };

    setItems([...items, newItem]);
    setMessage('');
    setHasDeadline(false);
    setEndDate('');
  };

  const handleToggle = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, isActive: !item.isActive } : item));
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 p-8 selection:bg-gold selection:text-black">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="border-b border-white/10 pb-4">
          <h1 className="text-3xl font-black text-white font-display">Top Bar Ticker CMS</h1>
          <p className="text-text-muted text-sm mt-1">Manage announcement items and dynamic deadline offers shown on the website ticker.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleAddItem} className="bg-brand-surfaceLight border border-white/10 rounded-2xl p-6 space-y-4 shadow-2xl">
          <h2 className="text-lg font-bold text-white">Add Announcement Item</h2>
          
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Message</label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. 20% Off Family Visa Processing..."
              className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-gold"
              required
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={hasDeadline}
                onChange={(e) => setHasDeadline(e.target.checked)}
                className="w-4 h-4 accent-brand-gold"
              />
              Has Deadline?
            </label>

            {hasDeadline && (
              <input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-black/50 border border-white/10 rounded-xl p-2.5 text-white text-xs font-mono"
                required={hasDeadline}
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gold-gradient text-black font-extrabold rounded-xl hover:scale-[1.01] transition-transform cursor-pointer"
          >
            Save Item to Ticker
          </button>
        </form>

        {/* Item List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Current Ticker Items ({items.length})</h2>
          {items.map((item) => {
            const timeRemaining = item.hasDeadline && item.endDate ? calculateTimeRemaining(item.endDate) : '';
            return (
              <div
                key={item.id}
                className="bg-brand-surfaceLight border border-white/10 rounded-2xl p-5 flex items-center justify-between gap-4"
              >
                <div>
                  <div className="font-bold text-white text-sm">{item.message}</div>
                  {timeRemaining && (
                    <div className="text-xs text-gold font-mono mt-1">⏱ {timeRemaining}</div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggle(item.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${item.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-surface/5 text-text-muted'}`}
                  >
                    {item.isActive ? 'Active' : 'Paused'}
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 rounded-lg text-xs font-bold bg-red-500/20 text-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
