import { IDatabase } from "./contract/IDatabase";
import { MySQLDatabase } from "./drivers/MySQLDatabase";
import { RedisDatabase } from "./drivers/RedisDatabase";
import { DatabaseType } from "./drivers/DatabaseType";

export class DatabaseFactory {
    static createDatabase(type: DatabaseType, config: any): IDatabase {
        switch(type) {
            case "mysql":
                return new MySQLDatabase(config);
            case "redis":
                return new RedisDatabase(config);
            default:
                throw new Error("Invalid database type");
        }
    }
}