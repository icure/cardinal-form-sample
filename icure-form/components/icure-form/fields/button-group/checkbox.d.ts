import { Field } from '../../../common';
import { Code } from '../../../model';
export declare class CheckBox extends Field {
    optionsProvider: (language: string, searchTerm?: string) => Promise<Code[]>;
    render(): import("lit-html").TemplateResult<1>[];
}
