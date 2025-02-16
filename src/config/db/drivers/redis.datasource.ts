import { IDatabase } from "@db/contract/IDatabase";
import { RedisClientType } from "@redis/client";
import dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config();

export class RedisDatabase implements IDatabase {
    private client: RedisClientType;

    constructor() {
        this.client = createClient({
            url: process.env.REDIS_URL || "redis://localhost:6379"
        });
    }

    // Connect to database
    async connect(): Promise<void> {
        this.client.on("error", (err) => {console.error("❌ Redis Error: ", err)});
        await this.client.connect();
        console.log("✅ Redis connected");
    }

    // Disconnect from database
    async disconnect(): Promise<void> {
        await this.client.disconnect();
        console.log("❌ Redis disconnected");
    }

    // Verify if database is connected
    isConnected(): boolean { return this.client.isOpen; }

    // Get datasource
    getDataSoure(): RedisClientType { return this.client; }
}