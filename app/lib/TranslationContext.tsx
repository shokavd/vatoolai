"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, type Locale, type Translations } from "./translations";

type TranslationContextType = {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
};

const TranslationContext = createContext<TranslationContextType>({
  locale: "en",
  t: translations.en,
  setLocale: () => {},
});

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("clarity_ai_locale") as Locale | null;
    if (saved && translations[saved]) setLocaleState(saved);
  }, []);

  function setLocale(newLocale: Locale) {
    setLocaleState(newLocale);
    localStorage.setItem("clarity_ai_locale", newLocale);
  }

  return (
    <TranslationContext.Provider value={{ locale, t: translations[locale], setLocale }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  return useContext(TranslationContext);
}
