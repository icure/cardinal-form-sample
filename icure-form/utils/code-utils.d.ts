import { Code, Field, SortOptions } from '../components/model';
import { Suggestion } from '../generic';
import { CodeStub } from '@icure/cardinal-sdk';
/**
 * Maps the options defined in a field into a list of codes
 *
 * @param language
 * @param field
 * @param translationProvider
 */
export declare const optionMapper: (language: string, field: Field, translationProvider?: (language: string, text: string) => string) => Code[];
export declare const sortCodes: (codes: Code[], language: string, sortOptions?: SortOptions) => Code[];
export declare const sortSuggestions: (codes: (Code | Suggestion)[], language: string, sortOptions?: SortOptions) => Suggestion[];
export declare const filterAndSortOptionsFromFieldDefinition: (language: string, fg: Field, translationProvider: ((language: string, text: string) => string) | undefined, terms?: string[]) => Promise<Code[]>;
export declare const normalizeCodes: (codes: CodeStub[]) => CodeStub[];
/**
 * Normalizes the code's four main fields (type, code, version and id). The first three are considered to be
 * authoritative, while the id is a pure function of them. The authoritative fields are filled in from the id if
 * missing, or the version is set to '1' if it is the only missing authoritative field. The id is then rederived from
 * the three fields.
 * @param code The code to normalize.
 * @returns A shallow copy of the input with its type, code, version and id normalized.
 */
export declare function normalizeCode(code: CodeStub): CodeStub;
