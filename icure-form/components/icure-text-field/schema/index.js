"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchema = void 0;
const prosemirror_model_1 = require("prosemirror-model");
const markdown_schema_1 = require("./markdown-schema");
const date_time_schema_1 = require("./date-time-schema");
const token_schema_1 = require("./token-schema");
const measure_schema_1 = require("./measure-schema");
const decimal_schema_1 = require("./decimal-schema");
const items_list_schema_1 = require("./items-list-schema");
function createSchema(type, colorProvider, contentProvider) {
    return new prosemirror_model_1.Schema(type === 'decimal'
        ? (0, decimal_schema_1.getDecimalSpec)()
        : type === 'measure'
            ? (0, measure_schema_1.getMeasureSpec)()
            : type === 'date'
                ? (0, date_time_schema_1.getDateSpec)()
                : type === 'time'
                    ? (0, date_time_schema_1.getTimeSpec)()
                    : type === 'date-time'
                        ? (0, date_time_schema_1.getDateTimeSpec)()
                        : type === 'items-list'
                            ? (0, items_list_schema_1.getItemsListSpec)()
                            : type === 'tokens-list' || type === 'styled-tokens-list' || type === 'tokens-list-with-codes' || type === 'styled-tokens-list-with-codes'
                                ? (0, token_schema_1.getTokensSpec)(type, contentProvider, colorProvider)
                                : (0, markdown_schema_1.getMarkdownSpec)(type, contentProvider, colorProvider));
}
exports.createSchema = createSchema;
//# sourceMappingURL=index.js.map