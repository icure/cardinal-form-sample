"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultTranslationProvider = exports.languageName = exports.languages = void 0;
exports.languages = {
    en: 'English',
    fr: 'French',
    es: 'Spanish',
    nl: 'Dutch',
    de: 'German',
};
const languageName = (iso) => exports.languages[iso] || iso;
exports.languageName = languageName;
const defaultTranslationProvider = (translations) => (language, text) => { var _a, _b, _c; return (_c = (_b = (_a = translations === null || translations === void 0 ? void 0 : translations.find((tt) => tt.language === language)) === null || _a === void 0 ? void 0 : _a.translations) === null || _b === void 0 ? void 0 : _b[text]) !== null && _c !== void 0 ? _c : text; };
exports.defaultTranslationProvider = defaultTranslationProvider;
//# sourceMappingURL=languages.js.map