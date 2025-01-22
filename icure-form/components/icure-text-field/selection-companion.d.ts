import { EditorView } from 'prosemirror-view';
import { EditorState } from 'prosemirror-state';
export declare class SelectionCompanion {
    private readonly companion;
    private delay;
    private lastTime;
    constructor(view: EditorView, delay: () => boolean);
    update(view: EditorView, lastState?: EditorState): void;
    private display;
    destroy(): void;
}
