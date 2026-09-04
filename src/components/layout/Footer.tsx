import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, Phone, Mail, Globe, ShieldCheck, Heart, 
  Award, Truck, Lock, UserCheck, HelpCircle, Download
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { dbService, useLiveDatabase } from '../../services/db';

export const Footer: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  useLiveDatabase(); // Real-time contact & footer updates
  const settings = dbService.getSettings();


  const instagramUrl = settings.instagramUrl || 'https://www.instagram.com/ghovedika?igsi=MTh3ejE2bm1naHgxZw==';
  const facebookUrl = settings.facebookUrl || 'https://www.facebook.com/share/1DJTJXW4wL/?mibextid=wwXIfr';
  const youtubeUrl = settings.youtubeUrl || 'https://youtube.com/@ghovedika?si=372SZ0l_EllLUDu8';

  return (
    <footer className="bg-brand-900 text-brand-100 pt-16 pb-8 border-t-4 border-brand-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-brand-800 text-center">
          <div className="flex flex-col items-center space-y-2 p-3 bg-brand-800/40 rounded-xl">
            <Award className="w-8 h-8 text-brand-gold" />
            <h4 className="font-bold text-white text-sm">100% Desi Cow</h4>
            <p className="text-xs text-gray-300">{t('స్వచ్ఛమైన గో ఉత్పత్తులు', 'Pure Indian Cow Derived')}</p>
          </div>
          <div className="flex flex-col items-center space-y-2 p-3 bg-brand-800/40 rounded-xl">
            <ShieldCheck className="w-8 h-8 text-brand-gold" />
            <h4 className="font-bold text-white text-sm">{t('సేంద్రీయ ఎరువులు', 'Organic Farming')}</h4>
            <p className="text-xs text-gray-300">{t('రసాయన రహిత రక్షణ', 'Chemical-Free Agriculture')}</p>
          </div>
          <div className="flex flex-col items-center space-y-2 p-3 bg-brand-800/40 rounded-xl">
            <Truck className="w-8 h-8 text-brand-gold" />
            <h4 className="font-bold text-white text-sm">{t('వేగవంతమైన రవాణా', 'Fast Shipping')}</h4>
            <p className="text-xs text-gray-300">{t('రూ.999 దాటితే ఉచితం', 'Free Delivery above ₹999')}</p>
          </div>
          <div className="flex flex-col items-center space-y-2 p-3 bg-brand-800/40 rounded-xl">
            <Lock className="w-8 h-8 text-brand-gold" />
            <h4 className="font-bold text-white text-sm">COD & Online</h4>
            <p className="text-xs text-gray-300">{t('సురక్షిత చెల్లింపులు', 'Secure Payment Gateway')}</p>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12 border-b border-brand-800">
          
          {/* Brand Info & Social Links */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={settings.logoUrl || "/logo.png"}
                alt="Ghovedika"
                className="w-12 h-12 rounded-full object-cover shadow-lg border-2 border-brand-gold"
              />
              <div>
                <h3 className="text-2xl font-bold font-telugu text-white">గోవేదిక</h3>
                <p className="text-xs text-brand-gold tracking-widest font-semibold">GHOVEDIKA</p>
              </div>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed max-w-sm">
              {t(
                'గోవేదిక (Ghovedika) భారతీయ గో సంస్కృతి, జీవ ఎరువులు, గోమయ ధూప్ మరియు సాంప్రదాయ ఉత్పత్తుల ప్రామాణిక కేంద్రం. పశ్చిమ గోదావరి జిల్లా పాలకొల్లు మరియు వేదంగిపాలెం ప్రాంగణాల నుండి సరాసరి సేకరణ.',
                'Ghovedika is dedicated to authentic Desi Cow-based bio-fertilizers, pooja essentials, paddy tassels, and natural food products harvested directly from Poduru & Palakollu, Andhra Pradesh.'
              )}
            </p>

            {/* Official Social Links */}
            <div className="pt-2 space-y-2">
              <h5 className="text-xs font-bold text-brand-gold uppercase tracking-wider">
                {t('సోషల్ మీడియా (Official Social Links)', 'Follow Ghovedika')}
              </h5>
              <div className="flex items-center gap-3">
                {/* Instagram */}
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ghovedika Instagram Page"
                  className="w-9 h-9 rounded-xl bg-brand-800 hover:bg-pink-600 text-white flex items-center justify-center transition shadow border border-brand-700"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ghovedika Facebook Page"
                  className="w-9 h-9 rounded-xl bg-brand-800 hover:bg-blue-600 text-white flex items-center justify-center transition shadow border border-brand-700"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ghovedika YouTube Channel"
                  className="w-9 h-9 rounded-xl bg-brand-800 hover:bg-red-600 text-white flex items-center justify-center transition shadow border border-brand-700"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-800 hover:bg-brand-700 text-amber-300 text-xs font-semibold rounded-lg border border-brand-700 transition"
              >
                <Globe className="w-4 h-4" />
                <span>{language === 'te' ? 'Switch to English' : 'తెలుగులోకి మారండి'}</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-brand-gold uppercase tracking-wider">
              {t('ముఖ్యమైన లింకులు', 'Quick Links')}
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><Link to="/shop" className="hover:text-white transition">{t('షాప్ ఉత్పత్తులు', 'Shop Products')}</Link></li>
              <li><Link to="/categories" className="hover:text-white transition">{t('కేటగిరీలు', 'Categories')}</Link></li>
              <li><Link to="/about" className="hover:text-white transition">{t('గోవేదిక గురించి', 'About Ghovedika')}</Link></li>
              <li><Link to="/store-locations" className="hover:text-white transition">{t('స్టోర్ స్థలాలు', 'Store Locations')}</Link></li>
              <li><Link to="/faq" className="hover:text-white transition">{t('తరచుగా అడిగే ప్రశ్నలు (FAQ)', 'FAQs')}</Link></li>
            </ul>
          </div>

          {/* Customer Policies & DPDP Privacy Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-brand-gold uppercase tracking-wider">
              {t('గోప్యత & పాలసీలు (DPDP)', 'Privacy & Policies')}
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link to="/privacy-policy" className="hover:text-amber-300 transition flex items-center gap-1 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('గోప్యతా విధానం (Privacy Policy)', 'Privacy Policy')}</span>
                </Link>
              </li>
              <li>
                <Link to="/privacy-center" className="hover:text-amber-300 transition flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('గోప్యతా నిర్వహణ కేంద్రం', 'Privacy Center')}</span>
                </Link>
              </li>
              <li>
                <Link to="/privacy-center" className="hover:text-amber-300 transition flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('సమ్మతి ప్రాధాన్యతలు', 'Manage Privacy Preferences')}</span>
                </Link>
              </li>
              <li>
                <Link to="/privacy-center" className="hover:text-amber-300 transition flex items-center gap-1">
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('డేటా హక్కుల అభ్యర్థన', 'Data Principal Rights')}</span>
                </Link>
              </li>
              <li>
                <Link to="/privacy-center" className="hover:text-amber-300 transition flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('గోప్యతా ఫిర్యాదు (Grievance)', 'Grievance Redressal')}</span>
                </Link>
              </li>
              <li className="pt-1"><Link to="/terms-and-conditions" className="hover:text-white transition">{t('నిబంధనలు & షరతులు', 'Terms & Conditions')}</Link></li>
              <li><Link to="/shipping-policy" className="hover:text-white transition">{t('రవాణా విధానం', 'Shipping Policy')}</Link></li>
              <li><Link to="/cancellation-returns" className="hover:text-white transition">{t('రద్దు & రిటర్న్‌లు', 'Cancellation & Returns')}</Link></li>
            </ul>
          </div>

          {/* Store Addresses */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-brand-gold uppercase tracking-wider">
              {t('స్టోర్ చిరునామా', 'Store Addresses')}
            </h4>
            <div className="space-y-3 text-xs text-gray-300">
              <div className="flex gap-2 items-start">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">{t('స్టోర్', 'Store')}:</strong>
                  {settings.storeAddress}
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">{t('ప్రాంగణం', 'Premises')}:</strong>
                  {settings.premisesAddress}
                </div>
              </div>
              <div className="flex gap-2 items-center text-amber-300">
                <Phone className="w-4 h-4 shrink-0 text-brand-gold" />
                <span>{settings.primaryPhone}, {settings.secondaryPhone}</span>
              </div>
              <div className="flex gap-2 items-center text-gray-300">
                <Mail className="w-4 h-4 shrink-0 text-brand-gold" />
                <span>{settings.email}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4 border-t border-brand-900/60 mt-8">
          <p>© {new Date().getFullYear()} Ghovedika (గోవేదిక). All rights reserved. www.ghovedika.store</p>
          <p className="flex items-center gap-1.5 text-xs text-gray-200 font-semibold bg-brand-900/80 px-3.5 py-1.5 rounded-full border border-amber-400/30">
            <span>Crafted with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse inline mx-0.5" />
            <span>by <strong className="text-brand-gold font-extrabold tracking-wide">SomuIT</strong></span>
          </p>
        </div>

      </div>
    </footer>
  );
};
