import { DecryptedContact, DecryptedForm as CardinalForm, DecryptedService } from '@icure/cardinal-sdk';
import { FormValuesContainer, Version, VersionedData } from '../generic';
import { ServiceMetadata } from './model';
import { FieldMetadata, FieldValue, Validator } from '../components/model';
/** This class is a bridge between the ICure API and the generic FormValuesContainer interface.
 * It wraps around a ContactFormValuesContainer and provides a series of services:
 * - It computes dependent values when the form is created
 * - It broadcasts changes from the wrapped ContactFormValuesContainer to its listeners
 * - It provides a way to compute formulas in a sandboxed environment
 * - It bridges the setValues and setMetadata methods with the wrapped ContactFormValuesContainer by
 * 		- converting the FieldValue to a Service
 * 		- converting the FieldMetadata to a ServiceMetadata
 * - It bridges the getValues and getMetadata methods with the wrapped ContactFormValuesContainer by
 * 		- converting the Service to a FieldValue
 * 		- converting the ServiceMetadata to a FieldMetadata
 * - It lazily creates bridges the children by
 *    - lazily creating BridgedFormValuesContainer when the children of the wrapped ContactFormValuesContainer are accessed
 *    - creating a new ContactFormValuesContainer and wrapping it in a BridgedFormValuesContainer when a child is added
 *
 * The icure-form typically accepts a BridgedFormValuesContainer as a prop and uses it to interact with the form.
 *
 * This class is fairly generic and can be used as an inspiration or subclassed for other bridges
 */
export declare class BridgedFormValuesContainer implements FormValuesContainer<FieldValue, FieldMetadata> {
    private responsible;
    private interpreter?;
    private initialValuesProvider;
    private dependentValuesProvider;
    private validatorsProvider;
    private language;
    private changeListeners;
    private contact;
    private contactFormValuesContainer;
    private _id;
    private mutateAndNotify;
    toString(): string;
    /**
     * Creates an instance of BridgedFormValuesContainer.
     * @param responsible The id of the data owner responsible for the creation of the values
     * @param contact The displayed contact (may be in the past). === to currentContact if the contact is the contact of the day
     * @param contactFormValuesContainer The wrapped ContactFormValuesContainer
     * @param interpreter A function that can interpret formulas
     * @param dependentValuesProvider A function that provides the dependent values (computed on the basis of other values) for a given anchorId and templateId
     * @param validatorsProvider A function that provides the validators for a given anchorId and templateId
     * @param language The language in which the values are displayed
     * @param changeListeners The listeners that will be notified when the values change
     * @param initialValuesProvider A lambda that provides the initial values of the form
     */
    constructor(responsible: string, contactFormValuesContainer: ContactFormValuesContainer, interpreter?: (<T, S extends {
        [key: string]: unknown;
        [key: symbol]: unknown;
    }>(formula: string, sandbox: S) => T | undefined) | undefined, contact?: DecryptedContact, initialValuesProvider?: (anchorId?: string, templateId?: string) => {
        metadata: FieldMetadata;
        revisionsFilter: (id: string, history: Version<FieldMetadata>[]) => (string | null)[];
        formula: string;
    }[], dependentValuesProvider?: (anchorId: string | undefined, templateId: string | undefined) => {
        metadata: FieldMetadata;
        revisionsFilter: (id: string, history: Version<FieldMetadata>[]) => (string | null)[];
        formula: string;
    }[], validatorsProvider?: (anchorId: string | undefined, templateId: string) => {
        metadata: FieldMetadata;
        validators: Validator[];
    }[], language?: string, changeListeners?: ((newValue: BridgedFormValuesContainer) => void)[]);
    getLabel(): string;
    getFormId(): string | undefined;
    getContactFormValuesContainer(): ContactFormValuesContainer;
    registerChangeListener(listener: (newValue: BridgedFormValuesContainer) => void): void;
    unregisterChangeListener(listener: (newValue: BridgedFormValuesContainer) => void): void;
    getValues(revisionsFilter: (id: string, history: Version<FieldMetadata>[]) => (string | null)[]): VersionedData<FieldValue>;
    getMetadata(id: string, revisions: (string | null)[]): VersionedData<FieldMetadata>;
    private computeInitialValues;
    private computeDependentValues;
    setValue(label: string, language: string, fv?: FieldValue, id?: string, metadata?: FieldMetadata): void;
    setMetadata(meta: FieldMetadata, id?: string | undefined): void;
    delete(serviceId: string): void;
    private getVersionedValuesForKey;
    compute<T, S extends {
        [key: string | symbol]: unknown;
    }>(formula: string, sandbox?: S): T | undefined;
    getChildren(): FormValuesContainer<FieldValue, FieldMetadata>[];
    getValidationErrors(): [FieldMetadata, string][];
    addChild(anchorId: string, templateId: string, label: string): Promise<void>;
    removeChild(container: BridgedFormValuesContainer): Promise<void>;
    synchronise(): this;
}
/**
 * This class is a form values container that uses a hierarchy of forms as a data source. The actual values are extracted from the services of the contacts.
 * The `currentContact` is the contact that has been selected by the user, any later contact should be ignored.
 * The `contactsHistory` is used to provide the full history of the services.
 * The hierarchy of ContactFormValuesContainer has to be maintained by the manager of the instances of this class (typically the BridgedFormValuesContainer).
 * Each ContactFormValuesContainer has a reference to its `rootForm`.
 * The `serviceFactory` and `formFactory` are used to create new services and add sub-forms.
 */
export declare class ContactFormValuesContainer implements FormValuesContainer<DecryptedService, ServiceMetadata> {
    rootForm: CardinalForm;
    currentContact: DecryptedContact;
    contactsHistory: DecryptedContact[];
    children: ContactFormValuesContainer[];
    serviceFactory: (label: string, serviceId?: string) => DecryptedService;
    formFactory: (parentId: string, anchorId: string, formTemplateId: string, label: string) => Promise<CardinalForm>;
    formRecycler: (formId: string) => Promise<void>;
    changeListeners: ((newValue: ContactFormValuesContainer) => void)[];
    private _id;
    private _initialised;
    toString(): string;
    mustBeInitialised(): boolean;
    /**
     * Returns a contact that combines the content of the contact in this form with the content of all contents stored in the children
     */
    coordinatedContact(): DecryptedContact;
    /**
     * Returns a contact that combines the content of the contact in this form with the content of all contents stored in the children
     */
    allForms(): CardinalForm[];
    constructor(rootForm: CardinalForm, currentContact: DecryptedContact, contactsHistory: DecryptedContact[], serviceFactory: (label: string, serviceId?: string) => DecryptedService, children: ContactFormValuesContainer[], formFactory: (parentId: string, anchorId: string, formTemplateId: string, label: string) => Promise<CardinalForm>, formRecycler: (formId: string) => Promise<void>, changeListeners?: ((newValue: ContactFormValuesContainer) => void)[], initialised?: boolean);
    synchronise(): this;
    registerChildFormValuesContainer(childFormValueContainer: ContactFormValuesContainer): void;
    static fromFormsHierarchy(rootForm: CardinalForm, currentContact: DecryptedContact, contactsHistory: DecryptedContact[], serviceFactory: (label: string, serviceId?: string) => DecryptedService, formChildrenProvider: (parentId: string | undefined) => Promise<CardinalForm[]>, formFactory: (parentId: string, anchorId: string, formTemplateId: string, label: string) => Promise<CardinalForm>, formRecycler: (formId: string) => Promise<void>, changeListeners?: ((newValue: ContactFormValuesContainer) => void)[]): Promise<ContactFormValuesContainer>;
    getLabel(): string;
    getFormId(): string | undefined;
    registerChangeListener(listener: (newValue: ContactFormValuesContainer) => void): void;
    unregisterChangeListener(listener: (newValue: ContactFormValuesContainer) => void): void;
    getChildren(): ContactFormValuesContainer[];
    getValidationErrors(): [FieldMetadata, string][];
    getValues(revisionsFilter: (id: string, history: Version<ServiceMetadata>[]) => (string | null)[]): VersionedData<DecryptedService>;
    getMetadata(id: string, revisions: (string | null)[]): VersionedData<ServiceMetadata>;
    setMetadata(meta: ServiceMetadata, id?: string): void;
    setValue(label: string, language: string, value?: DecryptedService, id?: string, metadata?: ServiceMetadata, changeListenersOverrider?: (fvc: ContactFormValuesContainer) => void): void;
    delete(serviceId: string): void;
    compute<T>(): T | undefined;
    /** returns all services in history that match a selector
     *
     * @private
     * @param revisionsFilter
     */
    private getServicesInHistory;
    addChild(anchorId: string, templateId: string, label: string): Promise<void>;
    private getServiceInCurrentContact;
    removeChild(container: ContactFormValuesContainer): Promise<void>;
}
