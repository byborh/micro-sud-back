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
    
    
    async getTransactionById(id: string): Promise<TransactionRedisEntity | null> {
        try {
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
            await this.initialize();
            const transactionIds = await this.client.sMembers(`debtor_transactions:${email}`);
            const transactions = await Promise.all(
                transactionIds.map(transactionId => this.getTransactionById(transactionId))
            );
            return transactions.filter(transaction => transaction !== null);
        } catch (error) {
            console.error("Failed to retrieve transactions by debtor email:", error);
            throw error;
        }
    } 

    async getTransactions(): Promise<TransactionRedisEntity[]> {
        try {
            await this.initialize();
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


    async createTransaction(transaction: TransactionRedisEntity): Promise<TransactionRedisEntity | null> {
        try {
            await this.initialize();

            const transactionHash = {
                id: transaction.id,
                amount: transaction.amount.toString(),
                currency: transaction.currency,
                payment_provider: transaction.payment_provider,
                debtor_email: transaction.debtor_email,
                beneficiary_email: transaction.beneficiary_email,
                status: transaction.status,
                transaction_date: transaction.transaction_date.toISOString(),
                transaction_ref: transaction.transaction_ref || '',
                description: transaction.description || '',
                metadata: JSON.stringify(transaction.metadata || {}),
            };

            await this.client.hSet(`transaction:${transaction.id}`, transactionHash);
            await this.client.sAdd('transaction_index', transaction.id);
            await this.client.sAdd(`debtor_transactions:${transaction.debtor_email}`, transaction.debtor_email);

            const exists = await this.client.exists(`transaction:${transaction.id}`);
            return exists === 1 ? transaction : null;
        } catch (error) {
            console.error("Failed to create transaction:", error);
            throw error;
        }
    }

    


    cancelTransactionById1(transactionId: string): Promise<TransactionAbstract | null> {
        throw new Error("Method not implemented.");
    }


    async cancelTransactionById(id: string): Promise<boolean> {
        try {
          // Récupérer l'email du débiteur avant de supprimer la transaction
          const transaction = await this.getTransactionById(id);
          if (!transaction) {
            return false; // La transaction n'existe pas
          }
      
          // Supprimer la transaction
          await this.client.del(`transaction:${id}`);
      
          // Supprimer l'entrée de l'index
          await this.client.hDel('transaction_index', `debtor_email:${transaction.debtor_email}`);
      
          return true;
        } catch (error) {
          console.error("Failed to delete transaction:", error);
          throw error;
        }
    }
}