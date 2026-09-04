import React, { useState } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';
import { dbService } from '../../services/db';
import { SiteSettings } from '../../types';
import { FirebaseSeedBanner } from '../../components/admin/FirebaseSeedBanner';
import { ImageUploader } from '../../components/common/ImageUploader';

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(() => dbService.getSettings());
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    dbService.saveSettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Firebase Status & DB Seed */}
      <FirebaseSeedBanner />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Global Website & Business Settings</h2>
          <p className="text-xs text-gray-500">Master Control for contact numbers, store addresses, social media, DPDP privacy SLA, shipping charges, COD toggles and SEO tags.</p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Website settings updated successfully! Changes reflected across customer frontend.</span>
        </div>
      )}

      <form onSubmit={handleSaveSettings} className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6 text-xs">
        
        {/* Brand Information */}
        <div className="space-y-4">
          <h3 className="font-bold text-sm text-brand-900 uppercase border-b pb-2">1. Brand & Contact Information</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <ImageUploader
                label="Store Official Logo Image (Upload to Firebase Storage)"
                value={settings.logoUrl || '/logo.png'}
                onChange={(newUrl) => setSettings({ ...settings, logoUrl: newUrl })}
                folder="settings"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Website Name</label>

              <input
                type="text"
                value={settings.websiteName}
                onChange={(e) => setSettings({ ...settings, websiteName: e.target.value })}
                className="w-full p-2.5 border rounded-xl"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Support Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full p-2.5 border rounded-xl"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Primary Phone</label>
              <input
                type="text"
                value={settings.primaryPhone}
                onChange={(e) => setSettings({ ...settings, primaryPhone: e.target.value })}
                className="w-full p-2.5 border rounded-xl"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Secondary Phone</label>
              <input
                type="text"
                value={settings.secondaryPhone}
                onChange={(e) => setSettings({ ...settings, secondaryPhone: e.target.value })}
                className="w-full p-2.5 border rounded-xl"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-bold text-gray-700 block mb-1">WhatsApp Chat Number (with country code)</label>
              <input
                type="text"
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                placeholder="918008588599"
                className="w-full p-2.5 border rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Official Social Media Links */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h3 className="font-bold text-sm text-brand-900 uppercase border-b pb-2">2. Official Social Media Links</h3>

          <div className="space-y-3">
            <div>
              <label className="font-bold text-gray-700 block mb-1">Instagram Profile URL</label>
              <input
                type="url"
                value={settings.instagramUrl}
                onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                placeholder="https://www.instagram.com/ghovedika?igsi=MTh3ejE2bm1naHgxZw=="
                className="w-full p-2.5 border rounded-xl"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Facebook Page URL</label>
              <input
                type="url"
                value={settings.facebookUrl}
                onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                placeholder="https://www.facebook.com/share/1DJTJXW4wL/?mibextid=wwXIfr"
                className="w-full p-2.5 border rounded-xl"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">YouTube Channel URL</label>
              <input
                type="url"
                value={settings.youtubeUrl}
                onChange={(e) => setSettings({ ...settings, youtubeUrl: e.target.value })}
                placeholder="https://youtube.com/@ghovedika?si=372SZ0l_EllLUDu8"
                className="w-full p-2.5 border rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Addresses */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h3 className="font-bold text-sm text-brand-900 uppercase border-b pb-2">3. Physical Addresses</h3>

          <div className="space-y-4">
            <div>
              <label className="font-bold text-gray-700 block mb-1">Palakollu Retail Store Address</label>
              <textarea
                rows={2}
                value={settings.storeAddress}
                onChange={(e) => setSettings({ ...settings, storeAddress: e.target.value })}
                className="w-full p-2.5 border rounded-xl"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Vedangipalem Premises Address</label>
              <textarea
                rows={2}
                value={settings.premisesAddress}
                onChange={(e) => setSettings({ ...settings, premisesAddress: e.target.value })}
                className="w-full p-2.5 border rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* DPDP Act 2023 & DPDP Rules 2025 Privacy Controls */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h3 className="font-bold text-sm text-brand-900 uppercase border-b pb-2">4. DPDP 2023 & 2025 Privacy Controls</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-gray-700 block mb-1">Active Privacy Policy Version</label>
              <input
                type="text"
                value={settings.privacyPolicyVersion || 'v1.0-2025'}
                onChange={(e) => setSettings({ ...settings, privacyPolicyVersion: e.target.value })}
                className="w-full p-2.5 border rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Privacy Grievance SLA (Days)</label>
              <input
                type="number"
                value={settings.privacyResponseSlaDays || 90}
                onChange={(e) => setSettings({ ...settings, privacyResponseSlaDays: Number(e.target.value) })}
                className="w-full p-2.5 border rounded-xl"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Privacy Contact Email</label>
              <input
                type="email"
                value={settings.privacyContactEmail || 'ghovedika@gmail.com'}
                onChange={(e) => setSettings({ ...settings, privacyContactEmail: e.target.value })}
                className="w-full p-2.5 border rounded-xl"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Privacy Contact Phone</label>
              <input
                type="text"
                value={settings.privacyContactPhone || '8008588599'}
                onChange={(e) => setSettings({ ...settings, privacyContactPhone: e.target.value })}
                className="w-full p-2.5 border rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* E-Commerce Shipping & Payment Rules */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h3 className="font-bold text-sm text-brand-900 uppercase border-b pb-2">5. Shipping & Payment Controls</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-gray-700 block mb-1">Base Shipping Charge (₹)</label>
              <input
                type="number"
                value={settings.baseShippingCharge}
                onChange={(e) => setSettings({ ...settings, baseShippingCharge: Number(e.target.value) })}
                className="w-full p-2.5 border rounded-xl"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Free Shipping Order Threshold (₹)</label>
              <input
                type="number"
                value={settings.freeShippingThreshold}
                onChange={(e) => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
                className="w-full p-2.5 border rounded-xl"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-bold text-gray-700 block mb-1">Razorpay Key ID (e.g. rzp_live_... or rzp_test_...)</label>
              <input
                type="text"
                value={settings.razorpayKeyId || ''}
                onChange={(e) => setSettings({ ...settings, razorpayKeyId: e.target.value })}
                placeholder="rzp_test_TUK52yasX9ouWT"
                className="w-full p-2.5 border rounded-xl font-mono text-xs"
              />
              <p className="text-[10px] text-gray-500 mt-1">Found in your Razorpay Dashboard &gt; Settings &gt; API Keys.</p>
            </div>

            <div className="sm:col-span-2 flex gap-6 pt-2">
              <label className="flex items-center gap-2 font-bold text-gray-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.isRazorpayEnabled}
                  onChange={(e) => setSettings({ ...settings, isRazorpayEnabled: e.target.checked })}
                  className="rounded text-brand-500 w-4 h-4"
                />
                <span>Enable Razorpay Online Payments</span>
              </label>
            </div>
          </div>
        </div>

        {/* Global SEO */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h3 className="font-bold text-sm text-brand-900 uppercase border-b pb-2">6. Global SEO Metadata</h3>

          <div className="space-y-3">
            <div>
              <label className="font-bold text-gray-700 block mb-1">Default SEO Meta Title</label>
              <input
                type="text"
                value={settings.defaultSeoTitle}
                onChange={(e) => setSettings({ ...settings, defaultSeoTitle: e.target.value })}
                className="w-full p-2.5 border rounded-xl"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Default SEO Meta Description</label>
              <textarea
                rows={2}
                value={settings.defaultSeoDescription}
                onChange={(e) => setSettings({ ...settings, defaultSeoDescription: e.target.value })}
                className="w-full p-2.5 border rounded-xl"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-brand-500 hover:bg-brand-600 text-white font-extrabold rounded-xl shadow-lg transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save All Website Settings</span>
          </button>
        </div>

      </form>

    </div>
  );
};
