import { IRefundRepository } from "../contract/IRefundRepository";
import { RedisClientType } from "@redis/client";
import { IDatabase } from "@db/contract/IDatabase";
import { RefundAbstract } from "../../entity/Refund.abstract";

export class RefundRepositoryRedis implements IRefundRepository {
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

    getRefundById(refundId: string): Promise<RefundAbstract | null> {
        throw new Error("Method not implemented.");
    }
    getRefunds(): Promise<RefundAbstract[] | null> {
        throw new Error("Method not implemented.");
    }
    createRefund(refund: RefundAbstract): Promise<RefundAbstract | null> {
        throw new Error("Method not implemented.");
    }  
}