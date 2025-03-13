import { RefundContract } from "../contracts/IRefund";
import { TStatus } from "../contracts/TStatus";

export abstract class RefundAbstract implements RefundContract {
    id: string;
    transaction_id: string;
    transaction_ref: string;
    charge_ref: string;
    status: TStatus;
    amount?: number;
    refund_ref?: string;
    createdAt: Date;

    constructor(
        id: string,
        transaction_id: string,
        transaction_ref: string,
        charge_ref: string,
        status: TStatus,
        createdAt: Date,
        amount?: number,
        refund_ref?: string
    ) {
        this.id = id,
        this.transaction_id = transaction_id,
        this.transaction_ref = transaction_ref,
        this.charge_ref = charge_ref,
        this.status = status
        this.amount = amount,
        this.refund_ref = refund_ref,
        this.createdAt = createdAt
    }

    
    getId(): string { return this.id; }
    getTransactionId(): string { return this.transaction_id; }
    getTransactionRef(): string { return this.transaction_ref; }
    getChargeRef(): string { return this.charge_ref; }
    getAmount(): number { return this.amount ?? 0; }
    getStatus(): TStatus { return this.status; }
    getRefundRef(): string { return this.refund_ref; }
    getCreatedAt(): Date { return this.createdAt; }


    setId(id: string): void { this.id = id; }
    setTransactionId(transaction_id: string): void { this.transaction_id = transaction_id; }
    setTransactionRef(transaction_ref: string): void { this.transaction_ref = transaction_ref; }
    setChargeRef(charge_ref: string): void { this.charge_ref = charge_ref; }
    setAmount(amount: number): void { this.amount = amount; }
    setStatus(status: TStatus): void { this.status = status; }
    setRefundRef(refund_ref: string): void { this.refund_ref = refund_ref; }
    setCreatedAt(createdAt: Date): void { this.createdAt = createdAt; }
}