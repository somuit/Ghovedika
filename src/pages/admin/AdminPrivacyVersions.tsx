import React, { useState } from 'react';
import { FileText, Plus, Edit2, CheckCircle2 } from 'lucide-react';
import { dbService } from '../../services/db';
import { PrivacyPolicyVersion } from '../../types';

export const AdminPrivacyVersions: React.FC = () => {
  const [versions, setVersions] = useState<PrivacyPolicyVersion[]>(() => dbService.getPrivacyVersions());
  const [editingVer, setEditingVer] = useState<Partial<PrivacyPolicyVersion> | null>(null);

  const refresh = () => setVersions(dbService.getPrivacyVersions());

  const handleSaveVersion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVer?.versionNumber) return;

    const newVer: PrivacyPolicyVersion = {
      id: editingVer.id || `ver-${Date.now()}`,
      versionNumber: editingVer.versionNumber,
      effectiveDate: editingVer.effectiveDate || new Date().toISOString().split('T')[0],
      title_en: editingVer.title_en || 'Ghovedika Privacy Policy',
      title_te: editingVer.title_te || 'గోవేదిక డేటా గోప్యతా విధానం',
      content_en: editingVer.content_en || '',
      content_te: editingVer.content_te || '',
      isPublished: editingVer.isPublished ?? true,
      createdByName: editingVer.createdByName || 'Privacy Officer',
      createdAt: editingVer.createdAt || new Date().toISOString(),
    };

    dbService.savePrivacyVersion(newVer);
    
    // Also update settings version reference if published
    if (newVer.isPublished) {
      const settings = dbService.getSettings();
      dbService.saveSettings({ ...settings, privacyPolicyVersion: newVer.versionNumber });
    }

    refresh();
    setEditingVer(null);
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Privacy Policy Versioning Manager</h2>
          <p className="text-xs text-gray-500">Draft, publish, and audit historical policy versions. Historical consent records reference the exact version active at that time.</p>
        </div>
        <button
          onClick={() => setEditingVer({ versionNumber: `v1.${versions.length + 1}-2026`, effectiveDate: new Date().toISOString().split('T')[0] })}
          className="px-4 py-2 bg-brand-500 text-white font-bold text-xs rounded-xl shadow"
        >
          + Draft New Version
        </button>
      </div>

      <div className="space-y-4">
        {versions.map((v) => (
          <div key={v.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3 text-xs">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <strong className="font-mono text-sm text-brand-800 bg-brand-50 px-2.5 py-0.5 rounded-lg border border-brand-100">{v.versionNumber}</strong>
                  {v.isPublished && (
                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-full text-[10px]">
                      Currently Active & Published
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-base text-gray-900 mt-2">{v.title_en}</h3>
                <span className="text-gray-500 font-telugu block">{v.title_te}</span>
              </div>
              <button
                onClick={() => setEditingVer(v)}
                className="p-2 border rounded-xl hover:bg-gray-50 text-gray-700"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex gap-4 text-gray-400 border-t border-gray-100 pt-2 text-[11px]">
              <span>Effective Date: <strong>{v.effectiveDate}</strong></span>
              <span>Author: <strong>{v.createdByName}</strong></span>
              <span>Created: {new Date(v.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      {editingVer && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full p-6 rounded-3xl shadow-2xl space-y-4 text-xs">
            <h3 className="font-bold text-lg text-gray-900">Policy Version Form</h3>
            <form onSubmit={handleSaveVersion} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Version Number *</label>
                  <input
                    type="text"
                    required
                    value={editingVer.versionNumber || ''}
                    onChange={(e) => setEditingVer({ ...editingVer, versionNumber: e.target.value })}
                    placeholder="v1.0-2025"
                    className="w-full p-2 border rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Effective Date *</label>
                  <input
                    type="date"
                    required
                    value={editingVer.effectiveDate || ''}
                    onChange={(e) => setEditingVer({ ...editingVer, effectiveDate: e.target.value })}
                    className="w-full p-2 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">English Title</label>
                <input
                  type="text"
                  value={editingVer.title_en || ''}
                  onChange={(e) => setEditingVer({ ...editingVer, title_en: e.target.value })}
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">తెలుగు శీర్షిక (Telugu Title)</label>
                <input
                  type="text"
                  value={editingVer.title_te || ''}
                  onChange={(e) => setEditingVer({ ...editingVer, title_te: e.target.value })}
                  className="w-full p-2 border rounded-xl font-telugu"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="pub"
                  checked={editingVer.isPublished ?? true}
                  onChange={(e) => setEditingVer({ ...editingVer, isPublished: e.target.checked })}
                  className="rounded text-brand-500 w-4 h-4"
                />
                <label htmlFor="pub" className="font-bold text-gray-800">Publish as Currently Active Policy</label>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setEditingVer(null)} className="px-4 py-2 bg-gray-100 rounded-xl">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-brand-500 text-white font-bold rounded-xl">Save Version</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
