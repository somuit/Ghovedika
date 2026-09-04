import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, FileText, Server, AlertOctagon, UserCheck, 
  CheckCircle2, Clock, Eye, Sliders, ChevronRight
} from 'lucide-react';
import { dbService } from '../../services/db';

export const AdminPrivacyDashboard: React.FC = () => {
  const requests = dbService.getPrivacyRequests();
  const consentRecords = dbService.getConsentRecords();
  const processors = dbService.getDataProcessors();
  const versions = dbService.getPrivacyVersions();
  const incidents = dbService.getSecurityIncidents();
  const settings = dbService.getSettings();

  const openRequestsCount = requests.filter(r => r.status === 'new' || r.status === 'in_review' || r.status === 'verification_required').length;
  const resolvedRequestsCount = requests.filter(r => r.status === 'resolved' || r.status === 'closed').length;

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-bold border border-amber-400/30">
            <ShieldCheck className="w-4 h-4" />
            <span>DPDP Act 2023 & Rules 2025 Compliance Control</span>
          </div>
          <h2 className="text-2xl font-bold font-telugu">
            Privacy & Compliance Master Center
          </h2>
          <p className="text-xs text-gray-300 max-w-xl">
            Monitor Data Principal rights requests, consent audits, third-party data processors register, policy versions, and security incident readiness.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur p-4 rounded-2xl border border-white/10 text-xs text-white shrink-0 space-y-1">
          <p>Active Policy Version: <strong className="text-amber-300 font-mono">{settings.privacyPolicyVersion || 'v1.0-2025'}</strong></p>
          <p>Grievance Response SLA: <strong className="text-amber-300">{settings.privacyResponseSlaDays || 90} Days</strong></p>
          <p>Marketing Consent Mode: <strong className="text-emerald-400">Strict Opt-In</strong></p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-bold uppercase">Privacy Requests</span>
            <div className="text-2xl font-extrabold text-gray-900 mt-1">{requests.length}</div>
            <span className="text-[11px] text-amber-600 font-semibold">{openRequestsCount} Open Pending</span>
          </div>
          <div className="p-3 bg-brand-50 text-brand-600 rounded-2xl">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-bold uppercase">Consent Audit Logs</span>
            <div className="text-2xl font-extrabold text-gray-900 mt-1">{consentRecords.length}</div>
            <span className="text-[11px] text-emerald-600 font-semibold">Real-Time Tracked</span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-bold uppercase">Data Processors</span>
            <div className="text-2xl font-extrabold text-gray-900 mt-1">{processors.length}</div>
            <span className="text-[11px] text-gray-500">Firebase, Razorpay, Logistics</span>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
            <Server className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-bold uppercase">Security Incidents</span>
            <div className="text-2xl font-extrabold text-gray-900 mt-1">{incidents.length}</div>
            <span className="text-[11px] text-emerald-600 font-semibold">72-Hr Notification Ready</span>
          </div>
          <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
            <AlertOctagon className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <Link
          to="/admin/privacy-requests"
          className="p-5 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition space-y-3 group"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-900 text-sm">Privacy Requests Queue</h3>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-xs text-gray-500">View and update customer requests for data access, correction, erasure, or grievances.</p>
        </Link>

        <Link
          to="/admin/privacy-versions"
          className="p-5 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition space-y-3 group"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-900 text-sm">Policy Versions Manager</h3>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-xs text-gray-500">Draft, edit, version, and publish bilingual Privacy Policy documents.</p>
        </Link>

        <Link
          to="/admin/privacy-processors"
          className="p-5 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition space-y-3 group"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-900 text-sm">Data Processors Register</h3>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-xs text-gray-500">Manage third-party providers (Firebase, Razorpay, Logistics) receiving customer data.</p>
        </Link>

        <Link
          to="/admin/privacy-breaches"
          className="p-5 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition space-y-3 group"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-900 text-sm">Security Incident Log</h3>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-xs text-gray-500">Record data security incidents with risk assessments and DPDP board reporting status.</p>
        </Link>

      </div>

      {/* Recent Requests Table */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="font-bold text-gray-900 text-base">Recent Data Rights Requests</h3>
          <Link to="/admin/privacy-requests" className="text-xs text-brand-600 font-bold hover:underline">
            View All ({requests.length}) →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b">
              <tr>
                <th className="p-3">Request Number</th>
                <th className="p-3">Type</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Preferred Contact</th>
                <th className="p-3">Status</th>
                <th className="p-3">Created Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {requests.slice(0, 5).map((r) => (
                <tr key={r.id}>
                  <td className="p-3 font-mono font-bold text-brand-700">{r.requestNumber}</td>
                  <td className="p-3 uppercase font-semibold text-[10px] text-gray-600">{r.requestType}</td>
                  <td className="p-3">
                    <span className="font-bold block text-gray-900">{r.customerName}</span>
                    <span className="text-[10px] text-gray-400">{r.customerPhone}</span>
                  </td>
                  <td className="p-3 capitalize">{r.preferredContact}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      r.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3 text-[11px]">{new Date(r.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
