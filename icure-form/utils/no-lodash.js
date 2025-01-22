"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sorted = exports.sortedBy = exports.groupBy = void 0;
function groupBy(items, grouper) {
    return items.reduce((r, v, i, a, k = grouper(v)) => {
        ;
        (r[k] || (r[k] = [])).push(v);
        return r;
    }, {});
}
exports.groupBy = groupBy;
function sortedBy(items, key, direction = 'asc') {
    if (typeof key === 'function') {
        return items.concat().sort(direction === 'asc' ? (a, b) => (key(a) > key(b) ? 1 : key(b) > key(a) ? -1 : 0) : (a, b) => (key(a) < key(b) ? 1 : key(b) < key(a) ? -1 : 0));
    }
    else {
        return items
            .concat()
            .sort(direction === 'asc' ? (a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0) : (a, b) => (a[key] < b[key] ? 1 : b[key] < a[key] ? -1 : 0));
    }
}
exports.sortedBy = sortedBy;
function sorted(items, direction = 'asc') {
    return items.concat().sort(direction === 'asc' ? (a, b) => (a > b ? 1 : b > a ? -1 : 0) : (a, b) => (a < b ? 1 : b < a ? -1 : 0));
}
exports.sorted = sorted;
//# sourceMappingURL=no-lodash.js.map