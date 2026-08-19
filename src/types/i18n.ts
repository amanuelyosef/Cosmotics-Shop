export type Language = 'am' | 'om' | 'en';

export interface LanguageOption {
  code: Language;
  label: string;
  nativeLabel: string;
  flag: string;
}
