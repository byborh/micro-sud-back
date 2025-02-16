import { ChatAI } from "@modules/chat-ai/entity/typeorm/ChatAI.entity";
import { IChatAIRepository } from "../contract/IChatAIRepository";
import { RedisClientType } from "redis";
import { IDatabase } from "@db/contract/IDatabase";


export class ChatAIRepositoryRedis implements IChatAIRepository {
    private client: RedisClientType;

    constructor(private db: IDatabase) {
        this.client = db.getDataSoure();
    }


    submitPrompt(chatAI: ChatAI): Promise<ChatAI> {
        throw new Error("Method not implemented.");
    }
    getAllChatAIs(): Promise<ChatAI[]> {
        throw new Error("Method not implemented.");
    }
    getChatAIById(chatAIId: string): Promise<ChatAI> {
        throw new Error("Method not implemented.");
    }
    getChatAIsByUserId(userId: string): Promise<ChatAI[]> {
        throw new Error("Method not implemented.");
    }
    deleteChatAIById(chatAIId: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}