import { TransactionContract } from "../contracts/ITransaction";
import { TCurrency } from "../contracts/TCurrency";
import { PaymentMethod } from "../contracts/TPaymentMethod";
import { TStatus } from "../contracts/TStatus";

export abstract class TransactionAbstract implements TransactionContract {
    id: string;
    amount: number;
    currency: TCurrency;
    payment_method: PaymentMethod;
    debtor_id: string;
    beneficiary_id: string;
    status: TStatus;
    transaction_date: Date;
    transaction_ref: string;
    description?: string;
    metadata?: any;

    constructor(
        id: string,
        amount: number,
        currency: TCurrency,
        payment_method: PaymentMethod,
        debtor_id: string,
        beneficiary_id: string,
        status: TStatus,
        transaction_date: Date,
        description: string,
        transaction_ref: string,
        metadata: any
    ) {
        this.id = id,
        this.amount = amount,
        this.currency = currency,
        this.payment_method = payment_method,
        this.debtor_id = debtor_id,
        this.beneficiary_id = beneficiary_id,
        this.status = status,
        this.transaction_date = transaction_date,
        this.description = description,
        this.transaction_ref = transaction_ref,
        this.metadata = metadata
    }

    
    getId(): string { return this.id; }
    getAmount(): number { return this.amount; }
    getCurrency(): TCurrency { return this.currency; }
    getPaymentMethod(): PaymentMethod { return this.payment_method; }
    getDebtorId(): string { return this.debtor_id; }
    getBeneficiaryId(): string { return this.beneficiary_id; }
    getStatus(): TStatus { return this.status; }
    getTransactionDate(): Date { return this.transaction_date; }
    getDescription(): string { return this.description; }
    getTransactionRef(): string { return this.transaction_ref; }
    getMetadata(): any { return this.metadata; }


    setId(id: string): void { this.id = id; }
    setAmount(amount: number): void { this.amount = amount; }
    setCurrency(currency: TCurrency): void { this.currency = currency; }
    setPaymentMethod(payment_method: PaymentMethod): void { this.payment_method = payment_method; }
    setDebtorId(debtor_id: string): void { this.debtor_id = debtor_id; }
    setBeneficiaryId(beneficiary_id: string): void { this.beneficiary_id = beneficiary_id; }
    setStatus(status: TStatus): void { this.status = status; }
    setTransactionDate(transaction_date: Date): void { this.transaction_date = transaction_date; }
    setDescription(description: string): void { this.description = description; }
    setTransactionRef(transaction_ref: string): void { this.transaction_ref = transaction_ref; }
    setMetadata(metadata: any): void { this.metadata = metadata; }
}