import { IInvoiceRepository } from "../contract/IInvoiceRepository";
import { RedisClientType } from "@redis/client";
import { IDatabase } from "@db/contract/IDatabase";
import { InvoiceAbstract } from "../../entity/Invoice.abstract";

export class InvoiceRepositoryRedis implements IInvoiceRepository {
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

    getInvoiceById(invoiceId: string): Promise<InvoiceAbstract | null> {
        throw new Error("Method not implemented.");
    }
    getInvoiceByUserId(userId: string): Promise<InvoiceAbstract | null> {
        throw new Error("Method not implemented.");
    }
    getInvoices(): Promise<InvoiceAbstract[]> {
        throw new Error("Method not implemented.");
    }
    createInvoice(invoice: InvoiceAbstract): Promise<InvoiceAbstract | null> {
        throw new Error("Method not implemented.");
    }    
}