import { LitElement } from 'lit';
import { Field } from '../common';
import { IcureTextFieldSchema } from '../model';
import { Suggestion } from '../../generic';
export declare class IcureTextField extends Field {
    placeholder: string;
    multiline: boolean | string;
    lines: number;
    suggestionStopWords: Set<string>;
    displayOwnerMenu: boolean;
    suggestions: boolean;
    links: boolean;
    linksProvider: (sug: Suggestion) => Promise<{
        href: string;
        title: string;
    } | undefined>;
    suggestionProvider: (terms: string[]) => Promise<Suggestion[]>;
    codeColorProvider: (type: string, code: string) => string;
    linkColorProvider: (type: string, code: string) => string;
    codeContentProvider: (codes: {
        type: string;
        code: string;
    }[]) => string;
    schema: IcureTextFieldSchema;
    private proseMirrorSchema?;
    private parser?;
    private serializer;
    private primitiveTypeExtractor;
    private primitiveTypesExtractor;
    private codesExtractor;
    private view?;
    private container?;
    private readonly windowListeners;
    private suggestionPalette?;
    private mouseCount;
    private trToSave?;
    constructor();
    _handleClickOutside(event: MouseEvent): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    static get styles(): import("lit").CSSResult[];
    private isMultivalued;
    private updateValue;
    render(): import("lit-html").TemplateResult<1>;
    mouseDown(): void;
    mouseUp(): void;
    firstUpdated(): void;
    private makeParser;
    private makeSerializer;
    private makeCodesExtractor;
    private makePrimitiveExtractor;
    private makePrimitivesExtractor;
}
export declare class MetadataButtonBarWrapper extends LitElement {
    id: string;
    rerender: string;
    private selectedRevision?;
    render(): import("lit-html").TemplateResult<1> | undefined;
}
