import { TransactionContract } from "../contracts/ITransaction";
import { TCurrency } from "../contracts/TCurrency";
import { paymentPovider } from "../contracts/TPaymentProvider";
import { TStatus } from "../contracts/TStatus";

export abstract class TransactionAbstract implements TransactionContract {
    id: string;
    amount: number;
    currency: TCurrency;
    payment_provider: paymentPovider;
    debtor_email: string;
    beneficiary_email: string;
    status: TStatus;
    transaction_date: Date;
    transaction_ref?: string;
    description?: string;
    metadata?: any;

    constructor(
        id: string,
        amount: number,
        currency: TCurrency,
        payment_provider: paymentPovider,
        debtor_email: string,
        beneficiary_email: string,
        status: TStatus,
        transaction_date: Date,
        description?: string,
        transaction_ref?: string,
        metadata?: any
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
}