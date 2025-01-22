"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMarkdownSpec = void 0;
const utils_1 = require("./utils");
const common_marks_1 = require("./common-marks");
function getMarkdownSpec(type, contentProvider, colorProvider) {
    const nodesSelector = (key, spec) => {
        // noinspection RedundantConditionalExpressionJS
        return key === 'paragraph' ? true : (spec.group === 'block' || ['doc', 'list_item', 'hardbreak', 'image'].includes(key)) && type !== 'text-document' ? false : true;
    };
    const marksSelector = (key) => {
        // noinspection RedundantConditionalExpressionJS
        return key !== 'link' && ['text-document', 'styled-text', 'styled-text-with-codes'].includes(type)
            ? true
            : key === 'link' && ['text-document', 'text-with-codes', 'styled-text-with-codes']
                ? true
                : false;
    };
    return {
        topNode: type === 'text-document' ? 'doc' : 'paragraph',
        nodes: (0, utils_1.reduceNodes)({
            doc: {
                content: 'block+',
            },
            paragraph: {
                content: 'inline*',
                group: 'block',
                parseDOM: [{ tag: 'p' }],
                toDOM() {
                    return ['p', 0];
                },
            },
            blockquote: {
                content: 'block+',
                group: 'block',
                parseDOM: [{ tag: 'blockquote' }],
                toDOM() {
                    return ['blockquote', 0];
                },
            },
            horizontal_rule: {
                group: 'block',
                parseDOM: [{ tag: 'hr' }],
                toDOM() {
                    return ['div', ['hr']];
                },
            },
            heading: {
                attrs: { level: { default: 1 } },
                content: '(text | image)*',
                group: 'block',
                defining: true,
                parseDOM: [
                    { tag: 'h1', attrs: { level: 1 } },
                    { tag: 'h2', attrs: { level: 2 } },
                    { tag: 'h3', attrs: { level: 3 } },
                    { tag: 'h4', attrs: { level: 4 } },
                    { tag: 'h5', attrs: { level: 5 } },
                    { tag: 'h6', attrs: { level: 6 } },
                ],
                toDOM(node) {
                    return ['h' + node.attrs.level, 0];
                },
            },
            ordered_list: {
                content: 'list_item+',
                group: 'block',
                attrs: { order: { default: 1 }, tight: { default: false } },
                parseDOM: [
                    {
                        tag: 'ol',
                        getAttrs(dom) {
                            const el = dom;
                            return {
                                order: el.hasAttribute('start') ? +(el.getAttribute('start') || 0) : 1,
                                tight: el.hasAttribute('data-tight'),
                            };
                        },
                    },
                ],
                toDOM(node) {
                    return [
                        'ol',
                        {
                            start: node.attrs.order === 1 ? null : node.attrs.order,
                            'data-tight': node.attrs.tight ? 'true' : null,
                        },
                        0,
                    ];
                },
            },
            bullet_list: {
                content: 'list_item+',
                group: 'block',
                attrs: { tight: { default: false } },
                parseDOM: [{ tag: 'ul', getAttrs: (dom) => ({ tight: dom.hasAttribute('data-tight') }) }],
                toDOM(node) {
                    return ['ul', { 'data-tight': node.attrs.tight ? 'true' : null }, 0];
                },
            },
            list_item: {
                content: 'paragraph block*',
                defining: true,
                parseDOM: [{ tag: 'li' }],
                toDOM() {
                    return ['li', 0];
                },
            },
            text: {
                group: 'inline',
            },
            image: {
                inline: true,
                attrs: {
                    src: {},
                    alt: { default: null },
                    title: { default: null },
                },
                group: 'inline',
                draggable: true,
                parseDOM: [
                    {
                        tag: 'img[src]',
                        getAttrs(dom) {
                            const el = dom;
                            return {
                                src: el.getAttribute('src'),
                                title: el.getAttribute('title'),
                                alt: el.getAttribute('alt'),
                            };
                        },
                    },
                ],
                toDOM(node) {
                    return ['img', node.attrs];
                },
            },
            measure: {
                content: 'decimal unit',
                group: 'block',
            },
            decimal: {
                content: 'inline*',
                group: 'block',
                parseDOM: [{ tag: 'span' }],
                toDOM() {
                    return ['span', { class: 'measure' }, 0];
                },
                regexp: '[,.0-9-]',
            },
            unit: {
                content: 'inline*',
                group: 'block',
                parseDOM: [{ tag: 'span' }],
                toDOM() {
                    return ['span', { class: 'unit' }, 0];
                },
            },
            hardbreak: {
                inline: true,
                group: 'inline',
                selectable: false,
                parseDOM: [{ tag: 'br' }],
                toDOM() {
                    return ['br'];
                },
            },
        }, nodesSelector),
        marks: (0, utils_1.reduceMarks)((0, common_marks_1.getMarks)(contentProvider, colorProvider), marksSelector),
    };
}
exports.getMarkdownSpec = getMarkdownSpec;
//# sourceMappingURL=markdown-schema.js.map