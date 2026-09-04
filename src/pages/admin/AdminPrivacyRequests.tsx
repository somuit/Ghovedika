import React, { useState } from 'react';
import { FileText, CheckCircle2, Edit2, Save, Filter, Clock } from 'lucide-react';
import { dbService } from '../../services/db';
import { PrivacyRequest, PrivacyRequestStatus } from '../../types';

export const AdminPrivacyRequests: React.FC = () => {
  const [requests, setRequests] = useState<PrivacyRequest[]>(() => dbService.getPrivacyRequests());
  const [selectedReq, setSelectedReq] = useState<PrivacyRequest | null>(null);
  const [statusInput, setStatusInput] = useState<PrivacyRequestStatus>('new');
  const [internalNotesInput, setInternalNotesInput] = useState('');

  const refresh = () => setRequests(dbService.getPrivacyRequests());

  const handleEditClick = (req: PrivacyRequest) => {
    setSelectedReq(req);
    setStatusInput(req.status);
    setInternalNotesInput(req.internalNotes || '');
  };

  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReq) return;

    dbService.updatePrivacyRequestStatus(selectedReq.id, statusInput, internalNotesInput);
    refresh();
    setSelectedReq(null);
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Data Rights & Grievance Requests Queue</h2>
          <p className="text-xs text-gray-500">Manage customer DPDP requests for Access, Correction, Erasure, Consent Withdrawal, or Grievance Complaints.</p>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b">
              <tr>
                <th className="p-3">Request #</th>
                <th className="p-3">Type</th>
                <th className="p-3">Customer Info</th>
                <th className="p-3">Description</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {requests.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50/50">
                  <td className="p-3 font-mono font-bold text-brand-700">{r.requestNumber}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-brand-50 text-brand-700 rounded-full font-bold text-[10px] uppercase">
                      {r.requestType}
                    </span>
                  </td>
                  <td className="p-3">
                    <strong className="block text-gray-900">{r.customerName}</strong>
                    <span className="text-[10px] text-gray-400 block">{r.customerPhone} | {r.customerEmail}</span>
                  </td>
                  <td className="p-3 max-w-xs truncate">{r.description}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      r.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' :
                      r.status === 'rejected' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3 text-[11px]">{new Date(r.createdAt).toLocaleDateString()}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleEditClick(r)}
                      className="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-bold rounded-lg transition"
                    >
                      Update Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Status Modal */}
      {selectedReq && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 rounded-3xl shadow-2xl space-y-4 text-xs">
            <h3 className="font-bold text-lg text-gray-900">Update Request #{selectedReq.requestNumber}</h3>
            
            <form onSubmit={handleSaveStatus} className="space-y-3">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Status Workflow *</label>
                <select
                  value={statusInput}
                  onChange={(e) => setStatusInput(e.target.value as PrivacyRequestStatus)}
                  className="w-full p-2.5 border rounded-xl"
                >
                  <option value="new">New</option>
                  <option value="verification_required">Verification Required</option>
                  <option value="in_review">In Review</option>
                  <option value="action_required">Action Required</option>
                  <option value="resolved">Resolved</option>
                  <option value="rejected">Rejected</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Internal Confidential Staff Notes</label>
                <textarea
                  rows={3}
                  value={internalNotesInput}
                  onChange={(e) => setInternalNotesInput(e.target.value)}
                  placeholder="Private staff audit notes (not shown to customer)..."
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedReq(null)}
                  className="px-4 py-2 bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-500 text-white font-bold rounded-xl"
                >
                  Save Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
