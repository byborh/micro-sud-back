import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Index, OneToMany, OneToOne } from "typeorm";
import { AuthTokenSQLEntity } from "@modules/auth-token/entity/sql/AuthToken.entity";
import { ContentBlockAbstract } from "../ContentBlock.abstract";
import { ContentBlockContract } from "@modules/content-blocks/contracts/IContentBlock";
import { TTypeName } from "@modules/content-blocks/contracts/TTypeName";

@Entity("users")
export class ContentBlockSQLEntity extends ContentBlockAbstract {
    @PrimaryColumn({ type: "varchar", length: 255 })
    id: string;

    @Column({ name: "type" })
    type: TTypeName | null;

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
            data?.type ?? null,
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