import { Repository } from "typeorm";
import { IDatabase } from "@db/contract/IDatabase";
import { MongoDatabase } from "@db/drivers/mongo.datasource";
import { ContentBlockMongoEntity } from "@modules/content-blocks/entity/mongo/ContentBlock.entity";
import { IContentBlockRepository } from "../contract/IContentBlockRepository";
import { ContentBlockAbstract } from "@modules/content-blocks/entity/ContentBlock.abstract";

export class ContentBlockRepositoryMongo implements IContentBlockRepository {
    private repository: Repository<ContentBlockMongoEntity>;

    constructor(private db: IDatabase) {
        const dataSource = db as MongoDatabase;
        this.repository = dataSource.getDataSource().getRepository(ContentBlockMongoEntity);
    }

    findContentBlockById(id: string): Promise<ContentBlockAbstract | null> {
        throw new Error("Method not implemented.");
    }
    findContentBlocksByType(type: string): Promise<ContentBlockAbstract[]> {
        throw new Error("Method not implemented.");
    }
    getAllContentBlocks(): Promise<ContentBlockAbstract[]> {
        throw new Error("Method not implemented.");
    }
    createContentBlock(block: ContentBlockAbstract): Promise<ContentBlockAbstract> {
        throw new Error("Method not implemented.");
    }
    updateContentBlock(block: ContentBlockAbstract): Promise<ContentBlockAbstract> {
        throw new Error("Method not implemented.");
    }
    deleteContentBlockById(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}