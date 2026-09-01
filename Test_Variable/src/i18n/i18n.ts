import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

const LANGUAGE_STORAGE_KEY = 'i18nextLng';
const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) ?? undefined;

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: storedLanguage,
    fallbackLng: 'en',

    supportedLngs: ['en', 'ru', 'ro'],

    ns: ['translation'],
    defaultNS: 'translation',

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    interpolation: {
      escapeValue: false,
    },
  });

i18n.on('languageChanged', (lng) => {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
});

export default i18n;
