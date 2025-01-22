"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractValues = exports.extractSingleValue = exports.handleSingleMetadataChanged = exports.handleSingleValueChanged = exports.singleValueProvider = void 0;
const singleValueProvider = (valueProvider, id) => valueProvider &&
    (() => id && valueProvider
        ? {
            [id]: valueProvider()[id],
        }
        : {});
exports.singleValueProvider = singleValueProvider;
const handleSingleValueChanged = (handleValueChanged, id) => handleValueChanged && ((label, language, value) => handleValueChanged === null || handleValueChanged === void 0 ? void 0 : handleValueChanged(label, language, value, id));
exports.handleSingleValueChanged = handleSingleValueChanged;
const handleSingleMetadataChanged = (handleMetadataChanged, id) => handleMetadataChanged && ((metadata) => handleMetadataChanged === null || handleMetadataChanged === void 0 ? void 0 : handleMetadataChanged(metadata, id));
exports.handleSingleMetadataChanged = handleSingleMetadataChanged;
const extractSingleValue = (value, id) => {
    if (!value) {
        return [undefined, undefined];
    }
    if (id && value[id]) {
        return [id, value[id]];
    }
    else {
        if (Object.keys(value).length > 1) {
            console.log('Warning: multiple values found for a single value field');
        }
        const id = Object.keys(value)[0];
        return [id, value[id]];
    }
};
exports.extractSingleValue = extractSingleValue;
const extractValues = (value, metadataProvider, id) => {
    if (!value) {
        return [];
    }
    if (id && value[id]) {
        return [[id, value[id]]];
    }
    else {
        return Object.entries(value).sort(([id1, v1], [id2, v2]) => {
            var _a, _b, _c, _d, _e, _f;
            const m1 = metadataProvider(id1, v1[0].revision ? [v1[0].revision] : [null])[id1];
            const m2 = metadataProvider(id2, v2[0].revision ? [v2[0].revision] : [null])[id2];
            return ((_c = (_b = (_a = m1 === null || m1 === void 0 ? void 0 : m1[0]) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.index) !== null && _c !== void 0 ? _c : 0) - ((_f = (_e = (_d = m2 === null || m2 === void 0 ? void 0 : m2[0]) === null || _d === void 0 ? void 0 : _d.value) === null || _e === void 0 ? void 0 : _e.index) !== null && _f !== void 0 ? _f : 0);
        });
    }
};
exports.extractValues = extractValues;
//# sourceMappingURL=index.js.map