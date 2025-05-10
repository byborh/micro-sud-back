import { Entity, ObjectIdColumn, Column } from "typeorm";
import { ContentBlockAbstract } from "../ContentBlock.abstract";
import { TTypeName } from "@modules/content-blocks/contracts/TTypeName";
import { ContentBlockContract } from "@modules/content-blocks/contracts/IContentBlock";

@Entity("users")
export class ContentBlockMongoEntity extends ContentBlockAbstract {
    @ObjectIdColumn()
    id: string;

    @Column({ length: 50, unique: true })
    type: TTypeName;

    @Column({ nullable: true, name: "first_name" })
    title?: string | null;

    @Column({ nullable: true, name: "last_name" })
    content?: string | null;

    @Column({ nullable: true })
    img?: string | null;

    @Column({ type: "timestamp", nullable: true })
    date?: Date | null;
    

    constructor(data?: Partial<ContentBlockContract>) {
        super(
            data?.id ?? "",
            data?.type,
            data?.title ?? null,
            data?.content ?? null,
            data?.img ?? null,
            data?.date ?? null
        );
    
        this.id = data?.id ?? "";
        this.type = data?.type ?? null;
        this.title = data?.title ?? null;
        this.content = data?.content ?? null;
        this.img = data?.img ?? null;
        this.date = data?.date ?? new Date();
    }
}