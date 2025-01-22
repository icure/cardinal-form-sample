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
const ehrLiteCss = (0, lit_1.css) `.icure-text-field,
.icure-button-group {
  width: 100%;
}
.icure-text-field .icure-label,
.icure-button-group .icure-label {
  color: #1D2235;
  font-size: 14px;
  font-weight: 400;
}
.icure-text-field .icure-label > span,
.icure-button-group .icure-label > span {
  display: block;
  word-wrap: break-word;
  overflow: auto;
  font-weight: 400;
}
.icure-text-field > .icure-input,
.icure-button-group > .icure-input {
  flex: 1 1 auto;
  width: auto;
}
.icure-text-field .icure-input,
.icure-text-field .input-container,
.icure-button-group .icure-input,
.icure-button-group .input-container {
  cursor: pointer;
  border-radius: 6px;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  outline: 0;
  font: inherit;
  font-size: 13px;
  line-height: 1.4em;
  display: flex;
  align-items: center;
  vertical-align: middle;
  position: relative;
  -webkit-appearance: none;
  background-color: #ffffff;
  border-color: #DDE3E7;
  color: #1D2235;
  box-sizing: border-box;
}
.icure-text-field .icure-input__validationError,
.icure-text-field .input-container__validationError,
.icure-button-group .icure-input__validationError,
.icure-button-group .input-container__validationError {
  border-color: red;
}
.icure-text-field .icure-input__withMetadata,
.icure-text-field .input-container__withMetadata,
.icure-button-group .icure-input__withMetadata,
.icure-button-group .input-container__withMetadata {
  border-radius: 6px 0 0 6px;
}
.icure-text-field .icure-input:focus, .icure-text-field .icure-input:focus-within,
.icure-text-field .input-container:focus,
.icure-text-field .input-container:focus-within,
.icure-button-group .icure-input:focus,
.icure-button-group .icure-input:focus-within,
.icure-button-group .input-container:focus,
.icure-button-group .input-container:focus-within {
  box-shadow: 0px 0px 0px 2px rgba(61, 135, 197, 0.2);
  border-color: #084B83;
}
.icure-text-field .icure-input:hover,
.icure-text-field .input-container:hover,
.icure-button-group .icure-input:hover,
.icure-button-group .input-container:hover {
  border-color: #084B83;
  box-shadow: none;
}
.icure-text-field .icure-input:hover:focus, .icure-text-field .icure-input:hover:focus-within,
.icure-text-field .input-container:hover:focus,
.icure-text-field .input-container:hover:focus-within,
.icure-button-group .icure-input:hover:focus,
.icure-button-group .icure-input:hover:focus-within,
.icure-button-group .input-container:hover:focus,
.icure-button-group .input-container:hover:focus-within {
  box-shadow: 0px 0px 0px 2px rgba(61, 135, 197, 0.2);
  border-color: #084B83;
}
.icure-text-field .icure-input .ProseMirror,
.icure-text-field .input-container .ProseMirror,
.icure-button-group .icure-input .ProseMirror,
.icure-button-group .input-container .ProseMirror {
  padding: 0;
  font-size: 13px;
  line-height: 1.4em;
  color: #1D2235;
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
.icure-text-field .icure-input .ProseMirror:focus .focused, .icure-text-field .icure-input .ProseMirror:hover,
.icure-text-field .input-container .ProseMirror:focus .focused,
.icure-text-field .input-container .ProseMirror:hover,
.icure-button-group .icure-input .ProseMirror:focus .focused,
.icure-button-group .icure-input .ProseMirror:hover,
.icure-button-group .input-container .ProseMirror:focus .focused,
.icure-button-group .input-container .ProseMirror:hover {
  border-color: #084B83;
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
  background-color: #084B83;
}

.icure-button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  padding: 0 16px;
  background-color: #084B83;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}
.icure-button:hover {
  background-color: #3D87C5;
}

.menu-container .item:hover {
  background: #DCE7F2;
  color: #274768;
  cursor: pointer;
}
.menu-container .item.existing {
  background-color: #BFE8EA;
}
.menu-container .item.selected {
  color: white;
  background-color: #084B83;
}

input[type=radio] {
  margin-top: -1px;
  vertical-align: middle;
}

.icure-checkbox:hover {
  border-color: #DCE7F2;
}
.icure-checkbox:checked {
  accent-color: #084B83;
}

.icure-button-group > div {
  display: grid;
}
.icure-button-group > div > div {
  display: flex;
  align-items: center;
  gap: 6px;
}
.icure-button-group > div > div > .icure-button-group-label {
  z-index: 1;
  line-height: 1.4em;
  cursor: text;
  font-size: 14px;
  top: calc(1.4em + 1px);
  left: 9px;
  transition: transform 0.2s ease-out, color 0.2s ease-out;
  color: #1D2235;
  display: flex;
  align-items: center;
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
}

.icure-input #editor {
  color: #1D2235;
}
.icure-input #editor.tokens-list .ProseMirror li, .icure-input #editor.styled-tokens-list .ProseMirror li {
  background-color: #DCE7F2;
}
.icure-input #editor.tokens-list .ProseMirror li span:after, .icure-input #editor.styled-tokens-list .ProseMirror li span:after {
  background: transparent url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxu cz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJPdXRsaW5lIiB2aWV3 Qm94PSIwIDAgMjQgMjQiIHN0cm9rZT0iIzg4ODg4OCIgZmlsbD0iIzg4ODg4OCIg d2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiPjxwYXRoIGQ9Ik0xNiw4YTEsMSwwLDAs MC0xLjQxNCwwTDEyLDEwLjU4Niw5LjQxNCw4QTEsMSwwLDAsMCw4LDkuNDE0TDEw LjU4NiwxMiw4LDE0LjU4NkExLDEsMCwwLDAsOS40MTQsMTZMMTIsMTMuNDE0LDE0 LjU4NiwxNkExLDEsMCwwLDAsMTYsMTQuNTg2TDEzLjQxNCwxMiwxNiw5LjQxNEEx LDEsMCwwLDAsMTYsOFoiLz48cGF0aCBkPSJNMTIsMEExMiwxMiwwLDEsMCwyNCwx MiwxMi4wMTMsMTIuMDEzLDAsMCwwLDEyLDBabTAsMjJBMTAsMTAsMCwxLDEsMjIs MTIsMTAuMDExLDEwLjAxMSwwLDAsMSwxMiwyMloiLz48L3N2Zz4K") no-repeat center/16px;
}
.icure-input #editor.items-list .ProseMirror li {
  border-bottom: 1px dotted #8DA6BF;
}
.icure-input .select-arrow {
  opacity: 1;
}
.icure-input .select-arrow svg {
  width: 15px;
  height: 15px;
}
.icure-input .select-arrow svg path {
  fill: #9CA8B2;
}
.icure-input .options {
  padding: 2px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  border-radius: 6px;
  background: white;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.12), 0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 9px 28px 0px rgba(0, 0, 0, 0.05);
}
.icure-input .options .option {
  height: auto;
  min-height: unset;
  display: flex;
  padding: 8px;
  align-items: center;
  align-self: stretch;
  border-radius: 4px;
  background: white;
  color: #1D2235;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
}
.icure-input .options .option:hover {
  background: #DCE7F2;
  color: #084B83;
}
.icure-input:hover .select-arrow svg path, .icure-input:focus .select-arrow svg path {
  fill: #084B83;
}`;
const metadata_buttons_bar_1 = require("../../common/metadata-buttons-bar");
const icure_button_1 = require("../../icure-button");
const form_selection_button_1 = require("../../icure-form/renderer/form/form-selection-button");
class EhrLiteIcureButtonGroup extends icure_button_group_1.IcureButtonGroup {
    static get styles() {
        return [...icure_button_group_1.IcureButtonGroup.styles, ehrLiteCss];
    }
}
class EhrLiteIcureDatePickerField extends icure_date_picker_1.IcureDatePickerField {
    static get styles() {
        return [...icure_date_picker_1.IcureDatePickerField.styles, ehrLiteCss];
    }
}
class EhrLiteIcureDropdownField extends icure_dropdown_field_1.IcureDropdownField {
    static get styles() {
        return [...icure_dropdown_field_1.IcureDropdownField.styles, ehrLiteCss];
    }
}
class EhrLiteIcureForm extends icure_form_1.IcureForm {
    static get styles() {
        return [...icure_form_1.IcureForm.styles, ehrLiteCss];
    }
}
class EhrLiteIcureLabel extends icure_label_1.IcureLabel {
    static get styles() {
        return [...icure_label_1.IcureLabel.styles, ehrLiteCss];
    }
}
class EhrLiteIcureButton extends icure_button_1.IcureButton {
    static get styles() {
        return [...icure_button_1.IcureButton.styles, ehrLiteCss];
    }
}
class EhrLiteIcureTextField extends icure_text_field_1.IcureTextField {
    static get styles() {
        return [...icure_text_field_1.IcureTextField.styles, ehrLiteCss];
    }
}
class EhrLiteLabel extends fields_1.Label {
    static get styles() {
        return [...fields_1.Label.styles, ehrLiteCss];
    }
}
class EhrLiteMetadataButtonBar extends metadata_buttons_bar_1.MetadataButtonBar {
    static get styles() {
        return [...metadata_buttons_bar_1.MetadataButtonBar.styles, ehrLiteCss];
    }
}
class EhrLiteButton extends fields_1.Button {
    static get styles() {
        return [...fields_1.Button.styles, ehrLiteCss];
    }
}
customElements.define('icure-metadata-buttons-bar', EhrLiteMetadataButtonBar);
customElements.define('icure-metadata-buttons-bar-wrapper', icure_text_field_1.MetadataButtonBarWrapper);
customElements.define('icure-form-checkbox', fields_1.CheckBox);
customElements.define('icure-form-date-picker', fields_1.DatePicker);
customElements.define('icure-form-date-time-picker', fields_1.DateTimePicker);
customElements.define('icure-form-dropdown-field', fields_1.DropdownField);
customElements.define('icure-button-group', EhrLiteIcureButtonGroup);
customElements.define('icure-date-picker-field', EhrLiteIcureDatePickerField);
customElements.define('icure-dropdown-field', EhrLiteIcureDropdownField);
customElements.define('icure-form', EhrLiteIcureForm);
customElements.define('icure-label', EhrLiteIcureLabel);
customElements.define('icure-button', EhrLiteIcureButton);
customElements.define('icure-text-field', EhrLiteIcureTextField);
customElements.define('icure-form-items-list-field', fields_1.ItemsListField);
customElements.define('icure-form-label', EhrLiteLabel);
customElements.define('icure-form-button', EhrLiteButton);
customElements.define('icure-form-measure-field', fields_1.MeasureField);
customElements.define('icure-form-number-field', fields_1.NumberField);
customElements.define('icure-form-radio-button', fields_1.RadioButton);
customElements.define('icure-form-text-field', fields_1.TextField);
customElements.define('icure-form-time-picker', fields_1.TimePicker);
customElements.define('icure-form-token-field', fields_1.TokenField);
customElements.define('form-selection-button', form_selection_button_1.FormSelectionButton);
//# sourceMappingURL=index.js.map