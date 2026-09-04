import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { dbService } from '../../services/db';

export const WhatsAppButton: React.FC = () => {
  const { t } = useLanguage();
  const settings = dbService.getSettings();
  const phone = settings.whatsappNumber || '918008588599';

  const defaultMsg = encodeURIComponent(
    t(
      'నమస్కారం గోవేదిక, నేను మీ ఉత్పత్తుల గురించి మరింత సమాచారం కోరుకుంటున్నాను.',
      'Namaste Ghovedika, I would like to inquire about your natural cow products.'
    )
  );

  const whatsappUrl = `https://wa.me/${phone}?text=${defaultMsg}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
    >
      <MessageCircle className="w-6 h-6 fill-current" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-sm font-medium">
        {t('వాట్సాప్‌లో మాట్లాడండి', 'Chat on WhatsApp')}
      </span>
    </a>
  );
};
