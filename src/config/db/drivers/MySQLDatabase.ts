import { createPool, Pool } from 'mysql2/promise';
import { IDatabase } from "../contract/IDatabase";
import { dbConfig } from '@db/config';

// MySQL Database Config
export class MySQLDatabase implements IDatabase {
    private pool: Pool;

    constructor() {
        this.pool = createPool({
            host: dbConfig.mysql.host,
            port: dbConfig.mysql.port,
            user: dbConfig.mysql.user,
            password: dbConfig.mysql.password,
            database: dbConfig.mysql.database,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
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