export declare function groupBy<K, I extends string | number>(items: K[], grouper: (item: K) => I): {
    [key: I]: K;
};
export declare function sortedBy<K extends {
    [key: string]: any;
}>(items: K[], key: string | ((a: K) => any), direction?: string): K[];
export declare function sorted<K>(items: K[], direction?: string): K[];
