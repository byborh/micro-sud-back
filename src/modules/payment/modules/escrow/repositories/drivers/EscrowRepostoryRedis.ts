import { IEscrowRepository } from "../contract/IEscrowRepository";
import { RedisClientType } from "@redis/client";
import { IDatabase } from "@db/contract/IDatabase";
import { EscrowAbstract } from "../../entity/Escrow.abstract";

export class EscrowRepositoryRedis implements IEscrowRepository {
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

    getEscrowById(userId: string): Promise<EscrowAbstract | null> {
        throw new Error("Method not implemented.");
    }
    getEscrows(): Promise<EscrowAbstract[] | null> {
        throw new Error("Method not implemented.");
    }
    createEscrow(escrow: EscrowAbstract): Promise<EscrowAbstract | null> {
        throw new Error("Method not implemented.");
    }
    releaseEscrow(escrow: EscrowAbstract): Promise<EscrowAbstract | null> {
        throw new Error("Method not implemented.");
    }
}