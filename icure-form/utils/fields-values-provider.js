"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMetadataChangedProvider = exports.handleValueChangedProvider = exports.getValidationError = exports.makeMetadata = exports.fieldValuesProvider = exports.getRevisionsFilter = void 0;
const dates_1 = require("./dates");
function getRevisionsFilter(field) {
    return (id, history) => history
        .filter((fmd) => { var _a, _b; return (((_a = field.tags) === null || _a === void 0 ? void 0 : _a.length) ? field.tags.every((t) => { var _a, _b; return (_b = (_a = fmd === null || fmd === void 0 ? void 0 : fmd.value) === null || _a === void 0 ? void 0 : _a.tags) === null || _b === void 0 ? void 0 : _b.some((tt) => tt.id === t); }) : ((_b = fmd === null || fmd === void 0 ? void 0 : fmd.value) === null || _b === void 0 ? void 0 : _b.label) === field.label()); })
        .map((fmd) => fmd.revision)
        .filter((r) => r !== undefined); //null is used as a new revision indicator
}
exports.getRevisionsFilter = getRevisionsFilter;
const fieldValuesProvider = (formValuesContainer, field) => () => formValuesContainer.getValues(getRevisionsFilter(field));
exports.fieldValuesProvider = fieldValuesProvider;
function makeMetadata(field, owner, index) {
    var _a;
    return {
        label: field.label(),
        valueDate: (0, dates_1.dateToFuzzyDate)(new Date()),
        owner: owner,
        index: index,
        tags: (_a = field.tags) === null || _a === void 0 ? void 0 : _a.map((t) => ({
            id: t,
            label: {},
        })),
    };
}
exports.makeMetadata = makeMetadata;
const getValidationError = (formsValueContainer, field) => () => {
    var _a;
    const validators = (_a = formsValueContainer === null || formsValueContainer === void 0 ? void 0 : formsValueContainer.getValidationErrors()) !== null && _a !== void 0 ? _a : [];
    return validators.filter(([metadata]) => metadata.label === (field === null || field === void 0 ? void 0 : field.label()));
};
exports.getValidationError = getValidationError;
const handleValueChangedProvider = (formsValueContainer, field, owner) => {
    return (label, language, value, id) => {
        if (formsValueContainer) {
            formsValueContainer.setValue(label, language, value, id, !id && field // If the id is not set, we are creating a new value. In this case, we set the metadata.
                ? makeMetadata(field, owner)
                : undefined);
        }
    };
};
exports.handleValueChangedProvider = handleValueChangedProvider;
const handleMetadataChangedProvider = (formsValueContainer) => {
    return (metadata, id) => {
        if (formsValueContainer) {
            formsValueContainer.setMetadata(metadata, id);
        }
    };
};
exports.handleMetadataChangedProvider = handleMetadataChangedProvider;
//# sourceMappingURL=fields-values-provider.js.map