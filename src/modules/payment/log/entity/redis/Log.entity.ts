import { LogContract } from "../../contracts/ILog";
import { LogAbstract } from "../Log.abstract";

export class LogRedisEntity extends LogAbstract {
    id: string;
    user_id: string;
    action: string;
    details: string;
    createdAt: Date;

    data: Record<string, any> | null;

    constructor(data: Partial<LogContract>) {
        super(
            data?.id ?? "",
            data?.user_id ?? "",
            data?.action ?? "",
            data?.details ?? "",
            data?.createdAt ?? new Date()
        );
        this.id = data?.id ?? "";
        this.user_id = data?.user_id ?? "";
        this.action = data?.action ?? "";
        this.details = data?.details ?? "";
        this.createdAt = data?.createdAt ?? new Date();
    }

    // Convert object to Redis hash
    toRedisHash(): { [key: string]: string } {
        return {
            id: this.id,
            user_id: this.user_id,
            action: this.action,
            details: this.details,
            createdAt: this.createdAt.toISOString()
        }
    }

    // Convert Redis hash to object
    static fromRedisHash(hash: { [key: string]: string }): LogRedisEntity {
        return new LogRedisEntity({
            id: hash.id,
            user_id: hash.user_id,
            action: hash.action,
            details: hash.details,
            createdAt: new Date(hash.createdAt)
        })
    }
}