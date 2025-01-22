import { MarkSpec } from 'prosemirror-model';
export declare const colors: {
    [key: string]: [string, string];
};
export declare function getMarks(contentProvider: (codes: {
    type: string;
    code: string;
}[]) => string, colorProvider: (type: string, code: string, isCode: boolean) => string): {
    [key: string]: MarkSpec;
};
