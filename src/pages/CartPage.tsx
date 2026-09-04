import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck, Tag, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export const CartPage: React.FC = () => {
  const { 
    cartItems, removeFromCart, updateQuantity, clearCart,
    subtotal, shippingFee, freeShippingThreshold, amountNeededForFreeShipping,
    totalAmount, appliedCoupon, couponDiscount, couponError, applyCoupon, removeCoupon
  } = useCart();

  const { t, getText } = useLanguage();
  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput.trim());
      setCouponInput('');
    }
  };

  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-24 h-24 mx-auto bg-brand-100 text-brand-500 rounded-full flex items-center justify-center">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold font-telugu text-brand-900">
          {t('మీ కార్ట్ ప్రస్తుతం ఖాళీగా ఉంది', 'Your Shopping Cart is Empty')}
        </h2>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          {t(
            'స్వచ్ఛమైన గో ఉత్పత్తులు, జీవ ఎరువులు మరియు తోరణాలను చూడటానికి షాపింగ్ ప్రారంభించండి.',
            'Browse our collection of 100% natural Desi Cow products and bio-fertilizers.'
          )}
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-500 text-white font-bold rounded-xl shadow-lg hover:bg-brand-600 transition"
        >
          <span>{t('షాపింగ్ ప్రారంభించండి', 'Explore Products')}</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-extrabold font-telugu text-brand-900">
          {t('షాపింగ్ కార్ట్', 'Shopping Cart')} ({cartItems.length})
        </h1>
        <button
          onClick={clearCart}
          className="text-xs text-red-500 hover:underline font-semibold flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{t('కార్ట్ ఖాళీ చేయి', 'Clear Cart')}</span>
        </button>
      </div>

      {/* Free Shipping Progress */}
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-xs space-y-2">
        <div className="flex justify-between items-center text-amber-900 font-bold">
          <span className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-brand-500" />
            {amountNeededForFreeShipping > 0
              ? t(`ఉచిత డెలివరీ కోసం ఇంకా రూ. ${amountNeededForFreeShipping} విలువైన ఉత్పత్తులు చేర్చండి`, `Add ₹${amountNeededForFreeShipping} more for FREE Shipping!`)
              : t('మీ ఆర్డర్‌కు ఉచిత డెలివరీ వర్తిస్తుంది! 🎉', 'You qualify for FREE Delivery! 🎉')
            }
          </span>
          <span>{Math.round(freeShippingProgress)}%</span>
        </div>
        <div className="w-full bg-amber-200 h-2.5 rounded-full overflow-hidden">
          <div className="bg-brand-500 h-full transition-all duration-300" style={{ width: `${freeShippingProgress}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cart Item Table */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item, idx) => {
            const productName = getText(item.product, 'name');
            const variantName = item.variant ? getText(item.variant, 'name') : null;
            const price = item.variant ? item.variant.price : item.product.price;
            const mrp = item.variant ? item.variant.mrp : item.product.mrp;
            const availableStock = item.variant ? item.variant.stock : item.product.stock;

            return (
              <div 
                key={`${item.product.id}-${item.variant?.id || idx}`}
                className="bg-white p-4 sm:p-6 rounded-2xl border border-brand-100 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={item.product.images[0] || 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?w=300'}
                    alt={productName}
                    className="w-20 h-20 object-cover rounded-xl border border-gray-200 shrink-0"
                  />
                  <div>
                    <Link to={`/product/${item.product.slug}`} className="font-bold text-gray-900 text-sm hover:text-brand-500 line-clamp-1">
                      {productName}
                    </Link>
                    {variantName && (
                      <span className="inline-block bg-brand-50 text-brand-700 text-xs px-2 py-0.5 rounded font-semibold mt-1">
                        {variantName}
                      </span>
                    )}
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-brand-500 font-extrabold text-sm">₹{price}</span>
                      {mrp > price && <span className="text-xs text-gray-400 line-through">₹{mrp}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                  <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.variant?.id, item.quantity - 1)}
                      className="px-2.5 py-1 text-gray-600 hover:bg-gray-200 rounded-l-xl font-bold text-xs"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-gray-900">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.variant?.id, item.quantity + 1)}
                      disabled={item.quantity >= availableStock}
                      className="px-2.5 py-1 text-gray-600 hover:bg-gray-200 rounded-r-xl font-bold text-xs disabled:opacity-30"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-sm font-extrabold text-gray-900 min-w-[70px] text-right">
                    ₹{price * item.quantity}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.product.id, item.variant?.id)}
                    className="text-gray-400 hover:text-red-500 p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary Box */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-brand-100 shadow-card space-y-4">
            <h3 className="font-bold text-gray-900 text-base border-b border-gray-100 pb-3">
              {t('ఆర్డర్ సారాంశం', 'Order Summary')}
            </h3>

            {/* Coupon Box */}
            {appliedCoupon ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                  <Tag className="w-4 h-4 text-emerald-600" />
                  <span>{appliedCoupon.code} (-₹{couponDiscount})</span>
                </div>
                <button onClick={removeCoupon} className="text-red-500 font-bold hover:underline">
                  {t('తొలగించు', 'Remove')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleCouponSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder={t('కూపన్ కోడ్', 'Coupon Code')}
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-xl text-xs uppercase focus:outline-none focus:border-brand-500"
                />
                <button type="submit" className="px-4 py-2 bg-brand-earth text-white font-bold text-xs rounded-xl hover:bg-amber-900">
                  {t('అప్లై', 'Apply')}
                </button>
              </form>
            )}

            {couponError && <p className="text-xs text-red-600">{couponError}</p>}

            <div className="space-y-2 text-xs text-gray-600 pt-3 border-t border-gray-100">
              <div className="flex justify-between">
                <span>{t('ఉత్పత్తుల మొత్తం', 'Subtotal')}</span>
                <span className="font-bold text-gray-900">₹{subtotal}</span>
              </div>

              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>{t('కూపన్ డిస్కౌంట్', 'Coupon Discount')}</span>
                  <span>-₹{couponDiscount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>{t('రవాణా ఛార్జీ', 'Shipping Fee')}</span>
                <span>{shippingFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${shippingFee}`}</span>
              </div>

              <div className="flex justify-between text-base font-extrabold text-brand-500 pt-3 border-t border-gray-200">
                <span>{t('మొత్తం చెల్లించాల్సింది', 'Total Amount')}</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2"
            >
              <span>{t('చెక్ అవుట్‌కు వెళ్ళండి', 'Proceed to Checkout')}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
