import { TemplateResult } from 'lit';
import { Code, Field, Labels } from '../model';
export declare const getLabels: (field: Field) => Labels;
export declare function generateLabels(labels: Labels, language: string, translationProvider?: (language: string, text: string) => string): TemplateResult[];
export declare function generateLabel(label: string, labelPosition: string, language: string, translationProvider?: (language: string, text: string) => string): TemplateResult;
export declare const makePromoter: (promotions: string[]) => (code: Code) => number;
export declare const defaultCodePromoter: (code: Code) => number;
export declare const defaultCodesComparator: (language?: string, ascending?: boolean, codePromoter?: (c: Code) => number) => (a: Code, b: Code) => number;
export declare const naturalCodesComparator: (codePromoter?: (c: Code) => number) => (a: Code, b: Code) => number;
