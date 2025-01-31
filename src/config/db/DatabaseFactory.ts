import { IDatabase } from "./contract/IDatabase";
import { AppDataSource } from "./drivers/AppDataSource";
import { RedisDatabase } from "./drivers/RedisDatabase";
import { DatabaseType } from "./drivers/DatabaseType";

export class DatabaseFactory {
    static async createDatabase(type: DatabaseType, config: any) {
        switch(type) {
            case "mysql":
                if(!AppDataSource.isInitialized) {
                    await AppDataSource.initialize();
                }
                return AppDataSource;
            case "redis":
                return new RedisDatabase(config);
            default:
                throw new Error("Invalid database type");
        }
    }
}