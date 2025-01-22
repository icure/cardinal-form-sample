export declare const makeInterpreter: () => <T, S extends {
    [key: string]: unknown;
    [key: symbol]: unknown;
}>(formula: string, sandbox: S) => T | undefined;
