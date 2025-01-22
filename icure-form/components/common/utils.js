"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.naturalCodesComparator = exports.defaultCodesComparator = exports.defaultCodePromoter = exports.makePromoter = exports.generateLabel = exports.generateLabels = exports.getLabels = void 0;
const lit_1 = require("lit");
const getLabels = (field) => { var _a; return (_a = field.labels) !== null && _a !== void 0 ? _a : (field.shortLabel ? { float: field.shortLabel } : { float: field.label() }); };
exports.getLabels = getLabels;
function generateLabels(labels, language, translationProvider) {
    return Object.keys(labels).map((position) => generateLabel(labels[position], position, language, translationProvider));
}
exports.generateLabels = generateLabels;
function generateLabel(label, labelPosition, language, translationProvider = (language, text) => text) {
    switch (labelPosition) {
        case 'right':
        case 'left':
            return (0, lit_1.html) ` <label class="icure-label side above ${labelPosition}">${translationProvider(language, label)}</label> `;
        default:
            return (0, lit_1.html) ` <label class="icure-label ${labelPosition}">${translationProvider(language, label)}</label> `;
    }
}
exports.generateLabel = generateLabel;
const makePromoter = (promotions) => {
    const middle = promotions.indexOf('*');
    return (code) => {
        var _a;
        const index = promotions.indexOf((_a = code.id) !== null && _a !== void 0 ? _a : '');
        return index >= 0 ? index - middle : 0;
    };
};
exports.makePromoter = makePromoter;
const defaultCodePromoter = (code) => { var _a, _b, _c, _d, _e, _f; return ((_b = (_a = code === null || code === void 0 ? void 0 : code.label) === null || _a === void 0 ? void 0 : _a.en) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === 'other' ? 2 : ((_d = (_c = code === null || code === void 0 ? void 0 : code.label) === null || _c === void 0 ? void 0 : _c.en) === null || _d === void 0 ? void 0 : _d.toLowerCase()) === 'none' ? 1 : ((_f = (_e = code === null || code === void 0 ? void 0 : code.label) === null || _e === void 0 ? void 0 : _e.en) === null || _f === void 0 ? void 0 : _f.toLowerCase()) === 'empty' ? -1 : 0; };
exports.defaultCodePromoter = defaultCodePromoter;
const defaultCodesComparator = (language = 'en', ascending = true, codePromoter = exports.defaultCodePromoter) => (a, b) => {
    var _a, _b;
    const aPromoted = codePromoter(a);
    const bPromoted = codePromoter(b);
    if (aPromoted !== bPromoted) {
        return (aPromoted - bPromoted) * (ascending ? 1 : -1);
    }
    return (((_a = a === null || a === void 0 ? void 0 : a.label) === null || _a === void 0 ? void 0 : _a[language]) || '').localeCompare(((_b = b === null || b === void 0 ? void 0 : b.label) === null || _b === void 0 ? void 0 : _b[language]) || '') * (ascending ? 1 : -1);
};
exports.defaultCodesComparator = defaultCodesComparator;
const naturalCodesComparator = (codePromoter = exports.defaultCodePromoter) => (a, b) => {
    const aPromoted = codePromoter(a);
    const bPromoted = codePromoter(b);
    return aPromoted !== bPromoted ? -1 : aPromoted - bPromoted;
};
exports.naturalCodesComparator = naturalCodesComparator;
//# sourceMappingURL=utils.js.map