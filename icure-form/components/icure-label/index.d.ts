import { LitElement } from 'lit';
export declare class IcureLabel extends LitElement {
    label?: string;
    labelPosition?: string;
    visible: boolean;
    translationProvider: (language: string, text: string) => string;
    defaultLanguage: string;
    static get styles(): import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult<1>;
}
