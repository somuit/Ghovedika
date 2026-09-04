import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';

export const CartDrawer: React.FC = () => {
  const { 
    cartItems, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen,
    subtotal, shippingFee, freeShippingThreshold, amountNeededForFreeShipping,
    totalAmount, appliedCoupon, couponDiscount, couponError, applyCoupon, removeCoupon
  } = useCart();

  const { t, getText } = useLanguage();
  const navigate = useNavigate();
  const [couponCodeInput, setCouponCodeInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCodeInput.trim()) {
      applyCoupon(couponCodeInput.trim());
      setCouponCodeInput('');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleContinueShopping = () => {
    setIsCartOpen(false);
    if (window.location.pathname === '/') {
      const elem = document.getElementById('products');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/#products');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-brand-cream shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 bg-brand-500 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-gold" />
              <h2 className="text-lg font-bold">
                {t('మీ షాపింగ్ కార్ట్', 'Shopping Cart')} ({cartItems.length})
              </h2>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-full hover:bg-white/10 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Free Shipping Bar */}
          <div className="bg-amber-50 px-6 py-3 border-b border-amber-200 text-xs">
            {amountNeededForFreeShipping > 0 ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-amber-900 font-medium">
                  <span className="flex items-center gap-1">
                    <Truck className="w-4 h-4 text-brand-500" />
                    {t(
                      `ఉచిత డెలివరీకి రూ. ${amountNeededForFreeShipping} తక్కువ ఉంది`,
                      `Add ₹${amountNeededForFreeShipping} more for FREE Shipping`
                    )}
                  </span>
                  <span>{Math.round(freeShippingProgress)}%</span>
                </div>
                <div className="w-full bg-amber-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-brand-500 h-full transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-emerald-800 font-semibold text-center justify-center">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>{t('అభినందనలు! మీకు ఉచిత డెలివరీ లభిస్తుంది 🎉', 'Congratulations! You qualify for FREE Shipping 🎉')}</span>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-20 h-20 mx-auto bg-emerald-100 rounded-full flex items-center justify-center text-brand-500">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <p className="text-gray-600 font-medium">
                  {t('మీ కార్ట్ ఖాళీగా ఉంది', 'Your cart is currently empty')}
                </p>
                <button
                  onClick={() => { setIsCartOpen(false); navigate('/shop'); }}
                  className="px-6 py-2.5 bg-brand-500 text-white rounded-lg hover:bg-brand-600 font-medium transition"
                >
                  {t('ఇప్పుడే షాపింగ్ ప్రారంభించండి', 'Start Shopping Now')}
                </button>
              </div>
            ) : (
              cartItems.map((item, idx) => {
                const productName = getText(item.product, 'name');
                const variantName = item.variant ? getText(item.variant, 'name') : null;
                const price = item.variant ? item.variant.price : item.product.price;
                const mrp = item.variant ? item.variant.mrp : item.product.mrp;
                const availableStock = item.variant ? item.variant.stock : item.product.stock;

                return (
                  <div 
                    key={`${item.product.id}-${item.variant?.id || idx}`}
                    className="flex gap-4 p-3 bg-white rounded-xl border border-brand-100 shadow-sm"
                  >
                    <img
                      src={item.product.images[0] || 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?w=200'}
                      alt={productName}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-100"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-gray-900 text-sm line-clamp-1">
                            {productName}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.variant?.id)}
                            className="text-gray-400 hover:text-red-500 p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        {variantName && (
                          <span className="inline-block text-xs bg-brand-50 text-brand-700 px-2 py-0.5 rounded mt-1">
                            {variantName}
                          </span>
                        )}
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-brand-500 font-bold text-sm">₹{price}</span>
                          {mrp > price && (
                            <span className="text-gray-400 text-xs line-through">₹{mrp}</span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                        <div className="flex items-center border border-gray-200 rounded-md bg-gray-50">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.variant?.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-200 text-gray-600 rounded-l"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-semibold text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.variant?.id, item.quantity + 1)}
                            disabled={item.quantity >= availableStock}
                            className="p-1 hover:bg-gray-200 text-gray-600 rounded-r disabled:opacity-30"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="text-xs text-gray-500">
                          {t('మొత్తం', 'Total')}: <strong className="text-gray-900">₹{price * item.quantity}</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Cart Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-white border-t border-brand-100 shadow-lg space-y-4">
              {/* Coupon Box */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs">
                  <div className="flex items-center gap-2 text-emerald-800">
                    <Tag className="w-4 h-4 text-emerald-600" />
                    <span>
                      {t('కూపన్ వర్తించబడింది', 'Coupon Applied')}: <strong>{appliedCoupon.code}</strong> (-₹{couponDiscount})
                    </span>
                  </div>
                  <button 
                    onClick={removeCoupon}
                    className="text-red-500 hover:underline text-xs font-medium"
                  >
                    {t('తొలగించు', 'Remove')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder={t('కూపన్ కోడ్ ఉందా?', 'Enter Coupon Code')}
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-xs uppercase focus:outline-none focus:border-brand-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-brand-earth text-white rounded-lg text-xs font-medium hover:bg-amber-900 transition"
                  >
                    {t('అప్లై చేయి', 'Apply')}
                  </button>
                </form>
              )}

              {couponError && (
                <p className="text-xs text-red-600">{couponError}</p>
              )}

              {/* Price Calculation Summary */}
              <div className="space-y-1.5 text-xs text-gray-600 pt-2 border-t border-gray-100">
                <div className="flex justify-between">
                  <span>{t('ఉత్పత్తుల మొత్తం', 'Subtotal')}</span>
                  <span className="font-semibold text-gray-900">₹{subtotal}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>{t('కూపన్ తగ్గింపు', 'Coupon Discount')}</span>
                    <span>-₹{couponDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>{t('రవాణా ఛార్జీ', 'Shipping Fee')}</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-brand-500 pt-2 border-t border-gray-200">
                  <span>{t('చెల్లించాల్సిన మొత్తం', 'Total Amount')}</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>

              {/* Dual-Action Cart CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <button
                  onClick={handleContinueShopping}
                  className="w-full min-h-[44px] py-3 px-4 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-brand-earth" />
                  <span>{t('మరిన్ని ఉత్పత్తులు చూడండి', 'Continue Shopping')}</span>
                </button>

                <button
                  onClick={handleCheckout}
                  className="w-full min-h-[44px] py-3 px-4 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all transform active:scale-95 cursor-pointer"
                >
                  <span>{t('ఆర్డర్ పూర్తి చేయండి', 'Proceed to Checkout')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
