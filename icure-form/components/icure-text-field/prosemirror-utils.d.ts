import { MarkSpec } from 'prosemirror-model';
import OrderedMap from 'orderedmap';
export declare function hasMark(ms: {
    [key: string]: MarkSpec;
} | OrderedMap<MarkSpec> | null | undefined, mark: string): boolean;
