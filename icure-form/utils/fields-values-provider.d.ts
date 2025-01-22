import { Field, FieldMetadata, FieldValue } from '../components/model';
import { FormValuesContainer, Version, VersionedData } from '../generic';
export declare function getRevisionsFilter(field: Field): (id: string, history: Version<FieldMetadata>[]) => string[];
export declare const fieldValuesProvider: (formValuesContainer: FormValuesContainer<FieldValue, FieldMetadata>, field: Field) => (() => VersionedData<FieldValue>);
export declare function makeMetadata(field: Field, owner?: string, index?: number): {
    label: string;
    valueDate: number;
    owner: string | undefined;
    index: number | undefined;
    tags: {
        id: string;
        label: {};
    }[] | undefined;
};
export declare const getValidationError: (formsValueContainer?: FormValuesContainer<FieldValue, FieldMetadata>, field?: Field) => (() => [FieldMetadata, string][]);
export declare const handleValueChangedProvider: (formsValueContainer?: FormValuesContainer<FieldValue, FieldMetadata>, field?: Field, owner?: string) => (label: string, language: string, value?: FieldValue, id?: string) => void;
export declare const handleMetadataChangedProvider: (formsValueContainer?: FormValuesContainer<FieldValue, FieldMetadata>) => (metadata: FieldMetadata, id?: string) => void;
