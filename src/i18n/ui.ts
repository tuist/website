import en from "./locales/en.json";
import ja from "./locales/ja.json";

export const ui = {
  en,
  ja
};

export const languages = {
    en: 'English',
    ko: 'Korean',
    zh: 'Chinese',
    ja: 'Japanese'
};

export const defaultLang = 'en';
export const languagesExceptDefault = Object.keys(languages).filter(lang => lang !== defaultLang);

export const showDefaultLang = false;