"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fields_1 = require("../../icure-form/fields");
const icure_button_group_1 = require("../../icure-button-group");
const icure_date_picker_1 = require("../../icure-date-picker");
const icure_dropdown_field_1 = require("../../icure-dropdown-field");
const icure_form_1 = require("../../icure-form");
const icure_label_1 = require("../../icure-label");
const icure_text_field_1 = require("../../icure-text-field");
// @ts-ignore
const lit_1 = require("lit");
const kendoCss = (0, lit_1.css) `.icure-text-field,
.icure-button-group {
  padding-top: 16px;
  width: 100%;
}
.icure-text-field .icure-label,
.icure-button-group .icure-label {
  color: #656565;
  font-size: 14px;
  font-weight: 500;
  display: inline !important;
  white-space: initial !important;
  overflow: initial !important;
  word-wrap: normal !important;
  word-break: break-word;
}
.icure-text-field > .icure-input,
.icure-button-group > .icure-input {
  flex: 1 1 auto;
  width: auto;
}
.icure-text-field > .icure-label,
.icure-button-group > .icure-label {
  transform: translate(0, 0) scale(1);
}
.icure-text-field .icure-input,
.icure-text-field .input-container,
.icure-button-group .icure-input,
.icure-button-group .input-container {
  border-radius: 2px;
  padding: 0 8px;
  width: 100%;
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  outline: 0;
  font: inherit;
  font-size: 14px;
  line-height: 1.4em;
  display: flex;
  align-items: center;
  vertical-align: middle;
  position: relative;
  -webkit-appearance: none;
  background-color: #ffffff;
  border-color: rgba(0, 0, 0, 0.08);
  color: #656565;
  box-sizing: border-box;
}
.icure-text-field .icure-input:focus, .icure-text-field .icure-input:focus-within,
.icure-text-field .input-container:focus,
.icure-text-field .input-container:focus-within,
.icure-button-group .icure-input:focus,
.icure-button-group .icure-input:focus-within,
.icure-button-group .input-container:focus,
.icure-button-group .input-container:focus-within {
  box-shadow: 0 2px 2px 1px rgba(0, 0, 0, 0.06);
}
.icure-text-field .icure-input:hover,
.icure-text-field .input-container:hover,
.icure-button-group .icure-input:hover,
.icure-button-group .input-container:hover {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: none;
}
.icure-text-field .icure-input:hover:focus, .icure-text-field .icure-input:hover:focus-within,
.icure-text-field .input-container:hover:focus,
.icure-text-field .input-container:hover:focus-within,
.icure-button-group .icure-input:hover:focus,
.icure-button-group .icure-input:hover:focus-within,
.icure-button-group .input-container:hover:focus,
.icure-button-group .input-container:hover:focus-within {
  box-shadow: 0 2px 2px 1px rgba(0, 0, 0, 0.06);
}
.icure-text-field .icure-input .ProseMirror,
.icure-text-field .input-container .ProseMirror,
.icure-button-group .icure-input .ProseMirror,
.icure-button-group .input-container .ProseMirror {
  padding: 0;
  font-size: 14px;
  line-height: 1.4em;
  color: #656565;
}
.icure-text-field .icure-input .ProseMirror .date,
.icure-text-field .input-container .ProseMirror .date,
.icure-button-group .icure-input .ProseMirror .date,
.icure-button-group .input-container .ProseMirror .date {
  padding: 1px;
}
.icure-text-field .icure-input .ProseMirror .time,
.icure-text-field .input-container .ProseMirror .time,
.icure-button-group .icure-input .ProseMirror .time,
.icure-button-group .input-container .ProseMirror .time {
  padding: 1px;
}
.icure-text-field .icure-input .ProseMirror:focus .focused,
.icure-text-field .input-container .ProseMirror:focus .focused,
.icure-button-group .icure-input .ProseMirror:focus .focused,
.icure-button-group .input-container .ProseMirror:focus .focused {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
  border-color: rgba(0, 0, 0, 0.1);
}
.icure-text-field .icure-input > svg,
.icure-text-field .input-container > svg,
.icure-button-group .icure-input > svg,
.icure-button-group .input-container > svg {
  opacity: 0.5;
}
.icure-text-field .icure-input > svg path,
.icure-text-field .input-container > svg path,
.icure-button-group .icure-input > svg path,
.icure-button-group .input-container > svg path {
  fill: #656565;
}
.icure-text-field .icure-input .extra,
.icure-text-field .input-container .extra,
.icure-button-group .icure-input .extra,
.icure-button-group .input-container .extra {
  height: 20px;
}
.icure-text-field .icure-input .extra > .info,
.icure-text-field .input-container .extra > .info,
.icure-button-group .icure-input .extra > .info,
.icure-button-group .input-container .extra > .info {
  color: #656565;
  opacity: 0.5;
}
.icure-text-field .icure-input .extra .buttons-container .btn svg path,
.icure-text-field .input-container .extra .buttons-container .btn svg path,
.icure-button-group .icure-input .extra .buttons-container .btn svg path,
.icure-button-group .input-container .extra .buttons-container .btn svg path {
  fill: #656565;
  opacity: 0.5;
}
.icure-text-field .icure-input .extra .buttons-container .btn svg path:hover,
.icure-text-field .input-container .extra .buttons-container .btn svg path:hover,
.icure-button-group .icure-input .extra .buttons-container .btn svg path:hover,
.icure-button-group .input-container .extra .buttons-container .btn svg path:hover {
  fill: #656565;
  opacity: 1;
}
.icure-text-field .icure-input .extra > .options > .selected,
.icure-text-field .input-container .extra > .options > .selected,
.icure-button-group .icure-input .extra > .options > .selected,
.icure-button-group .input-container .extra > .options > .selected {
  color: white;
  background-color: #06a070;
  border-radius: 0 !important;
}

input[type=radio] {
  margin-top: -1px;
  vertical-align: middle;
}

.icure-checkbox:checked {
  accent-color: #06a070;
}

app-date-picker {
  --app-primary: #06a070;
  --app-hover: #06a070;
  --app-selected-hover: #06a070;
}

.icure-button-group > .icure-label {
  z-index: 1;
  pointer-events: none;
  line-height: 1.4em;
  cursor: text;
  font-size: 14px;
  top: calc(1.4em + 1px);
  left: 9px;
  color: #656565;
  align-items: center;
  height: 28px;
  max-width: 85%;
  min-width: 0;
}
.icure-button-group > .icure-label > span {
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding-right: 8px;
}
.icure-button-group > div {
  display: grid;
}
.icure-button-group > div > div {
  display: flex;
  align-items: center;
}
.icure-button-group > div > div > .icure-button-group-label {
  z-index: 1;
  line-height: 1.4em;
  cursor: text;
  font-size: 14px;
  top: calc(1.4em + 1px);
  left: 9px;
  transition: transform 0.2s ease-out, color 0.2s ease-out;
  color: #656565;
  display: flex;
  align-items: center;
  height: 28px;
  max-width: 85%;
  min-width: 0;
}
.icure-button-group > div > div > .icure-button-group-label > span {
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding-right: 8px;
}
.icure-button-group > .icure-input {
  flex: 1 1 auto;
  width: auto;
}`;
const metadata_buttons_bar_1 = require("../../common/metadata-buttons-bar");
const icure_button_1 = require("../../icure-button");
const form_selection_button_1 = require("../../icure-form/renderer/form/form-selection-button");
class KendoIcureButtonGroup extends icure_button_group_1.IcureButtonGroup {
    static get styles() {
        return [...icure_button_group_1.IcureButtonGroup.styles, kendoCss];
    }
}
class KendoIcureDatePickerField extends icure_date_picker_1.IcureDatePickerField {
    static get styles() {
        return [...icure_date_picker_1.IcureDatePickerField.styles, kendoCss];
    }
}
class KendoIcureDropdownField extends icure_dropdown_field_1.IcureDropdownField {
    static get styles() {
        return [...icure_dropdown_field_1.IcureDropdownField.styles, kendoCss];
    }
}
class KendoIcureForm extends icure_form_1.IcureForm {
    static get styles() {
        return [...icure_form_1.IcureForm.styles, kendoCss];
    }
}
class KendoIcureLabel extends icure_label_1.IcureLabel {
    static get styles() {
        return [...icure_label_1.IcureLabel.styles, kendoCss];
    }
}
class KendoIcureButton extends icure_button_1.IcureButton {
    static get styles() {
        return [...icure_button_1.IcureButton.styles, kendoCss];
    }
}
class KendoIcureTextField extends icure_text_field_1.IcureTextField {
    static get styles() {
        return [...icure_text_field_1.IcureTextField.styles, kendoCss];
    }
}
class KendoLabel extends fields_1.Label {
    static get styles() {
        return [...fields_1.Label.styles, kendoCss];
    }
}
class KendoMetadataButtonBar extends metadata_buttons_bar_1.MetadataButtonBar {
    static get styles() {
        return [...metadata_buttons_bar_1.MetadataButtonBar.styles, kendoCss];
    }
}
class KendoButton extends fields_1.Button {
    static get styles() {
        return [...fields_1.Button.styles, kendoCss];
    }
}
customElements.define('icure-metadata-buttons-bar', KendoMetadataButtonBar);
customElements.define('icure-metadata-buttons-bar-wrapper', icure_text_field_1.MetadataButtonBarWrapper);
customElements.define('icure-form-checkbox', fields_1.CheckBox);
customElements.define('icure-form-date-picker', fields_1.DatePicker);
customElements.define('icure-form-date-time-picker', fields_1.DateTimePicker);
customElements.define('icure-form-dropdown-field', fields_1.DropdownField);
customElements.define('icure-button-group', KendoIcureButtonGroup);
customElements.define('icure-date-picker-field', KendoIcureDatePickerField);
customElements.define('icure-dropdown-field', KendoIcureDropdownField);
customElements.define('icure-form', KendoIcureForm);
customElements.define('icure-label', KendoIcureLabel);
customElements.define('icure-button', KendoIcureButton);
customElements.define('icure-text-field', KendoIcureTextField);
customElements.define('icure-form-items-list-field', fields_1.ItemsListField);
customElements.define('icure-form-label', KendoLabel);
customElements.define('icure-form-button', KendoButton);
customElements.define('icure-form-measure-field', fields_1.MeasureField);
customElements.define('icure-form-number-field', fields_1.NumberField);
customElements.define('icure-form-radio-button', fields_1.RadioButton);
customElements.define('icure-form-text-field', fields_1.TextField);
customElements.define('icure-form-time-picker', fields_1.TimePicker);
customElements.define('icure-form-token-field', fields_1.TokenField);
customElements.define('form-selection-button', form_selection_button_1.FormSelectionButton);
//# sourceMappingURL=index.js.map