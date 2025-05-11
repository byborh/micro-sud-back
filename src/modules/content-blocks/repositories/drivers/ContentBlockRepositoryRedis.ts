import { IContentBlockRepository } from "../contract/IContentBlockRepository";
import { IDatabase } from "@db/contract/IDatabase";
import { RedisClientType } from "redis";
import { ContentBlockRedisEntity } from "@modules/content-blocks/entity/redis/ContentBlock.entity";

export class ContentBlockRepositoryRedis implements IContentBlockRepository {
    private client: RedisClientType;
    private isInitialized: Promise<void>;

    constructor(private db: IDatabase) {
        this.client = db.getDataSource() as RedisClientType;
        this.isInitialized = this.initialized();
    }

    private async initialized(): Promise<void> {
        try {
            if (!this.client.isOpen) {await this.client.connect();}
        } catch (error) {
            console.error('[Redis] Failed to connect:', error);
            throw error;
        }
    }

    async findContentBlockById(contentBlockId: string): Promise<ContentBlockRedisEntity | null> {
        try {
            await this.isInitialized;
            const contentBlockData = await this.client.hGetAll(`content_block:${contentBlockId}`);
            return Object.keys(contentBlockData).length > 0
                ? ContentBlockRedisEntity.fromRedisHash(contentBlockData)
                : null;
        } catch (error) {
            console.error("[Redis] Failed to find content block by ID:", error);
            throw error;
        }
    }

    async findContentBlocksByType(type: string): Promise<ContentBlockRedisEntity[]> {
        try {
            await this.isInitialized;
            const keys = await this.client.sMembers(`content_block:type:${type}`);
            const contentBlocks: ContentBlockRedisEntity[] = [];

            for (const id of keys) {
                const data = await this.client.hGetAll(`content_block:${id}`);
                if (Object.keys(data).length > 0) {
                    contentBlocks.push(ContentBlockRedisEntity.fromRedisHash(data));
                }
            }

            return contentBlocks;
        } catch (error) {
            console.error("[Redis] Failed to find content blocks by type:", error);
            throw error;
        }
    }

    async getAllContentBlocks(): Promise<ContentBlockRedisEntity[]> {
        try {
            await this.isInitialized;
            const contentBlocks: ContentBlockRedisEntity[] = [];
            let cursor: number = 0;

            do {
                const reply = await this.client.scan(cursor, { MATCH: "content_block:*", COUNT: 100 });
                cursor = reply.cursor;
                const keys = reply.keys;

                for (const key of keys) {
                    const data = await this.client.hGetAll(key);
                    if (Object.keys(data).length > 0) {
                        contentBlocks.push(ContentBlockRedisEntity.fromRedisHash(data));
                    }
                }
            } while (cursor !== 0);

            return contentBlocks;
        } catch (error) {
            console.error("[Redis] Failed to get all content blocks:", error);
            throw error;
        }
    }

    async createContentBlock(block: ContentBlockRedisEntity): Promise<ContentBlockRedisEntity | null> {
        try {
            await this.isInitialized;
            const key = `content_block:${block.id}`;
            await this.client.hSet(key, block.toRedisHash());

            // Indexation secondaire
            if (block.type) {
                await this.client.sAdd(`content_block:type:${block.type}`, block.id);
            }

            const exists = await this.client.exists(key);
            return exists === 1 ? block : null;
        } catch (error) {
            console.error("[Redis] Failed to create content block:", error);
            throw error;
        }
    }

    async updateContentBlock(block: ContentBlockRedisEntity): Promise<ContentBlockRedisEntity | null> {
        try {
            await this.isInitialized;
            const key = `content_block:${block.id}`;
            const existing = await this.client.hGet(key, "type");

            await this.client.hSet(key, block.toRedisHash());

            // Met à jour l'index si le type a changé
            if (existing && existing !== block.type && existing.length > 0) {
                await this.client.sRem(`content_block:type:${existing}`, block.id);
            }
            if (block.type) {
                await this.client.sAdd(`content_block:type:${block.type}`, block.id);
            }

            const exists = await this.client.exists(key);
            return exists === 1 ? block : null;
        } catch (error) {
            console.error("[Redis] Failed to update content block:", error);
            throw error;
        }
    }

    async deleteContentBlockById(contentBlockId: string): Promise<boolean> {
        try {
            await this.isInitialized;

            const existing = await this.client.hGet(`content_block:${contentBlockId}`, "type");
            if (existing) {
                await this.client.sRem(`content_block:type:${existing}`, contentBlockId);
            }

            const deleted = await this.client.del(`content_block:${contentBlockId}`);
            return deleted > 0;
        } catch (error) {
            console.error("[Redis] Failed to delete content block:", error);
            throw error;
        }
    }
}
