import { Request, Response, NextFunction } from "express";
import { LogService } from "../services/LogService";

export class LogController {
    constructor(private readonly roleService: LogService) {}

    // Get a log by user ID
    public async getLogByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Retrieve log by ID using RoleService
            const log = await this.roleService.getLogByUserId(req.params.id);
            
            // If no log is found, return 404
            if (!log) {
                res.status(404).json({ error: "Role not found" });
                return;
            }

            // Return the log data
            res.status(200).json(log);
        } catch (error) {
            next(error);
        }
    }

    // Get a log by ID
    public async getLogByTransactionId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Retrieve log by ID using RoleService
            const log = await this.roleService.getLogByTransactionId(req.params.id);
            
            // If no log is found, return 404
            if (!log) {
                res.status(404).json({ error: "Role not found" });
                return;
            }

            // Return the log data
            res.status(200).json(log);
        } catch (error) {
            next(error);
        }
    }

    // Get all roles
    public async getLogs(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Retrieve all roles using RoleService
            const roles = await this.roleService.getLogs();

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
}
