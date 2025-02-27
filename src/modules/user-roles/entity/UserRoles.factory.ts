import { DatabaseType } from "@db/contract/DatabaseType";
import { UserRolesContract } from "../contracts/IUserRoles";
import { UserRolesAbstract } from "./UserRoles.abstract";
import { UserRolesRedisEntity } from "./redis/UserRoles.entity";
import { UserRolesSQLEntity } from "./sql/UserRoles.entity";


const databaseType: DatabaseType = (process.env.MY_DB as DatabaseType) || "mysql"; // Default to MySQL if not specified


export async function createUserRolesEntity(role: Partial<UserRolesContract>, dbType: DatabaseType = databaseType): Promise<UserRolesAbstract> {

    switch(dbType) {
        case "mysql":
        case "postgresql":
        case "sqlite":
        case "mariadb":
        case "mssql":
            return new UserRolesSQLEntity(role);
        case "redis":
            return new UserRolesRedisEntity(role);
        default:
            throw new Error("Unsupported database type.");
        
        // Add more cases for other database types that you want to support
    }
}