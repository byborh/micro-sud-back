import { RefundContract } from "../../contracts/IRefund";
import { TStatus } from "../../contracts/TStatus";
import { RefundAbstract } from "../Refund.abstract";

export class RefundRedisEntity extends RefundAbstract {
    id: string;
    transaction_id: string;
    transaction_ref: string;
    charge_ref: string;
    amount?: number;
    status: TStatus;
    refund_ref?: string;
    createdAt: Date;

    data: Record<string, any> | null;

    constructor(data: Partial<RefundContract>) {
        super(
            data?.id ?? "",
            data?.transaction_id ?? "",
            data?.transaction_ref ?? "",
            data?.charge_ref ?? "",
            data?.status ?? "pending",
            data?.createdAt ?? new Date(),
            data?.amount ?? 0,
            data?.refund_ref ?? "",
        );
        this.id = data?.id ?? "",
        this.transaction_id = data?.transaction_id ?? "",
        this.transaction_ref = data?.transaction_ref ?? "",
        this.charge_ref = data?.charge_ref ?? "",
        this.amount = data?.amount ?? 0,
        this.status = data?.status ?? "pending",
        this.refund_ref = data?.refund_ref ?? "",
        this.createdAt = data?.createdAt ?? new Date()
    }

    // Convert object to Redis hash
    toRedisHash(): { [key: string]: string } {
        return {
            id: this.id,
            transaction_id: this.transaction_id,
            transaction_ref: this.transaction_ref,
            charge_ref: this.charge_ref,
            amount: this.amount?.toString() ?? "0",
            status: this.status,
            refund_ref: this.refund_ref,
            createdAt: this.createdAt.toISOString()
        }
    }

    // Convert Redis hash to object
    static fromRedisHash(hash: { [key: string]: string }): RefundRedisEntity {
        return new RefundRedisEntity({
            id: hash.id,
            transaction_id: hash.transaction_id,
            transaction_ref: hash.transaction_ref,
            charge_ref: hash.charge_ref,
            amount: parseFloat(hash.amount) || 0,
            status: hash.status as TStatus,
            refund_ref: hash.refund_ref,
            createdAt: hash.createdAt ? new Date(hash.createdAt) : new Date(),
        })
    }
}