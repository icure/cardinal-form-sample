"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePrimitive = exports.normalizeUnit = void 0;
const dates_1 = require("./dates");
const normalizeUnit = (value, unit) => {
    if (!unit) {
        return value;
    }
    switch (unit) {
        case 'kg':
            return value;
        case 'g':
            return value / 1000;
        case 'mg':
            return value / 1000000;
        case 'l':
            return value;
        case 'ml':
            return value / 1000;
        case 'cl':
            return value / 100;
        case 'm':
            return value;
        case 'cm':
            return value / 100;
        case 'mm':
            return value / 1000;
        case 's':
            return value;
        case 'min':
            return value * 60;
        case 'h':
            return value * 60 * 60;
        case 'd':
            return value * 60 * 60 * 24;
        case 'week':
            return value * 60 * 60 * 24 * 7;
        case 'month':
            return value * 60 * 60 * 24 * 30;
        case 'year':
            return value * 60 * 60 * 24 * 365.25;
    }
    return value;
};
exports.normalizeUnit = normalizeUnit;
const parsePrimitive = (value) => {
    switch (value.type) {
        case 'measure':
            const normalizedValue = value.value ? (0, exports.normalizeUnit)(+value.value, value.unit) : undefined;
            return normalizedValue;
        case 'datetime':
            return (0, dates_1.anyDateToDate)(value.value);
        case 'timestamp':
            return (0, dates_1.anyDateToDate)(value.value);
        case 'number':
            return +value.value;
        case 'boolean':
            return value.value;
        case 'string':
            return value.value;
        case 'compound':
            return Object.values(value.value)
                .map(exports.parsePrimitive)
                .filter((x) => x !== undefined);
    }
};
exports.parsePrimitive = parsePrimitive;
//# sourceMappingURL=primitive.js.map