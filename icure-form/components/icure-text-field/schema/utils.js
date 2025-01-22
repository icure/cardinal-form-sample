"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduceMarks = exports.reduceNodes = void 0;
function reduceNodes(nodes, selector = () => true) {
    return Object.keys(nodes).reduce((r, k) => (selector(k, nodes[k]) ? Object.assign(r, { [k]: nodes[k] }) : r), {});
}
exports.reduceNodes = reduceNodes;
function reduceMarks(marks, selector = () => true) {
    return Object.keys(marks).reduce((r, k) => (selector(k, marks[k]) ? Object.assign(r, { [k]: marks[k] }) : r), {});
}
exports.reduceMarks = reduceMarks;
//# sourceMappingURL=utils.js.map