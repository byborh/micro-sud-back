import { RefundContract } from "../contracts/IRefund";
import { TStatus } from "../contracts/TStatus";

export abstract class RefundAbstract implements RefundContract {
    id: string;
    transaction_id: string;
    amount: number;
    status: TStatus;

    constructor(
        id: string,
        transaction_id: string,
        amount: number,
        status: TStatus,
    ) {
        this.id = id,
        this.transaction_id = transaction_id,
        this.amount = amount,
        this.status = status
    }

    
    getId(): string { return this.id; }
    getTransactionId(): string { return this.transaction_id; }
    getAmount(): number { return this.amount; }
    getStatus(): TStatus { return this.status; }


    setId(id: string): void { this.id = id; }
    setTransactionId(transaction_id: string): void { this.transaction_id = transaction_id; }
    setAmount(amount: number): void { this.amount = amount; }
    setStatus(status: TStatus): void { this.status = status; }
}