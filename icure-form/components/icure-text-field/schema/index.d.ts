import { Schema } from 'prosemirror-model';
import { IcureTextFieldSchema } from '../../model';
export declare function createSchema(type: IcureTextFieldSchema, colorProvider: (type: string, code: string, isCode: boolean) => string, contentProvider: (codes: {
    type: string;
    code: string;
}[]) => string): Schema;
