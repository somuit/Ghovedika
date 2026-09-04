import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Check } from 'lucide-react';
import { Product } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t, getText } = useLanguage();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const [selectedVariantId, setSelectedVariantId] = useState<string>(() => {
    if (product.variants && product.variants.length > 0) {
      const defaultVar = product.variants.find(v => v.isDefault);
      return defaultVar ? defaultVar.id : product.variants[0].id;
    }
    return '';
  });

  const selectedVariant = product.variants?.find(v => v.id === selectedVariantId);

  const activePrice = selectedVariant ? selectedVariant.price : product.price;
  const activeMrp = selectedVariant ? selectedVariant.mrp : product.mrp;
  const activeStock = selectedVariant ? selectedVariant.stock : product.stock;
  const activeUnit = selectedVariant ? selectedVariant.weightUnit : product.unit;

  const discountPercent = activeMrp > activePrice 
    ? Math.round(((activeMrp - activePrice) / activeMrp) * 100)
    : product.discount;

  const isLiked = isInWishlist(product.id);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (activeStock <= 0) return;
    addToCart(product, selectedVariant, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const name = getText(product, 'name');

  return (
    <div className="group bg-white rounded-2xl border border-brand-100/80 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {discountPercent > 0 && (
          <span className="bg-amber-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow">
            {discountPercent}% OFF
          </span>
        )}
        {product.isFeatured && (
          <span className="bg-brand-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow">
            {t('ప్రత్యేకము', 'Featured')}
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.id); }}
        className={`absolute top-3 right-3 z-10 min-w-[44px] min-h-[44px] p-2.5 rounded-full backdrop-blur-md transition-transform active:scale-90 flex items-center justify-center ${
          isLiked ? 'bg-red-50 text-red-500 shadow' : 'bg-white/80 text-gray-400 hover:text-red-500 shadow-sm'
        }`}
        aria-label="Add to Wishlist"
      >
        <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
      </button>

      {/* Product Image Link */}
      <Link to={`/product/${product.slug}`} className="block relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?w=600'}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {activeStock <= 0 && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {t('స్టాక్ లేదు', 'Out of Stock')}
            </span>
          </div>
        )}
      </Link>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 mb-1">
            <div className="flex text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-semibold text-gray-700">{product.rating || 4.9}</span>
            <span className="text-[11px] text-gray-400">({product.reviewsCount || 12})</span>
          </div>

          {/* Product Title */}
          <Link 
            to={`/product/${product.slug}`}
            className="block font-semibold text-gray-900 text-sm hover:text-brand-500 transition-colors line-clamp-2"
          >
            {name}
          </Link>
        </div>

        {/* Variant Selector if available */}
        {product.variants && product.variants.length > 1 ? (
          <div className="mt-1">
            <select
              value={selectedVariantId}
              onChange={(e) => setSelectedVariantId(e.target.value)}
              className="w-full min-h-[38px] bg-brand-50 border border-brand-200 text-brand-900 text-xs rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-brand-500 font-medium cursor-pointer"
            >
              {product.variants.map((v) => (
                <option key={v.id} value={v.id}>
                  {getText(v, 'name')} - ₹{v.price}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="text-xs text-gray-500 font-medium">
            {t('పరిమాణం', 'Unit')}: <span className="text-gray-800 font-semibold">{activeUnit}</span>
          </div>
        )}

        {/* Pricing & Add Button */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-brand-500">₹{activePrice}</span>
              {activeMrp > activePrice && (
                <span className="text-xs text-gray-400 line-through">₹{activeMrp}</span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={activeStock <= 0}
            className={`min-h-[44px] px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow cursor-pointer ${
              addedAnimation 
                ? 'bg-emerald-600 text-white'
                : activeStock <= 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                  : 'bg-brand-500 hover:bg-brand-600 text-white hover:shadow-md active:scale-95'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4" />
                <span>{t('చేర్చబడింది', 'Added')}</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>{t('కార్ట్‌కు చేర్చు', 'Add')}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
