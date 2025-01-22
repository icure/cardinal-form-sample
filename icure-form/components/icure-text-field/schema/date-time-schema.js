"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateTimeSpec = exports.getTimeSpec = exports.getDateSpec = void 0;
function getDateSpec() {
    return {
        topNode: 'paragraph',
        nodes: {
            paragraph: {
                content: 'date',
            },
            date: {
                content: 'inline*',
                group: 'block',
                parseDOM: [{ tag: 'span' }],
                toDOM() {
                    return ['span', 0];
                },
                regexp: '[0-9]',
                mask: '--/--/----',
            },
            text: {
                group: 'inline',
            },
        },
        marks: {},
    };
}
exports.getDateSpec = getDateSpec;
function getTimeSpec() {
    return {
        topNode: 'paragraph',
        nodes: {
            paragraph: {
                content: 'time',
            },
            time: {
                content: 'inline*',
                group: 'block',
                parseDOM: [{ tag: 'span' }],
                toDOM() {
                    return ['span', 0];
                },
                regexp: '[0-9]',
                mask: '--:--:--',
            },
            text: {
                group: 'inline',
            },
        },
        marks: {},
    };
}
exports.getTimeSpec = getTimeSpec;
function getDateTimeSpec() {
    return {
        topNode: 'paragraph',
        nodes: {
            paragraph: {
                content: 'date time',
            },
            date: {
                content: 'inline*',
                group: 'block',
                parseDOM: [{ tag: 'span' }],
                toDOM() {
                    return ['span', { class: 'date' }, 0];
                },
                regexp: '[0-9]',
                mask: '--/--/----',
            },
            time: {
                content: 'inline*',
                group: 'block',
                parseDOM: [{ tag: 'span' }],
                toDOM() {
                    return ['span', { class: 'time' }, 0];
                },
                regexp: '[0-9]',
                mask: '--:--:--',
            },
            text: {
                group: 'inline',
            },
        },
        marks: {},
    };
}
exports.getDateTimeSpec = getDateTimeSpec;
//# sourceMappingURL=date-time-schema.js.map