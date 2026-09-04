import React from 'react';
import { Users, Phone, Mail, MapPin } from 'lucide-react';
import { dbService } from '../../services/db';

export const AdminCustomers: React.FC = () => {
  const customers = dbService.getCustomers();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Customer Directory</h2>
          <p className="text-xs text-gray-500">View customer profile details, order histories and total lifetime value.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6">
        {customers.length === 0 ? (
          <p className="text-xs text-gray-400 py-8 text-center">No customers registered yet. Customers are recorded automatically upon checkout.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase">
                  <th className="p-3">Customer</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Total Orders</th>
                  <th className="p-3">Lifetime Value</th>
                  <th className="p-3">Primary Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {customers.map((c) => (
                  <tr key={c.id}>
                    <td className="p-3 font-bold text-gray-900">{c.name}</td>
                    <td className="p-3 space-y-0.5">
                      <div className="flex items-center gap-1 text-gray-700">
                        <Phone className="w-3.5 h-3.5 text-brand-500" />
                        <span>{c.phone}</span>
                      </div>
                      {c.email && (
                        <div className="flex items-center gap-1 text-gray-500 text-[11px]">
                          <Mail className="w-3.5 h-3.5" />
                          <span>{c.email}</span>
                        </div>
                      )}
                    </td>
                    <td className="p-3 font-bold text-gray-900">{c.totalOrders}</td>
                    <td className="p-3 font-extrabold text-brand-500">₹{c.totalSpent}</td>
                    <td className="p-3 text-gray-600 max-w-xs truncate">
                      {c.addresses[0] ? `${c.addresses[0].addressLine}, ${c.addresses[0].city}` : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
