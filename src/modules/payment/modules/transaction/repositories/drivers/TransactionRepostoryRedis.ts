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
    getTransactionById(transactionId: string): Promise<TransactionAbstract | null> {
        throw new Error("Method not implemented.");
    }
    getTransactionByUserId(userId: string): Promise<TransactionAbstract | null> {
        throw new Error("Method not implemented.");
    }
    getTransactions(): Promise<TransactionAbstract[] | null> {
        throw new Error("Method not implemented.");
    }


    async createTransaction(transaction: TransactionRedisEntity): Promise<TransactionRedisEntity | null> {
        try {
            await this.initialize();

            // Convertir l'objet transaction en hash Redis
            const transactionHash = {
                id: transaction.id,
                amount: transaction.amount.toString(), // Convertir en chaîne pour Redis
                currency: transaction.currency,
                payment_provider: transaction.payment_provider,
                debtor_email: transaction.debtor_email,
                beneficiary_email: transaction.beneficiary_email,
                status: transaction.status,
                transaction_date: transaction.transaction_date.toISOString(), // Convertir en chaîne
                transaction_ref: transaction.transaction_ref || '', // Optionnel
                description: transaction.description || '', // Optionnel
                metadata: JSON.stringify(transaction.metadata || {}), // Sérialiser les métadonnées en JSON
            };

            // Stocker la transaction dans Redis
            await this.client.hSet(`transaction:${transaction.id}`, transactionHash);

            // Créer un index pour la recherche par email du débiteur
            await this.client.hSet('transaction_index', `debtor_email:${transaction.debtor_email}`, transaction.id);

            // Vérifier si la transaction a bien été créée
            const exists = await this.client.exists(`transaction:${transaction.id}`);
            return exists === 1 ? transaction : null;
        } catch (error) {
            console.error("Failed to create transaction:", error);
            throw error;
        }
      }
    


    cancelTransactionById(transactionId: string): Promise<TransactionAbstract | null> {
        throw new Error("Method not implemented.");
    }    
}