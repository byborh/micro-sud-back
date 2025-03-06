import { RefundContract } from "../../contracts/IRefund";
import { TStatus } from "../../contracts/TStatus";
import { RefundAbstract } from "../Refund.abstract";

export class RefundRedisEntity extends RefundAbstract {
    id: string;
    transaction_id: string;
    amount: number;
    status: TStatus;

    data: Record<string, any> | null;

    constructor(data: Partial<RefundContract>) {
        super(
            data?.id ?? "",
            data?.transaction_id ?? "",
            data?.amount ?? 0,
            data?.status ?? "pending"
        );
        this.id = data?.id ?? "",
        this.transaction_id = data?.transaction_id ?? "",
        this.amount = data?.amount ?? 0,
        this.status = data?.status ?? "pending"
    }

    // Convert object to Redis hash
    toRedisHash(): { [key: string]: string } {
        return {
            id: this.id,
            transaction_id: this.transaction_id,
            amount: this.amount.toString(),
            status: this.status
        }
    }

    // Convert Redis hash to object
    static fromRedisHash(hash: { [key: string]: string }): RefundRedisEntity {
        return new RefundRedisEntity({
            id: hash.id,
            transaction_id: hash.transaction_id,
            amount: parseFloat(hash.amount),
            status: hash.status as TStatus
        })
    }
}