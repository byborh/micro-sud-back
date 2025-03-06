import { DatabaseType } from "@db/contract/DatabaseType";
import { LogRedisEntity } from "./redis/Log.entity";
import { LogContract } from "../contracts/ILog";
import { LogAbstract } from "./Log.abstract";
import { LogSQLEntity } from "./sql/Log.entity";

const databaseType: DatabaseType = (process.env.MY_DB as DatabaseType) || "mysql"; // Default to MySQL if not specified


export async function createRoleEntity(log: Partial<LogContract>, dbType: DatabaseType = databaseType): Promise<LogAbstract> {

    // Validate required fields
    if (!log.id || !log.user_id || !log.action || !log.details || log.createdAt) {
        throw new Error("Missing required fields for Log.");
    }

    switch(dbType) {
        case "mysql":
        case "postgresql":
        case "sqlite":
        case "mariadb":
        case "mssql":
            return new LogSQLEntity(log);
        case "redis":
            return new LogRedisEntity(log);
        default:
            throw new Error("Unsupported database type.");
        
        // Add more cases for other database types that you want to support
    }
}