import { LitElement } from 'lit';
import { FieldMetadata, FieldValue, Labels } from '../model';
import { Suggestion, VersionedData } from '../../generic';
/**
 * Base class for all fields.
 */
export declare class Field extends LitElement {
    /**
     * The label of the field. This is a unique per form property that is used to create data in the formValuesContainer.
     */
    label: string;
    /**
     * The labels of the field. These are the labels that will be displayed in the UI.
     * Several labels can be displayed at once
     */
    displayedLabels: Labels;
    /**
     * Extra styles applied to the field.
     */
    styleOptions: {
        [key: string]: unknown;
    };
    /**
     * Translate labels and options
     */
    translate: boolean;
    /**
     * Iso code of the default language
     */
    defaultLanguage: string;
    /**
     * Iso code and names of the supported languages
     */
    languages: {
        [iso: string]: string;
    };
    translationProvider: (language: string, text: string) => string;
    /**
     * Provides the value of the field.
     */
    valueProvider?: () => VersionedData<FieldValue>;
    validationErrorsProvider?: () => string[];
    ownersProvider: (terms: string[], ids?: string[], specialties?: string[]) => Promise<Suggestion[]>;
    metadataProvider?: (id: string, revisions: (string | null)[]) => VersionedData<FieldMetadata>;
    handleValueChanged?: (label: string, language: string, value?: FieldValue, id?: string) => string | undefined;
    handleMetadataChanged?: (metadata: FieldMetadata, id?: string) => string | undefined;
    visible: boolean;
    readonly: boolean;
    displayMetadata: boolean;
    selectedLanguage?: string;
    selectedRevision?: string;
    language(): string;
}
