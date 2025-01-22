import { NodeType } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
export declare function wrapInIfNeeded(nodeType: NodeType, attrs?: {
    [key: string]: unknown;
}): (state: EditorState, dispatch?: (tr: Transaction) => void) => boolean;
export declare function unwrapFrom(nodeType: NodeType): (state: EditorState, dispatch?: (tr: Transaction) => void) => boolean;
