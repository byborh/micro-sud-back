import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Index, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { ContentBlockContract } from '../contracts/IContentBlock';
import { TTypeName } from "../contracts/TTypeName";

@Entity("content_blocks")
export class ContentBlock implements ContentBlockContract {
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

    constructor(params?: ContentBlockContract) {
        if (params) {
            if (!params.id) throw new Error("ID is required");
            if (!params.type) throw new Error("Type is required");
    
            this.id = params.id;
            this.type = params.type;
            this.title = params.title;
            this.content = params.content;
            this.img = params.img;
            this.date = params.date;
        }
    }
}