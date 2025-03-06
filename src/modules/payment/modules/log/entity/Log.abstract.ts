import { LogContract } from "../contracts/ILog";

export abstract class LogAbstract implements LogContract {
    id: string;
    user_id: string;
    action: string;
    details: string;
    createdAt: Date;

    constructor(
        id: string,
        user_id: string,
        action: string,
        details: string,
        createdAt: Date
    ) {
        this.id = id,
        this.user_id = user_id,
        this.action = action,
        this.details = details,
        this.createdAt = createdAt
    }

    getId(): string { return this.id; }
    getUserId(): string { return this.user_id; }
    getAction(): string { return this.action; }
    getDetails(): string { return this.details; }
    getCreatedAt(): Date { return this.createdAt; }

    setId(id: string): void { this.id = id; }
    setUserId(user_id: string): void { this.user_id = user_id; }
    setAction(action: string): void { this.action = action; }
    setDetails(details: string): void { this.details = details; }
    setCreatedAt(createdAt: Date): void { this.createdAt = createdAt; }
}