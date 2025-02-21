import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "@modules/users/entity/typeorm/User.entity";
import { ChatAIAbstract } from "../ChatAI.abstract";


@Entity("chat_ai")
export class ChatAITypeORM extends ChatAIAbstract {
    @PrimaryColumn({ type: "varchar", length: 255 })
    id: string;

    @Column({ type: "varchar", length: 255 })
    user_id: string;

    @Column({ type: "varchar", length: 1024 })
    requestContent: string;

    @Column({ type: "varchar", length: 8192})
    responseContent: string;

    @Column({ type: "timestamp" })
    createdAt: Date;

    @ManyToOne(() => User, user => user.chatAITypeORM, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "user_id" })
    user: User;

    /*
    ----------------------------------------------------------------------------------
        Add liaisons here with other Entities
        Ex :
            - @OneToMany
                entityName: EntityName
            - @OneToMany
                entityName: EntityName
            - @ManyToMany
                entityName: EntityName
            - @ManyToMany
                entityName: EntityName
    ----------------------------------------------------------------------------------
    */

    constructor(id: string, user_id: string, requestContent: string, responseContent: string, createdAt: Date) {
        super(id, user_id, requestContent, responseContent, createdAt);
        this.id = id;
        this.user_id = user_id;
        this.requestContent = requestContent;
        this.responseContent = responseContent;
        this.createdAt = createdAt;
    }

    public getId(): string {return this.id;}
    public getUserId(): string {return this.user_id;}
    public getRequestContent(): string {return this.requestContent;}
    public getResponseContent(): string {return this.responseContent;}
    public getCreatedAt(): Date {return this.createdAt;}


    public setId(id: string): void {this.id = id;}
    public setUserId(userId: string): void {this.user_id = userId;}
    public setRequestContent(requestContent: string): void {this.requestContent = requestContent;}
    public setResponseContent(responseContent: string): void {this.responseContent = responseContent;}
    public setCreatedAt(createdAt: Date): void {this.createdAt = createdAt;}
}