import { Request, Response, NextFunction } from "express";
import { IdGenerator } from "@core/idGenerator";
import { UserRolesService } from "../services/UserRolesService";
import { UserRoles } from "../entity/UserRoles.entity";

export class UserRolesController {
    private userRolesService: UserRolesService;

    constructor(userRolesService: UserRolesService) {
        this.userRolesService = userRolesService;
    }

    // Get a userRoles by ID
    public async getUserRolesById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Retrieve userRoles by ID using UserRolesService
            const userRoles = await this.userRolesService.getUserRolesById(req.params.user_id, req.params.role_id);
            
            // If no userRoles is found, return 404
            if (!userRoles) {
                res.status(404).json({ error: "UserRoles not found" });
                return;
            }

            // Return the userRoles data
            res.status(200).json(userRoles);
        } catch (error) {
            next(error);
        }
    }

    // Get all userRoless
    public async getAllUserRoles(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Retrieve all userRoless using UserRolesService
            const userRoless = await this.userRolesService.getUserRoles();

            // If no userRoless are found, return 404
            if (!userRoless || userRoless.length === 0) {
                res.status(404).json({ error: "No userRoless found" });
                return;
            }

            // Return all userRoless data
            res.status(200).json(userRoless);
        } catch (error) {
            next(error);
        }
    }

    // Create a userRoles
    public async createUserRoles(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { user_id, role_id } = req.body;

            // Check if required fields are provided
            if (!user_id || !role_id) {
                res.status(400).json({ error: "Action and resource are required." });
                return;
            }

            // Create new userRoles instance
            const userRoles = new UserRoles(user_id, role_id);

            // Create userRoles using UserRolesService
            const createdUserRoles = await this.userRolesService.createUserRoles(userRoles);

            // If creation fails, return 400
            if (!createdUserRoles) {
                res.status(400).json({ error: "UserRoles could not be created." });
                return;
            }

            // Return the created userRoles data
            res.status(201).json(createdUserRoles);
        } catch (error) {
            next(error);
        }
    }
}
