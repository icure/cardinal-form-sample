import { EditorView } from 'prosemirror-view';
import { EditorState, Transaction } from 'prosemirror-state';
import { Schema } from 'prosemirror-model';
import { Suggestion } from '../../generic';
export declare class SuggestionPalette {
    private readonly palette;
    private delay;
    private lastTime;
    private suggestionProvider;
    private previousFingerprint?;
    private suggestionStopWordsProvider;
    private currentFocus?;
    private hasFocus;
    private suggestions;
    private schema;
    constructor(schema: Schema, view: EditorView, suggestionProvider: (terms: string[]) => Promise<Suggestion[]>, suggestionStopWordsProvider: () => Set<string>, delay?: () => boolean);
    focusItem(idx?: number): void;
    focus(): boolean;
    focusOrInsert(view: EditorView, transactionProvider: (from: number, to: number, sug: Suggestion) => Promise<Transaction | undefined>): boolean;
    insert(view: EditorView, transactionProvider: (from: number, to: number, sug: Suggestion) => Promise<Transaction | undefined>): boolean;
    arrowUp(): boolean;
    arrowDown(): boolean;
    update(view: EditorView, lastState?: EditorState): void;
    private display;
    destroy(): void;
}
