import { CSSResultGroup, LitElement, TemplateResult } from 'lit';
import '../../../icure-label';
export declare class Label extends LitElement {
    static get styles(): CSSResultGroup[];
    label?: string;
    labelPosition?: string;
    visible: boolean;
    translationProvider: (language: string, text: string) => string;
    defaultLanguage: string;
    render(): TemplateResult;
}
