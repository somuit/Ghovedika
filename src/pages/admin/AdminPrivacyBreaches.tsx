import React, { useState } from 'react';
import { AlertOctagon, Plus, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { dbService } from '../../services/db';
import { SecurityIncident } from '../../types';

export const AdminPrivacyBreaches: React.FC = () => {
  const [incidents, setIncidents] = useState<SecurityIncident[]>(() => dbService.getSecurityIncidents());
  const [editingInc, setEditingInc] = useState<Partial<SecurityIncident> | null>(null);

  const refresh = () => setIncidents(dbService.getSecurityIncidents());

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingInc?.incidentType) return;

    dbService.logSecurityIncident({
      incidentId: editingInc.incidentId || `INC-2026-${Math.floor(100 + Math.random() * 900)}`,
      detectionTime: editingInc.detectionTime || new Date().toISOString(),
      incidentType: editingInc.incidentType,
      affectedSystems: editingInc.affectedSystems || 'None',
      dataCategories: editingInc.dataCategories || 'None',
      approxAffectedUsers: Number(editingInc.approxAffectedUsers) || 0,
      riskAssessment: editingInc.riskAssessment || 'Low risk',
      actionsTaken: editingInc.actionsTaken || 'Investigated & contained',
      containmentStatus: editingInc.containmentStatus || 'resolved',
      notifications: editingInc.notifications || 'Internal log only',
      resolutionNotes: editingInc.resolutionNotes || '',
    });

    refresh();
    setEditingInc(null);
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Security Incident & Breach Readiness Log</h2>
          <p className="text-xs text-gray-500">Record data security incidents with risk assessments and DPDP board reporting status (72-hour detailed update readiness).</p>
        </div>
        <button
          onClick={() => setEditingInc({ incidentId: `INC-2026-${Math.floor(1000 + Math.random() * 9000)}`, detectionTime: new Date().toISOString() })}
          className="px-4 py-2 bg-rose-600 text-white font-bold text-xs rounded-xl shadow hover:bg-rose-700"
        >
          + Log Incident Event
        </button>
      </div>

      {incidents.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-3xl border border-gray-200 shadow-sm space-y-3">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 text-base">No Data Security Incidents Recorded</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            System security is healthy. Use this log to record any security events in accordance with the 72-hour DPDP breach reporting framework.
          </p>
        </div>
      ) : (
        <div className="space-y-4 text-xs">
          {incidents.map((inc) => (
            <div key={inc.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <strong className="font-mono text-sm text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-lg border border-rose-100">{inc.incidentId}</strong>
                  <span className="px-2.5 py-0.5 bg-gray-100 text-gray-700 font-bold rounded-full text-[10px] uppercase">
                    {inc.containmentStatus}
                  </span>
                </div>
                <span className="text-gray-400 text-[11px]">Detected: {new Date(inc.detectionTime).toLocaleString()}</span>
              </div>

              <h3 className="font-bold text-sm text-gray-900">{inc.incidentType}</h3>
              <p className="text-gray-600"><strong>Risk Assessment:</strong> {inc.riskAssessment}</p>
              <p className="text-gray-600"><strong>Actions Taken:</strong> {inc.actionsTaken}</p>
            </div>
          ))}
        </div>
      )}

      {editingInc && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-6 rounded-3xl shadow-2xl space-y-4 text-xs">
            <h3 className="font-bold text-lg text-gray-900">Security Incident Log Form</h3>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Incident Type / Title *</label>
                <input
                  type="text"
                  required
                  value={editingInc.incidentType || ''}
                  onChange={(e) => setEditingInc({ ...editingInc, incidentType: e.target.value })}
                  placeholder="e.g. Unidentified Login Attempt / Suspicious IP Activity"
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Risk Assessment</label>
                <textarea
                  rows={2}
                  value={editingInc.riskAssessment || ''}
                  onChange={(e) => setEditingInc({ ...editingInc, riskAssessment: e.target.value })}
                  placeholder="Evaluation of potential data impact..."
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Containment Actions Taken</label>
                <textarea
                  rows={2}
                  value={editingInc.actionsTaken || ''}
                  onChange={(e) => setEditingInc({ ...editingInc, actionsTaken: e.target.value })}
                  placeholder="Immediate containment steps..."
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setEditingInc(null)} className="px-4 py-2 bg-gray-100 rounded-xl">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-rose-600 text-white font-bold rounded-xl">Save Log</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
