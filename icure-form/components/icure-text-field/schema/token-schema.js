"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokensSpec = void 0;
const utils_1 = require("./utils");
const common_marks_1 = require("./common-marks");
function getTokensSpec(type, contentProvider, colorProvider) {
    const marksSelector = (key) => {
        // noinspection RedundantConditionalExpressionJS
        return key !== 'link' && ['styled-tokens-list', 'styled-tokens-list-with-codes'].includes(type)
            ? true
            : key === 'link' && ['tokens-list-with-codes', 'styled-text-with-codes']
                ? true
                : false;
    };
    return {
        nodes: (0, utils_1.reduceNodes)({
            doc: {
                content: 'token*',
            },
            token: {
                content: 'inline*',
                group: 'block',
                attrs: { id: { default: undefined } },
                parseDOM: [{ tag: 'li' }],
                toDOM(node) {
                    return ['li', {}, ['span', { class: 'token' }, 0], ['icure-metadata-buttons-bar-wrapper', { id: node.attrs.id }]];
                },
            },
            text: {
                group: 'inline',
            },
        }),
        marks: (0, utils_1.reduceMarks)((0, common_marks_1.getMarks)(contentProvider, colorProvider), marksSelector),
    };
}
exports.getTokensSpec = getTokensSpec;
//# sourceMappingURL=token-schema.js.map