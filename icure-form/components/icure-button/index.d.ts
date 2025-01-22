import { LitElement } from 'lit';
export declare class IcureButton extends LitElement {
    label?: string;
    labelPosition?: string;
    visible: boolean;
    defaultLanguage: string;
    translationProvider: (language: string, text: string) => string;
    actionListener: (event: string, payload: unknown) => void;
    event: string;
    payload: unknown;
    static get styles(): import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult<1>;
}
