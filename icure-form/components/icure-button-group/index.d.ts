import { CSSResultGroup, TemplateResult } from 'lit';
import { Field } from '../common';
import { FieldValue } from '../model';
import { Version } from '../../generic';
declare const IcureButtonGroup_base: (new (...args: any[]) => import("../common/field-with-options").FieldWithOptionsMixinInterface) & typeof Field;
export declare class IcureButtonGroup extends IcureButtonGroup_base {
    type: 'radio' | 'checkbox';
    static get styles(): CSSResultGroup[];
    getValueFromProvider(): [string, string[], Version<FieldValue>[]] | [undefined, undefined, undefined];
    checkboxChange(): void;
    render(): TemplateResult;
    private generateStyle;
}
export {};
