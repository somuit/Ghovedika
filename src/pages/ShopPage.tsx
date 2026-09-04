import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Grid, List, Search, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { dbService, useLiveDatabase } from '../services/db';
import { ProductCard } from '../components/common/ProductCard';

export const ShopPage: React.FC = () => {
  const { t, getText } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  useLiveDatabase(); // Auto re-render on live database updates across all devices

  const activeCatParam = searchParams.get('category') || 'all';
  const activeSearchParam = searchParams.get('search') || '';

  const categories = dbService.getCategories().filter(c => c.isActive !== false);
  const allProducts = dbService.getProducts().filter(p => p.isActive !== false);


  const [selectedCat, setSelectedCat] = useState<string>(activeCatParam);
  const [searchQuery, setSearchQuery] = useState<string>(activeSearchParam);
  const [sortBy, setSortBy] = useState<string>('popular');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(2000);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      // Category check
      if (selectedCat !== 'all') {
        const cat = categories.find(c => c.slug === selectedCat || c.id === selectedCat);
        if (cat && product.categoryId !== cat.id) return false;
      }

      // Search query check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const nameEn = product.name_en.toLowerCase();
        const nameTe = product.name_te.toLowerCase();
        const tags = product.tags.join(' ').toLowerCase();
        if (!nameEn.includes(query) && !nameTe.includes(query) && !tags.includes(query)) {
          return false;
        }
      }

      // Stock filter
      if (inStockOnly && product.stock <= 0) return false;

      // Price filter
      if (product.price > maxPriceFilter) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return (b.reviewsCount || 0) - (a.reviewsCount || 0);
    });
  }, [allProducts, selectedCat, searchQuery, inStockOnly, maxPriceFilter, sortBy, categories]);

  const handleCategorySelect = (slug: string) => {
    setSelectedCat(slug);
    if (slug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', slug);
    }
    setSearchParams(searchParams);
  };

  const handleClearFilters = () => {
    setSelectedCat('all');
    setSearchQuery('');
    setInStockOnly(false);
    setMaxPriceFilter(2000);
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header & Search */}
      <div className="bg-white p-6 rounded-2xl border border-brand-100 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-telugu text-brand-900">
            {t('మా ప్రాకృతిక ఉత్పత్తుల షాప్', 'Ghovedika Organic Shop')}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {t(
              '100% పవిత్ర దేశీ గోవు ఉత్పత్తులు, సేంద్రీయ ఎరువులు మరియు వరి వెన్నుల తోరణాలు',
              'Explore 100% pure Desi Cow products, organic bio-fertilizers & traditional decor'
            )}
          </p>
        </div>

        {/* Instant Search Bar */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder={t('ఉత్పత్తుల శోధన...', 'Search products...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-brand-500"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-brand-100 shadow-card space-y-6">
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-brand-500" />
                <span>{t('ఫిల్టర్లు', 'Filters')}</span>
              </h3>
              {(selectedCat !== 'all' || searchQuery || inStockOnly || maxPriceFilter < 2000) && (
                <button
                  onClick={handleClearFilters}
                  className="text-xs text-red-500 hover:underline font-medium"
                >
                  {t('రీసెట్', 'Reset')}
                </button>
              )}
            </div>

            {/* Category Filter List */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                {t('కేటగిరీ', 'Category')}
              </label>
              <div className="space-y-1">
                <button
                  onClick={() => handleCategorySelect('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition ${
                    selectedCat === 'all'
                      ? 'bg-brand-500 text-white font-bold'
                      : 'text-gray-700 hover:bg-brand-50'
                  }`}
                >
                  {t('అన్ని ఉత్పత్తులు', 'All Products')} ({allProducts.length})
                </button>

                {categories.map((c) => {
                  const catName = getText(c, 'name');
                  const count = allProducts.filter(p => p.categoryId === c.id).length;
                  const isSelected = selectedCat === c.slug || selectedCat === c.id;

                  return (
                    <button
                      key={c.id}
                      onClick={() => handleCategorySelect(c.slug)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex justify-between items-center transition ${
                        isSelected
                          ? 'bg-brand-500 text-white font-bold'
                          : 'text-gray-700 hover:bg-brand-50'
                      }`}
                    >
                      <span className="line-clamp-1">{catName}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-2 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-gray-700 uppercase tracking-wider">
                  {t('గరిష్ట ధర', 'Max Price')}
                </label>
                <span className="font-extrabold text-brand-500">₹{maxPriceFilter}</span>
              </div>
              <input
                type="range"
                min="100"
                max="2000"
                step="50"
                value={maxPriceFilter}
                onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                className="w-full accent-brand-500 cursor-pointer"
              />
            </div>

            {/* In Stock Only Checkbox */}
            <div className="pt-4 border-t border-gray-100">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-800">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-brand-500 focus:ring-brand-500 w-4 h-4"
                />
                <span>{t('స్టాక్‌లో ఉన్నవి మాత్రమే', 'In Stock Only')}</span>
              </label>
            </div>

          </div>
        </div>

        {/* Main Product Grid */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Top Sort & Bar */}
          <div className="bg-white p-4 rounded-xl border border-brand-100 flex flex-wrap items-center justify-between gap-4 text-xs">
            <span className="font-medium text-gray-600">
              {t('కనిపిస్తున్న ఉత్పత్తులు', 'Showing')} <strong className="text-gray-900">{filteredProducts.length}</strong> {t('ఉత్పత్తులు', 'products')}
            </span>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-500 font-medium">{t('క్రమబద్ధీకరణ', 'Sort By')}:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-50 border border-gray-300 rounded-lg px-2.5 py-1.5 font-semibold text-gray-800 focus:outline-none focus:border-brand-500"
                >
                  <option value="popular">{t('అత్యంత ప్రసిద్ధి', 'Most Popular')}</option>
                  <option value="price-low">{t('ధర: తక్కువ నుండి ఎక్కువ', 'Price: Low to High')}</option>
                  <option value="price-high">{t('ధర: ఎక్కువ నుండి తక్కువ', 'Price: High to Low')}</option>
                  <option value="rating">{t('రేటింగ్', 'Highest Rated')}</option>
                  <option value="newest">{t('కొత్తవి', 'Newest First')}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Cards */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-brand-100 space-y-4">
              <p className="text-gray-500 text-sm font-medium">
                {t('ఎటువంటి ఉత్పత్తులు లభించలేదు.', 'No products match your selected filters.')}
              </p>
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 bg-brand-500 text-white text-xs font-bold rounded-lg hover:bg-brand-600 transition"
              >
                {t('అన్ని ఫిల్టర్లను తొలగించు', 'Clear All Filters')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
