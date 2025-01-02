import { Permission } from "@modules/permission/domain/Permission";

export interface IPermissionRepository {
    getPermissionByField(field: string, value: string): Promise<Permission | null>;
    getPermissionById(permissionId: string): Promise<Permission | null>;
    getPermissions(): Promise<Permission[] | null>;
    createPermission(permission: Permission): Promise<Permission | null>;
    modifyPermission(permission: Permission): Promise<Permission | null>;
    deletePermission(permissionId: string): Promise<boolean>;
}