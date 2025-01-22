import {css, html, LitElement} from "lit";
import {
    AuthenticationMethod,
    CardinalSdk,
    StorageFacade,
    DecryptedForm,
    DecryptedContact,
    randomUuid, PatientFilters, DecryptedPatient, User, HealthcareParty
} from "@icure/cardinal-sdk";
import {state} from "lit/decorators.js";
import {Form} from "@icure/icure-form/components/model";
import * as YAML from "yaml";
// @ts-ignore
import soap_form from "./soap_form.yaml";
import {DecoratedForm} from "./decorated-form";
import {dateToFuzzyDate} from "@icure/icure-form/utils/dates";

class DemoApp extends LitElement {
    @state() sdkLoader = CardinalSdk.initialize(
        undefined,
        "https://api.icure.cloud",
        new AuthenticationMethod.UsingCredentials.UsernamePassword(localStorage.getItem("username") ?? '', localStorage.getItem("password") ?? ''),
        StorageFacade.usingBrowserLocalStorage()
    )
    @state() private form: Form = Form.parse(YAML.parse(soap_form))
    @state() private rootForm: DecryptedForm | undefined
    @state() private currentContact: DecryptedContact | undefined
    @state() private currentUser: User | undefined
    @state() private currentHcp: HealthcareParty | undefined

    static get styles() {
        return css`
            .container {
                display: flex;
                flex-direction: row;
            }
            
            decorated-form {
                width: 100%;
            }
        `
    }

    connectedCallback() {
        super.connectedCallback()
        window.onkeydown = (event) => {
            if ((event.key === 'Z' || event.key === 'z') && event.metaKey) {
                console.log(event.key)
                const target = this.shadowRoot?.getElementById(this.form.id ?? this.form.form)
                if (!target) {
                    return
                }
                if (event.key === 'Z') {
                    console.log('redo')
                    event.preventDefault()
                    ;(target as DecoratedForm).redo()
                } else if (event.key === 'z') {
                    console.log('undo')
                    event.preventDefault()
                    ;(target as DecoratedForm).undo()
                }
            }
        }
    }

    async ownersProvider(terms: string[], ids?: string[], specialties?: string[]) {
        const sdk = await this.sdkLoader
        const longestTerm = terms.reduce((w, t) => (w.length >= t.length ? w : t), '')
        const candidates = await sdk.healthcareParty.findHealthcarePartiesByName({name: longestTerm})
        return (candidates.rows || [])
            .filter((hcp) => terms.every((t) => (
                (hcp.name?.toLowerCase().includes(t.toLowerCase()) ||
                    hcp.firstName?.toLowerCase().includes(t.toLowerCase()) ||
                    hcp.lastName?.toLowerCase().includes(t.toLowerCase())
                ) &&
                (!ids?.length || ids.includes(hcp.id)) &&
                (!specialties?.length || specialties.some((s) => hcp.speciality?.includes(s)))
            )))
            .map((x) => ({id: x.id, text: x.name, terms: terms, label: {}}))
    }

    async firstUpdated() {
        const sdk = await this.sdkLoader
        const pat =
            (await (await sdk.patient.filterPatientsBy(PatientFilters.byNameForSelf("Doe"))).next(1))[0] ??
            await sdk.patient.createPatient(
                await sdk.patient.withEncryptionMetadata(
                    new DecryptedPatient({
                        id: randomUuid(),
                        firstName: "John",
                        lastName: "Doe",
                        dateOfBirth: 19800101,
                    })
                )
            )

        this.rootForm = await sdk.form.createForm(
            await sdk.form.withEncryptionMetadata(
                new DecryptedForm({
                    id: randomUuid(),
                    descr: `SOAP ${new Date().toISOString()}`
                }), pat
            )
        )
        this.currentContact = await sdk.contact.createContact(
            await sdk.contact.withEncryptionMetadata(
                new DecryptedContact({
                    id: randomUuid(),
                    descr: `Contact of ${new Date().toISOString()}`,
                    openingDate: dateToFuzzyDate(new Date())
                }), pat
            )
        )
        this.currentUser = await sdk.user.getCurrentUser()
        this.currentHcp = await sdk.healthcareParty.getCurrentHealthcareParty()
    }

    isReady() {
        return this.rootForm !== undefined && this.currentContact !== undefined && this.currentUser !== undefined && this.currentHcp !== undefined
    }

    render() {
        console.warn("Render with decorated-form")

        return html`
            <div class="container">
                ${
                        this.isReady() ?
                        html`
                            <decorated-form
                                    .form="${this.form}"
                                    .currentContact="${this.currentContact}"
                                    .rootCardinalForm="${this.rootForm}"
                                    .sdkLoader="${this.sdkLoader}"
                                    .author="${this.currentUser}"
                                    .responsible="${this.currentHcp}"
                                    .ownersProvider="${this.ownersProvider.bind(this)}"
                            ></decorated-form>`
                                : html`<p>Loading...</p>`
                }
            </div>
        `
    }
}

customElements.define('demo-app', DemoApp)
