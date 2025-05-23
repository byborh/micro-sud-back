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
        this.title = data.title ?? null;
        this.content = data.content ?? null;
        this.img = data.img ?? null;

        const dateParsed = data.date instanceof Date
            ? data.date
            : typeof data.date === "string"
            ? new Date(data.date)
            : new Date();

        this.date = isNaN(dateParsed.getTime()) ? new Date() : dateParsed;
        this.data = null;
    }

    toRedisHash(): { [key: string]: string } {
        return {
            id: this.id,
            type: this.type,
            title: this.title ?? "",
            content: this.content ?? "",
            img: this.img ?? "",
            date: this.date instanceof Date ? this.date.toISOString() : new Date(this.date).toISOString()
        };
    }

    static fromRedisHash(hash: { [key: string]: string }): ContentBlockRedisEntity {
        console.log("Hash from Redis:", hash);
        const dateParsed = hash.date ? new Date(hash.date) : new Date();
        const safeDate = isNaN(dateParsed.getTime()) ? new Date() : dateParsed;
    
        return new ContentBlockRedisEntity({
            id: hash.id,
            type: hash.type as TTypeName,
            title: hash.title || null,
            content: hash.content || null,
            img: hash.img || null,
            date: safeDate,
        });
    }
    
}
