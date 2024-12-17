import { createPool, Pool } from 'mysql2/promise';
import { IDatabase } from "../contract/IDatabase";

// MySQL Database Config
export class MySQLDatabase implements IDatabase {
    private pool: Pool;

    constructor(private config: {
        host: string;
        port: number;
        user: string;
        password: string;
        databse: string
    }) {
        this.pool = createPool(this.config)
    }

    async connect(): Promise<void> {
        console.log('Connected to MySQL database');
    }

    async disconnect(): Promise<void> {
        console.log('Disconnected from MySQL database');
    }

    // Que fait cette méthode ?
    async query<T>(queryString: string, params?: any[]): Promise<T> {
        const [rows] = await this.pool.execute(queryString, params);
        return rows as T;
    }
    
}