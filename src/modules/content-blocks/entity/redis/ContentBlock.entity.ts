import { ContentBlockContract } from '@modules/content-blocks/contracts/IContentBlock';
import { ContentBlockAbstract } from '../ContentBlock.abstract';
import { TTypeName } from '@modules/content-blocks/contracts/TTypeName';

export class ContentBlockRedisEntity extends ContentBlockAbstract {
    id: string;
    type: TTypeName;
    title?: string;
    content?: string;
    img?: string;
    date?: Date;

    data: Record<string, any> | null;

    constructor(data: Partial<ContentBlockContract>) {
        super(data.id!, data.type, data.title, data.content, data.img, data.date);

        this.id = data.id!;
        this.type = data.type!;
        this.title = data.title! ?? null;
        this.content = data.content! ?? null;
        this.img = data.img! ?? null;
        this.date = data.date! ?? new Date();
    }

    // Convert object to Redis hash
    toRedisHash(): { [key: string]: string } {
        return {
            id: this.id,
            type: this.type,
            title: this.title ?? "",
            content: this.content ?? "",
            img: this.img ?? "",
            date: this.date.toISOString(),
        };
    }


    // Convert Redis hash to object
    static fromRedisHash(hash: { [key: string]: string }): ContentBlockRedisEntity {
        return new ContentBlockRedisEntity({
            id: hash.id,
            type: hash.type as TTypeName,
            title: hash.title || null,
            content: hash.content || null,
            img: hash.img || null,
            date: hash.date ? new Date(hash.date) : new Date(),
        });
    }
}