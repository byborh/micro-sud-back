import { ContentBlockAbstract } from "@modules/content-blocks/entity/ContentBlock.abstract";

export interface IContentBlockRepository {
    findContentBlockById(id: string): Promise<ContentBlockAbstract | null>;
    findContentBlocksByType(type: string): Promise<ContentBlockAbstract[]>;

    getAllContentBlocks(): Promise<ContentBlockAbstract[]>;
    createContentBlock(block: ContentBlockAbstract): Promise<ContentBlockAbstract>;
    updateContentBlock(block: ContentBlockAbstract): Promise<ContentBlockAbstract>;
    deleteContentBlockById(id: string): Promise<boolean>;
}