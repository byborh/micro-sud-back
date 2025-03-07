import { TransactionAbstract } from "../entity/Transaction.abstract";
import { ITransactionRepository } from "../repositories/contract/ITransactionRepository";
import { getPaymentProvider } from "@modules/payment/config/payment/PaymentFactory";
import { PaymentMethod } from "../contracts/TPaymentMethod";
import { InterractWithUser } from "@modules/payment/cores/db/interractWithUser";

export class TransactionService {
    private transactionRepository: ITransactionRepository; 
    private paymentProvider = getPaymentProvider();

    constructor(transactionRepository: ITransactionRepository) {
        this.transactionRepository = transactionRepository;
        this.paymentProvider.initialize();
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

    public async createStripeAccount(email: string): Promise<string> {
        try {
            const interractWithUser = InterractWithUser.getInstance();

            // Verify if user has already a stripe account
            const account = await interractWithUser.isAccountExist(email, "stripe");
            if(account) throw new Error("User already has a stripe account.");

            // Create Stripe Account
            const stripeCustomerId = await this.paymentProvider.createCustomerId(email);

            // Return Payment Account
            return await interractWithUser.updateUser(stripeCustomerId, email, "stripe");
        } catch (error) {
            console.error("Error creating stripe account in TransactionService:", error);
            throw new Error("Failed to find transaction.");
        }
    }


    public async createPaymentAccount(email: string, payment_method: PaymentMethod): Promise<string> {
        try {
            // Verify if user has already a payment account
            const account = await InterractWithUser.getInstance().isAccountExist(email, payment_method);
            if(account) throw new Error("User already has a payment account.");

            // Create Payment Account
            const paymentCustomerId = await this.paymentProvider.createCustomerId(email);

            // Return Payment Account
            return await InterractWithUser.getInstance().updateUser(paymentCustomerId, email, "stripe");
        } catch (error) {
            console.error("Error create paypal account in TransactionService:", error);
            throw new Error("Failed to find transaction.");
        }
    }


    // Create Transaction
    public async createPaymentTransaction(transaction: TransactionAbstract): Promise<TransactionAbstract | null> {
        try {
            // Verify if debitor and creditor has a payment account
            let debitorPaymentId = await InterractWithUser.getInstance().isAccountExist(transaction.debtor_id, transaction.payment_method);
            let creditorPaymentId = await InterractWithUser.getInstance().isAccountExist(transaction.beneficiary_id, transaction.payment_method);
            
            // If debitor does not have a payment account, create one
            if(!debitorPaymentId) {
                debitorPaymentId = await this.paymentProvider.createCustomerId(transaction.debtor_id);
            }

            // If creditor does not have a payment account, create one
            if(!creditorPaymentId) {
                creditorPaymentId = await this.createPaymentAccount(transaction.beneficiary_id, transaction.payment_method);
            }

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
