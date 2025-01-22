import { FieldMetadata, FieldValue, Form } from '../components/model';
import { FormValuesContainer } from '../generic';
export declare const computeFormDefaultValues: (formValuesContainer: FormValuesContainer<FieldValue, FieldMetadata>, form?: Form, language?: string, owner?: string) => [FieldValue, FieldMetadata][];
