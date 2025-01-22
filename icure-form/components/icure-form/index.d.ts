import { LitElement } from 'lit';
import { FieldMetadata, FieldValue, Form } from '../model';
import { FormValuesContainer, Suggestion } from '../../generic';
/**
 * Form element
 */
export declare class IcureForm extends LitElement {
    form?: Form;
    renderer: string;
    visible: boolean;
    readonly: boolean;
    displayMetadata: boolean;
    labelPosition?: 'top' | 'left' | 'right' | 'bottom' | 'float' | undefined;
    language?: string;
    languages?: {
        [iso: string]: string;
    };
    formValuesContainer?: FormValuesContainer<FieldValue, FieldMetadata>;
    translationProvider?: (language: string, text: string) => string;
    ownersProvider?: (terms: string[], ids?: string[], specialties?: string[]) => Promise<Suggestion[]>;
    optionsProvider?: (language: string, codifications: string[], terms?: string[]) => Promise<Suggestion[]>;
    actionListener?: (event: string, payload: unknown) => void;
    constructor();
    static get styles(): import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult;
}
