import { ChatAIAbstract } from "../ChatAI.abstract";

export class ChatAIRedisEntity extends ChatAIAbstract {
    id: string;
    user_id: string;
    requestContent: string;
    responseContent: string;
    createdAt: Date;

    constructor(id: string, user_id: string, requestContent: string, responseContent: string, createdAt: Date) {
        super(id, user_id, requestContent, responseContent, createdAt);
        
        this.id = id;
        this.user_id = user_id;
        this.requestContent = requestContent;
        this.responseContent = responseContent;
        this.createdAt = createdAt;
    }


    // Convert object to Redis hash
    toRedisHash(): { [key: string]: string } {
        return {
            id: this.id,
            user_id: this.user_id,
            requestContent: this.requestContent,
            responseContent: this.responseContent,
            createdAt: this.createdAt.toISOString() // à corriger
        }
    }

    // Covert Redis hash to object
    static fromRedisHash(hash: { [key: string]: string }) {
        return new ChatAIRedisEntity(hash.id, hash.user_id, hash.requestContent, hash.responseContent, new Date(hash.createdAt));
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