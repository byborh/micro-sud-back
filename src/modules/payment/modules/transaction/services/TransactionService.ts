import { TransactionAbstract } from "../entity/Transaction.abstract";
import { ITransactionRepository } from "../repositories/contract/ITransactionRepository";
import { getPaymentProvider } from "@modules/payment/config/payment/PaymentFactory";
import { paymentPovider } from "../contracts/TPaymentProvider";
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
    public async getTransactionsByDebtorEmail(email: string): Promise<TransactionAbstract[] | null> {
        try {
            const transactions: TransactionAbstract[] = await this.transactionRepository.getTransactionsByDebtorEmail(email);

            if(!transactions) {
                throw new Error("Failed to find transactions.");
            }

            return transactions;
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


    public async createPaymentAccount(email: string, payment_provider: paymentPovider): Promise<string> {
        try {
            // Verify if user has already a payment account
            let account: string = await InterractWithUser.getInstance().isAccountExist(email, payment_provider);
            if(!account) {
                // Create Payment Account
                const paymentCustomerId = await this.paymentProvider.createCustomerId(email);

                // Return Payment Account
                account =  await InterractWithUser.getInstance().updateUserPaymentId(paymentCustomerId, email, "stripe");
            }

            return account;
        } catch (error) {
            console.error("Error create paypal account in TransactionService:", error);
            throw new Error("Failed to find transaction.");
        }
    }


    // Create Transaction
    public async createPaymentTransaction(transaction: TransactionAbstract, payment_identifier?: string): Promise<TransactionAbstract | null> {
        try {
            // Verify if debitor has a payment account
            let debitorPaymentId = await InterractWithUser.getInstance().isAccountExist(transaction.debtor_email, transaction.payment_provider);
            
            // If debitor does not have a payment account, create one
            if(!debitorPaymentId) {
                debitorPaymentId = await this.paymentProvider.createCustomerId(transaction.debtor_email);
            }

            let paymentIntent;

            // Create a transaction beetween debitor and creditor !
            if(payment_identifier) {
                paymentIntent = await this.paymentProvider.directPayment(
                    transaction,
                    payment_identifier
                );
            } else { paymentIntent = await this.paymentProvider.generateLinkForPayment(transaction); }
            
            
                
            // Update Transaction's data
            transaction.transaction_ref = paymentIntent.id;
            transaction.status = paymentIntent.status;
            transaction.metadata = {
                ...transaction.metadata,
                payment_method_types: paymentIntent.payment_method_types,
                client_secret: paymentIntent.client_secret
            };

            // Verify if stripe has a redirect url
            if (!paymentIntent.confirm && paymentIntent.next_action?.redirect_to_url) {
                transaction.metadata =  {
                    ...transaction.metadata,
                    return_url: paymentIntent.next_action.redirect_to_url.url
                };
            }

            console.log("THIS IS THE PAYMENT INTENT:", paymentIntent);
            console.log("THIS IS THE TRANSACTION:", transaction);

            return await this.transactionRepository.createTransaction(transaction);
        } catch (error) {
            console.error("Error creating transaction in TransactionService:", error);
            throw new Error("Failed to create transaction.");
        }
    }

    // Cancel Transaction
    public async cancelTransactionById(transactionId: string): Promise<boolean | null> {
        try {
            return await this.transactionRepository.cancelTransactionById(transactionId);
        } catch (error) {
            console.error("Error creating transaction in TransactionService:", error);
            throw new Error("Failed to create transaction.");
        }
    }
}
