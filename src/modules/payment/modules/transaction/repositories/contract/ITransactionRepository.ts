import { TransactionAbstract } from "../../entity/Transaction.abstract";

export interface ITransactionRepository {
    getTransactionByField(field: string, value: string): Promise<TransactionAbstract | null>;
    getTransactionById(transactionId: string): Promise<TransactionAbstract | null>;
    getTransactionsByDebtorEmail(userId: string): Promise<TransactionAbstract[] | null>;
    getTransactions(): Promise<TransactionAbstract[] | null>;
    createTransaction(transaction: TransactionAbstract): Promise<TransactionAbstract | null>;

    // à modifier, actuellement, ça permet de supprimer la transaction, mais il ne faut pas la supprimer
    cancelTransactionById(transactionId: string): Promise<boolean | null>;
}