import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { dbService } from '../services/db';

export const FAQPage: React.FC = () => {
  const { t, getText } = useLanguage();
  const faqs = dbService.getFAQs();

  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);
  const [filterCat, setFilterCat] = useState<string>('all');

  const filteredFaqs = faqs.filter(f => filterCat === 'all' || f.category === filterCat);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold font-telugu text-brand-900">
          {t('తరచుగా అడిగే ప్రశ్నలు (FAQ)', 'Frequently Asked Questions')}
        </h1>
        <p className="text-sm text-gray-600">
          {t('గోవేదిక ఉత్పత్తులు, రవాణా మరియు చెల్లింపుల గురించిన సాధారణ ప్రశ్నలు', 'Common questions about products, shipping, payment & organic practices')}
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {[
          { id: 'all', label: t('అన్నీ', 'All') },
          { id: 'products', label: t('ఉత్పత్తులు', 'Products') },
          { id: 'shipping', label: t('రవాణా', 'Shipping') },
          { id: 'payment', label: t('చెల్లింపులు', 'Payment') },
          { id: 'organic', label: t('సేంద్రీయ పద్ధతులు', 'Organic') },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterCat(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              filterCat === tab.id
                ? 'bg-brand-500 text-white shadow'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-brand-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Accordions */}
      <div className="space-y-4">
        {filteredFaqs.map((faq) => {
          const q = getText(faq, 'question');
          const a = getText(faq, 'answer');
          const isOpen = openId === faq.id;

          return (
            <div key={faq.id} className="bg-white rounded-2xl border border-brand-100 shadow-sm overflow-hidden">
              <button
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="w-full p-5 text-left font-bold text-sm text-gray-900 flex justify-between items-center bg-white hover:bg-brand-50/50 transition font-telugu"
              >
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-brand-500 shrink-0" />
                  {q}
                </span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="p-5 pt-0 text-xs text-gray-600 leading-relaxed border-t border-gray-100 bg-brand-50/20 font-telugu">
                  {a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
