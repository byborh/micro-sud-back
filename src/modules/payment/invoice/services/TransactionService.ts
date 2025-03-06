import { TransactionAbstract } from "../entity/Transaction.abstract";
import { ITransactionRepository } from "../repositories/contract/ITransactionRepository";

export class TransactionService {
    private transactionRepository: ITransactionRepository;

    constructor(transactionRepository: ITransactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    // Get Transaction By Id
    public async getTransactionById(transactionId: string): Promise<TransactionAbstract | null> {
        try {
            return await this.transactionRepository.getTransactionById(transactionId);
        } catch (error) {
            console.error("Error finding transaction in TransactionService:", error);
            throw new Error("Failed to find transaction.");
        }
    }


    // Get Transaction By User Id
    public async getTransactionByUserId(userId: string): Promise<TransactionAbstract | null> {
        try {
            return await this.transactionRepository.getTransactionById(userId);
        } catch (error) {
            console.error("Error finding transaction in TransactionService:", error);
            throw new Error("Failed to find transaction.");
        }
    }


    // Get All Transactions
    public async getTransactions(): Promise<TransactionAbstract[] | null> {
        try {
            return await this.transactionRepository.getTransactions();
        } catch (error) {
            console.error("Error finding all transactions in TransactionService:", error);
            throw new Error("Failed to find all transactions.");
        }
    }


    // Create Transaction
    public async createTransaction(transaction: TransactionAbstract): Promise<TransactionAbstract | null> {
        try {
            return await this.transactionRepository.createTransaction(transaction);
        } catch (error) {
            console.error("Error creating transaction in TransactionService:", error);
            throw new Error("Failed to create transaction.");
        }
    }

    // Create Transaction
    public async cancelTransactionById(transactionId: string): Promise<TransactionAbstract | null> {
        try {
            return await this.transactionRepository.cancelTransactionById(transactionId);
        } catch (error) {
            console.error("Error creating transaction in TransactionService:", error);
            throw new Error("Failed to create transaction.");
        }
    }
}
