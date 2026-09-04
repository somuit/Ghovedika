import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, ShoppingBag, Heart, User, Globe, Phone, MapPin 
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
  const settings = dbService.getSettings();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
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

          {/* Right Action Icons */}
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

            {/* User Account */}
            <Link
              to="/account"
              className="p-2 text-gray-600 hover:text-brand-500 transition-colors"
              title="Customer Account"
            >
              <User className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
