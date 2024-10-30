// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Импорт переводов
import translationEN from './locales/en/translation.json';
import translationRU from './locales/ru/translation.json';
import translationES from './locales/es/translation.json';

// Содержимое переводов
const resources = {
  en: {
    translation: translationEN
  },
  ru: {
    translation: translationRU
  },
  es: {
    translation: translationES
  }
};

i18n
  // Подключаем детектор языка
  .use(LanguageDetector)
  // Подключаем модуль для работы с React
  .use(initReactI18next)
  // Инициализируем настройки
  .init({
    resources,
    fallbackLng: 'en', // Язык по умолчанию
    debug: true, // Установите в `false` для продакшена

    interpolation: {
      escapeValue: false // React уже экранирует значения
    }
  });

export default i18n;
