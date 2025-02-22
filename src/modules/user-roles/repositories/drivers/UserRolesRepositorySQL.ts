import { Repository } from "typeorm";
import { IUserRolesRepository } from "../contract/IUserRolesRepository";
import { MySQLDatabase } from "@db/drivers/mysql.datasource";
import { IDatabase } from "@db/contract/IDatabase";
import { UserRolesAbstract } from "@modules/user-roles/entity/UserRoles.abstract";

export class UserRolesRepositorySQL implements IUserRolesRepository {
    private repository: Repository<UserRolesAbstract>;

    constructor(private db: IDatabase) {
        const dataSource = db as MySQLDatabase;
        this.repository = dataSource.getDataSoure().getRepository(UserRolesAbstract);
    }


    async getUserRolesByMultipleFields(fields: string[], values: string[]): Promise<UserRolesAbstract[] | null> {
        // Validate fields
        if (fields.length !== values.length || fields.length === 0 || values.length === 0) return null;

        const conditions: any = {};

        // Build conditions
        fields.forEach((field, index) => {
            conditions[field] = values[index];
        })

        // Find userRoles
        const rawResult: UserRolesAbstract[] = await this.repository.find({where: conditions}) || null;

        // Verify if rawResult is an array or a single object
        const rowsArray = Array.isArray(rawResult) ? rawResult : [rawResult];

        if (rowsArray.length === 0) return [];

        // Return the array of userRoles
        return rowsArray;
    }

    async getUserRoles(): Promise<UserRolesAbstract[]> {
        // Fetch all userRole from the database
        const rawResult: UserRolesAbstract[] = await this.repository.find();
    
        // Verify if rawResult is an array or a single object
        const rowsArray = Array.isArray(rawResult) ? rawResult : [rawResult];
    
        if (rowsArray.length === 0) return [];
    
        return rowsArray;
    }

    async createUserRoles(userRoles: UserRolesAbstract): Promise<UserRolesAbstract | null> {
        // Insert the userRoles in the database
        const result = await this.repository.save(userRoles);

        // If the userRoles is not created, return null
        if (!result) return null;

        // Return the userRoles
        const userRolesEntity: UserRolesAbstract[] | null = await this.getUserRolesByMultipleFields(['user_id', 'role_id'], [userRoles.user_id, userRoles.role_id]) || null;

        return userRolesEntity[0];
    }
}
