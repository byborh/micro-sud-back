import { Permission } from "../domain/Permission";
import { PermissionRepository } from "../repositories/drivers/PermissionRepository";

export class PermissionService {
    private permissionRepository: PermissionRepository;

    constructor(permissionRepository: PermissionRepository) {
        this.permissionRepository = permissionRepository;
    }

    public async getPermissionById(permissionId: string): Promise<Permission | null> {
        return await this.permissionRepository.getPermissionById(permissionId);
    }

    public async getPermissions(): Promise<Permission[] | null> {
        return await this.permissionRepository.getPermissions();
    }

    public async createPermission(permission: Permission): Promise<Permission | null> {
        return await this.permissionRepository.createPermission(permission);
    }

    public async modifyPermission(permission: Permission): Promise<Permission | null> {
        return await this.permissionRepository.modifyPermission(permission);
    }

    public async deletePermission(permissionId: string): Promise<boolean> {
        return await this.permissionRepository.deletePermission(permissionId);
    }
}