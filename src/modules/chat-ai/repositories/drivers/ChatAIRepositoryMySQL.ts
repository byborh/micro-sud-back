import { IChatAIRepository } from "../contract/IChatAIRepository";
import { Repository } from "typeorm";
import { AppDataSource } from "@db/drivers/AppDataSource";
import { ChatAI } from "@modules/chat-ai/entity/ChatAI.entity";

export class ChatAIRepositoryMySQL implements IChatAIRepository {
    private repository: Repository<ChatAI>;

    constructor() {
        this.repository = AppDataSource.getRepository(ChatAI);
    }

    async submitPrompt(chatAI: ChatAI): Promise<ChatAI> {
        const result = await this.repository.save(chatAI);
        return result || null;
    }
}
