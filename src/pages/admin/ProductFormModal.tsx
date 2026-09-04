import React, { useState } from 'react';
import { X, Plus, Trash2, Image, Layers, Tag, Check, HelpCircle, Table } from 'lucide-react';
import { Product, ProductVariant, SpecificationItem, FAQItem } from '../../types';
import { dbService } from '../../services/db';
import { ImageUploader } from '../../components/common/ImageUploader';

interface ProductFormModalProps {
  product?: Product | null;
  onClose: () => void;
  onSaved: () => void;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({ product, onClose, onSaved }) => {
  const categories = dbService.getCategories();

  const [activeTab, setActiveTab] = useState<'basic' | 'pricing' | 'variants' | 'images' | 'details' | 'seo'>('basic');

  const [formData, setFormData] = useState<Partial<Product>>(() => {
    if (product) return { ...product };
    return {
      id: `prod-${Date.now()}`,
      sku: `GH-NEW-${Math.floor(100 + Math.random() * 900)}`,
      slug: '',
      name_en: '',
      name_te: '',
      categoryId: categories[0]?.id || '',
      price: 199,
      mrp: 249,
      discount: 20,
      stock: 50,
      unit: '1 kg',
      images: ['https://images.unsplash.com/photo-1546445317-29f4545f9d52?w=800'],
      description_en: '',
      description_te: '',
      benefits_en: ['100% Organic & Chemical Free'],
      benefits_te: ['100% సేంద్రీయ & రసాయన రహిత'],
      usage_en: ['Use as directed'],
      usage_te: ['తగినంత పరిమాణంలో ఉపయోగించండి'],
      specifications: [{ key_en: 'Origin', key_te: 'మూలం', value_en: 'Godavari', value_te: 'గోదావరి' }],
      faqs: [],
      variants: [],
      tags: ['Organic', 'Desi Cow'],
      isFeatured: false,
      isActive: true,
      rating: 4.9,
      reviewsCount: 10,
    };
  });

  // Variant helper
  const [variantForm, setVariantForm] = useState<Partial<ProductVariant>>({
    name_en: '',
    name_te: '',
    weightUnit: '1 kg',
    price: 199,
    mrp: 249,
    stock: 50,
    sku: '',
  });

  const handleAddVariant = () => {
    if (!variantForm.name_en) return;
    const newVariant: ProductVariant = {
      id: `var-${Date.now()}`,
      name_en: variantForm.name_en || '',
      name_te: variantForm.name_te || variantForm.name_en || '',
      weightUnit: variantForm.weightUnit || '1 kg',
      price: Number(variantForm.price) || 0,
      mrp: Number(variantForm.mrp) || 0,
      stock: Number(variantForm.stock) || 0,
      sku: variantForm.sku || `${formData.sku}-V${(formData.variants?.length || 0) + 1}`,
    };
    setFormData(prev => ({
      ...prev,
      variants: [...(prev.variants || []), newVariant]
    }));
    setVariantForm({ name_en: '', name_te: '', weightUnit: '1 kg', price: 199, mrp: 249, stock: 50, sku: '' });
  };

  const handleRemoveVariant = (id: string) => {
    setFormData(prev => ({
      ...prev,
      variants: (prev.variants || []).filter(v => v.id !== id)
    }));
  };

  const handleUpdateVariantPrice = (id: string, field: 'price' | 'mrp' | 'stock', val: number) => {
    setFormData(prev => ({
      ...prev,
      variants: (prev.variants || []).map(v => v.id === id ? { ...v, [field]: val } : v)
    }));
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name_en || !formData.name_te) {
      alert('Please fill in Telugu and English product names.');
      return;
    }

    const slug = formData.slug || formData.name_en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Synchronize variant prices if product has 1 variant or if main price was updated
    let updatedVariants = formData.variants || [];
    if (updatedVariants.length === 1) {
      updatedVariants = updatedVariants.map(v => ({
        ...v,
        price: Number(formData.price) || v.price,
        mrp: Number(formData.mrp) || v.mrp,
        stock: Number(formData.stock) || v.stock,
      }));
    }

    const finalProduct: Product = {
      ...(formData as Product),
      variants: updatedVariants,
      slug,
      updatedAt: new Date().toISOString(),
    };

    dbService.saveProduct(finalProduct);
    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-brand-900 text-white flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg font-telugu">
              {product ? 'ఉత్పత్తి సవరణ (Edit Product)' : 'కొత్త ఉత్పత్తిని చేర్చండి (Add Product)'}
            </h3>
            <span className="text-xs text-amber-300 font-mono">SKU: {formData.sku}</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 bg-gray-50 overflow-x-auto px-6">
          {[
            { id: 'basic', label: '1. Basic Info' },
            { id: 'pricing', label: '2. Pricing & Stock' },
            { id: 'variants', label: '3. Variants' },
            { id: 'images', label: '4. Images' },
            { id: 'details', label: '5. Benefits & Specs' },
            { id: 'seo', label: '6. SEO Metadata' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition ${
                activeTab === tab.id
                  ? 'border-brand-500 text-brand-500 bg-white'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Tab 1: Basic Info */}
          {activeTab === 'basic' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    English Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name_en || ''}
                    onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                    placeholder="e.g. Ghana Jeevamrutham"
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    తెలుగు పేరు (Telugu Product Name) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name_te || ''}
                    onChange={(e) => setFormData({ ...formData, name_te: e.target.value })}
                    placeholder="ఉదా: ఘన జీవామృతం"
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-brand-500 focus:outline-none font-telugu"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Category *</label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-brand-500 focus:outline-none"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name_en} ({c.name_te})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">SKU Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.sku || ''}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">English Description</label>
                <textarea
                  rows={3}
                  value={formData.description_en || ''}
                  onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">తెలుగు వివరణ (Telugu Description)</label>
                <textarea
                  rows={3}
                  value={formData.description_te || ''}
                  onChange={(e) => setFormData({ ...formData, description_te: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-brand-500 focus:outline-none font-telugu"
                />
              </div>

              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-gray-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive ?? true}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded text-brand-500 focus:ring-brand-500 w-4 h-4"
                  />
                  <span>Active (Visible in Shop)</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-gray-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured ?? false}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded text-brand-500 focus:ring-brand-500 w-4 h-4"
                  />
                  <span>Featured Product (Homepage Showcase)</span>
                </label>
              </div>
            </div>
          )}

          {/* Tab 2: Pricing & Stock */}
          {activeTab === 'pricing' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Selling Price (₹) *</label>
                <input
                  type="number"
                  required
                  value={formData.price || 0}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">MRP Price (₹) *</label>
                <input
                  type="number"
                  required
                  value={formData.mrp || 0}
                  onChange={(e) => setFormData({ ...formData, mrp: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Available Stock *</label>
                <input
                  type="number"
                  required
                  value={formData.stock || 0}
                  onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Unit / Weight (e.g. 1 kg, 500 ml)</label>
                <input
                  type="text"
                  value={formData.unit || ''}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-brand-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Tab 3: Variants Manager */}
          {activeTab === 'variants' && (
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
                <h4 className="font-bold text-xs uppercase text-gray-700">Add New Variant</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <input
                    type="text"
                    placeholder="Variant Name (e.g. 5 kg Pack)"
                    value={variantForm.name_en || ''}
                    onChange={(e) => setVariantForm({ ...variantForm, name_en: e.target.value })}
                    className="px-3 py-1.5 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Weight/Unit (5 kg)"
                    value={variantForm.weightUnit || ''}
                    onChange={(e) => setVariantForm({ ...variantForm, weightUnit: e.target.value })}
                    className="px-3 py-1.5 border rounded-lg"
                  />
                  <input
                    type="number"
                    placeholder="Price (₹)"
                    value={variantForm.price || ''}
                    onChange={(e) => setVariantForm({ ...variantForm, price: Number(e.target.value) })}
                    className="px-3 py-1.5 border rounded-lg"
                  />
                  <input
                    type="number"
                    placeholder="MRP (₹)"
                    value={variantForm.mrp || ''}
                    onChange={(e) => setVariantForm({ ...variantForm, mrp: Number(e.target.value) })}
                    className="px-3 py-1.5 border rounded-lg"
                  />
                  <input
                    type="number"
                    placeholder="Stock"
                    value={variantForm.stock || ''}
                    onChange={(e) => setVariantForm({ ...variantForm, stock: Number(e.target.value) })}
                    className="px-3 py-1.5 border rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={handleAddVariant}
                    className="bg-brand-500 text-white font-bold rounded-lg px-4 py-1.5 hover:bg-brand-600 transition"
                  >
                    + Add Variant
                  </button>
                </div>
              </div>

              {/* Variant List Table */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase text-gray-700">Active Variants</h4>
                {(!formData.variants || formData.variants.length === 0) ? (
                  <p className="text-xs text-gray-400">No custom variants added. Single product pricing will apply.</p>
                ) : (
                  <div className="divide-y divide-gray-100 border rounded-xl overflow-hidden text-xs">
                    {formData.variants.map((v) => (
                      <div key={v.id} className="p-3 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <strong className="text-gray-900 block font-bold">{v.name_en} ({v.weightUnit})</strong>
                          <span className="text-gray-400 text-[10px]">SKU: {v.sku}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div>
                            <label className="text-[9px] text-gray-500 block font-bold">Price (₹)</label>
                            <input
                              type="number"
                              value={v.price}
                              onChange={(e) => handleUpdateVariantPrice(v.id, 'price', Number(e.target.value))}
                              className="w-16 px-2 py-1 text-xs border rounded font-bold text-brand-500"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] text-gray-500 block font-bold">MRP (₹)</label>
                            <input
                              type="number"
                              value={v.mrp}
                              onChange={(e) => handleUpdateVariantPrice(v.id, 'mrp', Number(e.target.value))}
                              className="w-16 px-2 py-1 text-xs border rounded text-gray-500"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] text-gray-500 block font-bold">Stock</label>
                            <input
                              type="number"
                              value={v.stock}
                              onChange={(e) => handleUpdateVariantPrice(v.id, 'stock', Number(e.target.value))}
                              className="w-16 px-2 py-1 text-xs border rounded font-semibold"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveVariant(v.id)}
                            className="text-red-500 hover:text-red-700 ml-2 p-1"
                            title="Delete Variant"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 4: Images */}
          {activeTab === 'images' && (
            <div className="space-y-4">
              <ImageUploader
                label="Add New Product Image (Uploads to Firebase Storage)"
                value=""
                folder="products"
                onChange={(newUrl) => {
                  if (newUrl) {
                    setFormData(prev => ({
                      ...prev,
                      images: [...(prev.images || []), newUrl]
                    }));
                  }
                }}
              />

              <div className="space-y-2 pt-2 border-t border-gray-100">
                <label className="text-xs font-bold text-gray-700 block">
                  Current Product Gallery ({formData.images?.length || 0} Images)
                </label>

                {(!formData.images || formData.images.length === 0) ? (
                  <p className="text-xs text-gray-400">No images added yet.</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {formData.images.map((img, i) => (
                      <div key={i} className="relative group rounded-xl overflow-hidden border border-gray-200 bg-white p-1 shadow-sm">
                        <img src={img} alt="" className="w-full h-24 object-cover rounded-lg" />
                        <div className="absolute top-2 right-2 flex gap-1">
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, images: formData.images?.filter((_, idx) => idx !== i) })}
                            className="bg-red-600 text-white rounded-full p-1 shadow hover:bg-red-700 transition"
                            title="Delete Image"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}


          {/* Tab 5: Benefits & Specs */}
          {activeTab === 'details' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Product Benefits (English - One per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.benefits_en?.join('\n') || ''}
                  onChange={(e) => setFormData({ ...formData, benefits_en: e.target.value.split('\n') })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  ఉత్పత్తి ప్రయోజనాలు (Telugu - One per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.benefits_te?.join('\n') || ''}
                  onChange={(e) => setFormData({ ...formData, benefits_te: e.target.value.split('\n') })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-brand-500 focus:outline-none font-telugu"
                />
              </div>
            </div>
          )}

          {/* Tab 6: SEO */}
          {activeTab === 'seo' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">SEO Title (English)</label>
                <input
                  type="text"
                  value={formData.seoTitle_en || ''}
                  onChange={(e) => setFormData({ ...formData, seoTitle_en: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">SEO Description (English)</label>
                <textarea
                  rows={3}
                  value={formData.seoDescription_en || ''}
                  onChange={(e) => setFormData({ ...formData, seoDescription_en: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-brand-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Footer Submit */}
          <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-gray-100 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-brand-500 text-white text-xs font-bold rounded-xl shadow hover:bg-brand-600 transition"
            >
              Save Product
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
