"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasMark = void 0;
function hasMark(ms, mark) {
    if (!ms) {
        return false;
    }
    if (!!ms.get) {
        return !!ms.get(mark);
    }
    else {
        return !!ms[mark];
    }
}
exports.hasMark = hasMark;
//# sourceMappingURL=prosemirror-utils.js.map