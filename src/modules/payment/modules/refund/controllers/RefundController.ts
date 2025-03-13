import { Request, Response, NextFunction } from "express";
import { RefundService } from "../services/RefundService";
import { RefundAbstract } from "../entity/Refund.abstract";
import { TStatus } from "../contracts/TStatus";
import { IdGenerator } from "@core/idGenerator";

export class RefundController {
    constructor(private readonly refundService: RefundService) {}

    // Get a refund by ID
    public async getRefundById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Retrieve refund by ID using RefundService
            const refund = await this.refundService.getRefundById(req.params.id);
            
            // If no refund is found, return 404
            if (!refund) {
                res.status(404).json({ error: "Refund not found" });
                return;
            }

            // Return the refund data
            res.status(200).json(refund);
        } catch (error) {
            next(error);
        }
    }

    // Get all refunds
    public async getRefunds(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Retrieve all refunds using RefundService
            const refunds = await this.refundService.getRefunds();

            // If no refunds are found, return 404
            if (!refunds || refunds.length === 0) {
                res.status(404).json({ error: "No refunds found" });
                return;
            }

            // Return all refunds data
            res.status(200).json(refunds);
        } catch (error) {
            next(error);
        }
    }

    // Create a refund
    public async createRefund(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { transaction_id, currency, amount } = req.body;
            if(amount === 0) res.status(400).json({ error: "Amount must be greater than 0" });

            // Generate an id for refund
            const id = IdGenerator.getInstance().generateId();

            const refund = {
                id: id,
                transaction_id: transaction_id as string,
                transaction_ref: "",
                charge_ref: "",
                status: "pending" as TStatus,
                amount: amount as number,
                refund_ref: "",
                createdAt: new Date()
            } as RefundAbstract;

            // Create refund using RefundService
            const createdRefund = await this.refundService.createRefund(refund);

            // If creation fails, return 400
            if (!createdRefund) {
                res.status(400).json({ error: "Refund could not be created." });
                return;
            }

            // Return the created refund data
            res.status(201).json(createdRefund);
        } catch (error) {
            next(error);
        }
    }
}
