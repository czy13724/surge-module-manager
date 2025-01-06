import { useState, useEffect } from 'react';
import { translations } from '../locales/translations';

export type Language = 'zh' | 'en';

export function useTranslation() {
  const [language, setLanguage] = useState<Language>('zh');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'zh' ? 'en' : 'zh';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const t = (key: keyof typeof translations.en) => {
    return translations[language][key];
  };

  return { t, language, toggleLanguage };
}
