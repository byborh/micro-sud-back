import { DatabaseType } from "@db/contract/DatabaseType";
import { ContentBlockContract } from "../contracts/IContentBlock";
import { ContentBlockRedisEntity } from "./redis/ContentBlock.entity";
import { ContentBlockSQLEntity } from "./sql/ContentBlock.entity";
import { ContentBlockAbstract } from "./ContentBlock.abstract";
import { ContentBlockMongoEntity } from "./mongo/ContentBlock.entity";

const databaseType: DatabaseType = (process.env.MY_DB as DatabaseType) || "redis"; // Default to Redis if not specified


export async function createContentBlockEntity(user: Partial<ContentBlockContract>, dbType: DatabaseType = databaseType): Promise<ContentBlockAbstract> {

    switch(dbType) {
        case "mysql":
        case "postgresql":
        case "sqlite":
        case "mariadb":
        case "mssql":
            return new ContentBlockSQLEntity(user);
        case "redis":
            return new ContentBlockRedisEntity(user);
        case "mongodb":
            return new ContentBlockMongoEntity(user);
        default:
            throw new Error("Unsupported database type.");
        
        // Add more cases for other database types that you want to support
    }
}