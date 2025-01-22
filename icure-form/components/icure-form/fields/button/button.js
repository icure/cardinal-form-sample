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
exports.Button = void 0;
const lit_1 = require("lit");
const decorators_js_1 = require("lit/decorators.js");
require("../../../icure-label");
class Button extends lit_1.LitElement {
    constructor() {
        super(...arguments);
        this.visible = true;
        this.defaultLanguage = 'en';
        this.translationProvider = (language, text) => text;
        this.actionListener = () => undefined;
    }
    //override
    static get styles() {
        return [
            (0, lit_1.css) `
				:host {
				}
			`,
        ];
    }
    render() {
        return (0, lit_1.html) `<icure-button
			.visible="${this.visible}"
			label="${this.label}"
			.translationProvider="${this.translationProvider}"
			.defaultLanguage="${this.defaultLanguage}"
			.actionListener="${this.actionListener}"
			.event="${this.event}"
			.payload="${this.payload}"
		></icure-button>`;
    }
}
exports.Button = Button;
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", String)
], Button.prototype, "label", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Object)
], Button.prototype, "visible", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Object)
], Button.prototype, "defaultLanguage", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Function)
], Button.prototype, "translationProvider", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Function)
], Button.prototype, "actionListener", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", String)
], Button.prototype, "event", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Object)
], Button.prototype, "payload", void 0);
//# sourceMappingURL=button.js.map