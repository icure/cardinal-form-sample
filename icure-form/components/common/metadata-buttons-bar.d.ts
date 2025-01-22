import { LitElement } from 'lit';
import { FieldMetadata, FieldValue } from '../model';
import { Suggestion, Version } from '../../generic';
import { CustomEventDetail } from 'app-datepicker/dist/typings';
export declare class MetadataButtonBar extends LitElement {
    valueId: string;
    metadata: FieldMetadata;
    revision: string;
    versions: Version<FieldValue>[];
    defaultLanguage: string;
    selectedLanguage?: string;
    languages: {
        [iso: string]: string;
    };
    existingLanguages?: string[];
    displayedLabels: {
        [iso: string]: string;
    };
    handleMetadataChanged?: (metadata: FieldMetadata, id?: string) => string | undefined;
    handleLanguageSelected?: (iso?: string) => void;
    handleRevisionSelected?: (rev?: string | null) => void;
    ownersProvider: (terms: string[], ids?: string[], specialties?: string[]) => Promise<Suggestion[]>;
    protected displayOwnersMenu: boolean;
    protected ownerInputValue: string;
    protected availableOwners: Suggestion[];
    protected loadedOwners: {
        [id: string]: Suggestion;
    };
    protected displayLanguagesMenu: boolean;
    protected displayVersionsMenu: boolean;
    protected displayValueDateMenu: boolean;
    protected languageInputValue: string;
    static get styles(): import("lit").CSSResult[];
    _handleClickOutside(event: MouseEvent): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    toggleOwnersMenu(ownerId?: string): void;
    searchOwner(e: InputEvent): void;
    searchLanguage(e: InputEvent): void;
    handleOwnerButtonClicked(id: string): void;
    handleLanguageButtonClicked(id: string): void;
    handleRevisionButtonClicked(rev?: string | null): void;
    toggleValueDateMenu(): void;
    dateUpdated(date: CustomEventDetail['date-updated']): void;
    toggleLanguagesMenu(): void;
    toggleVersionsMenu(): void;
}
