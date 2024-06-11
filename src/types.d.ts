// .d because these are definitions

import { type AUTO_LANGUAGE, type SUPPORTED_LANGUAGES } from './constants';

export type Language = keyof typeof SUPPORTED_LANGUAGES;
export type AutoLanguage = typeof AUTO_LANGUAGE;
export type FromLanguage = Language | AutoLanguage;

// If it is an object, it is advisable to use interface because it is easier to extend
export interface State {
  fromLanguage: FromLanguage;
  toLanguage: Language;
  fromText: string;
  result: string;
  loading: boolean;
}

// Have the same type that changes with the action type
export type Action =
  | { type: 'INTERCHANGE_LANGUAGES' }
  | { type: 'SET_FROM_LANGUAGE'; payload: FromLanguage }
  | { type: 'SET_TO_LANGUAGE'; payload: Language }
  | { type: 'SET_FROM_TEXT'; payload: string }
  | { type: 'SET_RESULT'; payload: string };

export enum SectionType {
  'From' = 'from',
  'To' = 'to',
}
