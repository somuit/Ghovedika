import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, Heart, LogOut, Phone, Mail, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useWishlist } from '../context/WishlistContext';
import { dbService } from '../services/db';
import { ProductCard } from '../components/common/ProductCard';

export const AccountPage: React.FC = () => {
  const { user, loginCustomer, logout } = useAuth();
  const { t, getText } = useLanguage();
  const { wishlistIds } = useWishlist();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist'>('orders');

  const [loginName, setLoginName] = useState('');
  const [loginPhone, setLoginPhone] = useState('');
  const [loginEmail, setLoginEmail] = useState('');

  const allOrders = dbService.getOrders();
  const customerOrders = user 
    ? allOrders.filter(o => o.customerPhone === user.phone || o.customerEmail === user.email)
    : [];

  const wishlistProducts = dbService.getProducts().filter(p => wishlistIds.includes(p.id));

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginName.trim() && loginPhone.trim()) {
      loginCustomer(loginName.trim(), loginPhone.trim(), loginEmail.trim());
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white p-8 rounded-3xl border border-brand-100 shadow-card space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-brand-50 text-brand-500 rounded-full flex items-center justify-center mx-auto">
              <User className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold font-telugu text-brand-900">
              {t('కస్టమర్ లాగిన్', 'Customer Login')}
            </h1>
            <p className="text-xs text-gray-500">
              {t('మీ ఆర్డర్లు మరియు సేవ్ చేసిన ప్రొఫైల్ చూడటానికి నమోదు కానండి', 'Enter your details to track orders and manage profile')}
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                {t('మీ పేరు', 'Your Name')} *
              </label>
              <input
                type="text"
                required
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                placeholder="e.g. Subba Rao"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                {t('మొబైల్ నంబర్', 'Mobile Number')} *
              </label>
              <input
                type="tel"
                required
                value={loginPhone}
                onChange={(e) => setLoginPhone(e.target.value)}
                placeholder="e.g. 8008588599"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                {t('ఇమెయిల్ అడ్రస్', 'Email Address')} ({t('ఐచ్ఛికం', 'Optional')})
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="customer@gmail.com"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:border-brand-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow transition"
            >
              {t('లాగిన్ / కొనసాగించండి', 'Login / Continue')}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Account Header */}
      <div className="bg-white p-6 rounded-2xl border border-brand-100 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-500 text-white font-bold text-2xl flex items-center justify-center shadow">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-bold font-telugu text-brand-900">{user.name}</h1>
            <p className="text-xs text-gray-500">{user.phone} • {user.email}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-bold flex items-center gap-1.5 transition self-start sm:self-auto"
        >
          <LogOut className="w-4 h-4" />
          <span>{t('లాగౌట్', 'Logout')}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 gap-4">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition ${
            activeTab === 'orders' ? 'border-brand-500 text-brand-500' : 'border-transparent text-gray-500'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>{t('నా ఆర్డర్లు', 'My Orders')} ({customerOrders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`pb-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition ${
            activeTab === 'wishlist' ? 'border-brand-500 text-brand-500' : 'border-transparent text-gray-500'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>{t('విష్‌లిస్ట్', 'Wishlist')} ({wishlistProducts.length})</span>
        </button>

        <Link
          to="/privacy-center"
          className="pb-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-brand-600 hover:text-brand-800 transition ml-auto"
        >
          <ShieldCheck className="w-4 h-4 text-brand-500" />
          <span>{t('డేటా గోప్యత & ఖాతా నియంత్రణ', 'Privacy & Data Controls')}</span>
        </Link>
      </div>

      {/* Tab Content */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {customerOrders.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-brand-100 text-center space-y-3">
              <Package className="w-12 h-12 text-gray-400 mx-auto" />
              <p className="text-sm font-medium text-gray-600">
                {t('మీ పేరుపై ఇంకా ఎటువంటి ఆర్డర్లు లేవు.', 'No orders found for your profile.')}
              </p>
              <Link to="/shop" className="px-5 py-2.5 bg-brand-500 text-white rounded-xl text-xs font-bold inline-block">
                {t('షాపింగ్ చేయండి', 'Start Shopping')}
              </Link>
            </div>
          ) : (
            customerOrders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-2xl border border-brand-100 shadow-card space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-100 gap-2">
                  <div>
                    <span className="font-extrabold text-brand-500 text-sm">#{order.orderNumber}</span>
                    <span className="text-xs text-gray-400 ml-3">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {order.orderStatus}
                    </span>
                    <Link
                      to={`/order-confirmation/${order.id}`}
                      className="text-xs text-brand-500 font-bold hover:underline"
                    >
                      {t('వివరాలు', 'View Receipt')}
                    </Link>
                  </div>
                </div>

                <div className="divide-y divide-gray-50">
                  {order.items.map((item, i) => (
                    <div key={i} className="py-2 flex justify-between items-center text-xs">
                      <span>{item.productName_en} x {item.quantity}</span>
                      <span className="font-bold text-gray-900">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-between items-center text-xs border-t border-gray-100">
                  <span className="text-gray-500">Payment: <strong>{order.paymentMethod}</strong> ({order.paymentStatus})</span>
                  <span className="font-extrabold text-base text-brand-500">₹{order.totalAmount}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'wishlist' && (
        <div>
          {wishlistProducts.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-brand-100 text-center space-y-3">
              <Heart className="w-12 h-12 text-red-300 mx-auto" />
              <p className="text-sm font-medium text-gray-600">
                {t('విష్‌లిస్ట్‌లో ఉత్పత్తులు లేవు.', 'Your wishlist is currently empty.')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlistProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
