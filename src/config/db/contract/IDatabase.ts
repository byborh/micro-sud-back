// Contract for the database
export interface IDatabase {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    query<T>(queryString: string, params?: any[]): Promise<T>; // à comprendre ce que veut dire
}