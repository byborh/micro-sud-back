import { Request, Response, NextFunction } from "express";
import { TransactionService } from "../services/TransactionService";
import { TransactionAbstract } from "../entity/Transaction.abstract";
import { IdGenerator } from "@core/idGenerator";

export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    // Get a transaction by ID
    public async getTransactionById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id;

            // Retrieve transaction by ID using TransactionService
            const transaction = await this.transactionService.getTransactionById(id);
            
            // If no transaction is found, return 404
            if (!transaction) {
                res.status(404).json({ error: "Transaction not found by id" });
                return;
            }

            // Return the transaction data
            res.status(200).json(transaction);
        } catch (error) {
            next(error);
        }
    }


    // Get a transaction by debtor email
    public async getTransactionsByDebtorEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const debtorEmail = req.params.debtorEmail;

            // Retrieve transaction by ID using TransactionService
            const transaction = await this.transactionService.getTransactionsByDebtorEmail(debtorEmail);

            // If no transaction is found, return 404
            if (!transaction) {
                res.status(404).json({ error: "Transaction not found by email" });
                return;
            }

            // Return the transaction data
            res.status(200).json(transaction);
        } catch (error) {
            next(error);
        }
    }

    // Get all transactions
    public async getTransactions(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Retrieve all transactions using TransactionService
            const transactions = await this.transactionService.getTransactions();

            // If no transactions are found, return 404
            if (!transactions || transactions.length === 0) {
                res.status(404).json({ error: "No transactions found" });
                return;
            }

            // Return all transactions data
            res.status(200).json(transactions);
        } catch (error) {
            next(error);
        }
    }


    public async createPaymentAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, payment_provider } = req.body;

            const paymentAccount: string = await this.transactionService.createPaymentAccount(email, payment_provider);
            
            // If creation fails, return 400
            if (!paymentAccount) {
                res.status(400).json({ error: "Payment account could not be created." });
                return;
            }

            res.status(200).json(paymentAccount);
        } catch(error) {
            next(error);
        }
    }

    // Create a transaction
    public async createTransaction(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
           const {
                amount,
                currency,
                payment_provider,
                debtor_email,
                beneficiary_email,
                payment_identifier,
                description,
                is_escrow
            } = req.body;

            if(debtor_email === beneficiary_email) {
                res.status(400).json({ error: "Debtor and beneficiary emails must be different." });
                return;
            }

            const id = IdGenerator.getInstance().generateId();

            // The escrow duration is set to 7 days by default
            const escrowDuration = parseInt(process.env.ESCROW_DURATION || "7", 10); // en jours

            // Calculate the release date
            const releaseDate = is_escrow 
                ? new Date(Date.now() + escrowDuration * 24 * 60 * 60 * 1000) 
                : new Date(); 

            // Create transaction object
            const transaction = {
                id: id,
                amount: amount,
                currency: currency,
                payment_provider: payment_provider,
                debtor_email: debtor_email,
                beneficiary_email: beneficiary_email,
                status: "processing", // Set the status to "processing" for the moment
                transaction_date: new Date(),
                description: description,
                is_escrow: is_escrow,
                release_date: releaseDate
            } as TransactionAbstract;

            const createdTransaction: TransactionAbstract = await this.transactionService.createPaymentTransaction(transaction, payment_identifier);
            
            // If creation fails, return 400
            if (!createdTransaction) {
                res.status(400).json({ error: "Transaction could not be created." });
                return;
            }

            // Return the created transaction data
            res.status(201).json(createdTransaction);
        } catch (error) {
            next(error);
        }
    }

    // Modify a transaction
    public async cancelTransactionById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const transactionId = req.params.transactionId;

            // Check if transaction ID is provided
            if (!transactionId.startsWith("pi_")) {
                res.status(400).json({ error: "Transaction ID is not valid." });
                return;
            }

            // Modify transaction using TransactionService
            const updatedTransaction = await this.transactionService.cancelTransactionById(transactionId);

            // If modification fails, return 404
            if (!updatedTransaction) {
                res.status(404).json({ error: "Transaction could not be cancelled." });
                return;
            }

            // Return the updated transaction data
            res.status(200).json(updatedTransaction);
        } catch (error) {
            next(error);
        }
    }
}
