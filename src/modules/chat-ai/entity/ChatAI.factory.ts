import { DatabaseType } from "@db/contract/DatabaseType";
import { ChatAIContract } from "../contracts/IChatAI";
import { ChatAIRedisEntity } from "./redis/ChatAI.entity";
import { ChatAISQLEntity } from "./sql/ChatAI.entity";
import { ChatAIAbstract } from "./ChatAI.abstract";

const databaseType: DatabaseType = (process.env.MY_DB as DatabaseType) || "mysql"; // Default to MySQL if not specified


export async function createChatAIEntity(chatAI: Partial<ChatAIContract>, dbType: DatabaseType = databaseType): Promise<ChatAIAbstract> {

    switch(dbType) {
        case "mysql":
            return new ChatAISQLEntity(chatAI);
        case "redis":
            return new ChatAIRedisEntity(chatAI);
        default:
            throw new Error("Unsupported database type.");
        
        // Add more cases for other database types that you want to support
    }
}