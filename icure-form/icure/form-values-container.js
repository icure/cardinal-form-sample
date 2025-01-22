"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactFormValuesContainer = exports.BridgedFormValuesContainer = void 0;
const cardinal_sdk_1 = require("@icure/cardinal-sdk");
const no_lodash_1 = require("../utils/no-lodash");
const icure_utils_1 = require("./icure-utils");
const primitive_1 = require("../utils/primitive");
const dates_1 = require("../utils/dates");
const uuid_1 = require("uuid");
const code_utils_1 = require("../utils/code-utils");
function notify(l, fvc) {
    //console.log('Notifying', l, fvc.toString())
    l(fvc);
}
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
class BridgedFormValuesContainer {
    toString() {
        return `Bridged(${this.contactFormValuesContainer.rootForm.formTemplateId}[${this.contactFormValuesContainer.rootForm.id}]) - ${this._id}`;
    }
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
    constructor(responsible, contactFormValuesContainer, interpreter, contact, initialValuesProvider = () => [], dependentValuesProvider = () => [], validatorsProvider = () => [], language = 'en', changeListeners = []) {
        this.responsible = responsible;
        this.interpreter = interpreter;
        this.initialValuesProvider = initialValuesProvider;
        this.dependentValuesProvider = dependentValuesProvider;
        this.validatorsProvider = validatorsProvider;
        this.language = language;
        this.changeListeners = changeListeners;
        this._id = (0, uuid_1.v4)();
        console.log(`Creating bridge FVC (${contactFormValuesContainer.rootForm.formTemplateId}) with ${contactFormValuesContainer.children.length} children [${this._id}]`);
        //Before start to broadcast changes, we need to fill in the contactFormValuesContainer with the dependent values
        this.contactFormValuesContainer = contactFormValuesContainer;
        this.mutateAndNotify = (newContactFormValuesContainer) => {
            newContactFormValuesContainer.unregisterChangeListener(this.mutateAndNotify);
            const newBridgedFormValueContainer = new BridgedFormValuesContainer(this.responsible, newContactFormValuesContainer, this.interpreter, this.contact === this.contactFormValuesContainer.currentContact ? newContactFormValuesContainer.currentContact : this.contact, this.initialValuesProvider, this.dependentValuesProvider, this.validatorsProvider, this.language, this.changeListeners);
            this.changeListeners.forEach((l) => notify(l, newBridgedFormValueContainer));
            return newBridgedFormValueContainer;
        };
        this.contactFormValuesContainer.registerChangeListener(this.mutateAndNotify);
        this.contact = contact !== null && contact !== void 0 ? contact : contactFormValuesContainer.currentContact;
        if (this.contactFormValuesContainer.mustBeInitialised()) {
            this.computeInitialValues();
        }
        this.computeDependentValues();
    }
    getLabel() {
        return this.contactFormValuesContainer.getLabel();
    }
    getFormId() {
        return this.contactFormValuesContainer.getFormId();
    }
    getContactFormValuesContainer() {
        return this.contactFormValuesContainer;
    }
    registerChangeListener(listener) {
        this.changeListeners.push(listener);
    }
    unregisterChangeListener(listener) {
        this.changeListeners = this.changeListeners.filter((l) => l !== listener);
    }
    getValues(revisionsFilter) {
        return Object.entries(this.contactFormValuesContainer.getValues((id, history) => revisionsFilter(id, history
            .filter(({ modified }) => !this.contact.created || !modified || modified <= this.contact.created)
            .map(({ revision, modified, value: sm }) => {
            var _a;
            return ({
                revision,
                modified,
                value: {
                    label: sm.label,
                    owner: sm.responsible,
                    tags: (_a = sm.tags) === null || _a === void 0 ? void 0 : _a.map(icure_utils_1.codeStubToCode),
                    valueDate: sm.valueDate,
                },
            });
        })))).reduce((acc, [id, history]) => {
            return Object.assign(Object.assign({}, acc), { [id]: history.map(({ revision, modified, value: s }) => {
                    var _a, _b;
                    return ({
                        revision,
                        modified,
                        value: {
                            content: Object.entries((_a = s.content) !== null && _a !== void 0 ? _a : {}).reduce((acc, [lng, cnt]) => {
                                const converted = (0, icure_utils_1.contentToPrimitiveType)(lng, cnt);
                                return converted ? Object.assign(Object.assign({}, acc), { [lng]: converted }) : acc;
                            }, {}),
                            codes: (_b = s.codes) === null || _b === void 0 ? void 0 : _b.map(icure_utils_1.codeStubToCode),
                        },
                    });
                }) });
        }, {});
    }
    getMetadata(id, revisions) {
        return Object.entries(this.contactFormValuesContainer.getMetadata(id, revisions)).reduce((acc, [id, history]) => (Object.assign(Object.assign({}, acc), { [id]: history.map(({ revision, modified, value: s }) => ({
                revision,
                modified,
                value: {
                    label: s.label,
                    owner: s.responsible,
                    valueDate: s.valueDate,
                    tags: s.tags,
                    discordantMetadata: () => {
                        var _a, _b;
                        return (Object.assign(Object.assign({}, (s.responsible !== this.responsible ? { owner: this.responsible } : {})), (Math.abs(+((_a = (0, dates_1.anyDateToDate)(s.valueDate)) !== null && _a !== void 0 ? _a : 0) - +((_b = (0, dates_1.anyDateToDate)(this.contact.created)) !== null && _b !== void 0 ? _b : 0)) > 24 * 3600000 ? { valueDate: s.valueDate } : {})));
                    },
                },
            })) })), {});
    }
    //This method mutates the BridgedFormValuesContainer but can only be called from the constructor
    computeInitialValues() {
        if (this.contactFormValuesContainer.rootForm.formTemplateId) {
            this.initialValuesProvider(this.contactFormValuesContainer.rootForm.descr, this.contactFormValuesContainer.rootForm.formTemplateId).forEach(({ metadata, revisionsFilter, formula }) => {
                var _a;
                try {
                    const currentValue = this.getValues(revisionsFilter);
                    if (!currentValue || !Object.keys(currentValue).length) {
                        const newValue = this.compute(formula);
                        if (newValue !== undefined) {
                            const lng = (_a = this.language) !== null && _a !== void 0 ? _a : 'en';
                            if (newValue && !newValue.content[lng] && newValue.content['*']) {
                                newValue.content[lng] = newValue.content['*'];
                            }
                            if (newValue) {
                                delete newValue.content['*'];
                            }
                            setValueOnContactFormValuesContainer(this.contactFormValuesContainer, metadata.label, lng, newValue, undefined, metadata, (fvc) => {
                                const currentContact = this.contactFormValuesContainer.currentContact;
                                this.contactFormValuesContainer = fvc;
                                if (this.contact === currentContact) {
                                    this.contact = fvc.currentContact;
                                }
                            });
                        }
                    }
                }
                catch (e) {
                    console.log(`Error while computing formula : ${formula}`, e);
                }
            });
        }
    }
    //This method mutates the BridgedFormValuesContainer but can only be called from the constructor
    computeDependentValues() {
        if (this.contactFormValuesContainer.rootForm.formTemplateId) {
            this.dependentValuesProvider(this.contactFormValuesContainer.rootForm.descr, this.contactFormValuesContainer.rootForm.formTemplateId).forEach(({ metadata, revisionsFilter, formula }) => {
                var _a;
                try {
                    const currentValue = this.getValues(revisionsFilter);
                    const newValue = this.compute(formula);
                    if (newValue !== undefined || currentValue != undefined) {
                        const lng = (_a = this.language) !== null && _a !== void 0 ? _a : 'en';
                        if (newValue && !newValue.content[lng] && newValue.content['*']) {
                            newValue.content[lng] = newValue.content['*'];
                        }
                        if (newValue) {
                            delete newValue.content['*'];
                        }
                        const interceptor = (fvc) => {
                            const currentContact = this.contactFormValuesContainer.currentContact;
                            this.contactFormValuesContainer = fvc;
                            if (this.contact === currentContact) {
                                this.contact = fvc.currentContact;
                            }
                        };
                        setValueOnContactFormValuesContainer(this.contactFormValuesContainer, metadata.label, lng, newValue, Object.keys(currentValue !== null && currentValue !== void 0 ? currentValue : {})[0], metadata, interceptor);
                    }
                }
                catch (e) {
                    console.log(`Error while computing formula : ${formula}`, e);
                }
            });
        }
    }
    setValue(label, language, fv, id, metadata) {
        setValueOnContactFormValuesContainer(this.contactFormValuesContainer, label, language, fv, id, metadata);
    }
    setMetadata(meta, id) {
        var _a;
        this.contactFormValuesContainer.setMetadata({
            label: meta.label,
            responsible: meta.owner,
            valueDate: meta.valueDate,
            tags: (_a = meta.tags) === null || _a === void 0 ? void 0 : _a.map((x) => new cardinal_sdk_1.CodeStub(x)),
        }, id);
    }
    delete(serviceId) {
        this.contactFormValuesContainer.delete(serviceId);
    }
    getVersionedValuesForKey(key) {
        return this.getValues((id, history) => { var _a, _b, _c; return (((_b = (_a = history === null || history === void 0 ? void 0 : history[0]) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.label) && key === history[0].value.label ? [(_c = history === null || history === void 0 ? void 0 : history[0]) === null || _c === void 0 ? void 0 : _c.revision] : []); });
    }
    compute(formula, sandbox) {
        var _a;
        // noinspection JSUnusedGlobalSymbols
        const parseContent = (content) => {
            var _a, _b;
            if (!content) {
                return undefined;
            }
            const primitive = (_b = (_a = content[this.language]) !== null && _a !== void 0 ? _a : content['*']) !== null && _b !== void 0 ? _b : content[Object.keys(content)[0]];
            return primitive && (0, primitive_1.parsePrimitive)(primitive);
        };
        const log = console.log;
        const native = {
            parseInt: parseInt,
            parseFloat: parseFloat,
            Date: Date,
            Math: Math,
            Number: Number,
            String: String,
            Boolean: Boolean,
            Array: Array,
            Object: Object,
            parseContent,
            validate: {
                notBlank: (self, label) => {
                    var _a, _b, _c;
                    const value = parseContent((_b = (_a = self[label]) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.content);
                    return !!((_c = value === null || value === void 0 ? void 0 : value.trim()) === null || _c === void 0 ? void 0 : _c.length);
                },
            },
            log,
        };
        const proxy = new Proxy({}, {
            has: (target, key) => { var _a; return !!native[key] || key === 'self' || Object.keys((_a = this.getVersionedValuesForKey(key)) !== null && _a !== void 0 ? _a : {}).length > 0; },
            get: (target, key) => {
                if (key === 'undefined') {
                    return undefined;
                }
                const nativeValue = native[key];
                if (!!nativeValue) {
                    return nativeValue;
                }
                return key === 'self' ? proxy : Object.values(this.getVersionedValuesForKey(key)).map((v) => { var _a; return (_a = v[0]) === null || _a === void 0 ? void 0 : _a.value; });
            },
        });
        return (_a = this.interpreter) === null || _a === void 0 ? void 0 : _a.call(this, formula, sandbox !== null && sandbox !== void 0 ? sandbox : proxy);
    }
    getChildren() {
        const children = this.contactFormValuesContainer
            .getChildren()
            .map((fvc) => new BridgedFormValuesContainer(this.responsible, fvc, this.interpreter, this.contact, this.initialValuesProvider, this.dependentValuesProvider, this.validatorsProvider, this.language, []));
        console.log(`${children.length} children found in ${this.contactFormValuesContainer.rootForm.formTemplateId} initialised with `, this.initialValuesProvider);
        return children;
    }
    getValidationErrors() {
        if (this.contactFormValuesContainer.rootForm.formTemplateId) {
            return this.validatorsProvider(this.contactFormValuesContainer.rootForm.descr, this.contactFormValuesContainer.rootForm.formTemplateId).flatMap(({ metadata, validators }) => validators
                .map(({ validation, message }) => {
                try {
                    return this.compute(validation) ? undefined : [metadata, message];
                }
                catch (e) {
                    console.log(`Error while computing validation : ${validation}`, e);
                    return undefined;
                }
            })
                .filter((x) => !!x));
        }
        else {
            return [];
        }
    }
    addChild(anchorId, templateId, label) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.contactFormValuesContainer.addChild(anchorId, templateId, label);
        });
    }
    removeChild(container) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.contactFormValuesContainer.removeChild(container.contactFormValuesContainer);
        });
    }
    synchronise() {
        this.contactFormValuesContainer.synchronise();
        return this;
    }
}
exports.BridgedFormValuesContainer = BridgedFormValuesContainer;
/**
 * This class is a form values container that uses a hierarchy of forms as a data source. The actual values are extracted from the services of the contacts.
 * The `currentContact` is the contact that has been selected by the user, any later contact should be ignored.
 * The `contactsHistory` is used to provide the full history of the services.
 * The hierarchy of ContactFormValuesContainer has to be maintained by the manager of the instances of this class (typically the BridgedFormValuesContainer).
 * Each ContactFormValuesContainer has a reference to its `rootForm`.
 * The `serviceFactory` and `formFactory` are used to create new services and add sub-forms.
 */
class ContactFormValuesContainer {
    toString() {
        return `Contact(${this.rootForm.formTemplateId}[${this.rootForm.id}]) - ${this._id}`;
    }
    mustBeInitialised() {
        return !this._initialised;
    }
    /**
     * Returns a contact that combines the content of the contact in this form with the content of all contents stored in the children
     */
    coordinatedContact() {
        var _a, _b, _c;
        const childrenContacts = this.children.map((c) => c.coordinatedContact());
        const thisKeptServiceIds = ((_a = this.currentContact.subContacts) !== null && _a !== void 0 ? _a : []).filter((sc) => sc.formId === this.rootForm.id).flatMap((sc) => { var _a; return ((_a = sc.services) !== null && _a !== void 0 ? _a : []).map((s) => s.serviceId); });
        return new cardinal_sdk_1.DecryptedContact(Object.assign(Object.assign({}, this.currentContact), { services: childrenContacts
                .reduce((acc, c) => { var _a; return acc.concat((_a = c.services) !== null && _a !== void 0 ? _a : []); }, [])
                .concat(((_b = this.currentContact.services) !== null && _b !== void 0 ? _b : []).filter((s) => thisKeptServiceIds.includes(s.id))), subContacts: childrenContacts
                .reduce((acc, c) => { var _a; return acc.concat((_a = c.subContacts) !== null && _a !== void 0 ? _a : []); }, [])
                .concat(((_c = this.currentContact.subContacts) !== null && _c !== void 0 ? _c : []).filter((s) => s.formId === this.rootForm.id)) }));
    }
    /**
     * Returns a contact that combines the content of the contact in this form with the content of all contents stored in the children
     */
    allForms() {
        return [this.rootForm].concat(this.children.flatMap((c) => c.allForms()));
    }
    constructor(rootForm, currentContact, contactsHistory, serviceFactory, children, formFactory, formRecycler, changeListeners = [], initialised = true) {
        this._id = (0, uuid_1.v4)();
        this._initialised = false;
        console.log(`Creating contact FVC (${rootForm.formTemplateId}) with ${children.length} children [${this._id}]`);
        if (contactsHistory.includes(currentContact)) {
            throw new Error('Illegal argument, the history must not contain the currentContact');
        }
        this.rootForm = rootForm;
        this.currentContact = currentContact;
        this.contactsHistory = (0, no_lodash_1.sortedBy)(contactsHistory, 'created', 'desc');
        this.children = children;
        this.serviceFactory = serviceFactory;
        this.formFactory = formFactory;
        this.formRecycler = formRecycler;
        this.changeListeners = changeListeners;
        this._initialised = initialised;
        this.synchronise();
    }
    synchronise() {
        this.children.forEach((childFVC) => {
            this.registerChildFormValuesContainer(childFVC.synchronise());
        });
        return this;
    }
    //Make sure that when a child is changed, a new version of this is created with the updated child
    registerChildFormValuesContainer(childFormValueContainer) {
        childFormValueContainer.changeListeners = [
            (newValue) => {
                console.log(`Child ${newValue._id} ${childFormValueContainer.rootForm.formTemplateId} changed, updating parent ${this._id} ${this.rootForm.formTemplateId}`);
                const newContactFormValuesContainer = new ContactFormValuesContainer(this.rootForm, this.currentContact, this.contactsHistory, this.serviceFactory, this.children.map((c) => {
                    return c.rootForm.id === childFormValueContainer.rootForm.id ? newValue : c;
                }), this.formFactory, this.formRecycler);
                this.changeListeners.forEach((l) => notify(l, newContactFormValuesContainer));
            },
        ];
    }
    static fromFormsHierarchy(rootForm_1, currentContact_1, contactsHistory_1, serviceFactory_1, formChildrenProvider_1, formFactory_1, formRecycler_1) {
        return __awaiter(this, arguments, void 0, function* (rootForm, currentContact, contactsHistory, serviceFactory, formChildrenProvider, formFactory, formRecycler, changeListeners = []) {
            const contactFormValuesContainer = new ContactFormValuesContainer(rootForm, currentContact, contactsHistory, serviceFactory, rootForm.id
                ? yield Promise.all((yield formChildrenProvider(rootForm.id)).map((f) => __awaiter(this, void 0, void 0, function* () { 
                // eslint-disable-next-line max-len
                return yield ContactFormValuesContainer.fromFormsHierarchy(f, currentContact, contactsHistory, serviceFactory, formChildrenProvider, formFactory, formRecycler); })))
                : [], formFactory, formRecycler, changeListeners, false);
            contactFormValuesContainer.children.forEach((childFVC) => contactFormValuesContainer.registerChildFormValuesContainer(childFVC));
            return contactFormValuesContainer;
        });
    }
    getLabel() {
        var _a;
        return (_a = this.rootForm.descr) !== null && _a !== void 0 ? _a : '';
    }
    getFormId() {
        var _a;
        return (_a = this.rootForm) === null || _a === void 0 ? void 0 : _a.formTemplateId;
    }
    registerChangeListener(listener) {
        this.changeListeners.push(listener);
    }
    unregisterChangeListener(listener) {
        this.changeListeners = this.changeListeners.filter((l) => l !== listener);
    }
    getChildren() {
        return this.children;
    }
    getValidationErrors() {
        throw new Error('Validation not supported at contact level');
    }
    getValues(revisionsFilter) {
        return Object.entries(this.getServicesInHistory(revisionsFilter)).reduce((acc, [id, history]) => history.length
            ? Object.assign(Object.assign({}, acc), { [id]: [...history].sort((a, b) => ((b === null || b === void 0 ? void 0 : b.modified) || +new Date()) - ((a === null || a === void 0 ? void 0 : a.modified) || +new Date())) }) : acc, {});
    }
    getMetadata(id, revisions) {
        return [this.currentContact]
            .concat(this.contactsHistory)
            .filter((ctc) => ctc.rev !== undefined && revisions.includes(ctc.rev))
            .reduce((acc, ctc) => {
            var _a, _b;
            return (_b = ((_a = ctc.services) !== null && _a !== void 0 ? _a : [])
                .filter((s) => s.id === id)
                .reduce((acc, s) => {
                var _a, _b, _c;
                return s.id
                    ? Object.assign(Object.assign({}, acc), { [s.id]: ((_a = acc[s.id]) !== null && _a !== void 0 ? _a : (acc[s.id] = [])).concat({
                            revision: (_b = ctc.rev) !== null && _b !== void 0 ? _b : null,
                            modified: s.modified,
                            value: {
                                label: (_c = s.label) !== null && _c !== void 0 ? _c : s.id,
                                responsible: s.responsible,
                                valueDate: s.valueDate,
                                tags: s.tags,
                            },
                        }) }) : acc;
            }, acc)) !== null && _b !== void 0 ? _b : acc;
        }, {}); //index services in history by id
    }
    setMetadata(meta, id) {
        var _a;
        const service = (id && this.getServiceInCurrentContact(id)) || this.serviceFactory(meta.label, id);
        if (!service.id) {
            throw new Error('Service id must be defined');
        }
        if ((meta.responsible && service.responsible !== meta.responsible) ||
            (meta.valueDate && service.valueDate !== meta.valueDate) ||
            (meta.codes && service.codes !== meta.codes) ||
            (meta.tags && service.tags !== meta.tags)) {
            const newService = new cardinal_sdk_1.DecryptedService(Object.assign(Object.assign({}, service), { modified: Date.now() }));
            meta.responsible && (newService.responsible = meta.responsible);
            meta.valueDate && (newService.valueDate = meta.valueDate);
            meta.codes && (newService.codes = (0, code_utils_1.normalizeCodes)(meta.codes));
            meta.tags && (newService.tags = (0, code_utils_1.normalizeCodes)(meta.tags));
            const newFormValuesContainer = new ContactFormValuesContainer(this.rootForm, Object.assign(Object.assign({}, this.currentContact), { services: (_a = this.currentContact.services) === null || _a === void 0 ? void 0 : _a.map((s) => (s.id === service.id ? newService : s)) }), this.contactsHistory, this.serviceFactory, this.children, this.formFactory, this.formRecycler, this.changeListeners);
            this.changeListeners.forEach((l) => notify(l, newFormValuesContainer));
        }
    }
    setValue(label, language, value, id, metadata, changeListenersOverrider) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
        const service = (id && ((_b = (_a = this.getServicesInHistory((sid, history) => (sid === id ? history.map((x) => x.revision) : []))[id]) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value)) || this.serviceFactory(label, id);
        if (!service.id) {
            throw new Error('Service id must be defined');
        }
        console.log('Setting value of service', service.id, 'with', value, 'and metadata', metadata);
        const newContent = (_c = value === null || value === void 0 ? void 0 : value.content) === null || _c === void 0 ? void 0 : _c[language];
        const newCodes = (value === null || value === void 0 ? void 0 : value.codes) ? (0, code_utils_1.normalizeCodes)(value.codes) : [];
        if (!(0, icure_utils_1.isContentEqual)((_d = service.content) === null || _d === void 0 ? void 0 : _d[language], newContent) || (newCodes && !(0, icure_utils_1.areCodesEqual)(newCodes, (_e = service.codes) !== null && _e !== void 0 ? _e : []))) {
            const newService = new cardinal_sdk_1.DecryptedService(Object.assign(Object.assign({}, service), { modified: Date.now() }));
            const newContents = newContent
                ? Object.assign(Object.assign({}, (service.content || {})), { [language]: newContent }) : Object.assign({}, (service.content || {}));
            if (!newContent) {
                delete newContents[language];
            }
            let newCurrentContact;
            if (!Object.entries(newContents).filter(([, cnt]) => cnt !== undefined).length) {
                newCurrentContact = Object.assign(Object.assign({}, this.currentContact), { subContacts: ((_f = this.currentContact.subContacts) !== null && _f !== void 0 ? _f : []).some((sc) => sc.formId === this.rootForm.id)
                        ? ((_g = this.currentContact.subContacts) !== null && _g !== void 0 ? _g : []).map((sc) => {
                            var _a;
                            if (sc.formId === this.rootForm.id) {
                                return Object.assign(Object.assign({}, sc), { services: ((_a = sc.services) !== null && _a !== void 0 ? _a : []).filter((s) => s.serviceId !== service.id).concat([{ serviceId: service.id }]) });
                            }
                            else {
                                return sc;
                            }
                        })
                        : ((_h = this.currentContact.subContacts) !== null && _h !== void 0 ? _h : []).concat(new cardinal_sdk_1.DecryptedSubContact({ formId: this.rootForm.id, services: [{ serviceId: service.id }] })), services: ((_j = this.currentContact.services) !== null && _j !== void 0 ? _j : []).some((s) => s.id === service.id)
                        ? ((_k = this.currentContact.services) !== null && _k !== void 0 ? _k : []).filter((s) => s.id !== service.id)
                        : [...((_l = this.currentContact.services) !== null && _l !== void 0 ? _l : [])] });
            }
            else {
                newService.content = newContents;
                newService.codes = newCodes;
                if (metadata) {
                    newService.responsible = (_m = metadata.responsible) !== null && _m !== void 0 ? _m : newService.responsible;
                    newService.valueDate = (_o = metadata.valueDate) !== null && _o !== void 0 ? _o : newService.valueDate;
                    newService.tags = metadata.tags ? (0, code_utils_1.normalizeCodes)(metadata.tags) : newService.tags;
                    newService.label = (_p = metadata.label) !== null && _p !== void 0 ? _p : newService.label;
                }
                newCurrentContact = Object.assign(Object.assign({}, this.currentContact), { subContacts: ((_q = this.currentContact.subContacts) !== null && _q !== void 0 ? _q : []).some((sc) => sc.formId === this.rootForm.id)
                        ? ((_r = this.currentContact.subContacts) !== null && _r !== void 0 ? _r : []).map((sc) => {
                            var _a;
                            if (sc.formId === this.rootForm.id) {
                                return Object.assign(Object.assign({}, sc), { services: ((_a = sc.services) !== null && _a !== void 0 ? _a : []).filter((s) => s.serviceId !== service.id).concat([{ serviceId: service.id }]) });
                            }
                            else {
                                return sc;
                            }
                        })
                        : ((_s = this.currentContact.subContacts) !== null && _s !== void 0 ? _s : []).concat(new cardinal_sdk_1.DecryptedSubContact({ formId: this.rootForm.id, services: [{ serviceId: service.id }] })), services: ((_t = this.currentContact.services) !== null && _t !== void 0 ? _t : []).some((s) => s.id === service.id)
                        ? ((_u = this.currentContact.services) !== null && _u !== void 0 ? _u : []).map((s) => (s.id === service.id ? newService : s))
                        : [...((_v = this.currentContact.services) !== null && _v !== void 0 ? _v : []), newService] });
            }
            const newFormValuesContainer = new ContactFormValuesContainer(this.rootForm, newCurrentContact, this.contactsHistory.map((c) => (c === this.currentContact ? newCurrentContact : c)), this.serviceFactory, this.children, this.formFactory, this.formRecycler, this.changeListeners);
            changeListenersOverrider ? changeListenersOverrider(newFormValuesContainer) : this.changeListeners.forEach((l) => notify(l, newFormValuesContainer));
        }
    }
    delete(serviceId) {
        var _a;
        const service = this.getServiceInCurrentContact(serviceId);
        if (service) {
            const newFormValuesContainer = new ContactFormValuesContainer(this.rootForm, Object.assign(Object.assign({}, this.currentContact), { services: (_a = this.currentContact.services) === null || _a === void 0 ? void 0 : _a.map((s) => s.id === serviceId
                    ? new cardinal_sdk_1.DecryptedService(Object.assign(Object.assign({}, service), { endOfLife: Date.now() }))
                    : s) }), this.contactsHistory, this.serviceFactory, this.children, this.formFactory, this.formRecycler, this.changeListeners);
            this.changeListeners.forEach((l) => notify(l, newFormValuesContainer));
        }
    }
    compute() {
        throw new Error('Compute not supported at contact level');
    }
    /** returns all services in history that match a selector
     *
     * @private
     * @param revisionsFilter
     */
    getServicesInHistory(revisionsFilter) {
        const indexedServices = [this.currentContact].concat(this.contactsHistory).reduce((acc, ctc) => {
            var _a, _b, _c;
            const services = (_c = (_b = (_a = ctc.services) === null || _a === void 0 ? void 0 : _a.filter((s) => { var _a; return (_a = ctc.subContacts) === null || _a === void 0 ? void 0 : _a.some((sc) => { var _a; return sc.formId === this.rootForm.id && ((_a = sc.services) === null || _a === void 0 ? void 0 : _a.some((sss) => sss.serviceId === s.id)); }); })) === null || _b === void 0 ? void 0 : _b.reduce((acc, s) => {
                var _a, _b;
                return s.id
                    ? Object.assign(Object.assign({}, acc), { [s.id]: ((_a = acc[s.id]) !== null && _a !== void 0 ? _a : (acc[s.id] = [])).concat({
                            revision: (_b = ctc.rev) !== null && _b !== void 0 ? _b : null,
                            modified: ctc.created,
                            value: s,
                        }) }) : acc;
            }, acc)) !== null && _c !== void 0 ? _c : acc;
            return services;
        }, {}); //index services in history by id
        return Object.entries(indexedServices)
            .map(([id, history]) => {
            const keptRevisions = revisionsFilter(id, history.map(({ revision, modified, value: s }) => {
                var _a, _b;
                return ({
                    revision,
                    modified,
                    value: {
                        label: (_b = (_a = s.label) !== null && _a !== void 0 ? _a : s.id) !== null && _b !== void 0 ? _b : '',
                        owner: s.responsible,
                        valueDate: s.valueDate,
                        codes: s.codes,
                        tags: s.tags,
                    },
                });
            }));
            return [id, history.filter(({ revision }) => keptRevisions.includes(revision))];
        })
            .reduce((acc, [id, history]) => (Object.assign(Object.assign({}, acc), { [id]: history })), {});
    }
    addChild(anchorId, templateId, label) {
        return __awaiter(this, void 0, void 0, function* () {
            const parentId = this.rootForm.id;
            if (!parentId)
                return;
            const newForm = yield this.formFactory(parentId, anchorId, templateId, label);
            const childFVC = new ContactFormValuesContainer(newForm, this.currentContact, this.contactsHistory, this.serviceFactory, [], this.formFactory, this.formRecycler, [], false);
            const newContactFormValuesContainer = new ContactFormValuesContainer(this.rootForm, this.currentContact, this.contactsHistory, this.serviceFactory, [...this.children, childFVC], this.formFactory, this.formRecycler, this.changeListeners);
            newContactFormValuesContainer.registerChildFormValuesContainer(childFVC);
            this.changeListeners.forEach((l) => notify(l, newContactFormValuesContainer));
        });
    }
    getServiceInCurrentContact(id) {
        var _a;
        const service = (_a = (this.currentContact.services || [])) === null || _a === void 0 ? void 0 : _a.find((s) => s.id === id);
        return service !== null && service !== void 0 ? service : undefined;
    }
    removeChild(container) {
        return __awaiter(this, void 0, void 0, function* () {
            const newContactFormValuesContainer = new ContactFormValuesContainer(this.rootForm, this.currentContact, this.contactsHistory, this.serviceFactory, this.children.filter((c) => c.rootForm.id !== container.rootForm.id), this.formFactory, this.formRecycler, this.changeListeners);
            this.changeListeners.forEach((l) => notify(l, newContactFormValuesContainer));
        });
    }
}
exports.ContactFormValuesContainer = ContactFormValuesContainer;
const setValueOnContactFormValuesContainer = (cfvc, label, language, fv, id, metadata, changeListenersOverrider) => {
    var _a, _b, _c, _d;
    const value = fv === null || fv === void 0 ? void 0 : fv.content[language];
    cfvc.setValue(label, language, new cardinal_sdk_1.DecryptedService({
        id: id,
        codes: (_b = (_a = fv === null || fv === void 0 ? void 0 : fv.codes) === null || _a === void 0 ? void 0 : _a.map((x) => new cardinal_sdk_1.CodeStub(x))) !== null && _b !== void 0 ? _b : [],
        content: value
            ? {
                [language]: (0, icure_utils_1.primitiveTypeToContent)(language, value),
            }
            : undefined,
    }), id, metadata
        ? {
            label: (_c = metadata === null || metadata === void 0 ? void 0 : metadata.label) !== null && _c !== void 0 ? _c : label,
            responsible: metadata === null || metadata === void 0 ? void 0 : metadata.owner,
            valueDate: metadata === null || metadata === void 0 ? void 0 : metadata.valueDate,
            tags: (_d = metadata === null || metadata === void 0 ? void 0 : metadata.tags) === null || _d === void 0 ? void 0 : _d.map((x) => new cardinal_sdk_1.CodeStub(x)),
        }
        : undefined, changeListenersOverrider);
};
//# sourceMappingURL=form-values-container.js.map