import { TransactionAbstract } from "../../entity/Transaction.abstract";

export interface ITransactionRepository {
    getTransactionByField(field: string, value: string): Promise<TransactionAbstract | null>;
    getTransactionById(transactionId: string): Promise<TransactionAbstract | null>;
    getTransactionByUserId(userId: string): Promise<TransactionAbstract | null>;
    getTransactions(): Promise<TransactionAbstract[] | null>;
    createTransaction(transaction: TransactionAbstract): Promise<TransactionAbstract | null>;
    cancelTransactionById(transactionId: string): Promise<TransactionAbstract | null>;
}