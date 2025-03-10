import { RedisClientType } from "@redis/client";
import { IDatabase } from "@db/contract/IDatabase";
import { ILogRepository } from "../contract/ILogRepository";
import { LogAbstract } from "../../entity/Log.abstract";

export class LogRepositoryRedis implements ILogRepository {
    private client: RedisClientType;
    private isInitialize: Promise<void>;

    constructor(private db: IDatabase) {
        this.client = db.getDataSource() as RedisClientType;
    }

    async initialized(): Promise<void> {
        try {
            if(!this.client.isOpen) {
                await this.client.connect();
            }
        } catch (error) {
            console.error("Failed to connect to Redis:", error);
            throw error;
        }
    }

    getLogByUserId(userId: string): Promise<LogAbstract | null> {
        throw new Error("Method not implemented.");
    }
    getLogByTransactionId(transactionId: string): Promise<LogAbstract | null> {
        throw new Error("Method not implemented.");
    }
    getLogs(): Promise<LogAbstract[] | null> {
        throw new Error("Method not implemented.");
    }
}