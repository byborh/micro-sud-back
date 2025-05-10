import { IContentBlockRepository } from "../repositories/contract/IContentBlockRepository";
import { ContentBlockAbstract } from "../entity/ContentBlock.abstract";
import { createContentBlockEntity } from "../entity/ContentBlock.factory";
import _ from "lodash";

export class ContentBlockService {
    constructor(private contentBlockRepository: IContentBlockRepository) {}

    // Get a content block by ID
    public async getContentBlockById(id: string): Promise<ContentBlockAbstract | null> {
        try {
            // Verify if id is provided
            if (!id) {
                throw new Error("Content block ID is required.");
            }

            // Call repository to find a content block by ID
            const contentBlockEntity: ContentBlockAbstract = await this.contentBlockRepository.findContentBlockById(id);

            // If no content block is found, return null
            if (!contentBlockEntity) {
                throw new Error("Content block not found.");
            }

            // Return the content block
            return contentBlockEntity;
        } catch (error) {
            console.error("Error finding content block in ContentBlockService:", error);
            throw new Error("Failed to find content block by id.");
        }
    }

    // Get all content blocks
    public async getContentBlocks(): Promise<Array<ContentBlockAbstract> | null> {
        try {
            // Call repository to find all content blocks
            const contentBlocksEntity: ContentBlockAbstract[] = await this.contentBlockRepository.getAllContentBlocks();

            // If no content blocks are found, return null
            if (!contentBlocksEntity) return null;

            // Return all content blocks in DTO format
            return contentBlocksEntity;
        } catch (error) {
            console.error("Error finding content blocks in ContentBlockService:", error);
            throw new Error("Failed to find content blocks.");
        }
    }
    
    // Create content block
    public async createContentBlock(contentBlock: ContentBlockAbstract): Promise<ContentBlockAbstract | null> {
        try {
            // Factory to create a correct type of content block entity
            const contentBlockEntity = await createContentBlockEntity(contentBlock);

            // Verify required fields
            if (!contentBlockEntity.id) throw new Error("ID is required");
            if (!contentBlockEntity.type) throw new Error("Type is required");

            // Verify if content block exists
            const existingContentBlock: ContentBlockAbstract | null = 
                await this.contentBlockRepository.findContentBlockById(contentBlockEntity.id);
            if (existingContentBlock) {
                console.error("Content block already exists:", existingContentBlock);
                throw new Error("Content block already exists.");
            }

            // Create content block from repository
            const createdContentBlock: ContentBlockAbstract | null = 
                await this.contentBlockRepository.createContentBlock(contentBlockEntity);

            // Content block didn't created
            if (!createdContentBlock) throw new Error("Content block didn't created...")

            // Entity to DTO
            return contentBlockEntity;
        } catch (error) {
            console.error("Error creating content block in ContentBlockService:", error);
            throw new Error("Failed to create content block.");
        }
    }

    // Modify content block
    public async modifyContentBlock(id: string, contentBlock: Partial<ContentBlockAbstract>): Promise<ContentBlockAbstract | null> {
        try {
            // Factory to create a correct type of content block entity
            const contentBlockEntity = await createContentBlockEntity(contentBlock);

            // Verify if content block exists
            const existingContentBlockAbstract: ContentBlockAbstract | null = await this.getContentBlockById(id);
            if (!existingContentBlockAbstract) {
                throw new Error("Content block not found.");
            }
    
            // Factory to create a correct type of content block entity
            const existingContentBlockEntity = await createContentBlockEntity(existingContentBlockAbstract);
    
            // Variable to track changes
            let hasChanges: boolean = false;
    
            // Compare fields and update if necessary
            if (contentBlockEntity.type && contentBlockEntity.type !== existingContentBlockEntity.type) {
                existingContentBlockEntity.type = contentBlockEntity.type;
                hasChanges = true;
            }
    
            if (contentBlockEntity.title && contentBlockEntity.title !== existingContentBlockEntity.title) {
                existingContentBlockEntity.title = contentBlockEntity.title;
                hasChanges = true;
            }
    
            if (contentBlockEntity.content && contentBlockEntity.content !== existingContentBlockEntity.content) {
                existingContentBlockEntity.content = contentBlockEntity.content;
                hasChanges = true;
            }
    
            if (contentBlockEntity.img && contentBlockEntity.img !== existingContentBlockEntity.img) {
                existingContentBlockEntity.img = contentBlockEntity.img;
                hasChanges = true;
            }
    
            if (contentBlockEntity.date && contentBlockEntity.date !== existingContentBlockEntity.date) {
                existingContentBlockEntity.date = contentBlockEntity.date;
                hasChanges = true;
            }
    
            // If no changes are detected, do nothing
            if (!hasChanges) {
                throw new Error("No changes detected.");
            }
    
            // Update the content block in DB
            const updatedContentBlock: ContentBlockAbstract | null = 
                await this.contentBlockRepository.updateContentBlock(existingContentBlockEntity);
    
            // If content block didn't updated, return null
            if (!updatedContentBlock) {
                throw new Error("Content block not updated.");
            }
    
            // Return the updated content block
            return updatedContentBlock;
        } catch (error) {
            console.error("Error modifying content block in ContentBlockService:", error);
            throw new Error("Failed to modify content block.");
        }
    }    

    // Delete content block
    public async deleteContentBlock(id: string): Promise<boolean> {
        try {
            // Verify if id is provided
            if (!id) {
                throw new Error("Content block ID is required.");
            }

            // Find the content block by ID
            const contentBlock: ContentBlockAbstract | null = await this.getContentBlockById(id);
            if (!contentBlock) {
                console.error("Content block not found:", id);
                return false;
            }

            // Delete the content block
            const isDeleted: boolean = await this.contentBlockRepository.deleteContentBlockById(id);

            // Return true if the content block is deleted, false otherwise
            return isDeleted;
        } catch (error) {
            console.error("Error deleting content block in ContentBlockService:", error);
            throw new Error("Failed to delete content block.");
        }
    }
}