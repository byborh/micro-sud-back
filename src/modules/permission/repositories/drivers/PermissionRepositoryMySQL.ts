import { Permission } from "@modules/permission/domain/Permission";
import { IPermissionRepository } from "../contract/IPermissionRepository";
import { IDatabase } from "@db/contract/IDatabase";

export class PermissionRepositoryMySQL implements IPermissionRepository {
    private db: IDatabase;

    constructor(db: IDatabase) {
        // Injection of database
        this.db = db;
    }

    async getPermissionByField(field: string, value: string): Promise<Permission | null> { return null; }

    async getPermissionById(permissionId: string): Promise<Permission | null> { return null; }

    async getPermissions(): Promise<Permission[] | null> { return null; }

    async createPermission(permission: Permission): Promise<Permission | null> { return null; }

    async modifyPermission(permission: Permission): Promise<Permission | null> { return null; }

    async deletePermission(permissionId: string): Promise<boolean> { return true; }
}