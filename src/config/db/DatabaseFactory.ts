import { IDatabase } from "./contract/IDatabase";
import { SQLDatabase } from "./drivers/sql.datasource";
import { RedisDatabase } from "./drivers/redis.datasource";

export class DatabaseFactory {
    static createDatabase(type: "mysql" | "postgresql" | "sqlite" | "mariadb" | "mssql" | "redis"): IDatabase {

        console.log("ALL IS OK FOR THE MOMENT ! DatabaseFactory.ts");

        switch (type) {
            case "mysql":
            case "postgresql":
            case "sqlite":
            case "mariadb":
            case "mssql":
                console.log("ALL IS OK FOR THE MOMENT ! DatabaseFactory.ts");
                return new SQLDatabase();
            case "redis":
                return new RedisDatabase();
        
            // Add more cases for other database types that you want to support
                    
            default:
                throw new Error(`Unsupported database type: ${type}`);
        }
    }
}