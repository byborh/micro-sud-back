import { IChatAIRepository } from "../contract/IChatAIRepository";
import { Repository } from "typeorm";
import { ChatAI } from "@modules/chat-ai/entity/ChatAI.entity";
import { MySQLDatabase } from "@db/drivers/mysql.datasource";
import { IDatabase } from "@db/contract/IDatabase";

export class ChatAIRepositoryMySQL implements IChatAIRepository {
    private repository: Repository<ChatAI>;

    constructor(private db: IDatabase) {
        const dataSource = db as MySQLDatabase;
        this.repository = dataSource.getDataSoure().getRepository(ChatAI);
    }

    async submitPrompt(chatAI: ChatAI): Promise<ChatAI> {
        const result = await this.repository.save(chatAI);
        return result || null;
    }

    async getAllChatAIs(): Promise<ChatAI[]> {
        const result = await this.repository.find();
        return result || null;
    }

    async getChatAIById(chatAIId: string): Promise<ChatAI> {
        const result = await this.repository.findOneBy({ id: chatAIId });
        return result || null;
    }


    async getChatAIsByUserId(userId: string): Promise<ChatAI[]> {
        const result: ChatAI[] = await this.repository.find({  where: { user_id: userId } });
        return result || null;
    }

    async deleteChatAIById(chatAIId: string): Promise<boolean> {
        const result = await this.repository.delete(chatAIId);
        return result.affected !== 0;
    }
}
