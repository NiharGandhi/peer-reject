'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from '@/locales/en.json';
import ar from '@/locales/ar.json';

type Lang = 'en' | 'ar';
type Theme = 'dark' | 'light';
type TranslationKey = keyof typeof en;
type Translations = typeof en;

const translations: Record<Lang, Translations> = { en, ar };

interface LangContextValue {
  lang: Lang;
  toggleLang: () => void;
  t: (key: TranslationKey) => string;
  theme: Theme;
  toggleTheme: () => void;
}

const LangContext = createContext<LangContextValue>({
  lang: 'en',
  toggleLang: () => {},
  t: (key) => en[key],
  theme: 'dark',
  toggleTheme: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const storedLang = (localStorage.getItem('lang') as Lang) ?? 'en';
    const storedTheme = (localStorage.getItem('theme') as Theme) ?? 'dark';
    applyLang(storedLang);
    applyTheme(storedTheme);
    setLang(storedLang);
    setTheme(storedTheme);
  }, []);

  const applyLang = (l: Lang) => {
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = l;
  };

  const applyTheme = (t: Theme) => {
    document.documentElement.setAttribute('data-theme', t);
  };

  const toggleLang = () => {
    const next: Lang = lang === 'en' ? 'ar' : 'en';
    setLang(next);
    localStorage.setItem('lang', next);
    applyLang(next);
  };

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    applyTheme(next);
  };

  const t = (key: TranslationKey): string =>
    (translations[lang] as Translations)[key] ?? en[key];

  return (
    <LangContext.Provider value={{ lang, toggleLang, t, theme, toggleTheme }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
