import { Field } from '../../../common';
import { Suggestion } from '../../../../generic';
export declare class TokenField extends Field {
    multiline: boolean | string;
    suggestionProvider: (terms: string[]) => Promise<Suggestion[]>;
    lines: number;
    render(): import("lit-html").TemplateResult<1>;
}
