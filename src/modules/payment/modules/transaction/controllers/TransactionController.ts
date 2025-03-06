import { Request, Response, NextFunction } from "express";
import { TransactionService } from "../services/TransactionService";

export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    public async testTransaction(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Retrieve transaction by ID using RoleService
            const { amount, currency } = req.body;
            
            return await this.transactionService.testTransaction(amount, currency);
        } catch(error) {
            next(error);
        }
    }

    // Get a transaction by ID
    public async getTransactionById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Retrieve transaction by ID using RoleService
            const transaction = await this.transactionService.getTransactionById(req.params.id);
            
            // If no transaction is found, return 404
            if (!transaction) {
                res.status(404).json({ error: "Role not found" });
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
            // Retrieve all transactions using RoleService
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

    // Create a transaction
    public async createTransaction(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // const { name, description } = req.body;

            // Check if required fields are provided
            // if (!name || !description) {
                // res.status(400).json({ error: "Action and resource are required." });
                // return;
            // }

            // Create transaction using RoleService
            // const createdRole = await this.transactionService.createTransaction(transaction);

            // If creation fails, return 400
            // if (!createdRole) {
                // res.status(400).json({ error: "Role could not be created." });
                // return;
            // }

            // Return the created transaction data
            // res.status(201).json(createdRole);
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
                res.status(400).json({ error: "Role ID is required." });
                return;
            }

            // Modify transaction using RoleService
            const updatedRole = await this.transactionService.cancelTransactionById(req.params.id);

            // If modification fails, return 404
            if (!updatedRole) {
                res.status(404).json({ error: "Role could not be modified." });
                return;
            }

            // Return the updated transaction data
            res.status(200).json(updatedRole);
        } catch (error) {
            next(error);
        }
    }
}
