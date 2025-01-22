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
exports.render = void 0;
const lit_1 = require("lit");
const fields_values_provider_1 = require("../../../../utils/fields-values-provider");
const languages_1 = require("../../../../utils/languages");
const utils_1 = require("../../../common/utils");
const code_utils_1 = require("../../../../utils/code-utils");
require("./form-selection-button");
const dates_1 = require("../../../../utils/dates");
const render = (form, props, formsValueContainer, translationProvider, ownersProvider = () => __awaiter(void 0, void 0, void 0, function* () { return []; }), optionsProvider, actionListener = () => undefined, languages, readonly, displayMetadata) => {
    const composedOptionsProvider = optionsProvider && form.codifications
        ? (language, codifications, terms, sortOptions) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c;
            const originalOptions = optionsProvider ? yield optionsProvider(language, codifications, terms) : [];
            return (0, code_utils_1.sortSuggestions)(originalOptions.concat((_c = (_b = (_a = form.codifications) === null || _a === void 0 ? void 0 : _a.filter((c) => codifications.includes(c.type))) === null || _b === void 0 ? void 0 : _b.flatMap((c) => c.codes
                .filter((c) => (terms !== null && terms !== void 0 ? terms : []).map((st) => st.toLowerCase()).every((st) => c.label[language].toLowerCase().includes(st)))
                .map((c) => ({ id: c.id, label: c.label, text: c.label[language], terms: terms !== null && terms !== void 0 ? terms : [] })))) !== null && _c !== void 0 ? _c : []), language, sortOptions);
        })
        : optionsProvider
            ? (language, codifications, terms, sortOptions) => {
                var _a;
                return (_a = optionsProvider === null || optionsProvider === void 0 ? void 0 : optionsProvider(language, codifications, terms).then((codes) => (0, code_utils_1.sortSuggestions)(codes, language, sortOptions))) !== null && _a !== void 0 ? _a : Promise.resolve([]);
            }
            : undefined;
    const h = function (level, className = '', content) {
        return level === 1
            ? (0, lit_1.html) `<h1 class="${className}">${content}</h1>`
            : level === 2
                ? (0, lit_1.html) `<h2 class="${className}">${content}</h2>`
                : level === 3
                    ? (0, lit_1.html) `<h3 class="${className}">${content}</h3>`
                    : level === 4
                        ? (0, lit_1.html) `<h4 class="${className}">${content}</h4>`
                        : level === 5
                            ? (0, lit_1.html) `<h5 class="${className}">${content}</h5>`
                            : (0, lit_1.html) `<h6 class="${className}">${content}</h6>`;
    };
    function renderGroup(fg, fgSpan, level) {
        var _a;
        const subElements = ((_a = fg.fields) !== null && _a !== void 0 ? _a : []).map((fieldOrGroup) => renderFieldGroupOrSubform(fieldOrGroup, level + 1)).filter((x) => !!x && x !== lit_1.nothing);
        return subElements.length
            ? (0, lit_1.html) `<div class="${['group', fg.borderless ? undefined : 'bordered'].filter((x) => !!x).join(' ')}" style="${calculateFieldOrGroupSize(fgSpan, 1)}">
					${fg.borderless ? lit_1.nothing : (0, lit_1.html) `<div>${h(level, '', (0, lit_1.html) `${fg.group}`)}</div>`}
					<div class="icure-form">${subElements}</div>
			  </div>`
            : lit_1.nothing;
    }
    function renderSubform(fg, fgSpan, level) {
        var _a, _b, _c;
        const children = (_a = formsValueContainer === null || formsValueContainer === void 0 ? void 0 : formsValueContainer.getChildren()) === null || _a === void 0 ? void 0 : _a.filter((c) => c.getLabel() === fg.id);
        const tp = translationProvider !== null && translationProvider !== void 0 ? translationProvider : (form.translations && (0, languages_1.defaultTranslationProvider)(form.translations));
        return (0, lit_1.html) `<div class="subform" style="${calculateFieldOrGroupSize(fgSpan, 1)}">
			<div class="subform__heading">
				${h(level, 'subform__heading__title', (0, lit_1.html) `${(_b = (props.language && fg.shortLabel ? tp === null || tp === void 0 ? void 0 : tp(props.language, fg.shortLabel) : fg.shortLabel)) !== null && _b !== void 0 ? _b : ''}`)}
				${readonly
            ? lit_1.nothing
            : (0, lit_1.html) `<form-selection-button
							.label="${(_c = fg.labels.add) !== null && _c !== void 0 ? _c : 'Add subform'}"
							.forms="${Object.entries(fg.forms)}"
							.formAdded="${(title, form) => {
                var _a;
                form.id && (formsValueContainer === null || formsValueContainer === void 0 ? void 0 : formsValueContainer.addChild(fg.id, form.id, (_a = fg.shortLabel) !== null && _a !== void 0 ? _a : ''));
            }}"
							.translationProvider="${tp}"
							.language="${props.language}"
					  ></form-selection-button>`}
			</div>
			${children === null || children === void 0 ? void 0 : children.map((child) => {
            var _a, _b, _c;
            const childForm = Object.values(fg.forms).find((f) => f.id === child.getFormId());
            const title = (_a = childForm === null || childForm === void 0 ? void 0 : childForm.form) !== null && _a !== void 0 ? _a : childForm === null || childForm === void 0 ? void 0 : childForm.description;
            const localisedTitle = (_b = (title && tp && props.language ? tp === null || tp === void 0 ? void 0 : tp(props.language, title) : title)) !== null && _b !== void 0 ? _b : '';
            const localisedRemove = (_c = (fg.labels.remove && tp && props.language ? tp === null || tp === void 0 ? void 0 : tp(props.language, fg.labels.remove) : fg.labels.remove)) !== null && _c !== void 0 ? _c : 'Remove';
            return (childForm &&
                (0, lit_1.html) `
							<div class="subform__child">
								<h3 class="subform__child__title">${localisedTitle}</h3>
								${(0, exports.render)(childForm, props, child, translationProvider, ownersProvider, optionsProvider, actionListener, languages, readonly, displayMetadata)}
								${readonly ? lit_1.nothing : (0, lit_1.html) `<button class="subform__removeBtn" @click="${() => { var _a; return (_a = formsValueContainer === null || formsValueContainer === void 0 ? void 0 : formsValueContainer.removeChild) === null || _a === void 0 ? void 0 : _a.call(formsValueContainer, child); }}">${localisedRemove}</button>`}
							</div>
						`);
        }).filter((x) => !!x)}
		</div>`;
    }
    function renderTextField(fgSpan, fgRowSpan, fg) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return (0, lit_1.html) `<icure-form-text-field
			class="icure-form-field"
			style="${calculateFieldOrGroupSize(fgSpan, fgRowSpan, (_a = fg.styleOptions) === null || _a === void 0 ? void 0 : _a.width)}"
			label="${fg.field}"
			value="${fg.value}"
			.displayedLabels="${(0, utils_1.getLabels)(fg)}"
			.displayMetadata="${displayMetadata}"
			.multiline="${fg.multiline || false}"
			.lines=${fgRowSpan}
			.defaultLanguage="${props.language}"
			.languages="${languages}"
			.linksProvider=${(_b = fg.options) === null || _b === void 0 ? void 0 : _b.linksProvider}
			.suggestionProvider=${(_c = fg.options) === null || _c === void 0 ? void 0 : _c.suggestionProvider}
			.ownersProvider=${ownersProvider}
			.translationProvider=${translationProvider !== null && translationProvider !== void 0 ? translationProvider : (form.translations && (0, languages_1.defaultTranslationProvider)(form.translations))}
			.validationErrorsProvider="${(0, fields_values_provider_1.getValidationError)(formsValueContainer, fg)}"
			.codeColorProvider=${(_d = fg.options) === null || _d === void 0 ? void 0 : _d.codeColorProvider}
			.linkColorProvider=${(_e = fg.options) === null || _e === void 0 ? void 0 : _e.linkColorProvider}
			.codeContentProvider=${(_f = fg.options) === null || _f === void 0 ? void 0 : _f.codeContentProvider}
			.valueProvider="${formsValueContainer && (0, fields_values_provider_1.fieldValuesProvider)(formsValueContainer, fg)}"
			.metadataProvider=${formsValueContainer && formsValueContainer.getMetadata.bind(formsValueContainer)}
			.handleValueChanged=${(0, fields_values_provider_1.handleValueChangedProvider)(formsValueContainer, fg, props.defaultOwner)}
			.handleMetadataChanged=${(0, fields_values_provider_1.handleMetadataChangedProvider)(formsValueContainer)}
			.styleOptions="${fg.styleOptions}"
			.readonly="${readonly || fg.readonly || (((_g = fg.computedProperties) === null || _g === void 0 ? void 0 : _g.readonly) ? !(formsValueContainer === null || formsValueContainer === void 0 ? void 0 : formsValueContainer.compute((_h = fg.computedProperties) === null || _h === void 0 ? void 0 : _h.readonly)) : false)}"
		></icure-form-text-field>`;
    }
    function renderTokenField(fgSpan, fgRowSpan, fg) {
        var _a, _b, _c, _d;
        return (0, lit_1.html) `<icure-form-token-field
			class="icure-form-field"
			style="${calculateFieldOrGroupSize(fgSpan, fgRowSpan, (_a = fg.styleOptions) === null || _a === void 0 ? void 0 : _a.width)}"
			label="${fg.field}"
			value="${fg.value}"
			.displayedLabels="${(0, utils_1.getLabels)(fg)}"
			.displayMetadata="${displayMetadata}"
			.multiline="${fg.multiline || false}"
			.lines=${fgRowSpan}
			.defaultLanguage="${props.language}"
			.suggestionProvider=${(_b = fg.options) === null || _b === void 0 ? void 0 : _b.suggestionProvider}
			.ownersProvider=${ownersProvider}
			.translationProvider=${translationProvider !== null && translationProvider !== void 0 ? translationProvider : (form.translations && (0, languages_1.defaultTranslationProvider)(form.translations))}
			.validationErrorsProvider="${(0, fields_values_provider_1.getValidationError)(formsValueContainer, fg)}"
			.valueProvider="${formsValueContainer && (0, fields_values_provider_1.fieldValuesProvider)(formsValueContainer, fg)}"
			.metadataProvider=${formsValueContainer && formsValueContainer.getMetadata.bind(formsValueContainer)}
			.handleValueChanged=${(0, fields_values_provider_1.handleValueChangedProvider)(formsValueContainer, fg, props.defaultOwner)}
			.handleMetadataChanged=${(0, fields_values_provider_1.handleMetadataChangedProvider)(formsValueContainer)}
			.styleOptions="${fg.styleOptions}"
			.readonly="${readonly || fg.readonly || (((_c = fg.computedProperties) === null || _c === void 0 ? void 0 : _c.readonly) ? !(formsValueContainer === null || formsValueContainer === void 0 ? void 0 : formsValueContainer.compute((_d = fg.computedProperties) === null || _d === void 0 ? void 0 : _d.readonly)) : false)}"
		></icure-form-token-field>`;
    }
    function renderItemsListField(fgSpan, fgRowSpan, fg) {
        var _a, _b, _c, _d;
        return (0, lit_1.html) `<icure-form-items-list-field
			class="icure-form-field"
			style="${calculateFieldOrGroupSize(fgSpan, fgRowSpan, (_a = fg.styleOptions) === null || _a === void 0 ? void 0 : _a.width)}"
			label="${fg.field}"
			value="${fg.value}"
			.displayedLabels="${(0, utils_1.getLabels)(fg)}"
			.displayMetadata="${displayMetadata}"
			.multiline="${fg.multiline || false}"
			.lines=${fgRowSpan}
			.defaultLanguage="${props.language}"
			.suggestionProvider=${(_b = fg.options) === null || _b === void 0 ? void 0 : _b.suggestionProvider}
			.ownersProvider=${ownersProvider}
			.translationProvider=${translationProvider !== null && translationProvider !== void 0 ? translationProvider : (form.translations && (0, languages_1.defaultTranslationProvider)(form.translations))}
			.validationErrorsProvider="${(0, fields_values_provider_1.getValidationError)(formsValueContainer, fg)}"
			.valueProvider="${formsValueContainer && (0, fields_values_provider_1.fieldValuesProvider)(formsValueContainer, fg)}"
			.metadataProvider=${formsValueContainer && formsValueContainer.getMetadata.bind(formsValueContainer)}
			.handleValueChanged=${(0, fields_values_provider_1.handleValueChangedProvider)(formsValueContainer, fg, props.defaultOwner)}
			.handleMetadataChanged=${(0, fields_values_provider_1.handleMetadataChangedProvider)(formsValueContainer)}
			.styleOptions="${fg.styleOptions}"
			.readonly="${readonly || fg.readonly || (((_c = fg.computedProperties) === null || _c === void 0 ? void 0 : _c.readonly) ? !(formsValueContainer === null || formsValueContainer === void 0 ? void 0 : formsValueContainer.compute((_d = fg.computedProperties) === null || _d === void 0 ? void 0 : _d.readonly)) : false)}"
		></icure-form-items-list-field>`;
    }
    function renderMeasureField(fgSpan, fgRowSpan, fg) {
        var _a, _b;
        return (0, lit_1.html) `<icure-form-measure-field
			style="${calculateFieldOrGroupSize(fgSpan, fgRowSpan)}"
			class="icure-form-field"
			label="${fg.field}"
			.displayedLabels="${(0, utils_1.getLabels)(fg)}"
			.displayMetadata="${displayMetadata}"
			value="${fg.value}"
			unit="${fg.unit}"
			.defaultLanguage="${props.language}"
			.translationProvider=${translationProvider !== null && translationProvider !== void 0 ? translationProvider : (form.translations && (0, languages_1.defaultTranslationProvider)(form.translations))}
			.validationErrorsProvider="${(0, fields_values_provider_1.getValidationError)(formsValueContainer, fg)}"
			.valueProvider="${formsValueContainer && (0, fields_values_provider_1.fieldValuesProvider)(formsValueContainer, fg)}"
			.metadataProvider=${formsValueContainer && formsValueContainer.getMetadata.bind(formsValueContainer)}
			.handleValueChanged=${(0, fields_values_provider_1.handleValueChangedProvider)(formsValueContainer, fg, props.defaultOwner)}
			.handleMetadataChanged=${(0, fields_values_provider_1.handleMetadataChangedProvider)(formsValueContainer)}
			.styleOptions="${fg.styleOptions}"
			.readonly="${readonly || fg.readonly || (((_a = fg.computedProperties) === null || _a === void 0 ? void 0 : _a.readonly) ? !(formsValueContainer === null || formsValueContainer === void 0 ? void 0 : formsValueContainer.compute((_b = fg.computedProperties) === null || _b === void 0 ? void 0 : _b.readonly)) : false)}"
		></icure-form-measure-field>`;
    }
    function renderNumberField(fgSpan, fgRowSpan, fg) {
        var _a, _b;
        return (0, lit_1.html) `<icure-form-number-field
			style="${calculateFieldOrGroupSize(fgSpan, fgRowSpan)}"
			class="icure-form-field"
			label="${fg.field}"
			.displayedLabels="${(0, utils_1.getLabels)(fg)}"
			.displayMetadata="${displayMetadata}"
			value="${fg.value}"
			.defaultLanguage="${props.language}"
			.translationProvider=${translationProvider !== null && translationProvider !== void 0 ? translationProvider : (form.translations && (0, languages_1.defaultTranslationProvider)(form.translations))}
			.validationErrorsProvider="${(0, fields_values_provider_1.getValidationError)(formsValueContainer, fg)}"
			.valueProvider="${formsValueContainer && (0, fields_values_provider_1.fieldValuesProvider)(formsValueContainer, fg)}"
			.metadataProvider=${formsValueContainer && formsValueContainer.getMetadata.bind(formsValueContainer)}
			.handleValueChanged=${(0, fields_values_provider_1.handleValueChangedProvider)(formsValueContainer, fg, props.defaultOwner)}
			.handleMetadataChanged=${(0, fields_values_provider_1.handleMetadataChangedProvider)(formsValueContainer)}
			.styleOptions="${fg.styleOptions}"
			.readonly="${readonly || fg.readonly || (((_a = fg.computedProperties) === null || _a === void 0 ? void 0 : _a.readonly) ? !(formsValueContainer === null || formsValueContainer === void 0 ? void 0 : formsValueContainer.compute((_b = fg.computedProperties) === null || _b === void 0 ? void 0 : _b.readonly)) : false)}"
		></icure-form-number-field>`;
    }
    function renderDatePicker(fgSpan, fgRowSpan, fg) {
        var _a, _b;
        return (0, lit_1.html) `<icure-form-date-picker
			style="${calculateFieldOrGroupSize(fgSpan, fgRowSpan)}"
			class="icure-form-field"
			label="${fg.field}"
			.displayedLabels="${(0, utils_1.getLabels)(fg)}"
			.displayMetadata="${displayMetadata}"
			value="${fg.now ? (0, dates_1.currentDate)() : fg.value}"
			.defaultLanguage="${props.language}"
			.translationProvider=${translationProvider !== null && translationProvider !== void 0 ? translationProvider : (form.translations && (0, languages_1.defaultTranslationProvider)(form.translations))}
			.validationErrorsProvider="${(0, fields_values_provider_1.getValidationError)(formsValueContainer, fg)}"
			.valueProvider="${formsValueContainer && (0, fields_values_provider_1.fieldValuesProvider)(formsValueContainer, fg)}"
			.metadataProvider=${formsValueContainer && formsValueContainer.getMetadata.bind(formsValueContainer)}
			.handleValueChanged=${(0, fields_values_provider_1.handleValueChangedProvider)(formsValueContainer, fg, props.defaultOwner)}
			.handleMetadataChanged=${(0, fields_values_provider_1.handleMetadataChangedProvider)(formsValueContainer)}
			.styleOptions="${fg.styleOptions}"
			.readonly="${readonly || fg.readonly || (((_a = fg.computedProperties) === null || _a === void 0 ? void 0 : _a.readonly) ? !(formsValueContainer === null || formsValueContainer === void 0 ? void 0 : formsValueContainer.compute((_b = fg.computedProperties) === null || _b === void 0 ? void 0 : _b.readonly)) : false)}"
		></icure-form-date-picker>`;
    }
    function renderTimePicker(fgSpan, fgRowSpan, fg) {
        var _a, _b;
        return (0, lit_1.html) `<icure-form-time-picker
			style="${calculateFieldOrGroupSize(fgSpan, fgRowSpan)}"
			class="icure-form-field"
			label="${fg.field}"
			.displayedLabels="${(0, utils_1.getLabels)(fg)}"
			.displayMetadata="${displayMetadata}"
			value="${fg.now ? (0, dates_1.currentTime)() : fg.value}"
			.defaultLanguage="${props.language}"
			.translationProvider=${translationProvider !== null && translationProvider !== void 0 ? translationProvider : (form.translations && (0, languages_1.defaultTranslationProvider)(form.translations))}
			.validationErrorsProvider="${(0, fields_values_provider_1.getValidationError)(formsValueContainer, fg)}"
			.valueProvider="${formsValueContainer && (0, fields_values_provider_1.fieldValuesProvider)(formsValueContainer, fg)}"
			.metadataProvider=${formsValueContainer && formsValueContainer.getMetadata.bind(formsValueContainer)}
			.handleValueChanged=${(0, fields_values_provider_1.handleValueChangedProvider)(formsValueContainer, fg, props.defaultOwner)}
			.handleMetadataChanged=${(0, fields_values_provider_1.handleMetadataChangedProvider)(formsValueContainer)}
			.styleOptions="${fg.styleOptions}"
			.readonly="${readonly || fg.readonly || (((_a = fg.computedProperties) === null || _a === void 0 ? void 0 : _a.readonly) ? !(formsValueContainer === null || formsValueContainer === void 0 ? void 0 : formsValueContainer.compute((_b = fg.computedProperties) === null || _b === void 0 ? void 0 : _b.readonly)) : false)}"
		></icure-form-time-picker>`;
    }
    function renderDateTimePicker(fgSpan, fgRowSpan, fg) {
        var _a, _b;
        return (0, lit_1.html) `<icure-form-date-time-picker
			style="${calculateFieldOrGroupSize(fgSpan, fgRowSpan)}"
			class="icure-form-field"
			label="${fg.field}"
			.displayedLabels="${(0, utils_1.getLabels)(fg)}"
			.displayMetadata="${displayMetadata}"
			value="${fg.now ? (0, dates_1.currentDateTime)() : fg.value}"
			.defaultLanguage="${props.language}"
			.translationProvider=${translationProvider !== null && translationProvider !== void 0 ? translationProvider : (form.translations && (0, languages_1.defaultTranslationProvider)(form.translations))}
			.validationErrorsProvider="${(0, fields_values_provider_1.getValidationError)(formsValueContainer, fg)}"
			.valueProvider="${formsValueContainer && (0, fields_values_provider_1.fieldValuesProvider)(formsValueContainer, fg)}"
			.metadataProvider=${formsValueContainer && formsValueContainer.getMetadata.bind(formsValueContainer)}
			.handleValueChanged=${(0, fields_values_provider_1.handleValueChangedProvider)(formsValueContainer, fg, props.defaultOwner)}
			.handleMetadataChanged=${(0, fields_values_provider_1.handleMetadataChangedProvider)(formsValueContainer)}
			.styleOptions="${fg.styleOptions}"
			.readonly="${readonly || fg.readonly || (((_a = fg.computedProperties) === null || _a === void 0 ? void 0 : _a.readonly) ? !(formsValueContainer === null || formsValueContainer === void 0 ? void 0 : formsValueContainer.compute((_b = fg.computedProperties) === null || _b === void 0 ? void 0 : _b.readonly)) : false)}"
		></icure-form-date-time-picker>`;
    }
    function renderDropdownField(fgSpan, fgRowSpan, fg) {
        var _a, _b, _c;
        return (0, lit_1.html) `<icure-form-dropdown-field
			style="${calculateFieldOrGroupSize(fgSpan, fgRowSpan)}"
			class="icure-form-field"
			.label=${fg.field}
			.displayedLabels=${(0, utils_1.getLabels)(fg)}
			.defaultLanguage="${props.language}"
			.translate="${fg.translate}"
			.sortOptions="${fg.sortOptions}"
			value="${fg.value}"
			.codifications="${fg.codifications}"
			.optionsProvider="${composedOptionsProvider && ((_a = fg.codifications) === null || _a === void 0 ? void 0 : _a.length)
            ? (language, terms) => { var _a; return composedOptionsProvider(language, (_a = fg.codifications) !== null && _a !== void 0 ? _a : [], terms, fg.sortOptions); }
            : (language, terms) => (0, code_utils_1.filterAndSortOptionsFromFieldDefinition)(language, fg, translationProvider, terms)}"
			.ownersProvider=${ownersProvider}
			.translationProvider=${translationProvider !== null && translationProvider !== void 0 ? translationProvider : (form.translations && (0, languages_1.defaultTranslationProvider)(form.translations))}
			.validationErrorsProvider="${(0, fields_values_provider_1.getValidationError)(formsValueContainer, fg)}"
			.valueProvider="${formsValueContainer && (0, fields_values_provider_1.fieldValuesProvider)(formsValueContainer, fg)}"
			.metadataProvider=${formsValueContainer && formsValueContainer.getMetadata.bind(formsValueContainer)}
			.handleValueChanged=${(0, fields_values_provider_1.handleValueChangedProvider)(formsValueContainer, fg, props.defaultOwner)}
			.handleMetadataChanged=${(0, fields_values_provider_1.handleMetadataChangedProvider)(formsValueContainer)}
			.styleOptions="${fg.styleOptions}"
			.readonly="${readonly || fg.readonly || (((_b = fg.computedProperties) === null || _b === void 0 ? void 0 : _b.readonly) ? !(formsValueContainer === null || formsValueContainer === void 0 ? void 0 : formsValueContainer.compute((_c = fg.computedProperties) === null || _c === void 0 ? void 0 : _c.readonly)) : false)}"
		></icure-form-dropdown-field>`;
    }
    function renderRadioButtons(fgSpan, fgRowSpan, fg) {
        var _a, _b, _c;
        return (0, lit_1.html) `<icure-form-radio-button
			style="${calculateFieldOrGroupSize(fgSpan, fgRowSpan)}"
			class="icure-form-field"
			.label="${fg.field}"
			.displayedLabels="${(0, utils_1.getLabels)(fg)}"
			.displayMetadata="${displayMetadata}"
			.defaultLanguage="${props.language}"
			.translate="${fg.translate}"
			.sortOptions="${fg.sortOptions}"
			.codifications="${fg.codifications}"
			.optionsProvider="${composedOptionsProvider && ((_a = fg.codifications) === null || _a === void 0 ? void 0 : _a.length)
            ? (language, terms) => { var _a; return composedOptionsProvider(language, (_a = fg.codifications) !== null && _a !== void 0 ? _a : [], terms, fg.sortOptions); }
            : (language, terms) => (0, code_utils_1.filterAndSortOptionsFromFieldDefinition)(language, fg, translationProvider, terms)}"
			.ownersProvider=${ownersProvider}
			.translationProvider=${translationProvider !== null && translationProvider !== void 0 ? translationProvider : (form.translations && (0, languages_1.defaultTranslationProvider)(form.translations))}
			.validationErrorsProvider="${(0, fields_values_provider_1.getValidationError)(formsValueContainer, fg)}"
			.valueProvider="${formsValueContainer && (0, fields_values_provider_1.fieldValuesProvider)(formsValueContainer, fg)}"
			.metadataProvider=${formsValueContainer && formsValueContainer.getMetadata.bind(formsValueContainer)}
			.handleValueChanged=${(0, fields_values_provider_1.handleValueChangedProvider)(formsValueContainer, fg, props.defaultOwner)}
			.handleMetadataChanged=${(0, fields_values_provider_1.handleMetadataChangedProvider)(formsValueContainer)}
			.styleOptions="${fg.styleOptions}"
			.readonly="${readonly || fg.readonly || (((_b = fg.computedProperties) === null || _b === void 0 ? void 0 : _b.readonly) ? !(formsValueContainer === null || formsValueContainer === void 0 ? void 0 : formsValueContainer.compute((_c = fg.computedProperties) === null || _c === void 0 ? void 0 : _c.readonly)) : false)}"
		></icure-form-radio-button>`;
    }
    function renderCheckboxes(fgSpan, fgRowSpan, fg) {
        var _a, _b, _c;
        return (0, lit_1.html) ` <icure-form-checkbox
			style="${calculateFieldOrGroupSize(fgSpan, fgRowSpan)}"
			class="icure-form-field"
			.label="${fg.field}"
			.displayedLabels="${(0, utils_1.getLabels)(fg)}"
			.displayMetadata="${displayMetadata}"
			.defaultLanguage="${props.language}"
			.translate="${fg.translate}"
			.sortOptions="${fg.sortOptions}"
			value="${fg.value}"
			.codifications="${fg.codifications}"
			.optionsProvider="${composedOptionsProvider && ((_a = fg.codifications) === null || _a === void 0 ? void 0 : _a.length)
            ? (language, terms) => { var _a; return composedOptionsProvider(language, (_a = fg.codifications) !== null && _a !== void 0 ? _a : [], terms, fg.sortOptions); }
            : (language, terms) => (0, code_utils_1.filterAndSortOptionsFromFieldDefinition)(language, fg, translationProvider, terms)}"
			.ownersProvider="${ownersProvider}"
			.translationProvider="${translationProvider !== null && translationProvider !== void 0 ? translationProvider : (form.translations && (0, languages_1.defaultTranslationProvider)(form.translations))}"
			.validationErrorsProvider="${(0, fields_values_provider_1.getValidationError)(formsValueContainer, fg)}"
			.valueProvider="${formsValueContainer && (0, fields_values_provider_1.fieldValuesProvider)(formsValueContainer, fg)}"
			.metadataProvider="${formsValueContainer && formsValueContainer.getMetadata.bind(formsValueContainer)}"
			.handleValueChanged="${(0, fields_values_provider_1.handleValueChangedProvider)(formsValueContainer, fg, props.defaultOwner)}"
			.handleMetadataChanged="${(0, fields_values_provider_1.handleMetadataChangedProvider)(formsValueContainer)}"
			.styleOptions="${fg.styleOptions}"
			.readonly="${readonly || fg.readonly || (((_b = fg.computedProperties) === null || _b === void 0 ? void 0 : _b.readonly) ? !(formsValueContainer === null || formsValueContainer === void 0 ? void 0 : formsValueContainer.compute((_c = fg.computedProperties) === null || _c === void 0 ? void 0 : _c.readonly)) : false)}"
		></icure-form-checkbox>`;
    }
    function renderButton(fgSpan, fgRowSpan, fg) {
        var _a, _b, _c, _d, _e;
        return (0, lit_1.html) `<icure-form-button
			style="${calculateFieldOrGroupSize(fgSpan, fgRowSpan)}"
			class="icure-form-button"
			label="${(_a = fg.shortLabel) !== null && _a !== void 0 ? _a : fg.field}"
			.defaultLanguage="${props.language}"
			.translationProvider="${translationProvider !== null && translationProvider !== void 0 ? translationProvider : (form.translations && (0, languages_1.defaultTranslationProvider)(form.translations))}"
			.validationErrorsProvider="${(0, fields_values_provider_1.getValidationError)(formsValueContainer, fg)}"
			.actionListener="${actionListener}"
			.event="${fg.event !== undefined ? fg.event : ((_b = fg.computedProperties) === null || _b === void 0 ? void 0 : _b.event) ? !(formsValueContainer === null || formsValueContainer === void 0 ? void 0 : formsValueContainer.compute((_c = fg.computedProperties) === null || _c === void 0 ? void 0 : _c.event)) : 'submit'}"
			.payload="${fg.payload !== undefined ? fg.payload : ((_d = fg.computedProperties) === null || _d === void 0 ? void 0 : _d.payload) ? !(formsValueContainer === null || formsValueContainer === void 0 ? void 0 : formsValueContainer.compute((_e = fg.computedProperties) === null || _e === void 0 ? void 0 : _e.payload)) : undefined}"
			.styleOptions="${fg.styleOptions}"
		></icure-form-button>`;
    }
    function renderLabel(fgSpan, fgRowSpan, fg) {
        var _a, _b;
        return (0, lit_1.html) `<icure-form-label
			style="${calculateFieldOrGroupSize(fgSpan, fgRowSpan)}"
			class="icure-form-field"
			.defaultLanguage="${props.language}"
			labelPosition=${props.labelPosition}
			label="${fg.field}"
			.translationProvider="${translationProvider !== null && translationProvider !== void 0 ? translationProvider : (form.translations && (0, languages_1.defaultTranslationProvider)(form.translations))}"
			.validationErrorsProvider="${(0, fields_values_provider_1.getValidationError)(formsValueContainer, fg)}"
			.styleOptions="${fg.styleOptions}"
			.readonly="${readonly || fg.readonly || (((_a = fg.computedProperties) === null || _a === void 0 ? void 0 : _a.readonly) ? !(formsValueContainer === null || formsValueContainer === void 0 ? void 0 : formsValueContainer.compute((_b = fg.computedProperties) === null || _b === void 0 ? void 0 : _b.readonly)) : false)}"
		></icure-form-label>`;
    }
    const renderFieldGroupOrSubform = function (fg, level) {
        var _a, _b, _c, _d, _e, _f;
        if (!fg) {
            return lit_1.nothing;
        }
        const computedProperties = Object.keys((_a = fg.computedProperties) !== null && _a !== void 0 ? _a : {}).reduce((acc, k) => { var _a; return (Object.assign(Object.assign({}, acc), { [k]: ((_a = fg.computedProperties) === null || _a === void 0 ? void 0 : _a[k]) && (formsValueContainer === null || formsValueContainer === void 0 ? void 0 : formsValueContainer.compute(fg.computedProperties[k])) })); }, {});
        if (computedProperties['hidden']) {
            return lit_1.nothing;
        }
        const fgSpan = ((_c = (_b = computedProperties['span']) !== null && _b !== void 0 ? _b : fg.span) !== null && _c !== void 0 ? _c : 6);
        const fgRowSpan = ((_e = (_d = computedProperties['rowSpan']) !== null && _d !== void 0 ? _d : fg.rowSpan) !== null && _e !== void 0 ? _e : 1);
        if (fg.clazz === 'group' && ((_f = fg.fields) === null || _f === void 0 ? void 0 : _f.length)) {
            return renderGroup(fg.copy(Object.assign({}, computedProperties)), fgSpan, level);
        }
        else if (fg.clazz === 'subform' && (fg.id || computedProperties['title'])) {
            return renderSubform(fg.copy(Object.assign({}, computedProperties)), fgSpan, level);
        }
        else if (fg.clazz === 'field') {
            const field = fg.copy(Object.assign({}, computedProperties));
            return (0, lit_1.html) `${fg.type === 'text-field'
                ? renderTextField(fgSpan, fgRowSpan, field)
                : fg.type === 'measure-field'
                    ? renderMeasureField(fgSpan, fgRowSpan, field)
                    : fg.type === 'token-field'
                        ? renderTokenField(fgSpan, fgRowSpan, field)
                        : fg.type === 'items-list-field'
                            ? renderItemsListField(fgSpan, fgRowSpan, field)
                            : fg.type === 'number-field'
                                ? renderNumberField(fgSpan, fgRowSpan, field)
                                : fg.type === 'date-picker'
                                    ? renderDatePicker(fgSpan, fgRowSpan, field)
                                    : fg.type === 'time-picker'
                                        ? renderTimePicker(fgSpan, fgRowSpan, field)
                                        : fg.type === 'date-time-picker'
                                            ? renderDateTimePicker(fgSpan, fgRowSpan, field)
                                            : fg.type === 'dropdown-field'
                                                ? renderDropdownField(fgSpan, fgRowSpan, field)
                                                : fg.type === 'radio-button'
                                                    ? renderRadioButtons(fgSpan, fgRowSpan, field)
                                                    : fg.type === 'checkbox'
                                                        ? renderCheckboxes(fgSpan, fgRowSpan, field)
                                                        : fg.type === 'label'
                                                            ? renderLabel(fgSpan, fgRowSpan, field)
                                                            : fg.type === 'action'
                                                                ? renderButton(fgSpan, fgRowSpan, field)
                                                                : ''}`;
        }
        return (0, lit_1.html) ``;
    };
    const calculateFieldOrGroupSize = (span, rowSpan, fixedWidth) => {
        if (fixedWidth)
            return `width: ${fixedWidth}px`;
        return `grid-column: span ${span}; ${rowSpan > 1 ? `grid-row: span ${rowSpan}` : ''}`;
    };
    const renderForm = (form) => {
        return form.sections.map((s) => (0, lit_1.html) `<div class="icure-form">${s.fields.map((fieldOrGroup) => renderFieldGroupOrSubform(fieldOrGroup, 3))}</div>`);
    };
    return (0, lit_1.html) ` ${renderForm(form)} `;
};
exports.render = render;
//# sourceMappingURL=form.js.map