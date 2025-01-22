import { DocumentSchema, InlineSchema, StyledSchema } from '../icure-text-field/schema/markdown-schema';
import { TokensSchema } from '../icure-text-field/schema/token-schema';
import { ItemsListSchema } from '../icure-text-field/schema/items-list-schema';
import { DateSchema, DateTimeSchema, TimeSchema } from '../icure-text-field/schema/date-time-schema';
import { DecimalSchema } from '../icure-text-field/schema/decimal-schema';
import { MeasureSchema } from '../icure-text-field/schema/measure-schema';
export interface Code {
    id: string;
    label: {
        [key: string]: string;
    };
}
export interface FieldMetadata {
    label: string;
    index?: number;
    valueDate?: number;
    owner?: string;
    tags?: Code[];
    discordantMetadata?: () => Partial<FieldMetadata>;
}
export interface FieldValue {
    content: {
        [language: string]: PrimitiveType;
    };
    codes?: Code[];
}
export type PrimitiveType = StringType | NumberType | BooleanType | TimestampType | DateTimeType | MeasureType | CompoundType;
export interface StringType {
    type: 'string';
    value: string;
}
export interface NumberType {
    type: 'number';
    value: number;
}
export interface BooleanType {
    type: 'boolean';
    value: boolean;
}
export interface TimestampType {
    type: 'timestamp';
    value: number;
}
export interface DateTimeType {
    type: 'datetime';
    value: number;
}
export interface MeasureType {
    type: 'measure';
    value?: number;
    unit?: string;
}
export interface CompoundType {
    type: 'compound';
    value: {
        [label: string]: PrimitiveType;
    };
}
export type Position = 'top' | 'left' | 'right' | 'bottom' | 'float' | 'add' | 'remove';
export type Labels = Partial<Record<Position, string>>;
export interface SortOptions {
    sort: 'asc' | 'desc' | 'natural';
    promotions?: string;
}
export declare const pteq: (a: PrimitiveType | undefined, b: PrimitiveType | undefined) => boolean;
export type IcureTextFieldSchema = DocumentSchema | TokensSchema | ItemsListSchema | StyledSchema | InlineSchema | DateSchema | TimeSchema | DateTimeSchema | DecimalSchema | MeasureSchema;
type FieldType = 'text-field' | 'measure-field' | 'number-field' | 'token-field' | 'items-list-field' | 'date-picker' | 'time-picker' | 'date-time-picker' | 'multiple-choice' | 'dropdown-field' | 'radio-button' | 'checkbox' | 'label' | 'action';
export interface Validator {
    validation: string;
    message: string;
}
export declare abstract class Field {
    clazz: "field";
    field: string;
    type: FieldType;
    shortLabel?: string;
    span?: number;
    rowSpan?: number;
    grows: boolean;
    schema?: IcureTextFieldSchema;
    tags?: string[];
    codifications?: string[];
    readonly?: boolean;
    options?: {
        [_key: string]: unknown;
    };
    labels?: Labels;
    value?: string;
    unit?: string;
    multiline?: boolean;
    computedProperties?: {
        [_key: string]: string;
    };
    validators?: Validator[];
    now?: boolean;
    translate?: boolean;
    sortOptions?: SortOptions;
    width?: number;
    styleOptions?: {
        width: number;
        direction: string;
        span: number;
        rows: number;
        alignItems: string;
    };
    hasOther?: boolean;
    event?: string;
    payload?: unknown;
    label(): string;
    protected constructor(type: FieldType, label: string, { shortLabel, grows, span, rowSpan, schema, tags, codifications, readonly, options, labels, value, unit, multiline, computedProperties, validators, now, translate, width, styleOptions, hasOther, event, payload, }: {
        shortLabel?: string;
        grows?: boolean;
        span?: number;
        rowSpan?: number;
        schema?: IcureTextFieldSchema;
        tags?: string[];
        codifications?: string[];
        readonly?: boolean;
        options?: {
            [_key: string]: unknown;
        };
        labels?: Labels;
        value?: string;
        unit?: string;
        multiline?: boolean;
        computedProperties?: {
            [_key: string]: string;
        };
        validators?: Validator[];
        now?: boolean;
        translate?: boolean;
        width?: number;
        styleOptions?: {
            width: number;
            direction: string;
            span: number;
            rows: number;
            alignItems: string;
        };
        hasOther?: boolean;
        event?: string;
        payload?: unknown;
    });
    abstract copy(properties: Partial<Field>): Field;
    static parse(json: Field): Field;
    toJson(): {
        grows: boolean | undefined;
        schema: string | undefined;
        span: number | undefined;
        codifications: string[] | undefined;
        type: 'text-field' | 'measure-field' | 'number-field' | 'token-field' | 'items-list-field' | 'date-picker' | 'time-picker' | 'date-time-picker' | 'multiple-choice' | 'dropdown-field' | 'radio-button' | 'checkbox' | 'label' | 'action';
        translate: boolean | undefined;
        tags: string[] | undefined;
        labels: Labels | undefined;
        unit: string | undefined;
        field: string;
        styleOptions: {
            width: number;
            direction: string;
            span: number;
            rows: number;
            alignItems: string;
        } | undefined;
        sortOptions: SortOptions | undefined;
        multiline: boolean | undefined;
        now: boolean | undefined;
        options: {
            [_key: string]: unknown;
        } | undefined;
        width: number | undefined;
        shortLabel: string | undefined;
        computedProperties: {
            [key: string]: string;
        } | undefined;
        value: string | undefined;
    };
}
export declare class TextField extends Field {
    constructor(label: string, { shortLabel, grows, span, rowSpan, schema, tags, codifications, readonly, options, labels, value, unit, multiline, computedProperties, validators, translate, width, styleOptions, }: {
        shortLabel?: string;
        grows?: boolean;
        span?: number;
        rowSpan?: number;
        schema?: IcureTextFieldSchema;
        tags?: string[];
        codifications?: string[];
        readonly?: boolean;
        options?: {
            [_key: string]: unknown;
        };
        labels?: Labels;
        value?: string;
        unit?: string;
        multiline?: boolean;
        computedProperties?: {
            [_key: string]: string;
        };
        validators?: Validator[];
        translate?: boolean;
        width?: number;
        styleOptions?: {
            width: number;
            direction: string;
            span: number;
            rows: number;
            alignItems: string;
        };
    });
    copy(properties: Partial<TextField>): TextField;
}
export declare class MeasureField extends Field {
    constructor(label: string, { shortLabel, grows, span, rowSpan, tags, codifications, readonly, options, labels, value, unit, computedProperties, validators, translate, width, styleOptions, }: {
        shortLabel?: string;
        grows?: boolean;
        span?: number;
        rowSpan?: number;
        tags?: string[];
        codifications?: string[];
        readonly?: boolean;
        options?: {
            [_key: string]: unknown;
        };
        labels?: Labels;
        value?: string;
        unit?: string;
        computedProperties?: {
            [_key: string]: string;
        };
        validators?: Validator[];
        translate?: boolean;
        width?: number;
        styleOptions?: {
            width: number;
            direction: string;
            span: number;
            rows: number;
            alignItems: string;
        };
    });
    copy(properties: Partial<MeasureField>): MeasureField;
}
export declare class NumberField extends Field {
    constructor(label: string, { shortLabel, grows, span, rowSpan, tags, codifications, readonly, options, labels, value, unit, computedProperties, validators, translate, width, styleOptions, }: {
        shortLabel?: string;
        grows?: boolean;
        span?: number;
        rowSpan?: number;
        tags?: string[];
        codifications?: string[];
        readonly?: boolean;
        options?: {
            [_key: string]: unknown;
        };
        labels?: Labels;
        value?: string;
        unit?: string;
        computedProperties?: {
            [_key: string]: string;
        };
        validators?: Validator[];
        translate?: boolean;
        width?: number;
        styleOptions?: {
            width: number;
            direction: string;
            span: number;
            rows: number;
            alignItems: string;
        };
    });
    copy(properties: Partial<NumberField>): NumberField;
}
export declare class TokenField extends Field {
    constructor(label: string, { shortLabel, grows, span, rowSpan, tags, codifications, readonly, options, labels, value, unit, computedProperties, validators, translate, width, styleOptions, }: {
        shortLabel?: string;
        grows?: boolean;
        span?: number;
        rowSpan?: number;
        tags?: string[];
        codifications?: string[];
        readonly?: boolean;
        options?: {
            [_key: string]: unknown;
        };
        labels?: Labels;
        value?: string;
        unit?: string;
        computedProperties?: {
            [_key: string]: string;
        };
        validators?: Validator[];
        translate?: boolean;
        width?: number;
        styleOptions?: {
            width: number;
            direction: string;
            span: number;
            rows: number;
            alignItems: string;
        };
    });
    copy(properties: Partial<TokenField>): TokenField;
}
export declare class ItemsListField extends Field {
    constructor(label: string, { shortLabel, grows, span, rowSpan, tags, codifications, readonly, options, labels, value, unit, computedProperties, validators, translate, width, styleOptions, }: {
        shortLabel?: string;
        grows?: boolean;
        span?: number;
        rowSpan?: number;
        tags?: string[];
        codifications?: string[];
        readonly?: boolean;
        options?: {
            [_key: string]: unknown;
        };
        labels?: Labels;
        value?: string;
        unit?: string;
        computedProperties?: {
            [_key: string]: string;
        };
        validators?: Validator[];
        translate?: boolean;
        width?: number;
        styleOptions?: {
            width: number;
            direction: string;
            span: number;
            rows: number;
            alignItems: string;
        };
    });
    copy(properties: Partial<ItemsListField>): ItemsListField;
}
export declare class DatePicker extends Field {
    constructor(label: string, { shortLabel, grows, span, rowSpan, tags, codifications, readonly, options, labels, value, unit, computedProperties, validators, now, translate, width, styleOptions, }: {
        shortLabel?: string;
        grows?: boolean;
        span?: number;
        rowSpan?: number;
        tags?: string[];
        codifications?: string[];
        readonly?: boolean;
        options?: {
            [_key: string]: unknown;
        };
        labels?: Labels;
        value?: string;
        unit?: string;
        computedProperties?: {
            [_key: string]: string;
        };
        validators?: Validator[];
        now?: boolean;
        translate?: boolean;
        width?: number;
        styleOptions?: {
            width: number;
            direction: string;
            span: number;
            rows: number;
            alignItems: string;
        };
    });
    copy(properties: Partial<DatePicker>): DatePicker;
}
export declare class TimePicker extends Field {
    constructor(label: string, { shortLabel, grows, span, rowSpan, tags, codifications, readonly, options, labels, value, unit, computedProperties, validators, now, translate, width, styleOptions, }: {
        shortLabel?: string;
        grows?: boolean;
        span?: number;
        rowSpan?: number;
        tags?: string[];
        codifications?: string[];
        readonly?: boolean;
        options?: {
            [_key: string]: unknown;
        };
        labels?: Labels;
        value?: string;
        unit?: string;
        computedProperties?: {
            [_key: string]: string;
        };
        validators?: Validator[];
        now?: boolean;
        translate?: boolean;
        width?: number;
        styleOptions?: {
            width: number;
            direction: string;
            span: number;
            rows: number;
            alignItems: string;
        };
    });
    copy(properties: Partial<TimePicker>): TimePicker;
}
export declare class DateTimePicker extends Field {
    constructor(label: string, { shortLabel, grows, span, rowSpan, tags, codifications, readonly, options, labels, value, unit, computedProperties, validators, now, translate, width, styleOptions, }: {
        shortLabel?: string;
        grows?: boolean;
        span?: number;
        rowSpan?: number;
        tags?: string[];
        codifications?: string[];
        readonly?: boolean;
        options?: {
            [_key: string]: unknown;
        };
        labels?: Labels;
        value?: string;
        unit?: string;
        computedProperties?: {
            [_key: string]: string;
        };
        validators?: Validator[];
        now?: boolean;
        translate?: boolean;
        width?: number;
        styleOptions?: {
            width: number;
            direction: string;
            span: number;
            rows: number;
            alignItems: string;
        };
    });
    copy(properties: Partial<DateTimePicker>): DateTimePicker;
}
export declare class DropdownField extends Field {
    constructor(label: string, options: {
        shortLabel?: string;
        grows?: boolean;
        span?: number;
        rowSpan?: number;
        tags?: string[];
        codifications?: string[];
        readonly?: boolean;
        options?: {
            [_key: string]: unknown;
        };
        labels?: Labels;
        value?: string;
        computedProperties?: {
            [_key: string]: string;
        };
        validators?: Validator[];
        translate?: boolean;
        sortOptions?: SortOptions;
        width?: number;
        styleOptions?: {
            width: number;
            direction: string;
            span: number;
            rows: number;
            alignItems: string;
        };
    });
    copy(properties: Partial<DropdownField>): DropdownField;
}
export declare class RadioButton extends Field {
    constructor(label: string, { shortLabel, grows, span, rowSpan, tags, codifications, readonly, options, value, computedProperties, validators, translate, sortOptions, width, styleOptions, hasOther, }: {
        shortLabel?: string;
        grows?: boolean;
        span?: number;
        rowSpan?: number;
        tags?: string[];
        codifications?: string[];
        readonly?: boolean;
        options?: {
            [_key: string]: unknown;
        };
        value?: string;
        computedProperties?: {
            [_key: string]: string;
        };
        validators?: Validator[];
        translate?: boolean;
        sortOptions?: SortOptions;
        width?: number;
        hasOther?: boolean;
        styleOptions?: {
            width: number;
            direction: string;
            span: number;
            rows: number;
            alignItems: string;
        };
    });
    copy(properties: Partial<RadioButton>): RadioButton;
}
export declare class CheckBox extends Field {
    constructor(label: string, { shortLabel, grows, span, rowSpan, tags, codifications, readonly, options, value, computedProperties, validators, translate, sortOptions, width, styleOptions, }: {
        shortLabel?: string;
        grows?: boolean;
        span?: number;
        rowSpan?: number;
        tags?: string[];
        codifications?: string[];
        readonly?: boolean;
        options?: {
            [_key: string]: unknown;
        };
        value?: string;
        computedProperties?: {
            [_key: string]: string;
        };
        validators?: Validator[];
        translate?: boolean;
        sortOptions?: SortOptions;
        width?: number;
        styleOptions?: {
            width: number;
            direction: string;
            span: number;
            rows: number;
            alignItems: string;
        };
    });
    copy(properties: Partial<CheckBox>): CheckBox;
}
export declare class Label extends Field {
    constructor(label: string, { shortLabel, grows, span }: {
        shortLabel?: string;
        grows?: boolean;
        span?: number;
        rowSpan?: number;
    });
    copy(properties: Partial<Label>): Label;
}
export declare class Button extends Field {
    constructor(label: string, { shortLabel, grows, span, event, payload }: {
        shortLabel?: string;
        grows?: boolean;
        span?: number;
        rowSpan?: number;
        event?: string;
        payload?: unknown;
    });
    copy(properties: Partial<Button>): Button;
}
export declare class Group {
    clazz: "group";
    group: string;
    borderless: boolean;
    translate: boolean;
    fields?: Array<Field | Group | Subform>;
    span?: number;
    rowSpan?: number;
    computedProperties?: {
        [_key: string]: string;
    };
    width?: number;
    styleOptions?: {
        [_key: string]: unknown;
    };
    constructor(title: string, fields: Array<Field | Group | Subform>, { span, rowSpan, borderless, translate, computedProperties, width, styleOptions, }: {
        borderless?: boolean;
        translate?: boolean;
        span?: number;
        rowSpan?: number;
        computedProperties?: {
            [_key: string]: string;
        };
        width?: number;
        styleOptions?: {
            [_key: string]: unknown;
        };
    });
    copy(properties: Partial<Group>): Group;
    static parse({ borderless, span, computedProperties, fields, group, translate, width, }: {
        group: string;
        fields?: Array<Field | Group | Subform>;
        borderless?: boolean;
        translate?: boolean;
        span?: number;
        rowSpan?: number;
        computedProperties?: {
            [_key: string]: string;
        };
        width?: number;
    }): Group;
    toJson(): any;
}
export declare class Subform {
    clazz: "subform";
    id: string;
    shortLabel?: string;
    refs?: string[];
    forms: {
        [key: string]: Form;
    };
    span?: number;
    rowSpan?: number;
    computedProperties?: {
        [_key: string]: string;
    };
    width?: number;
    styleOptions?: {
        [_key: string]: unknown;
    };
    labels: Labels;
    constructor(title: string, forms: {
        [key: string]: Form;
    }, { id, shortLabel, span, rowSpan, computedProperties, width, styleOptions, refs, labels, }: {
        id?: string;
        shortLabel?: string;
        span?: number;
        rowSpan?: number;
        computedProperties?: {
            [_key: string]: string;
        };
        width?: number;
        styleOptions?: {
            [_key: string]: unknown;
        };
        refs?: string[];
        labels?: Labels;
    });
    copy(properties: Partial<Subform>): Subform;
    static parse(json: {
        subform: string;
        shortLabel?: string;
        forms?: {
            [key: string]: Form;
        };
        refs?: string[];
        span?: number;
        rowSpan?: number;
        computedProperties?: {
            [_key: string]: string;
        };
        width?: number;
        styleOptions?: {
            [_key: string]: unknown;
        };
        labels?: Labels;
        id: string;
    }): Subform;
    toJson(): any;
}
export declare class Section {
    section: string;
    fields: Array<Field | Group | Subform>;
    description?: string;
    keywords?: string[];
    constructor(title: string, fields: Array<Field | Group | Subform>, description?: string, keywords?: string[]);
    static parse(json: {
        section: string;
        fields?: Array<Field | Group | Subform>;
        groups?: Array<Field | Group | Subform>;
        sections?: Array<Field | Group | Subform>;
        description?: string;
        keywords?: string[];
    }): Section;
    toJson(): {
        section: string;
        keywords?: string[];
        description?: string;
        fields: (Field | Group | Subform)[];
    };
}
export declare class Codification {
    type: string;
    codes: Code[];
    constructor(type: string, codes: Code[]);
    static parse(json: {
        type: string;
        codes: Code[];
    }): Codification;
    toJson(): {
        type: string;
        codes: Code[];
    };
}
export declare class TranslationTable {
    language: string;
    translations: {
        [key: string]: string;
    };
    constructor(language: string, translations: {
        [key: string]: string;
    });
    static parse(json: {
        language: string;
        translations: {
            [key: string]: string;
        };
    }): TranslationTable;
    toJson(): {
        language: string;
        translations: {
            [key: string]: string;
        };
    };
}
export declare class Form {
    form: string;
    sections: Section[];
    id?: string;
    description?: string;
    keywords?: string[];
    codifications?: Codification[];
    translations?: TranslationTable[];
    constructor(title: string, sections: Section[], id?: string, description?: string, keywords?: string[], codifications?: Codification[], translations?: TranslationTable[]);
    static parse(json: {
        form: string;
        sections: Section[];
        id?: string;
        description?: string;
        keywords?: string[];
        codifications?: Codification[];
        translations?: TranslationTable[];
        subForms?: {
            [key: string]: Form;
        };
    }, library?: Form[], subforms?: {
        [key: string]: Form;
    }): Form;
    toJson(): {
        form: string;
        keywords?: string[];
        description?: string;
        sections: {
            section: string;
            keywords?: string[];
            description?: string;
            fields: any[];
        }[];
    };
}
export {};
