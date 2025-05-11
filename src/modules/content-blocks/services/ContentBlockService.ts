import { IContentBlockRepository } from "../repositories/contract/IContentBlockRepository";
import { ContentBlockAbstract } from "../entity/ContentBlock.abstract";
import { createContentBlockEntity } from "../entity/ContentBlock.factory";
import _ from "lodash";

export class ContentBlockService {
    constructor(private contentBlockRepository: IContentBlockRepository) {}

    // Get a content block by ID
    public async getContentBlockById(id: string): Promise<ContentBlockAbstract> {
        if (!id) throw new Error("Content block ID is required.");
        const block = await this.contentBlockRepository.findContentBlockById(id);
        if (!block) throw new Error("Content block not found.");
        return block;
    }

    // Get all content blocks
    public async getContentBlocks(): Promise<ContentBlockAbstract[]> {
        return await this.contentBlockRepository.getAllContentBlocks();
    }
    
    // Create content block
    public async createContentBlock(contentBlock: ContentBlockAbstract): Promise<ContentBlockAbstract> {
        const entity = await createContentBlockEntity(contentBlock);
        if (!entity.id || !entity.type) throw new Error("ID and Type are required.");

        const existing = await this.contentBlockRepository.findContentBlockById(entity.id);
        if (existing) throw new Error("Content block already exists.");

        const created = await this.contentBlockRepository.createContentBlock(entity);
        if (!created) throw new Error("Content block not created.");

        return created;
    }

    // Modify content block
    public async modifyContentBlock(id: string, update: Partial<ContentBlockAbstract>): Promise<ContentBlockAbstract> {
        const existing = await this.getContentBlockById(id);
        if (!existing) throw new Error("Content block not found.");

        let hasChanges = false;

        if (update.type && update.type !== existing.type) { existing.type = update.type; hasChanges = true; }
        if (update.title && update.title !== existing.title) { existing.title = update.title; hasChanges = true; }
        if (update.content && update.content !== existing.content) { existing.content = update.content; hasChanges = true; }
        if (update.img && update.img !== existing.img) { existing.img = update.img; hasChanges = true; }
        if (update.date && update.date !== existing.date) { existing.date = update.date; hasChanges = true; }

        if (!hasChanges) throw new Error("No changes detected.");

        const updated = await this.contentBlockRepository.updateContentBlock(existing);
        if (!updated) throw new Error("Content block not updated.");

        return updated;
    }   

    // Delete content block
    public async deleteContentBlock(id: string): Promise<boolean> {
        if (!id) throw new Error("Content block ID is required.");

        const exists = await this.getContentBlockById(id);
        if (!exists) throw new Error("Content block not found.");

        return await this.contentBlockRepository.deleteContentBlockById(id);
    }
}