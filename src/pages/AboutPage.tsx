import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Heart, ShieldCheck, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { dbService } from '../services/db';

export const AboutPage: React.FC = () => {
  const { t, getText } = useLanguage();
  const page = dbService.getPageBySlug('about-us');

  const title = page ? getText(page, 'title') : 'About Ghovedika';
  const content = page ? getText(page, 'content') : '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden space-y-4">
        <span className="bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {t('మా కథనం', 'Our Heritage & Mission')}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-telugu leading-tight">
          {title}
        </h1>
        <p className="text-sm sm:text-base text-gray-200 max-w-2xl leading-relaxed">
          {t(
            'గోదావరి నేలల్లో గో సంస్కృతి మరియు ప్రాకృతిక వ్యవసాయ పద్ధతుల వికాసానికి కట్టుబడిన సంస్థ.',
            'Preserving ancient Indian Vedic cow heritage and chemical-free bio-fertilizers.'
          )}
        </p>
      </div>

      {/* Dynamic Content */}
      <div className="bg-white p-8 rounded-3xl border border-brand-100 shadow-card space-y-6 text-sm text-gray-700 leading-relaxed whitespace-pre-line font-telugu">
        {content}
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-brand-100 shadow-card space-y-3">
          <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 text-base font-telugu">{t('స్వచ్ఛమైన గో ఉత్పత్తులు', 'Pure Desi Cow Organics')}</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {t('దేశీ ఆవు గోమయం మరియు గోమూత్రంతో మాత్రమే 100% సహజ పద్ధతుల్లో తయారీ.', '100% unadulterated organic products made strictly from indigenous cow biomass.')}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-brand-100 shadow-card space-y-3">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 text-base font-telugu">{t('రసాయన రహిత వ్యవసాయం', 'Chemical-Free Farming')}</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {t('ఘన, ద్రవ జీవామృతంతో నేలలో సూక్ష్మజీవుల సంఖ్య పెంచి అధిక దిగుబడి.', 'Enhancing soil health and earthworm activity using natural fermented Jeevamrutham.')}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-brand-100 shadow-card space-y-3">
          <div className="w-12 h-12 bg-brand-100 text-brand-700 rounded-xl flex items-center justify-center font-bold">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 text-base font-telugu">{t('రైతులు & చేనేతల ప్రోత్సాహం', 'Artisan & Farmer Welfare')}</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {t('గోదావరి చేతి వృత్తుల వారితో అల్లబడిన స్వచ్ఛమైన వరి వెన్నుల తోరణాలు.', 'Supporting rural Andhra artisans who hand-weave auspicious Godavari Paddy Tassels.')}
          </p>
        </div>
      </div>

    </div>
  );
};
