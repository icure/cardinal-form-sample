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
exports.MetadataButtonBar = void 0;
const lit_1 = require("lit");
const decorators_js_1 = require("lit/decorators.js");
const paths_1 = require("./styles/paths");
const date_fns_1 = require("date-fns");
const dates_1 = require("../../utils/dates");
const to_resolved_date_1 = require("app-datepicker/dist/helpers/to-resolved-date");
const constants_1 = require("app-datepicker/dist/constants");
const languages_1 = require("../../utils/languages");
// @ts-ignore
const lit_2 = require("lit");
const baseCss = (0, lit_2.css) `@charset "UTF-8";
:host {
  --bg-color-1: #f44336;
}

.ProseMirror {
  position: relative;
  width: 100%;
  word-wrap: break-word;
  white-space: pre-wrap;
  -webkit-font-variant-ligatures: none;
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0; /* the above doesn't seem to work in Edge */
  padding: 6px 8px 2px 8px;
  line-height: 1.2;
  color: #274768;
  font-size: 14px;
  font-weight: 400;
  outline: none;
}
.ProseMirror p:last-child,
.ProseMirror h1:last-child,
.ProseMirror h2:last-child,
.ProseMirror h3:last-child,
.ProseMirror h4:last-child,
.ProseMirror h5:last-child,
.ProseMirror h6:last-child {
  margin-bottom: 2px;
}
.ProseMirror p {
  margin-bottom: 1em;
}
.ProseMirror pre {
  white-space: pre-wrap;
}
.ProseMirror li {
  position: relative;
}
.ProseMirror ul,
.ProseMirror ol {
  padding-left: 30px;
}
.ProseMirror blockquote {
  padding-left: 1em;
  border-left: 3px solid #eee;
  margin-left: 0;
  margin-right: 0;
}

.ProseMirror-hideselection {
  caret-color: transparent;
}
.ProseMirror-hideselection *::selection {
  background: transparent;
}
.ProseMirror-hideselection *::-moz-selection {
  background: transparent;
}

.ProseMirror-selectednode {
  outline: 2px solid #8cf;
}

/* Make sure li selections wrap around markers */
li.ProseMirror-selectednode {
  outline: none;
}
li.ProseMirror-selectednode :after {
  content: "";
  position: absolute;
  left: -32px;
  right: -2px;
  top: -2px;
  bottom: -2px;
  border: 2px solid #8cf;
  pointer-events: none;
}

.ProseMirror-gapcursor {
  display: none;
  pointer-events: none;
  position: absolute;
}
.ProseMirror-gapcursor:after {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  width: 20px;
  border-top: 1px solid black;
  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
}

@keyframes ProseMirror-cursor-blink {
  to {
    visibility: hidden;
  }
}
.ProseMirror-focused .ProseMirror-gapcursor {
  display: block;
}

/* Add space around the hr to make clicking it easier */
.ProseMirror-example-setup-style hr {
  padding: 2px 10px;
  border: none;
  margin: 1em 0;
}
.ProseMirror-example-setup-style hr:after {
  content: "";
  display: block;
  height: 1px;
  background: silver;
  line-height: 2px;
}

.ProseMirror-example-setup-style img {
  cursor: default;
}

.ProseMirror-prompt {
  background: white;
  padding: 5px 10px 5px 15px;
  border: 1px solid silver;
  position: fixed;
  border-radius: 3px;
  z-index: 11;
  box-shadow: -0.5px 2px 5px rgba(0, 0, 0, 0.2);
}
.ProseMirror-prompt h5 {
  margin: 0;
  font-weight: normal;
  font-size: 100%;
  color: #444;
}
.ProseMirror-prompt input[type=text],
.ProseMirror-prompt textarea {
  background: #eee;
  border: none;
  outline: none;
}
.ProseMirror-prompt input[type=text] {
  padding: 0 4px;
}

.ProseMirror-prompt-close {
  position: absolute;
  left: 2px;
  top: 1px;
  color: #666;
  border: none;
  background: transparent;
  padding: 0;
}
.ProseMirror-prompt-close:after {
  content: "✕";
  font-size: 12px;
}

.ProseMirror-invalid {
  background: #ffc;
  border: 1px solid #cc7;
  border-radius: 4px;
  padding: 5px 10px;
  position: absolute;
  min-width: 10em;
}

.ProseMirror-prompt-buttons {
  margin-top: 5px;
  display: none;
}

#editor,
.editor {
  color: rgb(101, 101, 101);
  background-clip: padding-box;
  border-radius: 4px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  padding: 5px 0;
  display: flex;
  align-items: flex-end;
}

.icure-input {
  background: #edf2f7;
  border-radius: 8px;
  border: none;
  min-height: 28px;
  height: auto;
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: space-between;
}

#editor {
  background: transparent;
  border: none;
  padding: 0;
  flex-grow: 1;
  display: flex;
  align-items: stretch;
}
#editor.tokens-list .ProseMirror, #editor.styled-tokens-list .ProseMirror {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
}
#editor.tokens-list .ProseMirror li, #editor.styled-tokens-list .ProseMirror li {
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  padding: 2px 4px;
  margin-right: 2px;
  background-color: #dadada;
  border-color: rgba(42, 61, 108, 0.44);
  min-height: 20px;
}
#editor.tokens-list .ProseMirror li span, #editor.styled-tokens-list .ProseMirror li span {
  display: inline-block;
  min-height: 18px;
}
#editor.tokens-list .ProseMirror li span br, #editor.styled-tokens-list .ProseMirror li span br {
  display: none;
}
#editor.items-list .ProseMirror {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: flex-start;
  gap: 6px;
}
#editor.items-list .ProseMirror li {
  list-style-type: none;
  width: 100%;
  padding-bottom: 4px;
  border-bottom: 1px dotted rgba(128, 128, 128, 0.5098039216);
}
#editor.items-list .ProseMirror li:last-child {
  border-bottom: none;
}

#content {
  position: relative;
  padding: 0;
}

* {
  font-family: "Roboto", Helvetica, sans-serif;
}

p {
  margin-top: 0;
}

h3 {
  color: #274768;
  margin-top: 0;
}

.icure-input-metadata-container {
  display: flex;
}
.icure-input-metadata-container .icure-metadata-container {
  display: flex;
  flex-grow: 1;
  padding: 0 4px;
  border: 1px solid #DDE3E7;
  border-left: none;
  border-radius: 0 6px 6px 0;
  outline: 0;
  box-sizing: border-box;
}
.icure-input-metadata-container .icure-metadata-container__validationError {
  border-color: red;
}

.extra {
  min-width: 20px;
  width: auto;
  height: 20px;
  transition: all 0.24s cubic-bezier(0.42, 0.01, 1, 0.62);
}
.extra:hover .info {
  display: none;
}
.extra:hover .buttons-container .menu-container .btn {
  animation: slideIn 0.24s ease-in forwards;
  pointer-events: none;
  display: unset !important;
}
.extra.forced .info, .extra.forced .extra .info.hidden {
  opacity: 0 !important;
  z-index: 0 !important;
  display: none;
}
.extra.forced .buttons-container .btn {
  opacity: 1 !important;
  display: unset !important;
}
.extra.forced:hover .buttons-container .menu-container .btn {
  animation: none;
  pointer-events: all;
}
.extra--metadataButtonsBar {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 4px;
}
.extra .info {
  color: #809ab4;
  font-size: 15px;
  width: 100%;
  height: auto;
  overflow: hidden;
  pointer-events: none;
  text-align: center;
}
.extra .info span {
  font-weight: 700;
}
.extra .info.hidden {
  display: none;
}
.extra .buttons-container {
  display: flex;
  height: 20px;
  width: auto;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  transition: all 0.24s cubic-bezier(0.14, 0.69, 0.87, 0.54);
  z-index: 1000;
}
.extra .buttons-container .btn {
  border: none;
  background: transparent;
  position: relative;
  top: 0;
  display: none;
  opacity: 0;
  cursor: pointer;
  height: 20px;
  margin-left: 4px;
  margin-right: 4px;
  padding: 0;
}
.extra .buttons-container .btn svg {
  width: 15px;
  height: 15px;
}
.extra .buttons-container .btn svg path {
  fill: #809ab4;
}
.extra .buttons-container .btn.forced {
  opacity: 1 !important;
  display: unset !important;
}
.extra .buttons-container .btn.forced svg path {
  fill: crimson !important;
}
.extra .buttons-container .btn:focus, .extra .buttons-container .btn:focus-within {
  border: none;
  outline: none;
}
.extra .buttons-container .btn:hover svg path {
  fill: #274768;
}
.extra .buttons-container .menu-container .btn:hover::before {
  content: "";
  display: block;
  border-color: #274768 transparent transparent transparent;
  border-style: solid;
  border-width: 4px;
  position: absolute;
  top: -6px;
}
.extra .buttons-container .menu-container .btn:hover::after {
  content: attr(data-content);
  position: absolute;
  top: -21px;
  height: 16px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 8px;
  background: #274768;
  color: white;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  text-transform: capitalize;
  white-space: nowrap;
  padding: 0 12px;
  font-size: 12px;
  line-height: 0;
}
.extra .buttons-container .menu-container:last-child .btn {
  margin-right: 0;
}

@keyframes slideIn {
  0% {
    top: 0;
    opacity: 0;
    pointer-events: none;
  }
  100% {
    top: 0;
    opacity: 1;
    pointer-events: all;
  }
}
.menu-container {
  display: flex;
  align-items: center;
  height: fit-content;
}
.menu-container .item {
  height: 30px;
  width: 100%;
  background: transparent;
  border-radius: 4px;
  font-size: 14px;
  color: #274768;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  box-shadow: none;
  border: none;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
}
.menu-container .item.existing {
  background-color: #BFE8EA;
}
.menu-container .item.selected {
  color: white;
  background-color: #084B83;
}
.menu-container .item:hover {
  background: #DCE7F2;
  color: #274768;
  font-weight: 500;
  border-radius: 4px;
}

.value-date-menu {
  width: unset !important;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 2px;
  position: absolute;
  top: 32px;
  right: -12px;
  z-index: 2;
  background: #fff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 8px;
  width: 220px;
  min-height: 120px;
  max-height: 320px;
  overflow-y: scroll;
}
.menu .input-container {
  background: #edf2f7;
  border-radius: 4px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  height: 32px;
  margin-bottom: 4px;
  padding: 0 4px;
}
.menu .input-container:hover {
  box-shadow: 0 0 0 3px rgba(40, 151, 255, 0.2);
}
.menu .input-container:focus-within {
  box-shadow: 0 0 0 3px rgba(40, 151, 255, 0.2), 0 0 0 1px rgb(40, 151, 255);
}
.menu .input-container input {
  background: transparent;
  border: none;
  flex-grow: 1;
  height: 100%;
}
.menu .input-container input:focus {
  background: transparent;
  border: none;
  outline: none;
}

.menu-trigger:focus .menu {
  display: flex;
}

span {
  position: relative;
  z-index: 1;
}
span.date {
  margin-right: 1px;
}
span.time {
  margin-left: 1px;
}
span.measure {
  display: inline-block;
  margin-right: 1px;
}
span.unit {
  margin-left: 1px;
  display: inline-block;
}
span[data-content]:hover::after {
  position: absolute;
  content: attr(data-content);
  background: #274768;
  color: #ffffff;
  font-size: 9px;
  line-height: 12px;
  top: -12px;
  left: 0px;
  padding: 0px 2px;
}
span[data-content]::before {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.3;
}

.masked {
  display: none;
}

.companion {
  position: absolute;
  width: 15px;
  background-color: hsl(194, 100%, 50%);
  color: white;
  z-index: 20;
  padding: 0;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 0 2px 2px 0;
}
.companion:hover {
  font-weight: 700;
  background: hsl(202, 100%, 50%);
}

*::selection {
  background-color: hsla(194, 100%, 50%, 0.2);
}

.suggestion-palette {
  position: absolute;
  z-index: 20;
  max-width: 380px;
  font-size: 11px;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 4px;
  border: none;
  border-radius: 8px;
  background: white;
  box-shadow: 0 1.1px 1.1px rgba(0, 0, 0, 0.022), 0 2.7px 2.7px rgba(0, 0, 0, 0.032), 0 5px 5px rgba(0, 0, 0, 0.04), 0 8.9px 8.9px rgba(0, 0, 0, 0.048), 0 16.7px 16.7px rgba(0, 0, 0, 0.058), 0 40px 40px rgba(0, 0, 0, 0.08);
}
.suggestion-palette ul {
  white-space: nowrap;
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.suggestion-palette ul li:not(:first-child) svg.tab-icn,
.suggestion-palette ul li:not(.focused) svg.return-icn, .suggestion-palette ul.focused li:first-child svg.tab-icn {
  height: 0;
  width: 0;
  transform: scale(0);
  opacity: 0;
}
.suggestion-palette ul li {
  padding: 0 8px;
  font-size: 11px;
  height: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  color: rgb(39, 71, 104);
}
.suggestion-palette ul li.focused {
  background-color: rgb(237, 242, 247);
}
.suggestion-palette ul li.focused svg.return-icn {
  animation: growIn 0.24s ease-in forwards;
}
.suggestion-palette ul li svg {
  height: 12px;
  width: 12px;
  border-radius: 4px;
  transform-origin: center center;
}
.suggestion-palette ul li svg path {
  fill: rgb(128, 154, 180);
}

@keyframes growIn {
  0% {
    transform: scale(0.5);
  }
  90% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
span.code-count-1::after,
span.code-count-1::before {
  background: var(--bg-code-color-1);
  color: var(--text-code-color-1);
}

span.code-count-2::after,
span.code-count-2::before {
  background: var(--bg-code-color-1);
  color: var(--text-code-color-1);
  /* STRIPES */
  /*background: repeating-linear-gradient(*/
  /*	45deg,*/
  /*	var(--bg-code-color-1),*/
  /*	var(--bg-code-color-1) 10px,*/
  /*	var(--bg-code-color-2) 10px,*/
  /*	var(--bg-code-color-2) 20px*/
  /*);*/
  /* PAS STRIPES */
  background: linear-gradient(90deg, var(--bg-code-color-1) 0%, var(--bg-code-color-2) 100%);
}

span.code-count-3::after,
span.code-count-3::before {
  background: var(--bg-code-color-1);
  color: var(--text-code-color-1);
  /* STRIPES */
  background: repeating-linear-gradient(45deg, var(--bg-code-color-1), var(--bg-code-color-1) 10px, var(--bg-code-color-2) 10px, var(--bg-code-color-2) 20px);
  /* PAS STRIPES */
  /* background: linear-gradient(90deg, var(--bg-code-color-1) 0%, var(--bg-code-color-2) 100%);*/
}

.selected-option {
  padding: 2px;
  margin-right: 5px;
}

.options {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 2;
  background: #fff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  width: auto;
  min-width: 100%;
  overflow-y: auto;
  padding: 2px;
  border-radius: 6px;
}
.options--subformView {
  top: 46px;
  min-width: unset;
  left: unset;
  right: 0;
}

.date-picker {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 2;
  background: #fff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  width: 260px;
  overflow-y: auto;
  max-height: 280px;
}

app-date-picker {
  --app-primary: #084B83;
  --app-hover: #5b7da2;
  --app-selected-hover: #5b7da2;
}

.option {
  height: 28px;
  min-height: 28px;
  width: 100%;
  background: transparent;
  border-radius: 4px;
  font-size: 14px;
  color: #545454;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  box-shadow: none;
  border: none;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  padding: 4px 8px;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
  cursor: pointer;
}
.option:hover {
  color: #656565;
  background-color: #ededed;
}

.select-arrow {
  border: none;
  background: 0px 0px;
  position: relative;
  top: 0px;
  opacity: 0.5;
  cursor: pointer;
  height: 20px;
  width: 10px;
  margin-left: 4px;
  margin-right: 4px;
  padding: 0px;
}

.hidden {
  display: none;
}

.container {
  position: relative;
}

.group {
  align-items: end;
  display: grid;
}

.subform {
  display: grid;
  position: relative;
  padding: 8px;
  border-radius: 6px;
  background-color: #e7f0fd;
  gap: 12px;
}
.subform__heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
}
.subform__heading__title {
  padding: 0;
  margin: 0;
}
.subform__addBtn, .subform__removeBtn {
  cursor: pointer;
  background-color: #084B83;
  color: white;
  height: 32px;
  padding: 0 16px;
  border-radius: 6px;
  border: none;
  outline: none;
}
.subform__addBtn:hover, .subform__removeBtn:hover {
  background-color: #3D87C5;
}
.subform__removeBtn {
  justify-self: end;
  border: 1px solid #DDE3E7;
  background-color: #FCFCFD;
  color: #084B83;
}
.subform__removeBtn:hover {
  background-color: #F2F2F2;
}
.subform__child {
  display: grid;
  grid-template-rows: auto;
  gap: 8px;
  padding: 8px;
  border-radius: 6px;
  background: white;
  border: 1px solid #3D87C5;
}
.subform__child__title {
  padding: 12px !important;
  border-radius: 6px;
  margin: 0;
  background-color: #BFE8EA;
}
.subform__child .subform {
  background: unset;
  margin: 0;
  padding: 0;
}

.icure-form {
  background-color: rgba(0, 0, 0, 0);
  display: grid;
  gap: 16px 6px;
  grid-template-columns: repeat(24, 1fr);
}
.icure-form hr {
  display: block;
  margin-top: 20px;
  border-top: 1px solid rgba(8, 75, 131, 0.13);
  margin-bottom: 20px;
}
.icure-form h2 {
  font-size: 14.4px;
  font-weight: 700;
  color: #084B83;
  padding: 2px;
}
.icure-form h3 {
  font-size: 13.2px;
  font-weight: 500;
  color: #084B83;
  padding: 6px;
}
.icure-form .group.bordered {
  background: #f6f6f6;
  border-radius: 12px;
}

.icure-form-field {
  display: grid;
  align-items: flex-start;
}

.error {
  color: red;
  font-size: 12px;
  margin-top: 4px;
}

.icure-text-field .icure-label-extra, .icure-button-group .icure-label-extra {
  display: flex;
  width: 100%;
  gap: 12px;
}
.icure-text-field .icure-label, .icure-button-group .icure-label {
  z-index: 1;
  pointer-events: none;
  line-height: 1.4em;
  cursor: text;
  font-size: 12px;
  left: 9px;
  color: #084B83;
  align-items: center;
  height: 28px;
  max-width: 85%;
  min-width: 0;
}
.icure-text-field .icure-label.float, .icure-button-group .icure-label.float {
  display: flex;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.icure-text-field {
  position: relative;
  width: 100%;
}
.icure-text-field > .icure-label {
  transition: transform 0.2s ease-out, color 0.2s ease-out;
}
.icure-text-field > .icure-input {
  flex: 1 1 auto;
  width: auto;
}
.icure-text-field > .icure-label.side {
  position: relative;
}
.icure-text-field > .icure-label.side.left {
  order: -1;
  margin-right: 1em;
}
.icure-text-field > .icure-label.side.right {
  order: 1;
  margin-left: 1em;
}
.icure-text-field .icure-input,
.icure-text-field .input-container {
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: #DDE3E7;
  border-radius: 2px;
  box-sizing: border-box;
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
  color: #000000;
}
.icure-text-field .icure-input__validationError,
.icure-text-field .input-container__validationError {
  border-color: red;
}
.icure-text-field .icure-input__withMetadata,
.icure-text-field .input-container__withMetadata {
  border-radius: 6px 0 0 6px;
}
.icure-text-field .icure-input:focus, .icure-text-field .icure-input:focus-within,
.icure-text-field .input-container:focus,
.icure-text-field .input-container:focus-within {
  box-shadow: 0 2px 2px 1px rgba(0, 0, 0, 0.06);
}
.icure-text-field .icure-input:hover,
.icure-text-field .input-container:hover {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: none;
}
.icure-text-field .icure-input:hover:focus, .icure-text-field .icure-input:hover:focus-within,
.icure-text-field .input-container:hover:focus,
.icure-text-field .input-container:hover:focus-within {
  box-shadow: 0 2px 2px 1px rgba(0, 0, 0, 0.06);
}
.icure-text-field .icure-input .ProseMirror,
.icure-text-field .input-container .ProseMirror {
  padding: 0;
  font-size: 14px;
  line-height: 1.4em;
  color: #000000;
}
.icure-text-field .icure-input .ProseMirror .date,
.icure-text-field .input-container .ProseMirror .date {
  padding: 1px;
}
.icure-text-field .icure-input .ProseMirror .time,
.icure-text-field .input-container .ProseMirror .time {
  padding: 1px;
}
.icure-text-field .icure-input .ProseMirror:focus .focused,
.icure-text-field .input-container .ProseMirror:focus .focused {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
  border-color: rgba(0, 0, 0, 0.1);
}
.icure-text-field .icure-input > svg,
.icure-text-field .input-container > svg {
  opacity: 0.5;
}
.icure-text-field .icure-input > svg path,
.icure-text-field .input-container > svg path {
  fill: #656565;
}
.icure-text-field .icure-input .extra,
.icure-text-field .input-container .extra {
  height: 20px;
}
.icure-text-field .icure-input .extra > .info,
.icure-text-field .input-container .extra > .info {
  color: #656565;
  opacity: 0.5;
}
.icure-text-field .icure-input .extra .btn svg path,
.icure-text-field .input-container .extra .btn svg path {
  fill: #656565;
  opacity: 0.5;
}
.icure-text-field .icure-input .extra .btn svg path:hover,
.icure-text-field .input-container .extra .btn svg path:hover {
  fill: #656565;
  opacity: 1;
}

input[type=radio] {
  margin-top: -1px;
  vertical-align: middle;
}

.icure-checkbox:checked {
  accent-color: #06a070;
}

.icure-button {
  display: flex;
  height: 32px;
  padding: 0 16px;
  background-color: #084B83;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: normal;
}
.icure-button:hover {
  background-color: #3D87C5;
}

.icure-button-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
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
  font-size: 12px;
  top: calc(1.4em + 1px);
  left: 9px;
  transition: transform 0.2s ease-out, color 0.2s ease-out;
  color: #084B83;
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
}
.icure-button-group > .icure-label {
  transform: translate(0, 0) scale(1);
}
.icure-button-group > .icure-label.above, .icure-button-group.has-content > .icure-label, .icure-button-group:focus > .icure-label, .icure-button-group:focus-within > .icure-label {
  font-weight: 500;
  height: 1.4em;
}`;
class MetadataButtonBar extends lit_1.LitElement {
    constructor() {
        super(...arguments);
        this.languages = {};
        this.displayedLabels = {};
        this.handleMetadataChanged = undefined;
        this.handleLanguageSelected = undefined;
        this.handleRevisionSelected = undefined;
        this.ownersProvider = () => __awaiter(this, void 0, void 0, function* () { return []; });
        this.displayOwnersMenu = false;
        this.ownerInputValue = '';
        this.availableOwners = [];
        this.loadedOwners = {};
        this.displayLanguagesMenu = false;
        this.displayVersionsMenu = false;
        this.displayValueDateMenu = false;
        this.languageInputValue = '';
    }
    static get styles() {
        return [baseCss];
    }
    _handleClickOutside(event) {
        if (!event.composedPath().includes(this)) {
            this.displayVersionsMenu = false;
            this.displayLanguagesMenu = false;
            this.displayOwnersMenu = false;
            this.displayValueDateMenu = false;
            event.stopPropagation();
        }
    }
    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('click', this._handleClickOutside.bind(this));
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('click', this._handleClickOutside.bind(this));
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        const revisionDate = (_a = this.versions.find((x) => x.revision === this.revision)) === null || _a === void 0 ? void 0 : _a.modified;
        const owner = (_b = this.metadata) === null || _b === void 0 ? void 0 : _b.owner;
        if (owner && !this.loadedOwners[owner]) {
            this.loadedOwners = Object.assign(Object.assign({}, this.loadedOwners), { [owner]: { id: owner, text: '', terms: [], label: {} } }); // Make sure we do not loop endlessly
            this.ownersProvider &&
                this.ownersProvider([], [owner]).then((availableOwners) => (this.loadedOwners = availableOwners.reduce((acc, o) => (Object.assign(Object.assign({}, acc), { [o.id]: o })), this.loadedOwners)));
        }
        const forcedByMenu = this.displayOwnersMenu || this.displayLanguagesMenu || this.displayValueDateMenu || this.displayVersionsMenu;
        const discordantMetadata = (_d = (_c = this.metadata) === null || _c === void 0 ? void 0 : _c.discordantMetadata) === null || _d === void 0 ? void 0 : _d.call(_c);
        const forcedByOwner = (discordantMetadata === null || discordantMetadata === void 0 ? void 0 : discordantMetadata.owner) !== undefined;
        const forcedByValueDate = (discordantMetadata === null || discordantMetadata === void 0 ? void 0 : discordantMetadata.valueDate) !== undefined;
        const forcedByLanguage = this.selectedLanguage && this.defaultLanguage !== this.selectedLanguage;
        const forcedByVersion = this.revision && this.revision !== ((_f = (_e = this.versions) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.revision);
        return (0, lit_1.html) ` <div id="extra" class=${'extra extra--metadataButtonsBar' + (forcedByMenu ? ' forced' : '')}>
			<div class="info ${forcedByOwner || forcedByLanguage || forcedByValueDate ? 'hidden' : ''}">&#9432</div>
			<div class="buttons-container">
				<div class="menu-container">
					<button
						data-content="${(_k = (((_g = this.metadata) === null || _g === void 0 ? void 0 : _g.owner) ? (_j = this.loadedOwners[(_h = this.metadata) === null || _h === void 0 ? void 0 : _h.owner]) === null || _j === void 0 ? void 0 : _j.text : '')) !== null && _k !== void 0 ? _k : ''}"
						@click="${() => { var _a; return this.toggleOwnersMenu((_a = this.metadata) === null || _a === void 0 ? void 0 : _a.owner); }}"
						class="btn menu-trigger author ${forcedByOwner ? 'forced' : ''}"
					>
						${paths_1.ownerPicto}
					</button>
					${this.displayOwnersMenu
            ? (0, lit_1.html) `
									<div id="menu" class="menu">
										<div class="input-container">${paths_1.searchPicto} <input id="ownerSearch" @input="${this.searchOwner}" /></div>
										${(_m = (((_l = this.availableOwners) === null || _l === void 0 ? void 0 : _l.length) ? this.availableOwners : Object.values(this.loadedOwners))) === null || _m === void 0 ? void 0 : _m.map((x) => {
                var _a, _b, _c;
                return (0, lit_1.html) ` <button
												@click="${() => this.handleOwnerButtonClicked(x.id)}"
												id="${x.id}"
												class="${((_a = this.metadata) === null || _a === void 0 ? void 0 : _a.owner) && ((_c = this.loadedOwners[(_b = this.metadata) === null || _b === void 0 ? void 0 : _b.owner]) === null || _c === void 0 ? void 0 : _c.text) === x.text ? 'item selected' : 'item'}"
											>
												${x.text}
											</button>`;
            })}
									</div>
							  `
            : ''}
				</div>
				<div class="menu-container">
					<button
						data-content="${((_o = this.metadata) === null || _o === void 0 ? void 0 : _o.valueDate) ? (0, date_fns_1.format)((0, dates_1.anyDateToDate)(this.metadata.valueDate), 'yyyy-MM-dd HH:mm:ss').replace(/ 00:00:00$/, '') : ''}"
						class="btn date ${forcedByValueDate ? 'forced' : ''}"
						@click="${() => this.toggleValueDateMenu()}"
					>
						${paths_1.calendarPatientPicto}
					</button>
					${this.displayValueDateMenu
            ? (0, lit_1.html) `
									<div id="menu" class="menu value-date-menu">
										<app-date-picker
											locale="${(_p = this.defaultLanguage) !== null && _p !== void 0 ? _p : 'en'}"
											style=""
											max="${constants_1.MAX_DATE}"
											min="${(0, to_resolved_date_1.toResolvedDate)('1900-01-01')}"
											@date-updated="${this.dateUpdated}"
										></app-date-picker>
									</div>
							  `
            : ''}
				</div>
				<div class="menu-container">
					<button
						data-content="${this.revision === null
            ? 'latest'
            : this.revision
                ? `rev-${this.revision.split('-')[0]} ${revisionDate ? `(${(0, date_fns_1.format)(new Date(revisionDate), 'yyyy-MM-dd')})` : ''}`
                : ''}"
						@click="${this.toggleVersionsMenu}"
						class="btn version  ${forcedByVersion ? 'forced' : ''}"
					>
						${paths_1.versionPicto}
					</button>
					${this.displayVersionsMenu
            ? (0, lit_1.html) ` <div id="menu" class="menu">
									${this.versions.map((x) => {
                var _a;
                return (0, lit_1.html) ` <button class="item ${x.revision === this.revision ? 'item selected' : ''}" @click="${() => this.handleRevisionButtonClicked(x.revision)}">
												${x.revision == null ? 'Latest' : (_a = x.revision) !== null && _a !== void 0 ? _a : ''} ${x.modified ? `(${(0, date_fns_1.format)(new Date(x.modified), 'yyyy-MM-dd')})` : ''}
											</button>`;
            })}
							  </div>`
            : ''}
				</div>
				<div class="menu-container">
					<button
						data-content="${this.selectedLanguage ? (_q = (0, languages_1.languageName)(this.selectedLanguage)) !== null && _q !== void 0 ? _q : this.selectedLanguage : (_r = (0, languages_1.languageName)(this.defaultLanguage)) !== null && _r !== void 0 ? _r : this.defaultLanguage}"
						@click="${this.toggleLanguagesMenu}"
						class="btn menu-trigger language ${forcedByLanguage ? 'forced' : ''}"
					>
						${paths_1.i18nPicto}
					</button>
					${this.displayLanguagesMenu
            ? (0, lit_1.html) `
									<div id="menu" class="menu">
										<div class="input-container">${paths_1.searchPicto} <input id="languageSearch" @input="${this.searchLanguage}" /></div>
										${[this.defaultLanguage, ...Object.keys(this.languages).filter((x) => x !== this.defaultLanguage)]
                .filter((x) => { var _a, _b, _c; return !!x && ((_b = (_a = (0, languages_1.languageName)(x)) !== null && _a !== void 0 ? _a : this.languages[x]) !== null && _b !== void 0 ? _b : x).toLowerCase().includes(((_c = this.languageInputValue) !== null && _c !== void 0 ? _c : '').toLowerCase()); })
                .map((x) => {
                var _a;
                return (0, lit_1.html) ` <button
													@click="${() => this.handleLanguageButtonClicked(x)}"
													id="${x}"
													class="${(x === this.defaultLanguage && !this.selectedLanguage) || x === this.selectedLanguage
                    ? 'item item selected'
                    : ((_a = this.existingLanguages) === null || _a === void 0 ? void 0 : _a.includes(x))
                        ? 'item item existing'
                        : 'item'}"
												>
													${x ? (0, languages_1.languageName)(x) : ''}
												</button>`;
            })}
									</div>
							  `
            : ''}
				</div>
			</div>
		</div>`;
    }
    toggleOwnersMenu(ownerId) {
        this.displayOwnersMenu = !this.displayOwnersMenu;
        if (this.displayOwnersMenu) {
            this.displayLanguagesMenu = false;
            this.displayVersionsMenu = false;
            this.displayValueDateMenu = false;
            setTimeout(() => {
                var _a;
                ;
                (_a = this.renderRoot.querySelector('#ownerSearch')) === null || _a === void 0 ? void 0 : _a.focus();
            }, 0);
        }
    }
    searchOwner(e) {
        const text = e.target.value;
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (((_a = this.renderRoot.querySelector('#ownerSearch')) === null || _a === void 0 ? void 0 : _a.value) === text) {
                if (this.ownersProvider) {
                    const availableOwners = yield this.ownersProvider(text.split(' '));
                    console.log(availableOwners);
                    this.availableOwners = availableOwners;
                }
            }
        }), 300);
    }
    searchLanguage(e) {
        this.languageInputValue = e.target.value;
    }
    handleOwnerButtonClicked(id) {
        const valueId = this.valueId;
        this.handleMetadataChanged && valueId && this.handleMetadataChanged({ label: this.metadata.label, owner: id });
        this.displayOwnersMenu = false;
    }
    handleLanguageButtonClicked(id) {
        var _a;
        (_a = this.handleLanguageSelected) === null || _a === void 0 ? void 0 : _a.call(this, id);
        this.displayOwnersMenu = false;
    }
    handleRevisionButtonClicked(rev) {
        var _a;
        (_a = this.handleRevisionSelected) === null || _a === void 0 ? void 0 : _a.call(this, rev);
        this.displayVersionsMenu = false;
    }
    toggleValueDateMenu() {
        this.displayValueDateMenu = !this.displayValueDateMenu;
        if (this.displayValueDateMenu) {
            this.displayOwnersMenu = false;
            this.displayLanguagesMenu = false;
            this.displayVersionsMenu = false;
        }
    }
    dateUpdated(date) {
        var _a;
        const parts = (_a = date.detail.value) === null || _a === void 0 ? void 0 : _a.split('-');
        if (parts && parts.length === 3) {
            const fuzzyDateValue = parseInt(parts[0]) * 10000 + parseInt(parts[1]) * 100 + parseInt(parts[2]);
            const valueId = this.valueId;
            this.handleMetadataChanged && this.handleMetadataChanged({ label: this.metadata.label, valueDate: fuzzyDateValue * 1000000 }, valueId);
            this.displayOwnersMenu = false;
        }
    }
    toggleLanguagesMenu() {
        this.displayLanguagesMenu = !this.displayLanguagesMenu;
        if (this.displayLanguagesMenu) {
            this.displayOwnersMenu = false;
            this.displayVersionsMenu = false;
            this.displayValueDateMenu = false;
        }
    }
    toggleVersionsMenu() {
        this.displayVersionsMenu = !this.displayVersionsMenu;
        if (this.displayVersionsMenu) {
            this.displayOwnersMenu = false;
            this.displayLanguagesMenu = false;
            this.displayValueDateMenu = false;
        }
    }
}
exports.MetadataButtonBar = MetadataButtonBar;
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", String)
], MetadataButtonBar.prototype, "valueId", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Object)
], MetadataButtonBar.prototype, "metadata", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", String)
], MetadataButtonBar.prototype, "revision", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Array)
], MetadataButtonBar.prototype, "versions", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", String)
], MetadataButtonBar.prototype, "defaultLanguage", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", String)
], MetadataButtonBar.prototype, "selectedLanguage", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Object)
], MetadataButtonBar.prototype, "languages", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Array)
], MetadataButtonBar.prototype, "existingLanguages", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Object)
], MetadataButtonBar.prototype, "displayedLabels", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Function)
], MetadataButtonBar.prototype, "handleMetadataChanged", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Function)
], MetadataButtonBar.prototype, "handleLanguageSelected", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Function)
], MetadataButtonBar.prototype, "handleRevisionSelected", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Function)
], MetadataButtonBar.prototype, "ownersProvider", void 0);
__decorate([
    (0, decorators_js_1.state)(),
    __metadata("design:type", Object)
], MetadataButtonBar.prototype, "displayOwnersMenu", void 0);
__decorate([
    (0, decorators_js_1.state)(),
    __metadata("design:type", Object)
], MetadataButtonBar.prototype, "ownerInputValue", void 0);
__decorate([
    (0, decorators_js_1.state)(),
    __metadata("design:type", Array)
], MetadataButtonBar.prototype, "availableOwners", void 0);
__decorate([
    (0, decorators_js_1.state)(),
    __metadata("design:type", Object)
], MetadataButtonBar.prototype, "loadedOwners", void 0);
__decorate([
    (0, decorators_js_1.state)(),
    __metadata("design:type", Object)
], MetadataButtonBar.prototype, "displayLanguagesMenu", void 0);
__decorate([
    (0, decorators_js_1.state)(),
    __metadata("design:type", Object)
], MetadataButtonBar.prototype, "displayVersionsMenu", void 0);
__decorate([
    (0, decorators_js_1.state)(),
    __metadata("design:type", Object)
], MetadataButtonBar.prototype, "displayValueDateMenu", void 0);
__decorate([
    (0, decorators_js_1.state)(),
    __metadata("design:type", Object)
], MetadataButtonBar.prototype, "languageInputValue", void 0);
//# sourceMappingURL=metadata-buttons-bar.js.map