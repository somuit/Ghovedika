import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (te: string, en: string) => string;
  getText: <T extends Record<string, any>>(obj: T | undefined | null, field: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = typeof window !== 'undefined' ? sessionStorage.getItem('ghovedika_lang') : null;
    return (saved === 'en' || saved === 'te') ? saved : 'te';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('ghovedika_lang', lang);
    }
    document.documentElement.lang = lang;
  };

  const toggleLanguage = () => {
    const nextLang = language === 'te' ? 'en' : 'te';
    setLanguage(nextLang);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Translate helper: returns Telugu text if active language is 'te', else English
  const t = (te: string, en: string): string => {
    if (language === 'te') return te || en;
    return en || te;
  };

  // Helper for dynamic object fields: e.g. getText(product, 'name') reads product.name_te or product.name_en
  const getText = <T extends Record<string, any>>(obj: T | undefined | null, field: string): string => {
    if (!obj) return '';
    const teKey = `${field}_te`;
    const enKey = `${field}_en`;
    if (language === 'te') {
      return obj[teKey] || obj[enKey] || obj[field] || '';
    }
    return obj[enKey] || obj[teKey] || obj[field] || '';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, getText }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
