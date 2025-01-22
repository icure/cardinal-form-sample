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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsListField = void 0;
const lit_1 = require("lit");
const common_1 = require("../../../common");
const decorators_js_1 = require("lit/decorators.js");
class ItemsListField extends common_1.Field {
    constructor() {
        super(...arguments);
        this.multiline = false;
        this.lines = 1;
    }
    render() {
        return (0, lit_1.html) `<icure-text-field
			schema="items-list"
			.readonly="${this.readonly}"
			label="${this.label}"
			.multiline="${this.multiline}"
			.lines="${this.lines}"
			.displayedLabels="${this.displayedLabels}"
			.defaultLanguage="${this.defaultLanguage}"
			.languages="${this.languages}"
			.ownersProvider=${this.ownersProvider}
			.valueProvider=${this.valueProvider}
			.validationErrorsProvider=${this.validationErrorsProvider}
			.metadataProvider=${this.metadataProvider}
			.handleValueChanged=${this.handleValueChanged}
			.translationProvider=${this.translationProvider}
			.handleMetadataChanged=${this.handleMetadataChanged}
		></icure-text-field>`;
    }
}
exports.ItemsListField = ItemsListField;
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Object)
], ItemsListField.prototype, "multiline", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Object)
], ItemsListField.prototype, "lines", void 0);
//# sourceMappingURL=items-list-field.js.map