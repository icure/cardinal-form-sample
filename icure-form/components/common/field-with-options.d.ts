import { Field } from './field';
import { Code } from '../model';
export declare class FieldWithOptionsMixinInterface extends Field {
    optionsProvider: (language: string, terms?: string[]) => Promise<Code[]>;
    displayedOptions: Code[];
}
type Constructor<T extends Field> = new (...args: any[]) => T;
export declare const FieldWithOptionsMixin: <T extends Constructor<Field>>(superClass: T) => Constructor<FieldWithOptionsMixinInterface> & T;
export {};
