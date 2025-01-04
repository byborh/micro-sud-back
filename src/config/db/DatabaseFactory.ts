import { IDatabase } from "./contract/IDatabase";
import { MySQLDatabase } from "./drivers/MySQLDatabase";
import { RedisDatabase } from "./drivers/RedisDatabase";
import { TDatabase } from "./drivers/TDatabase";

export class DatabaseFactory {
    static createDatabase(type: TDatabase, config: any): IDatabase {
        switch(type) {
            case "mysql":
                return new MySQLDatabase();
            case "redis":
                return new RedisDatabase(config);
            default:
                throw new Error("Invalid database type");
        }
    }
}