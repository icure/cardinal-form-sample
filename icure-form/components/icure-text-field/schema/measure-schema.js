"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.measureOnFocusHandler = exports.measureTransactionMapper = exports.getMeasureSpec = void 0;
const prosemirror_state_1 = require("prosemirror-state");
function getMeasureSpec() {
    return {
        topNode: 'paragraph',
        nodes: {
            paragraph: {
                content: 'decimal unit?',
                parseDOM: [{ tag: 'p' }],
            },
            decimal: {
                content: 'inline*',
                group: 'block',
                parseDOM: [{ tag: 'span' }],
                toDOM() {
                    return ['span', { class: 'measure' }, 0];
                },
            },
            unit: {
                content: 'inline*',
                group: 'block',
                parseDOM: [{ tag: 'span.unit' }],
                toDOM() {
                    return ['span', { class: 'unit' }, 0];
                },
                editable: false,
            },
            text: {
                group: 'inline',
            },
        },
        marks: {},
    };
}
exports.getMeasureSpec = getMeasureSpec;
const measureTransactionMapper = (tr) => {
    var _a, _b, _c, _d, _e, _f, _g;
    const decimal = tr.doc.childCount && tr.doc.child(0).type.name === 'decimal' ? tr.doc.child(0) : null;
    const decimalText = (_a = decimal === null || decimal === void 0 ? void 0 : decimal.textContent) !== null && _a !== void 0 ? _a : '';
    const unit = tr.doc.childCount > 1 && tr.doc.child(1).type.name === 'unit' ? tr.doc.child(1) : null;
    const unitText = unit === null || unit === void 0 ? void 0 : unit.textContent;
    const schema = tr.doc.type.schema;
    const from = tr.selection.from;
    console.log(`[${decimalText}] <${unitText}> : ${from} - ${tr.selection.to}`);
    if (decimalText === null || decimalText === void 0 ? void 0 : decimalText.match(/^[0-9.,-]+$/)) {
        return tr;
    }
    const combinedText = (decimalText !== null && decimalText !== void 0 ? decimalText : '') + (unitText !== null && unitText !== void 0 ? unitText : '');
    const newUnitText = combinedText.replace(/^[0-9.,-]*/, '').trimStart();
    const newDecimalText = combinedText.replace(/^([0-9.,-]*) *.*$/, '$1').trim();
    if (newDecimalText === decimalText && newUnitText === unitText) {
        return tr;
    }
    const patchedTr = tr.replaceWith(0, tr.doc.content.size, [
        schema.nodes['paragraph'].create({}, [
            schema.nodes['decimal'].create({}, newDecimalText.length ? [schema.text(newDecimalText)] : []),
            (newUnitText === null || newUnitText === void 0 ? void 0 : newUnitText.length) ? schema.nodes['unit'].create({}, schema.text(newUnitText)) : undefined,
        ].filter((x) => !!x)),
    ]);
    const newFrom = patchedTr.steps.slice(tr.steps.length).reduce((acc, step) => step.getMap().map(acc), from) +
        ((newUnitText === null || newUnitText === void 0 ? void 0 : newUnitText.charAt(0)) !== (unitText === null || unitText === void 0 ? void 0 : unitText.charAt(0)) && ((_b = newUnitText === null || newUnitText === void 0 ? void 0 : newUnitText.length) !== null && _b !== void 0 ? _b : 0) > ((_c = unitText === null || unitText === void 0 ? void 0 : unitText.length) !== null && _c !== void 0 ? _c : 0) ? 2 : 0) +
        (((_d = newDecimalText === null || newDecimalText === void 0 ? void 0 : newDecimalText.length) !== null && _d !== void 0 ? _d : 0) > ((_e = decimalText === null || decimalText === void 0 ? void 0 : decimalText.length) !== null && _e !== void 0 ? _e : 0) && ((_f = newUnitText === null || newUnitText === void 0 ? void 0 : newUnitText.length) !== null && _f !== void 0 ? _f : 0) < ((_g = unitText === null || unitText === void 0 ? void 0 : unitText.length) !== null && _g !== void 0 ? _g : 0) ? -2 : 0);
    return patchedTr.setSelection(prosemirror_state_1.TextSelection.create(patchedTr.doc, Math.min(newFrom, tr.doc.content.size - 1)));
};
exports.measureTransactionMapper = measureTransactionMapper;
const measureOnFocusHandler = (view) => {
    var _a;
    const doc = view.state.tr.doc;
    const decimal = doc.childCount && doc.child(0).type.name === 'decimal' ? doc.child(0) : null;
    const decimalText = (_a = decimal === null || decimal === void 0 ? void 0 : decimal.textContent) !== null && _a !== void 0 ? _a : '';
    const unit = doc.childCount > 1 && doc.child(1).type.name === 'unit' ? doc.child(1) : null;
    const unitText = unit === null || unit === void 0 ? void 0 : unit.textContent;
    if ((unitText === null || unitText === void 0 ? void 0 : unitText.length) && !(decimalText === null || decimalText === void 0 ? void 0 : decimalText.length)) {
        console.log('Setting selection to 1');
        view.dispatch(view.state.tr.setSelection(prosemirror_state_1.TextSelection.create(view.state.tr.doc, 1)));
    }
};
exports.measureOnFocusHandler = measureOnFocusHandler;
//# sourceMappingURL=measure-schema.js.map