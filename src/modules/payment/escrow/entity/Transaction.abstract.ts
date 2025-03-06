import { EscrowContract } from "../contracts/IEscrow";
import { TStatus } from "../contracts/TStatus";

export abstract class EscrowAbstract implements EscrowContract {
    id: string;
    transaction_id: string;
    amount: number;
    release_date: Date;
    status: TStatus;

    constructor(
        id: string,
        transaction_id: string,
        amount: number,
        release_date: Date,
        status: TStatus
    ) {
        this.id = id,
        this.transaction_id = transaction_id,
        this.amount = amount,
        this.release_date = release_date,
        this.status = status
    }

    
    getId(): string { return this.id; }
    getTransactionId(): string { return this.transaction_id; }
    getAmount(): number { return this.amount; }
    getReleaseDate(): Date { return this.release_date; }
    getStatus(): TStatus { return this.status; }

    setId(id: string): void { this.id = id; }
    setTransactionId(transaction_id: string): void { this.transaction_id = transaction_id; }
    setAmount(amount: number): void { this.amount = amount; }
    setReleaseDate(release_date: Date): void { this.release_date = release_date }
    setStatus(status: TStatus): void { this.status = status; }
}