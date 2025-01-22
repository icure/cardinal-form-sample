import { TemplateResult } from 'lit';
import { Field } from '../../../common';
import { Suggestion } from '../../../../generic';
export declare class DropdownField extends Field {
    optionsProvider: (language: string, searchTerm?: string) => Promise<Suggestion[]>;
    render(): TemplateResult[];
}
