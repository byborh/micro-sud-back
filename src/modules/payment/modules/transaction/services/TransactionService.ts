import { TransactionAbstract } from "../entity/Transaction.abstract";
import { ITransactionRepository } from "../repositories/contract/ITransactionRepository";
import { getPaymentProvider } from "@modules/payment/config/payment/PaymentFactory";

export class TransactionService {
    private transactionRepository: ITransactionRepository; 
    private paymentProvider = getPaymentProvider();

    constructor(transactionRepository: ITransactionRepository) {
        this.transactionRepository = transactionRepository;
        this.paymentProvider.initialize();
    }


    public async testTransaction(amount: number, currency: string): Promise<any> {
        try {
            const paymentIntent = await this.paymentProvider.charge(
                amount,
                currency,
                "user_id"
            )

            return paymentIntent.client_secret;
        } catch (error) {
            console.error("Error finding transaction in TransactionService:", error);
            throw new Error("Failed to find transaction.");
        }
    }

    public async createPaymentAccount() {}

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
    public async createStripeTransaction(transaction: TransactionAbstract): Promise<TransactionAbstract | null> {
        try {
            return await this.transactionRepository.createTransaction(transaction);
        } catch (error) {
            console.error("Error creating transaction in TransactionService:", error);
            throw new Error("Failed to create transaction.");
        }
    }

    // Cancel Transaction
    public async cancelTransactionById(transactionId: string): Promise<TransactionAbstract | null> {
        try {
            return await this.transactionRepository.cancelTransactionById(transactionId);
        } catch (error) {
            console.error("Error creating transaction in TransactionService:", error);
            throw new Error("Failed to create transaction.");
        }
    }
}
