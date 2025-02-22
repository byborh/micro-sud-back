import { IChatAIRepository } from "../contract/IChatAIRepository";
import { Repository } from "typeorm";
import { MySQLDatabase } from "@db/drivers/mysql.datasource";
import { IDatabase } from "@db/contract/IDatabase";
import { ChatAIAbstract } from "@modules/chat-ai/entity/ChatAI.abstract";

export class ChatAIRepositorySQL implements IChatAIRepository {
    private repository: Repository<ChatAIAbstract>;

    constructor(private db: IDatabase) {
        const dataSource = db as MySQLDatabase;
        this.repository = dataSource.getDataSoure().getRepository(ChatAIAbstract);
    }

    async submitPrompt(chatAI: ChatAIAbstract): Promise<ChatAIAbstract> {
        const result = await this.repository.save(chatAI);
        return result || null;
    }

    async getAllChatAIs(): Promise<ChatAIAbstract[]> {
        const result = await this.repository.find();
        return result || null;
    }

    async getChatAIById(chatAIId: string): Promise<ChatAIAbstract> {
        const result = await this.repository.findOneBy({ id: chatAIId });
        return result || null;
    }


    async getChatAIsByUserId(userId: string): Promise<ChatAIAbstract[]> {
        const result: ChatAIAbstract[] = await this.repository.find({  where: { user_id: userId } });
        return result || null;
    }

    async deleteChatAIById(chatAIId: string): Promise<boolean> {
        const result = await this.repository.delete(chatAIId);
        return result.affected !== 0;
    }
}
