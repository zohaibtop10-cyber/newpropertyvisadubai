import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../locales/en.json';
import ar from '../locales/ar.json';
import ru from '../locales/ru.json';
import de from '../locales/de.json';
import es from '../locales/es.json';
import fr from '../locales/fr.json';
import tr from '../locales/tr.json';
import zh from '../locales/zh.json';

const dictionaries = { EN: en, AR: ar, RU: ru, DE: de, ES: es, FR: fr, TR: tr, ZH: zh };

const TranslationContext = createContext();

export function TranslationProvider({ children, language, setLanguage }) {
  // Derive dictionary during render to avoid useEffect cascading state updates
  const dict = dictionaries[language] || en;

  useEffect(() => {
    // Handle RTL for Arabic natively
    const html = document.documentElement;
    if (language === 'AR') {
      html.setAttribute('dir', 'rtl');
      html.lang = 'ar';
    } else {
      html.setAttribute('dir', 'ltr');
      html.lang = language.toLowerCase();
    }

    // Trigger Google Translate for the entire website DOM
    const gtMap = {
      EN: 'en', // Or empty string to clear
      AR: 'ar',
      RU: 'ru',
      DE: 'de',
      ES: 'es',
      FR: 'fr',
      TR: 'tr',
      ZH: 'zh-CN'
    };

    const triggerGoogleTranslate = () => {
      if (language === 'EN') {
        // Only reload if the translation cookie actually exists
        if (document.cookie.includes('googtrans=')) {
          document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${window.location.hostname}; path=/;`;
          window.location.reload();
        }
        return;
      }

      const selectElement = document.querySelector('.goog-te-combo');
      
      if (selectElement) {
        selectElement.value = gtMap[language];
        selectElement.dispatchEvent(new Event('change'));
      }
    };

    // Give it a small timeout in case the Google script is still initializing
    setTimeout(triggerGoogleTranslate, 300);

  }, [language]);

  // Deep key translation function (e.g. t('navbar.home'))
  const t = (keyString) => {
    const keys = keyString.split('.');
    let value = dict;
    for (const k of keys) {
      if (value[k] === undefined) return keyString; // Fallback to key if not found
      value = value[k];
    }
    return value;
  };

  return (
    <TranslationContext.Provider value={{ t, language, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  return useContext(TranslationContext);
}
