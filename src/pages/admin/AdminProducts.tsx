import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Copy, Eye, Check, X } from 'lucide-react';
import { dbService, useLiveDatabase } from '../../services/db';
import { Product } from '../../types';
import { ProductFormModal } from './ProductFormModal';

export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(() => dbService.getProducts());
  const categories = dbService.getCategories();
  const dbVersion = useLiveDatabase();

  useEffect(() => {
    setProducts(dbService.getProducts());
  }, [dbVersion]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [selectedProductForEdit, setSelectedProductForEdit] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const refreshProducts = () => {
    setProducts(dbService.getProducts());
  };


  const handleToggleActive = (product: Product) => {
    const updated = { ...product, isActive: !product.isActive };
    dbService.saveProduct(updated);
    refreshProducts();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dbService.deleteProduct(id);
      refreshProducts();
    }
  };

  const handleDuplicate = (product: Product) => {
    const copy: Product = {
      ...product,
      id: `prod-${Date.now()}`,
      sku: `${product.sku}-COPY`,
      name_en: `${product.name_en} (Copy)`,
      name_te: `${product.name_te} (నకలు)`,
      slug: `${product.slug}-copy-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dbService.saveProduct(copy);
    refreshProducts();
  };

  const filteredProducts = products.filter(p => {
    if (selectedCat !== 'all' && p.categoryId !== selectedCat) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return p.name_en.toLowerCase().includes(q) || p.name_te.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Product Management</h2>
          <p className="text-xs text-gray-500">Manage all dynamic e-commerce products, variants, prices, stock and bilingual titles.</p>
        </div>

        <button
          onClick={() => { setSelectedProductForEdit(null); setIsModalOpen(true); }}
          className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow flex items-center gap-2 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by name, Telugu name, or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-brand-500"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <select
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
          className="bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none"
        >
          <option value="all">All Categories ({products.length})</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name_en}</option>
          ))}
        </select>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase">
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price / MRP</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-400">No products found.</td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const cat = categories.find(c => c.id === p.categoryId);
                  return (
                    <tr key={p.id} className="hover:bg-gray-50/50 transition">
                      <td className="p-4 flex items-center gap-3">
                        <img src={p.images[0]} alt="" className="w-12 h-12 object-cover rounded-xl border border-gray-200" />
                        <div>
                          <strong className="text-gray-900 font-bold block">{p.name_en}</strong>
                          <span className="text-[11px] text-gray-500 font-telugu block">{p.name_te}</span>
                          <span className="text-[10px] text-gray-400 font-mono">SKU: {p.sku}</span>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="bg-brand-50 text-brand-700 text-[10px] font-bold px-2.5 py-1 rounded-full">
                          {cat?.name_en || 'General'}
                        </span>
                      </td>

                      <td className="p-4">
                        <span className="font-extrabold text-brand-500 text-sm">₹{p.price}</span>
                        {p.mrp > p.price && (
                          <span className="text-gray-400 text-xs line-through ml-1.5">₹{p.mrp}</span>
                        )}
                      </td>

                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          p.stock > 10 ? 'bg-emerald-100 text-emerald-800' : p.stock > 0 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {p.stock} units
                        </span>
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() => handleToggleActive(p)}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold transition ${
                            p.isActive ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {p.isActive ? 'Active' : 'Disabled'}
                        </button>
                      </td>

                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => { setSelectedProductForEdit(p); setIsModalOpen(true); }}
                          className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDuplicate(p)}
                          className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg"
                          title="Duplicate Product"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ProductFormModal
          product={selectedProductForEdit}
          onClose={() => setIsModalOpen(false)}
          onSaved={refreshProducts}
        />
      )}

    </div>
  );
};
