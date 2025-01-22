"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeCode = exports.normalizeCodes = exports.filterAndSortOptionsFromFieldDefinition = exports.sortSuggestions = exports.sortCodes = exports.optionMapper = void 0;
const utils_1 = require("../components/common/utils");
const cardinal_sdk_1 = require("@icure/cardinal-sdk");
/**
 * Maps the options defined in a field into a list of codes
 *
 * @param language
 * @param field
 * @param translationProvider
 */
const optionMapper = (language, field, translationProvider) => {
    var _a;
    return Object.keys((_a = field === null || field === void 0 ? void 0 : field.options) !== null && _a !== void 0 ? _a : []).map((optionKey) => {
        var _a, _b;
        const text = (_b = (_a = field === null || field === void 0 ? void 0 : field.options) === null || _a === void 0 ? void 0 : _a[optionKey]) !== null && _b !== void 0 ? _b : '';
        return {
            id: optionKey,
            label: { [language]: translationProvider ? translationProvider(language, text) : text },
        };
    });
};
exports.optionMapper = optionMapper;
const sortCodes = (codes, language, sortOptions) => (sortOptions === null || sortOptions === void 0 ? void 0 : sortOptions.sort) && (sortOptions === null || sortOptions === void 0 ? void 0 : sortOptions.sort) !== 'natural'
    ? codes.sort((0, utils_1.defaultCodesComparator)(language, (sortOptions === null || sortOptions === void 0 ? void 0 : sortOptions.sort) === 'asc', (sortOptions === null || sortOptions === void 0 ? void 0 : sortOptions.promotions) ? (0, utils_1.makePromoter)(sortOptions.promotions.split(/ ?, ?/)) : utils_1.defaultCodePromoter))
    : codes.sort((0, utils_1.naturalCodesComparator)((sortOptions === null || sortOptions === void 0 ? void 0 : sortOptions.promotions) ? (0, utils_1.makePromoter)(sortOptions.promotions.split(/ ?, ?/)) : utils_1.defaultCodePromoter));
exports.sortCodes = sortCodes;
const sortSuggestions = (codes, language, sortOptions) => ((sortOptions === null || sortOptions === void 0 ? void 0 : sortOptions.sort) && (sortOptions === null || sortOptions === void 0 ? void 0 : sortOptions.sort) !== 'natural'
    ? codes.sort((0, utils_1.defaultCodesComparator)(language, (sortOptions === null || sortOptions === void 0 ? void 0 : sortOptions.sort) === 'asc', (sortOptions === null || sortOptions === void 0 ? void 0 : sortOptions.promotions) ? (0, utils_1.makePromoter)(sortOptions.promotions.split(/ ?, ?/)) : utils_1.defaultCodePromoter))
    : codes.sort((0, utils_1.naturalCodesComparator)((sortOptions === null || sortOptions === void 0 ? void 0 : sortOptions.promotions) ? (0, utils_1.makePromoter)(sortOptions.promotions.split(/ ?, ?/)) : utils_1.defaultCodePromoter))).map((c) => { var _a; return ({ id: c.id, label: c.label, text: (_a = c.label[language]) !== null && _a !== void 0 ? _a : '', terms: [] }); });
exports.sortSuggestions = sortSuggestions;
const filterAndSortOptionsFromFieldDefinition = (language, fg, translationProvider, terms) => Promise.resolve((0, exports.sortCodes)((0, exports.optionMapper)(language, fg, translationProvider).filter((x) => (terms !== null && terms !== void 0 ? terms : []).map((st) => st.toLowerCase()).every((st) => x.label[language].toLowerCase().includes(st))), language, fg.sortOptions));
exports.filterAndSortOptionsFromFieldDefinition = filterAndSortOptionsFromFieldDefinition;
const normalizeCodes = (codes) => codes.map((c) => normalizeCode(c));
exports.normalizeCodes = normalizeCodes;
/**
 * Normalizes the code's four main fields (type, code, version and id). The first three are considered to be
 * authoritative, while the id is a pure function of them. The authoritative fields are filled in from the id if
 * missing, or the version is set to '1' if it is the only missing authoritative field. The id is then rederived from
 * the three fields.
 * @param code The code to normalize.
 * @returns A shallow copy of the input with its type, code, version and id normalized.
 */
function normalizeCode(code) {
    code = new cardinal_sdk_1.CodeStub(code);
    if (code.type && code.code && code.version) {
        // do nothing, we all have the authoritative fields we need
    }
    else if (code.id) {
        // reconstruct the authoritative fields from the id
        const [idType, idCode, idVersion, ...idRest] = code.id.split('|');
        if (idType && idCode && idVersion && idRest.length === 0) {
            if (!code.type)
                code.type = idType;
            if (!code.code)
                code.code = idCode;
            if (!code.version)
                code.version = idVersion;
        }
        else {
            throw new Error(`attempted to normalize from a malformed code id "${code.id}"`);
        }
    }
    else if (code.type && code.code && !code.version) {
        // we can provide a default value
        code.version = '1';
    }
    else {
        throw new Error('could not reconstruct the code');
    }
    // Recompute the id to ensure that it matches the reconstructed code.
    code.id = `${code.type}|${code.code}|${code.version}`;
    return code;
}
exports.normalizeCode = normalizeCode;
//# sourceMappingURL=code-utils.js.map