import { CSSResultGroup, LitElement, TemplateResult } from 'lit';
import '../../../icure-label';
export declare class Button extends LitElement {
    static get styles(): CSSResultGroup[];
    label?: string;
    visible: boolean;
    defaultLanguage: string;
    translationProvider: (language: string, text: string) => string;
    actionListener: (event: string, payload: unknown) => void;
    event: string;
    payload: unknown;
    render(): TemplateResult;
}
