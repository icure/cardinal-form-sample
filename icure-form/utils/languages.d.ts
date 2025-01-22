import { TranslationTable } from '../components/model';
export declare const languages: {
    [key: string]: string;
};
export declare const languageName: (iso: string) => string;
export declare const defaultTranslationProvider: (translations: TranslationTable[]) => (language: string, text: string) => string;
