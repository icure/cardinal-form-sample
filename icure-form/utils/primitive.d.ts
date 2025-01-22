import { PrimitiveType } from '../components/model';
export declare const normalizeUnit: (value: number, unit?: string) => number;
export type ParsedPrimitiveType = number | string | boolean | Date | ParsedPrimitiveType[];
export declare const parsePrimitive: (value: PrimitiveType) => ParsedPrimitiveType | undefined;
