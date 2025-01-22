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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataButtonBarWrapper = exports.IcureTextField = void 0;
// Import the LitElement base class and html helper function
//@ts-ignore
const lit_1 = require("lit");
const decorators_js_1 = require("lit/decorators.js");
const prosemirror_state_1 = require("prosemirror-state");
const prosemirror_view_1 = require("prosemirror-view");
const prosemirror_history_1 = require("prosemirror-history");
const prosemirror_keymap_1 = require("prosemirror-keymap");
const prosemirror_commands_1 = require("prosemirror-commands");
const prosemirror_schema_list_1 = require("prosemirror-schema-list");
const schema_1 = require("./schema");
const markdown_it_1 = __importDefault(require("markdown-it"));
const prosemirror_markdown_1 = require("prosemirror-markdown");
const prosemirror_commands_2 = require("./prosemirror-commands");
const selection_companion_1 = require("./selection-companion");
const suggestion_palette_1 = require("./suggestion-palette");
const prosemirror_utils_1 = require("./prosemirror-utils");
const mask_plugin_1 = require("./plugin/mask-plugin");
const has_content_class_plugin_1 = require("./plugin/has-content-class-plugin");
const regexp_plugin_1 = require("./plugin/regexp-plugin");
const date_fns_1 = require("date-fns");
const common_1 = require("../common");
const model_1 = require("../model");
const utils_1 = require("../common/utils");
const baseCss = (0, lit_1.css) `@charset "UTF-8";
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
const utils_2 = require("../icure-form/fields/utils");
const markdown_1 = require("../../utils/markdown");
const measure_schema_1 = require("./schema/measure-schema");
const dates_1 = require("../../utils/dates");
// Extend the LitElement base class
class IcureTextField extends common_1.Field {
    constructor() {
        super();
        this.placeholder = '';
        this.multiline = false;
        this.lines = 1;
        this.suggestionStopWords = new Set();
        this.displayOwnerMenu = false;
        this.suggestions = false;
        this.links = false;
        this.linksProvider = () => __awaiter(this, void 0, void 0, function* () { return undefined; });
        this.suggestionProvider = () => __awaiter(this, void 0, void 0, function* () { return []; });
        this.codeColorProvider = () => 'XI';
        this.linkColorProvider = () => 'cat1';
        this.codeContentProvider = (codes) => codes.map((c) => c.code).join(',');
        this.schema = 'styled-text-with-codes';
        this.serializer = {
            serialize: (content) => content.textBetween(0, content.nodeSize - 2, ' '),
        };
        this.primitiveTypeExtractor = () => undefined;
        this.primitiveTypesExtractor = () => [];
        this.codesExtractor = () => [];
        this.windowListeners = [];
        this.mouseCount = 0;
        this.trToSave = undefined;
    }
    _handleClickOutside(event) {
        if (!event.composedPath().includes(this)) {
            event.stopPropagation();
        }
    }
    connectedCallback() {
        super.connectedCallback();
        const cmu = this.mouseUp.bind(this);
        const cmd = this.mouseDown.bind(this);
        document.addEventListener('click', this._handleClickOutside.bind(this));
        this.windowListeners.push(['mouseup', cmu], ['mousedown', cmd]);
        window.addEventListener('mouseup', cmu);
        window.addEventListener('mousedown', cmd);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('click', this._handleClickOutside.bind(this));
        this.windowListeners.forEach((wl) => window.removeEventListener(wl[0], wl[1]));
    }
    static get styles() {
        return [
            (0, lit_1.css) `
				.unit::before {
					content: ' ';
				}
			`,
            baseCss,
        ];
    }
    isMultivalued() {
        return this.schema.includes('tokens-list') || this.schema.includes('items-list');
    }
    updateValue(tr) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        if (this.isMultivalued()) {
            const values = (0, utils_2.extractValues)((_a = this.valueProvider) === null || _a === void 0 ? void 0 : _a.call(this), (_b = this.metadataProvider) !== null && _b !== void 0 ? _b : (() => ({})));
            const valuesFromField = (_d = (_c = this.primitiveTypesExtractor) === null || _c === void 0 ? void 0 : _c.call(this, tr.doc)) !== null && _d !== void 0 ? _d : [];
            const unchangedIds = [];
            const newAndModifiedValues = [];
            valuesFromField.forEach(([tid, value]) => {
                const id = tid.length > 0 ? tid : undefined;
                const oldValue = id && values.find(([vid, v]) => { var _a, _b; return vid === id && (0, model_1.pteq)((_b = (_a = v[0].value) === null || _a === void 0 ? void 0 : _a.content) === null || _b === void 0 ? void 0 : _b[this.language()], value); });
                const idPresent = newAndModifiedValues.some(([ttid]) => ttid === tid);
                if (!oldValue || idPresent) {
                    newAndModifiedValues.push([idPresent ? '' : tid, value]);
                }
                else {
                    unchangedIds.push(tid);
                }
            });
            newAndModifiedValues.forEach(([tid, value]) => {
                var _a;
                const id = tid.length > 0 && !unchangedIds.includes(tid) ? tid : undefined;
                (_a = this.handleValueChanged) === null || _a === void 0 ? void 0 : _a.call(this, this.label, this.language(), value
                    ? {
                        content: { [this.language()]: value },
                        codes: [],
                    }
                    : undefined, id);
            });
            values
                .filter(([vid]) => !valuesFromField.some(([vvid]) => vvid === vid))
                .forEach(([id]) => {
                var _a;
                (_a = this.handleValueChanged) === null || _a === void 0 ? void 0 : _a.call(this, this.label, this.language(), undefined, id);
            });
        }
        else {
            const [valueId] = (0, utils_2.extractSingleValue)((_e = this.valueProvider) === null || _e === void 0 ? void 0 : _e.call(this));
            const value = (_f = this.primitiveTypeExtractor) === null || _f === void 0 ? void 0 : _f.call(this, tr.doc);
            ((_g = this.handleValueChanged) === null || _g === void 0 ? void 0 : _g.call(this, this.label, this.language(), value
                ? {
                    content: { [this.language()]: value },
                    codes: (_j = (_h = this.codesExtractor) === null || _h === void 0 ? void 0 : _h.call(this, tr.doc)) !== null && _j !== void 0 ? _j : [],
                }
                : undefined, valueId)) && (this.selectedRevision = undefined);
        }
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
        const renderHash = Math.random();
        let metadata;
        let rev;
        let versions;
        const validationError = (_b = (_a = this.validationErrorsProvider) === null || _a === void 0 ? void 0 : _a.call(this)) === null || _b === void 0 ? void 0 : _b.length;
        let valueForExistingLanguages = undefined;
        if (this.view) {
            let parsedDoc;
            const data = (_c = this.valueProvider) === null || _c === void 0 ? void 0 : _c.call(this);
            if (this.isMultivalued()) {
                const values = (0, utils_2.extractValues)(data, (_d = this.metadataProvider) !== null && _d !== void 0 ? _d : (() => ({})));
                parsedDoc =
                    (_f = (_e = this.proseMirrorSchema) === null || _e === void 0 ? void 0 : _e.topNodeType.createAndFill({}, values.map(([id, value]) => { var _a, _b, _c, _d, _e; return (_a = this.parser) === null || _a === void 0 ? void 0 : _a.parse((_e = (_d = (_c = (_b = value === null || value === void 0 ? void 0 : value[0]) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.content) === null || _d === void 0 ? void 0 : _d[this.language()]) !== null && _e !== void 0 ? _e : '', id, renderHash); }).filter((x) => !!x))) !== null && _f !== void 0 ? _f : undefined;
            }
            else {
                let id;
                [id, versions] = (0, utils_2.extractSingleValue)(data);
                const version = this.selectedRevision ? versions === null || versions === void 0 ? void 0 : versions.find((v) => v.revision === this.selectedRevision) : versions === null || versions === void 0 ? void 0 : versions[0];
                const valueForLanguage = (_j = (_h = (_g = version === null || version === void 0 ? void 0 : version.value) === null || _g === void 0 ? void 0 : _g.content) === null || _h === void 0 ? void 0 : _h[this.language()]) !== null && _j !== void 0 ? _j : '';
                valueForExistingLanguages = Object.keys((_l = (_k = version === null || version === void 0 ? void 0 : version.value) === null || _k === void 0 ? void 0 : _k.content) !== null && _l !== void 0 ? _l : {});
                parsedDoc = valueForLanguage ? (_o = (_m = this.parser) === null || _m === void 0 ? void 0 : _m.parse(valueForLanguage)) !== null && _o !== void 0 ? _o : undefined : undefined;
                rev = version === null || version === void 0 ? void 0 : version.revision;
                metadata = id && rev !== undefined ? (_t = (_s = (_r = (_p = this.metadataProvider) === null || _p === void 0 ? void 0 : _p.call(this, id, (_q = versions === null || versions === void 0 ? void 0 : versions.map((v) => v.revision)) !== null && _q !== void 0 ? _q : [])) === null || _r === void 0 ? void 0 : _r[id]) === null || _s === void 0 ? void 0 : _s.find((m) => m.revision === rev)) === null || _t === void 0 ? void 0 : _t.value : undefined;
            }
            if (parsedDoc) {
                const selection = this.view.state.selection;
                const selAnchor = selection.$anchor.pos;
                const selHead = selection.$head.pos;
                const lastPos = this.schema === 'text-document' ? parsedDoc.content.size - 1 : parsedDoc.content.size;
                if (lastPos < selAnchor || lastPos < selHead) {
                    console.log(`Constraining selection to ${Math.min(selAnchor, lastPos)} - ${Math.min(selHead, lastPos)}`);
                }
                const newState = prosemirror_state_1.EditorState.create({
                    schema: this.view.state.schema,
                    doc: parsedDoc,
                    plugins: this.view.state.plugins,
                    selection: new prosemirror_state_1.TextSelection(parsedDoc.resolve(Math.min(selAnchor, lastPos)), parsedDoc.resolve(Math.min(selHead, lastPos))),
                });
                this.view.updateState(newState);
            }
            else {
                this.view.updateState(prosemirror_state_1.EditorState.create({
                    schema: this.view.state.schema,
                    doc: undefined,
                    plugins: this.view.state.plugins,
                    selection: undefined,
                }));
            }
        }
        return (0, lit_1.html) `
			<div id="root" class="${this.visible ? 'icure-text-field' : 'hidden'}" data-placeholder=${this.placeholder}>
				${this.displayedLabels ? (0, utils_1.generateLabels)(this.displayedLabels, this.language(), this.translate ? this.translationProvider : undefined) : lit_1.nothing}
				<div class="icure-input-metadata-container">
					<div class="icure-input ${validationError ? 'icure-input__validationError' : ''} ${this.displayMetadata && metadata ? 'icure-input__withMetadata' : ''}">
						<div id="editor" class="${this.schema}" style="min-height: calc( ${this.lines}rem + 5px )"></div>
					</div>

					${this.displayMetadata && metadata
            ? (0, lit_1.html) `
								<div class="icure-metadata-container ${validationError ? 'icure-metadata-container__validationError' : ''}">
									<icure-metadata-buttons-bar
										.metadata="${metadata}"
										.revision="${rev}"
										.versions="${versions !== null && versions !== void 0 ? versions : []}"
										.valueId="${(_v = (0, utils_2.extractSingleValue)((_u = this.valueProvider) === null || _u === void 0 ? void 0 : _u.call(this))) === null || _v === void 0 ? void 0 : _v[0]}"
										.defaultLanguage="${this.defaultLanguage}"
										.selectedLanguage="${this.selectedLanguage}"
										.languages="${this.languages}"
										.handleMetadataChanged="${this.handleMetadataChanged}"
										.handleLanguageSelected="${(iso) => (this.selectedLanguage = iso)}"
										.handleRevisionSelected="${(rev) => (this.selectedRevision = rev)}"
										.ownersProvider="${this.ownersProvider}"
										.existingLanguages="${valueForExistingLanguages !== null && valueForExistingLanguages !== void 0 ? valueForExistingLanguages : undefined}"
									/>
								</div>
						  `
            : ''}
				</div>
				<div class="error">${(_w = this.validationErrorsProvider) === null || _w === void 0 ? void 0 : _w.call(this).map(([, error]) => { var _a; return (0, lit_1.html) `<div>${(_a = this.translationProvider) === null || _a === void 0 ? void 0 : _a.call(this, this.language(), error)}</div>`; })}</div>
			</div>
		`;
    }
    mouseDown() {
        this.mouseCount++;
    }
    mouseUp() {
        var _a, _b, _c, _d, _e, _f, _g;
        this.mouseCount = 0;
        if (!((_c = (_b = (_a = this.view) === null || _a === void 0 ? void 0 : _a.dom) === null || _b === void 0 ? void 0 : _b.classList) === null || _c === void 0 ? void 0 : _c.contains('ProseMirror-focused'))) {
            (_g = (_f = (_e = (_d = this.view) === null || _d === void 0 ? void 0 : _d.dom) === null || _e === void 0 ? void 0 : _e.parentElement) === null || _f === void 0 ? void 0 : _f.querySelectorAll('.companion')) === null || _g === void 0 ? void 0 : _g.forEach((x) => {
                ;
                x.style.display = 'none';
            });
        }
    }
    firstUpdated() {
        var _a;
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const cmp = this;
        const pms = (this.proseMirrorSchema = (0, schema_1.createSchema)(this.schema, (t, c, isC) => (isC ? this.codeColorProvider(t, c) : this.linkColorProvider(t, c)), this.codeContentProvider));
        this.parser = this.makeParser(this.schema, pms);
        this.serializer = this.makeSerializer(this.schema, pms);
        this.primitiveTypeExtractor = this.makePrimitiveExtractor(this.schema);
        this.primitiveTypesExtractor = this.makePrimitivesExtractor(this.schema);
        this.codesExtractor = this.makeCodesExtractor(this.schema);
        this.container = ((_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('editor')) || undefined;
        if (this.container) {
            const br = pms.nodes.hardbreak;
            const hardbreak = (0, prosemirror_commands_1.chainCommands)(prosemirror_commands_1.exitCode, (state, dispatch) => {
                dispatch && dispatch(state.tr.replaceSelectionWith(br.create()).scrollIntoView());
                return true;
            });
            const replaceRangeWithSuggestion = (from, to, sug) => __awaiter(this, void 0, void 0, function* () {
                const link = yield this.linksProvider(sug);
                return (link && cmp.view && cmp.view.state.tr.replaceWith(from, to, pms.text(sug.text, [pms.mark('link', link)]))) || undefined;
            });
            const headingsKeymap = (0, prosemirror_keymap_1.keymap)([1, 2, 3, 4, 5, 6].reduce((acc, idx) => {
                return Object.assign(acc, { [`Mod-ctrl-${idx}`]: (0, prosemirror_commands_1.setBlockType)(pms.nodes.heading, { level: '' + idx }) });
            }, {}));
            //Currently take the first piece of data if it is available
            this.view = new prosemirror_view_1.EditorView(this.container, {
                state: prosemirror_state_1.EditorState.create({
                    doc: undefined,
                    schema: this.proseMirrorSchema,
                    plugins: [
                        (0, prosemirror_history_1.history)(),
                        this.links
                            ? new prosemirror_state_1.Plugin({
                                view(editorView) {
                                    return new selection_companion_1.SelectionCompanion(editorView, () => cmp.mouseCount > 0);
                                },
                            })
                            : null,
                        this.suggestions
                            ? new prosemirror_state_1.Plugin({
                                view(editorView) {
                                    return (cmp.suggestionPalette = new suggestion_palette_1.SuggestionPalette(pms, editorView, (terms) => cmp.suggestionProvider(terms), () => cmp.suggestionStopWords));
                                },
                            })
                            : null,
                        this.suggestions
                            ? (0, prosemirror_keymap_1.keymap)({
                                Tab: () => {
                                    return (cmp.suggestionPalette && this.view && cmp.suggestionPalette.focusOrInsert(this.view, replaceRangeWithSuggestion)) || false;
                                },
                                ArrowUp: () => {
                                    return (cmp.suggestionPalette && cmp.suggestionPalette.arrowUp()) || false;
                                },
                                ArrowDown: () => {
                                    return (cmp.suggestionPalette && cmp.suggestionPalette.arrowDown()) || false;
                                },
                                Enter: () => {
                                    return (cmp.suggestionPalette && this.view && cmp.suggestionPalette.insert(this.view, replaceRangeWithSuggestion)) || false;
                                },
                            })
                            : null,
                        (0, prosemirror_keymap_1.keymap)({ 'Mod-z': prosemirror_history_1.undo, 'Mod-Shift-z': prosemirror_history_1.redo }),
                        (0, prosemirror_keymap_1.keymap)(Object.assign({}, pms.marks.strong ? { 'Mod-b': (0, prosemirror_commands_1.toggleMark)(pms.marks.strong) } : {}, pms.marks.em ? { 'Mod-i': (0, prosemirror_commands_1.toggleMark)(pms.marks.em) } : {}, pms.nodes.paragraph ? { 'Alt-ArrowUp': prosemirror_commands_1.joinUp } : {}, pms.nodes.paragraph ? { 'Alt-ArrowDown': prosemirror_commands_1.joinDown } : {}, pms.nodes.paragraph ? { 'Alt-Enter': hardbreak } : {}, pms.nodes.paragraph ? { 'Shift-Enter': hardbreak } : {}, pms.nodes.ordered_list ? { 'Shift-ctrl-1': (0, prosemirror_schema_list_1.wrapInList)(pms.nodes.ordered_list) } : {}, pms.nodes.bullet_list ? { 'Shift-ctrl-*': (0, prosemirror_schema_list_1.wrapInList)(pms.nodes.bullet_list) } : {}, pms.nodes.blockquote ? { 'Shift-ctrl-w': (0, prosemirror_commands_2.wrapInIfNeeded)(pms.nodes.blockquote) } : {}, pms.nodes.blockquote ? { 'Shift-ctrl-u': (0, prosemirror_commands_2.unwrapFrom)(pms.nodes.blockquote) } : {}, pms.nodes.paragraph ? { 'Mod-ctrl-0': (0, prosemirror_commands_1.setBlockType)(pms.nodes.paragraph) } : {}, pms.nodes.paragraph ? { 'Shift-ctrl-0': (0, prosemirror_commands_1.setBlockType)(pms.nodes.paragraph) } : {}, pms.nodes.list_item ? { Enter: (0, prosemirror_schema_list_1.splitListItem)(pms.nodes.list_item) } : {}, pms.nodes.ordered_list || pms.nodes.bullet_list ? { 'Mod-(': (0, prosemirror_schema_list_1.liftListItem)(pms.nodes.list_item) } : {}, pms.nodes.ordered_list || pms.nodes.bullet_list ? { 'Mod-[': (0, prosemirror_schema_list_1.liftListItem)(pms.nodes.list_item) } : {}, pms.nodes.ordered_list || pms.nodes.bullet_list ? { 'Mod-)': (0, prosemirror_schema_list_1.sinkListItem)(pms.nodes.list_item) } : {}, pms.nodes.ordered_list || pms.nodes.bullet_list ? { 'Mod-]': (0, prosemirror_schema_list_1.sinkListItem)(pms.nodes.list_item) } : {})),
                        pms.nodes.heading ? headingsKeymap : null,
                        (0, mask_plugin_1.maskPlugin)(),
                        (0, regexp_plugin_1.regexpPlugin)(),
                        (0, has_content_class_plugin_1.hasContentClassPlugin)(this.shadowRoot || undefined),
                        (0, prosemirror_keymap_1.keymap)(prosemirror_commands_1.baseKeymap),
                    ]
                        .filter((x) => !!x)
                        .map((x) => x),
                }),
                handleDOMEvents: {
                    blur: (view) => {
                        this.trToSave = undefined;
                        this.updateValue(view.state.tr);
                    },
                    focus: (view) => {
                        this.schema === 'measure' && (0, measure_schema_1.measureOnFocusHandler)(view);
                    },
                    click: (view, event) => {
                        var _a;
                        if (this.schema.includes('tokens-list')) {
                            const el = event.target;
                            if ((el === null || el === void 0 ? void 0 : el.classList.contains('token')) && Math.abs(el.getBoundingClientRect().right - 10 - event.x) < 6 && Math.abs(el.getBoundingClientRect().bottom - 9 - event.y) < 6) {
                                const pos = view.posAtCoords({ left: event.x, top: event.y });
                                if (pos === null || pos === void 0 ? void 0 : pos.pos) {
                                    const rp = view.state.tr.doc.resolve(pos === null || pos === void 0 ? void 0 : pos.pos);
                                    (_a = this.view) === null || _a === void 0 ? void 0 : _a.dispatch(view.state.tr.deleteRange(rp.before(), rp.after()));
                                }
                            }
                        }
                    },
                },
                dispatchTransaction: (tro) => {
                    const tr = this.schema === 'measure' ? (0, measure_schema_1.measureTransactionMapper)(tro) : tro;
                    console.log(`Setting selection to ${tr.selection.from} - ${tr.selection.to}`);
                    this.view && this.view.updateState(this.view.state.apply(tr));
                    if (this.view && tr.doc != tr.before && this.handleValueChanged) {
                        this.trToSave = tr;
                        setTimeout(() => {
                            // eslint-disable-next-line max-len
                            if (this.trToSave === tr) {
                                this.updateValue(tr);
                            }
                        }, 10000);
                    }
                },
                editable: () => {
                    return !this.readonly;
                },
            });
        }
    }
    makeParser(schemaName, pms) {
        const tokenizer = (0, markdown_it_1.default)('commonmark', { html: false });
        return schemaName.includes('tokens-list')
            ? {
                parse: (value, id, renderHash) => {
                    return pms.node('token', { id, renderHash }, value.value ? [pms.text(value.value)] : []);
                },
            }
            : schemaName.includes('items-list')
                ? {
                    parse: (value, id, renderHash) => {
                        return pms.node('item', { id, renderHash }, value.value ? [pms.text(value.value)] : []);
                    },
                }
                : schemaName === 'date'
                    ? {
                        parse: (value) => {
                            var _a, _b;
                            if ((value === null || value === void 0 ? void 0 : value.type) === 'datetime') {
                                const dateString = (_a = (0, dates_1.anyDateToDate)(value.value)) === null || _a === void 0 ? void 0 : _a.toISOString().replace(/T.*/, '');
                                return pms.node('paragraph', {}, [pms.node('date', {}, value ? [pms.text(dateString !== null && dateString !== void 0 ? dateString : '')] : [])]);
                            }
                            else if ((value === null || value === void 0 ? void 0 : value.type) === 'timestamp') {
                                const dateString = (_b = new Date(value.value)) === null || _b === void 0 ? void 0 : _b.toISOString().replace(/T.*/, '');
                                return pms.node('paragraph', {}, [pms.node('date', {}, value ? [pms.text(dateString !== null && dateString !== void 0 ? dateString : '')] : [])]);
                            }
                            return undefined;
                        },
                    }
                    : schemaName === 'time'
                        ? {
                            parse: (value) => {
                                const time = value.type === 'number'
                                    ? pms.node('paragraph', {}, [
                                        pms.node('time', {}, value
                                            ? [pms.text(('00' + Math.floor(value.value / 10000)).slice(-2) + ':' + ('00' + Math.floor((value.value / 100) % 100)).slice(-2) + ':' + ('00' + (value.value % 100)).slice(-2))]
                                            : []),
                                    ])
                                    : value.type === 'datetime'
                                        ? pms.node('paragraph', {}, [
                                            pms.node('time', {}, value
                                                ? [pms.text(('00' + Math.floor(value.value / 10000)).slice(-2) + ':' + ('00' + Math.floor((value.value / 100) % 100)).slice(-2) + ':' + ('00' + (value.value % 100)).slice(-2))]
                                                : []),
                                        ])
                                        : undefined;
                                console.log(`Parsing time ${value.value} to: ${time}`);
                                return time;
                            },
                        }
                        : schemaName === 'measure'
                            ? {
                                parse: (value) => {
                                    var _a, _b;
                                    if (value.type !== 'measure') {
                                        return undefined;
                                    }
                                    const decimal = (_b = (_a = value.value) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '';
                                    const unit = value.unit;
                                    return pms.node('paragraph', {}, [pms.node('decimal', {}, decimal && decimal.length ? [pms.text(decimal)] : [])].concat(unit && unit.length ? [pms.node('unit', {}, [pms.text(unit)])] : []));
                                },
                            }
                            : schemaName === 'decimal'
                                ? {
                                    parse: (value) => {
                                        return value.type === 'number' ? pms.node('paragraph', {}, [pms.node('decimal', {}, [pms.text(value.value.toString())])]) : undefined;
                                    },
                                }
                                : schemaName === 'date-time'
                                    ? {
                                        parse: (value) => {
                                            var _a, _b;
                                            if (value.type !== 'datetime') {
                                                return undefined;
                                            }
                                            const date = (_a = (0, dates_1.anyDateToDate)(value.value)) === null || _a === void 0 ? void 0 : _a.toISOString().replace(/T.*/, '');
                                            const time = (_b = (0, dates_1.anyDateToDate)(value.value)) === null || _b === void 0 ? void 0 : _b.toISOString().replace(/.+?T(..):(..).*/, '$1:$2');
                                            return pms.node('paragraph', {}, [
                                                pms.node('date', {}, date && date.length ? [pms.text(date)] : [pms.text(' ')]),
                                                pms.node('time', {}, time && time.length ? [pms.text(time)] : [pms.text(' ')]),
                                            ]);
                                        },
                                    }
                                    : schemaName === 'text-document'
                                        ? new markdown_1.SpacePreservingMarkdownParser(new prosemirror_markdown_1.MarkdownParser(pms, (0, markdown_it_1.default)('commonmark', { html: false }), {
                                            blockquote: { block: 'blockquote' },
                                            paragraph: { block: 'paragraph' },
                                            list_item: { block: 'list_item' },
                                            bullet_list: { block: 'bullet_list' },
                                            ordered_list: { block: 'ordered_list', getAttrs: (tok) => ({ order: +(tok.attrGet('start') || 1) }) },
                                            heading: { block: 'heading', getAttrs: (tok) => ({ level: +tok.tag.slice(1) }) },
                                            hr: { node: 'horizontal_rule' },
                                            image: {
                                                node: 'image',
                                                getAttrs: (tok) => {
                                                    var _a;
                                                    return ({
                                                        src: tok.attrGet('src'),
                                                        title: tok.attrGet('title') || null,
                                                        alt: ((_a = (tok.children || [])[0]) === null || _a === void 0 ? void 0 : _a.content) || null,
                                                    });
                                                },
                                            },
                                            hardbreak: { node: 'hardbreak' },
                                            em: (0, prosemirror_utils_1.hasMark)(pms.spec.marks, 'em') ? { mark: 'em' } : { ignore: true },
                                            strong: (0, prosemirror_utils_1.hasMark)(pms.spec.marks, 'strong') ? { mark: 'strong' } : { ignore: true },
                                            link: (0, prosemirror_utils_1.hasMark)(pms.spec.marks, 'link')
                                                ? {
                                                    mark: 'link',
                                                    getAttrs: (tok) => ({
                                                        href: tok.attrGet('href'),
                                                        title: tok.attrGet('title') || null,
                                                    }),
                                                }
                                                : { ignore: true },
                                        }))
                                        : new markdown_1.SpacePreservingMarkdownParser(new prosemirror_markdown_1.MarkdownParser(pms, {
                                            parse: (src, env) => {
                                                return tokenizer.parse(src, env).filter((t) => !t.type.startsWith('paragraph_'));
                                            },
                                        }, {
                                            em: (0, prosemirror_utils_1.hasMark)(pms.spec.marks, 'em') ? { mark: 'em' } : { ignore: true },
                                            strong: (0, prosemirror_utils_1.hasMark)(pms.spec.marks, 'strong') ? { mark: 'strong' } : { ignore: true },
                                            link: (0, prosemirror_utils_1.hasMark)(pms.spec.marks, 'link')
                                                ? {
                                                    mark: 'link',
                                                    getAttrs: (tok) => ({
                                                        href: tok.attrGet('href'),
                                                        title: tok.attrGet('title') || null,
                                                    }),
                                                }
                                                : { ignore: true },
                                        }));
    }
    makeSerializer(schemaName, pms) {
        return schemaName === 'text-document'
            ? {
                serialize: (content) => prosemirror_markdown_1.defaultMarkdownSerializer.serialize((0, markdown_1.preprocessEmptyNodes)(content, pms)),
            }
            : {
                serialize: (content) => content.textBetween(0, content.nodeSize - 2, ' '),
            };
    }
    makeCodesExtractor(schemaName) {
        return schemaName === 'measure'
            ? (doc) => {
                var _a, _b, _c, _d;
                const unit = ((_a = doc === null || doc === void 0 ? void 0 : doc.childCount) !== null && _a !== void 0 ? _a : 0) > 1 ? (_b = doc === null || doc === void 0 ? void 0 : doc.child(1)) === null || _b === void 0 ? void 0 : _b.textContent : undefined;
                return unit ? [{ id: `CD-UNIT|${unit}|1`, label: { [(_d = (_c = this.selectedLanguage) !== null && _c !== void 0 ? _c : this.defaultLanguage) !== null && _d !== void 0 ? _d : 'en']: unit } }] : [];
            }
            : schemaName === 'measure'
                ? (doc) => {
                    var _a, _b, _c;
                    const unit = (_a = doc === null || doc === void 0 ? void 0 : doc.child(1)) === null || _a === void 0 ? void 0 : _a.textContent;
                    return unit ? [{ id: `CD-UNIT|${unit}|1`, label: { [(_c = (_b = this.selectedLanguage) !== null && _b !== void 0 ? _b : this.defaultLanguage) !== null && _c !== void 0 ? _c : 'en']: unit } }] : [];
                }
                : () => [];
    }
    makePrimitiveExtractor(schemaName) {
        return schemaName === 'date'
            ? (doc) => { var _a; return (((_a = doc === null || doc === void 0 ? void 0 : doc.firstChild) === null || _a === void 0 ? void 0 : _a.textContent) ? { type: 'datetime', value: parseInt((0, date_fns_1.format)((0, date_fns_1.parse)(doc.firstChild.textContent, 'dd/MM/yyyy', new Date()), 'yyyyMMdd')) } : undefined); }
            : schemaName === 'time'
                ? (doc) => {
                    var _a;
                    if (((_a = doc === null || doc === void 0 ? void 0 : doc.firstChild) === null || _a === void 0 ? void 0 : _a.textContent) && !doc.firstChild.textContent.startsWith('--:')) {
                        const value = parseInt((0, date_fns_1.format)((0, date_fns_1.parse)(doc.firstChild.textContent.replaceAll('-', '0'), 'HH:mm:ss', new Date()), 'HHmmss'));
                        console.log(`Converted time to: ${value}`);
                        return {
                            type: 'datetime',
                            value: value,
                        };
                    }
                    else {
                        return undefined;
                    }
                }
                : schemaName === 'measure'
                    ? (doc) => {
                        var _a, _b;
                        return ({
                            type: 'measure',
                            value: (() => {
                                var _a, _b;
                                if ((_b = (_a = doc === null || doc === void 0 ? void 0 : doc.firstChild) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.length) {
                                    const parsed = parseFloat(doc.firstChild.textContent.replaceAll(',', '.'));
                                    return isNaN(parsed) ? undefined : parsed;
                                }
                                else {
                                    return undefined;
                                }
                            })(),
                            unit: ((_a = doc === null || doc === void 0 ? void 0 : doc.childCount) !== null && _a !== void 0 ? _a : 0) > 1 ? (_b = doc === null || doc === void 0 ? void 0 : doc.child(1)) === null || _b === void 0 ? void 0 : _b.textContent : undefined,
                        });
                    }
                    : schemaName === 'decimal'
                        ? (doc) => { var _a, _b; return (((_b = (_a = doc === null || doc === void 0 ? void 0 : doc.firstChild) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.length) ? { type: 'number', value: parseFloat(doc.firstChild.textContent.replace(/,/g, '.')) } : undefined); }
                        : schemaName === 'date-time'
                            ? (doc) => {
                                var _a, _b;
                                return ((_a = doc === null || doc === void 0 ? void 0 : doc.firstChild) === null || _a === void 0 ? void 0 : _a.textContent) && ((_b = doc === null || doc === void 0 ? void 0 : doc.lastChild) === null || _b === void 0 ? void 0 : _b.textContent)
                                    ? {
                                        type: 'datetime',
                                        value: parseInt((0, date_fns_1.format)((0, date_fns_1.parse)(doc.firstChild.textContent + ' ' + doc.lastChild.textContent, 'dd/MM/yyyy HH:mm:ss', new Date()), 'yyyyMMddHHmmss')),
                                    }
                                    : undefined;
                            }
                            : (doc) => (doc ? { type: 'string', value: this.serializer.serialize(doc) } : undefined);
    }
    makePrimitivesExtractor(schemaName) {
        return schemaName.includes('tokens-list') || schemaName.includes('items-list')
            ? (doc) => (doc === null || doc === void 0 ? void 0 : doc.childCount)
                ? [...Array(doc.childCount).keys()].map((idx) => {
                    var _a;
                    const child = doc.child(idx);
                    const id = (_a = child.attrs.id) !== null && _a !== void 0 ? _a : '';
                    return [id, { type: 'string', value: this.serializer.serialize(child) }];
                })
                : []
            : () => [];
    }
}
exports.IcureTextField = IcureTextField;
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Object)
], IcureTextField.prototype, "placeholder", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Object)
], IcureTextField.prototype, "multiline", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Object)
], IcureTextField.prototype, "lines", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Set)
], IcureTextField.prototype, "suggestionStopWords", void 0);
__decorate([
    (0, decorators_js_1.property)({ type: Boolean }),
    __metadata("design:type", Object)
], IcureTextField.prototype, "displayOwnerMenu", void 0);
__decorate([
    (0, decorators_js_1.property)({ type: Boolean }),
    __metadata("design:type", Object)
], IcureTextField.prototype, "suggestions", void 0);
__decorate([
    (0, decorators_js_1.property)({ type: Boolean }),
    __metadata("design:type", Object)
], IcureTextField.prototype, "links", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Function)
], IcureTextField.prototype, "linksProvider", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Function)
], IcureTextField.prototype, "suggestionProvider", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Function)
], IcureTextField.prototype, "codeColorProvider", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Function)
], IcureTextField.prototype, "linkColorProvider", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", Function)
], IcureTextField.prototype, "codeContentProvider", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", String)
], IcureTextField.prototype, "schema", void 0);
__decorate([
    (0, decorators_js_1.state)(),
    __metadata("design:type", prosemirror_view_1.EditorView)
], IcureTextField.prototype, "view", void 0);
// Register the new element with the browser.
class MetadataButtonBarWrapper extends lit_1.LitElement {
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        console.log('Rendering metadata buttons');
        const parent = (_d = (_c = (_b = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.host) === null || _b === void 0 ? void 0 : _b.closest('div#root')) === null || _c === void 0 ? void 0 : _c.parentNode) === null || _d === void 0 ? void 0 : _d.host;
        if (!parent || !this.id) {
            return;
        }
        const data = (_f = (_e = parent.valueProvider) === null || _e === void 0 ? void 0 : _e.call(parent)) !== null && _f !== void 0 ? _f : {};
        const versions = data[this.id];
        const version = this.selectedRevision ? versions === null || versions === void 0 ? void 0 : versions.find((v) => v.revision === this.selectedRevision) : versions === null || versions === void 0 ? void 0 : versions[0];
        const rev = version === null || version === void 0 ? void 0 : version.revision;
        const metadata = this.id && rev !== undefined ? (_l = (_k = (_j = (_g = parent.metadataProvider) === null || _g === void 0 ? void 0 : _g.call(parent, this.id, (_h = versions === null || versions === void 0 ? void 0 : versions.map((v) => v.revision)) !== null && _h !== void 0 ? _h : [])) === null || _j === void 0 ? void 0 : _j[this.id]) === null || _k === void 0 ? void 0 : _k.find((m) => m.revision === rev)) === null || _l === void 0 ? void 0 : _l.value : undefined;
        const op = (terms, ids, specialties) => {
            return parent.ownersProvider(terms, ids, specialties);
        };
        return (0, lit_1.html) `<icure-metadata-buttons-bar .metadata="${metadata}" .revision="${rev}" .versions="${versions}" .valueId="${(_o = (0, utils_2.extractSingleValue)((_m = parent.valueProvider) === null || _m === void 0 ? void 0 : _m.call(parent))) === null || _o === void 0 ? void 0 : _o[0]}"
		.defaultLanguage="${parent.defaultLanguage}" .selectedLanguage="${parent.selectedLanguage}" .languages="${parent.languages}" .handleMetadataChanged="${parent.handleMetadataChanged}"
		.handleLanguageSelected="${(iso) => (parent.selectedLanguage = iso)}" .handleRevisionSelected="${(rev) => (parent.selectedRevision = rev)}" .ownersProvider="${op}"
		style="white-space: nowrap; padding-top: 1px" " />`;
    }
}
exports.MetadataButtonBarWrapper = MetadataButtonBarWrapper;
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", String)
], MetadataButtonBarWrapper.prototype, "id", void 0);
__decorate([
    (0, decorators_js_1.property)(),
    __metadata("design:type", String)
], MetadataButtonBarWrapper.prototype, "rerender", void 0);
__decorate([
    (0, decorators_js_1.state)(),
    __metadata("design:type", String)
], MetadataButtonBarWrapper.prototype, "selectedRevision", void 0);
//# sourceMappingURL=index.js.map