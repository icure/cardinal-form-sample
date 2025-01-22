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
exports.TokenField = void 0;
const lit_1 = require("lit");
const common_1 = require("../../../common");
const decorators_js_1 = require("lit/decorators.js");
class TokenField extends common_1.Field {
    constructor() {
        super(...arguments);
        this.multiline = false;
        this.suggestionProvider = () => __awaiter(this, void 0, void 0, function* () { return []; });
        this.lines = 1;
    }
    render() {
        return (0, lit_1.html) `<icure-text-field
			.readonly="${this.readonly}"
			label="${this.label}"
			.multiline="${this.multiline}"
			.lines="${this.lines}"
			.displayedLabels="${this.displayedLabels}"
			.defaultLanguage="${this.defaultLanguage}"
			schema="tokens-list"
			.handleMetadataChanged=${this.handleMetadataChanged}
			.handleValueChanged=${this.handleValueChanged}
			.metadataProvider=${this.metadataProvider}
			.ownersProvider=${this.ownersProvider}
			.suggestionProvider=${this.suggestionProvider}
			.translationProvider=${this.translationProvider}
			.validationErrorsProvider=${this.validationErrorsProvider}
			.valueProvider=${this.valueProvider}
		></icure-text-field>`;
    }
}
exports.TokenField = TokenField;
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Object)
], TokenField.prototype, "multiline", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Function)
], TokenField.prototype, "suggestionProvider", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Object)
], TokenField.prototype, "lines", void 0);
//# sourceMappingURL=token-field.js.map