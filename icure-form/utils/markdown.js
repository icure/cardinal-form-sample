"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preprocessEmptyNodes = exports.SpacePreservingMarkdownParser = void 0;
const prosemirror_model_1 = require("prosemirror-model");
class SpacePreservingMarkdownParser {
    constructor(mkdp) {
        this.mkdp = mkdp;
    }
    parse(primitiveValue) {
        var _a;
        if (primitiveValue.type !== 'string') {
            return null;
        }
        const value = primitiveValue.value;
        const node = this.mkdp.parse(value);
        const trailingSpaces = (_a = value.match(/([ ]+)$/)) === null || _a === void 0 ? void 0 : _a[1];
        if (node && trailingSpaces) {
            const appendTextToLastTextChild = (node, text) => {
                if (node.isText) {
                    return node.withText(node.text + text);
                }
                const lastChild = node.lastChild;
                if (lastChild) {
                    return node.copy(node.content.replaceChild(node.childCount - 1, appendTextToLastTextChild(lastChild, text)));
                }
                return node;
            };
            return appendTextToLastTextChild(node, trailingSpaces);
        }
        return node;
    }
}
exports.SpacePreservingMarkdownParser = SpacePreservingMarkdownParser;
const preprocessEmptyNodes = (node, schema) => {
    var _a;
    const content = node.content;
    if (node.isText) {
        return node.withText(((_a = node.text) !== null && _a !== void 0 ? _a : '').replace(/^( +)/g, (x) => x.replace(/ /g, '\u00a0')));
    }
    if (node.isBlock && node.type.name === 'paragraph' && content.size === 0) {
        return node.copy(prosemirror_model_1.Fragment.fromArray([schema.text('\u00a0')]));
    }
    if (content.childCount === 0) {
        return node;
    }
    let idx = 0;
    const iterate = {
        next: () => {
            if (content.childCount === idx)
                return { value: content.child(idx - 1), done: true };
            return { value: content.child(idx++), done: false };
        },
        [Symbol.iterator]() {
            return this;
        },
    };
    const originals = Array.from(iterate);
    const treated = originals.map((n) => (0, exports.preprocessEmptyNodes)(n, schema));
    return node.copy(prosemirror_model_1.Fragment.fromArray(treated));
};
exports.preprocessEmptyNodes = preprocessEmptyNodes;
//# sourceMappingURL=markdown.js.map