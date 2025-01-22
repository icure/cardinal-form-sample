import { LitElement } from 'lit';
import { Form } from '../../../model';
export declare class FormSelectionButton extends LitElement {
    forms?: [string, Form][];
    formAdded: (title: string, form: Form) => void;
    label: string;
    translationProvider: (language: string, text: string) => string;
    language: string;
    private displayMenu;
    static get styles(): import("lit").CSSResult[];
    _handleClickOutside(event: MouseEvent): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
}
