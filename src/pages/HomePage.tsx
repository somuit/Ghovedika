import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, ShieldCheck, Award, Heart, Sparkles, 
  ChevronLeft, ChevronRight, CheckCircle2, Star, RefreshCw 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { dbService, useLiveDatabase } from '../services/db';
import { ProductCard } from '../components/common/ProductCard';

export const HomePage: React.FC = () => {
  const { t, getText } = useLanguage();
  const navigate = useNavigate();
  useLiveDatabase(); // Auto re-render on live database changes across all devices

  const banners = dbService.getBanners().filter(b => b.isActive !== false && (!b.position || b.position === 'hero'));
  const categories = dbService.getCategories().filter(c => c.isActive !== false);
  const products = dbService.getProducts().filter(p => p.isActive !== false);
  const testimonials = dbService.getTestimonials().filter(t => t.isApproved);


  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 8);
  const bestSellers = products.slice(0, 4);

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Banner Carousel */}
      <section className="relative overflow-hidden bg-brand-900 text-white min-h-[450px] lg:min-h-[540px] flex items-center">
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
              {/* Background Image with Clear Subtle Gradient */}
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
                    <Link
                      to={banner.linkUrl || '/shop'}
                      className="px-7 py-3.5 bg-amber-500 hover:bg-amber-600 text-brand-950 font-extrabold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2.5 text-sm sm:text-base border border-amber-300"
                    >
                      <span>{btnText || t('ఇప్పుడే కొనండి', 'Shop Now')}</span>
                      <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                    </Link>

                    <Link
                      to="/about"
                      className="px-7 py-3.5 bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl backdrop-blur-md border border-white/40 transition text-sm sm:text-base drop-shadow"
                    >
                      {t('గోవేదిక గురించి', 'Our Story')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Carousel Navigation Arrows */}
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

            {/* Slide Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {banners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === currentSlide ? 'bg-brand-gold w-8' : 'bg-white/40'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Categories Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-brand-earth uppercase tracking-widest block mb-1">
              {t('కేటగిరీలు', 'Explore Categories')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-telugu text-brand-900">
              {t('మా ప్రాకృతిక ఉత్పత్తుల శ్రేణి', 'Authentic Product Categories')}
            </h2>
          </div>
          <Link
            to="/categories"
            className="inline-flex items-center gap-1 text-xs font-bold text-brand-500 hover:text-brand-600 group"
          >
            <span>{t('అన్ని కేటగిరీలు చూడండి', 'View All Categories')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => {
            const catName = getText(cat, 'name');
            const catDesc = getText(cat, 'description');
            const catProductsCount = products.filter(p => p.categoryId === cat.id).length;

            return (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover border border-brand-100 bg-white transition-all duration-300 flex flex-col h-64"
              >
                <div className="h-36 overflow-hidden bg-gray-100 relative">
                  <img
                    src={cat.image}
                    alt={catName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-2 left-2 bg-brand-gold text-brand-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {catProductsCount} {t('ఉత్పత్తులు', 'Products')}
                  </span>
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm group-hover:text-brand-500 transition-colors line-clamp-1 font-telugu">
                      {catName}
                    </h3>
                    <p className="text-[11px] text-gray-500 line-clamp-2 mt-1">
                      {catDesc}
                    </p>
                  </div>
                  <div className="flex items-center text-xs font-semibold text-brand-500 pt-2">
                    <span>{t('చూడండి', 'Explore')}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-1">
              {t('ప్రత్యేక ఆఫర్లు', 'Featured Products')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-telugu text-brand-900">
              {t('అత్యంత ప్రజాదరణ పొందిన ఉత్పత్తులు', 'Most Popular Organics')}
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1 text-xs font-bold text-brand-500 hover:text-brand-600 group"
          >
            <span>{t('అన్ని ఉత్పత్తులు', 'View All Products')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Why Ghovedika - Authenticity Banner */}
      <section className="bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 text-white py-16">
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

              <div className="pt-4">
                <Link
                  to="/store-locations"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gold text-brand-900 font-bold rounded-xl shadow-lg hover:bg-amber-500 transition"
                >
                  <span>{t('మా స్టోర్ మరియు ప్రాంగణ వివరాలు', 'Visit Our Stores & Premises')}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Video / Location Reference Image Card */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden border-4 border-brand-gold/30 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=800&q=80"
                  alt="Ghovedika Premises"
                  className="w-full h-[400px] object-cover"
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

      {/* Customer Reviews & Testimonials */}
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

    </div>
  );
};
