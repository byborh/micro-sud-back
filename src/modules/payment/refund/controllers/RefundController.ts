import { Request, Response, NextFunction } from "express";
import { RefundService } from "../services/RefundService";

export class RefundController {
    constructor(private readonly roleService: RefundService) {}

    // Get a refund by ID
    public async getRefundById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Retrieve refund by ID using RoleService
            const refund = await this.roleService.getRefundById(req.params.id);
            
            // If no refund is found, return 404
            if (!refund) {
                res.status(404).json({ error: "Role not found" });
                return;
            }

            // Return the refund data
            res.status(200).json(refund);
        } catch (error) {
            next(error);
        }
    }

    // Get all roles
    public async getRefunds(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Retrieve all roles using RoleService
            const roles = await this.roleService.getRefunds();

            // If no roles are found, return 404
            if (!roles || roles.length === 0) {
                res.status(404).json({ error: "No roles found" });
                return;
            }

            // Return all roles data
            res.status(200).json(roles);
        } catch (error) {
            next(error);
        }
    }

    // Create a refund
    public async createRefund(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // const { name, description } = req.body;

            // Check if required fields are provided
            // if (!name || !description) {
                // res.status(400).json({ error: "Action and resource are required." });
                // return;
            // }

            // Create refund using RoleService
            // const createdRole = await this.roleService.createRefund(refund);

            // If creation fails, return 400
            // if (!createdRole) {
                // res.status(400).json({ error: "Role could not be created." });
                // return;
            // }

            // Return the created refund data
            // res.status(201).json(createdRole);
        } catch (error) {
            next(error);
        }
    }
}
