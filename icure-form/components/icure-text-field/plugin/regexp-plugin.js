"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regexpPlugin = void 0;
const prosemirror_state_1 = require("prosemirror-state");
const regexpPlugin = function () {
    return new prosemirror_state_1.Plugin({
        props: {
            handleTextInput: (view, from, to, text) => {
                if (view.composing)
                    return false;
                const state = view.state;
                const $from = state.doc.resolve(from);
                const mask = $from.parent.type.spec.mask;
                const regexp = $from.parent.type.spec.regexp;
                if (mask || !regexp)
                    return false; // Will be handled by mask plugin
                const allowedCharacters = text
                    .split('')
                    .filter((x) => x.match(new RegExp(regexp)))
                    .join('');
                if (allowedCharacters === text)
                    return false;
                let tr = state.tr;
                if (allowedCharacters.length) {
                    tr = tr.insertText(allowedCharacters, from, to);
                    tr = tr.setSelection(prosemirror_state_1.TextSelection.create(tr.doc, Math.min(to + allowedCharacters.length, tr.doc.content.size - 1)));
                }
                if (text.startsWith(allowedCharacters)) {
                    const tail = text.substring(allowedCharacters.length);
                    if (tail === null || tail === void 0 ? void 0 : tail.length) {
                        let posMark = tr.selection.$to.pos + 1;
                        while (posMark < tr.doc.content.size) {
                            const nextPos = tr.doc.resolve(posMark);
                            const nextNode = nextPos.node(nextPos.depth);
                            if (nextNode && (nextNode.type.isText || nextNode.type.isTextblock)) {
                                tr = tr.insertText(tail, nextPos.pos, nextPos.pos);
                                tr = tr.setSelection(prosemirror_state_1.TextSelection.create(tr.doc, Math.min(nextPos.pos + tail.length, tr.doc.content.size - 1)));
                                break;
                            }
                            posMark++;
                        }
                    }
                }
                view.dispatch(tr);
                return true;
            },
        },
    });
};
exports.regexpPlugin = regexpPlugin;
//# sourceMappingURL=regexp-plugin.js.map