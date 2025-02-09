import { ChatAI } from "@modules/chat-ai/entity/ChatAI.entity";

export interface IChatAIRepository {
    submitPrompt(chatAI: ChatAI) : Promise<ChatAI>;
}