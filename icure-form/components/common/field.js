"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.Field = void 0;
const decorators_js_1 = require("lit/decorators.js");
const lit_1 = require("lit");
/**
 * Base class for all fields.
 */
class Field extends lit_1.LitElement {
    constructor() {
        super(...arguments);
        /**
         * The labels of the field. These are the labels that will be displayed in the UI.
         * Several labels can be displayed at once
         */
        this.displayedLabels = {};
        /**
         * Translate labels and options
         */
        this.translate = true;
        /**
         * Iso code of the default language
         */
        this.defaultLanguage = 'en';
        /**
         * Iso code and names of the supported languages
         */
        this.languages = {};
        this.translationProvider = (language, text) => text;
        /**
         * Provides the value of the field.
         */
        this.valueProvider = undefined;
        this.validationErrorsProvider = undefined;
        this.ownersProvider = () => __awaiter(this, void 0, void 0, function* () { return []; });
        this.metadataProvider = undefined;
        this.handleValueChanged = undefined;
        this.handleMetadataChanged = undefined;
        this.visible = true;
        this.readonly = false;
        this.displayMetadata = false;
        this.selectedLanguage = undefined;
    }
    language() {
        var _a, _b;
        return (_b = (this.translate ? (_a = this.selectedLanguage) !== null && _a !== void 0 ? _a : this.defaultLanguage : this.defaultLanguage)) !== null && _b !== void 0 ? _b : 'en';
    }
}
exports.Field = Field;
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", String)
], Field.prototype, "label", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Object)
], Field.prototype, "displayedLabels", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Object)
], Field.prototype, "styleOptions", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Object)
], Field.prototype, "translate", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Object)
], Field.prototype, "defaultLanguage", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Object)
], Field.prototype, "languages", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Function)
], Field.prototype, "translationProvider", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Function)
], Field.prototype, "valueProvider", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Function)
], Field.prototype, "validationErrorsProvider", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Function)
], Field.prototype, "ownersProvider", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Function)
], Field.prototype, "metadataProvider", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Function)
], Field.prototype, "handleValueChanged", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Function)
], Field.prototype, "handleMetadataChanged", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Object)
], Field.prototype, "visible", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Object)
], Field.prototype, "readonly", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Object)
], Field.prototype, "displayMetadata", void 0);
__decorate([
    (0, decorators_js_1.state)(),
    __metadata("design:type", String)
], Field.prototype, "selectedLanguage", void 0);
__decorate([
    (0, decorators_js_1.state)(),
    __metadata("design:type", String)
], Field.prototype, "selectedRevision", void 0);
//# sourceMappingURL=field.js.map