import React, { useState, useEffect } from 'react';
import { Image, FileText, Plus, Edit2, Trash2, AlertCircle } from 'lucide-react';
import { dbService, useLiveDatabase } from '../../services/db';
import { Banner, CMSPage } from '../../types';
import { ImageUploader } from '../../components/common/ImageUploader';

export const AdminCMS: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>(() => dbService.getBanners());
  const [pages, setPages] = useState<CMSPage[]>(() => dbService.getPages());
  const [editingBanner, setEditingBanner] = useState<Partial<Banner> | null>(null);
  const [editingPage, setEditingPage] = useState<CMSPage | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const dbVersion = useLiveDatabase();

  const refresh = () => {
    setBanners(dbService.getBanners());
    setPages(dbService.getPages());
  };

  useEffect(() => {
    refresh();
  }, [dbVersion]);

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError(null);

    if (!editingBanner?.imageUrl) {
      setSaveError('Please upload or select a Banner Image.');
      return;
    }

    const titleEn = editingBanner.title_en || editingBanner.title_te || 'Special Banner Slide';

    const bannerToSave: Banner = {
      id: editingBanner.id || `ban-${Date.now()}`,
      title_en: titleEn,
      title_te: editingBanner.title_te || titleEn,
      subtitle_en: editingBanner.subtitle_en || '',
      subtitle_te: editingBanner.subtitle_te || '',
      imageUrl: editingBanner.imageUrl,
      linkUrl: editingBanner.linkUrl || '/shop',
      buttonText_en: editingBanner.buttonText_en || 'Shop Now',
      buttonText_te: editingBanner.buttonText_te || 'ఇప్పుడే కొనండి',
      position: 'hero',
      isActive: editingBanner.isActive ?? true,
      sortOrder: Number(editingBanner.sortOrder) || 1,
    };

    dbService.saveBanner(bannerToSave);
    refresh();
    setEditingBanner(null);
  };


  const handleSavePage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPage) return;
    dbService.savePage(editingPage);
    refresh();
    setEditingPage(null);
  };

  return (
    <div className="space-y-8">
      
      {/* Banner Section */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <div>
            <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
              <Image className="w-5 h-5 text-brand-500" />
              <span>Homepage Hero Banners</span>
            </h3>
            <p className="text-xs text-gray-500">Configure promotional slides, bilingual headings and banner image URLs.</p>
          </div>
          <button
            onClick={() => setEditingBanner({})}
            className="px-4 py-2 bg-brand-500 text-white font-bold text-xs rounded-xl shadow"
          >
            + Add Banner Slide
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {banners.map((b) => (
            <div key={b.id} className="border rounded-2xl overflow-hidden bg-gray-50 flex flex-col justify-between">
              <div className="h-32 relative">
                <img src={b.imageUrl} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 p-3 text-white flex flex-col justify-end">
                  <h4 className="font-bold text-sm leading-tight">{b.title_en}</h4>
                  <span className="text-xs font-telugu text-amber-300">{b.title_te}</span>
                </div>
              </div>
              <div className="p-3 flex justify-between items-center text-xs">
                <span className="text-gray-500">Link: {b.linkUrl}</span>
                <div className="space-x-2">
                  <button onClick={() => setEditingBanner(b)} className="p-1 bg-white border rounded">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => { dbService.deleteBanner(b.id); refresh(); }} className="p-1 bg-red-50 text-red-600 rounded">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Static Pages Section */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <div className="border-b border-gray-100 pb-3">
          <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-gold" />
            <span>Dynamic CMS Pages Content</span>
          </h3>
          <p className="text-xs text-gray-500">Edit dynamic bilingual text for About, Privacy, Terms, Shipping and Return pages.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pages.map((p) => (
            <div key={p.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex justify-between items-center text-xs">
              <div>
                <strong className="text-gray-900 block font-bold">{p.title_en}</strong>
                <span className="text-gray-500 font-telugu block">{p.title_te}</span>
                <span className="text-[10px] text-gray-400 font-mono">Slug: /{p.slug}</span>
              </div>
              <button
                onClick={() => setEditingPage(p)}
                className="px-3 py-1.5 bg-white border border-gray-300 font-bold rounded-xl hover:bg-gray-100"
              >
                Edit Content
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Banner Modal */}
      {editingBanner && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 rounded-3xl shadow-2xl space-y-4 text-xs">
            <h3 className="font-bold text-lg text-gray-900">Hero Banner Form</h3>

            {saveError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2 font-bold">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{saveError}</span>
              </div>
            )}

            <form onSubmit={handleSaveBanner} className="space-y-3">

              <div>
                <label className="font-bold text-gray-700 block mb-1">Title (English) *</label>
                <input
                  type="text"
                  required
                  value={editingBanner.title_en || ''}
                  onChange={(e) => setEditingBanner({ ...editingBanner, title_en: e.target.value })}
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">శీర్షిక (Telugu Title) *</label>
                <input
                  type="text"
                  required
                  value={editingBanner.title_te || ''}
                  onChange={(e) => setEditingBanner({ ...editingBanner, title_te: e.target.value })}
                  className="w-full p-2 border rounded-xl font-telugu"
                />
              </div>

              <div>
                <ImageUploader
                  label="Banner Image (Upload to Firebase Storage) *"
                  value={editingBanner.imageUrl || ''}
                  onChange={(newUrl) => setEditingBanner({ ...editingBanner, imageUrl: newUrl })}
                  folder="banners"
                />
              </div>


              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setEditingBanner(null)} className="px-4 py-2 bg-gray-100 rounded-xl">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-brand-500 text-white font-bold rounded-xl">Save Slide</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CMS Page Modal */}
      {editingPage && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full p-6 rounded-3xl shadow-2xl space-y-4 text-xs">
            <h3 className="font-bold text-lg text-gray-900">Edit Page: {editingPage.title_en}</h3>
            <form onSubmit={handleSavePage} className="space-y-3">
              <div>
                <label className="font-bold text-gray-700 block mb-1">English Page Content</label>
                <textarea
                  rows={6}
                  value={editingPage.content_en}
                  onChange={(e) => setEditingPage({ ...editingPage, content_en: e.target.value })}
                  className="w-full p-3 border rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">తెలుగు పేజీ సమాచారం (Telugu Page Content)</label>
                <textarea
                  rows={6}
                  value={editingPage.content_te}
                  onChange={(e) => setEditingPage({ ...editingPage, content_te: e.target.value })}
                  className="w-full p-3 border rounded-xl text-xs font-telugu"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setEditingPage(null)} className="px-4 py-2 bg-gray-100 rounded-xl">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-brand-500 text-white font-bold rounded-xl">Save Page</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
