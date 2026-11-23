import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import type { Lang } from '../lib/format.ts';
import { en } from './en.ts';
import { hi } from './hi.ts';

export function initI18n(lang: Lang) {
  void i18n.use(initReactI18next).init({
    resources: { en: { translation: en }, hi: { translation: hi } },
    lng: lang,
    fallbackLng: 'en',
    keySeparator: false,
    nsSeparator: false,
    interpolation: { escapeValue: false },
    returnNull: false,
  });
  document.documentElement.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
  return i18n;
}

export function setLanguage(lang: Lang) {
  void i18n.changeLanguage(lang);
  document.documentElement.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
}

/** useTranslation plus the current language as a `Lang`. */
export function useT() {
  const { t, i18n: inst } = useTranslation();
  const lang: Lang = inst.language === 'hi' ? 'hi' : 'en';
  return { t, lang };
}
