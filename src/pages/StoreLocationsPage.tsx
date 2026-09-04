import React from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink, Navigation } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { dbService } from '../services/db';

export const StoreLocationsPage: React.FC = () => {
  const { t } = useLanguage();
  const settings = dbService.getSettings();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block">
          {t('మా ప్రాంగణం & స్టోర్', 'Stores & Premises')}
        </span>
        <h1 className="text-3xl font-extrabold font-telugu text-brand-900">
          {t('గోవేదిక చిరునామా మరియు స్థలాలు', 'Ghovedika Store Locations')}
        </h1>
        <p className="text-sm text-gray-600">
          {t(
            'పశ్చిమ గోదావరి జిల్లా పాలకొల్లు స్టోర్ మరియు వేదంగిపాలెం ప్రాంగణాన్ని సందర్శించండి.',
            'Visit our physical retail store in Palakollu or our Goshala premises in Poduru Mandal.'
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Store Location Card */}
        <div className="bg-white rounded-3xl border border-brand-100 shadow-card overflow-hidden flex flex-col justify-between">
          <div className="h-56 relative bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=800&q=80"
              alt="Palakollu Store"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
              <span className="bg-brand-gold text-brand-900 text-xs font-extrabold px-3 py-1 rounded-full uppercase">
                {t('మెయిన్ రీటైల్ స్టోర్', 'Main Retail Store')}
              </span>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <h2 className="text-xl font-bold font-telugu text-brand-900">
              {t('పాలకొల్లు స్టోర్ (Palakollu Store)', 'Palakollu Store')}
            </h2>

            <div className="space-y-3 text-xs text-gray-700">
              <div className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 block font-semibold">{t('చిరునామా', 'Address')}:</strong>
                  {settings.storeAddress}
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-brand-500 shrink-0" />
                <div>
                  <strong className="text-gray-900 block font-semibold">{t('ఫోన్ నంబర్లు', 'Phones')}:</strong>
                  <span>{settings.primaryPhone}, {settings.secondaryPhone}</span>
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <Clock className="w-5 h-5 text-brand-500 shrink-0" />
                <div>
                  <strong className="text-gray-900 block font-semibold">{t('సమయం', 'Timings')}:</strong>
                  <span>{t('రోజూ ఉదయం 8:00 నుండి రాత్రి 8:30 వరకు', 'Daily 8:00 AM - 8:30 PM')}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <a
                href={settings.googleMapsUrlStore}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow flex items-center justify-center gap-2 transition"
              >
                <Navigation className="w-4 h-4" />
                <span>{t('గూగుల్ మ్యాప్స్‌లో చూడండి', 'Open in Google Maps')}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Premises Location Card */}
        <div className="bg-white rounded-3xl border border-brand-100 shadow-card overflow-hidden flex flex-col justify-between">
          <div className="h-56 relative bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80"
              alt="Vedangipalem Premises"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
              <span className="bg-emerald-600 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase">
                {t('గోశాల & తయారీ ప్రాంగణం', 'Goshala & Manufacturing Premises')}
              </span>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <h2 className="text-xl font-bold font-telugu text-brand-900">
              {t('వేదంగి–వేదంగిపాలెం ప్రాంగణం', 'Vedangi–Vedangipalem Premises')}
            </h2>

            <div className="space-y-3 text-xs text-gray-700">
              <div className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 block font-semibold">{t('ప్రాంగణ చిరునామా', 'Premises Address')}:</strong>
                  {settings.premisesAddress}
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <strong className="text-gray-900 block font-semibold">{t('సంప్రదించాల్సిన సంఖ్య', 'Helpline')}:</strong>
                  <span>{settings.primaryPhone}</span>
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <strong className="text-gray-900 block font-semibold">{t('ఇమెయిల్', 'Email')}:</strong>
                  <span>{settings.email}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <a
                href={settings.googleMapsUrlPremises}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow flex items-center justify-center gap-2 transition"
              >
                <Navigation className="w-4 h-4" />
                <span>{t('ప్రాంగణ మ్యాప్ లోకేషన్', 'Get Directions to Premises')}</span>
              </a>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
