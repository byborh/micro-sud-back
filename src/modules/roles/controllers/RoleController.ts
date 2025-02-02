import { Request, Response, NextFunction } from "express";
import { RoleService } from "../services/RoleService";
import { Role } from "../entity/Role.entity";
import { IdGenerator } from "@core/idGenerator";

export class RoleController {
    private permissionService: RoleService;

    constructor(permissionService: RoleService) {
        this.permissionService = permissionService;
    }

    // Get a permission by ID
    public async getRoleById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Retrieve permission by ID using RoleService
            const permission = await this.permissionService.getRoleById(req.params.id);
            
            // If no permission is found, return 404
            if (!permission) {
                res.status(404).json({ error: "Role not found" });
                return;
            }

            // Return the permission data
            res.status(200).json(permission);
        } catch (error) {
            next(error);
        }
    }

    // Get all permissions
    public async getAllRoles(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Retrieve all permissions using RoleService
            const permissions = await this.permissionService.getRoles();

            // If no permissions are found, return 404
            if (!permissions || permissions.length === 0) {
                res.status(404).json({ error: "No permissions found" });
                return;
            }

            // Return all permissions data
            res.status(200).json(permissions);
        } catch (error) {
            next(error);
        }
    }

    // Create a permission
    public async createRole(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, description } = req.body;

            // Check if required fields are provided
            if (!name || !description) {
                res.status(400).json({ error: "Action and resource are required." });
                return;
            }

            const idGenerator = IdGenerator.getInstance();
            const permissionId: string = idGenerator.generateId(16);

            // Create new permission instance
            const permission = new Role(permissionId, name, description,);

            // Create permission using RoleService
            const createdRole = await this.permissionService.createRole(permission);

            // If creation fails, return 400
            if (!createdRole) {
                res.status(400).json({ error: "Role could not be created." });
                return;
            }

            // Return the created permission data
            res.status(201).json(createdRole);
        } catch (error) {
            next(error);
        }
    }

    // Modify a permission
    public async modifyRole(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, description } = req.body;

            // Check if permission ID is provided
            if (!req.params.id) {
                res.status(400).json({ error: "Role ID is required." });
                return;
            }

            // Modify permission using RoleService
            const updatedRole = await this.permissionService.modifyRole(req.params.id, {
                name, description
            });

            // If modification fails, return 404
            if (!updatedRole) {
                res.status(404).json({ error: "Role could not be modified." });
                return;
            }

            // Return the updated permission data
            res.status(200).json(updatedRole);
        } catch (error) {
            next(error);
        }
    }

    // Delete a permission
    public async deleteRole(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Delete permission using RoleService
            const isDeleted = await this.permissionService.deleteRole(req.params.id);

            // If deletion fails, return 404
            if (!isDeleted) {
                res.status(404).json({ error: "Role could not be deleted." });
                return;
            }

            // Return success message for deletion
            res.status(200).json({ message: "Role deleted successfully." });
        } catch (error) {
            next(error);
        }
    }
}
