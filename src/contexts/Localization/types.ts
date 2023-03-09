import { Language } from './Provider'

export type ContextData = {
  [key: string]: string
}

export interface ProviderState {
  isFetching: boolean
  currentLanguage: Language
}

export interface ContextApi extends ProviderState {
  setLanguage: (language: Language) => void
  t: Translate
}

export type Translate = (key: string, data?: ContextData) => string
