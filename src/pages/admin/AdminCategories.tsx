import React, { useState } from 'react';
import { Plus, Edit2, Trash2, FolderTree } from 'lucide-react';
import { dbService } from '../../services/db';
import { Category } from '../../types';
import { ImageUploader } from '../../components/common/ImageUploader';


export const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(() => dbService.getCategories());
  const [editingCat, setEditingCat] = useState<Partial<Category> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const refresh = () => setCategories(dbService.getCategories());

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCat?.name_en || !editingCat?.name_te) return;

    const slug = editingCat.slug || editingCat.name_en.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const catToSave: Category = {
      id: editingCat.id || `cat-${Date.now()}`,
      slug,
      name_en: editingCat.name_en,
      name_te: editingCat.name_te,
      description_en: editingCat.description_en || '',
      description_te: editingCat.description_te || '',
      image: editingCat.image || 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600',
      sortOrder: Number(editingCat.sortOrder) || 1,
      isActive: editingCat.isActive ?? true,
    };

    dbService.saveCategory(catToSave);
    refresh();
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete category?')) {
      dbService.deleteCategory(id);
      refresh();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Category Management</h2>
          <p className="text-xs text-gray-500">Configure bilingual category names, descriptions, images and display order.</p>
        </div>
        <button
          onClick={() => { setEditingCat({}); setIsModalOpen(true); }}
          className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((c) => (
          <div key={c.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="h-36 relative bg-gray-100">
              <img src={c.image} alt="" className="w-full h-full object-cover" />
              <span className={`absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold text-white ${
                c.isActive ? 'bg-emerald-600' : 'bg-gray-400'
              }`}>
                {c.isActive ? 'Active' : 'Disabled'}
              </span>
            </div>

            <div className="p-4 space-y-2">
              <h3 className="font-bold text-gray-900 text-sm">{c.name_en}</h3>
              <p className="text-xs font-telugu text-brand-500 font-semibold">{c.name_te}</p>
              <p className="text-[11px] text-gray-500 line-clamp-2">{c.description_en}</p>
            </div>

            <div className="p-4 pt-0 border-t border-gray-100 flex justify-between items-center text-xs">
              <span className="text-gray-400 font-semibold">Order: #{c.sortOrder}</span>
              <div className="space-x-2">
                <button onClick={() => { setEditingCat(c); setIsModalOpen(true); }} className="p-1.5 bg-gray-100 rounded text-gray-700">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(c.id)} className="p-1.5 bg-red-50 rounded text-red-600">
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
            <h3 className="font-bold text-lg text-gray-900">Category Form</h3>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">English Category Name *</label>
                <input
                  type="text"
                  required
                  value={editingCat?.name_en || ''}
                  onChange={(e) => setEditingCat({ ...editingCat, name_en: e.target.value })}
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">తెలుగు పేరు (Telugu Name) *</label>
                <input
                  type="text"
                  required
                  value={editingCat?.name_te || ''}
                  onChange={(e) => setEditingCat({ ...editingCat, name_te: e.target.value })}
                  className="w-full p-2 border rounded-xl font-telugu"
                />
              </div>

              <div>
                <ImageUploader
                  label="Category Image (Upload to Firebase Storage)"
                  value={editingCat?.image || ''}
                  onChange={(newUrl) => setEditingCat({ ...editingCat, image: newUrl })}
                  folder="categories"
                />
              </div>


              <div>
                <label className="font-bold text-gray-700 block mb-1">Sort Order</label>
                <input
                  type="number"
                  value={editingCat?.sortOrder || 1}
                  onChange={(e) => setEditingCat({ ...editingCat, sortOrder: Number(e.target.value) })}
                  className="w-full p-2 border rounded-xl"
                />
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
