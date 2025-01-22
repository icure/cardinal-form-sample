import { CodeStub, DecryptedContent, DecryptedService } from '@icure/cardinal-sdk';
import { PrimitiveType } from '../components/model';
export declare function isCodeEqual(c1: CodeStub, c2: CodeStub): boolean;
export declare function areCodesEqual(c1s: CodeStub[], c2s: CodeStub[]): boolean;
export declare function isServiceEqual(svc1: DecryptedService, svc2: DecryptedService): boolean;
export declare function isContentEqual(content1: DecryptedContent | undefined, content2: DecryptedContent | undefined): boolean;
export declare function isServiceContentEqual(content1: {
    [language: string]: DecryptedContent;
}, content2: {
    [language: string]: DecryptedContent;
}): boolean;
export declare const primitiveTypeToContent: (language: string, value: PrimitiveType) => DecryptedContent;
export declare const contentToPrimitiveType: (language: string, content: DecryptedContent | undefined) => PrimitiveType | undefined;
export declare const codeStubToCode: (c: CodeStub) => {
    id: string;
    label: {
        [key: string]: string;
    };
};
