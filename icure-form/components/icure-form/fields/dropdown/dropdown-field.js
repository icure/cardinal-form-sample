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
exports.DropdownField = void 0;
const lit_1 = require("lit");
const decorators_js_1 = require("lit/decorators.js");
const common_1 = require("../../../common");
const utils_1 = require("../utils");
class DropdownField extends common_1.Field {
    constructor() {
        super(...arguments);
        this.optionsProvider = () => __awaiter(this, void 0, void 0, function* () { return []; });
    }
    render() {
        var _a;
        const versionedValues = (_a = this.valueProvider) === null || _a === void 0 ? void 0 : _a.call(this);
        return (versionedValues && Object.keys(versionedValues).length ? Object.keys(versionedValues) : [undefined]).map((id) => {
            return (0, lit_1.html) `
				<icure-dropdown-field
					.readonly="${this.readonly}"
					.displayMetadata="${this.displayMetadata}"
					.translate="${this.translate}"
					label="${this.label}"
					.displayedLabels="${this.displayedLabels}"
					.defaultLanguage="${this.defaultLanguage}"
					.languages="${this.languages}"
					.valueProvider=${(0, utils_1.singleValueProvider)(this.valueProvider, id)}
					.validationErrorsProvider=${this.validationErrorsProvider}
					.metadataProvider=${this.metadataProvider}
					.ownersProvider=${this.ownersProvider}
					.handleValueChanged=${(0, utils_1.handleSingleValueChanged)(this.handleValueChanged, id)}
					.handleMetadataChanged=${(0, utils_1.handleSingleMetadataChanged)(this.handleMetadataChanged, id)}
					.optionsProvider=${this.optionsProvider}
					.translationProvider=${this.translationProvider}
				></icure-dropdown-field>
			`;
        });
    }
}
exports.DropdownField = DropdownField;
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Function)
], DropdownField.prototype, "optionsProvider", void 0);
//# sourceMappingURL=dropdown-field.js.map