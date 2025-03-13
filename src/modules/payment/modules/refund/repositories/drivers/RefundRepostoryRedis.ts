import { IRefundRepository } from "../contract/IRefundRepository";
import { RedisClientType } from "@redis/client";
import { IDatabase } from "@db/contract/IDatabase";
import { RefundRedisEntity } from "../../entity/redis/Refund.entity";

export class RefundRepositoryRedis implements IRefundRepository {
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

    /**
     * Retrieves a refund by its ID from Redis.
     * 
     * @param refundId - The ID of the refund to retrieve.
     * @returns A promise that resolves to a RefundRedisEntity object if found, otherwise null.
     * @throws An error if there is an issue retrieving the refund from Redis.
     */

    async getRefundById(refundId: string): Promise<RefundRedisEntity | null> {
        try {
            await this.initialized();

            const refund = await this.client.hGetAll(`refund:${refundId}`);
            if(!refund || Object.keys(refund).length === 0) return null;
            return RefundRedisEntity.fromRedisHash(refund);
        } catch(error) {
            console.error("Error finding refund by id in RefundRepositoryRedis: ", error);
            throw new Error("Failed to find refund by id.");
        }
    }

    async getRefunds(): Promise<RefundRedisEntity[] | null> {
        try {
            await this.initialized();
            const refundKeys = await this.client.sMembers('refund_index');
            const refunds = await Promise.all(
                refundKeys.map(refundId => this.getRefundById(refundId))
            );
            return refunds.filter(refund => refund !== null);
        } catch(error) {
            console.error("Error finding refunds in RefundRepositoryRedis: ", error);
            throw new Error("Failed to find refunds by id.");
        }
    }


    async createRefund(refund: RefundRedisEntity): Promise<RefundRedisEntity | null> {
        try {
            await this.initialized();

            const refundHash = {
                id: refund.id,
                transaction_id: refund.transaction_id,
                transaction_ref: refund.transaction_ref,
                charge_ref: refund.charge_ref,
                amount: refund.amount,
                status: refund.status.toString(),
                refund_ref: refund.refund_ref
            }
            
            await this.client.hSet(`refund:${refund.id}`, refundHash);
            await this.client.sAdd('refund_index', refund.id);

            const exists = await this.client.exists(`refund:${refund.id}`);
            return exists === 1 ? refund : null;
        } catch(error) {
            console.error("Error creating refund in RefundRepositoryRedis: ", error);
            throw new Error("Failed to create refund.");
        }
    }  
}