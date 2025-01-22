"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unwrapFrom = exports.wrapInIfNeeded = void 0;
const prosemirror_transform_1 = require("prosemirror-transform");
const prosemirror_model_1 = require("prosemirror-model");
const prosemirror_state_1 = require("prosemirror-state");
// :: (NodeType, ?Object) → (state: EditorState, dispatch: ?(tr: Transaction)) → bool
// Wrap the selection in a node of the given type with the given
// attributes.
function wrapInIfNeeded(nodeType, attrs) {
    return function (state, dispatch) {
        var _a, _b;
        const { $from, $to, to } = state.selection;
        const range = $from.blockRange($to);
        if (!range) {
            return false;
        }
        const same = range.$from.sharedDepth(to);
        if (same) {
            const pos = $from.before(same);
            if (((_b = (_a = prosemirror_state_1.NodeSelection.create(state.doc, pos).$from) === null || _a === void 0 ? void 0 : _a.node()) === null || _b === void 0 ? void 0 : _b.type) === nodeType) {
                return false;
            }
        }
        const wrapping = range && (0, prosemirror_transform_1.findWrapping)(range, nodeType, attrs);
        if (!wrapping || !range)
            return false;
        if (dispatch)
            dispatch(state.tr.wrap(range, wrapping).scrollIntoView());
        return true;
    };
}
exports.wrapInIfNeeded = wrapInIfNeeded;
// :: (NodeType, ?Object) → (state: EditorState, dispatch: ?(tr: Transaction)) → bool
// Wrap the selection in a node of the given type with the given
// attributes.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function unwrapFrom(nodeType) {
    return function (state, dispatch) {
        const { $from, $to } = state.selection;
        const range = $from.blockRange($to);
        const depth = range && (0, prosemirror_transform_1.liftTarget)(range);
        if (depth === null || depth === undefined) {
            return false;
        }
        const gapStart = $from.before(depth + 1), gapEnd = $to.after(depth + 1);
        const frag = prosemirror_model_1.Fragment.from($from.node());
        if (dispatch)
            dispatch(state.tr.replaceRange(gapStart, gapEnd, new prosemirror_model_1.Slice(frag, 0, 0)).scrollIntoView());
        return true;
    };
}
exports.unwrapFrom = unwrapFrom;
//# sourceMappingURL=prosemirror-commands.js.map