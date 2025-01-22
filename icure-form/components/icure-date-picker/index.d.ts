import { CSSResultGroup, TemplateResult } from 'lit';
import 'app-datepicker';
import { CustomEventDetail } from 'app-datepicker/dist/typings';
import { Field } from '../common';
export declare class IcureDatePickerField extends Field {
    placeholder: string;
    protected displayDatePicker: boolean;
    static get styles(): CSSResultGroup[];
    _handleClickOutside(event: MouseEvent): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    getValueFromProvider(): string | undefined;
    render(): TemplateResult;
    dateUpdated(date: CustomEventDetail['date-updated']): void;
    togglePopup(): void;
}
