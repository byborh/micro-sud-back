import { Request, Response, NextFunction } from "express";
import { EscrowService } from "../services/EscrowService";

export class EscrowController {
    constructor(private readonly escrowService: EscrowService) {}

    // Get a escrow by ID
    public async getEscrowById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Retrieve escrow by ID using EscrowService
            const escrow = await this.escrowService.getEscrowById(req.params.id);
            
            // If no escrow is found, return 404
            if (!escrow) {
                res.status(404).json({ error: "Escrow not found" });
                return;
            }

            // Return the escrow data
            res.status(200).json(escrow);
        } catch (error) {
            next(error);
        }
    }

    // Get all escrows
    public async getEscrows(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Retrieve all escrows using EscrowService
            const escrows = await this.escrowService.getEscrows();

            // If no escrows are found, return 404
            if (!escrows || escrows.length === 0) {
                res.status(404).json({ error: "No escrows found" });
                return;
            }

            // Return all escrows data
            res.status(200).json(escrows);
        } catch (error) {
            next(error);
        }
    }

    // Create a escrow
    public async createEscrow(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // const { name, description } = req.body;

            // Check if required fields are provided
            // if (!name || !description) {
                // res.status(400).json({ error: "Action and resource are required." });
                // return;
            // }

            // Create escrow using EscrowService
            // const createdEscrow = await this.escrowService.createEscrow(escrow);

            // If creation fails, return 400
            // if (!createdEscrow) {
                // res.status(400).json({ error: "Escrow could not be created." });
                // return;
            // }

            // Return the created escrow data
            // res.status(201).json(createdEscrow);
        } catch (error) {
            next(error);
        }
    }


    // Release a escrow
    public async releaseEscrow(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // const { name, description } = req.body;

            // Check if required fields are provided
            // if (!name || !description) {
                // res.status(400).json({ error: "Action and resource are required." });
                // return;
            // }

            // Create escrow using EscrowService
            // const createdEscrow = await this.escrowService.createEscrow(escrow);

            // If creation fails, return 400
            // if (!createdEscrow) {
                // res.status(400).json({ error: "Escrow could not be created." });
                // return;
            // }

            // Return the created escrow data
            // res.status(201).json(createdEscrow);
        } catch (error) {
            next(error);
        }
    }

}
