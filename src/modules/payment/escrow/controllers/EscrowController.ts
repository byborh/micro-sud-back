import { Request, Response, NextFunction } from "express";
import { EscrowService } from "../services/EscrowService";

export class EscrowController {
    constructor(private readonly roleService: EscrowService) {}

    // Get a escrow by ID
    public async getEscrowById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Retrieve escrow by ID using RoleService
            const escrow = await this.roleService.getEscrowById(req.params.id);
            
            // If no escrow is found, return 404
            if (!escrow) {
                res.status(404).json({ error: "Role not found" });
                return;
            }

            // Return the escrow data
            res.status(200).json(escrow);
        } catch (error) {
            next(error);
        }
    }

    // Get all roles
    public async getEscrows(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Retrieve all roles using RoleService
            const roles = await this.roleService.getEscrows();

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

    // Create a escrow
    public async createEscrow(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // const { name, description } = req.body;

            // Check if required fields are provided
            // if (!name || !description) {
                // res.status(400).json({ error: "Action and resource are required." });
                // return;
            // }

            // Create escrow using RoleService
            // const createdRole = await this.roleService.createEscrow(escrow);

            // If creation fails, return 400
            // if (!createdRole) {
                // res.status(400).json({ error: "Role could not be created." });
                // return;
            // }

            // Return the created escrow data
            // res.status(201).json(createdRole);
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

            // Create escrow using RoleService
            // const createdRole = await this.roleService.createEscrow(escrow);

            // If creation fails, return 400
            // if (!createdRole) {
                // res.status(400).json({ error: "Role could not be created." });
                // return;
            // }

            // Return the created escrow data
            // res.status(201).json(createdRole);
        } catch (error) {
            next(error);
        }
    }

}
