import { IChatAIRepository } from "../contract/IChatAIRepository";
import { RedisClientType } from "redis";
import { IDatabase } from "@db/contract/IDatabase";
import { ChatAIRedisEntity } from "@modules/chat-ai/entity/redis/ChatAI.entity";


export class ChatAIRepositoryRedis implements IChatAIRepository {
    private client: RedisClientType;

    constructor(private db: IDatabase) {
        this.client = db.getDataSoure();
    }


    submitPrompt(chatAI: ChatAIRedisEntity): Promise<ChatAIRedisEntity> {
        throw new Error("Method not implemented.");
    }
    getAllChatAIs(): Promise<ChatAIRedisEntity[]> {
        throw new Error("Method not implemented.");
    }
    getChatAIById(chatAIId: string): Promise<ChatAIRedisEntity> {
        throw new Error("Method not implemented.");
    }
    getChatAIsByUserId(userId: string): Promise<ChatAIRedisEntity[]> {
        throw new Error("Method not implemented.");
    }
    deleteChatAIById(chatAIId: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}