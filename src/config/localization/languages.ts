import { Language } from "../../contexts/Localization";

export const EN: Language = { locale: 'en-US', language: 'English', code: 'en' }
export const ESES: Language = { locale: 'es-ES', language: 'Español', code: 'es-es' }  // 西班牙
export const FIL: Language = { locale: 'fil-PH', language: 'Filipino', code: 'fil' } // 菲律宾
export const KO: Language = { locale: 'ko-KR', language: '한국어', code: 'ko' } // 韩语
export const RU: Language = { locale: 'ru-RU', language: 'Русский', code: 'ru' } // 俄语
export const VI: Language = { locale: 'vi-VN', language: 'Tiếng Việt', code: 'vi' } // 越南语
export const ZHCN: Language = { locale: 'zh-CN', language: '简体中文', code: 'zh-cn' }
export const ZHTW: Language = { locale: 'zh-TW', language: '繁體中文', code: 'zh-tw' }

export const languages = {
  'en-US': EN,
  'es-ES': ESES,
  'fil-PH': FIL,
  'ko-KR': KO,
  'ru-RU': RU,
  'vi-VN': VI,
  'zh-CN': ZHCN,
  'zh-TW': ZHTW,
};

export const languageList = Object.values(languages);
