import { Permission } from "@modules/permissions/entity/Permission.entity";
import { IPermissionRepository } from "../contract/IPermissionRepository";
import { Repository } from "typeorm";
import { AppDataSource } from "@db/drivers/AppDataSource";

export class PermissionRepositoryMySQL implements IPermissionRepository {
    private repository: Repository<Permission>;

    constructor() { this.repository = AppDataSource.getRepository(Permission); }

    async getPermissionByField(field: string, value: string): Promise<Permission | null> {
        // Validate field
        const allowedFields = ['id', 'action', 'resource', 'description'];
        if (!allowedFields.includes(field)) throw new Error(`Invalid field: ${field}`);

        // Find permission by field
        const row = await this.repository.findOne({ where: { [field]: value } });

        // Validate rows
        if (!row) {
            console.log("No permission found for field:", field, "with value:", value);
            return null;
        }

        const permission = Array.isArray(row) ? row[0] : row;

        console.log("Permission found:", permission);

        // Verify if all required fields are present
        if (!permission.id || !permission.action || !permission.resource) {
            console.error("Invalid permission data:", permission);
            throw new Error("Permission data is incomplete.");
        }

        return permission || null;
    }

    async getPermissionById(permissionId: string): Promise<Permission | null> {
        if (!permissionId) return null;
        return await this.getPermissionByField('id', permissionId) || null;
    }

    async getPermissions(): Promise<Permission[]> {
        // Fetch all permissions from the database
        const rawResult: Permission[] = await this.repository.find();
    
        // Verify if rawResult is an array or a single object
        const rowsArray = Array.isArray(rawResult) ? rawResult : [rawResult];
    
        if (rowsArray.length === 0) {
            console.log("No permissions found in the database.");
            return [];
        }
    
        return rowsArray;
    }

    async createPermission(permission: Permission): Promise<Permission | null> {
        // Insert the permission in the database
        const result = await this.repository.save(permission);

        // If the permission is not created, return null
        if (!result) return null;

        // Return the permission
        return this.getPermissionById(permission.id) || null;
    }

    async modifyPermission(permission: Permission): Promise<Permission | null> {
        // Be sure that permission exists
        const existingPermission: Permission = await this.repository.findOne({ where: { id: permission.id } });
        if (!existingPermission) return null;

        // Merge permission data with existing permission data
        this.repository.merge(existingPermission, permission);

        // Save the modified permission
        const result = await this.repository.save(existingPermission);

        // Return the permission
        return this.getPermissionById(permission.id) || null;
    }

    async deletePermission(permissionId: string): Promise<boolean> {
        const result = await this.repository.delete(permissionId);

        // Return true if the permission is deleted, false otherwise
        return !result ? false : true;
    }
}
