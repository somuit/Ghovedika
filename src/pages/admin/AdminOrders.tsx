import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Eye, Printer, Truck, CheckCircle2, Clock, X } from 'lucide-react';
import { dbService } from '../../services/db';
import { Order, OrderStatus, PaymentStatus } from '../../types';

export const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(() => dbService.getOrders());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const refresh = () => setOrders(dbService.getOrders());

  const handleUpdateStatus = (id: string, status: OrderStatus, trackingNo?: string, notes?: string) => {
    dbService.updateOrderStatus(id, status, trackingNo, notes);
    refresh();
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder(dbService.getOrderById(id) || null);
    }
  };

  const handleUpdatePayment = (id: string, status: PaymentStatus) => {
    dbService.updatePaymentStatus(id, status);
    refresh();
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder(dbService.getOrderById(id) || null);
    }
  };

  const filteredOrders = orders.filter(o => {
    if (statusFilter !== 'all' && o.orderStatus !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return o.orderNumber.toLowerCase().includes(q) || 
             o.customerName.toLowerCase().includes(q) || 
             o.customerPhone.includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Order Management & Processing</h2>
          <p className="text-xs text-gray-500">Track live orders, update delivery status, enter tracking numbers and print invoices.</p>
        </div>
      </div>

      {/* Search & Status Filter */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-center text-xs">
        <div className="relative flex-1 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by Order #, Customer Name, or Phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-brand-500"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 font-semibold text-gray-800 focus:outline-none"
        >
          <option value="all">All Order Statuses ({orders.length})</option>
          <option value="placed">Placed</option>
          <option value="confirmed">Confirmed</option>
          <option value="processing">Processing</option>
          <option value="packed">Packed</option>
          <option value="shipped">Shipped</option>
          <option value="out_for_delivery">Out for Delivery</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase">
                <th className="p-4">Order #</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Total</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-400">No orders match criteria.</td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-gray-50/50 transition">
                    <td className="p-4 font-bold text-brand-500">#{ord.orderNumber}</td>
                    <td className="p-4">
                      <strong className="text-gray-900 block">{ord.customerName}</strong>
                      <span className="text-gray-500 text-[11px]">{ord.customerPhone}</span>
                    </td>
                    <td className="p-4 font-extrabold text-gray-900">₹{ord.totalAmount}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        ord.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {ord.paymentMethod} ({ord.paymentStatus})
                      </span>
                    </td>
                    <td className="p-4">
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => handleUpdateStatus(ord.id, e.target.value as OrderStatus)}
                        className="bg-gray-50 border border-gray-300 rounded px-2 py-1 text-[11px] font-bold text-gray-800 focus:outline-none"
                      >
                        <option value="placed">Placed</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Processing</option>
                        <option value="packed">Packed</option>
                        <option value="shipped">Shipped</option>
                        <option value="out_for_delivery">Out for Delivery</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="px-3 py-1 bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold rounded-lg text-[11px] flex items-center gap-1 ml-auto"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Manage Order</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white max-w-2xl w-full rounded-3xl shadow-2xl p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-bold text-lg text-brand-900">Order #{selectedOrder.orderNumber}</h3>
                <span className="text-xs text-gray-400">Date: {new Date(selectedOrder.createdAt).toLocaleString()}</span>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-1 hover:bg-gray-100 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-gray-50 p-4 rounded-2xl border border-gray-200">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Update Status Timeline</label>
                <select
                  value={selectedOrder.orderStatus}
                  onChange={(e) => handleUpdateStatus(selectedOrder.id, e.target.value as OrderStatus)}
                  className="w-full p-2 border rounded-xl font-bold bg-white"
                >
                  <option value="placed">Placed</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="packed">Packed</option>
                  <option value="shipped">Shipped</option>
                  <option value="out_for_delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Update Payment Status</label>
                <select
                  value={selectedOrder.paymentStatus}
                  onChange={(e) => handleUpdatePayment(selectedOrder.id, e.target.value as PaymentStatus)}
                  className="w-full p-2 border rounded-xl font-bold bg-white"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="failed">Failed</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-gray-700 block mb-1">Courier Tracking Number</label>
                <input
                  type="text"
                  placeholder="e.g. DTDC-88492019"
                  value={selectedOrder.trackingNumber || ''}
                  onChange={(e) => handleUpdateStatus(selectedOrder.id, selectedOrder.orderStatus, e.target.value, selectedOrder.internalNotes)}
                  className="w-full p-2 border rounded-xl bg-white"
                />
              </div>
            </div>

            {/* Address */}
            <div className="text-xs space-y-1 bg-brand-50/50 p-4 rounded-xl border border-brand-100">
              <strong className="text-brand-900 block font-bold">Shipping Address:</strong>
              <p className="font-semibold text-gray-800">{selectedOrder.shippingAddress.fullName} ({selectedOrder.shippingAddress.phone})</p>
              <p className="text-gray-600">{selectedOrder.shippingAddress.addressLine}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}</p>
            </div>

            {/* Items */}
            <div className="space-y-2 text-xs">
              <strong className="text-gray-900 block font-bold">Order Items:</strong>
              <div className="divide-y divide-gray-100 border rounded-xl overflow-hidden">
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="p-3 bg-white flex justify-between items-center">
                    <span>{item.productName_en} x {item.quantity}</span>
                    <span className="font-bold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
              <Link
                to={`/order-confirmation/${selectedOrder.id}`}
                target="_blank"
                className="px-4 py-2 bg-brand-earth text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Invoice</span>
              </Link>
              <button onClick={() => setSelectedOrder(null)} className="px-4 py-2 bg-gray-100 text-xs font-bold rounded-xl">Close</button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
