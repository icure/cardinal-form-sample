"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = exports.TranslationTable = exports.Codification = exports.Section = exports.Subform = exports.Group = exports.Button = exports.Label = exports.CheckBox = exports.RadioButton = exports.DropdownField = exports.DateTimePicker = exports.TimePicker = exports.DatePicker = exports.ItemsListField = exports.TokenField = exports.NumberField = exports.MeasureField = exports.TextField = exports.Field = exports.pteq = void 0;
const pteq = (a, b) => {
    if (a === b) {
        return true;
    }
    if (a === undefined || b === undefined) {
        return false;
    }
    if ((a === null || a === void 0 ? void 0 : a.type) !== (b === null || b === void 0 ? void 0 : b.type)) {
        return false;
    }
    if (a.value === b.value && (a.type !== 'measure' || b.type !== 'measure' || a.unit === b.unit)) {
        return true;
    }
    if (a.type === 'compound' && b.type === 'compound') {
        return Object.keys(a.value).every((k) => (0, exports.pteq)(a.value[k], b.value[k]));
    }
    return false;
};
exports.pteq = pteq;
class Field {
    label() {
        return this.field;
    }
    constructor(type, label, { shortLabel, grows, span, rowSpan, schema, tags, codifications, readonly, options, labels, value, unit, multiline, computedProperties, validators, now, translate, width, styleOptions, hasOther, event, payload, }) {
        this.clazz = 'field';
        this.field = label;
        this.type = type;
        this.shortLabel = shortLabel;
        this.grows = grows === undefined ? true : grows;
        this.span = span;
        this.rowSpan = rowSpan;
        this.schema = schema;
        this.tags = tags;
        this.codifications = codifications;
        this.readonly = readonly || false;
        this.options = options;
        this.labels = labels;
        this.value = value;
        this.unit = unit;
        this.multiline = multiline || false;
        this.computedProperties = computedProperties;
        this.validators = validators;
        this.now = now;
        this.translate = translate !== null && translate !== void 0 ? translate : true;
        this.width = width;
        this.styleOptions = styleOptions;
        this.hasOther = hasOther;
        this.event = event;
        this.payload = payload;
    }
    static parse(json) {
        var _a, _b, _c;
        return ((_c = (_b = (_a = {
            'text-field': () => new TextField(json.field, Object.assign({}, json)),
            'measure-field': () => new MeasureField(json.field, Object.assign({}, json)),
            'token-field': () => new TokenField(json.field, Object.assign({}, json)),
            'items-list-field': () => new ItemsListField(json.field, Object.assign({}, json)),
            'number-field': () => new NumberField(json.field, Object.assign({}, json)),
            'date-picker': () => new DatePicker(json.field, Object.assign({}, json)),
            'time-picker': () => new TimePicker(json.field, Object.assign({}, json)),
            'date-time-picker': () => new DateTimePicker(json.field, Object.assign({}, json)),
            dropdown: () => new DropdownField(json.field, Object.assign({}, json)),
            'radio-button': () => new RadioButton(json.field, Object.assign({}, json)),
            checkbox: () => new CheckBox(json.field, Object.assign({}, json)),
            label: () => new Label(json.field, Object.assign({}, json)),
            action: () => new Button(json.field, Object.assign({}, json)),
        })[json.type]) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : new TextField(json.field, Object.assign({}, json)));
    }
    // noinspection JSUnusedGlobalSymbols
    toJson() {
        var _a;
        return {
            field: this.field,
            type: this.type,
            shortLabel: this.shortLabel,
            grows: this.grows,
            span: this.span,
            schema: (_a = this.schema) === null || _a === void 0 ? void 0 : _a.toString(),
            tags: this.tags,
            codifications: this.codifications,
            options: this.options,
            labels: this.labels,
            value: this.value,
            unit: this.unit,
            multiline: this.multiline,
            computedProperties: this.computedProperties,
            now: this.now,
            translate: this.translate,
            sortOptions: this.sortOptions,
            width: this.width,
            styleOptions: this.styleOptions,
        };
    }
}
exports.Field = Field;
class TextField extends Field {
    constructor(label, { shortLabel, grows, span, rowSpan, schema, tags, codifications, readonly, options, labels, value, unit, multiline, computedProperties, validators, translate, width, styleOptions, }) {
        super('text-field', label, {
            shortLabel,
            grows,
            span,
            rowSpan,
            schema: schema || 'styled-text-with-codes',
            tags,
            codifications,
            readonly,
            options,
            labels,
            value,
            unit,
            multiline: multiline,
            computedProperties,
            validators,
            translate,
            width,
            styleOptions,
        });
    }
    copy(properties) {
        return new TextField(this.field, Object.assign(Object.assign({}, this), properties));
    }
}
exports.TextField = TextField;
class MeasureField extends Field {
    constructor(label, { shortLabel, grows, span, rowSpan, tags, codifications, readonly, options, labels, value, unit, computedProperties, validators, translate, width, styleOptions, }) {
        super('measure-field', label, {
            shortLabel,
            grows,
            span,
            rowSpan,
            tags,
            codifications,
            readonly,
            options,
            labels,
            value,
            unit,
            computedProperties,
            validators,
            translate,
            width,
            styleOptions,
        });
    }
    copy(properties) {
        return new MeasureField(this.field, Object.assign(Object.assign({}, this), properties));
    }
}
exports.MeasureField = MeasureField;
class NumberField extends Field {
    constructor(label, { shortLabel, grows, span, rowSpan, tags, codifications, readonly, options, labels, value, unit, computedProperties, validators, translate, width, styleOptions, }) {
        super('number-field', label, {
            shortLabel,
            grows,
            span,
            rowSpan,
            tags,
            codifications,
            readonly,
            options,
            labels,
            value,
            unit,
            computedProperties,
            validators,
            translate,
            width,
            styleOptions,
        });
    }
    copy(properties) {
        return new NumberField(this.field, Object.assign(Object.assign({}, this), properties));
    }
}
exports.NumberField = NumberField;
class TokenField extends Field {
    constructor(label, { shortLabel, grows, span, rowSpan, tags, codifications, readonly, options, labels, value, unit, computedProperties, validators, translate, width, styleOptions, }) {
        super('token-field', label, {
            shortLabel,
            grows,
            span,
            rowSpan,
            tags,
            codifications,
            readonly,
            options,
            labels,
            value,
            unit,
            computedProperties,
            validators,
            translate,
            width,
            styleOptions,
        });
    }
    copy(properties) {
        return new TokenField(this.field, Object.assign(Object.assign({}, this), properties));
    }
}
exports.TokenField = TokenField;
class ItemsListField extends Field {
    constructor(label, { shortLabel, grows, span, rowSpan, tags, codifications, readonly, options, labels, value, unit, computedProperties, validators, translate, width, styleOptions, }) {
        super('items-list-field', label, {
            shortLabel,
            grows,
            span,
            rowSpan,
            tags,
            codifications,
            readonly,
            options,
            labels,
            value,
            unit,
            computedProperties,
            validators,
            translate,
            width,
            styleOptions,
        });
    }
    copy(properties) {
        return new ItemsListField(this.field, Object.assign(Object.assign({}, this), properties));
    }
}
exports.ItemsListField = ItemsListField;
class DatePicker extends Field {
    constructor(label, { shortLabel, grows, span, rowSpan, tags, codifications, readonly, options, labels, value, unit, computedProperties, validators, now, translate, width, styleOptions, }) {
        super('date-picker', label, {
            shortLabel,
            grows,
            span,
            rowSpan,
            tags,
            codifications,
            readonly,
            options,
            labels,
            value,
            unit,
            computedProperties,
            validators,
            now,
            translate,
            width,
            styleOptions,
        });
    }
    copy(properties) {
        return new DatePicker(this.field, Object.assign(Object.assign({}, this), properties));
    }
}
exports.DatePicker = DatePicker;
class TimePicker extends Field {
    constructor(label, { shortLabel, grows, span, rowSpan, tags, codifications, readonly, options, labels, value, unit, computedProperties, validators, now, translate, width, styleOptions, }) {
        super('time-picker', label, {
            shortLabel,
            grows,
            span,
            rowSpan,
            tags,
            codifications,
            readonly,
            options,
            labels,
            value,
            unit,
            computedProperties,
            validators,
            now,
            translate,
            width,
            styleOptions,
        });
    }
    copy(properties) {
        return new TimePicker(this.field, Object.assign(Object.assign({}, this), properties));
    }
}
exports.TimePicker = TimePicker;
class DateTimePicker extends Field {
    constructor(label, { shortLabel, grows, span, rowSpan, tags, codifications, readonly, options, labels, value, unit, computedProperties, validators, now, translate, width, styleOptions, }) {
        super('date-time-picker', label, {
            shortLabel,
            grows,
            span,
            rowSpan,
            tags,
            codifications,
            readonly,
            options,
            labels,
            value,
            unit,
            computedProperties,
            validators,
            now,
            translate,
            width,
            styleOptions,
        });
    }
    copy(properties) {
        return new DateTimePicker(this.field, Object.assign(Object.assign({}, this), properties));
    }
}
exports.DateTimePicker = DateTimePicker;
class DropdownField extends Field {
    constructor(label, options) {
        var _a;
        super('dropdown-field', label, {
            shortLabel: options.shortLabel,
            grows: options.grows,
            span: options.span,
            tags: options.tags,
            codifications: options.codifications,
            options: options.options,
            labels: options.labels,
            validators: options.validators,
            value: options.value,
            computedProperties: options.computedProperties,
            translate: options.translate,
            width: options.width,
            styleOptions: options.styleOptions,
        });
        this.sortOptions = (_a = options.sortOptions) !== null && _a !== void 0 ? _a : undefined;
    }
    copy(properties) {
        return new DropdownField(this.field, Object.assign(Object.assign({}, this), properties));
    }
}
exports.DropdownField = DropdownField;
class RadioButton extends Field {
    constructor(label, { shortLabel, grows, span, rowSpan, tags, codifications, readonly, options, value, computedProperties, validators, translate, sortOptions, width, styleOptions, hasOther, }) {
        super('radio-button', label, {
            shortLabel,
            grows,
            span,
            rowSpan,
            tags,
            codifications,
            readonly,
            options,
            value,
            computedProperties,
            validators,
            translate,
            width,
            styleOptions,
            hasOther,
        });
        this.sortOptions = sortOptions !== null && sortOptions !== void 0 ? sortOptions : undefined;
    }
    copy(properties) {
        return new RadioButton(this.field, Object.assign(Object.assign({}, this), properties));
    }
}
exports.RadioButton = RadioButton;
class CheckBox extends Field {
    constructor(label, { shortLabel, grows, span, rowSpan, tags, codifications, readonly, options, value, computedProperties, validators, translate, sortOptions, width, styleOptions, }) {
        super('checkbox', label, {
            shortLabel,
            grows,
            span,
            rowSpan,
            tags,
            codifications,
            readonly,
            options,
            value,
            computedProperties,
            validators,
            translate,
            width,
            styleOptions,
        });
        this.sortOptions = sortOptions !== null && sortOptions !== void 0 ? sortOptions : undefined;
    }
    copy(properties) {
        return new CheckBox(this.field, Object.assign(Object.assign({}, this), properties));
    }
}
exports.CheckBox = CheckBox;
class Label extends Field {
    constructor(label, { shortLabel, grows, span }) {
        super('label', label, { shortLabel, grows, span });
    }
    copy(properties) {
        return new Label(this.field, Object.assign(Object.assign({}, this), properties));
    }
}
exports.Label = Label;
class Button extends Field {
    constructor(label, { shortLabel, grows, span, event, payload }) {
        super('action', label, { shortLabel, grows, span, event, payload });
    }
    copy(properties) {
        return new Button(this.field, Object.assign(Object.assign({}, this), properties));
    }
}
exports.Button = Button;
class Group {
    constructor(title, fields, { span, rowSpan, borderless, translate, computedProperties, width, styleOptions, }) {
        this.clazz = 'group';
        this.group = title;
        this.fields = fields;
        this.borderless = borderless !== null && borderless !== void 0 ? borderless : false;
        this.translate = translate !== null && translate !== void 0 ? translate : true;
        this.fields = fields;
        this.span = span;
        this.rowSpan = rowSpan;
        this.computedProperties = computedProperties;
        this.width = width;
        this.styleOptions = styleOptions;
    }
    copy(properties) {
        var _a;
        return new Group(this.group, (_a = this.fields) !== null && _a !== void 0 ? _a : [], Object.assign(Object.assign({}, this), properties));
    }
    static parse({ borderless, span, computedProperties, fields, group, translate, width, }) {
        return new Group(group, (fields || []).map((s) => s['group']
            ? Group.parse(s)
            : s['subform'] || s['forms'] || s['refs']
                ? Subform.parse(s)
                : Field.parse(s)), {
            span: span,
            borderless: borderless,
            translate: translate,
            computedProperties: computedProperties,
            width: width,
        });
    }
    toJson() {
        var _a;
        return {
            group: this.group,
            computedProperties: this.computedProperties,
            fields: (_a = this.fields) === null || _a === void 0 ? void 0 : _a.map((f) => f.toJson()),
            borderless: this.borderless,
            translatable: this.translate,
            span: this.span,
            width: this.width,
        };
    }
}
exports.Group = Group;
class Subform {
    constructor(title, forms, { id, shortLabel, span, rowSpan, computedProperties, width, styleOptions, refs, labels, }) {
        this.clazz = 'subform';
        this.id = id || title;
        this.shortLabel = shortLabel;
        this.forms = forms;
        this.span = span;
        this.rowSpan = rowSpan;
        this.computedProperties = computedProperties;
        this.width = width;
        this.styleOptions = styleOptions;
        this.refs = refs;
        this.labels = labels !== null && labels !== void 0 ? labels : {};
    }
    copy(properties) {
        return new Subform(this.id, this.forms, Object.assign(Object.assign({}, this), properties));
    }
    static parse(json) {
        var _a;
        return new Subform(json.subform, (_a = json.forms) !== null && _a !== void 0 ? _a : {}, {
            id: json.id,
            shortLabel: json.shortLabel,
            span: json.span,
            computedProperties: json.computedProperties,
            width: json.width,
            styleOptions: json.styleOptions,
            refs: json.refs,
            labels: json.labels,
        });
    }
    toJson() {
        return {
            subform: this.id,
            shortLabel: this.shortLabel,
            forms: Object.fromEntries(Object.entries(this.forms).map(([k, f]) => [k, f.toJson()])),
            span: this.span,
            computedProperties: this.computedProperties,
            width: this.width,
            styleOptions: this.styleOptions,
        };
    }
}
exports.Subform = Subform;
class Section {
    constructor(title, fields, description, keywords) {
        this.section = title;
        this.fields = fields;
        this.description = description;
        this.keywords = keywords;
    }
    static parse(json) {
        var _a, _b, _c;
        return new Section(json.section, ((_c = (_b = (_a = json.fields) !== null && _a !== void 0 ? _a : json.groups) !== null && _b !== void 0 ? _b : json.sections) !== null && _c !== void 0 ? _c : []).map((s) => s['group']
            ? Group.parse(s)
            : s['subform'] || s['forms'] || s['refs']
                ? Subform.parse(s)
                : Field.parse(s)), json.description, json.keywords);
    }
    toJson() {
        return {
            section: this.section,
            fields: this.fields.map((f) => (f && f.toJson ? f.toJson() : JSON.stringify(f))),
            description: this.description,
            keywords: this.keywords,
        };
    }
}
exports.Section = Section;
class Codification {
    constructor(type, codes) {
        this.type = type;
        this.codes = codes;
    }
    static parse(json) {
        return new Codification(json.type, json.codes.map((code) => {
            const parts = code.id.split('|');
            if (parts.length === 1) {
                return Object.assign(Object.assign({}, code), { id: `${json.type}|${code.id}|1` });
            }
            else if (parts.length === 2) {
                return Object.assign(Object.assign({}, code), { id: `${code.id}|1` });
            }
            else {
                return code;
            }
        }));
    }
    // noinspection JSUnusedGlobalSymbols
    toJson() {
        return {
            type: this.type,
            codes: this.codes,
        };
    }
}
exports.Codification = Codification;
class TranslationTable {
    constructor(language, translations) {
        this.language = language;
        this.translations = translations;
    }
    static parse(json) {
        return new TranslationTable(json.language, json.translations);
    }
    // noinspection JSUnusedGlobalSymbols
    toJson() {
        return {
            language: this.language,
            translations: this.translations,
        };
    }
}
exports.TranslationTable = TranslationTable;
class Form {
    constructor(title, sections, id, description, keywords, codifications, translations) {
        this.form = title;
        this.description = description;
        this.id = id;
        this.keywords = keywords;
        this.sections = sections;
        this.codifications = codifications;
        this.translations = translations;
    }
    static parse(json, library = [], subforms = {}) {
        var _a, _b;
        const parsed = new Form(json.form, (json.sections || []).map((s) => Section.parse(s)), json.id, json.description, json.keywords, (_a = json.codifications) === null || _a === void 0 ? void 0 : _a.map((c) => Codification.parse(c)), (_b = json.translations) === null || _b === void 0 ? void 0 : _b.map((t) => TranslationTable.parse(t)));
        const allSubforms = Object.assign(Object.assign({}, subforms), (json.subForms || {}));
        const resolveAndCheckConsistencyInSubForm = (f, seenSubformId) => {
            var _a, _b;
            if (seenSubformId.includes(f.id)) {
                throw new Error(`Subform ${f.id} is already declared in this form`);
            }
            seenSubformId.push(f.id);
            Object.entries((_a = f.forms) !== null && _a !== void 0 ? _a : {}).forEach(([k, subForm]) => {
                f.forms[k] = Form.parse(Object.assign(Object.assign({}, subForm), { id: k }), library, allSubforms);
            });
            (_b = f.refs) === null || _b === void 0 ? void 0 : _b.forEach((r) => {
                const subForm = allSubforms === null || allSubforms === void 0 ? void 0 : allSubforms[r];
                const form = subForm ? Form.parse(Object.assign(Object.assign({}, subForm), { id: r }), library, allSubforms) : library.find((f) => f.id === r);
                if (!form) {
                    throw new Error(`Subform ${r} not found in top subForms declarations or the provided library of forms`);
                }
                f.forms[r] = form;
            });
            Object.entries(f.forms).forEach(([, f]) => resolveAndCheckConsistencyInForm(f, seenSubformId));
        };
        const resolveAndCheckConsistencyInForm = (f, seenSubformId = []) => {
            f.sections.forEach((s) => {
                s.fields.forEach((f) => {
                    if (f.clazz === 'group') {
                        resolveAndCheckConsistencyInGroup(f, seenSubformId);
                    }
                    else if (f.clazz === 'subform') {
                        resolveAndCheckConsistencyInSubForm(f, seenSubformId);
                    }
                });
            });
            return f;
        };
        const resolveAndCheckConsistencyInGroup = (g, seenSubformId) => {
            var _a;
            (_a = g.fields) === null || _a === void 0 ? void 0 : _a.forEach((f) => {
                if (f.clazz === 'group') {
                    resolveAndCheckConsistencyInGroup(f, seenSubformId);
                }
                else if (f.clazz === 'subform') {
                    resolveAndCheckConsistencyInSubForm(f, seenSubformId);
                }
            });
            return g;
        };
        return resolveAndCheckConsistencyInForm(parsed, []);
    }
    // noinspection JSUnusedGlobalSymbols
    toJson() {
        return {
            form: this.form,
            sections: this.sections.map((s) => s.toJson()),
            description: this.description,
            keywords: this.keywords,
        };
    }
}
exports.Form = Form;
//# sourceMappingURL=index.js.map