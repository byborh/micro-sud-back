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
    async createTransaction(transaction: TransactionAbstract): Promise<TransactionAbstract | null> {
        const result = await this.repository.save(transaction);

        return result || null;
    }
    cancelTransactionById(transactionId: string): Promise<TransactionAbstract | null> {
        throw new Error("Method not implemented.");
    }
}
