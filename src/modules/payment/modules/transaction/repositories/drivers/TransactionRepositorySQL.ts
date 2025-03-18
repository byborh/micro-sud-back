import { Repository } from "typeorm";
import { SQLDatabase } from "@db/drivers/sql.datasource";
import { IDatabase } from "@db/contract/IDatabase";
import { ITransactionRepository } from "../contract/ITransactionRepository";
import { TransactionAbstract } from "../../entity/Transaction.abstract";
import { TransactionSQLEntity } from "../../entity/sql/Transaction.entity";

export class TransactionRepositorySQL implements ITransactionRepository {
    private repository: Repository<TransactionSQLEntity>;

    constructor(private db: IDatabase) {
        const dataSource = db as SQLDatabase;
        this.repository = dataSource.getDataSource().getRepository(TransactionSQLEntity);
    }
    getPendingEscrowTransactions(): Promise<TransactionAbstract[] | null> {
        throw new Error("Method not implemented.");
    }



    getTransactionByField(field: string, value: string): Promise<TransactionAbstract | null> {
        throw new Error("Method not implemented.");
    }
    getTransactionById(transactionId: string): Promise<TransactionAbstract | null> {
        throw new Error("Method not implemented.");
    }
    getTransactionsByDebtorEmail(userId: string): Promise<TransactionAbstract[] | null> {
        throw new Error("Method not implemented.");
    }
    getTransactions(): Promise<TransactionAbstract[] | null> {
        throw new Error("Method not implemented.");
    }
    async createTransaction(transaction: TransactionAbstract): Promise<TransactionAbstract | null> {
        try {
            if (transaction.metadata && typeof transaction.metadata !== 'object') {
                throw new Error("Metadata must be a valid JSON object.");
            }

            const result = await this.repository.save(transaction);

            return result || null;
        } catch(error) {
            console.error("Error creating transaction in TransactionRepository:", error);
            throw new Error("Error creating transaction in TransactionRepository.");
        }
    }
    cancelTransactionById(transactionId: string): Promise<boolean | null> {
        throw new Error("Method not implemented.");
    }
}
