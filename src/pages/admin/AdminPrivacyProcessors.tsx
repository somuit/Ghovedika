import React, { useState } from 'react';
import { Server, Plus, Trash2, Edit2, ExternalLink } from 'lucide-react';
import { dbService } from '../../services/db';
import { DataProcessor } from '../../types';

export const AdminPrivacyProcessors: React.FC = () => {
  const [processors, setProcessors] = useState<DataProcessor[]>(() => dbService.getDataProcessors());
  const [editingProc, setEditingProc] = useState<Partial<DataProcessor> | null>(null);

  const refresh = () => setProcessors(dbService.getDataProcessors());

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProc?.providerName) return;

    const item: DataProcessor = {
      id: editingProc.id || `proc-${Date.now()}`,
      providerName: editingProc.providerName,
      purpose: editingProc.purpose || '',
      dataCategories: editingProc.dataCategories || ['Account Details'],
      serviceUrl: editingProc.serviceUrl || '',
      privacyPolicyUrl: editingProc.privacyPolicyUrl || '',
      isActive: editingProc.isActive ?? true,
    };

    dbService.saveDataProcessor(item);
    refresh();
    setEditingProc(null);
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Third-Party Data Processors Register</h2>
          <p className="text-xs text-gray-500">Record all third-party vendors (Firebase, Razorpay, Postal/Logistics) receiving or processing customer data.</p>
        </div>
        <button
          onClick={() => setEditingProc({ dataCategories: ['Account Information'] })}
          className="px-4 py-2 bg-brand-500 text-white font-bold text-xs rounded-xl shadow"
        >
          + Add Data Processor
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {processors.map((p) => (
          <div key={p.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                  <Server className="w-4 h-4 text-brand-500" />
                  <span>{p.providerName}</span>
                </h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  p.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                }`}>
                  {p.isActive ? 'Active' : 'Disabled'}
                </span>
              </div>

              <p className="text-gray-600 leading-relaxed"><strong>Purpose:</strong> {p.purpose}</p>

              <div>
                <strong className="block text-gray-700 mb-1">Categories Processed:</strong>
                <div className="flex flex-wrap gap-1">
                  {p.dataCategories.map((cat, i) => (
                    <span key={i} className="px-2 py-0.5 bg-gray-100 border text-gray-700 rounded text-[10px]">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
              {p.privacyPolicyUrl ? (
                <a href={p.privacyPolicyUrl} target="_blank" rel="noopener noreferrer" className="text-brand-600 font-bold hover:underline flex items-center gap-1">
                  <span>Privacy Policy</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : <span />}

              <div className="space-x-2">
                <button onClick={() => setEditingProc(p)} className="p-1.5 bg-gray-50 border rounded-lg hover:bg-gray-100">
                  <Edit2 className="w-3.5 h-3.5 text-gray-700" />
                </button>
                <button onClick={() => { dbService.deleteDataProcessor(p.id); refresh(); }} className="p-1.5 bg-rose-50 rounded-lg text-rose-600 hover:bg-rose-100">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingProc && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 rounded-3xl shadow-2xl space-y-4 text-xs">
            <h3 className="font-bold text-lg text-gray-900">Data Processor Form</h3>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Vendor / Provider Name *</label>
                <input
                  type="text"
                  required
                  value={editingProc.providerName || ''}
                  onChange={(e) => setEditingProc({ ...editingProc, providerName: e.target.value })}
                  placeholder="e.g. Firebase / Razorpay / Indian Post"
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Processing Purpose *</label>
                <textarea
                  rows={2}
                  required
                  value={editingProc.purpose || ''}
                  onChange={(e) => setEditingProc({ ...editingProc, purpose: e.target.value })}
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Service URL</label>
                <input
                  type="url"
                  value={editingProc.serviceUrl || ''}
                  onChange={(e) => setEditingProc({ ...editingProc, serviceUrl: e.target.value })}
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Vendor Privacy Policy URL</label>
                <input
                  type="url"
                  value={editingProc.privacyPolicyUrl || ''}
                  onChange={(e) => setEditingProc({ ...editingProc, privacyPolicyUrl: e.target.value })}
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setEditingProc(null)} className="px-4 py-2 bg-gray-100 rounded-xl">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-brand-500 text-white font-bold rounded-xl">Save Processor</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
