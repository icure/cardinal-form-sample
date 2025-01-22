"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasContentClassPlugin = void 0;
const prosemirror_state_1 = require("prosemirror-state");
const hasContentClassPlugin = function (root) {
    return new prosemirror_state_1.Plugin({
        view: (v) => {
            var _a, _b;
            v.state.doc.textContent && v.state.doc.textContent.length && ((_b = (_a = root === null || root === void 0 ? void 0 : root.getElementById('root')) === null || _a === void 0 ? void 0 : _a.classList) === null || _b === void 0 ? void 0 : _b.add('has-content'));
            return {
                update: (v) => {
                    var _a, _b, _c, _d;
                    v.state.doc.textContent && v.state.doc.textContent.length
                        ? (_b = (_a = root === null || root === void 0 ? void 0 : root.getElementById('root')) === null || _a === void 0 ? void 0 : _a.classList) === null || _b === void 0 ? void 0 : _b.add('has-content')
                        : (_d = (_c = root === null || root === void 0 ? void 0 : root.getElementById('root')) === null || _c === void 0 ? void 0 : _c.classList) === null || _d === void 0 ? void 0 : _d.remove('has-content');
                },
            };
        },
    });
};
exports.hasContentClassPlugin = hasContentClassPlugin;
//# sourceMappingURL=has-content-class-plugin.js.map