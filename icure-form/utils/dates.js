"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentDateTime = exports.currentDate = exports.currentTime = exports.anyDateToFuzzyDate = exports.dateToFuzzyDate = exports.anyDateToDate = void 0;
const parse_1 = __importDefault(require("date-fns/parse"));
function anyDateToDate(dateOrEpochOrLongCalendar) {
    if (dateOrEpochOrLongCalendar === undefined) {
        return undefined;
    }
    if (dateOrEpochOrLongCalendar instanceof Date) {
        return anyDateToDate(+dateOrEpochOrLongCalendar);
    }
    if (!dateOrEpochOrLongCalendar && dateOrEpochOrLongCalendar !== 0) {
        return undefined;
    }
    if (dateOrEpochOrLongCalendar >= 18000101 && dateOrEpochOrLongCalendar < 25400000) {
        return (0, parse_1.default)('' + dateOrEpochOrLongCalendar, 'yyyyMMdd', new Date());
    }
    else if (dateOrEpochOrLongCalendar >= 18000101000000) {
        return (0, parse_1.default)('' + dateOrEpochOrLongCalendar, 'yyyyMMddHHmmss', new Date());
    }
    else {
        return new Date(dateOrEpochOrLongCalendar);
    }
}
exports.anyDateToDate = anyDateToDate;
function dateToFuzzyDate(date) {
    return parseInt(`${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}${date.getHours().toString().padStart(2, '0')}${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}${date.getSeconds().toString().padStart(2, '0')}`);
}
exports.dateToFuzzyDate = dateToFuzzyDate;
function anyDateToFuzzyDate(dateOrEpochOrLongCalendar) {
    const date = anyDateToDate(dateOrEpochOrLongCalendar);
    if (!date) {
        return undefined;
    }
    return dateToFuzzyDate(date);
}
exports.anyDateToFuzzyDate = anyDateToFuzzyDate;
function currentTime() {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
}
exports.currentTime = currentTime;
function currentDate() {
    const now = new Date();
    return `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
}
exports.currentDate = currentDate;
function currentDateTime() {
    return `${currentDate()} ${currentTime()}`;
}
exports.currentDateTime = currentDateTime;
//# sourceMappingURL=dates.js.map