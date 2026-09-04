import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { dbService } from '../services/db';

export const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  const settings = dbService.getSettings();

  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const instagramUrl = settings.instagramUrl || 'https://www.instagram.com/ghovedika?igsi=MTh3ejE2bm1naHgxZw==';
  const facebookUrl = settings.facebookUrl || 'https://www.facebook.com/share/1DJTJXW4wL/?mibextid=wwXIfr';
  const youtubeUrl = settings.youtubeUrl || 'https://youtube.com/@ghovedika?si=372SZ0l_EllLUDu8';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dbService.recordConsent(form.phone || form.email, 'essential_order_fulfillment', true, '/contact', 'te');
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl font-extrabold font-telugu text-brand-900">
          {t('మమ్మల్ని సంప్రదించండి', 'Contact Ghovedika')}
        </h1>
        <p className="text-sm text-gray-600">
          {t('ఉత్పత్తులు, ఎరువులు లేదా ఆర్డర్‌ల సమాచారం కోసం మమ్మల్ని సంప్రదించవచ్చు.', 'Have questions about our bio-fertilizers or orders? Get in touch with us.')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-3xl border border-brand-100 shadow-card space-y-6">
          <h2 className="text-xl font-bold font-telugu text-brand-900">
            {t('సందేశం పంపండి', 'Send Us a Message')}
          </h2>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-emerald-900 text-base">{t('ధన్యవాదాలు!', 'Thank You!')}</h3>
              <p className="text-xs text-emerald-800">
                {t('మీ సందేశం మాకు అందింది. త్వరలోనే మిమ్మల్ని సంప్రదిస్తాము.', 'We have received your inquiry and will respond shortly.')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  {t('మీ పేరు', 'Your Name')} *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
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
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
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
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Details about product or order..."
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:border-brand-500"
                />
              </div>

              {/* Just-In-Time Privacy Notice */}
              <div className="p-3 bg-brand-50/60 rounded-xl border border-brand-100 text-xs text-gray-600 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <span>
                  {t(
                    'మీరు అందించే సమాచారం మీ ప్రశ్నకు ప్రతిస్పందించడానికి మాత్రమే ఉపయోగించబడుతుంది.',
                    'The information you provide will be used exclusively to respond to your enquiry.'
                  )}
                  <Link to="/privacy-policy" target="_blank" className="text-brand-600 underline font-bold ml-1">
                    {t('గోప్యతా విధానం చదవండి', 'View Privacy Policy')}
                  </Link>
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{t('సందేశం పంపండి', 'Send Message')}</span>
              </button>
            </form>
          )}
        </div>

        {/* Contact Info Box & Social Channels */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-brand-100 shadow-card space-y-6">
            <h2 className="text-xl font-bold font-telugu text-brand-900">
              {t('నేరుగా సంప్రదించండి', 'Direct Contacts & Premises')}
            </h2>

            <div className="space-y-4 text-xs text-gray-700">
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
                  <strong className="block text-gray-900 font-bold">{t('ఇమెయిల్ ఐడీ', 'Email Address')}</strong>
                  <span>{settings.email}</span>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-gray-900 font-bold">{t('పాలకొల్లు రిటైల్ స్టోర్', 'Palakollu Store Address')}</strong>
                  <span>{settings.storeAddress}</span>
                </div>
              </div>

              <div className="flex gap-3 items-start border-t pt-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-gray-900 font-bold">{t('వేదంగిపాలెం గోశాల ప్రాంగణం', 'Vedangipalem Premises Address')}</strong>
                  <span>{settings.premisesAddress}</span>
                </div>
              </div>
            </div>

            {/* Official Social Links */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <h3 className="font-bold text-sm text-brand-900 font-telugu">
                {t('గోవేదిక సోషల్ మీడియా ఛానెల్‌లు', 'Official Ghovedika Social Channels')}
              </h3>
              
              <div className="flex items-center gap-3">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-pink-50 text-pink-700 border border-pink-200 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-pink-100"
                >
                  Instagram
                </a>

                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-blue-100"
                >
                  Facebook
                </a>

                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-red-100"
                >
                  YouTube
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
