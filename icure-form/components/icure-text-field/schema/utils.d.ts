import { MarkSpec, NodeSpec } from 'prosemirror-model';
export declare function reduceNodes(nodes: {
    [key: string]: NodeSpec;
}, selector?: (key: string, spec: NodeSpec) => boolean): {
    [key: string]: NodeSpec;
};
export declare function reduceMarks(marks: {
    [key: string]: MarkSpec;
}, selector?: (key: string, spec: MarkSpec) => boolean): {
    [key: string]: MarkSpec;
};
