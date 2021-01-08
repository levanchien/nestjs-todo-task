export interface PageQuery {
    offset: number;
    limit: number;
    order: any | string[][];
    query: any;
}