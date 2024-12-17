import { createClient, RedisClientType } from "redis";
import { IDatabase } from "@db/contract/IDatabase";

// Redis Database Config
export class RedisDatabase implements IDatabase {
    private client: RedisClientType;

    constructor(private config: { host: string; port: number; password?: string }) {
        this.client = createClient({
            url: `redis://${config.password ? `:${config.password}@` : ''}${config.host}:${config.port}`
        });
    }

    async connect(): Promise<void> {
        await this.client.connect();
        console.log("Connected to Redis database");
    }

    async disconnect(): Promise<void> {
        await this.client.disconnect();
        console.log("Disconnected from Redis database");
    }

    async query<T>(key: string): Promise<T> {
        const value = await this.client.get(key);
        return JSON.parse(value || 'null') as T;
    }
}
