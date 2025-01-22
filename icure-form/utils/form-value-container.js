"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeFormDefaultValues = void 0;
const fields_values_provider_1 = require("./fields-values-provider");
const computeFormDefaultValues = (formValuesContainer, form, language, owner) => {
    var _a;
    const extractDefaultValues = (fgs, language) => fgs.reduce((acc, fg) => {
        var _a, _b, _c;
        if (fg.clazz === 'group' && ((_a = fg.fields) === null || _a === void 0 ? void 0 : _a.length)) {
            return [...acc, ...extractDefaultValues(fg.fields, language)];
        }
        else if (fg.clazz === 'field') {
            if ((_b = fg.computedProperties) === null || _b === void 0 ? void 0 : _b.defaultValue) {
                const value = formValuesContainer === null || formValuesContainer === void 0 ? void 0 : formValuesContainer.compute((_c = fg.computedProperties) === null || _c === void 0 ? void 0 : _c.defaultValue);
                if (value !== undefined) {
                    const lng = language !== null && language !== void 0 ? language : 'en';
                    if (!value.content[lng] && value.content['*']) {
                        value.content[lng] = value.content['*'];
                    }
                    if (value.content[lng]) {
                        return [...acc, [value, (0, fields_values_provider_1.makeMetadata)(fg, owner)]];
                    }
                }
            }
        }
        return acc;
    }, []);
    return ((_a = form === null || form === void 0 ? void 0 : form.sections.reduce((acc, section) => {
        var _a;
        return [...acc, ...extractDefaultValues((_a = section.fields) !== null && _a !== void 0 ? _a : [], language)];
    }, [])) !== null && _a !== void 0 ? _a : []);
};
exports.computeFormDefaultValues = computeFormDefaultValues;
//# sourceMappingURL=form-value-container.js.map