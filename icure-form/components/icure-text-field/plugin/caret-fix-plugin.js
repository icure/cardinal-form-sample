"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.caretFixPlugin = void 0;
const prosemirror_state_1 = require("prosemirror-state");
const caretFixPlugin = function () {
    let focusing = false;
    return new prosemirror_state_1.Plugin({
        props: {
            handleDOMEvents: {
                focus: (view) => {
                    if (focusing) {
                        focusing = false;
                    }
                    else {
                        focusing = true;
                        setTimeout(() => {
                            ;
                            view.dom.blur();
                            view.dom.focus();
                        }, 0);
                    }
                    return false;
                },
            },
        },
    });
};
exports.caretFixPlugin = caretFixPlugin;
//# sourceMappingURL=caret-fix-plugin.js.map