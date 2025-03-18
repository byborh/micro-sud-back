import { Repository } from "typeorm";
import { MongoDatabase } from "@db/drivers/mongo.datasource";
import { IDatabase } from "@db/contract/IDatabase";
import { ITransactionRepository } from "../contract/ITransactionRepository";
import { TransactionMongoEntity } from "../../entity/mongo/Transaction.entity";
import { TransactionAbstract } from "../../entity/Transaction.abstract";

export class TransactionRepositoryMongo implements ITransactionRepository {
    private repository: Repository<TransactionMongoEntity>;

    constructor(private db: IDatabase) {
        const dataSource = db as MongoDatabase;
        this.repository = dataSource.getDataSource().getRepository(TransactionMongoEntity);
    }
    getPendingEscrowTransactions(): Promise<TransactionAbstract[] | null> {
        throw new Error("Method not implemented.");
    }
    getTransactionsByDebtorEmail(userId: string): Promise<TransactionAbstract[] | null> {
        throw new Error("Method not implemented.");
    }
    cancelTransactionById(transactionId: string): Promise<boolean | null> {
        throw new Error("Method not implemented.");
    }

    async getTransactionByField(field: string, value: string): Promise<TransactionMongoEntity | null> {
        try {
            const allowedFields = ['id', 'name', 'description'];
            if (!allowedFields.includes(field)) throw new Error(`Invalid field: ${field}`);

            const row = await this.repository.findOne({ where: { [field]: value } });
            if (!row) return null;

            if (!row.id) {
                console.error("Invalid transaction data:", row);
                throw new Error("TransactionMongoEntity data is incomplete.");
            }

            return row;
        } catch (error) {
            console.error("Failed to find transaction by field:", error);
            return null;
        }
    }

    async getTransactionById(transactionId: string): Promise<TransactionMongoEntity | null> {
        try {
            return await this.repository.findOneBy({ id: transactionId }) || null;
        } catch (error) {
            console.error("Failed to find transaction by id:", error);
            return null;
        }
    }

    async getTransactionByName(name: string): Promise<TransactionMongoEntity | null> {
        return await this.getTransactionByField('name', name);
    }

    async getTransactions(): Promise<TransactionMongoEntity[]> {
        try {
            return await this.repository.find();
        } catch (error) {
            console.error("Failed to find transactions:", error);
            return [];
        }
    }

    async createTransaction(transaction: TransactionMongoEntity): Promise<TransactionMongoEntity | null> {
        try {
            const transactionEntity = await this.createTransaction(transaction);

            const result = await this.repository.save(transactionEntity);
            return result ? await this.getTransactionById(result.id) : null;
        } catch (error) {
            console.error("Failed to create transaction:", error);
            return null;
        }
    }

    async modifyTransaction(transaction: TransactionMongoEntity): Promise<TransactionMongoEntity | null> {
        try {
            const transactionEntity = await this.createTransaction(transaction);

            const existingTransaction = await this.repository.findOneBy({ id: transaction.id });
            if (!existingTransaction) return null;

            this.repository.merge(existingTransaction, transactionEntity);
            await this.repository.save(existingTransaction);

            return await this.getTransactionById(transactionEntity.id);
        } catch (error) {
            console.error("Failed to modify transaction:", error);
            return null;
        }
    }

    async deleteTransaction(transactionId: string): Promise<boolean> {
        try {
            const result = await this.repository.delete({ id: transactionId });
            return result.affected ? true : false;
        } catch (error) {
            console.error("Failed to delete transaction:", error);
            return false;
        }
    }
}