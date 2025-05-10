import { DatabaseType } from "@db/contract/DatabaseType";
import { UserContract } from "../contracts/IUser";
import { UserRedisEntity } from "./redis/ContentBlock.entity";
import { UserSQLEntity } from "./sql/ContentBlock.entity";
import { UserAbstract } from "./ContentBlock.abstract";
import { UserMongoEntity } from "./mongo/ContentBlock.entity";

const databaseType: DatabaseType = (process.env.MY_DB as DatabaseType) || "mysql"; // Default to MySQL if not specified


export async function createUserEntity(user: Partial<UserContract>, dbType: DatabaseType = databaseType): Promise<UserAbstract> {

    switch(dbType) {
        case "mysql":
        case "postgresql":
        case "sqlite":
        case "mariadb":
        case "mssql":
            return new UserSQLEntity(user);
        case "redis":
            return new UserRedisEntity(user);
        case "mongodb":
            return new UserMongoEntity(user);
        default:
            throw new Error("Unsupported database type.");
        
        // Add more cases for other database types that you want to support
    }
}