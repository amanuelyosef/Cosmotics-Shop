import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language, LanguageOption } from '../types/i18n';
import { TRANSLATIONS, LANGUAGE_OPTIONS } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof TRANSLATIONS['am'];
  languageOptions: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default language is 'am' (Amharic) when website is opened!
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('faya_preferred_lang') || localStorage.getItem('bedhane_preferred_lang');
    if (saved === 'am' || saved === 'om' || saved === 'en') {
      return saved;
    }
    return 'am'; // Amharic by default
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('faya_preferred_lang', lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = TRANSLATIONS[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languageOptions: LANGUAGE_OPTIONS }}>
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
