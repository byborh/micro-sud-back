import { TransactionContract } from "../contracts/ITransaction";
import { TCurrency } from "../contracts/TCurrency";
import { paymentPovider } from "../contracts/TPaymentProvider";
import { TStatus, TEscrowStatus } from "../contracts/TStatus";

export abstract class TransactionAbstract implements TransactionContract {
    id: string;
    amount: number;
    currency: TCurrency;
    payment_provider: paymentPovider;
    debtor_email: string;
    beneficiary_email: string;
    status: TStatus;
    transaction_date: Date;
    is_escrow: boolean;
    release_date: Date;
    transaction_ref?: string;
    description?: string;
    metadata?: any;
    escrow_status?: TEscrowStatus;

    constructor(
        id: string,
        amount: number,
        currency: TCurrency,
        payment_provider: paymentPovider,
        debtor_email: string,
        beneficiary_email: string,
        status: TStatus,
        transaction_date: Date,
        is_escrow: boolean,
        release_date: Date,
        description?: string,
        transaction_ref?: string,
        metadata?: any,
        escrow_status?: TEscrowStatus,
    ) {
        this.id = id,
        this.amount = amount,
        this.currency = currency,
        this.payment_provider = payment_provider,
        this.debtor_email = debtor_email,
        this.beneficiary_email = beneficiary_email,
        this.status = status,
        this.transaction_date = transaction_date,
        this.description = description,
        this.transaction_ref = transaction_ref,
        this.metadata = metadata

        this.is_escrow = is_escrow,
        this.escrow_status = escrow_status,
        this.release_date = release_date
    }

    
    getId(): string { return this.id; }
    getAmount(): number { return this.amount; }
    getCurrency(): TCurrency { return this.currency; }
    geTPaymentProvider(): paymentPovider { return this.payment_provider; }
    getdebtorEmail(): string { return this.debtor_email; }
    getbeneficiaryEmail(): string { return this.beneficiary_email; }
    getStatus(): TStatus { return this.status; }
    getTransactionDate(): Date { return this.transaction_date; }
    getDescription(): string { return this.description; }
    getTransactionRef(): string { return this.transaction_ref; }
    getMetadata(): any { return this.metadata; }
    getIsEscrow(): boolean { return this.is_escrow; }
    getEscrowStatus(): TEscrowStatus { return this.escrow_status; }
    getReleaseDate(): Date { return this.release_date; }


    setId(id: string): void { this.id = id; }
    setAmount(amount: number): void { this.amount = amount; }
    setCurrency(currency: TCurrency): void { this.currency = currency; }
    seTPaymentProvider(payment_provider: paymentPovider): void { this.payment_provider = payment_provider; }
    setdebtorEmail(debtor_email: string): void { this.debtor_email = debtor_email; }
    setbeneficiaryEmail(beneficiary_email: string): void { this.beneficiary_email = beneficiary_email; }
    setStatus(status: TStatus): void { this.status = status; }
    setTransactionDate(transaction_date: Date): void { this.transaction_date = transaction_date; }
    setDescription(description: string): void { this.description = description; }
    setTransactionRef(transaction_ref: string): void { this.transaction_ref = transaction_ref; }
    setMetadata(metadata: any): void { this.metadata = metadata; }
    setIsEscrow(is_escrow: boolean): void { this.is_escrow = is_escrow; }
    setEscrowStatus(escrow_status: TEscrowStatus): void { this.escrow_status = escrow_status; }
    setReleaseDate(release_date: Date): void { this.release_date = release_date; }
}