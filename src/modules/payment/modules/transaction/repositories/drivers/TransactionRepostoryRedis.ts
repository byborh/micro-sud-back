import { ITransactionRepository } from "../contract/ITransactionRepository";
import { RedisClientType } from "@redis/client";
import { IDatabase } from "@db/contract/IDatabase";
import { TransactionAbstract } from "../../entity/Transaction.abstract";
import { TransactionRedisEntity } from "../../entity/redis/Transaction.entity";

export class TransactionRepositoryRedis implements ITransactionRepository {
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

    getTransactionByField(field: string, value: string): Promise<TransactionAbstract | null> {
        throw new Error("Method not implemented.");
    }
    
    
    async getTransactionById(id: string): Promise<TransactionRedisEntity | null> {
        try {
            await this.initialized();

            const transactionHash = await this.client.hGetAll(`transaction:${id}`);
            if (!transactionHash || Object.keys(transactionHash).length === 0) return null;
            return TransactionRedisEntity.fromRedisHash(transactionHash);
        } catch (error) {
            console.error("Failed to retrieve transaction:", error);
            throw error;
        }
    }


    async getTransactionsByDebtorEmail(email: string): Promise<TransactionRedisEntity[]> {
        try {
            await this.initialized();
            
            // Get transaction's id from their email
            const transactionIds = await this.client.sMembers(`debtor_transactions:${email}`);
            
            // Get transactions
            const transactions = await Promise.all(
                transactionIds.map(transactionId => this.getTransactionById(transactionId))
            );

            // Filter transactions no nul
            return transactions.filter(transaction => transaction !== null) as TransactionRedisEntity[];
        } catch (error) {
            console.error("Failed to retrieve transactions by debtor email:", error);
            throw error;
        }
    }

    async getTransactions(): Promise<TransactionRedisEntity[]> {
        try {
            await this.initialized();
            const transactionKeys = await this.client.sMembers('transaction_index');
            const transactions = await Promise.all(
                transactionKeys.map(transactionId => this.getTransactionById(transactionId))
            );
            return transactions.filter(transaction => transaction !== null);
        } catch (error) {
            console.error("Failed to retrieve transactions:", error);
            throw error;
        }
    }


    async getPendingEscrowTransactions(): Promise<TransactionAbstract[] | null> {
        await this.initialized();

        // Get transaction's id if they are escrow
        const transactionKeys = await this.client.sMembers("escrow_pending_transactions");

        if(!transactionKeys.length) return null;

        // Get transactions
        const transactions = await Promise.all(
            transactionKeys.map(transactionId => this.getTransactionById(transactionId))
        );

        // Return transaction
        return transactions.filter(transaction => transaction !== null);
    }
    


    async createTransaction(transaction: TransactionRedisEntity): Promise<TransactionRedisEntity | null> {
        try {
            await this.initialized();

            const transactionHash = {
                id: transaction.id,
                amount: String(transaction.amount),
                currency: transaction.currency,
                payment_provider: transaction.payment_provider,
                debtor_email: transaction.debtor_email,
                beneficiary_email: transaction.beneficiary_email,
                status: transaction.status.toString(),
                is_escrow: transaction.is_escrow.toString(),
                transaction_date: transaction.transaction_date.toISOString(),
                transaction_ref: transaction.transaction_ref || '',
                description: transaction.description || '',
                metadata: typeof transaction.metadata === "string" ? transaction.metadata : JSON.stringify(transaction.metadata || {}),
                release_date: transaction.release_date ? transaction.release_date.toISOString() : "",
                escrow_status: transaction.escrow_status ? transaction.escrow_status.toString() : ""
            };
            

            await this.client.hSet(`transaction:${transaction.id}`, transactionHash);
            await this.client.sAdd('transaction_index', transaction.id);
            await this.client.sAdd(`debtor_transactions:${transaction.debtor_email}`, transaction.id);

            // If transaction is escrow, add it to the set
            if (transaction.escrow_status === "pending") {
                await this.client.sAdd('escrow_pending_transactions', transaction.id);
            }            

            const exists = await this.client.exists(`transaction:${transaction.id}`);
            return exists === 1 ? transaction : null;
        } catch (error) {
            console.error("Failed to create transaction in TransactionRepository:", error);
            throw error;
        }
    }

    
    async cancelTransactionById(transactionId: string): Promise<boolean> {
        try {
            await this.initialized();

            // Get transaction by id
            const transaction = await this.getTransactionById(transactionId);
            if (!transaction) {
                return false;
            }
        
            await this.client.hSet(`transaction:${transactionId}`, { status: 'cancelled' });
        
            return true;
        } catch (error) {
          console.error("Failed to delete transaction:", error);
          throw error;
        }
    }
}