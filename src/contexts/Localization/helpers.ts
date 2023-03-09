import { EN } from "../../config/localization/languages";

export const LS_KEY = "lenenapp_language";

export const fetchLocale2 = async (locale: string) => {
  const response = require(`../../config/localization/${locale}.json`);
  const data = await response;
  return data;
};

export const fetchLocale = async (locale: string) => {
  const response = await fetch(`/locales/${locale}.json`)
  const data = await response.json()
  return data
}

export const getLanguageCodeFromLS = () => {
  try {
    const codeFromStorage = localStorage.getItem(LS_KEY);

    return codeFromStorage || EN.locale;
  } catch {
    return EN.locale;
  }
};
