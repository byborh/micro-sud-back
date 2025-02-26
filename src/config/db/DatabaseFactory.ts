import { IDatabase } from "./contract/IDatabase";
import { SQLDatabase } from "./drivers/sql.datasource";
import { RedisDatabase } from "./drivers/redis.datasource";

export class DatabaseFactory {
    static createDatabase(type: "mysql" | "redis"): IDatabase {
        switch (type) {
            case "mysql":
                return new SQLDatabase();
            case "redis":
                return new RedisDatabase();

            // Add more cases for other database types that you want to support
            
            default:
                throw new Error(`Unsupported database type: ${type}`);
        }
    }
}