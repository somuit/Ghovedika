import React, { useState, useEffect } from 'react';
import { Database, CheckCircle2, AlertCircle, RefreshCw, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { checkFirebaseStatus, seedFirestoreDatabase, FirebaseStatusInfo } from '../../services/firebaseDb';

export const FirebaseSeedBanner: React.FC = () => {
  const [status, setStatus] = useState<FirebaseStatusInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<{ success: boolean; message: string } | null>(null);

  const fetchStatus = async () => {
    setLoading(true);
    const res = await checkFirebaseStatus();
    setStatus(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleSeed = async () => {
    if (!window.confirm('This will seed/initialize products, categories, banners, coupons, and site settings directly into your Firebase Firestore Database. Proceed?')) {
      return;
    }

    setSeeding(true);
    setSeedResult(null);

    const res = await seedFirestoreDatabase();
    setSeedResult(res);
    setSeeding(false);
    
    // Refresh status
    await fetchStatus();
  };

  const handleClear = async () => {
    if (!window.confirm('WARNING: This will wipe out all sample dummy products, categories, banners, coupons, and FAQs from your Firebase Firestore Database so you can enter fresh data. Proceed?')) {
      return;
    }

    setSeeding(true);
    setSeedResult(null);

    const { clearFirestoreDatabase } = await import('../../services/firebaseDb');
    const res = await clearFirestoreDatabase();
    setSeedResult(res);
    setSeeding(false);

    await fetchStatus();
  };

  return (
    <div className="bg-gradient-to-r from-emerald-900 via-brand-900 to-emerald-950 text-white rounded-3xl p-6 shadow-xl border border-emerald-700/50 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left Info */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-400" />
            <h3 className="font-extrabold text-base tracking-wide">Firebase Firestore Database Control Panel</h3>
            {status?.isConnected ? (
              <span className="px-2.5 py-0.5 bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-[10px] font-bold rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Connected
              </span>
            ) : (
              <span className="px-2.5 py-0.5 bg-amber-500/20 border border-amber-400 text-amber-300 text-[10px] font-bold rounded-full flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Ready / Configured
              </span>
            )}
          </div>

          <p className="text-xs text-emerald-100/80">
            Project ID: <code className="bg-emerald-950/80 px-2 py-0.5 rounded text-amber-300 font-mono text-[11px]">{status?.projectId || 'ghovedika-store'}</code> 
            {status?.collectionsCount && (
              <span className="ml-2">
                | Products: <strong className="text-white">{status.collectionsCount.products}</strong>, 
                Categories: <strong className="text-white">{status.collectionsCount.categories}</strong>, 
                Banners: <strong className="text-white">{status.collectionsCount.banners}</strong>
              </span>
            )}
          </p>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={fetchStatus}
            disabled={loading}
            className="p-2.5 bg-emerald-800/60 hover:bg-emerald-800 text-emerald-200 rounded-xl transition border border-emerald-600/40 text-xs font-semibold flex items-center gap-1.5"
            title="Refresh Firebase Status"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Check DB</span>
          </button>

          <button
            onClick={handleClear}
            disabled={seeding}
            className="px-3.5 py-2.5 bg-red-800/70 hover:bg-red-700 text-red-100 font-bold text-xs rounded-xl border border-red-500/50 shadow-md transition flex items-center gap-1.5"
            title="Clear all sample/dummy text and images"
          >
            <span>🗑️ Clear Dummy Data</span>
          </button>

          <button
            onClick={handleSeed}
            disabled={seeding}
            className="px-4 py-2.5 bg-gradient-to-r from-brand-gold to-amber-500 hover:from-amber-400 hover:to-brand-gold text-brand-950 font-black text-xs rounded-xl shadow-lg hover:shadow-xl transition transform active:scale-95 flex items-center gap-2"
          >
            {seeding ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Working on Database...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-brand-950" />
                <span>🚀 Seed Sample Items</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Seed Result Alert */}
      {seedResult && (
        <div className={`p-3 rounded-2xl text-xs font-bold flex items-center justify-between border ${
          seedResult.success ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200' : 'bg-red-500/20 border-red-400 text-red-200'
        }`}>
          <div className="flex items-center gap-2">
            {seedResult.success ? <ShieldCheck className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
            <span>{seedResult.message}</span>
          </div>
          <button onClick={() => setSeedResult(null)} className="text-white/60 hover:text-white">✕</button>
        </div>
      )}
    </div>
  );
};
