import '@icure/icure-form/components/themes/icure-blue'
import {css, html, LitElement} from 'lit'
import {BridgedFormValuesContainer, ContactFormValuesContainer} from '@icure/icure-form/icure'
import {property, state} from 'lit/decorators.js'
import {makeInterpreter} from '@icure/icure-form/utils/interpreter'
import {Field, FieldMetadata, Form, Group, Subform, Validator} from '@icure/icure-form/components/model'
import {
    CardinalSdk, CodeFilters,
    CodeStub,
    DecryptedContact,
    DecryptedForm, DecryptedService,
    HealthcareParty, randomUuid,
    User
} from '@icure/cardinal-sdk'
import {Suggestion, Version} from '@icure/icure-form/generic'
import {getRevisionsFilter} from '@icure/icure-form/utils/fields-values-provider'
import {normalizeCode} from "@icure/icure-form/utils/code-utils";
import {Code} from "../icure-form/components/model";

export class DecoratedForm extends LitElement {
    @property() form: Form
    @property() language: string = 'fr'
    @property() sdkLoader: Promise<CardinalSdk>
    @property() ownersProvider: (terms: string[], ids?: string[], specialties?: string[]) => Promise<Suggestion[]>
    @property() rootCardinalForm: DecryptedForm
    @property() currentContact: DecryptedContact
    @property() private author: User | undefined
    @property() private responsible: HealthcareParty | undefined

    private undoStack: BridgedFormValuesContainer[] = []
    private redoStack: BridgedFormValuesContainer[] = []

    @state() formValuesContainer: BridgedFormValuesContainer | undefined = undefined
    @state() observedForms: Record<string, Form> = {}

    static get styles() {
        return css`
            .icure-text-field {
                display: block;
            }

            h2 {
                width: 100%;
                font-size: 2em;
                margin-top: 1em;
                margin-bottom: 0;
                font-family: 'Roboto', Helvetica, sans-serif;
            }

            * {
                box-sizing: border-box;
            }
        `
    }

    public undo() {
        if (!this.formValuesContainer) return
        if (this.undoStack.length > 0) {
            this.redoStack.push(this.formValuesContainer)
            const popped = this.undoStack.pop() as BridgedFormValuesContainer
            this.formValuesContainer = popped.synchronise()
        } else {
            console.log('undo stack is empty')
        }
    }

    public redo() {
        if (!this.formValuesContainer) return
        if (this.redoStack.length > 0) {
            this.undoStack.push(this.formValuesContainer)
            const popped = this.redoStack.pop() as BridgedFormValuesContainer
            this.formValuesContainer = popped.synchronise()
        } else {
            console.log('redo stack is empty')
        }
    }

    async firstUpdated() {
        const sdk = await this.sdkLoader
        const contactFormValuesContainer = await ContactFormValuesContainer.fromFormsHierarchy(
            this.rootCardinalForm,
            this.currentContact,
            [],
            (label, serviceId) => new DecryptedService({
                label,
                id: serviceId ?? randomUuid(),
                created: +new Date(),
                modified: +new Date(),
                responsible: this.responsible?.id,
                author: this.author?.id
            }),
            async () => [],
            async () => new DecryptedForm({}),
            async () => {
            },
        )

        const extractFormulas = (
            fieldGroupOrSubForms: (Field | Group | Subform)[],
            property: (fg: Field) => string | undefined,
        ): {
            metadata: FieldMetadata
            revisionsFilter: (id: string, history: Version<FieldMetadata>[]) => (string | null)[]
            formula: string
        }[] =>
            fieldGroupOrSubForms.flatMap((fg) => {
                if (fg.clazz === 'group') {
                    return extractFormulas(fg.fields ?? [], property)
                } else if (fg.clazz === 'field') {
                    const formula = property(fg)
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    return formula
                        ? [
                            {
                                metadata: {
                                    label: fg.label(),
                                    tags: fg.tags?.map((id) => normalizeCode(new CodeStub({id: id})) as Code),
                                },
                                revisionsFilter: getRevisionsFilter(fg),
                                formula,
                            },
                        ]
                        : []
                } else {
                    return []
                }
            }) ?? []

        const initialisedFormValueContainer = new BridgedFormValuesContainer(
            this.responsible?.id!,
            contactFormValuesContainer,
            makeInterpreter(),
            undefined,
            () => {
                return extractFormulas(this.form.sections?.flatMap((f) => f.fields) ?? [], (fg) => fg.computedProperties?.['defaultValue'])
            },
            () => {
                return extractFormulas(this.form.sections?.flatMap((f) => f.fields) ?? [], (fg) => fg.computedProperties?.['value'])
            },
            () => {
                const form = this.form

                const extractValidators = (
                    fgss: (Field | Group | Subform)[],
                ): {
                    metadata: FieldMetadata
                    validators: Validator[]
                }[] =>
                    fgss.flatMap((fg) => {
                        if (fg.clazz === 'group') {
                            return extractValidators(fg.fields ?? [])
                        } else if (fg.clazz === 'field') {
                            const validators = fg.validators
                            return validators?.length
                                ? [
                                    {
                                        metadata: {
                                            label: fg.label(),
                                            tags: fg.tags?.map((id) => normalizeCode(new CodeStub({id: id})) as Code),
                                        },
                                        validators,
                                    },
                                ]
                                : []
                        } else {
                            return []
                        }
                    }) ?? []

                return form ? extractValidators(form.sections?.flatMap((f) => f.fields) ?? []) : []
            },
            this.language,
            undefined,
        )

        this.formValuesContainer = initialisedFormValueContainer

        initialisedFormValueContainer.registerChangeListener((newValue) => {
            const fvc = this.formValuesContainer
            this.redoStack = []
            fvc && this.undoStack.push(fvc)
            this.formValuesContainer = newValue

            const toSave = this.formValuesContainer.getContactFormValuesContainer()

            setTimeout(() => {
                if (toSave === this.formValuesContainer?.getContactFormValuesContainer()) {
                    console.log('Saving', toSave)
                    // Save to the backend
                    const c = toSave.coordinatedContact()
                    sdk.contact.modifyContact(new DecryptedContact({...c, rev: this.currentContact.rev})).then((modifiedContact) => {
                        this.currentContact = modifiedContact
                    })
                }
            }, 10000)
        })
    }

    async optionsProvider(language: string, codifications: string[], searchTerms: string[]) {
        const codeSdk = (await this.sdkLoader).code
        return Promise.all(codifications.map((c) => {
            const type = c.split('-')[0]
            const longestTerm = searchTerms?.reduce((w, t) => (w.length >= t.length ? w : t), '')

            return codeSdk.filterCodesBy(CodeFilters.byLanguageTypeLabelRegion(language, type, {label: longestTerm})).then(async (codes) => {
                return {type, codes: await codes.next(100)}
            })
        })).then((results) => results.flatMap((r) => r.codes))
    }

    render() {
        return html`
            <icure-form
                    .form="${this.form}"
                    labelPosition="above"
                    renderer="form"
                    .readOnly="${false}"
                    .displayMetadata="${false}"
                    .language="${this.language}"
                    .formValuesContainer="${this.formValuesContainer}"
                    .ownersProvider="${this.ownersProvider.bind(this)}"
                    .optionsProvider="${this.optionsProvider.bind(this)}"
                    )
            ></icure-form>
        `
    }
}
console.warn("Create custom element for decorated-form")
customElements.define('decorated-form', DecoratedForm)
