import { MarkdownParser } from 'prosemirror-markdown';
import { Node as ProsemirrorNode, Schema } from 'prosemirror-model';
import { PrimitiveType } from '../components/model';
export declare class SpacePreservingMarkdownParser {
    private mkdp;
    constructor(mkdp: MarkdownParser);
    parse(primitiveValue: PrimitiveType): ProsemirrorNode | null;
}
export declare const preprocessEmptyNodes: (node: ProsemirrorNode, schema: Schema) => ProsemirrorNode;
