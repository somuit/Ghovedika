import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ArrowRight, ShieldCheck, Award, Heart, Sparkles, 
  ChevronLeft, ChevronRight, CheckCircle2, Star, Search,
  Phone, Mail, MapPin, Send, Filter, ShoppingBag, Store
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { dbService, useLiveDatabase } from '../services/db';
import { ProductCard } from '../components/common/ProductCard';

export const HomePage: React.FC = () => {
  const { t, getText } = useLanguage();
  const location = useLocation();
  useLiveDatabase(); // Real-time sync across all connected clients

  const settings = dbService.getSettings();
  const banners = dbService.getBanners().filter(b => b.isActive !== false && (!b.position || b.position === 'hero'));
  const categories = dbService.getCategories().filter(c => c.isActive !== false);
  const products = dbService.getProducts().filter(p => p.isActive !== false);
  const testimonials = dbService.getTestimonials().filter(t => t.isApproved);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Social Links
  const instagramUrl = settings.instagramUrl || 'https://www.instagram.com/ghovedika';
  const facebookUrl = settings.facebookUrl || 'https://www.facebook.com/ghovedika';
  const youtubeUrl = settings.youtubeUrl || 'https://youtube.com/@ghovedika';

  // Hero carousel auto-slide
  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  // Handle hash scrolling if navigating with #anchor
  useEffect(() => {
    if (location.hash) {
      const elem = document.querySelector(location.hash);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  // Filtered Products
  const filteredProducts = products.filter(p => {
    if (selectedCategory !== 'all' && p.categoryId !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.name_en.toLowerCase().includes(q) ||
        p.name_te.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dbService.recordConsent(contactForm.phone || contactForm.email, 'essential_order_fulfillment', true, '/#contact', 'te');
    setContactSubmitted(true);
  };

  return (
    <div className="space-y-16 pb-16 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section id="hero" className="relative overflow-hidden bg-brand-900 text-white min-h-[450px] lg:min-h-[540px] flex items-center">
        {banners.map((banner, index) => {
          const title = getText(banner, 'title');
          const subtitle = getText(banner, 'subtitle');
          const btnText = getText(banner, 'buttonText');

          return (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={banner.imageUrl}
                alt={title}
                className="w-full h-full object-cover object-center transition-all duration-700 opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-0" />

              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center py-20 z-10">
                <div className="max-w-2xl space-y-5">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-400/90 text-brand-950 rounded-full text-xs font-extrabold shadow-md backdrop-blur-md">
                    <Sparkles className="w-4 h-4 text-brand-900 fill-current" />
                    <span>{t('100% సేంద్రీయ & సహజ సిద్ధమైన ఉత్పత్తులు', '100% Pure & Organic Cow Products')}</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-telugu text-white leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                    {title}
                  </h1>

                  <p className="text-base sm:text-lg text-amber-50 font-medium leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] max-w-xl">
                    {subtitle}
                  </p>

                  <div className="pt-3 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => scrollToSection('products')}
                      className="px-7 py-3.5 bg-amber-500 hover:bg-amber-600 text-brand-950 font-extrabold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2.5 text-sm sm:text-base border border-amber-300 cursor-pointer"
                    >
                      <span>{btnText || t('ఇప్పుడే కొనండి', 'Shop Products')}</span>
                      <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                    </button>

                    <button
                      onClick={() => scrollToSection('about')}
                      className="px-7 py-3.5 bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl backdrop-blur-md border border-white/40 transition text-sm sm:text-base drop-shadow cursor-pointer"
                    >
                      {t('గోవేదిక గురించి', 'Our Story')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {banners.length > 1 && (
          <>
            <button
              onClick={() => setCurrentSlide(prev => (prev - 1 + banners.length) % banners.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white transition backdrop-blur-sm"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setCurrentSlide(prev => (prev + 1) % banners.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white transition backdrop-blur-sm"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {banners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === currentSlide ? 'bg-brand-gold w-8' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* 2. CATEGORY FILTER TABS & PRODUCT CATALOG SHOWCASE */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        
        {/* Section Title & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-6">
          <div>
            <span className="text-xs font-bold text-brand-earth uppercase tracking-widest block mb-1">
              {t('ఉత్పత్తుల కేటలాగ్', 'E-Commerce Catalog')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-telugu text-brand-900">
              {t('మా ప్రాకృతిక ఉత్పత్తులు', 'Pure Desi Cow Products & Bio-Fertilizers')}
            </h2>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder={t('ఉత్పత్తుల శోధన...', 'Search product catalog...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-brand-500 shadow-sm"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Client-Side Category Chips */}
        <div id="categories" className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none scroll-mt-24">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`min-h-[44px] px-5 py-2.5 text-xs font-bold rounded-full transition whitespace-nowrap flex items-center justify-center cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-brand-500 text-white shadow-md'
                : 'bg-white border border-gray-200 text-gray-700 hover:border-brand-300'
            }`}
          >
            {t('అన్నీ (All)', `All Products (${products.length})`)}
          </button>

          {categories.map((cat) => {
            const catName = getText(cat, 'name');
            const isSelected = selectedCategory === cat.id;
            const count = products.filter(p => p.categoryId === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`min-h-[44px] px-5 py-2.5 text-xs font-bold rounded-full transition whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-brand-500 text-white shadow-md'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-brand-300'
                }`}
              >
                <span className="font-telugu">{catName}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Product Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-gray-200 space-y-3">
              <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="font-bold text-gray-700 text-base font-telugu">
                {t('ఉత్పత్తులు లభ్యం కాలేదు', 'No products found')}
              </h3>
              <p className="text-xs text-gray-500">Try changing your search term or category filter.</p>
              <button
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="px-4 py-2 bg-brand-50 text-brand-700 text-xs font-bold rounded-xl border border-brand-200"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section id="about" className="bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 text-white py-16 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-400/30 rounded-full text-amber-300 text-xs font-bold">
                <Award className="w-4 h-4" />
                <span>{t('గోదావరి సాంప్రదాయం', 'Authentic Godavari Heritage')}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold font-telugu leading-tight">
                {t(
                  'ఎందుకు గోవేదిక ఉత్పత్తులను ఎంచుకోవాలి?',
                  'Why Choose Ghovedika Products?'
                )}
              </h2>

              <p className="text-sm text-gray-200 leading-relaxed">
                {t(
                  'పశ్చిమ గోదావరి జిల్లా పోడూరు మండలం వేదంగిపాలెం వద్ద ఉన్న మా పవిత్ర గోశాల ప్రాంగణం నుండి స్వచ్ఛమైన దేశీ గోవుల గోమయం మరియు గోమూత్రంతో జీవ ఎరువులు, గోమయ ధూప్ స్టిక్స్, విభూతి, వరి వెన్నుల తోరణాలు తయారు చేయబడుతున్నాయి.',
                  'From our holy Goshala at Vedangi–Vedangipalem, Poduru Mandal, West Godavari, we churn traditional A2 Desi Cow Ghee and synthesize organic bio-fertilizers (Ghana & Drava Jeevamrutham) using ancient natural Vedic methods.'
                )}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  { title_te: '100% స్వచ్ఛమైన దేశీ ఆవులు', title_en: '100% Pure Desi Cow', desc_te: 'గోమయ, గోమూత్ర సేకరణ', desc_en: 'Ethically sourced dung & urine' },
                  { title_te: 'కట్టె కవ్వం బిలోనా నెయ్యి', title_en: 'Bilona Churned Ghee', desc_te: 'పురాతన పద్ధతిలో తయారీ', desc_en: 'Curd churned A2 Ghee' },
                  { title_te: 'రసాయన రహిత ఎరువులు', title_en: 'Zero Chemical Farming', desc_te: 'నేల సత్తువ పెంపు', desc_en: 'High yield soil restoration' },
                  { title_te: 'హస్తకళా తోరణాలు', title_en: 'Handcrafted Tassels', desc_te: 'వరి వెన్నుల అలంకరణ', desc_en: 'Traditional Paddy Decor' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-white">{t(item.title_te, item.title_en)}</h4>
                      <p className="text-xs text-gray-300">{t(item.desc_te, item.desc_en)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden border-4 border-brand-gold/30 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=800&q=80"
                  alt="Ghovedika Premises"
                  className="w-full h-[380px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                  <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                    {t('మా ప్రాంగణం', 'Our Premises')}
                  </span>
                  <h3 className="text-xl font-bold font-telugu text-white">
                    వేదంగి–వేదంగిపాలెం, పోడూరు మండలం
                  </h3>
                  <p className="text-xs text-gray-300">
                    పశ్చిమ గోదావరి జిల్లా, ఆంధ్ర ప్రదేశ్ - 534260
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. STORES SECTION */}
      <section id="stores" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block">
            {t('స్టోర్ స్థలాలు', 'Visit Our Physical Stores')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-telugu text-brand-900">
            {t('పాలకొల్లు రిటైల్ అవుట్‌లెట్ & గోశాల ప్రాంగణం', 'Store Locations & Goshala Premises')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Palakollu Store */}
          <div className="bg-white p-6 rounded-3xl border border-brand-100 shadow-card space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-brand-500 font-bold text-sm">
                <Store className="w-5 h-5 text-amber-500" />
                <span>{t('పాలకొల్లు రిటైల్ షాప్', 'Palakollu Retail Store')}</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {settings.storeAddress}
              </p>
              <div className="text-xs text-gray-500 space-y-1 pt-2 border-t">
                <p><strong>Phone:</strong> {settings.primaryPhone}</p>
                <p><strong>Hours:</strong> Mon - Sun: 8:00 AM - 9:00 PM</p>
              </div>
            </div>
            {settings.googleMapsUrlStore && (
              <a
                href={settings.googleMapsUrlStore}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-brand-50 text-brand-700 font-bold text-xs rounded-xl border border-brand-200 hover:bg-brand-100"
              >
                <MapPin className="w-4 h-4" />
                <span>View Google Maps Location</span>
              </a>
            )}
          </div>

          {/* Vedangipalem Premises */}
          <div className="bg-white p-6 rounded-3xl border border-brand-100 shadow-card space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
                <MapPin className="w-5 h-5 text-amber-500" />
                <span>{t('వేదంగిపాలెం గోశాల ప్రాంగణం', 'Vedangipalem Goshala Premises')}</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {settings.premisesAddress}
              </p>
              <div className="text-xs text-gray-500 space-y-1 pt-2 border-t">
                <p><strong>Phone:</strong> {settings.secondaryPhone}</p>
                <p><strong>Visitor Hours:</strong> Mon - Sun: 7:00 AM - 6:00 PM</p>
              </div>
            </div>
            {settings.googleMapsUrlPremises && (
              <a
                href={settings.googleMapsUrlPremises}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-amber-50 text-amber-900 font-bold text-xs rounded-xl border border-amber-200 hover:bg-amber-100"
              >
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>View Goshala Maps Location</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* 5. REVIEWS & TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
            {t('వినియోగదారుల అభిప్రాయాలు', 'Customer Reviews')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-telugu text-brand-900">
            {t('మా కస్టమర్లు ఏమి చెప్తున్నారు?', 'What Our Customers Say')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((tItem) => {
            const comment = getText(tItem, 'comment');
            return (
              <div
                key={tItem.id}
                className="bg-white p-6 rounded-2xl border border-brand-100 shadow-card flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex text-amber-400">
                    {[...Array(tItem.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-700 italic leading-relaxed">
                    "{comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">{tItem.name}</h4>
                    <span className="text-[11px] text-gray-500">{tItem.location}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {t('ధృవీకరించబడిన కస్టమర్', 'Verified Buyer')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. CONTACT SECTION */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block">
            {t('సంప్రదించండి', 'Contact Us')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-telugu text-brand-900">
            {t('మమ్మల్ని సంప్రదించండి', 'Get in Touch with Ghovedika')}
          </h2>
          <p className="text-xs text-gray-600">
            {t('ఉత్పత్తులు, ఎరువులు లేదా ఆర్డర్‌ల సమాచారం కోసం మమ్మల్ని సంప్రదించవచ్చు.', 'Have questions about our bio-fertilizers or orders? Send us an inquiry.')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-3xl border border-brand-100 shadow-card space-y-6">
            <h3 className="text-lg font-bold font-telugu text-brand-900">
              {t('సందేశం పంపండి', 'Send Us a Message')}
            </h3>

            {contactSubmitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-emerald-900 text-base">{t('ధన్యవాదాలు!', 'Thank You!')}</h3>
                <p className="text-xs text-emerald-800">
                  {t('మీ సందేశం మాకు అందింది. త్వరలోనే మిమ్మల్ని సంప్రదిస్తాము.', 'We have received your inquiry and will respond shortly.')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    {t('మీ పేరు', 'Your Name')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="e.g. Somu Rao"
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      {t('ఫోన్ నంబర్', 'Mobile Number')} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="8008588599"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      {t('ఇమెయిల్', 'Email Address')}
                    </label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="name@gmail.com"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    {t('సందేశం / ప్రశ్న', 'Your Inquiry / Message')} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Details about product or bulk order..."
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:border-brand-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{t('సందేశం పంపండి', 'Send Message')}</span>
                </button>
              </form>
            )}
          </div>

          {/* Quick Contact Cards */}
          <div className="bg-white p-8 rounded-3xl border border-brand-100 shadow-card space-y-6 flex flex-col justify-between">
            <div className="space-y-5 text-xs text-gray-700">
              <h3 className="text-lg font-bold font-telugu text-brand-900">
                {t('కస్టమర్ కేర్ & హెల్ప్‌లైన్', 'Customer Care & Helpline')}
              </h3>

              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-gray-900 font-bold">{t('ఫోన్ నంబర్లు', 'Phone Numbers')}</strong>
                  <span>{settings.primaryPhone}, {settings.secondaryPhone}</span>
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-gray-900 font-bold">{t('ఇమెయిల్', 'Email Address')}</strong>
                  <span>{settings.email}</span>
                </div>
              </div>

              <div className="flex gap-3 items-start border-t pt-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-gray-900 font-bold">{t('పాలకొల్లు షాప్', 'Store Location')}</strong>
                  <span>{settings.storeAddress}</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4 border-t border-gray-100 space-y-2">
              <span className="font-bold text-xs text-gray-800 font-telugu block">
                {t('సోషల్ మీడియా ఛానెల్‌లు', 'Follow Official Channels')}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="px-3.5 py-1.5 bg-pink-50 text-pink-700 border border-pink-200 rounded-lg text-xs font-bold hover:bg-pink-100">
                  Instagram
                </a>
                <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="px-3.5 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold hover:bg-blue-100">
                  Facebook
                </a>
                <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="px-3.5 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-bold hover:bg-red-100">
                  YouTube
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
