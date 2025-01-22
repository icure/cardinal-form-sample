"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatePicker = void 0;
const lit_1 = require("lit");
const utils_1 = require("../utils");
const common_1 = require("../../../common");
class DatePicker extends common_1.Field {
    render() {
        var _a;
        const versionedValues = (_a = this.valueProvider) === null || _a === void 0 ? void 0 : _a.call(this);
        return (versionedValues && Object.keys(versionedValues).length ? Object.keys(versionedValues) : [undefined]).map((id) => {
            return (0, lit_1.html) `<icure-date-picker-field
				.readonly="${this.readonly}"
				.displayMetadata="${this.displayMetadata}"
				label="${this.label}"
				.displayedLabels="${this.displayedLabels}"
				.defaultLanguage="${this.defaultLanguage}"
				.languages="${this.languages}"
				schema="decimal"
				.ownersProvider=${this.ownersProvider}
				.translationProvider=${this.translationProvider}
				.valueProvider=${(0, utils_1.singleValueProvider)(this.valueProvider, id)}
				.validationErrorsProvider=${this.validationErrorsProvider}
				.metadataProvider=${this.metadataProvider}
				.handleValueChanged=${(0, utils_1.handleSingleValueChanged)(this.handleValueChanged, id)}
				.handleMetadataChanged=${(0, utils_1.handleSingleMetadataChanged)(this.handleMetadataChanged, id)}
			></icure-date-picker-field>`;
        });
    }
}
exports.DatePicker = DatePicker;
//# sourceMappingURL=date-picker.js.map