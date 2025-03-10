import { Request, Response, NextFunction } from "express";
import { RefundService } from "../services/RefundService";
import { RefundAbstract } from "../entity/Refund.abstract";
import { IdGenerator } from "@core/idGenerator";
import { TStatus } from "../contracts/TStatus";

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
            const { transaction_id, amount } = req.body;


            const refund = {
                id: IdGenerator.getInstance().generateId(),
                transaction_id: transaction_id,
                amount: amount,
                status: "pending" as TStatus
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
