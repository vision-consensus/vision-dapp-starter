import React, { createContext, useCallback, useEffect, useState } from "react";
import { EN, languages } from "../../config/localization/languages";
import en from "../../config/localization/en-US.json";
import { ContextApi, ContextData, ProviderState } from "./types";
import { LS_KEY, fetchLocale, getLanguageCodeFromLS } from "./helpers";

export interface Language {
  code: string;
  language: string;
  locale: string;
}

export type LanguageKeys = keyof typeof languages;

const initialState: ProviderState = {
  isFetching: true,
  currentLanguage: EN,
};

// Export the translations directly
export const languageMap = new Map<
  Language["locale"],
  Record<string, string>
>();
languageMap.set(EN.locale, en);

export const LanguageContext = createContext<ContextApi>(undefined as any);

export const LanguageProvider: React.FC<any> = ({ children }) => {
  const [state, setState] = useState<ProviderState>(() => {
    const codeFromStorage = getLanguageCodeFromLS() as LanguageKeys;

    return {
      ...initialState,
      currentLanguage: languages[codeFromStorage],
    };
  });
  const { currentLanguage } = state;

  useEffect(() => {
    const fetchInitialLocales = async () => {
      const codeFromStorage = getLanguageCodeFromLS() as LanguageKeys;

      if (codeFromStorage !== EN.locale) {
        const enLocale = languageMap.get(EN.locale);
        const currentLocale = await fetchLocale(codeFromStorage);
        languageMap.set(codeFromStorage, { ...enLocale, ...currentLocale });
      }

      setState((prevState) => ({
        ...prevState,
        isFetching: false,
      }));
    };

    fetchInitialLocales();
  }, [setState]);

  const setLanguage = async (language: Language) => {
    if (!languageMap.has(language.locale)) {
      setState((prevState) => ({
        ...prevState,
        isFetching: true,
      }));

      const locale = await fetchLocale(language.locale);
      const enLocale = languageMap.get(EN.locale);

      // Merge the EN locale to ensure that any locale fetched has all the keys
      languageMap.set(language.locale, { ...enLocale, ...locale });
      localStorage.setItem(LS_KEY, language.locale);

      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        currentLanguage: language,
      }));
    } else {
      localStorage.setItem(LS_KEY, language.locale);
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        currentLanguage: language,
      }));
    }
  };

  const translate = useCallback(
    (key: string, data?: ContextData) => {
      const translationSet = languageMap.has(currentLanguage.locale)
        ? languageMap.get(currentLanguage.locale)
        : languageMap.get(EN.locale);
      const translatedText = translationSet ? translationSet[key] : key;

      // Check the existence of at least one combination of %%, separated by 1 or more non space characters
      const includesVariable = translatedText ? translatedText.match(/%\S+?%/gm) : key;

      if (includesVariable && data) {
        let interpolatedText = translatedText;
        Object.keys(data).forEach((dataKey) => {
          const templateKey = new RegExp(`%${dataKey}%`, "g");
          try {
            interpolatedText = interpolatedText.replace(
              templateKey,
              data[dataKey].toString()
            );
          } catch (e) {
            // console.log(e)
          }
        });

        return interpolatedText || key;
      }

      return translatedText || key;
    },
    [currentLanguage]
  );

  return (
    <LanguageContext.Provider value={{ ...state, setLanguage, t: translate }}>
      {children}
    </LanguageContext.Provider>
  );
};
