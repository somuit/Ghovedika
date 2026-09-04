import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  IndianRupee, ShoppingCart, Clock, CheckCircle2, 
  Users, ShoppingBag, AlertTriangle, ArrowUpRight, Plus, Eye 
} from 'lucide-react';
import { dbService } from '../../services/db';
import { OrderStatus } from '../../types';
import { FirebaseSeedBanner } from '../../components/admin/FirebaseSeedBanner';

export const AdminDashboard: React.FC = () => {
  const orders = dbService.getOrders();
  const products = dbService.getProducts();
  const customers = dbService.getCustomers();

  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.totalAmount : 0), 0);
  const pendingOrders = orders.filter(o => o.orderStatus === 'placed' || o.orderStatus === 'confirmed');
  const completedOrders = orders.filter(o => o.orderStatus === 'delivered');
  const lowStockProducts = products.filter(p => p.stock <= 5);

  const [, setRefreshKey] = useState(0);

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    dbService.updateOrderStatus(orderId, status);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="space-y-8">
      
      {/* Firebase Database Connection & Seed Status */}
      <FirebaseSeedBanner />

      
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-gray-500 text-xs font-bold uppercase">
            <span>Total Revenue</span>
            <IndianRupee className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-gray-900">₹{totalRevenue}</p>
          <span className="text-[11px] text-emerald-600 font-semibold">Verified Paid Orders</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-gray-500 text-xs font-bold uppercase">
            <span>Total Orders</span>
            <ShoppingCart className="w-5 h-5 text-brand-500" />
          </div>
          <p className="text-3xl font-extrabold text-gray-900">{orders.length}</p>
          <span className="text-[11px] text-gray-500 font-semibold">{pendingOrders.length} Pending</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-gray-500 text-xs font-bold uppercase">
            <span>Products</span>
            <ShoppingBag className="w-5 h-5 text-brand-gold" />
          </div>
          <p className="text-3xl font-extrabold text-gray-900">{products.length}</p>
          <span className="text-[11px] text-amber-600 font-semibold">{lowStockProducts.length} Low Stock</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-gray-500 text-xs font-bold uppercase">
            <span>Customers</span>
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-extrabold text-gray-900">{customers.length || orders.length}</p>
          <span className="text-[11px] text-blue-600 font-semibold">Active Directory</span>
        </div>

      </div>

      {/* Main Grid: Recent Orders & Low Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-brand-500" />
              <span>Recent Customer Orders</span>
            </h3>
            <Link to="/admin/orders" className="text-xs font-bold text-brand-500 hover:underline">
              View All Orders →
            </Link>
          </div>

          {orders.length === 0 ? (
            <p className="text-xs text-gray-500 py-8 text-center">No orders placed yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase">
                    <th className="py-2">Order ID</th>
                    <th className="py-2">Customer</th>
                    <th className="py-2">Amount</th>
                    <th className="py-2">Payment</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.slice(0, 6).map((ord) => (
                    <tr key={ord.id}>
                      <td className="py-3 font-bold text-brand-500">#{ord.orderNumber}</td>
                      <td className="py-3">
                        <span className="font-bold text-gray-900 block">{ord.customerName}</span>
                        <span className="text-gray-400 text-[10px]">{ord.customerPhone}</span>
                      </td>
                      <td className="py-3 font-bold text-gray-900">₹{ord.totalAmount}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          ord.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {ord.paymentMethod} ({ord.paymentStatus})
                        </span>
                      </td>
                      <td className="py-3">
                        <select
                          value={ord.orderStatus}
                          onChange={(e) => handleStatusChange(ord.id, e.target.value as OrderStatus)}
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Low Stock Warning Sidebar */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span>Low Stock Alerts</span>
            </h3>
            <Link to="/admin/inventory" className="text-xs font-bold text-brand-500 hover:underline">
              Inventory →
            </Link>
          </div>

          {lowStockProducts.length === 0 ? (
            <p className="text-xs text-emerald-600 font-semibold py-8 text-center">
              All product stock levels are healthy!
            </p>
          ) : (
            <div className="space-y-3">
              {lowStockProducts.map((p) => (
                <div key={p.id} className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-gray-900">{p.name_en}</h4>
                    <span className="text-[10px] text-gray-500">{p.sku}</span>
                  </div>
                  <span className="bg-red-600 text-white font-extrabold px-2.5 py-1 rounded-full text-[11px]">
                    {p.stock} left
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
