import { SchemaSpec } from 'prosemirror-model';
export type DocumentSchema = 'text-document';
export type InlineSchema = 'styled-text' | 'text' | 'text-with-codes' | 'styled-text-with-codes';
export type StyledSchema = 'text-document' | 'styled-text' | 'styled-text-with-codes';
export declare function getMarkdownSpec(type: DocumentSchema | InlineSchema, contentProvider: (codes: {
    type: string;
    code: string;
}[]) => string, colorProvider: (type: string, code: string, isCode: boolean) => string): SchemaSpec;
