import { SchemaSpec } from 'prosemirror-model';
export type DateSchema = 'date';
export type TimeSchema = 'time';
export type DateTimeSchema = 'date-time';
export declare function getDateSpec(): SchemaSpec;
export declare function getTimeSpec(): SchemaSpec;
export declare function getDateTimeSpec(): SchemaSpec;
