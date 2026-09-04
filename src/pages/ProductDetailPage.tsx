import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, Heart, ShoppingBag, Truck, ShieldCheck, CheckCircle2, 
  HelpCircle, ChevronDown, ArrowLeft, Share2, Award 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { dbService, useLiveDatabase } from '../services/db';
import { ProductCard } from '../components/common/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, getText } = useLanguage();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();
  useLiveDatabase(); // Auto re-render live database updates on customer screen

  const product = dbService.getProductBySlug(slug || '') || dbService.getProducts().find(p => p.id === slug) || dbService.getProducts()[0];
  const category = dbService.getCategories().find(c => c.id === product?.categoryId);

  const [selectedVariantId, setSelectedVariantId] = useState<string>(() => {
    if (product?.variants && product.variants.length > 0) {
      const def = product.variants.find(v => v.isDefault);
      return def ? def.id : product.variants[0].id;
    }
    return '';
  });

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'usage' | 'specs' | 'faqs'>('benefits');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Context-Aware Auto-Scroll when product slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedImageIndex(0);
    setQuantity(1);
    if (product?.variants && product.variants.length > 0) {
      const def = product.variants.find(v => v.isDefault);
      setSelectedVariantId(def ? def.id : product.variants[0].id);
    }
  }, [slug, product?.id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-gray-800">Product not found</h2>
        <Link to="/shop" className="text-brand-500 hover:underline mt-4 inline-block">Back to shop</Link>
      </div>
    );
  }

  const selectedVariant = product.variants?.find(v => v.id === selectedVariantId);
  const activePrice = selectedVariant ? selectedVariant.price : product.price;
  const activeMrp = selectedVariant ? selectedVariant.mrp : product.mrp;
  const activeStock = selectedVariant ? selectedVariant.stock : product.stock;
  const activeUnit = selectedVariant ? selectedVariant.weightUnit : product.unit;

  const discountPercent = activeMrp > activePrice 
    ? Math.round(((activeMrp - activePrice) / activeMrp) * 100)
    : product.discount;

  const name = getText(product, 'name');
  const description = getText(product, 'description');
  const categoryName = category ? getText(category, 'name') : '';

  const benefitsList = (getText(product, 'benefits') as any) || (product.benefits_en || []);
  const usageList = (getText(product, 'usage') as any) || (product.usage_en || []);

  const relatedProducts = dbService.getProducts()
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id && p.isActive)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (activeStock <= 0) return;
    addToCart(product, selectedVariant, quantity);
  };

  const handleBuyNow = () => {
    if (activeStock <= 0) return;
    addToCart(product, selectedVariant, quantity);
    navigate('/checkout');
  };

  const isLiked = isInWishlist(product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Link to="/" className="hover:text-brand-500">{t('హోమ్', 'Home')}</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-brand-500">{t('షాప్', 'Shop')}</Link>
        <span>/</span>
        {category && (
          <>
            <Link to={`/category/${category.slug}`} className="hover:text-brand-500">{categoryName}</Link>
            <span>/</span>
          </>
        )}
        <span className="text-gray-900 font-semibold truncate">{name}</span>
      </div>

      {/* Main Product Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-6 sm:p-8 rounded-3xl border border-brand-100 shadow-card">
        
        {/* Left Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-200">
            <img
              src={product.images[selectedImageIndex] || 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?w=800'}
              alt={name}
              className="w-full h-full object-cover"
            />
            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                {discountPercent}% OFF
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition ${
                isLiked ? 'bg-red-50 text-red-500 shadow' : 'bg-white/80 text-gray-400 hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Image Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                    selectedImageIndex === i ? 'border-brand-500 scale-95' : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Details */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            
            {categoryName && (
              <span className="inline-block bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {categoryName}
              </span>
            )}

            <h1 className="text-2xl sm:text-3xl font-extrabold font-telugu text-brand-900 leading-snug">
              {name}
            </h1>

            {/* Rating & Stock */}
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-gray-800 ml-1">{product.rating || 4.9}</span>
                <span className="text-gray-400">({product.reviewsCount || 24} {t('రివ్యూలు', 'reviews')})</span>
              </div>

              <div className="h-4 w-px bg-gray-200" />

              <div>
                {activeStock > 10 ? (
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    {t('స్టాక్‌లో ఉంది', 'In Stock')}
                  </span>
                ) : activeStock > 0 ? (
                  <span className="text-amber-600 font-bold">
                    {t(`కొద్దిగా మాత్రమే ఉంది (${activeStock})`, `Low Stock (${activeStock} left)`)}
                  </span>
                ) : (
                  <span className="text-red-600 font-bold">
                    {t('స్టాక్ లేదు', 'Out of Stock')}
                  </span>
                )}
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 bg-brand-50/50 rounded-2xl border border-brand-100 flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-brand-500">₹{activePrice}</span>
              {activeMrp > activePrice && (
                <span className="text-base text-gray-400 line-through">₹{activeMrp}</span>
              )}
              {discountPercent > 0 && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  {t(`${discountPercent}% ఆదా!`, `Save ${discountPercent}%`)}
                </span>
              )}
            </div>

            {/* Product Description */}
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {description}
            </p>

            {/* Variant Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                  {t('పరిమాణం / బరువు ఎంచుకోండి', 'Select Pack Size / Weight')}
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => {
                    const vName = getText(v, 'name');
                    const isSelected = selectedVariantId === v.id;

                    return (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariantId(v.id)}
                        className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-bold border transition flex items-center justify-center ${
                          isSelected
                            ? 'bg-brand-500 text-white border-brand-500 shadow-md'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-brand-500'
                        }`}
                      >
                        {vName} - ₹{v.price}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Stepper */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                {t('సంఖ్య', 'Quantity')}
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50 overflow-hidden">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="min-w-[44px] min-h-[44px] px-3 py-2 text-gray-600 hover:bg-gray-200 font-bold flex items-center justify-center transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-4 text-sm font-bold text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => Math.min(activeStock, q + 1))}
                    disabled={quantity >= activeStock}
                    className="min-w-[44px] min-h-[44px] px-3 py-2 text-gray-600 hover:bg-gray-200 font-bold disabled:opacity-30 flex items-center justify-center transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-gray-500 font-medium">
                  {t('మొత్తం వెల', 'Total Price')}: <strong className="text-brand-500 text-base">₹{activePrice * quantity}</strong>
                </span>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-6 border-t border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={activeStock <= 0}
                className="py-3.5 px-6 bg-brand-earth hover:bg-amber-900 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 disabled:opacity-40"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>{t('కార్ట్‌కు చేర్చు', 'Add to Cart')}</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={activeStock <= 0}
                className="py-3.5 px-6 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 disabled:opacity-40"
              >
                <span>{t('ఇప్పుడే కొనండి (Buy Now)', 'Buy Now')}</span>
              </button>
            </div>

            {/* Delivery & Trust Info */}
            <div className="grid grid-cols-2 gap-3 pt-4 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-brand-500" />
                <span>{t('భారతదేశమంతటా రవాణా', 'Fast All-India Delivery')}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-500" />
                <span>{t('100% సేంద్రీయ ధృవీకరణ', '100% Certified Organic')}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Tabbed Info Section (Benefits, Usage, Specifications, FAQs) */}
      <div className="bg-white rounded-3xl border border-brand-100 shadow-card overflow-hidden">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {[
            { id: 'benefits', label: t('ప్రయోజనాలు', 'Benefits') },
            { id: 'usage', label: t('వాడే విధానం', 'How to Use') },
            { id: 'specs', label: t('స్పెసిఫికేషన్లు', 'Specifications') },
            { id: 'faqs', label: t('ప్రశ్నలు & సమాధానాలు', 'FAQs') },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-4 text-xs font-bold uppercase tracking-wider whitespace-nowrap border-b-2 transition ${
                activeTab === tab.id
                  ? 'border-brand-500 text-brand-500 bg-brand-50/40'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6 sm:p-8">
          {activeTab === 'benefits' && (
            <ul className="space-y-3">
              {Array.isArray(benefitsList) && benefitsList.length > 0 ? (
                benefitsList.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <p className="text-xs text-gray-500">100% Natural cow-derived organic composition.</p>
              )}
            </ul>
          )}

          {activeTab === 'usage' && (
            <ul className="space-y-3">
              {Array.isArray(usageList) && usageList.length > 0 ? (
                usageList.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <p className="text-xs text-gray-500">Use as directed on label.</p>
              )}
            </ul>
          )}

          {activeTab === 'specs' && (
            <div className="divide-y divide-gray-100 max-w-lg text-xs">
              <div className="py-2.5 flex justify-between">
                <span className="text-gray-500">{t('బ్రాండ్', 'Brand')}</span>
                <span className="font-bold text-gray-900">Ghovedika | గోవేదిక</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-gray-500">SKU</span>
                <span className="font-bold text-gray-900">{product.sku}</span>
              </div>
              {product.specifications.map((spec, i) => (
                <div key={i} className="py-2.5 flex justify-between">
                  <span className="text-gray-500">{getText(spec, 'key')}</span>
                  <span className="font-bold text-gray-900">{getText(spec, 'value')}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'faqs' && (
            <div className="space-y-3 max-w-2xl">
              {product.faqs && product.faqs.length > 0 ? (
                product.faqs.map((faq, i) => {
                  const q = getText(faq, 'question');
                  const a = getText(faq, 'answer');
                  const isOpen = openFaqIndex === i;

                  return (
                    <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                        className="w-full p-4 text-left font-semibold text-sm text-gray-900 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition"
                      >
                        <span>{q}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="p-4 text-xs text-gray-600 bg-white border-t border-gray-200">
                          {a}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-xs text-gray-500">{t('ప్రశ్నలు అందుబాటులో లేవు.', 'No specific FAQs listed for this product.')}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-6">
          <h2 className="text-2xl font-extrabold font-telugu text-brand-900">
            {t('సంబంధిత ఉత్పత్తులు', 'Related Products')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
