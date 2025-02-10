import { UserRoles } from "@modules/user-roles/entity/UserRoles.entity";

export interface IUserRolesRepository {
    getUserRolesByMultipleFields(fields: string[], values: string[]): Promise<UserRoles[] | null>
    getUserRoles(): Promise<UserRoles[] | null>;
    createUserRoles(userRoles: UserRoles): Promise<UserRoles | null>;
}