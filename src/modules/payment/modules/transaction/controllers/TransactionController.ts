import { Request, Response, NextFunction } from "express";
import { TransactionService } from "../services/TransactionService";
import { TransactionAbstract } from "../entity/Transaction.abstract";
import { IdGenerator } from "@core/idGenerator";
import { PaymentMethod } from "../contracts/TPaymentMethod";

export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    // Get a transaction by ID
    public async getTransactionById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Retrieve transaction by ID using TransactionService
            const transaction = await this.transactionService.getTransactionById(req.params.id);
            
            // If no transaction is found, return 404
            if (!transaction) {
                res.status(404).json({ error: "Transaction not found" });
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
            const { email, name, payment_method } = req.body;

            // Validate email and name
            if (!email || !name || !payment_method) {
                res.status(400).json({ error: "Email, name and payment method are required." });
                return;
            }

            const paymentAccount: string = await this.transactionService.createPaymentAccount(email, payment_method);
            
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
           const { amount, currency, payment_method, debtor_id, beneficiary_id, transaction_ref, description } = req.body;

            // Check if required fields are provided
            if (!amount || !currency || !payment_method || !debtor_id || !beneficiary_id || !transaction_ref || !description) {
                res.status(400).json({ error: "Required fields are missing." });
                return;
            }

            const idGenrator = IdGenerator.getInstance();
            const id = idGenrator.generateId();

            // Create transaction object
            const transaction = {
                id: id,
                amount: amount,
                currency: currency,
                payment_method: payment_method,
                debtor_id: debtor_id,
                beneficiary_id: beneficiary_id,
                status: "pending", // Set the status to "pending" for the moment
                transaction_date: new Date(),
                transaction_ref: transaction_ref,
                description: description
            } as TransactionAbstract;

            const createdTransaction: TransactionAbstract = await this.transactionService.createPaymentTransaction(transaction);;
            
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
            const { name, description } = req.body;

            // Check if transaction ID is provided
            if (!req.params.id) {
                res.status(400).json({ error: "Transaction ID is required." });
                return;
            }

            // Modify transaction using TransactionService
            const updatedTransaction = await this.transactionService.cancelTransactionById(req.params.id);

            // If modification fails, return 404
            if (!updatedTransaction) {
                res.status(404).json({ error: "Transaction could not be modified." });
                return;
            }

            // Return the updated transaction data
            res.status(200).json(updatedTransaction);
        } catch (error) {
            next(error);
        }
    }
}
