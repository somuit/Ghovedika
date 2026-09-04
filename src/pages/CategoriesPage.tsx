import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { dbService, useLiveDatabase } from '../services/db';

export const CategoriesPage: React.FC = () => {
  const { t, getText } = useLanguage();
  useLiveDatabase(); // Live customer screen database updates
  const categories = dbService.getCategories().filter(c => c.isActive !== false);
  const products = dbService.getProducts().filter(p => p.isActive !== false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl font-extrabold font-telugu text-brand-900">
          {t('మా ఉత్పత్తుల కేటగిరీలు', 'Product Categories')}
        </h1>
        <p className="text-sm text-gray-600">
          {t('సహజ గోమయ ఉత్పత్తులు, సేంద్రీయ ఎరువులు, ఆవు నెయ్యి మరియు తోరణాల విభాగములు', 'Explore our curated range of authentic cow products & bio-fertilizers')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat) => {
          const name = getText(cat, 'name');
          const desc = getText(cat, 'description');
          const catProducts = products.filter(p => p.categoryId === cat.id);

          return (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="group bg-white rounded-3xl border border-brand-100 shadow-card hover:shadow-card-hover overflow-hidden transition-all duration-300 flex flex-col"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={cat.image}
                  alt={name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 bg-brand-gold text-brand-900 text-xs font-bold px-3 py-1 rounded-full shadow">
                  {catProducts.length} {t('ఉత్పత్తులు', 'Products')}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold font-telugu text-gray-900 group-hover:text-brand-500 transition-colors">
                    {name}
                  </h3>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                    {desc}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-brand-500 pt-2">
                  <span>{t('ఉత్పత్తులు చూడండి', 'View Category Products')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
