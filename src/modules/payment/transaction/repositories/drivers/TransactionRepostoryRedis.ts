import { ITransactionRepository } from "../contract/ITransactionRepository";
import { RedisClientType } from "@redis/client";
import { IDatabase } from "@db/contract/IDatabase";
import { TransactionAbstract } from "../../entity/Transaction.abstract";

export class TransactionRepositoryRedis implements ITransactionRepository {
    private client: RedisClientType;
    private isInitialize: Promise<void>;

    constructor(private db: IDatabase) {
        this.client = db.getDataSource() as RedisClientType;
    }

    async initialize(): Promise<void> {
        try {
            if(!this.client.isOpen) {
                await this.client.connect();
            }
        } catch (error) {
            console.error("Failed to connect to Redis:", error);
            throw error;
        }
    }

    getTransactionByField(field: string, value: string): Promise<TransactionAbstract | null> {
        throw new Error("Method not implemented.");
    }
    getTransactionById(transactionId: string): Promise<TransactionAbstract | null> {
        throw new Error("Method not implemented.");
    }
    getTransactionByUserId(userId: string): Promise<TransactionAbstract | null> {
        throw new Error("Method not implemented.");
    }
    getTransactions(): Promise<TransactionAbstract[] | null> {
        throw new Error("Method not implemented.");
    }
    createTransaction(transaction: TransactionAbstract): Promise<TransactionAbstract | null> {
        throw new Error("Method not implemented.");
    }
    cancelTransactionById(transactionId: string): Promise<TransactionAbstract | null> {
        throw new Error("Method not implemented.");
    }    
}