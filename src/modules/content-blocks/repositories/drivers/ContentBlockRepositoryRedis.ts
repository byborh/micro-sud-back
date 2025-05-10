import { IContentBlockRepository } from "../contract/IContentBlockRepository";
import { IDatabase } from "@db/contract/IDatabase";
import { RedisClientType } from "redis";
import { ContentBlockRedisEntity } from "@modules/content-blocks/entity/redis/ContentBlock.entity";

export class ContentBlockRepositoryRedis implements IContentBlockRepository {
    private client: RedisClientType;
    private isInitialized: Promise<void>; // Be sure to wait for initialization
    
    constructor(private db: IDatabase) {
        this.client = db.getDataSource() as RedisClientType;
        this.isInitialized = this.initialized();
    }

    // Connect to database
    async initialized(): Promise<void> {
        try {
            if (!this.client.isOpen) {
                await this.client.connect();
            }
        } catch (error) {
            console.error('Failed to connect to Redis:', error);
            throw error;
        }
    }

    async findContentBlockByField(field: string, value: string): Promise<ContentBlockRedisEntity | null> {
        return null; // Don't use this method (forbidden)
    }

    async findContentBlockById(contentBlockId: string): Promise<ContentBlockRedisEntity | null> {
        try {
            await this.isInitialized; // Wait for initialization

            const contentBlockData = await this.client.hGetAll(`content_block:${contentBlockId}`);

            return Object.keys(contentBlockData).length > 0 
                ? ContentBlockRedisEntity.fromRedisHash(contentBlockData) 
                : null;
        } catch (error) {
            console.error("Failed to find content block by ID:", error);
            throw error;
        }
    }

    async findContentBlocksByType(type: string): Promise<ContentBlockRedisEntity[]> {
        try {
            await this.isInitialized; // Wait for initialization
            const contentBlocks: ContentBlockRedisEntity[] = [];
            let cursor: number = 0;

            do {
                const reply = await this.client.scan(cursor, { MATCH: "content_block:*", COUNT: 100 });
                cursor = reply.cursor;
                const keys = reply.keys;

                for (const key of keys) {
                    const contentBlockData = await this.client.hGetAll(key);
                    if (contentBlockData.type === type) {
                        contentBlocks.push(ContentBlockRedisEntity.fromRedisHash(contentBlockData));
                    }
                }
            } while (cursor !== 0);

            return contentBlocks;
        } catch (error) {
            console.error("Failed to find content blocks by type:", error);
            throw error;
        }
    }

    async getAllContentBlocks(): Promise<ContentBlockRedisEntity[]> {
        try {
            await this.isInitialized; // Wait for initialization
            const contentBlocks: ContentBlockRedisEntity[] = [];
            let cursor: number = 0;

            do {
                const reply = await this.client.scan(cursor, { MATCH: "content_block:*", COUNT: 100 });
                cursor = reply.cursor;
                const keys = reply.keys;

                for (const key of keys) {
                    const contentBlockData = await this.client.hGetAll(key);
                    contentBlocks.push(ContentBlockRedisEntity.fromRedisHash(contentBlockData));
                }
            } while (cursor !== 0);

            return contentBlocks;
        } catch (error) {
            console.error("Failed to get all content blocks:", error);
            throw error;
        }
    }

    async createContentBlock(block: ContentBlockRedisEntity): Promise<ContentBlockRedisEntity | null> {
        try {
            await this.isInitialized; // Wait for initialization

            await this.client.hSet(`content_block:${block.id}`, block.toRedisHash());

            // Verify if content block was created
            const exists = await this.client.exists(`content_block:${block.id}`);
            
            return exists === 1 ? block : null;
        } catch (error) {
            console.error("Failed to create content block:", error);
            throw error;
        }
    }

    async updateContentBlock(block: ContentBlockRedisEntity): Promise<ContentBlockRedisEntity | null> {
        try {
            await this.isInitialized; // Wait for initialization

            await this.client.hSet(`content_block:${block.id}`, block.toRedisHash());

            // Verify if content block was updated
            const exists = await this.client.exists(`content_block:${block.id}`);
            
            return exists === 1 ? block : null;
        } catch (error) {
            console.error("Failed to modify content block:", error);
            throw error;
        }
    }

    async deleteContentBlockById(contentBlockId: string): Promise<boolean> {
        try {
            await this.isInitialized; // Wait for initialization

            // Delete the content block
            const deleted = await this.client.del(`content_block:${contentBlockId}`);
            
            return deleted > 0;
        } catch (error) {
            console.error("Failed to delete content block:", error);
            throw error;
        }
    }
}