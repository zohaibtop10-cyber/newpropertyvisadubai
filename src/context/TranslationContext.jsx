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
    // Handle RTL for Arabic & Urdu natively
    const html = document.documentElement;
    if (language === 'AR' || language === 'UR') {
      html.setAttribute('dir', 'rtl');
      html.lang = language === 'UR' ? 'ur' : 'ar';
    } else {
      html.setAttribute('dir', 'ltr');
      html.lang = language.toLowerCase();
    }

    const gtMap = {
      EN: 'en',
      AR: 'ar',
      RU: 'ru',
      DE: 'de',
      ES: 'es',
      FR: 'fr',
      TR: 'tr',
      ZH: 'zh-CN',
      TL: 'tl',
      HI: 'hi',
      UR: 'ur'
    };

    // Trigger Google Translate via Cookie
    const triggerGoogleTranslate = () => {
      const code = gtMap[language];
      const cookieName = 'googtrans';
      const expectedCookie = `/en/${code}`;

      // Helper to clear cookies
      const clearCookies = () => {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        if (window.location.hostname !== 'localhost') {
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${window.location.hostname}; path=/;`;
          // Sometimes google sets it on the root domain without the leading dot
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${window.location.hostname}; path=/;`;
        }
      };

      // Helper to set cookies
      const setCookie = (val) => {
        document.cookie = `${cookieName}=${val}; path=/;`;
        if (window.location.hostname !== 'localhost') {
          document.cookie = `${cookieName}=${val}; domain=.${window.location.hostname}; path=/;`;
        }
      };

      const getCookie = () => {
        const match = document.cookie.match(new RegExp('(^| )' + cookieName + '=([^;]+)'));
        return match ? match[2] : null;
      };

      const currentCookie = getCookie();

      if (language === 'EN') {
        if (currentCookie) {
          clearCookies();
          window.location.reload();
        }
      } else {
        if (currentCookie !== expectedCookie) {
          clearCookies();
          setCookie(expectedCookie);
          window.location.reload();
        }
      }
    };

    // Execute
    triggerGoogleTranslate();

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
