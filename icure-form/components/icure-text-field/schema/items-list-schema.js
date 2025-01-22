"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemsListSpec = void 0;
const utils_1 = require("./utils");
function getItemsListSpec() {
    return {
        nodes: (0, utils_1.reduceNodes)({
            doc: {
                content: 'item*',
            },
            item: {
                content: 'inline*',
                group: 'block',
                attrs: { id: { default: undefined } },
                parseDOM: [{ tag: 'li' }],
                toDOM() {
                    return ['li', 0];
                },
            },
            text: {
                group: 'inline',
            },
        }),
        marks: {},
    };
}
exports.getItemsListSpec = getItemsListSpec;
//# sourceMappingURL=items-list-schema.js.map