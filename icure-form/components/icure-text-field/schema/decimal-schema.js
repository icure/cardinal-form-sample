"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDecimalSpec = void 0;
function getDecimalSpec() {
    return {
        topNode: 'paragraph',
        nodes: {
            paragraph: {
                content: 'decimal',
            },
            decimal: {
                content: 'inline*',
                group: 'block',
                parseDOM: [{ tag: 'span' }],
                toDOM() {
                    return ['span', 0];
                },
                regexp: '[,. 0-9-]',
            },
            text: {
                group: 'inline',
            },
        },
        marks: {},
    };
}
exports.getDecimalSpec = getDecimalSpec;
//# sourceMappingURL=decimal-schema.js.map