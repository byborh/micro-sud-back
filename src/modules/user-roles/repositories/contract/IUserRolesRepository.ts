import { UserRoles } from "@modules/user-roles/entity/typeorm/UserRoles.entity";

export interface IUserRolesRepository {
    /**
     * Retrieves user roles based on multiple fields and their corresponding values.
     * 
     * @param fields - An array of field names (e.g., ["user_id", "role_id"]) to filter by.
     * @param values - An array of values corresponding to the fields (e.g., ["123", "456"]).
     * @returns A promise that resolves to an array of UserRoles objects matching the criteria,
     *          or `null` if the input is invalid or no matches are found.
     */
    getUserRolesByMultipleFields(fields: string[], values: string[]): Promise<UserRoles[] | null>;

    /**
     * Retrieves all user roles from the database.
     * 
     * @returns A promise that resolves to an array of all UserRoles objects,
     *          or `null` if no roles are found or an error occurs.
     */
    getUserRoles(): Promise<UserRoles[] | null>;

    /**
     * Creates a new user role entry in the database.
     * 
     * @param userRoles - The UserRoles object containing the data to be created.
     * @returns A promise that resolves to the created UserRoles object,
     *          or `null` if the creation fails.
     */
    createUserRoles(userRoles: UserRoles): Promise<UserRoles | null>;
}