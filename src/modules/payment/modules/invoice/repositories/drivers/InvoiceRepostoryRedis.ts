import { IInvoiceRepository } from "../contract/IInvoiceRepository";
import { RedisClientType } from "@redis/client";
import { IDatabase } from "@db/contract/IDatabase";
import { InvoiceAbstract } from "../../entity/Invoice.abstract";
import { InvoiceRedisEntity } from "../../entity/redis/Invoice.entity";

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

    async getInvoiceByTransactionId(transactionId: string): Promise<InvoiceAbstract | null> {
        try {
            await this.initialized();
    
            // Get invoice
            const invoiceIdArray = await this.client.sMembers(`invoice_for_transaction:${transactionId}`);
            if (invoiceIdArray.length === 0) return null;
    
            const invoiceId = invoiceIdArray[0]; // Take the first element
            console.log("🔍 Invoice ID récupéré :", invoiceId);
    
            const invoice = await this.client.hGetAll(`invoice:${invoiceId}`);
            console.log("📜 Invoice récupérée depuis Redis :", invoice);
    
            return invoice && invoice.id ? new InvoiceRedisEntity(invoice) : null;
    
        } catch(error) {
            console.error("Error retrieving invoice in InvoiceRepository:", error);
            throw new Error("Failed to retrieve invoice.");
        }
    }
    

    async createInvoice(invoice: InvoiceRedisEntity): Promise<InvoiceRedisEntity | null> {
        try {
            await this.initialized();

            const hashedInvoice = {
                id: invoice.id,
                transaction_id: invoice.transaction_id,
                createdAt: invoice.createdAt.toISOString(),
                pdf_link: invoice.pdf_link
            }

            await this.client.hSet(`invoice:${invoice.id}`, hashedInvoice);
            await this.client.sAdd(`invoice_for_transaction:${invoice.transaction_id}`, invoice.id);

            const exists = await this.client.exists(`invoice:${invoice.id}`);
            return exists === 1 ? invoice : null;
        } catch(error) {
            console.error("Error creating invoice in InvoiceRepositry:", error);
            throw new Error("Failed to create invoice.");
        }
    }    
}