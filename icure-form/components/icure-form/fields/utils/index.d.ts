import { FieldMetadata, FieldValue } from '../../../model';
import { Version, VersionedData } from '../../../../generic';
export declare const singleValueProvider: (valueProvider?: () => VersionedData<FieldValue>, id?: string) => (() => {
    [x: string]: Version<FieldValue>[];
}) | undefined;
export declare const handleSingleValueChanged: (handleValueChanged?: (label: string, language: string, value?: FieldValue, id?: string) => string | undefined, id?: string) => ((label: string, language: string, value: FieldValue) => string | undefined) | undefined;
export declare const handleSingleMetadataChanged: (handleMetadataChanged?: (metadata: FieldMetadata, id?: string) => string | undefined, id?: string) => ((metadata: FieldMetadata) => string | undefined) | undefined;
export declare const extractSingleValue: <V extends FieldValue>(value?: VersionedData<V>, id?: string) => [string, Version<V>[]] | [undefined, undefined];
export declare const extractValues: <V extends FieldValue>(value: VersionedData<V> | undefined, metadataProvider: (id: string, revisions: (string | null)[]) => VersionedData<FieldMetadata>, id?: string) => [string, Version<V>[]][];
