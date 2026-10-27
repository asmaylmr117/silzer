import { useEffect, useMemo, useState } from 'react';
import { LanguageContext } from './language-context';
import { translations } from './data/siteData';

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try { return localStorage.getItem('sizzler-language') === 'en' ? 'en' : 'ar'; }
    catch { return 'ar'; }
  });

  useEffect(() => {
    const direction = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    try { localStorage.setItem('sizzler-language', language); } catch { /* Storage may be unavailable. */ }
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, direction: language === 'ar' ? 'rtl' : 'ltr', t: translations[language] }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

