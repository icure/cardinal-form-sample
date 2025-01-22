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
exports.FieldWithOptionsMixin = void 0;
const field_1 = require("./field");
const decorators_js_1 = require("lit/decorators.js");
const FieldWithOptionsMixin = (superClass) => {
    class FieldWithOptionsMixinClass extends superClass {
        constructor() {
            super(...arguments);
            this.optionsProvider = () => __awaiter(this, void 0, void 0, function* () { return []; });
            this.displayedOptions = [];
        }
        firstUpdated(_changedProperties) {
            super.firstUpdated(_changedProperties);
            this.optionsProvider(this.language()).then((options) => __awaiter(this, void 0, void 0, function* () {
                this.displayedOptions = options;
            }));
        }
    }
    __decorate([
        (0, decorators_js_1.property)(),
        __metadata("design:type", Function)
    ], FieldWithOptionsMixinClass.prototype, "optionsProvider", void 0);
    __decorate([
        (0, decorators_js_1.state)(),
        __metadata("design:type", Array)
    ], FieldWithOptionsMixinClass.prototype, "displayedOptions", void 0);
    // Cast return type to the superClass type passed in
    return FieldWithOptionsMixinClass;
};
exports.FieldWithOptionsMixin = FieldWithOptionsMixin;
//# sourceMappingURL=field-with-options.js.map