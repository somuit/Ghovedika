import React, { useState } from 'react';
import { Plus, Tag, Edit2, Trash2 } from 'lucide-react';
import { dbService } from '../../services/db';
import { Coupon } from '../../types';

export const AdminCoupons: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>(() => dbService.getCoupons());
  const [editingCoupon, setEditingCoupon] = useState<Partial<Coupon> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const refresh = () => setCoupons(dbService.getCoupons());

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCoupon?.code || !editingCoupon?.discountValue) return;

    const couponToSave: Coupon = {
      id: editingCoupon.id || `coup-${Date.now()}`,
      code: editingCoupon.code.toUpperCase().trim(),
      discountType: editingCoupon.discountType || 'percentage',
      discountValue: Number(editingCoupon.discountValue) || 10,
      minOrderValue: Number(editingCoupon.minOrderValue) || 0,
      maxDiscount: editingCoupon.maxDiscount ? Number(editingCoupon.maxDiscount) : undefined,
      expiryDate: editingCoupon.expiryDate || '2026-12-31',
      usageLimit: Number(editingCoupon.usageLimit) || 100,
      timesUsed: editingCoupon.timesUsed || 0,
      isActive: editingCoupon.isActive ?? true,
    };

    dbService.saveCoupon(couponToSave);
    refresh();
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete coupon?')) {
      dbService.deleteCoupon(id);
      refresh();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Discount Coupons Management</h2>
          <p className="text-xs text-gray-500">Configure promotional discount codes, minimum order caps and usage limits.</p>
        </div>
        <button
          onClick={() => { setEditingCoupon({}); setIsModalOpen(true); }}
          className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Coupon Code</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((c) => (
          <div key={c.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-brand-500 text-lg uppercase tracking-wider bg-brand-50 px-3 py-1 rounded-xl border border-brand-100">
                  {c.code}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white ${c.isActive ? 'bg-emerald-600' : 'bg-gray-400'}`}>
                  {c.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p className="text-xs font-bold text-gray-800 pt-2">
                Discount: {c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `₹${c.discountValue} FLAT OFF`}
              </p>
              <p className="text-[11px] text-gray-500">Min Order Value: ₹{c.minOrderValue}</p>
              {c.maxDiscount && <p className="text-[11px] text-gray-500">Max Cap: ₹{c.maxDiscount}</p>}
            </div>

            <div className="pt-3 border-t border-gray-100 flex justify-between items-center text-xs">
              <span className="text-gray-400">Used: {c.timesUsed} / {c.usageLimit}</span>
              <div className="space-x-2">
                <button onClick={() => { setEditingCoupon(c); setIsModalOpen(true); }} className="p-1.5 bg-gray-100 rounded">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(c.id)} className="p-1.5 bg-red-50 text-red-600 rounded">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 rounded-3xl shadow-2xl space-y-4">
            <h3 className="font-bold text-lg text-gray-900">Coupon Form</h3>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Coupon Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. GHOVEDIKA20"
                  value={editingCoupon?.code || ''}
                  onChange={(e) => setEditingCoupon({ ...editingCoupon, code: e.target.value })}
                  className="w-full p-2 border rounded-xl uppercase font-bold text-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Discount Type</label>
                  <select
                    value={editingCoupon?.discountType || 'percentage'}
                    onChange={(e) => setEditingCoupon({ ...editingCoupon, discountType: e.target.value as any })}
                    className="w-full p-2 border rounded-xl font-semibold"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="flat">Flat Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Discount Value *</label>
                  <input
                    type="number"
                    required
                    value={editingCoupon?.discountValue || 10}
                    onChange={(e) => setEditingCoupon({ ...editingCoupon, discountValue: Number(e.target.value) })}
                    className="w-full p-2 border rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Min Order Value (₹)</label>
                  <input
                    type="number"
                    value={editingCoupon?.minOrderValue || 0}
                    onChange={(e) => setEditingCoupon({ ...editingCoupon, minOrderValue: Number(e.target.value) })}
                    className="w-full p-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Max Discount Cap (₹)</label>
                  <input
                    type="number"
                    value={editingCoupon?.maxDiscount || ''}
                    onChange={(e) => setEditingCoupon({ ...editingCoupon, maxDiscount: Number(e.target.value) })}
                    className="w-full p-2 border rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-100 rounded-xl">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-brand-500 text-white font-bold rounded-xl">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
