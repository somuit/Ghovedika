import React, { useState } from 'react';
import { Boxes, AlertTriangle, ArrowUpRight, Plus, Minus, History } from 'lucide-react';
import { dbService } from '../../services/db';

export const AdminInventory: React.FC = () => {
  const [products, setProducts] = useState(() => dbService.getProducts());
  const logs = dbService.getInventoryLogs();

  const refresh = () => setProducts(dbService.getProducts());

  const handleAdjustStock = (productId: string, variantId: string | undefined, delta: number) => {
    const reason = window.prompt('Reason for stock adjustment:', 'Manual Admin Stock Adjustment');
    if (reason !== null) {
      dbService.updateProductStock(productId, variantId, delta, reason);
      refresh();
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Inventory Control & Stock Adjustments</h2>
          <p className="text-xs text-gray-500">Monitor product stock levels, low-stock thresholds, and view audit transaction logs.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Stock List Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6 space-y-4">
          <h3 className="font-bold text-gray-900 text-base flex items-center gap-2 border-b border-gray-100 pb-3">
            <Boxes className="w-5 h-5 text-brand-500" />
            <span>Product Inventory Levels</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase">
                  <th className="p-3">Product</th>
                  <th className="p-3">SKU</th>
                  <th className="p-3">Stock Level</th>
                  <th className="p-3 text-right">Stock Adjustment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((p) => (
                  <tr key={p.id}>
                    <td className="p-3 font-bold text-gray-900">{p.name_en}</td>
                    <td className="p-3 font-mono text-gray-500 text-[11px]">{p.sku}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        p.stock > 10 ? 'bg-emerald-100 text-emerald-800' : p.stock > 0 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {p.stock} units
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-1">
                      <button
                        onClick={() => handleAdjustStock(p.id, undefined, 10)}
                        className="px-2 py-1 bg-emerald-50 text-emerald-700 font-bold rounded text-[11px] hover:bg-emerald-100"
                      >
                        +10
                      </button>
                      <button
                        onClick={() => handleAdjustStock(p.id, undefined, -5)}
                        className="px-2 py-1 bg-red-50 text-red-700 font-bold rounded text-[11px] hover:bg-red-100"
                      >
                        -5
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Audit Log Sidebar */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-900 text-base flex items-center gap-2 border-b border-gray-100 pb-3">
            <History className="w-5 h-5 text-amber-500" />
            <span>Audit Transaction Log</span>
          </h3>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1 text-xs">
            {logs.length === 0 ? (
              <p className="text-gray-400 text-center py-4">No stock movements logged yet.</p>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                  <div className="flex justify-between font-bold text-gray-900">
                    <span>{log.productName}</span>
                    <span className={log.changeType === 'addition' ? 'text-emerald-600' : 'text-red-600'}>
                      {log.changeType === 'addition' ? `+${log.quantity}` : `-${log.quantity}`}
                    </span>
                  </div>
                  <p className="text-gray-500 text-[11px]">{log.reason}</p>
                  <span className="text-[10px] text-gray-400 block">{new Date(log.createdAt).toLocaleString()}</span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
