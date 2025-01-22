import { CSSResultGroup, TemplateResult } from 'lit';
import { Field } from '../common';
declare const IcureDropdownField_base: (new (...args: any[]) => import("../common/field-with-options").FieldWithOptionsMixinInterface) & typeof Field;
export declare class IcureDropdownField extends IcureDropdownField_base {
    placeholder: string;
    protected displayMenu: boolean;
    protected textInputValue?: string;
    static get styles(): CSSResultGroup[];
    togglePopup(event: MouseEvent, force?: boolean): void;
    _handleClickOutside(event: MouseEvent): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    textInputChanged(): (e: Event) => void;
    private triggerSearch;
    handleOptionButtonClicked(id: string | undefined): (e: Event) => boolean;
    getValueFromProvider(): [string, string] | [undefined, undefined];
    render(): TemplateResult;
}
export {};
