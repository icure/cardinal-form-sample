"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeStubToCode = exports.contentToPrimitiveType = exports.primitiveTypeToContent = exports.isServiceContentEqual = exports.isContentEqual = exports.isServiceEqual = exports.areCodesEqual = exports.isCodeEqual = void 0;
const cardinal_sdk_1 = require("@icure/cardinal-sdk");
function isCodeEqual(c1, c2) {
    var _a, _b;
    const idParts1 = (_a = c1.id) === null || _a === void 0 ? void 0 : _a.split('|');
    const idParts2 = (_b = c2.id) === null || _b === void 0 ? void 0 : _b.split('|');
    const type1 = c1.type || (idParts1 === null || idParts1 === void 0 ? void 0 : idParts1[0]);
    const type2 = c2.type || (idParts2 === null || idParts2 === void 0 ? void 0 : idParts2[0]);
    const code1 = c1.code || (idParts1 === null || idParts1 === void 0 ? void 0 : idParts1[1]);
    const code2 = c2.code || (idParts2 === null || idParts2 === void 0 ? void 0 : idParts2[1]);
    const version1 = c1.version || (idParts1 === null || idParts1 === void 0 ? void 0 : idParts1[2]);
    const version2 = c2.version || (idParts2 === null || idParts2 === void 0 ? void 0 : idParts2[2]);
    return type1 === type2 && code1 === code2 && version1 === version2;
}
exports.isCodeEqual = isCodeEqual;
function areCodesEqual(c1s, c2s) {
    return c1s.every((c1) => c2s.some((c2) => isCodeEqual(c1, c2)) || false) && c2s.every((c2) => c1s.some((c1) => isCodeEqual(c1, c2)) || false);
}
exports.areCodesEqual = areCodesEqual;
function isServiceEqual(svc1, svc2) {
    return svc1.id === svc2.id && svc1.valueDate === svc2.valueDate && areCodesEqual(svc1.codes || [], svc2.codes || []) && isServiceContentEqual(svc1.content || {}, svc2.content || {});
}
exports.isServiceEqual = isServiceEqual;
function isContentEqual(content1, content2) {
    var _a, _b;
    if (!content1 && !content2) {
        return true;
    }
    if (!content1 || !content2) {
        return false;
    }
    return (((!content1.binaryValue && !content2.binaryValue) || content1.binaryValue === content2.binaryValue) &&
        (((content1.booleanValue === null || content1.booleanValue === undefined) && (content2.booleanValue === null || content2.booleanValue === undefined)) ||
            content1.booleanValue === content2.booleanValue) &&
        ((!content1.documentId && !content2.documentId) || content1.documentId === content2.documentId) &&
        (((content1.fuzzyDateValue === null || content1.fuzzyDateValue === undefined) && (content2.fuzzyDateValue === null || content2.fuzzyDateValue === undefined)) ||
            content1.fuzzyDateValue === content2.fuzzyDateValue) &&
        ((!content1.instantValue && !content2.instantValue) || content1.instantValue === content2.instantValue) &&
        ((!content1.measureValue && !content2.measureValue) || content1.measureValue === content2.measureValue) &&
        ((!content1.medicationValue && !content2.medicationValue) || content1.medicationValue === content2.medicationValue) &&
        ((!content1.stringValue && !content2.stringValue) || content1.stringValue === content2.stringValue) &&
        (((content1.numberValue === null || content1.numberValue === undefined) && (content2.numberValue === null || content2.numberValue === undefined)) ||
            content1.numberValue === content2.numberValue) &&
        ((!content1.compoundValue && !content2.compoundValue) ||
            ((((_a = content1.compoundValue) === null || _a === void 0 ? void 0 : _a.every((s1) => { var _a; return (_a = content2.compoundValue) === null || _a === void 0 ? void 0 : _a.some((s2) => isServiceEqual(s1, s2)); })) || false) &&
                (((_b = content2 === null || content2 === void 0 ? void 0 : content2.compoundValue) === null || _b === void 0 ? void 0 : _b.every((s2) => { var _a; return (_a = content1 === null || content1 === void 0 ? void 0 : content1.compoundValue) === null || _a === void 0 ? void 0 : _a.some((s1) => isServiceEqual(s1, s2)); })) || false))));
}
exports.isContentEqual = isContentEqual;
function isServiceContentEqual(content1, content2) {
    return Object.keys(content1).reduce((isEqual, lng) => isEqual && isContentEqual(content1[lng], content2[lng]), true);
}
exports.isServiceContentEqual = isServiceContentEqual;
const primitiveTypeToContent = (language, value) => {
    return new cardinal_sdk_1.DecryptedContent(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (value.type === 'number' ? { numberValue: value.value } : {})), (value.type === 'measure'
        ? {
            measureValue: new cardinal_sdk_1.Measure({
                value: value.value,
                unit: value.unit,
            }),
        }
        : {})), (value.type === 'string' ? { stringValue: value.value } : {})), (value.type === 'datetime' ? { fuzzyDateValue: value.value } : {})), (value.type === 'boolean' ? { booleanValue: value.value } : {})), (value.type === 'timestamp' ? { instantValue: value.value } : {})), (value.type === 'compound'
        ? {
            compoundValue: Object.entries(value.value).map(([label, value]) => new cardinal_sdk_1.DecryptedService({
                label,
                content: {
                    [language]: (0, exports.primitiveTypeToContent)(language, value),
                },
            })),
        }
        : {})));
};
exports.primitiveTypeToContent = primitiveTypeToContent;
const contentToPrimitiveType = (language, content) => {
    var _a, _b, _c, _d, _e, _f;
    if (!content) {
        return undefined;
    }
    if (content.numberValue || content.numberValue === 0) {
        return { type: 'number', value: content.numberValue };
    }
    if (((_a = content.measureValue) === null || _a === void 0 ? void 0 : _a.value) || ((_b = content.measureValue) === null || _b === void 0 ? void 0 : _b.value) === 0 || ((_d = (_c = content.measureValue) === null || _c === void 0 ? void 0 : _c.unit) === null || _d === void 0 ? void 0 : _d.length)) {
        return { type: 'measure', value: (_e = content.measureValue) === null || _e === void 0 ? void 0 : _e.value, unit: (_f = content.measureValue) === null || _f === void 0 ? void 0 : _f.unit };
    }
    if (content.stringValue) {
        return { type: 'string', value: content.stringValue };
    }
    if (content.fuzzyDateValue) {
        return { type: 'datetime', value: content.fuzzyDateValue };
    }
    if (content.booleanValue) {
        return { type: 'boolean', value: content.booleanValue };
    }
    if (content.instantValue) {
        return { type: 'timestamp', value: content.instantValue };
    }
    if (content.compoundValue) {
        return {
            type: 'compound',
            value: content.compoundValue.reduce((acc, { label, content }) => {
                const primitiveValue = (0, exports.contentToPrimitiveType)(language, content === null || content === void 0 ? void 0 : content[language]);
                return label && primitiveValue ? Object.assign(Object.assign({}, acc), { [label]: primitiveValue }) : acc;
            }, {}),
        };
    }
    return undefined;
};
exports.contentToPrimitiveType = contentToPrimitiveType;
const codeStubToCode = (c) => {
    var _a, _b;
    return ({
        id: (_a = c.id) !== null && _a !== void 0 ? _a : `${c.type}|${c.code}|${c.version}`,
        label: (_b = c.label) !== null && _b !== void 0 ? _b : {},
    });
};
exports.codeStubToCode = codeStubToCode;
//# sourceMappingURL=icure-utils.js.map