import { ChatAI } from "@modules/chat-ai/entity/typeorm/ChatAI.entity";

export interface IChatAIRepository {
    submitPrompt(chatAI: ChatAI) : Promise<ChatAI>;
    getAllChatAIs() : Promise<ChatAI[]>;
    getChatAIById(chatAIId: string) : Promise<ChatAI>;
    getChatAIsByUserId(userId: string) : Promise<ChatAI[]>;
    deleteChatAIById(chatAIId: string) : Promise<boolean>;
}