import { SchemaSpec } from 'prosemirror-model';
import { Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
export type MeasureSchema = 'measure';
export declare function getMeasureSpec(): SchemaSpec;
export declare const measureTransactionMapper: (tr: Transaction) => Transaction;
export declare const measureOnFocusHandler: (view: EditorView) => void;
