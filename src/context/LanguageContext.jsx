import React, { createContext, useContext, useEffect, useState } from 'react';
import { TRANSLATIONS } from '../translations/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('avm_language');
    return saved === 'hi' ? 'hi' : 'en'; // English default
  });

  useEffect(() => {
    localStorage.setItem('avm_language', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  /**
   * Helper function to get translation by key path, e.g. t('nav.home', 'Home')
   */
  const t = (keyPath, fallback = '') => {
    if (!keyPath) return fallback;
    const parts = keyPath.split('.');
    let current = TRANSLATIONS[language];
    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        // Fallback to English if translation missing in Hindi
        let enCurrent = TRANSLATIONS['en'];
        for (const p of parts) {
          if (enCurrent && typeof enCurrent === 'object' && p in enCurrent) {
            enCurrent = enCurrent[p];
          } else {
            return fallback || keyPath;
          }
        }
        return enCurrent || fallback || keyPath;
      }
    }
    return current || fallback || keyPath;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage,
        setLanguage,
        t,
        isHindi: language === 'hi',
        translations: TRANSLATIONS[language]
      }}
    >
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
