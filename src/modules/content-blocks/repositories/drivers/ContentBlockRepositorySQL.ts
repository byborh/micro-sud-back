import { IContentBlockRepository } from "../contract/IContentBlockRepository";
import { Repository } from "typeorm";
import { IDatabase } from "@db/contract/IDatabase";
import { SQLDatabase } from "@db/drivers/sql.datasource";
import { ContentBlockSQLEntity } from "@modules/content-blocks/entity/sql/ContentBlock.entity";
import { ContentBlockAbstract } from "@modules/content-blocks/entity/ContentBlock.abstract";

export class ContentBlockRepositorySQL implements IContentBlockRepository {
    private repository: Repository<ContentBlockSQLEntity>;

    constructor(private db: IDatabase) {
        const dataSource = db as SQLDatabase;
        this.repository = dataSource.getDataSource().getRepository(ContentBlockSQLEntity);
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