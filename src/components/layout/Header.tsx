import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, ShoppingBag, Heart, User, Globe, Menu, X, Phone, 
  MapPin, ShieldCheck, ChevronRight, Lock 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { dbService, useLiveDatabase } from '../../services/db';

export const Header: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { totalItemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  useLiveDatabase(); // Real-time logo, contact number & category menu updates

  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const settings = dbService.getSettings();


  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-100 shadow-sm">
      {/* Announcement Bar */}
      <div className="bg-brand-500 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500 text-brand-900 font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
              {t('నోటీస్', 'Notice')}
            </span>
            <span>
              {t(
                `రూ. ${settings.freeShippingThreshold || 999} దాటితే ఉచిత రవాణా (Free Shipping)!`,
                `Free All-India Shipping on orders above ₹${settings.freeShippingThreshold || 999}!`
              )}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[11px] font-medium text-brand-100">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-amber-400" />
              {settings.primaryPhone} / {settings.secondaryPhone}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-400" />
              {t('పాలకొల్లు & వేదంగిపాలెం, అం.ప్ర.', 'Palakollu & Vedangipalem, AP')}
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo on Left */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <img 
              src={settings.logoUrl || "/logo.png"} 
              alt="Ghovedika Logo" 
              className="w-11 h-11 sm:w-14 sm:h-14 rounded-full object-cover shadow-md border-2 border-amber-400 group-hover:scale-105 transition-transform" 
            />
            <div className="flex flex-col justify-center">
              <span className="text-xl sm:text-2xl font-extrabold text-brand-500 tracking-tight font-telugu leading-none">
                గోవేదిక
              </span>
              <span className="text-[9px] sm:text-[11px] font-bold tracking-widest text-brand-earth uppercase leading-tight">
                GHOVEDIKA
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700">
            <Link to="/#hero" onClick={(e) => handleNavClick(e, 'hero')} className="hover:text-brand-500 transition-colors">
              {t('హోమ్', 'Home')}
            </Link>
            <Link to="/#products" onClick={(e) => handleNavClick(e, 'products')} className="hover:text-brand-500 transition-colors">
              {t('షాప్', 'Shop')}
            </Link>
            <Link to="/#categories" onClick={(e) => handleNavClick(e, 'categories')} className="hover:text-brand-500 transition-colors">
              {t('కేటగిరీలు', 'Categories')}
            </Link>
            <Link to="/#about" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-brand-500 transition-colors">
              {t('మా గురించి', 'About')}
            </Link>
            <Link to="/#stores" onClick={(e) => handleNavClick(e, 'stores')} className="hover:text-brand-500 transition-colors">
              {t('స్టోర్ స్థలాలు', 'Stores')}
            </Link>
            <Link to="/#contact" onClick={(e) => handleNavClick(e, 'contact')} className="hover:text-brand-500 transition-colors">
              {t('సంప్రదించండి', 'Contact')}
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xs mx-2">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input
                type="text"
                placeholder={t('ఉత్పత్తుల శోధన...', 'Search products...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-brand-500 focus:bg-white transition-all"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </form>
          </div>

          {/* Right Action Icons & Mobile Menu Button on Right */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 py-1 bg-amber-50 border border-amber-200 hover:bg-amber-100 text-amber-900 text-[11px] sm:text-xs font-semibold rounded-full transition-colors"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-brand-earth" />
              <span>{language === 'te' ? 'English' : 'తెలుగు'}</span>
            </button>

            {/* Wishlist */}
            <Link
              to="/account?tab=wishlist"
              className="relative p-2 text-gray-600 hover:text-red-500 transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-600 hover:text-brand-500 transition-colors"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* User Account - Desktop */}
            <Link
              to="/account"
              className="hidden sm:block p-2 text-gray-600 hover:text-brand-500 transition-colors"
              title="Customer Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Mobile Menu Toggle Button - Positioned Prominently on Right Side */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 min-w-[44px] min-h-[44px] text-gray-800 hover:text-brand-500 hover:bg-gray-100 rounded-xl flex items-center justify-center transition-colors"
              aria-label="Open Mobile Navigation Menu"
            >
              <Menu className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu - Opens cleanly from the RIGHT Side */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Dark Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Right-Aligned Drawer Content Container */}
          <div className="fixed inset-y-0 right-0 w-[85%] max-w-xs bg-white shadow-2xl flex flex-col z-50 overflow-hidden border-l border-gray-200">
            
            {/* Drawer Header */}
            <div className="p-4 bg-brand-500 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold font-telugu">గోవేదిక</span>
                <span className="text-[10px] font-bold tracking-widest text-amber-300 uppercase">MENU</span>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-full text-white transition"
                aria-label="Close Menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Search Bar inside Drawer */}
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder={t('ఉత్పత్తుల శోధన...', 'Search products...')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-brand-500 shadow-sm"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </form>
            </div>

            {/* Complete Web Navigation Options List */}
            <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto divide-y divide-gray-100">
              {[
                { to: '/#hero', id: 'hero', label: t('హోమ్', 'Home') },
                { to: '/#products', id: 'products', label: t('షాప్ (ఉత్పత్తులు)', 'Shop Catalog') },
                { to: '/#categories', id: 'categories', label: t('కేటగిరీలు', 'Categories') },
                { to: '/#about', id: 'about', label: t('మా గురించి (About Us)', 'About Us') },
                { to: '/#stores', id: 'stores', label: t('స్టోర్ స్థలాలు (Stores)', 'Store Locations') },
                { to: '/#contact', id: 'contact', label: t('సంప్రదించండి (Contact)', 'Contact Us') },
                { to: '/account', id: '', label: t('నా అకౌంట్ (My Account)', 'My Account') },
                { to: '/order-tracking', id: '', label: t('ఆర్డర్ ట్రాక్ చేయండి', 'Track Order Status') },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    if (link.id) handleNavClick(e, link.id);
                  }}
                  className="flex items-center justify-between p-3.5 rounded-xl hover:bg-brand-50 text-gray-900 font-semibold text-xs transition"
                >
                  <span className="font-telugu">{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-brand-500" />
                </Link>
              ))}
            </nav>

            {/* Footer Contact Details inside Mobile Menu */}
            <div className="p-4 border-t border-gray-200 bg-brand-50/50 space-y-2">
              <p className="text-xs text-gray-600 font-bold">{t('సంప్రదించాల్సిన నంబర్లు', 'Helpline Numbers')}:</p>
              <p className="text-xs font-extrabold text-brand-500">{settings.primaryPhone} / {settings.secondaryPhone}</p>
              <p className="text-[11px] text-gray-500 font-medium">{settings.email}</p>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};
