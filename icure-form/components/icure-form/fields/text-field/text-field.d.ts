import { Field } from '../../../common';
import { Suggestion } from '../../../../generic';
export declare class TextField extends Field {
    multiline: boolean | string;
    lines: number;
    rows: number;
    grows: boolean;
    unit?: string;
    suggestionStopWords: Set<string>;
    linksProvider: (sug: {
        id: string;
        code: string;
        text: string;
        terms: string[];
    }) => Promise<{
        href: string;
        title: string;
    } | undefined>;
    suggestionProvider: (terms: string[]) => Promise<Suggestion[]>;
    codeColorProvider: (type: string, code: string) => string;
    linkColorProvider: (type: string, code: string) => string;
    codeContentProvider: (codes: {
        type: string;
        code: string;
    }[]) => string;
    render(): import("lit-html").TemplateResult<1>[];
}
