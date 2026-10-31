import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from './translations';

// FR-16 — lightweight i18n: English, አማርኛ (Amharic), Afaan Oromo, Kiswahili.
// Normalizes language codes so that both 'om' (ISO 639-1 / DB check constraint)
// and 'or' (legacy dictionary key) resolve consistently.
export const normalizeLangCode = (code) => {
  if (!code) return 'en';
  const c = String(code).toLowerCase().trim();
  if (c === 'om' || c === 'or') return 'om';
  if (translations[c]) return c;
  return 'en';
};

export const LANGUAGES = [
  { code: 'en', label: 'English', htmlLang: 'en' },
  { code: 'am', label: 'አማርኛ', htmlLang: 'am' },
  { code: 'om', label: 'Afaan Oromo', htmlLang: 'om' },
  { code: 'sw', label: 'Kiswahili', htmlLang: 'sw' },
];

const STORAGE_KEY = 'nhfas_lang';
const I18nContext = createContext(null);

const detectInitialLang = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return normalizeLangCode(saved);
  } catch { /* storage unavailable — fall through */ }
  const nav = (typeof navigator !== 'undefined' && navigator.language || 'en').slice(0, 2);
  return normalizeLangCode(nav);
};

export const I18nProvider = ({ children }) => {
  const [lang, setLangState] = useState(detectInitialLang);

  useEffect(() => {
    const meta = LANGUAGES.find((entry) => entry.code === lang) || LANGUAGES[0];
    document.documentElement.lang = meta.htmlLang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* ignore */ }
  }, [lang]);

  const setLang = useCallback((rawCode) => {
    const code = normalizeLangCode(rawCode);
    setLangState(code);
  }, []);

  // t(key) → active language → English → the key itself (never blanks UI).
  const t = useCallback((key) => {
    const dict = translations[lang] || (lang === 'om' ? translations.or : null);
    return dict?.[key] ?? translations.en?.[key] ?? key;
  }, [lang]);

  const value = useMemo(() => ({ t, lang, setLang, languages: LANGUAGES }), [t, lang, setLang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    return { t: (key) => translations.en[key] ?? key, lang: 'en', setLang: () => {}, languages: LANGUAGES };
  }
  return context;
};
