import { SchemaSpec } from 'prosemirror-model';
export type TokensSchema = 'tokens-list' | 'styled-tokens-list' | 'tokens-list-with-codes' | 'styled-tokens-list-with-codes';
export declare function getTokensSpec(type: TokensSchema, contentProvider: (codes: {
    type: string;
    code: string;
}[]) => string, colorProvider: (type: string, code: string, isCode: boolean) => string): SchemaSpec;
